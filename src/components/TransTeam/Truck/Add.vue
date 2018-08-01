<template>
	<div class="main-content" style="padding-left:200px">
		<el-form label-width="140px" size="mini" :model="truck" :rules="rules" ref="ruleForm" >
			<el-card class="box-card">
				<el-row class="section-block target1" style="margin-bottom:20px">
					<span class="block-title">基本信息</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="车辆编号" prop="code">
									<el-input v-model="truck.code"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车辆类别" prop="truckCategory">
									<el-select placeholder="请选择" style="width:100%" v-model="truck.truckCategory" @change="handSelectTruckCategory">
										<el-option label="整车" value="WholeVehicle"></el-option>
										<el-option label="牵引车" value="Tractor"></el-option>
										<el-option label="挂车" value="Trailer"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车牌颜色" prop="plateNoColor">
									<el-select placeholder="请选择" style="width:100%" v-model="truck.plateNoColor">
										<el-option label="黄色" value="黄色"></el-option>
										<el-option label="蓝色" value="蓝色"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="挂车牌号码" prop="trailerID" v-if="truck.truckCategory == 'Tractor'">
									<el-autocomplete  style="width:100%"
										value-key="plateNo" 
										v-model="truck.trailerPlateNo"
										:fetch-suggestions="getTrailers"
										placeholder="请输入..." 
										@select="handSelectTrailer">
									</el-autocomplete>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车牌号码" prop="plateNo">
									<el-input v-model="truck.plateNo"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车辆类型" prop="truckType">
									<el-select placeholder="请选择" style="width:100%" v-model="truck.truckType">
										<el-option label="罐式货车" value="TankTruck" v-if="truck.truckCategory == 'WholeVehicle'"></el-option>
										<el-option label="厢式货车" value="VanTruck" v-if="truck.truckCategory == 'WholeVehicle'"></el-option>
										<el-option label="仓栅货车" value="BarrackTruck" v-if="truck.truckCategory == 'WholeVehicle'"></el-option>
										<el-option label="栏板货车" value="TailgateTruck" v-if="truck.truckCategory == 'WholeVehicle'"></el-option>
										<el-option label="自卸货车" value="DumpTruck" v-if="truck.truckCategory == 'WholeVehicle'"></el-option>
										<el-option label="重型半挂牵引车" value="HeavySemitrailerTractor" v-if="truck.truckCategory == 'Tractor'"></el-option>
										<el-option label="罐式挂车" value="TankTrailer" v-if="truck.truckCategory == 'Trailer'"></el-option>
										<el-option label="厢式挂车" value="VanTrailer" v-if="truck.truckCategory == 'Trailer'"></el-option>
										<el-option label="仓栅挂车" value="BarrackTrailer" v-if="truck.truckCategory == 'Trailer'"></el-option>
										<el-option label="栏板挂车" value="TailgateTrailer" v-if="truck.truckCategory == 'Trailer'"></el-option>
										<el-option label="集装箱挂车" value="ContainerTrailer" v-if="truck.truckCategory == 'Trailer'"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="车辆归属" prop="cooperateRelation">
									<el-select placeholder="请选择" style="width:100%" v-model="truck.cooperateRelation">
										<el-option label="挂靠" value="Attach"></el-option>
										<el-option label="自有" value="Self"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="主驾司机" v-if="truck.truckCategory != 'Trailer'">
									<el-autocomplete  style="width:100%"
										value-key="realName" 
										v-model="truck.primaryDriverName"
										:fetch-suggestions="getPrimaryDriver"
										placeholder="请输入..."
										@select="handSelectPrimaryDriver">
									</el-autocomplete>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="副驾司机" v-if="truck.truckCategory != 'Trailer'">
									<el-autocomplete  style="width:100%"
										value-key="realName" 
										v-model="truck.secondaryDriverName"
										:fetch-suggestions="getSecondaryDriver"
										placeholder="请输入..."
										@select="handSelectSecondaryDriver">
									</el-autocomplete>
								</el-form-item>
							</el-col>							
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="车辆照片">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.truckFrontPic]" 
											@imgUrlBack="handleTruckFrontPic">
										</ImageUpload>
										<p>正面</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.truckSidePic1]" 
											@imgUrlBack="handleTruckSidePic1">
										</ImageUpload>
										<p>45°角</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.truckSidePic2]" 
											@imgUrlBack="handleTruckSidePic2">
										</ImageUpload>
										<p>侧面</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target2" style="margin-bottom:20px">
					<span class="block-title">所属单位/车主</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="车主/单位名称">
									<el-input v-model="truck.carOwnerName"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="车主/单位电话">
									<el-input v-model="truck.carOwnerMobile"></el-input>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="车主/单位地址">
									<el-input v-model="truck.carOwnerAddress"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="所有权类型">
									<el-select placeholder="请选择" style="width:100%" v-model="truck.propertyType">
										<el-option label="单位" value="单位"></el-option>
										<el-option label="挂靠" value="挂靠"></el-option>
										<el-option label="个人" value="个人"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target3" style="margin-bottom:20px">
					<span class="block-title">行驶证</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="注册日期" >
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.driverLicRegisterTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="发证日期" >
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.driverLicIssueTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="有效期从">
									<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" value-format="timestamp" v-model="truck.driverLicBeginTime" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="有效期至" >
									<!-- driverLicBeginTime,driverLicExpiresTime -->
									<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" value-format="timestamp" v-model="truck.driverLicExpiresTime" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item label="行驶证照片">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.driverLicPic]" 
											@imgUrlBack="handleDriverLicPic">
										</ImageUpload>
										<p>正本</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.driverLicSidePic]" 
											@imgUrlBack="handleDriverLicSidePic">
										</ImageUpload>
										<p>副本</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target4" style="margin-bottom:20px">
					<span class="block-title">道路运输许可证</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="许可证号">
									<el-input v-model="truck.roadTransportNo"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="年审日期至">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.roadTransportLicAnnualPeriod">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="经营范围">
									<el-input type="textarea" resize="none" :rows="3" v-model="truck.businessScope"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="许可运输品">
									<el-input v-model="truck.roadTransportGoods"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="许可运输品是否剧毒" label-width="150px">
									<el-switch v-model="truck.roadTransportGoodsIsPoisonous"></el-switch>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item label="道路运输许可证">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.roadTransportPic]" 
											@imgUrlBack="handleRoadTransportPic">
										</ImageUpload>
										<p>正本</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.roadTransportSidePic]" 
											@imgUrlBack="handleRoadTransportSidePic">
										</ImageUpload>
										<p>副本</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target5">
					<span class="block-title">GPS</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="入网号">
									<el-input v-model="truck.gpsNetworkNo"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="卡号">
									<el-input v-model="truck.gpsCardNo"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="序列号">
									<el-input v-model="truck.gpsSerialNumber"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="安装时间">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.gpsSetupTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<!-- gpSValidBeginDate, gpSValidEndDate -->
								<el-form-item label="有效期从">
									<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" v-model="truck.gpSValidBeginDate" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="有效期至">
									<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" v-model="truck.gpSValidEndDate" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="费用" prop="gpsCostAmount">
									<el-input v-model="truck.gpsCostAmount"><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="类型">
									<el-input v-model="truck.gpsType"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="照片">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.gpsEquippedCertifyPic]" 
											@imgUrlBack="handleGpsEquippedCertifyPic">
										</ImageUpload>
										<p>照片1</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.gpsEquippedCertifyPic2]" 
											@imgUrlBack="handleGpsEquippedCertifyPic2">
										</ImageUpload>
										<p>照片2</p>
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
				<el-row class="section-block target6" style="margin-bottom:10px">
					<span class="block-title">交强险</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="保险公司">
									<el-input v-model="truck.saliInsuranceVendor"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="保险单号">
									<el-input v-model="truck.saliInsuranceNo"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="保险到期日">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.saliInsuranceExpires">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="保险金额" prop="saliInsuranceAmount">
									<el-input v-model="truck.saliInsuranceAmount"><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="车船税金额" prop="saliInsuranceTaxAmount">
									<el-input v-model="truck.saliInsuranceTaxAmount"><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="照片">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.saliInsurancePic]" 
											@imgUrlBack="handleSaliInsurancePic">
										</ImageUpload>
										<p>照片1</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.saliInsurancePic2]" 
											@imgUrlBack="handleSaliInsurancePic2">
										</ImageUpload>
										<p>照片2</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<div class="section-block target7">
							<span class="block-title">商业险</span>
							<div class="block-content">
								<el-row>
									<el-col :span="24">
										<el-form-item label="保险单号">
											<el-input v-model="truck.bizInsuranceNo"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="保险到期日">
											<el-date-picker 
												:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
												type="date"
												placeholder="选择日期" 
												style="width:100%" 
												value-format="timestamp"
												v-model="truck.bizInsuranceExpires">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="保险金额" prop="bizInsuranceAmount">
											<el-input v-model="truck.bizInsuranceAmount"><template slot="append">元</template></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="照片">
											<div class="uploadTruckPicItem">
												<ImageUpload 
													:width="80" :height="80" 
													:files="[truck.bizInsurancePic]" 
													@imgUrlBack="handleBizInsurancePic">
												</ImageUpload>
												<p>照片1</p>
											</div>
											<div class="uploadTruckPicItem">
												<ImageUpload 
													:width="80" :height="80" 
													:files="[truck.bizInsurancePic2]" 
													@imgUrlBack="handleBizInsurancePic2">
												</ImageUpload>
												<p>照片2</p>
											</div>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="section-block target8">
							<span class="block-title">承运险</span>
							<div class="block-content">
								<el-row>
									<el-col :span="24">
										<el-form-item label="保险单号">
											<el-input v-model="truck.carrierRiskInsuranceNo"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="保险到期日">
											<el-date-picker 
												:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
												type="date"
												placeholder="选择日期" 
												style="width:100%" 
												value-format="timestamp"
												v-model="truck.carrierRiskInsuranceExpires">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="保险金额" prop="carrierRiskInsuranceAmount">
											<el-input v-model="truck.carrierRiskInsuranceAmount"><template slot="append">元</template></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="照片">
											<div class="uploadTruckPicItem">
												<ImageUpload 
													:width="80" :height="80" 
													:files="[truck.carrierRiskInsurancePic]" 
													@imgUrlBack="handleCarrierRiskInsurancePic">
												</ImageUpload>
												<p>照片1</p>
											</div>
											<div class="uploadTruckPicItem">
												<ImageUpload 
													:width="80" :height="80" 
													:files="[truck.carrierRiskInsurancePic2]" 
													@imgUrlBack="handleCarrierRiskInsurancePic2">
												</ImageUpload>
												<p>照片2</p>
											</div>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row class="section-block target9" style="margin-top:20px">
					<span class="block-title">货运险</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="保险单号">
									<el-input v-model="truck.cargoInsuranceNo"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="保险到期日">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.cargoInsuranceExpireDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="保险金额" prop="cargoInsuranceAmount">
									<el-input v-model="truck.cargoInsuranceAmount"><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target10" style="margin-top:20px">
					<span class="block-title">保险备注</span>
					<div class="block-content">
						<el-form-item label="保险备注">
							<el-input type="textarea" :rows="3" resize="none" v-model="truck.insuranceNote"></el-input>
						</el-form-item>
					</div>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<div class="section-block target11">
					<span class="block-title">技术参数</span>
					<div class="block-content">
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label-width="80px" label="车辆长度" prop="length">
									<el-input placeholder="长度" v-model="truck.length"><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label-width="80px" label="车辆宽度" prop="width">
									<el-input placeholder="宽度" v-model="truck.width"><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label-width="80px" label="车辆高度" prop="high">
									<el-input placeholder="高度" v-model="truck.high"><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label-width="80px" label="装载重量" prop="loads">
									<el-input placeholder="载重" v-model="truck.loads"><template slot="append">kg</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label-width="80px" label="装载容积" prop="loadVolume">
									<el-input placeholder="容积" v-model="truck.loadVolume"><template slot="append">m³</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<!-- <el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="车身颜色">
									<el-input v-model="truck.carBodyColor"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="使用性质">
									<el-input v-model="truck.transportFunction"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="运输类别">
									<el-input v-model="truck.transportCategory"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="运输介质">
									<el-input v-model="truck.transportMedium"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="发动机型号">
									<el-input v-model="truck.engineType"></el-input>
								</el-form-item>
							</el-col>
						
							<el-col :span="8">
								<el-form-item label="发动机号">
									<el-input v-model="truck.engineNO"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="排放标准">
									<el-input v-model="truck.emissionStandard"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="准载类型">
									<el-input v-model="truck.accurateLoadType"></el-input>
								</el-form-item>
							</el-col>
						
							<el-col :span="8">
								<el-form-item label="核载人数">
									<el-input v-model="truck.personsCapacity"><template slot="append">人</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="车辆识别号">
									<el-input placeholder="车辆识别号/车架号" v-model="truck.vehicleFrameNO"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="厂牌型号">
									<el-input v-model="truck.carBrandModel"></el-input>
								</el-form-item>
							</el-col>
						
							<el-col :span="8">
								<el-form-item label="生产厂家">
									<el-input v-model="truck.manufacturer"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="车辆外廓尺寸">
									<el-input v-model="truck.truckGabarite"><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车辆轮距">
									<el-input v-model="truck.wheelTrack"><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="车辆轴数">
									<el-input v-model="truck.axesNumber"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="轴距">
									<el-input v-model="truck.wheelBase"><template slot="append">mm</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="总质量">
									<el-input v-model="truck.totalWeight"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="核定载质量">
									<el-input v-model="truck.approvedLoadCapacity"><template slot="append">kg</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="整备质量">
									<el-input v-model="truck.curbWeight"><template slot="append">kg</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="准牵引总质量">
									<el-input v-model="truck.tractiveTonnage"><template slot="append">kg</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="标志灯牌编号及完好情况" label-width="190px">
									<el-input v-model="truck.signalLampInfo"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="出厂日期">
									<el-date-picker
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.productionDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="落户日期">
									<el-date-picker
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.settleDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="安全卡发放日期">
									<el-date-picker
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.securityCardIssueDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row> -->
					</div>
				</div>
			</el-card>
			<el-card class="box-card" style="margin-bottom:20px">
				<div slot="header" class="clearfix">
					<span>其他信息</span>
				</div>
				<el-row class="section-block target12" style="margin-bottom:20px">
					<span class="block-title">罐体</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="罐体类型">
									<el-select style="width: 100%" v-model="truck.cannedType" placeholder="请选择">
										<el-option label="常压罐" value="常压罐"></el-option>
										<el-option label="压力罐" value="压力罐"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="容积" prop="tankVolume">
									<el-input v-model="truck.tankVolume"><template slot="append">m³</template></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="罐体检测有效期至">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.tankQCExpires">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="安全阀监测有效期至">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.safetyValvesQCExpires">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="压力表监测有效期至">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.pressureGaugeQCExpires">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="照片">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.cannedMonitorTableCertificatePic1]" 
											@imgUrlBack="handleCannedMonitorTableCertificatePic1">
										</ImageUpload>
										<p>照片1</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.cannedMonitorTableCertificatePic2]" 
											@imgUrlBack="handleCannedMonitorTableCertificatePic2">
										</ImageUpload>
										<p>照片2</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target13" style="margin-bottom:20px">
					<span class="block-title">保证金</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="金额" prop="securityDepositAmount">
									<el-input v-model="truck.securityDepositAmount"><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="日期">
									<el-date-picker
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.securityDepositDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="二次安全保证金" prop="secondSecurityDepositAmount">
									<el-input v-model="truck.secondSecurityDepositAmount"><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="二次安全保证金日期">
									<el-date-picker
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.secondSecurityDepositDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="缴费日期">
									<el-date-picker
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.securityDepositPayDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="保证金备注" >
									<el-input type="textarea" :rows="3" resize="none" v-model="truck.securityDepositNote"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target14" style="margin-bottom:20px">
					<span class="block-title">技术等级</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="等级评定" >
									<el-select placeholder="请选择" style="width:100%" v-model="truck.rank">
										<el-option label="一级" value="1"></el-option>
										<el-option label="二级" value="2"></el-option>
										<el-option label="三级" value="3"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="评级日期">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.rankEvaluteTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="下次评级日期">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.nextRankEvaluteTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="审验备注">
									<el-input type="textarea" :rows="3" resize="none" v-model="truck.rankRemark"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-col :span="24">
							<el-form-item label="照片">
								<div class="uploadTruckPicItem">
									<ImageUpload 
										:width="80" :height="80" 
										:files="[truck.technicalRankPic]" 
										@imgUrlBack="handleTechnicalRankPic">
									</ImageUpload>
									<p>正本</p>
								</div>
								<div class="uploadTruckPicItem">
									<ImageUpload 
										:width="80" :height="80" 
										:files="[truck.technicalRankPic2]" 
										@imgUrlBack="handleTechnicalRankPic2">
									</ImageUpload>
									<p>副本</p>
								</div>
							</el-form-item>
						</el-col>
					</div>
				</el-row>
				<el-row class="section-block target15" style="margin-bottom:20px">
					<span class="block-title">二级维护</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="维护日期">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.secondaMaintainTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="下次维护">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.nextSecondLevel">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target16" style="margin-bottom:20px">
					<span class="block-title">管理协议</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="金额" prop="managementAgreementAmount">
									<el-input v-model="truck.managementAgreementAmount"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="缴费日期">
									<el-date-picker
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.managementAgreementPayDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="12">
								<!-- managementAgreementBeginDate, managementAgreementExpireDate -->
								<el-form-item label="有效期从">
									<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() < curDate}" type="date" :clearable="false" value-format="timestamp" v-model="truck.managementAgreementBeginDate" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="有效期至">
									<el-date-picker :picker-options="{ disabledDate: (curDate) => new Date() > curDate}" type="date" :clearable="false" value-format="timestamp" v-model="truck.managementAgreementExpireDate" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="安全责任书到期日">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp"
										v-model="truck.safetyLiabilityLetterExpireDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="元/轴/月" prop="managementAgreementMoneyPerMonth">
									<el-input v-model="truck.managementAgreementMoneyPerMonth"><template slot="append">元</template></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="协议备注">
									<el-input type="textarea" :rows="3" resize="none" v-model="truck.managementAgreementNote"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target17">
					<span class="block-title">其他资料</span>
					<div class="block-content">
						<el-row >
							<el-col :span="24">
								<el-form-item label="照片" label-width="50px">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.purchaseInvoicePic]" 
											@imgUrlBack="handlePurchaseInvoicePic">
										</ImageUpload>
										<p>购车发票</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.vehicleCertificatePic]" 
											@imgUrlBack="handleVehicleCertificatePic">
										</ImageUpload>
										<p>整车合格证</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.vehicleRegistrationCertificatePic]" 
											@imgUrlBack="handleVehicleRegistrationCertificatePic">
										</ImageUpload>
										<p>机动车登记证</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.otherTruckPic1]" 
											@imgUrlBack="handleOtherTruckPic1">
										</ImageUpload>
										<p>照片1</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.otherTruckPic2]" 
											@imgUrlBack="handleOtherTruckPic2">
										</ImageUpload>
										<p>照片2</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[truck.otherTruckPic3]" 
											@imgUrlBack="handleOtherTruckPic3">
										</ImageUpload>
										<p>照片3</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-card>
			<div class="formHandle text-center">
				<el-button @click="back">取消</el-button>
				<el-button type="primary" @click="save">保存</el-button>	
			</div>
		</el-form>
		<SelectPosition class="lift-nav" :titleList="titleList"></SelectPosition>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import request from '../../../common/request'
