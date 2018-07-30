<template>
	<div class="step step2">
		<div class="stowageItem" v-for="item in carrierBills" :key="item.carrierOrderNo">
			<div class="tit">
				<span class="infoItem">承运单号：{{item.carrierOrderNo}}</span>
				<span class="infoItem">{{item.shipperArea}}</span>
				<span class="infoItem">-></span>
				<span class="infoItem">{{item.consigneeArea}}</span>
				<span class="infoItem">{{item.consigneeDate | getdatefromtimestamp('min')}}（预约到达）</span>
			</div>
			<el-table border 
				ref="multipleTable" 
				style="width: 100%" 
				size="mini" 
				:data="item.cargo" 
				@select="selectionSimple" 
				@select-all="selectionAll($event, item)">
				<el-table-column type="selection" width="40" align="center"></el-table-column>
				<el-table-column label="货物名称" align="center" prop="cargoName">	</el-table-column>
				<el-table-column label="待配货量" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.remainingCargoWeight ? (scope.row.remainingCargoWeight + '吨') : ''}}</span>
						<span>{{scope.row.remainingCargoVolume ? '/' + (scope.row.remainingCargoVolume + '方') : ''}}</span>
						<span>{{scope.row.remainingCargoNum ? '/' + (scope.row.remainingCargoNum + (scope.row.cargoUnitName?scope.row.cargoUnitName:'')) : ''}}</span>
					</template>
				</el-table-column>
				<el-table-column label="配载重量" align="center">
					<template slot-scope="scope">
						<el-form :model="scope.row" ref="ruleForm">
							<el-form-item prop="cargoWeightNew" :rules="[{ validator: checkFloat2 }, {
								validator: (rule, value, callback) => {
									if (value > scope.row.remainingCargoWeight) {
										callback('配载重量不能大于待配重量！')
									} else {
										callback()
									}
								}
							}]">
								<el-input placeholder="配载重量" size="mini" v-model="scope.row.cargoWeightNew" @change="handInputChange(true)">
									<span slot="append">吨</span>
								</el-input>
							</el-form-item>
						</el-form>
					</template>	
				</el-table-column>
				<el-table-column label="配载体积" align="center">
					<template slot-scope="scope">
						<el-form :model="scope.row" ref="ruleForm">
							<el-form-item prop="cargoVolumeNew" :rules="[{ validator: checkFloat2 }, {
								validator: (rule, value, callback) => {
									if (value > scope.row.remainingCargoVolume) {
										callback('配载体积不能大于待配体积！')
									} else {
										callback()
									}
								}
							}]">
								<el-input placeholder="配载体积" size="mini" v-model="scope.row.cargoVolumeNew" @change="handInputChange(true)">
									<span slot="append">方</span>
								</el-input>
							</el-form-item>
						</el-form>
					</template>					
				</el-table-column>
				<el-table-column label="配载数量" align="center">
					<template slot-scope="scope">
						<el-form :model="scope.row" ref="ruleForm">
							<el-form-item prop="cargoNumNew" :rules="[{ required: true, message: '请输入配载数量'}, { validator: checkInt }, {
								validator: (rule, value, callback) => {
									if (value > scope.row.remainingCargoNum) {
										callback('配载数量不能大于待配数量！')
									} else if(value<1) {
										callback('配载数量不能为空！')
									}else {
										callback()
									}
								}
							}]">
								<el-input placeholder="配载件数" size="mini" v-model="scope.row.cargoNumNew" @change="handInputChange(true)">
									<span slot="append">{{scope.row.cargoUnitName}}</span>
								</el-input>
							</el-form-item>
						</el-form>
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
import { checkInt, checkFloat2 } from '../../../../common/validator'
export default {
	data() {
		return {
			carrierBills: [],
			selectedCargoList: [],
			totalWeight: 0,
			totalVolume: 0,
			totalNum: 0
		}
	},
	computed: {
		...mapGetters(['selectedCarrierBill', 'selectedCargos']),
		checkInt: () => checkInt,
		checkFloat2: () => checkFloat2
	},
	created() {
		const carrierOrderIDs = this.selectedCarrierBill.map(item => item.carrierOrderID).join(',')
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
			const cargoList = []
			this.carrierBills.forEach((carrierBill, index) => {
				const selectCargoIDs = this.selectedCargos.map(item => item.carrierCargoID)
				carrierBill.cargo.forEach(cargo => {
					if (selectCargoIDs.includes(cargo.carrierCargoID)) {
						cargoList.push(cargo)
					}
				})
			})
			this.$store.dispatch('setCargo', cargoList)
		},
		getList(carrierOrderIDs) {
			Dispatchbill.findPreLoad({ carrierOrderIDs }).then(res => {
				this.carrierBills = res
				res.forEach((carrierBill, index) => {
					this.$nextTick(() => {
						carrierBill.cargo.forEach(cargo => {
							const x = this.selectedCargos.map(item => item.carrierCargoID).indexOf(cargo.carrierCargoID)
							if (x > -1) {
								cargo.cargoWeightNew = this.selectedCargos[x].cargoWeightNew
								cargo.cargoVolumeNew = this.selectedCargos[x].cargoVolumeNew
								cargo.cargoNumNew = this.selectedCargos[x].cargoNumNew
								this.$refs.multipleTable[index].toggleRowSelection(cargo)
							}
						})
						this.handInputChange()
					})
				})
			})
		},
		selectionAll(data, carrierBill) {
			const list = this.selectedCargos.filter(item => item.carrierOrderID != carrierBill.carrierOrderID)
			if (data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					if (!data[i].cargoWeightNew) data[i].cargoWeightNew = data[i].remainingCargoWeight
					if (!data[i].cargoVolumeNew) data[i].cargoVolumeNew = data[i].remainingCargoVolume
					if (!data[i].cargoNumNew) data[i].cargoNumNew = data[i].remainingCargoNum
				}
				list.push(...data)
			}
			this.$store.dispatch('setCargo', list)
			this.handInputChange()
		},
		selectionSimple(data, row) {
			const list = this.selectedCargos
			let flag = true
			for (let i = 0; i < list.length; i++) {
				if (list[i].carrierCargoID == row.carrierCargoID) {
					list.splice(i, 1)
					flag = false
				}
			}
			if (!row.cargoWeightNew) row.cargoWeightNew = row.remainingCargoWeight
			if (!row.cargoVolumeNew) row.cargoVolumeNew = row.remainingCargoVolume
			if (!row.cargoNumNew) row.cargoNumNew = row.remainingCargoNum
			if (flag) list.push(row)
			this.$store.dispatch('setCargo', list)
			this.handInputChange()
		},
		nextStep(){
			if (this.selectedCargos.length == 0) {
				Message.error(`请选择货物！`)
				return
			}
			new Promise((resolve, reject) => {
				let flag = true
				for (let i = 0; i < this.$refs['ruleForm'].length; i++) {
					const item = this.$refs['ruleForm'][i]
					if (this.selectedCargos.map(cargo => cargo.carrierCargoID).includes(item.model.carrierCargoID)) {
						item.validate(valid => {
							if (!valid) {
								flag = false
							}
						})
					}
				}
				flag ? resolve() : reject()
			}).then(() => {
				for (let i = 0; i < this.selectedCargos.length; i++) {
					const cargo = this.selectedCargos[i]
					if (cargo.remainingCargoWeight || cargo.remainingCargoVolume) {
						if ((!cargo.cargoWeightNew || Number(cargo.cargoWeightNew) <= 0) 
							&& (!cargo.cargoVolumeNew || Number(cargo.cargoVolumeNew) <= 0)) {
							Message.error(`货物“${cargo.cargoName}”的配载重量和体积必填一项！`)
							return
						}
					}
				}
				this.$emit('nextStep', 3)
			}).catch(err => { })
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
.el-form-item
	margin-bottom 17px
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
.text-input-append
	height 40px
	line-height 1
	color #606266
	-webkit-appearance none
	background-color #fff
	border 1px solid #dcdfe6
	border-radius 4px
</style>