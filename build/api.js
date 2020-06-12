const buildTS = require('vma-vue-assist/dist/static/buildApi/index').default
const path = require('path')

buildTS({
  swagger: {
    // domain: 'http://127.0.0.1:43001'
    // resourceFilter: resource => ['公共接口'].includes(resource.name as string)
  },
  template: {
    output: path.resolve(__dirname, '../src/api'),
  }
})