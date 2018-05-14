<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑用户</span>
			</div>
			<el-form label-width="120px" :model="user" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="头像" prop="Photo">
							<ImageUpload :files="[user.Photo]" @imgUrlBack="handleAvatarSuccess" :fixed="true"/>
						</el-form-item>
						<el-form-item label="登录名" prop="LoginName">
							<el-input auto-complete="off" v-model="user.LoginName"></el-input>
						</el-form-item>
						<el-form-item label="支付密码" prop="PayPassword">
							<el-input auto-complete="off" v-model="user.PayPassword"></el-input>
						</el-form-item>
						<el-form-item label="手机" prop="Mobile">
							<el-input auto-complete="off" v-model="user.Mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="归属公司" prop="Company_ID">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.Company_ID" @change="selectCompany">
								<el-option 
								v-for="company in companys" 
								:key="company.Organization_ID" 
								:label="company.Name" 
								:value="company.Organization_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="归属部门" prop="Organization_ID">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.Organization_ID">
								<el-option 
								v-for="department in departments" 
								:key="department.Organization_ID" 
								:label="department.Name" 
								:value="department.Organization_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="密码">
							<el-input auto-complete="off" v-model="user.Password"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="Email">
							<el-input auto-complete="off" v-model="user.Email"></el-input>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<el-radio-group v-model="user.LoginFlag">
								<el-radio label="Y">是</el-radio>
								<el-radio label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="工号" prop="JobNo">
							<el-input auto-complete="off" v-model="user.JobNo"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="Name">
							<el-input auto-complete="off" v-model="user.Name"></el-input>
						</el-form-item>
						<!-- <el-form-item label="确认密码" prop="Password2">
							<el-input auto-complete="off" v-model="user.Password2"></el-input>
						</el-form-item> -->
						<el-form-item label="电话" prop="Phone">
							<el-input auto-complete="off" v-model="user.Phone"></el-input>
						</el-form-item>
						<el-form-item label="用户类型" prop="Type">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.Type">
								<el-option label="系统管理" :value="0"></el-option>
								<el-option label="部门经理" :value="1"></el-option>
								<el-option label="普通用户" :value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="角色权限" prop="sys_roles">
							<el-select style="width: 100%" v-model="user.sys_roles" multiple placeholder="请选择">
								<el-option v-for="role in roles" :key="role.EnName" :label="role.Name" :value="role.Role_ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="user.Remark" :rows="5"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="editUser">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../common/request'
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
import { checkMobile, checkTel } from '../../../common/validator'
export default {
	data() {
		// var validatePass = (rule, value, callback) => {
		// 	if (value === '') {
		// 		callback(new Error('请输入密码'))
		// 	} else {
		// 		if (this.user.Password2 !== '') {
		// 			this.$refs.ruleForm.validateField('Password2')
		// 		}
		// 		callback()
		// 	}
		// }
		// var validatePass2 = (rule, value, callback) => {
		// 	if (value === '') {
		// 		callback(new Error('请再次输入密码'))
		// 	} else if (value !== this.user.Password) {
		// 		callback(new Error('两次输入密码不一致!'))
		// 	} else {
		// 		callback()
		// 	}
		// }
		return {
			user: {
				Company_ID:'',
				Organization_ID:'',
				LoginName:'',
				Password: '',
				Password2: '',
				PayPassword: '',
				JobNo:'',
				Name:'',
				Sex:'',
				Email:'',
				Phone:'',
				Mobile:'',
				Type:0,
				Photo:'',
				PCID:'',
				LoginFlag:'',
				Remark:'',
				sys_roles:[]
			},
			roles: [],
			isAllowLogin: true,
			companys: [],
			departments: [],
			rules: {
				Photo: [
					{required: true, message: '请上传头像'}
				],
				LoginName: [
					{required: true, message: '请输入登录名'},
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				PayPassword: [
					{required: true, message: '请输入支付密码'},
					{ min: 6, max: 8, message: '长度在 6 到 8 个字符'}
				],
				Mobile: [
					{required: true, validator: checkMobile}
				],
				Company_ID: [
					{required: true, message: '请选择公司', trigger: 'change'}
				],
				Organization_ID: [
					{required: true, message: '请选择部门'}
				],
				Password: [
					// {required: true, validator: validatePass},
					{ min: 6, max: 8, message: '长度在 6 到 8 个字符'}
				],
				Email: [
					{type: 'email', message: '请输入正确的邮箱地址'}
				],
				JobNo: [
					{required: true, message: '请输入工号'},
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				Name: [
					{required: true, message: '请输入姓名'},
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				// Password2: [
				// 	{required: true, validator: validatePass2}
				// ],
				Phone: [
					{validator: checkTel}
				],
				Type: [
					{required: true, message: '请选择类型'}
				],
				sys_roles: [
					{required: true, message: '请选择角色'}
				],
			}
		}
	},
	created() {
		this.getUser()
		this.getRoles()
		this.getCompanys()
	},
	methods: {
		getUser() {
			let params = {
				User_ID: this.$route.query.User_ID
			}
			request({
				url: '/sys_user/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.user = res.data.data
					this.user.Password2 = res.data.data.Password
					this.isAllowLogin = res.data.data.LoginFlag == 'Y' ? true : false
					this.user.sys_roles = res.data.data.sys_roles.map(item => item.Role_ID)
					if (this.user.Company_ID) {
						this.getCompanys(this.user.Company_ID)
					}
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		editUser() {
			let data = this.user
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					request({
						url: '/sys_user/update',
						method: 'post',
						data
					}).then(res => {
						if (res.data.code == 0) {
							Message.success(res.data.msg)
							this.$router.push({name: 'usermanage'})
						} else {
							Message.error(res.data.msg)
						}
					})
				}
			})
		},
		getRoles() {
			let params = {
				pageSize: 100
			}
			request({
				url: '/sys_role/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					let Oroles = res.data.data.rows
					this.roles = Oroles.map(item => {
						return {
							Role_ID: item.Role_ID,
							Name: item.Name
						}
					})
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getCompanys(Organization_PID) {
			let params = {
				Organization_PID
			}
			request({
				url: '/sys_organization/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					if (Organization_PID) {
						this.departments = res.data.data
					} else {
						this.companys = res.data.data
					}
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		selectCompany(Organization_ID) {
			this.getCompanys(Organization_ID)
		},
		handleAvatarSuccess(res) {
			this.user.Photo = res[0]
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
.el-checkbox
	margin-left 0!important
	margin-right 30px
</style>