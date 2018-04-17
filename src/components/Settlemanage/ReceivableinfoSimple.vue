<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">应收明细</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="发货地区">
						<DistPicker @selectChange="handleSelectedArea" class="normal" :selected="selectedArea"/>
					</el-form-item>
					<el-form-item label="收货地区">
						<DistPicker @selectChange="handleSelectedArea1" class="normal" :selected="selectedArea1"/>
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
				<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
			</div>
			<div class="table">
				<el-table ref="recTable" :data="tableData" show-summary :summary-method="getSummaries" border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" fixed width="60"></el-table-column>
					<el-table-column label="发货日期" width="90" align="center">
						<template slot-scope="scope" v-if="scope.row.shipperDate">
							{{scope.row.shipperDate | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="发货单号" prop="consigneNum"></el-table-column>
					<el-table-column label="承运单号" prop="carrierOrderNo"></el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="派单日期" width="90" align="center">
						<template slot-scope="scope" v-if="scope.row.createTime">
							{{scope.row.createTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="调度单号" prop="dispatchOrderNo"></el-table-column>
					<el-table-column label="签收日期" width="90" align="center">
						<template slot-scope="scope" v-if="scope.row.signTime">
							{{scope.row.signTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="车辆编号" prop="code"></el-table-column>
					<el-table-column label="车牌号码" prop="plateNo"></el-table-column>
					<el-table-column label="驾驶员" prop="realName"></el-table-column>
					<el-table-column label="核载吨位" prop="loads"></el-table-column>
					<el-table-column label="收货地区" prop="consigneeArea" width="120"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress"></el-table-column>
					<el-table-column label="对外里程" prop="externalMile"></el-table-column>
					<el-table-column label="对外单价" prop="externalUnitPrice"></el-table-column>
					<el-table-column label="签收货量" prop="receiveNum"></el-table-column>
					<el-table-column label="外部运费" prop="externalFreight"></el-table-column>
					<el-table-column label="其他" prop="other"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="总计" prop="totalNum" align="center" width="120"></el-table-column>
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
import DistPicker from '../CommonComponents/DistPicker'
import request from '../../common/request'
export default {
	data() {
		return {
			selectedArea:'',
			selectedArea1:'',
			findshipperAreaID: '',
			findconsigneeAreaID: '',
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
		this.getDetail()
	},
	methods: {
		reset() {
			this.selectedArea = ''
			this.selectedArea1 = ''
			this.findRangeDate = []
			this.findshipperBeginDate = ''
			this.findshipperEndDate = ''
		},
		pageChange(index) {
			this.pageIndex = index
			this.getDetail()
		},
		getDetail() {
			let params = {
				shipperAreaID: this.selectedArea || this.$route.query.shipperAreaID,
				consigneeAreaID: this.selectedArea1 || this.$route.query.consigneeAreaID,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate
			}
			request({
				url: '/finance/receivableDetail',
				params
			}).then(res => {
				console.log(res.data.data)
				this.tableData = res.data.data.records
				this.count = res.data.data.total
			})
		},
		selectDateRange(date) {
			this.findshipperBeginDate = date[0]
			this.findshipperEndDate = date[1]
		},
		handleSelectedArea(data) {
			this.findshipperAreaID = data
		},
		handleSelectedArea1(data) {
			this.findconsigneeAreaID = data
		}
	},
	components: {
		DistPicker
	}
}

</script>
<style lang="stylus" scoped>


</style>
