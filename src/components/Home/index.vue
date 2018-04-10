<template>
	<div class="main-content">
		<!-- <el-row :gutter="20">
			<el-col :span="12">
				<div class="wf-card dashboardItem">
					<div class="header clearfix">
						<el-badge :value="200" :max="99" class="item"><span>待处理运单</span></el-badge>
						<router-link tag="a" class="more" :to="{name: 'carrierbills'}">查看更多</router-link>
					</div>
					<div class="table">
						<el-table :data="tableData" border style="width: 100%" size="mini">
							<el-table-column label="承运单号" prop="CarrierNum" width="100" align="center" fixed>
								<template slot-scope="scope">
									<span style="color:#409EFF;cursor:pointer" @click="ViewCarrierbill(scope.row.CarrierNum)">{{scope.row.CarrierNum}}</span>
								</template>
							</el-table-column>
							<el-table-column label="收货单位" prop="ConsigneeCompany">
							</el-table-column>
							<el-table-column label="卸货地" prop="Discharge">
							</el-table-column>
							<el-table-column label="收货人" prop="Consignee">
							</el-table-column>
							<el-table-column label="到货时间" prop="ArrivalDate" width="120" align="center">
							</el-table-column>
							<el-table-column label="货物规格/货物名称" prop="CargoName">
							</el-table-column>
							<el-table-column label="货物总量" prop="CargoTotal">
							</el-table-column>
							<el-table-column label="发货单位" prop="ConsignerCompany">
							</el-table-column>
							<el-table-column label="发货时间" prop="DeliveryDate" width="120" align="center">
							</el-table-column>
							<el-table-column label="发货人" prop="Consigner">
							</el-table-column>
							<el-table-column label="发货地" prop="Dispatch">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="wf-card dashboardItem">
					<div class="header clearfix">
						<el-badge :value="200" :max="99" class="item"><span>运输中</span></el-badge>
						<router-link tag="a" class="more" :to="{name: 'carrierbills'}">查看更多</router-link>
					</div>
					<div class="table">
						<el-table :data="tableData1" border style="width: 100%" size="mini">
							<el-table-column label="调度单号" prop="ControlsNum" width="130" align="center">
								<template slot-scope="scope">
									<span style="color:#409EFF;cursor:pointer" @click="ViewDispatchBill(scope.row.ControlsNum)">{{scope.row.ControlsNum}}</span>
								</template>
							</el-table-column>
							<el-table-column label="车辆号牌" prop="VehicleNum" width="110" align="center">
							</el-table-column>
							<el-table-column label="配载量" prop="LoadingQuantity" align="center">
							</el-table-column>
							<el-table-column label="司机" prop="Driver" width="100" align="center">
							</el-table-column>
							<el-table-column label="调度状态" prop="Status" width="100" align="center">
							</el-table-column>
							<el-table-column label="随车人员" prop="ApplianceCrew" width="120" align="center">
							</el-table-column>
							<el-table-column label="订单号" prop="OrderNum" width="130" align="center">
							</el-table-column>
							<el-table-column label="发货地" prop="Dispatch">
							</el-table-column>
							<el-table-column label="收货地" prop="Discharge">
							</el-table-column>
							<el-table-column label="到货时间" prop="ArrivalDate" width="130" align="center">
							</el-table-column>
							<el-table-column label="货物规格/名称" prop="CargoName">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="wf-card dashboardItem">
					<div class="header clearfix">
						<el-badge :value="200" :max="99" class="item"><span>可用车辆</span></el-badge>
						<router-link tag="a" class="more" :to="{name: 'truck'}">查看更多</router-link>
					</div>
					<div class="table">
						<el-table :data="tableData2" border style="width: 100%" size="mini">
							<el-table-column label="自编号" prop="selfNum" fixed width="60" align="center">
								<template slot-scope="scope">
									<span style="color:#409EFF;cursor:pointer" @click="ViewTruck(scope.row.selfNum)">{{scope.row.selfNum}}</span>
								</template>
							</el-table-column>
							<el-table-column label="所属地区" prop="area"></el-table-column>
							<el-table-column label="所属企业" prop="company"></el-table-column>
							<el-table-column label="车牌号" prop="plateNum"></el-table-column>
							<el-table-column label="车牌颜色" prop="plateColor"></el-table-column>
							<el-table-column label="车辆类别" prop="plateType"></el-table-column>
							<el-table-column label="车辆类型" prop="plateClass"></el-table-column>
							<el-table-column label="道路运输证号" prop="roadTransNum" width="120"></el-table-column>
							<el-table-column label="经营范围" prop="businessScope"></el-table-column>
							<el-table-column label="道路运输证年审期至" prop="roadTransYearTo" width="140"></el-table-column>
							<el-table-column label="行驶证审验效期至" prop="driverLicTo" width="140"></el-table-column>
							<el-table-column label="承运人责任险有效期至" prop="carrierValid" width="150"></el-table-column>
							<el-table-column label="等级评定" prop="levelEval" width="100"></el-table-column>
							<el-table-column label="下次等评日期" prop="nextLevelEvalDate" width="100"></el-table-column>
							<el-table-column label="二级维护日期" prop="secondMaintainDate" width="100"></el-table-column>
							<el-table-column label="下次二级维护日期" prop="nextSecondMaintainDate" width="140"></el-table-column>
							<el-table-column label="载重" prop="load" width="100"></el-table-column>
							<el-table-column label="罐体类型" prop="tankType" width="100"></el-table-column>
							<el-table-column label="罐体容积" prop="tankVolume" width="100"></el-table-column>
							<el-table-column label="罐体检测有效期至" prop="tankTestValidTo" width="140"></el-table-column>
							<el-table-column label="安全阀检测有效期至" prop="safetyTestValidTo" width="140"></el-table-column>
							<el-table-column label="压力表检测有效期至" prop="pressureTestValidTo" width="140"></el-table-column>
							<el-table-column label="挂车车牌" prop="trailerPlate" width="100"></el-table-column>
							<el-table-column label="汽车生产厂家" prop="truckManufacturer" width="100"></el-table-column>
							<el-table-column label="品牌型号" prop="brandModel" width="100"></el-table-column>
							<el-table-column label="发动机号" prop="engineNum" width="100"></el-table-column>
							<el-table-column label="车架号" prop="frameNum" width="100"></el-table-column>
							<el-table-column label="行驶证注册日期" prop="driverLicRgDate" width="100"></el-table-column>
							<el-table-column label="行驶证发证日期" prop="driverLicAwDate" width="100"></el-table-column>
							<el-table-column label="牵引质量" prop="towMass" width="100"></el-table-column>
							<el-table-column label="车长" prop="truckLength" width="100"></el-table-column>
							<el-table-column label="车宽" prop="truckWidth" width="100"></el-table-column>
							<el-table-column label="车高" prop="truckHeight" width="100"></el-table-column>
							<el-table-column label="添加时间" prop="createTime" width="140"></el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="wf-card dashboardItem">
					<div class="header clearfix">
						<el-badge :value="200" :max="99" class="item"><span>可用人员</span></el-badge>
						<router-link tag="a" class="more" :to="{name: 'person'}">查看更多</router-link>
					</div>
					<div class="table">
						<el-table :data="tableData3" border style="width: 100%" size="mini">
							<el-table-column label="姓名" prop="name" fixed>
								<template slot-scope="scope">
									<span style="color:#409EFF;cursor:pointer" @click="ViewPerson(scope.row.cardId)">{{scope.row.name}}</span>
								</template>
							</el-table-column>
							<el-table-column label="性别" prop="sex" width="50" align="center"></el-table-column>
							<el-table-column label="聘用岗位" prop="post" width="100"></el-table-column>
							<el-table-column label="身份证号" prop="cardId" width="160"></el-table-column>
							<el-table-column label="创建人" prop="creater"></el-table-column>
							<el-table-column label="状态" prop="status"></el-table-column>
							<el-table-column label="审核人" prop="auditor"></el-table-column>
							<el-table-column label="审核日期" prop="auditDate" width="140"></el-table-column>
							<el-table-column label="准驾车型" prop="quasiDrivingModel"></el-table-column>
							<el-table-column label="驾驶证审验有效期至" prop="driverLicTo" width="140"></el-table-column>
							<el-table-column label="从业资格证件号" prop="qualifCerNum" width="160"></el-table-column>
							<el-table-column label="从业资格类别" prop="qualifCerType" width="150"></el-table-column>
							<el-table-column label="从业资格证有效期至" prop="qualifCerValidTo" width="140"></el-table-column>
							<el-table-column label="初次发证件时间" prop="initCerDate" width="140"></el-table-column>
							<el-table-column label="诚信考核等级" prop="integrityLevel" width="100"></el-table-column>
							<el-table-column label="诚信考核有效期至" prop="integrityValidTo" width="140"></el-table-column>
							<el-table-column label="合同有效期起" prop="contractValidFrom" width="140"></el-table-column>
							<el-table-column label="合同有效期至" prop="contractValidTo" width="140"></el-table-column>
							<el-table-column label="职称或技术等级" prop="techLevel" width="120"></el-table-column>
							<el-table-column label="联系电话" prop="mobile" width="100"></el-table-column>
							<el-table-column label="家庭地址" prop="familyAddress" width="140"></el-table-column>
							<el-table-column label="备注说明" prop="remark" width="140"></el-table-column>
							<el-table-column label="添加时间" prop="createTime" width="140"></el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>
		</el-row> -->
	</div>
