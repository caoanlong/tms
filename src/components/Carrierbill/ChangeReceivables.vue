<template>
    <el-dialog title="调整应收款" :visible.sync="visible" width="80%">
        <el-row>
            <el-col :span="8">
                <el-form label-width="100px">
                    <el-form-item label="发货单号">
                        <el-input v-model="carrierOrder.shipperNo"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form label-width="100px">
                    <el-form-item label="现付">
                        <el-input v-model="carrierOrder.cashAmount"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                    <el-form-item label="月结">
                        <el-input v-model="carrierOrder.monthlyAmount"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <el-form label-width="100px">
                    <el-form-item label="到付">
                        <el-input v-model="carrierOrder.codAmount"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                    <el-form-item label="收方到货付">
                        <el-input v-model="carrierOrder.consigneeAmount"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8">
                <el-form label-width="100px">
                    <el-form-item label="回单付">
                        <el-input v-model="carrierOrder.porAmount"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                    <el-form-item label="合计">
                        <el-input v-model="carrierOrderTotal" disabled><span slot="suffix">元</span></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-form label-width="100px">
                    <el-form-item label="其它">
                        <el-input v-model="carrierOrder.otherAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" resize="none" :rows="3" v-model="carrierOrder.remark"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        carrierOrder: {
            type: Object
        }
    },
    computed:{
		carrierOrderTotal() {
			return parseInt(this.carrierOrder.cashAmount) 
				+ parseInt(this.carrierOrder.codAmount) 
				+ parseInt(this.carrierOrder.porAmount) 
				+ parseInt(this.carrierOrder.monthlyAmount) 
				+ parseInt(this.carrierOrder.consigneeAmount)
		}
	},
    methods: {
        cancel() {
            this.$emit('callback', false)
        },
        sure() {
            this.$emit('callback', false, this.carrierOrder)
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>