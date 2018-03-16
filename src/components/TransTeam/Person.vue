<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>人员管理</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="姓名">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input placeholder="请输入..." v-model="findMobile"></el-input>
					</el-form-item>
					<el-form-item label="评级">
						<el-select v-model="findLevel" placeholder="请选择">
							<el-option label="A" value="A"></el-option>
							<el-option label="AA" value="AA"></el-option>
							<el-option label="AAA" value="AAA"></el-option>
							<el-option label="AAAA" value="AAAA"></el-option>
							<el-option label="AAAAA" value="AAAAA"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="岗位">
						<el-select v-model="findPost" placeholder="请选择">
							<el-option label="操作员" value="操作员"></el-option>
							<el-option label="操作员、驾驶员" value="操作员、驾驶员"></el-option>
							<el-option label="操作员、押运员" value="操作员、押运员"></el-option>
							<el-option label="驾驶员" value="驾驶员"></el-option>
							<el-option label="其他人员" value="其他人员"></el-option>
							<el-option label="押运员" value="押运员"></el-option>
							<el-option label="押运员、驾驶员" value="押运员、驾驶员"></el-option>
							<el-option label="专职安全员、操作员" value="专职安全员、操作员"></el-option>
							<el-option label="装卸管理人员" value="装卸管理人员"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="时间">
						<el-date-picker
							v-model="findDate"
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
				<el-button type="default" size="mini" icon="el-icon-plus">导入</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					border style="width: 100%" size="mini">
					<el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="姓名" prop="name"></el-table-column>
					<el-table-column label="性别" prop="sex"></el-table-column>
					<el-table-column label="聘用岗位" prop="post" width="100"></el-table-column>
					<el-table-column label="身份证号" prop="cardId" width="160"></el-table-column>
					<el-table-column label="创建人" prop="creater"></el-table-column>
					<el-table-column label="状态" prop="status"></el-table-column>
					<el-table-column label="审核人" prop="auditor"></el-table-column>
					<el-table-column label="审核日期" prop="auditDate" width="140"></el-table-column>
					<el-table-column label="准驾车型" prop="quasiDrivingModel"></el-table-column>
					<el-table-column label="驾驶证审验有效期至" prop="driverLicTo" width="140"></el-table-column>
					<el-table-column label="从业资格证件号" prop="qualifCerNum" width="160"></el-table-column>
					<el-table-column label="从业资格类别" prop="qualifCerType" width="150"></el-table-column>
					<el-table-column label="从业资格证有效期至" prop="qualifCerValidTo" width="140"></el-table-column>
					<el-table-column label="初次发证件时间" prop="initCerDate" width="140"></el-table-column>
					<el-table-column label="诚信考核等级" prop="integrityLevel" width="100"></el-table-column>
					<el-table-column label="诚信考核有效期至" prop="integrityValidTo" width="140"></el-table-column>
					<el-table-column label="合同有效期起" prop="contractValidFrom" width="140"></el-table-column>
					<el-table-column label="合同有效期至" prop="contractValidTo" width="140"></el-table-column>
					<el-table-column label="职称或技术等级" prop="techLevel" width="120"></el-table-column>
					<el-table-column label="联系电话" prop="mobile" width="100"></el-table-column>
					<el-table-column label="家庭地址" prop="familyAddress" width="140"></el-table-column>
					<el-table-column label="备注说明" prop="remark" width="140"></el-table-column>
					<el-table-column label="添加时间" prop="createTime" width="140"></el-table-column>
					<el-table-column label="操作" fixed="right" align="center" width="230">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="view">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="edit">编辑</el-button>
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
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				findName: '',
				findMobile: '',
				findLevel: '',
				findPost: '',
				findDate: [],
				startDate: '',
				endDate: '',
				pageIndex: 1,
				pageSize: 10,
				count: 87,
				tableData: [
					{
						"name": "刘贵权",
						"sex": "男",
						"post": "押运员",
						"cardId": "530128197203081814",
						"creater": "胡大江",
						"status": "审核通过",
						"auditor": "李华",
						"auditDate": "2017-04-27 10:20:25",
						"quasiDrivingModel": "A2",
						"driverLicTo": "2018-05-31 00:00:00",
						"qualifCerNum": "530128197203081814",
						"qualifCerType": "道路危险货物运输押运人员;爆炸品道路运输押运员",
						"qualifCerValidTo": "2022-07-20 00:00:00",
						"initCerDate": "2014-12-24 00:00:00",
						"integrityLevel": "AA级",
						"integrityValidTo": "2018-04-30 00:00:00",
						"contractValidFrom": "2015-01-16 00:00:00",
						"contractValidTo": "2018-12-31 00:00:00",
						"techLevel": "无",
						"mobile": "13700631861",
						"familyAddress": "安宁市太平镇西仪村",
						"remark": "7液硝",
						"createTime": "2018-03-01 17:41"
					},
					{
						"name": "陈宇",
						"sex": "男",
						"post": "操作员;押运员",
						"cardId": "530128197203081814",
						"creater": "胡大江",
						"status": "审核通过",
						"auditor": "李华",
						"auditDate": "2017-04-27 10:20:25",
						"quasiDrivingModel": "A2",
						"driverLicTo": "2018-05-31 00:00:00",
						"qualifCerNum": "530128197203081814",
						"qualifCerType": "道路危险货物运输押运人员;爆炸品道路运输押运员",
						"qualifCerValidTo": "2022-07-20 00:00:00",
						"initCerDate": "2014-12-24 00:00:00",
						"integrityLevel": "AA级",
						"integrityValidTo": "2018-04-30 00:00:00",
						"contractValidFrom": "2015-01-16 00:00:00",
						"contractValidTo": "2018-12-31 00:00:00",
						"techLevel": "无",
						"mobile": "13700631861",
						"familyAddress": "安宁市太平镇西仪村",
						"remark": "7液硝",
						"createTime": "2018-03-01 17:41"
					},
					{
						"name": "郜培志",
						"sex": "男",
						"post": "驾驶员",
						"cardId": "530128197203081814",
						"creater": "张金元",
						"status": "审核通过",
						"auditor": "李华",
						"auditDate": "2017-04-27 10:20:25",
						"quasiDrivingModel": "A2",
						"driverLicTo": "2018-05-31 00:00:00",
						"qualifCerNum": "530128197203081814",
						"qualifCerType": "道路危险货物运输押运人员;爆炸品道路运输押运员",
						"qualifCerValidTo": "2022-07-20 00:00:00",
						"initCerDate": "2014-12-24 00:00:00",
						"integrityLevel": "AA级",
						"integrityValidTo": "2018-04-30 00:00:00",
						"contractValidFrom": "2015-01-16 00:00:00",
						"contractValidTo": "2018-12-31 00:00:00",
						"techLevel": "无",
						"mobile": "13700631861",
						"familyAddress": "安宁市太平镇西仪村",
						"remark": "7液硝",
						"createTime": "2018-03-01 17:41"
					}
				]
			}
		},
		created() {
		},
		methods: {
			reset() {
				this.findName = ''
				this.findMobile = ''
				this.findLevel = ''
				this.findPost = ''
				this.findDate = []
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
				this.$router.push({name: 'addperson'})
			},
			view() {
				this.$router.push({name: 'viewperson'})
			},
			edit() {
				this.$router.push({name: 'editperson'})
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