(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) o(s);
    new MutationObserver(s => {
        for (const r of s)
            if (r.type === "childList")
                for (const i of r.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && o(i)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(s) {
        const r = {};
        return s.integrity && (r.integrity = s.integrity), s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? r.credentials = "include" : s.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r
    }

    function o(s) {
        if (s.ep) return;
        s.ep = !0;
        const r = n(s);
        fetch(s.href, r)
    }
})();

function Jn(e, t) {
    const n = Object.create(null),
        o = e.split(",");
    for (let s = 0; s < o.length; s++) n[o[s]] = !0;
    return t ? s => !!n[s.toLowerCase()] : s => !!n[s]
}
const U = {},
    ot = [],
    Ae = () => {},
    rs = () => !1,
    rn = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    Qn = e => e.startsWith("onUpdate:"),
    Z = Object.assign,
    Xn = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    },
    os = Object.prototype.hasOwnProperty,
    $ = (e, t) => os.call(e, t),
    P = Array.isArray,
    st = e => Ot(e) === "[object Map]",
    on = e => Ot(e) === "[object Set]",
    yr = e => Ot(e) === "[object Date]",
    O = e => typeof e == "function",
    J = e => typeof e == "string",
    Ne = e => typeof e == "symbol",
    j = e => e !== null && typeof e == "object",
    Zr = e => (j(e) || O(e)) && O(e.then) && O(e.catch),
    Yr = Object.prototype.toString,
    Ot = e => Yr.call(e),
    ss = e => Ot(e).slice(8, -1),
    eo = e => Ot(e) === "[object Object]",
    Zn = e => J(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Ut = Jn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    sn = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    },
    is = /-(\w)/g,
    ct = sn(e => e.replace(is, (t, n) => n ? n.toUpperCase() : "")),
    ls = /\B([A-Z])/g,
    ht = sn(e => e.replace(ls, "-$1").toLowerCase()),
    to = sn(e => e.charAt(0).toUpperCase() + e.slice(1)),
    kn = sn(e => e ? `on${to(e)}` : ""),
    Qe = (e, t) => !Object.is(e, t),
    jt = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    },
    Jt = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    },
    Qt = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let vr;
const $n = () => vr || (vr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function ln(e) {
    if (P(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const o = e[n],
                s = J(o) ? fs(o) : ln(o);
            if (s)
                for (const r in s) t[r] = s[r]
        }
        return t
    } else if (J(e) || j(e)) return e
}
const us = /;(?![^(]*\))/g,
    as = /:([^]+)/,
    cs = /\/\*[^]*?\*\//g;

function fs(e) {
    const t = {};
    return e.replace(cs, "").split(us).forEach(n => {
        if (n) {
            const o = n.split(as);
            o.length > 1 && (t[o[0].trim()] = o[1].trim())
        }
    }), t
}

function un(e) {
    let t = "";
    if (J(e)) t = e;
    else if (P(e))
        for (let n = 0; n < e.length; n++) {
            const o = un(e[n]);
            o && (t += o + " ")
        } else if (j(e))
            for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}
const ds = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    ps = Jn(ds);

function no(e) {
    return !!e || e === ""
}

function hs(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let o = 0; n && o < e.length; o++) n = an(e[o], t[o]);
    return n
}

function an(e, t) {
    if (e === t) return !0;
    let n = yr(e),
        o = yr(t);
    if (n || o) return n && o ? e.getTime() === t.getTime() : !1;
    if (n = Ne(e), o = Ne(t), n || o) return e === t;
    if (n = P(e), o = P(t), n || o) return n && o ? hs(e, t) : !1;
    if (n = j(e), o = j(t), n || o) {
        if (!n || !o) return !1;
        const s = Object.keys(e).length,
            r = Object.keys(t).length;
        if (s !== r) return !1;
        for (const i in e) {
            const l = e.hasOwnProperty(i),
                c = t.hasOwnProperty(i);
            if (l && !c || !l && c || !an(e[i], t[i])) return !1
        }
    }
    return String(e) === String(t)
}

function gs(e, t) {
    return e.findIndex(n => an(n, t))
}
const ze = e => J(e) ? e : e == null ? "" : P(e) || j(e) && (e.toString === Yr || !O(e.toString)) ? JSON.stringify(e, ro, 2) : String(e),
    ro = (e, t) => t && t.__v_isRef ? ro(e, t.value) : st(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((n, [o, s], r) => (n[In(o, r) + " =>"] = s, n), {})
    } : on(t) ? {
        [`Set(${t.size})`]: [...t.values()].map(n => In(n))
    } : Ne(t) ? In(t) : j(t) && !P(t) && !eo(t) ? String(t) : t,
    In = (e, t = "") => {
        var n;
        return Ne(e) ? `Symbol(${(n=e.description)!=null?n:t})` : e
    };
