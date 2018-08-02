<template>
	<div class="listItem" >
		<div class="selectColumn" @click="selectTruck">
			<span class="selectIcon">
				<svg-icon :icon-class="isSelected ? 'ic_checkbox_true' : 'ic_checkbox_false'" :class="isSelected ? 'selected' : ''"></svg-icon>
			</span>
		</div>
		<div class="truckColumn">
			<div class="headPic fl">
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

					<el-tag size="mini" type="warning" v-if="truck.workStatus == 'Free'">空闲</el-tag>
					<el-tag size="mini" type="warning" v-else>作业</el-tag>
					<el-tag size="mini" type="success" v-if="truck.truckCategory == 'Trailer'">挂车</el-tag>
					<el-tag size="mini" type="success" v-else-if="truck.truckCategory == 'Tractor'">牵引车</el-tag>
					<el-tag size="mini" type="success" v-else-if="truck.truckCategory == 'WholeVehicle'">整车</el-tag>
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
		</div>
		<div class="driverColumn" v-if="truck.primaryDriver && truck.primaryDriver.realName">
			<div class="headPic fl">
				<img :src="truck.primaryDriver.headPic ? resizeImg(truck.primaryDriver.headPic, '_100x100.') : defaultImg" />
			</div>
			<div class="driverInfo fl">
				<p><span class="driverName">{{truck.primaryDriver.realName}}</span>
					<el-tag size="mini" type="success">主驾</el-tag>
					<el-tooltip placement="top" v-if="truck.primaryDriver.appStatus == 'Y'">
						<div slot="content">开通APP接单</div>
						<el-tag size="mini">APP</el-tag> 
					</el-tooltip>
					<el-tag type="info" size="mini" v-else>APP</el-tag>
					<el-tag type="warning" size="mini" v-if="truck.driverWorkStatus == 'Free'">空闲</el-tag>
					<el-tag type="warning" size="mini" v-else-if="truck.driverWorkStatus == 'Working'">工作中</el-tag>
					<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
						<div slot="content">
							<el-tag size="mini" type="danger" v-for="(item,index) in primaryDriverExp" :key="index">{{
								expireWarnJson[item]
							}}</el-tag>
						</div>
						<el-tag size="mini" type="danger" v-if="truck.primaryDriver.expiredCertificate.length>0">到期</el-tag>
					</el-tooltip>
				</p>
				<p>{{truck.primaryDriver.mobile}}</p>
			</div>
			<span class="btn replaceBtn" @click="selectSupercargo('primary')">更换</span>
		</div>
		<div class="escortColumn" v-else>
			<span class="btn addEscortBtn"  @click="add('primary')"><svg-icon icon-class="add-icon"></svg-icon>添加驾驶员</span>
		</div>
		<div class="escortColumn" v-if="flag && truck.superCargo && truck.superCargo.realName">
			<div class="headPic fl">
				<img :src="truck.superCargo.headPic ? resizeImg(truck.superCargo.headPic, '_100x100.') : defaultImg" />
			</div>
			<div class="escortInfo fl">
				<p>
					<span class="escortName">{{truck.superCargo.realName}}</span>
					<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
						<div slot="content"> 
							<el-tag size="mini" type="danger" v-for="(item,index) in superCargoExp" :key="index">{{
								expireWarnJson[item]
							}}</el-tag>
						</div>
						<el-tag size="mini" type="danger" v-if="truck.superCargo.expiredCertificate.length>0">到期</el-tag>
					</el-tooltip>
				</p>
				<p>{{truck.superCargo.mobile}}</p>
			</div>
			<span class="btn replaceBtn" @click="selectSupercargo('second')">更换</span>
			<span class="btn deleteBtn" @click="deleteItem">删除</span>
		</div>
		<div class="escortColumn" v-else>
			<span class="btn addEscortBtn"  @click="add('second')"><svg-icon icon-class="add-icon"></svg-icon>添加押车员</span>
		</div>
		<SelectSupercargo :type="type" :truck="truck" :dialogVisible="selectDialogVisible" @control="handleSelectSupercargo"></SelectSupercargo>
	</div>
