export default interface Page<T> {
  // 页码
  readonly pageNum: number

  // 每页显示数量
  readonly pageSize: number

  // 总数量
  readonly totalNum: number

  // 数据集合
  dataList: T[]
}
