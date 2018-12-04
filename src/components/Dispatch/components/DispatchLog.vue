<template>
	<div class="dispatchLog">
		<p class="dispatchLogTit">调度日志</p>
		<ul v-if="dispatchLog.length>0">
			<!-- 日志动作: Accept-接单 Offer-报价/抢单 Comfirm-确认抢单/报价 Load-装车 Unload-到货 Upload-运输上报 Refuse-拒绝接单 Canceled-取消 Overdue-超时取消  -->
			<li v-for="(logsItem,index) in dispatchLog" :key="index">
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
					<span class="action" v-else-if="logsItem.action =='ArrivedOffset'" style="color:#f00">未送达指定点</span>
					<span class="action" v-else>超时取消</span>
					<span class="dateTime"  :style="(logsItem.action =='StopOvertime' || logsItem.action =='ArrivedOffset')?'color:#f00':''">{{logsItem.createTime | getdatefromtimestamp }}</span>
				</p>
				<p v-if="logsItem.action =='StopOvertime'" style="color:#F00">
					停车地址：{{logsItem.StopOverAddress}} 
				</p>
				<p :style="(logsItem.action =='StopOvertime' || logsItem.action =='ArrivedOffset')?'color:#f00':''">{{logsItem.description}}</p>
				<p v-if="logsItem.action =='Load'">装车地址：{{logsItem.posAddress}}</p>
				<p v-if="logsItem.action =='Unload'">到货地址：{{logsItem.posAddress}}</p>
			</li>
		</ul>
		<p class="dispatchTips c2" v-else>暂无调度日志</p>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import DispatchOrder from '../../../api/DispatchOrder'
import AutoNavMap from '../../../api/AutoNavMap'
import { AMAPKEY } from '../../../common/const'
export default {
	props: {
		dispatchOrderID:String
	},
	data() {
		return {
			dispatchLog:[]
		}
    },
    watch: {
        dispatchOrderID: {
    　　　　handler(newValue, oldValue) {
    　　　　　　this.getLogs()
    　　　　},
    　　　　deep: true
    　　}
    },
	mounted() {
        this.getLogs()
    },
	methods: {
		async getLogs() {
			const dispatchLog = await DispatchOrder.logList({ dispatchOrderID:this.dispatchOrderID })
			for(let i=0;i<dispatchLog.length;i++){
				if(dispatchLog[i].action=='StopOvertime'){
					const {data} =  await AutoNavMap.getLocation({
						key:AMAPKEY,
						location:dispatchLog[i].longitude+','+dispatchLog[i].latitude
					})
					const StopOverAddress = data.regeocode.formatted_address
					dispatchLog[i].StopOverAddress = StopOverAddress
				
				}
			}
			this.dispatchLog = dispatchLog
		}
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
