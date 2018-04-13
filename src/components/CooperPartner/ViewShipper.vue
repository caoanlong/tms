<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">托运人详情</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="公司名称">
							<p>{{shipper.companyName}}</p>
						</el-form-item>
						<el-form-item label="地区">
							<p v-if="shipper.companyArea">{{shipper.companyArea}}</p>
							<p v-else-if="shipper.companyAreaID">{{shipper.companyAreaID | searchAreaByKey}}</p>
						</el-form-item>
						<el-form-item label="详细地址">
							<p>{{shipper.detailAddress}}</p>
						</el-form-item>
						<el-form-item label="联系人">
							<p>{{shipper.contactName}}</p>
						</el-form-item>
						<el-form-item label="联系方式">
							<p>{{shipper.contactPhone}}</p>
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
	import request from '../../common/request'
	export default {
		data() {
			return {
				shipper: {}
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
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>