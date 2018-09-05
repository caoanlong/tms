<template>
    <el-dialog 
        title="车辆人员" 
        :visible="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false">
        <el-form :inline="true" size="mini">
            <el-form-item label="关键字">
                <el-input placeholder="编号/姓名/车牌号/车长/车型" v-model="find.keyword"></el-input>
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
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
        <table class="dialog-table">
            <thead>
                <tr>
                    <th width="60">选择</th>
                    <th>车辆</th>
                    <th>驾驶员</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData" :key="item.truckID">
                    <td class="wf-check">
                        <span 
                            class="checkbox" 
                            :class="selected.truckID == item.truckID ? 'selected' : ''"
                            @click="handSelect(item)">
                        </span>
                    </td>
                    <td>
                        <strong>{{item.plateNo}}</strong>
                        <span>{{(Number(item.length)/1000).toFixed(2)}}米/{{truckType[item.truckType]}}/{{(Number(item.loads)/1000).toFixed(2)}}吨/{{item.loadVolume}}方</span>
                        <el-tag size="mini" type="success">{{item.workStatus == 'Free' ? '空闲' : '业务中'}}</el-tag>
                        <el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
                            <div slot="content">
                                <el-tag 
                                    size="mini" 
                                    type="danger" 
                                    v-for="(x, index) in item.expiredCertificateList" 
                                    :key="index" 
                                    v-if="item.expiredCertificate">
                                    {{ expireWarnJson[x] }}
                                </el-tag>
                            </div>
                            <el-tag size="mini" type="danger" v-if="item.expiredCertificate">到期</el-tag>
                        </el-tooltip>
                    </td>
                    <td>
                        <strong>{{item.primaryDriver && item.primaryDriver.realName}}</strong>
                        <span>{{item.primaryDriver && item.primaryDriver.mobile}}</span>
                        <el-tag size="mini" type="success" v-if="item.primaryDriver">空闲</el-tag>
                        <el-tag size="mini" type="warning" v-if="item.primaryDriver && item.primaryDriver.appStatus == 'Y'">APP</el-tag>
                        <el-tag size="mini" type="info" v-else-if="item.primaryDriver && item.primaryDriver.appStatus == 'N'">APP</el-tag>
                        <el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
                            <div slot="content">
                                <el-tag 
                                    size="mini" 
                                    type="danger" 
                                    v-for="(x, index) in item.primaryDriverExpiredCertificateList" 
                                    :key="index" 
                                    v-if="item.primaryDriver.expiredCertificate">
                                    {{ expireWarnJson[x] }}
                                </el-tag>
                            </div>
                            <el-tag size="mini" type="danger" v-if="item.primaryDriver && item.primaryDriver.expiredCertificate">到期</el-tag>
                        </el-tooltip>
                    </td>
                </tr>
            </tbody>
        </table>
        <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close(false)">取消</el-button>
            <el-button type="primary" @click="close(true)">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import Dispatchbill from '../../../api/Dispatchbill'
import truckType from '../../../assets/data/truckType'
import expireWarnJson from '../../../assets/data/expireWarnJson'
export default {
    mixins: [baseMixin],
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
                shipperDate: new Date().getTime(),
                workStatus: 'Free',
                appStatus: ''
            },
            selected: {}
        }
    },
    watch: {
        isVisible(newVal) {
            if (newVal) {
                this.reset()
                this.getList()
            }
        }
    },
    computed: {
        truckType: () => truckType,
        expireWarnJson: () => expireWarnJson
    },
    methods: {
        /**
         * 选择车辆（驾驶员）
         */
        handSelect(data) {
            this.selected = data
        },
        search() {
            if (!this.find.shipperDate) {
                Message.error('装车日期必填！')
                return
            }
            this.pageIndex = 1
			this.pageSize = 10
            this.getList()
        },
        reset() {
            this.find.keyword = ''
            this.find.shipperDate = new Date().getTime()
            this.find.workStatus = 'Free'
            this.find.appStatus = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
        getList() {
            this.tableData = []
			Dispatchbill.findTrucks({
				current: this.pageIndex,
				size: this.pageSize,
                keyword: this.find.keyword,
                shipperDate: this.find.shipperDate,
                workStatus: this.find.workStatus
			}).then(res => {
                this.total = res.total
                const list = res.records
                this.tableData = list.map(item => Object.assign(item, {
                    expiredCertificateList: item.expiredCertificate ? item.expiredCertificate.split(',') : [],
                    primaryDriverExpiredCertificateList: (item.primaryDriver && item.primaryDriver.expiredCertificate) 
                    ? item.primaryDriver.expiredCertificate.split(',') : []
                }))
			})
        },
        close(bool) {
            if (bool) {
                this.$emit('control', this.selected)
            } else {
                this.$emit('control')
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.wf-check
    position relative
    text-align center
    .checkbox
        display block
        width 14px
        height 14px
        margin 0 auto
        background url("../../../assets/imgs/checkbox.png") no-repeat 0 0
        cursor pointer
        &:hover
            background-position -14px 0
        &.selected
            background-position -28px 0
.dialog-table
    font-size 12px
    background #dcdfe6
    border-spacing 1px
    width 100%
    th
        background #f2f2f2
        color #666
        padding 10px 15px
    td
        padding 10px 15px
        background #fff
    .add-btn,.del-btn
        color #409EFF
        cursor pointer
</style>
