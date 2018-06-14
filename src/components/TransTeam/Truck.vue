<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">车辆</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small" :model="find" :rules="rules" ref="ruleForm">
					<el-form-item label="车牌号" prop="plateNo">
						<el-input placeholder="请输入..." v-model="find.plateNo"></el-input>
					</el-form-item>
					<el-form-item label="自编号" prop="code">
						<el-input placeholder="请输入..." v-model="find.code"></el-input>
					</el-form-item>
					<el-form-item label="牵引质量" prop="tractiveTonnage">
						<el-input placeholder="请输入..." v-model="find.tractiveTonnage"><template slot="append">千克</template></el-input>
					</el-form-item>
					<el-form-item label="车长">
						<el-input placeholder="请输入..." v-model="find.length"><template slot="append">毫米</template></el-input>
					</el-form-item>
					<el-form-item label="车宽">
						<el-input placeholder="请输入..." v-model="find.width"><template slot="append">毫米</template></el-input>
					</el-form-item>
					<el-form-item label="车高">
						<el-input placeholder="请输入..." v-model="find.high"><template slot="append">毫米</template></el-input>
					</el-form-item>
					<el-form-item label="添加时间">
						<el-date-picker
							v-model="find.date"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期" 
							value-format="timestamp" 
							@change="selectDateRange">
						</el-date-picker>
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
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					@selection-change="selectionChange" 
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="所属地区" prop="area" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.areaID">{{scope.row.areaID | searchAreaByKey()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="所属企业" prop="companyName"></el-table-column>
					<el-table-column label="自编号" prop="code"></el-table-column>
					<el-table-column label="车牌号" prop="plateNo"></el-table-column>
					<el-table-column label="车牌颜色" prop="plateNoColor"></el-table-column>
					<el-table-column label="车辆类别" prop="truckCategory">
					</el-table-column>
					<el-table-column label="车辆类型" prop="truckType"></el-table-column>
					<el-table-column label="道路运输证号" prop="roadTransportNo" width="120"></el-table-column>
					<el-table-column label="经营范围" prop="businessScope"></el-table-column>
					<el-table-column label="道路运输证年审期至" width="130">
						<template slot-scope="scope">
							<span v-if="scope.row.roadTransportLicAnnualPeriod">{{scope.row.roadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="行驶证审验效期至" prop="driverLicExamineExpires" width="120">
						<template slot-scope="scope">
							<span v-if="scope.row.driverLicExamineExpires">{{scope.row.driverLicExamineExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="承运人责任险有效期至" width="150">
						<template slot-scope="scope">
							<span v-if="scope.row.carrierRiskInsuranceExpires">{{scope.row.carrierRiskInsuranceExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="等级评定" prop="rank" width="100"></el-table-column>
					<el-table-column label="下次等评日期" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.nextRankEvaluteTime">{{scope.row.nextRankEvaluteTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="二级维护日期" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.secondaMaintainTime">{{scope.row.secondaMaintainTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="下次二级维护日期" width="120">
						<template slot-scope="scope">
							<span v-if="scope.row.nextSecondLevel">{{scope.row.nextSecondLevel | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="载重" prop="loads" width="100"></el-table-column>
					<el-table-column label="罐体类型" prop="cannedType" width="100"></el-table-column>
					<el-table-column label="罐体容积" prop="tankVolume" width="100"></el-table-column>
					<el-table-column label="罐体检测有效期至" width="120">
						<template slot-scope="scope">
							<span v-if="scope.row.tankQCExpires">{{scope.row.tankQCExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="安全阀检测有效期至" width="130">
						<template slot-scope="scope">
							<span v-if="scope.row.safetyValvesQCExpires">{{scope.row.safetyValvesQCExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="压力表检测有效期至" width="130">
						<template slot-scope="scope">
							<span v-if="scope.row.pressureGaugeQCExpires">{{scope.row.pressureGaugeQCExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="挂车车牌" prop="trailerPlateNo" width="100"></el-table-column>
					<el-table-column label="汽车生产厂家" prop="manufacturer" width="100"></el-table-column>
					<el-table-column label="品牌型号" prop="carBrandModel" width="100"></el-table-column>
					<el-table-column label="发动机号" prop="engineNO" width="100"></el-table-column>
					<el-table-column label="车架号" prop="vehicleFrameNO" width="100"></el-table-column>
					<el-table-column label="行驶证注册日期" width="120">
						<template slot-scope="scope">
							<span v-if="scope.row.driverLicRegisterTime">{{scope.row.driverLicRegisterTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="行驶证发证日期" width="120">
						<template slot-scope="scope">
							<span v-if="scope.row.driverLicIssueTime">{{scope.row.driverLicIssueTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="牵引质量" prop="tractiveTonnage" width="100"></el-table-column>
					<el-table-column label="车长" prop="length" width="100"></el-table-column>
					<el-table-column label="车宽" prop="width" width="100"></el-table-column>
					<el-table-column label="车高" prop="high" width="100"></el-table-column>
					<el-table-column label="添加时间" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.truckID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.truckID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.truckID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
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
			templateUrl: baseURL + '/base/filetemplate/downLoadTemplate?fileName=vehicleInfo.xlsx&&Authorization=' + localStorage.getItem('token'),
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
				Staff.del({ truckIDs }).then(res => {
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