<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div class="header clearfix">查看角色</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="名称">
							<p v-text="role.RoleName"></p>
						</el-form-item>
						<el-form-item label="英文名称">
							<p v-text="role.RoleEnName"></p>
						</el-form-item>
						<el-form-item label="角色代码">
							<p v-text="role.RoleCode"></p>
						</el-form-item>
						<el-form-item label="角色类型">
							<p v-text="role.RoleType"></p>
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
				requestNode({
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
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>