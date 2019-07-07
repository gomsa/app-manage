<template>
	<view>
		<basics v-if="PageCur=='basics'"/>
		<user v-if="PageCur=='user'"/>
		<!-- cu-bar tabbar bg-white shadow foot -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view 
				v-for="(itme,key) in tabbar"
				:key="key"
				class="action" 
				:class="[itme.click ? 'text-green' : ' text-gray', itme.action ? 'add-action':'']"
				@click="NavChange" 
				:data-cur="key"
			>
				<view :class=[itme.icon]>
					<view v-if="itme.info > 0" class="cu-tag badge">{{itme.info}}</view>
				</view> {{itme.title}}
			</view>
		</view>
	</view>
</template>

<script>
	import basics from '@/pages/basics/home.vue'
	import user from '@/pages/basics/user.vue'
	import { mapState } from 'vuex';
	export default {
		components: { 
			basics,
			user,
		},
		data() {
			return {
				PageCur: 'user',
				tabbar:{
					basics: {title: '首页', icon:'cuIcon-homefill',info:0, click: true, action: false},
					info: {title: '消息', icon:'cuIcon-comment',info:0, click: false, action: false},
					cash: {title: '收银', icon:'cu-btn cuIcon-scan bg-green shadow',info:0, click: false, action: true},
					report: {title: '报表', icon:'cuIcon-rankfill',info:0, click: false, action: false},
					user: {title: '我的', icon:'cuIcon-my',info:0, click: false, action: false},
				}
			}
		},
		computed: {
			...mapState({
				mobile : state => state.user.mobile,
			})
		},
		onLoad() {
			this.BuildMobile()
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
				this.TabbarClick()
			},
			TabbarClick(){
				for (const key in this.tabbar) {
					this.tabbar[key].click = false
				}
				this.tabbar[this.PageCur].click = true
			},
			BuildMobile(){
				if (this.mobile === undefined) {
					uni.navigateTo({
						url: '/pages/public/build-mobile'
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		/* text-align: center;
		height: 400upx; */
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
