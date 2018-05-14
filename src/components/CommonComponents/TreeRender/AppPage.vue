<template>
	<span class="tree-expand">
		<span class="tree-label">
			<span>{{DATA.name}}</span>
		</span>
		<span class="tree-btn" v-show="CURRENTNODE ? CURRENTNODE.appPageID == DATA.appPageID : false">
			<span class="control-btn add" @click.stop="nodeAdd(STORE, DATA, NODE)">
				<i class="el-icon-plus"></i>添加子节点
			</span>
			<span class="control-btn delete" @click.stop="nodeDel(STORE, DATA, NODE)">
				<i class="el-icon-delete"></i>删除
			</span>
		</span>
	</span>
</template>
<script type="text/javascript">
	export default {
		props: ['NODE', 'DATA', 'STORE', 'CURRENTNODE'],
		methods: {
			nodeAdd(s,d,n){//新增
				this.$emit('nodeAdd', s, d, n)
			},
			nodeDel(s,d,n){//删除
				this.$emit('nodeDel', s, d, n)
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.tree-expand
		display flex
		width 100%
		.tree-label
			flex 1
		.tree-btn
			flex 0 0 80px
			.control-btn
				margin 0 3px
				&.add
					color #67C23A
				&.delete
					color #F56C6C
</style>