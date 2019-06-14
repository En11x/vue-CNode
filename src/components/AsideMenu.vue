// 侧边栏组件
<template>
	<div>
		<transition name="slide-left">
			<div v-show="isShowAsideMenu" class="aside-menu">
				<div class="menu">
					<!-- 用户信息 -->
					<div class="user">
						<div class="user-avatar">
							<img @click='showLogin' :src='userInfo.avatar_url||require("@/common/icons/icon-unlogin.svg")' alt="用户头像">
						</div>
						<div class="username">{{userInfo.success?userInfo.loginname:'点击头像登录'}}</div>
					</div>
					<!-- 其他信息 -->
					<div class="infos">
						<div @click='showMsg' class="msg block">
							<i class="icon-msg"></i>我的消息
						</div>
						<div @click='showNewArticle' class="new block">
							<i class="icon-new"></i>发布话题
						</div>
						<div @click='showInfo' class="info block">
							<i class="icon-info"></i>个人中心
						</div>
						<div @click='showAbout' class="about block">
							<i class="icon-about"></i>关于
						</div>
						<div @click='logOut' v-if='ak' class="out block">
							<i class="icon-out"></i>退出
						</div>
						<div class="cnode"></div>
					</div>
				</div>
				<!-- 遮罩 -->
				<div @click="showAsideMenu" class="mask"></div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'AsideMenu',
	data() {
		return {
		}
	},
	computed:{
		ak(){
			return this.$store.state.ak
			
		},
		userInfo(){
			return this.$store.state.userInfo

		},
		isShowAsideMenu(){
			return this.$store.state.isShowAsideMenu
		}
	},
	methods: {
		showAsideMenu(){
			this.$store.commit('showAsideMenu',false)
		},
		showAbout(){
			this.$store.commit('showAbout',true)
		},
		showLogin(){
			if(!this.ak){
				this.$store.commit('showLogin',true)
			}
		},
		showNewArticle(){
			if(!this.ak){
				this.$store.commit('showLogin',true)
				return
			}
			this.$store.commit('showNewArticle',true)
		},
		showInfo(){
			if(!this.ak){
				this.$store.commit('showLogin',true)
				return
			}
			this.$store.commit('showInfo',true)
		},
		showMsg(){
			if(!this.ak){
				this.$store.commit('showLogin',true)
				return
			}
			this.$store.commit('showMsg',true)
		},
		logOut(){
			//退出登录
			localStorage.removeItem('userInfo')
			localStorage.removeItem('ak')
			location.reload()
		}
	},
	components: {}
}
</script>

<style lang='scss' scoped>

.aside-menu {
	position: absolute;
	display: flex;
	z-index: 1;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	.menu {
		display: flex;
		flex-direction: column;
		width: 220px;
		background-color: #fff;
		box-shadow: 0 0 12px gray;
		.user {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 200px;
			background-color: #2196f3;
			color: white;
			.user-avatar {
				img {
					width: 100px;
					height: 100px;
					border-radius: 50px;
					cursor: pointer;
				}
			}
			.username {
				font-size: 1.2rem;
			}
		}
		.infos {
			display: flex;
			width: 100%;
			flex-direction: column;
			align-items: center;
			flex: 1;
			.block {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				padding-left: 40px;
				cursor: pointer;
			}
			.block + .block {
				border-top: 1px solid rgba(0, 0, 0, 0.05);
			}
			i {
				display: inline-block;
				width: 22px;
				height: 22px;
				background-repeat: no-repeat;
				margin-right: 8px;
			}
			.icon-msg {
				background: url('../common/icons/icon-msg-blue.svg');
				background-size: contain;
			}
			.icon-new {
				background: url('../common/icons/icon-new.svg');
				background-size: contain;
			}
			.icon-info {
				background: url('../common/icons/icon-info.svg');
				background-size: contain;
			}
			.icon-about {
				background: url('../common/icons/icon-about.svg');
				background-size: contain;
			}
			.icon-out {
				background: url('../common/icons/icon-out.svg');
				background-size: contain;
			}
			.cnode {
				margin-top: 50px;
				width: 50%;
				flex: 1;
				background-color: red;
				background: url('../common/icons/icon-cnode.svg') no-repeat;
				background-size: contain;
				opacity: 0.1;
			}
		}
	}
	.mask {
		flex: 1;
	}
}
</style>
