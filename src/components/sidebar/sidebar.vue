<template>
	<aside class="sidebar">

		<div class="sidebar__search">
			<input type="text" @input="enterText" v-model="searchText" class="sidebar__search-input"
				   placeholder="Enter text...">
		</div>

		<div class="sidebar__filter">
			<ul class="sidebar__filter-list">
				<li class="sidebar__filter-item" v-for="filter in filters">
					<label class="sidebar__filter-label">
						<input type="checkbox" v-model="filter.status" :value="filter.value"
							   @change="changeFilter(filter)" class="sidebar__filter-check">
						<span class="sidebar__filter-icon"></span>
						{{filter.value}}
					</label>
				</li>
			</ul>
		</div>

	</aside>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';

	export default {
		name: "sidebar",
		computed: {
			...mapState(['filters'])
		},
		data() {
			return {
				searchText: ''
			}
		},
		methods: {
			...mapMutations(['changeFilter', 'enterSearchWords']),
			enterText() {
				this.enterSearchWords(this.searchText)
			},
			selectFilter() {
			}
		}
	}
</script>

<style lang="scss">
	.sidebar {
		background-color: #eaeaea;
		max-width: 390px;
		padding: 15px 15px;
		border-radius: 5px;
		margin-right: 40px;

		&__search {
			margin-bottom: 15px;

			&-input {
				border: none;
				border-radius: 5px;
				width: 100%;
				font-size: 20px;
				min-height: 50px;
				padding-left: 20px;
				padding-right: 50px;
				outline: none;
				background-image: url('https://icongr.am/clarity/search.svg?color=E1E1E1&size=26');
				background-repeat: no-repeat;
				background-position: 95% 50%;
			}
		}

		&__filter {
			&-list {
				padding-left: 10px;
			}

			&-item {
				margin-bottom: 10px;
			}

			&-label {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				font-size: 18px;
				cursor: pointer;
			}

			&-check {
				display: none;

				&:checked {
					& + span {
						&:before {
							transform: scale(1);
						}
					}
				}
			}

			&-icon {
				width: 20px;
				height: 20px;
				border-radius: 3px;
				background-color: #fff;
				display: inline-block;
				margin-right: 8px;
				transition: .2s;
				overflow: hidden;

				&:before {
					content: '';
					border-radius: 3px;
					width: 100%;
					height: 100%;
					display: block;
					transition: .3s;
					transform: scale(0);
					background-color: #50adff;
				}
			}
		}
	}
</style>