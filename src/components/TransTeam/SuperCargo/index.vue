<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">运输人员管理</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="人员">
						<el-input placeholder="姓名/手机号" v-model="keyword" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="运输岗位">
						<el-checkbox-group v-model="supercargoType" @change="supercargoTypeChange">
							<el-checkbox label="Driver">驾驶员</el-checkbox>
							<el-checkbox label="Supercargo">押运员</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
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
				<a :href="exportExcelUrl" class="exportExcel el-icon-download">导出</a>
				<a :href="templateUrl" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
				
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
							<span class="link" @click="view(scope.row.supercargoID)">{{scope.row.realName}}</span>
							<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
								<div slot="content">
									<el-tag size="mini" type="danger" v-for="(item,index) in scope.row.expiredCertificate" :key="index">{{
										EXPIREWARN[item]
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
									<el-dropdown-item :command="{type: 'edit', id: scope.row.supercargoID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.supercargoID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { deleteConfirm } from '../../../common/utils'
import request, { baseURL } from '../../../common/request'
import FileUpload from '../../CommonComponents/FileUpload'
import Company from '../../../api/Company'
import { baseMixin } from '../../../common/mixin';
export default {
	mixins: [baseMixin],
	data() {
		return {
			supercargoType: [],
			keyword: '',
			importFileUrl: '',
			uploadHeaders: {'Authorization': localStorage.getItem('token'),'Request-From':'PC'},
			exportExcelUrl:'',
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=supercargo.xlsx&&Authorization=' +localStorage.getItem("token"),
		}
	},
	components: { FileUpload },
	created() {
		this.resetExportExcelUrl()
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
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
		reset() {
			this.keyword = ''
			this.supercargoType = []
			this.supercargoType = []
			this.pageIndex = 1
			this.pageSize = 10
			this.resetExportExcelUrl()
			this.getList()
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		resetExportExcelUrl(){
			this.exportExcelUrl =  baseURL + '/company/transporter/export?Request-From=PC&Authorization=' + localStorage.getItem("token")	
			+ '&keyword=' + this.keyword 
			+ '&supercargoType=' + this.supercargoType.join(',')
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.supercargoID)
		},
		supercargoTypeChange(data) {
			this.supercargoType = data
			this.resetExportExcelUrl()
		},
		getList() {
			this.tableData = []
			Company.transporterFind({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.keyword,
				supercargoType: this.supercargoType.join(',')
			}).then(res => {
				const list = res.records.map(item => {
					return {
						supercargoID: item.supercargoID,
						realName: item.realName,
						mobile: item.mobile,
						supercargoType: item.supercargoType,
						expiredCertificate: item.expiredCertificate 
						? (item.expiredCertificate.indexOf(',') ? item.expiredCertificate.split(',') : [item.expiredCertificate]) : []
					}
				})
				this.tableData = list
				this.total = res.total
			})
		},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewsupercargo', query: { supercargoID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editsupercargo', query: { supercargoID: e.id}})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		view(supercargoID) {
			this.$router.push({name: 'viewsupercargo', query: { supercargoID }})
		},
		add() {
			this.$router.push({name: 'addsupercargo'})
		},
		del(supercargoID) {
			deleteConfirm(supercargoID, supercargoIDs => {
				Company.transporterDeleteBatch({ supercargoIDs }).then(res => {
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
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-right 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>
