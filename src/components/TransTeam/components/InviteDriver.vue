<template>
    <el-dialog title="邀请司机" width="50%" :visible.sync="isVisible" :show-close="false" custom-class="table" :close-on-click-modal="false">
        <div class="box-card">
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="司机">
						<el-input placeholder="请输入姓名或手机号" v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="全部" v-model="find.status">
							<el-option label="未邀请" value="NotInvited"></el-option>
							<el-option label="已拒绝" value="Rejected"></el-option>
							<el-option label="已解除" value="Relieved"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
            <div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="invite">批量邀请</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData"
					@selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
                    <el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="姓名" prop="realName" align="center"></el-table-column>
					<el-table-column label="手机" prop="mobile" align="center"></el-table-column>
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<el-tag size="mini" type="primary" v-if="scope.row.status == 'NotInvited'">未邀请</el-tag>
							<el-tag size="mini" type="danger" v-else-if="scope.row.status == 'Rejected'">已拒绝</el-tag>
							<el-tag size="mini" type="info" v-else-if="scope.row.status == 'Relieved'">已解除</el-tag>
						</template>
					</el-table-column>
                    <el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" @click="invite(scope.row.comSupercargoID)">邀请</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { Message } from 'element-ui'
import DriverInvitation from '../../../api/DriverInvitation'
import Page from '../../CommonComponents/Page'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            find: {
                keyword: '',
                status: ''
            },
            pageIndex: 1,
			pageSize: 10,
			total: 0,
            tableData: [],
            selectedList: []
        }
    },
    watch: {
        isVisible(newVal) {
            newVal && this.getList()
        }
    },
    components: { Page },
    methods: {
		search() {
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
        reset() {
			this.find.keyword = ''
			this.find.status = ''
			this.pageIndex = 1
			this.pageSize = 10
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
			this.selectedList = data.map(item => item.comSupercargoID)
		},
        getList() {
			DriverInvitation.findNotLinkedList({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				status: this.find.status
			}).then(res => {
				this.tableData = res.records
				this.total = res.total
			})
        },
        invite(comSupercargoID) {
            let comSupercargoIDs = []
            if (comSupercargoID && (typeof comSupercargoID == 'string' || typeof comSupercargoID == 'number')) {
                comSupercargoIDs = comSupercargoID
            } else {
                comSupercargoIDs = this.selectedList.join(',')
            }
            if(comSupercargoIDs.length == 0) {
                Message.warning('请选择')
                return
            }
            this.$confirm('此操作将确定邀请, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                DriverInvitation.add({ comSupercargoIDs }).then(res => {
                    Message.success(res.data.msg)
                    this.$emit('callback', true)
                })
            }).catch((err) => {
                Message.info('已取消')
            })
        },
        cancel() {
            this.$emit('callback', false)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
