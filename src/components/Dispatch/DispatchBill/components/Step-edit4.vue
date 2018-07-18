<template>
	<div class="step step4">
		<div class="item" v-for="(task, index) in taskList" :key="task.carrierOrderID">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>任务单号：{{index + 1}}</span>
					<span>{{task.shipperArea}}</span> -> <span>{{task.consigneeArea}}</span>
				</div>
				<el-row class="section-block" style="margin-bottom:30px">
					<span class="block-title">货物清单</span>
					<div class="block-content">
						<table class="cargoList">
							<tr>
								<th>承运单</th>
								<th>货物名称</th>
								<th>货物重量</th>
								<th>货物体积</th>
								<th>货物数量</th>
							</tr>
							<tr v-for="cargoItem in task.cargo" :key="cargoItem.carrierCargoID">
								<td align="center">{{task.carrierOrderNo}}</td>
								<td align="center">{{cargoItem.cargoName}}</td>
								<td align="center">{{cargoItem.cargoWeightNew ? cargoItem.cargoWeightNew + '吨' : ''}}</td>
								<td align="center">{{cargoItem.cargoVolumeNew ? cargoItem.cargoVolumeNew + '方' : ''}}</td>
								<td align="center">{{cargoItem.cargoNumNew ? cargoItem.cargoNumNew + cargoItem.cargoUnitName : ''}}</td>
							</tr>
						</table>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:10px">
					<span class="block-title">运费录入</span>
					<div class="block-content">
						<table class="cargoList">
							<tr>
								<th style="width:90px">人员</th>
								<th>现付</th>
								<th>到付</th>
								<th>回单付</th>
								<th>月结</th>
								<th>收货方付</th>
								<th style="width:90px">合计</th>
							</tr>
							<tr class="text-center">
								<td>司机</td>
								<td><el-input size="mini" v-model="task.driverCashAmount"></el-input></td>
								<td><el-input size="mini" v-model="task.driverCodAmount"></el-input></td>
								<td><el-input size="mini" v-model="task.driverPorAmount"></el-input></td>
								<td><el-input size="mini" v-model="task.driverMonthlyAmont"></el-input></td>
								<td><el-input size="mini" v-model="task.driverCosigneeAmount"></el-input></td>
								<td>
									{{
										(Number(task.driverCashAmount ? task.driverCashAmount : 0) 
										+ Number(task.driverCodAmount ? task.driverCodAmount : 0) 
										+ Number(task.driverPorAmount ? task.driverPorAmount : 0) 
										+ Number(task.driverMonthlyAmont ? task.driverMonthlyAmont : 0) 
										+ Number(task.driverCosigneeAmount ? task.driverCosigneeAmount : 0)).toFixed(2)
									}}
								</td>
							</tr>
							<tr class="text-center" v-if="selectedTruck.superCargo">
								<td>押运员</td>
								<td><el-input size="mini" v-model="task.superCargoCashAmount"></el-input></td>
								<td><el-input size="mini" v-model="task.superCargoCodAmount"></el-input></td>
								<td><el-input size="mini" v-model="task.superCargoCorAmount"></el-input></td>
								<td><el-input size="mini" v-model="task.superCargoMonthlyAmount"></el-input></td>
								<td><el-input size="mini" v-model="task.superCosigneeAmount"></el-input></td>
								<td>
									{{
										(Number(task.superCargoCashAmount ? task.superCargoCashAmount : 0) 
										+ Number(task.superCargoCodAmount ? task.superCargoCodAmount : 0) 
										+ Number(task.superCargoCorAmount ? task.superCargoCorAmount : 0) 
										+ Number(task.superCargoMonthlyAmount ? task.superCargoMonthlyAmount : 0) 
										+ Number(task.superCosigneeAmount ? task.superCosigneeAmount : 0)).toFixed(2)
									}}
								</td>
							</tr>
							<tr class="text-center">
								<td>合计</td>
								<td>
									{{
										(Number(task.driverCashAmount ? task.driverCashAmount : 0) 
										+ Number(selectedTruck.superCargo && task.superCargoCashAmount ? task.superCargoCashAmount : 0)).toFixed(2) 
									}}
								</td>
								<td>
									{{
										(Number(task.driverCodAmount ? task.driverCodAmount : 0) 
										+ Number(selectedTruck.superCargo && task.superCargoCodAmount ? task.superCargoCodAmount : 0)).toFixed(2) 
									}}
								</td>
								<td>
									{{
										(Number(task.driverPorAmount ? task.driverPorAmount : 0) 
										+ Number(selectedTruck.superCargo && task.superCargoCorAmount ? task.superCargoCorAmount : 0)).toFixed(2) 
									}}
								</td>
								<td>
									{{
										(Number(task.driverMonthlyAmont ? task.driverMonthlyAmont : 0) 
										+ Number(selectedTruck.superCargo && task.superCargoMonthlyAmount ? task.superCargoMonthlyAmount : 0)).toFixed(2)
									}}
								</td>
								<td>
									{{
										(Number(task.driverCosigneeAmount ? task.driverCosigneeAmount : 0) 
										+ Number( selectedTruck.superCargo && task.superCosigneeAmount ? task.superCosigneeAmount : 0)).toFixed(2)
									}}
								</td>
								<td>
									{{
										(Number(task.driverCashAmount ? task.driverCashAmount : 0) 
										+ Number(task.driverCodAmount ? task.driverCodAmount : 0) 
										+ Number(task.driverPorAmount ? task.driverPorAmount : 0) 
										+ Number(task.driverMonthlyAmont ? task.driverMonthlyAmont : 0) 
										+ Number(task.driverCosigneeAmount ? task.driverCosigneeAmount : 0)
										+ Number(selectedTruck.superCargo && task.superCargoCashAmount ? task.superCargoCashAmount : 0) 
										+ Number(selectedTruck.superCargo && task.superCargoCodAmount ? task.superCargoCodAmount : 0) 
										+ Number(selectedTruck.superCargo && task.superCargoCorAmount ? task.superCargoCorAmount : 0) 
										+ Number(selectedTruck.superCargo && task.superCargoMonthlyAmount ? task.superCargoMonthlyAmount : 0) 
										+ Number(selectedTruck.superCargo && task.superCosigneeAmount ? task.superCosigneeAmount : 0)).toFixed(2)
									}}
								</td>
							</tr>
						</table>
					</div>
				</el-row>
			</el-card>
		</div>
		<div class="totalAmount">本次调度总运费：￥{{totalAmount}}</div>
		<div class="text-center">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" @click="add">完成</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Dispatchbill from '../../../../api/Dispatchbill'
