<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="item">
				<div class="lineInfo">
					<div class="tit"><span>任务单号：{{task.taskNo}}</span>
						<el-tag type="warning" size="mini"style="float:right;position:relative;top:50%;transform:translateY(-50%)" v-if="task.status='Committed'">待执行</el-tag>
						<el-tag size="mini" style="float:right;position:relative;top:50%;transform:translateY(-50%)" v-else-if="task.status='Loaded'">已装运</el-tag>
						<el-tag type="success" size="mini" style="float:right;position:relative;top:50%;transform:translateY(-50%)" v-else-if="task.status='Signed'">已签收</el-tag>
						<el-tag type="info" size="mini" style="float:right;position:relative;top:50%;transform:translateY(-50%)" v-else>已作废</el-tag>
					</div>
					<div class="con">
						<div class="from">
							<img src="../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="companyName">{{carrier.shipperCompanyName}}</p>
							<p>{{carrier.shipperName}}{{carrier.shipperPhone?('/'+carrier.shipperPhone):''}}</p>
							<p class="area">{{carrier.shipperArea}}</p>
							<p class="datetime">{{carrier.shipperDate | getdatefromtimestamp(true)}}（预计发货）</p>
							<p class="datetime c2" v-if="carrier.shipperActualDate">{{carrier.shipperActualDate | getdatefromtimestamp()}}（实际发货）</p>
						</div>
						<div class="platNo"><span>{{taskDetail.plateNo}}{{taskDetail.trailerPlateNo?('/'+taskDetail.trailerPlateNo):''}}</span></div>
						<div class="to">
							<img src="../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="companyName">{{carrier.consigneeCompanyName}}</p>
							<p>{{carrier.consigneeName}}{{carrier.consigneePhone?('/'+carrier.consigneePhone):''}}</p>
							<p class="area">{{carrier.consigneeArea}}</p>
							<p class="datetime">{{carrier.consigneeDate | getdatefromtimestamp(true)}}（预计到货）</p>
							<p class="datetime c2" v-if="carrier.consigneeActualDate">{{carrier.consigneeActualDate | getdatefromtimestamp()}}（实际到货）</p>
						</div>
					</div>
				</div>
				<div class="personInfo">
					<div class="tit">人员信息</div>
					<div class="con">
						<div class="driver">
							<img src="../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="name">{{taskDetail.driverName}}<span class="tag">司机</span></p>
							<p>{{taskDetail.driverPhone}}</p>
						</div>
						<div class="escort">
							<img src="../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="name">{{taskDetail.superCargoName}}<span class="tag">押运</span></p>
							<p>{{taskDetail.superCargoPhone}}</p>
						</div>
						<div class="escort">
							<img src="../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="name">{{taskDetail.dispatcherName}}<span class="tag">调度</span></p>
							<p>{{taskDetail.dispatcherMobile}}</p>
						</div>
					</div>
				</div>
				<table class="cargoList">
					<tr>
						<td class="tit" colspan="4">货物清单</td>
					</tr>
					<tr v-for="(cargoItem, index) in cargoList" :key="index">
						<td class="text-center" width="100"><span v-if="cargoItem.weightType='Heavy'">重货</span><span v-else>轻货</span></td><td>{{cargoItem.cargoType}}</td><td>{{cargoItem.cargoName}}</td><td>{{cargoItem.cargoWeight?(cargoItem.cargoWeight+'kg/'+''):''}}{{cargoItem.cargoVolume?cargoItem.cargoVolume+'m³/':''}}{{cargoItem.cargoNum?cargoItem.cargoNum+'件':''}}</td>
					</tr>
				</table>
				<table class="fare">
					<tr>
						<td class="tit" colspan="7">
							付款费用 
							<span class="fr editBtn" v-show="type == 'edit'" v-if="!isEdit" @click="editFare">编辑</span>
							<span class="fr editBtn" v-show="type == 'edit'" v-else @click="saveFare">保存</span>
						</td>
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
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverCashAmount"></el-input></td>
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverCodAmount"></el-input></td>
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverPorAmount"></el-input></td>
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverMonthlyAmont"></el-input></td>
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.driverCosigneeAmount"></el-input></td>
						<td><el-input size="mini" disabled :value="totalDriver"></el-input></td>
					</tr>
					<tr class="text-center">
						<td>随行人员</td>
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCargoCashAmount"></el-input></td>
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCargoCodAmount"></el-input></td>
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCargoCorAmount"></el-input></td>
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCargoMonthlyAmount"></el-input></td>
						<td><el-input size="mini" :disabled="!isEdit || type == 'view'" v-model="task.superCosigneeAmount"></el-input></td>
						<td><el-input size="mini" disabled v-model="totalsuperCargo"></el-input></td>
					</tr>
				</table>
			</div>
			<div class="tit" v-if="loadImgs.length>0 || arriveImgs.length>0 || backImgs.length>0 || exceptImgs.length>0">运输照片<span class="fr uploadPicBtn" v-if="type == 'edit'" @click="upload()">上传照片</span></div>
			<div class="picList" v-if="loadImgs.length>0">
				<div class="title">装车照片<span>({{loadImgs.length}})</span></div>
				<div class="con">
					<ImageUpload :objs="loadImgObjs" :files="loadImgs" :isPreview="true"/>
				</div>
			</div>
			<div class="picList" v-if="arriveImgs.length>0">
				<div class="title">到货照片<span>({{arriveImgs.length}})</span></div>
				<div class="con">
					<ImageUpload :objs="arriveImgObjs" :files="arriveImgs" :isPreview="true"/>
				</div>
			</div>
			<div class="picList" v-if="backImgs.length>0">
				<div class="title">回单照片<span>({{backImgs.length}})</span></div>
				<div class="con">
					<ImageUpload :objs="backImgObjs" :files="backImgs" :isPreview="true"/>
				</div>
			</div>
			<div class="picList" v-if="exceptImgs.length>0">
				<div class="title">异常上报<span>({{exceptImgs.length}})</span></div>
				<div class="con">
					<ImageUpload :objs="exceptImgObjs" :files="exceptImgs" :isPreview="true"/>
				</div>
			</div>
			<div class="handle text-center">
				<el-button @click="back">返回</el-button>
			</div>
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
import Task from '../../api/Task'
import TaskPic from '../../api/TaskPic'
import ImageUpload from '../CommonComponents/ImageUpload2'
import UploadPhoto from './Common/UploadPhoto'
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
	},
	created() {
		this.getDetail()
		this.getImgs()
	},
	methods: {
		editFare() {
			this.isEdit = true
		},
		saveFare() {
			this.modifyFreight()
			this.isEdit = false
		},
		getDetail() {
			let dispatchTaskID = this.$route.query.dispatchTaskID
			Task.findById({ dispatchTaskID }).then(res => {
				this.taskDetail = res
				this.task = res.task
				this.carrier = res.carrier
				this.cargoList= res.cargoList
			})
		},
		getImgs() {
			let dispatchTaskID = this.$route.query.dispatchTaskID
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
			let dispatchTaskID = this.$route.query.dispatchTaskID
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
				'superCargoMonthlyAmount': this.task.superCargoMonthlyAmount
			}).then(res => {
				Message.success(res.data.msg)
				this.getDetail()
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
.tit
	padding 5px 10px
	height 40px
	line-height 30px
	background #e2ecf6
	color #3582d0
	font-size 13px
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
			padding 5px 10px
			height 40px
			line-height 30px
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