<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">到期预警</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="到期对象">
						<el-input placeholder="车牌号/姓名" v-model="findrealName"></el-input>
					</el-form-item>
					<el-form-item label="对象类型">
						<el-select placeholder="全部" v-model="findobjType" @change="cccc">
							<el-option label="全部" value=""></el-option>
							<el-option label="司机" value="Driver"></el-option>
							<el-option label="车辆" value="Truck"></el-option>
							<el-option label="押运员" value="Comsupercargo"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="到期类型" >
						<el-select placeholder="请选择到期类型" v-model="findexpiredCertificate">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in expOption" :label="item.value" :value="item.key" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="到期对象" prop="realName" align="center"></el-table-column>
					<el-table-column label="手机号" prop="mobile" align="center"></el-table-column>
					<el-table-column label="对象类型" prop="objType" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.objType == 'Truck'">车辆</span>
							<span v-else-if="scope.row.objType == 'Driver'">司机</span>
							<span v-else>押运员</span>
						</template>
					</el-table-column>
					<el-table-column label="证件类型" align="center">
						<template slot-scope="scope">
							<span>{{expiredCertificateSort[scope.row.expiredCertificate]}}</span>
						</template>
					</el-table-column>
					<el-table-column label="到期日期" align="center">
						<template slot-scope="scope">
							{{scope.row.archiveTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="状态" prop="predictType" align="center">
						<template slot-scope="scope">
							<el-tag size="mini" type="danger" v-if="scope.row.predictType == 'Unexpired'">即将过期</el-tag>
							<el-tag size="mini" type="danger" v-else-if="scope.row.predictType == 'Expired'">已经过期</el-tag>
							<el-tag v-else>正常</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="updataInfo(scope.row.objRecordID,scope.row.objType)">更新资料</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<el-dialog title="添加货物单位" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="单位名称" label-width="80px">
					<el-input placeholder="请输入货物单位" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request, { baseURL } from '../../../common/request'
import RecordWarn from '../../../api/RecordWarn'
import Page from '../../CommonComponents/Page'
import { deleteConfirm } from '../../../common/utils'
export default {
	data() {
		return {
			dialogFormVisible:false,
			findrealName: '',
			findobjType: '',
			findexpiredCertificate: '',

			pageIndex: 1,
			pageSize: 10,
			total:0,
			tableData: [],
			selectedList: [],
			importFileUrl: baseURL + '/customer/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=shipperAndConsignor.xlsx&&Authorization=' +localStorage.getItem("token"),
			templateTit:'shipperAndConsignor.xlsx',
			TruckOption:{
				DriverLicExpiresTime:"行驶证",
				RoadTransportLicAnnualPeriod:"道路运输许可证",
				GpsValidEndDate:"GPS",
				SaliInsuranceExpires:"交强险",
				BizInsuranceExpires:"商业险",
				CarrierRiskInsuranceExpires:"承运险",
				CargoInsuranceExpireDate:"货运险",
				TankQCExpires:"罐体监测",
				SafetyValvesQCExpires:"罐体安全阀监测",
				PressureGaugeQCExpires:"罐体压力表监测",
				NextRankEvaluteTime:"技术等级下次评定",
				SecondSecurityDepositDate:"二次安全保证金",
				ManagementAgreementExpireDate:"管理协议",
				NextSecondLevel:"二级维护下次维护",
				SafetyLiabilityLetterExpireDate:"安全责任书",
			},
			DriverOption:{
				IdCardExpirationTime:"身份证",
				DriverLicenseEndTime:"驾驶证",
				QualificationExpirationDate:"危货从业资格证",
				IntegrityExamineEndTime:"诚信考核证",
				LaborContractEndTime:"聘用合同",
				EscortLicenseExpireDate:"押运证",
			},
			ComsupercargoOption:{
				IdCardExpirationTime:"身份证",
				LaborContractEndTime:"聘用合同",
				EscortLicenseExpireDate:"押运证",
			},
			expiredCertificateSorts:[],
			TruckOptions:[],
			DriverOptions:[],
			ComsupercargoOptions:[],
			expOption:[]
		}
	},
	components: {
		Page
	},
	created() {
		this.expiredCertificateSorts = Object.keys(this.expiredCertificateSort).map(item =>{
			return {
				key:item,
				value:this.expiredCertificateSort[item]
			}
		})
		this.TruckOptions = Object.keys(this.TruckOption).map(item =>{
			return {
				key:item,
				value:this.TruckOption[item]
			}
		})
		this.DriverOptions = Object.keys(this.DriverOption).map(item =>{
			return {
				key:item,
				value:this.DriverOption[item]
			}
		})
		this.ComsupercargoOptions = Object.keys(this.ComsupercargoOption).map(item =>{
			return {
				key:item,
				value:this.ComsupercargoOption[item]
			}
		})
		this.expOption = this.expiredCertificateSorts
		this.getList()
	},
	computed:{
		expiredCertificateSort(){
			return Object.assign(this.TruckOption,this.DriverOption)
		}
	},
	methods: {
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.total = 0
			this.tableData = []
			this.getList()
		},
		reset() {
			this.findrealName=''
			this.findobjType=''
			this.findexpiredCertificate=''
			this.pageIndex = 1
			this.pageSize = 10
			this.total = 0
			this.tableData = []
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.pageIndex = 1
			this.getList() 
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.customerID)
		},
		// 导入
		uploadSuccess (response) {
			if (response.code != 200) {
				Message.error(response.msg)
			} else {
				Message.success(response.msg)
				this.getList()
			}
		},
		// 上传错误
		uploadError (response) {
			Message.error(response.msg)
		},
		beforeFileUpload (file) {
			const extension = file.name.split('.')[1] === 'xls'
			const extension2 = file.name.split('.')[1] === 'xlsx'
			const isLt2M = file.size / 1024 / 1024 < 10
			if (!extension && !extension2) {
				Message.error('上传模板只能是 xls、xlsx格式!')
			}
			if (!isLt2M) {
				Message.error('上传模板大小不能超过 10MB!')
			}
			return extension || extension2 && isLt2M
		},
		getList() {
			RecordWarn.findList({
				current: this.pageIndex,
				size: this.pageSize,
				realName:this.findrealName,
				objType:this.findobjType,
				expiredCertificate:this.findexpiredCertificate
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
		},
		updataInfo(id,objType){
			if(objType == 'Truck'){
				this.$router.push({name: 'edittruck', query: { truckID:id }})
			}else{
				this.$router.push({name: 'editsupercargo', query: { comSupercargoID:id }})
			}
		},
		add() { 
			this.dialogFormVisible = true
		},
		handleCommand(e) {
			if(e.type=='view'){
				this.$router.push({name: 'viewshipper', query: { customerID:e.id }})
			}else if(e.type=='edit'){
				this.$router.push({ name: 'editshipper' , query: {  customerID:e.id } })
			}else if(e.type=='delete'){
				this.del(e.id)
			}
		},
		del(customerID) {
			deleteConfirm(customerID, customerIDs => {
				Customer.del({ customerIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			}, this.selectedList)
		},
		cccc(){
			if(this.findobjType =='Truck'){
				this.expOption = this.TruckOptions
			}else if(this.findobjType =='Driver'){
				this.expOption = this.DriverOptions
			}else if(this.findobjType =='Comsupercargo'){
				this.expOption = this.ComsupercargoOptions
			}else{
				this.expOption = this.expiredCertificateSorts
			}
			
		}
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
</style>