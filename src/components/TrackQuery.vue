<template>
    <div>
        <div id="amapLocationSelect" :style="{'height': mapHeight + 'px'}"></div>
    </div>
</template>

<script>
import axios from 'axios'
import { baseURL } from '../common/request'
export default {
    data() {
        return {
            map: null,
            truckDriving: new AMap.TruckDriving({
                policy: 0, // 规划策略
                size: 1, // 车型大小
                width: 2.5, // 宽度
                height: 2, // 高度      
                load: 1, // 载重
                weight: 12, // 自重
                axlesNum: 2, // 轴数
                province: '京', // 车辆牌照省份
            }),
            mapHeight: 0,
            locations: [],
            alarmMsgs: []
        }
    },
    created() {
        this.mapHeight = window.innerHeight 
        this.getList()
    },
    mounted() {
        this.createMap()
    },
    methods: {
        getList() {
            const url = baseURL + '/deliveryOrder/getTracks'
            const params = {
                osn: this.$route.query.osn,
                companyCode: this.$route.query.companyCode
            }
            axios({
                url,
                params,
                headers: { Authorization: this.$route.query.Authorization }
            }).then(res => {
                if (res.data.code == 200) {
                    if (res.data.data) {
                        const locations = res.data.data.locations
                        const alarmMsgs = res.data.data.alarmMsgs
                        const stopOvertime = require('../assets/imgs/tcbj.png')
                        const arrivedOffset = require('../assets/imgs/xhbj.png')
                        this.locations = locations.map(item => {
                            return {
                                lnglat: [item.loc.longitude, item.loc.latitude]
                            }
                        })
                        this.alarmMsgs = alarmMsgs.map(item => {
                            return {
                                position: { N: item.latitude, O: item.longitude, lat: item.latitude, lng: item.longitude },
                                icon: item.type == 'StopOvertime' ? stopOvertime : arrivedOffset
                            }
                        })
                        this.truckDrivingSearch()
                    }
                }
            })
        },
        /**
         * 创建地图
         */
        createMap() {
            this.map = new AMap.Map('amapLocationSelect')
        },
        truckDrivingSearch() {
            this.truckDriving.search(this.locations, (status, result) => {
                if (status === 'complete') {
                    if (result.routes && result.routes.length) {
                        this.drawRoute(result.routes[0]) 
                    }
                } else {
                    console.log('获取货车规划数据失败：' + result)
                }
            })
        },
        drawRoute (route) {
            const path = this.parseRouteToPath(route)
            const startMarker = new AMap.Marker({
                position: path[0],
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                map: this.map
            })
            const endMarker = new AMap.Marker({
                position: path[path.length - 1],
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                map: this.map
            })

            this.alarmMsgs.forEach(item => {
                new AMap.Marker({
                    position: item.position,
                    icon: item.icon,
                    map: this.map
                })
            })
            const routeLine = new AMap.Polyline({
                path,
                isOutline: true,
                outlineColor: '#ffeeee',
                borderWeight: 1,
                strokeWeight: 5,
                strokeColor: '#0091ff',
                lineJoin: 'round'
            })
            routeLine.setMap(this.map)
            // 调整视野达到最佳显示区域
            this.map.setFitView([ startMarker, endMarker, routeLine ])
        },
        parseRouteToPath(route) {
            const path = []
            for (let i = 0, l = route.steps.length; i < l; i++) {
                const step = route.steps[i]
                for (let j = 0, n = step.path.length; j < n; j++) {
                    path.push(step.path[j])
                }
            }
            return path
        }
    }
}
</script>

<style lang="stylus" scoped>
#amapLocationSelect
    width 100%
    height 500px
</style>
