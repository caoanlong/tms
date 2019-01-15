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
                    @click="isAddStaffVisible = true">
                    添加
                </el-button>
            </div>
            <div class="table">
                <el-table 
                    ref="roleTable" 
                    :data="tableData" 
                    border style="width: 100%" size="mini">
                    <el-table-column label="编号" type="index" width="50" align="center"></el-table-column>
                    <el-table-column label="角色名称" prop="roleName" align="center"></el-table-column>
                    <el-table-column label="权限英文" prop="permission" align="center"></el-table-column>
                    <el-table-column label="角色类型" prop="roleType" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.roleType == 'SysSuperAdmin'">系统管理员</span>
                            <span v-else-if="scope.row.roleType == 'SysAdmin'">系统角色</span>
                            <span v-else-if="scope.row.roleType == 'SysMember'">自定义角色</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="100" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-dropdown  @command="handleCommand"  trigger="click">
                                <el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item 
                                        :command="{type: 'role', id: scope.row.roleID}">
                                        角色
                                    </el-dropdown-item>
                                    <el-dropdown-item 
                                        :command="{type: 'delete', id: scope.row.roleID}" 
                                        v-if="scope.row.roleType != 'SysAdmin'">
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
        <add-staff :isVisible="isAddStaffVisible" @control="handAddStaff"></add-staff>
        <select-role :isVisible="isSelectRoleVisible" :memberId="curMemberId" @control="handSelectRole"></select-role>
    </div>
</template>

<script>
import { baseMixin } from '../../../../common/mixin'
import AddStaff from './AddStaff'
import SelectRole from './SelectRole'
export default {
    mixins: [baseMixin],
    components: { AddStaff, SelectRole },
    data() {
        return {
            isAddStaffVisible: false,
            isSelectRoleVisible: false,
            curMemberId: '',
            find: {
				keyword: ''
            },
            tableData: [
                {
                    roleName: '管理员',
                    permission: 'gly',
                    roleType: 'SysAdmin'
                }
            ]
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
        handAddStaff() {
            this.isAddStaffVisible = false
        },
        handSelectRole() {
            this.isSelectRoleVisible = false
        }
    }
}
</script>

<style lang="stylus">

</style>
