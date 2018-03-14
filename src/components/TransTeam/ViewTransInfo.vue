<template>
	<div class="main-content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
				<span>运输档案详情</span>
			</div>
            <el-tabs v-model="tabSelected" type="card">
                <el-tab-pane label="危货运输登记表" name="first">
                    <h2 class="text-center">昆明市危货运输户籍化管理登记表</h2>
                    <table class="common-table" style="width: 800px; margin: 0 auto">
                        <tr>
                            <td rowspan="2" width="30">车辆基础信息</td>
                            <td>车牌号码</td>
                            <td>云AE0969</td>
                            <td>厂牌型号</td>
                            <td width="120">希尔牌ZZT5166XQY</td>
                            <td width="50">核载人数</td>
                            <td width="50">3人</td>
                        </tr>
                        <tr>
                            <td width="90">注册登记日期</td>
                            <td>2013-03-22</td>
                            <td>检验有效期止</td>
                            <td width="120">2016-03-21</td>
                            <td width="50">车身颜色</td>
                            <td width="50">蓝/白</td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="运输单位备案" name="second">运输单位备案</el-tab-pane>
            </el-tabs>
        </el-card>
	</div>
</template>
<script type="text/javascript">
	export default {
        data() {
            return {
                tabSelected: 'first'
            }
        },
		methods: {
        }
	}
</script>
<style lang="stylus" scoped>
	
</style>