<template>
    <div class="container">
      <loading :active.sync="isLoading"></loading>
        <h2>前台產品列表</h2>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">商品名稱</th>
                <th scope="col">售價</th>
                <th scope="col">詳細資訊</th>
              </tr>
            </thead>
             <tbody>
            <tr v-for="item in products" :key="item.id">
                <td>{{item.title}}</td>
                <td>{{item.price | money}}</td>
                <td><router-link :to="`/product/${item.id}`">詳細介紹</router-link></td>
                <!--:to="`/product/${item.id}，為動態連結，動態傳入id參數"-->
            </tr>
             </tbody>
        </table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      products: []
    }
  },
  created () {
    const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`// 取得前台所有產品資料API，process.env.VUE_APP_APIPATH為取得.env檔案內的參數
    console.log(api)
    this.isLoading = true
    this.$http.get(api).then((res) => { // 執行axios的$http方法
      console.log(res)
      this.isLoading = false
      this.products = res.data.data
    }).catch((error) => {
      console.log(error)
      this.isLoading = false
    })
  }
}

</script>
