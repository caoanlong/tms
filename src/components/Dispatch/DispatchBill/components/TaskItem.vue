<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span><strong>任务单{{index+1}}</strong> &nbsp;&nbsp;&nbsp;{{taskItem.shipperArea}} -> {{taskItem.consigneeArea}}</span>
        </div>
        <el-row @click="viewtaskdetail(taskItem.dispatchTaskID)">
            <div class="section-block fare">
                <span class="block-title">货物清单</span>
                <div class="block-content" style="padding:10px 0 20px">
                    <table>
                        <tr>
                            <th>承运单号</th>
                            <th>货物名称</th>
                            <th>货物重量</th>
                            <th>货物体积</th>
                            <th>货物数量</th>
                        </tr>
                        <tr class="text-center" v-for="(item, index) in taskItem.cargoList" :key="index">
                            <td>{{item.carrierOrderNo}}</td>
                            <td>{{item.cargoName}}</td>
                            <td>{{item.cargoWeight ? item.cargoWeight + '吨' : '0吨'}}</td>
                            <td>{{item.cargoVolume ? item.cargoVolume + '方' : '0方'}}</td>
                            <td>{{item.cargoNum ? item.cargoNum + item.cargoUnitName : '0'}}</td>
                        </tr>
                        <tr class="text-center">
                            <td>合计</td>
                            <td></td>
                            <td>{{cargoList.reduce((prev, cur) => prev + cur.cargoWeight, 0)}}吨</td>
                            <td>{{cargoList.reduce((prev, cur) => prev + cur.cargoVolume, 0)}}方</td>
                            <td>{{cargoList.reduce((prev, cur) => prev + cur.cargoNum, 0)}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="section-block">
                <span class="block-title">运费录入</span>
                <div class="block-content">
                    <el-row :gutter="20">
                        
                    </el-row>
                </div>
            </div>
        </el-row>
    </el-card>
</template>
<script type="text/javascript">
import { resizeImg } from '../../../../common/utils'
import ImageUpload from '../../../CommonComponents/ImageUpload2'
export default {
	props:{
		index:{
			type: Number,
			default: 1
		},
		taskItem:{
			type: Object
		},
		plateNo:{
			type: String
		},
		trailerPlateNo:{
			type: String
		}
	},
	computed: {
		resizeImg: () => resizeImg
	},
	data(){
		return{
		}
	},
	components: {ImageUpload},
	methods:{
		viewtaskdetail(dispatchTaskID){
			this.$router.push({ name: 'viewtaskdetail' , query: { dispatchTaskID } })
		}
	}
}

</script>
<style lang="stylus" scoped>
.section-block
	margin 30px 0 0
	padding 0 0 10px 0
	position relative
	&:first-child
		margin-top 0
	.viewtaskdetailBtn
		width 20px
		height 75px
		position absolute
		top 50%
		right 10px
		cursor pointer
		transform translateY(-50%)
	p
		margin 0
		line-height 30px
		font-size 14px
		color #666
		.c2
			color #f90
	.statusTag
		position absolute
		background #fff
		padding 0 10px
		right 10px
		top -10px	
</style>
