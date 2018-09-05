<template>
	<div class="main-content">
		<el-card class="box-card dispatchbillDetail">
			<div slot="header" class="clearfix">调度详情</div>
			<el-row :gutter="40">
				<el-col :span="17" style="border-right:1px solid #ddd">
					<p><span class="c1">调度单号：{{dispatchOrderDetail.dispatchOrderNo}}</span>
						<!-- Committed("未接单"),Ordered("已接单"),Canceled("已取消"),Rejected("已拒绝"),Closed("已关闭"),Finished("已完成") -->
						<el-tag size="mini" type="info" v-if="dispatchOrderDetail.status == 'Committed'">未接单</el-tag>
						<el-tag size="mini" v-else-if="dispatchOrderDetail.status == 'Ordered'">已接单</el-tag>
						<el-tag size="mini" type="info" v-else-if="dispatchOrderDetail.status == 'Canceled'">已取消</el-tag>
						<el-tag size="mini" type="info" v-else-if="dispatchOrderDetail.status == 'Rejected'">已拒绝</el-tag>
						<el-tag size="mini" type="info" v-else-if="dispatchOrderDetail.status == 'Closed'">已关闭</el-tag>
						<el-tag size="mini" type="success" v-else>已完成</el-tag>
						<span class="fr c2">由 <span class="c1">{{dispatchOrderDetail.dispatchName}}</span> 创建调度单 <span class="c1">{{dispatchOrderDetail.dispatchTime | getdatefromtimestamp}}</span></span>
					</p>
					<p>行驶数据</p>
					<div class="lineInfo" @click="trail(dispatchOrderDetail.dispatchOrderID)">
						<span class="fl c1" v-if="dispatchOrderlocationList.length>0"><i class="el-icon-location"></i> {{dispatchOrderlocationList[dispatchOrderlocationList.length -1].posAddress}}</span>
						<span class="fr c2" v-if="dispatchOrderlocationList.length>0">{{dispatchOrderlocationList[dispatchOrderlocationList.length -1].createTime | getdatefromtimestamp }}</span>
					</div>
					<table class="wf-table">
						<tr>
							<td align="center" width="100">预计</td>
							<td>总里程 {{dispatchOrderDetail.distance}}公里 用时 {{dispatchOrderDetail.estimatedTime | formatDuring('min')}}</td>
							<td align="center" width="100">实际</td>
							<td>总里程 {{totalDistance?totalDistance:'0'}}公里 <span v-if="dispatchOrderDetail.usedTime">已用时 {{dispatchOrderDetail.usedTime | formatDuring('min')}}</span></td>
						</tr>
					</table>
					<p>总货量：
						<span class="c1" v-if="dispatchOrderDetail.loadWeightSum"><span class="num-label">重</span> {{dispatchOrderDetail.loadWeightSum}} 吨 </span>
						<span class="c1" v-if="dispatchOrderDetail.loadVolumeSum"><span class="num-label">体</span> {{dispatchOrderDetail.loadVolumeSum}} 方</span>
						<span class="c1" v-if="dispatchOrderDetail.loadNumSum"><span class="num-label">数</span> {{dispatchOrderDetail.loadNumSum}}</span>
					</p>
					<p style="border-bottom:1px solid #ddd">
						<strong>运费</strong>
						<span class="fr c1 carriage" @click="carriageDetail">{{dispatchOrderDetail.sumAmount}}元 
							<svg-icon icon-class="arrow-down" :class="ShowCarriageDetail?'':'unfold'"></svg-icon>
						</span>
					</p>
					<div class="tableBox">
						<table class="wf-table" v-show="ShowCarriageDetail" style="min-width:750px">
							<thead>
								<tr>
									<th width="110">费用科目</th>
									<th width="90">费用类型</th>
									<th width="110">收款人</th>
									<th width="110">支付方式</th>
									<th width="130">金额</th>
									<th width="180" v-if="(dispatchOrderDetail.status !='Canceled') && (dispatchOrderDetail.status !='Rejected')">
										<el-button size="mini" type="primary" icon="el-icon-plus" @click="addFreight">添加</el-button>
										<el-button size="mini" type="success" icon="el-icon-check" @click="saveFreight" v-if="bizDispatchFeeList.length">保存</el-button>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="feesItem in dispatchOrderFees" :key="feesItem.dispatchFeeID">
									<td>
										<!-- 费用科目:Freight-运费   RoadBridge-路桥费  Transit-中转费  Fine-罚款  Detour-绕路费  Other-其他 -->
										<span v-if="feesItem.item=='Freight'">运费</span>
										<span v-else-if="feesItem.item=='RoadBridge'">路桥费</span>
										<span v-else-if="feesItem.item=='Transit'">中转费</span>
										<span v-else-if="feesItem.item=='Fine'">罚款</span>
										<span v-else-if="feesItem.item=='Detour'">绕路费</span>
										<span v-else>其他</span>
									</td>
									<td>
										<span>{{feesItem.category == 'Basic' ? '基础运费' : '附加运费'}}</span>
									</td>
									<td>
										{{feesItem.supercargoName}}
									</td>
									<td>
										<!-- 支付方式: Prepay-预付  PayOnDelivery-到付  PayOnReceipt-回单结  PayByConsignee-收货方付 -->
										<span v-if="feesItem.payMode=='Prepay'">预付</span>
										<span v-else-if="feesItem.payMode=='PayOnDelivery'">到付</span>
										<span v-else-if="feesItem.payMode=='PayOnReceipt'">回单结</span>
										<span v-else-if="feesItem.payMode=='PayMonthly'">月结</span>
										<span v-else>收货方付</span>
									</td>
									<td>
										{{feesItem.amount}}元
									</td>
									<td v-if="(dispatchOrderDetail.status !='Canceled') && (dispatchOrderDetail.status !='Rejected')"></td>
								</tr>
								<tr v-for="(item, index) in bizDispatchFeeList" :key="index">
									<td>
										<el-form :model="item" ref="ruleForm">
											<el-form-item prop="item" :rules="[{ required: true , message: '请选择费用科目' }]">
												<el-select size="mini" v-model="item.item" placeholder="请选择"  style="width:100%">
													<el-option label="路桥费" value="RoadBridge"></el-option>
													<el-option label="中转费" value="Transit"></el-option>
													<el-option label="罚款" value="Fine"></el-option>
													<el-option label="绕路费" value="Detour"></el-option>
													<el-option label="其他" value="Other"></el-option>
												</el-select>
											</el-form-item>
										</el-form>
									</td>
									<td>
										<span style="position:relative;top:-10px">{{item.category == 'Basic' ? '基础运费' : '附加运费'}}</span>
									</td>
									<td>
										<el-form :model="item" ref="ruleForm">
											<el-form-item prop="superCargoID" :rules="[{ required: true , message: '请选择收款人' }]">
												<el-select size="mini" value-key="supercargoID" v-model="item.superCargo" placeholder="请选择" @change="handSelectItem($event, index)">
													<el-option 
														:label="person.realName" 
														:value="person" 
														v-for="person in persons" 
														:key="person.supercargoID">
													</el-option>
												</el-select>
											</el-form-item>
										</el-form>
									</td>
									<td>
										<el-form :model="item" ref="ruleForm">
											<el-form-item prop="payMode" :rules="[{ required: true , message: '请选择支付方式' }]">
												<el-select size="mini" v-model="item.payMode" placeholder="请选择" style="width:100%">
													<el-option label="到付" value="PayOnDelivery"></el-option>
													<el-option label="预付" value="Prepay"></el-option>
													<el-option label="回单结" value="PayOnReceipt"></el-option>
													<el-option label="收货方付" value="PayByConsignee"></el-option>
													<el-option label="月结" value="PayMonthly"></el-option>
												</el-select>
											</el-form-item>
										</el-form>
									</td>
									<td>
										<el-form :model="item" ref="ruleForm">
											<el-form-item prop="amount" :rules="[{
													validator: (rule, value, callback) => {
														const r = /\d+/
														if (!item.amount || item.amount == '0') {
															callback('请输入金额')
														} else if (value && !r.test(value)) {
															callback('请输入正确的数字')
														} else {
															callback()
														}
													}
												}]">
												<el-input size="mini" placeholder="请输入..." v-model="item.amount" style="border-spacing:0;width:100%"><template slot="append">元</template></el-input>
											</el-form-item>
										</el-form>
									</td>
									<td>
										<span style="position:relative;top:-10px" class="delbtn c6" @click="delFreight(index)">删除</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<p>运输任务（<span class="circle"></span> 色数字代表装卸执行顺序，来源线路规划排序） <span class="fr c1" v-if="dispatchOrderDetail.distance">预计总里程{{Number(dispatchOrderDetail.distance/1000).toFixed(2)}}公里</span></p>
					<TaskItem v-for="(item,index) in dispatchTask" :taskItem="item" :index="index" :key="item.carrierOrderID"></TaskItem>
				</el-col>
				<el-col :span="7">
					<p>运输车辆人员</p>
					<div class="truckInfo c2">
						<p v-if="dispatchOrderDetail.plateNo">
							<label>车牌号</label>
							{{dispatchOrderDetail.plateNo}} 
							{{Number(dispatchOrderDetail.truckLength/1000).toFixed(1)}}米/{{truckType[dispatchOrderDetail.truckType]}}
						</p>
						<p v-if="dispatchOrderDetail.trailerPlateNo">
							<label>挂车牌</label>{{dispatchOrderDetail.trailerPlateNo}} 
							{{Number(dispatchOrderDetail.trailerTruckLength/1000).toFixed(1)}}米/{{truckType[dispatchOrderDetail.trailerTruckType]}}
						</p>
						<p v-if="dispatchOrderDetail.driverName">
							<label>司机</label>{{dispatchOrderDetail.driverName}} 
							{{dispatchOrderDetail.driverMobile}}
						</p>
						<p v-if="dispatchOrderDetail.superCargoName">
							<label>押运员</label>{{dispatchOrderDetail.superCargoName}} 
							{{dispatchOrderDetail.superCargoMobile}}
						</p>
					</div>
					<p class="dispatchLogTit">调度日志</p>
					<ul class="dispatchLog" v-if="dispatchLogs.length>0">
						<!-- 日志动作: Accept-接单 Offer-报价/抢单 Comfirm-确认抢单/报价 Load-装车 Unload-到货 Upload-运输上报 Refuse-拒绝接单 Canceled-取消 Overdue-超时取消  -->
						<li v-for="logsItem in dispatchLogs" :key="logsItem.dispatchLogID">
							<p>
								<span class="action" v-if="logsItem.action =='Accept'">接单</span>
								<span class="action" v-else-if="logsItem.action =='Offer'">报价/抢单</span>
								<span class="action" v-else-if="logsItem.action =='Comfirm'">确认抢单/报价</span>
								<span class="action" v-else-if="logsItem.action =='Load'">装车</span>
								<span class="action" v-else-if="logsItem.action =='Unload'">到货</span>
								<span class="action" v-else-if="logsItem.action =='Upload'">运输上报</span>
								<span class="action" v-else-if="logsItem.action =='Refuse'">拒绝接单</span>
								<span class="action" v-else-if="logsItem.action =='Canceled'">取消</span>
								<span class="action" v-else>超时取消</span>
								<span class="dateTime">{{logsItem.createTime | getdatefromtimestamp }}</span>
							</p>
							<p>{{logsItem.description}}</p>
							<p v-if="logsItem.action =='Load'">装车地址：{{logsItem.posAddress}}</p>
							<p v-if="logsItem.action =='Unload'">到货地址：{{logsItem.posAddress}}</p>
						</li>
					</ul>
					<p v-else class="dispatchLog c2">暂无调度日志</p>
				</el-col>
			</el-row>
		</el-card>
		<trail-map 
			v-if="trailDialog" 
			:dispatchOrderID="currentDispatchOrderID" 
			@cancel="handCloseTrail">
		</trail-map>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Dispatchbill from '../../../api/Dispatchbill'
