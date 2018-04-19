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
							
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
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
				<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
			</div>
			<div class="table">
				<el-table 
					v-show="tabSelected == 'driver'"
					ref="recTable" 
					:data="driverData" 
					show-summary :summary-method="getSummaries"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="车辆牌号" prop="plateNo" align="center"></el-table-column>
					<el-table-column label="司机姓名" prop="realName" align="center"></el-table-column>
					<el-table-column label="总趟次" align="center">
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
							{{scope.row.driverDetoursAmount?scope.row.driverDetoursAmount:''}}
						</template>
					</el-table-column>
					<el-table-column label="其他费用" prop="driverOtherAmount" align="center" width="120">
						<template slot-scope="scope">
							{{scope.row.driverOtherAmount?scope.row.driverOtherAmount:''}}
						</template>
					</el-table-column>
					<el-table-column label="总计" prop="allMoney" align="center">
					</el-table-column>
					<el-table-column label="操作" align="center" width="60" fixed="right">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="viewinfo('driver',scope.row.transportRecordID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-table 
					v-show="tabSelected == 'follower'"
					ref="recTable" 
					:data="followerData" 
					border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="随车人员" prop="realName" align="center"></el-table-column>
					<el-table-column label="总趟数" prop="count" width="60" align="center"></el-table-column>
					<el-table-column label="总里程" prop="totalMile" align="center"></el-table-column>
					<el-table-column label="总趟数" prop="count" align="center"></el-table-column>
					<el-table-column label="总货量" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.cargoNum?scope.row.cargoNum+'件':''}}{{scope.row.cargoNum?'/':''}}{{ scope.row.cargoVolume?scope.row.cargoVolume+'方':''}}{{scope.row.cargoVolume?'/':''}}{{scope.row.cargoWeight?scope.row.cargoWeight+'吨':''}}</span>
						</template>
					</el-table-column>
					<el-table-column label="运费" prop="freight" align="center" width="120"></el-table-column>
					<el-table-column label="绕路总里程" prop="driverDetoursMileage" align="center" width="120"></el-table-column>
					<el-table-column label="绕路费用" prop="driverDetoursAmount" align="center" width="120"></el-table-column>
					<el-table-column label="其他费用" prop="driverOtherAmount" align="center" width="120"></el-table-column>
					<el-table-column label="总计" prop="allMoney" align="center">
					</el-table-column>
					<el-table-column label="操作" align="center" width="60">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="viewinfo('follower',scope.row.transportRecordID)">查看</el-button>
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
	import request from '../../common/request'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				findName:'',
				driverData:[],
				followerData:[],
				tabSelected:'driver',
				findDriver:'',
				findFollower:''
			}
		},
		created() {
			this.getList()
		},
		methods: {
			reset() {

			},
			getList() {
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					name: this.findDriver,
					type:this.tabSelected
				}
				request({
					url: '/finance/payable',
					params
				}).then(res => {
					if(this.tabSelected=='driver'){
						this.driverData = res.data.data.records
						this.count = res.data.data.total
					}else{
						this.followerData = res.data.data.records
						this.count = res.data.data.total
					}
				})
			},
			pageChange(index) {
				this.pageIndex = index
				this.getList()
			},
			selectDateRange(date) {
				this.startDate = date[0]
				this.endDate = date[1]
			},
			handleTabSelected(tab) {
				
				this.tabSelected = tab.$options.propsData.name
				console.log(this.tabSelected)
				this.getList()
			},
			viewinfo(type,transportRecordID) {
				this.$router.push({name: 'payableinfosimple', query: {type:type,transportRecordID:transportRecordID}})
			}
		}
	}
</script>
<style lang="stylus" scoped>

</style>