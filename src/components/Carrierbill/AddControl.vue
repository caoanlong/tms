<template>
	<div class="main-content">
		<el-card class="box-card hasTit">
			<div slot="header" class="clearfix">新的调度
				<el-button type="text" icon="el-icon-plus" class="addBtn" @click="dialogTableVisible = true">添加承运单</el-button>
			</div>
			<el-steps :active="stepActive" finish-status="success" simple style="margin-bottom:20px;" class="stepBar">
				<el-step title="选择待运货物"></el-step>
				<el-step title="选择载具和司机及押运人"></el-step>
				<el-step title="设置运费及付款方式"></el-step>
				<el-step title="确认调度信息"></el-step>
			</el-steps>
			<div class="step step1" v-show="stepActive==0">
				<div class="table" v-for="(item,index) in 3">
					<el-table :data="carrierbillInfo" border style="width: 100%" size="mini" class="carrierbillInfo">
						<el-table-column label="承运单号" prop="CarrierNum" width="110" align="center">
						</el-table-column>
						<el-table-column label="发货地" prop="Dispatch">
						</el-table-column>
						<el-table-column label="收货地" prop="Discharge">
						</el-table-column>
						<el-table-column label="到货时间" prop="ArrivalDate" width="140" align="center">
						</el-table-column>
					</el-table>
					<el-table :data="CargoInfo" border style="width: 100%;margin-top:-1px" size="mini" resizable="false">
						<el-table-column type="selection" width="40" align="center">
						</el-table-column>
						<el-table-column label="货物规格/货物名称" prop="CargoName">
						</el-table-column>
						<el-table-column label="待配载量">
							<template slot-scope="scope">
								{{scope.row.CargoWeight?scope.row.CargoWeight :'' }} {{scope.row.CargoVolume?' / ' + scope.row.CargoVolume :''}} {{scope.row.CargoNum?' / '+scope.row.CargoNum:''}}
							</template>
						</el-table-column>
						<el-table-column label="配载重量" width="180">
							<template slot-scope="scope">
								<el-input placeholder="配载重量" size="mini"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="配载体积" width="180">
							<template slot-scope="scope">
								<el-input placeholder="配载体积" size="mini"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="配载件数" width="180">
							<template slot-scope="scope">
								<el-input placeholder="配载件数" size="mini"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="total-table">已配载1个货物
					<div class="fr total-count"><b>合计：</b><span>111</span><span>222</span><span>333</span></div>
				</div>
				<div class="step-footer">
					<el-button type="primary" @click="nextStep">下一步</el-button>
					<el-button @click="back">返回</el-button>
				</div>
			</div>
			<div class="step step2" v-show="stepActive==1">
				<el-row>
					<div class="split-item">
						<span class="tit">司机及车辆</span>
					</div>
				</el-row>
				<div class="search">
					<el-form :inline="true" class="demo-form-inline" size="small">
						<el-form-item label="编号">
							<el-input placeholder="编号"></el-input>
						</el-form-item>
						<el-form-item label="司机姓名">
							<el-input placeholder="司机姓名"></el-input>
						</el-form-item>
						<el-form-item label="车牌号">
							<el-input placeholder="车牌号"></el-input>
						</el-form-item>
						<el-form-item label="车型">
							<el-input placeholder="车型"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary">搜索</el-button>
							<el-button type="default">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="list">
					<DriverItem :isSelected="isSelected" :index="index" v-for="(item,index) in 4" :key="index" @click.native.stop="selectDriverItem(index)"></DriverItem>
				</div>
				<el-row>
					<div class="split-item">
						<span class="tit">随车人员</span>
					</div>
				</el-row>
				<div class="search">
					<el-form :inline="true" class="demo-form-inline" size="small">
						<el-form-item label="姓名">
							<el-input placeholder="姓名"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary">搜索</el-button>
							<el-button type="default">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="list">
					<EscortItem v-for="(item,index) in 4" :key="index"></EscortItem>
				</div>
				<div class="step-footer">
					<el-button @click="prevStep">上一步</el-button>
					<el-button type="primary" @click="nextStep">下一步</el-button>
				</div>
			</div>
			<div class="step step3" v-show="stepActive==2">
				<el-row>
					<div class="split-item">
						<span class="tit">配载信息</span>
					</div>
				</el-row>
				<div class="control-info">
					<el-row :gutter="30">
						<el-col :span="6" style="border-right:1px solid #ebeef5">
							<div class="base-info inlineBlock">
								<p class="driverName">李司机</p>
								<p class="vehicleNo">云AG17885</p>
								<p class="trailerNo">云AG28937挂</p>
								<p class="vehicleType">7.2米重型集装箱半挂车</p>
							</div>
						</el-col>
						<el-col :span="18">
							<el-row :gutter="30">
								<el-col :span="8">
									<div class="sliderSelect">
										<el-progress :percentage="70" style="margin-top:13px"></el-progress><span class="surplus">剩 吨</span>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="sliderSelect">
										<el-progress :percentage="70" style="margin-top:13px"></el-progress><span class="surplus">剩 方</span>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="sliderSelect">
										<el-progress :percentage="70" style="margin-top:13px"></el-progress><span class="surplus">剩 件</span>
									</div>
								</el-col>
							</el-row>
							<el-row :gutter="30">
								<el-col :span="8">
									<el-form label-width="60px">
										<el-form-item label="已配载">
											<el-input size="mini">
												<template slot="suffix">吨</template>
											</el-input>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="8">
									<el-form label-width="60px">
										<el-form-item label="已配载">
											<el-input size="mini">
												<template slot="suffix">方</template>
											</el-input>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="8">
									<el-form label-width="60px">
										<el-form-item label="已配载">
											<el-input size="mini">
												<template slot="suffix">件</template>
											</el-input>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="24" class="controlStatus">
									<el-radio v-model="controlStatus" label="1">满载</el-radio>
									<el-radio v-model="controlStatus" label="2">未满载</el-radio>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
				<el-row>
					<div class="split-item">
						<span class="tit">付款方式及费用</span>
					</div>
				</el-row>
				<table class="customertable">
					<thead>
						<tr>
							<th width="100"></th>
							<th>现付</th>
							<th>到付</th>
							<th>回单付</th>
							<th>月结</th>
							<th>收方到货付</th>
							<th>合计</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="txt-r">司机</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
						</tr>
						<tr>
							<td class="txt-r">随车人员</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
							<td>
								<el-input size="mini"></el-input>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td colspan="7" class="txt-r">合计</td>
						</tr>
					</tfoot>
				</table>
				<div class="step-footer">
					<el-button @click="prevStep">上一步</el-button>
					<el-button type="primary" @click="nextStep">下一步</el-button>
				</div>
			</div>
			<div class="step step4" v-show="stepActive==3">
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
								<p>{{carrierbillInfo.Consignor}}</p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="承运人">
								<p>{{carrierbillInfo.Carrier}}</p>
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
								<p></p>
							</el-form-item>
							<el-form-item label="发货人">
								<p></p>
							</el-form-item>
							<el-form-item label="发货时间">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="委托时间">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="发货单号">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="6">
						<el-form label-width="120px">
							<el-form-item label="发货地">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="10">
						<el-form label-width="20px">
							<el-form-item>
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="收货单位">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="收货人">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="到货时间">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form label-width="120px">
							<el-form-item label="运输方式">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="6">
						<el-form label-width="120px">
							<el-form-item label="卸货地">
								<p></p>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="10">
						<el-form label-width="20px">
							<el-form-item>
								<p></p>
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
				<div class="table">
					<el-table :data="tableData" border style="width: 100%" size="mini">
						<el-table-column type="index" label="货物序号" width="80" align="center"></el-table-column>
						<el-table-column label="承运单编号" prop="CarrierNum"  width="110" align="center">
						</el-table-column>
						<el-table-column label="货物规格" prop="CargoName">
						</el-table-column>
						<el-table-column label="货物名称" prop="CargoName">
						</el-table-column>
						<el-table-column label="配载量" prop="CargoTotal" align="center">
						</el-table-column>
						<el-table-column label="运载量" prop=""  width="100" align="center">
						</el-table-column>
						<el-table-column label="签收量" prop=""  width="100" align="center">
						</el-table-column>
					</el-table>
				</div>
				<div class="controlInfo">
					<p>司机：李司机 13529005327</p>
					<p>载具：云AG33652  6.2米厢式  10吨21方</p>
					<p>随车人员：赵押运员  13566778899</p>
				</div>
				<el-row>
					<div class="split-item">
						<span class="num">4</span>
						<span class="tit">付款信息</span>
					</div>
				</el-row>
				<table class="customertable">
					<thead>
						<tr>
							<th width="100" rowspan="2"></th>
							<th rowspan="2">现付</th>
							<th rowspan="2">到付</th>
							<th rowspan="2">回单付</th>
							<th rowspan="2">月结</th>
							<th rowspan="2">收方到货付</th>
							<th colspan="2">绕路费</th>
							<th rowspan="2">其他费用</th>
						</tr>
						<tr>
							<th>里程</th>
							<th>费用</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="txt-r">司机</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
						</tr>
						<tr>
							<td class="txt-r">随车人员</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
							<td>111</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td colspan="9" class="txt-r">合计</td>
						</tr>
					</tfoot>
				</table>
				<div class="step-footer">
					<el-button @click="prevStep">上一步</el-button>
					<el-button type="primary" @click="save">确认</el-button>
					<el-button @click="back">取消</el-button>
				</div>
			</div>
		</el-card>
		<el-dialog title="添加承运单" :visible.sync="dialogTableVisible" custom-class="table" width="80%">
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="承运单号">
						<el-input placeholder="承运单号"></el-input>
					</el-form-item>
					<el-form-item label="发货单号">
						<el-input placeholder="发货单号"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="收货单位"></el-input>
					</el-form-item>
					<el-form-item label="发货单位">
						<el-input placeholder="发货单位"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-input placeholder="创建时间"></el-input>
					</el-form-item>
					<el-form-item label="发货时间">
						<el-input placeholder="发货时间"></el-input>
					</el-form-item>
					<el-form-item label="到货时间">
						<el-input placeholder="到货时间"></el-input>
					</el-form-item>
					<el-form-item label="运单状态">
						<el-input placeholder="运单状态"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">搜索</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="gridData" border style="width: 100%" size="mini">
				<el-table-column type="selection" width="40" align="center" fixed>
				</el-table-column>
				<el-table-column label="处理状态" prop="Status" width="110" align="center">
				</el-table-column>
				<el-table-column label="承运单号" prop="CarrierNum" width="110" align="center">
				</el-table-column>
				<el-table-column label="收货单位" prop="ConsigneeCompany">
				</el-table-column>
				<el-table-column label="卸货地" prop="Discharge">
				</el-table-column>
				<el-table-column label="收货人" prop="Consignee">
				</el-table-column>
				<el-table-column label="到货时间" prop="ArrivalDate" width="140" align="center">
				</el-table-column>
				<el-table-column label="货物规格/货物名称" prop="CargoName">
				</el-table-column>
				<el-table-column label="货物总量" prop="CargoTotal">
				</el-table-column>
				<el-table-column label="发货单位" prop="ConsignerCompany">
				</el-table-column>
				<el-table-column label="发货时间" prop="DeliveryDate" width="140" align="center">
				</el-table-column>
				<el-table-column label="发货人" prop="Consigner">
				</el-table-column>
				<el-table-column label="发货地" prop="Dispatch">
				</el-table-column>
			</el-table>
			<el-row type="flex">
				<el-col :span="14" style="padding-top: 15px; font-size: 12px; color: #909399">
					<span>总共 {{count}} 条记录每页显示</span>
					<el-select size="mini" style="width: 100px; padding: 0 5px" v-model="pageSize" @change="getCargoList()">
						<el-option label="10" value="10"></el-option>
						<el-option label="20" value="20"></el-option>
						<el-option label="30" value="30"></el-option>
						<el-option label="40" value="40"></el-option>
						<el-option label="50" value="50"></el-option>
						<el-option label="100" value="100"></el-option>
					</el-select>
					<span>条记录</span>
				</el-col>
				<el-col :span="10">
					<div class="pagination">
						<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
					</div>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogTableVisible = false">添加</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import DriverItem from '../CommonComponents/DriverItem'
