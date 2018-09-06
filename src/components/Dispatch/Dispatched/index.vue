<template>
	<div class="main-content">
		<el-card class="box-card customerCardHeader">
			<div slot="header" class="tab clearfix"><span :class="isCur==0?'cur':''" @click="tabClick(0)">已调度</span><span :class="isCur==1?'cur':''" @click="tabClick(1)">调度历史</span></div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="调度单号/货物名称/司机/车牌号" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="收发单位">
						<el-input placeholder="收发单位" v-model="find.shipperConsignee"></el-input>
					</el-form-item>
					<el-form-item label="调度状态">
						<el-select placeholder="全部" v-model="find.status" style="width:120px">
							<el-option value="" label="全部">全部</el-option>
							<el-option :value="item" :label="DISPATCHORDERSTATUS[item]" v-for="item in DISPATCHORDERSTATUS" :key="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="调度类型">
						<el-select placeholder="全部" v-model="find.type" style="width:120px">
							<el-option value="" label="全部">全部</el-option>
							<el-option :value="item" :label="DISPATCHORDERTYPE[item]" v-for="item in DISPATCHORDERTYPE" :key="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="调度时间从">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px" 
							v-model="find.dispatchBeginTime">
						</el-date-picker>
						<span class="tracto">至</span>
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px" 
							v-model="find.dispatchEndTime">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search(isCur)">搜索</el-button>
						<el-button type="default" @click="reset(isCur)">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableBox">
				<table class="customerTable">
					<tr>
						<th class="w1">承运单</th>
						<th class="w4">状态</th>
						<th class="w3">货物</th>
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
							<td colspan="10" class="blank"></td>
						</tr>
						<tr>
							<td colspan="10" class="txt-l">
								<div class="dispatchbillTit">
									<span class="num" @click="view(item.dispatchOrderID)">调度单号：{{item.dispatchOrderNo}}</span>
									<el-tag type="info" size="mini" >{{DISPATCHORDERTYPESIMPLE[item.type]}}</el-tag>
									<div class="quoteInfo">
										<span v-if="item.type=='Assign'">{{item.plateNo}}</span>
										<div v-else>
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
									<span v-if="item.status == 'Committed'">
										<el-tag size="mini" type="info">{{DISPATCHORDERTYPEEX[item.type]}}</el-tag>
									</span>
									<span v-else>
										<el-tag 
											size="mini" 
											:type="item.status == 'Finished' ? 'success' 
											: (item.status == 'Ordered' ? '' : 'info')">
											{{DISPATCHORDERSTATUS[item.status]}}
										</el-tag>
									</span>
								</div>
								<div class="handler">
									<span class="c1" @click="scramble(item.dispatchOrderID,item.type,item.status)" v-if="item.grabNum>0&&item.type=='Offer'">报价人数（{{item.grabNum}}）</span>
									<span class="c1" @click="scramble(item.dispatchOrderID,item.type,item.status)" v-if="item.grabNum>0&&item.type=='Grab'">抢单人数（{{item.grabNum}}）</span>
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
									<span v-else v-show="item.status == 'Canceled' || item.status == 'Rejected' || item.status == 'Overdue'">
										<router-link 
											tag="span" 
											class="c6" 
											style="margin-left:0" 
											:to="{name: 'redispatching', query: {dispatchOrderID: item.dispatchOrderID}}">
											重新调度
										</router-link>
										<!-- <el-button type="text" size="mini" :disabled="true" @click="cancelDispatchOrder(item.dispatchOrderID)">取消调度</el-button> -->
										<!-- <el-button type="text" size="mini" :disabled="true"  @click="closeDispatchOrder(item.dispatchOrderID)" style="margin-left:20px">关闭</el-button> -->
									</span>
								</div>
							</td>
						</tr>
						<tr v-for="taskItem in item.dispatchTaskCargoVOList" :key="taskItem.dispatchTaskID">
							<td>{{taskItem.carrierOrderNo}}</td>
							<td><el-tag size="mini" type="warning" v-if="taskItem.status == 'Committed'">待装车</el-tag>
								<el-tag size="mini" v-else-if="taskItem.status == 'Loaded'">已装运</el-tag>
								<el-tag size="mini" type="success" v-else-if="taskItem.status == 'Signed'">已签收</el-tag>
								<el-tag size="mini" type="info" v-else>已作废</el-tag></td>
							<td class="txt-l">{{taskItem.cargoName}}</td>
							<td class="text-center" v-if="taskItem.cargoWeight || taskItem.cargoVolume || taskItem.cargoVolume">
								{{taskItem.cargoWeight ? taskItem.cargoWeight + '吨' : ''}}
								{{taskItem.cargoVolume ? (taskItem.cargoWeight ? '/' : '') + taskItem.cargoVolume + '方' : ''}}
							</td>
							<td v-else>0</td>
							<td>{{taskItem.cargoNum}}</td>
							<td>{{taskItem.shipperArea}}</td>
							<td>{{taskItem.shipperDate | getdatefromtimestamp(true)}}</td>
							<td>{{taskItem.consigneeArea}}</td>
							<td>{{taskItem.consigneeDate | getdatefromtimestamp(true)}}</td>
							<td><el-button type="primary" size="mini" plain @click="viewPhotos(taskItem.dispatchTaskID,taskItem.shipperArea,taskItem.consigneeArea)">查看照片</el-button></td>
						</tr>
					</template>
				</table>
			</div>
			<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</el-card>
		<el-dialog :title="(curScrambleType=='Grab')?'抢单详情':'报价详情'" :visible.sync="scrambleDialog" custom-class="scrambleDialog" top="5vh" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
			<p class="c1">货物： {{scrambleList.cargoName}}</p>
			<p class="c1">货量： {{scrambleList.cargoWeight}}吨 / {{scrambleList.cargoVolume}}方 / {{scrambleList.cargoNum}}</p>
			<p class="c1">{{scrambleList.load}} 装 {{scrambleList.unLoad}} 卸  预计里程 {{(Number(scrambleList.mileages)/1000).toFixed(2)}}公里</p>
			<div class="tableBox">
				<table class="customerTable">
					<caption>{{(curScrambleType=='Grab')?'抢单人数':'报价人数'}}（{{scrambleList.grabOfferNum}}）</caption>
					<thead>
						<tr>
							<th>车辆</th>
							<th width="160">司机</th>
							<th width="160">运费</th>
							<th width="160">操作</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="item in scrambleList.grabOfferOrderDetailVOList">
							<tr>
								<td colspan="4" class="blank"></td>
							</tr>
							<tr>
								<td class="txt-l">
									<p>{{item.plateNo}} 
										<el-tag size="mini" v-if="item.gps">GPS</el-tag>
										<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
											<div slot="content">
												<el-tag size="mini" type="danger" v-for="(truckItem,index) in item.truckExpiredCertificate.split(',')" :key="index">{{
													EXPIREWARN[truckItem]
												}}</el-tag>
											</div>
											<el-tag size="mini" type="danger" v-if="item.truckExpiredCertificate.length>0">到期</el-tag>
										</el-tooltip>
									</p>
									<p>
										{{Number(item.length/1000).toFixed(1)}} 米 / {{TRUCKTYPE[item.truckType]}} {{item.loads?'/ '+Number(item.loads/1000).toFixed(2)+'吨':''}}{{item.loadVolume?'/ '+item.loadVolume+'方':''}} 
									</p>
								</td>
								<td class="txt-l">
									<p>{{item.name}}
										<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
											<div slot="content">
												<el-tag size="mini" type="danger" v-for="(driverItem,index) in item.driverExpiredCertificate.split(',')" :key="index">{{
													EXPIREWARN[driverItem]
												}}</el-tag>
											</div>
											<el-tag size="mini" type="danger" v-if="item.driverExpiredCertificate.length>0">到期</el-tag>
										</el-tooltip>
									</p>
									<p>{{item.mobile}}</p>
								</td>
								<td class="c posr">
									<span class="tags">{{item.type=='Offer'?'报':'定'}}</span>{{item.amount}}元 
									<img class="success" src="../../../assets/imgs/qdcg.png" height="48" v-if="item.status == 'Agreed'&&item.type=='Grab'" />
									<img class="success" src="../../../assets/imgs/bjcg.png" height="48" v-if="item.status == 'Agreed'&&item.type=='Offer'" />
								</td>
								<td>
									<span class="c1 selectTruck" @click="confirmScramble(item.dispatchOfferID,item.dispatchOrderID)" v-if="dispatchOrderStatus == 'Committed'">选TA承运</span>
									<p v-if="item.status == 'Agreed'">调度员：{{item.confirmer}}</p>
									<p v-if="item.status == 'Agreed'">{{item.confirmTime  | getdatefromtimestamp}}</p>
								</td>
							</tr>
							<tr>
								<td colspan="4" class="c2">
									<span class="fl"><i class="el-icon-location"></i> {{Number(item.hours).toFixed(1)}} 小时前 {{item.posAddress}}</span>
									<span class="fr">距离装车地 {{item.distance}} 公里</span>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
			<div slot="footer" class="dialog-footer text-center">
				<el-button @click="scrambleDialog = false" size="small">关闭</el-button>
			</div>
		</el-dialog>
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
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import axios from 'axios'
import { 
	MAPKEY, 
	PAGEINDEX, 
	PAGESIZE, 
	TOTAL,
	DISPATCHORDERTYPE,
	DISPATCHORDERTYPESIMPLE,
	DISPATCHORDERTYPEEX,
	DISPATCHORDERSTATUS,
	TRUCKTYPE,
	EXPIREWARN
} from '../../../common/const'
import { baseMixin } from '../../../common/mixin'
import Dispatchbill from '../../../api/Dispatchbill'
import TrailMap from '../components/TrailMap'
import UploadPhoto from './common/UploadPhoto'
import {closeConfirm, cancelConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin],
	components: { TrailMap,UploadPhoto },
	data(){
		return{
			isCur:0,
			find:{
				keyword:'',
				shipperConsignee:'',
				status:'',
				type:'',
				dispatchBeginTime:'',
				dispatchEndTime:''
			},
			timer: null,
			scrambleDialog: false,
			trailDialog: false,
			dispatchBillList: [],
			currentDispatchTaskID: '',
			currentShipperArea: '',
			currentConsigneeArea: '',
			isPhotoVisible: false,
			scrambleList:[],
			currentDispatchOrderID: '',
			truckExp:[],
			driverExp:[],
			curScrambleType:'',
			dispatchOrderStatus:''
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
		this.getList()
	},
	destroyed() {
		this.timer = null
	},
	computed: {
		TRUCKTYPE: () => TRUCKTYPE,
		EXPIREWARN: () => EXPIREWARN,
		DISPATCHORDERSTATUS: () => DISPATCHORDERSTATUS,
		DISPATCHORDERTYPE: () => DISPATCHORDERTYPE,
		DISPATCHORDERTYPESIMPLE: () => DISPATCHORDERTYPESIMPLE,
		DISPATCHORDERTYPEEX: () => DISPATCHORDERTYPEEX
	},
	methods:{
		search(val) {
			this.pageIndex = PAGEINDEX
			this.pageSize = PAGESIZE
			this.getList()
		},
		resetSearch(){
			this.find.keyword=''
			this.find.shipperConsignee=''
			this.find.status=''
			this.find.type=''
			this.find.dispatchBeginTime=''
			this.find.dispatchEndTime=''
			this.pageIndex = PAGEINDEX
			this.pageSize = PAGESIZE
		},
		reset(val) {
			this.resetSearch()
			this.getList()
		},
		tabClick(val){
			this.isCur = val
			this.resetSearch()
			this.getList()
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
		getList(){
			this.dispatchBillList = []
			if(this.isCur==0){
				this.getDispatchedList()
			}else{
				this.getHistoryList()
			}
		},
		getDispatchedList() {
			Dispatchbill.findDispatchedList({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				shipperConsignee: this.find.shipperConsignee,
				status: this.find.status,
				type: this.find.type,
				dispatchBeginTime: this.find.dispatchBeginTime,
				dispatchEndTime: this.find.dispatchEndTime
			}).then(res => {
				this.dispatchBillList = res.records
				this.total = res.total
			})
		},
		getHistoryList() {
			Dispatchbill.findDispatchHistoryList({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				shipperConsignee: this.find.shipperConsignee,
				status: this.find.status,
				type: this.find.type,
				dispatchBeginTime: this.find.dispatchBeginTime,
				dispatchEndTime: this.find.dispatchEndTime
			}).then(res => {
				this.dispatchBillList = res.records
				this.total = res.total
			})
		},
		scramble(dispatchOrderID,type,status) {
			this.scrambleDialog = true
			this.curScrambleType= type
			this.dispatchOrderStatus = status
			Dispatchbill.findgGrabOfferOrderList({
				dispatchOrderID
			}).then(res => {
				this.scrambleList = res
				const list = res.grabOfferOrderDetailVOList
				list.forEach(item =>{
					const location = item.latitude + ',' +  item.longitude  
					const loadLocation = item.loadLongitude  + ',' + item.loadLatitude
					this.getDistance(loadLocation, location)
				})
			})
		},
		handCloseTrail() {
			this.trailDialog = false
		},
		trail(dispatchOrderID) {
			this.currentDispatchOrderID = dispatchOrderID
			this.trailDialog = true
		},
		confirmScramble(dispatchOfferID,dispatchOrderID){
			Dispatchbill.confirmScramble({
				dispatchOfferID
			}).then(res => {
				Message.success('已成功选择承运人!')
				this.scramble(dispatchOrderID)
				this.getList()
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
		},
		/**
		 * 调用高德地图接口获取距离
		 */
		getDistance(loadLocation,location) {
			axios({url: `https://restapi.amap.com/v3/distance?origins=${loadLocation}&destination=${location}&key=${MAPKEY}`}).then(res => {
				const results = res.data.results
				this.scrambleList.grabOfferOrderDetailVOList= this.scrambleList.grabOfferOrderDetailVOList.map(item =>{
					return Object.assign(item, {
						"distance": Number((Number(results[0].distance)/1000).toFixed(2))
					})
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
</style>