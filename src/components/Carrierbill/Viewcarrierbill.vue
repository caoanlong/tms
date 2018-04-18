<template>
	<div class="main-content" style="min-width: 1200px">
		<div class="wf-card">
			<div class="header clearfix">承运单编号：{{carrierOrder.carrierOrderNo}}
				<span>发货单号：{{carrierOrder.shipperNo}}</span>
				<span>创建时间：<span v-if="carrierOrder.createTime">{{carrierOrder.createTime | getdatefromtimestamp()}}</span><span v-else></span></span>
				<span>委托时间：<span v-if="carrierOrder.commissionDate">{{carrierOrder.commissionDate | getdatefromtimestamp()}}</span><span v-else></span></span>
				<span class="status status1" v-if="carrierOrder.status=='Committed'">待执行</span>
				<span class="status status2" v-else-if="carrierOrder.status=='Running'">执行中</span>
				<span class="status status3" v-else-if="carrierOrder.status=='Signed'">到达签收</span>
				<span class="status status1" v-else-if="carrierOrder.status=='Closed'">关闭</span>
				<span class="status status1" v-else-if="carrierOrder.status=='Canceled'">作废</span>
			</div>
			<table class="wf-table">
				<caption>承运信息</caption>
				<tr>
					<td width="50%"><span class="justify">托运人</span>{{carrierOrder.consignorName}}</td>
					<td width="50%"><span class="justify">承运人</span>{{carrierOrder.carrierrName}}</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>收发货信息</caption>
				<tr>
					<td width="50%"><span class="justify">发货单位</span>{{carrierOrder.shipperCompanyName}}</td>
					<td width="50%"><span class="justify">收货单位</span>{{carrierOrder.consigneeCompanyName}}</td>
				</tr>
				<tr>
					<td><span class="justify">发货人</span>{{carrierOrder.shipperName}}</td>
					<td><span class="justify">收货人</span>{{carrierOrder.consigneeName}}</td>
				</tr>
				<tr>
					<td><span class="justify">联系方式</span>{{carrierOrder.shipperPhone}}</td>
					<td><span class="justify">联系方式</span>{{carrierOrder.consigneePhone}}</td>
				</tr>
				<tr>
					<td>
						<span class="justify">发货地</span>
						{{carrierOrder.shipperArea ? carrierOrder.shipperArea : ''}}
						{{carrierOrder.shipperDetailAddress ? carrierOrder.shipperDetailAddress : ''}}
					</td>
					<td>
						<span class="justify">收货地</span>
						{{carrierOrder.consigneeArea ? carrierOrder.consigneeArea : ''}}
						{{carrierOrder.consigneeDetailAddress ? carrierOrder.consigneeDetailAddress : ''}}
					</td>
				</tr>
				<tr>
					<td><span class="justify">发货时间</span>{{carrierOrder.shipperDate | getdatefromtimestamp()}}</td>
					<td><span class="justify">到货时间</span>{{carrierOrder.consigneeDate | getdatefromtimestamp()}}</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>货物信息</caption>
				<tr>
					<td colspan="7">
						<span class="labels">运输方式：</span>{{carrierOrder.transportType}}
					</td>
				</tr>
				<tr>
					<th>货物类型</th>
					<th>货物规格</th>
					<th>货物名称</th>
					<th>数量(件)</th>
					<th>体积(方)</th>
					<th>重量(吨)</th>
					<th>剩余货量</th>
				</tr>
				<tr class="is-center" v-for="item in carrierCargo" :key="item.carrierCargoID">
					<td>
						<span v-if="item.weightType=='Heavy'">重货</span>
						<span v-else-if="item.weightType=='Light'">轻货</span>
						<span v-else-if="item.weightType=='HeavyAndLight'">重轻货</span>
					</td>
					<td>{{item.cargoType}}</td>
					<td>{{item.cargoName}}</td>
					<td>{{item.cargoNum}}</td>
					<td>{{item.cargoVolume}}</td>
					<td>{{item.cargoWeight}}</td>
					<td>{{item.remainingCargoNum?item.remainingCargoNum+'件':''}}{{item.remainingCargoNum?'/':''}}{{item.remainingCargoVolume?item.remainingCargoVolume+'方':''}}{{item.remainingCargoVolume?'/':''}}{{item.remainingCargoWeight?item.remainingCargoWeight+'吨':''}}</td>
				</tr>
				<tr class="total is-center">
					<td>合计</td>
					<td colspan="2"></td>
					<td>{{sum('cargoNum')}}</td>
					<td>{{sum('cargoVolume')}}</td>
					<td>{{sum('cargoWeight')}}</td>
					<td>
						<span v-if="sum('remainingCargoNum')>0">{{sum('remainingCargoNum')}}件/</span>
						<span v-if="sum('remainingCargoVolume')>0">{{sum('remainingCargoVolume')}}方/</span>
						<span v-if="sum('remainingCargoWeight')>0">{{sum('remainingCargoWeight')}}吨</span>	
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>应收款&nbsp;&nbsp;
					<svg-icon icon-class="eye" @click.native="isShow = true" v-if="!isShow"/>
					<i class="el-icon-view" @click="isShow = false" v-if="isShow"></i></caption>
				<tr>
					<th width="12.5%">现付</th>
					<th width="12.5%">到付</th>
					<th width="12.5%">回单付</th>
					<th width="12.5%">月结</th>
					<th width="12.5%">收方到货付</th>
					<th width="12.5%">合计</th>
					<th width="12.5%">其他</th>
					<th width="12.5%">备注</th>
				</tr>
				<tr class="is-center">
					<td>{{isShow ? carrierOrder.cashAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrder.codAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrder.porAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrder.monthlyAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrder.consigneeAmount : '**'}}元</td>
					<td>{{isShow ? carrierOrderTotal : '**'}}元</td>
					<td>{{isShow ? carrierOrder.otherAmount : '**'}}</td>
					<td>{{isShow ? carrierOrder.remark : '**'}}</td>
				</tr>
				<tr>
					<td colspan="8">
						<span class="labels">发票：</span>{{carrierOrder.invoice=='Y'?'开发票':'不开发票'}}
						<span class="labels" style="margin-left:40px">回单要求：</span>
						<span v-for="item in porRequire" class="porRequire">
							<span v-if="item=='ConsigneePor'">货物托运单</span>
							<span v-else-if="item=='ShipperPor'">发货单文件</span>
							<span v-else>不需要回单</span>
						</span>
						<span class="labels fr">承运单应收总价：{{isShow ? carrierOrderTotal + parseInt(carrierOrder.otherAmount) : '**'}}元</span>
					</td>
				</tr>
			</table>
			<table class="wf-table">
				<caption>调度单</caption>
				<tr>
					<th>调度单号</th>
					<th>状态</th>
					<th>车辆</th>
					<th>货物规格/名称</th>
					<th>数量(件)</th>
					<th>体积(方)</th>
					<th>重量(吨)</th>
					<th>付款金额</th>
				</tr>
				<tr class="is-center" v-for="item in dispatchbills">
					<td>{{item.dispatchOrderNo}}</td>
					<td>
						<span v-if="item.status == 'Committed'">待执行</span>
						<span v-else-if="item.status == 'Loaded'">已装运</span>
						<span v-else-if="item.status == 'Signed'">已签收</span>
						<span v-else-if="item.status == 'Canceled'">作废</span>
					</td>
					<td>{{item.plateNo}}</td>
					<td>
						{{item.dispatchOrderCargo.cargoType}}
						{{item.dispatchOrderCargo.cargoName ? '/' + item.dispatchOrderCargo.cargoName : ''}}
					</td>
					<td>{{item.dispatchOrderCargo.cargoNum}}</td>
					<td>{{item.dispatchOrderCargo.cargoVolume}}</td>
					<td>{{item.dispatchOrderCargo.cargoWeight}}</td>
					<td>
						<span>月结</span>
						{{item.driverCashAmount 
						+ item.driverCodAmount 
						+ item.driverCosigneeAmount 
						+ item.driverDetoursAmount 
						+ item.driverDetoursMileage
						+ item.driverMonthlyAmont
						+ item.superCargoCashAmount
						+ item.superCargoCodAmount
						+ item.superCargoCorAmount
						+ item.superCargoDetoursAmount
						+ item.superCargoDetoursMileage}}
						<span>元</span>
					</td>
				</tr>
			</table>
			<div class="wf-footer clearfix">
				<div class="btn-group fl">
					<!-- <button type="button" class="wf-btn btn-success" @click="EditCarrierbill">
						<svg-icon icon-class="edit"></svg-icon>修改</button> -->
					<button 
						type="button" class="wf-btn btn-success" 
						@click="EditCarrierbill" 
						v-if="carrierOrder.status!='Running' && carrierOrder.status != 'Signed' && carrierOrder.status != 'Closed'">
						<svg-icon icon-class="edit"></svg-icon>修改</button>
					<button 
						type="button" class="wf-btn btn-danger" 
						@click="closeCarrierbill" 
						v-if="carrierOrder.status=='Running' || carrierOrder.status == 'Signed' && carrierOrder.status != 'Closed'">
						<svg-icon icon-class="edit"></svg-icon>关闭</button>
					<button 
						type="button" class="wf-btn btn-primary" 
						@click="AddDispatchBill" 
						v-if="carrierOrder.status!='Running' && carrierOrder.status != 'Signed' && carrierOrder.status != 'Closed'">
						<svg-icon icon-class="dispatchbill"></svg-icon>调度</button>
					<button type="button" class="wf-btn btn-warning" @click="Edit" v-if="carrierOrder.status!='Committed' && carrierOrder.status != 'Closed'">
						<svg-icon icon-class="money1"></svg-icon>调整应收款</button>
				</div>
				<div class="btn-group fr">
					<button type="button" class="wf-btn btn-danger plain" @click="deleteCarrierOrder" v-if="carrierOrder.status == 'Committed'">
						<svg-icon icon-class="delete" ></svg-icon>删除</button>
					<button type="button" class="wf-btn btn-default" @click="back">
						<svg-icon icon-class="back"></svg-icon>返回</button>
				</div>
			</div>
		</div>
		<el-dialog title="调整应收款" :visible.sync="dialogFormVisible" width="80%">
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="发货单号">
							<el-input v-model="carrierOrder.shipperNo"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="现付">
							<el-input v-model="carrierOrder.cashAmount"><span slot="suffix">元</span></el-input>
						</el-form-item>
						<el-form-item label="月结">
							<el-input v-model="carrierOrder.monthlyAmount"><span slot="suffix">元</span></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="到付">
							<el-input v-model="carrierOrder.codAmount"><span slot="suffix">元</span></el-input>
						</el-form-item>
						<el-form-item label="收方到货付">
							<el-input v-model="carrierOrder.consigneeAmount"><span slot="suffix">元</span></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="回单付">
							<el-input v-model="carrierOrder.porAmount"><span slot="suffix">元</span></el-input>
						</el-form-item>
						<el-form-item label="合计">
							<el-input v-model="carrierOrderTotal" disabled><span slot="suffix">元</span></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="100px">
						<el-form-item label="其它">
							<el-input v-model="carrierOrder.otherAmount"></el-input>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" :rows="3" v-model="carrierOrder.remark"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="adjustSum">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from "../../common/request"
