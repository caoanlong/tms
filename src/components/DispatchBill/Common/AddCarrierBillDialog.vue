<template>
	<el-dialog title="添加承运单" :visible="isVisible" :show-close="false" custom-class="table" width="80%">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="承运单号">
					<el-input placeholder="承运单号"></el-input>
				</el-form-item>
				<el-form-item label="发货单号">
					<el-input placeholder="发货单号"></el-input>
				</el-form-item>
				<el-form-item label="收货单位">
					<el-input placeholder="收货单位"></el-input>
				</el-form-item>
				<el-form-item label="发货单位">
					<el-input placeholder="发货单位"></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-input placeholder="创建时间"></el-input>
				</el-form-item>
				<el-form-item label="发货时间">
					<el-input placeholder="发货时间"></el-input>
				</el-form-item>
				<el-form-item label="到货时间">
					<el-input placeholder="到货时间"></el-input>
				</el-form-item>
				<el-form-item label="运单状态">
					<el-input placeholder="运单状态"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">搜索</el-button>
					<el-button type="default">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table 
			:data="tableData" 
			@selection-change="selectionChange"
			border style="width: 100%" size="mini">
			<el-table-column type="selection" width="40" align="center" fixed></el-table-column>
			<el-table-column label="处理状态" width="90" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.status=='Committed'">待执行</span>
					<span v-else-if="scope.row.status=='Running'">执行中</span>
					<span v-else-if="scope.row.status=='Signed'">到达签收</span>
					<span v-else-if="scope.row.status=='Closed'">关闭</span>
					<span v-else-if="scope.row.status=='Canceled'">作废</span>
				</template>
			</el-table-column>
			<el-table-column label="承运单号" prop="carrierOrderNo" width="110" align="center"></el-table-column>
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
					<el-option label="10" value="10"></el-option>
					<el-option label="20" value="20"></el-option>
					<el-option label="30" value="30"></el-option>
					<el-option label="40" value="40"></el-option>
					<el-option label="50" value="50"></el-option>
					<el-option label="100" value="100"></el-option>
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
				selectedList: []
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
			selectionChange(data) {
				this.selectedList = data.map(item => item.carrierOrderID)
			},
			getList(){
				let params = {
					current: this.pageIndex,
					size: this.pageSize
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
				if (this.selectedList.length > 0) {
					this.isVisible = false
					this.$emit('selectCarrierBills', this.selectedList, false)
				} else {
					Message.error('请选择！')
				}
			},
			cancel() {
				this.isVisible = false
				this.$emit('selectCarrierBills')
			},
		}
	}
</script>