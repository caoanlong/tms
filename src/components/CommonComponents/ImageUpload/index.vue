<template>
	<div class="imgUpload clearfix">
		<div class="imgLi" 
        :style="{'width': width+'px','height': height+'px'}" 
        v-for="(file,i) in fileUrl"
        :key="i">
			<img :src="file">
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
			<input type="file" name="" @change.stop="addImg()" ref="uploadFile"/>
		</div>
	</div>
</template>
<script>
    import axios from 'axios'
	import common from '../../../common/utils'
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
			}
		},
		data() {
			return {
				fileUrl: this.files || []
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
		methods: {
			addImg() {
				var url = "http://39.108.245.177:3001/uploadImg"
				var headers = {'Content-type':'multipart/form-data;charset=UTF-8'}
				var params = common.formDataReq({
					"file": this.$refs.uploadFile.files[0]
				});
				axios.post(url, params, headers).then(res => {
                    this.fileUrl.push('http://39.108.245.177:4000' + res.data.data)
                    this.$emit('imgUrlBack', this.fileUrl)
                }).catch(err => {
					console.log('服务器异常' + err)
				})
			},
			delImg(i) {
				this.fileUrl.splice(i, 1)
				this.$emit('imgUrlBack', this.fileUrl)
			},
			showImgModal(imgUrl) {
                this.$alert(`<img style="width: 100%" src=${imgUrl} />`, '图片预览', {
                    dangerouslyUseHTMLString: true,
                    showConfirmButton: false,
                    customClass: 'img-preview'
                })
			}
		},
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