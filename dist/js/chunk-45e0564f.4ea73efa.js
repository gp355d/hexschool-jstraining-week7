(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45e0564f"],{1799:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("nav",{attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination"},[e("li",{staticClass:"page-item",class:{disabled:1===t.pages.current_page}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return a.preventDefault(),t.emitPages(t.pages.current_page-1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pages.total_pages,(function(a,i){return e("li",{key:i,staticClass:"page-item",class:{active:a===t.pages.current_page}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.emitPages(a)}}},[t._v(t._s(a))])])})),e("li",{staticClass:"page-item",class:{disabled:t.pages.current_page===t.pages.total_pages}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return a.preventDefault(),t.emitPages(t.pages.current_page+1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])},s=[],n={data:function(){return{}},props:{pages:{}},methods:{emitPages:function(t){this.$emit("emit-pages",t)}}},r=n,o=e("2877"),l=Object(o["a"])(r,i,s,!1,null,null,null);a["a"]=l.exports},8418:function(t,a,e){"use strict";var i=e("c04e"),s=e("9bf2"),n=e("5c6c");t.exports=function(t,a,e){var r=i(a);r in t?s.f(t,r,n(0,e)):t[r]=e}},"964a":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("h2",[t._v("圖片儲存列表")]),e("table",{staticClass:"table mt-4"},[t._m(0),e("tbody",t._l(t.storages,(function(a){return e("tr",{key:a.id},[e("td",[e("img",{staticClass:"img-fluid",attrs:{src:a.path,alt:"",width:"100px"}})]),e("td",[e("div",{staticClass:"btn-group btn-group-sm"},[e("button",{staticClass:"btn btn-outline-danger",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.openimgdelModel(a)}}},[t._v("刪除")])])])])})),0)]),e("div",{staticClass:"modal fade",attrs:{id:"deleteimgModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content border-0"},[t._m(1),e("div",{staticClass:"modal-body"},[t._v(" 是否刪除該筆資料 (刪除後將無法恢復)。 ")]),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v(" 取消 ")]),e("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:t.deleteimgData}},[t._v(" 確認刪除 ")])])])])]),e("pg",{attrs:{pages:t.pagination},on:{"emit-pages":t.getData}})],1)},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",[t._v("圖片縮圖")]),e("th",[t._v("操作")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-danger text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[e("span",[t._v("刪除資料")])]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],n=(e("99af"),e("1799")),r={components:{pg:n["a"]},data:function(){return{storages:{},tempData:{},pagination:{},isLoading:!1,uuid:"d52eae5f-b113-4dd1-81cc-46bd383ac57a"}},created:function(){this.getData()},methods:{getData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=this,e="".concat("https://course-ec-api.hexschool.io/api","/").concat(this.uuid,"/admin/storage?page=").concat(t);this.$http.get(e).then((function(t){a.storages=t.data.data,a.pagination=t.data.meta.pagination}))},openimgdelModel:function(t){$("#deleteimgModal").modal("show"),this.tempData=Object.assign({},t)},deleteimgData:function(){var t=this,a="".concat("https://course-ec-api.hexschool.io/api","/").concat(this.uuid,"/admin/storage/").concat(this.tempData.id);this.$http.delete(a).then((function(a){$("#deleteimgModal").modal("hide"),alert("刪除成功"),t.getData()}))}}},o=r,l=e("2877"),c=Object(l["a"])(o,i,s,!1,null,null,null);a["default"]=c.exports},"99af":function(t,a,e){"use strict";var i=e("23e7"),s=e("d039"),n=e("e8b5"),r=e("861d"),o=e("7b0b"),l=e("50c4"),c=e("8418"),d=e("65f0"),u=e("1dde"),p=e("b622"),g=e("2d00"),f=p("isConcatSpreadable"),m=9007199254740991,h="Maximum allowed index exceeded",b=g>=51||!s((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),v=u("concat"),_=function(t){if(!r(t))return!1;var a=t[f];return void 0!==a?!!a:n(t)},C=!b||!v;i({target:"Array",proto:!0,forced:C},{concat:function(t){var a,e,i,s,n,r=o(this),u=d(r,0),p=0;for(a=-1,i=arguments.length;a<i;a++)if(n=-1===a?r:arguments[a],_(n)){if(s=l(n.length),p+s>m)throw TypeError(h);for(e=0;e<s;e++,p++)e in n&&c(u,p,n[e])}else{if(p>=m)throw TypeError(h);c(u,p++,n)}return u.length=p,u}})}}]);
//# sourceMappingURL=chunk-45e0564f.4ea73efa.js.map