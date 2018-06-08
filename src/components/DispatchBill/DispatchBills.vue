<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">调度列表</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="调度单号/货物名称/司机/车牌号" v-model="findkeyword"></el-input>
					</el-form-item>
					<el-form-item label="收发货单位">
						<el-input placeholder="收发货单位" v-model="findcustomerID"></el-input>
					</el-form-item>
					<el-form-item label="调度状态">
						<el-select v-model="findstatus" placeholder="请选择">
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
						<th width="200">任务编号</th>
						<th width="80">状态</th>
						<th width="80">货物</th>
						<th>货量</th>
						<th>装车地</th>
						<th width="140">收货时间</th>
						<th>送货地</th>
						<th width="140">送货时间</th>
						<th>操作</th>
					</tr>
					<template v-for="item in dispatchBillList">
						<tr class="tit" :key="item.dispatchOrderID">
							<td colspan="9">
								<span class="infoItem ViewDispatchBill" @click="view(item.dispatchOrderID)">调度单号：{{item.dispatchOrderNo}}</span>
								<span class="infoItem">车牌号：{{item.plateNo}}</span>
								<span class="infoItem" v-if="item.trailerPlateNo">挂车：{{item.trailerPlateNo}}</span>
								<span class="infoItem">
									<span class="tag" v-if="item.status == 'Committed'">未接单</span>
									<span class="tag" v-else-if="item.status == 'Ordered'">已接单</span>
									<span class="tag" v-else-if="item.status == 'Canceled'">已取消</span>
									<span class="tag" v-else-if="item.status == 'Rejected'">已拒绝</span>
									<span class="tag" v-else-if="item.status == 'Closed'">已关闭</span>
									<span class="tag" v-else-if="item.status == 'Finished'">已完成</span>
								</span>
								<span class="fr">
									<el-button type="text" size="mini">编辑</el-button>
									<el-button type="text" size="mini">取消调度</el-button>
									<el-button type="text" size="mini">关闭</el-button>
									<el-button type="text" size="mini">删除</el-button>
								</span>
							</td>
						</tr>
						<tr class="list" v-for="taskItem in item.dispatchTaskList" :key="taskItem.taskNo">
							<td class="text-center">
								<span @click="viewTask" class="ViewTaskDetail">{{taskItem.taskNo}}</span>
							</td>
							<td class="text-center" width="80">
								<span v-if="taskItem.status='Committed'">待执行</span>
								<span v-else-if="taskItem.status='Loaded'">已装运</span>
								<span v-else-if="taskItem.status='Signed'">已签收</span>
								<span v-else>已作废</span>
							</td>
							<td>{{taskItem.cargoName}}</td>
							<td class="text-center">{{taskItem.loadWeightSum?taskItem.loadWeightSum+'kg/':''}}{{taskItem.loadVolumeSum?taskItem.loadVolumeSum+'m³/':''}}{{taskItem.loadNumSum?taskItem.loadNumSum+'件':''}}</td>
							<td>{{taskItem.shipperArea}}</td>
							<td class="text-center" width="140">{{taskItem.shipperDate | getdatefromtimestamp()}}</td>
							<td>{{taskItem.consigneeArea}}</td>
							<td class="text-center" width="140">{{taskItem.consigneeDate | getdatefromtimestamp()}}</td>
							<td class="text-center">
								<el-button type="text" size="mini">上传照片</el-button>
								<el-button type="text" size="mini" @click="viewTask">编辑</el-button>
							</td>
						</tr>
					</template>
				</table>
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Dispatchbill from '../../api/Dispatchbill'
import DispatchBillItem from './Common/DispatchBillItem'
import Page from '../CommonComponents/Page'
export default {
	data() {
		return {
			findkeyword: '',
			findcustomerID: '',
			findstatus: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			dispatchBillList: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findKeyword=''
			this.findcustomerID=''
			this.findstatus=''
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
		getList () {
			Dispatchbill.find({
				keyword:this.findKeyword,
				customerID:this.findcustomerID,
				status:this.findstatus,
				current: this.pageIndex,
				size: this.pageSize
			}).then(res => {
				this.dispatchBillList = res.records
				this.count = res.total
			})
		},
		add() {
			this.$router.push({ name: 'adddispatchbill' })
		},
		view(dispatchOrderID) {
			this.$router.push({ name: 'viewdispatchbill' , query: { dispatchOrderID } })
		},
		viewTask() {
			this.$router.push({ name: 'viewtaskdetail' })
		}
	},
	components:{
		DispatchBillItem,
		Page
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
			.infoItem
				font-size 12px
				margin-right 10px
				&.ViewDispatchBill
					cursor pointer
					color #3582d0
				.tag
					background #ccc
					padding 2px 10px
					border-radius 4px
					color #fff
	
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
				color #3582d0
</style>
