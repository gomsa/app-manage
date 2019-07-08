<template>
	<view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
        <view class="cu-list grid col-3">
			<view 
                class="cu-item text-xsl" 
                v-for="(item,index) in List" 
                :key="index"
                @click="navTo('/pages/goods/'+ item.label)"
            >
				<view :class="['gIcon-' + item.label,'text-' + item.color]"></view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script> 
    import {mapActions} from 'vuex';  
	export default {
		name: "info",
		data() {
			return {
                title: '商品管理',
                List: [{
					label: 'add',
					color: 'red',
					name: '添加商品'
				},
                {
					label: 'file',
					color: 'red',
					name: '商品档案'
				}, {
					label: 'snapshot',
					color: 'blue',
					name: '商品快照'
				}, {
					label: 'unit',
					color: 'olive',
					name: '商品单位'
				}, {
					label: 'category',
					color: 'orange',
					name: '商品类别'
				}, {
					label: 'brand',
					color: 'yellow',
					name: '商品品牌'
				}, {
					label: 'department',
					color: 'cyan',
					name: '商品部门'
				}],
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
