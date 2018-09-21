<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加客户地址</div>
			<el-row style="padding-bottom: 200px">
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="companyAddress" :rules="rules" ref="ruleForm" size="small">
						<el-form-item label="所属客户" prop="customerID">
							<el-autocomplete 
								style="width:100%" 
								value-key="companyName" 
								v-model="companyAddress.companyName"
								:fetch-suggestions="getCompanys"
								placeholder="请输入..."
								@select="handSelect">
								<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelect"></i>
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="联系人" prop="contactName">
							<el-input v-model="companyAddress.contactName" placeholder="请输入..."></el-input>
						</el-form-item>
                        <el-form-item label="电话" prop="contactPhone">
							<el-input v-model="companyAddress.contactPhone" placeholder="请输入..."></el-input>
						</el-form-item>
						<el-form-item label="所在区域" prop="areaID">
							<dist-picker :distList="selectedArea" @hand-select="handleSelectedArea"></dist-picker>
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
						<el-form-item label="门牌信息" prop="detailAddress">
							<el-input v-model="companyAddress.detailAddress" placeholder="如：十字路口左边22栋301室"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="add">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Customer from '../../../api/Customer'
import CustomerAddress from '../../../api/CustomerAddress'
import distData from '../../../assets/data/distpicker.data'
import { searchLocationByCity, areaIdToArrayId } from '../../../common/utils'
import Geohash from '../../../common/Geohash'
import CrossProxy from '../../../api/CrossProxy'
import { checkTel } from '../../../common/validator'
import DistPicker from '../../CommonComponents/DistPicker'
export default {
	data() {
		return {
            selectedArea: [],
            searchAreaHash: '',
			companyAddress: {
				customerID: '',
				areaID: '',
                contactName: '',
				contactPhone: '',
				detailAddress: '',
				companyName: '',
				locationLng: '',
				locationLat: '',
                locationAddress: ''
			},
			customerID: this.$route.query.customerID,
			companyName: this.$route.query.companyName,
			rules: {
				customerID: [{required: true, message: '请输入所属客户'}],
				contactName: [{required: true, message: '请输入联系人'}, {min: 1, max: 20, message: '长度在 1 到 20 个字符'}],
                contactPhone: [{required: true, message: '请输入电话'}, {validator: checkTel}],
				areaID: [{ required: true, message: '请选择区域', trigger: 'change' }],
				locationAddress: [{required: true, message: '请输入定位地址'}],
				detailAddress: [{min: 1, max: 50, message: '长度在 1 到 50 个字符'}]
			}
		}
	},
	components: { DistPicker },
	created() {
		if (this.customerID) this.companyAddress.customerID = this.customerID
		if (this.companyName) this.companyAddress.companyName = this.companyName
	},
	methods: {
		getCompanys(queryString, cb) {
			this.companyAddress.customerID = ''
			Customer.suggest({
				companyName: queryString
			}).then(res => { cb(res) })
        },
        handSelect(data){
			this.companyAddress.customerID = data.customerID
			this.companyAddress.companyName = data.companyName
			this.companyAddress.contactName = data.contactName
			this.companyAddress.contactPhone = data.contactPhone		
			this.handleSelectedArea(areaIdToArrayId(data.companyAreaID))
		},
		clearSelect(){
			this.companyAddress.customerID = ''
			this.companyAddress.companyName =''
		},
		handleSelectedArea(data) {
			if (data) {
				this.companyAddress.areaID = data[data.length - 1]
				this.selectedArea = data
				let location = null
				if (data[2]) {
					location = searchLocationByCity(distData[data[1]][data[2]])
				}
				if (data[1] && !data[2] || !location) {
					location = searchLocationByCity(distData[data[0]][data[1]])
				}
				this.searchAreaHash = Geohash.encode(location.latitude, location.longitude)
			} else {
				this.companyAddress.areaID = ''
				this.selectedArea = []
				this.searchAreaHash = ''
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
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				CustomerAddress.add(this.companyAddress).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'companyaddress'})
				})
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