let de;
class ms {
    constructor(t = !1) {
        this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = de, !t && de && (this.index = (de.scopes || (de.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const n = de;
            try {
                return de = this, t()
            } finally {
                de = n
            }
        }
    }
    on() {
        de = this
    }
    off() {
        de = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, o;
            for (n = 0, o = this.effects.length; n < o; n++) this.effects[n].stop();
            for (n = 0, o = this.cleanups.length; n < o; n++) this.cleanups[n]();
            if (this.scopes)
                for (n = 0, o = this.scopes.length; n < o; n++) this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function ys(e, t = de) {
    t && t.active && t.effects.push(e)
}

function vs() {
    return de
}
const Yn = e => {
        const t = new Set(e);
        return t.w = 0, t.n = 0, t
    },
    oo = e => (e.w & $e) > 0,
    so = e => (e.n & $e) > 0,
    ws = ({
        deps: e
    }) => {
        if (e.length)
            for (let t = 0; t < e.length; t++) e[t].w |= $e
    },
    bs = e => {
        const {
            deps: t
        } = e;
        if (t.length) {
            let n = 0;
            for (let o = 0; o < t.length; o++) {
                const s = t[o];
                oo(s) && !so(s) ? s.delete(e) : t[n++] = s, s.w &= ~$e, s.n &= ~$e
            }
            t.length = n
        }
    },
    Ln = new WeakMap;
let _t = 0,
    $e = 1;
const Bn = 30;
let pe;
const We = Symbol(""),
    qn = Symbol("");
class er {
    constructor(t, n = null, o) {
        this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, ys(this, o)
    }
    run() {
        if (!this.active) return this.fn();
        let t = pe,
            n = De;
        for (; t;) {
            if (t === this) return;
            t = t.parent
        }
        try {
            return this.parent = pe, pe = this, De = !0, $e = 1 << ++_t, _t <= Bn ? ws(this) : wr(this), this.fn()
        } finally {
            _t <= Bn && bs(this), $e = 1 << --_t, pe = this.parent, De = n, this.parent = void 0, this.deferStop && this.stop()
        }
    }
    stop() {
        pe === this ? this.deferStop = !0 : this.active && (wr(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function wr(e) {
    const {
        deps: t
    } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}
let De = !0;
const io = [];

function gt() {
    io.push(De), De = !1
}

function mt() {
    const e = io.pop();
    De = e === void 0 ? !0 : e
}

function ue(e, t, n) {
    if (De && pe) {
        let o = Ln.get(e);
        o || Ln.set(e, o = new Map);
        let s = o.get(n);
        s || o.set(n, s = Yn()), lo(s)
    }
}

function lo(e, t) {
    let n = !1;
    _t <= Bn ? so(e) || (e.n |= $e, n = !oo(e)) : n = !e.has(pe), n && (e.add(pe), pe.deps.push(e))
}

function Re(e, t, n, o, s, r) {
    const i = Ln.get(e);
    if (!i) return;
    let l = [];
    if (t === "clear") l = [...i.values()];
    else if (n === "length" && P(e)) {
        const c = Number(o);
        i.forEach((p, m) => {
            (m === "length" || !Ne(m) && m >= c) && l.push(p)
        })
    } else switch (n !== void 0 && l.push(i.get(n)), t) {
        case "add":
            P(e) ? Zn(n) && l.push(i.get("length")) : (l.push(i.get(We)), st(e) && l.push(i.get(qn)));
            break;
        case "delete":
            P(e) || (l.push(i.get(We)), st(e) && l.push(i.get(qn)));
            break;
        case "set":
            st(e) && l.push(i.get(We));
            break
    }
    if (l.length === 1) l[0] && Hn(l[0]);
    else {
        const c = [];
        for (const p of l) p && c.push(...p);
        Hn(Yn(c))
    }
}

function Hn(e, t) {
    const n = P(e) ? e : [...e];
    for (const o of n) o.computed && br(o);
    for (const o of n) o.computed || br(o)
}

function br(e, t) {
    (e !== pe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const _s = Jn("__proto__,__v_isRef,__isVue"),
    uo = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Ne)),
    _r = Cs();

function Cs() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function(...n) {
            const o = L(this);
            for (let r = 0, i = this.length; r < i; r++) ue(o, "get", r + "");
            const s = o[t](...n);
            return s === -1 || s === !1 ? o[t](...n.map(L)) : s
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function(...n) {
            gt();
            const o = L(this)[t].apply(this, n);
            return mt(), o
        }
    }), e
}

function Ts(e) {
    const t = L(this);
    return ue(t, "has", e), t.hasOwnProperty(e)
}
class ao {
    constructor(t = !1, n = !1) {
        this._isReadonly = t, this._shallow = n
    }
    get(t, n, o) {
        const s = this._isReadonly,
            r = this._shallow;
        if (n === "__v_isReactive") return !s;
        if (n === "__v_isReadonly") return s;
        if (n === "__v_isShallow") return r;
        if (n === "__v_raw") return o === (s ? r ? Ns : ho : r ? po : fo).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
        const i = P(t);
        if (!s) {
            if (i && $(_r, n)) return Reflect.get(_r, n, o);
            if (n === "hasOwnProperty") return Ts
        }
        const l = Reflect.get(t, n, o);
        return (Ne(n) ? uo.has(n) : _s(n)) || (s || ue(t, "get", n), r) ? l : W(l) ? i && Zn(n) ? l : l.value : j(l) ? s ? go(l) : fn(l) : l
    }
}
class co extends ao {
    constructor(t = !1) {
        super(!1, t)
    }
    set(t, n, o, s) {
        let r = t[n];
        if (!this._shallow) {
            const c = ft(r);
            if (!Xt(o) && !ft(o) && (r = L(r), o = L(o)), !P(t) && W(r) && !W(o)) return c ? !1 : (r.value = o, !0)
        }
        const i = P(t) && Zn(n) ? Number(n) < t.length : $(t, n),
            l = Reflect.set(t, n, o, s);
        return t === L(s) && (i ? Qe(o, r) && Re(t, "set", n, o) : Re(t, "add", n, o)), l
    }
    deleteProperty(t, n) {
        const o = $(t, n);
        t[n];
        const s = Reflect.deleteProperty(t, n);
        return s && o && Re(t, "delete", n, void 0), s
    }
    has(t, n) {
        const o = Reflect.has(t, n);
        return (!Ne(n) || !uo.has(n)) && ue(t, "has", n), o
    }
    ownKeys(t) {
        return ue(t, "iterate", P(t) ? "length" : We), Reflect.ownKeys(t)
    }
}
class As extends ao {
    constructor(t = !1) {
        super(!0, t)
    }
    set(t, n) {
        return !0
    }
    deleteProperty(t, n) {
        return !0
    }
}
const xs = new co,
    ks = new As,
    Is = new co(!0),
    tr = e => e,
    cn = e => Reflect.getPrototypeOf(e);

function Nt(e, t, n = !1, o = !1) {
    e = e.__v_raw;
    const s = L(e),
        r = L(t);
    n || (Qe(t, r) && ue(s, "get", t), ue(s, "get", r));
    const {
        has: i
    } = cn(s), l = o ? tr : n ? or : kt;
    if (i.call(s, t)) return l(e.get(t));
    if (i.call(s, r)) return l(e.get(r));
    e !== s && e.get(t)
}

function $t(e, t = !1) {
    const n = this.__v_raw,
        o = L(n),
        s = L(e);
    return t || (Qe(e, s) && ue(o, "has", e), ue(o, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s)
}

function Lt(e, t = !1) {
    return e = e.__v_raw, !t && ue(L(e), "iterate", We), Reflect.get(e, "size", e)
}

function Cr(e) {
    e = L(e);
    const t = L(this);
    return cn(t).has.call(t, e) || (t.add(e), Re(t, "add", e, e)), this
}

function Tr(e, t) {
    t = L(t);
    const n = L(this),
        {
            has: o,
            get: s
        } = cn(n);
    let r = o.call(n, e);
    r || (e = L(e), r = o.call(n, e));
    const i = s.call(n, e);
    return n.set(e, t), r ? Qe(t, i) && Re(n, "set", e, t) : Re(n, "add", e, t), this
}

function Ar(e) {
    const t = L(this),
        {
            has: n,
            get: o
        } = cn(t);
    let s = n.call(t, e);
    s || (e = L(e), s = n.call(t, e)), o && o.call(t, e);
    const r = t.delete(e);
    return s && Re(t, "delete", e, void 0), r
}

function xr() {
    const e = L(this),
        t = e.size !== 0,
        n = e.clear();
    return t && Re(e, "clear", void 0, void 0), n
}

function Bt(e, t) {
    return function(o, s) {
        const r = this,
            i = r.__v_raw,
            l = L(i),
            c = t ? tr : e ? or : kt;
        return !e && ue(l, "iterate", We), i.forEach((p, m) => o.call(s, c(p), c(m), r))
    }
}

function qt(e, t, n) {
    return function(...o) {
        const s = this.__v_raw,
            r = L(s),
            i = st(r),
            l = e === "entries" || e === Symbol.iterator && i,
            c = e === "keys" && i,
            p = s[e](...o),
            m = n ? tr : t ? or : kt;
        return !t && ue(r, "iterate", c ? qn : We), {
            next() {
                const {
                    value: a,
                    done: d
                } = p.next();
                return d ? {
                    value: a,
                    done: d
                } : {
                    value: l ? [m(a[0]), m(a[1])] : m(a),
                    done: d
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function Oe(e) {
    return function(...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}

function Rs() {
    const e = {
            get(r) {
                return Nt(this, r)
            },
            get size() {
                return Lt(this)
            },
            has: $t,
            add: Cr,
            set: Tr,
            delete: Ar,
            clear: xr,
            forEach: Bt(!1, !1)
        },
        t = {
            get(r) {
                return Nt(this, r, !1, !0)
            },
            get size() {
                return Lt(this)
            },
            has: $t,
            add: Cr,
            set: Tr,
            delete: Ar,
            clear: xr,
            forEach: Bt(!1, !0)
        },
        n = {
            get(r) {
                return Nt(this, r, !0)
            },
            get size() {
                return Lt(this, !0)
            },
            has(r) {
                return $t.call(this, r, !0)
            },
            add: Oe("add"),
            set: Oe("set"),
            delete: Oe("delete"),
            clear: Oe("clear"),
            forEach: Bt(!0, !1)
        },
        o = {
            get(r) {
                return Nt(this, r, !0, !0)
            },
            get size() {
                return Lt(this, !0)
            },
            has(r) {
                return $t.call(this, r, !0)
            },
            add: Oe("add"),
            set: Oe("set"),
            delete: Oe("delete"),
            clear: Oe("clear"),
            forEach: Bt(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(r => {
        e[r] = qt(r, !1, !1), n[r] = qt(r, !0, !1), t[r] = qt(r, !1, !0), o[r] = qt(r, !0, !0)
    }), [e, n, t, o]
}
const [Ps, Fs, Os, Es] = Rs();

function nr(e, t) {
    const n = t ? e ? Es : Os : e ? Fs : Ps;
    return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get($(n, s) && s in o ? n : o, s, r)
}
const Ss = {
        get: nr(!1, !1)
    },
    Ds = {
        get: nr(!1, !0)
    },
    Ms = {
        get: nr(!0, !1)
    },
    fo = new WeakMap,
    po = new WeakMap,
    ho = new WeakMap,
    Ns = new WeakMap;

function $s(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0
    }
}

function Ls(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : $s(ss(e))
}

function fn(e) {
    return ft(e) ? e : rr(e, !1, xs, Ss, fo)
}

function Bs(e) {
    return rr(e, !1, Is, Ds, po)
}

function go(e) {
    return rr(e, !0, ks, Ms, ho)
}

function rr(e, t, n, o, s) {
    if (!j(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const r = s.get(e);
    if (r) return r;
    const i = Ls(e);
    if (i === 0) return e;
    const l = new Proxy(e, i === 2 ? o : n);
    return s.set(e, l), l
}

function it(e) {
    return ft(e) ? it(e.__v_raw) : !!(e && e.__v_isReactive)
}

function ft(e) {
    return !!(e && e.__v_isReadonly)
}

function Xt(e) {
    return !!(e && e.__v_isShallow)
}

function mo(e) {
    return it(e) || ft(e)
}

function L(e) {
    const t = e && e.__v_raw;
    return t ? L(t) : e
}

function yo(e) {
    return Jt(e, "__v_skip", !0), e
}
const kt = e => j(e) ? fn(e) : e,
    or = e => j(e) ? go(e) : e;

function vo(e) {
    De && pe && (e = L(e), lo(e.dep || (e.dep = Yn())))
}

function wo(e, t) {
    e = L(e);
    const n = e.dep;
    n && Hn(n)
}

function W(e) {
    return !!(e && e.__v_isRef === !0)
}

function he(e) {
    return qs(e, !1)
}

function qs(e, t) {
    return W(e) ? e : new Hs(e, t)
}
class Hs {
    constructor(t, n) {
        this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : L(t), this._value = n ? t : kt(t)
    }
    get value() {
        return vo(this), this._value
    }
    set value(t) {
        const n = this.__v_isShallow || Xt(t) || ft(t);
        t = n ? t : L(t), Qe(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : kt(t), wo(this))
    }
}

function g(e) {
    return W(e) ? e.value : e
}
const Ks = {
    get: (e, t, n) => g(Reflect.get(e, t, n)),
    set: (e, t, n, o) => {
        const s = e[t];
        return W(s) && !W(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o)
    }
};

function bo(e) {
    return it(e) ? e : new Proxy(e, Ks)
}
class Us {
    constructor(t, n, o, s) {
        this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new er(t, () => {
            this._dirty || (this._dirty = !0, wo(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = o
    }
    get value() {
        const t = L(this);
        return vo(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
    }
    set value(t) {
        this._setter(t)
    }
}

function js(e, t, n = !1) {
    let o, s;
    const r = O(e);
    return r ? (o = e, s = Ae) : (o = e.get, s = e.set), new Us(o, s, r || !s, n)
}

function Me(e, t, n, o) {
    let s;
    try {
        s = o ? e(...o) : e()
    } catch (r) {
        dn(r, t, n)
    }
    return s
}

function ye(e, t, n, o) {
    if (O(e)) {
        const r = Me(e, t, n, o);
        return r && Zr(r) && r.catch(i => {
            dn(i, t, n)
        }), r
    }
    const s = [];
    for (let r = 0; r < e.length; r++) s.push(ye(e[r], t, n, o));
    return s
}

function dn(e, t, n, o = !0) {
    const s = t ? t.vnode : null;
    if (t) {
        let r = t.parent;
        const i = t.proxy,
            l = n;
        for (; r;) {
            const p = r.ec;
            if (p) {
                for (let m = 0; m < p.length; m++)
                    if (p[m](e, i, l) === !1) return
            }
            r = r.parent
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            Me(c, null, 10, [e, i, l]);
            return
        }
    }
    Gs(e, n, s, o)
}

function Gs(e, t, n, o = !0) {
    console.error(e)
}
let It = !1,
    Kn = !1;
const ne = [];
let Te = 0;
const lt = [];
let Ie = null,
    Ue = 0;
const _o = Promise.resolve();
let sr = null;

function zs(e) {
    const t = sr || _o;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Vs(e) {
    let t = Te + 1,
        n = ne.length;
    for (; t < n;) {
        const o = t + n >>> 1,
            s = ne[o],
            r = Rt(s);
        r < e || r === e && s.pre ? t = o + 1 : n = o
    }
    return t
}

function ir(e) {
    (!ne.length || !ne.includes(e, It && e.allowRecurse ? Te + 1 : Te)) && (e.id == null ? ne.push(e) : ne.splice(Vs(e.id), 0, e), Co())
}

function Co() {
    !It && !Kn && (Kn = !0, sr = _o.then(Ao))
}

function Ws(e) {
    const t = ne.indexOf(e);
    t > Te && ne.splice(t, 1)
}

function Js(e) {
    P(e) ? lt.push(...e) : (!Ie || !Ie.includes(e, e.allowRecurse ? Ue + 1 : Ue)) && lt.push(e), Co()
}

function kr(e, t, n = It ? Te + 1 : 0) {
    for (; n < ne.length; n++) {
        const o = ne[n];
        if (o && o.pre) {
            if (e && o.id !== e.uid) continue;
            ne.splice(n, 1), n--, o()
        }
    }
}

function To(e) {
    if (lt.length) {
        const t = [...new Set(lt)];
        if (lt.length = 0, Ie) {
            Ie.push(...t);
            return
        }
        for (Ie = t, Ie.sort((n, o) => Rt(n) - Rt(o)), Ue = 0; Ue < Ie.length; Ue++) Ie[Ue]();
        Ie = null, Ue = 0
    }
}
const Rt = e => e.id == null ? 1 / 0 : e.id,
    Qs = (e, t) => {
        const n = Rt(e) - Rt(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1
        }
        return n
    };

function Ao(e) {
    Kn = !1, It = !0, ne.sort(Qs);
    try {
        for (Te = 0; Te < ne.length; Te++) {
            const t = ne[Te];
            t && t.active !== !1 && Me(t, null, 14)
        }
    } finally {
        Te = 0, ne.length = 0, To(), It = !1, sr = null, (ne.length || lt.length) && Ao()
    }
}

function Xs(e, t, ...n) {
    if (e.isUnmounted) return;
    const o = e.vnode.props || U;
    let s = n;
    const r = t.startsWith("update:"),
        i = r && t.slice(7);
    if (i && i in o) {
        const m = `${i==="modelValue"?"model":i}Modifiers`,
            {
                number: a,
                trim: d
            } = o[m] || U;
        d && (s = n.map(R => J(R) ? R.trim() : R)), a && (s = n.map(Qt))
    }
    let l, c = o[l = kn(t)] || o[l = kn(ct(t))];
    !c && r && (c = o[l = kn(ht(t))]), c && ye(c, e, 6, s);
    const p = o[l + "Once"];
    if (p) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        e.emitted[l] = !0, ye(p, e, 6, s)
    }
}

function xo(e, t, n = !1) {
    const o = t.emitsCache,
        s = o.get(e);
    if (s !== void 0) return s;
    const r = e.emits;
    let i = {},
        l = !1;
    if (!O(e)) {
        const c = p => {
            const m = xo(p, t, !0);
            m && (l = !0, Z(i, m))
        };
        !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c)
    }
    return !r && !l ? (j(e) && o.set(e, null), null) : (P(r) ? r.forEach(c => i[c] = null) : Z(i, r), j(e) && o.set(e, i), i)
}

function pn(e, t) {
    return !e || !rn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), $(e, t[0].toLowerCase() + t.slice(1)) || $(e, ht(t)) || $(e, t))
}
let ge = null,
    hn = null;

function Zt(e) {
    const t = ge;
    return ge = e, hn = e && e.type.__scopeId || null, t
}

function ko(e) {
    hn = e
}

function Io() {
    hn = null
}

function Zs(e, t = ge, n) {
    if (!t || e._n) return e;
    const o = (...s) => {
        o._d && Nr(-1);
        const r = Zt(t);
        let i;
        try {
            i = e(...s)
        } finally {
            Zt(r), o._d && Nr(1)
        }
        return i
    };
    return o._n = !0, o._c = !0, o._d = !0, o
}

function Rn(e) {
    const {
        type: t,
        vnode: n,
        proxy: o,
        withProxy: s,
        props: r,
        propsOptions: [i],
        slots: l,
        attrs: c,
        emit: p,
        render: m,
        renderCache: a,
        data: d,
        setupState: R,
        ctx: N,
        inheritAttrs: S
    } = e;
    let z, Y;
    const Q = Zt(e);
    try {
        if (n.shapeFlag & 4) {
            const E = s || o,
                ve = E;
            z = Ce(m.call(ve, E, a, r, R, d, N)), Y = c
        } else {
            const E = t;
            z = Ce(E.length > 1 ? E(r, {
                attrs: c,
                slots: l,
                emit: p
            }) : E(r, null)), Y = t.props ? c : Ys(c)
        }
    } catch (E) {
        xt.length = 0, dn(E, e, 1), z = xe(Xe)
    }
    let ee = z;
    if (Y && S !== !1) {
        const E = Object.keys(Y),
            {
                shapeFlag: ve
            } = ee;
        E.length && ve & 7 && (i && E.some(Qn) && (Y = ei(Y, i)), ee = dt(ee, Y))
    }
    return n.dirs && (ee = dt(ee), ee.dirs = ee.dirs ? ee.dirs.concat(n.dirs) : n.dirs), n.transition && (ee.transition = n.transition), z = ee, Zt(Q), z
}
const Ys = e => {
        let t;
        for (const n in e)(n === "class" || n === "style" || rn(n)) && ((t || (t = {}))[n] = e[n]);
        return t
    },
    ei = (e, t) => {
        const n = {};
        for (const o in e)(!Qn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
        return n
    };

function ti(e, t, n) {
    const {
        props: o,
        children: s,
        component: r
    } = e, {
        props: i,
        children: l,
        patchFlag: c
    } = t, p = r.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && c >= 0) {
        if (c & 1024) return !0;
        if (c & 16) return o ? Ir(o, i, p) : !!i;
        if (c & 8) {
            const m = t.dynamicProps;
            for (let a = 0; a < m.length; a++) {
                const d = m[a];
                if (i[d] !== o[d] && !pn(p, d)) return !0
            }
        }
    } else return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? Ir(o, i, p) : !0 : !!i;
    return !1
}

function Ir(e, t, n) {
    const o = Object.keys(t);
    if (o.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < o.length; s++) {
        const r = o[s];
        if (t[r] !== e[r] && !pn(n, r)) return !0
    }
    return !1
}

function ni({
    vnode: e,
    parent: t
}, n) {
    for (; t && t.subTree === e;)(e = t.vnode).el = n, t = t.parent
}
const ri = Symbol.for("v-ndc"),
    oi = e => e.__isSuspense;

function si(e, t) {
    t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : Js(e)
}
const Ht = {};

function Gt(e, t, n) {
    return Ro(e, t, n)
}

function Ro(e, t, {
    immediate: n,
    deep: o,
    flush: s,
    onTrack: r,
    onTrigger: i
} = U) {
    var l;
    const c = vs() === ((l = re) == null ? void 0 : l.scope) ? re : null;
    let p, m = !1,
        a = !1;
    if (W(e) ? (p = () => e.value, m = Xt(e)) : it(e) ? (p = () => e, o = !0) : P(e) ? (a = !0, m = e.some(E => it(E) || Xt(E)), p = () => e.map(E => {
            if (W(E)) return E.value;
            if (it(E)) return Ve(E);
            if (O(E)) return Me(E, c, 2)
        })) : O(e) ? t ? p = () => Me(e, c, 2) : p = () => {
            if (!(c && c.isUnmounted)) return d && d(), ye(e, c, 3, [R])
        } : p = Ae, t && o) {
        const E = p;
        p = () => Ve(E())
    }
    let d, R = E => {
            d = Q.onStop = () => {
                Me(E, c, 4), d = Q.onStop = void 0
            }
        },
        N;
    if (Ft)
        if (R = Ae, t ? n && ye(t, c, 3, [p(), a ? [] : void 0, R]) : p(), s === "sync") {
            const E = Zi();
            N = E.__watcherHandles || (E.__watcherHandles = [])
        } else return Ae;
    let S = a ? new Array(e.length).fill(Ht) : Ht;
    const z = () => {
        if (Q.active)
            if (t) {
                const E = Q.run();
                (o || m || (a ? E.some((ve, Ze) => Qe(ve, S[Ze])) : Qe(E, S))) && (d && d(), ye(t, c, 3, [E, S === Ht ? void 0 : a && S[0] === Ht ? [] : S, R]), S = E)
            } else Q.run()
    };
    z.allowRecurse = !!t;
    let Y;
    s === "sync" ? Y = z : s === "post" ? Y = () => ie(z, c && c.suspense) : (z.pre = !0, c && (z.id = c.uid), Y = () => ir(z));
    const Q = new er(p, Y);
    t ? n ? z() : S = Q.run() : s === "post" ? ie(Q.run.bind(Q), c && c.suspense) : Q.run();
    const ee = () => {
        Q.stop(), c && c.scope && Xn(c.scope.effects, Q)
    };
    return N && N.push(ee), ee
}

function ii(e, t, n) {
    const o = this.proxy,
        s = J(e) ? e.includes(".") ? Po(o, e) : () => o[e] : e.bind(o, o);
    let r;
    O(t) ? r = t : (r = t.handler, n = t);
    const i = re;
    pt(this);
    const l = Ro(s, r.bind(o), n);
    return i ? pt(i) : Je(), l
}

function Po(e, t) {
    const n = t.split(".");
    return () => {
        let o = e;
        for (let s = 0; s < n.length && o; s++) o = o[n[s]];
        return o
    }
}

function Ve(e, t) {
    if (!j(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
    if (t.add(e), W(e)) Ve(e.value, t);
    else if (P(e))
        for (let n = 0; n < e.length; n++) Ve(e[n], t);
    else if (on(e) || st(e)) e.forEach(n => {
        Ve(n, t)
    });
    else if (eo(e))
        for (const n in e) Ve(e[n], t);
    return e
}

function X(e, t) {
    const n = ge;
    if (n === null) return e;
    const o = wn(n) || n.proxy,
        s = e.dirs || (e.dirs = []);
    for (let r = 0; r < t.length; r++) {
        let [i, l, c, p = U] = t[r];
        i && (O(i) && (i = {
            mounted: i,
            updated: i
        }), i.deep && Ve(l), s.push({
            dir: i,
            instance: o,
            value: l,
            oldValue: void 0,
            arg: c,
            modifiers: p
        }))
    }
    return e
}

function He(e, t, n, o) {
    const s = e.dirs,
        r = t && t.dirs;
    for (let i = 0; i < s.length; i++) {
        const l = s[i];
        r && (l.oldValue = r[i].value);
        let c = l.dir[o];
        c && (gt(), ye(c, n, 8, [e.el, l, e, t]), mt())
    }
} /*! #__NO_SIDE_EFFECTS__ */
function gn(e, t) {
    return O(e) ? Z({
        name: e.name
    }, t, {
        setup: e
    }) : e
}
const zt = e => !!e.type.__asyncLoader,
    Fo = e => e.type.__isKeepAlive;

function li(e, t) {
    Oo(e, "a", t)
}

function ui(e, t) {
    Oo(e, "da", t)
}

function Oo(e, t, n = re) {
    const o = e.__wdc || (e.__wdc = () => {
        let s = n;
        for (; s;) {
            if (s.isDeactivated) return;
            s = s.parent
        }
        return e()
    });
    if (mn(t, o, n), n) {
        let s = n.parent;
        for (; s && s.parent;) Fo(s.parent.vnode) && ai(o, t, n, s), s = s.parent
    }
}

function ai(e, t, n, o) {
    const s = mn(t, e, o, !0);
    Do(() => {
        Xn(o[t], s)
    }, n)
}

function mn(e, t, n = re, o = !1) {
    if (n) {
        const s = n[e] || (n[e] = []),
            r = t.__weh || (t.__weh = (...i) => {
                if (n.isUnmounted) return;
                gt(), pt(n);
                const l = ye(t, n, e, i);
                return Je(), mt(), l
            });
        return o ? s.unshift(r) : s.push(r), r
    }
}
const Pe = e => (t, n = re) => (!Ft || e === "sp") && mn(e, (...o) => t(...o), n),
    ci = Pe("bm"),
    Eo = Pe("m"),
    fi = Pe("bu"),
    di = Pe("u"),
    So = Pe("bum"),
    Do = Pe("um"),
    pi = Pe("sp"),
    hi = Pe("rtg"),
    gi = Pe("rtc");

function mi(e, t = re) {
    mn("ec", e, t)
}

function Ct(e, t, n, o) {
    let s;
    const r = n && n[o];
    if (P(e) || J(e)) {
        s = new Array(e.length);
        for (let i = 0, l = e.length; i < l; i++) s[i] = t(e[i], i, void 0, r && r[i])
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, r && r[i])
    } else if (j(e))
        if (e[Symbol.iterator]) s = Array.from(e, (i, l) => t(i, l, void 0, r && r[l]));
        else {
            const i = Object.keys(e);
            s = new Array(i.length);
            for (let l = 0, c = i.length; l < c; l++) {
                const p = i[l];
                s[l] = t(e[p], p, l, r && r[l])
            }
        }
    else s = [];
    return n && (n[o] = s), s
}
const Un = e => e ? Go(e) ? wn(e) || e.proxy : Un(e.parent) : null,
    At = Z(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => Un(e.parent),
        $root: e => Un(e.root),
        $emit: e => e.emit,
        $options: e => lr(e),
        $forceUpdate: e => e.f || (e.f = () => ir(e.update)),
        $nextTick: e => e.n || (e.n = zs.bind(e.proxy)),
        $watch: e => ii.bind(e)
    }),
    Pn = (e, t) => e !== U && !e.__isScriptSetup && $(e, t),
    yi = {
        get({
            _: e
        }, t) {
            const {
                ctx: n,
                setupState: o,
                data: s,
                props: r,
                accessCache: i,
                type: l,
                appContext: c
            } = e;
            let p;
            if (t[0] !== "$") {
                const R = i[t];
                if (R !== void 0) switch (R) {
                    case 1:
                        return o[t];
                    case 2:
                        return s[t];
                    case 4:
                        return n[t];
                    case 3:
                        return r[t]
                } else {
                    if (Pn(o, t)) return i[t] = 1, o[t];
                    if (s !== U && $(s, t)) return i[t] = 2, s[t];
                    if ((p = e.propsOptions[0]) && $(p, t)) return i[t] = 3, r[t];
                    if (n !== U && $(n, t)) return i[t] = 4, n[t];
                    jn && (i[t] = 0)
                }
            }
            const m = At[t];
            let a, d;
            if (m) return t === "$attrs" && ue(e, "get", t), m(e);
            if ((a = l.__cssModules) && (a = a[t])) return a;
            if (n !== U && $(n, t)) return i[t] = 4, n[t];
            if (d = c.config.globalProperties, $(d, t)) return d[t]
        },
        set({
            _: e
        }, t, n) {
            const {
                data: o,
                setupState: s,
                ctx: r
            } = e;
            return Pn(s, t) ? (s[t] = n, !0) : o !== U && $(o, t) ? (o[t] = n, !0) : $(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0)
        },
        has({
            _: {
                data: e,
                setupState: t,
                accessCache: n,
                ctx: o,
                appContext: s,
                propsOptions: r
            }
        }, i) {
            let l;
            return !!n[i] || e !== U && $(e, i) || Pn(t, i) || (l = r[0]) && $(l, i) || $(o, i) || $(At, i) || $(s.config.globalProperties, i)
        },
        defineProperty(e, t, n) {
            return n.get != null ? e._.accessCache[t] = 0 : $(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    };

function Rr(e) {
    return P(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
}
let jn = !0;

function vi(e) {
    const t = lr(e),
        n = e.proxy,
        o = e.ctx;
    jn = !1, t.beforeCreate && Pr(t.beforeCreate, e, "bc");
    const {
        data: s,
        computed: r,
        methods: i,
        watch: l,
        provide: c,
        inject: p,
        created: m,
        beforeMount: a,
        mounted: d,
        beforeUpdate: R,
        updated: N,
        activated: S,
        deactivated: z,
        beforeDestroy: Y,
        beforeUnmount: Q,
        destroyed: ee,
        unmounted: E,
        render: ve,
        renderTracked: Ze,
        renderTriggered: yt,
        errorCaptured: Fe,
        serverPrefetch: Cn,
        expose: Le,
        inheritAttrs: vt,
        components: Et,
        directives: St,
        filters: Tn
    } = t;
    if (p && wi(p, o, null), i)
        for (const G in i) {
            const H = i[G];
            O(H) && (o[G] = H.bind(n))
        }
    if (s) {
        const G = s.call(n, n);
        j(G) && (e.data = fn(G))
    }
    if (jn = !0, r)
        for (const G in r) {
            const H = r[G],
                Be = O(H) ? H.bind(n, n) : O(H.get) ? H.get.bind(n, n) : Ae,
                Dt = !O(H) && O(H.set) ? H.set.bind(n) : Ae,
                qe = Qi({
                    get: Be,
                    set: Dt
                });
            Object.defineProperty(o, G, {
                enumerable: !0,
                configurable: !0,
                get: () => qe.value,
                set: we => qe.value = we
            })
        }
    if (l)
        for (const G in l) Mo(l[G], o, n, G);
    if (c) {
        const G = O(c) ? c.call(n) : c;
        Reflect.ownKeys(G).forEach(H => {
            xi(H, G[H])
        })
    }
    m && Pr(m, e, "c");

    function oe(G, H) {
        P(H) ? H.forEach(Be => G(Be.bind(n))) : H && G(H.bind(n))
    }
    if (oe(ci, a), oe(Eo, d), oe(fi, R), oe(di, N), oe(li, S), oe(ui, z), oe(mi, Fe), oe(gi, Ze), oe(hi, yt), oe(So, Q), oe(Do, E), oe(pi, Cn), P(Le))
        if (Le.length) {
            const G = e.exposed || (e.exposed = {});
            Le.forEach(H => {
                Object.defineProperty(G, H, {
                    get: () => n[H],
                    set: Be => n[H] = Be
                })
            })
        } else e.exposed || (e.exposed = {});
    ve && e.render === Ae && (e.render = ve), vt != null && (e.inheritAttrs = vt), Et && (e.components = Et), St && (e.directives = St)
}

function wi(e, t, n = Ae) {
    P(e) && (e = Gn(e));
    for (const o in e) {
        const s = e[o];
        let r;
        j(s) ? "default" in s ? r = Vt(s.from || o, s.default, !0) : r = Vt(s.from || o) : r = Vt(s), W(r) ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => r.value,
            set: i => r.value = i
        }) : t[o] = r
    }
}

function Pr(e, t, n) {
    ye(P(e) ? e.map(o => o.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function Mo(e, t, n, o) {
    const s = o.includes(".") ? Po(n, o) : () => n[o];
    if (J(e)) {
        const r = t[e];
        O(r) && Gt(s, r)
    } else if (O(e)) Gt(s, e.bind(n));
    else if (j(e))
        if (P(e)) e.forEach(r => Mo(r, t, n, o));
        else {
            const r = O(e.handler) ? e.handler.bind(n) : t[e.handler];
            O(r) && Gt(s, r, e)
        }
}

function lr(e) {
    const t = e.type,
        {
            mixins: n,
            extends: o
        } = t,
        {
            mixins: s,
            optionsCache: r,
            config: {
                optionMergeStrategies: i
            }
        } = e.appContext,
        l = r.get(t);
    let c;
    return l ? c = l : !s.length && !n && !o ? c = t : (c = {}, s.length && s.forEach(p => Yt(c, p, i, !0)), Yt(c, t, i)), j(t) && r.set(t, c), c
}

function Yt(e, t, n, o = !1) {
    const {
        mixins: s,
        extends: r
    } = t;
    r && Yt(e, r, n, !0), s && s.forEach(i => Yt(e, i, n, !0));
    for (const i in t)
        if (!(o && i === "expose")) {
            const l = bi[i] || n && n[i];
            e[i] = l ? l(e[i], t[i]) : t[i]
        } return e
}
const bi = {
    data: Fr,
    props: Or,
    emits: Or,
    methods: Tt,
    computed: Tt,
    beforeCreate: se,
    created: se,
    beforeMount: se,
    mounted: se,
    beforeUpdate: se,
    updated: se,
    beforeDestroy: se,
    beforeUnmount: se,
    destroyed: se,
    unmounted: se,
    activated: se,
    deactivated: se,
    errorCaptured: se,
    serverPrefetch: se,
    components: Tt,
    directives: Tt,
    watch: Ci,
    provide: Fr,
    inject: _i
};

function Fr(e, t) {
    return t ? e ? function() {
        return Z(O(e) ? e.call(this, this) : e, O(t) ? t.call(this, this) : t)
    } : t : e
}

function _i(e, t) {
    return Tt(Gn(e), Gn(t))
}

function Gn(e) {
    if (P(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function se(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function Tt(e, t) {
    return e ? Z(Object.create(null), e, t) : t
}

function Or(e, t) {
    return e ? P(e) && P(t) ? [...new Set([...e, ...t])] : Z(Object.create(null), Rr(e), Rr(t ?? {})) : t
}

function Ci(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = Z(Object.create(null), e);
    for (const o in t) n[o] = se(e[o], t[o]);
    return n
}

function No() {
    return {
        app: null,
        config: {
            isNativeTag: rs,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Ti = 0;

function Ai(e, t) {
    return function(o, s = null) {
        O(o) || (o = Z({}, o)), s != null && !j(s) && (s = null);
        const r = No(),
            i = new WeakSet;
        let l = !1;
        const c = r.app = {
            _uid: Ti++,
            _component: o,
            _props: s,
            _container: null,
            _context: r,
            _instance: null,
            version: Yi,
            get config() {
                return r.config
            },
            set config(p) {},
            use(p, ...m) {
                return i.has(p) || (p && O(p.install) ? (i.add(p), p.install(c, ...m)) : O(p) && (i.add(p), p(c, ...m))), c
            },
            mixin(p) {
                return r.mixins.includes(p) || r.mixins.push(p), c
            },
            component(p, m) {
                return m ? (r.components[p] = m, c) : r.components[p]
            },
            directive(p, m) {
                return m ? (r.directives[p] = m, c) : r.directives[p]
            },
            mount(p, m, a) {
                if (!l) {
                    const d = xe(o, s);
                    return d.appContext = r, m && t ? t(d, p) : e(d, p, a), l = !0, c._container = p, p.__vue_app__ = c, wn(d.component) || d.component.proxy
                }
            },
            unmount() {
                l && (e(null, c._container), delete c._container.__vue_app__)
            },
            provide(p, m) {
                return r.provides[p] = m, c
            },
            runWithContext(p) {
                en = c;
                try {
                    return p()
                } finally {
                    en = null
                }
            }
        };
        return c
    }
}
let en = null;

function xi(e, t) {
    if (re) {
        let n = re.provides;
        const o = re.parent && re.parent.provides;
        o === n && (n = re.provides = Object.create(o)), n[e] = t
    }
}

function Vt(e, t, n = !1) {
    const o = re || ge;
    if (o || en) {
        const s = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : en._context.provides;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && O(t) ? t.call(o && o.proxy) : t
    }
}

function ki(e, t, n, o = !1) {
    const s = {},
        r = {};
    Jt(r, vn, 1), e.propsDefaults = Object.create(null), $o(e, t, s, r);
    for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
    n ? e.props = o ? s : Bs(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r
}

function Ii(e, t, n, o) {
    const {
        props: s,
        attrs: r,
        vnode: {
            patchFlag: i
        }
    } = e, l = L(s), [c] = e.propsOptions;
    let p = !1;
    if ((o || i > 0) && !(i & 16)) {
        if (i & 8) {
            const m = e.vnode.dynamicProps;
            for (let a = 0; a < m.length; a++) {
                let d = m[a];
                if (pn(e.emitsOptions, d)) continue;
                const R = t[d];
                if (c)
                    if ($(r, d)) R !== r[d] && (r[d] = R, p = !0);
                    else {
                        const N = ct(d);
                        s[N] = zn(c, l, N, R, e, !1)
                    }
                else R !== r[d] && (r[d] = R, p = !0)
            }
        }
    } else {
        $o(e, t, s, r) && (p = !0);
        let m;
        for (const a in l)(!t || !$(t, a) && ((m = ht(a)) === a || !$(t, m))) && (c ? n && (n[a] !== void 0 || n[m] !== void 0) && (s[a] = zn(c, l, a, void 0, e, !0)) : delete s[a]);
        if (r !== l)
            for (const a in r)(!t || !$(t, a)) && (delete r[a], p = !0)
    }
    p && Re(e, "set", "$attrs")
}

function $o(e, t, n, o) {
    const [s, r] = e.propsOptions;
    let i = !1,
        l;
    if (t)
        for (let c in t) {
            if (Ut(c)) continue;
            const p = t[c];
            let m;
            s && $(s, m = ct(c)) ? !r || !r.includes(m) ? n[m] = p : (l || (l = {}))[m] = p : pn(e.emitsOptions, c) || (!(c in o) || p !== o[c]) && (o[c] = p, i = !0)
        }
    if (r) {
        const c = L(n),
            p = l || U;
        for (let m = 0; m < r.length; m++) {
            const a = r[m];
            n[a] = zn(s, c, a, p[a], e, !$(p, a))
        }
    }
    return i
}

function zn(e, t, n, o, s, r) {
    const i = e[n];
    if (i != null) {
        const l = $(i, "default");
        if (l && o === void 0) {
            const c = i.default;
            if (i.type !== Function && !i.skipFactory && O(c)) {
                const {
                    propsDefaults: p
                } = s;
                n in p ? o = p[n] : (pt(s), o = p[n] = c.call(null, t), Je())
            } else o = c
        }
        i[0] && (r && !l ? o = !1 : i[1] && (o === "" || o === ht(n)) && (o = !0))
    }
    return o
}

function Lo(e, t, n = !1) {
    const o = t.propsCache,
        s = o.get(e);
    if (s) return s;
    const r = e.props,
        i = {},
        l = [];
    let c = !1;
    if (!O(e)) {
        const m = a => {
            c = !0;
            const [d, R] = Lo(a, t, !0);
            Z(i, d), R && l.push(...R)
        };
        !n && t.mixins.length && t.mixins.forEach(m), e.extends && m(e.extends), e.mixins && e.mixins.forEach(m)
    }
    if (!r && !c) return j(e) && o.set(e, ot), ot;
    if (P(r))
        for (let m = 0; m < r.length; m++) {
            const a = ct(r[m]);
            Er(a) && (i[a] = U)
        } else if (r)
            for (const m in r) {
                const a = ct(m);
                if (Er(a)) {
                    const d = r[m],
                        R = i[a] = P(d) || O(d) ? {
                            type: d
                        } : Z({}, d);
                    if (R) {
                        const N = Mr(Boolean, R.type),
                            S = Mr(String, R.type);
                        R[0] = N > -1, R[1] = S < 0 || N < S, (N > -1 || $(R, "default")) && l.push(a)
                    }
                }
            }
    const p = [i, l];
    return j(e) && o.set(e, p), p
}

function Er(e) {
    return e[0] !== "$"
}

function Sr(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}

function Dr(e, t) {
    return Sr(e) === Sr(t)
}

function Mr(e, t) {
    return P(t) ? t.findIndex(n => Dr(n, e)) : O(t) && Dr(t, e) ? 0 : -1
}
const Bo = e => e[0] === "_" || e === "$stable",
    ur = e => P(e) ? e.map(Ce) : [Ce(e)],
    Ri = (e, t, n) => {
        if (t._n) return t;
        const o = Zs((...s) => ur(t(...s)), n);
        return o._c = !1, o
    },
    qo = (e, t, n) => {
        const o = e._ctx;
        for (const s in e) {
            if (Bo(s)) continue;
            const r = e[s];
            if (O(r)) t[s] = Ri(s, r, o);
            else if (r != null) {
                const i = ur(r);
                t[s] = () => i
            }
        }
    },
    Ho = (e, t) => {
        const n = ur(t);
        e.slots.default = () => n
    },
    Pi = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? (e.slots = L(t), Jt(t, "_", n)) : qo(t, e.slots = {})
        } else e.slots = {}, t && Ho(e, t);
        Jt(e.slots, vn, 1)
    },
    Fi = (e, t, n) => {
        const {
            vnode: o,
            slots: s
        } = e;
        let r = !0,
            i = U;
        if (o.shapeFlag & 32) {
            const l = t._;
            l ? n && l === 1 ? r = !1 : (Z(s, t), !n && l === 1 && delete s._) : (r = !t.$stable, qo(t, s)), i = t
        } else t && (Ho(e, t), i = {
            default: 1
        });
        if (r)
            for (const l in s) !Bo(l) && i[l] == null && delete s[l]
    };

function Vn(e, t, n, o, s = !1) {
    if (P(e)) {
        e.forEach((d, R) => Vn(d, t && (P(t) ? t[R] : t), n, o, s));
        return
    }
    if (zt(o) && !s) return;
    const r = o.shapeFlag & 4 ? wn(o.component) || o.component.proxy : o.el,
        i = s ? null : r,
        {
            i: l,
            r: c
        } = e,
        p = t && t.r,
        m = l.refs === U ? l.refs = {} : l.refs,
        a = l.setupState;
    if (p != null && p !== c && (J(p) ? (m[p] = null, $(a, p) && (a[p] = null)) : W(p) && (p.value = null)), O(c)) Me(c, l, 12, [i, m]);
    else {
        const d = J(c),
            R = W(c);
        if (d || R) {
            const N = () => {
                if (e.f) {
                    const S = d ? $(a, c) ? a[c] : m[c] : c.value;
                    s ? P(S) && Xn(S, r) : P(S) ? S.includes(r) || S.push(r) : d ? (m[c] = [r], $(a, c) && (a[c] = m[c])) : (c.value = [r], e.k && (m[e.k] = c.value))
                } else d ? (m[c] = i, $(a, c) && (a[c] = i)) : R && (c.value = i, e.k && (m[e.k] = i))
            };
            i ? (N.id = -1, ie(N, n)) : N()
        }
    }
}
const ie = si;

function Oi(e) {
    return Ei(e)
}

function Ei(e, t) {
    const n = $n();
    n.__VUE__ = !0;
    const {
        insert: o,
        remove: s,
        patchProp: r,
        createElement: i,
        createText: l,
        createComment: c,
        setText: p,
        setElementText: m,
        parentNode: a,
        nextSibling: d,
        setScopeId: R = Ae,
        insertStaticContent: N
    } = e, S = (u, f, h, y = null, v = null, _ = null, T = !1, b = null, C = !!f.dynamicChildren) => {
        if (u === f) return;
        u && !bt(u, f) && (y = Mt(u), we(u, v, _, !0), u = null), f.patchFlag === -2 && (C = !1, f.dynamicChildren = null);
        const {
            type: w,
            ref: x,
            shapeFlag: A
        } = f;
        switch (w) {
            case yn:
                z(u, f, h, y);
                break;
            case Xe:
                Y(u, f, h, y);
                break;
            case Fn:
                u == null && Q(f, h, y, T);
                break;
            case te:
                Et(u, f, h, y, v, _, T, b, C);
                break;
            default:
                A & 1 ? ve(u, f, h, y, v, _, T, b, C) : A & 6 ? St(u, f, h, y, v, _, T, b, C) : (A & 64 || A & 128) && w.process(u, f, h, y, v, _, T, b, C, Ye)
        }
        x != null && v && Vn(x, u && u.ref, _, f || u, !f)
    }, z = (u, f, h, y) => {
        if (u == null) o(f.el = l(f.children), h, y);
        else {
            const v = f.el = u.el;
            f.children !== u.children && p(v, f.children)
        }
    }, Y = (u, f, h, y) => {
        u == null ? o(f.el = c(f.children || ""), h, y) : f.el = u.el
    }, Q = (u, f, h, y) => {
        [u.el, u.anchor] = N(u.children, f, h, y, u.el, u.anchor)
    }, ee = ({
        el: u,
        anchor: f
    }, h, y) => {
        let v;
        for (; u && u !== f;) v = d(u), o(u, h, y), u = v;
        o(f, h, y)
    }, E = ({
        el: u,
        anchor: f
    }) => {
        let h;
        for (; u && u !== f;) h = d(u), s(u), u = h;
        s(f)
    }, ve = (u, f, h, y, v, _, T, b, C) => {
        T = T || f.type === "svg", u == null ? Ze(f, h, y, v, _, T, b, C) : Cn(u, f, v, _, T, b, C)
    }, Ze = (u, f, h, y, v, _, T, b) => {
        let C, w;
        const {
            type: x,
            props: A,
            shapeFlag: k,
            transition: F,
            dirs: D
        } = u;
        if (C = u.el = i(u.type, _, A && A.is, A), k & 8 ? m(C, u.children) : k & 16 && Fe(u.children, C, null, y, v, _ && x !== "foreignObject", T, b), D && He(u, null, y, "created"), yt(C, u, u.scopeId, T, y), A) {
            for (const B in A) B !== "value" && !Ut(B) && r(C, B, null, A[B], _, u.children, y, v, ke);
            "value" in A && r(C, "value", null, A.value), (w = A.onVnodeBeforeMount) && _e(w, y, u)
        }
        D && He(u, null, y, "beforeMount");
        const K = Si(v, F);
        K && F.beforeEnter(C), o(C, f, h), ((w = A && A.onVnodeMounted) || K || D) && ie(() => {
            w && _e(w, y, u), K && F.enter(C), D && He(u, null, y, "mounted")
        }, v)
    }, yt = (u, f, h, y, v) => {
        if (h && R(u, h), y)
            for (let _ = 0; _ < y.length; _++) R(u, y[_]);
        if (v) {
            let _ = v.subTree;
            if (f === _) {
                const T = v.vnode;
                yt(u, T, T.scopeId, T.slotScopeIds, v.parent)
            }
        }
    }, Fe = (u, f, h, y, v, _, T, b, C = 0) => {
        for (let w = C; w < u.length; w++) {
            const x = u[w] = b ? Ee(u[w]) : Ce(u[w]);
            S(null, x, f, h, y, v, _, T, b)
        }
    }, Cn = (u, f, h, y, v, _, T) => {
        const b = f.el = u.el;
        let {
            patchFlag: C,
            dynamicChildren: w,
            dirs: x
        } = f;
        C |= u.patchFlag & 16;
        const A = u.props || U,
            k = f.props || U;
        let F;
        h && Ke(h, !1), (F = k.onVnodeBeforeUpdate) && _e(F, h, f, u), x && He(f, u, h, "beforeUpdate"), h && Ke(h, !0);
        const D = v && f.type !== "foreignObject";
        if (w ? Le(u.dynamicChildren, w, b, h, y, D, _) : T || H(u, f, b, null, h, y, D, _, !1), C > 0) {
            if (C & 16) vt(b, f, A, k, h, y, v);
            else if (C & 2 && A.class !== k.class && r(b, "class", null, k.class, v), C & 4 && r(b, "style", A.style, k.style, v), C & 8) {
                const K = f.dynamicProps;
                for (let B = 0; B < K.length; B++) {
                    const V = K[B],
                        fe = A[V],
                        et = k[V];
                    (et !== fe || V === "value") && r(b, V, fe, et, v, u.children, h, y, ke)
                }
            }
            C & 1 && u.children !== f.children && m(b, f.children)
        } else !T && w == null && vt(b, f, A, k, h, y, v);
        ((F = k.onVnodeUpdated) || x) && ie(() => {
            F && _e(F, h, f, u), x && He(f, u, h, "updated")
        }, y)
    }, Le = (u, f, h, y, v, _, T) => {
        for (let b = 0; b < f.length; b++) {
            const C = u[b],
                w = f[b],
                x = C.el && (C.type === te || !bt(C, w) || C.shapeFlag & 70) ? a(C.el) : h;
            S(C, w, x, null, y, v, _, T, !0)
        }
    }, vt = (u, f, h, y, v, _, T) => {
        if (h !== y) {
            if (h !== U)
                for (const b in h) !Ut(b) && !(b in y) && r(u, b, h[b], null, T, f.children, v, _, ke);
            for (const b in y) {
                if (Ut(b)) continue;
                const C = y[b],
                    w = h[b];
                C !== w && b !== "value" && r(u, b, w, C, T, f.children, v, _, ke)
            }
            "value" in y && r(u, "value", h.value, y.value)
        }
    }, Et = (u, f, h, y, v, _, T, b, C) => {
        const w = f.el = u ? u.el : l(""),
            x = f.anchor = u ? u.anchor : l("");
        let {
            patchFlag: A,
            dynamicChildren: k,
            slotScopeIds: F
        } = f;
        F && (b = b ? b.concat(F) : F), u == null ? (o(w, h, y), o(x, h, y), Fe(f.children, h, x, v, _, T, b, C)) : A > 0 && A & 64 && k && u.dynamicChildren ? (Le(u.dynamicChildren, k, h, v, _, T, b), (f.key != null || v && f === v.subTree) && Ko(u, f, !0)) : H(u, f, h, x, v, _, T, b, C)
    }, St = (u, f, h, y, v, _, T, b, C) => {
        f.slotScopeIds = b, u == null ? f.shapeFlag & 512 ? v.ctx.activate(f, h, y, T, C) : Tn(f, h, y, v, _, T, C) : fr(u, f, C)
    }, Tn = (u, f, h, y, v, _, T) => {
        const b = u.component = ji(u, y, v);
        if (Fo(u) && (b.ctx.renderer = Ye), Gi(b), b.asyncDep) {
            if (v && v.registerDep(b, oe), !u.el) {
                const C = b.subTree = xe(Xe);
                Y(null, C, f, h)
            }
            return
        }
        oe(b, u, f, h, v, _, T)
    }, fr = (u, f, h) => {
        const y = f.component = u.component;
        if (ti(u, f, h))
            if (y.asyncDep && !y.asyncResolved) {
                G(y, f, h);
                return
            } else y.next = f, Ws(y.update), y.update();
        else f.el = u.el, y.vnode = f
    }, oe = (u, f, h, y, v, _, T) => {
        const b = () => {
                if (u.isMounted) {
                    let {
                        next: x,
                        bu: A,
                        u: k,
                        parent: F,
                        vnode: D
                    } = u, K = x, B;
                    Ke(u, !1), x ? (x.el = D.el, G(u, x, T)) : x = D, A && jt(A), (B = x.props && x.props.onVnodeBeforeUpdate) && _e(B, F, x, D), Ke(u, !0);
                    const V = Rn(u),
                        fe = u.subTree;
                    u.subTree = V, S(fe, V, a(fe.el), Mt(fe), u, v, _), x.el = V.el, K === null && ni(u, V.el), k && ie(k, v), (B = x.props && x.props.onVnodeUpdated) && ie(() => _e(B, F, x, D), v)
                } else {
                    let x;
                    const {
                        el: A,
                        props: k
                    } = f, {
                        bm: F,
                        m: D,
                        parent: K
                    } = u, B = zt(f);
                    if (Ke(u, !1), F && jt(F), !B && (x = k && k.onVnodeBeforeMount) && _e(x, K, f), Ke(u, !0), A && xn) {
                        const V = () => {
                            u.subTree = Rn(u), xn(A, u.subTree, u, v, null)
                        };
                        B ? f.type.__asyncLoader().then(() => !u.isUnmounted && V()) : V()
                    } else {
                        const V = u.subTree = Rn(u);
                        S(null, V, h, y, u, v, _), f.el = V.el
                    }
                    if (D && ie(D, v), !B && (x = k && k.onVnodeMounted)) {
                        const V = f;
                        ie(() => _e(x, K, V), v)
                    }(f.shapeFlag & 256 || K && zt(K.vnode) && K.vnode.shapeFlag & 256) && u.a && ie(u.a, v), u.isMounted = !0, f = h = y = null
                }
            },
            C = u.effect = new er(b, () => ir(w), u.scope),
            w = u.update = () => C.run();
        w.id = u.uid, Ke(u, !0), w()
    }, G = (u, f, h) => {
        f.component = u;
        const y = u.vnode.props;
        u.vnode = f, u.next = null, Ii(u, f.props, y, h), Fi(u, f.children, h), gt(), kr(u), mt()
    }, H = (u, f, h, y, v, _, T, b, C = !1) => {
        const w = u && u.children,
            x = u ? u.shapeFlag : 0,
            A = f.children,
            {
                patchFlag: k,
                shapeFlag: F
            } = f;
        if (k > 0) {
            if (k & 128) {
                Dt(w, A, h, y, v, _, T, b, C);
                return
            } else if (k & 256) {
                Be(w, A, h, y, v, _, T, b, C);
                return
            }
        }
        F & 8 ? (x & 16 && ke(w, v, _), A !== w && m(h, A)) : x & 16 ? F & 16 ? Dt(w, A, h, y, v, _, T, b, C) : ke(w, v, _, !0) : (x & 8 && m(h, ""), F & 16 && Fe(A, h, y, v, _, T, b, C))
    }, Be = (u, f, h, y, v, _, T, b, C) => {
        u = u || ot, f = f || ot;
        const w = u.length,
            x = f.length,
            A = Math.min(w, x);
        let k;
        for (k = 0; k < A; k++) {
            const F = f[k] = C ? Ee(f[k]) : Ce(f[k]);
            S(u[k], F, h, null, v, _, T, b, C)
        }
        w > x ? ke(u, v, _, !0, !1, A) : Fe(f, h, y, v, _, T, b, C, A)
    }, Dt = (u, f, h, y, v, _, T, b, C) => {
        let w = 0;
        const x = f.length;
        let A = u.length - 1,
            k = x - 1;
        for (; w <= A && w <= k;) {
            const F = u[w],
                D = f[w] = C ? Ee(f[w]) : Ce(f[w]);
            if (bt(F, D)) S(F, D, h, null, v, _, T, b, C);
            else break;
            w++
        }
        for (; w <= A && w <= k;) {
            const F = u[A],
                D = f[k] = C ? Ee(f[k]) : Ce(f[k]);
            if (bt(F, D)) S(F, D, h, null, v, _, T, b, C);
            else break;
            A--, k--
        }
        if (w > A) {
            if (w <= k) {
                const F = k + 1,
                    D = F < x ? f[F].el : y;
                for (; w <= k;) S(null, f[w] = C ? Ee(f[w]) : Ce(f[w]), h, D, v, _, T, b, C), w++
            }
        } else if (w > k)
            for (; w <= A;) we(u[w], v, _, !0), w++;
        else {
            const F = w,
                D = w,
                K = new Map;
            for (w = D; w <= k; w++) {
                const ae = f[w] = C ? Ee(f[w]) : Ce(f[w]);
                ae.key != null && K.set(ae.key, w)
            }
            let B, V = 0;
            const fe = k - D + 1;
            let et = !1,
                hr = 0;
            const wt = new Array(fe);
            for (w = 0; w < fe; w++) wt[w] = 0;
            for (w = F; w <= A; w++) {
                const ae = u[w];
                if (V >= fe) {
                    we(ae, v, _, !0);
                    continue
                }
                let be;
                if (ae.key != null) be = K.get(ae.key);
                else
                    for (B = D; B <= k; B++)
                        if (wt[B - D] === 0 && bt(ae, f[B])) {
                            be = B;
                            break
                        } be === void 0 ? we(ae, v, _, !0) : (wt[be - D] = w + 1, be >= hr ? hr = be : et = !0, S(ae, f[be], h, null, v, _, T, b, C), V++)
            }
            const gr = et ? Di(wt) : ot;
            for (B = gr.length - 1, w = fe - 1; w >= 0; w--) {
                const ae = D + w,
                    be = f[ae],
                    mr = ae + 1 < x ? f[ae + 1].el : y;
                wt[w] === 0 ? S(null, be, h, mr, v, _, T, b, C) : et && (B < 0 || w !== gr[B] ? qe(be, h, mr, 2) : B--)
            }
        }
    }, qe = (u, f, h, y, v = null) => {
        const {
            el: _,
            type: T,
            transition: b,
            children: C,
            shapeFlag: w
        } = u;
        if (w & 6) {
            qe(u.component.subTree, f, h, y);
            return
        }
        if (w & 128) {
            u.suspense.move(f, h, y);
            return
        }
        if (w & 64) {
            T.move(u, f, h, Ye);
            return
        }
        if (T === te) {
            o(_, f, h);
            for (let A = 0; A < C.length; A++) qe(C[A], f, h, y);
            o(u.anchor, f, h);
            return
        }
        if (T === Fn) {
            ee(u, f, h);
            return
        }
        if (y !== 2 && w & 1 && b)
            if (y === 0) b.beforeEnter(_), o(_, f, h), ie(() => b.enter(_), v);
            else {
                const {
                    leave: A,
                    delayLeave: k,
                    afterLeave: F
                } = b, D = () => o(_, f, h), K = () => {
                    A(_, () => {
                        D(), F && F()
                    })
                };
                k ? k(_, D, K) : K()
            }
        else o(_, f, h)
    }, we = (u, f, h, y = !1, v = !1) => {
        const {
            type: _,
            props: T,
            ref: b,
            children: C,
            dynamicChildren: w,
            shapeFlag: x,
            patchFlag: A,
            dirs: k
        } = u;
        if (b != null && Vn(b, null, h, u, !0), x & 256) {
            f.ctx.deactivate(u);
            return
        }
        const F = x & 1 && k,
            D = !zt(u);
        let K;
        if (D && (K = T && T.onVnodeBeforeUnmount) && _e(K, f, u), x & 6) ns(u.component, h, y);
        else {
            if (x & 128) {
                u.suspense.unmount(h, y);
                return
            }
            F && He(u, null, f, "beforeUnmount"), x & 64 ? u.type.remove(u, f, h, v, Ye, y) : w && (_ !== te || A > 0 && A & 64) ? ke(w, f, h, !1, !0) : (_ === te && A & 384 || !v && x & 16) && ke(C, f, h), y && dr(u)
        }(D && (K = T && T.onVnodeUnmounted) || F) && ie(() => {
            K && _e(K, f, u), F && He(u, null, f, "unmounted")
        }, h)
    }, dr = u => {
        const {
            type: f,
            el: h,
            anchor: y,
            transition: v
        } = u;
        if (f === te) {
            ts(h, y);
            return
        }
        if (f === Fn) {
            E(u);
            return
        }
        const _ = () => {
            s(h), v && !v.persisted && v.afterLeave && v.afterLeave()
        };
        if (u.shapeFlag & 1 && v && !v.persisted) {
            const {
                leave: T,
                delayLeave: b
            } = v, C = () => T(h, _);
            b ? b(u.el, _, C) : C()
        } else _()
    }, ts = (u, f) => {
        let h;
        for (; u !== f;) h = d(u), s(u), u = h;
        s(f)
    }, ns = (u, f, h) => {
        const {
            bum: y,
            scope: v,
            update: _,
            subTree: T,
            um: b
        } = u;
        y && jt(y), v.stop(), _ && (_.active = !1, we(T, u, f, h)), b && ie(b, f), ie(() => {
            u.isUnmounted = !0
        }, f), f && f.pendingBranch && !f.isUnmounted && u.asyncDep && !u.asyncResolved && u.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve())
    }, ke = (u, f, h, y = !1, v = !1, _ = 0) => {
        for (let T = _; T < u.length; T++) we(u[T], f, h, y, v)
    }, Mt = u => u.shapeFlag & 6 ? Mt(u.component.subTree) : u.shapeFlag & 128 ? u.suspense.next() : d(u.anchor || u.el), pr = (u, f, h) => {
        u == null ? f._vnode && we(f._vnode, null, null, !0) : S(f._vnode || null, u, f, null, null, null, h), kr(), To(), f._vnode = u
    }, Ye = {
        p: S,
        um: we,
        m: qe,
        r: dr,
        mt: Tn,
        mc: Fe,
        pc: H,
        pbc: Le,
        n: Mt,
        o: e
    };
    let An, xn;
    return t && ([An, xn] = t(Ye)), {
        render: pr,
        hydrate: An,
        createApp: Ai(pr, An)
    }
}

function Ke({
    effect: e,
    update: t
}, n) {
    e.allowRecurse = t.allowRecurse = n
}

function Si(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}

function Ko(e, t, n = !1) {
    const o = e.children,
        s = t.children;
    if (P(o) && P(s))
        for (let r = 0; r < o.length; r++) {
            const i = o[r];
            let l = s[r];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = Ee(s[r]), l.el = i.el), n || Ko(i, l)), l.type === yn && (l.el = i.el)
        }
}

function Di(e) {
    const t = e.slice(),
        n = [0];
    let o, s, r, i, l;
    const c = e.length;
    for (o = 0; o < c; o++) {
        const p = e[o];
        if (p !== 0) {
            if (s = n[n.length - 1], e[s] < p) {
                t[o] = s, n.push(o);
                continue
            }
            for (r = 0, i = n.length - 1; r < i;) l = r + i >> 1, e[n[l]] < p ? r = l + 1 : i = l;
            p < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), n[r] = o)
        }
    }
    for (r = n.length, i = n[r - 1]; r-- > 0;) n[r] = i, i = t[i];
    return n
}
const Mi = e => e.__isTeleport,
    te = Symbol.for("v-fgt"),
    yn = Symbol.for("v-txt"),
    Xe = Symbol.for("v-cmt"),
    Fn = Symbol.for("v-stc"),
    xt = [];
let me = null;

function M(e = !1) {
    xt.push(me = e ? null : [])
}

function Ni() {
    xt.pop(), me = xt[xt.length - 1] || null
}
let Pt = 1;

function Nr(e) {
    Pt += e
}

function Uo(e) {
    return e.dynamicChildren = Pt > 0 ? me || ot : null, Ni(), Pt > 0 && me && me.push(e), e
}

function q(e, t, n, o, s, r) {
    return Uo(I(e, t, n, o, s, r, !0))
}

function rt(e, t, n, o, s) {
    return Uo(xe(e, t, n, o, s, !0))
}

function $i(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function bt(e, t) {
    return e.type === t.type && e.key === t.key
}
const vn = "__vInternal",
    jo = ({
        key: e
    }) => e ?? null,
    Wt = ({
        ref: e,
        ref_key: t,
        ref_for: n
    }) => (typeof e == "number" && (e = "" + e), e != null ? J(e) || W(e) || O(e) ? {
        i: ge,
        r: e,
        k: t,
        f: !!n
    } : e : null);

function I(e, t = null, n = null, o = 0, s = null, r = e === te ? 0 : 1, i = !1, l = !1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && jo(t),
        ref: t && Wt(t),
        scopeId: hn,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: r,
        patchFlag: o,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: ge
    };
    return l ? (ar(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= J(n) ? 8 : 16), Pt > 0 && !i && me && (c.patchFlag > 0 || r & 6) && c.patchFlag !== 32 && me.push(c), c
}
const xe = Li;

function Li(e, t = null, n = null, o = 0, s = null, r = !1) {
    if ((!e || e === ri) && (e = Xe), $i(e)) {
        const l = dt(e, t, !0);
        return n && ar(l, n), Pt > 0 && !r && me && (l.shapeFlag & 6 ? me[me.indexOf(e)] = l : me.push(l)), l.patchFlag |= -2, l
    }
    if (Ji(e) && (e = e.__vccOpts), t) {
        t = Bi(t);
        let {
            class: l,
            style: c
        } = t;
        l && !J(l) && (t.class = un(l)), j(c) && (mo(c) && !P(c) && (c = Z({}, c)), t.style = ln(c))
    }
    const i = J(e) ? 1 : oi(e) ? 128 : Mi(e) ? 64 : j(e) ? 4 : O(e) ? 2 : 0;
    return I(e, t, n, o, s, i, r, !0)
}

function Bi(e) {
    return e ? mo(e) || vn in e ? Z({}, e) : e : null
}

function dt(e, t, n = !1) {
    const {
        props: o,
        ref: s,
        patchFlag: r,
        children: i
    } = e, l = t ? Hi(o || {}, t) : o;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && jo(l),
        ref: t && t.ref ? n && s ? P(s) ? s.concat(Wt(t)) : [s, Wt(t)] : Wt(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== te ? r === -1 ? 16 : r | 16 : r,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && dt(e.ssContent),
        ssFallback: e.ssFallback && dt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}

function qi(e = " ", t = 0) {
    return xe(yn, null, e, t)
}

function ce(e = "", t = !1) {
    return t ? (M(), rt(Xe, null, e)) : xe(Xe, null, e)
}

function Ce(e) {
    return e == null || typeof e == "boolean" ? xe(Xe) : P(e) ? xe(te, null, e.slice()) : typeof e == "object" ? Ee(e) : xe(yn, null, String(e))
}

function Ee(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : dt(e)
}

function ar(e, t) {
    let n = 0;
    const {
        shapeFlag: o
    } = e;
    if (t == null) t = null;
    else if (P(t)) n = 16;
    else if (typeof t == "object")
        if (o & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1), ar(e, s()), s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = t._;
            !s && !(vn in t) ? t._ctx = ge : s === 3 && ge && (ge.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        }
    else O(t) ? (t = {
        default: t,
        _ctx: ge
    }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [qi(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function Hi(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const o = e[n];
        for (const s in o)
            if (s === "class") t.class !== o.class && (t.class = un([t.class, o.class]));
            else if (s === "style") t.style = ln([t.style, o.style]);
        else if (rn(s)) {
            const r = t[s],
                i = o[s];
            i && r !== i && !(P(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i)
        } else s !== "" && (t[s] = o[s])
    }
    return t
}

function _e(e, t, n, o = null) {
    ye(e, t, 7, [n, o])
}
const Ki = No();
let Ui = 0;

function ji(e, t, n) {
    const o = e.type,
        s = (t ? t.appContext : e.appContext) || Ki,
        r = {
            uid: Ui++,
            vnode: e,
            type: o,
            parent: t,
            appContext: s,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new ms(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(s.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Lo(o, s),
            emitsOptions: xo(o, s),
            emit: null,
            emitted: null,
            propsDefaults: U,
            inheritAttrs: o.inheritAttrs,
            ctx: U,
            data: U,
            props: U,
            attrs: U,
            slots: U,
            refs: U,
            setupState: U,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
    return r.ctx = {
        _: r
    }, r.root = t ? t.root : r, r.emit = Xs.bind(null, r), e.ce && e.ce(r), r
}
let re = null,
    cr, tt, $r = "__VUE_INSTANCE_SETTERS__";
(tt = $n()[$r]) || (tt = $n()[$r] = []), tt.push(e => re = e), cr = e => {
    tt.length > 1 ? tt.forEach(t => t(e)) : tt[0](e)
};
const pt = e => {
        cr(e), e.scope.on()
    },
    Je = () => {
        re && re.scope.off(), cr(null)
    };

function Go(e) {
    return e.vnode.shapeFlag & 4
}
let Ft = !1;

function Gi(e, t = !1) {
    Ft = t;
    const {
        props: n,
        children: o
    } = e.vnode, s = Go(e);
    ki(e, n, s, t), Pi(e, o);
    const r = s ? zi(e, t) : void 0;
    return Ft = !1, r
}

function zi(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = yo(new Proxy(e.ctx, yi));
    const {
        setup: o
    } = n;
    if (o) {
        const s = e.setupContext = o.length > 1 ? Wi(e) : null;
        pt(e), gt();
        const r = Me(o, e, 0, [e.props, s]);
        if (mt(), Je(), Zr(r)) {
            if (r.then(Je, Je), t) return r.then(i => {
                Lr(e, i, t)
            }).catch(i => {
                dn(i, e, 0)
            });
            e.asyncDep = r
        } else Lr(e, r, t)
    } else zo(e, t)
}

function Lr(e, t, n) {
    O(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : j(t) && (e.setupState = bo(t)), zo(e, n)
}
let Br;

function zo(e, t, n) {
    const o = e.type;
    if (!e.render) {
        if (!t && Br && !o.render) {
            const s = o.template || lr(e).template;
            if (s) {
                const {
                    isCustomElement: r,
                    compilerOptions: i
                } = e.appContext.config, {
                    delimiters: l,
                    compilerOptions: c
                } = o, p = Z(Z({
                    isCustomElement: r,
                    delimiters: l
                }, i), c);
                o.render = Br(s, p)
            }
        }
        e.render = o.render || Ae
    } {
        pt(e), gt();
        try {
            vi(e)
        } finally {
            mt(), Je()
        }
    }
}

function Vi(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
        get(t, n) {
            return ue(e, "get", "$attrs"), t[n]
        }
    }))
}

function Wi(e) {
    const t = n => {
        e.exposed = n || {}
    };
    return {
        get attrs() {
            return Vi(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}

function wn(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(bo(yo(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in At) return At[n](e)
        },
        has(t, n) {
            return n in t || n in At
        }
    }))
}

function Ji(e) {
    return O(e) && "__vccOpts" in e
}
const Qi = (e, t) => js(e, t, Ft),
    Xi = Symbol.for("v-scx"),
    Zi = () => Vt(Xi),
    Yi = "3.3.13",
    el = "http://www.w3.org/2000/svg",
    je = typeof document < "u" ? document : null,
    qr = je && je.createElement("template"),
    tl = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, o) => {
            const s = t ? je.createElementNS(el, e) : je.createElement(e, n ? {
                is: n
            } : void 0);
            return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s
        },
        createText: e => je.createTextNode(e),
        createComment: e => je.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => je.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, o, s, r) {
            const i = n ? n.previousSibling : t.lastChild;
            if (s && (s === r || s.nextSibling))
                for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)););
            else {
                qr.innerHTML = o ? `<svg>${e}</svg>` : e;
                const l = qr.content;
                if (o) {
                    const c = l.firstChild;
                    for (; c.firstChild;) l.appendChild(c.firstChild);
                    l.removeChild(c)
                }
                t.insertBefore(l, n)
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    },
    nl = Symbol("_vtc");

function rl(e, t, n) {
    const o = e[nl];
    o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
const ol = Symbol("_vod"),
    sl = Symbol("");

function il(e, t, n) {
    const o = e.style,
        s = J(n);
    if (n && !s) {
        if (t && !J(t))
            for (const r in t) n[r] == null && Wn(o, r, "");
        for (const r in n) Wn(o, r, n[r])
    } else {
        const r = o.display;
        if (s) {
            if (t !== n) {
                const i = o[sl];
                i && (n += ";" + i), o.cssText = n
            }
        } else t && e.removeAttribute("style");
        ol in e && (o.display = r)
    }
}
const Hr = /\s*!important$/;

function Wn(e, t, n) {
    if (P(n)) n.forEach(o => Wn(e, t, o));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
        const o = ll(e, t);
        Hr.test(n) ? e.setProperty(ht(o), n.replace(Hr, ""), "important") : e[o] = n
    }
}
const Kr = ["Webkit", "Moz", "ms"],
    On = {};

function ll(e, t) {
    const n = On[t];
    if (n) return n;
    let o = ct(t);
    if (o !== "filter" && o in e) return On[t] = o;
    o = to(o);
    for (let s = 0; s < Kr.length; s++) {
        const r = Kr[s] + o;
        if (r in e) return On[t] = r
    }
    return t
}
const Ur = "http://www.w3.org/1999/xlink";

function ul(e, t, n, o, s) {
    if (o && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(Ur, t.slice(6, t.length)) : e.setAttributeNS(Ur, t, n);
    else {
        const r = ps(t);
        n == null || r && !no(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n)
    }
}

function al(e, t, n, o, s, r, i) {
    if (t === "innerHTML" || t === "textContent") {
        o && i(o, s, r), e[t] = n ?? "";
        return
    }
    const l = e.tagName;
    if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
        e._value = n;
        const p = l === "OPTION" ? e.getAttribute("value") : e.value,
            m = n ?? "";
        p !== m && (e.value = m), n == null && e.removeAttribute(t);
        return
    }
    let c = !1;
    if (n === "" || n == null) {
        const p = typeof e[t];
        p === "boolean" ? n = no(n) : n == null && p === "string" ? (n = "", c = !0) : p === "number" && (n = 0, c = !0)
    }
    try {
        e[t] = n
    } catch {}
    c && e.removeAttribute(t)
}

function Ge(e, t, n, o) {
    e.addEventListener(t, n, o)
}

function cl(e, t, n, o) {
    e.removeEventListener(t, n, o)
}
const jr = Symbol("_vei");

function fl(e, t, n, o, s = null) {
    const r = e[jr] || (e[jr] = {}),
        i = r[t];
    if (o && i) i.value = o;
    else {
        const [l, c] = dl(t);
        if (o) {
            const p = r[t] = gl(o, s);
            Ge(e, l, p, c)
        } else i && (cl(e, l, i, c), r[t] = void 0)
    }
}
const Gr = /(?:Once|Passive|Capture)$/;

function dl(e) {
    let t;
    if (Gr.test(e)) {
        t = {};
        let o;
        for (; o = e.match(Gr);) e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : ht(e.slice(2)), t]
}
let En = 0;
const pl = Promise.resolve(),
    hl = () => En || (pl.then(() => En = 0), En = Date.now());

function gl(e, t) {
    const n = o => {
        if (!o._vts) o._vts = Date.now();
        else if (o._vts <= n.attached) return;
        ye(ml(o, n.value), t, 5, [o])
    };
    return n.value = e, n.attached = hl(), n
}

function ml(e, t) {
    if (P(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(o => s => !s._stopped && o && o(s))
    } else return t
}
const zr = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    yl = (e, t, n, o, s = !1, r, i, l, c) => {
        t === "class" ? rl(e, o, s) : t === "style" ? il(e, n, o) : rn(t) ? Qn(t) || fl(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : vl(e, t, o, s)) ? al(e, t, o, r, i, l, c) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), ul(e, t, o, s))
    };

function vl(e, t, n, o) {
    if (o) return !!(t === "innerHTML" || t === "textContent" || t in e && zr(t) && O(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
    if (t === "width" || t === "height") {
        const s = e.tagName;
        if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1
    }
    return zr(t) && J(n) ? !1 : t in e
}
const tn = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return P(t) ? n => jt(t, n) : t
};

function wl(e) {
    e.target.composing = !0
}

function Vr(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}
const ut = Symbol("_assign"),
    le = {
        created(e, {
            modifiers: {
                lazy: t,
                trim: n,
                number: o
            }
        }, s) {
            e[ut] = tn(s);
            const r = o || s.props && s.props.type === "number";
            Ge(e, t ? "change" : "input", i => {
                if (i.target.composing) return;
                let l = e.value;
                n && (l = l.trim()), r && (l = Qt(l)), e[ut](l)
            }), n && Ge(e, "change", () => {
                e.value = e.value.trim()
            }), t || (Ge(e, "compositionstart", wl), Ge(e, "compositionend", Vr), Ge(e, "change", Vr))
        },
        mounted(e, {
            value: t
        }) {
            e.value = t ?? ""
        },
        beforeUpdate(e, {
            value: t,
            modifiers: {
                lazy: n,
                trim: o,
                number: s
            }
        }, r) {
            if (e[ut] = tn(r), e.composing) return;
            const i = s || e.type === "number" ? Qt(e.value) : e.value,
                l = t ?? "";
            i !== l && (document.activeElement === e && e.type !== "range" && (n || o && e.value.trim() === l) || (e.value = l))
        }
    },
    Sn = {
        deep: !0,
        created(e, {
            value: t,
            modifiers: {
                number: n
            }
        }, o) {
            const s = on(t);
            Ge(e, "change", () => {
                const r = Array.prototype.filter.call(e.options, i => i.selected).map(i => n ? Qt(nn(i)) : nn(i));
                e[ut](e.multiple ? s ? new Set(r) : r : r[0])
            }), e[ut] = tn(o)
        },
        mounted(e, {
            value: t
        }) {
            Wr(e, t)
        },
        beforeUpdate(e, t, n) {
            e[ut] = tn(n)
        },
        updated(e, {
            value: t
        }) {
            Wr(e, t)
        }
    };

function Wr(e, t) {
    const n = e.multiple;
    if (!(n && !P(t) && !on(t))) {
        for (let o = 0, s = e.options.length; o < s; o++) {
            const r = e.options[o],
                i = nn(r);
            if (n) P(t) ? r.selected = gs(t, i) > -1 : r.selected = t.has(i);
            else if (an(nn(r), t)) {
                e.selectedIndex !== o && (e.selectedIndex = o);
                return
            }
        }!n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
    }
}

function nn(e) {
    return "_value" in e ? e._value : e.value
}
const bl = Z({
    patchProp: yl
}, tl);
let Jr;

function _l() {
    return Jr || (Jr = Oi(bl))
}
const Cl = (...e) => {
    const t = _l().createApp(...e),
        {
            mount: n
        } = t;
    return t.mount = o => {
        const s = Tl(o);
        if (!s) return;
        const r = t._component;
        !O(r) && !r.render && !r.template && (r.template = s.innerHTML), s.innerHTML = "";
        const i = n(s, !1, s instanceof SVGElement);
        return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i
    }, t
};

function Tl(e) {
    return J(e) ? document.querySelector(e) : e
}
let Vo = null;

function Wo() {
    return Vo
}

function Qr(e) {
    Vo = e
}
let Jo = 0;

function Al() {
    return Jo
}

function xl() {
    Jo++
}
let Qo = "";

function at() {
    return Qo
}

function Dn(e) {
    Qo = e
}
let Xo = "";

function kl() {
    return Xo
}

function Mn(e) {
    Xo = e
}
let Zo = "";

function nt() {
    return Zo
}

function Nn(e) {
    Zo = e
}
let Se = he("");
fetch("https://gist.githubusercontent.com/FormicAcidGD/905fadfeba69ca2e9df3aec099a3d8a6/raw/7ecdbd0744246f29b9296be1315b29c2b89c80e3/gistfile1.txt").then(e => {
    e.text().then(t => {
        Se.value = t
    })
});
async function Il() {
    return await (await fetch(Se.value + "/plans", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: at()
        }
    })).json()
}
async function Xr(e) {
    await fetch(Se.value + "/change", {
        method: "POST",
        body: JSON.stringify(e),
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: at()
        }
    })
}
async function Rl(e) {
    await fetch(Se.value + "/hide", {
        method: "POST",
        body: JSON.stringify(e),
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: at()
        }
    })
}
const Pl = ["selected"],
    Fl = ["selected"],
    Ol = ["selected"],
    El = ["selected"],
    Sl = ["selected"],
    Dl = ["selected"],
    Ml = ["selected"],
    Nl = ["selected"],
    $l = ["selected"],
    Ll = ["selected"],
    Bl = ["selected"],
    ql = ["selected"],
    Hl = ["selected"],
    Kl = ["selected"],
    Ul = ["selected"],
    jl = gn({
        __name: "Aircraft",
        props: {
            aircraft: {},
            type: {}
        },
        emits: {
            change: (e, t) => {
                let n = {
                    id: e.id,
                    roomSecret: at()
                };
                return t == "acft" && (n.type = e.type), t == "alt" && (n.altitude = e.altitude), t == "arriving" && (n.arriving = e.arriving), t == "callsign" && (n.callsign = e.callsign), t == "departing" && (n.departing = e.departing), t == "free" && (n.free = e.free), t == "gate" && (n.gate = e.gate), t == "route" && (n.route = e.route), t == "runway" && (n.runway = e.runway), t == "squawk" && (n.squawk = e.squawk), t == "status" && (n.status = e.status), console.log("Changed"), Xr(n), e
            }
        },
        setup(e, {
            emit: t
        }) {
            let n = he();
            he();

            function o() {
                confirm(`Hide "${s.aircraft.callsign}"?`) && (s.aircraft.hidden = !0, Rl({
                    id: s.aircraft.id,
                    roomSecret: at()
                }))
            }
            let s = e,
                r = he(s.aircraft),
                i = (m, a) => {
                    let d = {
                        id: m.id,
                        roomSecret: at()
                    };
                    return a == "acft" && (d.type = m.type), a == "alt" && (d.altitude = m.altitude), a == "arriving" && (d.arriving = m.arriving), a == "callsign" && (d.callsign = m.callsign), a == "departing" && (d.departing = m.departing), a == "free" && (d.free = m.free), a == "gate" && (d.gate = m.gate), a == "route" && (d.route = m.route), a == "runway" && (d.runway = m.runway), a == "squawk" && (d.squawk = m.squawk), a == "status" && (d.status = m.status), console.log("Changed"), Xr(d), m
                };

            function l(m) {
                Qr({
                    id: r.value.id,
                    selectionType: m
                })
            }

            function c(m) {
                let a = Wo();
                a != null && a.id == r.value.id && a.selectionType == m && Qr(null)
            }

            function p() {
                r.value.squawk == "r" && (r.value.squawk = `${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}`), i(r.value, "squawk")
            }
            return (m, a) => (M(), q("div", {
                class: un(["aircraft", m.type])
            }, [X(I("input", {
                type: "text",
                placeholder: "Callsign",
                class: "callsign",
                rows: "2",
                "onUpdate:modelValue": a[0] || (a[0] = d => g(r).callsign = d),
                onChange: a[1] || (a[1] = d => g(i)(g(r), "callsign")),
                onFocus: a[2] || (a[2] = d => l("callsign")),
                onBlur: a[3] || (a[3] = d => c("callsign")),
                onKeyup: a[4] || (a[4] = d => g(i)(g(r), "callsign"))
            }, null, 544), [
                [le, g(r).callsign]
            ]), X(I("input", {
                type: "text",
                placeholder: "Departing",
                class: "departing",
                "onUpdate:modelValue": a[5] || (a[5] = d => g(r).departing = d),
                onChange: a[6] || (a[6] = d => g(i)(g(r), "departing")),
                onFocus: a[7] || (a[7] = d => l("departing")),
                onBlur: a[8] || (a[8] = d => c("departing")),
                onKeyup: a[9] || (a[9] = d => g(i)(g(r), "departing"))
            }, null, 544), [
                [le, g(r).departing]
            ]), X(I("input", {
                type: "text",
                placeholder: "Arriving",
                class: "arriving",
                "onUpdate:modelValue": a[10] || (a[10] = d => g(r).arriving = d),
                onChange: a[11] || (a[11] = d => g(i)(g(r), "arriving")),
                onFocus: a[12] || (a[12] = d => l("arriving")),
                onBlur: a[13] || (a[13] = d => c("arriving")),
                onKeyup: a[14] || (a[14] = d => g(i)(g(r), "arriving"))
            }, null, 544), [
                [le, g(r).arriving]
            ]), X(I("input", {
                type: "text",
                placeholder: "Altitude",
                class: "altitude",
                "onUpdate:modelValue": a[15] || (a[15] = d => g(r).altitude = d),
                onChange: a[16] || (a[16] = d => g(i)(g(r), "alt")),
                onFocus: a[17] || (a[17] = d => l("alt")),
                onBlur: a[18] || (a[18] = d => c("alt")),
                onKeyup: a[19] || (a[19] = d => g(i)(g(r), "alt"))
            }, null, 544), [
                [le, g(r).altitude]
            ]), X(I("input", {
                type: "text",
                placeholder: "Gate",
                class: "gate",
                "onUpdate:modelValue": a[20] || (a[20] = d => g(r).gate = d),
                onChange: a[21] || (a[21] = d => g(i)(g(r), "gate")),
                onFocus: a[22] || (a[22] = d => l("gate")),
                onBlur: a[23] || (a[23] = d => c("gate")),
                onKeyup: a[24] || (a[24] = d => g(i)(g(r), "gate"))
            }, null, 544), [
                [le, g(r).gate]
            ]), X(I("input", {
                type: "text",
                placeholder: "Squawk",
                ref_key: "squawk",
                ref: n,
                class: "squawk",
                "onUpdate:modelValue": a[25] || (a[25] = d => g(r).squawk = d),
                onChange: p,
                onFocus: a[26] || (a[26] = d => l("squawk")),
                onBlur: a[27] || (a[27] = d => c("squawk")),
                onKeyup: p
            }, null, 544), [
                [le, g(r).squawk]
            ]), X(I("input", {
                type: "text",
                placeholder: "Aircraft",
                class: "type",
                "onUpdate:modelValue": a[28] || (a[28] = d => g(r).type = d),
                onChange: a[29] || (a[29] = d => g(i)(g(r), "acft")),
                onFocus: a[30] || (a[30] = d => l("acft")),
                onBlur: a[31] || (a[31] = d => c("acft")),
                onKeyup: a[32] || (a[32] = d => g(i)(g(r), "acft"))
            }, null, 544), [
                [le, g(r).type]
            ]), g(s).type == "outbound" ? X((M(), q("select", {
                key: 0,
                class: "status",
                onChange: a[33] || (a[33] = d => g(i)(g(r), "status")),
                onFocus: a[34] || (a[34] = d => l("status")),
                onBlur: a[35] || (a[35] = d => c("status")),
                "onUpdate:modelValue": a[36] || (a[36] = d => g(r).status = d)
            }, [I("option", {
                selected: g(r).status == "PARKED"
            }, "PARKED", 8, Pl), I("option", {
                selected: g(r).status == "CLEARED"
            }, "CLEARED", 8, Fl), I("option", {
                selected: g(r).status == "PUSH"
            }, "PUSH", 8, Ol), I("option", {
                selected: g(r).status == "TAXI"
            }, "TAXI", 8, El), I("option", {
                selected: g(r).status == "LINEUP"
            }, "LINEUP", 8, Sl), I("option", {
                selected: g(r).status == "TAKEOFF"
            }, "TAKEOFF", 8, Dl)], 544)), [
                [Sn, g(r).status]
            ]) : ce("", !0), g(s).type == "inbound" ? X((M(), q("select", {
                key: 1,
                class: "status",
                onChange: a[37] || (a[37] = d => g(i)(g(r), "status")),
                onFocus: a[38] || (a[38] = d => l("status")),
                onBlur: a[39] || (a[39] = d => c("status")),
                "onUpdate:modelValue": a[40] || (a[40] = d => g(r).status = d)
            }, [I("option", {
                selected: g(r).status == "LANDING"
            }, "LANDING", 8, Ml), I("option", {
                selected: g(r).status == "TAXI"
            }, "TAXI", 8, Nl), I("option", {
                selected: g(r).status == "PARKED"
            }, "PARKED", 8, $l)], 544)), [
                [Sn, g(r).status]
            ]) : ce("", !0), g(s).type == "vfr" ? X((M(), q("select", {
                key: 2,
                class: "status",
                onChange: a[41] || (a[41] = d => g(i)(g(r), "status")),
                onFocus: a[42] || (a[42] = d => l("status")),
                onBlur: a[43] || (a[43] = d => c("status")),
                "onUpdate:modelValue": a[44] || (a[44] = d => g(r).status = d)
            }, [I("option", {
                selected: g(r).status == "PARKED"
            }, "PARKED", 8, Ll), I("option", {
                selected: g(r).status == "TAXI"
            }, "TAXI", 8, Bl), I("option", {
                selected: g(r).status == "LEFT CIRCUIT"
            }, "LEFT CIRCUIT", 8, ql), I("option", {
                selected: g(r).status == "RIGHT CIRCUIT"
            }, "RIGHT CIRCUIT", 8, Hl), I("option", {
                selected: g(r).status == "VFR"
            }, "VFR", 8, Kl), I("option", {
                selected: g(r).status == "LANDING"
            }, "LANDING", 8, Ul)], 544)), [
                [Sn, g(r).status]
            ]) : ce("", !0), X(I("input", {
                type: "text",
                placeholder: "Route",
                class: "route",
                "onUpdate:modelValue": a[45] || (a[45] = d => g(r).route = d),
                onChange: a[46] || (a[46] = d => g(i)(g(r), "route")),
                onFocus: a[47] || (a[47] = d => l("route")),
                onBlur: a[48] || (a[48] = d => c("route")),
                onKeyup: a[49] || (a[49] = d => g(i)(g(r), "route"))
            }, null, 544), [
                [le, g(r).route]
            ]), m.type != "overflying" ? X((M(), q("input", {
                key: 3,
                type: "text",
                placeholder: "Runway",
                class: "runway",
                "onUpdate:modelValue": a[50] || (a[50] = d => g(r).runway = d),
                onChange: a[51] || (a[51] = d => g(i)(g(r), "runway")),
                onFocus: a[52] || (a[52] = d => l("runway")),
                onBlur: a[53] || (a[53] = d => c("runway")),
                onKeyup: a[54] || (a[54] = d => g(i)(g(r), "runway"))
            }, null, 544)), [
                [le, g(r).runway]
            ]) : ce("", !0), X(I("input", {
                type: "text",
                placeholder: "Free Text",
                class: "free",
                "onUpdate:modelValue": a[55] || (a[55] = d => g(r).free = d),
                onChange: a[56] || (a[56] = d => g(i)(g(r), "free")),
                onFocus: a[57] || (a[57] = d => l("free")),
                onBlur: a[58] || (a[58] = d => c("free")),
                onKeyup: a[59] || (a[59] = d => g(i)(g(r), "free"))
            }, null, 544), [
                [le, g(r).free]
            ]), I("button", {
                class: "delete",
                onClick: o
            }, "Hide")], 2))
        }
    }),
    bn = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [o, s] of t) n[o] = s;
        return n
    },
    Kt = bn(jl, [
        ["__scopeId", "data-v-696b19e3"]
    ]),
    _n = e => (ko("data-v-d900223e"), e = e(), Io(), e),
    Gl = {
        class: "id"
    },
    zl = {
        class: "all"
    },
    Vl = {
        class: "acftList"
    },
    Wl = _n(() => I("h1", null, "Arriving", -1)),
    Jl = {
        class: "list"
    },
    Ql = {
        class: "acft"
    },
    Xl = {
        class: "acftList"
    },
    Zl = _n(() => I("h1", null, "Departing", -1)),
    Yl = {
        class: "list"
    },
    eu = {
        class: "acft"
    },
    tu = {
        class: "acftList"
    },
    nu = _n(() => I("h1", null, "VFR", -1)),
    ru = {
        class: "list"
    },
    ou = {
        class: "acft"
    },
    su = {
        class: "acftList"
    },
    iu = _n(() => I("h1", null, "Other Traffic", -1)),
    lu = {
        class: "list"
    },
    uu = {
        class: "acft"
    },
    au = gn({
        __name: "List",
        setup(e) {
            let t = he([]);
            async function n() {
                (await Il()).forEach(s => {
                    let r = t.value.find(i => i.id == s.id);
                    if (r == null) Al() < 1 ? t.value.push(s) : (t.value.splice(0, 0, s), location.reload());
                    else {
                        let i = Wo() ?? {
                                id: -15,
                                selectionType: "acft"
                            },
                            l = t.value.indexOf(r);
                        r.altitude != s.altitude && !(i.selectionType == "alt" && i.id == s.id) && (t.value[l].altitude = s.altitude), r.arriving != s.arriving && !(i.selectionType == "arriving" && i.id == s.id) && (t.value[l].arriving = s.arriving), r.callsign != s.callsign && !(i.selectionType == "callsign" && i.id == s.id) && (t.value[l].callsign = s.callsign), r.departing != s.departing && !(i.selectionType == "departing" && i.id == s.id) && (t.value[l].departing = s.departing), r.free != s.free && !(i.selectionType == "free" && i.id == s.id) && (t.value[l].free = s.free), r.gate != s.gate && !(i.selectionType == "gate" && i.id == s.id) && (t.value[l].gate = s.gate), r.route != s.route && !(i.selectionType == "route" && i.id == s.id) && (t.value[l].route = s.route), r.runway != s.runway && !(i.selectionType == "runway" && i.id == s.id) && (t.value[l].runway = s.runway), r.squawk != s.squawk && !(i.selectionType == "squawk" && i.id == s.id) && (t.value[l].squawk = s.squawk), r.status != s.status && !(i.selectionType == "status" && i.id == s.id) && (t.value[l].status = s.status), r.type != s.type && !(i.selectionType == "acft" && i.id == s.id) && (t.value[l].type = s.type), r.hidden != s.hidden && (t.value[l].hidden = s.hidden)
                    }
                }), xl()
            }
            return setInterval(n, 1e3), n(), (o, s) => (M(), q(te, null, [I("p", Gl, "Room ID: " + ze(g(kl)()), 1), I("div", zl, [I("div", Vl, [Wl, I("div", Jl, [(M(!0), q(te, null, Ct(g(t), (r, i) => (M(), q("div", Ql, [r.arriving == g(nt)() && r.flightRules == "IFR" && !r.hidden ? (M(), rt(Kt, {
                key: 0,
                aircraft: r,
                type: "inbound"
            }, null, 8, ["aircraft"])) : ce("", !0)]))), 256))])]), I("div", Xl, [Zl, I("div", Yl, [(M(!0), q(te, null, Ct(g(t), (r, i) => (M(), q("div", eu, [r.departing == g(nt)() && r.flightRules == "IFR" && !r.hidden ? (M(), rt(Kt, {
                key: 0,
                aircraft: r,
                type: "outbound"
            }, null, 8, ["aircraft"])) : ce("", !0)]))), 256))])]), I("div", tu, [nu, I("div", ru, [(M(!0), q(te, null, Ct(g(t), (r, i) => (M(), q("div", ou, [(r.departing == g(nt)() || r.arriving == g(nt)()) && r.flightRules == "VFR" && !r.hidden ? (M(), rt(Kt, {
                key: 0,
                aircraft: r,
                type: "vfr"
            }, null, 8, ["aircraft"])) : ce("", !0)]))), 256))])]), I("div", su, [iu, I("div", lu, [(M(!0), q(te, null, Ct(g(t), (r, i) => (M(), q("div", uu, [r.departing != g(nt)() && r.arriving != g(nt)() && !r.hidden ? (M(), rt(Kt, {
                key: 0,
                aircraft: r,
                type: "overflying"
            }, null, 8, ["aircraft"])) : ce("", !0)]))), 256))])])])], 64))
        }
    }),
    cu = bn(au, [
        ["__scopeId", "data-v-d900223e"]
    ]);
let fu = {
        IGAR: "Air Base Garry",
        IJAF: "Al Najaf",
        IBAR: "Barra Airport",
        IBLT: "Boltic Airfield",
        IRFD: "Greater Rockford",
        IGRV: "Grindavik Airport",
        IHEN: "Henstridge Airfield",
        IZOL: "Izolirani Intl.",
        ILAR: "Larnaca Intl.",
        ILKL: "Lukla Airport",
        IMLR: "Mellor Intl.",
        IPAP: "Paphos Intl.",
        IPPH: "Perth Intl.",
        ISCM: "RAF Scampton",
        IDCS: "Saba Airport",
        IBTH: "Saint Barthelemy",
        ISAU: "Sauthemptona Airport",
        ISKP: "Skopelos Airfield",
        ITKO: "Tokyo Intl.",
        ITRC: "Training Centre"
    },
    du = Object.keys(fu);
const pu = ["placeholder"],
    hu = {
        key: 0
    },
    gu = ["onClick"],
    mu = {
        key: 0
    },
    yu = {
        key: 0,
        class: "arrowed"
    },
    vu = {
        key: 1
    },
    wu = {
        key: 1
    },
    bu = {
        key: 0,
        class: "arrowed"
    },
    _u = {
        key: 1
    },
    Cu = gn({
        __name: "SearchField",
        props: {
            placeholder: {},
            items: {},
            value: {},
            displayText: {
                type: Function
            },
            filter: {
                type: Function
            },
            width: {}
        },
        emits: {
            change: e => e
        },
        setup(e, {
            emit: t
        }) {
            let n = e,
                o = t,
                s = he(n.items),
                r = he(n.value ?? ""),
                i = he(!1),
                l = he(!1),
                c = he(0);
            n.value != null && p();

            function p() {
                n.filter ? s.value = n.items.filter(n.filter) : s.value = n.items.filter(d => d.toLowerCase().includes(r.value.toLowerCase())), s.value.length != 0 && (c.value = c.value % s.value.length)
            }

            function m(d) {
                i.value = !1, l.value = !1, r.value = d, p(), o("change", r.value)
            }

            function a(d) {
                if (i.value) switch (d.code) {
                    case "ArrowUp":
                        if (s.value.length == 0) return;
                        c.value = (c.value - 1 + s.value.length) % s.value.length;
                        break;
                    case "ArrowDown":
                        if (s.value.length == 0) return;
                        c.value = (c.value + 1) % s.value.length;
                        break;
                    case "Enter":
                    case "Tab":
                        if (s.value.length == 0) return;
                        m(s.value[c.value]);
                        break
                }
            }
            return Eo(() => {
                window.addEventListener("keydown", a)
            }), So(() => {
                window.removeEventListener("keydown", a)
            }), (d, R) => (M(), q("div", null, [X(I("input", {
                type: "text",
                "onUpdate:modelValue": R[0] || (R[0] = N => W(r) ? r.value = N : r = N),
                onInput: p,
                placeholder: g(n).placeholder,
                onFocus: R[1] || (R[1] = N => {
                    W(i) ? i.value = !0 : i = !0, N.target.select()
                }),
                onBlur: R[2] || (R[2] = N => W(i) ? i.value = !1 : i = !1)
            }, null, 40, pu), [
                [le, g(r)]
            ]), g(i) || g(l) ? (M(), q("ul", hu, [(M(!0), q(te, null, Ct(g(s), (N, S) => (M(), q("li", {
                key: N,
                onClick: z => m(N),
                onMouseover: R[3] || (R[3] = z => W(l) ? l.value = !0 : l = !0),
                onMouseleave: R[4] || (R[4] = z => W(l) ? l.value = !1 : l = !1),
                style: ln({
                    width: d.width != null ? `${d.width}vw` : "inherit"
                })
            }, [d.displayText != null ? (M(), q("div", mu, [S == g(c) ? (M(), q("p", yu, ze(d.displayText(N)), 1)) : (M(), q("p", vu, ze(d.displayText(N)), 1))])) : (M(), q("div", wu, [S == g(c) ? (M(), q("p", bu, ze(N), 1)) : (M(), q("p", _u, ze(N), 1))]))], 44, gu))), 128))])) : ce("", !0)]))
        }
    }),
    Tu = bn(Cu, [
        ["__scopeId", "data-v-e03fc676"]
    ]);

function Au() {
    return Yo("IGAR")
}

function xu() {
    return [{
        code: "IGAR",
        friendlyName: "Air Base Garry",
        groundCallsign: "",
        towerCallsigns: ["Garry Approach", "Garry Director", "Garry Radar", "Garry Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.800",
        defaultGroundFrequency: "",
        maxAcft: "N/A",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Rockford/Air%20Base%20Garry"
        }]
    }, {
        code: "IJAF",
        friendlyName: "Al Najaf",
        groundCallsign: "",
        towerCallsigns: ["Al Najaf Approach", "Al Najaf Director", "Al Najaf Radar", "Al Najaf Tower"],
        hasGround: !1,
        defaultTowerFrequency: "119.1",
        defaultGroundFrequency: "",
        maxAcft: "CRJ7/Q400",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Izolirani/AL%20Najaf"
        }, {
            author: "EzyDubbs",
            link: "https://drive.google.com/file/d/1USL62H5M-TlF_Gk1erRGuNkBhQYuDqup/view"
        }, {
            author: "Midwest Avgeek",
            link: "https://docs.google.com/document/d/1AAVgOdVWRAq070j-ExKGqF0lbdd2R4lzb-O3G9ISoy4/edit"
        }]
    }, {
        code: "IBAR",
        friendlyName: "Barra Airport",
        groundCallsign: "",
        towerCallsigns: ["Barra Approach", "Barra Director", "Barra Radar", "Barra Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.080",
        defaultGroundFrequency: "",
        maxAcft: "SF50/DHC6",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Cyprus/Barra"
        }, {
            author: "userwastaken, din0_nuggies21",
            link: "https://docs.google.com/document/d/1wazg7w22DMyvJdu869_BnNwvA0aR6naw9y0kKw3sNO4/edit"
        }, {
            author: "Sander",
            link: "https://cdn.discordapp.com/attachments/876914987715686440/888806599844593745/EGPR_CHARTS.pdf"
        }]
    }, {
        code: "IBLT",
        friendlyName: "Boltic Airfield",
        groundCallsign: "",
        towerCallsigns: ["Boltic Approach", "Boltic Director", "Boltic Radar", "Boltic Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.430",
        defaultGroundFrequency: "",
        maxAcft: "SF50/DHC6",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Rockford/Boltic%20Airfield"
        }]
    }, {
        code: "IRFD",
        friendlyName: "Greater Rockford",
        groundCallsign: "Rockford Ground",
        towerCallsigns: ["Chicago Centre", "Rockford Approach", "Rockford Centre", "Rockford Control", "Rockford Director", "Rockford Radar", "Rockford Tower"],
        hasGround: !0,
        defaultTowerFrequency: "124.850",
        defaultGroundFrequency: "120.400",
        maxAcft: "N/A",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Rockford/Greater%20Rockford"
        }, {
            author: "sanderli25",
            link: "https://drive.google.com/file/d/1I-oucFK61M6QdSFdEPYWQ3P9dRZ8D7Jl/view"
        }, {
            author: "Nikita39Gamer",
            link: "https://drive.google.com/file/d/1Kg7IaeCuovKrtfTduSCsmhsjWTiFDSV_/view"
        }, {
            author: "makiwasmyidea",
            link: "https://docs.google.com/document/d/1pOfIhQ9z6HSgFNjIMryd_FWwF_FgkAPvhK5xerOBex4/edit"
        }, {
            author: "DarthD3NN15",
            link: "https://docs.google.com/presentation/d/1kc8pIQMEukO_meQ05yavOX1EFDbLqJTyxv5jA9p-m3s/edit#slide=id.g1f43ba55dbd_0_131"
        }, {
            author: "userwastaken",
            link: "https://docs.google.com/document/d/1AR-TLLS1S5H0SjDFCsiWKKQ4HTi87JUkU80ij4i-wPc/edit#heading=h.hev5tuk6ocb6"
        }, {
            author: "Eastern",
            link: "https://docs.google.com/presentation/d/1mKn1mwti1rA8t6xXGBXQxVmVycgxuUWWLaaHpiJg-d4/edit#slide=id.g1111f78b68b_0_154"
        }, {
            author: "Aloha516",
            link: "https://drive.google.com/file/d/14L3ZEegJfXIli1xn_QBIyJeTQPurHTr0/view"
        }, {
            author: "EzyDubbs",
            link: "https://drive.google.com/file/d/13WTsIv4FbnUhUoDJzXyw1ZV3_fGqbjBF/view"
        }]
    }, {
        code: "IGRV",
        friendlyName: "Grindavik Airport",
        groundCallsign: "",
        towerCallsigns: ["Keflavik Centre", "Grindavik Approach", "Grindavik Centre", "Grindavik Control", "Grindavik Director", "Grindavik Radar", "Grindavik Tower"],
        hasGround: !1,
        defaultTowerFrequency: "126.750",
        defaultGroundFrequency: "",
        maxAcft: "B787/A350/MD11",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Grindavik/Grindavik"
        }, {
            author: "sander25",
            link: "https://cdn.discordapp.com/attachments/876914987715686440/888886462848831508/UGDK_CHARTS.pdf"
        }, {
            author: "EzyDubbs",
            link: "https://drive.google.com/file/d/1FWfJotQk2yKI03Kg43M5RQlzisdlDEql/view"
        }, {
            author: "ATC24MobileMaster, Pro_Gamer7089",
            link: "https://drive.google.com/file/d/1WNxb-d3gxIqPhtncoM3hDbALfMfuIdDS/view"
        }, {
            author: "nova_av",
            link: "https://drive.google.com/file/d/1G4M1CGxjXO688x-l7WBnD8UfhiLq2yrB/view"
        }]
    }, {
        code: "IHEN",
        friendlyName: "Henstridge Airfield",
        groundCallsign: "",
        towerCallsigns: ["Henstridge Approach", "Henstridge Director", "Henstridge Radar", "Henstridge Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.200",
        defaultGroundFrequency: "",
        maxAcft: "SF50/DHC6",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Cyprus/Henstridge"
        }]
    }, {
        code: "IZOL",
        friendlyName: "Izolirani Intl.",
        groundCallsign: "Izolirani Ground",
        towerCallsigns: ["Norsom Centre", "Izolirani Approach", "Izolirani Centre", "Izolirani Control", "Izolirani Director", "Izolirani Radar", "Izolirani Tower"],
        hasGround: !0,
        defaultTowerFrequency: "124.640",
        defaultGroundFrequency: "121.900",
        maxAcft: "N/A",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Izolirani/Izolirani"
        }, {
            author: "sanderli25",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Izolirani/Izolirani"
        }, {
            author: "userwastaken",
            link: "https://docs.google.com/document/d/1WGSfuBNWxn4WxVBtEFF3ZYboNIh21Fcqrm9AtSXnq_4/edit#heading=h.ydxas8subl85"
        }, {
            author: "Midwest Avgeek",
            link: "https://docs.google.com/document/d/19f9w2uE7vqwLBLlbKrfc8_NZlEcDr4I34SKGN0dfub0/edit"
        }]
    }, {
        code: "ILAR",
        friendlyName: "Larnaca Intl.",
        groundCallsign: "Larnaca Ground",
        towerCallsigns: ["Lazarus Centre", "Larnaca Approach", "Larnaca Centre", "Larnaca Control", "Larnaca Director", "Larnaca Radar", "Larnaca Tower"],
        hasGround: !0,
        defaultTowerFrequency: "126.300",
        defaultGroundFrequency: "119.400",
        maxAcft: "N/A",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Cyprus/Larnaca"
        }, {
            author: "Aloha516",
            link: "https://docs.google.com/document/d/1Hat4-PSwd9L0tWKaofTEQH-egoJLw7pzvgCo2RHO0cE/edit"
        }, {
            author: "makiwasmyidea",
            link: "https://docs.google.com/document/d/11Wvou24H_RgUIn5VwJoQ5w4tnE5JZbtYTTbkuRDvtHk/edit"
        }, {
            author: "userwastaken, Nikita39Gamer",
            link: "https://docs.google.com/document/d/1DXI4DGpc2UMl7bHrPygf3_oHAZ68UDe5X4boa2teIw8/edit"
        }, {
            author: "greek_dutchman",
            link: "https://docs.google.com/document/d/1i9q2jla0cXq6Vq-IkLihjkzqu-s3Q1e_EyPWAo3mxso/edit"
        }]
    }, {
        code: "ILKL",
        friendlyName: "Lukla Airport",
        groundCallsign: "",
        towerCallsigns: ["Lukla Approach", "Lukla Director", "Lukla Radar", "Lukla Tower"],
        hasGround: !1,
        defaultTowerFrequency: "120.150",
        defaultGroundFrequency: "",
        maxAcft: "LJ45/DHC6",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Perth/Lukla"
        }]
    }, {
        code: "IMLR",
        friendlyName: "Mellor",
        groundCallsign: "",
        towerCallsigns: ["Mellor Approach", "Mellor Director", "Mellor Radar", "Mellor Tower"],
        hasGround: !1,
        defaultTowerFrequency: "133.850",
        defaultGroundFrequency: "",
        maxAcft: "B787/A350/MD11",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Rockford/Mellor"
        }, {
            author: "EzyDubbs",
            link: "https://drive.google.com/file/d/1u0f6131yt_nA83RYKm5cy6f1SzfOOxTu/view"
        }, {
            author: "DarthD3NN15",
            link: "https://docs.google.com/presentation/d/1s72z-fRBtVsDE4fGcTyIMWNbrVF7_i9ja8K4PDA1MWc/edit#slide=id.p"
        }, {
            author: "SQD_Yeet, sanderli25",
            link: "https://docs.google.com/presentation/d/1OVEz2Zq1MzEr9_kDXYxo_t82d-bHchD_MJXi38d8IWk/edit#slide=id.gc6f90357f_0_0"
        }, {
            author: "Jeffersen",
            link: "https://formicacidgd.github.io/atisgen/IMLR_Chart_Jeffersen.png"
        }]
    }, {
        code: "IPAP",
        friendlyName: "Paphos",
        groundCallsign: "",
        towerCallsigns: ["Paphos Approach", "Paphos Director", "Paphos Radar", "Paphos Tower"],
        hasGround: !1,
        defaultTowerFrequency: "119.900",
        defaultGroundFrequency: "",
        maxAcft: "B787/A350/MD11",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Cyprus/Paphos"
        }, {
            author: "sanderli25",
            link: "https://drive.google.com/file/d/1feK0t-bD79o5PJTPlOhfe_0agf83xt9y/view"
        }, {
            author: "playevator",
            link: "https://docs.google.com/presentation/d/1OTeilcBnK6c5MJuhMTcBu03cauV5dKokGkAsrGdD3sg/edit#slide=id.g23c6c35c134_1_0"
        }, {
            author: "sweet_kid",
            link: "https://drive.google.com/file/d/1Ckwrvr93OBZxEfpSwTzc75ALkCmjqsqr/view"
        }]
    }, {
        code: "IPPH",
        friendlyName: "Perth",
        groundCallsign: "Perth Ground",
        towerCallsigns: ["Perth Approach", "Perth Centre", "Perth Control", "Perth Director", "Perth Radar", "Perth Tower"],
        hasGround: !0,
        defaultTowerFrequency: "135.250",
        defaultGroundFrequency: "121.700",
        maxAcft: "N/A",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Perth/Perth"
        }, {
            author: "Natto, userwastaken, Nikita39Gamer",
            link: "https://docs.google.com/document/d/1sEOREpJL5TCAs7tejRn2Fm02Ai4IZV5uolC9cX65x3c/edit"
        }]
    }, {
        code: "ISCM",
        friendlyName: "RAF Scampton",
        groundCallsign: "",
        towerCallsigns: ["Scampton Approach", "Scampton Director", "Scampton Radar", "Scampton Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.220",
        defaultGroundFrequency: "",
        maxAcft: "N/A",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Izolirani/RAF%20Scampton"
        }]
    }, {
        code: "IDCS",
        friendlyName: "Saba Airport",
        groundCallsign: "",
        towerCallsigns: ["Saba Approach", "Saba Director", "Saba Radar", "Saba Tower"],
        hasGround: !1,
        defaultTowerFrequency: "122.500",
        defaultGroundFrequency: "",
        maxAcft: "SF50/DHC6",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Orenji/Saba"
        }, {
            author: "MR. GEARZ",
            link: "https://docs.google.com/document/d/17-uqDqJ1YzxvZDwtlduM8hGdPH-kCNxoDxdfBHoOhzE/edit"
        }]
    }, {
        code: "IBTH",
        friendlyName: "Saint Barthelemy",
        groundCallsign: "",
        towerCallsigns: ["Sotaf Centre", "Saint Barthelemy Approach", "Saint Barthelemy Centre", "Saint Barthelemy Control", "Saint Barthelemy Director", "Saint Barthelemy Radar", "Saint Barthelemy Tower"],
        hasGround: !1,
        defaultTowerFrequency: "128.600",
        defaultGroundFrequency: "",
        maxAcft: "CRJ7/Q400",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts"
        }, {
            author: "sweet_kid",
            link: "https://drive.google.com/file/d/1OSWgKHBnu8ch3sP68erv8_nVcAFIY7CQ/view"
        }, {
            author: "playevator",
            link: "https://drive.google.com/file/d/1OakBVh551I5OmqO05KdEFAF9LcjscaGs/view"
        }, {
            author: "snowfrfr",
            link: "https://docs.google.com/presentation/d/1qJjS4HnvnP1u0j6ESnOqb-sGJIO_B0jFh1h10vsFWv0/edit#slide=id.p"
        }, {
            author: "Sander25",
            link: "https://cdn.discordapp.com/attachments/876914987715686440/904124376457310228/IBTH_CHARTS.pdf"
        }]
    }, {
        code: "ISAU",
        friendlyName: "Sauthemptona Airport",
        groundCallsign: "",
        towerCallsigns: ["Brighton Centre", "Sauthemptona Approach", "Sauthemptona Centre", "Sauthemptona Control", "Sauthemptona Director", "Sauthemptona Radar", "Sauthemptona Tower"],
        hasGround: !1,
        defaultTowerFrequency: "127.820",
        defaultGroundFrequency: "",
        maxAcft: "A320/B737/MD90",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Sauthemptona/Sauthemptona"
        }, {
            author: "Aloha516",
            link: "https://drive.google.com/file/d/11_ioZKaEt2Un1oyKa1R6WZ4hUjUFk7VL/view"
        }, {
            author: "userwastaken, Nikita39Gamer",
            link: "https://docs.google.com/document/d/1iRG8S9p2bq99rgnofHK6_r0jtJqgXc1bj13W0IaBSzc/edit#heading=h.hev5tuk6ocb6"
        }]
    }, {
        code: "ISKP",
        friendlyName: "Skopelos Airfield",
        groundCallsign: "",
        towerCallsigns: ["Skopelos Approach", "Skopelos Centre", "Skopelos Control", "Skopelos Director", "Skopelos Radar", "Skopelos Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.400",
        defaultGroundFrequency: "",
        maxAcft: "SF50/DHC6",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Skopelos/Skopelos%20Airfield"
        }]
    }, {
        code: "ITKO",
        friendlyName: "Tokyo",
        groundCallsign: "Tokyo Ground",
        towerCallsigns: ["Tokyo Approach", "Tokyo Centre", "Tokyo Control", "Tokyo Director", "Tokyo Radar", "Tokyo Tower"],
        hasGround: !0,
        defaultTowerFrequency: "132.300",
        defaultGroundFrequency: "118.225",
        maxAcft: "N/A",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Orenji/Tokyo"
        }, {
            author: "Nikita39Gamer",
            link: "https://docs.google.com/document/d/1VZPegMnzg2cmiysxUPK3TeWvPqzk4RysnvHYmJJ47pM/edit"
        }, {
            author: "GA4RIE1",
            link: "https://docs.google.com/document/d/1NjssUTQnlHVQiZciry656h5ZBu2xW7lJu2Q2L5G90CU/edit"
        }, {
            author: "SQD_YEET",
            link: "https://docs.google.com/presentation/d/1PPpJoNXSOLL5DUMBSexPGDbDskA2nMkrPglJ35szKF4/edit#slide=id.gc6f90357f_0_0"
        }]
    }, {
        code: "ITRC",
        friendlyName: "Training Centre",
        groundCallsign: "",
        towerCallsigns: ["Training Centre Approach", "Training Centre Director", "Training Centre Radar", "Training Centre Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.500",
        defaultGroundFrequency: "",
        maxAcft: "C172",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Rockford/Training%20Center"
        }, {
            author: "DarthD3NN15",
            link: "https://docs.google.com/presentation/d/1gNU9XNr-D6ioJBg1Ndia6nUuzP01G6cSnFoRoWM8DF8/edit#slide=id.p"
        }]
    }]
}

