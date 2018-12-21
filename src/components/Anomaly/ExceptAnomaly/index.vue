<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">异常报警</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input 
							style="width:250px" 
							placeholder="发货单号/客户名称/车牌号/调度单号" 
							v-model="find.keyword" 
							@change="inputChange">
						</el-input>
					</el-form-item>
                    <el-form-item label="工厂" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.customerID" @change="inputChange">
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
						<el-select placeholder="请选择" v-model="find.type" @change="inputChange">
							<el-option label="全部" value=""></el-option>
                            <el-option label="停车超时" value="StopOvertime"></el-option>
                            <el-option label="卸货异常" value="ArrivedOffset"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="异常时间从">
						<el-date-picker 
							style="width: 140px" 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.beginTime" 
							@change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker 
							style="width: 140px" 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.endTime" 
							@change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="exportExcelUrl" download="customer.xlsx" class="exportExcel el-icon-download">导出</a>
				<a :href="templateUrl" download="customer.xlsx" class="download-btn">
					<svg-icon iconClass="excel-icon"></svg-icon>
					<span>下载模板</span>
				</a>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini" stripe>
					<el-table-column label="发货单号" prop="shipperNo" align="center"></el-table-column>
					<el-table-column label="发货工厂" prop="companyName"></el-table-column>
					<el-table-column label="客户" prop="consigneeName"></el-table-column>
					<el-table-column label="货物名称" prop="cargoName"></el-table-column>
					<el-table-column label="起点地区" prop="fromSite" align="center"></el-table-column>
					<el-table-column label="终点地区" prop="toSite" align="center"></el-table-column>
					<el-table-column label="调度日期" align="center" width="140">
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
					<el-table-column label="异常时间" align="center" width="140">
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
import { baseURL } from '../../../common/requestByJson'
import { baseMixin } from '../../../common/mixin'
import CarrierOrderAlarm from '../../../api/CarrierOrderAlarm'
import Company from '../../../api/Company'
import { getDateTotimestamp } from "../../../common/utils"
export default {
    mixins: [baseMixin],
	data() {
		return {
            find: { 
                keyword: '',
                companyID:'',
                type:'',
                beginTime: this.getCurrentMonthFirst(),
                endTime: this.getCurrentMonthLast()
            },
            companys: [],
			curCompany: {},
			exportExcelUrl: '',
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=customer.xlsx&Authorization=' 
				+ localStorage.getItem("token"),
		}
    },
    created(){
		this.resetExportExcelUrl()
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
			this.find.companyID = ''
			this.find.type = ''
			this.find.beginTime =this.getCurrentMonthFirst()
			this.find.endTime = this.getCurrentMonthLast()
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
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
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/carrierOrderAlarm/export?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token") 
				+ '&keyword=' + this.find.keyword
				+ '&companyID=' + this.find.companyID
				+ '&type=' + this.find.type
				+ '&beginTime=' + this.find.beginTime
				+ '&endTime=' + this.find.endTime
		}
	}
}

</script>
<style lang="stylus" scoped>
.download-btn
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-right 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
.upload-File
	display inline-block
	margin 0 10px
</style>
