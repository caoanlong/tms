<template>
    <el-dialog title="发布派车单" 
        :visible="isVisible" 
        custom-class="dispatch-order-dialog" 
        :show-close="true" 
        :fullscreen="true" 
        :modal="false"
        :close-on-press-escape="false" 
        :close-on-click-modal="false" 
        @close="close">
        <el-form size="small">
            <div class="num-info">
                <span class="num-tit">配载总量</span>
                <span class="num-label"><span>数</span>{{totalNum}}</span>
                <span class="num-label"><span>重</span>{{totalWeight}}</span>
                <span class="num-label"><span>体</span>{{totalVolume}}</span>
            </div>
            <div class="num-info">
                <span class="num-tit">预计里程{{totalDistance}}公里</span>
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
                            <td align="center"><span class="add-btn">+ 添加车辆</span></td>
                            <td align="center"><span class="add-btn">+ 添加驾驶员</span></td>
                            <td align="center"><span class="add-btn">+ 添加随行人员</span></td>
                        </tr>
                    </tbody>
                </table>
            </el-row>
            <el-row>
                <table class="dialog-table">
                    <caption>任务运费&支付方式</caption>
                    <thead>
                        <tr>
                            <th>费用科目</th>
                            <th>费用类型</th>
                            <th>收款人</th>
                            <th>支付方式</th>
                            <th>金额</th>
                            <th><span class="add-btn">+ 添加费用</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td align="center"></td>
                            <td align="center"></td>
                            <td align="center"></td>
                            <td align="center"></td>
                            <td align="center"></td>
                            <td align="center"><span class="del-btn">删除</span></td>
                        </tr>
                    </tbody>
                </table>
            </el-row>
            <div class="num-info">
                <span class="num-tit">总运费：{{totalFreight}}元</span>
            </div>
            <el-row>
                <el-form-item label="接单截止时间">
                    <el-date-picker type="date" :clearable="false" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
            </el-row>
            <el-row style="margin-top:20px">
                <el-col :span="24">
                    <el-form-item label-width="0" class="text-center">
                        <el-button @click="close">取消</el-button>
                        <el-button type="primary">&nbsp;&nbsp;&nbsp;发布&nbsp;&nbsp;&nbsp;</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
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
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            totalFreight: 0
        }
    },
    methods: {
        close() {
            this.$emit('cancel')
        }
    }
}
</script>
<style lang="stylus" scoped>
.dispatch-order-dialog
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
        font-size 14px
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

