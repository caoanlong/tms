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
					<el-form-item label="司机姓名" v-show="tabSelected == 'driver'">
						<el-input placeholder="请输入..." v-model="findDriver"></el-input>
					</el-form-item>
					<el-form-item label="随车人员" v-show="tabSelected == 'follower'">
						<el-input placeholder="请输入..." v-model="findFollower"></el-input>
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
					v-show="tabSelected == 'driver'"
					ref="recTable" 
					:data="driverData" 
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="车辆牌号" prop="truckCode"></el-table-column>
					<el-table-column label="驾驶员" prop="driver"></el-table-column>
					<el-table-column label="总趟数" prop="totalNum" width="60"></el-table-column>
					<el-table-column label="总货量" prop="totalGoods"></el-table-column>
					<el-table-column label="运费" prop="freight" align="center" width="120"></el-table-column>
					<el-table-column label="绕路总里程" prop="roundWayTotalMile" align="center" width="120"></el-table-column>
					<el-table-column label="绕路费用" prop="roundWayFreight" align="center" width="120"></el-table-column>
					<el-table-column label="其他费用" prop="otherFreight" align="center" width="120"></el-table-column>
					<el-table-column label="总计">
						<template slot-scope="scope">
							<span>{{scope.row.freight + scope.row.roundWayFreight}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="60" fixed="right">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="viewinfo('driver')">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-table 
					v-show="tabSelected == 'follower'"
					ref="recTable" 
					:data="followerData" 
					border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="随车人员" prop="follower"></el-table-column>
					<el-table-column label="总趟数" prop="totalNum" width="60"></el-table-column>
					<el-table-column label="总里程" prop="totalMile"></el-table-column>
					<el-table-column label="总货量" prop="totalGoods"></el-table-column>
					<el-table-column label="运费" prop="freight" align="center" width="120"></el-table-column>
					<el-table-column label="绕路总里程" prop="roundWayTotalMile" align="center" width="120"></el-table-column>
					<el-table-column label="绕路费用" prop="roundWayFreight" align="center" width="120"></el-table-column>
					<el-table-column label="其他费用" prop="otherFreight" align="center" width="120"></el-table-column>
					<el-table-column label="总计">
						<template slot-scope="scope">
							<span>{{scope.row.freight + scope.row.roundWayFreight}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="120">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="viewinfo('follower')">查看明细</el-button>
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
				findDriver: '',
				findFollower: '',
				findConsignDate: [],
				startDate: '',
				endDate: '',
				pageIndex: 1,
				pageSize: 10,
				count: 87,
				tabSelected: 'driver',
				driverData: [
					{
						'truckCode': '云AG5836',
						'driver': '李金瑞',
						'totalNum': 11,
						'totalGoods': '107.52吨/10方/100件',
						'freight': 30302.09,
						'roundWayTotalMile': 1000,
						'roundWayFreight': 10000,
						'otherFreight': 0,
						'totalFreight': ''
					},
					{
						'truckCode': '云AG5836',
						'driver': '李金瑞',
						'totalNum': 11,
						'totalGoods': '107.52吨/10方/100件',
						'freight': 30302.09,
						'roundWayTotalMile': 1000,
						'roundWayFreight': 10000,
						'otherFreight': 0,
						'totalFreight': ''
					},
					{
						'truckCode': '云AG5836',
						'driver': '李金瑞',
						'totalNum': 11,
						'totalGoods': '107.52吨/10方/100件',
						'freight': 30302.09,
						'roundWayTotalMile': 1000,
						'roundWayFreight': 10000,
						'otherFreight': 0,
						'totalFreight': ''
					},
				],
				followerData: [
					{
						'truckCode': '云AG5836',
						'follower': '李押运',
						'totalNum': 11,
						'totalMile': 3125,
						'totalGoods': '107.52吨/10方/100件',
						'freight': 30302.09,
						'roundWayTotalMile': 1000,
						'roundWayFreight': 10000,
						'otherFreight': 0,
						'totalFreight': ''
					},
					{
						'truckCode': '云AG5836',
						'follower': '李押运',
						'totalNum': 11,
						'totalMile': 3125,
						'totalGoods': '107.52吨/10方/100件',
						'freight': 30302.09,
						'roundWayTotalMile': 1000,
						'roundWayFreight': 10000,
						'otherFreight': 0,
						'totalFreight': ''
					}
				]
			}
		},
		created() {
		},
		methods: {
			reset() {
				this.findDriver = ''
				this.findFollower = ''
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
			},
			handleTabSelected(tab) {
				console.log(tab.$options.propsData.name)
			},
			viewinfo(type) {
				this.$router.push({name: 'payableinfosimple', query: {type}})
			}
		}
	}
</script>
<style lang="stylus" scoped>

</style>