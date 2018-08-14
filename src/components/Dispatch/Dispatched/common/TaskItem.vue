<template>
	<div class="taskItem">
		<div class="title">任务1（承运单477899）</div>
		<div class="baseInfo">
			<div class="from">1111111111111111</div>
			<div class="arrow">2</div>
			<div class="to">3333333333333333</div>
		</div>
	</div>
</template>
<style lang="stylus" scoped>
.taskItem
	width 100%
	border 1px solid #e2ecf6
	margin-top 10px
	.title
		padding 10px 15px
		border-bottom 1px solid #e2ecf6
	.baseInfo
		display flex
		
		.from
		.to
			flex 1
			padding 10px 15px
		.arrow
			flex 0 0 40px
			padding 10px 15px
</style>