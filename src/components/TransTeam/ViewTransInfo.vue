<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">运输档案详情</div>
			<el-tabs v-model="tabSelected" type="card">
				<el-tab-pane label="危货运输登记表" name="first">
					<div id="dangerObjList">
						<h2 class="text-center">昆明市危货运输户籍化管理登记表</h2>
						<table class="common-table">
							<tr>
								<td rowspan="8" width="50"><p style="width: 1em">车辆基础信息</p></td>
								<td width="100">车牌号码</td>
								<td>{{transportRecordDetail.plateNo}}</td>
								<td>厂牌型号</td>
								<td width="120"><p>{{transportRecordDetail.manufacturer}}</p><p>{{transportRecordDetail.carBrandModel}}</p>

								</td>
								<td width="50">核载人数</td>
								<td>{{transportRecordDetail.personsCapacity}}人</td>
							</tr>
							<tr>
								<td>注册登记日期</td>
								<td>{{transportRecordDetail.driverLicRegisterTime | getdatefromtimestamp(true) }}</td>
								<td>检验有效期止</td>
								<td>{{transportRecordDetail.driverLicExamineExpires | getdatefromtimestamp(true) }}</td>
								<td>车身颜色</td>
								<td>{{transportRecordDetail.carBodyColor}}</td>
							</tr>
							<tr>
								<td>所有权归属</td>
								<td colspan="3">
									<span v-if="transportRecordDetail.trailerPropertyType=='单位'">单位</span>
									<span v-else-if="transportRecordDetail.trailerPropertyType=='个人'">个人</span>
									<span v-else>挂靠</span>
								</td>
								<td>经营性质</td>
								<td>
									<span v-if="transportRecordDetail.businessNature=='营运'">营运</span>
									<span v-else>自用</span>
								</td>
							</tr>
							<tr>
								<td>车辆所有人姓名或单位名称</td>
								<td colspan="3">{{transportRecordDetail.carOwnerName}}</td>
								<td>联系电话</td>
								<td>{{transportRecordDetail.carOwnerMobile}}</td>
							</tr>
							<tr>
								<td>实际车主姓名</td>
								<td colspan="3">{{transportRecordDetail.curDriverName}}</td>
								<td>联系电话</td>
								<td>{{transportRecordDetail.curDriverMobile}}</td>
							</tr>
							<tr>
								<td colspan="5">是否喷涂“严禁超员，核载X人”</td>
								<td>{{transportRecordDetail.hasWarnMark=='Y'?'是':'否'}}</td>
							</tr>
							<tr>
								<td>登记地址</td>
								<td colspan="5">{{transportRecordDetail.carOwnerAddress}}</td>
							</tr>
							<tr>
								<td>现住址</td>
								<td colspan="5">{{transportRecordDetail.curDriverAddress}}</td>
							</tr>
							<tr>
								<td rowspan="4"><p style="width: 1em">驾驶人基础信息</p></td>
								<td>驾驶人姓名</td>
								<td>{{transportRecordDetail.realName}}</td>
								<td>性别</td>
								<td>{{transportRecordDetail.sex=="M"?'男':'女'}}</td>
								<td>准驾车型</td>
								<td>{{transportRecordDetail.quasiDrivingType}}</td>
							</tr>
							<tr>
								<td>身份证号</td>
								<td colspan="3">{{transportRecordDetail.idCardNum}}</td>
								<td>档案编号</td>
								<td>{{transportRecordDetail.driverLicenseCode}}</td>
							</tr>
							<tr>
								<td>驾驶证审验有效起止</td>
								<td colspan="3">
									<span v-if="transportRecordDetail.driverLicExamineBeginTime">{{transportRecordDetail.driverLicExamineBeginTime | getdatefromtimestamp(true) }}--{{transportRecordDetail.driverLicExamineEndTime | getdatefromtimestamp(true) }}</span>
								</td>
								<td>联系电话</td>
								<td>{{transportRecordDetail.mobile}}</td>
							</tr>
							<tr>
								<td>现住址</td>
								<td colspan="5">{{transportRecordDetail.homeAddress}}</td>
							</tr>
							<tr>
								<td><p style="width: 1em">车辆照片</p></td>
								<td colspan="6">
									<img v-if="transportRecordDetail.truckFrontPic" width="200" height="150" :src="imgUrl + transportRecordDetail.truckFrontPic"/>
									<img v-if="transportRecordDetail.truckSidePic1" width="200" height="150" :src="imgUrl + transportRecordDetail.truckSidePic1"/>
									<img v-if="transportRecordDetail.truckSidePic2" width="200" height="150" :src="imgUrl + transportRecordDetail.truckSidePic2"/>
								</td>
							</tr>
							<tr>
								<td :rowspan="trafficList.length > 0 ? (trafficList.length + 1) : (trafficList.length + 2)">车辆交通违法及事故情况</td>
								<td>时间</td>
								<td>地点</td>
								<td>驾驶人</td>
								<td colspan="2">交通违法行为或事故简要描述</td>
								<td>处理情况</td>
							</tr>
							<tr v-for="traffic in trafficList" :key="traffic.endorsementID">
								<td>{{traffic.occurredTime | getdatefromtimestamp(true)}}</td>
								<td>{{traffic.areaName + traffic.detailAddress}}</td>
								<td>{{transportRecordDetail.realName}}</td>
								<td colspan="2">{{traffic.endorseDesc}}</td>
								<td>{{traffic.handleResult}}</td>
							</tr>
							<tr v-if="trafficList.length<1">
								<td colspan="6">暂无记录</td>
							</tr>
						</table>
					</div>
					<div class="common-table-footer">
						<el-button type="success" @click="add">添加记录</el-button>
						<el-button type="primary" @click="edit" v-if="trafficList.length > 0">修改记录</el-button>
						<el-button @click="back">返回</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="运输单位备案" name="second">
					<div id="transUnitList">
						<el-row>
							<el-col>
								<h3 class="text-center">危险物品运输单位备案（危险物品运输车辆基本信息表）</h3>
								<table class="common-table">
									<tr>
										<td colspan="5">
											<span class="tit">车辆所有人：{{transportRecordDetail2.truck.carOwnerName}}</span>
											<span class="tit">公司经营证号：{{transportRecordDetail2.truck.businessLicenseNo}}</span>
											<span class="tit">建档日期：{{transportRecordDetail2.truck.archiveTime | getdatefromtimestamp(true)}}</span>
										</td>
									</tr>
									<tr>
										<td width="80">车牌号码</td>
										<td>{{transportRecordDetail2.truck.plateNo}}</td>
										<td width="80">核载质量</td>
										<td width="100">{{transportRecordDetail2.truck.tractiveTonnage}}</td>
										<td rowspan="6">
											<p>内部编号：{{transportRecordDetail2.truck.code}}</p>
											<img width="240" height="180" v-if="transportRecordDetail2.truck.truckFrontPic" :src="imgUrl + transportRecordDetail2.truck.truckFrontPic"/>
										</td>
									</tr>
									<tr>
										<td>品牌型号</td>
										<td>{{transportRecordDetail2.truck.carBrandModel}}</td>
										<td>总质量</td>
										<td>{{transportRecordDetail2.truck.totalWeight}}</td> 
									</tr>
									<tr>
										<td>车架号</td>
										<td>{{transportRecordDetail2.truck.vehicleFrameNO}}</td>
										<td>发动机号</td>
										<td>{{transportRecordDetail2.truck.engineNO}}</td>
									</tr>
									<tr>
										<td>注册日期</td>
										<td>{{transportRecordDetail2.truck.driverLicRegisterTime | getdatefromtimestamp(true)}}</td>
										<td>车辆类型</td>
										<td>{{transportRecordDetail2.truck.truckType}}</td>
									</tr>
									<tr>
										<td>使用性质</td>
										<td>{{transportRecordDetail2.truck.businessNature}}</td>
										<td>经营类别</td>
										<td>{{transportRecordDetail2.truck.businessScope}}</td>
									</tr>
									<tr>
										<td>道路运输证号</td>
										<td>{{transportRecordDetail2.truck.roadTransportNo}}</td>
										<td>有效期限</td>
										<td>{{transportRecordDetail2.truck.roadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</td>
									</tr>
									<tr v-if="transportRecordDetail2.truck.driverLicPic||transportRecordDetail2.truck.driverLicSidePic">
										<td colspan="5">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.truck.driverLicPic" :src="imgUrl + transportRecordDetail2.truck.driverLicPic"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.truck.driverLicSidePic" :src="imgUrl + transportRecordDetail2.truck.driverLicSidePic"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr v-if="transportRecordDetail2.truck.roadTransportPic || transportRecordDetail2.truck.roadTransportSidePic">
										<td colspan="5">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.truck.roadTransportPic" :src="imgUrl + transportRecordDetail2.truck.roadTransportPic"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.truck.roadTransportSidePic" :src="imgUrl + transportRecordDetail2.truck.roadTransportSidePic"/>
												</el-col>
											</el-row>
										</td>
									</tr>
								</table>
							</el-col>
						</el-row>
						<el-row v-if="transportRecordDetail2.trailer.trailerPlateNo">
							<el-col>
								<h3 class="text-center">危险物品运输单位备案（危险物品运输车辆基本信息表）</h3>
								<table class="common-table">
									<tr>
										<td colspan="5">
											<span class="tit">车辆所有人：{{transportRecordDetail2.trailer.trailerCarOwnerName}}</span>
											<span class="tit">公司经营证号：{{transportRecordDetail2.trailer.trailerBusinessLicenseNo}}</span>
											<span class="tit">建档日期：{{transportRecordDetail2.trailer.archiveTime | getdatefromtimestamp(true)}}</span>
										</td>
									</tr>
									<tr>
										<td width="80">车牌号码</td>
										<td>{{transportRecordDetail2.trailer.trailerPlateNo}}</td>
										<td width="80">核载质量</td>
										<td width="100">{{transportRecordDetail2.trailer.trailerTractiveTonnage}}</td>
										<td rowspan="6">
											<p>内部编号：{{transportRecordDetail2.trailer.trailerCode}}</p>
											<img width="240" height="180" :src="imgUrl + transportRecordDetail2.trailer.trailerTruckFrontPic"/>
										</td>
									</tr>
									<tr>
										<td>品牌型号</td>
										<td>{{transportRecordDetail2.trailer.trailerCarBrandModel}}</td>
										<td>总质量</td>
										<td>{{transportRecordDetail2.trailer.trailerTotalWeight}}</td> 
									</tr>
									<tr>
										<td>车架号</td>
										<td>{{transportRecordDetail2.trailer.trailerVehicleFrameNO}}</td>
										<td>发动机号</td>
										<td>{{transportRecordDetail2.trailer.trailerEngineNO}}</td>
									</tr>
									<tr>
										<td>注册日期</td>
										<td>{{transportRecordDetail2.trailer.trailerDriverLicRegisterTime | getdatefromtimestamp(true)}}</td>
										<td>车辆类型</td>
										<td>{{transportRecordDetail2.trailer.trailerTruckType}}</td>
									</tr>
									<tr>
										<td>使用性质</td>
										<td>{{transportRecordDetail2.trailer.trailerBusinessNature}}</td>
										<td>经营类别</td>
										<td>{{transportRecordDetail2.trailer.trailerBusinessScope}}</td>
									</tr>
									<tr>
										<td>道路运输证号</td>
										<td>{{transportRecordDetail2.trailer.trailerRoadTransportNo}}</td>
										<td>有效期限</td>
										<td>{{transportRecordDetail2.trailer.trailerRoadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</td>
									</tr>
									<tr v-if="transportRecordDetail2.trailer.trailerDriverLicPic || transportRecordDetail2.trailer.trailerRoadTransportSidePic">
										<td colspan="5" >
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.trailer.trailerDriverLicPic" :src="imgUrl + transportRecordDetail2.trailer.trailerDriverLicPic"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.trailer.trailerRoadTransportSidePic" :src="imgUrl + transportRecordDetail2.trailer.trailerRoadTransportSidePic"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr v-if="transportRecordDetail2.trailer.trailerRoadTransportPic || transportRecordDetail2.trailer.trailerRoadTransportSidePic">
										<td colspan="5" >
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.trailer.trailerRoadTransportPic" :src="imgUrl + transportRecordDetail2.trailer.trailerRoadTransportPic"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.trailer.trailerRoadTransportSidePic" :src="imgUrl + transportRecordDetail2.trailer.trailerRoadTransportSidePic"/>
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
											<span class="tit">单位：{{transportRecordDetail2.staff.companyName}}</span>
											<span class="tit">公司经营证号：{{transportRecordDetail2.staff.businessLicNo}}</span>
											<span class="tit">建档日期：{{transportRecordDetail2.staff.archiveTime | getdatefromtimestamp(true)}}</span>
										</td>
									</tr>
									<tr>
										<td width="100">姓名</td>
										<td>{{transportRecordDetail2.staff.realName}}</td>
										<td width="80">性别</td>
										<td>{{transportRecordDetail2.staff.sex=="M"?'男':'女'}}</td>
										<td>联系电话</td>
										<td>{{transportRecordDetail2.staff.mobile}}</td>
										<td>照片</td>
									</tr>
									<tr>
										<td>身份证号</td>
										<td colspan="3">{{transportRecordDetail2.staff.idCardNum}}</td>
										<td>准驾车型</td>
										<td>{{transportRecordDetail2.staff.quasiDrivingType}}</td>
										<td rowspan="5">
											<P>车辆：{{transportRecordDetail2.truck.plateNo}}</P>
											<img v-if="transportRecordDetail2.staff.headPic" width="120" height="150" :src="imgUrl + transportRecordDetail2.staff.headPic"/>
										</td>
									</tr>
									<tr>
										<td>从业资格证号</td>
										<td colspan="3">{{transportRecordDetail2.staff.qualificationCode}}</td>
										<td>资格证编号</td>
										<td>{{transportRecordDetail2.staff.qualificationNum}}</td>
									</tr>
									<tr>
										<td>从业资格类别</td>
										<td colspan="5">{{transportRecordDetail2.staff.qualificationType}}</td>
									</tr>
									<tr>
										<td>从业资格证有效期至</td>
										<td colspan="5" v-if="transportRecordDetail2.staff.qualificationExpirationTime">{{transportRecordDetail2.staff.qualificationExpirationTime | getdatefromtimestamp(true)}}</td>
										<td colspan="5" v-else></td>
									</tr>
									<tr>
										<td>居住地</td>
										<td colspan="5">{{transportRecordDetail2.staff.homeAddress}}</td>
									</tr>
									<tr v-if="transportRecordDetail2.staff.driverLicFrontUrl||transportRecordDetail2.staff.driverLicBackUrl">
										<td colspan="7">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.staff.driverLicFrontUrl" :src="imgUrl + transportRecordDetail2.staff.driverLicFrontUrl"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.staff.driverLicBackUrl" :src="imgUrl + transportRecordDetail2.staff.driverLicBackUrl"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr v-if="transportRecordDetail2.staff.idCardFrontUrl|| transportRecordDetail2.staff.idCardBackUrl">
										<td colspan="7">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.staff.idCardFrontUrl" :src="imgUrl + transportRecordDetail2.staff.idCardFrontUrl"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.staff.idCardBackUrl" :src="imgUrl + transportRecordDetail2.staff.idCardBackUrl"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr v-if="transportRecordDetail2.staff.qualificationFirstPage || transportRecordDetail2.staff.qualificationSecondPage">
										<td colspan="7">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.staff.qualificationFirstPage" :src="imgUrl + transportRecordDetail2.staff.qualificationFirstPage"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" v-if="transportRecordDetail2.staff.qualificationSecondPage" :src="imgUrl + transportRecordDetail2.staff.qualificationSecondPage"/>
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
		<el-dialog title="添加记录" width="45%" :visible.sync="isShowAddDialog">
			<el-form label-width="120px" :model="traffic" :rules="rules" ref="ruleForm" size="mini">
				<el-form-item label="时间" prop="occurredTime">
					<el-date-picker style="width: 100%"  v-model="traffic.occurredTime" value-format="timestamp" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="地区" prop="areaID">
					<DistPicker @selectChange="handleSelectedArea"/>
				</el-form-item>
				<el-form-item label="详细地址" prop="detailAddress">
					<el-input v-model="traffic.detailAddress"></el-input>
				</el-form-item>
				<el-form-item label="驾驶人">
					<el-input v-model="transportRecordDetail.realName" disabled></el-input>
				</el-form-item>
				<el-form-item label="违法行为描述" prop="endorseDesc">
					<el-input type="textarea" v-model="traffic.endorseDesc" resize="none"></el-input>
				</el-form-item>
				<el-form-item label="处理情况" prop="handleResult">
					<el-input type="textarea" v-model="traffic.handleResult" resize="none"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShowAddDialog = false">取 消</el-button>
				<el-button type="primary" @click="addTraffic">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改记录" width="45%" :visible.sync="isShowEditDialog">
			<el-form label-width="120px">
				<el-form-item label="时间">
					<el-date-picker style="width: 100%"  v-model="traffic.occurredTime" value-format="timestamp" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="地区">
					<DistPicker @selectChange="handleSelectedArea"/>
				</el-form-item>
				<el-form-item label="详细地址">
					<el-input v-model="traffic.detailAddress"></el-input>
				</el-form-item>
				<el-form-item label="驾驶人">
					<el-input v-model="transportRecordDetail.realName" disabled></el-input>
				</el-form-item>
				<el-form-item label="违法行为描述">
					<el-input type="textarea" v-model="traffic.endorseDesc" resize="none"></el-input>
				</el-form-item>
				<el-form-item label="处理情况">
					<el-input type="textarea" v-model="traffic.handleResult" resize="none"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShowEditDialog = false">取 消</el-button>
				<el-button type="primary" @click="updataTraffic">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="记录列表" width="60%" :visible.sync="isShowListDialog">
			<el-table :data="trafficList">
				<el-table-column property="occurredTime" label="时间" width="120">
					<template slot-scope="scope">
						<span>{{scope.row.occurredTime | getdatefromtimestamp(true)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="地点">
					<template slot-scope="scope">
						<span>{{scope.row.areaName + scope.row.detailAddress}}</span>
					</template>
				</el-table-column>
				<el-table-column label="驾驶人" width="100">
					<template slot-scope="scope">
						<span>{{transportRecordDetail.realName}}</span>
					</template>
				</el-table-column>
				<el-table-column label="交通违法行为或事故简要描述" prop="endorseDesc"></el-table-column>
				<el-table-column label="处理情况" prop="handleResult"></el-table-column>
				<el-table-column label="操作" align="center" width="230">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" @click="update(scope.row)">编辑</el-button>
						<el-button size="mini" icon="el-icon-delete" @click="del(scope.row.endorsementID)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import DistPicker from '../CommonComponents/DistPicker'
	import ImageUpload from '../CommonComponents/ImageUpload'
	import { getdatefromtimestamp } from '../../common/utils'
	import request from "../../common/request"
	import TransportRecord from '../../api/TransportRecord'
	import Truck from '../../api/Truck'
	import { deleteConfirm } from '../../common/utils'
	export default {
		data() {
			return {
				tabSelected: 'first',
				ownership: 1,
				buisnessNature: 1,
				isShowAddDialog: false,
				isShowListDialog: false,
				isShowEditDialog: false,
				selectedArea: [],
				selectedDate: '',
				areaProps: {
					label: 'label',
					value: 'label'
				},
				transportRecordDetail: {},
				transportRecordDetail2: {
					staff: {},
					trailer: {},
					truck: {}
				},
				traffic: {
					occurredTime: '',
					areaID: '',
					detailAddress: '',
					endorseDesc: '',
					handleResult: ''
				},
				trafficList: [],
				rules: {
					occurredTime: [
						{required: true, message: '请选择时间', trigger: 'blur'}
					],
					areaID: [
						{ required: true, message: '请选择地区', trigger: 'change' }
					],
					detailAddress: [
						{required: true, message: '请输入详细地址', trigger: 'blur'}
					],
					endorseDesc: [
						{required: true, message: '请输入违法行为描述', trigger: 'blur'}
					],
					handleResult: [
						{required: true, message: '请输入处理情况', trigger: 'blur'}
					]
				}
			}
		},
		created() {
			this.getDetail()
			this.getTrafficList()
			this.getRecordDetail()
		},
		methods: {
			// 获取运输登记表
			getDetail() {
				let transportRecordID =this.$route.query.transportRecordID
				TransportRecord.findById({ transportRecordID }).then(res => {

					this.transportRecordDetail = res
				})
			},
			getTrafficList() {
				let transportRecordID =this.$route.query.transportRecordID
				Truck.findEndorsements({ transportRecordID }).then(res => {
					let areaID = String(res.areaID)
					this.selectedArea = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
					this.trafficList = res
				})
			},
			handleSelectedArea(data) {
				this.traffic.areaID = data
			},
			add() {
				this.traffic = {
					occurredTime: '',
					areaID: '',
					detailAddress: '',
					endorseDesc: '',
					handleResult: ''
				}
				this.isShowAddDialog = true
			},
			edit() {
				this.isShowListDialog = true
			},
			update(obj) {
				this.traffic = obj
				this.selectedArea = [(String(obj.areaID).substr(0,2) + '0000'), (String(obj.areaID).substr(0,4) + '00'), obj.areaID]
				this.isShowEditDialog = true
			},
			// 添加记录
			addTraffic() {
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						Truck.addEndorsement({
							transportRecordID:this.$route.query.transportRecordID,
							occurredTime:this.traffic.occurredTime,
							areaID:this.traffic.areaID,
							detailAddress:this.traffic.detailAddress,
							endorseDesc:this.traffic.endorseDesc,
							handleResult:this.traffic.handleResult
						}).then(res => {
							Message.success('保存成功！')
							this.isShowAddDialog = false
							this.getTrafficList()
						})
					} else {
						return
					}
				})
			},
			updataTraffic() {
				Truck.updateEndorsement({
					endorsementID: this.traffic.endorsementID,
					transportRecordID: this.$route.query.transportRecordID,
					occurredTime: this.traffic.occurredTime,
					areaID: this.traffic.areaID,
					detailAddress: this.traffic.detailAddress,
					endorseDesc: this.traffic.endorseDesc,
					handleResult: this.traffic.handleResult
				}).then(res => {
					Message.success('保存成功！')
					this.isShowEditDialog = false
					this.isShowListDialog = false
					this.getTrafficList()
				})
			},
			del(endorsementID) {
				deleteConfirm(endorsementID, endorsementIDs => {
					Truck.deleteEndorsement({ endorsementIDs }).then(res => {
						Message({ type: 'success', message: '删除成功!' })
						this.getTrafficList()
						this.isShowEditDialog = false
						this.isShowListDialog = false
					})
				}, this.selectedList)
			},
			
			// 获取运输单位备案
			getRecordDetail() {
				let transportRecordID = this.$route.query.transportRecordID
				TransportRecord.findRecordDetailById({ transportRecordID }).then(res => {
					console.log(res)
					this.transportRecordDetail2 = res
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

</style>