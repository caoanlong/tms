<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">客户</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="客户名称">
						<el-input placeholder="请输入客户名称" v-model="find.keyword"  @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item label="客户编号">
						<el-input placeholder="请输入客户编号" v-model="find.code"  @change="inputChange"></el-input>
					</el-form-item>
                    <el-form-item label="监控类型" class="customerSelect">
						<el-select v-model="find.fencingType" placeholder="请选择"  @change="inputChange">
							<el-option value="" label="全部"></el-option>
							<el-option value="Area" label="区域监控"></el-option>
							<el-option value="Point" label="地址监控"></el-option>
							<el-option value="Mix" label="混合监控"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="客户类型" class="customerSelect">
						<el-select v-model="find.customerType" placeholder="请选择"  @change="inputChange">
                            <el-option value="" label="全部"></el-option>
							<el-option value="Shipper" label="发货方"></el-option>
							<el-option value="Consignee" label="收货方"></el-option>
							<el-option value="Delegate" label="委托方"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="所属片区" class="customerSelect">
						<el-select v-model="find.zone" placeholder="请选择"  @change="inputChange">
                            <el-option value="" label="全部"></el-option>
							<el-option v-for="(item,index) in CustomerZone" :key="index" :value="item.code" :label="item.code"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add" v-if="permissions[$route.name]&&permissions[$route.name]['add']">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del" v-if="permissions[$route.name]&&permissions[$route.name]['delete']">批量删除</el-button>
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
					<el-button type="default" size="mini" icon="el-icon-upload2"  v-if="permissions[$route.name]&&permissions[$route.name]['import']">导入</el-button>
				</el-upload>
				<a :href="exportExcelUrl" download="customer.xlsx" class="exportExcel el-icon-download"  v-if="permissions[$route.name]&&permissions[$route.name]['export']">导出</a>
				<a :href="templateUrl" download="customer.xlsx" class="download-btn"  v-if="permissions[$route.name]&&permissions[$route.name]['import']"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
                    v-loading="loading"
					:data="tableData" @selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="客户名称" min-width="120" :show-overflow-tooltip="true" prop="companyName" align="left"></el-table-column>
					<el-table-column label="客户编号" prop="code" align="center"></el-table-column>
					<el-table-column label="所属片区" min-width="120" :show-overflow-tooltip="true" prop="zone" align="left"></el-table-column>
					<el-table-column label="监控类型" prop="fencingType" align="center">
                        <template slot-scope="scope">
							<span v-if="scope.row.fencingType=='Point'">地址监控</span>
							<span v-if="scope.row.fencingType=='Area'">区域监控</span>
							<span v-if="scope.row.fencingType=='Mix'">混合监控</span>
						</template>
                    </el-table-column>
					<el-table-column label="客户类型"  min-width="120" :show-overflow-tooltip="true" prop="customerType" align="center">
						<template slot-scope="scope">
							{{scope.row.customerType?scope.row.customerType.split(',').map((item) => CUSTOMERTYPE[item]).join(' , '):''}}
						</template>
					</el-table-column>
					<el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
					<el-table-column label="手机" min-width="100" :show-overflow-tooltip="true" prop="contactPhone" align="center"></el-table-column>
					<el-table-column label="监控区域" prop="monitorAreaCount" align="center">
                        <template slot-scope="scope">{{scope.row.monitorAreaCount}}</template>
                    </el-table-column>
					<el-table-column label="监控地址" prop="monitorAreaCount" align="center">
                        <template slot-scope="scope">{{scope.row.customerAddressNum}}</template>
                    </el-table-column>

					<!-- <el-table-column label="TA的地址" prop="customerAddressNum" width="140" align="center">
						<template slot-scope="scope">
							<span :class="{'link': Number(scope.row.customerAddressNum) > 0}" @click="viewAddress(scope.row)">{{scope.row.customerAddressNum + '个地址'}}</span>
						</template>
					</el-table-column> -->
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'address', data: scope.row}">地址</el-dropdown-item>
									<el-dropdown-item :command="{type: 'view', id:scope.row.customerID}"  v-if="permissions[$route.name]&&permissions[$route.name]['detail']">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.customerID}"  v-if="permissions[$route.name]&&permissions[$route.name]['update']">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.customerID}"  v-if="permissions[$route.name]&&permissions[$route.name]['delete']">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
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
import { mapGetters } from 'vuex'
import Company from '../../../api/Company'
import BaseDict from '../../../api/BaseDict'
import { baseMixin } from '../../../common/mixin'
import { baseURL } from '../../../common/request'
import { deleteConfirm } from '../../../common/utils'
export default {
	mixins: [baseMixin],
	data() {
		return {
			uploadHeaders: {'Authorization': localStorage.getItem('token'),'Request-From': 'PC'},
			importFileUrl: baseURL 
				+ '/company/customer/import?Request-From=PC&Authorization=' 
				+ localStorage.getItem("token"),
			exportExcelUrl: '',
			templateUrl: baseURL 
				+ '/base/filetemplate/downLoadTemplate?fileName=customer.xlsx&Request-From=PC&Authorization=' 
				+ localStorage.getItem("token"),
			find: {
				keyword: '',
                customerType: '',
                code:'',
                fencingType:'',
                zone:''
            },
            CustomerZone:[]
		}
	},
	created() {
		this.resetExportExcelUrl()
        this.getList()
        this.getDictList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
    },
    computed: {
        ...mapGetters(['permissions'])
    },
	methods: {
        search() {
			this.pageIndex = this.PAGEINDEX
            this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		reset() {
			this.find.keyword = ''
			this.find.customerType = ''
			this.find.code = ''
			this.find.fencingType = ''
			this.find.zone = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.resetExportExcelUrl()
			this.getList()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.customerID)
		},
		getList() {
            this.loading = true
			Company.customerFind2({
				current: this.pageIndex,
				size: this.pageSize,
				customerType: this.find.customerType,
                keyword: this.find.keyword,
                code:this.find.code,
                zone:this.find.zone,
                fencingType:this.find.fencingType
			}).then(res => {
				this.tableData = res.records
                this.total= res.total
                this.loading = false
			})
        },
        getDictList() {
			BaseDict.getDict({
				groupName:'CustomerZone'
			}).then(res => {
				this.CustomerZone = res.data
			})
		},
		add() { 
			this.$router.push({name: 'addrecdeliverycomp'})
		},
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({name: 'viewrecdeliverycomp', query: { customerID: e.id }})
			} else if (e.type == 'edit') {
				this.$router.push({ name: 'editrecdeliverycomp' , query: {  customerID: e.id } })
			} else if (e.type == 'address') {
				this.$router.push({ 
					name: 'companyaddress', 
					query: { 
						customerID: e.data.customerID,
						companyName: e.data.companyName,
						contactName: e.data.contactName,
						contactPhone: e.data.contactPhone,
						companyAreaID: e.data.companyAreaID
					}
				})
			} else if (e.type == 'delete') {
				this.del(e.id)
			}
		},
		viewAddress(data) {
			this.$router.push({ name: 'companyaddress' , query: {  customerID: data.customerID, companyName: data.companyName,contactName: data.contactName,
						contactPhone: data.contactPhone,
						companyAreaID: data.companyAreaID } })
		},
		del(customerID) {
			deleteConfirm(customerID, customerIDs => {
				Company.customerDeleteBatch({ customerIDs }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			}, this.selectedList)
		},
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/company/customer/export?Request-From=PC&Authorization=' + localStorage.getItem("token") 
				+ '&keyword=' + this.find.keyword
                + '&customerType=' + this.find.customerType
                + '&code=' + this.find.code
                + '&zone=' + this.find.zone
                + '&fencingType=' + this.find.fencingType
		},
		inputChange() {
			this.resetExportExcelUrl()
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