<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">调度配载</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-row>
						<el-form-item label="关键字">
							<el-input placeholder="承运单号/货物名称/发货方/到货方"></el-input>
						</el-form-item>
						<el-form-item label="发货地">
							<dist-picker :distList="selectedShipperArea" @hand-select="handleSelectedShipperArea" style="width:250px"></dist-picker>
						</el-form-item>
						<el-form-item label="收货地">
							<dist-picker :distList="selectedShipperArea" @hand-select="handleSelectedShipperArea" style="width:250px"></dist-picker>
						</el-form-item>
					</el-row>
					<el-row>					
					<el-form-item label="委托时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" style="width:160px">
						</el-date-picker><span class="tracto">至</span>
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" style="width:160px">
						</el-date-picker>
					</el-form-item>
				
					<el-form-item label="到货时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" style="width:160px">
						</el-date-picker><span class="tracto">至</span>
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" style="width:160px">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="装车时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" style="width:160px">
						</el-date-picker><span class="tracto">至</span>
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" style="width:160px">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-row>
				</el-form>
			</div>
			<div class="tableTit">待调度的承运单</div>
			<div class="tableBox">
				<table class="dispatchTable">
					<thead>
						<tr>
							<th width="64">选择</th>
							<th><p>承运单号</p><p>委托时间</p></th>
							<th><p>发货方</p><p>到货方</p></th>
							<th><p>装车地区</p><p>卸货地区</p></th>
							<th><p>装车地址</p><p>卸货地址</p></th>
							<th><p>装车时间</p><p>到货时间</p></th>
							<th>货物</th>
							<th>订单量</th>
							<th>已调度量</th>
							<th>剩余量</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in 5" :key="index">
							<td class="wfCheck">
								<span class="checkbox selected"><label></label></span>
							</td>
							<td align="center">
								<p>{{index+102336654}}</p>
								<p>2018-03-0{{index+1}}</p>
							</td>
							<td align="center">
								<p>{{index +1}}号工厂</p>
								<p>漳县罗凯</p>
							</td>
							<td align="center">
								<p><span class="from">发</span>云南昆明</p>
								<p><span class="to">到</span>云南普洱</p>
							</td>
							<td class="address">
								<p>五华区彩云北路23040号，92栋</p>
								<p>官渡区彩云北路23040号，93栋</p>
							</td>
							<td align="center">
								<p>2018-03-0{{index+1}} 22:00</p>
								<p>2018-03-0{{index+4}} 22:00</p>
							</td>
							<td align="center">spc{{index+1}}水泥</td>
							<td align="center">2000袋/100吨</td>
							<td align="center">500袋/20吨</td>
							<td align="center">1500袋/100吨</td>
						</tr>
					</tbody>
				</table>
			</div>
			<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</el-card>
		<el-row style="margin-top:20px" :gutter="20">
			<el-col :span="14">
				<el-card class="posr">
					<div class="tableTit">已选择的承运单</div>
					<div class="tableBox hasFixColumn">
						<table class="dispatchTable">
							<thead>
								<tr>
									<th>
										<p>承运单号</p>
										<p>委托时间</p>
									</th>
									<th>
										<p>发货方</p>
										<p>到货方</p>
									</th>
									<th>
										<p>装车地区</p>
										<p>卸货地区</p>
									</th>
									<th>
										<p>装车地址</p>
										<p>卸货地址</p>
									</th>
									<th>货物</th>
									<th>配载方式</th>
									
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in 5" :key="index">
									<td align="center">
										<p>{{index+102336654}}</p>
										<p>2018-03-0{{index+1}}</p>
									</td>
									<td align="center">
										<p>{{index+1}}号工厂</p>
										<p>漳县罗凯</p>
									</td>
									<td align="center">
										<p><span class="from">发</span>云南昆明</p>
										<p><span class="to">到</span>云南普洱</p>
									</td>
									<td class="address">
										<p>五华区彩云北路23040号，92栋</p>
										<p>官渡区彩云北路23040号，93栋</p>
									</td>
									<td align="center">spc{{index+1}}水泥</td>
									<td align="center">按数量</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="tableBox FixColumn">
						<table class="dispatchTable">
							<thead>
								<tr>
									<th>待配数量</th>
									<th>待配重量</th>
									<th>待配体积</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in 5" :key="index">
									<td align="center"><p><span class="surplus">余</span>200袋</p><el-input size="mini"></el-input> </td>
									<td align="center"><p><span class="surplus">余</span>5吨</p><el-input size="mini"></el-input> </td>
									<td align="center"><p><span class="surplus">余</span>3.4方</p><el-input size="mini"></el-input> </td>
								</tr>
							</tbody>
						</table>
					</div>
				</el-card>
			</el-col>
			<el-col :span="10">
				<el-card>
					<div class="tableTit">运输线路</div>
					<div class="tableBox">
						<table class="dispatchTable">
							<thead>
								<tr>
									<th>优先</th>
									<th>承运单</th>
									<th>类型</th>
									<th>地点</th>
									<th>距离</th>
									<th>执行时间</th>
									<th>排序</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in 5" :key="index">
									<td align="center">{{index + 1}}</td>
									<td align="center">{{index+102336654}}</td>
									<td align="center">装车</td>
									<td align="center">昆明</td>
									<td align="center">10公里</td>
									<td align="center">2018-03-02 22:00</td>
									<td align="center"><span class="up"><svg-icon icon-class="upArrow" class="icon up" :class="index==0?'disabled':''"></svg-icon></span><span class="down"><svg-icon icon-class="downArrow" class="icon down" :class="index==4?'disabled':''"></svg-icon></span></td>
								</tr>
							</tbody>
						</table>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="margin-top:20px">
			<el-col :span="24" class="text-center">
				<el-button type="primary" @click="publishDispatchOrder">发布派车单</el-button>
				<el-button type="success" @click="publishOrder">发布抢单</el-button>
			</el-col>
		</el-row>
		<el-dialog title="发布派车单" :visible.sync="DispatchOrderDialog" custom-class="DispatchOrderDialog" top="5vh" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
			<el-form size="small">
				<el-row class="baseInfo">
					<p>总配载：<span class="tag">数</span><span class="num">1200</span><span class="tag">重</span><span class="num">30</span><span class="tag">体</span><span class="num">18</span></p>
					<p><b>3</b>装<b>3</b>卸  预计总里程<b>160</b>公里</p>
				</el-row>
				<el-row>
					<table class="dialogTable">
						<caption>车辆人员</caption>
						<thead>
							<tr>
								<th>车辆</th>
								<th>驾驶员</th>
								<th>随行人员</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td align="center"><span class="addbtn">+ 添加车辆</span></td>
								<td align="center"><span class="addbtn">+ 添加驾驶员</span></td>
								<td align="center"><span class="addbtn">+ 添加随行人员</span></td>
							</tr>
						</tbody>
					</table>
				</el-row>
				<el-row>
					<table class="dialogTable">
						<caption>任务运费&支付方式</caption>
						<thead>
							<tr>
								<th>费用科目</th>
								<th>费用类型</th>
								<th>收款人</th>
								<th>支付方式</th>
								<th>金额</th>
								<th><span class="addbtn">+ 添加费用</span></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td align="center"></td>
								<td align="center"></td>
								<td align="center"></td>
								<td align="center"></td>
								<td align="center"></td>
								<td align="center"><span class="delbtn">删除</span></td>
							</tr>
						</tbody>
					</table>
				</el-row>
				<el-row>
					<p class="totalFrete">总运费：30000.00元</p>
				</el-row>
				<el-row>
					<el-form-item label="接单截止时间">
						<el-date-picker type="date" :clearable="false" value-format="timestamp">
						</el-date-picker>
					</el-form-item>
				</el-row>
				<el-row style="margin-top:20px">
					<el-col :span="24">
						<el-form-item label-width="0" class="text-center">
							<el-button @click="cancelDispatchOrder">取消</el-button>
							<el-button type="primary" @click="saveDispatchOrder">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				
			</el-form>
		</el-dialog>
		<el-dialog title="发布抢单" :visible.sync="OrderDialog" custom-class="OrderDialog" top="5vh" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
			<el-form size="small" :inline="true">
				<el-row class="baseInfo">
					<p>总配载：<span class="tag">数</span><span class="num">1200</span><span class="tag">重</span><span class="num">30</span><span class="tag">体</span><span class="num">18</span></p>
					<p><b>3</b>装<b>3</b>卸  预计总里程<b>160</b>公里</p>
				</el-row>
				<el-row>
					<div class="section-title">用车需求</div>
					<el-form-item label="车型">
						<el-select placeholder="请选择车型">
							<el-option value="车型1" label="车型1">车型1</el-option>
							<el-option value="车型2" label="车型2">车型2</el-option>
							<el-option value="车型3" label="车型3">车型3</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车长">
						<el-input placeholder="请输入车长"><template slot="append">米</template></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="报价类型">
						<el-radio-group>
							<el-radio label="司机报价"></el-radio>
							<el-radio label="定价抢单"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="一口价金额">
						<el-input placeholder="请输入金额"><template slot="append">元</template></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="运费支付方式">
						<el-radio-group>
							<el-radio label="预付"></el-radio>
							<el-radio label="到付"></el-radio>
							<el-radio label="收货方付"></el-radio>
							<el-radio label="回单付"></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="接单截止时间">
						<el-date-picker type="date" :clearable="false" value-format="timestamp">
						</el-date-picker>
					</el-form-item>
				</el-row>
				<el-row style="margin-top:20px" class="text-center">
					<el-col :span="24">
						<el-form-item>
							<el-button @click="cancelOrder" size="small">取消</el-button>
							<el-button type="primary" @click="saveOrder" size="small">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				
			</el-form>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import distData from '../../../assets/data/distpicker.data'
