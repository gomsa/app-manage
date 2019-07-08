<template>
	<view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
        <view class="cu-list grid col-3">
			123
		</view>
	</view>
</template>

<script> 
    import {mapActions} from 'vuex';  
	export default {
		name: "file",
		data() {
			return {
                title: '商品档案',
			};
		},
        computed: {
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
</style>
