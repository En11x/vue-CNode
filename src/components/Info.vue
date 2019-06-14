// 个人中心组件
<template>
	<div class="info">
		<div class="info-header">
			<i class="icon-back"></i>个人中心
		</div>
		<transition name="slide-fade">
			\
			<div v-show="isShowContent" class="info-content">
				<!-- 用户个人信息 -->
				<div class="info-register">
					<div class="header">个人信息</div>
					<div class="userInfo">
						<div class="info-img">
							<img :src="userInfo.avatar_url" alt="用户头像">
							<span class="info-name">{{userInfo.loginname}}</span>
						</div>
						<div class="info-score">积分：{{user.score}}</div>
						<div class="info-git">
							Github：
							<a
								:href="'https://github.com/'+user.githubUsername"
								target="_blank"
							>{{'@'+user.githubUsername||user.loginname}}</a>
						</div>
						<div class="info-date">注册于：{{$moment(user.create_at).startOf('minute').fromNow()}}</div>
					</div>
				</div>
				<!-- 收藏的话题 -->
				<div class="info-collect">
					<div class="collect-title">收藏的话题</div>
					<div class="collect-content">
						<div v-for="item of collectTopics" class="collect-item" :key="item.id">
							<div class="author-avatar">
								<img :src="item.author.avatar_url" alt="作者头像">
							</div>
							<div class="desc">
								<p class="title">
									<router-link :to="{path:'/article',name:'Article',params:{id:item.id}}">{{item.title}}</router-link>
								</p>
								<p class="desc-con">
									<span class="visit">{{item.reply_count+'/'+item.visit_count}}</span>
									<span class="date">{{$moment(item.last_reply_at).startOf('minute').fromNow()}}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<!-- 最近参与的话题 -->
				<div class="info-collect">
					<div class="collect-title">最近参与的话题</div>
					<div class="collect-content">
						<div v-for="item of user.recent_replies" class="collect-item" :key="item.id">
							<div class="author-avatar">
								<img :src="item.author.avatar_url" alt="作者头像">
							</div>
							<div class="desc">
								<p class="title">
									<router-link :to="{path:'/article',name:'Article',params:{id:item.id}}">{{item.title}}</router-link>
								</p>
								<p class="desc-con">
									<span v-if="item.reply_count" class="visit">{{item.reply_count+'/'+item.visit_count}}</span>
									<span class="date">{{$moment(item.last_reply_at).startOf('minute').fromNow()}}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<!-- 最近创建的话题 -->
				<div class="info-collect">
					<div class="collect-title">最近创建的话题</div>
					<div class="collect-content">
						<div v-for="item of user.recent_topics" class="collect-item" :key="item.id">
							<div class="author-avatar">
								<img :src="item.author.avatar_url" alt="作者头像">
							</div>
							<div class="desc">
								<p class="title">
									<router-link :to="{path:'/article',name:'Article',params:{id:item.id}}">{{item.title}}</router-link>
								</p>
								<p class="desc-con">
									<span v-if="item.reply_count" class="visit">{{item.reply_count+'/'+item.visit_count}}</span>
									<span class="date">{{$moment(item.last_reply_at).startOf('minute').fromNow()}}</span>
								</p>
							</div>
						</div>

						<div v-if="!user.recent_topics.length">无话题</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'Info',
	data() {
		return {
			user: {},
			isShowContent: false
		}
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo
		},
		collectTopics() {
			return this.$store.state.collectTopics
		}
	},
	created() {
		// 并发多个请求
		this.axios
			.all([
				this.axios.get(
					`https://cnodejs.org/api/v1/topic_collect/${
						this.userInfo.loginname
					}`
				),
				this.axios.get(
					`https://cnodejs.org/api/v1/user/${this.userInfo.loginname}`
				)
			])
			.then(
				this.axios.spread((acct, perms) => {
					// 两个请求现在都执行完成
					// acct为第一个请求的数据
					this.$store.commit('updateCollectTopics', acct.data.data)
					// perms为第2个请求的数据
					this.user = perms.data.data
					this.isShowContent = true
				})
			)
	},
	components: {}
}
</script>

<style lang='scss' scoped>
.slide-fade-enter-active {
	transition: all 0.3s ease;
}
.slide-fade-leave-active {
	transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-leave-to {
	transform: translateX(160px);
	opacity: 0;
}
.info {
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #e1e1e1;
	.info-header {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 50px;
		color: white;
		font-size: 1.2rem;
		background-color: #2196f3;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		i.icon-back {
			position: absolute;
			left: 10px;
			display: inline-block;
			width: 38px;
			height: 38px;
			background: url('../common/icons/icon-back.svg') no-repeat;
			background-size: contain;
		}
	}
	.info-content {
		width: 100%;
		overflow: auto;
		font-size: 14px;
		overflow: auto;
		flex: 1;
		.info-register {
			margin: 5px 5px 0;
			.header {
				padding: 10px;
				background-color: #f6f6f6;
				border-radius: 3px 3px 0 0;
			}
			.userInfo {
				padding: 10px;
				border-top: 1px solid #e5e5e5;
				background-color: #fff;
				border-radius: 0 0 3px 3px;
				div {
					margin: 5px 0;
				}
				.info-img {
					line-height: 2em;
					display: flex;
					align-items: center;
					img {
						width: 40px;
						height: 40px;
						border-radius: 4px;
						margin-right: 10px;
					}
					.info-name {
						color: #778087;
					}
				}
				.info-date {
					color: #ababab;
				}
			}
		}
		.info-collect {
			margin: 0 5px;
			.collect-title {
				padding: 10px;
				background-color: #f6f6f6;
				border-radius: 3px 3px 0 0;
				color: #444;
			}
			.collect-content {
				background: #fff;
				border-radius: 4px;
				padding: 10px 0 5px 10px;
			}
			.collect-item {
				padding-right: 10px;
				padding: 10px 0;
				border-top: 1px solid #f0f0f0;
				font-size: 14px;
				display: flex;
				align-items: center;
				width: 100%;
				.author-avatar {
					img {
						width: 30px;
						height: 30px;
						border-radius: 3px;
					}
				}
				.desc {
					display: flex;
					width: 100%;
					flex-direction: column;
					justify-content: space-between;
					padding: 0 10px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					p {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #777;
					}
					p.desc-con {
						font-size: 0.8rem;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.visit {
							margin-left: 15px;
						}
					}
				}
			}
		}
	}
}
</style>
