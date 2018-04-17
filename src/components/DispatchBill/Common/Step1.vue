<template>
	<div class="step step1">
		<div class="table" v-for="(carrierBill, index) in carrierBills">
			<el-table :data="[
				{
					'carrierOrderNo': carrierBill.carrierOrderNo,
					'shipperArea': carrierBill.shipperArea,
					'shipperDetailAddress': carrierBill.shipperDetailAddress,
					'consigneeArea': carrierBill.consigneeArea,
					'consigneeDetailAddress': carrierBill.consigneeDetailAddress,
					'consigneeDate': carrierBill.consigneeDate
				}
			]" border style="width: 100%" size="mini">
				<el-table-column label="承运单号" prop="carrierOrderNo" width="180" align="center">
				</el-table-column>
				<el-table-column label="发货地">
					<template slot-scope="scope">
						<span>{{scope.row.shipperArea + scope.row.shipperDetailAddress}}</span>
					</template>
				</el-table-column>
				<el-table-column label="收货地">
					<template slot-scope="scope">
						<span>{{scope.row.consigneeArea + scope.row.consigneeDetailAddress}}</span>
					</template>
				</el-table-column>
				<el-table-column label="到货时间" width="100" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.consigneeDate | getdatefromtimestamp(true)}}</span>
					</template>
				</el-table-column>
			</el-table>
			<el-table 
				ref="multipleTable"
				:data="carrierBill.carrierCargo" 
				@selection-change="selectionChange($event, carrierBill.carrierOrderID)"
				border style="width: 100%;margin-top:-1px" size="mini" resizable="false">
				<el-table-column type="selection" width="40" align="center"></el-table-column>
				<el-table-column label="货物规格/货物名称" prop="cargoName" width="140">
					<template slot-scope="scope">
						<span>{{scope.row.cargoType}}{{scope.row.cargoName ? '/' + scope.row.cargoName : ''}}</span>
					</template>
				</el-table-column>
				<el-table-column label="待配载量" width="180" align="center">
					<template slot-scope="scope">
						{{scope.row.remainingCargoWeight ? (scope.row.remainingCargoWeight + '吨') : ''}} 
						{{scope.row.remainingCargoVolume ? ('/' + scope.row.remainingCargoVolume + '方') : ''}} 
						{{scope.row.remainingCargoNum ? ('/' + scope.row.remainingCargoNum + '件') : ''}}
					</template>
				</el-table-column>
				<el-table-column label="配载重量" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载重量" size="mini" v-model="scope.row.cargoWeightNew">
							<span slot="append">吨</span>
						</el-input>
					</template>
				</el-table-column>
				<el-table-column label="配载体积" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载体积" size="mini" v-model="scope.row.cargoVolumeNew">
							<span slot="append">方</span>
						</el-input>
					</template>
				</el-table-column>
				<el-table-column label="配载件数" align="center">
					<template slot-scope="scope">
						<el-input placeholder="配载件数" size="mini" v-model="scope.row.cargoNumNew">
							<span slot="append">件</span>
						</el-input>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="total-table">
			<!-- <el-button size="mini" @click="selectAll(true)" v-if="isSel">全部选中</el-button>
			<el-button size="mini" @click="selectAll(false)" v-if="!isSel">全部取消</el-button> -->
			&nbsp;已配载{{selectedCargoList.length}}个货物
			<div class="fr total-count"><b>合计：</b><span>{{totalWeight}}吨</span><span>{{totalVolume}}方</span><span>{{totalNum}}件</span></div>
		</div>
		<div class="step-footer">
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import { isFloat } from '../../../common/validators'
	export default {
		props: {
			carrierBills: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				selectedCargoList: [],
				isSel: true
			}
		},
		computed: {
			totalWeight() {
				const values = this.selectedCargoList.map(item => Number(item.cargoWeightNew ? item.cargoWeightNew : 0))
				return values.reduce((prev, curr) => {
					return prev + curr
				}, 0).toFixed(2)
			},
			totalVolume() {
				const values = this.selectedCargoList.map(item => Number(item.cargoVolumeNew ? item.cargoVolumeNew : 0))
				return values.reduce((prev, curr) => {
					return prev + curr
				}, 0).toFixed(2)
			},
			totalNum() {
				const values = this.selectedCargoList.map(item => Number(item.cargoNumNew ? item.cargoNumNew : 0))
				return values.reduce((prev, curr) => {
					return prev + curr
				}, 0).toFixed(2)
			},
		},
		methods: {
			nextStep() {
				let list = []
				if (this.selectedCargoList.length == 0) {
					Message.error('请选择承运单!')
					return
				}
				for (let i = 0; i < this.selectedCargoList.length; i++) {
					if (this.selectedCargoList[i].weightType == 'Light') {
						if (!this.selectedCargoList[i].cargoVolumeNew) {
							Message.error('货物《' + this.selectedCargoList[i].cargoName + '》体积不能为空!')
							return
						}
					} else if (this.selectedCargoList[i].weightType == 'Heavy') {
						if (!this.selectedCargoList[i].cargoWeightNew) {
							Message.error('货物《' + this.selectedCargoList[i].cargoName + '》重量不能为空!')
							return
						}
					} else {
						if (!this.selectedCargoList[i].cargoNumNew && !this.selectedCargoList[i].cargoVolumeNew && !this.selectedCargoList[i].cargoWeightNew) {
							Message.error('货物《' + this.selectedCargoList[i].cargoName + '》体积、重量、数量必填一项!')
							return
						}
					}
					if (this.selectedCargoList[i].cargoWeightNew < 0) {
						Message.error('货物《' + this.selectedCargoList[i].cargoName + '》的配载重量输入数值必须大于零!')
						return
					}
					if (this.selectedCargoList[i].cargoVolumeNew  < 0) {
						Message.error('货物《' + this.selectedCargoList[i].cargoName + '》的配载体积输入数值必须大于零!')
						return
					}
					if (this.selectedCargoList[i].cargoNumNew < 0) {
						Message.error('货物《' + this.selectedCargoList[i].cargoName + '》的配载件数输入数值必须大于零!')
						return
					}
					if (this.selectedCargoList[i].cargoWeightNew > this.selectedCargoList[i].remainingCargoWeight) {
						Message.error('货物《' + this.selectedCargoList[i].cargoName + '》的配载重量不能超过待配载重量!')
						return
					}
					if (this.selectedCargoList[i].cargoVolumeNew > this.selectedCargoList[i].remainingCargoVolume) {
						Message.error('货物《' + this.selectedCargoList[i].cargoName + '》的配载体积不能超过待配载体积!')
						return
					}
					if (this.selectedCargoList[i].cargoNumNew > this.selectedCargoList[i].remainingCargoNum) {
						Message.error('货物《' + this.selectedCargoList[i].cargoName + '》的配载件数不能超过待配载件数!')
						return
					}
					let carrierBill = this.carrierBills.filter(item => item.carrierOrderID == this.selectedCargoList[i].carrierOrderID)
					list.push({
						cargoNum: Number(this.selectedCargoList[i].cargoNumNew),
						cargoType: this.selectedCargoList[i].cargoType,
						cargoName: this.selectedCargoList[i].cargoName,
						cargoVolume: Number(this.selectedCargoList[i].cargoVolumeNew),
						cargoWeight: Number(this.selectedCargoList[i].cargoWeightNew),
						carrierCargoID: this.selectedCargoList[i].carrierCargoID,
						carrierOrderID: this.selectedCargoList[i].carrierOrderID,
						carrierOrder: carrierBill[0] ? carrierBill[0] : '',
						weightType: this.selectedCargoList[i].weightType,
					})
				}
				this.$emit('nextStep', 1, list, [this.totalWeight, this.totalVolume, this.totalNum])
			},
			selectionChange(data, orderID) {
				console.log(data, orderID)
				for (let i = 0; i < data.length; i++) {
					data[i].cargoWeightNew = data[i].remainingCargoWeight
					data[i].cargoVolumeNew = data[i].remainingCargoVolume
					data[i].cargoNumNew = data[i].remainingCargoNum
				}
				let list = this.selectedCargoList.filter(item => item.carrierOrderID != orderID)
				list.push(...data)
				this.selectedCargoList = list
				console.log(this.selectedCargoList)
			},
			selectAll(type) {
				if (type) {
					this.selectedCargoList = []
					this.carrierBills.forEach(item => {
						this.selectedCargoList.push(...item.carrierCargo)
					})
					this.selectedCargoList.forEach(row => {
						this.$refs.multipleTable.forEach(item => {
							item.toggleRowSelection(row)
						})
					})
						
					this.isSel = false
				} else {
					this.selectedCargoList = []
					this.$refs.multipleTable.forEach(item => {
						item.clearSelection()
					})
					this.isSel = true
				}
			},
			back() {
				this.$router.go(-1)
			},
		}
	}
</script>
<style lang="stylus" scoped>
	.step-footer
		margin-top 20px
		text-align center
	.table
		margin-top 10px
		&:first-child
			margin-top 0
	.total-table
		padding-left 10px
		height 40px
		border 1px solid #ebeef5
		border-top none
		line-height 40px
		color #409EFF
		span
			width 180px
			display inline-block
			padding 0 25px
			border-left 1px solid #ebeef5
		b
			padding-right 10px
</style>