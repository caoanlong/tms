<template>
	<div class="driverItem">
		<div class="truck">
			<div class="truckPic fl">
				<img :src="truck.truckFrontPic ? resizeImg(truck.truckFrontPic, '_100x100.') : defaultImg" />
			</div>
			<div class="truckInfo fl">
				<p>
					<span class="plateNo">{{truck.plateNo}}</span>
					<el-tag size="mini" v-if="truck.truckType == 'TankTruck'">罐式货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'VanTruck'">厢式货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'BarrackTruck'">仓栅货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'TailgateTruck'">栏板货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'DumpTruck'">自卸货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'HeavySemitrailerTractor'">重型半挂牵引车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'TankTrailer'">罐式挂车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'VanTrailer'">厢式挂车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'BarrackTrailer'">仓栅挂车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'TailgateTrailer'">栏板挂车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'ContainerTrailer'">集装箱挂车</el-tag>
					<el-tag size="mini" type="info" v-if="truck.truckCategory == 'Trailer'">挂车</el-tag>
					<el-tag size="mini" type="info" v-else-if="truck.truckCategory == 'Tractor'">牵引车</el-tag>
					<el-tag size="mini" type="info" v-else-if="truck.truckCategory == 'WholeVehicle'">整车</el-tag>
					<el-tag size="mini" type="success" v-if="truck.workStatus == 'Free'">空闲中</el-tag>
					<el-tag size="mini" type="success" v-else-if="truck.workStatus == 'Working'">作业中</el-tag>
					<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
						<div slot="content">
							<el-tag size="mini" type="danger" v-for="(item,index) in truckExp" :key="index">{{
								expireWarnJson[item]
							}}</el-tag>
						</div>
						<el-tag size="mini" type="danger" v-if="truck.expiredCertificate.length>0">到期</el-tag>
					</el-tooltip>
				</p>
				<p>{{Number(truck.length)/1000}}米/{{Number(truck.loads)/1000}}吨/{{truck.loadVolume}}方</p>
			</div>
			<div class="truckHandle fl">
				<router-link tag="span" :to="{name: 'viewtruck', query: { truckID: truck.truckID } }">查看档案</router-link>
				<router-link tag="span" :to="{name: 'edittruck', query: { truckID: truck.truckID } }">编辑档案</router-link>
				<span @click="delTruck(truck.truckID)">删除车辆</span>
			</div>
		</div>
		<div class="driver" v-show="truck.truckCategory != 'Trailer'">
			<div class="driverInfo" v-if="truck.primaryDriver && truck.primaryDriver.realName">
				<span class="driverName">{{truck.primaryDriver.realName}}</span>
				<el-tooltip placement="top" v-if="truck.primaryDriver.appStatus == 'Y'">
					<div slot="content">开通APP接单</div>
					<el-tag size="mini">APP</el-tag>
				</el-tooltip>
				<el-tag type="info" size="mini" v-else>APP</el-tag>
				<el-tag type="success" size="mini">主驾</el-tag>
				<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
					<div slot="content">
						<el-tag size="mini" type="danger" v-for="(item,index) in primaryDriverExp" :key="index">{{
							expireWarnJson[item]
						}}</el-tag>
					</div>
					<el-tag size="mini" type="danger" v-if="truck.primaryDriver.expiredCertificate.length>0">到期</el-tag>
				</el-tooltip>
			</div>
			<div class="driverInfo link text-center" v-else @click="add('primary')" v-show="truck.truckCategory != 'Trailer'">+添加主驾</div>
			<div class="driverInfo" v-if="truck.secondaryDriver && truck.secondaryDriver.realName">
				<span class="driverName">{{truck.secondaryDriver.realName}}</span>
				<el-tooltip placement="top" v-if="truck.secondaryDriver.appStatus == 'Y'">
					<div slot="content">开通APP接单</div>
					<el-tag size="mini">APP</el-tag> 
				</el-tooltip>
				<el-tag type="info" size="mini" v-else>APP</el-tag> 
				<el-tag type="success" size="mini">副驾</el-tag>
				<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
					<div slot="content">
						<el-tag size="mini" type="danger" v-for="(item,index) in secondaryDriverExp" :key="index">{{
							expireWarnJson[item]
						}}</el-tag>
					</div>
					<el-tag size="mini" type="danger" v-if="truck.secondaryDriver.expiredCertificate.length>0">到期</el-tag>
				</el-tooltip>
			</div>
			<div class="driverInfo link text-center" v-else @click="add('second')" v-show="truck.truckCategory != 'Trailer'">+添加副驾</div>
		</div>
		<div class="mobile" v-show="truck.truckCategory != 'Trailer'">
			<div class="mobileItem">{{truck.primaryDriver && truck.primaryDriver.mobile}}</div>
			<div class="mobileItem">{{truck.secondaryDriver && truck.secondaryDriver.mobile}}</div>
		</div>
		<div class="handle" v-show="truck.truckCategory != 'Trailer'">
			<div class="handleItem">
				<span style="color: #ccc" v-if="truck.primaryDriver">设为主驾</span>
				<span @click="add('primary')" v-if="truck.primaryDriver">人员替换</span>
				<span @click="delSuperCargo(truck.primaryDriver.comSupercargoID, '主驾')" v-if="truck.primaryDriver">删除</span>
			</div>
			<div class="handleItem">
				<span @click="primary" v-if="truck.secondaryDriver">设为主驾</span>
				<span @click="add('second')" v-if="truck.secondaryDriver">人员替换</span>
				<span @click="delSuperCargo(truck.secondaryDriver.comSupercargoID, '副驾')" v-if="truck.secondaryDriver">删除</span>
			</div>
		</div>
		<SelectSuperCargo :dialogVisible="dialogVisible" :type="type" :truckID="truck.truckID" @control="handleSelect"></SelectSuperCargo>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import { defaultImg } from '../../../assets/icons/icons'
