<template>
    <div>
        <el-dialog 
            title="新增地址" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
            <el-form label-width="120px" :model="companyAddress" :rules="rules" ref="ruleForm" size="small">
                <el-form-item label="所属企业" prop="customerID">
                    <el-autocomplete  style="width:100%" 
                        :disabled="!!(companyAddress.customerID && companyAddress.companyName)"
                        value-key="companyName" 
                        v-model="companyAddress.companyName"
                        :fetch-suggestions="getCompanys"
                        placeholder="请输入..."
                        @select="handSelect">
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="companyAddress.contactName" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="companyAddress.contactPhone" placeholder="请输入..."></el-input>
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
                    <el-input v-model="companyAddress.monitorScope" placeholder="请输入围栏范围"><template slot="append">米</template></el-input>
                </el-form-item>
                <el-form-item label="地址编号">
                    <el-input v-model="companyAddress.code" placeholder="请输入地址编号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="add">确定</el-button>
            </div>
        </el-dialog>
        <select-location 
			v-if="isLocationVisible" 
			:location="[companyAddress.locationLng, companyAddress.locationLat]" 
            :selectedCity="selectedCity" 
			:locAddress="companyAddress.locationAddress" 
			:callback="callbackLocation">
		</select-location>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import Company from '../../../../api/Company'
import distData from '../../../../assets/data/distpicker.data'
import { checkTel, checkFloat2 } from '../../../../common/valid'
import DistPicker from '../../../CommonComponents/DistPicker'
import SelectLocation from '../../../CommonComponents/SelectLocation'
import { areaIdToArrayId } from '../../../../common/utils'
export default {
    components: { DistPicker, SelectLocation },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        company: Object
    },
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
				customerID: [{required: true, message: '请输入所属企业'}],
				areaID: [{ required: true, message: '请选择区域', trigger: 'change' }],
				locationAddress: [{required: true, message: '请输入定位地址'}],
                detailAddress: [{min: 1, max: 50, message: '长度在 1 到 50 个字符'}],
                monitorScope: [{validator: checkFloat2}]
			}
        }
    },
    watch: {
        isVisible(bool) {
            this.selectedArea = []
            this.selectedCity = ''
            this.companyAddress.customerID = ''
            this.companyAddress.companyName = ''
            if (bool) {
                this.companyAddress.customerID = this.company ? this.company.customerID : ''
                this.companyAddress.companyName = this.company ? this.company.companyName : ''
                this.companyAddress.contactName = this.company ? this.company.contactName : ''
                this.companyAddress.contactPhone = this.company ? this.company.contactPhone : ''
                this.companyAddress.locationAddress = this.company ? this.company.locationAddress : ''
                this.companyAddress.code = this.company ? this.company.code : ''
                this.$nextTick(() => {
                    if (this.company) this.handSelectedArea(areaIdToArrayId(this.company.companyAreaID))
                })
            }
        }
    },
    methods: {
        getCompanys(queryString, cb) {
			Company.customerSuggest({
				companyName: queryString
			}).then(res => { cb && cb(res) })
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
        handSelect(data){
			this.companyAddress.customerID = data.customerID
			this.companyAddress.companyName = data.companyName
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
            this.companyAddress.locationLng = 0
			this.companyAddress.locationLat = 0
            this.isLocationVisible = true
        },
        callbackLocation(data) {
			if (data) {
				this.companyAddress.locationLng = data.location[0]
				this.companyAddress.locationLat = data.location[1]
				this.companyAddress.locationAddress = data.address
			}
			this.isLocationVisible = false
		},
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				Company.customerAddressAdd(this.companyAddress).then(res => {
                    Message.success('保存成功！')
                    this.close()
				})
			})
        },
        close() {
            this.$refs['ruleForm'].resetFields()
            this.$emit('control')
        }
    }
}
</script>
