<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">调度列表</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="调度单号/货物名称/司机/车牌号" v-model="findkeyword"></el-input>
					</el-form-item>
					<el-form-item label="收发货单位">
						<el-autocomplete
							value-key="companyName" 
							v-model="recdeliverycomp.companyName"
							:fetch-suggestions="getRecdeliverycomp"
							placeholder="请输入收发货单位"
							@select="handSelectShipper">
						</el-autocomplete>
					</el-form-item>
					<el-form-item label="调度状态">
						<el-select v-model="findstatus" placeholder="请选择">
							<el-option label="全部" value=""></el-option>
							<el-option label="未接单" value="Committed"></el-option>
							<el-option label="已接单" value="Ordered"></el-option>
							<el-option label="已关闭" value="Canceled"></el-option>
							<el-option label="已取消" value="Rejected"></el-option>
							<el-option label="已完成" value="Finished"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-upload2" @click="add">导入</el-button>
			</div>
			<div class="table">
				<table class="wfTable">
					<tr>
						<th width="200">任务编号</th>
						<th width="80">状态</th>
						<th width="80">货物</th>
						<th>货量</th>
						<th>装车地</th>
						<th width="140">收货时间</th>
						<th>送货地</th>
						<th width="140">送货时间</th>
						<th>操作</th>
					</tr>
					<template v-for="item in dispatchBillList">
						<tr class="tit" :key="item.dispatchOrderID">
							<td colspan="9">
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
								<span v-if="taskItem.status='Committed'">待执行</span>
								<span v-else-if="taskItem.status='Loaded'">已装运</span>
								<span v-else-if="taskItem.status='Signed'">已签收</span>
								<span v-else>已作废</span>
							</td>
							<td>{{taskItem.cargoName}}</td>
							<td class="text-center">
								{{taskItem.loadWeightSum?taskItem.loadWeightSum+'kg/':''}}
								{{taskItem.loadVolumeSum?taskItem.loadVolumeSum+'m³/':''}}
								{{taskItem.loadNumSum?taskItem.loadNumSum+'件':''}}
							</td>
							<td>{{taskItem.shipperArea}}</td>
							<td class="text-center" width="120">{{taskItem.shipperDate | getdatefromtimestamp(true)}}</td>
							<td>{{taskItem.consigneeArea}}</td>
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
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
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
import Dispatchbill from '../../api/Dispatchbill'
import { deleteConfirm, closeConfirm, cancelConfirm } from '../../common/utils'
import DispatchBillItem from './Common/DispatchBillItem'
import Page from '../CommonComponents/Page'
import UploadPhoto from './Common/UploadPhoto'
import Customer from '../../api/Customer'
export default {
	data() {
		return {
			findkeyword: '',
			findcustomerID: '',
			findstatus: '',
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
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findkeyword=''
			this.findcustomerID=''
			this.findstatus=''
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		getList () {
			Dispatchbill.find({
				keyword:this.findkeyword,
				customerID:this.recdeliverycomp.customerID,
				status:this.findstatus,
				current: this.pageIndex,
				size: this.pageSize
			}).then(res => {
				this.dispatchBillList = res.records
				this.count = res.total
			})
		},
		getRecdeliverycomp(queryString, cb) {
			Customer.find({
				type: 'ShipperConsignee',
				companyName: queryString
			}).then(res => {
				cb(res.records)
			})
		},
		handSelectShipper(data){
			this.recdeliverycomp.companyName = data.companyName
			this.recdeliverycomp.customerID = data.customerID
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
			this.$router.push({ name: 'viewtaskdetail' , query: {dispatchTaskID,type}})
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
	},
	components:{
		DispatchBillItem,
		Page,
		UploadPhoto
	}
}

</script>
<style lang="stylus" scoped>
.wfTable
	width 100%
	background #e2ecf6
	border-spacing 1px
	font-size 14px
	margin-bottom 10px
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
			.infoItem
				font-size 12px
				margin-right 10px
				&.ViewDispatchBill
					cursor pointer
					color #3582d0
				.tag
					padding 2px 10px
					border-radius 4px
					color #fff
					&.tag1
						background #E6A23C
					&.tag2
						background #409EFF
					&.tag3
						background #67C23A
					&.tag4
						background #909399
	
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
				color #3582d0
</style>
