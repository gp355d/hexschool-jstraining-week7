<template>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled': pages.current_page === 1}">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="emitPages(pages.current_page - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="(item, i) in pages.total_pages" :key="i" class="page-item" :class="{'active': item === pages.current_page}">
            <a class="page-link" href="#" @click.prevent="emitPages(item)">{{ item }}</a>
          </li>
          <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="emitPages(pages.current_page + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
</template>
<script>
export default {
  data () { // 元件內的data需使用function return回傳資料
    return {
    }
  },
  props: {
    // 主要由外向內接收，<pagination :pages="pagination" @emit-pages="getProducts">
    // 接收pagination的物件，透過外層:pages的page由外向內傳入
    pages: {}
  },
  methods: {
    // item是點擊的分頁按鈕，當你點第二頁就會傳入二，點第五頁就會傳入五以此類推
    emitPages (item) {
      this.$emit('emit-pages', item) // 透過emit由內向外傳遞我們點擊的分頁並觸發@emit-pages="getProducts"
    }
  }
}
</script>
