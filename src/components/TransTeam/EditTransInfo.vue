<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑运输档案</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="姓名">
								<el-select
									style="width: 100%" 
									v-model="selectedStaff" 
									value-key="staffID" 
									filterable
									remote
									placeholder="请输入关键词"
									:remote-method="getStaffs"
									:loading="loading"
									@change="handStaffSelect">
									<el-option
										v-for="item in staffs"
										:key="item.staffID"
										:label="item.realName"
										:value="item">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="车牌号">
								<el-select
									style="width: 100%" 
									v-model="selectedTruck"
									filterable
									remote
									placeholder="请输入关键词"
									:remote-method="getTrucks"
									:loading="loading"
									@change="handTruckSelect">
									<el-option
										v-for="item in trucks"
										:key="item.truckID"
										:label="item.plateNo"
										:value="item">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="挂车牌">
								<el-select
									style="width: 100%" 
									v-model="selectedTrailer"
									filterable
									remote
									placeholder="请输入关键词"
									:remote-method="getTrailers"
									:loading="loading"
									@change="handTrailerSelect">
									<el-option
										v-for="item in trailers"
										:key="item.trailerID"
										:label="item.trailerPlateNo"
										:value="item">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="自编号">
								<el-input v-model="transInfo.code"></el-input>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="建档时间">
								<el-date-picker
									style="width: 100%" 
									v-model="transInfo.archiveTime"
									type="date" 
									value-format="timestamp"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-form>
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
import request from '../../common/request'
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
			staffs: [],
			selectedStaff: '',
			trailers: [],
			selectedTrailer: '',
			trucks: [],
			selectedTruck: ''
		}
	},
	created() {
		this.getInfo()
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
		handStaffSelect(data) {
			this.transInfo.staffID = data.staffID
			this.transInfo.realName = data.realName
		},
		handTruckSelect(data) {
			this.transInfo.truckID = data.truckID
			this.transInfo.plateNo = data.plateNo
		},
		handTrailerSelect(data) {
			this.transInfo.trailerID = data.trailerID
			this.transInfo.trailerPlateNo = data.trailerPlateNo
		},
		getInfo() {
			let params = {
				transportRecordID: this.$route.query.transportRecordID
			}
			request({
				url: '/transportRecord/findById',
				params
			}).then(res => {
				this.transInfo = res.data.data
				this.selectedStaff = this.transInfo.realName
				this.selectedTruck = this.transInfo.plateNo
				this.selectedTrailer = this.transInfo.trailerPlateNo
			})
		},
		updateItem() {
			let data = this.transInfo
			console.log(data)
			request({
				url: '/transportRecord/update',
				method: 'post',
				data
			}).then(res => {
				console.log(res.data)
				Message.success(res.data.msg)
				this.$router.push({name: 'transinfo'})
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