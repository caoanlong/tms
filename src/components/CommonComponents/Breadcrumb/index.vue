<template>
	<div class="customerBreadcrumb">
		<svg-icon @click.native="toggleSideBar" icon-class="menu" class="toggleIcon" :class="sidebar.opened?'rotateIcon':''" :isActive="sidebar.opened"></svg-icon>
		<el-breadcrumb class="app-breadcrumb" separator="/">
			<transition-group name="breadcrumb">
				<el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
					<!-- <span v-if='item.redirect==="noredirect" || index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
					<router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link> -->
					<span class="no-redirect">{{item.meta.title}}</span>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	created() {
		this.getBreadcrumb()
	},
	data() {
		return {
			levelList: null
		}
	},
	watch: {
		$route() {
			this.getBreadcrumb()
		}
	},
	computed: {
		...mapGetters([
			'sidebar'
		])
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('toggleSideBar')
		},
		getBreadcrumb() {
			let matched = this.$route.matched.filter(item => item.name)
			// const first = matched[0]
			// if (first && first.name !== 'home') {
			// 	matched = [{ path: '/', meta: { title: 'TMS' }}].concat(matched)
			// }
			this.levelList = matched
		}
	}
}
</script>

<style lang="stylus" scoped>
.customerBreadcrumb
	position relative
	.toggleIcon
		position absolute
		top 50%
		left 20px
		transform translateY(-50%)
		vertical-align top
		cursor pointer
		transition .3s
		&.rotateIcon
			transform translateY(-50%) rotate(90deg)
	.app-breadcrumb
	.el-breadcrumb
		display inline-block
		font-size 14px
		line-height 40px
		vertical-align top
		.no-redirect 
			color #666
			font-weight normal
			cursor Default
</style>
