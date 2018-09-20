<template>
    <div>
        <el-dialog 
            width="70%"
            title="线路定价" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
			<el-form label-width="120px" :model="line" :rules="rules" ref="ruleForm" size="small">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="section-block" style="min-height:120px">
                            <span class="block-title">发货信息</span>
                            <el-row class="block-content">
                                <el-form-item label="发货单位" prop="shipperID">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="line.shipperCompanyName"
										:fetch-suggestions="getShipperCompany"
										placeholder="请输入..." 
										@select="handSelectShipperCompany">
										<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelectShipper"></i>
									</el-autocomplete>
								</el-form-item>
                                <el-form-item label="发货地址" prop="shipperName">
									<input v-model="line.shipperName" hidden="true"/>
									<dropdown-select 
										addressType="发货单位"
										:isChangeCompany="isChangeShipper" 
										@select="handSelectshipperAddress" 
										:fetch-suggestions="getShipperAddress">
									</dropdown-select>
								</el-form-item>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="section-block" style="min-height:120px">
                            <span class="block-title">发货信息</span>
                            <el-row class="block-content">
                                <el-form-item label="收货单位" prop="consigneeID">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="line.consigneeCompanyName"
										:fetch-suggestions="getConsigneeCompany"
										placeholder="请输入内容"
										@select="handSelectConsigneeCompany">
										<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelectConsignee"></i>
									</el-autocomplete>
								</el-form-item>
                                <el-form-item label="收货地址" prop="consigneeName">
									<input v-model="line.consigneeName" hidden="true"/>
									<dropdown-select 
										addressType="收货单位"
										:isChangeCompany="isChangeConsignee" 
										@select="handSelectConsigneeAddress" 
										:fetch-suggestions="getConsigneeAddress">
									</dropdown-select>
								</el-form-item>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="section-block" style="min-height:120px">
                            <span class="block-title">对客户应收运价</span>
                            <el-row class="block-content">
                                <el-form-item label="运输距离" prop="recDistance">
                                    <el-input v-model="line.recDistance" placeholder="请输入...">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="吨公里" prop="recWeightPrice">
                                    <el-input v-model="line.recWeightPrice" placeholder="请输入...">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="方公里" prop="recVolumnPrice">
                                    <el-input v-model="line.recVolumnPrice" placeholder="请输入...">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="section-block" style="min-height:120px">
                            <span class="block-title">对司机支付运价</span>
                            <el-row class="block-content">
                                <el-form-item label="运输距离" prop="payDistance">
                                    <el-input v-model="line.payDistance" placeholder="请输入...">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="吨公里" prop="payWeightPrice">
                                    <el-input v-model="line.payWeightPrice" placeholder="请输入...">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="方公里" prop="payVolumnPrice">
                                    <el-input v-model="line.payVolumnPrice" placeholder="请输入...">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="add">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { baseMixin } from '../../../../../common/mixin'
