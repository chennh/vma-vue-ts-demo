import { Component, Vue } from 'vue-property-decorator'
import { RESOURCE_CODE } from '@/constants/src/resource'
import { Getter } from 'vuex-class'
// import * as systemTypes from '@/router/system/types'

@Component
export default class ResourceMixin extends Vue {
  // 所有功能权限编码
  public RESOURCE_CODE = RESOURCE_CODE

  // system路由
  // public RESOURCE_MENU_SYSTEM = systemTypes

  // 当前用户拥有的功能权限
  @Getter
  protected resourceActionMap!: Map<string, object>

  @Getter
  protected resourceMenuMap!: Map<string, object>
  /**
   * 是否拥有xx功能权限
   * @protected
   * @param {RESOURCE_CODE} resourceCode
   * @returns {boolean}
   * @memberOf ResourceMixin
   */
  protected hasResourceAction(resourceCode: RESOURCE_CODE): boolean {
    return this.resourceActionMap && this.resourceActionMap.has(resourceCode)
  }

  /**
   * 是否拥有数组中任意一个功能权限
   * @protected
   * @param {RESOURCE_CODE[]} resourceCodeList
   * @returns {boolean}
   * @memberOf ResourceMixin
   */
  protected hasSomeResourceAction(resourceCodeList: RESOURCE_CODE[]): boolean {
    return this.resourceActionMap && resourceCodeList.some(resourceCode => this.hasResourceAction(resourceCode))
  }

  /**
   * 是否拥有数组的全部功能权限
   * @protected
   * @param {RESOURCE_CODE[]} resourceCodeList
   * @returns {boolean}
   * @memberOf ResourceMixin
   */
  protected hasEveryResourceAction(resourceCodeList: RESOURCE_CODE[]): boolean {
    return this.resourceActionMap && resourceCodeList.every(resourceCode => this.hasResourceAction(resourceCode))
  }

  /**
   * 是否拥有xx菜单权限
   * @protected
   * @param {RESOURCE_CODE} resourceCode
   * @returns {boolean}
   * @memberOf ResourceMixin
   */
  protected hasResourceMenu(resourceMenu: string) {
    return this.resourceMenuMap && this.resourceMenuMap.has(resourceMenu)
  }

  /**
   * 是否拥有数组的全部菜单权限
   * @protected
   * @param {RESOURCE_CODE[]} resourceCodeList
   * @returns {boolean}
   * @memberOf ResourceMixin
   */
  protected hasEveryResourceMenu(resourceMenuList: string[]): boolean {
    return this.resourceMenuMap && resourceMenuList.every(resourceMenu => this.hasResourceMenu(resourceMenu))
  }

  /**
   * 是否拥有数组中任意一个菜单权限
   * @protected
   * @param {RESOURCE_CODE[]} resourceCodeList
   * @returns {boolean}
   * @memberOf ResourceMixin
   */
  protected hasSomeResourceMenu(resourceMenuList: string[]): boolean {
    return this.resourceMenuMap && resourceMenuList.some(resourceMenu => this.hasResourceMenu(resourceMenu))
  }
}
