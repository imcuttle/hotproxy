# hotproxy

[![Build status](https://img.shields.io/travis/imcuttle/hotproxy/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/hotproxy)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/hotproxy.svg?style=flat-square)](https://codecov.io/github/imcuttle/hotproxy?branch=master)
[![NPM version](https://img.shields.io/npm/v/hotproxy.svg?style=flat-square)](https://www.npmjs.com/package/hotproxy)
[![NPM Downloads](https://img.shields.io/npm/dm/hotproxy.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/hotproxy)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> A better http-proxy-middleware with hot update config and cli

## Installation

```bash
npm install hotproxy
# or use yarn
yarn add hotproxy
```

## Usage

### Package

```javascript
const app = require('express')()
const { hotProxy } = require('hotproxy')

const middleware = hotProxy(
  '/path/to/configFile', // Assign configuration file, It will find up the closest file named `hotproxy.config.js` when not setting.
  {
    // common config
    logLevel: 'debug'
  }
)

app.use(middleware)
// Or
app.use('/context', middleware)
```

### Cli

```bash
npm i hotproxy -g
echo "module.exports = {
  '/': {
    target: 'https://www.baidu.com',
    changeOrigin: true,
    logLevel: 'debug'
  }
}
" > hotproxy.config.js
hotproxy

hotproxy --help
```

## Config

See [Webpack Dev Server Proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)

## Contributing

- Fork it!
- Create your new branch:  
  `git checkout -b feature-new` or `git checkout -b fix-which-bug`
- Start your magic work now
- Make sure npm test passes
- Commit your changes:  
  `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
- Push to the branch: `git push`
- Submit a pull request :)

## Authors

This library is written and maintained by imcuttle, <a href="mailto:moyuyc95@gmail.com">moyuyc95@gmail.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟
