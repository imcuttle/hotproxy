/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
const { hotProxy, createMiddleware } = require('../')
const http = require('http')
const httpProxyMiddleware = require('http-proxy-middleware')
const remoteApp = require('express')()
const app = require('express')()
const pify = require('pify')
const request = require('supertest')

remoteApp.get('/user', (req, res) => {
  res.end('user')
})
remoteApp.get('/user/:name', (req, res) => res.end(req.params.name))

const port = 16789
let server

const delay = async ms => new Promise(res => setTimeout(res, ms))

describe('hotproxy', function() {
  beforeAll(() => {
    server = http.createServer(remoteApp)
    return pify(server.listen.bind(server))(port)
  })
  afterAll(() => {
    server.close()
  })

  it('should throw error', function() {
    expect(() => hotProxy()).toThrowErrorMatchingInlineSnapshot(`"hotproxy config file is not found."`)
  })

  it('should createMiddleware', function(done) {
    const middle = createMiddleware(
      {
        '/api/': {
          target: `http://localhost:${port}/`,
          pathRewrite: {
            '^/api': '/user'
          }
        }
      },
      { logLevel: 'debug' }
    )

    request(app.use(middle))
      .get('/api/yucong')
      .expect('yucong')
      .end(done)
  })

  it('should createMiddleware2', function(done) {
    const middle = createMiddleware(
      Promise.resolve().then(async () => {
        await delay(1000)
        return {
          '/api-b|/api-a': {
            target: `http://localhost:${port}/user`,
            pathRewrite: {
              '^/api-b': '/'
            }
          }
        }
      }),
      { logLevel: 'debug' }
    )

    request(app.use(middle))
      .get('/api-b/yucong2')
      .expect('yucong2')
      .end(done)
  })
})