import TaskItem from './common/TaskItem'
import TrailMap from '../components/TrailMap'
import axios from 'axios'
import { MAPKEY } from '../../../common/const'
import truckType from '../../../assets/data/truckType'
export default {
	data() {
		return {
			ShowCarriageDetail:false,
			dispatchOrder: {},
			dispatchOrderDetail:{},
			bizDispatchFeeList: [],
			dispatchOrderFees:{},
			dispatchTask:{},
			dispatchLogs:{},
			persons:[],
			dispatchOrderlocationList:[],
			totalDistance:'',
			trailDialog: false,
			currentDispatchOrderID: ''
		}
	},
	computed: {
		truckType: () => truckType
	},
	components:{ TaskItem, TrailMap },
	created() {
		this.getDetail()
		this.getFees()
		this.getTaskList()
		this.getLogs()
		
	},
	methods: {
		handCloseTrail() {
			this.trailDialog = false
		},
		trail(dispatchOrderID) {
			if (this.dispatchOrderDetail.status != 'Ordered' && this.dispatchOrderDetail.status != 'Finished') return
			this.currentDispatchOrderID = dispatchOrderID
			this.trailDialog = true
		},
		getDetail() {
			const dispatchOrderID = this.$route.query.dispatchOrderID
			Dispatchbill.findById({ dispatchOrderID }).then(res => {
				this.dispatchOrder = res
				this.dispatchOrderDetail = res.detail
				this.dispatchOrderlocationList = res.locationList
				console.log(this.dispatchOrderlocationList)
				
				this.createPersons()
				this.getDistance()
			})
		},
		getFees() {
			const dispatchOrderID = this.$route.query.dispatchOrderID
			Dispatchbill.findFees({ dispatchOrderID }).then(res => {
				this.dispatchOrderFees = res
			})
		},
		getTaskList() {
			const dispatchOrderID = this.$route.query.dispatchOrderID
			Dispatchbill.findDispatchTaskList({ dispatchOrderID }).then(res => {
				this.dispatchTask = res
			})
		},
		getLogs() {
			const dispatchOrderID = this.$route.query.dispatchOrderID
			Dispatchbill.findDispatchLogs({ dispatchOrderID }).then(res => {
				this.dispatchLogs = res
			})
		},
		back() {
			this.$router.go(-1)
		},
		createPersons() {
			if (this.dispatchOrderDetail.driverID) {
				this.persons.push({
					supercargoID:this.dispatchOrderDetail.driverID,
					realName:this.dispatchOrderDetail.driverName
				})
			}
			if (this.dispatchOrderDetail.superCargoID) {
				this.persons.push({
					supercargoID:this.dispatchOrderDetail.superCargoID,
					realName:this.dispatchOrderDetail.superCargoName
				})
			}
		},
		carriageDetail(){
			this.ShowCarriageDetail = !this.ShowCarriageDetail
		},
		addFreight() {
			this.bizDispatchFeeList.push({
				item: '',
				category: 'Attach',
				superCargoID: '',
				payMode: '',
				amount: ''
			})
		},
		delFreight(i) {
			this.bizDispatchFeeList.splice(i, 1)
		},
		handSelectItem(data, index) {
			this.bizDispatchFeeList[index].superCargoID = data.supercargoID
			this.bizDispatchFeeList[index].supercargoName = data.realName
		},
		saveFreight(){
			new Promise((resolve, reject) => {
				let flag = true
				for (let i = 0; i < this.$refs['ruleForm'].length; i++) {
					const item = this.$refs['ruleForm'][i]
					item.validate(valid => {
						if (!valid) flag = false
					})
				}
				flag ? resolve() : reject()
			}).then(() => {
				const dispatchOrderID = this.$route.query.dispatchOrderID
				const bizDispatchFeeList = this.bizDispatchFeeList.map(item=>{
					return {
						item: item.item,
						category: item.category,
						superCargoID: item.superCargoID,
						payMode: item.payMode,
						supercargoName:item.supercargoName,
						amount: item.amount,
						dispatchOrderID
					}
				})
				Dispatchbill.feeModify({bizDispatchFeeList}).then(res=>{
					this.bizDispatchFeeList = []
					Message.success(res.data.msg)
					this.getFees()
					this.getDetail()
				})
			}).catch(err => {})
		},
		/**
		 * 调用高德地图接口获取距离
		 */
		getDistance() {
			console.log(1)
			const list = this.dispatchOrderlocationList.map(item => item.loc.longitude + ',' + item.loc.latitude)
			const origins = list.join('|')
			// const destination = list[list.length-1]
			const destination = list[0]
			axios({url: `https://restapi.amap.com/v3/distance?origins=${origins}&destination=${destination}&key=${MAPKEY}`}).then(res => {
				const results = res.data.results
				const arrays = [...this.dispatchOrderlocationList]
				this.totalDistance = 0
				arrays.forEach((item,i) => {
					item.sequence = i+1
					item.nodeDistance = Number((Number(results[i].distance)/1000).toFixed(2))
					this.totalDistance += item.nodeDistance
				})
				this.totalDistance = Number(this.totalDistance.toFixed(2))
				this.dispatchOrderlocationList = arrays
			})
		},
	}
}

