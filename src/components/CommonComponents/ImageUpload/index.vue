<template>
	<div class="imgUpload clearfix">
		<div class="imgLi" 
		:style="{'width': width+'px','height': height+'px'}" 
		v-for="(file,i) in fileUrl"
		:key="i" v-if="file">
			<img :src="imgUrl + file">
			<div class="controller">
				<div class="controllerBtn">
					<div class="perviewBtn" @click.stop="showImgModal(file)"></div>
					<div class="delBtn" v-show="!isPreview" @click.stop="delImg(i)"></div>
				</div>
			</div>
		</div>
		<div class="addBtn" :style="{'width':width+'px','height':height+'px'}" v-show="isLimit && !isPreview">
			<div class="addIcon">
				<i style="font-size: 30px; position: relative; top: 10px" class="el-icon-plus avatar-uploader-icon"></i>
			</div>
			<input type="file" name="" @change.stop="addImg" ref="uploadFile"/>
		</div>
		<el-dialog :fullscreen="true" title="裁剪图片" :visible.sync="isShowCropper">
			<vueCropper
				ref="cropper"
				:autoCrop="true"
				:autoCropWidth="200"
				:autoCropHeight="200" 
				:fixed="fixed" 
				:fixedNumber="fixedNumber" 
				:img="localImgUrl" 
				:outputSize="1"
				outputType="jpeg">
			</vueCropper>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShowCropper = false">取 消</el-button>
				<el-button type="primary" @click="upload">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import axios from 'axios'
	import { baseURL } from '../../../common/request'
	import common from '../../../common/utils'
	import VueCropper from 'vue-cropper'
	export default {
		props: {
			width: {
				type: Number,
				default: 100
			},
			height: {
				type: Number,
				default: 100
			},
			limitNum: {
				type: Number,
				default: 1
			},
			files: {
				type: Array
			},
			isPreview: {
				type: Boolean,
				default: false
			},
			fixed: {
				type: Boolean,
				default: false
			},
			fixedNumber: {
				type: Array,
				default: () => [1,1]
			}
		},
		data() {
			return {
				fileUrl: this.files[0] ? this.files : [],
				localImgUrl: '',
				isShowCropper: false
			}
		},
		computed: {
			isLimit() {
				if (this.fileUrl.length > this.limitNum - 1) {
					return false
				}else {
					return true
				}
			}
		},
		watch: {
			files(newval) {
				if (newval.length > 0 && newval[0]) {
					this.fileUrl = this.files
				}
			}
		},
		methods: {
			addImg() {
				this.localImgUrl = window.URL.createObjectURL(this.$refs.uploadFile.files[0])
				this.isShowCropper = true
			},
			upload() {
				this.$refs.cropper.getCropBlob((data) => {
					let url = baseURL + "/sys/picture/upload"
					let headers = {'Content-type':'multipart/form-data;charset=UTF-8'}
					let params = common.formDataReq({
						"file": data
					})
					axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
					axios.post(url, params, headers).then(res => {
						this.fileUrl.push(res.data.data)
						this.$emit('imgUrlBack', this.fileUrl)
						this.isShowCropper = false
					}).catch(err => {
						console.log('服务器异常' + err)
					})
				})
			},
			delImg(i) {
				this.fileUrl.splice(i, 1)
				this.$emit('imgUrlBack', this.fileUrl)
			},
			showImgModal(url) {
				this.$alert(`<img style="width: 100%" src=${this.imgUrl + url} />`, '图片预览', {
					dangerouslyUseHTMLString: true,
					showConfirmButton: false,
					customClass: 'img-preview'
				})
			}
		},
		components: {
			VueCropper
		}
	}
</script>
<style lang="stylus" scoped>
	.vue-cropper
		height 600px
	.imgUpload
		.imgLi
			float left
			border 1px solid #f0f0f0
			border-radius 6px
			text-align center
			position relative
			margin 0 5px 5px 0
			.controller
				position absolute
				top 0
				left 0
				width 100%
				height 100%
				border-radius 6px
				background-color rgba(0, 0, 0, .5)
				display none
				.controllerBtn
					position absolute
					left 0
					top 0
					right 0
					bottom 0
					margin auto
					width 80px
					height 40px
					cursor pointer
					display flex
					.perviewBtn
						flex 1
						width 40px
						height 40px
						background-image url('../../../assets/imgs/perview.png')
						background-repeat no-repeat
						background-size 26px
						background-position center
					.delBtn
						flex 1
						width 40px
						height 40px
						background-image url('../../../assets/imgs/trush.png')
						background-repeat no-repeat
						background-size 26px
						background-position center
			img
				display block
				width 100%
				height 100%
				border-radius 6px
			&:hover
				.controller
					display block
		.addBtn
			float left
			border 1px dashed #d9d9d9
			border-radius 6px
			color #8c939d
			position relative
			text-align center
			margin 0 5px 5px 0
			&:hover
				border-color #409eff
			.addIcon
				position absolute
				left 0
				top 0
				right 0
				bottom 0
				margin auto
				width 100%
				height 52px
			input
				display block
				width 100%
				height 100%
				opacity 0
</style>