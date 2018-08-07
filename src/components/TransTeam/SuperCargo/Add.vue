<template>
	<div class="main-content" style="padding-left:200px">
		<el-form label-width="126px" size="mini" :model="superCargo" :rules="rules" ref="ruleForm" >
			<el-card class="box-card">
				<el-row class="section-block target1" style="margin-bottom:20px">
					<span class="block-title">基本信息</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="姓名" prop="realName">
									<el-input v-model="superCargo.realName"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="性别" prop="sex">
									<el-select placeholder="请选择" style="width:100%" v-model="superCargo.sex">
										<el-option label="男" value="M"></el-option>
										<el-option label="女" value="F"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="联系方式" prop="mobile">
									<el-input v-model="superCargo.mobile"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="合作关系" prop="cooperateRelation">
									<el-select placeholder="请选择" style="width:100%" v-model="superCargo.cooperateRelation">
										<el-option label="挂靠" value="Attach"></el-option>
										<el-option label="自有" value="Self"></el-option>
										<el-option label="社会" value="Social"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="住址" prop="homeAddress">
									<el-input v-model="superCargo.homeAddress"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="合同有效期">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date" 
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp" 
										v-model="superCargo.laborContractEndTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="职称/技术等级" prop="titleLever">
									<el-input v-model="superCargo.titleLever"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="备注" prop="remark">
									<el-input type="textarea" :rows="3" resize="none" v-model="superCargo.remark"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="个人照片">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.headPic]" 
											@imgUrlBack="handleHeadPic">
										</ImageUpload>
										<p>正面</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target2" style="margin-bottom:20px">
					<span class="block-title">身份证</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="身份证号" prop="idCardNum">
									<el-input v-model="superCargo.idCardNum" @blur="setIDCard"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="有效期从" prop="idCardBeginTime">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate}"
										type="date"
										style="width:100%" 
										value-format="timestamp" 
										v-model="superCargo.idCardBeginTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="有效期至" prop="idCardExpirationTime">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate}"
										type="date"
										style="width:100%" 
										value-format="timestamp" 
										v-model="superCargo.idCardExpirationTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="身份证照片" prop="idCardFrontUrl">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.idCardFrontUrl]" 
											@imgUrlBack="handleIdCardFrontUrl">
										</ImageUpload>
										<p>正面</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.idCardBackUrl]" 
											@imgUrlBack="handleIdCardBackUrl">
										</ImageUpload>
										<p>背面</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target3">
					<span class="block-title">卫生员合格证</span>
					<div class="block-content">
						<el-row >
							<el-col :span="24">
								<el-form-item label="卫生合格证照片">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.hygienistsCertificateOfApprovalPic1]" 
											@imgUrlBack="handleHygienistsCertificateOfApprovalPic1">
										</ImageUpload>
										<p>正面</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.hygienistsCertificateOfApprovalPic2]" 
											@imgUrlBack="handleHygienistsCertificateOfApprovalPic2">
										</ImageUpload>
										<p>背面</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<span style="position:relative;top:20px">从事运输岗位<span style="color:red;position:relative;left:5px">*</span></span>
				<el-form-item prop="supercargoType">
					<el-checkbox-group v-model="supercargoType" @change="supercargoTypeChange">
						<el-checkbox label="Driver">驾驶员</el-checkbox>
						<el-checkbox label="Supercargo">押运员</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-card>
			<el-card class="box-card" v-show="supercargoType.includes('Driver')">
				<div slot="header" class="clearfix"><span>驾驶员</span></div>
				<el-row class="section-block target4" style="margin-bottom:20px;min-height:280px">
					<span class="block-title">驾驶证</span>
					<div class="block-content" v-if="supercargoType.includes('Driver')">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="驾驶证号" prop="driverLicenseNum">
									<el-input v-model="superCargo.driverLicenseNum"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="档案编号" prop="driverLicenseCode">
									<el-input v-model="superCargo.driverLicenseCode"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="准驾车型" prop="quasiDrivingType">
									<el-select placeholder="请选择" style="width:100%" v-model="superCargo.quasiDrivingType">
										<el-option label="A1" value="A1"></el-option>
										<el-option label="A2" value="A2"></el-option>
										<el-option label="A3" value="A3"></el-option>
										<el-option label="B1" value="B1"></el-option>
										<el-option label="B2" value="B2"></el-option>
										<el-option label="C1" value="C1"></el-option>
										<el-option label="C2" value="C2"></el-option>
										<el-option label="C3" value="C3"></el-option>
										<el-option label="C4" value="C4"></el-option>
										<el-option label="C5" value="C5"></el-option>
										<el-option label="D" value="D"></el-option>
										<el-option label="E" value="E"></el-option>
										<el-option label="F" value="F"></el-option>
										<el-option label="M" value="M"></el-option>
										<el-option label="N" value="N"></el-option>
										<el-option label="P" value="P"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="初次领证日期" prop="driverLicenseFirstTime">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp" 
										v-model="superCargo.driverLicenseFirstTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="有效期从" prop="driverLicenseBeginTime">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate}"
										type="date"
										style="width:100%" 
										value-format="timestamp"
										v-model="superCargo.driverLicenseBeginTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="有效期至" prop="driverLicenseEndTime">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate}"
										type="date"
										style="width:100%" 
										value-format="timestamp"
										v-model="superCargo.driverLicenseEndTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="驾驶证照片" prop="driverLicFrontUrl">
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.driverLicFrontUrl]" 
											@imgUrlBack="handleDriverLicFrontUrl">
										</ImageUpload>
										<p>正本</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.driverLicCopyFrontUrl]" 
											@imgUrlBack="handleDriverLicCopyFrontUrl">
										</ImageUpload>
										<p>副本</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block target5" style="margin-bottom:20px">
					<span class="block-title">危货从业资格证</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="证号" prop="qualificationNum">
									<el-input v-model="superCargo.qualificationNum"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="编号" prop="qualificationCode">
									<el-input v-model="superCargo.qualificationCode"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="准驾车型">
									<el-select placeholder="请选择" style="width:100%" v-model="superCargo.qualificationQuasiDrivingType">
										<el-option label="A1" value="A1"></el-option>
										<el-option label="A2" value="A2"></el-option>
										<el-option label="A3" value="A3"></el-option>
										<el-option label="B1" value="B1"></el-option>
										<el-option label="B2" value="B2"></el-option>
										<el-option label="C1" value="C1"></el-option>
										<el-option label="C2" value="C2"></el-option>
										<el-option label="C3" value="C3"></el-option>
										<el-option label="C4" value="C4"></el-option>
										<el-option label="C5" value="C5"></el-option>
										<el-option label="D" value="D"></el-option>
										<el-option label="E" value="E"></el-option>
										<el-option label="F" value="F"></el-option>
										<el-option label="M" value="M"></el-option>
										<el-option label="N" value="N"></el-option>
										<el-option label="P" value="P"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="是否新证">
									<el-switch v-model="superCargo.qualificationIsNewest"></el-switch>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="初次领证日期">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp" 
										v-model="superCargo.qualificationIssueDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="从业资格类别">
									<el-select placeholder="请选择" style="width:100%" v-model="superCargo.qualificationType">
										<el-option label="类型1" value="类型1"></el-option>
										<el-option label="类型2" value="类型2"></el-option>
										<el-option label="类型3" value="类型3"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="有效期从">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate}"
										type="date"
										style="width:100%" 
										value-format="timestamp"
										v-model="superCargo.qualificationBeginDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="有效期至">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate}"
										type="date"
										style="width:100%" 
										value-format="timestamp"
										v-model="superCargo.qualificationExpirationDate">
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
											:files="[superCargo.qualificationFirstPage]" 
											@imgUrlBack="handleQualificationFirstPage">
										</ImageUpload>
										<p>照片1</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.qualificationSecondPage]" 
											@imgUrlBack="handleQualificationSecondPage">
										</ImageUpload>
										<p>照片2</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.qualificationThirdPage]" 
											@imgUrlBack="handleQualificationThirdPage">
										</ImageUpload>
										<p>照片3</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row :gutter="20" class="target6" style="margin-bottom:20px">
					<el-col :span="12">
						<div class="section-block">
							<span class="block-title">驾驶员继续再教育合格证</span>
							<div class="block-content">
								<el-form-item label="继续教育时间">
									<el-date-picker
										type="year"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp" 
										v-model="superCargo.continueEducationCertificationEndDate">
									</el-date-picker>
								</el-form-item>
								<el-row >
									<el-form-item label="照片">
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.continueEducationCertificationPic1]" 
												@imgUrlBack="handleContinueEducationCertificationPic1">
											</ImageUpload>
											<p>照片1</p>
										</div>
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.continueEducationCertificationPic2]" 
												@imgUrlBack="handleContinueEducationCertificationPic2">
											</ImageUpload>
											<p>照片2</p>
										</div>
									</el-form-item>
								</el-row>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="section-block">
							<span class="block-title">诚信考核记录</span>
							<div class="block-content">
								<el-form-item label="诚信等级">
									<el-select placeholder="请选择" style="width:100%" v-model="superCargo.integrityExamineGrade">
										<el-option label="无" value="无"></el-option>
										<el-option label="A" value="A"></el-option>
										<el-option label="AA" value="AA"></el-option>
										<el-option label="AAA" value="AAA"></el-option>
										<el-option label="AAAA" value="AAAA"></el-option>
										<el-option label="AAAAA" value="AAAAA"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="合格至">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp" 
										v-model="superCargo.integrityExamineEndTime">
									</el-date-picker>
								</el-form-item>
								<el-row >
									<el-form-item label="照片">
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.integrityExaminePic1]" 
												@imgUrlBack="handleIntegrityExaminePic1">
											</ImageUpload>
											<p>照片1</p>
										</div>
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.integrityExaminePic2]" 
												@imgUrlBack="handleIntegrityExaminePic2">
											</ImageUpload>
											<p>照片2</p>
										</div>
									</el-form-item>
								</el-row>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" class="target7">
					<el-col :span="8">
						<div class="section-block">
							<span class="block-title">违章和记分记录</span>
							<div class="block-content">
								<el-row >
									<el-form-item label="照片" label-width="40px">
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.endorsementPic1]" 
												@imgUrlBack="handleEndorsementPic1">
											</ImageUpload>
											<p>照片1</p>
										</div>
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.endorsementPic2]" 
												@imgUrlBack="handleEndorsementPic2">
											</ImageUpload>
											<p>照片2</p>
										</div>
									</el-form-item>
								</el-row>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="section-block">
							<span class="block-title">三年无重大交通事故证明</span>
							<div class="block-content">
								<el-row >
									<el-form-item label="照片" label-width="40px">
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.noMajorAccidentsIn3YearsPic1]" 
												@imgUrlBack="handleNoMajorAccidentsIn3YearsPic1">
											</ImageUpload>
											<p>照片1</p>
										</div>
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.noMajorAccidentsIn3YearsPic2]" 
												@imgUrlBack="handleNoMajorAccidentsIn3YearsPic2">
											</ImageUpload>
											<p>照片2</p>
										</div>
									</el-form-item>
								</el-row>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="section-block">
							<span class="block-title">驾驶员身体条件证明</span>
							<div class="block-content">
								<el-row >
									<el-form-item label="照片" label-width="40px">
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.driverHealthCertificatePic1]" 
												@imgUrlBack="handleDriverHealthCertificatePic1">
											</ImageUpload>
											<p>照片1</p>
										</div>
										<div class="uploadTruckPicItem">
											<ImageUpload 
												:width="80" :height="80" 
												:files="[superCargo.driverHealthCertificatePic2]" 
												@imgUrlBack="handleDriverHealthCertificatePic2">
											</ImageUpload>
											<p>照片2</p>
										</div>
									</el-form-item>
								</el-row>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-card>
			<el-card class="box-card" v-show="supercargoType.includes('Supercargo')">
				<div slot="header" class="clearfix"><span>押运员信息</span></div>
				<el-row class="section-block target8">
					<span class="block-title">押运员从业资格证</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="证号" prop="escortLicenseNum">
									<el-input v-model="superCargo.escortLicenseNum"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="编号" prop="escortLicenseCode">
									<el-input v-model="superCargo.escortLicenseCode"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="从业资格类别">
									<el-select placeholder="请选择" style="width:100%" v-model="superCargo.escortLicenseType">
										<el-option label="类型1" value="类型1"></el-option>
										<el-option label="类型2" value="类型2"></el-option>
										<el-option label="类型3" value="类型3"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="准驾车型">
									<el-select placeholder="请选择" style="width:100%" v-model="superCargo.escortLicenseQuasiDrivingType">
										<el-option label="A1" value="A1"></el-option>
										<el-option label="A2" value="A2"></el-option>
										<el-option label="A3" value="A3"></el-option>
										<el-option label="B1" value="B1"></el-option>
										<el-option label="B2" value="B2"></el-option>
										<el-option label="C1" value="C1"></el-option>
										<el-option label="C2" value="C2"></el-option>
										<el-option label="C3" value="C3"></el-option>
										<el-option label="C4" value="C4"></el-option>
										<el-option label="C5" value="C5"></el-option>
										<el-option label="D" value="D"></el-option>
										<el-option label="E" value="E"></el-option>
										<el-option label="F" value="F"></el-option>
										<el-option label="M" value="M"></el-option>
										<el-option label="N" value="N"></el-option>
										<el-option label="P" value="P"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="初次领证日期">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate }"
										type="date"
										placeholder="选择日期" 
										style="width:100%" 
										value-format="timestamp" 
										v-model="superCargo.escortLicenseFirstTime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="有效期从">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() < curDate}"
										type="date"
										style="width:100%" 
										value-format="timestamp"
										v-model="superCargo.escortLicenseBeginDate">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="有效期至">
									<el-date-picker 
										:picker-options="{ disabledDate: (curDate) => new Date() > curDate}"
										type="date"
										style="width:100%" 
										value-format="timestamp"
										v-model="superCargo.escortLicenseExpireDate">
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
											:files="[superCargo.escortLicensePic1]" 
											@imgUrlBack="handleEscortLicensePic1">
										</ImageUpload>
										<p>正本</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload 
											:width="80" :height="80" 
											:files="[superCargo.escortLicensePic2]" 
											@imgUrlBack="handleEscortLicensePic2">
										</ImageUpload>
										<p>副本</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<el-row class="section-block target9">
					<span class="block-title">其他</span>
					<div class="block-content">
						<el-form-item label="照片" label-width="40px" prop="otherPic1">
							<ImageUpload 
								:width="80" :height="80" 
								:limitNum="4" 
								:files="otherPic" 
								@imgUrlBack="handleOtherPic">
							</ImageUpload>
						</el-form-item>
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
import LiftEffect from '../../../common/LiftEffect'
import ImageUpload from '../../CommonComponents/ImageUpload'
import SelectPosition from '../components/SelectPosition'
import SuperCargo from '../../../api/SuperCargo'
import { checkTel, checkIDCard, checkDriverLicenseNum } from '../../../common/validator'
export default {
	data() {
		return {
			titleList: [
				'基本信息',
				'身份证',
				'卫生合格证',
				'驾驶证',
				'危货从业资格证',
				'驾驶员继续再教育合格证',
				'违章和记分记录',
				'押运员从业资格证',
				'其他'
			],
			supercargoType: [],
			idCardTime: [],
			driverLicenseTime: [],
			qualificationDate: [],
			escortLicenseDate: [],
			otherPic: [],
			superCargo: {
				realName: '',    // String	姓名
				sex: '',    // String	性别 M-男 F-女
				mobile: '',    // String	联系方式
				cooperateRelation: '',    // String	合作关系
				homeAddress: '',   // String	住址
				laborContractEndTime: '',   // number	合同有效期
				titleLever: '',   // String	技术登记
				remark: '',   // String	备注
				headPic: '',   // String	个人照片
				idCardNum: '',    // String	身份证号
				idCardBeginTime: '',    // number	身份证有效期起始日期
				idCardExpirationTime: '',    // number	身份证有效期截止日期
				idCardFrontUrl: '',    // String	身份证照片正面
				idCardBackUrl: '',    // String	身份证照片背面
				hygienistsCertificateOfApprovalPic1: '',    // String	卫生合格证照片正面
				hygienistsCertificateOfApprovalPic2: '',    // String	卫生合格证照片背面
				supercargoType: '',    // String	从事运输岗位 Driver-驾驶员 Supercargo-押运员 SupercargoDriver-押运员、驾驶员
				driverLicenseNum: '',    // String	驾驶证号
				driverLicenseCode: '',    // String	驾驶证档案编号
				quasiDrivingType: '',    // String	驾驶证准驾车型
				driverLicenseFirstTime: '',    // number	驾驶证初次领证日期
				driverLicenseBeginTime: '',    // number	驾驶证有效期起始日期
				driverLicenseEndTime: '',    // number	驾驶证有效期截止日期
				driverLicFrontUrl: '',    // String	驾驶证照片正本
				driverLicCopyFrontUrl: '',    // String	驾驶证照片副本
				qualificationNum: '',   // String	危货从业资格证证号
				qualificationCode: '',   // String	危货从业资格证编号
				qualificationQuasiDrivingType: '',   // String	危货从业资格证准驾车型
				qualificationIsNewest: '',   // String	危货从业资格证是否新证
				qualificationIssueDate: '',   // number	危货从业资格证初次领证日期
				qualificationBeginDate: '',   // number	危货从业资格证有效期起始日期
				qualificationExpirationDate: '',   // number	危货从业资格证有效期截止日期
				qualificationType: '',   // String	危货从业资格证从业资格证类别
				qualificationFirstPage: '',   // String	危货从业资格证照片1
				qualificationSecondPage: '',   // String	危货从业资格证照片2
				qualificationThirdPage: '',   // String	危货从业资格证照片3
				continueEducationCertificationEndDate: '',   // number	驾驶员继续再教育合格证继续教育时间
				continueEducationCertificationPic1: '',   // String	驾驶员继续再教育合格证照片1
				continueEducationCertificationPic2: '',   // String	驾驶员继续再教育合格证照片2
				integrityExamineGrade: '',   // String	诚信考核记录诚信等级
				integrityExamineEndTime: '',   // number	诚信考核记录合格至
				integrityExaminePic1: '',   // String	诚信考核记录照片1
				integrityExaminePic2: '',   // String	诚信考核记录照片2
				endorsementPic1: '',   // String	违章和记分记录照片1
				endorsementPic2: '',   // String	违章和记分记录照片2
				noMajorAccidentsIn3YearsPic1: '',   // String	三年无重大交通事故证明照片1
				noMajorAccidentsIn3YearsPic2: '',   // String	三年无重大交通事故证明照片2
				escortLicenseNum: '',   // String	押运员从业资格证证号
				escortLicenseCode: '',   // String	押运员从业资格证编号
				escortLicenseType: '',   // String	押运员从业资格证从业资格类别
				escortLicenseQuasiDrivingType: '',   // String	押运员从业资格证准驾车型
				escortLicenseFirstTime: '',   // number	押运员从业资格证初次领证日期
				escortLicenseBeginDate: '',   // number	押运员从业资格证有效期起始日期
				escortLicenseExpireDate: '',   // number	押运员从业资格证有效期截止日期
				escortLicensePic1: '',   // String	押运员从业资格证照片正本
				escortLicensePic2: '',   // String	押运员从业资格证照片副本
				otherPic1: ''   // String	其他照片1
			},
			rules: {
				realName: [ { required: true , message: '请输入姓名'} ],
				sex: [ { required: true , message: '请选择性别'} ],
				mobile: [ { required: true , message: '请输入联系方式'}, { validator: checkTel } ],
				cooperateRelation: [ { required: true , message: '请选择合作方式'} ],
				homeAddress: [ {min: 1, max: 50, message: '长度在 1 到 50 个字符'} ],
				titleLever: [ {min: 1, max: 20, message: '长度在 1 到 20 个字符'} ],
				remark: [ {min: 1, max: 100, message: '长度在 1 到 100 个字符'} ],
				idCardNum: [ { required: true , message: '请输入身份证号'}, { validator: checkIDCard } ],
				idCardBeginTime: [ { required: true , message: '请选择身份证开始有效期'} ],
				idCardExpirationTime: [ { required: true , message: '请选择身份证结束有效期'} ],
				idCardFrontUrl: [ { required: true , message: '请上传身份证照片'} ],
				driverLicenseNum: [ { required: true , message: '请输入驾驶证号'}, { validator: checkDriverLicenseNum } ],
				driverLicenseCode: [ { required: true , message: '请输入档案编号'}, {min: 1, max: 50, message: '长度在 1 到 50 个字符'} ],
				quasiDrivingType: [ { required: true , message: '请选择准驾车型'} ],
				driverLicenseFirstTime: [ { required: true , message: '请选择初次领证日期'} ],
				driverLicenseBeginTime: [ { required: true , message: '请选择开始有效期'} ],
				driverLicenseEndTime: [ { required: true , message: '请选择结束有效期'} ],
				driverLicFrontUrl: [ { required: true , message: '请上传驾驶证照片'} ],
				qualificationNum: [ {min: 1, max: 50, message: '长度在 1 到 50 个字符'} ],
				qualificationCode: [ {min: 1, max: 50, message: '长度在 1 到 50 个字符'} ],
				escortLicenseNum: [ {min: 1, max: 50, message: '长度在 1 到 50 个字符'} ],
				escortLicenseCode: [ {min: 1, max: 50, message: '长度在 1 到 50 个字符'} ]
			}
		}
	},
	components: { ImageUpload, SelectPosition },
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
				".target9"
			], 							//监听的内容，注意一定要从小到大输入
			"current": "active" 		//选中的样式
		})
	},
	methods: {
		setIDCard() {
			this.superCargo.driverLicenseNum = this.superCargo.idCardNum
		},
		handleHeadPic(res) { this.superCargo.headPic = res.length == 0 ? '' : res[0] },
		handleIdCardFrontUrl(res) { this.superCargo.idCardFrontUrl = res.length == 0 ? '' : res[0] },
		handleIdCardBackUrl(res) { this.superCargo.idCardBackUrl = res.length == 0 ? '' : res[0] },
		handleHygienistsCertificateOfApprovalPic1(res) { this.superCargo.hygienistsCertificateOfApprovalPic1 = res.length == 0 ? '' : res[0] },
		handleHygienistsCertificateOfApprovalPic2(res) { this.superCargo.hygienistsCertificateOfApprovalPic2 = res.length == 0 ? '' : res[0] },
		handleDriverLicFrontUrl(res) { this.superCargo.driverLicFrontUrl = res.length == 0 ? '' : res[0] },
		handleDriverLicCopyFrontUrl(res) { this.superCargo.driverLicCopyFrontUrl = res.length == 0 ? '' : res[0] },
		handleQualificationFirstPage(res) { this.superCargo.qualificationFirstPage = res.length == 0 ? '' : res[0] },
		handleQualificationSecondPage(res) { this.superCargo.qualificationSecondPage = res.length == 0 ? '' : res[0] },
		handleQualificationThirdPage(res) { this.superCargo.qualificationThirdPage = res.length == 0 ? '' : res[0] },
		handleContinueEducationCertificationPic1(res) { this.superCargo.continueEducationCertificationPic1 = res.length == 0 ? '' : res[0] },
		handleContinueEducationCertificationPic2(res) { this.superCargo.continueEducationCertificationPic2 = res.length == 0 ? '' : res[0] },
		handleIntegrityExaminePic1(res) { this.superCargo.integrityExaminePic1 = res.length == 0 ? '' : res[0] },
		handleIntegrityExaminePic2(res) { this.superCargo.integrityExaminePic2 = res.length == 0 ? '' : res[0] },
		handleEndorsementPic1(res) { this.superCargo.endorsementPic1 = res.length == 0 ? '' : res[0] },
		handleEndorsementPic2(res) { this.superCargo.endorsementPic2 = res.length == 0 ? '' : res[0] },
		handleNoMajorAccidentsIn3YearsPic1(res) { this.superCargo.noMajorAccidentsIn3YearsPic1 = res.length == 0 ? '' : res[0] },
		handleNoMajorAccidentsIn3YearsPic2(res) { this.superCargo.noMajorAccidentsIn3YearsPic2 = res.length == 0 ? '' : res[0] },
		handleDriverHealthCertificatePic1(res) { this.superCargo.driverHealthCertificatePic1 = res.length == 0 ? '' : res[0] },
		handleDriverHealthCertificatePic2(res) { this.superCargo.driverHealthCertificatePic2 = res.length == 0 ? '' : res[0] },
		handleEscortLicensePic1(res) { this.superCargo.escortLicensePic1 = res.length == 0 ? '' : res[0] },
		handleEscortLicensePic2(res) { this.superCargo.escortLicensePic2 = res.length == 0 ? '' : res[0] },
		handleOtherPic(res) { 
			this.otherPic = res
			this.superCargo.otherPic1 = res.join(',')
		},
		handSelectIdCardTime(date) { 
			this.superCargo.idCardBeginTime = date[0].getTime()
			this.superCargo.idCardExpirationTime = date[1].getTime()
		},
		handDriverLicenseTime(date) {
			this.superCargo.driverLicenseBeginTime = date[0].getTime()
			this.superCargo.driverLicenseEndTime = date[1].getTime()
		},
		handQualificationDate(date) {
			this.superCargo.qualificationBeginDate = date[0].getTime()
			this.superCargo.qualificationExpirationDate = date[1].getTime()
		},
		handSelectEscortLicenseDate(date) {
			this.superCargo.escortLicenseBeginDate = date[0].getTime()
			this.superCargo.escortLicenseExpireDate = date[1].getTime()
		},
		supercargoTypeChange(data) {
			this.superCargo.supercargoType = data.length == 2 ? 'SupercargoDriver' : data.join('')
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
					".target9"
				], 							//监听的内容，注意一定要从小到大输入
				"current": "active" 		//选中的样式
			})
		},
		save() {
			this.superCargo.qualificationIsNewest = this.superCargo.qualificationIsNewest ? 'Y' : 'N'
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) {
					this.$nextTick(() => {
						Message.error($('.el-form-item__error:first').text())
						return
					})
				} else {
					if (!this.superCargo.supercargoType) {
						Message.error('必须选择从事运输岗位！')
						return
					}
					SuperCargo.add(this.superCargo).then(res => {
						Message.success(res.data.msg)
						this.$router.push({name: 'supercargo'})
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
.el-checkbox-group
	display inline-block
	margin-left 40px
</style>