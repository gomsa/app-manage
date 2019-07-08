import http from '@/utils/vmeitime-http/interface'
import store from '@/store'

http.config.baseUrl = "https://api.xilewanggou.com/rpc"
http.config.method = 'POST'
//设置请求前拦截器
http.interceptor.request = (config) => {
	config.header = {			
    'X-Token': store.getters.token
	}
} 
//设置请求结束后拦截器
http.interceptor.response = (response) => {
  //判断返回状态 执行相应操作
  return response;
}
function request(req){
  return new Promise((resolve, reject) => {
    http.request(req)
      .then(res=>{
      resolve(res)
    })
    .catch(error => {
      const detail = error.data.detail.slice(22)
      uni.showToast({
        title: detail,
        icon: 'none',
        duration: 10000
      });
      reject(error)
    })
  })
}

export default request