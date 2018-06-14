<template>
	<div class="main-content" >
		<div class="wf-card">
			<div class="header clearfix">承运单编号：{{carrierOrder.carrierOrderNo}}
				<el-tag size="mini" style="position:absolute;right:15px;top:50%;transform:translateY(-50%)" type="warning" v-if="carrierOrder.status=='Committed'">待执行</el-tag>
				<el-tag size="mini" style="position:absolute;right:15px;top:50%;transform:translateY(-50%)" v-else-if="carrierOrder.status=='Running'">执行中</el-tag>
				<el-tag size="mini" style="position:absolute;right:15px;top:50%;transform:translateY(-50%)" type="success" v-else-if="carrierOrder.status=='Signed'">到达签收</el-tag>
				<el-tag size="mini" style="position:absolute;right:15px;top:50%;transform:translateY(-50%)" type="info" v-else-if="carrierOrder.status=='Closed'">已关闭</el-tag>
				<el-tag size="mini" style="position:absolute;right:15px;top:50%;transform:translateY(-50%)" type="info" v-else-if="carrierOrder.status=='Canceled'">作废</el-tag>
			</div>
			<div class="datetime">
				<span class="label">发货单号：</span><span>{{carrierOrder.shipperNo}}</span>
				<span class="label">创建时间：</span>
				<span v-if="carrierOrder.createTime">{{carrierOrder.createTime | getdatefromtimestamp()}}</span>
				<span v-else></span>
				<span class="label">委托时间：</span>
				<span v-if="carrierOrder.commissionDate">{{carrierOrder.commissionDate | getdatefromtimestamp(true)}}</span>
				<span v-else></span>
			</div>
			<table class="wf-table">
				<caption>承运信息</caption>
				<tr>
					<td width="50%"><span class="justify">托运人</span>{{carrierOrder.consignorName}}</td>
					<td width="50%"><span class="justify">承运人</span>{{carrierOrder.carrierrName}}</td>
				</tr>
				<tr>
					<td width="50%"><span class="justify">准运证号</span>{{carrierOrder.navicertNo}}</td>
					<td width="50%"><span class="justify">电子运单</span>{{carrierOrder.electronicWaybill}}</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>收发货信息</caption>
				<tr>
					<td width="50%"><span class="justify">发货单位</span>{{carrierOrder.shipperCompanyName}}</td>
					<td width="50%"><span class="justify">收货单位</span>{{carrierOrder.consigneeCompanyName}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货人</span>{{carrierOrder.shipperName}}</td>
					<td><span class="justify">收货人</span>{{carrierOrder.consigneeName}}</td>
				</tr>
				<tr>
					<td><span class="justify">联系方式</span>{{carrierOrder.shipperPhone}}</td>
					<td><span class="justify">联系方式</span>{{carrierOrder.consigneePhone}}</td>
				</tr>
				<tr>
					<td>
						<span class="justify">发货地</span>
						{{carrierOrder.shipperArea ? carrierOrder.shipperArea : ''}}
						{{carrierOrder.shipperDetailAddress ? carrierOrder.shipperDetailAddress : ''}}
					</td>
					<td>
						<span class="justify">收货地</span>
						{{carrierOrder.consigneeArea ? carrierOrder.consigneeArea : ''}}
						{{carrierOrder.consigneeDetailAddress ? carrierOrder.consigneeDetailAddress : ''}}
					</td>
				</tr>
				<tr>
					<td><span class="justify">发货位置</span>{{carrierOrder.shipperLocationAddress}}</td>
					<td><span class="justify">收货位置</span>{{carrierOrder.consigneeLocationAddress}}</td>
				</tr>
				<tr>
					<td>
						<span class="justify">发货时间</span>
						<span v-if="carrierOrder.shipperDate">{{carrierOrder.shipperDate | getdatefromtimestamp(true)}}</span>
					</td>
					<td>
						<span class="justify">到货时间</span>
						<span v-if="carrierOrder.consigneeDate">{{carrierOrder.consigneeDate | getdatefromtimestamp(true)}}</span>
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>货物信息</caption>
				<tr>
					<td colspan="7">
						<span class="labels">运输方式：</span>{{carrierOrder.transportType}}
					</td>
				</tr>
				<tr>
					<th>货物类型</th>
					<th>货物规格</th>
					<th>货物名称</th>
					<th>数量(件)</th>
					<th>体积(方)</th>
					<th>重量(吨)</th>
					<th>剩余货量</th>
				</tr>
				<tr class="is-center" v-for="item in carrierCargo" :key="item.carrierCargoID">
					<td>
						<span v-if="item.weightType=='Heavy'">重货</span>
						<span v-else-if="item.weightType=='Light'">轻货</span>
						<span v-else-if="item.weightType=='HeavyAndLight'">重轻货</span>
					</td>
					<td>{{item.cargoType}}</td>
					<td>{{item.cargoName}}</td>
					<td>{{item.cargoNum}}</td>
					<td>{{item.cargoVolume}}</td>
					<td>{{item.cargoWeight}}</td>
					<td>{{item.remainingCargoNum?item.remainingCargoNum+'件':''}}{{item.remainingCargoNum?'/':''}}{{item.remainingCargoVolume?item.remainingCargoVolume+'方':''}}{{item.remainingCargoVolume?'/':''}}{{item.remainingCargoWeight?item.remainingCargoWeight+'吨':''}}</td>
				</tr>
				<tr class="total is-center">
					<td>合计</td>
					<td colspan="2"></td>
					<td>{{sum('cargoNum')}}</td>
					<td>{{sum('cargoVolume')}}</td>
					<td>{{sum('cargoWeight')}}</td>
					<td>
						<span v-if="sum('remainingCargoNum')>0">{{sum('remainingCargoNum')}}件/</span>
						<span v-if="sum('remainingCargoVolume')>0">{{sum('remainingCargoVolume')}}方/</span>
						<span v-if="sum('remainingCargoWeight')>0">{{sum('remainingCargoWeight')}}吨</span>	
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>应收款&nbsp;&nbsp;
					<svg-icon icon-class="eye" @click.native="isShow = true" v-if="!isShow"/>
					<i class="el-icon-view" @click="isShow = false" v-if="isShow"></i></caption>
				<tr>
					<th width="12.5%">现付</th>
					<th width="12.5%">到付</th>
					<th width="12.5%">回单付</th>
					<th width="12.5%">月结</th>
					<th width="12.5%">收方到货付</th>
					<th width="12.5%">合计</th>
					<th width="12.5%">其他</th>
					<th width="12.5%">备注</th>
				</tr>
				<tr class="is-center">
					<td>{{isShow ? carrierOrder.cashAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrder.codAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrder.porAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrder.monthlyAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrder.consigneeAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrderTotal : '**'}}元</td>
					<td>{{isShow ? carrierOrder.otherAmount : '**'}}</td>
					<td>{{isShow ? carrierOrder.remark : '**'}}</td>
				</tr>
				<tr>
					<td colspan="8">
						<span class="labels">发票：</span>{{carrierOrder.invoice == 'Y' ? '开发票' : '不开发票'}}
						<span class="labels" style="margin-left:40px">回单要求：</span>
						<span v-for="item in porRequire" class="porRequire" :key="item">
							<span v-if="item == 'ConsigneePor'">货物托运单</span>
							<span v-else-if="item == 'ShipperPor'">发货单文件</span>
							<span v-else>不需要回单</span>
						</span>
						<span class="labels fr">承运单应收总价：{{isShow ? carrierOrderTotal + parseInt(carrierOrder.otherAmount) : '**'}}元</span>
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>运输进展</caption>
				<tr>
					<th>车牌号/挂车号</th>
					<th>司机</th>
					<th>随车人员</th>
					<th>任务单号</th>
					<th>任务状态</th>
					<th>货物名称</th>
					<th>配载货量</th>
					<th>运输照片</th>
				</tr>
				<tr v-for="(transport, index) in transports" :key="index">
					<td>{{transport.plateNo}}{{transport.trailerPlateNo ? ('/' + transport.trailerPlateNo) : ''}}</td>
					<td>{{transport.driverName}}</td>
					<td>{{transport.superCargoName}}</td>
					<td>{{transport.taskNo}}</td>
					<td>
						<span v-if="transport.status == 'Committed'">待执行</span>
						<span v-else-if="transport.status == 'Running'">执行中</span>
						<span v-else-if="transport.status == 'Signed'">已到达签收</span>
						<span v-else-if="transport.status == 'Closed'">已关闭</span>
						<span v-else-if="transport.status == 'Canceled'">已作废</span>
					</td>
					<td>{{transport.cargoName}}</td>
					<td>{{transport.loadWeightSum + '吨'}}/{{transport.loadVolumeSum + '方'}}/{{transport.LoadNumSum + '件'}}</td>
					<td style="text-align: center">
						<el-button 
							:disabled="transport.taskPicNum == 0"
							type="primary" 
							size="mini" 
							@click="viewPhotos(transport.dispatchTaskID)">
							查看({{transport.taskPicNum}})
						</el-button>
					</td>
				</tr>
			</table>
			<div class="wf-footer clearfix">
				<div class="btn-group fr">
					<button type="button" class="wf-btn btn-default" @click="back">
						<svg-icon icon-class="back"></svg-icon>返回
					</button>
				</div>
			</div>
		</div>
		<UploadPhoto 
			:isPreview="true" 
			:isVisible="isPhotoVisible" 
			@control="handUploadPhoto" 
			:dispatchTaskID="currentDispatchTaskID" 
			:shipperArea="currentShipperArea" 
			:consigneeArea="currentConsigneeArea">
		</UploadPhoto>
		<ViewCargos 
			:visible="dialogCargoVisible" 
			@callback="cargoCallback">
		</ViewCargos>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { closeConfirm, deleteConfirm } from '../../common/utils'
import Carrierbill from '../../api/Carrierbill'
import UploadPhoto from '../DispatchBill/Common/UploadPhoto'
import ViewCargos from './ViewCargos'
export default {
	data() {
		return {
			isShow: false,
			carrierOrder: {},
			isPhotoVisible: false,
			currentDispatchTaskID: '',
			currentShipperArea: '',
			currentConsigneeArea: '',
			dialogCargoVisible: false,
			carrierCargo: [],
			porRequire: [],
			transports: []
		}
	},
	computed:{
		carrierOrderTotal() {
			return parseInt(this.carrierOrder.cashAmount) 
				+ parseInt(this.carrierOrder.codAmount) 
				+ parseInt(this.carrierOrder.porAmount) 
				+ parseInt(this.carrierOrder.monthlyAmount) 
				+ parseInt(this.carrierOrder.consigneeAmount)
		}
	},
	components: {
		UploadPhoto,
		ViewCargos
	},
	created() {
		this.getDetail()
	},
	methods: {
		sum(o) {
			let sum = 0
			for (let i = this.carrierCargo.length - 1; i >= 0; i--) {
				sum += this.carrierCargo[i][o]
			}
			return sum
		},
		getDetail() {
			let carrierOrderID = this.$route.query.carrierOrderID
			Carrierbill.findById({ carrierOrderID }).then(res => {
				this.carrierOrder = res
				this.carrierCargo = res.carrierCargo
				this.porRequire = res.porRequire.split(',')
				this.getTransports(carrierOrderID)
			})
		},
		// 查询运输列表
		getTransports(carrierOrderID) {
			Carrierbill.findTransports({ carrierOrderID }).then(res => {
				this.transports = res
			})
		},
		// 查看照片弹窗回调
		viewPhotos(dispatchTaskID) {
			this.currentDispatchTaskID = dispatchTaskID
			this.currentShipperArea = this.carrierOrder.shipperArea
			this.currentConsigneeArea = this.carrierOrder.consigneeArea
			this.isPhotoVisible = true
		},
		handUploadPhoto(bool) {
			this.isPhotoVisible = false
		},
		// 查看货物弹窗回调
		cargoCallback(bool) {
			this.dialogCargoVisible = bool
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>
.main-content
	background #ebebeb
	padding-top 20px
	.wf-card
		.header
			margin-bottom 0
			position relative
		.datetime
			font-size 12px
			padding 10px 15px 
			margin-bottom 10px
			border 1px solid #e2ecf6
			color #3582d0
			.label~.label
				margin-left 40px
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
					
.porRequire
	span
		margin-right 20px				
</style>