<template>
	<el-dialog title="选择承运单" :visible="isVisible" :show-close="false" custom-class="table" width="80%">
		<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字" >
						<el-input placeholder="请输入关键字" style="width:150px" v-model="findsearchInfo"></el-input>
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
					<el-form-item label="运单状态" class="customerSelect">
						<el-select v-model="findStatus" placeholder="运单状态" style="width:140px">
							<el-option value="" label="全部订单">全部订单</el-option>
							<el-option value="Committed" label="待执行">待执行</el-option>
							<el-option value="Running" label="执行中">执行中</el-option>
							<el-option value="Signed" label="到达签收">到达签收</el-option>
							<el-option value="Closed" label="关闭">关闭</el-option>
							<el-option value="Canceled" label="作废">作废</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		<el-table 
			:data="tableData.filter(item => item.status == 'Committed')" 
			@selection-change="selectionChange"
			:row-class-name="tableRowClassName"
			border style="width: 100%" size="mini">
			<el-table-column type="selection" width="40" align="center" fixed></el-table-column>
			<el-table-column label="处理状态"  prop="status" width="90" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.status=='Committed'">待执行</span>
					<span v-else-if="scope.row.status=='Running'">执行中</span>
					<span v-else-if="scope.row.status=='Signed'">到达签收</span>
					<span v-else-if="scope.row.status=='Closed'">关闭</span>
					<span v-else-if="scope.row.status=='Canceled'">作废</span>
				</template>
			</el-table-column>
			<el-table-column label="承运单号" prop="carrierOrderNo" width="180" align="center"></el-table-column>
			<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
			<el-table-column label="卸货地" prop="consigneeDetailAddress" width="120"></el-table-column>
			<el-table-column label="收货人" prop="consigneeName"></el-table-column>
			<el-table-column label="到货时间" width="140" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.consigneeDate | getdatefromtimestamp() }}</span>
				</template>
			</el-table-column>
			<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
			<el-table-column label="发货时间" width="140" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.shipperDate | getdatefromtimestamp() }}</span>
				</template>
			</el-table-column>
			<el-table-column label="发货人" prop="shipperName"></el-table-column>
			<el-table-column label="发货地" prop="shipperDetailAddress"></el-table-column>
		</el-table>
		<el-row type="flex">
			<el-col :span="14" style="padding-top: 15px; font-size: 12px; color: #909399">
				<span>总共 {{count}} 条记录每页显示</span>
				<el-select size="mini" style="width: 100px; padding: 0 5px" v-model="pageSize" @change="changeGetList">
					<el-option label="10" :value="10"></el-option>
					<el-option label="20" :value="20"></el-option>
					<el-option label="30" :value="30"></el-option>
					<el-option label="40" :value="40"></el-option>
					<el-option label="50" :value="50"></el-option>
					<el-option label="100" :value="100"></el-option>
				</el-select>
				<span>条记录</span>
			</el-col>
			<el-col :span="10">
				<div class="pagination">
					<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
				</div>
			</el-col>
		</el-row>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancel">取消</el-button>
			<el-button type="primary" @click="add">添加</el-button>
		</span>
	</el-dialog>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request from '../../../common/request'
	export default {
		props: {
			dialogTableVisible: {
				type: Boolean,
				default: false
			},
			selectedCarrierBillIDs: {
				type: Array,
				default: () => []
			}
		},
		watch: {
			dialogTableVisible: function(newVal) {
				this.isVisible = newVal
				if (newVal) {
					this.getList()
				}
			}
		},
		data() {
			return {
				isVisible: false,
				count: 0,
				pageIndex: 1,
				pageSize: 10,
				tableData: [],
				selectedList: [],
				findsearchInfo:'',
				findRangeDate: [],
				findshipperBeginDate: '',
				findshipperEndDate: '',
				findStatus:''
			}
		},
		methods: {
			pageChange(index) {
				this.pageIndex = index
				this.getList()
			},
			changeGetList(size) {
				this.pageSize = size
				this.getList()
			},
			reset() {
				this.findsearchInfo='',
				this.findshipperBeginDate='',
				this.findshipperEndDate='',
				this.findRangeDate = [],
				this.findStatus = '',
				this.pageIndex=1,
				this.getList()
			},
			selectDateRange(date) {
				this.findshipperBeginDate = date[0]
				this.findshipperEndDate = date[1]
			},
			selectionChange(data) {
				// this.selectedList = data.map(item => item.carrierOrderID)
				this.selectedList = data
			},
			getList(){
				let params = {
					current: this.pageIndex,
					size: this.pageSize,
					shipperBeginDate: this.findshipperBeginDate,
					shipperEndDate: this.findshipperEndDate,
					searchInfo: this.findsearchInfo,
					status: this.findStatus
				}
				request({
					url: '/biz/carrierOrder/list',
					params
				}).then(res => {
					this.tableData = res.data.data.records
					this.count = res.data.data.total
				})
			},
			add() {
				let selectedList = this.selectedList.map(item => item.carrierOrderID)
				if (selectedList.length == 0) {
					Message.error('请选择！')
					return
				}
				let mutipleSelect = []
				for (let i = 0; i < selectedList.length; i++) {
					if (this.selectedCarrierBillIDs.includes(selectedList[i])) {
						mutipleSelect.push(this.selectedList[i].carrierOrderNo)
					}
				}
				if (mutipleSelect.length > 0) {
					Message.error('承运单号为“' + mutipleSelect.join(',') + '”已经选择了！')
					return
				}
				this.isVisible = false
				this.$emit('selectCarrierBills', selectedList, false)
			},
			tableRowClassName({row, rowIndex}) {
				if (this.selectedCarrierBillIDs.includes(row.carrierOrderID)) {
				  return 'warning-row'
				}
				return ''
			},
			cancel() {
				this.isVisible = false
				this.$emit('selectCarrierBills')
			},
		}
	}
</script>
<style lang="stylus">
.el-table .warning-row
	background oldlace
</style>