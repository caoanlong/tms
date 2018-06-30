<template>
    <el-dialog title="权限设置" :visible.sync="showSetAuth" width="30%">
        <el-tree
            :data="menus"
            show-checkbox
            default-expand-all
            node-key="Menu_ID"
            ref="tree"
            highlight-current
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
import Menu from '../../../../api/Menu'
import SysRole from '../../../../api/SysRole'
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
				label: 'Name'
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
            SysRole.updateMenu({
                Role_ID: this.setRoleID,
				sys_menus: this.selectedMenuId
            }).then(res => {
                Message.success(res.data.msg)
                this.$emit('selected-auth', true)
            })
        },
        // 获取当前角色详情包含关联的菜单
		getRole(Role_ID) {
            SysRole.findById({ Role_ID }).then(res => {
                const menuIDs = res.sys_menus.map(item => item.Menu_ID)
                for (let i = 0; i < menuIDs.length; i++) {
                    this.$refs.tree.setChecked(menuIDs[i], true)
                }
            })
		},
		getAllMenus() {
            Menu.findAll().then(res => {
                this.menus = res
                this.getRole(this.setRoleID)
            })
		},
        selectMenu(data, isSelected) {
			if (isSelected) {
				this.selectedMenuId.push(data.Menu_ID)
			} else {
				this.selectedMenuId.splice(this.selectedMenuId.indexOf(data.Menu_ID), 1)
			}
		}
    }
}
</script>

<style lang="stylus" scoped>

</style>
