require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([2],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);

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
  props: {
    // 弹幕源数组
    arr: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 弹幕是否暂停状态
    isPause: {
      type: Boolean
    },
    // 弹幕占比
    percent: {
      type: Number,
      default: 80
    }
  },
  data: function data() {
    return {
      // 每行弹幕数最大值
      MAX_DM_COUNT: 5,
      // 行数
      CHANNEL_COUNT: 8,
      // 弹幕数组
      barrages: [],
      // dom池
      domPool: [],
      // intervalDM
      intervalDM: null,
      // 取弹幕时间间隔
      interValTime: 500,
      // 滚动弹幕的通道
      hasPosition: [],
      // 顶部弹幕的通道
      hasTopPosition: [],
      // 弹幕容器
      barrageMainDm: null,
      // 弹幕容器宽度
      barMainWidth: 500,
      // 自定义弹幕样式属性列表
      dmStyles: ['color', 'fontSize']
    };
  },

  computed: {},
  created: function created() {},
  mounted: function mounted() {
    this.barrageMainDm = this.$refs.barrageMainDm;
    // 缓存容器宽度
    this.barMainWidth = this.barrageMainDm.clientWidth;
    // 初始化弹幕dom组
    // this.init();
    // 开始播放弹幕
    this.playDm();
    // 注册页面监听器
    // document.addEventListener("visibilitychange", this.visibilitychangeFn);
  },

  watch: {
    arr: function arr(list) {
      this.barrages = list;
    },
    isPause: function isPause(val) {
      if (val) {
        this.pauseDm();
      } else {
        this.playDm();
      }
    },
    percent: function percent(val) {
      this.CHANNEL_COUNT = val / 10;
    }
  },
  methods: {
    visibilitychangeFn: function visibilitychangeFn() {
      if (!document.hidden) {
        //处于当前页面
        this.playDm();
        console.log('进入页面');
      } else {
        console.log('离开页面');
        clearInterval(this.intervalDM);
        this.intervalDM = null;
      }
    },
    init: function init() {
      var _this = this;

      var wrapper = this.$refs.barrageMainDm;
      // 先new一些div 重复利用这些DOM

      var _loop = function _loop(j) {
        var doms = [];

        var _loop2 = function _loop2(_i) {
          // 初始化dom
          var dom = document.createElement('div');
          // 初始化dom的位置 通过设置className
          dom.className = 'barrage-item';
          dom.style.transform = 'translate3d(' + _this.barMainWidth + 'px,0,0)';
          // DOM的通道是固定的 所以设置好top就不需要再改变了
          dom.style.top = j * (_this.barrageMainDm.clientHeight / _this.CHANNEL_COUNT) + 'px';
          console.log(dom.style.top);
          // 每次到animationend结束的时候 就是弹幕划出屏幕了 将DOM位置重置 再放回DOM池
          dom.addEventListener('animationend', function (e) {
            // 初始化dom样式
            dom.className = 'barrage-item';
            dom.style.transform = 'translate3d(' + _this.barMainWidth + 'px,0,0)';
            dom.style.animation = null;
            // 清空自定义样式
            _this.dmStyles.forEach(function (key) {
              dom.style[key] = null;
            });
            // this.domPool[j].push({ el: dom });
            // 动画结束后设置当前dom为空闲状态
            // console.log(i, j)
            if (_this.domPool[_i][j]) {
              _this.domPool[_i][j].isFree = false;
            }
            // console.log(dom)
          });
          // 放入该通道的DOM池
          doms.push({
            row: j,
            col: _i,
            el: dom,
            isUse: false,
            isFree: false
          });
        };

        for (var _i = 0; _i < _this.MAX_DM_COUNT; _i++) {
          _loop2(_i);
        }
        _this.domPool.push(doms);
      };

      for (var j = 0; j < this.CHANNEL_COUNT; j++) {
        _loop(j);
      }
      // hasPosition 标记每个通道目前是否有位置
      for (var i = 0; i < this.CHANNEL_COUNT; i++) {
        this.hasPosition[i] = true;
        this.hasTopPosition[i] = true;
      }
    },

    /**
     * 获取一个可以发射弹幕的通道 没有则返回-1
     */
    getChannel: function getChannel() {
      for (var i = 0; i < this.CHANNEL_COUNT; i++) {
        if (this.hasPosition[i] && this.domPool[i].length) return i;
      }
      return -1;
    },

    /**
    * 获取一个可以发射顶部弹幕的通道 没有则返回-1
    */
    getTopChannel: function getTopChannel() {
      for (var i = 0; i < this.CHANNEL_COUNT; i++) {
        if (this.hasTopPosition[i]) return i;
      }
      return -1;
    },

    /**
    * 根据DOM和弹幕信息 发射弹幕
    */
    shootDanmu: function shootDanmu(domItem, dmItem, channel) {
      var _this2 = this;

      // 设置当前通道为false
      this.hasPosition[channel] = false;
      //获取dom
      var dom = domItem.el;
      // 是否已经使用的dom
      if (!domItem.isUse && this.barrageMainDm) {
        domItem.isUse = true;
        this.barrageMainDm.appendChild(domItem.el);
      }
      // 判断是否有自定义样式
      if (dmItem.style) {
        var keys = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(dmItem.style);
        var self = this;
        keys.forEach(function (key) {
          // 检查样式属性是否合法
          var isStyle = self.dmStyles.includes(key);
          if (isStyle) {
            dom.style[key] = dmItem.style[key];
          }
        });
      }
      domItem.isFree = true;
      // console.log('biu~ [' + dmItem.content + ']');
      // dom.innerText = dmItem.content;
      // 判断是否是js弹幕
      if (dmItem.isJs) {
        dom.innerHTML = dmItem.content;
      } else {
        dom.innerText = dmItem.content;
      }
      // 设置弹幕的位置信息 性能优化 left -> transform
      // dom.style.transform = `translateX(${-dom.clientWidth}px)`;
      // dom.style.transform = `translate3d(${-dom.clientWidth}px,0,0)`; // css硬件加速
      dom.className = dmItem.isSelf ? 'barrage-item self-dm' : 'barrage-item';
      dom.style.animation = 'barrage-run 5s linear';
      // 弹幕全部显示之后 才能开始下一条弹幕
      // 大概 dom.clientWidth * 10 的时间 该条弹幕就从右边全部划出到可见区域 再加1秒保证弹幕之间距离
      setTimeout(function () {
        _this2.hasPosition[channel] = true;
      }, dom.clientWidth * 10 + 1000);
    },
    shootTopDanmu: function shootTopDanmu(dmItem, channel) {
      var _this3 = this;

      // 设置当前通道为false
      this.hasTopPosition[channel] = false;
      //获取dom
      var dom = document.createElement('div');
      dom.className = dmItem.isSelf ? 'barrage-item top-item self-dm' : 'barrage-item top-item';
      // 判断是否有自定义样式
      if (dmItem.style) {
        var keys = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(dmItem.style);
        var self = this;
        keys.forEach(function (key) {
          // 检查样式属性是否合法
          var isStyle = self.dmStyles.includes(key);
          if (isStyle) {
            dom.style[key] = dmItem.style[key];
          }
        });
      }
      // 判断是否是js弹幕
      if (dmItem.isJs) {
        dom.innerHTML = dmItem.content;
      } else {
        dom.innerText = dmItem.content;
      }
      dom.addEventListener('animationend', function () {
        _this3.barrageMainDm.removeChild(dom);
        _this3.hasTopPosition[channel] = true;
      });
      this.barrageMainDm.appendChild(dom); // 一定要在获取宽度和执行动画之前渲染dom
      dom.style.transform = 'translate3d(' + (this.barMainWidth / 2 - dom.clientWidth / 2) + 'px,' + channel * dom.clientHeight + 'px,0)';
      dom.style.animation = 'barrage-fade 3s';
    },

    // 获取空闲通道中空闲的dom
    getFreeChannelDom: function getFreeChannelDom(channel) {
      var item = void 0;
      item = this.domPool[channel].find(function (it) {
        return !it.isFree;
      });
      return item;
    },

    // 暂停弹幕
    pauseDm: function pauseDm() {
      if (this.intervalDM) {
        clearInterval(this.intervalDM);
        this.intervalDM = null;
      }
    },

    // 播放弹幕
    playDm: function playDm() {
      // 每隔1ms从弹幕池里获取弹幕（如果有的话）并发射
      var self = this; // 这里取一个self this 为了方便调试的时候看到this具体内容
      self.intervalDM = setInterval(function () {
        // let channel;
        // if (self.barrages.length && (channel = self.getChannel()) != -1) {
        //   let domItem = self.getFreeChannelDom(channel);
        //   // let domItem = self.domPool[channel].shift();
        //   if (domItem) {
        //     let danmu = self.barrages.shift();
        //     self.shootDanmu(domItem, danmu, channel);
        //   }
        // }
        // 更新逻辑
        if (self.barrages.length > 0) {
          var channel = void 0;
          var topChannel = void 0;
          var barrage = self.barrages.shift();
          if (barrage.direction == 'top' && (topChannel = self.getTopChannel()) != -1) {
            // top....
            self.shootTopDanmu(barrage, topChannel);
          }
          if (barrage.direction == 'default' && (channel = self.getChannel()) != -1) {
            // default....
            var domItem = self.getFreeChannelDom(channel);
            if (domItem) {
              // let danmu = self.barrages.shift();
              self.shootDanmu(domItem, barrage, channel);
            }
          }
        }
      }, self.interValTime);
    }
  },
  components: {}
});

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    ref: "barrageWrapper",
    staticClass: "barrage-wrapper",
    style: ({
      height: _vm.percent + '%'
    })
  }, [_c('div', {
    staticClass: "barrage-main"
  }, [_c('div', {
    ref: "barrageMainDm",
    staticClass: "barrage-main-dm",
    class: {
      'ani-pause': _vm.isPause, 'ani-running': !_vm.isPause
    }
  }, [_c('div', {
    staticClass: "barrage-item top-item self-dm"
  }, [_vm._v("\n              123\n          ")])])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5ed08bcc", esExports)
  }
}

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home"
  }, [_c('h2', {
    staticStyle: {
      "text-align": "center"
    }
  }, [_vm._v("Vue-barrage 基于vue的弹幕组件")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "400px",
      "width": "800px",
      "position": "relative",
      "margin": "0px auto",
      "background": "#000"
    }
  }, [_c('v-barrage', {
    attrs: {
      "arr": _vm.arr,
      "isPause": _vm.isPause,
      "percent": 100,
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "barrage-control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sendContent),
      expression: "sendContent"
    }],
    attrs: {
      "type": "text",
      "placeholder": "回车发送",
      "id": "sendContent",
      "eventid": '2_0'
    },
    domProps: {
      "value": (_vm.sendContent)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.sendBarrage($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.sendContent = $event.target.value
      }
    }
  }), _vm._v("\n    方向:\n    "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.direction),
      expression: "direction"
    }],
    staticStyle: {
      "margin": "0px 12px"
    },
    attrs: {
      "eventid": '2_1'
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.direction = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "default"
    }
  }, [_vm._v("默认")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "top"
    }
  }, [_vm._v("顶部")])], 1), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.isJs),
      expression: "isJs"
    }],
    attrs: {
      "type": "checkbox",
      "eventid": '2_2'
    },
    domProps: {
      "checked": Array.isArray(_vm.isJs) ? _vm._i(_vm.isJs, null) > -1 : (_vm.isJs)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.isJs,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.isJs = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.isJs = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.isJs = $$c
        }
      }
    }
  }), _vm._v(" js弹幕(直接写代码)\n    "), _c('button', {
    staticStyle: {
      "margin-left": "25px"
    },
    attrs: {
      "id": "sendBarrageBtn",
      "eventid": '2_3'
    },
    on: {
      "click": _vm.sendBarrage
    }
  }, [_vm._v("发送")]), _vm._v(" "), _c('button', {
    attrs: {
      "id": "pauseBtn",
      "eventid": '2_4'
    },
    on: {
      "click": function($event) {
        _vm.isPause = true
      }
    }
  }, [_vm._v("暂停")]), _vm._v(" "), _c('button', {
    attrs: {
      "id": "startBtn",
      "eventid": '2_5'
    },
    on: {
      "click": function($event) {
        _vm.isPause = false
      }
    }
  }, [_vm._v("开始")])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-539f884a", esExports)
  }
}

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "index"
  }, [_c('div', {
    staticClass: "bg-swiper"
  }, [_c('index-swiper', {
    attrs: {
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), _c('img', {
    staticClass: "inv",
    attrs: {
      "src": "../../../static/images/inv.png"
    }
  }), _vm._v(" "), (_vm.isPlay) ? _c('div', {
    staticClass: "bg_music",
    attrs: {
      "eventid": '1_1'
    },
    on: {
      "tap": _vm.audioPlay
    }
  }, [_c('img', {
    staticClass: "musicImg music_icon",
    attrs: {
      "src": "../../../static/images/music_icon.png"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "music_play pauseImg",
    attrs: {
      "src": "../../../static/images/music_play.png"
    }
  })]) : _c('div', {
    staticClass: "bg_music",
    attrs: {
      "eventid": '1_0'
    },
    on: {
      "tap": _vm.audioPlay
    }
  }, [_c('img', {
    staticClass: "musicImg",
    attrs: {
      "src": "../../../static/images/music_icon.png"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "music_play playImg",
    attrs: {
      "src": "../../../static/images/music_play.png"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "info",
    attrs: {
      "animation": _vm.animationData
    }
  }, [_c('div', {
    staticClass: "content"
  }, [_c('h1', [_vm._v("雷腾飞 "), _c('span', [_vm._v("❤")]), _vm._v(" 王楠楠")]), _vm._v(" "), _c('p', [_vm._v("谨定于 2020年05月1日（星期六）")]), _vm._v(" "), _c('p', [_vm._v("农历 三月二十  举办婚礼")]), _vm._v(" "), _c('p', [_vm._v("席设：宏泰酒店")]), _vm._v(" "), _c('p', [_vm._v("地址：地图开发中")]), _vm._v(" "), _c('img', {
    staticClass: "img_footer",
    attrs: {
      "src": "../../../static/images/we.png"
    }
  })], 1)])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6b1ce7cd", esExports)
  }
}

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(88);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_6b1ce7cd_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(107);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(89)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6b1ce7cd"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_6b1ce7cd_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/index/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b1ce7cd", Component.options)
  } else {
    hotAPI.reload("data-v-6b1ce7cd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 89:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_indexSwiper__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_barrageGroup__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_js_h_tools__ = __webpack_require__(11);
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




var audioCtx = wx.createInnerAudioContext();
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Index',
  components: {
    IndexSwiper: __WEBPACK_IMPORTED_MODULE_0_components_indexSwiper__["a" /* default */],
    barrageGroup: __WEBPACK_IMPORTED_MODULE_1_components_barrageGroup__["a" /* default */]
  },
  data: function data() {
    return {
      bullets: {
        frequency: 1,
        msglist: [1, 2, 3, 4, 5, 6, 67, 7, 78, 8]
      },
      isPlay: true
    };
  },
  onShow: function onShow() {
    var that = this;
    that.isPlay = true;
    // 音乐
    audioCtx.src = 'cloud://bertlearning-62870c.6265-bertlearning-62870c/music/yudao.mp3';
    audioCtx.autoplay = true;
  },


  methods: {
    audioPlay: function audioPlay() {
      var that = this;
      if (that.isPlay) {
        audioCtx.pause();
        that.isPlay = false;
        __WEBPACK_IMPORTED_MODULE_2__common_js_h_tools__["a" /* default */].showToast('您已暂停音乐播放~');
      } else {
        audioCtx.play();
        that.isPlay = true;
        __WEBPACK_IMPORTED_MODULE_2__common_js_h_tools__["a" /* default */].showToast('背景音乐已开启~');
      }
    }
  },

  // 自定义转发内容
  onShareAppMessage: function onShareAppMessage(res) {
    return {
      title: '自定义分享内容',
      path: '/pages/index/main',
      imageUrl: 'https://img-blog.csdnimg.cn/20190918091410914.gif'
    };
  }
});

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_indexSwiper_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_2f948e84_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_indexSwiper_vue__ = __webpack_require__(94);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(92)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2f948e84"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_indexSwiper_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_2f948e84_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_indexSwiper_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/indexSwiper.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] indexSwiper.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f948e84", Component.options)
  } else {
    hotAPI.reload("data-v-2f948e84", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 92:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 93:
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

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'IndexSwiper'
});

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "box"
  }, [_c('swiper', {
    staticClass: "swiper",
    attrs: {
      "autoplay": true,
      "circular": true,
      "current": "0",
      "vertical": true
    }
  }, [_c('swiper-item', {
    staticClass: "item",
    attrs: {
      "mpcomid": '0'
    }
  }, [_c('img', {
    staticClass: "slide-image",
    attrs: {
      "mode": "aspectFill",
      "lazy-load": "true",
      "src": "../../static/photo/1.jpg"
    }
  })])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2f948e84", esExports)
  }
}

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_barrageGroup_vue__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_539f884a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_barrageGroup_vue__ = __webpack_require__(106);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(96)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-539f884a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_barrageGroup_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_539f884a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_barrageGroup_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/barrageGroup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] barrageGroup.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-539f884a", Component.options)
  } else {
    hotAPI.reload("data-v-539f884a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 96:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vabrrge_index_vue__ = __webpack_require__(98);
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

// @ is an alias to /src


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'home',
  components: {
    VBarrage: __WEBPACK_IMPORTED_MODULE_0__vabrrge_index_vue__["a" /* default */]
  },
  data: function data() {
    return {
      arr: [],
      isPause: false,
      sendContent: null,
      isJs: false,
      direction: 'default'
    };
  },
  mounted: function mounted() {
    this.initTestData();
  },

  methods: {
    // 初始化模拟弹幕数据
    initTestData: function initTestData() {
      var arr = ['这是一条有弹幕', '今天去打LOL', '可以吗？', '一起嗨！！！'];
      for (var i = 0; i < 6; i++) {
        for (var index = 0; index < 1000; index++) {
          if (index % 2 == 0) {
            this.arr.push({
              direction: 'top',
              content: arr[parseInt(Math.random() * arr.length)]
            });
          } else {
            this.arr.push({
              direction: 'default',
              content: arr[parseInt(Math.random() * arr.length)]
            });
          }
        }
      }
    },

    // 发送弹幕
    sendBarrage: function sendBarrage() {
      if (this.arr.length > 1 && this.sendContent != '' && this.sendContent != null) {
        this.arr.unshift({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: 'red',
            fontSize: '25px'
          },
          isJs: this.isJs
        });
      } else {
        this.arr.push({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: 'red'
          },
          isJs: this.isJs
        });
      }
      this.sendContent = null;
    }
  }
});

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_5ed08bcc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(105);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(99)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_template_compiler_index_id_data_v_5ed08bcc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_1_4_0_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/vabrrge/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ed08bcc", Component.options)
  } else {
    hotAPI.reload("data-v-5ed08bcc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 99:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[87]);
//# sourceMappingURL=main.js.map