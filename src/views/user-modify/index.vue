<template>
  <div class="user-modify-container">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 加ref操作dom元素 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- $refs.file拿到dom---.click()调用click方法 -->
    <van-cell title="头像" @click="$refs.file.click()" is-link>
      <van-image class="avatar-img" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" @click="showNamePopup" is-link />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      @click="showGenderPopup"
      is-link
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      @click="showBirthdayPopup"
      is-link
    />
    <van-popup
      v-model="isnameshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updateName
        v-if="isnameshow"
        v-model="user.name"
        @close="isnameshow = false"
      />
    </van-popup>
    <van-popup
      v-model="isgendershow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <updateGender
        v-if="isgendershow"
        v-model="user.gender"
        @close="isgendershow = false"
      />
    </van-popup>
    <van-popup
      v-model="isbirthdayshow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <updateBirthday
        v-if="isbirthdayshow"
        v-model="user.birthday"
        @close="isbirthdayshow = false"
      />
    </van-popup>
    <van-popup
      v-model="isPhotoshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updatePhoto @close="isPhotoshow = false" :img="fileUrl" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirthday from './components/update-birthday'
import updatePhoto from './components/update-photo'
export default {
  name: 'userModifyIndex',
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updatePhoto,
  },
  props: {},
  data() {
    return {
      user: {}, // 用户数据对象
      isnameshow: false,
      isgendershow: false,
      isbirthdayshow: false,
      isPhotoshow: false,
      fileUrl: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadingUserProfile()
  },
  mounted() {},
  methods: {
    async loadingUserProfile() {
      try {
        const { data: res } = await getUserProfile()
        this.user = res.data
        console.log(this.user)
      } catch (err) {
        this.$toast('请求失败!')
      }
    },
    async updateUserPro() {
      try {
        const { data } = await updateUserProfile(this.name)
        console.log(data)
      } catch (err) {
        this.$toast('获取数据失败!')
      }
    },
    showNamePopup() {
      this.isnameshow = true
    },
    showGenderPopup() {
      this.isgendershow = true
    },
    showBirthdayPopup() {
      this.isbirthdayshow = true
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      this.fileUrl = window.URL.createObjectURL(file)
      this.isPhotoshow = true
      // file-input 如果选了同一个文件不会触发 change事件
      // 解决办法每次使用完毕，清空value
      this.$refs.file.value = ''
    },
  },
}
</script>

<style scoped lang="less">
.user-modify-container {
  .van-cell {
    .van-cell__value {
      .avatar-img {
        width: 60px;
        height: 60px;
      }
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
