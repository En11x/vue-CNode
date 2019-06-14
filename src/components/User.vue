//用户信息组件
<template>
	<div class="user">
		<!-- 用户信息 -->
		<div class="info panel">
			<div class="header">个人信息</div>
			<div class="desc">
				<div class="avatar">
					<img :src="user.avatar_url" alt="用户头像">
					<span>{{user.loginname}}</span>
				</div>
				<div class="desc-item">积分：{{user.score}}</div>
				<div class="desc-item">
					Github：
					<a
						:href="'https://github.com/'+user.githubUsername"
						target="_blank"
					>@{{user.githubUsername}}</a>
				</div>
				<div class="desc-item date">注册时间{{$moment(user.create_at).startOf('minute').fromNow()}}</div>
			</div>
		</div>
		<!-- 收藏的话题 -->
		<div class="collect-topic panel">
			<div class="header">收藏的话题</div>
			<div class="topics">
				<div v-for="item of showCollectTopics" class="item" :key="item.id">
					<!-- 用户头像 -->
					<router-link :to="{path:'/user',name:'User',params:{id:item.author.loginname}}">
						<img :src="item.author.avatar_url" alt>
					</router-link>
					<div class="title">
						<router-link :to="{path:'/article',name:'Article',params:{id:item.id}}">{{item.title}}</router-link>
					</div>
					<span class="visit">{{item.reply_count+'/'+item.visit_count}}</span>
					<span class="date">{{$moment(item.last_reply_at).startOf('minute').fromNow()}}</span>
				</div>
				<div @click="showMore(1)" v-if="isShowMore1" class="item more">查看更多»</div>
				<div v-if="!collectTopics.length" class="item more">无话题</div>
			</div>
		</div>
		<!-- 最近创建的话题 -->
		<div class="recent-topic panel">
			<div class="header">最近创建的话题</div>
			<div class="topics">
				<div v-for="item of recent_topics" class="item" :key="item.id">
					<!-- 用户头像 -->
					<router-link to="/">
						<img :src="item.author.avatar_url" alt>
					</router-link>
					<div class="title">
						<router-link :to="{path:'/article',name:'Article',params:{id:item.id}}">{{item.title}}</router-link>
					</div>
					<span class="date">{{$moment(item.last_reply_at).startOf('minute').fromNow()}}</span>
				</div>
				<div @click="showMore(2)" v-if="isShowMore2" class="item more">查看更多»</div>
				<div v-if="!recent_topics.length" class="item more">无话题</div>
			</div>
		</div>
		<!-- 最近参与的话题 -->
		<div class="recent-reply panel">
			<div class="header">最近参与的话题</div>
			<div class="topics">
				<div v-for="item of recent_replies" class="item" :key="item.id">
					<!-- 用户头像 -->
					<router-link to="/">
						<img :src="item.author.avatar_url" alt>
					</router-link>
					<div class="title">
						<router-link :to="{path:'/article',name:'Article',params:{id:item.id}}">{{item.title}}</router-link>
					</div>
					<span class="date">{{$moment(item.last_reply_at).startOf('minute').fromNow()}}</span>
				</div>
				<div @click="showMore(3)" v-if="isShowMore3" class="item more">查看更多»</div>
				<div v-if="!recent_replies.length" class="item more">无话题</div>
			</div>
		</div>
		<!-- 返回图标 -->
		<div class="back">
			<i @click="$router.go(-1)" class="icon-back"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'User',
	data() {
		return {
			collectTopics: [], //所有的数据
			showCollectTopics: [], //要显示的数据
			recent_topics: [],
			recent_replies: [],
			user: {},
			isShowMore1: null,
			isShowMore2: null,
			isShowMore3: null,
			mybatis: false
		}
	},
	methods: {
		showMore(num) {
			if (num === 1) {
				this.showCollectTopics = this.collectTopics
				this.isShowMore1 = false
			} else if (num === 2) {
				this.recent_topics = this.user.recent_topics
				this.isShowMore2 = false
			} else {
				this.recent_replies = this.user.recent_replies
				this.isShowMore3 = false
			}
		},
		getData(loginname) {
			// 并发多个请求
			this.axios
				.all([
					this.axios.get(
						`https://cnodejs.org/api/v1/topic_collect/${loginname}`
					),
					this.axios.get(
						`https://cnodejs.org/api/v1/user/${loginname}`
					)
				])
				.then(
					this.axios.spread((acct, perms) => {
						// 两个请求现在都执行完成
						// acct为第一个请求的数据
						this.collectTopics = acct.data.data
						// perms为第2个请求的数据
						this.user = perms.data.data
						if (acct.data.data.length > 10) {
							this.isShowMore1 = true
							this.showCollectTopics = acct.data.data.slice(0, 4)
						} else {
							this.showCollectTopics = acct.data.data
						}
						if (perms.data.data.recent_topics.length > 10) {
							this.isShowMore2 = true
							this.recent_topics = perms.data.data.recent_topics.slice(
								0,
								4
							)
						} else {
							this.recent_topics = perms.data.data.recent_topics
						}
						if (perms.data.data.recent_replies.length > 10) {
							this.isShowMore3 = true
							this.recent_replies = perms.data.data.recent_replies.slice(
								0,
								4
							)
						} else {
							this.recent_replies = perms.data.data.recent_replies
						}
						this.isShowContent = true
					})
				)
		}
	},
	//动态路由变化
	beforeRouteUpdate(to, from, next) {
		this.getData(to.params.id)
		next()
	},
	created() {
		this.getData(this.$route.params.id)
	},
	components: {}
}
</script>

<style lang='scss' scoped>
.user {
	position: absolute;
	z-index: 1;
	width: 100%;
	padding: 8px 0;
	background-color: #e1e1e1;
	.panel {
		margin: 0 5px;
		background-color: #fff;
		.header {
			padding: 10px;
			background-color: #f6f6f6;
			border-radius: 3px 3px 0 0;
			color: #333;
			line-height: 20px;
		}
		img {
			width: 40px;
			height: 40px;
			border-radius: 3px;
			margin-right: 10px;
		}
	}
	.info {
		.desc {
			padding: 10px;
			border-top: 1px solid #e5e5e5;
			.avatar {
				display: flex;
				span {
					color: #778087;
					padding-top: 6px;
				}
			}
			.desc-item {
				padding: 5px;
				font-size: 14px;
			}
			.date {
				color: #ababab;
			}
		}
	}
	.panel {
		.topics {
			padding: 10px;
			border-top: 1px solid #e5e5e5;
			.more {
				color: #777;
				font-size: 14px;
				padding-bottom: 0 !important;
			}
			.item {
				padding: 6px 0 10px;
				background: #fff;
				border-top: 1px solid #f0f0f0;
				position: relative;
				overflow: hidden;
				img {
					float: left;
				}
				.title {
					text-overflow: ellipsis;
					line-height: 20px;
					white-space: nowrap;
					padding-top: 6px;
					overflow: hidden;
				}

				span.visit {
					position: absolute;
					bottom: 0;
					left: 70px;
					text-align: left;
					line-height: 2em;
					font-size: 0.8em;
				}
				span.date {
					position: absolute;
					bottom: 0;
					right: 10px;
					font-size: 0.8em;
					color: #777;
				}
			}
		}
	}
	.back {
		position: fixed;
		top: 60%;
		left: -8px;
		width: 50px;
		height: 50px;
		i.icon-back {
			display: inline-block;
			width: 100%;
			height: 100%;
			background: url('../common/icons/icon-back-blue.svg') no-repeat;
			background-size: contain;
			opacity: 0.5;
			cursor: pointer;
		}
	}
}
</style>
