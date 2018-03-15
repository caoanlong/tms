const menus = [
	{
		Target: 'home',
		Href: '/home',
		Name: '首页',
		IsShow: '1',
		Icon: 'home-icon',
	},
	{
		Target: 'carrierbill',
		Href: '/carrierbill',
		Name: '承运单',
		IsShow: '1',
		Icon: 'list-th-icon'
	},
	{
		Target: 'dispatchbill',
		Href: '/dispatchbill',
		Name: '调度单',
		IsShow: '1',
		Icon: 'dispatchbill'
	},
	{
		Target: 'settlemanage',
		Href: '/settlemanage',
		Name: '结算管理',
		IsShow: '1',
		Icon: 'Settlement',
		children: [
			{
				Target: 'receivablesum',
				Href: '/receivablesum',
				Name: '应收汇总',
				IsShow: '1'
			},
			{
				Target: 'receivableinfo',
				Href: '/receivableinfo',
				Name: '应收明细',
				IsShow: '1'
			},
			{
				Target: 'payablesum',
				Href: '/payablesum',
				Name: '应付汇总',
				IsShow: '1'
			},
			{
				Target: 'payableinfo',
				Href: '/payableinfo',
				Name: '应付明细',
				IsShow: '1'
			},
			{
				Target: 'settleconfig',
				Href: '/settleconfig',
				Name: '结算设置',
				IsShow: '1'
			}
		]
	},
	{
		Target: 'transteam',
		Href: '/transteam',
		Name: '运输队',
		IsShow: '1',
		Icon: 'truck-icon',
		children: [
			{
				Target: 'truck',
				Href: '/truck',
				Name: '车辆',
				IsShow: '1'
			},
			{
				Target: 'person',
				Href: '/person',
				Name: '人员',
				IsShow: '1'
			},
			{
				Target: 'transinfo',
				Href: '/transinfo',
				Name: '运输档案',
				IsShow: '1'
			}
		]
	},
	{
		Target: 'cooperpartner',
		Href: '/cooperpartner',
		Name: '合作伙伴',
		IsShow: '1',
		Icon: 'Partner',
		children: [
			{
				Target: 'shipper',
				Href: '/shipper',
				Name: '托运人',
				IsShow: '1'
			},
			{
				Target: 'recdeliverycomp',
				Href: '/recdeliverycomp',
				Name: '收发货单位',
				IsShow: '1'
			}
		]
	}
]

export default menus
