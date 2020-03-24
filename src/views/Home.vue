<template>
	<section class="home">
		<div class="home__inner">
			<Sidebar/>
			<SearchList/>
		</div>
	</section>
</template>

<script>
	import Sidebar from '@/components/sidebar/sidebar.vue'
	import SearchList from '@/components/search-list/search-list.vue'
	import {mapActions} from "vuex";

	export default {
		name: 'Home',
		components: {
			Sidebar,
			SearchList
		},
	}
</script>

<style lang="scss">
	.home {
		&__inner {
			display: flex;
			flex-flow: row nowrap;
			align-items: flex-start;
		}
	}
</style>
