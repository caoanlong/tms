<template>
    <div class="priceReg">
        <div class="ls sideSection">
            <div class="card">
                <div class="title">总单/特价</div>
                <div class="con">
                    <div id="chart1" style="height:225px"></div>
                    <div class="legend">
                        <p class="p1"><i></i><span>总单量</span>{{priceReg.sumOfCarrierOrder?priceReg.sumOfCarrierOrder:0}}单</p>
                        <p class="p2"><i></i><span>特价单</span>{{priceReg.sumOfSelfPickCarrierOrder?priceReg.sumOfSelfPickCarrierOrder:0}}单</p>
                        <p class="p3"><i></i><span>特价占比</span>{{(priceReg.sumOfCarrierOrder&&priceReg.sumOfSelfPickCarrierOrder)?(priceReg.sumOfSelfPickCarrierOrder/priceReg.sumOfCarrierOrder*100).toFixed(2)+'%':0}}</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="title">总单/异常</div>
                <div class="con">
                    <div id="chart2" style="height:225px"></div>
                    <div class="legend">
                        <p class="p1"><i></i><span>总单量</span>{{priceReg.sumOfCarrierOrder?priceReg.sumOfCarrierOrder:0}}单</p>
                        <p class="p2"><i></i><span>异常单</span>{{priceReg.sumOfAlarm?priceReg.sumOfAlarm:0}}单</p>
                        <p class="p3"><i></i><span>异常占比</span>{{(priceReg.sumOfCarrierOrder&&priceReg.sumOfAlarm)?(priceReg.sumOfAlarm/priceReg.sumOfCarrierOrder*100).toFixed(2)+'%':0}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle">
            <div id="map" :style="{'height':fullHeight+'px'}"></div>
            <div class="changeData">
                <el-tabs v-model="dataType" type="card" @tab-click="handleClick">
                    <el-tab-pane label="当月数据" name="0"></el-tab-pane>
                    <el-tab-pane label="当日数据" name="1"></el-tab-pane>
                </el-tabs>
                <el-button size="mini" type="primary" class="resetMap" @click="resetMap">重置地图</el-button>
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
                        <p class="p1"><i></i><span>停车超时</span>{{priceReg.stopOvertime}}</p>
                        <p class="p2"><i></i><span>卸货异常</span>{{priceReg.arrivedOffset}}</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="title">异常工厂/单<span class="fr" @click="viewMore" >查看更多</span></div>
                <div class="con" style="height:450px;padding:10px" v-loading="exComloading">
                    <div style="margin-bottom: 15px" v-for="(item, index) in priceReg.alarmRankList" :key="index">
                        <div style="height:24px;line-height:24px">
                            <span>{{index + 1}}</span>
                            <span>{{item.shipperCompanyName}}</span>
                            <span style="color:#409EFF">{{item.percentage}}</span>
                        </div>
                        <el-progress 
                            :text-inside="false"
                            :show-text="false" 
                            :stroke-width="18" 
                            :percentage="item.percentage">
                        </el-progress>
                    </div>
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
import { Message } from 'element-ui'
import Home from '../../../../api/Home'
export default {
    data(){
        return {
            exComloading: true,
            markPoint:[],
            dataType: '0',
            percentage:'',
            fullHeight: document.documentElement.clientHeight -225,
            priceReg:{
                //总单量
                sumOfCarrierOrder:'',
                //特价单
                sumOfSelfPickCarrierOrder:'',
                //异常单
                sumOfAlarm:'',
                //卸货异常
                arrivedOffset:'',
                //停车超时
                stopOvertime:'',
                //公司名称
                shipperCompanyName:[],
                //公司异常单
                ex:[],
                alarmRankList:[
                    {
                        shipperCompanyName:'',
                        ex:''
                    }
                ],
                rankList:[
                    {
                        countCarrierNum:'',
                        countCarrierAlarmNum:'',
                        countCustomer:'',
                        countCustomerAlarm:'',
                        shipperCompanyName:'',
                        lng:'',
                        lat:''
                    }
                ]
            },
            chartOption1:{
                series : [
                    {
                        type: 'pie',
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    color: '#409EFF',
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
                        color: ['#409EFF', '#f4516c'],
                        radius : ['40%','60%'],
                        center: ['28%', '50%'],
                        data:[
                            {
                                value:'', 
                                name:'正常价'
                            },
                            {
                                value:'', 
                                name:'特价单'
                            },
                        ]
                    }
                ]  
        
            },
            chartOption2:{
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
                                textStyle: {
                                    color: '#409EFF',
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
                        color: ['#409EFF', '#f4516c'],
                        radius : ['40%','60%'],
                        center: ['28%', '50%'],
                        data:[
                            {
                                value:1800, 
                                name:'正常单'
                            },
                            {
                                value:600, 
                                name:'异常单'
                            },
                        ]
                    }
                ]  
        
            },
            chartOption3:{
                legend: {
                    show:false,
                    data: ['停车超时','卸货异常']
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
                                // formatter:function (params) {
                                //     console.log(params)
                                //     return params.name+'\n'+params.value+' / '+ params.percent +'%'
                                // },
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        hoverAnimation:false,
                        color: ['#409EFF', '#f4516c'],
                        radius : '60%',
                        center: ['28%', '50%'],
                        data:[
                            {value:'', name:'停车超时'},
                            {value:'', name:'卸货异常'},
                        ]
                    }
                ]  
        
            },
            chartOption4 :{
                color: ['#409EFF'],
                grid: {
                    left: '10',
                    right: '10',
                    bottom: '10',
                    top:'10',
                    containLabel: true
                },
                yAxis : [
                    {
                        type : 'category',
                        show : false,
                        data : [],
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
                        type:'bar',
                        barWidth: '20',
                        barGap:'20',
                        barCategoryGap:'20',
                        data:[],
                        label:{
                            show:true,
                            formatter:function (params) {
                                 return params.name+'   '+params.value
                            },
                            rich:{
                                a: {
                                    color: '#409EFF',
                                    backgroundColor:'#fff',
                                    width:14,
                                    height:14,
                                    lineHeight:14,
                                    borderRadius:8,
                                    align:'center',
                                    verticalAlign:'top'
                                }
                               
                            },
                            position:'insideLeft',
                            color:'#fff',
                            // textBorderColor:'#fff',
                            // textBorderWidth:1
                        },
                        itemStyle:{
                            barBorderRadius:4
                        }
                    }
                ]
        
            },
            mapOption :{
                tooltip : {
                    show:true,
                    trigger: 'item',
                    formatter:function(params){
                        return params.data.name+'<br />总单量/异常量：'+
                        params.data.carrier+'<br />总客户/异常客户：'
                        +params.data.customer
                    },
                },
                roam:true,
                scaleLimit:{
                    min:0.5,
                    max:5
                },
                geo: {
                    map: "云南",
                    label: {
                        show:true,
                        color:"#ccc"
                    },
                    itemStyle: {
                        areaColor: "#f8f8f8",
                        borderColor: "#999",
                    },
                    center:[101.520619, 25.070767],
                    emphasis: {
                        label:{
                            show:true,
                            color:"#ccc"
                        },
                        itemStyle: {
                            areaColor: "#f8f8f8",                            
                        },
                    },
                    zoom:1.2   
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
                        data:[],
                        
                        label:{
                            show:true,
                            itemStyle:{
                                normal:{color:'yellow'}
                            },
                            formatter:function(params){
                                return '{a|'+ params.data.name+'}\n{b|'+params.data.carrier+'}\n{c|'+params.data.customer+'}'
                            },
                            position:'right',
                            rich:{
                                a: {
                                    color: '#409EFF'
                                },
                                b: {
                                    color: '#000'
                                },
                                c: {
                                    color: '#f4516c'
                                },
                            }
                        },
                        symbolSize:10,
                        symbol:'circle',
                    }
                }]
            }
        }
    },
    mounted() {
        this.getInfo()
        window.onresize = () => {
			window.fullHeight = document.documentElement.clientHeight
			this.fullHeight = window.fullHeight-225
		}
    },
	activated() {
        this.type = 0
        this.getInfo()
	},
    methods: {
        getInfo(){
            Home.getPriceReg({
				type:this.dataType
			}).then(res => {
                this.priceReg = res
                const max = Math.max.apply(null, this.priceReg.alarmRankList.map(item => item.ex))
                this.priceReg.alarmRankList = res.alarmRankList.map(item => {
                    return {
                        ex: +item.ex,
                        shipperCompanyName: item.shipperCompanyName,
                        percentage: Math.round(+item.ex*100/max)
                    }
                })
                this.exComloading = false
                this.chartOption1.series[0].data[0].value = this.priceReg.sumOfCarrierOrder-this.priceReg.sumOfSelfPickCarrierOrder
                this.chartOption1.series[0].data[1].value = this.priceReg.sumOfSelfPickCarrierOrder
                this.chartOption1.series[0].label.normal.formatter = (this.priceReg.sumOfCarrierOrder&&this.priceReg.sumOfSelfPickCarrierOrder)?'特价占比\n'+(this.priceReg.sumOfSelfPickCarrierOrder/this.priceReg.sumOfCarrierOrder*100).toFixed(2)+'%':'暂无特价'
                this.chartOption2.series[0].data[0].value= this.priceReg.sumOfCarrierOrder-this.priceReg.sumOfAlarm
                this.chartOption2.series[0].data[1].value= this.priceReg.sumOfAlarm
                this.chartOption2.series[0].label.normal.formatter = (this.priceReg.sumOfCarrierOrder&&this.priceReg.sumOfAlarm)?'异常占比\n'+(this.priceReg.sumOfAlarm/this.priceReg.sumOfCarrierOrder*100).toFixed(2)+'%':'暂无异常'
                this.chartOption3.series[0].data[0].value= this.priceReg.stopOvertime
                this.chartOption3.series[0].data[1].value= this.priceReg.arrivedOffset
                this.markPoint = this.priceReg.rankList
                this.formatMarkPoint(this.priceReg.rankList)
                this.mapOption.series[0].markPoint.data = this.markPoint
                this.drawCharts()
                
            })
        },
        handleClick(tab, event) {
            this.getInfo()
        },
        drawCharts() {
            let chart1 = echarts.init(document.getElementById('chart1'))
            let chart2 = echarts.init(document.getElementById('chart2'))
            let chart3 = echarts.init(document.getElementById('chart3'))
            let mapChart = echarts.init(document.getElementById('map'))
            // 绘制图表
            chart1.setOption(this.chartOption1,true)
            chart2.setOption(this.chartOption2,true)
            chart3.setOption(this.chartOption3,true)
            mapChart.setOption(this.mapOption,true)
            setTimeout(function (){
                window.onresize = function () {
                    chart1.resize()
                    chart2.resize()
                    chart3.resize()
                    mapChart.resize()
                }
            },200)

            
        },
        formatMarkPoint(data){
            for(let i=0;i<data.length;i++){
                this.markPoint[i].name = data[i].shipperCompanyName
                this.markPoint[i].coord= [data[i].lng,data[i].lat]
                this.markPoint[i].customer = data[i].countCustomer+'/'+data[i].countCustomerAlarm
                this.markPoint[i].carrier = data[i].countCarrierNum+'/'+data[i].countCarrierAlarmNum
            }
        },
        viewMore(){
            this.$router.push({ name: 'anomaly' })
        },
        resetMap(){
            let mapChart = echarts.init(document.getElementById('map'))
            mapChart.setOption(this.mapOption,true)
        }
    }
}
</script>

