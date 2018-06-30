<template>
    <el-dialog title="分配用户" :visible.sync="showSetStaff" width="600px">
        <el-table 
            ref="usersTable"
            :data="staffs" 
            height="400"
            @selection-change="selectStaffChange" 
            border style="width: 100%" 
            size="mini">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="姓名" prop="RealName"></el-table-column>
            <el-table-column label="手机" prop="Mobile"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelStaff">取 消</el-button>
            <el-button type="primary" @click="submitSetStaff">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { Message } from 'element-ui'
import ComStaff from '../../../../api/ComStaff'
import SysRole from '../../../../api/SysRole'
export default {
    props: {
        showSetStaff: {
            type: Boolean,
            default: false
        },
        setRoleID: {
            type: String,
        }
    },
    data() {
        return {
            staffs: [],
            selectedStaffs: []
        }
    },
    watch: {
        showSetStaff(newVal) {
            newVal && this.getStaffs()
        }
    },
    methods: {
        cancelStaff() {
            this.$emit('selected-staff')
        },
        submitSetStaff() {
            const Staff_IDs = this.selectedStaffs.map(item => item.Staff_ID)
            SysRole.updateUser({
                Role_ID: this.setRoleID,
				sys_users: Staff_IDs
            }).then(res => {
                Message.success(res.data.msg)
                this.$emit('selected-staff', true)
            })
        },
        selectStaffChange(data) {
			this.selectedStaffs = data
		},
		getStaffs() {
            ComStaff.find({ pageSize: 1000 }).then(res => {
                this.staffs = res.rows
                this.getRole(this.setRoleID)
            })
        },
        // 获取当前角色详情包含关联的员工
		getRole(Role_ID) {
            SysRole.findById({ Role_ID }).then(res => {
                const Staff_IDs = res.com_staffs.map(item => item.Staff_ID)
                const staffs = this.staffs.filter(item => Staff_IDs.includes(item.Staff_ID))
                staffs.forEach(staff => {
                    this.$refs.usersTable.toggleRowSelection(staff, true)
                })
            })
		},
    }
}
</script>

<style lang="stylus" scoped>

</style>
