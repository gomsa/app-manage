<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="/static/images/banner1.png"
			 mode="widthFix" class="response"></image>
			<view class="nav-list">
				<navigator hover-class="none" :url="'/pages/basics/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'gIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				elements: [{
						title: '收银',
						name: 'cashier',
						color: 'cyan',
						cuIcon: 'cashier'
					},
					{
						title: '盘点',
						name: 'check',
						color: 'blue',
						cuIcon: 'pandian'
					},
					{
						title: '商品 ',
						name: 'goods',
						color: 'mauve',
						cuIcon: 'goods'
					},
					{
						title: '库存',
						name: 'stock',
						color: 'pink',
						cuIcon: 'stock'
					},
					{
						title: '结算',
						name: 'settlement',
						color: 'purple',
						cuIcon: 'settlement'
					},
					{
						title: '供应商',
						name: 'vendor',
						color: 'brown',
						cuIcon: 'vendor'
					},
					{
						title: '用户',
						name: 'users',
						color: 'red',
						cuIcon: 'users'
					},
					{
						title: '系统',
						name: 'system',
						color: 'orange',
						cuIcon: 'system'
					}
				],
			};
		},
		onShow() {
			console.log("success")
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
