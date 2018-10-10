<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">无车承运人车源列表</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="报文参考号：">
						<el-input  placeholder="报文参考号" v-model="find.messageReferenceNumber" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="单证名称：">
						<el-input  placeholder="单证名称" v-model="find.documentName" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click.native="search">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-upload 
					class="upload-File" 
					name="excel" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess" 
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				</el-upload>
				<a :href="exportExcelUrl" download="goodssource.xlsx" class="exportExcel el-icon-download">导出</a>
				<a :href="templateUrl" download="trucksource.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="报文参考号" prop="messageReferenceNumber"></el-table-column>
					<el-table-column label="单证名称" prop="documentName"></el-table-column>
					<el-table-column label="发送时间" prop="messageSendingDateTime"></el-table-column>
					<el-table-column label="车辆牌照号" prop="vehicleNumber"></el-table-column>
					<el-table-column label="车型代码" prop="vehicleClassificationCode"></el-table-column>
					<el-table-column label="车辆长度" prop="vehicleLength"></el-table-column>
					<el-table-column label="核定载质量" prop="vehicleTonnage"></el-table-column>
					<el-table-column label="出发地" prop="placeOfLoading"></el-table-column>
					<el-table-column label="目的地" prop="goodsReceiptPlace"></el-table-column>
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.hasFail==1" style="color:#67C23A">成功</span>
							<span v-else-if="scope.row.hasFail==-1" style="color:#E6A23C">待处理</span>
							<span v-else style="color:#F56C6C">失败</span>
						</template>
					</el-table-column>
					<el-table-column label="描述" prop="failDescription"></el-table-column>
					<el-table-column label="创建时间" prop="createTime"  align="center"  width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="view(scope.row.truckSourceID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import { baseURL } from '../../../common/request'
import Company from '../../../api/Company'
export default {
	mixins: [baseMixin],
	data() {
		return {
			importFileUrl: baseURL + '/company/notruck/truck/import',
			exportExcelUrl: '',
			templateUrl: baseURL + '/company/notruck/truck/export/excelTemplate?fileName=trucksource.xlsx ',
			find: {
				messageReferenceNumber: '',
				documentName: ''
			}
		}
	},
	created() {
		this.resetExportExcelUrl()
		this.getList()
	},
	methods: {
		reset() {
			this.find.messageReferenceNumber = ''
			this.find.documentName = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/company/notruck/truck/export?Authorization=' + localStorage.getItem("token") 
				+ '&messageReferenceNumber=' + this.find.messageReferenceNumber
				+ '&documentName=' + this.find.documentName
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		getList() {
			Company.notruckTruck().find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				messageReferenceNumber: this.find.messageReferenceNumber,
				documentName: this.find.documentName
			}).then(res => {
				this.total = res.total
				this.tableData = res.records
			})
		},
		add() {
			this.$router.push({ name: 'addnotrucktruck'})
		},
		view(truckSourceID) {
			this.$router.push({ name: 'viewnotrucktruck', query: { truckSourceID }})
		},
		// 导入成功
		uploadSuccess (response) {
			Message.success(response.message)
			this.getList()
		}
	}
}	
</script>
<style lang="stylus" scoped>
.download-btn
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
.upload-File
	display inline-block
	margin 0 10px
</style>