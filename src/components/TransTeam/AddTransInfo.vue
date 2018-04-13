<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">添加运输档案</div>
			<el-form label-width="120px" :model="transInfo" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item label="姓名" prop="staffID">
							<el-select
								style="width: 100%" 
								v-model="transInfo.staffID"
								filterable
								remote
								placeholder="请输入关键词"
								:remote-method="getStaffs"
								:loading="loading">
								<el-option
									v-for="item in staffs"
									:key="item.staffID"
									:label="item.realName"
									:value="item.staffID">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form-item label="车牌号" prop="truckID">
							<el-select
								style="width: 100%" 
								v-model="transInfo.truckID"
								filterable
								remote
								placeholder="请输入关键词"
								:remote-method="getTrucks"
								:loading="loading">
								<el-option
									v-for="item in trucks"
									:key="item.truckID"
									:label="item.plateNo"
									:value="item.truckID">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form-item label="挂车牌">
							<el-select
								style="width: 100%" 
								v-model="transInfo.trailerID"
								filterable
								remote
								placeholder="请输入关键词"
								:remote-method="getTrailers"
								:loading="loading">
								<el-option
									v-for="item in trailers"
									:key="item.trailerID"
									:label="item.trailerPlateNo"
									:value="item.trailerID">
								</el-option>
							</el-select>
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
							<el-button type="primary" @click="createItem">立即保存</el-button>
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
import request from '../../common/request'
// import { checkInt } from '../../common/validators'
export default {
	data() {
		return {
			loading: false,
			transInfo: {
				archiveTime: '',
				code: '',
				staffID: '',
				trailerID: '',
				truckID: ''
			},
			staffID: '',
			staffs: [],
			trailerID: '',
			trailers: [],
			truckID: '',
			trucks: [],
			rules: {
				staffID: [
					{required: true, message: '请输入姓名', trigger: 'blur'}
				],
				truckID: [
					{required: true, message: '请输入车牌号', trigger: 'blur'}
				],
				code: [
					{required: true, message: '请输入自编号', trigger: 'blur'}
				],
				archiveTime: [
					{required: true, message: '请选择建档时间', trigger: 'change'}
				],
			}
		}
	},
	created() {
	},
	methods: {
		getStaffs(realName) {
			if (realName !== '') {
				this.loading = true
				let params = {
					realName
				}
				request({
					url: '/staff/driver/suggest',
					params
				}).then(res => {
					this.loading = false
					this.staffs = res.data.data
				})
			} else {
				this.staffs = []
			}
		},
		getTrucks(plateNo) {
			if (plateNo !== '') {
				this.loading = true
				let params = {
					plateNo
				}
				request({
					url: '/truck/plateNo/suggest',
					params
				}).then(res => {
					this.loading = false
					this.trucks = res.data.data
				})
			} else {
				this.trucks = []
			}
		},
		getTrailers(trailerPlateNo, cb) {
			if (trailerPlateNo !== '') {
				this.loading = true
				let params = {
					trailerPlateNo
				}
				request({
					url: '/truck/trailerPlateNo/suggest',
					params
				}).then(res => {
					this.loading = false
					this.trailers = res.data.data
				})
			} else {
				this.trailers = []
			}
		},
		createItem() {
			let data = this.transInfo
			console.log(data)
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					request({
						url: '/transportRecord/add',
						method: 'post',
						data
					}).then(res => {
						console.log(res.data)
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