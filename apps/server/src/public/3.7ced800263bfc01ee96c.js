(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"8BM3":function(e,t,i){"use strict";i.d(t,"a",(function(){return Q}));var c=i("D57K"),o=i("nIj0"),n=i("IdLP"),s=i("YtkY"),r=i("J+dc"),a=i("yDe4"),l=i("oIO+"),u=i("EM62"),b=i("sEIs"),d=i("fPML"),m=i("jxfh"),p=i("9ufM"),f=i("2kYt"),h=i("Meci"),g=i("FlRo"),v=i("29Wa"),D=i("S17y"),R=i("ulve"),C=i("bFHC"),w=i("mFH5"),U=i("PBFl"),V=i("Rjd2");const I=["roleInput"],F=["auto"];function y(e,t){1&e&&(u.Vb(0,"mat-header-cell"),u.Fc(1,"Email"),u.Ub())}function O(e,t){if(1&e&&(u.Vb(0,"mat-cell"),u.Fc(1),u.Ub()),2&e){const e=t.$implicit;u.Db(1),u.Gc(e.email)}}function P(e,t){1&e&&(u.Vb(0,"mat-header-cell"),u.Fc(1,"Ruoli"),u.Ub())}function M(e,t){if(1&e){const e=u.Wb();u.Vb(0,"mat-chip",21),u.cc("removed",(function(){u.uc(e);const i=t.$implicit,c=u.gc().$implicit;return u.gc(2).remove(i.role,c.email)})),u.Fc(1),u.Vb(2,"mat-icon",22),u.Fc(3,"cancel"),u.Ub(),u.Ub()}if(2&e){const e=t.$implicit;u.mc("selectable",!0)("removable",!0),u.Db(1),u.Hc(" ",e.description," ")}}function k(e,t){if(1&e&&(u.Vb(0,"mat-option",23),u.Fc(1),u.Ub()),2&e){const e=t.$implicit;u.mc("value",e.description),u.Db(1),u.Hc(" ",e.description," ")}}function S(e,t){if(1&e){const e=u.Wb();u.Vb(0,"mat-cell"),u.Vb(1,"mat-form-field",12),u.Vb(2,"mat-chip-list",13,14),u.Dc(4,M,4,3,"mat-chip",15),u.Qb(5,"input",16,17),u.Ub(),u.Vb(7,"mat-autocomplete",18,19),u.cc("optionSelected",(function(i){u.uc(e);const c=t.$implicit;return u.gc(2).selected(i,c.email,c.roles)})),u.Dc(9,k,2,2,"mat-option",20),u.hc(10,"async"),u.Ub(),u.Ub(),u.Ub()}if(2&e){const e=t.$implicit,i=u.sc(3),c=u.sc(8),o=u.gc(2);u.Db(4),u.mc("ngForOf",e.roles),u.Db(1),u.mc("formControl",o.roleCtrl)("matAutocomplete",c)("matChipInputFor",i),u.Db(4),u.mc("ngForOf",u.ic(10,5,o.filteredRoles))}}function _(e,t){1&e&&(u.Vb(0,"mat-header-cell"),u.Fc(1,"Credito"),u.Ub())}function E(e,t){if(1&e&&(u.Vb(0,"mat-cell"),u.Fc(1),u.hc(2,"currency"),u.Ub()),2&e){const e=t.$implicit;u.Db(1),u.Gc(u.jc(2,1,e.snackCredit,"EUR"))}}function x(e,t){1&e&&(u.Vb(0,"mat-header-cell"),u.Fc(1,"Gestisci"),u.Ub())}function j(e,t){1&e&&(u.Vb(0,"mat-cell"),u.Vb(1,"button",24),u.Fc(2," Aggiungi credito "),u.Ub(),u.Ub())}function $(e,t){1&e&&(u.Vb(0,"mat-header-cell"),u.Fc(1,"Gestisci"),u.Ub())}function A(e,t){if(1&e){const e=u.Wb();u.Vb(0,"mat-cell"),u.Vb(1,"button",25),u.cc("click",(function(){u.uc(e);const i=t.$implicit;return u.gc(2).removeAccount(i.email)})),u.Fc(2," Elimina "),u.Ub(),u.Ub()}}function L(e,t){1&e&&u.Qb(0,"mat-header-row")}function G(e,t){1&e&&u.Qb(0,"mat-row")}function T(e,t){if(1&e&&(u.Tb(0),u.Vb(1,"mat-card"),u.Vb(2,"mat-card-header"),u.Vb(3,"mat-card-title"),u.Fc(4),u.Ub(),u.Ub(),u.Vb(5,"mat-card-content"),u.Vb(6,"mat-table",2),u.Tb(7,3),u.Dc(8,y,2,0,"mat-header-cell",4),u.Dc(9,O,2,1,"mat-cell",5),u.Sb(),u.Tb(10,6),u.Dc(11,P,2,0,"mat-header-cell",4),u.Dc(12,S,11,7,"mat-cell",5),u.Sb(),u.Tb(13,7),u.Dc(14,_,2,0,"mat-header-cell",4),u.Dc(15,E,3,4,"mat-cell",5),u.Sb(),u.Tb(16,8),u.Dc(17,x,2,0,"mat-header-cell",4),u.Dc(18,j,3,0,"mat-cell",5),u.Sb(),u.Tb(19,9),u.Vb(20,"div"),u.Dc(21,$,2,0,"mat-header-cell",4),u.Dc(22,A,3,0,"mat-cell",5),u.Ub(),u.Sb(),u.Dc(23,L,1,0,"mat-header-row",10),u.Dc(24,G,1,0,"mat-row",11),u.Ub(),u.Ub(),u.Ub(),u.Sb()),2&e){const e=t.ngIf,i=u.gc();u.Db(4),u.Hc(" ",e.id.toUpperCase(),""),u.Db(2),u.mc("dataSource",e.members),u.Db(17),u.mc("matHeaderRowDef",i.displayedColumns),u.Db(1),u.mc("matRowDefColumns",i.displayedColumns)}}function J(e,t){1&e&&(u.Vb(0,"csl-alert",26),u.Fc(1," Non abbiamo trovato nessuna classe con questo ID! "),u.Ub())}let Q=(()=>{class e{constructor(e,t,i,c,n,r,a){this.activated=e,this.members=t,this.toastr=i,this.auth=c,this.router=n,this.store=r,this.dialog=a,this.roleCtrl=new o.e,this.allRoles=[{description:"Rappresentante di classe",role:"isRappreDiClasse"},{description:"Direttore di QP",role:"isQp"},{description:"Referente Arte",role:"isReferente[arte]"},{description:"Referente ASL",role:"isReferente[asl]"},{description:"Referente Biblioteca",role:"isReferente[biblioteca]"},{description:"Referente Cinema",role:"isReferente[cinema]"},{description:"Referente Consulta",role:"isReferente[consulta]"},{description:"Referente Dibattito",role:"isReferente[dibattito]"},{description:"Referente Green",role:"isReferente[green]"},{description:"Referente Feste",role:"isReferente[feste]"},{description:"Referente LIR",role:"isReferente[lir]"},{description:"Referente Musica",role:"isReferente[musica]"},{description:"Referente Omnia",role:"isReferente[omnia]"},{description:"Referente PortArti",role:"isReferente[portarti]"},{description:"Referente Sport",role:"isReferente[sport]"},{description:"Referente Tutoring",role:"isReferente[tutoring]"},{description:"Referente VALE",role:"isReferente[vale]"}],this.router.url.includes("bar-admin")?(this.page="bar-admin",this.displayedColumns=["email","credit","manage"]):this.router.url.includes("vice")?(this.page="vice",this.displayedColumns=["email"]):this.router.url.includes("rappre")?(this.page="rappre",this.displayedColumns=["email","roles"]):this.router.url.includes("admin")&&(this.page="admin",this.displayedColumns=["email","roles","delete"],this.allRoles.push({role:"isRappre",description:"Rappresentante d'Istituto"},{role:"isBar",description:"Barista"},{role:"isVice",description:"Vice"})),this.filteredRoles=this.roleCtrl.valueChanges.pipe(Object(s.a)((e=>e?this._filter(e):this.allRoles.slice()))),this.classID=this.activated.snapshot.paramMap.get("classID")}ngOnInit(){this.state$.pipe(Object(r.a)(1)).subscribe((e=>{this.store.dispatch(e.classes?new l.c.GetCurrent(this.classID):new l.c.Get(this.classID))}))}selected(e,t,i){const c=e.option.viewValue,o=this.allRoles.find((e=>e.description===c));this.roleInput.nativeElement.value="",this.roleCtrl.setValue(null),i.find((e=>e.role===o.role))?this.toastr.show({message:"Questo utente ha gi\xe0 questo ruolo!",color:"accent"}):i.find((e=>e.role.includes("isReferente")))&&o.role.includes("isReferente")?this.toastr.showError("Impossibile aggiungere un altro ruolo da referente!"):this.store.dispatch(new l.d.Add(o,t)).subscribe((()=>{this.toastr.show({message:"Ruolo aggiunto a "+t,color:"basic",action:"Chiudi",duration:5e3})}))}remove(e,t){"admin"===this.page||"isBar"!==e&&"isRappre"!==e&&"isVice"!==e?this.store.dispatch(new l.d.Remove(e,t)).subscribe((()=>{this.toastr.show({message:"Ruolo rimosso da "+t,color:"basic"})})):this.toastr.showError("Non sei autorizzato a rimuovere questo ruolo!")}removeAccount(e){this.dialog.open({title:"Rimuovere account?",text:`L'account associato alla mail ${e} sar\xe0 eliminato e con esso tutti i suoi dati`,color:"warn",answer:"S\xec, rimuovi"}).subscribe((()=>{this.store.dispatch(new l.a.Remove(e)).subscribe((e=>{this.toastr.show({message:"Account rimosso",color:"accent"})}))}))}_filter(e){const t=e.toLowerCase();return this.allRoles.filter((e=>0===e.description.toLowerCase().indexOf(t)))}}return e.\u0275fac=function(t){return new(t||e)(u.Pb(b.a),u.Pb(d.a),u.Pb(m.b),u.Pb(p.a),u.Pb(b.f),u.Pb(a.e),u.Pb(m.a))},e.\u0275cmp=u.Jb({type:e,selectors:[["csl-single-class"]],viewQuery:function(e,t){var i;1&e&&(u.Jc(I,!0),u.Jc(F,!0)),2&e&&(u.rc(i=u.dc())&&(t.roleInput=i.first),u.rc(i=u.dc())&&(t.matAutocomplete=i.first))},decls:4,vars:4,consts:[[4,"ngIf","ngIfElse"],["noClassFound",""],[1,"table",3,"dataSource"],["matColumnDef","email"],[4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","roles"],["matColumnDef","credit"],["matColumnDef","manage"],["matColumnDef","delete"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],[1,"chip-list"],["aria-label","Fruit selection"],["chipList",""],[3,"selectable","removable","removed",4,"ngFor","ngForOf"],["placeholder","Ruoli...",3,"formControl","matAutocomplete","matChipInputFor"],["roleInput",""],[3,"optionSelected"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],[3,"selectable","removable","removed"],["matChipRemove",""],[3,"value"],["mat-button","","color","primary"],["mat-stroked-button","","color","warn",3,"click"],["color","primary"]],template:function(e,t){if(1&e&&(u.Dc(0,T,25,4,"ng-container",0),u.hc(1,"async"),u.Dc(2,J,2,0,"ng-template",null,1,u.Ec)),2&e){const e=u.sc(3);u.mc("ngIf",u.ic(1,2,t.state$).currentClass)("ngIfElse",e)}},directives:[f.m,h.a,h.e,h.h,h.d,g.j,g.c,g.e,g.b,g.g,g.i,g.d,g.a,v.b,D.c,f.l,o.b,R.c,D.b,o.o,o.f,R.a,D.a,C.a,D.d,w.i,U.b,g.f,g.h,V.a],pipes:[f.b,f.d],styles:[".chip-list[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]{width:100%}.mat-column-delete[_ngcontent-%COMP%]{max-width:200px;margin-left:10px}"]}),Object(c.__decorate)([Object(a.c)(l.b),Object(c.__metadata)("design:type",n.a)],e.prototype,"state$",void 0),e})()},SKMG:function(e,t,i){"use strict";i.d(t,"a",(function(){return u}));var c=i("EM62"),o=i("2kYt"),n=i("Rjd2"),s=i("Meci");function r(e,t){if(1&e&&(c.Vb(0,"mat-card",3),c.Vb(1,"mat-card-header"),c.Vb(2,"div",4),c.Qb(3,"img",5),c.Ub(),c.Vb(4,"mat-card-title"),c.Fc(5),c.Ub(),c.Vb(6,"mat-card-subtitle"),c.Fc(7),c.Ub(),c.Ub(),c.Qb(8,"div",6),c.Ub()),2&e){const e=c.gc();c.Db(3),c.mc("src",e.user.photoURL,c.wc),c.Db(2),c.Gc(e.user.name),c.Db(2),c.Gc(e.user.email)}}const a=[[["","header",""]],[["","activities-label",""]],[["","activities",""]],[["","logout-btn",""]]],l=["[header]","[activities-label]","[activities]","[logout-btn]"];let u=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Jb({type:e,selectors:[["csl-dashboard-home"]],inputs:{user:"user"},ngContentSelectors:l,decls:10,vars:1,consts:[[1,"header"],["class","user",4,"ngIf"],[1,"logout-btn"],[1,"user"],["mat-card-avatar",""],[1,"profileimg",3,"src"],[1,"shadow"]],template:function(e,t){1&e&&(c.lc(a),c.Vb(0,"div"),c.Vb(1,"h1",0),c.kc(2),c.Ub(),c.Dc(3,r,9,3,"mat-card",1),c.Vb(4,"h1",0),c.kc(5,1),c.Ub(),c.Vb(6,"csl-alert"),c.kc(7,2),c.Ub(),c.Vb(8,"div",2),c.kc(9,3),c.Ub(),c.Ub()),2&e&&(c.Db(3),c.mc("ngIf",t.user))},directives:[o.m,n.a,s.a,s.e,s.c,s.h,s.g],styles:[".profileimg[_ngcontent-%COMP%]{height:100%;border-radius:50px}.header[_ngcontent-%COMP%]{font-weight:500}.user[_ngcontent-%COMP%]{margin-bottom:20px;overflow:hidden}.shadow[_ngcontent-%COMP%]{background:linear-gradient(270deg,#fff,hsla(0,0%,100%,.4)) 100%;position:absolute;height:100%;width:10px;right:0;top:0}.logout-btn[_ngcontent-%COMP%]{margin-top:20px}"]}),e})()},r8jD:function(e,t,i){"use strict";i.d(t,"a",(function(){return g}));var c=i("D57K"),o=i("yDe4"),n=i("oIO+"),s=i("IdLP"),r=i("EM62"),a=i("2kYt"),l=i("Meci"),u=i("sEIs"),b=i("Rjd2");const d=function(e){return[e]};function m(e,t){if(1&e&&(r.Tb(0),r.Vb(1,"mat-card",5),r.Vb(2,"mat-card-header"),r.Vb(3,"mat-card-title"),r.Fc(4),r.Ub(),r.Ub(),r.Ub(),r.Sb()),2&e){const e=t.$implicit;r.Db(1),r.mc("routerLink",r.pc(2,d,e.id)),r.Db(3),r.Gc(e.id.toUpperCase())}}function p(e,t){if(1&e&&(r.Tb(0),r.Dc(1,m,5,4,"ng-container",4),r.Sb()),2&e){const e=r.gc().ngIf;r.Db(1),r.mc("ngForOf",e)}}function f(e,t){if(1&e&&(r.Vb(0,"div",2),r.Dc(1,p,2,1,"ng-container",3),r.Ub()),2&e){const e=t.ngIf;r.gc();const i=r.sc(3);r.Db(1),r.mc("ngIf",e.length>0)("ngIfElse",i)}}function h(e,t){1&e&&(r.Vb(0,"csl-alert",6),r.Fc(1," Non ci sono ancora classi! "),r.Ub())}let g=(()=>{class e{constructor(e){this.store=e}ngOnInit(){this.store.dispatch(new n.c.Get)}}return e.\u0275fac=function(t){return new(t||e)(r.Pb(o.e))},e.\u0275cmp=r.Jb({type:e,selectors:[["app-classi"]],decls:4,vars:4,consts:[["class","cards",4,"ngIf","ngIfElse"],["noClasses",""],[1,"cards"],[4,"ngIf","ngIfElse"],[4,"ngFor","ngForOf"],[1,"card",3,"routerLink"],["color","primary",1,"alert"]],template:function(e,t){if(1&e&&(r.Dc(0,f,2,2,"div",0),r.hc(1,"async"),r.Dc(2,h,2,0,"ng-template",null,1,r.Ec)),2&e){const e=r.sc(3);r.mc("ngIf",r.ic(1,2,t.state$).classes)("ngIfElse",e)}},directives:[a.m,a.l,l.a,u.g,l.e,l.h,b.a],pipes:[a.b],styles:[".cards[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.card[_ngcontent-%COMP%]{cursor:pointer;width:4em;margin-right:20px;margin-bottom:20px;outline:none;text-align:center}.alert[_ngcontent-%COMP%]{width:100%}"]}),Object(c.__decorate)([Object(o.c)(n.b),Object(c.__metadata)("design:type",s.a)],e.prototype,"state$",void 0),e})()},zlwK:function(e,t,i){"use strict";i.d(t,"a",(function(){return l}));var c=i("JCQO"),o=i("jxfh"),n=i("EM62"),s=i("PBFl"),r=i("2kYt");function a(e,t){if(1&e){const e=n.Wb();n.Vb(0,"div"),n.Vb(1,"p"),n.Fc(2),n.Ub(),n.Vb(3,"button",4),n.cc("click",(function(){n.uc(e);const t=n.gc();return t.uploadCsv(t.upload.csvFile.name)})),n.Fc(4," Carica "),n.Ub(),n.Ub()}if(2&e){const e=n.gc();n.Db(2),n.Hc('Nome del file caricato: "',e.upload.csvFile.name,'"')}}let l=(()=>{class e{constructor(e,t,i){this.upload=e,this.dialog=t,this.toastr=i}ngOnInit(){}uploadCsv(e){this.dialog.open({title:"Sei sicuro?",text:`Il file "${e}" verr\xe0 caricato e creer\xe0 gli account per gli studenti della scuola`,answer:"Conferma",color:"primary"}).subscribe((e=>{this.upload.onCsvUpload().subscribe((e=>{const{success:t,duplicates:i}=e;!0===t?this.toastr.show({message:"Account creati",color:"success",action:"Chiudi",duration:5e3}):!1===t&&i&&(this.ref=this.toastr.show({message:"Mail duplicate trovate",color:"warn",action:"Copia email",duration:15e3}),this.ref.onAction().subscribe((()=>{window.navigator.clipboard.writeText(i.toString())})))}))}))}}return e.\u0275fac=function(t){return new(t||e)(n.Pb(c.a),n.Pb(o.a),n.Pb(o.b))},e.\u0275cmp=n.Jb({type:e,selectors:[["app-csv"]],decls:6,vars:1,consts:[["type","file",2,"display","none",3,"change"],["selectFile",""],["mat-stroked-button","","color","primary",3,"click"],[4,"ngIf"],["mat-raised-button","","color","primary","size","small",3,"click"]],template:function(e,t){if(1&e){const e=n.Wb();n.Vb(0,"div"),n.Vb(1,"input",0,1),n.cc("change",(function(e){return t.upload.onCsvSelect(e)})),n.Ub(),n.Vb(3,"button",2),n.cc("click",(function(){return n.uc(e),n.sc(2).click()})),n.Fc(4," Scegli file "),n.Ub(),n.Dc(5,a,5,1,"div",3),n.Ub()}2&e&&(n.Db(5),n.mc("ngIf",t.upload.readyToUploadCsv))},directives:[s.b,r.m],styles:["button[_ngcontent-%COMP%]{margin-bottom:20px}"]}),e})()}}]);