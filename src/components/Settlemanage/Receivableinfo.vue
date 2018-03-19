<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>应收明细</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findConsigner"></el-input>
					</el-form-item>
                    <el-form-item label="收货地">
						<el-input placeholder="请输入..." v-model="findReceiptArea"></el-input>
					</el-form-item>
                    <el-form-item label="地点">
						<el-input placeholder="请输入..." v-model="findAddress"></el-input>
					</el-form-item>
                    <el-form-item label="发货日期">
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
                <el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
                    show-summary 
                    :summary-method="getSummaries" 
					border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="发货日期" prop="consigneDate"></el-table-column>
					<el-table-column label="发货单号" prop="consigneNum"></el-table-column>
					<el-table-column label="承运单号" prop="carrierNum"></el-table-column>
					<el-table-column label="发货单位" prop="consigneCompany"></el-table-column>
					<el-table-column label="收货单位" prop="receiveCompany"></el-table-column>
					<el-table-column label="派单日期" prop="sendDate"></el-table-column>
					<el-table-column label="调度单号" prop="controlNum"></el-table-column>
					<el-table-column label="签收日期" prop="receiveDate"></el-table-column>
					<el-table-column label="车辆编号" prop="truckNum"></el-table-column>
					<el-table-column label="车牌号码" prop="truckCode"></el-table-column>
					<el-table-column label="驾驶员" prop="driver"></el-table-column>
					<el-table-column label="核载吨位" prop="loadNum"></el-table-column>
					<el-table-column label="地区" prop="area" width="120"></el-table-column>
					<el-table-column label="地点" prop="address"></el-table-column>
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
                findConsigner: '',
                findReceiptArea: '',
                findAddress: '',
                findConsignDate: [],
                startDate: '',
                endDate: '',
				pageIndex: 1,
				pageSize: 10,
                count: 87,
                tableData: [
                    {
                        'consigneDate': '2017-12-21',
                        'consigneNum': '2017110335',
                        'carrierNum': '2017120026',
                        'consigneCompany': '',
                        'receiveCompany': '安宁恒源爆破工程有限公司',
                        'sendDate': '2017-11-25',
                        'controlNum': '2017120068',
                        'receiveDate': '2018-01-24',
                        'truckNum': '5',
                        'truckCode': '云AE0699',
                        'driver': '董少云',
                        'loadNum': '9.99',
                        'area': '昆明市',
                        'address': '安宁',
                        'externalMile': '35',
                        'externalUnitPrice': '1.14TKM',
                        'receiveNum': '9.792吨',
                        'externalFreight': '390.7',
                        'other': '0',
                        'remark': '',
                        'totalNum': 390.7
                    },
                    {
                        'consigneDate': '2017-12-21',
                        'consigneNum': '2017110335',
                        'carrierNum': '2017120026',
                        'consigneCompany': '',
                        'receiveCompany': '安宁恒源爆破工程有限公司',
                        'sendDate': '2017-11-25',
                        'controlNum': '2017120068',
                        'receiveDate': '2018-01-24',
                        'truckNum': '5',
                        'truckCode': '云AE0699',
                        'driver': '董少云',
                        'loadNum': '9.99',
                        'area': '昆明市',
                        'address': '安宁',
                        'externalMile': '35',
                        'externalUnitPrice': '1.14TKM',
                        'receiveNum': '9.792吨',
                        'externalFreight': '390.7',
                        'other': '0',
                        'remark': '',
                        'totalNum': 390.7
                    },
                    {
                        'consigneDate': '2017-12-21',
                        'consigneNum': '2017110335',
                        'carrierNum': '2017120026',
                        'consigneCompany': '',
                        'receiveCompany': '安宁恒源爆破工程有限公司',
                        'sendDate': '2017-11-25',
                        'controlNum': '2017120068',
                        'receiveDate': '2018-01-24',
                        'truckNum': '5',
                        'truckCode': '云AE0699',
                        'driver': '董少云',
                        'loadNum': '9.99',
                        'area': '昆明市',
                        'address': '安宁',
                        'externalMile': '35',
                        'externalUnitPrice': '1.14TKM',
                        'receiveNum': '9.792吨',
                        'externalFreight': '390.7',
                        'other': '0',
                        'remark': '',
                        'totalNum': 390.7
                    }
                ]
			}
        },
		created() {
		},
		methods: {
            reset() {
                this.findConsigner = ''
                this.findReceiptArea = ''
                this.findAddress = ''
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
            }
		}
	}
</script>
<style lang="stylus" scoped>

</style>