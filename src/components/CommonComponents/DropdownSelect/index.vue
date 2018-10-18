<template>
	<div class="select-search" @mouseleave="hide">
		<div class="selected-address" @click.stop="expandPop">
			<div v-if="selectedAddress.contactName">
				<p>
					<span class="name">{{selectedAddress.contactName}}</span>
					<span>&nbsp;</span>
					<span class="mobile">{{selectedAddress.contactPhone}}</span>
				</p>
				<p class="area">{{selectedAddress.contactArea}}</p>
				<p class="address">{{selectedAddress.locationAddress}}{{selectedAddress.detailAddress}}</p>
			</div>
			<p class="placeholder" v-else>{{placeholder}}</p>
		</div>
		<div class="select-body" v-if="isExpand"  @click.stop="() => false">
			<el-input 
				type="text" 
				placeholder="关键字" 
				prefix-icon="el-icon-search" 
				:autofocus="isExpand" 
				@focus="suggestions('')" 
				@input="suggestions">
			</el-input>
			<transition name="el-fade-in-linear" mode="out-in">
				<div class="typeahead-filter" v-if="optList.length">
					<transition-group tag="ul" name="el-fade-in-linear">
						<li 
							v-for="(item, index) in optList " :key="index" 
							:class="item.customerAddressID == selectedAddress.customerAddressID ? 'active':''"
							@click="selectItem(item)">
							<p><span class="name">{{item.contactName}}</span><span class="mobile">{{item.contactPhone}}</span></p>
							<p class="area">{{item.contactArea}}</p>
							<p class="address">{{item.locationAddress}}{{item.detailAddress}}</p>
						</li>
					</transition-group>
				</div>
				<p class="noFound" v-else>未能查询到,请重新输入!</p>
			</transition>
		</div>
	</div>
</template>

<script>
import { Message } from 'element-ui'
export default {
	props: {
		addressType:{
			type: String,
			default: ''
		},
		selected: Object,
		isChangeCompany: Boolean,
		isClearDropDown: Boolean,
		fetchSuggestions: Function
	},
	data() {
		return {
			selectedAddress: {},
			optList: [],
			isExpand: false,
			placeholder: '请选择'
		}
	},
	watch: {
		isChangeCompany() {
			this.selectedAddress = {}
			this.fetchSuggestions('', (res) => {
				if (res.length == 1) {
					this.selectItem(res[0])
				}
			})
		},
		isClearDropDown() {
			this.selectedAddress = {}
		},
		selected: {
			handler(data) {
				this.selectedAddress = data || {}
			},
			deep: true
		}
	},
	created() {
		this.placeholder = `请选择${this.addressType}地址`
		document.body.addEventListener('click', () => {
			this.isExpand = false
		})
	},
	methods: {
		suggestions(queryString) {
			this.fetchSuggestions(queryString, (res) => {
				this.optList = res
			})
		},
		hide() {
			this.isExpand = false
		},
		expandPop() {
			this.isExpand = !this.isExpand
			if (this.isExpand) this.suggestions('')
		},
		selectItem(item) {
			this.selectedAddress = item
			this.isExpand = false
			this.$emit('select', item)
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
.selected-address
	height 96px
.addressBox
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
	.placeholder
		color #C0C4CC
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
							font-weight bold
							color #409EFF
.address
	text-overflow ellipsis
	overflow hidden
	white-space nowrap
</style>