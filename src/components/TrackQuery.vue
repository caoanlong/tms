<template>
    <div class="track-container">
        <div id="amapLocationSelect" :style="{'height': mapHeight + 'px'}"></div>
        <div class="logs">
            <div class="logs-top">
                <div class="shipperNo">
                    <span class="tit">发货单</span>
                    <span class="ctx">25665889977899877</span>
                </div>
                <div class="shipperInfo">
                    <div class="shipperItem">
                        <span class="tit">车辆：</span>
                        <span class="ctx">云A69988</span>
                    </div>
                    <div class="shipperItem">
                        <span class="tit">工厂：</span>
                        <span class="ctx">临沧工厂</span>
                    </div>
                    <div class="shipperItem">
                        <span class="tit">客户：</span>
                        <span class="ctx">小柏商贸</span>
                    </div>
                    <div class="shipperItem">
                        <span class="tit">类型：</span>
                        <span class="ctx">地址监控</span>
                    </div>
                </div>
            </div>
            <div class="logs-pannel" :style="{'height': (mapHeight-270) + 'px'}">
                <div class="steps">
                    <div class="step">
                        <div class="step-left">
                            <div class="circle-cur"></div>
                            <dir class="left-line"></dir>
                        </div>
                        <div class="step-right">
                            <div class="status">
                                <div class="tit">卸货完成</div>
                                <div class="time">2018-12-03 11:22:33</div>
                            </div>
                            <div class="desc">备注：地址偏移</div>
                            <div class="address">备注：地址偏移</div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-left">
                            <div class="circle"></div>
                            <dir class="left-line"></dir>
                        </div>
                        <div class="step-right">卸货完成 2018-12-03 11:22:33 地址：彩云北路66号附近</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { baseURL } from '../common/request'
export default {
    data() {
        return {
            map: null,
            truckDriving: null,
            mapHeight: 0,
            alarmMsgs: [],
            locations: []
        }
    },
    created() {
        this.mapHeight = window.innerHeight 
        this.getList()
    },
    mounted() {
        this.map = new AMap.Map('amapLocationSelect')
    },
    methods: {
        getList() {
            const url = baseURL + '/deliveryOrder/getTracks'
            const params = {
                osn: this.$route.query.osn,
                companyCode: this.$route.query.companyCode,
                dispatchOrderID: this.$route.query.dispatchOrderID
            }
            axios({
                url,
                params,
                headers: { 
                    Authorization: this.$route.query.Authorization || localStorage.getItem('token')
                }
            }).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data) {
                        const locations = res.data.data.locations
                        const alarmMsgs = res.data.data.alarmMsgs
                        const status = res.data.data.status
                        const stopOvertime = require('../assets/imgs/tcbj.png')
                        const arrivedOffset = require('../assets/imgs/xhbj.png')
                        const path = locations.map(item => {
                            return {
                                N: item.loc.latitude, 
                                O: item.loc.longitude,
                                lng: item.loc.longitude,
                                lat: item.loc.latitude
                            }
                        })
                        this.alarmMsgs = alarmMsgs.map(item => {
                            const stopOvertimeContent = `<div style="position:relative;font-size:14px;width:100px;height:26px;line-height:26px;color:#fff;background:#f9376b;border-radius:10px;text-align:center">
                                停车${item.keepMinute}分钟
                                <div style="position:absolute;z-index:-1;bottom:-6px;left:44px;background:#f9376b;width:16px;height:16px;transform:rotate(45deg)"></div>
                            </div>`
                            const arrivedOffsetContent = `<div style="position:relative;font-size:14px;width:100px;height:26px;line-height:26px;color:#fff;background:#f9376b;border-radius:10px;text-align:center">
                                卸货地址偏离
                                <div style="position:absolute;z-index:-1;bottom:-6px;left:44px;background:#f9376b;width:16px;height:16px;transform:rotate(45deg)"></div>
                            </div>`
                            return {
                                position: { N: item.latitude, O: item.longitude, lat: item.latitude, lng: item.longitude },
                                icon: item.type == 'StopOvertime' ? stopOvertime : arrivedOffset,
                                content: 'StopOvertime' ? stopOvertimeContent : arrivedOffsetContent
                            }
                        })
                        this.drawRoute(path, status)
                    }
                }
            })
        },
        drawRoute(path, status) {
            const startMarker = new AMap.Marker({
                position: path[0],
                icon: require('../assets/imgs/qd.png'),
                map: this.map
            })
            let endMarker = null
            if (status == 'Finished') {
                endMarker = new AMap.Marker({
                    position: path[path.length - 1],
                    icon: require('../assets/imgs/zd.png'),
                    map: this.map,
                    offset: new AMap.Pixel(-17, -19),
                })
            } else {
                endMarker = new AMap.Marker({
                    position: path[path.length - 1],
                    icon: require('../assets/imgs/dtcb.png'),
                    map: this.map,
                    offset: new AMap.Pixel(-25, -27),
                })
            }
            
            this.alarmMsgs.forEach(item => {
                new AMap.Marker({
                    position: item.position,
                    icon: item.icon,
                    content: item.content,
                    map: this.map,
                    offset: new AMap.Pixel(-50, -36),
                    zIndex: 10
                })
            })
            const routeLine = new AMap.Polyline({
                path,
                isOutline: true,
                outlineColor: '#ffeeee',
                borderWeight: 1,
                strokeWeight: 6,
                strokeColor: '#75b3fc',
                lineJoin: 'round',
                showDir: true
            })
            routeLine.setMap(this.map)
            // 调整视野达到最佳显示区域
            // this.map.setFitView([ startMarker, endMarker, routeLine ])
            this.map.setCenter(path[parseInt(path.length/2)])
        }
    }
}
</script>

<style lang="stylus" scoped>
.track-container
    position relative
    #amapLocationSelect
        width 100%
        height 500px
    .logs
        position absolute
        right 0
        top 0
        width 300px
        padding 20px
        .logs-top
            height 190px
            background-color #ffffff
            box-shadow 0 3px 5px rgba(0,0,0,.3)
            margin-bottom 20px
            padding 10px
            font-size 14px
            .shipperNo
                height 30px
                line-height 30px
                border-bottom 1px solid #ddd
                .tit
                    color #666
                .ctx
                    color #999
            .shipperInfo
                margin-top 10px
                .shipperItem
                    height 30px
                    line-height 30px
        .logs-pannel
            padding 10px
            background-color #ffffff
            box-shadow 0 3px 5px rgba(0,0,0,.3)
            .steps
                .step
                    width 100%
                    display flex
                    position relative
                    .step-left
                        flex 0 0 20px
                        position relative
                        .left-line
                            position absolute
                            left 10px
                            top -16px
                            width 1px
                            height 100%
                            border-left 1px solid #ccc
                        .circle-cur
                            position absolute
                            left 3px
                            top 0
                            z-index 5
                            width 14px
                            height 14px
                            border-radius 100%
                            background-color green
                        .circle
                            position absolute
                            left 5px
                            top 0
                            z-index 5
                            width 10px
                            height 10px
                            border-radius 100%
                            background-color gray
                    .step-right
                        flex 1
                        background-color pink
                        .status
                            width 100%
                            font-size 14px
                            display flex
                            .tit
                                flex 0 0 80px
                                color #333
                            .time
                                flex 1
                                font-size 13px
                                text-align right
                                color #999
                        .desc, .address
                            color #999
                            font-size 13px
                            height 30px
                            line-height 30px
</style>
