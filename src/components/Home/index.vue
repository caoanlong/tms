<template>
	<div class="main-content">
		<div style="width: 200px;margin: 0 auto;">
			<el-radio-group v-model="type">
				<el-radio-button label="transportreg">运输调控</el-radio-button>
				<el-radio-button label="pricereg">价格调控</el-radio-button>
			</el-radio-group>
		</div>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
export default {
	name: 'home',
	data() {
		return {
			type: 'transportreg'
		}
	},
	watch: {
		type(val) {
			this.$router.push({name: val})
		}
	},
	activated() {
		this.type = 'transportreg'
	},
	methods: {
		
	}
}

</script>
<style lang="stylus" scoped>

</style>
