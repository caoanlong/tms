<template>
    <div class="priceReg">
        <div class="ls sideSection">
            <div class="card">
                <div class="title">总单/特价</div>
                <div class="con">
                    <div id="chart1" style="height:225px"></div>
                    <div class="legend">
                        <p class="p1"><i></i><span>总单量</span>2400单</p>
                        <p class="p2"><i></i><span>特价单</span>600单</p>
                        <p class="p3"><i></i><span>特价占比</span>25%</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="title">总单/异常</div>
                <div class="con">
                    <div id="chart2" style="height:225px"></div>
                    <div class="legend">
                        <p class="p1"><i></i><span>总单量</span>2400单</p>
                        <p class="p2"><i></i><span>异常单</span>600单</p>
                        <p class="p3"><i></i><span>异常占比</span>25%</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle">
            <div id="map" style="height:548px"></div>
            <div class="changeData">
                <el-radio-group v-model="dataType" size="mini">
                    <el-radio-button label="month">当月数据</el-radio-button>
                    <el-radio-button label="today">当日数据</el-radio-button>
                </el-radio-group>
            </div>
            <div class="mapLegend">
                <p class="p1"><i></i>工厂名称</p>
                <p class="p2"><i></i>总单量/异常量</p>
                <p class="p3"><i></i>总客户/异常客户</p>
            </div>
        </div>
        <div class="rs sideSection">
            <div class="card">
                <div class="title">异常原因/单</div>
                <div class="con">
                    <div id="chart3" style="height:225px"></div>
                    <div class="legend">
                        <p class="p1"><i></i><span>停车超时</span></p>
                        <p class="p2"><i></i><span>违规卸货</span></p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="title">异常工厂/单<span class="fr">查看更多</span></div>
                <div class="con">
                    <div id="chart4" style="height:225px"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/map')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import "../../../../../static/echarts/yunnan"
