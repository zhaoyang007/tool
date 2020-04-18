export default {
  props: {
    to: {
      type: String,
      required: true
    },
  },
  render(h) {
    // <a href="#/about">abc</a>
    // <router-link to="/about">xxx</router-link>
    // h(tag, data, children)
    // tag：标签名称；data：传给标签的数据；children：孩子数组
    console.log(this.$slots);
    return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    // jsx写法
    // return <a href={'#' + this.to}>{this.$slots.default}</a> 
  }
}