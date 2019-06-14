// 内容组件
<template>
	<div class="content">
		<!-- 导航栏 -->
		<div class="tab">
			<div @click='changeTab("all")' class="all type" :class='{isBorder:tab === "all"}'>
				<router-link to="/">首页</router-link>
			</div>
			<div @click='changeTab("good")' class="good type" :class='{isBorder:tab === "good"}'>
				<router-link to="/">精华</router-link>
			</div>
			<div @click='changeTab("share")' class="share type" :class='{isBorder:tab === "share"}'>
				<router-link to="/">分享</router-link>
			</div>
			<div @click='changeTab("ask")' class="ask type" :class='{isBorder:tab === "ask"}'>
				<router-link to="/">问答</router-link>
			</div>
			<div @click='changeTab("job")' class="job type" :class='{isBorder:tab === "job"}'>
				<router-link to="/">招聘</router-link>
			</div>
		</div>

        <!-- 文章列表部分 -->
        <div ref='article' @scroll="scroll($event)" class='article'>
            <!-- 加载图标 -->
            <div v-show='isLoading' class='loading'>
                <i class='icon-loading'></i>
            </div>
            <!-- 路由出口 -->
            <router-view></router-view>
        </div>

        <!-- top图标 -->
        <transition name='slide-fade'>
            <div v-show='isShowTop' class='top'>
                <i @click='toTop' class='icon-top'></i>
            </div>
        </transition>
	</div>
</template>

<script>
export default {
    name:'Content',
	data() {
		return {
            page:1,
            over:false,   //是否已经没有内容加载
            isShowTop:false
        }
    },
    computed:{
        //获取tab分类
        tab(){
            return this.$store.state.tab
        },
        isLoading(){
            return this.$store.state.isLoading
        },
        articleList(){
            return this.$store.state.articleList
        }
    },
    methods:{
        //点击切换tab导航
        changeTab(tab,page=1){
            //切换tab导航后，article从最上面开始
            this.$refs.article.scrollTop = 0
            //tab改变，更新store里的数据
            this.$store.commit('changeTab',{
                isLoading:true,
                tab,
                articleList:[]
            })
            //状态更新之后，重新获取改变tab值之后的数据
            this.axios.get(`https://cnodejs.org/api/v1/topics?page=${page}&tab=${tab}`)
            .then(res=>res.data.data)
            .then(res=>{
                this.$store.commit('changeTab',{
                    tab,
                    isLoading:false,
                    articleList:res
                })
            })
        },
        //滚动事件
        scroll(event){
            //event接受原生事件对象
            //如果滚动的距离大于article的高度，就显示top图标
            if( event.target.clientHeight < event.target.scrollTop ){
                this.isShowTop = true
            }else{
                this.isShowTop = false
            }
            if(this.$route.path != '/'){
                //只有在/路径下，也就是首页显示文章列表时，滚动加载数据
                return
            }else if(!this.over){
                // 表示还有数据
                // 判断有没有滑到底部
                if( event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight ){
                    //滑到底了，说明当前页的数据已经加载完了
                    this.page ++
                    this.$store.commit('showMore',true)
                    this.axios.get(`https://cnodejs.org/api/v1/topics?page=${this.page}&tab=${this.tab}`)
                        .then(res=>res.data.data)
                        .then(res=>{
                            if(!res.length){
                                // 没有获取到数据
                                this.over = true
                                this.$store.commit('showMore',false)
                                return
                            }
                            this.$store.commit('changeTab',{
                                articleList:this.articleList.concat(res)
                            })
                        })
                        .then(()=>{
                            this.$store.commit('showMore',false)
                        })
                }      
            }
        },
        // 回到顶部
       toTop(){
        //    this.$refs.article.scrollTop = 0  瞬间回到顶部
        if(this.$refs.article.scrollTop<0){
            return
        }
        let timer = setInterval(()=>{
            if(this.$refs.article.scrollTop<=0){
                clearInterval(timer)
            }
            //没 1ms 向上200 有个过渡效果
            this.$refs.article.scrollTop -=200 
        },1)
       }
    },
	components: {}
}
</script>

<style lang='scss' scoped>
.content{
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    .tab{
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
        background-color: #2196F3;
        font-size: 110%;
        letter-spacing: 2px;
        a{
            color: white;
        }
        .type{
            flex:1;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            position: relative;
            z-index:1;
        }
        .isBorder{
            border-bottom: 2px solid white;
            font-size: 120%;
        }
    }
    .article{
        flex: 1;
        position: relative;
        width: 100%;
        overflow: auto;
        transition: 1s linear;
        .loading{
            display: flex;
            justify-content: center;
            .icon-loading{
                display: inline-block;
                position: absolute;
                text-align: center;
                width: 40px;
                height: 40px;
                background: url('../common/icons/icon-loading.svg') no-repeat;
                background-size: contain;
                animation: loading 0.4s linear infinite;
            }
        }
    }
    .top{
        position: fixed;
        bottom: 10px;
        right: 15px;
        width: 45px;
        height: 45px;
        .icon-top{
            display: inline-block;
            width: 100%;
            height: 100%;
            background: url('../common/icons/icon-top.svg') no-repeat;
            background-size: contain;
        }
    }
}
</style>
