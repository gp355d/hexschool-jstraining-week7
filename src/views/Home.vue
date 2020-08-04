<template>
<!--前台選單頁面-->
  <div id="app">
    <nav class="nav justify-content-end mb-3">
      <loading :active.sync="isLoading"></loading>
      <router-link class="nav-link" to="/">首頁</router-link>
      <router-link class="nav-link" to="/products">前台產品列表</router-link>
      <router-link class="nav-link" to="/cart">購物車</router-link>
      <router-link class="nav-link" to="/about">關於我們</router-link>
      <router-link class="nav-link" to="/checkout">結帳</router-link>
      <router-link class="nav-link" to="/checkoutok">結帳完成</router-link>
    </nav>
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    this.isLoading = true
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  }
}
</script>
