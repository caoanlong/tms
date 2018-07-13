<template>
	<div class="step step1">
		<div class="table">
			<el-table 
				ref="carrierOrderTable"
				:data="carrierList" 
				border style="width: 100%" size="mini">
				<el-table-column label="Id" type="selection" align="center" width="40" :selectable="() => false"></el-table-column>
				<el-table-column label="单号" prop="carrierOrderNo" width="170">
					<template slot-scope="scope">
						<span @click="view(scope.row.carrierOrderID)" class="link">{{scope.row.carrierOrderNo}}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="status">
					<template slot-scope="scope">
						<el-tag size="mini" class="statusTag" type="warning" v-if="scope.row.status == 'Committed'">未执行</el-tag>
						<el-tag size="mini" class="statusTag" type="primary" v-else-if="scope.row.status == 'Running'">执行中</el-tag>
						<el-tag size="mini" class="statusTag" type="success" v-else-if="scope.row.status == 'Signed'">已完成</el-tag>
						<el-tag size="mini" class="statusTag" type="info" v-else-if="scope.row.status == 'Closed'">已关闭</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="货物" prop="cargoName"></el-table-column>
				<el-table-column label="发货公司" prop="shipperCompanyName"></el-table-column>
				<el-table-column label="发货地" prop="shipperArea"></el-table-column>
				<el-table-column label="发货时间" prop="shipperDate">
					<template slot-scope="scope">
						<span v-if="scope.row.shipperDate">{{ new Date(scope.row.shipperDate).getTime() | getdatefromtimestamp(true)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="到货公司" prop="consigneeCompanyName"></el-table-column>
				<el-table-column label="到货地" prop="consigneeArea"></el-table-column>
				<el-table-column label="数量(余)" prop="remainingCargoNum"></el-table-column>
				<el-table-column label="重量(余)" prop="remainingCargoWeight"></el-table-column>
				<el-table-column label="体积(余)" prop="remainingCargoVolume"></el-table-column>
			</el-table>
			<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</div>
		<div class="step-footer text-center">
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Carrierbill from '../../../../api/Carrierbill'
import Customer from '../../../../api/Customer'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			carrierList: []
		}
	},
	computed: {
		...mapGetters(['selectedCarrierBill'])
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		nextStep() {
			if (this.selectedCarrierBill.length == 0) {
				Message.error('请选择！')
				return
			}
			this.$emit('nextStep', 2)
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList() 
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		getList() {
			const dispatchOrderID = this.$route.query.dispatchOrderID
			const params = { current: this.pageIndex, size: this.pageSize }
			dispatchOrderID && (params['dispatchOrderID'] = dispatchOrderID)
			Carrierbill.findPreDispatch(params).then(res => {
				this.carrierList = res.records
				this.total = res.total
				if (dispatchOrderID) this.$store.dispatch('setCarrierBill', this.carrierList)
				this.$nextTick(() => {
                    this.carrierList.forEach(row => {
                        this.$refs.carrierOrderTable.toggleRowSelection(row)
                    })
                })
			})
		},
		viewCarrierbills(carrierOrderID) {
			this.$router.push({name: 'viewcarrierbill', query: { carrierOrderID } })
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>
.table
	overflow hidden
	overflow-x auto
.wfTable
	min-width 100%
	background #e2ecf6
	border-spacing 1px
	font-size 14px
	margin-bottom 10px
	td
		background #fff
		padding 6px 10px
		height 36px
		line-height 24px
		color #666
		position relative
		white-space nowrap
		max-width 180px
		overflow hidden
		text-overflow ellipsis
		.wfCheck
			padding 5px 0
	.tit
		td
			background #f8f8f8
			color #3582d0
			.infoItem
				margin-right 40px
				&.ViewDispatchBill
					cursor pointer
				.tag
					padding 0 8px
					color #fff
					border-radius 4px
					font-size 12px
					height 19px
					line-height 19px
					display inline-block
					&.tag1
						background #409EFF
					&.tag2
						background #909399
	th
		padding 6px 10px
		height 36px
		line-height 24px
		background #fff
		color #666
		white-space nowrap
	.list
		td
			font-size 12px
			.phone
				// color #67C23A
				margin-left 10px
.main-content
	.pagination
		margin-top 0
.step-footer
	margin-top 10px

			
</style>