import markPointJson from "../../../../../static/echarts/markPoint"
export default {
    data(){
        return {
            markPointer:[],
            dataType: 'month'
        }
    },
    mounted() {
        this.drawCharts()
    },
    watch: {
		type(val) {
            this.type = val
            this.drawCharts()
		}
	},
	activated() {
        this.type = 'month'
        this.drawCharts()
	},
    methods: {
        drawCharts() {
            let chart1 = echarts.init(document.getElementById('chart1'))
            let chart2 = echarts.init(document.getElementById('chart2'))
            let chart3 = echarts.init(document.getElementById('chart3'))
            let chart4 = echarts.init(document.getElementById('chart4'))
            let mapChart = echarts.init(document.getElementById('map'))
            // 绘制图表
            chart1.setOption({
                legend: {
                    show:false,
                    data: ['正常价','特价单']
                },
                series : [
                    {
                        type: 'pie',
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: function (data) {
                                    return ' 总单量\n 2400单'
                                },
                                textStyle: {
                                    color: '#37A2DA',
                                    fontWeight: 700,
                                    fontSize: 14
                                }
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        hoverAnimation:false,
                        color: ['#37A2DA', '#FF9F7F'],
                        radius : ['40%','60%'],
                        center: ['25%', '50%'],
                        data:[
                            {value:1800, name:'正常价'},
                            {value:600, name:'特价单'},
                        ]
                    }
                ]  
        
            })
            chart2.setOption({
                legend: {
                    show:false,
                    data: ['正常单','异常单']
                },
                series : [
                    {
                        type: 'pie',
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: function (data) {
                                    return ' 总单量\n 2400单'
                                },
                                textStyle: {
                                    color: '#37A2DA',
                                    fontWeight: 700,
                                    fontSize: 14
                                }
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        hoverAnimation:false,
                        color: ['#37A2DA', '#FF9F7F'],
                        radius : ['40%','60%'],
                        center: ['25%', '50%'],
                        data:[
                            {value:1800, name:'正常单'},
                            {value:600, name:'异常单'},
                        ]
                    }
                ]  
        
            })
            chart3.setOption({
                legend: {
                    show:false,
                    data: ['停车超时','违规卸货']
                },
                series : [
                    {
                        type: 'pie',
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: "{b} \n{d}%",
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        hoverAnimation:false,
                        color: ['#37A2DA', '#FF9F7F'],
                        radius : '60%',
                        center: ['30%', '50%'],
                        data:[
                            {value:600, name:'停车超时'},
                            {value:600, name:'违规卸货'},
                        ]
                    }
                ]  
        
            })
            chart4.setOption({
                color: ['#37A2DA'],
                grid: {
                    left: '10',
                    right: '10',
                    bottom: '10',
                    top:'10',
                    containLabel: false
                },
                yAxis : [
                    {
                        type : 'category',
                        show : false,
                        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    }
                ],
                xAxis : [
                    {
                        type : 'value',
                        show : false,
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '20',
                        data:[10, 52, 200, 334, 390, 330, 220],
                        label:{
                            show:true,
                            position:'insideLeft',
                            formatter: "{b}{c}",
                            color:'#fc9'
                        }
                    }
                ]
        
            })
            mapChart.setOption({ 
                geo: {
                    map: "云南",
                    label: {
                        show:true,
                        color:"#666"
                    },
                    itemStyle: {
                        areaColor: "#f8f8f8",
                        borderColor: "#999",
                    },
                    emphasis: {
                        label:{
                            show:true,
                            color:"#666"
                        },
                        itemStyle: {
                            areaColor: "#f8f8f8",                            
                        },
                    },
                    zoom:1.2, 
                    top:50                 
                },
                series: [
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    label: {
                        normal: {
                            show: true,
                            color: '#fff',
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    markPoint:{
                        data:markPointJson,
                        label:{
                            show:true,
                            itemStyle:{
                                normal:{color:'yellow'}
                            },
                            position:'right',
                            formatter:function(params){
                                return '{a|'+ params.name+'}\n{b|'+params.data.anomalyOrder+'}\n{c|'+params.data.anomalyCustomer+'}'
                            },
                            rich:{
                                a: {
                                    color: '#37A2DA'
                                },
                                b: {
                                    color: '#000'
                                },
                                c: {
                                    color: '#f00'
                                },
                            }
                        },
                        symbolSize:5,
                        symbol:'circle',
                    }
                }]
            })
            setTimeout(function (){
                window.onresize = function () {
                    chart1.resize()
                    chart2.resize()
                    chart3.resize()
                    chart4.resize()
                    mapChart.resize()
                }
            },200)

            
        }
    }
}
</script>

<style lang="stylus" scoped>
.priceReg
    padding 0 320px
    position relative
    .ls
        left 0
    .rs
        right 0
    .middle
        position relative
        .mapLegend
            position absolute
            right 0
            bottom 0
            p
                height 20px
                line-height 20px
                font-size 12px
                &.p1
                    color #37A2DA
                    i
                        background #37A2DA 
                &.p2
                    color #000
                    i
                        background #000 
                &.p3
                    color #f00
                    i
                        background #f00 
                i
                    width 8px
                    height 8px
                    display inline-block
                    vertical-align middle
                    margin-top -1px
                    margin-right 5px
        .changeData
            position absolute
            left 0
            top 4px
.sideSection
    width 300px
    position absolute
    top 0
    .card
        border 1px solid #ddd
        border-radius 4px
        .title
            border-bottom 1px solid #ddd
            padding 10px 15px
            font-size 14px
            color #666
            span
                font-size 12px
                color #37A2DA
                cursor pointer
        .con
            position relative
            background #fff
            .legend
                position absolute
                right 10px
                top 50%
                transform translateY(-50%)
                font-size 12px
                p
                    height 20px
                    line-height 20px
                    &.p1
                        color #37A2DA
                        i
                            background #37A2DA 
                    &.p2
                        color #FF9F7F
                        i
                            background #FF9F7F 
                    &.p3
                        color #999
                        i
                            background #999 
                i
                    width 8px
                    height 8px
                    display inline-block
                    vertical-align middle
                    margin-top -1px
                    margin-right 5px
                span
                    width 50px
                    display inline-block
                    vertical-align top
                    margin-right 5px
        &~.card
            margin-top 20px
</style>