import { resizeImg } from '../../../../common/utils'
export default {
	data() {
		return {
			taskList: [],
			dispatchOrderID: this.$route.query.dispatchOrderID
		}
	},
	computed: {
		...mapGetters(['selectedCarrierBill', 'selectedTruck', 'selectedCargos']),
		totalAmount() {
			let amount = 0
			this.taskList.forEach(item => {
				let itemAmount = Number(item.driverCashAmount ? item.driverCashAmount : 0) 
					+ Number(item.driverCodAmount ? item.driverCodAmount : 0) 
					+ Number(item.driverPorAmount ? item.driverPorAmount : 0) 
					+ Number(item.driverMonthlyAmont ? item.driverMonthlyAmont : 0) 
					+ Number(item.driverCosigneeAmount ? item.driverCosigneeAmount : 0)
					+ Number(this.selectedTruck.superCargo && item.superCargoCashAmount ? item.superCargoCashAmount : 0) 
					+ Number(this.selectedTruck.superCargo && item.superCargoCodAmount ? item.superCargoCodAmount : 0) 
					+ Number(this.selectedTruck.superCargo && item.superCargoCorAmount ? item.superCargoCorAmount : 0) 
					+ Number(this.selectedTruck.superCargo && item.superCargoMonthlyAmount ? item.superCargoMonthlyAmount : 0) 
					+ Number(this.selectedTruck.superCargo && item.superCosigneeAmount ? item.superCosigneeAmount : 0)
				amount += itemAmount
			})
			return amount.toFixed(2)
		},
		resizeImg: () => resizeImg
	},
	created() {
		this.selectedCarrierBill.forEach(item => { item.cargo = [] })
		this.taskList = this.selectedCarrierBill.filter(item => this.selectedCargos.map(i => i.carrierOrderID).includes(item.carrierOrderID))
		this.taskList.forEach(carrierBill => {
			!carrierBill.cargo && (carrierBill.cargo = [])
			this.selectedCargos.forEach(cargo => {
				if (cargo.carrierOrderID == carrierBill.carrierOrderID) {
					carrierBill.cargo.push(cargo)
				}
			})
		})
	},
	methods: {
		add() {
			for (let i = 0; i < this.taskList.length; i++) {
				const item = this.taskList[i]
				if (!item.driverCashAmount 
					&& !item.driverCodAmount 
					&& !item.driverPorAmount 
					&& !item.driverMonthlyAmont 
					&& !item.driverCosigneeAmount ) {
					Message.error(`任务单号：${i+1} 司机费用必填一项！`)
					return
				}
				if (this.selectedTruck.superCargo) {
					if (!item.superCargoCashAmount 
						&& !item.superCargoCodAmount 
						&& !item.superCargoCorAmount 
						&& !item.superCargoMonthlyAmount 
						&& !item.superCosigneeAmount ) {
						Message.error(`任务单号：${i+1} 随车人员费用必填一项！`)
						return
					}
				}
			}
			const dispatchTaskCargoInfo = this.selectedCargos.map(item => {
				return {
					'carrierCargoID': item.carrierCargoID,
					'carrierOrderID': item.carrierOrderID,
					'cargoWeight': item.cargoWeightNew,
					'cargoVolume': item.cargoVolumeNew,
					'cargoNum': item.cargoNumNew
				}
			})
			const dispatchTaskInfo = this.taskList.map(item => {
				return {
					'carrierOrderID': item.carrierOrderID,
					'amountSum': Number(item.driverCashAmount ? item.driverCashAmount : 0) 
					+ Number(item.driverCodAmount ? item.driverCodAmount : 0) 
					+ Number(item.driverPorAmount ? item.driverPorAmount : 0) 
					+ Number(item.driverMonthlyAmont ? item.driverMonthlyAmont : 0) 
					+ Number(item.driverCosigneeAmount ? item.driverCosigneeAmount : 0)
					+ Number(item.superCargoCashAmount ? item.superCargoCashAmount : 0) 
					+ Number(item.superCargoCodAmount ? item.superCargoCodAmount : 0) 
					+ Number(item.superCargoCorAmount ? item.superCargoCorAmount : 0) 
					+ Number(item.superCargoMonthlyAmount ? item.superCargoMonthlyAmount : 0) 
					+ Number(item.superCosigneeAmount ? item.superCosigneeAmount : 0),
					'driverCashAmount': item.driverCashAmount,
					'driverCodAmount': item.driverCodAmount,
					'driverPorAmount': item.driverPorAmount,
					'driverMonthlyAmont': item.driverMonthlyAmont,
					'driverCosigneeAmount': item.driverCosigneeAmount,
					'superCargoCashAmount': this.selectedTruck.superCargo ? item.superCargoCashAmount : 0,
					'superCargoCodAmount': this.selectedTruck.superCargo ? item.superCargoCodAmount : 0,
					'superCargoCorAmount': this.selectedTruck.superCargo ? item.superCargoCorAmount : 0,
					'superCargoMonthlyAmount': this.selectedTruck.superCargo ? item.superCargoMonthlyAmount : 0,
					'superCosigneeAmount': this.selectedTruck.superCargo ? item.superCosigneeAmount : 0
				}
			})
			Dispatchbill.update({
				'dispatchOrderID': this.dispatchOrderID,
				'dispatchTaskCargoInfo': JSON.stringify(dispatchTaskCargoInfo),
				'dispatchTaskInfo': JSON.stringify(dispatchTaskInfo),
				'sumAmount': this.totalAmount,
				'truckID': this.selectedTruck.truckID,
				'driverID': this.selectedTruck.primaryDriver.comSupercargoID,
				'superCargoID': this.selectedTruck.superCargo && this.selectedTruck.superCargo.comSupercargoID
			}).then(res => {
				Message.success('保存成功！')
				this.$store.dispatch('setTruck', null)
				this.$store.dispatch('clearCargo')
				this.$store.dispatch('clearCarrierBill')
				this.$router.push({name: 'dispatchbills'})
			})
		},
		prevStep(){
			this.$emit('prevStep', 3)
		},
		back() {
			this.$router.go(-1)
		},
	}
}
</script>
<style lang="stylus" scoped>
.totalAmount
	color #ff6900
	font-weight bold
	text-align center
	height 50px
	line-height 50px
