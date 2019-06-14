// 文章列表组件
<template>
	<div class="article-list">
		<!-- 列表过渡 -->
		<transition-group name="slide-top">
			<div v-for="(item,index) of articleList" :key="item.id" class="item">
				<!-- 头像 -->
				<router-link :to="{path:'/user',name:'User',params:{id:item.author.loginname}}" class="avatar">
					<img :src="item.author.avatar_url" alt="用户头像">
				</router-link>
				<!-- 文章标题 -->
				<div class="title">
					<p>
						<span class="flag" :class='{special:item.good||item.top}'>{{item.top?'置顶':''||item.good?'精华':''||type[item.tab]}}</span>
						<router-link :to="{path:'/article',name:'Article',params:{id:item.id}}">{{item.title}}</router-link>
					</p>
					<p class="view">
						<span class="viewed">{{item.reply_count}}</span>
						/{{item.visit_count}}
						<span
							class="date"
						>{{$moment(item.last_reply_at).startOf('minute').fromNow()}}</span>
					</p>
				</div>
			</div>
		</transition-group>

		<!-- 加载更多 -->
		<div v-show="isShowMore" class="more">
			<i class="icon-more"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ArticleList',
	data() {
		return {
			type:{
                share:'分享',
                job:'招聘',
                ask:'问答'
            }
		}
	},
	computed: {
		articleList() {
			return this.$store.state.articleList
		},
		isShowMore() {
			return this.$store.state.isShowMore
		}
	},

	created() {
		this.$store.commit('changeTab', { isLoading: true })
		this.axios
			.get('https://cnodejs.org/api/v1/topics')
			.then(res => res.data.data)
			.then(res =>
				this.$store.commit('changeTab', {
					isLoading: false,
					articleList: res
				})
			)
	},
	components: {}
}
</script>

<style lang='scss' scoped>
.article-list {
    position: relative;
    z-index: 1;
	.item {
		width: 100%;
		height: 70px;
		display: flex;
		align-items: center;
		padding: 0 5px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		.avatar {
			img {
				width: 45px;
				height: 45px;
				border-radius: 5px;
			}
		}
		.title {
			width: 100%;
			background-color: #fff;
			padding:12px 5px;
			font-size: 13px;
			overflow: hidden;
			p {
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 100%;
			}
			.flag {
				background-color: #e5e5e5;
				padding: 2px 5px;
				font-size: 100%;
				color: #9c9c9c;
				border-radius: 4px;
				margin-right: 4px;
			}
			.special {
				background-color: #80bd01;
				color: white;
			}
			.view {
				position: relative;
				font-size: 80%;
				color: gray;
				padding-top: 10px;
				padding-left: 45px;
				span.viewed {
					color: #9e83cc;
				}
				span.date {
					position: absolute;
					right: 10px;
				}
			}
		}
		.title:hover {
			background-color: #f5f5f5;
		}
	}
	.more {
		text-align: center;
		.icon-more {
			display: inline-block;
			width: 40px;
			height: 40px;
			background: url('../common/icons/icon-loading.svg') no-repeat;
			background-size: contain;
			animation: loading 0.4s linear infinite;
		}
	}
}
</style>
