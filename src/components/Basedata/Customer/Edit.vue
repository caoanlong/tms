客户<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">编辑客户</div>
            <el-form label-width="120px" :model="recdeliverycomp" :rules="rules" ref="ruleForm" size="small">
                <el-row>
                    <el-col>
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
                        <el-form-item label="客户编号" prop="code">
							<el-input v-model="recdeliverycomp.code"></el-input>
						</el-form-item>
                        <el-form-item 
                            label="监控类型" 
                            prop="fencingType" 
                            v-if="recdeliverycomp.customerType.includes('Shipper') || recdeliverycomp.customerType.includes('Consignee')">
                            <el-select v-model="recdeliverycomp.fencingType" placeholder="请选择">
                                <el-option label="区域监控" value="Area"></el-option>
                                <el-option label="地址监控" value="Point"></el-option>
                            </el-select>					
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row 
                    v-if="recdeliverycomp.fencingType == 'Area'" 
                    v-show="recdeliverycomp.customerType.includes('Shipper') || recdeliverycomp.customerType.includes('Consignee')">
                    <el-col style="padding-left:120px">
                        <div class="addTit">区域监控<span class="el-icon-plus fr addTitBtn" @click="isAddAreaVisible = true"> 增加</span></div>
                        <el-table :data="monitoringAreaList" style="width: 100%;border-radius:0 0 4px 4px;margin-bottom:18px" border size="mini">
                                <el-table-column prop="provice" label="省" align="center"></el-table-column>
                                <el-table-column prop="city" label="市" align="center"></el-table-column>
                                <el-table-column prop="area" label="区" align="center"></el-table-column>
                                <el-table-column label="控制" align="center">
                                    <template slot-scope="scope">
                                        <span v-if="monitoringAreaList.length>1" @click="del(scope.$index)" class="el-icon-delete deleteBtn"> 删除</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                    </el-col>
                </el-row>
                <el-row 
                    v-if="recdeliverycomp.fencingType == 'Point'" 
                    v-show="recdeliverycomp.customerType.includes('Shipper') || recdeliverycomp.customerType.includes('Consignee')">
                    <el-col style="padding-left:120px">
                        <div class="addTit">地址监控<span class="el-icon-plus fr addTitBtn" @click="isAddAddressVisible = true"> 增加</span></div>
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
                                <el-table-column label="控制" align="center">
                                    <template slot-scope="scope">
                                        <span v-if="addressList.length>1" @click="delAddress(scope.row.customerAddressID)" class="el-icon-delete deleteBtn"> 删除</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item>
							<el-button type="primary" @click="save">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
		</el-card>
        <add-area :isVisible="isAddAreaVisible" :callback="handleSelectMonitoringArea"></add-area>
        <add-address :isVisible="isAddAddressVisible" :callback="handSelectMonitoringAddress"></add-address>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Company from '../../../api/Company'
