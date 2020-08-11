<template>
    <div class="container">
        <h2>後台產品管理</h2>
        <div class="text-right mt-4">
          <button class="btn btn-primary" @click="openModal('new')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                分類
              </th>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in products" :key="i">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-right">
                {{ item.origin_price }}
              </td>
              <td class="text-right">
                {{ item.price }}
              </td>
              <td>
                <span v-if="item.enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                    編輯
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <pg :pages="pagination" @emit-pages="getProducts"></pg>
            <!-- add、edit產品Modal -->
    <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯 {{ tempProduct.title }} 產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div v-for="i in 5" :key="i + 'img'" class="form-group">
                  <label :for="'img' + i">輸入圖片網址</label>
                  <input :id="'img' + i" v-model="tempProduct.imageUrl[i - 1]" type="text" class="form-control"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input id="customFile" ref="file" type="file" class="form-control" @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題"
                    required>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                      placeholder="請輸入分類" required>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input id="price" v-model="tempProduct.price" type="number" class="form-control"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品說明</label>
                  <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                    placeholder="請輸入產品說明" required>
            </textarea>
                </div>
                <div class="form-group">
                  <label for="content">產品描述</label>
                  <textarea id="content" v-model="tempProduct.content" type="text" class="form-control"
                    placeholder="請輸入產品描述" required>
            </textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input id="enabled" v-model="tempProduct.enabled" class="form-check-input" type="checkbox">
                    <label class="form-check-label" for="enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateProduct">
              確認
            </button>
          </div>
        </div>
      </div>
     </div>

    <div id="delProductModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
          <Toast/>
  </div>
</template>
<script>
/* global $ */
import Pagination from '@/components/Pagination.vue'
import Toast from '@/components/Toasts.vue'
export default {
  components: {
    pg: Pagination,
    Toast
  },
  data () {
    return {
      products: [], // 存放ajax取回的資料
      pagination: {}, // 存放分頁用
      tempProduct: { // 存放暫存資料，事先定義imageUrl是一個陣列，否則新增或更新會出現錯誤
        imageUrl: []
      },
      isNew: false, // 判斷是新增還是編輯用
      status: {
        fileUploading: false // 用於切換上傳圖片時的小icon，主要是增加使用者體驗
      },
      user: {
        token: '',
        uuid: process.env.VUE_APP_UUID
      }
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts: function (page = 1) { // page變數預設值為1
      var vm = this
      console.log(vm)
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`
      this.$http.get(api)
        .then(function (res) {
          vm.products = res.data.data
          vm.pagination = res.data.meta.pagination
          console.log(vm.products, vm.pagination)
        })
        .catch(function (error) {
          console.log(error) // 若出現錯誤則顯示錯誤訊息
        })
    },
    getProduct: function (id) {
      var vm = this
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`
      this.$http.get(api)
        .then(function (res) {
          // 取得成功後回寫到tempProduct
          vm.tempProduct = res.data.data
          // 確保資料已經回寫後在打開Modal
          $('#productModal').modal('show')
        })
        .catch(function (error) {
          console.log(error) // 若出現錯誤則顯示錯誤訊息
        })
    },
    openModal: function (isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = { // 新增之前必須先清除原有可能暫存的資料
            imageUrl: []
          }
          this.isNew = true
          $('#productModal').modal('show')
          break
        case 'edit':
          // 由於描述欄位是必須透過取得單一產品的方式，因此會執行 AJAX
          this.getProduct(item.id)
          // 切換狀態為 false 代表編輯
          this.isNew = false
          break
        case 'delete':
          this.tempProduct = Object.assign({}, item)
          $('#delProductModal').modal('show')
          break
        default:
          break
      }
    },
    updateProduct: function () {
      var vm = this
      // 新增商品API
      var api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product`
      var httpMethod = 'post'
      // 當不是新增產品時則切換成編輯產品API
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
        httpMethod = 'patch'
      }

      // 預設帶入token
      // axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      this.$http[httpMethod](api, this.tempProduct)
        .then(function (res) {
          $('#productModal').modal('hide') // AJAX新增成功後關閉Modal
          console.log(res)
          vm.getProducts() // 重新取得全部產品資料
        })
        .catch(function (error) {
          console.log(error.response) // 若出現錯誤則顯示錯誤訊息
          // vm.$bus.$emit(
          //   'message:push',
          //   '登入成功',
          //   'success')
        })
    },
    uploadFile: function () {
      var vm = this
      const uploadedFile = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('file', uploadedFile)
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`
      this.status.fileUploading = true
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        vm.status.fileUploading = false
        if (response.status === 200) {
          vm.tempProduct.imageUrl.push(response.data.data.path)
        }
      }).catch(function () {
        console.log('上傳不可超過 2 MB')
        vm.status.fileUploading = false
      })
    },
    delProduct: function () {
      var vm = this
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      // 預設帶入token
      // this.$http.defaults.headers.common.Authorization = `Bearer ${this.user.token}`
      this.$http.delete(api)
        .then(function () {
          $('#delProductModal').modal('hide') // 刪除成功後關閉 Modal
          vm.getProducts() // 重新取得全部資料
        })
    }
  }

}
</script>
