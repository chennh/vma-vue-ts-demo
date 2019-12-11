import Vue from 'vue'
import Router, { RawLocation } from 'vue-router'

export default {
  install() {
    Vue.use(Router)

    Router.prototype.goRouter = function(param: RawLocation) {
      param = typeof param === 'string' ? { name: param } : param
      if (this.currentRoute && this.currentRoute.name === param.name) {
        return
      }
      this.push(param)
    }
  }
}
