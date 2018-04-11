<template>
	<div>
		<el-dialog title="装车发运" :visible.sync="isVisible" custom-class="table" width="70%">
			<span slot="footer" class="dialog-footer">
				<el-button @click="control(false)">取消</el-button>
				<el-button type="primary" @click="control(true)">确认</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			isVisible: {
				type: Boolean,
				default: false
			},
			payInfo: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			control(bool) {
				this.$emit('control', false)
			}
		}
	}
</script>