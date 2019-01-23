<template>
	<div class="main-content">
		<el-card class="box-card">
            <div slot="header" class="clearfix">编辑交货单</div>
            <el-form label-width="120px" :model="deliveryInfo" :rules="rules" ref="ruleForm" size="small">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="交货单号" prop="code">
                            <el-input v-model="deliveryInfo.code" :maxlength="100"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工厂名称" class="customerSelect" prop="companyCode">
                            <el-select v-model="deliveryInfo.shipperName" placeholder="请选择"  style="width:100%">
                                <el-option :label="shipperInfo.companyName" :value="shipperInfo.companyCode"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户名称" prop="dealerCode">
                            <el-autocomplete 
                                value-key="companyName" 
                                v-model="dealerName"
                                :fetch-suggestions="getDealer"
                                placeholder="请输入客户名称" 
                                @select="handSelectDealer" style="width:100%">
                                <i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectDealer"></i>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品名称" prop="cargoCode">
                            <el-autocomplete 
                                value-key="cargoName" 
                                v-model="deliveryInfo.cargoName"
                                :fetch-suggestions="getCargoList"
                                placeholder="请输入产品名称" 
                                @select="handSelectCargoList" style="width:100%">
                                <i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectCargoList"></i>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                   <el-col :span="8">
                        <el-form-item label="产品数量">
                            <el-input placeholder="0" v-model="deliveryInfo.cargoQuantity"><template slot="append">袋</template></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品重量" prop="cargoWeight">
                            <el-input placeholder="0" v-model="deliveryInfo.cargoWeight"><template slot="append">吨</template></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="监控级别" class="customerSelect" prop="level">
                            <el-select placeholder="请选择"  style="width:100%" v-model="deliveryInfo.level">
                                <el-option value="A" label="A"></el-option>
                                <el-option value="B" label="B"></el-option>
                                <el-option value="C" label="C"></el-option>
                                <el-option value="D" label="D"></el-option>
                                <el-option value="E" label="E"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车牌号" prop="plateNo">
                            <el-input placeholder="车牌号"  v-model="deliveryInfo.plateNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出厂时间" prop="outTime">
                            <el-date-picker 
                                v-model="deliveryInfo.outTime"
                                type="datetime" 
                                :clearable="false" 
                                value-format="timestamp"  style="width:100%">
                            </el-date-picker>
                        </el-form-item>
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
	</div>
</template>
<script type="text/javascript">
import DeliveryOrder from '../../../api/DeliveryOrder'
import Company from '../../../api/Company'
import Sys from '../../../api/Sys'
import { Message } from 'element-ui'
export default {

	data() {
		return {
            shipperInfo:{},
            dealerName:'',
            deliveryInfo:{
                code:'',
                companyCode:'',
                dealerCode:'',
                cargoName:'',
                cargoCode:'',
                cargoWeight:'',
                cargoQuantity:'',
                level:'',
                plateNo:'',
				outTime: ''
            },
			rules: {
                code: [ { required: true, message: '请输入交货单号' } ],
                companyCode: [ { required: true, message: '请选择工厂' } ],
                dealerCode: [ { required: true, message: '请选择客户' } ],
                cargoCode: [ { required: true, message: '请输入交货单号' } ],
                cargoWeight: [ { required: true, message: '请输入产品重量' } ],
                cargoCode: [ { required: true, message: '请选择产品' } ],
                plateNo: [ { required: true, message: '请输入车牌号' } ],
                level: [ { required: true, message: '请选择监控级别' } ],
                outTime: [ { required: true, message: '请选择出厂时间' } ]
            }
		}
    },
	activated() {
        this.getShipperInfo()
		if(!this.$route.query.cache) {
            this.dealerName='',
			this.deliveryInfo = {
				code:'',
                companyCode:'',
                dealerCode:'',
                cargoName:'',
                cargoCode:'',
                cargoWeight:'',
                cargoQuantity:'',
                level:'',
                plateNo:'',
				outTime: ''
			}
            this.getInfo()
            
        }
        if(this.$refs['ruleForm']) {
            this.$refs['ruleForm'].resetFields()
        }
    },
	methods: {
		getInfo() {
			const deliveryOrderID = this.$route.query.deliveryOrderID
			DeliveryOrder.orderDetail({ deliveryOrderID}).then(res => {
				this.deliveryInfo = res
				this.dealerName = res.consigneeName
			})
        },
        getShipperInfo() {
			Sys.info().then(res => {
                this.shipperInfo.companyName =res.companyName
                this.shipperInfo.companyCode =res.code
            })
        },
        getDealer(companyName, cb) {
			this.deliveryInfo.dealerCode = ''
			Company.customerSuggest({
                current: 1,
                size: 1000,
                customerType: 'Consignee',
                companyName:this.dealerName
            }).then(res => {
                cb(res)
            })
		},
        handSelectDealer(data){
			this.deliveryInfo.dealerCode = data.code
            this.dealerName = data.companyName
        },
        clearSelectDealer(){
			this.deliveryInfo.dealerCode = ''
			this.dealerName =''
		},
        getCargoList(Name, cb) {
			this.deliveryInfo.cargoCode = ''
			Company.cargoFind({
                current: 1,
                size: 1000,
                cargoName: this.deliveryInfo.cargoName
            }).then(res => {
                cb(res.records)
            })
		},
        handSelectCargoList(data){
			this.deliveryInfo.cargoCode = data.code
            this.deliveryInfo.cargoName = data.cargoName
        },
        clearSelectCargoList(){
			this.deliveryInfo.cargoCode = ''
			this.deliveryInfo.cargoName =''
		},
        add() {
			this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                const deliveryInfo = {
                    deliveryOrderID:this.$route.query.deliveryOrderID,
                    code:this.deliveryInfo.code,
                    companyCode:this.deliveryInfo.companyCode,
                    dealerCode:this.deliveryInfo.dealerCode,
                    cargoCode:this.deliveryInfo.cargoCode,
                    cargoWeight:this.deliveryInfo.cargoWeight,
                    cargoQuantity:this.deliveryInfo.cargoQuantity,
                    level:this.deliveryInfo.level,
                    plateNo:this.deliveryInfo.plateNo,
                    outTime:this.deliveryInfo.outTime,
                }
				DeliveryOrder.orderUpdate(deliveryInfo).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'delivery'})
				})
			})
        },
		back() {
			this.$router.push({name: 'delivery'})
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>