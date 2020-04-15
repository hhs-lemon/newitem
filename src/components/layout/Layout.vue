<template>
    <el-container class="app-wrapper">
      <el-aside width="200px">
        <Sidebar class="sidebar-container"/>
      </el-aside>
      <el-container>
        <el-header>
          <Navbar class="navbar" @handleLogout="logout"/>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <Dialog :content="content" :width="width" :dialogVisible="dialogVisible" @closeDialog="closeDialog" :handleSure="handleSure"/>
      </el-container>
    </el-container>
</template>

<script>
  import Navbar from './navbar/Navbar'
  import Sidebar from './sidebar/Sidebar'
  import Dialog from '@/components/dialog/Dialog'
  import {security} from '@/router/security'

  export default {
    name: 'Layout',
    data() {
      return {
        dialogVisible: false,
        content: '',
        width: '30%',
        visible: false,
      }
    },
    components: {
      Navbar,
      Sidebar,
      Dialog
    },
    methods:{
      logout() {
        this.content = '确定要退出吗？'
        this.dialogVisible = true
      },
      closeDialog() {
        this.dialogVisible = false
      },
      handleSure() {
        console.log('log')
        security.logout().then(() => {
          this.dialogVisible = false
          this.$router.push('/login')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-wrapper {
    height: 100%;
  }

  .el-header {
    height: 64px;
    /*background-image: linear-gradient(to right, #3f51b5, #b3d4fc);*/
    margin-top: 0px;
    padding-right: 0px;
    transform: translateY(0px);
    background: #3f51b5;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
    width: 100%;
    will-change: padding-left,padding-right;
  }

  .el-aside {
    height: 100%;
    background: rgb(66, 66, 66);
    overflow: hidden;
  }

  .el-main{
    background-color: #E9EEF3;
    color: #333;
  }
</style>
