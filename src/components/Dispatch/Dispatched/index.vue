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
						<th>承运单</th>
						<th>状态</th>
						<th>货物</th>
						<th>货量</th>
						<th>件数</th>
						<th>装车地</th>
						<th>装车时间</th>
						<th>送货地</th>
						<th>送货时间</th>
						<th>操作</th>
					</tr>
				</table>
				<DispatchItem></DispatchItem>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import DispatchItem from '../Common/DispatchItem'
	export default {
		data(){
			return{
				pageIndex: 1,
				pageSize: 10,
				total: 0,
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
		},
		components:{
			DispatchItem
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
</style>