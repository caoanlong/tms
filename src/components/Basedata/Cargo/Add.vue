<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加货物</div>
			<el-row>
				<el-col :span="18" :offset="3">
					<el-form label-width="120px" :model="cargo" :rules="rules" ref="ruleForm" size="small">
						<el-form-item label="所属客户">
							<el-autocomplete  style="width:100%"
								value-key="companyName" 
								v-model="cargo.shipperCompanyName"
								:fetch-suggestions="getShipperCompanys"
								placeholder="请输入..."
								@select="handSelectShipper">
								<i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelectShipper"></i>
							</el-autocomplete>
						</el-form-item>
                        <el-form-item label="货物编号" prop="code">
							<el-input v-model="cargo.code" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="货物名称" prop="cargoName">
							<el-input v-model="cargo.cargoName" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="货物类型" prop="cargoType">
							<el-select style="width: 100%" placeholder="请选择" v-model="cargo.cargoType">
								<el-option 
									:label="key" 
									:value="value" 
									v-for="(key, value) in CARGOTYPES" 
									:key="key">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="单位" prop="cargoUnit">
                            <div style="padding-right:60px; position: relative;">
                                <el-select placeholder="请选择" v-model="cargo.cargoUnit" style="width:100%">
                                    <el-option v-for="item in units" :label="item.unit" :value="item.unit" :key="item.cargoUnitID"></el-option>
                                </el-select>
                                <el-button style="position:absolute;right:0;top:0" type="text" @click="dialogFormVisible = true">添加单位</el-button>
                            </div>
							
						</el-form-item>
						<el-form-item label="重量">
							<el-input v-model="cargo.weight" placeholder="0"><template slot="append">公斤</template></el-input>
						</el-form-item>
						<el-form-item label="体积">
							<el-input v-model="cargo.volume" placeholder="0"><template slot="append">立方</template></el-input>
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
			<el-form :model="unit" :rules="rules1" ref="ruleForm1">
				<el-form-item label="名称" label-width="80px" prop="unit">
					<el-input placeholder="请输入货物单位" v-model="unit.unit"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveCargo">确 定</el-button>
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
			unit: { unit: ''},
			units: [],
			checkAll: false,
			cargo: {
				customerID: '',
				shipperCompanyName: '',
				cargoName: '',
				cargoType: 'Cement',
				cargoUnit: '',
                code: '',
                dispatchType:'Weight',
                weight:'',
                volume:''
			},
			rules: {
				code: [{required: true, message: '请输入货物编号'}],
				cargoName: [{required: true, message: '请输入货物名称'}, {min: 1, max: 20, message: '长度在 1 到 20 个字符'}],
				cargoType: [{required: true, message: '请选择货物类型'}],
				cargoUnit: [{required: true, message: '请选择货物单位'}],
				dispatchType: [{required: true, message: '请选择配载方式'}]
			},
			rules1: {
				unit: [{required: true, message: '请输入货物单位'}, {min: 1, max: 20, message: '长度在 1 到 20 个字符'}]
			}
		}
	},
	created() {
		this.getUnitList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.cargo = {
				customerID: '',
				shipperCompanyName: '',
				cargoName: '',
				cargoType: 'Cement',
				cargoUnit: '',
                code: '',
                dispatchType:'Weight',
                weight:'',
                volume:''
			}
        }
        if(this.$refs['ruleForm']) {
            this.$refs['ruleForm'].resetFields()
        }
    },
	methods: {
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				const data = Object.assign({}, this.cargo)
				if (!data.customerID) data.customerID = 1
				Company.cargoAdd(data).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'cargo'})
				})
			})
		},
		getShipperCompanys(queryString, cb) {
			this.cargo.customerID = ''
			Company.customerSuggest({
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
			Company.cargoUnitFind({
				current: 1,
				size: 1000
			}).then(res => {
				this.units = res.records
			})
		},
		saveCargo() {
			this.$refs['ruleForm1'].validate(valid => {
				if (!valid) return
				Company.cargoUnitAdd({
					unit: this.unit.unit
				}).then(res => {
					this.dialogFormVisible = false
					this.unit.unit = ''
					this.getUnitList()
					Message.success('保存成功！')
				})
			})
		},
		back() {
			this.$router.push({name: 'cargo'})
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