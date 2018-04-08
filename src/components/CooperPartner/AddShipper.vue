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
							<el-cascader 
								style="width: 100%" 
								:options="distData" 
								v-model="selectedArea"
								@change="handleSelectedArea">
							</el-cascader>
						</el-form-item>
						<el-form-item label="详细地址">
							<el-input v-model="shipper.detailAddress"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="shipper.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input v-model="shipper.contactPhone"></el-input>
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
	import { regionData } from 'element-china-area-data'
	import { Message } from 'element-ui'
	import request from '../../common/request'
	export default {
		data() {
			return {
				distData: regionData,
				shipper: {
					companyAreaID: '',
					companyName: '',
					contactName: '',
					contactPhone: '',
					detailAddress: ''
				},
				selectedArea: [],
			}
		},
		methods: {
			handleSelectedArea(data) {
				this.shipper.companyAreaID = data[data.length-1]
			},
			add() {
				let data = {
					companyAreaID: this.shipper.companyAreaID,
					companyName: this.shipper.companyName,
					contactName: this.shipper.contactName,
					contactPhone: this.shipper.contactPhone,
					detailAddress: this.shipper.detailAddress,
					type: 'Consignor',
				}
				request({
					url: '/customer/add',
					method:'post',
					data
				}).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'shipper'})
				})
				
				
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="stylus" scoped>

</style>