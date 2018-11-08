<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="posr clearfix">运费模板</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findShipperCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="发货地">
						<el-input placeholder="请输入..." v-model="findShipperArea"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findConsigneeCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="收货地">
						<el-input placeholder="请输入..." v-model="findConsigneeArea"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-upload 
					class="upload-File" 
					name="excelFile" 
					:action="importFileUrl" 
					:auto-upload="true" 
					:onError="uploadError" 
					:onSuccess="uploadSuccess" 
					:beforeUpload="beforeFileUpload" 
					:headers="uploadHeaders" 
					:show-file-list="false">
					<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				</el-upload>
				<!-- <FileUpload class="upload-File" name="excelFile" url="/transportPrice/upload"/> -->
				<a :href="templateUrl" :download="templateTit" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="发货地" prop="shipperArea" width="100"></el-table-column>
					<el-table-column label="发货详细地址" prop="shipperDetailAddress" width="100"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="收货地" prop="consigneeArea" width="100"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress" width="100"></el-table-column>
					<el-table-column label="对内运距" prop="mileage"></el-table-column>
					<el-table-column label="对内运价" prop="internalPrice"></el-table-column>
					<el-table-column label="对内TKM" prop="internalUnitPrice"></el-table-column>
					<el-table-column label="对外运距" prop="externalMileage"></el-table-column>
					<el-table-column label="对外运价" prop="externalPrice"></el-table-column>
					<el-table-column label="对外TKM" prop="externalUnitPrice"></el-table-column>
					<el-table-column label="对内月结比率" prop="internalAbschlussRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.internalAbschlussRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内现付比率" prop="internalCashRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.internalCashRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内到付比率" prop="internalCodRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.internalCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内收货方到付比率" prop="internalConsigneeCodRate" width="140">
						<template slot-scope="scope">
							{{(scope.row.internalConsigneeCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对内回单比率" prop="internalPorRate" width="140">
						<template slot-scope="scope">
							{{(scope.row.internalPorRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外月结比率" prop="externalAbschlussRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.externalAbschlussRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外现付比率" prop="externalCashRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.externalCashRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外到付比率" prop="externalCodRate" width="100">
						<template slot-scope="scope">
							{{(scope.row.externalCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外收货方到付比率" prop="externalConsigneeCodRate" width="140">
						<template slot-scope="scope">
							{{(scope.row.externalConsigneeCodRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column label="对外回单比率" prop="externalPorRate" width="140">
						<template slot-scope="scope">
							{{(scope.row.externalPorRate)*100+'%'}}
						</template>
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.transporPriceID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.transporPriceID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.transporPriceID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request, { baseURL } from '../../../common/request'
import SettleConfig from '../../../api/SettleConfig'
import { deleteConfirm } from '../../../common/utils'
import FileUpload from '../../CommonComponents/FileUpload'
import Page from '../../CommonComponents/Page'
import { baseMixin } from '../../../common/mixin';
export default {
	mixins: [baseMixin],
	data() {
		return {
			findConsigneeArea: '',
			findConsigneeCompanyName: '',
			findShipperArea: '',
			findShipperCompanyName: '',
			importFileUrl: baseURL + '/transportPrice/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=freight.xlsx&&Authorization=' +localStorage.getItem("token"),
			templateTit:'freight.xlsx'
		}
	},
	components: {
		FileUpload, Page
	},
	created() {
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.findConsigneeArea = ''
			this.findConsigneeCompanyName = ''
			this.findShipperArea = ''
			this.findShipperCompanyName = ''
			this.getList()
		}
	},
	methods: {
		// 导入
		uploadSuccess (response) {
			if (response.code != 200) {
				Message.error(response.msg)
			} else {
				Message.success(response.msg)
				this.getList()
			}
		},
		// 上传错误
		uploadError (response) {
			Message.error(response.msg)
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
		},
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		reset() {
			this.findConsigneeArea = ''
			this.findConsigneeCompanyName = ''
			this.findShipperArea = ''
			this.findShipperCompanyName = ''
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
		selectionChange(data) {
			this.selectedList = data.map(item => item.transporPriceID)
		},
		getList() {
			SettleConfig.find({
				current: this.pageIndex,
				size: this.pageSize,
				consigneeArea: this.findConsigneeArea,
				consigneeCompanyName: this.findConsigneeCompanyName,
				shipperArea: this.findShipperArea,
				shipperCompanyName: this.findShipperCompanyName
			}).then(res => {
				this.tableData = res.records
				this.count = res.total
			})
		},
		handleCommand(e) {
			if(e.type == 'view'){
				this.$router.push({name: 'viewsettleconfig', query: { transporPriceID: e.id }})
			} else if(e.type == 'edit'){
				this.$router.push({ name: 'editsettleconfig' , query: { transporPriceID: e.id }})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		add() {
			this.$router.push({name: 'addsettleconfig'})
		},
		del(transporPriceID) {
			deleteConfirm(transporPriceID, transporPriceIDs => {
				SettleConfig.del({ transporPriceIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			}, this.selectedList)
		}
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
</style>