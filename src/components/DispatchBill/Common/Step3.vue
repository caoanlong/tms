<template>
	<div class="step step3">
		<el-row>
			<div class="split-item">
				<span class="tit">配载信息</span>
			</div>
		</el-row>
		<div class="control-info">
			<el-row :gutter="30">
				<el-col :span="6" style="border-right:1px solid #ebeef5">
					<div class="base-info inlineBlock">
						<p class="driverName">李司机</p>
						<p class="vehicleNo">云AG17885</p>
						<p class="trailerNo">云AG28937挂</p>
						<p class="vehicleType">7.2米重型集装箱半挂车</p>
					</div>
				</el-col>
				<el-col :span="18">
					<el-row :gutter="30">
						<el-col :span="8">
							<div class="sliderSelect">
								<el-progress :percentage="70" style="margin-top:13px"></el-progress><span class="surplus">剩 吨</span>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="sliderSelect">
								<el-progress :percentage="70" style="margin-top:13px"></el-progress><span class="surplus">剩 方</span>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="sliderSelect">
								<el-progress :percentage="70" style="margin-top:13px"></el-progress><span class="surplus">剩 件</span>
							</div>
						</el-col>
					</el-row>
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form label-width="60px">
								<el-form-item label="已配载">
									<el-input size="mini">
										<template slot="suffix">吨</template>
									</el-input>
								</el-form-item>
							</el-form>
						</el-col>
						<el-col :span="8">
							<el-form label-width="60px">
								<el-form-item label="已配载">
									<el-input size="mini">
										<template slot="suffix">方</template>
									</el-input>
								</el-form-item>
							</el-form>
						</el-col>
						<el-col :span="8">
							<el-form label-width="60px">
								<el-form-item label="已配载">
									<el-input size="mini">
										<template slot="suffix">件</template>
									</el-input>
								</el-form-item>
							</el-form>
						</el-col>
						<el-col :span="24" class="controlStatus">
							<el-radio v-model="controlStatus" label="1">满载</el-radio>
							<el-radio v-model="controlStatus" label="2">未满载</el-radio>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		<el-row>
			<div class="split-item">
				<span class="tit">付款方式及费用</span>
			</div>
		</el-row>
		<table class="customertable">
			<thead>
				<tr>
					<th width="100"></th>
					<th>现付</th>
					<th>到付</th>
					<th>回单付</th>
					<th>月结</th>
					<th>收方到货付</th>
					<th>合计</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="txt-r">司机</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
				</tr>
				<tr>
					<td class="txt-r">随车人员</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
					<td>
						<el-input size="mini"></el-input>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="7" class="txt-r">合计</td>
				</tr>
			</tfoot>
		</table>
		<div class="step-footer">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" @click="nextStep">下一步</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				controlStatus: '',
			}
		},
		methods: {
			prevStep() {
				this.$emit('prevStep', 1)
			},
			nextStep() {
				this.$emit('nextStep', 3)
			},
		}
	}
</script>
<style lang="stylus" scoped>
	.step-footer
		margin-top 20px
		text-align center
	.step
		.split-item
			padding 10px 0
			margin-bottom 20px
			border-bottom 1px solid #ebeef5
			.tit
				padding-left 0
	.control-info
		font-size 14px
		border-bottom 1px solid #ebeef5
		padding-bottom 20px
		.sliderSelect
			display inline-block
			width 220px
			height 40px
			padding-right 100px
			position relative
			.labels
				position absolute
				left 0
				top 0
				line-height 40px
			.surplus
				position absolute
				right 0
				top 0
				line-height 40px
				width 80px
		.base-info
			p
				line-height 30px
				margin 0
		.customertable
			width 100%
			font-size 12px
			background #ebeef5
			border-spacing 1px
			td
			th
				background #fff
				padding 6px 10px
				color #909399
				height 24px
				line-height 24px
				text-align center
				&.txt-r
					text-align right
</style>