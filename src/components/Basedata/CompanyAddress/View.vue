<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">查看客户地址</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" size="small">
						<el-form-item label="所属客户">
                            <p>{{companyAddress.companyName}}</p>
						</el-form-item>
						<el-form-item label="所属片区">
                            <p>{{companyAddress.companyName}}</p>
						</el-form-item>
						<el-form-item label="终端用户名称">
                            <p>{{companyAddress.companyName}}</p>
						</el-form-item>
						<el-form-item label="联系人">
                            <p>{{companyAddress.contactName}}</p>
						</el-form-item>
                        <el-form-item label="电话">
                            <p>{{companyAddress.contactPhone}}</p>
						</el-form-item>
                        <el-form-item label="地址编号">
                            <p>{{companyAddress.code}}</p>
						</el-form-item>
						<el-form-item label="所在区域">
                            <p>{{companyAddress.contactArea}}</p>
						</el-form-item>
						<el-form-item label="定位地址">
                            <p>{{companyAddress.locationAddress}}</p>
                        </el-form-item>
						<el-form-item label="门牌信息">
                            <p>{{companyAddress.detailAddress}}</p>
						</el-form-item>
                        <el-form-item label="围栏范围">
                            <p>{{companyAddress.monitorScope?companyAddress.monitorScope:0}}米</p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
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
export default {
	data() {
		return {
            selectedArea: [],
            searchAreaHash: '',
			companyAddress: {
				customerID: '',
				areaID: '',
                contactName: '',
				contactPhone: '',
				detailAddress: '',
				companyName: '',
				locationLng: '',
				locationLat: '',
                locationAddress: ''
			}
		}
    },
	created() {
		this.getInfo()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.getInfo()
		}
	},
	methods: {
		getInfo() {
			const customerAddressID = this.$route.query.customerAddressID
			Company.customerAddressFindById({ customerAddressID }).then(res => {
				this.companyAddress = res
			})
		},
		back() {
			this.$router.push({name: 'companyaddress'})
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
		min-height 32px
		font-family 'sans-serif'
		line-height 32px
		color #999
	.el-input__inner
		vertical-align top
</style>