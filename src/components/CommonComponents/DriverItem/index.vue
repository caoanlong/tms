<template>
	<div class="listItem" >
		<div class="driverNum inlineBlock" ><span>7</span></div>
		<div class="pic inlineBlock" >
			<img src="../../../assets/imgs/avatar.gif" >
			<p class="status">空载</p>
		</div>
		<div class="info inlineBlock">
			<p class="driverName">李司机</p>
			<p class="vehicleNo">云AG17885</p>
			<p class="trailerNo">云AG28937挂</p>
			<p class="vehicleType">7.2米重型集装箱半挂车</p>
		</div>
		<div class="statusInfo inlineBlock">
			<div class="control">
				<div class="sliderSelect">
					<span class="labels">配载重量</span><el-progress :percentage="70" style="margin-top:13px"></el-progress><span class="surplus">剩</span>
				</div>
				<div class="sliderSelect">
					<span class="labels">配载体积</span><el-progress :percentage="70" style="margin-top:13px"></el-progress><span class="surplus">剩</span>
				</div>
				<div class="sliderSelect">
					<span class="labels">配载件数</span><el-progress :percentage="70" style="margin-top:13px"></el-progress><span class="surplus">剩</span>
				</div>
			</div>
		</div>
		<div class="lineInfo inlineBlock">
			从<span>云南</span>到<span>上海</span><span>炸药/R27 5吨</span><span>“收货单位”</span>
		</div>
		<svg-icon icon-class="select-icon" class="icon" :class="{selected:isSelected == index}"></svg-icon>
	</div>
</template>

<script>
export default {
	props: {
		isSelected: {
			type: Number
		},
		index: {
			type: Number
		}
	},
	data(){
		return {
			weight:0,
			volume:0,
			quantity:0
		}
	},
	methods:{

	}
}
</script>

<style lang="stylus" scoped>
	.listItem
		border 1px solid #ebeef5
		margin-bottom 10px
		padding 10px
		font-size 12px
		hiehgt 120px
		position relative
		&.selected
			border-color #409EFF
		p
			margin 0
			line-height 30px
		.pic
			width 100px
			padding 0 10px
			vertical-align top
			height 120px
			img
				width 80px
				height 80px
				vertical-align top
			.status
				text-align center
		.driverNum
			width 50px
			padding 0 10px
			vertical-align top
			position relative
			height 100px
			span
				width 30px
				height 30px
				border-radius 15px
				line-height 30px
				text-align center
				color #fff
				background #666
				display block
				position absolute
				top 50%
				margin-top -15px
				font-size 12px
				cursor pointer
		.info
			width 180px
			p
				height 30px
				line-height 30px
				overflow hidden
				white-space nowrap
				text-overflow ellipsis
		.statusInfo
			padding 0 20px
			border-left 1px solid #ebeef5
			vertical-align top
			margin-left 15px
			.control
				width 320px
			.sliderSelect
				display inline-block
				width 320px
				height 40px
				padding 0 100px 0 80px
				position relative
				.labels
					position absolute
					left 0
					top 0
					line-height 40px
				.surplus
					position absolute
					right 0
					top 0
					line-height 40px
					width 80px
		.lineInfo
			width 100%
			padding-top 10px
			border-top 1px solid #ebeef5
		.icon
			font-size 36px
			position absolute
			right -1px
			top -1px
			color #eee
			cursor pointer
			&.selected
				color #409EFF
</style>
