// 保存构造函数引用，就不用import Vue了，这样打包vuex插件的时候也就不用打包Vue了，可以减小插件的体积和复杂度。因为在下面
// install的时候会收到Vue，而且这个install是先于new Vuex.Store执行的，所以肯定能拿到这个Vue
let Vue;

class Store {
  constructor(options) {
    // this.$options = options;
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._wrappedGetters = options.getters;

    // 定义computed选项
    const computed = {}
    this.getters = {}
    // {doubleCount (state) {}}
    const store = this
    Object.keys(this._wrappedGetters).forEach(key => {
      // 获取用户定义的getter
      const fn = store._wrappedGetters[key]
      // 转换为computed可以使用的无参数形式
      computed[key] = function() {
        return fn(store.state)
      }
      // 为getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })

    
    // vuex和全局的data没有什么区别，但是它最重要的作用在于它会很好的保护你的数据

    // 响应化处理state
    // this.state = new Vue({
    //   data: options.state
    // })
    // 防止用户直接修改store数据
    this._vm = new Vue({
      data: {
        // 加两个$，Vue不做代理，就是通过_vm直接访问$$state是访问不到的，对外部是隐藏的。
        $$state: options.state
      },
      computed
    })

    // 绑定commit、dispatch的上下文为store实例
    // 这样的话这两个方法在调用的时候，不管调用者是谁，这两个方法内部的this永远都是store实例。就避免了this混乱的问题。
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  // 存取器， store.state，这里只是防止直接修改state，state里面的值修改监听不到，官方的严格模式使用了watch监听了每个值的修改。
  get state() {
    console.log(this._vm);
    // data和_data都可以
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('你造吗？你这样不好！');
    
  }

  // store.commit('add', 1)
  // type: mutation的类型
  // payload：载荷，是参数
  commit(type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    }
  }

}

function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })

}

// Vuex
export default {
  Store,
  install
}