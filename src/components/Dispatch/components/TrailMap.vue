<template>
    <div class="map-container" :class="isMax?'max':''">
        <div class="dialogTit">
            <el-radio-group v-model="tabPosition" @change="handTabChange">
                <el-radio-button label="GPS"></el-radio-button>
                <el-radio-button label="APP"></el-radio-button>
            </el-radio-group>
            <svg-icon :icon-class="isMax?'min':'max'" @click.native="resizeDialog" class="minMax"></svg-icon>
            <svg-icon icon-class="close" @click.native="close" class="closeBtn"></svg-icon>
        </div>
        <div class="wrapper" :style="isMax ? {height: (windowInnerHeight-70) + 'px'} : {height: (windowInnerHeight*0.8-70) + 'px'}">
            <div class="tips">累计时长：{{time}}小时&nbsp;&nbsp;&nbsp;累计里程：{{distance}}km&nbsp;&nbsp;&nbsp;平均时速：{{speed}}km</div>
            <div id="amapWrapper"></div>
        </div>   
    </div>
</template>

<script>
import DispatchOrder from '../../../api/DispatchOrder'
export default {
    props: {
        dispatchOrderID: String
    },
    data() {
        return {
            tabPosition: 'GPS',
            map: null,
            driving: null,
            infoWindow: null,
            distance: 0,
            time: 0,
            speed: 0,
            locationList: [],
            dispatchTaskPicList: [],
            isMax:false
        }
    },
    computed: {
        windowInnerHeight: () => window.innerHeight
    },
    created() {
        this.createMapMask()
    },
    mounted() {
        this.getTrack(this.tabPosition)
    },
    destroyed() {
        this.map.destroy()
        this.time = 0
        this.distance = 0
        this.speed = 0
        this.driving = null
        this.destroyMapMask()
    },
    methods: {
        /**
         * Tab切换
         */
        handTabChange(type) {
            this.map.destroy()
            this.time = 0
            this.distance = 0
            this.speed = 0
            this.driving = null
            this.getTrack(type)
        },
        /**
         * 获取跟踪线路
         */
        getTrack(type) {
            DispatchOrder.trackList({
                dispatchOrderID: this.dispatchOrderID,
                type
            }).then(res => {
                this.locationList = res.locationList || []
                this.dispatchTaskPicList = res.dispatchTaskPicList || []
                const path = this.locationList.map(item => {
                    return { lnglat: item.loc.coordinates }
                })
                this.createMap(path, this.dispatchTaskPicList)
            })
        },
        /**
         * 创建地图
         */
        createMap(path, imgPath) {
            this.map = new AMap.Map('amapWrapper')
            this.driving = new AMap.TruckDriving({
                map: this.map,
                size: 3,
                // hideMarkers: true
            }).search(path, (status, result) => {
                this.distance = (result.routes[0].distance/1000).toFixed(2)
                this.time = Number((result.routes[0].time/3600).toFixed(2))
                this.speed = this.time ? (this.distance/this.time).toFixed(2) : 0
            })
            const markList = this.createMarker(imgPath)
            markList.forEach(item => {
                this.map.add(item)
            })
        },
        /**
         * 创建标记点
         */
        createMarker(positions) {
            this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(10, -30)})
            const list = []
            let item = null
            for (let i = 0; i < positions.length; i++) {
                item = new AMap.Marker({
                    position: [positions[i].lng, positions[i].lat],
                    icon: new AMap.Icon({
                        size: new AMap.Size(50, 50),  //图标大小
                        image: "./static/imgs/photo-marker.png",
                        imageSize: new AMap.Size(50, 50)
                    })
                })
                item.content = `<div class="info-window-img" id="infoWindow"><img id="photoInfoWin" src="${this.imgUrl}${positions[i].maxURL}"/></div>`
                item.on('click', this.showPhoto)
                list.push(item)
            }
            return list
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
        /**
         * 显示地图中照片
         */
        showPhoto(e) {
            this.infoWindow.setContent(e.target.content)
            this.infoWindow.open(this.map, e.target.getPosition())
        },
        /**
         * 关闭弹窗
         */
        close() {
            this.destroyMapMask()
            this.$emit('cancel')
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

<style lang="stylus">
.info-window-img
    padding 7px 0px 0px 7px
    img
        max-height 200px
        max-width 300px
        width 100%
        height 100%
</style>

<style lang="stylus" scoped>
.map-container
    position fixed
    top 10%
    right 20%
    bottom 10%
    left 20%
    padding 10px
    background-color #fff
    border-radius 2px
    box-shadow 0 1px 3px rgba(0,0,0,.3)
    z-index 10000
    &.max
        top 0
        right 0
        bottom 0
        left 0
    .wrapper
        position absolute
        top 50px
        right 10px
        bottom 10px
        left 10px
        border 1px solid #ddd
        margin-top 10px
        .tips
            position absolute
            left 0
            top 0
            height 36px
            line-height 36px
            font-size 12px
            padding 0 20px
            color #fff
            background-color rgba(0,0,0,.3)
            z-index 99999
        #amapWrapper
            width 100%
            height 100%
    .dialogTit
        height 40px
        text-align center
    .closeBtn
        position absolute
        right 10px
        top 10px
        cursor pointer
        color #141414
        font-size 12px
    .minMax
        position absolute
        right 40px
        top 10px
        cursor pointer
        color #141414
        font-size 12px
</style>
