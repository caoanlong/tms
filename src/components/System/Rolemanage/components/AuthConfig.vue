<template>
    <el-dialog title="权限设置" :visible.sync="showSetAuth" width="30%">
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
import SysRole from '../../../../api/SysRole'
function walkTree(tree, id, sets) {
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        // console.log(id)
        if (node.menuID == id && node.menuPID) {
            // console.log(node.menuPID)
            sets.add(node.menuPID)
        }
        if (node.children && node.children.length > 0) {
            walkTree(node.children, id, sets)
        }
    }
}
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
            const sets = new Set(this.selectedMenuId)
            for (let i = 0; i < this.selectedMenuId.length; i++) {
                const id = this.selectedMenuId[i]
                walkTree(this.menus, id, sets)
            }
            this.selectedMenuId = Array.from(sets)
            SysRole.addAuthority({
                roleID: this.setRoleID,
				menuIDs: this.selectedMenuId.join(',')
            }).then(res => {
                Message.success(res.data.msg)
                this.$emit('selected-auth', true)
            })
        },
		getAllMenus() {
            SysRole.findMenuList({ roleID: this.setRoleID }).then(res => {
                this.menus = res.menuList
                this.selectedMenuId = res.menuIDList
            })
		},
        selectMenu(data, isSelected) {
			if (isSelected) {
                this.selectedMenuId.push(data.menuID)
			} else {
				this.selectedMenuId.splice(this.selectedMenuId.indexOf(data.menuID), 1)
            }
		}
    }
}
</script>

<style lang="stylus" scoped>

</style>