<style lang="stylus" scoped>
.priceReg
    padding 0 310px
    position relative
    .ls
        left 0
    .rs
        right 0
    .middle
        position relative
        
        .mapLegend
            position absolute
            right 0px
            top 50px
            p
                height 20px
                line-height 20px
                font-size 12px
                &.p1
                    color #409EFF
                    i
                        background #409EFF 
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
            top 0
            right 0
            .resetMap
                position absolute
                top 7px
                right 0
.sideSection
    width 300px
    position absolute
    top 0
    .card
        border 1px solid #ddd
        border-radius 4px
        .title
            border-bottom 1px solid #ddd
            padding 12px 15px
            font-size 14px
            color #666
            span
                font-size 12px
                color #409EFF
                cursor pointer
        .con
            position relative
            background #fff
            height 225px
            .tips
                position absolute
                text-align center
                top 50%
                left 50%
                transform translate(-50%,-50%)
                font-size 12px
                color #999
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
                        color #409EFF
                        i
                            background #409EFF 
                    &.p2
                        color #f4516c
                        i
                            background #f4516c 
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
        .num
            width 20px
            position absolute
            top 0
            left 10px
            span
                width 20px
                height 20px
                display block
                border-radius 10px
                background #f00
                color #409EFF
                text-align center
                line-height 20px
                margin 23px 0
        &~.card
            margin-top 10px
</style>
