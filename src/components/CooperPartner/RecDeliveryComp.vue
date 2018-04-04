<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">收发货单位</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="公司名称">
						<el-input placeholder="请输入..." v-model="findcompanyName"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input placeholder="请输入..." v-model="findcompanyArea"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input placeholder="请输入..." v-model="findcontactName"></el-input>
					</el-form-item>
					<el-form-item label="联系方式">
						<el-input placeholder="请输入..." v-model="findcontactPhone"></el-input>
					</el-form-item>
					<el-form-item label="录入时间">
						<el-date-picker
							v-model="findRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="timestamp"
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList(1)">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" @selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="公司名称" prop="companyName"></el-table-column>
					<el-table-column label="地址" prop="companyArea"></el-table-column>
					<el-table-column label="联系人" prop="contactName" width="100"></el-table-column>
					<el-table-column label="联系方式" prop="contactPhone" width="140"></el-table-column>
					<el-table-column label="录入时间" prop="createTime" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.createTime | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.customerID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.customerID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.customerID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{total}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize">
							<el-option label="10" value="10"></el-option>
							<el-option label="20" value="20"></el-option>
							<el-option label="30" value="30"></el-option>
							<el-option label="40" value="40"></el-option>
							<el-option label="50" value="50"></el-option>
							<el-option label="100" value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="total" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request from '../../common/request'
	export default {
		data() {
			return {
				findcompanyName: '',
				findcompanyArea: '',
				findcontactName: '',
				findcontactPhone: '',
				findRangeDate: [],
				findcreateTimeBegin: '',
				findcreateTimeEnd: '',
				pageIndex: 1,
				pageSize: 10,
				total:0,
				tableData: [],
				selectedList: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			reset() {
				this.findcompanyArea='',
				this.findcompanyName='',
				this.findcontactName='',
				this.findcontactPhone='',
				this.findcreateTimeBegin='',
				this.findcreateTimeEnd='',
				this.findRangeDate = [],
				this.pageIndex=1,
				this.getList()
			},
			pageChange(index) {
				this.pageIndex = index
				this.getList()
			},
			selectDateRange(date) {
				this.findcreateTimeBegin = date[0]
				this.findcreateTimeEnd = date[1]
			},
			selectionChange(data) {
				this.selectedList = data.map(item => item.customerID)
			},
			getList() {
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					companyArea:this.findcompanyArea,
					companyName:this.findcompanyName,
					contactName:this.findcontactName,
					contactPhone:this.findcontactPhone,
					createTimeBegin:this.findcreateTimeBegin,
					createTimeEnd:this.findcreateTimeEnd,
					type: 'ShipperConsignee',
				}
				request({
					url: '/customer/findList',
					params
				}).then(res => {
					console.log(res.data)
					this.tableData = res.data.data.records
					this.total= res.data.data.total
				})
			},
			add() { 
				this.$router.push({name: 'addrecdeliverycomp'})
			},
			handleCommand(e) {
				if(e.type=='view'){
					this.$router.push({name: 'viewrecdeliverycomp', query: { customerID:e.id }})
				}else if(e.type=='edit'){
					this.$router.push({ name: 'editrecdeliverycomp' , query: {  customerID:e.id } })
				}else if(e.type=='delete'){
					this.deleteConfirm(e.id)
				}
			},
			deleteConfirm(id) {
				let ids = ''
				if (id && typeof id == 'string') {
					ids = id
				} else {
					ids = this.selectedList.join(',')
				}
				console.log(ids)
				if(!ids) {
					Message({
						type: 'warning',
						message: '请选择'
					})
					return
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
			delItem(customerIDs) {
				console.log(customerIDs)
				let data = {
					customerIDs
				}
				request({
					url: '/customer/deleteBatch',
					method: 'post',
					data
				}).then(res => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					this.getList()
				})
			},
		}
	}
</script>
<style lang="stylus" scoped>

</style>