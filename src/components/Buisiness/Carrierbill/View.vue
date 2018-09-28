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
				<span class="label">发货单号：{{carrierOrder.shipperNo}}</span>
				<span class="label">运输方式：{{carrierOrder.transportType}}</span>
				<span class="label" v-if="carrierOrder.commissionDate">委托时间：{{carrierOrder.commissionDate | getdatefromtimestamp(true)}}</span>
				<span class="label">委托方：{{carrierOrder.consignorName}}</span>
			</div>
			<el-row style="min-width: 1050px" :gutter="20">
				<el-col :span="12">
					<div  class="section-block">
						<span class="block-title">发货</span>
						<div class="block-content" style="margin-bottom: 10px;">
							<div><span class="ctt">{{carrierOrder.shipperCompanyName}}</span></div>
							<div><span class="ctt">{{carrierOrder.shipperName}}/{{carrierOrder.shipperPhone}}</span></div>
							<div><span class="ctt">{{carrierOrder.shipperArea}} {{carrierOrder.shipperLocationAddress}} {{carrierOrder.shipperDetailAddress}}</span></div>
							<div><span class="ctt"><span v-if="carrierOrder.shipperDate">{{carrierOrder.shipperDate | isFullDay()}}</span></span></div>
						</div>
					</div>
				</el-col>
				<el-col :span="12">
					<div  class="section-block">
						<span class="block-title">收货</span>
						<div class="block-content" style="margin-bottom: 10px;">
							<div><span class="ctt">{{carrierOrder.consigneeCompanyName}}</span></div>
							<div><span class="ctt">{{carrierOrder.consigneeName}}/{{carrierOrder.consigneePhone}}</span></div>
							<div><span class="ctt">{{carrierOrder.consigneeArea}} {{carrierOrder.consigneeLocationAddress}} {{carrierOrder.consigneeDetailAddress}}</span></div>
							<div><span class="ctt"><span v-if="carrierOrder.consigneeDate">{{carrierOrder.consigneeDate | isFullDay()}}</span></span></div>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px;">
				<span class="block-title">货物信息</span>
				<div class="block-content">
					<table class="wf-table">
						<tr>
							<!-- <th>客户单号</th> -->
							<th>货物名称</th>
							<th>配载方式</th>
							<th>原货量</th>
							<th>待配载量</th>
						</tr>
						<tr class="is-center" v-for="item in carrierCargo" :key="item.carrierCargoID">
							<!-- <td>{{item.customizedNo}}</td> -->
							<td>{{item.cargoName}}</td>
							<td>
								<span v-if="item.dispatchType =='Quantity'">按数量配载</span>
								<span v-else-if="item.dispatchType =='Volumn'">按体积配载</span>
								<span v-else>按重量配载</span>
								<!-- 按数量配载 Quantity   按体积配载 Volumn   按重量配载 Weight -->
							</td>
							<td>{{[(item.cargoVolume+'方')
								,(item.cargoWeight+'吨')
								,(item.cargoNum?(item.cargoNum+item.cargoUnitName):'')] | trimSpaceAndJoinSlash }}</td>
							<td>
								{{[(item.remainingCargoVolume+'方')
								,(item.remainingCargoWeight+'吨')
								,(item.remainingCargoNum?item.remainingCargoNum+item.cargoUnitName:'')] | trimSpaceAndJoinSlash}}

							</td>
						</tr>
						<tr class="total is-center">
							<td>合计</td>
							<!-- <td></td> -->
							<td></td>
							<td>{{[(sum('cargoVolume') + '方')
								,(sum('cargoWeight') + '吨')
								,( parseInt(sum('cargoNum')))] | trimSpaceAndJoinSlash }}</td>
							<td>
								{{[(sum('remainingCargoVolume')+'方')
								,(sum('remainingCargoWeight')+'吨')
								,(parseInt(sum('remainingCargoNum')))] | trimSpaceAndJoinSlash}}
								
							</td>
						</tr>
					</table>
				</div>
			</el-row>
			<el-row class="section-block">
				<span class="block-title">运输进展</span>
				<div class="block-content">
					<table class="wf-table">
						<tr>
							<th>调度单号</th>
							<th>任务单号</th>
							<th>状态</th>
							<th>车牌号</th>
							<th>司机</th>
							<th>押运员</th>
							<th>货物名称</th>
							<th>配载货量</th>
							<th>运输照片</th>
						</tr>
						<tr class="is-center" v-for="(transport, index) in transports" :key="index">
							<td><span class="link" @click="viewdispatchbill(transport.dispatchOrderID)">{{transport.dispatchOrderNo}}</span></td>
							<td>{{transport.taskNo}}</td>
							<td>
								<!-- 'Committed'：待装车,'Loaded'：已装运,'Signed'：已签收 -->
								<span v-if="transport.status == 'Committed'">待装车</span>
								<span v-else-if="transport.status == 'Loaded'">已装运</span>
								<span v-else>已签收</span>
							</td>
							<td>
								{{transport.plateNo}}
								{{transport.trailerPlateNo ? ('/' + transport.trailerPlateNo) : ''}}
							</td>
							<td>{{transport.driverName}}</td>
							<td>{{transport.superCargoName}}</td>
							<td>{{transport.cargoName}}</td>
							<td>{{[(transport.loadWeightSum + '吨'),(transport.loadVolumeSum + '方'),(transport.LoadNumSum)] | trimSpaceAndJoinSlash}}
							</td>
							<td style="text-align: center">
								<el-button 
									:disabled="transport.taskPicNum == 0"
									type="primary" 
									size="mini" 
									@click="viewPhotos(transport.dispatchTaskID)">
									查看({{transport.taskPicNum}})
								</el-button>
								<el-button 
									type="primary" 
									size="mini" 
									@click="trail(transport.dispatchOrderID)">
									轨迹
								</el-button>
							</td>
						</tr>
					</table>
				</div>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="section-block">
						<span class="block-title">运输费用</span>
						<el-row class="block-content" style="padding-bottom:20px">
							<div>
								<span class="tit">运费金额</span>
								<span class="ctt">{{carrierOrder.freight}}</span>
							</div>
						</el-row>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="section-block">
						<span class="block-title">回单要求</span>
						<el-row class="block-content" style="padding-bottom:20px">
							<div>
								<span class="tit">单据</span>
								<span class="ctt">
									<span v-for="(item,index) in carrierOrder.porRequire" :key="index"> {{index != 0 ? ',' : ''}}{{mapType[item]}}</span>
								</span>
							</div>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<div class="wf-footer clearfix text-center">
				<el-button @click="back">返回</el-button>
			</div>
		</el-card>
		<trail-map 
			v-if="trailDialog" 
			:dispatchOrderID="currentDispatchOrderID" 
			@cancel="handCloseTrail">
		</trail-map>
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
import TrailMap from '../../Dispatch/components/TrailMap'
import Carrierbill from '../../../api/Carrierbill'
import UploadPhoto from './components/UploadPhoto'
export default {
	data() {
		return {
			trailDialog: false,
			mapType: {
				'ConsigneePor': '货物托运单',
				'ShipperPor': '货物发货单'
			},
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
	components: { UploadPhoto,TrailMap },
	created() {
		this.getInfo()
	},
	methods: {
		sum(o) {
			let sum = 0
			for (let i = this.carrierCargo.length - 1; i >= 0; i--) {
				sum += this.carrierCargo[i][o]
			}
			return sum.toFixed(2)
		},
		getInfo() {
			const carrierOrderID = this.$route.query.carrierOrderID
			Carrierbill.findById({ carrierOrderID }).then(res => {
				this.carrierOrder = res
				this.carrierOrder.porRequire = res.porRequire.split(',')
				this.carrierCargo = res.carrierCargo
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
		viewdispatchbill(dispatchOrderID) {
			this.$router.push({name: 'viewdispatchbill', query: { dispatchOrderID, type: 'view', isHideAmount: true }})
		},
		back() {
			this.$router.go(-1)
		},
		handCloseTrail() {
			this.trailDialog = false
		},
		trail(dispatchOrderID) {
			this.currentDispatchOrderID = dispatchOrderID
			this.trailDialog = true
		},
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