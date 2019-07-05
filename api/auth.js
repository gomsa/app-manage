import request from '@/utils/request'

export function mpLogin(query) {
  return request({
    data: {
      'service': 'socialite-api',
      'method': 'Miniprogram.Auth',
      'request': query
    }
  })
}

export function login(data) {
  return request({
    data: {
      'service': 'user-api',
      'method': 'Auth.Auth',
      'request': data
    }
  })
}

export function getInfo() {
  return request({
    data: {
      'service': 'user-api',
      'method': 'Users.Info',
      'request': {}
    }
  })
}

export function logout() {
  return request({
    method: 'post',
    data: {
      'service': 'user-api',
      'method': 'Auth.Logout',
      'request': {}
    }
  })
}

