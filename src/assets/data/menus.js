const menus = [
	{
		Target: 'home',
		Href: '/home',
		Name: '首页',
		IsShow: '1',
		Icon: 'home-icon'
	},
	{
		Target: 'carrierbill',
		Href: '/carrierbill',
		Name: '承运单',
		IsShow: '1',
		Icon: 'home-icon',
		redirect: '/carrierbills',
		children: [
			{
				Target: 'carrierbills',
				Href: '/carrierbills',
				Name: '承运单列表',
				IsShow: '1',
				Icon: 'home-icon'
			},
			{
				Target: 'addcarrierbill',
				Href: '/addcarrierbill',
				Name: '添加承运单',
				IsShow: '0'
			},
			{
				Target: 'editcarrierbill',
				Href: '/editcarrierbill',
				Name: '编辑承运单',
				IsShow: '0'
			},
			{
				Target: 'viewcarrierbill',
				Href: '/viewcarrierbill',
				Name: '查看承运单',
				IsShow: '0'
			}
		]
	}
]

export default menus
