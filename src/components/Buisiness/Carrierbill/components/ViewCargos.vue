<template>
    <el-dialog title="查看货物" :visible.sync="visible" width="80%">
        <el-form label-width="100px">
            <el-form-item label="装车照片">
                <ImageUpload :limitNum="10"></ImageUpload>
            </el-form-item>
            <el-form-item label="到货照片">
                <ImageUpload :limitNum="10"></ImageUpload>
            </el-form-item>
            <el-form-item label="回单照片">
                <ImageUpload :limitNum="10"></ImageUpload>
            </el-form-item>
            <el-form-item label="异常上报">
                <ImageUpload :limitNum="10"></ImageUpload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">返回</el-button>
        </div>
    </el-dialog>
</template>
<script>
import ImageUpload from '../../../CommonComponents/ImageUpload'
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            photos: {}
        }
    },
    components: {
        ImageUpload
    },
    created() {
    },
    methods: {
        cancel() {
            this.$emit('callback', false)
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>


