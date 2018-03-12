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
		Icon: 'home-icon',
		children: [
			{
				Target: 'carrierbills',
				Href: '/carrierbills',
				Name: '承运单列表',
				IsShow: '1'
			},
			{
				Target: 'controls',
				Href: '/controls',
				Name: '调度列表',
				IsShow: '1'
			}
		]
	},
	{
		Target: 'settlemanage',
		Href: '/settlemanage',
		Name: '结算管理',
		IsShow: '1',
		Icon: 'home-icon',
		children: [
			{
				Target: 'receivablesum',
				Href: '/receivablesum',
				Name: '应收汇总',
				IsShow: '1'
			},
			{
				Target: 'payablesum',
				Href: '/payablesum',
				Name: '应付汇总',
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
		Icon: 'home-icon',
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
		Target: 'collaborator',
		Href: '/collaborator',
		Name: '合作伙伴',
		IsShow: '1',
		Icon: 'home-icon',
		children: [
			{
				Target: 'shipper',
				Href: '/shipper',
				Name: '托运人',
				IsShow: '1'
			},
			{
				Target: 'recdeliverycom',
				Href: '/recdeliverycom',
				Name: '收发货单位',
				IsShow: '1'
			}
		]
	}
]

export default menus
