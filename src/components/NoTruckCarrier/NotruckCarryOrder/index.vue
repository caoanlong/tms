<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">无车承运人运单列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="托运单号：">
						<el-input placeholder="托运单号" v-model="find.shippingNoteNumber" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="承运人：">
						<el-input placeholder="承运人" v-model="find.carrier" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click="search">查询</el-button>
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
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import { baseURL } from '../../../common/request'
import NotruckCarryOrder from '../../../api/NotruckCarryOrder'
export default {
	mixins: [baseMixin],
	data() {
		return {
			importFileUrl: baseURL +'/notruck/carryOrder/import',
			exportExcelUrl: '',
			templateUrl: baseURL + '/notruckUser/export/excelTemplate?fileName=waybill.xlsx ',
			find: {
				shippingNoteNumber: '',
				carrier: ''
			}
		}
	},
	created() {
		this.resetExportExcelUrl()
		this.getList()
	},
	methods: {
		reset() {
			this.find.shippingNoteNumber = ''
			this.find.carrier = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/notruck/carryOrder/export?Authorization=' + localStorage.getItem("token") 
				+ '&shippingNoteNumber=' + this.find.shippingNoteNumber
				+ '&carrier=' + this.find.carrier
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		getList() {
			NotruckCarryOrder.find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				shippingNoteNumber: this.find.shippingNoteNumber,
				carrier: this.find.carrier
			}).then(res => {
				this.total = res.total
				this.tableData = res.list
			})
		},
		add() {
			this.$router.push({ name: 'addnotruckcarryorder'})
		},
		edit(wayId) {
			this.$router.push({ name: 'editnotruckcarryorder', query: { wayId }})
		},
		view(wayId) {
			this.$router.push({ name: 'viewnotruckcarryorder', query: { wayId }})
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