require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(109);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_50dad7d7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(112);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(110)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-50dad7d7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_50dad7d7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/map/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50dad7d7", Component.options)
  } else {
    hotAPI.reload("data-v-50dad7d7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 110:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Map',
  data: function data() {
    return {
      markers: [{
        iconPath: '../../static/images/nav.png',
        id: 0,
        longitude: 121.29,
        latitude: 31.14,
        width: 50,
        height: 50
      }]
    };
  },


  methods: {
    // ??????????????????????????????????????????
    toNav: function toNav() {
      wx.openLocation({
        // 119.948507,36.745248
        latitude: 36.745248,
        longitude: 119.948507,
        scale: 6
      });
    },
    linkHe: function linkHe() {
      wx.makePhoneCall({
        phoneNumber: '12345678910'
      });
    },
    linkShe: function linkShe() {
      wx.makePhoneCall({
        phoneNumber: '12345678910'
      });
    }
  }
});

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "map"
  }, [_c('img', {
    staticClass: "head-img",
    attrs: {
      "mode": "aspectFit",
      "src": "../../../static/images/t1.png"
    }
  }), _vm._v(" "), _c('map', {
    staticClass: "content",
    attrs: {
      "id": "map",
      "longitude": "119.948507",
      "latitude": "36.745248",
      "markers": _vm.markers,
      "scale": "18",
      "eventid": '1_0'
    },
    on: {
      "tap": _vm.toNav
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "call"
  }, [_c('div', {
    staticClass: "left",
    attrs: {
      "eventid": '2_1'
    },
    on: {
      "tap": _vm.linkHe
    }
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/he.png"
    }
  }), _vm._v(" "), _c('span', [_vm._v("????????????")])]), _vm._v(" "), _c('div', {
    staticClass: "right",
    attrs: {
      "eventid": '2_2'
    },
    on: {
      "tap": _vm.linkShe
    }
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/she.png"
    }
  }), _vm._v(" "), _c('span', [_vm._v("????????????")])])]), _vm._v(" "), _c('img', {
    staticClass: "footer",
    attrs: {
      "src": "../../../static/images/grren-flower-line.png"
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-50dad7d7", esExports)
  }
}

/***/ })

},[108]);
//# sourceMappingURL=main.js.map