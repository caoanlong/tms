<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">添加托运人</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="shipper" :rules="rules" ref="ruleForm">
						<el-form-item label="公司名称" prop="companyName">
							<el-input v-model="shipper.companyName" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="地址" prop="companyAreaID">
							<DistPicker @selectChange="handleSelectedArea"/>
						</el-form-item>
						<el-form-item label="详细地址" prop="detailAddress">
							<el-input v-model="shipper.detailAddress" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="shipper.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input v-model="shipper.contactPhone"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="add">立即保存</el-button>
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
	import DistPicker from '../CommonComponents/DistPicker'
	export default {
		data() {
			return {
				shipper: {
					companyAreaID: '',
					companyName: '',
					contactName: '',
					contactPhone: '',
					detailAddress: ''
				},
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
		methods: {
			handleSelectedArea(data) {
				this.shipper.companyAreaID = data
			},
			add() {
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						let data = {
							companyAreaID: this.shipper.companyAreaID,
							companyName: this.shipper.companyName,
							contactName: this.shipper.contactName,
							contactPhone: this.shipper.contactPhone,
							detailAddress: this.shipper.detailAddress,
							type: 'Consignor',
						}
						request({
							url: '/customer/add',
							method:'post',
							data
						}).then(res => {
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
		},
		components: {
			DistPicker
		}
	}
</script>
<style lang="stylus" scoped>

</style>