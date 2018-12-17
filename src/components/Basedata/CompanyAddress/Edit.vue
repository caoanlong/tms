<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">编辑客户地址</div>
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
                        <el-form-item label="所属片区" class="customerSelect">
                            <el-select  placeholder="请选择" style="width:100%">
                                <el-option value="Shipper" label="发货方"></el-option>
                            </el-select>
                        </el-form-item>
						<el-form-item label="终端用户名称">
							<el-input v-model="companyAddress.contactName" placeholder="请输入终端用户名称"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="companyAddress.contactName" placeholder="请输入..."></el-input>
						</el-form-item>
                        <el-form-item label="电话">
							<el-input v-model="companyAddress.contactPhone" placeholder="请输入..."></el-input>
						</el-form-item>
                        <el-form-item label="地址编号" prop="code">
							<el-input v-model="companyAddress.code" placeholder="请输入地址编号"></el-input>
						</el-form-item>
						<el-form-item label="所在区域" prop="areaID">
                            <dist-picker :distList="selectedArea" @hand-select="handSelectedArea"></dist-picker>
						</el-form-item>
						<el-form-item label="定位地址" prop="locationAddress">
                            <el-autocomplete  style="width:100%"
                                value-key="name" 
                                prefix-icon="el-icon-location"
                                v-model="companyAddress.locationAddress"
                                :fetch-suggestions="getLocation"
                                placeholder="请输入..."
                                @select="handSelectLocation">
								<template slot="append">
									<div style="cursor:pointer" @click="handLocation">手动定位</div>
								</template>
                            </el-autocomplete>
                        </el-form-item>
						<el-form-item label="门牌信息" prop="detailAddress">
							<el-input v-model="companyAddress.detailAddress" placeholder="如：十字路口左边22栋301室"></el-input>
						</el-form-item>
                        <el-form-item label="围栏范围" prop="monitorScope">
							<el-input v-model="companyAddress.monitorScope" placeholder="请输入围栏范围">
								<template slot="append">米</template>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
		<select-location 
			v-if="isLocationVisible" 
			:location="[companyAddress.locationLng, companyAddress.locationLat]" 
			:locAddress="companyAddress.locationAddress" 
			:callback="callbackLocation">
		</select-location>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Company from '../../../api/Company'
import distData from '../../../assets/data/distpicker.data'
import { areaIdToArrayId } from '../../../common/utils'
import { checkTel, checkFloat2 } from '../../../common/valid'
import DistPicker from '../../CommonComponents/DistPicker'
import SelectLocation from '../../CommonComponents/SelectLocation'
export default {
	data() {
		return {
			isLocationVisible: false,
            selectedArea: [],
            selectedCity: '',
			companyAddress: {
				customerID: '',
				areaID: '',
                contactName: '',
				contactPhone: '',
				detailAddress: '',
				companyName: '',
				locationLng: '',
				locationLat: '',
                locationAddress: '',
                monitorScope: '',
                code: ''
			},
			rules: {
				customerID: [{required: true, message: '请输入所属客户'}],
				areaID: [{ required: true, message: '请选择区域', trigger: 'change' }],
				locationAddress: [{required: true, message: '请输入定位地址'}],
				detailAddress: [{min: 1, max: 50, message: '长度在 1 到 50 个字符'}],
				monitorScope: [{validator: checkFloat2}]
			}
		}
	},
	components: { DistPicker, SelectLocation },
	created() {
		this.getInfo()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.getInfo()
		}
	},
	methods: {
		getCompanys(queryString, cb) {
			this.companyAddress.customerID = ''
			Company.customerSuggest({
				companyName: queryString
			}).then(res => { cb(res) })
		},
		getLocation(queryString, cb) {
			if (!this.selectedCity) {
				Message.error('请选择城市！')
				return
			}
			AMap.plugin('AMap.Autocomplete', () => {
				const autoComplete= new AMap.Autocomplete({ city: this.selectedCity })
				autoComplete.search(queryString ? queryString : this.selectedCity, (status, result) => {
					if (status === 'complete' && result.info === 'OK') {
						const list = result.tips.filter(item => item.location && item.name)
						cb(list)
                    }
				})
			})
		},
        handSelect(data) {
			this.companyAddress.customerID = data.customerID
			this.companyAddress.companyName = data.companyName
			this.companyAddress.contactName = data.contactName
			this.companyAddress.contactPhone = data.contactPhone
			this.handSelectedArea(areaIdToArrayId(data.companyAreaID))
		},
		clearSelect(){
			this.companyAddress.customerID = ''
            this.companyAddress.companyName =''
			this.companyAddress.contactName = ''
            this.companyAddress.contactPhone = ''
            this.selectedArea = []
		},
		handSelectedArea(data) {
			if (data) {
				this.companyAddress.areaID = data[data.length - 1]
				this.selectedArea = data
				data[1] && (this.selectedCity = distData[data[0]][data[1]])
			} else {
				this.companyAddress.areaID = ''
				this.selectedArea = []
				this.selectedCity = ''
			}
        },
        handSelectLocation(data) {
			this.companyAddress.locationLng = data.location.lng
			this.companyAddress.locationLat = data.location.lat
			this.companyAddress.locationAddress = data.name
		},
		handLocation() {
			this.isLocationVisible = true
		},
		getInfo() {
			const customerAddressID = this.$route.query.customerAddressID
			Company.customerAddressFindById({ customerAddressID }).then(res => {
				this.companyAddress = res
				this.handSelectedArea(areaIdToArrayId(res.areaID))
			})
		},
		callbackLocation(data) {
			if (data) {
				this.companyAddress.locationLng = data.location[0]
				this.companyAddress.locationLat = data.location[1]
				this.companyAddress.locationAddress = data.address
			}
			this.isLocationVisible = false
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				Company.customerAddressUpdate(this.companyAddress).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'companyaddress'})
				})
			})
		},
		back() {
			this.$router.push({name: 'companyaddress'})
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>