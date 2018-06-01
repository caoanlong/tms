<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">收发货单位详情</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="公司名称">
							<p>{{recdeliverycomp.companyName}}</p>
						</el-form-item>
						<el-form-item label="地址">
							<p v-if="recdeliverycomp.companyArea">{{recdeliverycomp.companyArea}}</p>
							<p v-else-if="recdeliverycomp.companyAreaID">{{recdeliverycomp.companyAreaID | searchAreaByKey}}</p>
						</el-form-item>
						<el-form-item label="详细地址">
							<p>{{recdeliverycomp.detailAddress}}</p>
						</el-form-item>
						<el-form-item label="联系人">
							<p>{{recdeliverycomp.contactName}}</p>
						</el-form-item>
						<el-form-item label="联系方式">
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
import Customer from '../../api/Customer'
export default {
	data() {
		return {
			recdeliverycomp: {}
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		getDetail() {
			let customerID = this.$route.query.customerID
			Customer.findById({ customerID }).then(res => {
				this.recdeliverycomp = res
			})
		},
		back() {
			this.$router.go(-1)
		}
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
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>
