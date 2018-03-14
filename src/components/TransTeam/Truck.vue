<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>车辆</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findDeliveryer"></el-input>
					</el-form-item>
                    <el-form-item label="发货地">
						<el-input placeholder="请输入..." v-model="findDeliveryArea"></el-input>
					</el-form-item>
                    <el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findReceiver"></el-input>
					</el-form-item>
                    <el-form-item label="收货地">
						<el-input placeholder="请输入..." v-model="findReceiveArea"></el-input>
					</el-form-item>
                    <el-form-item label="运距">
						<el-input placeholder="请输入..." v-model="findDistance"></el-input>
					</el-form-item>
                    <el-form-item label="对内运价">
						<el-input placeholder="请输入..." v-model="findInnerFreight"></el-input>
					</el-form-item>
                    <el-form-item label="对外运价">
						<el-input placeholder="请输入..." v-model="findExternalFreight"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
            <div class="tableControl">
                <el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
                <el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					border style="width: 100%" size="mini">
                    <el-table-column label="id" fixed type="selection" align="center" width="40"></el-table-column>
                    <el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
					<el-table-column label="所属地区" prop="area"></el-table-column>
					<el-table-column label="所属企业" prop="company"></el-table-column>
					<el-table-column label="自编号" prop="selfNum"></el-table-column>
					<el-table-column label="车牌号" prop="plateNum"></el-table-column>
					<el-table-column label="车牌颜色" prop="plateColor"></el-table-column>
					<el-table-column label="车辆类别" prop="plateType"></el-table-column>
					<el-table-column label="车辆类型" prop="plateClass"></el-table-column>
					<el-table-column label="道路运输证号" prop="roadTransNum"></el-table-column>
					<el-table-column label="经营范围" prop="businessScope"></el-table-column>
                    <el-table-column label="道路运输证年审期至" prop="roadTransYearTo"></el-table-column>
                    <el-table-column label="行驶证审验效期至" prop="driverLicTo"></el-table-column>
                    <el-table-column label="承运人责任险有效期至" prop="carrierValid"></el-table-column>
                    <el-table-column label="等级评定" prop="levelEval" width="100"></el-table-column>
                    <el-table-column label="下次等评日期" prop="nextLevelEvalDate" width="100"></el-table-column>
                    <el-table-column label="二级维护日期" prop="secondMaintainDate" width="100"></el-table-column>
                    <el-table-column label="下次二级维护日期" prop="nextSecondMaintainDate" width="100"></el-table-column>
                    <el-table-column label="载重" prop="load" width="100"></el-table-column>
                    <el-table-column label="罐体类型" prop="tankType" width="100"></el-table-column>
                    <el-table-column label="罐体容积" prop="tankVolume" width="100"></el-table-column>
                    <el-table-column label="罐体检测有效期至" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="安全阀检测有效期至" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="压力表检测有效期至" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="挂车车牌" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="汽车生产厂家" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="品牌型号" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="发动机号" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="车架号" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="行驶证注册日期" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="行驶证发证日期" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="牵引质量" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="车长" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="车宽" prop="externalRecRatio" width="100"></el-table-column>
                    <el-table-column label="车高" prop="externalRecRatio" width="100"></el-table-column>
					<el-table-column label="操作" fixed="right" align="center" width="230">
						<template slot-scope="scope">
                            <el-button size="mini" icon="el-icon-edit" @click="edit">编辑查看</el-button>
                            <el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize">
							<el-option label="10" value="10"></el-option>
							<el-option label="20" value="20"></el-option>
							<el-option label="30" value="30"></el-option>
							<el-option label="40" value="40"></el-option>
							<el-option label="50" value="50"></el-option>
							<el-option label="100" value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
                findDeliveryer: '',
                findDeliveryArea: '',
                findReceiver: '',
                findReceiveArea: '',
                findDistance: '',
                findInnerFreight: '',
                findExternalFreight: '',
				pageIndex: 1,
				pageSize: 10,
                count: 87,
                tabSelected: 'driver',
                tableData: [
                    {
                        "deliveryer": "安化",
                        "deliveryArea": "云南省昆明市",
                        "deliveryAdress": "安化工厂",
                        "receiver": "红河厂",
                        "receiveArea": "云南省红河州蒙自市",
                        "receiveAdress": "蒙自小东山",
                        "innerDistance": "336",
                        "innerFreight": 322.56,
                        "innerTKM": "0.96",
                        "externalDistance": "345",
                        "externalFreight": 393,
                        "externalTKM": "1.14",
                        "innerPayRatio": "月结100%",
                        "externalRecRatio": "回单付100%"
                    },
                ]
			}
        },
		created() {
		},
		methods: {
            reset() {
                this.findDeliveryer = ''
                this.findDeliveryArea = ''
                this.findReceiver = ''
                this.findReceiveArea = ''
                this.findDistance = ''
                this.findInnerFreight = ''
                this.findExternalFreight = ''
            },
			pageChange(index) {
                this.pageIndex = index
            },
            handleTabSelected(tab) {
                console.log(tab.$options.propsData.name)
            },
            add() {
                this.$router.push({name: 'addsettleconfig'})
            },
            edit() {
                this.$router.push({name: 'editsettleconfig'})
            },
            deleteConfirm(i) {
                console.log(i)
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(i, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
		}
	}
</script>
<style lang="stylus" scoped>

</style>