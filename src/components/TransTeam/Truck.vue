<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">车辆</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small" :model="find" :rules="rules" ref="ruleForm">
					<el-form-item label="车辆" prop="plateNo">
						<el-input placeholder="请输入车牌号" v-model="find.plateNo"></el-input>
					</el-form-item>
					<el-form-item label="司机" prop="code">
						<el-input placeholder="请输入姓名或手机号" v-model="find.code"></el-input>
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
				<a :href="templateUrl" :download="templateTit" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a>
			</div>
			<div class="driverList">
				<div class="tableTit">
					<div class="truckInfo">
						车辆
					</div>
					<div class="driver">
						驾驶员
					</div>
					<div class="mobile">
						电话
					</div>
					<div class="handle">
						操作
					</div>

				</div>
				<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import { baseURL } from '../../common/request'
import { deleteConfirm } from '../../common/utils'
import Truck from '../../api/Truck'
import Page from '../CommonComponents/Page'
import { limitLength20, checkInt2 } from '../../common/validators'
export default {
	data() {
		return {
			find: {
				high: '',
				length: '',
				plateNo: '',
				code: '',
				width: '',
				tractiveTonnage: '',
				date: [],
			},
			startDate: '',
			endDate: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			selectedList: [],
			importFileUrl: baseURL + '/truck/upload',
			uploadHeaders: {'Authorization': localStorage.getItem('token')},
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=vehicleInfo.xlsx&Authorization=' + localStorage.getItem('token'),
			templateTit: 'vehicleInfo.xlsx',
			rules: {
				plateNo: [
					{ validator: limitLength20 }
				],
				code: [
					{ validator: limitLength20 }
				],
				tractiveTonnage: [
					{ validator: checkInt2 },
					{ validator: limitLength20 }
				]
			}
		}
	},
	computed: {
		...mapGetters([
			'token'
		])
	},
	components: {
		Page
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.find.high = ''
			this.find.length = ''
			this.find.plateNo = ''
			this.find.code = ''
			this.find.width = ''
			this.find.tractiveTonnage = ''
			this.find.date = []
			this.startDate = ''
			this.endDate = ''
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
			console.log(response)
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
		getList() {
			Truck.find({
				current: this.pageIndex,
				size: this.pageSize,
				high: this.find.high,
				length: this.find.length,
				plateNo: this.find.plateNo,
				code: this.find.code,
				width: this.find.width,
				tractiveTonnage: this.find.tractiveTonnage,
				createTimeBegin: this.startDate,
				createTimeEnd: this.endDate
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
		}
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
.driverList
	.tableTit
		background #409EFF
		color #fff
		height 36px
		line-height 36px
		display flex
		text-align center
		position relative
		padding-right 520px
		border-radius 3px
		font-size 14px
		font-weight bold
		.driver
		.mobile
		.handle
			border-left 1px solid #fff
			position absolute
	.truckInfo
		width 100%
	.handle
		width 180px
		right 0
	.driver
		width 200px
		right 320px
	.mobile
		width 140px
		right 180px
</style>