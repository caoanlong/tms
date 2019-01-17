<template>
    <el-dialog 
        title="选择角色" 
        :visible.sync="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false" 
        width="70%" 
        :append-to-body="true">
        <div class="search">
            <el-form :inline="true" class="demo-form-inline" size="small">
                <el-form-item label="归属">
                    <el-select v-model="find.type">
                        <el-option label="云南事业部" value="云南事业部"></el-option>
                        <el-option label="武汉事业部" value="武汉事业部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工">
                    <el-input placeholder="工号/名字/手机号" v-model="find.keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="default" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table 
                ref="roleTable"
                :data="tableData" 
                height="250"
                @selection-change="selectChange" 
                border style="width: 100%;max-height:400px" 
                size="mini">
                <el-table-column 
                    label="选择" 
                    type="selection" 
                    align="center" 
                    :selectable="(row) => row.roleType != 'SysSuperAdmin'">
                </el-table-column>
                <el-table-column label="工号" prop="roleName"></el-table-column>
                <el-table-column label="姓名" prop="roleName"></el-table-column>
                <el-table-column label="手机" prop="roleName"></el-table-column>
                <el-table-column label="归属" prop="roleName"></el-table-column>
                <el-table-column label="职位" prop="roleName"></el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { baseMixin } from '../../../../common/mixin'
export default {
    mixins: [baseMixin],
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            find: {
                type: '',
                keyword: ''
            }
        }
    },
    methods: {
        selectChange(data) {
            this.selectedList = data
        },
        add() {
            this.close()
        },
        close() {
            this.$emit('control')
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
