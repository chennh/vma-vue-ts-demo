// import ResourceMenuList from '@/api/common/v1.0/definitions/RbacResourceMenuBO'

export default class FrameMenu /*extends ResourceMenuList*/ {
  public title!: string
  public icon!: string
  public children!: FrameMenu[]
}
