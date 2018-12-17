<template>
	<div class="main-content">
		<el-card class="box-card">
            <div slot="header" class="clearfix">DL交货单</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="交货单号">
						<el-input placeholder="交货单号" v-model="find.keyword" @change="inputChange"></el-input>
					</el-form-item>
                    <el-form-item label="工厂名称" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.status" @change="inputChange">
							<el-option value="Committed" label="未执行">未执行</el-option>
							<el-option value="Running" label="执行中">执行中</el-option>
							<el-option value="Signed" label="已完成">已完成</el-option>
							<el-option value="Closed" label="已关闭">已关闭</el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="客户名称">
						<el-autocomplete 
							style="width:100%" 
                            value-key="companyName" 
                            v-model="find.shipperCompanyName"
                            
                            placeholder="请输入..."
                            @change="inputChange">
							<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelect"></i>
                        </el-autocomplete>
					</el-form-item>
                    <el-form-item label="产品名称">
						<el-autocomplete 
							style="width:100%" 
                            value-key="companyName" 
                            v-model="find.shipperCompanyName"
                            placeholder="请输入..."
                            @change="inputChange">
							<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelect"></i>
                        </el-autocomplete>
					</el-form-item>
                    <el-form-item label="监控级别" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.status" @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="A" label="A"></el-option>
							<el-option value="B" label="B"></el-option>
							<el-option value="C" label="C"></el-option>
							<el-option value="D" label="D"></el-option>
							<el-option value="E" label="E"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="车牌号">
						<el-input placeholder="车牌号" v-model="find.keyword" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="校验结果" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.status" @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="Running" label="已通过"></el-option>
							<el-option value="Signed" label="未通过"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="数据来源" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.status" @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="Running" label="DL系统"></el-option>
							<el-option value="Signed" label="手工录入"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="出厂时间从" prop="begin">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" v-model="find.begin" @change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至" prop="end">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.end" @change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<a :href="exportExcelUrl" class="exportExcel el-icon-download">导出</a>
                <el-button type="default" size="mini" icon="el-icon-delete" style="margin-left:10px">批量生成</el-button>
                <el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="交货单号" width="170"  align="center">
						<template slot-scope="scope">
							<span @click="view(scope.row.carrierOrderID)" class="link">{{scope.row.carrierOrderNo}}</span>
						</template>
					</el-table-column>
					<el-table-column label="监控级别" align="center" width='80' prop="status"></el-table-column>
                    <el-table-column label="车牌号" align="center"  width='120' prop="status"></el-table-column>
					<el-table-column label="工厂" prop="cargoName" align="center"></el-table-column>
					<el-table-column label="客户" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="产品" prop="shipperArea"></el-table-column>
					<el-table-column label="数量（袋）" prop="shipperArea"></el-table-column>
					<el-table-column label="重量（吨）" prop="shipperArea"></el-table-column>
					<el-table-column label="创建时间" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.commissionDate">{{ new Date(scope.row.commissionDate).getTime() | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="业务状态" prop="consigneeCompanyName" align="center"></el-table-column>
					<el-table-column label="数据来源" prop="consigneeArea"></el-table-column>
					<el-table-column label="数据校验" align="center">
						
					</el-table-column>
					<el-table-column label="备注">
						
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{type: 'close', id: scope.row.carrierOrderID}" v-if="scope.row.status == 'Running'">生成</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.carrierOrderID}" v-if="scope.row.status == 'Committed'">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.carrierOrderID}" v-if="scope.row.status == 'Committed'">删除</el-dropdown-item>
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
import request, { baseURL } from '../../../common/request'
import { baseMixin } from '../../../common/mixin'
import dist from '../../../assets/data/distpicker.data.js'
import { deleteConfirm } from '../../../common/utils'
import CarryOrder from '../../../api/CarryOrder'
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
				keyword: '',
				status: '',
				begin: '',
				end: ''
			},
			exportExcelUrl: '',
		}
	},
	created() {
		this.resetExportExcelUrl()
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	methods: {
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
			this.find.keyword = ''
			this.find.status = ''
			this.find.begin = ''
			this.find.end = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/carryOrder/export?Authorization=' + localStorage.getItem("token")	
			+ '&keyword=' + this.find.keyword 
			+ '&status=' + this.find.status
			+ '&begin=' + this.find.begin 
			+ '&end=' + this.find.end
		},
		inputChange() {
			this.resetExportExcelUrl()
        },
        clearSelect(){},
		getList() {
			CarryOrder.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
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
				this.$router.push({name: 'viewdelivery', query: {carrierOrderID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editdelivery', query: {carrierOrderID: e.id}})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
        },
		add() {
			this.$router.push({ name: 'adddelivery' })
		},
		view(carrierOrderID) {
			this.$router.push({ name: 'viewdelivery', query: { carrierOrderID }})
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
