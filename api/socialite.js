import request from '@/utils/request'

export function userBuild(data) {
    return request({
        data: {
            'service': 'socialite-api',
            'method': 'Users.Build',
            'request': data
        }
    })
}

export function userDelete(data) {
    return request({
        data: {
            'service': 'socialite-api',
            'method': 'Users.Delete',
            'request': data
        }
    })
}