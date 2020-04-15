<template>
  <div class="navbar-warp">
    <div class="nav_left">
      <i class="el-icon-s-unfold"></i>
      <div class="bar_title">数据总览</div>
    </div>
    <div class="nav_right">
      <div class="nav_user">
        <i class="el-icon-user-solid"></i>
        <span class="nav_username">{{loginInfo.account}}</span>
      </div>
      <el-button type="primary" class="el_btn" @click="handleClick">
        <i class="iconfont iconzhuxiao "></i>
        注销</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Dialog from '@/components/dialog/Dialog'
  export default {
    name: 'Navbar',
    data() {
      return{

      }
    },
    components: {
      Dialog
    },
    computed: {
      ...mapGetters([
        'loginInfo'
      ])
    },
    mounted(){

    },
    methods: {
      handleClick() {
        this.$emit('handleLogout')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar-warp{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    color: #fff;
    .nav_left{
      display: flex;
      .el-icon-s-unfold{
        font-size: 25px;
      }
      .bar_title{
        margin-left: 20px;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: .02em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .nav_right{
      margin-right: 50px;
      display: flex;
      align-items: center;
      .nav_user{
        margin-right: 15px;
        .nav_username{
          margin-left: 10px;
        }
      }
      .el-btn{
        color: #fff;
        background: #3f51b5;
        border: none;
        font-size: 15px;
        cursor: pointer;
      }
    }
  }

</style>
