// import Page from '@/api/manager/v1.0/definitions/Page'

// export interface IPage<T> extends Page<T> {
export interface IPage<T> {
  // 页码
  readonly current: number

  // 每页显示数量
  readonly size: number

  // 总数量
  readonly total: number

  // 总页数
  readonly pages: number

  // 数据集合
  readonly records: T[]
}
