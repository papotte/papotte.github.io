var ke = !1,
	He = !1,
	N = [],
	ze = -1;
function yr(e) {
	xr(e);
}
function xr(e) {
	N.includes(e) || N.push(e), br();
}
function Ut(e) {
	let t = N.indexOf(e);
	t !== -1 && t > ze && N.splice(t, 1);
}
function br() {
	!He && !ke && ((ke = !0), queueMicrotask(wr));
}
function wr() {
	(ke = !1), (He = !0);
	for (let e = 0; e < N.length; e++) N[e](), (ze = e);
	(N.length = 0), (ze = -1), (He = !1);
}
var W,
	U,
	se,
	Vt,
	qe = !0;
function Er(e) {
	(qe = !1), e(), (qe = !0);
}
function Sr(e) {
	(W = e.reactive),
		(se = e.release),
		(U = (t) =>
			e.effect(t, {
				scheduler: (n) => {
					qe ? yr(n) : n();
				},
			})),
		(Vt = e.raw);
}
function Mt(e) {
	U = e;
}
function Ar(e) {
	let t = () => {};
	return [
		(r) => {
			let i = U(r);
			return (
				e._x_effects ||
					((e._x_effects = new Set()),
					(e._x_runEffects = () => {
						e._x_effects.forEach((o) => o());
					})),
				e._x_effects.add(i),
				(t = () => {
					i !== void 0 && (e._x_effects.delete(i), se(i));
				}),
				i
			);
		},
		() => {
			t();
		},
	];
}
var Jt = [],
	Yt = [],
	Gt = [];
function Cr(e) {
	Gt.push(e);
}
function Xt(e, t) {
	typeof t == 'function' ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : ((t = e), Yt.push(t));
}
function Or(e) {
	Jt.push(e);
}
function Tr(e, t, n) {
	e._x_attributeCleanups || (e._x_attributeCleanups = {}),
		e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
		e._x_attributeCleanups[t].push(n);
}
function Qt(e, t) {
	e._x_attributeCleanups &&
		Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
			(t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
		});
}
var it = new MutationObserver(ct),
	ot = !1;
function at() {
	it.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), (ot = !0);
}
function Zt() {
	Mr(), it.disconnect(), (ot = !1);
}
var te = [],
	Fe = !1;
function Mr() {
	(te = te.concat(it.takeRecords())),
		te.length &&
			!Fe &&
			((Fe = !0),
			queueMicrotask(() => {
				Ir(), (Fe = !1);
			}));
}
function Ir() {
	ct(te), (te.length = 0);
}
function y(e) {
	if (!ot) return e();
	Zt();
	let t = e();
	return at(), t;
}
var st = !1,
	he = [];
function Pr() {
	st = !0;
}
function Lr() {
	(st = !1), ct(he), (he = []);
}
function ct(e) {
	if (st) {
		he = he.concat(e);
		return;
	}
	let t = [],
		n = [],
		r = new Map(),
		i = new Map();
	for (let o = 0; o < e.length; o++)
		if (
			!e[o].target._x_ignoreMutationObserver &&
			(e[o].type === 'childList' &&
				(e[o].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)),
				e[o].removedNodes.forEach((a) => a.nodeType === 1 && n.push(a))),
			e[o].type === 'attributes')
		) {
			let a = e[o].target,
				s = e[o].attributeName,
				c = e[o].oldValue,
				u = () => {
					r.has(a) || r.set(a, []), r.get(a).push({ name: s, value: a.getAttribute(s) });
				},
				l = () => {
					i.has(a) || i.set(a, []), i.get(a).push(s);
				};
			a.hasAttribute(s) && c === null ? u() : a.hasAttribute(s) ? (l(), u()) : l();
		}
	i.forEach((o, a) => {
		Qt(a, o);
	}),
		r.forEach((o, a) => {
			Jt.forEach((s) => s(a, o));
		});
	for (let o of n)
		if (!t.includes(o) && (Yt.forEach((a) => a(o)), o._x_cleanups))
			for (; o._x_cleanups.length; ) o._x_cleanups.pop()();
	t.forEach((o) => {
		(o._x_ignoreSelf = !0), (o._x_ignore = !0);
	});
	for (let o of t)
		n.includes(o) ||
			(o.isConnected &&
				(delete o._x_ignoreSelf,
				delete o._x_ignore,
				Gt.forEach((a) => a(o)),
				(o._x_ignore = !0),
				(o._x_ignoreSelf = !0)));
	t.forEach((o) => {
		delete o._x_ignoreSelf, delete o._x_ignore;
	}),
		(t = null),
		(n = null),
		(r = null),
		(i = null);
}
function en(e) {
	return ue(z(e));
}
function ce(e, t, n) {
	return (
		(e._x_dataStack = [t, ...z(n || e)]),
		() => {
			e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
		}
	);
}
function z(e) {
	return e._x_dataStack
		? e._x_dataStack
		: typeof ShadowRoot == 'function' && e instanceof ShadowRoot
		? z(e.host)
		: e.parentNode
		? z(e.parentNode)
		: [];
}
function ue(e) {
	let t = new Proxy(
		{},
		{
			ownKeys: () => Array.from(new Set(e.flatMap((n) => Object.keys(n)))),
			has: (n, r) => e.some((i) => i.hasOwnProperty(r)),
			get: (n, r) =>
				(e.find((i) => {
					if (i.hasOwnProperty(r)) {
						let o = Object.getOwnPropertyDescriptor(i, r);
						if ((o.get && o.get._x_alreadyBound) || (o.set && o.set._x_alreadyBound)) return !0;
						if ((o.get || o.set) && o.enumerable) {
							let a = o.get,
								s = o.set,
								c = o;
							(a = a && a.bind(t)),
								(s = s && s.bind(t)),
								a && (a._x_alreadyBound = !0),
								s && (s._x_alreadyBound = !0),
								Object.defineProperty(i, r, { ...c, get: a, set: s });
						}
						return !0;
					}
					return !1;
				}) || {})[r],
			set: (n, r, i) => {
				let o = e.find((a) => a.hasOwnProperty(r));
				return o ? (o[r] = i) : (e[e.length - 1][r] = i), !0;
			},
		}
	);
	return t;
}
function tn(e) {
	let t = (r) => typeof r == 'object' && !Array.isArray(r) && r !== null,
		n = (r, i = '') => {
			Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([o, { value: a, enumerable: s }]) => {
				if (s === !1 || a === void 0) return;
				let c = i === '' ? o : `${i}.${o}`;
				typeof a == 'object' && a !== null && a._x_interceptor
					? (r[o] = a.initialize(e, c, o))
					: t(a) && a !== r && !(a instanceof Element) && n(a, c);
			});
		};
	return n(e);
}
function nn(e, t = () => {}) {
	let n = {
		initialValue: void 0,
		_x_interceptor: !0,
		initialize(r, i, o) {
			return e(
				this.initialValue,
				() => $r(r, i),
				(a) => We(r, i, a),
				i,
				o
			);
		},
	};
	return (
		t(n),
		(r) => {
			if (typeof r == 'object' && r !== null && r._x_interceptor) {
				let i = n.initialize.bind(n);
				n.initialize = (o, a, s) => {
					let c = r.initialize(o, a, s);
					return (n.initialValue = c), i(o, a, s);
				};
			} else n.initialValue = r;
			return n;
		}
	);
}
function $r(e, t) {
	return t.split('.').reduce((n, r) => n[r], e);
}
function We(e, t, n) {
	if ((typeof t == 'string' && (t = t.split('.')), t.length === 1)) e[t[0]] = n;
	else {
		if (t.length === 0) throw error;
		return e[t[0]] || (e[t[0]] = {}), We(e[t[0]], t.slice(1), n);
	}
}
var rn = {};
function S(e, t) {
	rn[e] = t;
}
function Ue(e, t) {
	return (
		Object.entries(rn).forEach(([n, r]) => {
			let i = null;
			function o() {
				if (i) return i;
				{
					let [a, s] = ln(t);
					return (i = { interceptor: nn, ...a }), Xt(t, s), i;
				}
			}
			Object.defineProperty(e, `$${n}`, {
				get() {
					return r(t, o());
				},
				enumerable: !1,
			});
		}),
		e
	);
}
function Rr(e, t, n, ...r) {
	try {
		return n(...r);
	} catch (i) {
		oe(i, e, t);
	}
}
function oe(e, t, n = void 0) {
	Object.assign(e, { el: t, expression: n }),
		console.warn(
			`Alpine Expression Error: ${e.message}

${
	n
		? 'Expression: "' +
		  n +
		  `"

`
		: ''
}`,
			t
		),
		setTimeout(() => {
			throw e;
		}, 0);
}
var _e = !0;
function on(e) {
	let t = _e;
	_e = !1;
	let n = e();
	return (_e = t), n;
}
function B(e, t, n = {}) {
	let r;
	return b(e, t)((i) => (r = i), n), r;
}
function b(...e) {
	return an(...e);
}
var an = sn;
function jr(e) {
	an = e;
}
function sn(e, t) {
	let n = {};
	Ue(n, e);
	let r = [n, ...z(e)],
		i = typeof t == 'function' ? Fr(r, t) : Br(r, t, e);
	return Rr.bind(null, e, t, i);
}
function Fr(e, t) {
	return (n = () => {}, { scope: r = {}, params: i = [] } = {}) => {
		let o = t.apply(ue([r, ...e]), i);
		ge(n, o);
	};
}
var Ne = {};
function Nr(e, t) {
	if (Ne[e]) return Ne[e];
	let n = Object.getPrototypeOf(async function () {}).constructor,
		r = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(async()=>{ ${e} })()` : e,
		o = (() => {
			try {
				return new n(
					['__self', 'scope'],
					`with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
				);
			} catch (a) {
				return oe(a, t, e), Promise.resolve();
			}
		})();
	return (Ne[e] = o), o;
}
function Br(e, t, n) {
	let r = Nr(t, n);
	return (i = () => {}, { scope: o = {}, params: a = [] } = {}) => {
		(r.result = void 0), (r.finished = !1);
		let s = ue([o, ...e]);
		if (typeof r == 'function') {
			let c = r(r, s).catch((u) => oe(u, n, t));
			r.finished
				? (ge(i, r.result, s, a, n), (r.result = void 0))
				: c
						.then((u) => {
							ge(i, u, s, a, n);
						})
						.catch((u) => oe(u, n, t))
						.finally(() => (r.result = void 0));
		}
	};
}
function ge(e, t, n, r, i) {
	if (_e && typeof t == 'function') {
		let o = t.apply(n, r);
		o instanceof Promise ? o.then((a) => ge(e, a, n, r)).catch((a) => oe(a, i, t)) : e(o);
	} else typeof t == 'object' && t instanceof Promise ? t.then((o) => e(o)) : e(t);
}
var ut = 'x-';
function V(e = '') {
	return ut + e;
}
function Dr(e) {
	ut = e;
}
var Ve = {};
function g(e, t) {
	return (
		(Ve[e] = t),
		{
			before(n) {
				if (!Ve[n]) {
					console.warn('Cannot find directive `${directive}`. `${name}` will use the default order of execution');
					return;
				}
				const r = F.indexOf(n);
				F.splice(r >= 0 ? r : F.indexOf('DEFAULT'), 0, e);
			},
		}
	);
}
function lt(e, t, n) {
	if (((t = Array.from(t)), e._x_virtualDirectives)) {
		let o = Object.entries(e._x_virtualDirectives).map(([s, c]) => ({ name: s, value: c })),
			a = cn(o);
		(o = o.map((s) => (a.find((c) => c.name === s.name) ? { name: `x-bind:${s.name}`, value: `"${s.value}"` } : s))),
			(t = t.concat(o));
	}
	let r = {};
	return t
		.map(pn((o, a) => (r[o] = a)))
		.filter(hn)
		.map(Hr(r, n))
		.sort(zr)
		.map((o) => kr(e, o));
}
function cn(e) {
	return Array.from(e)
		.map(pn())
		.filter((t) => !hn(t));
}
var Je = !1,
	Z = new Map(),
	un = Symbol();
