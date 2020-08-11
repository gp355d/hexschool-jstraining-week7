<template>
    <!--後台選單頁面-->
    <div>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">logo</a>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" @click.prevent="signout">登出</a>
          </li>
        </ul>
      </nav>
<div class="container-fluid">
  <div class="row">
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-1 text-muted">
          <span>後台功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <router-link to="/admin/index">後台管理頁面</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <router-link to="/">回前台</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <router-link to="/admin/products">產品管理列表</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <router-link to="/admin/coupons">優惠卷管理列表</router-link>
            </a>
          </li>
                    <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <router-link to="/admin/orders">訂單列表</router-link>
            </a>
          </li>
                    <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <router-link to="/admin/imgmanger">圖片儲存列表</router-link>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
      <router-view :token="userinfo.token" v-if="userinfo.checkSuccess"></router-view>
    </main>
  </div>
</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      userinfo: {
        token: '',
        checkSuccess: false
      }
    }
  },
  methods: {
    signout () {
      console.log(document.cookie)
      document.cookie = 'logintoken=; expires=; path=/'
      console.log('token已清除')
      this.$router.push('/login')
    }
  },
  created () {
    this.userinfo.token = document.cookie.replace(/(?:(?:^|.*;\s*)logintoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    console.log(this.userinfo)
    this.$http.defaults.headers.common.Authorization = `Bearer ${this.userinfo.token}`// 驗證身分
    const api = `${process.env.VUE_APP_APIPATH}/auth/check`
    this.$http.post(api, { api_token: this.userinfo.token }).then((res) => {
      console.log(res)
      this.userinfo.checkSuccess = true
    })
      .catch((error) => {
        console.log(error)
        alert('您尚未登入，請重新登入')
        this.$router.push('/login')
      })
  }
}
</script>
<style lang="scss">
@import '@/assets/all'
</style>
