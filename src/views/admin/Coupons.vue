<template>
    <div class="container">
        <h2>優惠卷列表</h2>
        <div class="text-right mt-4">
    <button class="btn btn-primary" @click="openCouponModal('new')">
        建立新的優惠券
    </button>
</div>
<table class="table mt-4">
    <thead>
        <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.deadline.datetime }}</td>
            <td>
                <span v-if="item.enabled" class="text-success">啟用</span>
                <span v-else class="text-muted">未起用</span>
            </td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm" @click="openCouponModal('edit', item)">
                        編輯
                    </button>
                    <button class="btn btn-outline-danger btn-sm" @click="openCouponModal('delete', item)">
                        刪除
                    </button>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<div id="couponModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="exampleModalLabel" class="modal-title">
                    建立優惠券
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="coupontitle">標題</label>
                    <input v-model="tempCoupon.title" id="coupontitle" type="text" class="form-control" placeholder="請輸入標題">
                </div>
                <div class="form-group">
                    <label for="couponcode">優惠碼</label>
                    <input v-model="tempCoupon.code" id="couponcode" type="text" class="form-control"
                        placeholder="請輸入優惠碼">
                </div>
                <div class="form-group">
                    <label for="deadline">到期日</label>
                    <input type="date" v-model="deadline" id="deadline" class="form-control">
                </div>
                <div class="form-group">
                    <label for="timelimit">到期時間</label>
                    <input type="time" v-model="timelimit" step="1" id="timelimit" class="form-control">
                </div>
                <div class="form-group">
                    <label for="discountpercentage">折扣百分比</label>
                    <input  v-model="tempCoupon.percent" id="discountpercentage"  type="number" class="form-control"
                        placeholder="請輸入折扣數量">
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input v-model="tempCoupon.enabled" id="enabled"  class="form-check-input" type="checkbox">
                        <label class="form-check-label" for="enabled">是否啟用</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    關閉
                </button>
                <button type="button" class="btn btn-primary"  @click="updateCoupon">
              {{ status === 'new' ? '新增優惠卷' : '更新優惠券' }}
                </button>
            </div>
        </div>
    </div>
</div>
<div id="delCouponModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="exampleModalLabel" class="modal-title">
                    <span>刪除優惠卷</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                    取消
                </button>

                <button type="button" class="btn btn-danger" @click="deleteCoupon">
                    確認刪除
                </button>
            </div>
        </div>
    </div>
</div>
    </div>
</template>
<script>
/* global $ */
export default {
  data () {
    return {
      coupons: {}, // 存放AJAX回傳的coupon資料
      tempCoupon: { // 新增、編輯動作要傳送的物件資料
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0, // 存放組合的日期時間，例如2020-06-16 09:31:18
        code: ''
      },
      deadline: '', // 存放到期日資訊
      timelimit: '', // 存放到期時間資訊
      status: '', // 辨識新增、刪除、編輯用
      isLoading: false,
      uuid: process.env.VUE_APP_UUID
    }
  },
  created () {
    this.getCoupons()
  },
  methods: {
    openCouponModal: function (status, item) {
      this.status = status
      switch (status) {
        case 'new':
          this.tempCoupon = {}
          $('#couponModal').modal('show')
          break
        case 'edit': {
          this.tempCoupon = Object.assign({}, item)
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ')
          this.deadline = dedlineAt[0] // 日期
          this.timelimit = dedlineAt[1] // 時間
          $('#couponModal').modal('show')
          break
        }
        case 'delete':
          this.tempCoupon = Object.assign({}, item)
          $('#delCouponModal').modal('show')
          break
        default:
          break
      }
    },
    getCoupons: function () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/coupons`
      this.$http.get(api)
        .then(function (res) {
          // console.log(res)
          vm.coupons = res.data.data
        })
    },
    updateCoupon: function () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/coupon`
      let httpMethod = ''
      if (this.status === 'new') {
        httpMethod = 'post'
      } else {
        api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/coupon/${this.tempCoupon.id}`
        httpMethod = 'patch'
      }
      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.deadline} ${this.timelimit}`
      console.log(this.tempCoupon)
      this.$http[httpMethod](api, this.tempCoupon)
        .then(function (res) {
          $('#couponModal').modal('hide')
          if (res.status === 200) {
            alert('成功')
            vm.getCoupons()
          } else {
            alert('失敗')
          }
        })
    },
    deleteCoupon: function () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/${this.uuid}/admin/ec/coupon/${this.tempCoupon.id}`
      this.$http.delete(api)
        .then(function (res) {
          $('#delCouponModal').modal('hide')
          if (res.status === 200) {
            alert('成功')
            vm.getCoupons()
          } else {
            alert('失敗')
          }
        })
    }
  }
}
</script>
