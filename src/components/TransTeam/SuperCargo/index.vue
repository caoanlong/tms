<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">运输人员管理</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="人员">
						<el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="运输岗位">
						<el-form-item>
							<el-checkbox-group v-model="supercargoType" @change="supercargoTypeChange">
								<el-checkbox label="Driver">驾驶员</el-checkbox>
								<el-checkbox label="Supercargo">押运员</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-upload 
					class="upload-File" 
					name="excelFile" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess" 
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				</el-upload>
				<a :href="templateUrl" :download="templateTit" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table
					ref="recTable"
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="姓名" prop="realName">
						<template slot-scope="scope">
							<span class="link" @click="view(scope.row.comSupercargoID)">{{scope.row.realName}}</span>
							<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
								<div slot="content">
									<el-tag size="mini" type="danger" v-for="(item,index) in scope.row.expiredCertificate" :key="index">{{
										expireWarnJson[item]
									}}</el-tag>
								</div>
								<el-tag size="mini" type="danger" v-if="scope.row.expiredCertificate.length>0">到期</el-tag>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column label="手机" prop="mobile"></el-table-column>
					<el-table-column label="驾驶员">
						<template slot-scope="scope">
							<span >{{scope.row.supercargoType == 'Driver' || scope.row.supercargoType == 'SupercargoDriver' ? '是' : '否'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="押运员">
						<template slot-scope="scope">
							<span >{{scope.row.supercargoType == 'Supercargo' || scope.row.supercargoType == 'SupercargoDriver' ? '是' : '否'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'edit', id: scope.row.comSupercargoID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.comSupercargoID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { deleteConfirm } from '../../../common/utils'
import request, { baseURL } from '../../../common/request'
import FileUpload from '../../CommonComponents/FileUpload'
import SuperCargo from '../../../api/SuperCargo'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			supercargoType: [],
			find: {
				keyword: '',
				supercargoType: ''
			},
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedList: [],
			tableData: [],
			importFileUrl: baseURL + '/supercargo/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=supercargo.xlsx&&Authorization=' +localStorage.getItem("token"),
			templateTit:'supercargo.xlsx',
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
				NextSecondLevel:"二级维护下次维护",
				NextRankEvaluteTime:"技术等级下次评定到期",
				SecondSecurityDepositDate:"二次安全保证金到期 ",
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
	components: { FileUpload,Page },
	created() {
		this.getList()
	},
	methods: {
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
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		reset() {
			this.find.keyword = ''
			this.find.supercargoType = ''
			this.supercargoType = []
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.comSupercargoID)
		},
		supercargoTypeChange(data) {
			if (data.length == 2) {
				this.find.supercargoType = 'SupercargoDriver'
			} else {
				this.find.supercargoType = data.join('')
			}
		},
		getList() {
			SuperCargo.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				supercargoType: this.find.supercargoType
			}).then(res => {
				const list = res.records.map(item => {
					return {
						comSupercargoID: item.comSupercargoID,
						realName: item.realName,
						mobile: item.mobile,
						supercargoType: item.supercargoType,
						expiredCertificate: item.expiredCertificate 
						? (item.expiredCertificate.indexOf(',') ? item.expiredCertificate.split(',') : [item.expiredCertificate]) : []
					}
				})
				this.tableData = list
				this.count = res.total
			})
		},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewsupercargo', query: { comSupercargoID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editsupercargo', query: { comSupercargoID: e.id}})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		view(comSupercargoID) {
			this.$router.push({name: 'viewsupercargo', query: { comSupercargoID }})
		},
		add() {
			this.$router.push({name: 'addsupercargo'})
		},
		del(comSupercargoID) {
			deleteConfirm(comSupercargoID, comSupercargoIDs => {
				SuperCargo.del({ comSupercargoIDs }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			}, this.selectedList)
		}
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
</style>
