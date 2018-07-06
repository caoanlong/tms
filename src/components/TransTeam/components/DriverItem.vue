<template>
	<div class="driverItem">
		<div class="truck">
			<div class="truckPic fl">
				<img :src="defaultImg" />
			</div>
			<div class="truckInfo fl">
				<p><span class="plateNo">粤B-66688 </span>
					<el-tag size="mini">作业</el-tag>
					<!-- <el-tag size="mini" type="warning">空闲</el-tag> -->
					<el-tag size="mini" type="info">挂车</el-tag>
					<el-tooltip placement="right" effect="light">
						<div slot="content">
							<el-tag size="mini" type="danger">驾驶证到期</el-tag> 
							<el-tag size="mini" type="danger">身份证到期</el-tag> 
							<el-tag size="mini" type="danger">从业资格证到期</el-tag>
						</div>
						<el-tag size="mini" type="danger">到期</el-tag>
					</el-tooltip>
				</p>
				<p>9.6米/高栏/22吨/3.5方</p>
			</div>
			<div class="truckHandle fl">
				<span>查看档案</span>
				<span>编辑档案</span>
				<span>删除车辆</span>
			</div>
		</div>
		<div class="driver">
			<div class="driverInfo"><span class="driverName">罗凯 </span>
				<el-tooltip placement="top" >
					<div slot="content">开通APP接单</div>
					<el-tag size="mini">APP</el-tag> 
				</el-tooltip>
				<el-tooltip placement="right" effect="light">
					<div slot="content">
						<el-tag size="mini" type="danger">驾驶证到期</el-tag> 
						<el-tag size="mini" type="danger">身份证到期</el-tag> 
						<el-tag size="mini" type="danger">从业资格证到期</el-tag>
					</div>
					<el-tag size="mini" type="danger">到期</el-tag>
				</el-tooltip>
			</div>
			<div class="driverInfo"><span class="driverName">吴正平 </span>
				<el-tag type="info" size="mini">APP</el-tag> 
				<el-tooltip placement="right" effect="light">
					<div slot="content">
						<el-tag size="mini" type="danger">驾驶证到期</el-tag> 
						<el-tag size="mini" type="danger">身份证到期</el-tag> 
						<el-tag size="mini" type="danger">商业险到期</el-tag>
					</div>
					<el-tag size="mini" type="danger">到期</el-tag>
				</el-tooltip>
			</div>
		</div>
		<div class="mobile">
			<div class="mobileItem">13423899694</div>
			<div class="mobileItem">13723592463</div>
		</div>
		<div class="handle">
			<div class="handleItem">
				<span>设为主驾</span>
				<span>人员替换</span>
				<span>删除</span>
			</div>
			<div class="handleItem">
				<span>设为主驾</span>
				<span>人员替换</span>
				<span>删除</span>
			</div>
		</div>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import { defaultImg } from '../../../assets/icons/icons'
export default {
	data() {
		return {
		   
		}
	},
	computed: {
		defaultImg: () => defaultImg
	}
}
</script>

<style lang="stylus" scoped>
.driverItem
	position relative
	padding-right 520px
	border 1px solid  #f0f0f0
	margin-bottom 10px
	font-size 12px
	height 92px
	.driver
	.mobile
	.handle
		border-left 1px solid #f0f0f0
		position absolute
		top 0
		background #fff
		height 90px
	.truck
		width 100%
		padding 10px
		height 90px
		min-width 380px
		position relative
		.truckPic
			margin-right 10px
			img
				width 50px
				height 50px
				vertical-align top
				border-radius 3px
		.truckInfo
			p
				margin 0
				line-height 20px
				color #666
				&:first-child
					line-height 30px
				.plateNo
					font-weight bold
					font-size 16px
		.truckHandle
			height 30px
			width 100%
			line-height 30px
			span
				color #409eff
				cursor pointer
				margin-right 20px
	.handle
		width 179px
		right 0
		text-align center
		span
			padding 0 5px
			color #409eff
			cursor pointer
	.driver
		width 200px
		right 319px
	.mobile
		width 140px
		right 179px
		text-align center
	.mobileItem
	.driverInfo
	.handleItem
		height 45px
		line-height 45px
		&:first-child
			border-bottom 1px solid #f0f0f0
	.driverInfo
		padding 0 10px
		.driverName
			margin-right 10px
</style>
