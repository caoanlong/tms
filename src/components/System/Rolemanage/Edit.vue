<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑角色</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form label-width="120px" :model="role" :rules="rules" ref="ruleForm">
						<el-form-item label="角色名称" prop="name">
							<el-input placeholder="请输入..." v-model="role.name"></el-input>
						</el-form-item>
                        <el-form-item label="权限英文" prop="permission">
							<el-input placeholder="请输入..." v-model="role.permission"></el-input>
						</el-form-item>
                        <el-form-item label="权限菜单" prop="menus">
                            <el-row style="border: 1px solid #dedede">
                                <el-tree 
                                    :data="data" 
                                    :props="defaultProps" 
                                    show-checkbox
                                    @check="handleCheckChange">
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
export default {
    data() {
        return {
            data: [
                {
                    id: 1,
                    name: '系统管理',
                    sort: 1,
                    type: 'module',
                    isShow: 'Y',
                    children: [
                        {
                            id: 2,
                            name: '系统设置',
                            sort: 1,
                            type: 'module',
                            isShow: 'Y',
                            children: [
                                {
                                    id: 3,
                                    name: '用户管理',
                                    sort: 1,
                                    type: 'menu',
                                    isShow: 'Y',
                                    path: '/user'
                                },
                                {
                                    id: 4,
                                    name: '角色管理',
                                    sort: 2,
                                    type: 'menu',
                                    isShow: 'Y',
                                    path: '/role'
                                }
                            ],
                        },
                        {
                            id: 5,
                            name: '区域管理',
                            sort: 2,
                            type: 'menu',
                            isShow: 'Y',
                            path: '/area'
                        }
                    ]
                },
                {
                    id: 6,
                    name: '业务配置',
                    sort: 2,
                    type: 'module',
                    isShow: 'Y',
                    children: [
                        {
                            id: 7,
                            name: 'App客户',
                            sort: 2,
                            type: 'menu',
                            isShow: 'Y',
                            path: '/customer'
                        },
                        {
                            id: 8,
                            name: 'App管理',
                            sort: 3,
                            type: 'menu',
                            isShow: 'Y',
                            path: '/app'
                        }
                    ]
                },
                {
                    id: 9,
                    name: 'TMS管理',
                    sort: 3,
                    type: 'menu',
                    isShow: 'Y',
                    path: '/tms'
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            role: {
                name: '',
                permission: '',
                menus: []
            },
            rules: {
                name: [
                    {required: true, message: '请输入角色名称'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符'}
                ],
                permission: [{required: true, message: '请输入权限英文'}]
            }
        }
    },
    methods: {
        handleCheckChange(data, checked, indeterminate) {
            console.log(checked.checkedNodes)
        },
        save() {
            this.$refs['ruleForm'].validate(valid => {
                console.log(valid)
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
