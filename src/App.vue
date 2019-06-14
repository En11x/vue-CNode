<template>
	<div id="app">
		<VHeader/>
		<Content/>
		<AsideMenu/>
		<transition name="show">
			<Login v-if='isShowLogin'/>
		</transition>
		<transition name="show">
			<Msg v-if='isShowMsg'/>
		</transition>
		<transition name="show">
			<NewArticle v-if='isShowNewArticle'/>
		</transition>
		<transition name="show">
			<Info v-if='isShowInfo'/>
		</transition>
		<transition name="showAbout">
			<About v-if='isShowAbout'/>
		</transition>
	</div>
</template>

<script>
import VHeader from '@/components/VHeader'
import AsideMenu from '@/components/AsideMenu'
import Content from '@/components/Content'
import Login from '@/components/Login'
import Msg from '@/components/Msg'
import NewArticle from '@/components/NewArticle'
import Info from '@/components/Info'
import About from '@/components/About'
export default {
	name: 'App',
	components: {
		VHeader,
		Content,
		AsideMenu,
		Login,
		Msg,
		NewArticle,
		Info,
		About
	},
	computed:{
		isShowLogin(){
			return this.$store.state.isShowLogin
		},
		isShowMsg(){
			return this.$store.state.isShowMsg
		},
		isShowNewArticle(){
			return this.$store.state.isShowNewArticle
		},
		isShowInfo(){
			return this.$store.state.isShowInfo
		},
		isShowAbout(){
			return this.$store.state.isShowAbout
		}
	}
}
</script>

<style lang='scss'>
/* 加载全局样式 */
@import './common/style/base.scss';
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.show-enter-active{
	transition: all .3s ease;
}
.show-leave-active{
	transition: all .2s ease-in;
}
.show-enter,.show-leave-to{
	transform: translateX(200px);
	opacity: 0;
}
.showAbout-enter-active{
    transition: all .4s ease-in-out;
}
.showAbout-leave-active{
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.showAbout-enter,.showAbout-leave-to{
    transform: rotateZ(180deg);
    opacity:0;
}
</style>
