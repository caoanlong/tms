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
									<el-radio-group v-model="transportRecordDetail.propertyType" disabled>
										<el-radio :label="1">单位</el-radio>
										<el-radio :label="2">个人</el-radio>
										<el-radio :label="3">挂靠</el-radio>
									</el-radio-group>
								</td>
								<td>经营性质</td>
								<td>
									<el-radio-group v-model="transportRecordDetail.businessNature" disabled>
										<el-radio :label="1">营运</el-radio>
										<el-radio :label="2">自用</el-radio>
									</el-radio-group>
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
								<td colspan="3">{{transportRecordDetail.driverLicExamineBeginTime | getdatefromtimestamp(true) }}--{{transportRecordDetail.driverLicExamineEndTime | getdatefromtimestamp(true) }}</td>
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
									<img width="200" height="150" :src="transportRecordDetail.truckFrontPic"/>
									<img width="200" height="150" :src="transportRecordDetail.truckSidePic1"/>
									<img width="200" height="150" :src="transportRecordDetail.truckSidePic2"/>
								</td>
							</tr>
							<!-- <tr v-if="trafficList.length>1"> -->
							<tr>
								<td :rowspan="trafficList.length + 1">车辆交通违法及事故情况</td>
								<td>时间</td>
								<td>地点</td>
								<td>驾驶人</td>
								<td colspan="2">交通违法行为或事故简要描述</td>
								<td>处理情况</td>
							</tr>
							<tr v-for="traffic in trafficList" :key="traffic.occurredTime">
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
						<el-button type="primary" @click="edit" v-if="trafficList.length>1">修改记录</el-button>
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
											<span class="tit">车辆所有人：云南安化中达物流有限责任公司</span>
											<span class="tit">公司经营证号：530181000690</span>
											<span class="tit">建档日期：2016年5月25日</span>
										</td>
									</tr>
									<tr>
										<td width="80">车牌号码</td>
										<td>云AF8532</td>
										<td width="80">核载质量</td>
										<td width="100">9900kg</td>
										<td rowspan="6">
											<img width="240" height="180" src="http://f11.baidu.com/it/u=2588434687,3162842634&fm=72"/>
											<!-- <ImageUpload :width="200" :height="160"/> -->
										</td>
									</tr>
									<tr>
										<td>品牌型号</td>
										<td>程力威牌CLW516XQYD4</td>
										<td>总质量</td>
										<td>16000kg</td>
									</tr>
									<tr>
										<td>车架号</td>
										<td>LGAX2A131F1014903</td>
										<td>发动机号</td>
										<td>78206803</td>
									</tr>
									<tr>
										<td>注册日期</td>
										<td>2015年7月30日</td>
										<td>车辆类型</td>
										<td>重型厢式货车</td>
									</tr>
									<tr>
										<td>使用性质</td>
										<td>危化品运输</td>
										<td>经营类别</td>
										<td>危货运输（1类1项）</td>
									</tr>
									<tr>
										<td>道路运输证号</td>
										<td>安宁字530181014786</td>
										<td>有效期限</td>
										<td>2016年7月</td>
									</tr>
									<tr>
										<td colspan="5">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" src="../../assets/imgs/QQ截图20180316100511.png"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" src="../../assets/imgs/QQ截图20180316100522.png"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr>
										<td colspan="5">
											<el-row>
												<el-col>
													<img src="../../assets/imgs/QQ截图20180316100532.png"/>
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
											<span class="tit">单位：云南安化中达物流有限责任公司</span>
											<span class="tit">公司经营证号：530181000690</span>
											<span class="tit">建档日期：2016年5月25日</span>
										</td>
									</tr>
									<tr>
										<td width="100">姓名</td>
										<td>张军</td>
										<td width="80">性别</td>
										<td>男</td>
										<td>联系电话</td>
										<td>13888129549</td>
										<td>照片</td>
									</tr>
									<tr>
										<td>身份证号</td>
										<td colspan="3">530113197108260019</td>
										<td>准驾车型</td>
										<td>A1A2E</td>
										<td rowspan="5">
											<img width="120" height="150" src="../../assets/imgs/00.png"/>
										</td>
									</tr>
									<tr>
										<td>从业资格证号</td>
										<td colspan="3">530113197108260019</td>
										<td>资格证编号</td>
										<td>NO.5300313469</td>
									</tr>
									<tr>
										<td>从业资格类别</td>
										<td colspan="5">道路危险物品运输驾驶员；道路危险物品运输押运人员；经营性道路货物运输驾驶员</td>
									</tr>
									<tr>
										<td>从业资格证有效期至</td>
										<td colspan="5">2021-06-03</td>
									</tr>
									<tr>
										<td>居住地</td>
										<td colspan="5">昆明市东川区新村路47号一栋一单元402室</td>
									</tr>
									<tr>
										<td colspan="7">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" src="../../assets/imgs/01.png"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" src="../../assets/imgs/02.png"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr>
										<td colspan="7">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" src="../../assets/imgs/03.png"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" src="../../assets/imgs/04.png"/>
												</el-col>
											</el-row>
										</td>
									</tr>
									<tr>
										<td colspan="7">
											<el-row>
												<el-col :span="12">
													<img width="240" height="180" src="../../assets/imgs/05.png"/>
												</el-col>
												<el-col :span="12">
													<img width="240" height="180" src="../../assets/imgs/06.png"/>
												</el-col>
											</el-row>
										</td>
									</tr>
								</table>
							</el-col>
						</el-row>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<el-dialog title="添加记录" width="45%" :visible.sync="isShowAddDialog">
			<el-form label-width="120px">
				<el-form-item label="时间">
					<el-date-picker style="width: 100%"  v-model="traffic.occurredTime" value-format="timestamp" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="地区">
					<el-cascader style="width: 100%" :options="distData" v-model="selectedArea" @change="handleSelectedArea">
					</el-cascader>
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
					<el-cascader style="width: 100%" :options="distData" v-model="selectedArea" @change="handleSelectedArea">
					</el-cascader>
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
				<el-table-column property="transportRecordDetail.realName" label="驾驶人"></el-table-column>
				<el-table-column property="transportRecordDetail.endorseDesc" label="交通违法行为或事故简要描述"></el-table-column>
				<el-table-column property="transportRecordDetail.handleResult" label="处理情况"></el-table-column>
				<el-table-column label="操作" align="center" width="230">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" @click="update(scope.row)">编辑</el-button>
						<el-button size="mini" icon="el-icon-delete" @click="del(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import { regionData } from 'element-china-area-data'
	import ImageUpload from '../CommonComponents/ImageUpload'
	import { getdatefromtimestamp } from '../../common/utils'
	import request from "../../common/request"
	export default {
		data() {
			return {
				distData: regionData,
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
				transportRecordDetail:[],
				traffic: {
					occurredTime: '',
					areaID: '',
					detailAddress: '',
					endorseDesc: '',
					handleResult: ''
				},
				trafficList: []
			}
		},
		created() {
			this.getDetail(),
			this.getTrafficList()
		},
		methods: {
			getDetail() {
				let params = {
					transportRecordID:this.$route.query.transportRecordID
				}
				request({
					url: '/transportRecord/detail',
					params
				}).then(res => {
					console.log(res.data.data)
					this.transportRecordDetail = res.data.data
				})
			},
			getTrafficList(){
				let params = {
					transportRecordID:this.$route.query.transportRecordID
				}
				request({
					url: '/truck/endorsement/findList',
					params
				}).then(res => {
					console.log(res.data.data)
					let areaID = String(res.data.data.areaID)
					this.selectedArea = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
					this.trafficList = res.data.data
				})
			},
			handleSelectedArea(data) {
				this.traffic.areaID = data[data.length-1]
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
				this.isShowEditDialog = true
			},
			addTraffic() {
				let data = {
					transportRecordID:this.$route.query.transportRecordID,
					occurredTime:this.traffic.occurredTime,
					areaID:this.traffic.areaID,
					detailAddress:this.traffic.detailAddress,
					endorseDesc:this.traffic.endorseDesc,
					handleResult:this.traffic.handleResult
				}
				console.log(data)
				request({
					url: '/truck/endorsement/add',
					data,
					method: 'post',
				}).then(res => {
					Message.success('添加记录成功！')
					this.isShowAddDialog = false
					this.getTrafficList()
				})			
			},
			updataTraffic() {
				let data = {
					transportRecordID:this.$route.query.transportRecordID,
					occurredTime:this.traffic.occurredTime,
					areaID:this.traffic.areaID,
					detailAddress:this.traffic.detailAddress,
					endorseDesc:this.traffic.endorseDesc,
					handleResult:this.traffic.handleResult
				}
				console.log(data)
				request({
					url: '/truck/endorsement/update',
					data,
					method: 'post',
				}).then(res => {
					Message.success('修改记录成功！')
					this.isShowEditDialog = false
					this.getTrafficList()
				})			
			},
			del(i) {
				this.trafficList.splice(i, 1)
			},
			back() {
				this.$router.go(-1)
			}
		},
		components: {
			ImageUpload
		}
	}
</script>
<style lang="stylus" scoped>

</style>