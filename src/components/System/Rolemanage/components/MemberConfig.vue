<template>
    <el-dialog title="分配用户" :visible.sync="showSetMember" :show-close="false" :close-on-click-modal="false" width="600px">
        <el-table 
            ref="memberTable"
            :data="members" 
            height="400"
            @selection-change="selectMemberChange" 
            border style="width: 100%" 
            size="mini">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="姓名" prop="realName"></el-table-column>
            <el-table-column label="手机" prop="mobile"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelMember">取 消</el-button>
            <el-button type="primary" @click="submitSetMember">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { Message } from 'element-ui'
import SysRole from '../../../../api/SysRole'
export default {
    props: {
        showSetMember: {
            type: Boolean,
            default: false
        },
        setRoleID: {
            type: String,
        }
    },
    data() {
        return {
            members: [],
            selectedMembers: []
        }
    },
    watch: {
        showSetMember(newVal) {
            this.getMembers()
        }
    },
    methods: {
        cancelMember() {
            this.$emit('selected-mem')
        },
        submitSetMember() {
            SysRole.addMember({
                roleID: this.setRoleID,
				memIDs: this.selectedMembers.map(item => item.memberID).join(',')
            }).then(res => {
                Message.success(res.data.msg)
                this.$emit('selected-mem', true)
            })
        },
        selectMemberChange(data) {
            this.selectedMembers = data
		},
		getMembers() {
            SysRole.findMemberList({ roleID: this.setRoleID}).then(res => {
                this.members = res.memList
                this.selectedMembers = this.members.filter(item => item.checked == 'Y')
                this.$nextTick(() => {
                    this.selectedMembers.forEach(row => {
                        console.log(row.realName)
                        this.$refs.memberTable.toggleRowSelection(row)
                    })
                })
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
