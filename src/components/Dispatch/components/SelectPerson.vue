<template>
    <el-dialog 
        :title="type == 'primary' ? '驾驶员列表' : '押运员列表'" 
        :visible="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false">
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
        <table class="dialog-table">
            <thead>
                <tr>
                    <th width="60">选择</th>
                    <th>姓名</th>
                    <th>手机号</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData" :key="item.comSupercargoID">
                    <td class="wf-check">
                        <span 
                            class="checkbox" 
                            :class="selected.comSupercargoID == item.comSupercargoID ? 'selected' : ''"
                            @click="handSelect(item)">
                        </span>
                    </td>
                    <td>
                        <span>{{item.realName}}</span>
                        <span v-if="type == 'primary'">
                            <el-tooltip placement="top" v-if="item.appStatus == 'Y'">
                                <div slot="content">开通APP接单</div>
                                <el-tag size="mini">APP</el-tag> 
                            </el-tooltip>
                            <el-tag type="info" size="mini" v-else>APP</el-tag> 
                        </span>
                        <el-tag type="success" size="mini" v-if="item.isPrimary == 'Y'">主驾</el-tag>
                        <el-tag type="success" size="mini" v-else-if="item.isSecondary == 'Y'">副驾</el-tag>
                        <el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
                            <div slot="content">
                                <el-tag size="mini" type="danger" v-for="(item,index) in item.expiredCertificate.split(',')" :key="index">
                                    {{ expireWarnJson[item] }}
                                </el-tag>
                            </div>
                            <el-tag size="mini" type="danger" v-if="item.expiredCertificate">到期</el-tag>
                        </el-tooltip>
                    </td>
                    <td><span>{{item.mobile}}</span></td>
                    <td>
                        <span v-if="item.workStatus == 'Free'">空闲</span>
                        <span v-else-if="item.workStatus == 'Working'">业务中</span>
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
import { baseMixin } from '../../../common/mixin'
import Dispatchbill from '../../../api/Dispatchbill'
import { Message } from 'element-ui'
export default {
    mixins: [baseMixin],
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        truck: Object,
        type: String
    },
    data() {
        return {
            find: {
                keyword: '',
                shipperDate: new Date().getTime(),
                workStatus: 'Free',
                appStatus: ''
            },
            selected: {},
            expireWarnJson:{
                DriverLicExpiresTime:"行驶证到期",
                RoadTransportLicAnnualPeriod:"道路运输证到期 ",
                GpsValidEndDate:"GPS到期 ",
                SaliInsuranceExpires:"交强险到期 ",
                BizInsuranceExpires:"商业险到期 ",
                CarrierRiskInsuranceExpires:"承运险到期 ",
                CargoInsuranceExpireDate:"货运险到期 ",
                TankQCExpires:"罐体监测到期 ",
                SafetyValvesQCExpires:"罐体安全阀监测到期 ",
                PressureGaugeQCExpires:"罐体压力表监测到期 ",
                secondaMaintainTime:"二级维护下次维护日期到期 ",
                NextRankEvaluteTime:"技术等级下次评定到期",
                SecondSecurityDepositDate:"二次安全保证金到期 ",
                ManagementAgreementExpireDate:"管理协议到期 ",
                SafetyLiabilityLetterExpireDate:"安全责任书到期",
                IdCardExpirationTime:"身份证到期 ",
                DriverLicenseEndTime:"驾驶证到期 ",
                QualificationExpirationDate:"危货从业资格证到期 ",
                IntegrityExamineEndTime:"诚信考核证到期 ",
                LaborContractEndTime:"聘用合同到期 ",
                EscortLicenseExpireDate:"押运证到期"
            }
        }
    },
    watch: {
        isVisible(newVal) {
            if (newVal) {
                this.reset()
                this.type == 'primary' ? this.getDriverList() : this.getSuperCagoList()
            }
        }
    },
    methods: {
        /**
         * 选择人员
         */
        handSelect(data) {
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
            this.selected = data
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
            this.tableData = []
			Dispatchbill.findDrivers({
				current: this.pageIndex,
				size: this.pageSize,
                keyword: this.find.keyword,
                shipperDate: this.find.shipperDate,
                workStatus: this.find.workStatus,
                appStatus: this.find.appStatus,
                truckID: this.truck.truckID
			}).then(res => {
                const list = res.records.map(item => {
                    return {
                        appStatus: item.appStatus,
                        comSupercargoID: item.comSupercargoID,
                        mobile: item.mobile,
                        headPic:item.headPic,
                        isPrimary:item.isPrimary,
                        isSecondary:item.isSecondary,
                        realName:item.realName,
                        supercargoType:item.supercargoType,
                        workStatus: item.workStatus,
                        expiredCertificate: item.expiredCertificate
                    }
                })
                this.total = res.total
                this.tableData = list
			})
        },
        getSuperCagoList() {
            this.tableData = []
			Dispatchbill.findStaffs({
				current: this.pageIndex,
				size: this.pageSize,
                keyword: this.find.keyword,
                shipperDate: this.find.shipperDate,
                workStatus: this.find.workStatus
			}).then(res => {
                const list = res.records.map(item => {
                    return {
                        comSupercargoID: item.comSupercargoID,
                        mobile: item.mobile,
                        headPic:item.headPic,
                        realName:item.realName,
                        supercargoType:item.supercargoType,
                        workStatus: item.workStatus,
                        expiredCertificate: item.expiredCertificate
                    }
                })
                this.total = res.total
                this.tableData = list
			})
		},
        close(bool) {
            if (bool) {
                this.$emit('control', this.selected, this.type)
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
    font-size 14px
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
