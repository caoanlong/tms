<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">企业地址</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="联系人">
						<el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input placeholder="关键字" v-model="find.address"></el-input>
					</el-form-item>
                    <el-form-item label="所属企业">
                        <el-autocomplete  style="width:100%"
                            value-key="companyName" 
                            v-model="find.companyName"
                            :fetch-suggestions="getCompanys"
                            placeholder="请输入..."
                            @select="handSelect">
                        </el-autocomplete>
                    </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
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
					<el-table-column label="所属企业" prop="companyName" align="center"></el-table-column>
					<el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
					<el-table-column label="电话" prop="contactPhone" align="center"></el-table-column>
					<el-table-column label="区域" prop="contactArea" align="center"></el-table-column>
					<el-table-column label="地址" prop="detailAddress" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.customerAddressID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.customerAddressID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.customerAddressID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<el-dialog title="添加货物单位" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="单位名称" label-width="80px">
					<el-input placeholder="请输入货物单位" auto-complete="off" v-model="unit"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import CargoUnit from '../../../api/CargoUnit'
import Customer from '../../../api/Customer'
import CustomerAddress from '../../../api/CustomerAddress'
import Page from '../../CommonComponents/Page'
import { deleteConfirm } from '../../../common/utils'
export default {
	data() {
		return {
			dialogFormVisible: false,
			find: { keyword: '', address: '', customerID: '', companyName: '' },
			unit: '',
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
	created() {
		const customerID = this.$route.query.customerID
		const companyName = this.$route.query.companyName
		if (customerID) this.find.customerID = customerID
		if (companyName) this.find.companyName = companyName
		this.getList()
	},
	methods: {
        getCompanys(queryString, cb) {
			Customer.find({
				type: 'ShipperConsignee',
				companyName: queryString
			}).then(res => {
				cb(res.records)
			})
        },
        handSelect(data){
			this.find.customerID = data.customerID
			this.find.companyName = data.companyName
		},
		reset() {
			this.find.keyword = ''
			this.find.address = ''
			this.find.customerID = ''
			this.find.companyName = ''
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
			this.selectedList = data.map(item => item.cargoUnitID)
			console.log(this.selectedList)
		},
		getList() {
			CustomerAddress.find({
				current: this.pageIndex,
				size: this.pageSize,
				contactName: this.find.keyword,
				detailAddress: this.find.address,
				customerID: this.find.customerID
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
        },
        handleCommand(e) {
			if(e.type == 'view'){
				this.$router.push({name: 'viewcompanyaddress', query: { customerAddressID: e.id }})
			}else if(e.type == 'edit'){
				this.$router.push({ name: 'editcompanyaddress' , query: { customerAddressID: e.id } })
			}else if(e.type == 'delete'){
				this.del(e.id)
			}
		},
		add() { 
			this.$router.push({ name: 'addcompanyaddress' })
		},
		del(customerAddressID) {
			deleteConfirm(customerAddressID, customerAddressIDs => {
				CustomerAddress.del({ customerAddressIDs }).then(res => {
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