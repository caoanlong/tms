<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">车辆</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="车牌号">
						<el-input placeholder="请输入..." v-model="findPlateNum"></el-input>
					</el-form-item>
					<el-form-item label="车辆编号">
						<el-input placeholder="请输入..." v-model="findTruckNum"></el-input>
					</el-form-item>
					<el-form-item label="牵引质量">
						<el-input placeholder="请输入..." v-model="findTowMass"></el-input>
					</el-form-item>
					<el-form-item label="车长">
						<el-select v-model="findTruckLength" placeholder="请选择">
							<el-option label="5米" value="5"></el-option>
							<el-option label="8米" value="8"></el-option>
							<el-option label="10米" value="10"></el-option>
							<el-option label="12米" value="12"></el-option>
							<el-option label="15米" value="15"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车宽">
						<el-select v-model="findTruckWidth" placeholder="请选择">
							<el-option label="2米" value="2"></el-option>
							<el-option label="3米" value="3"></el-option>
							<el-option label="4米" value="4"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车高">
						<el-select v-model="findTruckHeight" placeholder="请选择">
							<el-option label="2米" value="2"></el-option>
							<el-option label="3米" value="3"></el-option>
							<el-option label="4米" value="4"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日期">
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
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="所属地区" prop="area"></el-table-column>
					<el-table-column label="所属企业" prop="company"></el-table-column>
					<el-table-column label="自编号" prop="selfNum"></el-table-column>
					<el-table-column label="车牌号" prop="plateNum"></el-table-column>
					<el-table-column label="车牌颜色" prop="plateColor"></el-table-column>
					<el-table-column label="车辆类别" prop="plateType"></el-table-column>
					<el-table-column label="车辆类型" prop="plateClass"></el-table-column>
					<el-table-column label="道路运输证号" prop="roadTransNum" width="120"></el-table-column>
					<el-table-column label="经营范围" prop="businessScope"></el-table-column>
					<el-table-column label="道路运输证年审期至" prop="roadTransYearTo" width="140"></el-table-column>
					<el-table-column label="行驶证审验效期至" prop="driverLicTo" width="140"></el-table-column>
					<el-table-column label="承运人责任险有效期至" prop="carrierValid" width="150"></el-table-column>
					<el-table-column label="等级评定" prop="levelEval" width="100"></el-table-column>
					<el-table-column label="下次等评日期" prop="nextLevelEvalDate" width="100"></el-table-column>
					<el-table-column label="二级维护日期" prop="secondMaintainDate" width="100"></el-table-column>
					<el-table-column label="下次二级维护日期" prop="nextSecondMaintainDate" width="140"></el-table-column>
					<el-table-column label="载重" prop="load" width="100"></el-table-column>
					<el-table-column label="罐体类型" prop="tankType" width="100"></el-table-column>
					<el-table-column label="罐体容积" prop="tankVolume" width="100"></el-table-column>
					<el-table-column label="罐体检测有效期至" prop="tankTestValidTo" width="140"></el-table-column>
					<el-table-column label="安全阀检测有效期至" prop="safetyTestValidTo" width="140"></el-table-column>
					<el-table-column label="压力表检测有效期至" prop="pressureTestValidTo" width="140"></el-table-column>
					<el-table-column label="挂车车牌" prop="trailerPlate" width="100"></el-table-column>
					<el-table-column label="汽车生产厂家" prop="truckManufacturer" width="100"></el-table-column>
					<el-table-column label="品牌型号" prop="brandModel" width="100"></el-table-column>
					<el-table-column label="发动机号" prop="engineNum" width="100"></el-table-column>
					<el-table-column label="车架号" prop="frameNum" width="100"></el-table-column>
					<el-table-column label="行驶证注册日期" prop="driverLicRgDate" width="100"></el-table-column>
					<el-table-column label="行驶证发证日期" prop="driverLicAwDate" width="100"></el-table-column>
					<el-table-column label="牵引质量" prop="towMass" width="100"></el-table-column>
					<el-table-column label="车长" prop="truckLength" width="100"></el-table-column>
					<el-table-column label="车宽" prop="truckWidth" width="100"></el-table-column>
					<el-table-column label="车高" prop="truckHeight" width="100"></el-table-column>
					<el-table-column label="添加时间" prop="createTime" width="140"></el-table-column>
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
	export default {
		data() {
			return {
				findPlateNum: '',
				findTruckNum: '',
				findTowMass: '',
				findTruckLength: '',
				findTruckWidth: '',
				findTruckHeight: '',
				findDate: [],
				startDate: '',
				endDate: '',
				pageIndex: 1,
				pageSize: 10,
				count: 87,
				tableData: [
					{
						"area": "安宁市",
						"company": "云南安化中达物流有限责任公司",
						"selfNum": "6-1",
						"plateNum": "云AD3875",
						"plateColor": "黄",
						"plateType": "牵引车",
						"plateClass": "重型半挂牵引车",
						"roadTransNum": "530181012183",
						"businessScope": "危险货物运输(5类1项)",
						"roadTransYearTo": "2018年6月30日",
						"driverLicTo": "2018年8月31日",
						"carrierValid": "2018年8月13日",
						"levelEval": "一级",
						"nextLevelEvalDate": "2018年7月27日",
						"secondMaintainDate": "2017年11月9日",
						"nextSecondMaintainDate": "2018年3月31日",
						"load": "40000.000",
						"tankType": "",
						"tankVolume": "",
						"tankTestValidTo": "",
						"safetyTestValidTo": "",
						"pressureTestValidTo": "",
						"trailerPlate": "云A3229挂",
						"truckManufacturer": "东风汽车有限公司",
						"brandModel": "东风牌DFL4251A10",
						"engineNum": "",
						"frameNum": "",
						"driverLicRgDate": "2012年8月7日",
						"driverLicAwDate": "2012年8月7日",
						"towMass": "25000",
						"truckLength": "6810",
						"truckWidth": "2500",
						"truckHeight": "3700",
						"createTime": "2018-03-01 17:41"
					},
					{
						"area": "安宁市",
						"company": "云南安化中达物流有限责任公司",
						"selfNum": "6-1",
						"plateNum": "云AD3875",
						"plateColor": "黄",
						"plateType": "牵引车",
						"plateClass": "重型半挂牵引车",
						"roadTransNum": "530181012183",
						"businessScope": "危险货物运输(5类1项)",
						"roadTransYearTo": "2018年6月30日",
						"driverLicTo": "2018年8月31日",
						"carrierValid": "2018年8月13日",
						"levelEval": "一级",
						"nextLevelEvalDate": "2018年7月27日",
						"secondMaintainDate": "2017年11月9日",
						"nextSecondMaintainDate": "2018年3月31日",
						"load": "40000.000",
						"tankType": "",
						"tankVolume": "",
						"tankTestValidTo": "",
						"safetyTestValidTo": "",
						"pressureTestValidTo": "",
						"trailerPlate": "云A3229挂",
						"truckManufacturer": "东风汽车有限公司",
						"brandModel": "东风牌DFL4251A10",
						"engineNum": "",
						"frameNum": "",
						"driverLicRgDate": "2012年8月7日",
						"driverLicAwDate": "2012年8月7日",
						"towMass": "25000",
						"truckLength": "6810",
						"truckWidth": "2500",
						"truckHeight": "3700",
						"createTime": "2018-03-01 17:41"
					},
				]
			}
		},
		created() {
		},
		methods: {
			reset() {
				this.findPlateNum = ''
				this.findTruckNum = ''
				this.findTowMass = ''
				this.findTruckLength = ''
				this.findTruckWidth = ''
				this.findTruckHeight = ''
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
			handleCommand(e) {
				if(e.type == 'view'){
					this.$router.push({name: 'viewtruck', query: { transporPriceID: e.id }})
				} else if(e.type == 'edit'){
					this.$router.push({ name: 'edittruck' , query: { transporPriceID: e.id }})
				} else if (e.type == 'delete') {
					this.deleteConfirm(e.id)
				}
			},
			add() {
				this.$router.push({name: 'addtruck'})
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