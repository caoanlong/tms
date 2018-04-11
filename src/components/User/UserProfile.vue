<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div class="header clearfix"><span>{{isEdit ? '编辑个人资料' : '查看个人资料'}}</span>
				<el-button style="float: right; padding: 3px 0;margin-top:15px" type="text" @click="editInfo">{{isEdit ? '取消编辑' : '编辑'}}</el-button></div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="头像">
							<ImageUpload 
								:files="[user.Photo]" 
								@imgUrlBack="handleAvatarSuccess"
								:isPreview="!isEdit" 
								:fixed="true"/>
						</el-form-item>

						<el-form-item label="公司">
							<el-input auto-complete="off" disabled v-model="user.Company_ID" v-if="isEdit"></el-input>
							<p v-text="user.Company_ID" v-else></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.Name" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.Name" v-else></p>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.Email" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.Email" v-else></p>
						</el-form-item>
						<el-form-item label="部门">
							<el-input auto-complete="off" disabled v-model="user.Organization_ID" v-if="isEdit" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.Organization_ID" v-else></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="手机">
							<el-input auto-complete="off"  v-if="isEdit" v-model="user.Mobile" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.Mobile" v-else></p>
						</el-form-item>
						<el-form-item label="电话">
							<el-input auto-complete="off"  v-if="isEdit" v-model="user.Phone" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.Phone" v-else></p>
						</el-form-item>
						<el-form-item label="用户名">
							<el-input auto-complete="off" disabled v-model="user.LoginName" v-if="isEdit" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.LoginName" v-else></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="16">
					<el-form label-width="120px">
						<el-form-item label="用户角色">
							<el-input auto-complete="off" disabled v-model="user.sys_roles.map(item => item.Name).join(',')" v-if="isEdit"></el-input :class="isEdit?'text-input':''">
							<p v-else>{{user.sys_roles.map(item => item.Name).join(',')}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="用户类型">
							<el-input auto-complete="off" disabled v-model="user.Type" v-if="isEdit" :class="isEdit?'text-input':''"></el-input>
							<p v-else>{{user.Type}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="备注">
							 <el-input auto-complete="off" v-if="isEdit" v-model="user.Remark" :class="isEdit?'text-input':''"></el-input>
							 <p v-text="user.Remark" v-else></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button @click="back">返回</el-button>
							<el-button type="primary" v-show="isEdit" @click="editUser">保存</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
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
					Name: '',
					LoginName: '',
					Phone: '',
					Mobile: '',
					Company_ID: '',
					Organization_ID: '',
					Email: '',
					Remark: '',
					Photo: '',
					sys_roles: [],
				}
			}
		},
		// created() {
		// 	this.getUseInfo()
		// },
		methods: {
			editInfo() {
				this.isEdit = !this.isEdit
			},
			getUseInfo() {
				request({
					url: '/user/info',
					method: 'get',
				}).then(res => {
					if (res.data.code == 0) {
						this.user = res.data.data
					} else {
						Message.error(res.data.msg)
					}
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
						Message.success(res.data.msg)
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