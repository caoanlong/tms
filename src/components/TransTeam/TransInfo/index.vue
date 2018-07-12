<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">运输档案</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="姓名">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="车牌号">
						<el-input placeholder="请输入..." v-model="findPlateNum"></el-input>
					</el-form-item>
					<el-form-item label="自编号">
						<el-input placeholder="请输入..." v-model="findSelfNum"></el-input>
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
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="身份证号" prop="idCardNum" width="150" align="center"></el-table-column>
					<el-table-column label="联系电话" prop="mobile" width="100" align="center"></el-table-column>
					<el-table-column label="从业资格证件号" prop="qualificationCode" width="120" align="center"></el-table-column>
					<el-table-column label="车牌号" width="120" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.plateNo}}</span>
							<span v-if="scope.row.trailerPlateNo">{{'/' + scope.row.trailerPlateNo}}</span>
						</template>
					</el-table-column>
					<el-table-column label="自编号" prop="code" align="center"></el-table-column>
					<el-table-column label="道路运输证号" prop="transportLicenceCode" width="120" align="center"></el-table-column>
					<el-table-column label="载重" prop="loads" width="100"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="创建时间" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="建档时间" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.archiveTime">{{scope.row.archiveTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.transportRecordID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.transportRecordID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.transportRecordID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseURL } from '../../../common/request'
import { deleteConfirm } from '../../../common/utils'
import Page from '../../CommonComponents/Page'
import TransportRecord from '../../../api/TransportRecord'
export default {
	data() {
		return {
			findName: '',
			findPlateNum: '',
			findSelfNum: '',
			findDate: [],
			startDate: '',
			endDate: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedList:[],
			tableData: [],
			importFileUrl: baseURL + '/transportRecord/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=transport.xlsx&Authorization=' +localStorage.getItem("token"),
			templateTit: 'transport.xlsx',
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		reset() {
			this.findName = ''
			this.findPlateNum = ''
			this.findSelfNum = ''
			this.findDate = []
			this.startDate = ''
			this.endDate = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.transportRecordID)
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
			TransportRecord.find({
				current: this.pageIndex,
				size: this.pageSize,
				code: this.findSelfNum,
				realName: this.findName,
				plateNo: this.findPlateNum,
				createTimeBegin: this.startDate,
				createTimeEnd: this.endDate
			}).then(res => {
				this.tableData = res.records
				this.count = res.total
			})
			
		},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewtransinfo', query: {transportRecordID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'edittransinfo', query: {transportRecordID: e.id}})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		add() {
			this.$router.push({name: 'addtransinfo'})
		},
		del(transportRecordID) {
			deleteConfirm(transportRecordID, transportRecordIDs => {
				TransportRecord.del({ transportRecordIDs }).then(res => {
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