<template>
	<div class="menu-wrapper">
		<template v-for="item in routes.filter(i => i.isShow == 'Y')">
			<el-menu-item 
				v-if="!item.children || item.children.length == 0" 
				:index="item.target" 
				:key="item.target" 
				:class="{'submenu-title-noDropdown':!isNest}">
				<svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
			<el-submenu v-else :index="item.target" :key="item.target">
				<template slot="title">
					<svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
					<span slot="title" class="labelTit">{{item.name}}</span>
				</template>
				<template v-for="child in item.children.filter(i => i.isShow == 'Y')">
					<el-menu-item 
						:index="child.target" 
						:key="child.target"  
						v-if="!child.children || child.children.length == 0">
						<svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon> 
						<span>{{child.name}}</span>
					</el-menu-item>
					<sidebar-item v-else :is-nest="true" class="nest-menu" :routes="[child]" :key="child.target"></sidebar-item>
				</template>
			</el-submenu>
		</template>
	</div>
</template>

<script>
export default {
	name: 'SidebarItem',
	props: {
		routes: {
			type: Array
		},
		isNest: {
			type: Boolean,
			default: false
		}
	}
}
</script>

