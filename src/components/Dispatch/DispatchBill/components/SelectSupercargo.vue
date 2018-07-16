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
                    <el-option label="空闲" value="Free"></el-option>
                    <el-option label="业务中" value="Working"></el-option>
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
            <el-table-column label="姓名" prop="realName" align="center"></el-table-column>
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
        truckID: String
    },
    data() {
        return {
            find: {
                keyword: '',
                shipperDate: new Date().getTime(),
                workStatus: ''
			},
            pageIndex: 1,
			pageSize: 10,
			total: 0,
            superCargos: []
        }
    },
    watch: {
        dialogVisible(newVal) {
            newVal && (this.type == 'primary' ? this.getDriverList() : this.getSuperCagoList())
        }
    },
    components: { Page },
    methods: {
        handleCurrentChange(data) {
            data && this.$emit('control', true, data, this.type)
        },
        search() {
            this.type == 'primary' ? this.getDriverList() : this.getSuperCagoList()
        },
        reset() {
            this.find.keyword = ''
            this.find.shipperDate = ''
            this.find.workStatus = ''
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
                workStatus: this.find.workStatus
			}).then(res => {
                this.superCargos = res.records
                this.total = res.total
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
                this.superCargos = res.records
                this.total = res.total
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
