<template>
	<div class="listItem" >
		<div class="driverNum inlineBlock" ><span>{{truck.code}}</span></div>
		<div class="pic inlineBlock" >
			<img :src="imgUrl + truck.truckFrontPic">
			<p class="status" v-if="truck.loadStatus == 'Empty'">空载</p>
			<p class="status" v-else-if="truck.loadStatus == 'NotFull'">未满载</p>
			<p class="status" v-else-if="truck.loadStatus == 'Full'">满载</p>
		</div>
		<div class="info inlineBlock">
			<p class="driverName">{{truck.realName}}</p>
			<p class="vehicleNo">{{truck.plateNo}}</p>
			<p class="trailerNo">{{truck.trailerPlateNo}}</p>
			<p class="vehicleType">{{truck.length ? (truck.length + '米') : ''}}{{truck.truckType}}{{truck.truckCategory}}</p>
		</div>
		<div class="statusInfo inlineBlock">
			<div class="control">
				<div class="sliderSelect">
					<span class="labels">配载重量</span>
					<el-progress :percentage="parseInt(truck.loadedCargoWeight/Number(truck.loads) *100)" style="margin-top:13px"></el-progress>
					<span class="surplus">剩{{Number(truck.loads) - truck.loadedCargoWeight}}</span>
				</div>
				<div class="sliderSelect">
					<span class="labels">配载体积</span>
					<el-progress :percentage="parseInt(truck.loadedCargoVolume/Number(truck.loadVolume) * 100)" style="margin-top:13px"></el-progress>
					<span class="surplus">剩{{Number(truck.loadVolume) - truck.loadedCargoVolume}}</span>
				</div>
			</div>
		</div>
		<div class="lineInfo inlineBlock">
			<p v-for="item in truck.cargos">从{{item.shipperArea}}到{{item.consigneeArea}}&nbsp;{{item.cargoName}}</p>
		</div>
		<svg-icon icon-class="select-icon" class="icon" :class="{selected: isSelected}"></svg-icon>
	</div>
</template>

<script>
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
		hiehgt 120px
		position relative
		&.selected
			border-color #409EFF
		p
			margin 0
			line-height 30px
		.pic
			width 100px
			padding 0 10px
			vertical-align top
			height 120px
			img
				width 80px
				height 80px
				vertical-align top
			.status
				text-align center
		.driverNum
			width 50px
			padding 0 10px
			vertical-align top
			position relative
			height 100px
			span
				width 30px
				height 30px
				border-radius 15px
				line-height 30px
				text-align center
				color #fff
				background #666
				display block
				position absolute
				top 50%
				margin-top -15px
				font-size 12px
				cursor pointer
		.info
			width 180px
			p
				height 30px
				line-height 30px
				overflow hidden
				white-space nowrap
				text-overflow ellipsis
		.statusInfo
			padding 0 20px
			border-left 1px solid #ebeef5
			vertical-align top
			margin-left 15px
			.control
				width 320px
			.sliderSelect
				display inline-block
				width 320px
				height 40px
				padding 0 100px 0 80px
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
		.lineInfo
			width 100%
			padding-top 10px
			border-top 1px solid #ebeef5
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
