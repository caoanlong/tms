<template>
    <el-dialog 
        title="选择角色" 
        :visible.sync="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false" 
        width="600px" 
        :append-to-body="true">
        <el-table 
            ref="roleTable"
            :data="roles" 
            height="250"
            @selection-change="selectRoleChange" 
            border style="width: 100%;max-height:400px" 
            size="mini">
            <el-table-column type="selection" align="center" :selectable="(row) => row.roleType != 'SysSuperAdmin'"></el-table-column>
            <el-table-column label="角色" prop="roleName"></el-table-column>
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
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submitSetRole">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { Message } from 'element-ui'
import SysMemRole from '../../../../api/SysMemRole'
export default {
    props: {
        isVisible: {
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
        isVisible(newVal) {
            this.getRoleList()
        }
    },
    methods: {
        close() {
            this.$emit('control')
        },
        submitSetRole() {
            SysMemRole.update({
                roleIDs: this.selectedRoles.map(item => item.roleID).join(','),
                memberID: this.memberID
            }).then(res => {
                Message.success('成功！')
                this.$emit('control', true)
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
            SysMemRole.find({
                size: 1000,
                memberID: this.memberID
            }).then(res => {
                this.roles = res
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
