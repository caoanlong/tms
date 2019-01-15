<template>
	<el-row class="main-content" :gutter="20">
		<el-col :span="7">
			<el-card class="box-card">
				<div slot="header" class="clearfix">组织</div>
				<el-row>
					<el-col :span="12">
						<div class="title">华新水泥有限公司</div>
					</el-col>
					<el-col :span="12">
						<div class="btns">
							<el-button
								type="text"
								size="mini"
								@click="() => append(data)">
								新增
							</el-button>
							<el-button
								type="text"
								size="mini"
								@click="() => append(data)">
								编辑
							</el-button>
						</div>
					</el-col>
				</el-row>
				<el-tree 
					:data="data" 
					node-key="id"
					:props="defaultProps" 
					highlight-current>
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span>
						<el-button
							type="text"
							size="mini"
							@click="() => append(data)">
							新增
						</el-button>
						<el-button
							type="text"
							size="mini"
							@click="() => append(data)">
							编辑
						</el-button>
						<el-button
							type="text"
							size="mini"
							@click="() => remove(node, data)">
							删除
						</el-button>
						</span>
					</span>
				</el-tree>
			</el-card>
		</el-col>
		<el-col :span="17">
			<staffs></staffs>
		</el-col>
	</el-row>
</template>

<script>
import Staffs from './components/Staffs'
export default {
	components: { Staffs },
    data() {
		return {
			data: [
                {
                    id: 1,
                    name: '云南事业部',
                    sort: 1,
                    type: 'module',
                    isShow: 'Y',
                    children: [
                        {
                            id: 2,
                            name: '昭通工厂',
                            sort: 1,
                            type: 'module',
                            isShow: 'Y',
                        },
                        {
                            id: 5,
                            name: '临沧工厂',
                            sort: 2,
                            type: 'menu',
                            isShow: 'Y',
                            path: '/area'
                        }
                    ]
                },
                {
                    id: 6,
                    name: '湖南事业部',
                    sort: 2,
                    type: 'module',
                    isShow: 'Y'
                },
                {
                    id: 9,
                    name: '武汉事业部',
                    sort: 3,
                    type: 'menu',
                    isShow: 'Y',
                    path: '/tms'
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
		}
	},
	methods: {
		append(data) {
			const newChild = { id: id++, label: 'testtest', children: [] };
			if (!data.children) {
				this.$set(data, 'children', []);
			}
			data.children.push(newChild);
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
