(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"+F6c":function(t,e,a){"use strict";a.r(e),a.d(e,"QpAdminModule",(function(){return Z}));var i=a("2kYt"),o=a("sEIs"),c=a("EM62"),r=a("3DyK");let n=(()=>{class t{constructor(){this.links=[{link:".",title:"Home"},{link:"editor",title:"Articoli"},{link:"guide",title:"Guida"}]}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["app-qp-admin"]],decls:3,vars:1,consts:[[3,"links"]],template:function(t,e){1&t&&(c.Vb(0,"csl-dashboard-model",0),c.Vb(1,"span"),c.Fc(2,"QP"),c.Ub(),c.Ub()),2&t&&c.mc("links",e.links)},directives:[r.a],styles:[""]}),t})();var s=a("9ufM"),l=a("jxfh"),b=a("Rjd2"),m=a("PBFl"),u=a("Meci");function d(t,e){if(1&t&&(c.Vb(0,"mat-card"),c.Vb(1,"mat-card-header"),c.Vb(2,"div",2),c.Qb(3,"img",3),c.Ub(),c.Vb(4,"mat-card-title"),c.Fc(5),c.Ub(),c.Vb(6,"mat-card-subtitle"),c.Fc(7),c.Ub(),c.Ub(),c.Ub()),2&t){const t=e.ngIf;c.Db(3),c.mc("src",t.photoURL,c.wc),c.Db(2),c.Ic("",t.firstName," ",t.lastName,""),c.Db(2),c.Gc(t.email)}}let h=(()=>{class t{constructor(t,e){this.dialog=t,this.auth=e}ngOnInit(){}signOut(){this.dialog.open({title:"Sei sicuro di voler uscire?",text:"Ci\xf2 che stavi facendo potrebbe non essere salvato",color:"warn",answer:"S\xec, esci"}).subscribe((t=>{this.auth.signOut()}))}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(l.a),c.Pb(s.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-qp-admin-home"]],decls:11,vars:3,consts:[[4,"ngIf"],["mat-raised-button","","color","warn",3,"click"],["mat-card-avatar",""],[1,"profileimg",3,"src"]],template:function(t,e){1&t&&(c.Vb(0,"div"),c.Vb(1,"h1"),c.Fc(2,"I vostri dati"),c.Ub(),c.Dc(3,d,8,4,"mat-card",0),c.hc(4,"async"),c.Vb(5,"h1"),c.Fc(6,"Le vostre attivit\xe0"),c.Ub(),c.Vb(7,"csl-alert"),c.Fc(8," Questa sezione \xe8 ancora vuota! Tornate pi\xf9 tardi... "),c.Ub(),c.Vb(9,"button",1),c.cc("click",(function(){return e.signOut()})),c.Fc(10,"Esci"),c.Ub(),c.Ub()),2&t&&(c.Db(3),c.mc("ngIf",c.ic(4,1,e.auth.user$)))},directives:[i.m,b.a,m.b,u.a,u.e,u.c,u.h,u.g],pipes:[i.b],styles:[".profileimg[_ngcontent-%COMP%]{height:100%;border-radius:50px}h1[_ngcontent-%COMP%]{font-weight:500}mat-card[_ngcontent-%COMP%]{margin-bottom:20px}button[_ngcontent-%COMP%]{margin-top:20px}"]}),t})();var p=a("tPfK"),g=a("FlRo"),f=a("k8N0");function v(t,e){1&t&&(c.Vb(0,"mat-header-cell"),c.Fc(1,"ID"),c.Ub())}function V(t,e){if(1&t&&(c.Vb(0,"mat-cell"),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Gc(t.id)}}function C(t,e){1&t&&(c.Vb(0,"mat-header-cell"),c.Fc(1,"Titolo"),c.Ub())}function U(t,e){if(1&t&&(c.Vb(0,"mat-cell"),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.Db(1),c.Gc(t.title)}}function w(t,e){1&t&&(c.Vb(0,"mat-header-cell"),c.Fc(1,"Pubblicato"),c.Ub())}function D(t,e){if(1&t){const t=c.Wb();c.Vb(0,"mat-cell"),c.Vb(1,"mat-slide-toggle",10),c.cc("change",(function(a){c.uc(t);const i=e.$implicit;return c.gc().publishedChange(a,i.id)})),c.Ub(),c.Ub()}if(2&t){const t=e.$implicit;c.Db(1),c.mc("checked",t.published)}}function k(t,e){1&t&&(c.Vb(0,"mat-header-cell"),c.Fc(1,"Gestisci"),c.Ub())}const y=function(t){return[t]};function F(t,e){if(1&t){const t=c.Wb();c.Vb(0,"mat-cell"),c.Vb(1,"button",11),c.Fc(2," Modifica "),c.Ub(),c.Vb(3,"button",12),c.cc("click",(function(){c.uc(t);const a=e.$implicit;return c.gc().deleteArticle(a.id)})),c.Fc(4," Elimina "),c.Ub(),c.Ub()}if(2&t){const t=e.$implicit;c.Db(1),c.mc("routerLink",c.pc(1,y,t.id))}}function S(t,e){1&t&&c.Qb(0,"mat-header-row")}function I(t,e){1&t&&c.Qb(0,"mat-row")}const T=function(){return["new"]};let P=(()=>{class t{constructor(t,e,a){this.articlesService=t,this.dialog=e,this.toastr=a,this.displayedColumns=["id","title","options","published"]}ngOnInit(){this.articlesService.getArticles().subscribe((t=>{this.articles=t.data}))}deleteArticle(t){this.dialog.open({title:"Cancellare l'articolo?",answer:"S\xec, cancella",text:"Non potrai pi\xf9 recuperarlo",color:"warn"}).subscribe((()=>{this.articlesService.delete(t).subscribe((t=>{!0===t.success?(this.toastr.show({message:"Articolo eliminato",color:"accent",action:"Chiudi",duration:5e3}),this.articlesService.getArticles().subscribe((t=>{this.articles=t.data}))):!1===t.success&&this.toastr.showError()}))}))}publishedChange(t,e){this.articlesService.changeArticlePublished(e,t.checked).subscribe((t=>{t.success?this.toastr.show({color:"basic",message:"Stato dell'articolo modificato con successo"}):this.toastr.showError()}))}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(p.a),c.Pb(l.a),c.Pb(l.b))},t.\u0275cmp=c.Jb({type:t,selectors:[["csl-manage-articles"]],decls:23,vars:5,consts:[[3,"dataSource"],["matColumnDef","id"],[4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","title"],["matColumnDef","published"],["matColumnDef","options"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],["mat-raised-button","","color","primary",3,"routerLink"],["color","primary",1,"toggle",3,"checked","change"],["mat-stroked-button","","color","primary","size","small",3,"routerLink"],["mat-stroked-button","","color","warn",3,"click"]],template:function(t,e){1&t&&(c.Vb(0,"mat-card"),c.Vb(1,"mat-card-header"),c.Vb(2,"mat-card-title"),c.Fc(3,"Articoli"),c.Ub(),c.Ub(),c.Vb(4,"mat-card-content"),c.Vb(5,"mat-table",0),c.Tb(6,1),c.Dc(7,v,2,0,"mat-header-cell",2),c.Dc(8,V,2,1,"mat-cell",3),c.Sb(),c.Tb(9,4),c.Dc(10,C,2,0,"mat-header-cell",2),c.Dc(11,U,2,1,"mat-cell",3),c.Sb(),c.Tb(12,5),c.Dc(13,w,2,0,"mat-header-cell",2),c.Dc(14,D,2,1,"mat-cell",3),c.Sb(),c.Tb(15,6),c.Dc(16,k,2,0,"mat-header-cell",2),c.Dc(17,F,5,3,"mat-cell",3),c.Sb(),c.Dc(18,S,1,0,"mat-header-row",7),c.Dc(19,I,1,0,"mat-row",8),c.Ub(),c.Ub(),c.Vb(20,"mat-card-actions"),c.Vb(21,"a",9),c.Fc(22," Aggiungi un articolo "),c.Ub(),c.Ub(),c.Ub()),2&t&&(c.Db(5),c.mc("dataSource",e.articles),c.Db(13),c.mc("matHeaderRowDef",e.displayedColumns),c.Db(1),c.mc("matRowDefColumns",e.displayedColumns),c.Db(2),c.mc("routerLink",c.oc(4,T)))},directives:[u.a,u.e,u.h,u.d,g.j,g.c,g.e,g.b,g.g,g.i,u.b,m.a,o.i,g.d,g.a,f.a,m.b,o.g,g.f,g.h],styles:["table[_ngcontent-%COMP%]{width:100%}button[_ngcontent-%COMP%]{margin-right:10px}mat-card-actions[_ngcontent-%COMP%]{margin-left:20px}.toggle[_ngcontent-%COMP%]{margin-left:10px}"]}),t})();var M=a("+IuD"),x=a.n(M),O=a("w/LV"),A=a.n(O),L=a("6V5p"),_=a.n(L),N=a("UIvY"),R=a.n(N),Q=a("eVdK"),q=a.n(Q),E=a("pkNS"),G=a.n(E),j=a("nIj0"),z=a("29Wa"),$=a("R7+U"),H=a("Cd2c"),W=a("mFH5");function J(t,e){if(1&t&&(c.Vb(0,"mat-option",17),c.Fc(1),c.Ub()),2&t){const t=e.$implicit;c.mc("value",t),c.Db(1),c.Gc(t)}}let B=(()=>{class t{constructor(t,e,a,i,o,c){this.articlesService=t,this.dialog=e,this.toastr=a,this.route=i,this.router=o,this.fb=c,this.metadata=this.fb.group({category:["",j.u.required],title:["",j.u.required],author:["",j.u.required],estimatedTime:["",j.u.required],image:["",j.u.required]}),this.ready=!1,this.articleID=this.route.snapshot.paramMap.get("articleID"),this.categories=["Lussana","Italia","Mondo","Speciale","Scienza & Tech","Cultura","Sport","Svago"]}ngOnInit(){}ngAfterViewInit(){this.articlesService.getArticle(this.articleID).subscribe((t=>{const e=t.data;e&&(this.metadata.controls.category.setValue(e.category),this.metadata.controls.title.setValue(e.title),this.metadata.controls.author.setValue(e.author),this.metadata.controls.estimatedTime.setValue(e.estimatedTime),this.metadata.controls.image.setValue(e.image)),this.editor=new x.a({holder:"editorjs",data:e?e.content:null,tools:{header:{class:A.a,shortcut:"CTRL+ALT+T",inlineToolbar:["bold","italic","hyperlink"],config:{placeholder:"Titolo",levels:[1,2,3],defaultLevel:1}},paragraph:{class:_.a,shortcut:"CTRL+ALT+Q",inlineToolbar:["bold","italic","hyperlink"],config:{placeholder:"Testo"}},list:{class:R.a,shortcut:"CTRL+ALT+W",inlineToolbar:["bold","italic","hyperlink"]},image:{class:q.a,shortcut:"CTRL+ALT+I",inlineToolbar:["bold","italic","hyperlink"],config:{endpoints:{byFile:"/api/articles/image"}}},hyperlink:{class:G.a,config:{availableTargets:["_blank","_self"],availableRels:["external"],target:"_blank",rel:"external"}}},defaultBlock:"paragraph",i18n:{messages:{toolNames:{Text:"Paragrafo",Heading:"Titolo",List:"Elenco",Image:"Immagine",Bold:"Grassetto",Italic:"Corsivo",Hyperlink:"Link"},tools:{list:{Ordered:"Numerato",Unordered:"Non numerato"},image:{"Select an Image":"Carica un'immagine","With border":"Con bordo","Stretch image":"Allarga immagine","With background":"Con sfondo"},link:{"Add a link":"Aggiungi un link"},hyperlink:{Save:"Salva","Select target":"Seleziona destinazione","Select rel":"Seleziona relazione"}},blockTunes:{delete:{Delete:"Elimina"},moveUp:{"Move up":"Sposta su"},moveDown:{"Move down":"Sposta gi\xf9"}},ui:{blockTunes:{toggler:{"Click to tune":"Modifica"}},inlineToolbar:{converter:{"Convert to":"Converti in"}},toolbar:{toolbox:{Add:"Aggiungi"}}}}},autofocus:!0,onReady:()=>{this.ready=!0}})}))}save(){this.dialog.open({title:"Salvare l'articolo?",text:"Potrai comunque modificarlo in seguito",answer:"S\xec, salva",color:"primary"}).subscribe((()=>{this.editor.save().then((t=>{this.saving=!0,this.articlesService.save(t,this.metadata.value,this.articleID).subscribe((t=>{this.saving=!1,!0===t.success?(this.toastr.show({message:"Articolo salvato!",color:"success",action:"Chiudi",duration:5e3}),this.articleID||this.router.navigate(["editor",t.data.articleID],{relativeTo:this.route.parent})):!1===t.success&&this.toastr.showError()}))}))}))}delete(){this.dialog.open({title:"Cancellare l'articolo?",answer:"S\xec, cancella",text:"Non potrai pi\xf9 recuperarlo",color:"warn"}).subscribe((()=>{this.articleID?this.articleID&&this.articlesService.delete(this.articleID).subscribe((t=>{!0===t.success?(this.toastr.show({message:"Articolo eliminato",color:"accent",action:"Chiudi",duration:5e3}),this.router.navigate(["qp-admin","editor"])):!1===t.success&&this.toastr.showError()})):(this.editor.clear(),this.metadata.reset(),this.toastr.show({message:"Articolo eliminato",color:"primary"}),this.router.navigate(["..","qp-admin","editor"]))}))}uploadCover(t){this.ready=!1,this.articlesService.uploadCover(t.target.files[0]).subscribe((t=>{this.ready=!0,t.success?(this.metadata.controls.image.setValue(t.data),this.toastr.show({message:"File caricato",color:"basic",action:"Chiudi",duration:5e3})):this.toastr.showError()}))}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(p.a),c.Pb(l.a),c.Pb(l.b),c.Pb(o.a),c.Pb(o.f),c.Pb(j.d))},t.\u0275cmp=c.Jb({type:t,selectors:[["csl-editor"]],decls:44,vars:4,consts:[["id","editorjs"],[1,"form-container",3,"formGroup"],[1,"input"],["for","category"],["id","category","placeholder","Selezionare categoria...","formControlName","category"],[3,"value",4,"ngFor","ngForOf"],["matInput","","id","title","type","text","matInput","","formControlName","title"],["matInput","","id","author","type","text","matInput","","formControlName","author"],["id","estimatedTime","type","number","matInput","","formControlName","estimatedTime"],["matSuffix",""],[1,"break"],["type","file","hidden","",3,"change"],["uploadFile",""],["mat-stroked-button","","color","primary",3,"click"],[1,"file-text"],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-raised-button","","color","warn",3,"click"],[3,"value"]],template:function(t,e){if(1&t){const t=c.Wb();c.Vb(0,"mat-card"),c.Vb(1,"mat-card-header"),c.Vb(2,"mat-card-title"),c.Fc(3,"Gestisci il tuo articolo"),c.Ub(),c.Ub(),c.Vb(4,"mat-card-content"),c.Vb(5,"h4"),c.Fc(6,"Contenuto"),c.Ub(),c.Qb(7,"div",0),c.Vb(8,"h4"),c.Fc(9,"Metadati"),c.Ub(),c.Vb(10,"form",1),c.Vb(11,"mat-form-field",2),c.Vb(12,"mat-label",3),c.Fc(13,"Categoria"),c.Ub(),c.Vb(14,"mat-select",4),c.Dc(15,J,2,2,"mat-option",5),c.Ub(),c.Ub(),c.Vb(16,"mat-form-field",2),c.Vb(17,"mat-label"),c.Fc(18,"Titolo"),c.Ub(),c.Qb(19,"input",6),c.Ub(),c.Vb(20,"mat-form-field",2),c.Vb(21,"mat-label"),c.Fc(22,"Autore"),c.Ub(),c.Qb(23,"input",7),c.Ub(),c.Vb(24,"mat-form-field",2),c.Vb(25,"mat-label"),c.Fc(26,"Tempo stimato per la lettura"),c.Ub(),c.Qb(27,"input",8),c.Vb(28,"span",9),c.Fc(29,"minuti"),c.Ub(),c.Ub(),c.Qb(30,"div",10),c.Vb(31,"input",11,12),c.cc("change",(function(t){return e.uploadCover(t)})),c.Ub(),c.Vb(33,"button",13),c.cc("click",(function(){return c.uc(t),c.sc(32).click()})),c.Fc(34," Carica copertina "),c.Ub(),c.Vb(35,"p",14),c.Fc(36,"File caricato: "),c.Vb(37,"i"),c.Fc(38),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Vb(39,"mat-card-actions"),c.Vb(40,"button",15),c.cc("click",(function(){return e.save()})),c.Fc(41," Salva articolo "),c.Ub(),c.Vb(42,"button",16),c.cc("click",(function(){return e.delete()})),c.Fc(43," Cancella articolo "),c.Ub(),c.Ub(),c.Ub()}2&t&&(c.Db(10),c.mc("formGroup",e.metadata),c.Db(5),c.mc("ngForOf",e.categories),c.Db(23),c.Gc(e.metadata.value.image||"nessuno"),c.Db(2),c.mc("disabled",e.metadata.invalid))},directives:[u.a,u.e,u.h,u.d,j.v,j.p,j.i,z.b,z.f,$.a,j.o,j.g,i.l,H.a,j.b,j.r,z.g,m.b,u.b,W.i],styles:["mat-card[_ngcontent-%COMP%]{width:80%;margin-left:auto;margin-right:auto}h4[_ngcontent-%COMP%]{font-weight:500;flex:100%}mat-card-actions[_ngcontent-%COMP%], mat-card-content[_ngcontent-%COMP%]{margin-left:20px}.form-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.input[_ngcontent-%COMP%]{margin-right:10%;width:20%;min-width:180px;margin-bottom:20px}.break[_ngcontent-%COMP%]{flex-basis:100%;height:0}.file-text[_ngcontent-%COMP%]{margin-left:10px}"]}),t})();const K=[{path:"",component:n,children:[{path:"",component:h},{path:"editor",component:P},{path:"editor/new",component:B},{path:"editor/:articleID",component:B},{path:"guide",component:a("S2rc").a,data:{file:"qp-guide.md"}}]}];let Y=(()=>{class t{}return t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({factory:function(e){return new(e||t)},imports:[[o.j.forChild(K)],o.j]}),t})();var X=a("vrzs");let Z=(()=>{class t{}return t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({factory:function(e){return new(e||t)},imports:[[i.c,Y,l.c,j.k,j.s,X.a]]}),t})()}}]);