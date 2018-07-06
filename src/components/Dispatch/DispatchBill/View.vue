<template>
	<div class="main-content">
		<el-card class="box-card baseInfo">
			<div slot="header" class="clearfix posr">
				<span>调度单号：{{dispatchOrder.dispatchOrderNo}}</span>
				<el-tag size="mini" class="statusTag" type="warning" v-if="dispatchOrder.status == 'Committed'">未接单</el-tag>
				<el-tag size="mini" class="statusTag"  v-else-if="dispatchOrder.status == 'Ordered'">已接单</el-tag>
				<el-tag size="mini" class="statusTag"  type="info" v-else-if="dispatchOrder.status == 'Canceled'">已取消</el-tag>
				<el-tag size="mini" class="statusTag"  type="info" v-else-if="dispatchOrder.status == 'Rejected'">已拒绝</el-tag>
				<el-tag size="mini" class="statusTag"  type="info" v-else-if="dispatchOrder.status == 'Closed'">已关闭</el-tag>
				<el-tag size="mini" class="statusTag"  type="success" v-else-if="dispatchOrder.status == 'Finished'">已完成</el-tag>
			</div>
			<el-row :gutter="20">
				<el-col :span="8">
					<p>调度时间：<span v-if="dispatchOrder.dispatchTime">{{dispatchOrder.dispatchTime | getdatefromtimestamp()}}</span></p>
				</el-col>
				<el-col :span="8">
					<p>接单时间：<span v-if="dispatchOrder.orderedTime">{{dispatchOrder.orderedTime | getdatefromtimestamp()}}</span></p>
				</el-col>
				<el-col :span="8">
					<p>车牌号：<span>{{dispatchOrder.plateNo}}</span><span v-if="dispatchOrder.trailerPlateNo">/{{dispatchOrder.trailerPlateNo}}</span></p>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="8">
					<p>调度员：{{dispatchOrder.dispatchName}} <span class="phone">{{dispatchOrder.dispatchMobile}}</span></p>
				</el-col>
				<el-col :span="8">
					<p>司机：{{dispatchOrder.driverName}} <span class="phone">{{dispatchOrder.driverMobile}}</span></p>
				</el-col>
				<el-col :span="8">
					<p>押运员：{{dispatchOrder.superCargoName}} <span class="phone">{{dispatchOrder.superCargoMobile}}</span></p>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>共有{{dispatchOrder.dispatchTaskList?dispatchOrder.dispatchTaskList.length:0}}个任务</span>
			</div>
			<TaskListItem 
				:taskItem="item" 
				v-for="(item,index) in dispatchOrder.dispatchTaskList" 
				:index="index" 
				:key="index" 
				:plateNo="dispatchOrder.plateNo" 
				:trailerPlateNo="dispatchOrder.trailerPlateNo">
			</TaskListItem>
		</el-card>
		<div class="handle text-center">
			<el-button v-if="(dispatchOrder.status == 'Ordered' || dispatchOrder.status == 'Committed')
			&& (!dispatchOrder.dispatchTaskList.map(item => item.status).includes('Loaded') 
			&& !dispatchOrder.dispatchTaskList.map(item => item.status).includes('Signed'))" 
			@click="cancelDispatchOrder()">取消</el-button>
			<el-button v-if="dispatchOrder.status == 'Ordered'" @click="closeDispatchOrder()">关闭</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Dispatchbill from '../../../api/Dispatchbill'
import { closeConfirm, cancelConfirm } from '../../../common/utils'
import TaskListItem from './components/TaskListItem'
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
		cancelDispatchOrder() {
			let id = this.$route.query.dispatchOrderID
			cancelConfirm(id, dispatchOrderID => {
				Dispatchbill.cancel({ dispatchOrderID }).then(res =>{
					Message.success('已成功取消调度单!')
					this.getDetail()
				})
			})
		},
		closeDispatchOrder() {
			let id = this.$route.query.dispatchOrderID
			closeConfirm(id, dispatchOrderID => {
				Dispatchbill.close({ dispatchOrderID }).then(res => {
					Message.success('关闭调度成功!')
					this.getDetail()
				})
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

.baseInfo
	p
		margin 0
		line-height 30px
		font-size 13px
		color #666
		.phone
			margin-left 20px
			color #666
.statusTag
	position absolute
	right 10px
	top 50%
	transform translateY(-50%)
.box-card
	margin-bottom 10px
</style>
