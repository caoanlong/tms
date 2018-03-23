<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">收发货单位</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="公司名称">
						<el-input placeholder="请输入..." v-model="findCompany"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input placeholder="请输入..." v-model="findAddress"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input placeholder="请输入..." v-model="findContacts"></el-input>
					</el-form-item>
					<el-form-item label="联系方式">
						<el-input placeholder="请输入..." v-model="findContactMethod"></el-input>
					</el-form-item>
					<el-form-item label="录入时间">
						<el-date-picker
							v-model="findConsignDate"
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
					<el-table-column label="地址" prop="address"></el-table-column>
					<el-table-column label="联系人" prop="contacts" width="100"></el-table-column>
					<el-table-column label="联系方式" prop="contactMethod" width="140"></el-table-column>
					<el-table-column label="录入时间" prop="typeTime" width="140"></el-table-column>
					<el-table-column label="操作" align="center" width="230">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-edit" @click="edit">编辑查看</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.$index)">删除</el-button>
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
	export default {
		data() {
			return {
				findCompany: '',
				findAddress: '',
				findContacts: '',
				findContactMethod: '',
				findConsignDate: [],
				startDate: '',
				endDate: '',
				pageIndex: 1,
				pageSize: 10,
				count: 87,
				tableData: [
					{
						'companyName': '安宁恒源爆破工程有限公司',
						'address': '云南省红河州蒙自县',
						'contacts': '王芳',
						'contactMethod': '13049497395',
						'typeTime': '2018-01-23'
					},
					{
						'companyName': '安宁恒源爆破工程有限公司',
						'address': '云南省红河州蒙自县',
						'contacts': '王芳',
						'contactMethod': '13049497395',
						'typeTime': '2018-01-23'
					}
				]
			}
		},
		created() {
		},
		methods: {
			reset() {
				this.findCompany = ''
				this.findAddress = ''
				this.findContacts = ''
				this.findContactMethod = ''
				this.findConsignDate = []
				this.startDate = ''
				this.endDate = ''
			},
			pageChange(index) {
				this.pageIndex = index
			},
			selectDateRange(date) {
				this.startDate = new Date(date[0]).getTime()
				this.endDate = new Date(date[1]).getTime()
			},
			add() {
				this.$router.push({name: 'addrecdeliverycomp'})
			},
			edit() {
				this.$router.push({name: 'editrecdeliverycomp'})
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