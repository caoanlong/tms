<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">用户管理</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="终端号">
						<el-input placeholder="请输入终端号" v-model="find.deviceNumber"></el-input>
					</el-form-item>
                    <el-form-item label="车辆">
						<el-input placeholder="请输入车牌/手机号" v-model="find.keyword"></el-input>
					</el-form-item>
                    <el-form-item label="状态">
						<el-select placeholder="请选择" style="width:100%" v-model="find.recycleFlag">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="使用中" value="N"></el-option>
                            <el-option label="已回收" value="Y"></el-option>
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
					<el-table-column label="终端号" prop="deviceNumber"  align="center" width='200'></el-table-column>
					<el-table-column label="装配车辆" prop="plateNo"   align="center" width='150'></el-table-column>
					<el-table-column label="司机手机" prop="mobile"   align="center" width='140'></el-table-column>
					<el-table-column label="装配日期"  align="center">
						<template slot-scope="scope">
							<span>{{moment(scope.row.createTime).format('YYYY-MM-DD')}}</span>
						</template>
					</el-table-column>
					<el-table-column label="回收日期"  align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.updateTime">{{moment(scope.row.updateTime).format('YYYY-MM-DD')}}</span>
						</template>
					</el-table-column>
					<el-table-column label="装配天数" prop="loadDays"   align="center">
						<template slot-scope="scope">
							<span>{{moment(scope.row.updateTime).diff(moment(scope.row.createTime), 'days')}}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态" prop="recycleFlag" align="center">
						<template slot-scope="scope">
							<el-tag size="mini" type="warning" v-if="scope.row.recycleFlag == 'N'">使用中</el-tag>
							<el-tag size="mini" type="info" v-else-if="scope.row.recycleFlag == 'Y'">已回收</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
                            <el-button 
								type="danger" 
								size="mini" 
								v-if="scope.row.recycleFlag == 'N'" 
								@click="recycle(scope.row)">
								回收
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
        <issue-device :isVisible="isIssueDeviceVisible" @control="issueDeviceCallback"></issue-device>
        <recycle-device :isVisible="isRecycleDeviceVisible" :gpdDevice="currentGpdDevice" @control="recycleDeviceCallback"></recycle-device>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import IssueDevice from './components/IssueDevice'
import RecycleDevice from './components/RecycleDevice'
import DriverPortalGpsSetupLog from '../../../api/DriverPortalGpsSetupLog'
export default {
    mixins: [baseMixin],
    components: { IssueDevice, RecycleDevice },
	data() {
		return {
			find: {
				deviceNumber: '',
				keyword: '',
				recycleFlag: ''
			},
			currentGpdDevice: {},
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
			this.find.deviceNumber = ''
			this.find.keyword = ''
			this.find.recycleFlag = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			DriverPortalGpsSetupLog.find({
				current: this.pageIndex,
				size: this.pageSize,
				deviceNumber: this.find.deviceNumber,
				keyword: this.find.keyword,
				recycleFlag: this.find.recycleFlag
			}).then(res => {
				this.total = res.total
            	this.tableData = res.records
			})
		},
		recycle(obj) {
			this.isRecycleDeviceVisible = true
			this.currentGpdDevice = obj
		},
        issueDeviceCallback() {
			this.isIssueDeviceVisible = false
			this.getList()
		},
		recycleDeviceCallback() {
			this.isRecycleDeviceVisible = false
			this.getList()
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>
