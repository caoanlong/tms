<template>
	<div class="main-content">
		<el-card class="box-card">
            <div slot="header" class="clearfix">交货单详情</div>
            <el-form label-width="120px"  size="small">
                <el-row>
                    <el-col :span="8">
						<el-form-item label="交货单号">
							<p>{{deliveryInfo.code}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工厂名称">
							<p>{{deliveryInfo.shipperName}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
						<el-form-item label="客户名称">
							<p>{{deliveryInfo.consigneeName}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
						<el-form-item label="产品名称">
							<p>{{deliveryInfo.cargoName}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
						<el-form-item label="产品数量">
							<p>{{deliveryInfo.cargoQuantity?deliveryInfo.cargoQuantity+'袋':''}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品重量">
							<p>{{deliveryInfo.cargoWeight?deliveryInfo.cargoWeight+'吨':''}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="监控级别">
                            <p>{{deliveryInfo.level}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车牌号">
                            <p>{{deliveryInfo.plateNo}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出厂时间">
                            <p>{{ moment(deliveryInfo.outTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="校验结果">
                            <p><span v-if="deliveryInfo.verifyFlag=='Y'" stytle="color:#67C23A">已通过</span>
                            <span v-else style="color:#F56C6C">未通过</span></p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据来源">
                            <p>{{deliveryInfo.comeFrom=='TMS'?'手工录入':'DL系统'}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="创建时间">
                            <p>{{ moment(deliveryInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="校验备注">
                            <p>{{deliveryInfo.verifyRemark}}</p>
						</el-form-item>
                    </el-col>
                    <el-col>
						<el-form-item>
							<el-button @click="back">返回</el-button>
							<el-button type="primary" @click="dispatch"  v-if="deliveryInfo.verifyFlag=='N'">生成调度</el-button>
						</el-form-item>
				    </el-col>
                </el-row>
            </el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request, { baseURL } from '../../../common/request'
import { baseMixin } from '../../../common/mixin'
import DeliveryOrder from '../../../api/DeliveryOrder'
import { dispatchConfirm } from '../../../common/utils'
import { Message } from 'element-ui'
export default {

	data() {
		return {
            deliveryInfo:{}
        }
    },
    created() {
		this.getInfo()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.getInfo()
		}
	},
	methods: {
        getInfo() {
			const deliveryOrderID = this.$route.query.deliveryOrderID
			DeliveryOrder.orderDetail({ deliveryOrderID}).then(res => {
				this.deliveryInfo = res
			})
        },
		back() {
            this.$router.push({name:'delivery'})
        },
        dispatch(deliveryOrderID) {
            const deliveryOrderID = this.$route.query.deliveryOrderID
			dispatchConfirm(deliveryOrderID, deliveryOrderIDs => {
				DeliveryOrder.dispatch({ deliveryOrderIDs }).then(res => {
					Message({ 
                        type: 'success', 
                        message: res.data.msg 
                    })
					this.getList()
				}).catch(err => {
                    Message({ 
                        type: 'error', 
                        message: res.data.msg 
                    })
                    this.getList()
                })
			},this.selectedList)
        },
	}
}
</script>
<style lang="stylus" scoped>
.el-form-item__content
    p
        margin 0
        border-bottom 1px solid #dcdfe6
        padding 0 15px
        min-height 32px
        font-family 'sans-serif'
        line-height 32px
        color #999
    .el-input__inner
        vertical-align top
</style>