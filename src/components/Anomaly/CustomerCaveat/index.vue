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
						<el-button type="default" @click="reset(false)">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="exportExcelUrl" download="customer.xlsx" class="exportExcel el-icon-download" v-if="permissions[$route.name]&&permissions[$route.name]['export']">导出</a>
			</div>
			<div class="table">
				<el-table :data="tableData" v-loading="loading" border style="width: 100%" size="mini" stripe>
					<el-table-column label="客户名称" prop="consigneeName" align="center" min-width="100" :show-overflow-tooltip="true">
						<template slot-scope="scope">
							<router-link tag="span" class="link" :to="{name: 'exceptanomaly', query: {consigneeName: scope.row.consigneeName}}">
								{{scope.row.consigneeName}}
							</router-link>
						</template>
					</el-table-column>
					<el-table-column label="客户编号" prop="code" align="center"></el-table-column>
					<el-table-column label="所属片区" min-width="100" :show-overflow-tooltip="true" prop="zone" align="center"></el-table-column>
					<el-table-column label="总单量" prop="orderNum" align="center"></el-table-column>
					<el-table-column label="异常单" prop="alarmNum" align="center"></el-table-column>
					<el-table-column label="异常占比" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.alarmNum && scope.row.orderNum)? ((scope.row.alarmNum/scope.row.orderNum*100).toFixed(2) +'%'):0}}
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
import { mapGetters } from 'vuex'
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
                consigneeID: '',
                companyName:'',
                code: '',
                customerIDs: '0',
                zone:'',
                begin: this.getCurrentMonthFirst(),
                end: this.getCurrentMonthLast()
            },
            CustomerZone:[],
			curCompany: {},
			exportExcelUrl: ''
		}
	},
	created() {
		const customerIDs = localStorage.getItem('customerIDs')
		if (customerIDs) this.find.customerIDs = customerIDs
		this.resetExportExcelUrl()
        this.getList()
		this.getDictList()
        this.getCurrentMonthFirst()
        this.getCurrentMonthLast()
	},
    activated() {
		if(!this.$route.query.cache) {
			this.reset(true)
		}
    },
    computed: {
        ...mapGetters(['permissions'])
    },
	methods: {
		getDictList() {
			BaseDict.getDict({
				groupName: 'CustomerZone'
			}).then(res => {
				this.CustomerZone = res.data
			})
		},
		search() {
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.find.customerIDs = '0'
			localStorage.removeItem('customerIDs')
			this.getList()
		},
        reset(bool){
            this.find.consigneeID = ''
			this.find.companyName = ''
			this.find.code = ''
			this.find.customerIDs = '0'
			this.find.zone = ''
			this.find.begin =this.getCurrentMonthFirst()
			this.find.end = this.getCurrentMonthLast()
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			if (bool) {
				const customerIDs = localStorage.getItem('customerIDs')
				if (customerIDs) this.find.customerIDs = customerIDs
			} else {
				localStorage.removeItem('customerIDs')
			}
			this.getList()
        },
        getCustomers(keyword, cb) {
			this.find.consigneeID = ''
			Company.customerFind({
                current: 1,
                size: 1000,
				customerType: 'Consignee',
				keyword
            }).then(res => {
                cb(res) 
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
        getList() {
            this.tableData = []
            this.loading = true
			if (!this.find.customerIDs) return
			Company.customerAlarmList({
				current: this.pageIndex,
				size: this.pageSize,
				consigneeID: this.find.consigneeID,
                code: this.find.code,
                customerIDs: this.find.customerIDs,
                zone: this.find.zone,
				begin: this.find.begin,
				end: this.find.end
			}).then(res => {
				this.tableData = res.records
                this.total = res.total
                this.loading = false
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
				+ '&customerIDs=' + this.find.customerIDs
				+ '&zone=' + this.find.zone
				+ '&begin=' + this.find.begin
				+ '&end=' + this.find.end
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
