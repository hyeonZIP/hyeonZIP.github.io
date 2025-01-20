"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[269],{2729:function(e){const t=/[\p{Lu}]/u,a=/[\p{Ll}]/u,r=/^[\p{Lu}](?![\p{Lu}])/gu,n=/([\p{Alpha}\p{N}_]|$)/u,l=/[_.\- ]+/,s=new RegExp("^"+l.source),i=new RegExp(l.source+n.source,"gu"),o=new RegExp("\\d+"+n.source,"gu"),c=(e,n)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");if(n={pascalCase:!1,preserveConsecutiveUppercase:!1,...n},0===(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim()).length)return"";const l=!1===n.locale?e=>e.toLowerCase():e=>e.toLocaleLowerCase(n.locale),c=!1===n.locale?e=>e.toUpperCase():e=>e.toLocaleUpperCase(n.locale);if(1===e.length)return n.pascalCase?c(e):l(e);return e!==l(e)&&(e=((e,r,n)=>{let l=!1,s=!1,i=!1;for(let o=0;o<e.length;o++){const c=e[o];l&&t.test(c)?(e=e.slice(0,o)+"-"+e.slice(o),l=!1,i=s,s=!0,o++):s&&i&&a.test(c)?(e=e.slice(0,o-1)+"-"+e.slice(o-1),i=s,s=!1,l=!0):(l=r(c)===c&&n(c)!==c,i=s,s=n(c)===c&&r(c)!==c)}return e})(e,l,c)),e=e.replace(s,""),e=n.preserveConsecutiveUppercase?((e,t)=>(r.lastIndex=0,e.replace(r,(e=>t(e)))))(e,l):l(e),n.pascalCase&&(e=c(e.charAt(0))+e.slice(1)),((e,t)=>(i.lastIndex=0,o.lastIndex=0,e.replace(i,((e,a)=>t(a))).replace(o,(e=>t(e)))))(e,c)};e.exports=c,e.exports.default=c},2532:function(e,t,a){a.d(t,{G:function(){return O},L:function(){return h},M:function(){return S},P:function(){return k},_:function(){return i},a:function(){return s},b:function(){return d},c:function(){return c},g:function(){return m},h:function(){return o}});var r=a(6540),n=(a(2729),a(5556)),l=a.n(n);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},s.apply(this,arguments)}function i(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)t.indexOf(a=l[r])>=0||(n[a]=e[a]);return n}const o=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;const c=e=>{var t;return(e=>{var t,a;return Boolean(null==e||null==(t=e.images)||null==(a=t.fallback)?void 0:a.src)})(e)?e:(e=>Boolean(null==e?void 0:e.gatsbyImageData))(e)?e.gatsbyImageData:(e=>Boolean(null==e?void 0:e.gatsbyImage))(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function u(e,t,a){const r={};let n="gatsby-image-wrapper";return"fixed"===a?(r.width=e,r.height=t):"constrained"===a&&(n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:r}}function d(e,t,a,r,n){return void 0===n&&(n={}),s({},a,{loading:r,shouldLoad:e,"data-main-image":"",style:s({},n,{opacity:t?1:0})})}function m(e,t,a,r,n,l,i,o){const c={};l&&(c.backgroundColor=l,"fixed"===a?(c.width=r,c.height=n,c.backgroundColor=l,c.position="relative"):("constrained"===a||"fullWidth"===a)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),i&&(c.objectFit=i),o&&(c.objectPosition=o);const u=s({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:s({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return u}const g=["children"],p=function(e){let{layout:t,width:a,height:n}=e;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/a*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:a,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:`data:image/svg+xml;charset=utf-8,%3Csvg%20height='${n}'%20width='${a}'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E`,style:{maxWidth:"100%",display:"block",position:"static"}})):null},h=function(e){let{children:t}=e,a=i(e,g);return r.createElement(r.Fragment,null,r.createElement(p,s({},a)),t,null)},f=["src","srcSet","loading","alt","shouldLoad"],y=["fallback","sources","shouldLoad"],v=function(e){let{src:t,srcSet:a,loading:n,alt:l="",shouldLoad:o}=e,c=i(e,f);return r.createElement("img",s({},c,{decoding:"async",loading:n,src:o?t:void 0,"data-src":o?void 0:t,srcSet:o?a:void 0,"data-srcset":o?void 0:a,alt:l}))},b=function(e){let{fallback:t,sources:a=[],shouldLoad:n=!0}=e,l=i(e,y);const o=l.sizes||(null==t?void 0:t.sizes),c=r.createElement(v,s({},l,t,{sizes:o,shouldLoad:n}));return a.length?r.createElement("picture",null,a.map((e=>{let{media:t,srcSet:a,type:l}=e;return r.createElement("source",{key:`${t}-${l}-${a}`,type:l,media:t,srcSet:n?a:void 0,"data-srcset":n?void 0:a,sizes:o})})),c):c};var w;v.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},b.displayName="Picture",b.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};const E=["fallback"],k=function(e){let{fallback:t}=e,a=i(e,E);return t?r.createElement(b,s({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",s({},a))};k.displayName="Placeholder",k.propTypes={fallback:n.string,sources:null==(w=b.propTypes)?void 0:w.sources,alt:function(e,t,a){return e[t]?new Error(`Invalid prop \`${t}\` supplied to \`${a}\`. Validation failed.`):null}};const S=function(e){return r.createElement(r.Fragment,null,r.createElement(b,s({},e)),r.createElement("noscript",null,r.createElement(b,s({},e,{shouldLoad:!0}))))};S.displayName="MainImage",S.propTypes=b.propTypes;const C=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],x=["style","className"],L=e=>e.replace(/\n/g,""),I=function(e,t,a){for(var r=arguments.length,n=new Array(r>3?r-3:0),s=3;s<r;s++)n[s-3]=arguments[s];return e.alt||""===e.alt?l().string.apply(l(),[e,t,a].concat(n)):new Error(`The "alt" prop is required in ${a}. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html`)},T={image:l().object.isRequired,alt:I},N=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],$=["style","className"],z=new Set;let _,j;const A=function(e){let{as:t="div",image:n,style:l,backgroundColor:c,className:d,class:m,onStartLoad:g,onLoad:p,onError:h}=e,f=i(e,N);const{width:y,height:v,layout:b}=n,w=u(y,v,b),{style:E,className:k}=w,S=i(w,$),C=(0,r.useRef)(),x=(0,r.useMemo)((()=>JSON.stringify(n.images)),[n.images]);m&&(d=m);const L=function(e,t,a){let r="";return"fullWidth"===e&&(r=`<div aria-hidden="true" style="padding-top: ${a/t*100}%;"></div>`),"constrained"===e&&(r=`<div style="max-width: ${t}px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg%20height='${a}'%20width='${t}'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E" style="max-width: 100%; display: block; position: static;"></div>`),r}(b,y,v);return(0,r.useEffect)((()=>{_||(_=a.e(108).then(a.bind(a,1108)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:a}=e;return j=t,{renderImageToString:t,swapPlaceholderImage:a}})));const e=C.current.querySelector("[data-gatsby-image-ssr]");if(e&&o())return e.complete?(null==g||g({wasCached:!0}),null==p||p({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==g||g({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==p||p({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void z.add(x);if(j&&z.has(x))return;let t,r;return _.then((e=>{let{renderImageToString:a,swapPlaceholderImage:i}=e;C.current&&(C.current.innerHTML=a(s({isLoading:!0,isLoaded:z.has(x),image:n},f)),z.has(x)||(t=requestAnimationFrame((()=>{C.current&&(r=i(C.current,x,z,l,g,p,h))}))))})),()=>{t&&cancelAnimationFrame(t),r&&r()}}),[n]),(0,r.useLayoutEffect)((()=>{z.has(x)&&j&&(C.current.innerHTML=j(s({isLoading:z.has(x),isLoaded:z.has(x),image:n},f)),null==g||g({wasCached:!0}),null==p||p({wasCached:!0}))}),[n]),(0,r.createElement)(t,s({},S,{style:s({},E,l,{backgroundColor:c}),className:`${k}${d?` ${d}`:""}`,ref:C,dangerouslySetInnerHTML:{__html:L},suppressHydrationWarning:!0}))},O=(0,r.memo)((function(e){return e.image?(0,r.createElement)(A,e):null}));O.propTypes=T,O.displayName="GatsbyImage";const R=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"];function q(e){return function(t){let{src:a,__imageData:n,__error:l}=t,o=i(t,R);return l&&console.warn(l),n?r.createElement(e,s({image:n},o)):(console.warn("Image not loaded",a),null)}}const M=q((function(e){let{as:t="div",className:a,class:n,style:l,image:o,loading:c="lazy",imgClassName:g,imgStyle:p,backgroundColor:f,objectFit:y,objectPosition:v}=e,b=i(e,C);if(!o)return console.warn("[gatsby-plugin-image] Missing image prop"),null;n&&(a=n),p=s({objectFit:y,objectPosition:v,backgroundColor:f},p);const{width:w,height:E,layout:I,images:T,placeholder:N,backgroundColor:$}=o,z=u(w,E,I),{style:_,className:j}=z,A=i(z,x),O={fallback:void 0,sources:[]};return T.fallback&&(O.fallback=s({},T.fallback,{srcSet:T.fallback.srcSet?L(T.fallback.srcSet):void 0})),T.sources&&(O.sources=T.sources.map((e=>s({},e,{srcSet:L(e.srcSet)})))),r.createElement(t,s({},A,{style:s({},_,l,{backgroundColor:f}),className:`${j}${a?` ${a}`:""}`}),r.createElement(h,{layout:I,width:w,height:E},r.createElement(k,s({},m(N,!1,I,w,E,$,y,v))),r.createElement(S,s({"data-gatsby-image-ssr":"",className:g},b,d("eager"===c,!1,O,c,p)))))})),P=function(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?l().number.apply(l(),[e,t].concat(r)):new Error(`"${t}" ${e[t]} may not be passed when layout is fullWidth.`)},W=new Set(["fixed","fullWidth","constrained"]),D={src:l().string.isRequired,alt:I,width:P,height:P,sizes:l().string,layout:e=>{if(void 0!==e.layout&&!W.has(e.layout))return new Error(`Invalid value ${e.layout}" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".`)}};M.displayName="StaticImage",M.propTypes=D;const F=q(O);F.displayName="StaticImage",F.propTypes=D},1221:function(e,t,a){a.d(t,{A:function(){return s}});var r=a(6540),n=a(4794);localStorage.getItem("color-theme");var l=e=>{let{siteTitle:t,theme:a,toggleTheme:l}=e;return r.createElement("header",{style:{margin:"0 auto",padding:"var(--space-3) var(--size-gutter)",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"1px 0.1px 5px 3px #303030"}},r.createElement(n.Link,{to:"/",style:{fontSize:"var(--font-sm)",textDecoration:"none"}},t),r.createElement("div",{onClick:l,style:{cursor:"pointer"}},"dark"===a?r.createElement("svg",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",viewBox:"0 0 512 512",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},r.createElement("path",{d:"M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"})):r.createElement("svg",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",viewBox:"0 0 512 512",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},r.createElement("path",{d:"M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"}))))};var s=e=>{var t;let{children:a}=e;const[s,i]=r.useState("light");r.useEffect((()=>{if("undefined"!=typeof window?localStorage.getItem("checkout"):null){const e=localStorage.getItem("color-theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",a=e||t;i(a),document.documentElement.setAttribute("color-theme",a),localStorage.setItem("color-theme",a)}}),[]);const o=r.useCallback((()=>{i((e=>{const t="light"===e?"dark":"light";return"undefined"!=typeof window&&(document.documentElement.setAttribute("color-theme",t),localStorage.setItem("color-theme",t)),t}))}),[]),c=(0,n.useStaticQuery)("3649515864");return r.createElement(r.Fragment,null,r.createElement(l,{siteTitle:(null===(t=c.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",theme:s,toggleTheme:o}),r.createElement("div",{style:{margin:"0 auto",maxWidth:"var(--size-content)",padding:"var(--size-gutter)"}},r.createElement("main",null,a),r.createElement("footer",{style:{marginTop:"var(--space-5)",fontSize:"var(--font-sm)"}},"© ",(new Date).getFullYear()," · Built with"," ",r.createElement("a",{href:"https://www.gatsbyjs.com"},"Gatsby"))))}},9529:function(e,t,a){a.r(t),a.d(t,{default:function(){return s}});var r=a(6540),n=a(1221),l=a(2532);function s(e){var t,a;let{data:s}=e;const{markdownRemark:i}=s,{frontmatter:o,html:c}=i,u=(0,l.c)(null===(t=o.thumbnail)||void 0===t||null===(a=t.childImageSharp)||void 0===a?void 0:a.gatsbyImageData);return r.createElement(n.A,null,r.createElement("div",{className:"blog-post-container"},r.createElement("div",{className:"blog-post"},r.createElement("h1",null,o.title),r.createElement("h2",null,o.date),r.createElement(l.G,{image:u,alt:"Thumbnail"}),r.createElement("div",{dangerouslySetInnerHTML:{__html:c}}))))}}}]);
//# sourceMappingURL=component---src-templates-md-files-js-cbd34e9b5ea2c8875f2b.js.map