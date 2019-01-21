<template>
    <el-dialog 
        title="选择角色" 
        :visible.sync="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false" 
        width="600px" 
        :append-to-body="true">
        <table class="dialog-table">
            <thead>
                <tr>
                    <th width="60">选择</th>
                    <th>角色</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData" :key="item.roleID" @click="handSelect(item)">
                    <td class="wf-check">
                        <span 
                            class="checkbox" 
                            :class="selectedList.map(i => i.roleID).includes(item.roleID) ? 'selected' : ''">
                        </span>
                    </td>
                    <td align="center" class="link">{{item.roleName}}</td>
                </tr>
            </tbody>
        </table>
        <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
        <div class="section-block" v-if="selectedList.length > 0">
            <span class="block-title">已配置角色</span>
            <el-row class="block-content" style="padding-bottom: 15px">
                <el-tag
                    v-for="role in selectedList"
                    :key="role.roleID" size="small"
                    closable style="margin-right: 10px" @close="closeTag(role.roleID)">
                    {{role.roleName}}
                </el-tag>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submitSetRole">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { Message } from 'element-ui'
import { baseMixin } from '../../../../common/mixin'
import Organization from '../../../../api/Organization'
export default {
    mixins: [baseMixin],
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        memberID: String | Number,
        organizationID: String | Number
    },
    watch: {
        isVisible(val) {
            val && this.getList()
        }
    },
    methods: {
        close() {
            this.$emit('control')
        },
        submitSetRole() {
            Organization.setMemberRole({
                roleIDs: this.selectedList.map(item => item.roleID),
                memberID: this.memberID,
                organizationID: this.organizationID
            }).then(res => {
                Message.success('成功！')
                this.$emit('control', true)
            })
        },
        handSelect(data) {
            const roleIDs = this.selectedList.map(item => item.roleID)
            const index = roleIDs.indexOf(data.roleID)
            if (index == -1) {
                this.selectedList.push(data)
            } else {
                this.selectedList.splice(index, 1)
            }
        },
        closeTag(id) {
            this.selectedList.splice(this.selectedList.map(item => item.roleID).indexOf(id), 1)
        },
        getList() {
            Organization.addibleRoleList({
                current: this.pageIndex,
				size: this.pageSize,
                memberID: this.memberID,
                organizationID: this.organizationID
            }).then(res => {
                this.tableData = res.records
                this.total = res.total
                this.selectedList = this.tableData.filter(item => item.hasAdd)
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.dialog-table
    font-size 12px
    background #dcdfe6
    border-spacing 1px
    width 100%
    th
        background #f2f2f2
        color #666
        padding 10px 15px
    td
        padding 10px 15px
        background #fff
    .wf-check
        position relative
        text-align center
        .checkbox
            display block
            width 14px
            height 14px
            margin 0 auto
            background url("../../../../assets/imgs/checkbox.png") no-repeat 0 0
            cursor pointer
            &:hover
                background-position -14px 0
            &.selected
                background-position -28px 0
</style>
