<template>
	<div class="app-wrapper clearfix" :class="{hideSidebar: !sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		
		<div class="main-container right-container">
			<div class="top-bar">
				<navbar></navbar>
				<tags-view></tags-view>
			</div>
			<app-main></app-main>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Sidebar from './CommonComponents/SideBar'
	import Navbar from './CommonComponents/NavBar'
	import AppMain from './CommonComponents/AppMain'
	import TagsView from './CommonComponents/TagsView'
	export default {
		name: 'layout',
		computed: {
			sidebar() {
				return this.$store.state.app.sidebar
			}
		},
		components: {
			Navbar,
			Sidebar,
			AppMain,
			TagsView
		}
	}
</script>
<style lang="stylus" scoped>
	.app-wrapper
		position relative
		height 100%
		margin-left 180px
		.right-container
			position relative
			padding-top 80px
	.top-bar
		position fixed
		top 0
		right 0
		z-index 99
		left 180px
	#app
		.hideSidebar
			margin-left 36px
			.top-bar
				left 36px				
</style>