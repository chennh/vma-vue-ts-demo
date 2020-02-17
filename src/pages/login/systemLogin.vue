<template>
  <login :loginType="5"
         :name="hostname"
         ref="login">
    <div slot="loginType"
         class="login-tabs">
      <span class="login-tab-item active">企业登录</span>
    </div>
  </login>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Login from './components/login.vue'

@Component({
  components: {
    Login
  }
})
export default class LoginWrapper extends Vue {
  private hostname = location.hostname
}
</script>
