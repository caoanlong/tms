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
						<el-select placeholder="请选择" v-model="find.customerID">
                            <el-option label="全部" value=""></el-option>
                            <el-option 
                                :label="item.companyName" 
                                :value="item.customerID" 
                                v-for="(item, i) in companys" 
                                :key="i">
                            </el-option>
                        </el-select>
					</el-form-item>
                    <el-form-item label="异常原因" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.type">
							<el-option label="全部" value=""></el-option>
                            <el-option label="停车超时" value="StopOvertime"></el-option>
                            <el-option label="卸货异常" value="ArrivedOffset"></el-option>
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
					<el-table-column label="发货工厂" prop="companyName"></el-table-column>
					<el-table-column label="客户" prop="consigneeName"></el-table-column>
					<el-table-column label="货物名称" prop="cargoName"></el-table-column>
					<el-table-column label="起点地区" prop="fromSite"></el-table-column>
					<el-table-column label="终点地区" prop="toSite" ></el-table-column>
					<el-table-column label="调度日期" prop="dispatchDate" align="center">
                        <template slot-scope="scope">
                            {{scope.row.dispatchTime | getdatefromtimestamp}}
                        </template>
                    </el-table-column>
					<el-table-column label="车牌号" prop="plateNo" align="center"></el-table-column>
					<el-table-column label="异常原因" prop="type" align="center">
                        <template slot-scope="scope">
							<span v-if="scope.row.type=='StopOvertime'">停车超时</span>
							<span v-else>卸货异常</span>
						</template>
                    </el-table-column>
					<el-table-column label="异常时间" prop="createTime" align="center">
                        <template slot-scope="scope">
                            {{scope.row.createTime | getdatefromtimestamp}}
                        </template>
                    </el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-button size="mini" @click="view(scope.row.dispatchOrderID)">轨迹</el-button>
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
import Company from '../../api/Company'
import { getDateTotimestamp } from "../../common/utils";
export default {
    mixins: [baseMixin],
	data() {
		return {
            find: { 
                keyword: '',
                customerID:'',
                type:'',
                beginTime:this.getCurrentMonthFirst(),
                endTime:this.getCurrentMonthLast()
            },
            companys: [],
            curCompany: {},
		}
    },
    created(){
        this.getList()
        this.getCompanys()
        this.getCurrentMonthFirst()
        this.getCurrentMonthLast()
    },
	methods: {
		search(){
            this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
            this.getList()
        },
        reset(){
            this.find.keyword = ''
			this.find.customerID = ''
			this.find.type = ''
			this.find.beginTime =this.getCurrentMonthFirst()
			this.find.endTime = this.getCurrentMonthLast()
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.getList()
        },
        view(dispatchOrderID){
            const routeData = this.$router.resolve({name: 'trackquery', query: { dispatchOrderID }})
			window.open(routeData.href, '_blank')
        },
        getCompanys() {
            Company.customerFind({
				current: 1,
                size: 1000,
                customerType: 'Shipper'
			}).then(res => {
                this.companys = res.records
			})
        },
        getList() {
			this.tableData = []
			CarrierOrderAlarm.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
                companyID: this.find.customerID,
                type:this.find.type,
				beginTime: this.find.beginTime,
				endTime: this.find.endTime
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
        },
        getCurrentMonthFirst(){
            let date =new Date()
            date.setDate(1)
            return getDateTotimestamp(date)
        },
        getCurrentMonthLast(){
            let date=new Date()
            let currentMonth=date.getMonth()
            let nextMonth=++currentMonth
            let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1)
            let oneDay=1000*60*60*24
            return getDateTotimestamp(new Date(nextMonthFirstDay-oneDay))
        }
	}
}

</script>
<style lang="stylus" scoped>

</style>
