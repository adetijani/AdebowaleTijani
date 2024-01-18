import{c as v}from"./g2-61c6964f.js";import{A as d}from"./arrayUtil-3fccf556.js";import{n as c,i as u}from"./pinia-1732013c.js";import{u as o}from"./umy-table.common-ee18cfe8.js";import"./viewUtil-3542060f.js";import"./index-5e9fb3e8.js";import"./index-f37b6d04.js";import"./index-3e66c890.js";const h={props:["variableList"],data(){return{variableMap:{},infos:[{name:"Port",value:"report_port"},{name:"Version",value:"version"},{name:"Slow Query Log",value:"slow_query_log"},{name:"Performance Schema",value:"performance_schema"},{name:"Base Directory",value:"basedir"},{name:"Data Directory",value:"datadir"}]}},watch:{variableList(){this.variableMap=d.arrayToObj(this.variableList.rows,i=>i.Variable_name,"Value")}},methods:{getValue(i){return this.variableMap[i]}}};var m=function(){var s=this,e=s._self._c;return e("div",{staticClass:"pl-4"},[e("div",{staticClass:"mb-2"},[s._v(" Server Infos: ")]),e("div",{staticClass:"flex flex-col gap-y-1"},s._l(s.infos,function(a){return e("div",{key:a.name,staticClass:"flex gap-x-2 flex-wrap shrink-0"},[e("div",{staticClass:"var-name"},[s._v(s._s(a.name)+":")]),e("div",{staticClass:"select-all"},[s._v(s._s(s.getValue(a.value)))])])}),0)])},_=[],f=c(h,m,_,!1,null,"b25f2d91",null,null);const p=f.exports;const b={name:"Status",components:{UxGrid:o.UxGrid,UxTableColumn:o.UxTableColumn,MySQLBasic:p},mixins:[u],data(){return{info:{},activePanel:"processList",process:{fields:[],rows:[]},variableList:{fields:[],rows:[]},statusList:{fields:[],rows:[]},dashBoard:{sessions:{data:[],lock:!1,chart:null,previous:null},queries:{data:[],lock:!1,chart:null,previous:null},traffic:{data:[],lock:!1,chart:null,previous:null}}}},mounted(){function i(e,a){const t=new v.Chart({container:e,autoFit:!0,height:300});return t.data(a),t.line().position("now*value").color("type").size(2),t.render(),t}function s(e,a,t,r){const l=JSON.parse(JSON.stringify(t));if(a.previous||(a.previous=l),a.data.push(...t),r&&r(t,a.previous),a.previous=l,!a.chart)a.chart=i(e,a.data);else{if(a.data.length>=t.length*60)for(let n=0;n<t.length;n++)a.data.shift();a.chart.changeData(a.data)}a.lock=!1}this.on("info",e=>{this.info=e,this.activePanel=["MariaDB","MySQL"].includes(this.info.dbType)?"dashBoard":"processList"}).on("processList",e=>{this.process=e}).on("variableList",e=>{this.variableList=e}).on("statusList",e=>{this.statusList=e}).on("dashBoard",e=>{s("sessions",this.dashBoard.sessions,e.sessions),s("queries",this.dashBoard.queries,e.queries,(a,t)=>{for(let r=0;r<t.length;r++)a[r].value=a[r].value-t[r].value}),s("traffic",this.dashBoard.traffic,e.traffic,(a,t)=>{for(let r=0;r<t.length;r++)a[r].value=(a[r].value-t[r].value)/1e3+"kb"})}).init(),this.emit("processList").emit("variableList").emit("statusList"),this.sendLoadDashBoard(),setInterval(()=>{this.sendLoadDashBoard()},1e3)},methods:{remainHeight(){return window.outerHeight-150},sendLoadDashBoard(){this.dashBoard.sessions.lock||(this.dashBoard.sessions.lock=!0,this.emit("dashBoard"))},changePannel(){switch(this.activePanel){case"processList":this.emit("processList");break;case"variableList":this.emit("variableList");break;case"statusList":this.emit("statusList");break;case"dashBoard":this.sendLoadDashBoard();break}}}};var L=function(){var s=this,e=s._self._c;return e("div",{staticClass:"status-container"},[e("ul",{staticClass:"tab"},[e("li",{staticClass:"tab__item",class:{"tab__item--active":s.activePanel=="dashBoard"},on:{click:function(a){s.activePanel="dashBoard",s.sendLoadDashBoard()}}},[s._v("Dashboard")]),e("li",{staticClass:"tab__item",class:{"tab__item--active":s.activePanel=="processList"},on:{click:function(a){s.activePanel="processList",s.emit("processList")}}},[s._v("ProcessList")]),e("li",{staticClass:"tab__item",class:{"tab__item--active":s.activePanel=="variableList"},on:{click:function(a){s.activePanel="variableList",s.emit("variableList")}}},[s._v("VariableList")]),e("li",{staticClass:"tab__item",class:{"tab__item--active":s.activePanel=="statusList"},on:{click:function(a){s.activePanel="statusList",s.emit("statusList")}}},[s._v("StatusList")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:["MariaDB","MySQL"].includes(s.info.dbType)&&s.activePanel=="dashBoard",expression:"['MariaDB', 'MySQL'].includes(info.dbType) && activePanel=='dashBoard'"}]},[e("div",{staticClass:"flex flex-row",staticStyle:{height:"45vh","margin-top":"10px"}},[e("div",{staticClass:"basis-1/3"},[e("MySQLBasic",{attrs:{variableList:s.variableList}})],1),s._m(0)]),s._m(1)]),e("div",{directives:[{name:"show",rawName:"v-show",value:s.activePanel=="processList",expression:"activePanel=='processList'"}]},[e("ux-grid",{staticStyle:{width:"100%"},attrs:{data:s.process.rows,size:"small","cell-style":{height:"35px"},height:s.remainHeight()}},s._l(s.process.fields,function(a,t){return e("ux-table-column",{key:t,attrs:{field:a.name,title:a.name,align:"center","show-overflow-tooltip":"true"}})}),1)],1),e("div",{directives:[{name:"show",rawName:"v-show",value:s.info.dbType!="SqlServer"&&s.activePanel=="variableList",expression:"info.dbType!='SqlServer' && activePanel=='variableList'"}]},[e("ux-grid",{staticStyle:{width:"100%"},attrs:{data:s.variableList.rows,size:"small","cell-style":{height:"35px"},height:s.remainHeight()}},s._l(s.variableList.fields,function(a,t){return e("ux-table-column",{key:t,attrs:{field:a.name,title:a.name,align:"center","show-overflow-tooltip":"true"}})}),1)],1),e("div",{directives:[{name:"show",rawName:"v-show",value:s.info.dbType!="SqlServer"&&s.activePanel=="statusList",expression:"info.dbType!='SqlServer' && activePanel=='statusList'"}]},[e("ux-grid",{staticStyle:{width:"100%"},attrs:{data:s.statusList.rows,size:"small","cell-style":{height:"35px"},height:s.remainHeight()}},s._l(s.statusList.fields,function(a,t){return e("ux-table-column",{key:t,attrs:{field:a.name,title:a.name,align:"center","show-overflow-tooltip":"true"}})}),1)],1)])},w=[function(){var i=this,s=i._self._c;return s("div",{staticClass:"basis-2/3"},[s("span",{staticClass:"select-none"},[i._v("Queries:")]),s("div",{attrs:{id:"queries"}})])},function(){var i=this,s=i._self._c;return s("div",{staticClass:"flex flex-row"},[s("div",{staticClass:"basis-1/2"},[s("span",{staticClass:"select-none"},[i._v("Traffic:")]),s("div",{attrs:{id:"traffic"}})]),s("div",{staticClass:"basis-1/2"},[s("span",{staticClass:"select-none"},[i._v("Server Sessions:")]),s("div",{attrs:{id:"sessions"}})])])}],y=c(b,L,w,!1,null,null,null,null);const M=y.exports;export{M as default};
