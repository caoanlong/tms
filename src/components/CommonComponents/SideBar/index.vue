<template>
	<scroll-bar>
		<div class="logo">
			<img v-if="userInfo && userInfo.logoUrl" :src="imgUrl + userInfo.logoUrl">
			<img v-else src="../../../assets/imgs/defaultLogo.png" height="50" width="180">
		</div>
		<el-menu 
			mode="vertical"  
			background-color="#4f4f4f" 
			text-color="#fff" 
			active-text-color="#fff" 
			@select="selectIndex" 
			:unique-opened="true" 
			:default-active="$route.name"
			:collapse="isCollapse">
			<sidebar-item :routes="menus"></sidebar-item>
		</el-menu>
	</scroll-bar>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import ScrollBar from '../ScrollBar'
import SidebarItem from './SidebarItem'
export default {
	name: 'sideBar',
	computed: {
		...mapGetters([
			'userInfo',
			'menus',
			'sidebar'
		]),
		isCollapse() {
			return !this.sidebar.opened
		}
	},
	methods: {
		selectIndex(index) {
			this.$router.push({name: index})
		}
	},
	components: { 
		ScrollBar,
		SidebarItem
	}
}
</script>
<style lang="stylus" scoped>
	.logo
		padding 5px 10px
		img
			width 160px
			height 40px
</style>