</template>

<script>
import { defaultImg } from '../../../../assets/icons/icons'
import { resizeImg, deleteConfirm } from '../../../../common/utils'
import SelectSupercargo from './SelectSupercargo'
export default {
	props: {
		isSelected: {
			type: Boolean,
			default: false
		},
		truck: {
			type: Object,
			default: () => {}
		}
	},
	data(){
		return {
			selectDialogVisible: false,
			type: 'primary',
			flag: true,
			truckExp:[],
			primaryDriverExp:[],
			superCargoExp:[],
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
				NextSecondLevel:"二级维护下次维护",
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
	created() {
		this.expTooltip()
	},
	computed: {
		defaultImg: () => defaultImg,
		resizeImg: () => resizeImg
	},
	components: { SelectSupercargo },
	methods:{
		selectTruck() {
			this.$emit('selectTruck', this.truck)
		},
		add(type) {
			this.type = type
			this.selectDialogVisible = true
		},
		selectSupercargo(type) {
			this.type = type
			this.selectDialogVisible = true
		},
		deleteItem() {
			this.truck.superCargo = null
			this.$emit('selectTruck', this.truck)
			this.flag = false
		},
		handleSelectSupercargo(bool, data, type) {
			if (bool) {
				if (type == 'primary') {
					this.truck.primaryDriver = data
				} else {
					this.truck.superCargo = data
				}
				this.expTooltip()
			}
			this.$emit('selectTruck', this.truck)
			this.flag = true
			this.selectDialogVisible = false
		},
		expTooltip() {
			this.truckExp = this.truck.expiredCertificate?this.truck.expiredCertificate.split(","):[]
			this.primaryDriverExp = this.truck.primaryDriver && this.truck.primaryDriver.expiredCertificate?this.truck.primaryDriver.expiredCertificate.split(","):[]
			this.superCargoExp = this.truck.superCargo && this.truck.superCargo.expiredCertificate?this.truck.superCargo.expiredCertificate.split(","):[]
		}
	}
}
</script>

<style lang="stylus" scoped>
	.listItem
		border 1px solid #f0f0f0
		margin-top 10px
		font-size 12px
		height 72px
		position relative
		display flex
		min-width 1210px
		.selectColumn
			flex 0 0 70px
			position relative
			.selectIcon
				position absolute
				left 50%
				top 50%
				transform translate(-50%,-50%)
				.svg-icon 
					color #ddd
					font-size 14px
					cursor pointer
					&.selected
					&:hover
						color #409EFF
		.truckColumn
		.driverColumn
		.escortColumn
			padding 10px
			flex 1
			border-left 1px solid #f0f0f0
			width 100%
			height 70px
			min-width 380px
			position relative
			p
				margin 0
				line-height 20px
				height 20px
				color #666
				&:first-child
					line-height 30px
					height 30px
			.headPic
				margin-right 10px
				img
					width 50px
					height 50px
					vertical-align top
					border-radius 3px
			.plateNo
			.driverName
			.escortName
				font-size 16px
				vertical-align top
				margin-right 10px
		.driverColumn
		.escortColumn
			.headPic
				img
					border-radius 25px
			.btn
				color #409EFF
				padding 2px 10px
				cursor pointer
				position absolute
				font-size 14px
				&.addEscortBtn
					left 50%
					top 50%
					transform translate(-50%,-50%)
		.escortColumn
			.replaceBtn
				right 60px
				bottom 10px	
			.deleteBtn
				right 10px
				bottom 10px
				color #F56C6C
		.driverColumn
			.replaceBtn
				right 10px
				bottom 10px		
				
	.section-block
		margin 20px 0 10px
		.selectedDriverList
			padding 0 10px
			.el-tag
				margin 0 10px 10px 0
</style>
