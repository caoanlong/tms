<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加货物</div>
			<el-row>
				<el-col :span="18" :offset="3">
					<el-form label-width="120px" :model="cargo" :rules="rules" ref="ruleForm" size="small">
						<el-form-item label="发货单位" prop="customerID">
							<el-autocomplete  style="width:100%"
								value-key="companyName" 
								v-model="cargo.shipperCompanyName"
								:fetch-suggestions="getShipperCompanys"
								placeholder="请输入..."
								@select="handSelectShipper">
								<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelectShipper"></i>
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="货物名称" prop="cargoName">
							<el-input v-model="cargo.cargoName" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="货物类型" prop="cargoType">
							<el-select style="width: 100%" placeholder="请选择" v-model="cargo.cargoType">
								<el-option label="快消品" value="FMCG"></el-option>
								<el-option label="水泥" value="Cement"></el-option>
								<el-option label="啤酒" value="Beer"></el-option>
								<el-option label="危险品" value="DangerousCargo"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="危险品类别" v-if="cargo.cargoType == 'DangerousCargo'" prop="dangerousCoodsCategory">
							<el-input v-model="cargo.dangerousCoodsCategory" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="包装单位" prop="cargoUnit">
							<el-select style="width:80%" placeholder="请选择" v-model="cargo.cargoUnit">
								<el-option v-for="item in units" :label="item.unit" :value="item.unit" :key="item.cargoUnitID"></el-option>
							</el-select>
							<el-button style="position:relative;left:10px" type="text" @click="dialogFormVisible = true">添加单位</el-button>
						</el-form-item>
						<el-form-item label="包装材质" prop="packageType">
							<el-select style="width: 100%" placeholder="请选择" v-model="cargo.packageType">
								<el-option label="纸质" value="纸质"></el-option>
								<el-option label="木质" value="木质"></el-option>
								<el-option label="铁质" value="铁质"></el-option>
								<el-option label="塑料" value="塑料"></el-option>
								<el-option label="玻璃" value="玻璃"></el-option>
								<el-option label="其他材料" value="其他材料"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="配载方式" prop="dispatchType">
							<el-select style="width: 100%" placeholder="请选择" v-model="cargo.dispatchType">
								<el-option label="体积" value="Volumn"></el-option>
								<el-option label="重量" value="Weight"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="防护要求" style="margin-bottom:0">
							<el-checkbox-group v-model="requires" @change="handleCheckedRequireChange">
								<el-checkbox label="moistureProof">防潮</el-checkbox>
								<el-checkbox label="waterProof">防水</el-checkbox>
								<el-checkbox label="quakeProof">防震</el-checkbox>
								<el-checkbox label="dropProof">防摔</el-checkbox>
								<el-checkbox label="antimagnetic">防磁</el-checkbox>
								<el-checkbox label="antiStatic">防静电</el-checkbox>
								<el-checkbox label="radiationProof">防辐射</el-checkbox>
							</el-checkbox-group>
							<el-checkbox v-model="checkAll" @change="handleCheckAllRequireChange">无要求</el-checkbox>
						</el-form-item>
						<el-form-item>
							<span @click="fold" class="foldIcon" >其他项 <svg-icon icon-class="arrow-down" class="icon" :class="{fold: isFold}"></svg-icon></span>
						</el-form-item>
						<el-form-item label="品名表名称" v-if="isFold" prop="productName">
							<el-input v-model="cargo.productName"></el-input>
						</el-form-item>
						<el-form-item label="CN编码" v-if="isFold" prop="cnCode">
							<el-input v-model="cargo.cnCode"></el-input>
						</el-form-item>
						<el-form-item label="UN编码" v-if="isFold" prop="unCode">
							<el-input v-model="cargo.unCode"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="add">保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
		<el-dialog title="添加货物单位" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="单位名称" label-width="80px">
					<el-input placeholder="请输入货物单位" auto-complete="off" v-model="unit"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="save">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Company from '../../../api/Company'
import { checkTel } from '../../../common/validator'
export default {
	data() {
		return {
			dialogFormVisible: false,
			unit: '',
			units: [],
			requires: [],
			checkAll: false,
			cargo: {
				customerID: '',
				shipperCompanyName: '',
				cargoName: '',
				cargoType: '',
				dangerousCoodsCategory: '',
				cargoUnit: '',
				packageType: '',
				moistureProof: 'N',
				waterProof: 'N',
				quakeProof: 'N',
				dropProof: 'N',
				antimagnetic: 'N',
				antiStatic: 'N',
				radiationProof: 'N',
				productName: '',
				cnCode: '',
				unCode: ''
			},
			isFold:false,
			rules: {
				customerID: [{required: true, message: '请选择发货单位'}],
				cargoName: [{required: true, message: '请输入货物名称'}, {min: 1, max: 20, message: '长度在 1 到 20 个字符'}],
				cargoType: [{required: true, message: '请选择货物类型'}],
				dangerousCoodsCategory: [{required: true, message: '请输入危险品类别'}],
				cargoUnit: [{required: true, message: '请选择货物单位'}],
				packageType: [{required: true, message: '请选择包装类型'}],
				dispatchType: [{required: true, message: '请选择配载方式'}],
				productName: [{min: 1, max: 20, message: '长度在 1 到 20 个字符'}],
				cnCode: [{min: 1, max: 20, message: '长度在 1 到 20 个字符'}],
				unCode: [{min: 1, max: 20, message: '长度在 1 到 20 个字符'}]
			}
		}
	},
	created() {
		this.getUnitList()
	},
	methods: {
		handleCheckAllRequireChange(val) {
			if (val) {
				this.requires = []
				this.cargo.moistureProof = 'N'
				this.cargo.waterProof = 'N'
				this.cargo.quakeProof = 'N'
				this.cargo.dropProof = 'N'
				this.cargo.antimagnetic = 'N'
				this.cargo.antiStatic = 'N'
				this.cargo.radiationProof = 'N'
			}
		},
		handleCheckedRequireChange(value) {
			this.cargo.moistureProof = 'N'
			this.cargo.waterProof = 'N'
			this.cargo.quakeProof = 'N'
			this.cargo.dropProof = 'N'
			this.cargo.antimagnetic = 'N'
			this.cargo.antiStatic = 'N'
			this.cargo.radiationProof = 'N'
			this.checkAll = false
			this.requires.forEach(item => {
				this.cargo[item] = 'Y'
			})
		},
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				const data = Object.assign({}, this.cargo)
				if (!data.customerID) data.customerID = 1
				Company.cargo().add(data).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'cargo'})
				})
			})
		},
		getShipperCompanys(queryString, cb) {
			this.cargo.customerID = ''
			Company.customer().suggest({
				customerType: 'Shipper',
				companyName: queryString
			}).then(res => { cb(res) })
		},
		handSelectShipper(data){
			this.cargo.customerID = data.customerID
			this.cargo.shipperCompanyName = data.companyName
		},
		clearSelectShipper(){
			this.cargo.customerID = ''
			this.cargo.shipperCompanyName = ''
		},
		getUnitList() {
			Company.cargoUnit().find({
				current: 1,
				size: 1000
			}).then(res => {
				this.units = res.records
			})
		},
		save(){
			Company.cargo().add(this.cargo).then(res => {
				Message.success('保存成功！')
				this.$router.push({name: 'cargo'})
			})
		},
		fold(){
			this.isFold = !this.isFold
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>
.foldIcon
	cursor pointer
	color #409EFF
	user-select none
	.icon
		transition all .3s
		color #409EFF
		font-size 10px
		&.fold
			transform rotate(-180deg)
			
</style>