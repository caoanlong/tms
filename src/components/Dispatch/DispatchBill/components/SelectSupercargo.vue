<template>
    <el-dialog :title="type == 'primary' ? '驾驶员列表' : '押运员列表'" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false">
        <el-form :inline="true" size="mini">
            <el-form-item :label="type == 'primary' ? '驾驶员' : '押运员'">
                <el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
            </el-form-item>
            <el-form-item label="装车日期">
                <el-date-picker 
                    style="width: 100%" 
                    v-model="find.shipperDate"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
                <el-select placeholder="请选择" v-model="find.workStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="空闲" value="Free"></el-option>
                    <el-option label="业务中" value="Working"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="APP激活状态" v-if="type == 'primary'">
                <el-select placeholder="请选择" v-model="find.appStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已激活" value="Y"></el-option>
                    <el-option label="未激活" value="N"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table 
            :data="superCargos" 
            highlight-current-row
            @current-change="handleCurrentChange"
            border style="width: 100%" size="mini" stripe>
            <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.realName}}</span>
                    <span v-if="type == 'primary'">
                        <el-tooltip placement="top" v-if="scope.row.appStatus == 'Y'">
                            <div slot="content">开通APP接单</div>
                            <el-tag size="mini">APP</el-tag> 
                        </el-tooltip>
                        <el-tag type="info" size="mini" v-else>APP</el-tag> 
                    </span>
                    <el-tag type="success" size="mini" v-if="scope.row.isPrimary == 'Y'">主驾</el-tag>
                    <el-tag type="success" size="mini" v-else-if="scope.row.isSecondary == 'Y'">副驾</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="手机号" prop="mobile" align="center"></el-table-column>
            <el-table-column label="状态" prop="workStatus" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.workStatus == 'Free'">空闲</span>
                    <span v-else-if="scope.row.workStatus == 'Working'">业务中</span>
                </template>
            </el-table-column>
        </el-table>
        <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
        <div slot="footer" class="dialog-footer">
            <el-button @click="control(false)">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import Dispatchbill from '../../../../api/Dispatchbill'
import Page from '../../../CommonComponents/Page'
import { Message } from 'element-ui'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        type: String,
        truck: Object
    },
    data() {
        return {
            find: {
                keyword: '',
                shipperDate: new Date().getTime(),
                workStatus: 'Free',
                appStatus: ''
			},
            pageIndex: 1,
			pageSize: 10,
			total: 0,
            superCargos: []
        }
    },
    watch: {
        dialogVisible(newVal) {
            this.reset()
            newVal && (this.type == 'primary' ? this.getDriverList() : this.getSuperCagoList())
        }
    },
    components: { Page },
    methods: {
        handleCurrentChange(data) {
            if (this.type == 'primary') {
                if (data.appStatus != 'Y') {
                    Message.error('该司机未在APP激活！')
                    return
                }
                if (this.truck.superCargo && this.truck.superCargo.supercargoType == 'SupercargoDriver' 
                    && data.comSupercargoID == this.truck.superCargo.comSupercargoID) {
                    Message.error('该司机已经是押运员了！')
                    return
                }
            } else {
                if (this.truck.primaryDriver && this.truck.primaryDriver.supercargoType == 'SupercargoDriver' 
                    && data.comSupercargoID == this.truck.primaryDriver.comSupercargoID) {
                    Message.error('该押运员已经是司机了！')
                    return
                }
            }
            data && this.$emit('control', true, data, this.type)
        },
        search() {
            if (!this.find.shipperDate) {
                Message.error('装车日期必填！')
                return
            }
            this.pageIndex = 1
			this.pageSize = 10
            this.type == 'primary' ? this.getDriverList() : this.getSuperCagoList()
        },
        reset() {
            this.find.keyword = ''
            this.find.shipperDate = new Date().getTime()
            this.find.workStatus = 'Free'
            this.find.appStatus = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.type == 'primary' ? this.getDriverList() : this.getSuperCagoList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.type == 'primary' ? this.getDriverList() : this.getSuperCagoList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.type == 'primary' ? this.getDriverList() : this.getSuperCagoList() 
        },
        getDriverList() {
			Dispatchbill.findDrivers({
				current: this.pageIndex,
				size: this.pageSize,
                keyword: this.find.keyword,
                shipperDate: this.find.shipperDate,
                workStatus: this.find.workStatus,
                appStatus: this.find.appStatus,
                truckID: this.truck.truckID
			}).then(res => {
                this.total = res.total
                this.superCargos = res.records
			})
        },
        getSuperCagoList() {
			Dispatchbill.findStaffs({
				current: this.pageIndex,
				size: this.pageSize,
                keyword: this.find.keyword,
                shipperDate: this.find.shipperDate,
                workStatus: this.find.workStatus
			}).then(res => {
                this.total = res.total
                this.superCargos = res.records
			})
		},
        control(bool) {
            this.$emit('control', bool)
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
