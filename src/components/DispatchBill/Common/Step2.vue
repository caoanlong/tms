<template>
	<div class="step step2">
		<el-row>
			<div class="split-item">
				<span class="tit">司机及车辆</span>
			</div>
		</el-row>
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="编号">
					<el-input placeholder="编号"></el-input>
				</el-form-item>
				<el-form-item label="司机姓名">
					<el-input placeholder="司机姓名"></el-input>
				</el-form-item>
				<el-form-item label="车牌号">
					<el-input placeholder="车牌号"></el-input>
				</el-form-item>
				<el-form-item label="车型">
					<el-input placeholder="车型"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">搜索</el-button>
					<el-button type="default">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list">
			<DriverItem 
				:isSelected="selectedDriver == item.truckID" 
				:index="index" 
				v-for="(item, index) in truckList" 
				:key="index" 
				:truck="item" 
				@click.native.stop="selectDriverItem(item)" />
		</div>
		<el-row>
			<div class="split-item">
				<span class="tit">随车人员</span>
			</div>
		</el-row>
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="姓名">
					<el-input placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">搜索</el-button>
					<el-button type="default">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list">
			<EscortItem 
				:isSelected="selectedEscort == item.staffID" 
				:index="index" 
				v-for="(item,index) in personList" 
				:key="index" 
				:person="item"
				@click.native.stop="selectEscortItem(item)" />
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
			}
		},
		data() {
			return {
				selectedDriver: '',
				selectedEscort: '',
				truckPageIndex: 1,
				truckPageSize: 10,
				truckCount: 0,
				truckList: [],
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
		methods: {
			prevStep() {
				this.$emit('prevStep', 0)
			},
			nextStep() {
				this.$emit('nextStep', 2)
			},
			selectDriverItem(data) {
				if (data.loadStatus == 'Full') {
					Message.error('该车辆已经满载！')
					return
				}
				if (this.selectedDriver == data.truckID) {
					this.selectedDriver = ''
					return
				}
				this.selectedDriver = data.truckID
			},
			selectEscortItem(data) {
				if (data.workStatus == 'Working') {
					Message.error('该人员已经在工作了！')
					return
				}
				if (this.selectedEscort == data.staffID) {
					this.selectedEscort = ''
					return
				}
				this.selectedEscort = data.staffID
			},
			getTruckList() {
				let params = {
					current: this.truckPageIndex,
					size: this.truckPageSize,
				}
				request({
					url: '/truck/findList',
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