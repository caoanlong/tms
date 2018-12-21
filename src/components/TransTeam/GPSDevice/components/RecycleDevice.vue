<template>
    <div>
        <el-dialog 
            title="回收GPS设备" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
            <el-form label-width="120px" ref="ruleForm" size="small">
                <el-form-item label="终端号">
                    <p>{{gpdDevice.deviceNumber}}</p>
                </el-form-item>
                <el-form-item label="车牌">
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
import { Message } from 'element-ui'
import DriverPortalGpsSetupLog from '../../../../api/DriverPortalGpsSetupLog'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        gpdDevice: Object
    },
    methods: {
        recycle() {
            DriverPortalGpsSetupLog.update({portalGpsLogID: this.gpdDevice.portalGpsLogID}).then(res => {
                Message.success('回收成功！')
                this.close()
            })
        },
        close() {
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
