<template>
	<div class="main-content">
		<el-card class="box-card dispatchbillDetail">
			<div slot="header" class="clearfix">调度详情</div>
			<el-row :gutter="40">
				<el-col :span="17" style="border-right:1px solid #ddd">
					<p><span class="c1">调度单号：20180607162821798123</span><span class="fr c2">由 罗凯 创建调度单 2018/07/10 11:26</span></p>
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
					<p>总货量：<span class="c1">重量22吨 体积8.8方</span></p>
					<p>运费<span class="fr carriage" @click="carriageDetail">3000元 <svg-icon icon-class="arrow-down" :class="ShowCarriageDetail?'':'unfold'"></svg-icon></span></p>
					<table class="wf-table" v-show="ShowCarriageDetail">
						<thead>
							<tr>
								<th>费用科目</th>
								<th>费用类型</th>
								<th>收款人</th>
								<th>支付方式</th>
								<th>金额</th>
								<th><span class="addbtn">+ 添加费用</span></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>运费</td>
								<td>基础运费</td>
								<td>司机-罗凯</td>
								<td>预付</td>
								<td>2600元</td>
								<td></td>
							</tr>
							<tr>
								<td>报价运费</td>
								<td>附加费</td>
								<td>司机-罗凯</td>
								<td>回单结</td>
								<td>200元</td>
								<td></td>
							</tr>
							<tr>
								<td>押运费</td>
								<td>附加费</td>
								<td>押运-张三</td>
								<td>预付</td>
								<td>200元</td>
								<td></td>
							</tr>
							<tr>
								<td>
									<el-select placeholder="请选择费用科目" size="mini">
										<el-option value="费用科目1" label="费用科目1">费用科目1</el-option>
										<el-option value="费用科目2" label="费用科目2">费用科目2</el-option>
										<el-option value="费用科目3" label="费用科目3">费用科目3</el-option>
									</el-select>
								</td>
								<td>
									<el-select placeholder="请选择费用类型" size="mini">
										<el-option value="费用类型1" label="费用类型1">费用类型1</el-option>
										<el-option value="费用类型2" label="费用类型2">费用类型2</el-option>
										<el-option value="费用类型3" label="费用类型3">费用类型3</el-option>
									</el-select>
								</td>
								<td>
									<el-select placeholder="请选择收款人" size="mini">
										<el-option value="收款人1" label="收款人1">收款人1</el-option>
										<el-option value="收款人2" label="收款人2">收款人2</el-option>
										<el-option value="收款人3" label="收款人3">收款人3</el-option>
									</el-select>
								</td>
								<td>
									<el-select placeholder="请选择支付方式" size="mini">
										<el-option value="支付方式1" label="支付方式1">支付方式1</el-option>
										<el-option value="支付方式2" label="支付方式2">支付方式2</el-option>
										<el-option value="支付方式3" label="支付方式3">支付方式3</el-option>
									</el-select>
								</td>
								<td>
									<el-input placeholder="请输入金额" size="mini"></el-input>
								</td>
								<td><span class="delbtn">删除</span></td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td colspan="6">
									<el-button size="mini">取消</el-button>
									<el-button type="primary" size="mini">保存</el-button>
								</td>
							</tr>
						</tfoot>
					</table>
					<p>运输任务（<span class="circle"></span> 色数字代表装卸执行顺序，来源线路规划排序） <span class="fr c1">预计总里程160公里</span></p>
					<TaskItem></TaskItem>
				</el-col>
				<el-col :span="7">
					<p>运输车辆人员</p>
					<div class="truckInfo c2">
						<p><label>车牌号</label>云AD0046 12.5米/高栏货车</p>
						<p><label>挂车牌</label>云AD0046</p>
						<p><label>司机</label>韩燚垚 15559608506</p>
						<p><label>押运员</label>韩燚垚 15559608506</p>
					</div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import TaskItem from './common/TaskItem'
export default {
	data() {
		return {
			ShowCarriageDetail:false
		}
	},

	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {

		},
		back() {
			this.$router.go(-1)
		},
		carriageDetail(){
			this.ShowCarriageDetail = !this.ShowCarriageDetail
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
</style>