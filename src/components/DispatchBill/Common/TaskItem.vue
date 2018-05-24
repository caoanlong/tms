<template>
	<div class="item">
		<table class="lineInfo">
			<tr>
				<td colspan="2" class="tit"><span class="justify">任务单号</span>919239801 <span class="status fr">待装车</span></td>
			</tr>
			<tr>
				<td><span class="justify">发货地</span>云南昆明官渡区浩宏物流园</td>
				<td><span class="justify">收货地</span>广东广州朱家村云海路1123号广元自贸区</td>
			</tr>
			<tr>
				<td><span class="justify">联系人</span>朱静静</td>
				<td><span class="justify">联系人</span>郝晓晓</td>
			</tr>
			<tr>
				<td><span class="justify">联系电话</span>13800138000</td>
				<td><span class="justify">联系电话</span>13800138001</td>
			</tr>
			
			<tr>
				<td>
					<span class="justify">发货时间</span>2018-06-13 17:51
				</td>
				<td>
					<span class="justify">到货时间</span>2018-06-25 14:24
				</td>
			</tr>
		</table>
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
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
			</tr>
			<tr class="text-center">
				<td>随行人员</td>
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
				<td><el-input size="mini"></el-input></td>
			</tr>
		</table>
	</div>
</template>
<script type="text/javascript">
export default {

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
		&.lineInfo
			td
				width 50%
				padding 6px 10px 6px 90px
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
</style>
