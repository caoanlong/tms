<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑车辆</div>
			<el-form label-width="155px" size="mini" :model="truck" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="状态" prop="status">
							<el-select style="width: 100%" v-model="truck.status" placeholder="请选择">
								<el-option label="通过" value="pass"></el-option>
								<el-option label="未通过" value="unpass"></el-option>
								<el-option label="其他" value="other"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核人" prop="auditName">
							<el-input v-model="truck.auditName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核日期" prop="auditTime">
							<el-date-picker 
								:picker-options="{disabledDate}"
								:editable="false"
								style="width: 100%" 
								v-model="truck.auditTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="所属地区" prop="areaID">
							<DistPicker :selected="selectedArea" @selectChange="handleSelectedArea"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所属企业" prop="companyName">
							<el-input v-model="truck.companyName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="自编号">
							<el-input v-model="truck.code"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="车辆类别" prop="truckCategory">
							<el-select style="width: 100%" v-model="truck.truckCategory" placeholder="请选择">
								<el-option label="挂车" value="挂车"></el-option>
								<el-option label="牵引车" value="牵引车"></el-option>
								<el-option label="整车" value="整车"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆类型" prop="truckType">
							<el-select style="width: 100%" v-model="truck.truckType" placeholder="请选择">
								<el-option label="集装箱挂车" value="集装箱挂车"></el-option>
								<el-option label="厢式货车" value="厢式货车"></el-option>
								<el-option label="重型半挂牵引车" value="重型半挂牵引车"></el-option>
								<el-option label="重型厢式货车" value="重型厢式货车"></el-option>
								<el-option label="重型集装箱半挂车" value="重型集装箱半挂车"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车牌颜色" prop="plateNoColor">
							<el-select style="width: 100%" v-model="truck.plateNoColor" placeholder="请选择">
								<el-option label="黄" value="黄"></el-option>
								<el-option label="蓝" value="蓝"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item>
						<span style="color: red">*</span>
						<el-select style="width: 120px" v-model="plateNoType" placeholder="请选择" @change="changePlateNoType">
							<el-option label="车牌号" value="车牌号"></el-option>
							<el-option label="挂车车牌" value="挂车车牌"></el-option>
						</el-select>
						<div style="display: inline-block">
							<el-input placeholder="请输入车牌号" v-model="truck.plateNo" v-if="plateNoType == '车牌号'"></el-input>
							<el-input placeholder="请输入挂车车牌" v-model="truck.trailerPlateNo" v-if="plateNoType == '挂车车牌'"></el-input>
						</div>
					</el-form-item>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="车长" prop="length">
							<el-input v-model="truck.length">
								<template slot="append">毫米</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车宽" prop="width">
							<el-input v-model="truck.width">
								<template slot="append">毫米</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车高" prop="high">
							<el-input v-model="truck.high">
								<template slot="append">毫米</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="载重" prop="loads">
							<el-input v-model="truck.loads">
								<template slot="append">千克</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="装载方数" prop="loadVolume">
							<el-input v-model="truck.loadVolume">
								<template slot="append">立方米</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="牵引质量" prop="tractiveTonnage">
							<el-input v-model="truck.tractiveTonnage">
								<template slot="append">千克</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="总质量" prop="totalWeight">
							<el-input v-model="truck.totalWeight">
								<template slot="append">千克</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="准载类型">
							<el-input v-model="truck.accurateLoadType"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="罐体类型">
							<el-select style="width: 100%" v-model="truck.cannedType" placeholder="请选择">
								<el-option label="椭圆形" value="椭圆形"></el-option>
								<el-option label="方圆形" value="方圆形"></el-option>
								<el-option label="圆形" value="圆形"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="罐体容积" prop="tankVolume">
							<el-input v-model="truck.tankVolume">
								<template slot="append">立方米</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="罐体检测有效期至">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.tankQCExpires"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="安全阀检测有效期至">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.safetyValvesQCExpires"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="压力表检测有效期至">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.pressureGaugeQCExpires"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="汽车生产厂家" prop="manufacturer">
							<el-input v-model="truck.manufacturer"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="品牌型号" prop="carBrandModel">
							<el-input v-model="truck.carBrandModel"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发动机号">
							<el-input v-model="truck.engineNO"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车架号">
							<el-input v-model="truck.vehicleFrameNO"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="核载人数" prop="personsCapacity">
							<el-select style="width: 100%" v-model="truck.personsCapacity" placeholder="请选择">
								<el-option 
								v-for="i in 9" :key="i" 
								:label="i+1" :value="i+1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车身颜色" prop="carBodyColor">
							<el-input v-model="truck.carBodyColor"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否喷涂警示标志" prop="hasWarnMark">
							<el-select style="width: 100%" v-model="truck.hasWarnMark" placeholder="请选择">
								<el-option label="是" value="是"></el-option>
								<el-option label="否" value="否"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="行驶证注册日期" prop="driverLicRegisterTime">
							<el-date-picker 
								:picker-options="{disabledDate}"
								:editable="false"
								style="width: 100%" 
								v-model="truck.driverLicRegisterTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行驶证发证日期" prop="driverLicIssueTime">
							<el-date-picker 
								:picker-options="{disabledDate: (curDate) => truck.driverLicRegisterTime > curDate}"
								:editable="false"
								style="width: 100%" 
								v-model="truck.driverLicIssueTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行驶证审验效期至" prop="driverLicExamineExpires">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.driverLicExamineExpires"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="道路运输证号" prop="roadTransportNo">
							<el-input v-model="truck.roadTransportNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营范围" prop="businessScope">
							<el-input v-model="truck.businessScope"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输证年审期至" prop="roadTransportLicAnnualPeriod">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.roadTransportLicAnnualPeriod"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所有人或单位" prop="carOwnerName">
							<el-input v-model="truck.carOwnerName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人联系电话" prop="carOwnerMobile">
							<el-input v-model="truck.carOwnerMobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人登记地址" prop="carOwnerAddress">
							<el-input v-model="truck.carOwnerAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="实际车主姓名" prop="curDriverName">
							<el-input v-model="truck.curDriverName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主电话" prop="curDriverMobile">
							<el-input v-model="truck.curDriverMobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主现住址" prop="curDriverAddress">
							<el-input v-model="truck.curDriverAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所有权" prop="propertyType">
							<el-select style="width: 100%" v-model="truck.propertyType" placeholder="请选择">
								<el-option label="单位" value="单位"></el-option>
								<el-option label="个人" value="个人"></el-option>
								<el-option label="挂靠" value="挂靠"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营证号" prop="businessLicenseNo">
							<el-input v-model="truck.businessLicenseNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营性质" prop="businessNature">
							<el-select style="width: 100%" v-model="truck.businessNature" placeholder="请选择">
								<el-option label="营运" value="营运"></el-option>
								<el-option label="自用" value="自用"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="等级评定" prop="rank">
							<el-select style="width: 100%" v-model="truck.rank" placeholder="请选择">
								<el-option label="一级" value="一级"></el-option>
								<el-option label="二级" value="二级"></el-option>
								<el-option label="三级" value="三级"></el-option>
								<el-option label="未评定" value="未评定"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="下次等评日期" prop="nextRankEvaluteTime">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.nextRankEvaluteTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="二级维护日期" prop="secondaMaintainTime">
							<el-date-picker 
								:picker-options="{disabledDate: (curDate) => new Date() > curDate}"
								:editable="false"
								style="width: 100%" 
								v-model="truck.secondaMaintainTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="下次二级维护日期" prop="nextSecondLevel">
							<el-date-picker 
								:picker-options="{disabledDate: (curDate) => truck.secondaMaintainTime > curDate}"
								:editable="false"
								style="width: 100%" 
								v-model="truck.nextSecondLevel"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="承运人责任险有效期至" prop="carrierRiskInsuranceExpires">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.carrierRiskInsuranceExpires"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="交强险有效期至" prop="saLIInsuranceExpires">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.saLIInsuranceExpires"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="商业险有效期至" prop="bizInsuranceExpires">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.bizInsuranceExpires"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="GPS类型">
							<el-input v-model="truck.gpSType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS入网号">
							<el-input v-model="truck.gpSNetworkNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS卡号">
							<el-input v-model="truck.gpSCardNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS序列号">
							<el-input v-model="truck.gpSSerialNumber"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="GPS安装时间">
							<el-date-picker 
								:editable="false"
								style="width: 100%" 
								v-model="truck.gpSSetupTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="车辆照片(正面)">
							<ImageUpload :files="[truck.truckFrontPic]" @imgUrlBack="handleTruckFrontPicSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆照片(侧面1)">
							<ImageUpload :files="[truck.truckSidePic1]" @imgUrlBack="handleTruckSidePic1Success"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆照片(侧面2)">
							<ImageUpload :files="[truck.truckSidePic2]" @imgUrlBack="handleTruckSidePic2Success"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="机动车行驶证(正)">
							<ImageUpload :files="[truck.driverLicPic]" @imgUrlBack="handleDriverLicPicSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="机动车行驶证(副)">
							<ImageUpload :files="[truck.driverLicSidePic]" @imgUrlBack="handleDriverLicSidePicSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输许可证(正)">
							<ImageUpload :files="[truck.roadTransportPic]" @imgUrlBack="handleRoadTransportPicSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输许可证(副)">
							<ImageUpload :files="[truck.roadTransportSidePic]" @imgUrlBack="handleRoadTransportSidePicSuccess"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="其他照片">
							<ImageUpload :files="otherImgs" :limitNum="5" @imgUrlBack="imgUrlBack"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="updateItem">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../common/request'
