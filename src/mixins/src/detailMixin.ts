import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class FormMixin extends Vue {
  @Prop({
    default() {
      return {}
    }
  })
  public dataProp: any

  public entity: any = {}

  public rules: object = {}

  public renderCompleted = true

  @Watch('dataProp')
  protected onDataPropChange(val: any) {
    this.get()
  }

  protected created(): void {
    this.get()
  }

  /**
   * data数据传递
   */
  protected get(dataProp = this.dataProp): void {
    this.renderCompleted = false
    this.entity = Object.assign({}, this.entity, dataProp)
    this.afterGet(this.entity)
    this.$nextTick(() => {
      this.renderCompleted = true
    })
  }

  /**
   * entity赋值后钩子
   * @param entity
   */
  protected afterGet(entity: any): void { }
}
