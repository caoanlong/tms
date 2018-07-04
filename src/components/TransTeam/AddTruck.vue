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
import DistPicker from '../CommonComponents/DistPicker'
import { searchAreaByKey } from '../../common/utils'
import { checkPlateNo } from '../../common/validator'
import { checkTel, checkInt, checkFloat, checkFloat2 } from '../../common/validators'
export default {
	data() {
		return {
			loading: true,
			plateNoType: '车牌号',
			truckTypes: [],
			truck: {
				auditBy: '',
				auditTime: '',
				accurateLoadType: '',		// string 准载类型
				area: '',		// string 地区
				areaID: '',		// string 地区ID
				bizInsuranceExpires: '',		// string	@mock=1522813658
				businessLicenseNo: '',		// string 经营证号
				businessNature: '',		// string 经营性质
				businessScope: '',		// string 经营范围
				cannedType: '',		// string 罐装类型
				carBodyColor: '',		// string 车身颜色
				carBrandModel: '',		// string 车品牌型号
				carOwnerAddress: '',		// string 所有人登记地址
				carOwnerMobile: '',		// string 所有人电话
				carOwnerName: '',		// string 所有人姓名或单位名称
				carrierRiskInsuranceExpires: '',		// string	@mock=1522813658
				code: '',		// string 编码
				companyID: '',		// string	@mock=978991129738719234
				companyName: '',		// string 所属企业名称
				curDriverAddress: '',		// string 实际车主现住址
				curDriverMobile: '',		// string 当前车主联系方式
				curDriverName: '',		// string 当前车主姓名
				driverLicExamineExpires: '',		// string	@mock=1522813658
				driverLicIssueTime: '',		// string	@mock=1522813658
				driverLicPic: '',		// string 机动车行驶证正本
				driverLicRegisterTime: '',		// string	@mock=1522813658
				driverLicSidePic: '',		// string 机动车行驶证副本
				engineNO: '',		// string 发动机号
				gpSCardNo: '',		// string GPS卡号
				gpSNetworkNo: '',		// string GPS入网号
				gpSSerialNumber: '',		// string GPS序列号
				gpSSetupTime: '',		// string	@mock=1522813658
				gpSType: '',		// string GPS类型
				hasWarnMark: '',		// string	@mock=N
				high: '',		// string	@mock=20
				length: '',		// string	@mock=12
				loadStatus: '',		// string 装载状态
				loadVolume: '',		// string	@mock=11
				loads: '',		// string	@mock=20
				manufacturer: '',		// string 汽车生产厂家
				nextRankEvaluteTime: '',		// string	@mock=1522813658
				nextSecondLevel: '',		// string	@mock=1522813658
				otherTruckPic1: '',		// string 车辆其他图片1
				otherTruckPic2: '',		// string 车辆其他图片2
				otherTruckPic3: '',		// string 车辆其他图片3
				otherTruckPic4: '',		// string 车辆其他图片4
				otherTruckPic5: '',		// string 车辆其他图片5
				personsCapacity: '',		// string	@mock=20
				plateNo: '',		// string 车牌号
				plateNoColor: '',		// string 车牌颜色
				plateNoType: '',		// string 车牌类型
				pressureGaugeQCExpires: '',		// string	@mock=1522813658
				propertyType: '',		// string 所有权类型
				rank: '',		// string 等级评定
				roadTransportLicAnnualPeriod: '',		// string	@mock=1522813658
				roadTransportNo: '',		// string 道路运输证号
				roadTransportPic: '',		// string 道路运输许可证
				roadTransportSidePic: '',		// string 道路运输许可证副本
				saLIInsuranceExpires: '',		// string	@mock=1522813658
				safetyValvesQCExpires: '',		// string	@mock=1522813658
				secondaMaintainTime: '',		// string	@mock=1522813658
				status: '',		// string 资料状态
				tankQCExpires: '',		// string	@mock=1522813658
				tankVolume: '',		// string	@mock=123
				totalWeight: '',		// string	@mock=4
				tractiveTonnage: '',		// string	@mock=12
				trailerPlateNo: '',		// string 挂车牌号
				truckBrand: '',		// string	@mock=1
				truckCategory: '',		// string 车辆类别
				truckFrontPic: '',		// string 车辆正面照
				truckSidePic1: '',		// string 车辆侧面照1
				truckSidePic2: '',		// string 车辆侧面照2
				truckType: '',		// string 车辆类型
				vehicleFrameNO: '',		// string 车架号
				width: '',		// string	@mock=50
				workStatus: ''		// string 运输状态
			},
			otherImgs: [],
			selectedArea: [],
			rules: {
				status: [
					{ required: true, message: '请选择状态', trigger: 'change' }
				],
				auditName: [
					{required: true, message: '请输入审核人', trigger: 'blur'}
				],
				auditTime: [
					{required: true, message: '请选择审核日期', trigger: 'change'}
				],
				areaID: [
					{ required: true, message: '请选择地区', trigger: 'change' }
				],
				companyName: [
					{required: true, message: '请输入企业', trigger: 'blur'}
				],
				code: [
					{min: 1, max: 20, message: '长度在 1 到 20 个字符'}
				],
				truckCategory: [
					{required: true, message: '请选择车辆类别', trigger: 'change'},
				],
				truckType: [
					{ required: true, message: '请选择车辆类型', trigger: 'change' }
				],
				plateNo: [
					{validator: checkPlateNo}
				],
				trailerPlateNo: [
					{validator: checkPlateNo}
				],
				plateNoColor: [
					{required: true, message: '请选择车牌颜色', trigger: 'change'}
				],
				length: [
					{required: true, validator: checkInt, trigger: 'blur'}
				],
				width: [
					{ required: true, validator: checkInt,trigger: 'blur' }
				],
				high: [
					{required: true, validator: checkInt, trigger: 'blur'}
				],
				loads: [
					{required: true, validator: checkFloat, trigger: 'blur'}
				],
				loadVolume: [
					{ required: true, validator: checkFloat, trigger: 'blur' }
				],
				tractiveTonnage: [
					{ validator: checkFloat2, trigger: 'blur' }
				],
				totalWeight: [
					{ required: true, validator: checkFloat, trigger: 'blur' }
				],
				tankVolume: [
					{ validator: checkFloat2, trigger: 'blur' }
				],
				manufacturer: [
					{required: true, message: '请输入生产厂家', trigger: 'blur'}
				],
				carBrandModel: [
					{required: true, message: '请输入品牌型号', trigger: 'blur'},
				],
				personsCapacity: [
					{ required: true, message: '请选择核载人数', trigger: 'change' }
				],
				carBodyColor: [
					{required: true, message: '请输入车身颜色', trigger: 'blur'}
				],
				hasWarnMark: [
					{required: true, message: '请选择是否喷涂警示', trigger: 'change'}
				],
				driverLicRegisterTime: [
					{required: true, message: '请选择行驶证注册日期', trigger: 'change'}
				],
				driverLicIssueTime: [
					{ required: true, message: '请选择行驶证发证日期', trigger: 'change' }
				],
				driverLicExamineExpires: [
					{required: true, message: '请选择行驶证审验日', trigger: 'change'}
				],
				roadTransportNo: [
					{required: true, message: '请输入道路运输号', trigger: 'blur'},
				],
				businessScope: [
					{ required: true, message: '请输入经营范围', trigger: 'blur' }
				],
				roadTransportLicAnnualPeriod: [
					{required: true, message: '请输入道路运输年审日', trigger: 'change'}
				],
				carOwnerName: [
					{required: true, message: '请输入所有人/单位', trigger: 'blur'}
				],
				carOwnerMobile: [
					{required: true, validator: checkTel, trigger: 'blur'}
				],
				carOwnerAddress: [
					{required: true, message: '请输入所有人地址', trigger: 'blur'}
				],
				curDriverName: [
					{required: true, message: '请输入车主姓名', trigger: 'blur'}
				],
				curDriverMobile: [
					{required: true, validator: checkTel, trigger: 'blur'}
				],
				curDriverAddress: [
					{required: true, message: '请输入车主住址', trigger: 'blur'}
				],
				propertyType: [
					{required: true, message: '请选择所有权', trigger: 'change'}
				],
				businessNature: [
					{required: true, message: '请选择经营性质', trigger: 'change'}
				],
				businessLicenseNo: [
					{required: true, message: '请输入经营证号', trigger: 'blur'}
				],
				rank: [
					{required: true, message: '请选择等级评定', trigger: 'blur'}
				],
				nextRankEvaluteTime: [
					{required: true, message: '请选择下次等评日期', trigger: 'blur'}
				],
				secondaMaintainTime: [
					{required: true, message: '请选择二次维护日期', trigger: 'blur'}
				],
				nextSecondLevel: [
					{required: true, message: '请选择下次二次维护日期', trigger: 'blur'}
				],
				carrierRiskInsuranceExpires: [
					{required: true, message: '请选择承运人责任险有效期', trigger: 'blur'}
				],
				saLIInsuranceExpires: [
					{required: true, message: '请选择交强险有效期', trigger: 'blur'}
				],
				bizInsuranceExpires: [
					{required: true, message: '请选择商业险有效期', trigger: 'blur'}
				]
			}
		}
	},
	created() {
	},
	methods: {
		disabledDate(curDate) {
			return new Date() < curDate
		},
		// 车辆照片(正)
		handleTruckFrontPicSuccess(res) {
			this.truck.truckFrontPic = res[0]
		},
		// 车辆照片(侧1)
		handleTruckSidePic1Success(res) {
			this.truck.truckSidePic1 = res[0]
		},
		// 车辆照片(侧2)
		handleTruckSidePic2Success(res) {
			this.truck.truckSidePic2 = res[0]
		},
		// 机动车行驶证照片(正)
		handleDriverLicPicSuccess(res) {
			this.truck.driverLicPic = res[0]
		},
		// 机动车行驶证照片(副)
		handleDriverLicSidePicSuccess(res) {
			this.truck.driverLicSidePic = res[0]
		},
		// 道路运输许可证照片(正)
		handleRoadTransportPicSuccess(res) {
			this.truck.roadTransportPic = res[0]
		},
		// 道路运输许可证照片(副)
		handleRoadTransportSidePicSuccess(res) {
			this.truck.roadTransportSidePic = res[0]
		},
		imgUrlBack(files) {
			this.otherImgs = files
			for (let i = 0; i < files.length; i++) {
				this.truck['otherTruckPic' + (i + 1)] = files[i]
			}
		},
		handleSelectedArea(data) {
			this.truck.areaID = data
			this.truck.area = data ? searchAreaByKey(data) : ''
		},
		changePlateNoType(e) {
			if (e == '车牌号') {
				this.truck.trailerPlateNo = ''
			} else {
				this.truck.plateNo = ''
			}
		},
		createItem() {
			let data = this.truck
			if (!data.tankQCExpires) {
				data.tankQCExpires = ''
			}
			if (!data.safetyValvesQCExpires) {
				data.safetyValvesQCExpires = ''
			}
			if (!data.pressureGaugeQCExpires) {
				data.pressureGaugeQCExpires = ''
			}
			if (!data.gpSSetupTime) {
				data.gpSSetupTime = ''
			}
			if (!data.trailerPlateNo && !data.plateNo) {
				Message.error('车牌号或挂车牌不能为空！')
				return 
			}
			if (data.trailerPlateNo.length > 10 || data.plateNo.length > 10) {
				Message.error('车牌号或挂车牌长度不能超过10位！')
				return 
			}
			if (data.driverLicRegisterTime > data.driverLicIssueTime) {
				Message.error('行驶证注册日期不能早于行驶证发证日期！')
				return
			}
			if (data.secondaMaintainTime > data.nextSecondLevel) {
				Message.error('二级维护日期不能早于下次二级维护日期！')
				return
			}
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					Truck.add(data).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'truck'})
					})
				}
			})
		},
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