<template>
	<div class="main-content">
		<el-card class="box-card hasTit">
			<div slot="header" class="clearfix">调度单编号 <span class="CarrierNum">{{$route.query.ControlsNum}}</span>
				<!-- 
				<span>创建时间：{{carrierbillInfo.CreatedDate}}</span>
				<span class="status status1" v-if="carrierbillInfo.Status =='待执行'">待执行</span>
				<span class="status status2" v-else-if="carrierbillInfo.Status =='执行中'">执行中</span>
				<span class="status status3" v-else-if="carrierbillInfo.Status =='已签收'">已签收</span>
				-->
			</div>

		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
export default {
	data() {
		return {
			
		}
	},
	created() {
		
	},
	methods: {
	}
}

</script>
<style lang="stylus" scoped>

</style>
