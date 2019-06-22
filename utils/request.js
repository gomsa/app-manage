function request({
  url = "http://srv.binzhou.vip/rpc",
  data = {},
  header = {
    'content-type': 'application/json',
    'X-Token': '123'
  },
  method = 'POST',
  dataType = 'json',
  responseType = "text",
}) {
  return uni.request({
    url,
    data,
    header,
    method,
    dataType,
    responseType,
  })
}
export default request