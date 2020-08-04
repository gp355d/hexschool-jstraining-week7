<template>
    <div class="container">
      <loading :active.sync="isLoading"></loading>
        <h2>單一產品頁面</h2>
        <h3 class="text-left">{{product.title}}</h3>
        <p>{{product.description}}</p>
    </div>
</template>
<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  created () {
    const id = this.$route.params.id// 使用$route屬性取得id
    console.log(id)
    const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`// 取得前台單一產品資料API
    console.log(api)
    this.isLoading = true
    this.$http.get(api).then((res) => { // 執行axios的$http方法
      console.log(res)
      this.product = res.data.data
      this.isLoading = false
    })
      .catch((error) => {
        console.log(error)
        this.isLoading = false
      })
  }
}
</script>
