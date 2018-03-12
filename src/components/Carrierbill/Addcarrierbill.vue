<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加承运单</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="托运人">
							<el-input placeholder="托运人"></el-input>
						</el-form-item>
						<el-form-item label="发货人">
							<el-input placeholder="发货人"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="承运人">
							<el-input placeholder="承运人"></el-input>
						</el-form-item>
						<el-form-item label="发货单号">
							<el-input placeholder="发货单号"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="发货单位">
							<el-input placeholder="发货单位"></el-input>
						</el-form-item>
						<el-form-item label="发货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择发货时间"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="委托时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择委托时间"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="120px">
						<el-form-item label="发货地">
							<el-cascader style="width: 100%" :options="distData" v-model="selectedAreas">
							</el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="发货详细地址"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="收货单位">
							<el-input placeholder="收货单位"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="收货人">
							<el-input placeholder="收货人"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="到货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择到货时间"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="运输方式">
							<el-select v-model="value" placeholder="请选择" style="width:100%">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="120px">
						<el-form-item label="卸货地">
							<el-cascader style="width: 100%" :options="distData" v-model="selectedAreas">
							</el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="卸货详细地址"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="货物信息">
							<el-dropdown trigger="click">
								<el-button type="default" size="small">添加货物<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>添加重货</el-dropdown-item>
									<el-dropdown-item>添加轻货</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-form-item>
						<el-form-item label="承运单应收款">
							<el-radio-group>
								<el-radio label="按吨公里自动生成"></el-radio>
								<el-radio label="手动输入"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="付款费用">
							<el-radio-group>
								<el-radio label="按吨公里自动生成"></el-radio>
								<el-radio label="手动输入"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="发票">
							<el-radio-group>
								<el-radio label="开发票"></el-radio>
								<el-radio label="不开发票"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="回单要求">
							<el-checkbox-group>
								<el-checkbox label="货物托运单" name="type"></el-checkbox>
								<el-checkbox label="发货单文件" name="type"></el-checkbox>
								<el-checkbox label="不需要回单" name="type"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button type="primary">提交</el-button>
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
// import { regionData } from 'element-china-area-data'
export default {
	data() {
		return {
			// distData: regionData,
			selectedAreas: [],
		}
	},
	created() {

	},
	methods: {

		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>


</style>
