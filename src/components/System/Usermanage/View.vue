<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">查看用户</div>
			<el-form label-width="120px">
			<el-row>
				<el-col :span="8">
						<el-form-item label="头像">
							<ImageUpload :files="[user.HeadPic]" :isPreview="true"/>
						</el-form-item>
				</el-col>
				<el-col :span="8">
					
						<el-form-item label="姓名">
							<p>{{user.RealName}}</p>
						</el-form-item>
						<el-form-item label="手机号码">
							<p>{{user.Mobile}}</p>
						</el-form-item>
					
				</el-col>
				<el-col :span="8">
						<el-form-item label="员工编号">
							<p>{{user.StaffCode}}</p>
						</el-form-item>
						<el-form-item label="入职时间">
							<p>{{ new Date(user.EntryDate).getTime() | getdatefromtimestamp(true)}}</p>
						</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="职位类型">
						<p>{{user.RealName}}</p>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="职位名称">
						<p>{{user.RealName}}</p>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="工作状态">
						<p v-if="user.WorkStatus=='free'">空闲中</p>
						<p v-else>工作中</p>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="资料状态">
						<p v-if="user.Status=='Passed'">通过</p>
						<p v-else-if="user.Status=='NotPassed'">审核中</p>
						<p v-else>其他</p>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="是否离职">
						<p v-if="user.InLeave=='Y'">是</p>
						<p v-else>否</p>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="用户角色">
						<p>{{user.sys_roles.map(item => item.RoleName).join(',')}}</p>
					</el-form-item>
					<el-form-item label="备注">
						<p>{{user.Remark}}</p>
					</el-form-item>
				</el-col>
				<el-col :span="24">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestNode from '../../../common/requestNode'
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			user: {
				EntryDate:'',
				StaffCode: '',
				RealName: '',
				Mobile: '',
				PositionType: '',
				HeadPic: '',
				Position: '',
				InLeave: '',
				Remark: '',
				sys_roles: []
			},
			
		}
	},
	created() {
		this.getUser()
	},
	methods: {
		getUser() {
			let params = {
				Staff_ID: this.$route.query.Staff_ID
			}
			requestNode({
				url: '/com_staff/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.user = res.data.data
				} else {
					Message.error(res.data.msg)
				}
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
