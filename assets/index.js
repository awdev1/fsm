(function() {
    const l = document.createElement("link").relList;
    if (l && l.supports && l.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) c(n);
    new MutationObserver(n => {
        for (const A of n)
            if (A.type === "childList")
                for (const g of A.addedNodes) g.tagName === "LINK" && g.rel === "modulepreload" && c(g)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function a(n) {
        const A = {};
        return n.integrity && (A.integrity = n.integrity), n.referrerPolicy && (A.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? A.credentials = "include" : n.crossOrigin === "anonymous" ? A.credentials = "omit" : A.credentials = "same-origin", A
    }

    function c(n) {
        if (n.ep) return;
        n.ep = !0;
        const A = a(n);
        fetch(n.href, A)
    }
})();

function Ec(i, l) {
    const a = Object.create(null),
        c = i.split(",");
    for (let n = 0; n < c.length; n++) a[c[n]] = !0;
    return l ? n => !!a[n.toLowerCase()] : n => !!a[n]
}
const Ai = {},
    Ml = [],
    ki = () => {},
    fo = () => !1,
    Ma = i => i.charCodeAt(0) === 111 && i.charCodeAt(1) === 110 && (i.charCodeAt(2) > 122 || i.charCodeAt(2) < 97),
    Ic = i => i.startsWith("onUpdate:"),
    Li = Object.assign,
    rc = (i, l) => {
        const a = i.indexOf(l);
        a > -1 && i.splice(a, 1)
    },
    Mo = Object.prototype.hasOwnProperty,
    Q = (i, l) => Mo.call(i, l),
    X = Array.isArray,
    Pl = i => ia(i) === "[object Map]",
    Pa = i => ia(i) === "[object Set]",
    mc = i => ia(i) === "[object Date]",
    b = i => typeof i == "function",
    Ni = i => typeof i == "string",
    ol = i => typeof i == "symbol",
    ei = i => i !== null && typeof i == "object",
    Tn = i => (ei(i) || b(i)) && b(i.then) && b(i.catch),
    Nn = Object.prototype.toString,
    ia = i => Nn.call(i),
    Po = i => ia(i).slice(8, -1),
    On = i => ia(i) === "[object Object]",
    Sc = i => Ni(i) && i !== "NaN" && i[0] !== "-" && "" + parseInt(i, 10) === i,
    ga = Ec(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    Ga = i => {
        const l = Object.create(null);
        return a => l[a] || (l[a] = i(a))
    },
    Go = /-(\w)/g,
    Ul = Ga(i => i.replace(Go, (l, a) => a ? a.toUpperCase() : "")),
    Do = /\B([A-Z])/g,
    hl = Ga(i => i.replace(Do, "-$1").toLowerCase()),
    Ln = Ga(i => i.charAt(0).toUpperCase() + i.slice(1)),
    Wa = Ga(i => i ? `on${Ln(i)}` : ""),
    Ll = (i, l) => !Object.is(i, l),
    ta = (i, l) => {
        for (let a = 0; a < i.length; a++) i[a](l)
    },
    Sa = (i, l, a) => {
        Object.defineProperty(i, l, {
            configurable: !0,
            enumerable: !1,
            value: a
        })
    },
    Ta = i => {
        const l = parseFloat(i);
        return isNaN(l) ? i : l
    };
let Yc;
const Qa = () => Yc || (Yc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function la(i) {
    if (X(i)) {
        const l = {};
        for (let a = 0; a < i.length; a++) {
            const c = i[a],
                n = Ni(c) ? po(c) : la(c);
            if (n)
                for (const A in n) l[A] = n[A]
        }
        return l
    } else if (Ni(i) || ei(i)) return i
}
const Ho = /;(?![^(]*\))/g,
    Uo = /:([^]+)/,
    Bo = /\/\*[^]*?\*\//g;

function po(i) {
    const l = {};
    return i.replace(Bo, "").split(Ho).forEach(a => {
        if (a) {
            const c = a.split(Uo);
            c.length > 1 && (l[c[0].trim()] = c[1].trim())
        }
    }), l
}

function Ki(i) {
    let l = "";
    if (Ni(i)) l = i;
    else if (X(i))
        for (let a = 0; a < i.length; a++) {
            const c = Ki(i[a]);
            c && (l += c + " ")
        } else if (ei(i))
            for (const a in i) i[a] && (l += a + " ");
    return l.trim()
}
const Fo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    ho = Ec(Fo);

function Cn(i) {
    return !!i || i === ""
}

function Vo(i, l) {
    if (i.length !== l.length) return !1;
    let a = !0;
    for (let c = 0; a && c < i.length; c++) a = Da(i[c], l[c]);
    return a
}

function Da(i, l) {
    if (i === l) return !0;
    let a = mc(i),
        c = mc(l);
    if (a || c) return a && c ? i.getTime() === l.getTime() : !1;
    if (a = ol(i), c = ol(l), a || c) return i === l;
    if (a = X(i), c = X(l), a || c) return a && c ? Vo(i, l) : !1;
    if (a = ei(i), c = ei(l), a || c) {
        if (!a || !c) return !1;
        const n = Object.keys(i).length,
            A = Object.keys(l).length;
        if (n !== A) return !1;
        for (const g in i) {
            const e = i.hasOwnProperty(g),
                o = l.hasOwnProperty(g);
            if (e && !o || !e && o || !Da(i[g], l[g])) return !1
        }
    }
    return String(i) === String(l)
}

function Ko(i, l) {
    return i.findIndex(a => Da(a, l))
}
const H = i => Ni(i) ? i : i == null ? "" : X(i) || ei(i) && (i.toString === Nn || !b(i.toString)) ? JSON.stringify(i, un, 2) : String(i),
    un = (i, l) => l && l.__v_isRef ? un(i, l.value) : Pl(l) ? {
        [`Map(${l.size})`]: [...l.entries()].reduce((a, [c, n], A) => (a[ya(c, A) + " =>"] = n, a), {})
    } : Pa(l) ? {
        [`Set(${l.size})`]: [...l.values()].map(a => ya(a))
    } : ol(l) ? ya(l) : ei(l) && !X(l) && !On(l) ? String(l) : l,
    ya = (i, l = "") => {
        var a;
        return ol(i) ? `Symbol(${(a=i.description)!=null?a:l})` : i
    };
let Vi;
class mo {
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
                const n = this.parent.scopes.pop();
                n && n !== this && (this.parent.scopes[this.index] = n, n.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function Yo(i, l = Vi) {
    l && l.active && l.effects.push(i)
}

function Wo() {
    return Vi
}
const Tc = i => {
        const l = new Set(i);
        return l.w = 0, l.n = 0, l
    },
    fn = i => (i.w & sl) > 0,
    dn = i => (i.n & sl) > 0,
    yo = ({
        deps: i
    }) => {
        if (i.length)
            for (let l = 0; l < i.length; l++) i[l].w |= sl
    },
    Jo = i => {
        const {
            deps: l
        } = i;
        if (l.length) {
            let a = 0;
            for (let c = 0; c < l.length; c++) {
                const n = l[c];
                fn(n) && !dn(n) ? n.delete(i) : l[a++] = n, n.w &= ~sl, n.n &= ~sl
            }
            l.length = a
        }
    },
    qa = new WeakMap;
let _l = 0,
    sl = 1;
const ja = 30;
let Yi;
const Nl = Symbol(""),
    za = Symbol("");
class Nc {
    constructor(l, a = null, c) {
        this.fn = l, this.scheduler = a, this.active = !0, this.deps = [], this.parent = void 0, Yo(this, c)
    }
    run() {
        if (!this.active) return this.fn();
        let l = Yi,
            a = al;
        for (; l;) {
            if (l === this) return;
            l = l.parent
        }
        try {
            return this.parent = Yi, Yi = this, al = !0, sl = 1 << ++_l, _l <= ja ? yo(this) : Wc(this), this.fn()
        } finally {
            _l <= ja && Jo(this), sl = 1 << --_l, Yi = this.parent, al = a, this.parent = void 0, this.deferStop && this.stop()
        }
    }
    stop() {
        Yi === this ? this.deferStop = !0 : this.active && (Wc(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function Wc(i) {
    const {
        deps: l
    } = i;
    if (l.length) {
        for (let a = 0; a < l.length; a++) l[a].delete(i);
        l.length = 0
    }
}
let al = !0;
const Mn = [];

function Vl() {
    Mn.push(al), al = !1
}

function Kl() {
    const i = Mn.pop();
    al = i === void 0 ? !0 : i
}

function Di(i, l, a) {
    if (al && Yi) {
        let c = qa.get(i);
        c || qa.set(i, c = new Map);
        let n = c.get(a);
        n || c.set(a, n = Tc()), Pn(n)
    }
}

function Pn(i, l) {
    let a = !1;
    _l <= ja ? dn(i) || (i.n |= sl, a = !fn(i)) : a = !i.has(Yi), a && (i.add(Yi), Yi.deps.push(i))
}

function qi(i, l, a, c, n, A) {
    const g = qa.get(i);
    if (!g) return;
    let e = [];
    if (l === "clear") e = [...g.values()];
    else if (a === "length" && X(i)) {
        const o = Number(c);
        g.forEach((L, S) => {
            (S === "length" || !ol(S) && S >= o) && e.push(L)
        })
    } else switch (a !== void 0 && e.push(g.get(a)), l) {
        case "add":
            X(i) ? Sc(a) && e.push(g.get("length")) : (e.push(g.get(Nl)), Pl(i) && e.push(g.get(za)));
            break;
        case "delete":
            X(i) || (e.push(g.get(Nl)), Pl(i) && e.push(g.get(za)));
            break;
        case "set":
            Pl(i) && e.push(g.get(Nl));
            break
    }
    if (e.length === 1) e[0] && ic(e[0]);
    else {
        const o = [];
        for (const L of e) L && o.push(...L);
        ic(Tc(o))
    }
}

function ic(i, l) {
    const a = X(i) ? i : [...i];
    for (const c of a) c.computed && yc(c);
    for (const c of a) c.computed || yc(c)
}

function yc(i, l) {
    (i !== Yi || i.allowRecurse) && (i.scheduler ? i.scheduler() : i.run())
}
const Xo = Ec("__proto__,__v_isRef,__isVue"),
    Gn = new Set(Object.getOwnPropertyNames(Symbol).filter(i => i !== "arguments" && i !== "caller").map(i => Symbol[i]).filter(ol)),
    Jc = vo();

function vo() {
    const i = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(l => {
        i[l] = function(...a) {
            const c = z(this);
            for (let A = 0, g = this.length; A < g; A++) Di(c, "get", A + "");
            const n = c[l](...a);
            return n === -1 || n === !1 ? c[l](...a.map(z)) : n
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(l => {
        i[l] = function(...a) {
            Vl();
            const c = z(this)[l].apply(this, a);
            return Kl(), c
        }
    }), i
}

function wo(i) {
    const l = z(this);
    return Di(l, "has", i), l.hasOwnProperty(i)
}
class Dn {
    constructor(l = !1, a = !1) {
        this._isReadonly = l, this._shallow = a
    }
    get(l, a, c) {
        const n = this._isReadonly,
            A = this._shallow;
        if (a === "__v_isReactive") return !n;
        if (a === "__v_isReadonly") return n;
        if (a === "__v_isShallow") return A;
        if (a === "__v_raw") return c === (n ? A ? as : pn : A ? Bn : Un).get(l) || Object.getPrototypeOf(l) === Object.getPrototypeOf(c) ? l : void 0;
        const g = X(l);
        if (!n) {
            if (g && Q(Jc, a)) return Reflect.get(Jc, a, c);
            if (a === "hasOwnProperty") return wo
        }
        const e = Reflect.get(l, a, c);
        return (ol(a) ? Gn.has(a) : Xo(a)) || (n || Di(l, "get", a), A) ? e : ti(e) ? g && Sc(a) ? e : e.value : ei(e) ? n ? Fn(e) : cl(e) : e
    }
}
class Hn extends Dn {
    constructor(l = !1) {
        super(!1, l)
    }
    set(l, a, c, n) {
        let A = l[a];
        if (!this._shallow) {
            const o = Bl(A);
            if (!Na(c) && !Bl(c) && (A = z(A), c = z(c)), !X(l) && ti(A) && !ti(c)) return o ? !1 : (A.value = c, !0)
        }
        const g = X(l) && Sc(a) ? Number(a) < l.length : Q(l, a),
            e = Reflect.set(l, a, c, n);
        return l === z(n) && (g ? Ll(c, A) && qi(l, "set", a, c) : qi(l, "add", a, c)), e
    }
    deleteProperty(l, a) {
        const c = Q(l, a);
        l[a];
        const n = Reflect.deleteProperty(l, a);
        return n && c && qi(l, "delete", a, void 0), n
    }
    has(l, a) {
        const c = Reflect.has(l, a);
        return (!ol(a) || !Gn.has(a)) && Di(l, "has", a), c
    }
    ownKeys(l) {
        return Di(l, "iterate", X(l) ? "length" : Nl), Reflect.ownKeys(l)
    }
}
class _o extends Dn {
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
const bo = new Hn,
    Zo = new _o,
    ko = new Hn(!0),
    Oc = i => i,
    Ha = i => Reflect.getPrototypeOf(i);

function ca(i, l, a = !1, c = !1) {
    i = i.__v_raw;
    const n = z(i),
        A = z(l);
    a || (Ll(l, A) && Di(n, "get", l), Di(n, "get", A));
    const {
        has: g
    } = Ha(n), e = c ? Oc : a ? uc : $l;
    if (g.call(n, l)) return e(i.get(l));
    if (g.call(n, A)) return e(i.get(A));
    i !== n && i.get(l)
}

function na(i, l = !1) {
    const a = this.__v_raw,
        c = z(a),
        n = z(i);
    return l || (Ll(i, n) && Di(c, "has", i), Di(c, "has", n)), i === n ? a.has(i) : a.has(i) || a.has(n)
}

function oa(i, l = !1) {
    return i = i.__v_raw, !l && Di(z(i), "iterate", Nl), Reflect.get(i, "size", i)
}

function Xc(i) {
    i = z(i);
    const l = z(this);
    return Ha(l).has.call(l, i) || (l.add(i), qi(l, "add", i, i)), this
}

function vc(i, l) {
    l = z(l);
    const a = z(this),
        {
            has: c,
            get: n
        } = Ha(a);
    let A = c.call(a, i);
    A || (i = z(i), A = c.call(a, i));
    const g = n.call(a, i);
    return a.set(i, l), A ? Ll(l, g) && qi(a, "set", i, l) : qi(a, "add", i, l), this
}

function wc(i) {
    const l = z(this),
        {
            has: a,
            get: c
        } = Ha(l);
    let n = a.call(l, i);
    n || (i = z(i), n = a.call(l, i)), c && c.call(l, i);
    const A = l.delete(i);
    return n && qi(l, "delete", i, void 0), A
}

function _c() {
    const i = z(this),
        l = i.size !== 0,
        a = i.clear();
    return l && qi(i, "clear", void 0, void 0), a
}

function sa(i, l) {
    return function(c, n) {
        const A = this,
            g = A.__v_raw,
            e = z(g),
            o = l ? Oc : i ? uc : $l;
        return !i && Di(e, "iterate", Nl), g.forEach((L, S) => c.call(n, o(L), o(S), A))
    }
}

function Aa(i, l, a) {
    return function(...c) {
        const n = this.__v_raw,
            A = z(n),
            g = Pl(A),
            e = i === "entries" || i === Symbol.iterator && g,
            o = i === "keys" && g,
            L = n[i](...c),
            S = a ? Oc : l ? uc : $l;
        return !l && Di(A, "iterate", o ? za : Nl), {
            next() {
                const {
                    value: t,
                    done: T
                } = L.next();
                return T ? {
                    value: t,
                    done: T
                } : {
                    value: e ? [S(t[0]), S(t[1])] : S(t),
                    done: T
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function il(i) {
    return function(...l) {
        return i === "delete" ? !1 : i === "clear" ? void 0 : this
    }
}

function xo() {
    const i = {
            get(A) {
                return ca(this, A)
            },
            get size() {
                return oa(this)
            },
            has: na,
            add: Xc,
            set: vc,
            delete: wc,
            clear: _c,
            forEach: sa(!1, !1)
        },
        l = {
            get(A) {
                return ca(this, A, !1, !0)
            },
            get size() {
                return oa(this)
            },
            has: na,
            add: Xc,
            set: vc,
            delete: wc,
            clear: _c,
            forEach: sa(!1, !0)
        },
        a = {
            get(A) {
                return ca(this, A, !0)
            },
            get size() {
                return oa(this, !0)
            },
            has(A) {
                return na.call(this, A, !0)
            },
            add: il("add"),
            set: il("set"),
            delete: il("delete"),
            clear: il("clear"),
            forEach: sa(!0, !1)
        },
        c = {
            get(A) {
                return ca(this, A, !0, !0)
            },
            get size() {
                return oa(this, !0)
            },
            has(A) {
                return na.call(this, A, !0)
            },
            add: il("add"),
            set: il("set"),
            delete: il("delete"),
            clear: il("clear"),
            forEach: sa(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(A => {
        i[A] = Aa(A, !1, !1), a[A] = Aa(A, !0, !1), l[A] = Aa(A, !1, !0), c[A] = Aa(A, !0, !0)
    }), [i, a, l, c]
}
const [$o, Qo, qo, jo] = xo();

function Lc(i, l) {
    const a = l ? i ? jo : qo : i ? Qo : $o;
    return (c, n, A) => n === "__v_isReactive" ? !i : n === "__v_isReadonly" ? i : n === "__v_raw" ? c : Reflect.get(Q(a, n) && n in c ? a : c, n, A)
}
const zo = {
        get: Lc(!1, !1)
    },
    is = {
        get: Lc(!1, !0)
    },
    ls = {
        get: Lc(!0, !1)
    },
    Un = new WeakMap,
    Bn = new WeakMap,
    pn = new WeakMap,
    as = new WeakMap;

function cs(i) {
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

function ns(i) {
    return i.__v_skip || !Object.isExtensible(i) ? 0 : cs(Po(i))
}

function cl(i) {
    return Bl(i) ? i : Cc(i, !1, bo, zo, Un)
}

function os(i) {
    return Cc(i, !1, ko, is, Bn)
}

function Fn(i) {
    return Cc(i, !0, Zo, ls, pn)
}

function Cc(i, l, a, c, n) {
    if (!ei(i) || i.__v_raw && !(l && i.__v_isReactive)) return i;
    const A = n.get(i);
    if (A) return A;
    const g = ns(i);
    if (g === 0) return i;
    const e = new Proxy(i, g === 2 ? c : a);
    return n.set(i, e), e
}

function Gl(i) {
    return Bl(i) ? Gl(i.__v_raw) : !!(i && i.__v_isReactive)
}

function Bl(i) {
    return !!(i && i.__v_isReadonly)
}

function Na(i) {
    return !!(i && i.__v_isShallow)
}

function hn(i) {
    return Gl(i) || Bl(i)
}

function z(i) {
    const l = i && i.__v_raw;
    return l ? z(l) : i
}

function Vn(i) {
    return Sa(i, "__v_skip", !0), i
}
const $l = i => ei(i) ? cl(i) : i,
    uc = i => ei(i) ? Fn(i) : i;

function Kn(i) {
    al && Yi && (i = z(i), Pn(i.dep || (i.dep = Tc())))
}

function mn(i, l) {
    i = z(i);
    const a = i.dep;
    a && ic(a)
}

function ti(i) {
    return !!(i && i.__v_isRef === !0)
}

function ci(i) {
    return ss(i, !1)
}

function ss(i, l) {
    return ti(i) ? i : new As(i, l)
}
class As {
    constructor(l, a) {
        this.__v_isShallow = a, this.dep = void 0, this.__v_isRef = !0, this._rawValue = a ? l : z(l), this._value = a ? l : $l(l)
    }
    get value() {
        return Kn(this), this._value
    }
    set value(l) {
        const a = this.__v_isShallow || Na(l) || Bl(l);
        l = a ? l : z(l), Ll(l, this._rawValue) && (this._rawValue = l, this._value = a ? l : $l(l), mn(this))
    }
}

function s(i) {
    return ti(i) ? i.value : i
}
const es = {
    get: (i, l, a) => s(Reflect.get(i, l, a)),
    set: (i, l, a, c) => {
        const n = i[l];
        return ti(n) && !ti(a) ? (n.value = a, !0) : Reflect.set(i, l, a, c)
    }
};

function Yn(i) {
    return Gl(i) ? i : new Proxy(i, es)
}
class gs {
    constructor(l, a, c, n) {
        this._setter = a, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Nc(l, () => {
            this._dirty || (this._dirty = !0, mn(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !n, this.__v_isReadonly = c
    }
    get value() {
        const l = z(this);
        return Kn(l), (l._dirty || !l._cacheable) && (l._dirty = !1, l._value = l.effect.run()), l._value
    }
    set value(l) {
        this._setter(l)
    }
}

function ts(i, l, a = !1) {
    let c, n;
    const A = b(i);
    return A ? (c = i, n = ki) : (c = i.get, n = i.set), new gs(c, n, A || !n, a)
}

function nl(i, l, a, c) {
    let n;
    try {
        n = c ? i(...c) : i()
    } catch (A) {
        Ua(A, l, a)
    }
    return n
}

function Xi(i, l, a, c) {
    if (b(i)) {
        const A = nl(i, l, a, c);
        return A && Tn(A) && A.catch(g => {
            Ua(g, l, a)
        }), A
    }
    const n = [];
    for (let A = 0; A < i.length; A++) n.push(Xi(i[A], l, a, c));
    return n
}

function Ua(i, l, a, c = !0) {
    const n = l ? l.vnode : null;
    if (l) {
        let A = l.parent;
        const g = l.proxy,
            e = a;
        for (; A;) {
            const L = A.ec;
            if (L) {
                for (let S = 0; S < L.length; S++)
                    if (L[S](i, g, e) === !1) return
            }
            A = A.parent
        }
        const o = l.appContext.config.errorHandler;
        if (o) {
            nl(o, null, 10, [i, g, e]);
            return
        }
    }
    Rs(i, a, n, c)
}

function Rs(i, l, a, c = !0) {
    console.error(i)
}
let Ql = !1,
    lc = !1;
const Ci = [];
let Zi = 0;
const Dl = [];
let Qi = null,
    Il = 0;
const Wn = Promise.resolve();
let fc = null;

function Es(i) {
    const l = fc || Wn;
    return i ? l.then(this ? i.bind(this) : i) : l
}

function Is(i) {
    let l = Zi + 1,
        a = Ci.length;
    for (; l < a;) {
        const c = l + a >>> 1,
            n = Ci[c],
            A = ql(n);
        A < i || A === i && n.pre ? l = c + 1 : a = c
    }
    return l
}

function dc(i) {
    (!Ci.length || !Ci.includes(i, Ql && i.allowRecurse ? Zi + 1 : Zi)) && (i.id == null ? Ci.push(i) : Ci.splice(Is(i.id), 0, i), yn())
}

function yn() {
    !Ql && !lc && (lc = !0, fc = Wn.then(Xn))
}

function rs(i) {
    const l = Ci.indexOf(i);
    l > Zi && Ci.splice(l, 1)
}

function Ss(i) {
    X(i) ? Dl.push(...i) : (!Qi || !Qi.includes(i, i.allowRecurse ? Il + 1 : Il)) && Dl.push(i), yn()
}

function bc(i, l, a = Ql ? Zi + 1 : 0) {
    for (; a < Ci.length; a++) {
        const c = Ci[a];
        if (c && c.pre) {
            if (i && c.id !== i.uid) continue;
            Ci.splice(a, 1), a--, c()
        }
    }
}

function Jn(i) {
    if (Dl.length) {
        const l = [...new Set(Dl)];
        if (Dl.length = 0, Qi) {
            Qi.push(...l);
            return
        }
        for (Qi = l, Qi.sort((a, c) => ql(a) - ql(c)), Il = 0; Il < Qi.length; Il++) Qi[Il]();
        Qi = null, Il = 0
    }
}
const ql = i => i.id == null ? 1 / 0 : i.id,
    Ts = (i, l) => {
        const a = ql(i) - ql(l);
        if (a === 0) {
            if (i.pre && !l.pre) return -1;
            if (l.pre && !i.pre) return 1
        }
        return a
    };

function Xn(i) {
    lc = !1, Ql = !0, Ci.sort(Ts);
    try {
        for (Zi = 0; Zi < Ci.length; Zi++) {
            const l = Ci[Zi];
            l && l.active !== !1 && nl(l, null, 14)
        }
    } finally {
        Zi = 0, Ci.length = 0, Jn(), Ql = !1, fc = null, (Ci.length || Dl.length) && Xn()
    }
}

function Ns(i, l, ...a) {
    if (i.isUnmounted) return;
    const c = i.vnode.props || Ai;
    let n = a;
    const A = l.startsWith("update:"),
        g = A && l.slice(7);
    if (g && g in c) {
        const S = `${g==="modelValue"?"model":g}Modifiers`,
            {
                number: t,
                trim: T
            } = c[S] || Ai;
        T && (n = a.map(P => Ni(P) ? P.trim() : P)), t && (n = a.map(Ta))
    }
    let e, o = c[e = Wa(l)] || c[e = Wa(Ul(l))];
    !o && A && (o = c[e = Wa(hl(l))]), o && Xi(o, i, 6, n);
    const L = c[e + "Once"];
    if (L) {
        if (!i.emitted) i.emitted = {};
        else if (i.emitted[e]) return;
        i.emitted[e] = !0, Xi(L, i, 6, n)
    }
}

function vn(i, l, a = !1) {
    const c = l.emitsCache,
        n = c.get(i);
    if (n !== void 0) return n;
    const A = i.emits;
    let g = {},
        e = !1;
    if (!b(i)) {
        const o = L => {
            const S = vn(L, l, !0);
            S && (e = !0, Li(g, S))
        };
        !a && l.mixins.length && l.mixins.forEach(o), i.extends && o(i.extends), i.mixins && i.mixins.forEach(o)
    }
    return !A && !e ? (ei(i) && c.set(i, null), null) : (X(A) ? A.forEach(o => g[o] = null) : Li(g, A), ei(i) && c.set(i, g), g)
}

function Ba(i, l) {
    return !i || !Ma(l) ? !1 : (l = l.slice(2).replace(/Once$/, ""), Q(i, l[0].toLowerCase() + l.slice(1)) || Q(i, hl(l)) || Q(i, l))
}
let yi = null,
    pa = null;

function Oa(i) {
    const l = yi;
    return yi = i, pa = i && i.type.__scopeId || null, l
}

function Mc(i) {
    pa = i
}

function Pc() {
    pa = null
}

function Os(i, l = yi, a) {
    if (!l || i._n) return i;
    const c = (...n) => {
        c._d && an(-1);
        const A = Oa(l);
        let g;
        try {
            g = i(...n)
        } finally {
            Oa(A), c._d && an(1)
        }
        return g
    };
    return c._n = !0, c._c = !0, c._d = !0, c
}

function Ja(i) {
    const {
        type: l,
        vnode: a,
        proxy: c,
        withProxy: n,
        props: A,
        propsOptions: [g],
        slots: e,
        attrs: o,
        emit: L,
        render: S,
        renderCache: t,
        data: T,
        setupState: P,
        ctx: K,
        inheritAttrs: M
    } = i;
    let R, C;
    const v = Oa(i);
    try {
        if (a.shapeFlag & 4) {
            const W = n || c,
                Oi = W;
            R = bi(S.call(Oi, W, t, A, P, T, K)), C = o
        } else {
            const W = l;
            R = bi(W.length > 1 ? W(A, {
                attrs: o,
                slots: e,
                emit: L
            }) : W(A, null)), C = l.props ? o : Ls(o)
        }
    } catch (W) {
        kl.length = 0, Ua(W, i, 1), R = pi(Cl)
    }
    let j = R;
    if (C && M !== !1) {
        const W = Object.keys(C),
            {
                shapeFlag: Oi
            } = j;
        W.length && Oi & 7 && (g && W.some(Ic) && (C = Cs(C, g)), j = pl(j, C))
    }
    return a.dirs && (j = pl(j), j.dirs = j.dirs ? j.dirs.concat(a.dirs) : a.dirs), a.transition && (j.transition = a.transition), R = j, Oa(v), R
}
const Ls = i => {
        let l;
        for (const a in i)(a === "class" || a === "style" || Ma(a)) && ((l || (l = {}))[a] = i[a]);
        return l
    },
    Cs = (i, l) => {
        const a = {};
        for (const c in i)(!Ic(c) || !(c.slice(9) in l)) && (a[c] = i[c]);
        return a
    };

function us(i, l, a) {
    const {
        props: c,
        children: n,
        component: A
    } = i, {
        props: g,
        children: e,
        patchFlag: o
    } = l, L = A.emitsOptions;
    if (l.dirs || l.transition) return !0;
    if (a && o >= 0) {
        if (o & 1024) return !0;
        if (o & 16) return c ? Zc(c, g, L) : !!g;
        if (o & 8) {
            const S = l.dynamicProps;
            for (let t = 0; t < S.length; t++) {
                const T = S[t];
                if (g[T] !== c[T] && !Ba(L, T)) return !0
            }
        }
    } else return (n || e) && (!e || !e.$stable) ? !0 : c === g ? !1 : c ? g ? Zc(c, g, L) : !0 : !!g;
    return !1
}

function Zc(i, l, a) {
    const c = Object.keys(l);
    if (c.length !== Object.keys(i).length) return !0;
    for (let n = 0; n < c.length; n++) {
        const A = c[n];
        if (l[A] !== i[A] && !Ba(a, A)) return !0
    }
    return !1
}

function fs({
    vnode: i,
    parent: l
}, a) {
    for (; l && l.subTree === i;)(i = l.vnode).el = a, l = l.parent
}
const ds = Symbol.for("v-ndc"),
    Ms = i => i.__isSuspense;

function Ps(i, l) {
    l && l.pendingBranch ? X(i) ? l.effects.push(...i) : l.effects.push(i) : Ss(i)
}
const ea = {};

function Ra(i, l, a) {
    return wn(i, l, a)
}

function wn(i, l, {
    immediate: a,
    deep: c,
    flush: n,
    onTrack: A,
    onTrigger: g
} = Ai) {
    var e;
    const o = Wo() === ((e = ui) == null ? void 0 : e.scope) ? ui : null;
    let L, S = !1,
        t = !1;
    if (ti(i) ? (L = () => i.value, S = Na(i)) : Gl(i) ? (L = () => i, c = !0) : X(i) ? (t = !0, S = i.some(W => Gl(W) || Na(W)), L = () => i.map(W => {
            if (ti(W)) return W.value;
            if (Gl(W)) return Tl(W);
            if (b(W)) return nl(W, o, 2)
        })) : b(i) ? l ? L = () => nl(i, o, 2) : L = () => {
            if (!(o && o.isUnmounted)) return T && T(), Xi(i, o, 3, [P])
        } : L = ki, l && c) {
        const W = L;
        L = () => Tl(W())
    }
    let T, P = W => {
            T = v.onStop = () => {
                nl(W, o, 4), T = v.onStop = void 0
            }
        },
        K;
    if (zl)
        if (P = ki, l ? a && Xi(l, o, 3, [L(), t ? [] : void 0, P]) : L(), n === "sync") {
            const W = NA();
            K = W.__watcherHandles || (W.__watcherHandles = [])
        } else return ki;
    let M = t ? new Array(i.length).fill(ea) : ea;
    const R = () => {
        if (v.active)
            if (l) {
                const W = v.run();
                (c || S || (t ? W.some((Oi, ni) => Ll(Oi, M[ni])) : Ll(W, M))) && (T && T(), Xi(l, o, 3, [W, M === ea ? void 0 : t && M[0] === ea ? [] : M, P]), M = W)
            } else v.run()
    };
    R.allowRecurse = !!l;
    let C;
    n === "sync" ? C = R : n === "post" ? C = () => Gi(R, o && o.suspense) : (R.pre = !0, o && (R.id = o.uid), C = () => dc(R));
    const v = new Nc(L, C);
    l ? a ? R() : M = v.run() : n === "post" ? Gi(v.run.bind(v), o && o.suspense) : v.run();
    const j = () => {
        v.stop(), o && o.scope && rc(o.scope.effects, v)
    };
    return K && K.push(j), j
}

function Gs(i, l, a) {
    const c = this.proxy,
        n = Ni(i) ? i.includes(".") ? _n(c, i) : () => c[i] : i.bind(c, c);
    let A;
    b(l) ? A = l : (A = l.handler, a = l);
    const g = ui;
    Fl(this);
    const e = wn(n, A.bind(c), a);
    return g ? Fl(g) : Ol(), e
}

function _n(i, l) {
    const a = l.split(".");
    return () => {
        let c = i;
        for (let n = 0; n < a.length && c; n++) c = c[a[n]];
        return c
    }
}

function Tl(i, l) {
    if (!ei(i) || i.__v_skip || (l = l || new Set, l.has(i))) return i;
    if (l.add(i), ti(i)) Tl(i.value, l);
    else if (X(i))
        for (let a = 0; a < i.length; a++) Tl(i[a], l);
    else if (Pa(i) || Pl(i)) i.forEach(a => {
        Tl(a, l)
    });
    else if (On(i))
        for (const a in i) Tl(i[a], l);
    return i
}

function $(i, l) {
    const a = yi;
    if (a === null) return i;
    const c = Ka(a) || a.proxy,
        n = i.dirs || (i.dirs = []);
    for (let A = 0; A < l.length; A++) {
        let [g, e, o, L = Ai] = l[A];
        g && (b(g) && (g = {
            mounted: g,
            updated: g
        }), g.deep && Tl(e), n.push({
            dir: g,
            instance: c,
            value: e,
            oldValue: void 0,
            arg: o,
            modifiers: L
        }))
    }
    return i
}

function gl(i, l, a, c) {
    const n = i.dirs,
        A = l && l.dirs;
    for (let g = 0; g < n.length; g++) {
        const e = n[g];
        A && (e.oldValue = A[g].value);
        let o = e.dir[c];
        o && (Vl(), Xi(o, a, 8, [i.el, e, i, l]), Kl())
    }
} /*! #__NO_SIDE_EFFECTS__ */
function ml(i, l) {
    return b(i) ? Li({
        name: i.name
    }, l, {
        setup: i
    }) : i
}
const Ea = i => !!i.type.__asyncLoader,
    bn = i => i.type.__isKeepAlive;

function Ds(i, l) {
    Zn(i, "a", l)
}

function Hs(i, l) {
    Zn(i, "da", l)
}

function Zn(i, l, a = ui) {
    const c = i.__wdc || (i.__wdc = () => {
        let n = a;
        for (; n;) {
            if (n.isDeactivated) return;
            n = n.parent
        }
        return i()
    });
    if (Fa(l, c, a), a) {
        let n = a.parent;
        for (; n && n.parent;) bn(n.parent.vnode) && Us(c, l, a, n), n = n.parent
    }
}

function Us(i, l, a, c) {
    const n = Fa(l, i, c, !0);
    kn(() => {
        rc(c[l], n)
    }, a)
}

function Fa(i, l, a = ui, c = !1) {
    if (a) {
        const n = a[i] || (a[i] = []),
            A = l.__weh || (l.__weh = (...g) => {
                if (a.isUnmounted) return;
                Vl(), Fl(a);
                const e = Xi(l, a, i, g);
                return Ol(), Kl(), e
            });
        return c ? n.unshift(A) : n.push(A), A
    }
}
const ji = i => (l, a = ui) => (!zl || i === "sp") && Fa(i, (...c) => l(...c), a),
    Bs = ji("bm"),
    Gc = ji("m"),
    ps = ji("bu"),
    Fs = ji("u"),
    Dc = ji("bum"),
    kn = ji("um"),
    hs = ji("sp"),
    Vs = ji("rtg"),
    Ks = ji("rtc");

function ms(i, l = ui) {
    Fa("ec", i, l)
}

function Mi(i, l, a, c) {
    let n;
    const A = a && a[c];
    if (X(i) || Ni(i)) {
        n = new Array(i.length);
        for (let g = 0, e = i.length; g < e; g++) n[g] = l(i[g], g, void 0, A && A[g])
    } else if (typeof i == "number") {
        n = new Array(i);
        for (let g = 0; g < i; g++) n[g] = l(g + 1, g, void 0, A && A[g])
    } else if (ei(i))
        if (i[Symbol.iterator]) n = Array.from(i, (g, e) => l(g, e, void 0, A && A[e]));
        else {
            const g = Object.keys(i);
            n = new Array(g.length);
            for (let e = 0, o = g.length; e < o; e++) {
                const L = g[e];
                n[e] = l(i[L], L, e, A && A[e])
            }
        }
    else n = [];
    return a && (a[c] = n), n
}
const ac = i => i ? oo(i) ? Ka(i) || i.proxy : ac(i.parent) : null,
    Zl = Li(Object.create(null), {
        $: i => i,
        $el: i => i.vnode.el,
        $data: i => i.data,
        $props: i => i.props,
        $attrs: i => i.attrs,
        $slots: i => i.slots,
        $refs: i => i.refs,
        $parent: i => ac(i.parent),
        $root: i => ac(i.root),
        $emit: i => i.emit,
        $options: i => Hc(i),
        $forceUpdate: i => i.f || (i.f = () => dc(i.update)),
        $nextTick: i => i.n || (i.n = Es.bind(i.proxy)),
        $watch: i => Gs.bind(i)
    }),
    Xa = (i, l) => i !== Ai && !i.__isScriptSetup && Q(i, l),
    Ys = {
        get({
            _: i
        }, l) {
            const {
                ctx: a,
                setupState: c,
                data: n,
                props: A,
                accessCache: g,
                type: e,
                appContext: o
            } = i;
            let L;
            if (l[0] !== "$") {
                const P = g[l];
                if (P !== void 0) switch (P) {
                    case 1:
                        return c[l];
                    case 2:
                        return n[l];
                    case 4:
                        return a[l];
                    case 3:
                        return A[l]
                } else {
                    if (Xa(c, l)) return g[l] = 1, c[l];
                    if (n !== Ai && Q(n, l)) return g[l] = 2, n[l];
                    if ((L = i.propsOptions[0]) && Q(L, l)) return g[l] = 3, A[l];
                    if (a !== Ai && Q(a, l)) return g[l] = 4, a[l];
                    cc && (g[l] = 0)
                }
            }
            const S = Zl[l];
            let t, T;
            if (S) return l === "$attrs" && Di(i, "get", l), S(i);
            if ((t = e.__cssModules) && (t = t[l])) return t;
            if (a !== Ai && Q(a, l)) return g[l] = 4, a[l];
            if (T = o.config.globalProperties, Q(T, l)) return T[l]
        },
        set({
            _: i
        }, l, a) {
            const {
                data: c,
                setupState: n,
                ctx: A
            } = i;
            return Xa(n, l) ? (n[l] = a, !0) : c !== Ai && Q(c, l) ? (c[l] = a, !0) : Q(i.props, l) || l[0] === "$" && l.slice(1) in i ? !1 : (A[l] = a, !0)
        },
        has({
            _: {
                data: i,
                setupState: l,
                accessCache: a,
                ctx: c,
                appContext: n,
                propsOptions: A
            }
        }, g) {
            let e;
            return !!a[g] || i !== Ai && Q(i, g) || Xa(l, g) || (e = A[0]) && Q(e, g) || Q(c, g) || Q(Zl, g) || Q(n.config.globalProperties, g)
        },
        defineProperty(i, l, a) {
            return a.get != null ? i._.accessCache[l] = 0 : Q(a, "value") && this.set(i, l, a.value, null), Reflect.defineProperty(i, l, a)
        }
    };

function kc(i) {
    return X(i) ? i.reduce((l, a) => (l[a] = null, l), {}) : i
}
let cc = !0;

function Ws(i) {
    const l = Hc(i),
        a = i.proxy,
        c = i.ctx;
    cc = !1, l.beforeCreate && xc(l.beforeCreate, i, "bc");
    const {
        data: n,
        computed: A,
        methods: g,
        watch: e,
        provide: o,
        inject: L,
        created: S,
        beforeMount: t,
        mounted: T,
        beforeUpdate: P,
        updated: K,
        activated: M,
        deactivated: R,
        beforeDestroy: C,
        beforeUnmount: v,
        destroyed: j,
        unmounted: W,
        render: Oi,
        renderTracked: ni,
        renderTriggered: Al,
        errorCaptured: fi,
        serverPrefetch: yl,
        expose: xi,
        inheritAttrs: k,
        components: V,
        directives: el,
        filters: Jl
    } = l;
    if (L && ys(L, c, null), g)
        for (const ii in g) {
            const li = g[ii];
            b(li) && (c[ii] = li.bind(a))
        }
    if (n) {
        const ii = n.call(a, a);
        ei(ii) && (i.data = cl(ii))
    }
    if (cc = !0, A)
        for (const ii in A) {
            const li = A[ii],
                Hi = b(li) ? li.bind(a, a) : b(li.get) ? li.get.bind(a, a) : ki,
                m = !b(li) && b(li.set) ? li.set.bind(a) : ki,
                N = SA({
                    get: Hi,
                    set: m
                });
            Object.defineProperty(c, ii, {
                enumerable: !0,
                configurable: !0,
                get: () => N.value,
                set: O => N.value = O
            })
        }
    if (e)
        for (const ii in e) xn(e[ii], c, a, ii);
    if (o) {
        const ii = b(o) ? o.call(a) : o;
        Reflect.ownKeys(ii).forEach(li => {
            bs(li, ii[li])
        })
    }
    S && xc(S, i, "c");

    function ri(ii, li) {
        X(li) ? li.forEach(Hi => ii(Hi.bind(a))) : li && ii(li.bind(a))
    }
    if (ri(Bs, t), ri(Gc, T), ri(ps, P), ri(Fs, K), ri(Ds, M), ri(Hs, R), ri(ms, fi), ri(Ks, ni), ri(Vs, Al), ri(Dc, v), ri(kn, W), ri(hs, yl), X(xi))
        if (xi.length) {
            const ii = i.exposed || (i.exposed = {});
            xi.forEach(li => {
                Object.defineProperty(ii, li, {
                    get: () => a[li],
                    set: Hi => a[li] = Hi
                })
            })
        } else i.exposed || (i.exposed = {});
    Oi && i.render === ki && (i.render = Oi), k != null && (i.inheritAttrs = k), V && (i.components = V), el && (i.directives = el)
}

function ys(i, l, a = ki) {
    X(i) && (i = nc(i));
    for (const c in i) {
        const n = i[c];
        let A;
        ei(n) ? "default" in n ? A = Ia(n.from || c, n.default, !0) : A = Ia(n.from || c) : A = Ia(n), ti(A) ? Object.defineProperty(l, c, {
            enumerable: !0,
            configurable: !0,
            get: () => A.value,
            set: g => A.value = g
        }) : l[c] = A
    }
}

function xc(i, l, a) {
    Xi(X(i) ? i.map(c => c.bind(l.proxy)) : i.bind(l.proxy), l, a)
}

function xn(i, l, a, c) {
    const n = c.includes(".") ? _n(a, c) : () => a[c];
    if (Ni(i)) {
        const A = l[i];
        b(A) && Ra(n, A)
    } else if (b(i)) Ra(n, i.bind(a));
    else if (ei(i))
        if (X(i)) i.forEach(A => xn(A, l, a, c));
        else {
            const A = b(i.handler) ? i.handler.bind(a) : l[i.handler];
            b(A) && Ra(n, A, i)
        }
}

function Hc(i) {
    const l = i.type,
        {
            mixins: a,
            extends: c
        } = l,
        {
            mixins: n,
            optionsCache: A,
            config: {
                optionMergeStrategies: g
            }
        } = i.appContext,
        e = A.get(l);
    let o;
    return e ? o = e : !n.length && !a && !c ? o = l : (o = {}, n.length && n.forEach(L => La(o, L, g, !0)), La(o, l, g)), ei(l) && A.set(l, o), o
}

function La(i, l, a, c = !1) {
    const {
        mixins: n,
        extends: A
    } = l;
    A && La(i, A, a, !0), n && n.forEach(g => La(i, g, a, !0));
    for (const g in l)
        if (!(c && g === "expose")) {
            const e = Js[g] || a && a[g];
            i[g] = e ? e(i[g], l[g]) : l[g]
        } return i
}
const Js = {
    data: $c,
    props: Qc,
    emits: Qc,
    methods: bl,
    computed: bl,
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
    components: bl,
    directives: bl,
    watch: vs,
    provide: $c,
    inject: Xs
};

function $c(i, l) {
    return l ? i ? function() {
        return Li(b(i) ? i.call(this, this) : i, b(l) ? l.call(this, this) : l)
    } : l : i
}

function Xs(i, l) {
    return bl(nc(i), nc(l))
}

function nc(i) {
    if (X(i)) {
        const l = {};
        for (let a = 0; a < i.length; a++) l[i[a]] = i[a];
        return l
    }
    return i
}

function di(i, l) {
    return i ? [...new Set([].concat(i, l))] : l
}

function bl(i, l) {
    return i ? Li(Object.create(null), i, l) : l
}

function Qc(i, l) {
    return i ? X(i) && X(l) ? [...new Set([...i, ...l])] : Li(Object.create(null), kc(i), kc(l ?? {})) : l
}

function vs(i, l) {
    if (!i) return l;
    if (!l) return i;
    const a = Li(Object.create(null), i);
    for (const c in l) a[c] = di(i[c], l[c]);
    return a
}

function $n() {
    return {
        app: null,
        config: {
            isNativeTag: fo,
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
let ws = 0;

function _s(i, l) {
    return function(c, n = null) {
        b(c) || (c = Li({}, c)), n != null && !ei(n) && (n = null);
        const A = $n(),
            g = new WeakSet;
        let e = !1;
        const o = A.app = {
            _uid: ws++,
            _component: c,
            _props: n,
            _container: null,
            _context: A,
            _instance: null,
            version: OA,
            get config() {
                return A.config
            },
            set config(L) {},
            use(L, ...S) {
                return g.has(L) || (L && b(L.install) ? (g.add(L), L.install(o, ...S)) : b(L) && (g.add(L), L(o, ...S))), o
            },
            mixin(L) {
                return A.mixins.includes(L) || A.mixins.push(L), o
            },
            component(L, S) {
                return S ? (A.components[L] = S, o) : A.components[L]
            },
            directive(L, S) {
                return S ? (A.directives[L] = S, o) : A.directives[L]
            },
            mount(L, S, t) {
                if (!e) {
                    const T = pi(c, n);
                    return T.appContext = A, S && l ? l(T, L) : i(T, L, t), e = !0, o._container = L, L.__vue_app__ = o, Ka(T.component) || T.component.proxy
                }
            },
            unmount() {
                e && (i(null, o._container), delete o._container.__vue_app__)
            },
            provide(L, S) {
                return A.provides[L] = S, o
            },
            runWithContext(L) {
                Ca = o;
                try {
                    return L()
                } finally {
                    Ca = null
                }
            }
        };
        return o
    }
}
let Ca = null;

function bs(i, l) {
    if (ui) {
        let a = ui.provides;
        const c = ui.parent && ui.parent.provides;
        c === a && (a = ui.provides = Object.create(c)), a[i] = l
    }
}

function Ia(i, l, a = !1) {
    const c = ui || yi;
    if (c || Ca) {
        const n = c ? c.parent == null ? c.vnode.appContext && c.vnode.appContext.provides : c.parent.provides : Ca._context.provides;
        if (n && i in n) return n[i];
        if (arguments.length > 1) return a && b(l) ? l.call(c && c.proxy) : l
    }
}

function Zs(i, l, a, c = !1) {
    const n = {},
        A = {};
    Sa(A, Va, 1), i.propsDefaults = Object.create(null), Qn(i, l, n, A);
    for (const g in i.propsOptions[0]) g in n || (n[g] = void 0);
    a ? i.props = c ? n : os(n) : i.type.props ? i.props = n : i.props = A, i.attrs = A
}

function ks(i, l, a, c) {
    const {
        props: n,
        attrs: A,
        vnode: {
            patchFlag: g
        }
    } = i, e = z(n), [o] = i.propsOptions;
    let L = !1;
    if ((c || g > 0) && !(g & 16)) {
        if (g & 8) {
            const S = i.vnode.dynamicProps;
            for (let t = 0; t < S.length; t++) {
                let T = S[t];
                if (Ba(i.emitsOptions, T)) continue;
                const P = l[T];
                if (o)
                    if (Q(A, T)) P !== A[T] && (A[T] = P, L = !0);
                    else {
                        const K = Ul(T);
                        n[K] = oc(o, e, K, P, i, !1)
                    }
                else P !== A[T] && (A[T] = P, L = !0)
            }
        }
    } else {
        Qn(i, l, n, A) && (L = !0);
        let S;
        for (const t in e)(!l || !Q(l, t) && ((S = hl(t)) === t || !Q(l, S))) && (o ? a && (a[t] !== void 0 || a[S] !== void 0) && (n[t] = oc(o, e, t, void 0, i, !0)) : delete n[t]);
        if (A !== e)
            for (const t in A)(!l || !Q(l, t)) && (delete A[t], L = !0)
    }
    L && qi(i, "set", "$attrs")
}

function Qn(i, l, a, c) {
    const [n, A] = i.propsOptions;
    let g = !1,
        e;
    if (l)
        for (let o in l) {
            if (ga(o)) continue;
            const L = l[o];
            let S;
            n && Q(n, S = Ul(o)) ? !A || !A.includes(S) ? a[S] = L : (e || (e = {}))[S] = L : Ba(i.emitsOptions, o) || (!(o in c) || L !== c[o]) && (c[o] = L, g = !0)
        }
    if (A) {
        const o = z(a),
            L = e || Ai;
        for (let S = 0; S < A.length; S++) {
            const t = A[S];
            a[t] = oc(n, o, t, L[t], i, !Q(L, t))
        }
    }
    return g
}

function oc(i, l, a, c, n, A) {
    const g = i[a];
    if (g != null) {
        const e = Q(g, "default");
        if (e && c === void 0) {
            const o = g.default;
            if (g.type !== Function && !g.skipFactory && b(o)) {
                const {
                    propsDefaults: L
                } = n;
                a in L ? c = L[a] : (Fl(n), c = L[a] = o.call(null, l), Ol())
            } else c = o
        }
        g[0] && (A && !e ? c = !1 : g[1] && (c === "" || c === hl(a)) && (c = !0))
    }
    return c
}

function qn(i, l, a = !1) {
    const c = l.propsCache,
        n = c.get(i);
    if (n) return n;
    const A = i.props,
        g = {},
        e = [];
    let o = !1;
    if (!b(i)) {
        const S = t => {
            o = !0;
            const [T, P] = qn(t, l, !0);
            Li(g, T), P && e.push(...P)
        };
        !a && l.mixins.length && l.mixins.forEach(S), i.extends && S(i.extends), i.mixins && i.mixins.forEach(S)
    }
    if (!A && !o) return ei(i) && c.set(i, Ml), Ml;
    if (X(A))
        for (let S = 0; S < A.length; S++) {
            const t = Ul(A[S]);
            qc(t) && (g[t] = Ai)
        } else if (A)
            for (const S in A) {
                const t = Ul(S);
                if (qc(t)) {
                    const T = A[S],
                        P = g[t] = X(T) || b(T) ? {
                            type: T
                        } : Li({}, T);
                    if (P) {
                        const K = ln(Boolean, P.type),
                            M = ln(String, P.type);
                        P[0] = K > -1, P[1] = M < 0 || K < M, (K > -1 || Q(P, "default")) && e.push(t)
                    }
                }
            }
    const L = [g, e];
    return ei(i) && c.set(i, L), L
}

function qc(i) {
    return i[0] !== "$"
}

function jc(i) {
    const l = i && i.toString().match(/^\s*(function|class) (\w+)/);
    return l ? l[2] : i === null ? "null" : ""
}

function zc(i, l) {
    return jc(i) === jc(l)
}

function ln(i, l) {
    return X(l) ? l.findIndex(a => zc(a, i)) : b(l) && zc(l, i) ? 0 : -1
}
const jn = i => i[0] === "_" || i === "$stable",
    Uc = i => X(i) ? i.map(bi) : [bi(i)],
    xs = (i, l, a) => {
        if (l._n) return l;
        const c = Os((...n) => Uc(l(...n)), a);
        return c._c = !1, c
    },
    zn = (i, l, a) => {
        const c = i._ctx;
        for (const n in i) {
            if (jn(n)) continue;
            const A = i[n];
            if (b(A)) l[n] = xs(n, A, c);
            else if (A != null) {
                const g = Uc(A);
                l[n] = () => g
            }
        }
    },
    io = (i, l) => {
        const a = Uc(l);
        i.slots.default = () => a
    },
    $s = (i, l) => {
        if (i.vnode.shapeFlag & 32) {
            const a = l._;
            a ? (i.slots = z(l), Sa(l, "_", a)) : zn(l, i.slots = {})
        } else i.slots = {}, l && io(i, l);
        Sa(i.slots, Va, 1)
    },
    Qs = (i, l, a) => {
        const {
            vnode: c,
            slots: n
        } = i;
        let A = !0,
            g = Ai;
        if (c.shapeFlag & 32) {
            const e = l._;
            e ? a && e === 1 ? A = !1 : (Li(n, l), !a && e === 1 && delete n._) : (A = !l.$stable, zn(l, n)), g = l
        } else l && (io(i, l), g = {
            default: 1
        });
        if (A)
            for (const e in n) !jn(e) && g[e] == null && delete n[e]
    };

function sc(i, l, a, c, n = !1) {
    if (X(i)) {
        i.forEach((T, P) => sc(T, l && (X(l) ? l[P] : l), a, c, n));
        return
    }
    if (Ea(c) && !n) return;
    const A = c.shapeFlag & 4 ? Ka(c.component) || c.component.proxy : c.el,
        g = n ? null : A,
        {
            i: e,
            r: o
        } = i,
        L = l && l.r,
        S = e.refs === Ai ? e.refs = {} : e.refs,
        t = e.setupState;
    if (L != null && L !== o && (Ni(L) ? (S[L] = null, Q(t, L) && (t[L] = null)) : ti(L) && (L.value = null)), b(o)) nl(o, e, 12, [g, S]);
    else {
        const T = Ni(o),
            P = ti(o);
        if (T || P) {
            const K = () => {
                if (i.f) {
                    const M = T ? Q(t, o) ? t[o] : S[o] : o.value;
                    n ? X(M) && rc(M, A) : X(M) ? M.includes(A) || M.push(A) : T ? (S[o] = [A], Q(t, o) && (t[o] = S[o])) : (o.value = [A], i.k && (S[i.k] = o.value))
                } else T ? (S[o] = g, Q(t, o) && (t[o] = g)) : P && (o.value = g, i.k && (S[i.k] = g))
            };
            g ? (K.id = -1, Gi(K, a)) : K()
        }
    }
}
const Gi = Ps;

function qs(i) {
    return js(i)
}

function js(i, l) {
    const a = Qa();
    a.__VUE__ = !0;
    const {
        insert: c,
        remove: n,
        patchProp: A,
        createElement: g,
        createText: e,
        createComment: o,
        setText: L,
        setElementText: S,
        parentNode: t,
        nextSibling: T,
        setScopeId: P = ki,
        insertStaticContent: K
    } = i, M = (I, r, u, f = null, d = null, B = null, h = !1, U = null, F = !!r.dynamicChildren) => {
        if (I === r) return;
        I && !wl(I, r) && (f = aa(I), O(I, d, B, !0), I = null), r.patchFlag === -2 && (F = !1, r.dynamicChildren = null);
        const {
            type: G,
            ref: y,
            shapeFlag: Y
        } = r;
        switch (G) {
            case ha:
                R(I, r, u, f);
                break;
            case Cl:
                C(I, r, u, f);
                break;
            case va:
                I == null && v(r, u, f, h);
                break;
            case si:
                V(I, r, u, f, d, B, h, U, F);
                break;
            default:
                Y & 1 ? Oi(I, r, u, f, d, B, h, U, F) : Y & 6 ? el(I, r, u, f, d, B, h, U, F) : (Y & 64 || Y & 128) && G.process(I, r, u, f, d, B, h, U, F, ul)
        }
        y != null && d && sc(y, I && I.ref, B, r || I, !r)
    }, R = (I, r, u, f) => {
        if (I == null) c(r.el = e(r.children), u, f);
        else {
            const d = r.el = I.el;
            r.children !== I.children && L(d, r.children)
        }
    }, C = (I, r, u, f) => {
        I == null ? c(r.el = o(r.children || ""), u, f) : r.el = I.el
    }, v = (I, r, u, f) => {
        [I.el, I.anchor] = K(I.children, r, u, f, I.el, I.anchor)
    }, j = ({
        el: I,
        anchor: r
    }, u, f) => {
        let d;
        for (; I && I !== r;) d = T(I), c(I, u, f), I = d;
        c(r, u, f)
    }, W = ({
        el: I,
        anchor: r
    }) => {
        let u;
        for (; I && I !== r;) u = T(I), n(I), I = u;
        n(r)
    }, Oi = (I, r, u, f, d, B, h, U, F) => {
        h = h || r.type === "svg", I == null ? ni(r, u, f, d, B, h, U, F) : yl(I, r, d, B, h, U, F)
    }, ni = (I, r, u, f, d, B, h, U) => {
        let F, G;
        const {
            type: y,
            props: Y,
            shapeFlag: J,
            transition: _,
            dirs: x
        } = I;
        if (F = I.el = g(I.type, B, Y && Y.is, Y), J & 8 ? S(F, I.children) : J & 16 && fi(I.children, F, null, f, d, B && y !== "foreignObject", h, U), x && gl(I, null, f, "created"), Al(F, I, I.scopeId, h, f), Y) {
            for (const ai in Y) ai !== "value" && !ga(ai) && A(F, ai, null, Y[ai], B, I.children, f, d, $i);
            "value" in Y && A(F, "value", null, Y.value), (G = Y.onVnodeBeforeMount) && wi(G, f, I)
        }
        x && gl(I, null, f, "beforeMount");
        const oi = zs(d, _);
        oi && _.beforeEnter(F), c(F, r, u), ((G = Y && Y.onVnodeMounted) || oi || x) && Gi(() => {
            G && wi(G, f, I), oi && _.enter(F), x && gl(I, null, f, "mounted")
        }, d)
    }, Al = (I, r, u, f, d) => {
        if (u && P(I, u), f)
            for (let B = 0; B < f.length; B++) P(I, f[B]);
        if (d) {
            let B = d.subTree;
            if (r === B) {
                const h = d.vnode;
                Al(I, h, h.scopeId, h.slotScopeIds, d.parent)
            }
        }
    }, fi = (I, r, u, f, d, B, h, U, F = 0) => {
        for (let G = F; G < I.length; G++) {
            const y = I[G] = U ? ll(I[G]) : bi(I[G]);
            M(null, y, r, u, f, d, B, h, U)
        }
    }, yl = (I, r, u, f, d, B, h) => {
        const U = r.el = I.el;
        let {
            patchFlag: F,
            dynamicChildren: G,
            dirs: y
        } = r;
        F |= I.patchFlag & 16;
        const Y = I.props || Ai,
            J = r.props || Ai;
        let _;
        u && tl(u, !1), (_ = J.onVnodeBeforeUpdate) && wi(_, u, r, I), y && gl(r, I, u, "beforeUpdate"), u && tl(u, !0);
        const x = d && r.type !== "foreignObject";
        if (G ? xi(I.dynamicChildren, G, U, u, f, x, B) : h || li(I, r, U, null, u, f, x, B, !1), F > 0) {
            if (F & 16) k(U, r, Y, J, u, f, d);
            else if (F & 2 && Y.class !== J.class && A(U, "class", null, J.class, d), F & 4 && A(U, "style", Y.style, J.style, d), F & 8) {
                const oi = r.dynamicProps;
                for (let ai = 0; ai < oi.length; ai++) {
                    const Ti = oi[ai],
                        hi = Y[Ti],
                        fl = J[Ti];
                    (fl !== hi || Ti === "value") && A(U, Ti, hi, fl, d, I.children, u, f, $i)
                }
            }
            F & 1 && I.children !== r.children && S(U, r.children)
        } else !h && G == null && k(U, r, Y, J, u, f, d);
        ((_ = J.onVnodeUpdated) || y) && Gi(() => {
            _ && wi(_, u, r, I), y && gl(r, I, u, "updated")
        }, f)
    }, xi = (I, r, u, f, d, B, h) => {
        for (let U = 0; U < r.length; U++) {
            const F = I[U],
                G = r[U],
                y = F.el && (F.type === si || !wl(F, G) || F.shapeFlag & 70) ? t(F.el) : u;
            M(F, G, y, null, f, d, B, h, !0)
        }
    }, k = (I, r, u, f, d, B, h) => {
        if (u !== f) {
            if (u !== Ai)
                for (const U in u) !ga(U) && !(U in f) && A(I, U, u[U], null, h, r.children, d, B, $i);
            for (const U in f) {
                if (ga(U)) continue;
                const F = f[U],
                    G = u[U];
                F !== G && U !== "value" && A(I, U, G, F, h, r.children, d, B, $i)
            }
            "value" in f && A(I, "value", u.value, f.value)
        }
    }, V = (I, r, u, f, d, B, h, U, F) => {
        const G = r.el = I ? I.el : e(""),
            y = r.anchor = I ? I.anchor : e("");
        let {
            patchFlag: Y,
            dynamicChildren: J,
            slotScopeIds: _
        } = r;
        _ && (U = U ? U.concat(_) : _), I == null ? (c(G, u, f), c(y, u, f), fi(r.children, u, y, d, B, h, U, F)) : Y > 0 && Y & 64 && J && I.dynamicChildren ? (xi(I.dynamicChildren, J, u, d, B, h, U), (r.key != null || d && r === d.subTree) && lo(I, r, !0)) : li(I, r, u, y, d, B, h, U, F)
    }, el = (I, r, u, f, d, B, h, U, F) => {
        r.slotScopeIds = U, I == null ? r.shapeFlag & 512 ? d.ctx.activate(r, u, f, h, F) : Jl(r, u, f, d, B, h, F) : Xl(I, r, F)
    }, Jl = (I, r, u, f, d, B, h) => {
        const U = I.component = gA(I, f, d);
        if (bn(I) && (U.ctx.renderer = ul), tA(U), U.asyncDep) {
            if (d && d.registerDep(U, ri), !I.el) {
                const F = U.subTree = pi(Cl);
                C(null, F, r, u)
            }
            return
        }
        ri(U, I, r, u, d, B, h)
    }, Xl = (I, r, u) => {
        const f = r.component = I.component;
        if (us(I, r, u))
            if (f.asyncDep && !f.asyncResolved) {
                ii(f, r, u);
                return
            } else f.next = r, rs(f.update), f.update();
        else r.el = I.el, f.vnode = r
    }, ri = (I, r, u, f, d, B, h) => {
        const U = () => {
                if (I.isMounted) {
                    let {
                        next: y,
                        bu: Y,
                        u: J,
                        parent: _,
                        vnode: x
                    } = I, oi = y, ai;
                    tl(I, !1), y ? (y.el = x.el, ii(I, y, h)) : y = x, Y && ta(Y), (ai = y.props && y.props.onVnodeBeforeUpdate) && wi(ai, _, y, x), tl(I, !0);
                    const Ti = Ja(I),
                        hi = I.subTree;
                    I.subTree = Ti, M(hi, Ti, t(hi.el), aa(hi), I, d, B), y.el = Ti.el, oi === null && fs(I, Ti.el), J && Gi(J, d), (ai = y.props && y.props.onVnodeUpdated) && Gi(() => wi(ai, _, y, x), d)
                } else {
                    let y;
                    const {
                        el: Y,
                        props: J
                    } = r, {
                        bm: _,
                        m: x,
                        parent: oi
                    } = I, ai = Ea(r);
                    if (tl(I, !1), _ && ta(_), !ai && (y = J && J.onVnodeBeforeMount) && wi(y, oi, r), tl(I, !0), Y && Ya) {
                        const Ti = () => {
                            I.subTree = Ja(I), Ya(Y, I.subTree, I, d, null)
                        };
                        ai ? r.type.__asyncLoader().then(() => !I.isUnmounted && Ti()) : Ti()
                    } else {
                        const Ti = I.subTree = Ja(I);
                        M(null, Ti, u, f, I, d, B), r.el = Ti.el
                    }
                    if (x && Gi(x, d), !ai && (y = J && J.onVnodeMounted)) {
                        const Ti = r;
                        Gi(() => wi(y, oi, Ti), d)
                    }(r.shapeFlag & 256 || oi && Ea(oi.vnode) && oi.vnode.shapeFlag & 256) && I.a && Gi(I.a, d), I.isMounted = !0, r = u = f = null
                }
            },
            F = I.effect = new Nc(U, () => dc(G), I.scope),
            G = I.update = () => F.run();
        G.id = I.uid, tl(I, !0), G()
    }, ii = (I, r, u) => {
        r.component = I;
        const f = I.vnode.props;
        I.vnode = r, I.next = null, ks(I, r.props, f, u), Qs(I, r.children, u), Vl(), bc(I), Kl()
    }, li = (I, r, u, f, d, B, h, U, F = !1) => {
        const G = I && I.children,
            y = I ? I.shapeFlag : 0,
            Y = r.children,
            {
                patchFlag: J,
                shapeFlag: _
            } = r;
        if (J > 0) {
            if (J & 128) {
                m(G, Y, u, f, d, B, h, U, F);
                return
            } else if (J & 256) {
                Hi(G, Y, u, f, d, B, h, U, F);
                return
            }
        }
        _ & 8 ? (y & 16 && $i(G, d, B), Y !== G && S(u, Y)) : y & 16 ? _ & 16 ? m(G, Y, u, f, d, B, h, U, F) : $i(G, d, B, !0) : (y & 8 && S(u, ""), _ & 16 && fi(Y, u, f, d, B, h, U, F))
    }, Hi = (I, r, u, f, d, B, h, U, F) => {
        I = I || Ml, r = r || Ml;
        const G = I.length,
            y = r.length,
            Y = Math.min(G, y);
        let J;
        for (J = 0; J < Y; J++) {
            const _ = r[J] = F ? ll(r[J]) : bi(r[J]);
            M(I[J], _, u, null, d, B, h, U, F)
        }
        G > y ? $i(I, d, B, !0, !1, Y) : fi(r, u, f, d, B, h, U, F, Y)
    }, m = (I, r, u, f, d, B, h, U, F) => {
        let G = 0;
        const y = r.length;
        let Y = I.length - 1,
            J = y - 1;
        for (; G <= Y && G <= J;) {
            const _ = I[G],
                x = r[G] = F ? ll(r[G]) : bi(r[G]);
            if (wl(_, x)) M(_, x, u, null, d, B, h, U, F);
            else break;
            G++
        }
        for (; G <= Y && G <= J;) {
            const _ = I[Y],
                x = r[J] = F ? ll(r[J]) : bi(r[J]);
            if (wl(_, x)) M(_, x, u, null, d, B, h, U, F);
            else break;
            Y--, J--
        }
        if (G > Y) {
            if (G <= J) {
                const _ = J + 1,
                    x = _ < y ? r[_].el : f;
                for (; G <= J;) M(null, r[G] = F ? ll(r[G]) : bi(r[G]), u, x, d, B, h, U, F), G++
            }
        } else if (G > J)
            for (; G <= Y;) O(I[G], d, B, !0), G++;
        else {
            const _ = G,
                x = G,
                oi = new Map;
            for (G = x; G <= J; G++) {
                const Ui = r[G] = F ? ll(r[G]) : bi(r[G]);
                Ui.key != null && oi.set(Ui.key, G)
            }
            let ai, Ti = 0;
            const hi = J - x + 1;
            let fl = !1,
                hc = 0;
            const vl = new Array(hi);
            for (G = 0; G < hi; G++) vl[G] = 0;
            for (G = _; G <= Y; G++) {
                const Ui = I[G];
                if (Ti >= hi) {
                    O(Ui, d, B, !0);
                    continue
                }
                let vi;
                if (Ui.key != null) vi = oi.get(Ui.key);
                else
                    for (ai = x; ai <= J; ai++)
                        if (vl[ai - x] === 0 && wl(Ui, r[ai])) {
                            vi = ai;
                            break
                        } vi === void 0 ? O(Ui, d, B, !0) : (vl[vi - x] = G + 1, vi >= hc ? hc = vi : fl = !0, M(Ui, r[vi], u, null, d, B, h, U, F), Ti++)
            }
            const Vc = fl ? iA(vl) : Ml;
            for (ai = Vc.length - 1, G = hi - 1; G >= 0; G--) {
                const Ui = x + G,
                    vi = r[Ui],
                    Kc = Ui + 1 < y ? r[Ui + 1].el : f;
                vl[G] === 0 ? M(null, vi, u, Kc, d, B, h, U, F) : fl && (ai < 0 || G !== Vc[ai] ? N(vi, u, Kc, 2) : ai--)
            }
        }
    }, N = (I, r, u, f, d = null) => {
        const {
            el: B,
            type: h,
            transition: U,
            children: F,
            shapeFlag: G
        } = I;
        if (G & 6) {
            N(I.component.subTree, r, u, f);
            return
        }
        if (G & 128) {
            I.suspense.move(r, u, f);
            return
        }
        if (G & 64) {
            h.move(I, r, u, ul);
            return
        }
        if (h === si) {
            c(B, r, u);
            for (let Y = 0; Y < F.length; Y++) N(F[Y], r, u, f);
            c(I.anchor, r, u);
            return
        }
        if (h === va) {
            j(I, r, u);
            return
        }
        if (f !== 2 && G & 1 && U)
            if (f === 0) U.beforeEnter(B), c(B, r, u), Gi(() => U.enter(B), d);
            else {
                const {
                    leave: Y,
                    delayLeave: J,
                    afterLeave: _
                } = U, x = () => c(B, r, u), oi = () => {
                    Y(B, () => {
                        x(), _ && _()
                    })
                };
                J ? J(B, x, oi) : oi()
            }
        else c(B, r, u)
    }, O = (I, r, u, f = !1, d = !1) => {
        const {
            type: B,
            props: h,
            ref: U,
            children: F,
            dynamicChildren: G,
            shapeFlag: y,
            patchFlag: Y,
            dirs: J
        } = I;
        if (U != null && sc(U, null, u, I, !0), y & 256) {
            r.ctx.deactivate(I);
            return
        }
        const _ = y & 1 && J,
            x = !Ea(I);
        let oi;
        if (x && (oi = h && h.onVnodeBeforeUnmount) && wi(oi, r, I), y & 6) zi(I.component, u, f);
        else {
            if (y & 128) {
                I.suspense.unmount(u, f);
                return
            }
            _ && gl(I, null, r, "beforeUnmount"), y & 64 ? I.type.remove(I, r, u, d, ul, f) : G && (B !== si || Y > 0 && Y & 64) ? $i(G, r, u, !1, !0) : (B === si && Y & 384 || !d && y & 16) && $i(F, r, u), f && w(I)
        }(x && (oi = h && h.onVnodeUnmounted) || _) && Gi(() => {
            oi && wi(oi, r, I), _ && gl(I, null, r, "unmounted")
        }, u)
    }, w = I => {
        const {
            type: r,
            el: u,
            anchor: f,
            transition: d
        } = I;
        if (r === si) {
            Si(u, f);
            return
        }
        if (r === va) {
            W(I);
            return
        }
        const B = () => {
            n(u), d && !d.persisted && d.afterLeave && d.afterLeave()
        };
        if (I.shapeFlag & 1 && d && !d.persisted) {
            const {
                leave: h,
                delayLeave: U
            } = d, F = () => h(u, B);
            U ? U(I.el, B, F) : F()
        } else B()
    }, Si = (I, r) => {
        let u;
        for (; I !== r;) u = T(I), n(I), I = u;
        n(r)
    }, zi = (I, r, u) => {
        const {
            bum: f,
            scope: d,
            update: B,
            subTree: h,
            um: U
        } = I;
        f && ta(f), d.stop(), B && (B.active = !1, O(h, I, r, u)), U && Gi(U, r), Gi(() => {
            I.isUnmounted = !0
        }, r), r && r.pendingBranch && !r.isUnmounted && I.asyncDep && !I.asyncResolved && I.suspenseId === r.pendingId && (r.deps--, r.deps === 0 && r.resolve())
    }, $i = (I, r, u, f = !1, d = !1, B = 0) => {
        for (let h = B; h < I.length; h++) O(I[h], r, u, f, d)
    }, aa = I => I.shapeFlag & 6 ? aa(I.component.subTree) : I.shapeFlag & 128 ? I.suspense.next() : T(I.anchor || I.el), Fc = (I, r, u) => {
        I == null ? r._vnode && O(r._vnode, null, null, !0) : M(r._vnode || null, I, r, null, null, null, u), bc(), Jn(), r._vnode = I
    }, ul = {
        p: M,
        um: O,
        m: N,
        r: w,
        mt: Jl,
        mc: fi,
        pc: li,
        pbc: xi,
        n: aa,
        o: i
    };
    let ma, Ya;
    return l && ([ma, Ya] = l(ul)), {
        render: Fc,
        hydrate: ma,
        createApp: _s(Fc, ma)
    }
}

function tl({
    effect: i,
    update: l
}, a) {
    i.allowRecurse = l.allowRecurse = a
}

function zs(i, l) {
    return (!i || i && !i.pendingBranch) && l && !l.persisted
}

function lo(i, l, a = !1) {
    const c = i.children,
        n = l.children;
    if (X(c) && X(n))
        for (let A = 0; A < c.length; A++) {
            const g = c[A];
            let e = n[A];
            e.shapeFlag & 1 && !e.dynamicChildren && ((e.patchFlag <= 0 || e.patchFlag === 32) && (e = n[A] = ll(n[A]), e.el = g.el), a || lo(g, e)), e.type === ha && (e.el = g.el)
        }
}

function iA(i) {
    const l = i.slice(),
        a = [0];
    let c, n, A, g, e;
    const o = i.length;
    for (c = 0; c < o; c++) {
        const L = i[c];
        if (L !== 0) {
            if (n = a[a.length - 1], i[n] < L) {
                l[c] = n, a.push(c);
                continue
            }
            for (A = 0, g = a.length - 1; A < g;) e = A + g >> 1, i[a[e]] < L ? A = e + 1 : g = e;
            L < i[a[A]] && (A > 0 && (l[c] = a[A - 1]), a[A] = c)
        }
    }
    for (A = a.length, g = a[A - 1]; A-- > 0;) a[A] = g, g = l[g];
    return a
}
const lA = i => i.__isTeleport,
    si = Symbol.for("v-fgt"),
    ha = Symbol.for("v-txt"),
    Cl = Symbol.for("v-cmt"),
    va = Symbol.for("v-stc"),
    kl = [];
let Ji = null;

function D(i = !1) {
    kl.push(Ji = i ? null : [])
}

function aA() {
    kl.pop(), Ji = kl[kl.length - 1] || null
}
let jl = 1;

function an(i) {
    jl += i
}

function ao(i) {
    return i.dynamicChildren = jl > 0 ? Ji || Ml : null, aA(), jl > 0 && Ji && Ji.push(i), i
}

function p(i, l, a, c, n, A) {
    return ao(E(i, l, a, c, n, A, !0))
}

function _i(i, l, a, c, n) {
    return ao(pi(i, l, a, c, n, !0))
}

function cA(i) {
    return i ? i.__v_isVNode === !0 : !1
}

function wl(i, l) {
    return i.type === l.type && i.key === l.key
}
const Va = "__vInternal",
    co = ({
        key: i
    }) => i ?? null,
    ra = ({
        ref: i,
        ref_key: l,
        ref_for: a
    }) => (typeof i == "number" && (i = "" + i), i != null ? Ni(i) || ti(i) || b(i) ? {
        i: yi,
        r: i,
        k: l,
        f: !!a
    } : i : null);

function E(i, l = null, a = null, c = 0, n = null, A = i === si ? 0 : 1, g = !1, e = !1) {
    const o = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: i,
        props: l,
        key: l && co(l),
        ref: l && ra(l),
        scopeId: pa,
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
        dynamicProps: n,
        dynamicChildren: null,
        appContext: null,
        ctx: yi
    };
    return e ? (Bc(o, a), A & 128 && i.normalize(o)) : a && (o.shapeFlag |= Ni(a) ? 8 : 16), jl > 0 && !g && Ji && (o.patchFlag > 0 || A & 6) && o.patchFlag !== 32 && Ji.push(o), o
}
const pi = nA;

function nA(i, l = null, a = null, c = 0, n = null, A = !1) {
    if ((!i || i === ds) && (i = Cl), cA(i)) {
        const e = pl(i, l, !0);
        return a && Bc(e, a), jl > 0 && !A && Ji && (e.shapeFlag & 6 ? Ji[Ji.indexOf(i)] = e : Ji.push(e)), e.patchFlag |= -2, e
    }
    if (rA(i) && (i = i.__vccOpts), l) {
        l = oA(l);
        let {
            class: e,
            style: o
        } = l;
        e && !Ni(e) && (l.class = Ki(e)), ei(o) && (hn(o) && !X(o) && (o = Li({}, o)), l.style = la(o))
    }
    const g = Ni(i) ? 1 : Ms(i) ? 128 : lA(i) ? 64 : ei(i) ? 4 : b(i) ? 2 : 0;
    return E(i, l, a, c, n, g, A, !0)
}

function oA(i) {
    return i ? hn(i) || Va in i ? Li({}, i) : i : null
}

function pl(i, l, a = !1) {
    const {
        props: c,
        ref: n,
        patchFlag: A,
        children: g
    } = i, e = l ? sA(c || {}, l) : c;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: i.type,
        props: e,
        key: e && co(e),
        ref: l && l.ref ? a && n ? X(n) ? n.concat(ra(l)) : [n, ra(l)] : ra(l) : n,
        scopeId: i.scopeId,
        slotScopeIds: i.slotScopeIds,
        children: g,
        target: i.target,
        targetAnchor: i.targetAnchor,
        staticCount: i.staticCount,
        shapeFlag: i.shapeFlag,
        patchFlag: l && i.type !== si ? A === -1 ? 16 : A | 16 : A,
        dynamicProps: i.dynamicProps,
        dynamicChildren: i.dynamicChildren,
        appContext: i.appContext,
        dirs: i.dirs,
        transition: i.transition,
        component: i.component,
        suspense: i.suspense,
        ssContent: i.ssContent && pl(i.ssContent),
        ssFallback: i.ssFallback && pl(i.ssFallback),
        el: i.el,
        anchor: i.anchor,
        ctx: i.ctx,
        ce: i.ce
    }
}

function no(i = " ", l = 0) {
    return pi(ha, null, i, l)
}

function Z(i = "", l = !1) {
    return l ? (D(), _i(Cl, null, i)) : pi(Cl, null, i)
}

function bi(i) {
    return i == null || typeof i == "boolean" ? pi(Cl) : X(i) ? pi(si, null, i.slice()) : typeof i == "object" ? ll(i) : pi(ha, null, String(i))
}

function ll(i) {
    return i.el === null && i.patchFlag !== -1 || i.memo ? i : pl(i)
}

function Bc(i, l) {
    let a = 0;
    const {
        shapeFlag: c
    } = i;
    if (l == null) l = null;
    else if (X(l)) a = 16;
    else if (typeof l == "object")
        if (c & 65) {
            const n = l.default;
            n && (n._c && (n._d = !1), Bc(i, n()), n._c && (n._d = !0));
            return
        } else {
            a = 32;
            const n = l._;
            !n && !(Va in l) ? l._ctx = yi : n === 3 && yi && (yi.slots._ === 1 ? l._ = 1 : (l._ = 2, i.patchFlag |= 1024))
        }
    else b(l) ? (l = {
        default: l,
        _ctx: yi
    }, a = 32) : (l = String(l), c & 64 ? (a = 16, l = [no(l)]) : a = 8);
    i.children = l, i.shapeFlag |= a
}

function sA(...i) {
    const l = {};
    for (let a = 0; a < i.length; a++) {
        const c = i[a];
        for (const n in c)
            if (n === "class") l.class !== c.class && (l.class = Ki([l.class, c.class]));
            else if (n === "style") l.style = la([l.style, c.style]);
        else if (Ma(n)) {
            const A = l[n],
                g = c[n];
            g && A !== g && !(X(A) && A.includes(g)) && (l[n] = A ? [].concat(A, g) : g)
        } else n !== "" && (l[n] = c[n])
    }
    return l
}

function wi(i, l, a, c = null) {
    Xi(i, l, 7, [a, c])
}
const AA = $n();
let eA = 0;

function gA(i, l, a) {
    const c = i.type,
        n = (l ? l.appContext : i.appContext) || AA,
        A = {
            uid: eA++,
            vnode: i,
            type: c,
            parent: l,
            appContext: n,
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
            provides: l ? l.provides : Object.create(n.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: qn(c, n),
            emitsOptions: vn(c, n),
            emit: null,
            emitted: null,
            propsDefaults: Ai,
            inheritAttrs: c.inheritAttrs,
            ctx: Ai,
            data: Ai,
            props: Ai,
            attrs: Ai,
            slots: Ai,
            refs: Ai,
            setupState: Ai,
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
    }, A.root = l ? l.root : A, A.emit = Ns.bind(null, A), i.ce && i.ce(A), A
}
let ui = null,
    pc, dl, cn = "__VUE_INSTANCE_SETTERS__";
(dl = Qa()[cn]) || (dl = Qa()[cn] = []), dl.push(i => ui = i), pc = i => {
    dl.length > 1 ? dl.forEach(l => l(i)) : dl[0](i)
};
const Fl = i => {
        pc(i), i.scope.on()
    },
    Ol = () => {
        ui && ui.scope.off(), pc(null)
    };

function oo(i) {
    return i.vnode.shapeFlag & 4
}
let zl = !1;

function tA(i, l = !1) {
    zl = l;
    const {
        props: a,
        children: c
    } = i.vnode, n = oo(i);
    Zs(i, a, n, l), $s(i, c);
    const A = n ? RA(i, l) : void 0;
    return zl = !1, A
}

function RA(i, l) {
    const a = i.type;
    i.accessCache = Object.create(null), i.proxy = Vn(new Proxy(i.ctx, Ys));
    const {
        setup: c
    } = a;
    if (c) {
        const n = i.setupContext = c.length > 1 ? IA(i) : null;
        Fl(i), Vl();
        const A = nl(c, i, 0, [i.props, n]);
        if (Kl(), Ol(), Tn(A)) {
            if (A.then(Ol, Ol), l) return A.then(g => {
                nn(i, g, l)
            }).catch(g => {
                Ua(g, i, 0)
            });
            i.asyncDep = A
        } else nn(i, A, l)
    } else so(i, l)
}

function nn(i, l, a) {
    b(l) ? i.type.__ssrInlineRender ? i.ssrRender = l : i.render = l : ei(l) && (i.setupState = Yn(l)), so(i, a)
}
let on;

function so(i, l, a) {
    const c = i.type;
    if (!i.render) {
        if (!l && on && !c.render) {
            const n = c.template || Hc(i).template;
            if (n) {
                const {
                    isCustomElement: A,
                    compilerOptions: g
                } = i.appContext.config, {
                    delimiters: e,
                    compilerOptions: o
                } = c, L = Li(Li({
                    isCustomElement: A,
                    delimiters: e
                }, g), o);
                c.render = on(n, L)
            }
        }
        i.render = c.render || ki
    } {
        Fl(i), Vl();
        try {
            Ws(i)
        } finally {
            Kl(), Ol()
        }
    }
}

function EA(i) {
    return i.attrsProxy || (i.attrsProxy = new Proxy(i.attrs, {
        get(l, a) {
            return Di(i, "get", "$attrs"), l[a]
        }
    }))
}

function IA(i) {
    const l = a => {
        i.exposed = a || {}
    };
    return {
        get attrs() {
            return EA(i)
        },
        slots: i.slots,
        emit: i.emit,
        expose: l
    }
}

function Ka(i) {
    if (i.exposed) return i.exposeProxy || (i.exposeProxy = new Proxy(Yn(Vn(i.exposed)), {
        get(l, a) {
            if (a in l) return l[a];
            if (a in Zl) return Zl[a](i)
        },
        has(l, a) {
            return a in l || a in Zl
        }
    }))
}

function rA(i) {
    return b(i) && "__vccOpts" in i
}
const SA = (i, l) => ts(i, l, zl),
    TA = Symbol.for("v-scx"),
    NA = () => Ia(TA),
    OA = "3.3.13",
    LA = "http://www.w3.org/2000/svg",
    rl = typeof document < "u" ? document : null,
    sn = rl && rl.createElement("template"),
    CA = {
        insert: (i, l, a) => {
            l.insertBefore(i, a || null)
        },
        remove: i => {
            const l = i.parentNode;
            l && l.removeChild(i)
        },
        createElement: (i, l, a, c) => {
            const n = l ? rl.createElementNS(LA, i) : rl.createElement(i, a ? {
                is: a
            } : void 0);
            return i === "select" && c && c.multiple != null && n.setAttribute("multiple", c.multiple), n
        },
        createText: i => rl.createTextNode(i),
        createComment: i => rl.createComment(i),
        setText: (i, l) => {
            i.nodeValue = l
        },
        setElementText: (i, l) => {
            i.textContent = l
        },
        parentNode: i => i.parentNode,
        nextSibling: i => i.nextSibling,
        querySelector: i => rl.querySelector(i),
        setScopeId(i, l) {
            i.setAttribute(l, "")
        },
        insertStaticContent(i, l, a, c, n, A) {
            const g = a ? a.previousSibling : l.lastChild;
            if (n && (n === A || n.nextSibling))
                for (; l.insertBefore(n.cloneNode(!0), a), !(n === A || !(n = n.nextSibling)););
            else {
                sn.innerHTML = c ? `<svg>${i}</svg>` : i;
                const e = sn.content;
                if (c) {
                    const o = e.firstChild;
                    for (; o.firstChild;) e.appendChild(o.firstChild);
                    e.removeChild(o)
                }
                l.insertBefore(e, a)
            }
            return [g ? g.nextSibling : l.firstChild, a ? a.previousSibling : l.lastChild]
        }
    },
    uA = Symbol("_vtc");

function fA(i, l, a) {
    const c = i[uA];
    c && (l = (l ? [l, ...c] : [...c]).join(" ")), l == null ? i.removeAttribute("class") : a ? i.setAttribute("class", l) : i.className = l
}
const dA = Symbol("_vod"),
    MA = Symbol("");

function PA(i, l, a) {
    const c = i.style,
        n = Ni(a);
    if (a && !n) {
        if (l && !Ni(l))
            for (const A in l) a[A] == null && Ac(c, A, "");
        for (const A in a) Ac(c, A, a[A])
    } else {
        const A = c.display;
        if (n) {
            if (l !== a) {
                const g = c[MA];
                g && (a += ";" + g), c.cssText = a
            }
        } else l && i.removeAttribute("style");
        dA in i && (c.display = A)
    }
}
const An = /\s*!important$/;

function Ac(i, l, a) {
    if (X(a)) a.forEach(c => Ac(i, l, c));
    else if (a == null && (a = ""), l.startsWith("--")) i.setProperty(l, a);
    else {
        const c = GA(i, l);
        An.test(a) ? i.setProperty(hl(c), a.replace(An, ""), "important") : i[c] = a
    }
}
const en = ["Webkit", "Moz", "ms"],
    wa = {};

function GA(i, l) {
    const a = wa[l];
    if (a) return a;
    let c = Ul(l);
    if (c !== "filter" && c in i) return wa[l] = c;
    c = Ln(c);
    for (let n = 0; n < en.length; n++) {
        const A = en[n] + c;
        if (A in i) return wa[l] = A
    }
    return l
}
const gn = "http://www.w3.org/1999/xlink";

function DA(i, l, a, c, n) {
    if (c && l.startsWith("xlink:")) a == null ? i.removeAttributeNS(gn, l.slice(6, l.length)) : i.setAttributeNS(gn, l, a);
    else {
        const A = ho(l);
        a == null || A && !Cn(a) ? i.removeAttribute(l) : i.setAttribute(l, A ? "" : a)
    }
}

function HA(i, l, a, c, n, A, g) {
    if (l === "innerHTML" || l === "textContent") {
        c && g(c, n, A), i[l] = a ?? "";
        return
    }
    const e = i.tagName;
    if (l === "value" && e !== "PROGRESS" && !e.includes("-")) {
        i._value = a;
        const L = e === "OPTION" ? i.getAttribute("value") : i.value,
            S = a ?? "";
        L !== S && (i.value = S), a == null && i.removeAttribute(l);
        return
    }
    let o = !1;
    if (a === "" || a == null) {
        const L = typeof i[l];
        L === "boolean" ? a = Cn(a) : a == null && L === "string" ? (a = "", o = !0) : L === "number" && (a = 0, o = !0)
    }
    try {
        i[l] = a
    } catch {}
    o && i.removeAttribute(l)
}

function Sl(i, l, a, c) {
    i.addEventListener(l, a, c)
}

function UA(i, l, a, c) {
    i.removeEventListener(l, a, c)
}
const tn = Symbol("_vei");

function BA(i, l, a, c, n = null) {
    const A = i[tn] || (i[tn] = {}),
        g = A[l];
    if (c && g) g.value = c;
    else {
        const [e, o] = pA(l);
        if (c) {
            const L = A[l] = VA(c, n);
            Sl(i, e, L, o)
        } else g && (UA(i, e, g, o), A[l] = void 0)
    }
}
const Rn = /(?:Once|Passive|Capture)$/;

function pA(i) {
    let l;
    if (Rn.test(i)) {
        l = {};
        let c;
        for (; c = i.match(Rn);) i = i.slice(0, i.length - c[0].length), l[c[0].toLowerCase()] = !0
    }
    return [i[2] === ":" ? i.slice(3) : hl(i.slice(2)), l]
}
let _a = 0;
const FA = Promise.resolve(),
    hA = () => _a || (FA.then(() => _a = 0), _a = Date.now());

function VA(i, l) {
    const a = c => {
        if (!c._vts) c._vts = Date.now();
        else if (c._vts <= a.attached) return;
        Xi(KA(c, a.value), l, 5, [c])
    };
    return a.value = i, a.attached = hA(), a
}

function KA(i, l) {
    if (X(l)) {
        const a = i.stopImmediatePropagation;
        return i.stopImmediatePropagation = () => {
            a.call(i), i._stopped = !0
        }, l.map(c => n => !n._stopped && c && c(n))
    } else return l
}
const En = i => i.charCodeAt(0) === 111 && i.charCodeAt(1) === 110 && i.charCodeAt(2) > 96 && i.charCodeAt(2) < 123,
    mA = (i, l, a, c, n = !1, A, g, e, o) => {
        l === "class" ? fA(i, c, n) : l === "style" ? PA(i, a, c) : Ma(l) ? Ic(l) || BA(i, l, a, c, g) : (l[0] === "." ? (l = l.slice(1), !0) : l[0] === "^" ? (l = l.slice(1), !1) : YA(i, l, c, n)) ? HA(i, l, c, A, g, e, o) : (l === "true-value" ? i._trueValue = c : l === "false-value" && (i._falseValue = c), DA(i, l, c, n))
    };

function YA(i, l, a, c) {
    if (c) return !!(l === "innerHTML" || l === "textContent" || l in i && En(l) && b(a));
    if (l === "spellcheck" || l === "draggable" || l === "translate" || l === "form" || l === "list" && i.tagName === "INPUT" || l === "type" && i.tagName === "TEXTAREA") return !1;
    if (l === "width" || l === "height") {
        const n = i.tagName;
        if (n === "IMG" || n === "VIDEO" || n === "CANVAS" || n === "SOURCE") return !1
    }
    return En(l) && Ni(a) ? !1 : l in i
}
const ua = i => {
    const l = i.props["onUpdate:modelValue"] || !1;
    return X(l) ? a => ta(l, a) : l
};

function WA(i) {
    i.target.composing = !0
}

function In(i) {
    const l = i.target;
    l.composing && (l.composing = !1, l.dispatchEvent(new Event("input")))
}
const Hl = Symbol("_assign"),
    q = {
        created(i, {
            modifiers: {
                lazy: l,
                trim: a,
                number: c
            }
        }, n) {
            i[Hl] = ua(n);
            const A = c || n.props && n.props.type === "number";
            Sl(i, l ? "change" : "input", g => {
                if (g.target.composing) return;
                let e = i.value;
                a && (e = e.trim()), A && (e = Ta(e)), i[Hl](e)
            }), a && Sl(i, "change", () => {
                i.value = i.value.trim()
            }), l || (Sl(i, "compositionstart", WA), Sl(i, "compositionend", In), Sl(i, "change", In))
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
                number: n
            }
        }, A) {
            if (i[Hl] = ua(A), i.composing) return;
            const g = n || i.type === "number" ? Ta(i.value) : i.value,
                e = l ?? "";
            g !== e && (document.activeElement === i && i.type !== "range" && (a || c && i.value.trim() === e) || (i.value = e))
        }
    },
    ba = {
        deep: !0,
        created(i, {
            value: l,
            modifiers: {
                number: a
            }
        }, c) {
            const n = Pa(l);
            Sl(i, "change", () => {
                const A = Array.prototype.filter.call(i.options, g => g.selected).map(g => a ? Ta(fa(g)) : fa(g));
                i[Hl](i.multiple ? n ? new Set(A) : A : A[0])
            }), i[Hl] = ua(c)
        },
        mounted(i, {
            value: l
        }) {
            rn(i, l)
        },
        beforeUpdate(i, l, a) {
            i[Hl] = ua(a)
        },
        updated(i, {
            value: l
        }) {
            rn(i, l)
        }
    };

function rn(i, l) {
    const a = i.multiple;
    if (!(a && !X(l) && !Pa(l))) {
        for (let c = 0, n = i.options.length; c < n; c++) {
            const A = i.options[c],
                g = fa(A);
            if (a) X(l) ? A.selected = Ko(l, g) > -1 : A.selected = l.has(g);
            else if (Da(fa(A), l)) {
                i.selectedIndex !== c && (i.selectedIndex = c);
                return
            }
        }!a && i.selectedIndex !== -1 && (i.selectedIndex = -1)
    }
}

function fa(i) {
    return "_value" in i ? i._value : i.value
}
const yA = Li({
    patchProp: mA
}, CA);
let Sn;

function JA() {
    return Sn || (Sn = qs(yA))
}
const XA = (...i) => {
    const l = JA().createApp(...i),
        {
            mount: a
        } = l;
    return l.mount = c => {
        const n = vA(c);
        if (!n) return;
        const A = l._component;
        !b(A) && !A.render && !A.template && (A.template = n.innerHTML), n.innerHTML = "";
        const g = a(n, !1, n instanceof SVGElement);
        return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")), g
    }, l
};

function vA(i) {
    return Ni(i) ? document.querySelector(i) : i
}
const wA = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20448%20512'%3e%3c!--!Font%20Awesome%20Free%206.5.1%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202024%20Fonticons,%20Inc.--%3e%3cpath%20fill='white'%20d='M0%2096C0%2078.3%2014.3%2064%2032%2064H416c17.7%200%2032%2014.3%2032%2032s-14.3%2032-32%2032H32C14.3%20128%200%20113.7%200%2096zM0%20256c0-17.7%2014.3-32%2032-32H416c17.7%200%2032%2014.3%2032%2032s-14.3%2032-32%2032H32c-17.7%200-32-14.3-32-32zM448%20416c0%2017.7-14.3%2032-32%2032H32c-17.7%200-32-14.3-32-32s14.3-32%2032-32H416c17.7%200%2032%2014.3%2032%2032z'/%3e%3c/svg%3e";
let Ao = null;

function ec() {
    return Ao
}

function da(i) {
    Ao = i
}
let eo = 0;

function _A() {
    return eo
}

function bA() {
    eo++
}
let go = "";

function Fi() {
    return go
}

function Za(i) {
    go = i
}
let to = "";

function ZA() {
    return to
}

function ka(i) {
    to = i
}
let Ro = "";

function gi() {
    return Ro
}

function xa(i) {
    Ro = i
}
let Eo = "";

function kA() {
    return Eo
}

function xA(i) {
    Eo = i
}
let mi = ci("Alfa"),
    Io = null;

function $A(i) {
    Io = i
}

function Wi() {
    return Io
}
let ro = "";

function gc(i) {
    ro = i
}

function QA() {
    return ro
}
let So = "";

function tc(i) {
    So = i
}

function qA() {
    return So
}

function jA(i) {
    console.log(i)
}
let Bi = ci(!1),
    To = "0.4.3",
    zA = To,
    No = {
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
    Rl = Object.keys(No);

function $a(i) {
    return No[i]
}
const Oo = [{
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
    ie = [{
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
let Pi = ci("");
fetch("https://raw.githubusercontent.com/FormicAcidGD/fsm/master/backend").then(i => {
    i.text().then(l => {
        Pi.value = l
    })
});
async function le() {
    let i = await fetch(Pi.value + "/plans", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: Fi()
        }
    });
    return i.status != 200 ? (Bi.value = !1, []) : await i.json()
}
async function ae() {
    let i = await fetch(Pi.value + "/pdc", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: Fi()
        }
    });
    return i.status != 200 ? (Bi.value = !1, []) : await i.json()
}
async function Lo() {
    let i = await fetch(Pi.value + "/atis", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: Fi()
        }
    });
    return i.status != 200 ? (Bi.value = !1, []) : await i.json()
}
async function ce() {
    let i = await fetch(Pi.value + "/settings", {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: Fi()
        }
    });
    return i.status != 200 ? (Bi.value = !1, {}) : await i.json()
}
async function xl(i) {
    await fetch(Pi.value + "/change", {
        method: "POST",
        body: JSON.stringify(i),
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: Fi()
        }
    })
}
async function Co(i) {
    await fetch(Pi.value + "/hide", {
        method: "POST",
        body: JSON.stringify(i),
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: Fi()
        }
    })
}
const ne = ["value"],
    oe = {
        class: "name"
    },
    se = ["src"],
    Ae = {
        class: "age"
    },
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
    de = ["selected"],
    Me = ["selected"],
    Pe = ml({
        __name: "Aircraft",
        props: {
            aircraft: {},
            type: {}
        },
        setup(i) {
            let l = ci();
            ci();
            let a = {},
                c = {};
            Oo.forEach(M => {
                a[M.icao] = M.callsign, c[M.callsign.toUpperCase().replace(" ", "").trim()] = M.icao
            });

            function n(M) {
                var R;
                !M.ctrlKey && !confirm(`Hide "${g.aircraft.callsign}"?`) || (g.aircraft.hidden = !0, Co({
                    id: g.aircraft.id,
                    roomSecret: Fi(),
                    user_secret: ((R = Wi()) == null ? void 0 : R.secret) ?? ""
                }))
            }

            function A(M) {
                let R = M + "=",
                    v = decodeURIComponent(document.cookie).split(";");
                for (let j = 0; j < v.length; j++) {
                    let W = v[j];
                    for (; W.charAt(0) == " ";) W = W.substring(1);
                    if (W.indexOf(R) == 0) return W.substring(R.length, W.length)
                }
                return ""
            }
            let g = i,
                e = ci(g.aircraft),
                o = (M, R) => {
                    var v;
                    let C = {
                        id: M.id,
                        roomSecret: Fi(),
                        user_secret: ((v = Wi()) == null ? void 0 : v.secret) ?? ""
                    };
                    return R == "acft" && (C.type = M.type), R == "alt" && (C.altitude = M.altitude), R == "arriving" && (C.arriving = M.arriving), R == "callsign" && (C.callsign = M.callsign), R == "departing" && (C.departing = M.departing), R == "free" && (C.free = M.free), R == "gate" && (C.gate = M.gate), R == "route" && (C.route = M.route), R == "runway" && (C.runway = M.runway), R == "squawk" && (C.squawk = M.squawk), R == "status" && (C.status = M.status), R == "a_alt" && (C.a_alt = M.a_alt), R == "a_hdg" && (C.a_hdg = M.a_hdg), xl(C), M
                };

            function L(M) {
                da({
                    id: e.value.id,
                    selectionType: M
                })
            }

            function S(M) {
                let R = ec();
                R != null && R.id == e.value.id && R.selectionType == M && da(null)
            }

            function t() {
                e.value.squawk.toLowerCase() == "r" && (e.value.squawk = `${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}`), o(e.value, "squawk")
            }

            function T() {
                e.value.a_hdg == "l" && (e.value.a_hdg = "LNAV"), o(e.value, "a_hdg")
            }
            let P = ci(!0);

            function K() {
                if (A("call") != "true") return e.value.callsign;
                let R = e.value.callsign.toUpperCase().replace("-", "").replace(/\(.*?\)/, "").replace("HEAVY", "").replace("SUPER", "").replace("/H", "").replace("AIRLINES", "").replace("AIRLINE", "").replace("AIR", "").replace("AER", "").replace(/\W+/g, "").trim();
                if ("1234567890".includes(R[1]) || "1234567890".includes(R[2]) || !/.*\d.*?/.test(R) || (R = R.replace(/H$/, "").replace(/S$/, ""), a[R.substring(0, 3)] != null && R.length > 3 && "1234567890".includes(R[3]))) return R;
                let j = R.match(/^([A-Z]+)(.*)$/) ?? ["", "", ""],
                    W = ie.find(ni => ni.name.toUpperCase().trim() == j[1]);
                if (W != null) return W.icao + j[2];
                let Oi = c[j[1]];
                return Oi != null ? Oi + j[2] : (P.value = !1, R + " (NP)")
            }
            return (M, R) => (D(), p("div", {
                class: Ki(["aircraft", M.type]),
                onMouseenter: R[67] || (R[67] = C => s(xA)(s(e).id))
            }, [E("input", {
                type: "text",
                placeholder: "Callsign",
                class: "callsign",
                rows: "2",
                value: K(),
                onChange: R[0] || (R[0] = C => {
                    s(e).callsign = C.currentTarget.value, s(o)(s(e), "callsign")
                }),
                onFocus: R[1] || (R[1] = C => L("callsign")),
                onBlur: R[2] || (R[2] = C => S("callsign")),
                onKeyup: R[3] || (R[3] = C => s(o)(s(e), "callsign"))
            }, null, 40, ne), E("div", oe, [s(e).avatar != "" ? (D(), p("img", {
                key: 0,
                src: `https://cdn.discordapp.com/avatars/${s(e).userid}/${s(e).avatar}.webp`,
                class: "avatar"
            }, null, 8, se)) : Z("", !0), E("p", null, H(s(e).username), 1), E("p", Ae, H(new Date(Date.now() - new Date(s(e).age).getTime() - 6e4).getUTCHours()) + "h " + H(new Date(Date.now() - new Date(s(e).age).getTime() - 6e4).getUTCMinutes()) + "m ago", 1)]), $(E("input", {
                type: "text",
                placeholder: "Departing",
                class: "departing",
                "onUpdate:modelValue": R[4] || (R[4] = C => s(e).departing = C),
                onChange: R[5] || (R[5] = C => s(o)(s(e), "departing")),
                onFocus: R[6] || (R[6] = C => L("departing")),
                onBlur: R[7] || (R[7] = C => S("departing")),
                onKeyup: R[8] || (R[8] = C => s(o)(s(e), "departing"))
            }, null, 544), [
                [q, s(e).departing]
            ]), $(E("input", {
                type: "text",
                placeholder: "Arriving",
                class: "arriving",
                "onUpdate:modelValue": R[9] || (R[9] = C => s(e).arriving = C),
                onChange: R[10] || (R[10] = C => s(o)(s(e), "arriving")),
                onFocus: R[11] || (R[11] = C => L("arriving")),
                onBlur: R[12] || (R[12] = C => S("arriving")),
                onKeyup: R[13] || (R[13] = C => s(o)(s(e), "arriving"))
            }, null, 544), [
                [q, s(e).arriving]
            ]), $(E("input", {
                type: "text",
                placeholder: "Filed Altitude",
                class: "altitude",
                "onUpdate:modelValue": R[14] || (R[14] = C => s(e).altitude = C),
                onChange: R[15] || (R[15] = C => s(o)(s(e), "alt")),
                onFocus: R[16] || (R[16] = C => L("alt")),
                onBlur: R[17] || (R[17] = C => S("alt")),
                onKeyup: R[18] || (R[18] = C => s(o)(s(e), "alt"))
            }, null, 544), [
                [q, s(e).altitude]
            ]), $(E("input", {
                type: "text",
                placeholder: "Gate",
                class: "gate",
                "onUpdate:modelValue": R[19] || (R[19] = C => s(e).gate = C),
                onChange: R[20] || (R[20] = C => s(o)(s(e), "gate")),
                onFocus: R[21] || (R[21] = C => L("gate")),
                onBlur: R[22] || (R[22] = C => S("gate")),
                onKeyup: R[23] || (R[23] = C => s(o)(s(e), "gate"))
            }, null, 544), [
                [q, s(e).gate]
            ]), $(E("input", {
                type: "text",
                placeholder: "Squawk",
                ref_key: "squawk",
                ref: l,
                class: "squawk",
                "onUpdate:modelValue": R[24] || (R[24] = C => s(e).squawk = C),
                onChange: t,
                onFocus: R[25] || (R[25] = C => L("squawk")),
                onBlur: R[26] || (R[26] = C => S("squawk")),
                onKeyup: t
            }, null, 544), [
                [q, s(e).squawk]
            ]), $(E("input", {
                type: "text",
                placeholder: "Aircraft",
                class: "type",
                "onUpdate:modelValue": R[27] || (R[27] = C => s(e).type = C),
                onChange: R[28] || (R[28] = C => s(o)(s(e), "acft")),
                onFocus: R[29] || (R[29] = C => L("acft")),
                onBlur: R[30] || (R[30] = C => S("acft")),
                onKeyup: R[31] || (R[31] = C => s(o)(s(e), "acft"))
            }, null, 544), [
                [q, s(e).type]
            ]), s(g).type == "outbound" || s(g).type == "outbound_td" ? $((D(), p("select", {
                key: 0,
                class: "status",
                onChange: R[32] || (R[32] = C => s(o)(s(e), "status")),
                onFocus: R[33] || (R[33] = C => L("status")),
                onBlur: R[34] || (R[34] = C => S("status")),
                "onUpdate:modelValue": R[35] || (R[35] = C => s(e).status = C)
            }, [E("option", {
                selected: s(e).status == "PARKED"
            }, "PARKED", 8, ee), E("option", {
                selected: s(e).status == "CLEARED"
            }, "CLEARED", 8, ge), E("option", {
                selected: s(e).status == "PUSH"
            }, "PUSH", 8, te), E("option", {
                selected: s(e).status == "TAXI"
            }, "TAXI", 8, Re), E("option", {
                selected: s(e).status == "HOLDING"
            }, "HOLDING", 8, Ee), E("option", {
                selected: s(e).status == "LINEUP"
            }, "LINEUP", 8, Ie), E("option", {
                selected: s(e).status == "TAKEOFF"
            }, "TAKEOFF", 8, re)], 544)), [
                [ba, s(e).status]
            ]) : Z("", !0), s(g).type == "inbound" || s(g).type == "inbound_td" ? $((D(), p("select", {
                key: 1,
                class: "status",
                onChange: R[36] || (R[36] = C => s(o)(s(e), "status")),
                onFocus: R[37] || (R[37] = C => L("status")),
                onBlur: R[38] || (R[38] = C => S("status")),
                "onUpdate:modelValue": R[39] || (R[39] = C => s(e).status = C)
            }, [E("option", {
                selected: s(e).status == "LANDING"
            }, "LANDING", 8, Se), E("option", {
                selected: s(e).status == "TAXI"
            }, "TAXI", 8, Te), E("option", {
                selected: s(e).status == "PARKED"
            }, "PARKED", 8, Ne)], 544)), [
                [ba, s(e).status]
            ]) : Z("", !0), s(g).type == "vfr" || s(g).type == "vfr_td" ? $((D(), p("select", {
                key: 2,
                class: "status",
                onChange: R[40] || (R[40] = C => s(o)(s(e), "status")),
                onFocus: R[41] || (R[41] = C => L("status")),
                onBlur: R[42] || (R[42] = C => S("status")),
                "onUpdate:modelValue": R[43] || (R[43] = C => s(e).status = C)
            }, [E("option", {
                selected: s(e).status == "PARKED"
            }, "PARKED", 8, Oe), E("option", {
                selected: s(e).status == "TAXI"
            }, "TAXI", 8, Le), E("option", {
                selected: s(e).status == "HOLDING"
            }, "HOLDING", 8, Ce), E("option", {
                selected: s(e).status == "LEFT CIRCUIT"
            }, "LEFT CIRCUIT", 8, ue), E("option", {
                selected: s(e).status == "RIGHT CIRCUIT"
            }, "RIGHT CIRCUIT", 8, fe), E("option", {
                selected: s(e).status == "VFR"
            }, "VFR", 8, de), E("option", {
                selected: s(e).status == "LANDING"
            }, "LANDING", 8, Me)], 544)), [
                [ba, s(e).status]
            ]) : Z("", !0), $(E("input", {
                type: "text",
                placeholder: "Route",
                class: "route",
                "onUpdate:modelValue": R[44] || (R[44] = C => s(e).route = C),
                onChange: R[45] || (R[45] = C => s(o)(s(e), "route")),
                onFocus: R[46] || (R[46] = C => L("route")),
                onBlur: R[47] || (R[47] = C => S("route")),
                onKeyup: R[48] || (R[48] = C => s(o)(s(e), "route"))
            }, null, 544), [
                [q, s(e).route]
            ]), M.type != "overflying" ? $((D(), p("input", {
                key: 3,
                type: "text",
                placeholder: "Runway",
                class: "runway",
                "onUpdate:modelValue": R[49] || (R[49] = C => s(e).runway = C),
                onChange: R[50] || (R[50] = C => s(o)(s(e), "runway")),
                onFocus: R[51] || (R[51] = C => L("runway")),
                onBlur: R[52] || (R[52] = C => S("runway")),
                onKeyup: R[53] || (R[53] = C => s(o)(s(e), "runway"))
            }, null, 544)), [
                [q, s(e).runway]
            ]) : Z("", !0), $(E("input", {
                type: "text",
                placeholder: "Free Text",
                class: "free",
                "onUpdate:modelValue": R[54] || (R[54] = C => s(e).free = C),
                onChange: R[55] || (R[55] = C => s(o)(s(e), "free")),
                onFocus: R[56] || (R[56] = C => L("free")),
                onBlur: R[57] || (R[57] = C => S("free")),
                onKeyup: R[58] || (R[58] = C => s(o)(s(e), "free"))
            }, null, 544), [
                [q, s(e).free]
            ]), $(E("input", {
                type: "text",
                placeholder: "Asg. Altitude",
                class: "a_altitude",
                "onUpdate:modelValue": R[59] || (R[59] = C => s(e).a_alt = C),
                onChange: R[60] || (R[60] = C => s(o)(s(e), "a_alt")),
                onFocus: R[61] || (R[61] = C => L("a_alt")),
                onBlur: R[62] || (R[62] = C => S("a_alt")),
                onKeyup: R[63] || (R[63] = C => s(o)(s(e), "a_alt"))
            }, null, 544), [
                [q, s(e).a_alt]
            ]), $(E("input", {
                type: "text",
                placeholder: "Asg. Heading",
                class: "a_heading",
                "onUpdate:modelValue": R[64] || (R[64] = C => s(e).a_hdg = C),
                onChange: T,
                onFocus: R[65] || (R[65] = C => L("a_hdg")),
                onBlur: R[66] || (R[66] = C => S("a_hdg")),
                onKeyup: T
            }, null, 544), [
                [q, s(e).a_hdg]
            ]), E("button", {
                class: "delete",
                onClick: n
            }, "Hide")], 34))
        }
    }),
    Yl = (i, l) => {
        const a = i.__vccOpts || i;
        for (const [c, n] of l) a[c] = n;
        return a
    },
    El = Yl(Pe, [
        ["__scopeId", "data-v-4570f81f"]
    ]);

function Ge() {
    return Ri("IGAR")
}

function uo() {
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
    return uo().forEach(c => {
        l || c.code == i && (a = c, l = !0)
    }), a ?? Ge()
}
const De = ["placeholder"],
    He = {
        key: 0
    },
    Ue = ["onClick"],
    Be = {
        key: 0
    },
    pe = {
        key: 0,
        class: "arrowed"
    },
    Fe = {
        key: 1
    },
    he = {
        key: 1
    },
    Ve = {
        key: 0,
        class: "arrowed"
    },
    Ke = {
        key: 1
    },
    me = ml({
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
                n = ci(a.items),
                A = ci(!1);
            mi.value = a.value ?? "";
            let g = ci(!1),
                e = ci(0);
            a.value != null && o();

            function o() {
                a.filter ? n.value = a.items.filter(a.filter) : n.value = a.items.filter(t => t.toLowerCase().includes(mi.value.toLowerCase())), n.value.length != 0 && (e.value = e.value % n.value.length)
            }

            function L(t) {
                A.value = !1, g.value = !1, mi.value = t, o(), c("change", mi.value)
            }

            function S(t) {
                if (A.value) switch (t.code) {
                    case "ArrowUp":
                        if (n.value.length == 0) return;
                        e.value = (e.value - 1 + n.value.length) % n.value.length;
                        break;
                    case "ArrowDown":
                        if (n.value.length == 0) return;
                        e.value = (e.value + 1) % n.value.length;
                        break;
                    case "Enter":
                    case "Tab":
                        if (n.value.length == 0) return;
                        L(n.value[e.value]);
                        break
                }
            }
            return Gc(() => {
                window.addEventListener("keydown", S)
            }), Dc(() => {
                window.removeEventListener("keydown", S)
            }), (t, T) => (D(), p("div", null, [$(E("input", {
                type: "text",
                "onUpdate:modelValue": T[0] || (T[0] = P => ti(mi) ? mi.value = P : null),
                onInput: o,
                placeholder: s(a).placeholder,
                onFocus: T[1] || (T[1] = P => {
                    ti(A) ? A.value = !0 : A = !0, P.target.select()
                }),
                onBlur: T[2] || (T[2] = P => ti(A) ? A.value = !1 : A = !1)
            }, null, 40, De), [
                [q, s(mi)]
            ]), s(A) || s(g) ? (D(), p("ul", He, [(D(!0), p(si, null, Mi(s(n), (P, K) => (D(), p("li", {
                key: P,
                onClick: M => L(P),
                onMouseover: T[3] || (T[3] = M => ti(g) ? g.value = !0 : g = !0),
                onMouseleave: T[4] || (T[4] = M => ti(g) ? g.value = !1 : g = !1),
                style: la({
                    width: t.width != null ? `${t.width}vw` : "inherit"
                })
            }, [t.displayText != null ? (D(), p("div", Be, [K == s(e) ? (D(), p("p", pe, H(t.displayText(P)), 1)) : (D(), p("p", Fe, H(t.displayText(P)), 1))])) : (D(), p("div", he, [K == s(e) ? (D(), p("p", Ve, H(P), 1)) : (D(), p("p", Ke, H(P), 1))]))], 44, Ue))), 128))])) : Z("", !0)]))
        }
    }),
    Ye = Yl(me, [
        ["__scopeId", "data-v-5b42320c"]
    ]),
    Ei = i => (Mc("data-v-051d0255"), i = i(), Pc(), i),
    We = {
        class: "body"
    },
    ye = {
        class: "vflex options"
    },
    Je = {
        class: "hflex"
    },
    Xe = {
        class: "hflex"
    },
    ve = ["checked"],
    we = Ei(() => E("p", null, "Display Zulu Time", -1)),
    _e = ["checked"],
    be = Ei(() => E("p", null, "Display Boxes", -1)),
    Ze = ["checked"],
    ke = Ei(() => E("p", null, "Full Phonetic Name", -1)),
    xe = ["checked"],
    $e = Ei(() => E("p", null, "Abbreviation", -1)),
    Qe = {
        class: "hflex"
    },
    qe = {
        class: "hflex boxed half"
    },
    je = Ei(() => E("p", null, "Dashes", -1)),
    ze = ["checked"],
    ig = Ei(() => E("p", null, "Allow Emergencies", -1)),
    lg = ["checked"],
    ag = Ei(() => E("p", null, "Prefer SIDs/STARs", -1)),
    cg = ["checked"],
    ng = Ei(() => E("p", null, "Bold Text", -1)),
    og = {
        class: "hflex"
    },
    sg = {
        class: "hflex smallgap"
    },
    Ag = ["value", "selected"],
    eg = {
        class: "hflex smallgap"
    },
    gg = ["checked"],
    tg = Ei(() => E("p", null, "Ground Controller", -1)),
    Rg = {
        class: "hflex"
    },
    Eg = {
        class: "hflex smallgap"
    },
    Ig = Ei(() => E("div", {
        class: "boxed medium hflex"
    }, [E("p", null, "Max Taxi Speed")], -1)),
    rg = {
        class: "hflex smallgap"
    },
    Sg = ["selected"],
    Tg = ["selected"],
    Ng = {
        class: "hflex"
    },
    Og = {
        class: "hflex"
    },
    Lg = {
        class: "hflex smallgap"
    },
    Cg = ["checked"],
    ug = Ei(() => E("p", null, "Speed Restriction", -1)),
    fg = {
        class: "hflex smallgap"
    },
    dg = {
        class: "td"
    },
    Mg = {
        class: "hflex"
    },
    Pg = ["onClick"],
    Gg = ["checked"],
    Dg = Ei(() => E("div", {
        class: "vflex boxed long"
    }, [E("div", {
        class: "hflex long"
    }, [E("p", null, "Ground state on Initial Contact")])], -1)),
    Hg = {
        class: "hflex smallgap"
    },
    Ug = ["checked"],
    Bg = Ei(() => E("p", null, "Stand Number", -1)),
    pg = ["checked"],
    Fg = Ei(() => E("p", null, "Aircraft type", -1)),
    hg = Ei(() => E("div", {
        class: "vflex boxed long"
    }, [E("div", {
        class: "hflex long"
    }, [E("p", null, "Airborne state on Initial Contact")])], -1)),
    Vg = {
        class: "hflex"
    },
    Kg = ["checked"],
    mg = Ei(() => E("p", null, "Aircraft Type", -1)),
    Yg = ["checked"],
    Wg = Ei(() => E("p", null, "Altitude", -1)),
    yg = ["checked"],
    Jg = Ei(() => E("p", null, "Airspeed", -1)),
    Xg = ["checked"],
    vg = Ei(() => E("p", null, "Heading", -1)),
    wg = Ei(() => E("div", {
        class: "vflex boxed long"
    }, [E("div", {
        class: "hflex long"
    }, [E("p", null, "Charts")])], -1)),
    _g = {
        class: "hflex"
    },
    bg = ["value", "selected"],
    Zg = ["selected"],
    kg = {
        key: 0,
        class: "hflex half boxed"
    },
    xg = Ei(() => E("p", null, "Chart Pack Author", -1)),
    $g = [xg],
    Qg = {
        class: "hflex"
    },
    qg = {
        key: 0,
        class: "hflex half boxed"
    },
    jg = Ei(() => E("p", null, "Chart Pack Link", -1)),
    zg = [jg],
    it = Ei(() => E("div", {
        class: "vflex boxed long"
    }, [E("div", {
        class: "hflex long"
    }, [E("p", null, "Additional NOTAMS")])], -1)),
    lt = {
        class: "hflex"
    },
    at = {
        class: "vflex"
    },
    ct = ml({
        __name: "AtisGen",
        setup(i) {
            let l = ci(null);

            function a(S) {
                var T;
                let t = {
                    id: "-1",
                    roomSecret: Fi(),
                    user_secret: ((T = Wi()) == null ? void 0 : T.secret) ?? ""
                };
                S == "information" && (t.atis_information = o.information), S == "zuluTime" && (t.atis_zuluTime = o.zuluTime), S == "boxes" && (t.atis_boxes = o.boxes), S == "phoneticAbbr" && (t.atis_phoneticAbbr = o.phoneticAbbr), S == "dashes" && (t.atis_dashes = o.dashes), S == "hasGround" && (t.atis_hasGround = o.hasGround), S == "towerCallsign" && (t.atis_towerCallsign = o.towerCallsign), S == "towerFrequency" && (t.atis_towerFrequency = o.towerFrequency, tc(o.towerFrequency)), S == "groundFrequency" && (t.atis_groundFrequency = o.groundFrequency), S == "taxiSpeed" && (t.atis_taxiSpeed = o.taxiSpeed), S == "depRunways" && (t.atis_depRunways = o.depRunways), S == "arrRunways" && (t.atis_arrRunways = o.arrRunways), S == "pressure" && (t.atis_pressure = o.pressure), S == "chartAuthor" && (t.atis_chartAuthor = o.chartAuthor, gc(o.chartAuthor)), S == "chartLink" && (t.atis_chartLink = o.chartLink), S == "emergencies" && (t.atis_emergencies = o.emergencies), S == "topDown" && (t.atis_topDown = o.topDown), S == "topDownText" && (t.atis_topDownText = o.topDownText), S == "groundedType" && (t.atis_groundedType = o.groundedType), S == "groundedStand" && (t.atis_groundedStand = o.groundedStand), S == "airborneType" && (t.atis_airborneType = o.airborneType), S == "airborneAlt" && (t.atis_airborneAlt = o.airborneAlt), S == "airborneHeading" && (t.atis_airborneHeading = o.airborneHeading), S == "airborneSpeed" && (t.atis_airborneSpeed = o.airborneSpeed), S == "speed" && (t.atis_speed = o.speed), S == "speedLimit" && (t.atis_speedLimit = o.speedLimit), S == "extraNotams" && (t.atis_extraNotams = o.extraNotams), S == "sids" && (t.atis_sids = o.sids), S == "customCharts" && (t.atis_customCharts = o.customCharts), S == "useQNH" && (t.atis_useQNH = o.useQNH), S == "markdown" && (t.atis_markdown = o.markdown), xl(t)
            }

            function c(S) {
                o.topDowns[S] = !o.topDowns[S], o.topDownText = Object.keys(o.topDowns).filter(t => o.topDowns[t] == !0).map(t => Ri(gi()).topDowns[Number(t)]).join(", ").replace(/,\W$/, ""), Object.keys(o.topDowns).filter(t => o.topDowns[t] == !0).length > 0 ? o.topDown = !0 : o.topDown = !1, a("topDown"), a("topDownText")
            }

            function n(S) {
                let t = S.currentTarget.value;
                if (t == "custom") o.customCharts = !0, o.chartAuthor = "", o.chartLink = "";
                else {
                    o.customCharts = !1;
                    let T = JSON.parse(t);
                    o.chartAuthor = T.author, o.chartLink = T.link
                }
                a("customCharts"), a("chartAuthor"), a("chartLink")
            }

            function A(S) {
                S.currentTarget.value == "hpa" && !o.useQNH ? (o.pressure = Math.round(o.pressure * 33.863889532610884 * 100) / 100, o.useQNH = !0) : o.useQNH && (o.pressure = Math.round(o.pressure * .02952998057228486 * 100) / 100, o.useQNH = !1), a("useQNH")
            }

            function g() {
                let S = Rl.indexOf(o.information);
                S = (S + 1) % Rl.length, o.information = Rl[S], mi.value = Rl[S], a("information")
            }

            function e() {
                let S = Math.floor(Math.random() * 26);
                o.information = Rl[S], mi.value = Rl[S], a("information")
            }
            let o = cl({
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
            async function L() {
                let S = await Lo();
                Object.keys(S).forEach(t => {
                    t == "information" && (mi.value = S[t]), t == "chartAuthor" && gc(S[t]), t == "towerFrequency" && tc(S[t]), o[t] = S[t], t == "topDownText" && (o.topDowns[0] = !1, o.topDowns[1] = !1, o.topDowns[2] = !1, o.topDowns[3] = !1, o.topDowns[4] = !1, S[t].split(", ").forEach(T => {
                        var P;
                        o.topDowns[(P = Ri(gi()).topDowns) == null ? void 0 : P.indexOf(T)] = !0
                    }), jA(S[t].split(", ")))
                })
            }
            return setInterval(L, 2500), L(), (S, t) => (D(), p("div", We, [E("div", ye, [E("div", Je, [pi(Ye, {
                value: s(mi),
                placeholder: "Information",
                items: s(Rl),
                "display-text": T => `${T} (${s($a)(T)})`,
                onChange: t[0] || (t[0] = T => {
                    s(o).information = T, a("information")
                })
            }, null, 8, ["value", "items", "display-text"]), E("button", {
                onClick: g
            }, "Next Information"), E("button", {
                onClick: e
            }, "Random Information")]), E("div", Xe, [E("div", {
                class: "hflex boxed half",
                onClick: t[1] || (t[1] = T => {
                    s(o).zuluTime = !s(o).zuluTime, a("zuluTime")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).zuluTime
            }, null, 8, ve), we]), E("div", {
                class: "hflex boxed half",
                onClick: t[2] || (t[2] = T => {
                    s(o).boxes = !s(o).boxes, a("boxes")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).boxes
            }, null, 8, _e), be]), E("div", {
                class: "hflex boxed half",
                name: "info",
                onClick: t[3] || (t[3] = T => {
                    s(o).phoneticAbbr = !1, a("phoneticAbbr")
                })
            }, [E("input", {
                type: "radio",
                checked: !s(o).phoneticAbbr
            }, null, 8, Ze), ke]), E("div", {
                class: "hflex boxed half",
                name: "info",
                onClick: t[4] || (t[4] = T => {
                    s(o).phoneticAbbr = !0, a("phoneticAbbr")
                })
            }, [E("input", {
                type: "radio",
                checked: s(o).phoneticAbbr
            }, null, 8, xe), $e])]), E("div", Qe, [E("div", qe, [$(E("input", {
                type: "range",
                min: "10",
                max: "50",
                "onUpdate:modelValue": t[5] || (t[5] = T => s(o).dashes = T),
                style: {
                    width: "5vw"
                },
                onChange: t[6] || (t[6] = T => a("dashes"))
            }, null, 544), [
                [q, s(o).dashes]
            ]), je]), E("div", {
                class: "hflex boxed half",
                onClick: t[7] || (t[7] = T => {
                    s(o).emergencies = !s(o).emergencies, a("emergencies")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).emergencies
            }, null, 8, ze), ig]), E("div", {
                class: "hflex boxed half",
                onClick: t[8] || (t[8] = T => {
                    s(o).sids = !s(o).sids, a("sids")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).sids
            }, null, 8, lg), ag]), E("div", {
                class: "hflex boxed half",
                onClick: t[9] || (t[9] = T => {
                    s(o).markdown = !s(o).markdown, a("markdown")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).markdown
            }, null, 8, cg), ng])]), E("div", og, [E("div", sg, [E("select", {
                onChange: t[10] || (t[10] = T => {
                    s(o).towerCallsign = T.currentTarget.value, a("towerCallsign")
                })
            }, [(D(!0), p(si, null, Mi(s(Ri)(s(o).airport).towerCallsigns, T => (D(), p("option", {
                value: T,
                selected: s(o).towerCallsign == T
            }, H(T), 9, Ag))), 256))], 32), $(E("input", {
                type: "text",
                placeholder: "Tower Frequency",
                "onUpdate:modelValue": t[11] || (t[11] = T => s(o).towerFrequency = T),
                class: "shortened",
                onChange: t[12] || (t[12] = T => {
                    a("towerFrequency")
                }),
                onKeyup: t[13] || (t[13] = T => {
                    a("towerFrequency")
                })
            }, null, 544), [
                [q, s(o).towerFrequency]
            ])]), E("div", eg, [s(Ri)(s(o).airport).hasGround ? (D(), p("div", {
                key: 0,
                class: "hflex medium boxed",
                onClick: t[14] || (t[14] = T => {
                    s(o).hasGround = !s(o).hasGround, a("hasGround")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).hasGround
            }, null, 8, gg), tg])) : Z("", !0), s(o).hasGround && s(Ri)(s(o).airport).hasGround ? $((D(), p("input", {
                key: 1,
                type: "text",
                class: "shortened",
                placeholder: "Ground Frequency",
                "onUpdate:modelValue": t[15] || (t[15] = T => s(o).groundFrequency = T),
                onChange: t[16] || (t[16] = T => {
                    a("groundFrequency")
                }),
                onKeyup: t[17] || (t[17] = T => {
                    a("groundFrequency")
                })
            }, null, 544)), [
                [q, s(o).groundFrequency]
            ]) : Z("", !0)])]), E("div", Rg, [E("div", Eg, [Ig, $(E("input", {
                type: "number",
                "onUpdate:modelValue": t[18] || (t[18] = T => s(o).taxiSpeed = T),
                class: "shortened",
                placeholder: "Max Taxi Speed",
                onChange: t[19] || (t[19] = T => {
                    a("taxiSpeed")
                }),
                onKeyup: t[20] || (t[20] = T => {
                    a("taxiSpeed")
                })
            }, null, 544), [
                [q, s(o).taxiSpeed]
            ])]), E("div", rg, [E("select", {
                onChange: A
            }, [E("option", {
                value: "hpa",
                selected: s(o).useQNH
            }, "QNH (hPa)", 8, Sg), E("option", {
                value: "inhg",
                selected: !s(o).useQNH
            }, "Altimeter (inHg)", 8, Tg)], 32), $(E("input", {
                type: "number",
                "onUpdate:modelValue": t[21] || (t[21] = T => s(o).pressure = T),
                class: "shortened",
                placeholder: "QNH",
                onChange: t[22] || (t[22] = T => {
                    a("pressure")
                }),
                onKeyup: t[23] || (t[23] = T => {
                    a("pressure")
                })
            }, null, 544), [
                [q, s(o).pressure]
            ])])]), E("div", Ng, [$(E("input", {
                type: "text",
                "onUpdate:modelValue": t[24] || (t[24] = T => s(o).depRunways = T),
                placeholder: "Departure Runways",
                onChange: t[25] || (t[25] = T => {
                    a("depRunways")
                }),
                onKeyup: t[26] || (t[26] = T => {
                    a("depRunways")
                })
            }, null, 544), [
                [q, s(o).depRunways]
            ]), $(E("input", {
                type: "text",
                "onUpdate:modelValue": t[27] || (t[27] = T => s(o).arrRunways = T),
                placeholder: "Arrival Runways",
                onChange: t[28] || (t[28] = T => {
                    a("arrRunways")
                }),
                onKeyup: t[29] || (t[29] = T => {
                    a("arrRunways")
                })
            }, null, 544), [
                [q, s(o).arrRunways]
            ])]), E("div", Og, [E("div", Lg, [E("div", {
                class: "hflex medium boxed",
                onClick: t[30] || (t[30] = T => {
                    s(o).speedLimit = !s(o).speedLimit, a("speedLimit")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).speedLimit
            }, null, 8, Cg), ug]), s(o).speedLimit ? $((D(), p("input", {
                key: 0,
                type: "text",
                class: "shortened",
                placeholder: "Speed Limit",
                "onUpdate:modelValue": t[31] || (t[31] = T => s(o).speed = T),
                onChange: t[32] || (t[32] = T => {
                    a("speed")
                }),
                onKeyup: t[33] || (t[33] = T => {
                    a("speed")
                })
            }, null, 544)), [
                [q, s(o).speed]
            ]) : Z("", !0)]), E("div", fg, [E("div", dg, [E("div", Mg, [(D(!0), p(si, null, Mi(s(Ri)(s(gi)()).topDowns, (T, P) => (D(), p("span", {
                class: "boxed pointer",
                onClick: K => c(P)
            }, [E("input", {
                type: "checkbox",
                checked: s(o).topDowns[P]
            }, null, 8, Gg), no(" " + H(T), 1)], 8, Pg))), 256))])])])]), Dg, E("div", Hg, [E("div", {
                class: "hflex boxed half",
                onClick: t[34] || (t[34] = T => {
                    s(o).groundedStand = !s(o).groundedStand, a("groundedStand")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).groundedStand
            }, null, 8, Ug), Bg]), E("div", {
                class: "hflex boxed half",
                onClick: t[35] || (t[35] = T => {
                    s(o).groundedType = !s(o).groundedType, a("groundedType")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).groundedType
            }, null, 8, pg), Fg])]), hg, E("div", Vg, [E("div", {
                class: "hflex boxed half",
                onClick: t[36] || (t[36] = T => {
                    s(o).airborneType = !s(o).airborneType, a("airborneType")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).airborneType
            }, null, 8, Kg), mg]), E("div", {
                class: "hflex boxed half",
                onClick: t[37] || (t[37] = T => {
                    s(o).airborneAlt = !s(o).airborneAlt, a("airborneAlt")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).airborneAlt
            }, null, 8, Yg), Wg]), E("div", {
                class: "hflex boxed half",
                onClick: t[38] || (t[38] = T => {
                    s(o).airborneSpeed = !s(o).airborneSpeed, a("airborneSpeed")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).airborneSpeed
            }, null, 8, yg), Jg]), E("div", {
                class: "hflex boxed half",
                onClick: t[39] || (t[39] = T => {
                    s(o).airborneHeading = !s(o).airborneHeading, a("airborneHeading")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(o).airborneHeading
            }, null, 8, Xg), vg])]), wg, E("div", _g, [E("select", {
                onChange: n
            }, [(D(!0), p(si, null, Mi(s(Ri)(s(o).airport).chartPacks, T => (D(), p("option", {
                value: JSON.stringify(T),
                selected: s(o).chartAuthor == T.author
            }, H(T.author), 9, bg))), 256)), E("option", {
                value: "custom",
                selected: s(o).chartAuthor == "custom"
            }, "Custom", 8, Zg)], 32), s(o).customCharts ? (D(), p("div", kg, $g)) : Z("", !0), s(o).customCharts ? $((D(), p("input", {
                key: 1,
                type: "text",
                "onUpdate:modelValue": t[40] || (t[40] = T => s(o).chartAuthor = T),
                class: "third",
                onChange: t[41] || (t[41] = T => {
                    a("chartAuthor")
                }),
                onKeyup: t[42] || (t[42] = T => {
                    a("chartAuthor")
                })
            }, null, 544)), [
                [q, s(o).chartAuthor]
            ]) : Z("", !0)]), E("div", Qg, [s(o).customCharts ? (D(), p("div", qg, zg)) : Z("", !0), s(o).customCharts ? $((D(), p("input", {
                key: 1,
                type: "text",
                "onUpdate:modelValue": t[43] || (t[43] = T => s(o).chartLink = T),
                class: "fancy",
                onChange: t[44] || (t[44] = T => {
                    a("chartLink")
                }),
                onKeyup: t[45] || (t[45] = T => {
                    a("chartLink")
                })
            }, null, 544)), [
                [q, s(o).chartLink]
            ]) : Z("", !0)]), it, E("div", lt, [$(E("textarea", {
                cols: "30",
                rows: "10",
                "onUpdate:modelValue": t[46] || (t[46] = T => s(o).extraNotams = T),
                onChange: t[47] || (t[47] = T => {
                    a("extraNotams")
                }),
                onKeyup: t[48] || (t[48] = T => {
                    a("extraNotams")
                })
            }, null, 544), [
                [q, s(o).extraNotams]
            ])])]), E("div", at, [E("textarea", {
                class: "atis",
                ref_key: "atisRef",
                ref: l,
                readonly: ""
            }, H(s(o).boxes ? "∎" : "") + " " + H(s(o).airport) + " ATIS Information " + H(s(o).phoneticAbbr ? s($a)(s(o).information) : s(o).information) + " " + H(s(o).zuluTime ? new Date().getUTCHours().toFixed(0).padStart(2, "0") + new Date().getUTCMinutes().toFixed(0).padStart(2, "0") + "z" : "") + " " + H(s(o).boxes ? "∎" : "") + `\r
` + H(s(o).markdown ? "**" : "") + H("".padStart(s(o).dashes, "―")) + H(s(o).markdown ? "**" : "") + `\r
` + H(s(o).markdown ? "**" : "") + "Controller Callsign:" + H(s(o).markdown ? "**" : "") + " " + H(s(o).towerCallsign) + " (" + H(s(o).towerFrequency) + `)\r
` + H(s(o).hasGround && s(Ri)(s(o).airport).hasGround ? `Controller Callsign: ${s(Ri)(s(o).airport).groundCallsign} (${s(o).groundFrequency})
` : "") + H(s(o).markdown ? "**" : "") + H("".padStart(s(o).dashes, "―")) + H(s(o).markdown ? "**" : "") + `\r
` + H(s(o).markdown ? "**" : "") + "Aerodrome:" + H(s(o).markdown ? "**" : "") + `\r
Max Taxi Speed: ` + H(s(o).taxiSpeed) + `kts\r
Arrival Runway(s): ` + H(s(o).arrRunways) + `\r
Departure Runway(s): ` + H(s(o).depRunways) + `\r
Max Acft Size: ` + H(s(Ri)(s(o).airport).maxAcft) + `\r
` + H(s(o).useQNH ? `QNH: ${Math.round(s(o).pressure)}` : `Altimeter: ${s(o).pressure.toFixed(2)}`) + `\r
\r
` + H(s(o).markdown ? "**" : "") + "NOTAMS:" + H(s(o).markdown ? "**" : "") + `\r
` + H(s(o).topDown ? `Top Down for ${s(o).topDownText}
` : "") + H(`Ground Acft Advise Receipt of Information ${s(o).information}${s(o).groundedStand?", Stand Number":""}${s(o).groundedType?", Aircraft Type":""} on Initial Contact.`) + `\r
` + H(`Airborne Acft Advise Receipt of Information ${s(o).information}${s(o).airborneType?", Aircraft Type":""}${s(o).airborneAlt?", Altitude":""}${s(o).airborneSpeed?", Airspeed":""}${s(o).airborneHeading?", Heading":""} on Initial Contact.`) + `\r
` + H(s(o).speedLimit ? `Speed ${s(o).speed}kts or below.
` : "") + `VFR Acft say Direction of Flight, Intentions in Flight Plan.\r
` + H(s(o).sids ? `SIDs/STARs are preferred.
` : "") + H(s(o).emergencies ? "Emergencies Allowed." : "No Emergencies.") + `\r
` + H(s(o).extraNotams) + `                \r
` + H(s(o).markdown ? "**" : "") + "Charts:" + H(s(o).markdown ? "**" : "") + `\r
Chart Pack Author: ` + H(s(o).chartAuthor) + `\r
Chart Pack Link: ` + H(s(o).chartLink) + `\r
` + H(s(o).markdown ? "**" : "") + H("".padStart(s(o).dashes, "―")) + H(s(o).markdown ? "**" : "") + `\r
` + H(s(o).boxes ? "∎" : "") + " End of ATIS Information " + H(s(o).phoneticAbbr ? s($a)(s(o).information) : s(o).information) + " " + H(s(o).boxes ? "∎" : ""), 513)])]))
        }
    }),
    nt = Yl(ct, [
        ["__scopeId", "data-v-051d0255"]
    ]),
    ot = ["placeholder"],
    st = {
        key: 0
    },
    At = ["onClick"],
    et = {
        key: 0
    },
    gt = {
        key: 0,
        class: "arrowed"
    },
    tt = {
        key: 1
    },
    Rt = {
        key: 1
    },
    Et = {
        key: 0,
        class: "arrowed"
    },
    It = {
        key: 1
    },
    rt = ml({
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
                n = ci(a.items),
                A = ci(a.searchQuery == null ? a.value ?? "" : a.searchQuery),
                g = ci(!1),
                e = ci(!1),
                o = ci(0);
            a.value != null && L();

            function L() {
                a.filter ? n.value = a.items.filter(a.filter) : n.value = a.items.filter(T => T.toLowerCase().includes(A.value.toLowerCase())), n.value.length != 0 && (o.value = o.value % n.value.length)
            }

            function S(T) {
                g.value = !1, e.value = !1, A.value = T, L(), c("change", A.value)
            }

            function t(T) {
                if (g.value) switch (T.code) {
                    case "ArrowUp":
                        if (n.value.length == 0) return;
                        o.value = (o.value - 1 + n.value.length) % n.value.length;
                        break;
                    case "ArrowDown":
                        if (n.value.length == 0) return;
                        o.value = (o.value + 1) % n.value.length;
                        break;
                    case "Enter":
                    case "Tab":
                        if (n.value.length == 0) return;
                        S(n.value[o.value]);
                        break
                }
            }
            return Gc(() => {
                window.addEventListener("keydown", t)
            }), Dc(() => {
                window.removeEventListener("keydown", t)
            }), (T, P) => (D(), p("div", null, [$(E("input", {
                type: "text",
                "onUpdate:modelValue": P[0] || (P[0] = K => ti(A) ? A.value = K : A = K),
                onInput: L,
                placeholder: s(a).placeholder,
                onFocus: P[1] || (P[1] = K => {
                    ti(g) ? g.value = !0 : g = !0, K.target.select(), L()
                }),
                onBlur: P[2] || (P[2] = K => ti(g) ? g.value = !1 : g = !1)
            }, null, 40, ot), [
                [q, s(A)]
            ]), s(g) || s(e) ? (D(), p("ul", st, [(D(!0), p(si, null, Mi(s(n), (K, M) => (D(), p("li", {
                key: K,
                onClick: R => S(K),
                onMouseover: P[3] || (P[3] = R => ti(e) ? e.value = !0 : e = !0),
                onMouseleave: P[4] || (P[4] = R => ti(e) ? e.value = !1 : e = !1),
                style: la({
                    width: T.width != null ? `${T.width}vw` : "inherit"
                })
            }, [T.displayText != null ? (D(), p("div", et, [M == s(o) ? (D(), p("p", gt, H(T.displayText(K)), 1)) : (D(), p("p", tt, H(T.displayText(K)), 1))])) : (D(), p("div", Rt, [M == s(o) ? (D(), p("p", Et, H(K), 1)) : (D(), p("p", It, H(K), 1))]))], 44, At))), 128))])) : Z("", !0)]))
        }
    }),
    Rc = Yl(rt, [
        ["__scopeId", "data-v-89367af4"]
    ]),
    Ii = i => (Mc("data-v-f6408332"), i = i(), Pc(), i),
    St = {
        class: "nav"
    },
    Tt = {
        class: "logowrap"
    },
    Nt = Ii(() => E("a", {
        href: "/fsm/",
        class: "logo"
    }, "FSM by FormicAcid", -1)),
    Ot = {
        class: "version"
    },
    Lt = Ii(() => E("a", {
        href: "https://discord.gg/8tSu4ewdsM",
        class: "version dc",
        target: "_blank"
    }, "Discord", -1)),
    Ct = {
        class: "top"
    },
    ut = {
        class: "id"
    },
    ft = {
        key: 0,
        class: "all"
    },
    dt = {
        class: "acftList"
    },
    Mt = Ii(() => E("h1", null, "Arriving", -1)),
    Pt = {
        class: "list"
    },
    Gt = {
        class: "acft"
    },
    Dt = {
        class: "acftList"
    },
    Ht = Ii(() => E("h1", null, "Departing", -1)),
    Ut = {
        class: "list"
    },
    Bt = {
        class: "acft"
    },
    pt = {
        class: "acftList"
    },
    Ft = Ii(() => E("h1", null, "VFR", -1)),
    ht = {
        class: "list"
    },
    Vt = {
        class: "acft"
    },
    Kt = {
        class: "acftList"
    },
    mt = Ii(() => E("h1", null, "Other Traffic", -1)),
    Yt = {
        class: "list"
    },
    Wt = {
        class: "acft"
    },
    yt = {
        key: 1,
        class: "vflex body"
    },
    Jt = Ii(() => E("h1", null, "General Information", -1)),
    Xt = {
        class: "nomarg"
    },
    vt = Ii(() => E("h1", null, "Runway Information", -1)),
    wt = {
        class: "nomarg"
    },
    _t = {
        class: "nomarg"
    },
    bt = {
        class: "nomarg"
    },
    Zt = Ii(() => E("p", {
        class: "nomarg"
    }, null, -1)),
    kt = {
        class: "nomarg"
    },
    xt = {
        class: "nomarg"
    },
    $t = {
        class: "nomarg"
    },
    Qt = Ii(() => E("p", {
        class: "nomarg"
    }, null, -1)),
    qt = Ii(() => E("h1", null, "Communication Information", -1)),
    jt = {
        class: "nomarg"
    },
    zt = {
        key: 2,
        class: "hflex"
    },
    iR = {
        key: 3,
        class: "vflex body sett"
    },
    lR = Ii(() => E("h1", null, "Room Settings", -1)),
    aR = Ii(() => E("p", null, "Flight Plan Lifetime (Minutes)", -1)),
    cR = Ii(() => E("h1", null, "Personal Settings", -1)),
    nR = ["checked"],
    oR = Ii(() => E("p", null, "Parse Callsigns to ICAO", -1)),
    sR = ["checked"],
    AR = Ii(() => E("p", null, "Display Top Down ACFT in Arriving/Departing/VFR", -1)),
    eR = Ii(() => E("h1", null, "Keyboard Shortcuts", -1)),
    gR = Ii(() => E("p", null, "'r' in Squawk Field: Random Squawk Code", -1)),
    tR = Ii(() => E("p", null, "CTRL Click Hide: Skip Popup", -1)),
    RR = Ii(() => E("p", null, "Hover over Strip + 'X': delete strip", -1)),
    ER = {
        key: 4,
        class: "vflex body"
    },
    IR = {
        key: 1,
        class: "split"
    },
    rR = {
        key: 2,
        class: "split"
    },
    SR = ["checked"],
    TR = Ii(() => E("p", null, "SID", -1)),
    NR = ["checked"],
    OR = Ii(() => E("p", null, "Climb Via SID", -1)),
    LR = {
        id: "sids"
    },
    CR = ["value"],
    uR = {
        key: 6,
        readonly: ""
    },
    fR = {
        key: 5,
        class: "body vflex"
    },
    dR = {
        class: "twrap"
    },
    MR = ml({
        __name: "List",
        setup(i) {
            let l = ci(0);

            function a() {
                return Oo.sort((m, N) => m.icao.localeCompare(N.icao)).filter(m => m.callsign.trim().includes(Hi.search.trim().toUpperCase()) || m.icao.trim().includes(Hi.search.trim().toUpperCase()) || Hi.search.trim() == "")
            }

            function c() {
                return V.acft == null ? "" : V.acft.departing == gi() ? (V.aircraft = V.acft.callsign, V.acft.callsign) : ""
            }

            function n(m) {
                var O;
                let N = {
                    id: "-1",
                    roomSecret: Fi(),
                    user_secret: ((O = Wi()) == null ? void 0 : O.secret) ?? ""
                };
                m == "pdc_aircraft" && (N.pdc_aircraft = V.aircraft), m == "pdc_sid" && (N.pdc_sid = V.sid), m == "pdc_sids" && (N.pdc_sids = V.sids), m == "pdc_viaSID" && (N.pdc_viaSID = V.viaSID), xl(N)
            }

            function A(m) {
                da({
                    id: V.acft.id,
                    selectionType: m
                })
            }

            function g() {
                V.acft.squawk.toLowerCase() == "r" && (V.acft.squawk = `${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}`), S(V.acft, "squawk")
            }

            function e() {
                return V.viaSID && V.sids ? V.acft.a_alt != "" ? `CLIMB VIA SID, EXCEPT MAINTAIN ${V.acft.a_alt}` : "CLIMB VIA SID" : `MAINTAIN ${V.acft.a_alt}`
            }

            function o(m) {
                let N = ec();
                N != null && N.id == V.acft.id && N.selectionType == m && da(null)
            }

            function L() {
                V.acft.squawk = `${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}${Math.floor(Math.random()*8)}`, S(V.acft, "squawk")
            }
            let S = (m, N) => {
                var w;
                let O = {
                    id: m.id,
                    roomSecret: Fi(),
                    user_secret: ((w = Wi()) == null ? void 0 : w.secret) ?? ""
                };
                return N == "acft" && (O.type = m.type), N == "alt" && (O.altitude = m.altitude), N == "arriving" && (O.arriving = m.arriving), N == "callsign" && (O.callsign = m.callsign), N == "departing" && (O.departing = m.departing), N == "free" && (O.free = m.free), N == "gate" && (O.gate = m.gate), N == "route" && (O.route = m.route), N == "runway" && (O.runway = m.runway), N == "squawk" && (O.squawk = m.squawk), N == "status" && (O.status = m.status), N == "a_alt" && (O.a_alt = m.a_alt), N == "a_hdg" && (O.a_hdg = m.a_hdg), xl(O), m
            };

            function t() {
                let m = [];
                return Ri(gi()).runwayInfo.forEach(N => {
                    m.push(N.name1), m.push(N.name2)
                }), m.sort((N, O) => N.localeCompare(O))
            }

            function T() {
                var m;
                return (((m = Ri(gi()).chartPacks.find(N => N.author == QA())) == null ? void 0 : m.sids) ?? []).filter(N => N.runways.includes(V.acft.runway))
            }

            function P() {
                return Oi.value ? l.value >= 1 ? "shown" : "" : l.value >= 1 ? "hidden" : "noanim"
            }

            function K() {
                alert("Just No")
            }

            function M(m) {
                let N = m + "=",
                    w = decodeURIComponent(document.cookie).split(";");
                for (let Si = 0; Si < w.length; Si++) {
                    let zi = w[Si];
                    for (; zi.charAt(0) == " ";) zi = zi.substring(1);
                    if (zi.indexOf(N) == 0) return zi.substring(N.length, zi.length)
                }
                return ""
            }

            function R(m, N) {
                document.cookie = m + "=" + N + ";path=/"
            }
            let C = M("sideBarOpen");
            C == "" && R("sideBarOpen", "false");
            let v = ci(),
                j = M("call");
            j == "" ? (R("call", !0), v.value = !0) : v.value = j == "true";
            let W = ci();
            j = M("td"), j == "" ? (R("td", !0), W.value = !0) : W.value = j == "true";
            let Oi = ci(C == "true"),
                ni = ci(M("tab"));
            ni.value == "" && (R("tab", "FSM"), window.location.reload());

            function Al() {
                Oi.value = !Oi.value, R("sideBarOpen", "" + Oi.value), l.value++
            }

            function fi(m) {
                ni.value = m, R("tab", m)
            }

            function yl() {
                v.value = !v.value, R("call", v.value)
            }

            function xi() {
                W.value = !W.value, R("td", W.value)
            }
            let k = ci([]),
                V = cl({
                    sids: !1,
                    runway: t()[0],
                    viaSID: !0,
                    aircraft: "",
                    acft: k.value[0],
                    sid: ""
                });
            async function el() {
                (await le()).forEach(N => {
                    let O = k.value.find(w => w.id == N.id);
                    if (O == null) _A() < 1 ? k.value.push(N) : (k.value.splice(0, 0, N), location.reload());
                    else {
                        let w = ec() ?? {
                                id: -15,
                                selectionType: "acft"
                            },
                            Si = k.value.indexOf(O);
                        O.altitude != N.altitude && !(w.selectionType == "alt" && w.id == N.id) && (k.value[Si].altitude = N.altitude), O.arriving != N.arriving && !(w.selectionType == "arriving" && w.id == N.id) && (k.value[Si].arriving = N.arriving), O.callsign != N.callsign && !(w.selectionType == "callsign" && w.id == N.id) && (k.value[Si].callsign = N.callsign), O.departing != N.departing && !(w.selectionType == "departing" && w.id == N.id) && (k.value[Si].departing = N.departing), O.free != N.free && !(w.selectionType == "free" && w.id == N.id) && (k.value[Si].free = N.free), O.gate != N.gate && !(w.selectionType == "gate" && w.id == N.id) && (k.value[Si].gate = N.gate), O.route != N.route && !(w.selectionType == "route" && w.id == N.id) && (k.value[Si].route = N.route), O.runway != N.runway && !(w.selectionType == "runway" && w.id == N.id) && (k.value[Si].runway = N.runway), O.squawk != N.squawk && !(w.selectionType == "squawk" && w.id == N.id) && (k.value[Si].squawk = N.squawk), O.status != N.status && !(w.selectionType == "status" && w.id == N.id) && (k.value[Si].status = N.status), O.type != N.type && !(w.selectionType == "acft" && w.id == N.id) && (k.value[Si].type = N.type), O.a_alt != N.a_alt && !(w.selectionType == "a_alt" && w.id == N.id) && (k.value[Si].a_alt = N.a_alt), O.a_hdg != N.a_hdg && !(w.selectionType == "a_hdg" && w.id == N.id) && (k.value[Si].a_hdg = N.a_hdg), O.hidden != N.hidden && (k.value[Si].hidden = N.hidden)
                    }
                }), bA()
            }
            setInterval(el, 1e3), el();

            function Jl(m) {
                var O;
                let N = {
                    id: "-1",
                    roomSecret: Fi(),
                    user_secret: ((O = Wi()) == null ? void 0 : O.secret) ?? ""
                };
                m == "fpLifetime" && (N.flightPlanlifetime = ri.fpLifetime), m == "parseCallsigns" && (N.parseCallsigns = ri.parseCallsigns), xl(N)
            }
            async function Xl() {
                let m = await ce(),
                    N = await ae();
                Object.keys(m).forEach(O => {
                    ri[O] = m[O]
                }), Object.keys(N).forEach(O => {
                    O != null && (O == "aircraft" ? ((k.value.find(() => N[O]) ?? k.value[0]).departing == gi() && (V.aircraft = N.aircraft), V.acft = k.value.find(w => w.callsign == N[O]) ?? k.value[0]) : V[O] = N[O])
                })
            }
            setInterval(Xl, 2500), Xl();
            let ri = cl({
                    fpLifetime: 120,
                    parseCallsigns: !0
                }),
                ii = ci([]);
            async function li() {
                let m = await Lo();
                Object.keys(m).forEach(N => {
                    N == "chartAuthor" && gc(m[N]), N == "towerFrequency" && tc(m[N]), N == "topDownText" && (ii.value = m[N].split(", "))
                })
            }
            li();
            let Hi = cl({
                search: ""
            });
            return (m, N) => (D(), p(si, null, [E("div", {
                class: Ki(["sidebar", P()])
            }, [E("p", {
                class: Ki(s(ni) == "FSM" || s(ni) == "" || s(ni) == null || s(ni) == null ? "active" : ""),
                onClick: N[0] || (N[0] = O => fi("FSM"))
            }, "Flight Strip Manager", 2), E("p", {
                class: Ki(s(ni) == "ATIS" ? "active" : ""),
                onClick: N[1] || (N[1] = O => fi("ATIS"))
            }, "ATIS", 2), E("p", {
                class: Ki(s(ni) == "PDC" ? "active" : ""),
                onClick: N[2] || (N[2] = O => fi("PDC"))
            }, "PDC", 2), E("p", {
                class: Ki(s(ni) == "INFO" ? "active" : ""),
                onClick: N[3] || (N[3] = O => fi("INFO"))
            }, "Airport Information", 2), E("p", {
                class: Ki(s(ni) == "CALL" ? "active" : ""),
                onClick: N[4] || (N[4] = O => fi("CALL"))
            }, "Callsign Table", 2), E("p", {
                class: Ki(s(ni) == "SETT" ? "active" : ""),
                onClick: N[5] || (N[5] = O => fi("SETT"))
            }, "Settings", 2)], 2), E("div", St, [E("div", Tt, [Nt, E("p", Ot, "v" + H(s(To)), 1)]), Lt, E("div", Ct, [E("p", ut, "Room ID: " + H(s(ZA)()), 1)]), E("img", {
                src: wA,
                onClick: Al,
                class: "hamburger"
            })]), s(ni) == "FSM" ? (D(), p("div", ft, [E("div", dt, [Mt, E("div", Pt, [(D(!0), p(si, null, Mi(s(k), (O, w) => (D(), p("div", Gt, [O.arriving == s(gi)() && O.flightRules == "IFR" && !O.hidden ? (D(), _i(El, {
                key: 0,
                aircraft: O,
                type: "inbound"
            }, null, 8, ["aircraft"])) : Z("", !0), s(ii).includes(O.arriving) && O.flightRules == "IFR" && !O.hidden && s(W) ? (D(), _i(El, {
                key: 1,
                aircraft: O,
                type: "inbound_td"
            }, null, 8, ["aircraft"])) : Z("", !0)]))), 256))])]), E("div", Dt, [Ht, E("div", Ut, [(D(!0), p(si, null, Mi(s(k), (O, w) => (D(), p("div", Bt, [O.departing == s(gi)() && O.flightRules == "IFR" && !O.hidden ? (D(), _i(El, {
                key: 0,
                aircraft: O,
                type: "outbound"
            }, null, 8, ["aircraft"])) : Z("", !0), s(ii).includes(O.departing) && O.flightRules == "IFR" && !O.hidden && s(W) ? (D(), _i(El, {
                key: 1,
                aircraft: O,
                type: "outbound_td"
            }, null, 8, ["aircraft"])) : Z("", !0)]))), 256))])]), E("div", pt, [Ft, E("div", ht, [(D(!0), p(si, null, Mi(s(k), (O, w) => (D(), p("div", Vt, [(O.departing == s(gi)() || O.arriving == s(gi)()) && O.flightRules == "VFR" && !O.hidden ? (D(), _i(El, {
                key: 0,
                aircraft: O,
                type: "vfr"
            }, null, 8, ["aircraft"])) : Z("", !0), (s(ii).includes(O.departing) || s(ii).includes(O.arriving)) && O.flightRules == "VFR" && !O.hidden && s(W) ? (D(), _i(El, {
                key: 1,
                aircraft: O,
                type: "vfr_td"
            }, null, 8, ["aircraft"])) : Z("", !0)]))), 256))])]), E("div", Kt, [mt, E("div", Yt, [(D(!0), p(si, null, Mi(s(k), (O, w) => (D(), p("div", Wt, [O.departing != s(gi)() && O.arriving != s(gi)() && !O.hidden && !((s(ii).includes(O.departing) || s(ii).includes(O.arriving)) && s(W)) ? (D(), _i(El, {
                key: 0,
                aircraft: O,
                type: "overflying"
            }, null, 8, ["aircraft"])) : Z("", !0)]))), 256))])])])) : Z("", !0), s(ni) == "INFO" ? (D(), p("div", yt, [Jt, (D(!0), p(si, null, Mi(s(Ri)(s(gi)()).generalInfo.split(`
`), O => (D(), p("p", Xt, H(O), 1))), 256)), vt, (D(!0), p(si, null, Mi(s(Ri)(s(gi)()).runwayInfo, O => (D(), p("div", null, [E("p", wt, "Runway: " + H(O.name1), 1), E("p", _t, "Length: " + H(O.length) + " ft", 1), E("p", bt, "Surface Type: " + H(O.type), 1), Zt]))), 256)), (D(!0), p(si, null, Mi(s(Ri)(s(gi)()).runwayInfo, O => (D(), p("div", null, [E("p", kt, "Runway: " + H(O.name2), 1), E("p", xt, "Length: " + H(O.length) + " ft", 1), E("p", $t, "Surface Type: " + H(O.type), 1), Qt]))), 256)), qt, (D(!0), p(si, null, Mi(s(Ri)(s(gi)()).commsInfo.split(`
`), O => (D(), p("p", jt, H(O), 1))), 256))])) : Z("", !0), s(ni) == "ATIS" ? (D(), p("div", zt, [pi(nt)])) : Z("", !0), s(ni) == "SETT" ? (D(), p("div", iR, [lR, E("div", null, [aR, $(E("input", {
                type: "number",
                "onUpdate:modelValue": N[6] || (N[6] = O => s(ri).fpLifetime = O),
                onChange: N[7] || (N[7] = O => Jl("fpLifetime")),
                class: "setting"
            }, null, 544), [
                [q, s(ri).fpLifetime]
            ])]), cR, E("button", {
                class: "setting",
                onClick: K
            }, "Enable Light Mode"), E("div", {
                onClick: N[8] || (N[8] = O => yl()),
                class: "hflex nosel point"
            }, [E("input", {
                type: "checkbox",
                checked: s(v)
            }, null, 8, nR), oR]), E("div", {
                onClick: N[9] || (N[9] = O => xi()),
                class: "hflex nosel point"
            }, [E("input", {
                type: "checkbox",
                checked: s(W)
            }, null, 8, sR), AR]), eR, gR, tR, RR])) : Z("", !0), s(ni) == "PDC" ? (D(), p("div", ER, [pi(Rc, {
                placeholder: "Aircraft",
                items: s(k).filter(O => O.departing == s(gi)() && O.flightRules == "IFR" && !O.hidden).map(O => O.callsign),
                onChange: N[10] || (N[10] = O => {
                    s(V).aircraft = O, s(V).acft = s(k).find(w => w.callsign == s(V).aircraft) ?? s(k)[0], n("pdc_aircraft")
                }),
                value: c()
            }, null, 8, ["items", "value"]), s(V).aircraft != "" ? (D(), _i(Rc, {
                key: 0,
                placeholder: "Runway",
                items: t(),
                onChange: N[11] || (N[11] = O => {
                    s(V).runway = O, s(V).acft.runway = O, s(S)(s(V).acft, "runway")
                }),
                value: s(V).acft == null ? t()[0] : s(V).acft.runway ?? t()[0]
            }, null, 8, ["items", "value"])) : Z("", !0), s(V).aircraft != "" ? (D(), p("div", IR, [$(E("input", {
                type: "text",
                placeholder: "Squawk",
                "onUpdate:modelValue": N[12] || (N[12] = O => s(V).acft.squawk = O),
                onChange: N[13] || (N[13] = O => {
                    s(S)(s(V).acft, "squawk"), g()
                }),
                onFocus: N[14] || (N[14] = O => A("squawk")),
                onBlur: N[15] || (N[15] = O => o("squawk")),
                onKeyup: g
            }, null, 544), [
                [q, s(V).acft.squawk]
            ]), E("button", {
                onClick: N[16] || (N[16] = O => {
                    L(), A("squawk")
                })
            }, "Random Squawk")])) : Z("", !0), s(V).aircraft != "" ? (D(), p("div", rR, [$(E("input", {
                type: "text",
                placeholder: "Altitude",
                "onUpdate:modelValue": N[17] || (N[17] = O => s(V).acft.a_alt = O),
                onChange: N[18] || (N[18] = O => s(S)(s(V).acft, "a_alt")),
                onFocus: N[19] || (N[19] = O => A("a_alt")),
                onBlur: N[20] || (N[20] = O => o("a_alt"))
            }, null, 544), [
                [q, s(V).acft.a_alt]
            ]), $(E("input", {
                type: "text",
                placeholder: "Heading",
                "onUpdate:modelValue": N[21] || (N[21] = O => s(V).acft.a_hdg = O),
                onChange: N[22] || (N[22] = O => s(S)(s(V).acft, "a_hdg")),
                onFocus: N[23] || (N[23] = O => A("a_hdg")),
                onBlur: N[24] || (N[24] = O => o("a_hdg"))
            }, null, 544), [
                [q, s(V).acft.a_hdg]
            ])])) : Z("", !0), s(V).aircraft != "" ? (D(), p("div", {
                key: 3,
                class: "hflex nosel",
                onClick: N[25] || (N[25] = O => {
                    s(V).sids = !s(V).sids, n("pdc_sids")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(V).sids
            }, null, 8, SR), TR])) : Z("", !0), s(V).sids ? (D(), p("div", {
                key: 4,
                class: "hflex nosel",
                onClick: N[26] || (N[26] = O => {
                    s(V).viaSID = !s(V).viaSID, n("pdc_viaSID")
                })
            }, [E("input", {
                type: "checkbox",
                checked: s(V).viaSID
            }, null, 8, NR), OR])) : Z("", !0), s(V).sids ? $((D(), p("input", {
                key: 5,
                type: "text",
                placeholder: "SID",
                list: "sids",
                "onUpdate:modelValue": N[27] || (N[27] = O => s(V).sid = O),
                onChange: N[28] || (N[28] = O => n("pdc_sid"))
            }, null, 544)), [
                [q, s(V).sid]
            ]) : Z("", !0), E("datalist", LR, [(D(!0), p(si, null, Mi(T(), O => (D(), p("option", {
                value: O.name
            }, null, 8, CR))), 256))]), s(V).aircraft != "" ? (D(), p("textarea", uR, `ACARS BEGIN\r
\r
` + H(new Date().getUTCDate().toString().padStart(2, "0")) + "/" + H((new Date().getUTCMonth() + 1).toString().padStart(2, "0")) + "/" + H(new Date().getUTCFullYear() - 2e3) + "          " + H(new Date().getUTCHours().toString().padStart(2, "0")) + ":" + H(new Date().getUTCMinutes().toString().padStart(2, "0")) + ":" + H(new Date().getUTCSeconds().toString().padStart(2, "0")) + `\r
\r
FLIGHT ` + H(s(V).aircraft) + " " + H(s(V).acft.departing) + " " + H(s(V).acft.arriving) + `\r
XPDR ` + H(s(V).acft.squawk) + `\r
\r
PDC\r
` + H(s(V).sids ? `CLEARED ${s(V).sid} DEP` : `CLEARED HDG ${s(V).acft.a_hdg}`) + `\r
` + H(e()) + `\r
DEP CONTROL ` + H(s(qA)()) + `\r
\r
END OF MESSAGE\r
ACARS END`, 1)) : Z("", !0)])) : Z("", !0), s(ni) == "CALL" ? (D(), p("div", fR, [$(E("input", {
                type: "text",
                placeholder: "Search...",
                "onUpdate:modelValue": N[29] || (N[29] = O => s(Hi).search = O)
            }, null, 512), [
                [q, s(Hi).search]
            ]), E("div", dR, [E("table", null, [E("tbody", null, [(D(!0), p(si, null, Mi(a(), O => (D(), p("tr", null, [E("td", null, H(O.icao), 1), E("td", null, H(O.callsign), 1)]))), 256))])])])])) : Z("", !0)], 64))
        }
    }),
    PR = Yl(MR, [
        ["__scopeId", "data-v-f6408332"]
    ]),
    Wl = i => (Mc("data-v-9edb308c"), i = i(), Pc(), i),
    GR = {
        key: 0,
        class: "offline"
    },
    DR = Wl(() => E("p", null, "loading...", -1)),
    HR = [DR],
    UR = {
        key: 1,
        class: "offline"
    },
    BR = Wl(() => E("h1", null, "The FSM is currently offline.", -1)),
    pR = [BR],
    FR = {
        key: 2,
        class: "offline vflex"
    },
    hR = Wl(() => E("h1", null, "FSM", -1)),
    VR = Wl(() => E("a", {
        href: "https://discord.com/api/oauth2/authorize?client_id=1233932484203515925&response_type=code&redirect_uri=https%3A%2F%2Fawdev1.github.io%2Ffsm&scope=identify"
    }, "Log In With Discord", -1)),
    KR = {
        key: 3,
        class: "rooms"
    },
    mR = {
        class: "acc"
    },
    YR = ["src"],
    WR = {
        class: "login"
    },
    yR = Wl(() => E("h1", null, "Create Room", -1)),
    JR = {
        key: 0
    },
    XR = {
        class: "create"
    },
    vR = Wl(() => E("h1", null, "Join Room", -1)),
    wR = {
        key: 0
    },
    _R = ml({
        __name: "App",
        setup(i) {
            let l = ci(!1),
                a = ci(!1),
                c = ci(!1),
                n = ci(!1),
                A = cl({
                    password: "",
                    password2: "",
                    id: "",
                    status1: "",
                    status2: "",
                    airport: ""
                });

            function g() {
                let P = Wi();
                return `https://cdn.discordapp.com/avatars/${P==null?void 0:P.id}/${P==null?void 0:P.avatar}.webp`
            }

            function e() {
                var P;
                if (A.airport == "") {
                    A.status1 = "You need to provide an Airport";
                    return
                }
                fetch(Pi.value + "/createRoom", {
                    method: "POST",
                    body: JSON.stringify({
                        airport: A.airport,
                        password: A.password,
                        user_secret: (P = Wi()) == null ? void 0 : P.secret
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }).then(K => {
                    K.status == 200 ? K.json().then(M => {
                        Za(M.secret), xa(M.airport), ka(M.id), window.location.href = `/fsm/?secret=${M.secret}`
                    }) : fetch(Pi.value + "/ping").then(M => {
                        Bi.value = M.status == 200
                    })
                })
            }

            function o() {
                var P;
                fetch(Pi.value + "/loginRoom", {
                    method: "POST",
                    body: JSON.stringify({
                        id: A.id,
                        password: A.password2,
                        user_secret: (P = Wi()) == null ? void 0 : P.secret
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420"
                    }
                }).then(K => {
                    K.status == 200 ? K.json().then(M => {
                        Za(M.secret), xa(M.airport), ka(M.id), window.location.href = `/fsm/?secret=${M.secret}`
                    }) : A.status2 = "Incorrect Room ID or Password"
                })
            }
            Ra(Pi, () => {
                fetch(Pi.value + "/ping").then(P => {
                    if (Bi.value = P.status == 200, Bi.value) {
                        let K = L("secret");
                        fetch(Pi.value + "/verifyAccount", {
                            method: "POST",
                            body: JSON.stringify({
                                secret: K
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420"
                            }
                        }).then(C => {
                            C.status == 404 ? (n.value = !1, c.value = !0) : C.json().then(v => {
                                $A(v), n.value = !0, c.value = !0
                            })
                        }).catch();
                        let M = new URLSearchParams(document.location.search).get("secret");
                        M != null ? fetch(Pi.value + "/check", {
                            method: "POST",
                            body: JSON.stringify({
                                roomSecret: M
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420"
                            }
                        }).then(C => {
                            C.status == 200 ? C.json().then(v => {
                                l.value = !0, Za(v.secret), xa(v.airport), ka(v.id), a.value = !0
                            }) : C.status == 404 ? location.href = "/fsm/" : l.value = !1
                        }) : a.value = !0;
                        let R = new URLSearchParams(document.location.search).get("code");
                        R != null && fetch(Pi.value + "/login", {
                            method: "POST",
                            body: JSON.stringify({
                                code: R
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420"
                            }
                        }).then(C => {
                            C.json().then(v => {
                                t("secret", v.secret, 365), window.location.href = "/fsm/"
                            })
                        })
                    } else a.value = !0
                }).catch(() => {
                    Bi.value = !1, a.value = !0
                })
            });

            function L(P) {
                let K = P + "=",
                    R = decodeURIComponent(document.cookie).split(";");
                for (let C = 0; C < R.length; C++) {
                    let v = R[C];
                    for (; v.charAt(0) == " ";) v = v.substring(1);
                    if (v.indexOf(K) == 0) return v.substring(K.length, v.length)
                }
                return ""
            }

            function S(P, K) {
                document.cookie = P + "=" + K + ";path=/"
            }

            function t(P, K, M) {
                const R = new Date;
                R.setTime(R.getTime() + M * 24 * 60 * 60 * 1e3);
                let C = "expires=" + R.toUTCString();
                document.cookie = P + "=" + K + ";" + C + ";path=/"
            }
            document.addEventListener("keypress", P => {
                var K;
                P.key == "x" && l.value && a.value && Bi.value && Co({
                    id: kA(),
                    roomSecret: Fi(),
                    user_secret: ((K = Wi()) == null ? void 0 : K.secret) ?? ""
                })
            });

            function T() {
                S("secret", ""), window.location.href = "/fsm/"
            }
            return (P, K) => {
                var M;
                return D(), p(si, null, [s(a) ? s(Bi) ? !s(n) && s(a) && s(Bi) && s(c) ? (D(), p("div", FR, [hR, E("p", null, "v" + H(s(zA)), 1), VR])) : Z("", !0) : (D(), p("div", UR, pR)) : (D(), p("div", GR, HR)), !s(l) && s(Bi) && s(a) && s(n) ? (D(), p("div", KR, [E("div", mR, [E("img", {
                    src: g()
                }, null, 8, YR), E("p", null, H((M = s(Wi)()) == null ? void 0 : M.username), 1), E("p", {
                    onClick: T,
                    class: "logout"
                }, "Log Out")]), E("div", WR, [yR, pi(Rc, {
                    placeholder: "Airport",
                    "display-text": R => s(Ri)(R).friendlyName,
                    items: s(uo)().map(R => R.code),
                    onChange: K[0] || (K[0] = R => s(A).airport = R)
                }, null, 8, ["display-text", "items"]), $(E("input", {
                    type: "password",
                    "onUpdate:modelValue": K[1] || (K[1] = R => s(A).password = R),
                    placeholder: "Password"
                }, null, 512), [
                    [q, s(A).password]
                ]), E("button", {
                    onClick: e
                }, "Create Room"), s(A).status1 ? (D(), p("p", JR, H(s(A).status1), 1)) : Z("", !0)]), E("div", XR, [vR, $(E("input", {
                    type: "text",
                    "onUpdate:modelValue": K[2] || (K[2] = R => s(A).id = R),
                    placeholder: "Room ID"
                }, null, 512), [
                    [q, s(A).id]
                ]), $(E("input", {
                    type: "password",
                    "onUpdate:modelValue": K[3] || (K[3] = R => s(A).password2 = R),
                    placeholder: "Password"
                }, null, 512), [
                    [q, s(A).password2]
                ]), E("button", {
                    onClick: o
                }, "Join Room"), s(A).status2 ? (D(), p("p", wR, H(s(A).status2), 1)) : Z("", !0)])])) : Z("", !0), s(l) && s(Bi) && s(a) && s(n) ? (D(), _i(PR, {
                    key: 4
                })) : Z("", !0)], 64)
            }
        }
    }),
    bR = Yl(_R, [
        ["__scopeId", "data-v-9edb308c"]
    ]);
XA(bR).mount("#app");
