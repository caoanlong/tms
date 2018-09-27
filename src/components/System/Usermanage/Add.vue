<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加用户</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="sysMember" :rules="rules" ref="ruleForm">
						<el-form-item label="头像" prop="headPic">
							<ImageUpload :files="[sysMember.headPic]" @imgUrlBack="handleHeadPicSuccess" :fixed="true"/>
						</el-form-item>
						<el-form-item label="姓名" prop="realName">
							<el-input auto-complete="off" v-model="sysMember.realName"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="mobile">
							<el-input auto-complete="off" v-model="sysMember.mobile"></el-input>
						</el-form-item>
						<el-form-item label="角色权限" prop="roleIDs">
							<el-select style="width: 100%" v-model="sysMember.roleIDs" multiple placeholder="请选择">
								<el-option v-for="role in roles" :key="role.roleID" :label="role.roleName" :value="role.roleID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input auto-complete="off" type="password" v-model="sysMember.password"></el-input>
						</el-form-item>
						<el-form-item label="再次输入" prop="confirmPassword">
							<el-input auto-complete="off" type="password" v-model="sysMember.confirmPassword"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">取消</el-button>
							<el-button type="primary" @click="add">保存</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
import SysMember from '../../../api/SysMember'
import SysRole from '../../../api/SysRole'
import { checkMobile, checkTel } from '../../../common/validator'
export default {
	data() {
		return {
			sysMember: {
				headPic: '',
				realName: '',
				mobile: '',
				roleIDs: [],
				password: '',
				confirmPassword: ''
			},
			roles: [],
			rules: {
				realName: [
					{ required: true, message: '请输入姓名' },
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符' }
				],
				mobile: [
					{ required: true, message: '请输入手机号' },
					{ required: true, validator: checkMobile }
				],
				roleIDs: [
					{ required: true, message: '请选择角色' }
				],
				password: [
					{ required: true, message: '请输入密码' },
					{ min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字' }
				],
				confirmPassword: [
					{ required: true, message: '请再次输入密码' },
					{ validator: (rule, value, callback) => {
						value == this.sysMember.password ? callback() : callback(new Error('两次输入密码不一致!'))
					} }
				]
			}
		}
	},
	created() {
		this.getRoles()
	},
	methods: {
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				this.sysMember.roleIDs = this.sysMember.roleIDs.join(',')
				SysMember.add(this.sysMember).then(res => {
					Message.success('成功！')
					this.$router.push({name: 'usermanage'})
				}).catch(err => {
					this.sysMember.roleIDs = this.sysMember.roleIDs.split(',')
				})
			})
		},
		getRoles() {
			SysRole.find({
				size: 1000
			}).then(res => {
				this.roles = res.records
			})
		},
		handleHeadPicSuccess(res) {
			this.sysMember.headPic = res[0]
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

</style>