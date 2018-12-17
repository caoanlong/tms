<template>
    <div>
        <el-dialog 
            title="新增GPS设备" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
            <el-form label-width="120px" :model="gpdDevice" :rules="rules" ref="ruleForm" size="small">
                <el-form-item label="终端号" prop="snNo">
                    <el-input v-model="gpdDevice.snNo" placeholder="请输入终端号"></el-input>
                </el-form-item>
                <el-form-item label="车牌" prop="plateNo">
                    <el-input v-model="gpdDevice.plateNo" placeholder="请输入车牌号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="add">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { checkPlateNoNew } from '../../../../common/valid'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            gpdDevice: {
                snNo: '',
                plateNo: ''
            },
            rules: {
				snNo: [{required: true, message: '请输入终端号'}],
				plateNo: [{required: true, message: '请输入车牌号'}, {validator: checkPlateNoNew}]
			}
        }
    },
    methods: {
        add() {
            this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				// Company.customerAddressAdd(this.companyAddress).then(res => {
                //     Message.success('保存成功！')
                //     this.close()
				// })
			})
        },
        close() {
            this.$refs['ruleForm'].resetFields()
            this.$emit('control')
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
