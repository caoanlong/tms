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
			<component :is="currentStepView" @nextStep="nextStep"></component>
			<!-- <Step1 v-show="stepActive == 0" @nextStep="nextStep"/>
			<Step2 v-show="stepActive == 1" @nextStep="nextStep" @prevStep="prevStep" :carrierBills="selectedCarrierBills" />
			<Step3 v-show="stepActive == 2" @nextStep="nextStep" @prevStep="prevStep" :truck="selectedTruck" :person="selectedPerson" />
			<Step4 v-show="stepActive == 3" @prevStep="prevStep"/> -->
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Carrierbill from '../../api/Carrierbill'
import Step1 from './Common/Step1'
import Step2 from './Common/Step2'
import Step3 from './Common/Step3'
import Step4 from './Common/Step4'
export default {
	data() {
		return {
			// stepActive: 0,
			selectedCarrierBills:[],
			// selectedCarrierBillIDs:[],
			selectedTruck: {},
			selectedPerson: {},
			currentStepView: 'Step1'
		}
	},
	created() {
	},
	methods: {
		nextStep(step, data, data1) {
			this.currentStepView = step
			// this.stepActive = x
			if(x == 1){
				// this.selectedCarrierBillIDs = data
				// for (let i = 0; i < this.selectedCarrierBillIDs.length; i++) {
				// 	this.getDetail(this.selectedCarrierBillIDs[i])
				// }
				// console.log(this.selectedCarrierBillIDs)
			}else if (x == 2) {
				this.selectedTruck = data
				this.selectedPerson = data1
			}
		},
		prevStep(x) {
			this.currentStepView = 'Step' + (x + 1)
			// this.stepActive = x
		},
		back() {
			this.$router.go(-1)
		},
		// 单个承运单详情
		getDetail(carrierOrderID) {
			Carrierbill.findById({ carrierOrderID }).then(res => {
				let carrierBill = res
				this.selectedCarrierBills.push(carrierBill)	
			})
		},
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