(function() {
    const l = document.createElement("link").relList;
    if (l && l.supports && l.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) c(o);
    new MutationObserver(o => {
        for (const A of o)
            if (A.type === "childList")
                for (const e of A.addedNodes) e.tagName === "LINK" && e.rel === "modulepreload" && c(e)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function a(o) {
        const A = {};
        return o.integrity && (A.integrity = o.integrity), o.referrerPolicy && (A.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? A.credentials = "include" : o.crossOrigin === "anonymous" ? A.credentials = "omit" : A.credentials = "same-origin", A
    }

    function c(o) {
        if (o.ep) return;
        o.ep = !0;
        const A = a(o);
        fetch(o.href, A)
    }
})();

function Rc(i, l) {
    const a = Object.create(null),
        c = i.split(",");
    for (let o = 0; o < c.length; o++) a[c[o]] = !0;
    return l ? o => !!a[o.toLowerCase()] : o => !!a[o]
}
const oi = {},
    dl = [],
    Zi = () => {},
    Co = () => !1,
    fa = i => i.charCodeAt(0) === 111 && i.charCodeAt(1) === 110 && (i.charCodeAt(2) > 122 || i.charCodeAt(2) < 97),
    Ec = i => i.startsWith("onUpdate:"),
    Oi = Object.assign,
    Ic = (i, l) => {
        const a = i.indexOf(l);
        a > -1 && i.splice(a, 1)
    },
    uo = Object.prototype.hasOwnProperty,
    x = (i, l) => uo.call(i, l),
    J = Array.isArray,
    Ml = i => jl(i) === "[object Map]",
    da = i => jl(i) === "[object Set]",
    Kc = i => jl(i) === "[object Date]",
    w = i => typeof i == "function",
    Ni = i => typeof i == "string",
    nl = i => typeof i == "symbol",
    si = i => i !== null && typeof i == "object",
    Tn = i => (si(i) || w(i)) && w(i.then) && w(i.catch),
    Nn = Object.prototype.toString,
    jl = i => Nn.call(i),
    fo = i => jl(i).slice(8, -1),
    On = i => jl(i) === "[object Object]",
    rc = i => Ni(i) && i !== "NaN" && i[0] !== "-" && "" + parseInt(i, 10) === i,
    Aa = Rc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    Ma = i => {
        const l = Object.create(null);
        return a => l[a] || (l[a] = i(a))
    },
    Mo = /-(\w)/g,
    Hl = Ma(i => i.replace(Mo, (l, a) => a ? a.toUpperCase() : "")),
    Po = /\B([A-Z])/g,
    Fl = Ma(i => i.replace(Po, "-$1").toLowerCase()),
    Ln = Ma(i => i.charAt(0).toUpperCase() + i.slice(1)),
    Ya = Ma(i => i ? `on${Ln(i)}` : ""),
    Ol = (i, l) => !Object.is(i, l),
    ea = (i, l) => {
        for (let a = 0; a < i.length; a++) i[a](l)
    },
    Ia = (i, l, a) => {
        Object.defineProperty(i, l, {
            configurable: !0,
            enumerable: !1,
            value: a
        })
    },
    ra = i => {
        const l = parseFloat(i);
        return isNaN(l) ? i : l
    };
let mc;
const $a = () => mc || (mc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function zl(i) {
    if (J(i)) {
        const l = {};
        for (let a = 0; a < i.length; a++) {
            const c = i[a],
                o = Ni(c) ? Uo(c) : zl(c);
            if (o)
                for (const A in o) l[A] = o[A]
        }
        return l
    } else if (Ni(i) || si(i)) return i
}
const Go = /;(?![^(]*\))/g,
    Do = /:([^]+)/,
    Ho = /\/\*[^]*?\*\//g;

function Uo(i) {
    const l = {};
    return i.replace(Ho, "").split(Go).forEach(a => {
        if (a) {
            const c = a.split(Do);
            c.length > 1 && (l[c[0].trim()] = c[1].trim())
        }
    }), l
}

function Ki(i) {
    let l = "";
    if (Ni(i)) l = i;
    else if (J(i))
        for (let a = 0; a < i.length; a++) {
            const c = Ki(i[a]);
            c && (l += c + " ")
        } else if (si(i))
            for (const a in i) i[a] && (l += a + " ");
    return l.trim()
}
const Bo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    po = Rc(Bo);

function Cn(i) {
    return !!i || i === ""
}

function Fo(i, l) {
    if (i.length !== l.length) return !1;
    let a = !0;
    for (let c = 0; a && c < i.length; c++) a = Pa(i[c], l[c]);
    return a
}

function Pa(i, l) {
    if (i === l) return !0;
    let a = Kc(i),
        c = Kc(l);
    if (a || c) return a && c ? i.getTime() === l.getTime() : !1;
    if (a = nl(i), c = nl(l), a || c) return i === l;
    if (a = J(i), c = J(l), a || c) return a && c ? Fo(i, l) : !1;
    if (a = si(i), c = si(l), a || c) {
        if (!a || !c) return !1;
        const o = Object.keys(i).length,
            A = Object.keys(l).length;
        if (o !== A) return !1;
        for (const e in i) {
            const g = i.hasOwnProperty(e),
                n = l.hasOwnProperty(e);
            if (g && !n || !g && n || !Pa(i[e], l[e])) return !1
        }
    }
    return String(i) === String(l)
}

function ho(i, l) {
    return i.findIndex(a => Pa(a, l))
}
const D = i => Ni(i) ? i : i == null ? "" : J(i) || si(i) && (i.toString === Nn || !w(i.toString)) ? JSON.stringify(i, un, 2) : String(i),
    un = (i, l) => l && l.__v_isRef ? un(i, l.value) : Ml(l) ? {
        [`Map(${l.size})`]: [...l.entries()].reduce((a, [c, o], A) => (a[Wa(c, A) + " =>"] = o, a), {})
    } : da(l) ? {
        [`Set(${l.size})`]: [...l.values()].map(a => Wa(a))
    } : nl(l) ? Wa(l) : si(l) && !J(l) && !On(l) ? String(l) : l,
    Wa = (i, l = "") => {
        var a;
        return nl(i) ? `Symbol(${(a = i.description) != null ? a : l})` : i
    };
let Vi;
class Vo {
    constructor(l = !1) {
        this.detached = l, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Vi, !l && Vi && (this.index = (Vi.scopes || (Vi.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(l) {
        if (this._active) {
            const a = Vi;
            try {
                return Vi = this, l()
            } finally {
                Vi = a
            }
        }
    }
    on() {
        Vi = this
    }
    off() {
        Vi = this.parent
    }
    stop(l) {
        if (this._active) {
            let a, c;
            for (a = 0, c = this.effects.length; a < c; a++) this.effects[a].stop();
            for (a = 0, c = this.cleanups.length; a < c; a++) this.cleanups[a]();
            if (this.scopes)
                for (a = 0, c = this.scopes.length; a < c; a++) this.scopes[a].stop(!0);
            if (!this.detached && this.parent && !l) {
                const o = this.parent.scopes.pop();
                o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function Ko(i, l = Vi) {
    l && l.active && l.effects.push(i)
}

function mo() {
    return Vi
}
const Sc = i => {
        const l = new Set(i);
        return l.w = 0, l.n = 0, l
    },
    fn = i => (i.w & ol) > 0,
    dn = i => (i.n & ol) > 0,
    Yo = ({
        deps: i
    }) => {
        if (i.length)
            for (let l = 0; l < i.length; l++) i[l].w |= ol
    },
    Wo = i => {
        const {
            deps: l
        } = i;
        if (l.length) {
            let a = 0;
            for (let c = 0; c < l.length; c++) {
                const o = l[c];
                fn(o) && !dn(o) ? o.delete(i) : l[a++] = o, o.w &= ~ol, o.n &= ~ol
            }
            l.length = a
        }
    },
    Qa = new WeakMap;
let vl = 0,
    ol = 1;
const qa = 30;
let Yi;
const Tl = Symbol(""),
    ja = Symbol("");
class Tc {
    constructor(l, a = null, c) {
        this.fn = l, this.scheduler = a, this.active = !0, this.deps = [], this.parent = void 0, Ko(this, c)
    }
    run() {
        if (!this.active) return this.fn();
        let l = Yi,
            a = ll;
        for (; l;) {
            if (l === this) return;
            l = l.parent
        }
        try {
            return this.parent = Yi, Yi = this, ll = !0, ol = 1 << ++vl, vl <= qa ? Yo(this) : Yc(this), this.fn()
        } finally {
            vl <= qa && Wo(this), ol = 1 << --vl, Yi = this.parent, ll = a, this.parent = void 0, this.deferStop && this.stop()
        }
    }
    stop() {
        Yi === this ? this.deferStop = !0 : this.active && (Yc(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function Yc(i) {
    const {
        deps: l
    } = i;
    if (l.length) {
        for (let a = 0; a < l.length; a++) l[a].delete(i);
        l.length = 0
    }
}
let ll = !0;
const Mn = [];

function hl() {
    Mn.push(ll), ll = !1
}

function Vl() {
    const i = Mn.pop();
    ll = i === void 0 ? !0 : i
}

function Di(i, l, a) {
    if (ll && Yi) {
        let c = Qa.get(i);
        c || Qa.set(i, c = new Map);
        let o = c.get(a);
        o || c.set(a, o = Sc()), Pn(o)
    }
}

function Pn(i, l) {
    let a = !1;
    vl <= qa ? dn(i) || (i.n |= ol, a = !fn(i)) : a = !i.has(Yi), a && (i.add(Yi), Yi.deps.push(i))
}

function Qi(i, l, a, c, o, A) {
    const e = Qa.get(i);
    if (!e) return;
    let g = [];
    if (l === "clear") g = [...e.values()];
    else if (a === "length" && J(i)) {
        const n = Number(c);
        e.forEach((O, T) => {
            (T === "length" || !nl(T) && T >= n) && g.push(O)
        })
    } else switch (a !== void 0 && g.push(e.get(a)), l) {
        case "add":
            J(i) ? rc(a) && g.push(e.get("length")) : (g.push(e.get(Tl)), Ml(i) && g.push(e.get(ja)));
            break;
        case "delete":
            J(i) || (g.push(e.get(Tl)), Ml(i) && g.push(e.get(ja)));
            break;
        case "set":
            Ml(i) && g.push(e.get(Tl));
            break
    }
    if (g.length === 1) g[0] && za(g[0]);
    else {
        const n = [];
        for (const O of g) O && n.push(...O);
        za(Sc(n))
    }
}

function za(i, l) {
    const a = J(i) ? i : [...i];
    for (const c of a) c.computed && Wc(c);
    for (const c of a) c.computed || Wc(c)
}

function Wc(i, l) {
    (i !== Yi || i.allowRecurse) && (i.scheduler ? i.scheduler() : i.run())
}
const yo = Rc("__proto__,__v_isRef,__isVue"),
    Gn = new Set(Object.getOwnPropertyNames(Symbol).filter(i => i !== "arguments" && i !== "caller").map(i => Symbol[i]).filter(nl)),
    yc = Jo();

function Jo() {
    const i = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(l => {
        i[l] = function(...a) {
            const c = Q(this);
            for (let A = 0, e = this.length; A < e; A++) Di(c, "get", A + "");
            const o = c[l](...a);
            return o === -1 || o === !1 ? c[l](...a.map(Q)) : o
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(l => {
        i[l] = function(...a) {
            hl();
            const c = Q(this)[l].apply(this, a);
            return Vl(), c
        }
    }), i
}

function Xo(i) {
    const l = Q(this);
    return Di(l, "has", i), l.hasOwnProperty(i)
}
class Dn {
    constructor(l = !1, a = !1) {
        this._isReadonly = l, this._shallow = a
    }
    get(l, a, c) {
        const o = this._isReadonly,
            A = this._shallow;
        if (a === "__v_isReactive") return !o;
        if (a === "__v_isReadonly") return o;
        if (a === "__v_isShallow") return A;
        if (a === "__v_raw") return c === (o ? A ? is : pn : A ? Bn : Un).get(l) || Object.getPrototypeOf(l) === Object.getPrototypeOf(c) ? l : void 0;
        const e = J(l);
        if (!o) {
            if (e && x(yc, a)) return Reflect.get(yc, a, c);
            if (a === "hasOwnProperty") return Xo
        }
        const g = Reflect.get(l, a, c);
        return (nl(a) ? Gn.has(a) : yo(a)) || (o || Di(l, "get", a), A) ? g : ti(g) ? e && rc(a) ? g : g.value : si(g) ? o ? Fn(g) : al(g) : g
    }
}
class Hn extends Dn {
    constructor(l = !1) {
        super(!1, l)
    }
    set(l, a, c, o) {
        let A = l[a];
        if (!this._shallow) {
            const n = Ul(A);
            if (!Sa(c) && !Ul(c) && (A = Q(A), c = Q(c)), !J(l) && ti(A) && !ti(c)) return n ? !1 : (A.value = c, !0)
        }
        const e = J(l) && rc(a) ? Number(a) < l.length : x(l, a),
            g = Reflect.set(l, a, c, o);
        return l === Q(o) && (e ? Ol(c, A) && Qi(l, "set", a, c) : Qi(l, "add", a, c)), g
    }
    deleteProperty(l, a) {
        const c = x(l, a);
        l[a];
        const o = Reflect.deleteProperty(l, a);
        return o && c && Qi(l, "delete", a, void 0), o
    }
    has(l, a) {
        const c = Reflect.has(l, a);
        return (!nl(a) || !Gn.has(a)) && Di(l, "has", a), c
    }
    ownKeys(l) {
        return Di(l, "iterate", J(l) ? "length" : Tl), Reflect.ownKeys(l)
    }
}
class vo extends Dn {
    constructor(l = !1) {
        super(!0, l)
    }
    set(l, a) {
        return !0
    }
    deleteProperty(l, a) {
        return !0
    }
}
const wo = new Hn,
    _o = new vo,
    bo = new Hn(!0),
    Nc = i => i,
    Ga = i => Reflect.getPrototypeOf(i);

function la(i, l, a = !1, c = !1) {
    i = i.__v_raw;
    const o = Q(i),
        A = Q(l);
    a || (Ol(l, A) && Di(o, "get", l), Di(o, "get", A));
    const {
        has: e
    } = Ga(o), g = c ? Nc : a ? Cc : kl;
    if (e.call(o, l)) return g(i.get(l));
    if (e.call(o, A)) return g(i.get(A));
    i !== o && i.get(l)
}

function aa(i, l = !1) {
    const a = this.__v_raw,
        c = Q(a),
        o = Q(i);
    return l || (Ol(i, o) && Di(c, "has", i), Di(c, "has", o)), i === o ? a.has(i) : a.has(i) || a.has(o)
}

function ca(i, l = !1) {
    return i = i.__v_raw, !l && Di(Q(i), "iterate", Tl), Reflect.get(i, "size", i)
}

function Jc(i) {
    i = Q(i);
    const l = Q(this);
    return Ga(l).has.call(l, i) || (l.add(i), Qi(l, "add", i, i)), this
}

function Xc(i, l) {
    l = Q(l);
    const a = Q(this),
        {
            has: c,
            get: o
        } = Ga(a);
    let A = c.call(a, i);
    A || (i = Q(i), A = c.call(a, i));
    const e = o.call(a, i);
    return a.set(i, l), A ? Ol(l, e) && Qi(a, "set", i, l) : Qi(a, "add", i, l), this
}

function vc(i) {
    const l = Q(this),
        {
            has: a,
            get: c
        } = Ga(l);
    let o = a.call(l, i);
    o || (i = Q(i), o = a.call(l, i)), c && c.call(l, i);
    const A = l.delete(i);
    return o && Qi(l, "delete", i, void 0), A
}

function wc() {
    const i = Q(this),
        l = i.size !== 0,
        a = i.clear();
    return l && Qi(i, "clear", void 0, void 0), a
}

function na(i, l) {
    return function(c, o) {
        const A = this,
            e = A.__v_raw,
            g = Q(e),
            n = l ? Nc : i ? Cc : kl;
        return !i && Di(g, "iterate", Tl), e.forEach((O, T) => c.call(o, n(O), n(T), A))
    }
}

function oa(i, l, a) {
    return function(...c) {
        const o = this.__v_raw,
            A = Q(o),
            e = Ml(A),
            g = i === "entries" || i === Symbol.iterator && e,
            n = i === "keys" && e,
            O = o[i](...c),
            T = a ? Nc : l ? Cc : kl;
        return !l && Di(A, "iterate", n ? ja : Tl), {
            next() {
                const {
                    value: t,
                    done: N
                } = O.next();
                return N ? {
                    value: t,
                    done: N
                } : {
                    value: g ? [T(t[0]), T(t[1])] : T(t),
                    done: N
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function zi(i) {
    return function(...l) {
        return i === "delete" ? !1 : i === "clear" ? void 0 : this
    }
}

function Zo() {
    const i = {
            get(A) {
                return la(this, A)
            },
            get size() {
                return ca(this)
            },
            has: aa,
            add: Jc,
            set: Xc,
            delete: vc,
            clear: wc,
            forEach: na(!1, !1)
        },
        l = {
            get(A) {
                return la(this, A, !1, !0)
            },
            get size() {
                return ca(this)
            },
            has: aa,
            add: Jc,
            set: Xc,
            delete: vc,
            clear: wc,
            forEach: na(!1, !0)
        },
        a = {
            get(A) {
                return la(this, A, !0)
            },
            get size() {
                return ca(this, !0)
            },
            has(A) {
                return aa.call(this, A, !0)
            },
            add: zi("add"),
            set: zi("set"),
            delete: zi("delete"),
            clear: zi("clear"),
            forEach: na(!0, !1)
        },
        c = {
            get(A) {
                return la(this, A, !0, !0)
            },
            get size() {
                return ca(this, !0)
            },
            has(A) {
                return aa.call(this, A, !0)
            },
            add: zi("add"),
            set: zi("set"),
            delete: zi("delete"),
            clear: zi("clear"),
            forEach: na(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(A => {
        i[A] = oa(A, !1, !1), a[A] = oa(A, !0, !1), l[A] = oa(A, !1, !0), c[A] = oa(A, !0, !0)
    }), [i, a, l, c]
}
const [ko, xo, $o, Qo] = Zo();

function Oc(i, l) {
    const a = l ? i ? Qo : $o : i ? xo : ko;
    return (c, o, A) => o === "__v_isReactive" ? !i : o === "__v_isReadonly" ? i : o === "__v_raw" ? c : Reflect.get(x(a, o) && o in c ? a : c, o, A)
}
const qo = {
        get: Oc(!1, !1)
    },
    jo = {
        get: Oc(!1, !0)
    },
    zo = {
        get: Oc(!0, !1)
    },
    Un = new WeakMap,
    Bn = new WeakMap,
    pn = new WeakMap,
    is = new WeakMap;

function ls(i) {
    switch (i) {
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

function as(i) {
    return i.__v_skip || !Object.isExtensible(i) ? 0 : ls(fo(i))
}

function al(i) {
    return Ul(i) ? i : Lc(i, !1, wo, qo, Un)
}

function cs(i) {
    return Lc(i, !1, bo, jo, Bn)
}

function Fn(i) {
    return Lc(i, !0, _o, zo, pn)
}

function Lc(i, l, a, c, o) {
    if (!si(i) || i.__v_raw && !(l && i.__v_isReactive)) return i;
    const A = o.get(i);
    if (A) return A;
    const e = as(i);
    if (e === 0) return i;
    const g = new Proxy(i, e === 2 ? c : a);
    return o.set(i, g), g
}

function Pl(i) {
    return Ul(i) ? Pl(i.__v_raw) : !!(i && i.__v_isReactive)
}

function Ul(i) {
    return !!(i && i.__v_isReadonly)
}

function Sa(i) {
    return !!(i && i.__v_isShallow)
}

function hn(i) {
    return Pl(i) || Ul(i)
}

function Q(i) {
    const l = i && i.__v_raw;
    return l ? Q(l) : i
}

function Vn(i) {
    return Ia(i, "__v_skip", !0), i
}
const kl = i => si(i) ? al(i) : i,
    Cc = i => si(i) ? Fn(i) : i;

function Kn(i) {
    ll && Yi && (i = Q(i), Pn(i.dep || (i.dep = Sc())))
}

function mn(i, l) {
    i = Q(i);
    const a = i.dep;
    a && za(a)
}

function ti(i) {
    return !!(i && i.__v_isRef === !0)
}

function ii(i) {
    return ns(i, !1)
}

function ns(i, l) {
    return ti(i) ? i : new os(i, l)
}
class os {
    constructor(l, a) {
        this.__v_isShallow = a, this.dep = void 0, this.__v_isRef = !0, this._rawValue = a ? l : Q(l), this._value = a ? l : kl(l)
    }
    get value() {
        return Kn(this), this._value
    }
    set value(l) {
        const a = this.__v_isShallow || Sa(l) || Ul(l);
        l = a ? l : Q(l), Ol(l, this._rawValue) && (this._rawValue = l, this._value = a ? l : kl(l), mn(this))
    }
}

function s(i) {
    return ti(i) ? i.value : i
}
const ss = {
    get: (i, l, a) => s(Reflect.get(i, l, a)),
    set: (i, l, a, c) => {
        const o = i[l];
        return ti(o) && !ti(a) ? (o.value = a, !0) : Reflect.set(i, l, a, c)
    }
};

function Yn(i) {
    return Pl(i) ? i : new Proxy(i, ss)
}
class As {
    constructor(l, a, c, o) {
        this._setter = a, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Tc(l, () => {
            this._dirty || (this._dirty = !0, mn(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = c
    }
    get value() {
        const l = Q(this);
        return Kn(l), (l._dirty || !l._cacheable) && (l._dirty = !1, l._value = l.effect.run()), l._value
    }
    set value(l) {
        this._setter(l)
    }
}

function es(i, l, a = !1) {
    let c, o;
    const A = w(i);
    return A ? (c = i, o = Zi) : (c = i.get, o = i.set), new As(c, o, A || !o, a)
}

function cl(i, l, a, c) {
    let o;
    try {
        o = c ? i(...c) : i()
    } catch (A) {
        Da(A, l, a)
    }
    return o
}

function Ji(i, l, a, c) {
    if (w(i)) {
        const A = cl(i, l, a, c);
        return A && Tn(A) && A.catch(e => {
            Da(e, l, a)
        }), A
    }
    const o = [];
    for (let A = 0; A < i.length; A++) o.push(Ji(i[A], l, a, c));
    return o
}

function Da(i, l, a, c = !0) {
    const o = l ? l.vnode : null;
    if (l) {
        let A = l.parent;
        const e = l.proxy,
            g = a;
        for (; A;) {
            const O = A.ec;
            if (O) {
                for (let T = 0; T < O.length; T++)
                    if (O[T](i, e, g) === !1) return
            }
            A = A.parent
        }
        const n = l.appContext.config.errorHandler;
        if (n) {
            cl(n, null, 10, [i, e, g]);
            return
        }
    }
    gs(i, a, o, c)
}

function gs(i, l, a, c = !0) {
    console.error(i)
}
let xl = !1,
    ic = !1;
const Li = [];
let bi = 0;
const Gl = [];
let $i = null,
    El = 0;
const Wn = Promise.resolve();
let uc = null;

function ts(i) {
    const l = uc || Wn;
    return i ? l.then(this ? i.bind(this) : i) : l
}

function Rs(i) {
    let l = bi + 1,
        a = Li.length;
    for (; l < a;) {
        const c = l + a >>> 1,
            o = Li[c],
            A = $l(o);
        A < i || A === i && o.pre ? l = c + 1 : a = c
    }
    return l
}

function fc(i) {
    (!Li.length || !Li.includes(i, xl && i.allowRecurse ? bi + 1 : bi)) && (i.id == null ? Li.push(i) : Li.splice(Rs(i.id), 0, i), yn())
}

function yn() {
    !xl && !ic && (ic = !0, uc = Wn.then(Xn))
}

function Es(i) {
    const l = Li.indexOf(i);
    l > bi && Li.splice(l, 1)
}

function Is(i) {
    J(i) ? Gl.push(...i) : (!$i || !$i.includes(i, i.allowRecurse ? El + 1 : El)) && Gl.push(i), yn()
}

function _c(i, l, a = xl ? bi + 1 : 0) {
    for (; a < Li.length; a++) {
        const c = Li[a];
        if (c && c.pre) {
            if (i && c.id !== i.uid) continue;
            Li.splice(a, 1), a--, c()
        }
    }
}

function Jn(i) {
    if (Gl.length) {
        const l = [...new Set(Gl)];
        if (Gl.length = 0, $i) {
            $i.push(...l);
            return
        }
        for ($i = l, $i.sort((a, c) => $l(a) - $l(c)), El = 0; El < $i.length; El++) $i[El]();
        $i = null, El = 0
    }
}
const $l = i => i.id == null ? 1 / 0 : i.id,
    rs = (i, l) => {
        const a = $l(i) - $l(l);
        if (a === 0) {
            if (i.pre && !l.pre) return -1;
            if (l.pre && !i.pre) return 1
        }
        return a
    };

function Xn(i) {
    ic = !1, xl = !0, Li.sort(rs);
    try {
        for (bi = 0; bi < Li.length; bi++) {
            const l = Li[bi];
            l && l.active !== !1 && cl(l, null, 14)
        }
    } finally {
        bi = 0, Li.length = 0, Jn(), xl = !1, uc = null, (Li.length || Gl.length) && Xn()
    }
}

function Ss(i, l, ...a) {
    if (i.isUnmounted) return;
    const c = i.vnode.props || oi;
    let o = a;
    const A = l.startsWith("update:"),
        e = A && l.slice(7);
    if (e && e in c) {
        const T = `${e === "modelValue" ? "model" : e}Modifiers`,
            {
                number: t,
                trim: N
            } = c[T] || oi;
        N && (o = a.map(F => Ni(F) ? F.trim() : F)), t && (o = a.map(ra))
    }
    let g, n = c[g = Ya(l)] || c[g = Ya(Hl(l))];
    !n && A && (n = c[g = Ya(Fl(l))]), n && Ji(n, i, 6, o);
    const O = c[g + "Once"];
    if (O) {
        if (!i.emitted) i.emitted = {};
        else if (i.emitted[g]) return;
        i.emitted[g] = !0, Ji(O, i, 6, o)
    }
}

function vn(i, l, a = !1) {
    const c = l.emitsCache,
        o = c.get(i);
    if (o !== void 0) return o;
    const A = i.emits;
    let e = {},
        g = !1;
    if (!w(i)) {
        const n = O => {
            const T = vn(O, l, !0);
            T && (g = !0, Oi(e, T))
        };
        !a && l.mixins.length && l.mixins.forEach(n), i.extends && n(i.extends), i.mixins && i.mixins.forEach(n)
    }
    return !A && !g ? (si(i) && c.set(i, null), null) : (J(A) ? A.forEach(n => e[n] = null) : Oi(e, A), si(i) && c.set(i, e), e)
}

function Ha(i, l) {
    return !i || !fa(l) ? !1 : (l = l.slice(2).replace(/Once$/, ""), x(i, l[0].toLowerCase() + l.slice(1)) || x(i, Fl(l)) || x(i, l))
}
let Wi = null,
    Ua = null;

function Ta(i) {
    const l = Wi;
    return Wi = i, Ua = i && i.type.__scopeId || null, l
}

function dc(i) {
    Ua = i
}

function Mc() {
    Ua = null
}

function Ts(i, l = Wi, a) {
    if (!l || i._n) return i;
    const c = (...o) => {
        c._d && ln(-1);
        const A = Ta(l);
        let e;
        try {
            e = i(...o)
        } finally {
            Ta(A), c._d && ln(1)
        }
        return e
    };
    return c._n = !0, c._c = !0, c._d = !0, c
}

function ya(i) {
    const {
        type: l,
        vnode: a,
        proxy: c,
        withProxy: o,
        props: A,
        propsOptions: [e],
        slots: g,
        attrs: n,
        emit: O,
        render: T,
        renderCache: t,
        data: N,
        setupState: F,
        ctx: H,
        inheritAttrs: I
    } = i;
    let C, Ai;
    const li = Ta(i);
    try {
        if (a.shapeFlag & 4) {
            const y = o || c,
                ui = y;
            C = _i(T.call(ui, y, t, A, F, N, H)), Ai = n
        } else {
            const y = l;
            C = _i(y.length > 1 ? y(A, {
                attrs: n,
                slots: g,
                emit: O
            }) : y(A, null)), Ai = l.props ? n : Ns(n)
        }
    } catch (y) {
        bl.length = 0, Da(y, i, 1), C = Bi(Ll)
    }
    let ni = C;
    if (Ai && I !== !1) {
        const y = Object.keys(Ai),
            {
                shapeFlag: ui
            } = ni;
        y.length && ui & 7 && (e && y.some(Ec) && (Ai = Os(Ai, e)), ni = Bl(ni, Ai))
    }
    return a.dirs && (ni = Bl(ni), ni.dirs = ni.dirs ? ni.dirs.concat(a.dirs) : a.dirs), a.transition && (ni.transition = a.transition), C = ni, Ta(li), C
}
const Ns = i => {
        let l;
        for (const a in i)(a === "class" || a === "style" || fa(a)) && ((l || (l = {}))[a] = i[a]);
        return l
    },
    Os = (i, l) => {
        const a = {};
        for (const c in i)(!Ec(c) || !(c.slice(9) in l)) && (a[c] = i[c]);
        return a
    };

function Ls(i, l, a) {
    const {
        props: c,
        children: o,
        component: A
    } = i, {
        props: e,
        children: g,
        patchFlag: n
    } = l, O = A.emitsOptions;
    if (l.dirs || l.transition) return !0;
    if (a && n >= 0) {
        if (n & 1024) return !0;
        if (n & 16) return c ? bc(c, e, O) : !!e;
        if (n & 8) {
            const T = l.dynamicProps;
            for (let t = 0; t < T.length; t++) {
                const N = T[t];
                if (e[N] !== c[N] && !Ha(O, N)) return !0
            }
        }
    } else return (o || g) && (!g || !g.$stable) ? !0 : c === e ? !1 : c ? e ? bc(c, e, O) : !0 : !!e;
    return !1
}

function bc(i, l, a) {
    const c = Object.keys(l);
    if (c.length !== Object.keys(i).length) return !0;
    for (let o = 0; o < c.length; o++) {
        const A = c[o];
        if (l[A] !== i[A] && !Ha(a, A)) return !0
    }
    return !1
}

function Cs({
    vnode: i,
    parent: l
}, a) {
    for (; l && l.subTree === i;)(i = l.vnode).el = a, l = l.parent
}
const us = Symbol.for("v-ndc"),
    fs = i => i.__isSuspense;

function ds(i, l) {
    l && l.pendingBranch ? J(i) ? l.effects.push(...i) : l.effects.push(i) : Is(i)
}
const sa = {};

function ga(i, l, a) {
    return wn(i, l, a)
}

function wn(i, l, {
    immediate: a,
    deep: c,
    flush: o,
    onTrack: A,
    onTrigger: e
} = oi) {
    var g;
    const n = mo() === ((g = Ci) == null ? void 0 : g.scope) ? Ci : null;
    let O, T = !1,
        t = !1;
    if (ti(i) ? (O = () => i.value, T = Sa(i)) : Pl(i) ? (O = () => i, c = !0) : J(i) ? (t = !0, T = i.some(y => Pl(y) || Sa(y)), O = () => i.map(y => {
            if (ti(y)) return y.value;
            if (Pl(y)) return Sl(y);
            if (w(y)) return cl(y, n, 2)
        })) : w(i) ? l ? O = () => cl(i, n, 2) : O = () => {
            if (!(n && n.isUnmounted)) return N && N(), Ji(i, n, 3, [F])
        } : O = Zi, l && c) {
        const y = O;
        O = () => Sl(y())
    }
    let N, F = y => {
            N = li.onStop = () => {
                cl(y, n, 4), N = li.onStop = void 0
            }
        },
        H;
    if (ql)
        if (F = Zi, l ? a && Ji(l, n, 3, [O(), t ? [] : void 0, F]) : O(), o === "sync") {
            const y = SA();
            H = y.__watcherHandles || (y.__watcherHandles = [])
        } else return Zi;
    let I = t ? new Array(i.length).fill(sa) : sa;
    const C = () => {
        if (li.active)
            if (l) {
                const y = li.run();
                (c || T || (t ? y.some((ui, ei) => Ol(ui, I[ei])) : Ol(y, I))) && (N && N(), Ji(l, n, 3, [y, I === sa ? void 0 : t && I[0] === sa ? [] : I, F]), I = y)
            } else li.run()
    };
    C.allowRecurse = !!l;
    let Ai;
    o === "sync" ? Ai = C : o === "post" ? Ai = () => Pi(C, n && n.suspense) : (C.pre = !0, n && (C.id = n.uid), Ai = () => fc(C));
    const li = new Tc(O, Ai);
    l ? a ? C() : I = li.run() : o === "post" ? Pi(li.run.bind(li), n && n.suspense) : li.run();
    const ni = () => {
        li.stop(), n && n.scope && Ic(n.scope.effects, li)
    };
    return H && H.push(ni), ni
}

function Ms(i, l, a) {
    const c = this.proxy,
        o = Ni(i) ? i.includes(".") ? _n(c, i) : () => c[i] : i.bind(c, c);
    let A;
    w(l) ? A = l : (A = l.handler, a = l);
    const e = Ci;
    pl(this);
    const g = wn(o, A.bind(c), a);
    return e ? pl(e) : Nl(), g
}

function _n(i, l) {
    const a = l.split(".");
    return () => {
        let c = i;
        for (let o = 0; o < a.length && c; o++) c = c[a[o]];
        return c
    }
}

function Sl(i, l) {
    if (!si(i) || i.__v_skip || (l = l || new Set, l.has(i))) return i;
    if (l.add(i), ti(i)) Sl(i.value, l);
    else if (J(i))
        for (let a = 0; a < i.length; a++) Sl(i[a], l);
    else if (da(i) || Ml(i)) i.forEach(a => {
        Sl(a, l)
    });
    else if (On(i))
        for (const a in i) Sl(i[a], l);
    return i
}

function k(i, l) {
    const a = Wi;
    if (a === null) return i;
    const c = ha(a) || a.proxy,
        o = i.dirs || (i.dirs = []);
    for (let A = 0; A < l.length; A++) {
        let [e, g, n, O = oi] = l[A];
        e && (w(e) && (e = {
            mounted: e,
            updated: e
        }), e.deep && Sl(g), o.push({
            dir: e,
            instance: c,
            value: g,
            oldValue: void 0,
            arg: n,
            modifiers: O
        }))
    }
    return i
}

function el(i, l, a, c) {
    const o = i.dirs,
        A = l && l.dirs;
    for (let e = 0; e < o.length; e++) {
        const g = o[e];
        A && (g.oldValue = A[e].value);
        let n = g.dir[c];
        n && (hl(), Ji(n, a, 8, [i.el, g, i, l]), Vl())
    }
} /*! #__NO_SIDE_EFFECTS__ */
function Kl(i, l) {
    return w(i) ? Oi({
        name: i.name
    }, l, {
        setup: i
    }) : i
}
const ta = i => !!i.type.__asyncLoader,
    bn = i => i.type.__isKeepAlive;

function Ps(i, l) {
    Zn(i, "a", l)
}

function Gs(i, l) {
    Zn(i, "da", l)
}

function Zn(i, l, a = Ci) {
    const c = i.__wdc || (i.__wdc = () => {
        let o = a;
        for (; o;) {
            if (o.isDeactivated) return;
            o = o.parent
        }
        return i()
    });
    if (Ba(l, c, a), a) {
        let o = a.parent;
        for (; o && o.parent;) bn(o.parent.vnode) && Ds(c, l, a, o), o = o.parent
    }
}

function Ds(i, l, a, c) {
    const o = Ba(l, i, c, !0);
    kn(() => {
        Ic(c[l], o)
    }, a)
}

function Ba(i, l, a = Ci, c = !1) {
    if (a) {
        const o = a[i] || (a[i] = []),
            A = l.__weh || (l.__weh = (...e) => {
                if (a.isUnmounted) return;
                hl(), pl(a);
                const g = Ji(l, a, i, e);
                return Nl(), Vl(), g
            });
        return c ? o.unshift(A) : o.push(A), A
    }
}
const qi = i => (l, a = Ci) => (!ql || i === "sp") && Ba(i, (...c) => l(...c), a),
    Hs = qi("bm"),
    Pc = qi("m"),
    Us = qi("bu"),
    Bs = qi("u"),
    Gc = qi("bum"),
    kn = qi("um"),
    ps = qi("sp"),
    Fs = qi("rtg"),
    hs = qi("rtc");

function Vs(i, l = Ci) {
    Ba("ec", i, l)
}

function Mi(i, l, a, c) {
    let o;
    const A = a && a[c];
    if (J(i) || Ni(i)) {
        o = new Array(i.length);
        for (let e = 0, g = i.length; e < g; e++) o[e] = l(i[e], e, void 0, A && A[e])
    } else if (typeof i == "number") {
        o = new Array(i);
        for (let e = 0; e < i; e++) o[e] = l(e + 1, e, void 0, A && A[e])
    } else if (si(i))
        if (i[Symbol.iterator]) o = Array.from(i, (e, g) => l(e, g, void 0, A && A[g]));
        else {
            const e = Object.keys(i);
            o = new Array(e.length);
            for (let g = 0, n = e.length; g < n; g++) {
                const O = e[g];
                o[g] = l(i[O], O, g, A && A[g])
            }
        }
    else o = [];
    return a && (a[c] = o), o
}
const lc = i => i ? oo(i) ? ha(i) || i.proxy : lc(i.parent) : null,
    _l = Oi(Object.create(null), {
        $: i => i,
        $el: i => i.vnode.el,
        $data: i => i.data,
        $props: i => i.props,
        $attrs: i => i.attrs,
        $slots: i => i.slots,
        $refs: i => i.refs,
        $parent: i => lc(i.parent),
        $root: i => lc(i.root),
        $emit: i => i.emit,
        $options: i => Dc(i),
        $forceUpdate: i => i.f || (i.f = () => fc(i.update)),
        $nextTick: i => i.n || (i.n = ts.bind(i.proxy)),
        $watch: i => Ms.bind(i)
    }),
    Ja = (i, l) => i !== oi && !i.__isScriptSetup && x(i, l),
    Ks = {
        get({
            _: i
        }, l) {
            const {
                ctx: a,
                setupState: c,
                data: o,
                props: A,
                accessCache: e,
                type: g,
                appContext: n
            } = i;
            let O;
            if (l[0] !== "$") {
                const F = e[l];
                if (F !== void 0) switch (F) {
                    case 1:
                        return c[l];
                    case 2:
                        return o[l];
                    case 4:
                        return a[l];
                    case 3:
                        return A[l]
                } else {
                    if (Ja(c, l)) return e[l] = 1, c[l];
                    if (o !== oi && x(o, l)) return e[l] = 2, o[l];
                    if ((O = i.propsOptions[0]) && x(O, l)) return e[l] = 3, A[l];
                    if (a !== oi && x(a, l)) return e[l] = 4, a[l];
                    ac && (e[l] = 0)
                }
            }
            const T = _l[l];
            let t, N;
            if (T) return l === "$attrs" && Di(i, "get", l), T(i);
            if ((t = g.__cssModules) && (t = t[l])) return t;
            if (a !== oi && x(a, l)) return e[l] = 4, a[l];
            if (N = n.config.globalProperties, x(N, l)) return N[l]
        },
        set({
            _: i
        }, l, a) {
            const {
                data: c,
                setupState: o,
                ctx: A
            } = i;
            return Ja(o, l) ? (o[l] = a, !0) : c !== oi && x(c, l) ? (c[l] = a, !0) : x(i.props, l) || l[0] === "$" && l.slice(1) in i ? !1 : (A[l] = a, !0)
        },
        has({
            _: {
                data: i,
                setupState: l,
                accessCache: a,
                ctx: c,
                appContext: o,
                propsOptions: A
            }
        }, e) {
            let g;
            return !!a[e] || i !== oi && x(i, e) || Ja(l, e) || (g = A[0]) && x(g, e) || x(c, e) || x(_l, e) || x(o.config.globalProperties, e)
        },
        defineProperty(i, l, a) {
            return a.get != null ? i._.accessCache[l] = 0 : x(a, "value") && this.set(i, l, a.value, null), Reflect.defineProperty(i, l, a)
        }
    };

function Zc(i) {
    return J(i) ? i.reduce((l, a) => (l[a] = null, l), {}) : i
}
let ac = !0;

function ms(i) {
    const l = Dc(i),
        a = i.proxy,
        c = i.ctx;
    ac = !1, l.beforeCreate && kc(l.beforeCreate, i, "bc");
    const {
        data: o,
        computed: A,
        methods: e,
        watch: g,
        provide: n,
        inject: O,
        created: T,
        beforeMount: t,
        mounted: N,
        beforeUpdate: F,
        updated: H,
        activated: I,
        deactivated: C,
        beforeDestroy: Ai,
        beforeUnmount: li,
        destroyed: ni,
        unmounted: y,
        render: ui,
        renderTracked: ei,
        renderTriggered: sl,
        errorCaptured: fi,
        serverPrefetch: Yl,
        expose: ki,
        inheritAttrs: b,
        components: V,
        directives: Al,
        filters: Wl
    } = l;
    if (O && Ys(O, c, null), e)
        for (const q in e) {
            const j = e[q];
            w(j) && (c[q] = j.bind(a))
        }
    if (o) {
        const q = o.call(a, a);
        si(q) && (i.data = al(q))
    }
    if (ac = !0, A)
        for (const q in A) {
            const j = A[q],
                Hi = w(j) ? j.bind(a, a) : w(j.get) ? j.get.bind(a, a) : Zi,
                K = !w(j) && w(j.set) ? j.set.bind(a) : Zi,
                S = IA({
                    get: Hi,
                    set: K
                });
            Object.defineProperty(c, q, {
                enumerable: !0,
                configurable: !0,
                get: () => S.value,
                set: L => S.value = L
            })
        }
    if (g)
        for (const q in g) xn(g[q], c, a, q);
    if (n) {
        const q = w(n) ? n.call(a) : n;
        Reflect.ownKeys(q).forEach(j => {
            ws(j, q[j])
        })
    }
    T && kc(T, i, "c");

    function ri(q, j) {
        J(j) ? j.forEach(Hi => q(Hi.bind(a))) : j && q(j.bind(a))
    }
    if (ri(Hs, t), ri(Pc, N), ri(Us, F), ri(Bs, H), ri(Ps, I), ri(Gs, C), ri(Vs, fi), ri(hs, ei), ri(Fs, sl), ri(Gc, li), ri(kn, y), ri(ps, Yl), J(ki))
        if (ki.length) {
            const q = i.exposed || (i.exposed = {});
            ki.forEach(j => {
                Object.defineProperty(q, j, {
                    get: () => a[j],
                    set: Hi => a[j] = Hi
                })
            })
        } else i.exposed || (i.exposed = {});
    ui && i.render === Zi && (i.render = ui), b != null && (i.inheritAttrs = b), V && (i.components = V), Al && (i.directives = Al)
}

function Ys(i, l, a = Zi) {
    J(i) && (i = cc(i));
    for (const c in i) {
        const o = i[c];
        let A;
        si(o) ? "default" in o ? A = Ra(o.from || c, o.default, !0) : A = Ra(o.from || c) : A = Ra(o), ti(A) ? Object.defineProperty(l, c, {
            enumerable: !0,
            configurable: !0,
            get: () => A.value,
            set: e => A.value = e
        }) : l[c] = A
    }
}

function kc(i, l, a) {
    Ji(J(i) ? i.map(c => c.bind(l.proxy)) : i.bind(l.proxy), l, a)
}

function xn(i, l, a, c) {
    const o = c.includes(".") ? _n(a, c) : () => a[c];
    if (Ni(i)) {
        const A = l[i];
        w(A) && ga(o, A)
    } else if (w(i)) ga(o, i.bind(a));
    else if (si(i))
        if (J(i)) i.forEach(A => xn(A, l, a, c));
        else {
            const A = w(i.handler) ? i.handler.bind(a) : l[i.handler];
            w(A) && ga(o, A, i)
        }
}

function Dc(i) {
    const l = i.type,
        {
            mixins: a,
            extends: c
        } = l,
        {
            mixins: o,
            optionsCache: A,
            config: {
                optionMergeStrategies: e
            }
        } = i.appContext,
        g = A.get(l);
    let n;
    return g ? n = g : !o.length && !a && !c ? n = l : (n = {}, o.length && o.forEach(O => Na(n, O, e, !0)), Na(n, l, e)), si(l) && A.set(l, n), n
}

function Na(i, l, a, c = !1) {
    const {
        mixins: o,
        extends: A
    } = l;
    A && Na(i, A, a, !0), o && o.forEach(e => Na(i, e, a, !0));
    for (const e in l)
        if (!(c && e === "expose")) {
            const g = Ws[e] || a && a[e];
            i[e] = g ? g(i[e], l[e]) : l[e]
        } return i
}
const Ws = {
    data: xc,
    props: $c,
    emits: $c,
    methods: wl,
    computed: wl,
    beforeCreate: di,
    created: di,
    beforeMount: di,
    mounted: di,
    beforeUpdate: di,
    updated: di,
    beforeDestroy: di,
    beforeUnmount: di,
    destroyed: di,
    unmounted: di,
    activated: di,
    deactivated: di,
    errorCaptured: di,
    serverPrefetch: di,
    components: wl,
    directives: wl,
    watch: Js,
    provide: xc,
    inject: ys
};

function xc(i, l) {
    return l ? i ? function() {
        return Oi(w(i) ? i.call(this, this) : i, w(l) ? l.call(this, this) : l)
    } : l : i
}

function ys(i, l) {
    return wl(cc(i), cc(l))
}

function cc(i) {
    if (J(i)) {
        const l = {};
        for (let a = 0; a < i.length; a++) l[i[a]] = i[a];
        return l
    }
    return i
}

function di(i, l) {
    return i ? [...new Set([].concat(i, l))] : l
}

function wl(i, l) {
    return i ? Oi(Object.create(null), i, l) : l
}

function $c(i, l) {
    return i ? J(i) && J(l) ? [...new Set([...i, ...l])] : Oi(Object.create(null), Zc(i), Zc(l ?? {})) : l
}

function Js(i, l) {
    if (!i) return l;
    if (!l) return i;
    const a = Oi(Object.create(null), i);
    for (const c in l) a[c] = di(i[c], l[c]);
    return a
}

function $n() {
    return {
        app: null,
        config: {
            isNativeTag: Co,
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
let Xs = 0;

function vs(i, l) {
    return function(c, o = null) {
        w(c) || (c = Oi({}, c)), o != null && !si(o) && (o = null);
        const A = $n(),
            e = new WeakSet;
        let g = !1;
        const n = A.app = {
            _uid: Xs++,
            _component: c,
            _props: o,
            _container: null,
            _context: A,
            _instance: null,
            version: TA,
            get config() {
                return A.config
            },
            set config(O) {},
            use(O, ...T) {
                return e.has(O) || (O && w(O.install) ? (e.add(O), O.install(n, ...T)) : w(O) && (e.add(O), O(n, ...T))), n
            },
            mixin(O) {
                return A.mixins.includes(O) || A.mixins.push(O), n
            },
            component(O, T) {
                return T ? (A.components[O] = T, n) : A.components[O]
            },
            directive(O, T) {
                return T ? (A.directives[O] = T, n) : A.directives[O]
            },
            mount(O, T, t) {
                if (!g) {
                    const N = Bi(c, o);
                    return N.appContext = A, T && l ? l(N, O) : i(N, O, t), g = !0, n._container = O, O.__vue_app__ = n, ha(N.component) || N.component.proxy
                }
            },
            unmount() {
                g && (i(null, n._container), delete n._container.__vue_app__)
            },
            provide(O, T) {
                return A.provides[O] = T, n
            },
            runWithContext(O) {
                Oa = n;
                try {
                    return O()
                } finally {
                    Oa = null
                }
            }
        };
        return n
    }
}
let Oa = null;

function ws(i, l) {
    if (Ci) {
        let a = Ci.provides;
        const c = Ci.parent && Ci.parent.provides;
        c === a && (a = Ci.provides = Object.create(c)), a[i] = l
    }
}

function Ra(i, l, a = !1) {
    const c = Ci || Wi;
    if (c || Oa) {
        const o = c ? c.parent == null ? c.vnode.appContext && c.vnode.appContext.provides : c.parent.provides : Oa._context.provides;
        if (o && i in o) return o[i];
        if (arguments.length > 1) return a && w(l) ? l.call(c && c.proxy) : l
    }
}

function _s(i, l, a, c = !1) {
    const o = {},
        A = {};
    Ia(A, Fa, 1), i.propsDefaults = Object.create(null), Qn(i, l, o, A);
    for (const e in i.propsOptions[0]) e in o || (o[e] = void 0);
    a ? i.props = c ? o : cs(o) : i.type.props ? i.props = o : i.props = A, i.attrs = A
}

function bs(i, l, a, c) {
    const {
        props: o,
        attrs: A,
        vnode: {
            patchFlag: e
        }
    } = i, g = Q(o), [n] = i.propsOptions;
    let O = !1;
    if ((c || e > 0) && !(e & 16)) {
        if (e & 8) {
            const T = i.vnode.dynamicProps;
            for (let t = 0; t < T.length; t++) {
                let N = T[t];
                if (Ha(i.emitsOptions, N)) continue;
                const F = l[N];
                if (n)
                    if (x(A, N)) F !== A[N] && (A[N] = F, O = !0);
                    else {
                        const H = Hl(N);
                        o[H] = nc(n, g, H, F, i, !1)
                    }
                else F !== A[N] && (A[N] = F, O = !0)
            }
        }
    } else {
        Qn(i, l, o, A) && (O = !0);
        let T;
        for (const t in g)(!l || !x(l, t) && ((T = Fl(t)) === t || !x(l, T))) && (n ? a && (a[t] !== void 0 || a[T] !== void 0) && (o[t] = nc(n, g, t, void 0, i, !0)) : delete o[t]);
        if (A !== g)
            for (const t in A)(!l || !x(l, t)) && (delete A[t], O = !0)
    }
    O && Qi(i, "set", "$attrs")
}

function Qn(i, l, a, c) {
    const [o, A] = i.propsOptions;
    let e = !1,
        g;
    if (l)
        for (let n in l) {
            if (Aa(n)) continue;
            const O = l[n];
            let T;
            o && x(o, T = Hl(n)) ? !A || !A.includes(T) ? a[T] = O : (g || (g = {}))[T] = O : Ha(i.emitsOptions, n) || (!(n in c) || O !== c[n]) && (c[n] = O, e = !0)
        }
    if (A) {
        const n = Q(a),
            O = g || oi;
        for (let T = 0; T < A.length; T++) {
            const t = A[T];
            a[t] = nc(o, n, t, O[t], i, !x(O, t))
        }
    }
    return e
}

function nc(i, l, a, c, o, A) {
    const e = i[a];
    if (e != null) {
        const g = x(e, "default");
        if (g && c === void 0) {
            const n = e.default;
            if (e.type !== Function && !e.skipFactory && w(n)) {
                const {
                    propsDefaults: O
                } = o;
                a in O ? c = O[a] : (pl(o), c = O[a] = n.call(null, l), Nl())
            } else c = n
        }
        e[0] && (A && !g ? c = !1 : e[1] && (c === "" || c === Fl(a)) && (c = !0))
    }
    return c
}

function qn(i, l, a = !1) {
    const c = l.propsCache,
        o = c.get(i);
    if (o) return o;
    const A = i.props,
        e = {},
        g = [];
    let n = !1;
    if (!w(i)) {
        const T = t => {
            n = !0;
            const [N, F] = qn(t, l, !0);
            Oi(e, N), F && g.push(...F)
        };
        !a && l.mixins.length && l.mixins.forEach(T), i.extends && T(i.extends), i.mixins && i.mixins.forEach(T)
    }
    if (!A && !n) return si(i) && c.set(i, dl), dl;
    if (J(A))
        for (let T = 0; T < A.length; T++) {
            const t = Hl(A[T]);
            Qc(t) && (e[t] = oi)
        } else if (A)
            for (const T in A) {
                const t = Hl(T);
                if (Qc(t)) {
                    const N = A[T],
                        F = e[t] = J(N) || w(N) ? {
                            type: N
                        } : Oi({}, N);
                    if (F) {
                        const H = zc(Boolean, F.type),
                            I = zc(String, F.type);
                        F[0] = H > -1, F[1] = I < 0 || H < I, (H > -1 || x(F, "default")) && g.push(t)
                    }
                }
            }
    const O = [e, g];
    return si(i) && c.set(i, O), O
}

function Qc(i) {
    return i[0] !== "$"
}

function qc(i) {
    const l = i && i.toString().match(/^\s*(function|class) (\w+)/);
    return l ? l[2] : i === null ? "null" : ""
}

function jc(i, l) {
    return qc(i) === qc(l)
}

function zc(i, l) {
    return J(l) ? l.findIndex(a => jc(a, i)) : w(l) && jc(l, i) ? 0 : -1
}
const jn = i => i[0] === "_" || i === "$stable",
    Hc = i => J(i) ? i.map(_i) : [_i(i)],
    Zs = (i, l, a) => {
        if (l._n) return l;
        const c = Ts((...o) => Hc(l(...o)), a);
        return c._c = !1, c
    },
    zn = (i, l, a) => {
        const c = i._ctx;
        for (const o in i) {
            if (jn(o)) continue;
            const A = i[o];
            if (w(A)) l[o] = Zs(o, A, c);
            else if (A != null) {
                const e = Hc(A);
                l[o] = () => e
            }
        }
    },
    io = (i, l) => {
        const a = Hc(l);
        i.slots.default = () => a
    },
    ks = (i, l) => {
        if (i.vnode.shapeFlag & 32) {
            const a = l._;
            a ? (i.slots = Q(l), Ia(l, "_", a)) : zn(l, i.slots = {})
        } else i.slots = {}, l && io(i, l);
        Ia(i.slots, Fa, 1)
    },
    xs = (i, l, a) => {
        const {
            vnode: c,
            slots: o
        } = i;
        let A = !0,
            e = oi;
        if (c.shapeFlag & 32) {
            const g = l._;
            g ? a && g === 1 ? A = !1 : (Oi(o, l), !a && g === 1 && delete o._) : (A = !l.$stable, zn(l, o)), e = l
        } else l && (io(i, l), e = {
            default: 1
        });
        if (A)
            for (const g in o) !jn(g) && e[g] == null && delete o[g]
    };

function oc(i, l, a, c, o = !1) {
    if (J(i)) {
        i.forEach((N, F) => oc(N, l && (J(l) ? l[F] : l), a, c, o));
        return
    }
    if (ta(c) && !o) return;
    const A = c.shapeFlag & 4 ? ha(c.component) || c.component.proxy : c.el,
        e = o ? null : A,
        {
            i: g,
            r: n
        } = i,
        O = l && l.r,
        T = g.refs === oi ? g.refs = {} : g.refs,
        t = g.setupState;
    if (O != null && O !== n && (Ni(O) ? (T[O] = null, x(t, O) && (t[O] = null)) : ti(O) && (O.value = null)), w(n)) cl(n, g, 12, [e, T]);
    else {
        const N = Ni(n),
            F = ti(n);
        if (N || F) {
            const H = () => {
                if (i.f) {
                    const I = N ? x(t, n) ? t[n] : T[n] : n.value;
                    o ? J(I) && Ic(I, A) : J(I) ? I.includes(A) || I.push(A) : N ? (T[n] = [A], x(t, n) && (t[n] = T[n])) : (n.value = [A], i.k && (T[i.k] = n.value))
                } else N ? (T[n] = e, x(t, n) && (t[n] = e)) : F && (n.value = e, i.k && (T[i.k] = e))
            };
            e ? (H.id = -1, Pi(H, a)) : H()
        }
    }
}
const Pi = ds;

function $s(i) {
    return Qs(i)
}

function Qs(i, l) {
    const a = $a();
    a.__VUE__ = !0;
    const {
        insert: c,
        remove: o,
        patchProp: A,
        createElement: e,
        createText: g,
        createComment: n,
        setText: O,
        setElementText: T,
        parentNode: t,
        nextSibling: N,
        setScopeId: F = Zi,
        insertStaticContent: H
    } = i, I = (E, r, u, f = null, d = null, U = null, h = !1, G = null, p = !!r.dynamicChildren) => {
        if (E === r) return;
        E && !Xl(E, r) && (f = ia(E), L(E, d, U, !0), E = null), r.patchFlag === -2 && (p = !1, r.dynamicChildren = null);
        const {
            type: M,
            ref: Y,
            shapeFlag: m
        } = r;
        switch (M) {
            case pa:
                C(E, r, u, f);
                break;
            case Ll:
                Ai(E, r, u, f);
                break;
            case Xa:
                E == null && li(r, u, f, h);
                break;
            case ci:
                V(E, r, u, f, d, U, h, G, p);
                break;
            default:
                m & 1 ? ui(E, r, u, f, d, U, h, G, p) : m & 6 ? Al(E, r, u, f, d, U, h, G, p) : (m & 64 || m & 128) && M.process(E, r, u, f, d, U, h, G, p, Cl)
        }
        Y != null && d && oc(Y, E && E.ref, U, r || E, !r)
    }, C = (E, r, u, f) => {
        if (E == null) c(r.el = g(r.children), u, f);
        else {
            const d = r.el = E.el;
            r.children !== E.children && O(d, r.children)
        }
    }, Ai = (E, r, u, f) => {
        E == null ? c(r.el = n(r.children || ""), u, f) : r.el = E.el
    }, li = (E, r, u, f) => {
        [E.el, E.anchor] = H(E.children, r, u, f, E.el, E.anchor)
    }, ni = ({
        el: E,
        anchor: r
    }, u, f) => {
        let d;
        for (; E && E !== r;) d = N(E), c(E, u, f), E = d;
        c(r, u, f)
    }, y = ({
        el: E,
        anchor: r
    }) => {
        let u;
        for (; E && E !== r;) u = N(E), o(E), E = u;
        o(r)
    }, ui = (E, r, u, f, d, U, h, G, p) => {
        h = h || r.type === "svg", E == null ? ei(r, u, f, d, U, h, G, p) : Yl(E, r, d, U, h, G, p)
    }, ei = (E, r, u, f, d, U, h, G) => {
        let p, M;
        const {
            type: Y,
            props: m,
            shapeFlag: W,
            transition: X,
            dirs: Z
        } = E;
        if (p = E.el = e(E.type, U, m && m.is, m), W & 8 ? T(p, E.children) : W & 16 && fi(E.children, p, null, f, d, U && Y !== "foreignObject", h, G), Z && el(E, null, f, "created"), sl(p, E, E.scopeId, h, f), m) {
            for (const z in m) z !== "value" && !Aa(z) && A(p, z, null, m[z], U, E.children, f, d, xi);
            "value" in m && A(p, "value", null, m.value), (M = m.onVnodeBeforeMount) && vi(M, f, E)
        }
        Z && el(E, null, f, "beforeMount");
        const ai = qs(d, X);
        ai && X.beforeEnter(p), c(p, r, u), ((M = m && m.onVnodeMounted) || ai || Z) && Pi(() => {
            M && vi(M, f, E), ai && X.enter(p), Z && el(E, null, f, "mounted")
        }, d)
    }, sl = (E, r, u, f, d) => {
        if (u && F(E, u), f)
            for (let U = 0; U < f.length; U++) F(E, f[U]);
        if (d) {
            let U = d.subTree;
            if (r === U) {
                const h = d.vnode;
                sl(E, h, h.scopeId, h.slotScopeIds, d.parent)
            }
        }
    }, fi = (E, r, u, f, d, U, h, G, p = 0) => {
        for (let M = p; M < E.length; M++) {
            const Y = E[M] = G ? il(E[M]) : _i(E[M]);
            I(null, Y, r, u, f, d, U, h, G)
        }
    }, Yl = (E, r, u, f, d, U, h) => {
        const G = r.el = E.el;
        let {
            patchFlag: p,
            dynamicChildren: M,
            dirs: Y
        } = r;
        p |= E.patchFlag & 16;
        const m = E.props || oi,
            W = r.props || oi;
        let X;
        u && gl(u, !1), (X = W.onVnodeBeforeUpdate) && vi(X, u, r, E), Y && el(r, E, u, "beforeUpdate"), u && gl(u, !0);
        const Z = d && r.type !== "foreignObject";
        if (M ? ki(E.dynamicChildren, M, G, u, f, Z, U) : h || j(E, r, G, null, u, f, Z, U, !1), p > 0) {
            if (p & 16) b(G, r, m, W, u, f, d);
            else if (p & 2 && m.class !== W.class && A(G, "class", null, W.class, d), p & 4 && A(G, "style", m.style, W.style, d), p & 8) {
                const ai = r.dynamicProps;
                for (let z = 0; z < ai.length; z++) {
                    const Ti = ai[z],
                        hi = m[Ti],
                        ul = W[Ti];
                    (ul !== hi || Ti === "value") && A(G, Ti, hi, ul, d, E.children, u, f, xi)
                }
            }
            p & 1 && E.children !== r.children && T(G, r.children)
        } else !h && M == null && b(G, r, m, W, u, f, d);
        ((X = W.onVnodeUpdated) || Y) && Pi(() => {
            X && vi(X, u, r, E), Y && el(r, E, u, "updated")
        }, f)
    }, ki = (E, r, u, f, d, U, h) => {
        for (let G = 0; G < r.length; G++) {
            const p = E[G],
                M = r[G],
                Y = p.el && (p.type === ci || !Xl(p, M) || p.shapeFlag & 70) ? t(p.el) : u;
            I(p, M, Y, null, f, d, U, h, !0)
        }
    }, b = (E, r, u, f, d, U, h) => {
        if (u !== f) {
            if (u !== oi)
                for (const G in u) !Aa(G) && !(G in f) && A(E, G, u[G], null, h, r.children, d, U, xi);
            for (const G in f) {
                if (Aa(G)) continue;
                const p = f[G],
                    M = u[G];
                p !== M && G !== "value" && A(E, G, M, p, h, r.children, d, U, xi)
            }
            "value" in f && A(E, "value", u.value, f.value)
        }
    }, V = (E, r, u, f, d, U, h, G, p) => {
        const M = r.el = E ? E.el : g(""),
            Y = r.anchor = E ? E.anchor : g("");
        let {
            patchFlag: m,
            dynamicChildren: W,
            slotScopeIds: X
        } = r;
        X && (G = G ? G.concat(X) : X), E == null ? (c(M, u, f), c(Y, u, f), fi(r.children, u, Y, d, U, h, G, p)) : m > 0 && m & 64 && W && E.dynamicChildren ? (ki(E.dynamicChildren, W, u, d, U, h, G), (r.key != null || d && r === d.subTree) && lo(E, r, !0)) : j(E, r, u, Y, d, U, h, G, p)
    }, Al = (E, r, u, f, d, U, h, G, p) => {
        r.slotScopeIds = G, E == null ? r.shapeFlag & 512 ? d.ctx.activate(r, u, f, h, p) : Wl(r, u, f, d, U, h, p) : yl(E, r, p)
    }, Wl = (E, r, u, f, d, U, h) => {
        const G = E.component = AA(E, f, d);
        if (bn(E) && (G.ctx.renderer = Cl), eA(G), G.asyncDep) {
            if (d && d.registerDep(G, ri), !E.el) {
                const p = G.subTree = Bi(Ll);
                Ai(null, p, r, u)
            }
            return
        }
        ri(G, E, r, u, d, U, h)
    }, yl = (E, r, u) => {
        const f = r.component = E.component;
        if (Ls(E, r, u))
            if (f.asyncDep && !f.asyncResolved) {
                q(f, r, u);
                return
            } else f.next = r, Es(f.update), f.update();
        else r.el = E.el, f.vnode = r
    }, ri = (E, r, u, f, d, U, h) => {
        const G = () => {
                if (E.isMounted) {
                    let {
                        next: Y,
                        bu: m,
                        u: W,
                        parent: X,
                        vnode: Z
                    } = E, ai = Y, z;
                    gl(E, !1), Y ? (Y.el = Z.el, q(E, Y, h)) : Y = Z, m && ea(m), (z = Y.props && Y.props.onVnodeBeforeUpdate) && vi(z, X, Y, Z), gl(E, !0);
                    const Ti = ya(E),
                        hi = E.subTree;
                    E.subTree = Ti, I(hi, Ti, t(hi.el), ia(hi), E, d, U), Y.el = Ti.el, ai === null && Cs(E, Ti.el), W && Pi(W, d), (z = Y.props && Y.props.onVnodeUpdated) && Pi(() => vi(z, X, Y, Z), d)
                } else {
                    let Y;
                    const {
                        el: m,
                        props: W
                    } = r, {
                        bm: X,
                        m: Z,
                        parent: ai
                    } = E, z = ta(r);
                    if (gl(E, !1), X && ea(X), !z && (Y = W && W.onVnodeBeforeMount) && vi(Y, ai, r), gl(E, !0), m && ma) {
                        const Ti = () => {
                            E.subTree = ya(E), ma(m, E.subTree, E, d, null)
                        };
                        z ? r.type.__asyncLoader().then(() => !E.isUnmounted && Ti()) : Ti()
                    } else {
                        const Ti = E.subTree = ya(E);
                        I(null, Ti, u, f, E, d, U), r.el = Ti.el
                    }
                    if (Z && Pi(Z, d), !z && (Y = W && W.onVnodeMounted)) {
                        const Ti = r;
                        Pi(() => vi(Y, ai, Ti), d)
                    }(r.shapeFlag & 256 || ai && ta(ai.vnode) && ai.vnode.shapeFlag & 256) && E.a && Pi(E.a, d), E.isMounted = !0, r = u = f = null
                }
            },
            p = E.effect = new Tc(G, () => fc(M), E.scope),
            M = E.update = () => p.run();
        M.id = E.uid, gl(E, !0), M()
    }, q = (E, r, u) => {
        r.component = E;
        const f = E.vnode.props;
        E.vnode = r, E.next = null, bs(E, r.props, f, u), xs(E, r.children, u), hl(), _c(E), Vl()
    }, j = (E, r, u, f, d, U, h, G, p = !1) => {
        const M = E && E.children,
            Y = E ? E.shapeFlag : 0,
            m = r.children,
            {
                patchFlag: W,
                shapeFlag: X
            } = r;
        if (W > 0) {
            if (W & 128) {
                K(M, m, u, f, d, U, h, G, p);
                return
            } else if (W & 256) {
                Hi(M, m, u, f, d, U, h, G, p);
                return
            }
        }
        X & 8 ? (Y & 16 && xi(M, d, U), m !== M && T(u, m)) : Y & 16 ? X & 16 ? K(M, m, u, f, d, U, h, G, p) : xi(M, d, U, !0) : (Y & 8 && T(u, ""), X & 16 && fi(m, u, f, d, U, h, G, p))
    }, Hi = (E, r, u, f, d, U, h, G, p) => {
        E = E || dl, r = r || dl;
        const M = E.length,
            Y = r.length,
            m = Math.min(M, Y);
        let W;
        for (W = 0; W < m; W++) {
            const X = r[W] = p ? il(r[W]) : _i(r[W]);
            I(E[W], X, u, null, d, U, h, G, p)
        }
        M > Y ? xi(E, d, U, !0, !1, m) : fi(r, u, f, d, U, h, G, p, m)
    }, K = (E, r, u, f, d, U, h, G, p) => {
        let M = 0;
        const Y = r.length;
        let m = E.length - 1,
            W = Y - 1;
        for (; M <= m && M <= W;) {
            const X = E[M],
                Z = r[M] = p ? il(r[M]) : _i(r[M]);
            if (Xl(X, Z)) I(X, Z, u, null, d, U, h, G, p);
            else break;
            M++
        }
        for (; M <= m && M <= W;) {
            const X = E[m],
                Z = r[W] = p ? il(r[W]) : _i(r[W]);
            if (Xl(X, Z)) I(X, Z, u, null, d, U, h, G, p);
            else break;
            m--, W--
        }
        if (M > m) {
            if (M <= W) {
                const X = W + 1,
                    Z = X < Y ? r[X].el : f;
                for (; M <= W;) I(null, r[M] = p ? il(r[M]) : _i(r[M]), u, Z, d, U, h, G, p), M++
            }
        } else if (M > W)
            for (; M <= m;) L(E[M], d, U, !0), M++;
        else {
            const X = M,
                Z = M,
                ai = new Map;
            for (M = Z; M <= W; M++) {
                const Ui = r[M] = p ? il(r[M]) : _i(r[M]);
                Ui.key != null && ai.set(Ui.key, M)
            }
            let z, Ti = 0;
            const hi = W - Z + 1;
            let ul = !1,
                Fc = 0;
            const Jl = new Array(hi);
            for (M = 0; M < hi; M++) Jl[M] = 0;
            for (M = X; M <= m; M++) {
                const Ui = E[M];
                if (Ti >= hi) {
                    L(Ui, d, U, !0);
                    continue
                }
                let Xi;
                if (Ui.key != null) Xi = ai.get(Ui.key);
                else
                    for (z = Z; z <= W; z++)
                        if (Jl[z - Z] === 0 && Xl(Ui, r[z])) {
                            Xi = z;
                            break
                        } Xi === void 0 ? L(Ui, d, U, !0) : (Jl[Xi - Z] = M + 1, Xi >= Fc ? Fc = Xi : ul = !0, I(Ui, r[Xi], u, null, d, U, h, G, p), Ti++)
            }
            const hc = ul ? js(Jl) : dl;
            for (z = hc.length - 1, M = hi - 1; M >= 0; M--) {
                const Ui = Z + M,
                    Xi = r[Ui],
                    Vc = Ui + 1 < Y ? r[Ui + 1].el : f;
                Jl[M] === 0 ? I(null, Xi, u, Vc, d, U, h, G, p) : ul && (z < 0 || M !== hc[z] ? S(Xi, u, Vc, 2) : z--)
            }
        }
    }, S = (E, r, u, f, d = null) => {
        const {
            el: U,
            type: h,
            transition: G,
            children: p,
            shapeFlag: M
        } = E;
        if (M & 6) {
            S(E.component.subTree, r, u, f);
            return
        }
        if (M & 128) {
            E.suspense.move(r, u, f);
            return
        }
        if (M & 64) {
            h.move(E, r, u, Cl);
            return
        }
        if (h === ci) {
            c(U, r, u);
            for (let m = 0; m < p.length; m++) S(p[m], r, u, f);
            c(E.anchor, r, u);
            return
        }
        if (h === Xa) {
            ni(E, r, u);
            return
        }
        if (f !== 2 && M & 1 && G)
            if (f === 0) G.beforeEnter(U), c(U, r, u), Pi(() => G.enter(U), d);
            else {
                const {
                    leave: m,
                    delayLeave: W,
                    afterLeave: X
                } = G, Z = () => c(U, r, u), ai = () => {
                    m(U, () => {
                        Z(), X && X()
                    })
                };
                W ? W(U, Z, ai) : ai()
            }
        else c(U, r, u)
    }, L = (E, r, u, f = !1, d = !1) => {
        const {
            type: U,
            props: h,
            ref: G,
            children: p,
            dynamicChildren: M,
            shapeFlag: Y,
            patchFlag: m,
            dirs: W
        } = E;
        if (G != null && oc(G, null, u, E, !0), Y & 256) {
            r.ctx.deactivate(E);
            return
        }
        const X = Y & 1 && W,
            Z = !ta(E);
        let ai;
        if (Z && (ai = h && h.onVnodeBeforeUnmount) && vi(ai, r, E), Y & 6) ji(E.component, u, f);
        else {
            if (Y & 128) {
                E.suspense.unmount(u, f);
                return
            }
            X && el(E, null, r, "beforeUnmount"), Y & 64 ? E.type.remove(E, r, u, d, Cl, f) : M && (U !== ci || m > 0 && m & 64) ? xi(M, r, u, !1, !0) : (U === ci && m & 384 || !d && Y & 16) && xi(p, r, u), f && v(E)
        }(Z && (ai = h && h.onVnodeUnmounted) || X) && Pi(() => {
            ai && vi(ai, r, E), X && el(E, null, r, "unmounted")
        }, u)
    }, v = E => {
        const {
            type: r,
            el: u,
            anchor: f,
            transition: d
        } = E;
        if (r === ci) {
            Si(u, f);
            return
        }
        if (r === Xa) {
            y(E);
            return
        }
        const U = () => {
            o(u), d && !d.persisted && d.afterLeave && d.afterLeave()
        };
        if (E.shapeFlag & 1 && d && !d.persisted) {
            const {
                leave: h,
                delayLeave: G
            } = d, p = () => h(u, U);
            G ? G(E.el, U, p) : p()
        } else U()
    }, Si = (E, r) => {
        let u;
        for (; E !== r;) u = N(E), o(E), E = u;
        o(r)
    }, ji = (E, r, u) => {
        const {
            bum: f,
            scope: d,
            update: U,
            subTree: h,
            um: G
        } = E;
        f && ea(f), d.stop(), U && (U.active = !1, L(h, E, r, u)), G && Pi(G, r), Pi(() => {
            E.isUnmounted = !0
        }, r), r && r.pendingBranch && !r.isUnmounted && E.asyncDep && !E.asyncResolved && E.suspenseId === r.pendingId && (r.deps--, r.deps === 0 && r.resolve())
    }, xi = (E, r, u, f = !1, d = !1, U = 0) => {
        for (let h = U; h < E.length; h++) L(E[h], r, u, f, d)
    }, ia = E => E.shapeFlag & 6 ? ia(E.component.subTree) : E.shapeFlag & 128 ? E.suspense.next() : N(E.anchor || E.el), pc = (E, r, u) => {
        E == null ? r._vnode && L(r._vnode, null, null, !0) : I(r._vnode || null, E, r, null, null, null, u), _c(), Jn(), r._vnode = E
    }, Cl = {
        p: I,
        um: L,
        m: S,
        r: v,
        mt: Wl,
        mc: fi,
        pc: j,
        pbc: ki,
        n: ia,
        o: i
    };
    let Ka, ma;
    return l && ([Ka, ma] = l(Cl)), {
        render: pc,
        hydrate: Ka,
        createApp: vs(pc, Ka)
    }
}

function gl({
    effect: i,
    update: l
}, a) {
    i.allowRecurse = l.allowRecurse = a
}

function qs(i, l) {
    return (!i || i && !i.pendingBranch) && l && !l.persisted
}

function lo(i, l, a = !1) {
    const c = i.children,
        o = l.children;
    if (J(c) && J(o))
        for (let A = 0; A < c.length; A++) {
            const e = c[A];
            let g = o[A];
            g.shapeFlag & 1 && !g.dynamicChildren && ((g.patchFlag <= 0 || g.patchFlag === 32) && (g = o[A] = il(o[A]), g.el = e.el), a || lo(e, g)), g.type === pa && (g.el = e.el)
        }
}

function js(i) {
    const l = i.slice(),
        a = [0];
    let c, o, A, e, g;
    const n = i.length;
    for (c = 0; c < n; c++) {
        const O = i[c];
        if (O !== 0) {
            if (o = a[a.length - 1], i[o] < O) {
                l[c] = o, a.push(c);
                continue
            }
            for (A = 0, e = a.length - 1; A < e;) g = A + e >> 1, i[a[g]] < O ? A = g + 1 : e = g;
            O < i[a[A]] && (A > 0 && (l[c] = a[A - 1]), a[A] = c)
        }
    }
    for (A = a.length, e = a[A - 1]; A-- > 0;) a[A] = e, e = l[e];
    return a
}
const zs = i => i.__isTeleport,
    ci = Symbol.for("v-fgt"),
    pa = Symbol.for("v-txt"),
    Ll = Symbol.for("v-cmt"),
    Xa = Symbol.for("v-stc"),
    bl = [];
let yi = null;

function P(i = !1) {
    bl.push(yi = i ? null : [])
}

function iA() {
    bl.pop(), yi = bl[bl.length - 1] || null
}
let Ql = 1;

function ln(i) {
    Ql += i
}

function ao(i) {
    return i.dynamicChildren = Ql > 0 ? yi || dl : null, iA(), Ql > 0 && yi && yi.push(i), i
}

function B(i, l, a, c, o, A) {
    return ao(R(i, l, a, c, o, A, !0))
}

function wi(i, l, a, c, o) {
    return ao(Bi(i, l, a, c, o, !0))
}

function lA(i) {
    return i ? i.__v_isVNode === !0 : !1
}

function Xl(i, l) {
    return i.type === l.type && i.key === l.key
}
const Fa = "__vInternal",
    co = ({
        key: i
    }) => i ?? null,
    Ea = ({
        ref: i,
        ref_key: l,
        ref_for: a
    }) => (typeof i == "number" && (i = "" + i), i != null ? Ni(i) || ti(i) || w(i) ? {
        i: Wi,
        r: i,
        k: l,
        f: !!a
    } : i : null);

function R(i, l = null, a = null, c = 0, o = null, A = i === ci ? 0 : 1, e = !1, g = !1) {
    const n = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: i,
        props: l,
        key: l && co(l),
        ref: l && Ea(l),
        scopeId: Ua,
        slotScopeIds: null,
        children: a,
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
        shapeFlag: A,
        patchFlag: c,
        dynamicProps: o,
        dynamicChildren: null,
        appContext: null,
        ctx: Wi
    };
    return g ? (Uc(n, a), A & 128 && i.normalize(n)) : a && (n.shapeFlag |= Ni(a) ? 8 : 16), Ql > 0 && !e && yi && (n.patchFlag > 0 || A & 6) && n.patchFlag !== 32 && yi.push(n), n
}
const Bi = aA;

function aA(i, l = null, a = null, c = 0, o = null, A = !1) {
    if ((!i || i === us) && (i = Ll), lA(i)) {
        const g = Bl(i, l, !0);
        return a && Uc(g, a), Ql > 0 && !A && yi && (g.shapeFlag & 6 ? yi[yi.indexOf(i)] = g : yi.push(g)), g.patchFlag |= -2, g
    }
    if (EA(i) && (i = i.__vccOpts), l) {
        l = cA(l);
        let {
            class: g,
            style: n
        } = l;
        g && !Ni(g) && (l.class = Ki(g)), si(n) && (hn(n) && !J(n) && (n = Oi({}, n)), l.style = zl(n))
    }
    const e = Ni(i) ? 1 : fs(i) ? 128 : zs(i) ? 64 : si(i) ? 4 : w(i) ? 2 : 0;
    return R(i, l, a, c, o, e, A, !0)
}

function cA(i) {
    return i ? hn(i) || Fa in i ? Oi({}, i) : i : null
}

function Bl(i, l, a = !1) {
    const {
        props: c,
        ref: o,
        patchFlag: A,
        children: e
    } = i, g = l ? nA(c || {}, l) : c;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: i.type,
        props: g,
        key: g && co(g),
        ref: l && l.ref ? a && o ? J(o) ? o.concat(Ea(l)) : [o, Ea(l)] : Ea(l) : o,
        scopeId: i.scopeId,
        slotScopeIds: i.slotScopeIds,
        children: e,
        target: i.target,
        targetAnchor: i.targetAnchor,
        staticCount: i.staticCount,
        shapeFlag: i.shapeFlag,
        patchFlag: l && i.type !== ci ? A === -1 ? 16 : A | 16 : A,
        dynamicProps: i.dynamicProps,
        dynamicChildren: i.dynamicChildren,
        appContext: i.appContext,
        dirs: i.dirs,
        transition: i.transition,
        component: i.component,
        suspense: i.suspense,
        ssContent: i.ssContent && Bl(i.ssContent),
        ssFallback: i.ssFallback && Bl(i.ssFallback),
        el: i.el,
        anchor: i.anchor,
        ctx: i.ctx,
        ce: i.ce
    }
}

function no(i = " ", l = 0) {
    return Bi(pa, null, i, l)
}

function _(i = "", l = !1) {
    return l ? (P(), wi(Ll, null, i)) : Bi(Ll, null, i)
}

function _i(i) {
    return i == null || typeof i == "boolean" ? Bi(Ll) : J(i) ? Bi(ci, null, i.slice()) : typeof i == "object" ? il(i) : Bi(pa, null, String(i))
}

function il(i) {
    return i.el === null && i.patchFlag !== -1 || i.memo ? i : Bl(i)
}

function Uc(i, l) {
    let a = 0;
    const {
        shapeFlag: c
    } = i;
    if (l == null) l = null;
    else if (J(l)) a = 16;
    else if (typeof l == "object")
        if (c & 65) {
            const o = l.default;
            o && (o._c && (o._d = !1), Uc(i, o()), o._c && (o._d = !0));
            return
        } else {
            a = 32;
            const o = l._;
            !o && !(Fa in l) ? l._ctx = Wi : o === 3 && Wi && (Wi.slots._ === 1 ? l._ = 1 : (l._ = 2, i.patchFlag |= 1024))
        }
    else w(l) ? (l = {
        default: l,
        _ctx: Wi
    }, a = 32) : (l = String(l), c & 64 ? (a = 16, l = [no(l)]) : a = 8);
    i.children = l, i.shapeFlag |= a
}

function nA(...i) {
    const l = {};
    for (let a = 0; a < i.length; a++) {
        const c = i[a];
        for (const o in c)
            if (o === "class") l.class !== c.class && (l.class = Ki([l.class, c.class]));
            else if (o === "style") l.style = zl([l.style, c.style]);
        else if (fa(o)) {
            const A = l[o],
                e = c[o];
            e && A !== e && !(J(A) && A.includes(e)) && (l[o] = A ? [].concat(A, e) : e)
        } else o !== "" && (l[o] = c[o])
    }
    return l
}

function vi(i, l, a, c = null) {
    Ji(i, l, 7, [a, c])
}
const oA = $n();
let sA = 0;

function AA(i, l, a) {
    const c = i.type,
        o = (l ? l.appContext : i.appContext) || oA,
        A = {
            uid: sA++,
            vnode: i,
            type: c,
            parent: l,
            appContext: o,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Vo(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: l ? l.provides : Object.create(o.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: qn(c, o),
            emitsOptions: vn(c, o),
            emit: null,
            emitted: null,
            propsDefaults: oi,
            inheritAttrs: c.inheritAttrs,
            ctx: oi,
            data: oi,
            props: oi,
            attrs: oi,
            slots: oi,
            refs: oi,
            setupState: oi,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            suspense: a,
            suspenseId: a ? a.pendingId : 0,
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
    return A.ctx = {
        _: A
    }, A.root = l ? l.root : A, A.emit = Ss.bind(null, A), i.ce && i.ce(A), A
}
let Ci = null,
    Bc, fl, an = "__VUE_INSTANCE_SETTERS__";
(fl = $a()[an]) || (fl = $a()[an] = []), fl.push(i => Ci = i), Bc = i => {
    fl.length > 1 ? fl.forEach(l => l(i)) : fl[0](i)
};
const pl = i => {
        Bc(i), i.scope.on()
    },
    Nl = () => {
        Ci && Ci.scope.off(), Bc(null)
    };

function oo(i) {
    return i.vnode.shapeFlag & 4
}
let ql = !1;

function eA(i, l = !1) {
    ql = l;
    const {
        props: a,
        children: c
    } = i.vnode, o = oo(i);
    _s(i, a, o, l), ks(i, c);
    const A = o ? gA(i, l) : void 0;
    return ql = !1, A
}

function gA(i, l) {
    const a = i.type;
    i.accessCache = Object.create(null), i.proxy = Vn(new Proxy(i.ctx, Ks));
    const {
        setup: c
    } = a;
    if (c) {
        const o = i.setupContext = c.length > 1 ? RA(i) : null;
        pl(i), hl();
        const A = cl(c, i, 0, [i.props, o]);
        if (Vl(), Nl(), Tn(A)) {
            if (A.then(Nl, Nl), l) return A.then(e => {
                cn(i, e, l)
            }).catch(e => {
                Da(e, i, 0)
            });
            i.asyncDep = A
        } else cn(i, A, l)
    } else so(i, l)
}

function cn(i, l, a) {
    w(l) ? i.type.__ssrInlineRender ? i.ssrRender = l : i.render = l : si(l) && (i.setupState = Yn(l)), so(i, a)
}
let nn;

function so(i, l, a) {
    const c = i.type;
    if (!i.render) {
        if (!l && nn && !c.render) {
            const o = c.template || Dc(i).template;
            if (o) {
                const {
                    isCustomElement: A,
                    compilerOptions: e
                } = i.appContext.config, {
                    delimiters: g,
                    compilerOptions: n
                } = c, O = Oi(Oi({
                    isCustomElement: A,
                    delimiters: g
                }, e), n);
                c.render = nn(o, O)
            }
        }
        i.render = c.render || Zi
    } {
        pl(i), hl();
        try {
            ms(i)
        } finally {
            Vl(), Nl()
        }
    }
}

function tA(i) {
    return i.attrsProxy || (i.attrsProxy = new Proxy(i.attrs, {
        get(l, a) {
            return Di(i, "get", "$attrs"), l[a]
        }
    }))
}

function RA(i) {
    const l = a => {
        i.exposed = a || {}
    };
    return {
        get attrs() {
            return tA(i)
        },
        slots: i.slots,
        emit: i.emit,
        expose: l
    }
}

function ha(i) {
    if (i.exposed) return i.exposeProxy || (i.exposeProxy = new Proxy(Yn(Vn(i.exposed)), {
        get(l, a) {
            if (a in l) return l[a];
            if (a in _l) return _l[a](i)
        },
        has(l, a) {
            return a in l || a in _l
        }
    }))
}

function EA(i) {
    return w(i) && "__vccOpts" in i
}
const IA = (i, l) => es(i, l, ql),
    rA = Symbol.for("v-scx"),
    SA = () => Ra(rA),
    TA = "3.3.13",
    NA = "http://www.w3.org/2000/svg",
    Il = typeof document < "u" ? document : null,
    on = Il && Il.createElement("template"),
    OA = {
        insert: (i, l, a) => {
            l.insertBefore(i, a || null)
        },
        remove: i => {
            const l = i.parentNode;
            l && l.removeChild(i)
        },
        createElement: (i, l, a, c) => {
            const o = l ? Il.createElementNS(NA, i) : Il.createElement(i, a ? {
                is: a
            } : void 0);
            return i === "select" && c && c.multiple != null && o.setAttribute("multiple", c.multiple), o
        },
        createText: i => Il.createTextNode(i),
        createComment: i => Il.createComment(i),
        setText: (i, l) => {
            i.nodeValue = l
        },
        setElementText: (i, l) => {
            i.textContent = l
        },
        parentNode: i => i.parentNode,
        nextSibling: i => i.nextSibling,
        querySelector: i => Il.querySelector(i),
        setScopeId(i, l) {
            i.setAttribute(l, "")
        },
        insertStaticContent(i, l, a, c, o, A) {
            const e = a ? a.previousSibling : l.lastChild;
            if (o && (o === A || o.nextSibling))
                for (; l.insertBefore(o.cloneNode(!0), a), !(o === A || !(o = o.nextSibling)););
            else {
                on.innerHTML = c ? `<svg>${i}</svg>` : i;
                const g = on.content;
                if (c) {
                    const n = g.firstChild;
                    for (; n.firstChild;) g.appendChild(n.firstChild);
                    g.removeChild(n)
                }
                l.insertBefore(g, a)
            }
            return [e ? e.nextSibling : l.firstChild, a ? a.previousSibling : l.lastChild]
        }
    },
    LA = Symbol("_vtc");

function CA(i, l, a) {
    const c = i[LA];
    c && (l = (l ? [l, ...c] : [...c]).join(" ")), l == null ? i.removeAttribute("class") : a ? i.setAttribute("class", l) : i.className = l
}
const uA = Symbol("_vod"),
    fA = Symbol("");

function dA(i, l, a) {
    const c = i.style,
        o = Ni(a);
    if (a && !o) {
        if (l && !Ni(l))
            for (const A in l) a[A] == null && sc(c, A, "");
        for (const A in a) sc(c, A, a[A])
    } else {
        const A = c.display;
        if (o) {
            if (l !== a) {
                const e = c[fA];
                e && (a += ";" + e), c.cssText = a
            }
        } else l && i.removeAttribute("style");
        uA in i && (c.display = A)
    }
}
const sn = /\s*!important$/;

function sc(i, l, a) {
    if (J(a)) a.forEach(c => sc(i, l, c));
    else if (a == null && (a = ""), l.startsWith("--")) i.setProperty(l, a);
    else {
        const c = MA(i, l);
        sn.test(a) ? i.setProperty(Fl(c), a.replace(sn, ""), "important") : i[c] = a
    }
}
const An = ["Webkit", "Moz", "ms"],
    va = {};

function MA(i, l) {
    const a = va[l];
    if (a) return a;
    let c = Hl(l);
    if (c !== "filter" && c in i) return va[l] = c;
    c = Ln(c);
    for (let o = 0; o < An.length; o++) {
        const A = An[o] + c;
        if (A in i) return va[l] = A
    }
    return l
}
const en = "http://www.w3.org/1999/xlink";

function PA(i, l, a, c, o) {
    if (c && l.startsWith("xlink:")) a == null ? i.removeAttributeNS(en, l.slice(6, l.length)) : i.setAttributeNS(en, l, a);
    else {
        const A = po(l);
        a == null || A && !Cn(a) ? i.removeAttribute(l) : i.setAttribute(l, A ? "" : a)
    }
}

function GA(i, l, a, c, o, A, e) {
    if (l === "innerHTML" || l === "textContent") {
        c && e(c, o, A), i[l] = a ?? "";
        return
    }
    const g = i.tagName;
    if (l === "value" && g !== "PROGRESS" && !g.includes("-")) {
        i._value = a;
        const O = g === "OPTION" ? i.getAttribute("value") : i.value,
            T = a ?? "";
        O !== T && (i.value = T), a == null && i.removeAttribute(l);
        return
    }
    let n = !1;
    if (a === "" || a == null) {
        const O = typeof i[l];
        O === "boolean" ? a = Cn(a) : a == null && O === "string" ? (a = "", n = !0) : O === "number" && (a = 0, n = !0)
    }
    try {
        i[l] = a
    } catch {}
    n && i.removeAttribute(l)
}

function rl(i, l, a, c) {
    i.addEventListener(l, a, c)
}

function DA(i, l, a, c) {
    i.removeEventListener(l, a, c)
}
const gn = Symbol("_vei");

function HA(i, l, a, c, o = null) {
    const A = i[gn] || (i[gn] = {}),
        e = A[l];
    if (c && e) e.value = c;
    else {
        const [g, n] = UA(l);
        if (c) {
            const O = A[l] = FA(c, o);
            rl(i, g, O, n)
        } else e && (DA(i, g, e, n), A[l] = void 0)
    }
}
const tn = /(?:Once|Passive|Capture)$/;

function UA(i) {
    let l;
    if (tn.test(i)) {
        l = {};
        let c;
        for (; c = i.match(tn);) i = i.slice(0, i.length - c[0].length), l[c[0].toLowerCase()] = !0
    }
    return [i[2] === ":" ? i.slice(3) : Fl(i.slice(2)), l]
}
let wa = 0;
const BA = Promise.resolve(),
    pA = () => wa || (BA.then(() => wa = 0), wa = Date.now());

function FA(i, l) {
    const a = c => {
        if (!c._vts) c._vts = Date.now();
        else if (c._vts <= a.attached) return;
        Ji(hA(c, a.value), l, 5, [c])
    };
    return a.value = i, a.attached = pA(), a
}

function hA(i, l) {
    if (J(l)) {
        const a = i.stopImmediatePropagation;
        return i.stopImmediatePropagation = () => {
            a.call(i), i._stopped = !0
        }, l.map(c => o => !o._stopped && c && c(o))
    } else return l
}
const Rn = i => i.charCodeAt(0) === 111 && i.charCodeAt(1) === 110 && i.charCodeAt(2) > 96 && i.charCodeAt(2) < 123,
    VA = (i, l, a, c, o = !1, A, e, g, n) => {
        l === "class" ? CA(i, c, o) : l === "style" ? dA(i, a, c) : fa(l) ? Ec(l) || HA(i, l, a, c, e) : (l[0] === "." ? (l = l.slice(1), !0) : l[0] === "^" ? (l = l.slice(1), !1) : KA(i, l, c, o)) ? GA(i, l, c, A, e, g, n) : (l === "true-value" ? i._trueValue = c : l === "false-value" && (i._falseValue = c), PA(i, l, c, o))
    };

function KA(i, l, a, c) {
    if (c) return !!(l === "innerHTML" || l === "textContent" || l in i && Rn(l) && w(a));
    if (l === "spellcheck" || l === "draggable" || l === "translate" || l === "form" || l === "list" && i.tagName === "INPUT" || l === "type" && i.tagName === "TEXTAREA") return !1;
    if (l === "width" || l === "height") {
        const o = i.tagName;
        if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE") return !1
    }
    return Rn(l) && Ni(a) ? !1 : l in i
}
const La = i => {
    const l = i.props["onUpdate:modelValue"] || !1;
    return J(l) ? a => ea(l, a) : l
};

function mA(i) {
    i.target.composing = !0
}

function En(i) {
    const l = i.target;
    l.composing && (l.composing = !1, l.dispatchEvent(new Event("input")))
}
const Dl = Symbol("_assign"),
    $ = {
        created(i, {
            modifiers: {
                lazy: l,
                trim: a,
                number: c
            }
        }, o) {
            i[Dl] = La(o);
            const A = c || o.props && o.props.type === "number";
            rl(i, l ? "change" : "input", e => {
                if (e.target.composing) return;
                let g = i.value;
                a && (g = g.trim()), A && (g = ra(g)), i[Dl](g)
            }), a && rl(i, "change", () => {
                i.value = i.value.trim()
            }), l || (rl(i, "compositionstart", mA), rl(i, "compositionend", En), rl(i, "change", En))
        },
        mounted(i, {
            value: l
        }) {
            i.value = l ?? ""
        },
        beforeUpdate(i, {
            value: l,
            modifiers: {
                lazy: a,
                trim: c,
                number: o
            }
        }, A) {
            if (i[Dl] = La(A), i.composing) return;
            const e = o || i.type === "number" ? ra(i.value) : i.value,
                g = l ?? "";
            e !== g && (document.activeElement === i && i.type !== "range" && (a || c && i.value.trim() === g) || (i.value = g))
        }
    },
    _a = {
        deep: !0,
        created(i, {
            value: l,
            modifiers: {
                number: a
            }
        }, c) {
            const o = da(l);
            rl(i, "change", () => {
                const A = Array.prototype.filter.call(i.options, e => e.selected).map(e => a ? ra(Ca(e)) : Ca(e));
                i[Dl](i.multiple ? o ? new Set(A) : A : A[0])
            }), i[Dl] = La(c)
        },
        mounted(i, {
            value: l
        }) {
            In(i, l)
        },
        beforeUpdate(i, l, a) {
            i[Dl] = La(a)
        },
        updated(i, {
            value: l
        }) {
            In(i, l)
        }
    };

function In(i, l) {
    const a = i.multiple;
    if (!(a && !J(l) && !da(l))) {
        for (let c = 0, o = i.options.length; c < o; c++) {
            const A = i.options[c],
                e = Ca(A);
            if (a) J(l) ? A.selected = ho(l, e) > -1 : A.selected = l.has(e);
            else if (Pa(Ca(A), l)) {
                i.selectedIndex !== c && (i.selectedIndex = c);
                return
            }
        }!a && i.selectedIndex !== -1 && (i.selectedIndex = -1)
    }
}

function Ca(i) {
    return "_value" in i ? i._value : i.value
}
const YA = Oi({
    patchProp: VA
}, OA);
let rn;

function WA() {
    return rn || (rn = $s(YA))
}
const yA = (...i) => {
    const l = WA().createApp(...i),
        {
            mount: a
        } = l;
    return l.mount = c => {
        const o = JA(c);
        if (!o) return;
        const A = l._component;
        !w(A) && !A.render && !A.template && (A.template = o.innerHTML), o.innerHTML = "";
        const e = a(o, !1, o instanceof SVGElement);
        return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), e
    }, l
};

function JA(i) {
    return Ni(i) ? document.querySelector(i) : i
}
const XA = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20448%20512'%3e%3c!--!Font%20Awesome%20Free%206.5.1%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202024%20Fonticons,%20Inc.--%3e%3cpath%20fill='white'%20d='M0%2096C0%2078.3%2014.3%2064%2032%2064H416c17.7%200%2032%2014.3%2032%2032s-14.3%2032-32%2032H32C14.3%20128%200%20113.7%200%2096zM0%20256c0-17.7%2014.3-32%2032-32H416c17.7%200%2032%2014.3%2032%2032s-14.3%2032-32%2032H32c-17.7%200-32-14.3-32-32zM448%20416c0%2017.7-14.3%2032-32%2032H32c-17.7%200-32-14.3-32-32s14.3-32%2032-32H416c17.7%200%2032%2014.3%2032%2032z'/%3e%3c/svg%3e";
let Ao = null;

function Ac() {
    return Ao
}

function ua(i) {
    Ao = i
}
let eo = 0;

function vA() {
    return eo
}

function wA() {
    eo++
}
let go = "";

function pi() {
    return go
}

function ba(i) {
    go = i
}
let to = "";

function _A() {
    return to
}

function Za(i) {
    to = i
}
let Ro = "";

function gi() {
    return Ro
}

function ka(i) {
    Ro = i
}
let Eo = "";

function bA() {
    return Eo
}

function ZA(i) {
    Eo = i
}
let mi = ii("Alfa"),
    kA = null;

function Sn() {
    return kA
}
let Io = "";

function ec(i) {
    Io = i
}

function xA() {
    return Io
}
let ro = "";

function gc(i) {
    ro = i
}

function $A() {
    return ro
}

function QA(i) {
    console.log(i)
}
let Fi = ii(!1),
    qA = "0.4.3",
    So = {
        Alfa: "A",
        Bravo: "B",
        Charlie: "C",
        Delta: "D",
        Echo: "E",
        Foxtrot: "F",
        Golf: "G",
        Hotel: "H",
        India: "I",
        Juliett: "J",
        Kilo: "K",
        Lima: "L",
        Mike: "M",
        November: "N",
        Oscar: "O",
        Papa: "P",
        Quebec: "Q",
        Romeo: "R",
        Sierra: "S",
        Tango: "T",
        Uniform: "U",
        Victor: "V",
        Whiskey: "W",
        Xray: "X",
        Yankee: "Y",
        Zulu: "Z"
    },
    tl = Object.keys(So);

function xa(i) {
    return So[i]
}
const To = [{
        icao: "BOI",
        callsign: "ABAIR"
    }, {
        icao: "EVY",
        callsign: "MULTIPLE"
    }, {
        icao: "GNL",
        callsign: "GENERAL"
    }, {
        icao: "TBS",
        callsign: "TIMBIS"
    }, {
        icao: "WYT",
        callsign: "WYTON"
    }, {
        icao: "TFU",
        callsign: "THJY"
    }, {
        icao: "CHD",
        callsign: "CHKALOVSKAVIA"
    }, {
        icao: "TTF",
        callsign: "CARGO UNIT"
    }, {
        icao: "TWF",
        callsign: "CLOUD RUNNER"
    }, {
        icao: "SEC",
        callsign: "SECUREX"
    }, {
        icao: "MLA",
        callsign: "MILEAIR"
    }, {
        icao: "QRT",
        callsign: "QUARTET"
    }, {
        icao: "PIU",
        callsign: "PRIMA"
    }, {
        icao: "ASD",
        callsign: "AIR SINAI"
    }, {
        icao: "SEK",
        callsign: "EAST RIDER"
    }, {
        icao: "AIJ",
        callsign: "ABC AEROLINEAS"
    }, {
        icao: "WAZ",
        callsign: "WIZZ SKY"
    }, {
        icao: "UBE",
        callsign: "FLOWER BEE"
    }, {
        icao: "JYH",
        callsign: "TRANS JADE"
    }, {
        icao: "BRO",
        callsign: "BROADSWORD"
    }, {
        icao: "GBT",
        callsign: "GLOBETROTTER"
    }, {
        icao: "AJR",
        callsign: "JET MONGOLIA"
    }, {
        icao: "SFM",
        callsign: "AIR SAFAR"
    }, {
        icao: "AJJ",
        callsign: "ATLANTIC JET"
    }, {
        icao: "BBE",
        callsign: "BABEL AIR"
    }, {
        icao: "ABJ",
        callsign: "ABAETE"
    }, {
        icao: "NKP",
        callsign: "ABAKAN AIR"
    }, {
        icao: "ABG",
        callsign: "ROYAL FLIGHT"
    }, {
        icao: "ABE",
        callsign: "ABAN"
    }, {
        icao: "MRP",
        callsign: "ABAS"
    }, {
        icao: "AHU",
        callsign: "ABC HUNGARY"
    }, {
        icao: "FTY",
        callsign: "FLY TYROL"
    }, {
        icao: "AAB",
        callsign: "ABG"
    }, {
        icao: "BDV",
        callsign: "ABERDAV"
    }, {
        icao: "ADJ",
        callsign: "ABICAR"
    }, {
        icao: "ABP",
        callsign: "BAIR"
    }, {
        icao: "TUS",
        callsign: "TURISMO"
    }, {
        icao: "TTN",
        callsign: "TITANIUM"
    }, {
        icao: "ABX",
        callsign: "ABEX"
    }, {
        icao: "NCL",
        callsign: "ANCARGO AIR"
    }, {
        icao: "ACD",
        callsign: "ACADEMY"
    }, {
        icao: "CYD",
        callsign: "CYCLONE"
    }, {
        icao: "CFM",
        callsign: "ACEF"
    }, {
        icao: "ARO",
        callsign: "ACERO"
    }, {
        icao: "AES",
        callsign: "ACES"
    }, {
        icao: "BVR",
        callsign: "BAVARIAN"
    }, {
        icao: "BJT",
        callsign: "BAY JET"
    }, {
        icao: "CRV",
        callsign: "ACROPOLIS"
    }, {
        icao: "ORS",
        callsign: "AVIATION SERVICE"
    }, {
        icao: "AXQ",
        callsign: "ACTION AIR"
    }, {
        icao: "AVR",
        callsign: "ACTIVE AERO"
    }, {
        icao: "RRM",
        callsign: "AIR ROMANIA"
    }, {
        icao: "ADC",
        callsign: "AD ASTRA"
    }, {
        icao: "VUE",
        callsign: "FLIGHTVUE"
    }, {
        icao: "ADE",
        callsign: "ADA AIR"
    }, {
        icao: "DHI",
        callsign: "ADAM SKY"
    }, {
        icao: "ADK",
        callsign: "ADCO"
    }, {
        icao: "DSC",
        callsign: "ADDIS CARGO"
    }, {
        icao: "DDS",
        callsign: "ADDIS LINE"
    }, {
        icao: "ADF",
        callsign: "ADE AVIACION"
    }, {
        icao: "TEC",
        callsign: "TECHJET"
    }, {
        icao: "SWH",
        callsign: "SHOCKWAVE"
    }, {
        icao: "ADR",
        callsign: "ADRIA"
    }, {
        icao: "DRO",
        callsign: "ADRO SERVICIOS"
    }, {
        icao: "ADV",
        callsign: "ADVANCE"
    }, {
        icao: "AXX",
        callsign: "SKY SHUTTLE"
    }, {
        icao: "AAX",
        callsign: "ADVANCE AVIATION"
    }, {
        icao: "WSN",
        callsign: "WINGSPAN"
    }, {
        icao: "ADV",
        callsign: "ADVANCED"
    }, {
        icao: "RDD",
        callsign: "ADLINES"
    }, {
        icao: "AEE",
        callsign: "AEGEAN"
    }, {
        icao: "ALS",
        callsign: "AERALP"
    }, {
        icao: "DRD",
        callsign: "AEREO DORADO"
    }, {
        icao: "FUT",
        callsign: "AEREO FUTURO"
    }, {
        icao: "MMG",
        callsign: "RUTA MAYA"
    }, {
        icao: "AGI",
        callsign: "ANGELES AMERICA"
    }, {
        icao: "WWG",
        callsign: "AEROW"
    }, {
        icao: "AED",
        callsign: "AERNSPA"
    }, {
        icao: "AKR",
        callsign: "AERO CLINKER"
    }, {
        icao: "CND",
        callsign: "CONDOMINICANA"
    }, {
        icao: "ARP",
        callsign: "IVORYCORP"
    }, {
        icao: "AEK",
        callsign: "ACORISA"
    }, {
        icao: "EPU",
        callsign: "ELITACAPULCO"
    }, {
        icao: "AJP",
        callsign: "AEROJETS"
    }, {
        icao: "OWN",
        callsign: "AERO OWEN"
    }, {
        icao: "GLM",
        callsign: "GLOBAL MALI"
    }, {
        icao: "GUE",
        callsign: "AERO GUERRERO"
    }, {
        icao: "ASR",
        callsign: "SOTRAVIA"
    }, {
        icao: "ABA",
        callsign: "AEROBETA"
    }, {
        icao: "UCR",
        callsign: "CHARTER UKRAINE"
    }, {
        icao: "EAP",
        callsign: "AEROPYRENEES"
    }, {
        icao: "AJH",
        callsign: "ALJARAFE"
    }, {
        icao: "AOB",
        callsign: "CARIBE CORO"
    }, {
        icao: "ACR",
        callsign: "AEROCENTER"
    }, {
        icao: "MLL",
        callsign: "MALLORCA"
    }, {
        icao: "CTD",
        callsign: "AEROCORPORATIVOS"
    }, {
        icao: "DVI",
        callsign: "AERO DAVINCI"
    }, {
        icao: "AFL",
        callsign: "AEROFLOT"
    }, {
        icao: "PLS",
        callsign: "AEROPLUS"
    }, {
        icao: "AEG",
        callsign: "FUMIGACIONES SAM"
    }, {
        icao: "AGQ",
        callsign: "GALASERVICE"
    }, {
        icao: "ARH",
        callsign: "AEROHELCA"
    }, {
        icao: "BJU",
        callsign: "JET EXPRESS"
    }, {
        icao: "LFT",
        callsign: "LIFTCO"
    }, {
        icao: "LIN",
        callsign: "AEROLIMOUSINE"
    }, {
        icao: "PCP",
        callsign: "PRINCIPAL"
    }, {
        icao: "ALT",
        callsign: "AERLINEAS CENTRALES"
    }, {
        icao: "AHL",
        callsign: "HIDALGO"
    }, {
        icao: "APR",
        callsign: "AEROPERLAS"
    }, {
        icao: "PSE",
        callsign: "SIPSE"
    }, {
        icao: "PSL",
        callsign: "CORSAN"
    }, {
        icao: "EAE",
        callsign: "AECA"
    }, {
        icao: "AES",
        callsign: "AEROPARAGUAY"
    }, {
        icao: "BTS",
        callsign: "AEROLINEAS ALBATROS"
    }, {
        icao: "PRI",
        callsign: "AEROPRIV"
    }, {
        icao: "PVA",
        callsign: "TRANSPRIVADO"
    }, {
        icao: "VMX",
        callsign: "VENTA"
    }, {
        icao: "ABU",
        callsign: "AEROBUENO"
    }, {
        icao: "ACB",
        callsign: "AFRICARGO"
    }, {
        icao: "AAP",
        callsign: "ARABASCO"
    }, {
        icao: "AAR",
        callsign: "PATRIOT"
    }, {
        icao: "AAS",
        callsign: "AVIASERVICE"
    }, {
        icao: "AAS",
        callsign: "AIR SERVICES"
    }, {
        icao: "AAT",
        callsign: "AUSTRIAN CHARTER"
    }, {
        icao: "AAW",
        callsign: "AUSTIN"
    }, {
        icao: "AAW",
        callsign: "ALMETA AIR"
    }, {
        icao: "ABT",
        callsign: "AMBITION"
    }, {
        icao: "ABE",
        callsign: "ARBERIA AIRLINES"
    }, {
        icao: "ACS",
        callsign: "AIRCRAFT SALES"
    }, {
        icao: "ABS",
        callsign: "AIR CENTRAL"
    }, {
        icao: "ADT",
        callsign: "ARRENDATRANS"
    }, {
        icao: "AED",
        callsign: "AIE EXPERIENCE"
    }, {
        icao: "AFF",
        callsign: "AFRIWAYS"
    }, {
        icao: "AFM",
        callsign: "EPIC AIR"
    }, {
        icao: "FLA",
        callsign: "PALM"
    }, {
        icao: "MAC",
        callsign: "ARABIA MAROC"
    }, {
        icao: "MRY",
        callsign: "AIR MARINE"
    }, {
        icao: "PNK",
        callsign: "AIRPINK"
    }, {
        icao: "AFN",
        callsign: "SIMBA"
    }, {
        icao: "ADO",
        callsign: "AIR DO"
    }, {
        icao: "PNX",
        callsign: "SPINNER"
    }, {
        icao: "AVD",
        callsign: "ALAMO"
    }, {
        icao: "FSY",
        callsign: "FROSTY"
    }, {
        icao: "TTX",
        callsign: "TWISTER"
    }, {
        icao: "LMU",
        callsign: "ALMASRIA"
    }, {
        icao: "ALN",
        callsign: "TOLEMAC"
    }, {
        icao: "APN",
        callsign: "AIR ALPES"
    }, {
        icao: "BAH",
        callsign: "BAHRAIN"
    }, {
        icao: "AWG",
        callsign: "ANIMA WINGS"
    }, {
        icao: "TLB",
        callsign: "TRIPLEA"
    }, {
        icao: "UJX",
        callsign: "ATLAS UKRAINE"
    }, {
        icao: "AGM",
        callsign: "ANGEL MED"
    }, {
        icao: "NVD",
        callsign: "NORDVIND"
    }, {
        icao: "AZB",
        callsign: "TUMARA"
    }, {
        icao: "AEN",
        callsign: "AEROLAND"
    }, {
        icao: "NGF",
        callsign: "ANGEL FLIGHT"
    }, {
        icao: "WFT",
        callsign: "WORLD FLIGHT"
    }, {
        icao: "ASL",
        callsign: "AIR SERBIA"
    }, {
        icao: "LYN",
        callsign: "ALTYN AVIA"
    }, {
        icao: "CCM",
        callsign: "CORSICA"
    }, {
        icao: "AHS",
        callsign: "HIGH SKY"
    }, {
        icao: "ROO",
        callsign: "AERO ROA"
    }, {
        icao: "SUP",
        callsign: "SUN SPEED"
    }, {
        icao: "PSO",
        callsign: "AEROPEGASO"
    }, {
        icao: "EIN",
        callsign: "SHAMROCK"
    }, {
        icao: "EUK",
        callsign: "GREEN FLIGHT"
    }, {
        icao: "VLB",
        callsign: "VOLTA"
    }, {
        icao: "FCJ",
        callsign: "FRACJET"
    }, {
        icao: "TEW",
        callsign: "TEAMWORK"
    }, {
        icao: "STT",
        callsign: "STAR CHARTER"
    }, {
        icao: "HEZ",
        callsign: "ARROW"
    }, {
        icao: "RVQ",
        callsign: "REVA AIR"
    }, {
        icao: "ASK",
        callsign: "MULTISKY"
    }, {
        icao: "AEH",
        callsign: "AEROCUTTER"
    }, {
        icao: "ERO",
        callsign: "AEROECOM"
    }, {
        icao: "XAU",
        callsign: "PEARL"
    }, {
        icao: "NKY",
        callsign: "AEROMON"
    }, {
        icao: "AGA",
        callsign: "GEOLINE"
    }, {
        icao: "ABZ",
        callsign: "ISLAND LIFEFLIGHT"
    }, {
        icao: "ROU",
        callsign: "ROUGE"
    }, {
        icao: "CNM",
        callsign: "MENGYUAN"
    }, {
        icao: "VRE",
        callsign: "COTE DIVORIE"
    }, {
        icao: "AXY",
        callsign: "LEGEND"
    }, {
        icao: "OES",
        callsign: "ART AUSTRIA"
    }, {
        icao: "ASF",
        callsign: "AUSTRIAN AIRFORCE"
    }, {
        icao: "AVG",
        callsign: "AVILEF"
    }, {
        icao: "AZY",
        callsign: "AZTEC WORLD"
    }, {
        icao: "ACX",
        callsign: "LOADMASTER"
    }, {
        icao: "AAD",
        callsign: "SUNRISE"
    }, {
        icao: "SII",
        callsign: "ASEISA"
    }, {
        icao: "BZS",
        callsign: "BINIZA"
    }, {
        icao: "AET",
        callsign: "AERO PALMA"
    }, {
        icao: "ABM",
        callsign: "ALBATROS ESPANA"
    }, {
        icao: "AAF",
        callsign: "AIGLE AZUR"
    }, {
        icao: "AAO",
        callsign: "ATLANTIS AIR"
    }, {
        icao: "AAP",
        callsign: "AEROVISTA GROUP"
    }, {
        icao: "AE",
        callsign: "CEYLON"
    }, {
        icao: "AAS",
        callsign: "ALASS"
    }, {
        icao: "AAU",
        callsign: "AUSTASIA"
    }, {
        icao: "AAV",
        callsign: "ASTROPHIL"
    }, {
        icao: "AAW",
        callsign: "AFRIQIYAH"
    }, {
        icao: "AFU",
        callsign: "AFRINAT"
    }, {
        icao: "AAX",
        callsign: "AFREX"
    }, {
        icao: "BRL",
        callsign: "BRASD'OR"
    }, {
        icao: "AFH",
        callsign: "FECTO"
    }, {
        icao: "BRM",
        callsign: "BOOMERANG"
    }, {
        icao: "AAG",
        callsign: "ATLANTIC"
    }, {
        icao: "AAG",
        callsign: "ATLANTIC"
    }, {
        icao: "AAJ",
        callsign: "AIR ALMA"
    }, {
        icao: "ADT",
        callsign: "AIR DORVAL"
    }, {
        icao: "AHN",
        callsign: "AIR HUNGARIA"
    }, {
        icao: "AHR",
        callsign: "ADRIATIC"
    }, {
        icao: "AHK",
        callsign: "AIR HONG KONG"
    }, {
        icao: "AHS",
        callsign: "AIRSAR"
    }, {
        icao: "AAI",
        callsign: "BOREALIS"
    }, {
        icao: "ACU",
        callsign: "AFRISPIRIT"
    }, {
        icao: "ADC",
        callsign: "ATLANDOMINICAN"
    }, {
        icao: "ADW",
        callsign: "AIR ANDAMAN"
    }, {
        icao: "AEA",
        callsign: "EUROPA"
    }, {
        icao: "AEQ",
        callsign: "LUNA"
    }, {
        icao: "AEY",
        callsign: "AIR ITALY"
    }, {
        icao: "ASW",
        callsign: "AIRSOUTHWEST"
    }, {
        icao: "ASX",
        callsign: "AIRSPEC"
    }, {
        icao: "AMU",
        callsign: "AIR MACAO"
    }, {
        icao: "AMW",
        callsign: "ARMENIA"
    }, {
        icao: "SEY",
        callsign: "SEYCHELLES"
    }, {
        icao: "SFB",
        callsign: "AIR SOFIA"
    }, {
        icao: "BRF",
        callsign: "AIR BRAVO"
    }, {
        icao: "AFR",
        callsign: "AIRFRANS"
    }, {
        icao: "ACG",
        callsign: "AIR PARTNER"
    }, {
        icao: "ACI",
        callsign: "AIRCALIN"
    }, {
        icao: "VSG",
        callsign: "VISIG"
    }, {
        icao: "AKX",
        callsign: "ALFA WING"
    }, {
        icao: "ALM",
        callsign: "ANTILLEAN"
    }, {
        icao: "ALN",
        callsign: "CHICAGO LINCOLN"
    }, {
        icao: "ACM",
        callsign: "WEST CAL"
    }, {
        icao: "AXE",
        callsign: "GALILEO"
    }, {
        icao: "AGM",
        callsign: "AIR GUAM"
    }, {
        icao: "AWI",
        callsign: "WISCONSIN"
    }, {
        icao: "ALU",
        callsign: "LUXORJET"
    }, {
        icao: "RSI",
        callsign: "AIR SUNSHINE"
    }, {
        icao: "AGN",
        callsign: "GOLF NOVEMBER"
    }, {
        icao: "RUN",
        callsign: "CARGO TURK"
    }, {
        icao: "AFV",
        callsign: "AFRIQUE VACANCE"
    }, {
        icao: "ABN",
        callsign: "AIR ALBANIA"
    }, {
        icao: "AAQ",
        callsign: "LIAISON"
    }, {
        icao: "ATW",
        callsign: "DEVIL"
    }, {
        icao: "ABL",
        callsign: "AIR BUSAN"
    }, {
        icao: "ACH",
        callsign: "AIR PLUS"
    }, {
        icao: "LEP",
        callsign: "LECOSTA"
    }, {
        icao: "GRL",
        callsign: "GREENLAND"
    }, {
        icao: "GUY",
        callsign: "GREEN BIRD"
    }, {
        icao: "AHO",
        callsign: "AIR HAMBURG"
    }, {
        icao: "AJX",
        callsign: "AIR JAPAN"
    }, {
        icao: "LIB",
        callsign: "LIBERTE"
    }, {
        icao: "KLA",
        callsign: "KAUNAS"
    }, {
        icao: "AIM",
        callsign: "MALAWI"
    }, {
        icao: "AMI",
        callsign: "AIR MALDIVES"
    }, {
        icao: "BIE",
        callsign: "MEDITERRANEE"
    }, {
        icao: "MKG",
        callsign: "MEKONG"
    }, {
        icao: "AMG",
        callsign: "AIR MINAS"
    }, {
        icao: "MNE",
        callsign: "MOUNT EAGLE"
    }, {
        icao: "TAH",
        callsign: "AIR MOOREA"
    }, {
        icao: "ANV",
        callsign: "AIR NEVADA"
    }, {
        icao: "ANZ",
        callsign: "NEW ZEALAND"
    }, {
        icao: "ANT",
        callsign: "AIR NORTH"
    }, {
        icao: "AEI",
        callsign: "POLISH BIRD"
    }, {
        icao: "APZ",
        callsign: "AIR PREMIA"
    }, {
        icao: "AVZ",
        callsign: "AIR VALENCIA"
    }, {
        icao: "AMO",
        callsign: "AIR MONTREAL"
    }, {
        icao: "AMR",
        callsign: "AIR AM"
    }, {
        icao: "AMS",
        callsign: "AIR MUSKOKA"
    }, {
        icao: "AOJ",
        callsign: "ASTERIX"
    }, {
        icao: "AJU",
        callsign: "AIRJETSUL"
    }, {
        icao: "LIV",
        callsign: "LIVONIA"
    }, {
        icao: "ABL",
        callsign: "AIRCOACH"
    }, {
        icao: "LJA",
        callsign: "AIR JAMAHIRIYA"
    }, {
        icao: "AGV",
        callsign: "AIR GLACIERS"
    }, {
        icao: "MVM",
        callsign: "PEGASUS"
    }, {
        icao: "AMY",
        callsign: "AIR AMBAR"
    }, {
        icao: "VGA",
        callsign: "AIR VEGAS"
    }, {
        icao: "AOU",
        callsign: "AIR TRACTOR"
    }, {
        icao: "APA",
        callsign: "CANAM"
    }, {
        icao: "APG",
        callsign: "AIR PEOPLE"
    }, {
        icao: "ANA",
        callsign: "ALL NIPPON"
    }, {
        icao: "ANB",
        callsign: "AIR NAV"
    }, {
        icao: "NGO",
        callsign: "AIR ANGOL"
    }, {
        icao: "TWG",
        callsign: "TWINGOOSE"
    }, {
        icao: "NGP",
        callsign: "REGAL EAGLE"
    }, {
        icao: "SNC",
        callsign: "NIGHT CARGO"
    }, {
        icao: "SND",
        callsign: "ARSAM"
    }, {
        icao: "SNG",
        callsign: "AIR SENEGAL"
    }, {
        icao: "SNY",
        callsign: "AIR SANDY"
    }, {
        icao: "AII",
        callsign: "INTEGRA"
    }, {
        icao: "BFF",
        callsign: "AIR BAFFIN"
    }, {
        icao: "BDM",
        callsign: "BANDAMA"
    }, {
        icao: "BER",
        callsign: "AIR BERLIN"
    }, {
        icao: "ABT",
        callsign: "AIR BROUSSE"
    }, {
        icao: "APV",
        callsign: "AIR PLAN"
    }, {
        icao: "ARX",
        callsign: "AIREX"
    }, {
        icao: "HTT",
        callsign: "HOTEL TANGO"
    }, {
        icao: "ARZ",
        callsign: "AIR RESORTS"
    }, {
        icao: "ASB",
        callsign: "AIR SPRAY"
    }, {
        icao: "ASC",
        callsign: "AIR STAR"
    }, {
        icao: "ASD",
        callsign: "AIR SINAI"
    }, {
        icao: "AQN",
        callsign: "BUSHAIR"
    }, {
        icao: "ARR",
        callsign: "AIR ARMENIA"
    }, {
        icao: "AIL",
        callsign: "AIR ILLINOIS"
    }, {
        icao: "AIC",
        callsign: "AIRINDIA"
    }, {
        icao: "SPM",
        callsign: "SAINTPIERRE"
    }, {
        icao: "WOW",
        callsign: "SWALLOW"
    }, {
        icao: "ATJ",
        callsign: "SNOOPY"
    }, {
        icao: "ATN",
        callsign: "AIR TRANSPORT"
    }, {
        icao: "ATQ",
        callsign: "MULTI"
    }, {
        icao: "AVG",
        callsign: "DJIBOUTI FALCON"
    }, {
        icao: "AVN",
        callsign: "AIR VAN"
    }, {
        icao: "BUB",
        callsign: "BOURBON"
    }, {
        icao: "ABD",
        callsign: "ATLANTA"
    }, {
        icao: "AIE",
        callsign: "AIR INUIT"
    }, {
        icao: "AIS",
        callsign: "SURESTE"
    }, {
        icao: "SBK",
        callsign: "AIR SRPSKA"
    }, {
        icao: "THT",
        callsign: "TAHITI AIRLINES"
    }, {
        icao: "NMB",
        callsign: "NAMIBIA"
    }, {
        icao: "NSK",
        callsign: "INTERSALONIKA"
    }, {
        icao: "NTL",
        callsign: "AIR ANATOLIA"
    }, {
        icao: "SGA",
        callsign: "AIR SAIGON"
    }, {
        icao: "AFW",
        callsign: "AFRAIR"
    }, {
        icao: "AFW",
        callsign: "BLACKSTAR"
    }, {
        icao: "ACX",
        callsign: "PARAIR"
    }, {
        icao: "AEL",
        callsign: "AIR EUROPE"
    }, {
        icao: "AJM",
        callsign: "JAMAICA"
    }, {
        icao: "AWN",
        callsign: "AIR NIAMEY"
    }, {
        icao: "AWT",
        callsign: "AIR WEST"
    }, {
        icao: "AWW",
        callsign: "RED DRAGON"
    }, {
        icao: "FWI",
        callsign: "FRENCH WEST"
    }, {
        icao: "AXB",
        callsign: "EXPRESS INDIA"
    }, {
        icao: "AXD",
        callsign: "AIR SUDEX"
    }, {
        icao: "BSB",
        callsign: "ARBAS"
    }, {
        icao: "BTI",
        callsign: "AIRBALTIC"
    }, {
        icao: "ANI",
        callsign: "NIGALANTIC"
    }, {
        icao: "ANK",
        callsign: "ANK AIR"
    }, {
        icao: "ANE",
        callsign: "AIR NOSTRUM"
    }, {
        icao: "ANG",
        callsign: "NIUGINI"
    }, {
        icao: "ABY",
        callsign: "ARABIA"
    }, {
        icao: "ACA",
        callsign: "AIR CANADA"
    }, {
        icao: "LAV",
        callsign: "ALBASTAR"
    }, {
        icao: "MHS",
        callsign: "AIR MEMPHIS"
    }, {
        icao: "AXL",
        callsign: "EXEL COMMUTER"
    }, {
        icao: "AZF",
        callsign: "AIR ZERMATT"
    }, {
        icao: "AZW",
        callsign: "AIR ZIMBABWE"
    }, {
        icao: "MHU",
        callsign: "MEPHIS UGANDA"
    }, {
        icao: "MKH",
        callsign: "AIR MARRAKECH"
    }, {
        icao: "AZX",
        callsign: "AZIMA"
    }, {
        icao: "RSH",
        callsign: "SAHARA"
    }, {
        icao: "ATC",
        callsign: "TANZANIA"
    }, {
        icao: "VBW",
        callsign: "BURKINA"
    }, {
        icao: "ATH",
        callsign: "AIR TRAVEL"
    }, {
        icao: "AMC",
        callsign: "AIR MALTA"
    }, {
        icao: "TGA",
        callsign: "AIR TOGO"
    }, {
        icao: "ASJ",
        callsign: "SATELLITE"
    }, {
        icao: "ASS",
        callsign: "AIR CLASS"
    }, {
        icao: "NPL",
        callsign: "AIR NEPAL"
    }, {
        icao: "WAM",
        callsign: "TAXI CARGO"
    }, {
        icao: "RSM",
        callsign: "AIR SOMALIA"
    }, {
        icao: "AAY",
        callsign: "ALLEGIANT"
    }, {
        icao: "AAZ",
        callsign: "ANGUS"
    }, {
        icao: "ABA",
        callsign: "ARTEMAVIA"
    }, {
        icao: "ABB",
        callsign: "AFRICAN BUSINESS"
    }, {
        icao: "ABF",
        callsign: "SKYWINGS"
    }, {
        icao: "ABK",
        callsign: "ALBERTA CITYLINK"
    }, {
        icao: "ABO",
        callsign: "AEROEXPRESO"
    }, {
        icao: "ABV",
        callsign: "ANTRAK"
    }, {
        icao: "ABX",
        callsign: "ABEX"
    }, {
        icao: "ABZ",
        callsign: "ATABRAZIL"
    }, {
        icao: "ACY",
        callsign: "ATLAS CARGOLINES"
    }, {
        icao: "ADA",
        callsign: "AUSCAL"
    }, {
        icao: "TID",
        callsign: "TINDI"
    }, {
        icao: "ADB",
        callsign: "ANTONOV BUREAU"
    }, {
        icao: "ADG",
        callsign: "AEREA TRAINING"
    }, {
        icao: "ADI",
        callsign: "AUDELI"
    }, {
        icao: "ADL",
        callsign: "COTSWOLD"
    }, {
        icao: "ADN",
        callsign: "AERODIENST"
    }, {
        icao: "ADP",
        callsign: "AERODIPLOMATIC"
    }, {
        icao: "ADY",
        callsign: "NAWRAS [6][7]"
    }, {
        icao: "ADQ",
        callsign: "AIR DATA"
    }, {
        icao: "ADS",
        callsign: "SONORAV"
    }, {
        icao: "ADU",
        callsign: "AIRDEAL"
    }, {
        icao: "AEB",
        callsign: "AEROBEN"
    }, {
        icao: "AEC",
        callsign: "AEROCESAR"
    }, {
        icao: "ADX",
        callsign: "ANDAX"
    }, {
        icao: "AEI",
        callsign: "INTERAM"
    }, {
        icao: "AEJ",
        callsign: "KHAKI EXPRESS"
    }, {
        icao: "AEK",
        callsign: "AEROCON"
    }, {
        icao: "AEM",
        callsign: "AEROMADRID"
    }, {
        icao: "AEN",
        callsign: "AIR ENTERPRISE"
    }, {
        icao: "AEO",
        callsign: "AERO OCCIDENTE"
    }, {
        icao: "AEP",
        callsign: "AEROTEC"
    }, {
        icao: "AAC",
        callsign: "CONNECT AMERICA"
    }, {
        icao: "AAA",
        callsign: "ANSETT"
    }, {
        icao: "AAC",
        callsign: "ARMYAIR"
    }, {
        icao: "AEU",
        callsign: "FLYSTAR"
    }, {
        icao: "AEV",
        callsign: "AEROVENTAS"
    }, {
        icao: "AEW",
        callsign: "AEROSVIT"
    }, {
        icao: "AEX",
        callsign: "AVCO"
    }, {
        icao: "AEZ",
        callsign: "AERIAL TRANZ"
    }, {
        icao: "AFA",
        callsign: "BLUE ALFA"
    }, {
        icao: "AFB",
        callsign: "AMERICAN FALCON"
    }, {
        icao: "UTY",
        callsign: "UNITY"
    }, {
        icao: "UVS",
        callsign: "UNILEONE"
    }, {
        icao: "UVT",
        callsign: "AUVIA"
    }, {
        icao: "AFC",
        callsign: "AFRICAN WEST"
    }, {
        icao: "AFE",
        callsign: "AIRFAST"
    }, {
        icao: "AFG",
        callsign: "ARIANA"
    }, {
        icao: "AFI",
        callsign: "AFRICAWORLD"
    }, {
        icao: "AFJ",
        callsign: "JAMBO"
    }, {
        icao: "AFK",
        callsign: "AFRICA LINKS"
    }, {
        icao: "AFO",
        callsign: "AERO EMPRESA"
    }, {
        icao: "AFQ",
        callsign: "ALBA"
    }, {
        icao: "AFY",
        callsign: "AFRICA CHARTERED"
    }, {
        icao: "AFZ",
        callsign: "AFREIGHT"
    }, {
        icao: "AGC",
        callsign: "AGRICO"
    }, {
        icao: "AGF",
        callsign: "ATLANTIC GULF"
    }, {
        icao: "SLI",
        callsign: "COSTERA"
    }, {
        icao: "AGG",
        callsign: "ALGOMA"
    }, {
        icao: "AGH",
        callsign: "ALTAGNA"
    }, {
        icao: "AGO",
        callsign: "ANGOLA CHARTER"
    }, {
        icao: "AGP",
        callsign: "AIR TARA"
    }, {
        icao: "AGT",
        callsign: "AMADEUS"
    }, {
        icao: "AGU",
        callsign: "SARMA"
    }, {
        icao: "AGW",
        callsign: "AERO GAMBIA"
    }, {
        icao: "AGX",
        callsign: "GENEX"
    }, {
        icao: "BLR",
        callsign: "BLUE RIDGE"
    }, {
        icao: "BLZ",
        callsign: "AEROLOZ"
    }, {
        icao: "PLI",
        callsign: "AEROPERU"
    }, {
        icao: "BMM",
        callsign: "ATLAS BLUE"
    }, {
        icao: "BNB",
        callsign: "AEROBANOBRAS"
    }, {
        icao: "AGY",
        callsign: "FLIGHT GROUP"
    }, {
        icao: "AGZ",
        callsign: "AGROLET"
    }, {
        icao: "AHA",
        callsign: "AIR ALPHA"
    }, {
        icao: "AHC",
        callsign: "AZALAVIACARGO"
    }, {
        icao: "AHE",
        callsign: "AIRPORT HELICOPTER"
    }, {
        icao: "CJE",
        callsign: "BIRD JET"
    }, {
        icao: "AHF",
        callsign: "ASPEN"
    }, {
        icao: "AHG",
        callsign: "AEROCHAGO"
    }, {
        icao: "AHH",
        callsign: "AIRHOLD"
    }, {
        icao: "AHP",
        callsign: "AEROCHIAPAS"
    }, {
        icao: "AHW",
        callsign: "AEROMIST"
    }, {
        icao: "AHY",
        callsign: "AZAL"
    }, {
        icao: "AIA",
        callsign: "AVIES"
    }, {
        icao: "AIB",
        callsign: "AIRBUS INDUSTRIE"
    }, {
        icao: "AIH",
        callsign: "AIR INCHEON"
    }, {
        icao: "ASV",
        callsign: "AIR SEOUL"
    }, {
        icao: "AIK",
        callsign: "AFRICAN AIRLINES"
    }, {
        icao: "AIN",
        callsign: "FLY CARGO"
    }, {
        icao: "AIP",
        callsign: "ALPINE AIR"
    }, {
        icao: "AIU",
        callsign: "ALIA"
    }, {
        icao: "ABQ",
        callsign: "PAKBLUE"
    }, {
        icao: "THM",
        callsign: "THAI AIRMARK"
    }, {
        icao: "AIR",
        callsign: "AIRLIFT"
    }, {
        icao: "AIT",
        callsign: "AIREST CARGO"
    }, {
        icao: "AIV",
        callsign: "AIRVIAS"
    }, {
        icao: "BES",
        callsign: "BIRD EXPRESS"
    }, {
        icao: "AIW",
        callsign: "TARTAN"
    }, {
        icao: "AIX",
        callsign: "CRUISER"
    }, {
        icao: "AIY",
        callsign: "AIRCREW"
    }, {
        icao: "AIZ",
        callsign: "ARKIA"
    }, {
        icao: "AJA",
        callsign: "AFGHAN JET"
    }, {
        icao: "AJB",
        callsign: "AERO JBR"
    }, {
        icao: "AJE",
        callsign: "JET EXPRESS"
    }, {
        icao: "AJI",
        callsign: "AMERISTAR"
    }, {
        icao: "AJK",
        callsign: "BAMBI"
    }, {
        icao: "AJO",
        callsign: "AEROEXO"
    }, {
        icao: "AJS",
        callsign: "AEROEJECUTIVOS"
    }, {
        icao: "AJT",
        callsign: "AMERIJET"
    }, {
        icao: "AJV",
        callsign: "AYJAY CARGO"
    }, {
        icao: "AJW",
        callsign: "ALPHAJET"
    }, {
        icao: "AJY",
        callsign: "AYJET"
    }, {
        icao: "AKB",
        callsign: "KARAB"
    }, {
        icao: "AKC",
        callsign: "ARCA"
    }, {
        icao: "AKF",
        callsign: "ANIKAY"
    }, {
        icao: "AKH",
        callsign: "AKHAL"
    }, {
        icao: "MNI",
        callsign: "AEROMIL"
    }, {
        icao: "AKK",
        callsign: "AKLAK"
    }, {
        icao: "AKL",
        callsign: "KIRIBATI"
    }, {
        icao: "AKN",
        callsign: "ALKAN AIR"
    }, {
        icao: "AKW",
        callsign: "ANGKORWAYS"
    }, {
        icao: "AKZ",
        callsign: "ABSOLUTE"
    }, {
        icao: "ALB",
        callsign: "ALBATROS"
    }, {
        icao: "ALD",
        callsign: "ALBION"
    }, {
        icao: "ALE",
        callsign: "AEROALAS"
    }, {
        icao: "ALF",
        callsign: "ACEFORCE"
    }, {
        icao: "FYS",
        callsign: "AMERICAN FLYERS"
    }, {
        icao: "DFA",
        callsign: "AERO COACH"
    }, {
        icao: "ASQ",
        callsign: "ACEY"
    }, {
        icao: "ALG",
        callsign: "AIRLOG"
    }, {
        icao: "ALL",
        callsign: "VALLARTA"
    }, {
        icao: "AWE",
        callsign: "CACTUS"
    }, {
        icao: "TNO",
        callsign: "AEROUNION"
    }, {
        icao: "TND",
        callsign: "TAXIS CESSNA"
    }, {
        icao: "TMP",
        callsign: "TEMPE"
    }, {
        icao: "ALO",
        callsign: "ALLEGHENY"
    }, {
        icao: "ALP",
        callsign: "ALLPOINTS"
    }, {
        icao: "ALP",
        callsign: "ALPINER"
    }, {
        icao: "ALQ",
        callsign: "ALTAIR"
    }, {
        icao: "ALV",
        callsign: "AEROPOSTAL"
    }, {
        icao: "ALW",
        callsign: "ALNACIONAL"
    }, {
        icao: "ALY",
        callsign: "ALYESKA"
    }, {
        icao: "AMA",
        callsign: "ADIK"
    }, {
        icao: "AMD",
        callsign: "AEROLINEAS MEDELLIN"
    }, {
        icao: "AMF",
        callsign: "AMFLIGHT"
    }, {
        icao: "AMH",
        callsign: "MANN"
    }, {
        icao: "AMJ",
        callsign: "AVIATION AMOS"
    }, {
        icao: "AMK",
        callsign: "AMER AIR"
    }, {
        icao: "AMM",
        callsign: "AEROM"
    }, {
        icao: "AMM",
        callsign: "JETSET"
    }, {
        icao: "AMP",
        callsign: "ATSA"
    }, {
        icao: "AMQ",
        callsign: "LIFELINE"
    }, {
        icao: "AMQ",
        callsign: "AMEX"
    }, {
        icao: "AMT",
        callsign: "AMTRAN"
    }, {
        icao: "AMV",
        callsign: "AMC AIRLINES"
    }, {
        icao: "AMX",
        callsign: "AEROMEXICO"
    }, {
        icao: "AMZ",
        callsign: "AMIYA AIR"
    }, {
        icao: "ANC",
        callsign: "ANGLO"
    }, {
        icao: "BRP",
        callsign: "AEROBRA"
    }, {
        icao: "ANH",
        callsign: "ALAJNIHAH"
    }, {
        icao: "ANM",
        callsign: "NORAM"
    }, {
        icao: "ANM",
        callsign: "ANTARES"
    }, {
        icao: "ANO",
        callsign: "TOPEND"
    }, {
        icao: "ANQ",
        callsign: "ANTIOQUIA"
    }, {
        icao: "ANS",
        callsign: "AEROANDES"
    }, {
        icao: "AOM",
        callsign: "FRENCH LINES"
    }, {
        icao: "ANW",
        callsign: "AVINOR"
    }, {
        icao: "SAP",
        callsign: "TOBOL"
    }, {
        icao: "EMS",
        callsign: "SERVIEMPRESARIAL"
    }, {
        icao: "AOA",
        callsign: "ALCON"
    }, {
        icao: "AOC",
        callsign: "AERO AVCOM"
    }, {
        icao: "AOD",
        callsign: "AERO CZECH"
    }, {
        icao: "AOF",
        callsign: "ATAIR"
    }, {
        icao: "AOG",
        callsign: "AVIP"
    }, {
        icao: "MUN",
        callsign: "AEROMUNDO"
    }, {
        icao: "MUR",
        callsign: "MURI"
    }, {
        icao: "AOI",
        callsign: "ASTORIA"
    }, {
        icao: "NRO",
        callsign: "AEROMASTER"
    }, {
        icao: "NRP",
        callsign: "AERONORD"
    }, {
        icao: "AOL",
        callsign: "ANGKOR AIR"
    }, {
        icao: "AON",
        callsign: "AERO ENTERPRISE"
    }, {
        icao: "AOO",
        callsign: "COMPANY AS"
    }, {
        icao: "AOP",
        callsign: "AEROPILOTO"
    }, {
        icao: "VIV",
        callsign: "AEROENLACES"
    }, {
        icao: "VIZ",
        callsign: "AEROVIZ"
    }, {
        icao: "VGF",
        callsign: "VISTA GULF"
    }, {
        icao: "VER",
        callsign: "ALMAVER"
    }, {
        icao: "AOR",
        callsign: "INTERAFRO"
    }, {
        icao: "SMX",
        callsign: "ALIEXPRESS"
    }, {
        icao: "AOT",
        callsign: "ASIA OVERNIGHT"
    }, {
        icao: "AOV",
        callsign: "AEROVISION"
    }, {
        icao: "AOX",
        callsign: "AEROVALLE"
    }, {
        icao: "APC",
        callsign: "AIRPAC"
    }, {
        icao: "SVM",
        callsign: "SERVIMONTE"
    }, {
        icao: "APF",
        callsign: "AMAPOLA"
    }, {
        icao: "APH",
        callsign: "AIRFLIGHT"
    }, {
        icao: "API",
        callsign: "ASA PESADA"
    }, {
        icao: "APJ",
        callsign: "AIR PEACH"
    }, {
        icao: "PET",
        callsign: "AEROPETRO"
    }, {
        icao: "ARF",
        callsign: "AERO FOX"
    }, {
        icao: "BKL",
        callsign: "BARCOL"
    }, {
        icao: "BLA",
        callsign: "ALL CHARTER"
    }, {
        icao: "APL",
        callsign: "APPALACHIAN"
    }, {
        icao: "APM",
        callsign: "ALASKA PACIFIC"
    }, {
        icao: "APO",
        callsign: "AEROPRO"
    }, {
        icao: "APP",
        callsign: "ALPAVIA"
    }, {
        icao: "APQ",
        callsign: "ASPEN BASE"
    }, {
        icao: "APU",
        callsign: "AEROPUMA"
    }, {
        icao: "APW",
        callsign: "BIG A"
    }, {
        icao: "APX",
        callsign: "PARCEL EXPRESS"
    }, {
        icao: "APY",
        callsign: "APA INTERNACIONAL"
    }, {
        icao: "AQA",
        callsign: "ATCO"
    }, {
        icao: "AQL",
        callsign: "AQUILA"
    }, {
        icao: "AQO",
        callsign: "ALCOA SHUTTLE"
    }, {
        icao: "AQT",
        callsign: "AVIOQUINTANA"
    }, {
        icao: "AQU",
        callsign: "QUARIUS"
    }, {
        icao: "AQZ",
        callsign: "QUANZA"
    }, {
        icao: "ARA",
        callsign: "ARIK AIR"
    }, {
        icao: "ARB",
        callsign: "AVIAIR"
    }, {
        icao: "AWT",
        callsign: "ALBAWINGS"
    }, {
        icao: "ARE",
        callsign: "AIRES"
    }, {
        icao: "ARG",
        callsign: "ARGENTINA"
    }, {
        icao: "ARH",
        callsign: "ARROWHEAD"
    }, {
        icao: "ARI",
        callsign: "AEROVICS"
    }, {
        icao: "SUO",
        callsign: "SERVICIO SANLUIS"
    }, {
        icao: "SUP",
        callsign: "AEROSUPER"
    }, {
        icao: "ARK",
        callsign: "LINK SERVICE"
    }, {
        icao: "ARL",
        callsign: "AIRLEC"
    }, {
        icao: "ARM",
        callsign: "AMEX"
    }, {
        icao: "ARO",
        callsign: "ARROW"
    }, {
        icao: "KLD",
        callsign: "AIR KLAIPEDA"
    }, {
        icao: "ARQ",
        callsign: "ARMSTRONG"
    }, {
        icao: "ARS",
        callsign: "METSERVICE"
    }, {
        icao: "ART",
        callsign: "AEROTAL"
    }, {
        icao: "ARV",
        callsign: "ARAVCO"
    }, {
        icao: "ARW",
        callsign: "ARIABIRD"
    }, {
        icao: "OST",
        callsign: "ALANIA"
    }, {
        icao: "HUC",
        callsign: "LINEAS TEHUACAN"
    }, {
        icao: "HUT",
        callsign: "AEROHUITZILIN"
    }, {
        icao: "HUY",
        callsign: "AERO HUMAYA"
    }, {
        icao: "ARY",
        callsign: "GOSEY"
    }, {
        icao: "ASA",
        callsign: "ALASKA"
    }, {
        icao: "ASE",
        callsign: "MOROZOV"
    }, {
        icao: "ASF",
        callsign: "SCHEFF"
    }, {
        icao: "ASG",
        callsign: "AFRICAN STAR"
    }, {
        icao: "ASI",
        callsign: "AEROSUN"
    }, {
        icao: "ASM",
        callsign: "AWESOME"
    }, {
        icao: "ASO",
        callsign: "AERO NITRA"
    }, {
        icao: "ASP",
        callsign: "AIRSPRINT"
    }, {
        icao: "ASR",
        callsign: "ALL STAR"
    }, {
        icao: "AST",
        callsign: "AEROESTE"
    }, {
        icao: "WAP",
        callsign: "ARROW PANAMA"
    }, {
        icao: "ASV",
        callsign: "ASTRAVIA"
    }, {
        icao: "ASZ",
        callsign: "AIR ASTRAKHAN"
    }, {
        icao: "ATB",
        callsign: "STARLITE"
    }, {
        icao: "ATD",
        callsign: "AEROTOURS"
    }, {
        icao: "ATE",
        callsign: "ATLANTIS CANADA"
    }, {
        icao: "ATG",
        callsign: "MOLDCARGO"
    }, {
        icao: "ATI",
        callsign: "AEROTROPICS"
    }, {
        icao: "ATK",
        callsign: "AEROTACA"
    }, {
        icao: "ATL",
        callsign: "AIR BREMEN"
    }, {
        icao: "ATM",
        callsign: "AIRTAS"
    }, {
        icao: "CPV",
        callsign: "AIRCORPORATE"
    }, {
        icao: "ATP",
        callsign: "ASTRAL"
    }, {
        icao: "FEO",
        callsign: "FERINCO"
    }, {
        icao: "FES",
        callsign: "AERO ALFE"
    }, {
        icao: "FFA",
        callsign: "AVIALESOOKHRANA"
    }, {
        icao: "FFB",
        callsign: "FOXTROT FOXTROT"
    }, {
        icao: "ATR",
        callsign: "ATLASAIR"
    }, {
        icao: "ATT",
        callsign: "AERTURAS"
    }, {
        icao: "ATU",
        callsign: "ATLANT HUNGARY"
    }, {
        icao: "ATV",
        callsign: "AVANTI AIR"
    }, {
        icao: "ATW",
        callsign: "AERO TRADES"
    }, {
        icao: "AUA",
        callsign: "AUSTRIAN"
    }, {
        icao: "AUB",
        callsign: "AUGSBURGAIR"
    }, {
        icao: "TUP",
        callsign: "TUPOLEVAIR"
    }, {
        icao: "ABW",
        callsign: "AIRBRIDGE CARGO"
    }, {
        icao: "TXU",
        callsign: "ATESA"
    }, {
        icao: "TXX",
        callsign: "COWBOY"
    }, {
        icao: "AUD",
        callsign: "AUDI AIR"
    }, {
        icao: "AUF",
        callsign: "AUGUSTA"
    }, {
        icao: "AUM",
        callsign: "ATLAMUR"
    }, {
        icao: "AUN",
        callsign: "AVIONES UNIDOS"
    }, {
        icao: "SVE",
        callsign: "AEROESPECIAL"
    }, {
        icao: "AUR",
        callsign: "AYLINE"
    }, {
        icao: "AUS",
        callsign: "AUSAIR"
    }, {
        icao: "AUT",
        callsign: "AUSTRAL"
    }, {
        icao: "AUU",
        callsign: "AURORA AIR"
    }, {
        icao: "AUY",
        callsign: "AUSA"
    }, {
        icao: "AVF",
        callsign: "CARIBOO"
    }, {
        icao: "AVH",
        callsign: "KENT HELI"
    }, {
        icao: "AVJ",
        callsign: "ATOMIC"
    }, {
        icao: "AVK",
        callsign: "AVIATECOPTER"
    }, {
        icao: "AVM",
        callsign: "AVEMEX"
    }, {
        icao: "AVO",
        callsign: "AVIATION WORK"
    }, {
        icao: "AVP",
        callsign: "AVCORP"
    }, {
        icao: "AVP",
        callsign: "AVIA PUEBLA"
    }, {
        icao: "LFP",
        callsign: "ALFASPACE"
    }, {
        icao: "LFR",
        callsign: "LANFREIGHT"
    }, {
        icao: "AVS",
        callsign: "AVIALSA"
    }, {
        icao: "AVT",
        callsign: "ASIAVIA"
    }, {
        icao: "AVU",
        callsign: "AVIASUD"
    }, {
        icao: "AVV",
        callsign: "AIRVANTAGE"
    }, {
        icao: "AVW",
        callsign: "AVIATOR"
    }, {
        icao: "AVX",
        callsign: "PASLAUGA"
    }, {
        icao: "YRG",
        callsign: "YUGAIR"
    }, {
        icao: "BGA",
        callsign: "BELUGA"
    }, {
        icao: "BGD",
        callsign: "AIR BANGLA"
    }, {
        icao: "BGF",
        callsign: "BULGARIAN"
    }, {
        icao: "BGG",
        callsign: "AERO BG"
    }, {
        icao: "BHC",
        callsign: "BAHIA"
    }, {
        icao: "BIV",
        callsign: "AVIASERVICE"
    }, {
        icao: "SZA",
        callsign: "AESA"
    }, {
        icao: "AVY",
        callsign: "AEROVARADERO"
    }, {
        icao: "AWB",
        callsign: "AIRNAT"
    }, {
        icao: "AWK",
        callsign: "AIRWORK"
    }, {
        icao: "AWL",
        callsign: "AUSSIEWORLD"
    }, {
        icao: "AWO",
        callsign: "AWOOD AIR"
    }, {
        icao: "AWR",
        callsign: "ARCTIC WINGS"
    }, {
        icao: "ISM",
        callsign: "STORK"
    }, {
        icao: "AWS",
        callsign: "ARAB WINGS"
    }, {
        icao: "AWV",
        callsign: "AIRWAVE"
    }, {
        icao: "AWY",
        callsign: "AEROWEE"
    }, {
        icao: "AXH",
        callsign: "AEROMEXHAGA"
    }, {
        icao: "AXI",
        callsign: "AIR FREIGHTER"
    }, {
        icao: "AXK",
        callsign: "EXPRESS JET"
    }, {
        icao: "AXM",
        callsign: "RED CAP"
    }, {
        icao: "XAX",
        callsign: "XANADU"
    }, {
        icao: "WAJ",
        callsign: "WING ASIA"
    }, {
        icao: "IAD",
        callsign: "ARIYA"
    }, {
        icao: "AXN",
        callsign: "ALEXANDROS"
    }, {
        icao: "AXP",
        callsign: "AEROMAX SPAIN"
    }, {
        icao: "BNI",
        callsign: "ALBERNI"
    }, {
        icao: "BNZ",
        callsign: "AERO BONANZA"
    }, {
        icao: "BOC",
        callsign: "AEROBONA"
    }, {
        icao: "AXR",
        callsign: "RENTAXEL"
    }, {
        icao: "AXS",
        callsign: "ALTUS"
    }, {
        icao: "AXV",
        callsign: "AXAVIA"
    }, {
        icao: "AXX",
        callsign: "IMPEX"
    }, {
        icao: "AXY",
        callsign: "AXIS"
    }, {
        icao: "AYD",
        callsign: "AIRLINES ALADIA"
    }, {
        icao: "AYM",
        callsign: "AIRMAN"
    }, {
        icao: "NPT",
        callsign: "NEPTUNE"
    }, {
        icao: "GBN",
        callsign: "ATLANTIC GABON"
    }, {
        icao: "BJK",
        callsign: "BLACKJACK"
    }, {
        icao: "HHA",
        callsign: "ATLANTIC HONDURAS"
    }, {
        icao: "AYN",
        callsign: "ATLANTIC NICARAGUA"
    }, {
        icao: "AYT",
        callsign: "AYEET"
    }, {
        icao: "AYZ",
        callsign: "ATLANTSOYUZ"
    }, {
        icao: "AZA",
        callsign: "ALITALIA"
    }, {
        icao: "AZE",
        callsign: "ARCUS AIR"
    }, {
        icao: "AZI",
        callsign: "ASTRA"
    }, {
        icao: "AZK",
        callsign: "AZALHELICOPTER"
    }, {
        icao: "AZL",
        callsign: "SKY AFRICA"
    }, {
        icao: "AZM",
        callsign: "AEROCOZUMEL"
    }, {
        icao: "AZP",
        callsign: "ARIZONA PACIFIC"
    }, {
        icao: "AZS",
        callsign: "ZITOTRANS"
    }, {
        icao: "AZT",
        callsign: "AZIMUT"
    }, {
        icao: "AZV",
        callsign: "AZOV AVIA"
    }, {
        icao: "MHC",
        callsign: "AERO JOMACHA"
    }, {
        icao: "AZY",
        callsign: "ARIZAIR"
    }, {
        icao: "AZZ",
        callsign: "AZZA TRANSPORT"
    }, {
        icao: "NAR",
        callsign: "NIGHT AIR"
    }, {
        icao: "NAU",
        callsign: "ANTANIK"
    }, {
        icao: "NER",
        callsign: "NEWAIR"
    }, {
        icao: "OBA",
        callsign: "AEROBANANA"
    }, {
        icao: "OBK",
        callsign: "AMAKO AIR"
    }, {
        icao: "OCA",
        callsign: "AROSCA"
    }, {
        icao: "NGC",
        callsign: "ANGOSERVICE"
    }, {
        icao: "NGE",
        callsign: "ANGEL AIR"
    }, {
        icao: "NGF",
        callsign: "ANGEL FLIGHT"
    }, {
        icao: "OUL",
        callsign: "CITY EXPRESS"
    }, {
        icao: "OVA",
        callsign: "AERONOVA"
    }, {
        icao: "XPE",
        callsign: "EXPERT"
    }, {
        icao: "XSS",
        callsign: "INTER EXPRESS"
    }, {
        icao: "TLR",
        callsign: "AIR LIBYA"
    }, {
        icao: "RVE",
        callsign: "AIRVENTURE"
    }, {
        icao: "RVI",
        callsign: "AERO SERVICIOS"
    }, {
        icao: "RVL",
        callsign: "AIR VALLEE"
    }, {
        icao: "OVE",
        callsign: "AEROMOVER"
    }, {
        icao: "OVI",
        callsign: "VIAS EJECUTIVAS"
    }, {
        icao: "PTD",
        callsign: "PITY"
    }, {
        icao: "PTE",
        callsign: "AEROCOP"
    }, {
        icao: "PLL",
        callsign: "AIRPAL"
    }, {
        icao: "PLM",
        callsign: "PULLMANTUR"
    }, {
        icao: "AEH",
        callsign: "AVEX"
    }, {
        icao: "PSG",
        callsign: "SERVIAVIONES"
    }, {
        icao: "SLU",
        callsign: "AVIO SLUZBA"
    }, {
        icao: "SCU",
        callsign: "SCORPIO UNIVERS"
    }, {
        icao: "SIP",
        callsign: "AIR SPIRIT"
    }, {
        icao: "BMV",
        callsign: "OLIGA"
    }, {
        icao: "GUG",
        callsign: "AVIATECA"
    }, {
        icao: "PXX",
        callsign: "PINE STATE"
    }, {
        icao: "PYC",
        callsign: "AEROPYCSA"
    }, {
        icao: "PVK",
        callsign: "BORIS"
    }, {
        icao: "BAS",
        callsign: "AEROSERV"
    }, {
        icao: "BBT",
        callsign: "AGYDAL"
    }, {
        icao: "MCY",
        callsign: "MERCY"
    }, {
        icao: "EGF",
        callsign: "EAGLE FLIGHT"
    }, {
        icao: "PUE",
        callsign: "PUELCHE"
    }, {
        icao: "AZI",
        callsign: "AZZURRA"
    }, {
        icao: "ETC",
        callsign: "TRANATTICO"
    }, {
        icao: "XCT",
        callsign: "AEROCOSTAXI"
    }, {
        icao: "VRO",
        callsign: "AEROVITRO"
    }, {
        icao: "VRI",
        callsign: "VILLARICA"
    }, {
        icao: "VEG",
        callsign: "AEROVEGA"
    }, {
        icao: "VVG",
        callsign: "AEROVILLA"
    }, {
        icao: "VLR",
        callsign: "VILLAVERDE"
    }, {
        icao: "WIL",
        callsign: "WILLIAMETTE"
    }, {
        icao: "VEJ",
        callsign: "VENEJECUTIV"
    }, {
        icao: "WAB",
        callsign: "WABASH"
    }, {
        icao: "VNG",
        callsign: "VANGUARDIA"
    }, {
        icao: "VAD",
        callsign: "VALLES"
    }, {
        icao: "VMR",
        callsign: "AERO VILAMOURA"
    }, {
        icao: "VLS",
        callsign: "VIREL"
    }, {
        icao: "XAA",
        callsign: "ROCKFISH|UNITED STATES"
    }, {
        icao: "VUO",
        callsign: "AEROVUELOX"
    }, {
        icao: "VTM",
        callsign: "AERONAVES TSM"
    }, {
        icao: "VUN",
        callsign: "AIRIVOIRE"
    }, {
        icao: "BOT",
        callsign: "BOTSWANA"
    }, {
        icao: "XLL",
        callsign: "TINGATINGA"
    }, {
        icao: "VAE",
        callsign: "AIREVANS"
    }, {
        icao: "WHY",
        callsign: "AIR SOREL"
    }, {
        icao: "WDR",
        callsign: "WIND RIDER"
    }, {
        icao: "UPA",
        callsign: "FOYLE"
    }, {
        icao: "VTY",
        callsign: "VICTORY"
    }, {
        icao: "VTA",
        callsign: "AIR TAHITI"
    }, {
        icao: "URG",
        callsign: "URGA"
    }, {
        icao: "VDR",
        callsign: "VARDAR"
    }, {
        icao: "VIM",
        callsign: "CRYSTAL"
    }, {
        icao: "WLR",
        callsign: "AIRWALSER"
    }, {
        icao: "URA",
        callsign: "ROSAVIA"
    }, {
        icao: "WLA",
        callsign: "AIRLIMITED"
    }, {
        icao: "XFX",
        callsign: "AIRCORP"
    }, {
        icao: "WAY",
        callsign: "GARONNE"
    }, {
        icao: "WGS",
        callsign: "AIRWINGS"
    }, {
        icao: "XAK",
        callsign: "SUNEXPRESS"
    }, {
        icao: "WPK",
        callsign: "WOLFPACK"
    }, {
        icao: "URP",
        callsign: "AIRARP"
    }, {
        icao: "WPR",
        callsign: "WESTPAC RESCUE"
    }, {
        icao: "URR",
        callsign: "AIR AURORA"
    }, {
        icao: "UST",
        callsign: "AUSTRO AEREO"
    }, {
        icao: "WLT",
        callsign: "WINGLET"
    }, {
        icao: "VLV",
        callsign: "VLADLIFT"
    }, {
        icao: "VME",
        callsign: "AVIAMERICA"
    }, {
        icao: "VVA",
        callsign: "IALSI"
    }, {
        icao: "WLV",
        callsign: "WOLVERINE"
    }, {
        icao: "WTA",
        callsign: "WEST TOGO"
    }, {
        icao: "VNT",
        callsign: "AVIENT"
    }, {
        icao: "VZR",
        callsign: "IAZUR"
    }, {
        icao: "VID",
        callsign: "AVIAPRAD"
    }, {
        icao: "VXG",
        callsign: "AVIREXGABON"
    }, {
        icao: "VXX",
        callsign: "EXPRESSAVIA"
    }, {
        icao: "XAM",
        callsign: "ALLIANCE"
    }, {
        icao: "VAZ",
        callsign: "REMONT AIR"
    }, {
        icao: "VAS",
        callsign: "ATRAN"
    }, {
        icao: "VAM",
        callsign: "AMERAVIA"
    }, {
        icao: "KHV",
        callsign: "AIR ANGKOR"
    }, {
        icao: "VBC",
        callsign: "AIR VICTOR"
    }, {
        icao: "CAJ",
        callsign: "CAR LINE"
    }, {
        icao: "CAO",
        callsign: "AIRCHINA FREIGHT"
    }, {
        icao: "CBE",
        callsign: "AEROCARIBE"
    }, {
        icao: "CBO",
        callsign: "TAXI CABO"
    }, {
        icao: "CBS",
        callsign: "AIR COLUMBUS"
    }, {
        icao: "CBV",
        callsign: "CABOAEREO"
    }, {
        icao: "CCA",
        callsign: "AIR CHINA"
    }, {
        icao: "CDA",
        callsign: "CARDAL"
    }, {
        icao: "CDP",
        callsign: "CONDORPERU"
    }, {
        icao: "CDV",
        callsign: "SKOL"
    }, {
        icao: "CFF",
        callsign: "AEROFAN"
    }, {
        icao: "CFV",
        callsign: "CALAFIA"
    }, {
        icao: "CGB",
        callsign: "CARGO BELIZE"
    }, {
        icao: "CGV",
        callsign: "CLUBE ALGARVE"
    }, {
        icao: "CGW",
        callsign: "CHANGCHENG"
    }, {
        icao: "CHJ",
        callsign: "AIR CHAIKA"
    }, {
        icao: "CHR",
        callsign: "ZAIRE CHARTER"
    }, {
        icao: "CHV",
        callsign: "CHARTAIR"
    }, {
        icao: "CID",
        callsign: "ACID"
    }, {
        icao: "CIR",
        callsign: "AIR ARCTIC"
    }, {
        icao: "CKL",
        callsign: "CIRCLE CITY"
    }, {
        icao: "CLL",
        callsign: "AEROCASTILLO"
    }, {
        icao: "CLP",
        callsign: "CLUB PORTUGAL"
    }, {
        icao: "CMF",
        callsign: "COMPASSION"
    }, {
        icao: "CNE",
        callsign: "CONNECTOR"
    }, {
        icao: "CNH",
        callsign: "CHENANGO"
    }, {
        icao: "CNU",
        callsign: "AIR CONSUL"
    }, {
        icao: "CNX",
        callsign: "CANEX"
    }, {
        icao: "CPF",
        callsign: "TECHSERVICE"
    }, {
        icao: "CRD",
        callsign: "AIR CORRIDOR"
    }, {
        icao: "CRF",
        callsign: "AIR CENTRAL"
    }, {
        icao: "CRJ",
        callsign: "AIR CRUZAL"
    }, {
        icao: "CRP",
        callsign: "AEROTRANSCORP"
    }, {
        icao: "CRQ",
        callsign: "CREE"
    }, {
        icao: "CTA",
        callsign: "CHARTRAN"
    }, {
        icao: "CTE",
        callsign: "TENGLONG"
    }, {
        icao: "CTR",
        callsign: "CENTAURO"
    }, {
        icao: "CUO",
        callsign: "CUAHONTE"
    }, {
        icao: "CVA",
        callsign: "CHATHAM"
    }, {
        icao: "CWM",
        callsign: "AIR MARSHALLS"
    }, {
        icao: "CWP",
        callsign: "COASTWATCH"
    }, {
        icao: "CYL",
        callsign: "CITYLINER"
    }, {
        icao: "CYO",
        callsign: "COYOTE"
    }, {
        icao: "CYE",
        callsign: "AEROCHEYENNE"
    }, {
        icao: "DAH",
        callsign: "AIR ALGERIE"
    }, {
        icao: "DAP",
        callsign: "DAP"
    }, {
        icao: "DBA",
        callsign: "DOUBLEA"
    }, {
        icao: "DBD",
        callsign: "AIR NIAGARA"
    }, {
        icao: "DEF",
        callsign: "TIRPA"
    }, {
        icao: "DEG",
        callsign: "DEGGER"
    }, {
        icao: "DHL",
        callsign: "DH-L"
    }, {
        icao: "DHM",
        callsign: "ARCHER"
    }, {
        icao: "DIC",
        callsign: "AEROMEDICA"
    }, {
        icao: "DIN",
        callsign: "AERODIN"
    }, {
        icao: "DJU",
        callsign: "AIR DJIB"
    }, {
        icao: "DLA",
        callsign: "DOLOMITI"
    }, {
        icao: "DLS",
        callsign: "AEROMODELO"
    }, {
        icao: "DLU",
        callsign: "DEL SUR"
    }, {
        icao: "DMC",
        callsign: "DINAMICAMONT"
    }, {
        icao: "DMI",
        callsign: "AERODINAMICO"
    }, {
        icao: "DNA",
        callsign: "AERODESPACHOS"
    }, {
        icao: "DNC",
        callsign: "FLYINGOLIVE"
    }, {
        icao: "DNJ",
        callsign: "DYNAJET"
    }, {
        icao: "DRD",
        callsign: "ALADA AIR"
    }, {
        icao: "DRM",
        callsign: "DARTMOOR"
    }, {
        icao: "DRO",
        callsign: "AERONORESTE"
    }, {
        icao: "DRU",
        callsign: "MIRNY"
    }, {
        icao: "DSK",
        callsign: "SKYBANNER"
    }, {
        icao: "DST",
        callsign: "DESERT"
    }, {
        icao: "EAT",
        callsign: "TRANS EUROPE"
    }, {
        icao: "EAY",
        callsign: "REVAL"
    }, {
        icao: "EBC",
        callsign: "CALIXJET"
    }, {
        icao: "ECE",
        callsign: "AIRCITY"
    }, {
        icao: "ECG",
        callsign: "EJECTUIVOS RCG"
    }, {
        icao: "ECL",
        callsign: "AERO CASTELLANA"
    }, {
        icao: "ECM",
        callsign: "AERO COMERCIALES"
    }, {
        icao: "EDA",
        callsign: "ANDES"
    }, {
        icao: "EET",
        callsign: "AESTE"
    }, {
        icao: "EFC",
        callsign: "FLIGHT TAXI"
    }, {
        icao: "EJP",
        callsign: "EJECCORPORATIVOS"
    }, {
        icao: "ELG",
        callsign: "ALPI EAGLES"
    }, {
        icao: "ALX",
        callsign: "ALPIJETS"
    }, {
        icao: "END",
        callsign: "ARRENDADORA"
    }, {
        icao: "ENW",
        callsign: "AERONOR"
    }, {
        icao: "EOL",
        callsign: "EOLE"
    }, {
        icao: "EOK",
        callsign: "AEROHANKUK"
    }, {
        icao: "EOM",
        callsign: "AERO ERMES"
    }, {
        icao: "EPL",
        callsign: "EMPRESARIALES"
    }, {
        icao: "EPE",
        callsign: "AEROEMPRESARIAL"
    }, {
        icao: "EQL",
        callsign: "EQUATORIAL"
    }, {
        icao: "ERG",
        callsign: "AVIANERGO"
    }, {
        icao: "ERI",
        callsign: "ASERGIO"
    }, {
        icao: "ERK",
        callsign: "AEROSEC"
    }, {
        icao: "ERM",
        callsign: "EOMAAN"
    }, {
        icao: "ESB",
        callsign: "AEREOSABA"
    }, {
        icao: "ESU",
        callsign: "ALESUR"
    }, {
        icao: "ESZ",
        callsign: "ESPERANZA"
    }, {
        icao: "ETE",
        callsign: "AEROSIETE"
    }, {
        icao: "EUK",
        callsign: "SNOWBIRD"
    }, {
        icao: "EVE",
        callsign: "SUNBEAM"
    }, {
        icao: "EVR",
        callsign: "DIANA"
    }, {
        icao: "EWE/EWL",
        callsign: "EUROPWINGS BLACK PEARL"
    }, {
        icao: "EXG",
        callsign: "EXCHANGE"
    }, {
        icao: "FAC",
        callsign: "FAROECOPTER"
    }, {
        icao: "FAG",
        callsign: "FUAER"
    }, {
        icao: "FAJ",
        callsign: "FIJIAIR"
    }, {
        icao: "FAN",
        callsign: "FANBIRD"
    }, {
        icao: "FCI",
        callsign: "FAST CHECK"
    }, {
        icao: "FCO",
        callsign: "AEROFRISCO"
    }, {
        icao: "FDA",
        callsign: "FUJI DREAM"
    }, {
        icao: "FDS",
        callsign: "FLYDOC"
    }, {
        icao: "FGT",
        callsign: "FREIAERO"
    }, {
        icao: "FIC",
        callsign: "AEROSAFIN"
    }, {
        icao: "FIF",
        callsign: "AIR FINLAND"
    }, {
        icao: "FII",
        callsign: "FLIGHT CHECKER"
    }, {
        icao: "FIX",
        callsign: "AIRFIX"
    }, {
        icao: "FJI",
        callsign: "PACIFIC"
    }, {
        icao: "FLI",
        callsign: "FAROELINE"
    }, {
        icao: "FLP",
        callsign: "AEROCLUB FLAPS"
    }, {
        icao: "FLZ",
        callsign: "AIR FLORIDA"
    }, {
        icao: "FNO",
        callsign: "RIAZOR"
    }, {
        icao: "FNX",
        callsign: "AERO FENIX"
    }, {
        icao: "FPY",
        callsign: "AFRICOMPANY"
    }, {
        icao: "FRJ",
        callsign: "AFRIJET"
    }, {
        icao: "FRK",
        callsign: "AFRIFAST"
    }, {
        icao: "FRQ",
        callsign: "CHARTER AFRIQUE"
    }, {
        icao: "FST",
        callsign: "FAST TRACK"
    }, {
        icao: "FTC",
        callsign: "AFFAIRES TCHAD"
    }, {
        icao: "FXI",
        callsign: "FAXI"
    }, {
        icao: "GAP",
        callsign: "ORIENT PACIFIC"
    }, {
        icao: "GAU",
        callsign: "AEROGAUCHO"
    }, {
        icao: "GBJ",
        callsign: "GLOBAL JET"
    }, {
        icao: "GCF",
        callsign: "AEROCARTO"
    }, {
        icao: "GCK",
        callsign: "AEROGEM"
    }, {
        icao: "GFO",
        callsign: "AEROVIAS GOLFO"
    }, {
        icao: "GGL",
        callsign: "GIRA GLOBO"
    }, {
        icao: "GGN",
        callsign: "GEORGIAN"
    }, {
        icao: "GHL",
        callsign: "HANDLING"
    }, {
        icao: "GHN",
        callsign: "AIR GHANA"
    }, {
        icao: "GIL",
        callsign: "AFRICAN TRANSPORT"
    }, {
        icao: "GIP",
        callsign: "FUTURE EXPRESS"
    }, {
        icao: "GIZ",
        callsign: "AFRILENS"
    }, {
        icao: "GLL",
        callsign: "TWINS"
    }, {
        icao: "GLT",
        callsign: "GASLIGHT"
    }, {
        icao: "GME",
        callsign: "MAYAN EAGLES"
    }, {
        icao: "GMM",
        callsign: "AEROGUAMUCHIL"
    }, {
        icao: "GMS",
        callsign: "SERVICIOS GAMA"
    }, {
        icao: "GNT",
        callsign: "GINTA"
    }, {
        icao: "GOA",
        callsign: "ALBERTA"
    }, {
        icao: "GRE",
        callsign: "GREECE AIRWAYS"
    }, {
        icao: "GRG",
        callsign: "AIR GEORGIA"
    }, {
        icao: "GRO",
        callsign: "ALLEGRO"
    }, {
        icao: "GRR",
        callsign: "AGROAR"
    }, {
        icao: "GRX",
        callsign: "GRODNO"
    }, {
        icao: "GSP",
        callsign: "GREEN SPEED"
    }, {
        icao: "GSV",
        callsign: "AGRAV"
    }, {
        icao: "GTC",
        callsign: "GOLDEN WINGS"
    }, {
        icao: "GTI",
        callsign: "GIANT"
    }, {
        icao: "GTP",
        callsign: "GRUPOTAMPICO"
    }, {
        icao: "GUA",
        callsign: "AGUASCALIENTES"
    }, {
        icao: "GUY",
        callsign: "GREEN BIRD"
    }, {
        icao: "GVI",
        callsign: "IRINA"
    }, {
        icao: "HAD",
        callsign: "HAITI AVIA"
    }, {
        icao: "HAH",
        callsign: "AIR COMORES"
    }, {
        icao: "HAT",
        callsign: "TAXI BIRD"
    }, {
        icao: "HEI",
        callsign: "AEROHEIN"
    }, {
        icao: "HGH",
        callsign: "HIGHER"
    }, {
        icao: "HID",
        callsign: "EJECUTIVA HIDALGO"
    }, {
        icao: "HJA",
        callsign: "AIRHAITI"
    }, {
        icao: "HLN",
        callsign: "ORANGE"
    }, {
        icao: "HJT",
        callsign: "ALRAIS CARGO"
    }, {
        icao: "HKH",
        callsign: "HAWKHUNGARY"
    }, {
        icao: "HMA",
        callsign: "TAHOMA"
    }, {
        icao: "HMT",
        callsign: "HAMILTON"
    }, {
        icao: "HOM",
        callsign: "AERO HOMEX"
    }, {
        icao: "HPO",
        callsign: "ALMIRON"
    }, {
        icao: "HYR",
        callsign: "HIGHFLYER"
    }, {
        icao: "HZT",
        callsign: "HORIZON TOGO"
    }, {
        icao: "ICM",
        callsign: "INTERCAMEROUN"
    }, {
        icao: "IFI",
        callsign: "HELLAS LIFT"
    }, {
        icao: "IKM",
        callsign: "EASY SHUTTLE"
    }, {
        icao: "ILK",
        callsign: "ILEK"
    }, {
        icao: "IME",
        callsign: "AIRTIME"
    }, {
        icao: "IMN",
        callsign: "TAXI CIMARRON"
    }, {
        icao: "INA",
        callsign: "AERONACIONAL"
    }, {
        icao: "ING",
        callsign: "AEROINGE"
    }, {
        icao: "INO",
        callsign: "INTENOR"
    }, {
        icao: "IPL",
        callsign: "IPULL"
    }, {
        icao: "IRD",
        callsign: "ARVAND"
    }, {
        icao: "IRH",
        callsign: "ATLAS AVIA"
    }, {
        icao: "IRW",
        callsign: "ARAM"
    }, {
        icao: "IRX",
        callsign: "ARIA"
    }, {
        icao: "ITE",
        callsign: "AEROTAXI"
    }, {
        icao: "ITF",
        callsign: "AIR AVITA"
    }, {
        icao: "ITI",
        callsign: "AIRSWIFT"
    }, {
        icao: "ITO",
        callsign: "AERO CITRO"
    }, {
        icao: "IVE",
        callsign: "COMPANY EXEC"
    }, {
        icao: "JAB",
        callsign: "AIR BAGAN"
    }, {
        icao: "JAD",
        callsign: "AEROJAL"
    }, {
        icao: "JAR",
        callsign: "AIRLINK"
    }, {
        icao: "JEE",
        callsign: "AMBJEK AIR"
    }, {
        icao: "JKH",
        callsign: "JETKONTOR"
    }, {
        icao: "JMR",
        callsign: "ALEXANDAIR"
    }, {
        icao: "JMX",
        callsign: "JAMAICA EXPRESS"
    }, {
        icao: "JOB",
        callsign: "JOBENI"
    }, {
        icao: "JOL",
        callsign: "EDIL"
    }, {
        icao: "JPR",
        callsign: "JASPER"
    }, {
        icao: "JTS",
        callsign: "AVIONESJETS"
    }, {
        icao: "JUA",
        callsign: "JUAREZ"
    }, {
        icao: "JZA",
        callsign: "JAZZ"
    }, {
        icao: "KAA",
        callsign: "AASCO"
    }, {
        icao: "KAD",
        callsign: "AIR KIROVOGRAD"
    }, {
        icao: "KAM",
        callsign: "ICOAIR"
    }, {
        icao: "KAV",
        callsign: "AIRKUFRA"
    }, {
        icao: "KEK",
        callsign: "ARKHABAY"
    }, {
        icao: "KFK",
        callsign: "KRIFKA AIR"
    }, {
        icao: "KFT",
        callsign: "AIR KRAFT MIR"
    }, {
        icao: "KGD",
        callsign: "CONCORDE AIR"
    }, {
        icao: "KIE",
        callsign: "TWEETY"
    }, {
        icao: "KKB",
        callsign: "KHAKI BLUE"
    }, {
        icao: "KKK",
        callsign: "ATLASJET"
    }, {
        icao: "KLB",
        callsign: "TRANS MALI"
    }, {
        icao: "KLZ",
        callsign: "AEROKALUZ"
    }, {
        icao: "KOR",
        callsign: "AIR KORYO"
    }, {
        icao: "KOY",
        callsign: "ALEKS"
    }, {
        icao: "KRE",
        callsign: "AEROSUCRE"
    }, {
        icao: "KRT",
        callsign: "KOKTA"
    }, {
        icao: "KSI",
        callsign: "KISSARI"
    }, {
        icao: "KTN",
        callsign: "AERONAVIGACIYA"
    }, {
        icao: "KVR",
        callsign: "KAVAIR"
    }, {
        icao: "KYC",
        callsign: "DOLPHIN"
    }, {
        icao: "KZR",
        callsign: "ASTANALINE"
    }, {
        icao: "LAG",
        callsign: "AVILEG"
    }, {
        icao: "LBC",
        callsign: "ALBANIAN"
    }, {
        icao: "LBI",
        callsign: "ALBISA"
    }, {
        icao: "LBW",
        callsign: "ALBANWAYS"
    }, {
        icao: "LDG",
        callsign: "DURANGO"
    }, {
        icao: "BOX",
        callsign: "GERMAN CARGO"
    }, {
        icao: "LDN",
        callsign: "ALDONAS AIR"
    }, {
        icao: "AKJ",
        callsign: "AKASA AIR"
    }, {
        icao: "LDR",
        callsign: "AEROLIDER"
    }, {
        icao: "LET",
        callsign: "MEXEJECUTIV"
    }, {
        icao: "LFA",
        callsign: "AIR ALFA"
    }, {
        icao: "LFC",
        callsign: "LIFE FLIGHT CANADA"
    }, {
        icao: "LGN",
        callsign: "AEROLAGUNA"
    }, {
        icao: "LHR",
        callsign: "AL AHRAM"
    }, {
        icao: "LID",
        callsign: "ALIDA"
    }, {
        icao: "LIE",
        callsign: "ALDAWOOD AIR"
    }, {
        icao: "LKP",
        callsign: "LAKE POWELL"
    }, {
        icao: "LKS",
        callsign: "AIRLIN"
    }, {
        icao: "LKY",
        callsign: "LUCKY"
    }, {
        icao: "LLR",
        callsign: "ALLIED"
    }, {
        icao: "LMA",
        callsign: "AEROLIMA"
    }, {
        icao: "LML",
        callsign: "ALAMIA AIR"
    }, {
        icao: "LMP",
        callsign: "AIR FLIGHT"
    }, {
        icao: "LMT",
        callsign: "ALMATY"
    }, {
        icao: "LMX",
        callsign: "LINEAS MEXICANAS"
    }, {
        icao: "LMY",
        callsign: "AGLEB"
    }, {
        icao: "LMZ",
        callsign: "ALUNK"
    }, {
        icao: "LNE",
        callsign: "AEROLANE"
    }, {
        icao: "LNK",
        callsign: "LINK"
    }, {
        icao: "LNT",
        callsign: "LINEAINT"
    }, {
        icao: "LOK",
        callsign: "ALOK AIR"
    }, {
        icao: "LOU",
        callsign: "AIR SAINTLOUIS"
    }, {
        icao: "LPA",
        callsign: "LEAP"
    }, {
        icao: "LPC",
        callsign: "NETSTAR"
    }, {
        icao: "LPV",
        callsign: "ALPAV"
    }, {
        icao: "LRO",
        callsign: "ALROSA"
    }, {
        icao: "LRW",
        callsign: "AL RIDA"
    }, {
        icao: "LSK",
        callsign: "AURELA"
    }, {
        icao: "LSR",
        callsign: "ALSAIR"
    }, {
        icao: "LTI",
        callsign: "LATINO"
    }, {
        icao: "LUC",
        callsign: "ALBINATI"
    }, {
        icao: "LUR",
        callsign: "ATLANTIS"
    }, {
        icao: "LVN",
        callsign: "ALIVEN"
    }, {
        icao: "LVR",
        callsign: "AVIAVILSA"
    }, {
        icao: "LXG",
        callsign: "LUXOR GOLF"
    }, {
        icao: "LXR",
        callsign: "AIRLUXOR"
    }, {
        icao: "LYT",
        callsign: "APATAS"
    }, {
        icao: "LZP",
        callsign: "DOC AIR"
    }, {
        icao: "LZR",
        callsign: "LAZUR BEEGEE"
    }, {
        icao: "MAM",
        callsign: "AEROMAN"
    }, {
        icao: "MAU",
        callsign: "AIRMAURITIUS"
    }, {
        icao: "MBA",
        callsign: "AVAG AIR"
    }, {
        icao: "MBB",
        callsign: "AIR MANAS"
    }, {
        icao: "MBC",
        callsign: "MABECO"
    }, {
        icao: "MBV",
        callsign: "AEREM"
    }, {
        icao: "MCB",
        callsign: "WESTMID"
    }, {
        icao: "MCD",
        callsign: "AIR MED"
    }, {
        icao: "MCO",
        callsign: "MARCOS"
    }, {
        icao: "MDC",
        callsign: "NIGHT SHIP"
    }, {
        icao: "MDG",
        callsign: "AIR MADAGASCAR"
    }, {
        icao: "MDX",
        callsign: "MEDAIR"
    }, {
        icao: "MEF",
        callsign: "EMPENNAGE"
    }, {
        icao: "MFL",
        callsign: "MCFLY"
    }, {
        icao: "MGE",
        callsign: "MAGELLAN"
    }, {
        icao: "MGS",
        callsign: "AEROMAGAR"
    }, {
        icao: "MIE",
        callsign: "AEROPREMIER"
    }, {
        icao: "MLD",
        callsign: "AIR MOLDOVA"
    }, {
        icao: "MLF",
        callsign: "AMAL"
    }, {
        icao: "MLI",
        callsign: "AIR MALI"
    }, {
        icao: "MLN",
        callsign: "AIR MADELEINE"
    }, {
        icao: "MMC",
        callsign: "AERMARCHE"
    }, {
        icao: "MMD",
        callsign: "MERMAID"
    }, {
        icao: "MMM",
        callsign: "AVIAMERIDIAN"
    }, {
        icao: "MMP",
        callsign: "AMPINC"
    }, {
        icao: "MMX",
        callsign: "PERUMAX"
    }, {
        icao: "MNE",
        callsign: "AEROAMANECER"
    }, {
        icao: "MNG",
        callsign: "AERO MONGOLIA"
    }, {
        icao: "MOC",
        callsign: "MONARCH CARGO"
    }, {
        icao: "MOP",
        callsign: "PUBLICITARIA"
    }, {
        icao: "MOR",
        callsign: "AEROMORELIA"
    }, {
        icao: "MPD",
        callsign: "RED COMET"
    }, {
        icao: "MPX",
        callsign: "AEROMEXPRESS"
    }, {
        icao: "MQT",
        callsign: "MUSKETEER"
    }, {
        icao: "MRL",
        callsign: "AEROMORELOS"
    }, {
        icao: "MRM",
        callsign: "MARITIME"
    }, {
        icao: "MRT",
        callsign: "MIKE ROMEO"
    }, {
        icao: "MSK",
        callsign: "AIR SPORT"
    }, {
        icao: "MSM",
        callsign: "AEROMAS EXPRESS"
    }, {
        icao: "MSO",
        callsign: "MESO AMERICANAS"
    }, {
        icao: "MSV",
        callsign: "AERAFKAM"
    }, {
        icao: "MTB",
        callsign: "AEROMETROPOLIS"
    }, {
        icao: "MTE",
        callsign: "AEROMET"
    }, {
        icao: "MTK",
        callsign: "AIRMETACK"
    }, {
        icao: "MTY",
        callsign: "MONTY"
    }, {
        icao: "MXO",
        callsign: "MAXAERO"
    }, {
        icao: "MYS",
        callsign: "AERO YAQUI"
    }, {
        icao: "MZL",
        callsign: "MONTES AZULES"
    }, {
        icao: "NBK",
        callsign: "ALAIR"
    }, {
        icao: "NEL",
        callsign: "AEROLAREDO"
    }, {
        icao: "NGV",
        callsign: "ANGOAVIA"
    }, {
        icao: "NID",
        callsign: "AERONI"
    }, {
        icao: "NIE",
        callsign: "AERONIETO"
    }, {
        icao: "NIG",
        callsign: "AEROLINE"
    }, {
        icao: "NKZ",
        callsign: "NOVOKUZNETSK"
    }, {
        icao: "NRE",
        callsign: "AVIONES ARE"
    }, {
        icao: "NRS",
        callsign: "NORTH SLOPE"
    }, {
        icao: "NSO",
        callsign: "SOSA"
    }, {
        icao: "NTV",
        callsign: "INTERIVOIRE"
    }, {
        icao: "NUL",
        callsign: "SERVICIOS NUEVOLEON"
    }, {
        icao: "NVI",
        callsign: "NEW AVIAL"
    }, {
        icao: "NWG",
        callsign: "NORWING"
    }, {
        icao: "NXA",
        callsign: "BLUEDOLPHIN"
    }, {
        icao: "OAO",
        callsign: "DVINA"
    }, {
        icao: "OGI",
        callsign: "AEROGISA"
    }, {
        icao: "OLV",
        callsign: "OLVE"
    }, {
        icao: "OMG",
        callsign: "OMEGA"
    }, {
        icao: "ONR",
        callsign: "EDER"
    }, {
        icao: "ONT",
        callsign: "ONTARIO"
    }, {
        icao: "ORP",
        callsign: "CORPSA"
    }, {
        icao: "OSN",
        callsign: "AEROSAN"
    }, {
        icao: "PAJ",
        callsign: "ALIPARMA"
    }, {
        icao: "PBT",
        callsign: "PARABET"
    }, {
        icao: "PBU",
        callsign: "AIRBURUNDI"
    }, {
        icao: "PCG",
        callsign: "POSTAL CARGO"
    }, {
        icao: "PCK",
        callsign: "AIRPACK EXPRESS"
    }, {
        icao: "PCS",
        callsign: "AIR PALACE"
    }, {
        icao: "PEL",
        callsign: "PELICAN"
    }, {
        icao: "PEV",
        callsign: "PEOPLES"
    }, {
        icao: "PFI",
        callsign: "PACIFICO CHIHUAHUA"
    }, {
        icao: "PFT",
        callsign: "PROFREIGHT"
    }, {
        icao: "PHR",
        callsign: "PHARAOH"
    }, {
        icao: "PHW",
        callsign: "PHOENIX SHARJAH"
    }, {
        icao: "PIE",
        callsign: "PIRATE"
    }, {
        icao: "PIF",
        callsign: "AEROCALPA"
    }, {
        icao: "PKA",
        callsign: "PAKISTAN AIRWAY"
    }, {
        icao: "PNL",
        callsign: "AEROPERSONAL"
    }, {
        icao: "PNU",
        callsign: "AERO PLATINUM"
    }, {
        icao: "POY",
        callsign: "APOYO AEREO"
    }, {
        icao: "PRT",
        callsign: "PATRIOT"
    }, {
        icao: "PRZ",
        callsign: "RADISAIR"
    }, {
        icao: "PZA",
        callsign: "AEREO PARAZA"
    }, {
        icao: "QCL",
        callsign: "ACLA"
    }, {
        icao: "QAT",
        callsign: "AIR QUASAR"
    }, {
        icao: "QKC",
        callsign: "QUAKER CITY"
    }, {
        icao: "QLA",
        callsign: "QUEBEC LABRADOR"
    }, {
        icao: "QSC",
        callsign: "ZEBRA"
    }, {
        icao: "QUI",
        callsign: "QUIMMCO"
    }, {
        icao: "RAD",
        callsign: "AIR ALADA"
    }, {
        icao: "RAI",
        callsign: "DIASA"
    }, {
        icao: "RAP",
        callsign: "RAPTOR"
    }, {
        icao: "RBE",
        callsign: "RUM BENIN"
    }, {
        icao: "RBJ",
        callsign: "AEROBAJIO"
    }, {
        icao: "RBU",
        callsign: "AIRBUS FRANCE"
    }, {
        icao: "RBV",
        callsign: "AIR ROBERVAL"
    }, {
        icao: "ARU",
        callsign: "ARUBA"
    }, {
        icao: "RCC",
        callsign: "RACER"
    }, {
        icao: "RCE",
        callsign: "AEROCER"
    }, {
        icao: "RCF",
        callsign: "AEROFLOTCARGO"
    }, {
        icao: "RCH",
        callsign: "REACH"
    }, {
        icao: "RCI",
        callsign: "AIR CASSAI"
    }, {
        icao: "RCO",
        callsign: "AEROCOAHUILA"
    }, {
        icao: "RCP",
        callsign: "AEROCORPSA"
    }, {
        icao: "RCQ",
        callsign: "REGIONAL CARGO"
    }, {
        icao: "RCU",
        callsign: "AIR COURIER"
    }, {
        icao: "RCX",
        callsign: "SERVICE CENTER"
    }, {
        icao: "RDM",
        callsign: "AIR ADA"
    }, {
        icao: "REA",
        callsign: "AER ARANN"
    }, {
        icao: "REN",
        callsign: "AERORENT"
    }, {
        icao: "RES",
        callsign: "RESCUE"
    }, {
        icao: "REU",
        callsign: "REUNION"
    }, {
        icao: "REY",
        callsign: "AEROREY"
    }, {
        icao: "RFC",
        callsign: "AERO AFRICA"
    }, {
        icao: "AZP",
        callsign: "GUARANI"
    }, {
        icao: "RFD",
        callsign: "RAFHILER"
    }, {
        icao: "RGO",
        callsign: "ARGOS"
    }, {
        icao: "RGR",
        callsign: "AVIOR REGIONAL"
    }, {
        icao: "RGT",
        callsign: "AIRGOAT"
    }, {
        icao: "RHL",
        callsign: "ARCHIPELS"
    }, {
        icao: "RIF",
        callsign: "INTERMIN AVIA"
    }, {
        icao: "RIS",
        callsign: "AERIS"
    }, {
        icao: "RIT",
        callsign: "ASIAN SPIRIT"
    }, {
        icao: "RJS",
        callsign: "ASERJET"
    }, {
        icao: "RKA",
        callsign: "AIRAFRIC"
    }, {
        icao: "RLA",
        callsign: "AIRLINAIR"
    }, {
        icao: "RLK",
        callsign: "NELSON"
    }, {
        icao: "RLL",
        callsign: "AEROLEONE"
    }, {
        icao: "RLN",
        callsign: "AERO LANKA"
    }, {
        icao: "RLZ",
        callsign: "ALIZE"
    }, {
        icao: "RMD",
        callsign: "AIR AMDER"
    }, {
        icao: "RME",
        callsign: "ARMENIAN"
    }, {
        icao: "RML",
        callsign: "HELLASMED"
    }, {
        icao: "RMO",
        callsign: "ARMAERO"
    }, {
        icao: "RMX",
        callsign: "AEROMAX"
    }, {
        icao: "RNE",
        callsign: "AIR SALONE"
    }, {
        icao: "RNM",
        callsign: "AEROMNEM"
    }, {
        icao: "RNR",
        callsign: "RUNNER"
    }, {
        icao: "RNV",
        callsign: "ARMAVIA"
    }, {
        icao: "ROE",
        callsign: "ESTEBOLIVIA"
    }, {
        icao: "ROH",
        callsign: "AEROGEN"
    }, {
        icao: "ROI",
        callsign: "AVIOR"
    }, {
        icao: "ROL",
        callsign: "AEROEL"
    }, {
        icao: "ROM",
        callsign: "BRAVO QUEBEC"
    }, {
        icao: "ROO",
        callsign: "AEROITALIA"
    }, {
        icao: "ROD",
        callsign: "AERODAN"
    }, {
        icao: "RPB",
        callsign: "AEROREPUBLICA"
    }, {
        icao: "RPC",
        callsign: "AEROPACSA"
    }, {
        icao: "RRC",
        callsign: "AEROROCA"
    }, {
        icao: "RRE",
        callsign: "AERO TORREON"
    }, {
        icao: "RSC",
        callsign: "TARASCAS"
    }, {
        icao: "RSO",
        callsign: "AERO ASIA"
    }, {
        icao: "RSR",
        callsign: "CONGOSERV"
    }, {
        icao: "RSU",
        callsign: "AEROSUR"
    }, {
        icao: "RTE",
        callsign: "LUZAVIA"
    }, {
        icao: "RTH",
        callsign: "ARTHELICO"
    }, {
        icao: "RTO",
        callsign: "ARTOAIR"
    }, {
        icao: "RTQ",
        callsign: "TURQUOISE"
    }, {
        icao: "RTU",
        callsign: "AEROTUCAN"
    }, {
        icao: "RUD",
        callsign: "ANASTASIA"
    }, {
        icao: "RUM",
        callsign: "AIR RUM"
    }, {
        icao: "RVP",
        callsign: "AEROVIP"
    }, {
        icao: "RVT",
        callsign: "AIRVET"
    }, {
        icao: "RWC",
        callsign: "ARROWEC"
    }, {
        icao: "RWY",
        callsign: "TYNWALD"
    }, {
        icao: "RXT",
        callsign: "AEROEXTRA"
    }, {
        icao: "RZL",
        callsign: "AERO ZAMBIA"
    }, {
        icao: "RZN",
        callsign: "ZANO"
    }, {
        icao: "RZZ",
        callsign: "RED ZONE"
    }, {
        icao: "SBH",
        callsign: "AEROSAAB"
    }, {
        icao: "SCD",
        callsign: "ASSOCIATED"
    }, {
        icao: "SCM",
        callsign: "SCREAMER"
    }, {
        icao: "SDO",
        callsign: "AERO DOMINGO"
    }, {
        icao: "SDP",
        callsign: "SUDPACIFICO"
    }, {
        icao: "SEF",
        callsign: "SERVIPACIFICO"
    }, {
        icao: "SER",
        callsign: "AEROCALIFORNIA"
    }, {
        icao: "SGV",
        callsign: "SEGOVIA"
    }, {
        icao: "SHH",
        callsign: "AIRSHARE"
    }, {
        icao: "SIY",
        callsign: "SIYUSA"
    }, {
        icao: "SIZ",
        callsign: "AEROSILZA"
    }, {
        icao: "SJN",
        callsign: "SAN JUAN"
    }, {
        icao: "SKP",
        callsign: "SKIPPER"
    }, {
        icao: "SMI",
        callsign: "SAMI"
    }, {
        icao: "SMJ",
        callsign: "AVAVIA"
    }, {
        icao: "SOD",
        callsign: "ALSOL"
    }, {
        icao: "SOE",
        callsign: "AIR SOLEIL"
    }, {
        icao: "SOG",
        callsign: "AEROSOGA"
    }, {
        icao: "SPD",
        callsign: "SPEEDLINE"
    }, {
        icao: "SPJ",
        callsign: "AIR SKOPJE"
    }, {
        icao: "SPO",
        callsign: "EJECTUIV PACIFICO"
    }, {
        icao: "SPY",
        callsign: "THAI SPACE"
    }, {
        icao: "SPZ",
        callsign: "SPEED SERVICE"
    }, {
        icao: "SQR",
        callsign: "ALSAQER AVIATION"
    }, {
        icao: "SRI",
        callsign: "AIRSAFARI"
    }, {
        icao: "SRV",
        callsign: "SERVICORP"
    }, {
        icao: "SSL",
        callsign: "SIERRA SULTAN"
    }, {
        icao: "SSM",
        callsign: "RAPID"
    }, {
        icao: "SSN",
        callsign: "SUNSTREAM"
    }, {
        icao: "STK",
        callsign: "SAT PAK"
    }, {
        icao: "STT",
        callsign: "PARADISE"
    }, {
        icao: "SUE",
        callsign: "AEROSURESTE"
    }, {
        icao: "SUY",
        callsign: "SURVEY"
    }, {
        icao: "SVK",
        callsign: "SLOVAKIA"
    }, {
        icao: "SYL",
        callsign: "AIR YAKUTIA"
    }, {
        icao: "SYT",
        callsign: "SKYTRACK"
    }, {
        icao: "SZN",
        callsign: "AIR SENEGAL"
    }, {
        icao: "TAA",
        callsign: "AERO COSTA"
    }, {
        icao: "TAO",
        callsign: "TRANSAEROMAR"
    }, {
        icao: "TBL",
        callsign: "AEROTREBOL"
    }, {
        icao: "TBO",
        callsign: "AERO CABOS"
    }, {
        icao: "TCI",
        callsign: "KERRMONT"
    }, {
        icao: "TCO",
        callsign: "TRANSCOLOMBIA"
    }, {
        icao: "TDG",
        callsign: "TURBO DOG"
    }, {
        icao: "TDT",
        callsign: "TRIDENT"
    }, {
        icao: "TDY",
        callsign: "AIR TODAY"
    }, {
        icao: "TED",
        callsign: "AEROAZTECA"
    }, {
        icao: "TIR",
        callsign: "ANTAIR"
    }, {
        icao: "TLD",
        callsign: "AEREO AUTLAN"
    }, {
        icao: "TLE",
        callsign: "AEROUTIL"
    }, {
        icao: "TLU",
        callsign: "AEROTOLUCA"
    }, {
        icao: "TME",
        callsign: "TAXICENTRO"
    }, {
        icao: "TOC",
        callsign: "TROPICMEX"
    }, {
        icao: "TOH",
        callsign: "TOMISKO CARGO"
    }, {
        icao: "TOK",
        callsign: "BALUS"
    }, {
        icao: "TON",
        callsign: "AEROTONALA"
    }, {
        icao: "TPB",
        callsign: "AERO TROPICAL"
    }, {
        icao: "TPC",
        callsign: "AIRCAL"
    }, {
        icao: "TPK",
        callsign: "TCHADHORIZON"
    }, {
        icao: "TPO",
        callsign: "TAXIPOTOSI"
    }, {
        icao: "TQS",
        callsign: "AEROTURQUESA"
    }, {
        icao: "TRH",
        callsign: "TRANSTAR"
    }, {
        icao: "TRS",
        callsign: "CITRUS"
    }, {
        icao: "TSC",
        callsign: "AIR TRANSAT"
    }, {
        icao: "TSQ",
        callsign: "AIRTRA"
    }, {
        icao: "TTB",
        callsign: "AERO TURISTICAS"
    }, {
        icao: "TTE",
        callsign: "TETON"
    }, {
        icao: "TUN",
        callsign: "TUNGARU"
    }, {
        icao: "TWN",
        callsign: "TWINARROW"
    }, {
        icao: "TXD",
        callsign: "TAXI OESTE"
    }, {
        icao: "TXF",
        callsign: "ALFE"
    }, {
        icao: "TXI",
        callsign: "AEREOTAXIS"
    }, {
        icao: "TZA",
        callsign: "AERO TOMZA"
    }, {
        icao: "TZT",
        callsign: "ZAMBEZI"
    }, {
        icao: "UAG",
        callsign: "AFRALINE"
    }, {
        icao: "UAR",
        callsign: "AEROSTAR"
    }, {
        icao: "UCK",
        callsign: "GALETA"
    }, {
        icao: "UGA",
        callsign: "UGANDA"
    }, {
        icao: "UED",
        callsign: "AIR LA"
    }, {
        icao: "UKR",
        callsign: "AIR UKRAINE"
    }, {
        icao: "UMB",
        callsign: "AIR UMBRIA"
    }, {
        icao: "UND",
        callsign: "ATUNEROS UNIDOS"
    }, {
        icao: "USC",
        callsign: "STAR CHECK"
    }, {
        icao: "VNR",
        callsign: "AVANTAIR"
    }, {
        icao: "VTG",
        callsign: "ATACARGO"
    }, {
        icao: "AAJ",
        callsign: "ALFA SUDAN"
    }, {
        icao: "AER",
        callsign: "ACE AIR"
    }, {
        icao: "AAK",
        callsign: "ALASKA ISLAND"
    }, {
        icao: "AAH",
        callsign: "ALOHA"
    }, {
        icao: "AAH",
        callsign: "ALOHA"
    }, {
        icao: "AAL",
        callsign: "AMERICAN"
    }, {
        icao: "AAN",
        callsign: "AMSTEL"
    }, {
        icao: "ABI",
        callsign: "ANAIR"
    }, {
        icao: "DJA",
        callsign: "ANTINEA"
    }, {
        icao: "EDY",
        callsign: "STOBART"
    }, {
        icao: "AAR",
        callsign: "ASIANA"
    }, {
        icao: "ABR",
        callsign: "CONTRACT"
    }, {
        icao: "AAE",
        callsign: "AIR EAST"
    }, {
        icao: "ACP",
        callsign: "ASTRAL CARGO"
    }, {
        icao: "AAP",
        callsign: "ASTRO AIR"
    }, {
        icao: "ATT",
        callsign: "ATTAWASOL AIR"
    }, {
        icao: "XME",
        callsign: "AUSCARGO"
    }, {
        icao: "AUZ",
        callsign: "AUSTRALIAN"
    }, {
        icao: "VAI",
        callsign: "AIR AVALAIR"
    }, {
        icao: "VXP",
        callsign: "AVELO"
    }, {
        icao: "AVE",
        callsign: "AVENSA"
    }, {
        icao: "VRT",
        callsign: "AVERITT"
    }, {
        icao: "VSC",
        callsign: "AVESCA"
    }, {
        icao: "AJF",
        callsign: "AVIACONSULT"
    }, {
        icao: "VTT",
        callsign: "VIATRANSPORT"
    }, {
        icao: "CHP",
        callsign: "AVIACSA"
    }, {
        icao: "AVA",
        callsign: "AVIANCA"
    }, {
        icao: "MCJ",
        callsign: "JETMAC"
    }, {
        icao: "ONE",
        callsign: "OCEAN AIR"
    }, {
        icao: "GLG",
        callsign: "GALAPAGOS"
    }, {
        icao: "XAV",
        callsign: "AVIAPROM"
    }, {
        icao: "AVB",
        callsign: "BEAUPAIR"
    }, {
        icao: "AVQ",
        callsign: "AQUILINE"
    }, {
        icao: "ACJ",
        callsign: "AVICHARTER"
    }, {
        icao: "VSR",
        callsign: "AVIOSTART"
    }, {
        icao: "VLI",
        callsign: "AEROVOLAR"
    }, {
        icao: "VSA",
        callsign: "STARBIRD"
    }, {
        icao: "AZU",
        callsign: "AZUL"
    }, {
        icao: "BBF",
        callsign: "SPEEDCHARTER"
    }, {
        icao: "CFE",
        callsign: "FLYER"
    }, {
        icao: "BRT",
        callsign: "BRITISH"
    }, {
        icao: "EFW",
        callsign: "GRIFFIN"
    }, {
        icao: "BCF",
        callsign: "BACH"
    }, {
        icao: "BOB",
        callsign: "BACKBONE"
    }, {
        icao: "BDR",
        callsign: "BADR AIR"
    }, {
        icao: "BAE",
        callsign: "FELIX"
    }, {
        icao: "BHS",
        callsign: "BAHAMAS"
    }, {
        icao: "BAB",
        callsign: "AWAL"
    }, {
        icao: "BFW",
        callsign: "SUMMAN"
    }, {
        icao: "BXA",
        callsign: "BEXAIR"
    }, {
        icao: "BJA",
        callsign: "BAJA AIR"
    }, {
        icao: "BAJ",
        callsign: "RODEO"
    }, {
        icao: "OGJ",
        callsign: "BAKO AIR"
    }, {
        icao: "BTC",
        callsign: "BASHKIRIAN"
    }, {
        icao: "BEF",
        callsign: "BALEAR EXPRESS"
    }, {
        icao: "BLN",
        callsign: "BIAR"
    }, {
        icao: "BAA",
        callsign: "BALKAN AGRO"
    }, {
        icao: "LAZ",
        callsign: "BALKAN"
    }, {
        icao: "BHI",
        callsign: "SHARIF"
    }, {
        icao: "PNT",
        callsign: "PORTNET"
    }, {
        icao: "BTL",
        callsign: "BALTIA"
    }, {
        icao: "BLL",
        callsign: "BALTIC AIRLINES"
    }, {
        icao: "BLT",
        callsign: "BALTAIR"
    }, {
        icao: "BJC",
        callsign: "BALTIC JET"
    }, {
        icao: "BTH",
        callsign: "BALTIJAS HELICOPTERS"
    }, {
        icao: "CPJ",
        callsign: "CORPJET"
    }, {
        icao: "EAH",
        callsign: "EASTERN"
    }, {
        icao: "BTK",
        callsign: "BALTYKA"
    }, {
        icao: "BAV",
        callsign: "BAMBOO"
    }, {
        icao: "AJC",
        callsign: "BAR HARBOR"
    }, {
        icao: "AUJ",
        callsign: "AUSTROJET"
    }, {
        icao: "CWR",
        callsign: "CITY WORLD"
    }, {
        icao: "BJV",
        callsign: "BEIJING VISTA"
    }, {
        icao: "BHK",
        callsign: "BLUEHAKIN"
    }, {
        icao: "BXJ",
        callsign: "BRIXTEL JET"
    }, {
        icao: "BYG",
        callsign: "BYGONE"
    }, {
        icao: "BBJ",
        callsign: "BLUE KOREA"
    }, {
        icao: "BCJ",
        callsign: "BLUE BOY"
    }, {
        icao: "BNA",
        callsign: "BUN AIR"
    }, {
        icao: "BTN",
        callsign: "BHUTAN AIR"
    }, {
        icao: "BAF",
        callsign: "BELGIAN AIRFORCE"
    }, {
        icao: "BAK",
        callsign: "BLACKHAWK"
    }, {
        icao: "BAL",
        callsign: "BELLEAIR EUROPE"
    }, {
        icao: "BAL",
        callsign: "BRITANNIA"
    }, {
        icao: "BAM",
        callsign: "BUSINESS AIR"
    }, {
        icao: "BAN",
        callsign: "PENGUIN"
    }, {
        icao: "BAR",
        callsign: "BRADLEY"
    }, {
        icao: "BAU",
        callsign: "AIR BISSAU"
    }, {
        icao: "BAV",
        callsign: "BAY AIR"
    }, {
        icao: "BAW",
        callsign: "SPEEDBIRD"
    }, {
        icao: "BAY",
        callsign: "BRAVOAVIANCA"
    }, {
        icao: "BBA",
        callsign: "BANAIR"
    }, {
        icao: "BBC",
        callsign: "BANGLADESH"
    }, {
        icao: "BBD",
        callsign: "BLUE CARGO"
    }, {
        icao: "BBS",
        callsign: "BEIBARS"
    }, {
        icao: "BBV",
        callsign: "BRAVO EUROPE"
    }, {
        icao: "BBW",
        callsign: "BEEBEE AIRWAYS"
    }, {
        icao: "BBZ",
        callsign: "COBRA"
    }, {
        icao: "BCI",
        callsign: "BLUE ISLAND"
    }, {
        icao: "BCR",
        callsign: "BACKER"
    }, {
        icao: "BCT",
        callsign: "BOBCAT"
    }, {
        icao: "BCV",
        callsign: "BUSINESS AVIATION"
    }, {
        icao: "BCY",
        callsign: "CITY JET"
    }, {
        icao: "BDA",
        callsign: "BLUE DART"
    }, {
        icao: "BON",
        callsign: "AIR BOSNA"
    }, {
        icao: "BDF",
        callsign: "BISSAU DISCOVERY"
    }, {
        icao: "AYB",
        callsign: "BELGIAN ARMY"
    }, {
        icao: "BEA",
        callsign: "BEST AIR"
    }, {
        icao: "BED",
        callsign: "BELOGORYE"
    }, {
        icao: "BEH",
        callsign: "BLUECOPTER"
    }, {
        icao: "BEK",
        callsign: "BERKUT"
    }, {
        icao: "BET",
        callsign: "BETA CARGO"
    }, {
        icao: "BFC",
        callsign: "BASLER"
    }, {
        icao: "BFG",
        callsign: "BEARFLIGHT"
    }, {
        icao: "BFL",
        callsign: "BUFFALO"
    }, {
        icao: "BFO",
        callsign: "BOMBARDIER"
    }, {
        icao: "BFR",
        callsign: "BURKLINES"
    }, {
        icao: "BFS",
        callsign: "BUSINESS FLIGHT"
    }, {
        icao: "BGH",
        callsign: "BALKAN HOLIDAYS"
    }, {
        icao: "BGI",
        callsign: "BRITISH GULF"
    }, {
        icao: "BGK",
        callsign: "GULF INTER"
    }, {
        icao: "BGL",
        callsign: "BENIN GOLF"
    }, {
        icao: "BGM",
        callsign: "BUGAVIA"
    }, {
        icao: "BGR",
        callsign: "BUDGET AIR"
    }, {
        icao: "BGT",
        callsign: "BERGEN AIR"
    }, {
        icao: "BHA",
        callsign: "BUDDHA AIR"
    }, {
        icao: "BHL",
        callsign: "BRISTOW"
    }, {
        icao: "BHN",
        callsign: "BRISTOW HELICOPTERS"
    }, {
        icao: "BHO",
        callsign: "BHOJA"
    }, {
        icao: "BHP",
        callsign: "BELAIR"
    }, {
        icao: "BHR",
        callsign: "BIGHORN AIR"
    }, {
        icao: "BHT",
        callsign: "BRIGHTAIR"
    }, {
        icao: "BHY",
        callsign: "BOSPHORUS"
    }, {
        icao: "BID",
        callsign: "BINAIR"
    }, {
        icao: "BIG",
        callsign: "BIG ISLE"
    }, {
        icao: "BIH",
        callsign: "BRINTEL"
    }, {
        icao: "BIL",
        callsign: "BILAIR"
    }, {
        icao: "BIN",
        callsign: "BISONAIR"
    }, {
        icao: "BIO",
        callsign: "BIOFLIGHT"
    }, {
        icao: "BIR",
        callsign: "BIRD AIR"
    }, {
        icao: "BIZ",
        callsign: "BIZZ"
    }, {
        icao: "BJS",
        callsign: "SOLUTION"
    }, {
        icao: "BKA",
        callsign: "BANKAIR"
    }, {
        icao: "BKF",
        callsign: "BAKERFLIGHT"
    }, {
        icao: "BKK",
        callsign: "BLINKAIR"
    }, {
        icao: "BKJ",
        callsign: "BARKEN JET"
    }, {
        icao: "BKP",
        callsign: "BANGKOK AIR"
    }, {
        icao: "BKV",
        callsign: "BUKOVYNA"
    }, {
        icao: "BLB",
        callsign: "BLUEBIRD SUDAN"
    }, {
        icao: "BLC",
        callsign: "BELLESAVIA"
    }, {
        icao: "BLE",
        callsign: "BLUE BERRY"
    }, {
        icao: "BLF",
        callsign: "BLUEFIN"
    }, {
        icao: "BLG",
        callsign: "BELGAVIA"
    }, {
        icao: "BLH",
        callsign: "BLUE HORIZON"
    }, {
        icao: "BLJ",
        callsign: "BLUEWAY"
    }, {
        icao: "BLM",
        callsign: "BLUE ARMENIA"
    }, {
        icao: "BLS",
        callsign: "BEARSKIN"
    }, {
        icao: "BLV",
        callsign: "BELLVIEW AIRLINES"
    }, {
        icao: "BMA",
        callsign: "MIDLAND"
    }, {
        icao: "BMR",
        callsign: "MIDLAND"
    }, {
        icao: "BMD",
        callsign: "BRITISH MEDICAL"
    }, {
        icao: "BME",
        callsign: "BRIGGS"
    }, {
        icao: "BMH",
        callsign: "MASAYU"
    }, {
        icao: "BMI",
        callsign: "BABY"
    }, {
        icao: "BMJ",
        callsign: "BEMIDJI"
    }, {
        icao: "BML",
        callsign: "BISMILLAH"
    }, {
        icao: "BMN",
        callsign: "BOWMAN"
    }, {
        icao: "BMW",
        callsign: "BMWFLIGHT"
    }, {
        icao: "BMX",
        callsign: "BANXICO"
    }, {
        icao: "BND",
        callsign: "BOND"
    }, {
        icao: "BNE",
        callsign: "BENINA AIR"
    }, {
        icao: "BNF",
        callsign: "BRANIFF"
    }, {
        icao: "BNG",
        callsign: "VECTIS"
    }, {
        icao: "BNJ",
        callsign: "JET BELGIUM"
    }, {
        icao: "BNL",
        callsign: "NILE TRADING"
    }, {
        icao: "BNR",
        callsign: "BONAIR"
    }, {
        icao: "BNS",
        callsign: "BANCSTAR"
    }, {
        icao: "BNT",
        callsign: "BENTIU AIR"
    }, {
        icao: "BNV",
        callsign: "BENANE"
    }, {
        icao: "BNW",
        callsign: "BRITISH NORTH"
    }, {
        icao: "BOD",
        callsign: "UGABOND"
    }, {
        icao: "BOA",
        callsign: "KUMANOVO"
    }, {
        icao: "BNZ",
        callsign: "BONZA"
    }, {
        icao: "BOE",
        callsign: "BOEING"
    }, {
        icao: "BOF",
        callsign: "BORDAIR"
    }, {
        icao: "BOO",
        callsign: "BOOKAJET"
    }, {
        icao: "BOU",
        callsign: "BOURAQ"
    }, {
        icao: "BPA",
        callsign: "BLUE PANOROMA"
    }, {
        icao: "BPK",
        callsign: "VENERA"
    }, {
        icao: "BPO",
        callsign: "PIROL"
    }, {
        icao: "BPS",
        callsign: "BASE"
    }, {
        icao: "BPT",
        callsign: "BONUS"
    }, {
        icao: "BRB",
        callsign: "BRATRANSPAEREOS"
    }, {
        icao: "BRD",
        callsign: "BROCK AIR"
    }, {
        icao: "BRE",
        callsign: "AVIABREEZE"
    }, {
        icao: "BRG",
        callsign: "BERING AIR"
    }, {
        icao: "BRK",
        callsign: "BRIANSKAVIA"
    }, {
        icao: "BRN",
        callsign: "BRANSON"
    }, {
        icao: "BRO",
        callsign: "COASTRIDER"
    }, {
        icao: "BRS",
        callsign: "BRAZILIAN AIR FORCE"
    }, {
        icao: "BRT",
        callsign: "BRITISH"
    }, {
        icao: "BRU",
        callsign: "BELARUS AVIA"
    }, {
        icao: "BRV",
        callsign: "BRAVO"
    }, {
        icao: "BRW",
        callsign: "BRIGHT SERVICES"
    }, {
        icao: "BRX",
        callsign: "BUFF EXPRESS"
    }, {
        icao: "BRY",
        callsign: "BURAIR"
    }, {
        icao: "BSC",
        callsign: "BIG SHOT"
    }, {
        icao: "BSD",
        callsign: "AIRLINES STAR"
    }, {
        icao: "BSI",
        callsign: "BRASAIR"
    }, {
        icao: "BSJ",
        callsign: "BLUE SWAN"
    }, {
        icao: "BSS",
        callsign: "BISSAU AIRSYSTEM"
    }, {
        icao: "BST",
        callsign: "TUNCA"
    }, {
        icao: "BSW",
        callsign: "SKY BLUE"
    }, {
        icao: "BSY",
        callsign: "BIG SKY"
    }, {
        icao: "BTI",
        callsign: "AIR BALTIC"
    }, {
        icao: "BTK",
        callsign: "BATIK"
    }, {
        icao: "BTQ",
        callsign: "BOUTIQUE"
    }, {
        icao: "BTR",
        callsign: "BOTIRAVIA"
    }, {
        icao: "BTT",
        callsign: "BEETEESLAVUTA"
    }, {
        icao: "BTV",
        callsign: "BATAVIA"
    }, {
        icao: "BTZ",
        callsign: "BRISTOW"
    }, {
        icao: "BUC",
        callsign: "BULGARIAN CHARTER"
    }, {
        icao: "BUL",
        callsign: "BLUE AIRLINES"
    }, {
        icao: "BUN",
        callsign: "BURAL"
    }, {
        icao: "BUZ",
        callsign: "BUZZ"
    }, {
        icao: "BVA",
        callsign: "BUFFALO AIR"
    }, {
        icao: "BVC",
        callsign: "BULGARIAN WINGS"
    }, {
        icao: "BVN",
        callsign: "SHOWME"
    }, {
        icao: "BVT",
        callsign: "BERJAYA"
    }, {
        icao: "BVU",
        callsign: "BELLVIEW AIRLINES"
    }, {
        icao: "BWD",
        callsign: "BLUEWEST"
    }, {
        icao: "BWG",
        callsign: "BLUE WINGS"
    }, {
        icao: "BWI",
        callsign: "BLUE TAIL"
    }, {
        icao: "BWL",
        callsign: "BRITWORLD"
    }, {
        icao: "BXH",
        callsign: "PALLISER"
    }, {
        icao: "BXI",
        callsign: "XENIA"
    }, {
        icao: "BYA",
        callsign: "BERRY"
    }, {
        icao: "BYC",
        callsign: "BAYON AIR"
    }, {
        icao: "BYF",
        callsign: "BAY FLIGHT"
    }, {
        icao: "BYL",
        callsign: "BYLINA"
    }, {
        icao: "BYE",
        callsign: "BAYU"
    }, {
        icao: "BZA",
        callsign: "BERLIN BEAR"
    }, {
        icao: "BZH",
        callsign: "BRITAIR"
    }, {
        icao: "BZZ",
        callsign: "BUZZARD"
    }, {
        icao: "CBJ",
        callsign: "CAPITAL JET"
    }, {
        icao: "CKM",
        callsign: "COSMOS"
    }, {
        icao: "CLF",
        callsign: "CLIFTON"
    }, {
        icao: "CLN",
        callsign: "SEELINE"
    }, {
        icao: "CXS",
        callsign: "CLIPPER CONNECTION"
    }, {
        icao: "BEL",
        callsign: "BEELINE"
    }, {
        icao: "EBA",
        callsign: "BOND AVIATION"
    }, {
        icao: "EXB",
        callsign: "BRAZILIAN ARMY"
    }, {
        icao: "EXP",
        callsign: "EXPRESS AIR"
    }, {
        icao: "GAA",
        callsign: "BIZEX"
    }, {
        icao: "HAW",
        callsign: "THAI HAWK"
    }, {
        icao: "HAX",
        callsign: "SCOOP"
    }, {
        icao: "IBB",
        callsign: "BINTER"
    }, {
        icao: "IRJ",
        callsign: "BONYAD AIR"
    }, {
        icao: "IVR",
        callsign: "RERUN"
    }, {
        icao: "BLA",
        callsign: "BLUE AIR"
    }, {
        icao: "LAJ",
        callsign: "BEE MED"
    }, {
        icao: "LBY",
        callsign: "ALBANBELLE"
    }, {
        icao: "LED",
        callsign: "SWEEPER"
    }, {
        icao: "LTL",
        callsign: "LITTORAL"
    }, {
        icao: "LXJ",
        callsign: "FLEXJET"
    }, {
        icao: "LZB",
        callsign: "FLYING BULGARIA"
    }, {
        icao: "MBR",
        callsign: "BRAZILIAN NAVY"
    }, {
        icao: "NKF",
        callsign: "NORDFLIGHT"
    }, {
        icao: "NYB",
        callsign: "BELGIAN NAVY"
    }, {
        icao: "OTA",
        callsign: "OUTLAW"
    }, {
        icao: "OUF",
        callsign: "ELEMENT"
    }, {
        icao: "PEB",
        callsign: "PALEMA"
    }, {
        icao: "POI",
        callsign: "BOJBAN"
    }, {
        icao: "PPS",
        callsign: "PIPESTONE"
    }, {
        icao: "PVO",
        callsign: "PROVOST"
    }, {
        icao: "RHD",
        callsign: "RED HEAD"
    }, {
        icao: "RLR",
        callsign: "RATTLER"
    }, {
        icao: "RRS",
        callsign: "BLACKBOX"
    }, {
        icao: "SCJ",
        callsign: "SCANJET"
    }, {
        icao: "SHT",
        callsign: "SHUTTLE"
    }, {
        icao: "SKH",
        callsign: "SKYNEWS"
    }, {
        icao: "TBL",
        callsign: "TELCO"
    }, {
        icao: "TXB",
        callsign: "TEXTRON"
    }, {
        icao: "UKA",
        callsign: "UKAY"
    }, {
        icao: "VLX",
        callsign: "AVOLAR"
    }, {
        icao: "VOL",
        callsign: "BLUE SPEED"
    }, {
        icao: "WFD",
        callsign: "AVRO"
    }, {
        icao: "WTN",
        callsign: "TARNISH"
    }, {
        icao: "XMS",
        callsign: "SANTA"
    }, {
        icao: "ZBA",
        callsign: "BOSKY"
    }, {
        icao: "JMP",
        callsign: "JUMP RUN"
    }, {
        icao: "BOV",
        callsign: "BOLIVIANA"
    }, {
        icao: "BRJ",
        callsign: "BORA JET"
    }, {
        icao: "MXY",
        callsign: "MOXY"
    }, {
        icao: "LHX",
        callsign: "CITYAIR"
    }, {
        icao: "SRJ",
        callsign: "SYRJET"
    }, {
        icao: "TIP",
        callsign: "TRANSPAC"
    }, {
        icao: "ORO",
        callsign: "CAPRI"
    }, {
        icao: "RWG",
        callsign: "RED WING"
    }, {
        icao: "RMU",
        callsign: "AIRMAUR"
    }, {
        icao: "CJZ",
        callsign: "CALIBER JET"
    }, {
        icao: "DYN",
        callsign: "AERODYNAMICS"
    }, {
        icao: "CRC",
        callsign: "CAMAIRCO"
    }, {
        icao: "QAI",
        callsign: "CHICKPEA"
    }, {
        icao: "CBH",
        callsign: "CLUB HOUSE"
    }, {
        icao: "CRF",
        callsign: "CROIX ROUGE"
    }, {
        icao: "CAA",
        callsign: "INSPECTOR"
    }, {
        icao: "BKR",
        callsign: "BOX KAR"
    }, {
        icao: "AWX",
        callsign: "ALLWEATHER"
    }, {
        icao: "BBN",
        callsign: "BRABAZON"
    }, {
        icao: "ATQ",
        callsign: "COLIBRI"
    }, {
        icao: "APL",
        callsign: "AEREO PRINCIPAL"
    }, {
        icao: "AIO",
        callsign: "AIR CHIEF"
    }, {
        icao: "AID",
        callsign: "CENTURY AIRBIRD"
    }, {
        icao: "SMW",
        callsign: "SMART WINGS"
    }, {
        icao: "CCL",
        callsign: "ANGKOR WAT"
    }, {
        icao: "KME",
        callsign: "GIANT IBIS"
    }, {
        icao: "CCB",
        callsign: "DOLPHIN"
    }, {
        icao: "CYH",
        callsign: "YUHAO"
    }, {
        icao: "CFB",
        callsign: "FOREBASE"
    }, {
        icao: "XCA",
        callsign: "COLT"
    }, {
        icao: "GCY",
        callsign: "HELIBIRD"
    }, {
        icao: "AUN",
        callsign: "COMMON SKY"
    }, {
        icao: "CBI",
        callsign: "CABI"
    }, {
        icao: "CPI",
        callsign: "AIRCAI"
    }, {
        icao: "ICL",
        callsign: "CAL"
    }, {
        icao: "CMR",
        callsign: "CAMEO"
    }, {
        icao: "CTZ",
        callsign: "CATA"
    }, {
        icao: "CCF",
        callsign: "TOMCAT"
    }, {
        icao: "CED",
        callsign: "CEDTA"
    }, {
        icao: "HBI",
        callsign: "HELIBIRD"
    }, {
        icao: "HEM",
        callsign: "HEMS"
    }, {
        icao: "SCH",
        callsign: "SCHREINER"
    }, {
        icao: "HKS",
        callsign: "HELIBUS"
    }, {
        icao: "VCI",
        callsign: "CITOURS"
    }, {
        icao: "CMZ",
        callsign: "CEEEM STAIRS"
    }, {
        icao: "CNT",
        callsign: "KNET"
    }, {
        icao: "OAP",
        callsign: "COAPA"
    }, {
        icao: "PDR",
        callsign: "SPEEDSTER"
    }, {
        icao: "CRH",
        callsign: "HELIMEX"
    }, {
        icao: "IRO",
        callsign: "IRON AIR"
    }, {
        icao: "CSE",
        callsign: "OXFORD"
    }, {
        icao: "CTQ",
        callsign: "CITYLINK"
    }, {
        icao: "CBR",
        callsign: "CABAIR"
    }, {
        icao: "CVE",
        callsign: "KABEX"
    }, {
        icao: "CWD",
        callsign: "AMBASSADOR"
    }, {
        icao: "CXE",
        callsign: "CAICOS"
    }, {
        icao: "CGC",
        callsign: "CALGULF"
    }, {
        icao: "REZ",
        callsign: "CAL AIR"
    }, {
        icao: "CSL",
        callsign: "CALIFORNIA SHUTTLE"
    }, {
        icao: "CMV",
        callsign: "CALIMA"
    }, {
        icao: "CAV",
        callsign: "CALM AIR"
    }, {
        icao: "CAM",
        callsign: "AIR CAMAI"
    }, {
        icao: "KHV",
        callsign: "ANGKOR AIR"
    }, {
        icao: "UYC",
        callsign: "CAMAIR"
    }, {
        icao: "HSO",
        callsign: "HELIASTURIAS"
    }, {
        icao: "CJA",
        callsign: "CANJET"
    }, {
        icao: "PIL",
        callsign: "PINNACLE"
    }, {
        icao: "CDN",
        callsign: "CANADIAN"
    }, {
        icao: "CTG",
        callsign: "CANADIAN COAST GUARD"
    }, {
        icao: "HIA",
        callsign: "HAIDA"
    }, {
        icao: "CFC",
        callsign: "CANFORCE"
    }, {
        icao: "BZD",
        callsign: "BLIZZARD"
    }, {
        icao: "CDN",
        callsign: "CANADIAN"
    }, {
        icao: "TKR",
        callsign: "TANKER"
    }, {
        icao: "AKT",
        callsign: "ARCTIC"
    }, {
        icao: "CPC",
        callsign: "EMPRESS"
    }, {
        icao: "CDR",
        callsign: "CANADIAN REGIONAL"
    }, {
        icao: "CWH",
        callsign: "WARPLANE HERITAGE"
    }, {
        icao: "CWA",
        callsign: "CANADIAN WESTERN"
    }, {
        icao: "CWW",
        callsign: "CANAIR"
    }, {
        icao: "CUI",
        callsign: "CANAIR"
    }, {
        icao: "KAP",
        callsign: "CAIR"
    }, {
        icao: "SEM",
        callsign: "SEMO"
    }, {
        icao: "CMY",
        callsign: "CAPE SMYTHE AIR"
    }, {
        icao: "CPX",
        callsign: "CAPAIR"
    }, {
        icao: "CPD",
        callsign: "CAPITAL DELTA"
    }, {
        icao: "NCP",
        callsign: "CAPITAL SHUTTLE"
    }, {
        icao: "CCI",
        callsign: "CAPPY"
    }, {
        icao: "CCQ",
        callsign: "CAP CITY"
    }, {
        icao: "EGL",
        callsign: "PRESTIGE"
    }, {
        icao: "CEX",
        callsign: "CAPITOL EXPRESS"
    }, {
        icao: "CWZ",
        callsign: "CAPWINGS"
    }, {
        icao: "VAN",
        callsign: "CAMEL"
    }, {
        icao: "CWN",
        callsign: "CAMBRIAN"
    }, {
        icao: "FVA",
        callsign: "AIR VIRGINIA"
    }, {
        icao: "GOL",
        callsign: "CARGOLAAR"
    }, {
        icao: "CDI",
        callsign: "CARDS"
    }, {
        icao: "CFH",
        callsign: "CARE FLIGHT"
    }, {
        icao: "CDM",
        callsign: "CARGA AEREA"
    }, {
        icao: "EST",
        callsign: "CARGAINTER"
    }, {
        icao: "GGC",
        callsign: "LONGHAUL"
    }, {
        icao: "MCX",
        callsign: "MAURICARGO"
    }, {
        icao: "CRV",
        callsign: "CARGOIV"
    }, {
        icao: "CLM",
        callsign: "CARGO LINK"
    }, {
        icao: "CLU",
        callsign: "FIREBIRD"
    }, {
        icao: "CTW",
        callsign: "THIRD CARGO"
    }, {
        icao: "CRG",
        callsign: "WHITE PELICAN"
    }, {
        icao: "CJT",
        callsign: "CARGOJET"
    }, {
        icao: "CLX",
        callsign: "CARGOLUX"
    }, {
        icao: "ICV",
        callsign: "CARGO MED"
    }, {
        icao: "CGM",
        callsign: "HOTEL CHARLIE"
    }, {
        icao: "DEL",
        callsign: "RED TAIL"
    }, {
        icao: "BCB",
        callsign: "WAVEBIRD"
    }, {
        icao: "PWD",
        callsign: "CARIBAIR"
    }, {
        icao: "DCC",
        callsign: "CARICARGO"
    }, {
        icao: "CLT",
        callsign: "CARIBBEAN"
    }, {
        icao: "BWA",
        callsign: "CARIBBEAN"
    }, {
        icao: "IQQ",
        callsign: "CARIBJET"
    }, {
        icao: "CSX",
        callsign: "CHOICE AIR"
    }, {
        icao: "TLC",
        callsign: "CARIBX"
    }, {
        icao: "GFI",
        callsign: "CARIB STAR"
    }, {
        icao: "CRB",
        callsign: "CARIBBEAN COMMUTER"
    }, {
        icao: "CRT",
        callsign: "CARIBINTAIR"
    }, {
        icao: "CVG",
        callsign: "CARILL"
    }, {
        icao: "KRP",
        callsign: "CARPATAIR"
    }, {
        icao: "CRR",
        callsign: "CARRANZA"
    }, {
        icao: "ULS",
        callsign: "ULSTER"
    }, {
        icao: "CMT",
        callsign: "CASEMENT"
    }, {
        icao: "CSO",
        callsign: "CASAIR"
    }, {
        icao: "CSP",
        callsign: "CASPER AIR"
    }, {
        icao: "CPN",
        callsign: "CASPIAN"
    }, {
        icao: "CSJ",
        callsign: "CASTLE"
    }, {
        icao: "CAZ",
        callsign: "EUROCAT"
    }, {
        icao: "CBT",
        callsign: "CATALINA AIR"
    }, {
        icao: "TEX",
        callsign: "CATEX"
    }, {
        icao: "HDA",
        callsign: "DRAGON"
    }, {
        icao: "CPA",
        callsign: "CATHAY"
    }, {
        icao: "CJR",
        callsign: "CAVERTON AIR"
    }, {
        icao: "CAY",
        callsign: "CAYMAN"
    }, {
        icao: "CEB",
        callsign: "CEBU"
    }, {
        icao: "CIL",
        callsign: "CECIL"
    }, {
        icao: "CEG",
        callsign: "CEGA"
    }, {
        icao: "CEC",
        callsign: "CELTAIR"
    }, {
        icao: "CWE",
        callsign: "CELTIC"
    }, {
        icao: "CEV",
        callsign: "CENTEV"
    }, {
        icao: "CNL",
        callsign: "WYOAIR"
    }, {
        icao: "CNS",
        callsign: "CHRONOS"
    }, {
        icao: "CVO",
        callsign: "CENTERVOL"
    }, {
        icao: "CTS",
        callsign: "CENTERSOUTH"
    }, {
        icao: "CET",
        callsign: "CENTRAFRICAIN"
    }, {
        icao: "CAX",
        callsign: "CENTRAL EXPRESS"
    }, {
        icao: "CTL",
        callsign: "CENTRAL COMMUTER"
    }, {
        icao: "CNY",
        callsign: "CENTRAL LEONE"
    }, {
        icao: "ACN",
        callsign: "AEROCENTRO"
    }, {
        icao: "YOG",
        callsign: "YOGAN AIR"
    }, {
        icao: "DRN",
        callsign: "DISCOS REYNOSA"
    }, {
        icao: "CMA",
        callsign: "FRENCH CARGO"
    }, {
        icao: "CHA",
        callsign: "CHARTER CENTRAL"
    }, {
        icao: "CEM",
        callsign: "CENTRAL MONGOLIA"
    }, {
        icao: "GLR",
        callsign: "GLACIER"
    }, {
        icao: "CSI",
        callsign: "SKYPORT"
    }, {
        icao: "CLW",
        callsign: "CENTRALWINGS"
    }, {
        icao: "DTV",
        callsign: "DUTCH VALLEY"
    }, {
        icao: "CGS",
        callsign: "GEO CENTRE"
    }, {
        icao: "CVC",
        callsign: "AVIACENTRE"
    }, {
        icao: "CCV",
        callsign: "HELICORPORATIVO"
    }, {
        icao: "ACF",
        callsign: "FORCAN"
    }, {
        icao: "CWC",
        callsign: "CHALLENGE CARGO"
    }, {
        icao: "URY",
        callsign: "CENTURY AVIA"
    }, {
        icao: "CER",
        callsign: "CETRACA"
    }, {
        icao: "IRU",
        callsign: "CHABAHAR"
    }, {
        icao: "GSW",
        callsign: "EIGER"
    }, {
        icao: "CLG",
        callsign: "CHALLAIR"
    }, {
        icao: "CHK",
        callsign: "CHALKS"
    }, {
        icao: "CLS",
        callsign: "AIRISTO"
    }, {
        icao: "CHS",
        callsign: "CHALLENGE AVIATION"
    }, {
        icao: "OFF",
        callsign: "CHALLENGE AIR"
    }, {
        icao: "CHG",
        callsign: "CHALLENGE"
    }, {
        icao: "CPH",
        callsign: "CHAMPAGNE"
    }, {
        icao: "CCP",
        callsign: "CHAMPION AIR"
    }, {
        icao: "NCH",
        callsign: "CHANCHANGI"
    }, {
        icao: "CGN",
        callsign: "CHANGAN"
    }, {
        icao: "CHN",
        callsign: "CHANNEL"
    }, {
        icao: "WML",
        callsign: "MARLIN"
    }, {
        icao: "CPL",
        callsign: "CHAPARRAL"
    }, {
        icao: "CSU",
        callsign: "CHARI SERVICE"
    }, {
        icao: "CAH",
        callsign: "CHARLAN"
    }, {
        icao: "HMD",
        callsign: "HAMMOND"
    }, {
        icao: "CHW",
        callsign: "CHARTER WIEN"
    }, {
        icao: "HRT",
        callsign: "CHARTRIGHT"
    }, {
        icao: "CHQ",
        callsign: "CHAUTAUQUA"
    }, {
        icao: "CBB",
        callsign: "CHEBAIR"
    }, {
        icao: "CHZ",
        callsign: "CHERL"
    }, {
        icao: "CMK",
        callsign: "CHERAVIA"
    }, {
        icao: "CBM",
        callsign: "BLUE MAX"
    }, {
        icao: "CCY",
        callsign: "CHERRY"
    }, {
        icao: "CAB",
        callsign: "CHESAPEAKE AIR"
    }, {
        icao: "CVR",
        callsign: "CHEVRON"
    }, {
        icao: "CYA",
        callsign: "CHEYENNE AIR"
    }, {
        icao: "CGO",
        callsign: "WILD ONION"
    }, {
        icao: "WDY",
        callsign: "WINDY CITY"
    }, {
        icao: "RAT",
        callsign: "RIVERRAT"
    }, {
        icao: "CCH",
        callsign: "CHILCHOTA"
    }, {
        icao: "DES",
        callsign: "CHILCOTIN"
    }, {
        icao: "CAD",
        callsign: "CHILLIWACKAIR"
    }, {
        icao: "ETN",
        callsign: "CHIMNIR"
    }, {
        icao: "CAL",
        callsign: "DYNASTY"
    }, {
        icao: "CKK",
        callsign: "CARGO KING"
    }, {
        icao: "CES",
        callsign: "CHINA EASTERN"
    }, {
        icao: "HXA",
        callsign: "CHINA EXPRESS"
    }, {
        icao: "CFA",
        callsign: "FEILONG"
    }, {
        icao: "CTH",
        callsign: "TONGHANG"
    }, {
        icao: "CAG",
        callsign: "CHINA NATIONAL"
    }, {
        icao: "CBF",
        callsign: "CHINA NORTHERN"
    }, {
        icao: "CNW",
        callsign: "CHINA NORTHWEST"
    }, {
        icao: "CHC",
        callsign: "CHINA HELICOPTER"
    }, {
        icao: "CYZ",
        callsign: "CHINA POST"
    }, {
        icao: "CSN",
        callsign: "CHINA SOUTHERN"
    }, {
        icao: "CXN",
        callsign: "CHINA SOUTHWEST"
    }, {
        icao: "CUA",
        callsign: "LIANHANG"
    }, {
        icao: "CXH",
        callsign: "XINHUA"
    }, {
        icao: "CYH",
        callsign: "YUNNAN"
    }, {
        icao: "CGU",
        callsign: "CHINGUETTI"
    }, {
        icao: "CEP",
        callsign: "CHIPOLA"
    }, {
        icao: "CPW",
        callsign: "CHIPPEWAAIR"
    }, {
        icao: "CHF",
        callsign: "CHITA"
    }, {
        icao: "CQN",
        callsign: "CHONG QING"
    }, {
        icao: "CAS",
        callsign: "CHRISTMAN"
    }, {
        icao: "OEC",
        callsign: "CHRISTOPHORUS"
    }, {
        icao: "CHO",
        callsign: "CHROME AIR"
    }, {
        icao: "CHU",
        callsign: "CHURCHAIR"
    }, {
        icao: "CIU",
        callsign: "CIELOS"
    }, {
        icao: "CIM",
        callsign: "CIMBER"
    }, {
        icao: "CIN",
        callsign: "CINNAMON"
    }, {
        icao: "RRU",
        callsign: "HELICIRRUS"
    }, {
        icao: "NTS",
        callsign: "NITE STAR"
    }, {
        icao: "RUS",
        callsign: "CIRRUS AIR"
    }, {
        icao: "FIV",
        callsign: "FIVE STAR"
    }, {
        icao: "HZX",
        callsign: "ZHONGXIN"
    }, {
        icao: "SDR",
        callsign: "SWEDESTAR"
    }, {
        icao: "CIX",
        callsign: "CONNEXION"
    }, {
        icao: "BCY",
        callsign: "CITYIRELAND"
    }, {
        icao: "CAQ",
        callsign: "AIR CHESTER"
    }, {
        icao: "CII",
        callsign: "CITYFLY"
    }, {
        icao: "CFE",
        callsign: "FLYER"
    }, {
        icao: "CNB",
        callsign: "CITYHUN"
    }, {
        icao: "HSR",
        callsign: "HOOSIER"
    }, {
        icao: "CIW",
        callsign: "CIVFLIGHT"
    }, {
        icao: "CAP",
        callsign: "CAP"
    }, {
        icao: "CAT",
        callsign: "MANDARIN"
    }, {
        icao: "CIA",
        callsign: "CALIMERA"
    }, {
        icao: "CIV",
        callsign: "CIVAIR"
    }, {
        icao: "CBA",
        callsign: "CALIBRA"
    }, {
        icao: "FMC",
        callsign: "CLAESSENS"
    }, {
        icao: "CLK",
        callsign: "CLARKAIR"
    }, {
        icao: "CSF",
        callsign: "CALEDONIAN"
    }, {
        icao: "CLY",
        callsign: "CLAYLACY"
    }, {
        icao: "CGK",
        callsign: "CLICK AIR"
    }, {
        icao: "CLZ",
        callsign: "CLOUDLINE"
    }, {
        icao: "CLD",
        callsign: "CLOWES"
    }, {
        icao: "SDJ",
        callsign: "SPACEJET"
    }, {
        icao: "ISG",
        callsign: "CLUBAIR"
    }, {
        icao: "CST",
        callsign: "COAST CENTER"
    }, {
        icao: "TCL",
        callsign: "TRANS COASTAL"
    }, {
        icao: "CNG",
        callsign: "SIDAIR"
    }, {
        icao: "CSV",
        callsign: "COASTAL TRAVEL"
    }, {
        icao: "CHL",
        callsign: "COHLMIA"
    }, {
        icao: "OLR",
        callsign: "COLAEREOS"
    }, {
        icao: "CLE",
        callsign: "COLEMILL"
    }, {
        icao: "CJC",
        callsign: "COLGAN"
    }, {
        icao: "CAE",
        callsign: "HUMMINGBIRD"
    }, {
        icao: "WCO",
        callsign: "COLUMBIA HELI"
    }, {
        icao: "KLR",
        callsign: "KAYLER"
    }, {
        icao: "GHP",
        callsign: "GRASSHOPPER EX"
    }, {
        icao: "COM",
        callsign: "COMAIR"
    }, {
        icao: "CAW",
        callsign: "COMMERCIAL"
    }, {
        icao: "GCM",
        callsign: "GLOBECOM"
    }, {
        icao: "CDE",
        callsign: "COMEX"
    }, {
        icao: "CVV",
        callsign: "COMERAVIA"
    }, {
        icao: "CRS",
        callsign: "COMERCIAL AEREA"
    }, {
        icao: "CMG",
        callsign: "SUNSPY"
    }, {
        icao: "FYN",
        callsign: "FLYNN"
    }, {
        icao: "CMJ",
        callsign: "COMFORT JET"
    }, {
        icao: "CLA",
        callsign: "COMLUX"
    }, {
        icao: "KAZ",
        callsign: "KAZLUX"
    }, {
        icao: "MLM",
        callsign: "LUXMALTA"
    }, {
        icao: "CXB",
        callsign: "STARLUX"
    }, {
        icao: "CMH",
        callsign: "COMMODORE"
    }, {
        icao: "CTM",
        callsign: "COTAM"
    }, {
        icao: "CML",
        callsign: "COMMANDAIR"
    }, {
        icao: "CRM",
        callsign: "COMMANDERMEX"
    }, {
        icao: "CME",
        callsign: "COMMERCE BANK"
    }, {
        icao: "CMS",
        callsign: "ACCESS"
    }, {
        icao: "CJS",
        callsign: "COMMONWEALTH"
    }, {
        icao: "UCA",
        callsign: "COMMUTAIR"
    }, {
        icao: "CWK",
        callsign: "CONTICOM"
    }, {
        icao: "CGR",
        callsign: "COMPRIP"
    }, {
        icao: "CMM",
        callsign: "CAMALI"
    }, {
        icao: "GIC",
        callsign: "CEBEGE"
    }, {
        icao: "ATF",
        callsign: "AEROTECNICAS"
    }, {
        icao: "LCT",
        callsign: "STELLAIR"
    }, {
        icao: "EJV",
        callsign: "EJECUTIVA"
    }, {
        icao: "HSE",
        callsign: "HELISURESTE"
    }, {
        icao: "MDR",
        callsign: "AEROPLANOS"
    }, {
        icao: "HSS",
        callsign: "TAS HELICOPTEROS"
    }, {
        icao: "TAV",
        callsign: "TAVISA"
    }, {
        icao: "CYF",
        callsign: "COMPANY FLIGHT"
    }, {
        icao: "CPZ",
        callsign: "COMPASS ROSE"
    }, {
        icao: "CPS",
        callsign: "COMPASS"
    }, {
        icao: "CRC",
        callsign: "CONAIRCANADA"
    }, {
        icao: "COD",
        callsign: "CONCORDAVIA"
    }, {
        icao: "CNR",
        callsign: "CONAERO"
    }, {
        icao: "CIB",
        callsign: "CONDOR BERLIN"
    }, {
        icao: "CFG",
        callsign: "CONDOR"
    }, {
        icao: "COF",
        callsign: "CONFORT"
    }, {
        icao: "CGA",
        callsign: "CONGRESSIONAL"
    }, {
        icao: "CCT",
        callsign: "CONNECT"
    }, {
        icao: "BSN",
        callsign: "BASTION"
    }, {
        icao: "CAC",
        callsign: "CONQUEST AIR"
    }, {
        icao: "CXO",
        callsign: "CONROE AIR"
    }, {
        icao: "VCH",
        callsign: "CONSORCIO HELITEC"
    }, {
        icao: "UZA",
        callsign: "CONSTANTA"
    }, {
        icao: "KIS",
        callsign: "CONTACTAIR"
    }, {
        icao: "COA",
        callsign: "CONTINENTAL"
    }, {
        icao: "CMI",
        callsign: "AIR MIKE"
    }, {
        icao: "CON",
        callsign: "CONOCO"
    }, {
        icao: "CS",
        callsign: "CAMBRIAN"
    }, {
        icao: "VCV",
        callsign: "CONVIASA"
    }, {
        icao: "CKA",
        callsign: "COOKAIR"
    }, {
        icao: "SVY",
        callsign: "SURVEYOR"
    }, {
        icao: "CMP",
        callsign: "COPA"
    }, {
        icao: "CAT",
        callsign: "AIRCAT"
    }, {
        icao: "COP",
        callsign: "COPPER STATE"
    }, {
        icao: "AAQ",
        callsign: "COPTERLINE"
    }, {
        icao: "CCW",
        callsign: "CENTRAL CHARTER"
    }, {
        icao: "CAI",
        callsign: "CORENDON"
    }, {
        icao: "CND",
        callsign: "DUTCH CORENDON"
    }, {
        icao: "CRA",
        callsign: "CORAL"
    }, {
        icao: "CPB",
        callsign: "PENTA"
    }, {
        icao: "CNC",
        callsign: "CENCOR"
    }, {
        icao: "CPG",
        callsign: "CORPORANG"
    }, {
        icao: "CPT",
        callsign: "AIR SPUR"
    }, {
        icao: "CPR",
        callsign: "CORPAIR"
    }, {
        icao: "CPO",
        callsign: "MOKAN"
    }, {
        icao: "COO",
        callsign: "CORPORATE"
    }, {
        icao: "CKE",
        callsign: "CHECKMATE"
    }, {
        icao: "VHT",
        callsign: "VEGAS HEAT"
    }, {
        icao: "VTE",
        callsign: "VOLUNTEER"
    }, {
        icao: "CJI",
        callsign: "SEA JET"
    }, {
        icao: "CRL",
        callsign: "CORSAIR"
    }, {
        icao: "CCM",
        callsign: "CORSICA"
    }, {
        icao: "COZ",
        callsign: "COSMIC AIR"
    }, {
        icao: "COT",
        callsign: "COAIR"
    }, {
        icao: "CHI",
        callsign: "COUGAR"
    }, {
        icao: "MGB",
        callsign: "MOCKINGBIRD"
    }, {
        icao: "CIK",
        callsign: "COUNTRY AIR"
    }, {
        icao: "CSD",
        callsign: "DELIVERY"
    }, {
        icao: "CUT",
        callsign: "COURT AIR"
    }, {
        icao: "OU",
        callsign: "COURTLINE"
    }, {
        icao: "CVL",
        callsign: "COVAL"
    }, {
        icao: "COW",
        callsign: "COWI"
    }, {
        icao: "COY",
        callsign: "COYNE AIR"
    }, {
        icao: "CFD",
        callsign: "AERONAUT"
    }, {
        icao: "CRE",
        callsign: "CREE AIR"
    }, {
        icao: "ELM",
        callsign: "CRELAM"
    }, {
        icao: "CAN",
        callsign: "CREST"
    }, {
        icao: "KRM",
        callsign: "TRANS UNIVERSAL"
    }, {
        icao: "CTN",
        callsign: "CROATIA"
    }, {
        icao: "HRZ",
        callsign: "CROATIAN AIRFORCE"
    }, {
        icao: "CRX",
        callsign: "CROSSAIR"
    }, {
        icao: "ECC",
        callsign: "CIGOGNE"
    }, {
        icao: "CWX",
        callsign: "CROW EXPRESS"
    }, {
        icao: "CKR",
        callsign: "CROWN AIR"
    }, {
        icao: "CRO",
        callsign: "CROWN AIRWAYS"
    }, {
        icao: "CRW",
        callsign: "REGAL"
    }, {
        icao: "VCR",
        callsign: "VOE CRUISER"
    }, {
        icao: "CTY",
        callsign: "CENTURY"
    }, {
        icao: "CYT",
        callsign: "CRYSTALAIR"
    }, {
        icao: "IRO",
        callsign: "IRON AIR"
    }, {
        icao: "CUB",
        callsign: "CUBANA"
    }, {
        icao: "CTF",
        callsign: "CUTTER FLIGHT"
    }, {
        icao: "CBL",
        callsign: "CUMBERLAND"
    }, {
        icao: "CTT",
        callsign: "CATT"
    }, {
        icao: "RGN",
        callsign: "CYGNUS AIR"
    }, {
        icao: "CYC",
        callsign: "CYPRAIR"
    }, {
        icao: "CYS",
        callsign: "SKYBIRD"
    }, {
        icao: "CYP",
        callsign: "CYPRUS"
    }, {
        icao: "KYV",
        callsign: "AIRKIBRIS"
    }, {
        icao: "CEF",
        callsign: "CZECH AIR FORCE"
    }, {
        icao: "AHD",
        callsign: "AIRHANDLING"
    }, {
        icao: "CSA",
        callsign: "CSALINES"
    }, {
        icao: "CIE",
        callsign: "CZECH REPUBLIC"
    }, {
        icao: "HNL",
        callsign: "MAPLELEAF"
    }, {
        icao: "KEM",
        callsign: "CEMAIR"
    }, {
        icao: "JLH",
        callsign: "CESA"
    }, {
        icao: "FCB",
        callsign: "NEW AGE"
    }, {
        icao: "CVK",
        callsign: "CARGO LINE"
    }, {
        icao: "CLI",
        callsign: "CLICKJET"
    }, {
        icao: "CHB",
        callsign: "WEST CHINA"
    }, {
        icao: "CRN",
        callsign: "CARSON"
    }, {
        icao: "ABA",
        callsign: "AEROBETA"
    }, {
        icao: "DJT",
        callsign: "DREAMJET"
    }, {
        icao: "DPJ",
        callsign: "JET CARD"
    }, {
        icao: "DJR",
        callsign: "DESERT FLIGHT"
    }, {
        icao: "DLA",
        callsign: "DOLOMITI"
    }, {
        icao: "DLC",
        callsign: "SOARCOPTER"
    }, {
        icao: "DMF",
        callsign: "DEMLY"
    }, {
        icao: "NAU",
        callsign: "DANAUS"
    }, {
        icao: "DDA",
        callsign: "DUSTY"
    }, {
        icao: "DNK",
        callsign: "DIRECT JET"
    }, {
        icao: "VPA",
        callsign: "VIP TAXI"
    }, {
        icao: "DHE",
        callsign: "HELIDAP"
    }, {
        icao: "VLF",
        callsign: "VOLANTE"
    }, {
        icao: "DSR",
        callsign: "DAIRAIR"
    }, {
        icao: "RKC",
        callsign: "DAS CONGO"
    }, {
        icao: "DTR",
        callsign: "DANISH"
    }, {
        icao: "ENT",
        callsign: "DATENT"
    }, {
        icao: "BDN",
        callsign: "GAUNTLET"
    }, {
        icao: "DSN",
        callsign: "DESNA"
    }, {
        icao: "DET",
        callsign: "SAMAL"
    }, {
        icao: "DGO",
        callsign: "DGO JET"
    }, {
        icao: "DAE",
        callsign: "YELLOW"
    }, {
        icao: "DHK",
        callsign: "WORLD EXPRESS"
    }, {
        icao: "DHV",
        callsign: "WORLDSTAR"
    }, {
        icao: "DHX",
        callsign: "DILMUN"
    }, {
        icao: "RSK",
        callsign: "REDSKIN"
    }, {
        icao: "DAO",
        callsign: "DALO AIRLINES"
    }, {
        icao: "DAG",
        callsign: "DAGAL"
    }, {
        icao: "CCD",
        callsign: "XIANGJIAN"
    }, {
        icao: "DCS",
        callsign: "TWIN STAR"
    }, {
        icao: "DCX",
        callsign: "DAIMLER"
    }, {
        icao: "DLR",
        callsign: "DALA AIR"
    }, {
        icao: "KHB",
        callsign: "DALAVIA"
    }, {
        icao: "DXP",
        callsign: "DALLAS EXPRESS"
    }, {
        icao: "DAS",
        callsign: "AIRDAM"
    }, {
        icao: "DSA",
        callsign: "DANBURY AIRWAYS"
    }, {
        icao: "DOP",
        callsign: "DANCOPTER"
    }, {
        icao: "DAF",
        callsign: "DANISH AIRFORCE"
    }, {
        icao: "DAR",
        callsign: "DANISH ARMY"
    }, {
        icao: "DNY",
        callsign: "DANISH NAVY"
    }, {
        icao: "DNU",
        callsign: "DANU"
    }, {
        icao: "DRT",
        callsign: "DARTA"
    }, {
        icao: "DWT",
        callsign: "DARWIN"
    }, {
        icao: "DSQ",
        callsign: "DASAB AIR"
    }, {
        icao: "DSH",
        callsign: "DASH CHARTER"
    }, {
        icao: "GOB",
        callsign: "PILGRIM"
    }, {
        icao: "DGX",
        callsign: "DASNA"
    }, {
        icao: "CVF",
        callsign: "CLOVERLEAF"
    }, {
        icao: "DSO",
        callsign: "DASSAULT"
    }, {
        icao: "DTN",
        callsign: "DATA AIR"
    }, {
        icao: "DAU",
        callsign: "DAUAIR"
    }, {
        icao: "DWN",
        callsign: "DAWN AIR"
    }, {
        icao: "DJS",
        callsign: "DAYJET"
    }, {
        icao: "DAY",
        callsign: "DAYA"
    }, {
        icao: "DHC",
        callsign: "DEHAVILLAND"
    }, {
        icao: "IAY",
        callsign: "IASON"
    }, {
        icao: "DAA",
        callsign: "DECUR"
    }, {
        icao: "DKN",
        callsign: "DECCAN"
    }, {
        icao: "JDC",
        callsign: "JOHN DEERE"
    }, {
        icao: "DWR",
        callsign: "DELAWARE"
    }, {
        icao: "DEA",
        callsign: "JET SERVICE"
    }, {
        icao: "SNO",
        callsign: "SNOWBALL"
    }, {
        icao: "ELJ",
        callsign: "ELITE JET"
    }, {
        icao: "DAL",
        callsign: "DELTA"
    }, {
        icao: "KMB",
        callsign: "KEMBLEJET"
    }, {
        icao: "DLI",
        callsign: "DELTA EXPRESS"
    }, {
        icao: "DSU",
        callsign: "DELTA STATE"
    }, {
        icao: "DNM",
        callsign: "DENIM"
    }, {
        icao: "FEC",
        callsign: "FALCON EXPRESS"
    }, {
        icao: "DJT",
        callsign: "DENVER JET"
    }, {
        icao: "FGC",
        callsign: "FORESTALS"
    }, {
        icao: "DRY",
        callsign: "DERAYA"
    }, {
        icao: "MIZ",
        callsign: "MILAZ"
    }, {
        icao: "DTY",
        callsign: "DESTINY"
    }, {
        icao: "AMB",
        callsign: "CIVIL AIR AMBULANCE"
    }, {
        icao: "LFO",
        callsign: "LUFO"
    }, {
        icao: "DIS",
        callsign: "DI AIR"
    }, {
        icao: "SPK",
        callsign: "SPARKLE"
    }, {
        icao: "DRB",
        callsign: "DIDIER"
    }, {
        icao: "DGT",
        callsign: "DIGITAL"
    }, {
        icao: "DIP",
        callsign: "DIPFREIGHT"
    }, {
        icao: "ENA",
        callsign: "ENA"
    }, {
        icao: "DIA",
        callsign: "BLUE SKY"
    }, {
        icao: "XAP",
        callsign: "MIDTOWN"
    }, {
        icao: "SXP",
        callsign: "EXPRESS SKY"
    }, {
        icao: "DIR",
        callsign: "DIRGANTARA"
    }, {
        icao: "DCV",
        callsign: "DISCOVER"
    }, {
        icao: "DVA",
        callsign: "DISCOVERY AIRWAYS"
    }, {
        icao: "DIX",
        callsign: "DIX FLIGHT"
    }, {
        icao: "DEE",
        callsign: "TACAIR"
    }, {
        icao: "UDN",
        callsign: "DNIEPRO"
    }, {
        icao: "FDN",
        callsign: "FLYING DOLPHIN"
    }, {
        icao: "IXX",
        callsign: "ISLAND EXPRESS"
    }, {
        icao: "DPL",
        callsign: "DOME"
    }, {
        icao: "ADM",
        callsign: "DOMINAIR"
    }, {
        icao: "MYO",
        callsign: "MAYORAL"
    }, {
        icao: "DOA",
        callsign: "DOMINICANA"
    }, {
        icao: "DMO",
        callsign: "DOMODEDOVO"
    }, {
        icao: "DVB",
        callsign: "DONSEBAI"
    }, {
        icao: "DON",
        callsign: "DONAIR"
    }, {
        icao: "DNV",
        callsign: "DONAVIA"
    }, {
        icao: "UDC",
        callsign: "DONBASS AERO"
    }, {
        icao: "EPA",
        callsign: "DONGHAI AIR"
    }, {
        icao: "DAD",
        callsign: "DORADO AIR"
    }, {
        icao: "DOR",
        callsign: "DORNIER"
    }, {
        icao: "DAV",
        callsign: "DANA AIR"
    }, {
        icao: "DOM",
        callsign: "DOS MUNDOS"
    }, {
        icao: "DCA",
        callsign: "DREAM CATCHER"
    }, {
        icao: "DRK",
        callsign: "ROYAL BHUTAN"
    }, {
        icao: "DRE",
        callsign: "MICHIGAN"
    }, {
        icao: "DUB",
        callsign: "DUBAI"
    }, {
        icao: "DBK",
        callsign: "SEAGULL"
    }, {
        icao: "DUK",
        callsign: "LION KING"
    }, {
        icao: "DBJ",
        callsign: "DUCHESS"
    }, {
        icao: "LPD",
        callsign: "LEOPARD"
    }, {
        icao: "DUN",
        callsign: "DUNAIR"
    }, {
        icao: "PHD",
        callsign: "PANHANDLE"
    }, {
        icao: "VVF",
        callsign: "WORLDFOCUS"
    }, {
        icao: "DUO",
        callsign: "FLY DUO"
    }, {
        icao: "DJE",
        callsign: "DURANGO JET"
    }, {
        icao: "DNL",
        callsign: "DUTCH ANTILLES"
    }, {
        icao: "DCE",
        callsign: "DUTCH CARIBBEAN"
    }, {
        icao: "DBR",
        callsign: "DUTCHBIRD"
    }, {
        icao: "DBR",
        callsign: "DOBROLET"
    }, {
        icao: "DFS",
        callsign: "DWYAIR"
    }, {
        icao: "DNR",
        callsign: "DYNAMAIR"
    }, {
        icao: "DYE",
        callsign: "DYNAMIC"
    }, {
        icao: "DYA",
        callsign: "DYNAMIC AIR"
    }, {
        icao: "BAG",
        callsign: "SPEEDWAY"
    }, {
        icao: "EAV",
        callsign: "MAYFLOWER"
    }, {
        icao: "ISL",
        callsign: "EASTLAND"
    }, {
        icao: "ENY",
        callsign: "ENVOY"
    }, {
        icao: "ENK",
        callsign: "SUNBIRD"
    }, {
        icao: "ELB",
        callsign: "ELLINAIR HELLAS"
    }, {
        icao: "ELN",
        callsign: "ELERON"
    }, {
        icao: "ECC",
        callsign: "ECLAIR"
    }, {
        icao: "ELU",
        callsign: "EGYPTIAN LEISURE"
    }, {
        icao: "EDV",
        callsign: "ENDEAVOR"
    }, {
        icao: "MNU",
        callsign: "MAINER"
    }, {
        icao: "EHD",
        callsign: "PLATINUM AIR"
    }, {
        icao: "EXW",
        callsign: "ECHOLINE"
    }, {
        icao: "EFS",
        callsign: "EFAOS"
    }, {
        icao: "EFD",
        callsign: "EVER FLIGHT"
    }, {
        icao: "FSD",
        callsign: "FLUGSERVICE"
    }, {
        icao: "EIS",
        callsign: "COOL"
    }, {
        icao: "IAG",
        callsign: "EPAG"
    }, {
        icao: "ESI",
        callsign: "ELISERVIZI"
    }, {
        icao: "EUY",
        callsign: "EUROAIRWAYS"
    }, {
        icao: "EUJ",
        callsign: "UNION JET"
    }, {
        icao: "ICR",
        callsign: "ICARUS FLIGHTS"
    }, {
        icao: "FEI",
        callsign: "ARCTIC EAGLE"
    }, {
        icao: "EGR",
        callsign: "EAGLE SIERRA"
    }, {
        icao: "EFL",
        callsign: "FLYING EAGLE"
    }, {
        icao: "EGU",
        callsign: "AFRICAN EAGLE"
    }, {
        icao: "EAG",
        callsign: "EAGLE"
    }, {
        icao: "EGX",
        callsign: "THAI EAGLE"
    }, {
        icao: "GYP",
        callsign: "GYPSY"
    }, {
        icao: "EGN",
        callsign: "FRENCH EAGLE"
    }, {
        icao: "EZX",
        callsign: "EAGLEXPRESS"
    }, {
        icao: "SEG",
        callsign: "SENEAGLE"
    }, {
        icao: "EGJ",
        callsign: "EAGLE JET"
    }, {
        icao: "EMD",
        callsign: "EAGLEMED"
    }, {
        icao: "ERX",
        callsign: "EARTH AIR"
    }, {
        icao: "HSA",
        callsign: "DUMA"
    }, {
        icao: "EXZ",
        callsign: "TWIGA"
    }, {
        icao: "ECT",
        callsign: "EASTWAY"
    }, {
        icao: "ECJ",
        callsign: "EASTCOAST JET"
    }, {
        icao: "EHA",
        callsign: "AIRE HAMPTON"
    }, {
        icao: "EKC",
        callsign: "BLUE GOOSE"
    }, {
        icao: "CTK",
        callsign: "COSTOCK"
    }, {
        icao: "DXH",
        callsign: "EAST STAR"
    }, {
        icao: "EWA",
        callsign: "EASTWEST"
    }, {
        icao: "ESR",
        callsign: "EASTAR"
    }, {
        icao: "EAZ",
        callsign: "EASAIR"
    }, {
        icao: "EAX",
        callsign: "EASTEX"
    }, {
        icao: "EAL",
        callsign: "EASTERN"
    }, {
        icao: "EAL",
        callsign: "EASTERN"
    }, {
        icao: "EZE",
        callsign: "EASTFLIGHT"
    }, {
        icao: "EAQ",
        callsign: "EASTERN"
    }, {
        icao: "ECI",
        callsign: "EASTERN CAROLINA"
    }, {
        icao: "GNS",
        callsign: "GENESIS"
    }, {
        icao: "LIS",
        callsign: "LARISA"
    }, {
        icao: "EME",
        callsign: "EMAIR"
    }, {
        icao: "EPB",
        callsign: "EAST PAC"
    }, {
        icao: "ESJ",
        callsign: "EASTERN SKYJETS"
    }, {
        icao: "SGR",
        callsign: "STINGER"
    }, {
        icao: "FYE",
        callsign: "FLYME"
    }, {
        icao: "EJU",
        callsign: "ALPINE"
    }, {
        icao: "EZS",
        callsign: "TOPSWISS"
    }, {
        icao: "EZY",
        callsign: "EASY"
    }, {
        icao: "CMN",
        callsign: "CIMMARON AIRE"
    }, {
        icao: "EJT",
        callsign: "ECLIPSE JET"
    }, {
        icao: "ECQ",
        callsign: "SKYBRIDGE"
    }, {
        icao: "NAK",
        callsign: "ENAC SCHOOL"
    }, {
        icao: "ECX",
        callsign: "AIR ECOMEX"
    }, {
        icao: "ECD",
        callsign: "ECOTOUR"
    }, {
        icao: "XCC",
        callsign: "XCALAK"
    }, {
        icao: "ECV",
        callsign: "EQUATOGUINEA"
    }, {
        icao: "EQC",
        callsign: "ECUACARGO"
    }, {
        icao: "ECU",
        callsign: "ECUAVIA"
    }, {
        icao: "EDW",
        callsign: "EDELWEISS"
    }, {
        icao: "SLO",
        callsign: "SLOW"
    }, {
        icao: "EDC",
        callsign: "SALTIRE"
    }, {
        icao: "EDJ",
        callsign: "EDWARDS"
    }, {
        icao: "EIJ",
        callsign: "EFATA"
    }, {
        icao: "EUW",
        callsign: "EUROWEST"
    }, {
        icao: "MSR",
        callsign: "EGYPTAIR"
    }, {
        icao: "MSX",
        callsign: "EGYPTAIR CARGO"
    }, {
        icao: "EIX",
        callsign: "AIR EXPORTS"
    }, {
        icao: "EIR",
        callsign: "EIRJET"
    }, {
        icao: "ELY",
        callsign: "ELAL"
    }, {
        icao: "CMX",
        callsign: "EL CAMINANTE"
    }, {
        icao: "GLQ",
        callsign: "QUILADA"
    }, {
        icao: "ELS",
        callsign: "EL SAL"
    }, {
        icao: "ESC",
        callsign: "SOLAMERICA"
    }, {
        icao: "BRQ",
        callsign: "BURAQAIR"
    }, {
        icao: "ELX",
        callsign: "ELAN"
    }, {
        icao: "LBR",
        callsign: "MOTION"
    }, {
        icao: "NLK",
        callsign: "ELAVIA"
    }, {
        icao: "DND",
        callsign: "DINDER"
    }, {
        icao: "PDV",
        callsign: "ELICAR"
    }, {
        icao: "EDO",
        callsign: "ELIDOLOMITI"
    }, {
        icao: "ELB",
        callsign: "ELILOBARDIA"
    }, {
        icao: "EFG",
        callsign: "ELIFRIULIA"
    }, {
        icao: "ELH",
        callsign: "LARIO"
    }, {
        icao: "EOA",
        callsign: "LOMBARDA"
    }, {
        icao: "MEE",
        callsign: "ELIMEDITERRANEA"
    }, {
        icao: "VUL",
        callsign: "ELIOS"
    }, {
        icao: "IEP",
        callsign: "ELIPIU"
    }, {
        icao: "RSA",
        callsign: "ESRA"
    }, {
        icao: "EAI",
        callsign: "ELAIR"
    }, {
        icao: "EJD",
        callsign: "ELITE DUBAI"
    }, {
        icao: "FGS",
        callsign: "ELITELLINA"
    }, {
        icao: "ELT",
        callsign: "ELLIOT"
    }, {
        icao: "MGG",
        callsign: "ELMAGAL"
    }, {
        icao: "EAM",
        callsign: "EMBASSY AIR"
    }, {
        icao: "EFT",
        callsign: "EMBASSY FREIGHT"
    }, {
        icao: "EMB",
        callsign: "EMBRAER"
    }, {
        icao: "XSL",
        callsign: "SATSLAB"
    }, {
        icao: "EAI",
        callsign: "GEMSTONE"
    }, {
        icao: "JEM",
        callsign: "GEMSTONE"
    }, {
        icao: "EWW",
        callsign: "EMERY"
    }, {
        icao: "EMT",
        callsign: "EMETEBE"
    }, {
        icao: "UAE",
        callsign: "EMIRATES"
    }, {
        icao: "SBC",
        callsign: "SABIAN AIR"
    }, {
        icao: "EMP",
        callsign: "EMPIRE"
    }, {
        icao: "CFS",
        callsign: "EMPIRE AIR"
    }, {
        icao: "ETP",
        callsign: "TESTER"
    }, {
        icao: "AUO",
        callsign: "UNIFORM OSCAR"
    }, {
        icao: "PRG",
        callsign: "ASPAR"
    }, {
        icao: "CRN",
        callsign: "AEROCARIBBEAN"
    }, {
        icao: "VNA",
        callsign: "EBBA"
    }, {
        icao: "EEA",
        callsign: "ECUATORIANA"
    }, {
        icao: "CNI",
        callsign: "SERAER"
    }, {
        icao: "VNE",
        callsign: "VENEZOLANA"
    }, {
        icao: "GTV",
        callsign: "GAVIOTA"
    }, {
        icao: "XLT",
        callsign: "INFRAERO"
    }, {
        icao: "ENC",
        callsign: "ENDECOTS"
    }, {
        icao: "ENI",
        callsign: "ENIMEX"
    }, {
        icao: "ENK",
        callsign: "ENKOR"
    }, {
        icao: "EGV",
        callsign: "GLEISNER"
    }, {
        icao: "ESE",
        callsign: "ENSENADA ESPECIAL"
    }, {
        icao: "ENT",
        callsign: "ENTER"
    }, {
        icao: "ENS",
        callsign: "ENTERGY SHUTTLE"
    }, {
        icao: "EWS",
        callsign: "WORLD ENTERPRISE"
    }, {
        icao: "ESS",
        callsign: "NEW DAWN"
    }, {
        icao: "EKA",
        callsign: "EQUAFLIGHT"
    }, {
        icao: "EQZ",
        callsign: "ZAMBIA CARGO"
    }, {
        icao: "ERH",
        callsign: "ERAH"
    }, {
        icao: "IRY",
        callsign: "ERAM AIR"
    }, {
        icao: "ERF",
        callsign: "ERFOTO"
    }, {
        icao: "ERE",
        callsign: "AIR ERIE"
    }, {
        icao: "ERT",
        callsign: "ERITREAN"
    }, {
        icao: "EAD",
        callsign: "AEROESCOLA"
    }, {
        icao: "CTV",
        callsign: "ARE AVIACION"
    }, {
        icao: "EPC",
        callsign: "ESPACE"
    }, {
        icao: "ERC",
        callsign: "ESSO"
    }, {
        icao: "EEF",
        callsign: "ESTONIAN AIR FORCE"
    }, {
        icao: "ELL",
        callsign: "ESTONIAN"
    }, {
        icao: "ETA",
        callsign: "ESTRELLAS"
    }, {
        icao: "ETH",
        callsign: "ETHIOPIAN"
    }, {
        icao: "MJM",
        callsign: "ELCO ETI"
    }, {
        icao: "ETD",
        callsign: "ETIHAD"
    }, {
        icao: "ETM",
        callsign: "ETRAM"
    }, {
        icao: "EVN",
        callsign: "EURAVIATION"
    }, {
        icao: "ECN",
        callsign: "EURO CONTINENTAL"
    }, {
        icao: "ESN",
        callsign: "EURO SUN"
    }, {
        icao: "EAK",
        callsign: "EAKAZ"
    }, {
        icao: "KZE",
        callsign: "KAZEUR"
    }, {
        icao: "MMZ",
        callsign: "EUROATLANTIC"
    }, {
        icao: "GOJ",
        callsign: "GOJET"
    }, {
        icao: "EUP",
        callsign: "SAVOY"
    }, {
        icao: "EUU",
        callsign: "EUROAMERICAN"
    }, {
        icao: "ECY",
        callsign: "ECHELON"
    }, {
        icao: "ECF",
        callsign: "EUROCOPTER"
    }, {
        icao: "ECA",
        callsign: "EUROCYPRIA"
    }, {
        icao: "EEZ",
        callsign: "EFLY"
    }, {
        icao: "EEU",
        callsign: "EUROFLY"
    }, {
        icao: "EUG",
        callsign: "EUROGUINEA"
    }, {
        icao: "ERJ",
        callsign: "JET ITALIA"
    }, {
        icao: "JLN",
        callsign: "JET LINE"
    }, {
        icao: "RDP",
        callsign: "JETARROW"
    }, {
        icao: "EJS",
        callsign: "EEJAY SERVICE"
    }, {
        icao: "ELO",
        callsign: "EUROLOT"
    }, {
        icao: "EMX",
        callsign: "EUROMANX"
    }, {
        icao: "GED",
        callsign: "LANGUEDOC"
    }, {
        icao: "FPO",
        callsign: "FRENCH POST"
    }, {
        icao: "EUT",
        callsign: "FIESTA"
    }, {
        icao: "EAL",
        callsign: "STAR WING"
    }, {
        icao: "BCS",
        callsign: "POSTMAN"
    }, {
        icao: "EAF",
        callsign: "EUROCHARTER"
    }, {
        icao: "ECB",
        callsign: "COASTAL CLIPPER"
    }, {
        icao: "ETV",
        callsign: "EURO EXEC"
    }, {
        icao: "EXC",
        callsign: "ECHO EXPRESS"
    }, {
        icao: "EBG",
        callsign: "EUROSENSE"
    }, {
        icao: "ESX",
        callsign: "CATFISH"
    }, {
        icao: "EWG",
        callsign: "EUROWINGS"
    }, {
        icao: "OCN",
        callsign: "OCEAN"
    }, {
        icao: "EWL",
        callsign: "BLACK PEARL"
    }, {
        icao: "EVA",
        callsign: "EVA"
    }, {
        icao: "EVE",
        callsign: "EVELOP"
    }, {
        icao: "EVK",
        callsign: "EVERETT"
    }, {
        icao: "EIA",
        callsign: "EVERGREEN"
    }, {
        icao: "VTS",
        callsign: "EVERTS"
    }, {
        icao: "EVL",
        callsign: "EVOLEM"
    }, {
        icao: "EWR",
        callsign: "MAYOTTE AIR"
    }, {
        icao: "EMN",
        callsign: "AGENCY"
    }, {
        icao: "XLA",
        callsign: "EXPO"
    }, {
        icao: "XEL",
        callsign: "HELI EXCEL"
    }, {
        icao: "GZA",
        callsign: "EXCELLENT AIR"
    }, {
        icao: "EXA",
        callsign: "CANADIAN EXECAIRE"
    }, {
        icao: "VCN",
        callsign: "AVCON"
    }, {
        icao: "EJO",
        callsign: "MIDJET"
    }, {
        icao: "VMP",
        callsign: "VAMPIRE"
    }, {
        icao: "LFL",
        callsign: "LIFE FLIGHT"
    }, {
        icao: "EAC",
        callsign: "EXECAIR"
    }, {
        icao: "ECS",
        callsign: "ECHO"
    }, {
        icao: "EXK",
        callsign: "EXECUTIVE EAGLE"
    }, {
        icao: "EXU",
        callsign: "SACAIR"
    }, {
        icao: "JTR",
        callsign: "JESTER"
    }, {
        icao: "EXE",
        callsign: "EXEC"
    }, {
        icao: "TRI",
        callsign: "TRILLIUM"
    }, {
        icao: "EJM",
        callsign: "JET SPEED"
    }, {
        icao: "TEA",
        callsign: "TRAVELMAX"
    }, {
        icao: "EXF",
        callsign: "EXIMFLIGHT"
    }, {
        icao: "EXN",
        callsign: "EXIN"
    }, {
        icao: "EXR",
        callsign: "EXPERTOS ENCARGA"
    }, {
        icao: "FXA",
        callsign: "EFFEX"
    }, {
        icao: "EIC",
        callsign: "EXCARGO"
    }, {
        icao: "XPL",
        callsign: "EXPRESSLINE"
    }, {
        icao: "XNA",
        callsign: "EXPRESSNET"
    }, {
        icao: "LHN",
        callsign: "LONGHORN"
    }, {
        icao: "XTO",
        callsign: "EXPRESS TOURS"
    }, {
        icao: "ASQ",
        callsign: "ACEY"
    }, {
        icao: "XSL",
        callsign: "EXCELAIRE"
    }, {
        icao: "LTD",
        callsign: "LIGHT SPEED"
    }, {
        icao: "XSR",
        callsign: "AIRSHARE"
    }, {
        icao: "EPR",
        callsign: "EMPEROR"
    }, {
        icao: "XRO",
        callsign: "CRAMER"
    }, {
        icao: "JTM",
        callsign: "SKYMAN"
    }, {
        icao: "EZJ",
        callsign: "GUYANA JET"
    }, {
        icao: "EVS",
        callsign: "EVAS"
    }, {
        icao: "FRX",
        callsign: "FORT AERO"
    }, {
        icao: "PBR",
        callsign: "POLAR BEAR"
    }, {
        icao: "SRE",
        callsign: "STREAMJET"
    }, {
        icao: "FTZ",
        callsign: "GREY BIRD"
    }, {
        icao: "FAP",
        callsign: "FAIR SCHOOL"
    }, {
        icao: "FFL",
        callsign: "FOREFLIGHT"
    }, {
        icao: "EYE",
        callsign: "SOCKEYE"
    }, {
        icao: "IFA",
        callsign: "RED ANGEL"
    }, {
        icao: "FLC",
        callsign: "FLIGHT CHECK"
    }, {
        icao: "FKI",
        callsign: "KIEL AIR"
    }, {
        icao: "DCM",
        callsign: "DOT COM"
    }, {
        icao: "FLW",
        callsign: "QUICKFLOW"
    }, {
        icao: "FMG",
        callsign: "HUSKY"
    }, {
        icao: "FRA",
        callsign: "RUSHTON"
    }, {
        icao: "FSB",
        callsign: "SEABIRD"
    }, {
        icao: "LEJ",
        callsign: "LEIPZIG FAIR"
    }, {
        icao: "FBA",
        callsign: "FAB AIR"
    }, {
        icao: "FCS",
        callsign: "MEXFACTS"
    }, {
        icao: "FAV",
        callsign: "FAIRAVIA"
    }, {
        icao: "FWD",
        callsign: "FAIR WIND"
    }, {
        icao: "FLS",
        callsign: "FAIRLINE"
    }, {
        icao: "FFC",
        callsign: "FAIROAKS"
    }, {
        icao: "FWY",
        callsign: "FAIRWAYS"
    }, {
        icao: "FCN",
        callsign: "FALCON"
    }, {
        icao: "FAR",
        callsign: "FALCAIR"
    }, {
        icao: "FAO",
        callsign: "PANTHER"
    }, {
        icao: "FAU",
        callsign: "FALCON AIRLINE"
    }, {
        icao: "FBU",
        callsign: "FRENCH BEE"
    }, {
        icao: "FVS",
        callsign: "FALCON AVIATION"
    }, {
        icao: "FJC",
        callsign: "FALCONJET"
    }, {
        icao: "FAW",
        callsign: "FALWELL"
    }, {
        icao: "FEA",
        callsign: "FAR EASTERN"
    }, {
        icao: "FDL",
        callsign: "FARMINGDALE STATE"
    }, {
        icao: "FAH",
        callsign: "BLUE STRIP"
    }, {
        icao: "FRN",
        callsign: "FARNED"
    }, {
        icao: "FAT",
        callsign: "FARNER"
    }, {
        icao: "RAF",
        callsign: "FARNAS"
    }, {
        icao: "HBL",
        callsign: "HELIBLUE"
    }, {
        icao: "RCK",
        callsign: "ROCKROSE"
    }, {
        icao: "FRW",
        callsign: "FARWEST"
    }, {
        icao: "FSW",
        callsign: "FASO"
    }, {
        icao: "FHL",
        callsign: "FINDON"
    }, {
        icao: "FAY",
        callsign: "FAYBAN AIR"
    }, {
        icao: "SKM",
        callsign: "SKYTEM"
    }, {
        icao: "FDR",
        callsign: "FEDAIR"
    }, {
        icao: "FLL",
        callsign: "FEDERAL AIRLINES"
    }, {
        icao: "DCN",
        callsign: "DIPLOMATIC CLEARANCE"
    }, {
        icao: "FRM",
        callsign: "FEDARM"
    }, {
        icao: "NHK",
        callsign: "NIGHTHAWK"
    }, {
        icao: "FDX",
        callsign: "FEDEX"
    }, {
        icao: "FNK",
        callsign: "AURIKA"
    }, {
        icao: "FER",
        callsign: "FERIA"
    }, {
        icao: "HGK",
        callsign: "SALAAMA"
    }, {
        icao: "FNC",
        callsign: "FINALAIR CONGO"
    }, {
        icao: "FAK",
        callsign: "FACTS"
    }, {
        icao: "FBF",
        callsign: "FINE AIR"
    }, {
        icao: "FTR",
        callsign: "FINISTAIR"
    }, {
        icao: "FIN",
        callsign: "FINNAIR"
    }, {
        icao: "WBA",
        callsign: "WESTBIRD"
    }, {
        icao: "FNF",
        callsign: "FINNFORCE"
    }, {
        icao: "FIH",
        callsign: "FINNHEMS"
    }, {
        icao: "FFM",
        callsign: "FIREFLY"
    }, {
        icao: "FAB",
        callsign: "FIRST AIR"
    }, {
        icao: "FCC",
        callsign: "FIRST CAMBODIA"
    }, {
        icao: "FCA",
        callsign: "COOPAIR"
    }, {
        icao: "MBL",
        callsign: "FIRST CITY"
    }, {
        icao: "GGA",
        callsign: "JAWJA"
    }, {
        icao: "FIR",
        callsign: "FIRSTLINE AIR"
    }, {
        icao: "FTS",
        callsign: "FIRST SABRE"
    }, {
        icao: "FFR",
        callsign: "FISCHER"
    }, {
        icao: "FFP",
        callsign: "FLYING FISH"
    }, {
        icao: "EXV",
        callsign: "EXPOAVIA"
    }, {
        icao: "FSX",
        callsign: "FLAG"
    }, {
        icao: "FLE",
        callsign: "FLAIR"
    }, {
        icao: "WAF",
        callsign: "FLAMENCO"
    }, {
        icao: "FMR",
        callsign: "FLAMINGO AIR"
    }, {
        icao: "FLN",
        callsign: "ILIAS"
    }, {
        icao: "FSH",
        callsign: "FLASH"
    }, {
        icao: "BWY",
        callsign: "BROADWAY"
    }, {
        icao: "FLR",
        callsign: "FLEETAIR"
    }, {
        icao: "FXY",
        callsign: "FLEXY"
    }, {
        icao: "TUD",
        callsign: "TUNDRA"
    }, {
        icao: "FCK",
        callsign: "NAV CHECKER"
    }, {
        icao: "VOR",
        callsign: "FLIGHT CAL"
    }, {
        icao: "FCV",
        callsign: "NAVAIR"
    }, {
        icao: "FCP",
        callsign: "FLIGHTCORP"
    }, {
        icao: "FLX",
        callsign: "FLIGHT EXPRESS"
    }, {
        icao: "CFI",
        callsign: "CHINA JET"
    }, {
        icao: "LTS",
        callsign: "SPECAIR"
    }, {
        icao: "IVJ",
        callsign: "INVADER JACK"
    }, {
        icao: "MIT",
        callsign: "MATCO"
    }, {
        icao: "OPT",
        callsign: "OPTIONS"
    }, {
        icao: "CLB",
        callsign: "CALIBRATOR"
    }, {
        icao: "FSL",
        callsign: "FLIGHTSAFETY"
    }, {
        icao: "CCK",
        callsign: "CABLE CHECK"
    }, {
        icao: "AYR",
        callsign: "CYGNET"
    }, {
        icao: "FWQ",
        callsign: "UNITY"
    }, {
        icao: "KLO",
        callsign: "KLONDIKE"
    }, {
        icao: "CSK",
        callsign: "CASCADE"
    }, {
        icao: "FEX",
        callsign: "FLIGHTEXEC"
    }, {
        icao: "FLT",
        callsign: "FLIGHTLINE"
    }, {
        icao: "FTL",
        callsign: "FLIGHTAVIA"
    }, {
        icao: "FPS",
        callsign: "FLIGHTPASS"
    }, {
        icao: "FSR",
        callsign: "FLIGHTSTAR"
    }, {
        icao: "KDZ",
        callsign: "KUDZU"
    }, {
        icao: "FAZ",
        callsign: "FLINT AIR"
    }, {
        icao: "KWX",
        callsign: "KAY DUB"
    }, {
        icao: "OJY",
        callsign: "OHJAY"
    }, {
        icao: "FAS",
        callsign: "FLORIDA CARGO"
    }, {
        icao: "FCL",
        callsign: "FLORIDA COASTAL"
    }, {
        icao: "FFS",
        callsign: "FORESTRY"
    }, {
        icao: "FJS",
        callsign: "FLORIDAJET"
    }, {
        icao: "FWL",
        callsign: "FLO WEST"
    }, {
        icao: "FFG",
        callsign: "WITCHCRAFT"
    }, {
        icao: "FLU",
        callsign: "YELLOW FLYER"
    }, {
        icao: "EZB",
        callsign: "EICHENBURGER"
    }, {
        icao: "VNX",
        callsign: "VANCE"
    }, {
        icao: "FLM",
        callsign: "FLY WORLD"
    }, {
        icao: "EDR",
        callsign: "BIRDVIEW"
    }, {
        icao: "ACY",
        callsign: "ARNA"
    }, {
        icao: "FCT",
        callsign: "DEALER"
    }, {
        icao: "FEE",
        callsign: "FLY EURO"
    }, {
        icao: "FXL",
        callsign: "FLY EXCELLENT"
    }, {
        icao: "FGE",
        callsign: "GEORGIA WING"
    }, {
        icao: "NVJ",
        callsign: "NOUVINTER"
    }, {
        icao: "FJM",
        callsign: "GREENHEART"
    }, {
        icao: "FJL",
        callsign: "OKAAB"
    }, {
        icao: "FIL",
        callsign: "FLYLINE"
    }, {
        icao: "FLY",
        callsign: "FLYBIRD"
    }, {
        icao: "PVV[27][28]",
        callsign: "SUNDAY"
    }, {
        icao: "FRB",
        callsign: "RAKWAY"
    }, {
        icao: "IAD",
        callsign: "FLYWEX"
    }, {
        icao: "VAW",
        callsign: "SOFIA JET"
    }, {
        icao: "FYA",
        callsign: "FLYANT"
    }, {
        icao: "XFA",
        callsign: "FAX AIR"
    }, {
        icao: "BBO",
        callsign: "BABOO"
    }, {
        icao: "BEE",
        callsign: "JERSEY"
    }, {
        icao: "FBZ",
        callsign: "BONDI"
    }, {
        icao: "FCE",
        callsign: "FLYCOLUMBIA"
    }, {
        icao: "FEG",
        callsign: "SKY EGYPT"
    }, {
        icao: "GVG",
        callsign: "BLUECRAFT"
    }, {
        icao: "GSM",
        callsign: "GLOBESPAN"
    }, {
        icao: "TOR",
        callsign: "HOMERUN"
    }, {
        icao: "ETS",
        callsign: "EXTRANS"
    }, {
        icao: "INU",
        callsign: "INSTRUCTOR"
    }, {
        icao: "FYH",
        callsign: "FLY HIGH"
    }, {
        icao: "FCR",
        callsign: "FLYING CARPET"
    }, {
        icao: "FYG",
        callsign: "FLYING GROUP"
    }, {
        icao: "FGP",
        callsign: "FLYING CENTER"
    }, {
        icao: "LIL",
        callsign: "LITHUANIA AIR"
    }, {
        icao: "FLK",
        callsign: "FLYLINK"
    }, {
        icao: "KNE",
        callsign: "NAS EXPRESS"
    }, {
        icao: "NDC",
        callsign: "NORDIC"
    }, {
        icao: "FRE",
        callsign: "PELICAN"
    }, {
        icao: "FOX",
        callsign: "GREENSTAR"
    }, {
        icao: "FTM",
        callsign: "FLYTEAM"
    }, {
        icao: "FVK",
        callsign: "BALDER"
    }, {
        icao: "FMI",
        callsign: "FIRST MYANMAR"
    }, {
        icao: "FKS",
        callsign: "FOCUS"
    }, {
        icao: "NOF",
        callsign: "FONNA"
    }, {
        icao: "FOB",
        callsign: "FORDAIR"
    }, {
        icao: "FOR",
        callsign: "FORMULA"
    }, {
        icao: "FHS",
        callsign: "HELISCOT"
    }, {
        icao: "FXC",
        callsign: "AIR FUTURE"
    }, {
        icao: "FSA",
        callsign: "FOSTERAIR"
    }, {
        icao: "JFY",
        callsign: "YEOMAN"
    }, {
        icao: "FTE",
        callsign: "FOTOGRAFIA"
    }, {
        icao: "FIA",
        callsign: "FIA"
    }, {
        icao: "FIE",
        callsign: "ARMRIDER"
    }, {
        icao: "FSC",
        callsign: "FOUR STAR"
    }, {
        icao: "WDS",
        callsign: "WINDS"
    }, {
        icao: "FXR",
        callsign: "WILDFOX"
    }, {
        icao: "FDO",
        callsign: "FRENCH CUSTOM"
    }, {
        icao: "FHY",
        callsign: "FREEBIRD AIR"
    }, {
        icao: "FOM",
        callsign: "FREE AIR"
    }, {
        icao: "FRE",
        callsign: "FREEDOM"
    }, {
        icao: "FFF",
        callsign: "INTER FREEDOM"
    }, {
        icao: "FRL",
        callsign: "FREEDOM AIR"
    }, {
        icao: "FAS",
        callsign: "FREEDOM AIRWAYS"
    }, {
        icao: "FWC",
        callsign: "FREEWAY"
    }, {
        icao: "FRG",
        callsign: "FREIGHT RUNNERS"
    }, {
        icao: "FAF",
        callsign: "FRENCH AIR FORCE"
    }, {
        icao: "FMY",
        callsign: "FRENCH ARMY"
    }, {
        icao: "FNY",
        callsign: "FRENCH NAVY"
    }, {
        icao: "FRR",
        callsign: "FRESH AIR"
    }, {
        icao: "BZY",
        callsign: "BREEZY"
    }, {
        icao: "FAE",
        callsign: "WILDGOOSE"
    }, {
        icao: "FAL",
        callsign: "FRIENDSHIP"
    }, {
        icao: "FLF",
        callsign: "FRIEND AIR"
    }, {
        icao: "FFT",
        callsign: "FRONTIER FLIGHT"
    }, {
        icao: "ITR",
        callsign: "OUT BACK"
    }, {
        icao: "FTA",
        callsign: "FRONTIERAIR"
    }, {
        icao: "FNG",
        callsign: "FINNGUARD"
    }, {
        icao: "FUJ",
        callsign: "FUJAIRAH"
    }, {
        icao: "CFJ",
        callsign: "FUJIAN"
    }, {
        icao: "GAX",
        callsign: "GRAND AIRE"
    }, {
        icao: "FAM",
        callsign: "FAASA"
    }, {
        icao: "FFY",
        callsign: "FUN FLYING"
    }, {
        icao: "ROG",
        callsign: "REGO"
    }, {
        icao: "FUN",
        callsign: "FUNTSHI"
    }, {
        icao: "FGL",
        callsign: "APPLEWOOD"
    }, {
        icao: "FUA",
        callsign: "FUTURA"
    }, {
        icao: "FDB",
        callsign: "SKYDUBAI"
    }, {
        icao: "ACT",
        callsign: "AMERICAN CHECK"
    }, {
        icao: "FRF",
        callsign: "FAIRFLEET"
    }, {
        icao: "FUM",
        callsign: "FUNLINE"
    }, {
        icao: "FWR",
        callsign: "FLIGHT AWARE"
    }, {
        icao: "GML",
        callsign: "GEEANDEL"
    }, {
        icao: "DBC",
        callsign: "DIAMOND BACK"
    }, {
        icao: "GOP",
        callsign: "GOSPA AIR"
    }, {
        icao: "HGT",
        callsign: "HIGHTECH"
    }, {
        icao: "GMQ",
        callsign: "CORGI"
    }, {
        icao: "KNM",
        callsign: "KINGDOM"
    }, {
        icao: "GCW",
        callsign: "GLOBALCREW"
    }, {
        icao: "GMR",
        callsign: "GOLDEN MYANMAR"
    }, {
        icao: "EXH",
        callsign: "BATMAN"
    }, {
        icao: "MTA",
        callsign: "GAK AVIATION"
    }, {
        icao: "GGS",
        callsign: "GATSA"
    }, {
        icao: "GBX",
        callsign: "ISLAND TIGER"
    }, {
        icao: "GBL",
        callsign: "GEEBEE AIRWAYS"
    }, {
        icao: "GCS",
        callsign: "GALION"
    }, {
        icao: "FFU",
        callsign: "FERRANTI"
    }, {
        icao: "GCC",
        callsign: "GECAS"
    }, {
        icao: "GEN",
        callsign: "GENSABRASIL"
    }, {
        icao: "GET",
        callsign: "AIR FLOW"
    }, {
        icao: "GET",
        callsign: "GETRA"
    }, {
        icao: "GGT",
        callsign: "THUNDERBALL"
    }, {
        icao: "GMG",
        callsign: "GMG"
    }, {
        icao: "GPE",
        callsign: "REGIONAL EXPRESS"
    }, {
        icao: "GPR",
        callsign: "GPM AEROSERVICIO"
    }, {
        icao: "GIB",
        callsign: "GRAVIA"
    }, {
        icao: "BMK",
        callsign: "MURAT"
    }, {
        icao: "GTX",
        callsign: "BIGDEE"
    }, {
        icao: "GAH",
        callsign: "GAMHELICO"
    }, {
        icao: "GBE",
        callsign: "GABEX"
    }, {
        icao: "GIG",
        callsign: "GACELA AIR"
    }, {
        icao: "GFC",
        callsign: "GAIL FORCE"
    }, {
        icao: "GNJ",
        callsign: "HERCULES JET"
    }, {
        icao: "SWF",
        callsign: "GALAIR"
    }, {
        icao: "GLS",
        callsign: "GALS"
    }, {
        icao: "GAL",
        callsign: "GALAXY"
    }, {
        icao: "GXY",
        callsign: "GALAX"
    }, {
        icao: "GAS",
        callsign: "GALENA AIR SERVICE"
    }, {
        icao: "GMA",
        callsign: "GAMA"
    }, {
        icao: "GCH",
        callsign: "GAMA SWISS"
    }, {
        icao: "GNR",
        callsign: "GAMBIA INTERNATIONAL"
    }, {
        icao: "NML",
        callsign: "NEWMILL"
    }, {
        icao: "GMJ",
        callsign: "GAMISA"
    }, {
        icao: "GNF",
        callsign: "GANDALF"
    }, {
        icao: "GAN",
        callsign: "GANAIR"
    }, {
        icao: "GSA",
        callsign: "GARDEN STATE"
    }, {
        icao: "AHM",
        callsign: "AIR HURON"
    }, {
        icao: "GIA",
        callsign: "INDONESIA"
    }, {
        icao: "GHS",
        callsign: "GATARI"
    }, {
        icao: "EGO",
        callsign: "GAUTENG"
    }, {
        icao: "GVN",
        callsign: "GAVINA"
    }, {
        icao: "GZP",
        callsign: "GAZPROMAVIA"
    }, {
        icao: "GEE",
        callsign: "GEESAIR"
    }, {
        icao: "GLX",
        callsign: "RUSSIAN BIRD"
    }, {
        icao: "GCO",
        callsign: "GEMINI"
    }, {
        icao: "GAB",
        callsign: "GENDALL"
    }, {
        icao: "GDB",
        callsign: "BELGIAN GENERMERIE"
    }, {
        icao: "FGN",
        callsign: "FRANCE GENDARME"
    }, {
        icao: "SWK",
        callsign: "SKYWALKER"
    }, {
        icao: "GWS",
        callsign: "GENAIR"
    }, {
        icao: "GNZ",
        callsign: "GONZO"
    }, {
        icao: "GTH",
        callsign: "GOTHAM"
    }, {
        icao: "GMC",
        callsign: "GENERAL MOTORS"
    }, {
        icao: "GSL",
        callsign: "SURVEYCANADA"
    }, {
        icao: "TGZ",
        callsign: "TAMAZI"
    }, {
        icao: "FGA",
        callsign: "GEORGIA FED"
    }, {
        icao: "GGF",
        callsign: "GEORGIAN AFRICA"
    }, {
        icao: "GFG",
        callsign: "NATIONAL"
    }, {
        icao: "GAF",
        callsign: "GERMAN AIR FORCE"
    }, {
        icao: "GAM",
        callsign: "GERMAN ARMY"
    }, {
        icao: "GNY",
        callsign: "GERMAN NAVY"
    }, {
        icao: "LGW",
        callsign: "WALTER"
    }, {
        icao: "GHY",
        callsign: "GERMAN SKY"
    }, {
        icao: "GMI",
        callsign: "GERMANIA"
    }, {
        icao: "GWI",
        callsign: "GERMAN WINGS"
    }, {
        icao: "GFD",
        callsign: "KITE"
    }, {
        icao: "RIV",
        callsign: "RIVERA"
    }, {
        icao: "GES",
        callsign: "GESTAIR"
    }, {
        icao: "GTR",
        callsign: "STAR GESTAR"
    }, {
        icao: "GJT",
        callsign: "BANJET"
    }, {
        icao: "GLP",
        callsign: "GLOBUS"
    }, {
        icao: "GHA",
        callsign: "GHANA"
    }, {
        icao: "GHB",
        callsign: "GHANA AIRLINES"
    }, {
        icao: "NTC",
        callsign: "NIGHT CHASE"
    }, {
        icao: "RPS",
        callsign: "RESPONSE"
    }, {
        icao: "GAG",
        callsign: "GEEBIRD"
    }, {
        icao: "DMJ",
        callsign: "DAMOJH"
    }, {
        icao: "GBS",
        callsign: "GLOBAL SERVE"
    }, {
        icao: "GLB",
        callsign: "GLOAIR"
    }, {
        icao: "GBB",
        callsign: "GLOBE"
    }, {
        icao: "GAK",
        callsign: "AVIAGROUP"
    }, {
        icao: "GGZ",
        callsign: "GLOBAL GEORGIAN"
    }, {
        icao: "GLJ",
        callsign: "GLOBAL JET AUSTRIA"
    }, {
        icao: "NSM",
        callsign: "THUNDERCLOUD"
    }, {
        icao: "SVW",
        callsign: "SILVER ARROWS"
    }, {
        icao: "GSK",
        callsign: "GLOBAL SKY"
    }, {
        icao: "GSS",
        callsign: "JET LIFT"
    }, {
        icao: "GAC",
        callsign: "DREAM TEAM"
    }, {
        icao: "RLX",
        callsign: "RELAX"
    }, {
        icao: "GOW",
        callsign: "GOAIR"
    }, {
        icao: "GJS",
        callsign: "LINDBERGH"
    }, {
        icao: "GOF",
        callsign: "GOFAIR"
    }, {
        icao: "GOI",
        callsign: "SWISS HAWK"
    }, {
        icao: "GLO",
        callsign: "GOL TRANSPORTE"
    }, {
        icao: "GBT",
        callsign: "GOLD BELT"
    }, {
        icao: "GDA",
        callsign: "AIR PARTNER"
    }, {
        icao: "GDK",
        callsign: "GOLDECK FLUG"
    }, {
        icao: "GAO",
        callsign: "GOLDEN"
    }, {
        icao: "GDD",
        callsign: "GOLDEN AIRLINES"
    }, {
        icao: "GPA",
        callsign: "GOLDEN PAC"
    }, {
        icao: "GRS",
        callsign: "GOLDEN RULE"
    }, {
        icao: "GLD",
        callsign: "GOLDEN STAR"
    }, {
        icao: "GAQ",
        callsign: "GOLFAIR"
    }, {
        icao: "GLE",
        callsign: "GOLIAF AIR"
    }, {
        icao: "GOM",
        callsign: "GOMEL"
    }, {
        icao: "GON",
        callsign: "GONINI"
    }, {
        icao: "RDR",
        callsign: "RED STAR"
    }, {
        icao: "GOR",
        callsign: "GORLITSA"
    }, {
        icao: "HKG",
        callsign: "HONGKONG GOVERNMENT"
    }, {
        icao: "GRZ",
        callsign: "COM FLIGHT"
    }, {
        icao: "HLD",
        callsign: "GRANITE"
    }, {
        icao: "GAV",
        callsign: "GRANAVI"
    }, {
        icao: "GAE",
        callsign: "GRAND EXPRESS"
    }, {
        icao: "GND",
        callsign: "GRAND VEGAS"
    }, {
        icao: "CVU",
        callsign: "CANYON VIEW"
    }, {
        icao: "GUN",
        callsign: "HOOT"
    }, {
        icao: "LMK",
        callsign: "LANDMARK"
    }, {
        icao: "GRA",
        callsign: "GREAT AMERICAN"
    }, {
        icao: "GRA",
        callsign: "FLEX"
    }, {
        icao: "GLA",
        callsign: "LAKES AIR"
    }, {
        icao: "GLU",
        callsign: "LAKES CARGO"
    }, {
        icao: "GRP",
        callsign: "GREAT PLAINS"
    }, {
        icao: "GWL",
        callsign: "GREAT WALL"
    }, {
        icao: "GWA",
        callsign: "GW AIR"
    }, {
        icao: "HGB",
        callsign: "GREATER BAY"
    }, {
        icao: "HNA",
        callsign: "HELLENIC NAVY"
    }, {
        icao: "GFF",
        callsign: "GRIFFIN AIR"
    }, {
        icao: "GXA",
        callsign: "GRIXONA"
    }, {
        icao: "GZD",
        callsign: "GRIZODUBOVA AIR"
    }, {
        icao: "HTG",
        callsign: "GROSSMANN"
    }, {
        icao: "GSJ",
        callsign: "GROSSJET"
    }, {
        icao: "GHV",
        callsign: "GROUND HANDLING"
    }, {
        icao: "GPM",
        callsign: "GRUPOMED"
    }, {
        icao: "EJC",
        callsign: "GRUPOEJECUTIVA"
    }, {
        icao: "TAT",
        callsign: "TACACOSTARICA"
    }, {
        icao: "VMM",
        callsign: "VUELOS MED"
    }, {
        icao: "GMT",
        callsign: "GRUPOMONTERREY"
    }, {
        icao: "GSY",
        callsign: "GUARD AIR"
    }, {
        icao: "BSR",
        callsign: "BISSAU AIRLINES"
    }, {
        icao: "GIJ",
        callsign: "GUINEA AIRWAYS"
    }, {
        icao: "GNC",
        callsign: "GUINEA CARGO"
    }, {
        icao: "GIF",
        callsign: "GUINEE AIRLINES"
    }, {
        icao: "GEA",
        callsign: "GEASA"
    }, {
        icao: "GIQ",
        callsign: "GUIPAR"
    }, {
        icao: "CGH",
        callsign: "GUIZHOU"
    }, {
        icao: "GUS",
        callsign: "GUJA"
    }, {
        icao: "GUJ",
        callsign: "GUJARATAIR"
    }, {
        icao: "TSU",
        callsign: "TRANSAUTO"
    }, {
        icao: "GUF",
        callsign: "GULF AFRICAN"
    }, {
        icao: "GFA",
        callsign: "GULF AIR"
    }, {
        icao: "GAT",
        callsign: "GULF TRANS"
    }, {
        icao: "GCN",
        callsign: "GULF CENTRAL"
    }, {
        icao: "SFY",
        callsign: "SKY FLITE"
    }, {
        icao: "GPC",
        callsign: "AIR GULFPEARL"
    }, {
        icao: "GLF",
        callsign: "GULFSTREAM TEST"
    }, {
        icao: "GFS",
        callsign: "GULFSTAR"
    }, {
        icao: "GFT",
        callsign: "GULF FLIGHT"
    }, {
        icao: "GUL",
        callsign: "GULLAIR"
    }, {
        icao: "GUM",
        callsign: "GUM AIR"
    }, {
        icao: "GDH",
        callsign: "RISING SUN"
    }, {
        icao: "GWN",
        callsign: "GWYN"
    }, {
        icao: "ALX",
        callsign: "ALLCONGO"
    }, {
        icao: "AHT",
        callsign: "HELIAPRA"
    }, {
        icao: "ETI",
        callsign: "JETHAWK"
    }, {
        icao: "HSN",
        callsign: "H.S.AVIATION"
    }, {
        icao: "HAY",
        callsign: "HAMBURG AIRWAYS"
    }, {
        icao: "HCK",
        callsign: "HELICHARTER"
    }, {
        icao: "HTB",
        callsign: "HELIXCRAFT"
    }, {
        icao: "HAF",
        callsign: "HELLENIC AIR FORCE"
    }, {
        icao: "HRN",
        callsign: "HERONAIR"
    }, {
        icao: "HYP",
        callsign: "HYPERION"
    }, {
        icao: "HFM",
        callsign: "MOONRAKER"
    }, {
        icao: "HOP",
        callsign: "AIR HOP"
    }, {
        icao: "HLA",
        callsign: "HEAVYLIFT"
    }, {
        icao: "HWD",
        callsign: "FLITEWISE"
    }, {
        icao: "KTR",
        callsign: "COPTER TRANS"
    }, {
        icao: "FMS",
        callsign: "HADI"
    }, {
        icao: "HAG",
        callsign: "HAGELAND"
    }, {
        icao: "POW",
        callsign: "AIRNET"
    }, {
        icao: "HHN",
        callsign: "ROOSTER"
    }, {
        icao: "CHH",
        callsign: "HAINAN"
    }, {
        icao: "HTI",
        callsign: "HAITI INTERNATIONAL"
    }, {
        icao: "HRB",
        callsign: "HAITI AIRLINE"
    }, {
        icao: "HNR",
        callsign: "HANAIR"
    }, {
        icao: "HTC",
        callsign: "HAITI TRANSAIR"
    }, {
        icao: "HBC",
        callsign: "HALISA"
    }, {
        icao: "HAJ",
        callsign: "HAJVAIRY"
    }, {
        icao: "HKL",
        callsign: "HAK AIRLINE"
    }, {
        icao: "HLH",
        callsign: "HALA AIR"
    }, {
        icao: "HCV",
        callsign: "CREOLE"
    }, {
        icao: "HHI",
        callsign: "HAMBURG JET"
    }, {
        icao: "HJL",
        callsign: "BIZJET"
    }, {
        icao: "HMM",
        callsign: "HAMRA"
    }, {
        icao: "WVA",
        callsign: "WABASH VALLEY"
    }, {
        icao: "HGR",
        callsign: "HANG"
    }, {
        icao: "HGD",
        callsign: "HANGARD"
    }, {
        icao: "HAN",
        callsign: "HANSUNG AIR"
    }, {
        icao: "HLX",
        callsign: "YELLOW CAB"
    }, {
        icao: "HLF",
        callsign: "HAPAG LLOYD"
    }, {
        icao: "HAR",
        callsign: "HARBOR"
    }, {
        icao: "HMY",
        callsign: "HARMONY"
    }, {
        icao: "NBR",
        callsign: "NORBROOK"
    }, {
        icao: "PYN",
        callsign: "POYSTON"
    }, {
        icao: "HAV",
        callsign: "HAVILAH"
    }, {
        icao: "HAL",
        callsign: "HAWAIIAN"
    }, {
        icao: "HKR",
        callsign: "AIR HAW"
    }, {
        icao: "HMX",
        callsign: "HAWK MEXICO"
    }, {
        icao: "HKI",
        callsign: "HAWKEYE"
    }, {
        icao: "HZL",
        callsign: "HAZELTON"
    }, {
        icao: "HVY",
        callsign: "HEAVY CARGO"
    }, {
        icao: "HVL",
        callsign: "HEAVYLIFT INTERNATIONAL"
    }, {
        icao: "HBH",
        callsign: "HEBEI AIR"
    }, {
        icao: "HDC",
        callsign: "HELICATALUNA"
    }, {
        icao: "HCB",
        callsign: "HELEN"
    }, {
        icao: "HCL",
        callsign: "HELENCORP"
    }, {
        icao: "HHP",
        callsign: "HELENIA"
    }, {
        icao: "HLR",
        callsign: "HELI BULGARIA"
    }, {
        icao: "ALJ",
        callsign: "ALPIN HELI"
    }, {
        icao: "HEB",
        callsign: "HELIBERNINA"
    }, {
        icao: "HFR",
        callsign: "HELIFRANCE"
    }, {
        icao: "HYH",
        callsign: "HELIHUNGARY"
    }, {
        icao: "HLM",
        callsign: "HELIMIDWEST"
    }, {
        icao: "HLI",
        callsign: "HELI SAINTTROPEZ"
    }, {
        icao: "HTP",
        callsign: "HELI TRIP"
    }, {
        icao: "HLU",
        callsign: "HELI UNION"
    }, {
        icao: "MCM",
        callsign: "HELI AIR"
    }, {
        icao: "HHE",
        callsign: "HELI HOLLAND"
    }, {
        icao: "HRA",
        callsign: "ERICA"
    }, {
        icao: "HIF",
        callsign: "HIFSA"
    }, {
        icao: "HIG",
        callsign: "INTER GUYANNE"
    }, {
        icao: "HLK",
        callsign: "HELILINK"
    }, {
        icao: "HMC",
        callsign: "HELIAMERICA"
    }, {
        icao: "HEA",
        callsign: "HELIAVIA"
    }, {
        icao: "CDY",
        callsign: "CADDY"
    }, {
        icao: "HIB",
        callsign: "HELIBRAVO"
    }, {
        icao: "HLC",
        callsign: "HELICAP"
    }, {
        icao: "COV",
        callsign: "HELICENTRE"
    }, {
        icao: "HEL",
        callsign: "HELICOL"
    }, {
        icao: "HCP",
        callsign: "HELI CZECH"
    }, {
        icao: "JKY",
        callsign: "JOCKEY"
    }, {
        icao: "MVK",
        callsign: "MAVRIK"
    }, {
        icao: "HAP",
        callsign: "HELIPERSONAL"
    }, {
        icao: "HAA",
        callsign: "AGROFORESTAL"
    }, {
        icao: "HNT",
        callsign: "HELICOP INTER"
    }, {
        icao: "HEN",
        callsign: "HELINAC"
    }, {
        icao: "HHH",
        callsign: "HELICSA"
    }, {
        icao: "JBA",
        callsign: "HELIJET"
    }, {
        icao: "HDR",
        callsign: "HELIDRIFT"
    }, {
        icao: "SCO",
        callsign: "SWEDCOPTER"
    }, {
        icao: "OCE",
        callsign: "HELIOCEAN"
    }, {
        icao: "HCY",
        callsign: "HELIOS"
    }, {
        icao: "HLP",
        callsign: "HELIPISTAS"
    }, {
        icao: "HPL",
        callsign: "HELIPORTUGAL"
    }, {
        icao: "HEC",
        callsign: "HELICAMPECHE"
    }, {
        icao: "HSU",
        callsign: "HELIS"
    }, {
        icao: "HSI",
        callsign: "HELISWISS"
    }, {
        icao: "HLT",
        callsign: "HELITAFE"
    }, {
        icao: "HIT",
        callsign: "HELITALIA"
    }, {
        icao: "OFA",
        callsign: "OFAVI"
    }, {
        icao: "HLT",
        callsign: "HELITOURS"
    }, {
        icao: "HTA",
        callsign: "SCANBIRD"
    }, {
        icao: "HTS",
        callsign: "HELITRANS"
    }, {
        icao: "HLW",
        callsign: "HELIWORKS"
    }, {
        icao: "HEJ",
        callsign: "HELLAS JET"
    }, {
        icao: "FHE",
        callsign: "FLYHELLO"
    }, {
        icao: "HLG",
        callsign: "HELOG"
    }, {
        icao: "OAW",
        callsign: "HELVETIC"
    }, {
        icao: "HMS",
        callsign: "HEMUS AIR"
    }, {
        icao: "SSH",
        callsign: "SNOWSHOE"
    }, {
        icao: "MRX",
        callsign: "SPEEDMARK"
    }, {
        icao: "HED",
        callsign: "FLAPJACK"
    }, {
        icao: "HER",
        callsign: "HEX AIRLINE"
    }, {
        icao: "HHS",
        callsign: "HIJET"
    }, {
        icao: "HFY",
        callsign: "SKY FLYER"
    }, {
        icao: "HLB",
        callsign: "HIGHLINE"
    }, {
        icao: "HWY",
        callsign: "HIWAY"
    }, {
        icao: "HIM",
        callsign: "HIMALAYA"
    }, {
        icao: "HYM",
        callsign: "SKY MOLDOVA"
    }, {
        icao: "HYS",
        callsign: "SKY EUROPE"
    }, {
        icao: "HSH",
        callsign: "HASA"
    }, {
        icao: "HIS",
        callsign: "HISPANIOLA"
    }, {
        icao: "VMS",
        callsign: "VICTOR MIKE[32]"
    }, {
        icao: "HGA",
        callsign: "HOGAN AIR"
    }, {
        icao: "NTH",
        callsign: "NORTH AIR"
    }, {
        icao: "HOA",
        callsign: "HOLA"
    }, {
        icao: "HIN",
        callsign: "HOLDING GROUP"
    }, {
        icao: "HOL",
        callsign: "HOLIDAY"
    }, {
        icao: "HCC",
        callsign: "CZECH HOLIDAYS"
    }, {
        icao: "HTR",
        callsign: "HOLSTEN"
    }, {
        icao: "HMV",
        callsign: "HOMAC"
    }, {
        icao: "HAS",
        callsign: "HONDURAS AIR"
    }, {
        icao: "CRK",
        callsign: "BAUHINIA"
    }, {
        icao: "HKC",
        callsign: "MASCOT"
    }, {
        icao: "HKE",
        callsign: "HONGKONG SHUTTLE"
    }, {
        icao: "HTU",
        callsign: "HONGLAND"
    }, {
        icao: "HEX",
        callsign: "HONIARA CARGO"
    }, {
        icao: "HPJ",
        callsign: "HOPAJET"
    }, {
        icao: "QXE",
        callsign: "HORIZON AIR"
    }, {
        icao: "KOK",
        callsign: "KOKO"
    }, {
        icao: "HSM",
        callsign: "ALOFUKAIR"
    }, {
        icao: "HOR",
        callsign: "HORIZON"
    }, {
        icao: "HZA",
        callsign: "HORIZON"
    }, {
        icao: "HPS",
        callsign: "HORIZON PLUS"
    }, {
        icao: "HUD",
        callsign: "HUD"
    }, {
        icao: "HOZ",
        callsign: "HORIZONTES AEREOS"
    }, {
        icao: "HDI",
        callsign: "DINAMICOS"
    }, {
        icao: "HHO",
        callsign: "HOUSTON HELI"
    }, {
        icao: "GGV",
        callsign: "GREGG AIR"
    }, {
        icao: "OZU",
        callsign: "HOZAVIA"
    }, {
        icao: "HUB",
        callsign: "HUB"
    }, {
        icao: "HUS",
        callsign: "HUESSLER"
    }, {
        icao: "GMH",
        callsign: "HUGHES EXPRESS"
    }, {
        icao: "USW",
        callsign: "AKSAR"
    }, {
        icao: "HUV",
        callsign: "SILVER EAGLE"
    }, {
        icao: "HUF",
        callsign: "HUNGARIAN AIRFORCE"
    }, {
        icao: "UBD",
        callsign: "HAWLER"
    }, {
        icao: "HYA",
        callsign: "HYACK"
    }, {
        icao: "HYC",
        callsign: "HYDRO CARGO"
    }, {
        icao: "HYD",
        callsign: "HYDRO"
    }, {
        icao: "HKB",
        callsign: "CLASSIC"
    }, {
        icao: "MML",
        callsign: "TRANS MONGOLIA"
    }, {
        icao: "RPX",
        callsign: "RAPEX"
    }, {
        icao: "SRD",
        callsign: "COASTGUARD"
    }, {
        icao: "SRG",
        callsign: "RESCUE"
    }, {
        icao: "WHR",
        callsign: "WHIRLEYBIRD"
    }, {
        icao: "EXP",
        callsign: "ISLAND EXPRESS"
    }, {
        icao: "KAR",
        callsign: "IKAR"
    }, {
        icao: "IAC",
        callsign: "INTERCHARTER"
    }, {
        icao: "IDG",
        callsign: "INDIGO"
    }, {
        icao: "IFL",
        callsign: "EIFEL"
    }, {
        icao: "RDE",
        callsign: "FLIGHT RED"
    }, {
        icao: "IJM",
        callsign: "JET MANAGEMENT"
    }, {
        icao: "IKK",
        callsign: "IKIAIR"
    }, {
        icao: "IKN",
        callsign: "IKON"
    }, {
        icao: "BLU",
        callsign: "BLUENOSE"
    }, {
        icao: "IPA",
        callsign: "IPEC"
    }, {
        icao: "IPM",
        callsign: "SHIPEX"
    }, {
        icao: "LVB",
        callsign: "SILVERBIRD"
    }, {
        icao: "ISD",
        callsign: "ISDAVIA"
    }, {
        icao: "IBE",
        callsign: "IBERIA"
    }, {
        icao: "CSQ",
        callsign: "CHASQUI"
    }, {
        icao: "IBS",
        callsign: "IBEREXPRESS"
    }, {
        icao: "IBR",
        callsign: "IBERTOUR"
    }, {
        icao: "IBT",
        callsign: "IBERTRANS"
    }, {
        icao: "IWD",
        callsign: "IBERWORLD"
    }, {
        icao: "IBX",
        callsign: "IBEX"
    }, {
        icao: "IBC",
        callsign: "IBICENCA"
    }, {
        icao: "IBL",
        callsign: "CATOVAIR"
    }, {
        icao: "BBL",
        callsign: "BLUE"
    }, {
        icao: "IPR",
        callsign: "ICAR"
    }, {
        icao: "ICA",
        callsign: "ICARFLY"
    }, {
        icao: "ICD",
        callsign: "ICARO"
    }, {
        icao: "IUS",
        callsign: "ICARUS"
    }, {
        icao: "CIC",
        callsign: "AIR TRADER"
    }, {
        icao: "ICJ",
        callsign: "ICEJET"
    }, {
        icao: "ICE",
        callsign: "ICEAIR"
    }, {
        icao: "ICG",
        callsign: "ICELAND COAST"
    }, {
        icao: "RAC",
        callsign: "TUZLA AIR"
    }, {
        icao: "FRC",
        callsign: "FRANCHE COMPTE"
    }, {
        icao: "IFM",
        callsign: "ICOPTER"
    }, {
        icao: "IKR",
        callsign: "IKAROS"
    }, {
        icao: "CIO",
        callsign: "CIOCCO"
    }, {
        icao: "ILV",
        callsign: "ILAVIA"
    }, {
        icao: "IDL",
        callsign: "ILDEFONSO"
    }, {
        icao: "IAR",
        callsign: "ILIAMNA AIR"
    }, {
        icao: "ILL",
        callsign: "ILYICHAVIA"
    }, {
        icao: "IMR",
        callsign: "IMAER"
    }, {
        icao: "ITX",
        callsign: "IMPROTEX"
    }, {
        icao: "PNX",
        callsign: "PHOENIX"
    }, {
        icao: "IMG",
        callsign: "IMPERIAL AIRLINES"
    }, {
        icao: "IMT",
        callsign: "IMTREC"
    }, {
        icao: "IDE",
        callsign: "INDEPENDENCE AIR"
    }, {
        icao: "IDP",
        callsign: "INDEPENDENT"
    }, {
        icao: "IOA",
        callsign: "INDIA FIRST"
    }, {
        icao: "IGO",
        callsign: "IFLY"
    }, {
        icao: "IIL",
        callsign: "INDIA INTER"
    }, {
        icao: "IFC",
        callsign: "INDIAN AIRFORCE"
    }, {
        icao: "IAC",
        callsign: "INDAIR"
    }, {
        icao: "IDR",
        callsign: "INDICATOR"
    }, {
        icao: "IBU",
        callsign: "INDIGO BLUE"
    }, {
        icao: "AXC",
        callsign: "AIRSPUP"
    }, {
        icao: "IDA",
        callsign: "INTRA"
    }, {
        icao: "AWQ",
        callsign: "WAGON AIR"
    }, {
        icao: "IAA",
        callsign: "INDO LINES"
    }, {
        icao: "IPN",
        callsign: "NUSANTARA"
    }, {
        icao: "ITN",
        callsign: "TITANLUX"
    }, {
        icao: "FFI",
        callsign: "INFINIT"
    }, {
        icao: "IVA",
        callsign: "INNOTECH"
    }, {
        icao: "INC",
        callsign: "INSELAIR"
    }, {
        icao: "ICC",
        callsign: "CARTO"
    }, {
        icao: "INT",
        callsign: "INTAIRCO"
    }, {
        icao: "INL",
        callsign: "INTAL AVIA"
    }, {
        icao: "XRA",
        callsign: "INTENSIVE"
    }, {
        icao: "ITW",
        callsign: "INTER WINGS"
    }, {
        icao: "INX",
        callsign: "INTEREURO"
    }, {
        icao: "CAR",
        callsign: "QUEBEC ROMEO"
    }, {
        icao: "NTT",
        callsign: "INTERTROPIC"
    }, {
        icao: "TCU",
        callsign: "TROPAIR"
    }, {
        icao: "ITA",
        callsign: "CAFEX"
    }, {
        icao: "ICN",
        callsign: "INTERCANADIAN"
    }, {
        icao: "UGL",
        callsign: "UGLY VAN"
    }, {
        icao: "IMA",
        callsign: "INTERMOUNTAIN"
    }, {
        icao: "ITS",
        callsign: "INTERSTATE"
    }, {
        icao: "ILN",
        callsign: "INLINE"
    }, {
        icao: "NTE",
        callsign: "INTERMEX"
    }, {
        icao: "SUW",
        callsign: "ASTAIR"
    }, {
        icao: "IVT",
        callsign: "INTERAVIA"
    }, {
        icao: "IWY",
        callsign: "ISLANDWAYS"
    }, {
        icao: "ICT",
        callsign: "CONTAVIA"
    }, {
        icao: "ICP",
        callsign: "CHOPER"
    }, {
        icao: "IFT",
        callsign: "INTERFLIGHT"
    }, {
        icao: "RFL",
        callsign: "INFLY"
    }, {
        icao: "IFF",
        callsign: "INTERFREIGHT"
    }, {
        icao: "IGN",
        callsign: "DIVINE AIR"
    }, {
        icao: "ISN",
        callsign: "TRIBIRD"
    }, {
        icao: "IWY",
        callsign: "ISLANDWAYS"
    }, {
        icao: "AIJ",
        callsign: "ABC AEROLINEAS"
    }, {
        icao: "IHE",
        callsign: "INTERCOPTER"
    }, {
        icao: "IJW",
        callsign: "JET WEST"
    }, {
        icao: "ITK",
        callsign: "INTERLINK"
    }, {
        icao: "IAK",
        callsign: "AIR CARGO EGYPT"
    }, {
        icao: "EXX",
        callsign: "EXPRESS INTERNATIONAL"
    }, {
        icao: "NCC",
        callsign: "STARFLEET"
    }, {
        icao: "IAX",
        callsign: "INTERAIR SERVICES"
    }, {
        icao: "IBZ",
        callsign: "INTERBIZ"
    }, {
        icao: "IBY",
        callsign: "CENTRAL STAGE"
    }, {
        icao: "ICS",
        callsign: "INTERSERVI"
    }, {
        icao: "ICX",
        callsign: "INTEX"
    }, {
        icao: "RED",
        callsign: "RED CROSS"
    }, {
        icao: "IIG",
        callsign: "ALDAWLYH AIR"
    }, {
        icao: "IFX",
        callsign: "IFTA"
    }, {
        icao: "IJA",
        callsign: "IJET"
    }, {
        icao: "HSP",
        callsign: "HOSPITAL"
    }, {
        icao: "THN",
        callsign: "ATHENA"
    }, {
        icao: "RSQ",
        callsign: "SKYMEDIC"
    }, {
        icao: "ITH",
        callsign: "INTRANS NIGERIA"
    }, {
        icao: "IPT",
        callsign: "INTERPORT"
    }, {
        icao: "IKY",
        callsign: "GENERAL SKY"
    }, {
        icao: "ISK",
        callsign: "INTERSKY"
    }, {
        icao: "FWA",
        callsign: "FREEWAYAIR"
    }, {
        icao: "ITU",
        callsign: "INTERLOS"
    }, {
        icao: "INV",
        callsign: "INVER"
    }, {
        icao: "IND",
        callsign: "IONA"
    }, {
        icao: "IOA",
        callsign: "IOWA AIR"
    }, {
        icao: "IRA",
        callsign: "IRANAIR"
    }, {
        icao: "IRC",
        callsign: "ASEMAN"
    }, {
        icao: "IRG",
        callsign: "NAFT"
    }, {
        icao: "IAW",
        callsign: "IRAQI"
    }, {
        icao: "BIS",
        callsign: "IRBIS"
    }, {
        icao: "IRL",
        callsign: "IRISH"
    }, {
        icao: "RDK",
        callsign: "IRISH TRANS"
    }, {
        icao: "XMR",
        callsign: "AUTHORITY"
    }, {
        icao: "MZA",
        callsign: "IRTYSH AIRLINES"
    }, {
        icao: "KCE",
        callsign: "KACEY"
    }, {
        icao: "ISI",
        callsign: "ISLANDMEX"
    }, {
        icao: "ILF",
        callsign: "ISLAND FLIGHT"
    }, {
        icao: "XYZ",
        callsign: "RAINBIRD"
    }, {
        icao: "SOY",
        callsign: "SORIANO"
    }, {
        icao: "IOM",
        callsign: "ISLE AVIA"
    }, {
        icao: "SDY",
        callsign: "SANDY ISLE"
    }, {
        icao: "MTP",
        callsign: "METROCOPTER"
    }, {
        icao: "IAJ",
        callsign: "JARLAND"
    }, {
        icao: "ICB",
        callsign: "ICEBIRD"
    }, {
        icao: "ISW",
        callsign: "PINTADERA"
    }, {
        icao: "IGS",
        callsign: "ISLA GRANDE"
    }, {
        icao: "IOS",
        callsign: "SCILLONIA"
    }, {
        icao: "IAI",
        callsign: "ISRAEL AIRCRAFT"
    }, {
        icao: "ISR",
        callsign: "ISRAIR"
    }, {
        icao: "IST",
        callsign: "ISTANBUL"
    }, {
        icao: "ITY",
        callsign: "ITARROW"
    }, {
        icao: "ACL",
        callsign: "SPADA"
    }, {
        icao: "IFS",
        callsign: "RIVIERA"
    }, {
        icao: "IKA",
        callsign: "ITEKAIR"
    }, {
        icao: "IVS",
        callsign: "IVOIRE AERO"
    }, {
        icao: "IVW",
        callsign: "IVOIRAIRWAYS"
    }, {
        icao: "IJE",
        callsign: "IVOIRE JET"
    }, {
        icao: "IXR",
        callsign: "XBIRD"
    }, {
        icao: "IZM",
        callsign: "IZMIR"
    }, {
        icao: "IZA",
        callsign: "IZHAVIA"
    }, {
        icao: "JGJ",
        callsign: "GLOBAL JINGGONG"
    }, {
        icao: "JNY",
        callsign: "ROCKBAND"
    }, {
        icao: "JKR",
        callsign: "JOKER"
    }, {
        icao: "JCB",
        callsign: "JAYSEEBEE"
    }, {
        icao: "RFX",
        callsign: "REFLEX"
    }, {
        icao: "JEX",
        callsign: "JANEX"
    }, {
        icao: "JAZ",
        callsign: "JALWAYS"
    }, {
        icao: "JDA",
        callsign: "JAY DEE"
    }, {
        icao: "JDP",
        callsign: "RED PELICAN"
    }, {
        icao: "TQM",
        callsign: "TACOMA"
    }, {
        icao: "JMC",
        callsign: "JAYEMMSEE"
    }, {
        icao: "JSJ",
        callsign: "JS CHARTER"
    }, {
        icao: "JES",
        callsign: "JAYESS AVIATION"
    }, {
        icao: "JCK",
        callsign: "JACKSON"
    }, {
        icao: "JAE",
        callsign: "JADE CARGO"
    }, {
        icao: "JAW",
        callsign: "JAW"
    }, {
        icao: "JMB",
        callsign: "JAMBOAFRICA"
    }, {
        icao: "WWW",
        callsign: "JANET"
    }, {
        icao: "JAK",
        callsign: "YANZAR"
    }, {
        icao: "JAX",
        callsign: "JANAIR"
    }, {
        icao: "JAC",
        callsign: "COMMUTER"
    }, {
        icao: "JAL",
        callsign: "JAPANAIR"
    }, {
        icao: "JAL",
        callsign: "JBIRD"
    }, {
        icao: "JAA",
        callsign: "ASIA"
    }, {
        icao: "JTA",
        callsign: "JAI OCEAN"
    }, {
        icao: "JAT",
        callsign: "ROCKSMART"
    }, {
        icao: "JAP",
        callsign: "RED SMART"
    }, {
        icao: "JES",
        callsign: "SMARTBIRD"
    }, {
        icao: "JAT",
        callsign: "JAT"
    }, {
        icao: "JTY",
        callsign: "JATAYU"
    }, {
        icao: "JZR",
        callsign: "JAZEERA"
    }, {
        icao: "JJA",
        callsign: "JEJU AIR"
    }, {
        icao: "JNY",
        callsign: "JENAIR"
    }, {
        icao: "JPN",
        callsign: "JETPLAN"
    }, {
        icao: "JEA",
        callsign: "JETA"
    }, {
        icao: "JSI",
        callsign: "SISTEMA"
    }, {
        icao: "JAI",
        callsign: "JET AIRWAYS"
    }, {
        icao: "JTX",
        callsign: "JET ASPEN"
    }, {
        icao: "PJS",
        callsign: "JETAVIATION"
    }, {
        icao: "BZF",
        callsign: "BIZFLEET"
    }, {
        icao: "JAS",
        callsign: "JET SETTER"
    }, {
        icao: "JCF",
        callsign: "JET CENTER"
    }, {
        icao: "JCT",
        callsign: "JET CHARTER"
    }, {
        icao: "JCX",
        callsign: "JET CONNECT"
    }, {
        icao: "DWW",
        callsign: "DON JUAN"
    }, {
        icao: "JED",
        callsign: "JET EAST"
    }, {
        icao: "JEI",
        callsign: "JET EXECUTIVE"
    }, {
        icao: "RZA",
        callsign: "RAZOR"
    }, {
        icao: "CFT",
        callsign: "CASPER FREIGHT"
    }, {
        icao: "JGD",
        callsign: "JET GEEAND-DEE"
    }, {
        icao: "MJL",
        callsign: "MOLDJET"
    }, {
        icao: "JEK",
        callsign: "JET OPS"
    }, {
        icao: "HTL",
        callsign: "HEARTLAND"
    }, {
        icao: "JTL",
        callsign: "JET LINX"
    }, {
        icao: "JNR",
        callsign: "JET NORTE"
    }, {
        icao: "JRN",
        callsign: "JET RENT"
    }, {
        icao: "JDI",
        callsign: "JEDI"
    }, {
        icao: "JSA",
        callsign: "JETSTAR ASIA"
    }, {
        icao: "JDI",
        callsign: "JEDI"
    }, {
        icao: "JSM",
        callsign: "JET STREAM"
    }, {
        icao: "VTB",
        callsign: "SUXAIR"
    }, {
        icao: "JTF",
        callsign: "JETFIN"
    }, {
        icao: "JTC",
        callsign: "JETRANS"
    }, {
        icao: "JTT",
        callsign: "MOSCOW JET"
    }, {
        icao: "OPS",
        callsign: "OPSJET"
    }, {
        icao: "JSH",
        callsign: "STREAM AIR"
    }, {
        icao: "EXS",
        callsign: "CHANNEX"
    }, {
        icao: "JFU",
        callsign: "ARGAN"
    }, {
        icao: "OSW",
        callsign: "BEVO"
    }, {
        icao: "JBU",
        callsign: "JETBLUE"
    }, {
        icao: "JMG",
        callsign: "JET MAGIC"
    }, {
        icao: "JAA",
        callsign: "JET ASIA"
    }, {
        icao: "JAF",
        callsign: "BEAUTY"
    }, {
        icao: "JTL",
        callsign: "FIREFLY"
    }, {
        icao: "JAG",
        callsign: "JETALLIANCE"
    }, {
        icao: "JCS",
        callsign: "JETCLUB"
    }, {
        icao: "QNZ",
        callsign: "QANTAS JETCONNECT"
    }, {
        icao: "UEJ",
        callsign: "JETCORP"
    }, {
        icao: "JCC",
        callsign: "JETCRAFT"
    }, {
        icao: "JEF",
        callsign: "JETFLITE"
    }, {
        icao: "JFL",
        callsign: "LINEFLYER"
    }, {
        icao: "JFA",
        callsign: "MOSQUITO"
    }, {
        icao: "JIC",
        callsign: "JICJET"
    }, {
        icao: "JLX",
        callsign: "KEN JET"
    }, {
        icao: "JNL",
        callsign: "JETNETHERLANDS"
    }, {
        icao: "JNV",
        callsign: "JETNOVA"
    }, {
        icao: "JPO",
        callsign: "JETPRO"
    }, {
        icao: "MDJ",
        callsign: "JETRAN AIR"
    }, {
        icao: "JRI",
        callsign: "JETRIDER"
    }, {
        icao: "JEJ",
        callsign: "MEXJETS"
    }, {
        icao: "JEP",
        callsign: "JET PERSONALES"
    }, {
        icao: "JSE",
        callsign: "SERVIJETS"
    }, {
        icao: "JGO",
        callsign: "JETSGO"
    }, {
        icao: "JST",
        callsign: "JETSTAR"
    }, {
        icao: "JJP",
        callsign: "ORANGE LINER"
    }, {
        icao: "JKT",
        callsign: "KAITAK"
    }, {
        icao: "JXT",
        callsign: "VANNIN"
    }, {
        icao: "RSP",
        callsign: "REDSTRIPE"
    }, {
        icao: "JPQ",
        callsign: "JETT PAQUETERIA"
    }, {
        icao: "JEC",
        callsign: "TAIPAN"
    }, {
        icao: "JTD",
        callsign: "JETTIME"
    }, {
        icao: "JTN",
        callsign: "JET TEST"
    }, {
        icao: "JWY",
        callsign: "JETWAYS"
    }, {
        icao: "JXX",
        callsign: "JETBIRD"
    }, {
        icao: "JIB",
        callsign: "JIBAIRLINE"
    }, {
        icao: "JSW",
        callsign: "JIGSAW"
    }, {
        icao: "HKN",
        callsign: "HANKINS"
    }, {
        icao: "RAS",
        callsign: "SHANHIL"
    }, {
        icao: "JNA",
        callsign: "JIN AIR"
    }, {
        icao: "JDG",
        callsign: "LADYBLUE"
    }, {
        icao: "JBR",
        callsign: "JOBAIR"
    }, {
        icao: "JHN",
        callsign: "AIR JOHNSON"
    }, {
        icao: "JON",
        callsign: "JOHNSONSAIR"
    }, {
        icao: "JMJ",
        callsign: "JOHNSTON"
    }, {
        icao: "JMM",
        callsign: "JOICOMAR"
    }, {
        icao: "JMT",
        callsign: "JOMARTAXI"
    }, {
        icao: "ODI",
        callsign: "ODINN"
    }, {
        icao: "JAV",
        callsign: "JORDAN AVIATION"
    }, {
        icao: "JVK",
        callsign: "ISLANDIC"
    }, {
        icao: "ENZ",
        callsign: "ENZO"
    }, {
        icao: "JNJ",
        callsign: "JOURNEY JET"
    }, {
        icao: "JSX",
        callsign: "BIGSTRIPE"
    }, {
        icao: "JUR",
        callsign: "JUNKERS"
    }, {
        icao: "JFS",
        callsign: "JAEMCO"
    }, {
        icao: "JUC",
        callsign: "JUBA CARGO"
    }, {
        icao: "JUB",
        callsign: "JUBBA"
    }, {
        icao: "DKE",
        callsign: "DUKE"
    }, {
        icao: "DKH",
        callsign: "AIR JUNEYAO"
    }, {
        icao: "MEY",
        callsign: "MELODY"
    }, {
        icao: "DOJ",
        callsign: "JUSTICE"
    }, {
        icao: "KSA",
        callsign: "SKY CAMEL"
    }, {
        icao: "KCR",
        callsign: "KOLOB"
    }, {
        icao: "KHK",
        callsign: "SUNRAY"
    }, {
        icao: "KGZ",
        callsign: "BERMET"
    }, {
        icao: "KDC",
        callsign: "KAY DEE"
    }, {
        icao: "KMI",
        callsign: "KAYMILE AIR"
    }, {
        icao: "KLS",
        callsign: "KALSTAR"
    }, {
        icao: "KNI",
        callsign: "KALININGRAD AIR"
    }, {
        icao: "KLC",
        callsign: "CITY"
    }, {
        icao: "KLH",
        callsign: "KLM HELI"
    }, {
        icao: "KLM",
        callsign: "KLM"
    }, {
        icao: "QNK",
        callsign: "KABO"
    }, {
        icao: "KMC",
        callsign: "KAHAMA"
    }, {
        icao: "KAI",
        callsign: "KAISER"
    }, {
        icao: "CKS",
        callsign: "CONNIE"
    }, {
        icao: "KFS",
        callsign: "KALITTA"
    }, {
        icao: "KII",
        callsign: "DRAGSTER"
    }, {
        icao: "KES",
        callsign: "KALLAT EL SKER"
    }, {
        icao: "KMF",
        callsign: "KAMGAR"
    }, {
        icao: "KMP",
        callsign: "KAMPUCHEA"
    }, {
        icao: "KHE",
        callsign: "KANFEY HAEMEK"
    }, {
        icao: "KSU",
        callsign: "KSTATE"
    }, {
        icao: "AKT",
        callsign: "AVIAKARAT"
    }, {
        icao: "KRB",
        callsign: "KARIBU AIR"
    }, {
        icao: "KLG",
        callsign: "KARLOG"
    }, {
        icao: "KAJ",
        callsign: "KARTHAGO"
    }, {
        icao: "KAE",
        callsign: "KARTIKA"
    }, {
        icao: "KTV",
        callsign: "KATAVIA"
    }, {
        icao: "KTK",
        callsign: "KATEKAVIA"
    }, {
        icao: "KAT",
        callsign: "KATOAIR"
    }, {
        icao: "MVD",
        callsign: "AIR MINVODY"
    }, {
        icao: "KRN",
        callsign: "ANTOL"
    }, {
        icao: "KAW",
        callsign: "KAZWEST"
    }, {
        icao: "KAO",
        callsign: "KAZAVAIA"
    }, {
        icao: "KPH",
        callsign: "KAMA"
    }, {
        icao: "KKA",
        callsign: "KAKAIR"
    }, {
        icao: "KZS",
        callsign: "SPAKAZ"
    }, {
        icao: "KCH",
        callsign: "CAM AIR"
    }, {
        icao: "JFK",
        callsign: "KEENAIR"
    }, {
        icao: "KLX",
        callsign: "KELIX"
    }, {
        icao: "FKL",
        callsign: "KELNER"
    }, {
        icao: "KFA",
        callsign: "FLIGHTCRAFT"
    }, {
        icao: "KDA",
        callsign: "KENDELL"
    }, {
        icao: "KEN",
        callsign: "KENMORE"
    }, {
        icao: "KBA",
        callsign: "BOREK AIR"
    }, {
        icao: "KAH",
        callsign: "DEKAIR"
    }, {
        icao: "KQA",
        callsign: "KENYA"
    }, {
        icao: "KVS",
        callsign: "KEVIS"
    }, {
        icao: "KEY",
        callsign: "KEY AIR"
    }, {
        icao: "LYM",
        callsign: "KEY LIME"
    }, {
        icao: "FTP",
        callsign: "FOOTPRINT"
    }, {
        icao: "KEE",
        callsign: "KEYSTONE"
    }, {
        icao: "KZW",
        callsign: "KHALIFA AIR"
    }, {
        icao: "WKH",
        callsign: "WESTKHARKOV"
    }, {
        icao: "KHR",
        callsign: "KHAZAR"
    }, {
        icao: "KHP",
        callsign: "PHOTROS AIR"
    }, {
        icao: "KRV",
        callsign: "KHORIVAVIA"
    }, {
        icao: "KHO",
        callsign: "AIRCOMPANY KHORS"
    }, {
        icao: "KHY",
        callsign: "KHYBER"
    }, {
        icao: "UAK",
        callsign: "AVIATION PLANT"
    }, {
        icao: "KNG",
        callsign: "KING"
    }, {
        icao: "BEZ",
        callsign: "SEA BREEZE"
    }, {
        icao: "KFR",
        callsign: "KINGFISHER"
    }, {
        icao: "KNX",
        callsign: "KNIGHT FLIGHT"
    }, {
        icao: "KAS",
        callsign: "KINGSTON AIR"
    }, {
        icao: "KIP",
        callsign: "KINNARPS"
    }, {
        icao: "KNS",
        callsign: "KINSHASA AIRWAYS"
    }, {
        icao: "KTA",
        callsign: "VYATKAAVIA"
    }, {
        icao: "IRK",
        callsign: "KISHAIR"
    }, {
        icao: "KHA",
        callsign: "AIR KITTYHAWK"
    }, {
        icao: "KHC",
        callsign: "CARGO HAWK"
    }, {
        icao: "KIA",
        callsign: "KIWI AIR"
    }, {
        icao: "KRA",
        callsign: "REGIONAL"
    }, {
        icao: "KNA",
        callsign: "KUNMING AIR"
    }, {
        icao: "KHX",
        callsign: "RIZZ"
    }, {
        icao: "KGT",
        callsign: "KNIGHTLINER"
    }, {
        icao: "KOA",
        callsign: "KOANDA"
    }, {
        icao: "OYE",
        callsign: "KODA AIR"
    }, {
        icao: "KGL",
        callsign: "KOGALYM"
    }, {
        icao: "KOM",
        callsign: "COMJET"
    }, {
        icao: "KMA",
        callsign: "KOMI AVIA"
    }, {
        icao: "KMV",
        callsign: "KOMIINTER"
    }, {
        icao: "KNM",
        callsign: "KNAAPO"
    }, {
        icao: "KOB",
        callsign: "AUTOFLEX"
    }, {
        icao: "KAL",
        callsign: "KOREANAIR"
    }, {
        icao: "KMG",
        callsign: "KOSMAS CARGO"
    }, {
        icao: "KSM",
        callsign: "KOSMOS"
    }, {
        icao: "KOS",
        callsign: "KOSOVA"
    }, {
        icao: "WOK",
        callsign: "WOKAIR"
    }, {
        icao: "KJC",
        callsign: "KRASNOJARSKY AIR"
    }, {
        icao: "KFC",
        callsign: "KREMENCHUK"
    }, {
        icao: "KRG",
        callsign: "AVIAMONTAG"
    }, {
        icao: "KRO",
        callsign: "KROONK"
    }, {
        icao: "KRI",
        callsign: "KRYLO"
    }, {
        icao: "KYM",
        callsign: "CRIMEA AIR"
    }, {
        icao: "OPC",
        callsign: "OPTIC"
    }, {
        icao: "KIL",
        callsign: "AIR KUBAN"
    }, {
        icao: "KPA",
        callsign: "KUNPENG"
    }, {
        icao: "KBV",
        callsign: "SWECOAST"
    }, {
        icao: "KAC",
        callsign: "KUWAITI"
    }, {
        icao: "KZU",
        callsign: "KUZU CARGO"
    }, {
        icao: "QVR",
        callsign: "PEGASO"
    }, {
        icao: "KWN",
        callsign: "KWENA"
    }, {
        icao: "KGZ",
        callsign: "BERMET"
    }, {
        icao: "KTC",
        callsign: "DINARA"
    }, {
        icao: "LYN",
        callsign: "ALTYN AVIA"
    }, {
        icao: "KGA",
        callsign: "KYRGYZ"
    }, {
        icao: "DAM",
        callsign: "FLIGHT RESCUE"
    }, {
        icao: "KGB",
        callsign: "KEMIN"
    }, {
        icao: "KEW",
        callsign: "BLIZZARD"
    }, {
        icao: "AOE",
        callsign: "LIVINGSTONE AIR"
    }, {
        icao: "LZF",
        callsign: "SKYLEASE"
    }, {
        icao: "LHB",
        callsign: "FAMILY"
    }, {
        icao: "LGA",
        callsign: "LOGAIR"
    }, {
        icao: "LGC",
        callsign: "LEGACY AIR"
    }, {
        icao: "JKA",
        callsign: "JACKET"
    }, {
        icao: "LTY",
        callsign: "SKYDECK"
    }, {
        icao: "LWL",
        callsign: "CUB DRIVER"
    }, {
        icao: "LWA",
        callsign: "LIBYAN WINGS"
    }, {
        icao: "LCT",
        callsign: "TAR"
    }, {
        icao: "LAH",
        callsign: "STAR SHIP"
    }, {
        icao: "LJY",
        callsign: "ELJAY"
    }, {
        icao: "LRB",
        callsign: "LADY RACINE"
    }, {
        icao: "PHO",
        callsign: "PHOTOFLIGHT"
    }, {
        icao: "LEX",
        callsign: "LEX"
    }, {
        icao: "FNT",
        callsign: "FLIGHT INTERNATIONAL"
    }, {
        icao: "LAB",
        callsign: "LAB"
    }, {
        icao: "LRC",
        callsign: "LACSA"
    }, {
        icao: "LDE",
        callsign: "LADE"
    }, {
        icao: "BNX",
        callsign: "AIR BARINAS"
    }, {
        icao: "DSM",
        callsign: "LAN AR"
    }, {
        icao: "TAM",
        callsign: "TAM"
    }, {
        icao: "LCO",
        callsign: "LAN CARGO"
    }, {
        icao: "LAN",
        callsign: "LAN CHILE"
    }, {
        icao: "ARE",
        callsign: "LAN COLOMBIA"
    }, {
        icao: "LNC",
        callsign: "LANCANA"
    }, {
        icao: "LXP",
        callsign: "LANEX"
    }, {
        icao: "LAP",
        callsign: "PARAGUAYA"
    }, {
        icao: "LPE",
        callsign: "LANPERU"
    }, {
        icao: "LSA",
        callsign: "INTERNACIONAL"
    }, {
        icao: "APT",
        callsign: "LAP"
    }, {
        icao: "LCB",
        callsign: "BUSRE"
    }, {
        icao: "LOT",
        callsign: "POLLOT"
    }, {
        icao: "JKA",
        callsign: "JACKET"
    }, {
        icao: "LTE",
        callsign: "FUN JET"
    }, {
        icao: "LTO",
        callsign: "BILLA TRANSPORT"
    }, {
        icao: "LTU",
        callsign: "LTU"
    }, {
        icao: "JFC",
        callsign: "JETFLEET"
    }, {
        icao: "LUK",
        callsign: "LUKOIL"
    }, {
        icao: "ASK",
        callsign: "AIR SASK"
    }, {
        icao: "LVT",
        callsign: "TAXIVALENCIANA"
    }, {
        icao: "SKQ",
        callsign: "SKYLAB"
    }, {
        icao: "LAL",
        callsign: "LAB AIR"
    }, {
        icao: "HCA",
        callsign: "HAVASU"
    }, {
        icao: "LKL",
        callsign: "LAKELAND"
    }, {
        icao: "LKR",
        callsign: "LAKER"
    }, {
        icao: "LBH",
        callsign: "LAKER BAHAMAS"
    }, {
        icao: "LMR",
        callsign: "LAMAIR"
    }, {
        icao: "TCR",
        callsign: "TICOS"
    }, {
        icao: "ISL",
        callsign: "ISLANDIA"
    }, {
        icao: "PAP",
        callsign: "PROFLIGHT"
    }, {
        icao: "LKN",
        callsign: "LANKAIR"
    }, {
        icao: "RLN",
        callsign: "AERO LANKA"
    }, {
        icao: "LZA",
        callsign: "AEROLANZA"
    }, {
        icao: "LZT",
        callsign: "BARAKA"
    }, {
        icao: "LAO",
        callsign: "LAO"
    }, {
        icao: "LKA",
        callsign: "NAKLAO"
    }, {
        icao: "LLL",
        callsign: "LAVIE"
    }, {
        icao: "LPN",
        callsign: "LAOAG AIR"
    }, {
        icao: "LRD",
        callsign: "LAREDO AIR"
    }, {
        icao: "OTN",
        callsign: "LASTP"
    }, {
        icao: "LTC",
        callsign: "LATCHARTER"
    }, {
        icao: "LAF",
        callsign: "LATVIAN AIRFORCE"
    }, {
        icao: "LDA",
        callsign: "LAUDA AIR"
    }, {
        icao: "LDM",
        callsign: "LAUDA MOTION"
    }, {
        icao: "LDI",
        callsign: "LAUDA ITALY"
    }, {
        icao: "LEP",
        callsign: "LAUGHLIN EXPRESS"
    }, {
        icao: "LSU",
        callsign: "LAUS AIR"
    }, {
        icao: "LAR",
        callsign: "LAWRENCE"
    }, {
        icao: "LAY",
        callsign: "LAYANG"
    }, {
        icao: "LPL",
        callsign: "LEASEA-PLANE"
    }, {
        icao: "LAQ",
        callsign: "LAT"
    }, {
        icao: "LAT",
        callsign: "LEBANESE AIR"
    }, {
        icao: "LAD",
        callsign: "LADCOAIR"
    }, {
        icao: "LEB",
        callsign: "LEBAP"
    }, {
        icao: "LCA",
        callsign: "LECONTE"
    }, {
        icao: "LIA",
        callsign: "LIAT"
    }, {
        icao: "LGD",
        callsign: "LEGENDARY"
    }, {
        icao: "LWD",
        callsign: "LEISURE WORLD"
    }, {
        icao: "LEN",
        callsign: "LENTINI"
    }, {
        icao: "LOR",
        callsign: "LEO CHARTER"
    }, {
        icao: "LEL",
        callsign: "LEONAVIA"
    }, {
        icao: "LVL",
        callsign: "LEVEL"
    }, {
        icao: "LYW",
        callsign: "LIBYAN AIRWAYS"
    }, {
        icao: "LAA",
        callsign: "LIBAIR"
    }, {
        icao: "LCR",
        callsign: "LIBAC"
    }, {
        icao: "LTA",
        callsign: "LIFT"
    }, {
        icao: "LCG",
        callsign: "CONGOLAISE"
    }, {
        icao: "LKD",
        callsign: "LATCHAD"
    }, {
        icao: "LME",
        callsign: "LIMAIR EXPRESS"
    }, {
        icao: "GCB",
        callsign: "LINACONGO"
    }, {
        icao: "LSY",
        callsign: "LINDSAY AIR"
    }, {
        icao: "NOT",
        callsign: "COSTA NORTE"
    }, {
        icao: "LMC",
        callsign: "LINEAS DECARGA"
    }, {
        icao: "LNP",
        callsign: "SAPSA"
    }, {
        icao: "NEG",
        callsign: "AGUAS NEGRAS"
    }, {
        icao: "LER",
        callsign: "LASER"
    }, {
        icao: "TUY",
        callsign: "AEREOTUY"
    }, {
        icao: "ALR",
        callsign: "AEROLAIRE"
    }, {
        icao: "LCD",
        callsign: "LINEAS AZTECA"
    }, {
        icao: "LCN",
        callsign: "CANEDO"
    }, {
        icao: "LCM",
        callsign: "LINEAS COMERCIALES"
    }, {
        icao: "EDD",
        callsign: "LINEAS DURANGO"
    }, {
        icao: "EDR",
        callsign: "ELDORADRO"
    }, {
        icao: "FED",
        callsign: "FEDERALES"
    }, {
        icao: "LMN",
        callsign: "LINEAS MONARCA"
    }, {
        icao: "LIJ",
        callsign: "LINEAS JOSE"
    }, {
        icao: "UMA",
        callsign: "HUMAYA"
    }, {
        icao: "LEC",
        callsign: "LECA"
    }, {
        icao: "SMS",
        callsign: "SANTOMENSES"
    }, {
        icao: "LAM",
        callsign: "MOZAMBIQUE"
    }, {
        icao: "WGT",
        callsign: "WORLDGATE"
    }, {
        icao: "LNI",
        callsign: "LION INTER"
    }, {
        icao: "LEU",
        callsign: "LIONSAIR"
    }, {
        icao: "LYF",
        callsign: "LITHUANIAN AIRFORCE"
    }, {
        icao: "LRA",
        callsign: "LITTLE RED"
    }, {
        icao: "LVG",
        callsign: "LIVINGSTON"
    }, {
        icao: "SNG",
        callsign: "SNOW EAGLE"
    }, {
        icao: "LLB",
        callsign: "LLOYDAEREO"
    }, {
        icao: "LNA",
        callsign: "ELNAIR"
    }, {
        icao: "LAC",
        callsign: "LOCKHEED"
    }, {
        icao: "CBD",
        callsign: "CATBIRD"
    }, {
        icao: "LNG",
        callsign: "LIGHTNING"
    }, {
        icao: "LOG",
        callsign: "LOGAN"
    }, {
        icao: "CLV",
        callsign: "AEROTRAINING"
    }, {
        icao: "LMS",
        callsign: "LOMAS"
    }, {
        icao: "LCY",
        callsign: "LONDON CITY"
    }, {
        icao: "LNX",
        callsign: "LONEX"
    }, {
        icao: "LOV",
        callsign: "LOVEAIR"
    }, {
        icao: "LHC",
        callsign: "MUSTANG"
    }, {
        icao: "LSS",
        callsign: "LONE STAR"
    }, {
        icao: "ORA",
        callsign: "LONG ISLAND"
    }, {
        icao: "LHA",
        callsign: "AIR CANTON"
    }, {
        icao: "LGT",
        callsign: "LONGTAIL"
    }, {
        icao: "CDC",
        callsign: "LOONG AIR"
    }, {
        icao: "LRR",
        callsign: "LORRAINE"
    }, {
        icao: "LSC",
        callsign: "CEDROS"
    }, {
        icao: "TAS",
        callsign: "LOTUS FLOWER"
    }, {
        icao: "LTW",
        callsign: "TWENTAIR"
    }, {
        icao: "LKE",
        callsign: "LUCKY AIR"
    }, {
        icao: "LUT",
        callsign: "LUGO"
    }, {
        icao: "LVD",
        callsign: "AIR SANTE"
    }, {
        icao: "DLH",
        callsign: "LUFTHANSA"
    }, {
        icao: "GEC",
        callsign: "LUFTHANSA CARGO"
    }, {
        icao: "CLH",
        callsign: "HANSALINE"
    }, {
        icao: "LHT",
        callsign: "LUFTHANSA TECHNIK"
    }, {
        icao: "LTF",
        callsign: "GARFIELD"
    }, {
        icao: "LTR",
        callsign: "LUFT TRANSPORT"
    }, {
        icao: "LHS",
        callsign: "ENTERPRISE LUHANSK"
    }, {
        icao: "UNY",
        callsign: "UNIVERSITY"
    }, {
        icao: "LGL",
        callsign: "LUXAIR"
    }, {
        icao: "LXA",
        callsign: "RED LION"
    }, {
        icao: "LUV",
        callsign: "LUX RESCUE"
    }, {
        icao: "LFE",
        callsign: "LUX EXPRESS"
    }, {
        icao: "LUZ",
        callsign: "LISBON JET"
    }, {
        icao: "UKW",
        callsign: "UKRAINE WEST"
    }, {
        icao: "LYD",
        callsign: "LYDDAIR"
    }, {
        icao: "LCH",
        callsign: "LYNCH AIR"
    }, {
        icao: "LYC",
        callsign: "LYNDEN"
    }, {
        icao: "LWG",
        callsign: "LUXWING"
    }, {
        icao: "DAT",
        callsign: "DAUNTLESS"
    }, {
        icao: "LXF",
        callsign: "LYNX FLIGHT"
    }, {
        icao: "SSX",
        callsign: "SHASTA"
    }, {
        icao: "LYX",
        callsign: "LYNX AIR"
    }, {
        icao: "LPR",
        callsign: "LAPA"
    }, {
        icao: "LAU",
        callsign: "SURAMERICANO"
    }, {
        icao: "SNG",
        callsign: "SNOW EAGLE"
    }, {
        icao: "LYB",
        callsign: "HIGHLANDS"
    }, {
        icao: "DQA",
        callsign: "SKYSURFER"
    }, {
        icao: "MMH",
        callsign: "NIGHT RIDER"
    }, {
        icao: "HOG",
        callsign: "HOGAN AIR"
    }, {
        icao: "MTS",
        callsign: "MED SERVICE"
    }, {
        icao: "MSF",
        callsign: "MEINSHENG"
    }, {
        icao: "MXS",
        callsign: "MILLON EXPRESS"
    }, {
        icao: "MHF",
        callsign: "AIR MARITIME"
    }, {
        icao: "MRK",
        callsign: "MARKAIR"
    }, {
        icao: "MWM",
        callsign: "MODERNAIR"
    }, {
        icao: "MSJ",
        callsign: "MAGNUM AIR"
    }, {
        icao: "MWI",
        callsign: "MALAWIAN"
    }, {
        icao: "MYP",
        callsign: "MANN ROYAL"
    }, {
        icao: "RDK",
        callsign: "RED DUKE"
    }, {
        icao: "MLV",
        callsign: "MULTI VALLE"
    }, {
        icao: "MMJ",
        callsign: "MACAUJET"
    }, {
        icao: "MXF",
        callsign: "MAXFLIGHT"
    }, {
        icao: "MXD",
        callsign: "MALINDO EXPRESS"
    }, {
        icao: "MJC",
        callsign: "AIR MANDA"
    }, {
        icao: "PLG",
        callsign: "PILGRIM"
    }, {
        icao: "DZR",
        callsign: "DOZER"
    }, {
        icao: "MFB",
        callsign: "MOUNTAINHELI"
    }, {
        icao: "HTL",
        callsign: "HOTLINE"
    }, {
        icao: "JNH",
        callsign: "JONAH"
    }, {
        icao: "MCF",
        callsign: "MAC FOTO"
    }, {
        icao: "MRG",
        callsign: "MANAG'AIR"
    }, {
        icao: "MPJ",
        callsign: "MAPJET"
    }, {
        icao: "TFG",
        callsign: "TRAFALGAR"
    }, {
        icao: "MAA",
        callsign: "MAS CARGA"
    }, {
        icao: "MWG",
        callsign: "MASWINGS"
    }, {
        icao: "MAK",
        callsign: "MAKAVIO"
    }, {
        icao: "MCC",
        callsign: "DISCOVERY"
    }, {
        icao: "MGA",
        callsign: "MAG AVACION"
    }, {
        icao: "JLA",
        callsign: "SALLINE"
    }, {
        icao: "MGL",
        callsign: "MONGOL AIR"
    }, {
        icao: "MNC",
        callsign: "MUNCIE"
    }, {
        icao: "MKA",
        callsign: "KRUGERAIR"
    }, {
        icao: "MNB",
        callsign: "BLACK SEA"
    }, {
        icao: "EBF",
        callsign: "SKYRUNNER"
    }, {
        icao: "MCV",
        callsign: "MTC AVIACION"
    }, {
        icao: "MAQ",
        callsign: "MAC AVIATION"
    }, {
        icao: "MCN",
        callsign: "MAC DAN"
    }, {
        icao: "MCS",
        callsign: "MACAIR"
    }, {
        icao: "MDH",
        callsign: "MADINA AIR"
    }, {
        icao: "DAN",
        callsign: "MAERSKAIR"
    }, {
        icao: "MSK",
        callsign: "BLUESTAR"
    }, {
        icao: "MJB",
        callsign: "MAGIC BLUE"
    }, {
        icao: "MGR",
        callsign: "MAGNA AIR"
    }, {
        icao: "MLH",
        callsign: "MAHALO"
    }, {
        icao: "IRM",
        callsign: "MAHAN AIR"
    }, {
        icao: "MZS",
        callsign: "MAHFOOZ"
    }, {
        icao: "MAT",
        callsign: "MAINEAV"
    }, {
        icao: "MAJ",
        callsign: "MAGIC AIR"
    }, {
        icao: "AKM",
        callsign: "MAKAIR"
    }, {
        icao: "MLX",
        callsign: "MALAWI EXPRESS"
    }, {
        icao: "MKK",
        callsign: "AEROKEY"
    }, {
        icao: "MAS",
        callsign: "MALAYSIAN"
    }, {
        icao: "MAE",
        callsign: "MALI AIREXPRESS"
    }, {
        icao: "VXP",
        callsign: "AVION EXPRESS"
    }, {
        icao: "MTZ",
        callsign: "MALI AIRWAYS"
    }, {
        icao: "MLC",
        callsign: "MALILA"
    }, {
        icao: "MLS",
        callsign: "MALLAIRWAYS"
    }, {
        icao: "LOD",
        callsign: "LOGIC"
    }, {
        icao: "SCW",
        callsign: "SCANWING"
    }, {
        icao: "MAC",
        callsign: "MALTA CHARTER"
    }, {
        icao: "MWS",
        callsign: "MALTA WINGS"
    }, {
        icao: "MAH",
        callsign: "MALEV"
    }, {
        icao: "MLB",
        callsign: "MANAF"
    }, {
        icao: "MDL",
        callsign: "MANDALA"
    }, {
        icao: "MDA",
        callsign: "MANDARIN"
    }, {
        icao: "MNO",
        callsign: "TULCA"
    }, {
        icao: "MHN",
        callsign: "MANHATTAN"
    }, {
        icao: "MTO",
        callsign: "MARATHON"
    }, {
        icao: "MNR",
        callsign: "TEEMOL"
    }, {
        icao: "MAN",
        callsign: "MANNION"
    }, {
        icao: "MTS",
        callsign: "MANTRUST"
    }, {
        icao: "MNX",
        callsign: "MANX"
    }, {
        icao: "MAD",
        callsign: "MAPLE AIR"
    }, {
        icao: "MAR",
        callsign: "MARCH"
    }, {
        icao: "MCP",
        callsign: "MARCOPOLO"
    }, {
        icao: "MGI",
        callsign: "MARGHI"
    }, {
        icao: "MRK",
        callsign: "MARKAIR"
    }, {
        icao: "MKO",
        callsign: "GOSHAWK"
    }, {
        icao: "MRW",
        callsign: "AVIAMARS"
    }, {
        icao: "MCE",
        callsign: "MARSHALL"
    }, {
        icao: "MSL",
        callsign: "MARSLANDAIR"
    }, {
        icao: "MBE",
        callsign: "MARTIN"
    }, {
        icao: "MPH",
        callsign: "MARTINAIR"
    }, {
        icao: "MRA",
        callsign: "MARTEX"
    }, {
        icao: "MFA",
        callsign: "SEAHORSE"
    }, {
        icao: "MVN",
        callsign: "MARVIN"
    }, {
        icao: "TRP",
        callsign: "TROOPER"
    }, {
        icao: "MTH",
        callsign: "RESEARCH"
    }, {
        icao: "MSY",
        callsign: "MASSEY"
    }, {
        icao: "MSW",
        callsign: "MASTER AIRWAYS"
    }, {
        icao: "LMJ",
        callsign: "MASTERJET"
    }, {
        icao: "MIA",
        callsign: "MAURIA"
    }, {
        icao: "MNV",
        callsign: "NAVALE"
    }, {
        icao: "MRF",
        callsign: "MAURFRET"
    }, {
        icao: "MWY",
        callsign: "MAURITANIENNE"
    }, {
        icao: "MDE",
        callsign: "MAURITRANS"
    }, {
        icao: "MVR",
        callsign: "MAVAIR"
    }, {
        icao: "MVL",
        callsign: "MAVIAL"
    }, {
        icao: "MAI",
        callsign: "MAX AVIA"
    }, {
        icao: "MSF",
        callsign: "MAXESA"
    }, {
        icao: "MAX",
        callsign: "MAX AVIATION"
    }, {
        icao: "MXL",
        callsign: "MAXAIR"
    }, {
        icao: "MXU",
        callsign: "CARGO MAX"
    }, {
        icao: "MXJ",
        callsign: "MAXJET"
    }, {
        icao: "MXS",
        callsign: "MAXSUSAVIA"
    }, {
        icao: "MXP",
        callsign: "BEECHNUT"
    }, {
        icao: "MYD",
        callsign: "MYLAND"
    }, {
        icao: "MYI",
        callsign: "MAYAIR"
    }, {
        icao: "MBS",
        callsign: "MBACHI AIR"
    }, {
        icao: "MCH",
        callsign: "MACLINE"
    }, {
        icao: "MKL",
        callsign: "MCCALL"
    }, {
        icao: "DAC",
        callsign: "DACO"
    }, {
        icao: "MDS",
        callsign: "MIDSOUTH"
    }, {
        icao: "MEK",
        callsign: "MEDTRANS"
    }, {
        icao: "MDM",
        callsign: "MEDAVIA"
    }, {
        icao: "MRZ",
        callsign: "MARS"
    }, {
        icao: "MCL",
        callsign: "MEDIC"
    }, {
        icao: "MDF",
        callsign: "MEDFREIGHT"
    }, {
        icao: "MEJ",
        callsign: "MEDJET"
    }, {
        icao: "MGK",
        callsign: "MEGLA"
    }, {
        icao: "MEL",
        callsign: "MEGA AIR"
    }, {
        icao: "MKN",
        callsign: "MEKONG AIRLINES"
    }, {
        icao: "MNJ",
        callsign: "MENAJET"
    }, {
        icao: "MXX",
        callsign: "MERCHANT"
    }, {
        icao: "MEC",
        callsign: "MERCAIR"
    }, {
        icao: "POV",
        callsign: "AIR POLTAVA"
    }, {
        icao: "MRD",
        callsign: "MERIDIAN"
    }, {
        icao: "MHL",
        callsign: "HASSIMAIR"
    }, {
        icao: "DSL",
        callsign: "DIESEL"
    }, {
        icao: "MEM",
        callsign: "MERIDIAN CHERRY"
    }, {
        icao: "ISS",
        callsign: "MERIDIANA"
    }, {
        icao: "MEI",
        callsign: "AVALON"
    }, {
        icao: "MNA",
        callsign: "MERPATI"
    }, {
        icao: "ASH",
        callsign: "AIR SHUTTLE"
    }, {
        icao: "MES",
        callsign: "MESABA"
    }, {
        icao: "MSQ",
        callsign: "META"
    }, {
        icao: "MET",
        callsign: "METMAN"
    }, {
        icao: "MER",
        callsign: "METHOW"
    }, {
        icao: "MEX",
        callsign: "EAGLE EXPRESS"
    }, {
        icao: "MTR",
        callsign: "METRO"
    }, {
        icao: "MTJ",
        callsign: "METROJET"
    }, {
        icao: "PIX",
        callsign: "METROPIX"
    }, {
        icao: "MPS",
        callsign: "METRO REGIONAL"
    }, {
        icao: "MXB",
        callsign: "MEX BLUE"
    }, {
        icao: "MJT",
        callsign: "MEJETS"
    }, {
        icao: "MXC",
        callsign: "MEXICARGO"
    }, {
        icao: "MXA",
        callsign: "MEXICANA"
    }, {
        icao: "MXT",
        callsign: "TRANSMEX"
    }, {
        icao: "HUR",
        callsign: "HURRICANE CHARTER"
    }, {
        icao: "BSK",
        callsign: "BISCAYNE"
    }, {
        icao: "OWL",
        callsign: "NIGHT OWL"
    }, {
        icao: "MPT",
        callsign: "MIAPET"
    }, {
        icao: "WIZ",
        callsign: "WIZARD"
    }, {
        icao: "NYL",
        callsign: "NILE"
    }, {
        icao: "MPA",
        callsign: "MID PAC"
    }, {
        icao: "MJR",
        callsign: "MAJOR"
    }, {
        icao: "MEA",
        callsign: "CEDAR JET"
    }, {
        icao: "MFR",
        callsign: "MIDLINE FREIGHT"
    }, {
        icao: "MIS",
        callsign: "MIDSTATE"
    }, {
        icao: "MDW",
        callsign: "MIDWAY"
    }, {
        icao: "MDW",
        callsign: "MIDWAY"
    }, {
        icao: "FLA",
        callsign: "PALM"
    }, {
        icao: "FAX",
        callsign: "FAIRFAX"
    }, {
        icao: "MEP",
        callsign: "MIDEX"
    }, {
        icao: "NIT",
        callsign: "NIGHTTRAIN"
    }, {
        icao: "MWT",
        callsign: "MIDWEST"
    }, {
        icao: "HTE",
        callsign: "HELICOPTERSMEXICO"
    }, {
        icao: "MLR",
        callsign: "MIHIN LANKA"
    }, {
        icao: "MAB",
        callsign: "MILLARDAIR"
    }, {
        icao: "RJM",
        callsign: "MILLEN"
    }, {
        icao: "MLK",
        callsign: "NIGERJET"
    }, {
        icao: "DLK",
        callsign: "DEKKANLANKA"
    }, {
        icao: "MFS",
        callsign: "MILLER TIME"
    }, {
        icao: "OXO",
        callsign: "MILL AIR"
    }, {
        icao: "MIM",
        callsign: "MIMINO"
    }, {
        icao: "OMR",
        callsign: "ORMINE"
    }, {
        icao: "EBE",
        callsign: "MINEBEA"
    }, {
        icao: "MAZ",
        callsign: "MINES"
    }, {
        icao: "MNL",
        callsign: "MINILINER"
    }, {
        icao: "MNS",
        callsign: "MINISTIC"
    }, {
        icao: "WDG",
        callsign: "WATCHDOG"
    }, {
        icao: "LIR",
        callsign: "LISLINE"
    }, {
        icao: "MIC",
        callsign: "MINT AIRWAYS"
    }, {
        icao: "MIR",
        callsign: "MIRAMICHI"
    }, {
        icao: "MIF",
        callsign: "MIRAS"
    }, {
        icao: "MAF",
        callsign: "MISSI"
    }, {
        icao: "MSN",
        callsign: "MISIONAIR"
    }, {
        icao: "MRN",
        callsign: "MARIANNE"
    }, {
        icao: "BDG",
        callsign: "BULLDOG"
    }, {
        icao: "MVA",
        callsign: "VALAIR"
    }, {
        icao: "MSA",
        callsign: "AIRMERCI"
    }, {
        icao: "MJF",
        callsign: "EMEXPRESS"
    }, {
        icao: "MBO",
        callsign: "MOBIL"
    }, {
        icao: "MXE",
        callsign: "MOZAMBIQUE EXPRESS"
    }, {
        icao: "MFZ",
        callsign: "MOFAZ AIR"
    }, {
        icao: "MOW",
        callsign: "MOHAWK AIR"
    }, {
        icao: "MUL",
        callsign: "MUKULELE"
    }, {
        icao: "MLE",
        callsign: "MOLDAERO"
    }, {
        icao: "MDV",
        callsign: "MOLDAVIAN"
    }, {
        icao: "MVG",
        callsign: "MOLDOVASTATE"
    }, {
        icao: "RRV",
        callsign: "SKYROVER"
    }, {
        icao: "MON",
        callsign: "MONARCH"
    }, {
        icao: "MNH",
        callsign: "MONARCH AIR"
    }, {
        icao: "MFC",
        callsign: "EAST WIND"
    }, {
        icao: "MDB",
        callsign: "MONDEAIR CARGO"
    }, {
        icao: "MTI",
        callsign: "MONTERREY AIR"
    }, {
        icao: "MKY",
        callsign: "MONKY"
    }, {
        icao: "MGX",
        callsign: "MONTENEGRO"
    }, {
        icao: "MNT",
        callsign: "MONTSERRAT"
    }, {
        icao: "MNY",
        callsign: "MOONEY FLIGHT"
    }, {
        icao: "MAL",
        callsign: "MORNINGSTAR"
    }, {
        icao: "MSS",
        callsign: "WASATCH"
    }, {
        icao: "MRO",
        callsign: "MORRISON"
    }, {
        icao: "GAI",
        callsign: "GROMOV AIRLINE"
    }, {
        icao: "MPI",
        callsign: "MOSPHIL"
    }, {
        icao: "MSI",
        callsign: "MOTOR SICH"
    }, {
        icao: "NZM",
        callsign: "MOUNTCOOK"
    }, {
        icao: "MTN",
        callsign: "MOUNTAIN"
    }, {
        icao: "MTC",
        callsign: "MOUNTAIN LEONE"
    }, {
        icao: "PKP",
        callsign: "PIKES PEAK"
    }, {
        icao: "BRR",
        callsign: "MOUNTAIN AIR"
    }, {
        icao: "MBI",
        callsign: "MOUNTAIN BIRD"
    }, {
        icao: "MHA",
        callsign: "MOUNTAIN HIGH"
    }, {
        icao: "MPC",
        callsign: "MOUNTAIN PACIFIC"
    }, {
        icao: "MTV",
        callsign: "MOUNTAIN VALLEY"
    }, {
        icao: "CMJ",
        callsign: "MUDANJIANG"
    }, {
        icao: "MTX",
        callsign: "MULTITAXI"
    }, {
        icao: "WBR",
        callsign: "WEBER"
    }, {
        icao: "MFT",
        callsign: "YORKAIR"
    }, {
        icao: "MNZ",
        callsign: "MURMAN AIR"
    }, {
        icao: "MUA",
        callsign: "MURRAY AIR"
    }, {
        icao: "MMR",
        callsign: "MUSRATA AIR"
    }, {
        icao: "MAW",
        callsign: "MUSTIQUE"
    }, {
        icao: "MYM",
        callsign: "MYAIR"
    }, {
        icao: "MYW",
        callsign: "MYSKY"
    }, {
        icao: "MYT",
        callsign: "KESTREL"
    }, {
        icao: "UBA",
        callsign: "UNIONAIR"
    }, {
        icao: "MMA",
        callsign: "MYANMAR"
    }, {
        icao: "MAV",
        callsign: "MINOAN"
    }, {
        icao: "MYA",
        callsign: "MYFLUG"
    }, {
        icao: "VKG",
        callsign: "VIKING"
    }, {
        icao: "AAD",
        callsign: "AMBASSADOR"
    }, {
        icao: "MHV",
        callsign: "SNOWCAP"
    }, {
        icao: "MTU",
        callsign: "BLUE RAIDER"
    }, {
        icao: "SIQ",
        callsign: "SCIENCE QUEST"
    }, {
        icao: "NEJ",
        callsign: "NET BUSINESS"
    }, {
        icao: "NHC",
        callsign: "NORTHERN"
    }, {
        icao: "DMD",
        callsign: "DIAMONDJET"
    }, {
        icao: "NIN",
        callsign: "NIGER AIRLINES"
    }, {
        icao: "FEY",
        callsign: "FLYEASY"
    }, {
        icao: "NUB",
        callsign: "VALLETTA"
    }, {
        icao: "NJA",
        callsign: "SHIN NIHON"
    }, {
        icao: "ROW",
        callsign: "ROTORWING"
    }, {
        icao: "NLG",
        callsign: "NELCARGO"
    }, {
        icao: "NHG",
        callsign: "HELGA"
    }, {
        icao: "WAR",
        callsign: "WARBIRDS"
    }, {
        icao: "ANL",
        callsign: "AIR NACOIA"
    }, {
        icao: "NHZ",
        callsign: "NADA AIR"
    }, {
        icao: "NAH",
        callsign: "NAHANNI"
    }, {
        icao: "NKL",
        callsign: "NAKHEEL"
    }, {
        icao: "MRE",
        callsign: "MED RESCUE"
    }, {
        icao: "NDF",
        callsign: "NAMIBIAN AIR FORCE"
    }, {
        icao: "CNJ",
        callsign: "NINGHANG"
    }, {
        icao: "ACK",
        callsign: "ACK AIR"
    }, {
        icao: "NYA",
        callsign: "NANYAH"
    }, {
        icao: "NAP",
        callsign: "NAPIER"
    }, {
        icao: "NCM",
        callsign: "AIR BANE"
    }, {
        icao: "NAS",
        callsign: "NASAIRWAYS"
    }, {
        icao: "NJC",
        callsign: "NASHVILLE JET"
    }, {
        icao: "NCO",
        callsign: "NATALCO"
    }, {
        icao: "NTK",
        callsign: "NATCA"
    }, {
        icao: "NSR",
        callsign: "NASAIR"
    }, {
        icao: "RFI",
        callsign: "SHERLOCK"
    }, {
        icao: "NAN",
        callsign: "NATION AIR"
    }, {
        icao: "ROK",
        callsign: "RED ROCK"
    }, {
        icao: "NAL",
        callsign: "NATIONAL"
    }, {
        icao: "NCR",
        callsign: "NATIONAL CARGO"
    }, {
        icao: "NAE",
        callsign: "NATIONAL"
    }, {
        icao: "NIH",
        callsign: "NAM"
    }, {
        icao: "KUS",
        callsign: "KUSWAG"
    }, {
        icao: "LFI",
        callsign: "AEROMED"
    }, {
        icao: "TNC",
        callsign: "NATCOM"
    }, {
        icao: "NXT",
        callsign: "NATIONAL FREIGHT"
    }, {
        icao: "GRD",
        callsign: "GRID"
    }, {
        icao: "JTE",
        callsign: "JETEX"
    }, {
        icao: "AND",
        callsign: "AIR INDIANA"
    }, {
        icao: "NJS",
        callsign: "NATIONAL JET"
    }, {
        icao: "NOL",
        callsign: "NAT AIRLINE"
    }, {
        icao: "NLS",
        callsign: "PANDER"
    }, {
        icao: "NAE",
        callsign: "NATIONS EXPRESS"
    }, {
        icao: "NTW",
        callsign: "NATIONWIDE"
    }, {
        icao: "NWZ",
        callsign: "ZAMNAT"
    }, {
        icao: "EVM",
        callsign: "SCIENCE"
    }, {
        icao: "NRR",
        callsign: "NATUREAIR"
    }, {
        icao: "NRK",
        callsign: "NATURELINK"
    }, {
        icao: "NVC",
        callsign: "NAV CAN"
    }, {
        icao: "NAV",
        callsign: "NAV DISPATCH"
    }, {
        icao: "NAY",
        callsign: "NAYSA"
    }, {
        icao: "IRI",
        callsign: "NAVID"
    }, {
        icao: "NVM",
        callsign: "NAVIERA"
    }, {
        icao: "NVL",
        callsign: "NAVLINES"
    }, {
        icao: "NEB",
        callsign: "NEBRASKA"
    }, {
        icao: "NEC",
        callsign: "NECON AIR"
    }, {
        icao: "NCG",
        callsign: "NETHERLANDS COASTGUARD"
    }, {
        icao: "NFT",
        callsign: "NEFTEAVIA"
    }, {
        icao: "NLA",
        callsign: "NEILTOWN AIR"
    }, {
        icao: "NLC",
        callsign: "NELAIR"
    }, {
        icao: "CGE",
        callsign: "COLLEGE"
    }, {
        icao: "RNA",
        callsign: "ROYAL NEPAL"
    }, {
        icao: "NOS",
        callsign: "MOONFLOWER"
    }, {
        icao: "TOX",
        callsign: "SKY KINGDOM"
    }, {
        icao: "NSL",
        callsign: "NERICAIR"
    }, {
        icao: "EJA",
        callsign: "EXECJET"
    }, {
        icao: "NET",
        callsign: "NETWORK"
    }, {
        icao: "NEZ",
        callsign: "ENGAIR"
    }, {
        icao: "NEA",
        callsign: "NEW ENGLAND"
    }, {
        icao: "NHT",
        callsign: "NEWHEIGHTS"
    }, {
        icao: "NWD",
        callsign: "NEW WORLD"
    }, {
        icao: "NYH",
        callsign: "NEW YORK"
    }, {
        icao: "GRY",
        callsign: "GRAY RIDER"
    }, {
        icao: "KRC",
        callsign: "KIWI RESCUE"
    }, {
        icao: "HVA",
        callsign: "HAVENAIR"
    }, {
        icao: "NLT",
        callsign: "NALAIR"
    }, {
        icao: "NTJ",
        callsign: "NEXTJET"
    }, {
        icao: "NXF",
        callsign: "NEXTFLIGHT"
    }, {
        icao: "NXS",
        callsign: "NEXUS AVIATION"
    }, {
        icao: "NIS",
        callsign: "NICA"
    }, {
        icao: "NCN",
        callsign: "NICON AIRWAYS"
    }, {
        icao: "NGA",
        callsign: "NIGERIA"
    }, {
        icao: "NGR",
        callsign: "NIGERIAN AIRFORCE"
    }, {
        icao: "NGX",
        callsign: "AIR GLOBAL"
    }, {
        icao: "EXT",
        callsign: "EXECUTIVE"
    }, {
        icao: "NLY",
        callsign: "FLYNIKI"
    }, {
        icao: "NKV",
        callsign: "AIR NIKOLAEV"
    }, {
        icao: "NSA",
        callsign: "NILE SAFARIS"
    }, {
        icao: "NLW",
        callsign: "NILE WINGS"
    }, {
        icao: "NBS",
        callsign: "NIMBUS"
    }, {
        icao: "NSR",
        callsign: "AIR STAR"
    }, {
        icao: "NCA",
        callsign: "NIPPON CARGO"
    }, {
        icao: "NVK",
        callsign: "VARTOSKAVIA"
    }, {
        icao: "NOH",
        callsign: "NORTHOLT"
    }, {
        icao: "AKG",
        callsign: "GRIFTER"
    }, {
        icao: "NBL",
        callsign: "NOBIL AIR"
    }, {
        icao: "NOK",
        callsign: "NOK AIR"
    }, {
        icao: "NCT",
        callsign: "BIG BIRD"
    }, {
        icao: "NRL",
        callsign: "NOLINOR"
    }, {
        icao: "NMD",
        callsign: "NOMAD AIR"
    }, {
        icao: "OMD",
        callsign: "NOMADIC"
    }, {
        icao: "NOC",
        callsign: "NORCOPTER"
    }, {
        icao: "NEF",
        callsign: "NORDEX"
    }, {
        icao: "AUL",
        callsign: "ARCHANGELSK AIR"
    }, {
        icao: "NES",
        callsign: "NORDESTE"
    }, {
        icao: "NRD",
        callsign: "NORTH RIDER"
    }, {
        icao: "TYA",
        callsign: "TAIMYR"
    }, {
        icao: "NWS",
        callsign: "NORDLAND"
    }, {
        icao: "NRT",
        callsign: "NORESTAIR"
    }, {
        icao: "NCF",
        callsign: "COUNTY"
    }, {
        icao: "FNA",
        callsign: "NORLAND"
    }, {
        icao: "NOA",
        callsign: "NORONTAIR"
    }, {
        icao: "HMF",
        callsign: "LIFEGUARD SWEDEN"
    }, {
        icao: "NRX",
        callsign: "NORSE AIR"
    }, {
        icao: "NBT",
        callsign: "LONGSHIP"
    }, {
        icao: "NIR",
        callsign: "NORSEMAN"
    }, {
        icao: "NOR",
        callsign: "NORSKE"
    }, {
        icao: "DOC",
        callsign: "HELIDOC"
    }, {
        icao: "RTV",
        callsign: "TICTAC"
    }, {
        icao: "NAI",
        callsign: "NORTHADRIA"
    }, {
        icao: "NAO",
        callsign: "NORTH AMERICAN"
    }, {
        icao: "HMR",
        callsign: "HAMMER"
    }, {
        icao: "NAJ",
        callsign: "JET GROUP"
    }, {
        icao: "NAT",
        callsign: "MASS AIR"
    }, {
        icao: "NFC",
        callsign: "NORTH ATLANTIC"
    }, {
        icao: "NBN",
        callsign: "TEESAIR"
    }, {
        icao: "NCB",
        callsign: "NORTH CARIBOU"
    }, {
        icao: "N/A",
        callsign: "NORTH COAST"
    }, {
        icao: "NFA",
        callsign: "NORTH FLYING"
    }, {
        icao: "NRC",
        callsign: "NORTH SEA"
    }, {
        icao: "SBX",
        callsign: "SKY BOX"
    }, {
        icao: "NRV",
        callsign: "NORVAN"
    }, {
        icao: "NWW",
        callsign: "HALANT"
    }, {
        icao: "PTO",
        callsign: "PHOTO"
    }, {
        icao: "NEN",
        callsign: "NORTHEAST SWAN"
    }, {
        icao: "VBG",
        callsign: "VYBORG AIR"
    }, {
        icao: "NWL",
        callsign: "NORTHWRIGHT"
    }, {
        icao: "NLL",
        callsign: "NORTHAFRICAN AIR"
    }, {
        icao: "NFL",
        callsign: "GREAT LAKES"
    }, {
        icao: "NSF",
        callsign: "NORTON"
    }, {
        icao: "NCE",
        callsign: "TOP HAT"
    }, {
        icao: "NEE",
        callsign: "NORTHEAST"
    }, {
        icao: "NPX",
        callsign: "NORTHEAST EXPRESS"
    }, {
        icao: "NEW",
        callsign: "MEADOW FLIGHT"
    }, {
        icao: "NAC",
        callsign: "YUKON"
    }, {
        icao: "BYC",
        callsign: "BEIYA"
    }, {
        icao: "NDA",
        callsign: "NORTHERN DAKOTA"
    }, {
        icao: "CMU",
        callsign: "LANNA AIR"
    }, {
        icao: "NEX",
        callsign: "NEATAX"
    }, {
        icao: "NIC",
        callsign: "ILLINOIS COMMUTER"
    }, {
        icao: "NTX",
        callsign: "NORTAX"
    }, {
        icao: "RVF",
        callsign: "—RAVEN FLIGHT"
    }, {
        icao: "NTA",
        callsign: "THUNDERBIRD"
    }, {
        icao: "KOE",
        callsign: "KOKEE"
    }, {
        icao: "NSS",
        callsign: "NORTHSTAR"
    }, {
        icao: "NHL",
        callsign: "NORTHUMBRIA"
    }, {
        icao: "NAL",
        callsign: "NORTHWAY"
    }, {
        icao: "NWA",
        callsign: "NORTHWEST"
    }, {
        icao: "NWT",
        callsign: "TERRITORIAL"
    }, {
        icao: "PLR",
        callsign: "POLARIS"
    }, {
        icao: "NWN",
        callsign: "NORTHWINDS"
    }, {
        icao: "NAM",
        callsign: "MANITOBA"
    }, {
        icao: "IBK",
        callsign: "NORTRANS"
    }, {
        icao: "NOZ",
        callsign: "NORDIC"
    }, {
        icao: "NRS",
        callsign: "REDNOSE*"
    }, {
        icao: "NAA",
        callsign: "NORUEGA"
    }, {
        icao: "NLH",
        callsign: "NORSTAR"
    }, {
        icao: "NAN",
        callsign: "NORSHIP"
    }, {
        icao: "NSZ",
        callsign: "REDNOSE"
    }, {
        icao: "TFN",
        callsign: "SPIRIT"
    }, {
        icao: "LBT",
        callsign: "NOUVELAIR"
    }, {
        icao: "NOV",
        callsign: "NOVANILE"
    }, {
        icao: "PTR",
        callsign: "PATROL"
    }, {
        icao: "NVR",
        callsign: "NAVIGATOR"
    }, {
        icao: "NVQ",
        callsign: "NOVO AIR"
    }, {
        icao: "NVG",
        callsign: "SADKO AVIA"
    }, {
        icao: "NSP",
        callsign: "NARPAIR"
    }, {
        icao: "NBE",
        callsign: "NAKAIR"
    }, {
        icao: "NPO",
        callsign: "NOVSIB"
    }, {
        icao: "NOY",
        callsign: "NOY AVIATION"
    }, {
        icao: "ACQ",
        callsign: "AERO CONTINENTE"
    }, {
        icao: "NHR",
        callsign: "NUEVO HORIZONTE"
    }, {
        icao: "NUN",
        callsign: "NUNASI"
    }, {
        icao: "NIN",
        callsign: "NURVINDO"
    }, {
        icao: "NYS",
        callsign: "NYASA"
    }, {
        icao: "NJE",
        callsign: "FRACTION"
    }, {
        icao: "ORN",
        callsign: "ORANGE JET"
    }, {
        icao: "ONS",
        callsign: "AIR DREAMS"
    }, {
        icao: "FET",
        callsign: "FREIGHT LINE"
    }, {
        icao: "OCN",
        callsign: "OBIRD"
    }, {
        icao: "OCM",
        callsign: "OCONNOR"
    }, {
        icao: "DRL",
        callsign: "DRILLER"
    }, {
        icao: "OWE",
        callsign: "OWENAIR"
    }, {
        icao: "AAN",
        callsign: "OASIS"
    }, {
        icao: "OHK",
        callsign: "OASIS"
    }, {
        icao: "BCN",
        callsign: "BLUE OCEAN"
    }, {
        icao: "VCX",
        callsign: "OCEANCARGO"
    }, {
        icao: "OCS",
        callsign: "OCEANSKY"
    }, {
        icao: "TUK",
        callsign: "TUCKERNUCK"
    }, {
        icao: "ODS",
        callsign: "ODESSA AIR"
    }, {
        icao: "FOC",
        callsign: "FOCA"
    }, {
        icao: "OKJ",
        callsign: "OKADA AIR"
    }, {
        icao: "OKP",
        callsign: "OKAPI"
    }, {
        icao: "OKA",
        callsign: "OKAYJET"
    }, {
        icao: "OKL",
        callsign: "OKLAHOMA"
    }, {
        icao: "OLX",
        callsign: "OLIMEX"
    }, {
        icao: "KVK",
        callsign: "PONTA"
    }, {
        icao: "OLT",
        callsign: "OLTRA"
    }, {
        icao: "OAL",
        callsign: "OLYMPIC"
    }, {
        icao: "OLY",
        callsign: "OLAVIA"
    }, {
        icao: "OMA",
        callsign: "OMAN AIR"
    }, {
        icao: "ORF",
        callsign: "OMAN"
    }, {
        icao: "OMS",
        callsign: "MAZOON"
    }, {
        icao: "OAV",
        callsign: "OMNI"
    }, {
        icao: "OAE",
        callsign: "OMNIEXPRESS"
    }, {
        icao: "ONI",
        callsign: "OMNI TRAINING"
    }, {
        icao: "OMF",
        callsign: "OMNIFLYS"
    }, {
        icao: "ORL",
        callsign: "ON AIR"
    }, {
        icao: "OST",
        callsign: "OSTATE"
    }, {
        icao: "OTG",
        callsign: "THAI EXPRESS"
    }, {
        icao: "OTM",
        callsign: "ZEDTIME"
    }, {
        icao: "MED",
        callsign: "MEDICAL"
    }, {
        icao: "OHY",
        callsign: "ONUR AIR"
    }, {
        icao: "BOS",
        callsign: "MISTRAL"
    }, {
        icao: "ORR",
        callsign: "TURISTICA AURORA"
    }, {
        icao: "OLE",
        callsign: "OPERADORA"
    }, {
        icao: "OTP",
        callsign: "OPERADORA AEREO"
    }, {
        icao: "OPV",
        callsign: "OPERADORA DE VUELOS"
    }, {
        icao: "LLO",
        callsign: "APOLLO"
    }, {
        icao: "ORD",
        callsign: "ORANGE SERVICES"
    }, {
        icao: "ORJ",
        callsign: "ORANGE SIERRA"
    }, {
        icao: "ORE",
        callsign: "ORANGE AVIATION"
    }, {
        icao: "ORX",
        callsign: "OREX"
    }, {
        icao: "ORK",
        callsign: "ORCA TAXI"
    }, {
        icao: "BUE",
        callsign: "BLUELIGHT"
    }, {
        icao: "ORM",
        callsign: "ORPRISE"
    }, {
        icao: "ORB",
        callsign: "ORENBURG"
    }, {
        icao: "OTA",
        callsign: "ORGANIZACION"
    }, {
        icao: "OML",
        callsign: "MAMBRA"
    }, {
        icao: "OVV",
        callsign: "ORIENTSYR"
    }, {
        icao: "OTR",
        callsign: "ORIENTROC"
    }, {
        icao: "ORN",
        callsign: "ORIENT LINER"
    }, {
        icao: "OEA",
        callsign: "ORIENT THAI"
    }, {
        icao: "NGK",
        callsign: "ORIENTAL BRIDGE"
    }, {
        icao: "OAC",
        callsign: "ORIENTAL AIR"
    }, {
        icao: "OGN",
        callsign: "ORIGIN"
    }, {
        icao: "OED",
        callsign: "ORION CHARTER"
    }, {
        icao: "OIX",
        callsign: "ORIONIX"
    }, {
        icao: "KOV",
        callsign: "ORLAN"
    }, {
        icao: "RNG",
        callsign: "ORANGE"
    }, {
        icao: "OAD",
        callsign: "ORSCOM"
    }, {
        icao: "JPA",
        callsign: "JPAT"
    }, {
        icao: "OSH",
        callsign: "OSH AVIA"
    }, {
        icao: "OCO",
        callsign: "AIR COLLEGE"
    }, {
        icao: "ODY",
        callsign: "ODYSSEY"
    }, {
        icao: "FNL",
        callsign: "FINN FLIGHT"
    }, {
        icao: "RON",
        callsign: "OUR AIRLINE"
    }, {
        icao: "OOT",
        callsign: "OOTBAS"
    }, {
        icao: "OLA",
        callsign: "OVERLAND"
    }, {
        icao: "OAR",
        callsign: "BOSS AIR"
    }, {
        icao: "OXE",
        callsign: "OXOE"
    }, {
        icao: "WDK",
        callsign: "WOODSTOCK"
    }, {
        icao: "OZR",
        callsign: "OZARK"
    }, {
        icao: "OZJ",
        callsign: "AUSJET"
    }, {
        icao: "OSU",
        callsign: "SCARLET"
    }, {
        icao: "OAL",
        callsign: "OLYMPIC"
    }, {
        icao: "AAN",
        callsign: "OASIS"
    }, {
        icao: "ORT",
        callsign: "SKYWALKER"
    }, {
        icao: "PIP",
        callsign: "PILOT"
    }, {
        icao: "HRS",
        callsign: "HORSEMAN"
    }, {
        icao: "NCT",
        callsign: "PETE AIR"
    }, {
        icao: "PRT",
        callsign: "PRIME ITALIA"
    }, {
        icao: "PXT",
        callsign: "PACK COAST"
    }, {
        icao: "BPH",
        callsign: "BLACK PHOENIX"
    }, {
        icao: "PFY",
        callsign: "PELFLIGHT"
    }, {
        icao: "PXR",
        callsign: "PIXAIR"
    }, {
        icao: "PNC",
        callsign: "PRINCE"
    }, {
        icao: "PMI",
        callsign: "AEROEPRIM"
    }, {
        icao: "KTL",
        callsign: "KNOTTSBERRY"
    }, {
        icao: "PCR",
        callsign: "PACAIR"
    }, {
        icao: "PNR",
        callsign: "SKYJET"
    }, {
        icao: "PBA",
        callsign: "PEEBEE AIR"
    }, {
        icao: "PDQ",
        callsign: "DISPATCH"
    }, {
        icao: "PDG",
        callsign: "OSPREY"
    }, {
        icao: "PUA",
        callsign: "PLUNA"
    }, {
        icao: "PMT",
        callsign: "MULTITRADE"
    }, {
        icao: "PRP",
        callsign: "PRONTO"
    }, {
        icao: "JIA",
        callsign: "BLUE STREAK"
    }, {
        icao: "KST",
        callsign: "KING STAR"
    }, {
        icao: "WIS",
        callsign: "WISCAIR"
    }, {
        icao: "PCE",
        callsign: "PACE"
    }, {
        icao: "PAB",
        callsign: "AIR BOATS"
    }, {
        icao: "PRC",
        callsign: "PACIFIC CHARTER"
    }, {
        icao: "PAQ",
        callsign: "SOLPAC"
    }, {
        icao: "PXP",
        callsign: "PAK EXPRESS"
    }, {
        icao: "PIC",
        callsign: "PACIFIC AIRLINES"
    }, {
        icao: "PAK",
        callsign: "PACIFIC ALASKA"
    }, {
        icao: "PCV",
        callsign: "PACAV"
    }, {
        icao: "PTO",
        callsign: "ROOKIE"
    }, {
        icao: "PBN",
        callsign: "BLUEBIRD"
    }, {
        icao: "PQA",
        callsign: "SAGE BRUSH"
    }, {
        icao: "PCO",
        callsign: "PASCO"
    }, {
        icao: "PEC",
        callsign: "PACEAST CARGO"
    }, {
        icao: "PFA",
        callsign: "PACIFIC SING"
    }, {
        icao: "PIN",
        callsign: "ROAD RUNNERS"
    }, {
        icao: "PSA",
        callsign: "PACIFIC ISLE"
    }, {
        icao: "PCJ",
        callsign: "PACIFIC JET"
    }, {
        icao: "PPM",
        callsign: "PACIFIC PEARL"
    }, {
        icao: "PAR",
        callsign: "PACRIM"
    }, {
        icao: "NMI",
        callsign: "TSUNAMI"
    }, {
        icao: "PFR",
        callsign: "PACIFIC WEST"
    }, {
        icao: "RCY",
        callsign: "RACE CITY"
    }, {
        icao: "PAE",
        callsign: "PAISAJES"
    }, {
        icao: "PKW",
        callsign: "PLATINUM WEST"
    }, {
        icao: "PIA",
        callsign: "PAKISTAN"
    }, {
        icao: "PKR",
        callsign: "PAKKER AVIO"
    }, {
        icao: "LPA",
        callsign: "LINEASPAL"
    }, {
        icao: "PPC",
        callsign: "PALAU ASIAPAC"
    }, {
        icao: "PNA",
        callsign: "SEBUS"
    }, {
        icao: "PTP",
        callsign: "TRANS PACIFIC"
    }, {
        icao: "PNW",
        callsign: "PALESTINIAN"
    }, {
        icao: "JSP",
        callsign: "PALMER"
    }, {
        icao: "PIR",
        callsign: "PAMIR"
    }, {
        icao: "PFN",
        callsign: "PANAFRICAN"
    }, {
        icao: "PAX",
        callsign: "PANNEX"
    }, {
        icao: "PAA",
        callsign: "CLIPPER"
    }, {
        icao: "PHT",
        callsign: "PANANK"
    }, {
        icao: "PMA",
        callsign: "PAN MALAYSIA"
    }, {
        icao: "PNC",
        callsign: "PANAIRSA"
    }, {
        icao: "PNF",
        callsign: "PANWAYS"
    }, {
        icao: "PGI",
        callsign: "PANAGRA"
    }, {
        icao: "RSL",
        callsign: "PANAMA RENTAL"
    }, {
        icao: "PEI",
        callsign: "PANAMEDIA"
    }, {
        icao: "PNH",
        callsign: "KUBAN LIK"
    }, {
        icao: "PHU",
        callsign: "PANNON"
    }, {
        icao: "PNM",
        callsign: "PANORAMA"
    }, {
        icao: "PAH",
        callsign: "LANI"
    }, {
        icao: "AFD",
        callsign: "AIRFED"
    }, {
        icao: "PTN",
        callsign: "PANTANAL"
    }, {
        icao: "HMP",
        callsign: "PAPAIR TERMINAL"
    }, {
        icao: "PAI",
        callsign: "SEA RAY"
    }, {
        icao: "PDI",
        callsign: "PARADISE ISLAND"
    }, {
        icao: "PGX",
        callsign: "PARAGON EXPRESS"
    }, {
        icao: "PRR",
        callsign: "PARAMOUNT"
    }, {
        icao: "PMW",
        callsign: "PARAWAY"
    }, {
        icao: "APE",
        callsign: "AIR PARCEL"
    }, {
        icao: "IRE",
        callsign: "PARIZAIR"
    }, {
        icao: "PRA",
        callsign: "PARSAVIA"
    }, {
        icao: "PST",
        callsign: "TURISMO REGIONAL"
    }, {
        icao: "PSC",
        callsign: "PASCAN"
    }, {
        icao: "PTB",
        callsign: "PASSAREDO"
    }, {
        icao: "PTC",
        callsign: "PATRIA"
    }, {
        icao: "BYT",
        callsign: "BYTE"
    }, {
        icao: "ETL",
        callsign: "ENTEL"
    }, {
        icao: "PHE",
        callsign: "PAWAN HANS"
    }, {
        icao: "IRP",
        callsign: "PAYAMAIR"
    }, {
        icao: "KGC",
        callsign: "GOLDCREST"
    }, {
        icao: "PRL",
        callsign: "PEARL LINE"
    }, {
        icao: "PBY",
        callsign: "PEARL SERVICES"
    }, {
        icao: "HPA",
        callsign: "PEARL AIRWAYS"
    }, {
        icao: "PVU",
        callsign: "PEAU"
    }, {
        icao: "PXA",
        callsign: "PECOTOX"
    }, {
        icao: "PGT",
        callsign: "SUNTURK"
    }, {
        icao: "PEV",
        callsign: "PEOPLES"
    }, {
        icao: "HAK",
        callsign: "HELIFALCON"
    }, {
        icao: "PDF",
        callsign: "PELICAN AIRWAYS"
    }, {
        icao: "PEX",
        callsign: "PELICAN EXPRESS"
    }, {
        icao: "PAS",
        callsign: "PELITA"
    }, {
        icao: "PEM",
        callsign: "PEMAIR"
    }, {
        icao: "PDY",
        callsign: "PENDLEY"
    }, {
        icao: "PEN",
        callsign: "PENINSULA"
    }, {
        icao: "PNE",
        callsign: "PENINTER"
    }, {
        icao: "PCA",
        callsign: "PENA DEL AIRE"
    }, {
        icao: "CVT",
        callsign: "CVETA"
    }, {
        icao: "PCC",
        callsign: "PERFORADORA CENTRAL"
    }, {
        icao: "PAG",
        callsign: "PERIMETER"
    }, {
        icao: "PGP",
        callsign: "PERM AIR"
    }, {
        icao: "PPQ",
        callsign: "PERSONSPAQ"
    }, {
        icao: "PEO",
        callsign: "PETRO AIR"
    }, {
        icao: "PMX",
        callsign: "PEMEX"
    }, {
        icao: "PHM",
        callsign: "PETROLEUM"
    }, {
        icao: "PHC",
        callsign: "HELICOPTERS"
    }, {
        icao: "PTK",
        callsign: "PETROKAM"
    }, {
        icao: "PTY",
        callsign: "PETTY"
    }, {
        icao: "PHV",
        callsign: "NEW BIRD"
    }, {
        icao: "PMY",
        callsign: "PHETCHABUN AIR"
    }, {
        icao: "EZD",
        callsign: "REDHOT"
    }, {
        icao: "PAL",
        callsign: "PHILIPPINE"
    }, {
        icao: "PHI",
        callsign: "PHILAIR"
    }, {
        icao: "BCH",
        callsign: "BEACHBALL"
    }, {
        icao: "PDD",
        callsign: "PADA"
    }, {
        icao: "PHL",
        callsign: "PHILLIPS"
    }, {
        icao: "PHB",
        callsign: "PHOEBUS"
    }, {
        icao: "KZM",
        callsign: "CARZAM"
    }, {
        icao: "PHA",
        callsign: "GRAY BIRD"
    }, {
        icao: "PHN",
        callsign: "PHOENIX BRASIL"
    }, {
        icao: "PAM",
        callsign: "PHOENIX"
    }, {
        icao: "PPG",
        callsign: "PAPAGO"
    }, {
        icao: "WDY",
        callsign: "WINDYCITY"
    }, {
        icao: "PHY",
        callsign: "PHOENIX ARMENIA"
    }, {
        icao: "PHG",
        callsign: "PHOENIX GROUP"
    }, {
        icao: "VAP",
        callsign: "PHUKET AIR"
    }, {
        icao: "PAI",
        callsign: "PIEDMONT"
    }, {
        icao: "PDT",
        callsign: "PIEDMONT"
    }, {
        icao: "PCH",
        callsign: "PILATUS WINGS"
    }, {
        icao: "PLU",
        callsign: "PILATUS MEXICO"
    }, {
        icao: "MKS",
        callsign: "MIKISEW"
    }, {
        icao: "PNP",
        callsign: "PINEAPPLE AIR"
    }, {
        icao: "PIM",
        callsign: "PINFRAMAT"
    }, {
        icao: "PCL",
        callsign: "PINNACLE GROUP"
    }, {
        icao: "FLG",
        callsign: "FLAGSHIP"
    }, {
        icao: "PIO",
        callsign: "PIONEER"
    }, {
        icao: "PRN",
        callsign: "PRINAIR EXPRESS"
    }, {
        icao: "PLN",
        callsign: "PLANAR"
    }, {
        icao: "PMS",
        callsign: "PLANEMASTER"
    }, {
        icao: "PLZ",
        callsign: "PLANET"
    }, {
        icao: "FPY",
        callsign: "PLAYER"
    }, {
        icao: "PYZ",
        callsign: "PLAYERS AIR"
    }, {
        icao: "LIB",
        callsign: "LIBELLE"
    }, {
        icao: "PSF",
        callsign: "LIZARD"
    }, {
        icao: "PBD",
        callsign: "POBEDA"
    }, {
        icao: "POC",
        callsign: "POCONO"
    }, {
        icao: "PDA",
        callsign: "PODILIA"
    }, {
        icao: "PAZ",
        callsign: "POINTAIR NIGER"
    }, {
        icao: "RMI",
        callsign: "POINT AIRLINE"
    }, {
        icao: "PAW",
        callsign: "POINTAIR BURKINA"
    }, {
        icao: "PTS",
        callsign: "POINTSCALL"
    }, {
        icao: "PAC",
        callsign: "POLAR"
    }, {
        icao: "PMO",
        callsign: "POLAR MEXICO"
    }, {
        icao: "PSR",
        callsign: "POLESTAR"
    }, {
        icao: "POT",
        callsign: "POLET"
    }, {
        icao: "POF",
        callsign: "AIRPOL"
    }, {
        icao: "PLC",
        callsign: "SPECIAL"
    }, {
        icao: "PLF",
        callsign: "POLISH AIRFORCE"
    }, {
        icao: "PNY",
        callsign: "POLISH NAVY"
    }, {
        icao: "NRW",
        callsign: "HUMMEL"
    }, {
        icao: "PPH",
        callsign: "POLICE PHOENIX"
    }, {
        icao: "PIK",
        callsign: "POLICE IKARUS"
    }, {
        icao: "SRP",
        callsign: "SPERBER"
    }, {
        icao: "PBW",
        callsign: "BUSSARD"
    }, {
        icao: "EDL",
        callsign: "POLICE EDELWEISS"
    }, {
        icao: "PBB",
        callsign: "ADEBAR"
    }, {
        icao: "PHH",
        callsign: "IBIS"
    }, {
        icao: "PMV",
        callsign: "POLICE MERLIN"
    }, {
        icao: "PHS",
        callsign: "PASSAT"
    }, {
        icao: "HBT",
        callsign: "HABICHT"
    }, {
        icao: "CUK",
        callsign: "CHUKKA"
    }, {
        icao: "PLA",
        callsign: "POLYAIR"
    }, {
        icao: "PAO",
        callsign: "POLYNESIAN"
    }, {
        icao: "PLB",
        callsign: "POLYBLUE"
    }, {
        icao: "PND",
        callsign: "POND AIR"
    }, {
        icao: "PSI",
        callsign: "PONT"
    }, {
        icao: "PLX",
        callsign: "POOLEX"
    }, {
        icao: "PTQ",
        callsign: "TOWNSEND"
    }, {
        icao: "POR",
        callsign: "PORTEADORA"
    }, {
        icao: "POE",
        callsign: "PORTER"
    }, {
        icao: "PGA",
        callsign: "PORTUGALIA"
    }, {
        icao: "AFP",
        callsign: "PORTUGUESE AIR FORCE"
    }, {
        icao: "POA",
        callsign: "PORTUGUESE ARMY"
    }, {
        icao: "PON",
        callsign: "PORTUGUESE NAVY"
    }, {
        icao: "MSA",
        callsign: "AIRMERCI"
    }, {
        icao: "PDC",
        callsign: "DISTRICT"
    }, {
        icao: "PSN",
        callsign: "POTOSINA"
    }, {
        icao: "PWL",
        callsign: "POWELL AIR"
    }, {
        icao: "PFS",
        callsign: "PRAIRIE"
    }, {
        icao: "PWC",
        callsign: "PRATT"
    }, {
        icao: "PRF",
        callsign: "PRECISION AIR"
    }, {
        icao: "PRE",
        callsign: "PRECISION"
    }, {
        icao: "BAT",
        callsign: "BALLISTIC"
    }, {
        icao: "PGL",
        callsign: "PREMIERE"
    }, {
        icao: "PME",
        callsign: "ADUR"
    }, {
        icao: "EMI",
        callsign: "BLUE SHUTTLE"
    }, {
        icao: "PMU",
        callsign: "PREMIUM"
    }, {
        icao: "AUH",
        callsign: "SULTAN"
    }, {
        icao: "PRD",
        callsign: "PRESIDENTIAL"
    }, {
        icao: "PWA",
        callsign: "PRIESTER"
    }, {
        icao: "PMM",
        callsign: "PARADIGM"
    }, {
        icao: "WCP",
        callsign: "WHITECAP"
    }, {
        icao: "PMC",
        callsign: "PRIMAC"
    }, {
        icao: "CRY",
        callsign: "CARRIERS"
    }, {
        icao: "PRM",
        callsign: "PRIME AIR"
    }, {
        icao: "PKZ",
        callsign: "PRAVI"
    }, {
        icao: "CME",
        callsign: "COMET"
    }, {
        icao: "PJP",
        callsign: "PRINCELY JETS"
    }, {
        icao: "PCN",
        callsign: "PRINCETON"
    }, {
        icao: "PRY",
        callsign: "PRIORITY AIR"
    }, {
        icao: "PAT",
        callsign: "PAT"
    }, {
        icao: "BCK",
        callsign: "BANKCHECK"
    }, {
        icao: "PTI",
        callsign: "PRIVATAIR"
    }, {
        icao: "PJE",
        callsign: "PEE JAY"
    }, {
        icao: "PJA",
        callsign: "PRIVATE FLIGHT"
    }, {
        icao: "PWF",
        callsign: "PRIVATE WINGS"
    }, {
        icao: "PVG",
        callsign: "PRIVILEGE"
    }, {
        icao: "PRH",
        callsign: "PROHAWK"
    }, {
        icao: "PSZ",
        callsign: "POPAIR"
    }, {
        icao: "GIY",
        callsign: "PROBIZ"
    }, {
        icao: "PAD",
        callsign: "AIR PROFESSIONAL"
    }, {
        icao: "PVL",
        callsign: "VOLARE"
    }, {
        icao: "PFZ",
        callsign: "PROFLIGHTZAMBIA"
    }, {
        icao: "PTT",
        callsign: "TOTOLAPA"
    }, {
        icao: "PRO",
        callsign: "PROPAIR"
    }, {
        icao: "PPA",
        callsign: "AIR PROP"
    }, {
        icao: "PTH",
        callsign: "PROTEUS"
    }, {
        icao: "PTL",
        callsign: "PLANTATION"
    }, {
        icao: "SPR",
        callsign: "SPEEDAIR"
    }, {
        icao: "PRV",
        callsign: "PROVINCIAL"
    }, {
        icao: "PSW",
        callsign: "PSKOVAVIA"
    }, {
        icao: "UDA",
        callsign: "UDARA"
    }, {
        icao: "PTA",
        callsign: "PTARMIGAN"
    }, {
        icao: "PSP",
        callsign: "PUBLISERVICIOS"
    }, {
        icao: "PUV",
        callsign: "PUBLIVOO"
    }, {
        icao: "TXV",
        callsign: "TAXIVALLARTA"
    }, {
        icao: "PLY",
        callsign: "PUMA BRASIL"
    }, {
        icao: "PTV",
        callsign: "PUNTAVIA"
    }, {
        icao: "MGO",
        callsign: "MANGO"
    }, {
        icao: "PYR",
        callsign: "PYAIR"
    }, {
        icao: "PLK",
        callsign: "PULKOVO"
    }, {
        icao: "PRI",
        callsign: "PRIMERA"
    }, {
        icao: "PRW",
        callsign: "JETBIRD"
    }, {
        icao: "FQA",
        callsign: "QUIK LIFT"
    }, {
        icao: "QNT",
        callsign: "QANAT SHARQ"
    }, {
        icao: "QFA",
        callsign: "QANTAS"
    }, {
        icao: "QLK",
        callsign: "QLINK"
    }, {
        icao: "QJE",
        callsign: "QJET"
    }, {
        icao: "QAC",
        callsign: "QATAR CARGO"
    }, {
        icao: "QTR",
        callsign: "QATARI"
    }, {
        icao: "QAF",
        callsign: "AMIRI"
    }, {
        icao: "QSM",
        callsign: "QESHM AIR"
    }, {
        icao: "QDA",
        callsign: "SKY LEGEND"
    }, {
        icao: "QTX",
        callsign: "AIR QUANTEX"
    }, {
        icao: "QUE",
        callsign: "QUEBEC"
    }, {
        icao: "QNA",
        callsign: "QUEEN AIR"
    }, {
        icao: "LBQ",
        callsign: "LABQUEST"
    }, {
        icao: "QAJ",
        callsign: "DAGOBERT"
    }, {
        icao: "QAH",
        callsign: "QUICK"
    }, {
        icao: "QAS",
        callsign: "QUISQUEYA"
    }, {
        icao: "QAQ",
        callsign: "QURINEA AIR"
    }, {
        icao: "QCC",
        callsign: "QWEST AIR"
    }, {
        icao: "QWL",
        callsign: "QCHARTER"
    }, {
        icao: "RBB",
        callsign: "RABBIT"
    }, {
        icao: "ACE",
        callsign: "FASTCARGO"
    }, {
        icao: "GBR",
        callsign: "GREENBRIER AIR"
    }, {
        icao: "CFN",
        callsign: "CHURCH FENTON"
    }, {
        icao: "COH",
        callsign: "COLT"
    }, {
        icao: "CBY",
        callsign: "TYPHOON"
    }, {
        icao: "COT",
        callsign: "COTTESMORE"
    }, {
        icao: "CWL",
        callsign: "CRANWELL"
    }, {
        icao: "KIN",
        callsign: "KINLOSS"
    }, {
        icao: "LEE",
        callsign: "JAVELIN"
    }, {
        icao: "LCS",
        callsign: "LEUCHARS"
    }, {
        icao: "LOP",
        callsign: "LINTON ON OUSE"
    }, {
        icao: "LOS",
        callsign: "LOSSIE"
    }, {
        icao: "MRH",
        callsign: "MARHAM"
    }, {
        icao: "SMZ",
        callsign: "SCAMPTON"
    }, {
        icao: "STN",
        callsign: "SAINT ATHAN"
    }, {
        icao: "TOF",
        callsign: "TOPCLIFFE"
    }, {
        icao: "VYT",
        callsign: "ANGLESEY"
    }, {
        icao: "WAD",
        callsign: "VULCAN"
    }, {
        icao: "WIT",
        callsign: "STRIKER"
    }, {
        icao: "MTL",
        callsign: "MITAVIA"
    }, {
        icao: "WES",
        callsign: "WEST INDIAN"
    }, {
        icao: "RJT",
        callsign: "RA JET"
    }, {
        icao: "RAJ",
        callsign: "RAJI"
    }, {
        icao: "RKM",
        callsign: "RAKAIR"
    }, {
        icao: "RFA",
        callsign: "RALEIGH SERVICE"
    }, {
        icao: "REX",
        callsign: "RAM EXPRESS"
    }, {
        icao: "RMT",
        callsign: "RAM FLIGHT"
    }, {
        icao: "PPK",
        callsign: "PELICAN"
    }, {
        icao: "RGM",
        callsign: "RANGEMILE"
    }, {
        icao: "MWR",
        callsign: "RASLAN"
    }, {
        icao: "RAQ",
        callsign: "RATH AVIATION"
    }, {
        icao: "CSM",
        callsign: "LORRY"
    }, {
        icao: "RVR",
        callsign: "RAVEN"
    }, {
        icao: "RVN",
        callsign: "RAVEN US"
    }, {
        icao: "RVF",
        callsign: "RAVEN FLIGHT"
    }, {
        icao: "REI",
        callsign: "RAY AVIATION"
    }, {
        icao: "RTN",
        callsign: "RAYTHEON"
    }, {
        icao: "RCJ",
        callsign: "NEWPIN"
    }, {
        icao: "KSS",
        callsign: "KANSAS"
    }, {
        icao: "RCB",
        callsign: "BALEARES"
    }, {
        icao: "CDT",
        callsign: "AEROREUS"
    }, {
        icao: "RCD",
        callsign: "AEROCLUB"
    }, {
        icao: "RLV",
        callsign: "REAL"
    }, {
        icao: "REB",
        callsign: "REBUS"
    }, {
        icao: "RTO",
        callsign: "RACCOON"
    }, {
        icao: "RIX",
        callsign: "RECTRIX"
    }, {
        icao: "PSH",
        callsign: "PASSION"
    }, {
        icao: "RBN",
        callsign: "RED BARON"
    }, {
        icao: "DEV",
        callsign: "RED DEVILS"
    }, {
        icao: "RDV",
        callsign: "RED AVIATION"
    }, {
        icao: "RSV",
        callsign: "RED SKY"
    }, {
        icao: "STR",
        callsign: "STARLINE"
    }, {
        icao: "RHC",
        callsign: "REDAIR"
    }, {
        icao: "VRD",
        callsign: "REDWOOD"
    }, {
        icao: "RAV",
        callsign: "REED AVIATION"
    }, {
        icao: "REF",
        callsign: "REEF AIR"
    }, {
        icao: "REK",
        callsign: "REEM AIR"
    }, {
        icao: "RVV",
        callsign: "REEVE"
    }, {
        icao: "RBH",
        callsign: "CALYPSO"
    }, {
        icao: "RGY",
        callsign: "REGENCY"
    }, {
        icao: "RAH",
        callsign: "REGENT"
    }, {
        icao: "RGE",
        callsign: "REGENT"
    }, {
        icao: "RAG",
        callsign: "GERMAN LINK"
    }, {
        icao: "RGR",
        callsign: "REGIONAIR"
    }, {
        icao: "RAE",
        callsign: "REGIONAL EUROPE"
    }, {
        icao: "TSH",
        callsign: "TRANSCANADA"
    }, {
        icao: "REW",
        callsign: "REGIONAL WINGS"
    }, {
        icao: "REG",
        callsign: "REGIONAL SERVICES"
    }, {
        icao: "RGL",
        callsign: "MAROC REGIONAL"
    }, {
        icao: "RXA",
        callsign: "REX"
    }, {
        icao: "JJM",
        callsign: "GEODATA"
    }, {
        icao: "REP",
        callsign: "REGIOPAR"
    }, {
        icao: "CEA",
        callsign: "CORPX"
    }, {
        icao: "REL",
        callsign: "RELIANCE AIR"
    }, {
        icao: "RLI",
        callsign: "RELIANT"
    }, {
        icao: "RTS",
        callsign: "RELIEF"
    }, {
        icao: "RAN",
        callsign: "RENAN"
    }, {
        icao: "ROA",
        callsign: "RENO AIR"
    }, {
        icao: "RGS",
        callsign: "RENOWN"
    }, {
        icao: "REP",
        callsign: "REPUBLIC"
    }, {
        icao: "RPA",
        callsign: "BRICKYARD"
    }, {
        icao: "RPH",
        callsign: "PUBLIC EXPRESS"
    }, {
        icao: "RBC",
        callsign: "REPUBLICAIR"
    }, {
        icao: "RST",
        callsign: "RESORT AIR"
    }, {
        icao: "RUT",
        callsign: "YADID"
    }, {
        icao: "RDS",
        callsign: "RHOADES EXPRESS"
    }, {
        icao: "RIU",
        callsign: "RIAU AIR"
    }, {
        icao: "RIA",
        callsign: "RICHAIR"
    }, {
        icao: "RVC",
        callsign: "RIVER CITY"
    }, {
        icao: "RIC",
        callsign: "RICHARDSON"
    }, {
        icao: "RCA",
        callsign: "RICHLAND"
    }, {
        icao: "HPR",
        callsign: "HELIPRO"
    }, {
        icao: "RLE",
        callsign: "RICO"
    }, {
        icao: "RID",
        callsign: "AKRID"
    }, {
        icao: "RAK",
        callsign: "SPORT CLUB"
    }, {
        icao: "RAZ",
        callsign: "RIJNMOND"
    }, {
        icao: "RIM",
        callsign: "RIMROCK"
    }, {
        icao: "SKA",
        callsign: "RIO EXPRESS"
    }, {
        icao: "REO",
        callsign: "RIO"
    }, {
        icao: "GRN",
        callsign: "GRANDE"
    }, {
        icao: "RIO",
        callsign: "RIO"
    }, {
        icao: "RSL",
        callsign: "RIO SUL"
    }, {
        icao: "RVM",
        callsign: "RIVER"
    }, {
        icao: "RGP",
        callsign: "GARDEN CITY"
    }, {
        icao: "UNR",
        callsign: "RIVNE UNIVERSAL"
    }, {
        icao: "RDL",
        callsign: "ROADAIR"
    }, {
        icao: "RBT",
        callsign: "ROBIN"
    }, {
        icao: "RBY",
        callsign: "RUBY"
    }, {
        icao: "ROX",
        callsign: "ROBLEX"
    }, {
        icao: "RKW",
        callsign: "ROCKWELL"
    }, {
        icao: "RMA",
        callsign: "ROCKY MOUNTAIN"
    }, {
        icao: "LIF",
        callsign: "LIFECARE"
    }, {
        icao: "RDZ",
        callsign: "RODZE AIR"
    }, {
        icao: "FAD",
        callsign: "AIR FRONTIER"
    }, {
        icao: "RRZ",
        callsign: "ROLLRIGHT"
    }, {
        icao: "RRL",
        callsign: "MERLIN"
    }, {
        icao: "BTU",
        callsign: "ROLLS"
    }, {
        icao: "ROF",
        callsign: "ROMAF"
    }, {
        icao: "RMV",
        callsign: "AEROMAVIA"
    }, {
        icao: "RNS",
        callsign: "RONSO"
    }, {
        icao: "ROR",
        callsign: "RORAIMA"
    }, {
        icao: "RNB",
        callsign: "ROSBALT"
    }, {
        icao: "NRG",
        callsign: "ENERGY"
    }, {
        icao: "RSS",
        callsign: "ROSS CHARTER"
    }, {
        icao: "ROS",
        callsign: "CATCHER"
    }, {
        icao: "SDM",
        callsign: "RUSSIA"
    }, {
        icao: "RAL",
        callsign: "ROSWELL"
    }, {
        icao: "RAR",
        callsign: "AIR RAROTONGA"
    }, {
        icao: "RTR",
        callsign: "ROTATUR"
    }, {
        icao: "RKT",
        callsign: "ROCKET"
    }, {
        icao: "JCR",
        callsign: "ROTTERDAM JETCENTER"
    }, {
        icao: "ROV",
        callsign: "ROVERAIR"
    }, {
        icao: "VOS",
        callsign: "ROVOS"
    }, {
        icao: "RCG",
        callsign: "ROYAL CARGO"
    }, {
        icao: "RFR",
        callsign: "RAFAIR"
    }, {
        icao: "MJN",
        callsign: "MAJAN"
    }, {
        icao: "ACW",
        callsign: "AIR CADET"
    }, {
        icao: "RRR",
        callsign: "ASCOT"
    }, {
        icao: "RRF",
        callsign: "KITTY"
    }, {
        icao: "SHF",
        callsign: "VORTEX"
    }, {
        icao: "RAX",
        callsign: "AIR ROYAL"
    }, {
        icao: "RAM",
        callsign: "ROYALAIR MAROC"
    }, {
        icao: "RPK",
        callsign: "ROYAL PAKISTAN"
    }, {
        icao: "RLM",
        callsign: "ROYAL AMERICAN"
    }, {
        icao: "RYL",
        callsign: "ROYAL ARUBAN"
    }, {
        icao: "ASY",
        callsign: "AUSSIE"
    }, {
        icao: "RXP",
        callsign: "ROY EXPRESS"
    }, {
        icao: "RYB",
        callsign: "ROYAL BAHRAIN"
    }, {
        icao: "RBA",
        callsign: "BRUNEI"
    }, {
        icao: "KDR",
        callsign: "DARLINES"
    }, {
        icao: "RGA",
        callsign: "ROYAL GHANA"
    }, {
        icao: "ROJ",
        callsign: "ROYALJET"
    }, {
        icao: "RJA",
        callsign: "JORDANIAN"
    }, {
        icao: "RJZ",
        callsign: "JORDAN AIR FORCE"
    }, {
        icao: "RCT",
        callsign: "GREENSKY"
    }, {
        icao: "RKH",
        callsign: "KHMER AIR"
    }, {
        icao: "RMF",
        callsign: "ANGKASA"
    }, {
        icao: "NVY",
        callsign: "NAVY"
    }, {
        icao: "NRN",
        callsign: "NETHERLANDS NAVY"
    }, {
        icao: "NAF",
        callsign: "NETHERLANDS AIR FORCE"
    }, {
        icao: "KIW",
        callsign: "KIWI"
    }, {
        icao: "NOW",
        callsign: "NORWEGIAN"
    }, {
        icao: "PPW",
        callsign: "PHNOMPENH AIR"
    }, {
        icao: "RRA",
        callsign: "ROYAL RWANDA"
    }, {
        icao: "RSF",
        callsign: "ARSAF"
    }, {
        icao: "RYS",
        callsign: "MAGIC SUN"
    }, {
        icao: "RSN",
        callsign: "SWAZI NATIONAL"
    }, {
        icao: "HRH",
        callsign: "TONGA ROYAL"
    }, {
        icao: "RWE",
        callsign: "ROYAL WEST"
    }, {
        icao: "RSB",
        callsign: "RUBYSTAR"
    }, {
        icao: "RLH",
        callsign: "SENDI"
    }, {
        icao: "RMG",
        callsign: "RUMUGU AIR"
    }, {
        icao: "CGI",
        callsign: "CGIRUSAIR"
    }, {
        icao: "RLU",
        callsign: "RUSLINE AIR"
    }, {
        icao: "MIG",
        callsign: "MIG AVIA"
    }, {
        icao: "RFF",
        callsign: "RUSSIAN AIRFORCE"
    }, {
        icao: "ESL",
        callsign: "RADUGA"
    }, {
        icao: "RUZ",
        callsign: "ROSTUERTOL"
    }, {
        icao: "RUC",
        callsign: "RUTACA"
    }, {
        icao: "RND",
        callsign: "RUTLAND"
    }, {
        icao: "RWD",
        callsign: "RWANDAIR"
    }, {
        icao: "RWL",
        callsign: "RHEINTRAINER"
    }, {
        icao: "RYA",
        callsign: "RYAN AIR"
    }, {
        icao: "RYN",
        callsign: "RYAN INTERNATIONAL"
    }, {
        icao: "RYR",
        callsign: "RYANAIR"
    }, {
        icao: "RUK",
        callsign: "BLUEMAX"
    }, {
        icao: "RYZ",
        callsign: "RYAZAN AIR"
    }, {
        icao: "RAA",
        callsign: "RYNES AVIATION"
    }, {
        icao: "REV",
        callsign: "ENDURANCE"
    }, {
        icao: "OMN",
        callsign: "SERVIOMNIA"
    }, {
        icao: "SEN",
        callsign: "SERVISIERRA"
    }, {
        icao: "SGC",
        callsign: "SAINT GEORGE"
    }, {
        icao: "SCJ",
        callsign: "SIAMJET"
    }, {
        icao: "SIX",
        callsign: "DRIVE ORANGE"
    }, {
        icao: "QSR",
        callsign: "SPARKLE ROLL"
    }, {
        icao: "KBN",
        callsign: "KABIN"
    }, {
        icao: "CBN",
        callsign: "CARBONDALE"
    }, {
        icao: "IBG",
        callsign: "ICE BRIDGE"
    }, {
        icao: "BZQ",
        callsign: "STING"
    }, {
        icao: "BVV",
        callsign: "SPARC"
    }, {
        icao: "SJM",
        callsign: "SINO SKY"
    }, {
        icao: "SCH",
        callsign: "OCEAN BIRD"
    }, {
        icao: "BYF",
        callsign: "BAY FLIGHT"
    }, {
        icao: "SXT",
        callsign: "SERTAXI"
    }, {
        icao: "TGW",
        callsign: "SCOOTER"
    }, {
        icao: "SJO",
        callsign: "JEY SPRING"
    }, {
        icao: "SBD",
        callsign: "SIBIA"
    }, {
        icao: "ART",
        callsign: "SMART LYNX"
    }, {
        icao: "MYX",
        callsign: "TALLINN CAT"
    }, {
        icao: "TVS",
        callsign: "SKYTRAVEL"
    }, {
        icao: "TVL",
        callsign: "TRAVEL SERVICE"
    }, {
        icao: "TVP",
        callsign: "JETTRAVEL"
    }, {
        icao: "TVQ",
        callsign: "SLOVAKTRAVEL"
    }, {
        icao: "DES",
        callsign: "DESTINA"
    }, {
        icao: "FUF",
        callsign: "SERVIFUN"
    }, {
        icao: "VGO",
        callsign: "VIRGO"
    }, {
        icao: "SMU",
        callsign: "SPRINGER"
    }, {
        icao: "RBR",
        callsign: "SIAM AIRNET"
    }, {
        icao: "SVB",
        callsign: "SIAVIA"
    }, {
        icao: "MHQ",
        callsign: "HELICARE"
    }, {
        icao: "BIS",
        callsign: "JUMA AIR"
    }, {
        icao: "KYE",
        callsign: "SKY CUBE"
    }, {
        icao: "KPM",
        callsign: "SKY PRIMAIR"
    }, {
        icao: "BSJ",
        callsign: "SKYBUS JET"
    }, {
        icao: "SGR",
        callsign: "SKYGREECE"
    }, {
        icao: "USW",
        callsign: "AKSAR"
    }, {
        icao: "SHA",
        callsign: "SHARP"
    }, {
        icao: "SHA",
        callsign: "SHREEAIR"
    }, {
        icao: "AWU",
        callsign: "SYLTAIR"
    }, {
        icao: "BDS",
        callsign: "SOUTH ASIAN"
    }, {
        icao: "SZB",
        callsign: "SAMOA"
    }, {
        icao: "RZO",
        callsign: "AIR AZORES"
    }, {
        icao: "SAA",
        callsign: "SPRINGBOK"
    }, {
        icao: "KYD",
        callsign: "SKYAD"
    }, {
        icao: "SAB",
        callsign: "SKY WORKER"
    }, {
        icao: "SKV",
        callsign: "MAPLE"
    }, {
        icao: "SAC",
        callsign: "SASCO"
    }, {
        icao: "SAG",
        callsign: "MEDICAL AIR"
    }, {
        icao: "SAH",
        callsign: "SAYAKHAT"
    }, {
        icao: "SAI",
        callsign: "SHAHEEN AIR"
    }, {
        icao: "SAM",
        callsign: "SAM"
    }, {
        icao: "SAN",
        callsign: "AEREOS"
    }, {
        icao: "SAO",
        callsign: "SAVSER"
    }, {
        icao: "ANX",
        callsign: "SECRETARIA DEMARINA"
    }, {
        icao: "SAQ",
        callsign: "SPRINGBANK"
    }, {
        icao: "SAS",
        callsign: "SCANDINAVIAN"
    }, {
        icao: "SAW",
        callsign: "SHAMWING"
    }, {
        icao: "SAX",
        callsign: "SABAH AIR"
    }, {
        icao: "SAY",
        callsign: "SUCKLING"
    }, {
        icao: "SAZ",
        callsign: "SWISS AMBULANCE"
    }, {
        icao: "SBA",
        callsign: "SOL"
    }, {
        icao: "SGU",
        callsign: "SOLPARAGUAYO"
    }, {
        icao: "SBA",
        callsign: "STAMALI"
    }, {
        icao: "SBB",
        callsign: "SABER EXPRESS"
    }, {
        icao: "SEN",
        callsign: "TUNEXPRESS"
    }, {
        icao: "SBF",
        callsign: "SEVENAIR"
    }, {
        icao: "SBI",
        callsign: "SIBERIAN AIRLINES"
    }, {
        icao: "SBL",
        callsign: "SOBGHANA"
    }, {
        icao: "SBM",
        callsign: "SKY BAHAMAS"
    }, {
        icao: "SBO",
        callsign: "STABAIR"
    }, {
        icao: "SBQ",
        callsign: "SKIBBLE"
    }, {
        icao: "SBR",
        callsign: "FREIGHTER"
    }, {
        icao: "SBS",
        callsign: "SEABORNE"
    }, {
        icao: "SBU",
        callsign: "BLACK FIN"
    }, {
        icao: "URJ",
        callsign: "STARAV"
    }, {
        icao: "SDG",
        callsign: "HISTAR"
    }, {
        icao: "SJX",
        callsign: "STARWALKER"
    }, {
        icao: "SBZ",
        callsign: "SCIBE AIRLIFT"
    }, {
        icao: "AME",
        callsign: "AIRMIL"
    }, {
        icao: "SCA",
        callsign: "SOUTH CENTRAL"
    }, {
        icao: "SCC",
        callsign: "SEACOASTER"
    }, {
        icao: "SQH",
        callsign: "SASQUATCH"
    }, {
        icao: "SCE",
        callsign: "SCENIC"
    }, {
        icao: "SCF",
        callsign: "SOCOFER"
    }, {
        icao: "SCI",
        callsign: "SAN CRISTOBAL"
    }, {
        icao: "SCK",
        callsign: "SKYCAM"
    }, {
        icao: "SCL",
        callsign: "SWIFTAIR"
    }, {
        icao: "SCB",
        callsign: "SAIGON"
    }, {
        icao: "SCN",
        callsign: "SOUTH AMERICAN"
    }, {
        icao: "AHI",
        callsign: "AEROCHISA"
    }, {
        icao: "AND",
        callsign: "SERVI ANDES"
    }, {
        icao: "SCP",
        callsign: "SCORPIO"
    }, {
        icao: "SCQ",
        callsign: "SCAVAC"
    }, {
        icao: "SIC",
        callsign: "SICHART"
    }, {
        icao: "SCR",
        callsign: "SILVER CLOUD"
    }, {
        icao: "SCS",
        callsign: "SOUTHERN CHARTERS"
    }, {
        icao: "SCT",
        callsign: "SAABCRAFT"
    }, {
        icao: "SCV",
        callsign: "SACSA"
    }, {
        icao: "SCX",
        callsign: "SUN COUNTRY"
    }, {
        icao: "SDA",
        callsign: "SAINT ANDREWS"
    }, {
        icao: "SDB",
        callsign: "SUCRAFT"
    }, {
        icao: "SDC",
        callsign: "SUNDANCE"
    }, {
        icao: "SDD",
        callsign: "SKY DANCE"
    }, {
        icao: "SDE",
        callsign: "STAMPEDE"
    }, {
        icao: "SDF",
        callsign: "SUNDORPH"
    }, {
        icao: "SDH",
        callsign: "ARCOS"
    }, {
        icao: "SDK",
        callsign: "SADELCA"
    }, {
        icao: "SDL",
        callsign: "SKYDRIFT"
    }, {
        icao: "SDN",
        callsign: "BLUE NILE"
    }, {
        icao: "SDU",
        callsign: "SUD LINES"
    }, {
        icao: "SDV",
        callsign: "SELVA"
    }, {
        icao: "SDX",
        callsign: "SERVICIO TECNICO"
    }, {
        icao: "SDZ",
        callsign: "SUDANA"
    }, {
        icao: "SEA",
        callsign: "SOUTHEAST AIR"
    }, {
        icao: "SEB",
        callsign: "SERVILUCE"
    }, {
        icao: "SED",
        callsign: "SEDONA AIR"
    }, {
        icao: "SEE",
        callsign: "SHAHEEN CARGO"
    }, {
        icao: "SEH",
        callsign: "AIR CRETE"
    }, {
        icao: "SEJ",
        callsign: "SPICEJET"
    }, {
        icao: "SEK",
        callsign: "SKALA"
    }, {
        icao: "SEL",
        callsign: "SENTEL"
    }, {
        icao: "SEO",
        callsign: "SELCON AIR"
    }, {
        icao: "SEQ",
        callsign: "SKY EYES"
    }, {
        icao: "SES",
        callsign: "SERVISAL"
    }, {
        icao: "SET",
        callsign: "SAETA"
    }, {
        icao: "SEV",
        callsign: "CARGOPRESS"
    }, {
        icao: "SFA",
        callsign: "SEFA"
    }, {
        icao: "SFC",
        callsign: "SHUSWAP"
    }, {
        icao: "SFE",
        callsign: "SEFOFANE"
    }, {
        icao: "SFF",
        callsign: "SWIFTWING"
    }, {
        icao: "SFG",
        callsign: "AERO GULF"
    }, {
        icao: "SFJ",
        callsign: "STARFLYER"
    }, {
        icao: "SFL",
        callsign: "SOUTHFLIGHT"
    }, {
        icao: "SFN",
        callsign: "SAFIRAN"
    }, {
        icao: "SFP",
        callsign: "SAFE AIR"
    }, {
        icao: "SFR",
        callsign: "CARGO"
    }, {
        icao: "SFS",
        callsign: "SOUTHERN FRONTIER"
    }, {
        icao: "SFT",
        callsign: "SKYFREIGHT"
    }, {
        icao: "SFU",
        callsign: "SAINTS"
    }, {
        icao: "SFX",
        callsign: "SWAMP FOX"
    }, {
        icao: "SGB",
        callsign: "SONGBIRD"
    }, {
        icao: "SGC",
        callsign: "SOUTHERNRIGHT"
    }, {
        icao: "SGD",
        callsign: "AIR BISHKEK"
    }, {
        icao: "SGF",
        callsign: "STAC"
    }, {
        icao: "SGH",
        callsign: "SERVISAIR"
    }, {
        icao: "SGI",
        callsign: "SERAGRI"
    }, {
        icao: "SGK",
        callsign: "SKYWARD"
    }, {
        icao: "SGM",
        callsign: "SIGMA"
    }, {
        icao: "SGN",
        callsign: "SIAM"
    }, {
        icao: "SGP",
        callsign: "SAGOLAIR"
    }, {
        icao: "SGS",
        callsign: "SASKATCHEWAN"
    }, {
        icao: "SGT",
        callsign: "SKYGATE"
    }, {
        icao: "SGU",
        callsign: "RAUSHAN"
    }, {
        icao: "SGY",
        callsign: "SKAGWAY AIR"
    }, {
        icao: "SHB",
        callsign: "SHABAIR"
    }, {
        icao: "SHC",
        callsign: "SKY HARBOR CHEYENNE"
    }, {
        icao: "SHE",
        callsign: "SHELL"
    }, {
        icao: "SHG",
        callsign: "SHOP AIR"
    }, {
        icao: "SHJ",
        callsign: "SHARJAH"
    }, {
        icao: "SHL",
        callsign: "SAMSON"
    }, {
        icao: "SHM",
        callsign: "SHELTAM"
    }, {
        icao: "SHN",
        callsign: "SUGAR ALFA"
    }, {
        icao: "SHP",
        callsign: "SAF"
    }, {
        icao: "SHQ",
        callsign: "SHANGHAI CARGO"
    }, {
        icao: "SHR",
        callsign: "SHOOTER"
    }, {
        icao: "SHS",
        callsign: "SHURA AIR"
    }, {
        icao: "SHU",
        callsign: "SATAIR"
    }, {
        icao: "SAT",
        callsign: "SATA"
    }, {
        icao: "SHV",
        callsign: "SHAVANO"
    }, {
        icao: "SHW",
        callsign: "SHAWNEE"
    }, {
        icao: "SHX",
        callsign: "SLIM AIR"
    }, {
        icao: "SHY",
        callsign: "ANTALYA BIRD"
    }, {
        icao: "SIA",
        callsign: "SINGAPORE"
    }, {
        icao: "SIB",
        callsign: "SIBAVIA"
    }, {
        icao: "SIE",
        callsign: "SEREX"
    }, {
        icao: "SIH",
        callsign: "BLUEJET"
    }, {
        icao: "SIL",
        callsign: "SILVER WINGS"
    }, {
        icao: "SIL",
        callsign: "SERVICIOS INTEGRALES"
    }, {
        icao: "SIO",
        callsign: "SIRIO"
    }, {
        icao: "SIR",
        callsign: "SALAIR"
    }, {
        icao: "SIV",
        callsign: "SLOVENIAN"
    }, {
        icao: "SIW",
        callsign: "SIRIO EXECUTIVE"
    }, {
        icao: "SJA",
        callsign: "SERVICIOJAL"
    }, {
        icao: "SJC",
        callsign: "SERVIEJECUTIVO"
    }, {
        icao: "SJE",
        callsign: "SUNBIZ"
    }, {
        icao: "SJJ",
        callsign: "SPIRIT JET"
    }, {
        icao: "SJL",
        callsign: "SERVICIOS JALISCO"
    }, {
        icao: "SJT",
        callsign: "SWISS JET"
    }, {
        icao: "SJY",
        callsign: "SRIWIJAYA"
    }, {
        icao: "SMY",
        callsign: "NAJIM"
    }, {
        icao: "ALC",
        callsign: "ACOM"
    }, {
        icao: "SPS",
        callsign: "SPARK SHUTTLE"
    }, {
        icao: "SPT",
        callsign: "SPEED AVIATION"
    }, {
        icao: "SPU",
        callsign: "SPUTTER"
    }, {
        icao: "SPV",
        callsign: "SERVICIOS PRIVADOS"
    }, {
        icao: "SPW",
        callsign: "SPEEDWING"
    }, {
        icao: "SPX",
        callsign: "GLOW|UNITED STATES"
    }, {
        icao: "SQA",
        callsign: "SLOVAK AEROCLUB"
    }, {
        icao: "SQC",
        callsign: "SINGCARGO"
    }, {
        icao: "SQF",
        callsign: "SLOVAK AIRFORCE"
    }, {
        icao: "SQL",
        callsign: "ALQUILER"
    }, {
        icao: "SRA",
        callsign: "SAIR"
    }, {
        icao: "SRC",
        callsign: "SEARCA"
    }, {
        icao: "SRH",
        callsign: "SIEMREAP AIR"
    }, {
        icao: "SRK",
        callsign: "SKYFOX"
    }, {
        icao: "SRL",
        callsign: "STARLINE"
    }, {
        icao: "SRL",
        callsign: "SERVICIOS PERSONAL"
    }, {
        icao: "SRN",
        callsign: "SIRAIR"
    }, {
        icao: "SRO",
        callsign: "SAEREO"
    }, {
        icao: "SRQ",
        callsign: "SEAIR"
    }, {
        icao: "SRS",
        callsign: "PHOTO CHARLIE"
    }, {
        icao: "SRU",
        callsign: "STARUP"
    }, {
        icao: "SRW",
        callsign: "SARIA"
    }, {
        icao: "SRX",
        callsign: "SIERRA EX"
    }, {
        icao: "SRZ",
        callsign: "STRATO"
    }, {
        icao: "SSB",
        callsign: "SASIR"
    }, {
        icao: "SSC",
        callsign: "SOUTHERN SKIES"
    }, {
        icao: "SSD",
        callsign: "STAR SERVICE"
    }, {
        icao: "SSE",
        callsign: "SUNSET"
    }, {
        icao: "SSF",
        callsign: "SEVERSTAL"
    }, {
        icao: "SSG",
        callsign: "SLOVAK GOVERNMENT"
    }, {
        icao: "BBB",
        callsign: "BLACKBIRD"
    }, {
        icao: "SSK",
        callsign: "SKYSTAR"
    }, {
        icao: "SSO",
        callsign: "DOPE"
    }, {
        icao: "SSP",
        callsign: "STARSPEED"
    }, {
        icao: "SSQ",
        callsign: "SUNSTATE"
    }, {
        icao: "SSR",
        callsign: "SARDINIAN"
    }, {
        icao: "SSS",
        callsign: "SAESA"
    }, {
        icao: "SST",
        callsign: "SUNFLIGHT"
    }, {
        icao: "SSU",
        callsign: "SASCA"
    }, {
        icao: "SSV",
        callsign: "SKYTOUR"
    }, {
        icao: "SSW",
        callsign: "STREAMLINE"
    }, {
        icao: "SSY",
        callsign: "SIERRA SKY"
    }, {
        icao: "SSZ",
        callsign: "SPECSAVERS"
    }, {
        icao: "STA",
        callsign: "STAR"
    }, {
        icao: "STB",
        callsign: "STATUSALPHA"
    }, {
        icao: "STC",
        callsign: "STADIUM"
    }, {
        icao: "STD",
        callsign: "AERO AGUASCALINETES"
    }, {
        icao: "STE",
        callsign: "SEMITRANS"
    }, {
        icao: "STG",
        callsign: "STAGE"
    }, {
        icao: "STI",
        callsign: "SONTAIR"
    }, {
        icao: "STJ",
        callsign: "STELLAVIA"
    }, {
        icao: "STK",
        callsign: "STOBART"
    }, {
        icao: "STL",
        callsign: "STAPLEFORD"
    }, {
        icao: "STO",
        callsign: "SLOPS"
    }, {
        icao: "STQ",
        callsign: "STERA"
    }, {
        icao: "STU",
        callsign: "FUEGUINO"
    }, {
        icao: "STU",
        callsign: "STARSOM"
    }, {
        icao: "SUU",
        callsign: "SUNSTAR"
    }, {
        icao: "STV",
        callsign: "SATURN"
    }, {
        icao: "STW",
        callsign: "SIERRA WHISKEY"
    }, {
        icao: "STX",
        callsign: "STARSAWAY"
    }, {
        icao: "STY",
        callsign: "STYRIAN"
    }, {
        icao: "SUA",
        callsign: "AIR SILESIA"
    }, {
        icao: "SUB",
        callsign: "SUB AIR"
    }, {
        icao: "SUD",
        callsign: "SUDANAIR"
    }, {
        icao: "SUF",
        callsign: "SUNFLOWER"
    }, {
        icao: "FDY",
        callsign: "FRIENDLY"
    }, {
        icao: "SUG",
        callsign: "SUNU AIR"
    }, {
        icao: "SUH",
        callsign: "LIGHT AIR"
    }, {
        icao: "SUI",
        callsign: "SWISS AIR FORCE"
    }, {
        icao: "SUK",
        callsign: "SKYCARGO"
    }, {
        icao: "SUM",
        callsign: "SUMES"
    }, {
        icao: "SUS",
        callsign: "SUNSCAN"
    }, {
        icao: "URF",
        callsign: "SURF AIR"
    }, {
        icao: "SUT",
        callsign: "SISTEMAS AERONAUTICOS"
    }, {
        icao: "SUV",
        callsign: "DANCEAIR"
    }, {
        icao: "SVA",
        callsign: "SAUDIA"
    }, {
        icao: "SVD",
        callsign: "GRENADINES"
    }, {
        icao: "SVF",
        callsign: "SWEDEFORCE"
    }, {
        icao: "AWJ",
        callsign: "SAHEL AIRLINES"
    }, {
        icao: "SVH",
        callsign: "SILVER"
    }, {
        icao: "SVI",
        callsign: "SETRA"
    }, {
        icao: "SVL",
        callsign: "SEVAVIA"
    }, {
        icao: "SVN",
        callsign: "SAVANAIR"
    }, {
        icao: "SVO",
        callsign: "SERVIORIENTE"
    }, {
        icao: "SVS",
        callsign: "AEREOS SAAR"
    }, {
        icao: "SVT",
        callsign: "SIERRA SERVICES"
    }, {
        icao: "SVX",
        callsign: "SECURITY AIR"
    }, {
        icao: "SWA",
        callsign: "SOUTHWEST"
    }, {
        icao: "SWB",
        callsign: "SWISSBOOGIE"
    }, {
        icao: "SWC",
        callsign: "SAINT CLAIR"
    }, {
        icao: "SWD",
        callsign: "SOUTHERN WINDS"
    }, {
        icao: "SWE",
        callsign: "SWEDELINE"
    }, {
        icao: "SWG",
        callsign: "SUNWING"
    }, {
        icao: "SWI",
        callsign: "SUNWORLD"
    }, {
        icao: "SWJ",
        callsign: "STATES"
    }, {
        icao: "SWO",
        callsign: "SIVA"
    }, {
        icao: "SWP",
        callsign: "STAR WORK"
    }, {
        icao: "SWQ",
        callsign: "SWIFTFLIGHT"
    }, {
        icao: "SWR",
        callsign: "SWISS"
    }, {
        icao: "SWR",
        callsign: "SWISSAIR"
    }, {
        icao: "SDR",
        callsign: "SUNDAIR"
    }, {
        icao: "SWS",
        callsign: "SUNNY WEST"
    }, {
        icao: "SWT",
        callsign: "SWIFT"
    }, {
        icao: "SWU",
        callsign: "EUROSWISS"
    }, {
        icao: "SWV",
        callsign: "FLYING SWEDE"
    }, {
        icao: "SWW",
        callsign: "WAY AERO"
    }, {
        icao: "SWX",
        callsign: "SWAZI EXPRESS"
    }, {
        icao: "WSW",
        callsign: "SWOOP"
    }, {
        icao: "SWY",
        callsign: "SWISSLINK"
    }, {
        icao: "SWZ",
        callsign: "SWISSBIRD"
    }, {
        icao: "SWZ",
        callsign: "SKYWISE"
    }, {
        icao: "SXA",
        callsign: "FERRY"
    }, {
        icao: "SXC",
        callsign: "SKY EXEC"
    }, {
        icao: "SXE",
        callsign: "DOGWOOD EXPRESS"
    }, {
        icao: "SXM",
        callsign: "SERVIMEX"
    }, {
        icao: "SXS",
        callsign: "SUNEXPRESS"
    }, {
        icao: "SXT",
        callsign: "SERTA"
    }, {
        icao: "SXX",
        callsign: "SATELLITE EXPRESS"
    }, {
        icao: "SXY",
        callsign: "SAFARI EXPRESS"
    }, {
        icao: "SYA",
        callsign: "LINEAS CARDINAL"
    }, {
        icao: "SYC",
        callsign: "SYSTEC"
    }, {
        icao: "SYF",
        callsign: "SKY FIRST"
    }, {
        icao: "SYG",
        callsign: "SYNERGY"
    }, {
        icao: "SYK",
        callsign: "AEROCAB"
    }, {
        icao: "SYN",
        callsign: "SYNCRUDE"
    }, {
        icao: "SYR",
        callsign: "SYRIANAIR"
    }, {
        icao: "SYS",
        callsign: "SHAWBURY"
    }, {
        icao: "SYV",
        callsign: "SPECIAL SYSTEM"
    }, {
        icao: "SYX",
        callsign: "SKYWAYEX"
    }, {
        icao: "AZQ",
        callsign: "SILK LINE"
    }, {
        icao: "AZG",
        callsign: "SILK WEST"
    }, {
        icao: "SYY",
        callsign: "SKY COACH"
    }, {
        icao: "SZT",
        callsign: "AERO ZEE"
    }, {
        icao: "BHV",
        callsign: "AVIASPEC"
    }, {
        icao: "BLY",
        callsign: "BLARNEY"
    }, {
        icao: "BNC",
        callsign: "BARNACLE AIR"
    }, {
        icao: "BRZ",
        callsign: "BERYOZA"
    }, {
        icao: "RBG",
        callsign: "ARABIA EGYPT"
    }, {
        icao: "CBN",
        callsign: "CALIBRATION"
    }, {
        icao: "CDG",
        callsign: "SHANDONG"
    }, {
        icao: "CDS",
        callsign: "SPECDAS"
    }, {
        icao: "CEE",
        callsign: "CENTRA AEREOS"
    }, {
        icao: "CFL",
        callsign: "SWEDISH"
    }, {
        icao: "CGL",
        callsign: "SEAGLE"
    }, {
        icao: "CIG",
        callsign: "SIRIUS AERO"
    }, {
        icao: "CNK",
        callsign: "CHINOOK"
    }, {
        icao: "CNO",
        callsign: "SCANOR"
    }, {
        icao: "CQH",
        callsign: "AIR SPRING"
    }, {
        icao: "CSC",
        callsign: "SI CHUAN"
    }, {
        icao: "CSH",
        callsign: "SHANGHAI AIR"
    }, {
        icao: "CSY",
        callsign: "SHUANGYANG"
    }, {
        icao: "CSZ",
        callsign: "SHENZHEN AIR"
    }, {
        icao: "CXI",
        callsign: "TOURIST"
    }, {
        icao: "DKT",
        callsign: "DAKOTA"
    }, {
        icao: "DKY",
        callsign: "DAKOY"
    }, {
        icao: "DNI",
        callsign: "AERO DENIM"
    }, {
        icao: "EAB",
        callsign: "SWISS EAGLE"
    }, {
        icao: "EAN",
        callsign: "NIGERIA EXPRESS"
    }, {
        icao: "ERO",
        callsign: "ECHO ROMEO"
    }, {
        icao: "ESK",
        callsign: "RELAX"
    }, {
        icao: "EXY",
        callsign: "EXPRESSWAYS"
    }, {
        icao: "FFD",
        callsign: "FIRST FLIGHT"
    }, {
        icao: "FFH",
        callsign: "PEACE AIR"
    }, {
        icao: "FJE",
        callsign: "ENVOY"
    }, {
        icao: "FLH",
        callsign: "MILE HIGH"
    }, {
        icao: "GAD",
        callsign: "SOUTHCOAST"
    }, {
        icao: "GDE",
        callsign: "GADEL"
    }, {
        icao: "GDG",
        callsign: "GOLDEN GATE"
    }, {
        icao: "GIK",
        callsign: "SEBA"
    }, {
        icao: "GNA",
        callsign: "SERVIGANA"
    }, {
        icao: "GXL",
        callsign: "STARDUST"
    }, {
        icao: "HAU",
        callsign: "SKYHAUL"
    }, {
        icao: "HIP",
        callsign: "STARSA"
    }, {
        icao: "HJE",
        callsign: "GOSA"
    }, {
        icao: "HKA",
        callsign: "SPEND AIR"
    }, {
        icao: "HLO",
        callsign: "HALO"
    }, {
        icao: "SJB",
        callsign: "SOUTHER TIGER"
    }, {
        icao: "HRI",
        callsign: "HELIRIM"
    }, {
        icao: "HSK",
        callsign: "MATRA"
    }, {
        icao: "HSV",
        callsign: "HIGHSWEDE"
    }, {
        icao: "HSY",
        callsign: "HELISKY"
    }, {
        icao: "IGA",
        callsign: "IGUANA"
    }, {
        icao: "ILS",
        callsign: "SERVICIOS ILSA"
    }, {
        icao: "INK",
        callsign: "SINCOM AVIA"
    }, {
        icao: "IRV",
        callsign: "SAFAT AIR"
    }, {
        icao: "IRZ",
        callsign: "SAHA"
    }, {
        icao: "JAM",
        callsign: "SUNTRACK"
    }, {
        icao: "JCM",
        callsign: "SECUREAIR"
    }, {
        icao: "JIM",
        callsign: "SARK"
    }, {
        icao: "JKK",
        callsign: "SPANAIR"
    }, {
        icao: "KKS",
        callsign: "KOKSHE"
    }, {
        icao: "KOP",
        callsign: "COPTERS"
    }, {
        icao: "KSP",
        callsign: "SAEP"
    }, {
        icao: "KYR",
        callsign: "SKY AERONAUTICAL"
    }, {
        icao: "LGU",
        callsign: "LAGUNA"
    }, {
        icao: "LLA",
        callsign: "LEO LOPOZ"
    }, {
        icao: "LLS",
        callsign: "SERVIESTRELLA"
    }, {
        icao: "LMG",
        callsign: "SOUTH AFRICAN"
    }, {
        icao: "LMO",
        callsign: "SKY HOLDINGS"
    }, {
        icao: "LSP",
        callsign: "AIR TONY"
    }, {
        icao: "MCG",
        callsign: "MEDICOPTER"
    }, {
        icao: "MDT",
        callsign: "MIDNIGHT"
    }, {
        icao: "MLO",
        callsign: "MILENIO"
    }, {
        icao: "MMS",
        callsign: "MUSAAD AIR"
    }, {
        icao: "MRI",
        callsign: "MORITANI"
    }, {
        icao: "MRR",
        callsign: "MARINER"
    }, {
        icao: "MSG",
        callsign: "SARREGIONAL"
    }, {
        icao: "MSP",
        callsign: "SEGURIDAD"
    }, {
        icao: "SBW",
        callsign: "SNOWMAN"
    }, {
        icao: "NAD",
        callsign: "SEULAWAH"
    }, {
        icao: "NAZ",
        callsign: "NAZAS"
    }, {
        icao: "NCS",
        callsign: "COMMUTERCANADA"
    }, {
        icao: "NKS",
        callsign: "SPIRIT WINGS"
    }, {
        icao: "NON",
        callsign: "SERVICIOS LATINO"
    }, {
        icao: "NRZ",
        callsign: "MONARREZ"
    }, {
        icao: "NSC",
        callsign: "TRANSSOCIETE"
    }, {
        icao: "NSE",
        callsign: "SATENA"
    }, {
        icao: "NTB",
        callsign: "SERVINORTE"
    }, {
        icao: "NTG",
        callsign: "INTEGRALES"
    }, {
        icao: "OKS",
        callsign: "SLOK GAMBIA"
    }, {
        icao: "OKT",
        callsign: "SOKO AIR"
    }, {
        icao: "OLC",
        callsign: "SOLARCARGO"
    }, {
        icao: "OLO",
        callsign: "SOLO"
    }, {
        icao: "ONG",
        callsign: "SONNIG"
    }, {
        icao: "OSL",
        callsign: "SOSOLISO"
    }, {
        icao: "OSS",
        callsign: "NOTICIOSOS"
    }, {
        icao: "OTL",
        callsign: "SOUTHLINE"
    }, {
        icao: "OZW",
        callsign: "VELOCITY"
    }, {
        icao: "PIV",
        callsign: "AEROSOKOL"
    }, {
        icao: "PLT",
        callsign: "PALMETTO"
    }, {
        icao: "PMR",
        callsign: "SERVICIOS PREMIER"
    }, {
        icao: "PNS",
        callsign: "PENAS"
    }, {
        icao: "POB",
        callsign: "POBLANOS"
    }, {
        icao: "PSV",
        callsign: "PROSERVICIOS"
    }, {
        icao: "PTM",
        callsign: "POSTMAN"
    }, {
        icao: "PUR",
        callsign: "SPURWING"
    }, {
        icao: "PZR",
        callsign: "PHAZER"
    }, {
        icao: "RBW",
        callsign: "CAI HONG"
    }, {
        icao: "REJ",
        callsign: "REGIONAL LINK"
    }, {
        icao: "RER",
        callsign: "REGAIR"
    }, {
        icao: "RFT",
        callsign: "ROMANIAN ACADEMY"
    }, {
        icao: "RGC",
        callsign: "REGIOMONTANO"
    }, {
        icao: "RLS",
        callsign: "SAIRLINES"
    }, {
        icao: "RMP",
        callsign: "SERAMSA"
    }, {
        icao: "RSE",
        callsign: "RED SEA"
    }, {
        icao: "SKB",
        callsign: "SKYBUS"
    }, {
        icao: "SKC",
        callsign: "SKYMASTER AIR"
    }, {
        icao: "SKD",
        callsign: "SKY DAWG"
    }, {
        icao: "SKE",
        callsign: "SKYISLE"
    }, {
        icao: "AZG",
        callsign: "SAKSERVICE"
    }, {
        icao: "SKF",
        callsign: "SKYCRAFT"
    }, {
        icao: "SKG",
        callsign: "SKYCRAFTCANADA"
    }, {
        icao: "SKI",
        callsign: "SKYKING"
    }, {
        icao: "SKK",
        callsign: "SKYLINK"
    }, {
        icao: "SKL",
        callsign: "SKYCHARTER"
    }, {
        icao: "SKN",
        callsign: "SKYLINER"
    }, {
        icao: "SKO",
        callsign: "SKYWORK"
    }, {
        icao: "SKR",
        callsign: "SKYSCAPES"
    }, {
        icao: "SKS",
        callsign: "SKY SERVICE"
    }, {
        icao: "BBR",
        callsign: "SANTA BARBARA"
    }, {
        icao: "SKT",
        callsign: "SKY YOU"
    }, {
        icao: "SKU",
        callsign: "AEROSKY"
    }, {
        icao: "SKW",
        callsign: "SKYWEST"
    }, {
        icao: "SKX",
        callsign: "SKY EXPRESS"
    }, {
        icao: "SKY",
        callsign: "SKYMARK"
    }, {
        icao: "SKZ",
        callsign: "SKYWAYINC"
    }, {
        icao: "SLA",
        callsign: "SELAIR"
    }, {
        icao: "SLB",
        callsign: "SLOK AIR"
    }, {
        icao: "SLD",
        callsign: "SILVERLINE"
    }, {
        icao: "SLE",
        callsign: "SLIPSTREAM"
    }, {
        icao: "SLF",
        callsign: "ELISTARFLY"
    }, {
        icao: "SLG",
        callsign: "LIFEGUARD"
    }, {
        icao: "SLH",
        callsign: "SILVERHAWK"
    }, {
        icao: "AGE",
        callsign: "AEROANGEL"
    }, {
        icao: "SLK",
        callsign: "SILKAIR"
    }, {
        icao: "SLL",
        callsign: "SLOV LINE"
    }, {
        icao: "SLM",
        callsign: "SURINAM"
    }, {
        icao: "SLN",
        callsign: "SLOANE"
    }, {
        icao: "SLP",
        callsign: "SALPA"
    }, {
        icao: "SLS",
        callsign: "SERVICIOS SLAINTE"
    }, {
        icao: "SLV",
        callsign: "AVISTELLA"
    }, {
        icao: "SLW",
        callsign: "SALMA AIR"
    }, {
        icao: "SLX",
        callsign: "SETE"
    }, {
        icao: "SLY",
        callsign: "SKYCO"
    }, {
        icao: "SLZ",
        callsign: "LUZA"
    }, {
        icao: "SMA",
        callsign: "SESAME"
    }, {
        icao: "SMC",
        callsign: "SAMER"
    }, {
        icao: "SMD",
        callsign: "SERVICIOS MARQUESA"
    }, {
        icao: "SME",
        callsign: "SEMICH"
    }, {
        icao: "SMF",
        callsign: "GORDON"
    }, {
        icao: "SMH",
        callsign: "SMITHAIR"
    }, {
        icao: "SMK",
        callsign: "ERTIS"
    }, {
        icao: "SML",
        callsign: "SMITH AIR"
    }, {
        icao: "SMM",
        callsign: "SUMMIT"
    }, {
        icao: "SMQ",
        callsign: "SAMAR AIR"
    }, {
        icao: "SMR",
        callsign: "SOMON AIR"
    }, {
        icao: "SMT",
        callsign: "SKYLIMIT"
    }, {
        icao: "AOS",
        callsign: "AEROSOL"
    }, {
        icao: "SNA",
        callsign: "SENATOR"
    }, {
        icao: "SNB",
        callsign: "STERLING"
    }, {
        icao: "SNE",
        callsign: "SANSA"
    }, {
        icao: "SNF",
        callsign: "SHANS AIR"
    }, {
        icao: "SNH",
        callsign: "SENSERVICE"
    }, {
        icao: "SNI",
        callsign: "SAVANAHLINE"
    }, {
        icao: "SNJ",
        callsign: "NEWSKY"
    }, {
        icao: "SNK",
        callsign: "SUN KING"
    }, {
        icao: "SNL",
        callsign: "SOONAIR"
    }, {
        icao: "SNM",
        callsign: "SERVIZI AEREI"
    }, {
        icao: "SNP",
        callsign: "SUN PACIFIC"
    }, {
        icao: "SNQ",
        callsign: "EXECUQUEST"
    }, {
        icao: "SNT",
        callsign: "SUNCOAST"
    }, {
        icao: "SNV",
        callsign: "SUDANESE"
    }, {
        icao: "SNW",
        callsign: "SUN WEST"
    }, {
        icao: "SNX",
        callsign: "SUNEX"
    }, {
        icao: "SOB",
        callsign: "STABO"
    }, {
        icao: "SOH",
        callsign: "SOUTHERN OHIO"
    }, {
        icao: "SOI",
        callsign: "SOAVAIR"
    }, {
        icao: "SOL",
        callsign: "SOLOMON"
    }, {
        icao: "SOM",
        callsign: "SOMALAIR"
    }, {
        icao: "SON",
        callsign: "SUNSHINE TOURS"
    }, {
        icao: "SOO",
        callsign: "SOUTHERN AIR"
    }, {
        icao: "SOP",
        callsign: "SOLINAIR"
    }, {
        icao: "SOR",
        callsign: "SONAIR"
    }, {
        icao: "SOT",
        callsign: "SOUTH COURIER"
    }, {
        icao: "SOU",
        callsign: "SOUTHERN EXPRESS"
    }, {
        icao: "SOV",
        callsign: "SARATOV AIR"
    }, {
        icao: "SOW",
        callsign: "SOWIND"
    }, {
        icao: "SOW",
        callsign: "SPARROW"
    }, {
        icao: "SOX",
        callsign: "SOLIDAIR"
    }, {
        icao: "SOZ",
        callsign: "SATCO"
    }, {
        icao: "SPA",
        callsign: "SIERRA PACIFIC"
    }, {
        icao: "SPB",
        callsign: "SPRING CLASSIC"
    }, {
        icao: "SPC",
        callsign: "SPARK CARGO"
    }, {
        icao: "SPE",
        callsign: "SPRAGUE"
    }, {
        icao: "SPF",
        callsign: "SPACE WORLD"
    }, {
        icao: "SPG",
        callsign: "SPRING AIR"
    }, {
        icao: "SPH",
        callsign: "SAPPHIRECHARTER"
    }, {
        icao: "SPI",
        callsign: "SOUTH PACIFIC"
    }, {
        icao: "SPK",
        callsign: "SPARK"
    }, {
        icao: "SPL",
        callsign: "CORPORATIVOS LAGUNA"
    }, {
        icao: "SPN",
        callsign: "AIR SKORPIO"
    }, {
        icao: "SPP",
        callsign: "SAPPHIRE"
    }, {
        icao: "SPQ",
        callsign: "SERVICOS PALENQUE"
    }, {
        icao: "TBS",
        callsign: "TRIBASA"
    }, {
        icao: "TCF",
        callsign: "MERCURY"
    }, {
        icao: "SVV",
        callsign: "SALT"
    }, {
        icao: "TGT",
        callsign: "TARGET"
    }, {
        icao: "THB",
        callsign: "THAI SABAI"
    }, {
        icao: "TIH",
        callsign: "TIRIAC AIR"
    }, {
        icao: "TRL",
        callsign: "STARSTREAM"
    }, {
        icao: "TRN",
        callsign: "AEROTRON"
    }, {
        icao: "TTM",
        callsign: "TOUTAIR"
    }, {
        icao: "TZU",
        callsign: "TAMAZULA"
    }, {
        icao: "UGP",
        callsign: "SHARINK"
    }, {
        icao: "UKU",
        callsign: "PYSHMA"
    }, {
        icao: "UNT",
        callsign: "UNIVERSITARIO"
    }, {
        icao: "USK",
        callsign: "SKIFAIR"
    }, {
        icao: "USN",
        callsign: "SAMAS"
    }, {
        icao: "UZS",
        callsign: "SOGDIANA"
    }, {
        icao: "VDO",
        callsign: "AVANDARO"
    }, {
        icao: "VGS",
        callsign: "SMART"
    }, {
        icao: "VRB",
        callsign: "SILVERBACK"
    }, {
        icao: "VRS",
        callsign: "VAIRSA"
    }, {
        icao: "VSV",
        callsign: "VLASTA"
    }, {
        icao: "VXN",
        callsign: "VIXEN"
    }, {
        icao: "TWY",
        callsign: "TWILIGHT"
    }, {
        icao: "WCC",
        callsign: "WEST COAST"
    }, {
        icao: "WFC",
        callsign: "SWIFTCOPTERS"
    }, {
        icao: "WLK",
        callsign: "SKYWATCH"
    }, {
        icao: "XLK",
        callsign: "SAFARILINK"
    }, {
        icao: "XMX",
        callsign: "SENEAM"
    }, {
        icao: "XTA",
        callsign: "TEXTRA"
    }, {
        icao: "XTR",
        callsign: "EXTER"
    }, {
        icao: "YBE",
        callsign: "YELLOW BIRD"
    }, {
        icao: "SXN",
        callsign: "SAXONAIR"
    }, {
        icao: "CSS",
        callsign: "SHUN FENG"
    }, {
        icao: "SAF",
        callsign: "SINGA"
    }, {
        icao: "KFE",
        callsign: "SKYFIRST"
    }, {
        icao: "SQP",
        callsign: "SKYUP"
    }, {
        icao: "LLC",
        callsign: "SMALL PLANET"
    }, {
        icao: "LLP",
        callsign: "SKYPOL"
    }, {
        icao: "LLI",
        callsign: "AURIGA"
    }, {
        icao: "LLX",
        callsign: "GERMANJET"
    }, {
        icao: "ALK",
        callsign: "SRILANKAN"
    }, {
        icao: "SRR",
        callsign: "WHITESTAR"
    }, {
        icao: "HCW",
        callsign: "STAR1"
    }, {
        icao: "TLK",
        callsign: "STARLINK"
    }, {
        icao: "UFA",
        callsign: "FLIGHT ACADEMY"
    }, {
        icao: "CDL",
        callsign: "CAROLINA"
    }, {
        icao: "SXD",
        callsign: "SUNRISE"
    }, {
        icao: "RZ",
        callsign: "YANGTZE RIVER"
    }, {
        icao: "ATC",
        callsign: "TANZANIA"
    }, {
        icao: "TOW",
        callsign: "TOWLINE"
    }, {
        icao: "SRQ",
        callsign: "BLUE JAY"
    }, {
        icao: "TLO",
        callsign: "TALON AIR"
    }, {
        icao: "EXS",
        callsign: "CHANNEX"
    }, {
        icao: "OSY",
        callsign: "OPEN SKIES"
    }, {
        icao: "TGR",
        callsign: "SATGURAIR"
    }, {
        icao: "DTA",
        callsign: "DTA"
    }, {
        icao: "IRF",
        callsign: "TAAIR"
    }, {
        icao: "TBI",
        callsign: "TAB INTERNATIONAL"
    }, {
        icao: "TBM",
        callsign: "TABAN AIR"
    }, {
        icao: "THO",
        callsign: "LEMPIRA"
    }, {
        icao: "TCV",
        callsign: "CABOVERDE"
    }, {
        icao: "TDC",
        callsign: "TADAIR"
    }, {
        icao: "TES",
        callsign: "TESABAN"
    }, {
        icao: "HET",
        callsign: "HELITAF"
    }, {
        icao: "TSD",
        callsign: "TAFI"
    }, {
        icao: "SBT",
        callsign: "TAFTAN"
    }, {
        icao: "FPG",
        callsign: "TAG AVIATION"
    }, {
        icao: "TGM",
        callsign: "TAG ESPANA"
    }, {
        icao: "VIP",
        callsign: "SOVEREIGN"
    }, {
        icao: "TAG",
        callsign: "TAG US"
    }, {
        icao: "TWI",
        callsign: "TAILWIND"
    }, {
        icao: "TIN",
        callsign: "TAINO"
    }, {
        icao: "TFB",
        callsign: "ROYAL TEEAIR"
    }, {
        icao: "TJK",
        callsign: "TAJIKAIR"
    }, {
        icao: "TZK",
        callsign: "TAJIKISTAN"
    }, {
        icao: "TKE",
        callsign: "ISLAND BIRD"
    }, {
        icao: "JEL",
        callsign: "JETEL"
    }, {
        icao: "TAL",
        callsign: "TALAIR"
    }, {
        icao: "TFF",
        callsign: "TALON FLIGHT"
    }, {
        icao: "LAP",
        callsign: "PARAGUAYA"
    }, {
        icao: "TAE",
        callsign: "TAME"
    }, {
        icao: "TMI",
        callsign: "TAMIRWAYS"
    }, {
        icao: "TPA",
        callsign: "TAMPA"
    }, {
        icao: "TNR",
        callsign: "TAN AIR"
    }, {
        icao: "TDM",
        callsign: "TANDEM"
    }, {
        icao: "HTO",
        callsign: "HELI TANGO"
    }, {
        icao: "TAP",
        callsign: "AIR PORTUGAL"
    }, {
        icao: "UTM",
        callsign: "AVIATAPS"
    }, {
        icao: "TPS",
        callsign: "TAPSA"
    }, {
        icao: "TQN",
        callsign: "TAQUAN"
    }, {
        icao: "THC",
        callsign: "TARHEEL"
    }, {
        icao: "TPL",
        callsign: "INTERPILOT"
    }, {
        icao: "IRR",
        callsign: "TARAIR"
    }, {
        icao: "TKJ",
        callsign: "TARKIM AVIATION"
    }, {
        icao: "ROT",
        callsign: "TAROM"
    }, {
        icao: "RMS",
        callsign: "TASS AIR"
    }, {
        icao: "CTP",
        callsign: "CORTAS"
    }, {
        icao: "TMN",
        callsign: "TASMAN"
    }, {
        icao: "DTH",
        callsign: "TASSILI AIR"
    }, {
        icao: "TVR",
        callsign: "TAVREY"
    }, {
        icao: "TQE",
        callsign: "TAXAIR"
    }, {
        icao: "TXL",
        callsign: "TAXI COZATL"
    }, {
        icao: "TXM",
        callsign: "TAXIMEX"
    }, {
        icao: "TUO",
        callsign: "TURISTICO"
    }, {
        icao: "XNR",
        callsign: "TAXI NORTE"
    }, {
        icao: "TDV",
        callsign: "TAXI EVORA"
    }, {
        icao: "TRF",
        callsign: "TAXI JET"
    }, {
        icao: "VRC",
        callsign: "VERACRUZ"
    }, {
        icao: "TXR",
        callsign: "TAXIREY"
    }, {
        icao: "TPR",
        callsign: "TAXIS PARRAL"
    }, {
        icao: "TXO",
        callsign: "TAXIS SINALOA"
    }, {
        icao: "TNE",
        callsign: "TAXINOROESTE"
    }, {
        icao: "TPF",
        callsign: "TAXIPACIFICO"
    }, {
        icao: "TMH",
        callsign: "TAXIMARAKAME"
    }, {
        icao: "TYF",
        callsign: "TAYFLITE"
    }, {
        icao: "TFY",
        callsign: "TAYSIDE"
    }, {
        icao: "VNZ",
        callsign: "TBILAVIA"
    }, {
        icao: "RRY",
        callsign: "AIRFERRY"
    }, {
        icao: "TCD",
        callsign: "TCHADLINES"
    }, {
        icao: "TIM",
        callsign: "TEAM BRASIL"
    }, {
        icao: "TLW",
        callsign: "TEAMLINE"
    }, {
        icao: "TEM",
        callsign: "TECHMONT"
    }, {
        icao: "TEF",
        callsign: "TECFOTO"
    }, {
        icao: "TBN",
        callsign: "TEEBAH"
    }, {
        icao: "THR",
        callsign: "TEHRAN AIR"
    }, {
        icao: "CYF",
        callsign: "TUS AIR"
    }, {
        icao: "TCM",
        callsign: "TELEDYNE"
    }, {
        icao: "TLX",
        callsign: "TELESIS"
    }, {
        icao: "TEL",
        callsign: "TELFORD"
    }, {
        icao: "TDE",
        callsign: "TELLURIDE"
    }, {
        icao: "DOT",
        callsign: "DOT TEL"
    }, {
        icao: "TEH",
        callsign: "TEMPELHOF"
    }, {
        icao: "TMS",
        callsign: "TEMSCO"
    }, {
        icao: "TNL",
        callsign: "SKY HORSE"
    }, {
        icao: "TEB",
        callsign: "TENIR AIR"
    }, {
        icao: "TEN",
        callsign: "TENNESSEE"
    }, {
        icao: "TET",
        callsign: "TEPAVIA"
    }, {
        icao: "TER",
        callsign: "TERRIAIRE"
    }, {
        icao: "TIS",
        callsign: "TESIS"
    }, {
        icao: "TXZ",
        callsign: "TEX STAR"
    }, {
        icao: "TXA",
        callsign: "OKAY AIR"
    }, {
        icao: "TXT",
        callsign: "TEXAS CHARTER"
    }, {
        icao: "TXS",
        callsign: "TEXAIR"
    }, {
        icao: "CWT",
        callsign: "TEXAS AIRWAYS"
    }, {
        icao: "TXN",
        callsign: "TEXAS NATIONAL"
    }, {
        icao: "TEZ",
        callsign: "TEZJET"
    }, {
        icao: "TGC",
        callsign: "THANET"
    }, {
        icao: "TCG",
        callsign: "THAI CARGO"
    }, {
        icao: "AIQ",
        callsign: "THAI ASIA"
    }, {
        icao: "TAX",
        callsign: "EXPRESS WING"
    }, {
        icao: "THA",
        callsign: "THAI"
    }, {
        icao: "TSL",
        callsign: "THAI AVIATION"
    }, {
        icao: "TFH",
        callsign: "THAI HELICOPTER"
    }, {
        icao: "TFT",
        callsign: "THAI FLYING"
    }, {
        icao: "THG",
        callsign: "THAI GLOBAL"
    }, {
        icao: "THJ",
        callsign: "THAI JET"
    }, {
        icao: "TLM",
        callsign: "MENTARI"
    }, {
        icao: "TPV",
        callsign: "THAI PACIFIC"
    }, {
        icao: "LLR",
        callsign: "THAI SKY AIR"
    }, {
        icao: "THD",
        callsign: "THAI SMILE"
    }, {
        icao: "TSX",
        callsign: "THAI STAR"
    }, {
        icao: "TVJ",
        callsign: "THAIVIET JET"
    }, {
        icao: "GFN",
        callsign: "GRIFFON"
    }, {
        icao: "LEG",
        callsign: "LEGACY"
    }, {
        icao: "LCC",
        callsign: "LANCAIR"
    }, {
        icao: "TCW",
        callsign: "KESTREL"
    }, {
        icao: "TCX",
        callsign: "KESTREL"
    }, {
        icao: "THU",
        callsign: "AIR THUNDER"
    }, {
        icao: "TBD",
        callsign: "ORCA"
    }, {
        icao: "BLI",
        callsign: "BLUELINE"
    }, {
        icao: "GCR",
        callsign: "BO HAI"
    }, {
        icao: "TNM",
        callsign: "TIARA"
    }, {
        icao: "TBA",
        callsign: "TIBET"
    }, {
        icao: "TIK",
        callsign: "TICAIR"
    }, {
        icao: "TJN",
        callsign: "NERON"
    }, {
        icao: "TGG",
        callsign: "TIGGOZ"
    }, {
        icao: "MDL",
        callsign: "MANDALA"
    }, {
        icao: "TGW",
        callsign: "GO CAT"
    }, {
        icao: "TTW",
        callsign: "SMART CAT"
    }, {
        icao: "MOH",
        callsign: "MOTH"
    }, {
        icao: "TKC",
        callsign: "TIKAL"
    }, {
        icao: "TMR",
        callsign: "TIMBER"
    }, {
        icao: "TIE",
        callsign: "TIME AIR"
    }, {
        icao: "BOX",
        callsign: "BOX"
    }, {
        icao: "TVI",
        callsign: "TIRAMAVIA"
    }, {
        icao: "AWC",
        callsign: "ZAP"
    }, {
        icao: "TYJ",
        callsign: "TYROLMALTA"
    }, {
        icao: "TSR",
        callsign: "SAN MARINO"
    }, {
        icao: "TLS",
        callsign: "TEALSY"
    }, {
        icao: "TMM",
        callsign: "WILLOW RUN"
    }, {
        icao: "TAY",
        callsign: "QUALITY"
    }, {
        icao: "NTR",
        callsign: "NITRO"
    }, {
        icao: "TBX",
        callsign: "TABEX"
    }, {
        icao: "TOB",
        callsign: "TOBRUK AIR"
    }, {
        icao: "TOJ",
        callsign: "TOJ AIRLINE"
    }, {
        icao: "TOL",
        callsign: "TOL AIR"
    }, {
        icao: "TMK",
        callsign: "TOMAHAWK"
    }, {
        icao: "TOP",
        callsign: "AIR TOP"
    }, {
        icao: "CHE",
        callsign: "CHECK AIR"
    }, {
        icao: "TLY",
        callsign: "TOPFLY"
    }, {
        icao: "LKW",
        callsign: "TOPINTER"
    }, {
        icao: "TPD",
        callsign: "TOP SPEED"
    }, {
        icao: "TTL",
        callsign: "TOTAL"
    }, {
        icao: "THE",
        callsign: "TOUMAI AIR"
    }, {
        icao: "THF",
        callsign: "TOURAINE HELICO"
    }, {
        icao: "TOW",
        callsign: "TEE AIR"
    }, {
        icao: "TOY",
        callsign: "TOYOTA"
    }, {
        icao: "TGE",
        callsign: "TASA"
    }, {
        icao: "AIM",
        callsign: "PIJO"
    }, {
        icao: "TVH",
        callsign: "TRAVASA"
    }, {
        icao: "TDR",
        callsign: "TRADEAIR"
    }, {
        icao: "GPD",
        callsign: "GOODSPEED"
    }, {
        icao: "TDX",
        callsign: "TRADEWINDS EXPRESS"
    }, {
        icao: "TWL",
        callsign: "TRADEWINDS CANADA"
    }, {
        icao: "JCH",
        callsign: "TRADING CARGO"
    }, {
        icao: "TDO",
        callsign: "TRADO"
    }, {
        icao: "HBA",
        callsign: "HARBOR AIR"
    }, {
        icao: "TMQ",
        callsign: "TRAM AIR"
    }, {
        icao: "TMX",
        callsign: "TRAMON"
    }, {
        icao: "TRR",
        callsign: "TRAMSON"
    }, {
        icao: "MUI",
        callsign: "MAUI"
    }, {
        icao: "TRC",
        callsign: "TRACKER"
    }, {
        icao: "TWW",
        callsign: "WELWITCHIA"
    }, {
        icao: "TNB",
        callsign: "TRANSBENIN"
    }, {
        icao: "RTM",
        callsign: "AERO TRANSAM"
    }, {
        icao: "CLR",
        callsign: "CLINTON AIRWAYS"
    }, {
        icao: "TVA",
        callsign: "TRANSAMERICA"
    }, {
        icao: "TPU",
        callsign: "TRANS PERU"
    }, {
        icao: "TRT",
        callsign: "TRANS ARABIAN"
    }, {
        icao: "SRT",
        callsign: "TRASER"
    }, {
        icao: "TLL",
        callsign: "ATLANTIC LEONE"
    }, {
        icao: "LTA",
        callsign: "LANTRA"
    }, {
        icao: "TCC",
        callsign: "TRANSCAL"
    }, {
        icao: "TCN",
        callsign: "TRANSCON"
    }, {
        icao: "TRJ",
        callsign: "HIGH TIDE"
    }, {
        icao: "TGY",
        callsign: "TRANS GUYANA"
    }, {
        icao: "THZ",
        callsign: "LYON HELIJET"
    }, {
        icao: "TIA",
        callsign: "TRANS INTERNATIONAL"
    }, {
        icao: "BAP",
        callsign: "BIG APPLE"
    }, {
        icao: "TRD",
        callsign: "TRANS ISLAND"
    }, {
        icao: "SWL",
        callsign: "TRANSJET"
    }, {
        icao: "TMA",
        callsign: "TANGO LIMA"
    }, {
        icao: "TMT",
        callsign: "TRANS MIDWEST"
    }, {
        icao: "TNW",
        callsign: "TRANSNATION"
    }, {
        icao: "TNT",
        callsign: "TRANS NORTH"
    }, {
        icao: "REC",
        callsign: "TRANSRECO"
    }, {
        icao: "SBJ",
        callsign: "TRANS SAHARA"
    }, {
        icao: "LOF",
        callsign: "WATERSKI"
    }, {
        icao: "TWA",
        callsign: "TWA"
    }, {
        icao: "RBD",
        callsign: "RED BIRD"
    }, {
        icao: "TSO",
        callsign: "TRANSOVIET"
    }, {
        icao: "TNF",
        callsign: "TRANSFAS"
    }, {
        icao: "TCG",
        callsign: "AFRICARGO"
    }, {
        icao: "TSA",
        callsign: "AIRTRAF"
    }, {
        icao: "TGX",
        callsign: "TRANSGABON"
    }, {
        icao: "TNI",
        callsign: "TRANSINTER"
    }, {
        icao: "TSN",
        callsign: "AIR TRANS"
    }, {
        icao: "TSG",
        callsign: "TRANSCONGO"
    }, {
        icao: "KTS",
        callsign: "KOTAIR"
    }, {
        icao: "GJB",
        callsign: "SKY TRUCK"
    }, {
        icao: "UTT",
        callsign: "ARABIAN TRANSPORT"
    }, {
        icao: "AUC",
        callsign: "AUSCARGO"
    }, {
        icao: "VEN",
        callsign: "TRANSAVEN AIRLINE"
    }, {
        icao: "TVF",
        callsign: "FRANCE SOLEIL"
    }, {
        icao: "TRA",
        callsign: "TRANSAVIA"
    }, {
        icao: "KTB",
        callsign: "TRANSBALTIKA"
    }, {
        icao: "TXC",
        callsign: "TRANSEXPORT"
    }, {
        icao: "FNV",
        callsign: "TRANSAVIASERVICE"
    }, {
        icao: "TVO",
        callsign: "TRANSBALLERIO"
    }, {
        icao: "TBA",
        callsign: "TRANSBRASIL"
    }, {
        icao: "TIW",
        callsign: "TIACA"
    }, {
        icao: "TCE",
        callsign: "TRANSCOLORADO"
    }, {
        icao: "TCH",
        callsign: "TRANS GULF"
    }, {
        icao: "KRA",
        callsign: "REGATA"
    }, {
        icao: "TCT",
        callsign: "TRANSCONT"
    }, {
        icao: "TCP",
        callsign: "TRANSCORP"
    }, {
        icao: "TEP",
        callsign: "TRANSEURLINE"
    }, {
        icao: "TFA",
        callsign: "TRANS FLORIDA"
    }, {
        icao: "TCU",
        callsign: "TRANSGLOBAL"
    }, {
        icao: "TXE",
        callsign: "TRANSAIR EXPRESS"
    }, {
        icao: "KCA",
        callsign: "TRANSKIEV"
    }, {
        icao: "TLA",
        callsign: "TRANSLIFT"
    }, {
        icao: "TMD",
        callsign: "TRANSMANDU"
    }, {
        icao: "TRZ",
        callsign: "TRANSMERIDIAN"
    }, {
        icao: "RMY",
        callsign: "TRANSMILE"
    }, {
        icao: "TNV",
        callsign: "TRANSNORTHERN"
    }, {
        icao: "TPP",
        callsign: "TRANS EXPRESS"
    }, {
        icao: "PCW",
        callsign: "PACIFIC ORIENT"
    }, {
        icao: "TPM",
        callsign: "TRANSPAIS"
    }, {
        icao: "TNP",
        callsign: "TRANSPED"
    }, {
        icao: "TRM",
        callsign: "SOTRANS"
    }, {
        icao: "TLF",
        callsign: "TRANSLEONE"
    }, {
        icao: "TGO",
        callsign: "TRANSPORT"
    }, {
        icao: "TQR",
        callsign: "TRANSQUERETARO"
    }, {
        icao: "MCT",
        callsign: "TRANS CORTES"
    }, {
        icao: "TPN",
        callsign: "AEREA DELNORTE"
    }, {
        icao: "TTR",
        callsign: "TRANSPORTACIONES"
    }, {
        icao: "TSI",
        callsign: "TRANSPORTAIR"
    }, {
        icao: "TCB",
        callsign: "AERO COLOMBIA"
    }, {
        icao: "TAD",
        callsign: "TRANS DOMINICAN"
    }, {
        icao: "TZE",
        callsign: "TRANSPORTE SAENZ"
    }, {
        icao: "TTS",
        callsign: "TECNICO"
    }, {
        icao: "MGM",
        callsign: "AERO EMMGEE-EMM"
    }, {
        icao: "TMZ",
        callsign: "TRANS AMAZON"
    }, {
        icao: "TCB",
        callsign: "TRANSCARIBE"
    }, {
        icao: "EAR",
        callsign: "EJECUTIVOAEREO"
    }, {
        icao: "TPT",
        callsign: "TASSA"
    }, {
        icao: "MPO",
        callsign: "AMPARO"
    }, {
        icao: "BOL",
        callsign: "BOL"
    }, {
        icao: "TDI",
        callsign: "TRANSIXTLAN"
    }, {
        icao: "TPX",
        callsign: "TRANSXALAPA"
    }, {
        icao: "TMY",
        callsign: "MUNDO MAYA"
    }, {
        icao: "TFO",
        callsign: "TRANSPORTES PACIFICO"
    }, {
        icao: "DCL",
        callsign: "DON CARLOS"
    }, {
        icao: "ROU",
        callsign: "ROBINSON CRUSOE"
    }, {
        icao: "TSP",
        callsign: "TRANSPOINTER"
    }, {
        icao: "MXQ",
        callsign: "MEXIQUENSES"
    }, {
        icao: "ELV",
        callsign: "AEREOS SELVA"
    }, {
        icao: "TPG",
        callsign: "TRANSPEGASO"
    }, {
        icao: "TGI",
        callsign: "TRANSPORTE REGIONAL"
    }, {
        icao: "SRF",
        callsign: "SAN RAFEAL"
    }, {
        icao: "RRT",
        callsign: "SIERRA ALTA"
    }, {
        icao: "SEI",
        callsign: "TRANSPORTE SIERRA"
    }, {
        icao: "TAU",
        callsign: "TRANSTAURO"
    }, {
        icao: "TPZ",
        callsign: "TRANSPAZ"
    }, {
        icao: "TML",
        callsign: "TAM AIRLINE"
    }, {
        icao: "TPY",
        callsign: "TRANS PROVINCIAL"
    }, {
        icao: "TTC",
        callsign: "TRANSTECO"
    }, {
        icao: "UTN",
        callsign: "TRANSULGII"
    }, {
        icao: "TWE",
        callsign: "TRANSWEDE"
    }, {
        icao: "ABS",
        callsign: "ATHABASKA"
    }, {
        icao: "TRW",
        callsign: "TRANSWEST"
    }, {
        icao: "TSW",
        callsign: "SWISSTRANS"
    }, {
        icao: "TST",
        callsign: "TRAST"
    }, {
        icao: "TSJ",
        callsign: "TRAST AERO"
    }, {
        icao: "TSK",
        callsign: "TOMSKAVIA"
    }, {
        icao: "TAX",
        callsign: "TRAVELAIR"
    }, {
        icao: "TIC",
        callsign: "TRAVEL INTERNATIONAL"
    }, {
        icao: "TMC",
        callsign: "TRAIL BLAZER"
    }, {
        icao: "TLV",
        callsign: "PAJAROS"
    }, {
        icao: "TDA",
        callsign: "TREND AIR"
    }, {
        icao: "TNX",
        callsign: "TRAINER"
    }, {
        icao: "TRU",
        callsign: "TRI AIR"
    }, {
        icao: "SWD",
        callsign: "SAWBLADE"
    }, {
        icao: "TGN",
        callsign: "TRIGANA"
    }, {
        icao: "TMG",
        callsign: "TRILINES"
    }, {
        icao: "TIB",
        callsign: "TRIP"
    }, {
        icao: "CLU",
        callsign: "CAROLUS"
    }, {
        icao: "TTP",
        callsign: "MIGHTY WING"
    }, {
        icao: "TSY",
        callsign: "TRIPLE STAR"
    }, {
        icao: "TRY",
        callsign: "TRISTAR AIR"
    }, {
        icao: "TSS",
        callsign: "TRISTATE"
    }, {
        icao: "DRC",
        callsign: "TRITON AIR"
    }, {
        icao: "TSV",
        callsign: "TROPIC"
    }, {
        icao: "TOS",
        callsign: "TROPISER"
    }, {
        icao: "TRO",
        callsign: "MOLOKAI"
    }, {
        icao: "TKX",
        callsign: "TROPEXPRESS"
    }, {
        icao: "TCA",
        callsign: "TROPICANA"
    }, {
        icao: "TYG",
        callsign: "TRYGG"
    }, {
        icao: "TDS",
        callsign: "TSARADIA"
    }, {
        icao: "PSS",
        callsign: "PROGRESS"
    }, {
        icao: "TTA",
        callsign: "KANIMANBO"
    }, {
        icao: "TBR",
        callsign: "TUBELAIR"
    }, {
        icao: "TOM",
        callsign: "TOM JET"
    }, {
        icao: "JAF",
        callsign: "BEAUTY"
    }, {
        icao: "TUI",
        callsign: "TUI JET"
    }, {
        icao: "TFL",
        callsign: "ORANGE"
    }, {
        icao: "BLX",
        callsign: "BLUESCAN"
    }, {
        icao: "TLP",
        callsign: "TULIPAIR"
    }, {
        icao: "TUL",
        callsign: "URSAL"
    }, {
        icao: "TUX",
        callsign: "TULPA"
    }, {
        icao: "TUZ",
        callsign: "TUNA"
    }, {
        icao: "TAR",
        callsign: "TUNAIR"
    }, {
        icao: "TAJ",
        callsign: "TUNISAVIA"
    }, {
        icao: "URN",
        callsign: "TURAN"
    }, {
        icao: "TAC",
        callsign: "TURBOT"
    }, {
        icao: "TRQ",
        callsign: "HUNTER"
    }, {
        icao: "TUC",
        callsign: "TURICHILE"
    }, {
        icao: "THK",
        callsign: "HUR KUS"
    }, {
        icao: "THS",
        callsign: "TUSAS"
    }, {
        icao: "HVK",
        callsign: "TURKISH AIRFORCE"
    }, {
        icao: "THY",
        callsign: "TURKISH"
    }, {
        icao: "TRK",
        callsign: "TURKISH REPUBLIC"
    }, {
        icao: "TUA",
        callsign: "TURKMENISTAN"
    }, {
        icao: "TLT",
        callsign: "TURTLE"
    }, {
        icao: "USB",
        callsign: "TUSHETI"
    }, {
        icao: "TWB",
        callsign: "TWAYAIR"
    }, {
        icao: "TWO",
        callsign: "COLIBRI"
    }, {
        icao: "TCY",
        callsign: "TWIN CITY"
    }, {
        icao: "TJT",
        callsign: "TWINJET"
    }, {
        icao: "TNY",
        callsign: "TWINCAL"
    }, {
        icao: "TYW",
        callsign: "TYROL AMBULANCE"
    }, {
        icao: "TYR",
        callsign: "TYROLEAN"
    }, {
        icao: "TJS",
        callsign: "TYROLJET"
    }, {
        icao: "TUM",
        callsign: "TUMTEL"
    }, {
        icao: "TKK",
        callsign: "TARKA"
    }, {
        icao: "UEU",
        callsign: "UNITED EUROPEAN"
    }, {
        icao: "UCG",
        callsign: "UNIWORLD"
    }, {
        icao: "CUH",
        callsign: "LOULAN"
    }, {
        icao: "DOI",
        callsign: "INTERIOR"
    }, {
        icao: "CNV",
        callsign: "CONVOY"
    }, {
        icao: "EXM",
        callsign: "EXAM"
    }, {
        icao: "GIH",
        callsign: "TRANSPORT AFRICAIN"
    }, {
        icao: "GKA",
        callsign: "GOLDEN KNIGHTS"
    }, {
        icao: "GWY",
        callsign: "GETAWAY"
    }, {
        icao: "UIA",
        callsign: "GLORY"
    }, {
        icao: "UAB",
        callsign: "UNITED ARABIAN"
    }, {
        icao: "UAL",
        callsign: "UNITED"
    }, {
        icao: "UBD",
        callsign: "UNITED BANGLADESH"
    }, {
        icao: "UAC",
        callsign: "UNITAIR"
    }, {
        icao: "UCS",
        callsign: "UNITED CARRIERS"
    }, {
        icao: "UEA",
        callsign: "UNITED EAGLE"
    }, {
        icao: "UFS",
        callsign: "FEEDER EXPRESS"
    }, {
        icao: "CFU",
        callsign: "MINAIR"
    }, {
        icao: "KRF",
        callsign: "KITTYHAWK"
    }, {
        icao: "KRH",
        callsign: "SPARROWHAWK"
    }, {
        icao: "SDS",
        callsign: "STANDARDS"
    }, {
        icao: "TQF",
        callsign: "RAINBOW"
    }, {
        icao: "CGX",
        callsign: "COASTGUARD AUXAIR"
    }, {
        icao: "AGR",
        callsign: "AGRICULTURE"
    }, {
        icao: "HBU",
        callsign: "KHARKIV UNIVERSAL"
    }, {
        icao: "HLE",
        callsign: "HELIMED"
    }, {
        icao: "JUS",
        callsign: "JET USA"
    }, {
        icao: "LEA",
        callsign: "LEADAIR"
    }, {
        icao: "MSH",
        callsign: "MARSHALAIR"
    }, {
        icao: "NDU",
        callsign: "SIOUX"
    }, {
        icao: "PNA",
        callsign: "PACIFIC NORTHERN"
    }, {
        icao: "RAU",
        callsign: "UGANDA ROYAL"
    }, {
        icao: "SAU",
        callsign: "UNISERVE"
    }, {
        icao: "SVR",
        callsign: "SVERDLOVSK AIR"
    }, {
        icao: "TRB",
        callsign: "KIROVTRANS"
    }, {
        icao: "UAF",
        callsign: "UNIFORCE"
    }, {
        icao: "UAI",
        callsign: "UNAIR"
    }, {
        icao: "UCC",
        callsign: "UGANDA CARGO"
    }, {
        icao: "UCH",
        callsign: "US CHARTER"
    }, {
        icao: "UCO",
        callsign: "UCOAVIACION"
    }, {
        icao: "UES",
        callsign: "AVIASYSTEM"
    }, {
        icao: "UGA",
        callsign: "UGANDA"
    }, {
        icao: "UGD",
        callsign: "CRESTED"
    }, {
        icao: "UGC",
        callsign: "URGEMER"
    }, {
        icao: "UHL",
        callsign: "UKRAINE COPTERS"
    }, {
        icao: "UHS",
        callsign: "PILOT AIR"
    }, {
        icao: "UJR",
        callsign: "UNIVERSAL JET"
    }, {
        icao: "UJT",
        callsign: "UNIJET"
    }, {
        icao: "UKI",
        callsign: "KHALIQ"
    }, {
        icao: "UKL",
        callsign: "UKRAINE ALLIANCE"
    }, {
        icao: "UKM",
        callsign: "UKRAINE MEDITERRANEE"
    }, {
        icao: "UKN",
        callsign: "ENTERPRISE UKRAINE"
    }, {
        icao: "UKP",
        callsign: "POLICE"
    }, {
        icao: "UKS",
        callsign: "CARGOTRANS"
    }, {
        icao: "ULT",
        callsign: "ULTRAIR"
    }, {
        icao: "ULH",
        callsign: "ULTIMATEHELI"
    }, {
        icao: "ULR",
        callsign: "VIPER"
    }, {
        icao: "ULS",
        callsign: "AIR ULTRA"
    }, {
        icao: "UNC",
        callsign: "UNICOPTER"
    }, {
        icao: "UNF",
        callsign: "UNION FLIGHTS"
    }, {
        icao: "UNJ",
        callsign: "PROJET"
    }, {
        icao: "UNS",
        callsign: "UNSPED"
    }, {
        icao: "UNU",
        callsign: "UNIEURO"
    }, {
        icao: "UPL",
        callsign: "PILOT SCHOOL"
    }, {
        icao: "UPS",
        callsign: "UPS"
    }, {
        icao: "URV",
        callsign: "URAI"
    }, {
        icao: "AWE",
        callsign: "CACTUS"
    }, {
        icao: "UBG",
        callsign: "BANGLA STAR"
    }, {
        icao: "USF",
        callsign: "AFRICA EXPRESS"
    }, {
        icao: "USH",
        callsign: "USHELI"
    }, {
        icao: "USJ",
        callsign: "USJET"
    }, {
        icao: "USX",
        callsign: "AIR EXPRESS"
    }, {
        icao: "UTN",
        callsign: "UT UKRAINE"
    }, {
        icao: "TUM",
        callsign: "UTAIRCARGO"
    }, {
        icao: "UTA",
        callsign: "UTAIR"
    }, {
        icao: "UTR",
        callsign: "AIRUT"
    }, {
        icao: "UTS",
        callsign: "AIRRUH"
    }, {
        icao: "UVA",
        callsign: "UNIVERSAL"
    }, {
        icao: "UVG",
        callsign: "GUYANA JET"
    }, {
        icao: "UVM",
        callsign: "UVAVEMEX"
    }, {
        icao: "AIO",
        callsign: "AIR CHIEF"
    }, {
        icao: "UVN",
        callsign: "UNITED AVIATION"
    }, {
        icao: "UZB",
        callsign: "UZBEK"
    }, {
        icao: "AUI",
        callsign: "UKRAINE INTERNATIONAL"
    }, {
        icao: "WEC",
        callsign: "AIRGO"
    }, {
        icao: "QID",
        callsign: "QUID"
    }, {
        icao: "UIT",
        callsign: "ARCTIC"
    }, {
        icao: "UNO",
        callsign: "UNITED NATIONS"
    }, {
        icao: "VNL",
        callsign: "VANILLA"
    }, {
        icao: "VAG",
        callsign: "VIETRAVEL AIR"
    }, {
        icao: "VAR",
        callsign: "VECA"
    }, {
        icao: "VLR",
        callsign: "VOLAX"
    }, {
        icao: "VDR",
        callsign: "VOLDIR"
    }, {
        icao: "VVV",
        callsign: "VALAIRJET"
    }, {
        icao: "VIV",
        callsign: "VIVA"
    }, {
        icao: "VIL",
        callsign: "TURTLE DOVE"
    }, {
        icao: "VOZ",
        callsign: "VELOCITY"
    }, {
        icao: "VBA",
        callsign: "VEEBEE"
    }, {
        icao: "WIW",
        callsign: "VEEAVIA"
    }, {
        icao: "VBD",
        callsign: "VEEBIRDAVIA"
    }, {
        icao: "VAC",
        callsign: "VACATIONAIR"
    }, {
        icao: "RDW",
        callsign: "ROADWATCH"
    }, {
        icao: "VLA",
        callsign: "NALAU"
    }, {
        icao: "VLN",
        callsign: "VALAN"
    }, {
        icao: "EHR",
        callsign: "ROTOR"
    }, {
        icao: "VLU",
        callsign: "VALUAIR"
    }, {
        icao: "VJA",
        callsign: "CRITTER"
    }, {
        icao: "VAA",
        callsign: "EUROVAN"
    }, {
        icao: "VGC",
        callsign: "VANGUARDIA COLIMA"
    }, {
        icao: "VGD",
        callsign: "VANGUARD AIR"
    }, {
        icao: "VRH",
        callsign: "SKY VICTOR"
    }, {
        icao: "VFC",
        callsign: "VASCO AIR"
    }, {
        icao: "VAG",
        callsign: "SEGA"
    }, {
        icao: "WGA",
        callsign: "WEGA FRANKO"
    }, {
        icao: "WEL",
        callsign: "VELES"
    }, {
        icao: "VTX",
        callsign: "VERATAXIS"
    }, {
        icao: "BTP",
        callsign: "NET RAIL"
    }, {
        icao: "VAL",
        callsign: "VOYAGEUR"
    }, {
        icao: "GRV",
        callsign: "NIGHT RIDER"
    }, {
        icao: "HVN",
        callsign: "VIET NAM"
    }, {
        icao: "TMB",
        callsign: "TOMBO"
    }, {
        icao: "KWA",
        callsign: "VOZAIR"
    }, {
        icao: "MOV",
        callsign: "MOV AIR"
    }, {
        icao: "ENV",
        callsign: "ENDEAVOUR"
    }, {
        icao: "VCT",
        callsign: "VISCOUNT AIR"
    }, {
        icao: "SSI",
        callsign: "SUPER JET"
    }, {
        icao: "FXF",
        callsign: "FOX FLIGHT"
    }, {
        icao: "PAV",
        callsign: "NICOL"
    }, {
        icao: "PRX",
        callsign: "PAREX"
    }, {
        icao: "VAT",
        callsign: "VISIONAIR"
    }, {
        icao: "VCA",
        callsign: "VICA"
    }, {
        icao: "VCM",
        callsign: "CARMEN"
    }, {
        icao: "VOI",
        callsign: "VOLARIS"
    }, {
        icao: "VDA",
        callsign: "VOLGA"
    }, {
        icao: "VEA",
        callsign: "VEGA AIRLINES"
    }, {
        icao: "VEC",
        callsign: "VECAR"
    }, {
        icao: "VEE",
        callsign: "VICTOR ECHO"
    }, {
        icao: "VEI",
        callsign: "GREEN ISLE"
    }, {
        icao: "VRD",
        callsign: "REDWOOD"
    }, {
        icao: "VJC",
        callsign: "VIETJET"
    }, {
        icao: "VES",
        callsign: "VIEQUES"
    }, {
        icao: "VEX",
        callsign: "VIRGIN EXPRESS"
    }, {
        icao: "VFT",
        callsign: "ZETA FLIGHTS"
    }, {
        icao: "VGN",
        callsign: "VIRGIN NIGERIA"
    }, {
        icao: "VGV",
        callsign: "VOLOGDA AIR"
    }, {
        icao: "VHA",
        callsign: "AIR VH"
    }, {
        icao: "VHM",
        callsign: "EARLY BIRD"
    }, {
        icao: "VIB",
        callsign: "VITUS"
    }, {
        icao: "VIC",
        callsign: "VIPEJECUTIVO"
    }, {
        icao: "VIE",
        callsign: "VIP EMPRESARIAL"
    }, {
        icao: "VIF",
        callsign: "VIENNA FLIGHT"
    }, {
        icao: "VIG",
        callsign: "VEGA AVIATION"
    }, {
        icao: "VIH",
        callsign: "VICHI"
    }, {
        icao: "VIK",
        callsign: "SWEDJET"
    }, {
        icao: "VIN",
        callsign: "VINAIR"
    }, {
        icao: "VIR",
        callsign: "VIRGIN"
    }, {
        icao: "VJM",
        callsign: "VIAJES MEXICANOS"
    }, {
        icao: "VJT",
        callsign: "VISTA"
    }, {
        icao: "VJT",
        callsign: "VISTA MALTA"
    }, {
        icao: "VVM",
        callsign: "JACKPOT"
    }, {
        icao: "VLE",
        callsign: "VOLA"
    }, {
        icao: "VLG",
        callsign: "VUELING"
    }, {
        icao: "VLK",
        callsign: "VLADAIR"
    }, {
        icao: "VLO",
        callsign: "VELOG"
    }, {
        icao: "VLT",
        callsign: "VERTICAL"
    }, {
        icao: "VMA",
        callsign: "VERO MONMOUTH"
    }, {
        icao: "VOA",
        callsign: "VIAGGIO"
    }, {
        icao: "VOG",
        callsign: "VOYAGER AIR"
    }, {
        icao: "VPA",
        callsign: "VIAIR"
    }, {
        icao: "VPB",
        callsign: "VETERAN"
    }, {
        icao: "VPV",
        callsign: "VIP AVIA"
    }, {
        icao: "VRA",
        callsign: "VERITAIR"
    }, {
        icao: "VRE",
        callsign: "UKRAINE VOLARE"
    }, {
        icao: "VRL",
        callsign: "VOAR LINHAS"
    }, {
        icao: "VRN",
        callsign: "VARIG"
    }, {
        icao: "VVC",
        callsign: "VIVA AIR COLOMBIA"
    }, {
        icao: "VSB",
        callsign: "VICKERS"
    }, {
        icao: "VSN",
        callsign: "VISION"
    }, {
        icao: "VSO",
        callsign: "VASO"
    }, {
        icao: "VSP",
        callsign: "VASP"
    }, {
        icao: "VSS",
        callsign: "WATERBIRD"
    }, {
        icao: "VTC",
        callsign: "VUELOS TOLLOCAN"
    }, {
        icao: "VTH",
        callsign: "VUELOS TEHUACAN"
    }, {
        icao: "VOE",
        callsign: "VOLOTEA"
    }, {
        icao: "VTK",
        callsign: "VOSTOK"
    }, {
        icao: "VTL",
        callsign: "VITALA"
    }, {
        icao: "VTV",
        callsign: "VOINTEH"
    }, {
        icao: "VUR",
        callsign: "VIPEC"
    }, {
        icao: "VUS",
        callsign: "VUELA BUS"
    }, {
        icao: "VZL",
        callsign: "VZLYET"
    }, {
        icao: "VLM",
        callsign: "RUBENS"
    }, {
        icao: "WCY",
        callsign: "TITAN AIR"
    }, {
        icao: "WEV",
        callsign: "VICTORIA UGANDA"
    }, {
        icao: "WLG",
        callsign: "GOUMRAK"
    }, {
        icao: "VNR",
        callsign: "VIENNAIR"
    }, {
        icao: "VTI",
        callsign: "VISTARA"
    }, {
        icao: "WDL",
        callsign: "WDL"
    }, {
        icao: "WRR",
        callsign: "WRAP AIR"
    }, {
        icao: "CGG",
        callsign: "CHARGE"
    }, {
        icao: "WAS",
        callsign: "WALSTEN"
    }, {
        icao: "GOT",
        callsign: "GOTHIC"
    }, {
        icao: "WPT",
        callsign: "WAPITI"
    }, {
        icao: "WAV",
        callsign: "WARBELOW"
    }, {
        icao: "ATX",
        callsign: "AIRTAX"
    }, {
        icao: "WSG",
        callsign: "WASAYA"
    }, {
        icao: "WTC",
        callsign: "WATCO"
    }, {
        icao: "WEB",
        callsign: "WEBBRASIL"
    }, {
        icao: "TDB",
        callsign: "THUNDER BAY"
    }, {
        icao: "WLC",
        callsign: "WELCOMEAIR"
    }, {
        icao: "BLW",
        callsign: "BLUESTAR"
    }, {
        icao: "WCB",
        callsign: "KILO YANKEE"
    }, {
        icao: "WTF",
        callsign: "WESTAF AIRTRANS"
    }, {
        icao: "WAC",
        callsign: "WESTAF CARGO"
    }, {
        icao: "CHB",
        callsign: "WEST CHINA"
    }, {
        icao: "WLX",
        callsign: "WEST LUX"
    }, {
        icao: "SWN",
        callsign: "AIR SWEDEN"
    }, {
        icao: "WCW",
        callsign: "WEST"
    }, {
        icao: "WCR",
        callsign: "WEST CARIBBEAN"
    }, {
        icao: "YWZ",
        callsign: "COAST AIR"
    }, {
        icao: "WCG",
        callsign: "WHISKY INDIA"
    }, {
        icao: "WCA",
        callsign: "WESTLEONE"
    }, {
        icao: "WCC",
        callsign: "WEST COAST"
    }, {
        icao: "TEE",
        callsign: "TEEBIRD"
    }, {
        icao: "WEW",
        callsign: "WESTWIND"
    }, {
        icao: "WJA",
        callsign: "WESTJET"
    }, {
        icao: "WAA",
        callsign: "WESTAIR WINGS"
    }, {
        icao: "WSC",
        callsign: "WESTCAR"
    }, {
        icao: "PCM",
        callsign: "PAC VALLEY"
    }, {
        icao: "BLK",
        callsign: "BLUE FLAME"
    }, {
        icao: "STT",
        callsign: "SAWTOOTH"
    }, {
        icao: "WST",
        callsign: "WESTERN BAHAMAS"
    }, {
        icao: "NPC",
        callsign: "NORPAC"
    }, {
        icao: "WAE",
        callsign: "WESTERN EXPRESS"
    }, {
        icao: "WAL",
        callsign: "WESTERN"
    }, {
        icao: "KLC",
        callsign: "CITY"
    }, {
        icao: "WAL",
        callsign: "WESTERN ARCTIC"
    }, {
        icao: "WTV",
        callsign: "WESTAVIA"
    }, {
        icao: "AAE",
        callsign: "ARIZONA"
    }, {
        icao: "WES",
        callsign: "WEST EX"
    }, {
        icao: "WGN",
        callsign: "WESTERN GLOBAL"
    }, {
        icao: "KMR",
        callsign: "KOMSTAR"
    }, {
        icao: "WPA",
        callsign: "WESTPAC"
    }, {
        icao: "WSL",
        callsign: "WEST LINE"
    }, {
        icao: "WSA",
        callsign: "WESTATES"
    }, {
        icao: "WHE",
        callsign: "WESTLAND"
    }, {
        icao: "WTP",
        callsign: "WESTPOINT"
    }, {
        icao: "WWD",
        callsign: "WESTWARD"
    }, {
        icao: "WHT",
        callsign: "WHITEJET"
    }, {
        icao: "WEA",
        callsign: "WHITE EAGLE"
    }, {
        icao: "WIF",
        callsign: "WIDEROE"
    }, {
        icao: "WAA",
        callsign: "WIEN"
    }, {
        icao: "WIG",
        callsign: "WIGGINS AIRWAYS"
    }, {
        icao: "WHS",
        callsign: "WEEKING"
    }, {
        icao: "WFO",
        callsign: "WILBURS"
    }, {
        icao: "WGP",
        callsign: "GRAND PRIX"
    }, {
        icao: "WDA",
        callsign: "WIMBI DIRA"
    }, {
        icao: "WNA",
        callsign: "WINAIR"
    }, {
        icao: "JET",
        callsign: "GHIBLI"
    }, {
        icao: "WSI",
        callsign: "WIND SPIRIT"
    }, {
        icao: "QGA",
        callsign: "QUADRIGA"
    }, {
        icao: "WIA",
        callsign: "WINDWARD"
    }, {
        icao: "WON",
        callsign: "WINGS ABADI"
    }, {
        icao: "WAW",
        callsign: "WING SHUTTLE"
    }, {
        icao: "WOL",
        callsign: "WINGJET"
    }, {
        icao: "WEX",
        callsign: "WINGS EXPRESS"
    }, {
        icao: "WLB",
        callsign: "WING LEBANON"
    }, {
        icao: "WIN",
        callsign: "WINLINK"
    }, {
        icao: "WSM",
        callsign: "WISMAN"
    }, {
        icao: "WVL",
        callsign: "WIZZBUL"
    }, {
        icao: "WZZ",
        callsign: "WIZZAIR"
    }, {
        icao: "WMT",
        callsign: "WIZZ AIR MALTA"
    }, {
        icao: "WUK",
        callsign: "WIZZ GO"
    }, {
        icao: "WNR",
        callsign: "WONDAIR"
    }, {
        icao: "CWY",
        callsign: "CAUSEWAY"
    }, {
        icao: "WOA",
        callsign: "WORLD"
    }, {
        icao: "WWM",
        callsign: "MANAS WING"
    }, {
        icao: "CSW",
        callsign: "SILKITALIA"
    }, {
        icao: "WWI",
        callsign: "WORLDWIDE"
    }, {
        icao: "WOW",
        callsign: "WOW AIR"
    }, {
        icao: "WRT",
        callsign: "WRIGHTAIR"
    }, {
        icao: "WRF",
        callsign: "WRIGHT FLYER"
    }, {
        icao: "CWU",
        callsign: "WUHAN AIR"
    }, {
        icao: "WYC",
        callsign: "WYCOMBE"
    }, {
        icao: "WYG",
        callsign: "WYOMING"
    }, {
        icao: "WAN",
        callsign: "WATANIYA"
    }, {
        icao: "VNR",
        callsign: "WANAIR"
    }, {
        icao: "WEN",
        callsign: "ENCORE"
    }, {
        icao: "XAB",
        callsign: "AERO XABRE"
    }, {
        icao: "XAE",
        callsign: "AURA"
    }, {
        icao: "XJC",
        callsign: "EXCLUSIVE JET"
    }, {
        icao: "XER",
        callsign: "XEROX"
    }, {
        icao: "XRC",
        callsign: "TUNISIA CARGO"
    }, {
        icao: "CXA",
        callsign: "XIAMEN AIR"
    }, {
        icao: "CXJ",
        callsign: "XINJIANG"
    }, {
        icao: "XJT",
        callsign: "XRAY"
    }, {
        icao: "SEU",
        callsign: "STARWAY"
    }, {
        icao: "GXL",
        callsign: "STARDUST"
    }, {
        icao: "XOJ",
        callsign: "EXOJET"
    }, {
        icao: "XPS",
        callsign: "XP PARCEL"
    }, {
        icao: "XAR",
        callsign: "XPRESS"
    }, {
        icao: "RAG",
        callsign: "RAGLAN"
    }, {
        icao: "DGA",
        callsign: "YELLOW RIVER"
    }, {
        icao: "YRG",
        callsign: "YAKAIR GEORGIA"
    }, {
        icao: "AKY",
        callsign: "YAKSERVICE"
    }, {
        icao: "YAK",
        callsign: "YAK AVIA"
    }, {
        icao: "LLM",
        callsign: "YAMAL"
    }, {
        icao: "YAK",
        callsign: "YAK AVIA"
    }, {
        icao: "SYL",
        callsign: "AIR YAKUTIA"
    }, {
        icao: "CYG",
        callsign: "VICAIR"
    }, {
        icao: "AYG",
        callsign: "AIR YANGON"
    }, {
        icao: "YZR",
        callsign: "YANGTZE RIVER"
    }, {
        icao: "LYH",
        callsign: "HELIGUYANE"
    }, {
        icao: "MHD",
        callsign: "YAS AIR"
    }, {
        icao: "ELW",
        callsign: "YELLOW WINGS"
    }, {
        icao: "IYE",
        callsign: "YEMENI"
    }, {
        icao: "ERV",
        callsign: "YEREVANAVIA"
    }, {
        icao: "NYT",
        callsign: "YETI AIRLINES"
    }, {
        icao: "YFS",
        callsign: "YOUNG AIR"
    }, {
        icao: "AYE",
        callsign: "AIR YING AN"
    }, {
        icao: "TUD",
        callsign: "TUNDRA"
    }, {
        icao: "UGN",
        callsign: "PLUTON"
    }, {
        icao: "UMK",
        callsign: "YUZMASH"
    }, {
        icao: "BZE",
        callsign: "ZENSTAR"
    }, {
        icao: "AZB",
        callsign: "ZAAB AIR"
    }, {
        icao: "AZR",
        callsign: "ZENAIR"
    }, {
        icao: "CDC",
        callsign: "HUALONG"
    }, {
        icao: "CIT",
        callsign: "ZANE"
    }, {
        icao: "EMR",
        callsign: "ZENMOUR"
    }, {
        icao: "EZD",
        callsign: "ZEST AIRWAYS"
    }, {
        icao: "GZQ",
        callsign: "ZAGROS"
    }, {
        icao: "IMX",
        callsign: "ZIMEX"
    }, {
        icao: "IZG",
        callsign: "ZAGROS"
    }, {
        icao: "JTU",
        callsign: "ZHETYSU"
    }, {
        icao: "MBG",
        callsign: "CHALGROVE"
    }, {
        icao: "MLU",
        callsign: "MALI LOSINJ"
    }, {
        icao: "ORZ",
        callsign: "ZOREX"
    }, {
        icao: "PZY",
        callsign: "ZAPOLYARYE"
    }, {
        icao: "RZR",
        callsign: "RECOVERY"
    }, {
        icao: "RZU",
        callsign: "ZHERSU AVIA"
    }, {
        icao: "SYZ",
        callsign: "ZIL AIR"
    }, {
        icao: "TAN",
        callsign: "ZANAIR"
    }, {
        icao: "ZAI",
        callsign: "ZASAIR"
    }, {
        icao: "ZAK",
        callsign: "ZAMBIA SKIES"
    }, {
        icao: "ZAR",
        callsign: "ZAIREAN"
    }, {
        icao: "ZAV",
        callsign: "ZETAVIA"
    }, {
        icao: "ZAW",
        callsign: "ZED AIR"
    }, {
        icao: "ZMA",
        callsign: "ZAMBEZI WINGS"
    }, {
        icao: "RZV",
        callsign: "ZEDAVIA"
    }, {
        icao: "MBN",
        callsign: "ZAMBIANA"
    }, {
        icao: "ZAN",
        callsign: "ZANTOP"
    }, {
        icao: "ZAS",
        callsign: "ZAS AIRLINES"
    }, {
        icao: "CJG",
        callsign: "ZHEJIANG"
    }, {
        icao: "CFZ",
        callsign: "ZHONGFEI"
    }, {
        icao: "CYN",
        callsign: "ZHONGYUAN"
    }, {
        icao: "WZP",
        callsign: "ZIPPER"
    }, {
        icao: "TZP",
        callsign: "ZIPPY"
    }, {
        icao: "OOM",
        callsign: "ZOOM"
    }, {
        icao: "ORZ",
        callsign: "ZOREX"
    }],
    jA = [{
        name: "Dingus",
        icao: "EIN"
    }, {
        name: "Canadian",
        icao: "ACA"
    }, {
        name: "Balistic",
        icao: "BTI"
    }, {
        name: "French",
        icao: "AFR"
    }, {
        name: "OldZealand",
        icao: "ANZ"
    }, {
        name: "Americano",
        icao: "AAL"
    }, {
        name: "Belta",
        icao: "DAL"
    }, {
        name: "Bepsi",
        icao: "AFR"
    }, {
        name: "Beti",
        icao: "NYT"
    }, {
        name: "Bizz",
        icao: "WZZ"
    }, {
        name: "Bliss",
        icao: "SWR"
    }, {
        name: "Britain",
        icao: "BAW"
    }, {
        name: "Byanair",
        icao: "RYR"
    }, {
        name: "Cafe",
        icao: "CPA"
    }, {
        name: "DanAm ",
        icao: "PAA"
    }, {
        name: "Doncor",
        icao: "CFG"
    }, {
        name: "Emarates",
        icao: "UAE"
    }, {
        name: "Flybee",
        icao: "BEE"
    }, {
        name: "Hard",
        icao: "EZY"
    }, {
        name: "Ideria",
        icao: "IBE"
    }, {
        name: "JetBloo",
        icao: "JBU"
    }, {
        name: "Jet3",
        icao: "EXS"
    }, {
        name: "KLN",
        icao: "KLM"
    }, {
        name: "Koreen",
        icao: "KAL"
    }, {
        name: "KOT",
        icao: "LOT"
    }, {
        name: "Lifthansa",
        icao: "DLH"
    }, {
        name: "Lui",
        icao: "TOM"
    }, {
        name: "Northeast",
        icao: "SWA"
    }, {
        name: "Oantas",
        icao: "QFA"
    }, {
        name: "Oatar",
        icao: "QTR"
    }, {
        name: "Reunited",
        icao: "UAL"
    }, {
        name: "Scandialian",
        icao: "SAS"
    }, {
        name: "Singadoor",
        icao: "SIA"
    }, {
        name: "Sprit",
        icao: "NKS"
    }, {
        name: "SUS",
        icao: "UPS"
    }, {
        name: "TedEx",
        icao: "FDX"
    }, {
        name: "Thay",
        icao: "THA"
    }, {
        name: "Turkey Airlines ",
        icao: "UHY"
    }, {
        name: "VHL",
        icao: "DHK"
    }];
let Gi = ii("");
fetch("https://raw.githubusercontent.com/awdev1/fsm/master/backend").then(i => {
    i.text().then(l => {
        Gi.value = l
    })
});
async function zA() {
    let i = await fetch(Gi.value + "/plans", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: pi()
        }
    });
    return i.status != 200 ? (Fi.value = !1, []) : await i.json()
}
async function ie() {
    let i = await fetch(Gi.value + "/pdc", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: pi()
        }
    });
    return i.status != 200 ? (Fi.value = !1, []) : await i.json()
}
async function No() {
    let i = await fetch(Gi.value + "/atis", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: pi()
        }
    });
    return i.status != 200 ? (Fi.value = !1, []) : await i.json()
}
async function le() {
    let i = await fetch(Gi.value + "/settings", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: pi()
        }
    });
    return i.status != 200 ? (Fi.value = !1, {}) : await i.json()
}
async function Zl(i) {
    await fetch(Gi.value + "/change", {
        method: "POST",
        body: JSON.stringify(i),
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: pi()
        }
    })
}
async function Oo(i) {
    await fetch(Gi.value + "/hide", {
        method: "POST",
        body: JSON.stringify(i),
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: pi()
        }
    })
}
const ae = ["value"],
    ce = {
        class: "name"
    },
    ne = ["src"],
    oe = {
        class: "age"
    },
    se = ["selected"],
    Ae = ["selected"],
    ee = ["selected"],
    ge = ["selected"],
    te = ["selected"],
    Re = ["selected"],
    Ee = ["selected"],
    Ie = ["selected"],
    re = ["selected"],
    Se = ["selected"],
    Te = ["selected"],
    Ne = ["selected"],
    Oe = ["selected"],
    Le = ["selected"],
    Ce = ["selected"],
    ue = ["selected"],
    fe = ["selected"],
    de = Kl({
        __name: "Aircraft",
        props: {
            aircraft: {},
            type: {}
        },
        setup(i) {
            let l = ii();
            ii();
            let a = {},
                c = {};
            To.forEach(H => {
                a[H.icao] = H.callsign, c[H.callsign.toUpperCase().replace(" ", "").trim()] = H.icao
            });

            function o(H) {
                !H.ctrlKey && !confirm(`Hide "${A.aircraft.callsign}"?`) || (A.aircraft.hidden = !0, Oo({
                    id: A.aircraft.id,
                    roomSecret: pi()
                }))
            }
            let A = i,
                e = ii(A.aircraft),
                g = (H, I) => {
                    let C = {
                        id: H.id,
                        roomSecret: pi()
                    };
                    return I == "acft" && (C.type = H.type), I == "alt" && (C.altitude = H.altitude), I == "arriving" && (C.arriving = H.arriving), I == "callsign" && (C.callsign = H.callsign), I == "departing" && (C.departing = H.departing), I == "free" && (C.free = H.free), I == "gate" && (C.gate = H.gate), I == "route" && (C.route = H.route), I == "runway" && (C.runway = H.runway), I == "squawk" && (C.squawk = H.squawk), I == "status" && (C.status = H.status), I == "a_alt" && (C.a_alt = H.a_alt), I == "a_hdg" && (C.a_hdg = H.a_hdg), Zl(C), H
                };

            function n(H) {
                ua({
                    id: e.value.id,
                    selectionType: H
                })
            }

            function O(H) {
                let I = Ac();
                I != null && I.id == e.value.id && I.selectionType == H && ua(null)
            }

            function T() {
                e.value.squawk = e.value.squawk.toLowerCase() == "r" ? `${Math.floor(Math.random() * 8)}${Math.floor(Math.random() * 8)}${Math.floor(Math.random() * 8)}${Math.floor(Math.random() * 8)}` : e.value.squawk, g(e.value, "squawk")
            }

            function t() {
                e.value.a_hdg == "l" && (e.value.a_hdg = "LNAV"), g(e.value, "a_hdg")
            }
            let N = ii(!0);

            function F() {
                let H = e.value.callsign.toUpperCase().replace("-", "").replace(/\(.*?\)/, "").replace("HEAVY", "").replace("SUPER", "").replace("/H", "").replace("AIRLINES", "").replace("AIRLINE", "").replace("AIR", "").replace("AER", "").replace(/\W+/g, "").trim();
                if ("1234567890".includes(H[1]) || "1234567890".includes(H[2]) || !/.*\d.*?/.test(H) || (H = H.replace(/H$/, "").replace(/S$/, ""), a[H.substring(0, 3)] != null && H.length > 3 && "1234567890".includes(H[3]))) return H;
                let Ai = H.match(/^([A-Z]+)(.*)$/) ?? ["", "", ""],
                    li = jA.find(y => y.name.toUpperCase().trim() == Ai[1]);
                if (li != null) return li.icao + Ai[2];
                let ni = c[Ai[1]];
                return ni != null ? ni + Ai[2] : (N.value = !1, H + " (NP)")
            }
            return (H, I) => (P(), B("div", {
                class: Ki(["aircraft", H.type]),
                onMouseenter: I[67] || (I[67] = C => s(ZA)(s(e).id))
            }, [R("input", {
                type: "text",
                placeholder: "Callsign",
                class: "callsign",
                rows: "2",
                value: F(),
                onChange: I[0] || (I[0] = C => {
                    s(e).callsign = C.currentTarget.value, s(g)(s(e), "callsign")
                }),
                onFocus: I[1] || (I[1] = C => n("callsign")),
                onBlur: I[2] || (I[2] = C => O("callsign")),
                onKeyup: I[3] || (I[3] = C => s(g)(s(e), "callsign"))
            }, null, 40, ae), R("div", ce, [s(e).avatar != "" ? (P(), B("img", {
                key: 0,
                src: `https://cdn.discordapp.com/avatars/${s(e).userid}/${s(e).avatar}.webp`,
                class: "avatar"
            }, null, 8, ne)) : _("", !0), R("p", null, D(s(e).username), 1), R("p", oe, D(new Date(Date.now() - new Date(s(e).age).getTime() - 6e4).getUTCHours()) + "h " + D(new Date(Date.now() - new Date(s(e).age).getTime() - 6e4).getUTCMinutes()) + "m ago", 1)]), k(R("input", {
                type: "text",
                placeholder: "Departing",
                class: "departing",
                "onUpdate:modelValue": I[4] || (I[4] = C => s(e).departing = C),
                onChange: I[5] || (I[5] = C => s(g)(s(e), "departing")),
                onFocus: I[6] || (I[6] = C => n("departing")),
                onBlur: I[7] || (I[7] = C => O("departing")),
                onKeyup: I[8] || (I[8] = C => s(g)(s(e), "departing"))
            }, null, 544), [
                [$, s(e).departing]
            ]), k(R("input", {
                type: "text",
                placeholder: "Arriving",
                class: "arriving",
                "onUpdate:modelValue": I[9] || (I[9] = C => s(e).arriving = C),
                onChange: I[10] || (I[10] = C => s(g)(s(e), "arriving")),
                onFocus: I[11] || (I[11] = C => n("arriving")),
                onBlur: I[12] || (I[12] = C => O("arriving")),
                onKeyup: I[13] || (I[13] = C => s(g)(s(e), "arriving"))
            }, null, 544), [
                [$, s(e).arriving]
            ]), k(R("input", {
                type: "text",
                placeholder: "Filed Altitude",
                class: "altitude",
                "onUpdate:modelValue": I[14] || (I[14] = C => s(e).altitude = C),
                onChange: I[15] || (I[15] = C => s(g)(s(e), "alt")),
                onFocus: I[16] || (I[16] = C => n("alt")),
                onBlur: I[17] || (I[17] = C => O("alt")),
                onKeyup: I[18] || (I[18] = C => s(g)(s(e), "alt"))
            }, null, 544), [
                [$, s(e).altitude]
            ]), k(R("input", {
                type: "text",
                placeholder: "Gate",
                class: "gate",
                "onUpdate:modelValue": I[19] || (I[19] = C => s(e).gate = C),
                onChange: I[20] || (I[20] = C => s(g)(s(e), "gate")),
                onFocus: I[21] || (I[21] = C => n("gate")),
                onBlur: I[22] || (I[22] = C => O("gate")),
                onKeyup: I[23] || (I[23] = C => s(g)(s(e), "gate"))
            }, null, 544), [
                [$, s(e).gate]
            ]), k(R("input", {
                type: "text",
                placeholder: "Squawk",
                ref_key: "squawk",
                ref: l,
                class: "squawk",
                "onUpdate:modelValue": I[24] || (I[24] = C => s(e).squawk = C),
                onChange: T,
                onFocus: I[25] || (I[25] = C => n("squawk")),
                onBlur: I[26] || (I[26] = C => O("squawk")),
                onKeyup: T
            }, null, 544), [
                [$, s(e).squawk]
            ]), k(R("input", {
                type: "text",
                placeholder: "Aircraft",
                class: "type",
                "onUpdate:modelValue": I[27] || (I[27] = C => s(e).type = C),
                onChange: I[28] || (I[28] = C => s(g)(s(e), "acft")),
                onFocus: I[29] || (I[29] = C => n("acft")),
                onBlur: I[30] || (I[30] = C => O("acft")),
                onKeyup: I[31] || (I[31] = C => s(g)(s(e), "acft"))
            }, null, 544), [
                [$, s(e).type]
            ]), s(A).type == "outbound" || s(A).type == "outbound_td" ? k((P(), B("select", {
                key: 0,
                class: "status",
                onChange: I[32] || (I[32] = C => s(g)(s(e), "status")),
                onFocus: I[33] || (I[33] = C => n("status")),
                onBlur: I[34] || (I[34] = C => O("status")),
                "onUpdate:modelValue": I[35] || (I[35] = C => s(e).status = C)
            }, [R("option", {
                selected: s(e).status == "PARKED"
            }, "PARKED", 8, se), R("option", {
                selected: s(e).status == "CLEARED"
            }, "CLEARED", 8, Ae), R("option", {
                selected: s(e).status == "PUSH"
            }, "PUSH", 8, ee), R("option", {
                selected: s(e).status == "TAXI"
            }, "TAXI", 8, ge), R("option", {
                selected: s(e).status == "HOLDING"
            }, "HOLDING", 8, te), R("option", {
                selected: s(e).status == "LINEUP"
            }, "LINEUP", 8, Re), R("option", {
                selected: s(e).status == "TAKEOFF"
            }, "TAKEOFF", 8, Ee)], 544)), [
                [_a, s(e).status]
            ]) : _("", !0), s(A).type == "inbound" || s(A).type == "inbound_td" ? k((P(), B("select", {
                key: 1,
                class: "status",
                onChange: I[36] || (I[36] = C => s(g)(s(e), "status")),
                onFocus: I[37] || (I[37] = C => n("status")),
                onBlur: I[38] || (I[38] = C => O("status")),
                "onUpdate:modelValue": I[39] || (I[39] = C => s(e).status = C)
            }, [R("option", {
                selected: s(e).status == "LANDING"
            }, "LANDING", 8, Ie), R("option", {
                selected: s(e).status == "TAXI"
            }, "TAXI", 8, re), R("option", {
                selected: s(e).status == "PARKED"
            }, "PARKED", 8, Se)], 544)), [
                [_a, s(e).status]
            ]) : _("", !0), s(A).type == "vfr" || s(A).type == "vfr_td" ? k((P(), B("select", {
                key: 2,
                class: "status",
                onChange: I[40] || (I[40] = C => s(g)(s(e), "status")),
                onFocus: I[41] || (I[41] = C => n("status")),
                onBlur: I[42] || (I[42] = C => O("status")),
                "onUpdate:modelValue": I[43] || (I[43] = C => s(e).status = C)
            }, [R("option", {
                selected: s(e).status == "PARKED"
            }, "PARKED", 8, Te), R("option", {
                selected: s(e).status == "TAXI"
            }, "TAXI", 8, Ne), R("option", {
                selected: s(e).status == "HOLDING"
            }, "HOLDING", 8, Oe), R("option", {
                selected: s(e).status == "LEFT CIRCUIT"
            }, "LEFT CIRCUIT", 8, Le), R("option", {
                selected: s(e).status == "RIGHT CIRCUIT"
            }, "RIGHT CIRCUIT", 8, Ce), R("option", {
                selected: s(e).status == "VFR"
            }, "VFR", 8, ue), R("option", {
                selected: s(e).status == "LANDING"
            }, "LANDING", 8, fe)], 544)), [
                [_a, s(e).status]
            ]) : _("", !0), k(R("input", {
                type: "text",
                placeholder: "Route",
                class: "route",
                "onUpdate:modelValue": I[44] || (I[44] = C => s(e).route = C),
                onChange: I[45] || (I[45] = C => s(g)(s(e), "route")),
                onFocus: I[46] || (I[46] = C => n("route")),
                onBlur: I[47] || (I[47] = C => O("route")),
                onKeyup: I[48] || (I[48] = C => s(g)(s(e), "route"))
            }, null, 544), [
                [$, s(e).route]
            ]), H.type != "overflying" ? k((P(), B("input", {
                key: 3,
                type: "text",
                placeholder: "Runway",
                class: "runway",
                "onUpdate:modelValue": I[49] || (I[49] = C => s(e).runway = C),
                onChange: I[50] || (I[50] = C => s(g)(s(e), "runway")),
                onFocus: I[51] || (I[51] = C => n("runway")),
                onBlur: I[52] || (I[52] = C => O("runway")),
                onKeyup: I[53] || (I[53] = C => s(g)(s(e), "runway"))
            }, null, 544)), [
                [$, s(e).runway]
            ]) : _("", !0), k(R("input", {
                type: "text",
                placeholder: "Free Text",
                class: "free",
                "onUpdate:modelValue": I[54] || (I[54] = C => s(e).free = C),
                onChange: I[55] || (I[55] = C => s(g)(s(e), "free")),
                onFocus: I[56] || (I[56] = C => n("free")),
                onBlur: I[57] || (I[57] = C => O("free")),
                onKeyup: I[58] || (I[58] = C => s(g)(s(e), "free"))
            }, null, 544), [
                [$, s(e).free]
            ]), k(R("input", {
                type: "text",
                placeholder: "Asg. Altitude",
                class: "a_altitude",
                "onUpdate:modelValue": I[59] || (I[59] = C => s(e).a_alt = C),
                onChange: I[60] || (I[60] = C => s(g)(s(e), "a_alt")),
                onFocus: I[61] || (I[61] = C => n("a_alt")),
                onBlur: I[62] || (I[62] = C => O("a_alt")),
                onKeyup: I[63] || (I[63] = C => s(g)(s(e), "a_alt"))
            }, null, 544), [
                [$, s(e).a_alt]
            ]), k(R("input", {
                type: "text",
                placeholder: "Asg. Heading",
                class: "a_heading",
                "onUpdate:modelValue": I[64] || (I[64] = C => s(e).a_hdg = C),
                onChange: t,
                onFocus: I[65] || (I[65] = C => n("a_hdg")),
                onBlur: I[66] || (I[66] = C => O("a_hdg")),
                onKeyup: t
            }, null, 544), [
                [$, s(e).a_hdg]
            ]), R("button", {
                class: "delete",
                onClick: o
            }, "Hide")], 34))
        }
    }),
    ml = (i, l) => {
        const a = i.__vccOpts || i;
        for (const [c, o] of l) a[c] = o;
        return a
    },
    Rl = ml(de, [
        ["__scopeId", "data-v-70067e84"]
    ]);

function Me() {
    return Ri("IGAR")
}

function Lo() {
    return [{
        code: "IGAR",
        friendlyName: "Airbase Garry",
        groundCallsign: "",
        towerCallsigns: ["Garry Approach", "Garry Director", "Garry Radar", "Garry Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.800",
        defaultGroundFrequency: "",
        maxAcft: "N/A",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Rockford/Air%20Base%20Garry",
            sids: []
        }],
        generalInfo: `Location: Rockford PTFS
ICAO/IATA: IGAR / ABG
Lat/Long: N41° 44.6', W000° 02.0'
Elevation: 0 ft

Airport Use: Military`,
        runwayInfo: [{
            name1: "01",
            name2: "19",
            length: 2078,
            type: "concrete"
        }],
        commsInfo: `Garry Tower: 118.800
Chicago Centre: 124.850`
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
        }],
        generalInfo: `Location: Izolirani PTFS
ICAO/IATA: IJAR / NJF
Lat/Long: N41° 49.4', W000° 16.4'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "07",
            name2: "25",
            length: 2278,
            type: "concrete"
        }],
        commsInfo: `ATIS: 123.900
Al Najaf Ground: 121.700
Al Najaf Tower: 119.1
Al Najaf Approach: 120.200
Norsom Centre: 125.640`
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
        }],
        generalInfo: `Location: Cyprus PTFS
ICAO/IATA: IBAR / BRR
Lat/Long: N41° 38.0', W000° 10.8'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [],
        commsInfo: `Barra Tower: 118.080
Lazarus Centre: 126.300`
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
        }],
        generalInfo: `Location: Rockford PTFS
ICAO/IATA: IBLT / BOL
Lat/Long: N41° 44.8', W000° 00.9'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "15",
            name2: "33",
            length: 496,
            type: "grass"
        }],
        commsInfo: `Boltic Tower: 118.430
Chicago Centre: 124.850`
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
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Rockford/Greater%20Rockford",
            sids: [{
                name: "INTER1A",
                runways: ["36L"],
                transitions: ["REAPR", "LOGAN", "DEATH"]
            }, {
                name: "INTER1B",
                runways: ["36R"],
                transitions: ["REAPR", "LOGAN", "DEATH"]
            }, {
                name: "INTER1C",
                runways: ["18R", "18L"],
                transitions: ["REAPR", "LOGAN", "DEATH"]
            }, {
                name: "KEN1A",
                runways: ["36L", "36R"]
            }, {
                name: "KEN1B",
                runways: ["18R"]
            }, {
                name: "KEN1C",
                runways: ["18L"]
            }]
        }, {
            author: "sanderli25",
            link: "https://drive.google.com/file/d/1I-oucFK61M6QdSFdEPYWQ3P9dRZ8D7Jl/view"
        }, {
            author: "Nikita39Gamer",
            link: "https://drive.google.com/file/d/1Kg7IaeCuovKrtfTduSCsmhsjWTiFDSV_/view",
            sids: [{
                name: "GUESS1A",
                runways: ["36L"],
                route: "EASTN GUESS"
            }, {
                name: "GUESS1B",
                runways: ["36R"],
                route: "EASTN GUESS"
            }, {
                name: "GUESS1C",
                runways: ["18R"],
                route: "BLA HELPR WAREZ PARTS GUESS"
            }, {
                name: "GUESS1D",
                runways: ["18L"],
                route: "BLA HELPR WAREZ PARTS GUESS"
            }, {
                name: "WELSH3A",
                runways: ["36L"],
                route: "EASTN KEN WELSH"
            }, {
                name: "WELSH3B",
                runways: ["36R"],
                route: "EASTN KEN WELSH"
            }, {
                name: "WELSH3C",
                runways: ["18R"],
                route: "BLA TRN STOOD RESTS WELSH"
            }, {
                name: "WELSH3D",
                runways: ["18L"],
                route: "BLA TRN STOOD RESTS WELSH"
            }, {
                name: "INDEX4A",
                runways: ["36L"],
                route: "EASTN INDEX"
            }, {
                name: "INDEX4B",
                runways: ["36R"],
                route: "EASTN INDEX"
            }, {
                name: "INDEX4C",
                runways: ["18R"],
                route: "BLA TRN STOOD RESTS INDEX"
            }, {
                name: "INDEX4D",
                runways: ["18L"],
                route: "BLA TRN STOOD RESTS INDEX"
            }, {
                name: "SEEKS1A",
                runways: ["36L"],
                route: "EASTN ROK BEANS SEEKS"
            }, {
                name: "SEEKS1B",
                runways: ["36R"],
                route: "EASTN ROK BEANS SEEKS"
            }, {
                name: "SEEKS1C",
                runways: ["18R"],
                route: "BLA HELPR SEEKS"
            }, {
                name: "SEEKS1D",
                runways: ["18L"],
                route: "BLA HELPR SEEKS"
            }, {
                name: "SETHR1A",
                runways: ["36L"],
                route: "EASTN RESTS SETHR"
            }, {
                name: "SETHR1B",
                runways: ["36R"],
                route: "EASTN RESTS SETHR"
            }, {
                name: "SETHR1C",
                runways: ["18R"],
                route: "BLA TRN HMS SETHR"
            }, {
                name: "SETHR1D",
                runways: ["18L"],
                route: "BLA TRN HMS SETHR"
            }, {
                name: "JAMSI1A",
                runways: ["36L"],
                route: "EASTN RESTS HMS JAMSI"
            }, {
                name: "JAMSI1B",
                runways: ["36R"],
                route: "EASTN RESTS HMS JAMSI"
            }, {
                name: "JAMSI1C",
                runways: ["18R"],
                route: "BLA TRN SAVES JAMSI"
            }, {
                name: "JAMSI1D",
                runways: ["18L"],
                route: "BLA TRN SAVES JAMSI"
            }, {
                name: "LAZER1A",
                runways: ["36L"],
                route: "EASTN RESTS HMS LAZER"
            }, {
                name: "LAZER1B",
                runways: ["36R"],
                route: "EASTN RESTS HMS LAZER"
            }, {
                name: "LAZER1C",
                runways: ["18R"],
                route: "BLA TRN SAVES LAZER"
            }, {
                name: "LAZER1D",
                runways: ["18L"],
                route: "BLA TRN SAVES LAZER"
            }]
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
            link: "https://drive.google.com/file/d/13WTsIv4FbnUhUoDJzXyw1ZV3_fGqbjBF/view",
            sids: [{
                name: "GUESS1S",
                runways: ["36L"],
                route: "GUESS"
            }, {
                name: "GUESS1Z",
                runways: ["36R"],
                route: "GUESS"
            }, {
                name: "GUESS1R",
                runways: ["18R"],
                route: "ROK GUESS"
            }, {
                name: "GUESS1Y",
                runways: ["18L"],
                route: "ROK GUESS"
            }, {
                name: "WELSH1S",
                runways: ["36L"],
                route: "WELSH"
            }, {
                name: "WELSH1Z",
                runways: ["36R"],
                route: "WELSH"
            }, {
                name: "WELSH1R",
                runways: ["18R"],
                route: "ROK WELSH"
            }, {
                name: "WELSH1Y",
                runways: ["18L"],
                route: "ROK WELSH"
            }, {
                name: "INDEX1S",
                runways: ["36L"],
                route: "INDEX"
            }, {
                name: "INDEX1Z",
                runways: ["36R"],
                route: "INDEX"
            }, {
                name: "INDEX1R",
                runways: ["18R"],
                route: "ROK INDEX"
            }, {
                name: "INDEX1Y",
                runways: ["18L"],
                route: "ROK INDEX"
            }, {
                name: "SETHR1S",
                runways: ["36L"],
                route: "SETHR"
            }, {
                name: "SETHR1Z",
                runways: ["36R"],
                route: "SETHR"
            }, {
                name: "SETHR1R",
                runways: ["18R"],
                route: "SETHR"
            }, {
                name: "SETHR1Y",
                runways: ["18L"],
                route: "SETHR"
            }, {
                name: "LAZER1S",
                runways: ["36L"],
                route: "LAZER"
            }, {
                name: "LAZER1Z",
                runways: ["36R"],
                route: "LAZER"
            }, {
                name: "LAZER1R",
                runways: ["18R"],
                route: "LAZER"
            }, {
                name: "LAZER1Y",
                runways: ["18L"],
                route: "LAZER"
            }]
        }],
        generalInfo: `Location: Rockford PTFS
ICAO/IATA: IRFD / RFD
Lat/Long: N41° 43.3', W000° 01.4'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "18R",
            name2: "36L",
            length: 3535,
            type: "concrete"
        }, {
            name1: "18L",
            name2: "36R",
            length: 3e3,
            type: "concrete"
        }],
        commsInfo: `ATIS: 127.600
Rockford Delivery: 128.400
Rockford Ground: 120.400
Rockford Tower: 118.100
Rockford Departure: 121.000
Chicago Centre: 124.850`,
        topDowns: ["IGAR", "IMLR", "IBLT", "ITRC", "OWO"]
    }, {
        code: "IGRV",
        friendlyName: "Grindavik Airport",
        groundCallsign: "",
        towerCallsigns: ["Keflavik Control", "Grindavik Approach", "Grindavik Centre", "Grindavik Control", "Grindavik Director", "Grindavik Radar", "Grindavik Tower"],
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
        }],
        generalInfo: `Location: Grindavik PTFS
ICAO/IATA: IGRV / GVK
Lat/Long: N41° 50.2', W000° 10.6'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "06",
            name2: "24",
            length: 2392,
            type: "concrete"
        }],
        commsInfo: `ATIS: 128.300
Grindavik Ground: 121.900
Grindavik Tower: 118.300
Grindavik Departure: 119.300
Keflavik Control: 126.750`,
        topDowns: ["TVO"]
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
        }],
        generalInfo: `Location: Rockford PTFS
ICAO/IATA: IHEN / HEN
Lat/Long: N41° 37.0', W000° 07.6'
Elevation: 1 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "17",
            name2: "35",
            length: 1170,
            type: "concrete"
        }],
        commsInfo: `Henstridge Tower: 118.200
Chicago Centre: 124.850`
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
        }],
        generalInfo: `Location: Izolirani PTFS
ICAO/IATA: IZOL / IZO
Lat/Long: N41° 48.1', W000° 16.1'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "10",
            name2: "28",
            length: 4375,
            type: "concrete"
        }],
        commsInfo: `ATIS: 127.800
Izolirani Delivery: 128.200
Izolirani Ground: 121.900
Izolirani Tower: 118.700
Izolirani Departure: 124.300
Norsom Centre: 125.640`,
        topDowns: ["IJAF", "ISCM"]
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
            link: "https://docs.google.com/document/d/1DXI4DGpc2UMl7bHrPygf3_oHAZ68UDe5X4boa2teIw8/edit",
            sids: [{
                name: "ANYMS1J",
                runways: ["06"]
            }, {
                name: "JAMSI1J",
                runways: ["06"]
            }, {
                name: "JUSTY1J",
                runways: ["06"]
            }, {
                name: "REAPR1J",
                runways: ["06"]
            }, {
                name: "ANYMS1K",
                runways: ["24"]
            }, {
                name: "JAMSI1K",
                runways: ["24"]
            }, {
                name: "JUSTY1K",
                runways: ["24"]
            }, {
                name: "REAPR1K",
                runways: ["24"]
            }]
        }, {
            author: "greek_dutchman",
            link: "https://docs.google.com/document/d/1i9q2jla0cXq6Vq-IkLihjkzqu-s3Q1e_EyPWAo3mxso/edit"
        }],
        generalInfo: `Location: Cyprus PTFS
ICAO/IATA: ILAR / LCA
Lat/Long: N41° 39.5', E000° 08.8'
Elevation: 1 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "06",
            name2: "24",
            length: 3355,
            type: "concrete"
        }],
        commsInfo: `ATIS: 126.550
Larnaca Delivery: 120.575
Larnaca Ground: 119.4
Larnaca Tower: 121.200
Larnaca Departure: 130.200
Lazarus Centre: 126.300`,
        topDowns: ["IBAR", "IHEN", "IIAB", "IPAP"]
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
        }],
        generalInfo: `Location: Perth PTFS
ICAO/IATA: ILKL / LUA
Lat/Long: N41° 54.4', E000° 09.2'
Elevation: 954 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "09",
            name2: "27",
            length: 1303,
            type: "concrete"
        }],
        commsInfo: `Lukla Tower: 120.150
Perth Centre: 135.250`
    }, {
        code: "IIAB",
        friendlyName: "McConnell AFB",
        groundCallsign: "",
        towerCallsigns: ["McConnell Approach", "McConnell Director", "McConnell Radar", "McConnell Tower"],
        hasGround: !1,
        defaultTowerFrequency: "127.250",
        defaultGroundFrequency: "",
        maxAcft: "N/A",
        chartPacks: [{
            author: "N/A",
            link: "N/A"
        }],
        generalInfo: "",
        runwayInfo: [{
            name1: "27L",
            name2: "09R",
            length: 4329,
            type: "concrete"
        }, {
            name1: "27R",
            name2: "09L",
            length: 4329,
            type: "concrete"
        }],
        commsInfo: ""
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
        }],
        generalInfo: `Location: Rockford PTFS
ICAO/IATA: IMLR / MEL
Lat/Long: N41° 43.3', W000° 00.1'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "11",
            name2: "29",
            length: 2997,
            type: "concrete"
        }],
        commsInfo: `ATIS: 126.030
Mellor Delivery: 121.930
Mellor Tower: 133.850
Mellor Radar: 125.650
Chicago Centre: 124.850`
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
        }],
        generalInfo: `Location: Cyprus PTFS
ICAO/IATA: IPAP / PFO
Lat/Long: N41° 39.3', E000° 12.1'
Elevation: 95 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "17",
            name2: "35",
            length: 3404,
            type: "concrete"
        }],
        commsInfo: `ATIS: 127.325
Paphos Ground: 120.800
Paphos Tower: 119.900
Paphos Departure: 130.625
Lazarus Centre: 126.300`
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
            link: "https://docs.google.com/document/d/1sEOREpJL5TCAs7tejRn2Fm02Ai4IZV5uolC9cX65x3c/edit",
            sids: [{
                name: "KNIF1A",
                runways: ["11"]
            }, {
                name: "KNIF1B",
                runways: ["15"]
            }, {
                name: "KNIF1C",
                runways: ["29"]
            }, {
                name: "KNIF1D",
                runways: ["33"]
            }, {
                name: "ROM1A",
                runways: ["11"]
            }, {
                name: "ROM1B",
                runways: ["15"]
            }, {
                name: "ROM1C",
                runways: ["29"]
            }, {
                name: "ROM1D",
                runways: ["33"]
            }, {
                name: "CAME1A",
                runways: ["11"]
            }, {
                name: "CAME1B",
                runways: ["15"]
            }, {
                name: "CAME1C",
                runways: ["29"]
            }, {
                name: "CAME1D",
                runways: ["33"]
            }]
        }],
        generalInfo: `Location: Perth PTFS
ICAO/IATA: IPPH / PER
Lat/Long: N41° 55.7', E000° 7.7'
Elevation: 26 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "11",
            name2: "29",
            length: 4375,
            type: "concrete"
        }, {
            name1: "15",
            name2: "33",
            length: 3355,
            type: "concrete"
        }],
        commsInfo: `ATIS: 123.800
Perth Delivery: 118.550
Perth Ground: 121.700
Perth Tower: 127.400
Perth Departure: 118.700
Perth Centre: 135.250`,
        topDowns: ["ILKL", "SHV"]
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
        }],
        generalInfo: `Location: Izolirania PTFS
ICAO/IATA: ISCM / SCT
Lat/Long: N41° 51.1', E000° 13.3'
Elevation: 0 ft

Airport Use: Military`,
        runwayInfo: [{
            name1: "13",
            name2: "31",
            length: 1812,
            type: "concrete"
        }],
        commsInfo: `Scampton Tower: 118.220
Norsom Centre: 125.640`
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
        }],
        generalInfo: `Location: Orenji PTFS
ICAO/IATA: IDCS / SAB
Lat/Long: N41° 03.0', E000° 1.0'
Elevation: 65 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "07",
            name2: "25",
            length: 750,
            type: "concrete"
        }],
        commsInfo: `ATIS: 118.250
Saba Tower: 122.500
Tokyo Control: 132.300`
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
        }],
        generalInfo: `Location: Saint Barthélemy PTFS
ICAO/IATA: IBTH / SBH
Lat/Long: N41° 50.8', E000° 4.2'
Elevation: 9 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "09",
            name2: "27",
            length: 1547,
            type: "concrete"
        }],
        commsInfo: `ATIS: 118.450
Sotaf Centre: 128.600`
    }, {
        code: "ISAU",
        friendlyName: "Sauthemptona Airport",
        groundCallsign: "",
        towerCallsigns: ["Brighton Control", "Sauthemptona Approach", "Sauthemptona Centre", "Sauthemptona Control", "Sauthemptona Director", "Sauthemptona Radar", "Sauthemptona Tower"],
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
        }],
        generalInfo: `Location: Sauthemptona PTFS
ICAO/IATA: ISAU / SAU
Lat/Long: N41° 41.0', W000° 11.5'
Elevation: 1 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "08",
            name2: "26",
            length: 2554,
            type: "concrete"
        }],
        commsInfo: `ATIS: 113.350
Sauthemptona Ground: 130.880
Sauthemptona Tower: 118.205
Sauthemptona Radar: 122.730
Brighton Control: 127.820`
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
        }],
        generalInfo: `Location: Skopelos PTFS
ICAO/IATA: ISKP / SKO
Lat/Long: N41° 45.5', E000° 10.2'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "05",
            name2: "23",
            length: 636,
            type: "grass"
        }],
        commsInfo: "Skopelos Tower: 118.400"
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
            author: "Nikita39Gamer, userwastaken",
            link: "https://drive.google.com/file/d/12D4LEcKJiMkh9u7i1kEih54dYSAFQHRG/view",
            sids: [{
                name: "BLANK1W",
                runways: ["02"]
            }, {
                name: "EURAD1W",
                runways: ["02"]
            }, {
                name: "HONDA1W",
                runways: ["02"]
            }, {
                name: "RENDR1W",
                runways: ["02"]
            }, {
                name: "ONDER1W",
                runways: ["02"]
            }, {
                name: "BLANK1X",
                runways: ["13"]
            }, {
                name: "EURAD1X",
                runways: ["13"]
            }, {
                name: "HONDA1X",
                runways: ["13"]
            }, {
                name: "RENDR1X",
                runways: ["13"]
            }, {
                name: "ONDER1X",
                runways: ["13"]
            }, {
                name: "BLANK1Y",
                runways: ["20"]
            }, {
                name: "EURAD1Y",
                runways: ["20"]
            }, {
                name: "HONDA1Y",
                runways: ["20"]
            }, {
                name: "RENDR1Y",
                runways: ["20"]
            }, {
                name: "ONDER1Y",
                runways: ["20"]
            }, {
                name: "BLANK1Z",
                runways: ["31"]
            }, {
                name: "EURAD1Z",
                runways: ["31"]
            }, {
                name: "HONDA1Z",
                runways: ["31"]
            }, {
                name: "RENDR1Z",
                runways: ["31"]
            }, {
                name: "ONDER1Z",
                runways: ["31"]
            }, {
                name: "BLANK2A",
                runways: ["02"]
            }, {
                name: "EURAD2A",
                runways: ["02"]
            }, {
                name: "HONDA2A",
                runways: ["02"]
            }, {
                name: "RENDR2A",
                runways: ["02"]
            }, {
                name: "ONDER2A",
                runways: ["02"]
            }, {
                name: "BLANK2B",
                runways: ["13"]
            }, {
                name: "EURAD2B",
                runways: ["13"]
            }, {
                name: "HONDA2B",
                runways: ["13"]
            }, {
                name: "RENDR2B",
                runways: ["13"]
            }, {
                name: "ONDER2B",
                runways: ["13"]
            }, {
                name: "BLANK2C",
                runways: ["20"]
            }, {
                name: "EURAD2C",
                runways: ["20"]
            }, {
                name: "HONDA2C",
                runways: ["20"]
            }, {
                name: "RENDR2C",
                runways: ["20"]
            }, {
                name: "ONDER2C",
                runways: ["20"]
            }, {
                name: "BLANK2D",
                runways: ["31"]
            }, {
                name: "EURAD2D",
                runways: ["31"]
            }, {
                name: "HONDA2D",
                runways: ["31"]
            }, {
                name: "RENDR2D",
                runways: ["31"]
            }, {
                name: "ONDER2D",
                runways: ["31"]
            }]
        }, {
            author: "GA4RIE1",
            link: "https://docs.google.com/document/d/1NjssUTQnlHVQiZciry656h5ZBu2xW7lJu2Q2L5G90CU/edit"
        }, {
            author: "SQD_YEET",
            link: "https://docs.google.com/presentation/d/1PPpJoNXSOLL5DUMBSexPGDbDskA2nMkrPglJ35szKF4/edit#slide=id.gc6f90357f_0_0"
        }],
        generalInfo: `Location: Orenji PTFS
ICAO/IATA: ITKO / HND
Lat/Long: N41° 59.2', W000° 00.2'
Elevation: 1 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "02",
            name2: "20",
            length: 3754,
            type: "concrete"
        }, {
            name1: "13",
            name2: "31",
            length: 4850,
            type: "concrete"
        }],
        commsInfo: `ATIS: 128.800
Tokyo Delivery: 121.825
Tokyo Ground: 118.225
Tokyo Tower: 118.800
Tokyo Departure: 119.100
Tokyo Control: 132.300`,
        topDowns: ["IDCS"]
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
        }],
        generalInfo: `Location: Rockford PTFS
ICAO/IATA: ITRC / TRN
Lat/Long: N41° 41.2', E000° 00.3'
Elevation: 80 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "18",
            name2: "36",
            length: 1286,
            type: "concrete"
        }],
        commsInfo: `Traning Centre Tower: 118.500
Chicago Centre: 124.850`
    }, {
        code: "TVO",
        friendlyName: "Tavaro Seabase",
        groundCallsign: "",
        towerCallsigns: ["Tavaro Approach", "Tavaro Director", "Tavaro Radar", "Tavaro Tower"],
        hasGround: !1,
        defaultTowerFrequency: "121.800",
        defaultGroundFrequency: "",
        maxAcft: "Amphibian",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Grindavik/Tavaro%20Seabase"
        }],
        generalInfo: `Location: Grindavik PTFS
IATA: TVO
Lat/Long: N41° 50.2', W000° 10.6'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "4W",
            name2: "21W",
            length: 1e3,
            type: "water"
        }],
        commsInfo: `Tavaro Tower: 121.800
Keflavik Control: 126.750`
    }, {
        code: "SHV",
        friendlyName: "Sea Haven Seabase",
        groundCallsign: "",
        towerCallsigns: ["Sea Haven Approach", "Sea Haven Director", "Sea Haven Radar", "Sea Haven Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.625",
        defaultGroundFrequency: "",
        maxAcft: "Amphibian",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Perth/Sea%20Haven"
        }],
        generalInfo: `Location: Perth PTFS
IATA: SHV
Lat/Long: N41° 55.7', E000° 09.2'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "18W",
            name2: "36W",
            length: 1e3,
            type: "water"
        }],
        commsInfo: `Sea Haven Tower: 118.625
Perth Centre: 136.250`
    }, {
        code: "OWO",
        friendlyName: "Waterloo Seabase",
        groundCallsign: "",
        towerCallsigns: ["Waterloo Approach", "Waterloo Director", "Waterloo Radar", "Waterloo Tower"],
        hasGround: !1,
        defaultTowerFrequency: "118.600",
        defaultGroundFrequency: "",
        maxAcft: "Amphibian",
        chartPacks: [{
            author: "Official",
            link: "https://github.com/Treelon/ptfs-charts/tree/main/Rockford/Waterloo"
        }],
        generalInfo: `Location: Rockford PTFS
IATA: OWO
Lat/Long: N41° 40.4', W000° 01.1'
Elevation: 0 ft

Airport Use: Public`,
        runwayInfo: [{
            name1: "10W",
            name2: "28W",
            length: 1e3,
            type: "water"
        }],
        commsInfo: `Waterloo Radar: 118.600
Chicago Centre: 124.850`
    }]
}

function Ri(i) {
    let l = !1,
        a = null;
    return Lo().forEach(c => {
        l || c.code == i && (a = c, l = !0)
    }), a ?? Me()
}
const Pe = ["placeholder"],
    Ge = {
        key: 0
    },
    De = ["onClick"],
    He = {
        key: 0
    },
    Ue = {
        key: 0,
        class: "arrowed"
    },
    Be = {
        key: 1
    },
    pe = {
        key: 1
    },
    Fe = {
        key: 0,
        class: "arrowed"
    },
    he = {
        key: 1
    },
    Ve = Kl({
        __name: "AtisInfoField",
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
            change: i => i
        },
        setup(i, {
            emit: l
        }) {
            let a = i,
                c = l,
                o = ii(a.items),
                A = ii(!1);
            mi.value = a.value ?? "";
            let e = ii(!1),
                g = ii(0);
            a.value != null && n();

            function n() {
                a.filter ? o.value = a.items.filter(a.filter) : o.value = a.items.filter(t => t.toLowerCase().includes(mi.value.toLowerCase())), o.value.length != 0 && (g.value = g.value % o.value.length)
            }

            function O(t) {
                A.value = !1, e.value = !1, mi.value = t, n(), c("change", mi.value)
            }

            function T(t) {
                if (A.value) switch (t.code) {
                    case "ArrowUp":
                        if (o.value.length == 0) return;
                        g.value = (g.value - 1 + o.value.length) % o.value.length;
                        break;
                    case "ArrowDown":
                        if (o.value.length == 0) return;
                        g.value = (g.value + 1) % o.value.length;
                        break;
                    case "Enter":
                    case "Tab":
                        if (o.value.length == 0) return;
                        O(o.value[g.value]);
                        break
                }
            }
            return Pc(() => {
                window.addEventListener("keydown", T)
            }), Gc(() => {
                window.removeEventListener("keydown", T)
            }), (t, N) => (P(), B("div", null, [k(R("input", {
                type: "text",
                "onUpdate:modelValue": N[0] || (N[0] = F => ti(mi) ? mi.value = F : null),
                onInput: n,
                placeholder: s(a).placeholder,
                onFocus: N[1] || (N[1] = F => {
                    ti(A) ? A.value = !0 : A = !0, F.target.select()
                }),
                onBlur: N[2] || (N[2] = F => ti(A) ? A.value = !1 : A = !1)
            }, null, 40, Pe), [
                [$, s(mi)]
            ]), s(A) || s(e) ? (P(), B("ul", Ge, [(P(!0), B(ci, null, Mi(s(o), (F, H) => (P(), B("li", {
                key: F,
                onClick: I => O(F),
                onMouseover: N[3] || (N[3] = I => ti(e) ? e.value = !0 : e = !0),
                onMouseleave: N[4] || (N[4] = I => ti(e) ? e.value = !1 : e = !1),
                style: zl({
                    width: t.width != null ? `${t.width}vw` : "inherit"
                })
            }, [t.displayText != null ? (P(), B("div", He, [H == s(g) ? (P(), B("p", Ue, D(t.displayText(F)), 1)) : (P(), B("p", Be, D(t.displayText(F)), 1))])) : (P(), B("div", pe, [H == s(g) ? (P(), B("p", Fe, D(F), 1)) : (P(), B("p", he, D(F), 1))]))], 44, De))), 128))])) : _("", !0)]))
        }
    }),
    Ke = ml(Ve, [
        ["__scopeId", "data-v-5b42320c"]
    ]),
    Ei = i => (dc("data-v-792dd380"), i = i(), Mc(), i),
    me = {
        class: "body"
    },
    Ye = {
        class: "vflex options"
    },
    We = {
        class: "hflex"
    },
    ye = {
        class: "hflex"
    },
    Je = ["checked"],
    Xe = Ei(() => R("p", null, "Display Zulu Time", -1)),
    ve = ["checked"],
    we = Ei(() => R("p", null, "Display Boxes", -1)),
    _e = ["checked"],
    be = Ei(() => R("p", null, "Full Phonetic Name", -1)),
    Ze = ["checked"],
    ke = Ei(() => R("p", null, "Abbreviation", -1)),
    xe = {
        class: "hflex"
    },
    $e = {
        class: "hflex boxed half"
    },
    Qe = Ei(() => R("p", null, "Dashes", -1)),
    qe = ["checked"],
    ze = ["checked"],
    ig = Ei(() => R("p", null, "Prefer SIDs/STARs", -1)),
    lg = ["checked"],
    ag = Ei(() => R("p", null, "Bold Text", -1)),
    cg = {
        class: "hflex"
    },
    ng = {
        class: "hflex smallgap"
    },
    og = ["value", "selected"],
    sg = {
        class: "hflex smallgap"
    },
    Ag = ["checked"],
    eg = Ei(() => R("p", null, "Ground Controller", -1)),
    gg = {
        class: "hflex"
    },
    tg = {
        class: "hflex smallgap"
    },
    Rg = Ei(() => R("div", {
        class: "boxed medium hflex"
    }, [R("p", null, "Max Taxi Speed")], -1)),
    Eg = {
        class: "hflex smallgap"
    },
    Ig = ["selected"],
    rg = ["selected"],
    Sg = {
        class: "hflex"
    },
    Tg = {
        class: "hflex"
    },
    Ng = {
        class: "hflex smallgap"
    },
    Og = ["checked"],
    Lg = Ei(() => R("p", null, "Speed Restriction", -1)),
    Cg = {
        class: "hflex smallgap"
    },
    ug = {
        class: "td"
    },
    fg = {
        class: "hflex"
    },
    dg = ["onClick"],
    Mg = ["checked"],
    Pg = Ei(() => R("div", {
        class: "vflex boxed long"
    }, [R("div", {
        class: "hflex long"
    }, [R("p", null, "Ground state on Initial Contact")])], -1)),
    Gg = {
        class: "hflex smallgap"
    },
    Dg = ["checked"],
    Hg = Ei(() => R("p", null, "Stand Number", -1)),
    Ug = ["checked"],
    Bg = Ei(() => R("p", null, "Aircraft type", -1)),
    pg = Ei(() => R("div", {
        class: "vflex boxed long"
    }, [R("div", {
        class: "hflex long"
    }, [R("p", null, "Airborne state on Initial Contact")])], -1)),
    Fg = {
        class: "hflex"
    },
    hg = ["checked"],
    Vg = Ei(() => R("p", null, "Aircraft Type", -1)),
    Kg = ["checked"],
    mg = Ei(() => R("p", null, "Altitude", -1)),
    Yg = ["checked"],
    Wg = Ei(() => R("p", null, "Airspeed", -1)),
    yg = ["checked"],
    Jg = Ei(() => R("p", null, "Heading", -1)),
    Xg = Ei(() => R("div", {
        class: "vflex boxed long"
    }, [R("div", {
        class: "hflex long"
    }, [R("p", null, "Charts")])], -1)),
    vg = {
        class: "hflex"
    },
    wg = ["value", "selected"],
    _g = ["selected"],
    bg = {
        key: 0,
        class: "hflex half boxed"
    },
    Zg = Ei(() => R("p", null, "Chart Pack Author", -1)),
    kg = [Zg],
    xg = {
        class: "hflex"
    },
    $g = {
        key: 0,
        class: "hflex half boxed"
    },
    Qg = Ei(() => R("p", null, "Chart Pack Link", -1)),
    qg = [Qg],
    jg = Ei(() => R("div", {
        class: "vflex boxed long"
    }, [R("div", {
        class: "hflex long"
    }, [R("p", null, "Additional NOTAMS")])], -1)),
    zg = {
        class: "hflex"
    },
    it = {
        class: "vflex"
    },
    lt = Kl({
        __name: "AtisGen",
        setup(i) {
            let l = ii(null);

            function a(T) {
                let t = {
                    id: "-1",
                    roomSecret: pi()
                };
                T == "information" && (t.atis_information = n.information), T == "zuluTime" && (t.atis_zuluTime = n.zuluTime), T == "boxes" && (t.atis_boxes = n.boxes), T == "phoneticAbbr" && (t.atis_phoneticAbbr = n.phoneticAbbr), T == "dashes" && (t.atis_dashes = n.dashes), T == "hasGround" && (t.atis_hasGround = n.hasGround), T == "towerCallsign" && (t.atis_towerCallsign = n.towerCallsign), T == "towerFrequency" && (t.atis_towerFrequency = n.towerFrequency, gc(n.towerFrequency)), T == "groundFrequency" && (t.atis_groundFrequency = n.groundFrequency), T == "taxiSpeed" && (t.atis_taxiSpeed = n.taxiSpeed), T == "depRunways" && (t.atis_depRunways = n.depRunways), T == "arrRunways" && (t.atis_arrRunways = n.arrRunways), T == "pressure" && (t.atis_pressure = n.pressure), T == "chartAuthor" && (t.atis_chartAuthor = n.chartAuthor, ec(n.chartAuthor)), T == "chartLink" && (t.atis_chartLink = n.chartLink), T == "emergencies" && (t.atis_emergencies = n.emergencies), T == "topDown" && (t.atis_topDown = n.topDown), T == "topDownText" && (t.atis_topDownText = n.topDownText), T == "groundedType" && (t.atis_groundedType = n.groundedType), T == "groundedStand" && (t.atis_groundedStand = n.groundedStand), T == "airborneType" && (t.atis_airborneType = n.airborneType), T == "airborneAlt" && (t.atis_airborneAlt = n.airborneAlt), T == "airborneHeading" && (t.atis_airborneHeading = n.airborneHeading), T == "airborneSpeed" && (t.atis_airborneSpeed = n.airborneSpeed), T == "speed" && (t.atis_speed = n.speed), T == "speedLimit" && (t.atis_speedLimit = n.speedLimit), T == "extraNotams" && (t.atis_extraNotams = n.extraNotams), T == "sids" && (t.atis_sids = n.sids), T == "customCharts" && (t.atis_customCharts = n.customCharts), T == "useQNH" && (t.atis_useQNH = n.useQNH), T == "markdown" && (t.atis_markdown = n.markdown), Zl(t)
            }

            function c(T) {
                n.topDowns[T] = !n.topDowns[T], n.topDownText = Object.keys(n.topDowns).filter(t => n.topDowns[t] == !0).map(t => Ri(gi()).topDowns[Number(t)]).join(", ").replace(/,\W$/, ""), Object.keys(n.topDowns).filter(t => n.topDowns[t] == !0).length > 0 ? n.topDown = !0 : n.topDown = !1, a("topDown"), a("topDownText")
            }

            function o(T) {
                let t = T.currentTarget.value;
                if (t == "custom") n.customCharts = !0, n.chartAuthor = "", n.chartLink = "";
                else {
                    n.customCharts = !1;
                    let N = JSON.parse(t);
                    n.chartAuthor = N.author, n.chartLink = N.link
                }
                a("customCharts"), a("chartAuthor"), a("chartLink")
            }

            function A(T) {
                T.currentTarget.value == "hpa" && !n.useQNH ? (n.pressure = Math.round(n.pressure * 33.863889532610884 * 100) / 100, n.useQNH = !0) : n.useQNH && (n.pressure = Math.round(n.pressure * .02952998057228486 * 100) / 100, n.useQNH = !1), a("useQNH")
            }

            function e() {
                let T = tl.indexOf(n.information);
                T = (T + 1) % tl.length, n.information = tl[T], mi.value = tl[T], a("information")
            }

            function g() {
                let T = Math.floor(Math.random() * 26);
                n.information = tl[T], mi.value = tl[T], a("information")
            }
            let n = al({
                airport: gi(),
                information: "Alfa",
                zuluTime: !0,
                boxes: !0,
                phoneticAbbr: !1,
                dashes: 25,
                hasGround: !1,
                towerCallsign: Ri(gi()).towerCallsigns[0],
                towerFrequency: Ri(gi()).defaultTowerFrequency,
                groundFrequency: Ri(gi()).defaultGroundFrequency,
                taxiSpeed: 25,
                depRunways: "",
                arrRunways: "",
                pressure: 1013.25,
                chartAuthor: Ri(gi()).chartPacks[0].author,
                chartLink: Ri(gi()).chartPacks[0].link,
                emergencies: !0,
                topDown: !1,
                topDownText: "",
                groundedType: !0,
                groundedStand: !0,
                airborneType: !1,
                airborneAlt: !0,
                airborneHeading: !1,
                airborneSpeed: !1,
                speed: 250,
                speedLimit: !0,
                extraNotams: "",
                sids: !0,
                customCharts: !1,
                useQNH: !0,
                markdown: !1,
                topDowns: {
                    0: !1,
                    1: !1,
                    2: !1,
                    3: !1,
                    4: !1
                }
            });
            async function O() {
                let T = await No();
                Object.keys(T).forEach(t => {
                    t == "information" && (mi.value = T[t]), t == "chartAuthor" && ec(T[t]), t == "towerFrequency" && gc(T[t]), n[t] = T[t], t == "topDownText" && (n.topDowns[0] = !1, n.topDowns[1] = !1, n.topDowns[2] = !1, n.topDowns[3] = !1, n.topDowns[4] = !1, T[t].split(", ").forEach(N => {
                        var F;
                        n.topDowns[(F = Ri(gi()).topDowns) == null ? void 0 : F.indexOf(N)] = !0
                    }), QA(T[t].split(", ")))
                })
            }
            return setInterval(O, 2500), O(), (T, t) => (P(), B("div", me, [R("div", Ye, [R("div", We, [Bi(Ke, {
                value: s(mi),
                placeholder: "Information",
                items: s(tl),
                "display-text": N => `${N} (${s(xa)(N)})`,
                onChange: t[0] || (t[0] = N => {
                    s(n).information = N, a("information")
                })
            }, null, 8, ["value", "items", "display-text"]), R("button", {
                onClick: e
            }, "Next Information"), R("button", {
                onClick: g
            }, "Random Information")]), R("div", ye, [R("div", {
                class: "hflex boxed half",
                onClick: t[1] || (t[1] = N => {
                    s(n).zuluTime = !s(n).zuluTime, a("zuluTime")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).zuluTime
            }, null, 8, Je), Xe]), R("div", {
                class: "hflex boxed half",
                onClick: t[2] || (t[2] = N => {
                    s(n).boxes = !s(n).boxes, a("boxes")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).boxes
            }, null, 8, ve), we]), R("div", {
                class: "hflex boxed half",
                name: "info",
                onClick: t[3] || (t[3] = N => {
                    s(n).phoneticAbbr = !1, a("phoneticAbbr")
                })
            }, [R("input", {
                type: "radio",
                checked: !s(n).phoneticAbbr
            }, null, 8, _e), be]), R("div", {
                class: "hflex boxed half",
                name: "info",
                onClick: t[4] || (t[4] = N => {
                    s(n).phoneticAbbr = !0, a("phoneticAbbr")
                })
            }, [R("input", {
                type: "radio",
                checked: s(n).phoneticAbbr
            }, null, 8, Ze), ke])]), R("div", xe, [R("div", $e, [k(R("input", {
                type: "range",
                min: "10",
                max: "50",
                "onUpdate:modelValue": t[5] || (t[5] = N => s(n).dashes = N),
                style: {
                    width: "5vw"
                },
                onChange: t[6] || (t[6] = N => a("dashes"))
            }, null, 544), [
                [$, s(n).dashes]
            ]), Qe]), R("div", {
                class: "hflex boxed half",
                onClick: t[7] || (t[7] = N => {
                    s(n).emergencies = !s(n).emergencies, a("emergencies")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).emergencies
            }, null, 8, qe), je]), R("div", {
                class: "hflex boxed half",
                onClick: t[8] || (t[8] = N => {
                    s(n).sids = !s(n).sids, a("sids")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).sids
            }, null, 8, ze), ig]), R("div", {
                class: "hflex boxed half",
                onClick: t[9] || (t[9] = N => {
                    s(n).markdown = !s(n).markdown, a("markdown")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).markdown
            }, null, 8, lg), ag])]), R("div", cg, [R("div", ng, [R("select", {
                onChange: t[10] || (t[10] = N => {
                    s(n).towerCallsign = N.currentTarget.value, a("towerCallsign")
                })
            }, [(P(!0), B(ci, null, Mi(s(Ri)(s(n).airport).towerCallsigns, N => (P(), B("option", {
                value: N,
                selected: s(n).towerCallsign == N
            }, D(N), 9, og))), 256))], 32), k(R("input", {
                type: "text",
                placeholder: "Tower Frequency",
                "onUpdate:modelValue": t[11] || (t[11] = N => s(n).towerFrequency = N),
                class: "shortened",
                onChange: t[12] || (t[12] = N => {
                    a("towerFrequency")
                }),
                onKeyup: t[13] || (t[13] = N => {
                    a("towerFrequency")
                })
            }, null, 544), [
                [$, s(n).towerFrequency]
            ])]), R("div", sg, [s(Ri)(s(n).airport).hasGround ? (P(), B("div", {
                key: 0,
                class: "hflex medium boxed",
                onClick: t[14] || (t[14] = N => {
                    s(n).hasGround = !s(n).hasGround, a("hasGround")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).hasGround
            }, null, 8, Ag), eg])) : _("", !0), s(n).hasGround && s(Ri)(s(n).airport).hasGround ? k((P(), B("input", {
                key: 1,
                type: "text",
                class: "shortened",
                placeholder: "Ground Frequency",
                "onUpdate:modelValue": t[15] || (t[15] = N => s(n).groundFrequency = N),
                onChange: t[16] || (t[16] = N => {
                    a("groundFrequency")
                }),
                onKeyup: t[17] || (t[17] = N => {
                    a("groundFrequency")
                })
            }, null, 544)), [
                [$, s(n).groundFrequency]
            ]) : _("", !0)])]), R("div", gg, [R("div", tg, [Rg, k(R("input", {
                type: "number",
                "onUpdate:modelValue": t[18] || (t[18] = N => s(n).taxiSpeed = N),
                class: "shortened",
                placeholder: "Max Taxi Speed",
                onChange: t[19] || (t[19] = N => {
                    a("taxiSpeed")
                }),
                onKeyup: t[20] || (t[20] = N => {
                    a("taxiSpeed")
                })
            }, null, 544), [
                [$, s(n).taxiSpeed]
            ])]), R("div", Eg, [R("select", {
                onChange: A
            }, [R("option", {
                value: "hpa",
                selected: s(n).useQNH
            }, "QNH (hPa)", 8, Ig), R("option", {
                value: "inhg",
                selected: !s(n).useQNH
            }, "Altimeter (inHg)", 8, rg)], 32), k(R("input", {
                type: "number",
                "onUpdate:modelValue": t[21] || (t[21] = N => s(n).pressure = N),
                class: "shortened",
                placeholder: "QNH",
                onChange: t[22] || (t[22] = N => {
                    a("pressure")
                }),
                onKeyup: t[23] || (t[23] = N => {
                    a("pressure")
                })
            }, null, 544), [
                [$, s(n).pressure]
            ])])]), R("div", Sg, [k(R("input", {
                type: "text",
                "onUpdate:modelValue": t[24] || (t[24] = N => s(n).depRunways = N),
                placeholder: "Departure Runways",
                onChange: t[25] || (t[25] = N => {
                    a("depRunways")
                }),
                onKeyup: t[26] || (t[26] = N => {
                    a("depRunways")
                })
            }, null, 544), [
                [$, s(n).depRunways]
            ]), k(R("input", {
                type: "text",
                "onUpdate:modelValue": t[27] || (t[27] = N => s(n).arrRunways = N),
                placeholder: "Arrival Runways",
                onChange: t[28] || (t[28] = N => {
                    a("arrRunways")
                }),
                onKeyup: t[29] || (t[29] = N => {
                    a("arrRunways")
                })
            }, null, 544), [
                [$, s(n).arrRunways]
            ])]), R("div", Tg, [R("div", Ng, [R("div", {
                class: "hflex medium boxed",
                onClick: t[30] || (t[30] = N => {
                    s(n).speedLimit = !s(n).speedLimit, a("speedLimit")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).speedLimit
            }, null, 8, Og), Lg]), s(n).speedLimit ? k((P(), B("input", {
                key: 0,
                type: "text",
                class: "shortened",
                placeholder: "Speed Limit",
                "onUpdate:modelValue": t[31] || (t[31] = N => s(n).speed = N),
                onChange: t[32] || (t[32] = N => {
                    a("speed")
                }),
                onKeyup: t[33] || (t[33] = N => {
                    a("speed")
                })
            }, null, 544)), [
                [$, s(n).speed]
            ]) : _("", !0)]), R("div", Cg, [R("div", ug, [R("div", fg, [(P(!0), B(ci, null, Mi(s(Ri)(s(gi)()).topDowns, (N, F) => (P(), B("span", {
                class: "boxed pointer",
                onClick: H => c(F)
            }, [R("input", {
                type: "checkbox",
                checked: s(n).topDowns[F]
            }, null, 8, Mg), no(" " + D(N), 1)], 8, dg))), 256))])])])]), Pg, R("div", Gg, [R("div", {
                class: "hflex boxed half",
                onClick: t[34] || (t[34] = N => {
                    s(n).groundedStand = !s(n).groundedStand, a("groundedStand")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).groundedStand
            }, null, 8, Dg), Hg]), R("div", {
                class: "hflex boxed half",
                onClick: t[35] || (t[35] = N => {
                    s(n).groundedType = !s(n).groundedType, a("groundedType")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).groundedType
            }, null, 8, Ug), Bg])]), pg, R("div", Fg, [R("div", {
                class: "hflex boxed half",
                onClick: t[36] || (t[36] = N => {
                    s(n).airborneType = !s(n).airborneType, a("airborneType")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).airborneType
            }, null, 8, hg), Vg]), R("div", {
                class: "hflex boxed half",
                onClick: t[37] || (t[37] = N => {
                    s(n).airborneAlt = !s(n).airborneAlt, a("airborneAlt")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).airborneAlt
            }, null, 8, Kg), mg]), R("div", {
                class: "hflex boxed half",
                onClick: t[38] || (t[38] = N => {
                    s(n).airborneSpeed = !s(n).airborneSpeed, a("airborneSpeed")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).airborneSpeed
            }, null, 8, Yg), Wg]), R("div", {
                class: "hflex boxed half",
                onClick: t[39] || (t[39] = N => {
                    s(n).airborneHeading = !s(n).airborneHeading, a("airborneHeading")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(n).airborneHeading
            }, null, 8, yg), Jg])]), Xg, R("div", vg, [R("select", {
                onChange: o
            }, [(P(!0), B(ci, null, Mi(s(Ri)(s(n).airport).chartPacks, N => (P(), B("option", {
                value: JSON.stringify(N),
                selected: s(n).chartAuthor == N.author
            }, D(N.author), 9, wg))), 256)), R("option", {
                value: "custom",
                selected: s(n).chartAuthor == "custom"
            }, "Custom", 8, _g)], 32), s(n).customCharts ? (P(), B("div", bg, kg)) : _("", !0), s(n).customCharts ? k((P(), B("input", {
                key: 1,
                type: "text",
                "onUpdate:modelValue": t[40] || (t[40] = N => s(n).chartAuthor = N),
                class: "third",
                onChange: t[41] || (t[41] = N => {
                    a("chartAuthor")
                }),
                onKeyup: t[42] || (t[42] = N => {
                    a("chartAuthor")
                })
            }, null, 544)), [
                [$, s(n).chartAuthor]
            ]) : _("", !0)]), R("div", xg, [s(n).customCharts ? (P(), B("div", $g, qg)) : _("", !0), s(n).customCharts ? k((P(), B("input", {
                key: 1,
                type: "text",
                "onUpdate:modelValue": t[43] || (t[43] = N => s(n).chartLink = N),
                class: "fancy",
                onChange: t[44] || (t[44] = N => {
                    a("chartLink")
                }),
                onKeyup: t[45] || (t[45] = N => {
                    a("chartLink")
                })
            }, null, 544)), [
                [$, s(n).chartLink]
            ]) : _("", !0)]), jg, R("div", zg, [k(R("textarea", {
                cols: "30",
                rows: "10",
                "onUpdate:modelValue": t[46] || (t[46] = N => s(n).extraNotams = N),
                onChange: t[47] || (t[47] = N => {
                    a("extraNotams")
                }),
                onKeyup: t[48] || (t[48] = N => {
                    a("extraNotams")
                })
            }, null, 544), [
                [$, s(n).extraNotams]
            ])])]), R("div", it, [R("textarea", {
                class: "atis",
                ref_key: "atisRef",
                ref: l,
                readonly: ""
            }, D(s(n).boxes ? "∎" : "") + " " + D(s(n).airport) + " ATIS Information " + D(s(n).phoneticAbbr ? s(xa)(s(n).information) : s(n).information) + " " + D(s(n).zuluTime ? new Date().getUTCHours().toFixed(0).padStart(2, "0") + new Date().getUTCMinutes().toFixed(0).padStart(2, "0") + "z" : "") + " " + D(s(n).boxes ? "∎" : "") + `\r
` + D(s(n).markdown ? "**" : "") + D("".padStart(s(n).dashes, "―")) + D(s(n).markdown ? "**" : "") + `\r
` + D(s(n).markdown ? "**" : "") + "Controller Callsign:" + D(s(n).markdown ? "**" : "") + " " + D(s(n).towerCallsign) + " (" + D(s(n).towerFrequency) + `)\r
` + D(s(n).hasGround && s(Ri)(s(n).airport).hasGround ? `Controller Callsign: ${s(Ri)(s(n).airport).groundCallsign} (${s(n).groundFrequency})
` : "") + D(s(n).markdown ? "**" : "") + D("".padStart(s(n).dashes, "―")) + D(s(n).markdown ? "**" : "") + `\r
` + D(s(n).markdown ? "**" : "") + "Aerodrome:" + D(s(n).markdown ? "**" : "") + `\r
Max Taxi Speed: ` + D(s(n).taxiSpeed) + `kts\r
Arrival Runway(s): ` + D(s(n).arrRunways) + `\r
Departure Runway(s): ` + D(s(n).depRunways) + `\r
Max Acft Size: ` + D(s(Ri)(s(n).airport).maxAcft) + `\r
` + D(s(n).useQNH ? `QNH: ${Math.round(s(n).pressure)}` : `Altimeter: ${s(n).pressure.toFixed(2)}`) + `\r
\r
` + D(s(n).markdown ? "**" : "") + "NOTAMS:" + D(s(n).markdown ? "**" : "") + `\r
` + D(s(n).topDown ? `Top Down for ${s(n).topDownText}
` : "") + D(`Ground Acft Advise Receipt of Information ${s(n).information}${s(n).groundedStand ? ", Stand Number" : ""}${s(n).groundedType ? ", Aircraft Type" : ""} on Initial Contact.`) + `\r
` + D(`Airborne Acft Advise Receipt of Information ${s(n).information}${s(n).airborneType ? ", Aircraft Type" : ""}${s(n).airborneAlt ? ", Altitude" : ""}${s(n).airborneSpeed ? ", Airspeed" : ""}${s(n).airborneHeading ? ", Heading" : ""} on Initial Contact.`) + `\r
` + D(s(n).speedLimit ? `Speed ${s(n).speed}kts or below.
` : "") + `VFR Acft say Direction of Flight, Intentions in Flight Plan.\r
` + D(s(n).sids ? `SIDs/STARs are preferred.
` : "") + D(s(n).emergencies ? "Emergencies Allowed." : "No Emergencies.") + `\r
` + D(s(n).extraNotams) + `                \r
` + D(s(n).markdown ? "**" : "") + "Charts:" + D(s(n).markdown ? "**" : "") + `\r
Chart Pack Author: ` + D(s(n).chartAuthor) + `\r
Chart Pack Link: ` + D(s(n).chartLink) + `\r
` + D(s(n).markdown ? "**" : "") + D("".padStart(s(n).dashes, "―")) + D(s(n).markdown ? "**" : "") + `\r
` + D(s(n).boxes ? "∎" : "") + " End of ATIS Information " + D(s(n).phoneticAbbr ? s(xa)(s(n).information) : s(n).information) + " " + D(s(n).boxes ? "∎" : ""), 513)])]))
        }
    }),
    at = ml(lt, [
        ["__scopeId", "data-v-792dd380"]
    ]),
    ct = ["placeholder"],
    nt = {
        key: 0
    },
    ot = ["onClick"],
    st = {
        key: 0
    },
    At = {
        key: 0,
        class: "arrowed"
    },
    et = {
        key: 1
    },
    gt = {
        key: 1
    },
    tt = {
        key: 0,
        class: "arrowed"
    },
    Rt = {
        key: 1
    },
    Et = Kl({
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
            width: {},
            searchQuery: {}
        },
        emits: {
            change: i => i
        },
        setup(i, {
            emit: l
        }) {
            let a = i,
                c = l,
                o = ii(a.items),
                A = ii(a.searchQuery == null ? a.value ?? "" : a.searchQuery),
                e = ii(!1),
                g = ii(!1),
                n = ii(0);
            a.value != null && O();

            function O() {
                a.filter ? o.value = a.items.filter(a.filter) : o.value = a.items.filter(N => N.toLowerCase().includes(A.value.toLowerCase())), o.value.length != 0 && (n.value = n.value % o.value.length)
            }

            function T(N) {
                e.value = !1, g.value = !1, A.value = N, O(), c("change", A.value)
            }

            function t(N) {
                if (e.value) switch (N.code) {
                    case "ArrowUp":
                        if (o.value.length == 0) return;
                        n.value = (n.value - 1 + o.value.length) % o.value.length;
                        break;
                    case "ArrowDown":
                        if (o.value.length == 0) return;
                        n.value = (n.value + 1) % o.value.length;
                        break;
                    case "Enter":
                    case "Tab":
                        if (o.value.length == 0) return;
                        T(o.value[n.value]);
                        break
                }
            }
            return Pc(() => {
                window.addEventListener("keydown", t)
            }), Gc(() => {
                window.removeEventListener("keydown", t)
            }), (N, F) => (P(), B("div", null, [k(R("input", {
                type: "text",
                "onUpdate:modelValue": F[0] || (F[0] = H => ti(A) ? A.value = H : A = H),
                onInput: O,
                placeholder: s(a).placeholder,
                onFocus: F[1] || (F[1] = H => {
                    ti(e) ? e.value = !0 : e = !0, H.target.select(), O()
                }),
                onBlur: F[2] || (F[2] = H => ti(e) ? e.value = !1 : e = !1)
            }, null, 40, ct), [
                [$, s(A)]
            ]), s(e) || s(g) ? (P(), B("ul", nt, [(P(!0), B(ci, null, Mi(s(o), (H, I) => (P(), B("li", {
                key: H,
                onClick: C => T(H),
                onMouseover: F[3] || (F[3] = C => ti(g) ? g.value = !0 : g = !0),
                onMouseleave: F[4] || (F[4] = C => ti(g) ? g.value = !1 : g = !1),
                style: zl({
                    width: N.width != null ? `${N.width}vw` : "inherit"
                })
            }, [N.displayText != null ? (P(), B("div", st, [I == s(n) ? (P(), B("p", At, D(N.displayText(H)), 1)) : (P(), B("p", et, D(N.displayText(H)), 1))])) : (P(), B("div", gt, [I == s(n) ? (P(), B("p", tt, D(H), 1)) : (P(), B("p", Rt, D(H), 1))]))], 44, ot))), 128))])) : _("", !0)]))
        }
    }),
    tc = ml(Et, [
        ["__scopeId", "data-v-89367af4"]
    ]),
    Ii = i => (dc("data-v-87231742"), i = i(), Mc(), i),
    It = {
        class: "nav"
    },
    rt = {
        class: "logowrap"
    },
    St = Ii(() => R("a", {
        href: "/fsm/",
        class: "logo"
    }, "FSM by FormicAcid", -1)),
    Tt = {
        class: "version"
    },
    Nt = Ii(() => R("a", {
        href: "https://discord.gg/8tSu4ewdsM",
        class: "version dc",
        target: "_blank"
    }, "Discord", -1)),
    Ot = {
        class: "top"
    },
    Lt = {
        class: "id"
    },
    Ct = {
        key: 0,
        class: "all"
    },
    ut = {
        class: "acftList"
    },
    ft = Ii(() => R("h1", null, "Arriving", -1)),
    dt = {
        class: "list"
    },
    Mt = {
        class: "acft"
    },
    Pt = {
        class: "acftList"
    },
    Gt = Ii(() => R("h1", null, "Departing", -1)),
    Dt = {
        class: "list"
    },
    Ht = {
        class: "acft"
    },
    Ut = {
        class: "acftList"
    },
    Bt = Ii(() => R("h1", null, "VFR", -1)),
    pt = {
        class: "list"
    },
    Ft = {
        class: "acft"
    },
    ht = {
        class: "acftList"
    },
    Vt = Ii(() => R("h1", null, "Other Traffic", -1)),
    Kt = {
        class: "list"
    },
    mt = {
        class: "acft"
    },
    Yt = {
        key: 1,
        class: "vflex body"
    },
    Wt = Ii(() => R("h1", null, "General Information", -1)),
    yt = {
        class: "nomarg"
    },
    Jt = Ii(() => R("h1", null, "Runway Information", -1)),
    Xt = {
        class: "nomarg"
    },
    vt = {
        class: "nomarg"
    },
    wt = {
        class: "nomarg"
    },
    _t = Ii(() => R("p", {
        class: "nomarg"
    }, null, -1)),
    bt = {
        class: "nomarg"
    },
    Zt = {
        class: "nomarg"
    },
    kt = {
        class: "nomarg"
    },
    xt = Ii(() => R("p", {
        class: "nomarg"
    }, null, -1)),
    $t = Ii(() => R("h1", null, "Communication Information", -1)),
    Qt = {
        class: "nomarg"
    },
    qt = {
        key: 2,
        class: "hflex"
    },
    jt = {
        key: 3,
        class: "vflex body sett"
    },
    zt = Ii(() => R("h1", null, "Room Settings", -1)),
    iR = Ii(() => R("p", null, "Flight Plan Lifetime (Minutes)", -1)),
    lR = Ii(() => R("h1", null, "Personal Settings", -1)),
    aR = ["checked"],
    cR = Ii(() => R("p", null, "Parse Callsigns to ICAO", -1)),
    nR = ["checked"],
    oR = Ii(() => R("p", null, "Display Top Down ACFT in Arriving/Departing/VFR", -1)),
    sR = Ii(() => R("h1", null, "Keyboard Shortcuts", -1)),
    AR = Ii(() => R("p", null, "'r' in Squawk Field: Random Squawk Code", -1)),
    eR = Ii(() => R("p", null, "CTRL Click Hide: Skip Popup", -1)),
    gR = Ii(() => R("p", null, "Hover over Strip + 'X': delete strip", -1)),
    tR = {
        key: 4,
        class: "vflex body"
    },
    RR = {
        key: 1,
        class: "split"
    },
    ER = {
        key: 2,
        class: "split"
    },
    IR = ["checked"],
    rR = Ii(() => R("p", null, "SID", -1)),
    SR = ["checked"],
    TR = Ii(() => R("p", null, "Climb Via SID", -1)),
    NR = {
        id: "sids"
    },
    OR = ["value"],
    LR = {
        key: 6,
        readonly: ""
    },
    CR = {
        key: 5,
        class: "body vflex"
    },
    uR = {
        class: "twrap"
    },
    fR = Kl({
        __name: "List",
        setup(i) {
            let l = ii(0);

            function a() {
                return To.sort((K, S) => K.icao.localeCompare(S.icao)).filter(K => K.callsign.trim().includes(Hi.search.trim().toUpperCase()) || K.icao.trim().includes(Hi.search.trim().toUpperCase()) || Hi.search.trim() == "")
            }

            function c() {
                return V.acft == null ? "" : V.acft.departing == gi() ? (V.aircraft = V.acft.callsign, V.acft.callsign) : ""
            }

            function o(K) {
                let S = {
                    id: "-1",
                    roomSecret: pi()
                };
                K == "pdc_aircraft" && (S.pdc_aircraft = V.aircraft), K == "pdc_sid" && (S.pdc_sid = V.sid), K == "pdc_sids" && (S.pdc_sids = V.sids), K == "pdc_viaSID" && (S.pdc_viaSID = V.viaSID), Zl(S)
            }

            function A(K) {
                ua({
                    id: V.acft.id,
                    selectionType: K
                })
            }

            function e() {
                V.acft.squawk.toLowerCase() == "r" && (V.acft.squawk = `${Math.floor(Math.random() * 8)}${Math.floor(Math.random() * 8)}${Math.floor(Math.random() * 8)}${Math.floor(Math.random() * 8)}`), T(V.acft, "squawk")
            }

            function g() {
                return V.viaSID && V.sids ? V.acft.a_alt != "" ? `CLIMB VIA SID, EXCEPT MAINTAIN ${V.acft.a_alt}` : "CLIMB VIA SID" : `MAINTAIN ${V.acft.a_alt}`
            }

            function n(K) {
                let S = Ac();
                S != null && S.id == V.acft.id && S.selectionType == K && ua(null)
            }

            function O() {
                V.acft.squawk = `${Math.floor(Math.random() * 8)}${Math.floor(Math.random() * 8)}${Math.floor(Math.random() * 8)}${Math.floor(Math.random() * 8)}`, T(V.acft, "squawk")
            }
            let T = (K, S) => {
                let L = {
                    id: K.id,
                    roomSecret: pi()
                };
                return S == "acft" && (L.type = K.type), S == "alt" && (L.altitude = K.altitude), S == "arriving" && (L.arriving = K.arriving), S == "callsign" && (L.callsign = K.callsign), S == "departing" && (L.departing = K.departing), S == "free" && (L.free = K.free), S == "gate" && (L.gate = K.gate), S == "route" && (L.route = K.route), S == "runway" && (L.runway = K.runway), S == "squawk" && (L.squawk = K.squawk), S == "status" && (L.status = K.status), S == "a_alt" && (L.a_alt = K.a_alt), S == "a_hdg" && (L.a_hdg = K.a_hdg), Zl(L), K
            };

            function t() {
                let K = [];
                return Ri(gi()).runwayInfo.forEach(S => {
                    K.push(S.name1), K.push(S.name2)
                }), K.sort((S, L) => S.localeCompare(L))
            }

            function N() {
                var K;
                return (((K = Ri(gi()).chartPacks.find(S => S.author == xA())) == null ? void 0 : K.sids) ?? []).filter(S => S.runways.includes(V.acft.runway))
            }

            function F() {
                return ui.value ? l.value >= 1 ? "shown" : "" : l.value >= 1 ? "hidden" : "noanim"
            }

            function H() {
                alert("Just No")
            }

            function I(K) {
                let S = K + "=",
                    v = decodeURIComponent(document.cookie).split(";");
                for (let Si = 0; Si < v.length; Si++) {
                    let ji = v[Si];
                    for (; ji.charAt(0) == " ";) ji = ji.substring(1);
                    if (ji.indexOf(S) == 0) return ji.substring(S.length, ji.length)
                }
                return ""
            }

            function C(K, S) {
                document.cookie = K + "=" + S + ";path=/"
            }
            let Ai = I("sideBarOpen");
            Ai == "" && C("sideBarOpen", "false");
            let li = ii(),
                ni = I("call");
            ni == "" ? (C("call", !0), li.value = !0) : li.value = ni == "true";
            let y = ii();
            ni = I("td"), ni == "" ? (C("td", !0), y.value = !0) : y.value = ni == "true";
            let ui = ii(Ai == "true"),
                ei = ii(I("tab"));
            ei.value == "" && (C("tab", "FSM"), window.location.reload());

            function sl() {
                ui.value = !ui.value, C("sideBarOpen", "" + ui.value), l.value++
            }

            function fi(K) {
                ei.value = K, C("tab", K)
            }

            function Yl() {
                li.value = !li.value, C("call", li.value)
            }

            function ki() {
                y.value = !y.value, C("td", y.value)
            }
            let b = ii([]),
                V = al({
                    sids: !1,
                    runway: t()[0],
                    viaSID: !0,
                    aircraft: "",
                    acft: b.value[0],
                    sid: ""
                });
            async function Al() {
                (await zA()).forEach(S => {
                    let L = b.value.find(v => v.id == S.id);
                    if (L == null) vA() < 1 ? b.value.push(S) : (b.value.splice(0, 0, S), location.reload());
                    else {
                        let v = Ac() ?? {
                                id: -15,
                                selectionType: "acft"
                            },
                            Si = b.value.indexOf(L);
                        L.altitude != S.altitude && !(v.selectionType == "alt" && v.id == S.id) && (b.value[Si].altitude = S.altitude), L.arriving != S.arriving && !(v.selectionType == "arriving" && v.id == S.id) && (b.value[Si].arriving = S.arriving), L.callsign != S.callsign && !(v.selectionType == "callsign" && v.id == S.id) && (b.value[Si].callsign = S.callsign), L.departing != S.departing && !(v.selectionType == "departing" && v.id == S.id) && (b.value[Si].departing = S.departing), L.free != S.free && !(v.selectionType == "free" && v.id == S.id) && (b.value[Si].free = S.free), L.gate != S.gate && !(v.selectionType == "gate" && v.id == S.id) && (b.value[Si].gate = S.gate), L.route != S.route && !(v.selectionType == "route" && v.id == S.id) && (b.value[Si].route = S.route), L.runway != S.runway && !(v.selectionType == "runway" && v.id == S.id) && (b.value[Si].runway = S.runway), L.squawk != S.squawk && !(v.selectionType == "squawk" && v.id == S.id) && (b.value[Si].squawk = S.squawk), L.status != S.status && !(v.selectionType == "status" && v.id == S.id) && (b.value[Si].status = S.status), L.type != S.type && !(v.selectionType == "acft" && v.id == S.id) && (b.value[Si].type = S.type), L.a_alt != S.a_alt && !(v.selectionType == "a_alt" && v.id == S.id) && (b.value[Si].a_alt = S.a_alt), L.a_hdg != S.a_hdg && !(v.selectionType == "a_hdg" && v.id == S.id) && (b.value[Si].a_hdg = S.a_hdg), L.hidden != S.hidden && (b.value[Si].hidden = S.hidden)
                    }
                }), wA()
            }
            setInterval(Al, 1e3), Al();

            function Wl(K) {
                let S = {
                    id: "-1",
                    roomSecret: pi()
                };
                K == "fpLifetime" && (S.flightPlanlifetime = ri.fpLifetime), K == "parseCallsigns" && (S.parseCallsigns = ri.parseCallsigns), Zl(S)
            }
            async function yl() {
                let K = await le(),
                    S = await ie();
                Object.keys(K).forEach(L => {
                    ri[L] = K[L]
                }), Object.keys(S).forEach(L => {
                    L != null && (L == "aircraft" ? ((b.value.find(() => S[L]) ?? b.value[0]).departing == gi() && (V.aircraft = S.aircraft), V.acft = b.value.find(v => v.callsign == S[L]) ?? b.value[0]) : V[L] = S[L])
                })
            }
            setInterval(yl, 2500), yl();
            let ri = al({
                    fpLifetime: 120,
                    parseCallsigns: !0
                }),
                q = ii([]);
            async function j() {
                let K = await No();
                Object.keys(K).forEach(S => {
                    S == "chartAuthor" && ec(K[S]), S == "towerFrequency" && gc(K[S]), S == "topDownText" && (q.value = K[S].split(", "))
                })
            }
            j();
            let Hi = al({
                search: ""
            });
            return (K, S) => (P(), B(ci, null, [R("div", {
                class: Ki(["sidebar", F()])
            }, [R("p", {
                class: Ki(s(ei) == "FSM" || s(ei) == "" || s(ei) == null || s(ei) == null ? "active" : ""),
                onClick: S[0] || (S[0] = L => fi("FSM"))
            }, "Flight Strip Manager", 2), R("p", {
                class: Ki(s(ei) == "ATIS" ? "active" : ""),
                onClick: S[1] || (S[1] = L => fi("ATIS"))
            }, "ATIS", 2), R("p", {
                class: Ki(s(ei) == "PDC" ? "active" : ""),
                onClick: S[2] || (S[2] = L => fi("PDC"))
            }, "PDC", 2), R("p", {
                class: Ki(s(ei) == "INFO" ? "active" : ""),
                onClick: S[3] || (S[3] = L => fi("INFO"))
            }, "Airport Information", 2), R("p", {
                class: Ki(s(ei) == "CALL" ? "active" : ""),
                onClick: S[4] || (S[4] = L => fi("CALL"))
            }, "Callsign Table", 2), R("p", {
                class: Ki(s(ei) == "SETT" ? "active" : ""),
                onClick: S[5] || (S[5] = L => fi("SETT"))
            }, "Settings", 2)], 2), R("div", It, [R("div", rt, [St, R("p", Tt, "v" + D(s(qA)), 1)]), Nt, R("div", Ot, [R("p", Lt, "Room ID: " + D(s(_A)()), 1)]), R("img", {
                src: XA,
                onClick: sl,
                class: "hamburger"
            })]), s(ei) == "FSM" ? (P(), B("div", Ct, [R("div", ut, [ft, R("div", dt, [(P(!0), B(ci, null, Mi(s(b), (L, v) => (P(), B("div", Mt, [L.arriving == s(gi)() && L.flightRules == "IFR" && !L.hidden ? (P(), wi(Rl, {
                key: 0,
                aircraft: L,
                type: "inbound"
            }, null, 8, ["aircraft"])) : _("", !0), s(q).includes(L.arriving) && L.flightRules == "IFR" && !L.hidden && s(y) ? (P(), wi(Rl, {
                key: 1,
                aircraft: L,
                type: "inbound_td"
            }, null, 8, ["aircraft"])) : _("", !0)]))), 256))])]), R("div", Pt, [Gt, R("div", Dt, [(P(!0), B(ci, null, Mi(s(b), (L, v) => (P(), B("div", Ht, [L.departing == s(gi)() && L.flightRules == "IFR" && !L.hidden ? (P(), wi(Rl, {
                key: 0,
                aircraft: L,
                type: "outbound"
            }, null, 8, ["aircraft"])) : _("", !0), s(q).includes(L.departing) && L.flightRules == "IFR" && !L.hidden && s(y) ? (P(), wi(Rl, {
                key: 1,
                aircraft: L,
                type: "outbound_td"
            }, null, 8, ["aircraft"])) : _("", !0)]))), 256))])]), R("div", Ut, [Bt, R("div", pt, [(P(!0), B(ci, null, Mi(s(b), (L, v) => (P(), B("div", Ft, [(L.departing == s(gi)() || L.arriving == s(gi)()) && L.flightRules == "VFR" && !L.hidden ? (P(), wi(Rl, {
                key: 0,
                aircraft: L,
                type: "vfr"
            }, null, 8, ["aircraft"])) : _("", !0), (s(q).includes(L.departing) || s(q).includes(L.arriving)) && L.flightRules == "VFR" && !L.hidden && s(y) ? (P(), wi(Rl, {
                key: 1,
                aircraft: L,
                type: "vfr_td"
            }, null, 8, ["aircraft"])) : _("", !0)]))), 256))])]), R("div", ht, [Vt, R("div", Kt, [(P(!0), B(ci, null, Mi(s(b), (L, v) => (P(), B("div", mt, [L.departing != s(gi)() && L.arriving != s(gi)() && !L.hidden && !((s(q).includes(L.departing) || s(q).includes(L.arriving)) && s(y)) ? (P(), wi(Rl, {
                key: 0,
                aircraft: L,
                type: "overflying"
            }, null, 8, ["aircraft"])) : _("", !0)]))), 256))])])])) : _("", !0), s(ei) == "INFO" ? (P(), B("div", Yt, [Wt, (P(!0), B(ci, null, Mi(s(Ri)(s(gi)()).generalInfo.split(`
`), L => (P(), B("p", yt, D(L), 1))), 256)), Jt, (P(!0), B(ci, null, Mi(s(Ri)(s(gi)()).runwayInfo, L => (P(), B("div", null, [R("p", Xt, "Runway: " + D(L.name1), 1), R("p", vt, "Length: " + D(L.length) + " ft", 1), R("p", wt, "Surface Type: " + D(L.type), 1), _t]))), 256)), (P(!0), B(ci, null, Mi(s(Ri)(s(gi)()).runwayInfo, L => (P(), B("div", null, [R("p", bt, "Runway: " + D(L.name2), 1), R("p", Zt, "Length: " + D(L.length) + " ft", 1), R("p", kt, "Surface Type: " + D(L.type), 1), xt]))), 256)), $t, (P(!0), B(ci, null, Mi(s(Ri)(s(gi)()).commsInfo.split(`
`), L => (P(), B("p", Qt, D(L), 1))), 256))])) : _("", !0), s(ei) == "ATIS" ? (P(), B("div", qt, [Bi(at)])) : _("", !0), s(ei) == "SETT" ? (P(), B("div", jt, [zt, R("div", null, [iR, k(R("input", {
                type: "number",
                "onUpdate:modelValue": S[6] || (S[6] = L => s(ri).fpLifetime = L),
                onChange: S[7] || (S[7] = L => Wl("fpLifetime")),
                class: "setting"
            }, null, 544), [
                [$, s(ri).fpLifetime]
            ])]), lR, R("button", {
                class: "setting",
                onClick: H
            }, "Enable Light Mode"), R("div", {
                onClick: S[8] || (S[8] = L => Yl()),
                class: "hflex nosel point"
            }, [R("input", {
                type: "checkbox",
                checked: s(li)
            }, null, 8, aR), cR]), R("div", {
                onClick: S[9] || (S[9] = L => ki()),
                class: "hflex nosel point"
            }, [R("input", {
                type: "checkbox",
                checked: s(y)
            }, null, 8, nR), oR]), sR, AR, eR, gR])) : _("", !0), s(ei) == "PDC" ? (P(), B("div", tR, [Bi(tc, {
                placeholder: "Aircraft",
                items: s(b).filter(L => L.departing == s(gi)() && L.flightRules == "IFR" && !L.hidden).map(L => L.callsign),
                onChange: S[10] || (S[10] = L => {
                    s(V).aircraft = L, s(V).acft = s(b).find(v => v.callsign == s(V).aircraft) ?? s(b)[0], o("pdc_aircraft")
                }),
                value: c()
            }, null, 8, ["items", "value"]), s(V).aircraft != "" ? (P(), wi(tc, {
                key: 0,
                placeholder: "Runway",
                items: t(),
                onChange: S[11] || (S[11] = L => {
                    s(V).runway = L, s(V).acft.runway = L, s(T)(s(V).acft, "runway")
                }),
                value: s(V).acft == null ? t()[0] : s(V).acft.runway ?? t()[0]
            }, null, 8, ["items", "value"])) : _("", !0), s(V).aircraft != "" ? (P(), B("div", RR, [k(R("input", {
                type: "text",
                placeholder: "Squawk",
                "onUpdate:modelValue": S[12] || (S[12] = L => s(V).acft.squawk = L),
                onChange: S[13] || (S[13] = L => {
                    s(T)(s(V).acft, "squawk"), e()
                }),
                onFocus: S[14] || (S[14] = L => A("squawk")),
                onBlur: S[15] || (S[15] = L => n("squawk")),
                onKeyup: e
            }, null, 544), [
                [$, s(V).acft.squawk]
            ]), R("button", {
                onClick: S[16] || (S[16] = L => {
                    O(), A("squawk")
                })
            }, "Random Squawk")])) : _("", !0), s(V).aircraft != "" ? (P(), B("div", ER, [k(R("input", {
                type: "text",
                placeholder: "Altitude",
                "onUpdate:modelValue": S[17] || (S[17] = L => s(V).acft.a_alt = L),
                onChange: S[18] || (S[18] = L => s(T)(s(V).acft, "a_alt")),
                onFocus: S[19] || (S[19] = L => A("a_alt")),
                onBlur: S[20] || (S[20] = L => n("a_alt"))
            }, null, 544), [
                [$, s(V).acft.a_alt]
            ]), k(R("input", {
                type: "text",
                placeholder: "Heading",
                "onUpdate:modelValue": S[21] || (S[21] = L => s(V).acft.a_hdg = L),
                onChange: S[22] || (S[22] = L => s(T)(s(V).acft, "a_hdg")),
                onFocus: S[23] || (S[23] = L => A("a_hdg")),
                onBlur: S[24] || (S[24] = L => n("a_hdg"))
            }, null, 544), [
                [$, s(V).acft.a_hdg]
            ])])) : _("", !0), s(V).aircraft != "" ? (P(), B("div", {
                key: 3,
                class: "hflex nosel",
                onClick: S[25] || (S[25] = L => {
                    s(V).sids = !s(V).sids, o("pdc_sids")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(V).sids
            }, null, 8, IR), rR])) : _("", !0), s(V).sids ? (P(), B("div", {
                key: 4,
                class: "hflex nosel",
                onClick: S[26] || (S[26] = L => {
                    s(V).viaSID = !s(V).viaSID, o("pdc_viaSID")
                })
            }, [R("input", {
                type: "checkbox",
                checked: s(V).viaSID
            }, null, 8, SR), TR])) : _("", !0), s(V).sids ? k((P(), B("input", {
                key: 5,
                type: "text",
                placeholder: "SID",
                list: "sids",
                "onUpdate:modelValue": S[27] || (S[27] = L => s(V).sid = L),
                onChange: S[28] || (S[28] = L => o("pdc_sid"))
            }, null, 544)), [
                [$, s(V).sid]
            ]) : _("", !0), R("datalist", NR, [(P(!0), B(ci, null, Mi(N(), L => (P(), B("option", {
                value: L.name
            }, null, 8, OR))), 256))]), s(V).aircraft != "" ? (P(), B("textarea", LR, `ACARS BEGIN\r
\r
` + D(new Date().getUTCDate().toString().padStart(2, "0")) + "/" + D((new Date().getUTCMonth() + 1).toString().padStart(2, "0")) + "/" + D(new Date().getUTCFullYear() - 2e3) + "          " + D(new Date().getUTCHours().toString().padStart(2, "0")) + ":" + D(new Date().getUTCMinutes().toString().padStart(2, "0")) + ":" + D(new Date().getUTCSeconds().toString().padStart(2, "0")) + `\r
\r
FLIGHT ` + D(s(V).aircraft) + " " + D(s(V).acft.departing) + " " + D(s(V).acft.arriving) + `\r
XPDR ` + D(s(V).acft.squawk) + `\r
\r
PDC\r
` + D(s(V).sids ? `CLEARED ${s(V).sid} DEP` : `CLEARED HDG ${s(V).acft.a_hdg}`) + `\r
` + D(g()) + `\r
DEP CONTROL ` + D(s($A)()) + `\r
\r
END OF MESSAGE\r
ACARS END`, 1)) : _("", !0)])) : _("", !0), s(ei) == "CALL" ? (P(), B("div", CR, [k(R("input", {
                type: "text",
                placeholder: "Search...",
                "onUpdate:modelValue": S[29] || (S[29] = L => s(Hi).search = L)
            }, null, 512), [
                [$, s(Hi).search]
            ]), R("div", uR, [R("table", null, [R("tbody", null, [(P(!0), B(ci, null, Mi(a(), L => (P(), B("tr", null, [R("td", null, D(L.icao), 1), R("td", null, D(L.callsign), 1)]))), 256))])])])])) : _("", !0)], 64))
        }
    }),
    dR = ml(fR, [
        ["__scopeId", "data-v-87231742"]
    ]),
    Va = i => (dc("data-v-9d57b60f"), i = i(), Mc(), i),
    MR = {
        key: 0,
        class: "offline"
    },
    PR = Va(() => R("p", null, "loading...", -1)),
    GR = [PR],
    DR = {
        key: 1,
        class: "offline"
    },
    HR = Va(() => R("h1", null, "The FSM is currently offline.", -1)),
    UR = [HR],
    BR = {
        key: 2,
        class: "rooms"
    },
    pR = {
        class: "login"
    },
    FR = Va(() => R("h1", null, "Create Room", -1)),
    hR = {
        key: 0
    },
    VR = {
        class: "create"
    },
    KR = Va(() => R("h1", null, "Join Room", -1)),
    mR = {
        key: 0
    },
    YR = Kl({
        __name: "App",
        setup(i) {
            let l = ii(!1),
                a = ii(!1);
            ii(!1), ii(!1);
            let c = al({
                password: "",
                password2: "",
                id: "",
                status1: "",
                status2: "",
                airport: ""
            });

            function o() {
                var e;
                if (c.airport == "") {
                    c.status1 = "You need to provide an Airport";
                    return
                }
                fetch(Gi.value + "/createRoom", {
                    method: "POST",
                    body: JSON.stringify({
                        airport: c.airport,
                        password: c.password,
                        user_secret: (e = Sn()) == null ? void 0 : e.secret
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }).then(g => {
                    g.status == 200 ? g.json().then(n => {
                        ba(n.secret), ka(n.airport), Za(n.id), window.location.href = `https://awdev1.github.io/fsm/?secret=${n.secret}`
                    }) : fetch(Gi.value + "/ping").then(n => {
                        Fi.value = n.status == 200
                    })
                })
            }

            function A() {
                var e;
                fetch(Gi.value + "/loginRoom", {
                    method: "POST",
                    body: JSON.stringify({
                        id: c.id,
                        password: c.password2,
                        user_secret: (e = Sn()) == null ? void 0 : e.secret
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }).then(g => {
                    g.status == 200 ? g.json().then(n => {
                        ba(n.secret), ka(n.airport), Za(n.id), window.location.href = `https://awdev1.github.io/fsm/?secret=${n.secret}`
                    }) : c.status2 = "Incorrect Room ID or Password"
                })
            }
            return ga(Gi, () => {
                fetch(Gi.value + "/ping").then(e => {
                    if (Fi.value = e.status == 200, Fi.value) {
                        let g = new URLSearchParams(document.location.search).get("secret");
                        g != null ? fetch(Gi.value + "/check", {
                            method: "POST",
                            body: JSON.stringify({
                                roomSecret: g
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420"
                            }
                        }).then(O => {
                            O.status == 200 ? O.json().then(T => {
                                l.value = !0, ba(T.secret), ka(T.airport), Za(T.id), a.value = !0
                            }) : O.status == 404 ? location.href = "https://awdev1.github.io/fsm/" : l.value = !1
                        }) : a.value = !0;
                        let n = new URLSearchParams(document.location.search).get("code");
                        n != null && fetch(Gi.value + "/login", {
                            method: "POST",
                            body: JSON.stringify({
                                code: n
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420"
                            }
                        })
                    } else a.value = !0
                }).catch(() => {
                    Fi.value = !1, a.value = !0
                })
            }), document.addEventListener("keypress", e => {
                e.key == "x" && l.value && a.value && Fi.value && Oo({
                    id: bA(),
                    roomSecret: pi()
                })
            }), (e, g) => (P(), B(ci, null, [s(a) ? s(Fi) ? _("", !0) : (P(), B("div", DR, UR)) : (P(), B("div", MR, GR)), !s(l) && s(Fi) && s(a) ? (P(), B("div", BR, [R("div", pR, [FR, Bi(tc, {
                placeholder: "Airport",
                "display-text": n => s(Ri)(n).friendlyName,
                items: s(Lo)().map(n => n.code),
                onChange: g[0] || (g[0] = n => s(c).airport = n)
            }, null, 8, ["display-text", "items"]), k(R("input", {
                type: "password",
                "onUpdate:modelValue": g[1] || (g[1] = n => s(c).password = n),
                placeholder: "Password"
            }, null, 512), [
                [$, s(c).password]
            ]), R("button", {
                onClick: o
            }, "Create Room"), s(c).status1 ? (P(), B("p", hR, D(s(c).status1), 1)) : _("", !0)]), R("div", VR, [KR, k(R("input", {
                type: "text",
                "onUpdate:modelValue": g[2] || (g[2] = n => s(c).id = n),
                placeholder: "Room ID"
            }, null, 512), [
                [$, s(c).id]
            ]), k(R("input", {
                type: "password",
                "onUpdate:modelValue": g[3] || (g[3] = n => s(c).password2 = n),
                placeholder: "Password"
            }, null, 512), [
                [$, s(c).password2]
            ]), R("button", {
                onClick: A
            }, "Join Room"), s(c).status2 ? (P(), B("p", mR, D(s(c).status2), 1)) : _("", !0)])])) : _("", !0), s(l) && s(Fi) && s(a) ? (P(), wi(dR, {
                key: 3
            })) : _("", !0)], 64))
        }
    }),
    WR = ml(YR, [
        ["__scopeId", "data-v-9d57b60f"]
    ]);
yA(WR).mount("#app");
