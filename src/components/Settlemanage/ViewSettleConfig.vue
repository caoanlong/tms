<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">查看运费模板</div>
			<el-row>
				<div class="split-item">
					<span class="num">1</span>
					<span class="tit">配置运算项</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="托运人" style="flex: 1">
							<p>{{templateFreight.consigner}}</p>
						</el-form-item>
						<el-form-item style="flex: 1"></el-form-item>
						<el-form-item style="flex: 1"></el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p style="text-align: center; color: #bfcbd9;">------ 从哪 ------</p>
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="发货单位" style="flex: 1">
							<p>{{templateFreight.consigneCompany}}</p>
						</el-form-item>
						<el-form-item label="发货地" style="flex: 1">
							<el-cascader
								disabled
								style="width: 100%"
								:options="distData"
								v-model="selectedConsigneAreas"
								@change="handleDistChange1">
							</el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<p>{{templateFreight.consigneAddress}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p style="text-align: center; color: #bfcbd9;">------ 到哪 ------</p>
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="收货单位" style="flex: 1">
							<p>{{templateFreight.receiveCompany}}</p>
						</el-form-item>
						<el-form-item label="收货地" style="flex: 1">
							<el-cascader
								disabled 
								style="width: 100%"
								:options="distData"
								v-model="selectedReceiveAreas" 
								@change="handleDistChange2">
							</el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<p>{{templateFreight.receiveAddress}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p style="text-align: center; color: #bfcbd9;">------ 对内 ------</p>
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="对内运距" style="flex: 1">
							<p>{{templateFreight.innerDistance}}</p>
						</el-form-item>
						<el-form-item label="对内TKM" style="flex: 1">
							<p>{{templateFreight.innerTKM}}</p>
						</el-form-item>
						<el-form-item placeholder="请输入..." label="对内运费" style="flex: 1">
							<p>{{templateFreight.innerFreight}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p style="text-align: center; color: #bfcbd9;">------ 对外 ------</p>
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="对外运距" style="flex: 1">
							<p>{{templateFreight.externalDistance}}</p>
						</el-form-item>
						<el-form-item placeholder="请输入..." label="对外TKM" style="flex: 1">
							<p>{{templateFreight.externalTKM}}</p>
						</el-form-item>
						<el-form-item placeholder="请输入..." label="对外运费" style="flex: 1">
							<p>{{templateFreight.externalFreight}}</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">2</span>
					<span class="tit">配置收费方式</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<p style="text-align: center; color: #bfcbd9;">------ 对内付款方式占比 ------</p>
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="现付" style="flex: 1">
							<p>{{templateFreight.payNow1}}</p>
						</el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<p>{{templateFreight.payArrived1}}</p>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<p>{{templateFreight.payReturn1}}</p>
						</el-form-item>
						<el-form-item label="月结" style="flex: 1">
							<p>{{templateFreight.settleMonth1}}</p>
						</el-form-item>
						<el-form-item label="收方到货付" style="flex: 1">
							<p>{{templateFreight.payArrivedRec1}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<p style="text-align: center; color: #bfcbd9;">------ 对外收款方式占比 ------</p>
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="现付" style="flex: 1">
							<p>{{templateFreight.payNow2}}</p>
						</el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<p>{{templateFreight.payArrived2}}</p>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<p>{{templateFreight.payReturn2}}</p>
						</el-form-item>
						<el-form-item label="月结" style="flex: 1">
							<p>{{templateFreight.settleMonth2}}</p>
						</el-form-item>
						<el-form-item label="收方到货付" style="flex: 1">
							<p>{{templateFreight.payArrivedRec2}}</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="space-around">
				<el-col :span="12">
					<el-form label-width="120px">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/javascript">
import { regionData } from 'element-china-area-data'
export default {
	data() {
		return {
			distData: regionData,
			selectedConsigneAreas: ['530000','530100','530102'],
			selectedReceiveAreas: ['530000','532500','532503'],
			templateFreight: {
				consigner: '武藤兰',
				consigneCompany: '安化',
				consigneArea: '530000,530100,530102',
				consigneAddress: '安化工厂',
				receiveCompany: '红河厂',
				receiveArea: '530000,532500,532503',
				receiveAddress: '蒙自小东山',
				innerDistance: '336',
				innerTKM: '0.96',
				innerFreight: '322.56',
				externalDistance: '345',
				externalTKM: '1.14',
				externalFreight: '393',
				payNow1: '10%',
				payArrived1: '20%',
				payReturn1: '15%',
				settleMonth1: '15%',
				payArrivedRec1: '40%',
				payNow2: '30%',
				payArrived2: '25%',
				payReturn2: '5%',
				settleMonth2: '20%',
				payArrivedRec2: '20%'
			},
			consignerResource: [
				{ "value": "武藤兰"},
				{ "value": "泷泽萝拉"},
				{ "value": "佐伯奈"},
				{ "value": "苍井空"},
				{ "value": "波多野结衣"}
			]
		}
	},
	created() {
	},
	methods: {
		handleDistChange1(val) {
			console.log('active item:', val)
			this.templateFreight.consigneArea = val.join(',')
		},
		handleDistChange2(val) {
			console.log('active item:', val)
			this.templateFreight.receiveArea = val.join(',')
		},
		back() {
			this.$router.go(-1)
		}
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
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
		font-size 12px
</style>