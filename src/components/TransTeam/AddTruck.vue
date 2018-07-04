<template>
	<div class="main-content">
		<el-form label-width="100px" size="mini" :model="truck" :rules="rules" ref="ruleForm" >
			<el-card class="box-card">
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">基本信息</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="车辆编号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车辆类别">
									<el-select placeholder="请选择" style="width:100%" >
										<el-option label="整车" value="1"></el-option>
										<el-option label="牵引车" value="2"></el-option>
										<el-option label="挂车" value="3"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车牌颜色">
									<el-select placeholder="请选择" style="width:100%" >
										<el-option label="黄色" value="1"></el-option>
										<el-option label="蓝色" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="挂车牌号码">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车辆号码">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车辆类型">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="车辆归属">
									<el-select placeholder="请选择" style="width:100%" >
										<el-option label="挂靠" value="1"></el-option>
										<el-option label="自有" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="主驾司机">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="副驾司机">
									<el-input></el-input>
								</el-form-item>
							</el-col>							
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="车辆照片">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>正面</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>45°角</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>侧面</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>购车发票</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>整车合格证</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>机动车登记证</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">所属单位/车主</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="车主/单位名称" label-width="120px">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="车主/单位电话" label-width="120px">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="车主/单位地址" label-width="120px">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="所有权类型" label-width="120px">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">行驶证</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="注册日期">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="发证日期">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item label="行驶证有效期">
									<el-date-picker
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item label="行驶证照片">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>正本</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>副本</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">道路运输许可证</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="许可证号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="年审日期至">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="经营范围">
									<el-input type="textarea" resize="none" :rows="3"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="许可运输品">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="许可运输品是否剧毒" label-width="150px">
									<el-switch></el-switch>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item label="道路运输许可证" label-width="110px">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>正本</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>副本</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">GPS</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="入网号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="卡号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="序列号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						
							<el-col :span="12">
								<el-form-item label="安装时间">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item label="有效期">
									<el-date-picker
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="费用">
									<el-input><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="类型">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="照片">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="5"/>
										<p>照片1</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>保险信息</span>
				</div>
				<el-row class="section-block" style="margin-bottom:10px">
					<span class="block-title">交强险</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="保险公司">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="保险单号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="保险到期日">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						
							<el-col :span="12">
								<el-form-item label="保险金额">
									<el-input><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="车船税金额">
									<el-input><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="照片">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="5"/>
										<p>照片1</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<div class="section-block">
							<span class="block-title">商业险</span>
							<div class="block-content">
								<el-row>
									<el-col :span="24">
										<el-form-item label="保险单号">
											<el-input></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="保险到期日">
											<el-date-picker
											type="date"
											placeholder="选择日期" style="width:100%">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="保险金额">
											<el-input><template slot="append">元</template></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="照片">
											<div class="uploadTruckPicItem">
												<ImageUpload :width="80" :height="80" :limitNum="2"/>
												<p>照片1</p>
											</div>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="section-block">
							<span class="block-title">承运险</span>
							<div class="block-content">
								<el-row>
									<el-col :span="24">
										<el-form-item label="保险单号">
											<el-input></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="保险到期日">
											<el-date-picker
											type="date"
											placeholder="选择日期" style="width:100%">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="保险金额">
											<el-input><template slot="append">元</template></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="照片">
											<div class="uploadTruckPicItem">
												<ImageUpload :width="80" :height="80" :limitNum="2"/>
												<p>照片1</p>
											</div>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row class="section-block" style="margin-top:20px">
					<span class="block-title">货运险</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="保险单号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="保险到期日">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="保险金额">
									<el-input><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-top:20px">
					<span class="block-title">保险备注</span>
					<div class="block-content">
						<el-row>
							<el-col :span="24">
								<el-form-item label="保险备注">
									<el-input type="textarea" :rows="3" resize="none"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<div class="section-block">
					<span class="block-title">技术参数</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item label="车辆长宽高">
									<el-input placeholder="长度" style="width:32%"><template slot="append">mm</template></el-input>
									<el-input placeholder="宽度" style="width:32%"><template slot="append">mm</template></el-input>
									<el-input placeholder="高度" style="width:32%"><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="装载量">
									<el-input placeholder="载重" style="width:32%"><template slot="append">kg</template></el-input>
									<el-input placeholder="容积" style="width:32%"><template slot="append">m³</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车身颜色">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="使用性质">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="运输类别">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="运输介质">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="发动机型号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						
							<el-col :span="8">
								<el-form-item label="发动机号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="排放标准">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="准载类型">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						
							<el-col :span="8">
								<el-form-item label="核载人数">
									<el-input><template slot="append">人</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="车辆识别号">
									<el-input placeholder="车辆识别号/车架号"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="厂牌型号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						
							<el-col :span="8">
								<el-form-item label="生产厂家">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="车辆外廓尺寸">
									<el-input><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车辆轮距">
									<el-input><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车辆轴数">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="轴距">
									<el-input><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="总质量">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="核定载质量">
									<el-input><template slot="append">kg</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="整备质量">
									<el-input><template slot="append">kg</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="准牵引总质量">
									<el-input><template slot="append">kg</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="罐体容积">
									<el-input><template slot="append">m³</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="出厂日期">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="落户日期">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="安全卡发放日期" label-width="110px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="16">
								<el-form-item label="标志灯牌编号及完好情况" label-width="190px">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</div>
			</el-card>
			<el-card class="box-card" style="margin-bottom:20px">
				<div slot="header" class="clearfix">
					<span>其他信息</span>
				</div>
				
				
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">罐体</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="罐体类型" label-width="140px">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="容积" label-width="140px">
									<el-input><template slot="append">m³</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="罐体检测有效期至" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="安全阀监测有效期至" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="压力表监测有效期至" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="照片" label-width="140px">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="5"/>
										<p>照片1</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">保证金</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="金额" label-width="140px">
									<el-input><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="日期" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="二次安全保证金" label-width="140px">
									<el-input><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="二次安全保证金日期" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="缴费日期" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="保证金备注"  label-width="140px">
									<el-input type="textarea" :rows="3" resize="none"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">技术等级</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="等级评定"  label-width="140px">
									<el-select placeholder="请选择" style="width:100%" >
										<el-option label="一级" value="1"></el-option>
										<el-option label="二级" value="2"></el-option>
										<el-option label="三级" value="3"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="评级日期" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="下次评级日期" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="审验备注" label-width="140px">
									<el-input type="textarea" :rows="3" resize="none"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-col :span="24">
							<el-form-item label="照片" label-width="140px">
								<div class="uploadTruckPicItem">
									<ImageUpload :width="80" :height="80" :limitNum="1"/>
									<p>正本</p>
								</div>
								<div class="uploadTruckPicItem">
									<ImageUpload :width="80" :height="80" :limitNum="1"/>
									<p>副本</p>
								</div>
								<div class="uploadTruckPicItem">
									<ImageUpload :width="80" :height="80" :limitNum="3"/>
									<p>审验记录1</p>
								</div>
							</el-form-item>
						</el-col>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">二级维护</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="维护日期" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="下次维护" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">管理协议</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="金额" label-width="140px">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="缴费日期" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="有效期" label-width="140px">
									<el-date-picker
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="安全责任书到期日" label-width="140px">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="元/轴/月" label-width="140px">
									<el-input><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="协议备注" label-width="140px">
									<el-input type="textarea" :rows="3" resize="none"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block">
					<span class="block-title">其他资料</span>
					<div class="block-content">
						<el-row >
							<el-col :span="24">
								<el-form-item label="照片" label-width="50px">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>购车发票</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>整车合格证</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>机动车登记证</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="3"/>
										<p>照片1</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-card>
			<div class="formHandle text-center">
				<el-button @click="back">取消</el-button>
				<el-button type="primary">保存</el-button>	
			</div>
		</el-form>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../common/request'
import Truck from '../../api/Truck'
import ImageUpload from '../CommonComponents/ImageUpload'
export default {
	data() {
		return {}
	},
	created() {
	},
	methods: {
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload,
		DistPicker
	}
}

</script>
<style lang="stylus" scoped>
.section-block
	margin 10px 0 0
.uploadTruckPicItem
	display inline-block
	margin-right 10px
	p
		margin 0
		text-align center
		font-size 12px
		color #999
.box-card
	margin-bottom 10px
</style>