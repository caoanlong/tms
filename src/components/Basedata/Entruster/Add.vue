<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加委托方</div>
			<el-row style="padding-bottom: 200px">
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="entruster" :rules="rules" ref="ruleForm" size="small">
						<el-form-item label="委托方" prop="name">
							<el-input v-model="entruster.name" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="地区" prop="areaID">
							<dist-picker :distList="selectedArea" @hand-select="handleSelectedArea"></dist-picker>
						</el-form-item>
						<el-form-item label="联系人" prop="contactName">
							<el-input v-model="entruster.contactName"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="contactPhone">
							<el-input v-model="entruster.contactPhone"></el-input>
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
import Customer from '../../../api/Customer'
import ImageUpload from '../../CommonComponents/ImageUpload'
import DistPicker from '../../CommonComponents/DistPicker'
import { checkTel } from '../../../common/validator'
export default {
	data() {
		return {
			selectedArea: [],
			entruster: {
				areaID: '',
				name: '',
				contactName: '',
				contactPhone: ''
			},
			rules: {
				name: [ {required: true, message: '请输入名称', trigger: 'blur'}, {min: 1, max: 50, message: '长度在 1 到 50 个字符'} ],
				areaID: [ { required: true, message: '请选择区域', trigger: 'change' } ],
				contactName: [ { required: true, min: 1, max: 20, message: '长度在 1 到 20 个字符'} ],
				contactPhone: [ { required: true, validator: checkTel } ]
			}
		}
	},
	components: { DistPicker },
	methods: {
		handleSelectedArea(data) {
            this.entruster.areaID = data ? data[data.length - 1] : ''
            this.selectedArea = data ? data : []
		},
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				Customer.add(this.entruster).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'entruster'})
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