<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<script>
export default {
	name: 'App',
	created() {
		if (localStorage.getItem('token')) {
			this.$store.dispatch('getUserInfo')
			this.$store.dispatch('getConsts')
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>
