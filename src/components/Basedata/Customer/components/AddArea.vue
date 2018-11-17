<template>
    <div>
        <el-dialog 
            title="添加监控区域" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="500px">
            <dist-picker :distList="selectedAreas" @hand-select="handSelectedArea"></dist-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close(false)">取 消</el-button>
                <el-button type="primary" @click="close(true)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import DistPicker from '../../../CommonComponents/DistPicker'
export default {
    components: { DistPicker },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        callback: Function
    },
    data() {
        return {
            selectedAreas: [],
        }
    },
    methods: {
        handSelectedArea(data) {
			this.selectedAreas = data || []
        },
        close(bool) {
            bool ? this.callback(this.selectedAreas) : this.callback()
            this.selectedAreas = []
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
