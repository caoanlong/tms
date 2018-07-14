<template>
	<div class="lside">
		<el-menu 
			mode="vertical"  :style="{'height':fullHeight+'px'}" class="sidenav"
			background-color="#4f4f4f" 
			text-color="#fff" 
			active-text-color="#fff" 
			@select="selectIndex" 
			:unique-opened="true" 
			:default-active="$route.name"
			:collapse="isCollapse">
			<sidebar-item :routes="menus"></sidebar-item>
		</el-menu>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import ScrollBar from '../ScrollBar'
import SidebarItem from './SidebarItem'
import menus from '../../../assets/data/menu.json'
export default {
	name: 'sideBar',
	data(){
		return{
			fullHeight: document.documentElement.clientHeight -50
		}
		
	},
	computed: {
		...mapGetters([
			'menus',
			'sidebar'
		]),
		isCollapse() {
			return !this.sidebar.opened
		},
		menus: () => menus
	},
	watch: {
		fullHeight (val) {
			if(!this.timer) {
				this.fullHeight = val
				this.timer = true
				setTimeout(() => {
					this.timer = false
				}, 400)
			}
		}
	},
	mounted() {
		window.onresize = () => {
			window.fullHeight = document.documentElement.clientHeight
			this.fullHeight = window.fullHeight-50
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
	.sidenav
		overflow hidden
		overflow-y auto
</style>