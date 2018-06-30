<template>
	<div class="driverItem">
		<div class="truckInfo">
			车辆
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
export default {
	data() {
		return {
		   
		}
	},
}
</script>

<style lang="stylus" scoped>
.driverItem
	position relative
	padding-right 520px
	border 1px solid  #f0f0f0
	margin-top 5px
	font-size 12px
	height 82px
	.driver
	.mobile
	.handle
		border-left 1px solid #f0f0f0
		position absolute
		top 0
		background #fff
		height 80px
	.truckInfo
		width 100%
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
		height 40px
		line-height 40px
		&:first-child
			border-bottom 1px solid #f0f0f0
	.driverInfo
		padding 0 10px
		.driverName
			margin-right 10px
</style>
