"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[293],{1703:function(e,t,a){var l=a(6540),n=a(4794);t.A=e=>{let{posts:t,tag:a,series:r,search:s}=e;return l.createElement("div",null,t.map((e=>{let{node:t}=e;return l.createElement("div",{key:t.id},l.createElement(n.Link,{className:"i-title",to:t.fields.slug},t.frontmatter.title),l.createElement("div",{className:"i-date"},t.frontmatter.date),l.createElement("p",{className:"i-excerpt"},t.excerpt),null!=t.frontmatter.tag?t.frontmatter.tag.split(",").map((e=>l.createElement("span",{className:"tag",key:e},l.createElement(n.Link,{to:`/tags?tag=${encodeURIComponent(e)}`},e)))):"",l.createElement("hr",null))})))}},9639:function(e,t,a){a.r(t);var l=a(6540),n=(a(4794),a(1221)),r=a(2532),s=a(1703);t.default=e=>{let{data:t}=e;const a=(0,r.c)(t.allFile.nodes[0].childImageSharp.gatsbyImageData),{0:c,1:m}=(0,l.useState)(t.allMarkdownRemark.edges),{0:i,1:u}=(0,l.useState)(null);return l.createElement(n.A,null,l.createElement("div",null,l.createElement("div",{class:"p-area"},l.createElement("div",null,l.createElement(r.G,{image:a,alt:"profileImage"})),l.createElement("div",null,l.createElement("div",{class:"p-name"},"@hyeonZIP"),l.createElement("div",{class:"p-intro"},"개발 깎는 노인"),l.createElement("div",null," [아이콘 구역]"))),l.createElement("h4",null,c.length," Posts"),l.createElement(s.A,{posts:c})))}}}]);
//# sourceMappingURL=component---src-pages-index-js-198cc1ba6cd8a6561d71.js.map