(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver(s => {
        for (const o of s)
            if (o.type === "childList")
                for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(s) {
        const o = {};
        return s.integrity && (o.integrity = s.integrity), s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? o.credentials = "include" : s.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const o = n(s);
        fetch(s.href, o)
    }
})();

function Xn(e, t) {
    const n = Object.create(null),
        r = e.split(",");
    for (let s = 0; s < r.length; s++) n[r[s]] = !0;
    return t ? s => !!n[s.toLowerCase()] : s => !!n[s]
}
const U = {},
    it = [],
    xe = () => {},
    no = () => !1,
    on = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    Zn = e => e.startsWith("onUpdate:"),
    Z = Object.assign,
    Yn = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    },
    ro = Object.prototype.hasOwnProperty,
    N = (e, t) => ro.call(e, t),
    F = Array.isArray,
    lt = e => Et(e) === "[object Map]",
    ln = e => Et(e) === "[object Set]",
    _r = e => Et(e) === "[object Date]",
    O = e => typeof e == "function",
    Q = e => typeof e == "string",
    Le = e => typeof e == "symbol",
    G = e => e !== null && typeof e == "object",
    Yr = e => (G(e) || O(e)) && O(e.then) && O(e.catch),
    es = Object.prototype.toString,
    Et = e => es.call(e),
    so = e => Et(e).slice(8, -1),
    ts = e => Et(e) === "[object Object]",
    er = e => Q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    jt = Xn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    an = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    },
    oo = /-(\w)/g,
    ft = an(e => e.replace(oo, (t, n) => n ? n.toUpperCase() : "")),
    io = /\B([A-Z])/g,
    gt = an(e => e.replace(io, "-$1").toLowerCase()),
    ns = an(e => e.charAt(0).toUpperCase() + e.slice(1)),
    Rn = an(e => e ? `on${ns(e)}` : ""),
    Xe = (e, t) => !Object.is(e, t),
    Vt = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    },
    Xt = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    },
    Zt = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let wr;
const Bn = () => wr || (wr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function un(e) {
    if (F(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                s = Q(r) ? co(r) : un(r);
            if (s)
                for (const o in s) t[o] = s[o]
        }
        return t
    } else if (Q(e) || G(e)) return e
}
const lo = /;(?![^(]*\))/g,
    ao = /:([^]+)/,
    uo = /\/\*[^]*?\*\//g;

function co(e) {
    const t = {};
    return e.replace(uo, "").split(lo).forEach(n => {
        if (n) {
            const r = n.split(ao);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }), t
}

function cn(e) {
    let t = "";
    if (Q(e)) t = e;
    else if (F(e))
        for (let n = 0; n < e.length; n++) {
            const r = cn(e[n]);
            r && (t += r + " ")
        } else if (G(e))
            for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}
const fo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    po = Xn(fo);

function rs(e) {
    return !!e || e === ""
}

function ho(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let r = 0; n && r < e.length; r++) n = fn(e[r], t[r]);
    return n
}

function fn(e, t) {
    if (e === t) return !0;
    let n = _r(e),
        r = _r(t);
    if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
    if (n = Le(e), r = Le(t), n || r) return e === t;
    if (n = F(e), r = F(t), n || r) return n && r ? ho(e, t) : !1;
    if (n = G(e), r = G(t), n || r) {
        if (!n || !r) return !1;
        const s = Object.keys(e).length,
            o = Object.keys(t).length;
        if (s !== o) return !1;
        for (const i in e) {
            const l = e.hasOwnProperty(i),
                f = t.hasOwnProperty(i);
            if (l && !f || !l && f || !fn(e[i], t[i])) return !1
        }
    }
    return String(e) === String(t)
}

function go(e, t) {
    return e.findIndex(n => fn(n, t))
}
const Fe = e => Q(e) ? e : e == null ? "" : F(e) || G(e) && (e.toString === es || !O(e.toString)) ? JSON.stringify(e, ss, 2) : String(e),
    ss = (e, t) => t && t.__v_isRef ? ss(e, t.value) : lt(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s], o) => (n[Fn(r, o) + " =>"] = s, n), {})
    } : ln(t) ? {
        [`Set(${t.size})`]: [...t.values()].map(n => Fn(n))
    } : Le(t) ? Fn(t) : G(t) && !F(t) && !ts(t) ? String(t) : t,
    Fn = (e, t = "") => {
        var n;
        return Le(e) ? `Symbol(${(n=e.description)!=null?n:t})` : e
    };
