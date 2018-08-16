<template>
    <el-dialog 
        title="发布抢单" 
        :visible="isVisible" 
        :show-close="false"
        :close-on-press-escape="false" 
        :close-on-click-modal="false">
        <el-form label-width="100px" size="small" :model="grabOrder" :rules="rules" ref="ruleForm">
           <div class="num-info">
                <span class="num-tit">配载总量</span>
                <span class="num-label"><span>数</span>{{totalNum}}</span>
                <span class="num-label"><span>重</span>{{totalWeight}}</span>
                <span class="num-label"><span>体</span>{{totalVolume}}</span>
            </div>
            <div class="num-info">
                <span class="num-tit">
                    {{transLines.filter(item => item.type == '装车').length}}装
                    {{transLines.filter(item => item.type == '卸货').length}}卸
                    &nbsp;&nbsp;预计里程{{totalDistance}}公里
                </span>
            </div>
            <el-row class="section-block">
                <span class="block-title">用车需求</span>
                <div class="block-content">
                    <el-row :gutter="20">
						<el-col :span="12">
                            <el-form-item label-width="70px" label="车型">
                                <el-select placeholder="请选择车型" v-model="grabOrder.truckType">
                                    <el-option value="车型1" label="车型1"></el-option>
                                    <el-option value="车型2" label="车型2"></el-option>
                                    <el-option value="车型3" label="车型3"></el-option>
                                </el-select>
                            </el-form-item>
						</el-col>
                        <el-col :span="12">
                            <el-form-item label-width="70px" label="车长" prop="truckLength">
                                <el-input placeholder="请输入车长" v-model="grabOrder.truckLength"><template slot="append">米</template></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-row>
            <el-row>
                <el-form-item label="报价类型">
                    <el-radio-group v-model="grabOrder.priceType">
                        <el-radio label="司机报价">司机报价</el-radio>
                        <el-radio label="定价抢单">定价抢单</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="运费支付方式">
                    <el-radio-group v-model="grabOrder.payMethod">
                        <el-radio label="预付">预付</el-radio>
                        <el-radio label="到付">到付</el-radio>
                        <el-radio label="收货方付">收货方付</el-radio>
                        <el-radio label="回单结">回单结</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="接单截止时间">
                    <el-date-picker 
                        v-model="grabOrder.endTime"
                        type="date" 
                        :clearable="false" 
                        value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
            </el-row>
            <el-row style="margin-top:20px" class="text-center">
                <el-form-item>
                    <el-button @click="close" size="small">取消</el-button>
                    <el-button type="primary" @click="publish" size="small">保存</el-button>
                </el-form-item>
            </el-row>
            
        </el-form>
    </el-dialog>
</template>

<script>
import { checkFloat2 } from '../../../common/valid'
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
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            grabOrder: {
                truckType: '',
                truckLength: '',
                priceType: '司机报价',
                payMethod: '预付',
                endTime: ''
            },
            rules: {
                truckLength: [{ validator: checkFloat2 }]
            }
        }
    },
    methods: {
        publish() {
            this.$refs['ruleForm'].validate(valid => {
                console.log(valid)
                if (!valid) return
                this.close()
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
