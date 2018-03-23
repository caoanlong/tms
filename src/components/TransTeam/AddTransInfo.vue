<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">添加运输档案</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="姓名">
								<el-autocomplete
									style="width: 100%"
									v-model="transInfo.name"
									:fetch-suggestions="getPerson"
									placeholder="请输入..."
								></el-autocomplete>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="车牌号">
								<el-autocomplete
									style="width: 100%"
									v-model="transInfo.plateNum"
									:fetch-suggestions="getPlateNum"
									placeholder="请输入..."
								></el-autocomplete>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="挂车牌">
								<el-autocomplete
									style="width: 100%"
									v-model="transInfo.trailerPlate"
									:fetch-suggestions="getTrailerPlate"
									placeholder="请输入..."
								></el-autocomplete>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="自编号">
								<el-input v-model="transInfo.selfNum"></el-input>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="14" :offset="5">
						<el-form label-width="120px">
							<el-form-item label="建档时间">
								<el-date-picker
									style="width: 100%" 
									v-model="transInfo.buildTime"
									type="date"
									placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item>
							<el-button type="primary" @click="add">立即保存</el-button>
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
export default {
	data() {
		return {
			transInfo: {
				name: '',
				plateNum: '',
				trailerPlate: '',
				selfNum: '',
				buildTime: ''
			},
			personResource: [
				{ "value": "李金锐"},
				{ "value": "武藤兰"},
				{ "value": "泷泽萝拉"},
				{ "value": "佐伯奈"},
				{ "value": "苍井空"},
				{ "value": "波多野结衣"}
			],
			plateNumResource: [
				{ "value": "云AG5836"},
				{ "value": "云BN8744"},
				{ "value": "云IJ8565"},
				{ "value": "云LP7562"},
				{ "value": "云FG5623"}
			],
			trailerPlateResource: [
				{ "value": "云JK5621"},
				{ "value": "云TG4124"},
				{ "value": "云RG3324"},
				{ "value": "云KJ2136"},
				{ "value": "云FG5545"}
			]
		}
	},
	created() {
	},
	methods: {
		getPerson(queryString, cb) {
			let results = queryString ? this.personResource.filter(this.createStateFilter(queryString)) : this.personResource
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => {
				cb(results)
			}, 1000 * Math.random())
		},
		getPlateNum(queryString, cb) {
			let results = queryString ? this.plateNumResource.filter(this.createStateFilter(queryString)) : this.plateNumResource
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => {
				cb(results)
			}, 1000 * Math.random())
		},
		getTrailerPlate(queryString, cb) {
			let results = queryString ? this.trailerPlateResource.filter(this.createStateFilter(queryString)) : this.trailerPlateResource
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => {
				cb(results)
			}, 1000 * Math.random())
		},
		createStateFilter(queryString) {
			return (state) => {
				return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
			}
		},
		add() {
			Message.success('保存成功！')
			this.$router.push({name: 'transinfo'})
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