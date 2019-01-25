<template>
    <div class="truck">
        <div class="up">
            <div class="order">
                交货单 
                <span class="order-num">{{truck.shipperNoList.join('，')}}</span>
            </div>
            <el-tag class="order-tag" type="danger" size="mini" v-if="truck.alarmFlag == 'Y'">异常</el-tag>
        </div>
        <div class="middle">
            <span class="plateNo">{{truck.plateNo}}</span>
            <el-tag size="mini" type="success">运输中</el-tag>
            <el-tooltip placement="top" effect="light">
                <div slot="content">{{truck.gpsFlag=='Y'?'GPS已安装':'GPS未安装'}}</div>
                <el-tag size="mini" :type="truck.gpsFlag=='Y'?'success':'info'" :class="truck.gpsFlag=='Y'?'el-icon-success':'el-icon-warning'"> GPS</el-tag>
            </el-tooltip>
        </div>
        <div class="down">
            <div class="address">
                <svg-icon icon-class="location" style="color:#409EFF"></svg-icon>
                <span class="address-txt">{{truck.posAddress || '暂未获取到位置信息'}}</span>
            </div>
            <div class="view" @click="viewTrack(truck.dispatchOrderID)">
                <svg-icon icon-class="foot"></svg-icon>查看轨迹<svg-icon icon-class="arrow-right"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        truck: {
            type: Object,
            default: {}
        }
    },
    methods: {
        viewTrack(dispatchOrderID) {
            const routeData = this.$router.resolve({name: 'trackquery', query: { dispatchOrderID }})
			window.open(routeData.href, '_blank')
        }
    }
}
</script>

<style lang="stylus" scoped>
.truck
    border-top 1px solid #ddd
    padding 10px
    .up
        height 26px
        line-height 26px
        position relative
        padding-right 40px
        .order
            color #666
            font-size 13px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            .order-num
                color #409EFF
        .order-tag
            position absolute
            right 0
            top 0
            width 40px
            text-align center
    .middle
        height 26px
        line-height 26px
        .plateNo
            font-size 15px
            font-weight bold
            color #555
    .down
        height 26px
        line-height 26px
        position relative
        padding-right 90px
        .address
            font-size 12px
            color #999
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .view
            position absolute
            right 0
            top 0
            width 90px
            text-align right
            color #409EFF
            font-size 14px
            cursor pointer
</style>
