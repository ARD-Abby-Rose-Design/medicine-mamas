/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/vanilla-js-match-height@1.0.6/dist/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const i = { parent: null, byRow: !0, timeOut: 50 };
class MatchHeight {
  constructor(e, t = {}) {
    (this.options = { ...i, ...t }),
      (this.element = e),
      this.element
        ? (document.readyState !== "loading"
            ? this.init()
            : document.addEventListener("DOMContentLoaded", () => {
                this.init();
              }),
          window.addEventListener("resize", () => {
            setTimeout(() => {
              this.update();
            }, 200);
          }))
        : this.error("class");
  }
  init() {
    setTimeout(() => {
      this.reset();
    }, this.options.timeOut);
  }
  findElements() {
    let e;
    this.options.parent && document.querySelectorAll(this.options.parent).length
      ? document.querySelectorAll(this.options.parent).forEach((t) => {
          (e = t.querySelectorAll(this.element)), this.createGroup(e, t);
        })
      : ((e = document.querySelectorAll(this.element)), this.createGroup(e)),
      this.findRows();
  }
  findRows() {
    this.elements &&
      (this.elements.map((e) => {
        let t = [];
        e.elements.forEach((s) => {
          let n = 0;
          this.options.byRow &&
            (n = Math.round(s.getBoundingClientRect().top + window.scrollY)),
            (t[n] = t[n] ?? { offset: n, elements: [] }),
            t[n].elements.push(s);
        }),
          t.map((s) => {
            e.rows.push({ height: 0, offset: s.offset, elements: s.elements });
          });
      }),
      this.setHeights());
  }
  createGroup(e, t) {
    let s = { elements: e, rows: [], parent: t };
    this.elements.push(s);
  }
  setHeights() {
    if (this.elements)
      for (let e of this.elements)
        e.rows.map((t) => {
          let s = [];
          t.elements.forEach((n) => {
            (n.style.height = null), s.push(n.offsetHeight);
          }),
            (t.height = Math.max.apply(Math, s)),
            t.elements.forEach((n) => {
              n.style.height = `${t.height}px`;
            });
        });
    else this.error();
  }
  update() {
    this.elements.length ? this.findRows() : this.error();
  }
  reset() {
    (this.elements = []), this.findElements();
  }
  debug() {
    setTimeout(() => {
      this.elements
        ? this.elements.forEach((e, t) => {
            e.parent
              ? console.log(
                  `Element: ${this.element} Parent: ${e.parent.tagName}.${e.parent.className}`
                )
              : console.log(`Element: ${this.element}`),
              e.rows.forEach((s, n) => {
                console.log(`Offset Group: ${s.offset}`), console.log(s);
              }),
              console.log(`

`);
          })
        : console.log(`\u26D4 No cached MatchHeight elements found for "${this.element}" 

 Make sure this element exists on the current page.`);
    }, this.options.timeOut + 250);
  }
  error(e = "") {
    e == "class"
      ? console.error("\u26D4 Missing class name in new MatchHeight()")
      : console.error(
          `\u26D4 Can't trigger update as no elements found for the MatchHeight element ${this.element}`
        );
  }
}



window.matchHeights = () => {
  /* Card Headings */
  new MatchHeight('.featured-collections__slider .card__heading');
  new MatchHeight('#product-grid .product-card-wrapper .card__heading');

  /* Card Short Descriptions */
  new MatchHeight('.featured-collections__slider .card--short-description');
  new MatchHeight('#product-grid .product-card-wrapper .card--short-description');
  console.log('window.matchHeights');
}

window.matchHeights();