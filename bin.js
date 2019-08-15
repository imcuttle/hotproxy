#!/usr/bin/env node
/**
 * @file bin
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/8/15
 *
 */
var express = require('express')
var opts = require('optimist')
  .usage('Usage: $0 [options]')
  .string(['config-file'])
  .describe({
    'config-file':
      'Assign configuration file, It will find up the closest file named `hotproxy.config.js` when not setting.'
  })
  .default({
    'config-file': null,
    port: 8080,
    host: null
  })

var argv = opts.argv

if (argv.help) {
  opts.showHelp()
} else {
  var app = express()
  app.use(require('.').hotProxy(argv['config-file'])).listen(argv.port, argv.host, function(err) {
    if (err) {
      console.error(err)
      process.exit(1)
      return
    }
    console.log('Hot Proxy Server running on http://%s:%s', argv.host || 'localhost', argv.port)
  })
}
