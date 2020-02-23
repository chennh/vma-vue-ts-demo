import Vue from 'vue'

export default class VueModule {
  [propName: string]: any

  public static create(methods?: VueModule, data?: VueModule): VueModule {
    const target = new VueModule()
    Object.assign(target, {
      beforeShow() {
        return true
      },
      show(...args: any[]) {
        Promise.resolve(target.beforeShow.apply(target, args)).then(data => {
          if (data !== false) {
            target.visible = true
          }
        })
      },
      hide() {
        target.visible = false
      },
      submit() {
        target.hide()
      },
      cancel() {
        target.hide()
      }
    }, data, methods)
    Object.keys(target).forEach(name => {
      const property = target[name]
      if (typeof property === 'function') {
        target[name] = (...args: any[]) => {
          if (args[0] !== target) {
            args.unshift(target)
          }
          return property.apply(target, args)
        }
      } else {
        Vue.set(target, name, property)
      }
    })
    return target
  }

  public visible?: boolean = false
}
