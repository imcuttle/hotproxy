/**
 * A better http-proxy-middleware with hot update config and cli
 * @author imcuttle
 */
const nps = require('path')
const fs = require('fs')
const findUp = require('find-up')
const proxy = require('http-proxy-middleware')
const hotModuleRequire = require('hot-module-require')(__dirname)

function hotProxy(configFile, commonConfig) {
  if (!configFile) {
    configFile = inferConfigFile()
  }
  if (!configFile) {
    throw new Error(`hotproxy config file is not found.`)
  }
  const resolvedConfigFile = nps.resolve(configFile)
  configFile = fs.existsSync(resolvedConfigFile) ? resolvedConfigFile : configFile
  const moduleGetter = hotModuleRequire(require.resolve(configFile))

  return Object.assign(
    function() {
      createMiddleware(moduleGetter(), commonConfig).apply(this, arguments)
    },
    { hotModuleGetter: moduleGetter }
  )
}

function createMiddleware(configs, commonConfig) {
  return function(req, res, next) {
    configs = normalizeConfig(configs)
    if (!configs) {
      return next && next()
    }
    const middlewareList = configs.map(config => {
      config = Object.assign({}, commonConfig, config)
      const clonedConfig = Object.assign({}, config)
      delete clonedConfig.context

      if (!config.context) {
        return proxy(config).bind(this, req, res)
      }
      return proxy(config.context, clonedConfig).bind(this, req, res)
    })

    return runTasks(middlewareList, next)
  }
}

function runTasks(tasks, next) {
  tasks = tasks.slice()
  let head = tasks.shift()
  if (head) {
    head(function() {
      runTasks(tasks, next)
    })
  } else {
    next && next()
  }
}

function inferConfigFile(cwd = process.cwd(), options) {
  return findUp.sync('hotproxy.config.js', Object.assign({ cwd }, options))
}

function normalizeContext(context) {
  if (context.indexOf('|') >= 0) {
    return context.split('|')
  }
  return context
}

function normalizeConfig(config) {
  if (config && !Array.isArray(config)) {
    config = Object.keys(config).reduce((list, context) => {
      list.push(
        Object.assign(typeof config[context] === 'string' ? { target: config[context] } : config[context], {
          context: normalizeContext(context)
        })
      )
      return list
    }, [])
  }

  return config
}

module.exports = {
  hotProxy,
  normalizeConfig,
  normalizeContext,
  createMiddleware,
  inferConfigFile
}
