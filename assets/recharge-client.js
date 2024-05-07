// recharge-client-1.10.0.min.js | MIT License | Â© Recharge Inc.
(function (oe, pt) {
  typeof exports == "object" && typeof module < "u"
    ? (module.exports = pt())
    : typeof define == "function" && define.amd
    ? define(pt)
    : ((oe = typeof globalThis < "u" ? globalThis : oe || self),
      (oe.recharge = pt()));
})(this, function () {
  "use strict";
  var oe =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {};
  function pt(t) {
    var e = t.default;
    if (typeof e == "function") {
      var r = function () {
        return e.apply(this, arguments);
      };
      r.prototype = e.prototype;
    } else r = {};
    return (
      Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.keys(t).forEach(function (n) {
        var a = Object.getOwnPropertyDescriptor(t, n);
        Object.defineProperty(
          r,
          n,
          a.get
            ? a
            : {
                enumerable: !0,
                get: function () {
                  return t[n];
                },
              }
        );
      }),
      r
    );
  }
  var K =
      (typeof globalThis < "u" && globalThis) ||
      (typeof self < "u" && self) ||
      (typeof K < "u" && K),
    te = {
      searchParams: "URLSearchParams" in K,
      iterable: "Symbol" in K && "iterator" in Symbol,
      blob:
        "FileReader" in K &&
        "Blob" in K &&
        (function () {
          try {
            return new Blob(), !0;
          } catch {
            return !1;
          }
        })(),
      formData: "FormData" in K,
      arrayBuffer: "ArrayBuffer" in K,
    };
  function Wo(t) {
    return t && DataView.prototype.isPrototypeOf(t);
  }
  if (te.arrayBuffer)
    var Ho = [
        "[object Int8Array]",
        "[object Uint8Array]",
        "[object Uint8ClampedArray]",
        "[object Int16Array]",
        "[object Uint16Array]",
        "[object Int32Array]",
        "[object Uint32Array]",
        "[object Float32Array]",
        "[object Float64Array]",
      ],
      Yo =
        ArrayBuffer.isView ||
        function (t) {
          return t && Ho.indexOf(Object.prototype.toString.call(t)) > -1;
        };
  function ht(t) {
    if (
      (typeof t != "string" && (t = String(t)),
      /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t) || t === "")
    )
      throw new TypeError(
        'Invalid character in header field name: "' + t + '"'
      );
    return t.toLowerCase();
  }
  function mr(t) {
    return typeof t != "string" && (t = String(t)), t;
  }
  function wr(t) {
    var e = {
      next: function () {
        var r = t.shift();
        return { done: r === void 0, value: r };
      },
    };
    return (
      te.iterable &&
        (e[Symbol.iterator] = function () {
          return e;
        }),
      e
    );
  }
  function j(t) {
    (this.map = {}),
      t instanceof j
        ? t.forEach(function (e, r) {
            this.append(r, e);
          }, this)
        : Array.isArray(t)
        ? t.forEach(function (e) {
            this.append(e[0], e[1]);
          }, this)
        : t &&
          Object.getOwnPropertyNames(t).forEach(function (e) {
            this.append(e, t[e]);
          }, this);
  }
  (j.prototype.append = function (t, e) {
    (t = ht(t)), (e = mr(e));
    var r = this.map[t];
    this.map[t] = r ? r + ", " + e : e;
  }),
    (j.prototype.delete = function (t) {
      delete this.map[ht(t)];
    }),
    (j.prototype.get = function (t) {
      return (t = ht(t)), this.has(t) ? this.map[t] : null;
    }),
    (j.prototype.has = function (t) {
      return this.map.hasOwnProperty(ht(t));
    }),
    (j.prototype.set = function (t, e) {
      this.map[ht(t)] = mr(e);
    }),
    (j.prototype.forEach = function (t, e) {
      for (var r in this.map)
        this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this);
    }),
    (j.prototype.keys = function () {
      var t = [];
      return (
        this.forEach(function (e, r) {
          t.push(r);
        }),
        wr(t)
      );
    }),
    (j.prototype.values = function () {
      var t = [];
      return (
        this.forEach(function (e) {
          t.push(e);
        }),
        wr(t)
      );
    }),
    (j.prototype.entries = function () {
      var t = [];
      return (
        this.forEach(function (e, r) {
          t.push([r, e]);
        }),
        wr(t)
      );
    }),
    te.iterable && (j.prototype[Symbol.iterator] = j.prototype.entries);
  function vr(t) {
    if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
    t.bodyUsed = !0;
  }
  function An(t) {
    return new Promise(function (e, r) {
      (t.onload = function () {
        e(t.result);
      }),
        (t.onerror = function () {
          r(t.error);
        });
    });
  }
  function Xo(t) {
    var e = new FileReader(),
      r = An(e);
    return e.readAsArrayBuffer(t), r;
  }
  function Jo(t) {
    var e = new FileReader(),
      r = An(e);
    return e.readAsText(t), r;
  }
  function Ko(t) {
    for (
      var e = new Uint8Array(t), r = new Array(e.length), n = 0;
      n < e.length;
      n++
    )
      r[n] = String.fromCharCode(e[n]);
    return r.join("");
  }
  function xn(t) {
    if (t.slice) return t.slice(0);
    var e = new Uint8Array(t.byteLength);
    return e.set(new Uint8Array(t)), e.buffer;
  }
  function Sn() {
    return (
      (this.bodyUsed = !1),
      (this._initBody = function (t) {
        (this.bodyUsed = this.bodyUsed),
          (this._bodyInit = t),
          t
            ? typeof t == "string"
              ? (this._bodyText = t)
              : te.blob && Blob.prototype.isPrototypeOf(t)
              ? (this._bodyBlob = t)
              : te.formData && FormData.prototype.isPrototypeOf(t)
              ? (this._bodyFormData = t)
              : te.searchParams && URLSearchParams.prototype.isPrototypeOf(t)
              ? (this._bodyText = t.toString())
              : te.arrayBuffer && te.blob && Wo(t)
              ? ((this._bodyArrayBuffer = xn(t.buffer)),
                (this._bodyInit = new Blob([this._bodyArrayBuffer])))
              : te.arrayBuffer &&
                (ArrayBuffer.prototype.isPrototypeOf(t) || Yo(t))
              ? (this._bodyArrayBuffer = xn(t))
              : (this._bodyText = t = Object.prototype.toString.call(t))
            : (this._bodyText = ""),
          this.headers.get("content-type") ||
            (typeof t == "string"
              ? this.headers.set("content-type", "text/plain;charset=UTF-8")
              : this._bodyBlob && this._bodyBlob.type
              ? this.headers.set("content-type", this._bodyBlob.type)
              : te.searchParams &&
                URLSearchParams.prototype.isPrototypeOf(t) &&
                this.headers.set(
                  "content-type",
                  "application/x-www-form-urlencoded;charset=UTF-8"
                ));
      }),
      te.blob &&
        ((this.blob = function () {
          var t = vr(this);
          if (t) return t;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }),
        (this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            var t = vr(this);
            return (
              t ||
              (ArrayBuffer.isView(this._bodyArrayBuffer)
                ? Promise.resolve(
                    this._bodyArrayBuffer.buffer.slice(
                      this._bodyArrayBuffer.byteOffset,
                      this._bodyArrayBuffer.byteOffset +
                        this._bodyArrayBuffer.byteLength
                    )
                  )
                : Promise.resolve(this._bodyArrayBuffer))
            );
          } else return this.blob().then(Xo);
        })),
      (this.text = function () {
        var t = vr(this);
        if (t) return t;
        if (this._bodyBlob) return Jo(this._bodyBlob);
        if (this._bodyArrayBuffer)
          return Promise.resolve(Ko(this._bodyArrayBuffer));
        if (this._bodyFormData)
          throw new Error("could not read FormData body as text");
        return Promise.resolve(this._bodyText);
      }),
      te.formData &&
        (this.formData = function () {
          return this.text().then(ea);
        }),
      (this.json = function () {
        return this.text().then(JSON.parse);
      }),
      this
    );
  }
  var Qo = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
  function Zo(t) {
    var e = t.toUpperCase();
    return Qo.indexOf(e) > -1 ? e : t;
  }
  function Ue(t, e) {
    if (!(this instanceof Ue))
      throw new TypeError(
        'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
      );
    e = e || {};
    var r = e.body;
    if (t instanceof Ue) {
      if (t.bodyUsed) throw new TypeError("Already read");
      (this.url = t.url),
        (this.credentials = t.credentials),
        e.headers || (this.headers = new j(t.headers)),
        (this.method = t.method),
        (this.mode = t.mode),
        (this.signal = t.signal),
        !r && t._bodyInit != null && ((r = t._bodyInit), (t.bodyUsed = !0));
    } else this.url = String(t);
    if (
      ((this.credentials = e.credentials || this.credentials || "same-origin"),
      (e.headers || !this.headers) && (this.headers = new j(e.headers)),
      (this.method = Zo(e.method || this.method || "GET")),
      (this.mode = e.mode || this.mode || null),
      (this.signal = e.signal || this.signal),
      (this.referrer = null),
      (this.method === "GET" || this.method === "HEAD") && r)
    )
      throw new TypeError("Body not allowed for GET or HEAD requests");
    if (
      (this._initBody(r),
      (this.method === "GET" || this.method === "HEAD") &&
        (e.cache === "no-store" || e.cache === "no-cache"))
    ) {
      var n = /([?&])_=[^&]*/;
      if (n.test(this.url))
        this.url = this.url.replace(n, "$1_=" + new Date().getTime());
      else {
        var a = /\?/;
        this.url +=
          (a.test(this.url) ? "&" : "?") + "_=" + new Date().getTime();
      }
    }
  }
  Ue.prototype.clone = function () {
    return new Ue(this, { body: this._bodyInit });
  };
  function ea(t) {
    var e = new FormData();
    return (
      t
        .trim()
        .split("&")
        .forEach(function (r) {
          if (r) {
            var n = r.split("="),
              a = n.shift().replace(/\+/g, " "),
              s = n.join("=").replace(/\+/g, " ");
            e.append(decodeURIComponent(a), decodeURIComponent(s));
          }
        }),
      e
    );
  }
  function ta(t) {
    var e = new j(),
      r = t.replace(/\r?\n[\t ]+/g, " ");
    return (
      r
        .split("\r")
        .map(function (n) {
          return n.indexOf(`
`) === 0
            ? n.substr(1, n.length)
            : n;
        })
        .forEach(function (n) {
          var a = n.split(":"),
            s = a.shift().trim();
          if (s) {
            var f = a.join(":").trim();
            e.append(s, f);
          }
        }),
      e
    );
  }
  Sn.call(Ue.prototype);
  function pe(t, e) {
    if (!(this instanceof pe))
      throw new TypeError(
        'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
      );
    e || (e = {}),
      (this.type = "default"),
      (this.status = e.status === void 0 ? 200 : e.status),
      (this.ok = this.status >= 200 && this.status < 300),
      (this.statusText = e.statusText === void 0 ? "" : "" + e.statusText),
      (this.headers = new j(e.headers)),
      (this.url = e.url || ""),
      this._initBody(t);
  }
  Sn.call(pe.prototype),
    (pe.prototype.clone = function () {
      return new pe(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new j(this.headers),
        url: this.url,
      });
    }),
    (pe.error = function () {
      var t = new pe(null, { status: 0, statusText: "" });
      return (t.type = "error"), t;
    });
  var ra = [301, 302, 303, 307, 308];
  pe.redirect = function (t, e) {
    if (ra.indexOf(e) === -1) throw new RangeError("Invalid status code");
    return new pe(null, { status: e, headers: { location: t } });
  };
  var Ce = K.DOMException;
  try {
    new Ce();
  } catch {
    (Ce = function (e, r) {
      (this.message = e), (this.name = r);
      var n = Error(e);
      this.stack = n.stack;
    }),
      (Ce.prototype = Object.create(Error.prototype)),
      (Ce.prototype.constructor = Ce);
  }
  function In(t, e) {
    return new Promise(function (r, n) {
      var a = new Ue(t, e);
      if (a.signal && a.signal.aborted)
        return n(new Ce("Aborted", "AbortError"));
      var s = new XMLHttpRequest();
      function f() {
        s.abort();
      }
      (s.onload = function () {
        var h = {
          status: s.status,
          statusText: s.statusText,
          headers: ta(s.getAllResponseHeaders() || ""),
        };
        h.url =
          "responseURL" in s ? s.responseURL : h.headers.get("X-Request-URL");
        var m = "response" in s ? s.response : s.responseText;
        setTimeout(function () {
          r(new pe(m, h));
        }, 0);
      }),
        (s.onerror = function () {
          setTimeout(function () {
            n(new TypeError("Network request failed"));
          }, 0);
        }),
        (s.ontimeout = function () {
          setTimeout(function () {
            n(new TypeError("Network request failed"));
          }, 0);
        }),
        (s.onabort = function () {
          setTimeout(function () {
            n(new Ce("Aborted", "AbortError"));
          }, 0);
        });
      function p(h) {
        try {
          return h === "" && K.location.href ? K.location.href : h;
        } catch {
          return h;
        }
      }
      s.open(a.method, p(a.url), !0),
        a.credentials === "include"
          ? (s.withCredentials = !0)
          : a.credentials === "omit" && (s.withCredentials = !1),
        "responseType" in s &&
          (te.blob
            ? (s.responseType = "blob")
            : te.arrayBuffer &&
              a.headers.get("Content-Type") &&
              a.headers
                .get("Content-Type")
                .indexOf("application/octet-stream") !== -1 &&
              (s.responseType = "arraybuffer")),
        e && typeof e.headers == "object" && !(e.headers instanceof j)
          ? Object.getOwnPropertyNames(e.headers).forEach(function (h) {
              s.setRequestHeader(h, mr(e.headers[h]));
            })
          : a.headers.forEach(function (h, m) {
              s.setRequestHeader(m, h);
            }),
        a.signal &&
          (a.signal.addEventListener("abort", f),
          (s.onreadystatechange = function () {
            s.readyState === 4 && a.signal.removeEventListener("abort", f);
          })),
        s.send(typeof a._bodyInit > "u" ? null : a._bodyInit);
    });
  }
  (In.polyfill = !0),
    K.fetch ||
      ((K.fetch = In), (K.Headers = j), (K.Request = Ue), (K.Response = pe)),
    self.fetch.bind(self);
  var na = function () {
      if (
        typeof Symbol != "function" ||
        typeof Object.getOwnPropertySymbols != "function"
      )
        return !1;
      if (typeof Symbol.iterator == "symbol") return !0;
      var e = {},
        r = Symbol("test"),
        n = Object(r);
      if (
        typeof r == "string" ||
        Object.prototype.toString.call(r) !== "[object Symbol]" ||
        Object.prototype.toString.call(n) !== "[object Symbol]"
      )
        return !1;
      var a = 42;
      e[r] = a;
      for (r in e) return !1;
      if (
        (typeof Object.keys == "function" && Object.keys(e).length !== 0) ||
        (typeof Object.getOwnPropertyNames == "function" &&
          Object.getOwnPropertyNames(e).length !== 0)
      )
        return !1;
      var s = Object.getOwnPropertySymbols(e);
      if (
        s.length !== 1 ||
        s[0] !== r ||
        !Object.prototype.propertyIsEnumerable.call(e, r)
      )
        return !1;
      if (typeof Object.getOwnPropertyDescriptor == "function") {
        var f = Object.getOwnPropertyDescriptor(e, r);
        if (f.value !== a || f.enumerable !== !0) return !1;
      }
      return !0;
    },
    Bn = typeof Symbol < "u" && Symbol,
    ia = na,
    oa = function () {
      return typeof Bn != "function" ||
        typeof Symbol != "function" ||
        typeof Bn("foo") != "symbol" ||
        typeof Symbol("bar") != "symbol"
        ? !1
        : ia();
    },
    On = { foo: {} },
    aa = Object,
    sa = function () {
      return (
        { __proto__: On }.foo === On.foo && !({ __proto__: null } instanceof aa)
      );
    },
    ua = "Function.prototype.bind called on incompatible ",
    _r = Array.prototype.slice,
    ca = Object.prototype.toString,
    fa = "[object Function]",
    la = function (e) {
      var r = this;
      if (typeof r != "function" || ca.call(r) !== fa)
        throw new TypeError(ua + r);
      for (
        var n = _r.call(arguments, 1),
          a,
          s = function () {
            if (this instanceof a) {
              var v = r.apply(this, n.concat(_r.call(arguments)));
              return Object(v) === v ? v : this;
            } else return r.apply(e, n.concat(_r.call(arguments)));
          },
          f = Math.max(0, r.length - n.length),
          p = [],
          h = 0;
        h < f;
        h++
      )
        p.push("$" + h);
      if (
        ((a = Function(
          "binder",
          "return function (" +
            p.join(",") +
            "){ return binder.apply(this,arguments); }"
        )(s)),
        r.prototype)
      ) {
        var m = function () {};
        (m.prototype = r.prototype),
          (a.prototype = new m()),
          (m.prototype = null);
      }
      return a;
    },
    pa = la,
    br = Function.prototype.bind || pa,
    ha = br,
    da = ha.call(Function.call, Object.prototype.hasOwnProperty),
    C,
    He = SyntaxError,
    $n = Function,
    Ye = TypeError,
    Er = function (t) {
      try {
        return $n('"use strict"; return (' + t + ").constructor;")();
      } catch {}
    },
    De = Object.getOwnPropertyDescriptor;
  if (De)
    try {
      De({}, "");
    } catch {
      De = null;
    }
  var Ar = function () {
      throw new Ye();
    },
    ya = De
      ? (function () {
          try {
            return arguments.callee, Ar;
          } catch {
            try {
              return De(arguments, "callee").get;
            } catch {
              return Ar;
            }
          }
        })()
      : Ar,
    Xe = oa(),
    ga = sa(),
    W =
      Object.getPrototypeOf ||
      (ga
        ? function (t) {
            return t.__proto__;
          }
        : null),
    Je = {},
    ma = typeof Uint8Array > "u" || !W ? C : W(Uint8Array),
    Ne = {
      "%AggregateError%": typeof AggregateError > "u" ? C : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer > "u" ? C : ArrayBuffer,
      "%ArrayIteratorPrototype%": Xe && W ? W([][Symbol.iterator]()) : C,
      "%AsyncFromSyncIteratorPrototype%": C,
      "%AsyncFunction%": Je,
      "%AsyncGenerator%": Je,
      "%AsyncGeneratorFunction%": Je,
      "%AsyncIteratorPrototype%": Je,
      "%Atomics%": typeof Atomics > "u" ? C : Atomics,
      "%BigInt%": typeof BigInt > "u" ? C : BigInt,
      "%BigInt64Array%": typeof BigInt64Array > "u" ? C : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array > "u" ? C : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView > "u" ? C : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array > "u" ? C : Float32Array,
      "%Float64Array%": typeof Float64Array > "u" ? C : Float64Array,
      "%FinalizationRegistry%":
        typeof FinalizationRegistry > "u" ? C : FinalizationRegistry,
      "%Function%": $n,
      "%GeneratorFunction%": Je,
      "%Int8Array%": typeof Int8Array > "u" ? C : Int8Array,
      "%Int16Array%": typeof Int16Array > "u" ? C : Int16Array,
      "%Int32Array%": typeof Int32Array > "u" ? C : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": Xe && W ? W(W([][Symbol.iterator]())) : C,
      "%JSON%": typeof JSON == "object" ? JSON : C,
      "%Map%": typeof Map > "u" ? C : Map,
      "%MapIteratorPrototype%":
        typeof Map > "u" || !Xe || !W ? C : W(new Map()[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise > "u" ? C : Promise,
      "%Proxy%": typeof Proxy > "u" ? C : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect > "u" ? C : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set > "u" ? C : Set,
      "%SetIteratorPrototype%":
        typeof Set > "u" || !Xe || !W ? C : W(new Set()[Symbol.iterator]()),
      "%SharedArrayBuffer%":
        typeof SharedArrayBuffer > "u" ? C : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": Xe && W ? W(""[Symbol.iterator]()) : C,
      "%Symbol%": Xe ? Symbol : C,
      "%SyntaxError%": He,
      "%ThrowTypeError%": ya,
      "%TypedArray%": ma,
      "%TypeError%": Ye,
      "%Uint8Array%": typeof Uint8Array > "u" ? C : Uint8Array,
      "%Uint8ClampedArray%":
        typeof Uint8ClampedArray > "u" ? C : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array > "u" ? C : Uint16Array,
      "%Uint32Array%": typeof Uint32Array > "u" ? C : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap > "u" ? C : WeakMap,
      "%WeakRef%": typeof WeakRef > "u" ? C : WeakRef,
      "%WeakSet%": typeof WeakSet > "u" ? C : WeakSet,
    };
  if (W)
    try {
      null.error;
    } catch (t) {
      var wa = W(W(t));
      Ne["%Error.prototype%"] = wa;
    }
  var va = function t(e) {
      var r;
      if (e === "%AsyncFunction%") r = Er("async function () {}");
      else if (e === "%GeneratorFunction%") r = Er("function* () {}");
      else if (e === "%AsyncGeneratorFunction%")
        r = Er("async function* () {}");
      else if (e === "%AsyncGenerator%") {
        var n = t("%AsyncGeneratorFunction%");
        n && (r = n.prototype);
      } else if (e === "%AsyncIteratorPrototype%") {
        var a = t("%AsyncGenerator%");
        a && W && (r = W(a.prototype));
      }
      return (Ne[e] = r), r;
    },
    Tn = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": [
        "AsyncGeneratorFunction",
        "prototype",
        "prototype",
      ],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"],
    },
    dt = br,
    Dt = da,
    _a = dt.call(Function.call, Array.prototype.concat),
    ba = dt.call(Function.apply, Array.prototype.splice),
    Rn = dt.call(Function.call, String.prototype.replace),
    Nt = dt.call(Function.call, String.prototype.slice),
    Ea = dt.call(Function.call, RegExp.prototype.exec),
    Aa =
      /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
    xa = /\\(\\)?/g,
    Sa = function (e) {
      var r = Nt(e, 0, 1),
        n = Nt(e, -1);
      if (r === "%" && n !== "%")
        throw new He("invalid intrinsic syntax, expected closing `%`");
      if (n === "%" && r !== "%")
        throw new He("invalid intrinsic syntax, expected opening `%`");
      var a = [];
      return (
        Rn(e, Aa, function (s, f, p, h) {
          a[a.length] = p ? Rn(h, xa, "$1") : f || s;
        }),
        a
      );
    },
    Ia = function (e, r) {
      var n = e,
        a;
      if ((Dt(Tn, n) && ((a = Tn[n]), (n = "%" + a[0] + "%")), Dt(Ne, n))) {
        var s = Ne[n];
        if ((s === Je && (s = va(n)), typeof s > "u" && !r))
          throw new Ye(
            "intrinsic " +
              e +
              " exists, but is not available. Please file an issue!"
          );
        return { alias: a, name: n, value: s };
      }
      throw new He("intrinsic " + e + " does not exist!");
    },
    xr = function (e, r) {
      if (typeof e != "string" || e.length === 0)
        throw new Ye("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof r != "boolean")
        throw new Ye('"allowMissing" argument must be a boolean');
      if (Ea(/^%?[^%]*%?$/, e) === null)
        throw new He(
          "`%` may not be present anywhere but at the beginning and end of the intrinsic name"
        );
      var n = Sa(e),
        a = n.length > 0 ? n[0] : "",
        s = Ia("%" + a + "%", r),
        f = s.name,
        p = s.value,
        h = !1,
        m = s.alias;
      m && ((a = m[0]), ba(n, _a([0, 1], m)));
      for (var v = 1, _ = !0; v < n.length; v += 1) {
        var b = n[v],
          y = Nt(b, 0, 1),
          x = Nt(b, -1);
        if (
          (y === '"' ||
            y === "'" ||
            y === "`" ||
            x === '"' ||
            x === "'" ||
            x === "`") &&
          y !== x
        )
          throw new He("property names with quotes must have matching quotes");
        if (
          ((b === "constructor" || !_) && (h = !0),
          (a += "." + b),
          (f = "%" + a + "%"),
          Dt(Ne, f))
        )
          p = Ne[f];
        else if (p != null) {
          if (!(b in p)) {
            if (!r)
              throw new Ye(
                "base intrinsic for " +
                  e +
                  " exists, but the property is not available."
              );
            return;
          }
          if (De && v + 1 >= n.length) {
            var I = De(p, b);
            (_ = !!I),
              _ && "get" in I && !("originalValue" in I.get)
                ? (p = I.get)
                : (p = p[b]);
          } else (_ = Dt(p, b)), (p = p[b]);
          _ && !h && (Ne[f] = p);
        }
      }
      return p;
    },
    Pn = { exports: {} };
  (function (t) {
    var e = br,
      r = xr,
      n = r("%Function.prototype.apply%"),
      a = r("%Function.prototype.call%"),
      s = r("%Reflect.apply%", !0) || e.call(a, n),
      f = r("%Object.getOwnPropertyDescriptor%", !0),
      p = r("%Object.defineProperty%", !0),
      h = r("%Math.max%");
    if (p)
      try {
        p({}, "a", { value: 1 });
      } catch {
        p = null;
      }
    t.exports = function (_) {
      var b = s(e, a, arguments);
      if (f && p) {
        var y = f(b, "length");
        y.configurable &&
          p(b, "length", {
            value: 1 + h(0, _.length - (arguments.length - 1)),
          });
      }
      return b;
    };
    var m = function () {
      return s(e, n, arguments);
    };
    p ? p(t.exports, "apply", { value: m }) : (t.exports.apply = m);
  })(Pn);
  var Fn = xr,
    Un = Pn.exports,
    Ba = Un(Fn("String.prototype.indexOf")),
    Oa = function (e, r) {
      var n = Fn(e, !!r);
      return typeof n == "function" && Ba(e, ".prototype.") > -1 ? Un(n) : n;
    },
    Ke =
      typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : {},
    he = [],
    ue = [],
    $a = typeof Uint8Array < "u" ? Uint8Array : Array,
    Sr = !1;
  function Cn() {
    Sr = !0;
    for (
      var t =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        e = 0,
        r = t.length;
      e < r;
      ++e
    )
      (he[e] = t[e]), (ue[t.charCodeAt(e)] = e);
    (ue["-".charCodeAt(0)] = 62), (ue["_".charCodeAt(0)] = 63);
  }
  function Ta(t) {
    Sr || Cn();
    var e,
      r,
      n,
      a,
      s,
      f,
      p = t.length;
    if (p % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    (s = t[p - 2] === "=" ? 2 : t[p - 1] === "=" ? 1 : 0),
      (f = new $a((p * 3) / 4 - s)),
      (n = s > 0 ? p - 4 : p);
    var h = 0;
    for (e = 0, r = 0; e < n; e += 4, r += 3)
      (a =
        (ue[t.charCodeAt(e)] << 18) |
        (ue[t.charCodeAt(e + 1)] << 12) |
        (ue[t.charCodeAt(e + 2)] << 6) |
        ue[t.charCodeAt(e + 3)]),
        (f[h++] = (a >> 16) & 255),
        (f[h++] = (a >> 8) & 255),
        (f[h++] = a & 255);
    return (
      s === 2
        ? ((a = (ue[t.charCodeAt(e)] << 2) | (ue[t.charCodeAt(e + 1)] >> 4)),
          (f[h++] = a & 255))
        : s === 1 &&
          ((a =
            (ue[t.charCodeAt(e)] << 10) |
            (ue[t.charCodeAt(e + 1)] << 4) |
            (ue[t.charCodeAt(e + 2)] >> 2)),
          (f[h++] = (a >> 8) & 255),
          (f[h++] = a & 255)),
      f
    );
  }
  function Ra(t) {
    return (
      he[(t >> 18) & 63] + he[(t >> 12) & 63] + he[(t >> 6) & 63] + he[t & 63]
    );
  }
  function Pa(t, e, r) {
    for (var n, a = [], s = e; s < r; s += 3)
      (n = (t[s] << 16) + (t[s + 1] << 8) + t[s + 2]), a.push(Ra(n));
    return a.join("");
  }
  function Dn(t) {
    Sr || Cn();
    for (
      var e,
        r = t.length,
        n = r % 3,
        a = "",
        s = [],
        f = 16383,
        p = 0,
        h = r - n;
      p < h;
      p += f
    )
      s.push(Pa(t, p, p + f > h ? h : p + f));
    return (
      n === 1
        ? ((e = t[r - 1]),
          (a += he[e >> 2]),
          (a += he[(e << 4) & 63]),
          (a += "=="))
        : n === 2 &&
          ((e = (t[r - 2] << 8) + t[r - 1]),
          (a += he[e >> 10]),
          (a += he[(e >> 4) & 63]),
          (a += he[(e << 2) & 63]),
          (a += "=")),
      s.push(a),
      s.join("")
    );
  }
  function Mt(t, e, r, n, a) {
    var s,
      f,
      p = a * 8 - n - 1,
      h = (1 << p) - 1,
      m = h >> 1,
      v = -7,
      _ = r ? a - 1 : 0,
      b = r ? -1 : 1,
      y = t[e + _];
    for (
      _ += b, s = y & ((1 << -v) - 1), y >>= -v, v += p;
      v > 0;
      s = s * 256 + t[e + _], _ += b, v -= 8
    );
    for (
      f = s & ((1 << -v) - 1), s >>= -v, v += n;
      v > 0;
      f = f * 256 + t[e + _], _ += b, v -= 8
    );
    if (s === 0) s = 1 - m;
    else {
      if (s === h) return f ? NaN : (y ? -1 : 1) * (1 / 0);
      (f = f + Math.pow(2, n)), (s = s - m);
    }
    return (y ? -1 : 1) * f * Math.pow(2, s - n);
  }
  function Nn(t, e, r, n, a, s) {
    var f,
      p,
      h,
      m = s * 8 - a - 1,
      v = (1 << m) - 1,
      _ = v >> 1,
      b = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      y = n ? 0 : s - 1,
      x = n ? 1 : -1,
      I = e < 0 || (e === 0 && 1 / e < 0) ? 1 : 0;
    for (
      e = Math.abs(e),
        isNaN(e) || e === 1 / 0
          ? ((p = isNaN(e) ? 1 : 0), (f = v))
          : ((f = Math.floor(Math.log(e) / Math.LN2)),
            e * (h = Math.pow(2, -f)) < 1 && (f--, (h *= 2)),
            f + _ >= 1 ? (e += b / h) : (e += b * Math.pow(2, 1 - _)),
            e * h >= 2 && (f++, (h /= 2)),
            f + _ >= v
              ? ((p = 0), (f = v))
              : f + _ >= 1
              ? ((p = (e * h - 1) * Math.pow(2, a)), (f = f + _))
              : ((p = e * Math.pow(2, _ - 1) * Math.pow(2, a)), (f = 0)));
      a >= 8;
      t[r + y] = p & 255, y += x, p /= 256, a -= 8
    );
    for (
      f = (f << a) | p, m += a;
      m > 0;
      t[r + y] = f & 255, y += x, f /= 256, m -= 8
    );
    t[r + y - x] |= I * 128;
  }
  var Fa = {}.toString,
    Mn =
      Array.isArray ||
      function (t) {
        return Fa.call(t) == "[object Array]";
      };
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */ var Ua = 50;
  (E.TYPED_ARRAY_SUPPORT =
    Ke.TYPED_ARRAY_SUPPORT !== void 0 ? Ke.TYPED_ARRAY_SUPPORT : !0),
    Lt();
  function Lt() {
    return E.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function be(t, e) {
    if (Lt() < e) throw new RangeError("Invalid typed array length");
    return (
      E.TYPED_ARRAY_SUPPORT
        ? ((t = new Uint8Array(e)), (t.__proto__ = E.prototype))
        : (t === null && (t = new E(e)), (t.length = e)),
      t
    );
  }
  function E(t, e, r) {
    if (!E.TYPED_ARRAY_SUPPORT && !(this instanceof E)) return new E(t, e, r);
    if (typeof t == "number") {
      if (typeof e == "string")
        throw new Error(
          "If encoding is specified then the first argument must be a string"
        );
      return Ir(this, t);
    }
    return Ln(this, t, e, r);
  }
  (E.poolSize = 8192),
    (E._augment = function (t) {
      return (t.__proto__ = E.prototype), t;
    });
  function Ln(t, e, r, n) {
    if (typeof e == "number")
      throw new TypeError('"value" argument must not be a number');
    return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer
      ? Na(t, e, r, n)
      : typeof e == "string"
      ? Da(t, e, r)
      : Ma(t, e);
  }
  (E.from = function (t, e, r) {
    return Ln(null, t, e, r);
  }),
    E.TYPED_ARRAY_SUPPORT &&
      ((E.prototype.__proto__ = Uint8Array.prototype),
      (E.__proto__ = Uint8Array));
  function kn(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be a number');
    if (t < 0) throw new RangeError('"size" argument must not be negative');
  }
  function Ca(t, e, r, n) {
    return (
      kn(e),
      e <= 0
        ? be(t, e)
        : r !== void 0
        ? typeof n == "string"
          ? be(t, e).fill(r, n)
          : be(t, e).fill(r)
        : be(t, e)
    );
  }
  E.alloc = function (t, e, r) {
    return Ca(null, t, e, r);
  };
  function Ir(t, e) {
    if ((kn(e), (t = be(t, e < 0 ? 0 : Or(e) | 0)), !E.TYPED_ARRAY_SUPPORT))
      for (var r = 0; r < e; ++r) t[r] = 0;
    return t;
  }
  (E.allocUnsafe = function (t) {
    return Ir(null, t);
  }),
    (E.allocUnsafeSlow = function (t) {
      return Ir(null, t);
    });
  function Da(t, e, r) {
    if (((typeof r != "string" || r === "") && (r = "utf8"), !E.isEncoding(r)))
      throw new TypeError('"encoding" must be a valid string encoding');
    var n = jn(e, r) | 0;
    t = be(t, n);
    var a = t.write(e, r);
    return a !== n && (t = t.slice(0, a)), t;
  }
  function Br(t, e) {
    var r = e.length < 0 ? 0 : Or(e.length) | 0;
    t = be(t, r);
    for (var n = 0; n < r; n += 1) t[n] = e[n] & 255;
    return t;
  }
  function Na(t, e, r, n) {
    if ((e.byteLength, r < 0 || e.byteLength < r))
      throw new RangeError("'offset' is out of bounds");
    if (e.byteLength < r + (n || 0))
      throw new RangeError("'length' is out of bounds");
    return (
      r === void 0 && n === void 0
        ? (e = new Uint8Array(e))
        : n === void 0
        ? (e = new Uint8Array(e, r))
        : (e = new Uint8Array(e, r, n)),
      E.TYPED_ARRAY_SUPPORT
        ? ((t = e), (t.__proto__ = E.prototype))
        : (t = Br(t, e)),
      t
    );
  }
  function Ma(t, e) {
    if (de(e)) {
      var r = Or(e.length) | 0;
      return (t = be(t, r)), t.length === 0 || e.copy(t, 0, 0, r), t;
    }
    if (e) {
      if (
        (typeof ArrayBuffer < "u" && e.buffer instanceof ArrayBuffer) ||
        "length" in e
      )
        return typeof e.length != "number" || ns(e.length)
          ? be(t, 0)
          : Br(t, e);
      if (e.type === "Buffer" && Mn(e.data)) return Br(t, e.data);
    }
    throw new TypeError(
      "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
    );
  }
  function Or(t) {
    if (t >= Lt())
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          Lt().toString(16) +
          " bytes"
      );
    return t | 0;
  }
  E.isBuffer = is;
  function de(t) {
    return !!(t != null && t._isBuffer);
  }
  (E.compare = function (e, r) {
    if (!de(e) || !de(r)) throw new TypeError("Arguments must be Buffers");
    if (e === r) return 0;
    for (var n = e.length, a = r.length, s = 0, f = Math.min(n, a); s < f; ++s)
      if (e[s] !== r[s]) {
        (n = e[s]), (a = r[s]);
        break;
      }
    return n < a ? -1 : a < n ? 1 : 0;
  }),
    (E.isEncoding = function (e) {
      switch (String(e).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (E.concat = function (e, r) {
      if (!Mn(e))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (e.length === 0) return E.alloc(0);
      var n;
      if (r === void 0) for (r = 0, n = 0; n < e.length; ++n) r += e[n].length;
      var a = E.allocUnsafe(r),
        s = 0;
      for (n = 0; n < e.length; ++n) {
        var f = e[n];
        if (!de(f))
          throw new TypeError('"list" argument must be an Array of Buffers');
        f.copy(a, s), (s += f.length);
      }
      return a;
    });
  function jn(t, e) {
    if (de(t)) return t.length;
    if (
      typeof ArrayBuffer < "u" &&
      typeof ArrayBuffer.isView == "function" &&
      (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
    )
      return t.byteLength;
    typeof t != "string" && (t = "" + t);
    var r = t.length;
    if (r === 0) return 0;
    for (var n = !1; ; )
      switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return r;
        case "utf8":
        case "utf-8":
        case void 0:
          return qt(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return r * 2;
        case "hex":
          return r >>> 1;
        case "base64":
          return Jn(t).length;
        default:
          if (n) return qt(t).length;
          (e = ("" + e).toLowerCase()), (n = !0);
      }
  }
  E.byteLength = jn;
  function La(t, e, r) {
    var n = !1;
    if (
      ((e === void 0 || e < 0) && (e = 0),
      e > this.length ||
        ((r === void 0 || r > this.length) && (r = this.length), r <= 0) ||
        ((r >>>= 0), (e >>>= 0), r <= e))
    )
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return Xa(this, e, r);
        case "utf8":
        case "utf-8":
          return Gn(this, e, r);
        case "ascii":
          return Ha(this, e, r);
        case "latin1":
        case "binary":
          return Ya(this, e, r);
        case "base64":
          return Ga(this, e, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Ja(this, e, r);
        default:
          if (n) throw new TypeError("Unknown encoding: " + t);
          (t = (t + "").toLowerCase()), (n = !0);
      }
  }
  E.prototype._isBuffer = !0;
  function Me(t, e, r) {
    var n = t[e];
    (t[e] = t[r]), (t[r] = n);
  }
  (E.prototype.swap16 = function () {
    var e = this.length;
    if (e % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var r = 0; r < e; r += 2) Me(this, r, r + 1);
    return this;
  }),
    (E.prototype.swap32 = function () {
      var e = this.length;
      if (e % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var r = 0; r < e; r += 4) Me(this, r, r + 3), Me(this, r + 1, r + 2);
      return this;
    }),
    (E.prototype.swap64 = function () {
      var e = this.length;
      if (e % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var r = 0; r < e; r += 8)
        Me(this, r, r + 7),
          Me(this, r + 1, r + 6),
          Me(this, r + 2, r + 5),
          Me(this, r + 3, r + 4);
      return this;
    }),
    (E.prototype.toString = function () {
      var e = this.length | 0;
      return e === 0
        ? ""
        : arguments.length === 0
        ? Gn(this, 0, e)
        : La.apply(this, arguments);
    }),
    (E.prototype.equals = function (e) {
      if (!de(e)) throw new TypeError("Argument must be a Buffer");
      return this === e ? !0 : E.compare(this, e) === 0;
    }),
    (E.prototype.inspect = function () {
      var e = "",
        r = Ua;
      return (
        this.length > 0 &&
          ((e = this.toString("hex", 0, r).match(/.{2}/g).join(" ")),
          this.length > r && (e += " ... ")),
        "<Buffer " + e + ">"
      );
    }),
    (E.prototype.compare = function (e, r, n, a, s) {
      if (!de(e)) throw new TypeError("Argument must be a Buffer");
      if (
        (r === void 0 && (r = 0),
        n === void 0 && (n = e ? e.length : 0),
        a === void 0 && (a = 0),
        s === void 0 && (s = this.length),
        r < 0 || n > e.length || a < 0 || s > this.length)
      )
        throw new RangeError("out of range index");
      if (a >= s && r >= n) return 0;
      if (a >= s) return -1;
      if (r >= n) return 1;
      if (((r >>>= 0), (n >>>= 0), (a >>>= 0), (s >>>= 0), this === e))
        return 0;
      for (
        var f = s - a,
          p = n - r,
          h = Math.min(f, p),
          m = this.slice(a, s),
          v = e.slice(r, n),
          _ = 0;
        _ < h;
        ++_
      )
        if (m[_] !== v[_]) {
          (f = m[_]), (p = v[_]);
          break;
        }
      return f < p ? -1 : p < f ? 1 : 0;
    });
  function qn(t, e, r, n, a) {
    if (t.length === 0) return -1;
    if (
      (typeof r == "string"
        ? ((n = r), (r = 0))
        : r > 2147483647
        ? (r = 2147483647)
        : r < -2147483648 && (r = -2147483648),
      (r = +r),
      isNaN(r) && (r = a ? 0 : t.length - 1),
      r < 0 && (r = t.length + r),
      r >= t.length)
    ) {
      if (a) return -1;
      r = t.length - 1;
    } else if (r < 0)
      if (a) r = 0;
      else return -1;
    if ((typeof e == "string" && (e = E.from(e, n)), de(e)))
      return e.length === 0 ? -1 : Vn(t, e, r, n, a);
    if (typeof e == "number")
      return (
        (e = e & 255),
        E.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf == "function"
          ? a
            ? Uint8Array.prototype.indexOf.call(t, e, r)
            : Uint8Array.prototype.lastIndexOf.call(t, e, r)
          : Vn(t, [e], r, n, a)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function Vn(t, e, r, n, a) {
    var s = 1,
      f = t.length,
      p = e.length;
    if (
      n !== void 0 &&
      ((n = String(n).toLowerCase()),
      n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")
    ) {
      if (t.length < 2 || e.length < 2) return -1;
      (s = 2), (f /= 2), (p /= 2), (r /= 2);
    }
    function h(y, x) {
      return s === 1 ? y[x] : y.readUInt16BE(x * s);
    }
    var m;
    if (a) {
      var v = -1;
      for (m = r; m < f; m++)
        if (h(t, m) === h(e, v === -1 ? 0 : m - v)) {
          if ((v === -1 && (v = m), m - v + 1 === p)) return v * s;
        } else v !== -1 && (m -= m - v), (v = -1);
    } else
      for (r + p > f && (r = f - p), m = r; m >= 0; m--) {
        for (var _ = !0, b = 0; b < p; b++)
          if (h(t, m + b) !== h(e, b)) {
            _ = !1;
            break;
          }
        if (_) return m;
      }
    return -1;
  }
  (E.prototype.includes = function (e, r, n) {
    return this.indexOf(e, r, n) !== -1;
  }),
    (E.prototype.indexOf = function (e, r, n) {
      return qn(this, e, r, n, !0);
    }),
    (E.prototype.lastIndexOf = function (e, r, n) {
      return qn(this, e, r, n, !1);
    });
  function ka(t, e, r, n) {
    r = Number(r) || 0;
    var a = t.length - r;
    n ? ((n = Number(n)), n > a && (n = a)) : (n = a);
    var s = e.length;
    if (s % 2 !== 0) throw new TypeError("Invalid hex string");
    n > s / 2 && (n = s / 2);
    for (var f = 0; f < n; ++f) {
      var p = parseInt(e.substr(f * 2, 2), 16);
      if (isNaN(p)) return f;
      t[r + f] = p;
    }
    return f;
  }
  function ja(t, e, r, n) {
    return Vt(qt(e, t.length - r), t, r, n);
  }
  function zn(t, e, r, n) {
    return Vt(ts(e), t, r, n);
  }
  function qa(t, e, r, n) {
    return zn(t, e, r, n);
  }
  function Va(t, e, r, n) {
    return Vt(Jn(e), t, r, n);
  }
  function za(t, e, r, n) {
    return Vt(rs(e, t.length - r), t, r, n);
  }
  (E.prototype.write = function (e, r, n, a) {
    if (r === void 0) (a = "utf8"), (n = this.length), (r = 0);
    else if (n === void 0 && typeof r == "string")
      (a = r), (n = this.length), (r = 0);
    else if (isFinite(r))
      (r = r | 0),
        isFinite(n)
          ? ((n = n | 0), a === void 0 && (a = "utf8"))
          : ((a = n), (n = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var s = this.length - r;
    if (
      ((n === void 0 || n > s) && (n = s),
      (e.length > 0 && (n < 0 || r < 0)) || r > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    a || (a = "utf8");
    for (var f = !1; ; )
      switch (a) {
        case "hex":
          return ka(this, e, r, n);
        case "utf8":
        case "utf-8":
          return ja(this, e, r, n);
        case "ascii":
          return zn(this, e, r, n);
        case "latin1":
        case "binary":
          return qa(this, e, r, n);
        case "base64":
          return Va(this, e, r, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return za(this, e, r, n);
        default:
          if (f) throw new TypeError("Unknown encoding: " + a);
          (a = ("" + a).toLowerCase()), (f = !0);
      }
  }),
    (E.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function Ga(t, e, r) {
    return e === 0 && r === t.length ? Dn(t) : Dn(t.slice(e, r));
  }
  function Gn(t, e, r) {
    r = Math.min(t.length, r);
    for (var n = [], a = e; a < r; ) {
      var s = t[a],
        f = null,
        p = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
      if (a + p <= r) {
        var h, m, v, _;
        switch (p) {
          case 1:
            s < 128 && (f = s);
            break;
          case 2:
            (h = t[a + 1]),
              (h & 192) === 128 &&
                ((_ = ((s & 31) << 6) | (h & 63)), _ > 127 && (f = _));
            break;
          case 3:
            (h = t[a + 1]),
              (m = t[a + 2]),
              (h & 192) === 128 &&
                (m & 192) === 128 &&
                ((_ = ((s & 15) << 12) | ((h & 63) << 6) | (m & 63)),
                _ > 2047 && (_ < 55296 || _ > 57343) && (f = _));
            break;
          case 4:
            (h = t[a + 1]),
              (m = t[a + 2]),
              (v = t[a + 3]),
              (h & 192) === 128 &&
                (m & 192) === 128 &&
                (v & 192) === 128 &&
                ((_ =
                  ((s & 15) << 18) |
                  ((h & 63) << 12) |
                  ((m & 63) << 6) |
                  (v & 63)),
                _ > 65535 && _ < 1114112 && (f = _));
        }
      }
      f === null
        ? ((f = 65533), (p = 1))
        : f > 65535 &&
          ((f -= 65536),
          n.push(((f >>> 10) & 1023) | 55296),
          (f = 56320 | (f & 1023))),
        n.push(f),
        (a += p);
    }
    return Wa(n);
  }
  var Wn = 4096;
  function Wa(t) {
    var e = t.length;
    if (e <= Wn) return String.fromCharCode.apply(String, t);
    for (var r = "", n = 0; n < e; )
      r += String.fromCharCode.apply(String, t.slice(n, (n += Wn)));
    return r;
  }
  function Ha(t, e, r) {
    var n = "";
    r = Math.min(t.length, r);
    for (var a = e; a < r; ++a) n += String.fromCharCode(t[a] & 127);
    return n;
  }
  function Ya(t, e, r) {
    var n = "";
    r = Math.min(t.length, r);
    for (var a = e; a < r; ++a) n += String.fromCharCode(t[a]);
    return n;
  }
  function Xa(t, e, r) {
    var n = t.length;
    (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
    for (var a = "", s = e; s < r; ++s) a += es(t[s]);
    return a;
  }
  function Ja(t, e, r) {
    for (var n = t.slice(e, r), a = "", s = 0; s < n.length; s += 2)
      a += String.fromCharCode(n[s] + n[s + 1] * 256);
    return a;
  }
  E.prototype.slice = function (e, r) {
    var n = this.length;
    (e = ~~e),
      (r = r === void 0 ? n : ~~r),
      e < 0 ? ((e += n), e < 0 && (e = 0)) : e > n && (e = n),
      r < 0 ? ((r += n), r < 0 && (r = 0)) : r > n && (r = n),
      r < e && (r = e);
    var a;
    if (E.TYPED_ARRAY_SUPPORT)
      (a = this.subarray(e, r)), (a.__proto__ = E.prototype);
    else {
      var s = r - e;
      a = new E(s, void 0);
      for (var f = 0; f < s; ++f) a[f] = this[f + e];
    }
    return a;
  };
  function H(t, e, r) {
    if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
    if (t + e > r)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (E.prototype.readUIntLE = function (e, r, n) {
    (e = e | 0), (r = r | 0), n || H(e, r, this.length);
    for (var a = this[e], s = 1, f = 0; ++f < r && (s *= 256); )
      a += this[e + f] * s;
    return a;
  }),
    (E.prototype.readUIntBE = function (e, r, n) {
      (e = e | 0), (r = r | 0), n || H(e, r, this.length);
      for (var a = this[e + --r], s = 1; r > 0 && (s *= 256); )
        a += this[e + --r] * s;
      return a;
    }),
    (E.prototype.readUInt8 = function (e, r) {
      return r || H(e, 1, this.length), this[e];
    }),
    (E.prototype.readUInt16LE = function (e, r) {
      return r || H(e, 2, this.length), this[e] | (this[e + 1] << 8);
    }),
    (E.prototype.readUInt16BE = function (e, r) {
      return r || H(e, 2, this.length), (this[e] << 8) | this[e + 1];
    }),
    (E.prototype.readUInt32LE = function (e, r) {
      return (
        r || H(e, 4, this.length),
        (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
          this[e + 3] * 16777216
      );
    }),
    (E.prototype.readUInt32BE = function (e, r) {
      return (
        r || H(e, 4, this.length),
        this[e] * 16777216 +
          ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
      );
    }),
    (E.prototype.readIntLE = function (e, r, n) {
      (e = e | 0), (r = r | 0), n || H(e, r, this.length);
      for (var a = this[e], s = 1, f = 0; ++f < r && (s *= 256); )
        a += this[e + f] * s;
      return (s *= 128), a >= s && (a -= Math.pow(2, 8 * r)), a;
    }),
    (E.prototype.readIntBE = function (e, r, n) {
      (e = e | 0), (r = r | 0), n || H(e, r, this.length);
      for (var a = r, s = 1, f = this[e + --a]; a > 0 && (s *= 256); )
        f += this[e + --a] * s;
      return (s *= 128), f >= s && (f -= Math.pow(2, 8 * r)), f;
    }),
    (E.prototype.readInt8 = function (e, r) {
      return (
        r || H(e, 1, this.length),
        this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e]
      );
    }),
    (E.prototype.readInt16LE = function (e, r) {
      r || H(e, 2, this.length);
      var n = this[e] | (this[e + 1] << 8);
      return n & 32768 ? n | 4294901760 : n;
    }),
    (E.prototype.readInt16BE = function (e, r) {
      r || H(e, 2, this.length);
      var n = this[e + 1] | (this[e] << 8);
      return n & 32768 ? n | 4294901760 : n;
    }),
    (E.prototype.readInt32LE = function (e, r) {
      return (
        r || H(e, 4, this.length),
        this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
      );
    }),
    (E.prototype.readInt32BE = function (e, r) {
      return (
        r || H(e, 4, this.length),
        (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
      );
    }),
    (E.prototype.readFloatLE = function (e, r) {
      return r || H(e, 4, this.length), Mt(this, e, !0, 23, 4);
    }),
    (E.prototype.readFloatBE = function (e, r) {
      return r || H(e, 4, this.length), Mt(this, e, !1, 23, 4);
    }),
    (E.prototype.readDoubleLE = function (e, r) {
      return r || H(e, 8, this.length), Mt(this, e, !0, 52, 8);
    }),
    (E.prototype.readDoubleBE = function (e, r) {
      return r || H(e, 8, this.length), Mt(this, e, !1, 52, 8);
    });
  function re(t, e, r, n, a, s) {
    if (!de(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > a || e < s)
      throw new RangeError('"value" argument is out of bounds');
    if (r + n > t.length) throw new RangeError("Index out of range");
  }
  (E.prototype.writeUIntLE = function (e, r, n, a) {
    if (((e = +e), (r = r | 0), (n = n | 0), !a)) {
      var s = Math.pow(2, 8 * n) - 1;
      re(this, e, r, n, s, 0);
    }
    var f = 1,
      p = 0;
    for (this[r] = e & 255; ++p < n && (f *= 256); )
      this[r + p] = (e / f) & 255;
    return r + n;
  }),
    (E.prototype.writeUIntBE = function (e, r, n, a) {
      if (((e = +e), (r = r | 0), (n = n | 0), !a)) {
        var s = Math.pow(2, 8 * n) - 1;
        re(this, e, r, n, s, 0);
      }
      var f = n - 1,
        p = 1;
      for (this[r + f] = e & 255; --f >= 0 && (p *= 256); )
        this[r + f] = (e / p) & 255;
      return r + n;
    }),
    (E.prototype.writeUInt8 = function (e, r, n) {
      return (
        (e = +e),
        (r = r | 0),
        n || re(this, e, r, 1, 255, 0),
        E.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
        (this[r] = e & 255),
        r + 1
      );
    });
  function kt(t, e, r, n) {
    e < 0 && (e = 65535 + e + 1);
    for (var a = 0, s = Math.min(t.length - r, 2); a < s; ++a)
      t[r + a] = (e & (255 << (8 * (n ? a : 1 - a)))) >>> ((n ? a : 1 - a) * 8);
  }
  (E.prototype.writeUInt16LE = function (e, r, n) {
    return (
      (e = +e),
      (r = r | 0),
      n || re(this, e, r, 2, 65535, 0),
      E.TYPED_ARRAY_SUPPORT
        ? ((this[r] = e & 255), (this[r + 1] = e >>> 8))
        : kt(this, e, r, !0),
      r + 2
    );
  }),
    (E.prototype.writeUInt16BE = function (e, r, n) {
      return (
        (e = +e),
        (r = r | 0),
        n || re(this, e, r, 2, 65535, 0),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[r] = e >>> 8), (this[r + 1] = e & 255))
          : kt(this, e, r, !1),
        r + 2
      );
    });
  function jt(t, e, r, n) {
    e < 0 && (e = 4294967295 + e + 1);
    for (var a = 0, s = Math.min(t.length - r, 4); a < s; ++a)
      t[r + a] = (e >>> ((n ? a : 3 - a) * 8)) & 255;
  }
  (E.prototype.writeUInt32LE = function (e, r, n) {
    return (
      (e = +e),
      (r = r | 0),
      n || re(this, e, r, 4, 4294967295, 0),
      E.TYPED_ARRAY_SUPPORT
        ? ((this[r + 3] = e >>> 24),
          (this[r + 2] = e >>> 16),
          (this[r + 1] = e >>> 8),
          (this[r] = e & 255))
        : jt(this, e, r, !0),
      r + 4
    );
  }),
    (E.prototype.writeUInt32BE = function (e, r, n) {
      return (
        (e = +e),
        (r = r | 0),
        n || re(this, e, r, 4, 4294967295, 0),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[r] = e >>> 24),
            (this[r + 1] = e >>> 16),
            (this[r + 2] = e >>> 8),
            (this[r + 3] = e & 255))
          : jt(this, e, r, !1),
        r + 4
      );
    }),
    (E.prototype.writeIntLE = function (e, r, n, a) {
      if (((e = +e), (r = r | 0), !a)) {
        var s = Math.pow(2, 8 * n - 1);
        re(this, e, r, n, s - 1, -s);
      }
      var f = 0,
        p = 1,
        h = 0;
      for (this[r] = e & 255; ++f < n && (p *= 256); )
        e < 0 && h === 0 && this[r + f - 1] !== 0 && (h = 1),
          (this[r + f] = (((e / p) >> 0) - h) & 255);
      return r + n;
    }),
    (E.prototype.writeIntBE = function (e, r, n, a) {
      if (((e = +e), (r = r | 0), !a)) {
        var s = Math.pow(2, 8 * n - 1);
        re(this, e, r, n, s - 1, -s);
      }
      var f = n - 1,
        p = 1,
        h = 0;
      for (this[r + f] = e & 255; --f >= 0 && (p *= 256); )
        e < 0 && h === 0 && this[r + f + 1] !== 0 && (h = 1),
          (this[r + f] = (((e / p) >> 0) - h) & 255);
      return r + n;
    }),
    (E.prototype.writeInt8 = function (e, r, n) {
      return (
        (e = +e),
        (r = r | 0),
        n || re(this, e, r, 1, 127, -128),
        E.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
        e < 0 && (e = 255 + e + 1),
        (this[r] = e & 255),
        r + 1
      );
    }),
    (E.prototype.writeInt16LE = function (e, r, n) {
      return (
        (e = +e),
        (r = r | 0),
        n || re(this, e, r, 2, 32767, -32768),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[r] = e & 255), (this[r + 1] = e >>> 8))
          : kt(this, e, r, !0),
        r + 2
      );
    }),
    (E.prototype.writeInt16BE = function (e, r, n) {
      return (
        (e = +e),
        (r = r | 0),
        n || re(this, e, r, 2, 32767, -32768),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[r] = e >>> 8), (this[r + 1] = e & 255))
          : kt(this, e, r, !1),
        r + 2
      );
    }),
    (E.prototype.writeInt32LE = function (e, r, n) {
      return (
        (e = +e),
        (r = r | 0),
        n || re(this, e, r, 4, 2147483647, -2147483648),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[r] = e & 255),
            (this[r + 1] = e >>> 8),
            (this[r + 2] = e >>> 16),
            (this[r + 3] = e >>> 24))
          : jt(this, e, r, !0),
        r + 4
      );
    }),
    (E.prototype.writeInt32BE = function (e, r, n) {
      return (
        (e = +e),
        (r = r | 0),
        n || re(this, e, r, 4, 2147483647, -2147483648),
        e < 0 && (e = 4294967295 + e + 1),
        E.TYPED_ARRAY_SUPPORT
          ? ((this[r] = e >>> 24),
            (this[r + 1] = e >>> 16),
            (this[r + 2] = e >>> 8),
            (this[r + 3] = e & 255))
          : jt(this, e, r, !1),
        r + 4
      );
    });
  function Hn(t, e, r, n, a, s) {
    if (r + n > t.length) throw new RangeError("Index out of range");
    if (r < 0) throw new RangeError("Index out of range");
  }
  function Yn(t, e, r, n, a) {
    return a || Hn(t, e, r, 4), Nn(t, e, r, n, 23, 4), r + 4;
  }
  (E.prototype.writeFloatLE = function (e, r, n) {
    return Yn(this, e, r, !0, n);
  }),
    (E.prototype.writeFloatBE = function (e, r, n) {
      return Yn(this, e, r, !1, n);
    });
  function Xn(t, e, r, n, a) {
    return a || Hn(t, e, r, 8), Nn(t, e, r, n, 52, 8), r + 8;
  }
  (E.prototype.writeDoubleLE = function (e, r, n) {
    return Xn(this, e, r, !0, n);
  }),
    (E.prototype.writeDoubleBE = function (e, r, n) {
      return Xn(this, e, r, !1, n);
    }),
    (E.prototype.copy = function (e, r, n, a) {
      if (
        (n || (n = 0),
        !a && a !== 0 && (a = this.length),
        r >= e.length && (r = e.length),
        r || (r = 0),
        a > 0 && a < n && (a = n),
        a === n || e.length === 0 || this.length === 0)
      )
        return 0;
      if (r < 0) throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (a < 0) throw new RangeError("sourceEnd out of bounds");
      a > this.length && (a = this.length),
        e.length - r < a - n && (a = e.length - r + n);
      var s = a - n,
        f;
      if (this === e && n < r && r < a)
        for (f = s - 1; f >= 0; --f) e[f + r] = this[f + n];
      else if (s < 1e3 || !E.TYPED_ARRAY_SUPPORT)
        for (f = 0; f < s; ++f) e[f + r] = this[f + n];
      else Uint8Array.prototype.set.call(e, this.subarray(n, n + s), r);
      return s;
    }),
    (E.prototype.fill = function (e, r, n, a) {
      if (typeof e == "string") {
        if (
          (typeof r == "string"
            ? ((a = r), (r = 0), (n = this.length))
            : typeof n == "string" && ((a = n), (n = this.length)),
          e.length === 1)
        ) {
          var s = e.charCodeAt(0);
          s < 256 && (e = s);
        }
        if (a !== void 0 && typeof a != "string")
          throw new TypeError("encoding must be a string");
        if (typeof a == "string" && !E.isEncoding(a))
          throw new TypeError("Unknown encoding: " + a);
      } else typeof e == "number" && (e = e & 255);
      if (r < 0 || this.length < r || this.length < n)
        throw new RangeError("Out of range index");
      if (n <= r) return this;
      (r = r >>> 0), (n = n === void 0 ? this.length : n >>> 0), e || (e = 0);
      var f;
      if (typeof e == "number") for (f = r; f < n; ++f) this[f] = e;
      else {
        var p = de(e) ? e : qt(new E(e, a).toString()),
          h = p.length;
        for (f = 0; f < n - r; ++f) this[f + r] = p[f % h];
      }
      return this;
    });
  var Ka = /[^+\/0-9A-Za-z-_]/g;
  function Qa(t) {
    if (((t = Za(t).replace(Ka, "")), t.length < 2)) return "";
    for (; t.length % 4 !== 0; ) t = t + "=";
    return t;
  }
  function Za(t) {
    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
  }
  function es(t) {
    return t < 16 ? "0" + t.toString(16) : t.toString(16);
  }
  function qt(t, e) {
    e = e || 1 / 0;
    for (var r, n = t.length, a = null, s = [], f = 0; f < n; ++f) {
      if (((r = t.charCodeAt(f)), r > 55295 && r < 57344)) {
        if (!a) {
          if (r > 56319) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          } else if (f + 1 === n) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          }
          a = r;
          continue;
        }
        if (r < 56320) {
          (e -= 3) > -1 && s.push(239, 191, 189), (a = r);
          continue;
        }
        r = (((a - 55296) << 10) | (r - 56320)) + 65536;
      } else a && (e -= 3) > -1 && s.push(239, 191, 189);
      if (((a = null), r < 128)) {
        if ((e -= 1) < 0) break;
        s.push(r);
      } else if (r < 2048) {
        if ((e -= 2) < 0) break;
        s.push((r >> 6) | 192, (r & 63) | 128);
      } else if (r < 65536) {
        if ((e -= 3) < 0) break;
        s.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (r & 63) | 128);
      } else if (r < 1114112) {
        if ((e -= 4) < 0) break;
        s.push(
          (r >> 18) | 240,
          ((r >> 12) & 63) | 128,
          ((r >> 6) & 63) | 128,
          (r & 63) | 128
        );
      } else throw new Error("Invalid code point");
    }
    return s;
  }
  function ts(t) {
    for (var e = [], r = 0; r < t.length; ++r) e.push(t.charCodeAt(r) & 255);
    return e;
  }
  function rs(t, e) {
    for (var r, n, a, s = [], f = 0; f < t.length && !((e -= 2) < 0); ++f)
      (r = t.charCodeAt(f)), (n = r >> 8), (a = r % 256), s.push(a), s.push(n);
    return s;
  }
  function Jn(t) {
    return Ta(Qa(t));
  }
  function Vt(t, e, r, n) {
    for (var a = 0; a < n && !(a + r >= e.length || a >= t.length); ++a)
      e[a + r] = t[a];
    return a;
  }
  function ns(t) {
    return t !== t;
  }
  function is(t) {
    return t != null && (!!t._isBuffer || Kn(t) || os(t));
  }
  function Kn(t) {
    return (
      !!t.constructor &&
      typeof t.constructor.isBuffer == "function" &&
      t.constructor.isBuffer(t)
    );
  }
  function os(t) {
    return (
      typeof t.readFloatLE == "function" &&
      typeof t.slice == "function" &&
      Kn(t.slice(0, 0))
    );
  }
  function Qn() {
    throw new Error("setTimeout has not been defined");
  }
  function Zn() {
    throw new Error("clearTimeout has not been defined");
  }
  var Be = Qn,
    Oe = Zn;
  typeof Ke.setTimeout == "function" && (Be = setTimeout),
    typeof Ke.clearTimeout == "function" && (Oe = clearTimeout);
  function ei(t) {
    if (Be === setTimeout) return setTimeout(t, 0);
    if ((Be === Qn || !Be) && setTimeout)
      return (Be = setTimeout), setTimeout(t, 0);
    try {
      return Be(t, 0);
    } catch {
      try {
        return Be.call(null, t, 0);
      } catch {
        return Be.call(this, t, 0);
      }
    }
  }
  function as(t) {
    if (Oe === clearTimeout) return clearTimeout(t);
    if ((Oe === Zn || !Oe) && clearTimeout)
      return (Oe = clearTimeout), clearTimeout(t);
    try {
      return Oe(t);
    } catch {
      try {
        return Oe.call(null, t);
      } catch {
        return Oe.call(this, t);
      }
    }
  }
  var Ee = [],
    Qe = !1,
    Le,
    zt = -1;
  function ss() {
    !Qe ||
      !Le ||
      ((Qe = !1),
      Le.length ? (Ee = Le.concat(Ee)) : (zt = -1),
      Ee.length && ti());
  }
  function ti() {
    if (!Qe) {
      var t = ei(ss);
      Qe = !0;
      for (var e = Ee.length; e; ) {
        for (Le = Ee, Ee = []; ++zt < e; ) Le && Le[zt].run();
        (zt = -1), (e = Ee.length);
      }
      (Le = null), (Qe = !1), as(t);
    }
  }
  function us(t) {
    var e = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
    Ee.push(new ri(t, e)), Ee.length === 1 && !Qe && ei(ti);
  }
  function ri(t, e) {
    (this.fun = t), (this.array = e);
  }
  ri.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  var cs = "browser",
    fs = "browser",
    ls = !0,
    ps = {},
    hs = [],
    ds = "",
    ys = {},
    gs = {},
    ms = {};
  function ke() {}
  var ws = ke,
    vs = ke,
    _s = ke,
    bs = ke,
    Es = ke,
    As = ke,
    xs = ke;
  function Ss(t) {
    throw new Error("process.binding is not supported");
  }
  function Is() {
    return "/";
  }
  function Bs(t) {
    throw new Error("process.chdir is not supported");
  }
  function Os() {
    return 0;
  }
  var Ze = Ke.performance || {},
    $s =
      Ze.now ||
      Ze.mozNow ||
      Ze.msNow ||
      Ze.oNow ||
      Ze.webkitNow ||
      function () {
        return new Date().getTime();
      };
  function Ts(t) {
    var e = $s.call(Ze) * 0.001,
      r = Math.floor(e),
      n = Math.floor((e % 1) * 1e9);
    return (
      t && ((r = r - t[0]), (n = n - t[1]), n < 0 && (r--, (n += 1e9))), [r, n]
    );
  }
  var Rs = new Date();
  function Ps() {
    var t = new Date(),
      e = t - Rs;
    return e / 1e3;
  }
  var Gt = {
      nextTick: us,
      title: cs,
      browser: ls,
      env: ps,
      argv: hs,
      version: ds,
      versions: ys,
      on: ws,
      addListener: vs,
      once: _s,
      off: bs,
      removeListener: Es,
      removeAllListeners: As,
      emit: xs,
      binding: Ss,
      cwd: Is,
      chdir: Bs,
      umask: Os,
      hrtime: Ts,
      platform: fs,
      release: gs,
      config: ms,
      uptime: Ps,
    },
    $r;
  typeof Object.create == "function"
    ? ($r = function (e, r) {
        (e.super_ = r),
          (e.prototype = Object.create(r.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          }));
      })
    : ($r = function (e, r) {
        e.super_ = r;
        var n = function () {};
        (n.prototype = r.prototype),
          (e.prototype = new n()),
          (e.prototype.constructor = e);
      });
  var ni = $r,
    Fs = /%[sdj%]/g;
  function Wt(t) {
    if (!gt(t)) {
      for (var e = [], r = 0; r < arguments.length; r++)
        e.push(ye(arguments[r]));
      return e.join(" ");
    }
    for (
      var r = 1,
        n = arguments,
        a = n.length,
        s = String(t).replace(Fs, function (p) {
          if (p === "%%") return "%";
          if (r >= a) return p;
          switch (p) {
            case "%s":
              return String(n[r++]);
            case "%d":
              return Number(n[r++]);
            case "%j":
              try {
                return JSON.stringify(n[r++]);
              } catch {
                return "[Circular]";
              }
            default:
              return p;
          }
        }),
        f = n[r];
      r < a;
      f = n[++r]
    )
      yt(f) || !je(f) ? (s += " " + f) : (s += " " + ye(f));
    return s;
  }
  function Tr(t, e) {
    if (ge(Ke.process))
      return function () {
        return Tr(t, e).apply(this, arguments);
      };
    if (Gt.noDeprecation === !0) return t;
    var r = !1;
    function n() {
      if (!r) {
        if (Gt.throwDeprecation) throw new Error(e);
        Gt.traceDeprecation ? console.trace(e) : console.error(e), (r = !0);
      }
      return t.apply(this, arguments);
    }
    return n;
  }
  var Ht = {},
    Rr;
  function ii(t) {
    if (
      (ge(Rr) && (Rr = Gt.env.NODE_DEBUG || ""), (t = t.toUpperCase()), !Ht[t])
    )
      if (new RegExp("\\b" + t + "\\b", "i").test(Rr)) {
        var e = 0;
        Ht[t] = function () {
          var r = Wt.apply(null, arguments);
          console.error("%s %d: %s", t, e, r);
        };
      } else Ht[t] = function () {};
    return Ht[t];
  }
  function ye(t, e) {
    var r = { seen: [], stylize: Cs };
    return (
      arguments.length >= 3 && (r.depth = arguments[2]),
      arguments.length >= 4 && (r.colors = arguments[3]),
      Xt(e) ? (r.showHidden = e) : e && Mr(r, e),
      ge(r.showHidden) && (r.showHidden = !1),
      ge(r.depth) && (r.depth = 2),
      ge(r.colors) && (r.colors = !1),
      ge(r.customInspect) && (r.customInspect = !0),
      r.colors && (r.stylize = Us),
      Yt(r, t, r.depth)
    );
  }
  (ye.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39],
  }),
    (ye.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      regexp: "red",
    });
  function Us(t, e) {
    var r = ye.styles[e];
    return r
      ? "\x1B[" + ye.colors[r][0] + "m" + t + "\x1B[" + ye.colors[r][1] + "m"
      : t;
  }
  function Cs(t, e) {
    return t;
  }
  function Ds(t) {
    var e = {};
    return (
      t.forEach(function (r, n) {
        e[r] = !0;
      }),
      e
    );
  }
  function Yt(t, e, r) {
    if (
      t.customInspect &&
      e &&
      vt(e.inspect) &&
      e.inspect !== ye &&
      !(e.constructor && e.constructor.prototype === e)
    ) {
      var n = e.inspect(r, t);
      return gt(n) || (n = Yt(t, n, r)), n;
    }
    var a = Ns(t, e);
    if (a) return a;
    var s = Object.keys(e),
      f = Ds(s);
    if (
      (t.showHidden && (s = Object.getOwnPropertyNames(e)),
      wt(e) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0))
    )
      return Pr(e);
    if (s.length === 0) {
      if (vt(e)) {
        var p = e.name ? ": " + e.name : "";
        return t.stylize("[Function" + p + "]", "special");
      }
      if (mt(e)) return t.stylize(RegExp.prototype.toString.call(e), "regexp");
      if (Jt(e)) return t.stylize(Date.prototype.toString.call(e), "date");
      if (wt(e)) return Pr(e);
    }
    var h = "",
      m = !1,
      v = ["{", "}"];
    if ((Ur(e) && ((m = !0), (v = ["[", "]"])), vt(e))) {
      var _ = e.name ? ": " + e.name : "";
      h = " [Function" + _ + "]";
    }
    if (
      (mt(e) && (h = " " + RegExp.prototype.toString.call(e)),
      Jt(e) && (h = " " + Date.prototype.toUTCString.call(e)),
      wt(e) && (h = " " + Pr(e)),
      s.length === 0 && (!m || e.length == 0))
    )
      return v[0] + h + v[1];
    if (r < 0)
      return mt(e)
        ? t.stylize(RegExp.prototype.toString.call(e), "regexp")
        : t.stylize("[Object]", "special");
    t.seen.push(e);
    var b;
    return (
      m
        ? (b = Ms(t, e, r, f, s))
        : (b = s.map(function (y) {
            return Fr(t, e, r, f, y, m);
          })),
      t.seen.pop(),
      Ls(b, h, v)
    );
  }
  function Ns(t, e) {
    if (ge(e)) return t.stylize("undefined", "undefined");
    if (gt(e)) {
      var r =
        "'" +
        JSON.stringify(e)
          .replace(/^"|"$/g, "")
          .replace(/'/g, "\\'")
          .replace(/\\"/g, '"') +
        "'";
      return t.stylize(r, "string");
    }
    if (Cr(e)) return t.stylize("" + e, "number");
    if (Xt(e)) return t.stylize("" + e, "boolean");
    if (yt(e)) return t.stylize("null", "null");
  }
  function Pr(t) {
    return "[" + Error.prototype.toString.call(t) + "]";
  }
  function Ms(t, e, r, n, a) {
    for (var s = [], f = 0, p = e.length; f < p; ++f)
      fi(e, String(f)) ? s.push(Fr(t, e, r, n, String(f), !0)) : s.push("");
    return (
      a.forEach(function (h) {
        h.match(/^\d+$/) || s.push(Fr(t, e, r, n, h, !0));
      }),
      s
    );
  }
  function Fr(t, e, r, n, a, s) {
    var f, p, h;
    if (
      ((h = Object.getOwnPropertyDescriptor(e, a) || { value: e[a] }),
      h.get
        ? h.set
          ? (p = t.stylize("[Getter/Setter]", "special"))
          : (p = t.stylize("[Getter]", "special"))
        : h.set && (p = t.stylize("[Setter]", "special")),
      fi(n, a) || (f = "[" + a + "]"),
      p ||
        (t.seen.indexOf(h.value) < 0
          ? (yt(r) ? (p = Yt(t, h.value, null)) : (p = Yt(t, h.value, r - 1)),
            p.indexOf(`
`) > -1 &&
              (s
                ? (p = p
                    .split(
                      `
`
                    )
                    .map(function (m) {
                      return "  " + m;
                    })
                    .join(
                      `
`
                    )
                    .substr(2))
                : (p =
                    `
` +
                    p
                      .split(
                        `
`
                      )
                      .map(function (m) {
                        return "   " + m;
                      }).join(`
`))))
          : (p = t.stylize("[Circular]", "special"))),
      ge(f))
    ) {
      if (s && a.match(/^\d+$/)) return p;
      (f = JSON.stringify("" + a)),
        f.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
          ? ((f = f.substr(1, f.length - 2)), (f = t.stylize(f, "name")))
          : ((f = f
              .replace(/'/g, "\\'")
              .replace(/\\"/g, '"')
              .replace(/(^"|"$)/g, "'")),
            (f = t.stylize(f, "string")));
    }
    return f + ": " + p;
  }
  function Ls(t, e, r) {
    var n = t.reduce(function (a, s) {
      return (
        s.indexOf(`
`) >= 0,
        a + s.replace(/\u001b\[\d\d?m/g, "").length + 1
      );
    }, 0);
    return n > 60
      ? r[0] +
          (e === ""
            ? ""
            : e +
              `
 `) +
          " " +
          t.join(`,
  `) +
          " " +
          r[1]
      : r[0] + e + " " + t.join(", ") + " " + r[1];
  }
  function Ur(t) {
    return Array.isArray(t);
  }
  function Xt(t) {
    return typeof t == "boolean";
  }
  function yt(t) {
    return t === null;
  }
  function oi(t) {
    return t == null;
  }
  function Cr(t) {
    return typeof t == "number";
  }
  function gt(t) {
    return typeof t == "string";
  }
  function ai(t) {
    return typeof t == "symbol";
  }
  function ge(t) {
    return t === void 0;
  }
  function mt(t) {
    return je(t) && Dr(t) === "[object RegExp]";
  }
  function je(t) {
    return typeof t == "object" && t !== null;
  }
  function Jt(t) {
    return je(t) && Dr(t) === "[object Date]";
  }
  function wt(t) {
    return je(t) && (Dr(t) === "[object Error]" || t instanceof Error);
  }
  function vt(t) {
    return typeof t == "function";
  }
  function si(t) {
    return (
      t === null ||
      typeof t == "boolean" ||
      typeof t == "number" ||
      typeof t == "string" ||
      typeof t == "symbol" ||
      typeof t > "u"
    );
  }
  function ui(t) {
    return E.isBuffer(t);
  }
  function Dr(t) {
    return Object.prototype.toString.call(t);
  }
  function Nr(t) {
    return t < 10 ? "0" + t.toString(10) : t.toString(10);
  }
  var ks = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function js() {
    var t = new Date(),
      e = [Nr(t.getHours()), Nr(t.getMinutes()), Nr(t.getSeconds())].join(":");
    return [t.getDate(), ks[t.getMonth()], e].join(" ");
  }
  function ci() {
    console.log("%s - %s", js(), Wt.apply(null, arguments));
  }
  function Mr(t, e) {
    if (!e || !je(e)) return t;
    for (var r = Object.keys(e), n = r.length; n--; ) t[r[n]] = e[r[n]];
    return t;
  }
  function fi(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }
  var qs = {
      inherits: ni,
      _extend: Mr,
      log: ci,
      isBuffer: ui,
      isPrimitive: si,
      isFunction: vt,
      isError: wt,
      isDate: Jt,
      isObject: je,
      isRegExp: mt,
      isUndefined: ge,
      isSymbol: ai,
      isString: gt,
      isNumber: Cr,
      isNullOrUndefined: oi,
      isNull: yt,
      isBoolean: Xt,
      isArray: Ur,
      inspect: ye,
      deprecate: Tr,
      format: Wt,
      debuglog: ii,
    },
    Vs = Object.freeze({
      __proto__: null,
      format: Wt,
      deprecate: Tr,
      debuglog: ii,
      inspect: ye,
      isArray: Ur,
      isBoolean: Xt,
      isNull: yt,
      isNullOrUndefined: oi,
      isNumber: Cr,
      isString: gt,
      isSymbol: ai,
      isUndefined: ge,
      isRegExp: mt,
      isObject: je,
      isDate: Jt,
      isError: wt,
      isFunction: vt,
      isPrimitive: si,
      isBuffer: ui,
      log: ci,
      inherits: ni,
      _extend: Mr,
      default: qs,
    }),
    zs = pt(Vs),
    Gs = zs.inspect,
    Lr = typeof Map == "function" && Map.prototype,
    kr =
      Object.getOwnPropertyDescriptor && Lr
        ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
        : null,
    Kt = Lr && kr && typeof kr.get == "function" ? kr.get : null,
    li = Lr && Map.prototype.forEach,
    jr = typeof Set == "function" && Set.prototype,
    qr =
      Object.getOwnPropertyDescriptor && jr
        ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
        : null,
    Qt = jr && qr && typeof qr.get == "function" ? qr.get : null,
    pi = jr && Set.prototype.forEach,
    Ws = typeof WeakMap == "function" && WeakMap.prototype,
    _t = Ws ? WeakMap.prototype.has : null,
    Hs = typeof WeakSet == "function" && WeakSet.prototype,
    bt = Hs ? WeakSet.prototype.has : null,
    Ys = typeof WeakRef == "function" && WeakRef.prototype,
    hi = Ys ? WeakRef.prototype.deref : null,
    Xs = Boolean.prototype.valueOf,
    Js = Object.prototype.toString,
    Ks = Function.prototype.toString,
    Qs = String.prototype.match,
    Vr = String.prototype.slice,
    $e = String.prototype.replace,
    Zs = String.prototype.toUpperCase,
    di = String.prototype.toLowerCase,
    yi = RegExp.prototype.test,
    gi = Array.prototype.concat,
    me = Array.prototype.join,
    eu = Array.prototype.slice,
    mi = Math.floor,
    zr = typeof BigInt == "function" ? BigInt.prototype.valueOf : null,
    Gr = Object.getOwnPropertySymbols,
    Wr =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? Symbol.prototype.toString
        : null,
    et = typeof Symbol == "function" && typeof Symbol.iterator == "object",
    Q =
      typeof Symbol == "function" &&
      Symbol.toStringTag &&
      (typeof Symbol.toStringTag === et || "symbol")
        ? Symbol.toStringTag
        : null,
    wi = Object.prototype.propertyIsEnumerable,
    vi =
      (typeof Reflect == "function"
        ? Reflect.getPrototypeOf
        : Object.getPrototypeOf) ||
      ([].__proto__ === Array.prototype
        ? function (t) {
            return t.__proto__;
          }
        : null);
  function _i(t, e) {
    if (
      t === 1 / 0 ||
      t === -1 / 0 ||
      t !== t ||
      (t && t > -1e3 && t < 1e3) ||
      yi.call(/e/, e)
    )
      return e;
    var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof t == "number") {
      var n = t < 0 ? -mi(-t) : mi(t);
      if (n !== t) {
        var a = String(n),
          s = Vr.call(e, a.length + 1);
        return (
          $e.call(a, r, "$&_") +
          "." +
          $e.call($e.call(s, /([0-9]{3})/g, "$&_"), /_$/, "")
        );
      }
    }
    return $e.call(e, r, "$&_");
  }
  var Hr = Gs,
    bi = Hr.custom,
    Ei = Si(bi) ? bi : null,
    tu = function t(e, r, n, a) {
      var s = r || {};
      if (
        Te(s, "quoteStyle") &&
        s.quoteStyle !== "single" &&
        s.quoteStyle !== "double"
      )
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      if (
        Te(s, "maxStringLength") &&
        (typeof s.maxStringLength == "number"
          ? s.maxStringLength < 0 && s.maxStringLength !== 1 / 0
          : s.maxStringLength !== null)
      )
        throw new TypeError(
          'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
        );
      var f = Te(s, "customInspect") ? s.customInspect : !0;
      if (typeof f != "boolean" && f !== "symbol")
        throw new TypeError(
          "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"
        );
      if (
        Te(s, "indent") &&
        s.indent !== null &&
        s.indent !== "	" &&
        !(parseInt(s.indent, 10) === s.indent && s.indent > 0)
      )
        throw new TypeError(
          'option "indent" must be "\\t", an integer > 0, or `null`'
        );
      if (Te(s, "numericSeparator") && typeof s.numericSeparator != "boolean")
        throw new TypeError(
          'option "numericSeparator", if provided, must be `true` or `false`'
        );
      var p = s.numericSeparator;
      if (typeof e > "u") return "undefined";
      if (e === null) return "null";
      if (typeof e == "boolean") return e ? "true" : "false";
      if (typeof e == "string") return Bi(e, s);
      if (typeof e == "number") {
        if (e === 0) return 1 / 0 / e > 0 ? "0" : "-0";
        var h = String(e);
        return p ? _i(e, h) : h;
      }
      if (typeof e == "bigint") {
        var m = String(e) + "n";
        return p ? _i(e, m) : m;
      }
      var v = typeof s.depth > "u" ? 5 : s.depth;
      if ((typeof n > "u" && (n = 0), n >= v && v > 0 && typeof e == "object"))
        return Yr(e) ? "[Array]" : "[Object]";
      var _ = vu(s, n);
      if (typeof a > "u") a = [];
      else if (Ii(a, e) >= 0) return "[Circular]";
      function b(L, Z, N) {
        if ((Z && ((a = eu.call(a)), a.push(Z)), N)) {
          var se = { depth: s.depth };
          return (
            Te(s, "quoteStyle") && (se.quoteStyle = s.quoteStyle),
            t(L, se, n + 1, a)
          );
        }
        return t(L, s, n + 1, a);
      }
      if (typeof e == "function" && !xi(e)) {
        var y = fu(e),
          x = Zt(e, b);
        return (
          "[Function" +
          (y ? ": " + y : " (anonymous)") +
          "]" +
          (x.length > 0 ? " { " + me.call(x, ", ") + " }" : "")
        );
      }
      if (Si(e)) {
        var I = et
          ? $e.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1")
          : Wr.call(e);
        return typeof e == "object" && !et ? Et(I) : I;
      }
      if (gu(e)) {
        for (
          var $ = "<" + di.call(String(e.nodeName)),
            S = e.attributes || [],
            B = 0;
          B < S.length;
          B++
        )
          $ += " " + S[B].name + "=" + Ai(ru(S[B].value), "double", s);
        return (
          ($ += ">"),
          e.childNodes && e.childNodes.length && ($ += "..."),
          ($ += "</" + di.call(String(e.nodeName)) + ">"),
          $
        );
      }
      if (Yr(e)) {
        if (e.length === 0) return "[]";
        var R = Zt(e, b);
        return _ && !wu(R)
          ? "[" + Jr(R, _) + "]"
          : "[ " + me.call(R, ", ") + " ]";
      }
      if (iu(e)) {
        var T = Zt(e, b);
        return !("cause" in Error.prototype) &&
          "cause" in e &&
          !wi.call(e, "cause")
          ? "{ [" +
              String(e) +
              "] " +
              me.call(gi.call("[cause]: " + b(e.cause), T), ", ") +
              " }"
          : T.length === 0
          ? "[" + String(e) + "]"
          : "{ [" + String(e) + "] " + me.call(T, ", ") + " }";
      }
      if (typeof e == "object" && f) {
        if (Ei && typeof e[Ei] == "function" && Hr)
          return Hr(e, { depth: v - n });
        if (f !== "symbol" && typeof e.inspect == "function")
          return e.inspect();
      }
      if (lu(e)) {
        var D = [];
        return (
          li &&
            li.call(e, function (L, Z) {
              D.push(b(Z, e, !0) + " => " + b(L, e));
            }),
          Oi("Map", Kt.call(e), D, _)
        );
      }
      if (du(e)) {
        var M = [];
        return (
          pi &&
            pi.call(e, function (L) {
              M.push(b(L, e));
            }),
          Oi("Set", Qt.call(e), M, _)
        );
      }
      if (pu(e)) return Xr("WeakMap");
      if (yu(e)) return Xr("WeakSet");
      if (hu(e)) return Xr("WeakRef");
      if (au(e)) return Et(b(Number(e)));
      if (uu(e)) return Et(b(zr.call(e)));
      if (su(e)) return Et(Xs.call(e));
      if (ou(e)) return Et(b(String(e)));
      if (!nu(e) && !xi(e)) {
        var q = Zt(e, b),
          V = vi
            ? vi(e) === Object.prototype
            : e instanceof Object || e.constructor === Object,
          Y = e instanceof Object ? "" : "null prototype",
          z =
            !V && Q && Object(e) === e && Q in e
              ? Vr.call(Re(e), 8, -1)
              : Y
              ? "Object"
              : "",
          ne =
            V || typeof e.constructor != "function"
              ? ""
              : e.constructor.name
              ? e.constructor.name + " "
              : "",
          ae =
            ne +
            (z || Y
              ? "[" + me.call(gi.call([], z || [], Y || []), ": ") + "] "
              : "");
        return q.length === 0
          ? ae + "{}"
          : _
          ? ae + "{" + Jr(q, _) + "}"
          : ae + "{ " + me.call(q, ", ") + " }";
      }
      return String(e);
    };
  function Ai(t, e, r) {
    var n = (r.quoteStyle || e) === "double" ? '"' : "'";
    return n + t + n;
  }
  function ru(t) {
    return $e.call(String(t), /"/g, "&quot;");
  }
  function Yr(t) {
    return (
      Re(t) === "[object Array]" && (!Q || !(typeof t == "object" && Q in t))
    );
  }
  function nu(t) {
    return (
      Re(t) === "[object Date]" && (!Q || !(typeof t == "object" && Q in t))
    );
  }
  function xi(t) {
    return (
      Re(t) === "[object RegExp]" && (!Q || !(typeof t == "object" && Q in t))
    );
  }
  function iu(t) {
    return (
      Re(t) === "[object Error]" && (!Q || !(typeof t == "object" && Q in t))
    );
  }
  function ou(t) {
    return (
      Re(t) === "[object String]" && (!Q || !(typeof t == "object" && Q in t))
    );
  }
  function au(t) {
    return (
      Re(t) === "[object Number]" && (!Q || !(typeof t == "object" && Q in t))
    );
  }
  function su(t) {
    return (
      Re(t) === "[object Boolean]" && (!Q || !(typeof t == "object" && Q in t))
    );
  }
  function Si(t) {
    if (et) return t && typeof t == "object" && t instanceof Symbol;
    if (typeof t == "symbol") return !0;
    if (!t || typeof t != "object" || !Wr) return !1;
    try {
      return Wr.call(t), !0;
    } catch {}
    return !1;
  }
  function uu(t) {
    if (!t || typeof t != "object" || !zr) return !1;
    try {
      return zr.call(t), !0;
    } catch {}
    return !1;
  }
  var cu =
    Object.prototype.hasOwnProperty ||
    function (t) {
      return t in this;
    };
  function Te(t, e) {
    return cu.call(t, e);
  }
  function Re(t) {
    return Js.call(t);
  }
  function fu(t) {
    if (t.name) return t.name;
    var e = Qs.call(Ks.call(t), /^function\s*([\w$]+)/);
    return e ? e[1] : null;
  }
  function Ii(t, e) {
    if (t.indexOf) return t.indexOf(e);
    for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
    return -1;
  }
  function lu(t) {
    if (!Kt || !t || typeof t != "object") return !1;
    try {
      Kt.call(t);
      try {
        Qt.call(t);
      } catch {
        return !0;
      }
      return t instanceof Map;
    } catch {}
    return !1;
  }
  function pu(t) {
    if (!_t || !t || typeof t != "object") return !1;
    try {
      _t.call(t, _t);
      try {
        bt.call(t, bt);
      } catch {
        return !0;
      }
      return t instanceof WeakMap;
    } catch {}
    return !1;
  }
  function hu(t) {
    if (!hi || !t || typeof t != "object") return !1;
    try {
      return hi.call(t), !0;
    } catch {}
    return !1;
  }
  function du(t) {
    if (!Qt || !t || typeof t != "object") return !1;
    try {
      Qt.call(t);
      try {
        Kt.call(t);
      } catch {
        return !0;
      }
      return t instanceof Set;
    } catch {}
    return !1;
  }
  function yu(t) {
    if (!bt || !t || typeof t != "object") return !1;
    try {
      bt.call(t, bt);
      try {
        _t.call(t, _t);
      } catch {
        return !0;
      }
      return t instanceof WeakSet;
    } catch {}
    return !1;
  }
  function gu(t) {
    return !t || typeof t != "object"
      ? !1
      : typeof HTMLElement < "u" && t instanceof HTMLElement
      ? !0
      : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
  }
  function Bi(t, e) {
    if (t.length > e.maxStringLength) {
      var r = t.length - e.maxStringLength,
        n = "... " + r + " more character" + (r > 1 ? "s" : "");
      return Bi(Vr.call(t, 0, e.maxStringLength), e) + n;
    }
    var a = $e.call($e.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, mu);
    return Ai(a, "single", e);
  }
  function mu(t) {
    var e = t.charCodeAt(0),
      r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[e];
    return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + Zs.call(e.toString(16));
  }
  function Et(t) {
    return "Object(" + t + ")";
  }
  function Xr(t) {
    return t + " { ? }";
  }
  function Oi(t, e, r, n) {
    var a = n ? Jr(r, n) : me.call(r, ", ");
    return t + " (" + e + ") {" + a + "}";
  }
  function wu(t) {
    for (var e = 0; e < t.length; e++)
      if (
        Ii(
          t[e],
          `
`
        ) >= 0
      )
        return !1;
    return !0;
  }
  function vu(t, e) {
    var r;
    if (t.indent === "	") r = "	";
    else if (typeof t.indent == "number" && t.indent > 0)
      r = me.call(Array(t.indent + 1), " ");
    else return null;
    return { base: r, prev: me.call(Array(e + 1), r) };
  }
  function Jr(t, e) {
    if (t.length === 0) return "";
    var r =
      `
` +
      e.prev +
      e.base;
    return (
      r +
      me.call(t, "," + r) +
      `
` +
      e.prev
    );
  }
  function Zt(t, e) {
    var r = Yr(t),
      n = [];
    if (r) {
      n.length = t.length;
      for (var a = 0; a < t.length; a++) n[a] = Te(t, a) ? e(t[a], t) : "";
    }
    var s = typeof Gr == "function" ? Gr(t) : [],
      f;
    if (et) {
      f = {};
      for (var p = 0; p < s.length; p++) f["$" + s[p]] = s[p];
    }
    for (var h in t)
      Te(t, h) &&
        ((r && String(Number(h)) === h && h < t.length) ||
          (et && f["$" + h] instanceof Symbol) ||
          (yi.call(/[^\w$]/, h)
            ? n.push(e(h, t) + ": " + e(t[h], t))
            : n.push(h + ": " + e(t[h], t))));
    if (typeof Gr == "function")
      for (var m = 0; m < s.length; m++)
        wi.call(t, s[m]) && n.push("[" + e(s[m]) + "]: " + e(t[s[m]], t));
    return n;
  }
  var Kr = xr,
    tt = Oa,
    _u = tu,
    bu = Kr("%TypeError%"),
    er = Kr("%WeakMap%", !0),
    tr = Kr("%Map%", !0),
    Eu = tt("WeakMap.prototype.get", !0),
    Au = tt("WeakMap.prototype.set", !0),
    xu = tt("WeakMap.prototype.has", !0),
    Su = tt("Map.prototype.get", !0),
    Iu = tt("Map.prototype.set", !0),
    Bu = tt("Map.prototype.has", !0),
    Qr = function (t, e) {
      for (var r = t, n; (n = r.next) !== null; r = n)
        if (n.key === e)
          return (r.next = n.next), (n.next = t.next), (t.next = n), n;
    },
    Ou = function (t, e) {
      var r = Qr(t, e);
      return r && r.value;
    },
    $u = function (t, e, r) {
      var n = Qr(t, e);
      n ? (n.value = r) : (t.next = { key: e, next: t.next, value: r });
    },
    Tu = function (t, e) {
      return !!Qr(t, e);
    },
    Ru = function () {
      var e,
        r,
        n,
        a = {
          assert: function (s) {
            if (!a.has(s))
              throw new bu("Side channel does not contain " + _u(s));
          },
          get: function (s) {
            if (er && s && (typeof s == "object" || typeof s == "function")) {
              if (e) return Eu(e, s);
            } else if (tr) {
              if (r) return Su(r, s);
            } else if (n) return Ou(n, s);
          },
          has: function (s) {
            if (er && s && (typeof s == "object" || typeof s == "function")) {
              if (e) return xu(e, s);
            } else if (tr) {
              if (r) return Bu(r, s);
            } else if (n) return Tu(n, s);
            return !1;
          },
          set: function (s, f) {
            er && s && (typeof s == "object" || typeof s == "function")
              ? (e || (e = new er()), Au(e, s, f))
              : tr
              ? (r || (r = new tr()), Iu(r, s, f))
              : (n || (n = { key: {}, next: null }), $u(n, s, f));
          },
        };
      return a;
    },
    Pu = String.prototype.replace,
    Fu = /%20/g,
    Zr = { RFC1738: "RFC1738", RFC3986: "RFC3986" },
    $i = {
      default: Zr.RFC3986,
      formatters: {
        RFC1738: function (t) {
          return Pu.call(t, Fu, "+");
        },
        RFC3986: function (t) {
          return String(t);
        },
      },
      RFC1738: Zr.RFC1738,
      RFC3986: Zr.RFC3986,
    },
    Uu = $i,
    en = Object.prototype.hasOwnProperty,
    qe = Array.isArray,
    we = (function () {
      for (var t = [], e = 0; e < 256; ++e)
        t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
      return t;
    })(),
    Cu = function (e) {
      for (; e.length > 1; ) {
        var r = e.pop(),
          n = r.obj[r.prop];
        if (qe(n)) {
          for (var a = [], s = 0; s < n.length; ++s)
            typeof n[s] < "u" && a.push(n[s]);
          r.obj[r.prop] = a;
        }
      }
    },
    Ti = function (e, r) {
      for (
        var n = r && r.plainObjects ? Object.create(null) : {}, a = 0;
        a < e.length;
        ++a
      )
        typeof e[a] < "u" && (n[a] = e[a]);
      return n;
    },
    Du = function t(e, r, n) {
      if (!r) return e;
      if (typeof r != "object") {
        if (qe(e)) e.push(r);
        else if (e && typeof e == "object")
          ((n && (n.plainObjects || n.allowPrototypes)) ||
            !en.call(Object.prototype, r)) &&
            (e[r] = !0);
        else return [e, r];
        return e;
      }
      if (!e || typeof e != "object") return [e].concat(r);
      var a = e;
      return (
        qe(e) && !qe(r) && (a = Ti(e, n)),
        qe(e) && qe(r)
          ? (r.forEach(function (s, f) {
              if (en.call(e, f)) {
                var p = e[f];
                p && typeof p == "object" && s && typeof s == "object"
                  ? (e[f] = t(p, s, n))
                  : e.push(s);
              } else e[f] = s;
            }),
            e)
          : Object.keys(r).reduce(function (s, f) {
              var p = r[f];
              return en.call(s, f) ? (s[f] = t(s[f], p, n)) : (s[f] = p), s;
            }, a)
      );
    },
    Nu = function (e, r) {
      return Object.keys(r).reduce(function (n, a) {
        return (n[a] = r[a]), n;
      }, e);
    },
    Mu = function (t, e, r) {
      var n = t.replace(/\+/g, " ");
      if (r === "iso-8859-1") return n.replace(/%[0-9a-f]{2}/gi, unescape);
      try {
        return decodeURIComponent(n);
      } catch {
        return n;
      }
    },
    Lu = function (e, r, n, a, s) {
      if (e.length === 0) return e;
      var f = e;
      if (
        (typeof e == "symbol"
          ? (f = Symbol.prototype.toString.call(e))
          : typeof e != "string" && (f = String(e)),
        n === "iso-8859-1")
      )
        return escape(f).replace(/%u[0-9a-f]{4}/gi, function (v) {
          return "%26%23" + parseInt(v.slice(2), 16) + "%3B";
        });
      for (var p = "", h = 0; h < f.length; ++h) {
        var m = f.charCodeAt(h);
        if (
          m === 45 ||
          m === 46 ||
          m === 95 ||
          m === 126 ||
          (m >= 48 && m <= 57) ||
          (m >= 65 && m <= 90) ||
          (m >= 97 && m <= 122) ||
          (s === Uu.RFC1738 && (m === 40 || m === 41))
        ) {
          p += f.charAt(h);
          continue;
        }
        if (m < 128) {
          p = p + we[m];
          continue;
        }
        if (m < 2048) {
          p = p + (we[192 | (m >> 6)] + we[128 | (m & 63)]);
          continue;
        }
        if (m < 55296 || m >= 57344) {
          p =
            p +
            (we[224 | (m >> 12)] +
              we[128 | ((m >> 6) & 63)] +
              we[128 | (m & 63)]);
          continue;
        }
        (h += 1),
          (m = 65536 + (((m & 1023) << 10) | (f.charCodeAt(h) & 1023))),
          (p +=
            we[240 | (m >> 18)] +
            we[128 | ((m >> 12) & 63)] +
            we[128 | ((m >> 6) & 63)] +
            we[128 | (m & 63)]);
      }
      return p;
    },
    ku = function (e) {
      for (
        var r = [{ obj: { o: e }, prop: "o" }], n = [], a = 0;
        a < r.length;
        ++a
      )
        for (
          var s = r[a], f = s.obj[s.prop], p = Object.keys(f), h = 0;
          h < p.length;
          ++h
        ) {
          var m = p[h],
            v = f[m];
          typeof v == "object" &&
            v !== null &&
            n.indexOf(v) === -1 &&
            (r.push({ obj: f, prop: m }), n.push(v));
        }
      return Cu(r), e;
    },
    ju = function (e) {
      return Object.prototype.toString.call(e) === "[object RegExp]";
    },
    qu = function (e) {
      return !e || typeof e != "object"
        ? !1
        : !!(
            e.constructor &&
            e.constructor.isBuffer &&
            e.constructor.isBuffer(e)
          );
    },
    Vu = function (e, r) {
      return [].concat(e, r);
    },
    zu = function (e, r) {
      if (qe(e)) {
        for (var n = [], a = 0; a < e.length; a += 1) n.push(r(e[a]));
        return n;
      }
      return r(e);
    },
    Gu = {
      arrayToObject: Ti,
      assign: Nu,
      combine: Vu,
      compact: ku,
      decode: Mu,
      encode: Lu,
      isBuffer: qu,
      isRegExp: ju,
      maybeMap: zu,
      merge: Du,
    },
    Ri = Ru,
    tn = Gu,
    At = $i,
    Wu = Object.prototype.hasOwnProperty,
    Pi = {
      brackets: function (e) {
        return e + "[]";
      },
      comma: "comma",
      indices: function (e, r) {
        return e + "[" + r + "]";
      },
      repeat: function (e) {
        return e;
      },
    },
    Ae = Array.isArray,
    Hu = String.prototype.split,
    Yu = Array.prototype.push,
    Fi = function (t, e) {
      Yu.apply(t, Ae(e) ? e : [e]);
    },
    Xu = Date.prototype.toISOString,
    Ui = At.default,
    X = {
      addQueryPrefix: !1,
      allowDots: !1,
      charset: "utf-8",
      charsetSentinel: !1,
      delimiter: "&",
      encode: !0,
      encoder: tn.encode,
      encodeValuesOnly: !1,
      format: Ui,
      formatter: At.formatters[Ui],
      indices: !1,
      serializeDate: function (e) {
        return Xu.call(e);
      },
      skipNulls: !1,
      strictNullHandling: !1,
    },
    Ju = function (e) {
      return (
        typeof e == "string" ||
        typeof e == "number" ||
        typeof e == "boolean" ||
        typeof e == "symbol" ||
        typeof e == "bigint"
      );
    },
    rn = {},
    Ku = function t(e, r, n, a, s, f, p, h, m, v, _, b, y, x, I, $) {
      for (
        var S = e, B = $, R = 0, T = !1;
        (B = B.get(rn)) !== void 0 && !T;

      ) {
        var D = B.get(e);
        if (((R += 1), typeof D < "u")) {
          if (D === R) throw new RangeError("Cyclic object value");
          T = !0;
        }
        typeof B.get(rn) > "u" && (R = 0);
      }
      if (
        (typeof h == "function"
          ? (S = h(r, S))
          : S instanceof Date
          ? (S = _(S))
          : n === "comma" &&
            Ae(S) &&
            (S = tn.maybeMap(S, function (Pe) {
              return Pe instanceof Date ? _(Pe) : Pe;
            })),
        S === null)
      ) {
        if (s) return p && !x ? p(r, X.encoder, I, "key", b) : r;
        S = "";
      }
      if (Ju(S) || tn.isBuffer(S)) {
        if (p) {
          var M = x ? r : p(r, X.encoder, I, "key", b);
          if (n === "comma" && x) {
            for (
              var q = Hu.call(String(S), ","), V = "", Y = 0;
              Y < q.length;
              ++Y
            )
              V += (Y === 0 ? "" : ",") + y(p(q[Y], X.encoder, I, "value", b));
            return [
              y(M) + (a && Ae(S) && q.length === 1 ? "[]" : "") + "=" + V,
            ];
          }
          return [y(M) + "=" + y(p(S, X.encoder, I, "value", b))];
        }
        return [y(r) + "=" + y(String(S))];
      }
      var z = [];
      if (typeof S > "u") return z;
      var ne;
      if (n === "comma" && Ae(S))
        ne = [{ value: S.length > 0 ? S.join(",") || null : void 0 }];
      else if (Ae(h)) ne = h;
      else {
        var ae = Object.keys(S);
        ne = m ? ae.sort(m) : ae;
      }
      for (
        var L = a && Ae(S) && S.length === 1 ? r + "[]" : r, Z = 0;
        Z < ne.length;
        ++Z
      ) {
        var N = ne[Z],
          se = typeof N == "object" && typeof N.value < "u" ? N.value : S[N];
        if (!(f && se === null)) {
          var ut = Ae(S)
            ? typeof n == "function"
              ? n(L, N)
              : L
            : L + (v ? "." + N : "[" + N + "]");
          $.set(e, R);
          var ie = Ri();
          ie.set(rn, $),
            Fi(z, t(se, ut, n, a, s, f, p, h, m, v, _, b, y, x, I, ie));
        }
      }
      return z;
    },
    Qu = function (e) {
      if (!e) return X;
      if (
        e.encoder !== null &&
        typeof e.encoder < "u" &&
        typeof e.encoder != "function"
      )
        throw new TypeError("Encoder has to be a function.");
      var r = e.charset || X.charset;
      if (
        typeof e.charset < "u" &&
        e.charset !== "utf-8" &&
        e.charset !== "iso-8859-1"
      )
        throw new TypeError(
          "The charset option must be either utf-8, iso-8859-1, or undefined"
        );
      var n = At.default;
      if (typeof e.format < "u") {
        if (!Wu.call(At.formatters, e.format))
          throw new TypeError("Unknown format option provided.");
        n = e.format;
      }
      var a = At.formatters[n],
        s = X.filter;
      return (
        (typeof e.filter == "function" || Ae(e.filter)) && (s = e.filter),
        {
          addQueryPrefix:
            typeof e.addQueryPrefix == "boolean"
              ? e.addQueryPrefix
              : X.addQueryPrefix,
          allowDots: typeof e.allowDots > "u" ? X.allowDots : !!e.allowDots,
          charset: r,
          charsetSentinel:
            typeof e.charsetSentinel == "boolean"
              ? e.charsetSentinel
              : X.charsetSentinel,
          delimiter: typeof e.delimiter > "u" ? X.delimiter : e.delimiter,
          encode: typeof e.encode == "boolean" ? e.encode : X.encode,
          encoder: typeof e.encoder == "function" ? e.encoder : X.encoder,
          encodeValuesOnly:
            typeof e.encodeValuesOnly == "boolean"
              ? e.encodeValuesOnly
              : X.encodeValuesOnly,
          filter: s,
          format: n,
          formatter: a,
          serializeDate:
            typeof e.serializeDate == "function"
              ? e.serializeDate
              : X.serializeDate,
          skipNulls:
            typeof e.skipNulls == "boolean" ? e.skipNulls : X.skipNulls,
          sort: typeof e.sort == "function" ? e.sort : null,
          strictNullHandling:
            typeof e.strictNullHandling == "boolean"
              ? e.strictNullHandling
              : X.strictNullHandling,
        }
      );
    },
    Zu = function (t, e) {
      var r = t,
        n = Qu(e),
        a,
        s;
      typeof n.filter == "function"
        ? ((s = n.filter), (r = s("", r)))
        : Ae(n.filter) && ((s = n.filter), (a = s));
      var f = [];
      if (typeof r != "object" || r === null) return "";
      var p;
      e && e.arrayFormat in Pi
        ? (p = e.arrayFormat)
        : e && "indices" in e
        ? (p = e.indices ? "indices" : "repeat")
        : (p = "indices");
      var h = Pi[p];
      if (e && "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      var m = h === "comma" && e && e.commaRoundTrip;
      a || (a = Object.keys(r)), n.sort && a.sort(n.sort);
      for (var v = Ri(), _ = 0; _ < a.length; ++_) {
        var b = a[_];
        (n.skipNulls && r[b] === null) ||
          Fi(
            f,
            Ku(
              r[b],
              b,
              h,
              m,
              n.strictNullHandling,
              n.skipNulls,
              n.encode ? n.encoder : null,
              n.filter,
              n.sort,
              n.allowDots,
              n.serializeDate,
              n.format,
              n.formatter,
              n.encodeValuesOnly,
              n.charset,
              v
            )
          );
      }
      var y = f.join(n.delimiter),
        x = n.addQueryPrefix === !0 ? "?" : "";
      return (
        n.charsetSentinel &&
          (n.charset === "iso-8859-1"
            ? (x += "utf8=%26%2310003%3B&")
            : (x += "utf8=%E2%9C%93&")),
        y.length > 0 ? x + y : ""
      );
    };
  let Ci = { storeIdentifier: "", environment: "prod" };
  function ec(t) {
    Ci = t;
  }
  function ve() {
    return Ci;
  }
  const tc = (t) =>
      t === "stage"
        ? "https://api.stage.rechargeapps.com"
        : "https://api.rechargeapps.com",
    rr = (t) =>
      t === "stage"
        ? "https://admin.stage.rechargeapps.com"
        : "https://admin.rechargeapps.com",
    rc = (t) =>
      t === "stage"
        ? "https://static.stage.rechargecdn.com"
        : "https://static.rechargecdn.com",
    nc = "/tools/recurring";
  class nr {
    constructor(e, r) {
      (this.name = "RechargeRequestError"),
        (this.message = e),
        (this.status = r);
    }
  }
  var ic = Object.defineProperty,
    oc = Object.defineProperties,
    ac = Object.getOwnPropertyDescriptors,
    Di = Object.getOwnPropertySymbols,
    sc = Object.prototype.hasOwnProperty,
    uc = Object.prototype.propertyIsEnumerable,
    Ni = (t, e, r) =>
      e in t
        ? ic(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[e] = r),
    ir = (t, e) => {
      for (var r in e || (e = {})) sc.call(e, r) && Ni(t, r, e[r]);
      if (Di) for (var r of Di(e)) uc.call(e, r) && Ni(t, r, e[r]);
      return t;
    },
    cc = (t, e) => oc(t, ac(e));
  function fc(t) {
    return Zu(t, { encode: !1, indices: !1, arrayFormat: "comma" });
  }
  async function or(t, e, r = {}) {
    const n = ve();
    return ce(t, `${rc(n.environment)}/store/${n.storeIdentifier}${e}`, r);
  }
  async function O(t, e, { id: r, query: n, data: a, headers: s } = {}, f) {
    const { environment: p, storeIdentifier: h, loginRetryFn: m } = ve(),
      v = f.apiToken,
      _ = tc(p),
      b = ir(
        { "X-Recharge-Access-Token": v, "X-Recharge-Version": "2021-11" },
        s || {}
      ),
      y = ir({ shop_url: h }, n);
    try {
      return await ce(t, `${_}${e}`, { id: r, query: y, data: a, headers: b });
    } catch (x) {
      if (m && x instanceof nr && x.status === 401)
        return m().then((I) => {
          if (I)
            return ce(t, `${_}${e}`, {
              id: r,
              query: y,
              data: a,
              headers: cc(ir({}, b), { "X-Recharge-Access-Token": I.apiToken }),
            });
          throw x;
        });
      throw x;
    }
  }
  async function xt(t, e, r = {}) {
    return ce(t, `${nc}${e}`, r);
  }
  async function ce(t, e, { id: r, query: n, data: a, headers: s } = {}) {
    let f = e.trim();
    if ((r && (f = [f, `${r}`.trim()].join("/")), n)) {
      let _;
      [f, _] = f.split("?");
      const b = [_, fc(n)].join("&").replace(/^&/, "");
      f = `${f}${b ? `?${b}` : ""}`;
    }
    let p;
    a && t !== "get" && (p = JSON.stringify(a));
    const h = ir(
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Recharge-App": "storefront-client",
        },
        s || {}
      ),
      m = await fetch(f, { method: t, headers: h, body: p });
    let v;
    try {
      v = await m.json();
    } catch {}
    if (!m.ok)
      throw v && v.error
        ? new nr(v.error, m.status)
        : v && v.errors
        ? new nr(JSON.stringify(v.errors), m.status)
        : new nr("A connection error occurred while making the request");
    return v;
  }
  var lc = Object.defineProperty,
    Mi = Object.getOwnPropertySymbols,
    pc = Object.prototype.hasOwnProperty,
    hc = Object.prototype.propertyIsEnumerable,
    Li = (t, e, r) =>
      e in t
        ? lc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[e] = r),
    dc = (t, e) => {
      for (var r in e || (e = {})) pc.call(e, r) && Li(t, r, e[r]);
      if (Mi) for (var r of Mi(e)) hc.call(e, r) && Li(t, r, e[r]);
      return t;
    };
  function yc(t, e) {
    return O("get", "/addresses", { query: e }, t);
  }
  async function gc(t, e, r) {
    const { address: n } = await O(
      "get",
      "/addresses",
      { id: e, query: { include: r?.include } },
      t
    );
    return n;
  }
  async function mc(t, e) {
    const { address: r } = await O(
      "post",
      "/addresses",
      {
        data: dc(
          { customer_id: t.customerId ? Number(t.customerId) : void 0 },
          e
        ),
      },
      t
    );
    return r;
  }
  async function nn(t, e, r) {
    const { address: n } = await O("put", "/addresses", { id: e, data: r }, t);
    return n;
  }
  async function wc(t, e, r) {
    return nn(t, e, { discounts: [{ code: r }] });
  }
  async function vc(t, e) {
    return nn(t, e, { discounts: [] });
  }
  function _c(t, e) {
    return O("delete", "/addresses", { id: e }, t);
  }
  async function bc(t, e) {
    const { address: r } = await O("post", "/addresses/merge", { data: e }, t);
    return r;
  }
  async function Ec(t, e, r) {
    const { charge: n } = await O(
      "post",
      `/addresses/${e}/charges/skip`,
      { data: r },
      t
    );
    return n;
  }
  var Ac = Object.freeze({
      __proto__: null,
      listAddresses: yc,
      getAddress: gc,
      createAddress: mc,
      updateAddress: nn,
      applyDiscountToAddress: wc,
      removeDiscountsFromAddress: vc,
      deleteAddress: _c,
      mergeAddresses: bc,
      skipFutureCharge: Ec,
    }),
    xc = Object.defineProperty,
    ki = Object.getOwnPropertySymbols,
    Sc = Object.prototype.hasOwnProperty,
    Ic = Object.prototype.propertyIsEnumerable,
    ji = (t, e, r) =>
      e in t
        ? xc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[e] = r),
    qi = (t, e) => {
      for (var r in e || (e = {})) Sc.call(e, r) && ji(t, r, e[r]);
      if (ki) for (var r of ki(e)) Ic.call(e, r) && ji(t, r, e[r]);
      return t;
    };
  async function Bc() {
    const { storefrontAccessToken: t } = ve(),
      e = {};
    t && (e["X-Recharge-Storefront-Access-Token"] = t);
    const r = await xt("get", "/access", { headers: e });
    return { apiToken: r.api_token, customerId: r.customer_id };
  }
  async function Oc(t, e) {
    const {
        environment: r,
        storefrontAccessToken: n,
        storeIdentifier: a,
      } = ve(),
      s = rr(r),
      f = {};
    n && (f["X-Recharge-Storefront-Access-Token"] = n);
    const p = await ce("post", `${s}/shopify_storefront_access`, {
      data: { customer_token: e, storefront_token: t, shop_url: a },
      headers: f,
    });
    return p.api_token
      ? { apiToken: p.api_token, customerId: p.customer_id }
      : null;
  }
  async function $c(t, e = {}) {
    const {
        environment: r,
        storefrontAccessToken: n,
        storeIdentifier: a,
      } = ve(),
      s = rr(r),
      f = {};
    n && (f["X-Recharge-Storefront-Access-Token"] = n);
    const p = await ce("post", `${s}/attempt_login`, {
      data: qi({ email: t, shop: a }, e),
      headers: f,
    });
    if (p.errors) throw new Error(p.errors);
    return p.session_token;
  }
  async function Tc(t, e = {}) {
    const { storefrontAccessToken: r } = ve(),
      n = {};
    r && (n["X-Recharge-Storefront-Access-Token"] = r);
    const a = await xt("post", "/attempt_login", {
      data: qi({ email: t }, e),
      headers: n,
    });
    if (a.errors) throw new Error(a.errors);
    return a.session_token;
  }
  async function Rc(t, e, r) {
    const {
        environment: n,
        storefrontAccessToken: a,
        storeIdentifier: s,
      } = ve(),
      f = rr(n),
      p = {};
    a && (p["X-Recharge-Storefront-Access-Token"] = a);
    const h = await ce("post", `${f}/validate_login`, {
      data: { code: r, email: t, session_token: e, shop: s },
      headers: p,
    });
    if (h.errors) throw new Error(h.errors);
    return { apiToken: h.api_token, customerId: h.customer_id };
  }
  async function Pc(t, e, r) {
    const { storefrontAccessToken: n } = ve(),
      a = {};
    n && (a["X-Recharge-Storefront-Access-Token"] = n);
    const s = await xt("post", "/validate_login", {
      data: { code: r, email: t, session_token: e },
      headers: a,
    });
    if (s.errors) throw new Error(s.errors);
    return { apiToken: s.api_token, customerId: s.customer_id };
  }
  function Fc() {
    const { pathname: t, search: e } = window.location,
      r = new URLSearchParams(e).get("token"),
      n = t.split("/").filter(Boolean),
      a = n.findIndex((f) => f === "portal"),
      s = a !== -1 ? n[a + 1] : void 0;
    if (!r || !s)
      throw new Error(
        "Not in context of Recharge Customer Portal or URL did not contain correct params"
      );
    return { customerHash: s, token: r };
  }
  async function Uc() {
    const { customerHash: t, token: e } = Fc(),
      { environment: r, storefrontAccessToken: n, storeIdentifier: a } = ve(),
      s = rr(r),
      f = {};
    n && (f["X-Recharge-Storefront-Access-Token"] = n);
    const p = await ce("post", `${s}/customers/${t}/access`, {
      headers: f,
      data: { token: e, shop: a },
    });
    return { apiToken: p.api_token, customerId: p.customer_id };
  }
  var Cc = Object.freeze({
    __proto__: null,
    loginShopifyAppProxy: Bc,
    loginShopifyApi: Oc,
    sendPasswordlessCode: $c,
    sendPasswordlessCodeAppProxy: Tc,
    validatePasswordlessCode: Rc,
    validatePasswordlessCodeAppProxy: Pc,
    loginCustomerPortal: Uc,
  });
  let Dc = (t = 21) =>
    crypto
      .getRandomValues(new Uint8Array(t))
      .reduce(
        (e, r) => (
          (r &= 63),
          r < 36
            ? (e += r.toString(36))
            : r < 62
            ? (e += (r - 26).toString(36).toUpperCase())
            : r > 62
            ? (e += "-")
            : (e += "_"),
          e
        ),
        ""
      );
  var Nc = 200,
    on = "__lodash_hash_undefined__",
    Mc = 1 / 0,
    Vi = 9007199254740991,
    Lc = "[object Arguments]",
    kc = "[object Function]",
    jc = "[object GeneratorFunction]",
    qc = "[object Symbol]",
    Vc = /[\\^$.*+?()[\]{}|]/g,
    zc = /^\[object .+?Constructor\]$/,
    Gc = /^(?:0|[1-9]\d*)$/,
    Wc = typeof oe == "object" && oe && oe.Object === Object && oe,
    Hc = typeof self == "object" && self && self.Object === Object && self,
    an = Wc || Hc || Function("return this")();
  function Yc(t, e, r) {
    switch (r.length) {
      case 0:
        return t.call(e);
      case 1:
        return t.call(e, r[0]);
      case 2:
        return t.call(e, r[0], r[1]);
      case 3:
        return t.call(e, r[0], r[1], r[2]);
    }
    return t.apply(e, r);
  }
  function Xc(t, e) {
    var r = t ? t.length : 0;
    return !!r && Qc(t, e, 0) > -1;
  }
  function Jc(t, e, r) {
    for (var n = -1, a = t ? t.length : 0; ++n < a; ) if (r(e, t[n])) return !0;
    return !1;
  }
  function zi(t, e) {
    for (var r = -1, n = t ? t.length : 0, a = Array(n); ++r < n; )
      a[r] = e(t[r], r, t);
    return a;
  }
  function sn(t, e) {
    for (var r = -1, n = e.length, a = t.length; ++r < n; ) t[a + r] = e[r];
    return t;
  }
  function Kc(t, e, r, n) {
    for (var a = t.length, s = r + (n ? 1 : -1); n ? s-- : ++s < a; )
      if (e(t[s], s, t)) return s;
    return -1;
  }
  function Qc(t, e, r) {
    if (e !== e) return Kc(t, Zc, r);
    for (var n = r - 1, a = t.length; ++n < a; ) if (t[n] === e) return n;
    return -1;
  }
  function Zc(t) {
    return t !== t;
  }
  function ef(t, e) {
    for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r);
    return n;
  }
  function tf(t) {
    return function (e) {
      return t(e);
    };
  }
  function rf(t, e) {
    return t.has(e);
  }
  function nf(t, e) {
    return t?.[e];
  }
  function of(t) {
    var e = !1;
    if (t != null && typeof t.toString != "function")
      try {
        e = !!(t + "");
      } catch {}
    return e;
  }
  function Gi(t, e) {
    return function (r) {
      return t(e(r));
    };
  }
  var af = Array.prototype,
    sf = Function.prototype,
    ar = Object.prototype,
    un = an["__core-js_shared__"],
    Wi = (function () {
      var t = /[^.]+$/.exec((un && un.keys && un.keys.IE_PROTO) || "");
      return t ? "Symbol(src)_1." + t : "";
    })(),
    Hi = sf.toString,
    rt = ar.hasOwnProperty,
    cn = ar.toString,
    uf = RegExp(
      "^" +
        Hi.call(rt)
          .replace(Vc, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    ),
    Yi = an.Symbol,
    cf = Gi(Object.getPrototypeOf, Object),
    ff = ar.propertyIsEnumerable,
    lf = af.splice,
    Xi = Yi ? Yi.isConcatSpreadable : void 0,
    fn = Object.getOwnPropertySymbols,
    Ji = Math.max,
    pf = Qi(an, "Map"),
    St = Qi(Object, "create");
  function Ve(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  function hf() {
    this.__data__ = St ? St(null) : {};
  }
  function df(t) {
    return this.has(t) && delete this.__data__[t];
  }
  function yf(t) {
    var e = this.__data__;
    if (St) {
      var r = e[t];
      return r === on ? void 0 : r;
    }
    return rt.call(e, t) ? e[t] : void 0;
  }
  function gf(t) {
    var e = this.__data__;
    return St ? e[t] !== void 0 : rt.call(e, t);
  }
  function mf(t, e) {
    var r = this.__data__;
    return (r[t] = St && e === void 0 ? on : e), this;
  }
  (Ve.prototype.clear = hf),
    (Ve.prototype.delete = df),
    (Ve.prototype.get = yf),
    (Ve.prototype.has = gf),
    (Ve.prototype.set = mf);
  function nt(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  function wf() {
    this.__data__ = [];
  }
  function vf(t) {
    var e = this.__data__,
      r = ur(e, t);
    if (r < 0) return !1;
    var n = e.length - 1;
    return r == n ? e.pop() : lf.call(e, r, 1), !0;
  }
  function _f(t) {
    var e = this.__data__,
      r = ur(e, t);
    return r < 0 ? void 0 : e[r][1];
  }
  function bf(t) {
    return ur(this.__data__, t) > -1;
  }
  function Ef(t, e) {
    var r = this.__data__,
      n = ur(r, t);
    return n < 0 ? r.push([t, e]) : (r[n][1] = e), this;
  }
  (nt.prototype.clear = wf),
    (nt.prototype.delete = vf),
    (nt.prototype.get = _f),
    (nt.prototype.has = bf),
    (nt.prototype.set = Ef);
  function it(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  function Af() {
    this.__data__ = { hash: new Ve(), map: new (pf || nt)(), string: new Ve() };
  }
  function xf(t) {
    return cr(this, t).delete(t);
  }
  function Sf(t) {
    return cr(this, t).get(t);
  }
  function If(t) {
    return cr(this, t).has(t);
  }
  function Bf(t, e) {
    return cr(this, t).set(t, e), this;
  }
  (it.prototype.clear = Af),
    (it.prototype.delete = xf),
    (it.prototype.get = Sf),
    (it.prototype.has = If),
    (it.prototype.set = Bf);
  function sr(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.__data__ = new it(); ++e < r; ) this.add(t[e]);
  }
  function Of(t) {
    return this.__data__.set(t, on), this;
  }
  function $f(t) {
    return this.__data__.has(t);
  }
  (sr.prototype.add = sr.prototype.push = Of), (sr.prototype.has = $f);
  function Tf(t, e) {
    var r = ln(t) || Zi(t) ? ef(t.length, String) : [],
      n = r.length,
      a = !!n;
    for (var s in t)
      (e || rt.call(t, s)) && !(a && (s == "length" || qf(s, n))) && r.push(s);
    return r;
  }
  function ur(t, e) {
    for (var r = t.length; r--; ) if (Xf(t[r][0], e)) return r;
    return -1;
  }
  function Rf(t, e, r, n) {
    var a = -1,
      s = Xc,
      f = !0,
      p = t.length,
      h = [],
      m = e.length;
    if (!p) return h;
    r && (e = zi(e, tf(r))),
      n
        ? ((s = Jc), (f = !1))
        : e.length >= Nc && ((s = rf), (f = !1), (e = new sr(e)));
    e: for (; ++a < p; ) {
      var v = t[a],
        _ = r ? r(v) : v;
      if (((v = n || v !== 0 ? v : 0), f && _ === _)) {
        for (var b = m; b--; ) if (e[b] === _) continue e;
        h.push(v);
      } else s(e, _, n) || h.push(v);
    }
    return h;
  }
  function Ki(t, e, r, n, a) {
    var s = -1,
      f = t.length;
    for (r || (r = jf), a || (a = []); ++s < f; ) {
      var p = t[s];
      e > 0 && r(p)
        ? e > 1
          ? Ki(p, e - 1, r, n, a)
          : sn(a, p)
        : n || (a[a.length] = p);
    }
    return a;
  }
  function Pf(t, e, r) {
    var n = e(t);
    return ln(t) ? n : sn(n, r(t));
  }
  function Ff(t) {
    if (!pn(t) || zf(t)) return !1;
    var e = to(t) || of(t) ? uf : zc;
    return e.test(Yf(t));
  }
  function Uf(t) {
    if (!pn(t)) return Wf(t);
    var e = Gf(t),
      r = [];
    for (var n in t) (n == "constructor" && (e || !rt.call(t, n))) || r.push(n);
    return r;
  }
  function Cf(t, e) {
    return (
      (t = Object(t)),
      Df(t, e, function (r, n) {
        return n in t;
      })
    );
  }
  function Df(t, e, r) {
    for (var n = -1, a = e.length, s = {}; ++n < a; ) {
      var f = e[n],
        p = t[f];
      r(p, f) && (s[f] = p);
    }
    return s;
  }
  function Nf(t, e) {
    return (
      (e = Ji(e === void 0 ? t.length - 1 : e, 0)),
      function () {
        for (
          var r = arguments, n = -1, a = Ji(r.length - e, 0), s = Array(a);
          ++n < a;

        )
          s[n] = r[e + n];
        n = -1;
        for (var f = Array(e + 1); ++n < e; ) f[n] = r[n];
        return (f[e] = s), Yc(t, this, f);
      }
    );
  }
  function Mf(t) {
    return Pf(t, Zf, kf);
  }
  function cr(t, e) {
    var r = t.__data__;
    return Vf(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
  }
  function Qi(t, e) {
    var r = nf(t, e);
    return Ff(r) ? r : void 0;
  }
  var Lf = fn ? Gi(fn, Object) : no,
    kf = fn
      ? function (t) {
          for (var e = []; t; ) sn(e, Lf(t)), (t = cf(t));
          return e;
        }
      : no;
  function jf(t) {
    return ln(t) || Zi(t) || !!(Xi && t && t[Xi]);
  }
  function qf(t, e) {
    return (
      (e = e ?? Vi),
      !!e &&
        (typeof t == "number" || Gc.test(t)) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
    );
  }
  function Vf(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean"
      ? t !== "__proto__"
      : t === null;
  }
  function zf(t) {
    return !!Wi && Wi in t;
  }
  function Gf(t) {
    var e = t && t.constructor,
      r = (typeof e == "function" && e.prototype) || ar;
    return t === r;
  }
  function Wf(t) {
    var e = [];
    if (t != null) for (var r in Object(t)) e.push(r);
    return e;
  }
  function Hf(t) {
    if (typeof t == "string" || Qf(t)) return t;
    var e = t + "";
    return e == "0" && 1 / t == -Mc ? "-0" : e;
  }
  function Yf(t) {
    if (t != null) {
      try {
        return Hi.call(t);
      } catch {}
      try {
        return t + "";
      } catch {}
    }
    return "";
  }
  function Xf(t, e) {
    return t === e || (t !== t && e !== e);
  }
  function Zi(t) {
    return (
      Jf(t) &&
      rt.call(t, "callee") &&
      (!ff.call(t, "callee") || cn.call(t) == Lc)
    );
  }
  var ln = Array.isArray;
  function eo(t) {
    return t != null && Kf(t.length) && !to(t);
  }
  function Jf(t) {
    return ro(t) && eo(t);
  }
  function to(t) {
    var e = pn(t) ? cn.call(t) : "";
    return e == kc || e == jc;
  }
  function Kf(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Vi;
  }
  function pn(t) {
    var e = typeof t;
    return !!t && (e == "object" || e == "function");
  }
  function ro(t) {
    return !!t && typeof t == "object";
  }
  function Qf(t) {
    return typeof t == "symbol" || (ro(t) && cn.call(t) == qc);
  }
  function Zf(t) {
    return eo(t) ? Tf(t, !0) : Uf(t);
  }
  var el = Nf(function (t, e) {
    return t == null ? {} : ((e = zi(Ki(e, 1), Hf)), Cf(t, Rf(Mf(t), e)));
  });
  function no() {
    return [];
  }
  var hn = el,
    tl = Object.defineProperty,
    rl = Object.defineProperties,
    nl = Object.getOwnPropertyDescriptors,
    io = Object.getOwnPropertySymbols,
    il = Object.prototype.hasOwnProperty,
    ol = Object.prototype.propertyIsEnumerable,
    oo = (t, e, r) =>
      e in t
        ? tl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[e] = r),
    al = (t, e) => {
      for (var r in e || (e = {})) il.call(e, r) && oo(t, r, e[r]);
      if (io) for (var r of io(e)) ol.call(e, r) && oo(t, r, e[r]);
      return t;
    },
    sl = (t, e) => rl(t, nl(e));
  function ul(t) {
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  }
  function cl(t) {
    return Object.entries(t).reduce(
      (e, [r, n]) => sl(al({}, e), { [r]: ul(n) }),
      {}
    );
  }
  const ao = (t) => (typeof t == "string" ? t !== "0" && t !== "false" : !!t);
  var fl = Object.defineProperty,
    ll = Object.defineProperties,
    pl = Object.getOwnPropertyDescriptors,
    so = Object.getOwnPropertySymbols,
    hl = Object.prototype.hasOwnProperty,
    dl = Object.prototype.propertyIsEnumerable,
    uo = (t, e, r) =>
      e in t
        ? fl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[e] = r),
    co = (t, e) => {
      for (var r in e || (e = {})) hl.call(e, r) && uo(t, r, e[r]);
      if (so) for (var r of so(e)) dl.call(e, r) && uo(t, r, e[r]);
      return t;
    },
    fo = (t, e) => ll(t, pl(e));
  function lo(t) {
    var e;
    const r = cl(t),
      n = r.auto_inject === void 0 ? !0 : r.auto_inject,
      a = (e = r.display_on) != null ? e : [],
      s = r.first_option === "autodeliver";
    return fo(co({}, hn(r, ["display_on", "first_option"])), {
      auto_inject: n,
      valid_pages: a,
      is_subscription_first: s,
      autoInject: n,
      validPages: a,
      isSubscriptionFirst: s,
    });
  }
  function po(t) {
    var e;
    const r =
      ((e = t.subscription_options) == null
        ? void 0
        : e.storefront_purchase_options) === "subscription_only";
    return fo(co({}, t), { is_subscription_only: r, isSubscriptionOnly: r });
  }
  function yl(t) {
    return t.map((e) => {
      const r = {};
      return (
        Object.entries(e).forEach(([n, a]) => {
          r[n] = po(a);
        }),
        r
      );
    });
  }
  const dn = "2020-12",
    gl = {
      store_currency: {
        currency_code: "USD",
        currency_symbol: "$",
        decimal_separator: ".",
        thousands_separator: ",",
        currency_symbol_location: "left",
      },
    },
    It = new Map();
  function fr(t, e) {
    return It.has(t) || It.set(t, e()), It.get(t);
  }
  async function yn(t, e) {
    var r;
    const n = (r = e?.version) != null ? r : "2020-12",
      { product: a } = await fr(`product.${t}.${n}`, () =>
        or("get", `/product/${n}/${t}.json`)
      );
    return n === "2020-12" ? po(a) : a;
  }
  async function ho() {
    return await fr("storeSettings", () =>
      or("get", `/${dn}/store_settings.json`).catch(() => gl)
    );
  }
  async function yo() {
    const { widget_settings: t } = await fr("widgetSettings", () =>
      or("get", `/${dn}/widget_settings.json`)
    );
    return lo(t);
  }
  async function go() {
    const {
      products: t,
      widget_settings: e,
      store_settings: r,
      meta: n,
    } = await fr("productsAndSettings", () =>
      or("get", `/product/${dn}/products.json`)
    );
    return n?.status === "error"
      ? Promise.reject(n.message)
      : { products: yl(t), widget_settings: lo(e), store_settings: r ?? {} };
  }
  async function ml() {
    const { products: t } = await go();
    return t;
  }
  async function wl(t) {
    const [e, r, n] = await Promise.all([yn(t), ho(), yo()]);
    return {
      product: e,
      store_settings: r,
      widget_settings: n,
      storeSettings: r,
      widgetSettings: n,
    };
  }
  async function mo(t) {
    const { bundle_product: e } = await yn(t);
    return e;
  }
  async function wo() {
    return Array.from(It.keys()).forEach((t) => It.delete(t));
  }
  var vl = Object.freeze({
      __proto__: null,
      getCDNProduct: yn,
      getCDNStoreSettings: ho,
      getCDNWidgetSettings: yo,
      getCDNProductsAndSettings: go,
      getCDNProducts: ml,
      getCDNProductAndSettings: wl,
      getCDNBundleSettings: mo,
      resetCDNCache: wo,
    }),
    vo = { exports: {} };
  /*! For license information please see xdr.js.LICENSE.txt */ (function (
    t,
    e
  ) {
    (function (r, n) {
      t.exports = n();
    })(oe, () =>
      (() => {
        var r = {
            899: (s, f, p) => {
              const h = p(221);
              s.exports = h;
            },
            221: (s, f, p) => {
              p.r(f),
                p.d(f, {
                  Array: () => ft,
                  Bool: () => G,
                  Double: () => pr,
                  Enum: () => _e,
                  Float: () => Pe,
                  Hyper: () => L,
                  Int: () => z,
                  Opaque: () => Pt,
                  Option: () => Ut,
                  Quadruple: () => k,
                  Reference: () => ee,
                  String: () => Rt,
                  Struct: () => Fe,
                  Union: () => Ie,
                  UnsignedHyper: () => ie,
                  UnsignedInt: () => N,
                  VarArray: () => Ft,
                  VarOpaque: () => Se,
                  Void: () => J,
                  config: () => g,
                });
              class h extends TypeError {
                constructor(o) {
                  super(`XDR Write Error: ${o}`);
                }
              }
              class m extends TypeError {
                constructor(o) {
                  super(`XDR Read Error: ${o}`);
                }
              }
              class v extends TypeError {
                constructor(o) {
                  super(`XDR Type Definition Error: ${o}`);
                }
              }
              class _ extends v {
                constructor() {
                  super(
                    "method not implemented, it should be overloaded in the descendant class."
                  );
                }
              }
              var b = p(764).lW;
              class y {
                constructor(o) {
                  if (!b.isBuffer(o)) {
                    if (!(o instanceof Array))
                      throw new m("source not specified");
                    o = b.from(o);
                  }
                  (this._buffer = o),
                    (this._length = o.length),
                    (this._index = 0);
                }
                _buffer;
                _length;
                _index;
                get eof() {
                  return this._index === this._length;
                }
                advance(o) {
                  const l = this._index;
                  if (((this._index += o), this._length < this._index))
                    throw new m(
                      "attempt to read outside the boundary of the buffer"
                    );
                  const w = 4 - (o % 4 || 4);
                  if (w > 0) {
                    for (let A = 0; A < w; A++)
                      if (this._buffer[this._index + A] !== 0)
                        throw new m("invalid padding");
                    this._index += w;
                  }
                  return l;
                }
                rewind() {
                  this._index = 0;
                }
                read(o) {
                  const l = this.advance(o);
                  return this._buffer.subarray(l, l + o);
                }
                readInt32BE() {
                  return this._buffer.readInt32BE(this.advance(4));
                }
                readUInt32BE() {
                  return this._buffer.readUInt32BE(this.advance(4));
                }
                readBigInt64BE() {
                  return this._buffer.readBigInt64BE(this.advance(8));
                }
                readBigUInt64BE() {
                  return this._buffer.readBigUInt64BE(this.advance(8));
                }
                readFloatBE() {
                  return this._buffer.readFloatBE(this.advance(4));
                }
                readDoubleBE() {
                  return this._buffer.readDoubleBE(this.advance(8));
                }
                ensureInputConsumed() {
                  if (this._index !== this._length)
                    throw new m(
                      "invalid XDR contract typecast - source buffer not entirely consumed"
                    );
                }
              }
              var x = p(764).lW;
              const I = 8192;
              class $ {
                constructor(o) {
                  typeof o == "number"
                    ? (o = x.allocUnsafe(o))
                    : o instanceof x || (o = x.allocUnsafe(I)),
                    (this._buffer = o),
                    (this._length = o.length);
                }
                _buffer;
                _length;
                _index = 0;
                alloc(o) {
                  const l = this._index;
                  return (
                    (this._index += o),
                    this._length < this._index && this.resize(this._index),
                    l
                  );
                }
                resize(o) {
                  const l = Math.ceil(o / I) * I,
                    w = x.allocUnsafe(l);
                  this._buffer.copy(w, 0, 0, this._length),
                    (this._buffer = w),
                    (this._length = l);
                }
                finalize() {
                  return this._buffer.subarray(0, this._index);
                }
                toArray() {
                  return [...this.finalize()];
                }
                write(o, l) {
                  if (typeof o == "string") {
                    const A = this.alloc(l);
                    this._buffer.write(o, A, "utf8");
                  } else {
                    o instanceof x || (o = x.from(o));
                    const A = this.alloc(l);
                    o.copy(this._buffer, A, 0, l);
                  }
                  const w = 4 - (l % 4 || 4);
                  if (w > 0) {
                    const A = this.alloc(w);
                    this._buffer.fill(0, A, this._index);
                  }
                }
                writeInt32BE(o) {
                  const l = this.alloc(4);
                  this._buffer.writeInt32BE(o, l);
                }
                writeUInt32BE(o) {
                  const l = this.alloc(4);
                  this._buffer.writeUInt32BE(o, l);
                }
                writeBigInt64BE(o) {
                  const l = this.alloc(8);
                  this._buffer.writeBigInt64BE(o, l);
                }
                writeBigUInt64BE(o) {
                  const l = this.alloc(8);
                  this._buffer.writeBigUInt64BE(o, l);
                }
                writeFloatBE(o) {
                  const l = this.alloc(4);
                  this._buffer.writeFloatBE(o, l);
                }
                writeDoubleBE(o) {
                  const l = this.alloc(8);
                  this._buffer.writeDoubleBE(o, l);
                }
                static bufferChunkSize = I;
              }
              var S = p(764).lW;
              class B {
                toXDR() {
                  let o =
                    arguments.length > 0 && arguments[0] !== void 0
                      ? arguments[0]
                      : "raw";
                  if (!this.write) return this.constructor.toXDR(this, o);
                  const l = new $();
                  return this.write(this, l), M(l.finalize(), o);
                }
                fromXDR(o) {
                  let l =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : "raw";
                  if (!this.read) return this.constructor.fromXDR(o, l);
                  const w = new y(q(o, l)),
                    A = this.read(w);
                  return w.ensureInputConsumed(), A;
                }
                validateXDR(o) {
                  let l =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : "raw";
                  try {
                    return this.fromXDR(o, l), !0;
                  } catch {
                    return !1;
                  }
                }
                static toXDR(o) {
                  let l =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : "raw";
                  const w = new $();
                  return this.write(o, w), M(w.finalize(), l);
                }
                static fromXDR(o) {
                  const l = new y(
                      q(
                        o,
                        arguments.length > 1 && arguments[1] !== void 0
                          ? arguments[1]
                          : "raw"
                      )
                    ),
                    w = this.read(l);
                  return l.ensureInputConsumed(), w;
                }
                static validateXDR(o) {
                  let l =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : "raw";
                  try {
                    return this.fromXDR(o, l), !0;
                  } catch {
                    return !1;
                  }
                }
              }
              class R extends B {
                static read(o) {
                  throw new _();
                }
                static write(o, l) {
                  throw new _();
                }
                static isValid(o) {
                  return !1;
                }
              }
              class T extends B {
                isValid(o) {
                  return !1;
                }
              }
              class D extends TypeError {
                constructor(o) {
                  super(
                    `Invalid format ${o}, must be one of "raw", "hex", "base64"`
                  );
                }
              }
              function M(d, o) {
                switch (o) {
                  case "raw":
                    return d;
                  case "hex":
                    return d.toString("hex");
                  case "base64":
                    return d.toString("base64");
                  default:
                    throw new D(o);
                }
              }
              function q(d, o) {
                switch (o) {
                  case "raw":
                    return d;
                  case "hex":
                    return S.from(d, "hex");
                  case "base64":
                    return S.from(d, "base64");
                  default:
                    throw new D(o);
                }
              }
              const V = 2147483647,
                Y = -2147483648;
              class z extends R {
                static read(o) {
                  return o.readInt32BE();
                }
                static write(o, l) {
                  if (typeof o != "number") throw new h("not a number");
                  if ((0 | o) !== o) throw new h("invalid i32 value");
                  l.writeInt32BE(o);
                }
                static isValid(o) {
                  return (
                    typeof o == "number" && (0 | o) === o && o >= Y && o <= V
                  );
                }
              }
              (z.MAX_VALUE = V), (z.MIN_VALUE = 2147483648);
              const ne = -9223372036854775808n,
                ae = 9223372036854775807n;
              class L extends R {
                constructor(o, l) {
                  if ((super(), typeof o == "bigint")) {
                    if (o < ne || o > ae)
                      throw new TypeError("Invalid i64 value");
                    this._value = o;
                  } else {
                    if ((0 | o) !== o || (0 | l) !== l)
                      throw new TypeError("Invalid i64 value");
                    this._value = (BigInt(l >>> 0) << 32n) | BigInt(o >>> 0);
                  }
                }
                get low() {
                  return Number(0xffffffffn & this._value) << 0;
                }
                get high() {
                  return Number(this._value >> 32n) >> 0;
                }
                get unsigned() {
                  return !1;
                }
                toString() {
                  return this._value.toString();
                }
                toJSON() {
                  return { _value: this._value.toString() };
                }
                static read(o) {
                  return new L(o.readBigInt64BE());
                }
                static write(o, l) {
                  if (!(o instanceof this)) throw new h(`${o} is not a Hyper`);
                  l.writeBigInt64BE(o._value);
                }
                static fromString(o) {
                  if (!/^-?\d{0,19}$/.test(o))
                    throw new TypeError(`Invalid i64 string value: ${o}`);
                  return new L(BigInt(o));
                }
                static fromBits(o, l) {
                  return new this(o, l);
                }
                static isValid(o) {
                  return o instanceof this;
                }
              }
              (L.MAX_VALUE = new L(ae)), (L.MIN_VALUE = new L(ne));
              const Z = 4294967295;
              class N extends R {
                static read(o) {
                  return o.readUInt32BE();
                }
                static write(o, l) {
                  if (typeof o != "number" || !(o >= 0 && o <= Z) || o % 1 != 0)
                    throw new h("invalid u32 value");
                  l.writeUInt32BE(o);
                }
                static isValid(o) {
                  return typeof o == "number" && o % 1 == 0 && o >= 0 && o <= Z;
                }
              }
              (N.MAX_VALUE = Z), (N.MIN_VALUE = 0);
              const se = 0n,
                ut = 0xffffffffffffffffn;
              class ie extends R {
                constructor(o, l) {
                  if ((super(), typeof o == "bigint")) {
                    if (o < se || o > ut)
                      throw new TypeError("Invalid u64 value");
                    this._value = o;
                  } else {
                    if ((0 | o) !== o || (0 | l) !== l)
                      throw new TypeError("Invalid u64 value");
                    this._value = (BigInt(l >>> 0) << 32n) | BigInt(o >>> 0);
                  }
                }
                get low() {
                  return Number(0xffffffffn & this._value) << 0;
                }
                get high() {
                  return Number(this._value >> 32n) >> 0;
                }
                get unsigned() {
                  return !0;
                }
                toString() {
                  return this._value.toString();
                }
                toJSON() {
                  return { _value: this._value.toString() };
                }
                static read(o) {
                  return new ie(o.readBigUInt64BE());
                }
                static write(o, l) {
                  if (!(o instanceof this))
                    throw new h(`${o} is not an UnsignedHyper`);
                  l.writeBigUInt64BE(o._value);
                }
                static fromString(o) {
                  if (!/^\d{0,20}$/.test(o))
                    throw new TypeError(`Invalid u64 string value: ${o}`);
                  return new ie(BigInt(o));
                }
                static fromBits(o, l) {
                  return new this(o, l);
                }
                static isValid(o) {
                  return o instanceof this;
                }
              }
              (ie.MAX_VALUE = new ie(ut)), (ie.MIN_VALUE = new ie(se));
              class Pe extends R {
                static read(o) {
                  return o.readFloatBE();
                }
                static write(o, l) {
                  if (typeof o != "number") throw new h("not a number");
                  l.writeFloatBE(o);
                }
                static isValid(o) {
                  return typeof o == "number";
                }
              }
              class pr extends R {
                static read(o) {
                  return o.readDoubleBE();
                }
                static write(o, l) {
                  if (typeof o != "number") throw new h("not a number");
                  l.writeDoubleBE(o);
                }
                static isValid(o) {
                  return typeof o == "number";
                }
              }
              class k extends R {
                static read() {
                  throw new v("quadruple not supported");
                }
                static write() {
                  throw new v("quadruple not supported");
                }
                static isValid() {
                  return !1;
                }
              }
              class G extends R {
                static read(o) {
                  const l = z.read(o);
                  switch (l) {
                    case 0:
                      return !1;
                    case 1:
                      return !0;
                    default:
                      throw new m(`got ${l} when trying to read a bool`);
                  }
                }
                static write(o, l) {
                  const w = o ? 1 : 0;
                  z.write(w, l);
                }
                static isValid(o) {
                  return typeof o == "boolean";
                }
              }
              var ct = p(764).lW;
              class Rt extends T {
                constructor() {
                  let o =
                    arguments.length > 0 && arguments[0] !== void 0
                      ? arguments[0]
                      : N.MAX_VALUE;
                  super(), (this._maxLength = o);
                }
                read(o) {
                  const l = N.read(o);
                  if (l > this._maxLength)
                    throw new m(
                      `saw ${l} length String, max allowed is ${this._maxLength}`
                    );
                  return o.read(l);
                }
                readString(o) {
                  return this.read(o).toString("utf8");
                }
                write(o, l) {
                  const w =
                    typeof o == "string" ? ct.byteLength(o, "utf8") : o.length;
                  if (w > this._maxLength)
                    throw new h(
                      `got ${o.length} bytes, max allowed is ${this._maxLength}`
                    );
                  N.write(w, l), l.write(o, w);
                }
                isValid(o) {
                  return typeof o == "string"
                    ? ct.byteLength(o, "utf8") <= this._maxLength
                    : !!(o instanceof Array || ct.isBuffer(o)) &&
                        o.length <= this._maxLength;
                }
              }
              var hr = p(764).lW;
              class Pt extends T {
                constructor(o) {
                  super(), (this._length = o);
                }
                read(o) {
                  return o.read(this._length);
                }
                write(o, l) {
                  const { length: w } = o;
                  if (w !== this._length)
                    throw new h(
                      `got ${o.length} bytes, expected ${this._length}`
                    );
                  l.write(o, w);
                }
                isValid(o) {
                  return hr.isBuffer(o) && o.length === this._length;
                }
              }
              var dr = p(764).lW;
              class Se extends T {
                constructor() {
                  let o =
                    arguments.length > 0 && arguments[0] !== void 0
                      ? arguments[0]
                      : N.MAX_VALUE;
                  super(), (this._maxLength = o);
                }
                read(o) {
                  const l = N.read(o);
                  if (l > this._maxLength)
                    throw new m(
                      `saw ${l} length VarOpaque, max allowed is ${this._maxLength}`
                    );
                  return o.read(l);
                }
                write(o, l) {
                  const { length: w } = o;
                  if (o.length > this._maxLength)
                    throw new h(
                      `got ${o.length} bytes, max allowed is ${this._maxLength}`
                    );
                  N.write(w, l), l.write(o, w);
                }
                isValid(o) {
                  return dr.isBuffer(o) && o.length <= this._maxLength;
                }
              }
              class ft extends T {
                constructor(o, l) {
                  super(), (this._childType = o), (this._length = l);
                }
                read(o) {
                  const l = new p.g.Array(this._length);
                  for (let w = 0; w < this._length; w++)
                    l[w] = this._childType.read(o);
                  return l;
                }
                write(o, l) {
                  if (!(o instanceof p.g.Array))
                    throw new h("value is not array");
                  if (o.length !== this._length)
                    throw new h(
                      `got array of size ${o.length}, expected ${this._length}`
                    );
                  for (const w of o) this._childType.write(w, l);
                }
                isValid(o) {
                  if (!(o instanceof p.g.Array) || o.length !== this._length)
                    return !1;
                  for (const l of o) if (!this._childType.isValid(l)) return !1;
                  return !0;
                }
              }
              class Ft extends T {
                constructor(o) {
                  let l =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : N.MAX_VALUE;
                  super(), (this._childType = o), (this._maxLength = l);
                }
                read(o) {
                  const l = N.read(o);
                  if (l > this._maxLength)
                    throw new m(
                      `saw ${l} length VarArray, max allowed is ${this._maxLength}`
                    );
                  const w = new Array(l);
                  for (let A = 0; A < l; A++) w[A] = this._childType.read(o);
                  return w;
                }
                write(o, l) {
                  if (!(o instanceof Array)) throw new h("value is not array");
                  if (o.length > this._maxLength)
                    throw new h(
                      `got array of size ${o.length}, max allowed is ${this._maxLength}`
                    );
                  N.write(o.length, l);
                  for (const w of o) this._childType.write(w, l);
                }
                isValid(o) {
                  if (!(o instanceof Array) || o.length > this._maxLength)
                    return !1;
                  for (const l of o) if (!this._childType.isValid(l)) return !1;
                  return !0;
                }
              }
              class Ut extends R {
                constructor(o) {
                  super(), (this._childType = o);
                }
                read(o) {
                  if (G.read(o)) return this._childType.read(o);
                }
                write(o, l) {
                  const w = o != null;
                  G.write(w, l), w && this._childType.write(o, l);
                }
                isValid(o) {
                  return o == null || this._childType.isValid(o);
                }
              }
              class J extends R {
                static read() {}
                static write(o) {
                  if (o !== void 0)
                    throw new h("trying to write value to a void slot");
                }
                static isValid(o) {
                  return o === void 0;
                }
              }
              class _e extends R {
                constructor(o, l) {
                  super(), (this.name = o), (this.value = l);
                }
                static read(o) {
                  const l = z.read(o),
                    w = this._byValue[l];
                  if (w === void 0)
                    throw new m(
                      `unknown ${this.enumName} member for value ${l}`
                    );
                  return w;
                }
                static write(o, l) {
                  if (!(o instanceof this))
                    throw new h(`unknown ${o} is not a ${this.enumName}`);
                  z.write(o.value, l);
                }
                static isValid(o) {
                  return o instanceof this;
                }
                static members() {
                  return this._members;
                }
                static values() {
                  return Object.values(this._members);
                }
                static fromName(o) {
                  const l = this._members[o];
                  if (!l)
                    throw new TypeError(
                      `${o} is not a member of ${this.enumName}`
                    );
                  return l;
                }
                static fromValue(o) {
                  const l = this._byValue[o];
                  if (l === void 0)
                    throw new TypeError(
                      `${o} is not a value of any member of ${this.enumName}`
                    );
                  return l;
                }
                static create(o, l, w) {
                  const A = class extends _e {};
                  (A.enumName = l),
                    (o.results[l] = A),
                    (A._members = {}),
                    (A._byValue = {});
                  for (const [F, P] of Object.entries(w)) {
                    const U = new A(F, P);
                    (A._members[F] = U), (A._byValue[P] = U), (A[F] = () => U);
                  }
                  return A;
                }
              }
              class ee extends R {
                resolve() {
                  throw new v(
                    '"resolve" method should be implemented in the descendant class'
                  );
                }
              }
              class Fe extends R {
                constructor(o) {
                  super(), (this._attributes = o || {});
                }
                static read(o) {
                  const l = {};
                  for (const [w, A] of this._fields) l[w] = A.read(o);
                  return new this(l);
                }
                static write(o, l) {
                  if (!(o instanceof this))
                    throw new h(`${o} is not a ${this.structName}`);
                  for (const [w, A] of this._fields) {
                    const F = o._attributes[w];
                    A.write(F, l);
                  }
                }
                static isValid(o) {
                  return o instanceof this;
                }
                static create(o, l, w) {
                  const A = class extends Fe {};
                  (A.structName = l), (o.results[l] = A);
                  const F = new Array(w.length);
                  for (let P = 0; P < w.length; P++) {
                    const U = w[P],
                      Ct = U[0];
                    let gr = U[1];
                    gr instanceof ee && (gr = gr.resolve(o)),
                      (F[P] = [Ct, gr]),
                      (A.prototype[Ct] = yr(Ct));
                  }
                  return (A._fields = F), A;
                }
              }
              function yr(d) {
                return function (o) {
                  return (
                    o !== void 0 && (this._attributes[d] = o),
                    this._attributes[d]
                  );
                };
              }
              class Ie extends T {
                constructor(o, l) {
                  super(), this.set(o, l);
                }
                set(o, l) {
                  typeof o == "string" &&
                    (o = this.constructor._switchOn.fromName(o)),
                    (this._switch = o);
                  const w = this.constructor.armForSwitch(this._switch);
                  (this._arm = w),
                    (this._armType = w === J ? J : this.constructor._arms[w]),
                    (this._value = l);
                }
                get() {
                  let o =
                    arguments.length > 0 && arguments[0] !== void 0
                      ? arguments[0]
                      : this._arm;
                  if (this._arm !== J && this._arm !== o)
                    throw new TypeError(`${o} not set`);
                  return this._value;
                }
                switch() {
                  return this._switch;
                }
                arm() {
                  return this._arm;
                }
                armType() {
                  return this._armType;
                }
                value() {
                  return this._value;
                }
                static armForSwitch(o) {
                  const l = this._switches.get(o);
                  if (l !== void 0) return l;
                  if (this._defaultArm) return this._defaultArm;
                  throw new TypeError(`Bad union switch: ${o}`);
                }
                static armTypeForArm(o) {
                  return o === J ? J : this._arms[o];
                }
                static read(o) {
                  const l = this._switchOn.read(o),
                    w = this.armForSwitch(l),
                    A = w === J ? J : this._arms[w];
                  let F;
                  return (
                    (F = A !== void 0 ? A.read(o) : w.read(o)), new this(l, F)
                  );
                }
                static write(o, l) {
                  if (!(o instanceof this))
                    throw new h(`${o} is not a ${this.unionName}`);
                  this._switchOn.write(o.switch(), l),
                    o.armType().write(o.value(), l);
                }
                static isValid(o) {
                  return o instanceof this;
                }
                static create(o, l, w) {
                  const A = class extends Ie {};
                  (A.unionName = l),
                    (o.results[l] = A),
                    w.switchOn instanceof ee
                      ? (A._switchOn = w.switchOn.resolve(o))
                      : (A._switchOn = w.switchOn),
                    (A._switches = new Map()),
                    (A._arms = {});
                  let F = w.defaultArm;
                  F instanceof ee && (F = F.resolve(o)), (A._defaultArm = F);
                  for (const [P, U] of w.switches) {
                    const Ct =
                      typeof P == "string" ? A._switchOn.fromName(P) : P;
                    A._switches.set(Ct, U);
                  }
                  if (A._switchOn.values !== void 0)
                    for (const P of A._switchOn.values())
                      (A[P.name] = function (U) {
                        return new A(P, U);
                      }),
                        (A.prototype[P.name] = function (U) {
                          return this.set(P, U);
                        });
                  if (w.arms)
                    for (const [P, U] of Object.entries(w.arms))
                      (A._arms[P] = U instanceof ee ? U.resolve(o) : U),
                        U !== J &&
                          (A.prototype[P] = function () {
                            return this.get(P);
                          });
                  return A;
                }
              }
              class fe extends ee {
                constructor(o) {
                  super(), (this.name = o);
                }
                resolve(o) {
                  return o.definitions[this.name].resolve(o);
                }
              }
              class lt extends ee {
                constructor(o, l) {
                  let w =
                    arguments.length > 2 &&
                    arguments[2] !== void 0 &&
                    arguments[2];
                  super(),
                    (this.childReference = o),
                    (this.length = l),
                    (this.variable = w);
                }
                resolve(o) {
                  let l = this.childReference,
                    w = this.length;
                  return (
                    l instanceof ee && (l = l.resolve(o)),
                    w instanceof ee && (w = w.resolve(o)),
                    this.variable ? new Ft(l, w) : new ft(l, w)
                  );
                }
              }
              class En extends ee {
                constructor(o) {
                  super(), (this.childReference = o), (this.name = o.name);
                }
                resolve(o) {
                  let l = this.childReference;
                  return l instanceof ee && (l = l.resolve(o)), new Ut(l);
                }
              }
              class le extends ee {
                constructor(o, l) {
                  super(), (this.sizedType = o), (this.length = l);
                }
                resolve(o) {
                  let l = this.length;
                  return (
                    l instanceof ee && (l = l.resolve(o)), new this.sizedType(l)
                  );
                }
              }
              class We {
                constructor(o, l, w) {
                  (this.constructor = o), (this.name = l), (this.config = w);
                }
                resolve(o) {
                  return this.name in o.results
                    ? o.results[this.name]
                    : this.constructor(o, this.name, this.config);
                }
              }
              function i(d, o, l) {
                return (
                  l instanceof ee && (l = l.resolve(d)), (d.results[o] = l), l
                );
              }
              function u(d, o, l) {
                return (d.results[o] = l), l;
              }
              class c {
                constructor(o) {
                  (this._destination = o), (this._definitions = {});
                }
                enum(o, l) {
                  const w = new We(_e.create, o, l);
                  this.define(o, w);
                }
                struct(o, l) {
                  const w = new We(Fe.create, o, l);
                  this.define(o, w);
                }
                union(o, l) {
                  const w = new We(Ie.create, o, l);
                  this.define(o, w);
                }
                typedef(o, l) {
                  const w = new We(i, o, l);
                  this.define(o, w);
                }
                const(o, l) {
                  const w = new We(u, o, l);
                  this.define(o, w);
                }
                void() {
                  return J;
                }
                bool() {
                  return G;
                }
                int() {
                  return z;
                }
                hyper() {
                  return L;
                }
                uint() {
                  return N;
                }
                uhyper() {
                  return ie;
                }
                float() {
                  return Pe;
                }
                double() {
                  return pr;
                }
                quadruple() {
                  return k;
                }
                string(o) {
                  return new le(Rt, o);
                }
                opaque(o) {
                  return new le(Pt, o);
                }
                varOpaque(o) {
                  return new le(Se, o);
                }
                array(o, l) {
                  return new lt(o, l);
                }
                varArray(o, l) {
                  return new lt(o, l, !0);
                }
                option(o) {
                  return new En(o);
                }
                define(o, l) {
                  if (this._destination[o] !== void 0)
                    throw new v(`${o} is already defined`);
                  this._definitions[o] = l;
                }
                lookup(o) {
                  return new fe(o);
                }
                resolve() {
                  for (const o of Object.values(this._definitions))
                    o.resolve({
                      definitions: this._definitions,
                      results: this._destination,
                    });
                }
              }
              function g(d) {
                let o =
                  arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {};
                if (d) {
                  const l = new c(o);
                  d(l), l.resolve();
                }
                return o;
              }
            },
            742: (s, f) => {
              (f.byteLength = function (x) {
                var I = b(x),
                  $ = I[0],
                  S = I[1];
                return (3 * ($ + S)) / 4 - S;
              }),
                (f.toByteArray = function (x) {
                  var I,
                    $,
                    S = b(x),
                    B = S[0],
                    R = S[1],
                    T = new m(
                      (function (q, V, Y) {
                        return (3 * (V + Y)) / 4 - Y;
                      })(0, B, R)
                    ),
                    D = 0,
                    M = R > 0 ? B - 4 : B;
                  for ($ = 0; $ < M; $ += 4)
                    (I =
                      (h[x.charCodeAt($)] << 18) |
                      (h[x.charCodeAt($ + 1)] << 12) |
                      (h[x.charCodeAt($ + 2)] << 6) |
                      h[x.charCodeAt($ + 3)]),
                      (T[D++] = (I >> 16) & 255),
                      (T[D++] = (I >> 8) & 255),
                      (T[D++] = 255 & I);
                  return (
                    R === 2 &&
                      ((I =
                        (h[x.charCodeAt($)] << 2) |
                        (h[x.charCodeAt($ + 1)] >> 4)),
                      (T[D++] = 255 & I)),
                    R === 1 &&
                      ((I =
                        (h[x.charCodeAt($)] << 10) |
                        (h[x.charCodeAt($ + 1)] << 4) |
                        (h[x.charCodeAt($ + 2)] >> 2)),
                      (T[D++] = (I >> 8) & 255),
                      (T[D++] = 255 & I)),
                    T
                  );
                }),
                (f.fromByteArray = function (x) {
                  for (
                    var I,
                      $ = x.length,
                      S = $ % 3,
                      B = [],
                      R = 16383,
                      T = 0,
                      D = $ - S;
                    T < D;
                    T += R
                  )
                    B.push(y(x, T, T + R > D ? D : T + R));
                  return (
                    S === 1
                      ? ((I = x[$ - 1]),
                        B.push(p[I >> 2] + p[(I << 4) & 63] + "=="))
                      : S === 2 &&
                        ((I = (x[$ - 2] << 8) + x[$ - 1]),
                        B.push(
                          p[I >> 10] + p[(I >> 4) & 63] + p[(I << 2) & 63] + "="
                        )),
                    B.join("")
                  );
                });
              for (
                var p = [],
                  h = [],
                  m = typeof Uint8Array < "u" ? Uint8Array : Array,
                  v =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                  _ = 0;
                _ < 64;
                ++_
              )
                (p[_] = v[_]), (h[v.charCodeAt(_)] = _);
              function b(x) {
                var I = x.length;
                if (I % 4 > 0)
                  throw new Error(
                    "Invalid string. Length must be a multiple of 4"
                  );
                var $ = x.indexOf("=");
                return $ === -1 && ($ = I), [$, $ === I ? 0 : 4 - ($ % 4)];
              }
              function y(x, I, $) {
                for (var S, B, R = [], T = I; T < $; T += 3)
                  (S =
                    ((x[T] << 16) & 16711680) +
                    ((x[T + 1] << 8) & 65280) +
                    (255 & x[T + 2])),
                    R.push(
                      p[((B = S) >> 18) & 63] +
                        p[(B >> 12) & 63] +
                        p[(B >> 6) & 63] +
                        p[63 & B]
                    );
                return R.join("");
              }
              (h["-".charCodeAt(0)] = 62), (h["_".charCodeAt(0)] = 63);
            },
            764: (s, f, p) => {
              const h = p(742),
                m = p(645),
                v =
                  typeof Symbol == "function" && typeof Symbol.for == "function"
                    ? Symbol.for("nodejs.util.inspect.custom")
                    : null;
              (f.lW = y), (f.h2 = 50);
              const _ = 2147483647;
              function b(i) {
                if (i > _)
                  throw new RangeError(
                    'The value "' + i + '" is invalid for option "size"'
                  );
                const u = new Uint8Array(i);
                return Object.setPrototypeOf(u, y.prototype), u;
              }
              function y(i, u, c) {
                if (typeof i == "number") {
                  if (typeof u == "string")
                    throw new TypeError(
                      'The "string" argument must be of type string. Received type number'
                    );
                  return $(i);
                }
                return x(i, u, c);
              }
              function x(i, u, c) {
                if (typeof i == "string")
                  return (function (o, l) {
                    if (
                      ((typeof l == "string" && l !== "") || (l = "utf8"),
                      !y.isEncoding(l))
                    )
                      throw new TypeError("Unknown encoding: " + l);
                    const w = 0 | T(o, l);
                    let A = b(w);
                    const F = A.write(o, l);
                    return F !== w && (A = A.slice(0, F)), A;
                  })(i, u);
                if (ArrayBuffer.isView(i))
                  return (function (o) {
                    if (fe(o, Uint8Array)) {
                      const l = new Uint8Array(o);
                      return B(l.buffer, l.byteOffset, l.byteLength);
                    }
                    return S(o);
                  })(i);
                if (i == null)
                  throw new TypeError(
                    "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                      typeof i
                  );
                if (
                  fe(i, ArrayBuffer) ||
                  (i && fe(i.buffer, ArrayBuffer)) ||
                  (typeof SharedArrayBuffer < "u" &&
                    (fe(i, SharedArrayBuffer) ||
                      (i && fe(i.buffer, SharedArrayBuffer))))
                )
                  return B(i, u, c);
                if (typeof i == "number")
                  throw new TypeError(
                    'The "value" argument must not be of type number. Received type number'
                  );
                const g = i.valueOf && i.valueOf();
                if (g != null && g !== i) return y.from(g, u, c);
                const d = (function (o) {
                  if (y.isBuffer(o)) {
                    const l = 0 | R(o.length),
                      w = b(l);
                    return w.length === 0 || o.copy(w, 0, 0, l), w;
                  }
                  if (o.length !== void 0)
                    return typeof o.length != "number" || lt(o.length)
                      ? b(0)
                      : S(o);
                  if (o.type === "Buffer" && Array.isArray(o.data))
                    return S(o.data);
                })(i);
                if (d) return d;
                if (
                  typeof Symbol < "u" &&
                  Symbol.toPrimitive != null &&
                  typeof i[Symbol.toPrimitive] == "function"
                )
                  return y.from(i[Symbol.toPrimitive]("string"), u, c);
                throw new TypeError(
                  "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                    typeof i
                );
              }
              function I(i) {
                if (typeof i != "number")
                  throw new TypeError('"size" argument must be of type number');
                if (i < 0)
                  throw new RangeError(
                    'The value "' + i + '" is invalid for option "size"'
                  );
              }
              function $(i) {
                return I(i), b(i < 0 ? 0 : 0 | R(i));
              }
              function S(i) {
                const u = i.length < 0 ? 0 : 0 | R(i.length),
                  c = b(u);
                for (let g = 0; g < u; g += 1) c[g] = 255 & i[g];
                return c;
              }
              function B(i, u, c) {
                if (u < 0 || i.byteLength < u)
                  throw new RangeError('"offset" is outside of buffer bounds');
                if (i.byteLength < u + (c || 0))
                  throw new RangeError('"length" is outside of buffer bounds');
                let g;
                return (
                  (g =
                    u === void 0 && c === void 0
                      ? new Uint8Array(i)
                      : c === void 0
                      ? new Uint8Array(i, u)
                      : new Uint8Array(i, u, c)),
                  Object.setPrototypeOf(g, y.prototype),
                  g
                );
              }
              function R(i) {
                if (i >= _)
                  throw new RangeError(
                    "Attempt to allocate Buffer larger than maximum size: 0x" +
                      _.toString(16) +
                      " bytes"
                  );
                return 0 | i;
              }
              function T(i, u) {
                if (y.isBuffer(i)) return i.length;
                if (ArrayBuffer.isView(i) || fe(i, ArrayBuffer))
                  return i.byteLength;
                if (typeof i != "string")
                  throw new TypeError(
                    'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                      typeof i
                  );
                const c = i.length,
                  g = arguments.length > 2 && arguments[2] === !0;
                if (!g && c === 0) return 0;
                let d = !1;
                for (;;)
                  switch (u) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                      return c;
                    case "utf8":
                    case "utf-8":
                      return Fe(i).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return 2 * c;
                    case "hex":
                      return c >>> 1;
                    case "base64":
                      return yr(i).length;
                    default:
                      if (d) return g ? -1 : Fe(i).length;
                      (u = ("" + u).toLowerCase()), (d = !0);
                  }
              }
              function D(i, u, c) {
                let g = !1;
                if (
                  ((u === void 0 || u < 0) && (u = 0),
                  u > this.length ||
                    ((c === void 0 || c > this.length) && (c = this.length),
                    c <= 0) ||
                    (c >>>= 0) <= (u >>>= 0))
                )
                  return "";
                for (i || (i = "utf8"); ; )
                  switch (i) {
                    case "hex":
                      return Pe(this, u, c);
                    case "utf8":
                    case "utf-8":
                      return N(this, u, c);
                    case "ascii":
                      return ut(this, u, c);
                    case "latin1":
                    case "binary":
                      return ie(this, u, c);
                    case "base64":
                      return Z(this, u, c);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return pr(this, u, c);
                    default:
                      if (g) throw new TypeError("Unknown encoding: " + i);
                      (i = (i + "").toLowerCase()), (g = !0);
                  }
              }
              function M(i, u, c) {
                const g = i[u];
                (i[u] = i[c]), (i[c] = g);
              }
              function q(i, u, c, g, d) {
                if (i.length === 0) return -1;
                if (
                  (typeof c == "string"
                    ? ((g = c), (c = 0))
                    : c > 2147483647
                    ? (c = 2147483647)
                    : c < -2147483648 && (c = -2147483648),
                  lt((c = +c)) && (c = d ? 0 : i.length - 1),
                  c < 0 && (c = i.length + c),
                  c >= i.length)
                ) {
                  if (d) return -1;
                  c = i.length - 1;
                } else if (c < 0) {
                  if (!d) return -1;
                  c = 0;
                }
                if ((typeof u == "string" && (u = y.from(u, g)), y.isBuffer(u)))
                  return u.length === 0 ? -1 : V(i, u, c, g, d);
                if (typeof u == "number")
                  return (
                    (u &= 255),
                    typeof Uint8Array.prototype.indexOf == "function"
                      ? d
                        ? Uint8Array.prototype.indexOf.call(i, u, c)
                        : Uint8Array.prototype.lastIndexOf.call(i, u, c)
                      : V(i, [u], c, g, d)
                  );
                throw new TypeError("val must be string, number or Buffer");
              }
              function V(i, u, c, g, d) {
                let o,
                  l = 1,
                  w = i.length,
                  A = u.length;
                if (
                  g !== void 0 &&
                  ((g = String(g).toLowerCase()) === "ucs2" ||
                    g === "ucs-2" ||
                    g === "utf16le" ||
                    g === "utf-16le")
                ) {
                  if (i.length < 2 || u.length < 2) return -1;
                  (l = 2), (w /= 2), (A /= 2), (c /= 2);
                }
                function F(P, U) {
                  return l === 1 ? P[U] : P.readUInt16BE(U * l);
                }
                if (d) {
                  let P = -1;
                  for (o = c; o < w; o++)
                    if (F(i, o) === F(u, P === -1 ? 0 : o - P)) {
                      if ((P === -1 && (P = o), o - P + 1 === A)) return P * l;
                    } else P !== -1 && (o -= o - P), (P = -1);
                } else
                  for (c + A > w && (c = w - A), o = c; o >= 0; o--) {
                    let P = !0;
                    for (let U = 0; U < A; U++)
                      if (F(i, o + U) !== F(u, U)) {
                        P = !1;
                        break;
                      }
                    if (P) return o;
                  }
                return -1;
              }
              function Y(i, u, c, g) {
                c = Number(c) || 0;
                const d = i.length - c;
                g ? (g = Number(g)) > d && (g = d) : (g = d);
                const o = u.length;
                let l;
                for (g > o / 2 && (g = o / 2), l = 0; l < g; ++l) {
                  const w = parseInt(u.substr(2 * l, 2), 16);
                  if (lt(w)) return l;
                  i[c + l] = w;
                }
                return l;
              }
              function z(i, u, c, g) {
                return Ie(Fe(u, i.length - c), i, c, g);
              }
              function ne(i, u, c, g) {
                return Ie(
                  (function (d) {
                    const o = [];
                    for (let l = 0; l < d.length; ++l)
                      o.push(255 & d.charCodeAt(l));
                    return o;
                  })(u),
                  i,
                  c,
                  g
                );
              }
              function ae(i, u, c, g) {
                return Ie(yr(u), i, c, g);
              }
              function L(i, u, c, g) {
                return Ie(
                  (function (d, o) {
                    let l, w, A;
                    const F = [];
                    for (let P = 0; P < d.length && !((o -= 2) < 0); ++P)
                      (l = d.charCodeAt(P)),
                        (w = l >> 8),
                        (A = l % 256),
                        F.push(A),
                        F.push(w);
                    return F;
                  })(u, i.length - c),
                  i,
                  c,
                  g
                );
              }
              function Z(i, u, c) {
                return u === 0 && c === i.length
                  ? h.fromByteArray(i)
                  : h.fromByteArray(i.slice(u, c));
              }
              function N(i, u, c) {
                c = Math.min(i.length, c);
                const g = [];
                let d = u;
                for (; d < c; ) {
                  const o = i[d];
                  let l = null,
                    w = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                  if (d + w <= c) {
                    let A, F, P, U;
                    switch (w) {
                      case 1:
                        o < 128 && (l = o);
                        break;
                      case 2:
                        (A = i[d + 1]),
                          (192 & A) == 128 &&
                            ((U = ((31 & o) << 6) | (63 & A)),
                            U > 127 && (l = U));
                        break;
                      case 3:
                        (A = i[d + 1]),
                          (F = i[d + 2]),
                          (192 & A) == 128 &&
                            (192 & F) == 128 &&
                            ((U =
                              ((15 & o) << 12) | ((63 & A) << 6) | (63 & F)),
                            U > 2047 && (U < 55296 || U > 57343) && (l = U));
                        break;
                      case 4:
                        (A = i[d + 1]),
                          (F = i[d + 2]),
                          (P = i[d + 3]),
                          (192 & A) == 128 &&
                            (192 & F) == 128 &&
                            (192 & P) == 128 &&
                            ((U =
                              ((15 & o) << 18) |
                              ((63 & A) << 12) |
                              ((63 & F) << 6) |
                              (63 & P)),
                            U > 65535 && U < 1114112 && (l = U));
                    }
                  }
                  l === null
                    ? ((l = 65533), (w = 1))
                    : l > 65535 &&
                      ((l -= 65536),
                      g.push(((l >>> 10) & 1023) | 55296),
                      (l = 56320 | (1023 & l))),
                    g.push(l),
                    (d += w);
                }
                return (function (o) {
                  const l = o.length;
                  if (l <= se) return String.fromCharCode.apply(String, o);
                  let w = "",
                    A = 0;
                  for (; A < l; )
                    w += String.fromCharCode.apply(
                      String,
                      o.slice(A, (A += se))
                    );
                  return w;
                })(g);
              }
              (y.TYPED_ARRAY_SUPPORT = (function () {
                try {
                  const i = new Uint8Array(1),
                    u = {
                      foo: function () {
                        return 42;
                      },
                    };
                  return (
                    Object.setPrototypeOf(u, Uint8Array.prototype),
                    Object.setPrototypeOf(i, u),
                    i.foo() === 42
                  );
                } catch {
                  return !1;
                }
              })()),
                y.TYPED_ARRAY_SUPPORT ||
                  typeof console > "u" ||
                  typeof console.error != "function" ||
                  console.error(
                    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
                  ),
                Object.defineProperty(y.prototype, "parent", {
                  enumerable: !0,
                  get: function () {
                    if (y.isBuffer(this)) return this.buffer;
                  },
                }),
                Object.defineProperty(y.prototype, "offset", {
                  enumerable: !0,
                  get: function () {
                    if (y.isBuffer(this)) return this.byteOffset;
                  },
                }),
                (y.poolSize = 8192),
                (y.from = function (i, u, c) {
                  return x(i, u, c);
                }),
                Object.setPrototypeOf(y.prototype, Uint8Array.prototype),
                Object.setPrototypeOf(y, Uint8Array),
                (y.alloc = function (i, u, c) {
                  return (function (g, d, o) {
                    return (
                      I(g),
                      g <= 0
                        ? b(g)
                        : d !== void 0
                        ? typeof o == "string"
                          ? b(g).fill(d, o)
                          : b(g).fill(d)
                        : b(g)
                    );
                  })(i, u, c);
                }),
                (y.allocUnsafe = function (i) {
                  return $(i);
                }),
                (y.allocUnsafeSlow = function (i) {
                  return $(i);
                }),
                (y.isBuffer = function (i) {
                  return i != null && i._isBuffer === !0 && i !== y.prototype;
                }),
                (y.compare = function (i, u) {
                  if (
                    (fe(i, Uint8Array) &&
                      (i = y.from(i, i.offset, i.byteLength)),
                    fe(u, Uint8Array) &&
                      (u = y.from(u, u.offset, u.byteLength)),
                    !y.isBuffer(i) || !y.isBuffer(u))
                  )
                    throw new TypeError(
                      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                    );
                  if (i === u) return 0;
                  let c = i.length,
                    g = u.length;
                  for (let d = 0, o = Math.min(c, g); d < o; ++d)
                    if (i[d] !== u[d]) {
                      (c = i[d]), (g = u[d]);
                      break;
                    }
                  return c < g ? -1 : g < c ? 1 : 0;
                }),
                (y.isEncoding = function (i) {
                  switch (String(i).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return !0;
                    default:
                      return !1;
                  }
                }),
                (y.concat = function (i, u) {
                  if (!Array.isArray(i))
                    throw new TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  if (i.length === 0) return y.alloc(0);
                  let c;
                  if (u === void 0)
                    for (u = 0, c = 0; c < i.length; ++c) u += i[c].length;
                  const g = y.allocUnsafe(u);
                  let d = 0;
                  for (c = 0; c < i.length; ++c) {
                    let o = i[c];
                    if (fe(o, Uint8Array))
                      d + o.length > g.length
                        ? (y.isBuffer(o) || (o = y.from(o)), o.copy(g, d))
                        : Uint8Array.prototype.set.call(g, o, d);
                    else {
                      if (!y.isBuffer(o))
                        throw new TypeError(
                          '"list" argument must be an Array of Buffers'
                        );
                      o.copy(g, d);
                    }
                    d += o.length;
                  }
                  return g;
                }),
                (y.byteLength = T),
                (y.prototype._isBuffer = !0),
                (y.prototype.swap16 = function () {
                  const i = this.length;
                  if (i % 2 != 0)
                    throw new RangeError(
                      "Buffer size must be a multiple of 16-bits"
                    );
                  for (let u = 0; u < i; u += 2) M(this, u, u + 1);
                  return this;
                }),
                (y.prototype.swap32 = function () {
                  const i = this.length;
                  if (i % 4 != 0)
                    throw new RangeError(
                      "Buffer size must be a multiple of 32-bits"
                    );
                  for (let u = 0; u < i; u += 4)
                    M(this, u, u + 3), M(this, u + 1, u + 2);
                  return this;
                }),
                (y.prototype.swap64 = function () {
                  const i = this.length;
                  if (i % 8 != 0)
                    throw new RangeError(
                      "Buffer size must be a multiple of 64-bits"
                    );
                  for (let u = 0; u < i; u += 8)
                    M(this, u, u + 7),
                      M(this, u + 1, u + 6),
                      M(this, u + 2, u + 5),
                      M(this, u + 3, u + 4);
                  return this;
                }),
                (y.prototype.toString = function () {
                  const i = this.length;
                  return i === 0
                    ? ""
                    : arguments.length === 0
                    ? N(this, 0, i)
                    : D.apply(this, arguments);
                }),
                (y.prototype.toLocaleString = y.prototype.toString),
                (y.prototype.equals = function (i) {
                  if (!y.isBuffer(i))
                    throw new TypeError("Argument must be a Buffer");
                  return this === i || y.compare(this, i) === 0;
                }),
                (y.prototype.inspect = function () {
                  let i = "";
                  const u = f.h2;
                  return (
                    (i = this.toString("hex", 0, u)
                      .replace(/(.{2})/g, "$1 ")
                      .trim()),
                    this.length > u && (i += " ... "),
                    "<Buffer " + i + ">"
                  );
                }),
                v && (y.prototype[v] = y.prototype.inspect),
                (y.prototype.compare = function (i, u, c, g, d) {
                  if (
                    (fe(i, Uint8Array) &&
                      (i = y.from(i, i.offset, i.byteLength)),
                    !y.isBuffer(i))
                  )
                    throw new TypeError(
                      'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                        typeof i
                    );
                  if (
                    (u === void 0 && (u = 0),
                    c === void 0 && (c = i ? i.length : 0),
                    g === void 0 && (g = 0),
                    d === void 0 && (d = this.length),
                    u < 0 || c > i.length || g < 0 || d > this.length)
                  )
                    throw new RangeError("out of range index");
                  if (g >= d && u >= c) return 0;
                  if (g >= d) return -1;
                  if (u >= c) return 1;
                  if (this === i) return 0;
                  let o = (d >>>= 0) - (g >>>= 0),
                    l = (c >>>= 0) - (u >>>= 0);
                  const w = Math.min(o, l),
                    A = this.slice(g, d),
                    F = i.slice(u, c);
                  for (let P = 0; P < w; ++P)
                    if (A[P] !== F[P]) {
                      (o = A[P]), (l = F[P]);
                      break;
                    }
                  return o < l ? -1 : l < o ? 1 : 0;
                }),
                (y.prototype.includes = function (i, u, c) {
                  return this.indexOf(i, u, c) !== -1;
                }),
                (y.prototype.indexOf = function (i, u, c) {
                  return q(this, i, u, c, !0);
                }),
                (y.prototype.lastIndexOf = function (i, u, c) {
                  return q(this, i, u, c, !1);
                }),
                (y.prototype.write = function (i, u, c, g) {
                  if (u === void 0) (g = "utf8"), (c = this.length), (u = 0);
                  else if (c === void 0 && typeof u == "string")
                    (g = u), (c = this.length), (u = 0);
                  else {
                    if (!isFinite(u))
                      throw new Error(
                        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                      );
                    (u >>>= 0),
                      isFinite(c)
                        ? ((c >>>= 0), g === void 0 && (g = "utf8"))
                        : ((g = c), (c = void 0));
                  }
                  const d = this.length - u;
                  if (
                    ((c === void 0 || c > d) && (c = d),
                    (i.length > 0 && (c < 0 || u < 0)) || u > this.length)
                  )
                    throw new RangeError(
                      "Attempt to write outside buffer bounds"
                    );
                  g || (g = "utf8");
                  let o = !1;
                  for (;;)
                    switch (g) {
                      case "hex":
                        return Y(this, i, u, c);
                      case "utf8":
                      case "utf-8":
                        return z(this, i, u, c);
                      case "ascii":
                      case "latin1":
                      case "binary":
                        return ne(this, i, u, c);
                      case "base64":
                        return ae(this, i, u, c);
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return L(this, i, u, c);
                      default:
                        if (o) throw new TypeError("Unknown encoding: " + g);
                        (g = ("" + g).toLowerCase()), (o = !0);
                    }
                }),
                (y.prototype.toJSON = function () {
                  return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0),
                  };
                });
              const se = 4096;
              function ut(i, u, c) {
                let g = "";
                c = Math.min(i.length, c);
                for (let d = u; d < c; ++d)
                  g += String.fromCharCode(127 & i[d]);
                return g;
              }
              function ie(i, u, c) {
                let g = "";
                c = Math.min(i.length, c);
                for (let d = u; d < c; ++d) g += String.fromCharCode(i[d]);
                return g;
              }
              function Pe(i, u, c) {
                const g = i.length;
                (!u || u < 0) && (u = 0), (!c || c < 0 || c > g) && (c = g);
                let d = "";
                for (let o = u; o < c; ++o) d += En[i[o]];
                return d;
              }
              function pr(i, u, c) {
                const g = i.slice(u, c);
                let d = "";
                for (let o = 0; o < g.length - 1; o += 2)
                  d += String.fromCharCode(g[o] + 256 * g[o + 1]);
                return d;
              }
              function k(i, u, c) {
                if (i % 1 != 0 || i < 0)
                  throw new RangeError("offset is not uint");
                if (i + u > c)
                  throw new RangeError("Trying to access beyond buffer length");
              }
              function G(i, u, c, g, d, o) {
                if (!y.isBuffer(i))
                  throw new TypeError(
                    '"buffer" argument must be a Buffer instance'
                  );
                if (u > d || u < o)
                  throw new RangeError('"value" argument is out of bounds');
                if (c + g > i.length)
                  throw new RangeError("Index out of range");
              }
              function ct(i, u, c, g, d) {
                Ut(u, g, d, i, c, 7);
                let o = Number(u & BigInt(4294967295));
                (i[c++] = o),
                  (o >>= 8),
                  (i[c++] = o),
                  (o >>= 8),
                  (i[c++] = o),
                  (o >>= 8),
                  (i[c++] = o);
                let l = Number((u >> BigInt(32)) & BigInt(4294967295));
                return (
                  (i[c++] = l),
                  (l >>= 8),
                  (i[c++] = l),
                  (l >>= 8),
                  (i[c++] = l),
                  (l >>= 8),
                  (i[c++] = l),
                  c
                );
              }
              function Rt(i, u, c, g, d) {
                Ut(u, g, d, i, c, 7);
                let o = Number(u & BigInt(4294967295));
                (i[c + 7] = o),
                  (o >>= 8),
                  (i[c + 6] = o),
                  (o >>= 8),
                  (i[c + 5] = o),
                  (o >>= 8),
                  (i[c + 4] = o);
                let l = Number((u >> BigInt(32)) & BigInt(4294967295));
                return (
                  (i[c + 3] = l),
                  (l >>= 8),
                  (i[c + 2] = l),
                  (l >>= 8),
                  (i[c + 1] = l),
                  (l >>= 8),
                  (i[c] = l),
                  c + 8
                );
              }
              function hr(i, u, c, g, d, o) {
                if (c + g > i.length)
                  throw new RangeError("Index out of range");
                if (c < 0) throw new RangeError("Index out of range");
              }
              function Pt(i, u, c, g, d) {
                return (
                  (u = +u),
                  (c >>>= 0),
                  d || hr(i, 0, c, 4),
                  m.write(i, u, c, g, 23, 4),
                  c + 4
                );
              }
              function dr(i, u, c, g, d) {
                return (
                  (u = +u),
                  (c >>>= 0),
                  d || hr(i, 0, c, 8),
                  m.write(i, u, c, g, 52, 8),
                  c + 8
                );
              }
              (y.prototype.slice = function (i, u) {
                const c = this.length;
                (i = ~~i) < 0 ? (i += c) < 0 && (i = 0) : i > c && (i = c),
                  (u = u === void 0 ? c : ~~u) < 0
                    ? (u += c) < 0 && (u = 0)
                    : u > c && (u = c),
                  u < i && (u = i);
                const g = this.subarray(i, u);
                return Object.setPrototypeOf(g, y.prototype), g;
              }),
                (y.prototype.readUintLE = y.prototype.readUIntLE =
                  function (i, u, c) {
                    (i >>>= 0), (u >>>= 0), c || k(i, u, this.length);
                    let g = this[i],
                      d = 1,
                      o = 0;
                    for (; ++o < u && (d *= 256); ) g += this[i + o] * d;
                    return g;
                  }),
                (y.prototype.readUintBE = y.prototype.readUIntBE =
                  function (i, u, c) {
                    (i >>>= 0), (u >>>= 0), c || k(i, u, this.length);
                    let g = this[i + --u],
                      d = 1;
                    for (; u > 0 && (d *= 256); ) g += this[i + --u] * d;
                    return g;
                  }),
                (y.prototype.readUint8 = y.prototype.readUInt8 =
                  function (i, u) {
                    return (i >>>= 0), u || k(i, 1, this.length), this[i];
                  }),
                (y.prototype.readUint16LE = y.prototype.readUInt16LE =
                  function (i, u) {
                    return (
                      (i >>>= 0),
                      u || k(i, 2, this.length),
                      this[i] | (this[i + 1] << 8)
                    );
                  }),
                (y.prototype.readUint16BE = y.prototype.readUInt16BE =
                  function (i, u) {
                    return (
                      (i >>>= 0),
                      u || k(i, 2, this.length),
                      (this[i] << 8) | this[i + 1]
                    );
                  }),
                (y.prototype.readUint32LE = y.prototype.readUInt32LE =
                  function (i, u) {
                    return (
                      (i >>>= 0),
                      u || k(i, 4, this.length),
                      (this[i] | (this[i + 1] << 8) | (this[i + 2] << 16)) +
                        16777216 * this[i + 3]
                    );
                  }),
                (y.prototype.readUint32BE = y.prototype.readUInt32BE =
                  function (i, u) {
                    return (
                      (i >>>= 0),
                      u || k(i, 4, this.length),
                      16777216 * this[i] +
                        ((this[i + 1] << 16) | (this[i + 2] << 8) | this[i + 3])
                    );
                  }),
                (y.prototype.readBigUInt64LE = le(function (i) {
                  J((i >>>= 0), "offset");
                  const u = this[i],
                    c = this[i + 7];
                  (u !== void 0 && c !== void 0) || _e(i, this.length - 8);
                  const g =
                      u +
                      256 * this[++i] +
                      65536 * this[++i] +
                      this[++i] * 2 ** 24,
                    d =
                      this[++i] +
                      256 * this[++i] +
                      65536 * this[++i] +
                      c * 2 ** 24;
                  return BigInt(g) + (BigInt(d) << BigInt(32));
                })),
                (y.prototype.readBigUInt64BE = le(function (i) {
                  J((i >>>= 0), "offset");
                  const u = this[i],
                    c = this[i + 7];
                  (u !== void 0 && c !== void 0) || _e(i, this.length - 8);
                  const g =
                      u * 2 ** 24 +
                      65536 * this[++i] +
                      256 * this[++i] +
                      this[++i],
                    d =
                      this[++i] * 2 ** 24 +
                      65536 * this[++i] +
                      256 * this[++i] +
                      c;
                  return (BigInt(g) << BigInt(32)) + BigInt(d);
                })),
                (y.prototype.readIntLE = function (i, u, c) {
                  (i >>>= 0), (u >>>= 0), c || k(i, u, this.length);
                  let g = this[i],
                    d = 1,
                    o = 0;
                  for (; ++o < u && (d *= 256); ) g += this[i + o] * d;
                  return (d *= 128), g >= d && (g -= Math.pow(2, 8 * u)), g;
                }),
                (y.prototype.readIntBE = function (i, u, c) {
                  (i >>>= 0), (u >>>= 0), c || k(i, u, this.length);
                  let g = u,
                    d = 1,
                    o = this[i + --g];
                  for (; g > 0 && (d *= 256); ) o += this[i + --g] * d;
                  return (d *= 128), o >= d && (o -= Math.pow(2, 8 * u)), o;
                }),
                (y.prototype.readInt8 = function (i, u) {
                  return (
                    (i >>>= 0),
                    u || k(i, 1, this.length),
                    128 & this[i] ? -1 * (255 - this[i] + 1) : this[i]
                  );
                }),
                (y.prototype.readInt16LE = function (i, u) {
                  (i >>>= 0), u || k(i, 2, this.length);
                  const c = this[i] | (this[i + 1] << 8);
                  return 32768 & c ? 4294901760 | c : c;
                }),
                (y.prototype.readInt16BE = function (i, u) {
                  (i >>>= 0), u || k(i, 2, this.length);
                  const c = this[i + 1] | (this[i] << 8);
                  return 32768 & c ? 4294901760 | c : c;
                }),
                (y.prototype.readInt32LE = function (i, u) {
                  return (
                    (i >>>= 0),
                    u || k(i, 4, this.length),
                    this[i] |
                      (this[i + 1] << 8) |
                      (this[i + 2] << 16) |
                      (this[i + 3] << 24)
                  );
                }),
                (y.prototype.readInt32BE = function (i, u) {
                  return (
                    (i >>>= 0),
                    u || k(i, 4, this.length),
                    (this[i] << 24) |
                      (this[i + 1] << 16) |
                      (this[i + 2] << 8) |
                      this[i + 3]
                  );
                }),
                (y.prototype.readBigInt64LE = le(function (i) {
                  J((i >>>= 0), "offset");
                  const u = this[i],
                    c = this[i + 7];
                  (u !== void 0 && c !== void 0) || _e(i, this.length - 8);
                  const g =
                    this[i + 4] +
                    256 * this[i + 5] +
                    65536 * this[i + 6] +
                    (c << 24);
                  return (
                    (BigInt(g) << BigInt(32)) +
                    BigInt(
                      u +
                        256 * this[++i] +
                        65536 * this[++i] +
                        this[++i] * 16777216
                    )
                  );
                })),
                (y.prototype.readBigInt64BE = le(function (i) {
                  J((i >>>= 0), "offset");
                  const u = this[i],
                    c = this[i + 7];
                  (u !== void 0 && c !== void 0) || _e(i, this.length - 8);
                  const g =
                    (u << 24) + 65536 * this[++i] + 256 * this[++i] + this[++i];
                  return (
                    (BigInt(g) << BigInt(32)) +
                    BigInt(
                      this[++i] * 16777216 +
                        65536 * this[++i] +
                        256 * this[++i] +
                        c
                    )
                  );
                })),
                (y.prototype.readFloatLE = function (i, u) {
                  return (
                    (i >>>= 0),
                    u || k(i, 4, this.length),
                    m.read(this, i, !0, 23, 4)
                  );
                }),
                (y.prototype.readFloatBE = function (i, u) {
                  return (
                    (i >>>= 0),
                    u || k(i, 4, this.length),
                    m.read(this, i, !1, 23, 4)
                  );
                }),
                (y.prototype.readDoubleLE = function (i, u) {
                  return (
                    (i >>>= 0),
                    u || k(i, 8, this.length),
                    m.read(this, i, !0, 52, 8)
                  );
                }),
                (y.prototype.readDoubleBE = function (i, u) {
                  return (
                    (i >>>= 0),
                    u || k(i, 8, this.length),
                    m.read(this, i, !1, 52, 8)
                  );
                }),
                (y.prototype.writeUintLE = y.prototype.writeUIntLE =
                  function (i, u, c, g) {
                    (i = +i),
                      (u >>>= 0),
                      (c >>>= 0),
                      !g && G(this, i, u, c, Math.pow(2, 8 * c) - 1, 0);
                    let d = 1,
                      o = 0;
                    for (this[u] = 255 & i; ++o < c && (d *= 256); )
                      this[u + o] = (i / d) & 255;
                    return u + c;
                  }),
                (y.prototype.writeUintBE = y.prototype.writeUIntBE =
                  function (i, u, c, g) {
                    (i = +i),
                      (u >>>= 0),
                      (c >>>= 0),
                      !g && G(this, i, u, c, Math.pow(2, 8 * c) - 1, 0);
                    let d = c - 1,
                      o = 1;
                    for (this[u + d] = 255 & i; --d >= 0 && (o *= 256); )
                      this[u + d] = (i / o) & 255;
                    return u + c;
                  }),
                (y.prototype.writeUint8 = y.prototype.writeUInt8 =
                  function (i, u, c) {
                    return (
                      (i = +i),
                      (u >>>= 0),
                      c || G(this, i, u, 1, 255, 0),
                      (this[u] = 255 & i),
                      u + 1
                    );
                  }),
                (y.prototype.writeUint16LE = y.prototype.writeUInt16LE =
                  function (i, u, c) {
                    return (
                      (i = +i),
                      (u >>>= 0),
                      c || G(this, i, u, 2, 65535, 0),
                      (this[u] = 255 & i),
                      (this[u + 1] = i >>> 8),
                      u + 2
                    );
                  }),
                (y.prototype.writeUint16BE = y.prototype.writeUInt16BE =
                  function (i, u, c) {
                    return (
                      (i = +i),
                      (u >>>= 0),
                      c || G(this, i, u, 2, 65535, 0),
                      (this[u] = i >>> 8),
                      (this[u + 1] = 255 & i),
                      u + 2
                    );
                  }),
                (y.prototype.writeUint32LE = y.prototype.writeUInt32LE =
                  function (i, u, c) {
                    return (
                      (i = +i),
                      (u >>>= 0),
                      c || G(this, i, u, 4, 4294967295, 0),
                      (this[u + 3] = i >>> 24),
                      (this[u + 2] = i >>> 16),
                      (this[u + 1] = i >>> 8),
                      (this[u] = 255 & i),
                      u + 4
                    );
                  }),
                (y.prototype.writeUint32BE = y.prototype.writeUInt32BE =
                  function (i, u, c) {
                    return (
                      (i = +i),
                      (u >>>= 0),
                      c || G(this, i, u, 4, 4294967295, 0),
                      (this[u] = i >>> 24),
                      (this[u + 1] = i >>> 16),
                      (this[u + 2] = i >>> 8),
                      (this[u + 3] = 255 & i),
                      u + 4
                    );
                  }),
                (y.prototype.writeBigUInt64LE = le(function (i, u = 0) {
                  return ct(
                    this,
                    i,
                    u,
                    BigInt(0),
                    BigInt("0xffffffffffffffff")
                  );
                })),
                (y.prototype.writeBigUInt64BE = le(function (i, u = 0) {
                  return Rt(
                    this,
                    i,
                    u,
                    BigInt(0),
                    BigInt("0xffffffffffffffff")
                  );
                })),
                (y.prototype.writeIntLE = function (i, u, c, g) {
                  if (((i = +i), (u >>>= 0), !g)) {
                    const w = Math.pow(2, 8 * c - 1);
                    G(this, i, u, c, w - 1, -w);
                  }
                  let d = 0,
                    o = 1,
                    l = 0;
                  for (this[u] = 255 & i; ++d < c && (o *= 256); )
                    i < 0 && l === 0 && this[u + d - 1] !== 0 && (l = 1),
                      (this[u + d] = (((i / o) >> 0) - l) & 255);
                  return u + c;
                }),
                (y.prototype.writeIntBE = function (i, u, c, g) {
                  if (((i = +i), (u >>>= 0), !g)) {
                    const w = Math.pow(2, 8 * c - 1);
                    G(this, i, u, c, w - 1, -w);
                  }
                  let d = c - 1,
                    o = 1,
                    l = 0;
                  for (this[u + d] = 255 & i; --d >= 0 && (o *= 256); )
                    i < 0 && l === 0 && this[u + d + 1] !== 0 && (l = 1),
                      (this[u + d] = (((i / o) >> 0) - l) & 255);
                  return u + c;
                }),
                (y.prototype.writeInt8 = function (i, u, c) {
                  return (
                    (i = +i),
                    (u >>>= 0),
                    c || G(this, i, u, 1, 127, -128),
                    i < 0 && (i = 255 + i + 1),
                    (this[u] = 255 & i),
                    u + 1
                  );
                }),
                (y.prototype.writeInt16LE = function (i, u, c) {
                  return (
                    (i = +i),
                    (u >>>= 0),
                    c || G(this, i, u, 2, 32767, -32768),
                    (this[u] = 255 & i),
                    (this[u + 1] = i >>> 8),
                    u + 2
                  );
                }),
                (y.prototype.writeInt16BE = function (i, u, c) {
                  return (
                    (i = +i),
                    (u >>>= 0),
                    c || G(this, i, u, 2, 32767, -32768),
                    (this[u] = i >>> 8),
                    (this[u + 1] = 255 & i),
                    u + 2
                  );
                }),
                (y.prototype.writeInt32LE = function (i, u, c) {
                  return (
                    (i = +i),
                    (u >>>= 0),
                    c || G(this, i, u, 4, 2147483647, -2147483648),
                    (this[u] = 255 & i),
                    (this[u + 1] = i >>> 8),
                    (this[u + 2] = i >>> 16),
                    (this[u + 3] = i >>> 24),
                    u + 4
                  );
                }),
                (y.prototype.writeInt32BE = function (i, u, c) {
                  return (
                    (i = +i),
                    (u >>>= 0),
                    c || G(this, i, u, 4, 2147483647, -2147483648),
                    i < 0 && (i = 4294967295 + i + 1),
                    (this[u] = i >>> 24),
                    (this[u + 1] = i >>> 16),
                    (this[u + 2] = i >>> 8),
                    (this[u + 3] = 255 & i),
                    u + 4
                  );
                }),
                (y.prototype.writeBigInt64LE = le(function (i, u = 0) {
                  return ct(
                    this,
                    i,
                    u,
                    -BigInt("0x8000000000000000"),
                    BigInt("0x7fffffffffffffff")
                  );
                })),
                (y.prototype.writeBigInt64BE = le(function (i, u = 0) {
                  return Rt(
                    this,
                    i,
                    u,
                    -BigInt("0x8000000000000000"),
                    BigInt("0x7fffffffffffffff")
                  );
                })),
                (y.prototype.writeFloatLE = function (i, u, c) {
                  return Pt(this, i, u, !0, c);
                }),
                (y.prototype.writeFloatBE = function (i, u, c) {
                  return Pt(this, i, u, !1, c);
                }),
                (y.prototype.writeDoubleLE = function (i, u, c) {
                  return dr(this, i, u, !0, c);
                }),
                (y.prototype.writeDoubleBE = function (i, u, c) {
                  return dr(this, i, u, !1, c);
                }),
                (y.prototype.copy = function (i, u, c, g) {
                  if (!y.isBuffer(i))
                    throw new TypeError("argument should be a Buffer");
                  if (
                    (c || (c = 0),
                    g || g === 0 || (g = this.length),
                    u >= i.length && (u = i.length),
                    u || (u = 0),
                    g > 0 && g < c && (g = c),
                    g === c || i.length === 0 || this.length === 0)
                  )
                    return 0;
                  if (u < 0) throw new RangeError("targetStart out of bounds");
                  if (c < 0 || c >= this.length)
                    throw new RangeError("Index out of range");
                  if (g < 0) throw new RangeError("sourceEnd out of bounds");
                  g > this.length && (g = this.length),
                    i.length - u < g - c && (g = i.length - u + c);
                  const d = g - c;
                  return (
                    this === i &&
                    typeof Uint8Array.prototype.copyWithin == "function"
                      ? this.copyWithin(u, c, g)
                      : Uint8Array.prototype.set.call(
                          i,
                          this.subarray(c, g),
                          u
                        ),
                    d
                  );
                }),
                (y.prototype.fill = function (i, u, c, g) {
                  if (typeof i == "string") {
                    if (
                      (typeof u == "string"
                        ? ((g = u), (u = 0), (c = this.length))
                        : typeof c == "string" && ((g = c), (c = this.length)),
                      g !== void 0 && typeof g != "string")
                    )
                      throw new TypeError("encoding must be a string");
                    if (typeof g == "string" && !y.isEncoding(g))
                      throw new TypeError("Unknown encoding: " + g);
                    if (i.length === 1) {
                      const o = i.charCodeAt(0);
                      ((g === "utf8" && o < 128) || g === "latin1") && (i = o);
                    }
                  } else
                    typeof i == "number"
                      ? (i &= 255)
                      : typeof i == "boolean" && (i = Number(i));
                  if (u < 0 || this.length < u || this.length < c)
                    throw new RangeError("Out of range index");
                  if (c <= u) return this;
                  let d;
                  if (
                    ((u >>>= 0),
                    (c = c === void 0 ? this.length : c >>> 0),
                    i || (i = 0),
                    typeof i == "number")
                  )
                    for (d = u; d < c; ++d) this[d] = i;
                  else {
                    const o = y.isBuffer(i) ? i : y.from(i, g),
                      l = o.length;
                    if (l === 0)
                      throw new TypeError(
                        'The value "' + i + '" is invalid for argument "value"'
                      );
                    for (d = 0; d < c - u; ++d) this[d + u] = o[d % l];
                  }
                  return this;
                });
              const Se = {};
              function ft(i, u, c) {
                Se[i] = class extends c {
                  constructor() {
                    super(),
                      Object.defineProperty(this, "message", {
                        value: u.apply(this, arguments),
                        writable: !0,
                        configurable: !0,
                      }),
                      (this.name = `${this.name} [${i}]`),
                      this.stack,
                      delete this.name;
                  }
                  get code() {
                    return i;
                  }
                  set code(g) {
                    Object.defineProperty(this, "code", {
                      configurable: !0,
                      enumerable: !0,
                      value: g,
                      writable: !0,
                    });
                  }
                  toString() {
                    return `${this.name} [${i}]: ${this.message}`;
                  }
                };
              }
              function Ft(i) {
                let u = "",
                  c = i.length;
                const g = i[0] === "-" ? 1 : 0;
                for (; c >= g + 4; c -= 3) u = `_${i.slice(c - 3, c)}${u}`;
                return `${i.slice(0, c)}${u}`;
              }
              function Ut(i, u, c, g, d, o) {
                if (i > c || i < u) {
                  const l = typeof u == "bigint" ? "n" : "";
                  let w;
                  throw (
                    ((w =
                      o > 3
                        ? u === 0 || u === BigInt(0)
                          ? `>= 0${l} and < 2${l} ** ${8 * (o + 1)}${l}`
                          : `>= -(2${l} ** ${8 * (o + 1) - 1}${l}) and < 2 ** ${
                              8 * (o + 1) - 1
                            }${l}`
                        : `>= ${u}${l} and <= ${c}${l}`),
                    new Se.ERR_OUT_OF_RANGE("value", w, i))
                  );
                }
                (function (l, w, A) {
                  J(w, "offset"),
                    (l[w] !== void 0 && l[w + A] !== void 0) ||
                      _e(w, l.length - (A + 1));
                })(g, d, o);
              }
              function J(i, u) {
                if (typeof i != "number")
                  throw new Se.ERR_INVALID_ARG_TYPE(u, "number", i);
              }
              function _e(i, u, c) {
                throw Math.floor(i) !== i
                  ? (J(i, c),
                    new Se.ERR_OUT_OF_RANGE(c || "offset", "an integer", i))
                  : u < 0
                  ? new Se.ERR_BUFFER_OUT_OF_BOUNDS()
                  : new Se.ERR_OUT_OF_RANGE(
                      c || "offset",
                      `>= ${c ? 1 : 0} and <= ${u}`,
                      i
                    );
              }
              ft(
                "ERR_BUFFER_OUT_OF_BOUNDS",
                function (i) {
                  return i
                    ? `${i} is outside of buffer bounds`
                    : "Attempt to access memory outside buffer bounds";
                },
                RangeError
              ),
                ft(
                  "ERR_INVALID_ARG_TYPE",
                  function (i, u) {
                    return `The "${i}" argument must be of type number. Received type ${typeof u}`;
                  },
                  TypeError
                ),
                ft(
                  "ERR_OUT_OF_RANGE",
                  function (i, u, c) {
                    let g = `The value of "${i}" is out of range.`,
                      d = c;
                    return (
                      Number.isInteger(c) && Math.abs(c) > 4294967296
                        ? (d = Ft(String(c)))
                        : typeof c == "bigint" &&
                          ((d = String(c)),
                          (c > BigInt(2) ** BigInt(32) ||
                            c < -(BigInt(2) ** BigInt(32))) &&
                            (d = Ft(d)),
                          (d += "n")),
                      (g += ` It must be ${u}. Received ${d}`),
                      g
                    );
                  },
                  RangeError
                );
              const ee = /[^+/0-9A-Za-z-_]/g;
              function Fe(i, u) {
                let c;
                u = u || 1 / 0;
                const g = i.length;
                let d = null;
                const o = [];
                for (let l = 0; l < g; ++l) {
                  if (((c = i.charCodeAt(l)), c > 55295 && c < 57344)) {
                    if (!d) {
                      if (c > 56319) {
                        (u -= 3) > -1 && o.push(239, 191, 189);
                        continue;
                      }
                      if (l + 1 === g) {
                        (u -= 3) > -1 && o.push(239, 191, 189);
                        continue;
                      }
                      d = c;
                      continue;
                    }
                    if (c < 56320) {
                      (u -= 3) > -1 && o.push(239, 191, 189), (d = c);
                      continue;
                    }
                    c = 65536 + (((d - 55296) << 10) | (c - 56320));
                  } else d && (u -= 3) > -1 && o.push(239, 191, 189);
                  if (((d = null), c < 128)) {
                    if ((u -= 1) < 0) break;
                    o.push(c);
                  } else if (c < 2048) {
                    if ((u -= 2) < 0) break;
                    o.push((c >> 6) | 192, (63 & c) | 128);
                  } else if (c < 65536) {
                    if ((u -= 3) < 0) break;
                    o.push(
                      (c >> 12) | 224,
                      ((c >> 6) & 63) | 128,
                      (63 & c) | 128
                    );
                  } else {
                    if (!(c < 1114112)) throw new Error("Invalid code point");
                    if ((u -= 4) < 0) break;
                    o.push(
                      (c >> 18) | 240,
                      ((c >> 12) & 63) | 128,
                      ((c >> 6) & 63) | 128,
                      (63 & c) | 128
                    );
                  }
                }
                return o;
              }
              function yr(i) {
                return h.toByteArray(
                  (function (u) {
                    if (
                      (u = (u = u.split("=")[0]).trim().replace(ee, ""))
                        .length < 2
                    )
                      return "";
                    for (; u.length % 4 != 0; ) u += "=";
                    return u;
                  })(i)
                );
              }
              function Ie(i, u, c, g) {
                let d;
                for (d = 0; d < g && !(d + c >= u.length || d >= i.length); ++d)
                  u[d + c] = i[d];
                return d;
              }
              function fe(i, u) {
                return (
                  i instanceof u ||
                  (i != null &&
                    i.constructor != null &&
                    i.constructor.name != null &&
                    i.constructor.name === u.name)
                );
              }
              function lt(i) {
                return i != i;
              }
              const En = (function () {
                const i = "0123456789abcdef",
                  u = new Array(256);
                for (let c = 0; c < 16; ++c) {
                  const g = 16 * c;
                  for (let d = 0; d < 16; ++d) u[g + d] = i[c] + i[d];
                }
                return u;
              })();
              function le(i) {
                return typeof BigInt > "u" ? We : i;
              }
              function We() {
                throw new Error("BigInt not supported");
              }
            },
            645: (s, f) => {
              (f.read = function (p, h, m, v, _) {
                var b,
                  y,
                  x = 8 * _ - v - 1,
                  I = (1 << x) - 1,
                  $ = I >> 1,
                  S = -7,
                  B = m ? _ - 1 : 0,
                  R = m ? -1 : 1,
                  T = p[h + B];
                for (
                  B += R, b = T & ((1 << -S) - 1), T >>= -S, S += x;
                  S > 0;
                  b = 256 * b + p[h + B], B += R, S -= 8
                );
                for (
                  y = b & ((1 << -S) - 1), b >>= -S, S += v;
                  S > 0;
                  y = 256 * y + p[h + B], B += R, S -= 8
                );
                if (b === 0) b = 1 - $;
                else {
                  if (b === I) return y ? NaN : (1 / 0) * (T ? -1 : 1);
                  (y += Math.pow(2, v)), (b -= $);
                }
                return (T ? -1 : 1) * y * Math.pow(2, b - v);
              }),
                (f.write = function (p, h, m, v, _, b) {
                  var y,
                    x,
                    I,
                    $ = 8 * b - _ - 1,
                    S = (1 << $) - 1,
                    B = S >> 1,
                    R = _ === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    T = v ? 0 : b - 1,
                    D = v ? 1 : -1,
                    M = h < 0 || (h === 0 && 1 / h < 0) ? 1 : 0;
                  for (
                    h = Math.abs(h),
                      isNaN(h) || h === 1 / 0
                        ? ((x = isNaN(h) ? 1 : 0), (y = S))
                        : ((y = Math.floor(Math.log(h) / Math.LN2)),
                          h * (I = Math.pow(2, -y)) < 1 && (y--, (I *= 2)),
                          (h += y + B >= 1 ? R / I : R * Math.pow(2, 1 - B)) *
                            I >=
                            2 && (y++, (I /= 2)),
                          y + B >= S
                            ? ((x = 0), (y = S))
                            : y + B >= 1
                            ? ((x = (h * I - 1) * Math.pow(2, _)), (y += B))
                            : ((x = h * Math.pow(2, B - 1) * Math.pow(2, _)),
                              (y = 0)));
                    _ >= 8;
                    p[m + T] = 255 & x, T += D, x /= 256, _ -= 8
                  );
                  for (
                    y = (y << _) | x, $ += _;
                    $ > 0;
                    p[m + T] = 255 & y, T += D, y /= 256, $ -= 8
                  );
                  p[m + T - D] |= 128 * M;
                });
            },
          },
          n = {};
        function a(s) {
          var f = n[s];
          if (f !== void 0) return f.exports;
          var p = (n[s] = { exports: {} });
          return r[s](p, p.exports, a), p.exports;
        }
        return (
          (a.d = (s, f) => {
            for (var p in f)
              a.o(f, p) &&
                !a.o(s, p) &&
                Object.defineProperty(s, p, { enumerable: !0, get: f[p] });
          }),
          (a.g = (function () {
            if (typeof globalThis == "object") return globalThis;
            try {
              return this || new Function("return this")();
            } catch {
              if (typeof window == "object") return window;
            }
          })()),
          (a.o = (s, f) => Object.prototype.hasOwnProperty.call(s, f)),
          (a.r = (s) => {
            typeof Symbol < "u" &&
              Symbol.toStringTag &&
              Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(s, "__esModule", { value: !0 });
          }),
          a(899)
        );
      })()
    );
  })(vo);
  function _l(t) {
    const e = {
        variantId: xe.Uint64.fromString(t.variantId.toString()),
        version: t.version || Math.floor(Date.now() / 1e3),
        items: t.items.map(
          (n) =>
            new xe.BundleItem({
              collectionId: xe.Uint64.fromString(n.collectionId.toString()),
              productId: xe.Uint64.fromString(n.productId.toString()),
              variantId: xe.Uint64.fromString(n.variantId.toString()),
              sku: n.sku || "",
              quantity: n.quantity,
              ext: new xe.BundleItemExt(0),
            })
        ),
        ext: new xe.BundleExt(0),
      },
      r = new xe.Bundle(e);
    return xe.BundleEnvelope.envelopeTypeBundle(r).toXDR("base64");
  }
  const xe = vo.exports.config((t) => {
      t.enum("EnvelopeType", { envelopeTypeBundle: 0 }),
        t.typedef("Uint32", t.uint()),
        t.typedef("Uint64", t.uhyper()),
        t.union("BundleItemExt", {
          switchOn: t.int(),
          switchName: "v",
          switches: [[0, t.void()]],
          arms: {},
        }),
        t.struct("BundleItem", [
          ["collectionId", t.lookup("Uint64")],
          ["productId", t.lookup("Uint64")],
          ["variantId", t.lookup("Uint64")],
          ["sku", t.string()],
          ["quantity", t.lookup("Uint32")],
          ["ext", t.lookup("BundleItemExt")],
        ]),
        t.union("BundleExt", {
          switchOn: t.int(),
          switchName: "v",
          switches: [[0, t.void()]],
          arms: {},
        }),
        t.struct("Bundle", [
          ["variantId", t.lookup("Uint64")],
          ["items", t.varArray(t.lookup("BundleItem"), 500)],
          ["version", t.lookup("Uint32")],
          ["ext", t.lookup("BundleExt")],
        ]),
        t.union("BundleEnvelope", {
          switchOn: t.lookup("EnvelopeType"),
          switchName: "type",
          switches: [["envelopeTypeBundle", "v1"]],
          arms: { v1: t.lookup("Bundle") },
        });
    }),
    _o = "/bundling-storefront-manager";
  function bl() {
    return Math.ceil(Date.now() / 1e3);
  }
  async function El() {
    try {
      const { timestamp: t } = await xt("get", `${_o}/t`, {
        headers: { "X-Recharge-App": "storefront-client" },
      });
      return t;
    } catch (t) {
      return console.error(`Fetch failed: ${t}. Using client-side date.`), bl();
    }
  }
  async function Al(t) {
    const e = ve(),
      r = await bo(t);
    if (r !== !0) throw new Error(r);
    const n = await El(),
      a = _l({
        variantId: t.externalVariantId,
        version: n,
        items: t.selections.map((s) => ({
          collectionId: s.collectionId,
          productId: s.externalProductId,
          variantId: s.externalVariantId,
          quantity: s.quantity,
          sku: "",
        })),
      });
    try {
      const s = await xt("post", `${_o}/api/v1/bundles`, {
        data: { bundle: a },
        headers: { Origin: `https://${e.storeIdentifier}` },
      });
      if (!s.id || s.code !== 200)
        throw new Error(`1: failed generating rb_id: ${JSON.stringify(s)}`);
      return s.id;
    } catch (s) {
      throw new Error(`2: failed generating rb_id ${s}`);
    }
  }
  function xl(t, e) {
    const r = Eo(t);
    if (r !== !0) throw new Error(`Dynamic Bundle is invalid. ${r}`);
    const n = `${Dc(9)}:${t.externalProductId}`;
    return t.selections.map((a) => {
      const s = {
        id: a.externalVariantId,
        quantity: a.quantity,
        properties: {
          _rc_bundle: n,
          _rc_bundle_variant: t.externalVariantId,
          _rc_bundle_parent: e,
          _rc_bundle_collection_id: a.collectionId,
        },
      };
      return (
        a.sellingPlan
          ? (s.selling_plan = a.sellingPlan)
          : a.shippingIntervalFrequency &&
            ((s.properties.shipping_interval_frequency =
              a.shippingIntervalFrequency),
            (s.properties.shipping_interval_unit_type =
              a.shippingIntervalUnitType),
            (s.id = `${a.discountedVariantId}`)),
        s
      );
    });
  }
  async function bo(t) {
    try {
      return t
        ? (await mo(t.externalProductId))
          ? !0
          : "Bundle settings do not exist for the given product"
        : "Bundle is not defined";
    } catch (e) {
      return `Error fetching bundle settings: ${e}`;
    }
  }
  const Sl = {
    day: ["day", "days", "Days"],
    days: ["day", "days", "Days"],
    Days: ["day", "days", "Days"],
    week: ["week", "weeks", "Weeks"],
    weeks: ["week", "weeks", "Weeks"],
    Weeks: ["week", "weeks", "Weeks"],
    month: ["month", "months", "Months"],
    months: ["month", "months", "Months"],
    Months: ["month", "months", "Months"],
  };
  function Eo(t) {
    if (!t) return "No bundle defined.";
    if (t.selections.length === 0) return "No selections defined.";
    const { shippingIntervalFrequency: e, shippingIntervalUnitType: r } =
      t.selections.find(
        (n) => n.shippingIntervalFrequency || n.shippingIntervalUnitType
      ) || {};
    if (e || r) {
      if (!e || !r) return "Shipping intervals do not match on selections.";
      {
        const n = Sl[r];
        for (let a = 0; a < t.selections.length; a++) {
          const { shippingIntervalFrequency: s, shippingIntervalUnitType: f } =
            t.selections[a];
          if ((s && s !== e) || (f && !n.includes(f)))
            return "Shipping intervals do not match on selections.";
        }
      }
    }
    return !0;
  }
  async function Il(t, e) {
    const { bundle_selection: r } = await O(
      "get",
      "/bundle_selections",
      { id: e },
      t
    );
    return r;
  }
  function Bl(t, e) {
    return O("get", "/bundle_selections", { query: e }, t);
  }
  async function Ol(t, e) {
    const { bundle_selection: r } = await O(
      "post",
      "/bundle_selections",
      { data: e },
      t
    );
    return r;
  }
  async function $l(t, e, r) {
    const { bundle_selection: n } = await O(
      "put",
      "/bundle_selections",
      { id: e, data: r },
      t
    );
    return n;
  }
  function Tl(t, e) {
    return O("delete", "/bundle_selections", { id: e }, t);
  }
  async function Rl(t, e, r, n) {
    const { subscription: a } = await O(
      "put",
      "/bundles",
      { id: e, data: r, query: n },
      t
    );
    return a;
  }
  var Pl = Object.freeze({
    __proto__: null,
    getBundleId: Al,
    getDynamicBundleItems: xl,
    validateBundle: bo,
    validateDynamicBundle: Eo,
    getBundleSelection: Il,
    listBundleSelections: Bl,
    createBundleSelection: Ol,
    updateBundleSelection: $l,
    deleteBundleSelection: Tl,
    updateBundle: Rl,
  });
  async function Fl(t, e, r) {
    const { charge: n } = await O(
      "get",
      "/charges",
      { id: e, query: { include: r?.include } },
      t
    );
    return n;
  }
  function Ul(t, e) {
    return O("get", "/charges", { query: e }, t);
  }
  async function Cl(t, e, r) {
    const { charge: n } = await O(
      "post",
      `/charges/${e}/apply_discount`,
      { data: { discount_code: r } },
      t
    );
    return n;
  }
  async function Dl(t, e) {
    const { charge: r } = await O(
      "post",
      `/charges/${e}/remove_discount`,
      {},
      t
    );
    return r;
  }
  async function Nl(t, e, r) {
    const { charge: n } = await O(
      "post",
      `/charges/${e}/skip`,
      { data: { purchase_item_ids: r.map((a) => Number(a)) } },
      t
    );
    return n;
  }
  async function Ml(t, e, r) {
    const { charge: n } = await O(
      "post",
      `/charges/${e}/unskip`,
      { data: { purchase_item_ids: r.map((a) => Number(a)) } },
      t
    );
    return n;
  }
  async function Ll(t, e) {
    const { charge: r } = await O("post", `/charges/${e}/process`, {}, t);
    return r;
  }
  var kl = Object.freeze({
    __proto__: null,
    getCharge: Fl,
    listCharges: Ul,
    applyDiscountToCharge: Cl,
    removeDiscountsFromCharge: Dl,
    skipCharge: Nl,
    unskipCharge: Ml,
    processCharge: Ll,
  });
  async function jl(t, e) {
    const { membership: r } = await O("get", "/memberships", { id: e }, t);
    return r;
  }
  function ql(t, e) {
    return O("get", "/memberships", { query: e }, t);
  }
  async function Vl(t, e, r) {
    const { membership: n } = await O(
      "post",
      `/memberships/${e}/cancel`,
      { data: r },
      t
    );
    return n;
  }
  async function zl(t, e, r) {
    const { membership: n } = await O(
      "post",
      `/memberships/${e}/activate`,
      { data: r },
      t
    );
    return n;
  }
  async function Gl(t, e, r) {
    const { membership: n } = await O(
      "post",
      `/memberships/${e}/change`,
      { data: r },
      t
    );
    return n;
  }
  var Wl = Object.freeze({
    __proto__: null,
    getMembership: jl,
    listMemberships: ql,
    cancelMembership: Vl,
    activateMembership: zl,
    changeMembership: Gl,
  });
  async function Hl(t, e, r) {
    const { membership_program: n } = await O(
      "get",
      "/membership_programs",
      { id: e, query: { include: r?.include } },
      t
    );
    return n;
  }
  function Yl(t, e) {
    return O("get", "/membership_programs", { query: e }, t);
  }
  var Xl = Object.freeze({
    __proto__: null,
    getMembershipProgram: Hl,
    listMembershipPrograms: Yl,
  });
  async function Jl(t, e) {
    const { metafield: r } = await O(
      "post",
      "/metafields",
      { data: { metafield: e } },
      t
    );
    return r;
  }
  async function Kl(t, e, r) {
    const { metafield: n } = await O(
      "put",
      "/metafields",
      { id: e, data: { metafield: r } },
      t
    );
    return n;
  }
  function Ql(t, e) {
    return O("delete", "/metafields", { id: e }, t);
  }
  var Zl = Object.freeze({
    __proto__: null,
    createMetafield: Jl,
    updateMetafield: Kl,
    deleteMetafield: Ql,
  });
  async function ep(t, e) {
    const { onetime: r } = await O("get", "/onetimes", { id: e }, t);
    return r;
  }
  function tp(t, e) {
    return O("get", "/onetimes", { query: e }, t);
  }
  async function rp(t, e) {
    const { onetime: r } = await O("post", "/onetimes", { data: e }, t);
    return r;
  }
  async function np(t, e, r) {
    const { onetime: n } = await O("put", "/onetimes", { id: e, data: r }, t);
    return n;
  }
  function ip(t, e) {
    return O("delete", "/onetimes", { id: e }, t);
  }
  var op = Object.freeze({
    __proto__: null,
    getOnetime: ep,
    listOnetimes: tp,
    createOnetime: rp,
    updateOnetime: np,
    deleteOnetime: ip,
  });
  async function ap(t, e) {
    const { order: r } = await O("get", "/orders", { id: e }, t);
    return r;
  }
  function sp(t, e) {
    return O("get", "/orders", { query: e }, t);
  }
  var up = Object.freeze({ __proto__: null, getOrder: ap, listOrders: sp });
  async function cp(t, e, r) {
    const { payment_method: n } = await O(
      "get",
      "/payment_methods",
      { id: e, query: { include: r?.include } },
      t
    );
    return n;
  }
  async function fp(t, e, r) {
    const { payment_method: n } = await O(
      "put",
      "/payment_methods",
      { id: e, data: r },
      t
    );
    return n;
  }
  function lp(t, e) {
    return O("get", "/payment_methods", { query: e }, t);
  }
  var pp = Object.freeze({
    __proto__: null,
    getPaymentMethod: cp,
    updatePaymentMethod: fp,
    listPaymentMethods: lp,
  });
  async function hp(t, e) {
    const { plan: r } = await O("get", "/plans", { id: e }, t);
    return r;
  }
  function dp(t, e) {
    return O("get", "/plans", { query: e }, t);
  }
  var yp = Object.freeze({ __proto__: null, getPlan: hp, listPlans: dp });
  async function gp(t, e) {
    if (!["2020-12", "2022-06"].includes(e.format_version))
      throw new Error("Missing or unsupported format_version.");
    return O(
      "get",
      "/product_search",
      { query: e, headers: { "X-Recharge-Version": "2021-01" } },
      t
    );
  }
  var mp = Object.freeze({ __proto__: null, productSearch: gp }),
    wp = "Expected a function",
    Ao = "__lodash_placeholder__",
    ze = 1,
    lr = 2,
    vp = 4,
    ot = 8,
    Bt = 16,
    Ge = 32,
    Ot = 64,
    xo = 128,
    _p = 256,
    So = 512,
    Io = 1 / 0,
    bp = 9007199254740991,
    Ep = 17976931348623157e292,
    Bo = 0 / 0,
    Ap = [
      ["ary", xo],
      ["bind", ze],
      ["bindKey", lr],
      ["curry", ot],
      ["curryRight", Bt],
      ["flip", So],
      ["partial", Ge],
      ["partialRight", Ot],
      ["rearg", _p],
    ],
    xp = "[object Function]",
    Sp = "[object GeneratorFunction]",
    Ip = "[object Symbol]",
    Bp = /[\\^$.*+?()[\]{}|]/g,
    Op = /^\s+|\s+$/g,
    $p = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
    Tp = /\{\n\/\* \[wrapped with (.+)\] \*/,
    Rp = /,? & /,
    Pp = /^[-+]0x[0-9a-f]+$/i,
    Fp = /^0b[01]+$/i,
    Up = /^\[object .+?Constructor\]$/,
    Cp = /^0o[0-7]+$/i,
    Dp = /^(?:0|[1-9]\d*)$/,
    Np = parseInt,
    Mp = typeof oe == "object" && oe && oe.Object === Object && oe,
    Lp = typeof self == "object" && self && self.Object === Object && self,
    $t = Mp || Lp || Function("return this")();
  function gn(t, e, r) {
    switch (r.length) {
      case 0:
        return t.call(e);
      case 1:
        return t.call(e, r[0]);
      case 2:
        return t.call(e, r[0], r[1]);
      case 3:
        return t.call(e, r[0], r[1], r[2]);
    }
    return t.apply(e, r);
  }
  function kp(t, e) {
    for (var r = -1, n = t ? t.length : 0; ++r < n && e(t[r], r, t) !== !1; );
    return t;
  }
  function jp(t, e) {
    var r = t ? t.length : 0;
    return !!r && Vp(t, e, 0) > -1;
  }
  function qp(t, e, r, n) {
    for (var a = t.length, s = r + (n ? 1 : -1); n ? s-- : ++s < a; )
      if (e(t[s], s, t)) return s;
    return -1;
  }
  function Vp(t, e, r) {
    if (e !== e) return qp(t, zp, r);
    for (var n = r - 1, a = t.length; ++n < a; ) if (t[n] === e) return n;
    return -1;
  }
  function zp(t) {
    return t !== t;
  }
  function Gp(t, e) {
    for (var r = t.length, n = 0; r--; ) t[r] === e && n++;
    return n;
  }
  function Wp(t, e) {
    return t?.[e];
  }
  function Hp(t) {
    var e = !1;
    if (t != null && typeof t.toString != "function")
      try {
        e = !!(t + "");
      } catch {}
    return e;
  }
  function mn(t, e) {
    for (var r = -1, n = t.length, a = 0, s = []; ++r < n; ) {
      var f = t[r];
      (f === e || f === Ao) && ((t[r] = Ao), (s[a++] = r));
    }
    return s;
  }
  var Yp = Function.prototype,
    Oo = Object.prototype,
    wn = $t["__core-js_shared__"],
    $o = (function () {
      var t = /[^.]+$/.exec((wn && wn.keys && wn.keys.IE_PROTO) || "");
      return t ? "Symbol(src)_1." + t : "";
    })(),
    To = Yp.toString,
    Xp = Oo.hasOwnProperty,
    Ro = Oo.toString,
    Jp = RegExp(
      "^" +
        To.call(Xp)
          .replace(Bp, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    ),
    Kp = Object.create,
    at = Math.max,
    Qp = Math.min,
    Po = (function () {
      var t = Uo(Object, "defineProperty"),
        e = Uo.name;
      return e && e.length > 2 ? t : void 0;
    })();
  function Zp(t) {
    return st(t) ? Kp(t) : {};
  }
  function eh(t) {
    if (!st(t) || ph(t)) return !1;
    var e = gh(t) || Hp(t) ? Jp : Up;
    return e.test(dh(t));
  }
  function th(t, e) {
    return (
      (e = at(e === void 0 ? t.length - 1 : e, 0)),
      function () {
        for (
          var r = arguments, n = -1, a = at(r.length - e, 0), s = Array(a);
          ++n < a;

        )
          s[n] = r[e + n];
        n = -1;
        for (var f = Array(e + 1); ++n < e; ) f[n] = r[n];
        return (f[e] = s), gn(t, this, f);
      }
    );
  }
  function rh(t, e, r, n) {
    for (
      var a = -1,
        s = t.length,
        f = r.length,
        p = -1,
        h = e.length,
        m = at(s - f, 0),
        v = Array(h + m),
        _ = !n;
      ++p < h;

    )
      v[p] = e[p];
    for (; ++a < f; ) (_ || a < s) && (v[r[a]] = t[a]);
    for (; m--; ) v[p++] = t[a++];
    return v;
  }
  function nh(t, e, r, n) {
    for (
      var a = -1,
        s = t.length,
        f = -1,
        p = r.length,
        h = -1,
        m = e.length,
        v = at(s - p, 0),
        _ = Array(v + m),
        b = !n;
      ++a < v;

    )
      _[a] = t[a];
    for (var y = a; ++h < m; ) _[y + h] = e[h];
    for (; ++f < p; ) (b || a < s) && (_[y + r[f]] = t[a++]);
    return _;
  }
  function ih(t, e) {
    var r = -1,
      n = t.length;
    for (e || (e = Array(n)); ++r < n; ) e[r] = t[r];
    return e;
  }
  function oh(t, e, r) {
    var n = e & ze,
      a = Tt(t);
    function s() {
      var f = this && this !== $t && this instanceof s ? a : t;
      return f.apply(n ? r : this, arguments);
    }
    return s;
  }
  function Tt(t) {
    return function () {
      var e = arguments;
      switch (e.length) {
        case 0:
          return new t();
        case 1:
          return new t(e[0]);
        case 2:
          return new t(e[0], e[1]);
        case 3:
          return new t(e[0], e[1], e[2]);
        case 4:
          return new t(e[0], e[1], e[2], e[3]);
        case 5:
          return new t(e[0], e[1], e[2], e[3], e[4]);
        case 6:
          return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
        case 7:
          return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
      }
      var r = Zp(t.prototype),
        n = t.apply(r, e);
      return st(n) ? n : r;
    };
  }
  function ah(t, e, r) {
    var n = Tt(t);
    function a() {
      for (var s = arguments.length, f = Array(s), p = s, h = _n(a); p--; )
        f[p] = arguments[p];
      var m = s < 3 && f[0] !== h && f[s - 1] !== h ? [] : mn(f, h);
      if (((s -= m.length), s < r))
        return Fo(t, e, vn, a.placeholder, void 0, f, m, void 0, void 0, r - s);
      var v = this && this !== $t && this instanceof a ? n : t;
      return gn(v, this, f);
    }
    return a;
  }
  function vn(t, e, r, n, a, s, f, p, h, m) {
    var v = e & xo,
      _ = e & ze,
      b = e & lr,
      y = e & (ot | Bt),
      x = e & So,
      I = b ? void 0 : Tt(t);
    function $() {
      for (var S = arguments.length, B = Array(S), R = S; R--; )
        B[R] = arguments[R];
      if (y)
        var T = _n($),
          D = Gp(B, T);
      if (
        (n && (B = rh(B, n, a, y)),
        s && (B = nh(B, s, f, y)),
        (S -= D),
        y && S < m)
      ) {
        var M = mn(B, T);
        return Fo(t, e, vn, $.placeholder, r, B, M, p, h, m - S);
      }
      var q = _ ? r : this,
        V = b ? q[t] : t;
      return (
        (S = B.length),
        p ? (B = hh(B, p)) : x && S > 1 && B.reverse(),
        v && h < S && (B.length = h),
        this && this !== $t && this instanceof $ && (V = I || Tt(V)),
        V.apply(q, B)
      );
    }
    return $;
  }
  function sh(t, e, r, n) {
    var a = e & ze,
      s = Tt(t);
    function f() {
      for (
        var p = -1,
          h = arguments.length,
          m = -1,
          v = n.length,
          _ = Array(v + h),
          b = this && this !== $t && this instanceof f ? s : t;
        ++m < v;

      )
        _[m] = n[m];
      for (; h--; ) _[m++] = arguments[++p];
      return gn(b, a ? r : this, _);
    }
    return f;
  }
  function Fo(t, e, r, n, a, s, f, p, h, m) {
    var v = e & ot,
      _ = v ? f : void 0,
      b = v ? void 0 : f,
      y = v ? s : void 0,
      x = v ? void 0 : s;
    (e |= v ? Ge : Ot), (e &= ~(v ? Ot : Ge)), e & vp || (e &= ~(ze | lr));
    var I = r(t, e, a, y, _, x, b, p, h, m);
    return (I.placeholder = n), Co(I, t, e);
  }
  function uh(t, e, r, n, a, s, f, p) {
    var h = e & lr;
    if (!h && typeof t != "function") throw new TypeError(wp);
    var m = n ? n.length : 0;
    if (
      (m || ((e &= ~(Ge | Ot)), (n = a = void 0)),
      (f = f === void 0 ? f : at(Do(f), 0)),
      (p = p === void 0 ? p : Do(p)),
      (m -= a ? a.length : 0),
      e & Ot)
    ) {
      var v = n,
        _ = a;
      n = a = void 0;
    }
    var b = [t, e, r, n, a, v, _, s, f, p];
    if (
      ((t = b[0]),
      (e = b[1]),
      (r = b[2]),
      (n = b[3]),
      (a = b[4]),
      (p = b[9] = b[9] == null ? (h ? 0 : t.length) : at(b[9] - m, 0)),
      !p && e & (ot | Bt) && (e &= ~(ot | Bt)),
      !e || e == ze)
    )
      var y = oh(t, e, r);
    else
      e == ot || e == Bt
        ? (y = ah(t, e, p))
        : (e == Ge || e == (ze | Ge)) && !a.length
        ? (y = sh(t, e, r, n))
        : (y = vn.apply(void 0, b));
    return Co(y, t, e);
  }
  function _n(t) {
    var e = t;
    return e.placeholder;
  }
  function Uo(t, e) {
    var r = Wp(t, e);
    return eh(r) ? r : void 0;
  }
  function ch(t) {
    var e = t.match(Tp);
    return e ? e[1].split(Rp) : [];
  }
  function fh(t, e) {
    var r = e.length,
      n = r - 1;
    return (
      (e[n] = (r > 1 ? "& " : "") + e[n]),
      (e = e.join(r > 2 ? ", " : " ")),
      t.replace(
        $p,
        `{
/* [wrapped with ` +
          e +
          `] */
`
      )
    );
  }
  function lh(t, e) {
    return (
      (e = e ?? bp),
      !!e &&
        (typeof t == "number" || Dp.test(t)) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
    );
  }
  function ph(t) {
    return !!$o && $o in t;
  }
  function hh(t, e) {
    for (var r = t.length, n = Qp(e.length, r), a = ih(t); n--; ) {
      var s = e[n];
      t[n] = lh(s, r) ? a[s] : void 0;
    }
    return t;
  }
  var Co = Po
    ? function (t, e, r) {
        var n = e + "";
        return Po(t, "toString", {
          configurable: !0,
          enumerable: !1,
          value: bh(fh(n, yh(ch(n), r))),
        });
      }
    : Eh;
  function dh(t) {
    if (t != null) {
      try {
        return To.call(t);
      } catch {}
      try {
        return t + "";
      } catch {}
    }
    return "";
  }
  function yh(t, e) {
    return (
      kp(Ap, function (r) {
        var n = "_." + r[0];
        e & r[1] && !jp(t, n) && t.push(n);
      }),
      t.sort()
    );
  }
  var bn = th(function (t, e) {
    var r = mn(e, _n(bn));
    return uh(t, Ge, void 0, e, r);
  });
  function gh(t) {
    var e = st(t) ? Ro.call(t) : "";
    return e == xp || e == Sp;
  }
  function st(t) {
    var e = typeof t;
    return !!t && (e == "object" || e == "function");
  }
  function mh(t) {
    return !!t && typeof t == "object";
  }
  function wh(t) {
    return typeof t == "symbol" || (mh(t) && Ro.call(t) == Ip);
  }
  function vh(t) {
    if (!t) return t === 0 ? t : 0;
    if (((t = _h(t)), t === Io || t === -Io)) {
      var e = t < 0 ? -1 : 1;
      return e * Ep;
    }
    return t === t ? t : 0;
  }
  function Do(t) {
    var e = vh(t),
      r = e % 1;
    return e === e ? (r ? e - r : e) : 0;
  }
  function _h(t) {
    if (typeof t == "number") return t;
    if (wh(t)) return Bo;
    if (st(t)) {
      var e = typeof t.valueOf == "function" ? t.valueOf() : t;
      t = st(e) ? e + "" : e;
    }
    if (typeof t != "string") return t === 0 ? t : +t;
    t = t.replace(Op, "");
    var r = Fp.test(t);
    return r || Cp.test(t) ? Np(t.slice(2), r ? 2 : 8) : Pp.test(t) ? Bo : +t;
  }
  function bh(t) {
    return function () {
      return t;
    };
  }
  function Eh(t) {
    return t;
  }
  bn.placeholder = {};
  var No = bn,
    Ah = Object.defineProperty,
    xh = Object.defineProperties,
    Sh = Object.getOwnPropertyDescriptors,
    Mo = Object.getOwnPropertySymbols,
    Ih = Object.prototype.hasOwnProperty,
    Bh = Object.prototype.propertyIsEnumerable,
    Lo = (t, e, r) =>
      e in t
        ? Ah(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[e] = r),
    ko = (t, e) => {
      for (var r in e || (e = {})) Ih.call(e, r) && Lo(t, r, e[r]);
      if (Mo) for (var r of Mo(e)) Bh.call(e, r) && Lo(t, r, e[r]);
      return t;
    },
    jo = (t, e) => xh(t, Sh(e));
  function Oh(t, e) {
    return jo(
      ko(
        {},
        hn(e, [
          "address_id",
          "external_variant_id",
          "external_product_id",
          "charge_interval_frequency",
          "order_interval_frequency",
          "price",
          "status",
        ])
      ),
      {
        customer_id: parseInt(t, 10),
        shopify_variant_id: e.external_variant_id.ecommerce
          ? parseInt(e.external_variant_id.ecommerce, 10)
          : void 0,
        charge_interval_frequency: `${e.charge_interval_frequency}`,
        order_interval_frequency: `${e.order_interval_frequency}`,
        status: e.status ? e.status.toUpperCase() : void 0,
      }
    );
  }
  function $h(t, e) {
    var r;
    return jo(
      ko(
        {},
        hn(e, [
          "external_variant_id",
          "external_product_id",
          "charge_interval_frequency",
          "order_interval_frequency",
          "price",
          "use_external_variant_defaults",
        ])
      ),
      {
        shopify_variant_id:
          (r = e.external_variant_id) != null && r.ecommerce
            ? parseInt(e.external_variant_id.ecommerce, 10)
            : void 0,
        charge_interval_frequency: e.charge_interval_frequency
          ? `${e.charge_interval_frequency}`
          : void 0,
        order_interval_frequency: e.order_interval_frequency
          ? `${e.order_interval_frequency}`
          : void 0,
        force_update: t,
      }
    );
  }
  function qo(t) {
    const {
      id: e,
      address_id: r,
      customer_id: n,
      analytics_data: a,
      cancellation_reason: s,
      cancellation_reason_comments: f,
      cancelled_at: p,
      charge_interval_frequency: h,
      created_at: m,
      expire_after_specific_number_of_charges: v,
      shopify_product_id: _,
      shopify_variant_id: b,
      has_queued_charges: y,
      is_prepaid: x,
      is_skippable: I,
      is_swappable: $,
      max_retries_reached: S,
      next_charge_scheduled_at: B,
      order_day_of_month: R,
      order_day_of_week: T,
      order_interval_frequency: D,
      order_interval_unit: M,
      presentment_currency: q,
      price: V,
      product_title: Y,
      properties: z,
      quantity: ne,
      sku: ae,
      sku_override: L,
      status: Z,
      updated_at: N,
      variant_title: se,
    } = t;
    return {
      id: e,
      address_id: r,
      customer_id: n,
      analytics_data: a,
      cancellation_reason: s,
      cancellation_reason_comments: f,
      cancelled_at: p,
      charge_interval_frequency: parseInt(h, 10),
      created_at: m,
      expire_after_specific_number_of_charges: v,
      external_product_id: { ecommerce: `${_}` },
      external_variant_id: { ecommerce: `${b}` },
      has_queued_charges: ao(y),
      is_prepaid: x,
      is_skippable: I,
      is_swappable: $,
      max_retries_reached: ao(S),
      next_charge_scheduled_at: B,
      order_day_of_month: R,
      order_day_of_week: T,
      order_interval_frequency: parseInt(D, 10),
      order_interval_unit: M,
      presentment_currency: q,
      price: `${V}`,
      product_title: Y ?? "",
      properties: z,
      quantity: ne,
      sku: ae,
      sku_override: L,
      status: Z.toLowerCase(),
      updated_at: N,
      variant_title: se,
    };
  }
  async function Th(t, e, r) {
    const { subscription: n } = await O(
      "get",
      "/subscriptions",
      { id: e, query: { include: r?.include } },
      t
    );
    return n;
  }
  function Rh(t, e) {
    return O("get", "/subscriptions", { query: e }, t);
  }
  async function Ph(t, e, r) {
    const { subscription: n } = await O(
      "post",
      "/subscriptions",
      { data: e, query: r },
      t
    );
    return n;
  }
  async function Fh(t, e, r, n) {
    const { subscription: a } = await O(
      "put",
      "/subscriptions",
      { id: e, data: r, query: n },
      t
    );
    return a;
  }
  async function Uh(t, e, r, n) {
    const { subscription: a } = await O(
      "post",
      `/subscriptions/${e}/set_next_charge_date`,
      { data: { date: r }, query: n },
      t
    );
    return a;
  }
  async function Ch(t, e, r) {
    const { subscription: n } = await O(
      "post",
      `/subscriptions/${e}/change_address`,
      { data: { address_id: r } },
      t
    );
    return n;
  }
  async function Dh(t, e, r, n) {
    const { subscription: a } = await O(
      "post",
      `/subscriptions/${e}/cancel`,
      { data: r, query: n },
      t
    );
    return a;
  }
  async function Nh(t, e, r) {
    const { subscription: n } = await O(
      "post",
      `/subscriptions/${e}/activate`,
      { query: r },
      t
    );
    return n;
  }
  async function Mh(t, e, r) {
    const { charge: n } = await O(
      "post",
      `/subscriptions/${e}/charges/skip`,
      { data: { date: r, subscription_id: `${e}` } },
      t
    );
    return n;
  }
  async function Lh(t, e, r) {
    const { onetimes: n } = await O(
      "post",
      "/purchase_items/skip_gift",
      { data: { purchase_item_ids: e.map(Number), recipient_address: r } },
      t
    );
    return n;
  }
  async function kh(t, e) {
    const r = e.length;
    if (r < 1 || r > 21)
      throw new Error("Number of subscriptions must be between 1 and 20.");
    const { customerId: n } = t;
    if (!n) throw new Error("No customerId in session.");
    const a = e[0].address_id;
    if (!e.every((h) => h.address_id === a))
      throw new Error("All subscriptions must have the same address_id.");
    const s = No(Oh, n),
      f = e.map(s),
      { subscriptions: p } = await O(
        "post",
        `/addresses/${a}/subscriptions-bulk`,
        {
          data: { subscriptions: f },
          headers: { "X-Recharge-Version": "2021-01" },
        },
        t
      );
    return p.map(qo);
  }
  async function jh(t, e, r, n) {
    const a = r.length;
    if (a < 1 || a > 21)
      throw new Error("Number of subscriptions must be between 1 and 20.");
    const { customerId: s } = t;
    if (!s) throw new Error("No customerId in session.");
    const f = No($h, !!(n != null && n.force_update)),
      p = r.map(f),
      { subscriptions: h } = await O(
        "put",
        `/addresses/${e}/subscriptions-bulk`,
        {
          data: { subscriptions: p },
          headers: { "X-Recharge-Version": "2021-01" },
        },
        t
      );
    return h.map(qo);
  }
  var qh = Object.freeze({
      __proto__: null,
      getSubscription: Th,
      listSubscriptions: Rh,
      createSubscription: Ph,
      updateSubscription: Fh,
      updateSubscriptionChargeDate: Uh,
      updateSubscriptionAddress: Ch,
      cancelSubscription: Dh,
      activateSubscription: Nh,
      skipSubscriptionCharge: Mh,
      skipGiftSubscriptionCharge: Lh,
      createSubscriptions: kh,
      updateSubscriptions: jh,
    }),
    Vh = Object.defineProperty,
    zh = Object.defineProperties,
    Gh = Object.getOwnPropertyDescriptors,
    Vo = Object.getOwnPropertySymbols,
    Wh = Object.prototype.hasOwnProperty,
    Hh = Object.prototype.propertyIsEnumerable,
    zo = (t, e, r) =>
      e in t
        ? Vh(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[e] = r),
    Yh = (t, e) => {
      for (var r in e || (e = {})) Wh.call(e, r) && zo(t, r, e[r]);
      if (Vo) for (var r of Vo(e)) Hh.call(e, r) && zo(t, r, e[r]);
      return t;
    },
    Xh = (t, e) => zh(t, Gh(e));
  async function Jh(t, e) {
    const r = t.customerId;
    if (!r) throw new Error("Not logged in.");
    const { customer: n } = await O(
      "get",
      "/customers",
      { id: r, query: { include: e?.include } },
      t
    );
    return n;
  }
  async function Kh(t, e) {
    const r = t.customerId;
    if (!r) throw new Error("Not logged in.");
    const { customer: n } = await O("put", "/customers", { id: r, data: e }, t);
    return n;
  }
  async function Qh(t, e) {
    const r = t.customerId;
    if (!r) throw new Error("Not logged in.");
    const { deliveries: n } = await O(
      "get",
      `/customers/${r}/delivery_schedule`,
      { query: e },
      t
    );
    return n;
  }
  async function Zh(t) {
    return await O("get", "/portal_access", {}, t);
  }
  const ed = {
    SHOPIFY_UPDATE_PAYMENT_INFO: {
      type: "email",
      template_type: "shopify_update_payment_information",
    },
  };
  async function td(t, e, r) {
    const n = t.customerId;
    if (!n) throw new Error("Not logged in.");
    const a = ed[e];
    if (!a) throw new Error("Notification not supported.");
    return O(
      "post",
      `/customers/${n}/notifications`,
      { data: Xh(Yh({}, a), { template_vars: r }) },
      t
    );
  }
  var rd = Object.freeze({
    __proto__: null,
    getCustomer: Jh,
    updateCustomer: Kh,
    getDeliverySchedule: Qh,
    getCustomerPortalAccess: Zh,
    sendCustomerNotification: td,
  });
  const nd = {
    get(t, e) {
      return ce("get", t, e);
    },
    post(t, e) {
      return ce("post", t, e);
    },
    put(t, e) {
      return ce("put", t, e);
    },
    delete(t, e) {
      return ce("delete", t, e);
    },
  };
  function id(t) {
    var e, r;
    if (t) return t;
    if ((e = window?.Shopify) != null && e.shop) return window.Shopify.shop;
    let n = window?.domain;
    if (!n) {
      const a =
        (r = location?.href.match(
          /(?:http[s]*:\/\/)*(.*?)\.(?=admin\.rechargeapps\.com)/i
        )) == null
          ? void 0
          : r[1].replace(/-sp$/, "");
      a && (n = `${a}.myshopify.com`);
    }
    if (n) return n;
    throw new Error("No storeIdentifier was passed into init.");
  }
  function od(t = {}) {
    const e = t,
      { storefrontAccessToken: r } = t;
    if (r && !r.startsWith("strfnt"))
      throw new Error(
        "Incorrect storefront access token used. See https://storefront.rechargepayments.com/client/docs/getting_started/package_setup/#initialization-- for more information."
      );
    ec({
      storeIdentifier: id(t.storeIdentifier),
      loginRetryFn: t.loginRetryFn,
      storefrontAccessToken: r,
      environment: e.environment ? e.environment : "prod",
    }),
      wo();
  }
  const Go = {
    init: od,
    api: nd,
    address: Ac,
    auth: Cc,
    bundle: Pl,
    charge: kl,
    cdn: vl,
    customer: rd,
    membership: Wl,
    membershipProgram: Xl,
    metafield: Zl,
    onetime: op,
    order: up,
    paymentMethod: pp,
    plan: yp,
    product: mp,
    subscription: qh,
  };
  try {
    Go.init();
  } catch {}
  return Go;
});
