<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">人员</div>
            <div class="search">
                <el-form :inline="true"  class="demo-form-inline"  size="small">
                    <el-form-item label="员工">
                        <el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button type="default" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableControl">
                <el-button 
                    type="default" 
                    size="mini" 
                    icon="el-icon-plus" 
                    @click="isSelectMemberVisible = true">
                    添加
                </el-button>
            </div>
            <div class="table">
                <el-table 
                    ref="roleTable" 
                    :data="tableData" 
                    v-loading="loading"
                    border style="width: 100%" size="mini">
                    <el-table-column label="工号" prop="jobNumber" align="center"></el-table-column>
                    <el-table-column label="姓名" min-width="100" :show-overflow-tooltip="true" prop="realName" align="center"></el-table-column>
                    <el-table-column label="手机" min-width="100" :show-overflow-tooltip="true" prop="mobile" align="center"></el-table-column>
                    <el-table-column label="归属" min-width="120" :show-overflow-tooltip="true" prop="underOrganizationStr" align="center"></el-table-column>
                    <el-table-column label="来源" prop="comeFrom" align="center"></el-table-column>
                    <el-table-column label="职位" prop="jobPosition" align="center"></el-table-column>
                    <el-table-column label="组织中角色" min-width="100" :show-overflow-tooltip="true" prop="roleName" align="center"></el-table-column>
                    <el-table-column label="操作" width="100" align="center" fixed="right">
                        <template slot-scope="scope" v-if="scope.row.allow">
                            <el-dropdown  @command="handleCommand"  trigger="click">
                                <el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item 
                                        :command="{type: 'role', id: scope.row.memberID}">
                                        角色
                                    </el-dropdown-item>
                                    <el-dropdown-item 
                                        :command="{type: 'delete', id: scope.row.memberID}">
                                        删除
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
            </div>
        </el-card>
        <select-role 
            :isVisible="isSelectRoleVisible" 
            :memberID="curMemberId" 
            :organizationID="organizationID" 
            @control="handSelectRole">
        </select-role>
        <select-member 
            :organizationID="organizationID" 
            :isVisible="isSelectMemberVisible" 
            @control="handSelectMember">
        </select-member>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { baseMixin } from '../../../../common/mixin'
import SelectMember from './SelectMember'
import SelectRole from './SelectRole'
import OrganizationMember from '../../../../api/OrganizationMember'
import { deleteConfirm } from '../../../../common/utils'
export default {
    mixins: [baseMixin],
    components: { SelectMember, SelectRole },
    props: {
        organizationID: String | Number
    },
    data() {
        return {
            isSelectMemberVisible: false,
            isSelectRoleVisible: false,
            curMemberId: '',
            find: {
				keyword: ''
            },
            hasAdd: []
        }
    },
    watch: {
        organizationID(val) {
            this.reset()
            this.getList()
        }
    },
    activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
    methods: {
        handleCommand(e) {
			if (e.type == 'role') {
				this.curMemberId = e.id
				this.isSelectRoleVisible = true
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
        },
        handSelectRole(bool) {
            this.isSelectRoleVisible = false
            bool && this.getList()
        },
        handSelectMember(data) {
            if (data) {
                const members = data.map(item => {
                    return { memberID: item.memberID }
                })
                this.addMembers(members)
            }
            this.isSelectMemberVisible = false
        },
        reset() {
            this.pageIndex = 1
            this.pageSize = 10
            this.find.keyword = ''
            this.getList()
        },
        addMembers(members) {
            OrganizationMember.add({
                id: this.organizationID,
                members
            }).then(res => {
                Message.success('成功！')
                this.getList()
            })
        },
        getList() {
            this.loading = true
            OrganizationMember.find({
                current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
                organizationID: this.organizationID
            }).then(res => {
                this.tableData = res.records
                this.total = res.total
                this.loading = false
            })
        },
        del(memberID) {
            deleteConfirm(memberID, memberID => {
				OrganizationMember.remove({
                    id: this.organizationID,
                    memberID
                }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			})
        }
    }
}
</script>

<style lang="stylus">

</style>
