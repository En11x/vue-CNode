// 文章详情组件
<template>
	<div class="article-detail">
		<!-- 文章主体部分 -->
		<div class="body">
			<!-- 文章标题 -->
			<div class="article-title">
				<h1>
					<span class="flag" v-show="articleInfo.top||articleInfo.good">{{articleInfo.top?'置顶':'精华'}}</span>
					{{articleInfo.title}}
				</h1>
				<div class="desc">
					<p>
						发布于 {{$moment(articleInfo.create_at).startOf('day').fromNow()}}
						作者:
						<router-link
							:to="{path:'/user',name:'User',params:{id:articleInfo.author&&articleInfo.author.loginname}}"
						>{{articleInfo.author&&articleInfo.author.loginname}}</router-link>
						{{articleInfo.visit_count}}次浏览
						来自于：{{tab[articleInfo.tab]}}
					</p>
				</div>
			</div>
			<!-- 文章内容 -->
			<div v-html="articleInfo.content" class="md"></div>
			<!-- 回复部分 -->
			<div class="reply">
				<div class="other">
					<!-- 收藏文章 -->
					<div @click="collect" class="collect">
						<i :class="articleInfo.is_collect?'collected':'collected-no'"></i>收藏文章
					</div>
					<!-- 回复数量 -->
					<div class="total-reply">{{articleInfo.reply_count}}回复</div>
				</div>
				<!-- 评论文章 -->
				<div class="reply-input">
					<input v-model="replyArticleContent" type="text" placeholder="请输入评论内容">
					<button @click="reply" type="button">评论</button>
				</div>

				<!-- 回复内容 -->
				<div v-for="(item,index) in replies" class="reply-item" :key="item.id">
					<!-- 回复的作者 -->
					<div class="reply-author">
						<div class="reply-avatar">
							<img :src="item.author.avatar_url" alt="用户头像">
							<div class="reply-desc">
								<router-link :to="{path:'/user',name:'User',params:{id:item.author.loginname}}">{{item.author.loginname}}</router-link>
								{{replies.length - index}}楼 • {{$moment(item.create_at).startOf('day').fromNow()}}
								<span @click="currentIndex=index" class="reply-at">回复</span>
								<i @click="ups(item,index)" :class='[item.is_uped?"ups-yes":"ups-no"]' class="icon-reply-at"></i>
								<span class="ups-count">{{item.ups.length}}</span>
							</div>
						</div>
					</div>

					<!-- 回复的内容 -->
					<div v-html="item.content" class="reply-item"></div>

					<!-- 回复别人的评论 -->
					<transition name="slide-top">
						<div v-show="currentIndex==index" class="reply-one">
							<input type="text">
							<button @click="reply" type="button">回复</button>
							<button @click="currentIndex = null" type="button">取消</button>
						</div>
					</transition>
				</div>
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
	name: 'Article',
	data() {
		return {
			// 文章id
			id: this.$route.params.id,
			//文章信息
			articleInfo: {},
			//文章类型
			tab: { share: '分享', ask: '问答', job: '招聘' },
			//文章的回复信息
			replies: [],
			//回复某个人评论的index
			currentIndex: null,
			//评论文章的内容
			replyArticleContent: ''
		}
	},
	computed: {
		//用户登录就存在ak
		ak() {
			return this.$store.state.ak
		}
	},
	methods: {
		//点击收藏
		collect() {
			if (!this.ak) {
				this.$store.commit('showLogin', true)
				return
			}
		},
		//点击评论和回复别人的评论
		reply() {
			if (!this.ak) {
				this.$store.commit('showLogin', true)
				return
			}
		},
		//点赞
		ups(item, index) {
			if (!this.ak) {
				// 未登录
				this.$store.commit('showLogin', true)
				return
			}
			if (item.author.loginname === this.userInfo.loginname) {
				//不能给自己点赞
				alert('不能自己为自己点赞哦😯')
				return
			}
			this.axios
				.post(`https://cnodejs.org/api/v1/reply/${item.id}/ups`, {
					accesstoken: this.ak
				})
				.then(res => {
					console.log(1)
				})
		}
	},
	created() {
		//发送请求拿文章数据
		this.axios
			.get('https://cnodejs.org/api/v1/topic/' + this.id)
			.then(res => {
				;(this.articleInfo = res.data.data),
					(this.replies = res.data.data.replies.reverse())
			})
	},
	components: {}
}
</script>

