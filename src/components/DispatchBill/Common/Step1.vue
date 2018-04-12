<template>
	<div class="step step1">
		<div class="table" v-for="(carrierBill, index) in carrierBills">
			<el-table :data="[
				{
					'carrierOrderNo': carrierBill.carrierOrderNo,
					'shipperArea': carrierBill.shipperArea,
					'consigneeArea': carrierBill.consigneeArea,
					'consigneeDate': carrierBill.consigneeDate
				}
			]" border style="width: 100%" size="mini">
				<el-table-column label="承运单号" prop="carrierOrderNo" width="110" align="center">
				</el-table-column>
				<el-table-column label="发货地" prop="shipperArea">
				</el-table-column>
				<el-table-column label="收货地" prop="consigneeArea">
				</el-table-column>
				<el-table-column label="到货时间" width="140" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.consigneeDate | getdatefromtimestamp(true)}}</span>
					</template>
				</el-table-column>
			</el-table>
			<el-table 
				:data="carrierBill.carrierCargo" 
				@selection-change="selectionChange($event, carrierBill.carrierOrderID)"
				border style="width: 100%;margin-top:-1px" size="mini" resizable="false">
				<el-table-column type="selection" width="40" align="center"></el-table-column>
				<el-table-column label="货物规格/货物名称" prop="cargoName">
					<template slot-scope="scope">
						<span>{{scope.row.cargoType}}/{{scope.row.cargoName}}</span>
					</template>
				</el-table-column>
				<el-table-column label="待配载量">
					<template slot-scope="scope">
						{{scope.row.remainingCargoWeight}} 
						/{{scope.row.remainingCargoVolume}} 
						/{{scope.row.remainingCargoNum}}
					</template>
				</el-table-column>
				<el-table-column label="配载重量" width="180">
					<template slot-scope="scope">
						<el-input placeholder="配载重量" size="mini" v-model="scope.row.cargoWeightNew"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="配载体积" width="180">
					<template slot-scope="scope">
						<el-input placeholder="配载体积" size="mini" v-model="scope.row.cargoVolumeNew"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="配载件数" width="180">
					<template slot-scope="scope">
						<el-input placeholder="配载件数" size="mini" v-model="scope.row.cargoNumNew"></el-input>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="total-table">已配载{{selectedCargoList.length}}个货物
			<div class="fr total-count"><b>合计：</b><span>{{totalWeight}}</span><span>{{totalVolume}}</span><span>{{totalNum}}</span></div>
		</div>
		<div class="step-footer">
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">返回</el-button>
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
				selectedCargoList: []
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
					Message.error('配载货物不能为空!')
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
					let carrierBill = this.carrierBills.filter(item => item.carrierOrderID == this.selectedCargoList[i].carrierOrderID)
					list.push({
						cargoNum: Number(this.selectedCargoList[i].cargoNumNew),
						cargoType: this.selectedCargoList[i].cargoType,
						cargoName: this.selectedCargoList[i].cargoName,
						cargoVolume: Number(this.selectedCargoList[i].cargoVolumeNew),
						cargoWeight: Number(this.selectedCargoList[i].cargoWeightNew),
						carrierCargoID: this.selectedCargoList[i].carrierCargoID,
						carrierOrderID: this.selectedCargoList[i].carrierOrderID,
						carrierOrder: carrierBill[0] ? carrierBill[0] : ''
					})
				}
				console.log([this.totalWeight, this.totalVolume, this.totalNum])
				this.$emit('nextStep', 1, list, [this.totalWeight, this.totalVolume, this.totalNum])
			},
			selectionChange(data, orderID) {
				console.log(orderID)
				let carrierCargoIDs = this.selectedCargoList.map(item => item.carrierCargoID)

				for (let i = 0; i < this.selectedCargoList.length; i++) {
					if (orderID == this.selectedCargoList[i].carrierOrderID) {
						console.log('删除')
						this.selectedCargoList.splice(i, 1)
					}
				}

				data.forEach(item => {
					if (!carrierCargoIDs.includes(item.carrierCargoID)) {
						console.log('添加')
						this.selectedCargoList.push(item)
					}
				})
				console.log(data)
				console.log(this.selectedCargoList)
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
		margin-top -1px
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