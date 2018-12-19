<template>
    <div class="map-container" :class="isMax?'max':''">
        <div class="dialog-tit">
            <div class="title">选择定位地址</div>
            <span class="minMax" @click="resizeDialog">
                <svg-icon :icon-class="isMax?'min':'max'"></svg-icon>
            </span>
            <span class="closeBtn" @click="close">
                <svg-icon icon-class="close"></svg-icon>
            </span>
        </div>
        <div class="wrapper">
            <div id="amapLocationSelect"></div>
        </div>
        <el-form :inline="true" size="mini" style="margin-top:20px">
            <el-form-item label="关键字">
                <el-input placeholder="编号/姓名/车牌号/车长/车型" v-model="find.keyword" style="width:190px"></el-input>
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
                <el-button type="default" size="mini" icon="el-icon-refresh" @click="checkGPS">刷新GPS</el-button>
            </el-form-item>
        </el-form>
        <table class="dialog-table">
            <thead>
                <tr>
                    <th width="60">选择</th>
                    <th>车辆</th>
                    <th>定位位置</th>
                    <th>定位时间</th>
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
                    <td align="center">
                        <strong>{{item.plateNo}}</strong>
                        <span>{{[(Number(item.length)/1000).toFixed(2) + '米', TRUCKTYPE[item.truckType]].join('/')}}</span>
                        <el-tag 
                            size="mini" 
                            type="success">
                            {{item.workStatus == 'Free' ? '空闲' : '业务中'}}
                        </el-tag>
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">{{item.gpsFlag == 'Y' ? 'GPS已安装' : 'GPS未安装'}}</div>
                            <el-tag 
                                size="mini" 
                                :type="item.gpsFlag == 'Y' ? 'success' : 'info'" 
                                :class="item.gpsFlag == 'Y' ? 'el-icon-success' : 'el-icon-warning'">
                                GPS
                            </el-tag>
                        </el-tooltip>
                        <el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
                            <div slot="content">
                                <el-tag 
                                    size="mini" 
                                    type="danger" 
                                    v-for="(x, index) in item.expiredCertificateList" 
                                    :key="index" 
                                    v-if="item.expiredCertificate">
                                    {{ EXPIREWARN[x] }}
                                </el-tag>
                            </div>
                            <el-tag size="mini" type="danger" v-if="item.expiredCertificate">到期</el-tag>
                        </el-tooltip>
                    </td>
                    <td align="center">临沧G95公路彩云路口</td>
                    <td align="center">1天前</td>
                    <td align="center">
                        <strong>{{item.primaryDriver && item.primaryDriver.realName}}</strong>
                        <span>{{item.primaryDriver && item.primaryDriver.mobile}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
        <div class="dialog-footer">
            <el-button @click="close(false)">取消</el-button>
            <el-button type="primary" @click="close(true)">确定</el-button>
        </div>
    </div>
</template>
<script>
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import DispatchOrder from '../../../api/DispatchOrder'
import Company from '../../../api/Company'
import AutoNavMap from '../../../api/AutoNavMap'
export default {
    mixins: [baseMixin],
    props: {
        loadDate: Number | String
    },
    data() {
        return {
            find: {
                keyword: '',
                shipperDate: '',
                workStatus: 'Free',
                appStatus: ''
            },
            selected: {},
            map: null,
            isMax: false,
        }
    },
    computed: {
        windowInnerHeight: () => window.innerHeight
    },
    watch: {
        loadDate(newVal) {
            this.find.shipperDate = newVal
        }
    },
    created() {
        this.reset()
        this.createMapMask()
    },
    mounted() {
        this.createMap()
    },
    destroyed() {
        this.map.clearMap()
        this.map.destroy()
        this.destroyMapMask()
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
            this.find.shipperDate = this.loadDate
            this.find.workStatus = 'Free'
            this.find.appStatus = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
        getList() {
            this.tableData = []
			DispatchOrder.listOfCanDispatchTruck({
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
        },
        checkGPS() {
            const plateNos = this.tableData.map(item => item.plateNo).join(',')
            Company.truckCheckGPS({ plateNos }).then(res => {
                this.getList()
			})
        },
        /**
         * 创建地图
         */
        createMap() {
            this.map = new AMap.Map('amapLocationSelect')
            // if (this.location && this.location[0] && this.location[1]) {
            //     this.lnglat = this.location
            //     this.map.setCenter(this.location)
            //     this.map.add(this.createMarker(this.location))
            // } else {
            //     this.getLocationByArea()
            // }
            // this.map.on('click', (e) => {
            //     this.lnglat = [e.lnglat.lng, e.lnglat.lat]
            //     this.map.setCenter(this.lnglat)
            //     this.map.clearMap()
            //     this.map.add(this.createMarker(this.lnglat))
            //     this.getAddressByLocation(this.lnglat)
            // })
        },
        /**
         * 创建地图弹窗遮罩
         */
        createMapMask() {
            const odiv = document.createElement('div')
            odiv.id = 'mapMask'
            odiv.style.position = 'absolute'
            odiv.style.left = '0'
            odiv.style.top = '0'
            odiv.style.right = '0'
            odiv.style.bottom = '0'
            odiv.style.backgroundColor = '#000000'
            odiv.style.opacity = '0.5'
            odiv.style.zIndex = '9999'
            document.body.appendChild(odiv)
        },
        /**
         * 销毁地图弹窗遮罩
         */
        destroyMapMask() {
            const mapMask = document.getElementById('mapMask')
            if (mapMask) document.body.removeChild(mapMask)
        },
        /*
        *最大化窗口
        */
        resizeDialog(){
            this.isMax = !this.isMax
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
.map-container
    width 1100px
    position fixed
    left 50%
    top 60px
    margin-left -550px
    padding 10px
    background-color #fff
    border-radius 2px
    box-shadow 0 1px 3px rgba(0,0,0,.3)
    z-index 10000
    &.max
        width 100%
        left 0
        top 0
        right 0
        bottom 0
        margin 0
        .closeBtn
        .minMax
            top 10px
        .closeBtn
            right 10px
        .minMax
            right 51px
    .wrapper
        position relative
        border 1px solid #ddd
        .tips
            position absolute
            left 0
            top 0
            height 36px
            line-height 36px
            min-width 300px
            font-size 12px
            padding 0 20px
            color #fff
            background-color rgba(0,0,0,.3)
            z-index 99999
        #amapLocationSelect
            width 100%
            height 300px
    .dialog-tit
        height 40px
        .title
            line-height 40px
    .dialog-footer
        width 100%
        text-align center
        margin-top 10px
    .closeBtn
    .minMax
        position absolute
        top -5px
        cursor pointer
        font-size 12px
        background #f80
        color #fff
        width 36px
        height 36px
        line-height 36px
        text-align center
        color #fff
        border-radius 4px
    .closeBtn
        position absolute
        right -5px
    .minMax
        right 36px
</style>