import DistPicker from '../../CommonComponents/DistPicker2'
import { baseMixin } from '../../../common/mixin'
import Dispatchbill from '../../../api/Dispatchbill'
	export default {
		mixins: [baseMixin], 
		data(){
			return {
				DispatchOrderDialog:false,
				OrderDialog:false,
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
				total: 0,
				selectedShipperArea: [],
				dispatchBillList:[]
			}
		},
		components: { DistPicker},
		created() {
			this.getList()
		},
		methods:{
			handleSelectedShipperArea(data) {
				if (!data) return
				this.carrierbillInfo.shipperAreaID = data[data.length - 1]
				this.carrierbillInfo.shipperArea = searchAreaByKey(data[data.length - 1])
				// 取不到区县取城市
				let location = null
				let currentData = ''
				if (data[2]) {
					location = searchLocationByCity(distData[data[1]][data[2]])
					if (location) currentData = data[2]
				}
				if (data[1] && !data[2] || !location) {
					location = searchLocationByCity(distData[data[0]][data[1]])
					if (location) currentData = data[1]
				}
				if (this.selectedShipperArea[1] != currentData && this.selectedShipperArea[2] != currentData) {
					this.carrierbillInfo.shipperLocationAddress = ''
				}
				this.searchShipperAreaHash = Geohash.encode(location.latitude, location.longitude)
			},
			handleSelectedConsigneeArea(data) {
				if (!data) return
				this.carrierbillInfo.consigneeAreaID = data[data.length - 1]
				this.carrierbillInfo.consigneeArea = searchAreaByKey(data[data.length - 1])
				// 取不到区县取城市
				let location = null
				let currentData = ''
				if (data[2]) {
					location = searchLocationByCity(distData[data[1]][data[2]])
					if (location) currentData = data[2]
				}
				if (data[1] && !data[2] || !location) {
					location = searchLocationByCity(distData[data[0]][data[1]])
					if (location) currentData = data[1]
				}
				if (this.selectedConsigneeArea[1] != currentData && this.selectedConsigneeArea[1] != currentData) {
					this.carrierbillInfo.consigneeLocationAddress= ''
				}
				this.searchConsigneeAreaHash = Geohash.encode(location.latitude, location.longitude)
			},
			getList () {
				// Dispatchbill.find({
				// 	current: this.pageIndex,
				// 	size: this.pageSize,
				// 	keyword: this.find.keyword,
				// 	customerID: this.find.customerID,
				// 	status: this.find.status,
				// 	beginDispatchDate: this.find.beginDispatchDate,
				// 	endDispatchDate: this.find.endDispatchDate
				// }).then(res => {
				// 	this.dispatchBillList = res.records
				// 	this.total = res.total
				// })
			},
			// 发布派车单
			publishDispatchOrder(){
				this.DispatchOrderDialog = true
			},
			cancelDispatchOrder(){
				this.DispatchOrderDialog = false
			},
			// 发布抢单
			publishOrder(){
				this.OrderDialog = true
			},
			cancelOrder(){
				this.OrderDialog = false
			},
		}
	}
