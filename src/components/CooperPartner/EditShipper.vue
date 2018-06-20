<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">编辑托运人</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="shipper" :rules="rules" ref="ruleForm" size="mini">
						<el-form-item label="公司名称" prop="companyName">
							<el-input v-model="shipper.companyName"></el-input>
						</el-form-item>
						<el-form-item label="地区" prop="companyAreaID">
							<DistPicker :selected="selectedArea" @selectChange="handleSelectedArea"/>
						</el-form-item>
						<el-form-item label="详细地址" prop="detailAddress">
							<el-input v-model="shipper.detailAddress"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="shipper.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系电话" prop="contactPhone">
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
import Customer from '../../api/Customer'
import { areaIdToArrayId } from '../../common/utils'
import DistPicker from '../CommonComponents/DistPicker'
import { checkTel } from '../../common/validator'
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
				],
				contactPhone: [
					{validator: checkTel}
				]
			}
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		handleSelectedArea(data) {
			this.shipper.companyAreaID = data
		},
		getDetail() {
			let customerID = this.$route.query.customerID
			Customer.findById({ customerID }).then(res => {
				this.shipper = res
				this.selectedArea = areaIdToArrayId(String(res.companyAreaID))
			})
		},
		edit() {
			let customerID = this.$route.query.customerID
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					Customer.update({
						customerID,
						companyAreaID: this.shipper.companyAreaID,
						companyName: this.shipper.companyName,
						contactName: this.shipper.contactName,
						contactPhone: this.shipper.contactPhone,
						detailAddress: this.shipper.detailAddress
					}).then(res => {
						Message.success('保存成功！')
						this.$router.push({name: 'shipper'})
					})
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