<template>
	<div class="main-content">
		<div class="wf-card">
			<TaskItem></TaskItem>
			<div class="tit">运输照片</div>
			<div class="picList">
				<div class="title">装车照片<span>(5)</span></div>
				<div class="con"></div>
			</div>
			<div class="picList">
				<div class="title">到货照片<span>(5)</span></div>
				<div class="con"></div>
			</div>
			<div class="picList">
				<div class="title">回单照片<span>(5)</span></div>
				<div class="con"></div>
			</div>
			<div class="picList">
				<div class="title">异常上报<span>(5)</span></div>
				<div class="con"></div>
			</div>
			<div class="handle text-center">
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
.tit
	padding 6px 10px
	height 36px
	line-height 24px
	background #e2ecf6
	color #3582d0
	font-size 13px
.picList
	padding 10px
	border 1px solid #e2ecf6
	border-top none
	.title
		border-bottom 1px solid #e2ecf6
		font-size 12px
		line-height 24px
		color #999
		span
			color #409eff
			margin-left 5px
	.con
		padding 10px
.handle
	margin-top 10px	
</style>