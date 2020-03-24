<template>
	<div :class="active ? 'search-item word active' : 'search-item word'">
		<div class="word__row">
			<span class="word__button" @click="open" v-if="more">
				<span></span>
			</span>
			<span class="word__title">{{item.title}}</span>
			<span class="word__type">{{item.fl}}</span>
			<span class="word__defin">{{item.shortdef[0]}}</span>
			<span class="word__starred" @click="checkStarred">
			<svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path :fill="item.isStarred ? '#5ec8ff' : '#cdf1ff'"
					  d="m5.574 15.362-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.435.181-1.173-.423-1.265l-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.043-7.378 1.127c-.606.093-.848.83-.423 1.265z"/>
			</svg>
		</span>
		</div>
		<div class="word__bottom" v-if="active">
			<div v-if="isShortDef">
				<p>short definition: </p>
				<ul class="word__defins-list">
					<li class="word__defins-item" v-for="item in shortDefs">
						{{item}}
					</li>
				</ul>
			</div>
			<div v-if="isTranscription">
				<p>transcription: </p>
				<span class="word__defins-transcription">[{{item.prs}}]</span>
			</div>
		</div>



	</div>
</template>

<script>
	import {mapActions, mapMutations} from 'vuex';

	export default {
		name: "search-item",
		props: ['item'],
		data() {
			return {
				active: false,
			}
		},
		computed: {
			more: function () {
				return this.item.shortdef.filter((item, index) => index != 0).length || this.item.prs ? true : false
			},
			isShortDef: function () {
				return this.item.shortdef.filter((item, index) => index != 0).length ? true : false;
			},
			isTranscription: function () {
				return this.item.prs ? true : false
			},
			shortDefs: function () {
				return this.item.shortdef.filter((item, index) => index != 0)
			}
		},
		methods: {
			...mapMutations(['addStarred']),
			checkStarred: function () {
				this.addStarred(this.item);
			},
			open: function () {
				this.active = !this.active;
			}
		},
	}
</script>

<style lang="scss">
	.word {
		font-size: 18px;
		color: #000;
		background-color: #C2F3FF;
		background-color: #fff;
		border-radius: 5px;
		padding: 10px 20px;
		margin-bottom: 20px;

		&:last-of-type {
			margin-bottom: 0;
		}

		span {
			white-space: nowrap;
		}

		&__button {
			display: flex;
			align-items: center;
			width: 30px;
			height: 30px;
			margin-right: 20px;
			cursor: pointer;
			span {
				display: block;
				width: 30px;
				height: 2px;
				background-color: #000;
				position: relative;
				&:before,&:after {
					content: '';
					background-color: #000;
					width: 100%;
					height: 2px;
					position: absolute;
					top: 0;
					left: 0;
				}
				&:before {
					transform: translateY(-6px);
				}
				&:after {
					transform: translateY(6px);
				}
			}
		}

		&__bottom {
			border-top: 1px solid #000;
			padding-left: 10px;
			padding-bottom: 10px;
			p {
				margin-bottom: 10px;
				margin-top: 10px;
			}
		}

		&__row {
			position: relative;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			min-height: 60px;
		}

		&__title {
			font-weight: 700;
			padding-right: 30px;
		}

		&__type {
			padding-right: 30px;
		}

		&__defin {
			text-overflow: ellipsis;
			overflow: hidden;
			padding-right: 70px;
		}

		&__defins {
			&-list {
				display: block;
				padding-left: 10px;
			}
			&-item {
				font-size: 12px;
			}
			&-transcription {
				font-size: 12px;
				padding-left: 10px;
			}
		}

		&__starred {
			position: absolute;
			right: 20px;
			top: 50%;
			transform: translateY(-50%);
			width: 30px;
			cursor: pointer;
			flex-shrink: 0;

			svg path {
				transition: .2s;
			}

			&:hover {
				svg path {
					fill: #5ec8ff;
				}
			}
		}
	}
</style>