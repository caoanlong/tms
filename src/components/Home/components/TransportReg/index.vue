<template>
    <div class="trans-container">
        <div class="left">
            <el-input placeholder="提货单/承运单号/车牌" v-model="find.keyword" class="input-with-select">
                <el-button slot="append" type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </el-input>
            <div class="trucks">
                <div class="total">共<span class="total-num">{{total}}</span>个在途车辆</div>
                <div class="wrapper">
                    <truck-item v-for="(item, i) in list" :key="i" :truck="item"></truck-item>
                </div>
            </div>
            <el-row class="page">
                <el-pagination
                    small
                    layout="prev, pager, next"
                    :total="total" 
                    :page-size="pageSize" 
                    @current-change="pageChange">
                </el-pagination>
            </el-row>
        </div>
        <div class="right">
            <div class="filter">
                <el-form :inline="true" size="mini">
                    <el-form-item label="工厂">
                        <el-select placeholder="请选择" v-model="find.companyCode" @change="changeCompany">
                            <el-option label="全部" value=""></el-option>
                            <el-option 
                                :label="item.companyName" 
                                :value="item.code" 
                                v-for="(item, i) in companys" 
                                :key="i">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="异常原因">
                        <el-select placeholder="请选择" v-model="find.msgType" style="width:120px">
                            <el-option label="全部" value="all"></el-option>
                            <el-option label="停车超时" value="StopOvertime"></el-option>
                            <el-option label="卸货异常" value="ArrivedOffset"></el-option>
                            <el-option label="无" value="normal"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据来源">
                        <el-select placeholder="请选择" v-model="find.type" style="width:100px">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="GPS" value="GPS"></el-option>
                            <el-option label="APP" value="APP"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-refresh" @click="search">刷新</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div id="amapLocationSelect"></div>
        </div>
    </div>
</template>

<script>
import Page from '../../../CommonComponents/Page'
import Home from '../../../../api/Home'
import Company from '../../../../api/Company'
import TruckItem from './components/TruckItem'
export default {
    components: { Page, TruckItem },
    data() {
        return {
            total: 0,
            pageIndex: 1,
            pageSize: 6,
            find: {
                keyword: '',
                companyCode: '',
                msgType: 'all',
                type: ''
            },
            curCompany: {},
            list: [],
            companys: [],
            mapHeight: 0,
            map: null
        }
    },
    created() {
        this.getTransportReg()
        this.getCompanys()
    },
    mounted() {
        this.map = new AMap.Map('amapLocationSelect')
    },
    methods: {
        changeCompany(code) {
            const curCompany = this.companys.filter(item => item.code == code)[0]
            this.curCompany.companyName = curCompany.companyName
            this.getTransportReg()
        },
        search() {
            this.pageIndex = 1
            this.getTransportReg()
        },
        pageChange(index) {
            this.pageIndex = index
            this.getTransportReg()
        },
        getTransportReg() {
            Home.getTransportReg({
                current: this.pageIndex,
                size: this.pageSize,
                keyword: this.find.keyword,
                companyCode: this.find.companyCode,
                msgType: this.find.msgType,
                type: this.find.type
            }).then(res => {
                this.list = res.records
                this.total = res.total
                const first = res.records[0]
                this.curCompany.lng = first.shipperLongitude || ''
                this.curCompany.lat = first.shipperLatitude || ''
                this.createMarker()
            })
        },
        getCompanys() {
            Company.customerFind({
				current: 1,
                size: 1000,
                customerType: 'Shipper'
			}).then(res => {
                this.companys = res.records
			})
        },
        /**
         * 创建地图
         */
        createMarker() {
            const truckPathNormal = this.list.filter(item => item.longitude&&item.latitude&&item.msgType=='')
            const truckPathExp = this.list.filter(item => item.longitude&&item.latitude&&item.msgType)
            for (let i = 0; i < truckPathExp.length; i++) {
                new AMap.Marker({
                    position: [truckPathExp[i].longitude,truckPathExp[i].latitude],
                    content: `<div style="position:relative;width:100px;height:50px;text-align:center">
                        <div style="position:absolute;z-index:5;width:100%;color:#fff;background:#fb7629;height:40px;line-height:40px;border-radius:5px">${truckPathExp[i].plateNo}</div>
                        <div style="position:absolute;bottom:6px;left:42px;background:#fb7629;width:10px;height:10px;transform:rotate(45deg)"></div>
                    </div>`,
                    offset: new AMap.Pixel(-50, -50),
                    map: this.map
                })
            }
            for (let i = 0; i < truckPathNormal.length; i++) {
                new AMap.Marker({
                    position: [truckPathNormal[i].longitude,truckPathNormal[i].latitude],
                    content: `<div style="position:relative;width:100px;height:50px;text-align:center">
                        <div style="position:absolute;z-index:5;width:100%;color:#fff;background:#409EFF;height:40px;line-height:40px;border-radius:5px">${truckPathNormal[i].plateNo}</div>
                        <div style="position:absolute;bottom:6px;left:42px;background:#409EFF;width:10px;height:10px;transform:rotate(45deg)"></div>
                    </div>`,
                    offset: new AMap.Pixel(-50, -50),
                    map: this.map
                })
            }
            if (this.curCompany.lng && this.curCompany.lat && this.curCompany.companyName) {
                new AMap.Marker({
                    position: [this.curCompany.lng, this.curCompany.lat],
                    content: `<div style="position:relative;min-width:140px;height:50px;text-align:center">
                        <div style="position:absolute;z-index:5;width:100%;color:#fff;background:#9e74b6;height:40px;line-height:40px;border-radius:5px">${this.curCompany.companyName}</div>
                        <div style="position:absolute;bottom:6px;left:52px;background:#9e74b6;width:10px;height:10px;transform:rotate(45deg)"></div>
                    </div>`,
                    offset: new AMap.Pixel(-50, -50),
                    map: this.map
                })
            }
            const center = this.list[parseInt(this.list.length / 2)]
            this.map.setCenter([center.longitude,center.latitude])
        }
    }
}
</script>

<style lang="stylus" scoped>
.trans-container
    width 100%
    position relative
    padding-left 320px
    .left
        position absolute
        left 0
        top 0
        width 300px
        .page
            padding 10px
        .trucks
            border 1px solid #dddddd
            border-top none
            .total
                color #999
                font-size 12px
                padding-left 10px
                height 30px
                line-height 30px
                .total-num
                    color #409EFF
                    font-weight bold
            .wrapper
                height 600px
                overflow auto
    .right
        height 670px
        border 1px solid #dddddd
        position relative
        .filter
            width 100%
            height 50px
            background-color #ffffff
            border-bottom 1px solid #ddd
            padding 10px 20px
            position absolute
            z-index 11
        #amapLocationSelect
            height 100%
</style>
