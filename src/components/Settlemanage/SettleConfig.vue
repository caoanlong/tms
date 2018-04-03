<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">运费模板</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findshipperCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="发货地">
						<el-input placeholder="请输入..." v-model="findshipperArea"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findconsigneeCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="收货地">
						<el-input placeholder="请输入..." v-model="findconsigneeArea"></el-input>
					</el-form-item>
					<el-form-item label="对外运距">
						<el-input placeholder="请输入..." v-model="findexternalMileage"></el-input>
					</el-form-item>
					<el-form-item label="对内运价">
						<el-input placeholder="请输入..." v-model="findinternalPrice"></el-input>
					</el-form-item>
					<el-form-item label="对外运价">
						<el-input placeholder="请输入..." v-model="findexternalPrice"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList(1)">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="发货地" prop="shipperArea"></el-table-column>
					<el-table-column label="发货详细地址" prop="shipperDetailAddress"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="收货地" prop="consigneeArea"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress"></el-table-column>
					<el-table-column label="对内运距" prop="mileage"></el-table-column>
					<el-table-column label="对内运价" prop="internalPrice"></el-table-column>
					<el-table-column label="对内TKM" prop="internalUnitPrice"></el-table-column>
					<el-table-column label="对外运距" prop="externalMileage"></el-table-column>
					<el-table-column label="对外运价" prop="externalPrice"></el-table-column>
					<el-table-column label="对外TKM" prop="externalUnitPrice"></el-table-column>
					<el-table-column label="对内月结比率" prop="internalAbschlussRate" width="100"></el-table-column>
					<el-table-column label="对内现付比率" prop="internalCashRate" width="100"></el-table-column>
					<el-table-column label="对内到付比率" prop="internalCodRate" width="100"></el-table-column>
					<el-table-column label="对内收货方到付比率" prop="internalConsigneeCodRate" width="140"></el-table-column>
					<el-table-column label="对外月结比率" prop="externalAbschlussRate" width="100"></el-table-column>
					<el-table-column label="对外现付比率" prop="externalCashRate" width="100"></el-table-column>
					<el-table-column label="对外到付比率" prop="externalCodRate" width="100"></el-table-column>
					<el-table-column label="对外收货方到付比率" prop="externalConsigneeCodRate" width="140"></el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.transporPriceID}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id:scope.row.transporPriceID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id:scope.row.transporPriceID}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize">
							<el-option label="10" value="10"></el-option>
							<el-option label="20" value="20"></el-option>
							<el-option label="30" value="30"></el-option>
							<el-option label="40" value="40"></el-option>
							<el-option label="50" value="50"></el-option>
							<el-option label="100" value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import request from '../../common/request'
	export default {
		data() {
			return {
				findconsigneeArea:'',
				findconsigneeAreaID:'',
				findconsigneeCompanyName:'',
				findconsigneeDetailAddress:'',
				findconsigneeID:'',
				findconsignorID:'',
				findconsignorName:'',
				findexternalAbschlussRate:'',
				findexternalCashRate:'',
				findexternalCodRate:'',
				findexternalConsigneeCodRate:'',
				findexternalMileage:'',
				findexternalPorRate:'',
				findexternalPrice:'',
				findexternalUnitPrice:'',
				findinternalAbschlussRate:'',
				findinternalCashRate:'',
				findinternalCodRate:'',
				findinternalConsigneeCodRate:'',
				findinternalPorRate:'',
				findinternalPrice:'',
				findinternalUnitPrice:'',
				findmileage:'',
				findshipperArea:'',
				findshipperAreaID:'',
				findshipperCompanyName:'',
				findshipperDetailAddress:'',
				findshipperID:'',
				findtransporPriceID:'',
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				tabSelected: 'driver',
				tableData: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList(pageIndex) {
				let params = {
					current: pageIndex || 1,
					size: this.pageSize,
					consigneeArea:this.findconsigneeArea,
					consigneeAreaID:this.findconsigneeAreaID,
					consigneeCompanyName:this.findconsigneeCompanyName,
					consigneeDetailAddress:this.findconsigneeDetailAddress,
					consigneeID:this.findconsigneeID,
					consignorID:this.findconsignorID,
					consignorName:this.findconsignorName,
					externalAbschlussRate:this.findexternalAbschlussRate,
					externalCashRate:this.findexternalCashRate,
					externalCodRate:this.findexternalCodRate,
					externalConsigneeCodRate:this.findexternalConsigneeCodRate,
					externalMileage:this.findexternalMileage,
					externalPorRate:this.findexternalPorRate,
					externalPrice:this.findexternalPrice,
					externalUnitPrice:this.findexternalUnitPrice,
					internalAbschlussRate:this.findinternalAbschlussRate,
					internalCashRate:this.findinternalCashRate,
					internalCodRate:this.findinternalCodRate,
					internalConsigneeCodRate:this.findinternalConsigneeCodRate,
					internalPorRate:this.findinternalPorRate,
					internalPrice:this.findinternalPrice,
					internalUnitPrice:this.findinternalUnitPrice,
					mileage:this.findmileage,
					shipperArea:this.findshipperArea,
					shipperAreaID:this.findshipperAreaID,
					shipperCompanyName:this.findshipperCompanyName,
					shipperDetailAddress:this.findshipperDetailAddress,
					shipperID:this.findshipperID,
					transporPriceID:this.findtransporPriceID
				}
				request({
					url: '/transportPrice/findList',
					params
				}).then(res => {
					console.log(res.data)
					this.tableData = res.data.data.records
					this.total= res.data.data.total
				})
			},
			reset() {
				this.findconsigneeArea = "",
				this.findconsigneeCompanyName = "",
				this.findexternalPrice = "",
				this.findinternalPrice = "",
				this.findshipperArea = "",
				this.findshipperCompanyName = ""
			},
			pageChange(index) {
				this.pageIndex = index
			},
			handleTabSelected(tab) {
				console.log(tab.$options.propsData.name)
			},
			handleCommand(command) {
				if(command.type=='view'){
					this.$router.push({name: 'viewsettleconfig', query: { transporPriceID:command.id }})
				}else if(command.type=='edit'){
					this.$router.push({ name: 'editsettleconfig' , query: {  transporPriceID:command.id } })
				}
			},
			add() {
				this.$router.push({name: 'addsettleconfig'})
			},
			deleteConfirm(i) {
				console.log(i)
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData.splice(i, 1)
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>

</style>