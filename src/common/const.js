export const PAGEINDEX = 1
export const PAGESIZE = 10
export const TOTAL = 0
export const MAPKEY = '3a29e75c898b755e250dfcf99c3ebd45'

/**
 * 调度单类型
 */
export const DISPATCHORDERTYPE = {
    Assign: '指派',
    Grab: '抢单',
    Offer: '报价'
}
export const DISPATCHORDERTYPESIMPLE = {
    Assign: '派',
    Grab: '抢',
    Offer: '报'
}
export const DISPATCHORDERTYPEEX = {
    Assign: '接单中',
    Grab: '抢单中',
    Offer: '报价中'
}

/**
 * 调度单状态
 */
export const DISPATCHORDERSTATUS = {
  Committed: '未接单',
  Ordered: '已接单',
  Canceled: '已取消',
  Rejected: '已拒绝',
  Closed: '已关闭',
  Overdue: '超时取消',
  Finished: '已完成'
}

export const DISPATCHORDERSTATUS1 = {
    Committed: '未接单',
    Ordered: '已接单'
}

export const DISPATCHORDERSTATUS2 = {
  Canceled: '已取消',
  Rejected: '已拒绝',
  Closed: '已关闭',
  Overdue: '超时取消',
  Finished: '已完成'
}
/**
 * 车辆类型
 */
export const TRUCKTYPE = {
    TankTruck: '罐式货车',
    VanTruck: '厢式货车',
    BarrackTruck: '仓栅货车',
    TailgateTruck: '栏板货车',
    DumpTruck: '自卸货车',
    HeavySemitrailerTractor: '重型半挂牵引车',
    TankTrailer: '罐式挂车',
    VanTrailer: '厢式挂车',
    BarrackTrailer: '仓栅挂车',
    TailgateTrailer: '栏板挂车',
    ContainerTrailer: '集装箱'
    // H01: '普通货车',
    // H02: '厢式货车',
    // H04: '罐式货车',
    // Q00: '牵引车',
    // G01: '普通挂车',
    // G03: '罐式挂车',
    // G05: '集装箱挂车',
    // H09: '仓栅式货车',
    // H03: '封闭货车',
    // H05: '平板货车',
    // H06: '集装箱车',
    // H07: '自卸货车',
    // H08: '特殊结构货车',
    // Z00: '专项作业车',
    // G02: '厢式挂车',
    // G07: '仓栅式挂车',
    // G04: '平板挂车',
    // G06: '自卸挂车',
    // G09: '专项作业挂车',
    // X91: '车辆运输车',
    // X92: '车辆运输车(单排)'
}

/**
 * 车牌类型
 */
export const TRUCKPLATENUMTYPE = {
    '01':'大型汽车号牌',
    '02':'小型汽车号牌',
    '99':'其他号牌'
}

/**
 * 车牌颜色
 */
export const TRUCKPLATECOLOR = {
    '1':'蓝色',
    '2':'黄色',
    '3':'黑色',
    '4':'白色',
    '5':'绿色',
    '9':'其他'
}


/**
 * 到期类型
 */

export const EXPIREWARN = {
    DriverLicExpiresTime: "行驶证到期",
    RoadTransportLicAnnualPeriod: "道路运输证到期 ",
    GpsValidEndDate: "GPS到期 ",
    SaliInsuranceExpires: "交强险到期 ",
    BizInsuranceExpires: "商业险到期 ",
    CarrierRiskInsuranceExpires: "承运险到期 ",
    CargoInsuranceExpireDate: "货运险到期 ",
    TankQCExpires: "罐体监测到期 ",
    SafetyValvesQCExpires: "罐体安全阀监测到期 ",
    PressureGaugeQCExpires: "罐体压力表监测到期 ",
    secondaMaintainTime: "二级维护下次维护日期到期 ",
    NextSecondLevel:"二级维护下次维护",
    NextRankEvaluteTime: "技术等级下次评定到期",
    SecondSecurityDepositDate: "二次安全保证金到期 ",
    ManagementAgreementExpireDate: "管理协议到期 ",
    SafetyLiabilityLetterExpireDate: "安全责任书到期",
    IdCardExpirationTime: "身份证到期 ",
    DriverLicenseEndTime: "驾驶证到期 ",
    QualificationExpirationDate: "危货从业资格证到期 ",
    IntegrityExamineEndTime: "诚信考核证到期 ",
    LaborContractEndTime: "聘用合同到期 ",
    EscortLicenseExpireDate: "押运证到期"
}

/**
 * 费用类型
 */
export const FREIGHTTYPE = {
    Freight: '运费',
    RoadBridge: '路桥费',
    Transit: '中转费',
    Fine: '罚款',
    Detour: '绕路费',
    Other: '其他'
}

/**
 * 支付方式
 */
export const PAYMETHODS = {
    Prepay: '预付',
    PayOnDelivery: '到付',
    PayOnReceipt: '回单结',
    PayMonthly: '月结',
    PayByConsignee: '收货方付'
}

/**
 * 车长
 */
export const TRUCKLENGTH = [
    { value: 4.2 },
    { value: 4.5 },
    { value: 5 },
    { value: 6.2 },
    { value: 6.8 },
    { value: 7.2 },
    { value: 7.7 },
    { value: 7.8 },
    { value: 8.2 },
    { value: 8.6 },
    { value: 9.6 },
    { value: 11.7 },
    { value: 12.5 },
    { value: 13 },
    { value: 13.5 },
    { value: 14 },
    { value: 15 },
    { value: 16 },
    { value: 17 },
    { value: 17.5 },
    { value: 1 },
]

/**
 * 客户类型
 */
export const CUSTOMERTYPE = {
    Shipper: '发货方',
    Consignee: '收货方',
    Delegate: '委托方'
}

/**
 * 配载方式
 */
export const DISPATCHTYPE = {
    Volumn: '按体积配载',
    Weight: '按重量配载'
}

/**
 * 运输方式
 */
export const TRANSPORTTYPE = {
    '海上运输': '海上运输',
    '铁路运输': '铁路运输',
    '公路运输': '公路运输',
    '航空运输': '航空运输',
    '邮件运输': '邮件运输',
    '多式联运': '多式联运',
    '固定设施运输': '固定设施运输',
    '内河运输': '内河运输',
    '其他': '其他'
}