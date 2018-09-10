UPDATE
  sys_menu
SET
  NAME = '待调度',
  Href = '/dispatching',
  Target = 'dispatching'
WHERE NAME = '调度单';

INSERT INTO sys_menu
VALUES
	(
		'1012632155127418991',
		'1012632071564300288',
		'已调度',
		NULL,
		'/dispatched',
		'dispatched',
		'',
		'Y',
		NULL,
		'1007116169212780546',
		'2018-06-29 08:49:16',
		'1007116169212780546',
		'2018-06-29 08:49:16',
		'',
		1
  );

INSERT INTO sys_menu
VALUES
	(
		'1011827161587388416',
		NULL,
		'无车承运人',
		NULL,
		'/notruckcarrier',
		'notruckcarrier',
		'example',
		'Y',
		NULL,
		'1007116169212780546',
		'2018-06-11 10:11:09',
		'1007116169212780546',
		'2018-06-29 09:48:23',
		'',
		4
  );

INSERT INTO sys_menu
VALUES
	(
		'1011827999508664320',
		'1011827161587388416',
		'货源上传',
		NULL,
		'/notruckcargosource',
		'notruckcargosource',
		'',
		'Y',
		NULL,
		'1007116169212780546',
		'2018-06-11 10:11:09',
		'1007116169212780546',
		'2018-06-11 10:11:09',
		'',
		1
  );

INSERT INTO sys_menu
VALUES
	(
		'1011828115091099648',
		'1011827161587388416',
		'车源上传',
		NULL,
		'/notrucksource',
		'notrucksource',
		'',
		'Y',
		NULL,
		'1007116169212780546',
		'2018-06-11 10:11:09',
		'1007116169212780546',
		'2018-06-11 10:11:09',
		'',
		2
  );

INSERT INTO sys_menu
VALUES
	(
		'1011828215897001984',
		'1011827161587388416',
		'运单上传',
		NULL,
		'/notruckwaybill',
		'notruckwaybill',
		'',
		'Y',
		NULL,
		'1007116169212780546',
		'2018-06-11 10:11:09',
		'1007116169212780546',
		'2018-06-11 10:11:09',
		'',
		3
  );

INSERT INTO sys_menu
VALUES
	(
		'1011828317034254336',
		'1011827161587388416',
		'接口配置',
		NULL,
		'/notruckuser',
		'notruckuser',
		'',
		'Y',
		NULL,
		'1007116169212780546',
		'2018-06-11 10:11:09',
		'1007116169212780546',
		'2018-06-27 04:28:15',
		'',
		4
  );

