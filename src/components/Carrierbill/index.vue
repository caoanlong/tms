<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>承运单列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="承运单号">
						<el-input placeholder="承运单号"></el-input>
					</el-form-item>
					<el-form-item label="发货单号">
						<el-input placeholder="发货单号"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="收货单位"></el-input>
					</el-form-item>
					<el-form-item label="发货单位">
						<el-input placeholder="发货单位"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-input placeholder="创建时间"></el-input>
					</el-form-item>
					<el-form-item label="发货时间">
						<el-input placeholder="发货时间"></el-input>
					</el-form-item>
					<el-form-item label="到货时间">
						<el-input placeholder="到货时间"></el-input>
					</el-form-item>
					<el-form-item label="运单状态">
						<el-input placeholder="运单状态"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" >搜索</el-button>
						<el-button type="default" >重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="处理状态" >
					</el-table-column>
					<el-table-column label="承运单号">
					</el-table-column>
					<el-table-column label="收货单位">
					</el-table-column>
					<el-table-column label="卸货地">
					</el-table-column>
					<el-table-column label="收货人">
					</el-table-column>
					<el-table-column label="到货时间">
					</el-table-column>
					<el-table-column label="货物规格/货物名称">
					</el-table-column>
					<el-table-column label="货物总量">
					</el-table-column>
					<el-table-column label="发货单位">
					</el-table-column>
					<el-table-column label="发货时间">
					</el-table-column>
					<el-table-column label="发货人">
					</el-table-column>
					<el-table-column label="发货地">
					</el-table-column>
					<el-table-column label="操作" width="150">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getCargoList()">
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
			pageNum: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			refreshing: false
		}
	},
	created() {
		this.getList()
	},
	methods: {
		pageChange(index) {
			
		},
		getList(){

		},
		AddCargo() {
			this.$router.push({ name: '' })
		},
		ViewCargo(id) {
			this.$router.push({ name: '' , query: { id} })
		},
		refresh() {
			this.refreshing = true
			this.getList()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
		},
	}
}

</script>
<style lang="stylus" scoped>

</style>
