<template>
	<div class="main-content">
		<el-card class="box-card customerCardHeader">
			<div slot="header" class="tab clearfix"><span :class="isCur==0?'cur':''" @click="tabClick(0)">已调度</span><span :class="isCur==1?'cur':''" @click="tabClick(1)">调度历史</span></div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="交货单号">
						<el-input placeholder="交货单号" v-model="find.shipperNo" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="调度单号">
						<el-input placeholder="调度单号" v-model="find.dispatchOrderNo" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="工厂名称">
						<el-select placeholder="请选择" v-model="find.shipperCustomerID" @change="inputChange">
                            <el-option label="全部" value=""></el-option>
                            <el-option 
                                :label="item.companyName" 
                                :value="item.customerID" 
                                v-for="(item, i) in companys" 
                                :key="i">
                            </el-option>
                        </el-select>
					</el-form-item>
					<el-form-item label="客户名称">
                        <el-autocomplete 
							style="width:100%" 
                            value-key="companyName" 
                            v-model="find.consigneeCustomer"
                            :fetch-suggestions="getCustomers"
                            placeholder="请输入客户名称" 
                            @select="handSelectCustomer" 
							@change="inputChange">
							<i class="el-icon-close el-input__icon" slot="suffix" @click="clearSelectCustomer"></i>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="产品名称">
						<el-input placeholder="产品名称" v-model="find.cargoName" @change="inputChange"></el-input>
					</el-form-item>
                    <el-form-item label="调度状态">
						<el-select placeholder="全部" v-model="find.status" style="width:120px" @change="inputChange">
							<el-option value="" label="全部">全部</el-option>
							<el-option :value="key" :label="value" v-for="(value, key) in DISPATCHORDERSTATUS1" :key="key" v-if="isCur==0"></el-option>
							<el-option :value="key" :label="value" v-for="(value, key) in DISPATCHORDERSTATUS2" :key="key" v-if="isCur==1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="调度类型">
						<el-select placeholder="全部" v-model="find.type" style="width:120px" @change="inputChange">
							<el-option value="" label="全部">全部</el-option>
							<el-option :value="key" :label="value" v-for="(value, key) in DISPATCHORDERTYPE" :key="key"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="装车时间">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px"
                            v-model="find.shipperDateBegin"
							@change="inputChange">
						</el-date-picker>
						<span class="tracto">至</span>
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px"
                            v-model="find.shipperDateEnd"
							@change="inputChange">
						</el-date-picker>
                    </el-form-item>
					<el-form-item label="到货时间">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px"
							v-model="find.consigneeDateBegin" @change="inputChange">
						</el-date-picker>
						<span class="tracto">至</span>
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px" 
							v-model="find.consigneeDateEnd" @change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px"
							v-model="find.dispatchBeginTime" @change="inputChange">
						</el-date-picker>
						<span class="tracto">至</span>
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px" 
							v-model="find.dispatchEndTime" @change="inputChange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search(isCur)">搜索</el-button>
						<el-button type="default" @click="reset(isCur)">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="isCur == 0 ? exportExcelUrl : exportExcelUrl1" class="exportExcel el-icon-download">导出</a>
			</div>
			<div class="tableBox">
				<table class="customerTable">
					<tr>
						<th class="w1">承运单</th>
						<th class="w4">状态</th>
						<th class="w1">交货单号</th>
						<th class="w1">发货方（工厂）</th>
						<th class="w3">货物</th>
						<th class="w1">异常</th>
						<th class="w1">货量</th>
						<th class="w1">件数</th>
						<th class="w2">装车地</th>
						<th class="w1">装车时间</th>
						<th class="w2">送货地</th>
						<th class="w1">送货时间</th>
						<th class="w1">操作</th>
					</tr>
					<template v-for="item in dispatchBillList">
						<tr>
							<td colspan="13" class="blank"></td>
						</tr>
						<tr>
							<td colspan="13" class="txt-l">
								<div class="dispatchbillTit">
									<span class="num" @click="view(item.dispatchOrderID)">调度单号：{{item.dispatchOrderNo}}</span>
									<el-tag type="info" size="mini" >{{DISPATCHORDERTYPESIMPLE[item.type]}}</el-tag>
									<div class="quoteInfo">
										<span>{{item.plateNo}}</span>
										<div v-if="item.type=='Grab' || item.type=='Offer'">
											<div class="quoteList" v-autoscroll v-if="item.status == 'Committed'">
												<div 
													class="quoteListItem" 
													v-for="(quoteItem,i) in item.dispatchOfferVOList" 
													:key="i">
													{{quoteItem.plateNo}}
													<b class="c1">{{quoteItem.amount}}元</b>
													<sup class="forcefontsize8" v-if="i==0">new</sup>
												</div>
											</div>
											<div class="quoteList" v-else>
												<div 
													class="quoteListItem" 
													v-for="(quoteItem,i) in item.dispatchOfferVOList" 
													:key="i">
													{{quoteItem.plateNo}}
													<b class="c1">{{quoteItem.amount}}元</b>
													<sup class="forcefontsize8" v-if="i==0">new</sup>
												</div>
											</div>
										</div>
									</div>
									<el-tag size="mini" type="info" v-if="item.status == 'Committed'">{{DISPATCHORDERTYPEEX[item.type]}}</el-tag>
									<el-tag 
										v-else
										size="mini" 
										:type="item.status == 'Finished' ? 'success' 
										: (item.status == 'Ordered' ? '' : 'info')">
										{{DISPATCHORDERSTATUS[item.status]}}
									</el-tag>
									<span>
										<el-tag size="mini" type="info" v-if="item.closed == 'Y'">已关闭</el-tag>
									</span>
								</div>
								<div class="handler">
									<span 
										class="c1" 
										@click="scramble(item.dispatchOrderID, item.type,item.status)" 
										v-if="item.grabNum>0&&item.type=='Offer'">
										报价人数（{{item.grabNum}}）
									</span>
									<span 
										class="c1" 
										@click="scramble(item.dispatchOrderID, item.type,item.status)" 
										v-if="item.grabNum>0&&item.type=='Grab'">
										抢单人数（{{item.grabNum}}）
									</span>
									<el-button 
										v-if="item.status == 'Ordered' || item.status == 'Finished'"
										type="text" 
										size="mini" 
										@click="trail(item.dispatchOrderID)" 
										style="margin-left:20px">
										跟踪
									</el-button>
									
									<!-- 未接单 -->
									<span v-if="item.status == 'Committed'">
										<el-button type="text" size="mini" :disabled="
											item.dispatchTaskCargoVOList.map(taskItem => taskItem.status).includes('Loaded') 
											|| item.dispatchTaskCargoVOList.map(taskItem => taskItem.status).includes('Signed')
										" @click="cancelDispatchOrder(item.dispatchOrderID)">取消调度</el-button>
										<!-- <el-button type="text" size="mini" :disabled="true"  @click="closeDispatchOrder(item.dispatchOrderID)" style="margin-left:20px">关闭</el-button> -->
									</span>
									<!-- 已接单 -->
									<!-- <span v-else-if="item.status == 'Ordered'">
										<el-button type="text" size="mini" :disabled="
											item.dispatchTaskCargoVOList.map(taskItem => taskItem.status).includes('Loaded') 
											|| item.dispatchTaskCargoVOList.map(taskItem => taskItem.status).includes('Signed')
										" @click="cancelDispatchOrder(item.dispatchOrderID)">取消调度</el-button>
										<el-button type="text" size="mini" @click="closeDispatchOrder(item.dispatchOrderID)" style="margin-left:20px">关闭</el-button>
									</span> -->
									<!-- 已取消 已拒绝-->
									<span v-if="item.status == 'Canceled' || item.status == 'Rejected' || item.status == 'Overdue'">
										<router-link 
											tag="span" 
											class="c6" 
											style="margin-left:0" 
											:to="{name: 'redispatching', query: {dispatchOrderID: item.dispatchOrderID}}">
											重新调度
										</router-link>
										<!-- <el-button type="text" size="mini" :disabled="true" @click="cancelDispatchOrder(item.dispatchOrderID)">取消调度</el-button> -->
									</span>
									<span v-if="item.status == 'Canceled' || item.status == 'Rejected' || item.status == 'Overdue' || item.status == 'Ordered'">
										<el-button 
											v-if="item.closed != 'Y'"
											type="text" 
											size="mini" 
											@click="closeDispatchOrder(item.dispatchOrderID)" 
											style="margin-left:20px">
											关闭
										</el-button>
									</span>
								</div>
							</td>
						</tr>
						<tr v-for="taskItem in item.dispatchTaskCargoVOList" :key="taskItem.dispatchTaskID">
							<td>{{taskItem.carrierOrderNo}}</td>
							<td><el-tag size="mini" type="warning" v-if="taskItem.status == 'Committed'">待装车</el-tag>
								<el-tag size="mini" v-else-if="taskItem.status == 'Loaded'">已装运</el-tag>
								<el-tag size="mini" type="success" v-else-if="taskItem.status == 'Signed'">已签收</el-tag>
								<el-tag size="mini" type="info" v-else>已作废</el-tag>
                            </td>
                            <td>{{taskItem.shipperNo}}</td>
                            <td>{{taskItem.shipperCompanyName}}</td>
							<td class="txt-l"><span class="text-overflow" style="width:270px">{{taskItem.cargoName}}</span></td>
                            <td>
                                <span v-if="taskItem.alarmFlag=='Y'" style="color:#F56C6C">有</span>
                                <span v-else style="color:#67C23A">无</span>
                            </td>
							<td class="text-center" v-if="taskItem.cargoWeight || taskItem.cargoVolume || taskItem.cargoVolume">
								{{taskItem.cargoWeight ? taskItem.cargoWeight + '吨' : ''}}
								{{taskItem.cargoVolume ? (taskItem.cargoWeight ? '/' : '') + taskItem.cargoVolume + '方' : ''}}
							</td>
							<td v-else>0</td>
							<td>{{taskItem.cargoNum}}</td>
							<td>{{taskItem.shipperArea}}</td>
							<td>{{taskItem.shipperDate | isFullDay()}}</td>
							<td>{{taskItem.consigneeArea}}</td>
							<td>{{taskItem.consigneeDate | isFullDay()}}</td>
							<td><el-button type="primary" size="mini" plain @click="viewPhotos(taskItem.dispatchTaskID,taskItem.shipperArea,taskItem.consigneeArea)">查看照片</el-button></td>
						</tr>
					</template>
				</table>
			</div>
			<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</el-card>
		<trail-map 
			v-if="trailDialog" 
			:dispatchOrderID="currentDispatchOrderID" 
			@cancel="handCloseTrail">
		</trail-map>
		<UploadPhoto 
			:isPreview="true" 
			:isVisible="isPhotoVisible" 
			@control="handUploadPhoto" 
			:dispatchTaskID="currentDispatchTaskID" 
			:shipperArea="currentShipperArea" 
			:consigneeArea="currentConsigneeArea">
		</UploadPhoto>
		<scramble 
			:isVisible="isScrambleVisible" 
			:curScrambleType="curScrambleType" 
			:dispatchOrderStatus="dispatchOrderStatus" 
			:dispatchOrderID="currentDispatchOrderID" 
			:callback="callbackScramble">
		</scramble>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import DispatchOrder from '../../../api/DispatchOrder'
