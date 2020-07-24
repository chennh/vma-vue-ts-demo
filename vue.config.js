const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const {
  definePlugin
} = require('vma-assist/dist/static/js/tools/vueCli')
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
    definePlugin(config.plugin('define'), require('./config'), process.env)
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