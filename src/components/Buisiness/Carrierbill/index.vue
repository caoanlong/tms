<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">承运单列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="交货单号">
						<el-input 
							placeholder="请输入交货单号" 
							style="width:150px" 
							v-model="find.shipperNo" 
							@change="inputChange">
						</el-input>
					</el-form-item>
					<el-form-item label="承运单号">
						<el-input 
							placeholder="请输入承运单号" 
							style="width:150px" 
							v-model="find.carrierOrderNo" 
							@change="inputChange">
						</el-input>
					</el-form-item>
					<el-form-item label="发货单位">
                        <el-autocomplete 
							style="width:100%" 
                            value-key="companyName" 
                            v-model="find.shipperName"
                            :fetch-suggestions="getShippers"
                            placeholder="请输入发货单位"
                            @select="handSelectShipper" 
							@change="inputChange">
							<i 
								class="el-icon-close el-input__icon" 
								slot="suffix" 
								@click="clearSelectShipper">
							</i>
                        </el-autocomplete>
                    </el-form-item>
					<el-form-item label="收货单位">
                        <el-autocomplete 
							style="width:100%" 
                            value-key="companyName" 
                            v-model="find.customerName"
                            :fetch-suggestions="getCustomers"
                            placeholder="请输入收货单位"
                            @select="handSelectCustomer" 
							@change="inputChange">
							<i 
								class="el-icon-close el-input__icon" 
								slot="suffix" 
								@click="clearSelectCustomer">
							</i>
                        </el-autocomplete>
                    </el-form-item>
					<el-form-item label="产品名称">
						<el-input 
							placeholder="请输入产品名称" 
							style="width:150px" 
							v-model="find.cargoName" 
							@change="inputChange">
						</el-input>
					</el-form-item>
					<el-form-item label="车牌">
						<el-input 
							placeholder="请输入车牌号" 
							style="width:150px" 
							v-model="find.plateNo" 
							@change="inputChange">
						</el-input>
					</el-form-item>
					<el-form-item label="是否异常">
						<el-select placeholder="请选择" v-model="find.verifyFlag" @change="inputChange">
							<el-option value="Y" label="是"></el-option>
							<el-option value="N" label="否"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" v-model="find.status" @change="inputChange">
							<el-option value="Committed" label="未执行"></el-option>
							<el-option value="Running" label="执行中"></el-option>
							<el-option value="Signed" label="已完成"></el-option>
							<el-option value="Closed" label="已关闭"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建时间从" prop="begin">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.begin" 
							@change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至" prop="end">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.end" 
							@change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add" v-if="permissions[$route.name] && permissions[$route.name]['add']">添加</el-button>
				<a :href="exportExcelUrl" class="exportExcel el-icon-download" v-if="permissions[$route.name]&&permissions[$route.name]['export']">导出</a>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="承运单号" width="170" align="center">
						<template slot-scope="scope">
							<span @click="view(scope.row.carrierOrderID)" class="link">
								{{scope.row.carrierOrderNo}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="交货单号" prop="shipperNo"  align="center"  width='120' ></el-table-column>
					<el-table-column label="异常" align="center" width="60">
                        <template slot-scope="scope">
							<span v-if="scope.row.alarmFlag=='Y'" style="color:#F56C6C">有</span>
                            <span v-else style="color:#67C23A">无</span>
						</template>
                    </el-table-column>
					<el-table-column label="状态" align="center" width='80'>
						<template slot-scope="scope">
							<el-tag size="mini" class="statusTag" type="warning" v-if="scope.row.status == 'Committed'">未执行</el-tag>
							<el-tag size="mini" class="statusTag" type="primary" v-else-if="scope.row.status == 'Running'">执行中</el-tag>
							<el-tag size="mini" class="statusTag" type="success" v-else-if="scope.row.status == 'Signed'">已完成</el-tag>
							<el-tag size="mini" class="statusTag" type="info" v-else-if="scope.row.status == 'Closed'">已关闭</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="发货方" prop="shipperCompanyName" align="center"  width='120'></el-table-column>
					<el-table-column label="收货方" prop="consigneeCompanyName" align="center"  width='120'></el-table-column>
					<el-table-column label="货物" prop="cargoName" align="center"  width='120'></el-table-column>
					<el-table-column label="订单量"  align="center">
						<el-table-column label="数量（袋）" prop="cargoNumSum" align="center"></el-table-column>
						<el-table-column label="重量（吨）" prop="cargoWeightSum" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="剩余量"  align="center">
						<el-table-column label="数量（袋）" prop="remainingCargoNum" align="center"></el-table-column>
						<el-table-column label="重量（吨）" prop="remainingCargoWeight" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="创建时间" width="140" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown 
								@command="handleCommand" 
								trigger="click" 
								v-show="permissions[$route.name] && (
									permissions[$route.name]['detail'] 
									|| permissions[$route.name]['update'] 
									|| permissions[$route.name]['close'] 
									|| permissions[$route.name]['delete']) 
									|| scope.row.status == 'Committed' 
									|| scope.row.status == 'Running' 
									|| scope.row.status == 'Signed'">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item 
										:command="{type: 'view', id: scope.row.carrierOrderID}" 
										v-if="permissions[$route.name]&&permissions[$route.name]['detail']">
										查看
									</el-dropdown-item>
									<el-dropdown-item 
										:command="{type: 'edit', id: scope.row.carrierOrderID}" 
										v-if="scope.row.status == 'Committed' && permissions[$route.name] && permissions[$route.name]['update']">
										编辑
									</el-dropdown-item>
									<el-dropdown-item 
										:command="{type: 'close', id: scope.row.carrierOrderID}" 
										v-if="(scope.row.status == 'Running' || scope.row.status == 'Signed') && permissions[$route.name]&&permissions[$route.name]['close']">
										关闭
									</el-dropdown-item>
									<el-dropdown-item 
										:command="{type: 'delete', id: scope.row.carrierOrderID}" 
										v-if="scope.row.status == 'Committed' && permissions[$route.name] && permissions[$route.name]['delete']">
										删除
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
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
import { mapGetters } from 'vuex'
import request, { baseURL } from '../../../common/request'
import { baseMixin } from '../../../common/mixin'
import dist from '../../../assets/data/distpicker.data.js'
import { deleteConfirm, closeConfirm } from '../../../common/utils'
import CarryOrder from '../../../api/CarryOrder'
import Company from '../../../api/Company'
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
				shipperNo: '',
				carrierOrderNo: '',

				shipperID: '',
				shipperName: '',
				consigneeID: '',
				customerName: '',

				cargoName: '',
				plateNo: '',
				verifyFlag: '',
				status: '',
				begin: '',
				end: ''
			},
			exportExcelUrl: ''
		}
	},
	created() {
		this.resetExportExcelUrl()
		this.getList()
    },
    computed: {
        ...mapGetters(['permissions'])
    },
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	methods: {
		getShippers(companyName, cb) {
			this.find.shipperID = ''
			Company.customerSuggest({ companyName }).then(res => { cb(res) })
		},
		getCustomers(companyName, cb) {
			this.find.consigneeID = ''
			Company.customerSuggest({ companyName }).then(res => { cb(res) })
		},
		handSelectShipper(data) {
			this.find.shipperID = data.customerID
			this.find.shipperName = data.companyName
			this.resetExportExcelUrl()
		},
		handSelectCustomer(data){
			this.find.consigneeID = data.customerID
			this.find.customerName = data.companyName
			this.resetExportExcelUrl()
		},
		clearSelectShipper() {
			this.find.shipperID = ''
			this.find.shipperName = ''
			this.resetExportExcelUrl()
		},
		clearSelectCustomer() {
			this.find.consigneeID = ''
			this.find.customerName =''
			this.resetExportExcelUrl()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.carrierOrderID)
		},
		search() {
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		reset() {
			for(const key in this.find)
				this.find[key] = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/carryOrder/export?Request-From=PC&Authorization=' 
			+ localStorage.getItem("token")
			+ '&shipperNo=' + this.find.shipperNo 
			+ '&carrierOrderNo=' + this.find.carrierOrderNo
			+ '&shipperID=' + this.find.shipperID
			+ '&consigneeID=' + this.find.consigneeID
			+ '&cargoName=' + this.find.cargoName
			+ '&plateNo=' + this.find.plateNo
			+ '&verifyFlag=' + this.find.verifyFlag
			+ '&status=' + this.find.status
			+ '&begin=' + this.find.begin 
			+ '&end=' + this.find.end
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		getList() {
			CarryOrder.find({
				current: this.pageIndex,
				size: this.pageSize,
				shipperNo: this.find.shipperNo,
				carrierOrderNo: this.find.carrierOrderNo,
				shipperID: this.find.shipperID,
				consigneeID: this.find.consigneeID,
				cargoName: this.find.cargoName,
				plateNo: this.find.plateNo,
				verifyFlag: this.find.verifyFlag,
				status: this.find.status,
				begin: this.find.begin,
				end: this.find.end
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
        },
		handleCommand(e) {
			if(e.type == 'view') {
				this.$router.push({name: 'viewcarrierbill', query: {carrierOrderID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editcarrierbill', query: {carrierOrderID: e.id}})
			} else if (e.type == 'close') {
				this.close(e.id)
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		add() {
			this.$router.push({ name: 'addcarrierbill' })
		},
		view(carrierOrderID) {
			this.$router.push({ name: 'viewcarrierbill', query: { carrierOrderID }})
		},
		close(carrierOrderID) {
			closeConfirm(carrierOrderID, carrierOrderIDs => {
				CarryOrder.close({ carrierOrderIDs }).then(res => {
					Message({ type: 'success', message: '关闭成功!' })
					this.getList()
				})
			})
		},
		del(carrierOrderID) {
			deleteConfirm(carrierOrderID, carrierOrderIDs => {
				CarryOrder.delBatch({ carrierOrderIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			})
		}
	}
}

</script>
<style lang="stylus" scoped>
.table
	overflow hidden
	overflow-x auto
.wfTable
	width 100%
	background #e2ecf6
	border-spacing 1px
	font-size 14px
	margin-bottom 10px
	th
	td
		white-space  nowrap 
	td
		background #fff
		padding 6px 10px
		height 36px
		line-height 24px
		color #666
		position relative
	.tit
		td
			border-top 10px solid #fff
			background #f8f8f8
			color #3582d0
			.infoItem
				margin-right 40px
				height 24px
				line-height 24px
				display inline-block
				&.ViewDispatchBill
					cursor pointer
	th
		padding 6px 10px
		height 36px
		line-height 24px
		background #f0f0f0
		color #666
		width 100px
	.list
		td
			font-size 12px
			.ViewTaskDetail
				cursor pointer
				display block
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-left 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>
