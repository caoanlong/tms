<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">添加企业地址</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="companyAddress" :rules="rules" ref="ruleForm" size="mini">
						<el-form-item label="所属企业" prop="customerID">
							<el-autocomplete  style="width:100%"
								value-key="companyName" 
								v-model="companyAddress.companyName"
								:fetch-suggestions="getCompanys"
								placeholder="请输入..."
								@select="handSelect">
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="联系人" prop="contactName">
							<el-input v-model="companyAddress.contactName" placeholder="请输入..."></el-input>
						</el-form-item>
                        <el-form-item label="电话" prop="contactPhone">
							<el-input v-model="companyAddress.contactPhone" placeholder="请输入..."></el-input>
						</el-form-item>
						<el-form-item label="所在区域" prop="companyAreaID">
                            <el-cascader 
                                style="width:100%" 
                                :options="dist" 
                                change-on-select 
                                v-model="selectedArea" 
                                @change="handleSelectedArea">
                            </el-cascader>
						</el-form-item>
						<el-form-item label="定位地址" prop="locationAddress">
                            <el-autocomplete  style="width:100%"
                                value-key="name" 
                                prefix-icon="el-icon-location"
                                v-model="companyAddress.locationAddress"
                                :fetch-suggestions="getLocation"
                                placeholder="请输入..."
                                @select="handSelectLocation">
                            </el-autocomplete>
                        </el-form-item>
						<el-form-item label="门牌信息">
							<el-input v-model="companyAddress.info" placeholder="如：十字路口左边22栋301室"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">立即保存</el-button>
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
import Customer from '../../../api/Customer'
import dist from '../../../assets/data/dist.json'
import distData from '../../../assets/data/distpicker.data'
import { searchAreaByKey, searchLocationByCity } from '../../../common/utils'
import Geohash from '../../../common/Geohash'
import CrossProxy from '../../../api/CrossProxy'
import { checkTel } from '../../../common/validator'
export default {
	data() {
		return {
            selectedArea: [],
            searchAreaHash: '',
			companyAddress: {
				companyName: '',
                contactName: '',
                contactPhone: '',
				companyAreaID: '',
                locationAddress: '',
                info: ''
			},
			rules: {
				customerID: [
					{required: true, message: '请输入所属企业', trigger: 'blur'}
                ],
				contactName: [
					{required: true, message: '请输入联系人', trigger: 'blur'}
                ],
                contactPhone: [
                    {required: true, message: '请输入电话', trigger: 'blur'},
                    {validator: checkTel}
                ],
				companyAreaID: [
					{ required: true, message: '请选择区域', trigger: 'change' }
				],
				locationAddress: [
					{required: true, message: '请输入定位地址', trigger: 'blur'}
				],
			}
		}
    },
    computed: {
		dist: () => dist
	},
	methods: {
		getCompanys(queryString, cb) {
			Customer.find({
				type: 'ShipperConsignee',
				companyName: queryString
			}).then(res => {
				cb(res.records)
			})
        },
        handSelect(data){
			this.companyAddress.customerID = data.customerID
			this.companyAddress.companyName = data.companyName
		},
		handleSelectedArea(data) {
            this.companyAddress.companyAreaID = data[data.length - 1]
            this.companyAddress.shipperArea = searchAreaByKey(data[data.length - 1])
            if (data[1]) {
				const location = searchLocationByCity(distData[data[0]][data[1]])
				this.searchAreaHash = Geohash.encode(location.latitude, location.longitude)
			}
        },
        handSelectLocation(data) {
			this.companyAddress.locationLng = data.longitude
			this.companyAddress.locationLat = data.latitude
		},
        getLocation(queryString, cb) {
			if (!this.searchAreaHash) {
				Message.error('请选择城市！')
				return
			}
			CrossProxy.getEleLocation({
				geohash: this.searchAreaHash,
				keyword: queryString
			}).then(res => { cb(res) })
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					Customer.update({
						companyAreaID: this.shipper.companyAreaID,
						companyName: this.shipper.companyName,
						contactName: this.shipper.contactName,
						contactPhone: this.shipper.contactPhone,
						detailAddress: this.shipper.detailAddress,
						type: 'Consignor'
					}).then(res => {
						Message.success('保存成功！')
						this.$router.push({name: 'shipper'})
					})
				} else {
					return
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

</style>