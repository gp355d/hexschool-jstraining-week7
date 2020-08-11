<template>
    <!--後台選單頁面-->
    <div>
      <!-- <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">logo</a>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" @click.prevent="signout">登出</a>
          </li>
        </ul>
      </nav> -->
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
     <h2>請點選左邊選單進行操作</h2>
    </main>
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
