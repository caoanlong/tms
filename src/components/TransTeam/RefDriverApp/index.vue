<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">关联司机APP</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="司机">
						<el-input placeholder="请输入姓名或手机号" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="关联状态">
						<el-select placeholder="全部" v-model="find.status">
							<el-option label="已同意" value="Agreed"></el-option>
							<el-option label="已邀请" value="Invited"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">邀请司机</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="姓名" prop="realName" align="center"></el-table-column>
					<el-table-column label="手机" prop="mobile" align="center"></el-table-column>
					<el-table-column label="关联状态" align="center">
						<template slot-scope="scope">
							<el-tag size="mini" type="success" v-if="scope.row.status == 'Agreed'">已同意</el-tag>
							<el-tag size="mini" v-else-if="scope.row.status == 'Invited'">已邀请</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="合作备注" prop="remark" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" :disabled="scope.row.status == 'Invited'" @click="relieve(scope.row.driverInvitationID)">解除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<InviteDriver :isVisible="isInviteVisible" @callback="handleInviteDriver"></InviteDriver>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import DriverInvitation from '../../../api/DriverInvitation'
import { deleteConfirm } from '../../../common/utils'
import InviteDriver from '../components/InviteDriver'
import { baseMixin } from '../../../common/mixin';
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
				keyword: '',
				status: ''
			},
			isInviteVisible: false,
			ExpireWarn:{}
		}
	},
	components: { InviteDriver },
	created() {
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.find = {
				keyword: '',
				status: ''
			}
			this.getList()
		}
	},
	methods: {
		reset() {
			this.find.keyword = ''
			this.find.status = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.customerID)
		},
		getList() {
			DriverInvitation.find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				status: this.find.status
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
		},
		add() { 
			this.isInviteVisible = true
		},
		del(customerID) {
			deleteConfirm(customerID, customerIDs => {
				Customer.del({ customerIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getList()
				})
			}, this.selectedList)
		},
		relieve(driverInvitationID) {
            this.$confirm('此操作将确定解除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                DriverInvitation.relieve({ driverInvitationID }).then(res => {
					Message.success('成功！')
					this.getList()
				})
            }).catch((err) => {
                Message.info('已取消')
            })
		},
		handleInviteDriver(bool) {
			this.isInviteVisible = false
			bool && this.getList()
		}
	}
}
</script>
<style lang="stylus" scoped>
.upload-File
	display inline-block
	margin 0 10px
</style>