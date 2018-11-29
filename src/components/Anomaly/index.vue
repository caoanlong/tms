<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">异常报警</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="find.keyword"></el-input>
					</el-form-item>
                    <el-form-item label="工厂" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.companyID">
							<el-option value="Committed" label="全部">全部</el-option>
							<el-option value="Running" label="执行中">执行中</el-option>
							<el-option value="Signed" label="已完成">已完成</el-option>
							<el-option value="Closed" label="已关闭">已关闭</el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="异常原因" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.type">
							<el-option value="Committed" label="全部">全部</el-option>
							<el-option value="Running" label="停车超时">停车超时</el-option>
							<el-option value="Signed" label="未准时到达">未准时到达</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="异常时间从">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" v-model="find.beginTime">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.endTime">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini" stripe>
					<el-table-column label="发货单号" prop="shipperNo" align="center"></el-table-column>
					<el-table-column label="发货工厂" prop="companyName" align="center"></el-table-column>
					<el-table-column label="客户" prop="consigneeName" align="center"></el-table-column>
					<el-table-column label="货物名称" prop="cargoName" align="center"></el-table-column>
					<el-table-column label="起点地区" prop="fromSite" align="center"></el-table-column>
					<el-table-column label="终点地区" prop="toSite" align="center"></el-table-column>
					<el-table-column label="调度日期" prop="dispatchDate" align="center"></el-table-column>
					<el-table-column label="车牌号" prop="plateNo" align="center"></el-table-column>
					<el-table-column label="异常原因" prop="type" align="center"></el-table-column>
					<el-table-column label="异常时间" prop="createTime" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-button size="mini" @click="view(scope.row.carrierOrderAlarmID)">轨迹</el-button>
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
import requestByJson, { baseURL } from '../../common/requestByJson'
import { baseMixin } from '../../common/mixin'
import CarrierOrderAlarm from '../../api/CarrierOrderAlarm'
export default {
    mixins: [baseMixin],
	data() {
		return {
            find: { 
                keyword: '',
                companyID:'',
                type:'',
                beginTime:'',
                endTime:'',
            },
		}
    },
    created(){
        this.getList()
    },
	methods: {
		search(){
            this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
            this.getList()
        },
        reset(){
            this.find.keyword = ''
			this.find.companyID = ''
			this.find.type = ''
			this.find.beginTime = ''
			this.find.endTime = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.getList()
        },
        view(carrierOrderAlarmID){

        },
        getList() {
			this.tableData = []
			CarrierOrderAlarm.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
                companyID: this.find.companyID,
                type:this.find.type,
				beginTime: this.find.beginTime,
				endTime: this.find.endTime
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
