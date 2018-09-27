<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div class="header clearfix"><span>{{isEdit ? '编辑个人资料' : '查看个人资料'}}</span>
				<!-- <el-button style="float: right; padding: 3px 0;margin-top:15px" type="text" @click="editInfo">{{isEdit ? '取消编辑' : '编辑'}}</el-button> -->
			</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="8" :offset="8">
						<el-form-item label="头像">
							<ImageUpload :files="[user.Photo]" @imgUrlBack="handleAvatarSuccess" :isPreview="!isEdit" :fixed="true" />
						</el-form-item>
						<el-form-item label="会员ID">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.memberID" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.memberID" v-else></p>
						</el-form-item>
						<el-form-item label="会员手机">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.mobile" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.mobile" v-else></p>
						</el-form-item>
						<el-form-item label="会员昵称">
							<el-input auto-complete="off" disabled v-model="user.nickName" v-if="isEdit" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.nickName" v-else></p>
						</el-form-item>
						<el-form-item label="会员真实姓名">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.realName" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.realName" v-else></p>
						</el-form-item>
						<el-form-item label="会员性别">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.sex" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.sex" v-else></p>
						</el-form-item>
						<el-form-item label="用户名">
							<el-input auto-complete="off" disabled v-model="user.userName" v-if="isEdit" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.userName" v-else></p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
							<el-button type="primary" v-show="isEdit" @click="editUser">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script type="text/javascript">
	import request from '../../common/request'
	import { Message } from 'element-ui'
	import ImageUpload from '../CommonComponents/ImageUpload'
	export default {
		data() {
			return {
				isEdit: false,
				user: {
					headPic:'',
					memberID:'',
					mobile:'',
					sex:'',
					userName:'',
					nickName:'',
					realName:''
				}
			}
		},
		created() {
			this.getUseInfo()
		},
		methods: {
			editInfo() {
				this.isEdit = !this.isEdit
			},
			getUseInfo() {
				request({
					url: '/mem/info',
					method: 'get',
				}).then(res => {
					this.user = res.data.data
				})
			},
			editUser() {
				let data  ={
					Name: this.user.Name,
					Phone: this.user.Phone,
					Mobile: this.user.Mobile,
					Email: this.user.Email,
					Remark: this.user.Remark,
					Photo: this.user.Photo
				}
				request({
					url: '/user/update',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success('成功！')
						this.isEdit = !this.isEdit
						this.$store.dispatch('GetUserInfo')
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			handleAvatarSuccess(res) {
				this.user.Photo = res
				console.log(res)
			},
			previewImg(imgUrl) {
				if (this.isEdit) {
					return
				}
				this.$alert(`<img style="width: 100%" src=${imgUrl} />`, '图片预览', {
					dangerouslyUseHTMLString: true,
					showConfirmButton: false,
					customClass: 'img-preview'
				})
			},
			back() {
				this.$router.go(-1)
			}
		},
		components: {
			ImageUpload
		}
	}
</script>
<style lang="stylus" scoped>
.avatar-uploader
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
	&:hover 
		border-color #409eff
	.avatar-uploader-icon
		font-size 28px
		color #8c939d
		width 98px
		height 98px
		line-height 98px
		text-align center
	.avatar
		width 98px
		height 98px
		display block
		vertical-align top
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
		box-sizing border-box
	
</style>