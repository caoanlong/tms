<template>
	<div class="main-content">
		<div class="wf-card hasTit">
			<el-steps :active="stepActive" finish-status="success" simple style="margin-bottom:20px;" class="stepBar">
				<el-step title="选择承运单"></el-step>
				<el-step title="货物配载"></el-step>
				<el-step title="车辆&amp;人员调度"></el-step>
				<el-step title="装车信息&amp;结算方式"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
			<component :is="currentStepView" @nextStep="nextStep" @prevStep="prevStep"></component>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Step1 from './Common/Step1'
import Step2 from './Common/Step2'
import Step3 from './Common/Step3'
import Step4 from './Common/Step4'
export default {
	data() {
		return {
			selectedTruck: {},
			selectedPerson: {},
			currentStepView: 'Step1',
			stepActive: 0
		}
	},
	methods: {
		nextStep(x, data, data1) {
			this.currentStepView = 'Step' + x
			this.stepActive = x - 1
		},
		prevStep(x) {
			this.currentStepView = 'Step' + x
			this.stepActive = x - 1
		},
		back() {
			this.$router.go(-1)
		}
	},
	beforeDestroy() {
		this.$store.dispatch('clearCarrierBill')
	},
	components: {
		Step1,
		Step2,
		Step3,
		Step4
	}

}

</script>
<style lang="stylus" scoped>

</style>