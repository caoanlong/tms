<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">查看企业</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" size="mini">
						<el-form-item label="企业LOGO">
							<ImageUpload :files="[recdeliverycomp.logoUrl]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="企业名称" prop="companyName">
							<p>{{recdeliverycomp.companyName}}</p>
						</el-form-item>
						<el-form-item label="收发类型" prop="customerType">
							<p>{{recdeliverycomp.customerType == 'Shipper' ? '发货单位' : '收货单位'}}</p>
						</el-form-item>
						<el-form-item label="所在区域" prop="companyAreaID">
							<p>{{recdeliverycomp.companyArea}}</p>
						</el-form-item>
						<el-form-item label="联系人">
							<p>{{recdeliverycomp.contactName}}</p>
						</el-form-item>
						<el-form-item label="手机号" prop="contactPhone">
							<p>{{recdeliverycomp.contactPhone}}</p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import dist from '../../assets/data/dist.json'
import Customer from '../../api/Customer'
import ImageUpload from '../CommonComponents/ImageUpload'
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
		getInfo() {
			const customerID = this.$route.query.customerID
			Customer.findById({ customerID }).then(res => {
				this.recdeliverycomp = res
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
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>