<template>
  <div class="my-container">
    <!-- 头部用户信息 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image :src="userInfo.photo" class="avatar" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <div class="count">{{ userInfo.art_count }}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.follow_count }}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.fans_count }}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.like_count }}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <!-- 头部未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid class="grid-nav" clickable :column-num="2">
      <van-grid-item class="grid-item" text="路由跳转" to="/">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item" text="路由跳转" to="/">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell class="info-cell" title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      center
      clickable
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
// 引入vuex容器的state数据,72行
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'myIndex',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    // 需要用到的数据,user,这样就可以直接用这个数据了
    ...mapState(['user'])
  },
  watch: {},
  created() {
    // 如果用户已登录,请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted() {},
  methods: {
    onLogout() {
      // 退出确认框
      // 在组件中需要使用this.$dialog调用组件
      this.$dialog
        .confirm({
          title: '标题'
        })
        .then(() => {
          // 确认退出:清除登录状态(容器和本地user清除),重新刷新页面显示未登录界面
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消')
        })
      // 未确认关闭对话框
    },
    async loadUserInfo() {
      try {
        const { data: res } = await getUserInfo()
        console.log(res)
        this.userInfo = res.data
        console.log(this.userInfo)
      } catch (err) {
        this.$toast('获取数据失败!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    /* 缩放填充到整个背景当中 */
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      // padding会撑大盒子,盒子大小会计算宽高+padding边框
      padding: 76px 32px 23px;
      // border-box让padding计算在height之中
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
}
.info-cell {
  margin-top: 10px;
}
.logout-cell {
  margin-top: 10px;
  color: #eb5253;
  text-align: center;
}
</style>
