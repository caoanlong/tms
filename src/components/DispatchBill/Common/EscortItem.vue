<template>
	<div class="EscortItem">
		<div class="pic inlineBlock">
			<img :src="person.headPic&&person.headPic!='undefined'?(imgUrl + person.headPic):defaultImg">
		</div>
		<div class="status" v-if="person.workStatus == 'Free'">空闲中</div>
		<div class="status" v-else-if="person.workStatus == 'Working'">工作中</div>
		<div class="driverName">{{person.realName}}</div>
		<div class="phone">{{person.mobile}}</div>
		<div class="lineInfo inlineBlock">
			<p v-for="item in person.runInfo">{{item.info}}</p>
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
		person: {
			type: Object,
			default: () => {}
		}
	},
	data(){
		return {
			
		}
	},
	computed:{
		defaultImg: () => defaultImg
	},
	methods:{
	}
}
</script>

<style lang="stylus" scoped>
	.EscortItem
		border 1px solid #ebeef5
		margin-top -1px
		padding 10px
		font-size 12px
		hiehgt 60px
		position relative
		p
			margin 0
			line-height 30px
		.pic
			width 40px
			vertical-align top
			height 40px
			img
				width 40px
				height 40px
				vertical-align top
		.status
			margin-left 10px
		.status
		.driverName
		.phone
			width 120px
			text-align center
			height 40px
			line-height 20px
			display inline-block
			vertical-align top
			padding 0 20px
			border-left 1px solid #ebeef5
		.info
			width 220px
			padding-left 10px
			vertical-align top
		.lineInfo
			vertical-align top
			height 40px
			padding-left 15px
			border-left 1px solid #ebeef5
			p
				overflow hidden
				white-space nowrap
				text-overflow ellipsis
				line-height 20px
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