import Company from '../../../api/Company'
import TrailMap from '../components/TrailMap'
import UploadPhoto from '../components/UploadPhoto'
import Scramble from '../components/Scramble'
import { baseURL } from '../../../common/request'
import { closeConfirm, dispatchCancel } from '../../../common/utils'
export default {
	mixins: [baseMixin],
	components: { TrailMap, UploadPhoto, Scramble },
	data(){
		return{
			isCur: 0,
			find:{
                shipperNo:'',
                dispatchOrderNo:'',
				shipperCustomerID:'',
				consigneeCustomerID:'',
				consigneeCustomer:'',
				cargoName:'',
				status:'',
				type:'',
				shipperDateBegin:'',
				shipperDateEnd:'',
				consigneeDateBegin:'',
				consigneeDateEnd:'',
				dispatchBeginTime:'',
				dispatchEndTime:''
			},
			companys: [],
			timer: null,
			trailDialog: false,
			dispatchBillList: [],
			currentDispatchTaskID: '',
			currentShipperArea: '',
			currentConsigneeArea: '',
			isPhotoVisible: false,
			currentDispatchOrderID: '',
			truckExp: [],
			driverExp: [],
			isScrambleVisible: false,
			curScrambleType: '',
			dispatchOrderStatus: '',
			exportExcelUrl: '',
			exportExcelUrl1: ''
		}
	},
	directives: {
		autoscroll: {
			bind: (el) => {
				let index = 1
				const num = $(el).children().length
				if(num<2) return
				const newEl = $(el).html()
				$(el).html(newEl + newEl)
				this.timer = setInterval(() => {
					if (index == num + 1) {
						index = 1
						$(el).css({top: '0'})
					}
					$(el).animate({top: `-${28*index}px`})
					index++
				}, 2000)
			},
			unbind: () => {
				this.timer = null
			}
		}
	},
	created() {
		this.resetExportExcelUrl()
		this.getList()
		this.getCompanys()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	destroyed() {
		this.timer = null
	},
	methods:{
		search() {
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		resetSearch(){
			this.find.shipperNo=''
            this.find.dispatchOrderNo=''
            this.find.shipperCustomerID=''
            this.find.consigneeCustomerID=''
            this.find.consigneeCustomer=''
            this.find.cargoName=''
            this.find.status=''
            this.find.type=''
            this.find.shipperDateBegin=''
            this.find.shipperDateEnd=''
            this.find.consigneeDateBegin=''
            this.find.consigneeDateEnd=''
            this.find.dispatchBeginTime=''
            this.find.dispatchEndTime=''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			
		},
		reset(val) {
			this.resetSearch()
			this.resetExportExcelUrl()
			this.getList()
		},
		resetExportExcelUrl() {
			const params = '&shipperNo=' + this.find.shipperNo 
						+ '&dispatchOrderNo=' + this.find.dispatchOrderNo
						+ '&shipperCustomerID=' + this.find.shipperCustomerID
						+ '&consigneeCustomerID=' + this.find.consigneeCustomerID
						+ '&cargoName=' + this.find.cargoName
						+ '&status=' + this.find.status 
						+ '&type=' + this.find.type
						+ '&shipperDateBegin=' + this.find.shipperDateBegin
						+ '&shipperDateEnd=' + this.find.shipperDateEnd
						+ '&consigneeDateBegin=' + this.find.consigneeDateBegin
						+ '&consigneeDateEnd=' + this.find.consigneeDateEnd
						+ '&dispatchBeginTime=' + this.find.dispatchBeginTime
						+ '&dispatchEndTime=' + this.find.dispatchEndTime
			this.exportExcelUrl = baseURL 
				+ '/dispatchOrder/exportDispatched?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token")	
				+ params
			this.exportExcelUrl1 = baseURL 
				+ '/dispatchOrder/exportHistory?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token")	
				+ params
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		tabClick(val){
			this.isCur = val
			this.reset()
		},
		view(dispatchOrderID) {
			this.$router.push({ name: 'viewdispatchbill' , query: { dispatchOrderID } })
		},
		// 查看照片弹窗回调
		viewPhotos(dispatchTaskID,shipperArea,consigneeArea) {
			this.currentDispatchTaskID = dispatchTaskID
			this.currentShipperArea = shipperArea
			this.currentConsigneeArea = consigneeArea
			this.isPhotoVisible = true
		},
		handUploadPhoto(bool) {
			this.isPhotoVisible = false
		},
        getCustomers(companyName, cb) {
			this.find.consigneeID = ''
			Company.customerFind({
                current: 1,
                size: 1000,
                customerType: 'Consignee',
                keyword:this.find.consigneeCustomer
            }).then(res => {
                cb(res.records) 
            })
		},
		handSelectCustomer(data){
			this.find.consigneeCustomerID = data.customerID
            this.find.consigneeCustomer = data.companyName
			this.resetExportExcelUrl()
		},
		clearSelectCustomer(){
			this.find.consigneeCustomerID = ''
			this.find.consigneeCustomer =''
			this.resetExportExcelUrl()
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
			this.dispatchBillList = []
			if(this.isCur == 0){
				this.getDispatchedList()
			}else{
				this.getHistoryList()
			}
        },
        clearSelect() {

		},
		getDispatchedList() {
			DispatchOrder.listOfOnway({
				current: this.pageIndex,
				size: this.pageSize,
				shipperNo:this.find.shipperNo,
                dispatchOrderNo:this.find.dispatchOrderNo,
                shipperCustomerID:this.find.shipperCustomerID,
                consigneeCustomerID:this.find.consigneeCustomerID,
                cargoName:this.find.cargoName,
                status:this.find.status,
                type:this.find.type,
                shipperDateBegin:this.find.shipperDateBegin,
                shipperDateEnd:this.find.shipperDateEnd,
                consigneeDateBegin:this.find.consigneeDateBegin,
                consigneeDateEnd:this.find.consigneeDateEnd,
                dispatchBeginTime:this.find.dispatchBeginTime,
                dispatchEndTime:this.find.dispatchEndTime
			}).then(res => {
				this.dispatchBillList = res.records
				this.total = res.total
			})
		},
		getHistoryList() {
			DispatchOrder.listOfHistory({
				current: this.pageIndex,
				size: this.pageSize,
				shipperNo:this.find.shipperNo,
                dispatchOrderNo:this.find.dispatchOrderNo,
                shipperCustomerID:this.find.shipperCustomerID,
                consigneeCustomerID:this.find.consigneeCustomerID,
                cargoName:this.find.cargoName,
                status:this.find.status,
                type:this.find.type,
                shipperDateBegin:this.find.shipperDateBegin,
                shipperDateEnd:this.find.shipperDateEnd,
                consigneeDateBegin:this.find.consigneeDateBegin,
				consigneeDateEnd:this.find.consigneeDateEnd,
				dispatchBeginTime:this.find.dispatchBeginTime,
                dispatchEndTime:this.find.dispatchEndTime
			}).then(res => {
				this.dispatchBillList = res.records
				this.total = res.total
			})
		},
		/**
		 * 抢单或报价详情
		 */
		scramble(dispatchOrderID,type,status) {
			this.isScrambleVisible = true
			this.curScrambleType = type
			this.dispatchOrderStatus = status
			this.currentDispatchOrderID = dispatchOrderID
		},
		callbackScramble(bool) {
			this.isScrambleVisible = false
			bool && this.getList()
		},
		handCloseTrail() {
			this.trailDialog = false
		},
		trail(dispatchOrderID) {
			// this.currentDispatchOrderID = dispatchOrderID
			// this.trailDialog = true
			const routeData = this.$router.resolve({name: 'trackquery', query: { dispatchOrderID }})
			window.open(routeData.href, '_blank')
		},
		/**
		 * 关闭调度
		 */
		closeDispatchOrder(id){
			closeConfirm(id, dispatchOrderID => {
				DispatchOrder.close({ dispatchOrderID }).then(res => {
					Message.success('关闭调度成功!')
					this.getList()
				})
			})
		},
		/**
		 * 取消调度
		 */
		cancelDispatchOrder(id) {
			dispatchCancel(id, dispatchOrderID => {
				DispatchOrder.cancel({ dispatchOrderID }).then(res =>{
					Message.success('已成功取消调度单!')
					this.getList()
				})
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
	.tab
		height 36px
		span
			margin-right 20px
			padding 0 15px
			height 36px
			line-height 36px
			cursor pointer
			display inline-block
			position relative
			color #999
			&:last-child
				margin-right 0
			&.cur
				color #409EFF
				&:after
					height 2px
					position absolute
					left 0
					top 35px
					background #409EFF
					content ""
					width 100%
					display block
	.tableBox
		width 100%
		overflow hidden
		overflow-x auto
		.customerTable
			font-size 12px
			background #dcdfe6
			border-spacing 1px
			width 100%
			caption
				text-align left
				height 30px
				line-height 30px
			th
			td
				&.txt-l
					text-align left	
				&.w1
					width 140px
				&.w2
					width 200px
				&.w3
					width 300px
				&.w4
					width 100px
			th
				background #f2f2f2
				color #666
				padding 10px 15px
				white-space  nowrap
			td
				padding 10px 15px
				background #fff
				color #999
				white-space  nowrap 
				text-align center
				&.blank
					padding 5px 0
					background #f8f8f8
				.tags
					background #409EFF
					color #fff
					width 18px
					height 18px
					display inline-block
					border-radius 4px
					font-size 12px
					line-height 18px
					text-align center
					margin-right 4px
				.success
					position absolute
					right 10px
					top 50%
					transform translateY(-50%)
				p
					margin 0
					padding 0
					line-height 24px
				.dispatchbillTit
					float left
					height 28px
					
					.num
						color #409EFF
						margin-right 10px
						cursor pointer
						line-height 28px
					.quoteInfo
						width 300px
						padding 0 10px
						display inline-block
						vertical-align top
						height 28px
						line-height 28px
						overflow hidden
						position relative
						.quoteList
							position absolute
							.quoteListItem
								b
									font-weight normal
									margin-left 10px
								.forcefontsize8
									color #f00
									margin-left 5px
									display inline-block
									font-size 12px
									-webkit-text-size-adjust none
									-webkit-transform scale(0.8,0.8)								
				.handler
					float right
					height 28px
					span
						margin-left 20px
						line-height 28px
						vertical-align top
						cursor pointer
						&.noCursor
							cursor auto

	.c3			
		color #f60
	.selectTruck
		cursor pointer
	.tracto
		padding 0 5px 0 8px		
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
</style>