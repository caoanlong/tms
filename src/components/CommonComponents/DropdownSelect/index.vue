<template>
	<div class="vue-dropdown" v-show-extend="show">
		<div class="search-module clearfix" v-show="itemlist.length">
			<input class="search-text" 
			@keyup='search($event)' :placeholder="placeholder" />
			<span class="el-icon-search"></span>
		</div>
		<ul class="list-module" v-show="length">
			<li v-for ="(item,index) in datalist" @click="appClick(item)" :key="index">
				<span class="list-item-text">{{item.name}}</span>
			</li>
		</ul>
		<div class="tip__nodata" v-show="!length">{{nodatatext}}</div>
		<div class="customerAddressComponents" @click="selectAddress">
			<div class="results"></div>
			<div class="AddressPop" v-show="selectAddressPop">
				
			</div>
		</div>
	</div>

</template>
<script>
export default {
	data(){
		return {
			datalist:[]
		}
	},
	props:{
		'show':{
			type:Boolean,
			default:true
		},
		'itemlist':Array,
		'placeholder':String,
		'nodatatext':String
	},
	watch:{
		itemlist:function(val){
			this.datalist = val.concat();
		}
	},
	directives:{
		'show-extend':function(el,binding,vnode){
			let value = binding.value,searchInput = null;
			if(value){
				el.style.display='block';
			}else{
				el.style.display='none';
				searchInput = el.querySelector(".search-text");
				searchInput.value = '';
				vnode.context.datalist = vnode.context.itemlist;
			}
		}
	},
	methods:{
		appClick(data){
			this.$emit('item-click',data);
		},
		search(e){
			let vm = this,searchvalue = e.currentTarget.value;
			vm.datalist = vm.itemlist.filter(function(item,index,arr){
				return item.name.indexOf(searchvalue) != -1;
			});
		}
	},
	computed:{
		length:function(){
			return this.datalist.length;
		}
	}
}
</script>
<style lang="stylus" scoped>
.customerAddressComponents
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
	.AddressPop
		position absolute
		background #fff
		top 96px
		left 0
		right 0
		border 1px solid #dcdfe6
		width 100%
		height 32px
		z-index 10
		width 100%
</style>
