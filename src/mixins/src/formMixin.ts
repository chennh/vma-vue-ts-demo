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

  protected mounted(): void {
    // 初始化服务端数据完成后再执行ready
    new Promise(this.initData).then(() => {
      this.init()
    })
  }

  /**
   * 组件初始化
   * @param resolve
   */
  protected initData(resolve: Resolve): void {
    resolve()
  }

  /**
   * 初始化
   */
  protected init(): void {
    this.initReady()
  }

  /**
   * 初始化完成钩子
   */
  protected initReady(): void { }

  /**
   * 提供api
   */
  protected getApi(): any {
    throw new Error('请重写该方法')
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

  /**
   * 提交
   */
  protected submit(): void { }

  /**
   * 取消
   */
  protected cancel(): void { }
}
