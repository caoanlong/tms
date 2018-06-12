<template>
	<div>
		<el-dialog title="装车发运" :visible="isVisible" :show-close="false" custom-class="table" width="70%">
			<table class="wf-table">
				<tr>
					<th width="60">序号</th>
					<th width="120">承运单编号</th>
					<th>货物规格/名称</th>
					<th width="80">配载量</th>
					<th>运载量/吨</th>
					<th>运载量/方</th>
					<th>运载量/件</th>
				</tr>
				<tr class="is-center" v-for="(item, index) in cargoInfo" :key="index">
					<td>{{index+1}}</td>
					<td>{{item.carrierOrderNo}}</td>
					<td>{{item.cargoType}}/{{item.cargoName}}</td>
					<td>{{item.cargoWeight + '吨'}}/{{item.cargoVolume + '方'}}/{{item.cargoNum + '件'}}</td>
					<td>
						<el-input size="mini" v-model="item.loadWeight"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="item.loadVolume"></el-input>
					</td>
					<td>
						<el-input size="mini" v-model="item.loadNum"></el-input>
					</td>
				</tr>
				<tr>
					<td>合计</td>
					<td></td>
					<td></td>
					<td></td>
					<td>{{totalLoadWeight}}</td>
					<td>{{totalLoadVolume}}</td>
					<td>{{totalLoadNum}}</td>
				</tr>
			</table>
			<!-- <p>备注</p>
			<el-input type="textarea" placeholder="请输入..."></el-input> -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="control(false)">取消</el-button>
				<el-button type="primary" @click="control(true)">确认</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import { isFloat, isInt } from '../../../common/validators'
	export default {
		props: {
			isVisible: {
				type: Boolean,
				default: false
			},
			cargoInfo: {
				type: Array,
				default: () => []
			}
		},
		computed: {
			totalLoadWeight() {
				let values = this.cargoInfo.map(item => Number(item.loadWeight ? item.loadWeight : 0))
				return values.reduce((prev, next) => {
					return prev + next
				}, 0)
			},
			totalLoadVolume() {
				let values = this.cargoInfo.map(item => Number(item.loadVolume ? item.loadVolume : 0))
				return values.reduce((prev, next) => {
					return prev + next
				}, 0)
			},
			totalLoadNum() {
				let values = this.cargoInfo.map(item => Number(item.loadNum ? item.loadNum : 0))
				return values.reduce((prev, next) => {
					return prev + next
				}, 0)
			},
		},
		methods: {
			control(bool) {
				if (bool) {
					for (let i = 0; i < this.cargoInfo.length; i++) {
						if (this.cargoInfo[i].weightType == 'Heavy') {
							if (!Number(this.cargoInfo[i].loadWeight)) {
								Message.error('重货运载重量不能为空！')
								return
							}
							if (!isFloat(this.cargoInfo[i].loadWeight)) {
								Message.error('输入载重数据非法！')
								return
							}
						}
						if (this.cargoInfo[i].weightType == 'Light') {
							if (!Number(this.cargoInfo[i].loadVolume)) {
								Message.error('轻货运载体积不能为空！')
								return
							}
							if (!isFloat(this.cargoInfo[i].loadVolume)) {
								Message.error('输入体积数据非法！')
								return
							}
						}
						if (this.cargoInfo[i].loadWeight > this.cargoInfo[i].cargoWeight) {
							Message.error('运载重量不能超过配载重量！')
							return
						}
						if (this.cargoInfo[i].loadVolume > this.cargoInfo[i].cargoVolume) {
							Message.error('运载体积不能超过配载体积！')
							return
						}
						if (this.cargoInfo[i].loadNum && !isInt(this.cargoInfo[i].loadNum)) {
							Message.error('输入数量非法！')
							return
						}
						if (this.cargoInfo[i].loadNum > this.cargoInfo[i].cargoNum) {
							Message.error('运载数量不能超过配载数量！')
							return
						}
					}
					this.$emit('control', false, this.cargoInfo)
				} else {
					this.$emit('control', false)
				}
			}
		}
	}
</script>