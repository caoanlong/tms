<template>
	<div class="main-content">
		<div class="wf-card hasTit">
			
			<div class="header clearfix">承运单编号：{{carrierOrder.carrierOrderID}}<span>发货单号：{{carrierOrder.shipperNo}}</span><span>创建时间：{{carrierOrder.createTime | getdatefromtimestamp()}}</span><span>委托时间：接口无此参数</span>
				<span class="status status1" v-if="carrierOrder.status=='Commited'">待执行</span>
				<span class="status status2" v-else-if="carrierOrder.status=='Running'">执行中</span>
				<span class="status status3" v-else-if="carrierOrder.status=='Signed'">到达签收</span>
				<span class="status status1" v-else-if="carrierOrder.status=='Closed'">关闭</span>
				<span class="status status1" v-else-if="carrierOrder.status=='Canceled'">作废</span>
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
							<el-input placeholder="托运人"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="承运人">
							<el-input placeholder="承运人" v-model="carrierOrder.carrierrName"></el-input>
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
							<el-input placeholder="发货单位" v-model="carrierOrder.shipperCompanyName"></el-input>
						</el-form-item>
						<el-form-item label="发货人">
							<el-input placeholder="发货人" v-model="carrierOrder.shipperName"></el-input>
						</el-form-item>
						<el-form-item label="发货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择发货时间" v-model="carrierOrder.shipperDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="委托时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择委托时间(接口无参)" ></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="发货单号">
							<el-input placeholder="发货单号" v-model="carrierOrder.shipperNo"></el-input>
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
							<el-input placeholder="发货详细地址" v-model="carrierOrder.shipperDetailAddress"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="收货单位">
							<el-input placeholder="收货单位" v-model="carrierOrder.consigneeCompanyName"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="收货人">
							<el-input placeholder="收货人" v-model="carrierOrder.consigneeName"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="到货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择到货时间" v-model="carrierOrder.consigneeDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="运输方式">
							<el-select v-model="transType" placeholder="请选择" style="width:100%">
								<el-option v-for="op in transTypeOption" :key="op.value" :label="op.label" :value="op.value"></el-option>
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
							<div class="cargoItem" v-for="(item,index) in cargoInfo">
								<el-select v-model="item.type" placeholder="请选择" style="width:100px">
									<el-option label="重货" value="重货"></el-option>
									<el-option label="轻货" value="轻货"></el-option>
								</el-select>
								<el-input placeholder="货物名称" style="width:150px"></el-input>
								<el-input placeholder="货物规格" style="width:150px"></el-input>
								<el-input placeholder="货物数量" style="width:150px"><span slot="suffix">吨</span></el-input>
								<el-input placeholder="货物数量" style="width:150px"><span slot="suffix">方</span></el-input>
								<el-input placeholder="货物数量" style="width:150px"><span slot="suffix">件</span></el-input>
								<el-button type="text" icon="el-icon-plus" @click="addItem">添加</el-button>
								<el-button type="text" icon="el-icon-delete" style="color:#F56C6C" @click="removeItem(index)" v-show="cargoInfo.length>1">删除</el-button>
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
							<div class="form-input">
								<el-form-item label="现付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="现付"></el-input>
								</el-form-item>
								<el-form-item label="到付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="到付"></el-input>
								</el-form-item>
								<el-form-item label="回单结" label-width="60px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="回单结"></el-input>
								</el-form-item>
								<el-form-item label="月结" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="月结"></el-input>
								</el-form-item>
								<el-form-item label="收货方付" label-width="70px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="收货方付"></el-input>
								</el-form-item>
							</div>
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
							<el-button type="primary">保存</el-button>
							<el-button type="success" @click="AddDispatchBill">调度</el-button>
							<el-button type="danger">删除</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { regionData } from 'element-china-area-data'
import request from "../../common/request"
export default {
	data() {
		return {
			distData: regionData,
			selectedAreas: [],
			carrierOrder:[],
			carrierCargo:[],
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
			},
			cargoInfo: [{
				'type': '',
				'name': '',
				'rule': '',
				'weight': '',
				'volumn': '',
				'num': ''
			}],
			transType:'',
			transTypeOption:[
				{
					label:'海上运输',
					value:'海上运输'
				},
				{
					label:'铁路运输',
					value:'铁路运输'
				},
				{
					label:'公路运输',
					value:'公路运输'
				},
				{
					label:'航空运输',
					value:'航空运输'
				},
				{
					label:'邮件运输',
					value:'邮件运输'
				},
				{
					label:'多式联运',
					value:'多式联运'
				},
				{
					label:'固定设施运输',
					value:'固定设施运输'
				},
				{
					label:'内河运输',
					value:'内河运输'
				},
				{
					label:'其他',
					value:'其他'
				}
			]
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		getDetail() {
			let params = {
				carrierOrderID:this.$route.query.carrierOrderID
			}
			request({
				url: '/biz/carrierOrder/detail',
				params
			}).then(res => {
				console.log(res.data.data)
				this.carrierOrder = res.data.data
				this.carrierCargo = res.data.data.carrierCargo
			})
		},
		AddDispatchBill() {
			this.$router.push({ name: 'adddispatchbill', query: { CarrierNum: this.$route.query.CarrierNum } })
		},
		addItem() {
			this.cargoInfo.push({
				'type': '',
				'name': '',
				'rule': '',
				'weight': '',
				'volumn': '',
				'num': ''
			})
		},
		removeItem(index) {
			this.cargoInfo.splice(index,1)
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
.wf-card
	.header
		span
			font-size 12px
			margin-left 40px
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
				-moz-border-radius 4px
				     border-radius 4px
			&.status1
				background #F56C6C
			&.status2
				background #409EFF
			&.status3
				background #909399
.tips
	color #909399
.cargoItem
	padding-bottom 10px
	margin-bottom 10px
	border-bottom 1px solid #ebeef5
	.el-select
	.el-input
		margin 0 10px 10px 0
</style>
