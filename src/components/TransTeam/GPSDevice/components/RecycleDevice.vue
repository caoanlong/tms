<template>
    <div>
        <el-dialog 
            title="回收GPS设备" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
            <el-form label-width="120px" ref="ruleForm" size="small">
                <el-form-item label="终端号" prop="snNo">
                    <p>{{gpdDevice.snNo}}</p>
                </el-form-item>
                <el-form-item label="车牌" prop="plateNo">
                    <p>{{gpdDevice.plateNo}}</p>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="recycle">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
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
            }
        }
    },
    methods: {
        recycle() {

        },
        close() {
            this.$refs['ruleForm'].resetFields()
            this.$emit('control')
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 32px
		font-family 'sans-serif'
		line-height 32px
		color #999
	.el-input__inner
		vertical-align top	
</style>
