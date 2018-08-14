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
			<div class="table-container">
				<div class="table-tit">待调度的承运单</div>
				<div class="table-box">
					<table class="table-main" style="padding-left:50px">
						<thead>
							<tr>
								<th><p>承运单号</p><p>委托时间</p></th>
								<th><p>发货方</p><p>到货方</p></th>
								<th><p>装车地区</p><p>卸货地区</p></th>
								<th><p>装车地址</p><p>卸货地址</p></th>
								<th><p>装车时间</p><p>到货时间</p></th>
								<th>货物</th>
								<th>订单量</th>
								<th>剩余量</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in tableData" :key="index">
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
									<p>{{item.shipperDate | getdatefromtimestamp('min')}}</p>
									<p>{{item.consigneeDate | getdatefromtimestamp('min')}}</p>
								</td>
								<td align="center">{{item.cargoName}}</td>
								<td align="center">{{item.orderNum}}</td>
								<td align="center">
									{{item.remainingCargoWeight ? item.remainingCargoWeight + '吨/' : '0吨/'}}
									{{item.remainingCargoVolume ? item.remainingCargoVolume + '方/' : '0方/'}}
									{{item.remainingCargoNum ? item.remainingCargoNum + '件' : '0件'}}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="table-box-cong" style="top:40px;left:0px;width:60px">
					<table>
						<thead>
							<tr style="height:61px"><th>选择</th></tr>
						</thead>
						<tbody>
							<tr style="height:61px" v-for="(item, index) in tableData" :key="index">
								<td class="wf-check">
									<span 
										class="checkbox" 
										:class="selectedList.map(i => i.carrierCargoID).includes(item.carrierCargoID) ? 'selected' : ''"
										@click="handSelectCarrierOrder(item)">
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</el-card>

		<el-row style="margin-top:20px" :gutter="20">
			<el-col :span="14">
				<el-card class="table-container">
					<div class="table-tit">已选择的承运单</div>
					<div class="table-box">
						<table class="table-main" style="padding-right: 399px">
							<thead>
								<tr>
									<th>承运单号</th>
									<th><p>发货方</p><p>到货方</p></th>
									<th><p>装车地区</p><p>卸货地区</p></th>
									<th><p>装车地址</p><p>卸货地址</p></th>
									<th>货物</th>
									<th>配载方式</th>
								</tr>
							</thead>
							<tbody>
								<tr style="height:93px" v-for="(item, index) in selectedList" :key="index">
									<td align="center">{{item.carrierOrderNo}}</td>
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
									<td align="center">{{item.cargoName}}</td>
									<td align="center">
										<span v-if="item.dispatchType == 'Quantity'">按数量配载</span>
										<span v-else-if="item.dispatchType == 'Volumn'">按体积配载</span>
										<span v-else-if="item.dispatchType == 'Weight'">按重量配载</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="table-box-cong" style="top:60px;right:20px;width:400px">
						<table>
							<thead>
								<tr style="height:61px">
									<th>待配数量</th>
									<th>待配重量</th>
									<th>待配体积</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr style="height:80px" v-for="(item, index) in selectedList" :key="index">
									<td align="center">
										<p style="position:relative;top:8px"><span class="surplus">余</span>{{item.remainingCargoNum ? item.remainingCargoNum + '件' : '0件'}}</p>
										<el-form :model="item" ref="ruleForm">
											<el-form-item prop="cargoNum" :rules="[{
												validator: (rule, value, callback) => {
													const r = /^[1-9]\d*$/
													if (item.dispatchType == 'Quantity' && (!item.cargoNum || item.cargoNum == '0')) {
														callback('请输入数量')
													} else if (value > item.remainingCargoNum) {
														callback('配载数量不能大于待配数量！')
													} else if (value && !r.test(value)) {
														callback('请输入正确的数字')
													} else {
														callback()
													}
												}
											}]">
												<el-input size="mini" v-model="item.cargoNum"></el-input>
											</el-form-item>
										</el-form>
									</td>
									<td align="center">
										<p style="position:relative;top:8px"><span class="surplus">余</span>{{item.remainingCargoWeight ? item.remainingCargoWeight + '吨' : '0吨'}}</p>
										<el-form :model="item" ref="ruleForm">
											<el-form-item prop="cargoWeight" :rules="[{
												validator: (rule, value, callback) => {
													const r = /(^[1-9]\d*\.\d{1,2}$)|(^0{1}\.\d{1,2}$)|(^[1-9]\d*$)/
													if (item.dispatchType == 'Weight' && (!item.cargoWeight || item.cargoWeight == '0')) {
														callback('请输入重量')
													} else if (value > item.remainingCargoWeight) {
														callback('配载重量不能大于待配重量！')
													} else if (value && !r.test(value)) {
														callback('请输入正确的数字')
													} else {
														callback()
													}
												}
											}]">
												<el-input size="mini" v-model="item.cargoWeight"></el-input>
											</el-form-item>
										</el-form>
									</td>
									<td align="center">
										<p style="position:relative;top:8px"><span class="surplus">余</span>{{item.remainingCargoVolume ? item.remainingCargoVolume + '方' : '0方'}}</p>
										<el-form :model="item" ref="ruleForm">
											<el-form-item prop="cargoVolume" :rules="[{
												validator: (rule, value, callback) => {
													const r = /(^[1-9]\d*\.\d{1,2}$)|(^0{1}\.\d{1,2}$)|(^[1-9]\d*$)/
													if (item.dispatchType == 'Volumn' && (!item.cargoVolume || item.cargoVolume == '0')) {
														callback('请输入体积')
													} else if (value > item.remainingCargoVolume) {
														callback('配载体积不能大于待配体积！')
													} else if (value && !r.test(value)) {
														callback('请输入正确的数字')
													} else {
														callback()
													}
												}
											}]">
												<el-input size="mini" v-model="item.cargoVolume"></el-input>
											</el-form-item>
										</el-form>
									</td>
									<td align="center">
										<el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteCarrierOrder(item)"></el-button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="num-info">
						<span class="num-tit">配载总量</span>
						<span class="num-label"><span>数</span>{{totalNum}}</span>
						<span class="num-label"><span>重</span>{{totalWeight}}</span>
						<span class="num-label"><span>体</span>{{totalVolume}}</span>
					</div>
				</el-card>
			</el-col>
			<el-col :span="10">
				<el-card class="table-container">
					<div class="table-tit">运输线路</div>
					<div class="table-box">
						<table class="table-main" style="padding-right: 79px">
							<thead>
								<tr>
									<th>优先</th>
									<th>承运单</th>
									<th>类型</th>
									<th>地点</th>
									<th>距离</th>
									<th>执行时间</th>
								</tr>
							</thead>
							<tbody>
								<tr style="height:50px" v-for="(item, index) in transLines" :key="index">
									<td align="center">{{index+1}}</td>
									<td align="center">{{item.carrierOrderNo}}</td>
									<td align="center" :class="item.type == '装车' ? 'load' : 'unload'">{{item.type}}</td>
									<td align="center">
										<span v-if="item.type == '装车'">{{item.shipperArea}}</span>
										<span v-else>{{item.consigneeArea}}</span>
									</td>
									<td align="center">10公里</td>
									<td align="center">{{item.date | getdatefromtimestamp('min')}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="table-box-cong" style="top:60px;right:20px;width:80px">
						<table>
							<thead>
								<tr>
									<th>排序</th>
								</tr>
							</thead>
							<tbody>
								<tr style="height:50px" v-for="(item, index) in transLines" :key="index">
									<td align="center">
										<span class="up" @click="changeSort(index, 'up')">
											<svg-icon icon-class="upArrow" class="icon up" :class="index == 0 ? 'disabled' : ''"></svg-icon>
										</span>
										<span class="down" @click="changeSort(index, 'down')">
											<svg-icon icon-class="downArrow" class="icon down" :class="index == transLines.length-1 ? 'disabled' : ''"></svg-icon>
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="num-info">
						<span class="num-tit">预计里程160公里</span>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="margin-top:20px">
			<el-col :span="24" class="text-center">
				<el-button type="primary" @click="publish('dispatch')">发布派车单</el-button>
				<el-button type="success" @click="publish('grab')">发布抢单</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import distData from '../../../assets/data/distpicker.data'
import DistPicker from '../../CommonComponents/DistPicker2'
import { baseMixin } from '../../../common/mixin'
import Dispatchbill from '../../../api/Dispatchbill'
import { checkFloat2, checkInt } from '../../../common/valid'
export default {
	mixins: [baseMixin], 
	data(){
		return {
			dispatchDialog:false,
			grabDialog:false,
			find: {
				keyword: '',
				customerID: '',
				companyName: '',
				status: '',
				beginDispatchDate: '',
				endDispatchDate: ''
			},
			selectedShipperArea: [],
			selectedListNoRepeat: [],
			transLines: []
		}
	},
	computed: {
		checkFloat2: () => checkFloat2,
		checkInt: () => checkInt,
		totalWeight() {
			const values = this.selectedList.map(item => Number(item.cargoWeight ? item.cargoWeight : 0))
			return values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
		},
		totalVolume() {
			const values = this.selectedList.map(item => Number(item.cargoVolume ? item.cargoVolume : 0))
			return values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
		},
		totalNum() {
			const values = this.selectedList.map(item => Number(item.cargoNum ? item.cargoNum : 0))
			return values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
		},
	},
	components: { DistPicker },
	created() {
		this.getList()
	},
	methods:{
		/**
		 * 上面列表勾选承运单
		 */
		handSelectCarrierOrder(item) {
			const index = this.selectedList.map(i => i.carrierCargoID).indexOf(item.carrierCargoID)
			if (index > -1) {
				this.selectedList.splice(index, 1)
			} else {
				this.selectedList.push(item)
			}
			this.selectedListNoRepeat = this.arrayUnique(this.selectedList, 'carrierOrderID')
			this.transLineCreate()
		},
		/**
		 * 下左列表删除已勾选承运单
		 */
		deleteCarrierOrder(item) {
			const index = this.selectedList.map(i => i.carrierCargoID).indexOf(item.carrierCargoID)
			this.selectedList.splice(index, 1)
			this.selectedListNoRepeat = this.arrayUnique(this.selectedList, 'carrierOrderID')
			this.transLineCreate()
		},
		changeSort(i, type) {
			const list = [...this.transLines]
			const current = list[i]
			if (type == 'up') {
				list[i] = list[i-1]
				list[i-1] = current
			} else {
				list[i] = list[i+1]
				list[i+1] = current
			}
			this.transLines = list
		},
		transLineCreate() {
			this.transLines = []
			this.selectedListNoRepeat.forEach((i, x) => {
				this.transLines.push(...[
					{
						type: '装车',
						carrierOrderID: i.carrierOrderID,
						carrierOrderNo: i.carrierOrderNo,
						shipperArea: i.shipperArea,
						date: i.shipperDate
					},{
						type: '卸货',
						carrierOrderID: i.carrierOrderID,
						carrierOrderNo: i.carrierOrderNo,
						consigneeArea: i.consigneeArea,
						date: i.consigneeDate,
					}
				])
			})
			this.transLines.sort((a, b) => {
				if (a.date == b.date) {
					return a.carrierOrderNo - b.carrierOrderNo
				} else {
					return a.date - b.date
				}
			})
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
					carrierOrderID: 1,
					carrierCargoID: 1,
					carrierOrderNo: '102336654',
					commissionDate: 1531238400000,
					shipperName: '1号工厂',
					consigneeName: '漳县罗凯',
					shipperArea: '云南昆明',
					consigneeArea: '云南普洱',
					shipperDetailAddress: '五华区彩云北路23040号92栋',
					consigneeDetailAddress: '官渡区彩云北路23040号93栋',
					shipperDate: 1519912800000,
					consigneeDate: 1520085600000,
					cargoName: 'spc1水泥',
					orderNum: '2000袋/100吨',
					remainingCargoNum: 1500,
					remainingCargoVolume: 5,
					remainingCargoWeight: 100,
					dispatchType: 'Quantity'
				},
				{
					carrierOrderID: 1,
					carrierCargoID: 2,
					carrierOrderNo: '102336654',
					commissionDate: 1531238400000,
					shipperName: '1号工厂',
					consigneeName: '漳县罗凯',
					shipperArea: '云南昆明',
					consigneeArea: '云南普洱',
					shipperDetailAddress: '五华区彩云北路23040号92栋',
					consigneeDetailAddress: '官渡区彩云北路23040号93栋',
					shipperDate: 1519999200000,
					consigneeDate: 1520172000000,
					cargoName: '飞机杯',
					orderNum: '2000袋/100吨',
					remainingCargoNum: 1500,
					remainingCargoVolume: 5,
					remainingCargoWeight: 100,
					dispatchType: 'Quantity'
				},
				{
					carrierOrderID: 2,
					carrierCargoID: 3,
					carrierOrderNo: '102336655',
					commissionDate: 1531238400000,
					shipperName: '2号工厂',
					consigneeName: '龚键',
					shipperArea: '湖北武汉',
					consigneeArea: '广东深圳',
					shipperDetailAddress: '五华区彩云北路23040号92栋',
					consigneeDetailAddress: '官渡区彩云北路23040号93栋',
					shipperDate: 1520085600000,
					consigneeDate: 1520258400000,
					cargoName: '充气娃娃',
					orderNum: '2000袋/100吨',
					remainingCargoNum: 1500,
					remainingCargoVolume: 5,
					remainingCargoWeight: 100,
					dispatchType: 'Volumn'
				},
				{
					carrierOrderID: 3,
					carrierCargoID: 4,
					carrierOrderNo: '102336656',
					commissionDate: 1531238400000,
					shipperName: '3号工厂',
					consigneeName: '龙哥',
					shipperArea: '云南昆明',
					consigneeArea: '云南普洱',
					shipperDetailAddress: '五华区彩云北路23040号92栋',
					consigneeDetailAddress: '官渡区彩云北路23040号93栋',
					shipperDate: 1520172000000,
					consigneeDate: 1520344800000,
					cargoName: '啤酒',
					orderNum: '2000袋/100吨',
					remainingCargoNum: 1500,
					remainingCargoVolume: 5,
					remainingCargoWeight: 100,
					dispatchType: 'Weight'
				}
			]
		},
		// 发布派车单&发布抢单
		publish(type){
			this[type + 'Dialog'] = true
			if (this.selectedList.length == 0) {
				Message.error(`请选择承运单！`)
				return
			}
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
				this[type + 'Dialog'] = true
			}).catch(err => {})
		},
		arrayUnique(arr, attr) {
			const hash = {}
			return arr.reduce((item, next) => {
				hash[next[attr]] ? '' : hash[next[attr]] = true && item.push(next)
				return item
			}, [])
		}
	}
}
</script>
<style lang="stylus" scoped>
.wf-check
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
.table-container
	position relative
	.table-tit
		height 40px
		line-height 40px
		font-size 14px
		font-weight bold
	.table-box-cong
		position absolute
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
		td
			padding 0px 15px
	.table-box
		width 100%
		overflow hidden
		overflow-x auto
		.table-main
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
			td
				padding 10px 15px
	table
		font-size 14px
		background-color #dcdfe6
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
.tracto
	padding 0 5px 0 8px
.load
	color #409EFF
.unload
	color #ff6900
.num-info
	height 40px
	line-height 40px
	font-size 14px
	text-align right
	.num-tit
		color #409EFF
		font-weight 600
		margin-right 10px
	.num-label
		margin-right 10px
		span
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