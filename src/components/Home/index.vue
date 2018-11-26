<template>
	<div class="main-content">
		<div style="width: 200px;margin: 0 auto;">
			<el-radio-group v-model="type">
				<el-radio-button label="transport-reg">运输调控</el-radio-button>
				<el-radio-button label="price-reg">价格调控</el-radio-button>
			</el-radio-group>
		</div>
		<component :is="type"></component>
	</div>
</template>
<script type="text/javascript">
import TransportReg from './components/TransportReg'
import PriceReg from './components/PriceReg'
export default {
	name: 'home',
	components: { TransportReg, PriceReg },
	data() {
		return {
			type: 'transport-reg'
		}
	},
	watch: {
		type(val) {
			this.type = val
		}
	},
	activated() {
		this.type = 'transport-reg'
	},
	methods: {
		
	}
}

</script>
<style lang="stylus" scoped>

</style>
