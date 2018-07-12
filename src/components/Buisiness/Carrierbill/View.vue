<template>
	<div class="main-content" >
		<el-card class="box-card">
			<div slot="header" class="posr clearfix">承运单编号：{{carrierOrder.carrierOrderNo}}
				<el-tag size="mini" class="statusTag" type="warning" v-if="carrierOrder.status=='Committed'">未执行</el-tag>
				<el-tag size="mini" class="statusTag" v-else-if="carrierOrder.status=='Running'">执行中</el-tag>
				<el-tag size="mini" class="statusTag" type="success" v-else-if="carrierOrder.status=='Signed'">已完成</el-tag>
				<el-tag size="mini" class="statusTag" type="info" v-else-if="carrierOrder.status=='Closed'">已关闭</el-tag>
			</div>
			<div class="datetime">
				<span class="label">发货单号：</span><span>{{carrierOrder.shipperNo}}</span>
				<span class="label">运输方式：</span><span>{{carrierOrder.transportType}}</span>
				<span class="label">委托时间：</span>
				<span v-if="carrierOrder.commissionDate">{{carrierOrder.commissionDate | getdatefromtimestamp(true)}}</span>
				<span v-else></span>
			</div>
			<el-row class="section-block" style="margin-bottom:20px;margin-top:20px;min-width: 1050px">
				<span class="block-title">收发货信息</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px;">
						<el-col :span="12">
							<div><span class="tit">发货单位</span><span class="ctt">{{carrierOrder.shipperCompanyName}}</span></div>
							<div><span class="tit">发货人</span><span class="ctt">{{carrierOrder.shipperName}}</span></div>
							<div><span class="tit">联系方式</span><span class="ctt">{{carrierOrder.shipperPhone}}</span></div>
							<div><span class="tit">发货地</span><span class="ctt">{{carrierOrder.shipperArea}}</span></div>
							<div><span class="tit">详细地址</span><span class="ctt">{{carrierOrder.shipperDetailAddress}}</span></div>
							<div><span class="tit">发货时间</span><span class="ctt"><span v-if="carrierOrder.shipperDate">{{carrierOrder.shipperDate | getdatefromtimestamp(true)}}</span></span></div>
						</el-col>
						<el-col :span="12">
							<div><span class="tit">收货单位</span><span class="ctt">{{carrierOrder.consigneeCompanyName}}</span></div>
							<div><span class="tit">收货人</span><span class="ctt">{{carrierOrder.consigneeName}}</span></div>
							<div><span class="tit">联系方式</span><span class="ctt">{{carrierOrder.consigneePhone}}</span></div>
							<div><span class="tit">收货地</span><span class="ctt">{{carrierOrder.consigneeArea}}</span></div>
							<div><span class="tit">详细地址</span><span class="ctt">{{carrierOrder.consigneeDetailAddress}}</span></div>
							<div><span class="tit">到货时间</span><span class="ctt"><span v-if="carrierOrder.consigneeDate">{{carrierOrder.consigneeDate | getdatefromtimestamp(true)}}</span></span></div>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px;">
				<span class="block-title">货物信息</span>
				<div class="block-content">
					<table class="wf-table">
						<tr>
							<th>货物类型</th>
							<th>货物规格</th>
							<th>货物名称</th>
							<th>数量(件)</th>
							<th>体积(m³)</th>
							<th>重量(kg)</th>
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
							<td>
								{{item.remainingCargoNum ? item.remainingCargoNum + '件' : ''}}
								{{item.remainingCargoVolume ? ('/' + item.remainingCargoVolume + 'm³') : ''}}
								{{item.remainingCargoWeight ? ('/' + item.remainingCargoWeight + 'kg') : ''}}
							</td>
						</tr>
						<tr class="total is-center">
							<td>合计</td>
							<td colspan="2"></td>
							<td>{{sum('cargoNum')}}</td>
							<td>{{sum('cargoVolume')}}</td>
							<td>{{sum('cargoWeight')}}</td>
							<td>
								<span v-if="sum('remainingCargoNum')>0">{{sum('remainingCargoNum')}}件/</span>
								<span v-if="sum('remainingCargoVolume')>0">{{sum('remainingCargoVolume')}}m³/</span>
								<span v-if="sum('remainingCargoWeight')>0">{{sum('remainingCargoWeight')}}kg</span>	
							</td>
						</tr>
					</table>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px;">
				<span class="block-title">运输进展</span>
				<div class="block-content">
					<table class="wf-table">
						<tr>
							<th>任务单号</th>
							<th>车牌号</th>
							<th>司机</th>
							<th>押运员</th>
							<th>货物名称</th>
							<th>配载货量</th>
							<th>运输照片</th>
						</tr>
						<tr class="is-center" v-for="(transport, index) in transports" :key="index">
							<td><span class="link" @click="viewTask(transport.dispatchTaskID)">{{transport.taskNo}}</span></td>
							<td>
								{{transport.plateNo}}
								{{transport.trailerPlateNo ? ('/' + transport.trailerPlateNo) : ''}}
							</td>
							<td>{{transport.driverName}}</td>
							<td>{{transport.superCargoName}}</td>
							<td>{{transport.cargoName}}</td>
							<td>{{transport.loadWeightSum + 'kg'}}/{{transport.loadVolumeSum + 'm³'}}/{{transport.LoadNumSum + '件'}}</td>
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
				</div>
			</el-row>
			<div class="wf-footer clearfix text-center">
				<el-button @click="back">返回</el-button>
			</div>
		</el-card>
		<UploadPhoto 
			:isPreview="true" 
			:isVisible="isPhotoVisible" 
			@control="handUploadPhoto" 
			:dispatchTaskID="currentDispatchTaskID" 
			:shipperArea="currentShipperArea" 
			:consigneeArea="currentConsigneeArea">
		</UploadPhoto>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Carrierbill from '../../../api/Carrierbill'
import UploadPhoto from '../../Dispatch/DispatchBill/components/UploadPhoto'
export default {
	data() {
		return {
			carrierOrder: {},
			isPhotoVisible: false,
			currentDispatchTaskID: '',
			currentShipperArea: '',
			currentConsigneeArea: '',
			carrierCargo: [],
			porRequire: [],
			transports: []
		}
	},
	components: { UploadPhoto },
	created() {
		this.getInfo()
	},
	methods: {
		sum(o) {
			let sum = 0
			for (let i = this.carrierCargo.length - 1; i >= 0; i--) {
				sum += this.carrierCargo[i][o]
			}
			return sum
		},
		getInfo() {
			const carrierOrderID = this.$route.query.carrierOrderID
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
		viewTask(dispatchTaskID) {
			this.$router.push({name: 'viewtaskdetail', query: { dispatchTaskID, type: 'view', isHideAmount: true }})
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>
.statusTag
	position absolute
	right 10px
	top 50%
	transform translateY(-50%)
.datetime
	font-size 12px
	padding 10px 15px 
	margin-bottom 10px
	border-bottom 1px solid #e2ecf6
	color #3582d0
	.label~.label
		margin-left 40px				
.porRequire
	span
		margin-right 20px
.block-content
	font-size 14px
	line-height 2
	.tit
		display inline-block
		width 126px
		text-align right
		margin-right 10px
		color #333
		font-weight bold
	.ctt
		display inline-block
		text-align left
		color #666
</style>