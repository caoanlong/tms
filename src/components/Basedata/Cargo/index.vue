<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">常用货物</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="企业名称">
						<el-input placeholder="请输入..." v-model="find.shipperCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="货物名称">
						<el-input placeholder="请输入..." v-model="find.cargoName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-upload 
					class="upload-File" 
					name="excelFile" 
					:data="{'type': 'Consignor'}" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess" 
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2">导入货物</el-button>
				</el-upload>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
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
									<el-dropdown-item :command="{type: 'view', id: scope.row.cargoNameID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.cargoNameID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.cargoNameID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseURL } from '../../../common/request'
import Customer from '../../../api/Customer'
import CargoGeneralName from '../../../api/CargoGeneralName'
import Page from '../../CommonComponents/Page'
import { deleteConfirm } from '../../../common/utils'
export default {
	data() {
		return {
			find: {
				shipperCompanyName: '',
				cargoName: ''
			},
			pageIndex: 1,
			pageSize: 10,
			total:0,
			tableData: [],
			selectedList: [],
			importFileUrl: baseURL + '/customer/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=shipperAndConsignor.xlsx&&Authorization=' +localStorage.getItem("token"),
			templateTit:'shipperAndConsignor.xlsx'
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
			this.find.shipperCompanyName = ''
			this.find.cargoName = ''
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
			this.selectedList = data.map(item => item.customerID)
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
			CargoGeneralName.find({
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
			if (e.type == 'view') {
				this.$router.push({name: 'viewcargo', query: { cargoNameID: e.id }})
			} else if (e.type == 'edit') {
				this.$router.push({ name: 'editcargo' , query: {  cargoNameID: e.id } })
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		del(cargoNameID) {
			deleteConfirm(cargoNameID, cargoNameIDs => {
				CargoGeneralName.del({ cargoNameIDs }).then(res => {
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