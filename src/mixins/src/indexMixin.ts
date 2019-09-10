import { Component, Vue } from 'vue-property-decorator'
import {
  clearSearch
} from '@/utils'
import { Page } from '@/typings'

@Component
export default class IndexMixin extends Vue {

  /**
   * 查询条件
   */
  public params: any = {
    pageNum: 1,
    pageSize: 10
  }

  /**
   * 分页
   */
  public page: any = {
    totalNum: 0
  }

  /**
   * 表格
   */
  public table: any = {
    columns: [],
    list: [],
    selection: []
  }

  /**
   * 新增/编辑
   */
  public form: any = {
    show: false,
    entity: {
      id: ''
    }
  }

  /**
   * 详情
   */
  public detail: any = {
    show: false,
    index: null,
    entity: null
  }

  public mounted(): void {
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
   * 查询列表，返回promise
   * @param params 列表查询参数
   */
  protected getApiList(params: any): Promise<Page<any>> {
    return this.getApi().list(params)
  }

  /**
   * 获取查询参数
   */
  protected getParams(): any {
    return Object.assign({}, this.params)
  }

  /**
   * 设置列表查询参数的页码/页数
   * @param pageNum 页码
   * @param pageSize 页数
   */
  protected setParamsPage(pageNum: number, pageSize?: number): void {
    if (!isNaN(pageNum)) {
      this.params.pageNum = pageNum
    }
    if (pageSize && !isNaN(pageSize)) {
      this.params.pageSize = pageSize
    }
  }

  /**
   * 查询第一页
   */
  protected search(): void {
    this.table.selection = []
    this.list(1)
  }

  /**
   * 延迟查询
   * @param delayTime 延迟时间
   */
  protected delaySearch(delayTime: number = 0) {
    setTimeout(() => {
      this.search()
    }, delayTime)
  }

  /**
   * 清空搜索条件并查询第一页
   */
  protected clearSearch(): void {
    const params = clearSearch(this.params)
    this.afterClearSearch(params)
    this.params = Object.assign(this.params, params)
    this.search()
  }

  /**
   * 清空搜索条件后钩子
   * @param params 清空后的查询条件
   */
  protected afterClearSearch(params: any): void { }

  /**
   * 执行列表查询
   * @param pageNum 页码
   * @param pageSize 页数
   */
  protected list(pageNum: number = this.params.pageNum, pageSize: number = this.params.pageSize): Promise<Page<any>> {
    return new Promise(resolve => {
      this.setParamsPage(pageNum, pageSize)
      const params = this.getParams()
      resolve(this.getApiList(params).then(page => {
        return this.resolvePage(page, params)
      }))
    })
  }

  /**
   * 刷新列表并显示详情
   * @param index 显示的详情索引，不传则刷新当前详情
   */
  protected listAndDetail(index?: number): void {
    this.list().then(page => {
      if (page.totalNum === 0) {
        // 总数据为0
        this.detail.entity = null
      } else if (typeof index === 'number') {
        // 选择特定位置
        if (this.table.list[index]) {
          this.showDetail(this.table.list[index].id, index)
        }
      } else {
        if (this.detail.entity && this.detail.entity.id) {
          // 判断之前选中的是否还存在于该页面
          const res = this.table.list.some((v: any, idx: number) => {
            if (v.id === this.detail.entity.id) {
              this.showDetail(this.detail.entity.id, idx)
            }
            return v.id === this.detail.entity.id
          })
          if (!res) {
            this.showDetail(this.table.list[0].id, 0)
          }
        }
      }
    })
  }

  /**
   * 处理分页返回的数据
   * @param page 分页
   * @param params 查询参数
   */
  protected resolvePage(page: Page<any>, params: any): any {
    // 总数据不为0，当前页数据为0，往前跳一页
    if (page.totalNum > 0 && page.dataList.length === 0) {
      return this.list(params.pageNum - 1, params.pageSize)
    } else {
      this.afterList(page.dataList)
      this.setTable(page.dataList)
      this.setPage(page)
    }
    return page
  }

  /**
   * 列表完成钩子
   * @param list 列表数据
   */
  protected afterList(list: any[]): void { }

  /**
   * 设置列表数据
   * @param list 列表数据
   */
  protected setTable(list: any[]): void {
    if (this.table.selection.length && this.$refs.table) {
      const section: any[] = this.table.selection
      const map: Map<string, any> = new Map<string, any>()
      list.forEach((v) => {
        map.set(v.id, v)
      })
      // 支持翻页后选中状态保持
      for (let i = 0, l = section.length; i < l; i++) {
        const v: any = section[i]
        if (map.has(v.id)) {
          section.splice(i, 1, map.get(v.id))
          map.get(v.id)._checked = true
        }
      }
    }
    this.table.list = list
  }

  /**
   * 设置分页
   * @param page 分页对象
   */
  protected setPage(page: Page<any>): void {
    this.page.totalNum = page.totalNum
  }

  /**
   * 显示新增/编辑页
   * @param entityOrId 数据详情/数据ID
   */
  protected showForm(entityOrId?: any): void {
    if (!entityOrId || typeof (entityOrId) === 'object') {
      this.form.entity = entityOrId || {}
      this.form.show = true
    } else {
      this.getApi().get(entityOrId).then((data: any) => {
        this.form.entity = data
        this.form.show = true
      })
    }
  }

  /**
   * 新增/编辑成功后钩子
   */
  protected afterSubmitForm(): void {
    this.form.show = false
    this.list()
    // this.success(`${entity.id ? '编辑' : '新增'}成功`)
  }

  /**
   * 取消新增/编辑
   */
  protected cancelForm(): void {
    this.form.show = false
  }

  /**
   * 显示详情
   * @param entityOrId 数据详情/数据ID
   */
  protected showDetail(entityOrId: any, index?: number): void {
    this.detail.index = index
    if (typeof entityOrId !== 'object') {
      this.getApi().get(entityOrId).then((data: any) => {
        this.detail.entity = data || {}
        this.detail.show = true
      })
    } else {
      this.detail.entity = entityOrId
      this.detail.show = true
    }
  }

  /**
   * 删除数据
   * @param id 数据ID
   * @param content 提示文字
   */
  protected showDel(id: any, content: string = '删除操作不可恢复，确认继续删除?'): void {

  }

  /**
   * 更新对象
   * @param data 数据
   * @param label 标题
   */
  protected update(data: any, label: string): void {
    this.getApi().update(data).then(() => {
      // this.success(`${label}成功`)
      // this.afterUpdateData(data, label)
    })
  }

}
