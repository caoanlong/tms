<template>
	<div class="main-content">
		<el-card class="box-card">
            <div slot="header" class="clearfix">DL交货单</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="交货单号">
						<el-input placeholder="交货单号" v-model="find.code" @change="inputChange"></el-input>
					</el-form-item>
                    <!-- <el-form-item label="工厂名称" class="customerSelect">
						<el-autocomplete 
                            value-key="companyName" 
                            v-model="find.companyName"
                            :fetch-suggestions="getCustomers"
                            placeholder="请输入工厂名称" 
                            @select="handSelectCustomer" 
							@change="inputChange">
							<i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectCustomer"></i>
                        </el-autocomplete>
					</el-form-item> -->
                    <el-form-item label="客户名称">
						<el-autocomplete 
                            value-key="companyName" 
                            v-model="find.dealerName"
                            :fetch-suggestions="getDealer"
                            placeholder="请输入客户名称" 
                            @select="handSelectDealer" 
							@change="inputChange">
							<i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectDealer"></i>
                        </el-autocomplete>
					</el-form-item>
                    <el-form-item label="产品名称">
						 <el-autocomplete 
                            value-key="cargoName" 
                            v-model="find.cargoName"
                            :fetch-suggestions="getCargoList"
                            placeholder="请输入产品名称" 
                            @select="handSelectCargoList" style="width:100%">
                            <i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectCargoList"></i>
                        </el-autocomplete>
					</el-form-item>
                    <el-form-item label="监控级别" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.level" @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="A" label="A"></el-option>
							<el-option value="B" label="B"></el-option>
							<el-option value="C" label="C"></el-option>
							<el-option value="D" label="D"></el-option>
							<el-option value="E" label="E"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="车牌号">
						<el-input placeholder="车牌号" v-model="find.plateNo" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="校验结果" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.verifyFlag" @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="Y" label="已通过"></el-option>
							<el-option value="N" label="未通过"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="数据来源" class="customerSelect">
						<el-select placeholder="请选择" v-model="find.comeFrom" @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="DL" label="DL系统"></el-option>
							<el-option value="TMS" label="手工录入"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="出厂时间从">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" v-model="find.outTimeBegin" @change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							v-model="find.outTimeEnd" @change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add" v-if="permissions[$route.name]&&['add']">添加</el-button>
				<el-upload 
					class="upload-File" 
					name="excelFile" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess"  
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2" v-if="permissions[$route.name]&&permissions[$route.name]['import']">导入</el-button>
				</el-upload>
				<a :href="exportExcelUrl" class="exportExcel el-icon-download" v-if="permissions[$route.name]&&permissions[$route.name]['export']"> 导出</a>
                <a :href="templateUrl" download="deliveryorder.xlsx" class="download-btn"  v-if="permissions[$route.name]&&permissions[$route.name]['import']">
					<svg-icon iconClass="excel-icon"></svg-icon>下载模板
				</a>
                <el-button type="default" size="mini" icon="el-icon-tickets" @click="dispatch" v-if="permissions[$route.name]&&permissions[$route.name]['dispatch']">批量生成</el-button>
                <el-button type="default" size="mini" icon="el-icon-delete" @click="del" v-if="permissions[$route.name]&&permissions[$route.name]['delete']">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="交货单号" width="150"  align="center">
						<template slot-scope="scope">
							<span @click="view(scope.row.deliveryOrderID)" class="link">{{scope.row.code}}</span>
						</template>
					</el-table-column>
					<el-table-column label="监控级别" align="center" width='80' prop="level"></el-table-column>
                    <el-table-column label="车牌号" align="center"  width='120' prop="plateNo"></el-table-column>
					<el-table-column label="工厂" prop="shipperName" align="center"  width='130'></el-table-column>
					<el-table-column label="客户" prop="consigneeName" align="center"  width='130'></el-table-column>
					<el-table-column label="产品" prop="cargoName" align="center"></el-table-column>
					<el-table-column label="数量（袋）" prop="cargoQuantity"  align="center"  width='120'></el-table-column>
					<el-table-column label="重量（吨）" prop="cargoWeight"  align="center"  width='120'></el-table-column>
					<el-table-column label="创建时间" width="140" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{ moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
						</template>
					</el-table-column>
					<el-table-column label="业务状态" prop="status"  align="center"  width='100'>
                        <template slot-scope="scope">
						    {{scope.row.status=='Loaded'?'已装车':'已卸货'}}
						</template>
                    </el-table-column>
					<el-table-column label="数据来源"  align="center"  width='120'>
                        <template slot-scope="scope">
						    {{scope.row.comeFrom=='TMS'?'手工录入':'DL系统'}}
						</template>
                    </el-table-column>
					<el-table-column label="数据校验"  align="center"  width='120'>
						<template slot-scope="scope">
                            <span v-if="scope.row.verifyFlag=='Y'" stytle="color:#67C23A">已通过</span>
                            <span v-else style="color:#F56C6C">未通过</span>
						</template>
					</el-table-column>
					<el-table-column label="备注" prop="verifyRemark"></el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click" v-if="scope.row.verifyFlag =='N'">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown" >
                                    <el-dropdown-item :command="{type: 'dispatch', id: scope.row.deliveryOrderID}" v-if="permissions[$route.name]&&permissions[$route.name]['dispatch']">生成调度</el-dropdown-item>
                                    <el-dropdown-item :command="{type: 'view', id: scope.row.deliveryOrderID}" v-if="permissions[$route.name]&&permissions[$route.name]['detail']">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.deliveryOrderID}" v-if="permissions[$route.name]&&permissions[$route.name]['update']">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.deliveryOrderID}" v-if="permissions[$route.name]&&permissions[$route.name]['delete']">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
                            <span v-else>已调度</span>
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
import { baseURL } from '../../../common/request'
import { baseMixin } from '../../../common/mixin'
import dist from '../../../assets/data/distpicker.data.js'
import { deleteConfirm,dispatchConfirm } from '../../../common/utils'
import DeliveryOrder from '../../../api/DeliveryOrder'
import Company from '../../../api/Company'
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
                code:'',
                companyCode:'',
                companyName:'',
                dealerCode:'',
                dealerName:'',
                cargoName:'',
                cargoCode:'',
                level:'',
                plateNo:'',
                verifyFlag:'',
                comeFrom:'',
				outTimeBegin: '',
				outTimeEnd: ''
			},
            uploadHeaders: {'Authorization': localStorage.getItem('token'),'Request-From':'PC'},
			importFileUrl: baseURL 
				+ '/deliveryOrder/import?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token"),
			exportExcelUrl:'',
			templateUrl: baseURL 
				+ '/base/filetemplate/downLoadTemplate?fileName=deliveryorder.xlsx&Request-From=PC&Authorization=' 
				+ localStorage.getItem("token")
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
    computed: {
        ...mapGetters(['permissions'])
    },
	methods: {
		selectionChange(data) {
			this.selectedList = data.map(item => item.deliveryOrderID)
		},
		search() {
			this.pageIndex = this.PAGEINDEX
            this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		reset() {
			this.find.code=''
            this.find.companyCode=''
            this.find.companyName=''
            this.find.dealerCode=''
            this.find.dealerName=''
            this.find.cargoName=''
            this.find.cargoCode=''
            this.find.level=''
            this.find.plateNo=''
            this.find.verifyFlag=''
            this.find.comeFrom=''
            this.find.outTimeBegin=''
            this.find.outTimeEnd=''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/deliveryOrder/export?Request-From=PC&Authorization=' + localStorage.getItem("token")	
			+ '&code=' + this.find.code 
			+ '&companyCode=' + this.find.companyCode
			+ '&dealerCode=' + this.find.dealerCode 
			+ '&cargoCode=' + this.find.cargoCode
			+ '&level=' + this.find.level
			+ '&plateNo=' + this.find.plateNo
			+ '&verifyFlag=' + this.find.verifyFlag
			+ '&cargoName=' + this.find.cargoName
			+ '&comeFrom=' + this.find.comeFrom
			+ '&outTimeBegin=' + this.find.outTimeBegin
			+ '&outTimeEnd=' + this.find.outTimeEnd
		},
		inputChange() {
			this.resetExportExcelUrl()
        },
        getCustomers(companyName, cb) {
			this.find.companyCode = ''
			Company.customerFind({
                current: 1,
                size: 1000,
                customerType: 'Shipper',
                keyword:this.find.companyName
            }).then(res => {
                cb(res.records) 
            })
		},
        handSelectCustomer(data){
			this.find.companyCode = data.code
            this.find.companyName = data.companyName
			this.resetExportExcelUrl()
        },
        clearSelectCustomer(){
			this.find.companyCode = ''
			this.find.companyName =''
			this.resetExportExcelUrl()
		},
        getDealer(companyName, cb) {
			this.find.dealerCode = ''
			Company.customerFind({
                current: 1,
                size: 1000,
                customerType: 'Consignee',
                keyword:this.find.dealerName
            }).then(res => {
                cb(res.records)
            })
		},
        handSelectDealer(data){
			this.find.dealerCode = data.code
            this.find.dealerName = data.companyName
			this.resetExportExcelUrl()
        },
        clearSelectDealer(){
			this.find.dealerCode = ''
			this.find.dealerName =''
			this.resetExportExcelUrl()
        },
        getCargoList(Name, cb) {
			this.find.cargoCode = ''
			Company.cargoFind({
                current: 1,
                size: 1000,
                cargoName: this.find.cargoName
            }).then(res => {
                cb(res.records)
            })
		},
        handSelectCargoList(data){
			this.find.cargoCode = data.code
            this.find.cargoName = data.cargoName
        },
        clearSelectCargoList(){
			this.find.cargoCode = ''
			this.find.cargoName =''
		},
		getList() {
			DeliveryOrder.orderList({
				current: this.pageIndex,
				size: this.pageSize,
				code:this.find.code,
                companyCode:this.find.companyCode,
                dealerCode:this.find.dealerCode,
                cargoCode:this.find.cargoCode,
                level:this.find.level,
                plateNo:this.find.plateNo,
                verifyFlag:this.find.verifyFlag,
                comeFrom:this.find.comeFrom,
                outTimeBegin:this.find.outTimeBegin,
                outTimeEnd:this.find.outTimeEnd
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
        },
		handleCommand(e) {
			if(e.type == 'view') {
				this.$router.push({name: 'viewdelivery', query: {deliveryOrderID: e.id}})
			} else if (e.type == 'edit') {
				this.$router.push({name: 'editdelivery', query: {deliveryOrderID: e.id}})
			} else if (e.type == 'dispatch') {
				this.dispatch(e.id)
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
        },
		add() {
			this.$router.push({ name: 'adddelivery' })
		},
		view(deliveryOrderID) {
			this.$router.push({ name: 'viewdelivery', query: { deliveryOrderID }})
		},
		del(deliveryOrderID) {
			deleteConfirm(deliveryOrderID, deliveryOrderIDs => {
				DeliveryOrder.delBatch({ deliveryOrderIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			},this.selectedList)
        },
        dispatch(deliveryOrderID) {
			dispatchConfirm(deliveryOrderID, deliveryOrderIDs => {
				DeliveryOrder.dispatch({ deliveryOrderIDs }).then(res => {
					Message({ 
                        type: 'success', 
                        message: res.data.msg 
                    })
					this.getList()
				}).catch(err => {
                    Message({ 
                        type: 'error', 
                        message: res.data.msg 
                    })
                    this.getList()
                })
			},this.selectedList)
        },
        // 导入成功
		uploadSuccess (response) {
			if(response.code != 200){
				Message.error(response.msg)
			} else{
				Message.success(response.msg)
				this.getList()
			}
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
