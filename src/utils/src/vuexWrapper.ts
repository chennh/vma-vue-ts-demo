import { Store, StoreOptions } from 'vuex'
import {
  storage
} from 'vma-vue-assist'

export class VuexWrapper<T> {
  public static FLAG = '__session_v__'
  public store: Store<T>
  constructor(
    options: StoreOptions<T>,
    session: typeof storage.SessionItem = new storage.SessionItem({
      name: 'VuexWrapper/SESSION'
    })
  ) {
    options.state = Object.assign({
      [VuexWrapper.FLAG]: new Date().getTime()
    }, options.state)
    this.store = new Store<T>(options)

    const stateJSON = session.getJSON()
    if (stateJSON[VuexWrapper.FLAG]) {
      this.store.replaceState(Object.assign({}, this.store.state, stateJSON))
      session.remove()
    }

    window.addEventListener('beforeunload', () => {
      session.setJSON(this.store.state)
    })
  }
}
