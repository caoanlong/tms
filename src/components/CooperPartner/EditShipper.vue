<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">编辑托运人</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="shipper" :rules="rules" ref="ruleForm">
						<el-form-item label="公司名称" prop="companyName">
							<el-input v-model="shipper.companyName"></el-input>
						</el-form-item>
						<el-form-item label="地址" prop="companyAreaID">
							<el-cascader 
								style="width: 100%" 
								:options="distData" 
								v-model="selectedArea"
								@change="handleSelectedArea">
							</el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" prop="detailAddress">
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
	import { regionData } from 'element-china-area-data'
	import { Message } from 'element-ui'
	import request from '../../common/request'
	export default {
		data() {
			return {
				distData: regionData,
				shipper: {
					companyAreaID: '',
					companyName: '',
					contactName: '',
					contactPhone: '',
					detailAddress: ''
				},
				selectedArea: [],
				rules: {
					companyName: [
						{required: true, message: '请输入名称', trigger: 'blur'}
					],
					companyAreaID: [
						{ required: true, message: '请选择区域', trigger: 'change' }
					],
					detailAddress: [
						{required: true, message: '请输入详细地址', trigger: 'blur'}
					]
				}
			}
		},
		created() {
			this.getDetail()
		},
		methods: {
			handleSelectedArea(data) {
				this.shipper.companyAreaID = data[data.length-1]
			},
			getDetail() {
				let params = {
					customerID:this.$route.query.customerID
				}
				request({
					url: '/customer/findById',
					params
				}).then(res => {
					this.shipper = res.data.data
					let areaID = String(res.data.data.companyAreaID)
					this.selectedArea = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
				})
			},
			edit() {
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						let data = {
							companyAreaID: this.shipper.companyAreaID,
							companyName: this.shipper.companyName,
							contactName: this.shipper.contactName,
							contactPhone: this.shipper.contactPhone,
							detailAddress: this.shipper.detailAddress,
							customerID: this.$route.query.customerID
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
					} else {
						return
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

</style>