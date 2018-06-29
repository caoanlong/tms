<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">编辑收发货单位</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="recdeliverycomp" :rules="rules" ref="ruleForm" size="mini">
						<el-form-item label="公司名称" prop="companyName">
							<el-input v-model="recdeliverycomp.companyName"></el-input>
						</el-form-item>
						<el-form-item label="地区" prop="companyAreaID">
							<DistPicker :selected="selectedArea" @selectChange="handleSelectedArea"/>
						</el-form-item>
						<el-form-item label="详细地址" prop="detailAddress">
							<el-input v-model="recdeliverycomp.detailAddress"></el-input>
						</el-form-item>
						<el-form-item label="位置" prop="locationAddress">
							<el-autocomplete  style="width:100%"
								value-key="name" 
								v-model="recdeliverycomp.locationAddress"
								:fetch-suggestions="getLocation"
								placeholder="请输入内容"
								@select="handSelectLocation">
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input v-model="recdeliverycomp.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系方式">
							<el-input v-model="recdeliverycomp.contactPhone"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="edit">立即保存</el-button>
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
import Customer from '../../api/Customer'
import BaiduMap from '../../api/BaiduMap'
import { searchAreaByKey, areaIdToArrayId } from '../../common/utils'
import DistPicker from '../CommonComponents/DistPicker'
export default {
	data() {
		return {
			recdeliverycomp: {
				companyAreaID: '',
				companyName: '',
				contactName: '',
				contactPhone: '',
				detailAddress: '',
				locationAddress: '',
				locationLng: '',
				locationLat: '',
			},
			selectedArea: [],
			rules: {
				companyName: [
					{required: true, message: '请输入名称', trigger: 'blur'}
				],
				companyAreaID: [
					{ required: true, message: '请选择区域', trigger: 'change' }
				],
				detailAddress: [
					{required: true, message: '请输入详细地址', trigger: 'blur'}
				],
				// locationAddress: [
				// 	{required: true, message: '请输入位置', trigger: 'blur'}
				// ]
			}
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		handleSelectedArea(data) {
			this.recdeliverycomp.companyAreaID = data
			this.recdeliverycomp.companyArea = searchAreaByKey(data)
		},
		handSelectLocation(data) {
			this.recdeliverycomp.locationLng = data.location.lng
			this.recdeliverycomp.locationLat = data.location.lat
		},
		getLocation(queryString, cb) {
			BaiduMap.getLocation({
				region: this.recdeliverycomp.companyArea,
				queryString
			}).then(res => {
				let names = res.name.map((item, i) => { 
					return { 
						name: item,
						location: res.location[i]
					} 
				})
				cb(names)
			}).catch(err => {
				cb(err)
			})
		},
		getDetail() {
			let customerID = this.$route.query.customerID
			Customer.findById({ customerID }).then(res => {
				this.recdeliverycomp = res
				this.selectedArea = areaIdToArrayId(String(res.companyAreaID))
			})
		},
		edit() {
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					let customerID = this.$route.query.customerID
					Customer.update({
						customerID,
						companyAreaID: this.recdeliverycomp.companyAreaID,
						companyName: this.recdeliverycomp.companyName,
						contactName: this.recdeliverycomp.contactName,
						contactPhone: this.recdeliverycomp.contactPhone,
						detailAddress: this.recdeliverycomp.detailAddress,
						locationAddress: this.recdeliverycomp.locationAddress || '云南昆明',
						locationLng: this.recdeliverycomp.locationLng || 25.05,
						locationLat: this.recdeliverycomp.locationLat || 102.72,
					}).then(res => {
						Message.success('保存成功！')
						this.$router.push({name: 'recdeliverycomp'})
					})
				} else {
					return
				}
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		DistPicker
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