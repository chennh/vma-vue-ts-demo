import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'

@Component
export default class FormMixin extends Vue {
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  public dataProp: any

  /**
   * rest api
   * @protected
   * @type {*}
   * @memberOf FormMixin
   */
  public readonly api: any

  public entity: any = {}

  public rules: object = {}

  /**
   * 表单校验
   * @returns {Promise<boolean>}
   * @memberOf FormMixin
   */
  public validate(): Promise<boolean> {
    if (this.$refs.form) {
      const form = this.$refs.form as ElForm
      return form.validate()
    }
    return Promise.reject(new Error('ref form does not exist'))
  }

  /**
   * 读取数据
   * @returns {*}
   * @memberOf FormMixin
   */
  public getData(): any {
    return Object.assign({}, this.entity)
  }

  @Watch('dataProp')
  protected onDataPropChange(val: any) {
    this.get()
  }

  @Emit('cancel')
  protected emitCancel() { }

  @Emit('submit')
  protected emitSubmit(entity?: any, data?: any) { }

  protected created(): void {
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
   * data数据传递
   */
  protected get(): void {
    this.entity = Object.assign({}, this.entity, this.dataProp)
    this.afterGet(this.entity)
  }

  /**
   * entity赋值后钩子
   * @param entity
   */
  protected afterGet(entity: any): void { }


  /**
   * 提交前钩子
   * @protected
   * @param {*} entity
   * @returns {boolean}
   * @memberOf FormMixin
   */
  protected beforeSubmit(entity: any): boolean {
    return true
  }


  /**
   * 表单校验成功时执行
   * @protected
   * @memberOf FormMixin
   */
  protected saveOrUpdate(entity: any) {
    this.api[entity.id ? 'update' : 'save'](entity).then((data: any) => {
      this.emitSubmit(entity, data)
    })
  }

  /**
   * 提交
   */
  protected submit(): void {
    this.validate().then(valid => {
      if (valid) {
        const entity = Object.assign({}, this.entity)
        if (this.beforeSubmit(entity) !== false) {
          this.saveOrUpdate(entity)
        }
      }
    })
  }

  /**
   * 取消
   */
  protected cancel(): void {
    this.emitCancel()
  }
}
