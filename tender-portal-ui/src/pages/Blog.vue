<template>
  <div>
    <!--<Carousel v-model="value2"  height="auto">-->
    <!--<CarouselItem>-->
    <!--<div class="demo-carousel">-->
    <!--<img src="../assets/shanshui.png" alt="山">-->
    <!--</div>-->
    <!--</CarouselItem>-->
    <!--</Carousel>-->
    <i-row class="content">
      <i-col span="24" offset="0">
        <div v-for="(article , index) in articles" :key="article.id" class="content-left">
          <i-row>
            <i-col span="18">
              <div class="content-author">
                <Avatar style="color:#f56a00;background-color: #fde3cf;">W</Avatar>
                <span class="content-time"> 发布于:{{article.time}}</span></div>
            </i-col>
            <i-col span="1" offset="5" class="content-laud">
              <div @click="toLike(index)">
                <Icon type="ios-thumbs-up-outline" size="20" v-if="!article.isLike"/>
                <Icon type="ios-thumbs-up" size="20" style="color: #25ff58" v-else/>
              </div>
              <!--ios-thumbs-up-outline-->
            </i-col>
          </i-row>
          <h3>{{article.title}}</h3>
          <p class="content-summary">{{article.content}}
          </p>
          <p class="content-foot"><span class="foot-num">{{article.readNum}}</span><span>阅读</span><span
            class="foot-num">{{article.commentNum}}</span><span>评论</span></p>
        </div>
      </i-col>
      <i-col span="0" offset="0"></i-col>
    </i-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value2: 0,
        articles: [
          {
            id: 1,
            title: '深入了解Kafka基本原理',
            content: '前面一篇博文我们讲了Spring Cloud的一个组件，实际上通过一些组件的结合我们已经可以搭建一个基础的微服务架构，后续还有一些组件会陆续更新的',
            time: '一天前',
            avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
            readNum: 11000,
            commentNum: 330,
            isLike: false
          },
          {
            id: 2,
            title: '深入了解Kafka基本原理',
            content: '前面一篇博文我们讲了Spring Cloud的一个组件，实际上通过一些组件的结合我们已经可以搭建一个基础的微服务架构，后续还有一些组件会陆续更新的',
            time: '一天前',
            avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
            readNum: 11000,
            commentNum: 330,
            isLike: false
          },
          {
            id: 3,
            title: '深入了解Kafka基本原理',
            content: '前面一篇博文我们讲了Spring Cloud的一个组件，实际上通过一些组件的结合我们已经可以搭建一个基础的微服务架构，后续还有一些组件会陆续更新的',
            time: '一天前',
            avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
            readNum: 11000,
            commentNum: 330,
            isLike: false
          },
          {
            id: 4,
            title: '深入了解Kafka基本原理',
            content: '前面一篇博文我们讲了Spring Cloud的一个组件，实际上通过一些组件的结合我们已经可以搭建一个基础的微服务架构，后续还有一些组件会陆续更新的',
            time: '一天前',
            avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
            readNum: 11000,
            commentNum: 330,
            isLike: false
          },
          {
            id: 5,
            title: '深入了解Kafka基本原理',
            content: '前面一篇博文我们讲了Spring Cloud的一个组件，实际上通过一些组件的结合我们已经可以搭建一个基础的微服务架构，后续还有一些组件会陆续更新的',
            time: '一天前',
            avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
            readNum: 11000,
            commentNum: 330,
            isLike: false
          }
        ]
      }
    },
    // ,
    // mounted () {
    // },
    // beforeDestroy () {
    // },
    methods: {
      toLike: function (index) {
        this.articles[index].isLike = !this.articles[index].isLike
      }
    }
    // created: {
    // }

  }
</script>
<style>
  .demo-carousel {
    min-height: 300px;
    background-color: #f5f7f9;
    /*line-height: 300px;*/
    text-align: center;
  }

  .content-left {
    padding: 20px;
    margin-bottom: 20px;
    background-color: #FFFFFF;
  }

  .content-author {
  }

  .content h3 {
    margin: 10px 0 5px 0;
    font-size: 16px;
  }

  .content-time {
    color: #9ea7b4;
    font-size: 12px;
  }

  .content-laud {
    text-align: right;
    line-height: 40px;
  }

  img {
    width: 100%;
    height: 600px;
  }

  .content-foot {
    text-align: right;
    margin-top: 20px;
  }

  .content-foot span {
    padding: 0 0 0 8px;
  }

  .foot-num {
    padding-left: 20px;
    color: #7c95ff;
  }

</style>
