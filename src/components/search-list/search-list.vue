<template>
	<div class="search-list">
		<div class="search-list__container">
			<div class="search-list__grid">
				<div class="search-list__row" v-if="this.$route.path != '/starred'">
					<SearchItem v-for="(item, index) in items" :key="index" :item="item"/>
				</div>

				<draggable v-model="items" v-else-if="this.$route.path == '/starred'" group="searchItems">
					<transition-group type="transition" name="flip-list" tag="div" class="search-list__row">
						<SearchItem v-for="(item, index) in items" style="cursor: move" :key="item.title" :item="item"/>
					</transition-group>
				</draggable>
			</div>
		</div>
	</div>
</template>

<script>
	import SearchItem from '@/components/search-item/search-item';
	import {mapMutations, mapActions} from 'vuex';
	import draggable from 'vuedraggable';

	export default {
		name: "search-list",
		components: {
			SearchItem,
			draggable
		},
		computed: {
			items: {
				get() {
					if (this.$store.state.searchText.length) {
						return this.$store.getters.searchedWords;
					} else if (this.$route.path == '/starred' && !this.$store.state.searchText.length) {
						return this.$store.getters.starreds;
					} else if (this.$route.path == '/' && !this.$store.state.searchText.length) {
						return this.$store.getters.words;
					}
				},
				set(value) {
					if (this.$route.path == '/starred') {
						this.$store.commit('moveStarred', value);
					}
				}
			}
		},
		methods: {
			...mapActions(['search']),
			...mapMutations(['moveWord']),
		},
		created() {
			if (!this.$store.getters.words.length) {
				this.search();
			}
		}
	}
</script>

<style lang="scss">
	.search-list {
		max-width: calc(100% - 390px);
		width: 100%;

		&__container {

		}
	}
	.sortable-drag {
		opacity: 0;
	}

	.flip-list-move {
		transition: transform .5s;
	}
</style>