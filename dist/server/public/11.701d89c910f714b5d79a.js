(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"7nYX":function(t,n,e){"use strict";e.r(n),e.d(n,"ViceModule",(function(){return k}));var c=e("2kYt"),s=e("sEIs"),o=e("EM62"),i=e("3DyK");let a=(()=>{class t{constructor(){this.links=[{link:".",title:"Home"},{link:"upload",title:"Accounts"},{link:"classi",title:"Classi"},{link:"coge",title:"Cogestione"}]}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Jb({type:t,selectors:[["app-vice"]],decls:3,vars:1,consts:[[3,"links"]],template:function(t,n){1&t&&(o.Vb(0,"csl-dashboard-model",0),o.Vb(1,"span"),o.Fc(2,"Vice"),o.Ub(),o.Ub()),2&t&&o.mc("links",n.links)},directives:[i.a],styles:[""]}),t})();var r=e("Rjd2");let l=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Jb({type:t,selectors:[["app-coge"]],decls:2,vars:0,consts:[["color","accent"]],template:function(t,n){1&t&&(o.Vb(0,"csl-alert",0),o.Fc(1," Questa sezione non \xe8 ancora pronta! Torni pi\xf9 tardi...\n"),o.Ub())},directives:[r.a],styles:[""]}),t})();var u=e("jxfh"),p=e("9ufM"),b=e("SKMG"),d=e("PBFl");let h=(()=>{class t{constructor(t,n){this.dialog=t,this.auth=n}ngOnInit(){}signOut(){this.dialog.open({title:"Sei sicuro di voler uscire?",text:"Ci\xf2 che stavi facendo potrebbe non essere salvato",color:"warn",answer:"S\xec, esci"}).subscribe((t=>{this.auth.signOut()}))}}return t.\u0275fac=function(n){return new(n||t)(o.Pb(u.a),o.Pb(p.a))},t.\u0275cmp=o.Jb({type:t,selectors:[["app-vice-home"]],decls:10,vars:3,consts:[[3,"user"],["header",""],["activities-label",""],["activities",""],["mat-raised-button","","color","warn","logout-btn","",3,"click"]],template:function(t,n){1&t&&(o.Vb(0,"csl-dashboard-home",0),o.hc(1,"async"),o.Vb(2,"span",1),o.Fc(3,"I suoi dati"),o.Ub(),o.Vb(4,"span",2),o.Fc(5,"Le sue attivit\xe0"),o.Ub(),o.Vb(6,"span",3),o.Fc(7,"Questa sezione \xe8 ancora vuota! Torni pi\xf9 tardi..."),o.Ub(),o.Vb(8,"button",4),o.cc("click",(function(){return n.signOut()})),o.Fc(9,"Esci"),o.Ub(),o.Ub()),2&t&&o.mc("user",o.ic(1,1,n.auth.user$))},directives:[b.a,d.b],pipes:[c.b],styles:[".profileimg[_ngcontent-%COMP%]{height:100%;border-radius:50px}h1[_ngcontent-%COMP%]{font-weight:500}mat-card[_ngcontent-%COMP%]{margin-bottom:20px}button[_ngcontent-%COMP%]{margin-top:20px}"]}),t})();var m=e("r8jD"),f=e("8BM3");const g=[{path:"",component:a,children:[{path:"",component:h},{path:"upload",component:e("zlwK").a},{path:"classi",component:m.a},{path:"classi/:classID",component:f.a},{path:"coge",component:l}]}];let v=(()=>{class t{}return t.\u0275mod=o.Nb({type:t}),t.\u0275inj=o.Mb({factory:function(n){return new(n||t)},imports:[[s.j.forChild(g)],s.j]}),t})();var w=e("PCNd");let k=(()=>{class t{}return t.\u0275mod=o.Nb({type:t}),t.\u0275inj=o.Mb({factory:function(n){return new(n||t)},imports:[[c.c,v,w.a,u.c]]}),t})()}}]);