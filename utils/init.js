
import { Login } from '@/api/mpwechat'
// 系统方法 https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
const sysInfo = uni.getSystemInfoSync();
// AutoLogin 自动登录
function AutoLogin(provider){
    // 登录 https://uniapp.dcloud.io/api/plugins/login
    uni.login({
        provider: provider,
        success: function (loginRes) {
            Login({ js_code: loginRes.code }).then(response=>{
                var [error, res] = response;
                console.log(error, res);
                
            })
            console.log("aa", loginRes, loginRes.authResult);
            // 获取用户信息
            uni.getUserInfo({
                provider: provider,
                success: function (infoRes) {
                    console.log("aaa", infoRes);
                }
            });
        }
    });
}
/**************** 代码实现 ****************/

// 开发模式 自动登录
if (sysInfo.platform === "devtools") {
    uni.getProvider({
        service: 'oauth',
        success: (result) => {
            let provider = result.provider[0]
            AutoLogin(provider)
        }
    })
}
