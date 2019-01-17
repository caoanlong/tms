<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">用户管理</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="工号">
						<el-input placeholder="工号" v-model="find.jobNumber" @input="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="员工">
						<el-input placeholder="员工名字" v-model="find.realName" @input="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="手机号">
						<el-input placeholder="手机号" v-model="find.mobile" @input="inputChange"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button 
					type="default" 
					size="mini" 
					icon="el-icon-plus" 
					@click="$router.push({ name: 'adduser' })" v-if="permissions[$route.name]['add']">
					添加
				</el-button>
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
				<a :href="exportExcelUrl" class="exportExcel el-icon-download"> 导出</a>
                <a :href="templateUrl" download="deliveryorder.xlsx" class="download-btn">
					<svg-icon iconClass="excel-icon"></svg-icon>下载模板
				</a>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="手机号" prop="mobile" align="center"></el-table-column>
					<el-table-column label="姓名" prop="realName" align="center"></el-table-column>
					<el-table-column label="状态" prop="isPrevent" align="center">
						<template slot-scope="scope">
							<el-tag type="success" size="mini" v-if="scope.row.isPrevent == 'N'">正常</el-tag>
							<el-tag type="danger" size="mini" v-else-if="scope.row.isPrevent == 'Y'">停用</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="工号" prop="jobNumber" align="center"></el-table-column>
					<el-table-column label="归属" prop="organizationName" align="center"></el-table-column>
					<el-table-column label="职位" prop="jobPosition" align="center"></el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'edit', id: scope.row.memberID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.memberID}">删除</el-dropdown-item>
									<el-dropdown-item :command="{type: 'reset', member: scope.row}">重置</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<reset :isVisible="isResetVisible" :curUser="curUser" @control="handReset"></reset>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { baseURL } from '../../../common/request'
import { baseMixin } from '../../../common/mixin'
import SysMember from '../../../api/SysMember'
import Reset from './components/Reset'
import { deleteConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin],
	data() {
		return {
			isResetVisible: false,
			curUser: null,
			find: {
				jobNumber: '',
				mobile: '',
				realName: ''
			},
			uploadHeaders: {'Authorization': localStorage.getItem('token'),'Request-From':'PC'},
			importFileUrl: baseURL 
				+ '/sys/mem/import?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token"),
			exportExcelUrl: '',
			templateUrl: baseURL 
				+ '/base/filetemplate/downLoadTemplate?fileName=member.xlsx&Authorization=' 
				+ localStorage.getItem("token")
		}
	},
	components: { Reset },
	computed: {
		...mapGetters(['permissions'])
	},
	created() {
		this.resetExportExcelUrl()
		if(this.$route.query.cache) {
			this.getList()
		}
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	methods: {
		reset() {
			this.find.jobNumber = ''
			this.find.mobile = ''
			this.find.realName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL 
				+ '/sys/mem/export?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token")	
				+ '&jobNumber=' + this.find.jobNumber 
				+ '&mobile=' + this.find.mobile
				+ '&realName=' + this.find.realName
		},
		inputChange() {
			this.resetExportExcelUrl()
        },
		getList() {
			SysMember.find({
				current: this.pageIndex,
				size: this.pageSize,
				jobNumber: this.find.jobNumber,
				mobile: this.find.mobile,
				realName: this.find.realName
			}).then(res => {
				this.total = res.total
				this.tableData = res.records
			})
		},
		handReset() {
			this.isResetVisible = false
		},
		handleCommand(e) {
			if(e.type == 'edit'){
				this.$router.push({name: 'edituser', query: { memberID: e.id }})
			} else if (e.type == 'reset') {
				this.curUser = e.member
				this.isResetVisible = true
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		del(memberID) {
			deleteConfirm(memberID, memberID => {
				SysMember.del({ memberID }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			})
		},
		// 导入成功
		uploadSuccess (response) {
			if(response.code != 200){
				Message.error(response.msg)
			} else{
				Message.success(response.msg)
				this.getList()
			}
		}
	}
}
</script>
<style lang="stylus" scoped>
.el-row
    margin-bottom 20px
    &:last-child
    	margin-bottom 0
.el-col
	border-radius 4px
.download-btn
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
.upload-File
	display inline-block
	margin 0 10px
</style>
