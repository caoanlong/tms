<template>
    <div>
        <el-dialog 
            width="80%" 
            title="发布派车单" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-press-escape="false" 
            :close-on-click-modal="false">
            <el-form size="small">
                <div class="num-info">
                    <span class="num-tit">配载总量</span>
                    <span class="num-label"><span>数</span>{{totalNum}}</span>
                    <span class="num-label"><span>重</span>{{totalWeight}}</span>
                    <span class="num-label"><span>体</span>{{totalVolume}}</span>
                </div>
                <div class="num-info">
                    <span class="num-tit">
                        {{transLines.filter(item => item.type == 'Load').length}}装
                        {{transLines.filter(item => item.type == 'Unload').length}}卸
                        &nbsp;&nbsp;预计里程{{totalDistance}}公里
                    </span>
                </div>
                <el-row>
                    <table class="dialog-table">
                        <caption>车辆人员</caption>
                        <thead>
                            <tr>
                                <th>车辆</th>
                                <th>驾驶员</th>
                                <th>随行人员</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center">
                                    <span v-if="selectedTruck.truckID">
                                        <strong>{{selectedTruck.plateNo}}</strong>
                                        <span>9.6米/高栏/22吨/3.5方</span>
                                        <el-tag size="mini" type="success">{{selectedTruck.workStatus == 'Free' ? '空闲' : '业务中'}}</el-tag>
                                        <el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
                                            <div slot="content">
                                                <el-tag 
                                                    size="mini" 
                                                    type="danger" 
                                                    v-for="(x, index) in selectedTruck.expiredCertificate.split(',')" 
                                                    :key="index" 
                                                    v-if="selectedTruck.expiredCertificate">
                                                    {{ expireWarnJson[x] }}
                                                </el-tag>
                                            </div>
                                            <el-tag size="mini" type="danger" v-if="selectedTruck.expiredCertificate">到期</el-tag>
                                        </el-tooltip>
                                        &nbsp;&nbsp;&nbsp;
                                        <span class="add-btn" @click="addTruck">更换</span>
                                    </span>
                                    <span class="add-btn" @click="addTruck" v-else>+ 添加车辆<b style="color:red">*</b></span>
                                </td>
                                <td align="center">
                                    <span v-if="selectedTruck.primaryDriver && selectedTruck.primaryDriver.supercargoID">
                                        <strong>{{selectedTruck.primaryDriver && selectedTruck.primaryDriver.realName}}</strong>
                                        <span>{{selectedTruck.primaryDriver && selectedTruck.primaryDriver.mobile}}</span>
                                        <el-tag size="mini" type="success" v-if="selectedTruck.primaryDriver">空闲</el-tag>
                                        <el-tag size="mini" type="warning" v-if="selectedTruck.primaryDriver && selectedTruck.primaryDriver.appStatus == 'Y'">APP</el-tag>
                                        <el-tag size="mini" type="info" v-else-if="selectedTruck.primaryDriver && selectedTruck.primaryDriver.appStatus == 'N'">APP</el-tag>
                                        <el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
                                            <div slot="content">
                                                <el-tag 
                                                    size="mini" 
                                                    type="danger" 
                                                    v-for="(x, index) in selectedTruck.primaryDriver ? selectedTruck.primaryDriver.expiredCertificate.split(',') : []" 
                                                    :key="index" 
                                                    v-if="selectedTruck.primaryDriver.expiredCertificate">
                                                    {{ expireWarnJson[x] }}
                                                </el-tag>
                                            </div>
                                            <el-tag size="mini" type="danger" v-if="selectedTruck.primaryDriver && selectedTruck.primaryDriver.expiredCertificate">到期</el-tag>
                                        </el-tooltip>
                                        &nbsp;&nbsp;&nbsp;
                                        <span class="add-btn" @click="addPerson('primary')">更换</span>
                                    </span>
                                    <span class="add-btn" @click="addPerson('primary')" v-else v-show="selectedTruck.truckID">+ 添加驾驶员</span>
                                </td>
                                <td align="center">
                                    <span v-if="selectedTruck.superCargo && selectedTruck.superCargo.supercargoID">
                                        <strong>{{selectedTruck.superCargo && selectedTruck.superCargo.realName}}</strong>
                                        <span>{{selectedTruck.superCargo && selectedTruck.superCargo.mobile}}</span>
                                        <el-tag size="mini" type="success" v-if="selectedTruck.superCargo">空闲</el-tag>
                                        <el-tag size="mini" type="warning" v-if="selectedTruck.superCargo && selectedTruck.superCargo.appStatus == 'Y'">APP</el-tag>
                                        <el-tag size="mini" type="info" v-else-if="selectedTruck.superCargo && selectedTruck.superCargo.appStatus == 'N'">APP</el-tag>
                                        <el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
                                            <div slot="content">
                                                <el-tag 
                                                    size="mini" 
                                                    type="danger" 
                                                    v-for="(x, index) in selectedTruck.superCargo ? selectedTruck.superCargo.expiredCertificate.split(',') : []" 
                                                    :key="index" 
                                                    v-if="selectedTruck.superCargo.expiredCertificate">
                                                    {{ expireWarnJson[x] }}
                                                </el-tag>
                                            </div>
                                            <el-tag size="mini" type="danger" v-if="selectedTruck.superCargo && selectedTruck.superCargo.expiredCertificate">到期</el-tag>
                                        </el-tooltip>
                                        &nbsp;&nbsp;&nbsp;
                                        <span class="add-btn" @click="addPerson('second')">更换</span>
                                    </span>
                                    <span class="add-btn" @click="addPerson('second')" v-else v-show="selectedTruck.truckID">+ 添加随行人员</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-row>
                <el-row>
                    <table class="dialog-table">
                        <caption>任务运费&支付方式</caption>
                        <thead>
                            <tr>
                                <th width="140">费用科目</th>
                                <th>费用类型</th>
                                <th>收款人</th>
                                <th>支付方式</th>
                                <th>金额</th>
                                <th><el-button size="mini" type="primary" @click="addFreight">添加费用</el-button></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in bizDispatchFeeList" :key="index">
                                <td align="center" style="padding:0 15px">
                                    <span style="position:relative;top:-10px" v-if="index === 0">{{item.item == 'Freight' ? '运费' : ''}}</span>
                                    <el-form :model="item" ref="ruleForm" v-else>
                                        <el-form-item prop="item" :rules="[{ required: true , message: '请选择费用科目' }]">
                                            <el-select size="mini" v-model="item.item" placeholder="请选择">
                                                <el-option label="路桥费" value="RoadBridge"></el-option>
                                                <el-option label="中转费" value="Transit"></el-option>
                                                <el-option label="罚款" value="Fine"></el-option>
                                                <el-option label="绕路费" value="Detour"></el-option>
                                                <el-option label="其他" value="Other"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td align="center">
                                    <span style="position:relative;top:-10px">{{item.category == 'Basic' ? '基础运费' : '附加运费'}}</span>
                                </td>
                                <td align="center" style="padding:0 5px">
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="superCargoID" :rules="[{ required: true , message: '请选择收款人' }]">
                                            <el-select size="mini" value-key="supercargoID" v-model="item.superCargo" placeholder="请选择" @change="handSelectItem($event, index)">
                                                <el-option 
                                                    :label="(person.type == 'primary' ? '司机-' : '押运-') + person.realName" 
                                                    :value="person" 
                                                    v-for="person in persons" 
                                                    :key="person.supercargoID">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td align="center" style="padding:0 5px">
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="payMode" :rules="[{ required: true , message: '请选择支付方式' }]">
                                            <el-select size="mini" v-model="item.payMode" placeholder="请选择">
                                                <el-option label="到付" value="PayOnDelivery"></el-option>
                                                <el-option label="预付" value="Prepay"></el-option>
                                                <el-option label="回单结" value="PayOnReceipt"></el-option>
                                                <el-option label="收货方付" value="PayByConsignee"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td align="center" style="padding:0 15px">
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="amount" :rules="[{
												validator: (rule, value, callback) => {
													const r = /(^[1-9]\d*\.\d{1,2}$)|(^0{1}\.\d{1,2}$)|(^[1-9]\d*$)/
													if (!item.amount || item.amount == '0') {
														callback('请输入金额')
													} else if (value && !r.test(value)) {
														callback('请输入正确的数字')
													} else {
														callback()
													}
												}
											}]">
                                            <el-input size="mini" placeholder="请输入..." v-model="item.amount"><template slot="append">元</template></el-input>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td align="center">
                                    <span style="position:relative;top:-10px" class="del-btn" v-if="index !== 0" @click="delFreight(index)">删除</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-row>
                <div class="num-info">
                    <span class="num-tit">总运费：{{totalFreight}}元</span>
                </div>
                <el-row>
                    <el-form-item label="接单截止时间">
                        <el-date-picker 
                            format="yyyy-MM-dd HH"
                            v-model="endDate"
                            type="date" 
                            :clearable="false" 
                            value-format="timestamp">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <el-row style="margin-top:20px">
                    <el-form-item label-width="0" class="text-center">
                        <el-button @click="close">取消</el-button>
                        <el-button type="primary" @click="publish">&nbsp;&nbsp;&nbsp;发布&nbsp;&nbsp;&nbsp;</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-dialog>
        <select-truck :isVisible="truckDialog" @control="handSelectTruck"></select-truck>
        <select-person :isVisible="personDialog" :truck="selectedTruck" :type="personType" @control="handSelectPerson"></select-person>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import SelectTruck from './SelectTruck'
