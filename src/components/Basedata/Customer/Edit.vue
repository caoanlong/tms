<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">编辑企业</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="recdeliverycomp" :rules="rules" ref="ruleForm" size="small">
						<el-form-item label="企业LOGO">
							<ImageUpload :files="[recdeliverycomp.logoUrl]" :fixed="true" :fixedNumber="[1,1]" @imgUrlBack="handleLogoSuccess"/>
						</el-form-item>
						<el-form-item label="企业名称" prop="companyName">
							<el-input v-model="recdeliverycomp.companyName" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="收发类型" prop="customerType">
							<el-select v-model="recdeliverycomp.customerType" placeholder="请选择" style="width:100%">
								<el-option value="Shipper" label="发货单位"></el-option>
								<el-option value="Consignee" label="收货单位"></el-option>
								<el-option value="ShipperConsignee" label="收发货单位"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所在区域" prop="companyAreaID">
							<el-cascader 
								style="width:100%" 
								:options="dist" 
								change-on-select 
								v-model="selectedArea" 
								@change="handleSelectedArea">
							</el-cascader>
						</el-form-item>
						<el-form-item label="联系人" prop="contactName">
							<el-input v-model="recdeliverycomp.contactName"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="contactPhone">
							<el-input v-model="recdeliverycomp.contactPhone"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">立即保存</el-button>
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
import dist from '../../../assets/data/dist.json'
import Customer from '../../../api/Customer'
import ImageUpload from '../../CommonComponents/ImageUpload'
import { areaIdToArrayId } from '../../../common/utils'
import { checkTel } from '../../../common/validator'
export default {
	data() {
		return {
			selectedArea: [],
			recdeliverycomp: {
				logoUrl: '',
				companyAreaID: '',
				companyName: '',
				contactName: '',
				contactPhone: '',
				customerType: ''
			},
			rules: {
				companyName: [ {required: true, message: '请输入名称', trigger: 'blur'}, {min: 1, max: 50, message: '长度在 1 到 50 个字符'} ],
				companyAreaID: [ { required: true, message: '请选择区域', trigger: 'change' } ],
				customerType: [ { required: true, message: '请选择类型', trigger: 'change' } ],
				contactName: [ {min: 1, max: 20, message: '长度在 1 到 20 个字符'} ],
				contactPhone: [ { validator: checkTel } ]
			}
		}
	},
	computed: {
		dist: () => dist
	},
	created() {
		this.getInfo()
	},
	methods: {
		handleLogoSuccess(res) {
			this.recdeliverycomp.logoUrl = res.length == 0 ? '' : res[0]
		},
		handleSelectedArea(data) {
			this.recdeliverycomp.companyAreaID = data[data.length - 1]
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				Customer.update(this.recdeliverycomp).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'recdeliverycomp'})
				})
			})
		},
		getInfo() {
			const customerID = this.$route.query.customerID
			Customer.findById({ customerID }).then(res => {
				this.recdeliverycomp = res
				this.selectedArea = areaIdToArrayId(String(res.companyAreaID))
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload
	}
}
</script>
<style lang="stylus" scoped>

</style>