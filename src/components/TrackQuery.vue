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
                        const stopOvertime = require('../assets/imgs/tccs.png')
                        const arrivedOffset = require('../assets/imgs/ycxh.png')
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
                        this.drawRoute(path)
                    }
                }
            })
        },
        drawRoute(path) {
            this.map = new AMap.Map('amapLocationSelect')
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
                    map: this.map,
                    offset: new AMap.Pixel(-20, -22),
                    zIndex: 10
                })
            })
            const routeLine = new AMap.Polyline({
                path,
                isOutline: true,
                outlineColor: '#ffeeee',
                borderWeight: 1,
                strokeWeight: 5,
                strokeColor: '#0091ff',
                lineJoin: 'round',
                showDir: true
            })
            routeLine.setMap(this.map)
            // 调整视野达到最佳显示区域
            // this.map.setFitView([ startMarker ])
            this.map.setCenter(path[parseInt(path.length/2)])
        }
    }
}
</script>

<style lang="stylus" scoped>
#amapLocationSelect
    width 100%
    height 500px
</style>
