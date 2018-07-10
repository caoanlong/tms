<template>
    <el-dialog title="驾驶员列表" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false">
        <el-form :inline="true" size="mini">
            <el-form-item label="驾驶员">
                <el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <el-table 
            :data="superCargos" 
            highlight-current-row
            @current-change="handleCurrentChange"
            border style="width: 100%" size="mini" stripe>
            <!-- <el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column> -->
            <el-table-column label="姓名" prop="realName" align="center"></el-table-column>
            <el-table-column label="手机号" prop="mobile" align="center"></el-table-column>
        </el-table>
        <Page :total="total" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
        <div slot="footer" class="dialog-footer">
            <el-button @click="control(false)">取 消</el-button>
            <!-- <el-button type="primary" @click="control(true)">确 定</el-button> -->
        </div>
    </el-dialog>
</template>
<script>
import Truck from '../../../api/Truck'
import Page from '../../CommonComponents/Page'
import { Message } from 'element-ui';
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
				keyword: ''
			},
            pageIndex: 1,
			pageSize: 10,
			total: 0,
            superCargos: []
        }
    },
    watch: {
        dialogVisible(newVal) {
            newVal && this.getList()
        }
    },
    components: { Page },
    methods: {
        handleCurrentChange(data) {
            const obj = { truckID: this.truckID }
            if (this.type == 'primary') {
                obj.primaryDriver = data.comSupercargoID
            } else {
                obj.secondaryDriver = data.comSupercargoID
            }
            Truck.changeDriver(obj).then(res => {
                Message.success(res.data.msg)
                this.control(true, data)
            })
		},
        reset() {
            this.find.keyword = ''
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
			Truck.findDriverList({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.find.keyword
			}).then(res => {
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
