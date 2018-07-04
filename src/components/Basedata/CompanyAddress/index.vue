<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">企业地址</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="关键字">
						<el-input placeholder="姓名/手机号/地址" v-model="find.keyword"></el-input>
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
					<el-table-column label="所属企业" prop="unit" align="center"></el-table-column>
					<el-table-column label="联系人" prop="unit" align="center"></el-table-column>
					<el-table-column label="电话" prop="unit" align="center"></el-table-column>
					<el-table-column label="区域" prop="unit" align="center"></el-table-column>
					<el-table-column label="地址" prop="unit" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.Staff_ID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.Staff_ID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.Staff_ID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
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
import Page from '../../CommonComponents/Page'
import { deleteConfirm } from '../../../common/utils'
export default {
	data() {
		return {
			dialogFormVisible: false,
			find: { keyword: '', customerID: '', companyName: '' },
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
			this.find.unit = ''
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
			CargoUnit.find({
				current: this.pageIndex,
				size: this.pageSize,
				unit:this.find.unit,
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
        },
        handleCommand(e) {
			if(e.type == 'view'){
				this.$router.push({name: 'viewcompanyaddress', query: { Staff_ID: e.id }})
			}else if(e.type == 'edit'){
				this.$router.push({ name: 'editcompanyaddress' , query: {  Staff_ID: e.id } })
			}else if(e.type == 'delete'){
				this.del(e.id)
			}
		},
		add() { 
			this.$router.push({ name: 'addcompanyaddress' })
		},
		del(cargoUnitID) {
			deleteConfirm(cargoUnitID, cargoUnitIDs => {
				CargoUnit.del({ cargoUnitIDs }).then(res => {
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