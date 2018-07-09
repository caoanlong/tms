<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">应付明细</div>	
			<el-tabs v-model="tabSelected" type="card" @tab-click="handleTabSelected">
				<el-tab-pane label="司机" name="driver"></el-tab-pane>
				<el-tab-pane label="随车人员" name="follower"></el-tab-pane>
			</el-tabs>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="司机/随车人员">
						<el-input placeholder="请输入..." v-model="findName" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="车辆编号">
						<el-input placeholder="请输入..." v-model="findcode" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="车牌号码">
						<el-input placeholder="请输入..." v-model="findplateNo" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findshipperCompanyName" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findconsigneeCompanyName" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="发货日期">
						<el-date-picker 
							v-model="findRangeDate" 
							type="daterange" 
							range-separator="至" 
							value-format="timestamp" 
							start-placeholder="开始日期" 
							end-placeholder="结束日期" 
							:clearable="false" 
							@change="selectDateRange">
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
				<!-- 司机 -->
				<el-table 
					ref="recTable" :data="tableData"  show-summary :summary-method="getSummaries" border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					
					<el-table-column label="发货日期" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.shipperDate">{{scope.row.shipperDate | getdatefromtimestamp()}}</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="发货单号" align="center">
						<template slot-scope="scope">
							{{scope.row.shipperNo?(scope.row.shipperNo +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="调度单号" align="center">
						<template slot-scope="scope">
							{{scope.row.dispatchOrderNo?(scope.row.dispatchOrderNo +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="承运单号" align="center">
						<template slot-scope="scope">
							{{scope.row.carrierOrderNo?(scope.row.carrierOrderNo +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="派单日期" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">
								{{scope.row.createTime  | getdatefromtimestamp()}}
							</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="签收日期" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.signTime">
							{{scope.row.signTime | getdatefromtimestamp()}}</span>
							<span v-else></span>
						</template>
					</el-table-column>

					<el-table-column label="车辆编号" prop="code"></el-table-column>
					<el-table-column label="车牌号码" prop="plateNo" align="center" width="90"></el-table-column>
					<el-table-column :label="tabSelected == 'driver' ? '司机姓名' : '随车人员'" prop="realName" align="center"></el-table-column>
					<!-- <el-table-column label="随车人员" prop="followerRealName"></el-table-column> -->
					<!-- <el-table-column label="核载吨位" prop="loads" align="center">
						<template slot-scope="scope">
							{{scope.row.loads?(scope.row.loads +''):''}}
						</template>
					</el-table-column> -->
					<el-table-column label="收货地区" prop="consigneeArea"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress"></el-table-column>

					<el-table-column label="签收货量">
						<template slot-scope="scope">
							{{scope.row.cargoWeight?scope.row.cargoWeight+'吨/':''}}{{scope.row.cargoVolume?scope.row.cargoVolume+'方/':''}}{{scope.row.cargoNum?scope.row.cargoNum+'件':''}}
						</template>
					</el-table-column>
					<el-table-column label="运费" prop="freight" align="center">
						<template slot-scope="scope">
							{{scope.row.freight?scope.row.freight:''}}
						</template>
					</el-table-column>
					<el-table-column label="绕路里程" align="center">
						<template slot-scope="scope">
							{{scope.row.driverDetoursMileage?(scope.row.driverDetoursMileage +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="绕路费用" align="center">
						<template slot-scope="scope">
						{{scope.row.driverDetoursAmount?(scope.row.driverDetoursAmount +''):''}}
					</template>
					</el-table-column>
					<el-table-column label="其他" align="center">
						<template slot-scope="scope">
						{{scope.row.driverOtherAmount?(scope.row.driverOtherAmount +''):''}}
					</template>
					</el-table-column>
					<el-table-column label="备注"></el-table-column>
					<el-table-column label="总计" prop="allMoney" align="center" width="120"></el-table-column>
				</el-table>
				<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseURL } from '../../../common/request'
import Finance from '../../../api/Finance'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			exportExcelUrl: '',
			tabSelected: 'driver',
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: [],
			findRangeDate: [],
			findshipperBeginDate: '',
			findshipperEndDate: '',
			findplateNo: '',
			findName: '',
			findshipperCompanyName: '',
			findconsigneeCompanyName: '',
			findcode: '',
			transportRecordID: ''
		}
	},
	components: {
		Page
	},
	created() {
		let type = this.$route.query.type || ''
		let shipperBeginDate = this.$route.query.shipperBeginDate || ''
		let shipperEndDate = this.$route.query.shipperEndDate || ''
		let transportRecordID = this.$route.query.transportRecordID || ''
		this.tabSelected = type || this.tabSelected
		this.findRangeDate = (shipperBeginDate && shipperEndDate) ? [shipperBeginDate, shipperEndDate] : []
		this.findshipperBeginDate = shipperBeginDate
		this.findshipperEndDate = shipperEndDate
		this.transportRecordID = transportRecordID
		this.resetExportExcelUrl()
		this.getDetail()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getDetail()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getDetail() 
		},
		selectDateRange(date) {
			this.findshipperBeginDate = date[0]
			this.findshipperEndDate = date[1]
			this.resetExportExcelUrl()
		},
		reset() {
			this.findRangeDate = [],
			this.findshipperBeginDate = '',
			this.findshipperEndDate = '',
			this.findplateNo = '',
			this.findName = '',
			this.findshipperCompanyName = '',
			this.findconsigneeCompanyName = '',
			this.findcode = ''
			this.transportRecordID = ''
			this.resetExportExcelUrl()
			this.getDetail()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/export/finance/payableDetail?Authorization=' + localStorage.getItem("token") 
				+ '&name=' + this.findName 
				+ '&type=' + this.tabSelected 
				+ '&shipperBeginDate=' + this.findshipperBeginDate 
				+ '&shipperEndDate=' + this.findshipperEndDate 
				+ '&plateNo=' + this.findplateNo 
				+ '&shipperCompanyName=' + this.findshipperCompanyName 
				+ '&consigneeCompanyName=' + this.findconsigneeCompanyName 
				+ '&code=' + this.findcode 
				+ '&transportRecordID=' + this.transportRecordID
		},
		getDetail() {
			Finance.findPayableinfo({
				current: this.pageIndex,
				size: this.pageSize,
				name: this.findName,
				type: this.tabSelected,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate,
				plateNo: this.findplateNo,
				shipperCompanyName: this.findshipperCompanyName,
				consigneeCompanyName: this.findconsigneeCompanyName,
				code: this.findcode,
				transportRecordID: this.transportRecordID
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
		},
		handleTabSelected(tab) {
			this.tabSelected = tab.$options.propsData.name
			this.reset()
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
