<template>
	<div class="main-content">
		<div class="wf-card">
		<div class="dispatchbillTit">
			<span class="fl">调度单号：{{dispatchOrder.dispatchOrderNo}}</span>
			<span class="fr status status1" v-if="dispatchOrder.status == 'Committed'">未接单</span>
			<span class="fr status status2" v-else-if="dispatchOrder.status == 'Ordered'">已接单</span>
			<span class="fr status status4" v-else-if="dispatchOrder.status == 'Canceled'">已取消</span>
			<span class="fr status status4" v-else-if="dispatchOrder.status == 'Rejected'">已拒绝</span>
			<span class="fr status status1" v-else-if="dispatchOrder.status == 'Closed'">已关闭</span>
			<span class="fr status status3" v-else-if="dispatchOrder.status == 'Finished'">已完成</span>
		</div>
		<div class="dispatchbillInfo">
			<table>
				<tr>
					<td><span class="labels">货物名称：</span>{{dispatchOrder.cargoName}}</td>
					<td><span class="labels">货量：</span>{{dispatchOrder.loadWeightSum?dispatchOrder.loadWeightSum+'kg':''}}{{dispatchOrder.loadVolumeSum?('/'+dispatchOrder.loadVolumeSum+'m³'):''}}</td>
					<td><span class="labels">件数：</span>{{dispatchOrder.loadNumSum?dispatchOrder.loadNumSum+'件':''}}</td>
				</tr>
				<tr>
					<td><span class="labels">调度员：</span>{{dispatchOrder.dispatchName}}</td>
					<td><span class="labels">调度电话：</span>{{dispatchOrder.dispatchMobile}}</td>
					<td><span class="labels">调度时间：</span><span v-if="dispatchOrder.dispatchTime">{{dispatchOrder.dispatchTime | getdatefromtimestamp()}}</span></td>
				</tr>
				<tr>
					<td><span class="labels">司机：</span>{{dispatchOrder.driverName}}</td>
					<td><span class="labels">司机电话：</span>{{dispatchOrder.driverMobile}}</td>
					<td><span class="labels">接单时间：</span><span v-if="dispatchOrder.orderedTime">{{dispatchOrder.orderedTime | getdatefromtimestamp()}}</span></td>
				</tr>
				<tr>
					<td><span class="labels">押运员：</span>{{dispatchOrder.superCargoName}}</td>
					<td><span class="labels">押运电话：</span>{{dispatchOrder.superCargoMobile}}</td>
					<td></td>
				</tr>
			</table>
		</div>
		<TaskListItem :taskItem="item" v-for="(item,index) in dispatchOrder.dispatchTaskList" :index="index" :key="index" :plateNo="dispatchOrder.plateNo" :trailerPlateNo="dispatchOrder.trailerPlateNo"></TaskListItem>
		<div class="handle text-center">
			<el-button>取消</el-button>
			<el-button>关闭</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Dispatchbill from '../../api/Dispatchbill'
import TaskListItem from './Common/TaskListItem'
export default {
	data() {
		return {
			dispatchOrder:{}
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		getDetail() {
			let dispatchOrderID = this.$route.query.dispatchOrderID
			Dispatchbill.findById({ dispatchOrderID }).then(res => {
				this.dispatchOrder = res
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		TaskListItem
	}
}

</script>
<style lang="stylus" scoped>

.dispatchbillTit
	background #e2ecf6
	padding 5px 15px
	line-height 30px
	font-size 14px
	height 40px
	span
		display inline-block
		color #3582d0
	.status
		background #ccc
		padding 0 10px
		height 20px
		line-height 20px
		border-radius 4px
		color #fff
		font-size 12px
		margin-top 5px
		&.status1
			background #909399
		&.status2
			background #409EFF
		&.status3
			background #67C23A
		&.status4
			background #E6A23C
.dispatchbillInfo
	border 1px solid #e2ecf6
	border-top none
	padding 10px 15px
	margin-bottom 10px
	table
		width 100%
		border-spacing 0
		td
			font-size 13px
			padding 8px 0
			width 33.33333333%
			color #666
			.labels
				color #999
.dispatch
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
		&.tit
			background #e2ecf6
			color #3582d0
	th
		padding 6px 10px
		height 36px
		line-height 24px
		background #f8f8f8
		color #666
		text-align left
		width 100px
</style>
