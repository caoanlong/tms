<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">货物单位</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="货物单位名称">
						<el-input placeholder="请输入货物单位" v-model="find.unit"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="单位" prop="unit" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="danger" size="mini" @click="del(scope.row.cargoUnitID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
		<el-dialog title="添加货物单位" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="单位名称" label-width="80px">
					<el-input placeholder="请输入货物单位" auto-complete="off" v-model="unit"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import CargoUnit from '../../api/CargoUnit'
import Page from '../CommonComponents/Page'
import { deleteConfirm } from '../../common/utils'
export default {
	data() {
		return {
			dialogFormVisible: false,
			find: { unit: '' },
			unit: '',
			pageIndex: 1,
			pageSize: 10,
			total:0,
			tableData: [],
			selectedList: []
		}
	},
	components: {
		Page
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.find.unit = ''
			this.pageIndex = 1
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.cargoUnitID)
			console.log(this.selectedList)
		},
		getList() {
			CargoUnit.find({
				current: this.pageIndex,
				size: this.pageSize,
				unit:this.find.unit,
			}).then(res => {
				this.tableData = res.records
				this.total= res.total
			})
		},
		add() { 
			CargoUnit.add({
				unit: this.unit
			}).then(res => {
				this.dialogFormVisible = false
				this.unit = ''
				this.getList()
				Message.success('保存成功！')
			})
		},
		del(cargoUnitID) {
			deleteConfirm(cargoUnitID, cargoUnitIDs => {
				CargoUnit.del({ cargoUnitIDs }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			}, this.selectedList)
		}
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
</style>