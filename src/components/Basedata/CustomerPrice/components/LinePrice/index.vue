<template>
    <div>
        <el-dialog 
            width="70%"
            title="线路定价" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
            <div class="entruster">
                <span class="title">委托方</span>
                <span class="info">{{price.entruster}}</span>
            </div>
            <el-form label-width="120px" :model="price" :rules="rules" ref="ruleForm" size="small">
                <el-row :gutter="20">
                    <div class="section-block" style="min-height:120px">
                        <span class="block-title">对客户应收运价</span>
                        <el-row class="block-content">
                            <el-form-item label="吨公里" prop="recWeightPrice">
                                <el-input v-model="price.recWeightPrice" placeholder="请输入...">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="方公里" prop="recVolumnPrice">
                                <el-input v-model="price.recVolumnPrice" placeholder="请输入...">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </div>
                </el-row>
                <el-row :gutter="20">
                    <div class="section-block" style="min-height:120px">
                        <span class="block-title">对司机支付运价</span>
                        <el-row class="block-content">
                            <el-form-item label="吨公里" prop="payWeightPrice">
                                <el-input v-model="price.payWeightPrice" placeholder="请输入...">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="方公里" prop="payVolumnPrice">
                                <el-input v-model="price.payVolumnPrice" placeholder="请输入...">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </div>
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
import { checkFloat2 } from '../../../../../common/valid'
export default {
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
            price: {
				entruster: '神州贸易有限公司',
                recWeightPrice: '0.5',
                recVolumnPrice: '1.5',
                payWeightPrice: '0.45',
                payVolumnPrice: '1.35'
            },
			rules: {
				recWeightPrice: [{required: true, message: '请输入对客户应收运价/吨公里'}, {validator: checkFloat2}],
                recVolumnPrice: [{required: true, message: '请输入对客户应收运价/方公里'}, {validator: checkFloat2}],
				payWeightPrice: [{required: true, message: '请输入对司机支付运价/吨公里'}, {validator: checkFloat2}],
				payVolumnPrice: [{required: true, message: '请输入对司机支付运价/方公里'}, {validator: checkFloat2}]
			}
        }
    },
    methods: {
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
.entruster
    height 40px
    line-height 40px
    .title
        padding-right 10px
    .info
        font-weight bold
</style>
