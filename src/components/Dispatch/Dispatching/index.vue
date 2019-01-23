<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">{{$route.query.dispatchOrderID ? '重新调度配载' : '调度配载'}}</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="交货单号">
						<el-input placeholder="交货单号" v-model="find.shipperNo"></el-input>
					</el-form-item>
					<el-form-item label="发货单位">
						<el-autocomplete 
							style="width:100%" 
                            value-key="companyName" 
                            v-model="find.shipperCustomerName"
                            :fetch-suggestions="getShipperCustomers"
                            placeholder="请输入发货单位" 
                            @select="handSelectShipperCustomer" >
							<i 
								class="el-icon-close el-input__icon" 
								slot="suffix" 
								@click="clearSelectShipperCustomer">
							</i>
                        </el-autocomplete>
					</el-form-item>
					<el-form-item label="收货单位">
                        <el-autocomplete 
							style="width:100%" 
                            value-key="companyName" 
                            v-model="find.consigneeCustomerName"
                            :fetch-suggestions="getConsigneeCustomers"
                            placeholder="请输入收货单位" 
                            @select="handSelectConsigneeCustomer">
							<i 
								class="el-icon-close el-input__icon" 
								slot="suffix" 
								@click="clearSelectConsigneeCustomer">
							</i>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="产品名称">
						<el-input placeholder="请输入产品名称" v-model="find.cargoName"></el-input>
					</el-form-item>
                    <el-form-item label="装车日期">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px" 
							v-model="find.shipperDateBegin">
						</el-date-picker>
						<span class="tracto">至</span>
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px"
                            v-model="find.shipperDateEnd">
						</el-date-picker>
                    </el-form-item>
                   <el-form-item label="到货时间">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px"
							v-model="find.consigneeDateBegin">
						</el-date-picker>
						<span class="tracto">至</span>
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px" 
							v-model="find.consigneeDateEnd">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search()">搜索</el-button>
						<el-button type="default" @click="reset()">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table-container">
				<div class="table-tit">待调度的承运单</div>
				<div class="table-box">
					<table class="table-main" style="padding-left:58px">
						<thead>
							<tr>
								<th>
									<p class="cursor">
										交货单号&nbsp;
										<span class="arrow-group">
											<svg-icon 
												class="arrow-up" 
												:class="{'active': find.orderBy == 'CarrierOrderNo', 'rotate': (find.orderBy == 'CarrierOrderNo' && find.sortType == 'desc')}" 
												icon-class="triangle" 
												@click.native="sort('CarrierOrderNo', find.sortType == 'desc' ? 'asc' : 'desc')">
											</svg-icon>
										</span>
									</p>
								<th>
									<p class="cursor">
										发货工厂&nbsp;
										<span class="arrow-group">
											<svg-icon 
												class="arrow-up" 
												:class="{'active': find.orderBy == 'ShipperCompanyName', 'rotate': (find.orderBy == 'ShipperCompanyName' && find.sortType == 'desc')}"
												icon-class="triangle" 
												@click.native="sort('ShipperCompanyName', find.sortType == 'desc' ? 'asc' : 'desc')">
											</svg-icon>
										</span>
									</p>
									<p class="cursor">
										到货客户&nbsp;
										<span class="arrow-group">
											<svg-icon 
												class="arrow-down" 
												:class="{'active': find.orderBy == 'ConsigneeCompanyName', 'rotate': (find.orderBy == 'ConsigneeCompanyName' && find.sortType == 'asc')}"
												icon-class="triangle" 
												@click.native="sort('ConsigneeCompanyName', find.sortType == 'desc' ? 'asc' : 'desc')">
											</svg-icon>
										</span>
									</p>
								</th>
								<th>
									<p class="cursor">
										装车地区&nbsp;
										<span class="arrow-group">
											<svg-icon 
												class="arrow-up" 
												:class="{'active': find.orderBy == 'ShipperArea', 'rotate': (find.orderBy == 'ShipperArea' && find.sortType == 'desc')}"
												icon-class="triangle" 
												@click.native="sort('ShipperArea', find.sortType == 'desc' ? 'asc' : 'desc')">
											</svg-icon>
										</span>
									</p>
									<p class="cursor">
										卸货地区&nbsp;
										<span class="arrow-group">
											<svg-icon 
												class="arrow-down" 
												:class="{'active': find.orderBy == 'ConsigneeArea', 'rotate': (find.orderBy == 'ConsigneeArea' && find.sortType == 'asc')}"
												icon-class="triangle" 
												@click.native="sort('ConsigneeArea', find.sortType == 'desc' ? 'asc' : 'desc')">
											</svg-icon>
										</span>
									</p>
								</th>
								<th>
									<p class="cursor">
										装车地址&nbsp;
										<span class="arrow-group">
											<svg-icon 
												class="arrow-up" 
												:class="{'active': find.orderBy == 'ShipperAddress', 'rotate': (find.orderBy == 'ShipperAddress' && find.sortType == 'desc')}"
												icon-class="triangle" 
												@click.native="sort('ShipperAddress', find.sortType == 'desc' ? 'asc' : 'desc')">
											</svg-icon>
										</span>
									</p>
									<p class="cursor">
										卸货地址&nbsp;
										<span class="arrow-group">
											<svg-icon 
												class="arrow-down" 
												:class="{'active': find.orderBy == 'ConsigneeAddress', 'rotate': (find.orderBy == 'ConsigneeAddress' && find.sortType == 'asc')}"
												icon-class="triangle" 
												@click.native="sort('ConsigneeAddress', find.sortType == 'desc' ? 'asc' : 'desc')">
											</svg-icon>
										</span>
									</p>
								</th>
								<th>
									<p class="cursor">
										装车时间&nbsp;
										<span class="arrow-group">
											<svg-icon 
												class="arrow-up" 
												:class="{'active': find.orderBy == 'ShipperDate', 'rotate': (find.orderBy == 'ShipperDate' && find.sortType == 'desc')}"
												icon-class="triangle" 
												@click.native="sort('ShipperDate', find.sortType == 'desc' ? 'asc' : 'desc')">
											</svg-icon>
										</span>
									</p>
									<p class="cursor">
										到货时间&nbsp;
										<span class="arrow-group">
											<svg-icon 
												class="arrow-down" 
												:class="{'active': find.orderBy == 'ConsigneeDate', 'rotate': (find.orderBy == 'ConsigneeDate' && find.sortType == 'asc')}"
												icon-class="triangle" 
												@click.native="sort('ConsigneeDate', find.sortType == 'desc' ? 'asc' : 'desc')">
											</svg-icon>
										</span>
									</p>
								</th>
								<th>产品</th>
								<th>订单量</th>
								<th>剩余量</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in tableData" :key="index">
								<td align="center">
									<p>{{item.shipperNo}}</p>
								</td>
								<td>
									<p>{{item.shipperCompanyName}}</p>
									<p>{{item.consigneeCompanyName}}</p>
								</td>
								<td>
									<p><span class="from">发</span>{{item.shipperArea}}</p>
									<p><span class="to">到</span>{{item.consigneeArea}}</p>
								</td>
								<td class="address">
									<p>{{item.shipperLocationAddress + '，' + item.shipperDetailAddress}}</p>
									<p>{{item.consigneeLocationAddress + '，' + item.consigneeDetailAddress}}</p>
								</td>
								<td align="center">
									<p>{{item.shipperDate | isFullDay()}}</p>
									<p>{{item.consigneeDate | isFullDay()}}</p>
								</td>
								<td align="center">{{item.cargoName}}</td>
								<td align="center">
									{{[(item.cargoWeight + '吨'),(item.cargoVolume + '方'),(item.cargoNum ? (item.cargoNum + item.cargoUnitName) :'')] | trimSpaceAndJoinSlash}}
								</td>
								<td align="center">
									{{[(item.remainingCargoWeight + '吨'),( item.remainingCargoVolume + '方'),(item.remainingCargoNum ? (item.remainingCargoNum + item.cargoUnitName) :'')] | trimSpaceAndJoinSlash}}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="table-box-cong" style="top:40px;left:0px;bottom:0;width:60px">
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
			<el-card class="table-container" style="margin-top:20px">
				<div class="table-tit">已选择的承运单</div>
				<div class="table-box">
					<table class="table-main" style="padding-right: 299px">
						<thead>
							<tr>
								<th>交货单号</th>
								<th><p>发货工厂</p><p>到货客户</p></th>
								<th><p>装车地区</p><p>卸货地区</p></th>
								<th><p>装车地址</p><p>卸货地址</p></th>
								<th>产品</th>
								<th>配载方式</th>
							</tr>
						</thead>
						<tbody>
							<tr style="height:93px" v-for="(item, index) in selectedList" :key="index">
								<td align="center">{{item.shipperNo}}</td>
								<td>
									<p>{{item.shipperCompanyName}}</p>
									<p>{{item.consigneeCompanyName}}</p>
								</td>
								<td>
									<p><span class="from">发</span>{{item.shipperArea}}</p>
									<p><span class="to">到</span>{{item.consigneeArea}}</p>
								</td>
								<td class="address">
									<p>{{item.shipperLocationAddress + '，' + item.shipperDetailAddress}}</p>
									<p>{{item.consigneeLocationAddress + '，' + item.consigneeDetailAddress}}</p>
								</td>
								<td align="center">{{item.cargoName}}</td>
								<td align="center">
									<span v-if="item.dispatchType == 'Volumn'">按体积</span>
									<span v-if="item.dispatchType == 'Weight'">按重量</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="table-box-cong" style="top:60px;right:20px;width:300px">
					<table>
						<thead>
							<tr style="height:61px">
								<th>配载数量</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr style="height:80px" v-for="(item, index) in selectedList" :key="index">
								<td align="center" v-if="item.dispatchType == 'Weight'">
									<p style="position:relative;top:8px">
										<span class="surplus">余</span>
										{{item.remainingCargoWeight ? item.remainingCargoWeight + '吨' : '0吨'}}
									</p>
									<el-form :model="item" ref="ruleForm">
										<el-form-item prop="cargoWeightNew" :rules="[{
											validator: (rule, value, callback) => {
												const r = /(^[1-9]\d*\.\d{1,2}$)|(^0{1}\.\d{1,2}$)|(^[1-9]\d*$)/
												if (item.dispatchType == 'Weight' && (!value || value == '0')) {
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
											<el-input size="mini" v-model="item.cargoWeightNew"></el-input>
										</el-form-item>
									</el-form>
								</td>
								<td align="center" v-else-if="item.dispatchType == 'Volumn'">
									<p style="position:relative;top:8px">
										<span class="surplus">余</span>
										{{item.remainingCargoVolume ? item.remainingCargoVolume + '方' : '0方'}}
									</p>
									<el-form :model="item" ref="ruleForm">
										<el-form-item prop="cargoVolumeNew" :rules="[{
											validator: (rule, value, callback) => {
												const r = /(^[1-9]\d*\.\d{1,2}$)|(^0{1}\.\d{1,2}$)|(^[1-9]\d*$)/
												if (item.dispatchType == 'Volumn' && (!value || value == '0')) {
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
											<el-input size="mini" v-model="item.cargoVolumeNew"></el-input>
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
			<el-card class="table-container" style="margin-top:20px">
				<div class="table-tit">运输线路</div>
				<div class="table-box">
					<table class="table-main" style="padding-right: 79px">
						<thead>
							<tr>
								<th>优先</th>
								<th>交货单号</th>
								<th>类型</th>
								<th>地点</th>
								<th>距离</th>
								<th>执行时间</th>
							</tr>
						</thead>
						<tbody>
							<tr style="height:50px" v-for="(item, index) in transLines" :key="index">
								<td align="center">{{index+1}}</td>
								<td align="center">{{item.shipperNo}}</td>
								<td align="center" :class="item.type">{{item.type == 'Load' ? '装车' : '卸货'}}</td>
								<td align="center">{{item.areaName + item.posAddress + item.detailAddress}}</td>
								<td align="center">{{(Number(item.nodeDistance)/1000).toFixed(2)}}公里</td>
								<td align="center">{{item.requireTime | isFullDay()}}</td>
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
					<span class="num-tit">预计里程{{(totalDistance/1000).toFixed(2)}}公里</span>
				</div>
			</el-card>
		<el-row style="margin-top:20px">
			<el-col :span="24" class="text-center">
				<el-button type="primary" @click="publish('dispatch')" v-if="permissions[$route.name]&&permissions[$route.name]['dispatch']">发布派车单</el-button>
				<el-button type="success" @click="publish('grab')" v-if="permissions[$route.name]&&permissions[$route.name]['offer']">发布抢单</el-button>
			</el-col>
		</el-row>
		<publish-dispatch 
			:totalNum="totalNum" 
			:totalWeight="totalWeight" 
			:totalVolume="totalVolume" 
			:totalDistance="totalDistance" 
			:transLines="transLines" 
			:dispatchTaskCargoList="selectedList" 
			:isVisible="dispatchDialog" 
			@cancel="handClosePublish">
		</publish-dispatch>
		<grab-order 
			:totalNum="totalNum" 
			:totalWeight="totalWeight" 
			:totalVolume="totalVolume" 
			:totalDistance="totalDistance" 
			:transLines="transLines" 
			:dispatchTaskCargoList="selectedList" 
			:isVisible="grabDialog" 
			@cancel="handCloseGrab">
		</grab-order>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import axios from 'axios'
import distData from '../../../assets/data/distpicker.data'
import DistPicker from '../../CommonComponents/DistPicker'
import PublishDispatch from '../components/PublishDispatch'
import GrabOrder from '../components/GrabOrder'
import { baseMixin } from '../../../common/mixin'
import CarryOrder from '../../../api/CarryOrder'
import Company from '../../../api/Company'
import { checkFloat2, checkInt } from '../../../common/valid'
import { arrayUnique ,isFullDay } from '../../../common/utils'
export default {
	mixins: [baseMixin], 
	components: { DistPicker, PublishDispatch, GrabOrder },
	data(){
		return {
			dispatchDialog: false,
			grabDialog: false,
			find: {
				shipperNo: '',
				shipperCustomerID: '',
				shipperCustomerName: '',
				consigneeCustomerID: '',
				consigneeCustomerName: '',
				cargoName: '',
				shipperDateBegin: '',
				shipperDateEnd: '',
				consigneeDateBegin: '',
				consigneeDateEnd: '',
				orderBy: 'CarrierOrderNo',
				sortType: 'desc'
			},
			selectedShipperArea: [],
			selectedConsigneeArea: [],
			selectedListNoRepeat: [],
			transLines: [],
			totalDistance: 0
		}
    },
	computed: {
        ...mapGetters(['permissions']),
		checkFloat2: () => checkFloat2,
		checkInt: () => checkInt,
		totalWeight() {
			const values = this.selectedList.map(item => Number(item.cargoWeightNew ? item.cargoWeightNew : 0))
			const val = values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
			return Number(val)
		},
		totalVolume() {
			const values = this.selectedList.map(item => Number(item.cargoVolumeNew ? item.cargoVolumeNew : 0))
			const val = values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
			return Number(val)
		},
		totalNum() {
			const values = this.selectedList.map(item => Number(item.cargoNumNew ? item.cargoNumNew : 0))
			const val = values.reduce((prev, curr) => {
				return prev + curr
			}, 0).toFixed(2)
			return Number(val)
		}
	},
	created() {
		const dispatchOrderID = this.$route.query.dispatchOrderID
		this.getList()
		dispatchOrderID && this.getSelectedList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
			this.selectedList = []
			this.selectedListNoRepeat = []
			this.transLines = []
			const dispatchOrderID = this.$route.query.dispatchOrderID
			this.getList()
			dispatchOrderID && this.getSelectedList()
		}
	},
	methods:{
		reset() {
			this.find.shipperNo = ''
			this.find.shipperCustomerID = ''
			this.find.shipperCustomerName = ''
			this.find.consigneeCustomerID = ''
			this.find.consigneeCustomerName = ''
			this.find.cargoName = ''
			this.find.shipperDateBegin = ''
			this.find.shipperDateEnd = ''
			this.find.consigneeDateBegin = ''
			this.find.consigneeDateEnd = ''
			this.find.orderBy = 'CarrierOrderNo'
			this.find.sortType = 'desc'
			this.selectedShipperArea = []
			this.selectedConsigneeArea = []
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.getList()
		},
		getShipperCustomers(companyName, cb) {
			this.find.shipperCustomerID = ''
			Company.customerSuggest({ companyName }).then(res => { cb(res) })
		},
		getConsigneeCustomers(companyName, cb) {
			this.find.consigneeCustomerID = ''
			Company.customerSuggest({ companyName }).then(res => { cb(res) })
		},
		handSelectShipperCustomer(data) {
			this.find.shipperCustomerID = data.customerID
			this.find.shipperCustomerName = data.companyName
		},
		handSelectConsigneeCustomer(data) {
			this.find.consigneeCustomerID = data.customerID
			this.find.consigneeCustomerName = data.companyName
		},
		clearSelectShipperCustomer() {
			this.find.shipperCustomerID = ''
			this.find.shipperCustomerName = ''
		},
		clearSelectConsigneeCustomer() {
			this.find.consigneeCustomerID = ''
			this.find.consigneeCustomerName = ''
		},
		/**
		 * 排序搜索
		 */
		sort(orderBy, sortType) {
			this.find.orderBy = orderBy
			this.find.sortType = sortType
			this.search()
		},
		/**
		 * 上面列表勾选承运单
		 */
		handSelectCarrierOrder(item) {
			const index = this.selectedList.map(i => i.carrierCargoID).indexOf(item.carrierCargoID)
			if (index > -1) {
				this.selectedList.splice(index, 1)
			} else {
				// 如果添加（已选列表中不存在），根据配载类型，置灰另一类型，并置0
				const oItem = Object.assign({}, item)
				oItem.cargoNumNew = item.remainingCargoNum
				if (item.dispatchType == 'Weight') {
					oItem.cargoWeightNew = item.remainingCargoWeight
					oItem.cargoVolumeNew = 0
				} else if (item.dispatchType == 'Volumn') {
					oItem.cargoWeightNew = 0
					oItem.cargoVolumeNew = item.remainingCargoVolume
				}
				this.selectedList.push(oItem)
			}
			this.selectedListNoRepeat = arrayUnique(this.selectedList, 'carrierOrderID')
			this.transLineCreate()
		},
		/**
		 * 下左列表删除已勾选承运单
		 */
		deleteCarrierOrder(item) {
			const index = this.selectedList.map(i => i.carrierCargoID).indexOf(item.carrierCargoID)
			this.selectedList.splice(index, 1)
			this.selectedListNoRepeat = arrayUnique(this.selectedList, 'carrierOrderID')
			this.transLineCreate()
		},
		/**
		 * 修改排序
		 */
		changeSort(i, type) {
			const list = [...this.transLines]
			const current = list[i]
			if (type == 'up') {
				if (i == 1 && list[i].type == 'Unload') {
					Message.error('第一条必须为装车！')
					return
				}
				if (i == (list.length - 1) && list[i-1].type == 'Load') {
					Message.error('最后一条必须为卸货！')
					return
				}
				list[i] = list[i-1]
				list[i-1] = current
			} else {
				if (i == 0 && list[i+1].type == 'Unload') {
					Message.error('第一条必须为装车！')
					return
				}
				if (i == (list.length - 2) && list[i].type == 'Load') {
					Message.error('最后一条必须为卸货！')
					return
				}
				list[i] = list[i+1]
				list[i+1] = current
			}
			const carriers = list.filter(item => item.carrierOrderNo == list[i].carrierOrderNo)
			if (carriers[0].type == 'Unload' || carriers[1].type == 'Load') {
				Message.error('同一个承运单装车必须在卸货之前！')
				return
			}
			this.transLines = list
			this.getDistance()
		},
		/**
		 * 生成线路
		 */
		transLineCreate() {
			this.transLines = []
			this.selectedListNoRepeat.forEach((i, x) => {
				this.transLines.push({
					type: 'Load',
					carrierOrderID: i.carrierOrderID,
					carrierOrderNo: i.carrierOrderNo,
					shipperNo: i.shipperNo,
					detailAddress: i.shipperDetailAddress,
					posAddress: i.shipperLocationAddress,
					areaName: i.shipperArea,
					areaID: i.shipperAreaID,
					requireTime: i.shipperDate,
					latitude: i.shipperLocationLat,
					longitude: i.shipperLocationLng
				})
				this.transLines.push({
					type: 'Unload',
					carrierOrderID: i.carrierOrderID,
					carrierOrderNo: i.carrierOrderNo,
					shipperNo: i.shipperNo,
					detailAddress: i.consigneeDetailAddress,
					posAddress: i.consigneeLocationAddress,
					areaName: i.consigneeArea,
					areaID: i.consigneeAreaID,
					requireTime: i.consigneeDate,
					latitude: i.consigneeLocationLat,
					longitude: i.consigneeLocationLng
				})
			})
			this.transLines.sort((a, b) => {
				if (a.requireTime == b.requireTime) {
					return a.carrierOrderNo - b.carrierOrderNo
				} else {
					return a.requireTime - b.requireTime
				}
			})
			this.transLines.map((item, i) => Object.assign(item, {sequence: i + 1}))
			this.getDistance()
		},
		/**
		 * 调用高德地图接口获取距离
		 */
		async getDistance() {
			const list = this.transLines.map(item => item.longitude + ',' + item.latitude)
			const results = [0]
			let i = 0
			while(i < list.length - 1) {
				const url = `https://restapi.amap.com/v3/distance?origins=${list[i]}&destination=${list[i+1]}&key=${this.MAPKEY}`
				const res = await axios({ url })
				if (res.data.status == 1) results.push(res.data.results[0].distance)
				i++
			}
			const arrays = [...this.transLines]
			this.totalDistance = 0
			arrays.forEach((item,i) => {
				item.sequence = i+1
				item.nodeDistance = results[i]
				this.totalDistance += Number(item.nodeDistance)
			})
			this.transLines = arrays
		},
		getList () {
			const params = Object.assign(this.find, {
				current: this.pageIndex ,
				size: this.pageSize
			})
			CarryOrder.listOfCanDispatch(params).then(res => {
				this.total = res.total
				this.tableData = res.records
			})
		},
		/**
		 * 重新调度时获取已选择的承运单
		 */
		getSelectedList() {
			const dispatchOrderID = this.$route.query.dispatchOrderID
			CarryOrder.listOfDispatched({ dispatchOrderID }).then(res => {
				this.selectedList = res
				this.selectedListNoRepeat = arrayUnique(this.selectedList, 'carrierOrderID')
				this.transLineCreate()
			})
		},
		// 发布派车单&发布抢单
		publish(type) {
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
		/**
		 * 关闭发布派车单窗口
		 */
		handClosePublish(bool) {
			this.dispatchDialog = false
			if (bool) this.$router.push({name: 'dispatched'})
		},
		/**
		 * 关闭发布抢单
		 */
		handCloseGrab(bool) {
			this.grabDialog = false
			if (bool) this.$router.push({name: 'dispatched'})
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
			height 61px
	.table-box
		width 100%
		overflow hidden
		overflow-x auto
		.table-main
			.arrow-group
				display inline-block
				position relative
				width 14px
				height 14px
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
				.arrow-up
					position absolute
					left 0
					top 4px
					color #cccccc
					transform rotate(180deg)
					&.active
						color #409EFF
					&.rotate
						transform rotate(0deg)
				.arrow-down
					position absolute
					left 0
					top 3px
					color #cccccc
					&.active
						color #409EFF
					&.rotate
						transform rotate(180deg)
			td
				height 61px
				padding 0 15px
	table
		font-size 12px
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
.Load
	color #409EFF
.Unload
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