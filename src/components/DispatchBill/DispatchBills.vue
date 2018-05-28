<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">调度列表</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="调度单号/货物名称/司机/车牌号" v-model="findKeyword"></el-input>
					</el-form-item>
					<el-form-item label="收发货单位">
						<el-input placeholder="收发货单位" v-model="findrecdeliverycomp"></el-input>
					</el-form-item>
					<el-form-item label="调度状态">
						<el-select v-model="findStatus" placeholder="请选择">
							<el-option label="全部" value="全部"></el-option>
							<el-option label="未接单" value="未接单"></el-option>
							<el-option label="已接单" value="已接单"></el-option>
							<el-option label="已关闭" value="已关闭"></el-option>
							<el-option label="已取消" value="已取消"></el-option>
							<el-option label="已完成" value="已完成"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-upload2" @click="add">导入</el-button>
			</div>
			<div class="table">
				<table class="wfTable">
					<tr>
						<th width="200">任务单号</th>
						<th width="80">任务状态</th>
						<th width="80">货物类型</th>
						<th>货物名称</th>
						<th>配载货量</th>
						<th width="160">收货时间</th>
						<th>收货地</th>
						<th width="160">发货时间</th>
						<th>发货地</th>
						<th>操作</th>
					</tr>
					<template v-for="item in DispatchBillList">
					<tr class="tit">
						<td colspan="9"><span class="infoItem ViewDispatchBill" @click="ViewDispatchBill(item.dispatchOrderID)" >调度单号：{{item.dispatchOrderNo}}</span>
						<span class="infoItem">车牌号：{{item.plateNo}}</span><span class="infoItem">
							<span class="tag tag1" v-if="item.status == 'Committed'">待执行</span>
							<span class="tag tag2" v-else-if="item.status == 'Loaded'">已装运</span>
							<span class="tag tag3" v-else-if="item.status == 'Signed'">已签收</span>
							<span class="tag tag4" v-else-if="item.status == 'Canceled'">作废</span>
						</span></td>
						<td class="text-center" width="160"><el-button type="text" size="mini">编辑</el-button><el-button type="text" size="mini">取消</el-button>
							<el-button type="text" size="mini">关闭</el-button></td>
					</tr>
					<tr class="list" v-for="taskItem in 4">
						<td class="text-center"><span @click="ViewTaskDetail" class="ViewTaskDetail">919239801</span></td>
						<td class="text-center" width="80">待装车</td>
						<td class="text-center" width="80">重货</td>
						<td>太古咖啡</td>
						<td class="text-center">6吨/40方/1000件</td>
						<td class="text-center" width="160">2018-04-22  18:33:15</td>
						<td>广东广州</td>
						<td class="text-center" width="160">2018-04-22  18:33:15</td>
						<td>湖南常德</td>
						<td class="text-center"><el-button type="text" size="mini">查看</el-button></td>
					</tr>
					</template>
				</table>
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
import DispatchBillItem from './Common/DispatchBillItem'
export default {
	data() {
		return {
			findKeyword: '',
			findrecdeliverycomp: '',
			findStatus: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			DispatchBillList: []
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
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		getList(){
			let params = {
				current: this.pageIndex,
				size: this.pageSize
			}
			request({
				url: '/biz/dispatchOrder/list',
				params
			}).then(res => {
				this.DispatchBillList = res.data.data.records
				this.count = res.data.data.total
			})
		},
		add() {
			this.$router.push({ name: 'adddispatchbill' })
		},
		ViewDispatchBill(dispatchOrderID) {
			this.$router.push({ name: 'viewdispatchbill' , query: { dispatchOrderID} })
		},
		ViewTaskDetail() {
			this.$router.push({ name: 'viewtaskdetail'})
		}
	},
	components:{
		DispatchBillItem
	}
}

</script>
<style lang="stylus" scoped>
.wfTable
	width 100%
	background #e2ecf6
	border-spacing 1px
	font-size 14px
	margin-bottom 10px
	td
		background #fff
		padding 6px 10px
		height 36px
		line-height 24px
		color #666
		position relative
	.tit
		td
			border-top 1px solid #bbb
			background #f8f8f8
			color #3582d0
			.infoItem
				margin-right 40px
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
