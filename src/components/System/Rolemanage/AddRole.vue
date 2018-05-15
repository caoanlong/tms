<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div class="header clearfix">添加角色</div>
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
							<el-button type="primary" @click.native="addRole">立即创建</el-button>
							<el-button @click.native="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/javascript">
	import requestNode from '../../../common/requestNode'
	import { Message } from 'element-ui'
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
				organizations: [],
				sysDataScopes: []
			}
		},
		created() {
		},
		methods: {
			addRole() {
				let data = {
					RoleName: this.role.RoleName,
					RoleEnName: this.role.RoleEnName,
					RoleCode: this.role.RoleCode,
					RoleType: this.role.RoleType,
					Remark: this.role.Remark
				}
				console.log(JSON.stringify(data))
				requestNode({
					url: '/sys_role/add',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						console.log(res.data)
						Message.success(res.data.msg)
						this.$router.push({name: 'rolemanage'})
					} else {
						Message.error(res.data.msg)
					}
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