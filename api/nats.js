import request from '@/utils/request'

export function mobileVerify(data) {
    return request({
        data: {
            'service': 'nats-api',
            'method': 'Nats.MobileVerify',
            'request': data
        }
    })
}