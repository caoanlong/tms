<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看车辆</span>
			</div>
            <el-form label-width="155px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="状态">
                            <p>{{truck.status}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="审核人">
                            <p>{{truck.auditor}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="审核日期">
                            <p>{{truck.auditorDate}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="所属地区">
                            <el-cascader
                                disabled
								style="width: 100%"
								:options="distData"
								v-model="truck.area">
							</el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所属企业">
                            <p>{{truck.company}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="自编号">
                            <p>{{truck.selfNum}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="车辆类别">
                            <p>{{truck.plateType}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车辆类型">
                            <p>{{truck.plateClass}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车牌颜色">
                            <p>{{truck.plateColor}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车牌号">
                            <p>{{truck.plateNum}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="挂车车牌">
                            <p>{{truck.trailerPlate}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车长">
                            <p>{{truck.truckLength + '米'}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车宽">
                            <p>{{truck.truckWidth + '米'}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车高">
                            <p>{{truck.truckHeight + '米'}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="载重">
                            <p>{{truck.load}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="装载方数">
                            <p>{{truck.loadVolumn}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="牵引质量">
                            <p>{{truck.towMass}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="罐体类型">
                            <p>{{truck.tankType}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="罐体容积">
                            <p>{{truck.tankVolume}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="罐体检测有效期至">
                            <p>{{truck.tankTestValidTo}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="安全阀检测有效期至">
                            <p>{{truck.safetyTestValidTo}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="压力表检测有效期至">
                            <p>{{truck.pressureTestValidTo}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="汽车生产厂家">
                            <p>{{truck.truckManufacturer}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="品牌型号">
                            <p>{{truck.brandModel}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发动机号">
                            <p>{{truck.engineNum}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车架号">
                            <p>{{truck.frameNum}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="核载人数">
                            <p>{{truck.loadPersonNum}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车身颜色">
                            <p>{{truck.truckColor}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="是否喷涂警示标志">
                            <p>{{truck.isWarnLogo}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="行驶证注册日期">
                            <p>{{truck.driverLicRgDate}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="行驶证发证日期">
                            <p>{{truck.driverLicAwDate}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="行驶证审验效期至">
                            <p>{{truck.driverLicTo}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="道路运输证号">
                            <p>{{truck.roadTransNum}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="经营范围">
                            <p>{{truck.businessScope}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="道路运输证年审期至">
                            <p>{{truck.roadTransYearTo}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="所有人或单位">
                            <p>{{truck.owner}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所有人联系电话">
                            <p>{{truck.ownerMobile}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所有人登记地址">
                            <p>{{truck.ownerAddress}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="实际车主姓名">
                            <p>{{truck.truckOwnerName}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="实际车主电话">
                            <p>{{truck.truckOwnerMobile}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="实际车主现住址">
                            <p>{{truck.truckOwnerAddress}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="所有权">
                            <p>{{truck.ownership}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="经营证号">
                            <p>{{truck.businessLicNum}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="等级评定">
                            <p>{{truck.levelEval}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="下次等评日期">
                            <p>{{truck.nextLevelEvalDate}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="二级维护日期">
                            <p>{{truck.secondMaintainDate}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="下次二级维护日期">
                            <p>{{truck.nextSecondMaintainDate}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="承运人责任险有效期至">
                            <p>{{truck.carrierValid}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="交强险有效期至">
                            <p>{{truck.strongInsValid}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商业险有效期至">
                            <p>{{truck.commercialInsValid}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="GPS类型">
                            <p>{{truck.gpsType}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="GPS入网号">
                            <p>{{truck.gpsNetNum}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="GPS卡号">
                            <p>{{truck.gpsCardNum}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="GPS序列号">
                            <p>{{truck.gpsSerialNum}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="GPS安装时间">
                            <p>{{truck.gpsInstallTime}}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="车辆照片">
                            <ImageUpload :files="[truck.truckPhoto]" :isPreview="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="机动车行驶证">
                            <ImageUpload :files="[truck.driverLicImg]" :isPreview="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="道路运输许可证">
                            <ImageUpload :files="[truck.roadTransImg]" :isPreview="true"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="其他照片">
                            <ImageUpload :files="truck.otherImgs" :isPreview="true" :limitNum="9" @imgUrlBack="imgUrlBack"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
		</el-card>
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
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
		font-size 12px
</style>