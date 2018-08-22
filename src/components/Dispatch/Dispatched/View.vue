<template>
	<div class="main-content">
		<el-card class="box-card dispatchbillDetail">
			<div slot="header" class="clearfix">调度详情</div>
			<el-row :gutter="40">
				<el-col :span="17" style="border-right:1px solid #ddd">
					<p><span class="c1">调度单号：{{dispatchOrderDetail.dispatchOrderNo}}</span><span class="fr c2">由 <span class="c1">{{dispatchOrderDetail.dispatchName}}</span> 创建调度单 <span class="c6">{{dispatchOrderDetail.dispatchTime | getdatefromtimestamp}}</span></span></p>
					<p>行驶数据</p>
					<div class="lineInfo">
						<span class="fl c1"><i class="el-icon-location"></i> 昆明五华区彩云北路56号</span>
						<span class="fr c2">2018-07-07 07:00</span>
					</div>
					<table class="wf-table">
						<tr>
							<td align="center" width="100">预计</td>
							<td>总里程 160公里 用时 16小时19分钟</td>
							<td align="center" width="100">实际</td>
							<td>总里程 110公里 已用时 11小时19分钟</td>
						</tr>
					</table>
					<p>总货量：
						<span class="c1" v-if="dispatchOrderDetail.loadWeightSum"><span class="num-label">重</span> {{dispatchOrderDetail.loadWeightSum}} 吨 </span>
						<span class="c1" v-if="dispatchOrderDetail.loadVolumeSum"><span class="num-label">体</span> {{dispatchOrderDetail.loadVolumeSum}} 方</span>
						<span class="c1" v-if="dispatchOrderDetail.loadNumSum"><span class="num-label">数</span> {{dispatchOrderDetail.loadNumSum}}</span>
					</p>
					<p>运费<span class="fr carriage" @click="carriageDetail">{{dispatchOrderDetail.sumAmount}}元 <svg-icon icon-class="arrow-down" :class="ShowCarriageDetail?'':'unfold'"></svg-icon></span></p>
					<table class="wf-table" v-show="ShowCarriageDetail">
                        <thead>
                            <tr>
                                <th>费用科目</th>
                                <th>费用类型</th>
                                <th>收款人</th>
                                <th>支付方式</th>
                                <th>金额</th>
                                <th width="100"><el-button size="mini" type="primary" @click="addFreight">添加费用</el-button></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="feesItem in dispatchOrderFees" :key="feesItem.dispatchFeeID">
                                <td>
                                	<!-- 费用科目:Freight-运费   RoadBridge-路桥费  Transit-中转费  Fine-罚款  Detour-绕路费  Other-其他 -->
                                	<span v-if="feesItem.item=='Freight'">运费</span>
                                	<span v-else-if="feesItem.item=='RoadBridge'">路桥费</span>
                                	<span v-else-if="feesItem.item=='Transit'">中转费</span>
                                	<span v-else-if="feesItem.item=='Fine'">罚款</span>
                                	<span v-else-if="feesItem.item=='Detour'">绕路费</span>
                                	<span v-else>其他</span>
                                </td>
                                <td>
                                    <span>{{feesItem.category == 'Basic' ? '基础运费' : '附加运费'}}</span>
                                </td>
                                <td>
                                    {{feesItem.supercargoName}}
                                </td>
                                <td>
                                    <!-- 支付方式: Prepay-预付  PayOnDelivery-到付  PayOnReceipt-回单结  PayByConsignee-收货方付 -->
									<span v-if="feesItem.payMode=='Prepay'">预付</span>
                                	<span v-else-if="feesItem.payMode=='PayOnDelivery'">到付</span>
                                	<span v-else-if="feesItem.payMode=='PayOnReceipt'">回单结</span>
                                	<span v-else>收货方付</span>
                                </td>
                                <td>
                                    {{feesItem.amount}}元
                                </td>
                                <td></td>
                            </tr>
                            <tr v-for="(item, index) in bizDispatchFeeList" :key="index">
                                <td>
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="item" :rules="[{ required: true , message: '请选择费用科目' }]">
                                            <el-select size="mini" v-model="item.item" placeholder="请选择">
                                                <el-option label="路桥费" value="RoadBridge"></el-option>
                                                <el-option label="中转费" value="Transit"></el-option>
                                                <el-option label="罚款" value="Fine"></el-option>
                                                <el-option label="绕路费" value="Detour"></el-option>
                                                <el-option label="其他" value="Other"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td>
                                    <span style="position:relative;top:-10px">{{item.category == 'Basic' ? '基础运费' : '附加运费'}}</span>
                                </td>
                                <td style="padding:0 5px">
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="comSupercargoID" :rules="[{ required: true , message: '请选择收款人' }]">
                                            <el-select size="mini" v-model="item.comSupercargoID" placeholder="请选择">
                                                <el-option 
                                                    :label="(person.supercargoType == 'SupercargoDriver' ? '司机-' : '押运-') + person.realName"
                                                    :value="person.comSupercargoID" 
                                                    v-for="person in persons" 
                                                    :key="person.comSupercargoID">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td style="padding:0 5px">
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="payMode" :rules="[{ required: true , message: '请选择支付方式' }]">
                                            <el-select size="mini" v-model="item.payMode" placeholder="请选择">
                                                <el-option label="到付" value="PayOnDelivery"></el-option>
                                                <el-option label="预付" value="Prepay"></el-option>
                                                <el-option label="回单结" value="PayOnReceipt"></el-option>
                                                <el-option label="收货方付" value="PayByConsignee"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td>
                                    <el-form :model="item" ref="ruleForm">
                                        <el-form-item prop="amount" :rules="[{
												validator: (rule, value, callback) => {
													const r = /(^[1-9]\d*\.\d{1,2}$)|(^0{1}\.\d{1,2}$)|(^[1-9]\d*$)/
													if (!item.amount || item.amount == '0') {
														callback('请输入金额')
													} else if (value && !r.test(value)) {
														callback('请输入正确的数字')
													} else {
														callback()
													}
												}
											}]">
                                            <el-input size="mini" placeholder="请输入..." v-model="item.amount" style="border-spacing:0"><template slot="append">元</template></el-input>
                                        </el-form-item>
                                    </el-form>
                                </td>
                                <td>
                                    <span style="position:relative;top:-10px" class="del-btn" @click="delFreight(index)">删除</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
					<p>运输任务（<span class="circle"></span> 色数字代表装卸执行顺序，来源线路规划排序） <span class="fr c1" v-if="dispatchOrderDetail.distance">预计总里程{{Number(dispatchOrderDetail.distance/1000).toFixed(2)}}公里</span></p>
					<TaskItem v-for="(item,index) in dispatchOrder.dispatchTaskList" :taskItem="item" :index="index" :key="item.carrierOrderID"></TaskItem>
				</el-col>
				<el-col :span="7">
					<p>运输车辆人员</p>
					<div class="truckInfo c2">
						<p><label>车牌号</label>{{dispatchOrderDetail.plateNo}} {{Number(dispatchOrderDetail.truckLength/1000).toFixed(1)}}米/{{dispatchOrderDetail.truckType}}</p>

						<p v-if="dispatchOrderDetail.trailerPlateNo"><label>挂车牌</label>{{dispatchOrderDetail.trailerPlateNo}} {{Number(dispatchOrderDetail.trailerTruckLength/1000).toFixed(1)}}米/{{dispatchOrderDetail.trailerTruckType}}</p>
						<p><label>司机</label>{{dispatchOrderDetail.driverName}} {{dispatchOrderDetail.driverMobile}}</p>
						<p v-if="dispatchOrder.superCargoName"><label>押运员</label>{{dispatchOrderDetail.superCargoName}} {{dispatchOrderDetail.superCargoMobile}}</p>
					</div>
					<p class="dispatchLogTit">调度日志</p>
					<ul class="dispatchLog">
						<li><p>抢单成功 2018/07/10 11:26</p></li>
						<li><p>开始装车 2018/07/10 11:26</p>
						<p>装车地址：北京市大兴区后查路</p></li>
						<li><p>上传装车照片  2018/07/10 11:26</p></li>
						<li><p>上传到货照片  2018/07/10 11:26</p></li>
						<li><p>上传回单照片  2018/07/10 11:26</p></li>
						<li><p>上传在途照片  2018/07/10 11:26</p></li>
						<li><p>开始到货  2018/07/10 11:26</p>
						<p>到货地址：北京市大兴区后查路</p></li>
					</ul>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Dispatchbill from '../../../api/Dispatchbill'
