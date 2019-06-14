import Vue from "vue";
import Router from "vue-router";
import ArticleList from "@/components/ArticleList";
import Article from "@/components/Article"
import User from "@/components/User"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "ArticleList",
      component: ArticleList
    },
    {
      path: "/article:id",
      name: "Article",
      component: Article
    },
    {
      path: "/user:id",
      name: "User",
      component: User
    }
  ]
});
