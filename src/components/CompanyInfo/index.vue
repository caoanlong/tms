<template>
	<div class="main-content">
		<div class="wf-card">
			<el-form label-width="140px" size="small">
				<div class="section-block">
					<span class="block-title">基本信息</span>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="企业名称">
								<el-input placeholder="请输入企业名称"></el-input>
							</el-form-item>
							<el-form-item label="定位地址">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="详细地址">
								<el-input placeholder="请输入详细地址"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="企业Logo">
								<ImageUpload :limitNum="1"></ImageUpload>
								<p class="tips">上传的企业Logo，将在点击底部保存按钮保存后生效</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="负责人">
								<el-input placeholder="请输入负责人"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话">
								<el-input placeholder="请输入联系电话"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="邮政编码">
								<el-input placeholder="请输入邮政编码"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱">
								<el-input placeholder="请输入邮箱"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="传真">
								<el-input placeholder="请输入传真"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="客服电话">
								<el-input placeholder="请输入客服电话"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="企业类型">
								<el-select style="width: 100%" placeholder="请选择企业类型">
									<el-option label="其他" value="其他"></el-option>
									<el-option label="原材料生产商" value="原材料生产商"></el-option>
									<el-option label="制造厂商" value="制造厂商"></el-option>
									<el-option label="贸易商" value="贸易商"></el-option>
									<el-option label="分销商" value="分销商"></el-option>
									<el-option label="物流企业" value="物流企业"></el-option>
									<el-option label="个体经营者" value="个体经营者"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="所属行业">
								<el-select style="width: 100%" placeholder="请选择所属行业">
									<el-option label="其他" value="其他"></el-option>
									<el-option label="危险品" value="危险品"></el-option>
									<el-option label="快消品" value="快消品"></el-option>
									<el-option label="生鲜冷链" value="生鲜冷链"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="经营类型">
								<el-select style="width: 100%" placeholder="请选择经营类型">
									<el-option label="经营类型1" value="经营类型1"></el-option>
									<el-option label="经营类型2" value="经营类型2"></el-option>
									<el-option label="经营类型3" value="经营类型3"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否经营性运输">
								<el-switch>
								</el-switch>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="section-block">
					<span class="block-title">道路运输许可证</span>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="许可证号">
								<el-input placeholder="请输入许可证号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="许可证号">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="24">
							<el-form-item label="经营范围">
								<el-input type="textarea" :rows="3" placeholder="请输入经营范围" resize="none"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="有效期至">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="质量信用考核等级">
								<el-select style="width: 100%" placeholder="请选择">
									<el-option label="无" value=""></el-option>
									<el-option label="A" value="A"></el-option>
									<el-option label="AA" value="AA"></el-option>
									<el-option label="AAA" value="AAA"></el-option>
									<el-option label="AAAA" value="AAAA"></el-option>
									<el-option label="AAAAA" value="AAAAA"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12" >
							<el-form-item label="质量信用考核有效期至" label-width="160px">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							<el-form-item label="许可证正本">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="许可证副本">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="section-block">
					<span class="block-title">营业执照</span>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="营业执照号">
								<el-input placeholder="请输入营业执照号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="注册号">
								<el-input placeholder="请输入注册号"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="公司成立时间">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="发证日期">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="有效期至">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							<el-form-item label="营业执照正本">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="营业执照副本">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="section-block">
					<span class="block-title">税务登记证</span>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="税务登记证号">
								<el-input placeholder="请输入税务登记证号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="发证日期">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							<el-form-item label="税务登记证正本">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="税务登记证副本">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="section-block">
					<span class="block-title">组织机构代码证</span>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="组织机构代码证号">
								<el-input placeholder="请输入组织机构代码证号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="有效期至">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="年审有效期至">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							<el-form-item label="组织机构代码证正本">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="组织机构代码证副本">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="section-block">
					<span class="block-title">工商网络信息公示</span>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="公示日期">
								<el-date-picker
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期" style="width:100%">
									</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="section-block">
					<span class="block-title">公司法人</span>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="法人姓名">
								<el-input placeholder="请输入法人姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="证件类型">
								<el-select style="width: 100%" placeholder="请选择">
									<el-option label="身份证" value="身份证"></el-option>
									<el-option label="护照" value="护照"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="证件号码">
								<el-input placeholder="请输入证件号码"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="有效期至">
								<el-date-picker type="date" placeholder="选择日期" size="small" style="width:100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							<el-form-item label="证件照片正面">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="证件照片反面">
								<ImageUpload :limitNum="1"></ImageUpload>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="handle"><el-button>取消</el-button><el-button type="primary">保存</el-button></div>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
import ImageUpload from '../CommonComponents/ImageUpload'
	export default {
		components: {
			ImageUpload
		},
	}
</script>
<style lang="stylus" scoped>
	.wf-card
		.section-block
			margin 10px 10px 20px
			padding 0 20px
			.tips
				margin 0
				font-size 12px
				color #999
		.handle
			text-align center
</style>