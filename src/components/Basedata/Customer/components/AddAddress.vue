<template>
    <div>
        <el-dialog 
            title="添加监控地址" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="500px">
            <el-form 
                label-width="120px" 
                :model="customerAddress" 
                :rules="rules" 
                ref="ruleForm" 
                size="small">
                <el-row>
                    <el-col>
						<el-form-item label="联系人">
							<el-input v-model="customerAddress.contactName" placeholder="请输入..."></el-input>
						</el-form-item>
                        <el-form-item label="联系电话">
							<el-input v-model="customerAddress.contactPhone" placeholder="请输入..."></el-input>
						</el-form-item>
						<el-form-item label="所在区域" prop="areaID">
							<dist-picker :distList="selectedAddressArea" @hand-select="handSelectedAddressArea"></dist-picker>
						</el-form-item>
						<el-form-item label="定位地址" prop="locationAddress">
                            <el-autocomplete  style="width:100%"
                                value-key="name" 
                                prefix-icon="el-icon-location"
                                v-model="customerAddress.locationAddress"
                                :fetch-suggestions="getLocation"
                                placeholder="请输入..."
                                @select="handSelectLocation">
								<template slot="append">
									<div style="cursor:pointer" @click="handLocation">手动定位</div>
								</template>
                            </el-autocomplete>
                        </el-form-item>
						<el-form-item label="门牌信息" prop="detailAddress">
							<el-input v-model="customerAddress.detailAddress" placeholder="如：十字路口左边22栋301室"></el-input>
						</el-form-item>
                        <el-form-item label="围栏范围" prop="monitorScope">
							<el-input v-model="customerAddress.monitorScope" placeholder="请输入围栏范围"><template slot="append">米</template></el-input>
						</el-form-item>
                        <el-form-item label="地址编号">
							<el-input v-model="customerAddress.code" placeholder="请输入地址编号"></el-input>
						</el-form-item>
				    </el-col>
			    </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close(false)">取 消</el-button>
                <el-button type="primary" @click="close(true)">确 定</el-button>
            </span>
        </el-dialog>
        <select-location 
			v-if="isLocationVisible" 
			:location="[customerAddress.locationLng, customerAddress.locationLat]" 
			:selectedCity="selectedCity"
			:locAddress="customerAddress.locationAddress" 
			:callback="callbackLocation">
		</select-location>
    </div>
</template>

<script>
import distData from '../../../../assets/data/distpicker.data'
import DistPicker from '../../../CommonComponents/DistPicker'
import SelectLocation from '../../../CommonComponents/SelectLocation'
import { checkTel, checkFloat2 } from '../../../../common/valid'
export default {
    components: { DistPicker, SelectLocation },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        callback: Function
    },
    data() {
        return {
            isLocationVisible: false,
            selectedCity: '',
            selectedAddressArea: [],
            customerAddress: {
                areaID: '',
                contactName: '',
				contactPhone: '',
				detailAddress: '',
				locationLng: '',
				locationLat: '',
                locationAddress: '',
                monitorScope:'',
                code: ''
            },
            rules: {
				areaID: [{ required: true, message: '请选择区域', trigger: 'change' }],
				locationAddress: [{required: true, message: '请输入定位地址'}],
                detailAddress: [{min: 1, max: 50, message: '长度在 1 到 50 个字符'}],
                monitorScope: [
                    {required: true, message: '请输入围栏范围'},
                    {validator: checkFloat2}
                ]
			}
        }
    },
    methods: {
        handSelectedAddressArea(data) {
			if (data) {
				this.customerAddress.areaID = data[data.length - 1]
				this.selectedAddressArea = data
				data[1] && (this.selectedCity = distData[data[0]][data[1]])
			} else {
				this.customerAddress.areaID = ''
				this.selectedAddressArea = []
				this.selectedCity = ''
			}
        },
        handSelectLocation(data) {
			this.customerAddress.locationLng = data.location.lng
			this.customerAddress.locationLat = data.location.lat
			this.customerAddress.locationAddress = data.name
        },
        handLocation() {
			this.isLocationVisible = true
        },
        callbackLocation(data) {
			if (data) {
				this.customerAddress.locationLng = data.location[0]
				this.customerAddress.locationLat = data.location[1]
				this.customerAddress.locationAddress = data.address
			}
			this.isLocationVisible = false
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
        reset() {
            this.selectedCity = ''
            this.selectedAddressArea = []
            this.customerAddress = {
                areaID: '',
                contactName: '',
				contactPhone: '',
				detailAddress: '',
				locationLng: '',
				locationLat: '',
                locationAddress: '',
                monitorScope:'',
                code: ''
            }
            this.$refs['ruleForm'].resetFields()
        },
        close(bool) {
            if (bool) {
                this.$refs['ruleForm'].validate(valid => {
                    if (!valid) return
                    const customerAddress = Object.assign({}, this.customerAddress)
                    this.callback(customerAddress)
                })
            } else {
                this.callback()
            }
            this.reset()
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
