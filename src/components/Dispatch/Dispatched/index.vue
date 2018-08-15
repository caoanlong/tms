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
						<el-input placeholder="收发单位" v-model="find.recdeliverycomp"></el-input>
					</el-form-item>
					<el-form-item label="调度状态">
						<el-select placeholder="全部" v-model="find.dispatchStatus" style="width:120px">
							<el-option value="" label="全部">全部</el-option>
							<el-option value="11111" label="未接单">未接单</el-option>
							<el-option value="22222" label="已接单">已接单</el-option>
							<el-option value="33333" label="已取消">已取消</el-option>
							<el-option value="44444" label="被拒绝">被拒绝</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="调度类型">
						<el-select placeholder="全部" v-model="find.dispatchSort" style="width:120px">
							<el-option value="" label="全部">全部</el-option>
							<el-option value="11111" label="指派">指派</el-option>
							<el-option value="22222" label="报价">报价</el-option>
							<el-option value="33333" label="抢单">抢单</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="调度时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" style="width:160px" v-model="find.begin">
						</el-date-picker><span class="tracto">至</span>
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" style="width:160px" v-model="find.end">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
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
									<el-tag type="info" size="mini">抢</el-tag>
									<div class="quoteInfo">
										<div class="quoteList" v-autoscroll>
											<div v-for="i in 5" :key="i">{{i}}云A-23567 <b class="c3">¥6000.00元</b></div>
										</div>
									</div>
									<el-tag size="mini">抢单中</el-tag>
								</div>
								<div class="handler">
									<span class="c1" @click="scramble">抢单人数（3）</span>
									<span class="c1">跟踪</span>
									<span class="c2">取消调度</span>
									<span class="c1">重新调度</span>
									<span class="c1">关闭</span>
								</div>
							</td>
						</tr>
						<tr v-for="taskItem in item.dispatchTaskList">
							<td>{{taskItem.taskNo}}</td>
							<td><el-tag size="mini" v-if="taskItem.status == 'Committed'">待装车</el-tag>
								<el-tag size="mini" v-else-if="taskItem.status == 'Loaded'">已装运</el-tag>
								<el-tag size="mini" type="success" v-else-if="taskItem.status == 'Signed'">已签收</el-tag>
								<el-tag size="mini" type="info" v-else>已作废</el-tag></td>
							<td class="txt-l">{{taskItem.cargoName}}</td>
							<td class="text-center" v-if="taskItem.loadWeightSum || taskItem.loadVolumeSum || taskItem.loadVolumeSum">
								{{taskItem.loadWeightSum ? taskItem.loadWeightSum + '吨' : ''}}
								{{taskItem.loadVolumeSum ? (taskItem.loadWeightSum ? '/' : '') + taskItem.loadVolumeSum + '方' : ''}}
							</td>
							<td v-else>0</td>
							<td>{{taskItem.loadNumSum}}</td>
							<td>{{taskItem.shipperArea}}</td>
							<td>{{taskItem.shipperDate | getdatefromtimestamp(true)}}</td>
							<td>{{taskItem.consigneeArea}}</td>
							<td>{{taskItem.consigneeDate | getdatefromtimestamp(true)}}</td>
							<td>查看照片</td>
						</tr>
					</template>
				</table>
			</div>
			<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</el-card>
		<el-dialog title="报价详情" :visible.sync="scrambleDialog" custom-class="scrambleDialog" top="5vh" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
			<p class="c1">货物： 啤酒、王老吉、可口可乐</p>
			<p class="c1">货量： 2吨 / 4.6方</p>
			<p class="c1">1装1卸  预计里程680公里</p>
			<div class="tableBox">
				<table class="customerTable">
					<caption>抢单人数（3）</caption>
					<thead>
						<tr>
							<th>车辆</th>
							<th>司机</th>
							<th>运费</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="item in 13">
							<tr><td colspan="4" class="blank"></td></tr>
							<tr>
								<td class="txt-l">
									<p>粤B-55555 
										<el-tag size="mini">GPS</el-tag>
										<el-tooltip placement="right" effect="light">
											<div slot="content">
												<el-tag size="mini" type="danger">GPS到期</el-tag>
											</div>
											<el-tag size="mini" type="danger">到期</el-tag>
										</el-tooltip>
									</p>
									<p>9.6米/高栏/22吨/3.5方</p>
								</td>
								<td class="txt-l">
									<p>郝晓晓
										<el-tooltip placement="right" effect="light">
											<div slot="content">
												<el-tag size="mini" type="danger">身份证到期</el-tag>
											</div>
											<el-tag size="mini" type="danger">到期</el-tag>
										</el-tooltip>
									</p>
									<p>13424389894</p>
								</td>
								<td class="c1"><span class="tags">定</span>1500元/车</td>
								<td rowspan="2"><span class="c1 selectTruck">选TA承运</span></td>
							</tr>
							<tr>
								<td colspan="3" class="c2">
									<span class="fl"><i class="el-icon-location"></i>1小时前 昆明五华区彩云北路56号</span>
									<span class="fr">距离装车地 23公里</span>
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
	</div>
