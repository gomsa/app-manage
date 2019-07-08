const actions = {
  /**
  * 统一跳转接口,拦截未登录路由
  * navigator标签现在默认没有转场动画，所以用view
  */
  navTo({ commit, getters }, url) {
    if (getters.token == '') {
			url = '/pages/public/login';
		}
    uni.navigateTo({
      url
    })
  }
}
export default actions
