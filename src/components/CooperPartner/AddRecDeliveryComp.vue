<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">添加收发货单位</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="recdeliverycomp" :rules="rules" ref="ruleForm">
						<el-form-item label="公司名称" prop="companyName">
							<el-input v-model="recdeliverycomp.companyName"></el-input>
						</el-form-item>
						<el-form-item label="地址" prop="companyAreaID">
							<DistPicker @selectChange="handleSelectedArea"/>
						</el-form-item>
						<el-form-item label="详细地址" prop="detailAddress">
							<el-input v-model="recdeliverycomp.detailAddress"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="recdeliverycomp.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系方式">
							<el-input v-model="recdeliverycomp.contactPhone"></el-input>
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
				recdeliverycomp: {
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
		methods: {
			handleSelectedArea(data) {
				this.recdeliverycomp.companyAreaID = data
			},
			add() {
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						let data = {
							companyAreaID: this.recdeliverycomp.companyAreaID,
							companyName: this.recdeliverycomp.companyName,
							contactName: this.recdeliverycomp.contactName,
							contactPhone: this.recdeliverycomp.contactPhone,
							detailAddress: this.recdeliverycomp.detailAddress,
							type: 'ShipperConsignee',
						}
						request({
							url: '/customer/add',
							method:'post',
							data
						}).then(res => {
							Message.success('保存成功！')
							this.$router.push({name: 'recdeliverycomp'})
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