//发布话题组件
<template>
	<div class="new-article">
		<div class="new-header">
			<i @click='showNewArticle' class="icon-back"></i>发布话题
		</div>
		<div class='new-content'>
			<div class='new-type'>
				<span>选择板块:</span>
				<select name="tab" id="">
					<option value="">请选择</option>
					<option value="share">分享</option>
					<option value="ask">问答</option>
					<option value="job">招聘</option>
				</select>
			</div>
			<div class='new-title'>
				<textarea autofocus="" id="title" name="title" rows="1" placeholder="标题字数 10 字以上"></textarea>
			</div>
			<div class='new-body'>
				<textarea type='text' placeholder="请输入内容"></textarea>
			</div>
			<div class='send'>
				<button>发布</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NewArticle',
	data() {
		return {}
	},
	methods:{
		showNewArticle(){
			this.$store.commit('showNewArticle',false)
		}
	},
	components: {}
}
</script>

<style lang='scss' scoped>
	.new-article{
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		background-color: #fff;
		.new-header{
			width: 100%;
			height: 50px;
			background-color: #2196f3;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			.icon-back{
				position: absolute;
				left: 10px;
				display: inline-block;
				width: 30px;
				height: 30px;
				background: url('../common/icons/icon-back.svg') no-repeat;
				background-size: contain;
			}
		}
		.new-content{
			width: 100%;
			height: 100%;
			padding: 20px 5px 0;
			.new-type{
				padding-left: 5%;
				select{
					width: 220px;
					height: 30px;
					line-height: 30px;
					margin-left: 10px;
    				border: 1px solid #ccc;
					background-color: #fff;
					padding: 4px 6px;
					color: #555;
					border-radius: 4px;
				}
				select:focus{
					border-color: #2196f3;
				}
			}
			.new-title{
				width:100%;
				height: 50px;
				margin: 20px 0;
				text-align: center;
				textarea{
					display: inline-block;
					padding: 4px 6px;
					line-height: 20px;
					color: #555;
					vertical-align: middle;
					width: 90%;
					font-size: 1.2rem;
					border: none;
					border-radius: 4px;
					resize: none;
					box-shadow: 0 0 2px rgba(60,60,60,.5)
				}
			}
			.new-body{
				width: 100%;
				text-align: center;
				textarea{
					width: 95%;
					height: 300px;
					padding: 7px 12px;
					font-size: 1.3rem;
					resize: none;
					border: 1px solid rgba(0, 0, 0, .2);
					border-radius: 5px;
				}
			}
			.send{
				margin-top: 20px;
				margin-left: 3%;
				button{
					width: 53px;
					height: 32px;
					font-size: 1rem;
					background-color: #2196f3;
					color: white;
					border-radius: 4px;
				}
			}
		}
	}
</style>
