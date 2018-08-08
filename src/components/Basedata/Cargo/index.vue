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
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
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
									<el-dropdown-item :command="{type: 'edit', id: scope.row.cargoNameID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.cargoNameID}" >删除</el-dropdown-item>
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
			selectedList: []
		}
	},
	components: {
		Page
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
		this.getList()
	},
	methods: {
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		reset() {
			sessionStorage.removeItem('pageIndex')
			sessionStorage.removeItem('pageSize')
			sessionStorage.removeItem('find')
			this.find.shipperCompanyName = ''
			this.find.cargoName = ''
			this.pageIndex = 1
			this.pageSize = 10
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
			this.selectedList = data.map(item => item.cargoNameID)
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
			if (e.type == 'edit') {
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