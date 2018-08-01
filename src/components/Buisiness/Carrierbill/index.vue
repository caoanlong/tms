<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">承运单列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="承运单号/货物名称" style="width:150px" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="状态" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.status">
							<el-option value="Committed" label="未执行">未执行</el-option>
							<el-option value="Running" label="执行中">执行中</el-option>
							<el-option value="Signed" label="已完成">已完成</el-option>
							<el-option value="Closed" label="已关闭">已关闭</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="委托时间从" prop="begin">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" v-model="find.begin">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至" prop="end">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" v-model="find.end">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="单号" prop="carrierOrderNo" width="170"  align="center">
						<template slot-scope="scope">
							<span @click="view(scope.row.carrierOrderID)" class="link">{{scope.row.carrierOrderNo}}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态" prop="status" align="center">
						<template slot-scope="scope">
							<el-tag size="mini" class="statusTag" type="warning" v-if="scope.row.status == 'Committed'">未执行</el-tag>
							<el-tag size="mini" class="statusTag" type="primary" v-else-if="scope.row.status == 'Running'">执行中</el-tag>
							<el-tag size="mini" class="statusTag" type="success" v-else-if="scope.row.status == 'Signed'">已完成</el-tag>
							<el-tag size="mini" class="statusTag" type="info" v-else-if="scope.row.status == 'Closed'">已关闭</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="货物" prop="cargoName"></el-table-column>
					<el-table-column label="发货公司" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="发货地" prop="shipperArea"></el-table-column>
					<el-table-column label="委托时间" prop="commissionDate" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.commissionDate">{{ new Date(scope.row.commissionDate).getTime() | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="到货公司" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="到货地" prop="consigneeArea"></el-table-column>
					<el-table-column label="原数量" prop="cargoNumSum"></el-table-column>
					<el-table-column label="原货量">
						<template slot-scope="scope">
							<span>{{scope.row.cargoWeightSum + '吨'}}/{{scope.row.cargoVolumeSum + '方'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="数量(余)" prop="remainingCargoNum"></el-table-column>
					<el-table-column label="货量(余)">
						<template slot-scope="scope">
							<span>{{scope.row.remainingCargoWeight + '吨'}}/{{scope.row.remainingCargoVolume + '方'}}</span>
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.carrierOrderID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.carrierOrderID}" v-if="scope.row.status == 'Committed'">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'close', id: scope.row.carrierOrderID}" v-if="scope.row.status == 'Running' || scope.row.status == 'Signed'">关闭</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.carrierOrderID}" v-if="scope.row.status == 'Committed'">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import dist from '../../../assets/data/distpicker.data.js'
import { deleteConfirm, closeConfirm } from '../../../common/utils'
import Carrierbill from '../../../api/Carrierbill'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: [],
			rangeDate: [],
			find: {
				keyword: '',
				status: '',
				begin: '',
				end: ''
			},
			selectedList: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		selectionChange(data) {
			this.selectedList = data.map(item => item.carrierOrderID)
		},
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		reset() {
			this.find.keyword = ''
			this.find.status = ''
			this.find.begin = ''
			this.find.end = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList() 
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		getList() {
			Carrierbill.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				status: this.find.status,
				begin: this.find.begin,
				end: this.find.end
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
		},
		handleCommand(e) {
			if(e.type == 'view') {
				this.$router.push({name: 'viewcarrierbill', query: {carrierOrderID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editcarrierbill', query: {carrierOrderID: e.id}})
			} else if (e.type == 'close') {
				this.close(e.id)
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		add() {
			this.$router.push({ name: 'addcarrierbill' })
		},
		view(carrierOrderID) {
			this.$router.push({ name: 'viewcarrierbill', query: { carrierOrderID }})
		},
		close(carrierOrderID) {
			closeConfirm(carrierOrderID, carrierOrderIDs => {
				Carrierbill.close({ carrierOrderIDs }).then(res => {
					Message({ type: 'success', message: '关闭成功!' })
					this.getList()
				})
			})
		},
		del(carrierOrderID) {
			deleteConfirm(carrierOrderID, carrierOrderIDs => {
				Carrierbill.del({ carrierOrderIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			})
		}
	}
}

</script>
<style lang="stylus" scoped>
.table
	overflow hidden
	overflow-x auto
.wfTable
	width 100%
	background #e2ecf6
	border-spacing 1px
	font-size 14px
	margin-bottom 10px
	th
	td
		white-space  nowrap 
	td
		background #fff
		padding 6px 10px
		height 36px
		line-height 24px
		color #666
		position relative
	.tit
		td
			border-top 10px solid #fff
			background #f8f8f8
			color #3582d0
			.infoItem
				margin-right 40px
				height 24px
				line-height 24px
				display inline-block
				&.ViewDispatchBill
					cursor pointer
	th
		padding 6px 10px
		height 36px
		line-height 24px
		background #f0f0f0
		color #666
		width 100px
	.list
		td
			font-size 12px
			.ViewTaskDetail
				cursor pointer
				display block
</style>
