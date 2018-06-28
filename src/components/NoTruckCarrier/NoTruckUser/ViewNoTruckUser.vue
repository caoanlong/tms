<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">查看无车承运接口配置</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="企业名称">
                            <p>{{interfaceConfig.companyName}}</p>
						</el-form-item>
						<el-form-item label="企业接入码">
							<p>{{interfaceConfig.senderCode}}</p>
						</el-form-item>
						<el-form-item label="Appkey">
							<p>{{interfaceConfig.appkey}}</p>
						</el-form-item>
                        <el-form-item label="报文功能代码">
							<p>{{interfaceConfig.messageFunctionCode}}</p>
						</el-form-item>
                        <el-form-item label="报文版本号">
							<p>{{interfaceConfig.documentVersionNumber}}</p>
						</el-form-item>
                        <el-form-item label="接收方代码">
							<p>{{interfaceConfig.recipientCode}}</p>
						</el-form-item>
						<el-form-item label="用户">
							<p>{{interfaceConfig.userName}}</p>
						</el-form-item>
						<el-form-item>
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
import NoTruckUser from '../../../api/NoTruckUser'
export default {
	data() {
		return {
			interfaceConfig: {}
		}
	},
	created() {
		this.getInterfaceConfig()
	},
	methods: {
		getInterfaceConfig() {
			const noTruckUserID = this.$route.query.noTruckUserID
			NoTruckUser.findById({ noTruckUserID }).then(res => {
				this.interfaceConfig = res
			})
		},
		back() {
			this.$router.go(-1)
		}
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
	.el-input__inner
		vertical-align top
</style>