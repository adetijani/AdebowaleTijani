import{y as $,J as T,k as B,s as E}from"./pinia-8e23f54c.js";var C={exports:{}};(function(b){b.exports=function(d){var a={};function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return d[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=d,o.c=a,o.d=function(t,n,s){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:s})},o.r=function(t){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,n){if(n&1&&(t=o(t)),n&8||n&4&&typeof t=="object"&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),n&2&&typeof t!="string")for(var c in t)o.d(s,c,(function(h){return t[h]}).bind(null,c));return s},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="/dist/",o(o.s=82)}({0:function(d,a,o){o.d(a,"a",function(){return t});function t(n,s,c,h,u,g,v,m){var i=typeof n=="function"?n.options:n;s&&(i.render=s,i.staticRenderFns=c,i._compiled=!0),h&&(i.functional=!0),g&&(i._scopeId="data-v-"+g);var f;if(v?(f=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!e&&typeof __VUE_SSR_CONTEXT__<"u"&&(e=__VUE_SSR_CONTEXT__),u&&u.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(v)},i._ssrRegister=f):u&&(f=m?function(){u.call(this,this.$root.$options.shadowRoot)}:u),f)if(i.functional){i._injectStyles=f;var y=i.render;i.render=function(l,r){return f.call(r),y(l,r)}}else{var p=i.beforeCreate;i.beforeCreate=p?[].concat(p,f):[f]}return{exports:n,options:i}}},11:function(d,a){d.exports=$()},13:function(d,a){d.exports=T()},4:function(d,a){d.exports=B()},82:function(d,a,o){o.r(a);var t=function(){var e=this,l=e.$createElement,r=e._self._c||l;return r("transition",{attrs:{name:"dialog-fade"},on:{"after-enter":e.afterEnter,"after-leave":e.afterLeave}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-dialog__wrapper",on:{click:function(_){return _.target!==_.currentTarget?null:e.handleWrapperClick(_)}}},[r("div",{key:e.key,ref:"dialog",class:["el-dialog",{"is-fullscreen":e.fullscreen,"el-dialog--center":e.center},e.customClass],style:e.style,attrs:{role:"dialog","aria-modal":"true","aria-label":e.title||"dialog"}},[r("div",{staticClass:"el-dialog__header"},[e._t("title",[r("span",{staticClass:"el-dialog__title"},[e._v(e._s(e.title))])]),e.showClose?r("button",{staticClass:"el-dialog__headerbtn",attrs:{type:"button","aria-label":"Close"},on:{click:e.handleClose}},[r("i",{staticClass:"el-dialog__close el-icon el-icon-close"})]):e._e()],2),e.rendered?r("div",{staticClass:"el-dialog__body"},[e._t("default")],2):e._e(),e.$slots.footer?r("div",{staticClass:"el-dialog__footer"},[e._t("footer")],2):e._e()])])])},n=[];t._withStripped=!0;var s=o(13),c=o.n(s),h=o(11),u=o.n(h),g=o(4),v=o.n(g),m={name:"ElDialog",mixins:[c.a,v.a,u.a],props:{title:{type:String,default:""},modal:{type:Boolean,default:!0},modalAppendToBody:{type:Boolean,default:!0},appendToBody:{type:Boolean,default:!1},lockScroll:{type:Boolean,default:!0},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},width:String,fullscreen:Boolean,customClass:{type:String,default:""},top:{type:String,default:"15vh"},beforeClose:Function,center:{type:Boolean,default:!1},destroyOnClose:Boolean},data:function(){return{closed:!1,key:0}},watch:{visible:function(l){var r=this;l?(this.closed=!1,this.$emit("open"),this.$el.addEventListener("scroll",this.updatePopper),this.$nextTick(function(){r.$refs.dialog.scrollTop=0}),this.appendToBody&&document.body.appendChild(this.$el)):(this.$el.removeEventListener("scroll",this.updatePopper),this.closed||this.$emit("close"),this.destroyOnClose&&this.$nextTick(function(){r.key++}))}},computed:{style:function(){var l={};return this.fullscreen||(l.marginTop=this.top,this.width&&(l.width=this.width)),l}},methods:{getMigratingConfig:function(){return{props:{size:"size is removed."}}},handleWrapperClick:function(){this.closeOnClickModal&&this.handleClose()},handleClose:function(){typeof this.beforeClose=="function"?this.beforeClose(this.hide):this.hide()},hide:function(l){l!==!1&&(this.$emit("update:visible",!1),this.$emit("close"),this.closed=!0)},updatePopper:function(){this.broadcast("ElSelectDropdown","updatePopper"),this.broadcast("ElDropdownMenu","updatePopper")},afterEnter:function(){this.$emit("opened")},afterLeave:function(){this.$emit("closed")}},mounted:function(){this.visible&&(this.rendered=!0,this.open(),this.appendToBody&&document.body.appendChild(this.$el))},destroyed:function(){this.appendToBody&&this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)}},i=m,f=o(0),y=Object(f.a)(i,t,n,!1,null,null,null);y.options.__file="packages/dialog/src/component.vue";var p=y.exports;p.install=function(e){e.component(p.name,p)},a.default=p}})})(C);var O=C.exports;const P=E(O);export{P as _};
