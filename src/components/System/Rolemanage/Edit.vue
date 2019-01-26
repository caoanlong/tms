<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑角色</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form label-width="120px" :model="role" :rules="rules" ref="ruleForm">
						<el-form-item label="角色名称" prop="roleName">
							<el-input placeholder="请输入..." v-model="role.roleName"></el-input>
						</el-form-item>
                        <el-form-item label="权限英文" prop="roleEnName">
							<el-input placeholder="请输入..." v-model="role.roleEnName"></el-input>
						</el-form-item>
                        <el-form-item label="权限菜单">
                            <el-row style="border: 1px solid #dedede">
                                <el-tree 
                                    ref="tree"
                                    :data="menus" 
                                    :props="defaultProps" 
                                    node-key="id"
                                    show-checkbox 
                                    highlight-current 
                                    :default-checked-keys="selectedMenuIds"
                                    @check="handleCheckChange" 
                                    @check-change="selectMenu">
                                </el-tree>
                            </el-row>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import SysRole from '../../../api/SysRole'
import SysRoleMenu from '../../../api/SysRoleMenu'
export default {
    data() {
        return {
            menus: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            selectedMenuIds: [],
            selected: [],
            role: {
                roleName: '',
                roleEnName: ''
            },
            currentRoleID: '',
            rules: {
                roleName: [
                    {required: true, message: '请输入角色名称'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符'}
                ],
                roleEnName: [{required: true, message: '请输入权限英文'}]
            }
        }
    },
    created() {
        if(this.$route.query.cache) {
            this.currentRoleID = this.$route.query.roleID
            this.getInfo()
            this.getMenus()
        }
    },
    activated() {
		if(!this.$route.query.cache) {
            this.selected = []
            this.currentRoleID = this.$route.query.roleID
            this.getInfo()
            this.getMenus()
		}
	},
    methods: {
        handleCheckChange(data, checked, indeterminate) {
            const checkedKeys = this.$refs['tree'].getCheckedKeys()
            const halfCheckedKeys = this.$refs['tree'].getHalfCheckedKeys()
            checkedKeys.push(...halfCheckedKeys)
            this.selected = Array.from(new Set(checkedKeys))
        },
        getInfo() {
            SysRole.findById({ roleID: this.currentRoleID }).then(res => {
                this.role = res
            })
        },
        getMenus() {
            SysRoleMenu.find({ roleID: this.currentRoleID }).then(res => {
                const { menuList, menuIDList } = res
                this.menus = menuList
                this.selectedMenuIds = menuIDList
            })
        },
        selectMenu(data, isSelected) {
            
		},
        save() {
            this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                SysRole.saveOrUpdate({
                    roleID: this.currentRoleID,
                    menuIDs: this.selected.length > 0 ? this.selected.join(',') : this.selectedMenuIds.join(','),
                    roleName: this.role.roleName,
                    roleEnName: this.role.roleEnName
                }).then(res => {
                    Message.success('成功！')
                    this.$router.push({name: 'rolemanage'})
                })
            })
        },
        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
