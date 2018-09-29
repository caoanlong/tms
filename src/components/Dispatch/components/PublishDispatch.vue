<template>
    <div>
        <el-dialog 
            width="80%" 
            title="发布派车单" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-press-escape="false" 
            :close-on-click-modal="false">
                <div class="num-info">
                    <span class="num-tit">配载总量</span>
                    <span class="num-label" v-if="totalNum"><span>数</span>{{totalNum}}</span>
                    <span class="num-label" v-if="totalWeight"><span>重</span>{{totalWeight}}吨</span>
                    <span class="num-label" v-if="totalVolume"><span>体</span>{{totalVolume}}方</span>
                </div>
                <div class="num-info">
                    <span class="num-tit">
                        {{transLines.filter(item => item.type == 'Load').length}}装
                        {{transLines.filter(item => item.type == 'Unload').length}}卸
                        &nbsp;&nbsp;预计里程{{(totalDistance/1000).toFixed(2)}}公里
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
                                        <span>{{(Number(selectedTruck.length)/1000).toFixed(2)}}米/{{TRUCKTYPE[selectedTruck.truckType]}}/{{(Number(selectedTruck.loads)/1000).toFixed(2)}}吨/{{selectedTruck.loadVolume}}方</span>
                                        <el-tag size="mini" type="success">{{selectedTruck.workStatus == 'Free' ? '空闲' : '业务中'}}</el-tag>
                                        <el-tag size="mini" v-if="selectedTruck.gps && selectedTruck.gps == 1">GPS</el-tag>
                                        <el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
                                            <div slot="content">
                                                <el-tag 
                                                    size="mini" 
                                                    type="danger" 
                                                    v-for="(x, index) in selectedTruck.expiredCertificate.split(',')" 
                                                    :key="index" 
                                                    v-if="selectedTruck.expiredCertificate">
                                                    {{ EXPIREWARN[x] }}
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
                                                    {{ EXPIREWARN[x] }}
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
                                                    {{ EXPIREWARN[x] }}
                                                </el-tag>
                                            </div>
                                            <el-tag size="mini" type="danger" v-if="selectedTruck.superCargo && selectedTruck.superCargo.expiredCertificate">到期</el-tag>
                                        </el-tooltip>
                                        &nbsp;&nbsp;&nbsp;
                                        <span class="add-btn" @click="addPerson('second')">更换</span>
                                        <span class="add-btn" @click="delPerson('second')">删除</span>
                                    </span>
                                    <span class="add-btn" @click="addPerson('second')" v-else v-show="selectedTruck.truckID">+ 添加随行人员</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-row>
                <el-row style="margin-top:15px">
                    <p class="feeTit">基础运费
                        <span style="font-size:12px;color:#ccc;font-weight:400">（如已配置发货方的给司机的运价，系统会默认算金额）</span>
                    </p>
                    <el-tooltip content="点击关闭 tooltip 功能" placement="top" effect="light">
                        <div slot="content">
                            <table class="dialog-table">
                                <tr>
                                    <th>委托方</th>
                                    <th>起点</th>
                                    <th>终点</th>
                                    <th>运输距离</th>
                                    <th>吨公里</th>
                                    <th>方公里</th>
                                </tr>
                                <tr v-for="(item, i) in dispatchTaskCargoList" :key="i">
                                    <th>{{item.consignorName}}</th>
                                    <td>{{item.shipperArea}}</td>
                                    <td>{{item.consigneeArea}}</td>
                                    <td>{{(item.payableDistance/1000).toFixed(2) || 0}}公里</td>
                                    <td>{{item.payableVolumnUnitPrice || 0}}元</td>
                                    <td>{{item.payableWeightUnitPrice || 0}}元</td>
                                </tr>
                            </table>
                        </div>
                        <div class="transFeeTips">
                            <svg-icon icon-class="info" class="infoIcon"></svg-icon>
                            <p>
                                根据委托方{{dispatchTaskCargoList[0] ? dispatchTaskCargoList[0].consignorName : ''}}已配置的运费单价
                                计算基础运费 {{totalPrice()}}元
                            </p>
                        </div>
                    </el-tooltip>
                    <el-form 
                        ref="baseDizDispatchFeeRuleForm" 
                        :model="baseDizDispatchFee" 
                        :rules="baseDizDispatchFeeRule"
                        :inline="true" size="mini">
                        <el-form-item label="基础运费" prop="amount">
                            <el-input placeholder="请输入..." v-model="baseDizDispatchFee.amount"></el-input>
                        </el-form-item>
                        <el-form-item label="支付方式" prop="payMode">
                            <el-select 
                                size="mini" 
                                placeholder="请选择" 
                                style="width:100%" 
                                v-model="baseDizDispatchFee.payMode">
                                <el-option 
                                    v-for="(label, value) in PAYMETHODS" 
                                    :key="value" 
                                    :label="label" 
                                    :value="value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-row>
                <el-row>
                    <table class="dialog-table">
                        <caption>其他费用</caption>
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
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="item" :rules="[{ required: true , message: '请选择费用科目' }]">
                                            <el-select size="mini" v-model="item.item" placeholder="请选择">
                                                <el-option 
                                                    v-for="(label, value) in FREIGHTTYPE" 
                                                    :key="value" 
                                                    :label="label" 
                                                    :value="value" 
                                                    v-if="label != '运费'">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td align="center">
                                    <span style="position:relative;top:-10px">附加运费</span>
                                </td>
                                <td align="center" style="padding:0 15px">
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="superCargoID" :rules="[{ required: true , message: '请选择收款人' }]">
                                            <el-select 
                                                size="mini" 
                                                value-key="supercargoID" 
                                                v-model="item.superCargo" 
                                                placeholder="请选择" 
                                                @change="handSelectItem($event, index)" style="width:100%">
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
                                <td align="center" style="padding:0 15px">
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="payMode" :rules="[{ required: true , message: '请选择支付方式' }]">
                                            <el-select size="mini" v-model="item.payMode" placeholder="请选择" style="width:100%">
                                                <el-option 
                                                    v-for="(label, value) in PAYMETHODS" 
                                                    :key="value" 
                                                    :label="label" 
                                                    :value="value">
                                                </el-option>
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
                                            <el-input size="mini" placeholder="请输入..." v-model="item.amount" style="width:100%">
                                                <template slot="append">元</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td align="center">
                                    <span style="position:relative;top:-10px" class="del-btn"  @click="delFreight(index)">删除</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-row>
                <div class="num-info">
                    <span class="num-tit">总运费：{{totalFreight}}元</span>
                </div>
                <el-row>
                    <el-form size="small" :model="normal" ref="ruleForm2">
                        <el-col :span="8">
                            <el-form-item label="接单截止时间" label-width="100px">
                                <el-date-picker 
                                    format="yyyy-MM-dd"
                                    v-model="normal.endDate" 
                                    type="date" 
                                    placeholder="请选择日期"
                                    style="width:100%"
                                    value-format="timestamp"
                                    @change="handSelectDate"
                                    :picker-options="{ disabledDate: (curDate) => new Date() - 3600000*24 >= curDate }">
                                </el-date-picker>
                            </el-form-item>
                         </el-col>
                         <el-col :span="8">
                            <el-form-item label-width="20px">
                                <el-time-select
                                    :disabled = this.normal.endDate?false:true
                                    v-model="normal.endTime"
                                    :picker-options="{
                                        start:'00:00',
                                        step: '01:00',
                                        end:'23:00',
                                        minTime:this.minDateTime
                                    }"
                                    placeholder="请选择时间">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
                <el-row style="margin-top:20px" class="text-center">
                    <el-button @click="close" size="small">取消</el-button>
                    <el-button type="primary" @click="publish" size="small">&nbsp;&nbsp;&nbsp;发布&nbsp;&nbsp;&nbsp;</el-button>
                </el-row>
        </el-dialog>
        <select-truck :isVisible="truckDialog" @control="handSelectTruck"></select-truck>
        <select-person :isVisible="personDialog" :truck="selectedTruck" :type="personType" @control="handSelectPerson"></select-person>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import axios from 'axios'
