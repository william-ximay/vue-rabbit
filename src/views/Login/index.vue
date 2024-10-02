<script setup>
import { ref } from 'vue'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { mobileAPI } from '@/apis/mobile'
//表单校验(账户名和密码)
const form = ref({
  account: '',
  password: '',
  agree: true
})
const rules = {
  account: [
    { required: true, message: '用户名不能为空', trigger: 'blur'},
    { min: 3, max: 19, message: '用户名长度必须是3~19', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur'},
    { min: 6, max: 15, message: '密码长度必须是6~15', trigger: 'blur' },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        console.log(value)
        //自定义校验逻辑
        if (value === true) {
          callback()
        } else {
          callback(new Error('请勾选同意协议'))
        }
      }
    }
  ]
}
const router = useRouter()
const formRef = ref(null)
const  { getUserData } = useUserStore()
const handleLogin = () => {
  formRef.value.validate( async (valid) => {
    console.log(valid)
    if (valid) {
      // login
      await getUserData({account: form.value.account, password: form.value.password})
      //const res = await getLogin({account: form.value.account, password: form.value.password})
      //console.log(res)
      ElMessage({type: 'success', message: '登陆成功'})
      router.replace({name: 'home'})
    }
  })
}
const show = ref(true)
/* const changeLogin = () =>{
  show.value = !show.value
} */
// 表单校验(手机号和验证码)
const formN = ref({
  mobile: '',
  captcha: '',
  agree: true
})
const formNRef = ref(null)
const rulesN = {
  mobile: [
    { required: true, message: '手机号不能为空', trigger: 'blur'},
    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '验证码不能为空', trigger: 'blur'},
    { min: 6, max: 6, message: '请输入正确的验证码', trigger: 'blur' },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        console.log(value)
        //自定义校验逻辑
        if (value === true) {
          callback()
        } else {
          callback(new Error('请勾选同意协议'))
        }
      }
    }
  ]
}
const getCaptcha = async () =>{
  await mobileAPI(formN.value.mobile)
  ElMessage({
  type: 'success',
  message: '验证码:123456'
  })
  formN.value.captcha = '123456'
}
const handleMobileLogin = () =>{
  formNRef.value.validate( async (valid) => {
    console.log(valid)
    if (valid) {
      // login
      await useUserStore().getUserDataMobile({mobile: formN.value.mobile, captcha: formN.value.captcha})
      //const res = await getLogin({account: form.value.account, password: form.value.password})
      ElMessage({type: 'success', message: '登陆成功'})
      router.replace({name: 'home'})
    }
  })
}
const tabChange = (tab) =>{
  show.value = tab === '0' ? true : false 
  console.log(show.value, tab)
}
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <el-tabs @tab-change="tabChange" class="demo-tabs">
          <el-tab-pane label="账号登录"/>
          <el-tab-pane label="手机号登录"/>
        </el-tabs>
        <div class="account-box" v-show="show">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
              status-icon>
              <el-form-item  prop="account" label="账户">
                <el-input  v-model="form.account"/>
              </el-form-item>
              <el-form-item prop="password" label="密码" >
                <el-input v-model="form.password"/>
              </el-form-item>
              <el-form-item label-width="22px"  prop="agree">
                <el-checkbox  v-model="form.agree" size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="handleLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
        <div class="account-box" v-show="!show">
          <div class="form">
            <el-form ref="formNRef" :model="formN" :rules="rulesN" label-position="right" label-width="60px"
              status-icon>
              <el-form-item  prop="mobile" label="手机号">
                <el-input  v-model="formN.mobile"/>
              </el-form-item>
              <el-form-item prop="captcha" label="验证码" >
                <el-input v-model="formN.captcha"/>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" @click="getCaptcha">点击获取验证码</el-button>
              </el-form-item>
              <el-form-item label-width="22px"  prop="agree">
                <el-checkbox  v-model="formN.agree" size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="handleMobileLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="login-section" v-show="!show">
      <div class="wrapper">
        <span class="change" @click="changeLogin">切换</span>
        <nav>
          <a href="javascript:;">手机号登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formNRef" :model="formN" :rules="rulesN" label-position="right" label-width="60px"
              status-icon>
              <el-form-item  prop="mobile" label="手机号">
                <el-input  v-model="formN.mobile"/>
              </el-form-item>
              <el-form-item prop="captcha" label="验证码" >
                <el-input v-model="formN.captcha"/>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="getCaptcha">点击获取验证码</el-button>
              </el-form-item>
              <el-form-item label-width="22px"  prop="agree">
                <el-checkbox  v-model="formN.agree" size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="handleMobileLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section> -->
    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    .change{
      position: absolute;
      top:7px;
      right:5px
    }
    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
::v-deep .el-form-item__label{
  font-size: 13px;
  text-wrap: nowrap;
}
::v-deep .el-tabs__item:hover{
    color: $xtxColor;
}
::v-deep .el-tabs__item.is-active{
  color: black;
}
::v-deep .el-tabs__active-bar {
  background-color: $xtxColor;
}
::v-deep .el-tabs__nav-scroll{
  display: flex;
  justify-content: center;
}
</style>