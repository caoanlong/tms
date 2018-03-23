<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">承运单列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字" >
						<el-input placeholder="请输入关键字" style="width:150px"></el-input>
					</el-form-item>
					
					<el-form-item label="创建时间">
						<el-date-picker v-model="carrierbills.CreatDate" type="date" placeholder="选择创建时间" style="width:140px"></el-date-picker>
					</el-form-item>
					<el-form-item label="发货时间">
						<el-date-picker v-model="carrierbills.DeliveryDate" type="date" placeholder="选择发货时间" style="width:140px"></el-date-picker>
					</el-form-item>
					<el-form-item label="到货时间">
						<el-date-picker v-model="carrierbills.ArrivalDate" type="date" placeholder="选择到货时间" style="width:140px"></el-date-picker>
					</el-form-item>
					<el-form-item label="运单状态" class="customerSelect">
						<el-select v-model="carrierbills.Status" placeholder="运单状态" style="width:140px">
							<el-option value="0" label="全部订单">全部订单</el-option>
							<el-option value="1" label="待执行">待执行</el-option>
							<el-option value="2" label="执行中">执行中</el-option>
							<el-option value="3" label="已签收">已签收</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" >搜索</el-button>
						<el-button type="default" >重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="AddCarrierbill">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-news">调度</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini" stripe>
					<el-table-column type="selection" width="36" align="center" fixed>
					</el-table-column>
					<el-table-column label="处理状态"  prop="Status" width="90" align="center">
					</el-table-column>
					<el-table-column label="承运单号" prop="CarrierNum" width="100" align="center">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top" class="customerTablePop">
								<p>发货单位：{{ scope.row.ConsignerCompany }}</p>
								<p>发货地：{{ scope.row.Dispatch }}</p>
								<p>收货单位：{{ scope.row.ConsigneeCompany }}</p>
								<p>卸货地：{{ scope.row.Discharge }}</p>
								<div slot="reference" class="name-wrapper">
									<span style="color:#409EFF">{{ scope.row.CarrierNum}}</span>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="收货单位" prop="ConsigneeCompany">
					</el-table-column>
					<el-table-column label="卸货地" prop="Discharge">
					</el-table-column>
					<el-table-column label="收货人" prop="Consignee">
					</el-table-column>
					<el-table-column label="到货时间" prop="ArrivalDate" width="120" align="center">
					</el-table-column>
					<el-table-column label="货物规格/货物名称" prop="CargoName">
					</el-table-column>
					<el-table-column label="货物总量" prop="CargoTotal">
					</el-table-column>
					<el-table-column label="发货单位" prop="ConsignerCompany">
					</el-table-column>
					<el-table-column label="发货时间" prop="DeliveryDate" width="120" align="center">
					</el-table-column>
					<el-table-column label="发货人" prop="Consigner">
					</el-table-column>
					<el-table-column label="发货地" prop="Dispatch">
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.CarrierNum}" icon="el-icon-view">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.CarrierNum}">编辑</el-dropdown-item>
									<el-dropdown-item>删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getCargoList()">
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
export default {
	data() {
		return {
			pageNum: 1,
			pageSize: 10,
			count: 15,
			carrierbills:{
				Status:'',
				CreatDate:'',
				DeliveryDate:''
			},
			tableData: [
				{
					Status: '待执行',
					CarrierNum: '20180205001',
					ConsigneeCompany: '云南磷化',
					Discharge: '云南省昭通市镇远县城李家沟',
					Consignee: '磷化',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9.76吨/10方',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018-02-06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R72/炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205002',
					ConsigneeCompany: '四川铁建',
					Discharge: '云南省红河州个旧市金湖广场',
					Consignee: '铁建',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R11炸药、R33硝酸'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205003',
					ConsigneeCompany: '昆钢鑫龙',
					Discharge: '尖山',
					Consignee: '刘备',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '330吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205004',
					ConsigneeCompany: '云南磷化',
					Discharge: '云南省昭通市镇远县城李家沟',
					Consignee: '磷化',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9.76吨/10方',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018-02-06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R72/炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205005',
					ConsigneeCompany: '四川铁建',
					Discharge: '云南省红河州个旧市金湖广场',
					Consignee: '铁建',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R11炸药、R33硝酸'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205006',
					ConsigneeCompany: '昆钢鑫龙',
					Discharge: '尖山',
					Consignee: '刘备',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '330吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205007',
					ConsigneeCompany: '云南磷化',
					Discharge: '云南省昭通市镇远县城李家沟',
					Consignee: '磷化',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9.76吨/10方',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018-02-06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R72/炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205008',
					ConsigneeCompany: '四川铁建',
					Discharge: '云南省红河州个旧市金湖广场',
					Consignee: '铁建',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R11炸药、R33硝酸'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205009',
					ConsigneeCompany: '昆钢鑫龙',
					Discharge: '尖山',
					Consignee: '刘备',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '330吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205010',
					ConsigneeCompany: '云南磷化',
					Discharge: '云南省昭通市镇远县城李家沟',
					Consignee: '磷化',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9.76吨/10方',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018-02-06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R72/炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205011',
					ConsigneeCompany: '四川铁建',
					Discharge: '云南省红河州个旧市金湖广场',
					Consignee: '铁建',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R11炸药、R33硝酸'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205012',
					ConsigneeCompany: '昆钢鑫龙',
					Discharge: '尖山',
					Consignee: '刘备',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '330吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205013',
					ConsigneeCompany: '云南磷化',
					Discharge: '云南省昭通市镇远县城李家沟',
					Consignee: '磷化',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9.76吨/10方',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018-02-06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R72/炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205014',
					ConsigneeCompany: '四川铁建',
					Discharge: '云南省红河州个旧市金湖广场',
					Consignee: '铁建',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'R11炸药、R33硝酸'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205015',
					ConsigneeCompany: '昆钢鑫龙',
					Discharge: '尖山',
					Consignee: '刘备',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '330吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName:'炸药'
				}
			],
			refreshing: false
		}
	},
	created() {
		this.getCarrierbillList()
	},
	methods: {
		pageChange(index) {
			
		},
		getCarrierbillList(){

		},
		handleCommand(command) {
			if(command.type=='view'){
				this.$router.push({ name: 'viewcarrierbill' , query: { CarrierNum:command.id } })
			}else if(command.type=='edit'){
				this.$router.push({ name: 'editcarrierbill' , query: {  CarrierNum:command.id } })
			}
		},
		AddCarrierbill() {
			this.$router.push({ name: 'addcarrierbill' })
		},
		refresh() {
			this.refreshing = true
			this.getCarrierbillList()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
		},
	}
}

</script>
<style lang="stylus" scoped>

</style>
