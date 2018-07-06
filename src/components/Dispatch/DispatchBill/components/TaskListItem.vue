<template>
	<div class="section-block" @click="viewtaskdetail(taskItem.dispatchTaskID)">
		<span class="block-title">任务{{index+1}}</span>
		<div class="statusTag">
			<el-tag size="mini" type="warning" v-if="taskItem.status == 'Committed'">待装车</el-tag>
			<el-tag size="mini" v-else-if="taskItem.status == 'Loaded'">已装运</el-tag>
			<el-tag size="mini" type="success" v-else-if="taskItem.status == 'Signed'">已签收</el-tag>
		</div>
		<div class="block-content">
			<el-row :gutter="20">
				<el-col :span="8">
					<p>发货单位：{{taskItem.shipperCompanyName}}</p>
					<p>发货人：{{taskItem.shipperName}}{{taskItem.shipperPhone?('/'+taskItem.shipperPhone):''}}</p>
					<p>发货地：{{taskItem.shipperArea}}</p>
					<p class="datetime">装车时间：{{taskItem.shipperDate | getdatefromtimestamp(true)}}（预计装车）<span class="c2" v-if="taskItem.shipperActualDate">{{taskItem.shipperActualDate | getdatefromtimestamp()}}（实际装车）</span></p>
				</el-col>
				<el-col :span="8">
					<p>货物信息：</p><p>{{taskItem.cargoName}}</p>
					<p>{{taskItem.loadWeightSum?(taskItem.loadWeightSum+'kg/'):''}}{{taskItem.loadVolumeSum?(taskItem.loadVolumeSum+'m³/'):''}}{{taskItem.loadNumSum?(taskItem.loadNumSum+'件'):''}}</p>
				</el-col>
				<el-col :span="8">
					<p>收货单位：{{taskItem.consigneeCompanyName}}</p>
					<p>收货人：{{taskItem.consigneeName}}{{taskItem.consigneePhone?('/'+taskItem.consigneePhone):''}}</p>
					<p>收货地：{{taskItem.consigneeArea}}</p>
					<p class="datetime">到货时间：{{taskItem.consigneeDate | getdatefromtimestamp(true)}}（预计到货） <span class="c2" v-if="taskItem.consigneeActualDate">{{taskItem.consigneeActualDate | getdatefromtimestamp()}}（实际到货）</span></p>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<p>实付运费：¥{{taskItem.amountSum}}
							（{{[
								(taskItem.driverCashAmount+taskItem.superCargoCashAmount) > 0 ? '现付：￥' + (taskItem.driverCashAmount+taskItem.superCargoCashAmount) : '',
								(taskItem.driverCodAmount+taskItem.superCargoCodAmount) > 0 ? '到付：￥' + (taskItem.driverCodAmount+taskItem.superCargoCodAmount) : '',
								(taskItem.driverPorAmount+taskItem.superCargoCorAmount) > 0 ? '回单：￥' + (taskItem.driverPorAmount+taskItem.superCargoCorAmount) : '',
								(taskItem.driverMonthlyAmont+taskItem.superCargoMonthlyAmount) > 0 ? '月结：￥' + (taskItem.driverMonthlyAmont+taskItem.superCargoMonthlyAmount) : '',
								(taskItem.driverCosigneeAmount+taskItem.superCosigneeAmount) > 0 ? '收货方到付：￥' + (taskItem.driverCosigneeAmount+taskItem.superCosigneeAmount) : '',
								(taskItem.driverDetoursAmount+taskItem.superCargoDetoursAmount) > 0 ? '绕路费：￥' + (taskItem.driverDetoursAmount+taskItem.superCargoDetoursAmount) : '',
								(taskItem.driverOtherAmount+taskItem.superCargoOtherAmount) > 0 ? '其他：￥' + (taskItem.driverOtherAmount+taskItem.superCargoOtherAmount) : '',
							].filter(item => item).join('，')}})</p>
				</el-col>
			</el-row>
			<el-row v-if="taskItem.dispatchTaskPicList.length>0">
				<el-col :span="24">
					<p>任务照片</p>
				</el-col>
				<el-col :span="24">
					<ImageUpload :isShowType="true" :objs="taskItem.dispatchTaskPicList" :files="taskItem.dispatchTaskPicList.map(item => item.minURL)" :isPreview="true"/>
				</el-col>
			</el-row>
			<span class="viewtaskdetailBtn"><img src="../../../../assets/imgs/viewtaskdetailBtn.png" /></span>
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
.section-block
	margin 30px 0 0
	padding 0 0 10px 0
	position relative
	&:first-child
		margin-top 0
	.viewtaskdetailBtn
		width 20px
		height 75px
		position absolute
		top 50%
		right 10px
		cursor pointer
		transform translateY(-50%)
	p
		margin 0
		line-height 30px
		font-size 14px
		color #666
		.c2
			color #f90
	.statusTag
		position absolute
		background #fff
		padding 0 10px
		right 10px
		top -10px	
</style>
