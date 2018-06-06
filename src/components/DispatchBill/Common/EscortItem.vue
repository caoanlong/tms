<template>
	<div class="EscortItem">
		<div class="status">
			<span v-if="person.workStatus == 'Free'">空闲中</span>
			<span v-else-if="person.workStatus == 'Working'">工作中</span>
		</div>
		<div class="driverName">{{person.realName}}</div>
		<div class="phone">{{person.mobile}}</div>
		<div class="role">角色：押运员</div>
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
		height 50px
		position relative
		display flex
		p
			margin 0
			line-height 30px
		
		.status
		.driverName
		.phone
		.role
			flex 1
			text-align center
			height 30px
			line-height 30px
			display inline-block
			vertical-align top
			padding 0 20px
			border-left 1px solid #ebeef5
		.status
			border-left none
		.info
			width 220px
			padding-left 10px
			vertical-align top
		
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