<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">承运单列表</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="承运单号/货物名称/发货方/到货方"></el-input>
					</el-form-item>
					<el-form-item label="发货地">
						<dist-picker :distList="selectedShipperArea" @hand-select="handleSelectedShipperArea"></dist-picker>
					</el-form-item>
					<el-form-item label="收货地">
						<dist-picker :distList="selectedShipperArea" @hand-select="handleSelectedShipperArea"></dist-picker>
					</el-form-item>
					<el-form-item label="委托时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="到货时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="装车时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" >
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<table class="dispatchTable">
				<caption>待调度的承运单</caption>
				<thead>
					<tr>
						<th>选择</th>
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
						<th>
							<p>装车时间</p>
							<p>到货时间</p>
						</th>
						<th>货物</th>
						<th>订单量</th>
						<th>已调度量</th>
						<th>剩余量</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="10"></td>
					</tr>
				</tfoot>
			</table>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import distData from '../../../assets/data/distpicker.data'
import DistPicker from '../../CommonComponents/DistPicker2'
	export default {
		data(){
			return {
				pageIndex: 1,
				pageSize: 10,
				total: 0,
				selectedShipperArea: [],
			}
		},
		components: { DistPicker },
		methods:{
			search() {
				this.pageIndex = 1
				this.pageSize = 10
				this.getList()
			},
			reset() {

				this.pageIndex = 1
				this.pageSize = 10
				this.getList()
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
		}
	}
</script>
<style lang="stylus" scoped>
	.dispatchTable
		width 100%
		font-size 14px
		background #dcdfe6
		border-spacing 1px
		caption
			text-align left
			font-weight bold
			line-height 40px
		p
			margin 0
			padding 0
		th
		td
			padding 10px 15px
		th
			background #f2f2f2
			color #999
		td
			background #fff
</style>