function Kr(e) {
	Je = !0;
	let t = Symbol();
	(un = t), Z.set(t, []);
	let n = () => {
			for (; Z.get(t).length; ) Z.get(t).shift()();
			Z.delete(t);
		},
		r = () => {
			(Je = !1), n();
		};
	e(n), r();
}
function ln(e) {
	let t = [],
		n = (s) => t.push(s),
		[r, i] = Ar(e);
	return (
		t.push(i),
		[
			{ Alpine: fe, effect: r, cleanup: n, evaluateLater: b.bind(b, e), evaluate: B.bind(B, e) },
			() => t.forEach((s) => s()),
		]
	);
}
function kr(e, t) {
	let n = () => {},
		r = Ve[t.type] || n,
		[i, o] = ln(e);
	Tr(e, t.original, o);
	let a = () => {
		e._x_ignore ||
			e._x_ignoreSelf ||
			(r.inline && r.inline(e, t, i), (r = r.bind(r, e, t, i)), Je ? Z.get(un).push(r) : r());
	};
	return (a.runCleanups = o), a;
}
var fn =
		(e, t) =>
		({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }),
	dn = (e) => e;
function pn(e = () => {}) {
	return ({ name: t, value: n }) => {
		let { name: r, value: i } = _n.reduce((o, a) => a(o), { name: t, value: n });
		return r !== t && e(r, t), { name: r, value: i };
	};
}
var _n = [];
function ft(e) {
	_n.push(e);
}
function hn({ name: e }) {
	return gn().test(e);
}
var gn = () => new RegExp(`^${ut}([^:^.]+)\\b`);
function Hr(e, t) {
	return ({ name: n, value: r }) => {
		let i = n.match(gn()),
			o = n.match(/:([a-zA-Z0-9\-:]+)/),
			a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
			s = t || e[n] || n;
		return {
			type: i ? i[1] : null,
			value: o ? o[1] : null,
			modifiers: a.map((c) => c.replace('.', '')),
			expression: r,
			original: s,
		};
	};
}
var Ye = 'DEFAULT',
	F = [
		'ignore',
		'ref',
		'data',
		'id',
		'bind',
		'init',
		'for',
		'model',
		'modelable',
		'transition',
		'show',
		'if',
		Ye,
		'teleport',
	];
function zr(e, t) {
	let n = F.indexOf(e.type) === -1 ? Ye : e.type,
		r = F.indexOf(t.type) === -1 ? Ye : t.type;
	return F.indexOf(n) - F.indexOf(r);
}
function ne(e, t, n = {}) {
	e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0, composed: !0, cancelable: !0 }));
}
function P(e, t) {
	if (typeof ShadowRoot == 'function' && e instanceof ShadowRoot) {
		Array.from(e.children).forEach((i) => P(i, t));
		return;
	}
	let n = !1;
	if ((t(e, () => (n = !0)), n)) return;
	let r = e.firstElementChild;
	for (; r; ) P(r, t), (r = r.nextElementSibling);
}
function L(e, ...t) {
	console.warn(`Alpine Warning: ${e}`, ...t);
}
var It = !1;
function qr() {
	It &&
		L('Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.'),
		(It = !0),
		document.body ||
			L(
				"Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
			),
		ne(document, 'alpine:init'),
		ne(document, 'alpine:initializing'),
		at(),
		Cr((t) => $(t, P)),
		Xt((t) => En(t)),
		Or((t, n) => {
			lt(t, n).forEach((r) => r());
		});
	let e = (t) => !be(t.parentElement, !0);
	Array.from(document.querySelectorAll(yn()))
		.filter(e)
		.forEach((t) => {
			$(t);
		}),
		ne(document, 'alpine:initialized');
}
var dt = [],
	vn = [];
function mn() {
	return dt.map((e) => e());
}
function yn() {
	return dt.concat(vn).map((e) => e());
}
function xn(e) {
	dt.push(e);
}
function bn(e) {
	vn.push(e);
}
function be(e, t = !1) {
	return we(e, (n) => {
		if ((t ? yn() : mn()).some((i) => n.matches(i))) return !0;
	});
}
function we(e, t) {
	if (e) {
		if (t(e)) return e;
		if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)) return we(e.parentElement, t);
	}
}
function Wr(e) {
	return mn().some((t) => e.matches(t));
}
var wn = [];
function Ur(e) {
	wn.push(e);
}
function $(e, t = P, n = () => {}) {
	Kr(() => {
		t(e, (r, i) => {
			n(r, i), wn.forEach((o) => o(r, i)), lt(r, r.attributes).forEach((o) => o()), r._x_ignore && i();
		});
	});
}
function En(e) {
	P(e, (t) => Qt(t));
}
var Ge = [],
	pt = !1;
