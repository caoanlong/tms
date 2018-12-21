<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">客户报警</div>
			<div class="search">
				<el-form :inline="true" size="small">
                    <el-form-item label="客户名称" class="customerSelect">
						<el-autocomplete 
                            value-key="companyName" 
                            v-model="find.companyName"
                            :fetch-suggestions="getCustomers"
                            placeholder="请输入客户名称" 
                            @select="handSelectCustomer" 
							@change="inputChange">
							<i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectCustomer"></i>
                        </el-autocomplete>
					</el-form-item>
                    <el-form-item label="客户编号">
						<el-input placeholder="请输入客户编号" v-model="find.code"  @change="inputChange"></el-input>
					</el-form-item>
                    <el-form-item label="所属片区" class="customerSelect">
						<el-select v-model="find.zone" placeholder="请选择"  @change="inputChange">
                            <el-option value="" label="全部"></el-option>
							<el-option v-for="(item,index) in CustomerZone" :key="index" :value="item.code" :label="item.code"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="时间段从">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" v-model="find.beginTime" @change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.endTime" @change="inputChange">
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
					<el-table-column label="客户名称" prop="consigneeName" align="center"></el-table-column>
					<el-table-column label="客户编号" prop="code" align="center"></el-table-column>
					<el-table-column label="所属片区" prop="zone" align="center"></el-table-column>
					<el-table-column label="总单量" prop="orderNum" align="center"></el-table-column>
					<el-table-column label="异常单" prop="alarmNum" align="center"></el-table-column>
					<el-table-column label="异常占比" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.alarmNum && scope.row.orderNum)? (scope.row.alarmNum/scope.row.orderNum +'%'):0}}
                        </template>
                    </el-table-column>
					<el-table-column label="停车报警次数" prop="stopOverTimeNum" align="center"></el-table-column>
					<el-table-column label="卸货报警次数" prop="arrivedOffsetNum" align="center"></el-table-column>
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
export default {
    mixins: [baseMixin],
	data() {
		return {
            find: { 
                consigneeID: '',
                companyName:'',
                code: '',
                zone:'',
                beginTime:'',
                endTime:''
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
		this.resetExportExcelUrl()
        this.getList()
        this.getDictList()
    },
	methods: {
		getDictList() {
			BaseDict.getDict({
				groupName:'CustomerZone'
			}).then(res => {
				this.CustomerZone = res.data
			})
		},
        reset(){
            this.find.consigneeID = ''
			this.find.companyName =''
			this.find.code =''
			this.find.zone =''
			this.find.beginTime =''
			this.find.endTime =''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
        },
        getCustomers(companyName, cb) {
			this.find.consigneeID = ''
			Company.customerFind({
                current: 1,
                size: 1000,
                customerType: 'Consignee'
            }).then(res => {
                cb(res.records) 
            })
		},
        handSelectCustomer(data){
			this.find.consigneeID = data.customerID
            this.find.companyName = data.companyName
			this.resetExportExcelUrl()
        },
        clearSelectCustomer(){
			this.find.consigneeID = ''
			this.find.companyName =''
			this.resetExportExcelUrl()
		},
        getList() {
			this.tableData = []
			Company.customerAlarmList({
				current: this.pageIndex,
				size: this.pageSize,
				consigneeID:this.find.consigneeID,
                code:this.find.code,
                zone:this.find.zone,
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
			this.exportExcelUrl = baseURL + '/company/customer/exportCustomerAlarmList?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token") 
				+ '&consigneeID=' + this.find.consigneeID
				+ '&code=' + this.find.code
				+ '&zone=' + this.find.zone
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
