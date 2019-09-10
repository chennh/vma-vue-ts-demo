import {
  Constant
} from 'vma-vue-assist'

/*
 *  Constant
 *  constructor
 *    (data)                [{key: value} | Array] key-value对象/数组，当参数为数组时key为对应的数组index
    method
      拥有Map的所有方法...
      getValue(key)         [any] = Map.get(key)
      getKey(value)         [String] 根据value区key
      keyList()             [Array] key数组
      valueList()           [Array] value数组
      list()                [Array] key-value数组/构造参数是数组时返回valueList

      set(key, value)       [void] 添加数据后，会将该key扩展到当前实例上，即可通过[instance.key]访问该value
 */

// 登录类型
export const LOGIN_TYPE = new Constant({
  // 超级后台
  SMS: 1,
  // 运营商后台
  OMS: 2,
  // 代理商后台
  PMS: 3,
  // 企业后台
  SYSTEM: 4,
  // 员工后台/微客服后台
  CHAT: 5
})
