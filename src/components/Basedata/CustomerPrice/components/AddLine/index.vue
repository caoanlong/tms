<template>
    <div>
        <el-dialog 
            width="70%"
            title="添加线路" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
			<el-form label-width="120px" :model="line" :rules="rules" ref="ruleForm" size="small">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="section-block" style="min-height:120px">
                            <span class="block-title">发货信息</span>
                            <el-row class="block-content">
                                <el-form-item label="发货单位" prop="shipperCustomerID">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="line.shipperName"
										:fetch-suggestions="getShipperCompany"
										placeholder="请输入..." 
										@select="handSelectShipperCompany">
										<i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectShipper"></i>
									</el-autocomplete>
								</el-form-item>
                                <el-form-item label="发货地址" prop="shipperCustomerAddressID">
									<input v-model="line.shipperCustomerAddressID" hidden="true"/>
									<dropdown-select 
										addressType="发货单位" 
										:isChangeCompany="isChangeShipper" 
										:isClearDropDown="isClearDropDown" 
										@select="handSelectShipperAddress" 
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
                                <el-form-item label="收货单位" prop="consigneeCustomerID">
									<el-autocomplete  style="width:100%"
										value-key="companyName" 
										v-model="line.consigneeName"
										:fetch-suggestions="getConsigneeCompany"
										placeholder="请输入内容"
										@select="handSelectConsigneeCompany">
										<i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectConsignee"></i>
									</el-autocomplete>
								</el-form-item>
                                <el-form-item label="收货地址" prop="consigneeCustomerAddressID">
									<input v-model="line.consigneeCustomerAddressID" hidden="true"/>
									<dropdown-select 
										addressType="收货单位" 
										:isChangeCompany="isChangeConsignee" 
										:isClearDropDown="isClearDropDown" 
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
                                <el-form-item label="运输距离" prop="receivableDistance">
                                    <el-input v-model="line.receivableDistance" placeholder="请输入...">
                                        <template slot="append">公里</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="吨公里" prop="receivableWeightUnitPrice">
                                    <el-input v-model="line.receivableWeightUnitPrice" placeholder="请输入...">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="方公里" prop="receivableVolumnUnitPrice">
                                    <el-input v-model="line.receivableVolumnUnitPrice" placeholder="请输入...">
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
                                <el-form-item label="运输距离" prop="payableDistance">
                                    <el-input v-model="line.payableDistance" placeholder="请输入...">
                                        <template slot="append">公里</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="吨公里" prop="payableWeightUnitPrice">
                                    <el-input v-model="line.payableWeightUnitPrice" placeholder="请输入...">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="方公里" prop="payableVolumnUnitPrice">
                                    <el-input v-model="line.payableVolumnUnitPrice" placeholder="请输入...">
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
import Company from '../../../../../api/Company'
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
		callback: Function,
		customerID: String
	},
	watch: {
		isVisible(bool) {
			if (!bool) {
				for (let attr in this.line) {
					this.line[attr] = ''
				}
				this.selectedShipperAddress = null
				this.selectedConsigneeAddress = null
				this.$refs['ruleForm'].resetFields()
			} else {
				this.isClearDropDown = !this.isClearDropDown
			}
		}
	},
    data() {
		const validateRangeOfPrice = (rule, value, callback) => {
			if (value && (value<0 || value>9999.99) ){
				callback(new Error('请输入0~9999.99'))
			} else {
				callback()
			}
		}
        return {
			isClearDropDown: false,
			isChangeShipper: false,
			isChangeConsignee: false,
			flagShipperName: '',
			flagConsigneeName: '',
			selectedShipperAddress: null,
			selectedConsigneeAddress: null,
            line: {
				routePriceID: '',   /**线路价格ID*/
				customerID: '',   /**委托客户ID*/
				shipperCustomerID: '',   /**发货客户ID*/
				shipperName: '',   /**发货客户*/
				shipperCustomerAddressID: '',   /**发货客户地址ID*/
				shipperAddress: '',   /**发货客户地址*/
				consigneeCustomerID: '',   /**收货客户ID*/
				consigneeName: '',   /**收货客户*/
				consigneeCustomerAddressID: '',   /**收货客户地址ID*/
				consigneeAddress: '',   /**收货客户地址*/
				receivableDistance: '',   /**应收运输距离（单位：米）*/
				payableDistance: '',   /**应付运输距离（单位：米）*/
				receivableWeightUnitPrice: '',   /**应收吨单价（单位：元）*/
				receivableVolumnUnitPrice: '',   /**应收方单价（单位：元）*/
				payableWeightUnitPrice: '',   /**应付吨单价（单位：元）*/
				payableVolumnUnitPrice: ''   /**应付方单价（单位：元）*/
            },
			rules: {
                shipperCustomerID: [ 
					{required: true, message: '请选择发货单位'}
				],
                shipperCustomerAddressID: [ 
					{ required: true, message: '请选择发货地址', trigger: 'change'}
				],
                consigneeCustomerID: [ 
					{required: true, message: '请选择收货单位'}
				],
                consigneeCustomerAddressID: [ 
					{ required: true, message: '请选择收货地址', trigger: 'change'}
				],
				receivableDistance: [
					{required: true, message: '请输入对客户应收运价/运输距离'}, 
					{validator: checkFloat2}
				],
				receivableWeightUnitPrice: [
					{required: true, message: '请输入对客户应收运价/吨公里'}, 
					{validator: checkFloat2},
					{validator: validateRangeOfPrice}
				],
                receivableVolumnUnitPrice: [
					{required: true, message: '请输入对客户应收运价/方公里'}, 
					{validator: checkFloat2},
					{validator: validateRangeOfPrice}
				],
				payableDistance: [
					{required: true, message: '请输入对司机支付运价/运输距离'}, 
					{validator: checkFloat2}
				],
				payableWeightUnitPrice: [
					{required: true, message: '请输入对司机支付运价/吨公里'}, 
					{validator: checkFloat2},
					{validator: validateRangeOfPrice}
				],
				payableVolumnUnitPrice: [
					{required: true, message: '请输入对司机支付运价/方公里'}, 
					{validator: checkFloat2},
					{validator: validateRangeOfPrice}
				]
			}
        }
    },
    methods: {
        getShipperCompany(queryString, cb) {
			if (queryString != this.flagShipperName) {
				this.line.shipperCustomerID = ''
			}
			Company.customer().suggest({
				customerType: 'Shipper',
				companyName: queryString
			}).then(res => { cb && cb(res) })
		},
		getConsigneeCompany(queryString, cb) {
			if (queryString != this.flagConsigneeName) {
				this.line.consigneeCustomerID = ''
			}
			Company.customer().suggest({
				customerType: 'Consignee',
				companyName: queryString
			}).then(res => { cb && cb(res) })
		},
		getShipperAddress(queryString, cb) {
			Company.customerAddress().listOfCarrierOrder({
				customerID: this.line.shipperCustomerID,
				keyword: queryString
			}).then(res => { cb && cb(res) })
		},
		getConsigneeAddress(queryString, cb){
			Company.customerAddress().listOfCarrierOrder({
				customerID: this.line.consigneeCustomerID,
				keyword: queryString
			}).then(res => { cb && cb(res) })
        },
        handSelectShipperCompany(data) {
			this.isChangeShipper = !this.isChangeShipper
			this.line.shipperName = ' '
			this.line.shipperCustomerID = data.customerID
			this.$nextTick(() => {
				this.line.flagShipperName = this.line.shipperName = data.companyName
				this.getShipperAddress('', false)
			})
		},
		handSelectConsigneeCompany(data) {
			this.isChangeConsignee = !this.isChangeConsignee
			this.line.consigneeName = ' '
			this.line.consigneeCustomerID = data.customerID
			this.$nextTick(() => {
				this.line.flagConsigneeName = this.line.consigneeName = data.companyName
				this.getConsigneeAddress('', false)
			})
		},
		handSelectShipperAddress(data) {
			this.line.shipperCustomerAddressID = data.customerAddressID
			this.$refs['ruleForm'].validateField('shipperCustomerAddressID')
		},
		handSelectConsigneeAddress(data) {
			this.line.consigneeCustomerAddressID = data.customerAddressID
			this.$refs['ruleForm'].validateField('consigneeCustomerAddressID')
        },
        clearSelectShipper(){
			this.line.shipperName = ' '
			this.line.shipperCustomerID = ''
		},
		clearSelectConsignee(){
			this.line.consigneeName = ' '
			this.line.consigneeCustomerID =''
		},
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				this.line.customerID = this.customerID
				const line = Object.assign({}, this.line)
				line.receivableDistance = this.line.receivableDistance*1000
				line.payableDistance = this.line.payableDistance*1000
				Company.customerRoutePrice().add(line).then(res => {
					Message.success('保存成功！')
					this.callback(true)
				})
			})
        },
        close() {
            this.$refs['ruleForm'].resetFields()
            this.callback()
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
