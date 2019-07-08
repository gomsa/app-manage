<template>
	<view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
	    <view class="cu-list menu">
		    <view class="cu-item arrow">
		    	<button class="cu-btn content">
		    		<text class="text-grey">头像</text>
		    	</button>
                <view class="action">
                    <image class="portrait" :src="userAvatar|| '/static/user/missing-face.png'"></image>
				</view>
		    </view>
            <view class="cu-item arrow" @click="navTo('/pages/user/name')">
		    	<button class="cu-btn content">
		    		<text class="text-grey">昵称</text>
		    	</button>
                <view class="action">
                    <text class="text-grey">{{userName || '游客'}}</text>
				</view>
		    </view>
            <view class="cu-item arrow">
		    	<button class="cu-btn content">
		    		<text class="text-grey">二维码</text>
		    	</button>
                <view class="action text-xl">
                    <text class="gIcon-qr_code_light text-grey"></text>
				</view>
		    </view>
        </view>
	</view>
</template>

<script> 
    import {mapState,mapActions} from 'vuex';  
	export default {
		name: "info",
		data() {
			return {
                title: '个人信息',
			};
		},
        computed: {
			...mapState({
				userName : state => state.user.name,
				userMobile : state => state.user.mobile,
				userAvatar : state => state.user.avatar,
				userRoles : state => state.user.roles,
			})
		},
		onShow() {
		},
		methods: {
            /**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			...mapActions([
				'navTo'
			]), 
		}
	}
</script>

<style  lang='scss'>
    .portrait{
		width: 110upx;
		height: 110upx;
		border:5upx solid #fff;
		border-radius: 50%;
	}
</style>
