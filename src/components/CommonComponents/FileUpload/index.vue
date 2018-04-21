<template>
	<div class="fileUpload">
		<input class="file-ipt" ref="uploadFile" type="file" :name="name" @change="selectFile">
		<el-button size="mini" icon="el-icon-upload2">{{btnTxt}}</el-button>
	</div>
</template>
<script>
	import { Message } from 'element-ui'
	import request, { baseURL } from '../../../common/request'
	import { formDataReq } from '../../../common/utils'
	export default {
		props: {
			btnTxt: {
				type: String,
				default: '导入'
			},
			name: {
				type: String,
				default: 'file'
			},
			url: {
				type: String
			}
		},
		data() {
			return {
				fileUrl: []
			}
		},
		computed: {
			baseURL: () => baseURL
		},
		methods: {
			selectFile() {
				this.upload(this.$refs.uploadFile.files[0])
			},
			upload(file) {
				let data = formDataReq({
					[this.name]: file
				})
				request({
					url: this.url,
					method: 'post',
					contentType: 'multipart/form-data;charset=UTF-8',
					data
				}).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.fileUpload
		position relative
		.file-ipt
			position absolute
			left 0
			top 0
			width 100%
			height 28px
			opacity 0
</style>