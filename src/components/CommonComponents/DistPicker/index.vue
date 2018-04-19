<template>
	<div class="distpicker">
		<div class="level level1">
			<select @change="selectChange($event, 1)">
				<option>请选择</option>
				<option :selected="selectedList[0] == String(key)" :value="key" v-for="(value, key) in level1" :key="key">{{value}}</option>
			</select>
		</div>
		<div class="level level2">
			<select @change="selectChange($event, 2)" v-show="JSON.stringify(level2) != '{}'">
				<option>请选择</option>
				<option :selected="selectedList[1] == String(key)" :value="key" v-for="(value, key) in level2" :key="key">{{value}}</option>
			</select>
		</div>
		<div class="level level3">
			<select @change="selectChange($event, 3)" v-show="JSON.stringify(level3) != '{}'">
				<option>请选择</option>
				<option :selected="selectedList[2] == String(key)" :value="key" v-for="(value, key) in level3" :key="key">{{value}}</option>
			</select>
		</div>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../common/request'
	import ChineseDistricts from '../../../assets/data/distpicker.data'
	export default {
		props: {
			selected: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				areaPID: '',
				level1: ChineseDistricts[100000],
				level2: {},
				level3: {},
				watchOne: false,
				selectedList: []
			}
		},
		watch: {
			selected: function (newVal) {
				this.selectedList = newVal
				this.level2 = ChineseDistricts[newVal[0]]
				this.level3 = ChineseDistricts[newVal[1]]
			}
		},
		created() {
		},
		methods: {
			selectChange(e, x) {
				if (x == 1) {
					if (e.target.value == '请选择') {
						this.selectedList = []
						this.level2 = {}
						this.$emit('selectChange', '')
					} else {
						this.selectedList[0] = e.target.value
						this.level2 = ChineseDistricts[e.target.value]
						this.$emit('selectChange', e.target.value)
					}
				} else if (x == 2) {
					if (e.target.value == '请选择') {
						let t = this.selectedList[0]
						this.selectedList = [t]
						this.level3 = {}
						this.$emit('selectChange', t)
					} else {
						this.selectedList[1] = e.target.value
						this.level3 = ChineseDistricts[e.target.value]
						this.$emit('selectChange', e.target.value)
					}
				} else if (x == 3) {
					if (e.target.value == '请选择') {
						let t1 = this.selectedList[0]
						let t2 = this.selectedList[1]
						this.selectedList = [t1, t2]
						this.$emit('selectChange', t2)
					} else {
						this.selectedList[2] = e.target.value
						this.$emit('selectChange', e.target.value)
					}
				}
			}
		}
	}
</script>
<style lang="stylus">
	.distpicker
		display flex
		.level
			flex 1
			select
				width 100%
				height 28px
				border 1px solid #dcdfe6
				border-radius 4px
				outline none
				padding-left 5px
			&.level2
				margin 0 10px
</style>