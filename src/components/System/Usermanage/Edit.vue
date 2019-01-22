<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">编辑用户</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="sysMember" :rules="rules" ref="ruleForm">
						<el-form-item label="头像" prop="headPic">
							<ImageUpload :files="[sysMember.headPic]" @imgUrlBack="handleHeadPicSuccess" :fixed="true"/>
						</el-form-item>
						<el-form-item label="手机号" prop="mobile">
							<p>{{sysMember.mobile}}</p>
						</el-form-item>
						<el-form-item label="用户姓名" prop="realName">
							<el-input v-model="sysMember.realName"></el-input>
						</el-form-item>
						<el-form-item label="状态" prop="isPrevent">
							<el-radio v-model="sysMember.isPrevent" label="N">正常</el-radio>
							<el-radio v-model="sysMember.isPrevent" label="Y">停用</el-radio>
						</el-form-item>
						<el-form-item label="职位" prop="jobPosition">
							<el-input v-model="sysMember.jobPosition"></el-input>
						</el-form-item>
						<el-form-item label="工号" prop="jobNumber">
							<el-input v-model="sysMember.jobNumber"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">取消</el-button>
							<el-button type="primary" @click="save">保存</el-button>
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
				mobile: '',
				realName: '',
                mobile: '',
				isPrevent: 'N',
				jobPosition: '',
				jobNumber: ''
			},
			rules: {
				mobile: [
					{ required: true, message: '请输入手机号' },
					{ required: true, validator: checkMobile }
				],
				realName: [
					{ required: true, message: '请输入姓名' },
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符' }
				],
				isPrevent: [{ required: true, message: '请选择状态' }]
			}
		}
	},
	created() {
		if(this.$route.query.cache) {
			this.getInfo()
		}
	},
	activated() {
		if(!this.$route.query.cache) {
			this.getInfo()
		}
	},
	methods: {
		getInfo() {
			const memberID = this.$route.query.memberID
			SysMember.findById({ memberID }).then(res => {
				this.sysMember = res
			})
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SysMember.update(this.sysMember).then(res => {
					Message.success('成功！')
					this.$router.push({name: 'usermanage'})
				})
			})
		},
		handleHeadPicSuccess(res) {
			this.sysMember.headPic = res[0]
		},
		back() {
			this.$router.push({name: 'usermanage'})
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