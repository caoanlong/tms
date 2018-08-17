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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="add">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import Customer from '../../../../api/Customer'
import CustomerAddress from '../../../../api/CustomerAddress'
import distData from '../../../../assets/data/distpicker.data'
import { searchLocationByCity } from '../../../../common/utils'
import Geohash from '../../../../common/Geohash'
import CrossProxy from '../../../../api/CrossProxy'
import { checkTel } from '../../../../common/validator'
import DistPicker from '../../../CommonComponents/DistPicker2'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        customerID: String,
        companyName: String
    },
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
			rules: {
				customerID: [{required: true, message: '请输入所属企业'}],
				contactName: [{required: true, message: '请输入联系人'}, {min: 1, max: 20, message: '长度在 1 到 20 个字符'}],
                contactPhone: [{required: true, message: '请输入电话'}, {validator: checkTel}],
				areaID: [{ required: true, message: '请选择区域', trigger: 'change' }],
				locationAddress: [{required: true, message: '请输入定位地址'}],
				detailAddress: [{min: 1, max: 50, message: '长度在 1 到 50 个字符'}]
			}
        }
    },
    watch: {
        customerID(newVal) {
            if (newVal) {
                this.companyAddress.customerID = newVal
            } else {
                this.companyAddress.customerID = ''
            }
        },
        companyName(newVal) {
            if (newVal) {
                this.companyAddress.companyName = newVal
            } else {
                this.companyAddress.companyName = ''
            }
        }
    },
    components: { DistPicker },
    methods: {
        getCompanys(queryString, cb) {
			Customer.suggest({
				companyName: queryString
			}).then(res => {
				cb(res)
			})
        },
        handSelect(data){
			this.companyAddress.customerID = data.customerID
			this.companyAddress.companyName = data.companyName
		},
		handleSelectedArea(data) {
			if (data) {
				this.companyAddress.areaID = data[data.length - 1]
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
