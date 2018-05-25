<template>
	<div class="step step3">
		<div class="selectDriver">
			<div class="tit">选择司机及车辆</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="编号/姓名/车牌号/车长/车型"></el-input>
					</el-form-item>
					<el-form-item label="装车日期">
						<el-input placeholder="装车日期"></el-input>
					</el-form-item>
					<el-form-item label="车辆状态">
						<el-input placeholder="车辆状态"></el-input>
					</el-form-item>
					<el-form-item label="车辆归属">
						<el-input placeholder="车辆归属"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">搜索</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<DriverItem></DriverItem>
			<!-- <div class="pagination">
				<el-pagination align="right" background layout="prev, pager, next" total="count"></el-pagination>
			</div> -->
		</div>
		<div class="selectEscort">
			<div class="tit">选择随行人员</div>
			<div class="search">
				<el-form :inline="true" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="姓名/角色"></el-input>
					</el-form-item>
						<el-form-item label="人员状态">
						<el-input placeholder="人员状态"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">搜索</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!-- <EscortItem></EscortItem> -->
			<!-- <div class="pagination">
				<el-pagination align="right" background layout="prev, pager, next"></el-pagination>
			</div> -->
		</div>
		<div class="text-center">
			<el-button @click="prevStep">上一步</el-button>
			<el-button type="primary" @click="nextStep">下一步</el-button>
			<el-button @click="back">取消</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import DriverItem from './DriverItem'
	import EscortItem from './EscortItem'
	export default {
		data() {
			return {

			}
		},
		methods: {
			nextStep(){
				this.$emit('nextStep', 3)
			},
			prevStep(){
				this.$emit('prevStep',1)
			},
			back() {
				this.$router.go(-1)
			},
		},
		components:{
			DriverItem,
			EscortItem
		}
	}
</script>
<style lang="stylus" scoped>
	.tit
		background #e2ecf6
		padding 5px 15px
		line-height 30px
		font-size 13px
		margin-bottom 15px
		color #3582d0
	.selectEscort
		margin-top 15px
</style>