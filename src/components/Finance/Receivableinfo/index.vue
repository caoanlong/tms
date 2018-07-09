<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">应收明细</div>	
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="mini">
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findshipperCompanyName" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findconsigneeCompanyName" @change="inputChange"></el-input>
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
					<el-table-column label="发货单号" prop="shipperNo"></el-table-column>
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
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request, { baseURL } from '../../../common/request'
import Finance from '../../../api/Finance'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			exportExcelUrl: '',
			findRangeDate: [],
			findshipperBeginDate: '',
			findshipperEndDate: '',
			findshipperCompanyName: '',
			findconsigneeCompanyName: '',
			shipperDetailAddress: '',
			consigneeDetailAddress: '',
			shipperAreaID: '',
			consigneeAreaID: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: []
		}
	},
	components: {
		Page
	},
	created() {
		let shipperBeginDate = this.$route.query.shipperBeginDate
		let shipperEndDate = this.$route.query.shipperEndDate
		let shipperDetailAddress = this.$route.query.shipperDetailAddress
		let consigneeDetailAddress = this.$route.query.consigneeDetailAddress
		let shipperAreaID = this.$route.query.shipperAreaID
		let consigneeAreaID = this.$route.query.consigneeAreaID
		this.findRangeDate = (shipperBeginDate && shipperEndDate) ? [shipperBeginDate, shipperEndDate] : []
		this.findshipperBeginDate = shipperBeginDate || ''
		this.findshipperEndDate = shipperEndDate || ''
		this.shipperDetailAddress = shipperDetailAddress || ''
		this.consigneeDetailAddress = consigneeDetailAddress || ''
		this.shipperAreaID = shipperAreaID || ''
		this.consigneeAreaID = consigneeAreaID || ''
		this.resetExportExcelUrl()
		this.getDetail()
	},
	methods: {
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/export/finance/receivableDetail?Authorization=' + localStorage.getItem("token") 
				+ '&shipperAreaID=' + this.shipperAreaID 
				+ '&consigneeAreaID=' + this.consigneeAreaID 
				+ '&shipperDetailAddress=' + this.shipperDetailAddress 
				+ '&consigneeDetailAddress=' + this.consigneeDetailAddress 
				+ '&shipperBeginDate=' + this.findshipperBeginDate 
				+ '&shipperEndDate=' + this.findshipperEndDate 
				+ '&shipperCompanyName=' + this.findshipperCompanyName 
				+ '&consigneeCompanyName=' + this.findconsigneeCompanyName
		},
		reset() {
			this.findshipperCompanyName = '',
			this.findconsigneeCompanyName = '',
			this.findRangeDate = []
			this.findshipperBeginDate = ''
			this.findshipperEndDate = ''
			this.shipperAreaID = ''
			this.consigneeAreaID = ''
			this.shipperDetailAddress = ''
			this.consigneeDetailAddress = ''
			this.resetExportExcelUrl()
			this.getDetail()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getDetail()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getDetail() 
		},
		getDetail() {
			Finance.findReceivableinfo({
				current: this.pageIndex,
				size: this.pageSize,
				shipperAreaID: this.shipperAreaID,
				consigneeAreaID: this.consigneeAreaID,
				shipperDetailAddress: this.shipperDetailAddress,
				consigneeDetailAddress: this.consigneeDetailAddress,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate,
				shipperCompanyName: this.findshipperCompanyName,
				consigneeCompanyName: this.findconsigneeCompanyName
			}).then(res => {
				this.tableData = res.records
				this.count = res.total
			})
		},
		selectDateRange(date) {
			this.findshipperBeginDate = date[0]
			this.findshipperEndDate = date[1]
			this.resetExportExcelUrl()
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