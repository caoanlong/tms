<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix posr">
				<span>任务单号：{{task.taskNo}}</span>
				<el-tag type="warning" size="small" class="statusTag" v-if="task.status == 'Committed'">待装车</el-tag>
				<el-tag size="small" class="statusTag" v-else-if="task.status == 'Loaded'">已装运</el-tag>
				<el-tag type="success" size="small" class="statusTag" v-else-if="task.status == 'Signed'">已签收</el-tag>
			</div>
			<el-row :gutter="20" class="recdeliverycomp" style="margin-bottom:20px">
				<el-col :span="12">
					<div class="section-block">
						<span class="block-title">发货信息</span>
						<div class="block-content">
							<p>发货单位：{{carrier.shipperCompanyName}}</p>
							<p>发货人：{{carrier.shipperName}}{{carrier.shipperPhone?('/'+carrier.shipperPhone):''}}</p>
							<p>发货地：{{carrier.shipperArea}}</p>
							<p>详细地址：{{carrier.shipperDetailAddress}}</p>
							<p class="datetime">装车时间：{{carrier.shipperDate | getdatefromtimestamp(true)}}（预计装车）<span class="c2" v-if="carrier.shipperActualDate">{{carrier.shipperActualDate | getdatefromtimestamp()}}（实际装车）</span></p>
						</div>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="section-block">
						<span class="block-title">收货信息</span>
						<div class="block-content">
							<p class="companyName">收货单位：{{carrier.consigneeCompanyName}}</p>
							<p>收货人：{{carrier.consigneeName}}{{carrier.consigneePhone?('/'+carrier.consigneePhone):''}}</p>
							<p class="area">收货地：{{carrier.consigneeArea}}</p>
							<p>详细地址：{{carrier.consigneeDetailAddress}}</p>
							<p class="datetime">到货时间：{{carrier.consigneeDate | getdatefromtimestamp(true)}}（预计到货） <span class="c2" v-if="carrier.consigneeActualDate">{{carrier.consigneeActualDate | getdatefromtimestamp()}}（实际到货）</span></p>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row style="margin-bottom:20px">
				<el-col :span="24">
					<div class="section-block personInfo">
						<span class="block-title">车辆及人员信息</span>
						<div class="block-content">
							<el-row :gutter="20">
								<el-col :span="6">
									<p>车牌号码：{{taskDetail.plateNo}}</p>
									<p v-if="taskDetail.trailerPlateNo">挂车车牌：{{taskDetail.trailerPlateNo}}</p>
								</el-col>
								<el-col :span="6">
									<div class="driver">
										<p class="name">{{taskDetail.driverName}}<span class="tag">司机</span></p>
										<p class="phone">{{taskDetail.driverPhone}}</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="escort" v-if="taskDetail.superCargoName">
										<p class="name">{{taskDetail.superCargoName}}<span class="tag">押运</span></p>
										<p class="phone">{{taskDetail.superCargoPhone}}</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="dispatcher">
										<p class="name">{{taskDetail.dispatcherName}}<span class="tag">调度</span></p>
										<p class="phone">{{taskDetail.dispatcherMobile}}</p>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row style="margin-bottom:20px">
				<el-col :span="24">
					<div class="section-block personInfo">
						<span class="block-title">货物清单</span>
						<div class="block-content" style="padding:10px 0 20px">
							<el-table :data="cargoList" border style="width: 100%" size="mini" stripe>
								<el-table-column label="承运单号" prop="carrierOrderID" align="center"></el-table-column>
								<el-table-column label="货物名称" prop="cargoName" align="center"></el-table-column>
								<el-table-column label="货物重量" align="center">
									<template slot-scope="scope">
										<span >{{scope.row.cargoWeight? scope.row.cargoWeight+'吨':''}}</span>
									</template>
								</el-table-column>
								<el-table-column label="货物体积" align="center">
									<template slot-scope="scope">
										<span >{{scope.row.cargoVolume? scope.row.cargoVolume+'方':''}}</span>
									</template>
								</el-table-column>
								<el-table-column label="货物数量" align="center">
									<template slot-scope="scope">
										<span >{{scope.row.cargoNum? scope.row.cargoNum+scope.row.cargoUnitName:''}}</span>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row v-if="!isHideAmount">
				<el-col :span="24">
					<div class="section-block fare">
						<span class="block-title">付款费用</span>
						<span class="editBtn" v-show="type == 'edit'" v-if="!isEdit" @click="editFare">编辑</span>
						<span class="editBtn" v-show="type == 'edit'" v-else @click="saveFare">保存</span>
						<div class="block-content" style="padding:10px 0 20px">
							<table>
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
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverCashAmount"></el-input></td>
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverCodAmount"></el-input></td>
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverPorAmount"></el-input></td>
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverMonthlyAmont"></el-input></td>
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverCosigneeAmount"></el-input></td>
									<td class="totalNum">{{totalDriver}}</td>
								</tr>
								<tr class="text-center">
									<td>随行人员</td>
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCargoCashAmount"></el-input></td>
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCargoCodAmount"></el-input></td>
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCargoCorAmount"></el-input></td>
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCargoMonthlyAmount"></el-input></td>
									<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCosigneeAmount"></el-input></td>
									<td class="totalNum">{{totalsuperCargo}}</td>
								</tr>
								<tr class="text-center">
									<td>合计</td>
									<td class="totalNum">{{Number(this.task.driverCashAmount ? this.task.driverCashAmount : 0)+ Number(this.task.superCargoCashAmount ? this.task.superCargoCashAmount : 0)}}</td>
									<td class="totalNum">{{Number(this.task.driverCodAmount ? this.task.driverCodAmount : 0)+ Number(this.task.superCargoCodAmount ? this.task.superCargoCodAmount : 0)}}</td>
									<td class="totalNum">{{Number(this.task.driverPorAmount ? this.task.driverPorAmount : 0)+ Number(this.task.superCargoCorAmount ? this.task.superCargoCorAmount : 0)}}</td>
									<td class="totalNum">{{Number(this.task.driverMonthlyAmont ? this.task.driverMonthlyAmont : 0)+ Number(this.task.superCargoMonthlyAmount ? this.task.superCargoMonthlyAmount : 0)}}</td>
									<td class="totalNum">{{Number(this.task.driverCosigneeAmount ? this.task.driverCosigneeAmount : 0)+ Number(this.task.superCosigneeAmount ? this.task.superCosigneeAmount : 0)}}</td>
									<td class="totalNum">{{totalAll}}</td>
								</tr>
							</table>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card" v-if="loadImgs.length>0 || arriveImgs.length>0 || backImgs.length>0 || exceptImgs.length>0">
			<div slot="header" class="clearfix">
				<span>运输照片</span>
				<span class="fr uploadPicBtn" v-if="type == 'edit'" @click="upload()">上传照片</span>
			</div>
			<el-row style="margin-bottom:20px">
				<el-col :span="24">
					<div class="section-block personInfo">
						<span class="block-title">装车照片<span>({{loadImgs.length}})</span></span>
						<div class="block-content">
							<ImageUpload :objs="loadImgObjs" :files="loadImgs" :isPreview="true"/>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row style="margin-bottom:20px">
				<el-col :span="24">
					<div class="section-block personInfo">
						<span class="block-title">到货照片<span>({{arriveImgs.length}})</span></span>
						<div class="block-content">
							<ImageUpload :objs="arriveImgObjs" :files="arriveImgs" :isPreview="true"/>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row style="margin-bottom:20px">
				<el-col :span="24">
					<div class="section-block personInfo">
						<span class="block-title">回单照片<span>({{backImgs.length}})</span></span>
						<div class="block-content">
							<ImageUpload :objs="backImgObjs" :files="backImgs" :isPreview="true"/>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row >
				<el-col :span="24">
					<div class="section-block personInfo">
						<span class="block-title">异常上报<span>({{exceptImgs.length}})</span></span>
						<div class="block-content">
							<ImageUpload :objs="exceptImgObjs" :files="exceptImgs" :isPreview="true"/>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<div class="handle text-center">
			<el-button @click="back">返回</el-button>
		</div>
		<UploadPhoto 
			:isVisible="isPhotoVisible" 
			@control="handUploadPhoto" 
			:dispatchTaskID="task.dispatchTaskID" 
			:shipperArea="carrier.shipperArea" 
			:consigneeArea="carrier.consigneeArea">
		</UploadPhoto>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Task from '../../../api/Task'
