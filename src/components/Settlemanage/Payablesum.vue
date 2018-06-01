<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">应付汇总</div>
			<el-tabs v-model="tabSelected" type="card" @tab-click="handleTabSelected">
				<el-tab-pane label="司机" name="driver"></el-tab-pane>
				<el-tab-pane label="随车人员" name="follower"></el-tab-pane>
			</el-tabs>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="司机姓名" v-if="tabSelected == 'driver'">
						<el-input placeholder="请输入..." v-model="findName" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="随车人员" v-else>
						<el-input placeholder="请输入..." v-model="findName" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="发货日期">
						<el-date-picker
							v-model="findRangeDate" 
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="timestamp" 
							:clearable="false"
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="exportExcelUrl" download="goodssource.xlsx" class="exportExcel el-icon-download">导出</a>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					show-summary :summary-method="getSummaries"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="司机姓名" prop="realName" align="center" v-if="tabSelected=='driver'"></el-table-column>
					<el-table-column label="随车人员" prop="realName" align="center" v-else></el-table-column>
					<el-table-column label="总趟数" align="center">
						<template slot-scope="scope">
							{{scope.row.count+''}}
						</template>
					</el-table-column>
					<el-table-column label="总货量" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.cargoNum?scope.row.cargoNum+'件':''}}{{scope.row.cargoNum?'/':''}}{{ scope.row.cargoVolume?scope.row.cargoVolume+'方':''}}{{scope.row.cargoVolume?'/':''}}{{scope.row.cargoWeight?scope.row.cargoWeight+'吨':''}}</span>
						</template>
					</el-table-column>
					<el-table-column label="运费" prop="freight" align="center" width="120"></el-table-column>
					<el-table-column label="绕路总里程" align="center" width="120">
						<template slot-scope="scope">
							{{scope.row.driverDetoursMileage?(scope.row.driverDetoursMileage+'KM'):''}}
						</template>
					</el-table-column>
					<el-table-column label="绕路费用" prop="driverDetoursAmount" align="center" width="120">
						<template slot-scope="scope">
							{{scope.row.driverDetoursAmount?scope.row.driverDetoursAmount:'0'}}
						</template>
					</el-table-column>
					<el-table-column label="其他费用" prop="driverOtherAmount" align="center" width="120">
						<template slot-scope="scope">
							{{scope.row.driverOtherAmount?scope.row.driverOtherAmount:'0'}}
						</template>
					</el-table-column>
					<el-table-column label="总计" prop="allMoney" align="center">
					</el-table-column>
					<el-table-column label="操作" align="center" width="60" fixed="right">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="view(scope.row.transportRecordID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request, { baseURL } from '../../common/request'
	import Finance from '../../api/Finance'
	import Page from '../CommonComponents/Page'
	export default {
		data() {
			return {
				exportExcelUrl: '',
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				findName:'',
				findRangeDate: [],
				findShipperBeginDate: '',
				findShipperEndDate: '',
				tableData: [],
				tabSelected: 'driver',
			}
		},
		components: {
			Page
		},
		created() {
			this.resetExportExcelUrl()
			this.getList()
		},
		methods: {
			pageChange(index) {
				this.pageIndex = index
				this.getList()
			},
			pageSizeChange(size) {
				this.pageSize = size
				this.getList() 
			},
			selectDateRange(date) {
				this.findShipperBeginDate = date[0]
				this.findShipperEndDate = date[1]
				this.resetExportExcelUrl()
			},
			reset() {
				this.findName = ''
				this.findShipperBeginDate = ''
				this.findShipperEndDate = ''
				this.findRangeDate = []
				this.resetExportExcelUrl()
				this.getList()
			},
			resetExportExcelUrl() {
				this.exportExcelUrl = baseURL + '/export/finance/payable?Authorization=' + localStorage.getItem("token") 
					+ '&name=' + this.findName 
					+ '&type=' + this.tabSelected 
					+ '&shipperBeginDate=' + this.findShipperBeginDate 
					+ '&shipperEndDate=' + this.findShipperEndDate
			},
			getList() {
				Finance.findPayablesum({
					'current': this.pageIndex,
					'size': this.pageSize,
					'name': this.findName,
					'type': this.tabSelected,
					'shipperBeginDate': this.findShipperBeginDate,
					'shipperEndDate': this.findShipperEndDate
				}).then(res => {
					this.tableData = res.records
					this.count = res.total
				})
			},
			handleTabSelected(tab) {
				this.tabSelected = tab.$options.propsData.name
				this.reset()
			},
			view(transportRecordID) {
				this.$router.push({name: 'payableinfo', query: {
					'type': this.tabSelected,
					'transportRecordID': transportRecordID,
					'shipperBeginDate': this.findShipperBeginDate,
					'shipperEndDate': this.findShipperEndDate
				}})
			},
			inputChange() {
				this.resetExportExcelUrl()
			}
		}
	}
</script>
<style lang="stylus" scoped>
.download-btn
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-right 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>