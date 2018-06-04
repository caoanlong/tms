<template>
	<div class="item">
		<div class="lineInfo">
			<div class="tit"><span>任务{{index+1}}</span> <span class="status fr">待装车</span></div>
			<div class="con">
				<table>
					<tr>
						<td class="from">
							<img src="../../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="companyName">深圳飞天贸易</p>
							<p>13424389894</p>
						</td>
						<td>
							<p>啤酒、饮料、花生</p>
							<p>36吨/240方/6000件</p>
						</td>
						<td class="to">
							<img src="../../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="companyName">库那天交运贸易</p>
							<p>13424389894</p>
						</td>
					</tr>
					<tr>
						<td class="area">广东深圳</td>
						<td></td>
						<td class="area">云南昆明</td>
					</tr>
					<tr>
						<td>
							<p class="datetime">2018-06-13 17:51（预计发货）</p>
							<p class="datetime c2">2018-06-25 14:24（实际发货）</p>
						</td>
						<td><span>粤BT63Y6</span></td>
						<td><p class="datetime">2018-06-15 13:24（预计到货）</p></td>
					</tr>
					<tr>
						<td colspan="3">实付运费 ¥2630.00元（预付现金2000.00，到付630.00）</td>
					</tr>
					<tr>
						<td colspan="3">任务照片</td>
					</tr>
			</table>
			</div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
export default {
	props:{
		index:{
			type: Number,
			default: 1
		}
	},
	data(){
		return{

		}
	}
}

</script>
<style lang="stylus" scoped>
.item
	margin-bottom 10px
	table
		width 100%
		border-spacing 0
		font-size 14px
		td
			background #fff
			width 33.3333333%
			padding 6px 10px
			height 36px
			line-height 24px
			color #666
			position relative
	.lineInfo
		font-size 14px
		border 1px solid #e2ecf6
		.tit
			color #3582d0
			padding 6px 10px
			height 36px
			line-height 24px
			border-bottom 1px solid #e2ecf6
		.con
			margin-bottom 10px
			color #666
			padding 10px
			p
				margin 0
				line-height 30px
				&.datetime
					line-height 20px
					font-size 12px
					color #999
				&.c2
					color #f90
			.area
				font-weight bold
				color #000
			.from
			.to
			.driver
			.dispatcher
			.escort
				padding-left 60px
				position relative
				.headPic
					width 40px
					height 40px
					border-radius 20px
					position absolute
					left 10px
					top 10px
				.companyName
					font-size 16px
					color #333
				
			.driver
			.dispatcher
			.escort
				height 60px
				.name
					font-size 16px
					.tag
						margin-left 20px
						color #fff
						font-size 12px
						padding 2px 10px
						border-radius 10px
			.driver
				.tag
					background #f90
			.dispatcher
				.tag
					background #69f
			.escort
				border-left 1px solid #f8f8f8
				border-right 1px solid #f8f8f8
				.tag
					background #69c
			.platNo
				position relative
				border-left 1px solid #f8f8f8
				border-right 1px solid #f8f8f8
				span
					position absolute
					top 50%
					left 50%
					transform translate(-50%,-50%)
					font-size 18px
				
</style>
