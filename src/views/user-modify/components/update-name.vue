<template>
  <div class="updateNameContainer">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="updateUserPro"
    />
    <div class="field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'updateNameIndex',
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async updateUserPro() {
      this.$toast.loading({
        message:'保存中...',
        forbidClick:true, // 禁止背景点击
        duration: 0 // 持续展示直至其他弹窗替换他
      })
      try {
        if (!this.localName.length) {
          this.$toast('昵称不能为空!')
        }
        await updateUserProfile({
          name: this.localName,
        })
        // 更行视图
        this.$emit('input', this.localName)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast('更新数据成功!')
      } catch (err) {
        this.$toast('更新数据失败!')
      }
    },
  },
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
