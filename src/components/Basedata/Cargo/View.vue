<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">货物详情</div>
			<el-row>
				<el-col :span="18" :offset="3">
					<el-form label-width="120px"  size="small">
						<el-form-item label="所属客户">
							<p>{{cargo.shipperCompanyName}}</p>
						</el-form-item>
                        <el-form-item label="货物编号">
							<p>{{cargo.code}}</p>
						</el-form-item>
						<el-form-item label="货物名称">
							<p>{{cargo.cargoName}}</p>
						</el-form-item>
						<el-form-item label="货物类型">
							<p>{{CARGOTYPES[cargo.cargoType]}}</p>
						</el-form-item>
						<el-form-item label="单位" prop="cargoUnit">
							<p>{{cargo.cargoUnit}}</p>
						</el-form-item>
						<el-form-item label="重量" prop="packageType">
							<p>{{cargo.weight}}</p>
						</el-form-item>
						<el-form-item label="体积" prop="packageType">
							<p>{{cargo.volume}}</p>
						</el-form-item>
						<el-form-item label="配载方式" prop="packageType">
							<p v-if="cargo.dispatchType == 'Volume'">体积</p>
							<p v-else-if="cargo.dispatchType == 'Weight'">重量</p>
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
	activated() {
		if(!this.$route.query.cache) {
			this.getInfo()
		}
	},
	methods: {
		getInfo() {
			const cargoNameID = this.$route.query.cargoID
			Company.cargoFindById({ cargoNameID }).then(res => {
				this.cargo = res
			})
		},
		back() {
			this.$router.push({name: 'cargo'})
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