import Truck from '../../../api/Truck'
import LiftEffect from '../../../common/LiftEffect'
import ImageUpload from '../../CommonComponents/ImageUpload'
import SelectPosition from '../components/SelectPosition'
import DistPicker from '../../CommonComponents/DistPicker'
import { checkPlateNo, checkInt, checkFloat2 } from '../../../common/validator'
export default {
	data() {
		return {
			titleList: [
				'基本信息',
				'所属单位/车主',
				'行驶证',
				'道路运输许可证',
				'GPS',
				'交强险',
				'商业险',
				'承运险',
				'货运险',
				'保险备注',
				'技术参数',
				'罐体',
				'保证金',
				'技术等级',
				'二级维护',
				'管理协议',
				'其他'
			],
			driverLicTime: [],
			gpsValidDate: [],
			managementAgreementDate: [],
			trailers: [],
			truck: {
				code: '',
				trailerPlateNo: '',
				truckCategory: '',  // String	车辆类别 WholeVehicle-整车 Tractor-牵引车 Trailer-挂车
				plateNoColor: '',  // String	车牌颜色
				trailerID: '',  // number	挂车ID
				plateNo: '',  // String	车牌号码
				truckType: '',  // String	车辆类型 ContainerTrailer-集装箱挂车 Van-厢式货车 HeavySemitrailerTractor-重型半挂牵引车 HeavyVan-重型厢式货车 HeavyContainerSemitrailer-重型集装箱半挂车
				cooperateRelation: '',  // String	车辆归属 Self 自有 Attach 挂靠
				primaryDriver: '',  // number	主驾司机ID
				secondaryDriver: '',  // number	副驾司机ID
				truckFrontPic: '',  // String	车辆照片正面
				truckSidePic1: '',  // String	车辆照片45°角
				truckSidePic2: '',  // String	车辆照片侧面
				carOwnerName: '',  // String	所属单位/车主名称
				carOwnerMobile: '',  // String	所属单位/车主电话
				carOwnerAddress: '',  // String	所属单位/车主地址
				propertyType: '',  // String	所属单位/车主所有权类型
				driverLicRegisterTime: '',  // number	行驶证注册日期
				driverLicIssueTime: '',  // number	行驶证发证日期
				driverLicBeginTime: '',  // number	行驶证有效期起始日期
				driverLicExpiresTime: '',  // number	行驶证有效期截止日期
				driverLicPic: '',  // String	行驶证照片正本
				driverLicSidePic: '',  // String	行驶证照片副本
				roadTransportNo: '',  // String	道路运输许可证号
				roadTransportLicAnnualPeriod: '',  // number	道路运输许可证年审日期到
				businessScope: '',  // String	道路运输许可证经营范围
				roadTransportGoods: '',  // String	道路运输许可证许可运输品
				roadTransportGoodsIsPoisonous: false,  // String	道路运输许可证许可运输品是否剧毒
				roadTransportPic: '',  // String	道路运输许可证照片正本
				roadTransportSidePic: '',  // String	道路运输许可证照片副本
				gpsNetworkNo: '',  // String	GPS入网号
				gpsCardNo: '',  // String	GPS卡号
				gpsSerialNumber: '',  // String	GPS序列号
				gpsSetupTime: '',  // number	GPS安装时间
				gpsValidBeginDate: '',  // number	GPS有效期起始日期
				gpsValidEndDate: '',  // number	GPS有效期截止日期
				gpsCostAmount: '',  // String	GPS费用
				gpsType: '',  // String	GPS类型
				gpsEquippedCertifyPic: '',  // String	GPS照片1
				gpsEquippedCertifyPic2: '',  // String	GPS照片2
				saliInsuranceVendor: '',  // String	交强险保险公司
				saliInsuranceNo: '',  // String	交强险保险单号
				saliInsuranceExpires: '',  // number	交强险保险到期日
				saliInsuranceAmount: '',  // number	交强险保险金额
				saliInsuranceTaxAmount: '',  // number	交强险车船税金额
				saliInsurancePic: '',  // String	交强险照片1
				saliInsurancePic2: '',  // String	交强险照片2
				bizInsuranceNo: '',  // String	商业险保险单号
				bizInsuranceExpires: '',  // number	商业险保险到期日
				bizInsuranceAmount: '',  // number	商业险保险金额
				bizInsurancePic: '',  // String	商业险照片1
				bizInsurancePic2: '',  // String	商业险照片2
				carrierRiskInsuranceNo: '',  // String	承运险保险单号
				carrierRiskInsuranceExpires: '',  // number	承运险保险到期日
				carrierRiskInsuranceAmount: '',  // number	承运险保险金额
				carrierRiskInsurancePic: '',  // String	承运险照片1
				carrierRiskInsurancePic2: '',  // String	承运险照片2
				cargoInsuranceNo: '',  // String	货运险保险单号
				cargoInsuranceExpireDate: '',  // number	货运险保险到期日
				cargoInsuranceAmount: '',  // number	货运险保险金额
				insuranceNote: '',  // String	保险备注
				length: '',  // number	技术参数车厢长
				width: '',  // number	技术参数车厢宽
				high: '',  // number	技术参数车厢高
				loads: '',  // number	技术参数装载量载重
				loadVolume: '',  // number	技术参数装载量容积
				carBodyColor: '',  // String	技术参数车身颜色
				transportFunction: '',  // String	技术参数使用性质
				transportCategory: '',  // String	技术参数运输类别
				transportMedium: '',  // String	技术参数运输介质
				engineType: '',  // String	技术参数发动机型号
				engineNO: '',  // String	技术参数发动机号
				emissionStandard: '',  // String	技术参数排放标准
				accurateLoadType: '',  // String	技术参数准载类型
				personsCapacity: '',  // String	技术参数核载人数
				vehicleFrameNO: '',  // String	技术参数车辆识别代号/车架号
				carBrandModel: '',  // String	技术参数厂牌型号
				manufacturer: '',  // String	技术参数生产厂家
				truckGabarite: '',  // number	技术参数车牌外廓尺寸
				wheelTrack: '',  // number	技术参数车辆轮距
				axesNumber: '',  // number	技术参数车辆轴数
				wheelBase: '',  // number	技术参数轴距
				totalWeight: '',  // number	技术参数总质量
				approvedLoadCapacity: '',  // number	技术参数核定载质量
				curbWeight: '',  // number	技术参数整备质量
				tractiveTonnage: '',  // number	技术参数准牵引总质量
				signalLampInfo: '',  // String	技术参数标志灯牌编号及完好情况
				securityCardIssueDate: '',  // number	技术参数安全卡发放日期
				productionDate: '',  // number	技术参数出厂日期
				settleDate: '',  // number	技术参数落户日期
				cannedType: '',  // String	罐体类型
				tankVolume: '',  // number	罐体容积
				tankQCExpires: '',  // number	罐体检测有效期至
				safetyValvesQCExpires: '',  // number	罐体安全阀监测有效期至
				pressureGaugeQCExpires: '',  // number	罐体压力表监测有效期至
				cannedMonitorTableCertificatePic1: '',  // String	罐体照片1
				cannedMonitorTableCertificatePic2: '',  // String	罐体照片2
				securityDepositAmount: '',  // number	保证金金额
				securityDepositDate: '',  // number	保证金日期
				secondSecurityDepositAmount: '',  // number	保证金二次安全保证金金额
				secondSecurityDepositDate: '',  // number	保证金二次安全保证金日期
				securityDepositPayDate: '',  // number	保证金缴费日期
				securityDepositNote: '',  // String	保证金备注
				rank: '',  // String	技术等级等级评定
				rankEvaluteTime: '',  // 	技术等级评级日期
				nextRankEvaluteTime: '',  // 	技术等级下次评级日期
				rankRemark: '',  // String	技术等级审验备注
				technicalRankPic: '',  // String	技术等级照片正本
				technicalRankPic2: '',  // String	技术等级照片副本
				secondaMaintainTime: '',  // 	二级维护维护日期
				nextSecondLevel: '',  // String	二级维护下次维护
				managementAgreementAmount: '',  // number	管理协议金额
				managementAgreementPayDate: '',  // number	管理协议缴费日期
				managementAgreementBeginDate: '',  // number	管理协议有效期起始日期
				managementAgreementExpireDate: '',  // number	管理协议有效期截止日期
				safetyLiabilityLetterExpireDate: '',  // number	管理协议安全责任书到期日
				managementAgreementMoneyPerMonth: '',  // number	管理协议元/轴/月
				managementAgreementNote: '',  // String	管理协议协议备注
				purchaseInvoicePic: '',  // String	其他资料购车发票照片
				vehicleCertificatePic: '',  // String	其他资料整车合格证照片
				vehicleRegistrationCertificatePic: '',  // String	其他资料机动车登记证
				otherTruckPic1: '',  // String	其他资料照片1
				otherTruckPic2: '',  // String	其他资料照片2
				otherTruckPic3: ''  // String	其他资料照片3
			},
			rules: {
				code: [ { required: true , message: '请输入车辆编号'} ],
				truckCategory: [ { required: true , message: '请选择车辆类别'} ],
				plateNoColor: [ { required: true , message: '请选择车牌颜色'} ],
				trailerPlateNo: [ { required: true , message: '请输入挂车牌号码'}],
				trailerID: [ { required: true , message: '请选择挂车牌号码'}],
				plateNo: [ { required: true , message: '请输入车牌号码'}, { validator: checkPlateNo } ],
				truckType: [ { required: true , message: '请选择车牌类型'} ],
				cooperateRelation: [ { required: true , message: '请选择车辆归属'} ],
				length: [ { required: true , message: '请输入车长'}, { validator: checkInt } ],
				width: [ { required: true , message: '请输入车宽'}, { validator: checkInt } ],
				high: [ { required: true , message: '请输入车高'}, { validator: checkInt } ],
				loads: [ { required: true , message: '请输入车辆装载重量'}, { validator: checkInt } ],
				loadVolume: [ { required: true , message: '请输入车辆装载容积'}, { validator: checkInt } ],
				gpsCostAmount: [ { validator: checkFloat2 } ],
				saliInsuranceAmount: [ { validator: checkFloat2 } ],
				saliInsuranceTaxAmount: [ { validator: checkFloat2 } ],
				bizInsuranceAmount: [ { validator: checkFloat2 } ],
				carrierRiskInsuranceAmount: [ { validator: checkFloat2 } ],
				cargoInsuranceAmount: [ { validator: checkFloat2 } ],
				tankVolume: [ { validator: checkFloat2 } ],
				securityDepositAmount: [ { validator: checkFloat2 } ],
				secondSecurityDepositAmount: [ { validator: checkFloat2 } ],
				managementAgreementAmount: [ { validator: checkFloat2 } ],
				managementAgreementMoneyPerMonth: [ { validator: checkFloat2 } ]
			}
		}
	},
	components: { ImageUpload, DistPicker, SelectPosition },
	mounted() {
		LiftEffect({
			"control1": ".lift-nav", 	//侧栏电梯的容器
			"control2": ".lift",        //需要遍历的电梯的父元素
			"target": [
				".target1",
				".target2",
				".target3",
				".target4",
				".target5",
				".target6",
				".target7",
				".target8",
				".target9",
				".target10",
				".target11",
				".target12",
				".target13",
				".target14",
				".target15",
				".target16",
				".target17"
			], 							//监听的内容，注意一定要从小到大输入
			"current": "active" 		//选中的样式
		})
	},
	methods: {
		getPrimaryDriver(queryString, cb) {
			Truck.findDriverList({
				current: 1,
				size: 1000,
				type: 'driver',
				keyword: queryString
			}).then(res => {
				const list = res.records
				const idList = list.map(item => item.comSupercargoID)
				const index = idList.indexOf(this.truck.secondaryDriver)
				if ( index > -1 && this.truck.secondaryDriverName) list.splice(index, 1)
				cb(list)
			})
		},
		getSecondaryDriver(queryString, cb) {
			Truck.findDriverList({
				current: 1,
				size: 1000,
				type: 'driver',
				keyword: queryString
			}).then(res => {
				const list = res.records
				const idList = list.map(item => item.comSupercargoID)
				const index = idList.indexOf(this.truck.primaryDriver)
				if ( index > -1 && this.truck.primaryDriverName) list.splice(index, 1)
				cb(list)
			})
		},
		getTrailers(queryString, cb) {
			// this.truck.trailerID = ''
			Truck.find({
				current: 1,
				size: 1000,
				plateNo: queryString,
				truckCategory: 'Trailer'
			}).then(res => {
				cb(res.records)
			})
		},
		handSelectPrimaryDriver(data) { 
			this.truck.primaryDriver = data.comSupercargoID
			this.truck.primaryDriverName = data.realName
		},
		handSelectSecondaryDriver(data) { 
			this.truck.secondaryDriver = data.comSupercargoID
			this.truck.secondaryDriverName = data.realName
		},
		handleTruckFrontPic(res) { this.truck.truckFrontPic = res.length == 0 ? '' : res[0] },
		handleTruckSidePic1(res) { this.truck.truckSidePic1 = res.length == 0 ? '' : res[0] },
		handleTruckSidePic2(res) { this.truck.truckSidePic2 = res.length == 0 ? '' : res[0] },
		handleDriverLicPic(res) { this.truck.driverLicPic = res.length == 0 ? '' : res[0] },
		handleDriverLicSidePic(res) { this.truck.driverLicSidePic = res.length == 0 ? '' : res[0] },
		handleRoadTransportPic(res) { this.truck.roadTransportPic = res.length == 0 ? '' : res[0] },
		handleRoadTransportSidePic(res) { this.truck.roadTransportSidePic = res.length == 0 ? '' : res[0] },
		handleGpsEquippedCertifyPic(res) { this.truck.gpsEquippedCertifyPic = res.length == 0 ? '' : res[0] },
		handleGpsEquippedCertifyPic2(res) { this.truck.gpsEquippedCertifyPic2 = res.length == 0 ? '' : res[0] },
		handleSaliInsurancePic(res) { this.truck.saliInsurancePic = res.length == 0 ? '' : res[0] },
		handleSaliInsurancePic2(res) { this.truck.saliInsurancePic2 = res.length == 0 ? '' : res[0] },
		handleBizInsurancePic(res) { this.truck.bizInsurancePic = res.length == 0 ? '' : res[0] },
		handleBizInsurancePic2(res) { this.truck.bizInsurancePic2 = res.length == 0 ? '' : res[0] },
		handleCarrierRiskInsurancePic(res) { this.truck.carrierRiskInsurancePic = res.length == 0 ? '' : res[0] },
		handleCarrierRiskInsurancePic2(res) { this.truck.carrierRiskInsurancePic2 = res.length == 0 ? '' : res[0] },
		handleCannedMonitorTableCertificatePic1(res) { this.truck.cannedMonitorTableCertificatePic1 = res.length == 0 ? '' : res[0] },
		handleCannedMonitorTableCertificatePic2(res) { this.truck.cannedMonitorTableCertificatePic2 = res.length == 0 ? '' : res[0] },
		handleTechnicalRankPic(res) { this.truck.technicalRankPic = res.length == 0 ? '' : res[0] },
		handleTechnicalRankPic2(res) { this.truck.technicalRankPic2 = res.length == 0 ? '' : res[0] },
		handlePurchaseInvoicePic(res) { this.truck.purchaseInvoicePic = res.length == 0 ? '' : res[0] },
		handleVehicleCertificatePic(res) { this.truck.vehicleCertificatePic = res.length == 0 ? '' : res[0] },
		handleVehicleRegistrationCertificatePic(res) { this.truck.vehicleRegistrationCertificatePic = res.length == 0 ? '' : res[0] },
		handleOtherTruckPic1(res) { this.truck.otherTruckPic1 = res.length == 0 ? '' : res[0] },
		handleOtherTruckPic2(res) { this.truck.otherTruckPic2 = res.length == 0 ? '' : res[0] },
		handleOtherTruckPic3(res) { this.truck.otherTruckPic3 = res.length == 0 ? '' : res[0] },
		handSelectDriverLicTime(date) { 
			this.truck.driverLicBeginTime = date[0].getTime()
			this.truck.driverLicExpiresTime = date[1].getTime()
		},
		handSelectGpsValidDate(date) { 
			this.truck.gpsValidBeginDate = date[0].getTime()
			this.truck.gpsValidEndDate = date[1].getTime()
		},
		handSelectManagementAgreementDate(date) { 
			this.truck.managementAgreementBeginDate = date[0].getTime()
			this.truck.managementAgreementExpireDate = date[1].getTime()
		},
		handSelectTrailer(data) {
			this.truck.trailerPlateNo = data.plateNo
			this.truck.trailerID = data.truckID
		},
		handSelectTruckCategory() {
			this.truck.truckType = ''
			this.truck.trailerID = ''
			this.truck.trailerPlateNo = ''
		},
		save() {
			this.truck.roadTransportGoodsIsPoisonous = this.truck.roadTransportGoodsIsPoisonous ? 'Y' : 'N'
			if (!this.truck.primaryDriverName) this.truck.primaryDriver = ''
			if (!this.truck.secondaryDriverName) this.truck.secondaryDriver = ''
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) {
					this.$nextTick(() => {
						Message.error($('.el-form-item__error:first').text())
						return
					})
				} else {
					Truck.add(this.truck).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'truck'})
					})
				}
			})
		},
		back() {
			this.$router.go(-1)
		}
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