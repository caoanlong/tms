<template>
	<div class="main-content">
		<div class="wf-card">
		<div class="dispatchbillInfo">
			<span class="infoItem">调度单号：20170603002464001</span>
			<span class="infoItem">状态：未接单</span>
			<span class="infoItem">车牌号/挂车号：粤A08H9L/F0009挂</span>
			<span class="infoItem">司机：孙洪</span>
			<span class="infoItem">押运员：吴相博</span>
			<span class="infoItem">创建人：石艳娇</span>
			<span class="infoItem">创建时间：2018-04-20 18:33:15</span>
		</div>
		<TaskItem></TaskItem>
		<table class="dispatch">
			<tr>
				<td colspan="6" class="tit">运力调度</td>
			</tr>
			<tr>
				<th>档案编号</th><td>YS001</td><th>车牌号</th><td>晋A0098LK</td><th>随行人员</th><td>林祥林</td>
			</tr>
			<tr>
				<th>司机</th><td>黄有龙</td><th>挂车牌号</th><td>FA0098L挂</td><th>角色</th><td>安全员</td>
			</tr>
			<tr>
				<th>联系方式</th><td>13456780011</td><th>车型/车长</th><td>集装箱挂车/5.8米</td><th>联系方式</th><td>13811701654</td>
			</tr>
		</table>
		<div class="handle text-center">
			<el-button>取消</el-button>
			<el-button>删除</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../common/request'
import TaskItem from './Common/TaskItem'
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
		TaskItem
	}
}

</script>
<style lang="stylus" scoped>

.dispatchbillInfo
	background #e2ecf6
	padding 5px 15px
	line-height 30px
	font-size 13px
	margin-bottom 10px
	.infoItem
		display inline-block
		color #3582d0
		margin-right 20px
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
