<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">客户地址</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table ref="recTable" :data="tableData" border style="width: 100%" size="mini" stripe>
					<el-table-column label="发货单号" prop="code" align="center"></el-table-column>
					<el-table-column label="发货工厂" prop="code" align="center"></el-table-column>
					<el-table-column label="客户" prop="code" align="center"></el-table-column>
					<el-table-column label="货物名称" prop="code" align="center"></el-table-column>
					<el-table-column label="起点地区" prop="code" align="center"></el-table-column>
					<el-table-column label="终点地区" prop="code" align="center"></el-table-column>
					<el-table-column label="调度日期" prop="code" align="center"></el-table-column>
					<el-table-column label="车牌号" prop="code" align="center"></el-table-column>
					<el-table-column label="异常原因" prop="code" align="center"></el-table-column>
					<el-table-column label="异常时间" prop="code" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-button size="mini" @click="view(scope.row.code)">轨迹</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Company from '../../api/Company'
import { baseMixin } from '../../common/mixin'
import { baseURL } from '../../common/request'
export default {
	name: 'anomaly',
    mixins: [baseMixin],
	data() {
		return {
            find: { 
                keyword: ''
            },
		}
	},
	methods: {
		search(){

        },
        reset(){

        },
        getList() {
			this.tableData = []
			Company.customerAddressFind({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
        },
	}
}

</script>
<style lang="stylus" scoped>

</style>
