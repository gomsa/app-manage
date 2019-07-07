<template name="buildMobile">
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input :focus="mobileFocus" v-model="form.user.mobile" type="number" placeholder="输入手机号码"/>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input :focus="verifyFocus" v-model="form.verify" type="number" placeholder="输入验证码"/>
				<button class='cu-btn shadow' :class="smsbtn.status?'bg-grey':'bg-cyan'" @tap="getSmsCode">{{smsbtn.text}}</button>
			</view>
			<view class="padding-xl">
				<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="userUpdate">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	import { mobileVerify } from '@/api/nats'
	import { userMobileBuild } from '@/api/user'

	import { isMobile } from '@/utils/validate'
	import {  
        mapGetters 
    } from 'vuex';  
	export default {
		name: "buildMobile",
		data() {
			return {
				title: '绑定手机',
				form:{
					user:{
						name:'',
						mobile:'',
						avatar:'',
					},
					verify:'',
					uuid:'',
				},
				mobileFocus: true,
				verifyFocus: false,
				smsbtn: {
					text: '获取验证码',
					status: false,
					codeTime: 60
				},
				timerId: null,
			};
		},
		computed: {
			...mapGetters([
				'oauthProvider'
			])
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				if (this.oauthProvider != '' || this.oauthProvider != undefined) {
					uni.getUserInfo({
						provider: this.oauthProvider,
						success:  (infoRes)=> {
							const userInfo = infoRes.userInfo
							this.form.user.name = userInfo.nickName
							this.form.user.avatar = userInfo.avatarUrl
						}
					});
				}
			},
			getSmsCode() {
				if (this.smsbtn.status == true ) {
					console.log('message：', "别着急！短信已经发送了~");
					return false;
				}
				if (!isMobile(this.form.user.mobile)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none',
						duration: 3000
					});
					return false;
				}
				this.mobileFocus= false,
				this.verifyFocus= true,
				this.smsbtn.status = true; // 这段代码其实应该加在你request请求 短信发送成功后 
				this.timerId = setInterval(() => {
						var codeTime = this.smsbtn.codeTime;
						codeTime--;
						this.smsbtn.codeTime = codeTime;
						this.smsbtn.text = codeTime + "S";
						if (codeTime < 1) {
							clearInterval(this.timerId);
							this.smsbtn.text = "重新获取";
							this.smsbtn.codeTime = 60;
							this.smsbtn.status = false;
						}
					},
					1000);
				this.sendCode()
				return false;
			},
			// 请求后台获取验证码
			sendCode(){
				mobileVerify({mobile:this.form.user.mobile}).then(response => {
					const data = response.data
					if (data.valid) {
						this.form.uuid = data.uuid
					}
				}).catch(error => {
					console.log(error);
				})
			},
			// 更新用户信息
			userUpdate(){
				userMobileBuild(this.form).then(response => {
					const data = response.data
					if (data.valid) {
						uni.showToast({
							title: '绑定手机成功',
							icon: 'success',
							duration: 3000
						});
						// 重新获取用户信息
						this.$store.dispatch('user/getInfo', this.oauthProvider)
						// 等待 1 秒 跳转到首页
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/index/index'
							})
						},1000)
					}
				})
			}
		}
	}
</script>

<style>
	.s-page-wrapper {
		max-width: 750rpx; 
	}
	/***********/
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.registercontent {
		width: 85%;
		margin: 0 auto;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}

	.iconfont {
		position: absolute;
		font-size: 40rpx;
		right: 12%;
		z-index: 999;
		width: 105rpx;
		text-align: center;
		color: #353535;
		margin-top: -11%;
		background: #fff;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.codeimg {
		position: absolute;
		font-size: 28rpx;
		right: 12%;
		z-index: 999;
		width: 200rpx;
		text-align: center;
		color: #353535;
		margin-top: -11%;
		background: #fff;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.registerbtn button {
		margin-top: 20rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: #f35;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}

</style>