import Customer from '../../../../../api/Customer'
import DropdownSelect from '../../../../CommonComponents/DropdownSelect'
import { checkFloat2 } from '../../../../../common/valid'
export default {
    mixins: [baseMixin],
    components: { DropdownSelect },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        callback: Function
    },
    watch: {
        isVisible(bool) {
            
        }
    },
    data() {
        return {
            line: {
				entruster: '神州贸易有限公司',
                recDistance: '',
                recWeightPrice: '',
                recVolumnPrice: '',
                payDistance: '',
                payWeightPrice: '',
                payVolumnPrice: ''
            },
            isChangeShipper: false,
			isChangeConsignee: false,
            flagShipperCompanyName: '',
            flagConsigneeCompanyName: '',
			rules: {
                shipperID: [ {required: true, message: '请选择发货单位'} ],
                shipperName: [ { required: true, message: '请选择发货地址', trigger: 'change'} ],
                consigneeID: [ {required: true, message: '请选择收货单位'} ],
                consigneeName: [ { required: true, message: '请选择收货地址', trigger: 'change'} ],
				recDistance: [{required: true, message: '请输入对客户应收运价/运输距离'}, {validator: checkFloat2}],
				recWeightPrice: [{required: true, message: '请输入对客户应收运价/吨公里'}, {validator: checkFloat2}],
                recVolumnPrice: [{required: true, message: '请输入对客户应收运价/方公里'}, {validator: checkFloat2}],
				payDistance: [{required: true, message: '请输入对司机支付运价/运输距离'}, {validator: checkFloat2}],
				payWeightPrice: [{required: true, message: '请输入对司机支付运价/吨公里'}, {validator: checkFloat2}],
				payVolumnPrice: [{required: true, message: '请输入对司机支付运价/方公里'}, {validator: checkFloat2}]
			}
        }
    },
    methods: {
        getShipperCompany(queryString, cb) {
			if (queryString != this.flagShipperCompanyName) {
				this.line.shipperID = ''
			}
			Customer.find({
				customerType: 'Shipper',
				keyword: queryString
			}).then(res => {cb(res.records) })
		},
		getConsigneeCompany(queryString, cb) {
			if (queryString != this.flagConsigneeCompanyName) {
				this.line.consigneeID = ''
			}
			Customer.find({
				customerType: 'Consignee',
				keyword: queryString
			}).then(res => { cb(res.records) })
		},
		getShipperAddress(queryString, cb) {
			Customer.addressSuggest({
				customerID: this.line.shipperID,
				keyword: queryString
			}).then(res => {
				cb && cb(res)
			})
		},
		getConsigneeAddress(queryString, cb){
			Customer.addressSuggest({
				customerID: this.line.consigneeID,
				keyword: queryString
			}).then(res => {
				cb && cb(res)
			})
        },
        handSelectShipperCompany(data) {
			this.isChangeShipper = !this.isChangeShipper
			this.selectedShipper = data
			this.line.shipperCompanyName = ' '
			this.line.shipperID = data.customerID
			this.$nextTick(() => {
				this.line.shipperCompanyName = data.companyName
				this.flagShipperCompanyName = data.companyName
				this.getShipperAddress('', false)
			})
		},
		handSelectConsigneeCompany(data) {
			this.isChangeConsignee = !this.isChangeConsignee
			this.selectedConsignee = data
			this.line.consigneeCompanyName = ' '
			this.line.consigneeID = data.customerID
			this.$nextTick(() => {
				this.line.consigneeCompanyName = data.companyName
				this.flagConsigneeCompanyName = data.companyName
				this.getConsigneeAddress('', false)
			})
		},
		handSelectshipperAddress(data) {
			this.line.shipperAreaID = data.areaID
			this.line.shipperAddressID = data.customerAddressID
			this.line.shipperName = data.contactName
			this.line.shipperPhone = data.contactPhone
			this.line.shipperArea = data.contactArea
			this.line.shipperDetailAddress = data.detailAddress
			this.line.shipperLocationAddress = data.locationAddress
			this.line.shipperLocationLng = data.locationLng
			this.line.shipperLocationLat = data.locationLat
			this.$refs['ruleForm'].validateField('shipperName')
		},
		handSelectConsigneeAddress(data) {
			this.line.consigneeAreaID = data.areaID
			this.line.consigneeAddressID = data.customerAddressID
			this.line.consigneeName = data.contactName
			this.line.consigneePhone = data.contactPhone
			this.line.consigneeArea = data.contactArea
			this.line.consigneeDetailAddress = data.detailAddress
			this.line.consigneeLocationAddress = data.locationAddress
			this.line.consigneeLocationLng = data.locationLng
			this.line.consigneeLocationLat = data.locationLat
			this.$refs['ruleForm'].validateField('consigneeName')
        },
        clearSelectShipper(){
			this.line.shipperCompanyName = ' '
			this.line.shipperID = ''
		},
		clearSelectConsignee(){
			this.line.consigneeCompanyName = ' '
			this.line.consigneeID =''
		},
		add() {
			this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                this.callback('gg')
			})
        },
        close() {
            this.$refs['ruleForm'].resetFields()
            this.callback('gg')
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
