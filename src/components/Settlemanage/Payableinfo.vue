<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>应付明细</span>
			</div>
            <el-tabs v-model="tabSelected" type="card" @tab-click="handleTabSelected">
                <el-tab-pane label="司机" name="driver"></el-tab-pane>
                <el-tab-pane label="随车人员" name="follower"></el-tab-pane>
            </el-tabs>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="司机姓名" v-show="tabSelected == 'driver'">
						<el-input placeholder="请输入..." v-model="findDriver"></el-input>
					</el-form-item>
                    <el-form-item label="随车人员" v-show="tabSelected == 'follower'">
						<el-input placeholder="请输入..." v-model="findFollower"></el-input>
					</el-form-item>
                    <el-form-item label="车牌">
						<el-input placeholder="请输入..." v-model="findTruckCode"></el-input>
					</el-form-item>
                    <el-form-item label="车辆编号">
						<el-input placeholder="请输入..." v-model="findTruckNum"></el-input>
					</el-form-item>
                    <el-form-item label="收货人">
						<el-input placeholder="请输入..." v-model="findReceiver"></el-input>
					</el-form-item>
                    <el-form-item label="地点">
						<el-input placeholder="请输入..." v-model="findAddress"></el-input>
					</el-form-item>
                    <el-form-item label="发货日期">
						<el-date-picker
                            v-model="findConsignDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="selectDateRange">
                        </el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
                <el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
			</div>
			<div class="table">
                <!-- 司机 -->
				<el-table 
                    v-for="(driverItem, index) in driverData" 
                    :key="index + '1'"
                    v-show="tabSelected == 'driver'"
					ref="recTable" 
					:data="driverItem" 
                    show-summary 
                    :summary-method="getSummaries" 
					border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
                    <el-table-column label="驾驶员" prop="driver"></el-table-column>
					<el-table-column label="发货日期" prop="consigneDate"></el-table-column>
					<el-table-column label="发货单号" prop="consigneNum"></el-table-column>
					<el-table-column label="调度单号" prop="controlNum"></el-table-column>
					<el-table-column label="承运单号" prop="carrierNum"></el-table-column>
					<el-table-column label="发货单位" prop="consigneCompany"></el-table-column>
					<el-table-column label="收货单位" prop="receiveCompany"></el-table-column>
					<el-table-column label="派单日期" prop="sendDate"></el-table-column>
					<el-table-column label="签收日期" prop="receiveDate"></el-table-column>
					<el-table-column label="车辆编号" prop="truckNum"></el-table-column>
					<el-table-column label="车牌号码" prop="truckCode"></el-table-column>
					<el-table-column label="核载吨位" prop="loadNum"></el-table-column>
					<el-table-column label="地区" prop="area" width="120"></el-table-column>
					<el-table-column label="地点" prop="address"></el-table-column>
					<el-table-column label="里程" prop="mile"></el-table-column>
                    <el-table-column label="签收货量" prop="receiveNum"></el-table-column>
					<el-table-column label="单价" prop="unitPrice"></el-table-column>
					<el-table-column label="内部运费" prop="innerFreight"></el-table-column>
					<el-table-column label="绕路里程" prop="roundWayMile"></el-table-column>
					<el-table-column label="绕路费用" prop="roundWayFreight"></el-table-column>
					<el-table-column label="其他" prop="other"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="总计" prop="totalNum" align="center" width="120"></el-table-column>
				</el-table>
                <!-- 随车人员 -->
                <el-table 
                    v-for="(followerItem, index) in followerData" 
                    :key="index + '2'"
                    v-show="tabSelected == 'follower'"
					ref="recTable" 
					:data="followerItem" 
                    show-summary 
                    :summary-method="getSummaries" 
					border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
                    <el-table-column label="随车人员" prop="follower"></el-table-column>
                    <el-table-column label="驾驶员" prop="driver"></el-table-column>
					<el-table-column label="发货日期" prop="consigneDate"></el-table-column>
					<el-table-column label="发货单号" prop="consigneNum"></el-table-column>
					<el-table-column label="调度单号" prop="controlNum"></el-table-column>
					<el-table-column label="承运单号" prop="carrierNum"></el-table-column>
					<el-table-column label="发货单位" prop="consigneCompany"></el-table-column>
					<el-table-column label="收货单位" prop="receiveCompany"></el-table-column>
					<el-table-column label="派单日期" prop="sendDate"></el-table-column>
					<el-table-column label="签收日期" prop="receiveDate"></el-table-column>
					<el-table-column label="车辆编号" prop="truckNum"></el-table-column>
					<el-table-column label="车牌号码" prop="truckCode"></el-table-column>
					<el-table-column label="核载吨位" prop="loadNum"></el-table-column>
					<el-table-column label="地区" prop="area" width="120"></el-table-column>
					<el-table-column label="地点" prop="address"></el-table-column>
					<el-table-column label="里程" prop="mile"></el-table-column>
                    <el-table-column label="签收货量" prop="receiveNum"></el-table-column>
					<el-table-column label="内部运费" prop="innerFreight"></el-table-column>
					<el-table-column label="绕路里程" prop="roundWayMile"></el-table-column>
					<el-table-column label="绕路费用" prop="roundWayFreight"></el-table-column>
					<el-table-column label="其他" prop="other"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="总计" prop="totalNum" align="center" width="120"></el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
                findDriver: '',
                findFollower: '',
                findTruckCode: '',
                findTruckNum: '',
                findReceiver: '',
                findAddress: '',
                findConsignDate: [],
                startDate: '',
                endDate: '',
				pageIndex: 1,
				pageSize: 10,
                count: 87,
                tabSelected: 'driver',
                driverData: [
                    [
                        {
                            'consigneDate': '2017-12-21',
                            'consigneNum': '2017110335',
                            'controlNum': '2017120068',
                            'carrierNum': '2017120026',
                            'consigneCompany': '',
                            'receiveCompany': '安宁恒源爆破工程有限公司',
                            'sendDate': '2017-11-25',
                            'receiveDate': '2018-01-24',
                            'truckNum': '5',
                            'truckCode': '云AE0699',
                            'driver': '李金瑞',
                            'loadNum': '9.99',
                            'area': '昆明市',
                            'address': '安宁',
                            'mile': '35',
                            'unitPrice': '1.14TKM',
                            'receiveNum': '9.792吨',
                            'innerFreight': '390.7',
                            'roundWayMile': '0',
                            'roundWayFreight': '0',
                            'other': '0',
                            'remark': '',
                            'totalNum': 390.7
                        },
                        {
                            'consigneDate': '2017-12-21',
                            'consigneNum': '2017110335',
                            'controlNum': '2017120068',
                            'carrierNum': '2017120026',
                            'consigneCompany': '',
                            'receiveCompany': '安宁恒源爆破工程有限公司',
                            'sendDate': '2017-11-25',
                            'receiveDate': '2018-01-24',
                            'truckNum': '5',
                            'truckCode': '云AE0699',
                            'driver': '李金瑞',
                            'loadNum': '9.99',
                            'area': '昆明市',
                            'address': '安宁',
                            'mile': '35',
                            'unitPrice': '1.14TKM',
                            'receiveNum': '9.792吨',
                            'innerFreight': '390.7',
                            'roundWayMile': '0',
                            'roundWayFreight': '0',
                            'other': '0',
                            'remark': '',
                            'totalNum': 390.7
                        }
                    ],
                    [
                        {
                            'consigneDate': '2017-12-21',
                            'consigneNum': '2017110335',
                            'controlNum': '2017120068',
                            'carrierNum': '2017120026',
                            'consigneCompany': '',
                            'receiveCompany': '安宁恒源爆破工程有限公司',
                            'sendDate': '2017-11-25',
                            'receiveDate': '2018-01-24',
                            'truckNum': '5',
                            'truckCode': '云AE0699',
                            'driver': '苏明',
                            'loadNum': '9.99',
                            'area': '昆明市',
                            'address': '安宁',
                            'mile': '35',
                            'unitPrice': '1.14TKM',
                            'receiveNum': '9.792吨',
                            'innerFreight': '390.7',
                            'roundWayMile': '0',
                            'roundWayFreight': '0',
                            'other': '0',
                            'remark': '',
                            'totalNum': 390.7
                        },
                        {
                            'consigneDate': '2017-12-21',
                            'consigneNum': '2017110335',
                            'controlNum': '2017120068',
                            'carrierNum': '2017120026',
                            'consigneCompany': '',
                            'receiveCompany': '安宁恒源爆破工程有限公司',
                            'sendDate': '2017-11-25',
                            'receiveDate': '2018-01-24',
                            'truckNum': '5',
                            'truckCode': '云AE0699',
                            'driver': '苏明',
                            'loadNum': '9.99',
                            'area': '昆明市',
                            'address': '安宁',
                            'mile': '35',
                            'unitPrice': '1.14TKM',
                            'receiveNum': '9.792吨',
                            'innerFreight': '390.7',
                            'roundWayMile': '0',
                            'roundWayFreight': '0',
                            'other': '0',
                            'remark': '',
                            'totalNum': 390.7
                        }
                    ]
                ],
                followerData: [
                    [
                        {
                            'consigneDate': '2017-12-21',
                            'consigneNum': '2017110335',
                            'controlNum': '2017120068',
                            'carrierNum': '2017120026',
                            'consigneCompany': '',
                            'receiveCompany': '安宁恒源爆破工程有限公司',
                            'sendDate': '2017-11-25',
                            'receiveDate': '2018-01-24',
                            'truckNum': '5',
                            'truckCode': '云AE0699',
                            'follower': '李押运',
                            'driver': '李金瑞',
                            'loadNum': '9.99',
                            'area': '昆明市',
                            'address': '安宁',
                            'mile': '35',
                            'unitPrice': '1.14TKM',
                            'receiveNum': '9.792吨',
                            'innerFreight': '390.7',
                            'roundWayMile': '0',
                            'roundWayFreight': '0',
                            'other': '0',
                            'remark': '',
                            'totalNum': 390.7
                        },
                        {
                            'consigneDate': '2017-12-21',
                            'consigneNum': '2017110335',
                            'controlNum': '2017120068',
                            'carrierNum': '2017120026',
                            'consigneCompany': '',
                            'receiveCompany': '安宁恒源爆破工程有限公司',
                            'sendDate': '2017-11-25',
                            'receiveDate': '2018-01-24',
                            'truckNum': '5',
                            'truckCode': '云AE0699',
                            'follower': '李押运',
                            'driver': '李金瑞',
                            'loadNum': '9.99',
                            'area': '昆明市',
                            'address': '安宁',
                            'mile': '35',
                            'unitPrice': '1.14TKM',
                            'receiveNum': '9.792吨',
                            'innerFreight': '390.7',
                            'roundWayMile': '0',
                            'roundWayFreight': '0',
                            'other': '0',
                            'remark': '',
                            'totalNum': 390.7
                        }
                    ],
                    [
                        {
                            'consigneDate': '2017-12-21',
                            'consigneNum': '2017110335',
                            'controlNum': '2017120068',
                            'carrierNum': '2017120026',
                            'consigneCompany': '',
                            'receiveCompany': '安宁恒源爆破工程有限公司',
                            'sendDate': '2017-11-25',
                            'receiveDate': '2018-01-24',
                            'truckNum': '5',
                            'truckCode': '云AE0699',
                            'follower': '王押运',
                            'driver': '苏明',
                            'loadNum': '9.99',
                            'area': '昆明市',
                            'address': '安宁',
                            'mile': '35',
                            'unitPrice': '1.14TKM',
                            'receiveNum': '9.792吨',
                            'innerFreight': '390.7',
                            'roundWayMile': '0',
                            'roundWayFreight': '0',
                            'other': '0',
                            'remark': '',
                            'totalNum': 390.7
                        },
                        {
                            'consigneDate': '2017-12-21',
                            'consigneNum': '2017110335',
                            'controlNum': '2017120068',
                            'carrierNum': '2017120026',
                            'consigneCompany': '',
                            'receiveCompany': '安宁恒源爆破工程有限公司',
                            'sendDate': '2017-11-25',
                            'receiveDate': '2018-01-24',
                            'truckNum': '5',
                            'truckCode': '云AE0699',
                            'follower': '王押运',
                            'driver': '苏明',
                            'loadNum': '9.99',
                            'area': '昆明市',
                            'address': '安宁',
                            'mile': '35',
                            'unitPrice': '1.14TKM',
                            'receiveNum': '9.792吨',
                            'innerFreight': '390.7',
                            'roundWayMile': '0',
                            'roundWayFreight': '0',
                            'other': '0',
                            'remark': '',
                            'totalNum': 390.7
                        }
                    ]
                ]
			}
        },
		created() {
		},
		methods: {
            reset() {
                this.findDriver = ''
                this.findFollower = ''
                this.findTruckCode = ''
                this.findTruckNum = ''
                this.findReceiver = ''
                this.findAddress = ''
                this.findConsignDate = []
                this.startDate = ''
                this.endDate = ''
            },
			pageChange(index) {
                this.pageIndex = index
            },
            selectDateRange(date) {
                this.startDate = new Date(date[0]).getTime()
                this.endDate = new Date(date[1]).getTime()
            },
            handleTabSelected(tab) {
                console.log(tab.$options.propsData.name)
            }
		}
	}
</script>
<style lang="stylus" scoped>

</style>