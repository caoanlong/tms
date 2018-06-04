<template>
	<div class="main-content">
		<div class="wf-card">
		<div class="dispatchbillTit">
			<span class="fl">调度单号：20170603002464001</span>
			<span class="fr status">未接单</span>
		</div>
		<div class="dispatchbillInfo">
			<table>
				<tr>
					<td><span class="labels">货物名称：</span>可乐，啤酒</td>
					<td><span class="labels">货量：</span>2315kg/3.6m³</td>
					<td><span class="labels">件数：</span>3445</td>
				</tr>
				<tr>
					<td><span class="labels">调度员：</span>吴正平</td>
					<td><span class="labels">调度电话：</span>12345669</td>
					<td><span class="labels">调度时间：</span>2014-03-33 23:33</td>
				</tr>
				<tr>
					<td><span class="labels">司机：</span>罗凯</td>
					<td><span class="labels">司机电话：</span>12345669</td>
					<td><span class="labels">接单时间：</span>2014-03-33 23:33</td>
				</tr>
				<tr>
					<td><span class="labels">押运员：</span>晓晓</td>
					<td><span class="labels">押运电话：</span>12345669</td>
					<td></td>
				</tr>
			</table>
		</div>
		<TaskListItem v-for="(i,index) in 3" :key="index" :index="index"></TaskListItem>
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
import request from '../../common/request'
import TaskListItem from './Common/TaskListItem'
export default {
	data() {
		return {

		}
	},
	created() {
		
	},
	methods: {
		
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
