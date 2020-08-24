<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="navbar" fixed>
      <template #title>
        <van-button
          class="search-btn"
          round
          slot="title"
          type="info"
          size="small"
          icon="search"
          to="/search"
        >搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs
      swipeable
      animated
      class="channel-tabs"
      v-model="active"
    >
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表 -->
        <!-- 把对应的频道传给频道列表 -->
        <articlelist :channel="channel" />
      </van-tab>
      <div
        slot="nav-right"
        class="placeHolder"
      ></div>
      <div slot="nav-right" class="hamburger-btn">
        <i
          class="toutiao toutiao-gengduo"
          @click="showPopup"
        ></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 将data里的channels传给myChannels在频道编辑页面接收 -->
      <channelEdit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import articlelist from './components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
  name: 'homeIndex',
  components: {
    articlelist,
    ChannelEdit
  },
  props: {},
  data() {
    return {
      active: '',
      channels: [],
      show: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        const {
          data: res
        } = await getUserChannels()
        console.log(res)
        this.channels = res.data.channels
        console.log(this.channels)
      } catch (err) {
        this.$toast('获取频道列表错误!')
      }
    },
    showPopup() {
      this.show = true
    },
    onUpdateActive(index) {
      this.active = index
      this.show = false
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  margin-bottom: 100px;
  .navbar {
    background-color: #2992ff;
    .search-btn {
      width: 400px;
      height: 70px;
      background-color: #53a7ff;
      border: none;
      font-size: 28px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      // 堆叠属性,越高的显示在越前,把后面的覆盖
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
      .van-tab {
        width: 200px;
        border-right: 1px solid #edeff3;
        font-size: 30px;
        color: #777777;
      }
      .van-tab--active {
        color: #333333 !important;
      }
      .van-tabs__nav {
        padding-bottom: 0;
        .van-tabs__line {
          width: 31px !important;
          height: 6px;
          background-color: #2b90fa;
          border-radius: 20px;
          bottom: 8px;
        }
      }
    }
    .placeHolder {
      width: 66px;
      height: 82px;
      // 设置
      flex-shrink: 0;
    }
    .hamburger-btn {
      // 固定住
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      // &代表当前元素,&:before代表在当前元素前面添加一个子元素样式
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>
