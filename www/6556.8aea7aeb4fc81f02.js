"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6556],{6556:(k,d,c)=>{c.r(d),c.d(d,{MisCitasPageModule:()=>y});var l=c(177),m=c(4341),o=c(7125),u=c(6454),g=c(467),t=c(9498),f=c(2872),C=c(8472);function h(n,a){1&n&&(t.j41(0,"div",15),t.nrm(1,"ion-icon",16),t.j41(2,"p"),t.EFF(3,"No tienes citas agendadas"),t.k0s()())}function M(n,a){if(1&n&&(t.j41(0,"p")(1,"strong"),t.EFF(2,"Propietario:"),t.k0s(),t.EFF(3),t.k0s()),2&n){const i=t.XpG().$implicit;t.R7$(3),t.SpI(" ",i.ownerData.user," ")}}function _(n,a){if(1&n&&(t.j41(0,"div")(1,"p")(2,"strong"),t.EFF(3,"Tipo:"),t.k0s(),t.EFF(4),t.k0s(),t.j41(5,"p")(6,"strong"),t.EFF(7,"Precio:"),t.k0s(),t.EFF(8),t.nI1(9,"currency"),t.k0s(),t.j41(10,"p")(11,"strong"),t.EFF(12,"Habitaciones:"),t.k0s(),t.EFF(13),t.k0s(),t.j41(14,"p")(15,"strong"),t.EFF(16,"Ba\xf1os:"),t.k0s(),t.EFF(17),t.k0s(),t.j41(18,"p")(19,"strong"),t.EFF(20,"Estacionamiento:"),t.k0s(),t.EFF(21),t.k0s(),t.j41(22,"p")(23,"strong"),t.EFF(24,"Especificaciones:"),t.k0s(),t.EFF(25),t.k0s()()),2&n){const i=t.XpG().$implicit;t.R7$(4),t.SpI(" ",(null==i.propertyData.servicios?null:i.propertyData.servicios.tipo)||i.propertyData.tipo||"N/A"," "),t.R7$(4),t.SpI(" ",t.bMT(9,6,i.propertyData.precio)," "),t.R7$(5),t.SpI(" ",i.propertyData.habitaciones," "),t.R7$(4),t.SpI(" ",i.propertyData.banos," "),t.R7$(4),t.SpI(" ",i.propertyData.estacionamiento," "),t.R7$(4),t.SpI(" ",i.propertyData.especificaciones_adicionales," ")}}function F(n,a){if(1&n&&(t.j41(0,"div"),t.nrm(1,"ion-img",21),t.k0s()),2&n){const i=t.XpG().$implicit;t.R7$(),t.Y8G("src",i.propertyData.imagenes)}}function P(n,a){if(1&n&&(t.j41(0,"ion-item")(1,"ion-card")(2,"ion-card-header")(3,"ion-card-title"),t.EFF(4),t.k0s(),t.j41(5,"ion-card-subtitle"),t.EFF(6),t.nI1(7,"date"),t.k0s()(),t.j41(8,"ion-card-content")(9,"p")(10,"strong"),t.EFF(11,"Estado:"),t.k0s(),t.j41(12,"ion-badge",19),t.EFF(13),t.k0s()(),t.DNE(14,M,4,1,"p",20)(15,_,26,8,"div",20)(16,F,2,1,"div",20),t.k0s()()()),2&n){const i=a.$implicit,e=t.XpG(2);t.R7$(4),t.JRh(i.titulo),t.R7$(2),t.Lme("",t.i5U(7,8,i.fecha,"fullDate")," - ",i.hora,""),t.R7$(6),t.Y8G("color",e.getEstadoColor(i.status)),t.R7$(),t.SpI(" ",i.status," "),t.R7$(),t.Y8G("ngIf",i.ownerData),t.R7$(),t.Y8G("ngIf",i.propertyData),t.R7$(),t.Y8G("ngIf",null==i.propertyData?null:i.propertyData.documento)}}function v(n,a){if(1&n&&(t.j41(0,"ion-list",17),t.DNE(1,P,17,11,"ion-item",18),t.k0s()),2&n){const i=t.XpG();t.R7$(),t.Y8G("ngForOf",i.citas)}}const b=[{path:"",component:(()=>{var n;class a{constructor(e,r,s,p){this.toastCtrl=e,this.navCtrl=r,this.authService=s,this.loadingCtrl=p,this.citas=[]}ngOnInit(){this.checkUserAuthentication()}checkUserAuthentication(){var e=this;return(0,g.A)(function*(){const r=localStorage.getItem("userData");if(!r)return void e.navCtrl.navigateRoot("/login");const s=JSON.parse(r);s&&"quiero-rentar"===s.userType?e.loadCitas():e.navCtrl.navigateRoot("/login")})()}loadCitas(){var e=this;return(0,g.A)(function*(){const r=yield e.loadingCtrl.create({message:"Cargando citas...",spinner:"bubbles",duration:5e3});yield r.present();try{e.citas=yield e.authService.getCitasSentByCurrentUser()}catch(s){console.error("Error al cargar las citas:",s),e.mostrarToast("Error al cargar las citas","danger")}finally{r.dismiss()}})()}getEstadoColor(e){switch(e){case"Aceptada":return"success";case"Rechazada":return"danger";default:return"warning"}}refreshCitas(e){setTimeout(()=>{this.loadCitas(),e.target.complete(),this.mostrarToast("Citas actualizadas.","primary")},1500)}mostrarToast(e,r){var s=this;return(0,g.A)(function*(){(yield s.toastCtrl.create({message:e,duration:2e3,color:r,position:"top"})).present()})()}verCitas(){this.navCtrl.navigateForward("/mis-citas")}cerrarSesion(){localStorage.removeItem("userToken"),this.navCtrl.navigateRoot("/login")}}return(n=a).\u0275fac=function(e){return new(e||n)(t.rXU(o.K_),t.rXU(f.q9),t.rXU(C.u),t.rXU(o.Xi))},n.\u0275cmp=t.VBU({type:n,selectors:[["app-mis-citas"]],standalone:!1,decls:29,vars:2,consts:[["side","end","menuId","main-menu","contentId","main-content"],["color","primary"],["button","",3,"click"],["name","calendar","slot","start"],["name","log-out","slot","start"],["id","main-content"],["slot","start"],["defaultHref","/home-propietario"],["slot","end"],["menu","main-menu"],["fullscreen","",1,"ion-padding"],["class","no-citas-container",4,"ngIf"],["class","citas-list",4,"ngIf"],["slot","fixed","pullMin","50","pullMax","150",3,"ionRefresh"],["pullingText","Desliza para actualizar...","refreshingText","Actualizando..."],[1,"no-citas-container"],["name","calendar-clear-outline","size","large"],[1,"citas-list"],[4,"ngFor","ngForOf"],[3,"color"],[4,"ngIf"],[3,"src"]],template:function(e,r){1&e&&(t.j41(0,"ion-menu",0)(1,"ion-header")(2,"ion-toolbar",1)(3,"ion-title"),t.EFF(4,"Men\xfa"),t.k0s()()(),t.j41(5,"ion-content")(6,"ion-list")(7,"ion-item",2),t.bIt("click",function(){return r.verCitas()}),t.nrm(8,"ion-icon",3),t.j41(9,"ion-label"),t.EFF(10,"Mis citas"),t.k0s()(),t.j41(11,"ion-item",2),t.bIt("click",function(){return r.cerrarSesion()}),t.nrm(12,"ion-icon",4),t.j41(13,"ion-label"),t.EFF(14,"Cerrar sesi\xf3n"),t.k0s()()()()(),t.j41(15,"div",5)(16,"ion-header")(17,"ion-toolbar",1)(18,"ion-buttons",6),t.nrm(19,"ion-back-button",7),t.k0s(),t.j41(20,"ion-title"),t.EFF(21,"Mis Citas Enviadas"),t.k0s(),t.j41(22,"ion-buttons",8),t.nrm(23,"ion-menu-button",9),t.k0s()()(),t.j41(24,"ion-content",10),t.DNE(25,h,4,0,"div",11)(26,v,2,1,"ion-list",12),t.j41(27,"ion-refresher",13),t.bIt("ionRefresh",function(p){return r.refreshCitas(p)}),t.nrm(28,"ion-refresher-content",14),t.k0s()()()),2&e&&(t.R7$(25),t.Y8G("ngIf",0===r.citas.length),t.R7$(),t.Y8G("ngIf",r.citas.length>0))},dependencies:[l.Sq,l.bT,o.In,o.QW,o.b_,o.I9,o.ME,o.HW,o.tN,o.W9,o.eU,o.iq,o.KW,o.uz,o.he,o.nf,o.oS,o.MC,o.To,o.Ki,o.BC,o.ai,o.el,l.oe,l.vh],styles:["ion-content[_ngcontent-%COMP%]{--background: #f4f4f4;padding:10px;display:flex;justify-content:center;align-items:center;height:100%}.citas-container[_ngcontent-%COMP%]{width:100%;max-width:1200px;display:grid;grid-template-columns:1fr;gap:15px;margin:0 auto}@media (min-width: 768px){.citas-container[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}ion-card[_ngcontent-%COMP%]{border-radius:12px;box-shadow:0 4px 10px #0000001a;background:#fff;padding:10px;transition:transform .2s ease-in-out;margin:0 auto;width:100%;max-width:500px;display:flex;flex-direction:column}ion-card[_ngcontent-%COMP%]:hover{transform:scale(1.02)}ion-card-header[_ngcontent-%COMP%]{background:#f8f9fa;border-top-left-radius:10px;border-top-right-radius:10px;text-align:center}ion-card-title[_ngcontent-%COMP%]{font-size:18px;font-weight:700;color:#333;white-space:normal;word-wrap:break-word}ion-card-subtitle[_ngcontent-%COMP%]{font-size:14px;color:#666;white-space:normal;word-wrap:break-word}ion-card-content[_ngcontent-%COMP%]{font-size:14px;color:#444}ion-badge[_ngcontent-%COMP%]{font-size:14px;padding:5px 10px;border-radius:8px}.property-image[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:10px}.property-image[_ngcontent-%COMP%]   ion-img[_ngcontent-%COMP%]{width:100%;height:200px;object-fit:cover;border-radius:10px}.no-citas-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;height:70vh;text-align:center;color:gray;font-size:1.2rem}.no-citas-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:3rem;color:gray;margin-bottom:10px}ion-menu[_ngcontent-%COMP%]{--width: 250px}ion-menu[_ngcontent-%COMP%]   ion-header[_ngcontent-%COMP%]{background-color:#3b82f6}ion-toolbar[_ngcontent-%COMP%]{--background: #3b82f6;--color: white}ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--background: white;--color: #333;font-size:16px}ion-item[_ngcontent-%COMP%]:hover{background:#eceff1}ion-icon[_ngcontent-%COMP%]{font-size:20px;color:#3b82f6}ion-button[_ngcontent-%COMP%]{--border-radius: 8px;--box-shadow: none}"]}),a})()}];let x=(()=>{var n;class a{}return(n=a).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.$C({type:n}),n.\u0275inj=t.G2t({imports:[u.iI.forChild(b),u.iI]}),a})(),y=(()=>{var n;class a{}return(n=a).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.$C({type:n}),n.\u0275inj=t.G2t({imports:[l.MD,m.YN,o.bv,x]}),a})()}}]);