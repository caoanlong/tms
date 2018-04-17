<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">运费模板</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findShipperCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="发货地">
						<el-input placeholder="请输入..." v-model="findShipperArea"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findConsigneeCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="收货地">
						<el-input placeholder="请输入..." v-model="findConsigneeArea"></el-input>
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
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="发货地" prop="shipperArea" width="100"></el-table-column>
					<el-table-column label="发货详细地址" prop="shipperDetailAddress" width="100"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="收货地" prop="consigneeArea" width="100"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress" width="100"></el-table-column>
					<el-table-column label="对内运距" prop="mileage"></el-table-column>
					<el-table-column label="对内运价" prop="internalPrice"></el-table-column>
					<el-table-column label="对内TKM" prop="internalUnitPrice"></el-table-column>
					<el-table-column label="对外运距" prop="externalMileage"></el-table-column>
					<el-table-column label="对外运价" prop="externalPrice"></el-table-column>
					<el-table-column label="对外TKM" prop="externalUnitPrice"></el-table-column>
					<el-table-column label="对内月结比率" prop="internalAbschlussRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.internalAbschlussRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内现付比率" prop="internalCashRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.internalCashRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内到付比率" prop="internalCodRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.internalCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内收货方到付比率" prop="internalConsigneeCodRate" width="140">
						<template slot-scope="scope">
							{{(scope.row.internalConsigneeCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内回单比率" prop="internalPorRate" width="140">
						<template slot-scope="scope">
							{{(scope.row.internalPorRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外月结比率" prop="externalAbschlussRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.externalAbschlussRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外现付比率" prop="externalCashRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.externalCashRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外到付比率" prop="externalCodRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.externalCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外收货方到付比率" prop="externalConsigneeCodRate" width="140">
						<template slot-scope="scope">
							{{(scope.row.externalConsigneeCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外回单比率" prop="externalPorRate" width="140">
						<template slot-scope="scope">
							{{(scope.row.externalPorRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.transporPriceID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.transporPriceID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.transporPriceID}">删除</el-dropdown-item>
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
				findConsigneeArea: '',
				findConsigneeCompanyName: '',
				findShipperArea: '',
				findShipperCompanyName: '',
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				selectedList: [],
				tableData: [],
				importFileUrl: baseURL + '/transportPrice/upload',
				uploadHeaders: {'Authorization': localStorage.getItem('token')},
				templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=freight.xls&&Authorization=' +localStorage.getItem("token"),
				templateTit:'freight.xls'
			}
		},
		created() {
			this.getList()
		},
		methods: {
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
					consigneeArea: this.findConsigneeArea,
					consigneeCompanyName: this.findConsigneeCompanyName,
					shipperArea: this.findShipperArea,
					shipperCompanyName: this.findShipperCompanyName
				}
				request({
					url: '/transportPrice/findList',
					params
				}).then(res => {
					this.tableData = res.data.data.records
					this.count = res.data.data.total
				})
			},
			reset() {
				this.findConsigneeArea = ''
				this.findConsigneeCompanyName = ''
				this.findShipperArea = ''
				this.findShipperCompanyName = ''
				this.getList()
			},
			pageChange(index) {
				this.pageIndex = index
			},
			selectionChange(data) {
				this.selectedList = data.map(item => item.transporPriceID)
			},
			handleCommand(e) {
				if(e.type == 'view'){
					this.$router.push({name: 'viewsettleconfig', query: { transporPriceID: e.id }})
				} else if(e.type == 'edit'){
					this.$router.push({ name: 'editsettleconfig' , query: { transporPriceID: e.id }})
				} else if (e.type == 'delete') {
					this.deleteConfirm(e.id)
				}
			},
			add() {
				this.$router.push({name: 'addsettleconfig'})
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
			delItem(transporPriceIDs) {
				let data = {
					transporPriceIDs
				}
				request({
					url: '/transportPrice/deleteBatch',
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