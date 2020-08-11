<template>
<div class="container d-flex justify-content-center text-center">
        <form class="form-signin" @submit.prevent="signin">
          <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="user.email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="user.password" required>
          </div>
          <button type="submit" class="btn btn-primary">登入</button>
        </form>
</div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      token: ''
    }
  },
  methods: {
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`// 登入API
      this.$http.post(api, this.user).then((res) => {
        console.log(res)
        const token = res.data.token
        const expired = res.data.expired
        document.cookie = `logintoken=${token}; expires=${new Date(expired * 1000)}; path=/`// 將token的值及cookie期限存入cookie
        this.$router.push('/admin')
      })
        .catch((error) => {
          console.log(error)
          // alert(error.responsive)
          this.$router.push('/')
        })
    }
  }
}
</script>
<style lang="scss">
// html,
// body {
//   height: 100vh;
//   text-align: center;
// }
// body {
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }
</style>