.item
	margin-bottom 10px
	table
		width 100%
		background #e2ecf6
		border-spacing 1px
		font-size 14px
		margin-bottom 10px
		td
			background #fff
			padding 6px 10px
			height 36px
			line-height 24px
			color #666
			position relative
			&.tit
				background #e2ecf6
				color #3582d0
				.editBtn
					background #409eff
					color #FFF
					cursor pointer
					border-radius 4px
					padding 0 12px
					font-size 12px
					line-height 24px
					height 24px
			.justify
				width 80px
				height 24px
				display inline-block
				vertical-align top
				padding-right 20px
				color #3582d0
				text-align justify
				position absolute
				left 12px
				top 6px
				&:after
					content '：'
					position relative
					top -24px
					padding-left 100%
					display inline-block
		th
			background #f8f8f8
			padding 6px 10px
			height 36px
			line-height 24px
			color #666
.lineInfo
.personInfo
	font-size 14px
	.tit
		background #e2ecf6
		color #3582d0
		padding 6px 10px
		height 36px
		line-height 24px
	.con
		display flex
		border 1px solid #e2ecf6
		border-top none
		margin-bottom 10px
		color #666
		padding 10px
		p
			margin 0
			line-height 30px
			&.datetime
				line-height 20px
				font-size 12px
				color #999
			&.c2
				color #f90
		.from
		.to
		.driver
		.dispatcher
		.escort
			padding-left 60px
			position relative
			.headPic
				width 40px
				height 40px
				border-radius 20px
				position absolute
				left 10px
				top 10px
			.companyName
				font-size 16px
				color #333
			.area
				font-weight bold
				color #000
		div
			flex 1
		.driver
		.dispatcher
		.escort
			height 60px
			.name
				font-size 16px
				.tag
					margin-left 20px
					color #fff
					font-size 12px
					padding 2px 10px
					border-radius 10px
		.driver
			.tag
				background #f90
		.dispatcher
			.tag
				background #69f
		.escort
			border-left 1px solid #f8f8f8
			border-right 1px solid #f8f8f8
			.tag
				background #69c
		.platNo
			position relative
			border-left 1px solid #f8f8f8
			border-right 1px solid #f8f8f8
			span
				position absolute
				top 50%
				left 50%
				transform translate(-50%,-50%)
				font-size 18px
</style>