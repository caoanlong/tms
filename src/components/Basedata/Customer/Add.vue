<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加客户</div>
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
                        <el-form-item label="所属片区" class="customerSelect">
                            <el-select placeholder="请选择" v-model="recdeliverycomp.zone">
                                <el-option v-for="(item,index) in CustomerZone" :key="index" :value="item.code" :label="item.code"></el-option>
                            </el-select>
                        </el-form-item>
						<el-form-item label="所在区域" prop="companyAreaID">
							<dist-picker :distList="selectedArea" @hand-select="handleSelectedArea"></dist-picker>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="recdeliverycomp.contactName"></el-input>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="recdeliverycomp.contactPhone"></el-input>
						</el-form-item>
                        <el-form-item label="客户编号" prop="code">
							<el-input v-model="recdeliverycomp.code"></el-input>
						</el-form-item>
                        <el-form-item 
                            label="监控类型" 
                            prop="fencingType" 
                            v-if="recdeliverycomp.customerType.includes('Shipper') || recdeliverycomp.customerType.includes('Consignee')">
                            <el-select v-model="recdeliverycomp.fencingType" placeholder="请选择" @change="selectFencingType">
                                <el-option label="区域监控" value="Area"></el-option>
                                <el-option label="地址监控" value="Point"></el-option>
                                <el-option label="混合监控" value="Mix"></el-option>
                            </el-select>					
						</el-form-item>
				</el-col>
			</el-row>
            <el-row v-if="recdeliverycomp.customerType.includes('Shipper')&& recdeliverycomp.fencingType || recdeliverycomp.customerType.includes('Consignee') && recdeliverycomp.fencingType">
                <el-col class="monitoringBox">
                    <span class="el-icon-plus fr addTitBtn" v-show="monitoringType=='Area'" @click="isAddAreaVisible = true"> 增加</span>
                    <span class="el-icon-plus fr addTitBtn" v-show="monitoringType=='Point'" @click="isAddAddressVisible = true"> 增加</span>
                    <el-tabs v-model="monitoringType" type="card">
                        <el-tab-pane label="监控区域" name="Area" :disabled="recdeliverycomp.fencingType =='Point'">
                            <el-table :data="monitoringAreaList" style="width: 100%;border-radius:0 0 4px 4px;margin-bottom:18px" border size="mini">
                                <el-table-column prop="provice" label="省" align="center"></el-table-column>
                                <el-table-column prop="city" label="市" align="center"></el-table-column>
                                <el-table-column prop="area" label="区" align="center"></el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <span v-if="monitoringAreaList.length>1" @click="del(scope.$index)" class="el-icon-delete deleteBtn"> 删除</span>
                                    </template>
                                </el-table-column>
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
                                    <el-table-column label="操作" align="center">
                                        <template slot-scope="scope">
                                            <span v-if="addressList.length>1" @click="delAddress(scope.$index)" class="el-icon-delete deleteBtn"> 删除</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            
            <el-row>
				<el-col>
                    <el-form-item>
                        <el-button type="primary" @click="add">立即保存</el-button>
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
import BaseDict from '../../../api/BaseDict'
import ImageUpload from '../../CommonComponents/ImageUpload'
import DistPicker from '../../CommonComponents/DistPicker'
import distData from '../../../assets/data/distpicker.data'
import { checkTel } from '../../../common/validator'
import { areaIdToArrayId ,searchAreaByAreaID} from '../../../common/utils'
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
            selectedCity: '',
			recdeliverycomp: {
				logoUrl: '',
				companyAreaID: '',
				companyName: '',
				contactName: '',
				contactPhone: '',
                customerType: [],
                code:'',
                fencingType:'',
                areas:[],
                addressList:[],
                zone:''
            },
            CustomerZone:[],
            monitoringType:'',
			rules: {
				companyName: [ 
                    {required: true, message: '请输入名称', trigger: 'blur'}, 
                    {min: 1, max: 50, message: '长度在 1 到 50 个字符'} 
                ],
				companyAreaID: [ { required: true, message: '请选择区域', trigger: 'change' } ],
				customerType: [ { required: true, message: '请选择类型' } ],
                code: [ { required: true, message: '请输入客户编号' } ],
                fencingType: [ { required: true, message: '请选择监控类型' } ]
            }
		}
	},
	activated() {
        this.getDictList()
		if(!this.$route.query.cache) {
			this.recdeliverycomp = {
				logoUrl: '',
				companyAreaID: '',
				companyName: '',
				contactName: '',
				contactPhone: '',
                customerType: [],
                code:'',
                fencingType:''
			}
            this.selectedArea = []
            this.addressList= []
            this.monitoringAreaList= []
        }
        if(this.$refs['ruleForm']) {
            this.$refs['ruleForm'].resetFields()
        }
    },
	methods: {
        getDictList() {
			BaseDict.getDict({
				groupName:'CustomerZone'
			}).then(res => {
				this.CustomerZone = res.data
			})
        },
        selectFencingType(type){
            if(type=='Mix'){
                this.monitoringType = 'Area'
            }else{
                this.monitoringType = type
            }  
        },
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
            if (data) this.addressList.push(data)
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
        // 删除监控区域临时数据
        del(scopeIndex){
            this.monitoringAreaList.splice(scopeIndex, 1)
        },
        delAddress(scopeIndex){
            this.addressList.splice(scopeIndex, 1)
        },
        add() {
			this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                if(this.recdeliverycomp.fencingType == 'Point'  && this.addressList.length < 1) {
                    Message.error('请添加监控地址')
                    this.monitoringType = 'Point'
                    return
                }
                if(this.recdeliverycomp.fencingType == 'Area'  && this.monitoringAreaList.length < 1) {
                    Message.error('请添加监控区域')
                    this.monitoringType = 'Area'
                    return
                }
                if(this.recdeliverycomp.fencingType == 'Mix'  && (this.monitoringAreaList.length < 1 && this.addressList.length < 1)) {
                    Message.error('请添加监控区域或者监控地址')
                    this.monitoringType = 'Area'
                    return
                }
                const recdeliverycomp = {
                    customer: {
                        logoUrl: this.recdeliverycomp.logoUrl,
                        companyAreaID: this.recdeliverycomp.companyAreaID,
                        companyName: this.recdeliverycomp.companyName,
                        contactName: this.recdeliverycomp.contactName,
                        contactPhone: this.recdeliverycomp.contactPhone,
                        customerType: this.recdeliverycomp.customerType.join(','),
                        zone:this.recdeliverycomp.zone,
                        code: this.recdeliverycomp.code,
                        fencingType: this.recdeliverycomp.fencingType
                    },
                    areas: this.monitoringAreaList,
                    addressList: this.addressList
                }
                if(this.recdeliverycomp.fencingType=='Area'){
                    recdeliverycomp.addressList=''
                }
                if(this.recdeliverycomp.fencingType=='Point'){
                    recdeliverycomp.areas=''
                }
				Company.customerAdd(recdeliverycomp).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'recdeliverycomp'})
				})
			})
        },
		back() {
			this.$router.push({name: 'recdeliverycomp'})
		}
	}
}
</script>
<style lang="stylus" scoped>
.monitoringBox
    position relative
    padding-left 120px
    .addTitBtn
        height 40px
        line-height 40px
        color #409EFF
        cursor pointer
        position absolute
        right 0
        top 0
        font-size 14px
        z-index 10
    .deleteBtn
        color #F56C6C
        height 20px
        line-height 20px
        cursor pointer
        font-size 12px
        display inline-block
</style>