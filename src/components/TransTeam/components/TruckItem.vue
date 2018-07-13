<template>
	<div class="driverItem">
		<div class="truck">
			<div class="truckPic fl">
				<img :src="truck.truckFrontPic ? resizeImg(truck.truckFrontPic, '_100x100.') : defaultImg" />
			</div>
			<div class="truckInfo fl">
				<p>
					<span class="plateNo">{{truck.plateNo}}</span>
					<el-tag size="mini" v-if="truck.truckType == 'TankTruck'">罐式货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'VanTruck'">厢式货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'BarrackTruck'">仓栅货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'TailgateTruck'">栏板货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'DumpTruck'">自卸货车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'HeavySemitrailerTractor'">重型半挂牵引车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'TankTrailer'">罐式挂车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'VanTrailer'">厢式挂车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'BarrackTrailer'">仓栅挂车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'TailgateTrailer'">栏板挂车</el-tag>
					<el-tag size="mini" v-else-if="truck.truckType == 'ContainerTrailer'">集装箱挂车</el-tag>
					<!-- <el-tag size="mini" type="warning">空闲</el-tag> -->
					<el-tag size="mini" type="success" v-if="truck.truckCategory == 'Trailer'">挂车</el-tag>
					<el-tag size="mini" type="success" v-else-if="truck.truckCategory == 'Tractor'">牵引车</el-tag>
					<el-tag size="mini" type="success" v-else-if="truck.truckCategory == 'WholeVehicle'">整车</el-tag>
					<el-tooltip placement="right" effect="light">
						<div slot="content">
							<el-tag size="mini" type="danger">驾驶证到期</el-tag> 
							<el-tag size="mini" type="danger">身份证到期</el-tag> 
							<el-tag size="mini" type="danger">从业资格证到期</el-tag>
						</div>
						<!-- <el-tag size="mini" type="danger">到期</el-tag> -->
					</el-tooltip>
				</p>
				<p>{{Number(truck.length)/1000}}米/{{Number(truck.loads)/1000}}吨/{{truck.loadVolume}}方</p>
			</div>
			<div class="truckHandle fl">
				<router-link tag="span" :to="{name: 'viewtruck', query: { truckID: truck.truckID } }">查看档案</router-link>
				<router-link tag="span" :to="{name: 'edittruck', query: { truckID: truck.truckID } }">编辑档案</router-link>
				<span @click="delTruck(truck.truckID)">删除车辆</span>
			</div>
		</div>
		<div class="driver">
			<div class="driverInfo" v-if="truck.primaryDriver && truck.primaryDriver.realName">
				<span class="driverName">{{truck.primaryDriver.realName}}</span>
				<el-tooltip placement="top" v-if="truck.primaryDriver.appStatus == 'Y'">
					<div slot="content">开通APP接单</div>
					<el-tag size="mini">APP</el-tag>
				</el-tooltip>
				<el-tag type="info" size="mini" v-else>APP</el-tag>
				<el-tag type="info" size="mini">主驾</el-tag>
				<el-tooltip placement="right" effect="light">
					<div slot="content">
						<el-tag size="mini" type="danger">驾驶证到期</el-tag> 
						<el-tag size="mini" type="danger">身份证到期</el-tag> 
						<el-tag size="mini" type="danger">从业资格证到期</el-tag>
					</div>
					<!-- <el-tag size="mini" type="danger">到期</el-tag> -->
				</el-tooltip>
			</div>
			<div class="driverInfo link text-center" v-else @click="add('primary')" v-show="truck.truckCategory != 'Trailer'">+添加主驾</div>
			<div class="driverInfo" v-if="truck.secondaryDriver && truck.secondaryDriver.realName">
				<span class="driverName">{{truck.secondaryDriver.realName}}</span>
				<el-tooltip placement="top" v-if="truck.secondaryDriver.appStatus == 'Y'">
					<div slot="content">开通APP接单</div>
					<el-tag size="mini">APP</el-tag> 
				</el-tooltip>
				<el-tag type="info" size="mini" v-else>APP</el-tag> 
				<el-tag type="info" size="mini">副驾</el-tag>
				<el-tooltip placement="right" effect="light">
					<div slot="content">
						<el-tag size="mini" type="danger">驾驶证到期</el-tag> 
						<el-tag size="mini" type="danger">身份证到期</el-tag> 
						<el-tag size="mini" type="danger">商业险到期</el-tag>
					</div>
					<!-- <el-tag size="mini" type="danger">到期</el-tag> -->
				</el-tooltip>
			</div>
			<div class="driverInfo link text-center" v-else @click="add('second')" v-show="truck.truckCategory != 'Trailer'">+添加副驾</div>
		</div>
		<div class="mobile">
			<div class="mobileItem" v-if="truck.primaryDriver && truck.primaryDriver.mobile">{{truck.primaryDriver.mobile}}</div>
			<div class="mobileItem" v-if="truck.secondaryDriver && truck.secondaryDriver.mobile">{{truck.secondaryDriver.mobile}}</div>
		</div>
		<div class="handle" v-show="truck.truckCategory != 'Trailer'">
			<div class="handleItem" v-if="truck.primaryDriver">
				<span style="color: #ccc">设为主驾</span>
				<span @click="add('primary')">人员替换</span>
				<span @click="delSuperCargo(truck.primaryDriver.comSupercargoID)">删除</span>
			</div>
			<div class="handleItem" v-if="truck.secondaryDriver">
				<span @click="primary">设为主驾</span>
				<span @click="add('second')">人员替换</span>
				<span @click="delSuperCargo(truck.secondaryDriver.comSupercargoID)">删除</span>
			</div>
		</div>
		<SelectSuperCargo :dialogVisible="dialogVisible" :type="type" :truckID="truck.truckID" @control="handleSelect"></SelectSuperCargo>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import { defaultImg } from '../../../assets/icons/icons'
