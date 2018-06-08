<template>
	<div class="item">
		<div class="lineInfo">
			<div class="tit"><span>任务{{index+1}}</span> 
				<span class="status fr" v-if="taskItem.status='Committed'">待执行</span>
				<span class="status fr" v-else-if="taskItem.status='Loaded'">已装运</span>
				<span class="status fr" v-else-if="taskItem.status='Signed'">已签收</span>
				<span class="status fr" v-else>已作废</span>
			</div>
			<div class="con">
				<table>
					<tr>
						<td class="from">
							<img src="../../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="companyName">{{taskItem.shipperCompanyName}}</p>
							<p>{{taskItem.shipperName}}{{taskItem.shipperPhone?('/'+taskItem.shipperPhone):''}}</p>
						</td>
						<td>
							<p>{{taskItem.cargoName}}</p>
							<p>{{taskItem.loadWeightSum?(taskItem.loadWeightSum+'kg/'):''}}{{taskItem.loadVolumeSum?(taskItem.loadVolumeSum+'m³/'):''}}{{taskItem.loadNumSum?(taskItem.loadNumSum+'件'):''}}</p>
						</td>
						<td class="to">
							<img src="../../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="companyName">{{taskItem.consigneeCompanyName}}</p>
							<p>{{taskItem.consigneeName}}{{taskItem.consigneePhone?('/'+taskItem.consigneePhone):''}}</p>
						</td>
					</tr>
					<tr>
						<td class="area">{{taskItem.shipperArea}}</td>
						<td><img src="../../../assets/imgs/arrowBig.png" width="100"/></td>
						<td class="area">{{taskItem.consigneeArea}}</td>
					</tr>
					<tr>
						<td>
							<p class="datetime">{{taskItem.shipperDate | getdatefromtimestamp()}}（预计发货）</p>
							<p class="datetime c2" v-if="taskItem.shipperActualDate">{{taskItem.shipperActualDate | getdatefromtimestamp()}}（实际发货）</p>
						</td>
						<td><span>{{plateNo}}{{trailerPlateNo?('/'+trailerPlateNo):''}}</span></td>
						<td>
							<p class="datetime">{{taskItem.consigneeDate | getdatefromtimestamp()}}（预计到货）</p>
							<p class="datetime c2" v-if="taskItem.consigneeActualDate">{{taskItem.consigneeActualDate | getdatefromtimestamp()}}（实际到货）</p>
						</td>
					</tr>
					<tr>
						<td colspan="3">实付运费:¥{{taskItem.amountSum}}（
							<span v-if="(taskItem.driverCashAmount+taskItem.superCargoCashAmount)>0">现付:￥{{taskItem.driverCashAmount+taskItem.superCargoCashAmount}}</span>
							<span v-if="(taskItem.driverCodAmount+taskItem.superCargoCodAmount)>0">,到付:￥{{taskItem.driverCodAmount+taskItem.superCargoCodAmount}}</span>
							<span v-if="(taskItem.driverPorAmount+taskItem.superCargoCorAmount)>0">,回单:￥{{taskItem.driverPorAmount+taskItem.superCargoCorAmount}}</span>
							<span v-if="(taskItem.driverMonthlyAmont+taskItem.superCargoMonthlyAmount)>0">,月结:￥{{taskItem.driverMonthlyAmont+taskItem.superCargoMonthlyAmount}}</span>
							<span v-if="(taskItem.driverCosigneeAmount+taskItem.superCosigneeAmount)>0">,收货方到付:￥{{taskItem.driverCosigneeAmount+taskItem.superCosigneeAmount}}</span>
							<span v-if="(taskItem.driverDetoursAmount+taskItem.superCargoDetoursAmount)>0">,绕路费:￥{{taskItem.driverDetoursAmount+taskItem.superCargoDetoursAmount}}</span>
							<span v-if="(taskItem.driverOtherAmount+taskItem.superCargoOtherAmount)>0">,其他:￥{{taskItem.driverOtherAmount+taskItem.superCargoOtherAmount}}</span>
							)
						</td>
					</tr>
					<tr>
						<td colspan="3">任务照片</td>
					</tr>
					<tr>
						<td colspan="3">
							<div class="picItem" v-for="(pic,index) in taskItem.dispatchTaskPicList" :key="index">
								<img src="pic.minURL"/>
								<p class="text-center" v-if="pic.type='Loaded'">装车照片</p>
								<p class="text-center" v-else-if="pic.type='Arrived'">送达照片</p>
								<p class="text-center" v-else-if="pic.type='Received'">回单照片</p>
								<p class="text-center" v-else-if="pic.type='Unusual'">异常照片</p>
							</div>
						</td>
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
		},
		taskItem:{
			type: Object
		},
		plateNo:{
			type: String
		},
		trailerPlateNo:{
			type: String
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
