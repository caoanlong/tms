<template>
	<div class="select-search">
		<div class="results" @click="ExpandPop" v-model="placeholderValue">	
			<p><span class="name">{{placeholderValue.name}}</span><span class="mobile">{{placeholderValue.mobile}}</span></p>
			<p class="area">{{placeholderValue.areaName}}</p>
			<p class="address">{{placeholderValue.address}}</p>
		</div>
		<div class="select-body" v-if="isExpand">
			<el-input type="text" placeholder="关键字" v-model="searchVal" @keyup="selectByKey" prefix-icon="el-icon-search" autofocus="isExpand" ></el-input>
			<transition name="el-fade-in-linear" mode="out-in">
				<div class="typeahead-filter" v-show="optList">
					<transition-group tag="ul" name="el-fade-in-linear">
						<li v-for="(item,index) in optList " :key="index" :class="index == currentIndex? 'active':''" @click="selectChild(index)">
							<p><span class="name">{{item.name}}</span><span class="mobile">{{item.mobile}}</span></p>
							<p class="area">{{item.areaName}}</p>
							<p class="address">{{item.address}}</p>
						</li>
					</transition-group>
					<p class="noFound" v-show="optList && optList.length === 0">未能查询到,请重新输入!</p>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				placeholderValue: '',
				isExpand: false,
				searchVal: '',
				resultVal: '',
				searchList: [],
				currentIndex: -1,
			}
		},
		computed: {
			optList () {
				let temp = [];
				if (this.searchVal === '') {
					return this.mapData;
				} else {
					this.currentIndex = -1; 
					this.mapData.forEach(item => {
						item.active = false;
						if (item.name.indexOf(this.searchVal.toLowerCase().trim()) !== -1) {
							temp.push(item)
						}
					})
					return temp;
				}
			}
		},
		props: {
			placeholder:String,
			mapData: {
				type: Array,
				default: function () {
					return [
						{
							name: 'wofsdf',
							mobile:'13800138000',
							areaName:'云南省昆明市官渡区',
							address:'云南省昆明市官渡区浩宏物流信息中心',
							value: 0
						},
						{
							name: '我是技术渣1',
							mobile:'13800138000',
							areaName:'云南省昆明市官渡区',
							address:'云南省昆明市官渡区浩宏物流信息中心',
							value: 1
						},
						{
							name: '我是技术渣2',
							mobile:'13800138000',
							areaName:'云南省昆明市官渡区',
							address:'云南省昆明市官渡区浩宏物流信息中心',
							value: 2
						},
						{
							name: '我是天坑',
							mobile:'13800138000',
							areaName:'云南省昆明市官渡区',
							address:'云南省昆明市官渡区浩宏物流信息中心',
							value: 3
						},
						{
							name: '我是天坑,分身乏术',
							mobile:'13800138000',
							areaName:'云南省昆明市官渡区',
							address:'云南省昆明市官渡区浩宏物流信息中心',
							value: 4
						},
						{
							name: '我是天坑2,分身乏术',
							mobile:'13800138000',
							areaName:'云南省昆明市官渡区',
							address:'云南省昆明市官渡区浩宏物流信息中心',
							value: 5
						},
						{
							name: '我是天坑3,分身乏术',
							mobile:'13800138000',
							areaName:'云南省昆明市官渡区',
							address:'云南省昆明市官渡区浩宏物流信息中心',
							value: 6
						}
					]
				}
			}
		},
		methods: {
			ExpandPop(){
				this.isExpand = !this.isExpand
			},
			resetDefaultStatus () {
				this.searchVal = '';
				this.resultVal = '';
				this.currentIndex = '';
				this.optList.forEach(item => {
					this.$set(item, 'active', false);
				})
			},
			selectByKey () {
				if (this.optList.length === 1) {
					this.searchVal = this.optList[0].name;
					this.resultVal = this.optList[0].value;
					this.placeholderValue = this.optList[0];
					this.isExpand = false;
					this.$emit('selectValue', { text: this.searchVal, value: this.resultVal })
				} else {
					this.optList.forEach(item => {
						if (this.searchVal === item.name || item.active === true) {
							this.searchVal = item.name;
							this.placeholderValue = item;
							this.resultVal = item.value;
							this.isExpand = false;
							this.$emit('selectValue', { text: this.searchVal, value: this.resultVal })
						}
					})
				}
				this.resetDefaultStatus();
			},
			selectChild (index) {
				this.mapData.forEach((item, innerIndex) => {
					if (index === innerIndex || item.active) {
						this.searchVal = item.name
						this.resultVal = item.value
						this.placeholderValue = item
						this.isExpand = false
					}
					this.$set(item, 'active', false)
				})
				this.$emit('selectValue', { text: this.searchVal, value: this.resultVal })
				this.resetDefaultStatus()
				this.currentIndex = index
			},
		}
	}
</script>
<style lang="stylus" scoped>
.el-fade-in-linear-enter-active
.el-fade-in-linear-leave-active
.fade-in-linear-enter-active
.fade-in-linear-leave-active 
	transition opacity .2s linear
.el-fade-in-enter
.el-fade-in-leave-active
.el-fade-in-linear-enter
.el-fade-in-linear-leave
.el-fade-in-linear-leave-active
.fade-in-linear-enter
.fade-in-linear-leave
.fade-in-linear-leave-active
	opacity 0
.select-search
	background  #fff
	width 100%
	border-radius 4px
	border 1px solid #dcdfe6
	box-sizing border-box
	color #606266
	display inline-block
	vertical-align top
	height 96px
	line-height 32px
	cursor pointer
	padding 0 15px
	font-size 13.3333px
	position relative
	.results
		position absolute
		top 0
		bottom 0
		left 15px
		right 15px
		p
			line-height 32px
			font-size 14px
			color #666
			.mobile
				margin-left 10px
	.select-body
		position absolute
		top 94px
		background #fff
		z-index 10
		box-sizing border-box
		left -1px
		right -1px
		padding 10px 15px
		border 1px solid #dcdfe6
		border-radius 0 0 4px 4px
		.typeahead-filter
			margin-top 10px
			overflow hidden
			overflow-y auto
			max-height 210px
			li
				list-style-type none
				padding 5px 10px
				&:hover
					background #f5f7fa
				p
					line-height 20px
					font-size 12px
					color #999
					.name
						font-size 14px
						color #000
					.mobile
						margin-left 10px
				&.active
					p
						color #409EFF
						.name
							color #409EFF
						
				

			
</style>