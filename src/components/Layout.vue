<template>
	<div class="app-wrapper clearfix">
		<div class="header">
			<div class="top-bar">
				<navbar></navbar>
				<tags-view></tags-view>
			</div>
		</div>
		<sidebar class="sidebar-container"></sidebar>
		
		<div class="main-container right-container">
			<breadcrumb class="breadcrumb-container"></breadcrumb>
			<app-main></app-main>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Sidebar from './CommonComponents/SideBar'
	import Navbar from './CommonComponents/NavBar'
	import AppMain from './CommonComponents/AppMain'
	import TagsView from './CommonComponents/TagsView'
	import Breadcrumb from './CommonComponents/Breadcrumb'
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
			TagsView,
			Breadcrumb
		}
	}
</script>
<style lang="stylus" scoped>
	.app-wrapper
		position relative
		height 100%
		position relative
		padding-top 88px
		margin-left 180px
	.header
		position fixed
		top 0
		left 180px
		right 0
		height 88px
		z-index 10			
</style>