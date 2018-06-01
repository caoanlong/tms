<template>
	<div class="headtop">
		<div class="tags-view-container">
			<scroll-pane class='tags-view-wrapper' ref='scrollPane'>
				<router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="{name: tag.name, query: tag.query}" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
					{{tag.title}}
					<span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
				</router-link>
			</scroll-pane>
			<ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
				<li @click="closeSelectedTag(selectedTag)">关闭</li>
				<li @click="closeOthersTags">关闭其他</li>
				<li @click="closeAllTags">关闭所有</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
import ScrollPane from '../ScrollPane'

export default {
	data() {
		return {
			visible: false,
			top: 0,
			left: 0,
			selectedTag: {}
		}
	},
	computed: {
		visitedViews() {
			return this.$store.state.tagsView.visitedViews
		}
	},
	watch: {
		$route() {
			this.addViewTags()
			this.moveToCurrentTag()
		},
		visible(value) {
			if (value) {
				window.addEventListener('click', this.closeMenu)
			} else {
				window.removeEventListener('click', this.closeMenu)
			}
		}
	},
	mounted() {
		this.addViewTags()
	},
	methods: {
		generateRoute() {
			if (this.$route.name) {
				return this.$route
			}
			return false
		},
		isActive(route) {
			return route.path === this.$route.path || route.name === this.$route.name
		},
		addViewTags() {
			const route = this.generateRoute()
			if (!route) {
				return false
			}
			this.$store.dispatch('addVisitedViews', route)
		},
		moveToCurrentTag() {
			const tags = this.$refs.tag
			this.$nextTick(() => {
				for (const tag of tags) {
					if (tag.to === this.$route.path) {
						this.$refs.scrollPane.moveToTarget(tag.$el)
						break
					}
				}
			})
		},
		closeSelectedTag(view) {
			// 如果关闭编辑和添加页面
			if ((view.name.indexOf('add') > -1) || (view.name.indexOf('edit') > -1)) {
				this.$msgbox({
					message: '数据将清空，是否确定离开该页面？',
					title: '温馨提示',
					confirmButtonText: '确定',
					showCancelButton: true,
					callback: (action) => {
						if (action == 'confirm') {
							this.$store.dispatch('delVisitedViews', view).then((views) => {
								if (this.isActive(view)) {
									const latestView = views.slice(-1)[0]
									if (latestView) {
										this.$router.push({name: latestView.name, query: latestView.query})
									} else {
										this.$router.push('/')
									}
								}
							})
						}
					}
				})
			} else {
				this.$store.dispatch('delVisitedViews', view).then((views) => {
					if (this.isActive(view)) {
						const latestView = views.slice(-1)[0]
						if (latestView) {
							this.$router.push({name: latestView.name, query: latestView.query})
						} else {
							this.$router.push('/')
						}
					}
				})
			}
		},
		closeOthersTags() {
			this.$router.push(this.selectedTag.path)
			this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
				this.moveToCurrentTag()
			})
		},
		closeAllTags() {
			this.$store.dispatch('delAllViews')
			this.$router.push('/')
		},
		openMenu(tag, e) {
			this.visible = true
			this.selectedTag = tag
			this.left = e.clientX
			this.top = 85
		},
		closeMenu() {
			this.visible = false
		}
	},
	components: {
		ScrollPane
	}
}
</script>

<style lang="stylus" scoped>
.tags-view-container
	background #424242
	.tags-view-wrapper
		height 34px
		.tags-view-item
			display inline-block
			position relative
			height 34px
			line-height 34px
			color #495060
			background #ddd
			padding 0 8px 0 15px
			font-size 12px
			margin-right 5px
			border-radius 4px 4px 0 0
			// &:first-of-type
			// 	margin-left 15px
			&.active
				background-color #fff
				color #409EFF
	.contextmenu
		margin 0
		background #fff
		z-index 2
		position fixed
		list-style-type none
		padding 5px 0
		border-radius 4px
		font-size 12px
		font-weight 400
		color #333
		box-shadow 2px 2px 3px 0 rgba(0, 0, 0, .3)
		li
			margin 0
			padding 7px 16px
			cursor pointer
			&:hover
				background #eee
</style>

<style lang="stylus">
// reset element css of el-icon-close
.tags-view-wrapper
	.tags-view-item
		.el-icon-close
			width 16px
			height 16px
			vertical-align 2px
			border-radius 50%
			text-align center
			transition all .3s cubic-bezier(.645, .045, .355, 1)
			transform-origin 100% 50%
			&:before
				transform scale(.6)
				display inline-block
				vertical-align -3px
			&:hover
				background-color #b4bccc
				color #fff
</style>
