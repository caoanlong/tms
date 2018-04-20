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
			<el-menu-item index="home">
				<svg-icon icon-class="home-icon"></svg-icon>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-menu-item index="carrierbill">
				<svg-icon icon-class="list-th-icon"></svg-icon>
				<span slot="title">承运单</span>
			</el-menu-item>
			<el-menu-item index="dispatchbill">
				<svg-icon icon-class="dispatchbill"></svg-icon>
				<span slot="title">调度单</span>
			</el-menu-item>
			<el-submenu index="settlemanage">
				<template slot="title">
					<svg-icon icon-class="Settlement"></svg-icon>
					<span>结算管理</span>
				</template>
				<el-menu-item-group>
					<!-- <el-menu-item index="receivablesum">应收汇总</el-menu-item>
					<el-menu-item index="receivableinfo">应收明细</el-menu-item>
					<el-menu-item index="payablesum">应付汇总</el-menu-item>
					<el-menu-item index="payableinfo">应付明细</el-menu-item> -->
					<el-menu-item index="settleconfig">结算设置</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="transteam">
				<template slot="title">
					<svg-icon icon-class="truck-icon"></svg-icon>
					<span>运输队</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="truck">车辆</el-menu-item>
					<el-menu-item index="person">人员</el-menu-item>
					<el-menu-item index="transinfo">运输档案</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="cooperpartner">
				<template slot="title">
					<svg-icon icon-class="Partner"></svg-icon>
					<span>合作伙伴</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="shipper">托运人</el-menu-item>
					<el-menu-item index="recdeliverycomp">收发货单位</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</scroll-bar>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import ScrollBar from '../ScrollBar'
import menus from '../../../assets/data/menus'
export default {
	name: 'sideBar',
	computed: {
		...mapGetters([
			'userInfo',
			'sidebar'
		]),
		menus: () => menus,
		isCollapse() {
			return !this.sidebar.opened
		},
		defaultImg: () => defaultImg
	},
	methods: {
		selectIndex(index) {
			this.$router.push({ name: index })
		}
	},
	components: {
		ScrollBar
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
