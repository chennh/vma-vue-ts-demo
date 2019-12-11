import Vue from 'vue'
import VueRouter, { RawLocation } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
  }
}

declare module 'vue-router/types/router' {
  interface VueRouter {
    goRouter(param: RawLocation)
  }
}