function _t(e = () => {}) {
	return (
		queueMicrotask(() => {
			pt ||
				setTimeout(() => {
					Xe();
				});
		}),
		new Promise((t) => {
			Ge.push(() => {
				e(), t();
			});
		})
	);
}
function Xe() {
	for (pt = !1; Ge.length; ) Ge.shift()();
}
function Vr() {
	pt = !0;
}
function ht(e, t) {
	return Array.isArray(t)
		? Pt(e, t.join(' '))
		: typeof t == 'object' && t !== null
		? Jr(e, t)
		: typeof t == 'function'
		? ht(e, t())
		: Pt(e, t);
}
function Pt(e, t) {
	let n = (i) =>
			i
				.split(' ')
				.filter((o) => !e.classList.contains(o))
				.filter(Boolean),
		r = (i) => (
			e.classList.add(...i),
			() => {
				e.classList.remove(...i);
			}
		);
	return (t = t === !0 ? (t = '') : t || ''), r(n(t));
}
function Jr(e, t) {
	let n = (s) => s.split(' ').filter(Boolean),
		r = Object.entries(t)
			.flatMap(([s, c]) => (c ? n(s) : !1))
			.filter(Boolean),
		i = Object.entries(t)
			.flatMap(([s, c]) => (c ? !1 : n(s)))
			.filter(Boolean),
		o = [],
		a = [];
	return (
		i.forEach((s) => {
			e.classList.contains(s) && (e.classList.remove(s), a.push(s));
		}),
		r.forEach((s) => {
			e.classList.contains(s) || (e.classList.add(s), o.push(s));
		}),
		() => {
			a.forEach((s) => e.classList.add(s)), o.forEach((s) => e.classList.remove(s));
		}
	);
}
function Ee(e, t) {
	return typeof t == 'object' && t !== null ? Yr(e, t) : Gr(e, t);
}
function Yr(e, t) {
	let n = {};
	return (
		Object.entries(t).forEach(([r, i]) => {
			(n[r] = e.style[r]), r.startsWith('--') || (r = Xr(r)), e.style.setProperty(r, i);
		}),
		setTimeout(() => {
			e.style.length === 0 && e.removeAttribute('style');
		}),
		() => {
			Ee(e, n);
		}
	);
}
function Gr(e, t) {
	let n = e.getAttribute('style', t);
	return (
		e.setAttribute('style', t),
		() => {
			e.setAttribute('style', n || '');
		}
	);
}
function Xr(e) {
	return e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function Qe(e, t = () => {}) {
	let n = !1;
	return function () {
		n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
	};
}
g('transition', (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
	typeof r == 'function' && (r = i(r)), r !== !1 && (!r || typeof r == 'boolean' ? Zr(e, n, t) : Qr(e, r, t));
});
function Qr(e, t, n) {
	Sn(e, ht, ''),
		{
			enter: (i) => {
				e._x_transition.enter.during = i;
			},
			'enter-start': (i) => {
				e._x_transition.enter.start = i;
			},
			'enter-end': (i) => {
				e._x_transition.enter.end = i;
			},
			leave: (i) => {
				e._x_transition.leave.during = i;
			},
			'leave-start': (i) => {
				e._x_transition.leave.start = i;
			},
			'leave-end': (i) => {
				e._x_transition.leave.end = i;
			},
		}[n](t);
}
function Zr(e, t, n) {
	Sn(e, Ee);
	let r = !t.includes('in') && !t.includes('out') && !n,
		i = r || t.includes('in') || ['enter'].includes(n),
		o = r || t.includes('out') || ['leave'].includes(n);
	t.includes('in') && !r && (t = t.filter((_, v) => v < t.indexOf('out'))),
		t.includes('out') && !r && (t = t.filter((_, v) => v > t.indexOf('out')));
	let a = !t.includes('opacity') && !t.includes('scale'),
		s = a || t.includes('opacity'),
		c = a || t.includes('scale'),
		u = s ? 0 : 1,
		l = c ? G(t, 'scale', 95) / 100 : 1,
		d = G(t, 'delay', 0) / 1e3,
		p = G(t, 'origin', 'center'),
		m = 'opacity, transform',
		T = G(t, 'duration', 150) / 1e3,
		de = G(t, 'duration', 75) / 1e3,
		f = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
	i &&
		((e._x_transition.enter.during = {
			transformOrigin: p,
			transitionDelay: `${d}s`,
			transitionProperty: m,
			transitionDuration: `${T}s`,
			transitionTimingFunction: f,
		}),
		(e._x_transition.enter.start = { opacity: u, transform: `scale(${l})` }),
		(e._x_transition.enter.end = { opacity: 1, transform: 'scale(1)' })),
		o &&
			((e._x_transition.leave.during = {
				transformOrigin: p,
				transitionDelay: `${d}s`,
				transitionProperty: m,
				transitionDuration: `${de}s`,
				transitionTimingFunction: f,
			}),
			(e._x_transition.leave.start = { opacity: 1, transform: 'scale(1)' }),
			(e._x_transition.leave.end = { opacity: u, transform: `scale(${l})` }));
}
function Sn(e, t, n = {}) {
	e._x_transition ||
		(e._x_transition = {
			enter: { during: n, start: n, end: n },
			leave: { during: n, start: n, end: n },
			in(r = () => {}, i = () => {}) {
				Ze(e, t, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, r, i);
			},
			out(r = () => {}, i = () => {}) {
				Ze(e, t, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, r, i);
			},
		});
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (e, t, n, r) {
	const i = document.visibilityState === 'visible' ? requestAnimationFrame : setTimeout;
	let o = () => i(n);
	if (t) {
		e._x_transition && (e._x_transition.enter || e._x_transition.leave)
			? e._x_transition.enter &&
			  (Object.entries(e._x_transition.enter.during).length ||
					Object.entries(e._x_transition.enter.start).length ||
					Object.entries(e._x_transition.enter.end).length)
				? e._x_transition.in(n)
				: o()
			: e._x_transition
			? e._x_transition.in(n)
			: o();
		return;
	}
	(e._x_hidePromise = e._x_transition
		? new Promise((a, s) => {
				e._x_transition.out(
					() => {},
					() => a(r)
				),
					e._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: !0 }));
		  })
		: Promise.resolve(r)),
		queueMicrotask(() => {
			let a = An(e);
			a
				? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(e))
				: i(() => {
						let s = (c) => {
							let u = Promise.all([c._x_hidePromise, ...(c._x_hideChildren || []).map(s)]).then(([l]) => l());
							return delete c._x_hidePromise, delete c._x_hideChildren, u;
						};
						s(e).catch((c) => {
							if (!c.isFromCancelledTransition) throw c;
						});
				  });
		});
};
function An(e) {
	let t = e.parentNode;
	if (t) return t._x_hidePromise ? t : An(t);
}
function Ze(e, t, { during: n, start: r, end: i } = {}, o = () => {}, a = () => {}) {
	if (
		(e._x_transitioning && e._x_transitioning.cancel(),
		Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0)
	) {
		o(), a();
		return;
	}
	let s, c, u;
	ei(e, {
		start() {
			s = t(e, r);
		},
		during() {
			c = t(e, n);
		},
		before: o,
		end() {
			s(), (u = t(e, i));
		},
		after: a,
		cleanup() {
			c(), u();
		},
	});
}
function ei(e, t) {
	let n,
		r,
		i,
		o = Qe(() => {
			y(() => {
				(n = !0),
					r || t.before(),
					i || (t.end(), Xe()),
					t.after(),
					e.isConnected && t.cleanup(),
					delete e._x_transitioning;
			});
		});
	(e._x_transitioning = {
		beforeCancels: [],
		beforeCancel(a) {
			this.beforeCancels.push(a);
		},
		cancel: Qe(function () {
			for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
			o();
		}),
		finish: o,
	}),
		y(() => {
			t.start(), t.during();
		}),
		Vr(),
		requestAnimationFrame(() => {
			if (n) return;
			let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, '').replace('s', '')) * 1e3,
				s = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, '').replace('s', '')) * 1e3;
			a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace('s', '')) * 1e3),
				y(() => {
					t.before();
				}),
				(r = !0),
				requestAnimationFrame(() => {
					n ||
						(y(() => {
							t.end();
						}),
						Xe(),
						setTimeout(e._x_transitioning.finish, a + s),
						(i = !0));
				});
		});
}
function G(e, t, n) {
	if (e.indexOf(t) === -1) return n;
	const r = e[e.indexOf(t) + 1];
	if (!r || (t === 'scale' && isNaN(r))) return n;
	if (t === 'duration' || t === 'delay') {
		let i = r.match(/([0-9]+)ms/);
		if (i) return i[1];
	}
	return t === 'origin' && ['top', 'right', 'left', 'center', 'bottom'].includes(e[e.indexOf(t) + 2])
		? [r, e[e.indexOf(t) + 2]].join(' ')
		: r;
}
var ae = !1;
function le(e, t = () => {}) {
	return (...n) => (ae ? t(...n) : e(...n));
}
function ti(e) {
	return (...t) => ae && e(...t);
}
function ni(e, t) {
	t._x_dataStack || (t._x_dataStack = e._x_dataStack),
		(ae = !0),
		ii(() => {
			ri(t);
		}),
		(ae = !1);
}
function ri(e) {
	let t = !1;
	$(e, (r, i) => {
		P(r, (o, a) => {
			if (t && Wr(o)) return a();
			(t = !0), i(o, a);
		});
	});
}
function ii(e) {
	let t = U;
	Mt((n, r) => {
		let i = t(n);
		return se(i), () => {};
	}),
		e(),
		Mt(t);
}
function Cn(e, t, n, r = []) {
	switch (
		(e._x_bindings || (e._x_bindings = W({})), (e._x_bindings[t] = n), (t = r.includes('camel') ? di(t) : t), t)
	) {
		case 'value':
			oi(e, n);
			break;
		case 'style':
			si(e, n);
			break;
		case 'class':
			ai(e, n);
			break;
		case 'selected':
		case 'checked':
			ci(e, t, n);
			break;
		default:
			On(e, t, n);
			break;
	}
}
function oi(e, t) {
	if (e.type === 'radio')
		e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = Lt(e.value, t));
	else if (e.type === 'checkbox')
		Number.isInteger(t)
			? (e.value = t)
			: !Number.isInteger(t) && !Array.isArray(t) && typeof t != 'boolean' && ![null, void 0].includes(t)
			? (e.value = String(t))
			: Array.isArray(t)
			? (e.checked = t.some((n) => Lt(n, e.value)))
			: (e.checked = !!t);
	else if (e.tagName === 'SELECT') fi(e, t);
	else {
		if (e.value === t) return;
		e.value = t;
	}
}
function ai(e, t) {
	e._x_undoAddedClasses && e._x_undoAddedClasses(), (e._x_undoAddedClasses = ht(e, t));
}
function si(e, t) {
	e._x_undoAddedStyles && e._x_undoAddedStyles(), (e._x_undoAddedStyles = Ee(e, t));
}
function ci(e, t, n) {
	On(e, t, n), li(e, t, n);
}
function On(e, t, n) {
	[null, void 0, !1].includes(n) && pi(t) ? e.removeAttribute(t) : (Tn(t) && (n = t), ui(e, t, n));
}
function ui(e, t, n) {
	e.getAttribute(t) != n && e.setAttribute(t, n);
}
function li(e, t, n) {
	e[t] !== n && (e[t] = n);
}
function fi(e, t) {
	const n = [].concat(t).map((r) => r + '');
	Array.from(e.options).forEach((r) => {
		r.selected = n.includes(r.value);
	});
}
function di(e) {
	return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Lt(e, t) {
	return e == t;
}
function Tn(e) {
	return [
		'disabled',
		'checked',
		'required',
		'readonly',
		'hidden',
		'open',
		'selected',
		'autofocus',
		'itemscope',
		'multiple',
		'novalidate',
		'allowfullscreen',
		'allowpaymentrequest',
		'formnovalidate',
		'autoplay',
		'controls',
		'loop',
		'muted',
		'playsinline',
		'default',
		'ismap',
		'reversed',
		'async',
		'defer',
		'nomodule',
	].includes(e);
}
function pi(e) {
	return !['aria-pressed', 'aria-checked', 'aria-expanded', 'aria-selected'].includes(e);
}
function _i(e, t, n) {
	return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : Mn(e, t, n);
}
function hi(e, t, n, r = !0) {
	if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
	if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
		let i = e._x_inlineBindings[t];
		return (i.extract = r), on(() => B(e, i.expression));
	}
	return Mn(e, t, n);
}
function Mn(e, t, n) {
	let r = e.getAttribute(t);
	return r === null ? (typeof n == 'function' ? n() : n) : r === '' ? !0 : Tn(t) ? !![t, 'true'].includes(r) : r;
}
function In(e, t) {
	var n;
	return function () {
		var r = this,
			i = arguments,
			o = function () {
				(n = null), e.apply(r, i);
			};
		clearTimeout(n), (n = setTimeout(o, t));
	};
}
function Pn(e, t) {
	let n;
	return function () {
		let r = this,
			i = arguments;
		n || (e.apply(r, i), (n = !0), setTimeout(() => (n = !1), t));
	};
}
function gi(e) {
	(Array.isArray(e) ? e : [e]).forEach((n) => n(fe));
}
var j = {},
	$t = !1;
