(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{SKMG:function(t,e,o){"use strict";o.d(e,"a",(function(){return b}));var r=o("EM62"),n=o("2kYt"),c=o("Rjd2"),a=o("Meci");function i(t,e){if(1&t&&(r.Vb(0,"mat-card",3),r.Vb(1,"mat-card-header"),r.Vb(2,"div",4),r.Qb(3,"img",5),r.Ub(),r.Vb(4,"mat-card-title"),r.Fc(5),r.Ub(),r.Vb(6,"mat-card-subtitle"),r.Fc(7),r.Ub(),r.Ub(),r.Qb(8,"div",6),r.Ub()),2&t){const t=r.gc();r.Db(3),r.mc("src",t.user.photoURL,r.wc),r.Db(2),r.Ic("",t.user.firstName," ",t.user.lastName,""),r.Db(2),r.Gc(t.user.email)}}const s=[[["","header",""]],[["","activities-label",""]],[["","activities",""]],[["","logout-btn",""]]],l=["[header]","[activities-label]","[activities]","[logout-btn]"];let b=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Jb({type:t,selectors:[["csl-dashboard-home"]],inputs:{user:"user"},ngContentSelectors:l,decls:10,vars:1,consts:[[1,"header"],["class","user",4,"ngIf"],[1,"logout-btn"],[1,"user"],["mat-card-avatar",""],[1,"profileimg",3,"src"],[1,"shadow"]],template:function(t,e){1&t&&(r.lc(s),r.Vb(0,"div"),r.Vb(1,"h1",0),r.kc(2),r.Ub(),r.Dc(3,i,9,4,"mat-card",1),r.Vb(4,"h1",0),r.kc(5,1),r.Ub(),r.Vb(6,"csl-alert"),r.kc(7,2),r.Ub(),r.Vb(8,"div",2),r.kc(9,3),r.Ub(),r.Ub()),2&t&&(r.Db(3),r.mc("ngIf",e.user))},directives:[n.m,c.a,a.a,a.e,a.c,a.h,a.g],styles:[".profileimg[_ngcontent-%COMP%]{height:100%;border-radius:50px}.header[_ngcontent-%COMP%]{font-weight:500}.user[_ngcontent-%COMP%]{margin-bottom:20px;overflow:hidden}.shadow[_ngcontent-%COMP%]{background:linear-gradient(270deg,#fafafa,hsla(0,0%,98%,.4)) 100%;position:absolute;height:100%;width:10px;right:0;top:0}.logout-btn[_ngcontent-%COMP%]{margin-top:20px}"]}),t})()},TDBs:function(t,e,o){"use strict";o.r(e),o.d(e,"DashboardModule",(function(){return jt}));var r=o("2kYt"),n=o("sEIs"),c=o("EM62"),a=o("3DyK");let i=(()=>{class t{constructor(){this.links=[{link:".",title:"Home"},{link:"coge",title:"Cogestione"},{link:"orders",title:"Ordini"},{link:"checkout",title:"Pagamenti"}]}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["app-dashboard"]],decls:3,vars:1,consts:[[3,"links"]],template:function(t,e){1&t&&(c.Vb(0,"csl-dashboard-model",0),c.Vb(1,"span"),c.Fc(2,"Dashboard"),c.Ub(),c.Ub()),2&t&&c.mc("links",e.links)},directives:[a.a],styles:[""]}),t})();var s=o("9ufM"),l=o("jxfh"),b=o("SKMG"),u=o("PBFl");const d=function(){return["..","qp-admin"]};function m(t,e){1&t&&(c.Vb(0,"a",8),c.Fc(1,"Quinto Piano"),c.Ub()),2&t&&c.mc("routerLink",c.oc(1,d))}const p=function(){return["..","referente"]};function f(t,e){1&t&&(c.Vb(0,"a",8),c.Fc(1,"Commissione"),c.Ub()),2&t&&c.mc("routerLink",c.oc(1,p))}const h=function(){return["..","rappre"]};function g(t,e){1&t&&(c.Vb(0,"a",8),c.Fc(1,"attivit\xe0 della scuola"),c.Ub()),2&t&&c.mc("routerLink",c.oc(1,h))}function D(t,e){1&t&&c.Qb(0,"span")}function C(t,e){if(1&t){const t=c.Wb();c.Vb(0,"csl-dashboard-home",1),c.Vb(1,"span",2),c.Fc(2,"I tuoi dati"),c.Ub(),c.Vb(3,"span",3),c.Fc(4,"Le tue attivit\xe0"),c.Ub(),c.Vb(5,"span",4),c.Vb(6,"span"),c.Fc(7," Gestisci "),c.Dc(8,m,2,2,"a",5),c.Ub(),c.Qb(9,"br"),c.Vb(10,"span"),c.Fc(11," Gestisci la tua "),c.Dc(12,f,2,2,"a",5),c.Ub(),c.Qb(13,"br"),c.Vb(14,"span"),c.Fc(15," Gestisci le "),c.Dc(16,g,2,2,"a",5),c.Ub(),c.Qb(17,"br"),c.Dc(18,D,1,0,"span",6),c.Ub(),c.Vb(19,"button",7),c.cc("click",(function(){return c.uc(t),c.gc().signOut()})),c.Fc(20,"Esci"),c.Ub(),c.Ub()}if(2&t){const t=e.ngIf;c.mc("user",t),c.Db(8),c.mc("ngIf",t.isQp),c.Db(4),c.mc("ngIf",t.isReferente),c.Db(4),c.mc("ngIf",t.isRappre),c.Db(2),c.mc("ngIf",!t.isRappre&&!t.isReferente&&!t.isQp)}}let w=(()=>{class t{constructor(t,e){this.auth=t,this.dialog=e}ngOnInit(){}signOut(){this.dialog.open({title:"Sei sicuro di voler uscire?",text:"Ci\xf2 che stavi facendo potrebbe non essere salvato",color:"warn",answer:"S\xec, esci"}).subscribe((t=>{this.auth.signOut()}))}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(s.a),c.Pb(l.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-profile"]],decls:2,vars:3,consts:[[3,"user",4,"ngIf"],[3,"user"],["header",""],["activities-label",""],["activities",""],["class","link",3,"routerLink",4,"ngIf"],[4,"ngIf"],["mat-raised-button","","color","warn","logout-btn","",3,"click"],[1,"link",3,"routerLink"]],template:function(t,e){1&t&&(c.Dc(0,C,21,5,"csl-dashboard-home",0),c.hc(1,"async")),2&t&&c.mc("ngIf",c.ic(1,1,e.auth.user$))},directives:[r.m,b.a,u.b,n.i],pipes:[r.b],styles:[".link[_ngcontent-%COMP%]{text-decoration:none;color:#0d47a1;font-weight:500;line-height:26px}"]}),t})();var y=o("Meci");const v=function(){return["gadgets"]},U=function(){return["photos"]};let V=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["csl-category"]],decls:13,vars:4,consts:[[1,"container"],["accent","primary",3,"routerLink"],["src","../../../../assets/svg/gadgets.svg"],["src","../../../../assets/svg/photos.svg"]],template:function(t,e){1&t&&(c.Vb(0,"div",0),c.Vb(1,"mat-card",1),c.Vb(2,"mat-card-header"),c.Vb(3,"mat-card-title"),c.Fc(4,"Gadget"),c.Ub(),c.Ub(),c.Vb(5,"mat-card-content"),c.Qb(6,"img",2),c.Ub(),c.Ub(),c.Vb(7,"mat-card",1),c.Vb(8,"mat-card-header"),c.Vb(9,"mat-card-title"),c.Fc(10,"Foto"),c.Ub(),c.Ub(),c.Vb(11,"mat-card-content"),c.Qb(12,"img",3),c.Ub(),c.Ub(),c.Ub()),2&t&&(c.Db(1),c.mc("routerLink",c.oc(2,v)),c.Db(6),c.mc("routerLink",c.oc(3,U)))},directives:[y.a,n.g,y.e,y.h,y.d],styles:[".container[_ngcontent-%COMP%]{display:flex;justify-content:space-around;flex-wrap:wrap}mat-card[_ngcontent-%COMP%]{cursor:pointer;outline:none;max-width:550px;margin-bottom:50px}img[_ngcontent-%COMP%]{width:100%;height:100%}mat-card-content[_ngcontent-%COMP%]{padding:2.5%}mat-card-header[_ngcontent-%COMP%]{padding-top:10px;padding-bottom:10px}"]}),t})();var F=o("Aeau"),x=o("FlRo");let P=(()=>{class t{transform(t,...e){switch(t){case"gadgets":return"dei gadget";case"photos":return"delle foto"}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=c.Ob({name:"category",type:t,pure:!0}),t})(),O=(()=>{class t{transform(t,...e){return t.replace(/-/g," ").toLowerCase().split(" ").map((t=>t.charAt(0).toUpperCase()+t.substring(1))).join(" ")}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=c.Ob({name:"productName",type:t,pure:!0}),t})();function k(t,e){1&t&&(c.Vb(0,"th",11),c.Fc(1,"Nome"),c.Ub())}function S(t,e){if(1&t&&(c.Vb(0,"td",12),c.Fc(1),c.hc(2,"productName"),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Gc(c.ic(2,1,t.id))}}function I(t,e){1&t&&(c.Vb(0,"th",11),c.Fc(1,"Quantit\xe0"),c.Ub())}function M(t,e){if(1&t&&(c.Vb(0,"td",12),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Gc(t.quantity)}}function _(t,e){1&t&&(c.Vb(0,"th",11),c.Fc(1,"Taglia"),c.Ub())}function Q(t,e){if(1&t&&(c.Vb(0,"td",12),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Gc(t.size)}}function E(t,e){1&t&&(c.Vb(0,"th",11),c.Fc(1,"Colore"),c.Ub())}const R=function(t){return{"background-color":t}};function j(t,e){if(1&t&&(c.Vb(0,"td",12),c.Qb(1,"span",13),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.mc("ngStyle",c.pc(1,R,t.color))}}function T(t,e){1&t&&c.Qb(0,"tr",14)}function G(t,e){1&t&&c.Qb(0,"tr",15)}function L(t,e){if(1&t){const t=c.Wb();c.Tb(0),c.Vb(1,"button",16),c.cc("click",(function(){return c.uc(t),c.gc().confirmOrder()})),c.Fc(2," Conferma ordine "),c.Ub(),c.Sb()}}function q(t,e){1&t&&(c.Vb(0,"p"),c.Fc(1,"Hai gi\xe0 confermato questo ordine!"),c.Ub())}let N=(()=>{class t{constructor(t,e,o,r){this.activated=t,this.dialog=e,this.toastr=o,this.orders=r}ngOnInit(){this.activated.paramMap.subscribe((t=>{this.category=t.get("category"),this.displayedColumns="gadgets"===this.category?["name","quantity","size","color"]:["name","quantity"]})),this.orders[this.category]||this.orders.getOrders()}deleteOrder(t){this.dialog.open({title:"Sei sicuro di voler eliminare questo prodotto dal tuo carrello?",text:"Potrai comunque riordinarlo in seguito",color:"warn",answer:"Conferma"}).subscribe((e=>{this.orders.deleteProduct(t).subscribe((t=>{let{err:e,success:o}=t;!1===o&&"Your order has already been confirmed"===e?this.toastr.show({message:"Ordine gi\xe0 confermato",color:"accent",action:"Chiudi",duration:5e3}):!1===o?this.toastr.showError():this.toastr.show({message:"Ordine cancellato",color:"accent",action:"Chiudi",duration:5e3})}))}))}confirmOrder(){this.dialog.open({title:"Sei sicuro di voler confermare il tuo ordine?",text:"Se confermi, non potrai pi\xf9 effettuare modifiche",color:"primary",answer:"Conferma"}).subscribe((t=>{this.orders.confirmOrder(this.category).subscribe((t=>{let{success:e}=t;!0===e?this.toastr.show({message:"Ordine confermato",color:"success",action:"Chiudi",duration:5e3}):!1===e&&this.toastr.showError(),this.orders.getOrders()}))}))}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(n.a),c.Pb(l.a),c.Pb(l.b),c.Pb(F.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-orders"]],decls:25,vars:8,consts:[["mat-table","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","quantity"],["matColumnDef","size"],["matColumnDef","color"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[4,"ngIf","ngIfElse"],["alreadyConfirmed",""],["mat-header-cell",""],["mat-cell",""],[3,"ngStyle"],["mat-header-row",""],["mat-row",""],["mat-raised-button","","color","primary","size","small",3,"click"]],template:function(t,e){if(1&t&&(c.Vb(0,"mat-card"),c.Vb(1,"mat-card-header"),c.Vb(2,"mat-card-title"),c.Fc(3),c.hc(4,"category"),c.Ub(),c.Ub(),c.Vb(5,"mat-card-content"),c.Vb(6,"table",0),c.Tb(7,1),c.Dc(8,k,2,0,"th",2),c.Dc(9,S,3,3,"td",3),c.Sb(),c.Tb(10,4),c.Dc(11,I,2,0,"th",2),c.Dc(12,M,2,1,"td",3),c.Sb(),c.Tb(13,5),c.Dc(14,_,2,0,"th",2),c.Dc(15,Q,2,1,"td",3),c.Sb(),c.Tb(16,6),c.Dc(17,E,2,0,"th",2),c.Dc(18,j,2,3,"td",3),c.Sb(),c.Dc(19,T,1,0,"tr",7),c.Dc(20,G,1,0,"tr",8),c.Ub(),c.Vb(21,"mat-card-actions"),c.Dc(22,L,3,0,"ng-container",9),c.Dc(23,q,2,0,"ng-template",null,10,c.Ec),c.Ub(),c.Ub(),c.Ub()),2&t){const t=c.sc(24);c.Db(3),c.Hc("Ordini ",c.ic(4,6,e.category),""),c.Db(3),c.mc("dataSource",e.orders[e.category]),c.Db(13),c.mc("matHeaderRowDef",e.displayedColumns),c.Db(1),c.mc("matRowDefColumns",e.displayedColumns),c.Db(2),c.mc("ngIf",!1===e.orders[e.category+"Confirmed"])("ngIfElse",t)}},directives:[y.a,y.e,y.h,y.d,x.j,x.c,x.e,x.b,x.g,x.i,y.b,r.m,x.d,x.a,r.n,x.f,x.h,u.b],pipes:[P,O],styles:["table[_ngcontent-%COMP%]{width:100%}span[_ngcontent-%COMP%]{padding:2px 2px 2px 25px;border-radius:5px}mat-card-actions[_ngcontent-%COMP%]{margin-top:20px;margin-left:15px}"]}),t})();var $=o("D57K"),H=o("AytR"),z="https://js.stripe.com/v3",A=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,J=null,W=function(t,e,o){if(null===t)return null;var r=t.apply(void 0,e);return function(t,e){t&&t._registerWrapper&&t._registerWrapper({name:"stripe-js",version:"1.11.0",startTime:e})}(r,o),r},Y=Promise.resolve().then((function(){return null,null!==J?J:J=new Promise((function(t,e){if("undefined"!=typeof window)if(window,window.Stripe)t(window.Stripe);else try{var o=function(){for(var t=document.querySelectorAll('script[src^="'.concat(z,'"]')),e=0;e<t.length;e++){var o=t[e];if(A.test(o.src))return o}return null}();o||(o=function(t){var e=document.createElement("script");e.src="".concat(z).concat("");var o=document.head||document.body;if(!o)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return o.appendChild(e),e}()),o.addEventListener("load",(function(){window.Stripe?t(window.Stripe):e(new Error("Stripe.js not available"))})),o.addEventListener("error",(function(){e(new Error("Failed to load Stripe.js"))}))}catch(r){return void e(r)}else t(null)}))})),K=!1;Y.catch((function(t){K||console.warn(t)}));var B=o("nIj0"),Z=o("csyo");function X(t,e){1&t&&c.Qb(0,"mat-spinner",5)}function tt(t,e){1&t&&(c.Vb(0,"span"),c.Fc(1,"Completa il pagamento"),c.Ub())}function et(t,e){if(1&t){const t=c.Wb();c.Tb(0),c.Vb(1,"div"),c.Vb(2,"h4"),c.Fc(3),c.hc(4,"category"),c.hc(5,"currency"),c.Ub(),c.Vb(6,"form"),c.Qb(7,"mat-card",1),c.Vb(8,"button",2),c.cc("click",(function(){return c.uc(t),c.gc().payWithCard()})),c.Dc(9,X,1,0,"mat-spinner",3),c.Dc(10,tt,2,0,"span",0),c.Ub(),c.Qb(11,"p",4),c.Ub(),c.Ub(),c.Sb()}if(2&t){const t=c.gc();c.Db(3),c.Jc(" Ciao! Qui puoi pagare l'ordine ",c.ic(4,6,t.category)," della ",t.classID,", che ammonta a ",c.jc(5,8,t.total,"EUR")," "),c.Db(5),c.mc("disabled",t.loading||t.btnDisabled),c.Db(1),c.mc("ngIf",t.loading),c.Db(1),c.mc("ngIf",!t.loading)}}function ot(t,e){1&t&&(c.Vb(0,"h4"),c.Fc(1," Non tutti i tuoi compagni hanno ancora confermato l'ordine! "),c.Ub())}function rt(t,e){1&t&&(c.Vb(0,"h4"),c.Fc(1,"Questo ordine \xe8 gi\xe0 stato pagato!"),c.Ub())}function nt(t,e){if(1&t&&(c.Tb(0),c.Dc(1,ot,2,0,"h4",0),c.Dc(2,rt,2,0,"h4",0),c.Sb()),2&t){const t=c.gc();c.Db(1),c.mc("ngIf",!1===t.isConfirmed),c.Db(1),c.mc("ngIf",!0===t.isPaid)}}let ct=(()=>{class t{constructor(t,e,o,r){this.orders=t,this.activated=e,this.toastr=o,this.dialog=r,this.isConfirmed=!0,this.isPaid=!1,this.loading=!1,this.category=this.activated.snapshot.paramMap.get("category")}ngOnInit(){return Object($.__awaiter)(this,void 0,void 0,(function*(){this.stripe=yield function(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];K=!0;var r=Date.now();return Y.then((function(t){return W(t,e,r)}))}(H.b),this.orders.createPaymentIntent(this.category).subscribe((t=>{!1===t.success&&"no-orders"===t.err&&this.toastr.show({message:"Ordini non trovati!",color:"warn",action:"Chiudi",duration:5e3}),!0===t.success?this.setupPaymentForm(t,this.stripe):!1===t.data.isConfirmed?this.isConfirmed=!1:this.isPaid=!0}))}))}setupPaymentForm(t,e){const{total:o,clientSecret:r,classID:n}=t.data;this.total=o,this.classID=n,this.clientSecret=r;const c=e.elements();this.card=c.create("card",{style:{base:{color:"#32325d",fontFamily:"Arial, sans-serif",fontSmoothing:"antialiased",fontSize:"16px","::placeholder":{color:"#32325d"}},invalid:{fontFamily:"Arial, sans-serif",color:"#fa755a",iconColor:"#fa755a"}}}),this.card.mount("#card-element"),this.card.on("change",(t=>{this.btnDisabled=t.empty,document.querySelector("#card-errors").textContent=t.error?t.error.message:""}))}payWithCard(){this.dialog.open({title:"Confermi?",text:"Stai per completare il pagamento per la tua classe",answer:"S\xec, conferma pagamento",color:"primary"}).subscribe((t=>{this.loading=!0,this.stripe.confirmCardPayment(this.clientSecret,{payment_method:{card:this.card}}).then((t=>{t.error?this.showError(t.error.message):this.paymentCompleted()}))}))}paymentCompleted(){this.loading=!1,this.btnDisabled=!0,this.toastr.show({message:"Pagamento completato con successo, puoi tornare alla home",color:"success"})}showError(t){this.loading=!1,this.toastr.show({message:t,color:"warn",duration:1e4})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(F.a),c.Pb(n.a),c.Pb(l.b),c.Pb(l.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-checkout"]],decls:2,vars:2,consts:[[4,"ngIf"],["id","card-element"],["mat-raised-button","","color","primary","type","button",3,"disabled","click"],["color","primary",4,"ngIf"],["id","card-errors","role","alert"],["color","primary"]],template:function(t,e){1&t&&(c.Dc(0,et,12,11,"ng-container",0),c.Dc(1,nt,3,2,"ng-container",0)),2&t&&(c.mc("ngIf",!0===e.isConfirmed&&!1===e.isPaid),c.Db(1),c.mc("ngIf",!1===e.isConfirmed||!0===e.isPaid))},directives:[r.m,B.v,B.p,B.q,y.a,u.b,Z.b],pipes:[P,r.d],styles:["h4[_ngcontent-%COMP%]{font-weight:500;font-size:16px}mat-card[_ngcontent-%COMP%]{width:40%}button[_ngcontent-%COMP%]{margin-top:20px}input[_ngcontent-%COMP%]{border-radius:6px;margin-bottom:6px;padding:12px;border:1px solid rgba(50,50,93,.1);height:44px;font-size:16px;width:100%;background:#fff}#card-error[_ngcontent-%COMP%]{color:#697386;text-align:left;font-size:13px;line-height:17px;margin-top:12px}"]}),t})();var at=o("vobO");let it=(()=>{class t{constructor(t){this.http=t}createCourse(t){return this.http.post("/api/coge/courses",{course:t})}getCourses(){return this.http.get("/api/coge/courses")}}return t.\u0275fac=function(e){return new(e||t)(c.Zb(at.b))},t.\u0275prov=c.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var st=o("YtkY"),lt=o("bFHC");let bt=(()=>{class t{transform(t,...e){switch(t){case"WAITING":return{label:"In attesa",icon:"schedule",color:"accent"};case"APPROVED":return{label:"Approvato",icon:"done",color:"primary"};case"DECLINED":return{label:"Rifiutato",icon:"clear",color:"warn"}}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=c.Ob({name:"courseStatus",type:t,pure:!0}),t})();function ut(t,e){1&t&&(c.Vb(0,"th",13),c.Fc(1,"Titolo"),c.Ub())}function dt(t,e){if(1&t&&(c.Vb(0,"td",14),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Gc(t.title)}}function mt(t,e){1&t&&(c.Vb(0,"th",13),c.Fc(1,"Descrizione"),c.Ub())}function pt(t,e){if(1&t&&(c.Vb(0,"td",14),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Gc(t.description)}}function ft(t,e){1&t&&(c.Vb(0,"th",13),c.Fc(1,"Durata"),c.Ub())}function ht(t,e){if(1&t&&(c.Vb(0,"td",14),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Gc(t.duration)}}function gt(t,e){1&t&&(c.Vb(0,"th",13),c.Fc(1,"Fasce richieste"),c.Ub())}function Dt(t,e){if(1&t&&(c.Vb(0,"td",14),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Gc(t.slots.join(", "))}}function Ct(t,e){1&t&&(c.Vb(0,"th",13),c.Fc(1,"Relatori"),c.Ub())}function wt(t,e){if(1&t&&(c.Vb(0,"td",14),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Hc(" ",t.speakers.join(", ")," ")}}function yt(t,e){1&t&&(c.Vb(0,"th",13),c.Fc(1,"Stato"),c.Ub())}function vt(t,e){if(1&t&&(c.Vb(0,"td",14),c.Vb(1,"mat-icon",15),c.hc(2,"courseStatus"),c.Fc(3),c.hc(4,"courseStatus"),c.Ub(),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.nc("color",c.ic(2,2,t.status).color),c.Db(2),c.Gc(c.ic(4,4,t.status).icon)}}function Ut(t,e){1&t&&c.Qb(0,"tr",16)}function Vt(t,e){1&t&&c.Qb(0,"tr",17)}const Ft=function(){return["create"]};let xt=(()=>{class t{constructor(t){this.coge=t,this.displayedColumns=["title","description","duration","slots","speakers","status"]}ngOnInit(){this.courses$=this.coge.getCourses().pipe(Object(st.a)((t=>t.data)))}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(it))},t.\u0275cmp=c.Jb({type:t,selectors:[["csl-coge"]],decls:30,vars:7,consts:[["mat-table","",3,"dataSource"],["matColumnDef","title"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","description"],["matColumnDef","duration"],["matColumnDef","slots"],["matColumnDef","speakers"],["matColumnDef","status"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[1,"actions"],["mat-raised-button","","color","primary",3,"routerLink"],["mat-header-cell",""],["mat-cell",""],[3,"color"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(c.Vb(0,"mat-card"),c.Vb(1,"mat-card-header"),c.Vb(2,"mat-card-title"),c.Fc(3,"Corsi di cui sei proprietario"),c.Ub(),c.Ub(),c.Vb(4,"mat-card-content"),c.Vb(5,"table",0),c.hc(6,"async"),c.Tb(7,1),c.Dc(8,ut,2,0,"th",2),c.Dc(9,dt,2,1,"td",3),c.Sb(),c.Tb(10,4),c.Dc(11,mt,2,0,"th",2),c.Dc(12,pt,2,1,"td",3),c.Sb(),c.Tb(13,5),c.Dc(14,ft,2,0,"th",2),c.Dc(15,ht,2,1,"td",3),c.Sb(),c.Tb(16,6),c.Dc(17,gt,2,0,"th",2),c.Dc(18,Dt,2,1,"td",3),c.Sb(),c.Tb(19,7),c.Dc(20,Ct,2,0,"th",2),c.Dc(21,wt,2,1,"td",3),c.Sb(),c.Tb(22,8),c.Dc(23,yt,2,0,"th",2),c.Dc(24,vt,5,6,"td",3),c.Sb(),c.Dc(25,Ut,1,0,"tr",9),c.Dc(26,Vt,1,0,"tr",10),c.Ub(),c.Vb(27,"mat-card-actions",11),c.Vb(28,"a",12),c.Fc(29," Nuovo corso "),c.Ub(),c.Ub(),c.Ub(),c.Ub()),2&t&&(c.Db(5),c.mc("dataSource",c.ic(6,4,e.courses$)),c.Db(20),c.mc("matHeaderRowDef",e.displayedColumns),c.Db(1),c.mc("matRowDefColumns",e.displayedColumns),c.Db(2),c.mc("routerLink",c.oc(6,Ft)))},directives:[y.a,y.e,y.h,y.d,x.j,x.c,x.e,x.b,x.g,x.i,y.b,u.a,n.i,x.d,x.a,lt.a,x.f,x.h],pipes:[r.b,bt],styles:["table[_ngcontent-%COMP%]{width:100%}.actions[_ngcontent-%COMP%]{margin-left:20px;margin-top:10px}"]}),t})();var Pt=o("Rjd2"),Ot=o("29Wa"),kt=o("Cd2c"),St=o("R7+U"),It=o("mFH5"),Mt=o("+Tre");function _t(t,e){if(1&t){const t=c.Wb();c.Tb(0),c.Vb(1,"mat-checkbox",12),c.cc("change",(function(o){c.uc(t);const r=e.$implicit;return c.gc().checkboxChange(o,r)})),c.Fc(2),c.Ub(),c.Sb()}if(2&t){const t=e.$implicit;c.Db(2),c.Hc(" ",t," ")}}const Qt=[{path:"",component:i,children:[{path:"",component:w},{path:"coge",component:xt},{path:"coge/create",component:(()=>{class t{constructor(t,e,o,r,n){this._fb=t,this.coge=e,this.toastr=o,this.router=r,this.dialog=n,this.courseForm=this._fb.group({title:["",B.u.required],description:["",B.u.required],notes:[""],duration:["",B.u.required],slots:[[],B.u.required],speakers:[""]}),this.availableSlots=["A","B","C","D","E"]}ngOnInit(){}onSubmit(){this.dialog.open({title:"Creare il corso?",text:"Dopo aver confermato, non potrai pi\xf9 modificarlo",color:"primary",answer:"S\xec, crea"}).subscribe((()=>{this.coge.createCourse(this.courseForm.value).subscribe((t=>{!0===t.success?(this.toastr.show({color:"success",message:"Corso creato con successo"}),this.router.navigate(["..","dashboard","coge"])):this.toastr.showError()}))}))}checkboxChange(t,e){const o=this.courseForm.value.slots;if(!0===t.checked)o.push(e),o.sort();else if(!1===t.checked){const t=o.findIndex((t=>t===e));o.splice(t,1)}this.courseForm.patchValue({slots:o})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(B.d),c.Pb(it),c.Pb(l.b),c.Pb(n.f),c.Pb(l.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["csl-create-course"]],decls:34,vars:5,consts:[["color","primary",1,"alert"],[1,"form",3,"formGroup","ngSubmit"],[1,"input"],["matInput","","type","text","formControlName","title"],["matInput","","formControlName","description"],[1,"break"],["matInput","","formControlName","notes"],["formControlName","duration"],[3,"value"],[1,"checkboxes-label"],[4,"ngFor","ngForOf"],["mat-raised-button","","color","primary",1,"submit",3,"disabled"],["color","primary",1,"checkbox",3,"change"]],template:function(t,e){1&t&&(c.Vb(0,"csl-alert",0),c.Fc(1," Leggi attentamente il regolamento e le linee guida riguardanti la Cogestione prima di proporre un corso!\n"),c.Ub(),c.Vb(2,"form",1),c.cc("ngSubmit",(function(){return e.onSubmit()})),c.Vb(3,"h1"),c.Fc(4,"Informazioni principali"),c.Ub(),c.Vb(5,"mat-form-field",2),c.Vb(6,"mat-label"),c.Fc(7,"Titolo del corso"),c.Ub(),c.Qb(8,"input",3),c.Ub(),c.Vb(9,"mat-form-field",2),c.Vb(10,"mat-label"),c.Fc(11,"Descrizione del corso"),c.Ub(),c.Qb(12,"textarea",4),c.Ub(),c.Qb(13,"div",5),c.Vb(14,"h1"),c.Fc(15,"Dettagli"),c.Ub(),c.Vb(16,"mat-form-field",2),c.Vb(17,"mat-label"),c.Fc(18,"Note"),c.Ub(),c.Qb(19,"textarea",6),c.Ub(),c.Vb(20,"mat-form-field",2),c.Vb(21,"mat-label"),c.Fc(22,"Durata"),c.Ub(),c.Vb(23,"mat-select",7),c.Vb(24,"mat-option",8),c.Fc(25,"1 Fascia"),c.Ub(),c.Vb(26,"mat-option",8),c.Fc(27,"2 Fasce"),c.Ub(),c.Ub(),c.Ub(),c.Vb(28,"mat-label",9),c.Fc(29,"Fasce preferite"),c.Ub(),c.Dc(30,_t,3,1,"ng-container",10),c.Qb(31,"div",5),c.Vb(32,"button",11),c.Fc(33," Crea corso "),c.Ub(),c.Ub()),2&t&&(c.Db(2),c.mc("formGroup",e.courseForm),c.Db(22),c.mc("value",1),c.Db(2),c.mc("value",2),c.Db(4),c.mc("ngForOf",e.availableSlots),c.Db(2),c.mc("disabled",e.courseForm.invalid))},directives:[Pt.a,B.v,B.p,B.i,Ot.b,Ot.f,kt.a,B.b,B.o,B.g,St.a,It.i,r.l,u.b,Mt.a],styles:["h1[_ngcontent-%COMP%]{font-weight:500;flex:100%}.form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:baseline;margin-top:20px}.break[_ngcontent-%COMP%]{flex-basis:100%;height:0}.input[_ngcontent-%COMP%]{margin-right:20px;flex:1}.checkboxes-label[_ngcontent-%COMP%]{margin-right:20px;color:rgba(0,0,0,.6)}.checkbox[_ngcontent-%COMP%]{margin-right:10px}.submit[_ngcontent-%COMP%]{margin-top:10px}"]}),t})()},{path:"orders/:category",component:N},{path:"checkout/:category",component:ct},{path:":action",component:V}]}];let Et=(()=>{class t{}return t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({factory:function(e){return new(e||t)},imports:[[n.j.forChild(Qt)],n.j]}),t})();var Rt=o("vrzs");let jt=(()=>{class t{}return t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({factory:function(e){return new(e||t)},imports:[[r.c,Et,B.k,B.s,l.c,Rt.a]]}),t})()}}]);