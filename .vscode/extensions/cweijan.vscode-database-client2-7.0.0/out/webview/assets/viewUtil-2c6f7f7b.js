import{s as T}from"./pinia-8e23f54c.js";var d={exports:{}};(function(r){function p(s,t){for(var i=s.toString();i.length<t;)i="0"+i;return i}function o(s){return p(s,2)}function v(s){var t=Math.abs(s),i=String(Math.floor(t/60)),f=String(t%60);return i.length===1&&(i="0"+i),f.length===1&&(f="0"+f),s<0?"+"+i+f:"-"+i+f}function y(s,t){typeof s!="string"&&(t=s,s=r.exports.ISO8601_FORMAT),t||(t=r.exports.now());var i=o(t.getDate()),f=o(t.getMonth()+1),g=o(t.getFullYear()),M=o(g.substring(2,4)),c=s.indexOf("yyyy")>-1?g:M,S=o(t.getHours()),x=o(t.getMinutes()),u=o(t.getSeconds()),n=p(t.getMilliseconds(),3),e=v(t.getTimezoneOffset()),h=s.replace(/dd/g,i).replace(/MM/g,f).replace(/y{1,4}/g,c).replace(/hh/g,S).replace(/mm/g,x).replace(/ss/g,u).replace(/SSS/g,n).replace(/O/g,e);return h}function a(s,t,i,f){s["set"+(f?"":"UTC")+t](i)}function l(s,t,i){var f=s.indexOf("O")<0,g=[{pattern:/y{1,4}/,regexp:"\\d{1,4}",fn:function(n,e){a(n,"FullYear",e,f)}},{pattern:/MM/,regexp:"\\d{1,2}",fn:function(n,e){a(n,"Month",e-1,f)}},{pattern:/dd/,regexp:"\\d{1,2}",fn:function(n,e){a(n,"Date",e,f)}},{pattern:/hh/,regexp:"\\d{1,2}",fn:function(n,e){a(n,"Hours",e,f)}},{pattern:/mm/,regexp:"\\d\\d",fn:function(n,e){a(n,"Minutes",e,f)}},{pattern:/ss/,regexp:"\\d\\d",fn:function(n,e){a(n,"Seconds",e,f)}},{pattern:/SSS/,regexp:"\\d\\d\\d",fn:function(n,e){a(n,"Milliseconds",e,f)}},{pattern:/O/,regexp:"[+-]\\d{3,4}|Z",fn:function(n,e){e==="Z"&&(e=0);var h=Math.abs(e),F=(e>0?-1:1)*(h%100+Math.floor(h/100)*60);n.setUTCMinutes(n.getUTCMinutes()+F)}}],M=g.reduce(function(n,e){return e.pattern.test(n.regexp)?(e.index=n.regexp.match(e.pattern).index,n.regexp=n.regexp.replace(e.pattern,"("+e.regexp+")")):e.index=-1,n},{regexp:s,index:[]}),c=g.filter(function(n){return n.index>-1});c.sort(function(n,e){return n.index-e.index});var S=new RegExp(M.regexp),x=S.exec(t);if(x){var u=i||r.exports.now();return c.forEach(function(n,e){n.fn(u,x[e+1])}),u}throw new Error("String '"+t+"' could not be parsed as '"+s+"'")}function w(s,t,i){if(!s)throw new Error("pattern must be supplied");return l(s,t,i)}function E(){return new Date}r.exports=y,r.exports.asString=y,r.exports.parse=w,r.exports.now=E,r.exports.ISO8601_FORMAT="yyyy-MM-ddThh:mm:ss.SSS",r.exports.ISO8601_WITH_TZ_OFFSET_FORMAT="yyyy-MM-ddThh:mm:ss.SSSO",r.exports.DATETIME_FORMAT="dd MM yyyy hh:mm:ss.SSS",r.exports.ABSOLUTETIME_FORMAT="hh:mm:ss.SSS"})(d);var b=d.exports;const O=T(b);function I(r){return r?O("yyyy-MM-dd hh:mm:ss",r):""}function m(r){return r?O.parse("yyyy-MM-dd hh:mm:ss",r):null}function A(r){return typeof r=="string"&&(r=parseInt(r)),r>1e3?r<6e4?`${r/1e3|0}s${r%1e3}ms`:`${r/6e4|0}m${r%6e4/1e3}s`:`${r}ms`}function _(r){var p;return!(!r||(p=r==null?void 0:r.match)!=null&&p.call(r,/(NO|0|false)/i))}function R(r){return r==null?r=0:typeof r!="number"&&(r=parseInt(r),isNaN(r)&&(r=0)),r}export{A as b,I as f,_ as i,m as p,R as t};
