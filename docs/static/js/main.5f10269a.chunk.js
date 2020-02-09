(this["webpackJsonpislands-problem"]=this["webpackJsonpislands-problem"]||[]).push([[0],{64:function(e,t,n){e.exports=n(78)},69:function(e,t,n){},70:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(10),o=n.n(i),c=(n(69),n(6)),l=(n(70),n(103)),s=n(116),u=n(106),d=n(115),f=n(109),h=Object(l.a)((function(e){return{dimensionsConatiner:{display:"inline-flex",flexDirection:"row",alignItems:"center"},crossSign:{fontSize:"1.5em",margin:"0 .5em"}}})),m=function(e){var t=e.setBoardDim,n=h(),i=Object(a.useState)(8),o=Object(c.a)(i,2),l=o[0],m=o[1],p=Object(a.useState)(8),b=Object(c.a)(p,2),g=b[0],v=b[1];return r.a.createElement("form",null,r.a.createElement(s.a,{mb:2},r.a.createElement(u.a,null,"Please enter bitmap size:")),r.a.createElement("div",{className:n.dimensionsConatiner},r.a.createElement(d.a,{label:"Width",variant:"filled",type:"number",defaultValue:8,onChange:function(e){return m(parseInt(e.target.value))}}),r.a.createElement("div",{className:n.crossSign},"\xd7"),r.a.createElement(d.a,{label:"Height",variant:"filled",type:"number",defaultValue:8,onChange:function(e){return v(parseInt(e.target.value))}})),r.a.createElement(s.a,{m:3},r.a.createElement(f.a,{variant:"contained",color:"primary",onClick:function(e){t({width:l,height:g})}},"Choose")))},p=n(12),b=n(18),g=n.n(b),v=n(110),w=n(26),x=n(2),j=n(53),E=n(108),y=n(40),O=Object(l.a)((function(e){return{gridContainer:{display:"flex",justifyContent:"center"},islandPaperContainer:{display:"flex",alignItems:"center",justifyContent:"center"},islandPaper:{display:"inline-block",fontFamily:"Jetbrains Mono",height:"32px",width:"32px",lineHeight:"32px",textAlign:"center",fontSize:"16px",background:"red"}}})),k=function(e){return Object(a.forwardRef)((function(t,n){var a=t.style,i=Object(x.a)(t,["style"]);return r.a.createElement("div",Object.assign({ref:n,style:Object(w.a)({},a,{paddingLeft:8,paddingTop:8,height:"".concat(parseFloat(a.height)+e,"px")})},i))}))},C=function(e){var t=e.boardDim,n=e.data,a=e.toggleCell,i=e.width,o=e.height,c=e.paddingBottom,l=O();return r.a.createElement("div",{className:l.gridContainer},r.a.createElement(y.a,{columnCount:t.width,rowCount:t.height,columnWidth:48,rowHeight:48,height:o,width:i,innerElementType:k(c)},(function(e){var t=e.columnIndex,i=e.rowIndex,o=e.style,c=n[i][t];return r.a.createElement(j.a,{focusRipple:!0,className:l.islandPaperContainer,key:"".concat(t,",").concat(i),onClick:function(e){return a(i,t)},style:Object(w.a)({},o,{left:o.left+8,top:o.top+8,width:o.width-8,height:o.height-8})},r.a.createElement(E.a,{className:l.islandPaper,style:{backgroundColor:0===c?"#b3e5fc":"#9a472d",color:0===c?"#000":"#fff",transition:"background-color .2s ease"},elevation:2},c))})))},S=n(111),M=n(112),B=n(113);function F(){var e="object"===typeof window;function t(){return{width:e?window.innerWidth:0,height:e?window.innerHeight:0}}var n=Object(a.useState)(t),r=Object(c.a)(n,2),i=r[0],o=r[1];return Object(a.useEffect)((function(){if(e)return window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)};function n(){o(t())}}),[]),i}var I=Object(l.a)((function(e){return{controllersConatiner:{position:"fixed",bottom:0,left:0,width:"100%",backdropFilter:"blur(7px)",backgroundColor:"rgba(255, 255, 255, .5)",padding:"10px 0"}}})),N=function(e){var t=e.boardDim,n=e.setBoardData,i=e.goHome,o=e.fullScreenMode,l=e.setFullScreenMode,u=I(),d=Object(a.useState)(g.a.range(t.height).map((function(e){return g.a.range(t.width).map((function(e){return 0}))}))),h=Object(c.a)(d,2),m=h[0],b=h[1],w=F();return r.a.createElement("div",null,r.a.createElement(s.a,{mb:2},r.a.createElement(C,{boardDim:t,data:m,toggleCell:function(e,t){b([].concat(Object(p.a)(m.slice(0,e)),[[].concat(Object(p.a)(m[e].slice(0,t)),[1===m[e][t]?0:1],Object(p.a)(m[e].slice(t+1)))],Object(p.a)(m.slice(e+1))))},width:o?w.width:Math.min(48*t.width+20,400),height:o?w.height:Math.min(48*t.height+20,400),paddingBottom:o?80:0})),r.a.createElement(s.a,{mt:2,className:o?u.controllersConatiner:""},r.a.createElement(s.a,{component:"span"},r.a.createElement(v.a,{color:o?"inherit":"primary",onClick:i},r.a.createElement(S.a,null))),(t.width>8||t.height>8)&&r.a.createElement(s.a,{component:"span"},r.a.createElement(v.a,{color:o?"inherit":"primary",onClick:function(e){return l(!o)}},o?r.a.createElement(M.a,null):r.a.createElement(B.a,null))),r.a.createElement(s.a,{component:"span",ml:2},r.a.createElement(f.a,{variant:"contained",onClick:function(e){b(g.a.range(t.height).map((function(e){return g.a.range(t.width).map((function(e){return Math.floor(3*Math.random())>=1?0:1}))})))}},"Randomize")),r.a.createElement(s.a,{component:"span",ml:2},r.a.createElement(f.a,{variant:"contained",color:"primary",onClick:function(e){n(m)}},"Set"))))},z=n(15),D=n.n(z),P=n(22),A=n(39),H=n(24),T=function(){function e(t,n){Object(A.a)(this,e),this.dimensions=void 0,this.data=void 0,this.dimensions=t,this.data=n}return Object(H.a)(e,[{key:"toString",value:function(){return this.data.map((function(e){return e.join(" ")})).join("\n")}},{key:"toArrayString",value:function(){return this.data.map((function(e){return"["+e.join(",")+"]"})).join(",")}},{key:"clone",value:function(){return new e(Object(w.a)({},this.dimensions),this.data.map((function(e){return Object(p.a)(e)})))}},{key:"isInBounds",value:function(e,t){return 0<=t&&t<this.dimensions.width&&0<=e&&e<this.dimensions.height}},{key:"getCell",value:function(e,t){if(!this.isInBounds(e,t))throw new Error("Invalid index (".concat(t,", ").concat(e,") in board with ")+"dimensions ".concat(JSON.stringify(this.dimensions)));return this.data[e][t]}},{key:"setCell",value:function(e,t,n){if(!this.isInBounds(e,t))throw new Error("Invalid index (".concat(t,", ").concat(e,") in board with ")+"dimensions ".concat(JSON.stringify(this.dimensions)));this.data[e][t]=n}},{key:"forEachCell",value:function(e){for(var t=0;t<this.dimensions.height;t++)for(var n=0;n<this.dimensions.width;n++)e(t,n,this.getCell(t,n))}},{key:"asyncForEachCell",value:function(){var e=Object(P.a)(D.a.mark((function e(t){var n,a;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(!(n<this.dimensions.height)){e.next=12;break}a=0;case 3:if(!(a<this.dimensions.width)){e.next=9;break}return e.next=6,t(n,a,this.getCell(n,a));case 6:a++,e.next=3;break;case 9:n++,e.next=1;break;case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),J=function(e){var t=e.setBoard,n=e.fullScreenMode,i=e.setFullScreenMode,o=Object(a.useState)(null),l=Object(c.a)(o,2),s=l[0],u=l[1];return r.a.createElement("div",{className:"App"},null==s&&r.a.createElement(m,{setBoardDim:u}),null!=s&&r.a.createElement(N,{boardDim:s,setBoardData:function(e){if(null!=s){var n=new T(s,e);t(n)}},goHome:function(){u(null),i(!1)},fullScreenMode:n,setFullScreenMode:i}))},W=n(41);function R(){return(R=Object(P.a)(D.a.mark((function e(t,n,a,r){var i,o;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.clone(),o=2,e.next=4,i.asyncForEachCell(function(){var e=Object(P.a)(D.a.mark((function e(t,l,s){var u;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==s){e.next=2;break}return e.abrupt("return");case 2:if(a){e.next=5;break}return e.next=5,r();case 5:if(1!==s){e.next=13;break}if(u=q(i,t,l),0!==u.filter((function(e){var t=Object(c.a)(e,2),n=t[0],a=t[1];return i.getCell(a,n)>1})).length){e.next=13;break}return i.setCell(t,l,o),e.next=12,u.forEach(function(){var e=Object(P.a)(D.a.mark((function e(t){var l,s,u;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l=Object(c.a)(t,2),s=l[0],u=l[1],i.setCell(u,s,o),a){e.next=6;break}return n(i),e.next=6,r();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 12:o++;case 13:if(!(s>1)){e.next=16;break}return e.next=16,q(i,t,l).forEach(function(){var e=Object(P.a)(D.a.mark((function e(t){var o,l,u;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=Object(c.a)(t,2),l=o[0],u=o[1],i.setCell(u,l,s),a){e.next=6;break}return n(i),e.next=6,r();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 16:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}());case 4:return e.next=6,V(i,o-1,a,n,r);case 6:return a&&n(i),e.abrupt("return",Promise.resolve(L(i)));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var L=function(e){var t=new Set;return e.forEachCell((function(e,n,a){a>1&&t.add(a)})),t.size};function V(e,t,n,a,r){return $.apply(this,arguments)}function $(){return($=Object(P.a)(D.a.mark((function e(t,n,a,r,i){var o;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=[new Array,new Array].concat(g.a.range(2,n+1).map((function(e){return new Array}))),t.forEachCell((function(e,t,n){n>1&&o[n].push([e,t])})),e.next=4,t.asyncForEachCell(function(){var e=Object(P.a)(D.a.mark((function e(n,l,s){var u,d,f,h,m,p,b,g,v,w,x,j,E,y,O,k,C,S,M;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==s){e.next=2;break}return e.abrupt("return");case 2:u=q(t,n,l),d=u.map((function(e){var n=Object(c.a)(e,2),a=n[0],r=n[1];return t.getCell(r,a)})),f=!0,h=!1,e.prev=6,p=Object(W.a)(d.filter((function(e){return e!==s})));case 8:return e.next=10,p.next();case 10:return b=e.sent,f=b.done,e.next=14,b.value;case 14:if(g=e.sent,f){e.next=58;break}v=g,w=!0,x=!1,e.prev=19,E=Object(W.a)(o[v]);case 21:return e.next=23,E.next();case 23:return y=e.sent,w=y.done,e.next=27,y.value;case 27:if(O=e.sent,w){e.next=39;break}if(k=O,C=Object(c.a)(k,2),S=C[0],M=C[1],o[s].push([S,M]),t.setCell(S,M,s),a){e.next=36;break}return r(t),e.next=36,i();case 36:w=!0,e.next=21;break;case 39:e.next=45;break;case 41:e.prev=41,e.t0=e.catch(19),x=!0,j=e.t0;case 45:if(e.prev=45,e.prev=46,w||null==E.return){e.next=50;break}return e.next=50,E.return();case 50:if(e.prev=50,!x){e.next=53;break}throw j;case 53:return e.finish(50);case 54:return e.finish(45);case 55:f=!0,e.next=8;break;case 58:e.next=64;break;case 60:e.prev=60,e.t1=e.catch(6),h=!0,m=e.t1;case 64:if(e.prev=64,e.prev=65,f||null==p.return){e.next=69;break}return e.next=69,p.return();case 69:if(e.prev=69,!h){e.next=72;break}throw m;case 72:return e.finish(69);case 73:return e.finish(64);case 74:case"end":return e.stop()}}),e,null,[[6,60,64,74],[19,41,45,55],[46,,50,54],[65,,69,73]])})));return function(t,n,a){return e.apply(this,arguments)}}());case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var q=function(e,t,n){return function(e,t,n){return g.a.range(-1,2).flatMap((function(e){return g.a.range(-1,2).map((function(t){return[t,e]}))})).filter((function(e){var t=Object(c.a)(e,2),n=t[0],a=t[1];return 0!==n||0!==a})).map((function(e){var a=Object(c.a)(e,2),r=a[0],i=a[1];return[n+r,t+i]})).filter((function(t){var n=Object(c.a)(t,2),a=n[0],r=n[1];return 0<=a&&a<e.dimensions.width&&0<=r&&r<e.dimensions.height}))}(e,t,n).filter((function(t){var n=Object(c.a)(t,2),a=n[0],r=n[1];return e.getCell(r,a)>0}))},G=function(e,t,n,a){return R.apply(this,arguments)};var K=Object(l.a)((function(e){return{gridContainer:{display:"flex",justifyContent:"center"},islandPaperContainer:{display:"flex",alignItems:"center",justifyContent:"center"},islandPaper:{display:"inline-block",fontFamily:"Jetbrains Mono",height:"32px",width:"32px",lineHeight:"32px",textAlign:"center",fontSize:"16px",background:"red"}}})),Q=function(e){return Object(a.forwardRef)((function(t,n){var a=t.style,i=Object(x.a)(t,["style"]);return r.a.createElement("div",Object.assign({ref:n,style:Object(w.a)({},a,{paddingLeft:8,paddingTop:8,height:"".concat(parseFloat(a.height)+e,"px")})},i))}))},U=function(e){var t=e.board,n=e.width,i=e.height,o=e.paddingBottom,l=K(),s=Object(a.useState)(["#b3e5fc","#9a472d"]),u=Object(c.a)(s,2),d=u[0],f=u[1],h=function(e){var t=new Set(d);return d.concat(g.a.range(d.length,e+1).map((function(e){return function(){for(var e=function(){return g.a.range(0,3).reduce((function(e,t){return e+"0123456789ABCDEF"[Math.floor(8*Math.random())]+"0123456789ABCDEF"[Math.floor(16*Math.random())]}),"#")},n=e();t.has(n);)n=e();return t.add(n),n}()})))};return r.a.createElement("div",{className:l.gridContainer},r.a.createElement(y.a,{columnCount:t.dimensions.width,rowCount:t.dimensions.height,columnWidth:48,rowHeight:48,height:i,width:n,innerElementType:Q(o)},(function(e){var n=e.columnIndex,a=e.rowIndex,i=e.style,o=t.data[a][n];return o>=d.length&&f(h(o)),r.a.createElement("div",{key:"".concat(n,",").concat(a),className:l.islandPaperContainer,style:Object(w.a)({},i,{left:i.left+8,top:i.top+8,width:i.width-8,height:i.height-8,padding:0,margin:0})},r.a.createElement(E.a,{className:l.islandPaper,style:{backgroundColor:d[o],color:0===o?"#000":"#fff",transition:"background-color .2s ease"},elevation:2},o))})))},X=n(118),Y=Object(l.a)((function(e){return{controllersConatiner:{position:"fixed",bottom:0,left:0,width:"100%",backdropFilter:"blur(7px)",backgroundColor:"rgba(255, 255, 255, .5)",padding:"10px 0"}}})),Z=function(e){var t=e.originalBoard,n=e.goHome,i=e.fullScreenMode,o=e.setFullScreenMode,l=Y(),u=Object(a.useState)([t.clone(),0]),d=Object(c.a)(u,2),h=Object(c.a)(d[0],2),m=h[0],p=h[1],b=d[1],g=Object(a.useState)(null),w=Object(c.a)(g,2),x=w[0],j=w[1],E=Object(a.useState)(!1),y=Object(c.a)(E,2),O=y[0],k=y[1],C=F(),I=Object(a.useRef)(!0);Object(a.useEffect)((function(){return function(){I.current=!1}}),[]);var N=0===x?"There are'nt islands.":1===x?"There is a single island.":"There are ".concat(x," islands.");return r.a.createElement("div",null,r.a.createElement(s.a,{mb:2},r.a.createElement(U,{board:m,width:i?C.width:Math.min(48*t.dimensions.width+20,400),height:i?C.height:Math.min(48*t.dimensions.height+20,400),paddingBottom:i?80:0})),r.a.createElement(s.a,{mt:2,className:i?l.controllersConatiner:""},r.a.createElement(s.a,{component:"span"},r.a.createElement(v.a,{color:i?"inherit":"primary",onClick:n},r.a.createElement(S.a,null))),(t.dimensions.width>8||t.dimensions.height>8)&&r.a.createElement(s.a,{component:"span"},r.a.createElement(v.a,{color:i?"inherit":"primary",onClick:function(e){return o(!i)}},i?r.a.createElement(M.a,null):r.a.createElement(B.a,null))),r.a.createElement(s.a,{component:"span",ml:2},r.a.createElement(f.a,{variant:"contained",color:"primary",onClick:function(){var e=t.dimensions.height*t.dimensions.width>1e3,n=t.dimensions.height*t.dimensions.width>400?1:t.dimensions.height*t.dimensions.width>200?5:t.dimensions.height*t.dimensions.width>100?10:100;G(t,(function(e){I.current&&b([e,(p+1)%4])}),e,(function(){return e=n,new Promise((function(t){return setTimeout(t,e)}));var e})).then((function(e){I.current&&(j(e),k(!0))}))}},"Solve"))),r.a.createElement(X.a,{anchorOrigin:{vertical:"bottom",horizontal:"center"},open:O,onClose:function(e){return k(!1)},message:N,action:r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{color:"secondary",size:"small",onClick:function(e){return k(!1)}},"Ok"))}))},_=(n(77),n(114)),ee=n(50),te=n(49),ne=n.n(te),ae=Object(ee.a)({palette:{primary:ne.a},typography:{fontFamily:"Jetbrains Mono",fontSize:14},overrides:{MuiButton:{root:{textTransform:"capitalize"}}}}),re=function(){var e=Object(a.useState)(null),t=Object(c.a)(e,2),n=t[0],i=t[1],o=Object(a.useState)(!1),l=Object(c.a)(o,2),s=l[0],u=l[1];return r.a.createElement(_.a,{theme:ae},r.a.createElement("div",{className:"App"},null==n&&r.a.createElement(J,{setBoard:i,fullScreenMode:s,setFullScreenMode:u}),null!=n&&r.a.createElement(Z,{originalBoard:n,goHome:function(){i(null),u(!1)},fullScreenMode:s,setFullScreenMode:u})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(re,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[64,1,2]]]);
//# sourceMappingURL=main.5f10269a.chunk.js.map