<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">无车承运人货源列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="报文参考号：">
						<el-input placeholder="报文参考号" v-model="find.messageReferenceNumber" @change="inputChange"></el-input>
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
			</div>
			<div class="table" id="table">
				<!--startprint-->
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="报文参考号" prop="messageReferenceNumber" align="center" width="140"></el-table-column>
					<el-table-column label="发送时间" prop="messageSendingDateTime" align="center" width="120"></el-table-column>
					<el-table-column label="发货人" prop="consignor"></el-table-column>
					<el-table-column label="出发地" prop="placeOfLoading"></el-table-column>
					<el-table-column label="费用总金额" prop="totalMonetaryAmount"></el-table-column>
					<el-table-column label="车辆分类代码" prop="vehicleClassificationCode"></el-table-column>
					<el-table-column label="货物名称" prop="descriptionOfGoods"></el-table-column>
					<el-table-column label="货物毛重" prop="goodsItemGrossWeight"></el-table-column>
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.hasFail==1" style="color:#67C23A">成功</span>
							<span v-else-if="scope.row.hasFail==-1" style="color:#E6A23C">待处理</span>
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
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="view(scope.row.cargoSourceID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!--endprint-->
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
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			importFileUrl: baseURL + '/company/notruck/cargoSource/import',
			exportExcelUrl:baseURL + '/company/notruck/cargoSource/export/excelTemplate?fileName=goodssource.xlsx ',
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=goodssource.xlsx&Authorization=' + localStorage.getItem("token"),
			find: {
				messageReferenceNumber: ''
			}
		}
	},
	created() {
		this.find = JSON.parse(sessionStorage.getItem('notruckCargoSourceFind')) || {}
		this.resetExportExcelUrl()
		this.getList()
	},
	methods: {
		search() {
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			sessionStorage.setItem('notruckCargoSourceFind', JSON.stringify(this.find))
			this.resetExportExcelUrl()
			this.getList()
		},
		reset() {
			sessionStorage.removeItem('notruckCargoSourceFind')
			this.find.messageReferenceNumber = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/company/notruck/cargoSource/export?Authorization=' + localStorage.getItem("token") 
				+ '&messageReferenceNumber=' + this.find.messageReferenceNumber
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		getList() {
			Company.notruckCargoSource().find({
				current: this.pageIndex,
				size: this.pageSize,
				messageReferenceNumber: this.find.messageReferenceNumber
			}).then(res => {
				this.total = res.total
				this.tableData = res.records
			})
		},
		add() {
			this.$router.push({ name: 'addnotruckcargosource' })
		},
		view(cargoSourceID) {
			this.$router.push({ name: 'viewnotruckcargosource' , query: { cargoSourceID } })
		},
		// 导入成功
		uploadSuccess (response) {
			if(response.code != 200){
				Message.error(response.msg)
			} else{
				Message.success(response.msg)
				this.getList()
			}
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
