<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">调度列表</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input style="width:250px" placeholder="调度单号/货物名称/司机/车牌号" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="收发货单位">
						<el-autocomplete
							value-key="companyName" 
							v-model="find.companyName"
							:fetch-suggestions="getCustomers"
							placeholder="请输入收发货单位"
							@select="handSelectCustomer">
						</el-autocomplete>
					</el-form-item>
					<el-form-item label="调度状态">
						<el-select v-model="find.status" placeholder="请选择">
							<el-option label="全部" value=""></el-option>
							<el-option label="未接单" value="Committed"></el-option>
							<el-option label="已接单" value="Ordered"></el-option>
							<el-option label="已关闭" value="Closed"></el-option>
							<el-option label="已取消" value="Canceled"></el-option>
							<el-option label="已拒绝" value="Rejected"></el-option>
							<el-option label="已完成" value="Finished"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="调度时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" v-model="find.beginDispatchDate">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" v-model="find.endDispatchDate">
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
			</div>
			<div class="table">
				<table class="wfTable">
					<tr>
						<th width="200">任务编号</th>
						<th width="80">状态</th>
						<th width="80">货物</th>
						<th>货量</th>
						<th>数量</th>
						<th>装车地</th>
						<th width="140">装车时间</th>
						<th>送货地</th>
						<th width="140">送货时间</th>
						<th>操作</th>
					</tr>
					<template v-for="item in dispatchBillList">
						<tr class="tit" :key="item.dispatchOrderID">
							<td colspan="10">
								<span class="infoItem ViewDispatchBill" @click="view(item.dispatchOrderID)">调度单号：{{item.dispatchOrderNo}}</span>
								<span class="infoItem">车牌号：{{item.plateNo}}</span>
								<span class="infoItem" v-if="item.trailerPlateNo">挂车：{{item.trailerPlateNo}}</span>
								<span class="infoItem">
									<el-tag size="mini" type="warning" v-if="item.status == 'Committed'">未接单</el-tag>
									<el-tag size="mini" v-else-if="item.status == 'Ordered'">已接单</el-tag>
									<el-tag size="mini" type="info" v-else-if="item.status == 'Canceled'">已取消</el-tag>
									<el-tag size="mini" type="info" v-else-if="item.status == 'Rejected'">已拒绝</el-tag>
									<el-tag size="mini" type="info" v-else-if="item.status == 'Closed'">已关闭</el-tag>
									<el-tag size="mini" type="success" v-else-if="item.status == 'Finished'">已完成</el-tag>
								</span>
								<!-- 未接单 -->
								<span class="fr" v-if="item.status == 'Committed'">
									<el-button type="text" size="mini" :disabled="true">编辑</el-button>
									<el-button type="text" size="mini" :disabled="
										item.dispatchTaskList.map(item => item.status).includes('Loaded') 
										|| item.dispatchTaskList.map(item => item.status).includes('Signed')
									" @click="cancelDispatchOrder(item.dispatchOrderID)">取消调度</el-button>
									<el-button type="text" size="mini" :disabled="true"  @click="closeDispatchOrder(item.dispatchOrderID)">关闭</el-button>
									<el-button type="text" size="mini" @click="del(item.dispatchOrderID)" :disabled="
										item.dispatchTaskList.map(item => item.status).includes('Loaded') 
										|| item.dispatchTaskList.map(item => item.status).includes('Signed')
									">删除</el-button>
								</span>
								<!-- 已接单 -->
								<span class="fr" v-else-if="item.status == 'Ordered'">
									<el-button type="text" size="mini" :disabled="true">编辑</el-button>
									<el-button type="text" size="mini" :disabled="
										item.dispatchTaskList.map(item => item.status).includes('Loaded') 
										|| item.dispatchTaskList.map(item => item.status).includes('Signed')
									" @click="cancelDispatchOrder(item.dispatchOrderID)">取消调度</el-button>
									<el-button type="text" size="mini" @click="closeDispatchOrder(item.dispatchOrderID)">关闭</el-button>
									<el-button type="text" size="mini" @click="del(item.dispatchOrderID)" :disabled="true">删除</el-button>
								</span>
								<!-- 已取消 -->
								<span class="fr" v-else-if="item.status == 'Canceled'">
									<el-button type="text" size="mini" :disabled="
										item.dispatchTaskList.map(item => item.status).includes('Loaded') 
										|| item.dispatchTaskList.map(item => item.status).includes('Signed')
									" @click="edit(item.dispatchOrderID)">编辑</el-button>
									<el-button type="text" size="mini" :disabled="true" @click="cancelDispatchOrder(item.dispatchOrderID)">取消调度</el-button>
									<el-button type="text" size="mini" :disabled="true"  @click="closeDispatchOrder(item.dispatchOrderID)">关闭</el-button>
									<el-button type="text" size="mini" @click="del(item.dispatchOrderID)" :disabled="
										item.dispatchTaskList.map(item => item.status).includes('Loaded') 
										|| item.dispatchTaskList.map(item => item.status).includes('Signed')
									">删除</el-button>
								</span>
								<!-- 已拒绝 -->
								<span class="fr" v-else-if="item.status == 'Rejected'">
									<el-button type="text" size="mini" :disabled="
										item.dispatchTaskList.map(item => item.status).includes('Loaded') 
										|| item.dispatchTaskList.map(item => item.status).includes('Signed')
									" @click="edit(item.dispatchOrderID)">编辑</el-button>
									<el-button type="text" size="mini" :disabled="true" @click="cancelDispatchOrder(item.dispatchOrderID)">取消调度</el-button>
									<el-button type="text" size="mini" :disabled="true"  @click="closeDispatchOrder(item.dispatchOrderID)">关闭</el-button>
									<el-button type="text" size="mini" @click="del(item.dispatchOrderID)" :disabled="
										item.dispatchTaskList.map(item => item.status).includes('Loaded') 
										|| item.dispatchTaskList.map(item => item.status).includes('Signed')
									">删除</el-button>
								</span>
							</td>
						</tr>
						<tr class="list" v-for="taskItem in item.dispatchTaskList" :key="taskItem.taskNo">
							<td class="text-center">
								<span @click="viewTask(taskItem.dispatchTaskID,'view')" class="ViewTaskDetail">{{taskItem.taskNo}}</span>
							</td>
							<td class="text-center" width="80">
								<span v-if="taskItem.status == 'Committed'">待装车</span>
								<span v-else-if="taskItem.status == 'Loaded'">已装运</span>
								<span v-else-if="taskItem.status == 'Signed'">已签收</span>
								<span v-else>已作废</span>
							</td>
							<td class="text-center">{{taskItem.cargoName}}</td>
							<td class="text-center" v-if="taskItem.loadWeightSum || taskItem.loadVolumeSum || taskItem.loadVolumeSum">
								{{taskItem.loadWeightSum ? taskItem.loadWeightSum + '吨' : ''}}
								{{taskItem.loadVolumeSum ? (taskItem.loadWeightSum ? '/' : '') + taskItem.loadVolumeSum + '方' : ''}}
							</td>
							<td class="text-center" v-else>0</td>
							<td class="text-center">{{taskItem.loadNumSum}}</td>
							<td class="text-center">{{taskItem.shipperArea}}</td>
							<td class="text-center" width="120">{{taskItem.shipperDate | getdatefromtimestamp(true)}}</td>
							<td class="text-center">{{taskItem.consigneeArea}}</td>
							<td class="text-center" width="120">{{taskItem.consigneeDate | getdatefromtimestamp(true)}}</td>
							<td class="text-center">
								<el-button type="text" size="mini" @click="upload(taskItem)" :disabled="
									item.status == 'Committed' || item.status == 'Canceled' || item.status == 'Rejected' 
									|| (item.status == 'Finished' && taskItem.status != 'Signed')
								">上传照片</el-button>
								<el-button type="text" size="mini" @click="viewTask(taskItem.dispatchTaskID,'edit')" :disabled="
									(item.status == 'Committed' &&  taskItem.status != 'Committed') 
									|| item.status == 'Canceled' || item.status == 'Rejected' 
									|| (item.status == 'Finished' && taskItem.status != 'Signed')
								">编辑</el-button>
							</td>
						</tr>
					</template>
				</table>
			</div>
			<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</el-card>
		<UploadPhoto 
			:isVisible="isPhotoVisible" 
			@control="handUploadPhoto" 
			:dispatchTaskID="currentDispatchTaskID" 
			:shipperArea="currentShipperArea" 
			:consigneeArea="currentConsigneeArea">
		</UploadPhoto>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Dispatchbill from '../../../api/Dispatchbill'