import { resizeImg, deleteConfirm } from '../../../common/utils'
import SelectSuperCargo from './SelectSuperCargo'
import Truck from '../../../api/Truck'
export default {
	props: {
		isRefresh: Number,
		truck: Object
	},
	data() {
		return {
			type: 'primary',
			dialogVisible: false,
			truckExp:[],
			primaryDriverExp:[],
			secondaryDriverExp:[],
			expireWarnJson:{
				DriverLicExpiresTime:"行驶证到期",
				RoadTransportLicAnnualPeriod:"道路运输证到期 ",
				GpsValidEndDate:"GPS到期 ",
				SaliInsuranceExpires:"交强险到期 ",
				BizInsuranceExpires:"商业险到期 ",
				CarrierRiskInsuranceExpires:"承运险到期 ",
				CargoInsuranceExpireDate:"货运险到期 ",
				TankQCExpires:"罐体监测到期 ",
				SafetyValvesQCExpires:"罐体安全阀监测到期 ",
				PressureGaugeQCExpires:"罐体压力表监测到期 ",
				secondaMaintainTime:"二级维护下次维护日期到期 ",
				NextRankEvaluteTime:"技术等级下次评定到期",
				SecondSecurityDepositDate:"二次安全保证金到期 ",
				ManagementAgreementExpireDate:"管理协议到期 ",
				SafetyLiabilityLetterExpireDate:"安全责任书到期",
				IdCardExpirationTime:"身份证到期 ",
				DriverLicenseEndTime:"驾驶证到期 ",
				QualificationExpirationDate:"危货从业资格证到期 ",
				IntegrityExamineEndTime:"诚信考核证到期 ",
				LaborContractEndTime:"聘用合同到期 ",
				EscortLicenseExpireDate:"押运证到期"
			}
		}
	},
	watch: {
		isRefresh() {
			this.expTooltip()
		}
	},
	computed: {
		defaultImg: () => defaultImg,
		resizeImg: () => resizeImg
	},
	components: { SelectSuperCargo },
	created() {
		this.expTooltip()
	},
	methods: {
		add(type) {
			this.type = type
			this.dialogVisible = true
		},
		primary() {
			Truck.primary({
				comSupercargoID: this.truck.secondaryDriver.comSupercargoID,
				comTruckID: this.truck.truckID
			}).then(res => {
				Message.success(res.data.msg)
				console.log(res)
				this.$emit('refresh')
			})
		},
		delTruck(truckID) {
			deleteConfirm(truckID, truckIDs => {
				Truck.del({ truckIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.$emit('refresh')
				})
			})
		},
		delSuperCargo(comSupercargoID, type) {
			this.$confirm(`此操作将清空该车辆${type}, 是否继续?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				Truck.deleteDriver({
					comSupercargoID,
					comTruckID: this.truck.truckID
				}).then(res => {
					Message.success(res.data.msg)
					this.$emit('refresh')
				})
			}).catch(err => { Message.info('已取消') })
		},
		handleSelect(bool) {
			this.dialogVisible = false
			bool && this.$emit('refresh')
		},
		expTooltip(){
			this.truckExp = this.truck.expiredCertificate.split(",")
			this.primaryDriverExp = this.truck.primaryDriver && this.truck.primaryDriver.expiredCertificate ? this.truck.primaryDriver.expiredCertificate.split(","):[]
			this.secondaryDriverExp = this.truck.secondaryDriver && this.truck.secondaryDriver.expiredCertificate ? this.truck.secondaryDriver.expiredCertificate.split(","):[]
		}
	}
}
</script>

<style lang="stylus" scoped>
.driverItem
	position relative
	padding-right 560px
	border 1px solid  #f0f0f0
	margin-bottom 10px
	font-size 12px
	height 92px
	.driver
	.mobile
	.handle
		border-left 1px solid #f0f0f0
		position absolute
		top 0
		background #fff
		height 90px
	.truck
		width 100%
		padding 10px
		height 90px
		min-width 380px
		position relative
		.truckPic
			margin-right 10px
			img
				width 50px
				height 50px
				vertical-align top
				border-radius 3px
		.truckInfo
			p
				margin 0
				line-height 20px
				color #666
				&:first-child
					line-height 30px
				.plateNo
					font-weight bold
					font-size 16px
		.truckHandle
			height 30px
			width 100%
			line-height 30px
			span
				color #409eff
				cursor pointer
				margin-right 20px
	.handle
		width 179px
		right 0
		text-align center
		span
			padding 0 5px
			color #409eff
			cursor pointer
	.driver
		width 240px
		right 319px
	.mobile
		width 140px
		right 179px
		text-align center
	.mobileItem
	.driverInfo
	.handleItem
		height 45px
		line-height 45px
		&:first-child
			border-bottom 1px solid #f0f0f0
	.driverInfo
		padding 0 10px
		text-align center
		.driverName
			margin-right 10px
</style>