</script>
<style lang="stylus" scoped>
	.tableBox
		width 100%
		overflow hidden
		overflow-x auto
	.dispatchTable
		font-size 14px
		background #dcdfe6
		border-spacing 1px
		width 100%
		p
			margin 0
			padding 0
			line-height 18px
			white-space  nowrap 
			&:first-child
				margin-bottom 5px
		th
			background #f2f2f2
			color #666
			padding 10px 15px
			white-space  nowrap
			height 61px
		td
			padding 10px 15px
			background #fff
			white-space  nowrap 
			p
				color #999
				&:first-child
					color #666
				span
					width 18px
					height 18px
					display inline-block
					color #fff
					border-radius 4px
					font-size 12px
					line-height 18px
					text-align center
					margin-right 4px
					&.from
						background #409EFF
					&.to
						background #67C23A
					&.surplus
						background #909399
						
			&.address
				width 330px
				p
					max-width 300px
					overflow hidden
					text-overflow ellipsis
		tbody
			tr
				&:nth-child(even)
					td
						background #f8f8f8
							
	.wfCheck
		position relative
		text-align center
		.checkbox
			display block
			width 14px
			height 14px
			margin 0 auto
			background url("../../../assets/imgs/checkbox.png") no-repeat 0 0
			cursor pointer
			&:hover
				background-position -14px 0
			&.selected
				background-position -28px 0
