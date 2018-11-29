<template>
	<div>
		<div class="head">
			<div class="tab">
				<div class="transport-reg"><span :class="type == 'transport-reg' ? 'active' : ''" @click="change('transport-reg')">运输调控</span></div>
				<div class="price-reg"><span :class="type == 'price-reg' ? 'active' : ''" @click="change('price-reg')">价格调控</span></div>
			</div>
		</div>
		<component :is="type"></component>
	</div>
</template>
<script type="text/javascript">
import TransportReg from './components/TransportReg'
import PriceReg from './components/PriceReg'
export default {
	name: 'home',
	components: { TransportReg, PriceReg },
	data() {
		return {
			type: 'transport-reg'
		}
	},
	activated() {
		this.type = 'transport-reg'
	},
	methods: {
		change(type) {
			this.type = type
		}
	}
}

</script>
<style lang="stylus" scoped>
.head
	width 100%
	height 60px
	background-color #3ba0e6
	margin-bottom 10px
	.tab
		display flex
		width 180px
		height 60px
		color #ffffff
		align-items center
		.transport-reg, .price-reg
			flex 1
			height 40px
			line-height 40px
			text-align right
			cursor pointer
			span
				position relative
				&.active
					font-weight bold
					&:after
						content " "
						display block
						width 100%
						height 2px
						background-color #ffffff
						position absolute
						left 0
						bottom -7px
</style>