import ImageUpload from '../../CommonComponents/ImageUpload'
import distData from '../../../assets/data/distpicker.data'
import DistPicker from '../../CommonComponents/DistPicker'
import { areaIdToArrayId, searchAreaByAreaID, deleteConfirm} from '../../../common/utils'
import { checkTel } from '../../../common/validator'
import AddAddress from './components/AddAddress'
import AddArea from './components/AddArea'
export default {
    components: { ImageUpload, DistPicker, AddArea, AddAddress },
	data() {
		return {
            isAddAreaVisible: false,
            isAddAddressVisible: false,
            monitoringAreaList: [],
            addressList: [],
			selectedArea: [],
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
			rules: {
                logoUrl:[ {required: true, message: '请上传客户LOGO'} ],
				companyName: [ 
                    {required: true, message: '请输入名称', trigger: 'blur'}, 
                    {min: 1, max: 50, message: '长度在 1 到 50 个字符'}
                ],
				companyAreaID: [ { required: true, message: '请选择区域', trigger: 'change' } ],
				customerType: [ { required: true, message: '请选择类型', trigger: 'change' } ],
				contactName: [ 
                    { required: true, message: '请输入联系人' }, 
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符' } 
                ],
                contactPhone: [
                    { required: true, message: '请输入手机号' },
                    { validator: checkTel }
                ],
                code: [ { required: true, message: '请输入客户编号' } ],
                fencingType: [ { required: true, message: '请选择监控类型' } ]
            }
		}
	},
	created() {
        this.getInfo()
        this.getAddressList()
	},
	activated() {
		if(!this.$route.query.cache) {
            this.getInfo()
            this.getAddressList()
		}
	},
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
        handSelectMonitoringAddress(data) {
            this.isAddAddressVisible = false
            if (data) {
                this.addressList.push(data)
                this.addMonitoringAddress(data)
            }
        },
        handleSelectMonitoringArea(data) {
            this.isAddAreaVisible = false
            if (!data) return
            this.monitoringAreaList.push({
                provice: searchAreaByAreaID(data[0]),
                city: searchAreaByAreaID(data[1]),
                area: searchAreaByAreaID(data[2]),
                areaID: data[2] || data[1] || data[0]
            })
        },
        // 添加监控地址
        addMonitoringAddress(data) {
            const item = Object.assign(data, {
                customerID: this.$route.query.customerID,
                companyName: this.recdeliverycomp.companyName
            })
            Company.customerAddressAdd(item).then(res => {
                Message.success('保存成功！')
                this.addAddressDialog = false
                this.getAddressList()
            })
        },
        del(scopeIndex){
            this.monitoringAreaList.splice(scopeIndex, 1)
        },
        delAddress(customerAddressID) {
			deleteConfirm(customerAddressID, customerAddressIDs => {
				Company.customerAddressDeleteBatch({ customerAddressIDs }).then(res => {
					Message.success('删除成功!')
					this.getAddressList()
				})
			})
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                if(this.recdeliverycomp.fencingType=='Point' && this.addressList.length<1){
                    Message.error('请添加监控地址')
                    return
                }
                if(this.recdeliverycomp.fencingType=='Area' && this.monitoringAreaList.length<1){
                    Message.error('请添加监控区域')
                    return
                }
				const recdeliverycomp = {
                    customer:{
                        logoUrl: this.recdeliverycomp.logoUrl,
                        companyAreaID: this.recdeliverycomp.companyAreaID,
                        companyName: this.recdeliverycomp.companyName,
                        contactName: this.recdeliverycomp.contactName,
                        contactPhone: this.recdeliverycomp.contactPhone,
                        customerType: this.recdeliverycomp.customerType.join(','),
                        code: this.recdeliverycomp.code,
                        fencingType: this.recdeliverycomp.fencingType,
                        customerID: this.$route.query.customerID
                    },
                    areas: this.monitoringAreaList,
                    addressList: this.addressList
                }
				Company.customerUpdate(recdeliverycomp).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'recdeliverycomp'})
				})
			})
		},
		getInfo() {
			const customerID = this.$route.query.customerID
			Company.customerFindById({ customerID }).then(res => {
				this.recdeliverycomp = res.customer
                this.recdeliverycomp.customerType = res.customer.customerType.split(',')
                this.recdeliverycomp.areas = this.monitoringAreaList = res.areas
                this.monitoringAreaList.forEach(function(item) {
                    item.provice = searchAreaByAreaID(String(item.areaID).substr(0, 2) + '0000')
                    item.city = searchAreaByAreaID(String(item.areaID).substr(0, 4) + '00')
                    item.area = searchAreaByAreaID(String(item.areaID))
                })
				this.selectedArea = areaIdToArrayId(String(res.customer.companyAreaID))
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
	}
}
</script>
<style lang="stylus" scoped>
.addTit
    height 33px
    line-height 33px
    font-size 14px
    color #999
    padding 0 15px
    border 1px solid #ebeef5
    border-bottom none
    border-radius 4px 4px 0 0
    .addTitBtn
        height 32px
        line-height 32px
        color #409EFF
        cursor pointer
.deleteBtn
    color #F56C6C
    height 20px
    line-height 20px
    cursor pointer
    font-size 12px
    display inline-block
</style>