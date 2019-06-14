// 头部组件
<template>
	<div class="header">
		<div class="title">
			<i @click="showAsideMenu" class="icon-menu"></i>
			<h1>CNode社区</h1>
			<i @click='showMsg' v-show='ak' class="icon-msg"></i>
			<span v-show='ak' class="msg-count">{{msgCount}}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'vheader',
	data() {
		return {
			msgCount: 0
		}
	},
	methods:{
		showAsideMenu(){
			this.$store.commit('showAsideMenu',true)
		},
		showMsg(){
			this.$store.commit('showMsg',true)
		}
	},
	computed:{
		ak(){
			return this.$store.state.ak
		}
	},
	created(){
		if(!this.ak)return
		this.axios.get('https://cnodejs.org/api/v1/message/count?accesstoken=' + this.ak)
		.then(res=>{
			this.msgCount = res.data.data
		})
	},
	components: {}
}
</script>

<style lang='scss' scoped>
.header{
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 70px;
	background-color: #2196f3;
	color: white;
	justify-content: center;
	align-items: center;
	i {
		position: absolute;
		z-index: 1;
		display: inline-block;
		flex: 1;
		width: 25px;
		height: 25px;
	}
	i.icon-menu {
		left: 20px;
		top: 25px;
		background: url('../common/icons/icon-menu.svg') no-repeat;
		background-size: contain;
	}
	i.icon-msg {
		right: 30px;
		top: 23px;
		background: url('../common/icons/icon-msg.svg') no-repeat;
		background-size: contain;
	}
	span.msg-count {
		position: absolute;
		width: 15px;
		height: 15px;
		top: 20px;
		right: 23px;
		background-color: #ff4081;
		border-radius: 10px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 80%;
	}
	h1 {
		letter-spacing: 2px;
		transition: 0.3s ease-in-out;
	}
	h1:hover {
		transform: rotate(8deg);
		transition: 0.3s ease-in-out;
	}
}
</style>
