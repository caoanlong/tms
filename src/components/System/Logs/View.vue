<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">日志详情</div>
			<el-form label-width="120px">
			<el-row>
				<el-col :span="8">
                    <el-form-item label="日志编号">
                        <p>{{logInfo.logApiID}}</p>
                    </el-form-item>
				</el-col>
				<el-col :span="8">
                    <el-form-item label="权限组织">
                        <p>{{logInfo.organizationName}}</p>
                    </el-form-item>
				</el-col>
                <el-col :span="8">
					<el-form-item label="操作时间">
                        <p>{{moment(logInfo.createDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
                <el-col :span="16">
                    <el-form-item label="操作">
                        <p>{{logInfo.mobile}} / {{logInfo.username}}</p>
                    </el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="状态">
						<p v-if="logInfo.status=='Succeed'">成功</p>
						<p v-if="logInfo.status=='Failed'">失败</p>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
                <el-col :span="8">
					<el-form-item label="主机">
						<p>{{logInfo.ip}}</p>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="操作地址">
						<p>{{logInfo.ipToAddress}}</p>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="请求参数">
						<p>{{logInfo.reqParams}}</p>
					</el-form-item>
				</el-col>
				<el-col :span="24">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request, { baseURL } from '../../../common/request'
import Log from '../../../api/Log'
export default {
	data() {
		return {
			logInfo: {}
		}
	},
	created() {
		this.getInfo()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.getInfo()
		}
	},
	methods: {
		getInfo() {
			Log.findById({
				logApiID: this.$route.query.logApiID
			}).then(res => {
				this.logInfo = res
			})
		},
		back() {
			this.$router.push({ name: 'logs'})
		}
	}
}

</script>
<style lang="stylus" scoped>
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>
