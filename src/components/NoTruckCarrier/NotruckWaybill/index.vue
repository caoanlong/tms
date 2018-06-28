<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>无车承运人运单列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="托运单号：">
						<el-input placeholder="托运单号" v-model="findShippingNoteNumber"></el-input>
					</el-form-item>
					<el-form-item label="承运人：">
						<el-input placeholder="承运人" v-model="findCarrier"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
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
				<a :href="templateUrl" download="waybill.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="托运单号" prop="shippingNoteNumber"></el-table-column>
					<el-table-column label="承运人" align="center" prop="carrier"></el-table-column>
					<el-table-column label="托运时间" prop="dteOfShipment" align="center"></el-table-column>
					<el-table-column label="实际发运时间" width="140" prop="dateActualShipment" align="center"></el-table-column>
					<el-table-column label="收货时间" prop="dateOfDelivery" align="center"></el-table-column>
					<el-table-column label="发货人" prop="consignor" align="center"></el-table-column>
					<el-table-column label="装货地点" prop="loadingPlace"></el-table-column>
					<el-table-column label="收货人" prop="consignee" align="center"></el-table-column>
					<el-table-column label="状态" prop="hasFail"></el-table-column>
					<el-table-column label="错误描述" prop="failDescription"></el-table-column>
					<el-table-column label="创建时间" prop="createTime"  align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150" align="center">
						<template slot-scope="scope">
								<el-button type="default" size="mini" icon="el-icon-view" @click="view(scope.row.wayId)">查看</el-button>
								<el-button type="default" size="mini" icon="el-icon-edit" @click="edit(scope.row.wayId)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseURL } from '../../../common/request'
import NotruckWaybill from '../../../api/NotruckWaybill'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			downloadLoading: false,
			importFileUrl: baseURL +'/notruckWaybill/importExcel',
			exportExcelUrl: baseURL + '/notruckWaybill/export',
			templateUrl: baseURL + '/notruckUser/export/excelTemplate?fileName=waybill.xlsx ',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			refreshing: false,
			findShippingNoteNumber:'',
			findCarrier:''
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.findShippingNoteNumber = ''
			this.findCarrier = ''
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
			NotruckWaybill.find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				shippingNoteNumber: this.findShippingNoteNumber,
				carrier: this.findCarrier
			}).then(res => {
				this.count = res.total
				this.tableData = res.list
			})
		},
		add() {
			this.$router.push({ name: 'addnotruckwaybill'})
		},
		edit(wayId) {
			this.$router.push({ name: 'editnotruckwaybill', query: { wayId }})
		},
		view(wayId) {
			this.$router.push({ name: 'viewnotruckwaybill', query: { wayId }})
		},
		// 导入成功
		uploadSuccess (response) {
			Message.success(response.message)
			this.getList()
		},
		// 导入失败
		uploadError (response) {
			Message.error(response.message)
		},
		beforeFileUpload (file) {
			const extension = file.name.split('.')[1] === 'xls'
			const extension2 = file.name.split('.')[1] === 'xlsx'
			const isLt2M = file.size / 1024 / 1024 < 10
			if (!extension && !extension2) {
				Message.error('上传模板只能是 xls、xlsx格式!')
			}
			if (!isLt2M) {
				Message.error('上传模板大小不能超过 10MB!')
			}
			return extension || extension2 && isLt2M
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