import SelectTruck from './SelectTruck'
import SelectPerson from './SelectPerson'
import DispatchOrder from '../../../api/DispatchOrder'
import { arrayUnique,timeToTimestamp } from '../../../common/utils'
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
            baseDizDispatchFee: {
                item: 'Freight',  // 费用科目
                category: 'Basic', // 费用类型
                superCargo: '',  // 收款人
                superCargoID: '',  // 收款人
                superCargoName: '',  // 收款人
                payMode: 'Prepay',  // 支付方式
                amount: ''  // 金额
            },
            minDateTime:'',
            endDateTime:'',
            bizDispatchFeeList: [],
            normal: {
                endDate: ''
            },
            persons: [],
            baseDizDispatchFeeRule: {
                amount: [{required: true, message: '请输入基础运费'}],
                payMode: [{required: true, message: '请选择支付方式'}],
            },
        }
    },
    watch: {
        dispatchTaskCargoList: {
            handler(list) {
                // this.normal.endDate = Math.min(...val.map(item => item.shipperDate))
                for (let i = 0; i < list.length; i++) {
                    const start = [list[i].shipperLocationLng, list[i].shipperLocationLat]
                    const end = [list[i].consigneeLocationLng, list[i].consigneeLocationLat]
                    if (!list[i].payableDistance || list[i].payableDistance == '0') {
                        this.getDistance(start, end, i)
                    }
                }
            },
            deep: true
        },
        isVisible: function (val){
            if(val){
                let now = new Date()
                let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
                let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
                if(minute > 30){
                    this.minDateTime =  hour +1 +":"+"00"
                }else{
                    this.minDateTime =  hour +":"+"00"
                }
            } else {
                this.minDateTime = ""
            }
        }
    },
    computed: {
        totalFreight() {
            const values = this.bizDispatchFeeList.map(item => Number(item.amount ? item.amount : 0))
			const val = values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
			return Number(val) + Number(this.baseDizDispatchFee.amount)
        }
    },
    methods: {
        /**
		 * 调用高德地图接口获取距离
		 */
		async getDistance(start, end, i) {
			const url = `https://restapi.amap.com/v3/distance?origins=${start}&destination=${end}&key=${this.MAPKEY}`
			const res = await axios({ url })
            if (res.data.status == 1) this.dispatchTaskCargoList[i].payableDistance = res.data.results[0].distance
        },
        totalPrice() {
            let sum = 0
            const list = [...this.dispatchTaskCargoList]
            for (let i = 0; i < list.length; i++) {
                const item = list[i]
                if (item.dispatchType = 'Volumn') {
                    sum += +item.payableDistance/1000 * item.payableVolumnUnitPrice
                } else {
                    sum += +item.payableDistance/1000 * item.payableWeightUnitPrice
                }
            }
            this.baseDizDispatchFee.amount = sum.toFixed(2)
            return sum.toFixed(2)
        },
        handSelectTruck(data) {
            this.truckDialog = false
            this.selectedTruck = data ? data : {}
            this.createPersons()
            if (this.selectedTruck.primaryDriver) {
                this.clearSelectedSuperCargo()
                this.selectedTruck.primaryDriver.type = 'primary'
                this.baseDizDispatchFee.superCargoID = this.selectedTruck.primaryDriver.supercargoID
                this.baseDizDispatchFee.superCargoName = this.selectedTruck.primaryDriver.realName
                if (this.bizDispatchFeeList.length > 0) {
                    this.bizDispatchFeeList[0].superCargoID = this.selectedTruck.primaryDriver.supercargoID
                    this.bizDispatchFeeList[0].superCargoName = this.selectedTruck.primaryDriver.realName
                    this.bizDispatchFeeList[0].superCargo = this.persons.filter(item => item.supercargoID == this.selectedTruck.primaryDriver.supercargoID)[0]
                }
            }
        },
        handSelectPerson(type, data) {
            this.personDialog = false
            if (!data) return
            data.type = type
            if (type == 'primary') {
                this.selectedTruck.primaryDriver = data
                this.baseDizDispatchFee.superCargoID = data.supercargoID
                this.baseDizDispatchFee.superCargoName = data.realName
            } else {
                this.selectedTruck.superCargo = data
            }
            this.clearSelectedSuperCargo()
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
        delPerson() {
            this.selectedTruck.superCargo = null
            this.createPersons()
        },
        /**
         * 添加费用
         */
        addFreight() {
            const item = {
                item: '',
                category: 'Attach',
                superCargo: '',  // 收款人
                superCargoID: '',  // 收款人
                superCargoName: '',  // 收款人
                payMode: '',
                amount: ''
            }
            if (this.selectedTruck.primaryDriver) {
                item.superCargoID = this.selectedTruck.primaryDriver.supercargoID
                item.superCargoName = this.selectedTruck.primaryDriver.realName
            }
            this.bizDispatchFeeList.push(item)
        },
        /**
         * 删除费用
         */
        delFreight(i) {
            this.bizDispatchFeeList.splice(i, 1)
        },
        /**
         * 生成收款人列表
         */
        createPersons() {
            if (this.selectedTruck.primaryDriver && this.selectedTruck.superCargo) {
                if(this.selectedTruck.primaryDriver.supercargoID == this.selectedTruck.superCargo.supercargoID){
                     this.persons = [this.selectedTruck.primaryDriver]
                }else{
                    this.persons = [this.selectedTruck.primaryDriver, this.selectedTruck.superCargo]
                }
            } else if (this.selectedTruck.primaryDriver) {
                this.persons = [this.selectedTruck.primaryDriver]
            } else if (this.selectedTruck.superCargo) {
                this.persons = [this.selectedTruck.superCargo]
            }
        },
        /**
         * 清除任务运费&支付方式（已选择收款人）
         */
        clearSelectedSuperCargo() {
            const bizDispatchFeeList = Array.from(this.bizDispatchFeeList)
            for (let i = 0; i < bizDispatchFeeList.length; i++) {
                bizDispatchFeeList[i].superCargo = ''
                bizDispatchFeeList[i].superCargoID = ''
                bizDispatchFeeList[i].superCargoName = ''
            }
            this.bizDispatchFeeList = bizDispatchFeeList
        },
        handSelectDate(value){
            this.endDateTime = value
        },
        /**
         * 发布
         */
        publish() {
            if (this.bizDispatchFeeList.length > 0) {
                for (let i = 0; i < this.bizDispatchFeeList.length; i++) {
                    const element = this.bizDispatchFeeList[i]
                    if (!this.persons.map(item => item.supercargoID).includes(element.superCargo.supercargoID)) {
                        Message.error(`第${i+1}行收款人请重新选择！`)
                        return
                    }
                }
            }
            new Promise((resolve, reject) => {
                let flag = true
                if (this.$refs['ruleForm']) {
                    for (let i = 0; i < this.$refs['ruleForm'].length; i++) {
                        const item = this.$refs['ruleForm'][i]
                        item.validate(valid => {
                            if (!valid) flag = false
                        })
                    }
                }
                this.$refs['ruleForm2'].validate(valid => {
                    if (!valid) flag = false
                })
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
                const bizDispatchFeeList = [this.baseDizDispatchFee, ...this.bizDispatchFeeList].map(item => {
                    return {
                        item: item.item,
                        category: item.category,
                        superCargoID: item.superCargoID,
                        superCargoName: item.superCargoName,
                        payMode: item.payMode,
                        amount: item.amount
                    }
                })
                if (this.normal.endTime) {
                    this.normal.endDate = this.endDateTime + timeToTimestamp(this.normal.endTime)
                } else {
                    if(this.normal.endDate){
                        this.normal.endDate = this.endDateTime + 3600000*24-1000
                    } else {
                        this.normal.endDate = ''
                    }
                }
                DispatchOrder.addForDispatch({
                    truckID: this.selectedTruck.truckID,
                    driverID: this.selectedTruck.primaryDriver ? this.selectedTruck.primaryDriver.supercargoID : '',
                    superCargoID: this.selectedTruck.superCargo ? this.selectedTruck.superCargo.supercargoID : '',
                    bizDispatchFeeList,
                    dispatchTaskCargoList,
                    dispatchTaskList,
                    bizDispatchNodeList: this.transLines,
                    endDate: this.normal.endDate ? this.normal.endDate:'',
                    distance: this.totalDistance
                }).then(res => {
                    Message.success('成功！')
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
    height 30px
    line-height 30px
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
        font-size 14px
        font-weight bold
        
    th
        background #f2f2f2
        color #666
        padding 10px 15px
    td
        padding 10px 15px
        background #fff
    .add-btn,
    .del-btn
        color #409EFF
        cursor pointer
.feeTit
    height 40px
    line-height 40px
    font-size 14px
    font-weight 700
.transFeeTips
	line-height 20px
	font-size 12px
	color #a2a2a2
	padding-left 20px
	position relative
	margin-bottom 10px
	p
		line-height 20px
	.infoIcon
		position absolute
		left 0
		top 5px
</style>

