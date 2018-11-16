<template>
    <div>
        <el-form :inline="true" ref="ruleForm">
            <el-form-item label="经度" prop="lng">
                <el-input placeholder="请输入经度" size="mini" v-model="find.lng"></el-input>
            </el-form-item>
            <el-form-item label="纬度" prop="lat">
                <el-input placeholder="请输入纬度" size="mini" v-model="find.lat"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="search">查询</el-button>
                <el-button size="mini" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
        <div id="amapLocationSelect" :style="{'height': mapHeight + 'px'}"></div>
    </div>
</template>

<script>
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
            find: {
                lng: '',
                lat: ''
            },
            lnglat: [0,0]
        }
    },
    created() {
        this.mapHeight = window.innerHeight - 70
    },
    mounted() {
        this.createMap()
    },
    methods: {
        search() {
            this.lnglat = [this.find.lng, this.find.lat]
            this.map.setCenter(this.lnglat)
            this.map.clearMap()
            // this.map.add(this.createMarker(this.lnglat))
        },
        reset() {
			this.find.lng = ''
            this.find.lat = ''
		},
        /**
         * 创建地图
         */
        createMap() {
            this.map = new AMap.Map('amapLocationSelect')
            const path = []
            path.push({lnglat:[116.303843, 39.983412]})//起点
            path.push({lnglat:[116.321354, 39.896436]})//途径
            path.push({lnglat:[116.407012, 39.992093]})//终点
            this.truckDriving.search(path, (status, result) => {
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
            const positions = [
                {
                    position: { N: 39.896732, O: 116.27593200000001, lat: 39.896732, lng: 116.275932 },
                    icon: require('../assets/imgs/tcbj.png')
                },{
                    position: { N: 39.902344, O: 116.35679600000003, lat: 39.902344, lng: 116.356796 },
                    icon: require('../assets/imgs/xhbj.png')
                }
            ]
            positions.forEach(item => {
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
                borderWeight: 2,
                strokeWeight: 8,
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