import TaskItem from './common/TaskItem'
export default {
	data() {
		return {
			ShowCarriageDetail:false,
			dispatchOrder: {},
			dispatchOrderDetail:{},
			bizDispatchFeeList: [],
			dispatchOrderFees:{}
		}
	},
	created() {
		this.getDetail()
		this.getFees()
	},
	methods: {
		getDetail() {
			const dispatchOrderID = this.$route.query.dispatchOrderID
			Dispatchbill.findById({ dispatchOrderID }).then(res => {
				this.dispatchOrder = res
				this.dispatchOrderDetail = res.detail
			})
		},
		getFees() {
			const dispatchOrderID = this.$route.query.dispatchOrderID
			Dispatchbill.findFees({ dispatchOrderID }).then(res => {
				this.dispatchOrderFees = res
			})
		},
		back() {
			this.$router.go(-1)
		},
		carriageDetail(){
			this.ShowCarriageDetail = !this.ShowCarriageDetail
		},
		addFreight() {
            this.bizDispatchFeeList.push({
                item: '',
                category: 'Attach',
                comSupercargoID: '',
                payMode: '',
                amount: ''
            })
        }
	},
	components:{
		TaskItem
	}
}

</script>
<style lang="stylus" scoped>
.dispatchbillDetail
	p
		line-height 30px
	.truckInfo
		padding-bottom 10px
		label
			width 60px
			text-align right
			display inline-block
			margin-right 10px
	.lineInfo
		height 60px
		padding 20px
		line-height 20px
		margin-bottom 10px
		background url("../../../assets/imgs/mapBg.jpg") no-repeat left center
	.carriage
		color #666
		cursor pointer
		user-select none
		.unfold
			transform rotate(180deg)
			transition all .5s
			
	.wf-table
		td
			text-align center
			color #666
		.addbtn
		.delbtn
			color #409EFF
			cursor pointer
	.circle
		width 12px
		height 12px
		background #409EFF
		display inline-block
		border-radius 6px
		vertical-align middle
	.dispatchLogTit
		border-top 1px solid #ddd
		padding-top 10px
	.dispatchLog
		padding-left 40px
		li
			padding 5px 
			list-style none
			position relative
			&:before
				content ""
				width 6px
				height 6px
				background #ccc
				display block
				position absolute
				left -10px
				top 12px
			p
				line-height 20px
				color #999
.num-label
	margin-right 10px
	width 18px
	height 18px
	display inline-block
	color #fff
	border-radius 4px
	font-size 12px
	line-height 18px
	text-align center
	font-weight 800
	margin-right 4px
	background-color #409EFF
</style>