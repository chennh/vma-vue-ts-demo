<template>
  <scrm-maintain :refresh="refresh" />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { redirectToLogin } from '@/router'
// import { HomeApi } from '@/api/common/v1.0/homeApi'

@Component
export default class Maintain extends Vue {
  private refresh() {
    return Promise.resolve()
    // return HomeApi.menuList({ loading: false, errorHandle: false }).then(
    //   () => {
    //     redirectToLogin()
    //   },
    //   error => {
    //     if (error.response && error.response.status) {
    //       redirectToLogin()
    //     } else {
    //       Promise.reject(error)
    //     }
    //   }
    // )
  }
}
</script>
