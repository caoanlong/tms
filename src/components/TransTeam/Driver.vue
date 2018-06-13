<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">司机管理</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="关键字">
						<el-input placeholder="车牌号/挂车号/姓名" v-model="findKeyword"></el-input>
					</el-form-item>
					<el-form-item label="车辆归属">
						<el-select v-model="findCooperateRelation" placeholder="全部">
							<el-option label="全部" value=""></el-option>
							<el-option label="挂靠" value="Attach"></el-option>
								<el-option label="自有车辆" value="Self"></el-option>
						</el-select>
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
				<!-- <el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button> -->
			</div>
			<div class="table">
				<el-table
					ref="recTable"
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="性别" width="46" align="center">
						<template slot-scope="scope">
							<span >{{scope.row.sex == 'M' ? '男' : '女'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="手机" width="100" prop="mobile" align="center"></el-table-column>
					<el-table-column label="合作关系" width="80" align="center">
						<template slot-scope="scope">
							<span >{{scope.row.cooperateRelation == 'Attach' ? '挂靠' : '自有车辆'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="关联账号"  width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.cooperateStatus == 'Agreed'">已同意</span>
							<span v-else-if="scope.row.cooperateStatus == 'Invited'">已邀请</span>
							<span v-else-if="scope.row.cooperateStatus == 'Rejected'">已拒绝</span>
							<span v-else-if="scope.row.cooperateStatus == 'Relieved'">已解除</span>
						</template>
					</el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="身份证" width="100" align="center">
						<template slot-scope="scope">
							<img class="mini-img" :src="resizeImg(scope.row.idCardFrontUrl, '_40x20.')" v-if="scope.row.idCardFrontUrl">
							<img class="mini-img" :src="resizeImg(scope.row.idCardBackUrl, '_40x20.')" v-if="scope.row.idCardBackUrl">
						</template>
					</el-table-column>
					<el-table-column label="驾驶证" width="100" align="center">
						<template slot-scope="scope">
							<img class="mini-img" :src="resizeImg(scope.row.driverLicFrontUrl, '_40x20.')" v-if="scope.row.driverLicFrontUrl">
							<img class="mini-img" :src="resizeImg(scope.row.driverLicBackUrl, '_40x20.')" v-if="scope.row.driverLicBackUrl">
						</template>
					</el-table-column>
					<el-table-column label="从业资格证" width="100" align="center">
						<template slot-scope="scope">
							<img class="mini-img" :src="resizeImg(scope.row.qualificationFirstPage, '_40x20.')" v-if="scope.row.qualificationFirstPage">
							<img class="mini-img" :src="resizeImg(scope.row.qualificationSecondPage, '_40x20.')" v-if="scope.row.qualificationSecondPage">
						</template>
					</el-table-column>
					<el-table-column label="更新时间" width="140" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.updateTime">{{scope.row.updateTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.comDriverID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.comDriverID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'relieve', id: scope.row.comDriverID}" v-if="scope.row.cooperateStatus == 'Agreed'">解除合作</el-dropdown-item>
									<el-dropdown-item :command="{type: 'invite', id: scope.row.comDriverID}" v-else>发送邀请</el-dropdown-item>
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
import Driver from '../../api/Driver'
import { resizeImg } from '../../common/utils'
import Page from '../CommonComponents/Page'
export default {
	data() {
		return {
			findKeyword: '',
			findCooperateRelation: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedList: [],
			tableData: [],
			importFileUrl: Driver.baseURL + '/staff/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			postMap: {
				"Operator": "操作员",
				"Driver": "驾驶员",
				"Supercargo": "押运员",
				"SafetyOfficer": "专职安全员",
				"Stevedore": "装卸管理人员",
				"Other": "其他人员"
			},
			templateUrl: Driver.baseURL + '/base/filetemplate/downLoadTemplate?fileName=employee.xlsx&&Authorization=' +localStorage.getItem("token"),
			templateTit:'employee.xlsx'
		}
	},
	computed: {
		resizeImg: () => resizeImg
	},
	components: {
		Page
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findKeyword = ''
			this.findCooperateRelation = ''
			this.pageIndex = 1
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
			Driver.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.findKeyword,
				cooperateRelation: this.findCooperateRelation
			}).then(res => {
				this.tableData = res.records
				this.count = res.total
			})
		},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewdriver', query: {comDriverID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editdriver', query: {comDriverID: e.id}})
			} else if (e.type == 'relieve'){
				this.changeCooperateStatus(e.id,'relieve')
			} else if (e.type == 'invite'){
				this.changeCooperateStatus(e.id,'invite')
			}
		},
		add() {
			this.$router.push({name: 'adddriver'})
		},
		changeCooperateStatus(comDriverID,CooperateStatus){
			if(CooperateStatus =='invite'){
				Driver.changeCooperateStatus({
					comDriverID:comDriverID,
					cooperateStatus:'Invited'
				})
			}else{
				Driver.changeCooperateStatus({
					comDriverID:comDriverID,
					cooperateStatus:'Relieved'
				})
			}
		}	
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
.mini-img
	width 40px
	height 24px
</style>