</template>
<script type="text/javascript">
	import { PAGEINDEX, PAGESIZE, TOTAL } from '../../../common/const'
	import { baseMixin } from '../../../common/mixin'
	import Dispatchbill from '../../../api/Dispatchbill'
	export default {
		mixins: [baseMixin], 
		data(){
			return{
				isCur:0,
				find:{
					keyword:'',
					recdeliverycomp:'',
					dispatchStatus:'',
					dispatchSort:'',
					begin:'',
					end:''
				},
				timer: null,
				scrambleDialog:false,
				dispatchBillList: [],
			}
		},
		directives: {
			autoscroll: {

				bind: el => {
					let index = 1
					const num = $(el).children().length
					const newEl = $(el).html()
					$(el).html(newEl + newEl)
					this.timer = setInterval(() => {
						if (index == num + 1) {
							index = 1
							$(el).css({top: '0'})
						}
						$(el).animate({top: `-${20*index}px`})
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
		methods:{
			search() {
				this.pageIndex = PAGEINDEX
				this.pageSize = PAGESIZE
				this.getList()
			},
			reset() {
				this.find.keyword=''
				this.find.recdeliverycomp=''
				this.find.dispatchStatus=''
				this.find.dispatchSort=''
				this.find.begin=''
				this.find.end=''
				this.pageIndex = PAGEINDEX
				this.pageSize = PAGESIZE
				this.getList()
			},
			tabClick(val){
				this.isCur = val
			},
			view(dispatchOrderID) {
				this.$router.push({ name: 'viewdispatchbill' , query: { dispatchOrderID } })
			},
			getList () {
				Dispatchbill.find({
					current: this.pageIndex,
					size: this.pageSize,
					keyword: this.find.keyword,
					customerID: this.find.customerID,
					status: this.find.status,
					beginDispatchDate: this.find.begin,
					endDispatchDate: this.find.end
				}).then(res => {
					this.dispatchBillList = res.records
					this.total = res.total
				})
			},
			scramble(){
				this.scrambleDialog= true
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
				p
					margin 0
					padding 0
					line-height 24px
				.dispatchbillTit
					float left
					height 20px
					.num
						color #409EFF
						margin-right 10px
						cursor pointer
					.quoteInfo
						width 300px
						padding 0 10px
						display inline-block
						vertical-align top
						height 20px
						line-height 20px
						overflow hidden
						position relative
						.quoteList
							position absolute
							b
								font-weight normal
								margin-left 10px
				.handler
					float right
					height 20px
					span
						margin-left 20px
						line-height 20px
						cursor pointer

	.c3			
		color #f60
	.selectTruck
		cursor pointer
	.tracto
		padding 0 5px 0 8px		
</style>