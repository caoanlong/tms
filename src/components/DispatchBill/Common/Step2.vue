<template>
	<div class="step step2">
		<div class="stowageItem" v-for="item in carrierBills" :key="item.carrierOrderNo">
			<div class="tit">
				<span class="infoItem">承运单号：{{item.carrierOrderNo}}</span>
				<span class="infoItem">{{item.shipperArea}}</span>
				<span class="infoItem">{{item.consigneeArea}}</span>
				<span class="infoItem">{{item.consigneeDate | getdatefromtimestamp()}}（预约达到）</span>
			</div>
			<el-table border 
				style="width: 100%" 
				size="mini" 
				:data="item.cargo" 
				@select="selectionSimple" 
				@select-all="selectionAll($event, item)">
				<el-table-column type="selection" width="40" align="center">
				</el-table-column>
				<el-table-column label="货物类型" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.weightType=='Heavy'">重货</span>
						<span v-else-if="scope.row.weightType=='Light'">轻货</span>
					</template>
				</el-table-column>
				<el-table-column label="货物名称" align="center" prop="cargoName">	
				</el-table-column>
				<el-table-column label="货物规格" align="center" prop="cargoType">
				</el-table-column>
				<el-table-column label="待配货量" align="center" >
					<template slot-scope="scope">
						{{scope.row.remainingCargoWeight ? (scope.row.remainingCargoWeight + 'kg') : ''}} 
						{{scope.row.remainingCargoVolume ? ('/' + scope.row.remainingCargoVolume + 'm³') : ''}} 
					</template> 
				</el-table-column>
				<el-table-column label="待配件数" align="center" prop="remainingCargoNum">
					<template slot-scope="scope">
						{{scope.row.remainingCargoNum ? (scope.row.remainingCargoNum + '件') : ''}}
					</template>
				</el-table-column>
				<el-table-column label="配载重量" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载重量" size="mini" v-model="scope.row.cargoWeightNew" >
							<span slot="append">kg</span>
						</el-input>
					</template>	
				</el-table-column>
				<el-table-column label="配载体积" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载体积" size="mini" v-model="scope.row.cargoVolumeNew" >
							<span slot="append">m³</span>
						</el-input>
					</template>					
				</el-table-column>
				<el-table-column label="配载数量" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载件数" size="mini" v-model="scope.row.cargoNumNew" >
							<span slot="append">件</span>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="total">
			<span class="fl">已配载{{selectedCargos.length}}个货物</span>
			<div class="fr total-count">
				<b>合计：</b>
				<span>{{totalWeight}}吨</span>
				<span>{{totalVolume}}方</span>
				<span>{{totalNum}}件</span>
			</div>
		</div>
		<div class="text-center">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">取消</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Carrierbill from '../../../api/Carrierbill'
import Dispatchbill from '../../../api/Dispatchbill'
export default {
	data() {
		return {
			carrierBills: [],
			selectedCargoList: []
		}
	},
	computed: {
		...mapGetters(['selectedCarrierBill', 'selectedCargos']),
		totalWeight() {
			let values = this.selectedCargos.map(item => Number(item.cargoWeightNew ? item.cargoWeightNew : 0))
			return values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
		},
		totalVolume() {
			let values = this.selectedCargos.map(item => Number(item.cargoVolumeNew ? item.cargoVolumeNew : 0))
			return values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
		},
		totalNum() {
			let values = this.selectedCargos.map(item => Number(item.cargoNumNew ? item.cargoNumNew : 0))
			return values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
		},
	},
	created() {
		let carrierOrderIDs = this.selectedCarrierBill.join(',')
		this.getList(carrierOrderIDs)
	},
	methods: {
		getDetail(carrierOrderID) {
			Carrierbill.findById({ carrierOrderID }).then(res => {
				this.carrierBills.push(res)
			})
		},
		getList(carrierOrderIDs) {
			Dispatchbill.findPreLoad({ carrierOrderIDs }).then(res => {
				this.carrierBills = res
			})
		},
		selectionAll(data, carrierBill) {
			let list = this.selectedCargoList.filter(item => item.carrierOrderID != carrierBill.carrierOrderID)
			if (data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					if (!data[i].cargoWeightNew) data[i].cargoWeightNew = data[i].remainingCargoWeight
					if (!data[i].cargoVolumeNew) data[i].cargoVolumeNew = data[i].remainingCargoVolume
					if (!data[i].cargoNumNew) data[i].cargoNumNew = data[i].remainingCargoNum
				}
				list.push(...data)
			}
			this.selectedCargoList = list
			this.$store.dispatch('setCargo', this.selectedCargoList)
		},
		selectionSimple(data, row) {
			let flag = true
			for (let i = 0; i < this.selectedCargoList.length; i++) {
				if (this.selectedCargoList[i].carrierCargoID == row.carrierCargoID) {
					this.selectedCargoList.splice(i, 1)
					flag = false
				}
			}
			if (!row.cargoWeightNew) row.cargoWeightNew = row.remainingCargoWeight
			if (!row.cargoVolumeNew) row.cargoVolumeNew = row.remainingCargoVolume
			if (!row.cargoNumNew) row.cargoNumNew = row.remainingCargoNum
			if (flag) {
				this.selectedCargoList.push(row)
			}
			this.$store.dispatch('setCargo', this.selectedCargoList)
		},
		nextStep(){
			this.$emit('nextStep', 3)
		},
		prevStep(){
			this.$emit('prevStep', 1)
		},
		back() {
			this.$router.go(-1)
		}
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