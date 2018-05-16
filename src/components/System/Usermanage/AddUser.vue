<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div class="header clearfix">添加员工</div>
			<el-form label-width="120px" :model="user" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="头像" prop="HeadPic">
							<ImageUpload :files="[user.HeadPic]" @imgUrlBack="handleAvatarSuccess" :fixed="true"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="姓名" prop="RealName">
							<el-input auto-complete="off" v-model="user.RealName"></el-input>
						</el-form-item>
						<el-form-item label="手机号码" prop="Mobile">
							<el-input auto-complete="off" v-model="user.Mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="员工编号" prop="StaffCode">
							<el-input auto-complete="off" v-model="user.StaffCode"></el-input>
						</el-form-item>
						<el-form-item label="入职时间" prop="EntryDate">
							<el-date-picker style="width:100%" placeholder="选择入职时间" v-model="user.EntryDate" value-format="timestamp"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="职位类型" prop="PositionType">
							<el-input auto-complete="off" v-model="user.PositionType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职位名称" prop="Position">
							<el-input auto-complete="off" v-model="user.Position"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="工作状态" prop="WorkStatus">
							<el-select v-model="user.WorkStatus" placeholder="请选择工作状态" style="width:100%">
								<el-option value="Free" label="空闲中">空闲中</el-option>
								<el-option value="Working" label="工作中">工作中</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="资料状态" prop="Status">
							<el-select v-model="user.Status" placeholder="请选择资料状态" style="width:100%">
								<el-option value="Passed" label="通过">通过</el-option>
								<el-option value="NotPassed" label="审核中">审核中</el-option>
								<el-option value="Other" label="其他">其他</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否离职" prop="InLeave">
							<el-switch v-model="user.InLeave"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="角色权限" prop="sys_roles">
					<el-select style="width: 100%" v-model="user.sys_roles" multiple placeholder="请选择">
						<el-option v-for="role in roles" :key="role.Role_ID" :label="role.RoleName" :value="role.Role_ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" resize="none" v-model="user.Remark" :rows="5"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addUser">立即创建</el-button>
					<el-button @click="back">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
import requestNode from '../../../common/requestNode'
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
import { checkMobile, checkTel } from '../../../common/validator'
export default {
	data() {
		return {
			user: {
				Company_ID: '',
				Organization_ID: '',
				StaffCode: '',
				RealName: '',
				Mobile: '',
				PositionType: '',
				HeadPic: '',
				EntryDate: '',
				Position: '',
				Remark: '',
				WorkStatus: '',
				Status: '',
				InLeave: false,
				sys_roles: []
			},
			roles: [],
			rules: {
				Mobile: [
					{required: true, validator: checkMobile}
				],
				StaffCode: [
					{required: true, message: '请输入员工编号'},
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				RealName: [
					{required: true, message: '请输入姓名'},
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],

				PositionType: [
					{required: true, message: '请选择职位类型'}
				],
				Position: [
					{required: true, message: '请输入职位名称'}
				],
				EntryDate: [
					{required: true, message: '请选择入职时间'}
				],
				sys_roles: [
					{required: true, message: '请选择角色'}
				],
			}
		}
	},
	created() {
		this.getRoles()
		this.getCompanys()
	},
	methods: {
		addUser() {
			let data = this.user
			data.InLeave = data.InLeave ? 'Y' : 'N'
			console.log(data)
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					requestNode({
						url: '/com_staff/add',
						method: 'post',
						data
					}).then(res => {
						if (res.data.code == 0) {
							console.log(res.data)
							Message.success(res.data.msg)
							this.$router.push({ name: 'usermanage' })
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
			requestNode({
				url: '/sys_role/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					let Oroles = res.data.data.rows
					this.roles = Oroles.map(item => {
						return {
							Role_ID: item.Role_ID,
							RoleName: item.RoleName
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
			requestNode({
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
			this.user.HeadPic = res[0]
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