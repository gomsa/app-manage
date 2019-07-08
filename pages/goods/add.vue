<template>
	<view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
        <form>
            <view class="cu-form-group">
				<view class="title">部门</view>
				<picker mode="multiSelector" 
                    @change="DepmartmentChange" 
                    @columnchange="DepmartmentColumnChange" 
                    :value="depmartment" 
                    :range="depmartmentArray"   
                    range-key="name"
                >
					<view class="picker">
						{{depmartmentArray[0][depmartment[0]].name}}，{{depmartmentArray[1][depmartment[1]].name}}，{{depmartmentArray[2][depmartment[2]].name}}
					</view>
				</picker>
			</view>
        </form>
	</view>
</template>

<script> 
    import {mapActions} from 'vuex';  
	export default {
		name: "file",
		data() {
			return {
                title: '添加商品',
                form:{
                    depmartment:'',
                },
                depmartment:[0,0,0],
                depmartmentArray: [
                    [
                        {'name':'一楼', 'id':"100"},
                        {'name':'二楼', 'id':"200"},
                        {'name':'三楼', 'id':"300"},
                    ],
                    [
                        {'name':'外联营', 'id':"110"},
                        {'name':'内联营', 'id':"120"},
                        {'name':'自营', 'id':"130"},
                        {'name':'代销', 'id':"140"},
                    ],
                    [
                        {'name':'名烟', 'id':"111"},
                        {'name':'名酒', 'id':"112"},
                        {'name':'红磨坊', 'id':"113"},
                        {'name':'梦金园', 'id':"114"},
                    ]
                ],
			};
		},
        computed: {
		},
		onShow() {
        },
        mounted(){
            this.getDepmartment()
		},
		methods: {
            /**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			...mapActions([
				'navTo'
            ]), 
            // 获取部门编码
            getDepmartment() {
                const depmartment = uni.getStorageSync('Depmartment')
                if (depmartment != '') {
                    this.depmartment = depmartment
                }
            },
            // 确认部门编码后赋值
            DepmartmentChange(e) {
                this.depmartment = e.detail.value
                uni.setStorageSync('Depmartment',this.depmartment)

                // 根据 depmartment 获取最后一个部门的真实 id
                const depmartmentLast = this.depmartment.slice(-1)[0]
                this.form.depmartment = this.depmartmentArray.slice(-1)[0][depmartmentLast].id
            },
            DepmartmentColumnChange(e) {
                console.log(e);
                
            }
		}
	}
</script>

<style  lang='scss'>
</style>
