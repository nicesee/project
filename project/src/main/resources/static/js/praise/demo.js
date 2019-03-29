
;(function(window) {

	'use strict';

	// taken from mo.js demos
	function isIOSSafari() {
		var userAgent;
		userAgent = window.navigator.userAgent;
		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	};

	// taken from mo.js demos
	function isTouch() {
		var isIETouch;
		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	};
	
	// taken from mo.js demos
	var isIOS = isIOSSafari(),
		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Animocon(el, options) {
		
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );

		this.checked = false;

		this.timeline = new mojs.Timeline();
		
		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
			this.timeline.add(this.options.tweens[i]);
		}

		var self = this;
		this.el.addEventListener(clickHandler, function() {
			if( self.checked ) {
				self.options.onUnCheck();
			}
			else {
				self.options.onCheck();
				self.timeline.start();
			}
			self.checked = !self.checked;
		});
	}

	Animocon.prototype.options = {
		tweens : [
			new mojs.Burst({
				shape : 'circle',
				isRunLess: true
			})
		],
		onCheck : function() { return false; },
		onUnCheck : function() { return false; }
	};

	// grid items:
	var items = [].slice.call(document.querySelectorAll('ol.grid > .grid__item'));

	function init() {
		
		/* Icon 9 */
		var el9 = items[0].querySelector('button.icobutton'), el9span = el9.querySelector('span');
		el9span.style.WebkitTransformOrigin = el9span.style.transformOrigin = '-10% 50%';
		new Animocon(el9, {
			tweens : [
				// burst animation
				new mojs.Burst({
					parent: el9,
					duration: 1500,
					delay: 350,
					shape : 'circle',
					fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
					x: '50%',
					y: '50%',
					opacity: 0.6,
					radius: {40:90},
					count: 6,
					angle: 135,
					degree: 90,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// burst animation
				new mojs.Burst({
					parent: el9,
					duration: 1500,
					delay: 550,
					shape : 'circle',
					fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
					x: '50%',
					y: '50%',
					opacity: 0.6,
					radius: {40:100},
					count: 6,
					angle: 45,
					degree: -90,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// ring animation
				new mojs.Transit({
					parent: el9,
					duration: 750,
					type: 'circle',
					radius: {0: 50},
					fill: 'transparent',
					stroke: '#988ADE',
					strokeWidth: {35:0},
					opacity: 0.6,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.bezier(0, 1, 0.5, 1)
				}),
				// ring animation
				new mojs.Transit({
					parent: el9,
					duration: 750,
					delay: 200,
					type: 'circle',
					radius: {0: 50},
					fill: 'transparent',
					stroke: '#988ADE',
					strokeWidth: {35:0},
					opacity: 0.6,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.bezier(0, 1, 0.5, 1)
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 1500,
					onUpdate: function(progress) {
						if(progress > 0.3) {
							var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
							el9span.style.WebkitTransform = el9span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,1,' + 90*(1-elasticOutProgress) + 'deg)';
						}
						else {
							el9span.style.WebkitTransform = el9span.style.transform = 'scale3d(0,0,1)';
						}
					}
				})
			],
			onCheck : function() {
				el9.style.color = '#988ADE';
			},
			onUnCheck : function() {
				el9.style.color = '#C0C1C3';	
			}
		});
		/* Icon 9 */

	}
	
	init();
})(window);
