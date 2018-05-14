<template>
	<div class="main-content">
		<div class="wf-card menu-list">
			<div class="header clearfix">机构列表</div>
			<div class="tableControl">
				<el-button type="success" plain size="mini" icon="el-icon-plus" @click="addRoot">添加顶级节点</el-button>
			</div>
			<el-tree class="expand-tree" :load="loadNode" :props="defaultProps" node-key="Code" lazy highlight-current :expand-on-click-node="false" :render-content="renderContent" @node-click="handleNodeClick">
			</el-tree>
		</div>
		<div class="wf-card menu-info">
			<div class="header clearfix">{{title}}</div>
			<el-form label-width="80px" :model="currentNode" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="归属区域" prop="Area_ID">
							<el-cascader
								style="width: 100%"
								:options="distData"
								v-model="selectArea"
								@change="handleDistChange">
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否可用">
							<el-switch v-model="currentNode.Useable"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="机构名称" prop="Name">
							<el-input v-model="currentNode.Name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="机构编码" prop="Code">
							<el-input v-model="currentNode.Code"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="机构级别" prop="Grade">
							<el-select style="width: 100%" v-model="currentNode.Grade" placeholder="请选择">
								<el-option value="1" label="一级"></el-option>
								<el-option value="2" label="二级"></el-option>
								<el-option value="3" label="三级"></el-option>
								<el-option value="4" label="四级"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="机构类型" prop="Type">
							<el-select style="width: 100%" v-model="currentNode.Type" placeholder="请选择">
								<el-option value="1" label="公司"></el-option>
								<el-option value="2" label="部门"></el-option>
								<el-option value="3" label="小组"></el-option>
								<el-option value="0" label="其他"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="主负责人" prop="PrimaryPerson">
							<el-select style="width: 100%" v-model="currentNode.PrimaryPerson" filterable placeholder="请选择">
								<el-option v-for="user in users" :key="user.User_ID" :label="user.Name" :value="user.User_ID">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="副负责人" prop="DeputyPerson">
							<el-select style="width: 100%" v-model="currentNode.DeputyPerson" filterable placeholder="请选择">
								<el-option v-for="user in users" :key="user.User_ID" :label="user.Name" :value="user.User_ID">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="负责人" prop="Master">
							<el-input v-model="currentNode.Master"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="电话" prop="Phone">
							<el-input v-model="currentNode.Phone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="邮政编码" prop="ZipCode">
							<el-input v-model="currentNode.ZipCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="传真" prop="Fax">
							<el-input v-model="currentNode.Fax"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="邮箱" prop="Email">
							<el-input v-model="currentNode.Email"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="排序">
							<el-input-number v-model="currentNode.SortNumber" :min="1"></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="联系地址" prop="Address">
					<el-input v-model="currentNode.Address"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="Remark">
					<el-input type="textarea" resize="none" v-model="currentNode.Remark"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="submitForm(button)">{{button}}</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import TreeRender from '../../CommonComponents/TreeRender/Area'
