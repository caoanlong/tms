<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">调度配载</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="承运单号/货物名称/发货方/到货方"></el-input>
					</el-form-item>
					<el-form-item label="发货地">
						<dist-picker :distList="selectedShipperArea" @hand-select="handleSelectedShipperArea" style="width:250px"></dist-picker>
					</el-form-item>
					<el-form-item label="收货地">
						<dist-picker :distList="selectedShipperArea" @hand-select="handleSelectedShipperArea" style="width:250px"></dist-picker>
					</el-form-item><br/>
					<el-form-item label="委托时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp">
						</el-date-picker>
					</el-form-item><br/>
					<el-form-item label="到货时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp">
						</el-date-picker>
					</el-form-item><br/>
					<el-form-item label="装车时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
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
						<tr v-for="(item, index) in tableData" :key="index">
							<td class="wfCheck">
								<span 
									class="checkbox" 
									:class="selectedList.map(i => i.carrierOrderNo).includes(item.carrierOrderNo) ? 'selected' : ''"
									@click="handSelectCarrierOrder(item)">
								</span>
							</td>
							<td align="center">
								<p>{{item.carrierOrderNo}}</p>
								<p>{{item.commissionDate}}</p>
							</td>
							<td align="center">
								<p>{{item.shipperName}}</p>
								<p>{{item.consigneeName}}</p>
							</td>
							<td align="center">
								<p><span class="from">发</span>{{item.shipperArea}}</p>
								<p><span class="to">到</span>{{item.consigneeArea}}</p>
							</td>
							<td align="center" class="address">
								<p>{{item.shipperDetailAddress}}</p>
								<p>{{item.consigneeDetailAddress}}</p>
							</td>
							<td align="center">
								<p>{{item.shipperDate}}</p>
								<p>{{item.consigneeDate}}</p>
							</td>
							<td align="center">{{item.cargoName}}</td>
							<td align="center">{{item.orderNum}}</td>
							<td align="center">{{item.dispatchedNum}}</td>
							<td align="center">{{item.restNum}}</td>
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
				<el-button type="primary">发布派车单</el-button>
				<el-button type="success">发布抢单</el-button>
			</el-col>
		</el-row>
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
				find: {
					keyword: '',
					customerID: '',
					companyName: '',
					status: '',
					beginDispatchDate: '',
					endDispatchDate: ''
				},
				selectedShipperArea: []
			}
		},
		components: { DistPicker},
		created() {
			this.getList()
		},
		methods:{
			handSelectCarrierOrder(item) {
				const index = this.selectedList.map(i => i.carrierOrderNo).indexOf(item.carrierOrderNo)
				if (index > -1) {
					this.selectedList.splice(index, 1)
				} else {
					this.selectedList.push(item)
				}
			},
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
				this.tableData = [
					{
						carrierOrderNo: '102336654',
						commissionDate: '2018-07-11 00:00:00',
						shipperName: '1号工厂',
						consigneeName: '漳县罗凯',
						shipperArea: '云南昆明',
						consigneeArea: '云南普洱',
						shipperDetailAddress: '五华区彩云北路23040号92栋',
						consigneeDetailAddress: '官渡区彩云北路23040号93栋',
						shipperDate: '2018-03-01 22:00',
						consigneeDate: '2018-03-04 22:00',
						cargoName: 'spc1水泥',
						orderNum: '2000袋/100吨',
						dispatchedNum: '500袋/20吨',
						restNum: '1500袋/100吨'
					},
					{
						carrierOrderNo: '102336655',
						commissionDate: '2018-07-11 00:00:00',
						shipperName: '2号工厂',
						consigneeName: '龚键',
						shipperArea: '云南昆明',
						consigneeArea: '云南普洱',
						shipperDetailAddress: '五华区彩云北路23040号92栋',
						consigneeDetailAddress: '官渡区彩云北路23040号93栋',
						shipperDate: '2018-03-01 22:00',
						consigneeDate: '2018-03-04 22:00',
						cargoName: 'spc1水泥',
						orderNum: '2000袋/100吨',
						dispatchedNum: '500袋/20吨',
						restNum: '1500袋/100吨'
					},
					{
						carrierOrderNo: '102336656',
						commissionDate: '2018-07-11 00:00:00',
						shipperName: '3号工厂',
						consigneeName: '龙哥',
						shipperArea: '云南昆明',
						consigneeArea: '云南普洱',
						shipperDetailAddress: '五华区彩云北路23040号92栋',
						consigneeDetailAddress: '官渡区彩云北路23040号93栋',
						shipperDate: '2018-03-01 22:00',
						consigneeDate: '2018-03-04 22:00',
						cargoName: 'spc1水泥',
						orderNum: '2000袋/100吨',
						dispatchedNum: '500袋/20吨',
						restNum: '1500袋/100吨'
					}
				]
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
</style>