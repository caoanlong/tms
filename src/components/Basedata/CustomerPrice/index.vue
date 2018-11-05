<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">客户定价</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="委托方">
						<el-input placeholder="名称" v-model="find.keyword" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="exportExcelUrl" download="goodssource.xlsx" class="exportExcel el-icon-download">导出</a>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
                    :data="tableData"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="委托方" prop="companyName" align="center"></el-table-column>
                    <el-table-column label="对客户应收运价" align="center">
                        <el-table-column label="吨公里价格" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.receivableWeightUnitPrice}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="方公里价格" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.receivableVolumnUnitPrice}}元</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="对司机支付运价" align="center">
                        <el-table-column label="吨公里价格" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.payableWeightUnitPrice}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="方公里价格" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.payableVolumnUnitPrice}}元</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
					<el-table-column label="线路定价" align="center">
						<template slot-scope="scope">
							<span 
								:class="{'link': Number(scope.row.routePriceNum) > 0}" 
								@click="handleCommand({type: 'linePrice', data: scope.row})">
								{{scope.row.routePriceNum + '个定价'}}
							</span>
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{type: 'edit', data: scope.row}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'linePrice', data: scope.row}">线路定价</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
        <edit-customer-price 
			:isVisible="isEditVisible" 
			:callback="callbackEdit" 
			:customerID="currentCustomerID">
        </edit-customer-price>
        <line-price 
			:isVisible="isLinePriceVisible" 
			:callback="callbackLinePrice" 
			:customerID="currentCustomerID">
        </line-price>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import { baseURL } from '../../../common/request'
import EditCustomerPrice from './components/EditCustomerPrice'
import LinePrice from './components/LinePrice'
import Company from '../../../api/Company'
export default {
    mixins: [baseMixin],
    components: { EditCustomerPrice, LinePrice },
	data() {
		return {
			exportExcelUrl:'',
			find: {
				keyword: ''
            },
            isEditVisible: false,
			isLinePriceVisible: false,
			currentCustomerID: ''
		}
	},
	created() {
		this.resetExportExcelUrl()
		this.getList()
	},
	methods: {
		reset() {
			this.find.keyword = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		getList() {
			Company.customerFind({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				customerType:'Delegate'
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
		},
		handleCommand(e) {
			this.currentCustomerID = e.data.customerID
			if (e.type == 'edit') {
				this.isEditVisible = true
			} else if (e.type == 'linePrice') {
				this.isLinePriceVisible = true
			}
        },
        callbackEdit(bool) {
			this.isEditVisible = false
			bool && this.getList()
        },
        callbackLinePrice(bool) {
			this.isLinePriceVisible = false
			bool && this.getList()
		},
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/company/customer/routePrice/export?Authorization=' + localStorage.getItem("token") 
				+ '&keyword=' + this.find.keyword
		},
		inputChange() {
			this.resetExportExcelUrl()
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
	margin-right 10px
</style>