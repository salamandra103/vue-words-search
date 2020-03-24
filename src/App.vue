<template>
	<div id="app">
		<div id="wrapper">

			<Header/>

			<main class="content">
				<router-view></router-view>
			</main>

		</div>
	</div>
</template>

<script>
	import Header from '@/components/top/top';

	export default {
		name: 'App',
		components: {
			Header,
		}
	}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap');

	body {
		font-family: Roboto, sans-serif;
		font-size: 14px;
		line-height: 1.25;
	}

	html, body, #app {
		height: 100%;
	}

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	ul, li {
		list-style: none;
	}

	#wrapper {
		background-color: #f2f2f2;
		padding: 10px 20px;
		min-height: 100%;
	}

</style>