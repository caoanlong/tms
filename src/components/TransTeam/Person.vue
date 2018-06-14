<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">人员管理</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="姓名">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input placeholder="请输入..." v-model="findMobile"></el-input>
					</el-form-item>
					<el-form-item label="评级">
						<el-select v-model="findLevel" placeholder="请选择">
							<el-option label="无" value=""></el-option>
							<el-option label="A" value="A"></el-option>
							<el-option label="AA" value="AA"></el-option>
							<el-option label="AAA" value="AAA"></el-option>
							<el-option label="AAAA" value="AAAA"></el-option>
							<el-option label="AAAAA" value="AAAAA"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="岗位">
						<el-select v-model="findPost" placeholder="请选择">
							<el-option label="操作员" value="Operator"></el-option>
							<el-option label="押运员" value="Supercargo"></el-option>
							<el-option label="专职安全员" value="SafetyOfficer"></el-option>
							<el-option label="装卸管理人员" value="Stevedore"></el-option>
							<el-option label="其他人员" value="Other"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="添加时间">
						<el-date-picker
							v-model="findDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="timestamp"
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
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
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="性别" align="center">
						<template slot-scope="scope">
							<span >{{scope.row.sex == 'M' ? '男' : '女'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="聘用岗位" width="100">
						<template slot-scope="scope">
							<span v-for="(item, index) in scope.row.position.split(',')" :key="item">{{(index != 0 ? '，' : '') + postMap[item]}}</span>
						</template>
					</el-table-column>
					<el-table-column label="身份证号" prop="idCardNum" width="160"></el-table-column>
					<el-table-column label="创建人" prop="createName" width="100"></el-table-column>
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 'Passed'" style="color:'#67C23A'">通过</span>
							<span v-else-if="scope.row.status == 'NotPassed'"  style="color:'#E6A23C'">未通过</span>
							<span v-else-if="scope.row.status == 'Other'" style="color:#409EFF">其他</span>
						</template>
					</el-table-column>
					<el-table-column label="审核人" prop="auditName" width="100"></el-table-column>
					<el-table-column label="审核日期" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.auditTime">{{scope.row.auditTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="准驾车型">
						<template slot-scope="scope">
							<span v-if="scope.row.quasiDrivingType">{{scope.row.quasiDrivingType}}</span>
						</template>
					</el-table-column>
					<el-table-column label="驾驶证审验有效期至" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.driverLicExamineEndTime">{{scope.row.driverLicExamineEndTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="从业资格证件号" prop="qualificationCode" width="160"></el-table-column>
					<el-table-column label="从业资格类别" prop="qualificationType" width="100"></el-table-column>
					<el-table-column label="从业资格证有效期至" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.qualificationExpirationTime">{{scope.row.qualificationExpirationTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="驾驶证初次领证日期" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.driverLicenseFirstTime">{{scope.row.driverLicenseFirstTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="诚信考核等级" prop="integrityExamineGrade" width="100"></el-table-column>
					<el-table-column label="诚信考核有效期至" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.integrityExamineEndTime">{{scope.row.integrityExamineEndTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="合同有效期起" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.laborContractBeginTime">{{scope.row.laborContractBeginTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="合同有效期至" width="100">
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
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.staffID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.staffID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.staffID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { deleteConfirm } from '../../common/utils'
import { baseURL } from '../../common/request'
import Staff from '../../api/Staff'
import Page from '../CommonComponents/Page'
export default {
	data() {
		return {
			findName: '',
			findMobile: '',
			findLevel: '',
			findPost: '',
			findDate: [],
			startDate: '',
			endDate: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedList: [],
			tableData: [],
			importFileUrl: baseURL + '/staff/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			postMap: {
				"Operator": "操作员",
				"Driver": "驾驶员",
				"Supercargo": "押运员",
				"SafetyOfficer": "专职安全员",
				"Stevedore": "装卸管理人员",
				"Other": "其他人员"
			},
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=employee.xlsx&&Authorization=' +localStorage.getItem("token"),
			templateTit:'employee.xlsx'
		}
	},
	components: {
		Page
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findName = ''
			this.findMobile = ''
			this.findLevel = ''
			this.findPost = ''
			this.findDate = []
			this.startDate = ''
			this.endDate = ''
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
			this.selectedList = data.map(item => item.staffID)
		},
		selectDateRange(date) {
			this.startDate = date[0]
			this.endDate = date[1]
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
			console.log(response)
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
			Staff.find({
				current: this.pageIndex,
				size: this.pageSize,
				mobile: this.findMobile,
				position: this.findPost,
				realName: this.findName,
				integrityExamineGrade: this.findLevel,
				createTimeBegin: this.startDate,
				createTimeEnd: this.endDate
			}).then(res => {
				this.tableData = res.records
				this.count = res.total
			})
		},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewperson', query: {staffID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editperson', query: {staffID: e.id}})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		add() {
			this.$router.push({name: 'addperson'})
		},
		del(staffID) {
			deleteConfirm(staffID, staffIDs => {
				Staff.del({ staffIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
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
