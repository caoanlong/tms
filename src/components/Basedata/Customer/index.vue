<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">收发货单位</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="企业">
						<el-input placeholder="名称/手机号" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="类型" class="customerSelect">
						<el-select v-model="find.customerType" placeholder="请选择">
							<el-option value="Shipper" label="发货单位"></el-option>
							<el-option value="Consignee" label="收货单位"></el-option>
							<el-option value="ShipperConsignee" label="收发货单位"></el-option>
						</el-select>
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
					:data="tableData" @selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="企业名称" prop="companyName"></el-table-column>
					<el-table-column label="地区" prop="companyArea"></el-table-column>
					<el-table-column label="类型" prop="customerType" width="120">
						<template slot-scope="scope">
							<span v-if="scope.row.customerType == 'Shipper'">发货单位</span>
							<span v-else-if="scope.row.customerType == 'Consignee'">收货单位</span>
							<span v-else-if="scope.row.customerType == 'ShipperConsignee'">收发货单位</span>
						</template>
					</el-table-column>
					<el-table-column label="联系人" prop="contactName" width="100"></el-table-column>
					<el-table-column label="手机" prop="contactPhone" width="140"></el-table-column>
					<el-table-column label="TA的地址" prop="customerAddressNum" width="140">
						<template slot-scope="scope">
							<span :class="{'link': Number(scope.row.customerAddressNum) > 0}" @click="viewAddress(scope.row)">{{scope.row.customerAddressNum + '个地址'}}</span>
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'address', data: scope.row}">地址</el-dropdown-item>
									<el-dropdown-item :command="{type: 'view', id:scope.row.customerID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.customerID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.customerID}" >删除</el-dropdown-item>
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
import Page from '../../CommonComponents/Page'
import { deleteConfirm } from '../../../common/utils'
export default {
	data() {
		return {
			find: {
				keyword: '',
				customerType: ''
			},
			pageIndex: 1,
			pageSize: 10,
			total:0,
			tableData: [],
			selectedList: []
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
			this.find.keyword = ''
			this.find.customerType = ''
			this.pageIndex = 1
			this.pageSize = 10
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
		getList() {
			Customer.find({
				current: this.pageIndex,
				size: this.pageSize,
				customerType: this.find.customerType,
				keyword: this.find.keyword
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
		},
		add() { 
			this.$router.push({name: 'addrecdeliverycomp'})
		},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewrecdeliverycomp', query: { customerID: e.id }})
			} else if (e.type == 'edit') {
				this.$router.push({ name: 'editrecdeliverycomp' , query: {  customerID: e.id } })
			} else if (e.type == 'address') {
				this.$router.push({ name: 'companyaddress' , query: {  customerID: e.data.customerID, companyName: e.data.companyName } })
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		viewAddress(data) {
			this.$router.push({ name: 'companyaddress' , query: {  customerID: data.customerID, companyName: data.companyName } })
		},
		del(customerID) {
			deleteConfirm(customerID, customerIDs => {
				Customer.del({ customerIDs }).then(res => {
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