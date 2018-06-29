<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div class="header clearfix">编辑角色</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="名称">
							<el-input auto-complete="off" v-model="role.RoleName"></el-input>
						</el-form-item>
						<el-form-item label="英文名称">
							<el-input auto-complete="off" v-model="role.RoleEnName"></el-input>
						</el-form-item>
						<el-form-item label="角色代码">
							<el-input auto-complete="off" v-model="role.RoleCode"></el-input>
						</el-form-item>
						<el-form-item label="角色类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.RoleType">
								<el-option label="任务分配" value="assignment"></el-option>
								<el-option label="管理角色" value="security-role"></el-option>
								<el-option label="普通角色" value="user"></el-option>
							</el-select>
						</el-form-item>
						
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="role.Remark"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="update">提交修改</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import SysRole from '../../../api/SysRole'
export default {
	data() {
		return {
			role: {
				RoleName: '',
				RoleEnName: '',
				RoleCode: '',
				RoleType: '',
				Remark: ''
			},
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const Role_ID = this.$route.query.Role_ID
			SysRole.findById({ Role_ID }).then(res => {
				this.role = res
			})
		},
		update() {
			SysRole.update({
				Role_ID: this.$route.query.Role_ID,
				RoleName: this.role.RoleName,
				RoleEnName: this.role.RoleEnName,
				RoleCode: this.role.RoleCode,
				RoleType: this.role.RoleType,
				Remark: this.role.Remark
			}).then(res => {
				Message.success(res.data.msg)
				this.$router.push({name: 'rolemanage'})
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>
	
</style>