function Yo(e) {
    let t = !1,
        n = null;
    return xu().forEach(o => {
        t || o.code == e && (n = o, t = !0)
    }), n ?? Au()
}
const es = e => (ko("data-v-2787a22a"), e = e(), Io(), e),
    ku = {
        key: 0,
        class: "rooms"
    },
    Iu = {
        class: "login"
    },
    Ru = es(() => I("h1", null, "Create Room", -1)),
    Pu = {
        key: 0
    },
    Fu = {
        class: "create"
    },
    Ou = es(() => I("h1", null, "Join Room", -1)),
    Eu = {
        key: 0
    },
    Su = gn({
        __name: "App",
        setup(e) {
            let t = he(!1),
                n = fn({
                    password: "",
                    password2: "",
                    id: "",
                    status1: "",
                    status2: "",
                    airport: ""
                });

            function o() {
                if (n.airport == "") {
                    n.status1 = "You need to provide an Airport";
                    return
                }
                fetch(Se.value + "/createRoom", {
                    method: "POST",
                    body: JSON.stringify({
                        airport: n.airport,
                        password: n.password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }).then(r => {
                    r.status == 200 && r.json().then(i => {
                        Dn(i.secret), Nn(i.airport), Mn(i.id), window.location.href = `/fsm/?secret=${i.secret}`
                    })
                })
            }

            function s() {
                fetch(Se.value + "/loginRoom", {
                    method: "POST",
                    body: JSON.stringify({
                        id: n.id,
                        password: n.password2
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }).then(r => {
                    r.status == 200 ? r.json().then(i => {
                        Dn(i.secret), Nn(i.airport), Mn(i.id), window.location.href = `/fsm/?secret=${i.secret}`
                    }) : n.status2 = "Incorrect Room ID or Password"
                })
            }
            return Gt(Se, () => {
                let r = new URLSearchParams(document.location.search).get("secret");
                r != null && fetch(Se.value + "/check", {
                    method: "POST",
                    body: JSON.stringify({
                        roomSecret: r
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }).then(i => {
                    i.status == 200 ? i.json().then(l => {
                        t.value = !0, Dn(l.secret), Nn(l.airport), Mn(l.id)
                    }) : t.value = !1
                })
            }), (r, i) => (M(), q(te, null, [g(t) ? ce("", !0) : (M(), q("div", ku, [I("div", Iu, [Ru, xe(Tu, {
                placeholder: "Airport",
                "display-text": l => g(Yo)(l).friendlyName,
                items: g(du),
                onChange: i[0] || (i[0] = l => g(n).airport = l)
            }, null, 8, ["display-text", "items"]), X(I("input", {
                type: "password",
                "onUpdate:modelValue": i[1] || (i[1] = l => g(n).password = l),
                placeholder: "Password"
            }, null, 512), [
                [le, g(n).password]
            ]), I("button", {
                onClick: o
            }, "Create Room"), g(n).status1 ? (M(), q("p", Pu, ze(g(n).status1), 1)) : ce("", !0)]), I("div", Fu, [Ou, X(I("input", {
                type: "text",
                "onUpdate:modelValue": i[2] || (i[2] = l => g(n).id = l),
                placeholder: "Room ID"
            }, null, 512), [
                [le, g(n).id]
            ]), X(I("input", {
                type: "password",
                "onUpdate:modelValue": i[3] || (i[3] = l => g(n).password2 = l),
                placeholder: "Password"
            }, null, 512), [
                [le, g(n).password2]
            ]), I("button", {
                onClick: s
            }, "Join Room"), g(n).status2 ? (M(), q("p", Eu, ze(g(n).status2), 1)) : ce("", !0)])])), g(t) ? (M(), rt(cu, {
                key: 1
            })) : ce("", !0)], 64))
        }
    }),
    Du = bn(Su, [
        ["__scopeId", "data-v-2787a22a"]
    ]);
Cl(Du).mount("#app");
