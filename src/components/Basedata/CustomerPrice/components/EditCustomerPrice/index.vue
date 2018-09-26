<template>
    <div>
        <el-dialog 
            title="委托方价格" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
            <div class="entruster">
                <span class="title">委托方</span>
                <span class="info">{{price.companyName}}</span>
            </div>
            <el-form label-width="120px" :model="price" :rules="rules" ref="ruleForm" size="small">
                <el-row :gutter="20">
                    <div class="section-block" style="min-height:120px">
                        <span class="block-title">对客户应收运价</span>
                        <el-row class="block-content">
                            <el-form-item label="吨公里" prop="receivableWeightUnitPrice">
                                <el-input v-model="price.receivableWeightUnitPrice" placeholder="请输入...">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="方公里" prop="receivableVolumnUnitPrice">
                                <el-input v-model="price.receivableVolumnUnitPrice" placeholder="请输入...">
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
                            <el-form-item label="吨公里" prop="payableWeightUnitPrice">
                                <el-input v-model="price.payableWeightUnitPrice" placeholder="请输入...">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="方公里" prop="payableVolumnUnitPrice">
                                <el-input v-model="price.payableVolumnUnitPrice" placeholder="请输入...">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </div>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import Company from '../../../../../api/Company'
import { checkFloat2 } from '../../../../../common/valid'
export default {
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
            bool && this.getInfo()
        }
    },
    data() {
        return {
            price: {},
			rules: {
				receivableWeightUnitPrice: [
                    {required: true, message: '请输入对客户应收运价/吨公里'}, {validator: checkFloat2}
                ],
                receivableVolumnUnitPrice: [
                    {required: true, message: '请输入对客户应收运价/方公里'}, {validator: checkFloat2}
                ],
				payableWeightUnitPrice: [
                    {required: true, message: '请输入对司机支付运价/吨公里'}, {validator: checkFloat2}
                ],
				payableVolumnUnitPrice: [
                    {required: true, message: '请输入对司机支付运价/方公里'}, {validator: checkFloat2}
                ]
			}
        }
    },
    methods: {
        getInfo() {
            Company.customer().findById({ customerID: this.customerID }).then(res => {
                this.price = res
            })
        },
		save() {
			this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                Company.customer().update(this.price).then(res => {
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
.entruster
    height 40px
    line-height 40px
    .title
        psaveing-right 10px
    .info
        font-weight bold
</style>
