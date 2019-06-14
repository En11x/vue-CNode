// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;
moment.locale("zh-cn");
Vue.prototype.$moment = moment;

Vue.use(Vuex);
Vue.use(VueAxios, axios);


// 创建一个store
const store = new Vuex.Store({
  state: {
    //tab数据,首页最开始默认为all
    tab: "all",
    // 文章列表数据
    articleList: [],
    // 收藏的话题
    collectTopics: [],
    //是否显示加载动画
    isLoading: false,
    //是否显示侧边栏
    isShowAsideMenu: false,
    //是否显示加载更多
    isShowMore: false,
    //是否显示消息组件
    isShowMsg: false,
    //是否显示个人中心组建
    isShowInfo: false,
    //是否显示用户登录组件
    isShowLogin: false,
    //是否显示about组件
    isShowAbout: false,
    //是否显示发布话题组件
    isShowNewArticle: false,
    //用户登录的accesstoken,存储在locaStorage中，以免每次都要重新登录
    ak: localStorage.ak || "",
    //登录用户信息数据
    userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {},
    //用户收藏的话题
    collectTopics: []
  },

  //改变状态
  mutations: {
    //显示侧边栏
    showAsideMenu(state, flag) {
      state.isShowAsideMenu = flag;
    },
    // 显示加载更多
    showMore(state, flag) {
      state.isShowMore = flag;
    },
    //显示用户登录组件
    showLogin(state, flag) {
      state.isShowLogin = flag;
    },
    //显示about组件
    showAbout(state, flag) {
      state.isShowAbout = flag;
    },
    //显示个人中心组建
    showInfo(state, flag) {
      state.isShowInfo = flag;
    },
    //显示发布话题组件
    showNewArticle(state, flag) {
      state.isShowNewArticle = flag;
    },
    //显示消息组件
    showMsg(state, flag) {
      state.isShowMsg = flag;
    },
    //更新用户登录信息
    updateUserInfo(state, userinfo) {
      state.userInfo = userinfo;
    },
    //更新用户收藏的话题
    updateCollectTopics(state, collectTopics) {
      state.collectTopics = collectTopics;
    },
    //更新ak
    updateAk(state, ak) {
      state.ak = ak;
    },
    //切换tab导航栏,切换loading动画，根据tab的改变，更改articleList文章数据
    changeTab(state, payload) {
      state.isLoading = payload.hasOwnProperty("isLoading")
        ? payload.isLoading
        : state.isLoading;
      state.tab = payload.tab || state.tab;
      state.articleList = payload.articleList || state.articleList;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
