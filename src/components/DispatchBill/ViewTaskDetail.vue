<template>
	<div class="main-content">
		<div class="wf-card">
			<TaskItem :taskDetail="taskDetail" :task="task" :carrier="carrier" :cargoList="cargoList" :detailType="detailType"></TaskItem>
			<div class="tit">运输照片<span class="fr uploadPicBtn" @click="dialogPhotoVisible = true" v-if="detailType=='edit'">上传照片</span></div>
			<div class="picList">
				<div class="title">装车照片<span>(5)</span></div>
				<div class="con"></div>
			</div>
			<div class="picList">
				<div class="title">到货照片<span>(5)</span></div>
				<div class="con"></div>
			</div>
			<div class="picList">
				<div class="title">回单照片<span>(5)</span></div>
				<div class="con"></div>
			</div>
			<div class="picList">
				<div class="title">异常上报<span>(5)</span></div>
				<div class="con"></div>
			</div>
			<div class="handle text-center">
				<el-button @click="back">返回</el-button>
			</div>
		</div>
		<el-dialog title="上传照片" :show-close="false" :close-on-click-modal="false" :visible.sync="dialogPhotoVisible" width="80%" class="ViewPhotosDialog">
			<p>装车地：云南昆明</p>
			<p>送货地：云南昆明</p>
			<el-form label-width="70px">
				<el-form-item label="装车照片">
					<ImageUpload :limitNum="10"></ImageUpload>
				</el-form-item>
				<el-form-item label="到货照片">
					<ImageUpload :limitNum="10"></ImageUpload>
				</el-form-item>
				<el-form-item label="回单照片">
					<ImageUpload :limitNum="10"></ImageUpload>
				</el-form-item>
				<el-form-item label="异常上报">
					<ImageUpload :limitNum="10"></ImageUpload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="uploadPic" type="primary">上传</el-button>
				<el-button @click="cancel">返回</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Task from '../../api/Task'
import TaskItem from './Common/TaskItem'
import ImageUpload from '../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			dialogPhotoVisible:false,
			taskDetail:{},
			task:{},
			carrier:{},
			cargoList:[],
			detailType:''
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		getDetail() {
			let dispatchTaskID = this.$route.query.dispatchTaskID
			this.detailType = this.$route.query.type
			Task.findById({ dispatchTaskID }).then(res => {
				this.taskDetail = res
				this.task = res.task
				this.carrier = res.carrier
				this.cargoList= res.cargoList
			})
		},
		back() {
			this.$router.go(-1)
		},
		uploadPic(){
			
		},
		cancel(){
			this.dialogPhotoVisible=false
		}
	},
	components: {
		TaskItem,
		ImageUpload
	}
}

</script>
<style lang="stylus" scoped>
.tit
	padding 6px 10px
	height 36px
	line-height 24px
	background #e2ecf6
	color #3582d0
	font-size 13px
	.uploadPicBtn
		background #409eff
		color #FFF
		cursor pointer
		border-radius 4px
		padding 0 12px
		font-size 12px
		height 24px
		line-height 24px
.picList
	padding 10px
	border 1px solid #e2ecf6
	border-top none
	.title
		border-bottom 1px solid #e2ecf6
		font-size 12px
		line-height 24px
		color #999
		span
			color #409eff
			margin-left 5px
	.con
		padding 10px
.handle
	margin-top 10px	
</style>