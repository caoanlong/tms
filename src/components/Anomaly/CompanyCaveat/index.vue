<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">工厂报警</div>
			<div class="search">
				<el-form :inline="true" size="small">
                    <el-form-item label="工厂名称" class="customerSelect">
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
                    <el-form-item label="所属片区" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.type" @change="inputChange">
							<el-option label="全部" value=""></el-option>
                            <el-option label="停车超时" value="StopOvertime"></el-option>
                            <el-option label="卸货异常" value="ArrivedOffset"></el-option>
						</el-select>
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
					<el-table-column label="工厂" prop="companyName" align="center"></el-table-column>
					<el-table-column label="所属片区" prop="area"></el-table-column>
					<el-table-column label="总单量" prop="orderNum"></el-table-column>
					<el-table-column label="特价单量" prop="priceOrderNum"></el-table-column>
					<el-table-column label="特价占比" prop="pricePercent"></el-table-column>
					<el-table-column label="异常单" prop="exceptOrder"></el-table-column>
					<el-table-column label="异常占比" prop="exceptPercent"></el-table-column>
					<el-table-column label="停车报警次数" prop="stopNum"></el-table-column>
					<el-table-column label="卸货报警次数" prop="arriveNum"></el-table-column>
					<el-table-column label="下单客户量" prop="orderCustomerNum"></el-table-column>
					<el-table-column label="异常客户" prop="exceptCustomer" ></el-table-column>
					<el-table-column label="异常客户占比" prop="exceptCustomerPercent" align="center"></el-table-column>
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
export default {
    mixins: [baseMixin],
	data() {
		return {
            find: { 
                customerID: '',
                type: ''
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
		inputChange() {
			this.resetExportExcelUrl()
		},
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/company/customer/export?Authorization=' 
				+ localStorage.getItem("token") 
				+ '&keyword=' + this.find.keyword
				+ '&customerType=' + this.find.customerType
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
