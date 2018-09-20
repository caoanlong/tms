<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">客户定价</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="委托方">
						<el-input placeholder="名称" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
                    :data="tableData"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="委托方" prop="entruster" align="center"></el-table-column>
                    <el-table-column label="对客户应收运价" align="center">
                        <el-table-column label="吨公里价格" prop="recWeightPrice" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.recWeightPrice}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="方公里价格" prop="recVolumnPrice" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.recVolumnPrice}}元</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="对司机支付运价" align="center">
                        <el-table-column label="吨公里价格" prop="payWeightPrice" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.payWeightPrice}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="方公里价格" prop="payVolumnPrice" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.payVolumnPrice}}元</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
					<el-table-column label="线路定价" prop="linePrice" align="center"></el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{type: 'edit', id: scope.row.customerID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'linePrice', data: scope.row}">线路定价</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
        <edit-customer-price :isVisible="isEditVisible" :callback="callbackEdit"/>
        <line-price :isVisible="isLinePriceVisible" :callback="callbackLinePrice"/>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import EditCustomerPrice from './components/EditCustomerPrice'
import LinePrice from './components/LinePrice'
export default {
    mixins: [baseMixin],
    components: { EditCustomerPrice, LinePrice },
	data() {
		return {
			find: {
				keyword: ''
            },
            isEditVisible: false,
            isLinePriceVisible: false
		}
	},
	created() {
		this.getList()
	},
	methods: {
		reset() {
			this.find.keyword = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.getList()
		},
		getList() {
            this.tableData = [
                {
                    entruster: '神州贸易有限公司',
                    recWeightPrice: '0.5',
                    recVolumnPrice: '1.5',
                    payWeightPrice: '0.45',
                    payVolumnPrice: '1.35',
                    linePrice: '5'
                }
            ]
		},
		handleCommand(e) {
			if (e.type == 'edit') {
				this.isEditVisible = true
			} else if (e.type == 'linePrice') {
				this.isLinePriceVisible = true
			}
        },
        callbackEdit(data) {
            this.isEditVisible = false
        },
        callbackLinePrice(data) {
            this.isLinePriceVisible = false
        }
	}
}
</script>
<style lang="stylus" scoped>

</style>