import { deleteConfirm, closeConfirm, cancelConfirm } from '../../../common/utils'
import Page from '../../CommonComponents/Page'
import Customer from '../../../api/Customer'
import UploadPhoto from './components/UploadPhoto'
export default {
	data() {
		return {
			rangeDate: [],
			find: {
				keyword: '',
				customerID: '',
				companyName: '',
				status: '',
				beginDispatchDate: '',
				endDispatchDate: ''
			},
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			dispatchBillList: [],
			currentDispatchTaskID: '',
			currentShipperArea: '',
			currentConsigneeArea: '',
			isPhotoVisible: false,
			recdeliverycomp:{}
		}
	},
	components:{ Page, UploadPhoto },
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			this.find.beginDispatchDate = date[0]
			this.find.endDispatchDate = date[1]
		},
		search() {
			if (this.find.companyName && !this.find.customerID) {
				this.dispatchBillList = []
				this.count = 0
				return
			}
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		reset() {
			this.find.keyword = ''
			this.find.customerID = ''
			this.find.companyName = ''
			this.find.status = ''
			this.rangeDate = ''
			this.find.beginDispatchDate = ''
			this.find.endDispatchDate = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.pageIndex = 1
			this.getList() 
		},
		getList () {
			Dispatchbill.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				customerID: this.find.customerID,
				status: this.find.status,
				beginDispatchDate: this.find.beginDispatchDate,
				endDispatchDate: this.find.endDispatchDate
			}).then(res => {
				this.dispatchBillList = res.records
				this.count = res.total
			})
		},
		getCustomers(queryString, cb) {
			Customer.find({
				type: 'ShipperConsignee',
				keyword: queryString
			}).then(res => {
				cb(res.records)
			})
		},
		handSelectCustomer(data){
			this.find.companyName = data.companyName
			this.find.customerID = data.customerID
		},
		add() {
			this.$router.push({ name: 'adddispatchbill' })
		},
		view(dispatchOrderID) {
			this.$router.push({ name: 'viewdispatchbill' , query: { dispatchOrderID } })
		},
		edit(dispatchOrderID) {
			this.$router.push({ name: 'editdispatchbill' , query: { dispatchOrderID } })
		},
		viewTask(dispatchTaskID,type) {
			this.$router.push({ name: 'viewtaskdetail' , query: {dispatchTaskID, type}})
		},
		upload(task) {
			this.currentDispatchTaskID = task.dispatchTaskID
			this.currentShipperArea = task.shipperArea
			this.currentConsigneeArea = task.consigneeArea
			this.isPhotoVisible = true
		},
		handUploadPhoto(bool) {
			this.isPhotoVisible = false
		},
		del(id) {
			deleteConfirm(id, dispatchOrderID => {
				Dispatchbill.del({ dispatchOrderID }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			})
		},
		closeDispatchOrder(id){
			closeConfirm(id, dispatchOrderID => {
				Dispatchbill.close({ dispatchOrderID }).then(res => {
					Message.success('关闭调度成功!')
					this.getList()
				})
			})
		},
		cancelDispatchOrder(id) {
			cancelConfirm(id, dispatchOrderID => {
				Dispatchbill.cancel({ dispatchOrderID }).then(res =>{
					Message.success('已成功取消调度单!')
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
			background #f8f8f8
			.infoItem
				font-size 12px
				margin-right 10px
				&.ViewDispatchBill
					cursor pointer
					color #3582d0
	th
		padding 6px 10px
		height 36px
		line-height 24px
		background #fff
		color #909399
		width 100px
	.list
		td
			font-size 12px
			.ViewTaskDetail
				cursor pointer
				display block
				color #3582d0
</style>
