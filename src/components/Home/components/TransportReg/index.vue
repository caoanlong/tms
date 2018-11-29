<template>
    <div class="trans-container">
        <div class="left">
            <el-input placeholder="提货单/承运单号/车牌" v-model="keywords" class="input-with-select">
                <el-button slot="append" type="primary" icon="el-icon-search">查询</el-button>
            </el-input>
            <div class="trucks">
                <div class="total">共<span class="total-num">{{total}}</span>个在途车辆</div>
                <div class="wrapper">
                    <div class="truck" v-for="item in pageSize" :key="item">
                        <div class="up">
                            <span class="order">发货单 <span class="order-num">265544669987</span></span>
                            <el-tag class="order-tag" type="danger" size="mini">异常</el-tag>
                        </div>
                        <div class="middle">
                            <span class="plateNo">云A-11111</span>
                            <span class="status finished">已结束</span>
                        </div>
                        <div class="down">
                            <div class="address">
                                <svg-icon icon-class="location" style="color:#409EFF"></svg-icon>
                                <span class="address-txt">昆明大理州G25高速昆明大理州G25高速</span>
                            </div>
                            <div class="view">
                                <svg-icon icon-class="foot"></svg-icon>查看轨迹<svg-icon icon-class="arrow-right"></svg-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-row class="page">
                <el-pagination
                    small
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </el-row>
        </div>
        <div class="right">
            <div class="filter">
                <el-form :inline="true" size="mini">
                    <el-form-item label="工厂">
                        <el-select placeholder="请选择">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="临沧工厂" value="临沧工厂"></el-option>
                            <el-option label="邵通工厂" value="邵通工厂"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="异常原因">
                        <el-select placeholder="请选择">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="停车超时" value="停车超时"></el-option>
                            <el-option label="卸货异常" value="卸货异常"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据来源">
                        <el-select placeholder="请选择">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="GPS" value="GPS"></el-option>
                            <el-option label="APP" value="APP"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-refresh">刷新</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div id="amapLocationSelect"></div>
        </div>
    </div>
</template>

<script>
import Page from '../../../CommonComponents/Page'
export default {
    components: { Page },
    data() {
        return {
            keywords: '',
            total: 100,
            pageIndex: 1,
            pageSize: 6,
            mapHeight: 0,
            map: null
        }
    },
    mounted() {
        this.createMap()
    },
    methods: {
        pageChange() {

        },
        pageSizeChange() {

        },
        /**
         * 创建地图
         */
        createMap() {
            this.map = new AMap.Map('amapLocationSelect')
            const path = [
                {
                    position: [103.310594, 27.288413],
                    plateNo: '鄂A585KT',
                    background: '#409EFF'
                },{
                    position: [103.468386, 27.321035],
                    plateNo: '粤B585KT',
                    background: '#fb7629'
                }
            ]
            for (let i = 0; i < path.length; i++) {
                const element = path[i]
                new AMap.Marker({
                    position: path[i].position,
                    content: `<div style="position:relative;width:100px;height:50px;text-align:center">
                        <div style="position:absolute;z-index:5;width:100%;color:#fff;background:${path[i].background};height:40px;line-height:40px;border-bottom:2px solid #fff;border-radius:10px">${path[i].plateNo}</div>
                        <div style="position:absolute;bottom:2px;left:42px;background:${path[i].background};width:16px;height:16px;transform:rotate(45deg)"></div>
                    </div>`,
                    map: this.map
                })
            }
            this.map.setCenter(path[parseInt(path.length / 2)].position)
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
        .page
            padding 10px
        .trucks
            border 1px solid #dddddd
            border-top none
            .total
                color #999
                font-size 12px
                padding-left 10px
                height 20px
                line-height 20px
                border-bottom 1px solid #ddd
                .total-num
                    color #409EFF
                    font-weight bold
            .wrapper
                height 600px
                overflow auto
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
                            text-align right
                            font-size 13px
                            color #999
                            &.finished
                                color #7ac918
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
    .right
        height 640px
        border 1px solid #dddddd
        .filter
            width 100%
            height 50px
            background-color #ffffff
            border-bottom 1px solid #ddd
            padding 10px 20px
        #amapLocationSelect
            height 100%
</style>