<style lang='scss' scoped>
.article-detail {
	position: relative;
	z-index: 1;
	height: 100%;
	padding: 8px 5px 0 5px;
	background-color: rgba(0, 0, 0, 0.07);
	overflow-x: hidden;
	overflow-y: auto;
	.body {
		background-color: #fff;
		height: 100%;
		border-radius: 4px;
		.article-title {
			width: 100%;
			padding: 3px 0 5px 5px;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			h1 {
				font-size: 1.2rem;
				.flag {
					background-color: #80bd01;
					padding: 2px 5px;
					font-size: 80%;
					color: white;
					border-radius: 5px;
					margin-right: 5px;
				}
			}
			.desc {
				padding-top: 3px;
				p {
					font-size: 80%;
					color: gray;
				}
			}
		}
		.md {
			width: 100%;
			overflow: hidden;
		}
		.reply {
			.other {
				margin-top: 20px;
				margin-bottom: 10px;
				padding-left: 10px;
				display: flex;
				justify-content: space-between;
				i {
					display: inline-block;
					width: 18px;
					height: 18px;
					margin-right: 3px;
				}
				.collected {
					background: url('../common/icons/icon-collect-yes.svg')
						no-repeat;
					background-size: contain;
					background-position: 0 3px;
				}
				.collected-no {
					background: url('../common/icons/icon-collect-no.svg')
						no-repeat;
					background-size: contain;
					background-position: 0 3px;
				}
				.total-reply {
					text-align: center;
					width: 100px;
					background-color: #b2dfdb;
					border-radius: 3px;
					margin-bottom: 6px;
				}
			}
			.reply-input {
				width: 100%;
				height: 50px;
				background-color: #fff;
				margin-bottom: 10px;
				padding-left: 10px;
				padding-top: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 4px;
				input {
					width: 80%;
					height: 40px;
					font-size: 1rem;
					border-bottom: 1px solid rgba(0, 0, 0, 0.2);
					margin-right: 10px;
					padding: 0 5px;
				}
				input:focus {
					border-bottom: 1px solid #2196f3;
				}
				button {
					font-size: 1rem;
					padding: 3px 5px;
					background-color: #2196f3;
					color: white;
					border-radius: 4px;
				}
			}
			.reply-item {
				.reply-author {
					background-color: #fff;
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
					border-radius: 5px;
					padding-left: 10px;
					.reply-avatar {
						display: flex;
						width: 100%;
						height: 50px;
						align-items: center;
						img {
							width: 30px;
							height: 30px;
							border-radius: 3px;
						}
						.reply-desc {
							padding-left: 10px;
							position: relative;
							flex: 1;
							.reply-at {
								position: absolute;
								right: 30px;
							}
							.icon-reply-at {
								position: absolute;
								right: 8px;
								top: 1px;
								display: inline-block;
								width: 18px;
								height: 18px;
							}
							.ups-yes {
								background: url('../common/icons/icon-ups-yes.svg')
									no-repeat;
								background-size: contain;
							}
							.ups-no {
								background: url('../common/icons/icon-ups-no.svg')
									no-repeat;
								background-size: contain;
							}
							.ups-count {
								position: absolute;
								font-size: 0.8rem;
								right: 2px;
								top: -6px;
								padding: 2px 3px;
							}
						}
					}
				}
			}
			.reply-one {
				width: 100%;
				height: 30px;
				margin-bottom: 20px;
				padding-top: 2px;
				display: flex;
				align-items: center;
				justify-content: center;
				input {
					width: 65%;
					height: 100%;
					background: none;
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
					color: gray;
				}
				input:focus {
					border-bottom: 1px solid #00bcd4;
					color: black;
				}
				button {
					vertical-align: bottom;
					padding: 2px 5px;
					border-radius: 2px;
					margin: 0 5px;
				}
				button:nth-of-type(1) {
					background-color: #2196f3;
					color: white;
				}
				button:nth-of-type(2) {
					background-color: white;
					color: gray;
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
