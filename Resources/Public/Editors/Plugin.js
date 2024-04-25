(()=>{var Vr=Object.create;var H=Object.defineProperty;var Ur=Object.getOwnPropertyDescriptor;var qr=Object.getOwnPropertyNames;var zr=Object.getPrototypeOf,$r=Object.prototype.hasOwnProperty;var f=(t,e)=>()=>(t&&(e=t(t=0)),e);var J=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var wt=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of qr(e))!$r.call(t,a)&&a!==r&&H(t,a,{get:()=>e[a],enumerable:!(o=Ur(e,a))||o.enumerable});return t};var X=(t,e,r)=>(r=t!=null?Vr(zr(t)):{},wt(e||!t||!t.__esModule?H(r,"default",{value:t,enumerable:!0}):r,t)),Gr=t=>wt(H({},"__esModule",{value:!0}),t);var Tt=f(()=>{});var At=f(()=>{Tt()});function c(t){return(...e)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${t}`])return window["@Neos:HostPluginAPI"][`@${t}`](...e);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var T=f(()=>{});var jt=f(()=>{});var It=f(()=>{});var Y=f(()=>{jt();It()});var Et=f(()=>{Y()});var St=f(()=>{Y();Et()});var _t,Ct=f(()=>{At();T();St();_t=c("manifest")});var Bt=J((Gs,kt)=>{T();kt.exports=c("vendor")().React});var Lt=J((Js,Rt)=>{T();Rt.exports=c("NeosProjectPackages")().NeosUiDecorators});var Ft=J((Ys,Mt)=>{T();Mt.exports=c("NeosProjectPackages")().ReactUiComponents});function Xr(t){let{i18nRegistry:e,tooltip:r,isActive:o,...a}=t;return Wt.default.createElement(Kt.IconButton,{...a,isActive:!!o,title:e.translate(r)})}var Wt,Nt,Kt,Jr,A,Dt=f(()=>{Wt=X(Bt()),Nt=X(Lt()),Kt=X(Ft()),Jr=(0,Nt.neos)(t=>({i18nRegistry:t.get("i18n")}));A=Jr(Xr)});var Yr,j,Vt=f(()=>{Yr=(t,e)=>(r,o)=>(o.editorOptions&&(o.editorOptions.formatting&&o.editorOptions.formatting[e]||o.editorOptions[e])&&(r.plugins=r.plugins||[],r.plugins.push(t)),r),j=Yr});var Q=f(()=>{Dt();Vt()});function Qr(){return function t(){t.called=!0}}var Z,Ut=f(()=>{Z=Qr});var x,qt=f(()=>{Ut();x=class{constructor(e,r){this.source=e,this.name=r,this.path=[],this.stop=Z(),this.off=Z()}}});function tt(){let t="e";for(let e=0;e<8;e++)t+=Math.floor((1+Math.random())*65536).toString(16).substring(1);return t}var zt=f(()=>{});var Zr,$t,Gt=f(()=>{Zr={get(t){return typeof t!="number"?this[t]||this.normal:t},highest:1e5,high:1e3,normal:0,low:-1e3,lowest:-1e5},$t=Zr});function eo(t,e){t[ot]||(t[ot]=e||tt())}function et(t){return t[ot]}function Xt(t){return t._events||Object.defineProperty(t,"_events",{value:{}}),t._events}function ro(){return{callbacks:[],childEvents:[]}}function oo(t,e){let r=Xt(t);if(r[e])return;let o=e,a=null,s=[];for(;o!==""&&!r[o];)r[o]=ro(),s.push(r[o]),a&&r[o].childEvents.push(a),a=o,o=o.substr(0,o.lastIndexOf(":"));if(o!==""){for(let n of s)n.callbacks=r[o].callbacks.slice();r[o].childEvents.push(a)}}function at(t,e){let r=Xt(t)[e];if(!r)return[];let o=[r.callbacks];for(let a=0;a<r.childEvents.length;a++){let s=at(t,r.childEvents[a]);o=o.concat(s)}return o}function Yt(t,e){let r;return!t._events||!(r=t._events[e])||!r.callbacks.length?e.indexOf(":")>-1?Yt(t,e.substr(0,e.lastIndexOf(":"))):null:r.callbacks}function Ht(t,e,r){for(let[o,a]of t){a?typeof a=="function"&&(a=a(e.name)):a=e.name;let s=new x(e.source,a);s.path=[...e.path],o.fire(s,...r)}}function rt(t,e,r){let o=at(t,e);for(let a of o)for(let s=0;s<a.length;s++)a[s].callback==r&&(a.splice(s,1),s--)}var I,ot,to,Jt,Qt=f(()=>{qt();zt();Gt();I=Symbol("listeningTo"),ot=Symbol("emitterId"),to={on(t,e,r={}){this.listenTo(this,t,e,r)},once(t,e,r){let o=function(a,...s){a.off(),e.call(this,a,...s)};this.listenTo(this,t,o,r)},off(t,e){this.stopListening(this,t,e)},listenTo(t,e,r,o={}){let a,s;this[I]||(this[I]={});let n=this[I];et(t)||eo(t);let i=et(t);(a=n[i])||(a=n[i]={emitter:t,callbacks:{}}),(s=a.callbacks[e])||(s=a.callbacks[e]=[]),s.push(r),oo(t,e);let u=at(t,e),d=$t.get(o.priority),vt={callback:r,priority:d};for(let _ of u){let Ot=!1;for(let C=0;C<_.length;C++)if(_[C].priority<d){_.splice(C,0,vt),Ot=!0;break}Ot||_.push(vt)}},stopListening(t,e,r){let o=this[I],a=t&&et(t),s=o&&a&&o[a],n=s&&e&&s.callbacks[e];if(!(!o||t&&!s||e&&!n))if(r)rt(t,e,r);else if(n){for(;r=n.pop();)rt(t,e,r);delete s.callbacks[e]}else if(s){for(e in s.callbacks)this.stopListening(t,e);delete o[a]}else{for(a in o)this.stopListening(o[a].emitter);delete this[I]}},fire(t,...e){let r=t instanceof x?t:new x(this,t),o=r.name,a=Yt(this,o);if(r.path.push(this),a){let s=[r,...e];a=Array.from(a);for(let n=0;n<a.length&&(a[n].callback.apply(this,s),r.off.called&&(delete r.off.called,rt(this,o,a[n].callback)),!r.stop.called);n++);}if(this._delegations){let s=this._delegations.get(o),n=this._delegations.get("*");s&&Ht(s,r,e),n&&Ht(n,r,e)}return r.return},delegate(...t){return{to:(e,r)=>{this._delegations||(this._delegations=new Map);for(let o of t){let a=this._delegations.get(o);a?a.set(e,r):this._delegations.set(o,new Map([[e,r]]))}}}},stopDelegating(t,e){if(this._delegations)if(!t)this._delegations.clear();else if(!e)this._delegations.delete(t);else{let r=this._delegations.get(t);r&&r.delete(e)}}},Jt=to});function so(t){let e=t.match(/^([^:]+):/);return e?t+` Read more: ${ao}#error-${e[1]}
`:t}var ao,p,Zt=f(()=>{ao="https://ckeditor.com/docs/ckeditor5/latest/framework/guides/support/error-codes.html",p=class t extends Error{constructor(e,r){e=so(e),r&&(e+=" "+JSON.stringify(r)),super(e),this.name="CKEditorError",this.data=r}static isCKEditorError(e){return e instanceof t}}});var fo,k,st=f(()=>{fo=typeof global=="object"&&global&&global.Object===Object&&global,k=fo});var no,io,h,B=f(()=>{st();no=typeof self=="object"&&self&&self.Object===Object&&self,io=k||no||Function("return this")(),h=io});var lo,b,ft=f(()=>{B();lo=h.Symbol,b=lo});function mo(t){var e=uo.call(t,P),r=t[P];try{t[P]=void 0;var o=!0}catch{}var a=po.call(t);return o&&(e?t[P]=r:delete t[P]),a}var te,uo,po,P,ee,re=f(()=>{ft();te=Object.prototype,uo=te.hasOwnProperty,po=te.toString,P=b?b.toStringTag:void 0;ee=mo});function ho(t){return xo.call(t)}var co,xo,oe,ae=f(()=>{co=Object.prototype,xo=co.toString;oe=ho});function yo(t){return t==null?t===void 0?go:bo:se&&se in Object(t)?ee(t):oe(t)}var bo,go,se,g,R=f(()=>{ft();re();ae();bo="[object Null]",go="[object Undefined]",se=b?b.toStringTag:void 0;g=yo});function vo(t){return t!=null&&typeof t=="object"}var y,L=f(()=>{y=vo});var Oo,fe,ne=f(()=>{Oo=Array.isArray,fe=Oo});function wo(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var m,v=f(()=>{m=wo});function To(t){return t}var M,nt=f(()=>{M=To});function Eo(t){if(!m(t))return!1;var e=g(t);return e==jo||e==Io||e==Ao||e==Po}var Ao,jo,Io,Po,F,it=f(()=>{R();v();Ao="[object AsyncFunction]",jo="[object Function]",Io="[object GeneratorFunction]",Po="[object Proxy]";F=Eo});var So,W,ie=f(()=>{B();So=h["__core-js_shared__"],W=So});function _o(t){return!!le&&le in t}var le,ue,pe=f(()=>{ie();le=function(){var t=/[^.]+$/.exec(W&&W.keys&&W.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();ue=_o});function Bo(t){if(t!=null){try{return ko.call(t)}catch{}try{return t+""}catch{}}return""}var Co,ko,de,me=f(()=>{Co=Function.prototype,ko=Co.toString;de=Bo});function Do(t){if(!m(t)||ue(t))return!1;var e=F(t)?Ko:Lo;return e.test(de(t))}var Ro,Lo,Mo,Fo,Wo,No,Ko,ce,xe=f(()=>{it();pe();v();me();Ro=/[\\^$.*+?()[\]{}|]/g,Lo=/^\[object .+?Constructor\]$/,Mo=Function.prototype,Fo=Object.prototype,Wo=Mo.toString,No=Fo.hasOwnProperty,Ko=RegExp("^"+Wo.call(No).replace(Ro,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");ce=Do});function Vo(t,e){return t?.[e]}var he,be=f(()=>{he=Vo});function Uo(t,e){var r=he(t,e);return ce(r)?r:void 0}var ge,ye=f(()=>{xe();be();ge=Uo});function qo(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var ve,Oe=f(()=>{ve=qo});function Ho(t){var e=0,r=0;return function(){var o=Go(),a=$o-(o-r);if(r=o,a>0){if(++e>=zo)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var zo,$o,Go,we,Te=f(()=>{zo=800,$o=16,Go=Date.now;we=Ho});function Jo(t){return function(){return t}}var Ae,je=f(()=>{Ae=Jo});var Xo,O,lt=f(()=>{ye();Xo=function(){try{var t=ge(Object,"defineProperty");return t({},"",{}),t}catch{}}(),O=Xo});var Yo,Ie,Pe=f(()=>{je();lt();nt();Yo=O?function(t,e){return O(t,"toString",{configurable:!0,enumerable:!1,value:Ae(e),writable:!0})}:M,Ie=Yo});var Qo,Ee,Se=f(()=>{Pe();Te();Qo=we(Ie),Ee=Qo});function ea(t,e){var r=typeof t;return e=e??Zo,!!e&&(r=="number"||r!="symbol"&&ta.test(t))&&t>-1&&t%1==0&&t<e}var Zo,ta,N,ut=f(()=>{Zo=9007199254740991,ta=/^(?:0|[1-9]\d*)$/;N=ea});function ra(t,e,r){e=="__proto__"&&O?O(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var K,pt=f(()=>{lt();K=ra});function oa(t,e){return t===e||t!==t&&e!==e}var D,dt=f(()=>{D=oa});function fa(t,e,r){var o=t[e];(!(sa.call(t,e)&&D(o,r))||r===void 0&&!(e in t))&&K(t,e,r)}var aa,sa,_e,Ce=f(()=>{pt();dt();aa=Object.prototype,sa=aa.hasOwnProperty;_e=fa});function na(t,e,r,o){var a=!r;r||(r={});for(var s=-1,n=e.length;++s<n;){var i=e[s],u=o?o(r[i],t[i],i,r,t):void 0;u===void 0&&(u=t[i]),a?K(r,i,u):_e(r,i,u)}return r}var ke,Be=f(()=>{Ce();pt();ke=na});function ia(t,e,r){return e=Re(e===void 0?t.length-1:e,0),function(){for(var o=arguments,a=-1,s=Re(o.length-e,0),n=Array(s);++a<s;)n[a]=o[e+a];a=-1;for(var i=Array(e+1);++a<e;)i[a]=o[a];return i[e]=r(n),ve(t,this,i)}}var Re,Le,Me=f(()=>{Oe();Re=Math.max;Le=ia});function la(t,e){return Ee(Le(t,e,M),t+"")}var Fe,We=f(()=>{nt();Me();Se();Fe=la});function pa(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=ua}var ua,V,mt=f(()=>{ua=9007199254740991;V=pa});function da(t){return t!=null&&V(t.length)&&!F(t)}var U,ct=f(()=>{it();mt();U=da});function ma(t,e,r){if(!m(r))return!1;var o=typeof e;return(o=="number"?U(r)&&N(e,r.length):o=="string"&&e in r)?D(r[e],t):!1}var Ne,Ke=f(()=>{dt();ct();ut();v();Ne=ma});function ca(t){return Fe(function(e,r){var o=-1,a=r.length,s=a>1?r[a-1]:void 0,n=a>2?r[2]:void 0;for(s=t.length>3&&typeof s=="function"?(a--,s):void 0,n&&Ne(r[0],r[1],n)&&(s=a<3?void 0:s,a=1),e=Object(e);++o<a;){var i=r[o];i&&t(e,i,o,s)}return e})}var De,Ve=f(()=>{We();Ke();De=ca});function ha(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||xa;return t===r}var xa,Ue,qe=f(()=>{xa=Object.prototype;Ue=ha});function ba(t,e){for(var r=-1,o=Array(t);++r<t;)o[r]=e(r);return o}var ze,$e=f(()=>{ze=ba});function ya(t){return y(t)&&g(t)==ga}var ga,xt,Ge=f(()=>{R();L();ga="[object Arguments]";xt=ya});var He,va,Oa,wa,Je,Xe=f(()=>{Ge();L();He=Object.prototype,va=He.hasOwnProperty,Oa=He.propertyIsEnumerable,wa=xt(function(){return arguments}())?xt:function(t){return y(t)&&va.call(t,"callee")&&!Oa.call(t,"callee")},Je=wa});function Ta(){return!1}var Ye,Qe=f(()=>{Ye=Ta});var er,Ze,Aa,tr,ja,Ia,rr,or=f(()=>{B();Qe();er=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ze=er&&typeof module=="object"&&module&&!module.nodeType&&module,Aa=Ze&&Ze.exports===er,tr=Aa?h.Buffer:void 0,ja=tr?tr.isBuffer:void 0,Ia=ja||Ye,rr=Ia});function Ya(t){return y(t)&&V(t.length)&&!!l[g(t)]}var Pa,Ea,Sa,_a,Ca,ka,Ba,Ra,La,Ma,Fa,Wa,Na,Ka,Da,Va,Ua,qa,za,$a,Ga,Ha,Ja,Xa,l,ar,sr=f(()=>{R();mt();L();Pa="[object Arguments]",Ea="[object Array]",Sa="[object Boolean]",_a="[object Date]",Ca="[object Error]",ka="[object Function]",Ba="[object Map]",Ra="[object Number]",La="[object Object]",Ma="[object RegExp]",Fa="[object Set]",Wa="[object String]",Na="[object WeakMap]",Ka="[object ArrayBuffer]",Da="[object DataView]",Va="[object Float32Array]",Ua="[object Float64Array]",qa="[object Int8Array]",za="[object Int16Array]",$a="[object Int32Array]",Ga="[object Uint8Array]",Ha="[object Uint8ClampedArray]",Ja="[object Uint16Array]",Xa="[object Uint32Array]",l={};l[Va]=l[Ua]=l[qa]=l[za]=l[$a]=l[Ga]=l[Ha]=l[Ja]=l[Xa]=!0;l[Pa]=l[Ea]=l[Ka]=l[Sa]=l[Da]=l[_a]=l[Ca]=l[ka]=l[Ba]=l[Ra]=l[La]=l[Ma]=l[Fa]=l[Wa]=l[Na]=!1;ar=Ya});function Qa(t){return function(e){return t(e)}}var fr,nr=f(()=>{fr=Qa});var ir,E,Za,ht,ts,bt,lr=f(()=>{st();ir=typeof exports=="object"&&exports&&!exports.nodeType&&exports,E=ir&&typeof module=="object"&&module&&!module.nodeType&&module,Za=E&&E.exports===ir,ht=Za&&k.process,ts=function(){try{var t=E&&E.require&&E.require("util").types;return t||ht&&ht.binding&&ht.binding("util")}catch{}}(),bt=ts});var ur,es,pr,dr=f(()=>{sr();nr();lr();ur=bt&&bt.isTypedArray,es=ur?fr(ur):ar,pr=es});function as(t,e){var r=fe(t),o=!r&&Je(t),a=!r&&!o&&rr(t),s=!r&&!o&&!a&&pr(t),n=r||o||a||s,i=n?ze(t.length,String):[],u=i.length;for(var d in t)(e||os.call(t,d))&&!(n&&(d=="length"||a&&(d=="offset"||d=="parent")||s&&(d=="buffer"||d=="byteLength"||d=="byteOffset")||N(d,u)))&&i.push(d);return i}var rs,os,mr,cr=f(()=>{$e();Xe();ne();or();ut();dr();rs=Object.prototype,os=rs.hasOwnProperty;mr=as});function ss(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var xr,hr=f(()=>{xr=ss});function is(t){if(!m(t))return xr(t);var e=Ue(t),r=[];for(var o in t)o=="constructor"&&(e||!ns.call(t,o))||r.push(o);return r}var fs,ns,br,gr=f(()=>{v();qe();hr();fs=Object.prototype,ns=fs.hasOwnProperty;br=is});function ls(t){return U(t)?mr(t,!0):br(t)}var yr,vr=f(()=>{cr();gr();ct();yr=ls});var us,q,Or=f(()=>{Be();Ve();vr();us=De(function(t,e){ke(e,yr(e),t)}),q=us});var wr=f(()=>{Or()});var Tr=f(()=>{wr();v();});function Ar(t){z in t||(Object.defineProperty(t,z,{value:new Map}),Object.defineProperty(t,G,{value:new Map}),Object.defineProperty(t,$,{value:new Map}))}function ps(...t){let e=cs(...t),r=Array.from(this._bindings.keys()),o=r.length;if(!e.callback&&e.to.length>1)throw new p("observable-bind-to-no-callback: Binding multiple observables only possible with callback.");if(o>1&&e.callback)throw new p("observable-bind-to-extra-callback: Cannot bind multiple properties and use a callback in one binding.");e.to.forEach(a=>{if(a.properties.length&&a.properties.length!==o)throw new p("observable-bind-to-properties-length: The number of properties must match.");a.properties.length||(a.properties=this._bindProperties)}),this._to=e.to,e.callback&&(this._bindings.get(r[0]).callback=e.callback),bs(this._observable,this._to),hs(this),this._bindProperties.forEach(a=>{Er(this._observable,a)})}function ds(t,e,r){if(this._bindings.size>1)throw new p("observable-bind-to-many-not-one-binding: Cannot bind multiple properties with toMany().");this.to(...ms(t,e),r)}function ms(t,e){let r=t.map(o=>[o,e]);return Array.prototype.concat.apply([],r)}function jr(t){return t.every(e=>typeof e=="string")}function cs(...t){if(!t.length)throw new p("observable-bind-to-parse-error: Invalid argument syntax in `to()`.");let e={to:[]},r;return typeof t[t.length-1]=="function"&&(e.callback=t.pop()),t.forEach(o=>{if(typeof o=="string")r.properties.push(o);else if(typeof o=="object")r={observable:o,properties:[]},e.to.push(r);else throw new p("observable-bind-to-parse-error: Invalid argument syntax in `to()`.")}),e}function xs(t,e,r,o){let a=t[G],s=a.get(r),n=s||{};n[o]||(n[o]=new Set),n[o].add(e),s||a.set(r,n)}function hs(t){let e;t._bindings.forEach((r,o)=>{t._to.forEach(a=>{e=a.properties[r.callback?0:t._bindProperties.indexOf(o)],r.to.push([a.observable,e]),xs(t._observable,r,a.observable,e)})})}function Er(t,e){let o=t[$].get(e),a;o.callback?a=o.callback.apply(t,o.to.map(s=>s[0][s[1]])):(a=o.to[0],a=a[0][a[1]]),t.hasOwnProperty(e)?t[e]=a:t.set(e,a)}function bs(t,e){e.forEach(r=>{let o=t[G],a;o.get(r.observable)||t.listenTo(r.observable,"change",(s,n)=>{a=o.get(r.observable)[n],a&&a.forEach(i=>{Er(t,i.property)})})})}var z,G,$,Ir,Pr,Sr=f(()=>{Qt();Zt();Tr();z=Symbol("observableProperties"),G=Symbol("boundObservables"),$=Symbol("boundProperties"),Ir={set(t,e){if(m(t)){Object.keys(t).forEach(o=>{this.set(o,t[o])},this);return}Ar(this);let r=this[z];if(t in this&&!r.has(t))throw new p("observable-set-cannot-override: Cannot override an existing property.");Object.defineProperty(this,t,{enumerable:!0,configurable:!0,get(){return r.get(t)},set(o){let a=r.get(t),s=this.fire("set:"+t,t,o,a);s===void 0&&(s=o),(a!==s||!r.has(t))&&(r.set(t,s),this.fire("change:"+t,t,s,a))}}),this[t]=e},bind(...t){if(!t.length||!jr(t))throw new p("observable-bind-wrong-properties: All properties must be strings.");if(new Set(t).size!==t.length)throw new p("observable-bind-duplicate-properties: Properties must be unique.");Ar(this);let e=this[$];t.forEach(o=>{if(e.has(o))throw new p("observable-bind-rebind: Cannot bind the same property more that once.")});let r=new Map;return t.forEach(o=>{let a={property:o,to:[]};e.set(o,a),r.set(o,a)}),{to:ps,toMany:ds,_observable:this,_bindProperties:t,_to:[],_bindings:r}},unbind(...t){if(!(z in this))return;let e=this[$],r=this[G];if(t.length){if(!jr(t))throw new p("observable-unbind-wrong-properties: Properties must be strings.");t.forEach(o=>{let a=e.get(o);if(!a)return;let s,n,i,u;a.to.forEach(d=>{s=d[0],n=d[1],i=r.get(s),u=i[n],u.delete(a),u.size||delete i[n],Object.keys(i).length||(r.delete(s),this.stopListening(s,"change"))}),e.delete(o)})}else r.forEach((o,a)=>{this.stopListening(a,"change")}),r.clear(),e.clear()},decorate(t){let e=this[t];if(!e)throw new p("observablemixin-cannot-decorate-undefined: Cannot decorate an undefined method.",{object:this,methodName:t});this.on(t,(r,o)=>{r.return=e.apply(this,o)}),this[t]=function(...r){return this.fire(t,r)}}};q(Ir,Jt);Pr=Ir});function gt(t,...e){e.forEach(r=>{Object.getOwnPropertyNames(r).concat(Object.getOwnPropertySymbols(r)).forEach(o=>{if(o in t.prototype)return;let a=Object.getOwnPropertyDescriptor(r,o);a.enumerable=!1,Object.defineProperty(t.prototype,o,a)})})}var _r=f(()=>{});function Cr(t){t.return=!1,t.stop()}var w,kr=f(()=>{Sr();_r();w=class{constructor(e){this.editor=e,this.set("value",void 0),this.set("isEnabled",!1),this.decorate("execute"),this.listenTo(this.editor.model.document,"change",()=>{this.refresh()}),this.on("execute",r=>{this.isEnabled||r.stop()},{priority:"high"}),this.listenTo(e,"change:isReadOnly",(r,o,a)=>{a?(this.on("set:isEnabled",Cr,{priority:"highest"}),this.isEnabled=!1):(this.off("set:isEnabled",Cr),this.refresh())})}refresh(){this.isEnabled=!0}execute(){}destroy(){this.stopListening()}};gt(w,Pr)});var S,Br=f(()=>{kr();S=class extends w{constructor(e,r){super(e),this.attributeKey=r}refresh(){let e=this.editor.model,r=e.document;this.value=this._getValueFromFirstAllowedNode(),this.isEnabled=e.schema.checkAttributeInSelection(r.selection,this.attributeKey)}execute(e={}){let r=this.editor.model,a=r.document.selection,s=e.forceValue===void 0?!this.value:e.forceValue;r.change(n=>{if(a.isCollapsed)s?n.setSelectionAttribute(this.attributeKey,!0):n.removeSelectionAttribute(this.attributeKey);else{let i=r.schema.getValidRanges(a.getRanges(),this.attributeKey);for(let u of i)s?n.setAttribute(this.attributeKey,s,u):n.removeAttribute(this.attributeKey,u)}})}_getValueFromFirstAllowedNode(){let e=this.editor.model,r=e.schema,o=e.document.selection;if(o.isCollapsed)return o.hasAttribute(this.attributeKey);for(let a of o.getRanges())for(let s of a.getItems())if(r.checkAttribute(s,this.attributeKey))return s.hasAttribute(this.attributeKey);return!1}}});function yt(t){return function(r){return{init:()=>{r.model.schema.extend("$text",{allowAttributes:t}),r.conversion.attributeToElement({model:t,view:t}),r.commands.add(t,new S(r,t))}}}}var Rr=f(()=>{Br()});var Lr,Mr=f(()=>{Q();Rr();Lr=(t,e={})=>{let r=t.get("richtextToolbar"),o=t.get("config"),a="link";return Object.keys(e).forEach(s=>{let n=yt(s),i=e[s];o.set(s,j(n,s)),r.set(s,{commandName:s,component:A,callbackPropName:"onClick",icon:i.icon,hoverStyle:"brand",tooltip:i.tooltip||s,isVisible:u=>!!(u&&u.formatting&&u.formatting[s]),isActive:u=>!!(u&&u[s])},`after ${a}`),a=s}),o}});function gs(t,e){return e||(e=`{${t.toUpperCase()}}`),function(o){o.commands.add(t,ys(o,e))}}function ys(t,e){return{execute:()=>{t.model.change(r=>{let o=t.model.document.selection.getFirstPosition();r.insertText(e,o)})}}}var Fr,Wr=f(()=>{Fr=gs});var Nr,Kr=f(()=>{Q();Wr();Nr=(t,e)=>{let r=t.get("richtextToolbar"),o=t.get("config");Object.keys(e).forEach(a=>{let s=e[a],n=Fr(a,s.text);o.set(a,j(n,a)),r.set(a,{commandName:a,component:A,callbackPropName:"onClick",icon:s.icon,hoverStyle:"brand",tooltip:s.tooltip||a,isVisible:i=>!!(i&&i[a]),isActive:i=>!!(i&&i[a])},s.position||"end")})}});var ws={};var vs,Os,Dr=f(()=>{Ct();Mr();Kr();vs={code:{tooltip:"Code",icon:"code"}},Os={logo:{tooltip:"Base.Theme:Backend.Main:insertLogo",icon:"flag",text:"\u2691",position:"start"}};_t("Base.Theme:CkEditor",{},(t,{frontendConfiguration:e})=>{let r=t.get("ckEditor5");Lr(r,vs),Nr(r,Os)})});Dr();})();
//# sourceMappingURL=Plugin.js.map
