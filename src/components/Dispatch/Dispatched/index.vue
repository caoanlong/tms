<template>
	<div class="main-content">
		<el-card class="box-card customerCardHeader">
			<div slot="header" class="tab clearfix"><span :class="isCur==0?'cur':''" @click="tabClick(0)">已调度</span><span :class="isCur==1?'cur':''" @click="tabClick(1)">调度历史</span></div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="调度单号/货物名称/司机/车牌号"></el-input>
					</el-form-item>
					<el-form-item label="收发单位">
						<el-input placeholder="收发单位"></el-input>
					</el-form-item>
					<el-form-item label="调度状态">
						<el-select placeholder="全部">
							<el-option value="" label="全部">全部</el-option>
							<el-option value="11111" label="未接单">未接单</el-option>
							<el-option value="22222" label="已接单">已接单</el-option>
							<el-option value="33333" label="已取消">已取消</el-option>
							<el-option value="44444" label="被拒绝">被拒绝</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="调度类型">
						<el-select placeholder="全部">
							<el-option value="" label="全部">全部</el-option>
							<el-option value="11111" label="指派">指派</el-option>
							<el-option value="22222" label="报价">报价</el-option>
							<el-option value="33333" label="抢单">抢单</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="调度时间从">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="至">
						<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" >
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableBox">
				<table class="dispatchTable">
					<tr>
						<th class="w1">承运单</th>
						<th class="w4">状态</th>
						<th class="w3">货物</th>
						<th class="w1">货量</th>
						<th class="w1">件数</th>
						<th class="w2">装车地</th>
						<th class="w1">装车时间</th>
						<th class="w2">送货地</th>
						<th class="w1">送货时间</th>
						<th class="w1">操作</th>
					</tr>
					<template v-for="(item,index) in 5">
						<tr>
							<td colspan="10" class="blank"></td>
						</tr>
						<tr>
							<td colspan="10" class="txt-l">
								<div class="dispatchbillTit">
									<span class="num">调度单号：23456788801</span>
									<el-tag type="info" size="mini">抢</el-tag>
									<span class="truckInfo">云A-23567 <b class="c3">¥6000.00元</b></span>
									<el-tag size="mini">抢单中</el-tag>
								</div>
								<div class="handler">
									<span class="c1">抢单人数（3）</span>
									<span class="c1">跟踪</span>
									<span class="c2">取消调度</span>
									<span class="c1">重新调度</span>
									<span class="c1">关闭</span>
								</div>
							</td>
						</tr>
						<tr v-for="(cargoIten,index) in 2" :key="index">
							<td>6564997</td>
							<td>待装车</td>
							<td class="txt-l">啤酒，可乐...</td>
							<td>2200kg/2.3m³</td>
							<td>332</td>
							<td>云南昆明</td>
							<td>2018-03-01 22:22</td>
							<td>广东深圳</td>
							<td>2018-03-01 22:22</td>
							<td>查看照片</td>
						</tr>
					</template>
				</table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import { baseMixin } from '../../../common/mixin'
	export default {
		mixins: [baseMixin], 
		data(){
			return{
				isCur:0
			}
		},
		created() {
			this.getList()
		},
		methods:{
			tabClick(val){
				this.isCur = val
			},
			search() {
				this.pageIndex = 1
				this.pageSize = 10
				this.getList()
			},
			reset() {
				this.pageIndex = 1
				this.pageSize = 10
				this.getList()
			},
			pageChange(index) {
				this.pageIndex = index
				this.getList()
			},
			pageSizeChange(size) {
				this.pageSize = size
				this.pageIndex = 1
				this.getList() 
			},
			getList () {
				// Dispatchbill.find({
				// 	current: this.pageIndex,
				// 	size: this.pageSize,
				// 	keyword: this.find.keyword,
				// 	customerID: this.find.customerID,
				// 	status: this.find.status,
				// 	beginDispatchDate: this.find.beginDispatchDate,
				// 	endDispatchDate: this.find.endDispatchDate
				// }).then(res => {
				// 	this.dispatchBillList = res.records
				// 	this.total = res.total
				// })
			},
		}
	}
</script>
<style lang="stylus" scoped>
	.tab
		height 36px
		span
			margin-right 20px
			padding 0 15px
			height 36px
			line-height 36px
			cursor pointer
			display inline-block
			position relative
			color #999
			&:last-child
				margin-right 0
			&.cur
				color #409EFF
				&:after
					height 2px
					position absolute
					left 0
					top 35px
					background #409EFF
					content ""
					width 100%
					display block
	.tableBox
		width 100%
		overflow hidden
		overflow-x auto
		.dispatchTable
			font-size 14px
			background #dcdfe6
			border-spacing 1px
			width 100%
			th
				background #f2f2f2
				color #666
				padding 10px 15px
				white-space  nowrap
			td
				padding 10px 15px
				background #fff
				white-space  nowrap 
				text-align center
				&.blank
					padding 5px 0
				&.txt-l
					text-align left	
				&.w1
					width 140px
				&.w2
					width 200px
				&.w3
					width 300px
				&.w4
					width 100px
				.dispatchbillTit
					float left
					height 20px
					.num
						color #409EFF
						margin-right 10px
						cursor pointer
					.truckInfo
						width 300px
						padding 0 10px
						display inline-block
						b
							font-weight normal
				.handler
					float right
					height 20px
					span
						margin-left 20px
						cursor pointer
	.c1
		color #409EFF
	.c2
		color #999
	.c3
		color #f60				
</style>