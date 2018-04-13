<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">调度单编号：{{dispatchBill.dispatchOrderNo}}
				<span>创建时间：{{dispatchBill.createTime}}</span>
				<span class="status status1" v-if="dispatchBill.status == 'Committed'">待执行</span>
				<span class="status status2" v-else-if="dispatchBill.status == 'Loaded'">已装运</span>
				<span class="status status3" v-else-if="dispatchBill.status == 'Signed'">已签收</span>
				<span class="status status3" v-else-if="dispatchBill.status == 'Canceled'">作废</span>
			</div>
			<table class="wf-table" v-for="(item, index) in dispatchBill.transceiveInfos">
				<caption>收发货信息{{index+1}}</caption>
				<tr>
					<td><span class="justify">发货人</span>{{item.shipperName}}</td>
					<td><span class="justify">收货人</span>{{item.consigneeName}}</td>
				</tr>
				<tr>
					<td><span class="justify">联系方式</span>{{item.shipperPhone}}</td>
					<td><span class="justify">联系方式</span>{{item.consigneePhone}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货地</span>{{item.shipperDetailAddress}}</td>
					<td><span class="justify">收货地</span>{{item.consigneeDetailAddress}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货时间</span>{{item.shipperDate | getdatefromtimestamp(true)}}</td>
					<td><span class="justify">到货时间</span>{{item.consigneeDate | getdatefromtimestamp(true)}}</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>货物信息</caption>
				<tr>
					<td colspan="6">
						<span class="labels">实际发货时间：</span>{{dispatchBill.loadDate | getdatefromtimestamp(true)}}
						<span class="labels" style="margin-left:40px">实际到货时间：</span>{{dispatchBill.signTime | getdatefromtimestamp(true)}}
					</td>
				</tr>
				<tr>
					<th width="60">序号</th>
					<th width="120">承运单编号</th>
					<th>货物规格/名称</th>
					<th>配载量</th>
					<th>运载量</th>
					<th>签收量</th>
				</tr>
				<tr class="is-center" v-for="(item, index) in dispatchBill.cargoInfos">
					<td>{{index+1}}</td>
					<td>{{item.carrierOrderNo}}</td>
					<td>{{item.cargoType}}/{{item.cargoName}}</td>
					<td>{{item.cargoWeight + '吨'}}/{{item.cargoVolume + '方'}}/{{item.cargoNum + '件'}}</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="6">
						<span class="labels">司机：</span>{{dispatchBill.driverName}} {{dispatchBill.driverMobile}}
						<span class="labels" style="margin-left:40px">载具：</span>
						{{dispatchBill.plateNo}} 6.2米{{dispatchBill.truckType}} {{dispatchBill.loads}}吨{{dispatchBill.loadVolume}}方
						<span class="labels" style="margin-left:40px">随车人员：</span>{{dispatchBill.superCargoName}} {{dispatchBill.superCargoMobile}}
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>付款信息</caption>
				<tr>
					<th></th>
					<th>现付</th>
					<th>到付</th>
					<th>回单付</th>
					<th>月结</th>
					<th>收方到货付</th>
					<th>绕路里程</th>
					<th>绕路费用</th>
					<th>其他费用</th>
				</tr>
				<tr class="is-center">
					<td>司机</td>
					<td>{{dispatchBill.driverCashAmount}}</td>
					<td>{{dispatchBill.driverCodAmount}}</td>
					<td>{{dispatchBill.driverPorAmount}}</td>
					<td>{{dispatchBill.driverMonthlyAmont}}</td>
					<td>{{dispatchBill.driverCosigneeAmount}}</td>
					<td>{{dispatchBill.driverDetoursMileage}}</td>
					<td>{{dispatchBill.driverDetoursAmount}}</td>
					<td>{{dispatchBill.driverOtherAmount}}</td>
				</tr>
				<tr class="is-center">
					<td>随车人员</td>
					<td>{{dispatchBill.superCargoCashAmount}}</td>
					<td>{{dispatchBill.superCargoCodAmount}}</td>
					<td>{{dispatchBill.superCargoCorAmount}}</td>
					<td>{{dispatchBill.superCargoMonthlyAmount}}</td>
					<td>{{dispatchBill.superCosigneeAmount}}</td>
					<td>{{dispatchBill.superCargoDetoursMileage}}</td>
					<td>{{dispatchBill.superCargoDetoursAmount}}</td>
					<td>{{dispatchBill.superCargoOtherAmount}}</td>
				</tr>
				<tr class="is-center">
					<td>合计：</td>
					<td colspan="8">
						{{
							Number(dispatchBill.driverCashAmount) 
							+ Number(dispatchBill.driverCodAmount)
							+ Number(dispatchBill.driverPorAmount)
							+ Number(dispatchBill.driverMonthlyAmont)
							+ Number(dispatchBill.driverCosigneeAmount)
							+ Number(dispatchBill.driverDetoursMileage)
							+ Number(dispatchBill.driverDetoursAmount)
							+ Number(dispatchBill.driverOtherAmount)
							+ Number(dispatchBill.superCargoCashAmount)
							+ Number(dispatchBill.superCargoCodAmount)
							+ Number(dispatchBill.superCargoCorAmount)
							+ Number(dispatchBill.superCargoMonthlyAmount)
							+ Number(dispatchBill.superCosigneeAmount)
							+ Number(dispatchBill.superCargoDetoursMileage)
							+ Number(dispatchBill.superCargoDetoursAmount)
							+ Number(dispatchBill.superCargoOtherAmount)
						}}
					</td>
				</tr>
			</table>
			<div class="wf-footer clearfix is-center">
				<button type="button" class="wf-btn btn-primary" v-if="dispatchBill.status == 'Committed'" @click="isLoadVisible = true">装车</button>
				<button type="button" class="wf-btn btn-primary" v-if="dispatchBill.status == 'Loaded'" @click="isConfirmVisible = true">签收</button>
				<button type="button" class="wf-btn btn-primary" v-if="dispatchBill.status == 'Signed'" @click="isModifyVisible = true">修改运费</button>
				<button type="button" class="wf-btn btn-danger" v-if="dispatchBill.status != 'Signed' && dispatchBill.status != 'Canceled'" @click="cancel">作废</button>
				<button type="button" class="wf-btn btn-default" @click="back">返回</button>
			</div>
		</div>
		<ModifyPayInfo :isVisible="isModifyVisible" :payInfo="payMethods" @control="handModifyPayInfo"/>
		<LoadSend :isVisible="isLoadVisible" :cargoInfo="dispatchBill.cargoInfos" @control="handLoadSend"/>
		<ConfirmCargo :isVisible="isConfirmVisible" :cargoInfo="dispatchBill.cargoInfos" :payInfo="payMethods" @control="handConfirm"/>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../common/request'
import ModifyPayInfo from './Common/ModifyPayInfo'
import LoadSend from './Common/LoadSend'
import ConfirmCargo from './Common/ConfirmCargo'
export default {
	data() {
		return {
			isModifyVisible: false,
			isLoadVisible: false,
			isConfirmVisible: false,
			dispatchBill: {},
			payMethods: {
				driverCashAmount: '', // 司机现付金额
				driverCodAmount: '', // 司机到付金额
				driverPorAmount: '', // 司机回单金额
				driverMonthlyAmont: '', // 司机月结金额
				driverCosigneeAmount: '', // 司机收货方到付金额
				superCargoCashAmount: '', // 押运人现付金额
				superCargoCodAmount: '', // 押运人到付金额
				superCargoCorAmount: '', // 押运人回单金额
				superCargoMonthlyAmount: '', // 押运人月结金额
				superCosigneeAmount: '', // 押运人收货方到付金额
			},
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo(){
			let params = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
			}
			request({
				url: '/biz/dispatchOrder/detail',
				params
			}).then(res => {
				this.dispatchBill = res.data.data
				this.payMethods = {
					driverCashAmount: this.dispatchBill.driverCashAmount, // 司机现付金额
					driverCodAmount: this.dispatchBill.driverCodAmount, // 司机到付金额
					driverPorAmount: this.dispatchBill.driverPorAmount, // 司机回单金额
					driverMonthlyAmont: this.dispatchBill.driverMonthlyAmont, // 司机月结金额
					driverCosigneeAmount: this.dispatchBill.driverCosigneeAmount, // 司机收货方到付金额
					driverDetoursMileage: this.dispatchBill.driverDetoursMileage, // 司机收货方到付金额
					driverDetoursAmount: this.dispatchBill.driverDetoursAmount, // 司机收货方到付金额
					driverOtherAmount: this.dispatchBill.driverOtherAmount, // 司机收货方到付金额
					superCargoCashAmount: this.dispatchBill.superCargoCashAmount, // 押运人现付金额
					superCargoCodAmount: this.dispatchBill.superCargoCodAmount, // 押运人到付金额
					superCargoCorAmount: this.dispatchBill.superCargoCorAmount, // 押运人回单金额
					superCargoMonthlyAmount: this.dispatchBill.superCargoMonthlyAmount, // 押运人月结金额
					superCosigneeAmount: this.dispatchBill.superCosigneeAmount, // 押运人收货方到付金额
					superCargoDetoursMileage: this.dispatchBill.superCargoDetoursMileage, // 押运人收货方到付金额
					superCargoDetoursAmount: this.dispatchBill.superCargoDetoursAmount, // 押运人收货方到付金额
					superCargoOtherAmount: this.dispatchBill.superCargoOtherAmount // 押运人收货方到付金额
				}
			})
		},
		load(cargoInfo) {
			let data = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
				loadCargoInfo: JSON.stringify(cargoInfo)
			}
			console.log(data)
			request({
				url: '/biz/dispatchOrder/load',
				method: 'post',
				data
			}).then(res => {
				Message.success('成功！')
				this.getInfo()
			})
		},
		confirm(cargoInfo, payInfo) {
			let data = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
				confirmCargoInfo: JSON.stringify(cargoInfo),
				driverCashAmount: payInfo.driverCashAmount, //	司机现付金	
				driverCodAmount: payInfo.driverCodAmount, //	司机到付金	
				driverCosigneeAmount: payInfo.driverCosigneeAmount, //	司机收货方到付金	
				driverDetoursAmount: payInfo.driverDetoursAmount, //	司机绕路	
				driverDetoursMileage: payInfo.driverDetoursMileage, //	司机绕路里	
				driverMonthlyAmont: payInfo.driverMonthlyAmont, //	司机月结金	
				driverOtherAmount: payInfo.driverOtherAmount, //	司机其他费	
				driverPorAmount: payInfo.driverPorAmount //	司机回单金额
			}
			request({
				url: '/biz/dispatchOrder/confirm',
				method: 'post',
				data
			}).then(res => {
				Message.success('成功！')
				this.getInfo()
			})
		},
		modify(payInfo) {
			let data = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
				driverCashAmount: payInfo.driverCashAmount, //	司机现付金	
				driverCodAmount: payInfo.driverCodAmount, //  司机到付金	
				driverCosigneeAmount: payInfo.driverCosigneeAmount, //	司机收货方到付金	
				driverDetoursAmount: payInfo.driverDetoursAmount, //	司机绕路	
				driverDetoursMileage: payInfo.driverDetoursMileage, //	司机绕路里	
				driverMonthlyAmont: payInfo.driverMonthlyAmont, //	司机月结金	
				driverOtherAmount: payInfo.driverOtherAmount, //	司机其他费	
				driverPorAmount: payInfo.driverPorAmount //	司机回单金额
			}
			request({
				url: '/biz/dispatchOrder/confirm',
				method: 'post',
				data
			}).then(res => {
				Message.success('成功！')
				this.getInfo()
			})
		},
		cancel() {
			let data = {
				dispatchOrderID: this.$route.query.dispatchOrderID,
			}
			request({
				url: '/biz/dispatchOrder/cancel',
				method: 'post',
				data
			}).then(res => {
				Message.success('成功！')
				this.getInfo()
			})
		},
		handModifyPayInfo(bool, data) {
			console.log(data)
			if (data) {
				this.modify(data)
			}
			this.isModifyVisible = bool
		},
		handLoadSend(bool, data) {
			console.log(data)
			if (data) {
				let cargoInfo = data.map(item => {
					return {
						"dispatchCargoID": item.dispatchCargoID,
						"loadWeight": item.loadWeight,
						"loadVolume": item.loadVolume, 
						"loadNum": item.loadNum,
						"weightType": item.weightType
					}
				})
				this.load(cargoInfo)
			}
			this.isLoadVisible = bool
		},
		handConfirm(bool, data1, data2) {
			if (data1 && data2) {
				let cargoInfo = data1.map(item => {
					return {
						"dispatchCargoID": item.dispatchCargoID,
						"signWeight": item.signWeight,
						"signVolume": item.signVolume, 
						"signNum": item.signNum,
						"weightType": item.weightType
					}
				})
				this.confirm(cargoInfo, data2)
			}
			this.isConfirmVisible = bool
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ModifyPayInfo,
		LoadSend,
		ConfirmCargo
	}
}

</script>
<style lang="stylus" scoped>
.main-content
	background #ebebeb
	padding-top 20px
	.wf-card
		.header
			span
				font-size 12px
				margin-left 40px
				&.status
					position absolute
					margin-right 0
					right 20px
					top 15px
					height 24px
					line-height 24px
					color #fff
					padding 0 15px
					font-size 12px
					-moz-border-radius 4px
					     border-radius 4px
				&.status1
					background #F56C6C
				&.status2
					background #409EFF
				&.status3
					background #909399
		.wf-table
			.justify
				width 80px
				height 24px
				display inline-block
				vertical-align top
				padding-right 20px
				color #3582d0
				text-align justify
				&:after
					content '：'
					position relative
					top -24px
					padding-left 100%
					display inline-block
</style>
