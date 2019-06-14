// 登录组件
<template>
	<div class="login">
		<div class="login-header">
			<i @click="showLogin" class="icon-back"></i>登录
		</div>
		<div class="input">
			<input v-model='inputVal' type="text" placeholder="请输入Access Token">
            <div class='error'>
                <transition name='slide-top'>
                    <p v-if='isError'>验证失败！请重新验证</p>
                </transition>
            </div>
			<button @click='check(inputVal)'>验证</button>
		</div>
		<div class="tips">
			<ul>
				<li>为了更好的体验请登录😊</li>
				<li>输入CNode账号的Access Token😄</li>
				<li>在个人中心可以获取Access Token😉</li>
				<li>调用的是官方API,请放心使用🤗</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
            inputVal:'',
            isError:false
        }
    },
    methods:{
        showLogin(){
            this.$store.commit('showLogin',false)
        },
        //验证登录信息
        check(ak){
            //ak不能为空
            if(!ak.trim()){
                return
            }
            this.axios.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:ak})
            .then((res)=>{
                //验证成功
                if(res.status ==200){	
				//拿到登录用户的信息
                //更新用户信息
                this.$store.commit('updateUserInfo',res.data)
                //更新ak
                this.$store.commit('updateAk',ak)
                //将数据存储到locastorage中
                localStorage.userInfo = JSON.stringify(res.data)
                localStorage.ak = ak
                //关闭login组件
				this.showLogin()
                }
            })
            .catch((err)=>{
                this.isError = true;
            })
        }
    },
	components: {}
}
</script>

<style lang='scss' scoped>
.login {
	position: absolute;
	background-color: #fff;
	z-index: 2;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.login-header {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #2196f3;
		color: white;
		font-size: 1.3rem;
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
	.input {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding-top: 50px;
		input {
			outline: none;
			border: none;
			height: 40px;
			width: 320px;
			border-bottom: 1px solid gray;
			font-size: 1rem;
		}
		input:focus {
			border-bottom: 1px solid #2196f3;
        }
        .error{
            height: 30px;
            width: 100%;
            text-align: center;
            margin-top:20px;
            color: red;
        }
		button {
			margin-top: 8px;
			font-size: 1rem;
			background-color: #2196f3;
			color: white;
			border: none;
			padding: 5px 10px;
			border-radius: 3px;
			letter-spacing: 3px;
		}
	}
	.tips {
		flex: 2;
		color: gray;
	}
}
</style>
