(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{71:function(e,t,a){e.exports=a(84)},76:function(e,t,a){},77:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(22),i=a.n(l),r=(a(76),a(77),a(13)),o=a(121),u=a(127),s=a(117),d=c.a.memo((function(e){var t=Object(n.useState)(""),a=Object(r.a)(t,2),l=a[0],i=a[1],d=Object(n.useState)(null),b=Object(r.a)(d,2),m=b[0],O=b[1],f=function(){""!==l.trim()?(e.addItem(l.trim()),i("")):O("Title is required")};return c.a.createElement("div",null,c.a.createElement(o.a,{id:"outlined-basic",label:m?"":"Enter new task",variant:"outlined",value:l,onChange:function(e){i(e.currentTarget.value)},onKeyPress:function(e){null!==m&&O(null),13===e.charCode&&f()},size:"small",error:!!m}),c.a.createElement(u.a,{variant:"contained",color:"success",style:{height:"39px",borderRadius:"0px"},onClick:f},c.a.createElement(s.a,null)),m&&c.a.createElement("div",{className:"error-message"},m))})),b=function(e){var t=Object(n.useState)(!1),a=Object(r.a)(t,2),l=a[0],i=a[1],o=Object(n.useState)(""),u=Object(r.a)(o,2),s=u[0],d=u[1],b=function(){i(!1),e.onChange(s)};return l?c.a.createElement("input",{onKeyPress:function(e){13===e.charCode&&b()},value:s,onBlur:b,onChange:function(e){d(e.currentTarget.value)},autoFocus:!0}):c.a.createElement("span",{onDoubleClick:function(){i(!0),d(e.title)}},e.title)},m=a(128),O=a(118),f=c.a.memo((function(e){var t=e.onChangeTitleCallback,a=e.changeTaskStatusCallback,l=e.removeTaskCallback,i=e.task,r=i.id,o=i.isDone,u=i.title,s=Object(n.useCallback)((function(){return l(r)}),[l,r]),d=Object(n.useCallback)((function(e){var t=e.currentTarget.checked;a(t,r)}),[a,r]),f=Object(n.useCallback)((function(e){t(u,r)}),[t,r]);return c.a.createElement("div",{className:o?"is-done":""},c.a.createElement("input",{type:"checkbox",onChange:d,checked:o}),c.a.createElement(b,{title:u,onChange:f}),c.a.createElement(m.a,{size:"small",onClick:s},c.a.createElement(O.a,{color:"error"})))})),T=c.a.memo((function(e){console.log("Todolist");var t=e.id,a=e.title,l=e.tasks,i=e.removeTask,r=e.changeTodoFilter,o=e.addTask,s=e.changeTaskStatus,T=e.removeTodolist,E=e.filter,k=e.onChangeTaskTitle,j=e.onChangeTodoListTitle,C=Object(n.useCallback)((function(){return T(t)}),[T,t]),v=Object(n.useCallback)((function(){return r("all",t)}),[r,t]),h=Object(n.useCallback)((function(){return r("active",t)}),[r,t]),p=Object(n.useCallback)((function(){return r("completed",t)}),[r,t]),g=Object(n.useCallback)((function(e){o(e,t)}),[o,t]),I=Object(n.useCallback)((function(e){j(e,t)}),[j,t]),D=l;"active"===E&&(D=l.filter((function(e){return!e.isDone}))),"completed"===E&&(D=l.filter((function(e){return e.isDone})));var S=Object(n.useCallback)((function(e){return i(e,t)}),[i,t]),A=Object(n.useCallback)((function(e,a){return k(e,a,t)}),[k,t]),y=Object(n.useCallback)((function(e,a){return s(a,e,t)}),[s,t]);return c.a.createElement("div",null,c.a.createElement("h3",null,c.a.createElement(b,{title:a,onChange:I}),c.a.createElement(m.a,{size:"small",onClick:C},c.a.createElement(O.a,{color:"warning"}))),c.a.createElement(d,{addItem:g}),c.a.createElement("ul",null,D.map((function(e){return c.a.createElement("li",null,c.a.createElement(f,{key:e.id,task:e,removeTaskCallback:S,onChangeTitleCallback:A,changeTaskStatusCallback:y}))}))),c.a.createElement("div",null,c.a.createElement(u.a,{color:"success",size:"small",variant:"all"===E?"contained":"outlined",onClick:v},"All"),c.a.createElement(u.a,{color:"warning",size:"small",variant:"active"===E?"contained":"outlined",onClick:h},"Active"),c.a.createElement(u.a,{size:"small",variant:"completed"===E?"contained":"outlined",onClick:p},"Completed")))})),E=a(129),k=a(130),j=a(131),C=a(132),v=a(125),h=a(126),p=a(119),g=a(14),I=a(4),D=a(16),S=a(123),A={},y=[],L=a(30),w=c.a.memo((function(){var e=Object(L.b)(),t=Object(L.c)((function(e){return e.todoLists})),a=Object(L.c)((function(e){return e.tasks})),l=Object(n.useCallback)((function(t,a,n){e(function(e,t,a){return{type:"ONCHANGE-TITLE",title:e,todolistId:t,idTask:a}}(t,a,n))}),[e]),i=Object(n.useCallback)((function(t,a){e(function(e,t){return{type:"REMOVE-TASKS",id:e,todolistId:t}}(t,a))}),[e]),r=Object(n.useCallback)((function(t,a){e(function(e,t){return{type:"ADD-TASK",title:e,todolistId:t}}(t,a))}),[e]),o=Object(n.useCallback)((function(t,a,n){e(function(e,t,a){return{type:"CHANGE-STATUS",id:e,isDone:t,todolistId:a}}(t,a,n))}),[e]),s=Object(n.useCallback)((function(t){var a=function(e){return{type:"ADD-TODO-LIST",title:e,newId:Object(S.a)()}}(t);e(a)}),[e]),b=Object(n.useCallback)((function(t,a){e(function(e,t){return{type:"CHANGE-TODO-FILTER",valueFilter:e,todolistId:t}}(t,a))}),[e]),O=Object(n.useCallback)((function(t){var a=function(e){return{type:"REMOVE-TODOLIST",id:e}}(t);e(a)}),[e]),f=Object(n.useCallback)((function(t,a){e(function(e,t){return{type:"ONCHANGE-TODOLIST-TITLE",title:e,id:t}}(t,a))}),[e]);return c.a.createElement("div",{className:"App"},c.a.createElement(E.a,{position:"static"},c.a.createElement(k.a,null,c.a.createElement(m.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2}},c.a.createElement(p.a,null)),c.a.createElement(j.a,{variant:"h6",component:"div",sx:{flexGrow:1}},"News"),c.a.createElement(u.a,{color:"inherit"},"Login"))),c.a.createElement(C.a,{fixed:!0,style:{marginTop:"10px"}},c.a.createElement(v.a,{container:!0},c.a.createElement(d,{addItem:s}))),c.a.createElement(C.a,{fixed:!0},c.a.createElement(v.a,{container:!0,spacing:3},t.map((function(e){var t=a[e.id];return c.a.createElement(v.a,{item:!0},c.a.createElement(h.a,{style:{padding:"20px",marginTop:"40px"}},c.a.createElement(T,{key:e.id,id:e.id,title:e.title,tasks:t,removeTask:i,changeTodoFilter:b,addTask:r,changeTaskStatus:o,filter:e.filter,removeTodolist:O,onChangeTaskTitle:l,onChangeTodoListTitle:f})))})))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var N=a(50),x=Object(N.a)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASKS":return Object(D.a)(Object(D.a)({},e),{},Object(I.a)({},t.todolistId,e[t.todolistId].filter((function(e){return e.id!==t.id}))));case"ADD-TASK":return Object(D.a)(Object(D.a)({},e),{},Object(I.a)({},t.todolistId,[{id:Object(S.a)(),title:t.title,isDone:!1}].concat(Object(g.a)(e[t.todolistId]))));case"ADD-TODO-LIST":return Object(D.a)(Object(D.a)({},e),{},Object(I.a)({},t.newId,[]));case"ONCHANGE-TITLE":return Object(D.a)(Object(D.a)({},e),{},Object(I.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.idTask?Object(D.a)(Object(D.a)({},e),{},{title:t.title}):e}))));case"CHANGE-STATUS":return Object(D.a)(Object(D.a)({},e),{},Object(I.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.id?Object(D.a)(Object(D.a)({},e),{},{isDone:t.isDone}):e}))));case"REMOVE-TODOLIST":var a=Object(D.a)({},e);return delete a[t.id],a;default:return e}},todoLists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE-TODO-FILTER":return e.map((function(e){return e.id===t.todolistId?Object(D.a)(Object(D.a)({},e),{},{filter:t.valueFilter}):e}));case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"ONCHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(D.a)(Object(D.a)({},e),{},{title:t.title}):e}));case"ADD-TODO-LIST":return[{id:t.newId,title:t.title,filter:"all"}].concat(Object(g.a)(e));default:return e}}}),G=Object(N.b)(x);i.a.render(c.a.createElement(L.a,{store:G},c.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[71,1,2]]]);
//# sourceMappingURL=main.895c5874.chunk.js.map