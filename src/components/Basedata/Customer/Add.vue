<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加客户</div>
			<el-row style="padding-bottom: 200px">
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="recdeliverycomp" :rules="rules" ref="ruleForm" size="small">
						<el-form-item label="客户LOGO">
							<div style="display:flex">
								<div style="flex:0 0 110px">
									<ImageUpload :files="[recdeliverycomp.logoUrl]" :fixed="true" :fixedNumber="[1,1]" @imgUrlBack="handleLogoSuccess"/>
								</div>
								<div style="flex:1;color:#999">
									<p>LOGO用途：用于展示客户形象</p>
									<p>位置：客户软件头部</p>
									<p>大小：100px*100px</p>
								</div>
							</div>
						</el-form-item>
						<el-form-item label="客户名称" prop="companyName">
							<el-input v-model="recdeliverycomp.companyName" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="客户类型" prop="customerType">
							<el-checkbox-group v-model="recdeliverycomp.customerType">
								<el-checkbox label="Shipper">发货方</el-checkbox>
								<el-checkbox label="Consignee">收货方</el-checkbox>
								<el-checkbox label="Delegate">委托方</el-checkbox>
							</el-checkbox-group>							
						</el-form-item>
						<el-form-item label="所在区域" prop="companyAreaID">
							<dist-picker :distList="selectedArea" @hand-select="handleSelectedArea"></dist-picker>
						</el-form-item>
						<el-form-item label="联系人" prop="contactName">
							<el-input v-model="recdeliverycomp.contactName"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="contactPhone">
							<el-input v-model="recdeliverycomp.contactPhone"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="add">立即保存</el-button>
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
import Company from '../../../api/Company'
import ImageUpload from '../../CommonComponents/ImageUpload'
import DistPicker from '../../CommonComponents/DistPicker'
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
				customerType: []
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
	components: { ImageUpload, DistPicker },
	methods: {
		handleLogoSuccess(res) {
			this.recdeliverycomp.logoUrl = res.length == 0 ? '' : res[0]
		},
		handleSelectedArea(data) {
			if (data) {
				this.recdeliverycomp.companyAreaID = data[data.length - 1]
				this.selectedArea = data
			} else {
				this.recdeliverycomp.companyAreaID = ''
				this.selectedArea = []
			}
		},
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				
				this.recdeliverycomp.customerType = this.recdeliverycomp.customerType.join(',')
				Company.customer().add(this.recdeliverycomp).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'recdeliverycomp'})
				})
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