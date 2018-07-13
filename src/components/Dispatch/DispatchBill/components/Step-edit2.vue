<template>
	<div class="step step2">
		<div class="stowageItem" v-for="item in carrierBills" :key="item.carrierOrderNo">
			<div class="tit">
				<span class="infoItem">承运单号：{{item.carrierOrderNo}}</span>
				<span class="infoItem">{{item.shipperArea}}</span>
				<span class="infoItem">-></span>
				<span class="infoItem">{{item.consigneeArea}}</span>
				<span class="infoItem">{{item.consigneeDate | getdatefromtimestamp(true)}}（预约达到）</span>
			</div>
			<el-table border 
				ref="multipleTable" 
				style="width: 100%" 
				size="mini" 
				:data="item.cargo" 
				@select="selectionSimple" 
				@select-all="selectionAll($event, item)">
				<el-table-column type="selection" width="40" align="center" :selectable="() => dispatchOrderID ? false : true"></el-table-column>
				<el-table-column label="货物名称" align="center" prop="cargoName">	</el-table-column>
				<el-table-column label="待配货量" align="center" >
					<template slot-scope="scope">
						{{scope.row.remainingCargoWeight ? (scope.row.remainingCargoWeight + '吨') : ''}} 
					</template> 
				</el-table-column>
				<el-table-column label="待配体积" align="center" >
					<template slot-scope="scope">
						{{scope.row.remainingCargoVolume ? (scope.row.remainingCargoVolume + '方') : ''}} 
					</template> 
				</el-table-column>
				<el-table-column label="待配件数" align="center" prop="remainingCargoNum">
					<template slot-scope="scope">
						{{scope.row.remainingCargoNum ? (scope.row.remainingCargoNum + scope.row.cargoUnitName) : ''}}
					</template>
				</el-table-column>
				<el-table-column label="配载重量" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载重量" size="mini" v-model="scope.row.cargoWeightNew" @change="handInputChange(true)">
							<span slot="append">吨</span>
						</el-input>
					</template>	
				</el-table-column>
				<el-table-column label="配载体积" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载体积" size="mini" v-model="scope.row.cargoVolumeNew" @change="handInputChange(true)">
							<span slot="append">方</span>
						</el-input>
					</template>					
				</el-table-column>
				<el-table-column label="配载数量" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载件数" size="mini" v-model="scope.row.cargoNumNew" @change="handInputChange(true)">
							<span slot="append">{{scope.row.cargoUnitName}}</span>
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
				<span>{{totalNum}}</span>
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
import Dispatchbill from '../../../../api/Dispatchbill'
export default {
	data() {
		return {
			carrierBills: [],
			selectedCargoList: [],
			totalWeight: 0,
			totalVolume: 0,
			totalNum: 0,
			dispatchOrderID: this.$route.query.dispatchOrderID
		}
	},
	computed: {
		...mapGetters(['selectedCarrierBill', 'selectedCargos'])
	},
	created() {
		let carrierOrderIDs = this.selectedCarrierBill.map(item => item.carrierOrderID).join(',')
		this.getList(carrierOrderIDs)
	},
	methods: {
		handTotalWeight() {
			let values = this.selectedCargos.map(item => Number(item.cargoWeightNew ? item.cargoWeightNew : 0))
			this.totalWeight = values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
		},
		handTotalVolume() {
			let values = this.selectedCargos.map(item => Number(item.cargoVolumeNew ? item.cargoVolumeNew : 0))
			this.totalVolume = values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
		},
		handTotalNum() {
			let values = this.selectedCargos.map(item => Number(item.cargoNumNew ? item.cargoNumNew : 0))
			this.totalNum = values.reduce((prev, curr) => {
				return prev + curr
			}, 0)
		},
		handInputChange(bool) {
			this.handTotalWeight()
			this.handTotalVolume()
			this.handTotalNum()
			bool && this.autoSetInput()
		},
		autoSetInput() {
			let cargoList = []
			this.carrierBills.forEach((carrierBill, index) => {
				let selectCargoIDs = this.selectedCargos.map(item => item.carrierCargoID)
				carrierBill.cargo.forEach(cargo => {
					if (selectCargoIDs.includes(cargo.carrierCargoID)) {
						cargoList.push(cargo)
					}
				})
			})
			this.$store.dispatch('setCargo', cargoList)
		},
		getList(carrierOrderIDs) {
			let params = { carrierOrderIDs }
			this.dispatchOrderID && (params['dispatchOrderID'] = this.dispatchOrderID)
			Dispatchbill.findPreLoad(params).then(res => {
				this.carrierBills = res
				if (this.dispatchOrderID) {
					let cargoList = []
					res.forEach((carrierBill, index) => {
						let cargo = carrierBill.cargo.filter(item => item.dispatchOrderID && item.dispatchOrderID == this.dispatchOrderID)
						this.$nextTick(() => {
							cargo.forEach(row => {
								if (!row.cargoWeightNew) row.cargoWeightNew = row.loadCargoWeight
								if (!row.cargoVolumeNew) row.cargoVolumeNew = row.loadCargoVolume
								if (!row.cargoNumNew) row.cargoNumNew = row.loadCargoNum
								this.$refs.multipleTable[index].toggleRowSelection(row)
							})
							cargoList.push(...cargo)
							this.$store.dispatch('setCargo', cargoList)
							this.handInputChange()
						})
					})
				}
			})
		},
		selectionAll(data, carrierBill) {
			if (this.dispatchOrderID) return
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
			if (this.selectedCargos.length > 0) {
				this.selectedCargoList = this.selectedCargos
			}
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
			if (this.selectedCargos.length == 0) {
				Message.error(`请选择货物！`)
				return
			}
			for (let i = 0; i < this.selectedCargos.length; i++) {
				const cargo = this.selectedCargos[i]
				if (cargo.weightType == 'Heavy') {
					if (!cargo.cargoWeightNew || Number(cargo.cargoWeightNew) <= 0) {
						Message.error(`货物“${cargo.cargoName}”的配载重量必填！`)
						return
					}
					if (Number(cargo.cargoVolumeNew) < 0) {
						Message.error(`货物“${cargo.cargoName}”的配载体积不能小于0！`)
						return
					}
				} else if (cargo.weightType == 'Light') {
					if (Number(cargo.cargoWeightNew) < 0) {
						Message.error(`货物“${cargo.cargoName}”的配载重量不能小于0！`)
						return
					}
					if (!cargo.cargoVolumeNew || Number(cargo.cargoVolumeNew) <= 0) {
						Message.error(`货物“${cargo.cargoName}”的配载体积必填！`)
						return
					}
				}
				if (Number(cargo.cargoWeightNew) > Number(cargo.remainingCargoWeight)) {
					Message.error(`货物“${cargo.cargoName}”的配载重量不能大于待配载重量！`)
					return
				}
				
				if (Number(cargo.cargoVolumeNew) > Number(cargo.remainingCargoVolume)) {
					Message.error(`货物“${cargo.cargoName}”的配载体积不能大于待配载体积！`)
					return
				}
				if (Number(cargo.cargoNumNew) < 0) {
					Message.error(`货物“${cargo.cargoName}”的配载数量不能小于0！`)
					return
				}
				if (Number(cargo.cargoNumNew) > Number(cargo.remainingCargoNum)) {
					Message.error(`货物“${cargo.cargoName}”的配载数量不能大于待配载数量！`)
					return
				}
			}
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