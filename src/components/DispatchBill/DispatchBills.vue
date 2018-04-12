<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">调度列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="调度单号">
						<el-input placeholder="调度单号" v-model="findDispatchOrderNo"></el-input>
					</el-form-item>
					<el-form-item label="发货地">
						<el-input placeholder="发货地" v-model="findShipperAddress"></el-input>
					</el-form-item>
					<el-form-item label="收货地">
						<el-input placeholder="收货地" v-model="findConsigneeAddress"></el-input>
					</el-form-item>
					<el-form-item label="司机/随车员姓名">
						<el-input placeholder="司机/随车员姓名" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini" stripe>
					<el-table-column label="调度单号" prop="dispatchOrderNo" width="130" align="center">
					</el-table-column>
					<el-table-column label="车辆号牌" prop="plateNo" width="110" align="center">
					</el-table-column>
					<el-table-column label="配载量" width="180" align="center">
						<template slot-scope="scope">
							<span>
								{{(scope.row.totalCargoWeight ? scope.row.totalCargoWeight : 0) + '吨'}}
								/{{(scope.row.totalCargoVolume ? scope.row.totalCargoVolume : 0) + '方'}}
								/{{(scope.row.totalCargoNum ? scope.row.totalCargoNum : 0) + '件'}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="司机" prop="driverName" width="100" align="center">
					</el-table-column>
					<el-table-column label="调度状态" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 'Committed'">待执行</span>
							<span v-else-if="scope.row.status == 'Loaded'">已装运</span>
							<span v-else-if="scope.row.status == 'Signed'">已签收</span>
							<span v-else-if="scope.row.status == 'Canceled'">作废</span>
						</template>
					</el-table-column>
					<el-table-column label="随车人员" prop="superCargoName"  width="120" align="center">
					</el-table-column>
					<el-table-column label="订单号" prop="carrierOrder.carrierOrderNo"  width="130" align="center">
					</el-table-column>
					<el-table-column label="发货地" prop="dispatchOrderCargo.shipperArea" width="120">
					</el-table-column>
					<el-table-column label="收货地" prop="dispatchOrderCargo.consigneeArea" width="120">
					</el-table-column>
					<el-table-column label="到货时间" width="130" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.carrierOrder.consigneeDate | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="货物规格/名称" width="130" >
						<template slot-scope="scope">
							<span>{{scope.row.dispatchOrderCargo.cargoType}}/{{scope.row.dispatchOrderCargo.cargoName}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="60" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="viewDispatchBill(scope.row.dispatchOrderID)">查看</el-button>
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
			findDispatchOrderNo: '',
			findShipperAddress: '',
			findConsigneeAddress: '',
			findName: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findDispatchOrderNo = ''
			this.findShipperAddress = ''
			this.findConsigneeAddress = ''
			this.findName = ''
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		getList(){
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				consigneeAddress: this.findConsigneeAddress,  //	收货地址
				dispatchOrderNo: this.findDispatchOrderNo,  //	调度单号
				name: this.findName,  //	司机或随车人员姓名
				shipperAddress: this.findShipperAddress,  //发货地址
			}
			request({
				url: '/biz/dispatchOrder/list',
				params
			}).then(res => {
				this.tableData = res.data.data.records
				this.count = res.data.data.total
			})
		},
		add() {
			this.$router.push({ name: 'adddispatchbill' })
		},
		viewDispatchBill(dispatchOrderID) {
			this.$router.push({ name: 'viewdispatchbill' , query: { dispatchOrderID} })
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>
