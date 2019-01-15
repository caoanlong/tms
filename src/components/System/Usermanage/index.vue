<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">用户管理</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="员工">
						<el-input placeholder="工号/名字/手机号" v-model="find.keyword" @input="inputChange"></el-input>
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
					@click="$router.push({ name: 'adduser' })">
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
					<el-table-column label="手机号" prop="mobile"></el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="状态" prop="status"></el-table-column>
					<el-table-column label="工号" prop="workNo"></el-table-column>
					<el-table-column label="归属" prop="in"></el-table-column>
					<el-table-column label="职位" prop="position"></el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope" v-if="!scope.row.registerMemberFlag">
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
				keyword: ''
			},
			uploadHeaders: {'Authorization': localStorage.getItem('token'),'Request-From':'PC'},
			importFileUrl: baseURL 
				+ '/deliveryOrder/import?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token"),
			exportExcelUrl:'',
			templateUrl: baseURL 
				+ '/base/filetemplate/downLoadTemplate?fileName=deliveryorder.xlsx&Authorization=' 
				+ localStorage.getItem("token")
		}
	},
	components: { Reset },
	created() {
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	methods: {
		reset() {
			this.find.keyword = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/deliveryOrder/export?Request-From=PC&Authorization=' + localStorage.getItem("token")	
			+ '&code=' + this.find.code 
			+ '&companyCode=' + this.find.companyCode
			+ '&dealerCode=' + this.find.dealerCode 
			+ '&cargoCode=' + this.find.cargoCode
			+ '&level=' + this.find.level
			+ '&plateNo=' + this.find.plateNo
			+ '&verifyFlag=' + this.find.verifyFlag
			+ '&cargoName=' + this.find.cargoName
			+ '&comeFrom=' + this.find.comeFrom
			+ '&outTimeBegin=' + this.find.outTimeBegin
			+ '&outTimeEnd=' + this.find.outTimeEnd
		},
		inputChange() {
			this.resetExportExcelUrl()
        },
		getList() {
			SysMember.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword
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
				this.$router.push({name: 'edituser', query: { userId: e.id }})
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
