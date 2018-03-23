<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">添加托运人</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="公司名称">
							<el-input v-model="shipper.companyName"></el-input>
						</el-form-item>
						<el-form-item label="地址">
							<el-input v-model="shipper.area"></el-input>
						</el-form-item>
						<el-form-item label="详细地址">
							<el-input v-model="shipper.address"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="shipper.contacts"></el-input>
						</el-form-item>
                        <el-form-item label="联系方式">
							<el-input v-model="shipper.contactMethod"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="add">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				shipper: {
					companyName: '',
					area: '',
					address: '',
					contacts: '',
					contactMethod: ''
				}
			}
		},
		methods: {
            add() {
                Message.success('保存成功！')
                this.$router.push({name: 'shipper'})
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