import ImageUpload from '../CommonComponents/ImageUpload'
import DistPicker from '../CommonComponents/DistPicker'
import { checkTel, checkInt, checkFloat, checkFloat2 } from '../../common/validators'
export default {
	data() {
		return {
			loading: true,
			plateNoType: '车牌号',
			truck: {
				auditBy: '',
				auditTime: '',
				accurateLoadType: '',		// string 准载类型
				area: '',		// string 地区
				areaID: '',		// string 地区ID
				bizInsuranceExpires: '',		// string	@mock=1522813658
				businessLicenseNo: '',		// string 经营证号
				businessNature: '',		// string 经营性质
				businessScope: '',		// string 经营范围
				cannedType: '',		// string 罐装类型
				carBodyColor: '',		// string 车身颜色
				carBrandModel: '',		// string 车品牌型号
				carOwnerAddress: '',		// string 所有人登记地址
				carOwnerMobile: '',		// string 所有人电话
				carOwnerName: '',		// string 所有人姓名或单位名称
				carrierRiskInsuranceExpires: '',		// string	@mock=1522813658
				code: '',		// string 编码
				companyID: '',		// string	@mock=978991129738719234
				companyName: '',		// string 所属企业名称
				curDriverAddress: '',		// string 实际车主现住址
				curDriverMobile: '',		// string 当前车主联系方式
				curDriverName: '',		// string 当前车主姓名
				driverLicExamineExpires: '',		// string	@mock=1522813658
				driverLicIssueTime: '',		// string	@mock=1522813658
				driverLicPic: '',		// string 机动车行驶证正本
				driverLicRegisterTime: '',		// string	@mock=1522813658
				driverLicSidePic: '',		// string 机动车行驶证副本
				engineNO: '',		// string 发动机号
				gpSCardNo: '',		// string GPS卡号
				gpSNetworkNo: '',		// string GPS入网号
				gpSSerialNumber: '',		// string GPS序列号
				gpSSetupTime: '',		// string	@mock=1522813658
				gpSType: '',		// string GPS类型
				hasWarnMark: '',		// string	@mock=N
				high: '',		// string	@mock=20
				length: '',		// string	@mock=12
				loadStatus: '',		// string 装载状态
				loadVolume: '',		// string	@mock=11
				loads: '',		// string	@mock=20
				manufacturer: '',		// string 汽车生产厂家
				nextRankEvaluteTime: '',		// string	@mock=1522813658
				nextSecondLevel: '',		// string	@mock=1522813658
				otherTruckPic1: '',		// string 车辆其他图片1
				otherTruckPic2: '',		// string 车辆其他图片2
				otherTruckPic3: '',		// string 车辆其他图片3
				otherTruckPic4: '',		// string 车辆其他图片4
				otherTruckPic5: '',		// string 车辆其他图片5
				personsCapacity: '',		// string	@mock=20
				plateNo: '',		// string 车牌号
				plateNoColor: '',		// string 车牌颜色
				plateNoType: '',		// string 车牌类型
				pressureGaugeQCExpires: '',		// string	@mock=1522813658
				propertyType: '',		// string 所有权类型
				rank: '',		// string 等级评定
				roadTransportLicAnnualPeriod: '',		// string	@mock=1522813658
				roadTransportNo: '',		// string 道路运输证号
				roadTransportPic: '',		// string 道路运输许可证
				roadTransportSidePic: '',		// string 道路运输许可证副本
				saLIInsuranceExpires: '',		// string	@mock=1522813658
				safetyValvesQCExpires: '',		// string	@mock=1522813658
				secondaMaintainTime: '',		// string	@mock=1522813658
				status: '',		// string 资料状态
				tankQCExpires: '',		// string	@mock=1522813658
				tankVolume: '',		// string	@mock=123
				totalWeight: '',		// string	@mock=4
				tractiveTonnage: '',		// string	@mock=12
				trailerPlateNo: '',		// string 挂车牌号
				truckBrand: '',		// string	@mock=1
				truckCategory: '',		// string 车辆类别
				truckFrontPic: '',		// string 车辆正面照
				truckSidePic1: '',		// string 车辆侧面照1
				truckSidePic2: '',		// string 车辆侧面照2
				truckType: '',		// string 车辆类型
				vehicleFrameNO: '',		// string 车架号
				width: '',		// string	@mock=50
				workStatus: ''		// string 运输状态
			},
			otherImgs: [],
			selectedArea: [],
			rules: {
				status: [
					{ required: true, message: '请选择状态', trigger: 'change' }
				],
				auditName: [
					{required: true, message: '请输入审核人', trigger: 'blur'}
				],
				auditTime: [
					{required: true, message: '请选择审核日期', trigger: 'change'}
				],
				areaID: [
					{ required: true, message: '请选择地区', trigger: 'change' }
				],
				companyName: [
					{required: true, message: '请输入企业', trigger: 'blur'}
				],
				truckCategory: [
					{required: true, message: '请选择车辆类别', trigger: 'change'},
				],
				truckType: [
					{ required: true, message: '请选择车辆类型', trigger: 'change' }
				],
				plateNoColor: [
					{required: true, message: '请选择车牌颜色', trigger: 'change'}
				],
				length: [
					{required: true, validator: checkInt, trigger: 'blur'}
				],
				width: [
					{ required: true, validator: checkInt,trigger: 'blur' }
				],
				high: [
					{required: true, validator: checkInt, trigger: 'blur'}
				],
				loads: [
					{required: true, validator: checkFloat, trigger: 'blur'}
				],
				loadVolume: [
					{ required: true, validator: checkFloat, trigger: 'blur' }
				],
				tractiveTonnage: [
					{ validator: checkFloat2, trigger: 'blur' }
				],
				totalWeight: [
					{ required: true, validator: checkFloat, trigger: 'blur' }
				],
				tankVolume: [
					{ validator: checkFloat2, trigger: 'blur' }
				],
				manufacturer: [
					{required: true, message: '请输入生产厂家', trigger: 'blur'}
				],
				carBrandModel: [
					{required: true, message: '请输入品牌型号', trigger: 'blur'},
				],
				personsCapacity: [
					{ required: true, message: '请选择核载人数', trigger: 'change' }
				],
				carBodyColor: [
					{required: true, message: '请输入车身颜色', trigger: 'blur'}
				],
				hasWarnMark: [
					{required: true, message: '请选择是否喷涂警示', trigger: 'change'}
				],
				driverLicRegisterTime: [
					{required: true, message: '请选择行驶证注册日期', trigger: 'change'}
				],
				driverLicIssueTime: [
					{ required: true, message: '请选择行驶证发证日期', trigger: 'change' }
				],
				driverLicExamineExpires: [
					{required: true, message: '请选择行驶证审验日', trigger: 'change'}
				],
				roadTransportNo: [
					{required: true, message: '请输入道路运输号', trigger: 'blur'},
				],
				businessScope: [
					{ required: true, message: '请输入经营范围', trigger: 'blur' }
				],
				roadTransportLicAnnualPeriod: [
					{required: true, message: '请输入道路运输年审日', trigger: 'change'}
				],
				carOwnerName: [
					{required: true, message: '请输入所有人/单位', trigger: 'blur'}
				],
				carOwnerMobile: [
					{required: true, validator: checkTel, trigger: 'blur'}
				],
				carOwnerAddress: [
					{required: true, message: '请输入所有人地址', trigger: 'blur'}
				],
				curDriverName: [
					{required: true, message: '请输入车主姓名', trigger: 'blur'}
				],
				curDriverMobile: [
					{required: true, validator: checkTel, trigger: 'blur'}
				],
				curDriverAddress: [
					{required: true, message: '请输入车主住址', trigger: 'blur'}
				],
				propertyType: [
					{required: true, message: '请选择所有权', trigger: 'change'}
				],
				businessNature: [
					{required: true, message: '请选择经营性质', trigger: 'change'}
				],
				businessLicenseNo: [
					{required: true, message: '请输入经营证号', trigger: 'blur'}
				],
				rank: [
					{required: true, message: '请选择等级评定', trigger: 'blur'}
				],
				nextRankEvaluteTime: [
					{required: true, message: '请选择下次等评日期', trigger: 'blur'}
				],
				secondaMaintainTime: [
					{required: true, message: '请选择二次维护日期', trigger: 'blur'}
				],
				nextSecondLevel: [
					{required: true, message: '请选择下次二次维护日期', trigger: 'blur'}
				],
				carrierRiskInsuranceExpires: [
					{required: true, message: '请选择承运人责任险有效期', trigger: 'blur'}
				],
				saLIInsuranceExpires: [
					{required: true, message: '请选择交强险有效期', trigger: 'blur'}
				],
				bizInsuranceExpires: [
					{required: true, message: '请选择商业险有效期', trigger: 'blur'}
				]
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			let params = {
				truckID: this.$route.query.truckID
			}
			request({
				url: '/truck/info',
				params
			}).then(res => {
				console.log(res.data.data)
				this.truck = res.data.data
				if (this.truck.plateNo) {
					this.plateNoType = '车牌号'
				} else {
					this.plateNoType = '挂车车牌'
				}
				let areaID = res.data.data.areaID
				this.selectedArea = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
				let resDataComStaffPic = res.data.data
				let i = 1
				while (i < 6) {
					this.otherImgs.push(resDataComStaffPic['otherTruckPic' + i])
					i++
				}
			})
		},
		disabledDate(curDate) {
			return new Date() < curDate
		},
		// 车辆照片(正)
		handleTruckFrontPicSuccess(res) {
			this.truck.truckFrontPic = res[0]
		},
		// 车辆照片(侧1)
		handleTruckSidePic1Success(res) {
			this.truck.truckSidePic1 = res[0]
		},
		// 车辆照片(侧2)
		handleTruckSidePic2Success(res) {
			this.truck.truckSidePic2 = res[0]
		},
		// 机动车行驶证照片(正)
		handleDriverLicPicSuccess(res) {
			this.truck.driverLicPic = res[0]
		},
		// 机动车行驶证照片(副)
		handleDriverLicSidePicSuccess(res) {
			this.truck.driverLicSidePic = res[0]
		},
		// 道路运输许可证照片(正)
		handleRoadTransportPicSuccess(res) {
			this.truck.roadTransportPic = res[0]
		},
		// 道路运输许可证照片(副)
		handleRoadTransportSidePicSuccess(res) {
			this.truck.roadTransportSidePic = res[0]
		},
		imgUrlBack(files) {
			this.otherImgs = files
			for (let i = 0; i < files.length; i++) {
				this.truck['otherTruckPic' + (i + 1)] = files[i]
			}
		},
		handleSelectedArea(data) {
			this.truck.areaID = data
		},
		changePlateNoType(e) {
			if (e == '车牌号') {
				this.truck.trailerPlateNo = ''
			} else {
				this.truck.plateNo = ''
			}
		},
		updateItem() {
			let data = this.truck
			if (!data.tankQCExpires) {
				data.tankQCExpires = ''
			}
			if (!data.safetyValvesQCExpires) {
				data.safetyValvesQCExpires = ''
			}
			if (!data.pressureGaugeQCExpires) {
				data.pressureGaugeQCExpires = ''
			}
			if (!data.gpSSetupTime) {
				data.gpSSetupTime = ''
			}
			if (!data.trailerPlateNo && !data.plateNo) {
				Message.error('车牌号或挂车牌不能为空！')
				return 
			}
			if (data.driverLicRegisterTime > data.driverLicIssueTime) {
				Message.error('行驶证注册日期不能早于行驶证发证日期！')
				return
			}
			if (data.secondaMaintainTime > data.nextSecondLevel) {
				Message.error('二级维护日期不能早于下次二级维护日期！')
				return
			}
			if(!data.truckFrontPic) {
				data.truckFrontPic = ''
			}
			console.log(data)
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					request({
						url: '/truck/update',
						method: 'post',
						data
					}).then(res => {
						console.log(res.data)
						Message.success(res.data.msg)
						this.$router.push({name: 'truck'})
					})
				}
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload,
		DistPicker
	}
}

</script>
<style lang="stylus" scoped>
.avatar-uploader
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
	&:hover 
		border-color #409eff
	.avatar-uploader-icon
		font-size 28px
		color #8c939d
		width 98px
		height 98px
		line-height 98px
		text-align center
	.avatar
		width 98px
		height 98px
		display block
		vertical-align top
</style>