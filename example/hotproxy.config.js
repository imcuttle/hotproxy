/**
 * @file hotproxy.config.js
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/8/15
 *
 */

module.exports = {
  '/': {
    target: 'https://www.baidu.com',
    changeOrigin: true,
    logLevel: 'debug'
  }
}
