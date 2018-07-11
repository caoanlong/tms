<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">车辆列表</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small" :model="find" :rules="rules" ref="ruleForm">
					<el-form-item label="车辆">
						<el-input placeholder="请输入车牌号" v-model="find.plateNo"></el-input>
					</el-form-item>
					<el-form-item label="司机">
						<el-input placeholder="请输入姓名或手机号" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
			</div>
			<div class="listTable">
			<div class="driverList">
				<div class="tableTit">
					<div class="truck fl">车辆</div>
					<div class="otherInfo fr">
						<div class="driver fl">驾驶员</div>
						<div class="mobile fl">电话</div>
						<div class="handle fl">操作</div>
					</div>
				</div>
				<TruckItem v-for="(truck, index) in tableData" :key="index" :truck="truck" @refresh="refresh"></TruckItem>
			</div>
			</div>
			<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { deleteConfirm } from '../../../common/utils'
import Truck from '../../../api/Truck'
import Page from '../../CommonComponents/Page'
import TruckItem from '../components/TruckItem'
export default {
	data() {
		return {
			find: {
				keyword: '',
				plateNo: ''
			},
			startDate: '',
			endDate: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			selectedList: [],
			rules: {
				plateNo: [ {min: 1, max: 20, message: '长度在 1 到 20 个字符'} ]
			}
		}
	},
	components: { Page, TruckItem },
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.find.plateNo = ''
			this.find.keyword = ''
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
		selectionChange(data) {
			this.selectedList = data.map(item => item.truckID)
		},
		selectDateRange(date) {
			this.startDate = date[0]
			this.endDate = date[1]
		},
		search() {
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					this.getList()
				}
			})
		},
		getList() {
			Truck.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				plateNo: this.find.plateNo
			}).then(res => {
				this.tableData = res.records
				this.count = res.total
			})
		},
		handleCommand(e) {
			if(e.type == 'view'){
				this.$router.push({name: 'viewtruck', query: { truckID: e.id }})
			} else if(e.type == 'edit'){
				this.$router.push({ name: 'edittruck' , query: { truckID: e.id }})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		add() {
			this.$router.push({name: 'addtruck'})
		},
		del(truckID) {
			deleteConfirm(truckID, truckIDs => {
				Truck.del({ truckIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			}, this.selectedList)
		},
		refresh() {
			this.getList()
		}
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
.listTable
	overflow-x auto
.driverList
	min-width 900px
	.tableTit
		color #909399
		height 38px
		line-height 36px
		text-align center
		position relative
		font-size 14px
		font-weight bold
		margin-bottom 10px
		border 1px solid #ebeef5
		.driver
		.mobile
		.handle
			border-left 1px solid #ebeef5
	.truck
		min-width 380px
	.handle
		width 180px
	.driver
		width 200px
	.mobile
		width 140px
</style>