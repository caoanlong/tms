<template>
	<div class="imgUpload clearfix">
		<div class="imgLi" 
		:style="{'width': width+'px','height': height+'px'}" 
		v-for="(file, i) in fileUrl"
		:key="i" >
			<img v-if="file" :src="resizeImg(file, '_150x150.')">
			<img v-else :src="defaultImg">
			<div class="controller">
				<div class="controllerBtn">
					<div class="perviewBtn" @click.stop="showImgModal(file, i)"></div>
					<div class="delBtn" v-show="!isPreview" @click.stop="delImg(i)"></div>
				</div>
			</div>
			<div v-if="isShowType">
				<p class="picType" v-if="objs[i].type =='Loaded'">装车照片</p>
				<p class="picType" v-else-if="objs[i].type =='Arrived'">送达照片</p>
				<p class="picType" v-else-if="objs[i].type =='Received'">回单照片</p>
				<p class="picType" v-else>异常照片</p>
			</div>
		</div>
		<div class="addBtn" :style="{'width':width+'px','height':height+'px'}" v-show="isLimit && !isPreview">
			<div class="addIcon">
				<i style="font-size: 30px; position: relative; top: 10px" class="el-icon-plus avatar-uploader-icon"></i>
			</div>
			<input type="file" name="" @change.stop="addImg" ref="uploadFile"/>
		</div>
		<el-dialog title="裁剪图片" :visible.sync="isShowCropper"  :modal="false">
			<vueCropper
				style="height: 600px" 
				ref="cropper"
				:autoCrop="true"
				:autoCropWidth="200"
				:autoCropHeight="200" 
				:fixed="fixed" 
				:fixedNumber="fixedNumber" 
				:img="localImgUrl" 
				:outputSize="1"
				outputType="png">
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
import { Message } from 'element-ui'
import { baseURL } from '../../../common/request'
import { formDataReq, getdatefromtimestamp, resizeImg } from '../../../common/utils'
import VueCropper from 'vue-cropper'
import { defaultImg, positionImg } from '../../../assets/icons/icons'
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
			type: Array,
			default: () => []
        },
        objs: {
            type: Array,
            default: () => []
        },
		isPreview: {
			type: Boolean,
			default: false
		},
		isUseCropper: {
			type: Boolean,
			default: true
		},
		fixed: {
			type: Boolean,
			default: false
		},
		fixedNumber: {
			type: Array,
			default: () => [1,1]
		},
		isShowType: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			fileUrl: this.files[0] ? this.files : [],
			localImgUrl: '',
			isShowCropper: false,
			isUploaded: false
		}
	},
	computed: {
		isLimit() {
			if (this.fileUrl.length > this.limitNum - 1) {
				return false
			}else {
				return true
			}
		},
		defaultImg: () => defaultImg,
		resizeImg: () => resizeImg
	},
	watch: {
		files: {
			handler(newval) {
				this.fileUrl = this.files
			},
			deep: true
		}
	},
	methods: {
		addImg(e) {
			if (this.$refs.uploadFile.value != '') {
				let arr = this.$refs.uploadFile.files[0].name.split('.')
				let suffix = arr[arr.length-1].toLowerCase()
				if (suffix != 'jpg' && suffix != 'jpeg' && suffix != 'png' && suffix != 'gif') {
					Message.error('图片格式只支持jpg、png和gif！')
					return
				}
				if (this.isUseCropper) {
					this.localImgUrl = window.URL.createObjectURL(this.$refs.uploadFile.files[0])
					this.isShowCropper = true
				} else {
					this.uploadFile(this.$refs.uploadFile.files[0])
				}
				this.$refs.uploadFile.value = ''
			}
		},
		upload() {
			if (this.isUploaded) {
				Message.error('正在上传,请稍等！')
				return
			}
			if (this.fileUrl.length > this.limitNum) {
				return
			}
			this.isUploaded = true
			this.$refs.cropper.getCropBlob((data) => {
				this.uploadFile(data, () => {
					this.isShowCropper = false
				})
			})
		},
		uploadFile(data, cb) {
			const url = baseURL + "/sys/picture/upload"
			const headers = {
				'Content-type':'multipart/form-data;charset=UTF-8',
				'Request-From': 'PC'
			}
			const params = formDataReq({
				"file": data
			})
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
			axios.post(url, params, headers).then(res => {
				this.fileUrl.push(res.data.data)
				this.$emit('imgUrlBack', this.fileUrl)
				setTimeout(() => {
					this.isUploaded = false
				}, 1500)
				cb && cb()
			}).catch(err => {
				setTimeout(() => {
					this.isUploaded = false
				}, 1500)
				console.log('服务器异常' + err)
			})
		},
		delImg(i) {
			this.fileUrl.splice(i, 1)
			this.$emit('imgUrlBack', this.fileUrl)
		},
		showImgModal(url, index) {
			let elem = document.createElement('div')
			elem.id = 'imgView'
			elem.innerHTML = `<div style="position:fixed;left:0;top:0;right:0;height:100%;background-color:rgba(0,0,0,.5);z-index:9998;overflow:auto" onclick="function(ev){var oEvent = ev||event;oEvent.cancelBubble = true;oEvent.stopPropagation();document.getElementById('app').removeChild(document.getElementById('imgView'))}">
				<div style="width:40%;margin: 50px auto;position:relative;background-color:#fff;z-index:9999;border-radius:5px;padding-top:60px;overflow:hidden">
					<div style="width:100%;height:60px;line-height:60px;padding: 0 16px;font-size:16px;position:absolute;top:0">
						图片预览
						<div style="position:absolute;right:0;top:0;width:60px;height:60px;cursor:pointer;" onclick="document.getElementById('app').removeChild(document.getElementById('imgView'))">
							<i class="el-message-box__close el-icon-close" style="color:#999;margin-left:25px"></i>
						</div>
					</div>
					<div style="height:36px;line-height:36px;padding: 0 16px;">
						<span>${this.objs[index].createName}</span>
						<span style="color:#999">（${this.objs[index].createMobile}）</span>
						
					</div>
					<img style="width: 100%;vertical-align:top" src=${this.imgUrl + url} />
					<div style="height:60px;background:rgba(0,0,0,.5);position:absolute;left:0;right:0;bottom:0;color:#fff;font-size:12px">
						<div style="position:relative;height:30px;line-height:30px;padding: 0 100px 0 10px;">
							<div style="display:inline-block;width:100%;height:30px;line-height:30px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${this.objs[index].description?this.objs[index].description:''}</div>
							<div>
								<span style="position:absolute;top:5px;right:10px;padding:0 10px;background:#f80;border-radius:4px;height:20px;line-height:20px">
												${this.objs[index].type == 'Loaded' ? '装车' 
												: (this.objs[index].type == 'Arrived' ? '送达' 
												: (this.objs[index].type == 'Received' ? '回单' : '异常'))}
											</span>
							</div>
						</div>
						<div style="padding: 0 10px">
							<img src="${positionImg}" style="vertical-align:middle;height:16px;${this.objs[index].detailAddress?'display:inline-block':'display:none'}" /> ${this.objs[index].detailAddress ? this.objs[index].detailAddress : ''} <span style="color:#999;margin-left:10px">${getdatefromtimestamp(this.objs[index].createTime)}</span>
						</div>
					</div>
				</div>
			</div>`
			document.getElementById('app').appendChild(elem)
		}
	},
	components: {
		VueCropper
	}
}
</script>
<style lang="stylus" scoped>
	.imgUpload
		.imgLi
			float left
			border 1px solid #f0f0f0
			border-radius 6px
			text-align center
			position relative
			margin 0 5px 5px 0
			overflow hidden
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
			.picType
				height 18px
				line-height 18px
				margin 0
				font-size 12px
				position absolute
				bottom 0
				width 100%
				background rgba(0,0,0,.3)
				color #f8f8f8
			&:hover
				.controller
					display block
				.picType
					color #fff
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