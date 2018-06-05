<template>
	<div class="item">
		<div class="lineInfo">
			<div class="tit"><span>任务单号：919239801</span> <span class="status fr">待装车</span></div>
			<div class="con">
				<div class="from">
					<img src="../../../assets/imgs/avatar.gif" class="headPic"/>
					<p class="companyName">深圳飞天贸易</p>
					<p>13424389894</p>
					<p class="area">广东深圳</p>
					<p class="datetime">2018-06-13 17:51（预计发货）</p>
					<p class="datetime c2">2018-06-25 14:24（实际发货）</p>
				</div>
				<div class="platNo"><span>粤BT63Y6</span></div>
				<div class="to">
					<img src="../../../assets/imgs/avatar.gif" class="headPic"/>
					<p class="companyName">库那天交运贸易</p>
					<p>13424389894</p>
					<p class="area">云南昆明</p>
					<p class="datetime">2018-06-15 13:24（预计到货）</p>
				</div>
			</div>
		</div>
		<div class="personInfo">
			<div class="tit">人员信息</div>
			<div class="con">
				<div class="driver">
					<img src="../../../assets/imgs/avatar.gif" class="headPic"/>
					<p class="name">吴郑平<span class="tag">司机</span></p>
					<p>13424389894</p>
				</div>
				<div class="escort">
					<img src="../../../assets/imgs/avatar.gif" class="headPic"/>
					<p class="name">吴郑平<span class="tag">司机</span></p>
					<p>13424389894</p>
				</div>
				<div class="dispatcher">
					<img src="../../../assets/imgs/avatar.gif" class="headPic"/>
					<p class="name">吴郑平<span class="tag">司机</span></p>
					<p>13424389894</p>
				</div>
			</div>
		</div>
		<table class="cargoList">
			<tr>
				<td class="tit" colspan="4">货物清单</td>
			</tr>
			<tr>
				<td>重货</td><td>纸箱，16盒/箱</td><td>太古咖啡</td><td>6吨/40方/1000件</td>
			</tr>
			<tr>
				<td>轻货</td><td>纸箱，16盒/箱</td><td>雀巢咖啡</td><td>6吨/40方/1000件</td>
			</tr>
			<tr>
				<td>重货</td><td>易拉罐，12听/件</td><td>金威啤酒</td><td>6吨/40方/1000件</td>
			</tr>
		</table>
		<table class="fare">
			<tr>
				<td class="tit" colspan="7">付款费用</td>
			</tr>
			<tr>
				<th width="100">付给人员</th>
				<th>现付</th>
				<th>到付</th>
				<th>回单结</th>
				<th>月结</th>
				<th>收货方付款</th>
				<th>合计</th>
			</tr>
			<tr class="text-center">
				<td>司机</td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
			</tr>
			<tr class="text-center">
				<td>随行人员</td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
				<td><el-input size="mini" :disabled="isEdit"></el-input></td>
			</tr>
		</table>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			isEdit: true
		}
	}
}

</script>
<style lang="stylus" scoped>
.item
	margin-bottom 10px
	table
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
			.justify
				width 80px
				height 24px
				display inline-block
				vertical-align top
				padding-right 20px
				color #3582d0
				text-align justify
				position absolute
				left 12px
				top 6px
				&:after
					content '：'
					position relative
					top -24px
					padding-left 100%
					display inline-block
		th
			background #f8f8f8
			padding 6px 10px
			height 36px
			line-height 24px
			color #666
	.lineInfo
	.personInfo
		font-size 14px
		.tit
			background #e2ecf6
			color #3582d0
			padding 6px 10px
			height 36px
			line-height 24px
		.con
			display flex
			border 1px solid #e2ecf6
			border-top none
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
				.area
					font-weight bold
					color #000
			div
				flex 1
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
