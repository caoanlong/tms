<template>
    <el-dialog title="权限设置" :visible.sync="showSetAuth" :show-close="false" :close-on-click-modal="false" width="30%">
        <el-tree 
            :data="menus"
            show-checkbox
            default-expand-all
            node-key="menuID"
            ref="tree"
            highlight-current 
            :default-checked-keys="selectedMenuId"
            :props="defaultProps"
            @check-change="selectMenu" style="height:400px;overflow-y:auto">
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelAuth">取 消</el-button>
            <el-button type="primary" @click="submitSetAuth">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import SysRoleMenu from '../../../../api/SysRoleMenu'
export default {
    props: {
        showSetAuth: {
            type: Boolean,
            default: false
        },
        setRoleID: {
            type: String,
        }
    },
    data() {
        return {
            menus: [],
            selectedMenuId: [],
            defaultProps: {
				children: 'children',
				label: 'name'
			}
        }
    },
    watch: {
        showSetAuth(newVal) {
            newVal && this.getAllMenus()
        }
    },
    methods: {
        cancelAuth() {
            this.$emit('selected-auth')
        },
        submitSetAuth() {
            SysRoleMenu.update({
                roleID: this.setRoleID,
				menuIDs: this.selectedMenuId.join(',')
            }).then(res => {
                Message.success('成功！')
                this.$emit('selected-auth', true)
            })
        },
		getAllMenus() {
            SysRoleMenu.find({ roleID: this.setRoleID }).then(res => {
                this.menus = res.menuList
                this.selectedMenuId = res.menuIDList
            })
		},
        selectMenu(data, isSelected) {
            this.selectedMenuId = this.$refs['tree'].getCheckedKeys()
		}
    }
}
</script>

<style lang="stylus" scoped>

</style>
