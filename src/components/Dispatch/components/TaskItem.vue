<template>
	<div class="taskItem">
		<div class="title">任务{{index+1}}（承运单：{{taskItem.carrierOrderNo}}）</div>
		<div class="baseInfo">
			<div class="from">
				<div class="hasPic">
					<!-- Committed-待执行 Loaded-已装运 Signed-已签收 -->
					<img :src="taskItem.shipperLogoUrl ? resizeImg(taskItem.shipperLogoUrl, '_100x100.') : defaultImg" class="pic"/>
					<p>{{taskItem.shipperCompanyName}} 
						<el-tag size="mini" v-if="taskItem.status=='Committed'" type="info">未装车</el-tag>
						<el-tag size="mini" v-else >已装车</el-tag>
					</p>
					<p>{{taskItem.shipperName}}{{taskItem.shipperPhone?('/'+taskItem.shipperPhone):''}}</p>
				</div>
				<p><span class="sequenceTag">{{taskItem.shipperSequence}}</span>{{taskItem.shipperArea}} {{taskItem.shipperLocationAddress}} {{taskItem.shipperDetailAddress}}</p>
				<p class="c2">{{taskItem.shipperDate | getdatefromtimestamp('min')}}（预计装车）</p>
				<p class="c6" v-if="taskItem.shipperActualDate">{{taskItem.shipperActualDate | getdatefromtimestamp('min')}}（实际装车）
					<el-tag size="mini" type="danger" v-if="taskItem.isLoadedOverTime=='Y'">延迟装车</el-tag>
				</p>
			</div>
			<div class="arrow"><svg-icon icon-class="arrowBig"></svg-icon></div>
			<div class="to">
				<div class="hasPic">
					<img :src="taskItem.consigneeLogoUrl ? resizeImg(taskItem.consigneeLogoUrl, '_100x100.') : defaultImg" class="pic"/>
					<p>{{taskItem.consigneeCompanyName}}
						<el-tag size="mini" v-if="taskItem.status=='Signed'" type="success">已到达</el-tag>
						<el-tag size="mini" v-else type="info">未到达</el-tag>
					</p>
					<p>{{taskItem.consigneeName}}{{taskItem.consigneePhone?('/'+taskItem.consigneePhone):''}}</p>
				</div>
				<p><span class="sequenceTag">{{taskItem.consigneeSequence}}</span>{{taskItem.consigneeArea}} {{taskItem.consigneeLocationAddress}} {{taskItem.consigneeDetailAddress}}</p>
				<p class="c2">{{taskItem.consigneeDate | getdatefromtimestamp('min')}}（预计到货）</p>
				<p class="c6" v-if="taskItem.consigneeActualDate">{{taskItem.consigneeActualDate | getdatefromtimestamp('min')}}（实际到货）<el-tag size="mini" type="danger" v-if="taskItem.isArrivedOverTime=='Y'">延迟到货</el-tag></p>
			</div>
		</div>
		<div class="picTit" v-if="taskItem.dispatchTaskPicList.length>0">任务照片（{{taskItem.dispatchTaskPicList.length}}）</div>
		<div class="picCon" v-if="taskItem.dispatchTaskPicList.length>0">
			<ImageUpload :isShowType="true" :objs="taskItem.dispatchTaskPicList" :files="taskItem.dispatchTaskPicList.map(item => item.minURL)" :isPreview="true"/>
		</div>
		<div class="cargoTit">
			承运货物
			<span class="fr c1 total" @click="unfold">
				{{taskItem.loadWeightSum ? '重量' + taskItem.loadWeightSum + '吨' : ''}} 
				{{taskItem.loadVolumeSum ? '体积' + taskItem.loadVolumeSum + '方' : ''}} 
				{{taskItem.loadNumSum ? '数量' + taskItem.loadNumSum : ''}} 
				<svg-icon icon-class="arrow-down" :class="isFold ? 'unfold' : ''"></svg-icon>
			</span>
		</div>
		<div class="cargoList" v-if="isFold ">
			<p v-for="cargoItem in taskItem.bizDispatchTaskCargoList" :key="cargoItem.dispatchTaskID">
				<span class="fl">{{cargoItem.cargoName}}</span>
				<span class="fr">
					{{[(cargoItem.cargoWeight + '吨'),(cargoItem.cargoVolume + '方'),(cargoItem.cargoNum + cargoItem.cargoUnitName)] | trimSpaceAndJoinSlash}}
				</span>
			</p>
		</div>
	</div>
</template>
<script>
import { defaultImg } from '../../../assets/icons/icons'
import { resizeImg } from '../../../common/utils'
import ImageUpload from '../../CommonComponents/ImageUpload2'
export default {
	data(){
		return{
			isFold:false
		}
	},
	props:{
		index:{
			type: Number
		},
		selectIndex:{
			type: Number
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
	methods:{
		unfold(){
			this.isFold = !this.isFold
		}
	}
}
</script>
<style lang="stylus" scoped>
.taskItem
	width 100%
	border 1px solid #e2ecf6
	margin-bottom 10px
	&:last-child
		margin-bottom 0
	.title
		padding 10px 15px
		border-bottom 1px solid #e2ecf6
	.picTit
	.cargoTit
	.picCon
		padding 10px 15px
		border-top 1px solid #e2ecf6
	.cargoTit
		.total
			cursor pointer
			user-select none
			.svg-icon
				&.unfold
					transform rotate(180deg)
					transition all .5s
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
			flex 0 0 100px
			position relative
			font-size 40px
			color #409EFF
			border-left 1px solid #e2ecf6
			border-right 1px solid #e2ecf6
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