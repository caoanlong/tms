<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">查看货源</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文参考号：">
							<p>{{CargoInfo.messageReferenceNumber}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="单证名称：">
							<p>{{CargoInfo.documentName}}</p>
						</el-form-item>
						
						<el-form-item label="货物类型分类：">
							<p>{{CargoInfo.cargoTypeClassificationCode}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="报文版本号：">
							<p>{{CargoInfo.documentVersionNumber}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
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
		
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>