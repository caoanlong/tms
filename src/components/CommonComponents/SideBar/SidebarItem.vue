<template>
	<div class="menu-wrapper">
		<template v-for="item in routes" v-if="item.IsShow == '1'">
			<el-menu-item 
				v-if="!item.children || item.children.length == 0" 
				:index="item.Target" 
				:key="item.Target" 
				:class="{'submenu-title-noDropdown':!isNest}">
				<svg-icon v-if="item.Icon" :icon-class="item.Icon"></svg-icon>
				<span slot="title">{{item.Name}}</span>
			</el-menu-item>
			<el-submenu v-else :index="item.Target" :key="item.Target">
				<template slot="title">
					<svg-icon v-if="item.Icon" :icon-class="item.Icon"></svg-icon>
					<span slot="title">{{item.Name}}</span>
				</template>
				<template v-for="child in item.children" v-if="child.IsShow == '1'">
					<el-menu-item 
						:index="child.Target" 
						:key="child.Target"  
						v-if="!child.children || child.children.length == 0">
						<svg-icon v-if="child.Icon" :icon-class="child.Icon"></svg-icon>
						<span>{{child.Name}}</span>
					</el-menu-item>
					<sidebar-item v-else :is-nest="true" class="nest-menu" :routes="[child]" :key="child.Target"></sidebar-item>
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

