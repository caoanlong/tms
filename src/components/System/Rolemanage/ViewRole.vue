<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看角色</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="名称">
							<p v-text="role.Name"></p>
						</el-form-item>
						<el-form-item label="英文名称">
							<p v-text="role.EnName"></p>
						</el-form-item>
						<el-form-item label="组织机构">
							<p v-text="role.Organization_ID"></p>
						</el-form-item>
						<el-form-item label="角色类型">
							<p v-text="role.RoleType"></p>
						</el-form-item>
						<el-form-item label="数据范围">
							<p v-text="role.DataScope"></p>
						</el-form-item>
						<el-form-item label="是否系统数据">
							<p>{{role.Issys == 'Y' ? '是' : '否'}}</p>
						</el-form-item>
						<el-form-item label="是否可用">
							<p>{{role.Useable == 'Y' ? '是' : '否'}}</p>
						</el-form-item>
						<el-form-item label="备注">
							<p v-text="role.Remark"></p>
						</el-form-item>
						<el-form-item>
							<el-button @click.native="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				role: {
					Name: '',
					EnName: '',
					Organization_ID: '',
					RoleType: '',
					DataScope: '',
					Issys: '',
					Useable: '',
					Remark: ''
				}
			}
		},
		created() {
			this.getRole()
		},
		methods: {
			getRole() {
				let params = {
					Role_ID: this.$route.query.Role_ID
				}
				request({
					url: '/sys_role/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.role = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			editRole() {
				let data = this.role
				data.id = this.role._id
				console.log(JSON.stringify(data))
				request({
					url: '/role/update',
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
	.el-input__inner
		vertical-align top
</style>