<template>
	<div class="main-content">
		<el-card class="box-card hasTit">
			<div slot="header" class="clearfix">承运单编号 <span class="CarrierNum">{{$route.query.CarrierNum}}</span><span>创建时间：{{carrierbillInfo.CreatedDate}}</span><span>发货单号：{{carrierbillInfo.ConsignNum}}</span><span>委托时间：{{carrierbillInfo.CommissionDate}}</span>
				<span class="status status1" v-if="carrierbillInfo.Status =='待执行'">待执行</span>
				<span class="status status2" v-else-if="carrierbillInfo.Status =='执行中'">执行中</span>
				<span class="status status3" v-else-if="carrierbillInfo.Status =='已签收'">已签收</span>
			</div>
			<el-row>
				<div class="split-item">
					<span class="num">1</span>
					<span class="tit">基本信息</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="托运人">
							<el-input placeholder="托运人" v-model="carrierbillInfo.Consignor"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="承运人">
							<el-input placeholder="承运人" v-model="carrierbillInfo.Carrier"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">2</span>
					<span class="tit">收发货信息</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="发货单位">
							<el-input placeholder="发货单位" v-model="carrierbillInfo.ConsignerCompany"></el-input>
						</el-form-item>
						<el-form-item label="发货人">
							<el-input placeholder="发货人" v-model="carrierbillInfo.Consigner"></el-input>
						</el-form-item>
						<el-form-item label="发货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择发货时间" v-model="carrierbillInfo.DeliveryDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="委托时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择委托时间" v-model="carrierbillInfo.CommissionDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="发货单号">
							<el-input placeholder="发货单号" v-model="carrierbillInfo.ConsignNum"></el-input>
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
							<el-input placeholder="发货详细地址" v-model="carrierbillInfo.Dispatch"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="收货单位">
							<el-input placeholder="收货单位" v-model="carrierbillInfo.Consigner"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="收货人">
							<el-input placeholder="收货人" v-model="carrierbillInfo.Consignee"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="到货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择到货时间" v-model="carrierbillInfo.ArrivalDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
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
							<el-input placeholder="卸货详细地址" v-model="carrierbillInfo.Discharge"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">3</span>
					<span class="tit">货物信息</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="货物信息">
							<div class="cargoList">
								<el-row :gutter="20">
									<el-col :span="3">
										<el-select v-model="value" placeholder="请选择">
											<el-option>重货</el-option>
											<el-option>轻货</el-option>
										</el-select>
									</el-col>
									<el-col :span="5">
										<el-input placeholder="货物名称"></el-input>
									</el-col>
									<el-col :span="3">
										<el-input placeholder="货物规格"></el-input>
									</el-col>
									<el-col :span="3">
										<el-input placeholder="货物数量吨"></el-input>
									</el-col>
									<el-col :span="3">
										<el-input placeholder="货物数量方"></el-input>
									</el-col>
									<el-col :span="3">
										<el-input placeholder="货物数量件"></el-input>
									</el-col>
									<el-col :span="3">
										<el-button type="text" icon="el-icon-plus">添加</el-button>
										<el-button type="text" icon="el-icon-delete" style="color:#F56C6C">删除</el-button>
									</el-col>
								</el-row>
							</div>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">4</span>
					<span class="tit">应款金额</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="承运单应收款">
							<el-radio-group v-model="carrierbillInfo.Receivable">
								<el-radio label="Y">按吨公里自动生成</el-radio>
								<el-radio label="N">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.Receivable=='Y'" class="tips">从“这个单的发货地”到卸货地对外运距为“50公里”总价为90909009？</div>
							<el-row>
								<el-col :span="3">
									<el-form label-width="40px">
										<el-form-item label="现付">
											<el-input placeholder="现付"></el-input>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="3">
									<el-form label-width="60px">
										<el-form-item label="到付">
											<el-input placeholder="到付"></el-input>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="3">
									<el-form label-width="70px">
										<el-form-item label="回单结">
											<el-input placeholder="回单结"></el-input>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="3">
									<el-form label-width="60px">
										<el-form-item label="月结">
											<el-input placeholder="月结"></el-input>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="3">
									<el-form label-width="90px">
										<el-form-item label="收货方付">
											<el-input placeholder="收货方付"></el-input>
										</el-form-item>
									</el-form>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="付款费用">
							<el-radio-group v-model="carrierbillInfo.payable">
								<el-radio label="Y">按吨公里自动生成</el-radio>
								<el-radio label="N">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.payable=='Y'" class="tips">从“这单的发货地”到卸货地对内运距为“50公里”?</div>
						</el-form-item>
						<el-form-item label="发票">
							<el-radio-group v-model="carrierbillInfo.invoice">
								<el-radio label="Y">开发票</el-radio>
								<el-radio label="N">不开发票</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="回单要求">
							<el-checkbox-group v-model="carrierbillInfo.receipt">
								<el-checkbox label="1">货物托运单</el-checkbox>
								<el-checkbox label="2">发货单文件</el-checkbox>
								<el-checkbox label="3">不需要回单</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="0">
						<el-form-item align="center">
							<el-button type="primary">修改</el-button>
							<el-button type="success" @click="AddConrol">调度</el-button>
							<el-button type="danger">删除</el-button>
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
// import { regionData } from 'element-china-area-data'
export default {
	data() {
		return {
			// distData: regionData,
			selectedAreas: [],
			carrierbillInfo: {
				Status: '待执行',
				Consignor: '安宁化工厂',
				Carrier: '安化物流',
				CarrierNum: '20180205001',
				ConsignNum: '20180205001',
				ConsigneeCompany: '云南磷化',
				Discharge: '云南省昭通市镇远县城李家沟',
				Consignee: '磷化',
				ArrivalDate: '2018:02:06 18:00',
				CargoTotal: '9.76吨/10方',
				ConsignerCompany: '安宁~~化工厂',
				DeliveryDate: '2018-02-06 18:00',
				Consigner: '李铁军',
				Dispatch: '云南省昆明市安宁市区山顶上化工厂',
				CargoName: 'R72/炸药',
				CreatedDate: '2018:02:06 18:00',
				CommissionDate: '2018:02:06 18:00',
				invoice: 'Y',
				receipt: ['1', '2'],
				Receivable: 'N',
				payable: 'N'
			}

		}
	},
	created() {

	},
	methods: {
		AddConrol() {
			this.$router.push({ name: 'addcontrol' , query: { CarrierNum: this.$route.query.CarrierNum } })
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
	.el-card__header
		span
			margin-right 40px
			font-size 14px
			color #909399
			&.CarrierNum
				font-weight bold
				margin-left 20px
			&.status
				position absolute
				margin-right 0
				right 20px
				top 15px
				height 24px
				line-height 24px
				color #fff
				padding 0 15px
				font-size 12px
				border-radius 4px
				&.status1
					background #F56C6C
				&.status2
					background #409EFF
				&.status3
					background #909399
	.tips
		color #909399

</style>
