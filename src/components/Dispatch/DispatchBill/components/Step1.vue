<template>
	<div class="step step1">
		<div class="search">
			<el-form :inline="true" size="small">
				<el-form-item label="关键字" >
					<el-input placeholder="承运单号/货物名称/起始地/目的地" style="width:250px" v-model="find.keyword"></el-input>
				</el-form-item>
				<el-form-item label="收发货单位">
					<el-autocomplete
						value-key="companyName" 
						v-model="find.companyName"
						:fetch-suggestions="getRecdeliverycomp"
						placeholder="请输入收发货单位"
						@select="handSelectShipper">
					</el-autocomplete>
				</el-form-item>
				<el-form-item label="委托时间">
					<el-date-picker
						v-model="findRangeDate"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						value-format="timestamp"
						:clearable="false"
						@change="selectDateRange">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList">搜索</el-button>
					<el-button type="default" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table">
			<el-table 
				ref="carrierOrderTable"
				:data="carrierList" 
				@selection-change="selectionChange" 
				border style="width: 100%" size="mini">
				<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
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
				<el-table-column label="委托时间" prop="commissionDate">
					<template slot-scope="scope">
						<span v-if="scope.row.commissionDate">{{ new Date(scope.row.commissionDate).getTime() | getdatefromtimestamp(true)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="到货公司" prop="consigneeCompanyName"></el-table-column>
				<el-table-column label="到货地" prop="consigneeArea"></el-table-column>
				<el-table-column label="货量(余)" prop="remainingCargoNum">
					<template slot-scope="scope">
						<span>{{scope.row.remainingCargoWeight + '吨/'}}</span>
						<span>{{scope.row.remainingCargoVolume + '方/'}}</span>
						<span>{{scope.row.remainingCargoNum}}</span>
					</template>
				</el-table-column>
				<!-- <el-table-column label="数量(余)" prop="remainingCargoNum"></el-table-column>
				<el-table-column label="重量(余)" prop="remainingCargoWeight"></el-table-column>
				<el-table-column label="体积(余)" prop="remainingCargoVolume"></el-table-column> -->
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
			carrierList: [],
			findRangeDate: [],
			find: {
				keyword: '',
				beginDate: '',
				endDate: '',
				companyName: ''
			}
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
		getRecdeliverycomp(queryString, cb) {
			Customer.find({
				type: 'ShipperConsignee',
				companyName: queryString
			}).then(res => { cb(res.records) })
		},
		handSelectShipper(data){
			this.find.companyName = data.companyName
			this.find.customerID = data.customerID
		},
		selectDateRange(date) {
			this.find.beginDate = date[0]
			this.find.endDate = date[1]
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList() 
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.find.keyword = ''
			this.find.beginDate = ''
			this.find.endDate = ''
			this.find.companyName = ''
			this.find.customerID = ''
			this.findRangeDate = []
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			Carrierbill.findPreDispatch({
				current: this.pageIndex,
				size: this.pageSize,
				beginDate: this.find.beginDate,
				endDate: this.find.endDate,
				keyword: this.find.keyword,
				consigneeAndShipper: this.find.companyName
			}).then(res => {
				this.carrierList = res.records
				this.total= res.total
				const ids = this.selectedCarrierBill.map(item => item.carrierOrderID)
				const list = this.carrierList.filter(item => ids.includes(item.carrierOrderID))
				this.$nextTick(() => {
                    list.forEach(row => {
                        this.$refs.carrierOrderTable.toggleRowSelection(row)
                    })
                })
			})
		},
		selectionChange(data) {
			this.$store.dispatch('setCarrierBill', data)
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