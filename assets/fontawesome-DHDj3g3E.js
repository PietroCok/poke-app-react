import{R as $t,P as g}from"./react-DkmqZLaq.js";/*!
 * Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */function Ie(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function Ya(e){if(Array.isArray(e))return e}function Ua(e){if(Array.isArray(e))return Ie(e)}function Ha(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Ga(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,Mt(r.key),r)}}function Ba(e,t,a){return t&&Ga(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function oe(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=He(e))||t){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(l){throw l},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var l=a.next();return o=l.done,l},e:function(l){s=!0,i=l},f:function(){try{o||a.return==null||a.return()}finally{if(s)throw i}}}}function b(e,t,a){return(t=Mt(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Xa(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Va(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,n,i,o,s=[],l=!0,u=!1;try{if(i=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;l=!1}else for(;!(l=(r=i.call(a)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(d){u=!0,n=d}finally{try{if(!l&&a.return!=null&&(o=a.return(),Object(o)!==o))return}finally{if(u)throw n}}return s}}function Ka(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ja(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function tt(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?tt(Object(a),!0).forEach(function(r){b(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):tt(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function me(e,t){return Ya(e)||Va(e,t)||He(e,t)||Ka()}function F(e){return Ua(e)||Xa(e)||He(e)||Ja()}function qa(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Mt(e){var t=qa(e,"string");return typeof t=="symbol"?t:t+""}function fe(e){"@babel/helpers - typeof";return fe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},fe(e)}function He(e,t){if(e){if(typeof e=="string")return Ie(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Ie(e,t):void 0}}var at=function(){},Ge={},Lt={},Rt=null,Dt={mark:at,measure:at};try{typeof window<"u"&&(Ge=window),typeof document<"u"&&(Lt=document),typeof MutationObserver<"u"&&(Rt=MutationObserver),typeof performance<"u"&&(Dt=performance)}catch{}var Qa=Ge.navigator||{},rt=Qa.userAgent,nt=rt===void 0?"":rt,R=Ge,w=Lt,it=Rt,ne=Dt;R.document;var _=!!w.documentElement&&!!w.head&&typeof w.addEventListener=="function"&&typeof w.createElement=="function",zt=~nt.indexOf("MSIE")||~nt.indexOf("Trident/"),be,Za=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,er=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Slab Press|Slab|Whiteboard)?.*/i,Wt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"}},tr={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Yt=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],P="classic",ee="duotone",Ut="sharp",Ht="sharp-duotone",Gt="chisel",Bt="etch",Xt="jelly",Vt="jelly-duo",Kt="jelly-fill",Jt="notdog",qt="notdog-duo",Qt="slab",Zt="slab-press",ea="thumbprint",ta="whiteboard",ar="Classic",rr="Duotone",nr="Sharp",ir="Sharp Duotone",or="Chisel",sr="Etch",lr="Jelly",fr="Jelly Duo",ur="Jelly Fill",cr="Notdog",dr="Notdog Duo",mr="Slab",vr="Slab Press",hr="Thumbprint",gr="Whiteboard",aa=[P,ee,Ut,Ht,Gt,Bt,Xt,Vt,Kt,Jt,qt,Qt,Zt,ea,ta];be={},b(b(b(b(b(b(b(b(b(b(be,P,ar),ee,rr),Ut,nr),Ht,ir),Gt,or),Bt,sr),Xt,lr),Vt,fr),Kt,ur),Jt,cr),b(b(b(b(b(be,qt,dr),Qt,mr),Zt,vr),ea,hr),ta,gr);var pr={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"}},br={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"}},yr=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),xr={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},whiteboard:{semibold:"fawsb"}},ra=["fak","fa-kit","fakd","fa-kit-duotone"],ot={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Ar=["kit"],wr="kit",Sr="kit-duotone",kr="Kit",Pr="Kit Duotone";b(b({},wr,kr),Sr,Pr);var Ir={kit:{"fa-kit":"fak"}},Or={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Er={kit:{fak:"fa-kit"}},st={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},ye,ie={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Fr=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],jr="classic",Cr="duotone",Nr="sharp",Tr="sharp-duotone",_r="chisel",$r="etch",Mr="jelly",Lr="jelly-duo",Rr="jelly-fill",Dr="notdog",zr="notdog-duo",Wr="slab",Yr="slab-press",Ur="thumbprint",Hr="whiteboard",Gr="Classic",Br="Duotone",Xr="Sharp",Vr="Sharp Duotone",Kr="Chisel",Jr="Etch",qr="Jelly",Qr="Jelly Duo",Zr="Jelly Fill",en="Notdog",tn="Notdog Duo",an="Slab",rn="Slab Press",nn="Thumbprint",on="Whiteboard";ye={},b(b(b(b(b(b(b(b(b(b(ye,jr,Gr),Cr,Br),Nr,Xr),Tr,Vr),_r,Kr),$r,Jr),Mr,qr),Lr,Qr),Rr,Zr),Dr,en),b(b(b(b(b(ye,zr,tn),Wr,an),Yr,rn),Ur,nn),Hr,on);var sn="kit",ln="kit-duotone",fn="Kit",un="Kit Duotone";b(b({},sn,fn),ln,un);var cn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"}},dn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"]},Oe={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"}},mn=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],na=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr"].concat(Fr,mn),vn=["solid","regular","light","thin","duotone","brands","semibold"],ia=[1,2,3,4,5,6,7,8,9,10],hn=ia.concat([11,12,13,14,15,16,17,18,19,20]),gn=["aw","fw","pull-left","pull-right"],pn=[].concat(F(Object.keys(dn)),vn,gn,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",ie.GROUP,ie.SWAP_OPACITY,ie.PRIMARY,ie.SECONDARY]).concat(ia.map(function(e){return"".concat(e,"x")})).concat(hn.map(function(e){return"w-".concat(e)})),bn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},N="___FONT_AWESOME___",Ee=16,oa="fa",sa="svg-inline--fa",Y="data-fa-i2svg",Fe="data-fa-pseudo-element",yn="data-fa-pseudo-element-pending",Be="data-prefix",Xe="data-icon",lt="fontawesome-i2svg",xn="async",An=["HTML","HEAD","STYLE","SCRIPT"],la=["::before","::after",":before",":after"],fa=function(){try{return!0}catch{return!1}}();function te(e){return new Proxy(e,{get:function(a,r){return r in a?a[r]:a[P]}})}var ua=f({},Wt);ua[P]=f(f(f(f({},{"fa-duotone":"duotone"}),Wt[P]),ot.kit),ot["kit-duotone"]);var wn=te(ua),je=f({},xr);je[P]=f(f(f(f({},{duotone:"fad"}),je[P]),st.kit),st["kit-duotone"]);var ft=te(je),Ce=f({},Oe);Ce[P]=f(f({},Ce[P]),Er.kit);var ca=te(Ce),Ne=f({},cn);Ne[P]=f(f({},Ne[P]),Ir.kit);te(Ne);var Sn=Za,da="fa-layers-text",kn=er,Pn=f({},pr);te(Pn);var In=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],xe=tr,On=[].concat(F(Ar),F(pn)),q=R.FontAwesomeConfig||{};function En(e){var t=w.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Fn(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(w&&typeof w.querySelector=="function"){var jn=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];jn.forEach(function(e){var t=me(e,2),a=t[0],r=t[1],n=Fn(En(a));n!=null&&(q[r]=n)})}var ma={styleDefault:"solid",familyDefault:P,cssPrefix:oa,replacementClass:sa,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};q.familyPrefix&&(q.cssPrefix=q.familyPrefix);var V=f(f({},ma),q);V.autoReplaceSvg||(V.observeMutations=!1);var m={};Object.keys(ma).forEach(function(e){Object.defineProperty(m,e,{enumerable:!0,set:function(a){V[e]=a,Q.forEach(function(r){return r(m)})},get:function(){return V[e]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){V.cssPrefix=t,Q.forEach(function(a){return a(m)})},get:function(){return V.cssPrefix}});R.FontAwesomeConfig=m;var Q=[];function Cn(e){return Q.push(e),function(){Q.splice(Q.indexOf(e),1)}}var G=Ee,C={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Nn(e){if(!(!e||!_)){var t=w.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=w.head.childNodes,r=null,n=a.length-1;n>-1;n--){var i=a[n],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return w.head.insertBefore(t,r),e}}var Tn="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ut(){for(var e=12,t="";e-- >0;)t+=Tn[Math.random()*62|0];return t}function K(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function Ve(e){return e.classList?K(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function va(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function _n(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(va(e[a]),'" ')},"").trim()}function ve(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function Ke(e){return e.size!==C.size||e.x!==C.x||e.y!==C.y||e.rotate!==C.rotate||e.flipX||e.flipY}function $n(e){var t=e.transform,a=e.containerWidth,r=e.iconWidth,n={transform:"translate(".concat(a/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:n,inner:l,path:u}}function Mn(e){var t=e.transform,a=e.width,r=a===void 0?Ee:a,n=e.height,i=n===void 0?Ee:n,o="";return zt?o+="translate(".concat(t.x/G-r/2,"em, ").concat(t.y/G-i/2,"em) "):o+="translate(calc(-50% + ".concat(t.x/G,"em), calc(-50% + ").concat(t.y/G,"em)) "),o+="scale(".concat(t.size/G*(t.flipX?-1:1),", ").concat(t.size/G*(t.flipY?-1:1),") "),o+="rotate(".concat(t.rotate,"deg) "),o}var Ln=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}`;function ha(){var e=oa,t=sa,a=m.cssPrefix,r=m.replacementClass,n=Ln;if(a!==e||r!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");n=n.replace(i,".".concat(a,"-")).replace(o,"--".concat(a,"-")).replace(s,".".concat(r))}return n}var ct=!1;function Ae(){m.autoAddCss&&!ct&&(Nn(ha()),ct=!0)}var Rn={mixout:function(){return{dom:{css:ha,insertCss:Ae}}},hooks:function(){return{beforeDOMElementCreation:function(){Ae()},beforeI2svg:function(){Ae()}}}},T=R||{};T[N]||(T[N]={});T[N].styles||(T[N].styles={});T[N].hooks||(T[N].hooks={});T[N].shims||(T[N].shims=[]);var E=T[N],ga=[],pa=function(){w.removeEventListener("DOMContentLoaded",pa),ue=1,ga.map(function(t){return t()})},ue=!1;_&&(ue=(w.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(w.readyState),ue||w.addEventListener("DOMContentLoaded",pa));function Dn(e){_&&(ue?setTimeout(e,0):ga.push(e))}function ae(e){var t=e.tag,a=e.attributes,r=a===void 0?{}:a,n=e.children,i=n===void 0?[]:n;return typeof e=="string"?va(e):"<".concat(t," ").concat(_n(r),">").concat(i.map(ae).join(""),"</").concat(t,">")}function dt(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var we=function(t,a,r,n){var i=Object.keys(t),o=i.length,s=a,l,u,d;for(r===void 0?(l=1,d=t[i[0]]):(l=0,d=r);l<o;l++)u=i[l],d=s(d,t[u],u,t);return d};function ba(e){return F(e).length!==1?null:e.codePointAt(0).toString(16)}function mt(e){return Object.keys(e).reduce(function(t,a){var r=e[a],n=!!r.icon;return n?t[r.iconName]=r.icon:t[a]=r,t},{})}function ya(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,n=r===void 0?!1:r,i=mt(t);typeof E.hooks.addPack=="function"&&!n?E.hooks.addPack(e,mt(t)):E.styles[e]=f(f({},E.styles[e]||{}),i),e==="fas"&&ya("fa",t)}var Z=E.styles,zn=E.shims,xa=Object.keys(ca),Wn=xa.reduce(function(e,t){return e[t]=Object.keys(ca[t]),e},{}),Je=null,Aa={},wa={},Sa={},ka={},Pa={};function Yn(e){return~On.indexOf(e)}function Un(e,t){var a=t.split("-"),r=a[0],n=a.slice(1).join("-");return r===e&&n!==""&&!Yn(n)?n:null}var Ia=function(){var t=function(i){return we(Z,function(o,s,l){return o[l]=we(s,i,{}),o},{})};Aa=t(function(n,i,o){if(i[3]&&(n[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){n[l.toString(16)]=o})}return n}),wa=t(function(n,i,o){if(n[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){n[l]=o})}return n}),Pa=t(function(n,i,o){var s=i[2];return n[o]=o,s.forEach(function(l){n[l]=o}),n});var a="far"in Z||m.autoFetchSvg,r=we(zn,function(n,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!a&&(s="fas"),typeof o=="string"&&(n.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(n.unicodes[o.toString(16)]={prefix:s,iconName:l}),n},{names:{},unicodes:{}});Sa=r.names,ka=r.unicodes,Je=he(m.styleDefault,{family:m.familyDefault})};Cn(function(e){Je=he(e.styleDefault,{family:m.familyDefault})});Ia();function qe(e,t){return(Aa[e]||{})[t]}function Hn(e,t){return(wa[e]||{})[t]}function W(e,t){return(Pa[e]||{})[t]}function Oa(e){return Sa[e]||{prefix:null,iconName:null}}function Gn(e){var t=ka[e],a=qe("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function D(){return Je}var Ea=function(){return{prefix:null,iconName:null,rest:[]}};function Bn(e){var t=P,a=xa.reduce(function(r,n){return r[n]="".concat(m.cssPrefix,"-").concat(n),r},{});return aa.forEach(function(r){(e.includes(a[r])||e.some(function(n){return Wn[r].includes(n)}))&&(t=r)}),t}function he(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,r=a===void 0?P:a,n=wn[r][e];if(r===ee&&!e)return"fad";var i=ft[r][e]||ft[r][n],o=e in E.styles?e:null,s=i||o||null;return s}function Xn(e){var t=[],a=null;return e.forEach(function(r){var n=Un(m.cssPrefix,r);n?a=n:r&&t.push(r)}),{iconName:a,rest:t}}function vt(e){return e.sort().filter(function(t,a,r){return r.indexOf(t)===a})}var ht=na.concat(ra);function ge(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,r=a===void 0?!1:a,n=null,i=vt(e.filter(function(h){return ht.includes(h)})),o=vt(e.filter(function(h){return!ht.includes(h)})),s=i.filter(function(h){return n=h,!Yt.includes(h)}),l=me(s,1),u=l[0],d=u===void 0?null:u,c=Bn(i),v=f(f({},Xn(o)),{},{prefix:he(d,{family:c})});return f(f(f({},v),qn({values:e,family:c,styles:Z,config:m,canonical:v,givenPrefix:n})),Vn(r,n,v))}function Vn(e,t,a){var r=a.prefix,n=a.iconName;if(e||!r||!n)return{prefix:r,iconName:n};var i=t==="fa"?Oa(n):{},o=W(r,n);return n=i.iconName||o||n,r=i.prefix||r,r==="far"&&!Z.far&&Z.fas&&!m.autoFetchSvg&&(r="fas"),{prefix:r,iconName:n}}var Kn=aa.filter(function(e){return e!==P||e!==ee}),Jn=Object.keys(Oe).filter(function(e){return e!==P}).map(function(e){return Object.keys(Oe[e])}).flat();function qn(e){var t=e.values,a=e.family,r=e.canonical,n=e.givenPrefix,i=n===void 0?"":n,o=e.styles,s=o===void 0?{}:o,l=e.config,u=l===void 0?{}:l,d=a===ee,c=t.includes("fa-duotone")||t.includes("fad"),v=u.familyDefault==="duotone",h=r.prefix==="fad"||r.prefix==="fa-duotone";if(!d&&(c||v||h)&&(r.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab"),!r.prefix&&Kn.includes(a)){var x=Object.keys(s).find(function(A){return Jn.includes(A)});if(x||u.autoFetchSvg){var p=yr.get(a).defaultShortPrefixId;r.prefix=p,r.iconName=W(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||i==="fa")&&(r.prefix=D()||"fas"),r}var Qn=function(){function e(){Ha(this,e),this.definitions={}}return Ba(e,[{key:"add",value:function(){for(var a=this,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];var o=n.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){a.definitions[s]=f(f({},a.definitions[s]||{}),o[s]),ya(s,o[s]),Ia()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var n=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(n).map(function(i){var o=n[i],s=o.prefix,l=o.iconName,u=o.icon,d=u[2];a[s]||(a[s]={}),d.length>0&&d.forEach(function(c){typeof c=="string"&&(a[s][c]=u)}),a[s][l]=u}),a}}])}(),gt=[],B={},X={},Zn=Object.keys(X);function ei(e,t){var a=t.mixoutsTo;return gt=e,B={},Object.keys(X).forEach(function(r){Zn.indexOf(r)===-1&&delete X[r]}),gt.forEach(function(r){var n=r.mixout?r.mixout():{};if(Object.keys(n).forEach(function(o){typeof n[o]=="function"&&(a[o]=n[o]),fe(n[o])==="object"&&Object.keys(n[o]).forEach(function(s){a[o]||(a[o]={}),a[o][s]=n[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){B[o]||(B[o]=[]),B[o].push(i[o])})}r.provides&&r.provides(X)}),a}function Te(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];var i=B[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(r))}),t}function U(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var n=B[e]||[];n.forEach(function(i){i.apply(null,a)})}function z(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return X[e]?X[e].apply(null,t):void 0}function _e(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||D();if(t)return t=W(a,t)||t,dt(Fa.definitions,a,t)||dt(E.styles,a,t)}var Fa=new Qn,ti=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,U("noAuto")},ai={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return _?(U("beforeI2svg",t),z("pseudoElements2svg",t),z("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Dn(function(){ni({autoReplaceSvgRoot:a}),U("watch",t)})}},ri={icon:function(t){if(t===null)return null;if(fe(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:W(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=he(t[0]);return{prefix:r,iconName:W(r,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match(Sn))){var n=ge(t.split(" "),{skipLookups:!0});return{prefix:n.prefix||D(),iconName:W(n.prefix,n.iconName)||n.iconName}}if(typeof t=="string"){var i=D();return{prefix:i,iconName:W(i,t)||t}}}},I={noAuto:ti,config:m,dom:ai,parse:ri,library:Fa,findIconDefinition:_e,toHtml:ae},ni=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,r=a===void 0?w:a;(Object.keys(E.styles).length>0||m.autoFetchSvg)&&_&&m.autoReplaceSvg&&I.dom.i2svg({node:r})};function pe(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return ae(r)})}}),Object.defineProperty(e,"node",{get:function(){if(_){var r=w.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function ii(e){var t=e.children,a=e.main,r=e.mask,n=e.attributes,i=e.styles,o=e.transform;if(Ke(o)&&a.found&&!r.found){var s=a.width,l=a.height,u={x:s/l/2,y:.5};n.style=ve(f(f({},i),{},{"transform-origin":"".concat(u.x+o.x/16,"em ").concat(u.y+o.y/16,"em")}))}return[{tag:"svg",attributes:n,children:t}]}function oi(e){var t=e.prefix,a=e.iconName,r=e.children,n=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(m.cssPrefix,"-").concat(a):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},n),{},{id:o}),children:r}]}]}function si(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function Qe(e){var t=e.icons,a=t.main,r=t.mask,n=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.maskId,u=e.extra,d=e.watchable,c=d===void 0?!1:d,v=r.found?r:a,h=v.width,x=v.height,p=[m.replacementClass,i?"".concat(m.cssPrefix,"-").concat(i):""].filter(function(O){return u.classes.indexOf(O)===-1}).filter(function(O){return O!==""||!!O}).concat(u.classes).join(" "),A={children:[],attributes:f(f({},u.attributes),{},{"data-prefix":n,"data-icon":i,class:p,role:u.attributes.role||"img",viewBox:"0 0 ".concat(h," ").concat(x)})};!si(u.attributes)&&!u.attributes["aria-hidden"]&&(A.attributes["aria-hidden"]="true"),c&&(A.attributes[Y]="");var y=f(f({},A),{},{prefix:n,iconName:i,main:a,mask:r,maskId:l,transform:o,symbol:s,styles:f({},u.styles)}),S=r.found&&a.found?z("generateAbstractMask",y)||{children:[],attributes:{}}:z("generateAbstractIcon",y)||{children:[],attributes:{}},k=S.children,$=S.attributes;return y.children=k,y.attributes=$,s?oi(y):ii(y)}function pt(e){var t=e.content,a=e.width,r=e.height,n=e.transform,i=e.extra,o=e.watchable,s=o===void 0?!1:o,l=f(f({},i.attributes),{},{class:i.classes.join(" ")});s&&(l[Y]="");var u=f({},i.styles);Ke(n)&&(u.transform=Mn({transform:n,width:a,height:r}),u["-webkit-transform"]=u.transform);var d=ve(u);d.length>0&&(l.style=d);var c=[];return c.push({tag:"span",attributes:l,children:[t]}),c}function li(e){var t=e.content,a=e.extra,r=f(f({},a.attributes),{},{class:a.classes.join(" ")}),n=ve(a.styles);n.length>0&&(r.style=n);var i=[];return i.push({tag:"span",attributes:r,children:[t]}),i}var Se=E.styles;function $e(e){var t=e[0],a=e[1],r=e.slice(4),n=me(r,1),i=n[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(xe.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(xe.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(xe.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:a,icon:o}}var fi={found:!1,width:512,height:512};function ui(e,t){!fa&&!m.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Me(e,t){var a=t;return t==="fa"&&m.styleDefault!==null&&(t=D()),new Promise(function(r,n){if(a==="fa"){var i=Oa(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&Se[t]&&Se[t][e]){var o=Se[t][e];return r($e(o))}ui(e,t),r(f(f({},fi),{},{icon:m.showMissingIcons&&e?z("missingIconAbstract")||{}:{}}))})}var bt=function(){},Le=m.measurePerformance&&ne&&ne.mark&&ne.measure?ne:{mark:bt,measure:bt},J='FA "7.0.0"',ci=function(t){return Le.mark("".concat(J," ").concat(t," begins")),function(){return ja(t)}},ja=function(t){Le.mark("".concat(J," ").concat(t," ends")),Le.measure("".concat(J," ").concat(t),"".concat(J," ").concat(t," begins"),"".concat(J," ").concat(t," ends"))},Ze={begin:ci,end:ja},se=function(){};function yt(e){var t=e.getAttribute?e.getAttribute(Y):null;return typeof t=="string"}function di(e){var t=e.getAttribute?e.getAttribute(Be):null,a=e.getAttribute?e.getAttribute(Xe):null;return t&&a}function mi(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(m.replacementClass)}function vi(){if(m.autoReplaceSvg===!0)return le.replace;var e=le[m.autoReplaceSvg];return e||le.replace}function hi(e){return w.createElementNS("http://www.w3.org/2000/svg",e)}function gi(e){return w.createElement(e)}function Ca(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,r=a===void 0?e.tag==="svg"?hi:gi:a;if(typeof e=="string")return w.createTextNode(e);var n=r(e.tag);Object.keys(e.attributes||[]).forEach(function(o){n.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){n.appendChild(Ca(o,{ceFn:r}))}),n}function pi(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var le={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(n){a.parentNode.insertBefore(Ca(n),a)}),a.getAttribute(Y)===null&&m.keepOriginalSource){var r=w.createComment(pi(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(t){var a=t[0],r=t[1];if(~Ve(a).indexOf(m.replacementClass))return le.replace(t);var n=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,l){return l===m.replacementClass||l.match(n)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return ae(s)}).join(`
`);a.setAttribute(Y,""),a.innerHTML=o}};function xt(e){e()}function Na(e,t){var a=typeof t=="function"?t:se;if(e.length===0)a();else{var r=xt;m.mutateApproach===xn&&(r=R.requestAnimationFrame||xt),r(function(){var n=vi(),i=Ze.begin("mutate");e.map(n),i(),a()})}}var et=!1;function Ta(){et=!0}function Re(){et=!1}var ce=null;function At(e){if(it&&m.observeMutations){var t=e.treeCallback,a=t===void 0?se:t,r=e.nodeCallback,n=r===void 0?se:r,i=e.pseudoElementsCallback,o=i===void 0?se:i,s=e.observeMutationsRoot,l=s===void 0?w:s;ce=new it(function(u){if(!et){var d=D();K(u).forEach(function(c){if(c.type==="childList"&&c.addedNodes.length>0&&!yt(c.addedNodes[0])&&(m.searchPseudoElements&&o(c.target),a(c.target)),c.type==="attributes"&&c.target.parentNode&&m.searchPseudoElements&&o([c.target],!0),c.type==="attributes"&&yt(c.target)&&~In.indexOf(c.attributeName))if(c.attributeName==="class"&&di(c.target)){var v=ge(Ve(c.target)),h=v.prefix,x=v.iconName;c.target.setAttribute(Be,h||d),x&&c.target.setAttribute(Xe,x)}else mi(c.target)&&n(c.target)})}}),_&&ce.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function bi(){ce&&ce.disconnect()}function yi(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(r,n){var i=n.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),a}function xi(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",n=ge(Ve(e));return n.prefix||(n.prefix=D()),t&&a&&(n.prefix=t,n.iconName=a),n.iconName&&n.prefix||(n.prefix&&r.length>0&&(n.iconName=Hn(n.prefix,e.innerText)||qe(n.prefix,ba(e.innerText))),!n.iconName&&m.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(n.iconName=e.firstChild.data)),n}function Ai(e){var t=K(e.attributes).reduce(function(a,r){return a.name!=="class"&&a.name!=="style"&&(a[r.name]=r.value),a},{});return t}function wi(){return{iconName:null,prefix:null,transform:C,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function wt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=xi(e),r=a.iconName,n=a.prefix,i=a.rest,o=Ai(e),s=Te("parseNodeAttributes",{},e),l=t.styleParser?yi(e):[];return f({iconName:r,prefix:n,transform:C,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var Si=E.styles;function _a(e){var t=m.autoReplaceSvg==="nest"?wt(e,{styleParser:!1}):wt(e);return~t.extra.classes.indexOf(da)?z("generateLayersText",e,t):z("generateSvgReplacementMutation",e,t)}function ki(){return[].concat(F(ra),F(na))}function St(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!_)return Promise.resolve();var a=w.documentElement.classList,r=function(c){return a.add("".concat(lt,"-").concat(c))},n=function(c){return a.remove("".concat(lt,"-").concat(c))},i=m.autoFetchSvg?ki():Yt.concat(Object.keys(Si));i.includes("fa")||i.push("fa");var o=[".".concat(da,":not([").concat(Y,"])")].concat(i.map(function(d){return".".concat(d,":not([").concat(Y,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=K(e.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),n("complete");else return Promise.resolve();var l=Ze.begin("onTree"),u=s.reduce(function(d,c){try{var v=_a(c);v&&d.push(v)}catch(h){fa||h.name==="MissingIcon"&&console.error(h)}return d},[]);return new Promise(function(d,c){Promise.all(u).then(function(v){Na(v,function(){r("active"),r("complete"),n("pending"),typeof t=="function"&&t(),l(),d()})}).catch(function(v){l(),c(v)})})}function Pi(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;_a(e).then(function(a){a&&Na([a],t)})}function Ii(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:_e(t||{}),n=a.mask;return n&&(n=(n||{}).icon?n:_e(n||{})),e(r,f(f({},a),{},{mask:n}))}}var Oi=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,n=r===void 0?C:r,i=a.symbol,o=i===void 0?!1:i,s=a.mask,l=s===void 0?null:s,u=a.maskId,d=u===void 0?null:u,c=a.classes,v=c===void 0?[]:c,h=a.attributes,x=h===void 0?{}:h,p=a.styles,A=p===void 0?{}:p;if(t){var y=t.prefix,S=t.iconName,k=t.icon;return pe(f({type:"icon"},t),function(){return U("beforeDOMElementCreation",{iconDefinition:t,params:a}),Qe({icons:{main:$e(k),mask:l?$e(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:y,iconName:S,transform:f(f({},C),n),symbol:o,maskId:d,extra:{attributes:x,styles:A,classes:v}})})}},Ei={mixout:function(){return{icon:Ii(Oi)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=St,a.nodeCallback=Pi,a}}},provides:function(t){t.i2svg=function(a){var r=a.node,n=r===void 0?w:r,i=a.callback,o=i===void 0?function(){}:i;return St(n,o)},t.generateSvgReplacementMutation=function(a,r){var n=r.iconName,i=r.prefix,o=r.transform,s=r.symbol,l=r.mask,u=r.maskId,d=r.extra;return new Promise(function(c,v){Promise.all([Me(n,i),l.iconName?Me(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(h){var x=me(h,2),p=x[0],A=x[1];c([a,Qe({icons:{main:p,mask:A},prefix:i,iconName:n,transform:o,symbol:s,maskId:u,extra:d,watchable:!0})])}).catch(v)})},t.generateAbstractIcon=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.transform,s=a.styles,l=ve(s);l.length>0&&(n.style=l);var u;return Ke(o)&&(u=z("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(u||i.icon),{children:r,attributes:n}}}},Fi={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.classes,i=n===void 0?[]:n;return pe({type:"layer"},function(){U("beforeDOMElementCreation",{assembler:a,params:r});var o=[];return a(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(F(i)).join(" ")},children:o}]})}}}},ji={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var n=r.classes,i=n===void 0?[]:n,o=r.attributes,s=o===void 0?{}:o,l=r.styles,u=l===void 0?{}:l;return pe({type:"counter",content:a},function(){return U("beforeDOMElementCreation",{content:a,params:r}),li({content:a.toString(),extra:{attributes:s,styles:u,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(F(i))}})})}}}},Ci={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.transform,i=n===void 0?C:n,o=r.classes,s=o===void 0?[]:o,l=r.attributes,u=l===void 0?{}:l,d=r.styles,c=d===void 0?{}:d;return pe({type:"text",content:a},function(){return U("beforeDOMElementCreation",{content:a,params:r}),pt({content:a,transform:f(f({},C),i),extra:{attributes:u,styles:c,classes:["".concat(m.cssPrefix,"-layers-text")].concat(F(s))}})})}}},provides:function(t){t.generateLayersText=function(a,r){var n=r.transform,i=r.extra,o=null,s=null;if(zt){var l=parseInt(getComputedStyle(a).fontSize,10),u=a.getBoundingClientRect();o=u.width/l,s=u.height/l}return Promise.resolve([a,pt({content:a.innerHTML,width:o,height:s,transform:n,extra:i,watchable:!0})])}}},$a=new RegExp('"',"ug"),kt=[1105920,1112319],Pt=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),br),bn),Or),De=Object.keys(Pt).reduce(function(e,t){return e[t.toLowerCase()]=Pt[t],e},{}),Ni=Object.keys(De).reduce(function(e,t){var a=De[t];return e[t]=a[900]||F(Object.entries(a))[0][1],e},{});function Ti(e){var t=e.replace($a,"");return ba(F(t)[0]||"")}function _i(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),r=a.replace($a,""),n=r.codePointAt(0),i=n>=kt[0]&&n<=kt[1],o=r.length===2?r[0]===r[1]:!1;return i||o||t}function $i(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),n=isNaN(r)?"normal":r;return(De[a]||{})[n]||Ni[a]}function It(e,t){var a="".concat(yn).concat(t.replace(":","-"));return new Promise(function(r,n){if(e.getAttribute(a)!==null)return r();var i=K(e.children),o=i.filter(function(H){return H.getAttribute(Fe)===t})[0],s=R.getComputedStyle(e,t),l=s.getPropertyValue("font-family"),u=l.match(kn),d=s.getPropertyValue("font-weight"),c=s.getPropertyValue("content");if(o&&!u)return e.removeChild(o),r();if(u&&c!=="none"&&c!==""){var v=s.getPropertyValue("content"),h=$i(l,d),x=Ti(v),p=u[0].startsWith("FontAwesome"),A=_i(s),y=qe(h,x),S=y;if(p){var k=Gn(x);k.iconName&&k.prefix&&(y=k.iconName,h=k.prefix)}if(y&&!A&&(!o||o.getAttribute(Be)!==h||o.getAttribute(Xe)!==S)){e.setAttribute(a,S),o&&e.removeChild(o);var $=wi(),O=$.extra;O.attributes[Fe]=t,Me(y,h).then(function(H){var re=Qe(f(f({},$),{},{icons:{main:H,mask:Ea()},prefix:h,iconName:S,extra:O,watchable:!0})),M=w.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(M,e.firstChild):e.appendChild(M),M.outerHTML=re.map(function(Wa){return ae(Wa)}).join(`
`),e.removeAttribute(a),r()}).catch(n)}else r()}else r()})}function Mi(e){return Promise.all([It(e,"::before"),It(e,"::after")])}function Li(e){return e.parentNode!==document.head&&!~An.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Fe)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var Ri=function(t){return!!t&&la.some(function(a){return t.includes(a)})},Di=function(t){if(!t)return[];for(var a=new Set,r=[t],n=[/(?=\s:)/,new RegExp("(?<=\\)\\)?[^,]*,)")],i=function(){var h=s[o];r=r.flatMap(function(x){return x.split(h).map(function(p){return p.replace(/,\s*$/,"").trim()})})},o=0,s=n;o<s.length;o++)i();r=r.flatMap(function(v){return v.includes("(")?v:v.split(",").map(function(h){return h.trim()})});var l=oe(r),u;try{for(l.s();!(u=l.n()).done;){var d=u.value;if(Ri(d)){var c=la.reduce(function(v,h){return v.replace(h,"")},d);c!==""&&c!=="*"&&a.add(c)}}}catch(v){l.e(v)}finally{l.f()}return a};function Ot(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(_){var a;if(t)a=e;else if(m.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var r=new Set,n=oe(document.styleSheets),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;try{var s=oe(o.cssRules),l;try{for(s.s();!(l=s.n()).done;){var u=l.value,d=Di(u.selectorText),c=oe(d),v;try{for(c.s();!(v=c.n()).done;){var h=v.value;r.add(h)}}catch(p){c.e(p)}finally{c.f()}}}catch(p){s.e(p)}finally{s.f()}}catch(p){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(o.href," (").concat(p.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(p){n.e(p)}finally{n.f()}if(!r.size)return;var x=Array.from(r).join(", ");try{a=e.querySelectorAll(x)}catch{}}return new Promise(function(p,A){var y=K(a).filter(Li).map(Mi),S=Ze.begin("searchPseudoElements");Ta(),Promise.all(y).then(function(){S(),Re(),p()}).catch(function(){S(),Re(),A()})})}}var zi={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=Ot,a}}},provides:function(t){t.pseudoElements2svg=function(a){var r=a.node,n=r===void 0?w:r;m.searchPseudoElements&&Ot(n)}}},Et=!1,Wi={mixout:function(){return{dom:{unwatch:function(){Ta(),Et=!0}}}},hooks:function(){return{bootstrap:function(){At(Te("mutationObserverCallbacks",{}))},noAuto:function(){bi()},watch:function(a){var r=a.observeMutationsRoot;Et?Re():At(Te("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Ft=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,n){var i=n.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},a)},Yi={mixout:function(){return{parse:{transform:function(a){return Ft(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-transform");return n&&(a.transform=Ft(n)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var r=a.main,n=a.transform,i=a.containerWidth,o=a.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(n.x*32,", ").concat(n.y*32,") "),u="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),d="rotate(".concat(n.rotate," 0 0)"),c={transform:"".concat(l," ").concat(u," ").concat(d)},v={transform:"translate(".concat(o/2*-1," -256)")},h={outer:s,inner:c,path:v};return{tag:"g",attributes:f({},h.outer),children:[{tag:"g",attributes:f({},h.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:f(f({},r.icon.attributes),h.path)}]}]}}}},ke={x:0,y:0,width:"100%",height:"100%"};function jt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Ui(e){return e.tag==="g"?e.children:[e]}var Hi={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-mask"),i=n?ge(n.split(" ").map(function(o){return o.trim()})):Ea();return i.prefix||(i.prefix=D()),a.mask=i,a.maskId=r.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.mask,s=a.maskId,l=a.transform,u=i.width,d=i.icon,c=o.width,v=o.icon,h=$n({transform:l,containerWidth:c,iconWidth:u}),x={tag:"rect",attributes:f(f({},ke),{},{fill:"white"})},p=d.children?{children:d.children.map(jt)}:{},A={tag:"g",attributes:f({},h.inner),children:[jt(f({tag:d.tag,attributes:f(f({},d.attributes),h.path)},p))]},y={tag:"g",attributes:f({},h.outer),children:[A]},S="mask-".concat(s||ut()),k="clip-".concat(s||ut()),$={tag:"mask",attributes:f(f({},ke),{},{id:S,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[x,y]},O={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:Ui(v)},$]};return r.push(O,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(S,")")},ke)}),{children:r,attributes:n}}}},Gi={provides:function(t){var a=!1;R.matchMedia&&(a=R.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],n={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:f(f({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=f(f({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||s.children.push({tag:"animate",attributes:f(f({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:f(f({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:f(f({},o),{},{values:"1;0;0;0;0;1;"})}]}),a||r.push({tag:"path",attributes:f(f({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Bi={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-symbol"),i=n===null?!1:n===""?!0:n;return a.symbol=i,a}}}},Xi=[Rn,Ei,Fi,ji,Ci,zi,Wi,Yi,Hi,Gi,Bi];ei(Xi,{mixoutsTo:I});I.noAuto;I.config;I.library;I.dom;var ze=I.parse;I.findIconDefinition;I.toHtml;var Vi=I.icon;I.layer;I.text;I.counter;var Ki={};function We(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function Ji(e){if(Array.isArray(e))return e}function qi(e){if(Array.isArray(e))return We(e)}function L(e,t,a){return(t=io(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Qi(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Zi(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,n,i,o,s=[],l=!0,u=!1;try{if(i=(a=a.call(e)).next,t!==0)for(;!(l=(r=i.call(a)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(d){u=!0,n=d}finally{try{if(!l&&a.return!=null&&(o=a.return(),Object(o)!==o))return}finally{if(u)throw n}}return s}}function eo(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function to(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ct(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function j(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?Ct(Object(a),!0).forEach(function(r){L(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Ct(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function ao(e,t){if(e==null)return{};var a,r,n=ro(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)===-1&&{}.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function ro(e,t){if(e==null)return{};var a={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;a[r]=e[r]}return a}function Nt(e,t){return Ji(e)||Zi(e,t)||Ma(e,t)||eo()}function Ye(e){return qi(e)||Qi(e)||Ma(e)||to()}function no(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function io(e){var t=no(e,"string");return typeof t=="symbol"?t:t+""}function de(e){"@babel/helpers - typeof";return de=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},de(e)}function Ma(e,t){if(e){if(typeof e=="string")return We(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?We(e,t):void 0}}var oo="7.0.0-alpha1",Ue;try{var so=require("@fortawesome/fontawesome-svg-core/package.json");Ue=so.version}catch{Ue=Ki.FA_VERSION||"7.0.0-alpha8"}function lo(e){var t=e.beat,a=e.fade,r=e.beatFade,n=e.bounce,i=e.shake,o=e.flash,s=e.spin,l=e.spinPulse,u=e.spinReverse,d=e.pulse,c=e.fixedWidth,v=e.inverse,h=e.border,x=e.listItem,p=e.flip,A=e.size,y=e.rotation,S=e.pull,k=e.swapOpacity,$=e.rotateBy,O=e.widthAuto,H=fo(Ue,oo),re=L(L(L(L(L(L({"fa-beat":t,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":n,"fa-shake":i,"fa-flash":o,"fa-spin":s,"fa-spin-reverse":u,"fa-spin-pulse":l,"fa-pulse":d,"fa-fw":c,"fa-inverse":v,"fa-border":h,"fa-li":x,"fa-flip":p===!0,"fa-flip-horizontal":p==="horizontal"||p==="both","fa-flip-vertical":p==="vertical"||p==="both"},"fa-".concat(A),typeof A<"u"&&A!==null),"fa-rotate-".concat(y),typeof y<"u"&&y!==null&&y!==0),"fa-pull-".concat(S),typeof S<"u"&&S!==null),"fa-swap-opacity",k),"fa-rotate-by",H&&$),"fa-width-auto",H&&O);return Object.keys(re).map(function(M){return re[M]?M:null}).filter(function(M){return M})}function fo(e,t){for(var a=e.split("-"),r=Nt(a,2),n=r[0],i=r[1],o=t.split("-"),s=Nt(o,2),l=s[0],u=s[1],d=n.split("."),c=l.split("."),v=0;v<Math.max(d.length,c.length);v++){var h=d[v]||"0",x=c[v]||"0",p=parseInt(h,10),A=parseInt(x,10);if(p!==A)return p>A}for(var y=0;y<Math.max(d.length,c.length);y++){var S=d[y]||"0",k=c[y]||"0";if(S!==k&&S.length!==k.length)return S.length<k.length}return!(i&&!u)}function uo(e){return e=e-0,e===e}function La(e){return uo(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,a){return a?a.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var co=["style"];function mo(e){return e.charAt(0).toUpperCase()+e.slice(1)}function vo(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,a){var r=a.indexOf(":"),n=La(a.slice(0,r)),i=a.slice(r+1).trim();return n.startsWith("webkit")?t[mo(n)]=i:t[n]=i,t},{})}function Ra(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var r=(t.children||[]).map(function(l){return Ra(e,l)}),n=Object.keys(t.attributes||{}).reduce(function(l,u){var d=t.attributes[u];switch(u){case"class":l.attrs.className=d,delete t.attributes.class;break;case"style":l.attrs.style=vo(d);break;default:u.indexOf("aria-")===0||u.indexOf("data-")===0?l.attrs[u.toLowerCase()]=d:l.attrs[La(u)]=d}return l},{attrs:{}}),i=a.style,o=i===void 0?{}:i,s=ao(a,co);return n.attrs.style=j(j({},n.attrs.style),o),e.apply(void 0,[t.tag,j(j({},n.attrs),s)].concat(Ye(r)))}var Da=!1;try{Da=!0}catch{}function ho(){if(!Da&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function Tt(e){if(e&&de(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(ze.icon)return ze.icon(e);if(e===null)return null;if(e&&de(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function Pe(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?L({},e,t):{}}var _t={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,rotateBy:!1,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1,widthAuto:!1},za=$t.forwardRef(function(e,t){var a=j(j({},_t),e),r=a.icon,n=a.mask,i=a.symbol,o=a.className,s=a.title,l=a.titleId,u=a.maskId,d=Tt(r),c=Pe("classes",[].concat(Ye(lo(a)),Ye((o||"").split(" ")))),v=Pe("transform",typeof a.transform=="string"?ze.transform(a.transform):a.transform),h=Pe("mask",Tt(n)),x=Vi(d,j(j(j(j({},c),v),h),{},{symbol:i,title:s,titleId:l,maskId:u}));if(!x)return ho("Could not find icon",d),null;var p=x.abstract,A={ref:t};return Object.keys(a).forEach(function(y){_t.hasOwnProperty(y)||(A[y]=a[y])}),go(p[0],A)});za.displayName="FontAwesomeIcon";za.propTypes={beat:g.bool,border:g.bool,beatFade:g.bool,bounce:g.bool,className:g.string,fade:g.bool,flash:g.bool,mask:g.oneOfType([g.object,g.array,g.string]),maskId:g.string,fixedWidth:g.bool,inverse:g.bool,flip:g.oneOf([!0,!1,"horizontal","vertical","both"]),icon:g.oneOfType([g.object,g.array,g.string]),listItem:g.bool,pull:g.oneOf(["right","left"]),pulse:g.bool,rotation:g.oneOf([0,90,180,270]),rotateBy:g.bool,shake:g.bool,size:g.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:g.bool,spinPulse:g.bool,spinReverse:g.bool,symbol:g.oneOfType([g.bool,g.string]),title:g.string,titleId:g.string,transform:g.oneOfType([g.string,g.object]),swapOpacity:g.bool,widthAuto:g.bool};var go=Ra.bind(null,$t.createElement);export{za as F};
