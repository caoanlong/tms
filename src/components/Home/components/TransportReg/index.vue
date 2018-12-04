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
                        <el-select placeholder="请选择" v-model="find.companyName">
                            <el-option label="全部" value=""></el-option>
                            <el-option 
                                value-key="code"
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
import { AMAPKEY } from '../../../../common/const'
import Page from '../../../CommonComponents/Page'
import Home from '../../../../api/Home'
import Company from '../../../../api/Company'
import AutoNavMap from '../../../../api/AutoNavMap'
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
                companyName:'',
                company: {},
                msgType: 'all',
                type: 'GPS'
            },
            curCompany: {},
            list: [],
            companys: [],
            mapHeight: 0,
            map: null
        }
    },
    created() {
        this.getCompanys()
    },
    mounted() {
        this.map = new AMap.Map('amapLocationSelect')
    },
    methods: {
        search() {
            this.pageIndex = 1
            this.getTransportReg()
        },
        pageChange(index) {
            this.pageIndex = index
            this.getTransportReg()
        },
        async getTransportReg() {
            const { records, total } = await Home.getTransportReg({
                current: this.pageIndex,
                size: this.pageSize,
                keyword: this.find.keyword,
                companyCode: this.find.company.code,
                msgType: this.find.msgType,
                type: this.find.type
            })
            this.total = total
            const list = records
            if (records[0]) {
                if (records[0].shipperLongitude) this.find.company.longitude = records[0].shipperLongitude
                if (records[0].shipperLatitude) this.find.company.latitude = records[0].shipperLatitude
            }
            for (let i = 0; i < list.length; i++) {
                if (list[i].longitude && list[i].latitude) {
                    list[i].posAddress = await this.getAddressByLnglat([list[i].longitude, list[i].latitude])
                }
            }
            this.list = list
            this.createMarker()
        },
        getCompanys() {
            Company.customerFind({
				current: 1,
                size: 1000,
                customerType: 'Shipper'
			}).then(res => {
                this.companys = res.records
                this.find.company = this.companys.filter(item => item.companyName == '临沧工厂')[0]
                this.find.companyName = this.companys.filter(item => item.companyName == '临沧工厂')[0].companyName
                this.getTransportReg()
			})
        },
        /**
         * 创建地图
         */
        createMarker() {
            const truckPathNormal = this.list.filter(item => item.longitude&&item.latitude&&item.msgType=='')
            const truckPathExp = this.list.filter(item => item.longitude&&item.latitude&&item.msgType)
            for (let i = 0; i < truckPathNormal.length; i++) {
                const truckPathNormalMarker = new AMap.Marker({
                    position: [truckPathNormal[i].longitude,truckPathNormal[i].latitude],
                    content: `<div style="position:relative;width:100px;height:50px;text-align:center">
                        <div style="position:absolute;z-index:5;width:100%;color:#fff;background:#409EFF;height:40px;line-height:40px;border-radius:5px">${truckPathNormal[i].plateNo}</div>
                        <div style="position:absolute;bottom:6px;left:42px;background:#409EFF;width:10px;height:10px;transform:rotate(45deg)"></div>
                    </div>`,
                    offset: new AMap.Pixel(-50, -50),
                    map: this.map
                })
                const dispatchOrderID = truckPathNormal[i].dispatchOrderID
                truckPathNormalMarker.on('click', e => {
                    const routeData = this.$router.resolve({name: 'trackquery', query: { dispatchOrderID }})
			        window.open(routeData.href, '_blank')
                })
            }
            for (let i = 0; i < truckPathExp.length; i++) {
                const truckPathExpMarker = new AMap.Marker({
                    position: [truckPathExp[i].longitude,truckPathExp[i].latitude],
                    content: `<div style="position:relative;width:100px;height:50px;text-align:center">
                        <div style="position:absolute;z-index:5;width:100%;color:#fff;background:#fb7629;height:40px;line-height:40px;border-radius:5px">${truckPathExp[i].plateNo}</div>
                        <div style="position:absolute;bottom:6px;left:42px;background:#fb7629;width:10px;height:10px;transform:rotate(45deg)"></div>
                    </div>`,
                    offset: new AMap.Pixel(-50, -50),
                    map: this.map
                })
                const dispatchOrderID = truckPathExp[i].dispatchOrderID
                truckPathExpMarker.on('click', e => {
                    const routeData = this.$router.resolve({name: 'trackquery', query: { dispatchOrderID }})
			        window.open(routeData.href, '_blank')
                })
            }
            
            if (this.find.company.longitude && this.find.company.latitude && this.find.company.companyName) {
                const companyMarker = new AMap.Marker({
                    position: [this.find.company.longitude, this.find.company.latitude],
                    content: `<div style="position:relative;min-width:140px;height:50px;text-align:center">
                        <div style="position:absolute;z-index:5;width:100%;color:#fff;background:#9e74b6;height:40px;line-height:40px;border-radius:5px">${this.find.company.companyName}</div>
                        <div style="position:absolute;bottom:6px;left:52px;background:#9e74b6;width:10px;height:10px;transform:rotate(45deg)"></div>
                    </div>`,
                    offset: new AMap.Pixel(-50, -50),
                    map: this.map
                })
            }
            // 使用setFitView方法 自适应显示
            this.map.setFitView()
            // if (center) this.map.setCenter([center.longitude, center.latitude])
        },
        /**
         * 根据经纬度获取详细地址
         */
        async getAddressByLnglat(location) {
            const { data } =  await AutoNavMap.getLocation({ 
                key: AMAPKEY, 
                location: location.join(',') 
            })
            const address = data.regeocode.formatted_address
            return address
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
