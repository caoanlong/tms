<template>
	<div class="select-search" @mouseleave="hide">
		<div class="results" @click.stop="ExpandPop" v-model="results">
			<p v-if="placeholderStatus" style="color:#C0C4CC">{{placeholder}}</p>
			<p><span class="name">{{results.contactName}}</span><span class="mobile">{{results.contactPhone}}</span></p>
			<p class="area">{{results.contactArea}}</p>
			<p class="address">{{results.contactArea}}{{results.detailAddress}}</p>
			<i class="el-icon-arrow-down selectIcon"></i>
		</div>
		<div class="select-body" v-if="isExpand"  @click.stop="() => false">
			<el-input type="text" placeholder="关键字" v-model="searchVal" @keyup="selectByKey" prefix-icon="el-icon-search" autofocus="isExpand" @input ="inputFunc"></el-input>
			<transition name="el-fade-in-linear" mode="out-in">
				<div class="typeahead-filter" v-show="optList">
					<transition-group tag="ul" name="el-fade-in-linear">
						<li v-for="(item,index) in optList " :key="index" :class="index == currentIndex? 'active':''" @click="selectChild(index)">
							<p><span class="name">{{item.contactName}}</span><span class="mobile">{{item.contactPhone}}</span></p>
							<p class="area">{{item.contactArea}}</p>
							<p class="address">{{item.contactArea}}{{item.detailAddress}}</p>
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
				results: '',
				isExpand: false,
				searchVal: '',
				resultVal: '',
				searchList: [],
				currentIndex: -1,
				placeholderStatus:true
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
					})
					return temp;
				}
			}
		},
		created() {
			document.body.addEventListener('click', () => {
				this.isExpand = false
			})
		},
		props: {
			placeholder:{type:String,default:''},
			mapData:Array

		},
		methods: {
			hide(){
				this.isExpand = false
			},
			ExpandPop(){
				this.isExpand = !this.isExpand
				this.searchVal = ''
			},
			resetDefaultStatus () {
				this.searchVal = ''
				this.resultVal = ''
				this.currentIndex = ''
				this.optList.forEach(item => {
					this.$set(item, 'active', false);
				})
			},
			selectByKey () {
				if (this.optList.length === 1) {
					this.searchVal = this.optList[0].name
					this.resultVal = this.optList[0].value
					this.results = this.optList[0]
					this.isExpand = false
					this.$emit('searchBykey', { keyword: this.searchVal})
				} else {
					this.optList.forEach(item => {
						if (this.searchVal === item.name || item.active === true) {
							this.searchVal = item.name;
							this.results = item;
							this.isExpand = false;
							this.$emit('searchBykey', { keyword: this.searchVal })
						}
					})
				}
				this.resetDefaultStatus();
			},
			selectChild (index) {
				this.mapData.forEach((item, innerIndex) => {
					if (index === innerIndex || item.active) {
						// this.searchVal = item.keyword
						this.results = item
						this.isExpand = false
					}
					this.$set(item, 'active', false)
				})
				this.$emit('searchBykey', { keyword: this.searchVal })
				this.placeholderStatus = false
				this.resetDefaultStatus()
				this.currentIndex = index
				
			},
			inputFunc(val){
				console.log(val)
			}
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
		.selectIcon
			position absolute
			right 0
			top 50%
			transform translateY(-50%)
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