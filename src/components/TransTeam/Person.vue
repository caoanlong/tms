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
							<el-option label="驾驶员" value="Driver"></el-option>
							<el-option label="押运员" value="Supercargo"></el-option>
							<el-option label="专职安全员" value="SafetyOfficer"></el-option>
							<el-option label="装卸管理人员" value="Stevedore"></el-option>
							<el-option label="其他人员" value="Other"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建时间">
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
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="性别">
						<template slot-scope="scope">
							<span >{{scope.row.sex == 'M' ? '男' : '女'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="聘用岗位" width="100">
						<template slot-scope="scope">
							<span v-for="item in scope.row.position.split(',')">{{postMap[item]}},</span>
						</template>
					</el-table-column>
					<el-table-column label="身份证号" prop="idCardNum" width="160"></el-table-column>
					<el-table-column label="创建人" prop="createByRealName" width="100"></el-table-column>
					<el-table-column label="状态">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 'pass'">通过</span>
							<span v-else-if="scope.row.status == 'unpass'">不通过</span>
							<span v-else>其他</span>
						</template>
					</el-table-column>
					<el-table-column label="审核人" prop="auditByRealName" width="100"></el-table-column>
					<el-table-column label="审核日期" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.auditTime">{{scope.row.auditTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="准驾车型" prop="quasiDrivingType"></el-table-column>
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
					<el-table-column label="初次发证件时间" width="100">
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
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList">
							<el-option label="10" :value="10"></el-option>
							<el-option label="20" :value="20"></el-option>
							<el-option label="30" :value="30"></el-option>
							<el-option label="40" :value="40"></el-option>
							<el-option label="50" :value="50"></el-option>
							<el-option label="100" :value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request, { baseURL } from '../../common/request'
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
				}
			}
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
			},
			pageChange(index) {
				this.pageIndex = index
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
				console.log(response)
				Message.success(response.data)
				this.getList()
			},
			// 上传错误
			uploadError (response) {
				console.log(response)
				// Message.error(response)
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
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					mobile: this.findMobile,
					position: this.findPost,
					realName: this.findName,
					integrityExamineGrade: this.findLevel,
					createTimeBegin: this.startDate,
					createTimeEnd: this.endDate
				}
				request({
					url: '/staff/findList',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.tableData = res.data.data.records
						this.count = res.data.data.total
					}
				})
			},
			handleCommand(e) {
				console.log(e)
				if (e.type == 'view') {
					this.$router.push({name: 'viewperson', query: {staffID: e.id}})
				} else if (e.type == 'edit') {
					this.$router.push({name: 'editperson', query: {staffID: e.id}})
				} else if (e.type == 'delete') {
					this.deleteConfirm(e.id)
				}
			},
			add() {
				this.$router.push({name: 'addperson'})
			},
			deleteConfirm(id) {
				let ids = ''
				if (id && typeof id == 'string') {
					ids = id
				} else {
					ids = this.selectedList.join(',')
				}
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delItem(ids)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			delItem(staffIDs) {
				console.log(staffIDs)
				let data = {
					staffIDs
				}
				request({
					url: '/staff/deleteBatch',
					method: 'post',
					data
				}).then(res => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					this.getList()
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
</style>