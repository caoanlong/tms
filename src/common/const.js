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
    // Closed: '已关闭',
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
  Shipper: '发货单位',
  Consignee: '收货单位',
  Delegate: '委托方'
}