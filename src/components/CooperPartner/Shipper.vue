<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">托运人</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="公司名称">
						<el-input placeholder="请输入..." v-model="findCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="地址">

						<el-input placeholder="请输入..." v-model="findCompanyArea"></el-input>
					</el-form-item>
					<el-form-item label="联系人">

						<el-input placeholder="请输入..." v-model="findContactName"></el-input>
					</el-form-item>
					<el-form-item label="联系方式">

						<el-input placeholder="请输入..." v-model="findContactPhone"></el-input>
					</el-form-item>
					<el-form-item label="录入时间">
						<el-date-picker

							v-model="findRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="公司名称" prop="companyName"></el-table-column>

					<el-table-column label="地址" prop="companyArea"></el-table-column>
					<el-table-column label="联系人" prop="contactName" width="100"></el-table-column>
					<el-table-column label="联系方式" prop="contactPhone" width="140"></el-table-column>
					<el-table-column label="录入时间" prop="createTime" width="140"></el-table-column>

					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">

							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view'}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit'}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete'}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
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
	import request from '../../common/request'
	export default {
		data() {
			return {

				findCompanyName: '',
				findCompanyArea: '',
				findContactName: '',
				findContactPhone: '',
				findRangeDate: [],
				findCreateTimeBeginStr: '',
				findCreateTimeEndStr: '',
				pageIndex: 1,
				pageSize: 10,
				count: 87,
				tableData: [
					{
						'customerID': '1',
						'companyName': '安宁恒源爆破工程有限公司',

						'companyArea': '云南省红河州蒙自县',
						'detailAddress': '大新街道',
						'contactName': '王芳',
						'contactPhone': '13049497395',
						'createTime': '2018-01-23'
					},
					{
						'customerID': '2',
						'companyName': '安宁恒源爆破工程有限公司',

						'companyArea': '云南省红河州蒙自县',
						'detailAddress': '南头街道',
						'contactName': '王芳',
						'contactPhone': '13049497395',
						'createTime': '2018-01-23'
					}
				]
			}
		},
		created() {
			this.getList()
		},
		methods: {
			reset() {

				this.findCompanyName = ''
				this.findCompanyArea = ''
				this.findContactName = ''
				this.findContactPhone = ''
				this.findRangeDate = []
				this.findCreateTimeBeginStr = ''
				this.findCreateTimeEndStr = ''
			},
			pageChange(index) {
				this.pageIndex = index
			},
			selectDateRange(date) {

				this.findCreateTimeBeginStr = new Date(date[0]).getTime()
				this.findCreateTimeEndStr = new Date(date[1]).getTime()
			},
			getList(pageIndex) {
				let data = {
					current: pageIndex,
					size: this.pageSize,
					companyArea: this.findCompanyArea,
					companyName: this.findCompanyName,
					contactName: this.findContactName,
					contactPhone: this.findContactPhone,
					createTimeBeginStr: this.findCreateTimeBeginStr,
					createTimeEndStr: this.findCreateTimeEndStr,
					isConsignor: 'Y',
				}
				request({
					url: '/customer/findList',
					data
				}).then(res => {
					console.log(res.data)
					this.tableData = res.data.data
				})
			},
			add() {
				this.$router.push({name: 'addshipper'})
			},
			edit() {
				this.$router.push({name: 'editshipper'})
			},
			deleteConfirm(i) {
				console.log(i)
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData.splice(i, 1)
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>

</style>