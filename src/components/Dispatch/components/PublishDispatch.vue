<template>
    <el-dialog title="发布派车单" :visible.sync="DispatchOrderDialog" custom-class="DispatchOrderDialog" top="5vh" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form size="small">
            <el-row class="baseInfo">
                <p>总配载：<span class="tag">数</span><span class="num">1200</span><span class="tag">重</span><span class="num">30</span><span class="tag">体</span><span class="num">18</span></p>
                <p><b>3</b>装<b>3</b>卸  预计总里程<b>160</b>公里</p>
            </el-row>
            <el-row>
                <table class="dialogTable">
                    <caption>车辆人员</caption>
                    <thead>
                        <tr>
                            <th>车辆</th>
                            <th>驾驶员</th>
                            <th>随行人员</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td align="center"><span class="addbtn">+ 添加车辆</span></td>
                            <td align="center"><span class="addbtn">+ 添加驾驶员</span></td>
                            <td align="center"><span class="addbtn">+ 添加随行人员</span></td>
                        </tr>
                    </tbody>
                </table>
            </el-row>
            <el-row>
                <table class="dialogTable">
                    <caption>任务运费&支付方式</caption>
                    <thead>
                        <tr>
                            <th>费用科目</th>
                            <th>费用类型</th>
                            <th>收款人</th>
                            <th>支付方式</th>
                            <th>金额</th>
                            <th><span class="addbtn">+ 添加费用</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td align="center"></td>
                            <td align="center"></td>
                            <td align="center"></td>
                            <td align="center"></td>
                            <td align="center"></td>
                            <td align="center"><span class="delbtn">删除</span></td>
                        </tr>
                    </tbody>
                </table>
            </el-row>
            <el-row>
                <p class="totalFrete">总运费：30000.00元</p>
            </el-row>
            <el-row>
                <el-form-item label="接单截止时间">
                    <el-date-picker type="date" :clearable="false" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
            </el-row>
            <el-row style="margin-top:20px">
                <el-col :span="24">
                    <el-form-item label-width="0" class="text-center">
                        <el-button @click="cancelDispatchOrder">取消</el-button>
                        <el-button type="primary">保存</el-button>
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

</style>

