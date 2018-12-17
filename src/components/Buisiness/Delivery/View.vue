<template>
	<div class="main-content">
		<el-card class="box-card">
            <div slot="header" class="clearfix">交货单详情</div>
            <el-form label-width="120px"  size="small">
                <el-row>
                    <el-col :span="8">
						<el-form-item label="交货单号">
							<p>{{deliveryInfo.companyName}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工厂名称">
							<p>{{deliveryInfo.companyArea}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
						<el-form-item label="客户名称">
							<p>{{deliveryInfo.companyArea}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
						<el-form-item label="产品名称">
							<p>{{deliveryInfo.contactName}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
						<el-form-item label="产品数量">
							<p>{{deliveryInfo.contactPhone}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品重量">
							<p>{{deliveryInfo.code}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="监控级别">
                            <p>{{deliveryInfo.code}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车牌号">
                            <p>{{deliveryInfo.code}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出厂时间">
                            <p>{{deliveryInfo.code}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="校验结果">
                            <p>{{deliveryInfo.code}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据来源">
                            <p>{{deliveryInfo.code}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="创建时间">
                            <p>{{deliveryInfo.code}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="校验备注">
                            <p>{{deliveryInfo.code}}</p>
						</el-form-item>
                    </el-col>
                    <el-col>
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
				    </el-col>
                </el-row>
            </el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
export default {

	data() {
		return {
            deliveryInfo:{}
        }
	},
	methods: {
		back() {
			this.$router.push({name: 'delivery'})
		}
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