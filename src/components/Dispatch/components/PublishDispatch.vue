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
                    <p class="feeTit">车辆人员</p>
                    <div v-if="!selectedTruck.truckID" style="text-align:center">
                        <el-button type="primary" icon="el-icon-plus" round plain @click="addTruck">添加车辆</el-button>
                    </div>
                    <table class="dialog-table" v-else>
                        <thead>
                            <tr>
                                <th>车辆</th>
                                <th>定位位置</th>
                                <th>定位时间</th>
                                <th>驾驶员</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center">
                                    <span>
                                        <strong>{{selectedTruck.plateNo}}</strong>
                                        <span>
                                            {{
                                                [
                                                    selectedTruck.length ? (Number(selectedTruck.length)/1000).toFixed(2) + '米' : '',
                                                    TRUCKTYPE[selectedTruck.truckType]
                                                ].filter(item => item).join('/')
                                            }}
                                        </span>
                                        <el-tag size="mini" type="success">
                                            {{selectedTruck.workStatus == 'Free' ? '空闲' : '业务中'}}
                                        </el-tag>
                                        <el-tooltip placement="top" effect="light">
                                            <div slot="content">
                                                {{selectedTruck.gpsFlag == 'Y' ? 'GPS已安装' : 'GPS未安装'}}
                                            </div>
                                            <el-tag 
                                                size="mini" 
                                                :type="selectedTruck.gpsFlag == 'Y' ? 'success' : 'info'" 
                                                :class="selectedTruck.gpsFlag == 'Y' ? 'el-icon-success' : 'el-icon-warning'">
                                                GPS
                                            </el-tag>
                                        </el-tooltip>
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
                                    </span>
                                </td>
                                <td align="center" @click="addTruck">
                                    {{selectedTruck.posAddress}}
                                </td>
                                <td align="center">
                                    {{
                                        moment(selectedTruck.locationTime).diff(moment(selectedTruck.locationTime), 'days') > 0
                                        ? moment(selectedTruck.locationTime).diff(moment(selectedTruck.locationTime), 'days')
                                        : moment(selectedTruck.locationTime).format('YYYY-MM-DD HH:mm:ss')
                                    }}
                                </td>
                                <td align="center">
                                    <strong>{{selectedTruck.primaryDriver && selectedTruck.primaryDriver.realName}}</strong>
                                    <span>{{selectedTruck.primaryDriver && selectedTruck.primaryDriver.mobile}}</span>
                                </td>
                                <td align="center">
                                    <el-button 
                                        size="mini"
                                        type="primary" 
                                        icon="el-icon-edit" 
                                        round plain 
                                        @click="addTruck">
                                        更换车辆
                                    </el-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-row>
                <el-row style="margin-top:15px">
                    <p class="feeTit">基础运费</p>
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
                    <span class="num-tit">总运费：{{totalFreight?Number(totalFreight).toFixed(2):'0.00'}}元</span>
                </div>
                <el-row style="margin-top:20px" class="text-center">
                    <el-button @click="close" size="small">取消</el-button>
                    <el-button type="primary" @click="publish" size="small">&nbsp;&nbsp;&nbsp;发布&nbsp;&nbsp;&nbsp;</el-button>
                </el-row>
        </el-dialog>
        <select-truck 
            v-if="truckDialog"
            :loadDate="loadDate" 
            :selectedTruck="selectedTruck"
            @control="handSelectTruck">
        </select-truck>
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
            loadDate: '',
            baseDizDispatchFee: {
                item: 'Freight',  // 费用科目
                category: 'Basic', // 费用类型
                superCargo: '',  // 收款人
                superCargoID: '',  // 收款人
                superCargoName: '',  // 收款人
                payMode: 'Prepay',  // 支付方式
                amount: ''  // 金额
            },
            bizDispatchFeeList: [],
            persons: [],
            baseDizDispatchFeeRule: {
                amount: [{ required: true, message: '请输入基础运费' }],
                payMode: [{ required: true, message: '请选择支付方式' }],
            }
        }
    },
    watch: {
        dispatchTaskCargoList: {
            handler(list) {
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
        transLines: {
            handler(list) {
                this.loadDate = list[0] ? list[0].requireTime : ''
            },
            deep: true
        },
        isVisible: function (val){
            if (val) {
                this.totalPrice()
                this.selectedTruck = {}
                this.baseDizDispatchFee = {
                    item: 'Freight',  // 费用科目
                    category: 'Basic', // 费用类型
                    superCargo: '',  // 收款人
                    superCargoID: '',  // 收款人
                    superCargoName: '',  // 收款人
                    payMode: 'Prepay',  // 支付方式
                    amount: ''  // 金额
                }
                this.bizDispatchFeeList = []
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
                if (item.dispatchType == 'Volumn') {
                    sum += (+item.payableDistance/1000).toFixed(2) * item.payableVolumnUnitPrice * item.cargoVolumeNew
                } else {
                    sum += (+item.payableDistance/1000).toFixed(2) * item.payableWeightUnitPrice * item.cargoWeightNew
                }
            }
            this.baseDizDispatchFee.amount = sum?Number(sum).toFixed(2):0
            return sum ? Number(sum).toFixed(2) : 0
        },
        handSelectTruck(data) {
            console.log(data)
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
        handSelectItem(data, index) {
            this.bizDispatchFeeList[index].superCargoID = data.supercargoID
            this.bizDispatchFeeList[index].superCargoName = data.realName
        },
        addTruck() {
            this.truckDialog = true
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
        /**
         * 发布
         */
        async publish() {
            if (this.bizDispatchFeeList.length > 0) {
                for (let i = 0; i < this.bizDispatchFeeList.length; i++) {
                    const element = this.bizDispatchFeeList[i]
                    if (!this.persons.map(item => item.supercargoID).includes(element.superCargo.supercargoID)) {
                        Message.error(`第${i+1}行收款人请重新选择！`)
                        return
                    }
                }
            }
            let flag = true
            if (this.$refs['ruleForm'] && this.$refs['ruleForm'].length > 0) {
                for (let i = 0; i < this.$refs['ruleForm'].length; i++) {
                    const item = this.$refs['ruleForm'][i]
                    flag = await item.validate()
                }
            }
            if (!flag) return

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
            DispatchOrder.addForDispatch({
                truckID: this.selectedTruck.truckID,
                driverID: this.selectedTruck.primaryDriver ? this.selectedTruck.primaryDriver.supercargoID : '',
                superCargoID: this.selectedTruck.superCargo ? this.selectedTruck.superCargo.supercargoID : '',
                bizDispatchFeeList,
                dispatchTaskCargoList,
                dispatchTaskList,
                bizDispatchNodeList: this.transLines,
                distance: this.totalDistance
            }).then(res => {
                Message.success('成功！')
                this.$emit('cancel', true)
            })
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
.exceedTips
    color #f00
    margin-left 10px
</style>

