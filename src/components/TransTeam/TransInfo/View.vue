<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">运输档案详情</div>
			<el-tabs v-model="tabSelected" type="card">
				<el-tab-pane label="危货运输登记表" name="first">
					<register-form></register-form>
				</el-tab-pane>
				<el-tab-pane label="运输单位备案" name="second">
					<div id="transUnitList">
						<el-row>
							<el-col>
								<h3 class="text-center">危险物品运输单位备案（危险物品运输车辆基本信息表）</h3>
								<table class="common-table">
									<tr>
										<td colspan="5">
											<span class="tit">车辆所有人：{{transportRecordDetail.truck.carOwnerName}}</span>
											<span class="tit">公司经营证号：{{transportRecordDetail.truck.businessLicenseNo}}</span>
											<span class="tit">建档日期：{{transportRecordDetail.truck.archiveTime | getdatefromtimestamp(true)}}</span>
										</td>
									</tr>
									<tr>
										<td width="80">车牌号码</td>
										<td>{{transportRecordDetail.truck.plateNo}}</td>
										<td width="80">核载质量</td>
										<td width="100">{{transportRecordDetail.truck.tractiveTonnage}}</td>
										<td rowspan="6">
											<p>内部编号：{{transportRecordDetail.truck.code}}</p>
											<img width="240" height="180" v-if="transportRecordDetail.truck.truckFrontPic" :src="imgUrl + transportRecordDetail.truck.truckFrontPic"/>
										</td>
									</tr>
									<tr>
										<td>品牌型号</td>
										<td>{{transportRecordDetail.truck.carBrandModel}}</td>
										<td>总质量</td>
										<td>{{transportRecordDetail.truck.totalWeight}}</td> 
									</tr>
									<tr>
										<td>车架号</td>
										<td>{{transportRecordDetail.truck.vehicleFrameNO}}</td>
										<td>发动机号</td>
										<td>{{transportRecordDetail.truck.engineNO}}</td>
									</tr>
									<tr>
										<td>注册日期</td>
										<td>{{transportRecordDetail.truck.driverLicRegisterTime | getdatefromtimestamp(true)}}</td>
										<td>车辆类型</td>
										<td>{{transportRecordDetail.truck.truckType}}</td>
									</tr>
									<tr>
										<td>使用性质</td>
										<td>{{transportRecordDetail.truck.businessNature}}</td>
										<td>经营类别</td>
										<td>{{transportRecordDetail.truck.businessScope}}</td>
									</tr>
									<tr>
										<td>道路运输证号</td>
										<td>{{transportRecordDetail.truck.roadTransportNo}}</td>
										<td>有效期限</td>
										<td>{{transportRecordDetail.truck.roadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</td>
									</tr>
									<tr v-if="transportRecordDetail.truck.driverLicPic||transportRecordDetail.truck.driverLicSidePic">
										<td colspan="5">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.truck.driverLicPic" :src="imgUrl + transportRecordDetail.truck.driverLicPic"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.truck.driverLicSidePic" :src="imgUrl + transportRecordDetail.truck.driverLicSidePic"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr v-if="transportRecordDetail.truck.roadTransportPic || transportRecordDetail.truck.roadTransportSidePic">
										<td colspan="5">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.truck.roadTransportPic" :src="imgUrl + transportRecordDetail.truck.roadTransportPic"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.truck.roadTransportSidePic" :src="imgUrl + transportRecordDetail.truck.roadTransportSidePic"/>
												</el-col>
											</el-row>
										</td>
									</tr>
								</table>
							</el-col>
						</el-row>
						<el-row v-if="transportRecordDetail.trailer.trailerPlateNo">
							<el-col>
								<h3 class="text-center">危险物品运输单位备案（危险物品运输车辆基本信息表）</h3>
								<table class="common-table">
									<tr>
										<td colspan="5">
											<span class="tit">车辆所有人：{{transportRecordDetail.trailer.trailerCarOwnerName}}</span>
											<span class="tit">公司经营证号：{{transportRecordDetail.trailer.trailerBusinessLicenseNo}}</span>
											<span class="tit">建档日期：{{transportRecordDetail.trailer.archiveTime | getdatefromtimestamp(true)}}</span>
										</td>
									</tr>
									<tr>
										<td width="80">车牌号码</td>
										<td>{{transportRecordDetail.trailer.trailerPlateNo}}</td>
										<td width="80">核载质量</td>
										<td width="100">{{transportRecordDetail.trailer.trailerTractiveTonnage}}</td>
										<td rowspan="6">
											<p>内部编号：{{transportRecordDetail.trailer.trailerCode}}</p>
											<img width="240" height="180" :src="imgUrl + transportRecordDetail.trailer.trailerTruckFrontPic"/>
										</td>
									</tr>
									<tr>
										<td>品牌型号</td>
										<td>{{transportRecordDetail.trailer.trailerCarBrandModel}}</td>
										<td>总质量</td>
										<td>{{transportRecordDetail.trailer.trailerTotalWeight}}</td> 
									</tr>
									<tr>
										<td>车架号</td>
										<td>{{transportRecordDetail.trailer.trailerVehicleFrameNO}}</td>
										<td>发动机号</td>
										<td>{{transportRecordDetail.trailer.trailerEngineNO}}</td>
									</tr>
									<tr>
										<td>注册日期</td>
										<td>{{transportRecordDetail.trailer.trailerDriverLicRegisterTime | getdatefromtimestamp(true)}}</td>
										<td>车辆类型</td>
										<td>{{transportRecordDetail.trailer.trailerTruckType}}</td>
									</tr>
									<tr>
										<td>使用性质</td>
										<td>{{transportRecordDetail.trailer.trailerBusinessNature}}</td>
										<td>经营类别</td>
										<td>{{transportRecordDetail.trailer.trailerBusinessScope}}</td>
									</tr>
									<tr>
										<td>道路运输证号</td>
										<td>{{transportRecordDetail.trailer.trailerRoadTransportNo}}</td>
										<td>有效期限</td>
										<td>{{transportRecordDetail.trailer.trailerRoadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</td>
									</tr>
									<tr v-if="transportRecordDetail.trailer.trailerDriverLicPic || transportRecordDetail.trailer.trailerRoadTransportSidePic">
										<td colspan="5" >
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.trailer.trailerDriverLicPic" :src="imgUrl + transportRecordDetail.trailer.trailerDriverLicPic"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.trailer.trailerRoadTransportSidePic" :src="imgUrl + transportRecordDetail.trailer.trailerRoadTransportSidePic"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr v-if="transportRecordDetail.trailer.trailerRoadTransportPic || transportRecordDetail.trailer.trailerRoadTransportSidePic">
										<td colspan="5" >
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.trailer.trailerRoadTransportPic" :src="imgUrl + transportRecordDetail.trailer.trailerRoadTransportPic"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.trailer.trailerRoadTransportSidePic" :src="imgUrl + transportRecordDetail.trailer.trailerRoadTransportSidePic"/>
												</el-col>
											</el-row>
										</td>
									</tr>
								</table>
							</el-col>
						</el-row>
						<el-row style="margin-top: 20px">
							<el-col>
								<h3 class="text-center">危险物品运输单位备案（危险物品运输驾驶员基本信息表）</h3>
								<table class="common-table">
									<tr>
										<td colspan="7">
											<span class="tit">单位：{{transportRecordDetail.staff.companyName}}</span>
											<span class="tit">公司经营证号：{{transportRecordDetail.staff.businessLicNo}}</span>
											<span class="tit">建档日期：{{transportRecordDetail.staff.archiveTime | getdatefromtimestamp(true)}}</span>
										</td>
									</tr>
									<tr>
										<td width="100">姓名</td>
										<td>{{transportRecordDetail.staff.realName}}</td>
										<td width="80">性别</td>
										<td>{{transportRecordDetail.staff.sex=="M"?'男':'女'}}</td>
										<td>联系电话</td>
										<td>{{transportRecordDetail.staff.mobile}}</td>
										<td>照片</td>
									</tr>
									<tr>
										<td>身份证号</td>
										<td colspan="3">{{transportRecordDetail.staff.idCardNum}}</td>
										<td>准驾车型</td>
										<td>{{transportRecordDetail.staff.quasiDrivingType}}</td>
										<td rowspan="5">
											<P>车辆：{{transportRecordDetail.truck.plateNo}}</P>
											<img v-if="transportRecordDetail.staff.headPic" width="120" height="150" :src="imgUrl + transportRecordDetail.staff.headPic"/>
										</td>
									</tr>
									<tr>
										<td>从业资格证号</td>
										<td colspan="3">{{transportRecordDetail.staff.qualificationCode}}</td>
										<td>资格证编号</td>
										<td>{{transportRecordDetail.staff.qualificationNum}}</td>
									</tr>
									<tr>
										<td>从业资格类别</td>
										<td colspan="5">{{transportRecordDetail.staff.qualificationType}}</td>
									</tr>
									<tr>
										<td>从业资格证有效期至</td>
										<td colspan="5" v-if="transportRecordDetail.staff.qualificationExpirationTime">{{transportRecordDetail.staff.qualificationExpirationTime | getdatefromtimestamp(true)}}</td>
										<td colspan="5" v-else></td>
									</tr>
									<tr>
										<td>居住地</td>
										<td colspan="5">{{transportRecordDetail.staff.homeAddress}}</td>
									</tr>
									<tr v-if="transportRecordDetail.staff.driverLicFrontUrl||transportRecordDetail.staff.driverLicBackUrl">
										<td colspan="7">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.staff.driverLicFrontUrl" :src="imgUrl + transportRecordDetail.staff.driverLicFrontUrl"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.staff.driverLicBackUrl" :src="imgUrl + transportRecordDetail.staff.driverLicBackUrl"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr v-if="transportRecordDetail.staff.idCardFrontUrl|| transportRecordDetail.staff.idCardBackUrl">
										<td colspan="7">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.staff.idCardFrontUrl" :src="imgUrl + transportRecordDetail.staff.idCardFrontUrl"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.staff.idCardBackUrl" :src="imgUrl + transportRecordDetail.staff.idCardBackUrl"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr v-if="transportRecordDetail.staff.qualificationFirstPage || transportRecordDetail.staff.qualificationSecondPage">
										<td colspan="7">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.staff.qualificationFirstPage" :src="imgUrl + transportRecordDetail.staff.qualificationFirstPage"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail.staff.qualificationSecondPage" :src="imgUrl + transportRecordDetail.staff.qualificationSecondPage"/>
												</el-col>
											</el-row>
										</td>
									</tr>
								</table>
							</el-col>
						</el-row>
					</div>
					<div class="common-table-footer">
						<el-button @click="back">返回</el-button>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script type="text/javascript">
import ImageUpload from '../../CommonComponents/ImageUpload'
import { getdatefromtimestamp,deleteConfirm } from '../../../common/utils'
import TransportRecord from '../../../api/TransportRecord'
import RegisterForm from '../components/RegisterForm'
export default {
	data() {
		return {
			tabSelected: 'first',
			transportRecordDetail: {
				staff: {},
				trailer: {},
				truck: {}
			},
		}
	},
	created() {
		this.getRecordDetail()
	},
	methods: {
		// 获取运输单位备案
		getRecordDetail() {
			let transportRecordID = this.$route.query.transportRecordID
			TransportRecord.findRecordDetailById({ transportRecordID }).then(res => {
				this.transportRecordDetail = res
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload,
		RegisterForm
	}
}
</script>
<style lang="stylus" scoped>

</style>