// 我的消息组件
<template>
	<div class="msg">
		<div class="msg-header">
			<i @click="showMsg" class="icon-back"></i>消息中心
		</div>
		<div class="msg-content">
			<div class="msg-read">
				<div @click="changeTab" class="has-no" :class="{selected:isReading}">未读消息：0</div>
				<div @click="changeTab" class="has" :class="{selected:!isReading}">已读消息:0</div>
			</div>
		</div>
		<div class="msg-list">消息列表</div>
	</div>
</template>

<script>
export default {
	name: 'Msg',
	data() {
		return {
			has_read_messages: [],
			hasnot_read_messages: [],
			isReading: true
		}
	},
	computed: {
		ak() {
			return this.$store.state.ak
		}
	},
	methods: {
		//点击切换tab 导航
		changeTab() {
			this.isReading = !this.isReading
		},
		showMsg() {
			this.$store.commit('showMsg', false)
		}
	},
	created() {
		//有用户登录,发送请求拿到消息数据
		this.axios
			.get(`https://cnodejs.org/api/v1/messages?accesstoken=${this.ak}`)
			.then(res => {
				;(this.has_read_messages = res.data.data.has_read_messages),
					(this.hasnot_read_messages =
						res.data.data.hasnot_read_messages)
			})
	},
	components: {}
}
</script>

<style lang='scss' scoped>
.msg {
	position: absolute;
	z-index: 1;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	.msg-header {
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
	.msg-content {
		width: 100%;
		height: 40px;
		.msg-read {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			height: 40px;
			background-color: #2196f3;
			color: rgba(255, 255, 255, 0.5);
			font-size: 1rem;
			div {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				height: 100%;
			}
			.has-no {
				border-right: 1px solid rgba(255, 255, 255, 0.2);
			}
			.selected {
				border-bottom: 2px solid white;
				color: white;
			}
		}
	}
}
</style>
