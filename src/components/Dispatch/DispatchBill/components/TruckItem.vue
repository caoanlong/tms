<template>
	<div class="listItem" >
		<div class="selectColumn">
			<span class="selectIcon"><svg-icon :icon-class="isSelected?'ic_checkbox_true':'ic_checkbox_false'" :class="isSelected?'selected':''"></svg-icon></span>
		</div>
		<div class="truckColumn">
			<div class="headPic fl">
				<img :src="defaultImg" />
			</div>
			<div class="truckInfo fl">
				<p><span class="plateNo">粤B-66688 </span>
					<el-tag size="mini">作业</el-tag>
					<!-- <el-tag size="mini" type="warning">空闲</el-tag> -->
					<el-tag size="mini" type="info">挂车</el-tag>
					<el-tooltip placement="right" effect="light">
						<div slot="content">
							<el-tag size="mini" type="danger">驾驶证到期</el-tag> 
							<el-tag size="mini" type="danger">身份证到期</el-tag> 
							<el-tag size="mini" type="danger">从业资格证到期</el-tag>
						</div>
						<el-tag size="mini" type="danger">到期</el-tag>
					</el-tooltip>
				</p>
				<p>9.6米/高栏/22吨/3.5方</p>
			</div>
		</div>
		<div class="driverColumn">
			<div class="headPic fl">
				<img :src="defaultImg" />
			</div>
			<div class="driverInfo fl">
				<p><span class="driverName">罗凯</span>
					<el-tag size="mini" type="success">主驾</el-tag>
					<el-tag size="mini">作业</el-tag>
					<!-- <el-tag size="mini" type="warning">空闲</el-tag> -->
					<el-tooltip placement="right" effect="light">
						<div slot="content">
							<el-tag size="mini" type="danger">驾驶证到期</el-tag> 
							<el-tag size="mini" type="danger">身份证到期</el-tag> 
							<el-tag size="mini" type="danger">从业资格证到期</el-tag>
						</div>
						<el-tag size="mini" type="danger">到期</el-tag>
					</el-tooltip>
				</p>
				<p>13424299894</p>
			</div>
			<span class="btn replaceBtn" @click="selectSupercargo('driver')">更换</span>
		</div>
		<div class="escortColumn" v-if="1">
			<div class="headPic fl">
				<img :src="defaultImg" />
			</div>
			<div class="escortInfo fl">
				<p><span class="escortName">吴正平</span>
					<el-tag size="mini">作业</el-tag>
					<!-- <el-tag size="mini" type="warning">空闲</el-tag> -->
					<el-tooltip placement="right" effect="light">
						<div slot="content">
							<el-tag size="mini" type="danger">驾驶证到期</el-tag> 
							<el-tag size="mini" type="danger">身份证到期</el-tag> 
							<el-tag size="mini" type="danger">从业资格证到期</el-tag>
						</div>
						<el-tag size="mini" type="danger">到期</el-tag>
					</el-tooltip>
				</p>
				<p>13424299894</p>
			</div>
			<span class="btn replaceBtn" @click="selectSupercargo('staff')">更换</span>
			<span class="btn deleteBtn" @click="deleteItem">删除</span>
		</div>
		<div class="escortColumn" v-else>
			<span class="btn addEscortBtn" @click="selectSupercargo"><svg-icon icon-class="add-icon"></svg-icon>添加押车员</span>
		</div>
		<SelectSupercargo :type="type" :dialogVisible="selectDialogVisible" @control="handleSelectSupercargo"></SelectSupercargo>
	</div>
</template>

<script>
import {defaultImg} from '../../../../assets/icons/icons'
import SelectSupercargo from './SelectSupercargo'
export default {
	props: {
		isSelected: {
			type: Boolean,
			default: false
		},
		index: {
			type: Number
		},
		truck: {
			type: Object,
			default: () => {}
		}
	},
	data(){
		return {
			selectDialogVisible: false,
			type: 'driver'
		}
	},
	computed: {
		defaultImg: () => defaultImg
	},
	components: { SelectSupercargo },
	methods:{
		selectSupercargo(type) {
			this.type = type
			this.selectDialogVisible = true
		},
		deleteItem() {

		},
		handleSelectSupercargo() {
			this.selectDialogVisible = false
		}
	}
}
</script>

<style lang="stylus" scoped>
	.listItem
		border 1px solid #f0f0f0
		margin-top 10px
		font-size 12px
		height 72px
		position relative
		display flex
		min-width 1210px
		.selectColumn
			flex 0 0 70px
			position relative
			.selectIcon
				position absolute
				left 50%
				top 50%
				transform translate(-50%,-50%)
				.svg-icon 
					color #ddd
					font-size 14px
					cursor pointer
					&.selected
					&:hover
						color #409EFF
		.truckColumn
		.driverColumn
		.escortColumn
			padding 10px
			flex 1
			border-left 1px solid #f0f0f0
			width 100%
			height 70px
			min-width 380px
			position relative
			p
				margin 0
				line-height 20px
				height 20px
				color #666
				&:first-child
					line-height 30px
					height 30px
			.headPic
				margin-right 10px
				img
					width 50px
					height 50px
					vertical-align top
					border-radius 3px
			.plateNo
			.driverName
			.escortName
				font-size 16px
				vertical-align top
				margin-right 10px
		.driverColumn
		.escortColumn
			.headPic
				img
					border-radius 25px
			.btn
				color #409EFF
				padding 2px 10px
				cursor pointer
				position absolute
				font-size 14px
				&.addEscortBtn
					left 50%
					top 50%
					transform translate(-50%,-50%)
		.escortColumn
			.replaceBtn
				right 60px
				bottom 10px	
			.deleteBtn
				right 10px
				bottom 10px
				color #F56C6C
		.driverColumn
			.replaceBtn
				right 10px
				bottom 10px		
				
	.section-block
		margin 20px 0 10px
		.selectedDriverList
			padding 0 10px
			.el-tag
				margin 0 10px 10px 0
</style>
