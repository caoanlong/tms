<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">{{isEdit?'修改资料':'查看资料'}}</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="企业名称">
                            <p>{{companyName}}</p>
						</el-form-item>
						<el-form-item label="企业接入码">
							<el-input v-model="interfaceConfig.senderCode" v-if="isEdit"></el-input>
							<p v-else>{{interfaceConfig.senderCode}}</p>
						</el-form-item>
                        <el-form-item label="Appkey">
							<el-input v-model="interfaceConfig.appkey" v-if="isEdit"></el-input>
							<p v-else>{{interfaceConfig.appkey}}</p>
						</el-form-item>
                        <el-form-item label="报文功能代码">
							<el-input v-model="interfaceConfig.messageFunctionCode" v-if="isEdit"></el-input>
							<p v-else>{{interfaceConfig.messageFunctionCode}}</p>
						</el-form-item>
                        <el-form-item label="报文版本号">
							<el-input v-model="interfaceConfig.documentVersionNumber" v-if="isEdit"></el-input>
							<p v-else>{{interfaceConfig.documentVersionNumber}}</p>
						</el-form-item>
                        <el-form-item label="接收方代码">
							<el-input v-model="interfaceConfig.recipientCode"  v-if="isEdit"></el-input>
							<p v-else>{{interfaceConfig.recipientCode}}</p>
						</el-form-item>
						<!-- <el-form-item label="用户">
							<el-select style="width: 100%" placeholder="请选择" v-model="interfaceConfig.userName"  v-if="isEdit">
								<el-option v-for="user in users" :key="user.User_ID" :label="user.Name" :value="user.User_ID"></el-option>
							</el-select>
							<p v-else>{{interfaceConfig.userName}}</p>
						</el-form-item> -->
						<el-form-item v-if="isEdit">
							<el-button type="primary" @click="save">立即保存</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
						<el-form-item v-else>
							<el-button type="primary" @click="edit">修改资料</el-button>
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
			interfaceConfig: {},
			companyName:'',
			isEdit:false
		}
	},
	created() {
		this.getCompanyName()
		this.getInterfaceConfig()
	},
	methods: {
		getCompanyName(){
			this.companyName = localStorage.getItem("companyName")
		},
		getInterfaceConfig() {
			const noTruckUserID = this.$route.query.noTruckUserID
			Notruck.broker.findById({ noTruckUserID }).then(res => {
				this.interfaceConfig = res.list
				console.log(res)
			})
		},
		edit() {
			this.isEdit = true
		},
		save() {
			this.isEdit = false
		},
		back() {
			this.isEdit = false
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