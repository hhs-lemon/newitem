<template>
  <div>
    <!--<div class="sidebar">-->
      <!--<div class="sidebar-title">-->
        <!--团队管理-->
      <!--</div>-->
      <!--<div class="sidebar-subtitle">-->
        <!--<i class="iconfont iconcc-users"></i>-->
        <!--<span>团队成员</span>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="sidebar">-->
      <!--<div class="sidebar-title">-->
        <!--统计报表-->
      <!--</div>-->
      <!--<div class="sidebar-subtitle">-->
        <!--<i class="iconfont iconcc-users"></i>-->
        <!--<span>数据总览</span>-->
      <!--</div>-->
      <!--<div class="sidebar-subtitle">-->
        <!--<i class="iconfont iconcc-users"></i>-->
        <!--<span>代理报表</span>-->
      <!--</div>-->
      <!--<div class="sidebar-subtitle">-->
        <!--<i class="iconfont iconcc-users"></i>-->
        <!--<span>日报表{{menusList}}</span>-->
      <!--</div>-->
    <!--</div>-->
    <el-menu background-color="#424242" text-color="#fff" router>
      <el-submenu :index="item.text" v-for="(item,index) in menus" :key="index">
        <template slot="title">
          <span>{{item.text}}</span>
        </template>
          <el-menu-item :index="it.path" v-for="it in item.children" :key="it.path">
            <template slot="title">
              <!--<i :class="it.icon"></i>-->
              <i class="el-icon-menu"></i>
              <span>{{it.text}}</span>
            </template>
          </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Sidebar',
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'menusList'
      ]),
      menus() {
        return this.menusList
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu{
    border-right: none;
  }
.sidebar{
  height: 104px;
  .sidebar-title{
    color: #c7c7c7;
    align-items: center;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    height: 48px;
    padding: 0 16px;

  }
  .sidebar-subtitle{
    color: #fff;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    height: 48px;
    margin: 0;
    padding: 0 16px;
    align-items: center;
    & i{
      font-size: 24px;
    }
    & span{
      margin-left: 10px;
    }
  }
}
  .sidebar::after{
    content: '';
    display: block;
    width: 100%;
    border: 1px solid #595959;
  }
</style>
