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
                            <div class="address">地址：彩云北路66号附近</div>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-left">
                            <div class="circle"></div>
                            <dir class="left-line"></dir>
                        </div>
                        <div class="step-right">
                            <div class="status">
                                <div class="tit">卸货完成</div>
                                <div class="time">2018-12-03 11:22:33</div>
                            </div>
                            <div class="desc">备注：地址偏移</div>
                            <div class="address">地址：彩云北路66号附近</div>
                        </div>
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
            locations: [],
            customerAddressList: [],
            consigneeFencingType: '',
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
                            return {
                                position: { N: item.latitude, O: item.longitude, lat: item.latitude, lng: item.longitude },
                                icon: item.type == 'StopOvertime' ? stopOvertime : arrivedOffset
                            }
                        })
                        this.consigneeFencingType = res.data.data.consigneeFencingType
                        this.customerAddressList = res.data.data.customerAddressList
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
                    offset: new AMap.Pixel(-17, -37),
                })
            } else {
                endMarker = new AMap.Marker({
                    position: path[path.length - 1],
                    icon: require('../assets/imgs/dtcb.png'),
                    map: this.map,
                    offset: new AMap.Pixel(-25, -54),
                })
            }
            
            this.alarmMsgs.forEach(item => {
                const alarmMsgs = new AMap.Marker({
                    position: item.position,
                    icon: item.icon,
                    map: this.map,
                    offset: new AMap.Pixel(-17, -37),
                    zIndex: 10
                })
                alarmMsgs.on('click', (e) => {
                    this.drawInfoWindow(e.lnglat, item)
                })
            })
            if (this.consigneeFencingType == 'Point') {
                this.customerAddressList.forEach(item => {
                    this.drawAddressPoint(item)
                })
            }
            // this.drawArea()
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
        },
        /**
         * 绘制信息窗体
         */
        drawInfoWindow(position, item) {
            const content = `<div>
                <div style="padding:0px 4px;">
                    <h3>${item.companyName}</h3>
                    <div>电话 : 010-84107000   邮编 : 100102</div>
                    <div>地址 : 北京市望京阜通东大街方恒国际中心A座16层</div>
                </div>
            </div>`
            // 创建 infoWindow 实例	
            const infoWindow = new AMap.InfoWindow({ content })
            // 打开信息窗体
            infoWindow.open(this.map, position)
        },
        /**
         * 绘制地址监控
         */
        drawAddressPoint(item) {
            const addressPoint = new AMap.Marker({
                position: [item.locationLng,item.locationLat],
                icon: require('../assets/imgs/yjdz.png'),
                map: this.map,
                offset: new AMap.Pixel(-13, -29),
                zIndex: 10
            })
            const circleMarker = new AMap.CircleMarker({
                center: new AMap.LngLat(item.locationLng,item.locationLat),  // 圆心位置
                radius: +item.monitorScope/10, // 圆半径
                fillColor: '#409EFF',   // 圆形填充颜色
                fillOpacity: 0.3,
                strokeColor: '#409EFF', // 描边颜色
                strokeWeight: 2, // 描边宽度
                map: this.map
            })
        },
        /**
         * 绘制区域监控
         */
        drawArea() {
            const districtSearch = new AMap.DistrictSearch({
                // 关键字对应的行政区级别，country表示国家
                level: 'district',
                // 返回行政区边界坐标等具体信息
                extensions: 'all'
            })
            
            // 搜索所有省/直辖市信息
            districtSearch.search('南山区', (status, result) => {
                // 查询成功时，result即为对应的行政区信息
                const bounds = result.districtList[1].boundaries
                const polygons = []
                if (bounds) {
                    for (let i = 0, l = bounds.length; i < l; i++) {
                        //生成行政区划polygon
                        const polygon = new AMap.Polygon({
                            map: this.map,
                            strokeWeight: 1,
                            path: bounds[i],
                            fillOpacity: 0.3,
                            fillColor: '#409EFF',
                            strokeColor: '#409EFF'
                        })
                        polygons.push(polygon)
                    }
                }
            })
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
                            background-color #8bce31
                        .circle
                            position absolute
                            left 5px
                            top 0
                            z-index 5
                            width 10px
                            height 10px
                            border-radius 100%
                            background-color #aaa
                    .step-right
                        flex 1
                        padding-bottom 20px
                        .status
                            width 100%
                            font-size 14px
                            display flex
                            margin-bottom 5px
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
                            height 20px
                            line-height 20px
</style>
