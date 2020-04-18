export default {
  render(h) {
    // 标记当前router-view深度
    // this.$vnode.data.routerView = true
    // let depth = 0
    // let parent = this.$parent 
    // while (parent) {
    //   const vnodeData = parent.$vnode && parent.$vnode.data
    //   if (vnodeData) {
    //     if (vnodeData.routerView) {
    //       // 说明当前parent是一个router-view
    //       depth++
    //     }
    //   }
    //   parent = parent.$parent 
    // }

    // 
    // let component = null;
    // const route = this.$router.matched[depth]
    // if (route) {
    //   component = route.component
    // }
    // return h(component)

    //获取path对应的component
    const {routeMap, current} = this.$router;
    console.log(routeMap,current);
    
    const component = routeMap[current].component || null;
    return h(component)

  

    // let component = null
    // this.$router.$options.routes.forEach(router => {
    //   if (route.path === this.$router.current) {
    //     component = route.component
    //   }
    // })
    // return h(component)
    // 这种写法的问题
    // 1.每次路径发生变化都要循环，显然不合理
    // 2.路径变化，router-view不会重新渲染，current变了之后凭什么执行这个render方法啊。这是典型的响应式的问题，我们需要让
    //   url是一个响应式的数据，数据发生变化，界面就应该重新渲染，这就是响应式。我们可以利用vue做到这一点。因为vue在初始化的
    //   时候会把data,props里面的东西都给变成响应式的。只要render里面用到了这个响应式的current，current变就会重新渲染。
  }
}