.hasFixColumn
	position relative
	.dispatchTable
		padding-right 329px
.FixColumn
	width 330px
	position absolute
	right 20px
	top 60px
	.dispatchTable
		th
			height 61px
		tbody
			td
				padding 5px 15px
.dispatchTable
	.icon
		margin 0 4px
		cursor pointer
		&.up
			color #409EFF
		&.down
			color #67C23A
		&.disabled
			color #ddd
			cursor not-allowed
.tableTit
	height 40px
	line-height 40px
	font-size 14px
	font-weight bold
.DispatchOrderDialog
.OrderDialog
	.baseInfo
		p
			color #409EFF
			span
				margin-right 20px
				&.tag
					color #fff
					background #409EFF
					font-size 12px
					height 18px
					width 18px
					line-height 18px
					text-align center
					display inline-block
					border-radius 4px
					margin-right 5px
			b
				padding 0 2px
	.section-title
		height 40px
		line-height 40px
		border-bottom 1px solid #f2f2f2
		margin-bottom 20px
.dialogTable
	font-size 14px
	background #dcdfe6
	border-spacing 1px
	width 100%
	caption
		height 40px
		line-height 40px
		text-align left
		
	th
		background #f2f2f2
		color #666
		padding 10px 15px
	td
		padding 10px 15px
		background #fff
	.addbtn
	.delbtn
		color #409EFF
		cursor pointer
.totalFrete
	color #409EFF
.tracto
	padding 0 5px 0 8px
</style>