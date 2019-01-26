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
                        <el-option 
                            v-for="item in orgs" 
                            :label="item.name" 
                            :value="item.id" 
                            :key="item.id">
                        </el-option>
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
        <table class="dialog-table">
            <thead>
                <tr>
                    <th width="60">选择</th>
                    <th>工号</th>
                    <th>姓名</th>
                    <th>手机</th>
                    <th>归属</th>
                    <th>职位</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData" :key="item.memberID" @click="handSelect(item)">
                    <td class="wf-check">
                        <span 
                            class="checkbox" 
                            :class="item.hasAdd ? 'disabled' : (selectedList.map(i => i.memberID).includes(item.memberID) ? 'selected' : '')">
                        </span>
                    </td>
                    <td align="center">{{item.jobNumber}}</td>
                    <td align="center">{{item.realName}}</td>
                    <td align="center">{{item.mobile}}</td>
                    <td align="center">{{item.underOrganizationStr}}</td>
                    <td align="center">{{item.jobPosition}}</td>
                </tr>
            </tbody>
        </table>
        <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
        <div class="section-block" v-if="selectedList.length > 0">
            <span class="block-title">已选择人员</span>
            <el-row class="block-content" style="padding-bottom: 15px">
                <el-tag
                    v-for="member in selectedList"
                    :key="member.memberID" size="small"
                    closable style="margin-right: 10px" @close="closeTag(member.memberID)">
                    {{member.realName}}
                </el-tag>
            </el-row>
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
import SysMember from '../../../../api/SysMember'
export default {
    mixins: [baseMixin],
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        organizationID: String | Number
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
                this.find.underOrganizationID = ''
                this.find.keyword = ''
                this.selectedList = []
                this.tableData = []
                this.total = 0
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
            SysMember.getCompanyOrgList().then(res => {
                this.orgs = res
            })
        },
        getList() {
            Organization.addibleMemList({
                current: this.pageIndex,
				size: this.pageSize,
                organizationID: this.organizationID,
                underOrganizationID: this.find.underOrganizationID,
                keyword: this.find.keyword
            }).then(res => {
                this.tableData = res.records
                this.total = res.total
            })
        },
        handSelect(data) {
            if (data.hasAdd) return
            const memberIDs = this.selectedList.map(item => item.memberID)
            const index = memberIDs.indexOf(data.memberID)
            if (index == -1) {
                this.selectedList.push(data)
            } else {
                this.selectedList.splice(index, 1)
            }
        },
        closeTag(id) {
            this.selectedList.splice(this.selectedList.map(item => item.memberID).indexOf(id), 1)
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
            &.disabled
                background-position -43px 0
</style>
