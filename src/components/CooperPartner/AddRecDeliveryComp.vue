<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">添加收发货单位</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="公司名称">
							<el-input v-model="recdeliverycomp.companyName"></el-input>
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
							<el-input v-model="recdeliverycomp.detailAddress"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="recdeliverycomp.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系方式">
							<el-input v-model="recdeliverycomp.contactPhone"></el-input>
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
				recdeliverycomp: {
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
				this.recdeliverycomp.companyAreaID = data[data.length-1]
			},
			add() {
				let data = {
					companyAreaID: this.recdeliverycomp.companyAreaID,
					companyName: this.recdeliverycomp.companyName,
					contactName: this.recdeliverycomp.contactName,
					contactPhone: this.recdeliverycomp.contactPhone,
					detailAddress: this.recdeliverycomp.detailAddress,
					type: 'ShipperConsignee',
				}
				request({
					url: '/customer/add',
					method:'post',
					data
				}).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'recdeliverycomp'})
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