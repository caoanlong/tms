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
				<tr class="is-center" v-for="(item, index) in cargoInfo">
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
					this.$emit('control', false, this.cargoInfo)
				} else {
					this.$emit('control', false)
				}
			}
		}
	}
</script>