import EscortItem from '../CommonComponents/EscortItem'
export default {
	data() {
		return {
			count: 2,
			pageSize: 10,
			stepActive: 0,
			dialogTableVisible: false,
			isSelected: -1,
			controlStatus: '',
			carrierbillInfo: [{
				CarrierNum: '20180205001',
				Discharge: '云南省昭通市镇远县城李家沟',
				ArrivalDate: '2018:02:06 18:00',
				Dispatch: '云南省昆明市安宁市区山顶上化工厂',
			}],
			CargoInfo: [{
					CargoName: 'R72/炸药',
					CargoWeight: '9.76吨',
					CargoVolume: '10方',
					CargoNum: ''
				},
				{
					CargoName: 'R72/炸药',
					CargoWeight: '9.76吨',
					CargoVolume: '10方',
					CargoNum: ''
				}
			],
			gridData: [{
					ControlsNum: '20180205001-1',
					VehicleNum: '云AG3365',
					LoadingQuantity: '9.76吨',
					Driver: '李铁军',
					Status: '待执行',
					ApplianceCrew: '赵押运员',
					OrderNum: '20180205001',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					Discharge: '云南省昭通市镇远县城李家沟',
					ArrivalDate: '2018:02:06 18:00',
					CargoName: 'R72/炸药'
				},
				{
					ControlsNum: '20180205001-2',
					VehicleNum: '云AG3365',
					LoadingQuantity: '9.76吨',
					Driver: '李铁军',
					Status: '待执行',
					ApplianceCrew: '赵押运员',
					OrderNum: '20180205001',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					Discharge: '云南省昭通市镇远县城李家沟',
					ArrivalDate: '2018:02:06 18:00',
					CargoName: 'R72/炸药'
				}
			],
			tableData: [
				{
					CarrierNum: '20180205001',
					CargoTotal: '9.76吨/10方',
					CargoName:'R72/炸药'
				}
			]
		}
	},
	created() {

	},
	methods: {
		nextStep() {
			if (this.stepActive++ > 3) this.stepActive = 3;
		},
		prevStep() {
			if (this.stepActive-- < 1) this.stepActive = 0;
		},
		back() {
			this.$router.go(-1)
		},
		pageChange() {

		},
		save() {
			this.$router.push({ name: 'controls' })
		},
		selectDriverItem(index) {
			this.isSelected = index
		}
	},
	components: {
		EscortItem,
		DriverItem
	}

}