let pe;
class mo {
    constructor(t = !1) {
        this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = pe, !t && pe && (this.index = (pe.scopes || (pe.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const n = pe;
            try {
                return pe = this, t()
            } finally {
                pe = n
            }
        }
    }
    on() {
        pe = this
    }
    off() {
        pe = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes)
                for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function yo(e, t = pe) {
    t && t.active && t.effects.push(e)
}

function vo() {
    return pe
}
const tr = e => {
        const t = new Set(e);
        return t.w = 0, t.n = 0, t
    },
    os = e => (e.w & Be) > 0,
    is = e => (e.n & Be) > 0,
    _o = ({
        deps: e
    }) => {
        if (e.length)
            for (let t = 0; t < e.length; t++) e[t].w |= Be
    },
    wo = e => {
        const {
            deps: t
        } = e;
        if (t.length) {
            let n = 0;
            for (let r = 0; r < t.length; r++) {
                const s = t[r];
                os(s) && !is(s) ? s.delete(e) : t[n++] = s, s.w &= ~Be, s.n &= ~Be
            }
            t.length = n
        }
    },
    Hn = new WeakMap;
let Ct = 0,
    Be = 1;
const Kn = 30;
let he;
const Je = Symbol(""),
    qn = Symbol("");
class nr {
    constructor(t, n = null, r) {
        this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, yo(this, r)
    }
    run() {
        if (!this.active) return this.fn();
        let t = he,
            n = De;
        for (; t;) {
            if (t === this) return;
            t = t.parent
        }
        try {
            return this.parent = he, he = this, De = !0, Be = 1 << ++Ct, Ct <= Kn ? _o(this) : br(this), this.fn()
        } finally {
            Ct <= Kn && wo(this), Be = 1 << --Ct, he = this.parent, De = n, this.parent = void 0, this.deferStop && this.stop()
        }
    }
    stop() {
        he === this ? this.deferStop = !0 : this.active && (br(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function br(e) {
    const {
        deps: t
    } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}
let De = !0;
const ls = [];

function mt() {
    ls.push(De), De = !1
}

function yt() {
    const e = ls.pop();
    De = e === void 0 ? !0 : e
}

function ce(e, t, n) {
    if (De && he) {
        let r = Hn.get(e);
        r || Hn.set(e, r = new Map);
        let s = r.get(n);
        s || r.set(n, s = tr()), as(s)
    }
}

function as(e, t) {
    let n = !1;
    Ct <= Kn ? is(e) || (e.n |= Be, n = !os(e)) : n = !e.has(he), n && (e.add(he), he.deps.push(e))
}

function Pe(e, t, n, r, s, o) {
    const i = Hn.get(e);
    if (!i) return;
    let l = [];
    if (t === "clear") l = [...i.values()];
    else if (n === "length" && F(e)) {
        const f = Number(r);
        i.forEach((h, p) => {
            (p === "length" || !Le(p) && p >= f) && l.push(h)
        })
    } else switch (n !== void 0 && l.push(i.get(n)), t) {
        case "add":
            F(e) ? er(n) && l.push(i.get("length")) : (l.push(i.get(Je)), lt(e) && l.push(i.get(qn)));
            break;
        case "delete":
            F(e) || (l.push(i.get(Je)), lt(e) && l.push(i.get(qn)));
            break;
        case "set":
            lt(e) && l.push(i.get(Je));
            break
    }
    if (l.length === 1) l[0] && Un(l[0]);
    else {
        const f = [];
        for (const h of l) h && f.push(...h);
        Un(tr(f))
    }
}

function Un(e, t) {
    const n = F(e) ? e : [...e];
    for (const r of n) r.computed && Cr(r);
    for (const r of n) r.computed || Cr(r)
}

function Cr(e, t) {
    (e !== he || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const bo = Xn("__proto__,__v_isRef,__isVue"),
    us = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Le)),
    Ar = Co();

function Co() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function(...n) {
            const r = B(this);
            for (let o = 0, i = this.length; o < i; o++) ce(r, "get", o + "");
            const s = r[t](...n);
            return s === -1 || s === !1 ? r[t](...n.map(B)) : s
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function(...n) {
            mt();
            const r = B(this)[t].apply(this, n);
            return yt(), r
        }
    }), e
}

function Ao(e) {
    const t = B(this);
    return ce(t, "has", e), t.hasOwnProperty(e)
}
class cs {
    constructor(t = !1, n = !1) {
        this._isReadonly = t, this._shallow = n
    }
    get(t, n, r) {
        const s = this._isReadonly,
            o = this._shallow;
        if (n === "__v_isReactive") return !s;
        if (n === "__v_isReadonly") return s;
        if (n === "__v_isShallow") return o;
        if (n === "__v_raw") return r === (s ? o ? Do : hs : o ? ps : ds).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
        const i = F(t);
        if (!s) {
            if (i && N(Ar, n)) return Reflect.get(Ar, n, r);
            if (n === "hasOwnProperty") return Ao
        }
        const l = Reflect.get(t, n, r);
        return (Le(n) ? us.has(n) : bo(n)) || (s || ce(t, "get", n), o) ? l : J(l) ? i && er(n) ? l : l.value : G(l) ? s ? gs(l) : pn(l) : l
    }
}
class fs extends cs {
    constructor(t = !1) {
        super(!1, t)
    }
    set(t, n, r, s) {
        let o = t[n];
        if (!this._shallow) {
            const f = dt(o);
            if (!Yt(r) && !dt(r) && (o = B(o), r = B(r)), !F(t) && J(o) && !J(r)) return f ? !1 : (o.value = r, !0)
        }
        const i = F(t) && er(n) ? Number(n) < t.length : N(t, n),
            l = Reflect.set(t, n, r, s);
        return t === B(s) && (i ? Xe(r, o) && Pe(t, "set", n, r) : Pe(t, "add", n, r)), l
    }
    deleteProperty(t, n) {
        const r = N(t, n);
        t[n];
        const s = Reflect.deleteProperty(t, n);
        return s && r && Pe(t, "delete", n, void 0), s
    }
    has(t, n) {
        const r = Reflect.has(t, n);
        return (!Le(n) || !us.has(n)) && ce(t, "has", n), r
    }
    ownKeys(t) {
        return ce(t, "iterate", F(t) ? "length" : Je), Reflect.ownKeys(t)
    }
}
class To extends cs {
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
const xo = new fs,
    ko = new To,
    Io = new fs(!0),
    rr = e => e,
    dn = e => Reflect.getPrototypeOf(e);

function Lt(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const s = B(e),
        o = B(t);
    n || (Xe(t, o) && ce(s, "get", t), ce(s, "get", o));
    const {
        has: i
    } = dn(s), l = r ? rr : n ? ir : It;
    if (i.call(s, t)) return l(e.get(t));
    if (i.call(s, o)) return l(e.get(o));
    e !== s && e.get(t)
}

function Bt(e, t = !1) {
    const n = this.__v_raw,
        r = B(n),
        s = B(e);
    return t || (Xe(e, s) && ce(r, "has", e), ce(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s)
}

function Ht(e, t = !1) {
    return e = e.__v_raw, !t && ce(B(e), "iterate", Je), Reflect.get(e, "size", e)
}

function Tr(e) {
    e = B(e);
    const t = B(this);
    return dn(t).has.call(t, e) || (t.add(e), Pe(t, "add", e, e)), this
}

function xr(e, t) {
    t = B(t);
    const n = B(this),
        {
            has: r,
            get: s
        } = dn(n);
    let o = r.call(n, e);
    o || (e = B(e), o = r.call(n, e));
    const i = s.call(n, e);
    return n.set(e, t), o ? Xe(t, i) && Pe(n, "set", e, t) : Pe(n, "add", e, t), this
}

function kr(e) {
    const t = B(this),
        {
            has: n,
            get: r
        } = dn(t);
    let s = n.call(t, e);
    s || (e = B(e), s = n.call(t, e)), r && r.call(t, e);
    const o = t.delete(e);
    return s && Pe(t, "delete", e, void 0), o
}

function Ir() {
    const e = B(this),
        t = e.size !== 0,
        n = e.clear();
    return t && Pe(e, "clear", void 0, void 0), n
}

function Kt(e, t) {
    return function(r, s) {
        const o = this,
            i = o.__v_raw,
            l = B(i),
            f = t ? rr : e ? ir : It;
        return !e && ce(l, "iterate", Je), i.forEach((h, p) => r.call(s, f(h), f(p), o))
    }
}

function qt(e, t, n) {
    return function(...r) {
        const s = this.__v_raw,
            o = B(s),
            i = lt(o),
            l = e === "entries" || e === Symbol.iterator && i,
            f = e === "keys" && i,
            h = s[e](...r),
            p = n ? rr : t ? ir : It;
        return !t && ce(o, "iterate", f ? qn : Je), {
            next() {
                const {
                    value: a,
                    done: c
                } = h.next();
                return c ? {
                    value: a,
                    done: c
                } : {
                    value: l ? [p(a[0]), p(a[1])] : p(a),
                    done: c
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function Ee(e) {
    return function(...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}

function Ro() {
    const e = {
            get(o) {
                return Lt(this, o)
            },
            get size() {
                return Ht(this)
            },
            has: Bt,
            add: Tr,
            set: xr,
            delete: kr,
            clear: Ir,
            forEach: Kt(!1, !1)
        },
        t = {
            get(o) {
                return Lt(this, o, !1, !0)
            },
            get size() {
                return Ht(this)
            },
            has: Bt,
            add: Tr,
            set: xr,
            delete: kr,
            clear: Ir,
            forEach: Kt(!1, !0)
        },
        n = {
            get(o) {
                return Lt(this, o, !0)
            },
            get size() {
                return Ht(this, !0)
            },
            has(o) {
                return Bt.call(this, o, !0)
            },
            add: Ee("add"),
            set: Ee("set"),
            delete: Ee("delete"),
            clear: Ee("clear"),
            forEach: Kt(!0, !1)
        },
        r = {
            get(o) {
                return Lt(this, o, !0, !0)
            },
            get size() {
                return Ht(this, !0)
            },
            has(o) {
                return Bt.call(this, o, !0)
            },
            add: Ee("add"),
            set: Ee("set"),
            delete: Ee("delete"),
            clear: Ee("clear"),
            forEach: Kt(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
        e[o] = qt(o, !1, !1), n[o] = qt(o, !0, !1), t[o] = qt(o, !1, !0), r[o] = qt(o, !0, !0)
    }), [e, n, t, r]
}
const [Fo, Po, Oo, So] = Ro();

function sr(e, t) {
    const n = t ? e ? So : Oo : e ? Po : Fo;
    return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(N(n, s) && s in r ? n : r, s, o)
}
const Eo = {
        get: sr(!1, !1)
    },
    Mo = {
        get: sr(!1, !0)
    },
    $o = {
        get: sr(!0, !1)
    },
    ds = new WeakMap,
    ps = new WeakMap,
    hs = new WeakMap,
    Do = new WeakMap;

function No(e) {
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

function Lo(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : No(so(e))
}

function pn(e) {
    return dt(e) ? e : or(e, !1, xo, Eo, ds)
}

function Bo(e) {
    return or(e, !1, Io, Mo, ps)
}

function gs(e) {
    return or(e, !0, ko, $o, hs)
}

function or(e, t, n, r, s) {
    if (!G(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const o = s.get(e);
    if (o) return o;
    const i = Lo(e);
    if (i === 0) return e;
    const l = new Proxy(e, i === 2 ? r : n);
    return s.set(e, l), l
}

function at(e) {
    return dt(e) ? at(e.__v_raw) : !!(e && e.__v_isReactive)
}

function dt(e) {
    return !!(e && e.__v_isReadonly)
}

function Yt(e) {
    return !!(e && e.__v_isShallow)
}

function ms(e) {
    return at(e) || dt(e)
}

function B(e) {
    const t = e && e.__v_raw;
    return t ? B(t) : e
}

function ys(e) {
    return Xt(e, "__v_skip", !0), e
}
const It = e => G(e) ? pn(e) : e,
    ir = e => G(e) ? gs(e) : e;

function vs(e) {
    De && he && (e = B(e), as(e.dep || (e.dep = tr())))
}

function _s(e, t) {
    e = B(e);
    const n = e.dep;
    n && Un(n)
}

function J(e) {
    return !!(e && e.__v_isRef === !0)
}

function ae(e) {
    return Ho(e, !1)
}

function Ho(e, t) {
    return J(e) ? e : new Ko(e, t)
}
class Ko {
    constructor(t, n) {
        this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : B(t), this._value = n ? t : It(t)
    }
    get value() {
        return vs(this), this._value
    }
    set value(t) {
        const n = this.__v_isShallow || Yt(t) || dt(t);
        t = n ? t : B(t), Xe(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : It(t), _s(this))
    }
}

function g(e) {
    return J(e) ? e.value : e
}
const qo = {
    get: (e, t, n) => g(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const s = e[t];
        return J(s) && !J(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r)
    }
};

function ws(e) {
    return at(e) ? e : new Proxy(e, qo)
}
class Uo {
    constructor(t, n, r, s) {
        this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new nr(t, () => {
            this._dirty || (this._dirty = !0, _s(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r
    }
    get value() {
        const t = B(this);
        return vs(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
    }
    set value(t) {
        this._setter(t)
    }
}

function Go(e, t, n = !1) {
    let r, s;
    const o = O(e);
    return o ? (r = e, s = xe) : (r = e.get, s = e.set), new Uo(r, s, o || !s, n)
}

function Ne(e, t, n, r) {
    let s;
    try {
        s = r ? e(...r) : e()
    } catch (o) {
        hn(o, t, n)
    }
    return s
}

function ye(e, t, n, r) {
    if (O(e)) {
        const o = Ne(e, t, n, r);
        return o && Yr(o) && o.catch(i => {
            hn(i, t, n)
        }), o
    }
    const s = [];
    for (let o = 0; o < e.length; o++) s.push(ye(e[o], t, n, r));
    return s
}

function hn(e, t, n, r = !0) {
    const s = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy,
            l = n;
        for (; o;) {
            const h = o.ec;
            if (h) {
                for (let p = 0; p < h.length; p++)
                    if (h[p](e, i, l) === !1) return
            }
            o = o.parent
        }
        const f = t.appContext.config.errorHandler;
        if (f) {
            Ne(f, null, 10, [e, i, l]);
            return
        }
    }
    jo(e, n, s, r)
}

function jo(e, t, n, r = !0) {
    console.error(e)
}
let Rt = !1,
    Gn = !1;
const se = [];
let Te = 0;
const ut = [];
let Re = null,
    je = 0;
const bs = Promise.resolve();
let lr = null;

function Vo(e) {
    const t = lr || bs;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function zo(e) {
    let t = Te + 1,
        n = se.length;
    for (; t < n;) {
        const r = t + n >>> 1,
            s = se[r],
            o = Ft(s);
        o < e || o === e && s.pre ? t = r + 1 : n = r
    }
    return t
}

function ar(e) {
    (!se.length || !se.includes(e, Rt && e.allowRecurse ? Te + 1 : Te)) && (e.id == null ? se.push(e) : se.splice(zo(e.id), 0, e), Cs())
}

function Cs() {
    !Rt && !Gn && (Gn = !0, lr = bs.then(Ts))
}

function Wo(e) {
    const t = se.indexOf(e);
    t > Te && se.splice(t, 1)
}

function Jo(e) {
    F(e) ? ut.push(...e) : (!Re || !Re.includes(e, e.allowRecurse ? je + 1 : je)) && ut.push(e), Cs()
}

function Rr(e, t, n = Rt ? Te + 1 : 0) {
    for (; n < se.length; n++) {
        const r = se[n];
        if (r && r.pre) {
            if (e && r.id !== e.uid) continue;
            se.splice(n, 1), n--, r()
        }
    }
}

function As(e) {
    if (ut.length) {
        const t = [...new Set(ut)];
        if (ut.length = 0, Re) {
            Re.push(...t);
            return
        }
        for (Re = t, Re.sort((n, r) => Ft(n) - Ft(r)), je = 0; je < Re.length; je++) Re[je]();
        Re = null, je = 0
    }
}
const Ft = e => e.id == null ? 1 / 0 : e.id,
    Qo = (e, t) => {
        const n = Ft(e) - Ft(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1
        }
        return n
    };

function Ts(e) {
    Gn = !1, Rt = !0, se.sort(Qo);
    try {
        for (Te = 0; Te < se.length; Te++) {
            const t = se[Te];
            t && t.active !== !1 && Ne(t, null, 14)
        }
    } finally {
        Te = 0, se.length = 0, As(), Rt = !1, lr = null, (se.length || ut.length) && Ts()
    }
}

function Xo(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || U;
    let s = n;
    const o = t.startsWith("update:"),
        i = o && t.slice(7);
    if (i && i in r) {
        const p = `${i==="modelValue"?"model":i}Modifiers`,
            {
                number: a,
                trim: c
            } = r[p] || U;
        c && (s = n.map(T => Q(T) ? T.trim() : T)), a && (s = n.map(Zt))
    }
    let l, f = r[l = Rn(t)] || r[l = Rn(ft(t))];
    !f && o && (f = r[l = Rn(gt(t))]), f && ye(f, e, 6, s);
    const h = r[l + "Once"];
    if (h) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        e.emitted[l] = !0, ye(h, e, 6, s)
    }
}

function xs(e, t, n = !1) {
    const r = t.emitsCache,
        s = r.get(e);
    if (s !== void 0) return s;
    const o = e.emits;
    let i = {},
        l = !1;
    if (!O(e)) {
        const f = h => {
            const p = xs(h, t, !0);
            p && (l = !0, Z(i, p))
        };
        !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f)
    }
    return !o && !l ? (G(e) && r.set(e, null), null) : (F(o) ? o.forEach(f => i[f] = null) : Z(i, o), G(e) && r.set(e, i), i)
}

function gn(e, t) {
    return !e || !on(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), N(e, t[0].toLowerCase() + t.slice(1)) || N(e, gt(t)) || N(e, t))
}
let ge = null,
    mn = null;

function en(e) {
    const t = ge;
    return ge = e, mn = e && e.type.__scopeId || null, t
}

function ks(e) {
    mn = e
}

function Is() {
    mn = null
}

function Zo(e, t = ge, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && Lr(-1);
        const o = en(t);
        let i;
        try {
            i = e(...s)
        } finally {
            en(o), r._d && Lr(1)
        }
        return i
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function Pn(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: s,
        props: o,
        propsOptions: [i],
        slots: l,
        attrs: f,
        emit: h,
        render: p,
        renderCache: a,
        data: c,
        setupState: T,
        ctx: S,
        inheritAttrs: $
    } = e;
    let V, Y;
    const X = en(e);
    try {
        if (n.shapeFlag & 4) {
            const M = s || r,
                ve = M;
            V = Ce(p.call(ve, M, a, o, T, c, S)), Y = f
        } else {
            const M = t;
            V = Ce(M.length > 1 ? M(o, {
                attrs: f,
                slots: l,
                emit: h
            }) : M(o, null)), Y = t.props ? f : Yo(f)
        }
    } catch (M) {
        kt.length = 0, hn(M, e, 1), V = ke(Ze)
    }
    let ee = V;
    if (Y && $ !== !1) {
        const M = Object.keys(Y),
            {
                shapeFlag: ve
            } = ee;
        M.length && ve & 7 && (i && M.some(Zn) && (Y = ei(Y, i)), ee = pt(ee, Y))
    }
    return n.dirs && (ee = pt(ee), ee.dirs = ee.dirs ? ee.dirs.concat(n.dirs) : n.dirs), n.transition && (ee.transition = n.transition), V = ee, en(X), V
}
const Yo = e => {
        let t;
        for (const n in e)(n === "class" || n === "style" || on(n)) && ((t || (t = {}))[n] = e[n]);
        return t
    },
    ei = (e, t) => {
        const n = {};
        for (const r in e)(!Zn(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n
    };

function ti(e, t, n) {
    const {
        props: r,
        children: s,
        component: o
    } = e, {
        props: i,
        children: l,
        patchFlag: f
    } = t, h = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && f >= 0) {
        if (f & 1024) return !0;
        if (f & 16) return r ? Fr(r, i, h) : !!i;
        if (f & 8) {
            const p = t.dynamicProps;
            for (let a = 0; a < p.length; a++) {
                const c = p[a];
                if (i[c] !== r[c] && !gn(h, c)) return !0
            }
        }
    } else return (s || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? Fr(r, i, h) : !0 : !!i;
    return !1
}

function Fr(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (t[o] !== e[o] && !gn(n, o)) return !0
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
    si = e => e.__isSuspense;

function oi(e, t) {
    t && t.pendingBranch ? F(e) ? t.effects.push(...e) : t.effects.push(e) : Jo(e)
}
const Ut = {};

function zt(e, t, n) {
    return Rs(e, t, n)
}

function Rs(e, t, {
    immediate: n,
    deep: r,
    flush: s,
    onTrack: o,
    onTrigger: i
} = U) {
    var l;
    const f = vo() === ((l = oe) == null ? void 0 : l.scope) ? oe : null;
    let h, p = !1,
        a = !1;
    if (J(e) ? (h = () => e.value, p = Yt(e)) : at(e) ? (h = () => e, r = !0) : F(e) ? (a = !0, p = e.some(M => at(M) || Yt(M)), h = () => e.map(M => {
            if (J(M)) return M.value;
            if (at(M)) return We(M);
            if (O(M)) return Ne(M, f, 2)
        })) : O(e) ? t ? h = () => Ne(e, f, 2) : h = () => {
            if (!(f && f.isUnmounted)) return c && c(), ye(e, f, 3, [T])
        } : h = xe, t && r) {
        const M = h;
        h = () => We(M())
    }
    let c, T = M => {
            c = X.onStop = () => {
                Ne(M, f, 4), c = X.onStop = void 0
            }
        },
        S;
    if (Ot)
        if (T = xe, t ? n && ye(t, f, 3, [h(), a ? [] : void 0, T]) : h(), s === "sync") {
            const M = Zi();
            S = M.__watcherHandles || (M.__watcherHandles = [])
        } else return xe;
    let $ = a ? new Array(e.length).fill(Ut) : Ut;
    const V = () => {
        if (X.active)
            if (t) {
                const M = X.run();
                (r || p || (a ? M.some((ve, et) => Xe(ve, $[et])) : Xe(M, $))) && (c && c(), ye(t, f, 3, [M, $ === Ut ? void 0 : a && $[0] === Ut ? [] : $, T]), $ = M)
            } else X.run()
    };
    V.allowRecurse = !!t;
    let Y;
    s === "sync" ? Y = V : s === "post" ? Y = () => ue(V, f && f.suspense) : (V.pre = !0, f && (V.id = f.uid), Y = () => ar(V));
    const X = new nr(h, Y);
    t ? n ? V() : $ = X.run() : s === "post" ? ue(X.run.bind(X), f && f.suspense) : X.run();
    const ee = () => {
        X.stop(), f && f.scope && Yn(f.scope.effects, X)
    };
    return S && S.push(ee), ee
}

function ii(e, t, n) {
    const r = this.proxy,
        s = Q(e) ? e.includes(".") ? Fs(r, e) : () => r[e] : e.bind(r, r);
    let o;
    O(t) ? o = t : (o = t.handler, n = t);
    const i = oe;
    ht(this);
    const l = Rs(s, o.bind(r), n);
    return i ? ht(i) : Qe(), l
}

function Fs(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let s = 0; s < n.length && r; s++) r = r[n[s]];
        return r
    }
}

function We(e, t) {
    if (!G(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
    if (t.add(e), J(e)) We(e.value, t);
    else if (F(e))
        for (let n = 0; n < e.length; n++) We(e[n], t);
    else if (ln(e) || lt(e)) e.forEach(n => {
        We(n, t)
    });
    else if (ts(e))
        for (const n in e) We(e[n], t);
    return e
}

function W(e, t) {
    const n = ge;
    if (n === null) return e;
    const r = bn(n) || n.proxy,
        s = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
        let [i, l, f, h = U] = t[o];
        i && (O(i) && (i = {
            mounted: i,
            updated: i
        }), i.deep && We(l), s.push({
            dir: i,
            instance: r,
            value: l,
            oldValue: void 0,
            arg: f,
            modifiers: h
        }))
    }
    return e
}

function Ue(e, t, n, r) {
    const s = e.dirs,
        o = t && t.dirs;
    for (let i = 0; i < s.length; i++) {
        const l = s[i];
        o && (l.oldValue = o[i].value);
        let f = l.dir[r];
        f && (mt(), ye(f, n, 8, [e.el, l, e, t]), yt())
    }
} /*! #__NO_SIDE_EFFECTS__ */
function yn(e, t) {
    return O(e) ? Z({
        name: e.name
    }, t, {
        setup: e
    }) : e
}
const Wt = e => !!e.type.__asyncLoader,
    Ps = e => e.type.__isKeepAlive;

function li(e, t) {
    Os(e, "a", t)
}

function ai(e, t) {
    Os(e, "da", t)
}

function Os(e, t, n = oe) {
    const r = e.__wdc || (e.__wdc = () => {
        let s = n;
        for (; s;) {
            if (s.isDeactivated) return;
            s = s.parent
        }
        return e()
    });
    if (vn(t, r, n), n) {
        let s = n.parent;
        for (; s && s.parent;) Ps(s.parent.vnode) && ui(r, t, n, s), s = s.parent
    }
}

function ui(e, t, n, r) {
    const s = vn(t, e, r, !0);
    Ms(() => {
        Yn(r[t], s)
    }, n)
}

function vn(e, t, n = oe, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []),
            o = t.__weh || (t.__weh = (...i) => {
                if (n.isUnmounted) return;
                mt(), ht(n);
                const l = ye(t, n, e, i);
                return Qe(), yt(), l
            });
        return r ? s.unshift(o) : s.push(o), o
    }
}
const Oe = e => (t, n = oe) => (!Ot || e === "sp") && vn(e, (...r) => t(...r), n),
    ci = Oe("bm"),
    Ss = Oe("m"),
    fi = Oe("bu"),
    di = Oe("u"),
    Es = Oe("bum"),
    Ms = Oe("um"),
    pi = Oe("sp"),
    hi = Oe("rtg"),
    gi = Oe("rtc");

function mi(e, t = oe) {
    vn("ec", e, t)
}

function At(e, t, n, r) {
    let s;
    const o = n && n[r];
    if (F(e) || Q(e)) {
        s = new Array(e.length);
        for (let i = 0, l = e.length; i < l; i++) s[i] = t(e[i], i, void 0, o && o[i])
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i])
    } else if (G(e))
        if (e[Symbol.iterator]) s = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
        else {
            const i = Object.keys(e);
            s = new Array(i.length);
            for (let l = 0, f = i.length; l < f; l++) {
                const h = i[l];
                s[l] = t(e[h], h, l, o && o[l])
            }
        }
    else s = [];
    return n && (n[r] = s), s
}
const jn = e => e ? js(e) ? bn(e) || e.proxy : jn(e.parent) : null,
    xt = Z(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => jn(e.parent),
        $root: e => jn(e.root),
        $emit: e => e.emit,
        $options: e => ur(e),
        $forceUpdate: e => e.f || (e.f = () => ar(e.update)),
        $nextTick: e => e.n || (e.n = Vo.bind(e.proxy)),
        $watch: e => ii.bind(e)
    }),
    On = (e, t) => e !== U && !e.__isScriptSetup && N(e, t),
    yi = {
        get({
            _: e
        }, t) {
            const {
                ctx: n,
                setupState: r,
                data: s,
                props: o,
                accessCache: i,
                type: l,
                appContext: f
            } = e;
            let h;
            if (t[0] !== "$") {
                const T = i[t];
                if (T !== void 0) switch (T) {
                    case 1:
                        return r[t];
                    case 2:
                        return s[t];
                    case 4:
                        return n[t];
                    case 3:
                        return o[t]
                } else {
                    if (On(r, t)) return i[t] = 1, r[t];
                    if (s !== U && N(s, t)) return i[t] = 2, s[t];
                    if ((h = e.propsOptions[0]) && N(h, t)) return i[t] = 3, o[t];
                    if (n !== U && N(n, t)) return i[t] = 4, n[t];
                    Vn && (i[t] = 0)
                }
            }
            const p = xt[t];
            let a, c;
            if (p) return t === "$attrs" && ce(e, "get", t), p(e);
            if ((a = l.__cssModules) && (a = a[t])) return a;
            if (n !== U && N(n, t)) return i[t] = 4, n[t];
            if (c = f.config.globalProperties, N(c, t)) return c[t]
        },
        set({
            _: e
        }, t, n) {
            const {
                data: r,
                setupState: s,
                ctx: o
            } = e;
            return On(s, t) ? (s[t] = n, !0) : r !== U && N(r, t) ? (r[t] = n, !0) : N(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0)
        },
        has({
            _: {
                data: e,
                setupState: t,
                accessCache: n,
                ctx: r,
                appContext: s,
                propsOptions: o
            }
        }, i) {
            let l;
            return !!n[i] || e !== U && N(e, i) || On(t, i) || (l = o[0]) && N(l, i) || N(r, i) || N(xt, i) || N(s.config.globalProperties, i)
        },
        defineProperty(e, t, n) {
            return n.get != null ? e._.accessCache[t] = 0 : N(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    };

function Pr(e) {
    return F(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
}
let Vn = !0;

function vi(e) {
    const t = ur(e),
        n = e.proxy,
        r = e.ctx;
    Vn = !1, t.beforeCreate && Or(t.beforeCreate, e, "bc");
    const {
        data: s,
        computed: o,
        methods: i,
        watch: l,
        provide: f,
        inject: h,
        created: p,
        beforeMount: a,
        mounted: c,
        beforeUpdate: T,
        updated: S,
        activated: $,
        deactivated: V,
        beforeDestroy: Y,
        beforeUnmount: X,
        destroyed: ee,
        unmounted: M,
        render: ve,
        renderTracked: et,
        renderTriggered: vt,
        errorCaptured: Se,
        serverPrefetch: Tn,
        expose: He,
        inheritAttrs: _t,
        components: Mt,
        directives: $t,
        filters: xn
    } = t;
    if (h && _i(h, r, null), i)
        for (const j in i) {
            const K = i[j];
            O(K) && (r[j] = K.bind(n))
        }
    if (s) {
        const j = s.call(n, n);
        G(j) && (e.data = pn(j))
    }
    if (Vn = !0, o)
        for (const j in o) {
            const K = o[j],
                Ke = O(K) ? K.bind(n, n) : O(K.get) ? K.get.bind(n, n) : xe,
                Dt = !O(K) && O(K.set) ? K.set.bind(n) : xe,
                qe = Qi({
                    get: Ke,
                    set: Dt
                });
            Object.defineProperty(r, j, {
                enumerable: !0,
                configurable: !0,
                get: () => qe.value,
                set: _e => qe.value = _e
            })
        }
    if (l)
        for (const j in l) $s(l[j], r, n, j);
    if (f) {
        const j = O(f) ? f.call(n) : f;
        Reflect.ownKeys(j).forEach(K => {
            xi(K, j[K])
        })
    }
    p && Or(p, e, "c");

    function ie(j, K) {
        F(K) ? K.forEach(Ke => j(Ke.bind(n))) : K && j(K.bind(n))
    }
    if (ie(ci, a), ie(Ss, c), ie(fi, T), ie(di, S), ie(li, $), ie(ai, V), ie(mi, Se), ie(gi, et), ie(hi, vt), ie(Es, X), ie(Ms, M), ie(pi, Tn), F(He))
        if (He.length) {
            const j = e.exposed || (e.exposed = {});
            He.forEach(K => {
                Object.defineProperty(j, K, {
                    get: () => n[K],
                    set: Ke => n[K] = Ke
                })
            })
        } else e.exposed || (e.exposed = {});
    ve && e.render === xe && (e.render = ve), _t != null && (e.inheritAttrs = _t), Mt && (e.components = Mt), $t && (e.directives = $t)
}

function _i(e, t, n = xe) {
    F(e) && (e = zn(e));
    for (const r in e) {
        const s = e[r];
        let o;
        G(s) ? "default" in s ? o = Jt(s.from || r, s.default, !0) : o = Jt(s.from || r) : o = Jt(s), J(o) ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: i => o.value = i
        }) : t[r] = o
    }
}

function Or(e, t, n) {
    ye(F(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function $s(e, t, n, r) {
    const s = r.includes(".") ? Fs(n, r) : () => n[r];
    if (Q(e)) {
        const o = t[e];
        O(o) && zt(s, o)
    } else if (O(e)) zt(s, e.bind(n));
    else if (G(e))
        if (F(e)) e.forEach(o => $s(o, t, n, r));
        else {
            const o = O(e.handler) ? e.handler.bind(n) : t[e.handler];
            O(o) && zt(s, o, e)
        }
}

function ur(e) {
    const t = e.type,
        {
            mixins: n,
            extends: r
        } = t,
        {
            mixins: s,
            optionsCache: o,
            config: {
                optionMergeStrategies: i
            }
        } = e.appContext,
        l = o.get(t);
    let f;
    return l ? f = l : !s.length && !n && !r ? f = t : (f = {}, s.length && s.forEach(h => tn(f, h, i, !0)), tn(f, t, i)), G(t) && o.set(t, f), f
}

function tn(e, t, n, r = !1) {
    const {
        mixins: s,
        extends: o
    } = t;
    o && tn(e, o, n, !0), s && s.forEach(i => tn(e, i, n, !0));
    for (const i in t)
        if (!(r && i === "expose")) {
            const l = wi[i] || n && n[i];
            e[i] = l ? l(e[i], t[i]) : t[i]
        } return e
}
const wi = {
    data: Sr,
    props: Er,
    emits: Er,
    methods: Tt,
    computed: Tt,
    beforeCreate: le,
    created: le,
    beforeMount: le,
    mounted: le,
    beforeUpdate: le,
    updated: le,
    beforeDestroy: le,
    beforeUnmount: le,
    destroyed: le,
    unmounted: le,
    activated: le,
    deactivated: le,
    errorCaptured: le,
    serverPrefetch: le,
    components: Tt,
    directives: Tt,
    watch: Ci,
    provide: Sr,
    inject: bi
};

function Sr(e, t) {
    return t ? e ? function() {
        return Z(O(e) ? e.call(this, this) : e, O(t) ? t.call(this, this) : t)
    } : t : e
}

function bi(e, t) {
    return Tt(zn(e), zn(t))
}

function zn(e) {
    if (F(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function le(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function Tt(e, t) {
    return e ? Z(Object.create(null), e, t) : t
}

function Er(e, t) {
    return e ? F(e) && F(t) ? [...new Set([...e, ...t])] : Z(Object.create(null), Pr(e), Pr(t ?? {})) : t
}

function Ci(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = Z(Object.create(null), e);
    for (const r in t) n[r] = le(e[r], t[r]);
    return n
}

function Ds() {
    return {
        app: null,
        config: {
            isNativeTag: no,
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
let Ai = 0;

function Ti(e, t) {
    return function(r, s = null) {
        O(r) || (r = Z({}, r)), s != null && !G(s) && (s = null);
        const o = Ds(),
            i = new WeakSet;
        let l = !1;
        const f = o.app = {
            _uid: Ai++,
            _component: r,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: Yi,
            get config() {
                return o.config
            },
            set config(h) {},
            use(h, ...p) {
                return i.has(h) || (h && O(h.install) ? (i.add(h), h.install(f, ...p)) : O(h) && (i.add(h), h(f, ...p))), f
            },
            mixin(h) {
                return o.mixins.includes(h) || o.mixins.push(h), f
            },
            component(h, p) {
                return p ? (o.components[h] = p, f) : o.components[h]
            },
            directive(h, p) {
                return p ? (o.directives[h] = p, f) : o.directives[h]
            },
            mount(h, p, a) {
                if (!l) {
                    const c = ke(r, s);
                    return c.appContext = o, p && t ? t(c, h) : e(c, h, a), l = !0, f._container = h, h.__vue_app__ = f, bn(c.component) || c.component.proxy
                }
            },
            unmount() {
                l && (e(null, f._container), delete f._container.__vue_app__)
            },
            provide(h, p) {
                return o.provides[h] = p, f
            },
            runWithContext(h) {
                nn = f;
                try {
                    return h()
                } finally {
                    nn = null
                }
            }
        };
        return f
    }
}
let nn = null;

function xi(e, t) {
    if (oe) {
        let n = oe.provides;
        const r = oe.parent && oe.parent.provides;
        r === n && (n = oe.provides = Object.create(r)), n[e] = t
    }
}

function Jt(e, t, n = !1) {
    const r = oe || ge;
    if (r || nn) {
        const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : nn._context.provides;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && O(t) ? t.call(r && r.proxy) : t
    }
}

function ki(e, t, n, r = !1) {
    const s = {},
        o = {};
    Xt(o, wn, 1), e.propsDefaults = Object.create(null), Ns(e, t, s, o);
    for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
    n ? e.props = r ? s : Bo(s) : e.type.props ? e.props = s : e.props = o, e.attrs = o
}

function Ii(e, t, n, r) {
    const {
        props: s,
        attrs: o,
        vnode: {
            patchFlag: i
        }
    } = e, l = B(s), [f] = e.propsOptions;
    let h = !1;
    if ((r || i > 0) && !(i & 16)) {
        if (i & 8) {
            const p = e.vnode.dynamicProps;
            for (let a = 0; a < p.length; a++) {
                let c = p[a];
                if (gn(e.emitsOptions, c)) continue;
                const T = t[c];
                if (f)
                    if (N(o, c)) T !== o[c] && (o[c] = T, h = !0);
                    else {
                        const S = ft(c);
                        s[S] = Wn(f, l, S, T, e, !1)
                    }
                else T !== o[c] && (o[c] = T, h = !0)
            }
        }
    } else {
        Ns(e, t, s, o) && (h = !0);
        let p;
        for (const a in l)(!t || !N(t, a) && ((p = gt(a)) === a || !N(t, p))) && (f ? n && (n[a] !== void 0 || n[p] !== void 0) && (s[a] = Wn(f, l, a, void 0, e, !0)) : delete s[a]);
        if (o !== l)
            for (const a in o)(!t || !N(t, a)) && (delete o[a], h = !0)
    }
    h && Pe(e, "set", "$attrs")
}

function Ns(e, t, n, r) {
    const [s, o] = e.propsOptions;
    let i = !1,
        l;
    if (t)
        for (let f in t) {
            if (jt(f)) continue;
            const h = t[f];
            let p;
            s && N(s, p = ft(f)) ? !o || !o.includes(p) ? n[p] = h : (l || (l = {}))[p] = h : gn(e.emitsOptions, f) || (!(f in r) || h !== r[f]) && (r[f] = h, i = !0)
        }
    if (o) {
        const f = B(n),
            h = l || U;
        for (let p = 0; p < o.length; p++) {
            const a = o[p];
            n[a] = Wn(s, f, a, h[a], e, !N(h, a))
        }
    }
    return i
}

function Wn(e, t, n, r, s, o) {
    const i = e[n];
    if (i != null) {
        const l = N(i, "default");
        if (l && r === void 0) {
            const f = i.default;
            if (i.type !== Function && !i.skipFactory && O(f)) {
                const {
                    propsDefaults: h
                } = s;
                n in h ? r = h[n] : (ht(s), r = h[n] = f.call(null, t), Qe())
            } else r = f
        }
        i[0] && (o && !l ? r = !1 : i[1] && (r === "" || r === gt(n)) && (r = !0))
    }
    return r
}

function Ls(e, t, n = !1) {
    const r = t.propsCache,
        s = r.get(e);
    if (s) return s;
    const o = e.props,
        i = {},
        l = [];
    let f = !1;
    if (!O(e)) {
        const p = a => {
            f = !0;
            const [c, T] = Ls(a, t, !0);
            Z(i, c), T && l.push(...T)
        };
        !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p)
    }
    if (!o && !f) return G(e) && r.set(e, it), it;
    if (F(o))
        for (let p = 0; p < o.length; p++) {
            const a = ft(o[p]);
            Mr(a) && (i[a] = U)
        } else if (o)
            for (const p in o) {
                const a = ft(p);
                if (Mr(a)) {
                    const c = o[p],
                        T = i[a] = F(c) || O(c) ? {
                            type: c
                        } : Z({}, c);
                    if (T) {
                        const S = Nr(Boolean, T.type),
                            $ = Nr(String, T.type);
                        T[0] = S > -1, T[1] = $ < 0 || S < $, (S > -1 || N(T, "default")) && l.push(a)
                    }
                }
            }
    const h = [i, l];
    return G(e) && r.set(e, h), h
}

function Mr(e) {
    return e[0] !== "$"
}

function $r(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}

function Dr(e, t) {
    return $r(e) === $r(t)
}

function Nr(e, t) {
    return F(t) ? t.findIndex(n => Dr(n, e)) : O(t) && Dr(t, e) ? 0 : -1
}
const Bs = e => e[0] === "_" || e === "$stable",
    cr = e => F(e) ? e.map(Ce) : [Ce(e)],
    Ri = (e, t, n) => {
        if (t._n) return t;
        const r = Zo((...s) => cr(t(...s)), n);
        return r._c = !1, r
    },
    Hs = (e, t, n) => {
        const r = e._ctx;
        for (const s in e) {
            if (Bs(s)) continue;
            const o = e[s];
            if (O(o)) t[s] = Ri(s, o, r);
            else if (o != null) {
                const i = cr(o);
                t[s] = () => i
            }
        }
    },
    Ks = (e, t) => {
        const n = cr(t);
        e.slots.default = () => n
    },
    Fi = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? (e.slots = B(t), Xt(t, "_", n)) : Hs(t, e.slots = {})
        } else e.slots = {}, t && Ks(e, t);
        Xt(e.slots, wn, 1)
    },
    Pi = (e, t, n) => {
        const {
            vnode: r,
            slots: s
        } = e;
        let o = !0,
            i = U;
        if (r.shapeFlag & 32) {
            const l = t._;
            l ? n && l === 1 ? o = !1 : (Z(s, t), !n && l === 1 && delete s._) : (o = !t.$stable, Hs(t, s)), i = t
        } else t && (Ks(e, t), i = {
            default: 1
        });
        if (o)
            for (const l in s) !Bs(l) && i[l] == null && delete s[l]
    };

function Jn(e, t, n, r, s = !1) {
    if (F(e)) {
        e.forEach((c, T) => Jn(c, t && (F(t) ? t[T] : t), n, r, s));
        return
    }
    if (Wt(r) && !s) return;
    const o = r.shapeFlag & 4 ? bn(r.component) || r.component.proxy : r.el,
        i = s ? null : o,
        {
            i: l,
            r: f
        } = e,
        h = t && t.r,
        p = l.refs === U ? l.refs = {} : l.refs,
        a = l.setupState;
    if (h != null && h !== f && (Q(h) ? (p[h] = null, N(a, h) && (a[h] = null)) : J(h) && (h.value = null)), O(f)) Ne(f, l, 12, [i, p]);
    else {
        const c = Q(f),
            T = J(f);
        if (c || T) {
            const S = () => {
                if (e.f) {
                    const $ = c ? N(a, f) ? a[f] : p[f] : f.value;
                    s ? F($) && Yn($, o) : F($) ? $.includes(o) || $.push(o) : c ? (p[f] = [o], N(a, f) && (a[f] = p[f])) : (f.value = [o], e.k && (p[e.k] = f.value))
                } else c ? (p[f] = i, N(a, f) && (a[f] = i)) : T && (f.value = i, e.k && (p[e.k] = i))
            };
            i ? (S.id = -1, ue(S, n)) : S()
        }
    }
}
const ue = oi;

function Oi(e) {
    return Si(e)
}

function Si(e, t) {
    const n = Bn();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: s,
        patchProp: o,
        createElement: i,
        createText: l,
        createComment: f,
        setText: h,
        setElementText: p,
        parentNode: a,
        nextSibling: c,
        setScopeId: T = xe,
        insertStaticContent: S
    } = e, $ = (u, d, m, y = null, v = null, b = null, A = !1, w = null, C = !!d.dynamicChildren) => {
        if (u === d) return;
        u && !bt(u, d) && (y = Nt(u), _e(u, v, b, !0), u = null), d.patchFlag === -2 && (C = !1, d.dynamicChildren = null);
        const {
            type: _,
            ref: I,
            shapeFlag: k
        } = d;
        switch (_) {
            case _n:
                V(u, d, m, y);
                break;
            case Ze:
                Y(u, d, m, y);
                break;
            case Sn:
                u == null && X(d, m, y, A);
                break;
            case ne:
                Mt(u, d, m, y, v, b, A, w, C);
                break;
            default:
                k & 1 ? ve(u, d, m, y, v, b, A, w, C) : k & 6 ? $t(u, d, m, y, v, b, A, w, C) : (k & 64 || k & 128) && _.process(u, d, m, y, v, b, A, w, C, tt)
        }
        I != null && v && Jn(I, u && u.ref, b, d || u, !d)
    }, V = (u, d, m, y) => {
        if (u == null) r(d.el = l(d.children), m, y);
        else {
            const v = d.el = u.el;
            d.children !== u.children && h(v, d.children)
        }
    }, Y = (u, d, m, y) => {
        u == null ? r(d.el = f(d.children || ""), m, y) : d.el = u.el
    }, X = (u, d, m, y) => {
        [u.el, u.anchor] = S(u.children, d, m, y, u.el, u.anchor)
    }, ee = ({
        el: u,
        anchor: d
    }, m, y) => {
        let v;
        for (; u && u !== d;) v = c(u), r(u, m, y), u = v;
        r(d, m, y)
    }, M = ({
        el: u,
        anchor: d
    }) => {
        let m;
        for (; u && u !== d;) m = c(u), s(u), u = m;
        s(d)
    }, ve = (u, d, m, y, v, b, A, w, C) => {
        A = A || d.type === "svg", u == null ? et(d, m, y, v, b, A, w, C) : Tn(u, d, v, b, A, w, C)
    }, et = (u, d, m, y, v, b, A, w) => {
        let C, _;
        const {
            type: I,
            props: k,
            shapeFlag: R,
            transition: P,
            dirs: D
        } = u;
        if (C = u.el = i(u.type, b, k && k.is, k), R & 8 ? p(C, u.children) : R & 16 && Se(u.children, C, null, y, v, b && I !== "foreignObject", A, w), D && Ue(u, null, y, "created"), vt(C, u, u.scopeId, A, y), k) {
            for (const H in k) H !== "value" && !jt(H) && o(C, H, null, k[H], b, u.children, y, v, Ie);
            "value" in k && o(C, "value", null, k.value), (_ = k.onVnodeBeforeMount) && be(_, y, u)
        }
        D && Ue(u, null, y, "beforeMount");
        const q = Ei(v, P);
        q && P.beforeEnter(C), r(C, d, m), ((_ = k && k.onVnodeMounted) || q || D) && ue(() => {
            _ && be(_, y, u), q && P.enter(C), D && Ue(u, null, y, "mounted")
        }, v)
    }, vt = (u, d, m, y, v) => {
        if (m && T(u, m), y)
            for (let b = 0; b < y.length; b++) T(u, y[b]);
        if (v) {
            let b = v.subTree;
            if (d === b) {
                const A = v.vnode;
                vt(u, A, A.scopeId, A.slotScopeIds, v.parent)
            }
        }
    }, Se = (u, d, m, y, v, b, A, w, C = 0) => {
        for (let _ = C; _ < u.length; _++) {
            const I = u[_] = w ? $e(u[_]) : Ce(u[_]);
            $(null, I, d, m, y, v, b, A, w)
        }
    }, Tn = (u, d, m, y, v, b, A) => {
        const w = d.el = u.el;
        let {
            patchFlag: C,
            dynamicChildren: _,
            dirs: I
        } = d;
        C |= u.patchFlag & 16;
        const k = u.props || U,
            R = d.props || U;
        let P;
        m && Ge(m, !1), (P = R.onVnodeBeforeUpdate) && be(P, m, d, u), I && Ue(d, u, m, "beforeUpdate"), m && Ge(m, !0);
        const D = v && d.type !== "foreignObject";
        if (_ ? He(u.dynamicChildren, _, w, m, y, D, b) : A || K(u, d, w, null, m, y, D, b, !1), C > 0) {
            if (C & 16) _t(w, d, k, R, m, y, v);
            else if (C & 2 && k.class !== R.class && o(w, "class", null, R.class, v), C & 4 && o(w, "style", k.style, R.style, v), C & 8) {
                const q = d.dynamicProps;
                for (let H = 0; H < q.length; H++) {
                    const z = q[H],
                        de = k[z],
                        nt = R[z];
                    (nt !== de || z === "value") && o(w, z, de, nt, v, u.children, m, y, Ie)
                }
            }
            C & 1 && u.children !== d.children && p(w, d.children)
        } else !A && _ == null && _t(w, d, k, R, m, y, v);
        ((P = R.onVnodeUpdated) || I) && ue(() => {
            P && be(P, m, d, u), I && Ue(d, u, m, "updated")
        }, y)
    }, He = (u, d, m, y, v, b, A) => {
        for (let w = 0; w < d.length; w++) {
            const C = u[w],
                _ = d[w],
                I = C.el && (C.type === ne || !bt(C, _) || C.shapeFlag & 70) ? a(C.el) : m;
            $(C, _, I, null, y, v, b, A, !0)
        }
    }, _t = (u, d, m, y, v, b, A) => {
        if (m !== y) {
            if (m !== U)
                for (const w in m) !jt(w) && !(w in y) && o(u, w, m[w], null, A, d.children, v, b, Ie);
            for (const w in y) {
                if (jt(w)) continue;
                const C = y[w],
                    _ = m[w];
                C !== _ && w !== "value" && o(u, w, _, C, A, d.children, v, b, Ie)
            }
            "value" in y && o(u, "value", m.value, y.value)
        }
    }, Mt = (u, d, m, y, v, b, A, w, C) => {
        const _ = d.el = u ? u.el : l(""),
            I = d.anchor = u ? u.anchor : l("");
        let {
            patchFlag: k,
            dynamicChildren: R,
            slotScopeIds: P
        } = d;
        P && (w = w ? w.concat(P) : P), u == null ? (r(_, m, y), r(I, m, y), Se(d.children, m, I, v, b, A, w, C)) : k > 0 && k & 64 && R && u.dynamicChildren ? (He(u.dynamicChildren, R, m, v, b, A, w), (d.key != null || v && d === v.subTree) && qs(u, d, !0)) : K(u, d, m, I, v, b, A, w, C)
    }, $t = (u, d, m, y, v, b, A, w, C) => {
        d.slotScopeIds = w, u == null ? d.shapeFlag & 512 ? v.ctx.activate(d, m, y, A, C) : xn(d, m, y, v, b, A, C) : pr(u, d, C)
    }, xn = (u, d, m, y, v, b, A) => {
        const w = u.component = Gi(u, y, v);
        if (Ps(u) && (w.ctx.renderer = tt), ji(w), w.asyncDep) {
            if (v && v.registerDep(w, ie), !u.el) {
                const C = w.subTree = ke(Ze);
                Y(null, C, d, m)
            }
            return
        }
        ie(w, u, d, m, v, b, A)
    }, pr = (u, d, m) => {
        const y = d.component = u.component;
        if (ti(u, d, m))
            if (y.asyncDep && !y.asyncResolved) {
                j(y, d, m);
                return
            } else y.next = d, Wo(y.update), y.update();
        else d.el = u.el, y.vnode = d
    }, ie = (u, d, m, y, v, b, A) => {
        const w = () => {
                if (u.isMounted) {
                    let {
                        next: I,
                        bu: k,
                        u: R,
                        parent: P,
                        vnode: D
                    } = u, q = I, H;
                    Ge(u, !1), I ? (I.el = D.el, j(u, I, A)) : I = D, k && Vt(k), (H = I.props && I.props.onVnodeBeforeUpdate) && be(H, P, I, D), Ge(u, !0);
                    const z = Pn(u),
                        de = u.subTree;
                    u.subTree = z, $(de, z, a(de.el), Nt(de), u, v, b), I.el = z.el, q === null && ni(u, z.el), R && ue(R, v), (H = I.props && I.props.onVnodeUpdated) && ue(() => be(H, P, I, D), v)
                } else {
                    let I;
                    const {
                        el: k,
                        props: R
                    } = d, {
                        bm: P,
                        m: D,
                        parent: q
                    } = u, H = Wt(d);
                    if (Ge(u, !1), P && Vt(P), !H && (I = R && R.onVnodeBeforeMount) && be(I, q, d), Ge(u, !0), k && In) {
                        const z = () => {
                            u.subTree = Pn(u), In(k, u.subTree, u, v, null)
                        };
                        H ? d.type.__asyncLoader().then(() => !u.isUnmounted && z()) : z()
                    } else {
                        const z = u.subTree = Pn(u);
                        $(null, z, m, y, u, v, b), d.el = z.el
                    }
                    if (D && ue(D, v), !H && (I = R && R.onVnodeMounted)) {
                        const z = d;
                        ue(() => be(I, q, z), v)
                    }(d.shapeFlag & 256 || q && Wt(q.vnode) && q.vnode.shapeFlag & 256) && u.a && ue(u.a, v), u.isMounted = !0, d = m = y = null
                }
            },
            C = u.effect = new nr(w, () => ar(_), u.scope),
            _ = u.update = () => C.run();
        _.id = u.uid, Ge(u, !0), _()
    }, j = (u, d, m) => {
        d.component = u;
        const y = u.vnode.props;
        u.vnode = d, u.next = null, Ii(u, d.props, y, m), Pi(u, d.children, m), mt(), Rr(u), yt()
    }, K = (u, d, m, y, v, b, A, w, C = !1) => {
        const _ = u && u.children,
            I = u ? u.shapeFlag : 0,
            k = d.children,
            {
                patchFlag: R,
                shapeFlag: P
            } = d;
        if (R > 0) {
            if (R & 128) {
                Dt(_, k, m, y, v, b, A, w, C);
                return
            } else if (R & 256) {
                Ke(_, k, m, y, v, b, A, w, C);
                return
            }
        }
        P & 8 ? (I & 16 && Ie(_, v, b), k !== _ && p(m, k)) : I & 16 ? P & 16 ? Dt(_, k, m, y, v, b, A, w, C) : Ie(_, v, b, !0) : (I & 8 && p(m, ""), P & 16 && Se(k, m, y, v, b, A, w, C))
    }, Ke = (u, d, m, y, v, b, A, w, C) => {
        u = u || it, d = d || it;
        const _ = u.length,
            I = d.length,
            k = Math.min(_, I);
        let R;
        for (R = 0; R < k; R++) {
            const P = d[R] = C ? $e(d[R]) : Ce(d[R]);
            $(u[R], P, m, null, v, b, A, w, C)
        }
        _ > I ? Ie(u, v, b, !0, !1, k) : Se(d, m, y, v, b, A, w, C, k)
    }, Dt = (u, d, m, y, v, b, A, w, C) => {
        let _ = 0;
        const I = d.length;
        let k = u.length - 1,
            R = I - 1;
        for (; _ <= k && _ <= R;) {
            const P = u[_],
                D = d[_] = C ? $e(d[_]) : Ce(d[_]);
            if (bt(P, D)) $(P, D, m, null, v, b, A, w, C);
            else break;
            _++
        }
        for (; _ <= k && _ <= R;) {
            const P = u[k],
                D = d[R] = C ? $e(d[R]) : Ce(d[R]);
            if (bt(P, D)) $(P, D, m, null, v, b, A, w, C);
            else break;
            k--, R--
        }
        if (_ > k) {
            if (_ <= R) {
                const P = R + 1,
                    D = P < I ? d[P].el : y;
                for (; _ <= R;) $(null, d[_] = C ? $e(d[_]) : Ce(d[_]), m, D, v, b, A, w, C), _++
            }
        } else if (_ > R)
            for (; _ <= k;) _e(u[_], v, b, !0), _++;
        else {
            const P = _,
                D = _,
                q = new Map;
            for (_ = D; _ <= R; _++) {
                const fe = d[_] = C ? $e(d[_]) : Ce(d[_]);
                fe.key != null && q.set(fe.key, _)
            }
            let H, z = 0;
            const de = R - D + 1;
            let nt = !1,
                mr = 0;
            const wt = new Array(de);
            for (_ = 0; _ < de; _++) wt[_] = 0;
            for (_ = P; _ <= k; _++) {
                const fe = u[_];
                if (z >= de) {
                    _e(fe, v, b, !0);
                    continue
                }
                let we;
                if (fe.key != null) we = q.get(fe.key);
                else
                    for (H = D; H <= R; H++)
                        if (wt[H - D] === 0 && bt(fe, d[H])) {
                            we = H;
                            break
                        } we === void 0 ? _e(fe, v, b, !0) : (wt[we - D] = _ + 1, we >= mr ? mr = we : nt = !0, $(fe, d[we], m, null, v, b, A, w, C), z++)
            }
            const yr = nt ? Mi(wt) : it;
            for (H = yr.length - 1, _ = de - 1; _ >= 0; _--) {
                const fe = D + _,
                    we = d[fe],
                    vr = fe + 1 < I ? d[fe + 1].el : y;
                wt[_] === 0 ? $(null, we, m, vr, v, b, A, w, C) : nt && (H < 0 || _ !== yr[H] ? qe(we, m, vr, 2) : H--)
            }
        }
    }, qe = (u, d, m, y, v = null) => {
        const {
            el: b,
            type: A,
            transition: w,
            children: C,
            shapeFlag: _
        } = u;
        if (_ & 6) {
            qe(u.component.subTree, d, m, y);
            return
        }
        if (_ & 128) {
            u.suspense.move(d, m, y);
            return
        }
        if (_ & 64) {
            A.move(u, d, m, tt);
            return
        }
        if (A === ne) {
            r(b, d, m);
            for (let k = 0; k < C.length; k++) qe(C[k], d, m, y);
            r(u.anchor, d, m);
            return
        }
        if (A === Sn) {
            ee(u, d, m);
            return
        }
        if (y !== 2 && _ & 1 && w)
            if (y === 0) w.beforeEnter(b), r(b, d, m), ue(() => w.enter(b), v);
            else {
                const {
                    leave: k,
                    delayLeave: R,
                    afterLeave: P
                } = w, D = () => r(b, d, m), q = () => {
                    k(b, () => {
                        D(), P && P()
                    })
                };
                R ? R(b, D, q) : q()
            }
        else r(b, d, m)
    }, _e = (u, d, m, y = !1, v = !1) => {
        const {
            type: b,
            props: A,
            ref: w,
            children: C,
            dynamicChildren: _,
            shapeFlag: I,
            patchFlag: k,
            dirs: R
        } = u;
        if (w != null && Jn(w, null, m, u, !0), I & 256) {
            d.ctx.deactivate(u);
            return
        }
        const P = I & 1 && R,
            D = !Wt(u);
        let q;
        if (D && (q = A && A.onVnodeBeforeUnmount) && be(q, d, u), I & 6) to(u.component, m, y);
        else {
            if (I & 128) {
                u.suspense.unmount(m, y);
                return
            }
            P && Ue(u, null, d, "beforeUnmount"), I & 64 ? u.type.remove(u, d, m, v, tt, y) : _ && (b !== ne || k > 0 && k & 64) ? Ie(_, d, m, !1, !0) : (b === ne && k & 384 || !v && I & 16) && Ie(C, d, m), y && hr(u)
        }(D && (q = A && A.onVnodeUnmounted) || P) && ue(() => {
            q && be(q, d, u), P && Ue(u, null, d, "unmounted")
        }, m)
    }, hr = u => {
        const {
            type: d,
            el: m,
            anchor: y,
            transition: v
        } = u;
        if (d === ne) {
            eo(m, y);
            return
        }
        if (d === Sn) {
            M(u);
            return
        }
        const b = () => {
            s(m), v && !v.persisted && v.afterLeave && v.afterLeave()
        };
        if (u.shapeFlag & 1 && v && !v.persisted) {
            const {
                leave: A,
                delayLeave: w
            } = v, C = () => A(m, b);
            w ? w(u.el, b, C) : C()
        } else b()
    }, eo = (u, d) => {
        let m;
        for (; u !== d;) m = c(u), s(u), u = m;
        s(d)
    }, to = (u, d, m) => {
        const {
            bum: y,
            scope: v,
            update: b,
            subTree: A,
            um: w
        } = u;
        y && Vt(y), v.stop(), b && (b.active = !1, _e(A, u, d, m)), w && ue(w, d), ue(() => {
            u.isUnmounted = !0
        }, d), d && d.pendingBranch && !d.isUnmounted && u.asyncDep && !u.asyncResolved && u.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve())
    }, Ie = (u, d, m, y = !1, v = !1, b = 0) => {
        for (let A = b; A < u.length; A++) _e(u[A], d, m, y, v)
    }, Nt = u => u.shapeFlag & 6 ? Nt(u.component.subTree) : u.shapeFlag & 128 ? u.suspense.next() : c(u.anchor || u.el), gr = (u, d, m) => {
        u == null ? d._vnode && _e(d._vnode, null, null, !0) : $(d._vnode || null, u, d, null, null, null, m), Rr(), As(), d._vnode = u
    }, tt = {
        p: $,
        um: _e,
        m: qe,
        r: hr,
        mt: xn,
        mc: Se,
        pc: K,
        pbc: He,
        n: Nt,
        o: e
    };
    let kn, In;
    return t && ([kn, In] = t(tt)), {
        render: gr,
        hydrate: kn,
        createApp: Ti(gr, kn)
    }
}

function Ge({
    effect: e,
    update: t
}, n) {
    e.allowRecurse = t.allowRecurse = n
}

function Ei(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}

function qs(e, t, n = !1) {
    const r = e.children,
        s = t.children;
    if (F(r) && F(s))
        for (let o = 0; o < r.length; o++) {
            const i = r[o];
            let l = s[o];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[o] = $e(s[o]), l.el = i.el), n || qs(i, l)), l.type === _n && (l.el = i.el)
        }
}

function Mi(e) {
    const t = e.slice(),
        n = [0];
    let r, s, o, i, l;
    const f = e.length;
    for (r = 0; r < f; r++) {
        const h = e[r];
        if (h !== 0) {
            if (s = n[n.length - 1], e[s] < h) {
                t[r] = s, n.push(r);
                continue
            }
            for (o = 0, i = n.length - 1; o < i;) l = o + i >> 1, e[n[l]] < h ? o = l + 1 : i = l;
            h < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), n[o] = r)
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0;) n[o] = i, i = t[i];
    return n
}
const $i = e => e.__isTeleport,
    ne = Symbol.for("v-fgt"),
    _n = Symbol.for("v-txt"),
    Ze = Symbol.for("v-cmt"),
    Sn = Symbol.for("v-stc"),
    kt = [];
let me = null;

function E(e = !1) {
    kt.push(me = e ? null : [])
}

function Di() {
    kt.pop(), me = kt[kt.length - 1] || null
}
let Pt = 1;

function Lr(e) {
    Pt += e
}

function Us(e) {
    return e.dynamicChildren = Pt > 0 ? me || it : null, Di(), Pt > 0 && me && me.push(e), e
}

function L(e, t, n, r, s, o) {
    return Us(x(e, t, n, r, s, o, !0))
}

function ot(e, t, n, r, s) {
    return Us(ke(e, t, n, r, s, !0))
}

function Ni(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function bt(e, t) {
    return e.type === t.type && e.key === t.key
}
const wn = "__vInternal",
    Gs = ({
        key: e
    }) => e ?? null,
    Qt = ({
        ref: e,
        ref_key: t,
        ref_for: n
    }) => (typeof e == "number" && (e = "" + e), e != null ? Q(e) || J(e) || O(e) ? {
        i: ge,
        r: e,
        k: t,
        f: !!n
    } : e : null);

function x(e, t = null, n = null, r = 0, s = null, o = e === ne ? 0 : 1, i = !1, l = !1) {
    const f = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Gs(t),
        ref: t && Qt(t),
        scopeId: mn,
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
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: ge
    };
    return l ? (fr(f, n), o & 128 && e.normalize(f)) : n && (f.shapeFlag |= Q(n) ? 8 : 16), Pt > 0 && !i && me && (f.patchFlag > 0 || o & 6) && f.patchFlag !== 32 && me.push(f), f
}
const ke = Li;

function Li(e, t = null, n = null, r = 0, s = null, o = !1) {
    if ((!e || e === ri) && (e = Ze), Ni(e)) {
        const l = pt(e, t, !0);
        return n && fr(l, n), Pt > 0 && !o && me && (l.shapeFlag & 6 ? me[me.indexOf(e)] = l : me.push(l)), l.patchFlag |= -2, l
    }
    if (Ji(e) && (e = e.__vccOpts), t) {
        t = Bi(t);
        let {
            class: l,
            style: f
        } = t;
        l && !Q(l) && (t.class = cn(l)), G(f) && (ms(f) && !F(f) && (f = Z({}, f)), t.style = un(f))
    }
    const i = Q(e) ? 1 : si(e) ? 128 : $i(e) ? 64 : G(e) ? 4 : O(e) ? 2 : 0;
    return x(e, t, n, r, s, i, o, !0)
}

function Bi(e) {
    return e ? ms(e) || wn in e ? Z({}, e) : e : null
}

function pt(e, t, n = !1) {
    const {
        props: r,
        ref: s,
        patchFlag: o,
        children: i
    } = e, l = t ? Ki(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && Gs(l),
        ref: t && t.ref ? n && s ? F(s) ? s.concat(Qt(t)) : [s, Qt(t)] : Qt(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== ne ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && pt(e.ssContent),
        ssFallback: e.ssFallback && pt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}

function Hi(e = " ", t = 0) {
    return ke(_n, null, e, t)
}

function re(e = "", t = !1) {
    return t ? (E(), ot(Ze, null, e)) : ke(Ze, null, e)
}

function Ce(e) {
    return e == null || typeof e == "boolean" ? ke(Ze) : F(e) ? ke(ne, null, e.slice()) : typeof e == "object" ? $e(e) : ke(_n, null, String(e))
}

function $e(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : pt(e)
}

function fr(e, t) {
    let n = 0;
    const {
        shapeFlag: r
    } = e;
    if (t == null) t = null;
    else if (F(t)) n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1), fr(e, s()), s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = t._;
            !s && !(wn in t) ? t._ctx = ge : s === 3 && ge && (ge.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        }
    else O(t) ? (t = {
        default: t,
        _ctx: ge
    }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Hi(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function Ki(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r)
            if (s === "class") t.class !== r.class && (t.class = cn([t.class, r.class]));
            else if (s === "style") t.style = un([t.style, r.style]);
        else if (on(s)) {
            const o = t[s],
                i = r[s];
            i && o !== i && !(F(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i)
        } else s !== "" && (t[s] = r[s])
    }
    return t
}

function be(e, t, n, r = null) {
    ye(e, t, 7, [n, r])
}
const qi = Ds();
let Ui = 0;

function Gi(e, t, n) {
    const r = e.type,
        s = (t ? t.appContext : e.appContext) || qi,
        o = {
            uid: Ui++,
            vnode: e,
            type: r,
            parent: t,
            appContext: s,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new mo(!0),
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
            propsOptions: Ls(r, s),
            emitsOptions: xs(r, s),
            emit: null,
            emitted: null,
            propsDefaults: U,
            inheritAttrs: r.inheritAttrs,
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
    return o.ctx = {
        _: o
    }, o.root = t ? t.root : o, o.emit = Xo.bind(null, o), e.ce && e.ce(o), o
}
let oe = null,
    dr, rt, Br = "__VUE_INSTANCE_SETTERS__";
(rt = Bn()[Br]) || (rt = Bn()[Br] = []), rt.push(e => oe = e), dr = e => {
    rt.length > 1 ? rt.forEach(t => t(e)) : rt[0](e)
};
const ht = e => {
        dr(e), e.scope.on()
    },
    Qe = () => {
        oe && oe.scope.off(), dr(null)
    };

function js(e) {
    return e.vnode.shapeFlag & 4
}
let Ot = !1;

function ji(e, t = !1) {
    Ot = t;
    const {
        props: n,
        children: r
    } = e.vnode, s = js(e);
    ki(e, n, s, t), Fi(e, r);
    const o = s ? Vi(e, t) : void 0;
    return Ot = !1, o
}

function Vi(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = ys(new Proxy(e.ctx, yi));
    const {
        setup: r
    } = n;
    if (r) {
        const s = e.setupContext = r.length > 1 ? Wi(e) : null;
        ht(e), mt();
        const o = Ne(r, e, 0, [e.props, s]);
        if (yt(), Qe(), Yr(o)) {
            if (o.then(Qe, Qe), t) return o.then(i => {
                Hr(e, i, t)
            }).catch(i => {
                hn(i, e, 0)
            });
            e.asyncDep = o
        } else Hr(e, o, t)
    } else Vs(e, t)
}

function Hr(e, t, n) {
    O(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : G(t) && (e.setupState = ws(t)), Vs(e, n)
}
let Kr;

function Vs(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && Kr && !r.render) {
            const s = r.template || ur(e).template;
            if (s) {
                const {
                    isCustomElement: o,
                    compilerOptions: i
                } = e.appContext.config, {
                    delimiters: l,
                    compilerOptions: f
                } = r, h = Z(Z({
                    isCustomElement: o,
                    delimiters: l
                }, i), f);
                r.render = Kr(s, h)
            }
        }
        e.render = r.render || xe
    } {
        ht(e), mt();
        try {
            vi(e)
        } finally {
            yt(), Qe()
        }
    }
}

function zi(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
        get(t, n) {
            return ce(e, "get", "$attrs"), t[n]
        }
    }))
}

function Wi(e) {
    const t = n => {
        e.exposed = n || {}
    };
    return {
        get attrs() {
            return zi(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}

function bn(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(ws(ys(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in xt) return xt[n](e)
        },
        has(t, n) {
            return n in t || n in xt
        }
    }))
}

function Ji(e) {
    return O(e) && "__vccOpts" in e
}
const Qi = (e, t) => Go(e, t, Ot),
    Xi = Symbol.for("v-scx"),
    Zi = () => Jt(Xi),
    Yi = "3.3.13",
    el = "http://www.w3.org/2000/svg",
    Ve = typeof document < "u" ? document : null,
    qr = Ve && Ve.createElement("template"),
    tl = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const s = t ? Ve.createElementNS(el, e) : Ve.createElement(e, n ? {
                is: n
            } : void 0);
            return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
        },
        createText: e => Ve.createTextNode(e),
        createComment: e => Ve.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => Ve.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, r, s, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (s && (s === o || s.nextSibling))
                for (; t.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling)););
            else {
                qr.innerHTML = r ? `<svg>${e}</svg>` : e;
                const l = qr.content;
                if (r) {
                    const f = l.firstChild;
                    for (; f.firstChild;) l.appendChild(f.firstChild);
                    l.removeChild(f)
                }
                t.insertBefore(l, n)
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    },
    nl = Symbol("_vtc");

function rl(e, t, n) {
    const r = e[nl];
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
const sl = Symbol("_vod"),
    ol = Symbol("");

function il(e, t, n) {
    const r = e.style,
        s = Q(n);
    if (n && !s) {
        if (t && !Q(t))
            for (const o in t) n[o] == null && Qn(r, o, "");
        for (const o in n) Qn(r, o, n[o])
    } else {
        const o = r.display;
        if (s) {
            if (t !== n) {
                const i = r[ol];
                i && (n += ";" + i), r.cssText = n
            }
        } else t && e.removeAttribute("style");
        sl in e && (r.display = o)
    }
}
const Ur = /\s*!important$/;

function Qn(e, t, n) {
    if (F(n)) n.forEach(r => Qn(e, t, r));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
        const r = ll(e, t);
        Ur.test(n) ? e.setProperty(gt(r), n.replace(Ur, ""), "important") : e[r] = n
    }
}
const Gr = ["Webkit", "Moz", "ms"],
    En = {};

function ll(e, t) {
    const n = En[t];
    if (n) return n;
    let r = ft(t);
    if (r !== "filter" && r in e) return En[t] = r;
    r = ns(r);
    for (let s = 0; s < Gr.length; s++) {
        const o = Gr[s] + r;
        if (o in e) return En[t] = o
    }
    return t
}
const jr = "http://www.w3.org/1999/xlink";

function al(e, t, n, r, s) {
    if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(jr, t.slice(6, t.length)) : e.setAttributeNS(jr, t, n);
    else {
        const o = po(t);
        n == null || o && !rs(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}

function ul(e, t, n, r, s, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        r && i(r, s, o), e[t] = n ?? "";
        return
    }
    const l = e.tagName;
    if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
        e._value = n;
        const h = l === "OPTION" ? e.getAttribute("value") : e.value,
            p = n ?? "";
        h !== p && (e.value = p), n == null && e.removeAttribute(t);
        return
    }
    let f = !1;
    if (n === "" || n == null) {
        const h = typeof e[t];
        h === "boolean" ? n = rs(n) : n == null && h === "string" ? (n = "", f = !0) : h === "number" && (n = 0, f = !0)
    }
    try {
        e[t] = n
    } catch {}
    f && e.removeAttribute(t)
}

function ze(e, t, n, r) {
    e.addEventListener(t, n, r)
}

function cl(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
const Vr = Symbol("_vei");

function fl(e, t, n, r, s = null) {
    const o = e[Vr] || (e[Vr] = {}),
        i = o[t];
    if (r && i) i.value = r;
    else {
        const [l, f] = dl(t);
        if (r) {
            const h = o[t] = gl(r, s);
            ze(e, l, h, f)
        } else i && (cl(e, l, i, f), o[t] = void 0)
    }
}
const zr = /(?:Once|Passive|Capture)$/;

function dl(e) {
    let t;
    if (zr.test(e)) {
        t = {};
        let r;
        for (; r = e.match(zr);) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : gt(e.slice(2)), t]
}
let Mn = 0;
const pl = Promise.resolve(),
    hl = () => Mn || (pl.then(() => Mn = 0), Mn = Date.now());

function gl(e, t) {
    const n = r => {
        if (!r._vts) r._vts = Date.now();
        else if (r._vts <= n.attached) return;
        ye(ml(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = hl(), n
}

function ml(e, t) {
    if (F(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(r => s => !s._stopped && r && r(s))
    } else return t
}
const Wr = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    yl = (e, t, n, r, s = !1, o, i, l, f) => {
        t === "class" ? rl(e, r, s) : t === "style" ? il(e, n, r) : on(t) ? Zn(t) || fl(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : vl(e, t, r, s)) ? ul(e, t, r, o, i, l, f) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), al(e, t, r, s))
    };

function vl(e, t, n, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Wr(t) && O(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
    if (t === "width" || t === "height") {
        const s = e.tagName;
        if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1
    }
    return Wr(t) && Q(n) ? !1 : t in e
}
const rn = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return F(t) ? n => Vt(t, n) : t
};

function _l(e) {
    e.target.composing = !0
}

function Jr(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}
const ct = Symbol("_assign"),
    te = {
        created(e, {
            modifiers: {
                lazy: t,
                trim: n,
                number: r
            }
        }, s) {
            e[ct] = rn(s);
            const o = r || s.props && s.props.type === "number";
            ze(e, t ? "change" : "input", i => {
                if (i.target.composing) return;
                let l = e.value;
                n && (l = l.trim()), o && (l = Zt(l)), e[ct](l)
            }), n && ze(e, "change", () => {
                e.value = e.value.trim()
            }), t || (ze(e, "compositionstart", _l), ze(e, "compositionend", Jr), ze(e, "change", Jr))
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
                trim: r,
                number: s
            }
        }, o) {
            if (e[ct] = rn(o), e.composing) return;
            const i = s || e.type === "number" ? Zt(e.value) : e.value,
                l = t ?? "";
            i !== l && (document.activeElement === e && e.type !== "range" && (n || r && e.value.trim() === l) || (e.value = l))
        }
    },
    $n = {
        deep: !0,
        created(e, {
            value: t,
            modifiers: {
                number: n
            }
        }, r) {
            const s = ln(t);
            ze(e, "change", () => {
                const o = Array.prototype.filter.call(e.options, i => i.selected).map(i => n ? Zt(sn(i)) : sn(i));
                e[ct](e.multiple ? s ? new Set(o) : o : o[0])
            }), e[ct] = rn(r)
        },
        mounted(e, {
            value: t
        }) {
            Qr(e, t)
        },
        beforeUpdate(e, t, n) {
            e[ct] = rn(n)
        },
        updated(e, {
            value: t
        }) {
            Qr(e, t)
        }
    };

function Qr(e, t) {
    const n = e.multiple;
    if (!(n && !F(t) && !ln(t))) {
        for (let r = 0, s = e.options.length; r < s; r++) {
            const o = e.options[r],
                i = sn(o);
            if (n) F(t) ? o.selected = go(t, i) > -1 : o.selected = t.has(i);
            else if (fn(sn(o), t)) {
                e.selectedIndex !== r && (e.selectedIndex = r);
                return
            }
        }!n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
    }
}

function sn(e) {
    return "_value" in e ? e._value : e.value
}
const wl = Z({
    patchProp: yl
}, tl);
let Xr;

function bl() {
    return Xr || (Xr = Oi(wl))
}
const Cl = (...e) => {
    const t = bl().createApp(...e),
        {
            mount: n
        } = t;
    return t.mount = r => {
        const s = Al(r);
        if (!s) return;
        const o = t._component;
        !O(o) && !o.render && !o.template && (o.template = s.innerHTML), s.innerHTML = "";
        const i = n(s, !1, s instanceof SVGElement);
        return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i
    }, t
};

function Al(e) {
    return Q(e) ? document.querySelector(e) : e
}
const Tl = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20448%20512'%3e%3c!--!Font%20Awesome%20Free%206.5.1%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202024%20Fonticons,%20Inc.--%3e%3cpath%20fill='white'%20d='M0%2096C0%2078.3%2014.3%2064%2032%2064H416c17.7%200%2032%2014.3%2032%2032s-14.3%2032-32%2032H32C14.3%20128%200%20113.7%200%2096zM0%20256c0-17.7%2014.3-32%2032-32H416c17.7%200%2032%2014.3%2032%2032s-14.3%2032-32%2032H32c-17.7%200-32-14.3-32-32zM448%20416c0%2017.7-14.3%2032-32%2032H32c-17.7%200-32-14.3-32-32s14.3-32%2032-32H416c17.7%200%2032%2014.3%2032%2032z'/%3e%3c/svg%3e";
let zs = null;

function Ws() {
    return zs
}

function Zr(e) {
    zs = e
}
let Js = 0;

function xl() {
    return Js
}

function kl() {
    Js++
}
let Qs = "";

function St() {
    return Qs
}

function Dn(e) {
    Qs = e
}
let Xs = "";

function Il() {
    return Xs
}

function Nn(e) {
    Xs = e
}
let Zs = "";

function st() {
    return Zs
}

function Ln(e) {
    Zs = e
}
let Me = ae(!1),
    Ae = ae("");
fetch("https://raw.githubusercontent.com/FormicAcidGD/fsm/master/backend").then(e => {
    e.text().then(t => {
        Ae.value = t
    })
});
async function Rl() {
    let e = await fetch(Ae.value + "/plans", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: St()
        }
    });
    return e.status != 200 ? (Me.value = !1, []) : await e.json()
}
async function Fl(e) {
    await fetch(Ae.value + "/change", {
        method: "POST",
        body: JSON.stringify(e),
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: St()
        }
    })
}
async function Pl(e) {
    await fetch(Ae.value + "/hide", {
        method: "POST",
        body: JSON.stringify(e),
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: St()
        }
    })
}
const Ol = {
        class: "name"
    },
    Sl = ["selected"],
    El = ["selected"],
    Ml = ["selected"],
    $l = ["selected"],
    Dl = ["selected"],
    Nl = ["selected"],
    Ll = ["selected"],
    Bl = ["selected"],
    Hl = ["selected"],
    Kl = ["selected"],
    ql = ["selected"],
    Ul = ["selected"],
    Gl = ["selected"],
    jl = ["selected"],
    Vl = ["selected"],
    zl = ["selected"],
    Wl = ["selected"],
    Jl = yn({
        __name: "Aircraft",
        props: {
            aircraft: {},
            type: {}
        },
        setup(e) {
            let t = ae();
            ae();

            function n() {
                confirm(`Hide "${r.aircraft.callsign}"?`) && (r.aircraft.hidden = !0, Pl({
                    id: r.aircraft.id,
                    roomSecret: St()
                }))
            }
            let r = e,
                s = ae(r.aircraft),
                o = (p, a) => {
                    let c = {
                        id: p.id,
                        roomSecret: St()
                    };
                    return a == "acft" && (c.type = p.type), a == "alt" && (c.altitude = p.altitude), a == "arriving" && (c.arriving = p.arriving), a == "callsign" && (c.callsign = p.callsign), a == "departing" && (c.departing = p.departing), a == "free" && (c.free = p.free), a == "gate" && (c.gate = p.gate), a == "route" && (c.route = p.route), a == "runway" && (c.runway = p.runway), a == "squawk" && (c.squawk = p.squawk), a == "status" && (c.status = p.status), a == "a_alt" && (c.a_alt = p.a_alt), a == "a_hdg" && (c.a_hdg = p.a_hdg), Fl(c), p
                };

            function i(p) {
                Zr({
                    id: s.value.id,
                    selectionType: p
                })
            }

            function l(p) {
                let a = Ws();
                a != null && a.id == s.value.id && a.selectionType == p && Zr(null)
            }

            function f() {
                s.value.squawk == "r" && (s.value.squawk = `${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}`), o(s.value, "squawk")
            }

            function h() {
                s.value.a_hdg == "l" && (s.value.a_hdg = "LNAV"), o(s.value, "a_hdg")
            }
            return (p, a) => (E(), L("div", {
                class: cn(["aircraft", p.type])
            }, [W(x("input", {
                type: "text",
                placeholder: "Callsign",
                class: "callsign",
                rows: "2",
                "onUpdate:modelValue": a[0] || (a[0] = c => g(s).callsign = c),
                onChange: a[1] || (a[1] = c => g(o)(g(s), "callsign")),
                onFocus: a[2] || (a[2] = c => i("callsign")),
                onBlur: a[3] || (a[3] = c => l("callsign")),
                onKeyup: a[4] || (a[4] = c => g(o)(g(s), "callsign"))
            }, null, 544), [
                [te, g(s).callsign]
            ]), x("div", Ol, [x("p", null, "@" + Fe(g(s).username), 1)]), W(x("input", {
                type: "text",
                placeholder: "Departing",
                class: "departing",
                "onUpdate:modelValue": a[5] || (a[5] = c => g(s).departing = c),
                onChange: a[6] || (a[6] = c => g(o)(g(s), "departing")),
                onFocus: a[7] || (a[7] = c => i("departing")),
                onBlur: a[8] || (a[8] = c => l("departing")),
                onKeyup: a[9] || (a[9] = c => g(o)(g(s), "departing"))
            }, null, 544), [
                [te, g(s).departing]
            ]), W(x("input", {
                type: "text",
                placeholder: "Arriving",
                class: "arriving",
                "onUpdate:modelValue": a[10] || (a[10] = c => g(s).arriving = c),
                onChange: a[11] || (a[11] = c => g(o)(g(s), "arriving")),
                onFocus: a[12] || (a[12] = c => i("arriving")),
                onBlur: a[13] || (a[13] = c => l("arriving")),
                onKeyup: a[14] || (a[14] = c => g(o)(g(s), "arriving"))
            }, null, 544), [
                [te, g(s).arriving]
            ]), W(x("input", {
                type: "text",
                placeholder: "Filed Altitude",
                class: "altitude",
                "onUpdate:modelValue": a[15] || (a[15] = c => g(s).altitude = c),
                onChange: a[16] || (a[16] = c => g(o)(g(s), "alt")),
                onFocus: a[17] || (a[17] = c => i("alt")),
                onBlur: a[18] || (a[18] = c => l("alt")),
                onKeyup: a[19] || (a[19] = c => g(o)(g(s), "alt"))
            }, null, 544), [
                [te, g(s).altitude]
            ]), W(x("input", {
                type: "text",
                placeholder: "Gate",
                class: "gate",
                "onUpdate:modelValue": a[20] || (a[20] = c => g(s).gate = c),
                onChange: a[21] || (a[21] = c => g(o)(g(s), "gate")),
                onFocus: a[22] || (a[22] = c => i("gate")),
                onBlur: a[23] || (a[23] = c => l("gate")),
                onKeyup: a[24] || (a[24] = c => g(o)(g(s), "gate"))
            }, null, 544), [
                [te, g(s).gate]
            ]), W(x("input", {
                type: "text",
                placeholder: "Squawk",
                ref_key: "squawk",
                ref: t,
                class: "squawk",
                "onUpdate:modelValue": a[25] || (a[25] = c => g(s).squawk = c),
                onChange: f,
                onFocus: a[26] || (a[26] = c => i("squawk")),
                onBlur: a[27] || (a[27] = c => l("squawk")),
                onKeyup: f
            }, null, 544), [
                [te, g(s).squawk]
            ]), W(x("input", {
                type: "text",
                placeholder: "Aircraft",
                class: "type",
                "onUpdate:modelValue": a[28] || (a[28] = c => g(s).type = c),
                onChange: a[29] || (a[29] = c => g(o)(g(s), "acft")),
                onFocus: a[30] || (a[30] = c => i("acft")),
                onBlur: a[31] || (a[31] = c => l("acft")),
                onKeyup: a[32] || (a[32] = c => g(o)(g(s), "acft"))
            }, null, 544), [
                [te, g(s).type]
            ]), g(r).type == "outbound" ? W((E(), L("select", {
                key: 0,
                class: "status",
                onChange: a[33] || (a[33] = c => g(o)(g(s), "status")),
                onFocus: a[34] || (a[34] = c => i("status")),
                onBlur: a[35] || (a[35] = c => l("status")),
                "onUpdate:modelValue": a[36] || (a[36] = c => g(s).status = c)
            }, [x("option", {
                selected: g(s).status == "PARKED"
            }, "PARKED", 8, Sl), x("option", {
                selected: g(s).status == "CLEARED"
            }, "CLEARED", 8, El), x("option", {
                selected: g(s).status == "PUSH"
            }, "PUSH", 8, Ml), x("option", {
                selected: g(s).status == "TAXI"
            }, "TAXI", 8, $l), x("option", {
                selected: g(s).status == "HOLDING"
            }, "HOLDING", 8, Dl), x("option", {
                selected: g(s).status == "LINEUP"
            }, "LINEUP", 8, Nl), x("option", {
                selected: g(s).status == "TAKEOFF"
            }, "TAKEOFF", 8, Ll)], 544)), [
                [$n, g(s).status]
            ]) : re("", !0), g(r).type == "inbound" ? W((E(), L("select", {
                key: 1,
                class: "status",
                onChange: a[37] || (a[37] = c => g(o)(g(s), "status")),
                onFocus: a[38] || (a[38] = c => i("status")),
                onBlur: a[39] || (a[39] = c => l("status")),
                "onUpdate:modelValue": a[40] || (a[40] = c => g(s).status = c)
            }, [x("option", {
                selected: g(s).status == "LANDING"
            }, "LANDING", 8, Bl), x("option", {
                selected: g(s).status == "TAXI"
            }, "TAXI", 8, Hl), x("option", {
                selected: g(s).status == "PARKED"
            }, "PARKED", 8, Kl)], 544)), [
                [$n, g(s).status]
            ]) : re("", !0), g(r).type == "vfr" ? W((E(), L("select", {
                key: 2,
                class: "status",
                onChange: a[41] || (a[41] = c => g(o)(g(s), "status")),
                onFocus: a[42] || (a[42] = c => i("status")),
                onBlur: a[43] || (a[43] = c => l("status")),
                "onUpdate:modelValue": a[44] || (a[44] = c => g(s).status = c)
            }, [x("option", {
                selected: g(s).status == "PARKED"
            }, "PARKED", 8, ql), x("option", {
                selected: g(s).status == "TAXI"
            }, "TAXI", 8, Ul), x("option", {
                selected: g(s).status == "HOLDING"
            }, "HOLDING", 8, Gl), x("option", {
                selected: g(s).status == "LEFT CIRCUIT"
            }, "LEFT CIRCUIT", 8, jl), x("option", {
                selected: g(s).status == "RIGHT CIRCUIT"
            }, "RIGHT CIRCUIT", 8, Vl), x("option", {
                selected: g(s).status == "VFR"
            }, "VFR", 8, zl), x("option", {
                selected: g(s).status == "LANDING"
            }, "LANDING", 8, Wl)], 544)), [
                [$n, g(s).status]
            ]) : re("", !0), W(x("input", {
                type: "text",
                placeholder: "Route",
                class: "route",
                "onUpdate:modelValue": a[45] || (a[45] = c => g(s).route = c),
                onChange: a[46] || (a[46] = c => g(o)(g(s), "route")),
                onFocus: a[47] || (a[47] = c => i("route")),
                onBlur: a[48] || (a[48] = c => l("route")),
                onKeyup: a[49] || (a[49] = c => g(o)(g(s), "route"))
            }, null, 544), [
                [te, g(s).route]
            ]), p.type != "overflying" ? W((E(), L("input", {
                key: 3,
                type: "text",
                placeholder: "Runway",
                class: "runway",
                "onUpdate:modelValue": a[50] || (a[50] = c => g(s).runway = c),
                onChange: a[51] || (a[51] = c => g(o)(g(s), "runway")),
                onFocus: a[52] || (a[52] = c => i("runway")),
                onBlur: a[53] || (a[53] = c => l("runway")),
                onKeyup: a[54] || (a[54] = c => g(o)(g(s), "runway"))
            }, null, 544)), [
                [te, g(s).runway]
            ]) : re("", !0), W(x("input", {
                type: "text",
                placeholder: "Free Text",
                class: "free",
                "onUpdate:modelValue": a[55] || (a[55] = c => g(s).free = c),
                onChange: a[56] || (a[56] = c => g(o)(g(s), "free")),
                onFocus: a[57] || (a[57] = c => i("free")),
                onBlur: a[58] || (a[58] = c => l("free")),
                onKeyup: a[59] || (a[59] = c => g(o)(g(s), "free"))
            }, null, 544), [
                [te, g(s).free]
            ]), W(x("input", {
                type: "text",
                placeholder: "Asg. Altitude",
                class: "a_altitude",
                "onUpdate:modelValue": a[60] || (a[60] = c => g(s).a_alt = c),
                onChange: a[61] || (a[61] = c => g(o)(g(s), "a_alt")),
                onFocus: a[62] || (a[62] = c => i("a_alt")),
                onBlur: a[63] || (a[63] = c => l("a_alt")),
                onKeyup: a[64] || (a[64] = c => g(o)(g(s), "a_alt"))
            }, null, 544), [
                [te, g(s).a_alt]
            ]), W(x("input", {
                type: "text",
                placeholder: "Asg. Heading",
                class: "a_heading",
                "onUpdate:modelValue": a[65] || (a[65] = c => g(s).a_hdg = c),
                onChange: h,
                onFocus: a[66] || (a[66] = c => i("a_hdg")),
                onBlur: a[67] || (a[67] = c => l("a_hdg")),
                onKeyup: h
            }, null, 544), [
                [te, g(s).a_hdg]
            ]), x("button", {
                class: "delete",
                onClick: n
            }, "Hide")], 2))
        }
    }),
    Cn = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [r, s] of t) n[r] = s;
        return n
    },
    Gt = Cn(Jl, [
        ["__scopeId", "data-v-483b6722"]
    ]);
let Ql = "0.1.3",
    Xl = {
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
    Zl = Object.keys(Xl);
const Ye = e => (ks("data-v-488c9d7f"), e = e(), Is(), e),
    Yl = {
        key: 0,
        class: "sidebar"
    },
    ea = Ye(() => x("p", {
        class: "active"
    }, "Flight Strip Manager", -1)),
    ta = [ea],
    na = {
        class: "nav"
    },
    ra = {
        class: "logowrap"
    },
    sa = Ye(() => x("a", {
        href: "/fsm/",
        class: "logo"
    }, "FSM by FormicAcid", -1)),
    oa = {
        class: "version"
    },
    ia = Ye(() => x("a", {
        href: "https://discord.gg/8tSu4ewdsM",
        class: "version dc",
        target: "_blank"
    }, "Discord", -1)),
    la = {
        class: "top"
    },
    aa = {
        class: "id"
    },
    ua = {
        key: 1,
        class: "all"
    },
    ca = {
        class: "acftList"
    },
    fa = Ye(() => x("h1", null, "Arriving", -1)),
    da = {
        class: "list"
    },
    pa = {
        class: "acft"
    },
    ha = {
        class: "acftList"
    },
    ga = Ye(() => x("h1", null, "Departing", -1)),
    ma = {
        class: "list"
    },
    ya = {
        class: "acft"
    },
    va = {
        class: "acftList"
    },
    _a = Ye(() => x("h1", null, "VFR", -1)),
    wa = {
        class: "list"
    },
    ba = {
        class: "acft"
    },
    Ca = {
        class: "acftList"
    },
    Aa = Ye(() => x("h1", null, "Other Traffic", -1)),
    Ta = {
        class: "list"
    },
    xa = {
        class: "acft"
    },
    ka = yn({
        __name: "List",
        setup(e) {
            function t(h) {
                let p = h + "=",
                    c = decodeURIComponent(document.cookie).split(";");
                for (let T = 0; T < c.length; T++) {
                    let S = c[T];
                    for (; S.charAt(0) == " ";) S = S.substring(1);
                    if (S.indexOf(p) == 0) return S.substring(p.length, S.length)
                }
                return ""
            }

            function n(h, p) {
                document.cookie = h + "=" + p + ";path=/"
            }
            let r = ae(t("tab"));
            r.value == "" && n("tab", "FSM");
            let s = t("sideBarOpen");
            r.value == "" && n("sideBarOpen", "false");
            let o = ae(s == "true");

            function i() {
                o.value = !o.value, n("sideBarOpen", "" + o.value)
            }
            let l = ae([]);
            async function f() {
                (await Rl()).forEach(p => {
                    let a = l.value.find(c => c.id == p.id);
                    if (a == null) xl() < 1 ? l.value.push(p) : (l.value.splice(0, 0, p), location.reload());
                    else {
                        let c = Ws() ?? {
                                id: -15,
                                selectionType: "acft"
                            },
                            T = l.value.indexOf(a);
                        a.altitude != p.altitude && !(c.selectionType == "alt" && c.id == p.id) && (l.value[T].altitude = p.altitude), a.arriving != p.arriving && !(c.selectionType == "arriving" && c.id == p.id) && (l.value[T].arriving = p.arriving), a.callsign != p.callsign && !(c.selectionType == "callsign" && c.id == p.id) && (l.value[T].callsign = p.callsign), a.departing != p.departing && !(c.selectionType == "departing" && c.id == p.id) && (l.value[T].departing = p.departing), a.free != p.free && !(c.selectionType == "free" && c.id == p.id) && (l.value[T].free = p.free), a.gate != p.gate && !(c.selectionType == "gate" && c.id == p.id) && (l.value[T].gate = p.gate), a.route != p.route && !(c.selectionType == "route" && c.id == p.id) && (l.value[T].route = p.route), a.runway != p.runway && !(c.selectionType == "runway" && c.id == p.id) && (l.value[T].runway = p.runway), a.squawk != p.squawk && !(c.selectionType == "squawk" && c.id == p.id) && (l.value[T].squawk = p.squawk), a.status != p.status && !(c.selectionType == "status" && c.id == p.id) && (l.value[T].status = p.status), a.type != p.type && !(c.selectionType == "acft" && c.id == p.id) && (l.value[T].type = p.type), a.a_alt != p.a_alt && !(c.selectionType == "a_alt" && c.id == p.id) && (l.value[T].a_alt = p.a_alt), a.a_hdg != p.a_hdg && !(c.selectionType == "a_hdg" && c.id == p.id) && (l.value[T].a_hdg = p.a_hdg), a.hidden != p.hidden && (l.value[T].hidden = p.hidden)
                    }
                }), kl()
            }
            return setInterval(f, 1e3), f(), (h, p) => (E(), L(ne, null, [g(o) ? (E(), L("div", Yl, ta)) : re("", !0), x("div", na, [x("div", ra, [sa, x("p", oa, "v" + Fe(g(Ql)), 1)]), ia, x("div", la, [x("p", aa, "Room ID: " + Fe(g(Il)()), 1)]), x("img", {
                src: Tl,
                onClick: i,
                class: "hamburger"
            })]), g(r) == "FSM" ? (E(), L("div", ua, [x("div", ca, [fa, x("div", da, [(E(!0), L(ne, null, At(g(l), (a, c) => (E(), L("div", pa, [a.arriving == g(st)() && a.flightRules == "IFR" && !a.hidden ? (E(), ot(Gt, {
                key: 0,
                aircraft: a,
                type: "inbound"
            }, null, 8, ["aircraft"])) : re("", !0)]))), 256))])]), x("div", ha, [ga, x("div", ma, [(E(!0), L(ne, null, At(g(l), (a, c) => (E(), L("div", ya, [a.departing == g(st)() && a.flightRules == "IFR" && !a.hidden ? (E(), ot(Gt, {
                key: 0,
                aircraft: a,
                type: "outbound"
            }, null, 8, ["aircraft"])) : re("", !0)]))), 256))])]), x("div", va, [_a, x("div", wa, [(E(!0), L(ne, null, At(g(l), (a, c) => (E(), L("div", ba, [(a.departing == g(st)() || a.arriving == g(st)()) && a.flightRules == "VFR" && !a.hidden ? (E(), ot(Gt, {
                key: 0,
                aircraft: a,
                type: "vfr"
            }, null, 8, ["aircraft"])) : re("", !0)]))), 256))])]), x("div", Ca, [Aa, x("div", Ta, [(E(!0), L(ne, null, At(g(l), (a, c) => (E(), L("div", xa, [a.departing != g(st)() && a.arriving != g(st)() && !a.hidden ? (E(), ot(Gt, {
                key: 0,
                aircraft: a,
                type: "overflying"
            }, null, 8, ["aircraft"])) : re("", !0)]))), 256))])])])) : re("", !0)], 64))
        }
    }),
    Ia = Cn(ka, [
        ["__scopeId", "data-v-488c9d7f"]
    ]),
    Ra = ["placeholder"],
    Fa = {
        key: 0
    },
    Pa = ["onClick"],
    Oa = {
        key: 0
    },
    Sa = {
        key: 0,
        class: "arrowed"
    },
    Ea = {
        key: 1
    },
    Ma = {
        key: 1
    },
    $a = {
        key: 0,
        class: "arrowed"
    },
    Da = {
        key: 1
    },
    Na = yn({
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
                r = t,
                s = ae(n.items),
                o = ae(n.value ?? ""),
                i = ae(!1),
                l = ae(!1),
                f = ae(0);
            n.value != null && h();

            function h() {
                n.filter ? s.value = n.items.filter(n.filter) : s.value = n.items.filter(c => c.toLowerCase().includes(o.value.toLowerCase())), s.value.length != 0 && (f.value = f.value % s.value.length)
            }

            function p(c) {
                i.value = !1, l.value = !1, o.value = c, h(), r("change", o.value)
            }

            function a(c) {
                if (i.value) switch (c.code) {
                    case "ArrowUp":
                        if (s.value.length == 0) return;
                        f.value = (f.value - 1 + s.value.length) % s.value.length;
                        break;
                    case "ArrowDown":
                        if (s.value.length == 0) return;
                        f.value = (f.value + 1) % s.value.length;
                        break;
                    case "Enter":
                    case "Tab":
                        if (s.value.length == 0) return;
                        p(s.value[f.value]);
                        break
                }
            }
            return Ss(() => {
                window.addEventListener("keydown", a)
            }), Es(() => {
                window.removeEventListener("keydown", a)
            }), (c, T) => (E(), L("div", null, [W(x("input", {
                type: "text",
                "onUpdate:modelValue": T[0] || (T[0] = S => J(o) ? o.value = S : o = S),
                onInput: h,
                placeholder: g(n).placeholder,
                onFocus: T[1] || (T[1] = S => {
                    J(i) ? i.value = !0 : i = !0, S.target.select()
                }),
                onBlur: T[2] || (T[2] = S => J(i) ? i.value = !1 : i = !1)
            }, null, 40, Ra), [
                [te, g(o)]
            ]), g(i) || g(l) ? (E(), L("ul", Fa, [(E(!0), L(ne, null, At(g(s), (S, $) => (E(), L("li", {
                key: S,
                onClick: V => p(S),
                onMouseover: T[3] || (T[3] = V => J(l) ? l.value = !0 : l = !0),
                onMouseleave: T[4] || (T[4] = V => J(l) ? l.value = !1 : l = !1),
                style: un({
                    width: c.width != null ? `${c.width}vw` : "inherit"
                })
            }, [c.displayText != null ? (E(), L("div", Oa, [$ == g(f) ? (E(), L("p", Sa, Fe(c.displayText(S)), 1)) : (E(), L("p", Ea, Fe(c.displayText(S)), 1))])) : (E(), L("div", Ma, [$ == g(f) ? (E(), L("p", $a, Fe(S), 1)) : (E(), L("p", Da, Fe(S), 1))]))], 44, Pa))), 128))])) : re("", !0)]))
        }
    }),
    La = Cn(Na, [
        ["__scopeId", "data-v-e03fc676"]
    ]);

function Ba() {
    return Ys("IGAR")
}

function Ha() {
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

function Ys(e) {
    let t = !1,
        n = null;
    return Ha().forEach(r => {
        t || r.code == e && (n = r, t = !0)
    }), n ?? Ba()
}
const An = e => (ks("data-v-8c98d784"), e = e(), Is(), e),
    Ka = {
        key: 0,
        class: "offline"
    },
    qa = An(() => x("p", null, "loading...", -1)),
    Ua = [qa],
    Ga = {
        key: 1,
        class: "offline"
    },
    ja = An(() => x("h1", null, "The FSM is currently offline.", -1)),
    Va = [ja],
    za = {
        key: 2,
        class: "rooms"
    },
    Wa = {
        class: "login"
    },
    Ja = An(() => x("h1", null, "Create Room", -1)),
    Qa = {
        key: 0
    },
    Xa = {
        class: "create"
    },
    Za = An(() => x("h1", null, "Join Room", -1)),
    Ya = {
        key: 0
    },
    eu = yn({
        __name: "App",
        setup(e) {
            let t = ae(!1),
                n = ae(!1),
                r = pn({
                    password: "",
                    password2: "",
                    id: "",
                    status1: "",
                    status2: "",
                    airport: ""
                });

            function s() {
                if (r.airport == "") {
                    r.status1 = "You need to provide an Airport";
                    return
                }
                fetch(Ae.value + "/createRoom", {
                    method: "POST",
                    body: JSON.stringify({
                        airport: r.airport,
                        password: r.password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }).then(i => {
                    i.status == 200 ? i.json().then(l => {
                        Dn(l.secret), Ln(l.airport), Nn(l.id), window.location.href = `/fsm/?secret=${l.secret}`
                    }) : fetch(Ae.value + "/ping").then(l => {
                        Me.value = l.status == 200
                    })
                })
            }

            function o() {
                fetch(Ae.value + "/loginRoom", {
                    method: "POST",
                    body: JSON.stringify({
                        id: r.id,
                        password: r.password2
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }).then(i => {
                    i.status == 200 ? i.json().then(l => {
                        Dn(l.secret), Ln(l.airport), Nn(l.id), window.location.href = `/fsm/?secret=${l.secret}`
                    }) : r.status2 = "Incorrect Room ID or Password"
                })
            }
            return zt(Ae, () => {
                fetch(Ae.value + "/ping").then(i => {
                    if (Me.value = i.status == 200, Me.value) {
                        let l = new URLSearchParams(document.location.search).get("secret");
                        l != null ? fetch(Ae.value + "/check", {
                            method: "POST",
                            body: JSON.stringify({
                                roomSecret: l
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420"
                            }
                        }).then(f => {
                            f.status == 200 ? f.json().then(h => {
                                t.value = !0, Dn(h.secret), Ln(h.airport), Nn(h.id), n.value = !0
                            }) : f.status == 404 ? location.href = "/fsm/" : t.value = !1
                        }) : n.value = !0
                    } else n.value = !0
                }).catch(() => {
                    Me.value = !1, n.value = !0
                })
            }), (i, l) => (E(), L(ne, null, [g(n) ? g(Me) ? re("", !0) : (E(), L("div", Ga, Va)) : (E(), L("div", Ka, Ua)), !g(t) && g(Me) && g(n) ? (E(), L("div", za, [x("div", Wa, [Ja, ke(La, {
                placeholder: "Airport",
                "display-text": f => g(Ys)(f).friendlyName,
                items: g(Zl),
                onChange: l[0] || (l[0] = f => g(r).airport = f)
            }, null, 8, ["display-text", "items"]), W(x("input", {
                type: "password",
                "onUpdate:modelValue": l[1] || (l[1] = f => g(r).password = f),
                placeholder: "Password"
            }, null, 512), [
                [te, g(r).password]
            ]), x("button", {
                onClick: s
            }, "Create Room"), g(r).status1 ? (E(), L("p", Qa, Fe(g(r).status1), 1)) : re("", !0)]), x("div", Xa, [Za, W(x("input", {
                type: "text",
                "onUpdate:modelValue": l[2] || (l[2] = f => g(r).id = f),
                placeholder: "Room ID"
            }, null, 512), [
                [te, g(r).id]
            ]), W(x("input", {
                type: "password",
                "onUpdate:modelValue": l[3] || (l[3] = f => g(r).password2 = f),
                placeholder: "Password"
            }, null, 512), [
                [te, g(r).password2]
            ]), x("button", {
                onClick: o
            }, "Join Room"), g(r).status2 ? (E(), L("p", Ya, Fe(g(r).status2), 1)) : re("", !0)])])) : re("", !0), g(t) && g(Me) && g(n) ? (E(), ot(Ia, {
                key: 3
            })) : re("", !0)], 64))
        }
    }),
    tu = Cn(eu, [
        ["__scopeId", "data-v-8c98d784"]
    ]);
Cl(tu).mount("#app");
