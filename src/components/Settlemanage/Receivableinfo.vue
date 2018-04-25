<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">应收明细</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="mini">
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findshipperCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findconsigneeCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="发货时间">
						<el-date-picker v-model="findRangeDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false" @change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getDetail">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="exportExcelUrl" download="goodssource.xlsx" class="exportExcel el-icon-download">导出</a>
			</div>
			<div class="table">
				<el-table ref="recTable" :data="tableData" show-summary :summary-method="getSummaries" border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" fixed width="60"></el-table-column>
					<el-table-column label="发货日期" width="90" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.shipperDate">{{scope.row.shipperDate | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="发货单号" prop="consigneNum"></el-table-column>
					<el-table-column label="承运单号" prop="carrierOrderNo"></el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="派单日期" width="90" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="调度单号" prop="dispatchOrderNo"></el-table-column>
					<el-table-column label="签收日期" width="90" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.signTime">{{scope.row.signTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="车辆编号" prop="code"></el-table-column>
					<el-table-column label="车牌号码" prop="plateNo"></el-table-column>
					<el-table-column label="驾驶员" prop="realName"></el-table-column>
					<!-- <el-table-column label="核载吨位">
						<template slot-scope="scope">
							<span>{{scope.row.loads}}</span>
						</template>
					</el-table-column> -->
					<el-table-column label="收货地区" prop="consigneeArea" width="120"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress"></el-table-column>
					<!-- <el-table-column label="对外里程" prop="externalMile"></el-table-column> -->
					<!-- <el-table-column label="对外单价" prop="externalUnitPrice"></el-table-column> -->
					<el-table-column label="应收款" prop="receivables"></el-table-column>
					<el-table-column label="签收货量" width="100">
						<template slot-scope="scope">
							<span>
							{{scope.row.cargoWeight ? (scope.row.cargoWeight + '吨') : ''}}
							{{scope.row.cargoVolume ? ('/' + scope.row.cargoVolume + '方') : ''}}
							{{scope.row.cargoNum ? ('/' + scope.row.cargoNum + '件') : ''}}
							</span>
						</template>
					</el-table-column>
					<!-- <el-table-column label="外部运费" prop="externalFreight"></el-table-column> -->
					<el-table-column label="其他" prop="otherAmount"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="总计" prop="allmoney"></el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getDetail">
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
				exportExcelUrl: baseURL + '/export/finance/receivableDetail?Authorization=' + localStorage.getItem("token"),
				findRangeDate: [],
				findshipperBeginDate: '',
				findshipperEndDate: '',
				findshipperCompanyName: '',
				findconsigneeCompanyName: '',
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				tableData: []
			}
	},
	created() {
		this.getDetail()
	},
	methods: {
		reset() {
			this.findshipperCompanyName = '',
			this.findconsigneeCompanyName = '',
			this.findRangeDate = []
			this.findshipperBeginDate = ''
			this.findshipperEndDate = ''
			this.getDetail()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getDetail()
		},
		getDetail() {
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				shipperAreaID: this.$route.query.shipperAreaID || '',
				consigneeAreaID: this.$route.query.consigneeAreaID || '',
				shipperDetailAddress: this.$route.query.shipperDetailAddress || '',
				consigneeDetailAddress: this.$route.query.consigneeDetailAddress || '',
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate,
				shipperCompanyName: this.findshipperCompanyName,
				consigneeCompanyName: this.findconsigneeCompanyName
			}
			request({
				url: '/finance/receivableDetail',
				params
			}).then(res => {
				this.tableData = res.data.data.records
				this.count = res.data.data.total
			})
		},
		selectDateRange(date) {
			this.findshipperBeginDate = date[0]
			this.findshipperEndDate = date[1]
		},
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