<template>
  <div id="app">
    <!--後台選單頁面-->
    <nav class="nav justify-content-end mb-3">
      <router-link class="nav-link" to="/admin">後台管理頁面</router-link>
      <router-link class="nav-link" to="/">回前台</router-link>
      <router-link class="nav-link" to="/admin/products">產品管理列表</router-link>
      <router-link class="nav-link" to="/admin/coupons">優惠卷管理列表</router-link>
      <router-link class="nav-link" to="/admin/orders">訂單列表</router-link>
      <router-link class="nav-link" to="/admin/imgmanger">圖片儲存列表</router-link>
    </nav>
    <button class="btn btn-primary" @click="signout">登出</button>
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userinfo: {
        token: ''
      }
    }
  },
  methods: {
    signout () {
      document.cookie = 'logintoken=;expires=;'
      console.log('token已清除')
      this.$router.push('/admin/login')
    }
  },
  created () {
    this.userinfo.token = document.cookie.replace(/(?:(?:^|.*;\s*)logintoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    console.log(this.userinfo)
    this.$http.defaults.headers.common.Authorization = `Bearer ${this.userinfo.token}`// 驗證身分
    const api = `${process.env.VUE_APP_APIPATH}/auth/check`
    this.$http.post(api, { api_token: this.userinfo.token }).then((res) => {
      console.log(res)
    })
      .catch((error) => {
        console.log(error)
        alert('您尚未登入，請重新登入')
        this.$router.push('/admin/login')
      })
  }
}
</script>
