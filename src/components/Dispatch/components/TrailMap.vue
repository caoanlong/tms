<template>
    <div class="map-container">
        <div class="title">轨迹</div>
        <el-row type="flex" justify="center">
            <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;" @change="handTabChange">
                <el-radio-button label="GPS"></el-radio-button>
                <el-radio-button label="APP"></el-radio-button>
            </el-radio-group>
        </el-row>
        <div class="wrapper">
            <div class="tips">累计时长：{{time}}小时&nbsp;&nbsp;&nbsp;累计里程：{{distance}}km&nbsp;&nbsp;&nbsp;平均时速：{{speed}}km</div>
            <div id="amapWrapper"></div>
        </div>
        <div class="footer text-center">
            <el-button @click="close">关闭</el-button>
        </div>
    </div>
</template>

<script>
import Dispatchbill from '../../../api/Dispatchbill'
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
            dispatchTaskPicList: []
        }
    },
    created() {
        this.createMapMask()
    },
    mounted() {
        this.getTrack(this.tabPosition)
    },
    destroyed() {
        this.map.destroy()
        this.driving = null
        this.destroyMapMask()
    },
    methods: {
        handTabChange(type) {
            this.map.destroy()
            this.driving = null
            this.getTrack(type)
        },
        getTrack(type) {
            Dispatchbill.track({
                dispatchOrderID: this.dispatchOrderID,
                type
            }).then(res => {
                this.locationList = res.locationList
                this.dispatchTaskPicList = res.dispatchTaskPicList
                const path = this.locationList.map(item => {
                    return { lnglat: item.loc.coordinates }
                })
                this.createMap(path, this.dispatchTaskPicList)
            })
        },
        createMap(path, imgPath) {
            this.map = new AMap.Map('amapWrapper')
            this.driving = new AMap.TruckDriving({
                map: this.map,
                size: 3,
                // hideMarkers: true
            }).search(path, (status, result) => {
                this.distance = (result.routes[0].distance/1000).toFixed(2)
                this.time = (result.routes[0].time/3600).toFixed(2)
                this.speed = (this.distance/this.time).toFixed(2)
                this.map.add(this.createMarker(imgPath))
            })
        },
        createMarker(positions) {
            this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(10, -30)})
            const list = []
            for (let i = 0; i < positions.length; i++) {
                const item = new AMap.Marker({
                    position: [positions[i].lng, positions[i].lat],
                    icon: new AMap.Icon({
                        size: new AMap.Size(50, 50),  //图标大小
                        image: "./static/imgs/photo-marker.png",
                        imageSize: new AMap.Size(50, 50)
                    })
                })
                imgs = positions[i].maxURL
                item.content = `<div class="info-window-img" id="infoWindow"><img id="photoInfoWin" src="${this.imgUrl}${imgs}"/></div>`
                item.on('click', this.showPhoto)
                list.push(item)
            }
            return list
        },
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
        destroyMapMask() {
            const mapMask = document.getElementById('mapMask')
            if (mapMask) document.body.removeChild(mapMask)
        },
        showPhoto(e) {
            this.infoWindow.setContent(e.target.content)
            this.infoWindow.open(this.map, e.target.getPosition())
        },
        close() {
            this.destroyMapMask()
            this.$emit('cancel')
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
    width 60%
    position fixed
    left 50%
    top 50%
    transform translate(-50%,-50%)
    padding 10px
    background-color #fff
    border-radius 2px
    box-shadow 0 1px 3px rgba(0,0,0,.3)
    z-index 10000
    .title
        height 44px
        line-height 44px
    .wrapper
        position relative
        height 550px
        border 1px solid #ddd
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
    .footer
        height 60px
        line-height 60px
</style>
