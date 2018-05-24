<template>
	<div class="step step2">
		<div class="stowageItem" v-for="(item,index) in carrierBills" :key="index">
			<div class="tit">
				<span class="infoItem">承运单号：{{item.carrierOrderNo}}</span>
				<span class="infoItem">发货地：{{item.shipperDetailAddress}}</span>
				<span class="infoItem">收货地：{{item.consigneeDetailAddress}}</span>
				<span class="infoItem">到货时间：{{item.consigneeDate | getdatefromtimestamp(true)}}</span>
			</div>
			<el-table :data="item.carrierCargo" border style="width: 100%" size="mini">
				<el-table-column type="selection" width="40" align="center">
				</el-table-column>
				<el-table-column label="货物名称" align="center" prop="cargoName">
				</el-table-column>
				<el-table-column label="货物规格" align="center" prop="cargoType">
				</el-table-column>
				<el-table-column label="待配载量" align="center">
					<template slot-scope="scope">
						{{scope.row.remainingCargoWeight ? (scope.row.remainingCargoWeight + '吨') : ''}} 
						{{scope.row.remainingCargoVolume ? ('/' + scope.row.remainingCargoVolume + '方') : ''}} 
						{{scope.row.remainingCargoNum ? ('/' + scope.row.remainingCargoNum + '件') : ''}}
					</template>
				</el-table-column>
				<el-table-column label="配载重量(吨)" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载重量" size="mini" v-model="scope.row.cargoWeightNew" >
							<span slot="append">吨</span>
						</el-input>
					</template>
				</el-table-column>
				<el-table-column label="配载体积(方)" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载体积" size="mini" v-model="scope.row.cargoVolumeNew" >
							<span slot="append">方</span>
						</el-input>
					</template>
				</el-table-column>
				<el-table-column label="配载件数(件)" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载件数" size="mini" v-model="scope.row.cargoNumNew" >
							<span slot="append">件</span>
						</el-input>
					</template>
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