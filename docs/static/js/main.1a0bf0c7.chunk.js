/*! For license information please see main.1a0bf0c7.chunk.js.LICENSE.txt */
(this["webpackJsonpcontrast-demo"]=this["webpackJsonpcontrast-demo"]||[]).push([[0],[,,,,,,,,,,function(e,t,r){},function(e,t,r){},,function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){var o={"./protean-button_11.entry.js":[20,5]};function a(e){if(!r.o(o,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],a=t[0];return r.e(t[1]).then((function(){return r(a)}))}a.keys=function(){return Object.keys(o)},a.id=18,e.exports=a},function(e,t,r){"use strict";r.r(t);var o=r(1),a=r.n(o),s=r(4),n=r.n(s);r(10);function i(e,t){var r;const o=100*Math.abs(e)/t-100;if(o>=0)return 4;const a=5*Math.floor(o/5);return null!==(r=new Map([[0,4],[-5,3],[-10,2],[-15,1]]).get(a))&&void 0!==r?r:0}r(11);var c=r(0);class l extends o.Component{get isIncalculable(){return this.props.decorator?["copyright","prohibited","header"].includes(this.props.decorator)||"caution"===this.props.decorator&&"N"===this.props.value:void 0===this.props.comparisonValue||!1}get rating(){return this.isIncalculable?0:this.props.rating?this.props.rating:i(this.props.comparisonValue,this.props.value)}get wrapperClasses(){return`lookup-table-cell${this.isIncalculable?"":` rating-${this.rating}`} ${this.props.decorator||""}`}render(){return Object(c.jsx)(this.props.tag,{className:this.wrapperClasses,children:Object(c.jsx)("div",{className:"cell-content",children:Object(c.jsxs)("div",{className:"cell-info",children:[Object(c.jsx)("div",{className:"cell-value","aria-label":this.props.ariaLabel,children:this.props.value}),!this.isIncalculable&&Object(c.jsx)("ul",{className:"cell-rating","aria-label":`WCAG 3.0 Rating ${this.rating}`,children:new Array(this.rating).fill(void 0).map(((e,t)=>Object(c.jsx)("li",{},t)))})]})})})}}const d=[[{value:"10px",decorator:"header"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"},{value:"\xa9",decorator:"copyright"},{value:"\xa9",decorator:"copyright"},{value:"\xa9",decorator:"copyright"},{value:"\xa9",decorator:"copyright"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"}],[{value:"11px",decorator:"header"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"},{value:"\xa9",decorator:"copyright"},{value:"\xa9",decorator:"copyright"},{value:"\xa9",decorator:"copyright"},{value:"\xa9",decorator:"copyright"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"}],[{value:"12px",decorator:"header"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"},{value:"\xa9",decorator:"copyright"},{value:"\xa9",decorator:"copyright"},{value:100,decorator:"caution"},{value:90,decorator:"caution"},{value:80,decorator:"caution"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"}],[{value:"14px",decorator:"header"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"},{value:"\xa9",decorator:"copyright"},{value:100},{value:90},{value:80},{value:60},{value:60,decorator:"caution"},{value:"X",decorator:"prohibited"}],[{value:"16px",decorator:"header"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"},{value:100},{value:90},{value:80},{value:60},{value:55},{value:50,decorator:"caution"},{value:50,decorator:"caution"}],[{value:"18px",decorator:"header"},{value:"X",decorator:"prohibited"},{value:"X",decorator:"prohibited"},{value:90},{value:80},{value:60},{value:55},{value:50},{value:40,decorator:"caution"},{value:40,decorator:"caution"}],[{value:"24px",decorator:"header"},{value:"X",decorator:"prohibited"},{value:100},{value:80},{value:60},{value:55},{value:50},{value:40},{value:38},{value:35,decorator:"caution"}],[{value:"30px",decorator:"header"},{value:"X",decorator:"prohibited"},{value:90},{value:70},{value:55},{value:50},{value:50},{value:38},{value:35},{value:30}],[{value:"36px",decorator:"header"},{value:"X",decorator:"prohibited"},{value:80},{value:60},{value:50},{value:40},{value:38},{value:35},{value:30},{value:25}],[{value:"48px",decorator:"header"},{value:100},{value:70},{value:55},{value:40},{value:38},{value:35},{value:30},{value:25},{value:20}],[{value:"60px",decorator:"header"},{value:90},{value:60},{value:50},{value:38},{value:35},{value:30},{value:25},{value:20},{value:20}],[{value:"72px",decorator:"header"},{value:80},{value:55},{value:40},{value:35},{value:30},{value:25},{value:20},{value:20},{value:20}],[{value:"96px",decorator:"header"},{value:70},{value:50},{value:35},{value:30},{value:25},{value:20},{value:20},{value:20},{value:20}],[{value:"120px",decorator:"header"},{value:60},{value:40},{value:30},{value:25},{value:20},{value:20},{value:20},{value:20},{value:20}]];r(13),r(14);class h extends o.Component{render(){const{backgroundColor:e,foregroundColor:t,text:r,fontSize:o,fontWeight:a,rating:s}=this.props,n={backgroundColor:e,color:t},i={fontSize:o,fontWeight:a};return Object(c.jsxs)("div",{className:"sample-text",style:n,children:[Object(c.jsx)("div",{className:"main-text",style:i,children:r}),void 0!==s&&Object(c.jsxs)("div",{className:"rating-text",children:["Rating: ",Object(c.jsx)("strong",{children:s})]})]})}}class u extends o.Component{constructor(...e){super(...e),this.elementRef=Object(o.createRef)()}componentDidMount(){this.bindProps()}componentDidUpdate(){this.bindProps()}bindProps(){var e;const t=null===(e=this.elementRef)||void 0===e?void 0:e.current;if(t){const{children:e,ref:r,...o}=this.props;Object.entries(o).forEach((([e,r])=>{t[e]=r}))}}render(){return Object(c.jsx)("protean-input",{ref:this.elementRef})}}let p=1e3;function b(){return p++}r(15);class g extends o.Component{constructor(...e){super(...e),this.radioId=`radio-button-${b()}`}render(){var e;return Object(c.jsxs)("div",{className:"radio-button","data-checked":this.props.checked,children:[Object(c.jsx)("input",{className:"sr",type:"radio",id:this.radioId,name:this.props.name,value:this.props.value,disabled:null!==(e=this.props.disabled)&&void 0!==e&&e,checked:this.props.checked,onChange:this.props.handleChange}),Object(c.jsxs)("label",{htmlFor:this.radioId,children:[Object(c.jsxs)("svg",{className:"radio-symbol",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",focusable:"false","aria-hidden":"true",children:[Object(c.jsx)("circle",{className:"radio-outer",cx:"12",cy:"12",r:"11"}),this.props.checked&&Object(c.jsx)("circle",{className:"radio-inner",cx:"12",cy:"12",r:"6"})]}),Object(c.jsx)("span",{className:"label-text",children:this.props.label})]})]})}}r(16);class j extends o.Component{constructor(e){super(e),this.radioName=`color-type-${b()}`,this.getRGBString=e=>{const[t,r,o]=e;return`rgb(${t}, ${r}, ${o})`},this.swapColors=()=>{const e={...this.props.backgroundColor},t={...this.props.foregroundColor};this.props.onColorChange(e,t)},this.cleanHex=(e,t)=>{let r,o=e.substring(1);switch(o.length){case 1:r={r:o+o,g:o+o,b:o+o};break;case 2:r={r:o,g:o,b:o};break;case 3:r={r:o.substr(0,1)+o.substr(0,1),g:o.substr(1,1)+o.substr(1,1),b:o.substr(2,1)+o.substr(2,1)};break;case 6:r={r:o.substr(0,2),g:o.substr(2,2),b:o.substr(4,2)};break;default:return this.setError(t),{hexString:"",rgbString:"",hexNumber:0,rgb:[],isValid:!1}}for(const c in r)if(!/^[0-9A-F]{2}$/i.test(r[c]))return this.setError(t),{hexString:"",rgbString:"",hexNumber:0,rgb:[],isValid:!1};this.clearError(t);const{r:a,g:s,b:n}=r;o=a+s+n;const i=[a,s,n].map((e=>parseInt(e,16)));return{hexString:`#${o}`,rgbString:this.getRGBString(i),hexNumber:parseInt(o,16),rgb:Object.values(r).map((e=>parseInt(e,16))),isValid:!0}},this.cleanRGB=(e,t)=>{var r;if(!/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/g.test(e))return this.setError(t),{hexString:"",rgbString:"",hexNumber:0,rgb:[],isValid:!1};const{workingColor:o,isValid:a,rgb:s}=null===(r=e.match(/\d{1,3}/g))||void 0===r?void 0:r.reduce(((e,r)=>{let o=Number(r);return o>255&&(this.setError(t),e.isValid=!1),e.workingColor+=o.toString(16).padStart(2,"0"),e.rgb.push(o),e}),{workingColor:"",isValid:!0,rgb:[]});return a&&this.clearError(t),{hexString:`#${o}`,rgbString:this.getRGBString(s),hexNumber:parseInt(o,16),rgb:s,isValid:a}},this.setError=e=>{const t=[`Please enter a valid ${this.props.isHex?"hex":"rgb"} color code`];"foreground"!==e?this.setState({backgroundErrors:t}):this.setState({foregroundErrors:t})},this.clearError=e=>{"foreground"===e&&this.state.foregroundErrors?this.setState({foregroundErrors:void 0}):this.state.backgroundErrors&&this.setState({backgroundErrors:void 0})},this.onForegroundInput=e=>{let t=e.detail.formattedValue;"color"===e.target.type&&!this.props.isHex&&(t=this.hexToRGB(t)),this.debouncedColorInputHandler(t,"foreground")},this.onBackgroundInput=e=>{let t=e.detail.formattedValue;"color"===e.target.type&&!this.props.isHex&&(t=this.hexToRGB(t)),this.debouncedColorInputHandler(t,"background")},this.onColorInput=(e,t)=>{let r,o={...this.props.foregroundColor},a={...this.props.backgroundColor};r=this.props.isHex?this.cleanHex(e,t):this.cleanRGB(e,t);let{isValid:s,...n}=r;"foreground"===t?o={...n,activeColor:e}:a={...n,activeColor:e},s&&this.props.onColorChange(o,a)},this.debouncedColorInputHandler=function(e,t=100){let r;return function(...o){clearTimeout(r),r=setTimeout((()=>e(...o)),t)}}(this.onColorInput.bind(this),5),this.onHexSwap=e=>{const t="hex"===e.target.value;this.props.onHexSwap(t)},this.state={}}get inputFormat(){return this.props.isHex?"hex":"rgb"}hexToRGB(e){return`rgb(${parseInt(e.substr(1,2),16)}, ${parseInt(e.substr(3,2),16)}, ${parseInt(e.substr(5,2),16)})`}render(){return Object(c.jsxs)("section",{className:"contrast-checker",children:[Object(c.jsxs)("div",{className:"field-container",children:[Object(c.jsxs)("div",{className:"flex",children:[Object(c.jsx)(u,{label:"Text color",type:"color-code",className:"foreground-input",format:this.inputFormat,value:this.props.foregroundColor.activeColor,errors:this.state.foregroundErrors,oninput:this.onForegroundInput}),Object(c.jsx)(u,{a11yLabel:"Text color",className:"foreground-color-input",value:this.props.foregroundColor.hexString,type:"color",oninput:this.onForegroundInput})]}),Object(c.jsxs)("div",{className:"color-values",children:[Object(c.jsx)("div",{children:this.props.foregroundColor.hexString}),Object(c.jsx)("div",{children:"|"}),Object(c.jsx)("div",{children:this.props.foregroundColor.rgbString})]})]}),Object(c.jsxs)("div",{className:"contrast-value",children:[Object(c.jsx)("div",{children:"Contrast value"}),Object(c.jsxs)("h2",{children:[this.props.contrastValue.toFixed(3),this.props.isAPCA?Object(c.jsxs)("span",{children:[" ","L",Object(c.jsx)("sup",{children:"c"})]}):Object(c.jsx)("span",{children:":1"})]}),Object(c.jsx)("protean-button",{variant:"icon",onClick:this.swapColors,"a11y-label":"Swap colors",children:Object(c.jsx)("protean-icon",{type:"swap"})})]}),Object(c.jsxs)("div",{className:"field-container",children:[Object(c.jsxs)("div",{className:"flex",children:[Object(c.jsx)(u,{label:"Background color",value:this.props.backgroundColor.activeColor,className:"background-input",type:"color-code",format:this.inputFormat,errors:this.state.backgroundErrors,oninput:this.onBackgroundInput}),Object(c.jsx)(u,{a11yLabel:"Background color",className:"background-color-input",value:this.props.backgroundColor.hexString,type:"color",oninput:this.onBackgroundInput})]}),Object(c.jsxs)("div",{className:"color-values",children:[Object(c.jsx)("div",{children:this.props.backgroundColor.hexString}),Object(c.jsx)("div",{children:"|"}),Object(c.jsx)("div",{children:this.props.backgroundColor.rgbString})]})]}),Object(c.jsxs)("div",{className:"radio-list",children:[Object(c.jsx)(g,{value:"rgb",label:"Use RGB",name:this.radioName,checked:!this.props.isHex,handleChange:this.onHexSwap}),Object(c.jsx)(g,{value:"hex",label:"Use Hex",name:this.radioName,checked:this.props.isHex,handleChange:this.onHexSwap})]}),Object(c.jsx)("div",{className:"sample-container",children:Object(c.jsx)(h,{fontSize:"16px",fontWeight:600,text:"Sample text",foregroundColor:this.props.foregroundColor.hexString,backgroundColor:this.props.backgroundColor.hexString})})]})}}class x extends o.Component{render(){return Object(c.jsxs)("div",{className:"apca-demo",children:[Object(c.jsx)(j,{isAPCA:!0,foregroundColor:this.props.foregroundColor,backgroundColor:this.props.backgroundColor,contrastValue:this.props.contrastValue,isHex:this.props.isHex,onColorChange:this.props.onColorChange,onHexSwap:this.props.onHexSwap}),Object(c.jsxs)("section",{children:[Object(c.jsx)("h2",{children:"Color contrast in WCAG 3.0"}),Object(c.jsxs)("p",{children:["Color contrast value in WCAG 3.0 is calculated using the"," ",Object(c.jsx)("a",{href:"https://www.myndex.com/APCA/",rel:"noreferrer",target:"_blank",children:"Advanced Perception of Color Algorithm (APCA)"}),". Unlike previous contrast calculations, the APCA considers the context in which colors are used to determine their readability. The font size, font weight, and sequence of background and text colors all impact the final WCAG rating."]}),Object(c.jsxs)("p",{children:["WCAG 3.0 ratings for text contrast are based on the proximity of a calculated contrast value (L",Object(c.jsx)("sup",{children:"c"}),") to its target score on the APCA Lookup Table below."]}),Object(c.jsxs)("section",{children:[Object(c.jsx)("h3",{children:"APCA Lookup Table"}),Object(c.jsxs)("div",{className:"lookup-table-wrapper",children:[Object(c.jsxs)("table",{className:"lookup-table",children:[Object(c.jsxs)("thead",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{}),Object(c.jsx)("th",{colSpan:9,className:"lookup-table-weight-header",children:Object(c.jsx)("strong",{children:"Font weight"})})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{"aria-label":"Font size"}),Object(c.jsx)("th",{"aria-label":"Font weight 100",children:"100"}),Object(c.jsx)("th",{"aria-label":"Font weight 200",children:"200"}),Object(c.jsx)("th",{"aria-label":"Font weight 300",children:"300"}),Object(c.jsx)("th",{"aria-label":"Font weight 400",children:"400"}),Object(c.jsx)("th",{"aria-label":"Font weight 500",children:"500"}),Object(c.jsx)("th",{"aria-label":"Font weight 600",children:"600"}),Object(c.jsx)("th",{"aria-label":"Font weight 700",children:"700"}),Object(c.jsx)("th",{"aria-label":"Font weight 800",children:"800"}),Object(c.jsx)("th",{"aria-label":"Font weight 900",children:"900"})]})]}),Object(c.jsx)("tbody",{children:d.map(((e,t)=>Object(c.jsx)("tr",{children:e.map(((e,r)=>{const o=0===r?"th":"td";return Object(c.jsx)(l,{tag:o,value:e.value,decorator:e.decorator,comparisonValue:this.props.contrastValue},`lookup-table-cell-${t}-${r}`)}))},`lookup-table-row-${t}`)))})]}),Object(c.jsxs)("section",{className:"lookup-table-key",children:[Object(c.jsx)("h4",{children:"Table key"}),Object(c.jsxs)("ul",{className:"lookup-table-key-list",children:[Object(c.jsxs)("li",{children:[Object(c.jsx)(l,{value:"N",rating:4,tag:"div",comparisonValue:0}),Object(c.jsx)("div",{children:"WCAG 3.0 Rating 4 - meets or exceeds the values on the APCA Lookup table"})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)(l,{value:"N",rating:3,tag:"div",comparisonValue:0}),Object(c.jsx)("div",{children:"Rating 3 - 1-4% below"})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)(l,{value:"N",rating:2,tag:"div",comparisonValue:0}),Object(c.jsx)("div",{children:"Rating 2 - 5-9% below"})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)(l,{value:"N",rating:1,tag:"div",comparisonValue:0}),Object(c.jsx)("div",{children:"Rating 1 - 10-15% below"})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)(l,{value:"N",rating:0,tag:"div",comparisonValue:0}),Object(c.jsx)("div",{children:"Rating 0 - >15% below"})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)(l,{value:"N",tag:"div",decorator:"caution"}),Object(c.jsx)("div",{children:"Not recommended for blocks of text"})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)(l,{value:"X",decorator:"prohibited",tag:"div"}),Object(c.jsx)("div",{children:"Prohibited except for decorative purposes"})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)(l,{value:"\xa9",decorator:"copyright",tag:"div"}),Object(c.jsx)("div",{children:"Use for copyright/by-line only"})]})]})]})]})]})]}),Object(c.jsxs)("section",{children:[Object(c.jsx)("h2",{children:"Example font combinations & ratings"}),Object(c.jsxs)("div",{className:"sample-container",children:[Object(c.jsx)(h,{fontSize:"14px",fontWeight:400,text:"14px/400",foregroundColor:this.props.foregroundColor.hexString,backgroundColor:this.props.backgroundColor.hexString,rating:i(this.props.contrastValue,100)}),Object(c.jsx)(h,{fontSize:"16px",fontWeight:400,text:"16px/400",foregroundColor:this.props.foregroundColor.hexString,backgroundColor:this.props.backgroundColor.hexString,rating:i(this.props.contrastValue,90)}),Object(c.jsx)(h,{fontSize:"16px",fontWeight:600,text:"16px/600",foregroundColor:this.props.foregroundColor.hexString,backgroundColor:this.props.backgroundColor.hexString,rating:i(this.props.contrastValue,60)}),Object(c.jsx)(h,{fontSize:"24px",fontWeight:500,text:"24px/500",foregroundColor:this.props.foregroundColor.hexString,backgroundColor:this.props.backgroundColor.hexString,rating:i(this.props.contrastValue,55)}),Object(c.jsx)(h,{fontSize:"30px",fontWeight:300,text:"30px/300",foregroundColor:this.props.foregroundColor.hexString,backgroundColor:this.props.backgroundColor.hexString,rating:i(this.props.contrastValue,70)})]})]}),Object(c.jsx)("hr",{}),Object(c.jsxs)("section",{children:[Object(c.jsx)("h2",{children:"Attributions"}),Object(c.jsx)("p",{children:"SAPC & APCA were invented / developed by Andrew Somers, Senior Color Science Researcher at Myndex Technologies as part of the ongoing PerceptEx\u2122 Perception Research Project."}),Object(c.jsx)("p",{children:"SAPC: S-LUV Advanced Perceptual Color \u2014 an appearance model for self-illuminated displays"}),Object(c.jsx)("p",{children:"APCA: Advanced Perceptual Contrast Algorithm \u2014 a method for determining contrast to guide web-based design."}),Object(c.jsx)("p",{children:"APCA is derived from the SAPC model. APCA is a method for prediction pf suprathreshold visual contrast of text on displays. APCA results are intended to provide design guidance for best readability of web-based content."}),Object(c.jsxs)("section",{children:[Object(c.jsx)("h3",{children:"APCA DISCLAIMER"}),Object(c.jsx)("p",{children:"APCA is intended solely for web-based content per the W3 WCAG 3.0 standards, and the web-content version is licensed to the W3 per their cooperative agreement. Use for other-than web-based-content is restricted and/or prohibited. APCA is a public beta, under active development. Prior written authorization is required for the use of SAPC or APCA in the context of, or in applications for, transportation, aerospace, medical, military, or where human safety is involved."})]})]})]})}}r(17);class v extends o.Component{getGradeText(e){return this.props.contrastValue<e?"fail":"pass"}render(){const e=this.getGradeText(3),t=this.getGradeText(4.5),r=this.getGradeText(7);return Object(c.jsxs)("div",{className:"ratio-demo",children:[Object(c.jsx)("section",{children:Object(c.jsx)(j,{foregroundColor:this.props.foregroundColor,backgroundColor:this.props.backgroundColor,contrastValue:this.props.contrastValue,isAPCA:!1,isHex:this.props.isHex,onColorChange:this.props.onColorChange,onHexSwap:this.props.onHexSwap})}),Object(c.jsxs)("section",{children:[Object(c.jsx)("h2",{children:"Normal text"}),Object(c.jsxs)("dl",{className:"ratio-grades",children:[Object(c.jsx)("dt",{children:"WCAG 2.1 AA"}),Object(c.jsx)("dd",{className:"normal-aa-grade",children:Object(c.jsx)("span",{className:t,children:t})}),Object(c.jsx)("dt",{children:"WCAG 2.1 AAA"}),Object(c.jsx)("dd",{className:"normal-aaa-grade",children:Object(c.jsx)("span",{className:r,children:r})})]})]}),Object(c.jsxs)("section",{children:[Object(c.jsx)("h2",{children:"Large text"}),Object(c.jsx)("p",{children:"Text that is 14pt (18.67px) and bold or any text bigger than 18pt (24px) is defined as large scale text."}),Object(c.jsxs)("dl",{className:"ratio-grades",children:[Object(c.jsx)("dt",{children:"WCAG 2.1 AA"}),Object(c.jsx)("dd",{className:"large-aa-grade",children:Object(c.jsx)("span",{className:e,children:e})}),Object(c.jsx)("dt",{children:"WCAG 2.1 AAA"}),Object(c.jsx)("dd",{className:"large-aaa-grade",children:Object(c.jsx)("span",{className:t,children:t})})]})]})]})}}class m extends o.Component{render(){return Object(c.jsx)("protean-tab-pane",{label:this.props.label,value:this.props.value,name:this.props.name,children:this.props.children})}}var C=m;class O extends o.Component{constructor(...e){super(...e),this.elementRef=Object(o.createRef)()}componentDidMount(){this.bindProps()}componentDidUpdate(){this.bindProps()}bindProps(){var e;const t=null===(e=this.elementRef)||void 0===e?void 0:e.current;if(t){const{children:e,ref:r,...o}=this.props;Object.entries(o).forEach((([e,r])=>{t[e]=r}))}}render(){return Object(c.jsx)("protean-checkbox",{ref:this.elementRef})}}class f extends o.Component{constructor(...e){super(...e),this.elementRef=Object(o.createRef)()}componentDidMount(){this.bindProps()}componentDidUpdate(){this.bindProps()}bindProps(){var e;const t=null===(e=this.elementRef)||void 0===e?void 0:e.current;if(t){const{children:e,ref:r,...o}=this.props;Object.entries(o).forEach((([e,r])=>{t[e]=r}))}}render(){return Object(c.jsx)("protean-tab-container",{ref:this.elementRef,children:this.props.children})}}function k(e){const t=[.2126,.7152,.0722];return e.reduce(((e,r,o)=>{let a=r/255;return a=a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4),e+=a*t[o]}),0)}function S(e,t){const r=k(e),o=k(t),a=Math.min(r,o);return(Math.max(r,o)+.05)/(a+.05)}function w(e,t){let r=(16711680&e)>>16,o=(65280&e)>>8,a=255&e,s=(16711680&t)>>16,n=(65280&t)>>8,i=255&t;const c=2.4,l=.2126729,d=.7151522,h=.072175,u=.022,p=.035991,b=27.7847239587675,g=.027;let j=Math.pow(r/255,c)*l+Math.pow(o/255,c)*d+Math.pow(a/255,c)*h,x=Math.pow(s/255,c)*l+Math.pow(n/255,c)*d+Math.pow(i/255,c)*h,v=0,m=0;return x=x>u?x:x+Math.pow(u-x,1.414),j=j>u?j:j+Math.pow(u-j,1.414),Math.abs(j-x)<5e-4?0:(j>x?(v=1.14*(Math.pow(j,.56)-Math.pow(x,.57)),m=v<.001?0:v<p?v-v*b*g:v-g):(v=1.14*(Math.pow(j,.65)-Math.pow(x,.62)),m=v>-.001?0:v>-.035991?v-v*b*g:v+g),100*m)}class A extends o.Component{constructor(e){super(e),this.onTabChange=e=>{"protean-tab-container"===e.target.localName&&this.setState({activeTab:e.detail.value})},this.onLightModeToggle=e=>{const t=e.detail.checked;localStorage.setItem("darkModeEnabled",t),this.setState({darkModeEnabled:t}),document.documentElement.classList.toggle("light")},this.onColorChange=(e,t)=>{const r=w(t.hexNumber,e.hexNumber),o=S(e.rgb,t.rgb);this.setState({foregroundColor:e,backgroundColor:t,APCAContrastValue:r,legacyContrastRatio:o})},this.onHexSwap=e=>{this.setState((({foregroundColor:t,backgroundColor:r})=>({isHex:e,foregroundColor:{...t,activeColor:e?t.hexString:t.rgbString},backgroundColor:{...r,activeColor:e?r.hexString:r.rgbString}})))};const t="true"===localStorage.getItem("darkModeEnabled");t&&document.documentElement.classList.remove("light");const r={hexString:"#1a1a1a",rgbString:"rgb(26, 26, 26)",activeColor:"#1a1a1a",hexNumber:parseInt("1a1a1a",16),rgb:[26,26,26]},o={hexString:"#c7b5fb",rgbString:"rgb(199, 181, 251)",activeColor:"#c7b5fb",hexNumber:parseInt("c7b5fb",16),rgb:[199,181,251]};this.state={activeTab:"wcag-30",darkModeEnabled:t,foregroundColor:r,backgroundColor:o,APCAContrastValue:w(o.hexNumber,r.hexNumber),legacyContrastRatio:S(r.rgb,o.rgb),isHex:!0}}render(){return Object(c.jsxs)("div",{className:"app content",children:[Object(c.jsxs)("div",{className:"header-content",children:[Object(c.jsxs)("h1",{children:["Contrast ",Object(c.jsx)("span",{className:"hidden-s",children:"tools"})]}),Object(c.jsx)(O,{className:"dark-mode-toggle",label:"Dark mode",variant:"toggle",alignment:"right",checked:this.state.darkModeEnabled,onchange:this.onLightModeToggle})]}),Object(c.jsxs)(f,{value:this.state.activeTab,onchange:this.onTabChange,children:[Object(c.jsx)(C,{value:"wcag-30",label:"WCAG 3.0",children:Object(c.jsx)(x,{foregroundColor:this.state.foregroundColor,backgroundColor:this.state.backgroundColor,contrastValue:this.state.APCAContrastValue,isHex:this.state.isHex,onColorChange:this.onColorChange,onHexSwap:this.onHexSwap})}),Object(c.jsx)("protean-tab-pane",{value:"wcag-21",label:"WCAG 2.1",children:Object(c.jsx)(v,{foregroundColor:this.state.foregroundColor,backgroundColor:this.state.backgroundColor,contrastValue:this.state.legacyContrastRatio,isHex:this.state.isHex,onColorChange:this.onColorChange,onHexSwap:this.onHexSwap})})]})]})}}var N=r(5);Object(N.a)(),n.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(A,{})}),document.getElementById("root"))}],[[19,2,3]]]);
//# sourceMappingURL=main.1a0bf0c7.chunk.js.map