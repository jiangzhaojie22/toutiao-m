<template>
<!-- es6可以这样写:"`/article/${article.art_id}`" -->
<!-- 完整写法这样写"'/article/'+article.art_id" -->
<!-- 路由传参这样写 -->
  <!--
    Cell 单元格的 to 属性和 VueRouter 中的 RouterLink 导航组件的 to 属性用法是一样的
    用法参考链接：https://router.vuejs.org/zh/api/#to
    es6可以这样写:"`/article/${article.art_id}`"
    完整写法这样写"'/article/'+article.art_id"
    路由传参这样写
   -->
  <van-cell
    class="article-item"
    :to="{
      // 根据路由名称进行跳转
      name: 'article',

      // 传递路由动态参数
      params: {
        // 属性名：路由路径中设计的动态参数名称
        articleId: article.art_id
      }
    }"
  >
    <div class="title van-multi-ellipsis--l2" slot="title">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'articleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      msg: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    // 上下30左右0
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
