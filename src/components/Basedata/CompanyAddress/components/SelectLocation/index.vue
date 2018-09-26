<template>
    <div class="map-container" :class="isMax?'max':''">
        <div class="dialog-tit">
            <div class="title">选择定位地址</div>
            <svg-icon :icon-class="isMax?'min':'max'" @click.native="resizeDialog" class="minMax"></svg-icon>
            <svg-icon icon-class="close" @click.native="close" class="closeBtn"></svg-icon>
        </div>
        <div class="wrapper" :style="isMax ? {height: (windowInnerHeight-70) + 'px'} : {height: (windowInnerHeight-300) + 'px'}">
            <div class="tips">
                经度：{{lnglat[0]}}&nbsp;&nbsp;纬度：{{lnglat[1]}}&nbsp;&nbsp;地址：{{address}}
            </div>
            <div id="amapLocationSelect"></div>
        </div>
        <div class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="add">确定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        location: Array,
        locAddress: String,
        callback: Function
    },
    data() {
        return {
            map: null,
            isMax:false,
            lnglat: [0,0],
            address: ''
        }
    },
    computed: {
        windowInnerHeight: () => window.innerHeight
    },
    created() {
        if (this.locAddress) {
            this.address = this.locAddress
        }
        this.createMapMask()
    },
    mounted() {
        this.createMap()
    },
    destroyed() {
        this.destroyMapMask()
        this.map.destroy()
    },
    methods: {
        /**
         * 创建地图
         */
        createMap() {
            this.map = new AMap.Map('amapLocationSelect')
            if (this.location && this.location[0] && this.location[1]) {
                this.lnglat = this.location
                this.map.setCenter(this.location)
                this.map.add(this.createMarker(this.location))
            }
            this.map.on('click', (e) => {
                this.lnglat = [e.lnglat.lng, e.lnglat.lat]
                console.log(this.lnglat)
                this.map.clearMap()
                this.map.add(this.createMarker(this.lnglat))
                this.getAddressByLocation(this.lnglat)
            })
        },
        /**
         * 创建标记点
         */
        createMarker(position) {
            return new AMap.Marker({ position })
        },
        /**
         * 根据经纬度获取地址
         */
        getAddressByLocation(position) {
            AMap.plugin('AMap.Geocoder', () => {
                const geocoder = new AMap.Geocoder()
                geocoder.getAddress(position, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        this.address = result.regeocode.formattedAddress
                    }
                })
            })
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
        add() {
			this.callback({
                location: this.lnglat,
                address: this.address
            })
        },
        close() {
            this.callback()
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
    &.max
        width 100%
    .wrapper
        position relative
        height 550px
        border 1px solid #ddd
        margin-top 10px
        .tips
            position absolute
            left 0
            top 0
            height 36px
            line-height 36px
            min-width 300px
            font-size 12px
            padding 0 20px
            color #fff
            background-color rgba(0,0,0,.3)
            z-index 99999
        #amapLocationSelect
            width 100%
            height 100%
    .dialog-tit
        height 40px
        .title
            line-height 40px
    .dialog-footer
        width 100%
        text-align center
        padding 15px 0
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
