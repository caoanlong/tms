<template>
    <el-dialog 
        title="发布抢单" 
        :visible="isVisible" 
        :show-close="false"
        :close-on-press-escape="false" 
        :close-on-click-modal="false">
        <el-form label-width="110px" size="small" :model="grabOrder" :rules="rules" ref="ruleForm">
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
                    &nbsp;&nbsp;预计里程{{(totalDistance/1000).toFixed(2)}}公里
                </span>
            </div>
            <el-row class="section-block">
                <span class="block-title">用车需求</span>
                <div class="block-content">
                    <el-row :gutter="20">
						<el-col :span="12">
                            <el-form-item label-width="70px" label="车型">
                                <el-select placeholder="请选择车型" v-model="grabOrder.requiredTruckType">
                                    <el-option label="罐式货车" value="TankTruck"></el-option>
                                    <el-option label="厢式货车" value="VanTruck"></el-option>
                                    <el-option label="仓栅货车" value="BarrackTruck"></el-option>
                                    <el-option label="栏板货车" value="TailgateTruck"></el-option>
                                    <el-option label="自卸货车" value="DumpTruck"></el-option>
                                </el-select>
                            </el-form-item>
						</el-col>
                        <el-col :span="12">
                            <el-form-item label-width="70px" label="车长" prop="requiredTruckLength">
                                <el-input placeholder="请输入车长" v-model="grabOrder.requiredTruckLength"><template slot="append">米</template></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-row>
            <el-form-item label="报价类型" prop="type">
                <el-radio-group v-model="grabOrder.type">
                    <el-radio label="Grab" value="Grab">定价抢单</el-radio>
                    <el-radio label="Offer" value="Offer">司机报价</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="一口价金额" v-if="grabOrder.type == 'Grab'" prop="freight">
                <el-input style="width:250px" placeholder="请输入..." v-model="grabOrder.freight"><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="运费支付方式" prop="payMode">
                <el-radio-group v-model="grabOrder.payMode">
                    <el-radio label="PayOnDelivery" value="PayOnDelivery">到付</el-radio>
                    <el-radio label="Prepay" value="Prepay">预付</el-radio>
                    <el-radio label="PayOnReceipt" value="PayOnReceipt">回单结</el-radio>
                    <el-radio label="PayByConsignee" value="PayByConsignee">收货方付</el-radio>
                    <el-radio label="PayMonthly" value="PayMonthly">月结</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="接单截止时间" prop="endDate">
                <el-date-picker 
                    format="yyyy-MM-dd HH"
                    v-model="grabOrder.endDate"
                    type="datetime" 
                    :clearable="false" 
                    value-format="timestamp"
                    :picker-options="{ disabledDate: (curDate) =>  new Date() > curDate}" >
                </el-date-picker>
            </el-form-item>
            <el-row style="margin-top:20px" class="text-center">
                <el-button @click="close" size="small">取消</el-button>
                <el-button type="primary" @click="publish" size="small">保存</el-button>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import { checkFloat2 } from '../../../common/valid'
import Dispatchbill from '../../../api/Dispatchbill'
import { arrayUnique } from '../../../common/utils'
export default {
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
            grabOrder: {
                requiredTruckType: '',
                requiredTruckLength: '',
                type: 'Grab',
                payMode: 'Prepay',
                endDate: '',
                freight: ''
            },
            rules: {
                requiredTruckLength: [{ validator: checkFloat2 }],
                type: [{ required: true , message: '请选择报价类型' }],
                freight: [{ required: true , message: '请输入一口价' }],
                payMode: [{ required: true , message: '请选择运费支付方式' }],
                endDate: [{ validator: (rule, value, callback) => {
                    if (value && value < new Date().getTime()) {
                        callback('时间不能早于当前时间')
                    } else {
                        callback()
                    }
                } }]
            }
        }
    },
    methods: {
        publish() {
            this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
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
                Dispatchbill.add({
                    dispatchTaskCargoList,
                    dispatchTaskList,
                    bizDispatchNodeList: this.transLines,
                    requiredTruckType: this.grabOrder.requiredTruckType,
                    requiredTruckLength: this.grabOrder.requiredTruckLength,
                    type: this.grabOrder.type,
                    freight: this.grabOrder.freight,
                    payMode: this.grabOrder.payMode,
                    endDate: this.grabOrder.endDate,
                    distance: this.totalDistance
                }, true).then(res => {
                    Message.success(res.data.msg)
                    this.$emit('cancel', true)
                })
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
</style>
