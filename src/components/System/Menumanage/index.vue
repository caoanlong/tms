<template>
	<div class="main-content">
		<div class="wf-card menu-list">
			<div class="header clearfix">菜单列表</div>
			<div class="tableControl">
				<el-button type="success" plain size="mini" icon="el-icon-plus" @click="addRoot">添加顶级节点</el-button>
			</div>
			<el-tree
				class="expand-tree"
				:data="menus"
				:props="defaultProps"
				node-key="name"
				highlight-current
				:expand-on-click-node="false"
				:render-content="renderContent"
				@node-click="handleNodeClick">
			</el-tree>
		</div>
		<div class="wf-card menu-info">
			<div class="header clearfix">菜单详情</div>
			<el-form ref="form" :model="currentNode" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="currentNode.Name"></el-input>
				</el-form-item>
				<el-form-item label="名字">
					<el-input v-model="currentNode.Target"></el-input>
				</el-form-item>
				<el-form-item label="路径">
					<el-input v-model="currentNode.Href"></el-input>
				</el-form-item>
				<el-form-item label="图标">
					<el-button type="primary" plain @click="selectIcondialog = true">
						<svg-icon :iconClass="currentNode.Icon ? currentNode.Icon : 'add-icon'"></svg-icon> 
						{{currentNode.Icon ? currentNode.Icon : iconTxt}}
					</el-button>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="currentNode.SortNumber" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="是否显示">
					<el-switch v-model="isShow"></el-switch>
				</el-form-item>
				<el-form-item label="角色权限">
					<el-select style="width: 100%" v-model="selectedRoles" multiple placeholder="请选择">
						<el-option v-for="role in roles" :key="role.Role_ID" :label="role.RoleName" :value="role.Role_ID"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm(button)">{{button}}</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<select-icon :selectIcondialog="selectIcondialog" @select-icon="handleSelectIcon"></select-icon>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import TreeRender from '../../CommonComponents/TreeRender'
import SelectIcon from './components/SelectIcon'
import Menu from '../../../api/Menu'
import SysRole from '../../../api/SysRole'
export default {
	data() {
		return {
			roles: [],
			selectedRoles: [],
			defaultProps: {
				children: 'children',
				label: 'title'
			},
			currentNode: {
				Target: '', // name
				Name: '', // title
				SortNumber: '',
				Href: '', // path
				Icon: '',
				IsShow: '',
				sys_roles: []
			},
			isShow: false,
			title: '添加顶级节点',
			button: '立即创建',
			selectIcondialog: false,
			iconTxt: '添加图标'
		}
	},
	computed: {
		...mapGetters([ 'menus' ])
	},
	components: { SelectIcon },
	created() {
		this.getRoles()
	},
	methods: {
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = { Target: '', Name: '', SortNumber: '', Href: '', Icon: '', IsShow: '', sys_roles: [] }
			this.iconTxt='添加图标'
		},
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.getMenu(d.Menu_ID)
		},
		renderContent(h, {node, data, store}) {
			const that = this //指向vue
			return h(TreeRender, {
				props: {
					DATA: data, //节点数据
					NODE: node, //节点内容
					STORE: store, //完整树形内容
					CURRENTNODE: this.currentNode // 当前选择的节点
				},
				on: {//绑定方法
					nodeAdd: ((s, d, n) => that.handleAdd(s, d, n)),
					nodeDel: ((s, d, n) => that.handleDelete(s, d, n))
				}
			})
		},
		//增加节点
		handleAdd(s, d, n){
			this.title = '添加子节点'
			this.button = '立即创建'
			this.currentNode = {
				Menu_PID: this.currentNode.Menu_ID,
				Target: '', Name: '', SortNumber: '', Href: '', Icon: '', IsShow: '', sys_roles: []
			}
			this.iconTxt='添加图标'
		},
		//删除节点
		handleDelete(s, d, n){
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch('deleteMenu', d)
				this.$store.dispatch('getMenu')
				this.addRoot()
				Message.success('删除成功!')
			}).catch(() => {
				Message.success('已取消删除!')         
			})
		},
		handleSelectIcon(data) {
			data && (this.iconTxt = this.currentNode.Icon = data)
			this.selectIcondialog = false
		},
		submitForm(type) {
			if (!this.currentNode.Name) {
				Message.error('标题不能为空！')
				return
			}
			if (!this.currentNode.Target) {
				Message.error('名字不能为空！')
				return
			}
			if (!this.currentNode.Href) {
				Message.error('路径不能为空！')
				return
			}
			const params = {
				Href: this.currentNode.Href,
				Target: this.currentNode.Target,
				Name: this.currentNode.Name,
				SortNumber: this.currentNode.SortNumber,
				Icon: this.currentNode.Icon,
				Menu_PID: this.currentNode.Menu_PID,
				IsShow: this.isShow ? 'Y' : 'N',
				sys_roles: this.selectedRoles
			}
			// 创建
			if (type == '立即创建') {
				this.$store.dispatch('addMenu', params)
				this.$store.dispatch('getMenu')
				this.addRoot()
				Message.success('创建成功！')
			// 编辑
			} else {
				params['Menu_ID'] = this.currentNode.Menu_ID
				this.$store.dispatch('editMenu', params)
				this.$store.dispatch('getMenu')
				this.addRoot()
				Message.success('编辑成功！')
			}
		},
		// 获取菜单详情
		getMenu(Menu_ID) {
			Menu.findById({ Menu_ID }).then(res => {
				this.currentNode = res
				this.isShow = res.IsShow == 'Y' ? true : false
				this.selectedRoles = res.sys_roles.map(item => item.Role_ID)
			})
		},
		// 获取所有角色
		getRoles() {
			SysRole.find({ pageSize: 1000 }).then(res => {
				this.roles = res.records.map(item => {
					return {
						Role_ID: item.roleID,
						RoleName: item.roleName
					}
				})
			})
		}
	}
}

</script>
<style lang="stylus" scoped>
	.main-content
		display flex
		.wf-card
			&.menu-list
				flex 0 0 360px
				margin-right 20px
				.expand-tree
					height 600px
					overflow-y auto
			&.menu-info
				flex 1
			.expand-tree
				font-size 14px
	.svg-icon
		vertical-align top
	.el-checkbox
		margin 0 30px 0 0	
</style>
