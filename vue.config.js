const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const {
  cipher,
  args
} = require('vma-vue-assist/dist/static/js/utils')
const postcssPxToRem = require('postcss-pxtorem')

const config = {
  productionGzip: true,
  productionGzipExtensions: ['js', 'css']
}

const isProduction = process.env.NODE_ENV === 'production'

const configureWebpackPlugins = []

if (isProduction && config.productionGzip) {
  // gzip
  configureWebpackPlugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  configureWebpack: {
    plugins: configureWebpackPlugins,
    externals: {
      'CKEDITOR': 'window.CKEDITOR'
    }
  },
  chainWebpack: config => {
    const profile = getProfile()
    config.plugin('define')
      .tap(args => {
        const options = args[0]
        const config = require('./config')(options['process.env'], profile)
        args[0] = Object.assign({}, options, {
          'process.env': config,
          'process.config': cipher.encodeEnv(config)
        })
        return args
      })
    config.resolve.alias
      .set('@static', resolve('public/static'))
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: `@import "@/assets/css/theme/variable.scss";`
      },
      postcss: {
        plugins: [
          postcssPxToRem({
            rootValue: 16,
            selectorBlackList: [/^html,\s*body/],
            propList: ['*']
          })
        ]
      }
    }
  }
}

function getProfile() {
  const NODE_ENV = process.env.NODE_ENV
  let profile = NODE_ENV
  if (NODE_ENV === 'production') {
    let argv
    try {
      argv = JSON.parse(process.env.npm_config_argv).original
    } catch (ex) {
      argv = process.argv
    }
    let argsMap = args(argv.slice(2))
    if (argsMap.env) {
      profile = argsMap.env
    }
  }
  return profile
}