<template>
	<div class="main-content">
		<el-form label-width="110px" size="mini" :model="truck" :rules="rules" ref="ruleForm" >
			<el-card class="box-card">
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">基本信息</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="姓名">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="性别">
									<el-select placeholder="请选择" style="width:100%" >
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="联系方式">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="合作关系">
									<el-select placeholder="请选择" style="width:100%" >
										<el-option label="自有" value="1"></el-option>
										<el-option label="挂靠" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="住址">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="合同有效期">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="职称/技术等级">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="备注">
									<el-input type="textarea" :rows="3" resize="none"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="个人照片">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>正面</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">身份证</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="身份证号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="身份证有效期">
									<el-date-picker
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="身份证照片">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>正面</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>背面</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
				<el-row class="section-block">
					<span class="block-title">卫生员合格证</span>
					<div class="block-content">
						<el-row >
							<el-col :span="24">
								<el-form-item label="卫生合格证照片">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>正面</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="1"/>
										<p>背面</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<span>从事运输岗位</span>
				<el-checkbox-group v-model="Position" @change="positionChange">
					<el-checkbox label="驾驶员"></el-checkbox>
					<el-checkbox label="押运员"></el-checkbox>
				</el-checkbox-group>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>驾驶员</span>
				</div>
				<el-row class="section-block" style="margin-bottom:20px">
					<span class="block-title">驾驶证</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="驾驶证号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="档案编号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="准驾车型">
									<el-select placeholder="请选择" style="width:100%" >
										<option value="请选择">请选择</option>
										<option label="A1" value="A1"></option>
										<option label="A2" value="A2"></option>
										<option label="A3" value="A3"></option>
										<option label="B1" value="B1"></option>
										<option label="B2" value="B2"></option>
										<option label="C1" value="C1"></option>
										<option label="C2" value="C2"></option>
										<option label="C3" value="C3"></option>
										<option label="C4" value="C4"></option>
										<option label="C5" value="C5"></option>
										<option label="D" value="D"></option>
										<option label="E" value="E"></option>
										<option label="F" value="F"></option>
										<option label="M" value="M"></option>
										<option label="N" value="N"></option>
										<option label="P" value="P"></option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="初次领证日期">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="驾驶证有效期">
									<el-date-picker
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="驾驶证照片">
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
					<span class="block-title">危货从业资格证</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="证号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="编号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="准驾车型">
									<el-select placeholder="请选择" style="width:100%" >
										<option value="请选择">请选择</option>
										<option label="A1" value="A1"></option>
										<option label="A2" value="A2"></option>
										<option label="A3" value="A3"></option>
										<option label="B1" value="B1"></option>
										<option label="B2" value="B2"></option>
										<option label="C1" value="C1"></option>
										<option label="C2" value="C2"></option>
										<option label="C3" value="C3"></option>
										<option label="C4" value="C4"></option>
										<option label="C5" value="C5"></option>
										<option label="D" value="D"></option>
										<option label="E" value="E"></option>
										<option label="F" value="F"></option>
										<option label="M" value="M"></option>
										<option label="N" value="N"></option>
										<option label="P" value="P"></option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="是否新证">
									<el-switch></el-switch>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="初次领证日期">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="驾驶证有效期">
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
								<el-form-item label="从业资格类别">
									<el-select placeholder="请选择" style="width:100%" >
										<el-option label="类别1" value="1"></el-option>
										<el-option label="类别2" value="2"></el-option>
										<el-option label="类别3" value="3"></el-option>
									</el-select>
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
				<el-row :gutter="20" style="margin-bottom:20px">
					<el-col :span="12">
						<div class="section-block">
							<span class="block-title">驾驶员继续再教育合格证</span>
							<div class="block-content">
								<el-row >
									<el-col :span="24">
										<el-form-item label="继续教育时间">
											<el-date-picker
											type="year"
											placeholder="选择日期" style="width:100%">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row >
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
							<span class="block-title">诚信考核记录</span>
							<div class="block-content">
								<el-row >
									<el-col :span="24">
										<el-form-item label="诚信等级">
											<el-select placeholder="请选择" style="width:100%" >
												<el-option label="1" value="1"></el-option>
												<el-option label="2" value="2"></el-option>
												<el-option label="3" value="3"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-col :span="24">
									<el-form-item label="合格至">
										<el-date-picker
										type="date"
										placeholder="选择日期" style="width:100%">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-row >
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
				<el-row :gutter="20">
					<el-col :span="8">
						<div class="section-block">
							<span class="block-title">违章和记分记录</span>
							<div class="block-content">
								<el-row >
									<el-col :span="24">
										<el-form-item label="照片" label-width="40px">
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
					<el-col :span="8">
						<div class="section-block">
							<span class="block-title">三年无重大交通事故证明</span>
							<div class="block-content">
								<el-row >
									<el-col :span="24">
										<el-form-item label="照片" label-width="40px">
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
					<el-col :span="8">
						<div class="section-block">
							<span class="block-title">驾驶员身体条件证明</span>
							<div class="block-content">
								<el-row >
									<el-col :span="24">
										<el-form-item label="照片" label-width="40px">
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
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>押运员信息</span>
				</div>
				<el-row class="section-block">
					<span class="block-title">押运员从业资格证</span>
					<div class="block-content">
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="证号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="编号">
									<el-input></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20" >
							<el-col :span="12">
								<el-form-item label="从业资格类别">
									<el-select placeholder="请选择" style="width:100%" >
										<el-option label="类别1" value="1"></el-option>
										<el-option label="类别2" value="2"></el-option>
										<el-option label="类别3" value="3"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="准驾车型">
									<el-select placeholder="请选择" style="width:100%" >
										<option value="请选择">请选择</option>
										<option label="A1" value="A1"></option>
										<option label="A2" value="A2"></option>
										<option label="A3" value="A3"></option>
										<option label="B1" value="B1"></option>
										<option label="B2" value="B2"></option>
										<option label="C1" value="C1"></option>
										<option label="C2" value="C2"></option>
										<option label="C3" value="C3"></option>
										<option label="C4" value="C4"></option>
										<option label="C5" value="C5"></option>
										<option label="D" value="D"></option>
										<option label="E" value="E"></option>
										<option label="F" value="F"></option>
										<option label="M" value="M"></option>
										<option label="N" value="N"></option>
										<option label="P" value="P"></option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="初次领证日期">
									<el-date-picker
									type="date"
									placeholder="选择日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="驾驶证有效期">
									<el-date-picker
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期" style="width:100%">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row >
							<el-col :span="24">
								<el-form-item label="照片">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="5"/>
										<p>正本</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="5"/>
										<p>副本</p>
									</div>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<el-row class="section-block">
					<span class="block-title">其他</span>
					<div class="block-content">
						<el-row >
							<el-col :span="24">
								<el-form-item label="照片" label-width="40px">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="80" :height="80" :limitNum="6"/>
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
import ImageUpload from '../../CommonComponents/ImageUpload'

export default {
	data() {
		return {
			Position:[]
		}
	},
	methods: {
		positionChange(){

		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload
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