</script>
<style lang="stylus" scoped>
.dispatchbillDetail
	p
		line-height 30px
	.truckInfo
		padding-bottom 10px
		label
			width 60px
			text-align right
			display inline-block
			margin-right 10px
	.lineInfo
		height 60px
		padding 20px
		line-height 20px
		margin-bottom 10px
		background url("../../../assets/imgs/mapBg.jpg") no-repeat left center
	.carriage
		cursor pointer
		user-select none
		.unfold
			transform rotate(180deg)
			transition all .5s
	.tableBox
		overflow hidden
		overflow-x auto	
	.wf-table
		td
			text-align center
			color #666
			.delbtn
				cursor pointer
			
	.circle
		width 12px
		height 12px
		background #409EFF
		display inline-block
		border-radius 6px
		vertical-align middle
	.dispatchLogTit
		border-top 1px solid #ddd
		padding-top 10px
	.dispatchLog
		padding-left 40px
		li
			padding 5px 
			list-style none
			position relative
			&:before
				content ""
				width 6px
				height 6px
				background #ccc
				display block
				position absolute
				left -10px
				top 12px
			p
				line-height 20px
				color #999
.num-label
	margin-right 10px
	width 18px
	height 18px
	display inline-block
	color #fff
	border-radius 4px
	font-size 12px
	line-height 18px
	text-align center
	font-weight 800
	margin-right 4px
	background-color #409EFF
</style>