import request from '@/utils/request'

export function userMobileBuild(data) {
    return request({
        data: {
            'service': 'user-api',
            'method': 'Users.MobileBuild',
            'request': data
        }
    })
}

export function userSelfUpdate(data) {
    return request({
        data: {
            'service': 'user-api',
            'method': 'Users.SelfUpdate',
            'request': data
        }
    })
}

export function userExist(data) {
    return request({
        data: {
            'service': 'user-api',
            'method': 'Users.Exist',
            'request': data
        }
    })
}

export function userList(data) {
    return request({
        data: {
            'service': 'user-api',
            'method': 'Users.List',
            'request': data
        }
    })
}

export function userGet(data) {
    return request({
        data: {
            'service': 'user-api',
            'method': 'Users.Get',
            'request': data
        }
    })
}

export function userCreate(data) {
    return request({
        data: {
            'service': 'user-api',
            'method': 'Users.Create',
            'request': data
        }
    })
}
export function userUpdate(data) {
    return request({
        data: {
            'service': 'user-api',
            'method': 'Users.Update',
            'request': data
        }
    })
}
export function userDelete(data) {
    return request({
        data: {
            'service': 'user-api',
            'method': 'Users.Delete',
            'request': data
        }
    })
}
