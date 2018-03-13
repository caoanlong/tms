<template>
	<div class="main-content">
		<el-card class="box-card hasTit">
			<div slot="header" class="clearfix">新的调度
				<el-button type="text" icon="el-icon-plus" class="addBtn">添加承运单</el-button>
			</div>
			<div class="table">
				<el-table :data="carrierbillInfo" border style="width: 100%" size="mini">
					<el-table-column label="承运单号" prop="CarrierNum" width="110" align="center">
					</el-table-column>
					<el-table-column label="发货地" prop="Dispatch">
					</el-table-column>
					<el-table-column label="收货地" prop="Discharge">
					</el-table-column>
					<el-table-column label="到货时间" prop="ArrivalDate" width="140" align="center">
					</el-table-column>
				</el-table>
				<el-table :data="CargoInfo" border style="width: 100%;margin-top:-1px" size="mini">
					<el-table-column type="selection" width="40" align="center">
					</el-table-column>
					<el-table-column label="货物规格/货物名称" prop="CargoName">
					</el-table-column>
					<el-table-column label="待配载量">
						<template slot-scope="scope">
							{{scope.row.CargoWeight?scope.row.CargoWeight :'' }}
							{{scope.row.CargoVolume?' / ' + scope.row.CargoVolume :''}}
							{{scope.row.CargoNum?' / '+scope.row.CargoNum:''}}
						</template>
					</el-table-column>
					<el-table-column label="配载重量">
						<template slot-scope="scope">
							<el-input placeholder="配载重量" size="mini"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="配载体积">
						<template slot-scope="scope">
							<el-input placeholder="配载体积" size="mini"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="配载件数">
						<template slot-scope="scope">
							<el-input placeholder="配载件数" size="mini"></el-input>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="card-footer">
				<el-button type="primary">下一步</el-button>
				<el-button @click="back">返回</el-button>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
export default {
	data() {
		return {
			carrierbillInfo: [{
				CarrierNum: '20180205001',
				Discharge: '云南省昭通市镇远县城李家沟',
				ArrivalDate: '2018:02:06 18:00',
				Dispatch: '云南省昆明市安宁市区山顶上化工厂',	
			}],
			CargoInfo:[
				{
					CargoName: 'R72/炸药',
					CargoWeight:'9.76吨',
					CargoVolume:'10方',
					CargoNum:''
				},
				{
					CargoName: 'R72/炸药',
					CargoWeight:'9.76吨',
					CargoVolume:'10方',
					CargoNum:''
				}
			]
		}
	},
	created() {

	},
	methods: {

		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
	.el-card__header
		.addBtn
			position absolute
			margin-right 0
			right 20px
			top 8px
	.tips
		color #909399
	.card-footer
		margin-top 20px
		text-align center
</style>
