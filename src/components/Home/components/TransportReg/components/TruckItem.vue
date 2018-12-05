<template>
    <div class="truck">
        <div class="up">
            <span class="order">发货单 <span class="order-num">{{truck.shipperNo}}</span></span>
            <el-tag class="order-tag" type="danger" size="mini" v-if="truck.msgType">异常</el-tag>
        </div>
        <div class="middle">
            <span class="plateNo">{{truck.plateNo}}</span>
            <span class="status">运输中</span>
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
        truck: Object
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
        .order
            color #666
            font-size 13px
            .order-num
                color #409EFF
        .order-tag
            float right
    .middle
        height 26px
        line-height 26px
        padding-right 70px
        .plateNo
            font-size 15px
            font-weight bold
            color #555
        .status
            padding-left 5px
            font-size 13px
            color #67c23a
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
