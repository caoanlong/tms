<template>
    <el-dialog 
        title="选择人员" 
        :visible.sync="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false" 
        width="70%" 
        :append-to-body="true">
        <div class="search">
            <el-form :inline="true" class="demo-form-inline" size="small">
                <el-form-item label="归属">
                    <el-select v-model="find.underOrganizationID">
                        <el-option v-for="item in orgs" :label="item.name" :value="item.id" :key="item.id"></el-option>
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
                ref="adminTable"
                :data="tableData" 
                @selection-change="selectChange" 
                border
                size="mini">
                <el-table-column 
                    label="选择" 
                    type="selection" 
                    align="center" 
                    :selectable="(row) => !row.hasAdd">
                </el-table-column>
                <el-table-column label="工号" prop="jobNumber" align="center" width="70"></el-table-column>
                <el-table-column label="姓名" prop="realName" align="center" width="100"></el-table-column>
                <el-table-column label="手机" prop="mobile" align="center"></el-table-column>
                <el-table-column label="归属" prop="underOrganizationStr" align="center"></el-table-column>
                <el-table-column label="职位" prop="jobPosition" align="center"></el-table-column>
            </el-table>
            <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { baseMixin } from '../../../../common/mixin'
import Organization from '../../../../api/Organization'
export default {
    mixins: [baseMixin],
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        organizationID: String | Number,
        selected: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            find: {
                underOrganizationID: '',
                keyword: ''
            },
            orgs: []
        }
    },
    watch: {
        isVisible(val) {
            if (val) {
                this.getList()
                this.getOrgs()
            }
        }
    },
    methods: {
        reset() {
            this.pageIndex = 1
            this.pageSize = 10
            this.find.underOrganizationID = ''
            this.find.keyword = ''
            this.getList()
        },
        getOrgs() {
            Organization.getCompanyOrg().then(res => {
                this.orgs = res
            })
        },
        getList() {
            Organization.addibleOrganizationMember({
                current: this.pageIndex,
				size: this.pageSize,
                organizationID: this.organizationID,
                underOrganizationID: this.find.underOrganizationID,
                keyword: this.find.keyword
            }).then(res => {
                this.tableData = res.records
                this.total = res.total
                this.selectedList = this.selected
            })
        },
        selectChange(data) {
            this.selectedList = data
        },
        add() {
            this.$emit('control', this.selectedList)
        },
        close() {
            this.$emit('control')
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
