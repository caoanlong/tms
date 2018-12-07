<template>
	<div class="dispatchLog">
		<p class="dispatchLogTit">调度日志</p>
		<ul>
			<!-- 日志动作: Accept-接单 Offer-报价/抢单 Comfirm-确认抢单/报价 Load-装车 Unload-到货 Upload-运输上报 Refuse-拒绝接单 Canceled-取消 Overdue-超时取消  -->
			<li v-for="(logsItem,index) in logList" :key="index">
				<p>
					<span class="action" v-if="logsItem.action =='Accept'">接单</span>
					<span class="action" v-else-if="logsItem.action =='Offer'">报价/抢单</span>
					<span class="action" v-else-if="logsItem.action =='Comfirm'">确认抢单/报价</span>
					<span class="action" v-else-if="logsItem.action =='Load'">装车</span>
					<span class="action" v-else-if="logsItem.action =='Unload'">到货</span>
					<span class="action" v-else-if="logsItem.action =='Upload'">运输上报</span>
					<span class="action" v-else-if="logsItem.action =='Refuse'">拒绝接单</span>
					<span class="action" v-else-if="logsItem.action =='Canceled'">取消</span>
					<span class="action" v-else-if="logsItem.action =='StopOvertime'" style="color:#f00">停车超时</span>
					<span class="action" v-else-if="logsItem.action =='ArrivedOffset'" style="color:#f00">卸货异常</span>
					<span class="action" v-else>超时取消</span>
					<span class="dateTime"  :style="(logsItem.action =='StopOvertime' || logsItem.action =='ArrivedOffset')?'color:#f00':''">{{logsItem.createTime | getdatefromtimestamp }}</span>
				</p>
				<p v-if="logsItem.action =='StopOvertime'" style="color:#F00">
					停车地址：{{logsItem.StopOverAddress}} 
				</p>
				<p :style="(logsItem.action =='StopOvertime' || logsItem.action =='ArrivedOffset')?'color:#f00':''">{{logsItem.description}}</p>
                <p v-if="logsItem.action =='Load'">装车地址：{{logsItem.posAddress}}</p>
                <p v-if="logsItem.action =='Unload'">到货地址：{{logsItem.posAddress}}</p>
                <p v-if="logsItem.action =='ArrivedOffset'" style="color:#f00">卸货地址：{{logsItem.posAddress}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		logList:Array,
	}
}
</script>

<style lang="stylus" scoped>
	.dispatchLogTit
		border-top 1px solid #ddd
		padding-top 10px
	.dispatchLog
		ul
			padding-left 40px
			li
				padding 5px 
				list-style none
				position relative
				&:before
					content ""
					width 6px
					height 6px
					background #ccc
					display block
					position absolute
					left -10px
					top 17px
				p
					line-height 30px
					color #999
					&~p
						line-height 20px
						font-size 12px
		.dispatchTips
			padding 20px 0 0 40px
</style>
