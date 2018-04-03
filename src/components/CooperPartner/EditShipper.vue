<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">编辑托运人</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="公司名称">
							<el-input v-model="shipper.companyName"></el-input>
						</el-form-item>
						<el-form-item label="地址">
							<el-input v-model="shipper.companyArea"></el-input>
						</el-form-item>
						<el-form-item label="详细地址">
							<el-input v-model="shipper.detailAddress"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="shipper.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系方式">
							<el-input v-model="shipper.contactPhone"></el-input>
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
				shipper: []
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
					this.shipper =res.data.data
				})
			},
			edit() {
				let data = {
					companyArea: this.shipper.companyArea,
					companyName: this.shipper.companyName,
					contactName: this.shipper.contactName,
					contactPhone: this.shipper.contactPhone,
					detailAddress: this.shipper.detailAddress,
					customerID:this.$route.query.customerID
				}
				request({
					url: '/customer/update',
					method:'post',
					data
				}).then(res => {
					console.log(res.data)
					Message.success('保存成功！')
					this.$router.push({name: 'shipper'})
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