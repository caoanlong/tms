<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑车辆</div>
			<el-form label-width="155px" size="mini">
				<el-row>
					<el-col :span="6">
						<el-form-item label="状态">
							<el-select style="width: 100%" v-model="truck.status" placeholder="请选择">
								<el-option label="通过" value="通过"></el-option>
								<el-option label="未通过" value="未通过"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核人">
							<el-input v-model="truck.auditor"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核日期">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.auditorDate"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所属地区">
							<el-cascader
								style="width: 100%"
								:options="distData"
								v-model="truck.area">
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所属企业">
							<el-input v-model="truck.company"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="自编号">
							<el-input v-model="truck.selfNum"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="车辆类别">
							<el-select style="width: 100%" v-model="truck.plateType" placeholder="请选择">
								<el-option label="挂车" value="挂车"></el-option>
								<el-option label="牵引车" value="牵引车"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车辆类型">
							<el-select style="width: 100%" v-model="truck.plateClass" placeholder="请选择">
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
							<el-select style="width: 100%" v-model="truck.plateColor" placeholder="请选择">
								<el-option label="黄" value="黄"></el-option>
								<el-option label="蓝" value="蓝"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车牌号">
							<el-input v-model="truck.plateNum"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="挂车车牌">
							<el-input v-model="truck.trailerPlate"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车长">
							<el-select style="width: 100%" v-model="truck.truckLength" placeholder="请选择">
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
							<el-select style="width: 100%" v-model="truck.truckWidth" placeholder="请选择">
								<el-option label="2米" value="2"></el-option>
								<el-option label="3米" value="3"></el-option>
								<el-option label="4米" value="4"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车高">
							<el-select style="width: 100%" v-model="truck.truckHeight" placeholder="请选择">
								<el-option label="2米" value="2"></el-option>
								<el-option label="3米" value="3"></el-option>
								<el-option label="4米" value="4"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="载重">
							<el-input v-model="truck.load"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="装载方数">
							<el-input v-model="truck.loadVolumn"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="牵引质量">
							<el-input v-model="truck.towMass"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="罐体类型">
							<el-select style="width: 100%" v-model="truck.tankType" placeholder="请选择">
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
								v-model="truck.tankTestValidTo"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="安全阀检测有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.safetyTestValidTo"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="压力表检测有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.pressureTestValidTo"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="汽车生产厂家">
							<el-input v-model="truck.truckManufacturer"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="品牌型号">
							<el-input v-model="truck.brandModel"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发动机号">
							<el-input v-model="truck.engineNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车架号">
							<el-input v-model="truck.frameNum"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="核载人数">
							<el-select style="width: 100%" v-model="truck.loadPersonNum" placeholder="请选择">
								<el-option 
								v-for="i in 9" :key="i" 
								:label="i+1" :value="i+1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车身颜色">
							<el-input v-model="truck.truckColor"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否喷涂警示标志">
							<el-select style="width: 100%" v-model="truck.isWarnLogo" placeholder="请选择">
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
								v-model="truck.driverLicRgDate"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行驶证发证日期">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.driverLicAwDate"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行驶证审验效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.driverLicTo"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="道路运输证号">
							<el-input v-model="truck.roadTransNum"></el-input>
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
								v-model="truck.roadTransYearTo"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所有人或单位">
							<el-input v-model="truck.owner"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人联系电话">
							<el-input v-model="truck.ownerMobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所有人登记地址">
							<el-input v-model="truck.ownerAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="实际车主姓名">
							<el-input v-model="truck.truckOwnerName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主电话">
							<el-input v-model="truck.truckOwnerMobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="实际车主现住址">
							<el-input v-model="truck.truckOwnerAddress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所有权">
							<el-select style="width: 100%" v-model="truck.ownership" placeholder="请选择">
								<el-option label="单位" value="单位"></el-option>
								<el-option label="个人" value="个人"></el-option>
								<el-option label="挂靠" value="挂靠"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经营证号">
							<el-input v-model="truck.businessLicNum"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="等级评定">
							<el-select style="width: 100%" v-model="truck.levelEval" placeholder="请选择">
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
								v-model="truck.nextLevelEvalDate"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="二级维护日期">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.secondMaintainDate"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="下次二级维护日期">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.nextSecondMaintainDate"
								type="date"
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
								v-model="truck.carrierValid"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="交强险有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.strongInsValid"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="商业险有效期至">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.commercialInsValid"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="GPS类型">
							<el-input v-model="truck.gpsType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS入网号">
							<el-input v-model="truck.gpsNetNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS卡号">
							<el-input v-model="truck.gpsCardNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="GPS序列号">
							<el-input v-model="truck.gpsSerialNum"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="GPS安装时间">
							<el-date-picker
								style="width: 100%" 
								v-model="truck.gpsInstallTime"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="车辆照片">
							<ImageUpload :files="[truck.truckPhoto]" @imgUrlBack="handleTruckPhotoSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="机动车行驶证">
							<ImageUpload :files="[truck.driverLicImg]" @imgUrlBack="handleDriverLicSuccess"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="道路运输许可证">
							<ImageUpload :files="[truck.roadTransImg]" @imgUrlBack="handleRoadTransSuccess"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="其他照片">
							<ImageUpload :files="truck.otherImgs" :limitNum="9" @imgUrlBack="imgUrlBack"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="add">立即保存</el-button>
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
import { regionData } from 'element-china-area-data'
import ImageUpload from '../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			distData: regionData,
			truck: {
				status: '通过',
				auditor: '王小川',
				auditorDate: '2018-02-21',
				area: ['530000','530100','530102'],
				company: '云南安化中达物流有限责任公司',
				selfNum: '6-1',
				plateType: '牵引车',
				plateClass: '重型半挂牵引车',
				plateColor: '黄',
				plateNum: '云AD3875',
				trailerPlate: '云A3229挂',
				truckLength: '4',
				truckWidth: '3',
				truckHeight: '3700',
				load: '40000.000',
				loadVolumn: '30',
				towMass: '25000',
				tankType: '',
				tankVolume: '',
				tankTestValidTo: '',
				safetyTestValidTo: '',
				pressureTestValidTo: '',
				truckManufacturer: '东风汽车有限公司',
				brandModel: '东风牌DFL4251A10',
				engineNum: '',
				frameNum: '',
				loadPersonNum: '4',
				truckColor: '蓝',
				isWarnLogo: '是',
				driverLicRgDate: '2012-8-7',
				driverLicAwDate: '2012-8-7',
				driverLicTo: '2018-8-31',
				roadTransNum: '530181012183',
				businessScope: '危险货物运输(5类1项)',
				roadTransYearTo: '2018-6-30',
				owner: '王大锤',
				ownerMobile: '13045968532',
				ownerAddress: '云南省红河州蒙自市',
				truckOwnerName: '张三',
				truckOwnerMobile: '15089859632',
				truckOwnerAddress: '云南省红河州蒙自市',
				ownership: '个人',
				businessLicNum: '57643546544',
				levelEval: '二级',
				nextLevelEvalDate: '2018-6-30',
				secondMaintainDate: '2018-6-30',
				nextSecondMaintainDate: '2018-6-30',
				carrierValid: '2018-6-30',
				strongInsValid: '2018-6-30',
				commercialInsValid: '2018-6-30',
				gpsType: '',
				gpsNetNum: '',
				gpsCardNum: '',
				gpsSerialNum: '',
				gpsInstallTime: '2018-6-30',
				truckPhoto: 'http://f11.baidu.com/it/u=2588434687,3162842634&fm=72',
				driverLicImg: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1684697538,1821191231&fm=27&gp=0.jpg',
				roadTransImg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=183636833,3673839069&fm=27&gp=0.jpg',
				otherImgs: [
					'http://img0.imgtn.bdimg.com/it/u=211127819,408382177&fm=200&gp=0.jpg',
					'http://img5.imgtn.bdimg.com/it/u=3769120177,158294962&fm=27&gp=0.jpg',
					'http://img5.imgtn.bdimg.com/it/u=1636995595,1602982972&fm=27&gp=0.jpg'
				]
			}
		}
	},
	created() {
	},
	methods: {
		handleTruckPhotoSuccess(res, file) {
			this.truck.truckPhoto = 'http://39.108.245.177:4000' + res.data
		},
		handleDriverLicSuccess(res, file) {
			this.truck.driverLicImg = 'http://39.108.245.177:4000' + res.data
		},
		handleRoadTransSuccess(res, file) {
			this.truck.roadTransImg = 'http://39.108.245.177:4000' + res.data
		},
		imgUrlBack(files) {
			console.log(files)
			this.truck.otherImgs = files
		},
		add() {
			Message.success('保存成功！')
			this.$router.push({name: 'truck'})
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