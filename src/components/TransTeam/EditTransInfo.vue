<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑运输档案</div>
			<el-form label-width="120px" :model="transInfo" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item label="姓名" prop="comDriverID">
							<el-autocomplete style="width:100%"
								value-key="realName" 
								v-model="transInfo.realName"
								:fetch-suggestions="getStaffs"
								placeholder="请选择内容"
								@select="handSelectStaff">
							</el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form-item label="车牌号" prop="truckID">
							<el-autocomplete style="width:100%"
								value-key="plateNo" 
								v-model="transInfo.plateNo"
								:fetch-suggestions="getTrucks"
								placeholder="请选择内容"
								@select="handSelectTruck">
							</el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form-item label="挂车牌">
							<el-autocomplete style="width:100%"
								value-key="trailerPlateNo" 
								v-model="transInfo.trailerPlateNo"
								:fetch-suggestions="getTrailers"
								placeholder="请选择内容"
								@select="handSelectTrailer">
							</el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form-item label="自编号" prop="code">
							<el-input v-model="transInfo.code"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form-item label="建档时间" prop="archiveTime">
							<el-date-picker 
								:picker-options="{disabledDate}"
								style="width: 100%" 
								v-model="transInfo.archiveTime"
								type="date"
								value-format="timestamp"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item>
							<el-button type="primary" @click="updateItem">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Staff from '../../api/Staff'
import Truck from '../../api/Truck'
import TransportRecord from '../../api/TransportRecord'
export default {
	data() {
		return {
			loading: false,
			transInfo: {
				archiveTime: '',
				code: '',
				comDriverID: '',
				trailerID: '',
				truckID: ''
			},
			rules: {
				comDriverID: [
					{required: true, message: '请选择姓名'}
				],
				truckID: [
					{required: true, message: '请选择车牌号'}
				],
				code: [
					{required: true, message: '请输入自编号'},
					{min: 1, max: 20, message: '长度在 1 到 20 个字符'}
				],
				archiveTime: [
					{required: true, message: '请选择建档时间', trigger: 'change'}
				],
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		disabledDate(curDate) {
			return new Date() < curDate
		},
		getStaffs(queryString, cb) {
			Staff.findByDriverSuggest({
				realName: queryString
			}).then(res => {
				cb(res)
			})
		},
		getTrucks(queryString, cb) {
			Truck.findByPlateNoSuggest({
				plateNo: queryString
			}).then(res => {
				cb(res)
			})
		},
		getTrailers(queryString, cb) {
			Truck.findByTrailerPlateNoSuggest({
				trailerPlateNo: queryString
			}).then(res => {
				cb(res)
			})
		},
		handSelectStaff(data) {
			this.transInfo.comDriverID = data.comDriverID
			this.transInfo.realName = data.realName
		},
		handSelectTruck(data) {
			this.transInfo.truckID = data.truckID
			this.transInfo.plateNo = data.plateNo
		},
		handSelectTrailer(data) {
			this.transInfo.trailerID = data.trailerID
			this.transInfo.trailerPlateNo = data.trailerPlateNo
		},
		getInfo() {
			let transportRecordID = this.$route.query.transportRecordID
			TransportRecord.findById({ transportRecordID }).then(res => {
				this.transInfo = res
			})
		},
		updateItem() {
			let data = this.transInfo
			!data.trailerPlateNo && (data.trailerID = '')
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					TransportRecord.update(data).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'transinfo'})
					})
				}
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
.avatar-uploader
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
	&:hover 
		border-color #409eff
	.avatar-uploader-icon
		font-size 28px
		color #8c939d
		width 98px
		height 98px
		line-height 98px
		text-align center
	.avatar
		width 98px
		height 98px
		display block
		vertical-align top
</style>