import request from '../../../common/request'
import { regionData } from 'element-china-area-data'
import { checkTel, checkFax } from '../../../common/validator'
export default {
	data() {
		return {
			distData: regionData,
			defaultProps: {
				children: 'children',
				label: 'Name'
			},
			areaProps: {
				children: 'children',
				label: 'Name',
				value: 'Area_ID',
			},
			currentNode: {
				Area_ID: '',
				Name: '',
				Grade: '',
				PrimaryPerson: '',
				DeputyPerson: '',
				Master: '',
				Phone: '',
				Useable: true,
				Code: '',
				Type: '',
				ZipCode: '',
				Fax: '',
				Email: '',
				Address: '',
				Remark: '',
				SortNumber:''
			},
			selectArea: [],
			users: [],
			title: '添加顶级节点',
			button: '立即创建',
			selectIcondialog: false,
			selectedIcon: '',
			iconTxt: '添加图标',
			rules: {
				Area_ID: [
					{required: true, message: '请选择区域'},
				],
				Name: [
					{required: true, message: '请输入名称'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				Code: [
					{required: true, message: '请输入机构编码'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				Grade: [
					{required: true, message: '请选择机构级别'},
				],
				Type: [
					{required: true, message: '请选择机构类型'},
				],
				PrimaryPerson: [
					{required: true, message: '请输入主负责人'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				DeputyPerson: [
					{required: true, message: '请输入副负责人'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				Master: [
					{required: true, message: '请输入负责人'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				Phone: [
					{required: true, message: '请输入电话'},
					{validator: checkTel}
				],
				ZipCode: [
					{min: 6, max: 6, message: '长度为 6 个字符'}
				],
				Fax: [
					{validator: checkFax}
				],
				Email: [
					{type: 'email', message: '请输入正确的邮箱地址'}
				],
				Address: [
					{required: true, message: '请输入联系地址'},
					{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
				],
				Remark: [
					{min: 2, max: 100, message: '长度在 2 到 100 个字符'}
				]
			}
		}
	},
	created() {
		this.getUsers()
	},
	methods: {
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = {
				Area_ID: '',
				Name: '',
				Grade: '',
				PrimaryPerson: '',
				DeputyPerson: '',
				Master: '',
				Phone: '',
				Useable: true,
				Code: '',
				Type: '',
				ZipCode: '',
				Fax: '',
				Email: '',
				Address: '',
				Remark: '',
				SortNumber:''
			}
		},
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.getOrg(d.Organization_ID)
		},
		renderContent(h, {node, data, store}) {
			let that = this//指向vue
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
		handleAdd(s, d, n){//增加节点
			this.title = '添加子节点'
			this.button = '立即创建'
			this.currentNode = {
				Organization_PID: this.currentNode.Organization_ID,
				Area_ID: '',
				Name: '',
				Grade: '',
				PrimaryPerson: '',
				DeputyPerson: '',
				Master: '',
				Phone: '',
				Useable: true,
				Code: '',
				Type: '',
				ZipCode: '',
				Fax: '',
				Email: '',
				Address: '',
				Remark: '',
				SortNumber:''
			}
		},
		handleDelete(s, d, n){//删除节点
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {
					Organization_ID: d.Organization_ID
				}
				this.deleteOrg(params)
				this.addRoot()
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})         
			})
		},
		submitForm(type) {
			// 创建
			if (type == '立即创建') {
				let params = {
					Organization_PID: this.currentNode.Organization_PID,
					Area_ID: this.currentNode.Area_ID,
					Name: this.currentNode.Name,
					Grade: this.currentNode.Grade,
					PrimaryPerson: this.currentNode.PrimaryPerson,
					DeputyPerson: this.currentNode.DeputyPerson,
					Master: this.currentNode.Master,
					Phone: this.currentNode.Phone,
					Useable: this.currentNode.Useable ? 'Y' : 'N',
					Code: this.currentNode.Code,
					Type: this.currentNode.Type,
					ZipCode: this.currentNode.ZipCode,
					Fax: this.currentNode.Fax,
					Email: this.currentNode.Email,
					Address: this.currentNode.Address,
					Remark: this.currentNode.Remark,
					SortNumber: this.currentNode.SortNumber
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						this.addOrg(params)
						this.addRoot()
					}
				})
			// 编辑
			} else {
				let params = {
					Organization_ID: this.currentNode.Organization_ID,
					Organization_PID: this.currentNode.Organization_PID,
					Area_ID: this.currentNode.Area_ID,
					Name: this.currentNode.Name,
					Grade: this.currentNode.Grade,
					PrimaryPerson: this.currentNode.PrimaryPerson,
					DeputyPerson: this.currentNode.DeputyPerson,
					Master: this.currentNode.Master,
					Phone: this.currentNode.Phone,
					Useable: this.currentNode.Useable ? 'Y' : 'N',
					Code: this.currentNode.Code,
					Type: this.currentNode.Type,
					ZipCode: this.currentNode.ZipCode,
					Fax: this.currentNode.Fax,
					Email: this.currentNode.Email,
					Address: this.currentNode.Address,
					Remark: this.currentNode.Remark,
					SortNumber: this.currentNode.SortNumber
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						this.updateOrg(params)
						this.addRoot()
					}
				})
			}
		},
		selectIcon(icon) {
			this.selectedIcon= icon
		},
		submitSelect() {
			this.iconTxt = this.currentNode.Icon = this.selectedIcon
			this.selectIcondialog = false
		},
		loadNode(node, resolve) {
			if (node.level === 0) {
				this.getOrgs('', orgs => {
					return resolve(orgs)
				})
				return
			}
			if (node.level > 0) {
				this.getOrgs(node.data.Organization_ID, orgs => {
					return resolve(orgs)
				})
				return
			}
		},
		// 获取机构列表
		getOrgs(Organization_PID, callback) {
			let params = {
				Organization_PID
			}
			request({
				url: '/sys_organization/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					callback && callback(res.data.data)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 获取机构详情
		getOrg(Organization_ID) {
			let params = {
				Organization_ID
			}
			request({
				url: '/sys_organization/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.currentNode = res.data.data
					this.currentNode.Useable = res.data.data.Useable == 'Y' ? true : false
					let path = res.data.data.base_area.Path
					if (path) {
						this.currentNode.Area_ID = path.split(',').filter(item => item)
					}
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 添加机构
		addOrg(data) {
			request({
				url: '/sys_organization/add',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.$refs['ruleForm'].resetFields()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 编辑机构
		updateOrg(data) {
			request({
				url: '/sys_organization/update',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.$refs['ruleForm'].resetFields()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 删除机构
		deleteOrg(data) {
			request({
				url: '/sys_organization/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.$refs['ruleForm'].resetFields()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 获取用户列表
		getUsers() {
			let params = {
				pageIndex: 1,
				pageSize: 100
			}
			request({
				url: '/sys_user/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.users = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		handleDistChange(val) {
			this.currentNode.Area_ID = val[val.length - 1]
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
	.iconList
		padding 0
		&:after
			clearfix
		li
			list-style-type none
			float left
			font-size 18px
			width 44px
			height 44px
			padding 10px
			text-align center
			cursor pointer
			&:hover
			&.selected
				color #409EFF
	.el-checkbox
		margin 0 30px 0 0	
</style>
