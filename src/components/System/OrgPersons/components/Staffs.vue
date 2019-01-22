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
                    @click="isSelectAdminVisible = true">
                    添加
                </el-button>
            </div>
            <div class="table">
                <el-table 
                    ref="roleTable" 
                    :data="tableData" 
                    border style="width: 100%" size="mini">
                    <el-table-column label="工号" prop="jobNumber" align="center"></el-table-column>
                    <el-table-column label="姓名" prop="realName" align="center"></el-table-column>
                    <el-table-column label="手机" prop="mobile" align="center"></el-table-column>
                    <el-table-column label="归属" prop="underOrganizationStr" align="center"></el-table-column>
                    <el-table-column label="来源" prop="comeFrom" align="center"></el-table-column>
                    <el-table-column label="职位" prop="jobPosition" align="center"></el-table-column>
                    <el-table-column label="组织中角色" prop="roleName" align="center"></el-table-column>
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
        <select-admin 
            :selected="tableData"
            :organizationID="organizationID" 
            :isVisible="isSelectAdminVisible" 
            @control="handSelectAdmin">
        </select-admin>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { baseMixin } from '../../../../common/mixin'
import SelectAdmin from './SelectAdmin'
import SelectRole from './SelectRole'
import Organization from '../../../../api/Organization'
import { deleteConfirm } from '../../../../common/utils'
export default {
    mixins: [baseMixin],
    components: { SelectAdmin, SelectRole },
    props: {
        organizationID: String | Number
    },
    data() {
        return {
            isSelectAdminVisible: false,
            isSelectRoleVisible: false,
            curMemberId: '',
            find: {
				keyword: ''
            }
        }
    },
    watch: {
        organizationID(val) {
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
        handSelectAdmin(data) {
            if (data) {
                const members = data.map(item => {
                    return { memberID: item.memberID }
                })
                this.addMembers(members)
            }
            this.isSelectAdminVisible = false
        },
        reset() {
            this.pageIndex = 1
            this.pageSize = 10
            this.find.keyword = ''
            this.getList()
        },
        addMembers(members) {
            Organization.addMembers({
                id: this.organizationID,
                members
            }).then(res => {
                Message.success('成功！')
                this.getList()
            })
        },
        getList() {
            Organization.getOrganizationMember({
                current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
                organizationID: this.organizationID
            }).then(res => {
                this.tableData = res.records
                this.total = res.total
            })
        },
        del(memberID) {
            deleteConfirm(memberID, memberID => {
				Organization.removeMembers({
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
