<template>
	<header class="header">
		<div class="header__inner">
			<router-link class="header__link" to="/">Word Keeper</router-link>
			<router-link class="header__link" to="/starred">
				<svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fill="#fff"
						  d="m5.574 15.362-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.435.181-1.173-.423-1.265l-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.043-7.378 1.127c-.606.093-.848.83-.423 1.265z"/>
				</svg>
				Starred Words
			</router-link>
		</div>
	</header>
</template>

<script>
	export default {
		name: "top"
	}
</script>

<style scoped lang="scss">
	.header {
		padding: 20px;
		background-color: #5ec8ff;
		border-radius: 8px;
		margin-bottom: 50px;

		&__inner {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
		}

		&__link {
			font-size: 24px;
			color: #fff;
			font-weight: 700;
			text-decoration: none;

			svg {
				width: 20px;
			}

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>