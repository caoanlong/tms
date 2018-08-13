<template>
	<div class="dispatchItem">
		<table class="dispatchTable">
			<tr>
				<td colspan="10"><span>调度单号：23456788801</span><el-tag size="mini">抢</el-tag></td>
			</tr>
			<tr>
				<td>6564997</td>
				<td>待装车</td>
				<td>啤酒，可乐...</td>
				<td>2200kg/2.3m³</td>
				<td>332</td>
				<td>云南昆明</td>
				<td>2018-03-01 22:22</td>
				<td>广东深圳</td>
				<td>2018-03-01 22:22</td>
			</tr>
		</table>
	</div>
</template>
<script type="text/javascript">
	export default {
		
	}
</script>
<style lang="stylus" scoped>
	.dispatchTable
		font-size 14px
		background #dcdfe6
		border-spacing 1px
		width 100%
		margin-top 10px
		p
			margin 0
			padding 0
			line-height 18px
			white-space  nowrap 
			&:first-child
				margin-bottom 5px
		th
			background #f2f2f2
			color #666
			padding 10px 15px
			white-space  nowrap
			height 61px
		td
			padding 10px 15px
			background #fff
			white-space  nowrap 
</style>