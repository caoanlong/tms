<template>
	<div class="step step3">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="编号/姓名/车牌号/车长/车型" v-model="truck.keywords"></el-input>
				</el-form-item>
				<el-form-item label="装车日期">
					<el-date-picker 
						:editable="false"
						style="width: 100%" 
						v-model="truck.shipperDate"
						type="date"
						value-format="timestamp"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="车辆状态">
					<el-select placeholder="全部" v-model="truck.workStatus">
						<el-option label="全部" value=""></el-option>
						<el-option label="空闲" value="Free"></el-option>
						<el-option label="工作中" value="Working"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getTruckList">搜索</el-button>
					<el-button type="default" @click="resetTruck">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="tableList">
			<div class="tit">
				<div class="selectColumn">选择</div>
				<div class="truckColumn">车辆<span>*</span></div>
				<div class="driverColumn">驾驶员<span>*</span></div>
				<div class="escortColumn">随行人员</div>
			</div>
			<TruckItem></TruckItem>
		</div>
		<!-- <Page :total="truck.count" :pageSize="truck.pageSize" @pageChange="truckPageChange" @pageSizeChange="truckPageSizeChange"/> -->
		<div class="step-footer">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">取消</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import TransportRecord from '../../../../api/TransportRecord'
import Dispatchbill from '../../../../api/Dispatchbill'
import Staff from '../../../../api/Staff'
import TruckItem from './TruckItem'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			truck: {
				count: 0,
				pageSize: 10,
				pageIndex: 1,
				selected: {},
				keywords: '',
				shipperDate: new Date().getTime(),
				workStatus: 'Free',
				list: []
			},
			person: {
				count: 0,
				pageSize: 10,
				pageIndex: 1,
				selected: {},
				keywords: '',
				shipperDate: new Date().getTime(),
				workStatus: 'Free',
				list: []
			}
		}
	},
	computed: {
		...mapGetters(['selectedDriver', 'selectedStaff'])
	},
	created() {
		this.getTruckList()
		this.getPersonList()
	},
	methods: {
		prevStep() {
			this.$emit('prevStep', 2)
		},
		nextStep() {
			if (!this.truck.selected.truckID) {
				Message.error('请选择司机车辆！')
				return
			}
			if(!this.person.selected.staffID) {
				Message.error('请选择随车人员！')
				return
			}
			this.$emit('nextStep', 4)
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
			if (this.truck.selected.truckID == data.truckID) {
				this.truck.selected = {}
				return
			}
			this.truck.selected = data
			this.$store.dispatch('setDriver', data)
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
			if (this.person.selected.staffID == data.staffID) {
				this.person.selected = {}
				return
			}
			this.person.selected = data
			this.$store.dispatch('setStaff', data)
		},
		resetTruck() {
			this.truck.keywords = ''
			this.truck.shipperDate = new Date().getTime()
			this.truck.workStatus = ''
			this.person.pageIndex = 1
			this.getTruckList()
		},
		truckPageChange(index) {
			this.truck.pageIndex = index
			this.getTruckList()
		},
		truckPageSizeChange(size) {
			this.truck.pageSize = size
			this.getTruckList() 
		},
		resetPerson() {
			this.person.keywords = ''
			this.person.shipperDate = new Date().getTime()
			this.person.workStatus = ''
			this.person.pageIndex = 1
			this.getPersonList()
		},
		personPageChange(index) {
			this.person.pageIndex = index
			this.getPersonList()
		},
		personPageSizeChange(size) {
			this.person.pageSize = size
			this.getPersonList() 
		},
		getTruckList() {
			if (!this.truck.shipperDate) {
				Message.error('装车时间必填！')
				return
			}
			let params = {
				current: this.truck.pageIndex,
				size: this.truck.pageSize,
				keyword: this.truck.keywords,
				workStatus: this.truck.workStatus,
				shipperDate: this.truck.shipperDate
			}
			Dispatchbill.findTrucksAndDrivers(params).then(res => {
				this.truck.list = res
			})
		},
		getPersonList() {
			if (!this.person.shipperDate) {
				Message.error('装车时间必填！')
				return
			}
			let params = {
				current: this.person.pageIndex,
				size: this.person.pageSize,
				keyword: this.person.keywords,
				workStatus: this.person.workStatus,
				shipperDate: this.person.shipperDate
			}
			Dispatchbill.findTruckstaffs(params).then(res => {
				this.person.list = res
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		TruckItem,
		Page
	}
}
</script>
<style lang="stylus" scoped>
	.step-footer
		margin-top 20px
		text-align center
	.tableList
		.tit
			display flex
			background #f0f0f0
			border 1px solid #f0f0f0
			div
				flex 1
				text-align center
				font-size 14px
				color #999
				height 40px
				line-height 20px
				padding 10px
				&.selectColumn
					flex 0 0 70px
					padding 0
					line-height 40px
				span
					color #f00
			
</style>