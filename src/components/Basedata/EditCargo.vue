<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">编辑常用货物</div>
			<el-form label-width="120px" ref="ruleForm" size="small">
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item label="发货单位">
							<el-autocomplete value-key="companyName" 
							:fetch-suggestions="getRecdeliverycomp" 
							placeholder="请输入发货单位" 
							@select="handSelectShipper" style="width:100%"></el-autocomplete>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item label="货物名称" prop="companyName">
							<el-input :maxlength="100"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item label="货物类型">
							<el-select style="width: 100%" placeholder="请选择货物类型">
								<el-option label="快消品" value="1"></el-option>
								<el-option label="炸药危险品" value="2"></el-option>
								<el-option label="水泥" value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item label="危险品类别">
							<el-input :maxlength="100"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item label="发货包装单位" prop="companyName">
							<el-select style="width: 100%" placeholder="请选择发货包装单位">
								<el-option label="箱" value="1"></el-option>
								<el-option label="袋" value="2"></el-option>
								<el-option label="捆" value="3"></el-option>
								<el-option label="发" value="4"></el-option>
								<el-option label="件" value="5"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label-width="15px">
							<el-button type="text" @click="addUnit">添加单位</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item label="包装类型">
							<el-select style="width: 100%" placeholder="请选择包装类型">
								<el-option label="纸质" value="1"></el-option>
								<el-option label="木质" value="2"></el-option>
								<el-option label="铁质" value="3"></el-option>
								<el-option label="塑料" value="4"></el-option>
								<el-option label="玻璃" value="5"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item label="防护要求" style="margin-bottom:0">
							<el-checkbox-group class="customerCheckbox">
								<el-checkbox label="防潮"></el-checkbox>
								<el-checkbox label="防水"></el-checkbox>
								<el-checkbox label="防震"></el-checkbox>
								<el-checkbox label="防摔"></el-checkbox>
								<el-checkbox label="防磁"></el-checkbox>
								<el-checkbox label="防静电"></el-checkbox>
								<el-checkbox label="防辐射"></el-checkbox>
								<el-checkbox label="无要求"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item>
							<span @click="fold" class="foldIcon" >其他项 <svg-icon icon-class="arrow-down" class="icon" :class="{fold: isFold}"></svg-icon></span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="isFold">
					<el-col :span="14" :offset="5">
						<el-form-item label="品名表名称">
							<el-input></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="isFold">
					<el-col :span="14" :offset="5">
						<el-form-item label="CN编码">
							<el-input></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="isFold">
					<el-col :span="14" :offset="5">
						<el-form-item label="UN编码" prop="contactPhone">
							<el-input></el-input>
						</el-form-item>
					</el-col>	
				</el-row>
				<el-row>
					<el-col :span="14" :offset="5">
						<el-form-item>
							<el-button type="primary" @click="add">保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Customer from '../../api/Customer'
import DistPicker from '../CommonComponents/DistPicker'
import { checkTel } from '../../common/validator'
export default {
	data() {
		return {
			recdeliverycomp: {},
			isFold:false
		}
	},
	methods: {
		handleSelectedArea(data) {
			this.shipper.companyAreaID = data
		},
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					Customer.add({
					}).then(res => {
						Message.success('保存成功！')
						this.$router.push({name: 'shipper'})
					})
				} else {
					return
				}
			})
		},
		getRecdeliverycomp(queryString, cb) {
			Customer.find({
				type: 'ShipperConsignee',
			}).then(res => {
				cb(res.records)
			})
		},
		handSelectShipper(data){
			this.recdeliverycomp.companyName = data.companyName
			this.recdeliverycomp.customerID = data.customerID
		},
		addUnit(){

		},
		fold(){
			this.isFold = !this.isFold
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