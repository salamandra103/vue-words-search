import Vue from 'vue'
import Vuex from 'vuex'

import router from '@/router';

Vue.use(Vuex);

export const state = {
	words: [],
	searchResult: [],
	searchText: '',
	starreds: [],
	filters: [
		{
			value: 'noun',
			status: false,
		},
		{
			value: 'verb',
			status: false,
		},
		{
			value: 'adjective',
			status: false,
		},
		{
			value: 'abbreviation',
			status: false
		}
	]
}

export const getters = {
	words: function (state, getters) {
		// Set checked filters
		let checkedFilters = state.filters.filter(filter => filter.status === true);

		state.words.find(word => {
			state.starreds.find(starred => {
				word.title == starred.title ? word.isStarred = true : false
			})
		});

		// Check set filter
		if (checkedFilters.length) {
			return state.words.filter(word => {
				// Equal word and checked filter
				if (checkedFilters.some(filter => filter.value === word.fl)) {
					return word;
				}
			})
		} else {
			return state.words;
		}
	},
	searchedWords: state => {
		// Set checked filters
		let checkedFilters = state.filters.filter(filter => filter.status === true);
		let pageWords = [];
		// Check route
		if (router.currentRoute.path === '/starred') {
			pageWords = state.starreds;
		} else if (router.currentRoute.path === '/') {
			pageWords = state.words
		}

		// Check enter search
		let arr = pageWords.filter(word => {
			if (word.title.indexOf(state.searchText) > -1 && word.title.indexOf(state.searchText) < 1) {
				return word
			}
			return false
		});

		// Check set filter
		if (checkedFilters.length) {
			return arr.filter(word => {
				// Equal word and checked filter
				if (checkedFilters.some(filter => filter.value === word.fl)) {
					return word;
				}
			})
		} else {
			return arr;
		}
	},
	starreds: (state, getters) => {
		// Set checked filters
		let checkedFilters = state.filters.filter(filter => filter.status === true);
		// Check set filter
		if (checkedFilters.length) {
			return state.starreds.filter(word => {
				// Equal word and checked filter
				if (checkedFilters.some(filter => filter.value === word.fl)) {
					return word;
				}
			})
		} else {
			return state.starreds;
		}
	}
}

export const mutations = {
	setSearchResult: (state, payload) => {
		payload.sort();
		state.searchResult = payload;
	},
	setWords: (state, payload) => {
		state.words.push({
			title: payload.title,
			fl: payload.fl,
			shortdef: payload.shortdef,
			prs: payload.prs,
			isStarred: false
		});
	},
	setStarred: state => {
		state.starreds = JSON.parse(localStorage.getItem('starreds')) ? JSON.parse(localStorage.getItem('starreds')) : state.starreds;
	},
	moveStarred: (state, payload) => {
		state.starreds = payload;
		localStorage.setItem('starreds', JSON.stringify(payload));
	},
	enterSearchWords: (state, payload) => {
		state.searchText = payload;
	},
	addStarred: (state, payload) => {
		if (state.starreds.length) {
			let activeIndex;
			let equal = state.starreds.some((item, index) => {
				activeIndex = index;
				return item.title == payload.title
			});
			if (equal) {
				// Fix isStarred for word list
				state.words.find(word => {
					state.starreds.some(starred => {
						if (word.title == starred.title) {
							word.isStarred = false;
							return true;
						}
					})
				});
				// Delete starred from list
				state.starreds.splice(activeIndex, 1);
			} else {
				// Add starred in list
				state.starreds.push(payload);
				payload.isStarred = true;
			}
		} else {
			// Add starred in list
			state.starreds.push(payload);
			payload.isStarred = true;
		}
		localStorage.setItem('starreds', JSON.stringify(state.starreds));
	},
	changeFilter: (state, payload) => {
		state.filters.find(item => {
			return item.value == payload.value ? item.status = event.target.checked : false
		});
	},
	clearWords: () => {
		state.words = [];
	},
}

export const actions = {

	search: async ({commit, dispatch}, payload) => {
		await Vue.axios({
			"method": "GET",
			"url": "https://wordsapiv1.p.rapidapi.com/words/",
			"headers": {
				"content-type": "application/octet-stream",
				"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
				"x-rapidapi-key": "299fe45fc6msh95452e5eab7f2c8p1f2be6jsn8cffccf41a0c"
			}, "params": {
				"limit": "500",
				"letterPattern": '\s\d',
				"page": "1",
				"hasDetails": "typeOf,ChasCategories"
			}
		})
			.then((response) => {
				commit('setSearchResult', response.data.results.data);
			})
			.then(() => {
				dispatch('create');
			})
			.catch((error) => {
				console.log(error)
			})
	},

	create: async ({commit, state}, payload) => {
		await commit('clearWords');
		await state.searchResult.forEach(item => {
			Vue.axios.get(`https://dictionaryapi.com/api/v3/references/collegiate/json/${item}?key=3c59df7d-2b48-4647-82cd-7676e1726d2c`)
				.then(response => {
					if (typeof response.data[0] == 'object') {
						commit('setWords', {
							title: item,
							fl: response.data[0].fl,
							shortdef: response.data[0].shortdef,
							prs: response.data[0].hwi && response.data[0].hwi.prs ? response.data[0].hwi.prs[0].mw : ''
						})
					}
				})
				.catch((error) => {
					console.log(error)
				})
		});
		await commit('setStarred');
	},
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
})
