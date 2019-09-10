import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class FormMixin<T extends object> extends Vue {
  @Prop({
    default() {
      return {}
    }
  })
  public data!: T

  public entity!: T

  public rules: object = {}

  @Watch('data')
  protected onDataChange(val: T) {
    this.get()
  }

  /**
   * data数据传递
   */
  protected get(): void {
    this.entity = Object.assign({}, this.entity, this.data)
    this.afterGet(this.entity)
  }

  /**
   * entity赋值后钩子
   * @param entity
   */
  protected afterGet(entity: T): void { }
}
