import { Component, Vue } from 'vue-property-decorator'
import {
  clearSearch
} from '@/utils'
import { IPage } from '@/typings'

@Component
export default class IndexMixin<T = any> extends Vue {

  /**
   * rest api
   * @protected
   * @type {*}
   * @memberOf IndexMixin
   */
  public readonly api: any

  /**
   * 查询条件
   */
  public params: any = {
    current: 1,
    size: 10
  }

  /**
   * 日期区间
   * @memberOf IndexMixin
   */
  public dateRange = {
    params: ''
  }

  /**
   * 更多查询条件
   */
  public readonly drawer: any = {
    show: false,
    active: false
  }

  /**
   * 分页
   */
  public readonly pageData: any = {
    total: 0
  }

  /**
   * 表格
   */
  public readonly table: any = {
    headers: [],
    columns: [],
    list: [],
    selection: []
  }

  /**
   * 新增/编辑
   */
  public readonly form: any = {
    show: false,
    entity: {
      id: ''
    }
  }

  /**
   * 详情
   */
  public readonly detail: any = {
    show: false,
    index: null,
    entity: null
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
    this.search()
  }

  /**
   * 初始化完成钩子
   */
  protected initReady(): void { }

  /**
   * 查询列表，返回promise
   * @param params 列表查询参数
   */
  protected getApiPage(params: any): Promise<IPage<T>> {
    return this.api.page(params)
  }

  protected pageAdaptor(current?: number, size?: number): any {
    return this.page(current, size)
  }

  /**
   * 获取查询参数
   */
  protected getParams(): any {
    return Object.assign({}, this.params)
  }

  /**
   * 设置列表查询参数的页码/页数
   * @param current 页码
   * @param size 页数
   */
  protected setParamsPage(current: number, size?: number): void {
    if (!isNaN(current)) {
      this.params.current = current
    }
    if (size && !isNaN(size)) {
      this.params.size = size
    }
  }

  /**
   * 查询第一页
   */
  protected search(): void {
    this.table.selection = []
    this.pageAdaptor(1)
  }

  /**
   * 更多条件下查询第一页
   * @protected
   * @memberOf IndexMixin
   */
  protected searchMore(): void {
    this.drawer.active = true
    this.search()
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
    this.drawer.active = false
    this.search()
  }

  /**
   * 关闭查询更多条件
   *
   * @protected
   * @memberOf IndexMixin
   */
  protected hideSearchMore(): void {
    this.drawer.show = false
  }

  /**
   * 清空搜索条件后钩子
   * @param params 清空后的查询条件
   */
  protected afterClearSearch(params: any): void { }

  /**
   * 执行列表查询
   * @param current 页码
   * @param size 页数
   */
  protected page(current: number = this.params.current, size: number = this.params.size): Promise<IPage<T>> {
    return new Promise(resolve => {
      this.setParamsPage(current, size)
      const params = this.getParams()
      resolve(this.getApiPage(params).then(page => {
        return this.resolvePage(page, params)
      }))
    })
  }

  /**
   * 刷新列表并显示详情
   * @param index 显示的详情索引，不传则刷新当前详情
   */
  protected pageAndDetail(index?: number): void {
    this.page().then(page => {
      if (page.total === 0) {
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
  protected resolvePage(page: IPage<T>, params: any): any {
    // 总数据不为0，当前页数据为0，往前跳一页
    if (page.total > 0 && page.records.length === 0) {
      return this.page(params.current - 1, params.size)
    } else {
      this.afterPage(page.records)
      this.setTable(page.records)
      this.setPage(page)
    }
    return page
  }

  /**
   * 列表完成钩子
   * @param list 列表数据
   */
  protected afterPage(list: any[]): void { }

  /**
   * 设置列表数据
   * @param list 列表数据
   */
  protected setTable(list: any[]): void {
    if (this.table.selection.length) {
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
   * 处理表格选中
   * @protected
   * @param {any[]} selection
   * @memberOf IndexMixin
   */
  protected handleTableSelectionchange(selection: any[]): void {
    this.table.selection = selection
  }

  /**
   * 清空表格选中项
   * @protected
   * @memberOf IndexMixin
   */
  protected clearTableSection(): void {
    this.table.selection = []
    if (this.$refs.table) {
      (this.$refs.table as any).clearSelection()
    }
  }

  /**
   * 设置分页
   * @param page 分页对象
   */
  protected setPage(page: IPage<T>): void {
    this.pageData.total = page.total
  }

  /**
   * 显示新增/编辑页
   * @param entityOrId 数据详情/数据ID
   */
  protected showForm(entityOrId?: any): void {
    if (!entityOrId || typeof (entityOrId) === 'object') {
      this.showFormEntity(entityOrId)
    } else {
      this.api.get({ id: entityOrId }).then((data: any) => {
        this.showFormEntity(data)
      })
    }
  }

  protected showFormEntity(entity: any): void {
    this.form.entity = entity || {}
    this.form.show = true
  }

  /**
   * 关闭新增/编辑页
   */
  protected hideForm(): void {
    this.form.entity = {}
    this.form.show = false
  }

  /**
   * 新增/编辑表单提交
   *
   * @protected
   * @memberOf IndexMixin
   */
  protected submitForm(): void {
    this.hideForm()
  }

  /**
   * 新增/编辑成功后钩子
   */
  protected afterSubmitForm(entity: any): void {
    this.form.show = false
    this.pageAdaptor()
    this.success(`${entity.id ? '编辑' : '新增'}成功`)
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
      this.api.get({ id: entityOrId }).then((data: any) => {
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
    this.$confirm(content, '确认删除?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.api.del({ id, ids: id }).then(() => {
        this.success('删除成功')
        this.afterDel()
      })
    })
  }


  /**
   * 批量删除
   * @protected
   * @memberOf IndexMixin
   */
  protected showBatchDel(): void {
    if (this.table.selection.length) {
      const ids = this.table.selection.map((v: any) => v.id)
      this.showDel(ids, `批量删除 ${ids.length} 条数据？`)
    } else {
      this.info('请选择要删除的数据')
    }
  }


  /**
   * 删除成功后执行
   * @protected
   * @memberOf IndexMixin
   */
  protected afterDel(): void {
    this.pageAdaptor()
  }

  /**
   * 更新对象
   * @param data 数据
   * @param label 标题
   */
  protected update(data: any, label: string = '更新'): void {
    this.api.update(data).then(() => {
      this.success(`${label}成功`)
      this.afterUpdate(data, label)
    })
  }

  /**
   * 更新数据成功后执行
   * @param {any} data
   * @param {any} label
   */
  protected afterUpdate(data: any, label: string): void {
    this.pageAdaptor()
  }


  /**
   * 更新状态
   * @protected
   * @param {string} id
   * @param {number} status
   * @memberOf IndexMixin
   */
  protected updateStatus(id: string, status: number, label?: string) {
    this.api.updateStatus({
      id,
      status
    }).then(() => {
      this.success(`${label || (status === 1 ? '启用' : '禁用')}成功`)
      this.pageAdaptor()
    })
  }

}
