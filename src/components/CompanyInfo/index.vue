<template>
	<div class="main-content">
		<div class="wf-card">
			<el-form label-width="120px" size="small">
				<div  class="tit clearfix">基本信息</div>
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
							
						</el-form-item>
					</el-col>
				</el-row>
				<div  class="header clearfix">道路运输许可证</div>
				<div  class="header clearfix">营业执照</div>
				<div  class="header clearfix">税务登记证</div>
				<div  class="header clearfix">组织机构代码证</div>
				<div  class="header clearfix">工商网络信息公示</div>
				<div  class="header clearfix">公司法人</div>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
	}
</script>
<style lang="stylus" scoped>
	.wf-card
		.tit
			background #e2ecf6
			height 50px
			line-height 50px
			padding 0 15px
			color #3582d0
			position relative
			margin-bottom 18px
</style>