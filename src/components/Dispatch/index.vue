<script type="text/javascript">
	export default {
		render: function(createElement) {
			return createElement('div', [
				createElement('router-view', {
					attrs: {
						key: Date.now()
					}
				})
			])
		}
	}
</script>