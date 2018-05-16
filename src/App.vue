<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'App',
	computed: {
		...mapGetters(['consts'])
	},
	created() {
		if (localStorage.getItem('token')) {
			this.$store.dispatch('getUserInfo')
			this.$store.dispatch('getConsts')
			this.$store.dispatch('getMenu')
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>
