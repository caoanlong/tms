<template>
    <div class="map-container">
        <div class="title">轨迹</div>
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
            map: null,
            driving: null,
            infoWindow: null,
            distance: 0,
            time: 0,
            speed: 0
        }
    },
    created() {
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
    mounted() {
        Dispatchbill.track({
            dispatchOrderID: this.dispatchOrderID,
            type: 'GPS'
        }).then(res => {
            console.log(res.data.data)
        })
        const path = [
            {lnglat: [116.303843, 39.983412]},
            {lnglat: [114.365526,30.735587]},
            {lnglat: [112.91533,28.220565]},
            {lnglat: [113.933512, 22.562219]}
        ]
        this.map = new AMap.Map('amapWrapper')
        this.driving = new AMap.TruckDriving({
            map: this.map,
            size: 3,
            // hideMarkers: true
        }).search(path, (status, result) => {
            this.distance = (result.routes[0].distance/1000).toFixed(2)
            this.time = (result.routes[0].time/3600).toFixed(2)
            this.speed = (this.distance/this.time).toFixed(2)
            this.map.add(this.createMarker(path.map(item => item.lnglat)))
        })
    },
    destroyed() {
        this.map.destroy()
        this.driving = null
        document.body.removeChild(document.getElementById('mapMask'))
    },
    methods: {
        createMarker(positions) {
            this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(10, -30)})
            const list = []
            for (let i = 0; i < positions.length; i++) {
                const position = positions[i]
                const item = new AMap.Marker({
                    position,
                    icon: new AMap.Icon({
                        size: new AMap.Size(50, 50),  //图标大小
                        image: "./static/imgs/photo-marker.png",
                        imageSize: new AMap.Size(50, 50)
                    })
                })
                imgs = ['./static/imgs/01.png', './static/imgs/02.png']
                item.content = `<div class="info-window-img" id="infoWindow">
                    <div class="left-arrow" onclick="if(imgIndex == 0) return;imgIndex--;document.getElementById('photoInfoWin').src=imgs[imgIndex];document.getElementById('numCount').innerHTML=(imgIndex+1)+'/'+imgs.length"></div>
                    <img id="photoInfoWin" src="${imgs[imgIndex]}"/>
                    <div id="numCount">${imgIndex+1}/${imgs.length}</div>
                    <div class="right-arrow" onclick="if(imgIndex == imgs.length-1) return;imgIndex++;document.getElementById('photoInfoWin').src=imgs[imgIndex];document.getElementById('numCount').innerHTML=(imgIndex+1)+'/'+imgs.length"></div>
                </div>`
                item.on('click', this.showPhoto)
                list.push(item)
            }
            return list
        },
        showPhoto(e) {
            window.imgIndex = 0
            this.infoWindow.setContent(e.target.content)
            this.infoWindow.open(this.map, e.target.getPosition())
        },
        close() {
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="stylus">
.info-window-img
    display flex
    align-items center
    max-height 300px
    padding 0 10px 20px 10px
    &:hover
        .left-arrow,.right-arrow
            display block
    #numCount
        position absolute
        bottom 30px
        left 10px
        width 100%
        text-align center
        color #999
    .left-arrow
        display none
        position absolute
        left 10px
        width 16px
        height 16px
        border-top 2px solid #bbb
        border-left 2px solid #bbb
        transform rotate(-45deg)
        cursor pointer
    .right-arrow
        display none
        position absolute
        right 10px
        width 16px
        height 16px
        border-top 2px solid #bbb
        border-right 2px solid #bbb
        transform rotate(45deg)
        cursor pointer
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
