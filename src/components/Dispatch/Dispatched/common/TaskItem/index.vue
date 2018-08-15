<template>
	<div class="taskItem">
		<div class="title">任务{{index+1}}（承运单：{{taskItem.taskNo}}）</div>
		<div class="baseInfo">
			<div class="from">
				<div class="hasPic">
					<img :src="defaultImg" class="pic" />
					<p>{{taskItem.shipperCompanyName}}</p>
					<p>{{taskItem.shipperName}}{{taskItem.shipperPhone?('/'+taskItem.shipperPhone):''}}</p>
				</div>
				<p><span class="sequenceTag">1</span>{{taskItem.shipperArea}} {{taskItem.shipperLocationAddress}} {{taskItem.shipperDetailAddress}}</p>
				<p class="c2">{{taskItem.shipperDate | getdatefromtimestamp('min')}}（预计装车）</p>
				<p class="c6" v-if="taskItem.shipperActualDate">{{taskItem.shipperActualDate | getdatefromtimestamp()}}（实际装车）</p>
			</div>
			<div class="arrow"><svg-icon icon-class="arrowBig"></svg-icon></div>
			<div class="to">
				<div class="hasPic">
					<img :src="defaultImg" class="pic" />
					<p>{{taskItem.consigneeCompanyName}}</p>
					<p>{{taskItem.consigneeName}}{{taskItem.consigneePhone?('/'+taskItem.consigneePhone):''}}</p>
				</div>
				<p><span class="sequenceTag">2</span>{{taskItem.consigneeArea}} {{taskItem.consigneeLocationAddress}} {{taskItem.consigneeDetailAddress}}</p>
				<p class="c2">{{taskItem.consigneeDate | getdatefromtimestamp('min')}}（预计到货）</p>
				<p class="c6" v-if="taskItem.consigneeActualDate">{{taskItem.consigneeActualDate | getdatefromtimestamp()}}（实际到货）</p>
			</div>
		</div>
		<div class="picTit" v-if="taskItem.dispatchTaskPicList.length>0">任务照片（{{taskItem.dispatchTaskPicList.length}}）</div>
		<div class="picCon" v-if="taskItem.dispatchTaskPicList.length>0">
			<ImageUpload :isShowType="true" :objs="taskItem.dispatchTaskPicList" :files="taskItem.dispatchTaskPicList.map(item => item.minURL)" :isPreview="true"/>
		</div>
		<div class="cargoTit">承运货物<span class="fr">重量2吨 体积1.8方</span></div>
		<div class="cargoList">
			<p><span class="fl">啤酒</span><span class="fr">300袋 / 1000吨 / 1.4方</span></p>
			<p><span class="fl">可口可乐</span><span class="fr">400箱 / 1000吨 / 1.8方</span></p>
			<p><span class="fl">王老吉</span><span class="fr">200件 / 1000吨 / 1.2方</span></p>
		</div>
	</div>
</template>
<script>
import { defaultImg } from '../../../../../assets/icons/icons'
import { resizeImg } from '../../../../../common/utils'
import ImageUpload from '../../../../CommonComponents/ImageUpload2'
export default {
	props:{
		index:{
			type: Number,
			default: 1
		},
		taskItem:{
			type: Object
		}
	},
	computed: {
		defaultImg: () => defaultImg,
		resizeImg: () => resizeImg
	},
	components: {ImageUpload},
}
</script>
<style lang="stylus" scoped>
.taskItem
	width 100%
	border 1px solid #e2ecf6
	margin-top 10px
	.title
		padding 10px 15px
		border-bottom 1px solid #e2ecf6
	.picTit
	.cargoTit
		padding 10px 15px
		border-top 1px solid #e2ecf6
	.baseInfo
		display flex
		.from
		.to
			flex 1
			padding 10px 15px
			.hasPic
				padding-left 58px
				position relative
				height 48px
				margin-bottom 10px
				.pic
					width 48px
					height 48px
					position absolute
					left 0
					top 0
					border-radius 24px
			p
				line-height 24px
				.sequenceTag
					height 18px
					width 18px
					background #409EFF
					display inline-block
					line-height 18px
					text-align center
					font-size 12px
					color #fff
					border-radius 9px
					margin-right 10px
		.arrow
			flex 0 0 60px
			position relative
			font-size 40px
			color #409EFF
			.svg-icon
				position absolute
				top 50%
				left 50%
				transform translate(-50%,-50%)
	.cargoList
		border-top 1px solid #e2ecf6
		p
			line-height 30px
			height 30px
			padding 0 15px
			color #999	
</style>