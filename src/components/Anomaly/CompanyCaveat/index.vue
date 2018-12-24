<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">工厂报警</div>
			<div class="search">
				<el-form :inline="true" size="small">
                    <el-form-item label="工厂名称" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.shipperID" @change="inputChange">
                            <el-option label="全部" value=""></el-option>
                            <el-option 
                                :label="item.companyName" 
                                :value="item.customerID" 
                                v-for="(item, i) in companys" 
                                :key="i">
                            </el-option>
                        </el-select>
					</el-form-item>
                    <el-form-item label="所属片区" class="customerSelect">
						<el-select v-model="find.zone" placeholder="请选择"  @change="inputChange">
                            <el-option value="" label="全部"></el-option>
							<el-option v-for="(item,index) in CustomerZone" :key="index" :value="item.code" :label="item.code"></el-option>
						</el-select>
					</el-form-item>
                   <el-form-item label="异常时间从">
						<el-date-picker 
							style="width: 140px" 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.begin" 
							@change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker 
							style="width: 140px" 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.end" 
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
					<el-table-column label="工厂" prop="companyName" align="center">
                        <template slot-scope="scope">
							<span @click="view(scope.row.companyID)" class="link">{{scope.row.companyName}}</span>
						</template>
                    </el-table-column>
					<el-table-column label="所属片区" prop="zone" align="center"></el-table-column>
					<el-table-column label="总单量" prop="carrierOrderNum" align="center"></el-table-column>
					<el-table-column label="特价单量" prop="selfPickNum" align="center"></el-table-column>
					<el-table-column label="特价占比" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.carrierOrderNum && scope.row.selfPickNum)? (scope.row.selfPickNum/scope.row.carrierOrderNum +'%'):0}}
                        </template>
                    </el-table-column>
					<el-table-column label="异常单" prop="alarmNum" align="center"></el-table-column>
					<el-table-column label="异常占比" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.carrierOrderNum && scope.row.alarmNum)? (scope.row.alarmNum/scope.row.carrierOrderNum +'%'):0}}
                        </template>
                    </el-table-column>
					<el-table-column label="停车报警次数" prop="stopOverTimeNum" align="center"></el-table-column>
					<el-table-column label="卸货报警次数" prop="arrivedOffsetNum" align="center"></el-table-column>
					<el-table-column label="下单客户量" prop="customerNum" align="center"></el-table-column>
					<el-table-column label="异常客户" prop="customerAlarmNum" align="center"></el-table-column>
					<el-table-column label="异常客户占比" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.customerNum && scope.row.customerAlarmNum)? (scope.row.customerAlarmNum/scope.row.customerNum +'%'):0}}
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
import Company from '../../../api/Company'
import BaseDict from '../../../api/BaseDict'
import { getDateTotimestamp } from "../../../common/utils"
export default {
    mixins: [baseMixin],
	data() {
		return {
            find: { 
                shipperID: '',
                companyName:'',
                zone: '',
                begin: this.getCurrentMonthFirst(),
                end: this.getCurrentMonthLast()
            },
            companys: [],
            CustomerZone:[],
			curCompany: {},
			exportExcelUrl: '',
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=customer.xlsx&Authorization=' 
				+ localStorage.getItem("token"),
		}
    },
    created(){
        if(this.$route.query.companyID){
            this.find.shipperID = this.$route.query.companyID
            this.find.companyName = this.$route.query.companyName
        }
		this.resetExportExcelUrl()
        this.getList()
        this.getCompanys()
        this.getDictList()
        this.getCurrentMonthFirst()
        this.getCurrentMonthLast()
    },
	methods: {
        getDictList() {
			BaseDict.getDict({
				groupName:'CustomerZone'
			}).then(res => {
				this.CustomerZone = res.data
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
        reset(){
			this.find.shipperID = ''
            this.find.zone = ''
            this.find.begin =this.getCurrentMonthFirst()
			this.find.end = this.getCurrentMonthLast()
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
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
			Company.shipperAlarmList({
				current: this.pageIndex,
				size: this.pageSize,
                shipperID: this.find.shipperID,
                zone:this.find.zone,
                begin:this.find.begin,
                end:this.find.end,
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
        },
		inputChange() {
			this.resetExportExcelUrl()
		},
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/company/customer/exportShipperAlarmList?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token") 
				+ '&shipperID=' + this.find.shipperID
				+ '&zone=' + this.find.zone
				+ '&begin=' + this.find.begin
				+ '&end=' + this.find.end
        },
        view(companyID ){
            this.$router.push({ name: 'exceptanomaly', query: { companyID }})
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
