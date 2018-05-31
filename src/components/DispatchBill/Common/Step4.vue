<template>
	<div class="step step4">
		<TaskItem></TaskItem>
		<div class="text-center">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" >完成</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import TaskItem from './TaskItem'
	export default {
		data() {
			return {

			}
		},
		methods: {
			prevStep(){
				this.$emit('prevStep', 2)
			},
			back() {
				this.$router.go(-1)
			},
		},
		components:{
			TaskItem
		}
	}
</script>
<style lang="stylus" scoped>

</style>