<template>
    <div class="trans-container">
        <div class="left">
            <el-input placeholder="提货单/承运单号/车牌" v-model="keywords" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <div class="trucks">
                <div class="total">共{{total}}个在途车辆</div>
                <div class="truck" v-for="item in pageSize" :key="item">
                    <div class="up">
                        <span class="order">发货单 265544669987</span>
                        <el-tag type="danger" size="mini">异常</el-tag>
                    </div>
                    <div class="middle">
                        <span class="plateNo">云A-11111</span>
                        <span class="status">已装车</span>
                    </div>
                    <div class="down">
                        <div class="address">昆明大理州G25高速</div>
                        <div class="view">查看轨迹</div>
                    </div>
                </div>
            </div>
            <el-pagination
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
import Page from '../../../CommonComponents/Page'
export default {
    components: { Page },
    data() {
        return {
            keywords: '',
            total: 0,
            pageIndex: 1,
            pageSize: 6
        }
    },
    methods: {
        pageChange() {

        },
        pageSizeChange() {

        }
    }
}
</script>

<style lang="stylus" scoped>
.trans-container
    width 100%
    position relative
    padding-left 320px
    .left
        position absolute
        left 0
        top 0
        width 300px
        .trucks
            border 1px solid #dddddd
            border-top none
            .total
                color #999
                font-size 14px
                padding-left 10px
                height 20px
                line-height 20px
            .truck
                border-top 1px solid #ddd
                padding 10px
                .up
                    height 26px
                    line-height 26px
                    .order
                        color #666
                        font-size 14px
                .middle
                    height 26px
                    line-height 26px
                    position relative
                    padding-right 70px
                    .plateNo
                        font-size 16px
                        font-weight bold
                        color #333
                    .status
                        position absolute
                        right 0
                        top 0
                        width 70px
                        text-align right
                        font-size 14px
                        color #999
                .down
                    height 26px
                    line-height 26px
                    position relative
                    padding-right 70px
                    .address
                        font-size 13px
                        color #999
                    .view
                        position absolute
                        right 0
                        top 0
                        width 70px
                        text-align right
                        color #409EFF
                        font-size 14px
                        cursor pointer
    .right
        height 500px
        background-color green
</style>
