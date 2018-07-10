<template>
    <el-dialog :title="type == 'driver' ? '驾驶员列表' : '随车人员列表'" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false">
        <el-form :inline="true" size="mini">
            <el-form-item label="驾驶员">
                <el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
            </el-form-item>
            <el-form-item label="装车日期">
                <el-date-picker 
                    :editable="false"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期" 
                    v-model="find.shipperDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
                <el-select placeholder="请选择" v-model="find.workStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="工作中" value="Working"></el-option>
                    <el-option label="空闲中" value="Free"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <el-table 
            :data="superCargos" 
            @selection-change="selectionChange"
            border style="width: 100%" size="mini" stripe>
            <el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
            <el-table-column label="姓名" prop="companyName" align="center"></el-table-column>
            <el-table-column label="手机号" prop="companyName" align="center"></el-table-column>
            <el-table-column label="状态" prop="companyName" align="center"></el-table-column>
        </el-table>
        <Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
        <div slot="footer" class="dialog-footer">
            <el-button @click="control(false)">取 消</el-button>
            <el-button type="primary" @click="control(true)">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import Dispatchbill from '../../../../api/Dispatchbill'
import Page from '../../../CommonComponents/Page'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        type: String
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
            superCargos: [],
            selectedList: []
        }
    },
    components: { Page },
    methods: {
        selectionChange(data) {
			this.selectedList = data.map(item => item.transportRecordID)
		},
        reset() {
            this.find.keywords = ''
            this.find.shipperDate = new Date().getTime()
			this.find.workStatus = ''
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
        getList() {
			Dispatchbill.findStaffs({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword,
				workStatus: this.find.workStatus,
				shipperDate: this.find.shipperDate
			}).then(res => {
				this.superCargos = res
			})
		},
        control(bool) {
            this.$emit('control')
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
