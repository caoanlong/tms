<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">操作日志</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
                    <el-form-item label="权限组织">
						<el-input placeholder="请输入..." v-model="find.organizationName" @change="inputChange">                          
						</el-input>
					</el-form-item>
                    <el-form-item label="操作界面">
                        <el-input placeholder="请输入..." v-model="find.menuPath" @change="inputChange">                          
						</el-input>
					</el-form-item>
					<el-form-item label="操作人员">
						<el-input placeholder="请输入账号或者操作人" v-model="find.keyword"></el-input>
					</el-form-item>
                    <el-form-item label="状态">
                        <!-- Succeed 成功  Failed 失败 -->
						<el-select placeholder="请选择" v-model="find.status" @change="inputChange">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="成功" value="Succeed"></el-option>
                            <el-option label="失败" value="Failed"></el-option>
                        </el-select>
					</el-form-item>
                    <el-form-item label="操作时间">
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px"
                            v-model="find.beginCreateDate"
							@change="inputChange">
						</el-date-picker>
						<span class="tracto">至</span>
						<el-date-picker 
							type="date" 
							:clearable="false" 
							value-format="timestamp" 
							style="width:160px"
                            v-model="find.endCreateDate"
							@change="inputChange">
						</el-date-picker>
                    </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="exportExcelUrl" download="tms_log_export.xlsx" class="exportExcel el-icon-download" v-if="permissions[$route.name]&&permissions[$route.name]['export']">导出</a>
			</div>
			<div class="table">
				<el-table ref="roleTable" :data="tableData" v-loading="loading" border style="width: 100%" size="mini">
					<!-- <el-table-column label="日志编号" prop="logApiID" align="center"></el-table-column> -->
					<el-table-column label="权限组织" min-width="100" :show-overflow-tooltip="true" prop="organizationName" align="center"></el-table-column>
					<el-table-column label="操作界面" min-width="120" :show-overflow-tooltip="true" prop="menuPath" align="center"></el-table-column>
					<el-table-column label="账号" min-width="120" :show-overflow-tooltip="true" prop="mobile" align="center"></el-table-column>
					<el-table-column label="操作人" prop="username" align="center"></el-table-column>
					<el-table-column label="主机" prop="ip" align="center"></el-table-column>
					<el-table-column label="操作地址" prop="ipToAddress" align="center"></el-table-column>
					<el-table-column label="状态" prop="status" align="center">
                        <!-- Succeed 成功  Failed 失败 -->
                        <template slot-scope="scope">
                            <el-tag size="mini" type="success" v-if="scope.row.status=='Succeed'">成功</el-tag>
                            <el-tag size="mini" type="info" v-if="scope.row.status=='Failed'">失败</el-tag>
						</template>
                    </el-table-column>
					<el-table-column label="操作时间" min-width="120" :show-overflow-tooltip="true" prop="createDate" align="center">
                        <template slot-scope="scope">
							<span>{{moment(scope.row.createDate).format('YYYY-MM-DD HH:mm:ss')}}</span>
						</template>
                    </el-table-column>
					<el-table-column width="100" align="center" label="操作" fixed="right" v-if="permissions[$route.name]&&permissions[$route.name]['detail']">
						<template slot-scope="scope" >
							<el-button type="primary" size="mini"  @click="view(scope.row.logApiID)"><i class="el-icon-search"></i> 详情</el-button>
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
import request, { baseURL } from '../../../common/request'
import Log from '../../../api/Log'
import { baseMixin } from '../../../common/mixin'
import { getDateTotimestamp } from "../../../common/utils"
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
                organizationName:'',
                menuPath:'',
                keyword:'',
                status:'',
                beginCreateDate: this.getCurrentMonthFirst(),
                endCreateDate: this.getCurrentMonthLast()
            },
            exportExcelUrl:''
		}
	},
	created() {
        this.resetExportExcelUrl()
        this.getCurrentMonthFirst()
        this.getCurrentMonthLast()
		this.getList()
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
        getCurrentMonthFirst(){
            let date =new Date()
            date.setDate(1)
            return getDateTotimestamp(date)
        },
        getCurrentMonthLast(){
            let date=new Date()
            let currentMonth=date.getMonth()
            let nextMonth=++currentMonth
            let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1)
            let oneDay=1000*60*60*24
            return getDateTotimestamp(new Date(nextMonthFirstDay-oneDay))
		},
        search() {
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		reset() {
            for(const key in this.find){
                this.find[key] = ''
            }
			this.pageIndex = this.PAGEINDEX
            this.pageSize = this.PAGESIZE
            this.find.beginCreateDate = this.getCurrentMonthFirst()
            this.find.endCreateDate = this.getCurrentMonthLast()
			this.resetExportExcelUrl()
			this.getList()
        },
        resetExportExcelUrl() {
			this.exportExcelUrl = baseURL + '/log/api/export?Request-From=PC&Authorization=' 
			+ localStorage.getItem("token")
			+ '&organizationName=' + this.find.organizationName
			+ '&menuPath=' + this.find.menuPath 
			+ '&keyword=' + this.find.keyword
			+ '&status=' + this.find.status
			+ '&beginCreateDate=' + this.find.beginCreateDate 
			+ '&endCreateDate=' + this.find.endCreateDate
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		getList() {
            this.loading = true
			Log.find({
				current: this.pageIndex,
				size: this.pageSize,
				organizationName:this.find.organizationName,
                menuPath:this.find.menuPath ,
                keyword:this.find.keyword,
                status:this.find.status,
                beginCreateDate:this.find.beginCreateDate ,
                endCreateDate:this.find.endCreateDate
			}).then(res => {
				this.tableData = res.records
                this.total= res.total
                this.loading = false
			})
        },
        view(logApiID) {
			this.$router.push({ name: 'viewlogs' , query: { logApiID } })
		},
	}
}
</script>
<style lang="stylus" scoped>
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