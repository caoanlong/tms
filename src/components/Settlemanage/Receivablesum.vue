<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">应收汇总</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="托运人">
						<el-input placeholder="请输入..." v-model="findShipper"></el-input>
					</el-form-item>
                    <el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findConsigner"></el-input>
					</el-form-item>
                    <el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findReceipter"></el-input>
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
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="发货单位" prop="deliveryer"></el-table-column>
					<el-table-column label="收货单位" prop="receiver"></el-table-column>
					<el-table-column label="总趟次" prop="totalNum" width="80"></el-table-column>
					<el-table-column label="地区" prop="area" width="120"></el-table-column>
					<el-table-column label="地点" prop="address"></el-table-column>
					<el-table-column label="总货量" prop="totalGoods"></el-table-column>
					<el-table-column label="总运费" prop="money" align="center" width="120"></el-table-column>
					<el-table-column label="操作" align="center" width="60" fixed="right">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="viewinfo">查看</el-button>
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
	import request from '../../common/request'
	export default {
		data() {
			return {
                findShipper: '',
                findConsigner: '',
                findReceipter: '',
                findConsignDate: [],
                startDate: '',
                endDate: '',
				pageIndex: 1,
				pageSize: 10,
                count:0,
                tableData: []
			}
        },
		created() {
			this.getList()
		},
		methods: {
            reset() {
                this.findShipper = ''
                this.findConsignee = ''
                this.findConsignor = ''
                this.findConsignDate = []
                this.startDate = ''
                this.endDate = ''
                this.getList()
            },
            getList() {
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					shipper: this.findShipper,     //托运人
					consignee: this.findConsignee, //收货单位
					consignor: this.findConsignor  //发货单位
				}
				request({
					url: '/finance/receivable',
					params
				}).then(res => {
					console.log(res.data.data)
					this.tableData = res.data.data.records
					this.count = res.data.data.total
				})
			},
			pageChange(index) {
                this.pageIndex = index
            },
            selectDateRange(date) {
                this.startDate = date[0]
                this.endDate = date[1]
            },
            viewinfo() {
                this.$router.push({name: 'receivableinfosimple'})
            }
		}
	}
</script>
<style lang="stylus" scoped>

</style>