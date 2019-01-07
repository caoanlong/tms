<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">车辆列表</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small" :model="find" :rules="rules" ref="ruleForm">
					<el-form-item label="司机">
						<el-input placeholder="姓名/手机号" v-model="find.keyword" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="车辆">
						<el-input placeholder="车牌号" v-model="find.plateNo" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="APP最后上线">
						<el-select placeholder="请选择" v-model="find.latestStartupDay" @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="7" label="7天前"></el-option>
							<el-option value="15" label="15天前"></el-option>
							<el-option value="30" label="一个月以前"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="业务状态">
						<el-select placeholder="请选择" v-model="find.workStatus" @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="Working" label="运输中"></el-option>
							<el-option value="Free" label="空闲中"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="GPS终端号">
						<el-input placeholder="请输入终端号" v-model="find.deviceNumber" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="安装GPS">
						<el-select placeholder="请选择" v-model="find.gpsFlag" @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="Y" label="已安装"></el-option>
							<el-option value="N" label="未安装"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="exportExcelUrl" class="exportExcel el-icon-download">导出</a>
                <el-button type="default" size="mini" icon="el-icon-refresh" @click="checkGPS">刷新GPS</el-button>
			</div>
			<div class="table">
				<el-table
					ref="recTable"
					:data="tableData"
					border style="width: 100%" size="mini" stripe>

					<el-table-column label="编号" align="center" width="180">
						<template slot-scope="scope">{{scope.$index+1}}</template>
					</el-table-column>
					<el-table-column label="手机号" prop="mobile" align="center" width='140'>
						<template slot-scope="scope">
							<router-link 
								tag="span" 
								class="link" 
								:to="{name: 'viewtruck', query: {truckID: scope.row.truckID}}">
								{{scope.row.mobile}}
							</router-link>
						</template>
					</el-table-column>
					<el-table-column label="姓名" prop="realName" align="center"  width='140'></el-table-column>
					<el-table-column label="APP最后上线" prop="mobile" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.latestStartup">
								{{moment(scope.row.latestStartup).format('YYYY-MM-DD hh:mm:ss')}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="当前车辆" prop="plateNo" align="center" width='180'></el-table-column>
					<el-table-column label="车长/车型" align="center" width='180'>
						<!-- <template slot-scope="scope">{{TRUCKTYPE[scope.row.truckType]}}</template> -->
						<template slot-scope="scope">
							{{[
								scope.row.length ? scope.row.length + '米' : null, 
								scope.row.type
							].filter(item => item).join('/')}}
						</template>
					</el-table-column>

					<el-table-column label="安装GPS" align="center" width='80'>
						<template slot-scope="scope">{{scope.row.gpsFlag == 'Y' ? '已安装' : '未安装'}}</template>
					</el-table-column>
					<el-table-column label="便携终端号" prop="deviceNumber" align="center"></el-table-column>

					<el-table-column label="业务状态" prop="workStatus" align="center"  width='100'>
						<template slot-scope="scope">
							<el-tag size="mini" type="success" v-if="scope.row.workStatus == 'Free'">空闲中</el-tag>
							<el-tag size="mini" type="warning" v-else-if="scope.row.workStatus == 'Working'">运输中</el-tag>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseURL } from '../../../common/request'
import { deleteConfirm } from '../../../common/utils'
import Company from '../../../api/Company'
import { baseMixin } from '../../../common/mixin'
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
				keyword: '',
				plateNo: '',
				latestStartupDay: '',
				workStatus: '',
				deviceNumber: '',
				gpsFlag: ''
			},
			rules: {
				plateNo: [ {min: 1, max: 20, message: '长度在 1 到 20 个字符'} ]
			},
			exportExcelUrl: ''
		}
	},
	created() {
		this.resetExportExcelUrl()
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	methods: {
		inputChange() {
			this.resetExportExcelUrl()
		},
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/company/truck/export?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token")	
				+ '&keyword=' + this.find.keyword 
				+ '&plateNo=' + this.find.plateNo 
				+ '&latestStartupDay=' + this.find.latestStartupDay 
				+ '&workStatus=' + this.find.workStatus 
				+ '&deviceNumber=' + this.find.deviceNumber 
				+ '&gpsFlag=' + this.find.gpsFlag 
		},
		reset() {
			this.find.keyword = ''
			this.find.plateNo = ''
			this.find.latestStartupDay = ''
			this.find.workStatus = ''
			this.find.deviceNumber = ''
			this.find.gpsFlag = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.resetExportExcelUrl()
			this.getList()
		},
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.$refs['ruleForm'].validate(valid => {
				if (valid) this.getList()
			})
		},
		getList() {
			Company.truckFind({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				plateNo: this.find.plateNo,
				latestStartupDay: this.find.latestStartupDay,
				workStatus: this.find.workStatus,
				deviceNumber: this.find.deviceNumber,
				gpsFlag: this.find.gpsFlag
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
		},
        checkGPS(){
            const plateNos = this.tableData.map(item => item.plateNo).join(',')
            Company.truckCheckGPS({ plateNos }).then(res => {
                this.getList()
			})
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
		width 240px
	.mobile
		width 140px
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-right 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>