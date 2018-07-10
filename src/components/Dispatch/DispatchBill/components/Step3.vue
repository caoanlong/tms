<template>
	<div class="step step3">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="编号/姓名/车牌号/车长/车型" v-model="find.keyword"></el-input>
				</el-form-item>
				<el-form-item label="装车日期">
					<el-date-picker 
						:editable="false"
						style="width: 100%" 
						v-model="find.shipperDate"
						type="date"
						value-format="timestamp"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="车辆状态">
					<el-select placeholder="全部" v-model="find.workStatus">
						<el-option label="全部" value=""></el-option>
						<el-option label="空闲" value="Free"></el-option>
						<el-option label="工作中" value="Working"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList">搜索</el-button>
					<el-button type="default" @click="reset">重置</el-button>
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
		<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
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
import Dispatchbill from '../../../../api/Dispatchbill'
import Staff from '../../../../api/Staff'
import TruckItem from './TruckItem'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			find: {
				keyword: '',
				shipperDate: new Date().getTime(),
				workStatus: ''
			},
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			truck: []
		}
	},
	computed: {
		...mapGetters(['selectedDriver', 'selectedStaff'])
	},
	components: {
		TruckItem, Page
	},
	created() {
		this.getList()
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
			if (this.truck.selected.truckID == data.truckID) {
				this.truck.selected = {}
				return
			}
			this.truck.selected = data
			this.$store.dispatch('setDriver', data)
		},
		selectEscortItem(data) {
			if (this.person.selected.staffID == data.staffID) {
				this.person.selected = {}
				return
			}
			this.person.selected = data
			this.$store.dispatch('setStaff', data)
		},
		reset() {
			this.find.keyword = ''
			this.find.shipperDate = new Date().getTime()
			this.find.workStatus = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		getList() {
			if (!this.find.shipperDate) {
				Message.error('装车时间必填！')
				return
			}
			Dispatchbill.findTrucks({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				workStatus: this.find.workStatus,
				shipperDate: this.find.shipperDate
			}).then(res => {
				this.truck = res
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>
	.step-footer
		margin-top 20px
		text-align center
	.tableList
		width 100%
		padding-bottom 10px
		overflow hidden
		overflow-x auto
		.tit
			min-width 1210px
			display flex
			background #fff
			border 1px solid #f0f0f0
			.truckColumn
			.driverColumn
			.escortColumn
				flex 1
				text-align center
				font-size 14px
				color #999
				height 40px
				line-height 20px
				padding 10px
				min-width 380px
				border-left 1px solid #f0f0f0
			.selectColumn
				flex 0 0 70px
				text-align center
				font-size 14px
				color #999
				padding 0
				line-height 40px
				width 70px
			span
				color #f00
			
</style>