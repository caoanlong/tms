<template>
	<el-row class="main-content" :gutter="20">
		<el-col :span="7">
			<el-card class="box-card">
				<div slot="header" class="clearfix">组织</div>
				<el-row>
					<el-col :span="12">
						<div class="title">{{data.name}}</div>
					</el-col>
					<el-col :span="12">
						<div class="btns">
							<el-button
								type="text"
								size="mini"
								@click="() => add(data)">
								新增
							</el-button>
							<el-button
								type="text"
								size="mini"
								@click="() => edit(data)">
								编辑
							</el-button>
						</div>
					</el-col>
				</el-row>
				<el-tree 
					:data="data.children" 
					node-key="id"
					:props="defaultProps" 
					highlight-current 
					:expand-on-click-node="false">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span>
						<el-button
							type="text"
							size="mini"
							@click="() => add(data)">
							新增
						</el-button>
						<el-button
							type="text"
							size="mini"
							@click="() => edit(data)">
							编辑
						</el-button>
						<!-- <el-button
							type="text"
							size="mini"
							@click="() => remove(data)">
							删除
						</el-button> -->
						</span>
					</span>
				</el-tree>
			</el-card>
		</el-col>
		<el-col :span="17">
			<staffs></staffs>
		</el-col>
		<add-org :isVisible="isAddOrgVisible" :parent="selectedParent" @control="handAddOrg"></add-org>
		<edit-org :isVisible="isEditOrgVisible" :id="selectedID" @control="handEditOrg"></edit-org>
	</el-row>
</template>

<script>
import Staffs from './components/Staffs'
import AddOrg from './components/AddOrg'
import EditOrg from './components/EditOrg'
import Organization from '../../../api/Organization'
export default {
	components: { Staffs, AddOrg, EditOrg },
    data() {
		return {
			isAddOrgVisible: false,
			isEditOrgVisible: false,
			selectedParent: {},
			selectedID: '',
			data: {},
            defaultProps: {
                children: 'children',
                label: 'name'
            }
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handAddOrg(bool) {
			bool && this.getList()
			this.isAddOrgVisible = false
		},
		handEditOrg(bool) {
			bool && this.getList()
			this.isEditOrgVisible = false
		},
		getList() {
			Organization.find().then(res => {
				this.data = res
			})
		},
		add(data) {
			this.selectedParent = {
				id: data.id,
				name: data.name
			}
			this.isAddOrgVisible = true
		},
		edit(data) {
			this.selectedID = data.id
			this.isEditOrgVisible = true
		},
		remove(data) {

		}
	}
}
</script>

<style lang="stylus" scoped>
.title {
	height: 34px;
	line-height: 34px;
	font-size: 18px;
	font-weight: 500;
}
.btns {
	height: 34px;
	line-height: 34px;
	text-align: right;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
}
</style>
