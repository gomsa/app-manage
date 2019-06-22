import request from '@/utils/request'

export function Login(query) {
  return request({
    data: {
      'service': 'wechat',
      'method': 'Wechat.ProcessCommonRequest',
      'request': {
        'Domain': 'miniprogram',
        'ApiName': 'auth.code2Session',
        'QueryParams': query
      }
    }
  })
}
