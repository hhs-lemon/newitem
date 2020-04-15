<template>
  <div class="page-login">
    <div class="page-login--layer">
      <div class="page-login--content" flex="dir:top main:justify cross:stretch box:justify">
        <!-- form -->
        <div class="page-login--form" @keydown.enter="submit">
          <p>用户登录</p>
          <el-card shadow="never">
            <el-form
              :model="formLogin"
              :rules="rules"
              label-position="top"
              ref="loginForm"
              size="default"
            >
              <el-form-item prop="username">
                <el-input placeholder="帐号" type="text" ref="accountInput" v-model="formLogin.username" clearable/>
                <span class="el-input__prefix">
                  <i class="el-icon-user-solid"/>
                </span>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="密码" type="password" v-model="formLogin.password" show-password/>
                <span class="el-input__prefix">
                  <i class="el-icon-key"/>
                </span>
              </el-form-item>
              <el-form-item prop="idcode" v-if="isGoogle">
                <el-input placeholder="身份验证码" type="text" v-model="formLogin.idcode" clearable>
                  <i class="el-icon-mobile-phone el-input__icon" slot="prefix"/>
                </el-input>
              </el-form-item>
              <el-form-item prop="code" v-if="isCode">
                <el-input placeholder="验证码" type="text" v-model="formLogin.code" clearable>
                  <template slot="append">
                    <img :src="`api/v/vCode?_t=${timestamp}`" @click="changCode" class="login-code"/>
                  </template>
                  <i class="el-icon-picture-outline el-input__icon" slot="prefix"/>
                </el-input>
              </el-form-item>
              <el-button @click="submit" class="button-login" size="default" type="primary">
                <i class="el-icon-s-unfold "/>&nbsp;&nbsp;登&nbsp;录
              </el-button>
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {security} from '../../router/security'
  // import md5 from 'js-md5'
  export default {
    data () {
      return {
        // 快速选择用户
        isGoogle: false,
        isCode: false,
        timestamp: new Date().getTime(),
        next: null,
        // 表单
        formLogin:
          {
            username: 'jay2',
            password: '123456',
            code: ''
            // idcode: ''
          }
        ,
        // 表单校验
        rules: {
          username: [
            {
              required: true,
              message: '账号不能为空',
              trigger: 'blur'
            }
          ],
          password:
            [
              {
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
              }
            ],
          idcode:
            [
              {
                required: true,
                message: '身份验证码不能为空',
                trigger: 'blur'
              }
            ],
          code:
            [
              {
                required: true,
                message: '验证码不能为空',
                trigger: 'blur'
              }
            ]
        }
      }
    },
    created () {},
    mounted () {
      this.next = this.$route.query.next || '/'
      this.$http.get('api/v/user/getLoginLimit').then(res => {
        this.isCode = res.data && res.data.vCode === 1
      })
        .catch(() => ({}))
      this.$refs.accountInput.focus()
    },
    beforeDestroy () {
    },
    methods: {

      /**
       * @description 提交表单
       */
      // 提交登录信息
      submit () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // 登录
            // 注意 这里的演示没有传验证码
            // 具体需要传递的数据请自行修改代码
            let that = this
            const loading = this.$loading({
              lock: true,
              text: '拼命加载中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            security.login(this.formLogin.username, this.formLogin.password,
            this.formLogin.code).then((res) => {
              this.$store.commit('user/SET_LoginInfo', res.data)
              this.$message.success('登录成功！')
              this.$router.push(this.next)
            })
            loading.close()
          } else {
            // 登录表单校验失败
            this.$message.error("表单校验失败，请检查")
            this.changCode()
          }
        })
      },
      // 验证码刷新
      changCode () {
        this.timestamp = new Date().getTime()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-login {
    //@extend %unable-select;
    // $backgroundColor: #f0f2f5;
    background: url(./image/bg_login.svg) 50%/100% no-repeat;
    cursor: auto;
    // ---
    // background-color: $backgroundColor;
    height: 100%;
    position: relative;
    // 层
    .page-login--layer {
      //@extend %full;
      overflow: auto;
    }
    .page-login--layer-area {
      overflow: hidden;
    }
    // 时间
    .page-login--layer-time {
      font-size: 24em;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.03);
      overflow: hidden;
    }
    // 登陆页面控件的容器
    .page-login--content {
      height: 100%;
      min-height: 500px;
    }
    // header
    .page-login--content-header {
      padding: 1em 0;
      .page-login--content-header-motto {
        margin: 0px;
        padding: 0px;
        color: #fff;
        text-align: center;
        font-size: 12px;
      }
    }
    // main
    .page-login--logo {
      width: 240px;
      margin-bottom: 2em;
      margin-top: -2em;
    }
    // 登录表单
    .page-login--form {
      width: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 20px 50px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      border: 1px solid #ebeef5;
      background: #fff;
      transform: translate(-50%, -50%);
      p {
        font-size: 30px;
        text-align: center;
        color: #909399;
      }
      // 卡片
      .el-card {
        border: 0;
        // .fa-fw {
        //   color: #c0c4cc;
        //   font-size: 14px;
        // }
      }
      // 登录按钮
      .button-login {
        width: 100%;
      }
      // 输入框左边的图表区域缩窄
      .el-input-group__prepend {
        padding: 0px 14px;
        border-right-width: 0px;
      }
      .el-card__body {
        padding: 0;
      }
      .el-input__inner {
        padding-left: 30px;
      }
      .el-input__prefix {
        height: 100%;
        position: absolute;
        width: 20px;
        text-align: center;
        left: 0px;
        top: 0;
        line-height: 40px;
        display: inline-block;
        transition: all 0.3s;
      }
      .login-code {
        height: 40px - 2px;
        display: block;
        margin: 0px -20px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
      // 登陆选项
      .page-login--options {
        margin: 0px;
        padding: 0px;
        font-size: 14px;
        color: #409eff;
        margin-bottom: 15px;
        font-weight: bold;
      }
      .page-login--quick {
        width: 100%;
      }
    }

    // 快速选择用户面板
    .page-login--quick-user {
      //@extend %flex-center-col;
      padding: 10px 0px;
      border-radius: 4px;
      &:hover {
        background-color: #f8f8f9;
        i {
          color: #fff;
        }
        span {
          color: #fff;
        }
      }
      i {
        font-size: 36px;
        color: #909399;
      }
      span {
        font-size: 12px;
        margin-top: 10px;
        color: #909399;
      }
    }
    // footer
    .page-login--content-footer {
      padding: 1em 0;
      .page-login--content-footer-locales {
        padding: 0px;
        margin: 0px;
        margin-bottom: 15px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: #fff;
        a {
          color: #fff;
          margin: 0 0.5em;
          &:hover {
            color: #303133;
          }
        }
      }
      .page-login--content-footer-copyright {
        padding: 0px;
        margin: 0px;
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: #fff;
        a {
          color: #fff;
        }
      }
      .page-login--content-footer-options {
        padding: 0px;
        margin: 0px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        a {
          color: #fff;
          margin: 0 1em;
        }
      }
    }
    // 背景
    .circles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 0px;
      padding: 0px;
      li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: #fff;
        animation: animate 25s linear infinite;
        bottom: -200px;
        @keyframes animate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
        &:nth-child(1) {
          left: 15%;
          width: 80px;
          height: 80px;
          animation-delay: 0s;
        }
        &:nth-child(2) {
          left: 5%;
          width: 20px;
          height: 20px;
          animation-delay: 2s;
          animation-duration: 12s;
        }
        &:nth-child(3) {
          left: 70%;
          width: 20px;
          height: 20px;
          animation-delay: 4s;
        }
        &:nth-child(4) {
          left: 40%;
          width: 60px;
          height: 60px;
          animation-delay: 0s;
          animation-duration: 18s;
        }
        &:nth-child(5) {
          left: 65%;
          width: 20px;
          height: 20px;
          animation-delay: 0s;
        }
        &:nth-child(6) {
          left: 75%;
          width: 150px;
          height: 150px;
          animation-delay: 3s;
        }
        &:nth-child(7) {
          left: 35%;
          width: 200px;
          height: 200px;
          animation-delay: 7s;
        }
        &:nth-child(8) {
          left: 50%;
          width: 25px;
          height: 25px;
          animation-delay: 15s;
          animation-duration: 45s;
        }
        &:nth-child(9) {
          left: 20%;
          width: 15px;
          height: 15px;
          animation-delay: 2s;
          animation-duration: 35s;
        }
        &:nth-child(10) {
          left: 85%;
          width: 150px;
          height: 150px;
          animation-delay: 0s;
          animation-duration: 11s;
        }
      }
    }
  }
</style>
