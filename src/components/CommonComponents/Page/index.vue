<template>
    <el-row type="flex">
        <el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
            <span>总共 {{total}} 条记录每页显示</span>
            <el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSizeX" @change="pageSizeChange">
                <el-option label="10" :value="10"></el-option>
                <el-option label="20" :value="20"></el-option>
                <el-option label="30" :value="30"></el-option>
                <el-option label="40" :value="40"></el-option>
                <el-option label="50" :value="50"></el-option>
                <el-option label="100" :value="100"></el-option>
            </el-select>
            <span>条记录</span>
        </el-col>
        <el-col :span="12">
            <div class="pagination">
                <el-pagination 
                    :page-size="pageSize" 
                    align="right" 
                    background layout="prev, pager, next" 
                    :total="total" 
                    :current-page.sync="pageIndexX" 
                    @current-change="pageChange">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        total: Number,
        pageSize: Number,
        pageIndex: Number
    },
    data() {
        return {
            pageIndexX: 1,
            pageSizeX: 10
        }
    },
    watch: {
        pageIndex(newVal) {
            this.pageIndexX = newVal
        },
        pageSize(newVal) {
            this.pageSizeX = newVal
        }
    },
    methods: {
        pageChange(index) {
            this.$emit('pageChange', index)
        },
        pageSizeChange(size) {
            this.$emit('pageSizeChange', size)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
