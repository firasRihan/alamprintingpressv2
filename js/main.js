/* ==========================================================================
   ALAM PRINTING PRESS — main.js
   Renders content from js/content.js and adds motion (GSAP, if available).
   Everything renders and stays visible even if GSAP fails to load.
   ========================================================================== */

(function () {
  "use strict";

  var C = window.CONTENT;
  if (!C) return;

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined" && !prefersReduced;

  /* ---------- helpers ---------- */

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function telHref(number) {
    return "tel:" + number.replace(/[^+\d]/g, "");
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  var REGMARK =
    '<svg class="reg-mark" aria-hidden="true"><use href="#regmark"/></svg>';

  var LOGO_SVG =
    '<svg class="logo__mark" viewBox="0 0 36 36" aria-hidden="true">' +
    '<path d="M17 17V3.05A15 15 0 0 0 3.05 17Z" fill="#ec008c"/>' +
    '<path d="M19 17h13.95A15 15 0 0 0 19 3.05Z" fill="#ffe600"/>' +
    '<path d="M17 19H3.05A15 15 0 0 0 17 32.95Z" fill="#00aeef"/>' +
    '<path d="M19 19v13.95A15 15 0 0 0 32.95 19Z" fill="currentColor" opacity=".9"/>' +
    '<path d="M17.3 0h1.4v36h-1.4zM0 17.3h36v1.4H0z" fill="currentColor"/>' +
    "</svg>";

  function filterLabel(key) {
    for (var i = 0; i < C.filters.length; i++) {
      if (C.filters[i].key === key) return C.filters[i].label;
    }
    return key;
  }

  /* ---------- header / nav ---------- */

  function initHeader() {
    var header = qs("[data-header]");
    var toggle = qs("[data-nav-toggle]");
    var nav = qs("[data-nav]");
    if (!header) return;

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        document.body.classList.toggle("nav-locked", open);
      });

      qsa("a", nav).forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("nav-locked");
        });
      });
    }

    var lastY = window.scrollY;
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        header.classList.toggle("is-scrolled", y > 40);
        var navOpen = nav && nav.classList.contains("is-open");
        if (!navOpen) {
          header.classList.toggle("is-hidden", y > lastY && y > 420);
        }
        lastY = y;
      },
      { passive: true }
    );
  }

  /* ---------- footer ---------- */

  function renderFooter() {
    var footer = qs("[data-footer]");
    if (!footer) return;

    var year = new Date().getFullYear();

    var phones = C.contact.phones
      .map(function (p) {
        return (
          '<p><span class="mono">' + p.label + '</span><br />' +
          '<a href="' + telHref(p.number) + '">' + p.number + "</a></p>"
        );
      })
      .join("");

    var socials = C.contact.socials
      .map(function (s) {
        return (
          '<a href="' + s.url + '" target="_blank" rel="noopener">' +
          s.label + " ↗</a>"
        );
      })
      .join("");

    footer.innerHTML =
      '<div class="color-strip" aria-hidden="true"></div>' +
      '<div class="container">' +
      '  <div class="site-footer__grid">' +
      '    <div class="site-footer__brand">' +
      '      <a class="logo" href="index.html" aria-label="Alam Printing Press — home">' +
      LOGO_SVG +
      '        <span class="logo__text">' +
      '          <span class="logo__name">Alam</span>' +
      '          <span class="logo__sub">Printing Press</span>' +
      "        </span>" +
      "      </a>" +
      "      <p>" + C.brand.tagline + "<br />" + C.brand.location + "</p>" +
      "    </div>" +
      '    <nav aria-label="Footer">' +
      "      <h4>Explore</h4>" +
      '      <div class="site-footer__links">' +
      '        <a href="index.html">Home</a>' +
      '        <a href="work.html">What we print</a>' +
      '        <a href="about.html">About</a>' +
      '        <a href="contact.html">Contact</a>' +
      "      </div>" +
      "    </nav>" +
      "    <div>" +
      "      <h4>Talk to us</h4>" +
      '      <div class="site-footer__contact">' +
      phones +
      '        <p style="margin-top:0.6rem"><a href="mailto:' + C.contact.email + '">' + C.contact.email + "</a></p>" +
      "      </div>" +
      "    </div>" +
      "    <div>" +
      "      <h4>Visit</h4>" +
      '      <div class="site-footer__contact">' +
      "        <p>" + C.contact.addressLines.join("<br />") + "</p>" +
      '        <p style="margin-top:0.6rem"><a href="' + C.contact.mapLink + '" target="_blank" rel="noopener">Google Maps ↗</a></p>' +
      '        <div class="site-footer__links" style="margin-top:1.2rem">' + socials + "</div>" +
      "      </div>" +
      "    </div>" +
      "  </div>" +
      '  <div class="site-footer__bottom">' +
      "    <span>© " + year + " " + C.brand.name + " — All rights reserved</span>" +
      '    <span class="site-footer__credit">' + C.credit.text + "</span>" +
      "  </div>" +
      "</div>";
  }

  /* ---------- marquee ---------- */

  function renderMarquee() {
    var track = qs("[data-marquee]");
    if (!track) return;

    var items = C.categories
      .map(function (cat) {
        return (
          '<span class="marquee__item">' + cat.title + REGMARK + "</span>"
        );
      })
      .join("");

    var group = '<span class="marquee__group">' + items + "</span>";
    track.innerHTML = group + group;
  }

  /* ---------- cards ---------- */

  function cardHTML(cat) {
    return (
      '<a class="card card--link" data-card data-tag="' + cat.tag + '" href="product.html?slug=' + encodeURIComponent(cat.slug) + '" aria-label="View ' + escapeHTML(cat.title) + ' details">' +
      '  <div class="card__media">' +
      '    <img src="' + cat.image + '" alt="' + escapeHTML(cat.title) + ' printed by Alam Printing Press" loading="lazy" />' +
      "  </div>" +
      '  <div class="card__body">' +
      '    <span class="card__tag">' + filterLabel(cat.tag) + "</span>" +
      '    <h3 class="card__title">' + escapeHTML(cat.title) + '<span class="card__arrow" aria-hidden="true">↗</span></h3>' +
      '    <p class="card__blurb">' + escapeHTML(cat.blurb) + "</p>" +
      "  </div>" +
      "</a>"
    );
  }

  function renderFeaturedGrid() {
    var grid = qs("[data-featured-grid]");
    if (!grid) return;
    grid.innerHTML = C.categories
      .filter(function (c) { return c.featured; })
      .map(cardHTML)
      .join("");
  }

  function renderWorkGrid() {
    var countEl = qs("[data-cat-count]");
    if (countEl) countEl.textContent = C.categories.length;

    var grid = qs("[data-work-grid]");
    var filterWrap = qs("[data-filters]");
    if (!grid) return;

    grid.innerHTML = C.categories.map(cardHTML).join("");

    if (!filterWrap) return;

    filterWrap.innerHTML = C.filters
      .map(function (f, i) {
        return (
          '<button class="filter-chip' + (i === 0 ? " is-active" : "") +
          '" data-filter="' + f.key + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' +
          f.label + "</button>"
        );
      })
      .join("");

    var chips = qsa("[data-filter]", filterWrap);
    var cards = qsa("[data-card]", grid);

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var key = chip.getAttribute("data-filter");

        chips.forEach(function (c) {
          var active = c === chip;
          c.classList.toggle("is-active", active);
          c.setAttribute("aria-pressed", active ? "true" : "false");
        });

        var shown = [];
        cards.forEach(function (card) {
          var match = key === "all" || card.getAttribute("data-tag") === key;
          card.classList.toggle("is-filtered-out", !match);
          if (match) shown.push(card);
        });

        if (hasGsap) {
          window.gsap.fromTo(
            shown,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.4, stagger: 0.035, ease: "power2.out", overwrite: true }
          );
        }
      });
    });
  }

  /* ---------- product detail ---------- */

  function renderProductDetail() {
    var page = qs("[data-product-page]");
    if (!page) return;

    var slug = new URLSearchParams(window.location.search).get("slug") || "";
    var cat = C.categories.find(function (item) { return item.slug === slug; });
    var product = window.PRODUCTS && window.PRODUCTS[slug];

    if (!cat || !product) {
      page.setAttribute("data-product-missing", "");
      page.innerHTML =
        '<section class="product-missing section--paper">' +
        '  <div class="container product-missing__inner">' +
        '    <p class="mono">404 / PRODUCT NOT FOUND</p>' +
        '    <h1 class="display display--md">That sheet came up blank.</h1>' +
        '    <p>The product may have moved, or the link is incomplete.</p>' +
        '    <a class="btn btn--solid" href="work.html">Back to what we print <span class="btn__arrow">→</span></a>' +
        "  </div>" +
        "</section>";
      document.title = "Product not found — Alam Printing Press";
      return;
    }

    document.title = cat.title + " — Alam Printing Press";
    var metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", product.description);

    qsa("[data-product-title]").forEach(function (el) { el.textContent = cat.title; });
    var categoryEl = qs("[data-product-category]");
    if (categoryEl) categoryEl.textContent = filterLabel(cat.tag);
    var descriptionEl = qs("[data-product-description]");
    if (descriptionEl) descriptionEl.textContent = product.description;
    var imageEl = qs("[data-product-image]");
    if (imageEl) {
      imageEl.src = cat.image;
      imageEl.alt = cat.title + " printed by Alam Printing Press";
    }

    var variants = product.variants || [];
    var choices = qs("[data-product-choices]");
    var summary = qs("[data-order-summary]");
    var price = qs("[data-product-price]");
    var orderLink = qs("[data-whatsapp-order]");
    var note = qs("[data-product-note]");

    function summaryRow(label, value) {
      if (!value) return "";
      return '<div class="order-summary__row"><dt>' + escapeHTML(label) + '</dt><dd>' + escapeHTML(value) + "</dd></div>";
    }

    function whatsappHref(variant) {
      var phone = (C.contact.whatsapp || C.contact.phones[1].number).replace(/\D/g, "");
      var lines = [
        "Hello Alam Printing Press,",
        "",
        variants.length ? "I'd like to order:" : "I'd like a quote for:",
        "Product: " + cat.title
      ];

      if (variant) {
        lines.push("Specification: " + variant.label);
        if (variant.quantity) lines.push("Quantity: " + variant.quantity);
        if (variant.size) lines.push("Size: " + variant.size);
        if (variant.type) lines.push("Type: " + variant.type);
        lines.push("Listed price: $" + variant.price);
      }

      lines.push("", variants.length ? "Please confirm availability and the final order details. Thank you." : "Please help me choose the right specifications. Thank you.");
      return "https://wa.me/" + phone + "?text=" + encodeURIComponent(lines.join("\n"));
    }

    function selectVariant(index) {
      var variant = variants[index];
      if (!variant) return;
      price.textContent = "$" + variant.price;
      summary.innerHTML =
        summaryRow("Product", cat.title) +
        summaryRow("Specification", variant.label) +
        summaryRow("Quantity", variant.quantity) +
        summaryRow("Size", variant.size) +
        summaryRow("Type", variant.type);
      orderLink.href = whatsappHref(variant);
    }

    if (variants.length) {
      choices.innerHTML =
        '<fieldset class="variant-fieldset"><legend class="mono">Choose a specification</legend>' +
        variants.map(function (variant, index) {
          return (
            '<label class="variant-choice">' +
            '  <input type="radio" name="product-variant" value="' + index + '"' + (index === 0 ? " checked" : "") + " />" +
            '  <span class="variant-choice__content"><span class="variant-choice__name">' + escapeHTML(variant.label) + '</span><span class="variant-choice__meta">Qty. ' + escapeHTML(variant.quantity) + ' · $' + variant.price + "</span></span>" +
            '  <span class="variant-choice__mark" aria-hidden="true"></span>' +
            "</label>"
          );
        }).join("") +
        "</fieldset>";

      qsa('input[name="product-variant"]', choices).forEach(function (input) {
        input.addEventListener("change", function () { selectVariant(parseInt(input.value, 10)); });
      });
      if (note) note.textContent = "Listed price for the selected specification. Final details are confirmed with the press on WhatsApp.";
      selectVariant(0);
    } else {
      choices.innerHTML = '<div class="made-to-order"><span class="mono">Made to specification</span><p>' + escapeHTML(product.note || "This product is quoted according to your requirements.") + "</p></div>";
      price.textContent = "Let’s quote it";
      price.classList.add("product-order__price--quote");
      summary.innerHTML = summaryRow("Product", cat.title) + summaryRow("Pricing", "Quoted to specification");
      orderLink.href = whatsappHref(null);
      orderLink.innerHTML = '<span class="btn__label"><svg class="btn__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4A8 8 0 1 1 20 11.6Z"/><path d="M8.2 7.7c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.8c-.2.2-.1.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.2.6 0l.8-1c.2-.2.4-.3.6-.2l1.9.9c.3.1.4.3.4.5 0 .3-.2 1.3-.8 1.8-.5.5-1.2.8-2.1.6-1.1-.2-2.5-.7-4-2-1.2-1-2.1-2.3-2.6-3.5-.5-1.3-.1-2.4.4-3Z"/></svg>Request a quote on WhatsApp</span><span class="btn__arrow">↗</span>';
      if (note) note.textContent = "Tell us what you have in mind and we’ll help define the right format, materials and quantity.";
    }

    var related = C.categories.filter(function (item) { return item.slug !== slug && item.tag === cat.tag; }).slice(0, 3);
    if (related.length < 3) {
      C.categories.forEach(function (item) {
        if (item.slug !== slug && !related.includes(item) && related.length < 3) related.push(item);
      });
    }
    var relatedGrid = qs("[data-related-grid]");
    if (relatedGrid) relatedGrid.innerHTML = related.map(cardHTML).join("");
  }

  /* ---------- capabilities ---------- */

  function renderCapabilities() {
    var list = qs("[data-cap-list]");
    if (!list) return;

    list.innerHTML = C.capabilities
      .map(function (cap) {
        var specs = cap.specs
          .map(function (s) { return '<span class="spec">' + s + "</span>"; })
          .join("");
        return (
          '<div class="cap-row" data-reveal>' +
          '  <h3 class="cap-row__title">' + cap.title + "</h3>" +
          '  <p class="cap-row__text">' + cap.text + "</p>" +
          '  <div class="cap-row__specs">' + specs + "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- process ---------- */

  function renderProcess() {
    var grid = qs("[data-process-grid]");
    if (!grid) return;

    grid.innerHTML = C.process
      .map(function (p) {
        var note = p.title_note
          ? ' <span class="mono" style="opacity:.45;font-size:.6em;letter-spacing:.14em">(' + p.title_note + ")</span>"
          : "";
        return (
          '<div class="process-step" data-reveal>' +
          '  <p class="process-step__num"><b>■</b> Step ' + p.step + " / 04</p>" +
          '  <h3 class="process-step__title">' + p.title + note + "</h3>" +
          '  <p class="process-step__text">' + p.text + "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- stats ---------- */

  function renderStats() {
    var wrap = qs("[data-stats]");
    if (!wrap) return;

    wrap.innerHTML = C.stats
      .map(function (s) {
        return (
          '<div class="stat" data-reveal>' +
          '  <div class="stat__value"><span data-count="' + s.value + '">' + s.value + "</span>" + s.suffix + "</div>" +
          '  <div class="stat__label">' + s.label + "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- timeline & values (about) ---------- */

  function renderTimeline() {
    var wrap = qs("[data-timeline]");
    if (!wrap) return;

    wrap.innerHTML = C.timeline
      .map(function (t) {
        return (
          '<div class="timeline-item" data-reveal>' +
          '  <p class="timeline-item__year">' + t.year + "</p>" +
          '  <h3 class="timeline-item__title">' + t.title + "</h3>" +
          '  <p class="timeline-item__text">' + t.text + "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderValues() {
    var wrap = qs("[data-values]");
    if (!wrap) return;

    wrap.innerHTML = C.values
      .map(function (v, i) {
        return (
          '<div class="value-card" data-reveal>' +
          '  <p class="value-card__index">0' + (i + 1) + " / 0" + C.values.length + "</p>" +
          '  <h3 class="value-card__title">' + v.title + "</h3>" +
          '  <p class="value-card__text">' + v.text + "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- contact page ---------- */

  function renderContact() {
    var phoneWrap = qs("[data-phone-lines]");
    if (phoneWrap) {
      phoneWrap.innerHTML = C.contact.phones
        .map(function (p) {
          return (
            '<div class="contact-line">' +
            '  <span class="contact-line__label">' + p.label + "</span>" +
            '  <a href="' + telHref(p.number) + '">' + p.number + "</a>" +
            "</div>"
          );
        })
        .join("");
    }

    var email = qs("[data-email]");
    if (email) {
      email.textContent = C.contact.email;
      email.href = "mailto:" + C.contact.email;
    }

    var address = qs("[data-address]");
    if (address) address.innerHTML = C.contact.addressLines.join("<br />");

    var mapLink = qs("[data-map-link]");
    if (mapLink) mapLink.href = C.contact.mapLink;

    var map = qs("[data-map]");
    if (map) map.src = C.contact.mapSrc;

    var socials = qs("[data-socials]");
    if (socials) {
      socials.innerHTML = C.contact.socials
        .map(function (s) {
          return '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.label + " ↗</a>";
        })
        .join("");
    }

    var form = qs("[data-contact-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = (form.querySelector("#cf-name") || {}).value || "";
        var company = (form.querySelector("#cf-company") || {}).value || "";
        var message = (form.querySelector("#cf-message") || {}).value || "";

        var subject = "Print job enquiry — " + name;
        var body =
          "Name: " + name + "\n" +
          (company ? "Company: " + company + "\n" : "") +
          "\nWhat I need printed:\n" + message + "\n";

        window.location.href =
          "mailto:" + C.contact.email +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
      });
    }
  }

  /* ---------- manifesto word split ---------- */

  function splitManifesto() {
    var el = qs("[data-manifesto]");
    if (!el) return [];

    var words = [];

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var frag = document.createDocumentFragment();
        var parts = node.textContent.split(/(\s+)/);
        parts.forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            var span = document.createElement("span");
            span.className = "word";
            span.textContent = part;
            frag.appendChild(span);
            words.push(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.classList.add("word");
        words.push(node);
      }
    }

    Array.prototype.slice.call(el.childNodes).forEach(processNode);
    return words;
  }

  /* ---------- animations ---------- */

  function initAnimations() {
    var words = splitManifesto();

    if (qs("[data-product-missing]")) return;

    if (!hasGsap) {
      /* no GSAP (offline / reduced motion): show everything as-is */
      words.forEach(function (w) { w.classList.add("is-inked"); });
      return;
    }

    var gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    /* --- hero: CMYK plates snap into registration --- */
    var plateLines = qsa("[data-plate-line]");
    var plateOffsets = [
      { c: [-0.5, 0.28], m: [0.42, -0.22], y: [-0.18, -0.45] },
      { c: [0.45, -0.3], m: [-0.38, 0.2], y: [0.16, 0.42] },
    ];

    var heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    plateLines.forEach(function (line, i) {
      var o = plateOffsets[i % plateOffsets.length];
      var fs = parseFloat(window.getComputedStyle(line).fontSize);
      var k = fs * 0.28;

      ["c", "m", "y"].forEach(function (ch, j) {
        var plate = line.querySelector(".plate--" + ch);
        if (!plate) return;
        gsap.set(plate, { x: o[ch][0] * k, y: o[ch][1] * k, autoAlpha: 0.85 });
        heroTl.to(
          plate,
          { x: 0, y: 0, autoAlpha: 1, duration: 1.5 },
          0.25 + i * 0.12 + j * 0.07
        );
      });
    });

    heroTl.from(
      qsa("[data-hero-fade]"),
      { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
      0.9
    );

    if (!window.ScrollTrigger) return;

    /* --- generic reveals --- */
    window.ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: function (batch) {
        gsap.from(batch, {
          y: 44,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          overwrite: true,
        });
      },
    });

    /* --- card grids --- */
    qsa(".card-grid").forEach(function (grid) {
      var cards = qsa("[data-card]", grid);
      if (!cards.length) return;
      window.ScrollTrigger.batch(cards, {
        start: "top 92%",
        once: true,
        onEnter: function (batch) {
          gsap.from(batch, {
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.055,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    });

    /* --- manifesto ink-in --- */
    var manifesto = qs("[data-manifesto]");
    if (manifesto && words.length) {
      window.ScrollTrigger.create({
        trigger: manifesto,
        start: "top 78%",
        end: "bottom 45%",
        scrub: 0.4,
        onUpdate: function (self) {
          var n = Math.round(self.progress * words.length);
          words.forEach(function (w, i) {
            w.classList.toggle("is-inked", i < n);
          });
        },
      });
    }

    /* --- stat count-up --- */
    qsa("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var obj = { v: 0 };
      window.ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: function () {
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: function () {
              el.textContent = Math.round(obj.v);
            },
          });
        },
      });
    });

    /* --- CTA band settle --- */
    qsa(".cta .display").forEach(function (el) {
      gsap.from(el, {
        skewY: 2.5,
        transformOrigin: "left bottom",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        duration: 1.1,
        ease: "power3.out",
      });
    });
  }

  /* ---------- boot ---------- */

  initHeader();
  renderFooter();
  renderMarquee();
  renderFeaturedGrid();
  renderWorkGrid();
  renderProductDetail();
  renderCapabilities();
  renderProcess();
  renderStats();
  renderTimeline();
  renderValues();
  renderContact();
  initAnimations();
})();
