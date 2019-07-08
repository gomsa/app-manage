<template>
	<view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
        <form>
			<view class="cu-form-group">
                <view class="title">昵称</view>
				<input :focus="true" v-model="name" type="text" placeholder="输入昵称"/>
			</view>
			<view class="padding-xl">
				<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="userUpdate">保存</button>
			</view>
		</form>
	</view>
</template>

<script> 
    import { userSelfUpdate } from '@/api/user'
    import { mapState } from 'vuex';
	export default {
		name: "info",
		data() {
			return {
                title: '更改昵称',
                name:'',
			};
		},
        computed: {
			...mapState({
                userName : state => state.user.name
			})
		},
		onShow() {
            this.name = this.userName
		},
		methods: {
            // 更新用户信息
			userUpdate(){
                userSelfUpdate({name:this.name}).then(response => {
					const data = response.data
					if (data.valid) {
						uni.showToast({
							title: '更新昵称成功',
							icon: 'success',
							duration: 3000
						});
						// 重新获取用户信息
						this.$store.dispatch('user/getInfo', this.oauthProvider)
					}
				})
                // 后退
                uni.navigateBack()
            }
		}
	}
</script>

<style  lang='scss'>
</style>
