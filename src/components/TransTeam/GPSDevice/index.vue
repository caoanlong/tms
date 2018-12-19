<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">用户管理</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="终端号">
						<el-input placeholder="请输入终端号" v-model="find.snNo"></el-input>
					</el-form-item>
                    <el-form-item label="车辆">
						<el-input placeholder="请输入车牌/手机号" v-model="find.truck"></el-input>
					</el-form-item>
                    <el-form-item label="状态">
						<el-select placeholder="请选择" style="width:100%" v-model="find.status">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="使用中" value="use"></el-option>
                            <el-option label="已回收" value="recycle"></el-option>
                        </el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="isIssueDeviceVisible = true">发放设备</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="终端号" prop="snNo"></el-table-column>
					<el-table-column label="装配车辆" prop="plateNo"></el-table-column>
					<el-table-column label="司机手机" prop="mobile"></el-table-column>
					<el-table-column label="装配日期" prop="loadDate"></el-table-column>
					<el-table-column label="回收日期" prop="recycleDate"></el-table-column>
					<el-table-column label="装配天数" prop="loadDays"></el-table-column>
					<el-table-column label="状态" prop="status"></el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="isRecycleDeviceVisible = true">回收</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
        <issue-device :isVisible="isIssueDeviceVisible" @control="issueDeviceCallback"></issue-device>
        <recycle-device :isVisible="isRecycleDeviceVisible" @control="recycleDeviceCallback"></recycle-device>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import IssueDevice from './components/IssueDevice'
import RecycleDevice from './components/RecycleDevice'
export default {
    mixins: [baseMixin],
    components: { IssueDevice, RecycleDevice },
	data() {
		return {
			find: {
				snNo: '',
				truck: '',
				status: ''
            },
            isIssueDeviceVisible: false,
            isRecycleDeviceVisible: false
		}
	},
	created() {
		this.getList()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.reset()
		}
	},
	methods: {
		reset() {
			this.find.snNo = ''
			this.find.truck = ''
			this.find.status = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
            this.total = 1
            this.tableData = [
                {
                    snNo: 123,
                    plateNo: '鄂A585KT',
                    mobile: '13049497395',
                    loadDate: '2018-12-15',
                    recycleDate: '2018-12-19',
                    loadDays: '12',
                    status: '使用中',
                }
            ]
		},
        issueDeviceCallback() {
            this.isIssueDeviceVisible = false
		},
		recycleDeviceCallback() {
			this.isRecycleDeviceVisible = false
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>
