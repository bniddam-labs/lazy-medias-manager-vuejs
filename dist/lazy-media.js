import { defineComponent as k, ref as l, onMounted as I, onUnmounted as R, watch as M, createElementBlock as s, openBlock as r, normalizeClass as b, renderSlot as L, createElementVNode as z, computed as w, toDisplayString as _, Fragment as B } from "vue";
const D = ["src", "alt"], E = {
  key: 1,
  class: "lazy-image-placeholder"
}, x = /* @__PURE__ */ k({
  __name: "LazyImage",
  props: {
    src: {},
    alt: { default: "" },
    sizes: { default: () => [100, 400] },
    rootMargin: { default: "50px" },
    threshold: { default: 0.1 }
  },
  setup(f) {
    const d = f, u = l(null), c = l(null), p = l(!1), i = l(!1), m = l(null), g = (t) => {
      const a = new URL(d.src, window.location.origin);
      return a.searchParams.set("size", t.toString()), a.toString();
    }, o = (t, a) => new Promise((n, y) => {
      const h = new Image(), $ = () => {
        h.onload = null, h.onerror = null;
      };
      a && a.addEventListener("abort", () => {
        $(), h.src = "", y(new DOMException("Aborted", "AbortError"));
      }), h.onload = () => {
        $(), n(t);
      }, h.onerror = () => {
        $(), y(new Error(`Failed to load: ${t}`));
      }, h.src = t;
    }), e = async () => {
      m.value && m.value.abort(), m.value = new AbortController();
      const t = m.value.signal, a = o(d.src, t).then((n) => {
        var y;
        c.value = n, p.value = !0, (y = m.value) == null || y.abort();
      }).catch(() => {
      });
      for (const n of d.sizes) {
        if (t.aborted || p.value) break;
        try {
          const y = g(n), h = await o(y, t);
          p.value || (c.value = h);
        } catch (y) {
          if (y instanceof DOMException && y.name === "AbortError")
            break;
        }
      }
      await a;
    };
    let v = null;
    return I(() => {
      u.value && (v = new IntersectionObserver(
        (t) => {
          t[0].isIntersecting && !i.value && (i.value = !0, e());
        },
        {
          rootMargin: d.rootMargin,
          threshold: d.threshold
        }
      ), v.observe(u.value));
    }), R(() => {
      var t;
      v == null || v.disconnect(), (t = m.value) == null || t.abort();
    }), M(() => d.src, () => {
      i.value && (c.value = null, p.value = !1, e());
    }), (t, a) => (r(), s("div", {
      ref_key: "containerRef",
      ref: u,
      class: "lazy-image-container"
    }, [
      c.value ? (r(), s("img", {
        key: 0,
        src: c.value,
        alt: t.alt,
        class: b(["lazy-image", { loaded: p.value }])
      }, null, 10, D)) : (r(), s("div", E, [
        L(t.$slots, "placeholder", {}, () => [
          a[0] || (a[0] = z("span", { class: "lazy-image-spinner" }, null, -1))
        ])
      ]))
    ], 512));
  }
}), A = {
  key: 0,
  class: "lazy-video-placeholder"
}, S = ["src", "alt"], O = {
  key: 1,
  class: "lazy-video-icon"
}, T = ["src", "poster", "controls", "autoplay", "muted", "loop", "preload"], C = /* @__PURE__ */ k({
  __name: "LazyVideo",
  props: {
    src: {},
    poster: {},
    alt: { default: "" },
    controls: { type: Boolean, default: !0 },
    autoplay: { type: Boolean, default: !1 },
    muted: { type: Boolean, default: !1 },
    loop: { type: Boolean, default: !1 },
    preload: { default: "metadata" },
    rootMargin: { default: "50px" },
    threshold: { default: 0.1 }
  },
  setup(f, { expose: d }) {
    const u = f, c = l(null), p = l(null), i = l(!1), m = l(!1), g = () => {
      m.value = !0;
    };
    let o = null;
    return I(() => {
      c.value && (o = new IntersectionObserver(
        (e) => {
          e[0].isIntersecting && !i.value && (i.value = !0, o == null || o.disconnect());
        },
        {
          rootMargin: u.rootMargin,
          threshold: u.threshold
        }
      ), o.observe(c.value));
    }), R(() => {
      o == null || o.disconnect();
    }), d({
      video: p
    }), (e, v) => (r(), s("div", {
      ref_key: "containerRef",
      ref: c,
      class: "lazy-video-container"
    }, [
      i.value ? (r(), s("video", {
        key: 1,
        ref_key: "videoRef",
        ref: p,
        src: e.src,
        poster: e.poster,
        controls: e.controls,
        autoplay: e.autoplay,
        muted: e.muted,
        loop: e.loop,
        preload: e.preload,
        class: "lazy-video",
        onLoadeddata: g
      }, [
        L(e.$slots, "default")
      ], 40, T)) : (r(), s("div", A, [
        L(e.$slots, "placeholder", {}, () => [
          e.poster ? (r(), s("img", {
            key: 0,
            src: e.poster,
            alt: e.alt,
            class: "lazy-video-poster"
          }, null, 8, S)) : (r(), s("span", O, "▶"))
        ])
      ]))
    ], 512));
  }
}), U = {
  key: 0,
  class: "lazy-audio-placeholder"
}, F = ["src", "controls", "autoplay", "muted", "loop", "preload"], P = /* @__PURE__ */ k({
  __name: "LazyAudio",
  props: {
    src: {},
    controls: { type: Boolean, default: !0 },
    autoplay: { type: Boolean, default: !1 },
    muted: { type: Boolean, default: !1 },
    loop: { type: Boolean, default: !1 },
    preload: { default: "metadata" },
    rootMargin: { default: "50px" },
    threshold: { default: 0.1 }
  },
  setup(f, { expose: d }) {
    const u = f, c = l(null), p = l(null), i = l(!1), m = l(!1), g = () => {
      m.value = !0;
    };
    let o = null;
    return I(() => {
      c.value && (o = new IntersectionObserver(
        (e) => {
          e[0].isIntersecting && !i.value && (i.value = !0, o == null || o.disconnect());
        },
        {
          rootMargin: u.rootMargin,
          threshold: u.threshold
        }
      ), o.observe(c.value));
    }), R(() => {
      o == null || o.disconnect();
    }), d({
      audio: p
    }), (e, v) => (r(), s("div", {
      ref_key: "containerRef",
      ref: c,
      class: "lazy-audio-container"
    }, [
      i.value ? (r(), s("audio", {
        key: 1,
        ref_key: "audioRef",
        ref: p,
        src: e.src,
        controls: e.controls,
        autoplay: e.autoplay,
        muted: e.muted,
        loop: e.loop,
        preload: e.preload,
        class: "lazy-audio",
        onLoadeddata: g
      }, [
        L(e.$slots, "default")
      ], 40, F)) : (r(), s("div", U, [
        L(e.$slots, "placeholder", {}, () => [
          v[0] || (v[0] = z("span", { class: "lazy-audio-icon" }, "🎵", -1))
        ])
      ]))
    ], 512));
  }
}), V = {
  key: 0,
  class: "lazy-document-placeholder"
}, j = { class: "lazy-document-icon" }, N = { class: "lazy-document-filename" }, q = ["src", "title"], G = ["data", "type"], H = ["href", "download"], J = /* @__PURE__ */ k({
  __name: "LazyDocument",
  props: {
    src: {},
    title: { default: "Document" },
    useIframe: { type: Boolean, default: !1 },
    downloadText: { default: "Download" },
    rootMargin: { default: "50px" },
    threshold: { default: 0.1 }
  },
  setup(f) {
    const d = f, u = l(null), c = l(null), p = l(null), i = l(!1), m = l(!1), g = w(() => {
      try {
        return new URL(d.src, window.location.origin).pathname.split("/").pop() || "document";
      } catch {
        return "document";
      }
    }), o = w(() => {
      var h;
      return ((h = g.value.split(".").pop()) == null ? void 0 : h.toLowerCase()) || "";
    }), e = w(() => ({
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      txt: "text/plain",
      csv: "text/csv",
      rtf: "application/rtf"
    })[o.value] || "application/octet-stream"), v = w(() => ({
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      xls: "📊",
      xlsx: "📊",
      ppt: "📽️",
      pptx: "📽️",
      txt: "📃",
      csv: "📊",
      rtf: "📝"
    })[o.value] || "📁"), t = () => {
      m.value = !0;
    };
    let a = null;
    return I(() => {
      u.value && (a = new IntersectionObserver(
        (n) => {
          n[0].isIntersecting && !i.value && (i.value = !0, a == null || a.disconnect());
        },
        {
          rootMargin: d.rootMargin,
          threshold: d.threshold
        }
      ), a.observe(u.value));
    }), R(() => {
      a == null || a.disconnect();
    }), (n, y) => (r(), s("div", {
      ref_key: "containerRef",
      ref: u,
      class: "lazy-document-container"
    }, [
      i.value ? (r(), s(B, { key: 1 }, [
        n.useIframe ? (r(), s("iframe", {
          key: 0,
          ref_key: "iframeRef",
          ref: c,
          src: n.src,
          title: n.title,
          class: "lazy-document-iframe",
          onLoad: t
        }, null, 40, q)) : (r(), s("object", {
          key: 1,
          ref_key: "objectRef",
          ref: p,
          data: n.src,
          type: e.value,
          class: "lazy-document-object",
          onLoad: t
        }, [
          z("a", {
            href: n.src,
            download: g.value,
            class: "lazy-document-fallback"
          }, _(n.downloadText) + " " + _(g.value), 9, H)
        ], 40, G))
      ], 64)) : (r(), s("div", V, [
        L(n.$slots, "placeholder", {}, () => [
          z("div", j, [
            z("span", null, _(v.value), 1),
            z("span", N, _(g.value), 1)
          ])
        ])
      ]))
    ], 512));
  }
}), Q = {
  install(f) {
    f.component("LazyImage", x), f.component("LazyVideo", C), f.component("LazyAudio", P), f.component("LazyDocument", J);
  }
};
export {
  P as LazyAudio,
  J as LazyDocument,
  x as LazyImage,
  Q as LazyMediaPlugin,
  C as LazyVideo,
  Q as default
};
