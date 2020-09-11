<template>
  <div class="updateGenderContainer">
    <van-picker
      title="性别"
      show-toolbar
      :columns="gender"
      @confirm="updateUserGender"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index=value
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'updateGenderIndex',
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      gender: ['男', '女'],
      localGender:0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async updateUserGender() {
      try {
        await updateUserProfile({
          gender: this.localGender,
        })
        // 更行视图
        this.$emit('input', this.localGender)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast('更新数据成功!')
      } catch (err) {
        this.$toast('更新数据失败!')
      }
    },
    onChange(picker, value, index) {
      this.localGender = index
    },
  },
}
</script>

<style scoped lang="less"></style>
