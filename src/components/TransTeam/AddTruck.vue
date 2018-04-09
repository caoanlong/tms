<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">添加车辆</div>
			<el-form label-width="155px" size="mini">
				<el-row>
					<el-col :span="6">
						<el-form-item label="状态">
							<el-select style="width: 100%" v-model="truck.status" placeholder="请选择">
								<el-option label="通过" value="pass"></el-option>
								<el-option label="未通过" value="unpass"></el-option>
								<el-option label="其他" value="other"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核人">
							<el-select style="width: 100%" v-model="truck.auditBy" placeholder="请选择">
								<el-option label="caoanlong" value="980762678237921281"></el-option>
								<el-option label="nongxinkao" value="978991129679998978"></el-option>
								<el-option label="nxk" value="979241449798569986"></el-option>
								<el-option label="13800138000" value="980987179567521793"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核日期">
							<el-date-picker
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
						<el-form-item label="所属地区">
							<DistPicker @selectChange="handleSelectedArea"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所属企业">
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
						<el-form-item label="车辆类别">
							<el-select style="width: 100%" v-model="truck.truckCategory" placeholder="请选择">
								<el-option label="挂车" value="挂车"></el-option>
								<el-option label="牵引车" value="牵引车"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆类型">
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
						<el-form-item label="车牌颜色">
							<el-select style="width: 100%" v-model="truck.plateNoColor" placeholder="请选择">
								<el-option label="黄" value="黄"></el-option>
								<el-option label="蓝" value="蓝"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车牌号">
							<el-input v-model="truck.plateNo"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="挂车车牌">
							<el-input v-model="truck.trailerPlateNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车长">
							<el-select style="width: 100%" v-model="truck.length" placeholder="请选择">
								<el-option label="5米" value="5"></el-option>
								<el-option label="8米" value="8"></el-option>
								<el-option label="10米" value="10"></el-option>
								<el-option label="12米" value="12"></el-option>
								<el-option label="15米" value="15"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车宽">
							<el-select style="width: 100%" v-model="truck.width" placeholder="请选择">
								<el-option label="2米" value="2"></el-option>
								<el-option label="3米" value="3"></el-option>
								<el-option label="4米" value="4"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车高">
							<el-input v-model="truck.high"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="载重">
							<el-input v-model="truck.loads"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="装载方数">
							<el-input v-model="truck.loadVolume"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="牵引质量">
							<el-input v-model="truck.tractiveTonnage"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="罐体类型">
							<el-select style="width: 100%" v-model="truck.cannedType" placeholder="请选择">
								<el-option label="椭圆形" value="椭圆形"></el-option>
								<el-option label="方圆形" value="方圆形"></el-option>
								<el-option label="圆形" value="圆形"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="罐体容积">
							<el-input v-model="truck.tankVolume"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="罐体检测有效期至">
							<el-date-picker
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
						<el-form-item label="汽车生产厂家">
							<el-input v-model="truck.manufacturer"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="品牌型号">
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
						<el-form-item label="核载人数">
							<el-select style="width: 100%" v-model="truck.personsCapacity" placeholder="请选择">
								<el-option 
								v-for="i in 9" :key="i" 
								:label="i+1" :value="i+1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车身颜色">
							<el-input v-model="truck.carBodyColor"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否喷涂警示标志">
							<el-select style="width: 100%" v-model="truck.hasWarnMark" placeholder="请选择">
								<el-option label="是" value="是"></el-option>
								<el-option label="否" value="否"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="行驶证注册日期">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.driverLicRegisterTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行驶证发证日期">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.driverLicIssueTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行驶证审验效期至">
							<el-date-picker
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
						<el-form-item label="道路运输证号">
							<el-input v-model="truck.roadTransportNo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营范围">
							<el-input v-model="truck.businessScope"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输证年审期至">
							<el-date-picker
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
						<el-form-item label="所有人或单位">
							<el-input v-model="truck.carOwnerName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人联系电话">
							<el-input v-model="truck.carOwnerMobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人登记地址">
							<el-input v-model="truck.carOwnerAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="实际车主姓名">
							<el-input v-model="truck.curDriverName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主电话">
							<el-input v-model="truck.curDriverMobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主现住址">
							<el-input v-model="truck.curDriverAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所有权">
							<el-select style="width: 100%" v-model="truck.propertyType" placeholder="请选择">
								<el-option label="单位" value="单位"></el-option>
								<el-option label="个人" value="个人"></el-option>
								<el-option label="挂靠" value="挂靠"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营证号">
							<el-input v-model="truck.businessLicenseNo"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="等级评定">
							<el-select style="width: 100%" v-model="truck.rank" placeholder="请选择">
								<el-option label="一级" value="一级"></el-option>
								<el-option label="二级" value="二级"></el-option>
								<el-option label="三级" value="三级"></el-option>
								<el-option label="未评定" value="未评定"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="下次等评日期">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.nextRankEvaluteTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="二级维护日期">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.secondaMaintainTime"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="下次二级维护日期">
							<el-date-picker
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
						<el-form-item label="承运人责任险有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.carrierRiskInsuranceExpires"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="交强险有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.saLIInsuranceExpires"
								type="date" 
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="商业险有效期至">
							<el-date-picker
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
							<el-button type="primary" @click="createItem">立即保存</el-button>
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
export default {
	data() {
		return {
			loading: true,
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
		}
	},
	created() {
	},
	methods: {
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
		createItem() {
			let data = this.truck
			console.log(data)
			request({
				url: '/truck/add',
				method: 'post',
				data
			}).then(res => {
				console.log(res.data)
				Message.success(res.data.msg)
				this.$router.push({name: 'truck'})
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