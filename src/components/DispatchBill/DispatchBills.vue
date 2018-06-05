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
						<th width="200">任务编号</th>
						<th width="80">状态</th>
						<th width="80">货物</th>
						<th>货量</th>
						<th width="140">收货时间</th>
						<th>收货地</th>
						<th width="140">发货时间</th>
						<th>发货地</th>
						<th>操作</th>
					</tr>
					<template v-for="item in 3">
						<tr class="tit" :key="item">
							<td colspan="6">
								<span class="infoItem ViewDispatchBill" @click="view(item.dispatchOrderID)">调度单号：{{item.dispatchOrderNo}}</span>
								<span class="infoItem">车牌号：{{item.plateNo}}</span><span class="infoItem">
									<span class="tag tag1" v-if="item.status == 'Committed'">待执行</span>
									<span class="tag tag2" v-else-if="item.status == 'Loaded'">已装运</span>
									<span class="tag tag3" v-else-if="item.status == 'Signed'">已签收</span>
									<span class="tag tag4" v-else-if="item.status == 'Canceled'">已作废</span>
								</span>
							</td>
							<td colspan="3" class="text-center" width="140">
								<el-button type="text" size="mini">重新调度</el-button>
								<el-button type="text" size="mini">取消调度</el-button>
								<el-button type="text" size="mini">关闭</el-button>
								<el-button type="text" size="mini">删除</el-button>
							</td>
						</tr>
						<tr class="list" v-for="taskItem in 4" :key="item + taskItem * 1000">
							<td class="text-center">
								<span @click="viewTask" class="ViewTaskDetail">919239801</span>
							</td>
							<td class="text-center" width="80">待装车</td>
							<td>太古咖啡</td>
							<td class="text-center">6kg/40m³/1000kg</td>
							<td class="text-center" width="140">2018-04-22 18:33:15</td>
							<td>广东广州</td>
							<td class="text-center" width="140">2018-04-22 18:33:15</td>
							<td>湖南常德</td>
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
import request from '../../common/request'
import Dispatchbill from '../../api/Dispatchbill'
import DispatchBillItem from './Common/DispatchBillItem'
import Page from '../CommonComponents/Page'
export default {
	data() {
		return {
			findKeyword: '',
			findrecdeliverycomp: '',
			findStatus: '',
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
			this.findDispatchOrderNo = ''
			this.findShipperAddress = ''
			this.findConsigneeAddress = ''
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
				color #3582d0
</style>
