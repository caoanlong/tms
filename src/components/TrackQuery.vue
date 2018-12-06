<template>
    <div class="track-container">
        <div id="amapLocationSelect" :style="{'height': mapHeight + 'px'}"></div>
        <div class="logs">
            <div class="logs-top" v-loading="logsTopLoading">
                <div class="shipperNo" v-if="!logsTopLoading">
                    <span class="tit">发货单</span>
                    <span class="ctx">{{data.shipperNo}}</span>
                </div>
                <div class="shipperInfo" v-if="!logsTopLoading">
                    <div class="shipperItem">
                        <span class="tit">车辆：</span>
                        <span class="ctx">{{data.plateNo}}</span>
                    </div>
                    <div class="shipperItem">
                        <span class="tit">工厂：</span>
                        <span class="ctx">{{data.shipperCompanyName}}</span>
                    </div>
                    <div class="shipperItem">
                        <span class="tit">客户：</span>
                        <span class="ctx">{{data.consigneeCompanyName}}</span>
                    </div>
                    <div class="shipperItem">
                        <span class="tit">类型：</span>
                        <span class="ctx">
                            {{data.consigneeFencingType == 'Point' 
                            ? '地址监控' 
                            : (data.consigneeFencingType == 'Area' ? '区域监控' : '')}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="logs-pannel" v-loading="logsLoading" :style="{'height': (mapHeight-270) + 'px'}">
                <div class="steps">
                    <div class="step step-ex" v-for="(log, i) in logs" :key="i">
                        <div class="step-left">
                            <div :class="i == 0 ? 'circle-cur' : 'circle'"></div>
                            <dir class="left-line"></dir>
                        </div>
                        <div class="step-right">
                            <div class="status">
                                <div class="tit" 
                                    :style="{'color': log.action == 'StopOvertime' || log.action == 'ArrivedOffset' ? 'red' : ''}">
                                    {{DISPATHLOGACTION[log.action]}}
                                </div>
                                <div 
                                    class="time" 
                                    :style="{'color': log.action == 'StopOvertime' || log.action == 'ArrivedOffset' ? 'red' : ''}">
                                    {{log.createTime | getdatefromtimestamp}}
                                </div>
                            </div>
                            <div 
                                class="desc" 
                                :style="{'color': log.action == 'StopOvertime' || log.action == 'ArrivedOffset' ? 'red' : ''}">
                                备注：{{log.description}}
                            </div>
                            <div 
                                class="address" 
                                :style="{'color': log.action == 'StopOvertime' || log.action == 'ArrivedOffset' ? 'red' : ''}">
                                地址：{{log.posAddress}}
                            </div>
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
import { AMAPKEY } from '../common/const'
import AutoNavMap from '../api/AutoNavMap'
import DispatchOrder from '../api/DispatchOrder'
export default {
    data() {
        return {
            map: null,
            truckDriving: null,
            mapHeight: 0,
            logs: [],
            data: {},
            alarmMsgs: [],
            locations: [],
            customerAddressList: [],
            customerMonitorAreaList: [],
            consigneeFencingType: '',
            status: '',
            district: null,
            logsTopLoading: true,
            logsLoading: true
        }
    },
    created() {
        this.mapHeight = window.innerHeight
        this.getLogs()
        this.getList()
    },
    mounted() {
        this.map = new AMap.Map('amapLocationSelect')
        this.district = new AMap.DistrictSearch({
            subdistrict: 1,   //返回下一级行政区
            showbiz: false,  //最后一级返回街道信息
            extensions: 'all'
        })
    },
    methods: {
        async getLogs() {
            const res = await DispatchOrder.logList({ 
                dispatchOrderID: this.$route.query.dispatchOrderID,
                osn: this.$route.query.osn
            })
            this.logsLoading = false
            this.logs = res
            for (let i = 0; i < this.logs.length; i++) {
                if (this.logs[i].action == 'StopOvertime') {
                    const posAddress = await this.getAddressByLnglat([
                        this.logs[i].longitude, this.logs[i].latitude
                    ])
                    this.$set(this.logs[i], 'posAddress', posAddress)
                }
            }
        },
        async getList() {
            const url = baseURL + '/deliveryOrder/getTracks'
            const params = {
                osn: this.$route.query.osn,
                companyCode: this.$route.query.companyCode,
                dispatchOrderID: this.$route.query.dispatchOrderID
            }
            const { data } = await axios({
                url, params,
                headers: { 
                    Authorization: this.$route.query.Authorization || localStorage.getItem('token')
                }
            })
            if (data.code == 200 && data.data) {
                this.logsTopLoading = false
                this.data = data.data
                const { 
                    locations, 
                    status, 
                    alarmMsgs, 
                    consigneeFencingType, 
                    customerAddressList, 
                    customerMonitorAreaList 
                } = data.data
                for (let i = 0; i < alarmMsgs.length; i++) {
                    if (alarmMsgs[i].type == 'StopOvertime') {
                        alarmMsgs[i].posLocation = await this.getAddressByLnglat([
                            alarmMsgs[i].longitude, alarmMsgs[i].latitude
                        ])
                    }
                }
                this.status = status
                this.consigneeFencingType = consigneeFencingType
                this.customerAddressList = customerAddressList || []
                this.customerMonitorAreaList = customerMonitorAreaList || []
                this.alarmMsgs = alarmMsgs
                this.drawRoute(locations, status)
            }
        },
        drawRoute(locations, status) {
            // 绘制开始结束点
            this.drawStartEndPoint(locations[0], locations[locations.length-1])
            // 绘制异常点标记以及信息窗体事件
            this.alarmMsgs.forEach(item => {
                if (item.type == 'StopOvertime') {
                    const alarmMsgs = new AMap.Marker({
                        position: [item.longitude, item.latitude],
                        icon: require('../assets/imgs/tcbj.png'),
                        map: this.map,
                        offset: new AMap.Pixel(-17, -37),
                        zIndex: 10
                    })
                    alarmMsgs.on('mouseover', (e) => {
                        this.drawInfoWindow(item, alarmMsgs)
                    })
                }
            })
            // 绘制地址监控
            if (this.consigneeFencingType == 'Point') {
                this.customerAddressList.forEach(item => {
                    this.drawAddressPoint(item)
                })
            } else if (this.consigneeFencingType == 'Area') {
                this.customerMonitorAreaList.forEach(item => {
                    this.drawArea(item)
                })
            }
            const path = locations.map(item => [item.loc.longitude, item.loc.latitude])
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
            this.map.setFitView()
            // this.map.setCenter(path[parseInt(path.length/2)])
        },
        /**
         * 绘制开始结束点标记以及信息窗体事件
         */
        async drawStartEndPoint(startPos, endPos) {
            // 绘制开始结束标记点以及信息窗体事件
            const startMarker = new AMap.Marker({
                position: [startPos.longitude, startPos.latitude],
                icon: require('../assets/imgs/qd.png'),
                map: this.map
            })
            const endMarker = new AMap.Marker({
                position: [endPos.longitude, endPos.latitude],
                icon: this.status == 'Finished' 
                    ? (
                        this.alarmMsgs.map(item => item.type).includes('ArrivedOffset') 
                        ? require('../assets/imgs/xhbj.png') 
                        : require('../assets/imgs/zd.png')
                    ) 
                    : require('../assets/imgs/dtcb.png'),
                map: this.map,
                offset: this.status == 'Finished' ? new AMap.Pixel(-17, -37) : new AMap.Pixel(-25, -54)
            })
            startPos.posLocation = await this.getAddressByLnglat([
                startPos.longitude, startPos.latitude
            ])
            endPos.posLocation = await this.getAddressByLnglat([
                endPos.longitude, endPos.latitude
            ])
            startMarker.on('mouseover', e => {
                const start = Object.assign({}, startPos)
                start.type = 'start'
                this.drawInfoWindow(start, startMarker)
            })
            endMarker.on('mouseover', e => {
                const end = Object.assign({}, endPos)
                end.type = 'end'
                this.drawInfoWindow(end, endMarker)
            })
        },
        /**
         * 绘制地址监控
         */
        async drawAddressPoint(item) {
            const addressPoint = new AMap.Marker({
                position: [item.locationLng, item.locationLat],
                icon: require('../assets/imgs/yjdz.png'),
                map: this.map,
                offset: new AMap.Pixel(-13, -29),
                zIndex: 10
            })
            const circle = new AMap.Circle({
                center: [item.locationLng, item.locationLat],
                radius: item.monitorScope, //半径
                strokeColor: "#409EFF", 
                strokeOpacity: 1,
                strokeWeight: 2,
                fillOpacity: 0.3,
                fillColor: '#409EFF',
                zIndex: 50,
                map: this.map
            })
            item.posLocation = await this.getAddressByLnglat([
                item.locationLng, item.locationLat
            ])
            addressPoint.on('mouseover', e => {
                const start = Object.assign({}, item)
                start.longitude = item.locationLng
                start.latitude = item.locationLat
                start.type = 'Point'
                this.drawInfoWindow(start, addressPoint)
            })
        },
        /**
         * 绘制区域监控
         */
        drawArea(item) {
            const length = item.fullName.split(',').filter(item => item).length
            if (length == 3) {
                this.district.setLevel('district')
            } else if (length == 2) {
                this.district.setLevel('city')
            } else if (length == 1) {
                this.district.setLevel('province')
            }
            this.district.setExtensions('all')
            this.district.search(String(item.areaID), (status, result) => {
                // 查询成功时，result即为对应的行政区信息
                const bounds = result.districtList[0].boundaries
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
        },
        /**
         * 绘制信息窗体
         */
        drawInfoWindow(item, marker) {
            let title = ''
            let remark = ''
            if (item.type && item.type == 'StopOvertime') {
                title = `<h3 style="color:red">停车异常</h3>`
                remark = `<div>备注：停车${item.keepMinute}分钟</div>`
            }
            if (item.type && item.type == 'ArrivedOffset') {
                title = `<h3 style="color:red">卸货异常</h3>`
                remark = `<div>备注：</div>`
            }
            if (item.type && item.type == 'start') {
                title = `<h3>开始运输</h3>`
                remark = `<div>备注：</div>`
            }
            if (item.type && item.type == 'end') {
                if (this.status == 'Finished') {
                    if (this.alarmMsgs.map(item => item.type).includes('ArrivedOffset')) {
                        title = `<h3 style="color:red">卸货异常</h3>`
                        if (this.consigneeFencingType == 'Point') {
                            remark = `<div>备注：卸货地址偏移</div>`
                        } else if (this.consigneeFencingType == 'Area') {
                            remark = `<div>备注：卸货地区偏移</div>`
                        }
                    } else {
                        title = `<h3>完成卸货</h3>`
                        remark = `<div>备注：</div>`
                    }
                } else {
                    title = `<h3>车辆位置</h3>`
                    remark = `<div>备注：</div>`
                }
            }
            if (item.type && item.type == 'Point') {
                title = `<h3>${item.companyName}</h3>`
                remark = `<div>围栏范围：${item.monitorScope}米</div>`
            }
            const lng = `<div>经度：${item.longitude}</div>`
            const lat = `<div>纬度：${item.latitude}</div>`
            const content = `<div>
                <div style="padding:0px 4px;">
                    ${title}${remark}${lng}${lat}
                    <div>地址: ${item.posLocation}</div>
                </div>
            </div>`
            // 创建 infoWindow 实例	
            const infoWindow = new AMap.InfoWindow({
                content,
                offset: new AMap.Pixel(0, -30)
            })
            // 打开信息窗体
            infoWindow.open(this.map, [item.longitude, item.latitude])
            marker.on('mouseout', (e) => {
                infoWindow.close()
            })
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
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
        .logs-pannel
            padding 10px
            background-color #ffffff
            box-shadow 0 3px 5px rgba(0,0,0,.3)
            overflow auto
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
                        padding-bottom 40px
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
