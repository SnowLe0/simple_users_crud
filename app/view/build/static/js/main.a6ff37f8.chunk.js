(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{137:function(e,t,n){},167:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(13),r=n.n(c),l=(n(137),n(52)),i=n(47),s=n(78),o=n(32),j=n(201),d=n(204),u=n(206),b=n(207),f=n(208),h=n(209),m=n(210),O=n(211),p=n(212),x=n(216),g=n(213),y=n(93),v=n(16),C=n(214),D=n(215),E=n(6),w=Object(j.a)({wrapper:{margin:"20px 0"},table:{minWidth:650},remove:{cursor:"pointer",fontWeight:"bold",fontSize:"1.2rem","&:hover":{color:"#f00"}},edit:{cursor:"pointer",fontWeight:"bold",fontSize:"1.2rem","&:hover":{color:"#0f0"}},editRow:{background:"#efffe0"},sendBtn:{cursor:"pointer",fontWeight:"bold",fontSize:"1.2rem","&:hover":{background:"#e0ffc4"}}});function S(){var e=w(),t=Object(a.useState)([]),n=Object(o.a)(t,2),c=n[0],r=n[1],j=Object(a.useState)(null),S=Object(o.a)(j,2),H=S[0],M=S[1],N=Object(a.useState)(!1),k=Object(o.a)(N,2),z=k[0],R=k[1],T=Object(a.useState)(new Date("2018-01-01 00:00:00")),_=Object(o.a)(T,2),A=_[0],B=_[1],J=Object(a.useState)(new Date),L=Object(o.a)(J,2),W=L[0],F=L[1],V=Object(a.useState)({offset:0,limit:10,afterDate:A,beforeDate:W}),I=Object(o.a)(V,2),P=I[0],U=I[1],X=Object(a.useRef)([]),q=Object(a.useRef)(0),G=Object(a.useRef)(null),K=Object(a.useRef)(null),Q=Object(a.useRef)(null);function Y(e){var t=+e.target.parentElement.parentElement.cells[0].innerHTML;fetch("http://localhost:8080/users/".concat(t),{method:"DELETE",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){r(c.filter((function(e){return+e.id!==t}))),alert(e)}))}function Z(e){for(var t=e.target.parentElement.parentElement.cells,n={},a=0;a<t.length-2;a++)n[X.current[a]]=t[a].innerHTML;M(n)}return Object(a.useEffect)((function(){fetch("http://localhost:8080/users?offset=".concat(P.offset,"&limit=").concat(P.limit,"&filter[afterDate]=").concat(Object(D.a)(P.afterDate,"yyyy-MM-dd HH:mm:ss"),"&filter[beforeDate]=").concat(Object(D.a)(P.beforeDate,"yyyy-MM-dd HH:mm:ss"))+(P.name?"&filter[name]=".concat(P.name):"")).then((function(e){return e.json()})).then((function(e){X.current=["id","username","first_name","last_name","email","gender","created","modified","delete","edit"],q.current=e.count,r(e.data)}))}),[P]),Object(E.jsxs)(E.Fragment,{children:[Object(E.jsxs)(d.a,{className:e.wrapper,component:u.a,children:[Object(E.jsxs)(b.a,{className:e.table,children:[Object(E.jsx)(f.a,{children:Object(E.jsx)(h.a,{children:X.current.map((function(e,t){return Object(E.jsx)(m.a,{align:"center",children:e},t)}))})}),Object(E.jsx)(O.a,{children:c.map((function(t){return Object(E.jsxs)(h.a,{children:[Object(E.jsx)(m.a,{component:"th",scope:"row",align:"center",children:t.id}),Object(E.jsx)(m.a,{align:"center",children:t.username}),Object(E.jsx)(m.a,{align:"center",children:t.first_name}),Object(E.jsx)(m.a,{align:"center",children:t.last_name}),Object(E.jsx)(m.a,{align:"center",children:t.email}),Object(E.jsx)(m.a,{align:"center",children:t.gender}),Object(E.jsx)(m.a,{align:"center",children:t.created}),Object(E.jsx)(m.a,{align:"center",children:t.modified}),Object(E.jsx)(m.a,{align:"center",children:Object(E.jsx)("span",{className:e.remove,onClick:Y,children:"X"})}),Object(E.jsx)(m.a,{align:"center",children:Object(E.jsx)("span",{className:e.edit,onClick:Z,children:"E"})})]},t.id)}))})]}),Object(E.jsxs)(p.a,{style:{float:"right",margin:"0 20px"},variant:"button",children:["Count: ",q.current]}),H?Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)(p.a,{variant:"h6",align:"center",children:"Edit"}),Object(E.jsxs)(b.a,{size:"small",children:[Object(E.jsx)(f.a,{children:Object(E.jsx)(h.a,{children:X.current.slice(0,-2).map((function(e,t){return Object(E.jsx)(m.a,{align:"center",children:e},t)}))})}),Object(E.jsx)(O.a,{children:Object(E.jsxs)(h.a,{className:e.editRow,children:[Object.values(H).map((function(e,t){return Object(E.jsx)(m.a,{align:"center",children:0===t||6===t||7===t?e:Object(E.jsx)("input",{type:"text",name:"input",value:e,onChange:function(e){return M(Object(i.a)(Object(i.a)({},H),{},Object(l.a)({},X.current[t],e.target.value)))}})},t)})),Object(E.jsx)(m.a,{align:"center",className:e.sendBtn,onClick:function(e){for(var t=Object(s.a)(c),n=0;n<t.length;n++)if(t[n].id===H.id){t[n]=H;break}fetch("http://localhost:8080/users/".concat(H.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(H)}).then((function(e){return e.json()})).then((function(e){e.error?alert(e.error):(r(t),M(null),alert(e))}))},children:"Send"})]})})]})]}):null]}),Object(E.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",margin:"20px 0"},children:[Object(E.jsx)(x.a,{size:"small",label:"Name",defaultValue:P.name,ref:Q}),Object(E.jsxs)(v.a,{utils:y.a,children:[Object(E.jsx)(C.a,{variant:"inline",ampm:!1,label:"After Date",value:A,onChange:B,onError:console.log,format:"yyyy-MM-dd HH:mm:ss"}),Object(E.jsx)(C.a,{variant:"inline",ampm:!1,label:"Before Date",value:W,onChange:F,onError:console.log,format:"yyyy-MM-dd HH:mm:ss"})]}),Object(E.jsx)(x.a,{size:"small",type:"number",label:"Offset",defaultValue:P.offset,ref:G}),Object(E.jsx)(x.a,{size:"small",type:"number",label:"Limit",defaultValue:P.limit,ref:K}),Object(E.jsx)(g.a,{variant:"contained",onClick:function(e){return U({offset:+G.current.lastChild.lastChild.value,limit:+K.current.lastChild.lastChild.value,name:Q.current.lastChild.lastChild.value,afterDate:A,beforeDate:W})},children:"Apply Filters"})]}),Object(E.jsx)(g.a,{onClick:function(e){return R(!z)},variant:"contained",children:"New User"}),z?Object(E.jsxs)(b.a,{size:"small",children:[Object(E.jsx)(f.a,{children:Object(E.jsx)(h.a,{children:X.current.slice(1,-4).map((function(e,t,n){return Object(E.jsx)(m.a,{align:"center",children:e},t)}))})}),Object(E.jsx)(O.a,{children:Object(E.jsxs)(h.a,{className:e.editRow,children:[X.current.slice(1,-4).map((function(e,t){return Object(E.jsx)(m.a,{align:"center",children:Object(E.jsx)("input",{type:"text",name:"input"})},t)})),Object(E.jsx)(m.a,{align:"center",className:e.sendBtn,onClick:function(e){var t={},n=["username","first_name","last_name","email","gender"];Array.prototype.forEach.call(Array.prototype.slice.call(e.target.parentElement.cells,0,-1),(function(e,a){return t[n[a]]=e.lastChild.value}));var a=Object(D.a)(new Date,"yyyy-MM-dd HH:mm:ss");fetch("http://localhost:8080/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){e.error?alert(e.error):(R(!1),r([].concat(Object(s.a)(c),[Object(i.a)(Object(i.a)({},t),{},{id:e,created:a,modified:a})])),alert(e))}))},children:"ADD"})]})})]}):null]})}r.a.render(Object(E.jsx)(S,{}),document.getElementById("root"))}},[[167,1,2]]]);
//# sourceMappingURL=main.a6ff37f8.chunk.js.map