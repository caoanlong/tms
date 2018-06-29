<template>
	<div class="item" @click="viewtaskdetail(taskItem.dispatchTaskID)">
		<div class="lineInfo">
			<div class="tit"><span>任务{{index+1}}</span> 
				<el-tag size="mini" style="float:right;position:relative;top:50%;transform:translateY(-50%)" type="warning" v-if="taskItem.status == 'Committed'">待装车</el-tag>
				<el-tag size="mini" style="float:right;position:relative;top:50%;transform:translateY(-50%)" v-else-if="taskItem.status == 'Loaded'">已装运</el-tag>
				<el-tag size="mini" style="float:right;position:relative;top:50%;transform:translateY(-50%)" type="success" v-else-if="taskItem.status == 'Signed'">已签收</el-tag>
			</div>
			<div class="con">
				<table>
					<tr>
						<td class="from">
							<img src="../../../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="companyName">{{taskItem.shipperCompanyName}}</p>
							<p>{{taskItem.shipperName}}{{taskItem.shipperPhone?('/'+taskItem.shipperPhone):''}}</p>
						</td>
						<td>
							<p>{{taskItem.cargoName}}</p>
							<p>{{taskItem.loadWeightSum?(taskItem.loadWeightSum+'kg/'):''}}{{taskItem.loadVolumeSum?(taskItem.loadVolumeSum+'m³/'):''}}{{taskItem.loadNumSum?(taskItem.loadNumSum+'件'):''}}</p>
						</td>
						<td class="to">
							<img src="../../../../assets/imgs/avatar.gif" class="headPic"/>
							<p class="companyName">{{taskItem.consigneeCompanyName}}</p>
							<p>{{taskItem.consigneeName}}{{taskItem.consigneePhone?('/'+taskItem.consigneePhone):''}}</p>
						</td>
					</tr>
					<tr>
						<td class="area">{{taskItem.shipperArea}}</td>
						<td rowspan="2"><p class="plateNo">{{plateNo}}{{trailerPlateNo?('/'+trailerPlateNo):''}}</p></td>
						<td class="area">{{taskItem.consigneeArea}}</td>
					</tr>
					<tr>
						<td>
							<p class="datetime">{{taskItem.shipperDate | getdatefromtimestamp(true)}}（预计发货）</p>
							<p class="datetime c2" v-if="taskItem.shipperActualDate">{{taskItem.shipperActualDate | getdatefromtimestamp(true)}}（实际发货）</p>
						</td>
						<!-- <td><p></p></td> -->
						<td>
							<p class="datetime">{{taskItem.consigneeDate | getdatefromtimestamp(true)}}（预计到货）</p>
							<p class="datetime c2" v-if="taskItem.consigneeActualDate">{{taskItem.consigneeActualDate | getdatefromtimestamp(true)}}（实际到货）</p>
						</td>
					</tr>
					<tr>
						<td colspan="3">
							实付运费:¥{{taskItem.amountSum}}
							（{{[
								(taskItem.driverCashAmount+taskItem.superCargoCashAmount) > 0 ? '现付:￥' + (taskItem.driverCashAmount+taskItem.superCargoCashAmount) : '',
								(taskItem.driverCodAmount+taskItem.superCargoCodAmount) > 0 ? '到付:￥' + (taskItem.driverCodAmount+taskItem.superCargoCodAmount) : '',
								(taskItem.driverPorAmount+taskItem.superCargoCorAmount) > 0 ? '回单:￥' + (taskItem.driverPorAmount+taskItem.superCargoCorAmount) : '',
								(taskItem.driverMonthlyAmont+taskItem.superCargoMonthlyAmount) > 0 ? '月结:￥' + (taskItem.driverMonthlyAmont+taskItem.superCargoMonthlyAmount) : '',
								(taskItem.driverCosigneeAmount+taskItem.superCosigneeAmount) > 0 ? '收货方到付:￥' + (taskItem.driverCosigneeAmount+taskItem.superCosigneeAmount) : '',
								(taskItem.driverDetoursAmount+taskItem.superCargoDetoursAmount) > 0 ? '绕路费:￥' + (taskItem.driverDetoursAmount+taskItem.superCargoDetoursAmount) : '',
								(taskItem.driverOtherAmount+taskItem.superCargoOtherAmount) > 0 ? '其他:￥' + (taskItem.driverOtherAmount+taskItem.superCargoOtherAmount) : '',
							].filter(item => item).join('，')}})
						</td>
					</tr>
					<tr v-if="taskItem.dispatchTaskPicList.length>0">
						<td colspan="3">任务照片</td>
					</tr>
					<tr v-if="taskItem.dispatchTaskPicList.length>0">
						<td colspan="3">
							<ImageUpload :isShowType="true" :objs="taskItem.dispatchTaskPicList" :files="taskItem.dispatchTaskPicList.map(item => item.minURL)" :isPreview="true"/>
						</td>
					</tr>
				</table>
				<span class="viewtaskdetailBtn"><img src="../../../../assets/imgs/viewtaskdetailBtn.png" /></span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { resizeImg } from '../../../../common/utils'
import ImageUpload from '../../../CommonComponents/ImageUpload2'
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
	computed: {
		resizeImg: () => resizeImg
	},
	data(){
		return{
		}
	},
	components: {ImageUpload},
	methods:{
		viewtaskdetail(dispatchTaskID){
			this.$router.push({ name: 'viewtaskdetail' , query: { dispatchTaskID } })
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
			padding 5px 10px
			height 40px
			line-height 30px
			border-bottom 1px solid #e2ecf6
		.con
			margin-bottom 10px
			color #666
			padding 10px 40px 10px 10px
			position relative
			
			p
				margin 0
				line-height 30px
				&.datetime
					line-height 20px
					font-size 12px
					color #999
				&.c2
					color #f90
				&.plateNo
					display block
					background url('../../../../assets/imgs/arrowBig2.png') no-repeat left bottom
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
			.viewtaskdetailBtn
				width 20px
				height 75px
				position absolute
				top 50%
				right 10px
				cursor pointer
				transform translateY(-50%)
				
	.picItem
		width 80px
		height 100px
		margin-right 5px
		cursor pointer
		display inline-block
		img
			width 80px
			height 80px
			vertical-align top
		p
			height 20px
			line-height 20px
			text-align center
			font-size 12px
			color #999
.dialogBody
	position relative
	width 100%
	height 400px
	padding 20px
	.bigPic
		max-width 100%
		max-height 100%
	.picdes
		position absolute
		bottom 0
		background rgba(0,0,0,.3)
		height 60px
		left 0
		right 0
		padding 0 10px
		p
			color #fff
			margin 0
			line-height 30px
		.statusTag
			position absolute
			right 10px
			top 10px
			padding 2px 10px
			background #f80
			color #fff
			border-radius 4px	
			height 22px
			line-height 18px
</style>
