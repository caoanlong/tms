<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">编辑收发货单位</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="公司名称">
							<el-input v-model="recdeliverycomp.companyName"></el-input>
						</el-form-item>
						<el-form-item label="地址">
							<el-input v-model="recdeliverycomp.companyArea"></el-input>
						</el-form-item>
						<el-form-item label="详细地址">
							<el-input v-model="recdeliverycomp.detailAddress"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="recdeliverycomp.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系方式">
							<el-input v-model="recdeliverycomp.contactPhone"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="edit">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request from '../../common/request'
	export default {
		data() {
			return {
				recdeliverycomp:[]
			}
		},
		created() {
			this.getDetail()
		},
		methods: {
			getDetail() {
				let params = {
					customerID:this.$route.query.customerID
				}
				request({
					url: '/customer/findById',
					params
				}).then(res => {
					console.log(res.data.data)
					this.recdeliverycomp =res.data.data
				})
			},
			edit() {
				let data = {
					companyArea: this.recdeliverycomp.companyArea,
					companyName: this.recdeliverycomp.companyName,
					contactName: this.recdeliverycomp.contactName,
					contactPhone: this.recdeliverycomp.contactPhone,
					detailAddress: this.recdeliverycomp.detailAddress,
					customerID:this.$route.query.customerID
				}
				request({
					url: '/customer/update',
					method:'post',
					data
				}).then(res => {
					console.log(res.data)
					Message.success('保存成功！')
					this.$router.push({name: 'recdeliverycomp'})
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
</style>