<template>
	<div class="main-content">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card class="box-card dashboardItem">
					<div slot="header" class="clearfix">
						<el-badge :value="0" :max="99" class="item"><span>待处理运单</span></el-badge>
						<router-link tag="a" class="more" :to="{name: 'carrierbills'}">查看更多</router-link>
					</div>
					<div class="table">
						<el-table :data="tableData" border style="width: 100%" size="mini" :height="250">
							<el-table-column label="承运单号" width="180" align="center" fixed>
								<template slot-scope="scope">
									<span style="color:#409EFF;cursor:pointer" @click="ViewCarrierbill(scope.row.carrierOrderID)">{{scope.row.carrierOrderNo}}</span>
								</template>
							</el-table-column>
							<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
							<el-table-column label="卸货地" prop="consigneeArea"></el-table-column>
							<el-table-column label="收货人" prop="consigneeName"></el-table-column>
							<el-table-column label="到货时间" prop="ArrivalDate" width="140" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.consigneeDate">{{scope.row.consigneeDate | getdatefromtimestamp()}}</span>
								</template>
							</el-table-column>
							<el-table-column label="货物规格/货物名称" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.carrierCargo[0]">
										{{scope.row.carrierCargo[0].cargoType}}
										/{{scope.row.carrierCargo[0].cargoName}}
										<span v-if="scope.row.carrierCargo.length > 1">...</span>
									</span>
								</template>
							</el-table-column>
							<el-table-column label="货物总量">
								<template slot-scope="scope">
									<span v-if="scope.row.carrierCargo[0]">
										{{(scope.row.carrierCargo[0].cargoWeight ? scope.row.carrierCargo[0].cargoWeight : 0) + '吨'}}
										/{{(scope.row.carrierCargo[0].cargoVolume ? scope.row.carrierCargo[0].cargoVolume : 0) + '方'}}
										/{{(scope.row.carrierCargo[0].cargoNum ? scope.row.carrierCargo[0].cargoNum : 0) + '件'}}
									</span>
								</template>
							</el-table-column>
							<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
							<el-table-column label="发货时间" width="140" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.shipperDate">{{scope.row.shipperDate | getdatefromtimestamp()}}</span>
								</template>
							</el-table-column>
							<el-table-column label="发货人" prop="shipperName"></el-table-column>
							<el-table-column label="发货地" prop="shipperArea"></el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card dashboardItem">
					<div slot="header" class="clearfix">
						<el-badge :value="0" :max="99" class="item"><span>运输中</span></el-badge>
						<router-link tag="a" class="more" :to="{name: 'dispatchbills'}">查看更多</router-link>
					</div>
					<div class="table">
						<el-table :data="tableData1" border style="width: 100%" size="mini" :height="250">
							<el-table-column label="调度单号" prop="ControlsNum" width="130" align="center">
								<template slot-scope="scope">
									<span style="color:#409EFF;cursor:pointer" @click="ViewDispatchBill(scope.row.dispatchOrderID)">{{scope.row.dispatchOrderNo}}</span>
								</template>
							</el-table-column>
							<el-table-column label="车辆号牌" prop="plateNo" width="110" align="center"></el-table-column>
							<el-table-column label="配载量" align="center" width="180">
								<template slot-scope="scope">
									<span>
										{{(scope.row.loadWeightSum ? scope.row.loadWeightSum : 0) + '吨'}}
										/{{(scope.row.loadVolumeSum ? scope.row.loadVolumeSum : 0) + '方'}}
										/{{(scope.row.loadNumSum ? scope.row.loadNumSum : 0) + '件'}}
									</span>
								</template>
							</el-table-column>
							<el-table-column label="司机" prop="driverName" width="80" align="center"></el-table-column>
							<el-table-column label="调度状态" width="80" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.status == 'Committed'">待执行</span>
									<span v-else-if="scope.row.status == 'Loaded'">已装运</span>
									<span v-else-if="scope.row.status == 'Signed'">已签收</span>
									<span v-else-if="scope.row.status == 'Canceled'">作废</span>
								</template>
							</el-table-column>
							<el-table-column label="随车人员" prop="superCargoName" width="80" align="center"></el-table-column>
							<el-table-column label="订单号" prop="carrierOrder.carrierOrderNo" width="180" align="center"></el-table-column>
							<el-table-column label="发货地" width="180" align="center">
								<template slot-scope="scope">
									<span>{{scope.row.dispatchOrderCargo.shipperArea + scope.row.dispatchOrderCargo.shipperAreaDetail}}</span>
								</template>
							</el-table-column>
							<el-table-column label="收货地" width="180" align="center">
								<template slot-scope="scope">
									<span>{{scope.row.dispatchOrderCargo.consigneeArea + scope.row.dispatchOrderCargo.consigneeAresDetail}}</span>
								</template>
							</el-table-column>
							<el-table-column label="到货时间" width="140" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.carrierOrder">{{scope.row.carrierOrder.consigneeDate | getdatefromtimestamp()}}</span>
									<span v-else></span>
								</template>
							</el-table-column>
							<el-table-column label="货物规格/名称">
								<template slot-scope="scope">
									<span>{{scope.row.dispatchOrderCargo.cargoType?scope.row.dispatchOrderCargo.cargoType+'/':''}}{{scope.row.dispatchOrderCargo.cargoName}}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card class="box-card dashboardItem">
					<div slot="header" class="clearfix">
						<el-badge :value="0" :max="99" class="item"><span>可用车辆</span></el-badge>
						<router-link tag="a" class="more" :to="{name: 'truck'}">查看更多</router-link>
					</div>
					<div class="table">
						<el-table :data="tableData2" border style="width: 100%" size="mini" :height="250">
							<el-table-column label="自编号" fixed width="60" align="center">
								<template slot-scope="scope">
									<span style="color:#409EFF;cursor:pointer" @click="ViewTruck(scope.row.truckID)">{{scope.row.code}}</span>
								</template>
							</el-table-column>
							<el-table-column label="所属地区" prop="area"></el-table-column>
							<el-table-column label="所属企业" prop="companyName"></el-table-column>
							<el-table-column label="车牌号" prop="plateNo"></el-table-column>
							<el-table-column label="车牌颜色" prop="plateNoColor"></el-table-column>
							<el-table-column label="车辆类别" prop="truckCategory"></el-table-column>
							<el-table-column label="车辆类型" prop="truckType"></el-table-column>
							<el-table-column label="道路运输证号" prop="roadTransportNo" width="120"></el-table-column>
							<el-table-column label="经营范围" prop="businessScope"></el-table-column>
							<el-table-column label="道路运输证年审期至" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.roadTransportLicAnnualPeriod">{{scope.row.roadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="行驶证审验效期至" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.driverLicExamineExpires">{{scope.row.driverLicExamineExpires | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="承运人责任险有效期至" prop="carrierValid" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.carrierRiskInsuranceExpires">{{scope.row.carrierRiskInsuranceExpires | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="等级评定" prop="rank" width="100"></el-table-column>
							<el-table-column label="下次等评日期" width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.nextRankEvaluteTime">{{scope.row.nextRankEvaluteTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="二级维护日期" width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.secondaMaintainTime">{{scope.row.secondaMaintainTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="下次二级维护日期" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.nextSecondLevel">{{scope.row.nextSecondLevel | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="载重" prop="loads" width="100"></el-table-column>
							<el-table-column label="罐体类型" prop="cannedType" width="100"></el-table-column>
							<el-table-column label="罐体容积" prop="tankVolume" width="100"></el-table-column>
							<el-table-column label="罐体检测有效期至" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.tankQCExpires">{{scope.row.tankQCExpires | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="安全阀检测有效期至" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.safetyValvesQCExpires">{{scope.row.safetyValvesQCExpires | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="压力表检测有效期至" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.pressureGaugeQCExpires">{{scope.row.pressureGaugeQCExpires | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="挂车车牌" prop="trailerPlateNo" width="100"></el-table-column>
							<el-table-column label="汽车生产厂家" prop="manufacturer" width="100"></el-table-column>
							<el-table-column label="品牌型号" prop="carBrandModel" width="100"></el-table-column>
							<el-table-column label="发动机号" prop="engineNO" width="100"></el-table-column>
							<el-table-column label="车架号" prop="vehicleFrameNO" width="100"></el-table-column>
							<el-table-column label="行驶证注册日期" prop="driverLicRgDate" width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.driverLicRegisterTime">{{scope.row.driverLicRegisterTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="行驶证发证日期" prop="driverLicAwDate" width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.driverLicIssueTime">{{scope.row.driverLicIssueTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="牵引质量" prop="tractiveTonnage" width="100"></el-table-column>
							<el-table-column label="车长" prop="length" width="100"></el-table-column>
							<el-table-column label="车宽" prop="width" width="100"></el-table-column>
							<el-table-column label="车高" prop="high" width="100"></el-table-column>
							<el-table-column label="添加时间" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card dashboardItem">
					<div slot="header" class="clearfix">
						<el-badge :value="0" :max="99" class="item"><span>可用人员</span></el-badge>
						<router-link tag="a" class="more" :to="{name: 'person'}">查看更多</router-link>
					</div>
					<div class="table">
						<el-table :data="tableData3" border style="width: 100%" size="mini" :height="250">
							<el-table-column label="姓名" fixed>
								<template slot-scope="scope">
									<span style="color:#409EFF;cursor:pointer" @click="ViewPerson(scope.row.staffID)">{{scope.row.realName}}</span>
								</template>
							</el-table-column>
							<el-table-column label="性别" width="50" align="center">
								<template slot-scope="scope">
									<span >{{scope.row.sex == 'M' ? '男' : '女'}}</span>
								</template>
							</el-table-column>
							<el-table-column label="聘用岗位" width="100">
								<template slot-scope="scope">
									<span v-for="item in scope.row.position.split(',')" :key="item">{{postMap[item]}},</span>
								</template>
							</el-table-column>
							<el-table-column label="身份证号" prop="idCardNum" width="160"></el-table-column>
							<el-table-column label="创建人" prop="createName"></el-table-column>
							<el-table-column label="状态">
								<template slot-scope="scope">
									<span v-if="scope.row.status == 'pass'">通过</span>
									<span v-else-if="scope.row.status == 'unpass'">不通过</span>
									<span v-else>其他</span>
								</template>
							</el-table-column>
							<el-table-column label="审核人" prop="auditName"></el-table-column>
							<el-table-column label="审核日期" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.auditTime">{{scope.row.auditTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="准驾车型">
								<template slot-scope="scope">
									<span v-if="scope.row.quasiDrivingType">{{scope.row.quasiDrivingType}}</span>
								</template>
							</el-table-column>
							<el-table-column label="驾驶证审验有效期至" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.driverLicExamineEndTime">{{scope.row.driverLicExamineEndTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="从业资格证件号" prop="qualificationCode" width="160"></el-table-column>
							<el-table-column label="从业资格类别" prop="qualificationType" width="150"></el-table-column>
							<el-table-column label="从业资格证有效期至" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.qualificationExpirationTime">{{scope.row.qualificationExpirationTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="初次发证件时间" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.qualificationFirstTime">{{scope.row.qualificationFirstTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="诚信考核等级" prop="integrityExamineGrade" width="100"></el-table-column>
							<el-table-column label="诚信考核有效期至" prop="integrityValidTo" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.integrityExamineEndTime">{{scope.row.integrityExamineEndTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="合同有效期起" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.laborContractBeginTime">{{scope.row.laborContractBeginTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="合同有效期至" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.laborContractEndTime">{{scope.row.laborContractEndTime | getdatefromtimestamp(true)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="职称或技术等级" prop="titleLever" width="120"></el-table-column>
							<el-table-column label="联系电话" prop="mobile" width="100"></el-table-column>
							<el-table-column label="家庭地址" prop="homeAddress" width="140"></el-table-column>
							<el-table-column label="备注说明" prop="remark" width="140"></el-table-column>
							<el-table-column label="添加时间" width="140">
								<template slot-scope="scope">
									<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import Carrierbill from "../../api/Carrierbill"
import Dispatchbill from "../../api/Dispatchbill"
import Truck from "../../api/Truck"
import Staff from "../../api/Staff"
export default {
	name: 'home',
	data() {
		return {
			tableData: [],
			tableData1: [],
			tableData2: [],
			tableData3: [],
			postMap: {
				"Operator": "操作员",
				"Driver": "驾驶员",
				"Supercargo": "押运员",
				"SafetyOfficer": "专职安全员",
				"Stevedore": "装卸管理人员",
				"Other": "其他人员"
			}
		}
	},
	created() {
		this.getCarrierOrder()
		this.getDispatchOrder()
		this.getTruckList()
		this.getStaffList()
	},
	methods: {
		getCarrierOrder() {
			Carrierbill.find({
				status: 'Committed',
				pageSize: 5
			}).then(res => {
				this.tableData = res.records
			})
		},
		getDispatchOrder() {
			Dispatchbill.find({
				status: 'Loaded',
				pageSize: 5
			}).then(res => {
				this.tableData1 = res.records
			})
		},
		getTruckList() {
			Truck.find({
				WorkStatus: 'Free',
				isLoadStatus: 'Y',
				pageSize: 5
			}).then(res => {
				this.tableData2 = res.records
			})
		},
		getStaffList() {
			Staff.find({
				WorkStatus: 'Free',
				pageSize: 5
			}).then(res => {
				this.tableData3 = res.records
			})
		},
		ViewCarrierbill(carrierOrderID) {
			this.$router.push({ name: 'viewcarrierbill', query: { carrierOrderID } })
		},
		ViewDispatchBill(dispatchOrderID) {
			this.$router.push({ name: 'viewdispatchbill', query: { dispatchOrderID } })
		},
		ViewTruck(truckID) {
			this.$router.push({name: 'viewtruck', query: { truckID } })
		},
		ViewPerson(staffID) {
            this.$router.push({name: 'viewperson', query: { staffID } })
        }
	}
}

</script>
<style lang="stylus" scoped>
.box-card
	margin-bottom 20px
	.more
		float right
		color #409EFF
		font-size 12px
		line-height 20px
</style>
