<template>
	<div class="step step1">
		<div class="search">
			<el-form :inline="true" size="small">
				<el-form-item label="关键字" >
					<el-input placeholder="承运单号/货物名称/起始地/目的地" style="width:250px" v-model="findsearchInfo"></el-input>
				</el-form-item>
				<el-form-item label="收发货单位">
					<el-input placeholder="收发货单位" v-model="findrecdeliverycomp"></el-input>
				</el-form-item>
				<el-form-item label="发货时间">
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
			<table class="wfTable">
				<tr>
					<th width="40">
						<el-checkbox 
							:indeterminate="(selectedCarrierBill.length > 0) && (selectedCarrierBill.length < carrierList.length)" 
							v-model="checked" 
							@change="handleCheckAllChange">
						</el-checkbox>
					</th>
					<th>货物</th>
					<th>货量</th>
					<th>件数</th>
					<th>发货公司</th>
					<th width="160">发货人</th>
					<th>发货地</th>
					<th width="160">发货时间</th>
					<th>收货公司</th>
					<th width="160">收货人</th>
					<th>收货地</th>
					<th width="160">收货时间</th>
				</tr>
				<template v-for="item in carrierList">
					<tr class="tit" :key="item.carrierOrderID">
						<td>
							<div class="wfCheck">
								<span>
									<input 
										type="checkbox" 
										class="checkbox" 
										ref="checkCarrier" 
										:checked='selectedCarrierBill.includes(item.carrierOrderID)' 
										@change="selectCarrier($event,item.carrierOrderID)"
									/>
									<label></label>
								</span>
							</div>
						</td>
						<td colspan="11">
							<span class="infoItem ViewDispatchBill" @click="ViewCarrierbills(item.carrierOrderID)">承运单号：{{item.carrierOrderNo}}</span>
							<span class="infoItem">
								<span class="tag tag1" v-if="item.status == 'Committed'">待执行</span>
								<span class="tag tag2" v-else-if="item.status == 'Running'">执行中</span>
							</span>
						</td>
					</tr>
					<tr class="list" v-for="cargoItem in item.carrierCargo" :key="cargoItem.carrierCargoID">
						<td colspan="2">{{cargoItem.cargoName}}</td>
						<td class="text-center">{{cargoItem.cargoWeight}}kg{{cargoItem.cargoWeight&&cargoItem.cargoVolume?'/':''}}{{cargoItem.cargoVolume?cargoItem.cargoVolume+'m³':''}}</td>
						<td class="text-center">{{cargoItem.cargoNum?cargoItem.cargoNum:''}}</td>
						<td>{{item.shipperCompanyName}}</td>
						<td class="text-center" width="160">{{item.shipperName}}<span class="phone">{{item.shipperPhone}}</span></td>
						<td class="text-center">{{item.shipperArea}}</td>
						<td class="text-center" width="140">{{item.shipperDate | getdatefromtimestamp(true)}}</td>
						<td>{{item.consigneeCompanyName}}</td>
						<td class="text-center" width="160">{{item.consigneeName}}<span class="phone">{{item.consigneePhone}}</span></td>
						<td class="text-center">{{item.consigneeArea}}</td>
						<td class="text-center" width="140">{{item.consigneeDate | getdatefromtimestamp(true)}}</td>
					</tr>
				</template>
			</table>
		</div>
		<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		<div class="step-footer text-center">
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">返回</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Carrierbill from '../../../api/Carrierbill'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			carrierList:[],
			findsearchInfo:'',
			findrecdeliverycomp:'',
			findRangeDate: [],
			findshipperBeginDate: '',
			findshipperEndDate: '',
			checkedList: [],
			checked: false,
			isIndeterminate: false
		}
	},
	computed: {
		...mapGetters(['selectedCarrierBill'])
	},
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
			Carrierbill.find({
				current: this.pageIndex,
				size: this.pageSize,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate,
				searchInfo: this.findsearchInfo,
				status: this.findStatus
			}).then(res => {
				this.carrierList = res.records
				this.total= res.total
			})
		},
		ViewCarrierbills(carrierOrderID) {
			this.$router.push({name: 'viewcarrierbill', query: {carrierOrderID}})
		},
		reset() {
			this.findsearchInfo = ''
			this.findshipperBeginDate = ''
			this.findshipperEndDate = ''
			this.findRangeDate = []
			this.pageIndex = 1
			this.getList()
		},
		selectDateRange(date) {
			this.findshipperBeginDate = date[0]
			this.findshipperEndDate = date[1]
		},
		// 全选
		handleCheckAllChange(val) {
			let list = this.carrierList.map(item => item.carrierOrderID)
			if(val) {
				this.$store.dispatch('addCarrierBill', list)
				this.checked = true
			}else{
				this.$store.dispatch('delCarrierBill', list)
				this.checked = false
			}
		},
		// 单选
		selectCarrier(e, carrierOrderID){
			if(e.target.checked) {
				this.$store.dispatch('addCarrierBill', [carrierOrderID])
			}else{
				this.$store.dispatch('delCarrierBill', [carrierOrderID])
			}
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		Page
	},
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
	.tit
		td
			border-top 1px solid #bbb
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
		background #f0f0f0
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