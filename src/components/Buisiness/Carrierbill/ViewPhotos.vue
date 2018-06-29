<template>
	<el-dialog title="查看照片" :show-close="false" :close-on-click-modal="false" :visible.sync="visible" width="80%" class="ViewPhotosDialog">
		<p>装车地：云南昆明</p>
		<p>送货地：云南昆明</p>
		<el-form label-width="100px">
			<el-form-item label="装车照片">
				<ImageUpload :limitNum="10" :isPreview="true"></ImageUpload>
			</el-form-item>
			<el-form-item label="到货照片">
				<ImageUpload :limitNum="10" :isPreview="true"></ImageUpload>
			</el-form-item>
			<el-form-item label="回单照片">
				<ImageUpload :limitNum="10" :isPreview="true"></ImageUpload>
			</el-form-item>
			<el-form-item label="异常上报">
				<ImageUpload :limitNum="10" :isPreview="true"></ImageUpload>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancel">返回</el-button>
		</div>
	</el-dialog>
</template>
<script>

export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			photos: {}
		}
	},
	created() {
	},
	methods: {
		cancel() {
			this.$emit('callback', false)
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>


