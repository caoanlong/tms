<template>
    <el-dialog title="选择角色" :visible.sync="showSelectRole" :show-close="false" :close-on-click-modal="false" width="600px">
        <el-table 
            ref="roleTable"
            :data="roles" 
            height="250"
            @selection-change="selectRoleChange" 
            border style="width: 100%;max-height:400px" 
            size="mini">
            <el-table-column type="selection" align="center" :selectable="(row) => row.roleType != 'SysSuperAdmin'"></el-table-column>
            <el-table-column label="角色" prop="roleName"></el-table-column>
            <el-table-column label="拥有权限">
                <template slot-scope="scope">
                    <span v-if="scope.row.roleType == 'SysSuperAdmin'">全部</span>
                    <span v-else>{{scope.row.num}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="section-block" v-if="selectedRoles.length > 0">
            <span class="block-title">已配置角色</span>
            <el-row class="block-content" style="padding-bottom: 15px">
                <el-tag
                    v-for="role in selectedRoles"
                    :key="role.roleID" size="small"
                    closable style="margin-right: 10px" @close="closeTag(role.roleID)">
                    {{role.roleName}}
                </el-tag>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelRole">取 消</el-button>
            <el-button type="primary" @click="submitSetRole">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { Message } from 'element-ui'
import SysRoleMember from '../../../../api/SysRoleMember'
export default {
    props: {
        showSelectRole: {
            type: Boolean,
            default: false
        },
        memberID: {
            type: String,
        }
    },
    data() {
        return {
            roles: [],
            selectedRoles: []
        }
    },
    watch: {
        showSelectRole(newVal) {
            this.getRoleList()
        }
    },
    methods: {
        cancelRole() {
            this.$emit('selected-role')
        },
        submitSetRole() {
            SysRoleMember.modifyRole({
                roleIDs: this.selectedRoles.map(item => item.roleID).join(','),
                memberID: this.memberID
            }).then(res => {
                Message.success('成功！')
                this.$emit('selected-role', true)
            })
        },
        selectRoleChange(data) {
            this.selectedRoles = data
        },
        closeTag(id) {
            this.selectedRoles.splice(this.selectedRoles.map(item => item.roleID).indexOf(id), 1)
            const list = Array.from(this.selectedRoles)
            this.$refs.roleTable.clearSelection()
            list.forEach(row => {
                this.$refs.roleTable.toggleRowSelection(row)
            })
        },
        getRoleList() {
            this.roles = []
            SysRoleMember.roleList({
                size: 1000,
                memberID: this.memberID
            }).then(res => {
                this.roles = res.data.data
                this.selectedRoles = this.roles.filter(item => item.hasRole)
                this.$nextTick(() => {
                    this.selectedRoles.forEach(row => {
                        this.$refs.roleTable.toggleRowSelection(row)
                    })
                })
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
