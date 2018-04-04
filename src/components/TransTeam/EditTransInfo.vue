<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">编辑运输档案</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="姓名">
								<el-autocomplete
									style="width: 100%" 
									value-key="realName" 
									label="realName" 
									v-model="staffID"
									:fetch-suggestions="getDrivers"
									placeholder="请输入..." 
									@select="handleSelect"
								></el-autocomplete>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="车牌号">
								<el-autocomplete
									style="width: 100%" 
									value-key="plateNo" 
									label="plateNo" 
									v-model="truckID"
									:fetch-suggestions="getTrucks"
									placeholder="请输入..." 
									@select="handleSelect"
								></el-autocomplete>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="挂车牌">
								<el-autocomplete
									style="width: 100%" 
									value-key="trailerPlateNo" 
									label="trailerPlateNo" 
									v-model="trailerID"
									:fetch-suggestions="getTrailers"
									placeholder="请输入..." 
									@select="handleSelect"
								></el-autocomplete>
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
			transInfo: {
				archiveTime: '',
				code: '',
				staffID: '',
				trailerID: '',
				truckID: ''
			},
			staffID: '',
			trailerID: '',
			truckID: ''
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getDrivers(realName, cb) {
			if (!realName.trim()) return
			let params = {
				realName
			}
			request({
				url: '/staff/driver/suggest',
				params
			}).then(res => {
				cb(res.data.data)
			})
		},
		getTrucks(plateNo, cb) {
			if (!plateNo.trim()) return
			let params = {
				plateNo
			}
			request({
				url: '/truck/plateNo/suggest',
				params
			}).then(res => {
				cb(res.data.data)
			})
		},
		getTrailers(trailerPlateNo, cb) {
			if (!trailerPlateNo.trim()) return
			let params = {
				trailerPlateNo
			}
			request({
				url: '/truck/trailerPlateNo/suggest',
				params
			}).then(res => {
				cb(res.data.data)
			})
		},
		handleSelect(item) {
			if (item.staffID) {
				this.transInfo.staffID = item.staffID
			} else if (item.truckID) {
				this.transInfo.truckID = item.truckID
			} else if (item.trailerID) {
				this.transInfo.trailerID = item.trailerID
			}
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
				this.staffID = res.data.data.staffID
				this.trailerID = res.data.data.trailerID
				this.truckID = res.data.data.truckID
			})
		},
		updateItem() {
			let data = this.transInfo
			console.log(data)
			return
			request({
				url: '/staff/update',
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