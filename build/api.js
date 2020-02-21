const buildTS = require('vma-vue-assist/dist/static/buildApi/index-ts')
const path = require('path')

buildTS({
  baseURL: 'http://127.0.0.1:8080',
  output: path.resolve(__dirname, '../src/api'),
  filters: {
    swaggerResources: rss => rss.filter(rs => ['管理后台'].includes(rs.name))
  }
})