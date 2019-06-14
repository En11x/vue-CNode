// 关于项目说明
<template>
	<div class="about">
		<i @click="showAbout" class="close"></i>
		<div class="about-content">
			<h1>关于</h1>
			<h2>Ve.js打造一个开元的CNode社区</h2>
			<p class="skill">
				<b>技术栈：</b>
			</p>
			<div>
				Vue2
				<br>Vuex(不同组件状态共享)
				<br>vue-router(路由)
				<br>axios(发送htpp请求)
				<br>SASS(SCSS)
				<br>Webpack
				<br>Moment.js(时间处理)
				<br>ES6
				<br>localStorage(HTML5)
				<br>Canvas(页面小雪花)
				<br>CSS3
			</div>
			<p class="url">
				<b>源码地址</b>:
				<a href taget="_blank">Github</a>
			</p>
		</div>
		<div @click="showAbout" class="mask"></div>
	</div>
</template>

<script>
export default {
	name: 'About',
	data() {
		return {}
	},
	computed: {
		isShowAbout() {
			return this.$store.state.isShowAbout
		}
	},
	methods: {
		showAbout() {
			this.$store.commit('showAbout', false)
		}
	},
	components: {}
}
</script>

<style lang='scss' scoped>
a {
	color: #3f51b5;
}
.about {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	.close {
		position: absolute;
		z-index: 3;
		width: 30px;
		height: 30px;
		background: url('../common/icons/close.svg') no-repeat;
		background-size: contain;
		top: 11%;
		right: 12%;
	}
	.about-content {
		position: relative;
		z-index: 2;
		width: 80%;
		height: 80%;
		background-color: #fff;
		border-radius: 10px;
		padding: 30px 10px;
		box-shadow: 0 0 20px gray;
		overflow: auto;
		h1 {
			text-align: center;
			font-size: 1.2rem;
			color: #31c27c;
		}
		h2 {
			margin-top: 10px;
			font-size: 1.1rem;
			text-align: center;
		}
		p {
			text-indent: 1em;
			word-break: break-all;
			margin-top: 6px;
			b {
				display: inline-block;
			}
		}
		div {
			padding: 10px 0 10px 50px;
		}
	}
	.mask {
		position: absolute;
		z-index: 0;
		width: 100%;
		height: 100%;
		background: none;
	}
}
</style>
