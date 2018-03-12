<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>应收汇总</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="托运人">
						<el-input placeholder="请输入..." v-model="findShipper"></el-input>
					</el-form-item>
                    <el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findConsigner"></el-input>
					</el-form-item>
                    <el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findReceipter"></el-input>
					</el-form-item>
                    <el-form-item label="发货日期">
						<el-date-picker
                            v-model="findConsignDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="selectDateRange">
                        </el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="roleTable" 
					:data="tableData" 
					border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="角色名称" prop="Name" align="left"></el-table-column>
					<el-table-column label="英文名称" prop="EnName" align="left"></el-table-column>
					<el-table-column label="归属机构" prop="sys_organization.Name" align="left"></el-table-column>
					<el-table-column label="数据范围" align="left">
						<template slot-scope="scope">
							<span 
							v-for="sysDataScope in sysDataScopes" 
							:key="sysDataScope.Dict_ID" 
							v-if="sysDataScope.VALUE == scope.row.DataScope">{{sysDataScope.NAME}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="420" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit">修改</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize">
							<el-option label="10" value="10"></el-option>
							<el-option label="20" value="20"></el-option>
							<el-option label="30" value="30"></el-option>
							<el-option label="40" value="40"></el-option>
							<el-option label="50" value="50"></el-option>
							<el-option label="100" value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
                findShipper: '',
                findConsigner: '',
                findReceipter: '',
                findConsignDate: [],
                startDate: '',
                endDate: '',
				pageIndex: 1,
				pageSize: 10,
                count: 0,
                tableData: []
			}
		},
		created() {
		},
		methods: {
            reset() {
                this.findShipper = ''
                this.findConsigner = ''
                this.findReceipter = ''
                this.findConsignDate = []
                this.startDate = ''
                this.endDate = ''
            },
			pageChange(index) {
                this.pageIndex = index
            },
            selectDateRange(date) {
                this.startDate = new Date(date[0]).getTime()
                this.endDate = new Date(date[1]).getTime()
            },
		}
	}
</script>
<style lang="stylus" scoped>

</style>