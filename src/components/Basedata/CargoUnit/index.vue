<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">货物单位</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="find.keyword" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="dialogFormVisible = true" v-if="permissions[$route.name]&&permissions[$route.name]['add']">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del" v-if="permissions[$route.name]&&permissions[$route.name]['delete']">批量删除</el-button>
				<a :href="exportExcelUrl" download="goodssource.xlsx" class="exportExcel el-icon-download" v-if="permissions[$route.name]&&permissions[$route.name]['export']">导出</a>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData"
					@selection-change="selectionChange"
                    v-loading="loading"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40" :selectable="(row, index) => row.blDefault == 'N'"></el-table-column>
					<el-table-column label="单位" prop="unit" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope" v-if="scope.row.blDefault == 'N' && (permissions[$route.name]&&permissions[$route.name]['delete'])">
							<el-button type="danger" size="mini"  @click="del(scope.row.cargoUnitID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<el-dialog title="添加货物单位" :visible.sync="dialogFormVisible">
			<el-form :model="unit" :rules="rules" ref="ruleForm">
				<el-form-item label="名称" label-width="80px" prop="unit">
					<el-input placeholder="请输入货物单位" v-model="unit.unit"></el-input>
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
import { mapGetters } from 'vuex'
import { baseMixin } from '../../../common/mixin'
import { baseURL } from '../../../common/request'
import { deleteConfirm } from '../../../common/utils'
import Company from '../../../api/Company';
export default {
	mixins: [baseMixin], 
	data() {
		return {
			dialogFormVisible: false,
			exportExcelUrl: '',
			find: { keyword: '' },
			unit: { unit: ''},
			rules: {
				unit: [{required: true, message: '请输入货物单位'}, {min: 1, max: 20, message: '长度在 1 到 20 个字符'}]
			}
		}
	},
	created() {
		this.resetExportExcelUrl()
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
    },
    computed: {
        ...mapGetters(['permissions'])
    },
	methods: {
		resetExportExcelUrl(){
			this.exportExcelUrl = baseURL + '/company/cargoUnit/export?Request-From=PC&Authorization=' + localStorage.getItem("token")
				+ '&unit=' + this.find.keyword
		},
		inputChange() {
			this.resetExportExcelUrl()
		},
		reset() {
			this.find.keyword = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.cargoUnitID)
		},
		getList() {
            this.loading = true
			Company.cargoUnitFind({
				current: this.pageIndex,
				size: this.pageSize,
				unit:this.find.keyword,
			}).then(res => {
				this.tableData = res.records
                this.total= res.total
                this.loading = false
			})
		},
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				Company.cargoUnitAdd({
					unit: this.unit.unit
				}).then(res => {
					this.dialogFormVisible = false
					this.unit.unit = ''
					this.getList()
					Message.success('保存成功！')
				})
			})
		},
		del(cargoUnitID) {
			deleteConfirm(cargoUnitID, cargoUnitIDs => {
				Company.cargoUnitDeleteBatch({ cargoUnitIDs }).then(res => {
					Message.success('删除成功!')
					this.getList()
				})
			}, this.selectedList)
		}
	}
}
</script>
<style lang="stylus" scoped>
.download-btn
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-left 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
.upload-File
	display inline-block
	margin 0 10px
</style>