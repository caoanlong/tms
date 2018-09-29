<template>
    <div class="map-container" :class="isMax?'max':''">
        <div class="dialog-tit">
            <div class="title">选择定位地址</div>
            <span class="minMax" @click="resizeDialog">
                <svg-icon :icon-class="isMax?'min':'max'"></svg-icon>
            </span>
            <span class="closeBtn" @click="close">
                <svg-icon icon-class="close"></svg-icon>
            </span>
        </div>
        <el-row>
            <el-form :inline="true" :model="find" :rules="rules" ref="ruleForm">
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
        </el-row>
        <div class="wrapper" :style="isMax ? {height: (windowInnerHeight-182) + 'px'} : {height: (windowInnerHeight-382) + 'px'}">
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
        selectedCity: String,
        callback: Function
    },
    data() {
        return {
            map: null,
            isMax:false,
            find: {
                lng: '',
                lat: ''
            },
            lnglat: [0,0],
            address: '',
            rules: {
                lng: [ {required: true, message: '请输入经度'} ],
                lat: [ {required: true, message: '请输入纬度'} ]
            }
        }
    },
    computed: {
        windowInnerHeight: () => window.innerHeight
    },
    created() {
        if (this.locAddress) {
            this.address = this.locAddress
        }
        console.log(this.location)
        this.createMapMask()
    },
    mounted() {
        this.createMap()
    },
    destroyed() {
        this.lnglat = [0,0]
        this.map.clearMap()
        this.map.destroy()
        this.destroyMapMask()
    },
    methods: {
        search() {
            this.lnglat = [this.find.lng, this.find.lat]
            this.map.setCenter(this.lnglat)
            this.map.clearMap()
            this.map.add(this.createMarker(this.lnglat))
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
            if (this.location && this.location[0] && this.location[1]) {
                this.lnglat = this.location
                this.map.setCenter(this.location)
                this.map.add(this.createMarker(this.location))
            } else {
                this.getLocationByArea()
            }
            this.map.on('click', (e) => {
                this.lnglat = [e.lnglat.lng, e.lnglat.lat]
                this.map.setCenter(this.lnglat)
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
                        this.address = result.regeocode.formattedAddress || '未知地址'
                    } else {
                        this.address = '未知地址'
                    }
                })
            })
        },
        /**
         * 根据地址获取经纬度
         */
        getLocationByArea() {
            AMap.plugin('AMap.Geocoder', () => {
                const geocoder = new AMap.Geocoder({
                    city: this.selectedCity
                })
                geocoder.getLocation(this.selectedCity, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        const location = result.geocodes[0].location
                        this.find.lng = location.lng
                        this.find.lat = location.lat
                        this.search()
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
    width 1000px
    position fixed
    left 50%
    top 80px
    margin-left -500px
    padding 10px
    background-color #fff
    border-radius 2px
    box-shadow 0 1px 3px rgba(0,0,0,.3)
    z-index 10000
    &.max
        width 100%
        left 0
        top 0
        right 0
        bottom 0
        margin 0
        .closeBtn
        .minMax
            top 10px
        .closeBtn
            right 10px
        .minMax
            right 51px
    .wrapper
        position relative
        border 1px solid #ddd
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
        margin-top 10px
    .closeBtn
    .minMax
        position absolute
        top -5px
        cursor pointer
        font-size 12px
        background #f80
        color #fff
        width 36px
        height 36px
        line-height 36px
        text-align center
        color #fff
        border-radius 4px
    .closeBtn
        position absolute
        right -5px
    .minMax
        right 36px
    
</style>
