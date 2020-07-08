const buildTS = require('vma-assist/dist/static/buildApi/index').default
const path = require('path')

buildTS({
  swagger: {
    domain: 'http://octopus-dev-man.h5h5h5.cn',
    resourceFilter: resource => ['公共接口'].includes(resource.name)
  },
  template: {
    output: path.resolve(__dirname, '../src/api'),
  }
})