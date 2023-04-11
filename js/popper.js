/*!
 * Popover v1.0.12
 * https://sa-si-dev.github.io/popover
 * Licensed under MIT (https://github.com/sa-si-dev/popover/blob/master/LICENSE)
 */!function(){"use strict";function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,o){if(e){if("string"==typeof e)return t(e,o);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?t(e,o):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,i=new Array(t);o<t;o++)i[o]=e[o];return i}function o(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var i=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var i,n;return i=t,(n=[{key:"addClass",value:function(o,i){o&&(i=i.split(" "),t.getElements(o).forEach((function(t){var o;(o=t.classList).add.apply(o,e(i))})))}},{key:"removeClass",value:function(o,i){o&&(i=i.split(" "),t.getElements(o).forEach((function(t){var o;(o=t.classList).remove.apply(o,e(i))})))}},{key:"getElements",value:function(e){if(e)return void 0===e.forEach&&(e=[e]),e}},{key:"getMoreVisibleSides",value:function(e){if(!e)return{};var t=e.getBoundingClientRect(),o=window.innerWidth,i=window.innerHeight,n=t.left,r=t.top;return{horizontal:n>o-n-t.width?"left":"right",vertical:r>i-r-t.height?"top":"bottom"}}},{key:"getAbsoluteCoords",value:function(e){if(e){var t=e.getBoundingClientRect(),o=window.pageXOffset,i=window.pageYOffset;return{width:t.width,height:t.height,top:t.top+i,right:t.right+o,bottom:t.bottom+i,left:t.left+o}}}},{key:"getCoords",value:function(e){return e?e.getBoundingClientRect():{}}},{key:"getData",value:function(e,t,o){if(e){var i=e?e.dataset[t]:"";return"number"===o?i=parseFloat(i)||0:"true"===i?i=!0:"false"===i&&(i=!1),i}}},{key:"setData",value:function(e,t,o){e&&(e.dataset[t]=o)}},{key:"setStyle",value:function(e,t,o){e&&(e.style[t]=o)}},{key:"show",value:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"block";t.setStyle(e,"display",o)}},{key:"hide",value:function(e){t.setStyle(e,"display","none")}},{key:"getHideableParent",value:function(e){for(var t,o=e.parentElement;o;){var i=getComputedStyle(o).overflow;if(-1!==i.indexOf("scroll")||-1!==i.indexOf("auto")){t=o;break}o=o.parentElement}return t}}])&&o(i,n),t}();function n(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=["top","bottom","left","right"].map((function(e){return"position-".concat(e)})),a={top:"rotate(180deg)",left:"rotate(90deg)",right:"rotate(-90deg)"},s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);try{this.setProps(t),this.init()}catch(e){console.warn("Couldn't initiate popper"),console.error(e)}}var t,o;return t=e,(o=[{key:"init",value:function(){var e=this.$popperEle;e&&this.$triggerEle&&(i.setStyle(e,"zIndex",this.zIndex),this.setPosition())}},{key:"setProps",value:function(e){var t=(e=this.setDefaultProps(e)).position?e.position.toLowerCase():"auto";if(this.$popperEle=e.$popperEle,this.$triggerEle=e.$triggerEle,this.$arrowEle=e.$arrowEle,this.margin=parseFloat(e.margin),this.offset=parseFloat(e.offset),this.enterDelay=parseFloat(e.enterDelay),this.exitDelay=parseFloat(e.exitDelay),this.showDuration=parseFloat(e.showDuration),this.hideDuration=parseFloat(e.hideDuration),this.transitionDistance=parseFloat(e.transitionDistance),this.zIndex=parseFloat(e.zIndex),this.afterShowCallback=e.afterShow,this.afterHideCallback=e.afterHide,this.hasArrow=!!this.$arrowEle,-1!==t.indexOf(" ")){var o=t.split(" ");this.position=o[0],this.secondaryPosition=o[1]}else this.position=t}},{key:"setDefaultProps",value:function(e){return Object.assign({position:"auto",margin:8,offset:5,enterDelay:0,exitDelay:0,showDuration:300,hideDuration:200,transitionDistance:10,zIndex:1},e)}},{key:"setPosition",value:function(){i.show(this.$popperEle,"inline-flex");var e,t,o,n=window.innerWidth,s=window.innerHeight,l=i.getAbsoluteCoords(this.$popperEle),h=i.getAbsoluteCoords(this.$triggerEle),p=l.width,u=l.height,c=l.top,f=l.right,v=l.bottom,d=l.left,y=h.width,m=h.height,g=h.top,w=h.right,E=h.bottom,b=h.left,k=g-c,$=b-d,D=$,C=k,P=this.position,S=this.secondaryPosition,O=y/2-p/2,A=m/2-u/2,T=this.margin,x=this.transitionDistance,H=window.scrollY-c,L=s+H,R=window.scrollX-d,z=n+R,F=this.offset;F&&(H+=F,L-=F,R+=F,z-=F),"auto"===P&&(P=i.getMoreVisibleSides(this.$triggerEle).vertical);var I={top:{top:C-u-T,left:D+O},bottom:{top:C+m+T,left:D+O},right:{top:C+A,left:D+y+T},left:{top:C+A,left:D-p-T}},M=I[P];if(C=M.top,D=M.left,S&&("top"===S?C=k:"bottom"===S?C=k+m-u:"left"===S?D=$:"right"===S&&(D=$+y-p)),D<R?"left"===P?o="right":D=R+d>w?w-d:R:D+p>z&&("right"===P?o="left":D=z+d<b?b-f:z-p),C<H?"top"===P?o="bottom":C=H+c>E?E-c:H:C+u>L&&("bottom"===P?o="top":C=L+c<g?g-v:L-u),o){var j=I[o];"top"===(P=o)||"bottom"===P?C=j.top:"left"!==P&&"right"!==P||(D=j.left)}"top"===P?(e=C+x,t=D):"right"===P?(e=C,t=D-x):"left"===P?(e=C,t=D+x):(e=C-x,t=D);var U="translate3d(".concat(t,"px, ").concat(e,"px, 0)");if(i.setStyle(this.$popperEle,"transform",U),i.setData(this.$popperEle,"fromLeft",t),i.setData(this.$popperEle,"fromTop",e),i.setData(this.$popperEle,"top",C),i.setData(this.$popperEle,"left",D),i.removeClass(this.$popperEle,r.join(" ")),i.addClass(this.$popperEle,"position-".concat(P)),this.hasArrow){var B=0,q=0,W=D+d,K=C+c,V=this.$arrowEle.offsetWidth/2,X=a[P]||"";"top"===P||"bottom"===P?(B=y/2+b-W)<V?B=V:B>p-V&&(B=p-V):"left"!==P&&"right"!==P||((q=m/2+g-K)<V?q=V:q>u-V&&(q=u-V)),i.setStyle(this.$arrowEle,"transform","translate3d(".concat(B,"px, ").concat(q,"px, 0) ").concat(X))}i.hide(this.$popperEle)}},{key:"resetPosition",value:function(){i.setStyle(this.$popperEle,"transform","none"),this.setPosition()}},{key:"show",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=t.resetPosition,n=t.data;clearTimeout(this.exitDelayTimeout),clearTimeout(this.hideDurationTimeout),o&&this.resetPosition(),this.enterDelayTimeout=setTimeout((function(){var t=i.getData(e.$popperEle,"left"),o=i.getData(e.$popperEle,"top"),r="translate3d(".concat(t,"px, ").concat(o,"px, 0)"),a=e.showDuration;i.show(e.$popperEle,"inline-flex"),i.getCoords(e.$popperEle),i.setStyle(e.$popperEle,"transitionDuration",a+"ms"),i.setStyle(e.$popperEle,"transform",r),i.setStyle(e.$popperEle,"opacity",1),e.showDurationTimeout=setTimeout((function(){"function"==typeof e.afterShowCallback&&e.afterShowCallback(n)}),a)}),this.enterDelay)}},{key:"hide",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=t.data;clearTimeout(this.enterDelayTimeout),clearTimeout(this.showDurationTimeout),this.exitDelayTimeout=setTimeout((function(){if(e.$popperEle){var t=i.getData(e.$popperEle,"fromLeft"),n=i.getData(e.$popperEle,"fromTop"),r="translate3d(".concat(t,"px, ").concat(n,"px, 0)"),a=e.hideDuration;i.setStyle(e.$popperEle,"transitionDuration",a+"ms"),i.setStyle(e.$popperEle,"transform",r),i.setStyle(e.$popperEle,"opacity",0),e.hideDurationTimeout=setTimeout((function(){i.hide(e.$popperEle),"function"==typeof e.afterHideCallback&&e.afterHideCallback(o)}),a)}}),this.exitDelay)}},{key:"updatePosition",value:function(){i.setStyle(this.$popperEle,"transitionDuration","0ms"),this.resetPosition();var e=i.getData(this.$popperEle,"left"),t=i.getData(this.$popperEle,"top");i.show(this.$popperEle,"inline-flex"),i.setStyle(this.$popperEle,"transform","translate3d(".concat(e,"px, ").concat(t,"px, 0)"))}}])&&n(t.prototype,o),e}();window.PopperComponent=s}(),function(){"use strict";function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var t=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var o,i,n;return o=t,n=[{key:"convertToBoolean",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e=!0===e||"true"===e||!1!==e&&"false"!==e&&t}},{key:"removeArrayEmpty",value:function(e){return Array.isArray(e)&&e.length?e.filter((function(e){return!!e})):[]}},{key:"throttle",value:function(e,t){var o,i=0;return function(){for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];var s=(new Date).getTime(),l=t-(s-i);clearTimeout(o),l<=0?(i=s,e.apply(void 0,r)):o=setTimeout((function(){e.apply(void 0,r)}),l)}}}],(i=null)&&e(o.prototype,i),n&&e(o,n),Object.defineProperty(o,"prototype",{writable:!1}),t}();function o(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?i(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,i=new Array(t);o<t;o++)i[o]=e[o];return i}function n(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var i,r,a;return i=e,a=[{key:"addClass",value:function(t,i){t&&(i=i.split(" "),e.getElements(t).forEach((function(e){var t;(t=e.classList).add.apply(t,o(i))})))}},{key:"removeClass",value:function(t,i){t&&(i=i.split(" "),e.getElements(t).forEach((function(e){var t;(t=e.classList).remove.apply(t,o(i))})))}},{key:"hasClass",value:function(e,t){return!!e&&e.classList.contains(t)}},{key:"getElement",value:function(e){return e&&("string"==typeof e?e=document.querySelector(e):void 0!==e.length&&(e=e[0])),e||null}},{key:"getElements",value:function(e){if(e)return void 0===e.forEach&&(e=[e]),e}},{key:"addEvent",value:function(t,o,i){e.addOrRemoveEvent(t,o,i,"add")}},{key:"removeEvent",value:function(t,o,i){e.addOrRemoveEvent(t,o,i,"remove")}},{key:"addOrRemoveEvent",value:function(o,i,n,r){o&&(i=t.removeArrayEmpty(i.split(" "))).forEach((function(t){(o=e.getElements(o)).forEach((function(e){"add"===r?e.addEventListener(t,n):e.removeEventListener(t,n)}))}))}},{key:"getScrollableParents",value:function(e){if(!e)return[];for(var t=[window],o=e.parentElement;o;){var i=getComputedStyle(o).overflow;-1===i.indexOf("scroll")&&-1===i.indexOf("auto")||t.push(o),o=o.parentElement}return t}},{key:"convertPropToDataAttr",value:function(e){return e?"data-popover-".concat(e).replace(/([A-Z])/g,"-$1").toLowerCase():""}}],(r=null)&&n(i.prototype,r),a&&n(i,a),Object.defineProperty(i,"prototype",{writable:!1}),e}();function a(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var s,l={27:"onEscPress"},h=["target","position","margin","offset","enterDelay","exitDelay","showDuration","hideDuration","transitionDistance","updatePositionThrottle","zIndex","hideOnOuterClick","showOnHover","hideArrowIcon","disableManualAction","disableUpdatePosition"],p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);try{this.setProps(t),this.init()}catch(e){console.warn("Couldn't initiate Popover component"),console.error(e)}}var o,i,n;return o=e,n=[{key:"init",value:function(t){var o=t.ele;if(o){var i=!1;if("string"==typeof o){if(!(o=document.querySelectorAll(o)))return;1===o.length&&(i=!0)}void 0===o.length&&(o=[o],i=!0);var n=[];return o.forEach((function(o){t.ele=o,e.destroy(o),n.push(new e(t))})),i?n[0]:n}}},{key:"destroy",value:function(e){if(e){var t=e.popComp;t&&t.destroy()}}},{key:"showMethod",value:function(){this.popComp.show()}},{key:"hideMethod",value:function(){this.popComp.hide()}},{key:"updatePositionMethod",value:function(){this.popComp.popper.updatePosition()}},{key:"getAttrProps",value:function(){var e=r.convertPropToDataAttr,t={};return h.forEach((function(o){t[e(o)]=o})),t}}],(i=[{key:"init",value:function(){this.$popover&&(this.setElementProps(),this.renderArrow(),this.initPopper(),this.addEvents())}},{key:"getEvents",value:function(){var e=[{$ele:document,event:"click",method:"onDocumentClick"},{$ele:document,event:"keydown",method:"onDocumentKeyDown"}];return this.disableManualAction||(e.push({$ele:this.$ele,event:"click",method:"onTriggerEleClick"}),this.showOnHover&&(e.push({$ele:this.$ele,event:"mouseenter",method:"onTriggerEleMouseEnter"}),e.push({$ele:this.$ele,event:"mouseleave",method:"onTriggerEleMouseLeave"}))),e}},{key:"addOrRemoveEvents",value:function(e){var t=this;this.getEvents().forEach((function(o){t.addOrRemoveEvent({action:e,$ele:o.$ele,events:o.event,method:o.method})}))}},{key:"addEvents",value:function(){this.addOrRemoveEvents("add")}},{key:"removeEvents",value:function(){this.addOrRemoveEvents("remove"),this.removeScrollEventListeners(),this.removeResizeEventListeners()}},{key:"addOrRemoveEvent",value:function(e){var o=this,i=e.action,n=e.$ele,a=e.events,s=e.method,l=e.throttle;n&&(a=t.removeArrayEmpty(a.split(" "))).forEach((function(e){var a="".concat(s,"-").concat(e),h=o.events[a];h||(h=o[s].bind(o),l&&(h=t.throttle(h,l)),o.events[a]=h),"add"===i?r.addEvent(n,e,h):r.removeEvent(n,e,h)}))}},{key:"addScrollEventListeners",value:function(){this.$scrollableElems=r.getScrollableParents(this.$ele),this.addOrRemoveEvent({action:"add",$ele:this.$scrollableElems,events:"scroll",method:"onAnyParentScroll",throttle:this.updatePositionThrottle})}},{key:"removeScrollEventListeners",value:function(){this.$scrollableElems&&(this.addOrRemoveEvent({action:"remove",$ele:this.$scrollableElems,events:"scroll",method:"onAnyParentScroll"}),this.$scrollableElems=null)}},{key:"addResizeEventListeners",value:function(){this.addOrRemoveEvent({action:"add",$ele:window,events:"resize",method:"onResize",throttle:this.updatePositionThrottle})}},{key:"removeResizeEventListeners",value:function(){this.addOrRemoveEvent({action:"remove",$ele:window,events:"resize",method:"onResize"})}},{key:"onAnyParentScroll",value:function(){this.popper.updatePosition()}},{key:"onResize",value:function(){this.popper.updatePosition()}},{key:"onDocumentClick",value:function(e){var t=e.target,o=t.closest(".pop-comp-ele"),i=t.closest(".pop-comp-wrapper");this.hideOnOuterClick&&o!==this.$ele&&i!==this.$popover&&this.hide()}},{key:"onDocumentKeyDown",value:function(e){var t=e.which||e.keyCode,o=l[t];o&&this[o](e)}},{key:"onEscPress",value:function(){this.hideOnOuterClick&&this.hide()}},{key:"onTriggerEleClick",value:function(){this.toggle()}},{key:"onTriggerEleMouseEnter",value:function(){this.show()}},{key:"onTriggerEleMouseLeave",value:function(){this.hide()}},{key:"setProps",value:function(e){e=this.setDefaultProps(e),this.setPropsFromElementAttr(e);var o=t.convertToBoolean;this.$ele=e.ele,this.target=e.target,this.position=e.position,this.margin=parseFloat(e.margin),this.offset=parseFloat(e.offset),this.enterDelay=parseFloat(e.enterDelay),this.exitDelay=parseFloat(e.exitDelay),this.showDuration=parseFloat(e.showDuration),this.hideDuration=parseFloat(e.hideDuration),this.transitionDistance=parseFloat(e.transitionDistance),this.updatePositionThrottle=parseFloat(e.updatePositionThrottle),this.zIndex=parseFloat(e.zIndex),this.hideOnOuterClick=o(e.hideOnOuterClick),this.showOnHover=o(e.showOnHover),this.hideArrowIcon=o(e.hideArrowIcon),this.disableManualAction=o(e.disableManualAction),this.disableUpdatePosition=o(e.disableUpdatePosition),this.beforeShowCallback=e.beforeShow,this.afterShowCallback=e.afterShow,this.beforeHideCallback=e.beforeHide,this.afterHideCallback=e.afterHide,this.events={},this.$popover=r.getElement(this.target)}},{key:"setDefaultProps",value:function(e){return Object.assign({position:"auto",margin:8,offset:5,enterDelay:0,exitDelay:0,showDuration:300,hideDuration:200,transitionDistance:10,updatePositionThrottle:100,zIndex:1,hideOnOuterClick:!0,showOnHover:!1,hideArrowIcon:!1,disableManualAction:!1,disableUpdatePosition:!1},e)}},{key:"setPropsFromElementAttr",value:function(e){var t=e.ele;for(var o in s){var i=t.getAttribute(o);i&&(e[s[o]]=i)}}},{key:"setElementProps",value:function(){var t=this.$ele;t.popComp=this,t.show=e.showMethod,t.hide=e.hideMethod,t.updatePosition=e.updatePositionMethod,r.addClass(this.$ele,"pop-comp-ele"),r.addClass(this.$popover,"pop-comp-wrapper")}},{key:"getOtherTriggerPopComp",value:function(){var e,t=this.$popover.popComp;return t&&t.$ele!==this.$ele&&(e=t),e}},{key:"initPopper",value:function(){var e={$popperEle:this.$popover,$triggerEle:this.$ele,$arrowEle:this.$arrowEle,position:this.position,margin:this.margin,offset:this.offset,enterDelay:this.enterDelay,exitDelay:this.exitDelay,showDuration:this.showDuration,hideDuration:this.hideDuration,transitionDistance:this.transitionDistance,zIndex:this.zIndex,afterShow:this.afterShow.bind(this),afterHide:this.afterHide.bind(this)};this.popper=new PopperComponent(e)}},{key:"beforeShow",value:function(){"function"==typeof this.beforeShowCallback&&this.beforeShowCallback(this)}},{key:"beforeHide",value:function(){"function"==typeof this.beforeHideCallback&&this.beforeHideCallback(this)}},{key:"show",value:function(){this.isShown()||(this.isShownForOtherTrigger()?this.showAfterOtherHide():(r.addClass(this.$popover,"pop-comp-disable-events"),this.$popover.popComp=this,this.beforeShow(),this.popper.show({resetPosition:!0}),r.addClass(this.$ele,"pop-comp-active")))}},{key:"hide",value:function(){this.isShown()&&(this.beforeHide(),this.popper.hide(),this.removeScrollEventListeners(),this.removeResizeEventListeners())}},{key:"toggle",value:function(e){void 0===e&&(e=!this.isShown()),e?this.show():this.hide()}},{key:"isShown",value:function(){return r.hasClass(this.$ele,"pop-comp-active")}},{key:"isShownForOtherTrigger",value:function(){var e=this.getOtherTriggerPopComp();return!!e&&e.isShown()}},{key:"showAfterOtherHide",value:function(){var e=this,t=this.getOtherTriggerPopComp();if(t){var o=t.exitDelay+t.hideDuration+100;setTimeout((function(){e.show()}),o)}}},{key:"afterShow",value:function(){var e=this;this.showOnHover?setTimeout((function(){r.removeClass(e.$popover,"pop-comp-disable-events")}),2e3):r.removeClass(this.$popover,"pop-comp-disable-events"),this.disableUpdatePosition||(this.addScrollEventListeners(),this.addResizeEventListeners()),"function"==typeof this.afterShowCallback&&this.afterShowCallback(this)}},{key:"afterHide",value:function(){r.removeClass(this.$ele,"pop-comp-active"),"function"==typeof this.afterHideCallback&&this.afterHideCallback(this)}},{key:"renderArrow",value:function(){if(!this.hideArrowIcon){var e=this.$popover.querySelector(".pop-comp-arrow");e||(this.$popover.insertAdjacentHTML("afterbegin",'<i class="pop-comp-arrow"></i>'),e=this.$popover.querySelector(".pop-comp-arrow")),this.$arrowEle=e}}},{key:"destroy",value:function(){this.removeEvents()}}])&&a(o.prototype,i),n&&a(o,n),Object.defineProperty(o,"prototype",{writable:!1}),e}();s=p.getAttrProps(),window.PopoverComponent=p}();