function vi(e, t) {
	if (($t || ((j = W(j)), ($t = !0)), t === void 0)) return j[e];
	(j[e] = t),
		typeof t == 'object' && t !== null && t.hasOwnProperty('init') && typeof t.init == 'function' && j[e].init(),
		tn(j[e]);
}
function mi() {
	return j;
}
var Ln = {};
function yi(e, t) {
	let n = typeof t != 'function' ? () => t : t;
	e instanceof Element ? $n(e, n()) : (Ln[e] = n);
}
function xi(e) {
	return (
		Object.entries(Ln).forEach(([t, n]) => {
			Object.defineProperty(e, t, {
				get() {
					return (...r) => n(...r);
				},
			});
		}),
		e
	);
}
function $n(e, t, n) {
	let r = [];
	for (; r.length; ) r.pop()();
	let i = Object.entries(t).map(([a, s]) => ({ name: a, value: s })),
		o = cn(i);
	(i = i.map((a) => (o.find((s) => s.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a))),
		lt(e, i, n).map((a) => {
			r.push(a.runCleanups), a();
		});
}
var Rn = {};
function bi(e, t) {
	Rn[e] = t;
}
function wi(e, t) {
	return (
		Object.entries(Rn).forEach(([n, r]) => {
			Object.defineProperty(e, n, {
				get() {
					return (...i) => r.bind(t)(...i);
				},
				enumerable: !1,
			});
		}),
		e
	);
}
var Ei = {
		get reactive() {
			return W;
		},
		get release() {
			return se;
		},
		get effect() {
			return U;
		},
		get raw() {
			return Vt;
		},
		version: '3.12.3',
		flushAndStopDeferringMutations: Lr,
		dontAutoEvaluateFunctions: on,
		disableEffectScheduling: Er,
		startObservingMutations: at,
		stopObservingMutations: Zt,
		setReactivityEngine: Sr,
		closestDataStack: z,
		skipDuringClone: le,
		onlyDuringClone: ti,
		addRootSelector: xn,
		addInitSelector: bn,
		addScopeToNode: ce,
		deferMutations: Pr,
		mapAttributes: ft,
		evaluateLater: b,
		interceptInit: Ur,
		setEvaluator: jr,
		mergeProxies: ue,
		extractProp: hi,
		findClosest: we,
		closestRoot: be,
		destroyTree: En,
		interceptor: nn,
		transition: Ze,
		setStyles: Ee,
		mutateDom: y,
		directive: g,
		throttle: Pn,
		debounce: In,
		evaluate: B,
		initTree: $,
		nextTick: _t,
		prefixed: V,
		prefix: Dr,
		plugin: gi,
		magic: S,
		store: vi,
		start: qr,
		clone: ni,
		bound: _i,
		$data: en,
		walk: P,
		data: bi,
		bind: yi,
	},
	fe = Ei;
function Si(e, t) {
	const n = Object.create(null),
		r = e.split(',');
	for (let i = 0; i < r.length; i++) n[r[i]] = !0;
	return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var Ai = Object.freeze({}),
	jn = Object.assign,
	Ci = Object.prototype.hasOwnProperty,
	Se = (e, t) => Ci.call(e, t),
	D = Array.isArray,
	re = (e) => Fn(e) === '[object Map]',
	Oi = (e) => typeof e == 'string',
	gt = (e) => typeof e == 'symbol',
	Ae = (e) => e !== null && typeof e == 'object',
	Ti = Object.prototype.toString,
	Fn = (e) => Ti.call(e),
	Nn = (e) => Fn(e).slice(8, -1),
	vt = (e) => Oi(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
	Mi = (e) => {
		const t = Object.create(null);
		return (n) => t[n] || (t[n] = e(n));
	},
	Ii = Mi((e) => e.charAt(0).toUpperCase() + e.slice(1)),
	Bn = (e, t) => e !== t && (e === e || t === t),
	et = new WeakMap(),
	X = [],
	A,
	K = Symbol('iterate'),
	tt = Symbol('Map key iterate');
function Pi(e) {
	return e && e._isEffect === !0;
}
function Li(e, t = Ai) {
	Pi(e) && (e = e.raw);
	const n = ji(e, t);
	return t.lazy || n(), n;
}
function $i(e) {
	e.active && (Dn(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var Ri = 0;
function ji(e, t) {
	const n = function () {
		if (!n.active) return e();
		if (!X.includes(n)) {
			Dn(n);
			try {
				return Ni(), X.push(n), (A = n), e();
			} finally {
				X.pop(), Kn(), (A = X[X.length - 1]);
			}
		}
	};
	return (
		(n.id = Ri++),
		(n.allowRecurse = !!t.allowRecurse),
		(n._isEffect = !0),
		(n.active = !0),
		(n.raw = e),
		(n.deps = []),
		(n.options = t),
		n
	);
}
function Dn(e) {
	const { deps: t } = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0;
	}
}
var q = !0,
	mt = [];
function Fi() {
	mt.push(q), (q = !1);
}
function Ni() {
	mt.push(q), (q = !0);
}
function Kn() {
	const e = mt.pop();
	q = e === void 0 ? !0 : e;
}
function E(e, t, n) {
	if (!q || A === void 0) return;
	let r = et.get(e);
	r || et.set(e, (r = new Map()));
	let i = r.get(n);
	i || r.set(n, (i = new Set())),
		i.has(A) ||
			(i.add(A), A.deps.push(i), A.options.onTrack && A.options.onTrack({ effect: A, target: e, type: t, key: n }));
}
function R(e, t, n, r, i, o) {
	const a = et.get(e);
	if (!a) return;
	const s = new Set(),
		c = (l) => {
			l &&
				l.forEach((d) => {
					(d !== A || d.allowRecurse) && s.add(d);
				});
		};
	if (t === 'clear') a.forEach(c);
	else if (n === 'length' && D(e))
		a.forEach((l, d) => {
			(d === 'length' || d >= r) && c(l);
		});
	else
		switch ((n !== void 0 && c(a.get(n)), t)) {
			case 'add':
				D(e) ? vt(n) && c(a.get('length')) : (c(a.get(K)), re(e) && c(a.get(tt)));
				break;
			case 'delete':
				D(e) || (c(a.get(K)), re(e) && c(a.get(tt)));
				break;
			case 'set':
				re(e) && c(a.get(K));
				break;
		}
	const u = (l) => {
		l.options.onTrigger &&
			l.options.onTrigger({ effect: l, target: e, key: n, type: t, newValue: r, oldValue: i, oldTarget: o }),
			l.options.scheduler ? l.options.scheduler(l) : l();
	};
	s.forEach(u);
}
var Bi = Si('__proto__,__v_isRef,__isVue'),
	kn = new Set(
		Object.getOwnPropertyNames(Symbol)
			.map((e) => Symbol[e])
			.filter(gt)
	),
	Di = Ce(),
	Ki = Ce(!1, !0),
	ki = Ce(!0),
	Hi = Ce(!0, !0),
	ve = {};
['includes', 'indexOf', 'lastIndexOf'].forEach((e) => {
	const t = Array.prototype[e];
	ve[e] = function (...n) {
		const r = h(this);
		for (let o = 0, a = this.length; o < a; o++) E(r, 'get', o + '');
		const i = t.apply(r, n);
		return i === -1 || i === !1 ? t.apply(r, n.map(h)) : i;
	};
});
['push', 'pop', 'shift', 'unshift', 'splice'].forEach((e) => {
	const t = Array.prototype[e];
	ve[e] = function (...n) {
		Fi();
		const r = t.apply(this, n);
		return Kn(), r;
	};
});
function Ce(e = !1, t = !1) {
	return function (r, i, o) {
		if (i === '__v_isReactive') return !e;
		if (i === '__v_isReadonly') return e;
		if (i === '__v_raw' && o === (e ? (t ? Qi : nr) : t ? Xi : tr).get(r)) return r;
		const a = D(r);
		if (!e && a && Se(ve, i)) return Reflect.get(ve, i, o);
		const s = Reflect.get(r, i, o);
		return (gt(i) ? kn.has(i) : Bi(i)) || (e || E(r, 'get', i), t)
			? s
			: nt(s)
			? !a || !vt(i)
				? s.value
				: s
			: Ae(s)
			? e
				? rr(s)
				: wt(s)
			: s;
	};
}
var zi = Hn(),
	qi = Hn(!0);
function Hn(e = !1) {
	return function (n, r, i, o) {
		let a = n[r];
		if (!e && ((i = h(i)), (a = h(a)), !D(n) && nt(a) && !nt(i))) return (a.value = i), !0;
		const s = D(n) && vt(r) ? Number(r) < n.length : Se(n, r),
			c = Reflect.set(n, r, i, o);
		return n === h(o) && (s ? Bn(i, a) && R(n, 'set', r, i, a) : R(n, 'add', r, i)), c;
	};
}
function Wi(e, t) {
	const n = Se(e, t),
		r = e[t],
		i = Reflect.deleteProperty(e, t);
	return i && n && R(e, 'delete', t, void 0, r), i;
}
function Ui(e, t) {
	const n = Reflect.has(e, t);
	return (!gt(t) || !kn.has(t)) && E(e, 'has', t), n;
}
function Vi(e) {
	return E(e, 'iterate', D(e) ? 'length' : K), Reflect.ownKeys(e);
}
var zn = { get: Di, set: zi, deleteProperty: Wi, has: Ui, ownKeys: Vi },
	qn = {
		get: ki,
		set(e, t) {
			return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
		},
		deleteProperty(e, t) {
			return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
		},
	};
jn({}, zn, { get: Ki, set: qi });
jn({}, qn, { get: Hi });
var yt = (e) => (Ae(e) ? wt(e) : e),
	xt = (e) => (Ae(e) ? rr(e) : e),
	bt = (e) => e,
	Oe = (e) => Reflect.getPrototypeOf(e);
function Te(e, t, n = !1, r = !1) {
	e = e.__v_raw;
	const i = h(e),
		o = h(t);
	t !== o && !n && E(i, 'get', t), !n && E(i, 'get', o);
	const { has: a } = Oe(i),
		s = r ? bt : n ? xt : yt;
	if (a.call(i, t)) return s(e.get(t));
	if (a.call(i, o)) return s(e.get(o));
	e !== i && e.get(t);
}
function Me(e, t = !1) {
	const n = this.__v_raw,
		r = h(n),
		i = h(e);
	return e !== i && !t && E(r, 'has', e), !t && E(r, 'has', i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Ie(e, t = !1) {
	return (e = e.__v_raw), !t && E(h(e), 'iterate', K), Reflect.get(e, 'size', e);
}
function Wn(e) {
	e = h(e);
	const t = h(this);
	return Oe(t).has.call(t, e) || (t.add(e), R(t, 'add', e, e)), this;
}
function Un(e, t) {
	t = h(t);
	const n = h(this),
		{ has: r, get: i } = Oe(n);
	let o = r.call(n, e);
	o ? er(n, r, e) : ((e = h(e)), (o = r.call(n, e)));
	const a = i.call(n, e);
	return n.set(e, t), o ? Bn(t, a) && R(n, 'set', e, t, a) : R(n, 'add', e, t), this;
}
function Vn(e) {
	const t = h(this),
		{ has: n, get: r } = Oe(t);
	let i = n.call(t, e);
	i ? er(t, n, e) : ((e = h(e)), (i = n.call(t, e)));
	const o = r ? r.call(t, e) : void 0,
		a = t.delete(e);
	return i && R(t, 'delete', e, void 0, o), a;
}
function Jn() {
	const e = h(this),
		t = e.size !== 0,
		n = re(e) ? new Map(e) : new Set(e),
		r = e.clear();
	return t && R(e, 'clear', void 0, void 0, n), r;
}
function Pe(e, t) {
	return function (r, i) {
		const o = this,
			a = o.__v_raw,
			s = h(a),
			c = t ? bt : e ? xt : yt;
		return !e && E(s, 'iterate', K), a.forEach((u, l) => r.call(i, c(u), c(l), o));
	};
}
function pe(e, t, n) {
	return function (...r) {
		const i = this.__v_raw,
			o = h(i),
			a = re(o),
			s = e === 'entries' || (e === Symbol.iterator && a),
			c = e === 'keys' && a,
			u = i[e](...r),
			l = n ? bt : t ? xt : yt;
		return (
			!t && E(o, 'iterate', c ? tt : K),
			{
				next() {
					const { value: d, done: p } = u.next();
					return p ? { value: d, done: p } : { value: s ? [l(d[0]), l(d[1])] : l(d), done: p };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function I(e) {
	return function (...t) {
		{
			const n = t[0] ? `on key "${t[0]}" ` : '';
			console.warn(`${Ii(e)} operation ${n}failed: target is readonly.`, h(this));
		}
		return e === 'delete' ? !1 : this;
	};
}
var Yn = {
		get(e) {
			return Te(this, e);
		},
		get size() {
			return Ie(this);
		},
		has: Me,
		add: Wn,
		set: Un,
		delete: Vn,
		clear: Jn,
		forEach: Pe(!1, !1),
	},
	Gn = {
		get(e) {
			return Te(this, e, !1, !0);
		},
		get size() {
			return Ie(this);
		},
		has: Me,
		add: Wn,
		set: Un,
		delete: Vn,
		clear: Jn,
		forEach: Pe(!1, !0),
	},
	Xn = {
		get(e) {
			return Te(this, e, !0);
		},
		get size() {
			return Ie(this, !0);
		},
		has(e) {
			return Me.call(this, e, !0);
		},
		add: I('add'),
		set: I('set'),
		delete: I('delete'),
		clear: I('clear'),
		forEach: Pe(!0, !1),
	},
	Qn = {
		get(e) {
			return Te(this, e, !0, !0);
		},
		get size() {
			return Ie(this, !0);
		},
		has(e) {
			return Me.call(this, e, !0);
		},
		add: I('add'),
		set: I('set'),
		delete: I('delete'),
		clear: I('clear'),
		forEach: Pe(!0, !0),
	},
	Ji = ['keys', 'values', 'entries', Symbol.iterator];
Ji.forEach((e) => {
	(Yn[e] = pe(e, !1, !1)), (Xn[e] = pe(e, !0, !1)), (Gn[e] = pe(e, !1, !0)), (Qn[e] = pe(e, !0, !0));
});
function Zn(e, t) {
	const n = t ? (e ? Qn : Gn) : e ? Xn : Yn;
	return (r, i, o) =>
		i === '__v_isReactive'
			? !e
			: i === '__v_isReadonly'
			? e
			: i === '__v_raw'
			? r
			: Reflect.get(Se(n, i) && i in r ? n : r, i, o);
}
var Yi = { get: Zn(!1, !1) },
	Gi = { get: Zn(!0, !1) };
function er(e, t, n) {
	const r = h(n);
	if (r !== n && t.call(e, r)) {
		const i = Nn(e);
		console.warn(
			`Reactive ${i} contains both the raw and reactive versions of the same object${
				i === 'Map' ? ' as keys' : ''
			}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
		);
	}
}
var tr = new WeakMap(),
	Xi = new WeakMap(),
	nr = new WeakMap(),
	Qi = new WeakMap();
function Zi(e) {
	switch (e) {
		case 'Object':
		case 'Array':
			return 1;
		case 'Map':
		case 'Set':
		case 'WeakMap':
		case 'WeakSet':
			return 2;
		default:
			return 0;
	}
}
function eo(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Zi(Nn(e));
}
function wt(e) {
	return e && e.__v_isReadonly ? e : ir(e, !1, zn, Yi, tr);
}
function rr(e) {
	return ir(e, !0, qn, Gi, nr);
}
function ir(e, t, n, r, i) {
	if (!Ae(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e;
	if (e.__v_raw && !(t && e.__v_isReactive)) return e;
	const o = i.get(e);
	if (o) return o;
	const a = eo(e);
	if (a === 0) return e;
	const s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
function h(e) {
	return (e && h(e.__v_raw)) || e;
}
function nt(e) {
	return !!(e && e.__v_isRef === !0);
}
S('nextTick', () => _t);
S('dispatch', (e) => ne.bind(ne, e));
S('watch', (e, { evaluateLater: t, effect: n }) => (r, i) => {
	let o = t(r),
		a = !0,
		s,
		c = n(() =>
			o((u) => {
				JSON.stringify(u),
					a
						? (s = u)
						: queueMicrotask(() => {
								i(u, s), (s = u);
						  }),
					(a = !1);
			})
		);
	e._x_effects.delete(c);
});
S('store', mi);
S('data', (e) => en(e));
S('root', (e) => be(e));
S('refs', (e) => (e._x_refs_proxy || (e._x_refs_proxy = ue(to(e))), e._x_refs_proxy));
function to(e) {
	let t = [],
		n = e;
	for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
	return t;
}
var Be = {};
function or(e) {
	return Be[e] || (Be[e] = 0), ++Be[e];
}
function no(e, t) {
	return we(e, (n) => {
		if (n._x_ids && n._x_ids[t]) return !0;
	});
}
function ro(e, t) {
	e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = or(t));
}
S('id', (e) => (t, n = null) => {
	let r = no(e, t),
		i = r ? r._x_ids[t] : or(t);
	return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
S('el', (e) => e);
ar('Focus', 'focus', 'focus');
ar('Persist', 'persist', 'persist');
function ar(e, t, n) {
	S(t, (r) =>
		L(
			`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
			r
		)
	);
}
function io({ get: e, set: t }, { get: n, set: r }) {
	let i = !0,
		o,
		a,
		s = U(() => {
			let c, u;
			i
				? ((c = e()), r(c), (u = n()), (i = !1))
				: ((c = e()),
				  (u = n()),
				  (a = JSON.stringify(c)),
				  JSON.stringify(u),
				  a !== o ? ((u = n()), r(c), (u = c)) : (t(u), (c = u))),
				(o = JSON.stringify(c)),
				JSON.stringify(u);
		});
	return () => {
		se(s);
	};
}
g('modelable', (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
	let o = r(t),
		a = () => {
			let l;
			return o((d) => (l = d)), l;
		},
		s = r(`${t} = __placeholder`),
		c = (l) => s(() => {}, { scope: { __placeholder: l } }),
		u = a();
	c(u),
		queueMicrotask(() => {
			if (!e._x_model) return;
			e._x_removeModelListeners.default();
			let l = e._x_model.get,
				d = e._x_model.set,
				p = io(
					{
						get() {
							return l();
						},
						set(m) {
							d(m);
						},
					},
					{
						get() {
							return a();
						},
						set(m) {
							c(m);
						},
					}
				);
			i(p);
		});
});
var oo = document.createElement('div');
g('teleport', (e, { modifiers: t, expression: n }, { cleanup: r }) => {
	e.tagName.toLowerCase() !== 'template' && L('x-teleport can only be used on a <template> tag', e);
	let i = le(
		() => document.querySelector(n),
		() => oo
	)();
	i || L(`Cannot find x-teleport element for selector: "${n}"`);
	let o = e.content.cloneNode(!0).firstElementChild;
	(e._x_teleport = o),
		(o._x_teleportBack = e),
		e._x_forwardEvents &&
			e._x_forwardEvents.forEach((a) => {
				o.addEventListener(a, (s) => {
					s.stopPropagation(), e.dispatchEvent(new s.constructor(s.type, s));
				});
			}),
		ce(o, {}, e),
		y(() => {
			t.includes('prepend')
				? i.parentNode.insertBefore(o, i)
				: t.includes('append')
				? i.parentNode.insertBefore(o, i.nextSibling)
				: i.appendChild(o),
				$(o),
				(o._x_ignore = !0);
		}),
		r(() => o.remove());
});
var sr = () => {};
sr.inline = (e, { modifiers: t }, { cleanup: n }) => {
	t.includes('self') ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
		n(() => {
			t.includes('self') ? delete e._x_ignoreSelf : delete e._x_ignore;
		});
};
g('ignore', sr);
g('effect', (e, { expression: t }, { effect: n }) => n(b(e, t)));
function rt(e, t, n, r) {
	let i = e,
		o = (c) => r(c),
		a = {},
		s = (c, u) => (l) => u(c, l);
	if (
		(n.includes('dot') && (t = ao(t)),
		n.includes('camel') && (t = so(t)),
		n.includes('passive') && (a.passive = !0),
		n.includes('capture') && (a.capture = !0),
		n.includes('window') && (i = window),
		n.includes('document') && (i = document),
		n.includes('debounce'))
	) {
		let c = n[n.indexOf('debounce') + 1] || 'invalid-wait',
			u = me(c.split('ms')[0]) ? Number(c.split('ms')[0]) : 250;
		o = In(o, u);
	}
	if (n.includes('throttle')) {
		let c = n[n.indexOf('throttle') + 1] || 'invalid-wait',
			u = me(c.split('ms')[0]) ? Number(c.split('ms')[0]) : 250;
		o = Pn(o, u);
	}
	return (
		n.includes('prevent') &&
			(o = s(o, (c, u) => {
				u.preventDefault(), c(u);
			})),
		n.includes('stop') &&
			(o = s(o, (c, u) => {
				u.stopPropagation(), c(u);
			})),
		n.includes('self') &&
			(o = s(o, (c, u) => {
				u.target === e && c(u);
			})),
		(n.includes('away') || n.includes('outside')) &&
			((i = document),
			(o = s(o, (c, u) => {
				e.contains(u.target) ||
					(u.target.isConnected !== !1 && ((e.offsetWidth < 1 && e.offsetHeight < 1) || (e._x_isShown !== !1 && c(u))));
			}))),
		n.includes('once') &&
			(o = s(o, (c, u) => {
				c(u), i.removeEventListener(t, o, a);
			})),
		(o = s(o, (c, u) => {
			(uo(t) && lo(u, n)) || c(u);
		})),
		i.addEventListener(t, o, a),
		() => {
			i.removeEventListener(t, o, a);
		}
	);
}
function ao(e) {
	return e.replace(/-/g, '.');
}
function so(e) {
	return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function me(e) {
	return !Array.isArray(e) && !isNaN(e);
}
function co(e) {
	return [' ', '_'].includes(e)
		? e
		: e
				.replace(/([a-z])([A-Z])/g, '$1-$2')
				.replace(/[_\s]/, '-')
				.toLowerCase();
}
function uo(e) {
	return ['keydown', 'keyup'].includes(e);
}
function lo(e, t) {
	let n = t.filter((o) => !['window', 'document', 'prevent', 'stop', 'once', 'capture'].includes(o));
	if (n.includes('debounce')) {
		let o = n.indexOf('debounce');
		n.splice(o, me((n[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
	}
	if (n.includes('throttle')) {
		let o = n.indexOf('throttle');
		n.splice(o, me((n[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
	}
	if (n.length === 0 || (n.length === 1 && Rt(e.key).includes(n[0]))) return !1;
	const i = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'].filter((o) => n.includes(o));
	return (
		(n = n.filter((o) => !i.includes(o))),
		!(
			i.length > 0 &&
			i.filter((a) => ((a === 'cmd' || a === 'super') && (a = 'meta'), e[`${a}Key`])).length === i.length &&
			Rt(e.key).includes(n[0])
		)
	);
}
function Rt(e) {
	if (!e) return [];
	e = co(e);
	let t = {
		ctrl: 'control',
		slash: '/',
		space: ' ',
		spacebar: ' ',
		cmd: 'meta',
		esc: 'escape',
		up: 'arrow-up',
		down: 'arrow-down',
		left: 'arrow-left',
		right: 'arrow-right',
		period: '.',
		equal: '=',
		minus: '-',
		underscore: '_',
	};
	return (
		(t[e] = e),
		Object.keys(t)
			.map((n) => {
				if (t[n] === e) return n;
			})
			.filter((n) => n)
	);
}
g('model', (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
	let o = e;
	t.includes('parent') && (o = e.parentNode);
	let a = b(o, n),
		s;
	typeof n == 'string'
		? (s = b(o, `${n} = __placeholder`))
		: typeof n == 'function' && typeof n() == 'string'
		? (s = b(o, `${n()} = __placeholder`))
		: (s = () => {});
	let c = () => {
			let p;
			return a((m) => (p = m)), jt(p) ? p.get() : p;
		},
		u = (p) => {
			let m;
			a((T) => (m = T)), jt(m) ? m.set(p) : s(() => {}, { scope: { __placeholder: p } });
		};
	typeof n == 'string' &&
		e.type === 'radio' &&
		y(() => {
			e.hasAttribute('name') || e.setAttribute('name', n);
		});
	var l =
		e.tagName.toLowerCase() === 'select' || ['checkbox', 'radio'].includes(e.type) || t.includes('lazy')
			? 'change'
			: 'input';
	let d = ae
		? () => {}
		: rt(e, l, t, (p) => {
				u(fo(e, t, p, c()));
		  });
	if (
		(t.includes('fill') && [null, ''].includes(c()) && e.dispatchEvent(new Event(l, {})),
		e._x_removeModelListeners || (e._x_removeModelListeners = {}),
		(e._x_removeModelListeners.default = d),
		i(() => e._x_removeModelListeners.default()),
		e.form)
	) {
		let p = rt(e.form, 'reset', [], (m) => {
			_t(() => e._x_model && e._x_model.set(e.value));
		});
		i(() => p());
	}
	(e._x_model = {
		get() {
			return c();
		},
		set(p) {
			u(p);
		},
	}),
		(e._x_forceModelUpdate = (p) => {
			(p = p === void 0 ? c() : p),
				p === void 0 && typeof n == 'string' && n.match(/\./) && (p = ''),
				(window.fromModel = !0),
				y(() => Cn(e, 'value', p)),
				delete window.fromModel;
		}),
		r(() => {
			let p = c();
			(t.includes('unintrusive') && document.activeElement.isSameNode(e)) || e._x_forceModelUpdate(p);
		});
});
function fo(e, t, n, r) {
	return y(() => {
		if (n instanceof CustomEvent && n.detail !== void 0) return n.detail ?? n.target.value;
		if (e.type === 'checkbox')
			if (Array.isArray(r)) {
				let i = t.includes('number') ? De(n.target.value) : n.target.value;
				return n.target.checked ? r.concat([i]) : r.filter((o) => !po(o, i));
			} else return n.target.checked;
		else {
			if (e.tagName.toLowerCase() === 'select' && e.multiple)
				return t.includes('number')
					? Array.from(n.target.selectedOptions).map((i) => {
							let o = i.value || i.text;
							return De(o);
					  })
					: Array.from(n.target.selectedOptions).map((i) => i.value || i.text);
			{
				let i = n.target.value;
				return t.includes('number') ? De(i) : t.includes('trim') ? i.trim() : i;
			}
		}
	});
}
function De(e) {
	let t = e ? parseFloat(e) : null;
	return _o(t) ? t : e;
}
function po(e, t) {
	return e == t;
}
function _o(e) {
	return !Array.isArray(e) && !isNaN(e);
}
function jt(e) {
	return e !== null && typeof e == 'object' && typeof e.get == 'function' && typeof e.set == 'function';
}
g('cloak', (e) => queueMicrotask(() => y(() => e.removeAttribute(V('cloak')))));
bn(() => `[${V('init')}]`);
g(
	'init',
	le((e, { expression: t }, { evaluate: n }) => (typeof t == 'string' ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)))
);
g('text', (e, { expression: t }, { effect: n, evaluateLater: r }) => {
	let i = r(t);
	n(() => {
		i((o) => {
			y(() => {
				e.textContent = o;
			});
		});
	});
});
g('html', (e, { expression: t }, { effect: n, evaluateLater: r }) => {
	let i = r(t);
	n(() => {
		i((o) => {
			y(() => {
				(e.innerHTML = o), (e._x_ignoreSelf = !0), $(e), delete e._x_ignoreSelf;
			});
		});
	});
});
ft(fn(':', dn(V('bind:'))));
var cr = (e, { value: t, modifiers: n, expression: r, original: i }, { effect: o }) => {
	if (!t) {
		let s = {};
		xi(s),
			b(e, r)(
				(u) => {
					$n(e, u, i);
				},
				{ scope: s }
			);
		return;
	}
	if (t === 'key') return ho(e, r);
	if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract) return;
	let a = b(e, r);
	o(() =>
		a((s) => {
			s === void 0 && typeof r == 'string' && r.match(/\./) && (s = ''), y(() => Cn(e, t, s, n));
		})
	);
};
cr.inline = (e, { value: t, modifiers: n, expression: r }) => {
	t && (e._x_inlineBindings || (e._x_inlineBindings = {}), (e._x_inlineBindings[t] = { expression: r, extract: !1 }));
};
g('bind', cr);
function ho(e, t) {
	e._x_keyExpression = t;
}
xn(() => `[${V('data')}]`);
g(
	'data',
	le((e, { expression: t }, { cleanup: n }) => {
		t = t === '' ? '{}' : t;
		let r = {};
		Ue(r, e);
		let i = {};
		wi(i, r);
		let o = B(e, t, { scope: i });
		(o === void 0 || o === !0) && (o = {}), Ue(o, e);
		let a = W(o);
		tn(a);
		let s = ce(e, a);
		a.init && B(e, a.init),
			n(() => {
				a.destroy && B(e, a.destroy), s();
			});
	})
);
g('show', (e, { modifiers: t, expression: n }, { effect: r }) => {
	let i = b(e, n);
	e._x_doHide ||
		(e._x_doHide = () => {
			y(() => {
				e.style.setProperty('display', 'none', t.includes('important') ? 'important' : void 0);
			});
		}),
		e._x_doShow ||
			(e._x_doShow = () => {
				y(() => {
					e.style.length === 1 && e.style.display === 'none'
						? e.removeAttribute('style')
						: e.style.removeProperty('display');
				});
			});
	let o = () => {
			e._x_doHide(), (e._x_isShown = !1);
		},
		a = () => {
			e._x_doShow(), (e._x_isShown = !0);
		},
		s = () => setTimeout(a),
		c = Qe(
			(d) => (d ? a() : o()),
			(d) => {
				typeof e._x_toggleAndCascadeWithTransitions == 'function'
					? e._x_toggleAndCascadeWithTransitions(e, d, a, o)
					: d
					? s()
					: o();
			}
		),
		u,
		l = !0;
	r(() =>
		i((d) => {
			(!l && d === u) || (t.includes('immediate') && (d ? s() : o()), c(d), (u = d), (l = !1));
		})
	);
});
g('for', (e, { expression: t }, { effect: n, cleanup: r }) => {
	let i = vo(t),
		o = b(e, i.items),
		a = b(e, e._x_keyExpression || 'index');
	(e._x_prevKeys = []),
		(e._x_lookup = {}),
		n(() => go(e, i, o, a)),
		r(() => {
			Object.values(e._x_lookup).forEach((s) => s.remove()), delete e._x_prevKeys, delete e._x_lookup;
		});
});
function go(e, t, n, r) {
	let i = (a) => typeof a == 'object' && !Array.isArray(a),
		o = e;
	n((a) => {
		mo(a) && a >= 0 && (a = Array.from(Array(a).keys(), (f) => f + 1)), a === void 0 && (a = []);
		let s = e._x_lookup,
			c = e._x_prevKeys,
			u = [],
			l = [];
		if (i(a))
			a = Object.entries(a).map(([f, _]) => {
				let v = Ft(t, _, f, a);
				r((x) => l.push(x), { scope: { index: f, ...v } }), u.push(v);
			});
		else
			for (let f = 0; f < a.length; f++) {
				let _ = Ft(t, a[f], f, a);
				r((v) => l.push(v), { scope: { index: f, ..._ } }), u.push(_);
			}
		let d = [],
			p = [],
			m = [],
			T = [];
		for (let f = 0; f < c.length; f++) {
			let _ = c[f];
			l.indexOf(_) === -1 && m.push(_);
		}
		c = c.filter((f) => !m.includes(f));
		let de = 'template';
		for (let f = 0; f < l.length; f++) {
			let _ = l[f],
				v = c.indexOf(_);
			if (v === -1) c.splice(f, 0, _), d.push([de, f]);
			else if (v !== f) {
				let x = c.splice(f, 1)[0],
					w = c.splice(v - 1, 1)[0];
				c.splice(f, 0, w), c.splice(v, 0, x), p.push([x, w]);
			} else T.push(_);
			de = _;
		}
		for (let f = 0; f < m.length; f++) {
			let _ = m[f];
			s[_]._x_effects && s[_]._x_effects.forEach(Ut), s[_].remove(), (s[_] = null), delete s[_];
		}
		for (let f = 0; f < p.length; f++) {
			let [_, v] = p[f],
				x = s[_],
				w = s[v],
				k = document.createElement('div');
			y(() => {
				w || L('x-for ":key" is undefined or invalid', o),
					w.after(k),
					x.after(w),
					w._x_currentIfEl && w.after(w._x_currentIfEl),
					k.before(x),
					x._x_currentIfEl && x.after(x._x_currentIfEl),
					k.remove();
			}),
				w._x_refreshXForScope(u[l.indexOf(v)]);
		}
		for (let f = 0; f < d.length; f++) {
			let [_, v] = d[f],
				x = _ === 'template' ? o : s[_];
			x._x_currentIfEl && (x = x._x_currentIfEl);
			let w = u[v],
				k = l[v],
				Y = document.importNode(o.content, !0).firstElementChild,
				Tt = W(w);
			ce(Y, Tt, o),
				(Y._x_refreshXForScope = (gr) => {
					Object.entries(gr).forEach(([vr, mr]) => {
						Tt[vr] = mr;
					});
				}),
				y(() => {
					x.after(Y), $(Y);
				}),
				typeof k == 'object' && L('x-for key cannot be an object, it must be a string or an integer', o),
				(s[k] = Y);
		}
		for (let f = 0; f < T.length; f++) s[T[f]]._x_refreshXForScope(u[l.indexOf(T[f])]);
		o._x_prevKeys = l;
	});
}
function vo(e) {
	let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
		n = /^\s*\(|\)\s*$/g,
		r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
		i = e.match(r);
	if (!i) return;
	let o = {};
	o.items = i[2].trim();
	let a = i[1].replace(n, '').trim(),
		s = a.match(t);
	return (
		s
			? ((o.item = a.replace(t, '').trim()), (o.index = s[1].trim()), s[2] && (o.collection = s[2].trim()))
			: (o.item = a),
		o
	);
}
function Ft(e, t, n, r) {
	let i = {};
	return (
		/^\[.*\]$/.test(e.item) && Array.isArray(t)
			? e.item
					.replace('[', '')
					.replace(']', '')
					.split(',')
					.map((a) => a.trim())
					.forEach((a, s) => {
						i[a] = t[s];
					})
			: /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == 'object'
			? e.item
					.replace('{', '')
					.replace('}', '')
					.split(',')
					.map((a) => a.trim())
					.forEach((a) => {
						i[a] = t[a];
					})
			: (i[e.item] = t),
		e.index && (i[e.index] = n),
		e.collection && (i[e.collection] = r),
		i
	);
}
function mo(e) {
	return !Array.isArray(e) && !isNaN(e);
}
function ur() {}
ur.inline = (e, { expression: t }, { cleanup: n }) => {
	let r = be(e);
	r._x_refs || (r._x_refs = {}), (r._x_refs[t] = e), n(() => delete r._x_refs[t]);
};
g('ref', ur);
g('if', (e, { expression: t }, { effect: n, cleanup: r }) => {
	let i = b(e, t),
		o = () => {
			if (e._x_currentIfEl) return e._x_currentIfEl;
			let s = e.content.cloneNode(!0).firstElementChild;
			return (
				ce(s, {}, e),
				y(() => {
					e.after(s), $(s);
				}),
				(e._x_currentIfEl = s),
				(e._x_undoIf = () => {
					P(s, (c) => {
						c._x_effects && c._x_effects.forEach(Ut);
					}),
						s.remove(),
						delete e._x_currentIfEl;
				}),
				s
			);
		},
		a = () => {
			e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
		};
	n(() =>
		i((s) => {
			s ? o() : a();
		})
	),
		r(() => e._x_undoIf && e._x_undoIf());
});
g('id', (e, { expression: t }, { evaluate: n }) => {
	n(t).forEach((i) => ro(e, i));
});
ft(fn('@', dn(V('on:'))));
g(
	'on',
	le((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
		let o = r ? b(e, r) : () => {};
		e.tagName.toLowerCase() === 'template' &&
			(e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
		let a = rt(e, t, n, (s) => {
			o(() => {}, { scope: { $event: s }, params: [s] });
		});
		i(() => a());
	})
);
Le('Collapse', 'collapse', 'collapse');
Le('Intersect', 'intersect', 'intersect');
Le('Focus', 'trap', 'focus');
Le('Mask', 'mask', 'mask');
function Le(e, t, n) {
	g(t, (r) =>
		L(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r)
	);
}
fe.setEvaluator(sn);
fe.setReactivityEngine({ reactive: wt, effect: Li, release: $i, raw: h });
var yo = fe,
	lr = yo,
	xo = '@vercel/analytics',
	bo = '0.1.11',
	wo = () => {
		window.va ||
			(window.va = function (...t) {
				(window.vaq = window.vaq || []).push(t);
			});
	};
function Eo() {
	return typeof window < 'u';
}
function So() {
	try {
		const e = 'production';
		return e === 'development' || e === 'test';
	} catch {
		return !1;
	}
}
function Ao(e = 'auto') {
	return e === 'auto' ? (So() ? 'development' : 'production') : e;
}
var Co = (e = { debug: !0 }) => {
		var t;
		if (!Eo()) return;
		const n = Ao(e.mode);
		wo(), e.beforeSend && ((t = window.va) == null || t.call(window, 'beforeSend', e.beforeSend));
		const r =
			n === 'development' ? 'https://cdn.vercel-insights.com/v1/script.debug.js' : '/_vercel/insights/script.js';
		if (document.head.querySelector(`script[src*="${r}"]`)) return;
		const i = document.createElement('script');
		(i.src = r),
			(i.defer = !0),
			i.setAttribute('data-sdkn', xo),
			i.setAttribute('data-sdkv', bo),
			n === 'development' && e.debug === !1 && i.setAttribute('data-debug', 'false'),
			document.head.appendChild(i);
	},
	M,
	ie,
	fr,
	ye,
	dr = -1,
	J = function (e) {
		addEventListener(
			'pageshow',
			function (t) {
				t.persisted && ((dr = t.timeStamp), e(t));
			},
			!0
		);
	},
	Et = function () {
		return window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
	},
	$e = function () {
		var e = Et();
		return (e && e.activationStart) || 0;
	},
	C = function (e, t) {
		var n = Et(),
			r = 'navigate';
		return (
			dr >= 0
				? (r = 'back-forward-cache')
				: n &&
				  (document.prerendering || $e() > 0
						? (r = 'prerender')
						: document.wasDiscarded
						? (r = 'restore')
						: n.type && (r = n.type.replace(/_/g, '-'))),
			{
				name: e,
				value: t === void 0 ? -1 : t,
				rating: 'good',
				delta: 0,
				entries: [],
				id: 'v3-'.concat(Date.now(), '-').concat(Math.floor(8999999999999 * Math.random()) + 1e12),
				navigationType: r,
			}
		);
	},
	Re = function (e, t, n) {
		try {
			if (PerformanceObserver.supportedEntryTypes.includes(e)) {
				var r = new PerformanceObserver(function (i) {
					Promise.resolve().then(function () {
						t(i.getEntries());
					});
				});
				return r.observe(Object.assign({ type: e, buffered: !0 }, n || {})), r;
			}
		} catch {}
	},
	O = function (e, t, n, r) {
		var i, o;
		return function (a) {
			t.value >= 0 &&
				(a || r) &&
				((o = t.value - (i || 0)) || i === void 0) &&
				((i = t.value),
				(t.delta = o),
				(t.rating = (function (s, c) {
					return s > c[1] ? 'poor' : s > c[0] ? 'needs-improvement' : 'good';
				})(t.value, n)),
				e(t));
		};
	},
	St = function (e) {
		requestAnimationFrame(function () {
			return requestAnimationFrame(function () {
				return e();
			});
		});
	},
	At = function (e) {
		var t = function (n) {
			(n.type !== 'pagehide' && document.visibilityState !== 'hidden') || e(n);
		};
		addEventListener('visibilitychange', t, !0), addEventListener('pagehide', t, !0);
	},
	Ct = function (e) {
		var t = !1;
		return function (n) {
			t || (e(n), (t = !0));
		};
	},
	H = -1,
	Nt = function () {
		return document.visibilityState !== 'hidden' || document.prerendering ? 1 / 0 : 0;
	},
	xe = function (e) {
		document.visibilityState === 'hidden' && H > -1 && ((H = e.type === 'visibilitychange' ? e.timeStamp : 0), Oo());
	},
	Bt = function () {
		addEventListener('visibilitychange', xe, !0), addEventListener('prerenderingchange', xe, !0);
	},
	Oo = function () {
		removeEventListener('visibilitychange', xe, !0), removeEventListener('prerenderingchange', xe, !0);
	},
	Ot = function () {
		return (
			H < 0 &&
				((H = Nt()),
				Bt(),
				J(function () {
					setTimeout(function () {
						(H = Nt()), Bt();
					}, 0);
				})),
			{
				get firstHiddenTime() {
					return H;
				},
			}
		);
	},
	je = function (e) {
		document.prerendering
			? addEventListener(
					'prerenderingchange',
					function () {
						return e();
					},
					!0
			  )
			: e();
	},
	Dt = [1800, 3e3],
	pr = function (e, t) {
		(t = t || {}),
			je(function () {
				var n,
					r = Ot(),
					i = C('FCP'),
					o = Re('paint', function (a) {
						a.forEach(function (s) {
							s.name === 'first-contentful-paint' &&
								(o.disconnect(),
								s.startTime < r.firstHiddenTime &&
									((i.value = Math.max(s.startTime - $e(), 0)), i.entries.push(s), n(!0)));
						});
					});
				o &&
					((n = O(e, i, Dt, t.reportAllChanges)),
					J(function (a) {
						(i = C('FCP')),
							(n = O(e, i, Dt, t.reportAllChanges)),
							St(function () {
								(i.value = performance.now() - a.timeStamp), n(!0);
							});
					}));
			});
	},
	Kt = [0.1, 0.25],
	To = function (e, t) {
		(t = t || {}),
			pr(
				Ct(function () {
					var n,
						r = C('CLS', 0),
						i = 0,
						o = [],
						a = function (c) {
							c.forEach(function (u) {
								if (!u.hadRecentInput) {
									var l = o[0],
										d = o[o.length - 1];
									i && u.startTime - d.startTime < 1e3 && u.startTime - l.startTime < 5e3
										? ((i += u.value), o.push(u))
										: ((i = u.value), (o = [u]));
								}
							}),
								i > r.value && ((r.value = i), (r.entries = o), n());
						},
						s = Re('layout-shift', a);
					s &&
						((n = O(e, r, Kt, t.reportAllChanges)),
						At(function () {
							a(s.takeRecords()), n(!0);
						}),
						J(function () {
							(i = 0),
								(r = C('CLS', 0)),
								(n = O(e, r, Kt, t.reportAllChanges)),
								St(function () {
									return n();
								});
						}),
						setTimeout(n, 0));
				})
			);
	},
	ee = { passive: !0, capture: !0 },
	Mo = new Date(),
	kt = function (e, t) {
		M || ((M = t), (ie = e), (fr = new Date()), hr(removeEventListener), _r());
	},
	_r = function () {
		if (ie >= 0 && ie < fr - Mo) {
			var e = {
				entryType: 'first-input',
				name: M.type,
				target: M.target,
				cancelable: M.cancelable,
				startTime: M.timeStamp,
				processingStart: M.timeStamp + ie,
			};
			ye.forEach(function (t) {
				t(e);
			}),
				(ye = []);
		}
	},
	Io = function (e) {
		if (e.cancelable) {
			var t = (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp;
			e.type == 'pointerdown'
				? (function (n, r) {
						var i = function () {
								kt(n, r), a();
							},
							o = function () {
								a();
							},
							a = function () {
								removeEventListener('pointerup', i, ee), removeEventListener('pointercancel', o, ee);
							};
						addEventListener('pointerup', i, ee), addEventListener('pointercancel', o, ee);
				  })(t, e)
				: kt(t, e);
		}
	},
	hr = function (e) {
		['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(function (t) {
			return e(t, Io, ee);
		});
	},
	Ht = [100, 300],
	Po = function (e, t) {
		(t = t || {}),
			je(function () {
				var n,
					r = Ot(),
					i = C('FID'),
					o = function (c) {
						c.startTime < r.firstHiddenTime && ((i.value = c.processingStart - c.startTime), i.entries.push(c), n(!0));
					},
					a = function (c) {
						c.forEach(o);
					},
					s = Re('first-input', a);
				(n = O(e, i, Ht, t.reportAllChanges)),
					s &&
						At(
							Ct(function () {
								a(s.takeRecords()), s.disconnect();
							})
						),
					s &&
						J(function () {
							var c;
							(i = C('FID')),
								(n = O(e, i, Ht, t.reportAllChanges)),
								(ye = []),
								(ie = -1),
								(M = null),
								hr(addEventListener),
								(c = o),
								ye.push(c),
								_r();
						});
			});
	},
	zt = [2500, 4e3],
	Ke = {},
	Lo = function (e, t) {
		(t = t || {}),
			je(function () {
				var n,
					r = Ot(),
					i = C('LCP'),
					o = function (c) {
						var u = c[c.length - 1];
						u &&
							u.startTime < r.firstHiddenTime &&
							((i.value = Math.max(u.startTime - $e(), 0)), (i.entries = [u]), n());
					},
					a = Re('largest-contentful-paint', o);
				if (a) {
					n = O(e, i, zt, t.reportAllChanges);
					var s = Ct(function () {
						Ke[i.id] || (o(a.takeRecords()), a.disconnect(), (Ke[i.id] = !0), n(!0));
					});
					['keydown', 'click'].forEach(function (c) {
						addEventListener(c, s, !0);
					}),
						At(s),
						J(function (c) {
							(i = C('LCP')),
								(n = O(e, i, zt, t.reportAllChanges)),
								St(function () {
									(i.value = performance.now() - c.timeStamp), (Ke[i.id] = !0), n(!0);
								});
						});
				}
			});
	},
	qt = [800, 1800],
	$o = function e(t) {
		document.prerendering
			? je(function () {
					return e(t);
			  })
			: document.readyState !== 'complete'
			? addEventListener(
					'load',
					function () {
						return e(t);
					},
					!0
			  )
			: setTimeout(t, 0);
	},
	Ro = function (e, t) {
		t = t || {};
		var n = C('TTFB'),
			r = O(e, n, qt, t.reportAllChanges);
		$o(function () {
			var i = Et();
			if (i) {
				var o = i.responseStart;
				if (o <= 0 || o > performance.now()) return;
				(n.value = Math.max(o - $e(), 0)),
					(n.entries = [i]),
					r(!0),
					J(function () {
						(n = C('TTFB', 0)), (r = O(e, n, qt, t.reportAllChanges))(!0);
					});
			}
		});
	};
const Wt = 'https://vitals.vercel-analytics.com/v1/vitals',
	jo = () =>
		'connection' in navigator && navigator.connection && 'effectiveType' in navigator.connection
			? navigator.connection.effectiveType
			: '',
	Q = (e, t) => {
		const n = {
				dsn: t.analyticsId,
				id: e.id,
				page: t.path,
				href: location.href,
				event_name: e.name,
				value: e.value.toString(),
				speed: jo(),
			},
			r = new Blob([new URLSearchParams(n).toString()], { type: 'application/x-www-form-urlencoded' });
		navigator.sendBeacon
			? navigator.sendBeacon(Wt, r)
			: fetch(Wt, { body: r, method: 'POST', credentials: 'omit', keepalive: !0 });
	};
function Fo() {
	const e = {}.PUBLIC_VERCEL_ANALYTICS_ID;
	if (!e) {
		console.error('[Analytics] VERCEL_ANALYTICS_ID not found');
		return;
	}
	const t = { path: window.location.pathname, analyticsId: e };
	try {
		Po((n) => Q(n, t)), Ro((n) => Q(n, t)), Lo((n) => Q(n, t)), To((n) => Q(n, t)), pr((n) => Q(n, t));
	} catch (n) {
		console.error('[Analytics]', n);
	}
}
const No = 'production';
Co({ mode: No });
Fo();
window.Alpine = lr;
lr.start();
