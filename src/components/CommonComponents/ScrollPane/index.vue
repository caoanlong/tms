<template>
	<div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
		<i class="el-icon-arrow-left scrollBtn scrollLeft" @click="scroll('L')" v-if="showCtrolBtn"></i>
		<div class="scrollBox" id="scrollBox" ref="scrollBox">
			<div class="scrollWrapper" id="scrollWrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
				<slot></slot>
			</div>
		</div>
		<i class="el-icon-arrow-right scrollBtn scrollRight" @click="scroll('R')" v-if="showCtrolBtn"></i>
	</div>
</template>

<script>
const padding = 15 // tag's padding
export default {
	props:["showCtrolBtn"],
	name: 'scrollPane',
	data() {
		return {
			left: 0,
		}
	},

	methods: {
		clearPos() {
			this.left = 0
		},
		scroll(type) {
			const $container = this.$refs.scrollContainer
			const $containerWidth = $container.offsetWidth
			const $wrapper = this.$refs.scrollWrapper
			const $wrapperWidth = $wrapper.offsetWidth
			let eventDelta = type == 'L' ? 30 : -30
			if (eventDelta > 0) {
				this.left = Math.min(0, this.left + eventDelta)
			} else {
				if ($containerWidth - padding < $wrapperWidth) {
					if (this.left < -($wrapperWidth - $containerWidth + padding)) {
						this.left = this.left
					} else {
						this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
					}
				} else {
					this.left =0
				}
			}
		},
		handleScroll(e) {
			const eventDelta = e.wheelDelta || -e.deltaY * 3
			const $container = this.$refs.scrollContainer
			const $containerWidth = $container.offsetWidth
			const $wrapper = this.$refs.scrollWrapper
			const $wrapperWidth = $wrapper.offsetWidth

			if (eventDelta > 0) {
				this.left = Math.min(0, this.left + eventDelta)
			} else {
				if ($containerWidth - padding < $wrapperWidth) {
					if (this.left < -($wrapperWidth - $containerWidth + padding)) {
						this.left = this.left
					} else {
						this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
					}
				} else {
					this.left =0
				}
			}
		},
		moveToTarget($target) {
			const $container = this.$refs.scrollContainer
			const $containerWidth = $container.offsetWidth
			const $targetLeft = $target.offsetLeft
			const $targetWidth = $target.offsetWidth

			if ($targetLeft < -this.left) {
				// tag in the left
				this.left = -$targetLeft + padding
			} else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
				// tag in the current view
				// eslint-disable-line
			} else {
				// tag in the right
				this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.scroll-container
	white-space nowrap
	position relative
	overflow hidden
	padding 0 20px
	width 100%
	.scrollBox
		overflow hidden
		height 34px
		width 100%
		position relative
	.scrollWrapper
		position absolute
	.scrollBtn
		width 15px
		height 34px
		position absolute
		background #ddd
		line-height 34px
		text-align center
		cursor pointer
		font-size 12px
		z-index 10
		top 0
		&.scrollLeft
			border-radius 0 4px 0 0
			left 0
		&.scrollRight
			border-radius 4px 0 0 0
			right 0
</style>
