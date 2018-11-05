<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">货物详情</div>
			<el-row>
				<el-col :span="18" :offset="3">
					<el-form label-width="120px"  size="small">
						<el-form-item label="发货单位">
							<p>{{cargo.shipperCompanyName}}</p>
						</el-form-item>
						<el-form-item label="货物名称">
							<p>{{cargo.cargoName}}</p>
						</el-form-item>
						<el-form-item label="货物类型" prop="cargoType">
							<p>
								<span v-if="cargo.cargoType=='FMCG'">快消品</span>
								<span v-if="cargo.cargoType=='Cement'">水泥</span>
								<span v-if="cargo.cargoType=='Beer'">啤酒</span>
								<span v-if="cargo.cargoType=='DangerousCargo'">危险品</span>
							</p>
						</el-form-item>
						<el-form-item label="危险品类别" v-if="cargo.cargoType == 'DangerousCargo'">
							<p>{{cargo.dangerousCoodsCategory}}</p>
						</el-form-item>
						<el-form-item label="包装单位" prop="cargoUnit">
							<p>{{cargo.cargoUnit}}</p>
						</el-form-item>
						<el-form-item label="包装材质" prop="packageType">
							<p>{{cargo.packageType}}</p>
						</el-form-item>
						<el-form-item label="配载方式" prop="packageType">
							<p v-if="cargo.dispatchType == 'Volumn'">体积</p>
							<p v-else-if="cargo.dispatchType == 'Weight'">重量</p>
						</el-form-item>
						<el-form-item label="防护要求">
							<p v-if="cargo.moistureProof=='Y' 
								|| cargo.waterProof=='Y' 
								|| cargo.quakeProof=='Y' 
								|| cargo.dropProof=='Y' 
								|| cargo.antimagnetic=='Y' 
								|| cargo.antiStatic=='Y' 
								|| cargo.radiationProof=='Y'">
								<span v-if="cargo.moistureProof=='Y'">防潮</span>
								<span v-if="cargo.waterProof=='Y'">防水</span>
								<span v-if="cargo.quakeProof=='Y'">防震</span>
								<span v-if="cargo.dropProof=='Y'">防摔</span>
								<span v-if="cargo.antimagnetic=='Y'">防磁</span>
								<span v-if="cargo.antiStatic=='Y'">防静电</span>
								<span v-if="cargo.radiationProof=='Y'">防辐射</span>
							</p>
							<p v-else>无要求</p>
						</el-form-item>
						<el-form-item label="品名表名称"  prop="productName">
							<p>{{cargo.productName}}</p>
						</el-form-item>
						<el-form-item label="CN编码"  prop="cnCode">
							<p>{{cargo.cnCode}}</p>
						</el-form-item>
						<el-form-item label="UN编码"  prop="unCode">
							<p>{{cargo.unCode}}</p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Company from '../../../api/Company'
export default {
	data() {
		return {
			cargo: {}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const cargoNameID = this.$route.query.cargoID
			Company.cargoFindById({ cargoNameID }).then(res => {
				this.cargo = res
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 32px
		font-family 'sans-serif'
		line-height 32px
		color #999
	.el-input__inner
		vertical-align top		
</style>