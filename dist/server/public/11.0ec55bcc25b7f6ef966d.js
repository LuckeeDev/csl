(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{kFBH:function(t,e,n){"use strict";n.r(e),n.d(e,"ReferenteModule",(function(){return f}));var s=n("2kYt"),i=n("sEIs"),c=n("9ufM"),o=n("YtkY"),r=n("EM62"),a=n("3DyK");let u=(()=>{class t{constructor(t){this.auth=t,this.links=[{title:"Home",link:"."},{title:"Gestisci pagina",link:"editor"}]}ngOnInit(){this.commissione$=this.auth.user$.pipe(Object(o.a)((t=>t.isReferente)))}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(c.a))},t.\u0275cmp=r.Jb({type:t,selectors:[["csl-referente"]],decls:4,vars:4,consts:[[3,"links"]],template:function(t,e){1&t&&(r.Vb(0,"csl-dashboard-model",0),r.Vb(1,"span"),r.Fc(2),r.hc(3,"async"),r.Ub(),r.Ub()),2&t&&(r.mc("links",e.links),r.Db(2),r.Hc("Referente di ",r.ic(3,2,e.commissione$),""))},directives:[a.a],pipes:[s.b],styles:[""]}),t})();var l=n("jxfh"),b=n("SKMG"),p=n("PBFl");const d=[{path:"",component:u,children:[{path:"",component:(()=>{class t{constructor(t,e){this.auth=t,this.dialog=e}ngOnInit(){}signOut(){this.dialog.open({title:"Sei sicuro di voler uscire?",text:"Ci\xf2 che stavi facendo potrebbe non essere salvato",color:"warn",answer:"S\xec, esci"}).subscribe((()=>{this.auth.signOut()}))}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(c.a),r.Pb(l.a))},t.\u0275cmp=r.Jb({type:t,selectors:[["csl-referente-home"]],decls:10,vars:3,consts:[[3,"user"],["header",""],["activities-label",""],["activities",""],["mat-raised-button","","color","warn","logout-btn","",3,"click"]],template:function(t,e){1&t&&(r.Vb(0,"csl-dashboard-home",0),r.hc(1,"async"),r.Vb(2,"span",1),r.Fc(3,"I tuoi dati"),r.Ub(),r.Vb(4,"span",2),r.Fc(5,"Le tue attivit\xe0"),r.Ub(),r.Vb(6,"span",3),r.Fc(7,"Questa sezione \xe8 ancora vuota! Tornate pi\xf9 tardi..."),r.Ub(),r.Vb(8,"button",4),r.cc("click",(function(){return e.signOut()})),r.Fc(9,"Esci"),r.Ub(),r.Ub()),2&t&&r.mc("user",r.ic(1,1,e.auth.user$))},directives:[b.a,p.b],pipes:[s.b],styles:[".profileimg[_ngcontent-%COMP%]{height:100%;border-radius:50px}h1[_ngcontent-%COMP%]{font-weight:500}mat-card[_ngcontent-%COMP%]{margin-bottom:20px}button[_ngcontent-%COMP%]{margin-top:20px}"]}),t})()},{path:"editor",component:n("CAI7").a}]}];let h=(()=>{class t{}return t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({factory:function(e){return new(e||t)},imports:[[i.j.forChild(d)],i.j]}),t})();var m=n("PCNd");let f=(()=>{class t{}return t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({factory:function(e){return new(e||t)},imports:[[h,s.c,l.c,m.a]]}),t})()}}]);