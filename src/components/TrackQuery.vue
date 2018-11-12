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
        }
    }
}
</script>

<style lang="stylus" scoped>
#amapLocationSelect
    width 100%
    height 500px
</style>
