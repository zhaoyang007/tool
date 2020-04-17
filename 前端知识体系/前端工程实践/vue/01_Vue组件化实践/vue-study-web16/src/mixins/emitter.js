// 广播：自上而下的派发事件，通知底下的子元素去执行某些事情。
function broadcast(componentName, eventName, params) {
  // 遍历所有子元素，如果子元素的componentName和子元素的compunentName相同则派发事件。所有符合的子元素都会收到这个事件，这个
  // 遍历是树形的向下遍历，意味着这个东西会消耗一些资源，在用的时候要谨慎。
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    // 这个方法类似broadcast，但是相反，它是向上。冒泡的查找componentName相同的组件并派发事件。
    // KInput是典型的冒泡。我希望从KInput这个层级向上去找叫KFormItem的祖辈，然后让它去派发事件
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      // 向上查找直到找到相同名称的组件
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      // 如果找到就让它派发事件
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
