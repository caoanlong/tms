<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加资料</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="interfaceConfig" :rules="rules" ref="ruleForm">
						<el-form-item label="企业名称" prop="companyName">
							<el-select style="width: 100%" placeholder="请选择" @change="handSelectCompany" v-model="interfaceConfig.companyName">
								<el-option v-for="company in companys" :key="company.memberId" :label="company.companyName" :value="company.memberId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业接入码" prop="senderCode">
							<p>{{interfaceConfig.senderCode}}</p>
						</el-form-item>
                        <el-form-item label="Appkey" prop="appkey">
							<p>{{interfaceConfig.appkey}}</p>
						</el-form-item>
                        <el-form-item label="报文功能代码" prop="messageFunctionCode">
							<el-input v-model="interfaceConfig.messageFunctionCode"></el-input>
						</el-form-item>
                        <el-form-item label="报文版本号" prop="documentVersionNumber">
							<el-input v-model="interfaceConfig.documentVersionNumber"></el-input>
						</el-form-item>
                        <el-form-item label="接收方代码" prop="recipientCode">
							<el-input v-model="interfaceConfig.recipientCode"></el-input>
						</el-form-item>
						<el-form-item label="用户" prop="userID">
							<el-select style="width: 100%" placeholder="请选择" v-model="interfaceConfig.userID">
								<el-option v-for="user in users" :key="user.User_ID" :label="user.Name" :value="user.User_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="addInterfaceConfig">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../../common/request'
import Notruck from '../../../api/Notruck'
export default {
	data() {
		return {
			interfaceConfig: {
				appkey: "",
				companyName: "",
				documentName: "",
				documentVersionNumber: "",
				memberId: "",
				messageFunctionCode: "",
				noTruckUserID: "",
				recipientCode: "",
				senderCode: "",
				userID: "",
				userName: ""
			},
			users: [],
			companys: [],
			rules: {
				companyName: [ {required: true, message: '请选择企业'} ],
				senderCode: [ {required: true, message: '请输入企业接入码'} ],
				appkey: [ {required: true, message: '请输入Appkey'} ],
				messageFunctionCode: [ {required: true, message: '请输入报文功能代码'} ],
				documentVersionNumber: [ {required: true, message: '请输入报文版本号'} ],
				recipientCode: [ {required: true, message: '请输入接收方代码'} ],
				userID: [ {required: true, message: '请选择用户'} ]
			}
		}
	},
	created() {
		this.getCompanys()
		this.getUsers()
	},
	methods: {
		addInterfaceConfig() {
			Notruck.broker().add({
				appkey: this.interfaceConfig.appkey,
				documentVersionNumber: this.interfaceConfig.documentVersionNumber,
				memberId: this.interfaceConfig.memberId,
				messageFunctionCode: this.interfaceConfig.messageFunctionCode,
				recipientCode: this.interfaceConfig.recipientCode,
				senderCode: this.interfaceConfig.senderCode,
				userID: this.interfaceConfig.userID,
			}).then(res => {
				Message.success(res.data.message)
				this.$router.push({name: 'notruckbroker'})
			})
		},
		handSelectCompany(memberId) {
			this.interfaceConfig.memberId = memberId
			this.getAppKey(memberId)
		},
		// 获取appKey
		getAppKey(memID) {
			Notruck.broker().findAppKey({ memID }).then(res => {
				this.interfaceConfig.appkey = res.appKey
				this.interfaceConfig.senderCode = res.accessCode
			})
		},
		// 获取所有企业
		getCompanys() {
			Notruck.broker().findCompany().then(res => {
				this.companys = res
			})
		},
		// 获取所有用户
		getUsers() {
			let params = {
				pageSize: 100
			}
			request({
				url: '/sys_user/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.users = res.data.data.rows
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