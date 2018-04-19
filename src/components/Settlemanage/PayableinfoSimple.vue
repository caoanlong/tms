<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">个人应付详情</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="收货人">
						<el-input placeholder="请输入..." ></el-input>
					</el-form-item>
					<el-form-item label="地点">
						<el-input placeholder="请输入..." ></el-input>
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
						<el-button type="primary">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
			</div>
			<div class="table">
				<!-- 司机 -->
				<el-table 
					v-if="tabSelected == 'driver'" ref="recTable" :data="driverData"  show-summary :summary-method="getSummaries" border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					
					<el-table-column label="发货日期" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.shipperDate">{{scope.row.shipperDate  | getdatefromtimestamp()}}</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="发货单号">
						<template slot-scope="scope">
							{{scope.row.shipperNo?(scope.row.shipperNo +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="调度单号">
						<template slot-scope="scope">
							{{scope.row.dispatchOrderNo?(scope.row.dispatchOrderNo +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="承运单号">
						<template slot-scope="scope">
							{{scope.row.carrierOrderNo?(scope.row.carrierOrderNo +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="派单日期">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">
								{{scope.row.createTime  | getdatefromtimestamp()}}
							</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="签收日期">
						<template slot-scope="scope">
							<span v-if="scope.row.signTime">
							{{scope.row.signTime | getdatefromtimestamp()}}</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="车辆编号" prop="code"></el-table-column>
					<el-table-column label="车牌号码" prop="plateNo"></el-table-column>
					<el-table-column label="司机姓名" prop="realName" align="center"></el-table-column>
					<el-table-column label="核载吨位" prop="loads">
						<template slot-scope="scope">
							{{scope.row.loads?(scope.row.loads +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="收货地区" prop="consigneeArea"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress"></el-table-column>

					<el-table-column label="签收货量">
						<template slot-scope="scope">
							{{scope.row.cargoWeight?scope.row.cargoWeight+'吨/':''}}{{scope.row.cargoVolume?scope.row.cargoVolume+'方/':''}}{{scope.row.cargoNum?scope.row.cargoNum+'件':''}}
						</template>
					</el-table-column>
					<el-table-column label="运费" prop="freight">
						<template slot-scope="scope">
							{{scope.row.freight?scope.row.freight:''}}
						</template>
					</el-table-column>
					<el-table-column label="绕路里程">
						<template slot-scope="scope">
							{{scope.row.driverDetoursMileage?(scope.row.driverDetoursMileage +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="绕路费用">
						<template slot-scope="scope">
						{{scope.row.DriverDetoursAmount?(scope.row.DriverDetoursAmount +''):''}}
					</template>
					</el-table-column>
					<el-table-column label="其他">
						<template slot-scope="scope">
						{{scope.row.DriverOtherAmount?(scope.row.DriverOtherAmount +''):''}}
					</template>
					</el-table-column>
					<el-table-column label="备注"></el-table-column>
					<el-table-column label="总计" prop="allMoney" align="center" width="120"></el-table-column>
				</el-table>
				<el-row type="flex" v-if="tabSelected == 'driver'">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{total}} 条记录每页显示</span>
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
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="total" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
				<!-- 随车人员 -->
				<el-table 
					v-if="tabSelected == 'follower'"
					ref="recTable" 
					:data="followerData" 
					show-summary 
					:summary-method="getSummaries" 
					border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="随车人员" prop="realName"></el-table-column>
					<el-table-column label="驾驶员" prop="driver"></el-table-column>
					<el-table-column label="发货日期" prop="consigneDate"></el-table-column>
					<el-table-column label="发货单号" prop="consigneNum"></el-table-column>
					<el-table-column label="调度单号" prop="controlNum"></el-table-column>
					<el-table-column label="承运单号" prop="carrierNum"></el-table-column>
					<el-table-column label="发货单位" prop="consigneCompany"></el-table-column>
					<el-table-column label="收货单位" prop="receiveCompany"></el-table-column>
					<el-table-column label="派单日期" prop="sendDate"></el-table-column>
					<el-table-column label="签收日期" prop="receiveDate"></el-table-column>
					<el-table-column label="车辆编号" prop="truckNum"></el-table-column>
					<el-table-column label="车牌号码" prop="truckCode"></el-table-column>
					<el-table-column label="核载吨位" prop="loadNum"></el-table-column>
					<el-table-column label="地区" prop="area" width="120"></el-table-column>
					<el-table-column label="地点" prop="address"></el-table-column>
					<el-table-column label="签收货量" prop="receiveNum"></el-table-column>
					<el-table-column label="运费" prop="innerFreight"></el-table-column>
					<el-table-column label="绕路里程" prop="roundWayMile"></el-table-column>
					<el-table-column label="绕路费用" prop="roundWayFreight"></el-table-column>
					<el-table-column label="其他" prop="other"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="总计" prop="totalNum" align="center" width="120"></el-table-column>
				</el-table>
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
				tabSelected:this.$route.query.type,
				pageIndex: 1,
				pageSize: 10,
				total:0,
				driverData: [],
				followerData: []
			}
		},
		created() {
			this.getDetail()
		},
		methods: {
			reset() {
				this.findDriver = ''
				this.findFollower = ''
				this.findTruckCode = ''
				this.findTruckNum = ''
				this.findReceiver = ''
				this.findAddress = ''
				this.findConsignDate = []
				this.startDate = ''
				this.endDate = ''
			},
			getDetail() {
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					name: this.findDriver,
					type:this.tabSelected
				}
				request({
					url: '/finance/payableDetail',
					params
				}).then(res => {
					if(this.tabSelected=='driver'){
						this.driverData = res.data.data.records
						this.total = res.data.data.total
					}else{
						this.followerData = res.data.data.records
						this.total = res.data.data.total
					}
				})
			},
			pageChange(index) {
				this.pageIndex = index
				this.getDetail()
			},
			selectDateRange(date) {
				this.startDate = new Date(date[0]).getTime()
				this.endDate = new Date(date[1]).getTime()
			},
			viewinfo() {
				this.$router.push({name: 'receivableinfo'})
			}
		}
	}
</script>
<style lang="stylus" scoped>

</style>