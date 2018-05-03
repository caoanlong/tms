<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">应收汇总</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="mini">
					<el-form-item label="发货时间">
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
				<el-table ref="recTable" :data="tableData" show-summary :summary-method="getSummaries" border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<!-- <el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column> -->
					<el-table-column label="发货地区" prop="area" width="120">
						<template slot-scope="scope">
							{{scope.row.shipperAreaID | searchAreaByKey()}}
						</template>
					</el-table-column>
					<el-table-column label="发货详细地址" prop="shipperDetailAddress"></el-table-column>
					<!-- <el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column> -->
					<el-table-column label="收货地区">
						<template slot-scope="scope">
							{{scope.row.consigneeAreaID | searchAreaByKey()}}
						</template>
					</el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress"></el-table-column>
					<el-table-column label="总趟次" width="80" align="center">
						<template slot-scope="scope">
							{{scope.row.countDispatchOrder +''}}
						</template>
					</el-table-column>
					<el-table-column label="总货量" align="center">
						<template slot-scope="scope">
							<span>
							{{scope.row.cargoWeight ? (scope.row.cargoWeight + '吨'):''}}
							{{scope.row.cargoVolume ? ('/' + scope.row.cargoVolume + '方'):''}}
							{{scope.row.cargoNum ? '/' + scope.row.cargoNum + '件':''}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="总运费" prop="money" align="center" width="120"></el-table-column>
					<el-table-column label="操作" align="center" width="60" fixed="right">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList">
							<el-option label="10" :value="10"></el-option>
							<el-option label="20" :value="20"></el-option>
							<el-option label="30" :value="30"></el-option>
							<el-option label="40" :value="40"></el-option>
							<el-option label="50" :value="50"></el-option>
							<el-option label="100" :value="100"></el-option>
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
import request, { baseURL } from '../../common/request'
export default {
	data() {
		return {
			exportExcelUrl: '',
			findRangeDate: [],
			findshipperBeginDate: '',
			findshipperEndDate: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: []
		}
	},
	created() {
		this.findRangeDate = [new Date().getTime() - 3600000 * 24 * 30, new Date().getTime()]
		this.findshipperBeginDate = new Date().getTime() - 3600000 * 24 * 30
		this.findshipperEndDate = new Date().getTime()
		this.resetExportExcelUrl()
		this.getList()
	},
	methods: {
		reset() {
			this.findRangeDate = []
			this.findshipperBeginDate = ''
			this.findshipperEndDate = ''
			this.resetExportExcelUrl()
			this.getList()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/export/finance/receivable?Authorization=' + localStorage.getItem("token") 
				+ '&shipperBeginDate=' + this.findshipperBeginDate 
				+ '&shipperEndDate=' + this.findshipperEndDate
		},
		getList() {
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate
			}
			request({
				url: '/finance/receivable',
				params
			}).then(res => {
				this.tableData = res.data.data.records
				this.count = res.data.data.total
			})
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		selectDateRange(date) {
			this.findshipperBeginDate = date[0]
			this.findshipperEndDate = date[1]
			this.resetExportExcelUrl()
		},
		view(data) {
			this.$router.push({ name: 'receivableinfo', query: { 
				'shipperAreaID': data.shipperAreaID,
				'consigneeAreaID': data.consigneeAreaID,
				'shipperDetailAddress': data.shipperDetailAddress,
				'consigneeDetailAddress': data.consigneeDetailAddress,
				'shipperBeginDate': this.findshipperBeginDate,
				'shipperEndDate': this.findshipperEndDate
			}})
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
