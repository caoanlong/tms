<template>
	<div class="step step2">
		<div class="stowageItem" v-for="i in 4">
			<div class="tit">
				<span class="infoItem">承运单号：20170603002464</span>
				<span class="infoItem">云南昆明</span>
				<span class="infoItem">广东深圳</span>
				<span class="infoItem">2018-04-21 23:59（预约达到）</span>
			</div>
			<el-table border style="width: 100%" size="mini">
				<el-table-column type="selection" width="40" align="center">
				</el-table-column>
				<el-table-column label="货物类型" align="center">
				</el-table-column>
				<el-table-column label="货物名称" align="center">	
				</el-table-column>
				<el-table-column label="货物规格" align="center">
				</el-table-column>
				<el-table-column label="待配货量" align="center">
				</el-table-column>
				<el-table-column label="待配件数" align="center">	
				</el-table-column>
				<el-table-column label="配载重量" align="center">		
				</el-table-column>
				<el-table-column label="配载体积" align="center">					
				</el-table-column>
				<el-table-column label="配载数量" align="center">
				</el-table-column>
			</el-table>
		</div>
		<div class="total">
			<span class="fl">已配载0个货物</span>
			<div class="fr total-count"><b>合计：</b><span>0吨</span><span>0方</span><span>0件</span></div>
		</div>
		<div class="text-center">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">取消</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	export default {
		props: {
			carrierBills: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				cargoInfo:[]
			}
		},
		methods: {
			nextStep(){
				this.$emit('nextStep',2)
			},
			prevStep(){
				this.$emit('prevStep',0)
			},
			back() {
				this.$router.go(-1)
			},
			
		}
	}
</script>
<style lang="stylus" scoped>
	.stowageItem
		margin-bottom 10px
		.tit
			background #e2ecf6
			padding 5px 15px
			line-height 30px
			font-size 13px
			.infoItem
				display inline-block
				color #3582d0
				margin-right 20px
	.total
		background #e2ecf6
		padding 5px 15px
		line-height 30px
		height 40px
		font-size 13px
		color #3582d0
		margin-bottom 10px
</style>