import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';

import Home from '../views/Home.vue'
import Starred from '../views/Starred.vue'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		components: {
			default: Home,
		}
	},
	{
		path: '/starred',
		name: 'Starred',
		components: {
			default: Starred,
		}
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	store.commit('enterSearchWords', '');
	next()
})

export default router