export default {
	data() {
		return {
			isShow: false,
			carrierOrder:{},
			dialogFormVisible:false,
			carrierCargo: [],
			porRequire:[],
			dispatchbills: []
		}
	},
	computed:{
		carrierOrderTotal:function(){
			return parseInt(this.carrierOrder.cashAmount) + parseInt(this.carrierOrder.codAmount) + parseInt(this.carrierOrder.porAmount) + parseInt(this.carrierOrder.monthlyAmount) + parseInt(this.carrierOrder.consigneeAmount)
		}
		
	},
	created() {
		this.getDetail()
		this.getDispacthBills()
	},
	methods: {
		sum(o) {
			let sum = 0
			for (let i = this.carrierCargo.length - 1; i >= 0; i--) {
				sum += this.carrierCargo[i][o]
			}
			return sum
		},
		getDetail() {
			let params = {
				carrierOrderID: this.$route.query.carrierOrderID
			}
			request({
				url: '/biz/carrierOrder/detail',
				params
			}).then(res => {
				console.log(res.data.data)
				this.carrierOrder = res.data.data
				this.carrierCargo = res.data.data.carrierCargo
				this.porRequire = res.data.data.porRequire.split(',')
			})
		},
		getDispacthBills() {
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				carrierOrderID: this.$route.query.carrierOrderID
			}
			request({
				url: '/biz/dispatchOrder/list',
				params
			}).then(res => {
				console.log(res.data.data)
				this.dispatchbills = res.data.data.records
			})
		},
		AddDispatchBill() {
			this.$router.push({ name: 'adddispatchbill', query: { carrierOrderID: this.$route.query.carrierOrderID } })
		},
		EditCarrierbill() {
			if (this.dispatchbills.length != 0) {
				this.Edit()
			} else {
				this.$router.push({ name: 'editcarrierbill', query: { carrierOrderID: this.$route.query.carrierOrderID } })
			}
		},
		Edit(){
			this.dialogFormVisible = true
		},
		closeCarrierbill() {
			let data = {
				carrierOrderIDs: this.$route.query.carrierOrderID
			}
			request({
				url: '/biz/carrierOrder/close',
				method: 'post',
				data
			}).then(res => {
				this.$message({
					type: 'success',
					message: '关闭成功!'
				})
				this.getDetail()
			})
		},
		back() {
			this.$router.go(-1)
		},
		deleteCarrierOrder() {
			let data = {
				carrierOrderIDs: this.$route.query.carrierOrderID
			}
			request({
				url: '/biz/carrierOrder/delete',
				method: 'post',
				data
			}).then(res => {
				this.$message({
					type: 'success',
					message: '删除成功!'
				})
				this.$router.push({ name: 'carrierbills'})
			})
		},
		// 调整应收款
		adjustSum(){
			let data = {
				carrierOrderID: this.$route.query.carrierOrderID,
				shipperNo: this.carrierOrder.shipperNo,
				cashAmount: this.carrierOrder.cashAmount,
				monthlyAmount: this.carrierOrder.monthlyAmount,
				codAmount: this.carrierOrder.codAmount,
				consigneeAmount: this.carrierOrder.consigneeAmount,
				porAmount: this.carrierOrder.porAmount,
				otherAmount: this.carrierOrder.otherAmount,
				remark: this.carrierOrder.remark
			}
			request({
				url: '/biz/carrierOrder/modify',
				method: 'post',
				data
			}).then(res => {
				this.$message({
					type: 'success',
					message: '调整成功!'
				})
				this.dialogFormVisible = false
			})
			
		}
	}
}

</script>
<style lang="stylus" scoped>
.main-content
	background #ebebeb
	padding-top 20px
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
		.wf-table
			.justify
				width 80px
				height 24px
				display inline-block
				vertical-align top
				padding-right 20px
				color #3582d0
				text-align justify
				&:after
					content '：'
					position relative
					top -24px
					padding-left 100%
					display inline-block
					
.porRequire
	span
		margin-right 20px				
</style>