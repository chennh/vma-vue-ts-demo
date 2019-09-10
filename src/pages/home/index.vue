<template>
  <div class="home">
    <p @click="changeVersion">version: {{demoVersion}}</p>
    <img alt="Vue logo"
         src="../../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/packages/HelloWorld.vue' // @ is an alias to /src
import Entity from './src/entity'
import { Getter, Action } from 'vuex-class'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  @Prop({
    default() {
      return {}
    }
  })
  public data: any

  public entity: any

  @Getter('demo') public demoVersion!: string
  @Action('demo') public actionDemo!: (version: string) => {}

  @Watch('data')
  public onDataChange(val: any): void {
    this.entity = Object.assign({}, val)
    // console.log(this.entity)
  }

  public changeVersion(): void {
    this.actionDemo(String(Date.now()))
    // this.$instanceMethod('')
  }

  private created(): void {
    // console.log(this)
  }
}
</script>
