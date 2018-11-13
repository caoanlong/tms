<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">查看客户</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px"  size="small">
						<el-form-item label="客户LOGO">
							<ImageUpload :files="[recdeliverycomp.logoUrl]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="客户名称" prop="companyName">
							<p>{{recdeliverycomp.companyName}}</p>
						</el-form-item>
						<el-form-item label="客户类型" prop="customerType">
							<p>{{recdeliverycomp.customerType.split(',').map((item) => CUSTOMERTYPE[item]).join(' , ')}}</p>
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
                        <el-form-item label="客户编号" prop="code">
							<p>{{recdeliverycomp.code}}</p>
						</el-form-item>
                        <el-form-item label="监控类型">
							<p>{{recdeliverycomp.fencingType=='Point'?'地址监控':'区域监控'}}</p>
						</el-form-item>
                        <div class="areaTable">
                            <div class="tit">价格监控区域</div>
                            <el-table :data="tableData" style="width: 100%;border-radius:0 0 4px 4px;margin-bottom:18px" border size="mini">
                                <el-table-column prop="date" label="省" align="center"></el-table-column>
                                <el-table-column prop="name" label="市" align="center"></el-table-column>
                                <el-table-column prop="address" label="区" align="center"></el-table-column>
                            </el-table>
                        </div>
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
import dist from '../../../assets/data/dist.json'
import Company from '../../../api/Company'
import ImageUpload from '../../CommonComponents/ImageUpload'
export default {
	data() {
		return {
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
	activated() {
		if(!this.$route.query.cache) {
			this.getInfo()
		}
	},
	methods: {
		getInfo() {
			const customerID = this.$route.query.customerID
			Company.customerFindById({ customerID }).then(res => {
				this.recdeliverycomp = res
			})
		},
		back() {
			this.$router.push({name: 'recdeliverycomp'})
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
            border-bottom 1px solid #dcdfe6
            padding 0 15px
            min-height 32px
            font-family 'sans-serif'
            line-height 32px
            color #999
        .el-input__inner
            vertical-align top
    .areaTable
        position relative
        padding-left 120px
        .tit
            font-size 14px
            position absolute
            top 0
            left 22px
            color #606266
</style>