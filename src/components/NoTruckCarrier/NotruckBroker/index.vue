<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">资料补充</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="notruckInfo" :rules="rules" ref="ruleForm" size="small">
						<el-form-item label="企业名称">
                            <p>{{companyName}}</p>
						</el-form-item>
						<el-form-item label="企业接入码" prop="senderCode">
							<el-input v-model="notruckInfo.senderCode"></el-input>
						</el-form-item>
                        <el-form-item label="Appkey" prop="appkey">
							<el-input v-model="notruckInfo.appkey"></el-input>
						</el-form-item>
                        <el-form-item label="报文功能代码" prop="messageFunctionCode">
							<el-input v-model="notruckInfo.messageFunctionCode"></el-input>
						</el-form-item>
                        <el-form-item label="报文版本号" prop="documentVersionNumber">
							<el-input v-model="notruckInfo.documentVersionNumber"></el-input>
						</el-form-item>
                        <el-form-item label="接收方代码" prop="recipientCode">
							<el-input v-model="notruckInfo.recipientCode" ></el-input>
						</el-form-item>
						<!-- <el-form-item label="用户">
							<el-select style="width: 100%" placeholder="请选择" v-model="notruckInfo.userName" >
								<el-option v-for="user in users" :key="user.User_ID" :label="user.Name" :value="user.User_ID"></el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item>
							<el-button type="primary" @click="save">立即保存</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Company from '../../../api/Company'
export default {
	data() {
		return {
			notruckInfo: {
				senderCode:'',
				appkey:'',
				messageFunctionCode:'',
				documentVersionNumber:'',
				recipientCode:''
			},
			companyName:'',
			rules: {
				senderCode: [ {required: true, message: '请输入企业接入码'} ],
				appkey: [ {required: true, message: '请输入Appkey'} ],
				messageFunctionCode: [ {required: true, message: '请输入报文功能代码'} ],
				documentVersionNumber: [ {required: true, message: '请输入报文版本号'} ],
				recipientCode: [ {required: true, message: '请输入接收方代码'} ],
				
			}
		}
	},
	created() {
		this.getCompanyName()
		this.getNotruckInfo()
	},
	methods: {
		getCompanyName(){
			this.companyName = localStorage.getItem("companyName")
		},
		getNotruckInfo() {
			Company.info().detailOfExtend().then(res => {
				this.notruckInfo = res.data?res.data:{}
			})
		},
		save() {

			this.$refs['ruleForm'].validate(valid => {
				if (!valid) {
					this.$nextTick(() => {
						Message.error($('.el-form-item__error:first').text())
						return
					})
				} else {
					Company.info().updateExtend({
						companyID:localStorage.getItem("companyID"),
						senderCode:this.notruckInfo.senderCode,
						documentName:this.notruckInfo.documentName,
						appkey:this.notruckInfo.appkey,
						messageFunctionCode:this.notruckInfo.messageFunctionCode,
						documentVersionNumber:this.notruckInfo.documentVersionNumber,
						recipientCode:this.notruckInfo.recipientCode,
						companyName:this.companyName
					}).then(res => {
						Message.success('成功！')
					})
				}
			})
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
		height 32px
		font-family 'sans-serif'
		line-height 32px
		color #999
	.el-input__inner
		vertical-align top
</style>