import TaskPic from '../../../api/TaskPic'
import ImageUpload from '../../CommonComponents/ImageUpload2'
import { resizeImg } from '../../../common/utils'
import UploadPhoto from './components/UploadPhoto'
export default {
	data() {
		return {
			taskDetail: {},
			task: {},
			carrier: {},
			cargoList: [],
			loadImgs: [],
			arriveImgs: [],
			backImgs: [],
			exceptImgs: [],
			loadImgObjs: [],
			arriveImgObjs: [],
			backImgObjs: [],
			exceptImgObjs: [],
			isEdit: false,
			type: this.$route.query.type,
			isHideAmount: this.$route.query.isHideAmount,
			currentDispatchTaskID: '',
			isPhotoVisible: false
		}
	},
	computed:{
		totalDriver:function(){
			return Number(this.task.driverCashAmount ? this.task.driverCashAmount : 0) 
			+ Number(this.task.driverCodAmount ? this.task.driverCodAmount : 0) 
			+ Number(this.task.driverPorAmount ? this.task.driverPorAmount : 0) 
			+ Number(this.task.driverMonthlyAmont ? this.task.driverMonthlyAmont : 0) 
			+ Number(this.task.driverCosigneeAmount ? this.task.driverCosigneeAmount : 0)
		},
		totalsuperCargo:function(){
			return Number(this.task.superCargoCashAmount ? this.task.superCargoCashAmount : 0) 
			+ Number(this.task.superCargoCodAmount ? this.task.superCargoCodAmount : 0) 
			+ Number(this.task.superCargoCorAmount ? this.task.superCargoCorAmount : 0) 
			+ Number(this.task.superCargoMonthlyAmount ? this.task.superCargoMonthlyAmount : 0) 
			+ Number(this.task.superCosigneeAmount ? this.task.superCosigneeAmount : 0)
		},
		totalAll:function(){
			return Number(this.task.driverCashAmount ? this.task.driverCashAmount : 0) 
			+ Number(this.task.driverCodAmount ? this.task.driverCodAmount : 0) 
			+ Number(this.task.driverPorAmount ? this.task.driverPorAmount : 0) 
			+ Number(this.task.driverMonthlyAmont ? this.task.driverMonthlyAmont : 0) 
			+ Number(this.task.driverCosigneeAmount ? this.task.driverCosigneeAmount : 0)
			+ Number(this.task.superCargoCashAmount ? this.task.superCargoCashAmount : 0) 
			+ Number(this.task.superCargoCodAmount ? this.task.superCargoCodAmount : 0) 
			+ Number(this.task.superCargoCorAmount ? this.task.superCargoCorAmount : 0) 
			+ Number(this.task.superCargoMonthlyAmount ? this.task.superCargoMonthlyAmount : 0) 
			+ Number(this.task.superCosigneeAmount ? this.task.superCosigneeAmount : 0)
		},
		resizeImg: () => resizeImg
	},
	created() {
		this.getInfo()
		this.getImgs()
	},
	methods: {
		editFare() {
			this.isEdit = true
		},
		saveFare() {
			this.modifyFreight()
		},
		getInfo() {
			const dispatchTaskID = this.$route.query.dispatchTaskID
			Task.findById({ dispatchTaskID }).then(res => {
				this.taskDetail = res
				this.task = res.task
				this.carrier = res.carrier
				this.cargoList= res.cargoList
			})
		},
		getImgs() {
			const dispatchTaskID = this.$route.query.dispatchTaskID
            TaskPic.find({ dispatchTaskID }).then(res => {
				this.loadImgObjs = res.Loaded
                this.arriveImgObjs = res.Arrived
                this.backImgObjs = res.Received
                this.exceptImgObjs = res.Unusual
                this.loadImgs = res.Loaded.map(item => item.maxURL)
                this.arriveImgs = res.Arrived.map(item => item.maxURL)
                this.backImgs = res.Received.map(item => item.maxURL)
                this.exceptImgs = res.Unusual.map(item => item.maxURL)
            })
		},
		modifyFreight() {
			if (!Number(this.task.driverCashAmount) 
				&& !Number(this.task.driverCodAmount) 
				&& !Number(this.task.driverPorAmount) 
				&& !Number(this.task.driverMonthlyAmont) 
				&& !Number(this.task.driverCosigneeAmount)) {
				Message.error('司机付款费用必填一项！')
				return
			}
			if (!Number(this.task.superCargoCashAmount) 
				&& !Number(this.task.superCargoCodAmount) 
				&& !Number(this.task.superCargoCorAmount) 
				&& !Number(this.task.superCargoMonthlyAmount) 
				&& !Number(this.task.superCosigneeAmount)) {
				Message.error('随车人员付款费用必填一项！')
				return
			}
			const dispatchTaskID = this.$route.query.dispatchTaskID
			Task.modifyFreight({
				'dispatchTaskID': dispatchTaskID,
				'driverCashAmount': this.task.driverCashAmount,
				'driverCodAmount': this.task.driverCodAmount,
				'driverPorAmount': this.task.driverPorAmount,
				'driverMonthlyAmont': this.task.driverMonthlyAmont,
				'driverCosigneeAmount': this.task.driverCosigneeAmount,
				'superCargoCashAmount': this.task.superCargoCashAmount,
				'superCargoCodAmount': this.task.superCargoCodAmount,
				'superCargoCorAmount': this.task.superCargoCorAmount,
				'superCargoMonthlyAmount': this.task.superCargoMonthlyAmount,
				'superCosigneeAmount': this.task.superCosigneeAmount
			}).then(res => {
				this.isEdit = false
				Message.success(res.data.msg)
				this.getInfo()
			})
		},
		upload() {
			this.isPhotoVisible = true
		},
		handUploadPhoto(bool) {
			this.isPhotoVisible = false
			this.getImgs()
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload,
		UploadPhoto
	}
}

</script>
<style lang="stylus" scoped>
.statusTag
	position absolute
	right 10px
	top 50%
	transform translateY(-50%)
.block-content
		padding-bottom 10px
	p
		margin 0
		font-size 14px
		line-height 30px
		color #666
.recdeliverycomp
	p
		&.datetime
			color #999
			font-size 12px
		.c2
			color #f90
.personInfo
	.phone
		font-size 12px
		color #999
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
		.tag
			background #69c
.fare
	position relative
	.editBtn
		background #409eff
		color #FFF
		cursor pointer
		border-radius 4px
		padding 0 12px
		font-size 12px
		line-height 24px
		height 24px
		position absolute
		right 10px
		top -10px
	table
		width 100%
		background #ebeef5
		border-spacing 1px
		font-size 12px
		td
		th
			background #fff
			padding 6px 10px
			height 36px
			line-height 24px
			color #666
		th
			color #909399
.uploadPicBtn
	background #409eff
	color #FFF
	cursor pointer
	border-radius 4px
	padding 0 12px
	font-size 12px
	height 24px
	line-height 24px
.picList
	padding 10px
	border 1px solid #e2ecf6
	border-top none
	.title
		border-bottom 1px solid #e2ecf6
		font-size 12px
		line-height 24px
		color #999
		span
			color #409eff
			margin-left 5px
	.con
		padding 10px
.handle
	margin-top 10px	

.fare
	.totalNum
		color #409eff
		font-size 12px
.section-block
	margin 10px 0 0
.uploadTruckPicItem
	display inline-block
	margin-right 10px
	p
		margin 0
		text-align center
		font-size 12px
		color #999
.box-card
	margin-bottom 10px
.el-checkbox-group
	display inline-block
	margin-left 40px
</style>