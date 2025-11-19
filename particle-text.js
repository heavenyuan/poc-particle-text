/**
 * Particle Text Animation Module
 * 粒子文字動畫模組
 */
(function (global) {
	"use strict";

	// ===== 自製輕量 Tween 工具 =====
	const Ease = {
		quadInOut: function (t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		linear: function (t) {
			return t;
		}
	};

	function SimpleTween(target, duration, props) {
		const startTime = performance.now();
		const durationMs = duration * 1000;
		const startValues = {};
		const endValues = {};
		const ease = props.ease || Ease.quadInOut;
		const onComplete = props.onComplete;
		let animationId = null;
		let killed = false;

		// 記錄起始值和目標值
		for (const key in props) {
			if (key !== 'ease' && key !== 'onComplete' && typeof props[key] === 'number') {
				startValues[key] = target[key];
				endValues[key] = props[key];
			}
		}

		function update() {
			if (killed) return;

			const elapsed = performance.now() - startTime;
			const progress = Math.min(elapsed / durationMs, 1);
			const easedProgress = ease(progress);

			// 更新所有屬性
			for (const key in startValues) {
				target[key] = startValues[key] + (endValues[key] - startValues[key]) * easedProgress;
			}

			if (progress < 1) {
				animationId = requestAnimationFrame(update);
			} else {
				if (onComplete) onComplete();
			}
		}

		animationId = requestAnimationFrame(update);

		return {
			kill: function () {
				killed = true;
				if (animationId) {
					cancelAnimationFrame(animationId);
				}
			}
		};
	}

	// 相容 TweenLite API
	const TweenLite = {
		to: function (target, duration, props) {
			return SimpleTween(target, duration, props);
		}
	};

	// 相容 GSAP 緩動
	const Quad = {
		easeInOut: Ease.quadInOut
	};

	/**
	 * Create particle text animation
	 * @param {Object} options - Configuration options
	 * @param {string} options.mode - 'canvas' or 'html'
	 * @param {string} options.effect - 'bigger' or 'break'
	 * @param {Object} options.config - Custom configuration
	 */
	function ParticleText(options = {}) {
		const mode = options.mode || "canvas";
		const effect = options.effect || "bigger";

		// Default configuration
		const CONFIG = Object.assign(
			{
				particleCount: 800,
				particleRadius: mode === "canvas" ? 4 : 8,
				colors: ["#00BFFF", "#58D3F7", "#0489B1", "#A9E2F3"],
				fontSize: 200,
				mouseDistance: effect === "break" && mode === "html" ? 150 : 100,
				draftFactor: 0.01,
			},
			options.config || {}
		);

		// 動態計算文字畫布尺寸（根據視窗大小）
		function getCanvasDimensions() {
			const width = Math.min(800, window.innerWidth * 0.8);
			const height = Math.min(200, window.innerHeight * 0.3);
			return { width, height };
		}

		let canvasDim = getCanvasDimensions();

		let textPixels;
		let canvas, ctx;
		let w = window.innerWidth;
		let h = window.innerHeight;
		let arr = [];
		let textFormed;
		let offsetX, offsetY;
		let focus = false;
		let tmp = "";
		let input;
		let mx = 0;
		let my = 0;

		// Initialize
		function init() {
			offsetX = (window.innerWidth - canvasDim.width) / 2;
			offsetY = (window.innerHeight - canvasDim.height) / 2;

			if (mode === "canvas") {
				canvas = document.getElementById("myCanvas");
				ctx = canvas.getContext("2d");
			}

			input = document.getElementById("myInput");

			input.addEventListener("focus", () => {
				focus = true;
			});
			input.addEventListener("blur", () => {
				focus = false;
			});

			initCircle();
			update();
		}

		// Initialize particles
		function initCircle() {
			arr = [];
			const wrapper = document.getElementById("wrapper");

			for (let i = 0; i < CONFIG.particleCount; i++) {
				const obj = {
					r: CONFIG.particleRadius,
					x: w * Math.random(),
					y: h * Math.random(),
					color: CONFIG.colors[Math.floor(i % CONFIG.colors.length)],
					alpha: 0.2 + Math.random() * 0.5,
					weight: (mode === "canvas" ? 0.1 : 0.3) + Math.random(),
					movement: "float",
				};

				if (mode === "html") {
					const particle = document.createElement("div");
					particle.className = "particle";
					particle.style.width = obj.r + "px";
					particle.style.height = obj.r + "px";
					particle.style.transform = `translate(${obj.x}px,${obj.y}px)`;
					particle.style.backgroundColor = obj.color;
					particle.style.opacity = obj.alpha;
					obj.ta = particle;
					wrapper.prepend(particle);
				}

				arr.push(obj);
				tweenCircle(obj);
			}
		}

		// Draw particles (Canvas mode)
		function drawCircleCanvas() {
			for (let i = 0, l = arr.length; i < l; i++) {
				const obj = arr[i];
				ctx.beginPath();
				const c = hexToRgb(obj.color);
				ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${obj.alpha})`;
				ctx.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI);
				ctx.fill();
			}
		}

		// Draw particles (HTML mode)
		function drawCircleHtml() {
			for (let i = 0, l = arr.length; i < l; i++) {
				const obj = arr[i];
				obj.ta.style.transform = `translate(${obj.x}px,${obj.y}px)`;
				obj.ta.style.opacity = obj.alpha;
			}
		}

		// Tween animation for particle
		function tweenCircle(c, dir) {
			if (c.tween) c.tween.kill();

			if (dir === "in") {
				c.tween = TweenLite.to(c, 0.5, {
					x: c.originX,
					y: c.originY,
					ease: Quad.easeInOut,
					alpha: 1,
					radius: 5,
					scaleX: 0.4,
					scaleY: 0.4,
					onComplete: () => {
						c.movement = "jiggle";
						tweenCircle(c);
					},
				});
			} else if (dir === "out") {
				c.tween = TweenLite.to(c, 0.8, {
					x: window.innerWidth * Math.random(),
					y: window.innerHeight * Math.random(),
					ease: Quad.easeInOut,
					alpha: 0.2 + Math.random() * 0.5,
					scaleX: 1,
					scaleY: 1,
					onComplete: () => {
						c.movement = "float";
						tweenCircle(c);
					},
				});
			} else {
				if (c.movement === "float") {
					c.tween = TweenLite.to(c, 5 + Math.random() * 3.5, {
						x: c.x + -100 + Math.random() * 200,
						y: c.y + -100 + Math.random() * 200,
						ease: Quad.easeInOut,
						alpha: 0.2 + Math.random() * 0.5,
						onComplete: () => {
							tweenCircle(c);
						},
					});
				} else {
					// Jiggle mode - mouse interaction
					let sx, sy;

					if (effect === "bigger") {
						// Bigger effect - push outward
						const draf = CONFIG.draftFactor;
						const distance = CONFIG.mouseDistance;
						const dx = c.originX - mx;
						const dy = c.originY - my;
						const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

						if (d < distance) {
							sx = (distance - d) * dx * draf;
							sy = (distance - d) * dy * draf;
						} else {
							sx = 0;
							sy = 0;
						}
					} else {
						// Break effect - scatter in opposite direction
						const distance = CONFIG.mouseDistance;
						const dx = mx - c.originX;
						const dy = my - c.originY;
						let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

						if (d < distance) {
							d = (distance - d) * c.weight;
							const rot = Math.atan2(dy, dx);
							sx = -d * Math.cos(rot);
							sy = -d * Math.sin(rot);
						} else {
							sx = 0;
							sy = 0;
						}
					}

					c.tween = TweenLite.to(c, 0.05, {
						x: c.originX + sx + Math.random() * 3,
						y: c.originY + sy + Math.random() * 3,
						ease: Quad.easeInOut,
						onComplete: () => {
							tweenCircle(c);
						},
					});
				}
			}
		}

		// Animation loop
		function update() {
			if (focus) chkText();

			if (mode === "canvas") {
				ctx.clearRect(0, 0, w, h);
				drawCircleCanvas();
			} else {
				drawCircleHtml();
			}

			requestAnimationFrame(update);
		}

		// Check text input
		function chkText() {
			const inputValue = input.value;
			if ((inputValue || tmp !== "") && tmp !== inputValue) {
				if (tmp.length > inputValue.length) {
					explode();
				}
				tmp = inputValue;
				createText(tmp);
			}
		}

		// Form text from particles
		function formText() {
			const len = Math.min(textPixels.length, arr.length);
			for (let i = 0; i < len; i++) {
				arr[i].originX = offsetX + textPixels[i].x;
				arr[i].originY = offsetY + textPixels[i].y;
				tweenCircle(arr[i], "in");
			}
			textFormed = true;
			if (len < arr.length) {
				for (let j = len; j < arr.length; j++) {
					arr[j].tween = TweenLite.to(arr[j], 0.4, { alpha: 0.1 });
				}
			}
		}

		// Explode particles
		function explode() {
			if (!textPixels) return;
			const len = Math.min(textPixels.length, arr.length);
			for (let i = 0; i < len; i++) {
				tweenCircle(arr[i], "out");
			}
			if (len < arr.length) {
				for (let j = len; j < arr.length; j++) {
					arr[j].tween = TweenLite.to(arr[j], 0.4, { alpha: 1 });
				}
			}
		}

		// Create text pixels
		function createText(t) {
			const outCanvas = document.createElement("canvas");
			outCanvas.width = canvasDim.width;
			outCanvas.height = canvasDim.height;

			const oxt = outCanvas.getContext("2d");
			oxt.fillStyle = "#eee";

			// 動態計算字體大小以適應畫布
			let fontSize = CONFIG.fontSize;
			const maxWidth = canvasDim.width * 0.9;
			const maxHeight = canvasDim.height * 0.85;
			oxt.font = `${fontSize}px sans-serif`;
			let textWidth = oxt.measureText(t).width;

			// 根據寬度調整字體大小
			if (textWidth > maxWidth) {
				fontSize = Math.floor((fontSize * maxWidth) / textWidth);
			}

			// 確保字體高度不超過畫布
			if (fontSize > maxHeight) {
				fontSize = Math.floor(maxHeight);
			}

			oxt.font = `${fontSize}px sans-serif`;
			oxt.textAlign = "center";
			oxt.textBaseline = "middle";
			oxt.fillText(t, canvasDim.width / 2, canvasDim.height / 2);

			const pix = oxt.getImageData(0, 0, canvasDim.width, canvasDim.height).data;
			textPixels = [];

			for (let i = pix.length; i >= 0; i -= 4) {
				if (pix[i] !== 0) {
					const x = (i / 4) % canvasDim.width;
					const y = Math.floor(Math.floor(i / canvasDim.width) / 4);

					if (x && x % 8 === 0 && y && y % 8 === 0) {
						textPixels.push({ x, y });
					}
				}
			}
			formText();
		}

		// Handle resize
		function resize() {
			w = window.innerWidth;
			h = window.innerHeight;

			if (mode === "canvas") {
				canvas = document.getElementById("myCanvas");
				canvas.width = w;
				canvas.height = h;
			}

			// 重新計算文字畫布尺寸
			canvasDim = getCanvasDimensions();
			offsetX = (window.innerWidth - canvasDim.width) / 2;
			offsetY = (window.innerHeight - canvasDim.height) / 2;
			requestAnimationFrame(update);
		}

		// Handle mouse move
		function mouseMove(e) {
			e.preventDefault();
			mx = e.pageX;
			my = e.pageY;
		}

		// Handle touch move
		function touchMove(e) {
			e.preventDefault();
			if (e.touches && e.touches.length > 0) {
				mx = e.touches[0].pageX;
				my = e.touches[0].pageY;
			}
		}

		// Convert hex to RGB
		function hexToRgb(hex) {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result
				? {
						r: parseInt(result[1], 16),
						g: parseInt(result[2], 16),
						b: parseInt(result[3], 16),
				  }
				: null;
		}

		// Bind events and start
		resize();
		window.addEventListener("resize", resize);
		window.addEventListener("mousemove", mouseMove);
		window.addEventListener("touchmove", touchMove, { passive: false });
		window.addEventListener("touchstart", touchMove, { passive: false });
		init();

		// Return public API
		return {
			getConfig: () => CONFIG,
			getParticles: () => arr,
		};
	}

	// Export to global
	global.ParticleText = ParticleText;
})(window);
