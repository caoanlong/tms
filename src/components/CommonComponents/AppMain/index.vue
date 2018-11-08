<template>
	<section class="app-main" style="min-height: 100%">
		<keep-alive>      
			<router-view v-if="$route.query && $route.query.catche"/>    
		</keep-alive>    
		<router-view v-if="!($route.query && $route.query.catche)"/>
	</section>
</template>

<script>
export default {
	name: 'AppMain',
	computed: { 
		cachedViews() {
			return this.$store.state.tagsView.cachedViews
		}
		// key() {
		//   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
		// }
	}
}
</script>