</template>
<script type="text/javascript">
export default {
	name: 'home',
	data() {
		return {
			tableData: [{
					Status: '待执行',
					CarrierNum: '20180205001',
					ConsigneeCompany: '云南磷化',
					Discharge: '云南省昭通市镇远县城李家沟',
					Consignee: '磷化',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9.76吨/10方',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018-02-06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName: 'R72/炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205002',
					ConsigneeCompany: '四川铁建',
					Discharge: '云南省红河州个旧市金湖广场',
					Consignee: '铁建',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName: 'R11炸药、R33硝酸'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205003',
					ConsigneeCompany: '昆钢鑫龙',
					Discharge: '尖山',
					Consignee: '刘备',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '330吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName: '炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205004',
					ConsigneeCompany: '云南磷化',
					Discharge: '云南省昭通市镇远县城李家沟',
					Consignee: '磷化',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9.76吨/10方',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018-02-06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName: 'R72/炸药'
				},
				{
					Status: '待执行',
					CarrierNum: '20180205005',
					ConsigneeCompany: '四川铁建',
					Discharge: '云南省红河州个旧市金湖广场',
					Consignee: '铁建',
					ArrivalDate: '2018:02:06 18:00',
					CargoTotal: '9吨',
					ConsignerCompany: '安宁~~化工厂',
					DeliveryDate: '2018:02:06 18:00',
					Consigner: '李铁军',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					CargoName: 'R11炸药、R33硝酸'
				}
			],
			tableData1: [{
					ControlsNum: '20180205001-1',
					VehicleNum: '云AG3365',
					LoadingQuantity: '9.76吨',
					Driver: '李铁军',
					Status: '待执行',
					ApplianceCrew: '赵押运员',
					OrderNum: '20180205001',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					Discharge: '云南省昭通市镇远县城李家沟',
					ArrivalDate: '2018:02:06 18:00',
					CargoName: 'R72/炸药'
				},
				{
					ControlsNum: '20180205001-2',
					VehicleNum: '云AG3365',
					LoadingQuantity: '9.76吨',
					Driver: '李铁军',
					Status: '待执行',
					ApplianceCrew: '赵押运员',
					OrderNum: '20180205001',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					Discharge: '云南省昭通市镇远县城李家沟',
					ArrivalDate: '2018:02:06 18:00',
					CargoName: 'R72/炸药'
				},
				{
					ControlsNum: '20180205001-3',
					VehicleNum: '云AG3365',
					LoadingQuantity: '9.76吨',
					Driver: '李铁军',
					Status: '已装运',
					ApplianceCrew: '赵押运员',
					OrderNum: '20180205001',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					Discharge: '云南省昭通市镇远县城李家沟',
					ArrivalDate: '2018:02:06 18:00',
					CargoName: 'R72/炸药'
				},
				{
					ControlsNum: '20180205001-4',
					VehicleNum: '云AG3365',
					LoadingQuantity: '9.76吨',
					Driver: '李铁军',
					Status: '待执行',
					ApplianceCrew: '赵押运员',
					OrderNum: '20180205001',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					Discharge: '云南省昭通市镇远县城李家沟',
					ArrivalDate: '2018:02:06 18:00',
					CargoName: 'R72/炸药'
				},
				{
					ControlsNum: '20180205001-5',
					VehicleNum: '云AG3365',
					LoadingQuantity: '9.76吨',
					Driver: '李铁军',
					Status: '已签收',
					ApplianceCrew: '赵押运员',
					OrderNum: '20180205001',
					Dispatch: '云南省昆明市安宁市区山顶上化工厂',
					Discharge: '云南省昭通市镇远县城李家沟',
					ArrivalDate: '2018:02:06 18:00',
					CargoName: 'R72/炸药'
				}
			],
			tableData2: [
					{
						"area": "安宁市",
						"company": "云南安化中达物流有限责任公司",
						"selfNum": "6-1",
						"plateNum": "云AD3875",
						"plateColor": "黄",
						"plateType": "牵引车",
						"plateClass": "重型半挂牵引车",
						"roadTransNum": "530181012183",
						"businessScope": "危险货物运输(5类1项)",
						"roadTransYearTo": "2018年6月30日",
						"driverLicTo": "2018年8月31日",
						"carrierValid": "2018年8月13日",
						"levelEval": "一级",
						"nextLevelEvalDate": "2018年7月27日",
						"secondMaintainDate": "2017年11月9日",
						"nextSecondMaintainDate": "2018年3月31日",
						"load": "40000.000",
						"tankType": "",
						"tankVolume": "",
						"tankTestValidTo": "",
						"safetyTestValidTo": "",
						"pressureTestValidTo": "",
						"trailerPlate": "云A3229挂",
						"truckManufacturer": "东风汽车有限公司",
						"brandModel": "东风牌DFL4251A10",
						"engineNum": "",
						"frameNum": "",
						"driverLicRgDate": "2012年8月7日",
						"driverLicAwDate": "2012年8月7日",
						"towMass": "25000",
						"truckLength": "6810",
						"truckWidth": "2500",
						"truckHeight": "3700",
						"createTime": "2018-03-01 17:41"
					},
					{
						"area": "安宁市",
						"company": "云南安化中达物流有限责任公司",
						"selfNum": "6-1",
						"plateNum": "云AD3875",
						"plateColor": "黄",
						"plateType": "牵引车",
						"plateClass": "重型半挂牵引车",
						"roadTransNum": "530181012183",
						"businessScope": "危险货物运输(5类1项)",
						"roadTransYearTo": "2018年6月30日",
						"driverLicTo": "2018年8月31日",
						"carrierValid": "2018年8月13日",
						"levelEval": "一级",
						"nextLevelEvalDate": "2018年7月27日",
						"secondMaintainDate": "2017年11月9日",
						"nextSecondMaintainDate": "2018年3月31日",
						"load": "40000.000",
						"tankType": "",
						"tankVolume": "",
						"tankTestValidTo": "",
						"safetyTestValidTo": "",
						"pressureTestValidTo": "",
						"trailerPlate": "云A3229挂",
						"truckManufacturer": "东风汽车有限公司",
						"brandModel": "东风牌DFL4251A10",
						"engineNum": "",
						"frameNum": "",
						"driverLicRgDate": "2012年8月7日",
						"driverLicAwDate": "2012年8月7日",
						"towMass": "25000",
						"truckLength": "6810",
						"truckWidth": "2500",
						"truckHeight": "3700",
						"createTime": "2018-03-01 17:41"
					},
					{
						"area": "安宁市",
						"company": "云南安化中达物流有限责任公司",
						"selfNum": "6-1",
						"plateNum": "云AD3875",
						"plateColor": "黄",
						"plateType": "牵引车",
						"plateClass": "重型半挂牵引车",
						"roadTransNum": "530181012183",
						"businessScope": "危险货物运输(5类1项)",
						"roadTransYearTo": "2018年6月30日",
						"driverLicTo": "2018年8月31日",
						"carrierValid": "2018年8月13日",
						"levelEval": "一级",
						"nextLevelEvalDate": "2018年7月27日",
						"secondMaintainDate": "2017年11月9日",
						"nextSecondMaintainDate": "2018年3月31日",
						"load": "40000.000",
						"tankType": "",
						"tankVolume": "",
						"tankTestValidTo": "",
						"safetyTestValidTo": "",
						"pressureTestValidTo": "",
						"trailerPlate": "云A3229挂",
						"truckManufacturer": "东风汽车有限公司",
						"brandModel": "东风牌DFL4251A10",
						"engineNum": "",
						"frameNum": "",
						"driverLicRgDate": "2012年8月7日",
						"driverLicAwDate": "2012年8月7日",
						"towMass": "25000",
						"truckLength": "6810",
						"truckWidth": "2500",
						"truckHeight": "3700",
						"createTime": "2018-03-01 17:41"
					},
					{
						"area": "安宁市",
						"company": "云南安化中达物流有限责任公司",
						"selfNum": "6-1",
						"plateNum": "云AD3875",
						"plateColor": "黄",
						"plateType": "牵引车",
						"plateClass": "重型半挂牵引车",
						"roadTransNum": "530181012183",
						"businessScope": "危险货物运输(5类1项)",
						"roadTransYearTo": "2018年6月30日",
						"driverLicTo": "2018年8月31日",
						"carrierValid": "2018年8月13日",
						"levelEval": "一级",
						"nextLevelEvalDate": "2018年7月27日",
						"secondMaintainDate": "2017年11月9日",
						"nextSecondMaintainDate": "2018年3月31日",
						"load": "40000.000",
						"tankType": "",
						"tankVolume": "",
						"tankTestValidTo": "",
						"safetyTestValidTo": "",
						"pressureTestValidTo": "",
						"trailerPlate": "云A3229挂",
						"truckManufacturer": "东风汽车有限公司",
						"brandModel": "东风牌DFL4251A10",
						"engineNum": "",
						"frameNum": "",
						"driverLicRgDate": "2012年8月7日",
						"driverLicAwDate": "2012年8月7日",
						"towMass": "25000",
						"truckLength": "6810",
						"truckWidth": "2500",
						"truckHeight": "3700",
						"createTime": "2018-03-01 17:41"
					},
					{
						"area": "安宁市",
						"company": "云南安化中达物流有限责任公司",
						"selfNum": "6-1",
						"plateNum": "云AD3875",
						"plateColor": "黄",
						"plateType": "牵引车",
						"plateClass": "重型半挂牵引车",
						"roadTransNum": "530181012183",
						"businessScope": "危险货物运输(5类1项)",
						"roadTransYearTo": "2018年6月30日",
						"driverLicTo": "2018年8月31日",
						"carrierValid": "2018年8月13日",
						"levelEval": "一级",
						"nextLevelEvalDate": "2018年7月27日",
						"secondMaintainDate": "2017年11月9日",
						"nextSecondMaintainDate": "2018年3月31日",
						"load": "40000.000",
						"tankType": "",
						"tankVolume": "",
						"tankTestValidTo": "",
						"safetyTestValidTo": "",
						"pressureTestValidTo": "",
						"trailerPlate": "云A3229挂",
						"truckManufacturer": "东风汽车有限公司",
						"brandModel": "东风牌DFL4251A10",
						"engineNum": "",
						"frameNum": "",
						"driverLicRgDate": "2012年8月7日",
						"driverLicAwDate": "2012年8月7日",
						"towMass": "25000",
						"truckLength": "6810",
						"truckWidth": "2500",
						"truckHeight": "3700",
						"createTime": "2018-03-01 17:41"
					},
				],
			tableData3: [{
					"name": "刘贵权",
					"sex": "男",
					"post": "押运员",
					"cardId": "530128197203081814",
					"creater": "胡大江",
					"status": "审核通过",
					"auditor": "李华",
					"auditDate": "2017-04-27 10:20:25",
					"quasiDrivingModel": "A2",
					"driverLicTo": "2018-05-31 00:00:00",
					"qualifCerNum": "530128197203081814",
					"qualifCerType": "道路危险货物运输押运人员;爆炸品道路运输押运员",
					"qualifCerValidTo": "2022-07-20 00:00:00",
					"initCerDate": "2014-12-24 00:00:00",
					"integrityLevel": "AA级",
					"integrityValidTo": "2018-04-30 00:00:00",
					"contractValidFrom": "2015-01-16 00:00:00",
					"contractValidTo": "2018-12-31 00:00:00",
					"techLevel": "无",
					"mobile": "13700631861",
					"familyAddress": "安宁市太平镇西仪村",
					"remark": "7液硝",
					"createTime": "2018-03-01 17:41"
				},
				{
					"name": "陈宇",
					"sex": "男",
					"post": "操作员;押运员",
					"cardId": "530128197203081814",
					"creater": "胡大江",
					"status": "审核通过",
					"auditor": "李华",
					"auditDate": "2017-04-27 10:20:25",
					"quasiDrivingModel": "A2",
					"driverLicTo": "2018-05-31 00:00:00",
					"qualifCerNum": "530128197203081814",
					"qualifCerType": "道路危险货物运输押运人员;爆炸品道路运输押运员",
					"qualifCerValidTo": "2022-07-20 00:00:00",
					"initCerDate": "2014-12-24 00:00:00",
					"integrityLevel": "AA级",
					"integrityValidTo": "2018-04-30 00:00:00",
					"contractValidFrom": "2015-01-16 00:00:00",
					"contractValidTo": "2018-12-31 00:00:00",
					"techLevel": "无",
					"mobile": "13700631861",
					"familyAddress": "安宁市太平镇西仪村",
					"remark": "7液硝",
					"createTime": "2018-03-01 17:41"
				},
				{
					"name": "郜培志",
					"sex": "男",
					"post": "驾驶员",
					"cardId": "530128197203081814",
					"creater": "张金元",
					"status": "审核通过",
					"auditor": "李华",
					"auditDate": "2017-04-27 10:20:25",
					"quasiDrivingModel": "A2",
					"driverLicTo": "2018-05-31 00:00:00",
					"qualifCerNum": "530128197203081814",
					"qualifCerType": "道路危险货物运输押运人员;爆炸品道路运输押运员",
					"qualifCerValidTo": "2022-07-20 00:00:00",
					"initCerDate": "2014-12-24 00:00:00",
					"integrityLevel": "AA级",
					"integrityValidTo": "2018-04-30 00:00:00",
					"contractValidFrom": "2015-01-16 00:00:00",
					"contractValidTo": "2018-12-31 00:00:00",
					"techLevel": "无",
					"mobile": "13700631861",
					"familyAddress": "安宁市太平镇西仪村",
					"remark": "7液硝",
					"createTime": "2018-03-01 17:41"
				},
				{
					"name": "贾坤",
					"sex": "女",
					"post": "操作员;押运员",
					"cardId": "530128197203081814",
					"creater": "胡大江",
					"status": "审核通过",
					"auditor": "李华",
					"auditDate": "2017-04-27 10:20:25",
					"quasiDrivingModel": "A2",
					"driverLicTo": "2018-05-31 00:00:00",
					"qualifCerNum": "530128197203081814",
					"qualifCerType": "道路危险货物运输押运人员;爆炸品道路运输押运员",
					"qualifCerValidTo": "2022-07-20 00:00:00",
					"initCerDate": "2014-12-24 00:00:00",
					"integrityLevel": "AA级",
					"integrityValidTo": "2018-04-30 00:00:00",
					"contractValidFrom": "2015-01-16 00:00:00",
					"contractValidTo": "2018-12-31 00:00:00",
					"techLevel": "无",
					"mobile": "13700631861",
					"familyAddress": "安宁市太平镇西仪村",
					"remark": "7液硝",
					"createTime": "2018-03-01 17:41"
				},
				{
					"name": "贾小坤",
					"sex": "男",
					"post": "驾驶员",
					"cardId": "530128197203081814",
					"creater": "张金元",
					"status": "审核通过",
					"auditor": "李华",
					"auditDate": "2017-04-27 10:20:25",
					"quasiDrivingModel": "A2",
					"driverLicTo": "2018-05-31 00:00:00",
					"qualifCerNum": "530128197203081814",
					"qualifCerType": "道路危险货物运输押运人员;爆炸品道路运输押运员",
					"qualifCerValidTo": "2022-07-20 00:00:00",
					"initCerDate": "2014-12-24 00:00:00",
					"integrityLevel": "AA级",
					"integrityValidTo": "2018-04-30 00:00:00",
					"contractValidFrom": "2015-01-16 00:00:00",
					"contractValidTo": "2018-12-31 00:00:00",
					"techLevel": "无",
					"mobile": "13700631861",
					"familyAddress": "安宁市太平镇西仪村",
					"remark": "7液硝",
					"createTime": "2018-03-01 17:41"
				}
			]
		}
	},
	methods: {
		ViewCarrierbill(CarrierNum) {
			this.$router.push({ name: 'viewcarrierbill', query: { CarrierNum } })
		},
		ViewDispatchBill(ControlsNum) {
			this.$router.push({ name: 'viewdispatchbill', query: { ControlsNum } })
		},
		ViewTruck(selfNum) {
			this.$router.push({name: 'viewtruck', query: { selfNum } })
		},
		ViewPerson(cardId) {
            this.$router.push({name: 'viewperson', query: { cardId } })
        }
	}
}

</script>
<style lang="stylus" scoped>
.wf-card
	.header
		.more
			float right
			color #409EFF
			font-size 12px
			line-height 20px
			margin-top 15px
.dashboardItem
	margin-bottom 20px


</style>
