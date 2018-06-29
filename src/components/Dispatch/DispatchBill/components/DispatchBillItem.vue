<template>
	<div class="item">
		<div class="dispatchbillInfo">
			<span class="infoItem">调度单号：20170603002464001</span>
			<span class="infoItem">状态：未接单</span>
			<span class="infoItem">车牌号/挂车号：粤A08H9L/F0009挂</span>
			<span class="infoItem">司机：孙洪</span>
			<span class="infoItem">押运员：吴相博</span>
			<span class="infoItem">创建人：石艳娇</span>
			<span class="infoItem">创建时间：2018-04-20 18:33:15</span>
		</div>
		<div class="carrierBillInfo">
			<el-table border style="width: 100%" size="mini" stripe>
				<el-table-column label="任务单号" width="180" align="center" fixed="left">
				</el-table-column>
				<el-table-column label="任务状态" align="center">
				</el-table-column>
				<el-table-column label="货物类型" align="center">
				</el-table-column>
				<el-table-column label="货物名称">
				</el-table-column>
				<el-table-column label="配载量">
				</el-table-column>
				<el-table-column label="收货时间" width="140" align="center">
				</el-table-column>
				<el-table-column label="收货地" width="180" align="center">
				</el-table-column>
				<el-table-column label="发货时间" width="180" align="center">
				</el-table-column>
				<el-table-column label="创建人" width="180" align="center">
				</el-table-column>
				<el-table-column label="创建时间" width="140" align="center">
				</el-table-column>
				<el-table-column label="操作" width="60" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="primary" size="mini">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {

}

</script>
<style lang="stylus" scoped>
.item
	margin-bottom 10px
	.dispatchbillInfo
		padding 5px 15px
		line-height 30px
		font-size 13px
		border 1px solid #ebeef5
		border-bottom none
		background #f3f7fa
		.infoItem
			display inline-block
			color #3582d0
			margin-right 20px
</style>
