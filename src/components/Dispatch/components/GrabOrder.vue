<template>
    <el-dialog title="发布抢单" :visible.sync="OrderDialog" custom-class="OrderDialog" top="5vh" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form size="small" :inline="true">
            <el-row class="baseInfo">
                <p>总配载：<span class="tag">数</span><span class="num">1200</span><span class="tag">重</span><span class="num">30</span><span class="tag">体</span><span class="num">18</span></p>
                <p><b>3</b>装<b>3</b>卸  预计总里程<b>160</b>公里</p>
            </el-row>
            <el-row>
                <div class="section-title">用车需求</div>
                <el-form-item label="车型">
                    <el-select placeholder="请选择车型">
                        <el-option value="车型1" label="车型1">车型1</el-option>
                        <el-option value="车型2" label="车型2">车型2</el-option>
                        <el-option value="车型3" label="车型3">车型3</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车长">
                    <el-input placeholder="请输入车长"><template slot="append">米</template></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="报价类型">
                    <el-radio-group>
                        <el-radio label="司机报价"></el-radio>
                        <el-radio label="定价抢单"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="一口价金额">
                    <el-input placeholder="请输入金额"><template slot="append">元</template></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="运费支付方式">
                    <el-radio-group>
                        <el-radio label="预付"></el-radio>
                        <el-radio label="到付"></el-radio>
                        <el-radio label="收货方付"></el-radio>
                        <el-radio label="回单付"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="接单截止时间">
                    <el-date-picker type="date" :clearable="false" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
            </el-row>
            <el-row style="margin-top:20px" class="text-center">
                <el-col :span="24">
                    <el-form-item>
                        <el-button @click="cancelOrder" size="small">取消</el-button>
                        <el-button type="primary" @click="saveOrder" size="small">保存</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="stylus" scoped>
.DispatchOrderDialog
.OrderDialog
	.baseInfo
		p
			color #409EFF
			span
				margin-right 20px
				&.tag
					color #fff
					background #409EFF
					font-size 12px
					height 18px
					width 18px
					line-height 18px
					text-align center
					display inline-block
					border-radius 4px
					margin-right 5px
			b
				padding 0 2px
	.section-title
		height 40px
		line-height 40px
		border-bottom 1px solid #f2f2f2
		margin-bottom 20px
.dialogTable
	font-size 14px
	background #dcdfe6
	border-spacing 1px
	width 100%
	caption
		height 40px
		line-height 40px
		text-align left
		
	th
		background #f2f2f2
		color #666
		padding 10px 15px
	td
		padding 10px 15px
		background #fff
	.addbtn
	.delbtn
		color #409EFF
		cursor pointer
</style>