import SelectPerson from './SelectPerson'
import Dispatchbill from '../../../api/Dispatchbill'
import { arrayUnique } from '../../../common/utils'
export default {
    components: { SelectTruck, SelectPerson },
    props: {
        totalNum: {
            type: Number,
            default: 0
        },
        totalWeight: {
            type: Number,
            default: 0
        },
        totalVolume: {
            type: Number,
            default: 0
        },
        totalDistance: {
            type: Number,
            default: 0
        },
        transLines: Array,
        dispatchTaskCargoList: Array,
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            truckDialog: false,
            personDialog: false,
            selectedTruck: {},
            personType: 'primary',
            bizDispatchFeeList: [{
                item: 'Freight',  // 费用科目
                category: 'Basic', // 费用类型
                superCargo: '',  // 收款人
                superCargoID: '',  // 收款人
                superCargoName: '',  // 收款人
                payMode: 'Prepay',  // 支付方式
                amount: ''  // 金额
            }],
            endDate: '',
            persons: [],
            expireWarnJson:{
                DriverLicExpiresTime: "行驶证到期",
                RoadTransportLicAnnualPeriod: "道路运输证到期 ",
                GpsValidEndDate: "GPS到期 ",
                SaliInsuranceExpires: "交强险到期 ",
                BizInsuranceExpires: "商业险到期 ",
                CarrierRiskInsuranceExpires: "承运险到期 ",
                CargoInsuranceExpireDate: "货运险到期 ",
                TankQCExpires: "罐体监测到期 ",
                SafetyValvesQCExpires: "罐体安全阀监测到期 ",
                PressureGaugeQCExpires: "罐体压力表监测到期 ",
                secondaMaintainTime: "二级维护下次维护日期到期 ",
                NextRankEvaluteTime: "技术等级下次评定到期",
                SecondSecurityDepositDate: "二次安全保证金到期 ",
                ManagementAgreementExpireDate: "管理协议到期 ",
                SafetyLiabilityLetterExpireDate: "安全责任书到期",
                IdCardExpirationTime: "身份证到期 ",
                DriverLicenseEndTime: "驾驶证到期 ",
                QualificationExpirationDate: "危货从业资格证到期 ",
                IntegrityExamineEndTime: "诚信考核证到期 ",
                LaborContractEndTime: "聘用合同到期 ",
                EscortLicenseExpireDate: "押运证到期"
            }
        }
    },
    computed: {
        totalFreight() {
            const values = this.bizDispatchFeeList.map(item => Number(item.amount ? item.amount : 0))
			const val = values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
			return Number(val)
        }
    },
    methods: {
        handSelectTruck(data) {
            this.truckDialog = false
            this.selectedTruck = data ? data : {}
            if (this.selectedTruck.primaryDriver) {
                this.selectedTruck.primaryDriver.type = 'primary'
            }
            this.createPersons()
        },
        handSelectPerson(data, type) {
            this.personDialog = false
            data.type = type
            if (type == 'primary') {
                this.selectedTruck.primaryDriver = data
            } else {
                this.selectedTruck.superCargo = data
            }
            this.createPersons()
        },
        handSelectItem(data, index) {
            this.bizDispatchFeeList[index].superCargoID = data.supercargoID
            this.bizDispatchFeeList[index].superCargoName = data.realName
        },
        addTruck() {
            this.truckDialog = true
        },
        addPerson(type) {
            this.personType = type
            this.personDialog = true
        },
        addFreight() {
            this.bizDispatchFeeList.push({
                item: '',
                category: 'Attach',
                superCargo: '',  // 收款人
                superCargoID: '',  // 收款人
                superCargoName: '',  // 收款人
                payMode: '',
                amount: ''
            })
        },
        delFreight(i) {
            this.bizDispatchFeeList.splice(i, 1)
        },
        createPersons() {
            if (this.selectedTruck.primaryDriver && this.selectedTruck.superCargo) {
                this.persons = [this.selectedTruck.primaryDriver, this.selectedTruck.superCargo]
            } else if (this.selectedTruck.primaryDriver) {
                this.persons = [this.selectedTruck.primaryDriver]
            } else if (this.selectedTruck.superCargo) {
                this.persons = [this.selectedTruck.superCargo]
            }
        },
        publish() {
            new Promise((resolve, reject) => {
				let flag = true
				for (let i = 0; i < this.$refs['ruleForm'].length; i++) {
					const item = this.$refs['ruleForm'][i]
					item.validate(valid => {
						if (!valid) flag = false
					})
                }
				flag ? resolve() : reject()
			}).then(() => {
                const dispatchTaskCargoList = this.dispatchTaskCargoList.map(item => {
                    return {
                        carrierCargoID: item.carrierCargoID,
                        carrierOrderID: item.carrierOrderID,
                        cargoWeight: item.cargoWeightNew,
                        cargoVolume: item.cargoVolumeNew,
                        cargoNum: item.cargoNumNew
                    }
                })
                const tasks = this.dispatchTaskCargoList.map(item => {
                    return { carrierOrderID: item.carrierOrderID }
                })
                const dispatchTaskList = arrayUnique(tasks, 'carrierOrderID')
                const bizDispatchFeeList = this.bizDispatchFeeList.map(item => {
                    return {
                        item: item.item,
                        category: item.category,
                        superCargoID: item.superCargoID,
                        superCargoName: item.superCargoName,
                        payMode: item.payMode,
                        amount: item.amount
                    }
                })
                Dispatchbill.add({
                    truckID: this.selectedTruck.truckID,
                    driverID: this.selectedTruck.primaryDriver ? this.selectedTruck.primaryDriver.supercargoID : '',
                    superCargoID: this.selectedTruck.superCargo ? this.selectedTruck.superCargo.supercargoID : '',
                    bizDispatchFeeList,
                    dispatchTaskCargoList,
                    dispatchTaskList,
                    bizDispatchNodeList: this.transLines,
                    endDate: this.endDate,
                    distance: this.totalDistance
                }).then(res => {
                    Message.success(res.data.msg)
                    this.$emit('cancel', true)
                })
			}).catch(err => {})
        },
        close() {
            this.$emit('cancel')
        }
    }
}
</script>
<style lang="stylus" scoped>
.num-info
    height 40px
    line-height 40px
    font-size 14px
    text-align left
    .num-tit
        color #409EFF
        font-weight 600
        margin-right 10px
    .num-label
        margin-right 10px
        span
            width 18px
            height 18px
            display inline-block
            color #fff
            border-radius 4px
            font-size 12px
            line-height 18px
            text-align center
            font-weight 800
            margin-right 4px
            background-color #409EFF
.dialog-table
    font-size 12px
    background #dcdfe6
    border-spacing 1px
    width 100%
    caption
        height 40px
        line-height 40px
        text-align left
        
    th
        background #f2f2f2
        color #666
        padding 10px 15px
    td
        padding 10px 15px
        background #fff
    .add-btn,.del-btn
        color #409EFF
        cursor pointer
</style>

