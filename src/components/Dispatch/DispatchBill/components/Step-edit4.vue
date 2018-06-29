<template>
	<div class="step step4">
		<div class="personInfo">
			<div class="tit">人员信息</div>
			<div class="con">
				<div class="driver">
					<img :src="selectedDriver.driverHeadPic ? resizeImg(selectedDriver.driverHeadPic, '_80x80.') : require('../../../../assets/imgs/avatar.gif')" class="headPic"/>
					<p class="name">{{selectedDriver.driverName}}<span class="tag">司机</span></p>
					<p>{{selectedDriver.driverPhone}}</p>
				</div>
				<div class="escort">
					<img :src="selectedStaff.staffHeadPic ? resizeImg(selectedStaff.staffHeadPic, '_80x80.') : require('../../../../assets/imgs/avatar.gif')" class="headPic"/>
					<p class="name">{{selectedStaff.staffName}}<span class="tag">押运</span></p>
					<p>{{selectedStaff.staffPhone}}</p>
				</div>
			</div>
		</div>
		<div class="item" v-for="(task, index) in taskList" :key="task.carrierOrderID">
			<div class="lineInfo">
				<div class="tit"><span>任务单号：{{index + 1}}</span>
					<span class="status fr" v-if="task.status='Committed'">待执行</span>
					<span class="status fr" v-else-if="task.status='Loaded'">已装运</span>
					<span class="status fr" v-else-if="task.status='Signed'">已签收</span>
					<span class="status fr" v-else>已作废</span>
				</div>
				<div class="con">
					<div class="from">
						<img src="../../../../assets/imgs/avatar.gif" class="headPic"/>
						<p class="companyName">{{task.shipperCompanyName}}</p>
						<p>{{task.shipperName}}{{task.shipperPhone?('/'+task.shipperPhone):''}}</p>
						<p class="area">{{task.shipperArea}}</p>
						<p class="datetime">{{task.shipperDate | getdatefromtimestamp(true)}}（预计发货）</p>
						<p class="datetime c2" v-if="task.shipperActualDate">{{task.shipperActualDate | getdatefromtimestamp(true)}}（实际发货）</p>
					</div>
					<div class="platNo">
						<span>
							{{selectedDriver.plateNo}}
							{{selectedDriver.trailerPlateNo ? ('/' + selectedDriver.trailerPlateNo) : ''}}
						</span>
					</div>
					<div class="to">
						<img src="../../../../assets/imgs/avatar.gif" class="headPic"/>
						<p class="companyName">{{task.consigneeCompanyName}}</p>
						<p>{{task.consigneeName}}{{task.consigneePhone?('/'+task.consigneePhone):''}}</p>
						<p class="area">{{task.consigneeArea}}</p>
						<p class="datetime">{{task.consigneeDate | getdatefromtimestamp(true)}}（预计到货）</p>
						<p class="datetime c2" v-if="task.consigneeActualDate">{{task.consigneeActualDate | getdatefromtimestamp(true)}}（实际到货）</p>
					</div>
				</div>
			</div>
			<table class="cargoList">
				<tr>
					<td class="tit" colspan="4">货物清单</td>
				</tr>
				<tr v-for="cargoItem in task.cargo" :key="cargoItem.carrierCargoID">
					<td class="text-center" width="100">
						<span v-if="cargoItem.weightType == 'Heavy'">重货</span>
						<span v-else>轻货</span>
					</td>
					<td>{{cargoItem.cargoType}}</td>
					<td>{{cargoItem.cargoName}}</td>
					<td>
						{{cargoItem.cargoWeightNew?(cargoItem.cargoWeightNew+'kg/'+''):''}}
						{{cargoItem.cargoVolumeNew?cargoItem.cargoVolumeNew+'m³/':''}}
						{{cargoItem.cargoNumNew?cargoItem.cargoNumNew+'件':''}}
					</td>
				</tr>
			</table>
			<table class="fare">
				<tr>
					<td class="tit" colspan="7">付款费用</td>
				</tr>
				<tr>
					<th width="100">付给人员</th>
					<th>现付</th>
					<th>到付</th>
					<th>回单结</th>
					<th>月结</th>
					<th>收货方付款</th>
					<th>合计</th>
				</tr>
				<tr class="text-center">
					<td>司机</td>
					<td><el-input size="mini" v-model="task.driverCashAmount"></el-input></td>
					<td><el-input size="mini" v-model="task.driverCodAmount"></el-input></td>
					<td><el-input size="mini" v-model="task.driverPorAmount"></el-input></td>
					<td><el-input size="mini" v-model="task.driverMonthlyAmont"></el-input></td>
					<td><el-input size="mini" v-model="task.driverCosigneeAmount"></el-input></td>
					<td>
						<el-input size="mini" disabled :value="
							Number(task.driverCashAmount ? task.driverCashAmount : 0) 
							+ Number(task.driverCodAmount ? task.driverCodAmount : 0) 
							+ Number(task.driverPorAmount ? task.driverPorAmount : 0) 
							+ Number(task.driverMonthlyAmont ? task.driverMonthlyAmont : 0) 
							+ Number(task.driverCosigneeAmount ? task.driverCosigneeAmount : 0)">
						</el-input>
					</td>
				</tr>
				<tr class="text-center">
					<td>随行人员</td>
					<td><el-input size="mini" v-model="task.superCargoCashAmount"></el-input></td>
					<td><el-input size="mini" v-model="task.superCargoCodAmount"></el-input></td>
					<td><el-input size="mini" v-model="task.superCargoCorAmount"></el-input></td>
					<td><el-input size="mini" v-model="task.superCargoMonthlyAmount"></el-input></td>
					<td><el-input size="mini" v-model="task.superCosigneeAmount"></el-input></td>
					<td>
						<el-input size="mini" disabled :value="
						Number(task.superCargoCashAmount ? task.superCargoCashAmount : 0) 
						+ Number(task.superCargoCodAmount ? task.superCargoCodAmount : 0) 
						+ Number(task.superCargoCorAmount ? task.superCargoCorAmount : 0) 
						+ Number(task.superCargoMonthlyAmount ? task.superCargoMonthlyAmount : 0) 
						+ Number(task.superCosigneeAmount ? task.superCosigneeAmount : 0)">
						</el-input>
					</td>
				</tr>
				<tr>
					<td colspan="6"></td>
					<td style="font-weight:bold">任务运费：￥{{
						Number(task.driverCashAmount ? task.driverCashAmount : 0) 
						+ Number(task.driverCodAmount ? task.driverCodAmount : 0) 
						+ Number(task.driverPorAmount ? task.driverPorAmount : 0) 
						+ Number(task.driverMonthlyAmont ? task.driverMonthlyAmont : 0) 
						+ Number(task.driverCosigneeAmount ? task.driverCosigneeAmount : 0)
						+ Number(task.superCargoCashAmount ? task.superCargoCashAmount : 0) 
						+ Number(task.superCargoCodAmount ? task.superCargoCodAmount : 0) 
						+ Number(task.superCargoCorAmount ? task.superCargoCorAmount : 0) 
						+ Number(task.superCargoMonthlyAmount ? task.superCargoMonthlyAmount : 0) 
						+ Number(task.superCosigneeAmount ? task.superCosigneeAmount : 0)
					}}</td>
				</tr>
			</table>
		</div>
		<div class="totalAmount">本次调度总运费：￥{{totalAmount}}</div>
		<div class="text-center">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" @click="update">完成</el-button>
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
		...mapGetters(['selectedCarrierBill', 'selectedDriver', 'selectedStaff', 'selectedCargos']),
		totalAmount() {
			let amount = 0
			this.taskList.forEach(item => {
				let itemAmount = Number(item.driverCashAmount ? item.driverCashAmount : 0) 
					+ Number(item.driverCodAmount ? item.driverCodAmount : 0) 
					+ Number(item.driverPorAmount ? item.driverPorAmount : 0) 
					+ Number(item.driverMonthlyAmont ? item.driverMonthlyAmont : 0) 
					+ Number(item.driverCosigneeAmount ? item.driverCosigneeAmount : 0)
					+ Number(item.superCargoCashAmount ? item.superCargoCashAmount : 0) 
					+ Number(item.superCargoCodAmount ? item.superCargoCodAmount : 0) 
					+ Number(item.superCargoCorAmount ? item.superCargoCorAmount : 0) 
					+ Number(item.superCargoMonthlyAmount ? item.superCargoMonthlyAmount : 0) 
					+ Number(item.superCosigneeAmount ? item.superCosigneeAmount : 0)
				amount += itemAmount
			})
			return amount
		},
		resizeImg: () => resizeImg
	},
	created() {
		this.selectedCarrierBill.forEach(item => {
			item.cargo = []
		})
		this.taskList = this.selectedCarrierBill
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
		update() {
			for (let i = 0; i < this.taskList.length; i++) {
				const item = this.taskList[i]
				if (!item.driverCashAmount && !item.driverCodAmount && !item.driverPorAmount && !item.driverMonthlyAmont && !item.driverCosigneeAmount ) {
					Message.error(`任务单号：${i+1} 司机费用必填一项！`)
					return
				}
				if (!item.superCargoCashAmount && !item.superCargoCodAmount && !item.superCargoCorAmount && !item.superCargoMonthlyAmount && !item.superCosigneeAmount ) {
					Message.error(`任务单号：${i+1} 随车人员费用必填一项！`)
					return
				}
			}
			let dispatchTaskCargoInfo = this.selectedCargos.map(item => {
				return {
					'carrierCargoID': item.carrierCargoID,
					'carrierOrderID': item.carrierOrderID,
					'cargoWeight': Number(item.cargoWeightNew),
					'cargoVolume': Number(item.cargoVolumeNew),
					'cargoNum': Number(item.cargoNumNew)
				}
			})
			let dispatchTaskInfo = this.taskList.map(item => {
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
					'superCargoCashAmount': item.superCargoCashAmount,
					'superCargoCodAmount': item.superCargoCodAmount,
					'superCargoCorAmount': item.superCargoCorAmount,
					'superCargoMonthlyAmount': item.superCargoMonthlyAmount,
					'superCosigneeAmount': item.superCosigneeAmount
				}
			})
			Dispatchbill.update({
				'dispatchOrderID': this.dispatchOrderID,
				'dispatchTaskCargoInfo': JSON.stringify(dispatchTaskCargoInfo),
				'dispatchTaskInfo': JSON.stringify(dispatchTaskInfo),
				'sumAmount': this.totalAmount,
				'transportRecordID': this.selectedDriver.transportRecordID,
				'truckID': this.selectedDriver.truckID,
				'trailerID': this.selectedDriver.trailerID,
				'driverID': this.selectedDriver.driverID,
				'superCargoID': this.selectedStaff.staffID
			}).then(res => {
				Message.success('保存成功！')
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
	text-align right
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