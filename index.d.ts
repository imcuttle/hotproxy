/**
 * A better http-proxy-middleware with hot update config and cli
 * @author imcuttle
 */
import * as findUp from 'find-up'

declare namespace hotproxy {
  type BaseConfig = {}
  type Config = BaseConfig | BaseConfig[]
  type Middleware = (req, res, next) => void
}

declare const hotproxy: {
  hotProxy: (configFile?: string, commonConfig?: hotproxy.Config) => hotproxy.Middleware
  normalizeConfig: (config: hotproxy.Config) => hotproxy.Config
  normalizeContext: (context: string) => string | string[]
  createMiddleware: (config: hotproxy.Config, commonConfig: hotproxy.Config) => hotproxy.Middleware
  inferConfigFile: (cwd: string, options: findUp.Options) => string
}

export = hotproxy
