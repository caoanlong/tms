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
			<span class="btn replaceBtn" @click="replaceDriver">更换</span>
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
			<span class="btn replaceBtn" @click="replaceEscort">更换</span>
			<span class="btn deleteBtn" @click="deleteEscort">删除</span>
		</div>
		<div class="escortColumn" v-else>
			<span class="btn addEscortBtn" @click="replaceEscort"><svg-icon icon-class="add-icon"></svg-icon>添加押车员</span>
		</div>
		
		<!-- 更换驾驶员 -->
		<el-dialog title="驾驶员列表" :visible.sync="replaceDriverVisible">
			<el-form :inline="true" size="mini">
				<el-form-item label="驾驶员">
					<el-input auto-complete="off" placeholder="姓名/手机号"></el-input>
				</el-form-item>
				<el-form-item label="装车日期">
					<el-date-picker 
						:editable="false"
						type="date"
						value-format="timestamp"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="状态">
					<el-select placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option label="工作中" value="工作中"></el-option>
						<el-option label="空闲中" value="空闲中"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">搜索</el-button>
					<el-button>重置</el-button>
				</el-form-item>
			</el-form>
			<el-table highlight-current-row>
				<el-table-column align="center">
					<template>
						<span class="selectIcon"><svg-icon :icon-class="ic_checkbox_false"></svg-icon></span>
					</template>
				</el-table-column>
				<el-table-column label="姓名" prop="companyName" align="center"></el-table-column>
				<el-table-column label="手机号" prop="companyName" align="center"></el-table-column>
				<el-table-column label="状态" prop="companyName" align="center"></el-table-column>
			</el-table>
			<Page/>
			<div class="section-block">
				<span class="block-title">已选择司机</span>
				<div class="selectedDriverList">
					<el-tag closable size="mini">罗凯</el-tag>
					<el-tag closable size="mini">吴正平</el-tag>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="replaceDriverVisible = false">取 消</el-button>
				<el-button type="primary" @click="replaceDriverVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加押运员 -->
		<el-dialog title="押运员列表" :visible.sync="addEscortVisible">
			<el-form :inline="true" size="mini">
				<el-form-item label="押运员">
					<el-input auto-complete="off" placeholder="姓名/手机号"></el-input>
				</el-form-item>
				<el-form-item label="装车日期">
					<el-date-picker 
						:editable="false"
						type="date"
						value-format="timestamp"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="状态">
					<el-select placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option label="工作中" value="工作中"></el-option>
						<el-option label="空闲中" value="空闲中"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">搜索</el-button>
					<el-button>重置</el-button>
				</el-form-item>
			</el-form>
			<el-table highlight-current-row>
				<el-table-column align="center">
					<template>
						<span class="selectIcon"><svg-icon :icon-class="ic_checkbox_false"></svg-icon></span>
					</template>
				</el-table-column>
				<el-table-column label="姓名" prop="companyName" align="center"></el-table-column>
				<el-table-column label="手机号" prop="companyName" align="center"></el-table-column>
				<el-table-column label="状态" prop="companyName" align="center"></el-table-column>
			</el-table>
			<Page/>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addEscortVisible = false">取 消</el-button>
				<el-button type="primary" @click="addEscortVisible = false">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import {defaultImg} from '../../../../assets/icons/icons'
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
			replaceDriverVisible: false,
			addEscortVisible: false,
		}
	},
	computed: {
		defaultImg: () => defaultImg
	},
	methods:{
		replaceDriver(){
			this.replaceDriverVisible= true
		},
		replaceEscort(){
			this.addEscortVisible= true
		},
		deleteEscort(){

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
