<template>
	<div class="listItem" >
		<div class="driverNum " ><span>{{truck.code}}</span></div>
		<div class="info ">
			<p><span class="labels">车辆状态：</span>
				<span v-if="truck.workStatus == 'Free'">空闲中</span>
				<span v-else-if="truck.workStatus == 'Working'">工作中</span>
			</p>
			<p><span class="labels">司机：</span>{{truck.driverName}}</p>
			<p><span class="labels">联系电话：</span>{{truck.driverPhone}}</p>
		</div>
		<div class="truckInfo">
			<p><span class="labels">车牌号/挂车号：</span>{{truck.plateNo}}<span v-if="truck.trailerPlateNo">/{{truck.trailerPlateNo}}</span></p>
			<p><span class="labels">车型/车长：</span>{{truck.truckType}}/{{truck.length ? (truck.length/1000 + '米') : ''}}</p>
			<p><span class="labels">载重/容积：</span>{{truck.loads/1000 + '吨'}}/{{truck.loadVolume + '方'}}</p>
			<p><span class="labels">车辆性质：</span>单位挂靠</p>
		</div>
		<div class="statusInfo ">
			<div class="control">
				<div class="sliderSelect">
					<span class="labels">已配载重量</span>
					<el-progress 
						:text-inside="true" 
						:stroke-width="18" 
						:percentage="parseInt(truck.loadedCargoWeight/Number(truck.loads/1000) *100)" 
						style="margin-top:13px">
					</el-progress>
					<span class="surplus">剩{{(Number(truck.loads/1000) - truck.loadedCargoWeight)}}吨</span>
				</div>
				<div class="sliderSelect">
					<span class="labels">已配载体积</span>
					<el-progress 
						:text-inside="true" 
						:stroke-width="18" 
						:percentage="parseInt(truck.loadedCargoVolume/Number(truck.loadVolume) * 100)" 
						style="margin-top:13px">
					</el-progress>
					<span class="surplus">剩{{(Number(truck.loadVolume) - truck.loadedCargoVolume)}}方</span>
				</div>
			</div>
		</div>
		<svg-icon icon-class="select-icon" class="icon" :class="{selected: isSelected}"></svg-icon>
	</div>
</template>

<script>
import {defaultImg} from '../../../assets/icons/icons'
export default {
	props: {
		isSelected: {
			type: Boolean,
			default: false
		},
		index: {
			type: Number
		},
		truck: {
			type: Object,
			default: () => {}
		}
	},
	data(){
		return {
		}
	},
	computed: {
		defaultImg: () => defaultImg
	},
	methods:{
	}
}
</script>

<style lang="stylus" scoped>
	.listItem
		border 1px solid #ebeef5
		margin-bottom 10px
		padding 10px
		font-size 12px
		height 100px
		position relative
		display flex
		&.selected
			border-color #409EFF
		p
			margin 0
			line-height 20px
			overflow hidden
			white-space nowrap
			text-overflow ellipsis
			.labels
				color #999
		.driverNum
			width 60px
			padding-right 10px
			vertical-align top
			position relative
			height 80px
			flex 0 0 50px
			span
				width 40px
				height 40px
				border-radius 20px
				line-height 40px
				text-align center
				color #fff
				background #666
				display block
				position absolute
				top 50%
				transform translateY(-50%)
				font-size 14px
				cursor pointer
		.info
			flex 0 0 180px
			padding 10px 0
			vertical-align top
			p
				height 20px
				line-height 20px
		.statusInfo
			padding 0 10px
			border-left 1px solid #ebeef5
			vertical-align top
			flex 1
			.sliderSelect
				display inline-block
				width 260px
				height 40px
				padding 0 100px 0 70px
				position relative
				.labels
					position absolute
					left 0
					top 0
					line-height 40px
				.surplus
					position absolute
					right 0
					top 0
					line-height 40px
					width 80px
		.truckInfo
			flex 1
		.icon
			font-size 36px
			position absolute
			right -1px
			top -1px
			color #eee
			cursor pointer
			&.selected
				color #409EFF
</style>
