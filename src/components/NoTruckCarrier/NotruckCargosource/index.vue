<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">无车承运人货源列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="报文参考号：">
						<el-input placeholder="报文参考号" v-model="findMessageReferenceNumber"></el-input>
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
				<a :href="templateUrl" download="goodssource.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
				<!-- <button @click="doPrint">打印</button> -->
			</div>
			<div class="table" id="table">
				<!--startprint-->
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="报文参考号" prop="messageReferenceNumber" align="center" width="140"></el-table-column>
					<el-table-column label="发送时间" prop="messageSendingDateTime" align="center" width="120"></el-table-column>
					<el-table-column label="发货人" prop="consignor"></el-table-column>
					<el-table-column label="出发地" prop="placeOfLoading"></el-table-column>
					<el-table-column label="费用总金额" prop="totalMonetaryAmount"></el-table-column>
					<el-table-column label="车辆分类" prop="vehicleClassificationCode"></el-table-column>
					<el-table-column label="货物名称" prop="descriptionOfGoods"></el-table-column>
					<el-table-column label="货物毛重" prop="goodsItemGrossWeight"></el-table-column>
					<el-table-column label="状态" prop="hasFail" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.hasFail==1" style="color:#67C23A">成功</span>
							<span v-else style="color:#F56C6C">失败</span>
						</template>
					</el-table-column>
					<el-table-column label="失败描述" prop="failDescription">
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime"  align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="view(scope.row.goodsId)">查看</el-button>
							<el-button v-if="scope.row.hasFail==0" type="default" size="mini" icon="el-icon-edit" @click="edit(scope.row.goodsId)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!--endprint-->
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseURL } from '../../../common/request'
import NotruckCargosource from '../../../api/NotruckCargosource'
import UploadExcel from '../../CommonComponents/UploadExcel'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			downloadLoading: false,
			importFileUrl: baseURL + '/notruckCargosource/importExcel',
			exportExcelUrl: baseURL + '/notruckCargosource/export',
			templateUrl: baseURL + '/notruckUser/export/excelTemplate?fileName=goodssource.xlsx ',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			findMessageReferenceNumber:''
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		reset() {
			this.findMessageReferenceNumber = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		pageChange() {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		getList() {
			NotruckCargosource.find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				messageReferenceNumber: this.findMessageReferenceNumber
			}).then(res => {
				this.count = res.total
				this.tableData = res.list
			})
		},
		add() {
			this.$router.push({ name: 'addnotruckcargosource' })
		},
		edit(goodsId) {
			this.$router.push({ name: 'editnotruckcargosource', query: { goodsId } })
		},
		view(goodsId) {
			this.$router.push({ name: 'viewnotruckcargosource' , query: { goodsId } })
		},
		// 导入
		uploadSuccess (response) {
			Message.success(response.message)
			this.getList()
		},
		// 上传错误
		uploadError (response) {
			Message.error('response.message')
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