import { resizeImg, deleteConfirm } from '../../../common/utils'
import SelectSuperCargo from './SelectSuperCargo'
import Truck from '../../../api/Truck'
export default {
	props: {
		truck: Object
	},
	data() {
		return {
		   type: 'primary',
		   dialogVisible: false
		}
	},
	computed: {
		defaultImg: () => defaultImg,
		resizeImg: () => resizeImg
	},
	components: { SelectSuperCargo },
	methods: {
		add(type) {
			this.type = type
			this.dialogVisible = true
		},
		primary() {
			Truck.primary({
				comSupercargoID: this.truck.secondaryDriver.comSupercargoID,
				comTruckID: this.truck.truckID
			}).then(res => {
				Message.success(res.data.msg)
				this.$emit('refresh')
			})
		},
		delTruck(truckID) {
			deleteConfirm(truckID, truckIDs => {
				Truck.del({ truckIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.$emit('refresh')
				})
			})
		},
		delSuperCargo(comSupercargoID) {
			deleteConfirm(comSupercargoID, comSupercargoIDs => {
				Truck.deleteDriver({
					comSupercargoID,
					comTruckID: this.truck.truckID
				}).then(res => {
					Message.success(res.data.msg)
					this.$emit('refresh')
				})
			})
		},
		handleSelect(bool) {
			this.dialogVisible = false
			bool && this.$emit('refresh')
		}
	}
}
</script>

<style lang="stylus" scoped>
.driverItem
	position relative
	padding-right 520px
	border 1px solid  #f0f0f0
	margin-bottom 10px
	font-size 12px
	height 92px
	.driver
	.mobile
	.handle
		border-left 1px solid #f0f0f0
		position absolute
		top 0
		background #fff
		height 90px
	.truck
		width 100%
		padding 10px
		height 90px
		min-width 380px
		position relative
		.truckPic
			margin-right 10px
			img
				width 50px
				height 50px
				vertical-align top
				border-radius 3px
		.truckInfo
			p
				margin 0
				line-height 20px
				color #666
				&:first-child
					line-height 30px
				.plateNo
					font-weight bold
					font-size 16px
		.truckHandle
			height 30px
			width 100%
			line-height 30px
			span
				color #409eff
				cursor pointer
				margin-right 20px
	.handle
		width 179px
		right 0
		text-align center
		span
			padding 0 5px
			color #409eff
			cursor pointer
	.driver
		width 200px
		right 319px
	.mobile
		width 140px
		right 179px
		text-align center
	.mobileItem
	.driverInfo
	.handleItem
		height 45px
		line-height 45px
		&:first-child
			border-bottom 1px solid #f0f0f0
	.driverInfo
		padding 0 10px
		.driverName
			margin-right 10px
</style>
