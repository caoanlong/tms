<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">货物</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="企业名称">
						<el-autocomplete 
							style="width:100%" 
                            value-key="companyName" 
                            v-model="find.shipperCompanyName"
                            :fetch-suggestions="getCompanys"
                            placeholder="请输入..."
                            @select="handSelect" @change="inputChange">
							<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelect"></i>
                        </el-autocomplete>
					</el-form-item>
					<el-form-item label="货物名称">
						<el-input placeholder="请输入..." v-model="find.cargoName" @change="inputChange"></el-input>
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
				<a :href="exportExcelUrl" download="goodssource.xlsx" class="exportExcel el-icon-download">导出</a>
				<a :href="templateUrl" download="goodssource.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="企业名称" prop="shipperCompanyName" align="center"></el-table-column>
					<el-table-column label="货物名称" prop="cargoName" align="center"></el-table-column>
					<el-table-column label="品名表名称" prop="productName" align="center"></el-table-column>
					<el-table-column label="货物类型" prop="cargoType" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.cargoType == 'FMCG'">快消品</span>
							<span v-else-if="scope.row.cargoType == 'Cement'">水泥</span>
							<span v-else-if="scope.row.cargoType == 'Beer'">啤酒</span>
							<span v-else-if="scope.row.cargoType == 'DangerousCargo'">危险品</span>
						</template>
					</el-table-column>
					<el-table-column label="包装单位" prop="cargoUnit" align="center" width="70"></el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.cargoID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.cargoID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.cargoID}" >删除</el-dropdown-item>
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
import Company from '../../../api/Company'
import { baseMixin } from '../../../common/mixin'
import { baseURL } from '../../../common/request'
import { deleteConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin], 
	data() {
		return {
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			importFileUrl: baseURL + '/company/cargo/import',
			exportExcelUrl: '',
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=goodssource.xlsx&Authorization=' + localStorage.getItem("token"),
			find: {
				shipperCompanyName: '',
				cargoName: ''
			}
		}
	},
	beforeRouteLeave(to, from, next) {
		if (to.name == 'editcargo') {
			sessionStorage.setItem('pageIndex', this.pageIndex)
			sessionStorage.setItem('pageSize', this.pageSize)
			sessionStorage.setItem('find', JSON.stringify(this.find))
		} else {
			sessionStorage.removeItem('pageIndex')
			sessionStorage.removeItem('pageSize')
			sessionStorage.removeItem('find')
		}
		next()
	},
	created() {
		const pageIndex = sessionStorage.getItem('pageIndex')
		const pageSize = sessionStorage.getItem('pageSize')
		this.pageIndex = pageIndex ? Number(pageIndex) : 1
		this.pageSize = pageSize ? Number(pageSize) : 10
		this.find = JSON.parse(sessionStorage.getItem('find')) || { shipperCompanyName: '', cargoName: '' }
		this.resetExportExcelUrl()
		this.getList()
	},
	methods: {
		getCompanys(queryString, cb) {
			Company.customer().suggest({
				companyName: queryString
			}).then(res => { cb(res) })
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/company/cargo/export?Authorization=' + localStorage.getItem("token")
				+ '&shipperCompanyName=' + this.find.shipperCompanyName
				+ '&cargoName=' + this.find.cargoName
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
        handSelect(data){
			this.find.shipperCompanyName = data.companyName
			this.resetExportExcelUrl()
		},
		clearSelect(){
			this.find.shipperCompanyName =''
		},
		reset() {
			sessionStorage.removeItem('pageIndex')
			sessionStorage.removeItem('pageSize')
			sessionStorage.removeItem('find')
			this.find.shipperCompanyName = ''
			this.find.cargoName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.resetExportExcelUrl()
			this.getList()
		},
		pageChange(index) {
			sessionStorage.removeItem('pageIndex')
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			sessionStorage.removeItem('pageSize')
			this.pageSize = size
			this.pageIndex = 1
			this.getList() 
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.cargoID)
		},
		getList() {
			Company.cargo().find({
				current: this.pageIndex,
				size: this.pageSize,
				shipperCompanyName: this.find.shipperCompanyName,
				cargoName: this.find.cargoName
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
		},
		add() { 
			this.$router.push({ name: 'addcargo' })
		},
		handleCommand(e) {
			if (e.type == 'edit') {
				this.$router.push({ name: 'editcargo' , query: {  cargoID: e.id } })
			} else if (e.type == 'delete') {
				this.del(e.id)
			} else{
				this.$router.push({ name: 'viewcargo' , query: {  cargoID: e.id } })
			}
		},
		del(cargoNameID) {
			deleteConfirm(cargoNameID, cargoNameIDs => {
				Company.cargo().delBatch({ cargoNameIDs }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			}, this.selectedList)
		},
		// 导入成功
		uploadSuccess (response) {
			if(response.code != 200){
				Message.error(response.msg)
			} else {
				Message.success(response.msg)
				this.getList()
			}
		}
	}
}
</script>
<style lang="stylus" scoped>
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