<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">查看客户</div>
			<el-row>
				<el-col>
					<el-form label-width="120px"  size="small">
						<el-form-item label="客户LOGO">
							<ImageUpload :files="[recdeliverycomp.logoUrl]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="客户名称">
							<p>{{recdeliverycomp.companyName}}</p>
						</el-form-item>
						<el-form-item label="客户类型">
							<p>{{recdeliverycomp.customerType.map((item) => CUSTOMERTYPE[item]).join(' , ')}}</p>
						</el-form-item>
                        <el-form-item label="所属片区">
							<p>{{recdeliverycomp.zone}}</p>
						</el-form-item>
						<el-form-item label="所在区域">
							<p>{{recdeliverycomp.companyArea}}</p>
						</el-form-item>
						<el-form-item label="联系人">
							<p>{{recdeliverycomp.contactName}}</p>
						</el-form-item>
						<el-form-item label="手机号">
							<p>{{recdeliverycomp.contactPhone}}</p>
						</el-form-item>
                        <el-form-item label="客户编号">
							<p>{{recdeliverycomp.code}}</p>
						</el-form-item>
                        <el-form-item label="监控类型">
							<p>
                                <span v-if="recdeliverycomp.fencingType == 'Point'">地址监控</span>
                                <span v-else-if="recdeliverycomp.fencingType == 'Area'">区域监控</span>
                                <span v-else>混合监控</span>
                                
                            </p>
						</el-form-item>
                        <div class="monitoringBox">
                            <el-tabs v-model="monitoringType" type="card"  class="areaTable table">
                                <el-tab-pane label="监控区域" name="Area" :disabled="recdeliverycomp.fencingType =='Point'">
                                    <el-table :data="monitoringAreaList" style="width: 100%;border-radius:0 0 4px 4px;margin-bottom:18px" border size="mini">
                                        <el-table-column prop="provice" label="省" align="center"></el-table-column>
                                        <el-table-column prop="city" label="市" align="center"></el-table-column>
                                        <el-table-column prop="area" label="区" align="center"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="监控地址" name="Point" :disabled="recdeliverycomp.fencingType =='Area'">
                                    <div class="table">
                                        <el-table :data="addressList" style="border-radius:0 0 4px 4px;margin-bottom:18px" border size="mini">
                                            <el-table-column prop="code" label="地址编号" align="center"></el-table-column>
                                            <el-table-column prop="contactName" label="联系人" align="center"></el-table-column>
                                            <el-table-column prop="contactPhone" label="联系电话" align="center" width="120"></el-table-column>
                                            <el-table-column prop="areaID" label="区域" align="center">
                                                <template slot-scope="scope">
                                                    {{scope.row.areaID | searchAreaByKey}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="detailAddress" label="地址" align="center">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.locationAddress?scope.row.locationAddress:''}}{{scope.row.detailAddress?scope.row.detailAddress:''}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="monitorScope" label="围栏范围" align="center">
                                                <template slot-scope="scope">
                                                    {{scope.row.monitorScope?scope.row.monitorScope+'米':''}}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
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
import { searchAreaByAreaID,searchAreaByKey} from '../../../common/utils'
export default {
	data() {
		return {
            monitoringAreaList:[],
            addressList:[],
			recdeliverycomp: {
				logoUrl: '',
				companyAreaID: '',
				companyName: '',
				contactName: '',
				contactPhone: '',
                customerType: [],
                code:'',
                fencingType:'',
                areas:[{
                    provice:'',
                    city:'',
                    area:'',
                }]
            },
            monitoringType:''
		}
	},
	computed: {
		dist: () => dist
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
                this.recdeliverycomp = res.customer
                this.monitoringAreaList = res.areas
                this.recdeliverycomp.customerType = res.customer.customerType.split(',')
                this.monitoringAreaList.forEach(function(item) {
                    item.provice = searchAreaByAreaID(String(item.areaID).substr(0, 2) + '0000')
                    item.city = searchAreaByAreaID(String(item.areaID).substr(0, 4) + '00')
                    item.area = searchAreaByAreaID(String(item.areaID))
                })
                this.getAddressList()
                if(res.customer.fencingType=='Mix'){
                    this.monitoringType = 'Area'
                }else{
                    this.monitoringType = res.customer.fencingType
                }
			})
        },
        getAddressList() {
			Company.customerAddressFind({
				customerID:this.$route.query.customerID
			}).then(res => {
				this.addressList = res.records
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