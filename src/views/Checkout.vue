<template>
    <div>
        <h2>結帳</h2>
          <loading :active.sync="isLoading"></loading>
    <validation-observer v-slot="{ invalid }">
      <form @submit.prevent="submitForm">
        <validation-provider rules="required" v-slot="{ errors, classes }">
          <label for="username">收件人姓名</label>
          <input id="username" type="text" name="收件人姓名" v-model="temporders.name" class="form-control" :class="classes"
            placeholder="輸入username">
          <!-- 錯誤訊息 -->
          <span class="invalid-feedback">{{ errors[0] }}</span>
        </validation-provider>

        <validation-provider rules="required|email" v-slot="{ errors, classes }">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" name="email" v-model="temporders.email" class="form-control" :class="classes"
              placeholder="輸入email">
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </div>
        </validation-provider>
        <!--rules="required|min:8"，驗證輸入數字至少要8位數-->
        <validation-provider rules="required|min:8" v-slot="{ errors, classes }">
          <div class="form-group">
            <label for="phone">電話</label>
            <input :class="classes" v-model="temporders.tel" name="電話" type="tel" class="form-control" id="phone"
              placeholder="輸入電話">
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </div>
        </validation-provider>

        <validation-provider rules="required" v-slot="{ errors, classes }">
          <div class="form-group">
            <label for="address">地址</label>
            <input :class="classes" v-model="temporders.address" name="地址" type="text" class="form-control" id="address"
              placeholder="輸入地址">
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </div>
        </validation-provider>

        <validation-provider rules="required" v-slot="{ errors, classes }">
          <div class="form-group">
            <label for="pay">購買方式</label>
            <select :class="classes" class="form-control" id="pay" name="付款方式" v-model="temporders.payment">
              <option value="0" selected disabled>請選擇付款方式</option>
              <option v-for="(item,i) in payMoneyway" :key="i+1" :value="i+1">{{item}}</option>
            </select>
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </div>
        </validation-provider>
        <div class="form-group">
          <label for="message">留言</label>
          <textarea v-model="temporders.message" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <!-- 送出表單使用 submit 的方法，如果驗證未通過則 disabled 該按鈕 -->
        <button type="submit" class="btn btn-primary" :disabled="invalid">送出表單</button>
      </form>
    </validation-observer>
    </div>
</template>
<script>
export default {
  data () {
    return {
      products: [],
      tmpProducts: {
        imageUrl: []
      },
      status: {
        loadingItem: '', // 按鈕讀取狀態
        isloadingupdateCart: '' // 購物車內增加或減少數量的按鈕讀取效果
      },
      payMoneyway: ['WebATM', 'ATM', 'Barcode', 'Credit', 'ApplePay', 'GooglePay'],
      carts: [],
      cartTotal: 0,
      isLoading: false,
      apiinfo: {
        uuid: process.env.VUE_APP_UUID,
        apipath: process.env.VUE_APP_APIPATH
      },
      temporders: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm: function () {
      const pay = this.temporders.payment
      switch (pay) {
        case 1:
          this.temporders.payment = 'WebATM'
          break
        case 2:
          this.temporders.payment = 'ATM'
          break
        case 3:
          this.temporders.payment = 'Barcode'
          break
        case 4 :
          this.temporders.payment = 'Credit'
          break
        case 5 :
          this.temporders.payment = 'ApplePay'
          break
        default:
          this.temporders.payment = 'GooglePay'
          break
      }
      // const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/${this.apiinfo.uuid}/ec/orders`
      this.$http.post(api, this.temporders)
        .then(function (res) {
          console.log(res)
        })
    }
  }
}
</script>
