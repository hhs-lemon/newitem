<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :show-close="false"
    >
    <span>{{content}}</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('closeDialog')">取 消</el-button>
    <el-button type="primary" @click="handleSure">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
  export default {
    name: 'Dialog',
    data() {
      return{
      }
    },
    props: {
      title: String,
      width: String,
      dialogVisible: Boolean,
      visible: Boolean,
      content: String,
      handleSure: Function
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
