<template>
	<div class="step step1">
		<div class="search">
			<el-form :inline="true" size="small">
				<el-form-item label="关键字" >
					<el-input placeholder="承运单号/货物名称/起始地/目的地" style="width:150px" v-model="findsearchInfo"></el-input>
				</el-form-item>
				<el-form-item label="发货时间">
					<el-date-picker
						v-model="findRangeDate"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						value-format="timestamp"
						:clearable="false"
						@change="selectDateRange">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList">搜索</el-button>
					<el-button type="default" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table">
			<el-table :data="carrierList" border style="width: 100%" size="mini" @selection-change="selectionChange">
				<el-table-column type="selection" width="40" align="center" fixed>
				</el-table-column>
				<el-table-column label="处理状态" width="90" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.status=='Committed'">待执行</span>
						<span v-else-if="scope.row.status=='Running'">执行中</span>
						<span v-else-if="scope.row.status=='Signed'">到达签收</span>
						<span v-else-if="scope.row.status=='Closed'">关闭</span>
						<span v-else-if="scope.row.status=='Canceled'">作废</span>
					</template>
				</el-table-column>
				<el-table-column label="承运单号" width="180" prop="carrierOrderNo" align="center">
				</el-table-column>
				<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
				<el-table-column label="收货时间" width="140" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.consigneeDate | getdatefromtimestamp() }}</span>
					</template>
				</el-table-column>
				<el-table-column label="卸货地" prop="consigneeDetailAddress" width="120"></el-table-column>
				<!-- <el-table-column label="货物名称" align="center">
				</el-table-column>
				<el-table-column label="货物类型" align="center">
				</el-table-column>
				<el-table-column label="重量(吨)/体积(方)" align="center">
				</el-table-column>
				<el-table-column label="数量(件)" align="center">
				</el-table-column> -->
				<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
				<el-table-column label="发货时间" width="140" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.shipperDate | getdatefromtimestamp() }}</span>
					</template>
				</el-table-column>
				<el-table-column label="发货地" prop="shipperDetailAddress"></el-table-column>
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
		<div class="step-footer">
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request from '../../../common/request'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				carrierList:[],
				selected: [],
				findsearchInfo:'',
				findRangeDate: [],
				findshipperBeginDate: '',
				findshipperEndDate: ''
			}
		},
		created(){
			this.getList()
		},
		methods: {
			nextStep(){
				let selectedCarrierBillIDs = this.selected.map(item => item.carrierOrderID)
				if (selectedCarrierBillIDs.length == 0) {
					Message.error('请选择！')
					return
				}
				this.$emit('nextStep', 1,selectedCarrierBillIDs)
			},
			back() {
				this.$router.go(-1)
			},
			pageChange(index) {
				this.pageIndex = index
				this.getList()
			},
			getList(){
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					shipperBeginDate: this.findshipperBeginDate,
					shipperEndDate: this.findshipperEndDate,
					searchInfo: this.findsearchInfo,
				}
				request({
					url: '/biz/carrierOrder/list',
					params
				}).then(res => {
					this.carrierList = res.data.data.records
					this.count = res.data.data.total
				})
			},
			reset() {
				this.findsearchInfo='',
				this.findshipperBeginDate='',
				this.findshipperEndDate='',
				this.findRangeDate = [],
				this.pageIndex=1,
				this.getList()
			},
			selectDateRange(date) {
				this.findshipperBeginDate = date[0]
				this.findshipperEndDate = date[1]
			},
			selectionChange(data) {
				// this.selectedList = data.map(item => item.carrierOrderID)
				this.selected = data
			},
		}
	}
</script>
<style lang="stylus" scoped>
	.step-footer
		margin-top 20px
		text-align center
</style>