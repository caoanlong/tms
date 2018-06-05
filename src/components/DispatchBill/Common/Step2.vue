<template>
	<div class="step step2">
		<el-row>
			<div class="split-item">
				<span class="tit">司机及车辆</span>&nbsp;&nbsp;
				<span>{{cargoNum + '个货'}}</span>
				<span>{{totalList[0] + '吨'}}</span>
			</div>
		</el-row>
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="编号">
					<el-input placeholder="编号" v-model="findTruckSelfNum"></el-input>
				</el-form-item>
				<el-form-item label="司机姓名">
					<el-input placeholder="司机姓名" v-model="findTruckName"></el-input>
				</el-form-item>
				<el-form-item label="车牌号">
					<el-input placeholder="车牌号" v-model="findTruckPlateNum"></el-input>
				</el-form-item>
				<el-form-item label="车型">
					<el-input placeholder="车型" v-model="findTruckType"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getTruckList">搜索</el-button>
					<el-button type="default" @click="resetTruck">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list">
			<DriverItem 
				:isSelected="selectedDriver.truckID == item.truckID" 
				:index="index" 
				v-for="(item, index) in truckList" 
				:key="index" 
				:truck="item" 
				@click.native.stop="selectDriverItem(item)"/>
		</div>
		<div class="pagination">
			<el-pagination :page-size="truckPageSize" align="right" background layout="prev, pager, next" :total="truckCount" @current-change="pageTruckChange"></el-pagination>
		</div>
		<el-row>
			<div class="split-item">
				<span class="tit">随车人员</span>
			</div>
		</el-row>
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="姓名">
					<el-input placeholder="姓名" v-model="findPersonName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getPersonList">搜索</el-button>
					<el-button type="default" @click="resetPerson">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list">
			<EscortItem 
				:isSelected="selectedEscort.staffID == item.staffID" 
				:index="index" 
				v-for="(item,index) in personList" 
				:key="index" 
				:person="item"
				@click.native.stop="selectEscortItem(item)" />
		</div>
		<div class="pagination">
			<el-pagination :page-size="personPageSize" align="right" background layout="prev, pager, next" :total="personCount" @current-change="pagePersonChange"></el-pagination>
		</div>
		<div class="step-footer">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" @click="nextStep">下一步</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request from '../../../common/request'
	import DriverItem from './DriverItem'
	import EscortItem from './EscortItem'
	export default {
		props: {
			startLoad: {
				type: Boolean,
				default: false
			},
			totalList: {
				type: Array,
				default: () => []
			},
			cargoNum: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				selectedDriver: {},
				selectedEscort: {},
				findTruckSelfNum: '',
				findTruckName: '',
				findTruckPlateNum: '',
				findTruckType: '',
				truckPageIndex: 1,
				truckPageSize: 10,
				truckCount: 0,
				truckList: [],
				findPersonName: '',
				personPageIndex: 1,
				personPageSize: 10,
				personCount: 0,
				personList: [],
			}
		},
		watch: {
			startLoad: function(newVal) {
				newVal && this.getTruckList()
				newVal && this.getPersonList()
			}
		},
		created() {
			// this.getTruckList()
			// this.getPersonList()
		},
		methods: {
			prevStep() {
				this.$emit('prevStep', 0)
			},
			nextStep() {
				// if (!this.selectedDriver.truckID) {
				// 	Message.error('请选择司机车辆！')
				// 	return
				// }
				// if (this.selectedDriver.loadStatus == 'Empty') {
				// 	if(!this.selectedEscort.staffID) {
				// 		Message.error('该车辆需要随车人员！')
				// 		return
				// 	}
				// }
				this.$emit('nextStep', 2, this.selectedDriver, this.selectedEscort)
			},

			pageTruckChange(index) {
				this.truckPageIndex = index
				this.getTruckList()
			},
			pagePersonChange(index) {
				this.personPageIndex = index
				this.getPersonList()
			},
			resetTruck() {
				this.findTruckSelfNum = ''
				this.findTruckName = ''
				this.findTruckPlateNum = ''
				this.findTruckType = ''
			},
			resetPerson() {
				this.findPersonName = ''
			},
			selectDriverItem(data) {
				// if (data.loadStatus == 'Empty') {
				// 	if (data.driverWorkStatus != 'Free') {
				// 		Message.error('该车辆司机工作状态不为空闲！')
				// 		return
				// 	}
				// }
				// if (data.workStatus != 'Free') {
				// 	Message.error('该车辆运输状态不为空闲！')
				// 	return
				// }
				// if (data.loadStatus == 'Full') {
				// 	Message.error('该车辆已经满载！')
				// 	return
				// }
				// if (data.loadStatus == 'NotFull' && this.selectedEscort.staffID) {
				// 	Message.error('该车辆已经有押运人员了！')
				// 	return
				// }
				if (this.selectedDriver.truckID == data.truckID) {
					this.selectedDriver = {}
					return
				}
				this.selectedDriver = data
			},
			selectEscortItem(data) {
				// if (this.selectedDriver.loadStatus == 'NotFull') {
				// 	Message.error('该车辆已经安排押运人员了！')
				// 	return
				// }
				// if (data.workStatus == 'Working') {
				// 	Message.error('该人员已经在工作了！')
				// 	return
				// }
				if (this.selectedEscort.staffID == data.staffID) {
					this.selectedEscort = {}
					return
				}
				this.selectedEscort = data
			},
			getTruckList() {
				let params = {
					current: this.truckPageIndex,
					size: this.truckPageSize,
					code: this.findTruckSelfNum,
					realName: this.findTruckName,
					plateNo: this.findTruckPlateNum,
					truckType: this.findTruckType
				}
				request({
					url: '/transportRecord/selectDriver',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.truckList = res.data.data.records
						this.truckCount = res.data.data.total
					}
				})
			},
			getPersonList() {
				let params = {
					current: this.personPageIndex,
					size: this.personPageSize,
					realName: this.findPersonName
				}
				request({
					url: '/staff/findList',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.personList = res.data.data.records
						this.personCount = res.data.data.total
					}
				})
			},
			back() {
				this.$router.go(-1)
			}
		},
		components: {
			DriverItem,
			EscortItem,
		}
	}
</script>
<style lang="stylus" scoped>
	.step-footer
		margin-top 20px
		text-align center
	.step
		.split-item
			padding 10px 0
			margin-bottom 20px
			border-bottom 1px solid #ebeef5
			.tit
				padding-left 0
</style>