</script>
<style lang="stylus" scoped>
	.el-card__header
		.addBtn
			position absolute
			margin-right 0
			right 20px
			top 8px
	.tips
		color #909399
	.step-footer
		margin-top 20px
		text-align center
	.table
		margin-top -1px
		&:first-child
			margin-top 0
	.total-table
		padding-left 10px
		height 40px
		border 1px solid #ebeef5
		border-top none
		line-height 40px
		color #409EFF
		span
			width 180px
			display inline-block
			padding 0 25px
			border-left 1px solid #ebeef5
		b
			padding-right 10px
	.step
		.split-item
			padding 10px 0
			margin-bottom 20px
			border-bottom 1px solid #ebeef5
			.tit
				padding-left 0
	.control-info
		font-size 14px
		border-bottom 1px solid #ebeef5
		padding-bottom 20px
		.sliderSelect
				display inline-block
				width 220px
				height 40px
				padding-right 100px
				position relative
				.labels
					position absolute
					left 0
					top 0
					line-height 40px
				.surplus
					position absolute
					right 0
					top 0
					line-height 40px
					width 80px
	.base-info
		p
			line-height 30px
			margin 0
	.customertable
		width 100%
		font-size 12px
		background #ebeef5
		border-spacing 1px
		td
		th
			background #fff
			padding 6px 10px
			color #909399
			height 24px
			line-height 24px
			text-align center
			&.txt-r
				text-align right
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
.controlInfo
	padding 20px 0
	p
		line-height 30px
		font-size 12px
		margin 0
		color #999
</style>