/* ==========================================================================
   ALAM PRINTING PRESS — content.js
   --------------------------------------------------------------------------
   This file is the single source of truth for everything editable on the
   site: categories, contact details, copy, timeline, capabilities.
   Edit here — never in the HTML files.
   ========================================================================== */

window.CONTENT = {
  brand: {
    name: "Alam Printing Press",
    est: 1991,
    location: "Bikfaya Industrial Zone, Maten, Lebanon",
    tagline: "Offset & digital printing, family-run since 1991.",
  },

  contact: {
    phones: [
      { label: "Press office", number: "+961 4 925 773" },
      { label: "Mobile", number: "+961 3 843 810" },
      { label: "Mobile", number: "+961 3 736 110" },
      { label: "Mobile", number: "+961 3 156 857" },
    ],
    email: "info@alamprintingpress.com",
    addressLines: ["Bikfaya Industrial Zone", "Maten — Lebanon"],
    mapSrc:
      "https://maps.google.com/maps?q=Mounir%20Alam%20Printing%20press&t=&z=12&ie=UTF8&iwloc=&output=embed",
    mapLink: "https://maps.google.com/maps?q=Mounir%20Alam%20Printing%20press",
    socials: [
      { label: "Facebook", url: "https://www.facebook.com/Alamprintingpress/" },
      { label: "Instagram", url: "https://instagram.com/alamprintingpress" },
    ],
  },

  /* Categories — what the press prints.
     tag: one of "marketing" | "stationery" | "publications" | "packaging"
     featured: true → shown on the home page grid (aim for 8). */
  categories: [
    {
      slug: "business-cards",
      title: "Business Cards",
      blurb: "Sharp type on serious stock — matte, laminated, kraft or foiled.",
      image: "assets/img/categories/business-cards.webp",
      tag: "stationery",
      featured: true,
    },
    {
      slug: "packaging",
      title: "Packaging",
      blurb: "Folding cartons and food boxes, die-cut and glued in-house.",
      image: "assets/img/categories/packaging.webp",
      tag: "packaging",
      featured: true,
    },
    {
      slug: "books",
      title: "Books",
      blurb: "Perfect-bound, saddle-stitched or hardcover — cover to colophon.",
      image: "assets/img/categories/books.webp",
      tag: "publications",
      featured: true,
    },
    {
      slug: "brochures",
      title: "Brochures",
      blurb: "Folded or stitched, from tri-fold leaflets to full catalogues.",
      image: "assets/img/categories/brochures.webp",
      tag: "marketing",
      featured: true,
    },
    {
      slug: "paper-bags",
      title: "Paper Bags",
      blurb: "Branded kraft and coated bags with rope or flat handles.",
      image: "assets/img/categories/paper-bags.webp",
      tag: "packaging",
      featured: true,
    },
    {
      slug: "posters",
      title: "Posters",
      blurb: "A3 and up, edge-to-edge colour for walls and windows.",
      image: "assets/img/categories/posters.webp",
      tag: "marketing",
      featured: true,
    },
    {
      slug: "labels",
      title: "Labels & Stickers",
      blurb: "Rolls or sheets, paper or synthetic, any shape we can die-cut.",
      image: "assets/img/categories/labels.webp",
      tag: "packaging",
      featured: true,
    },
    {
      slug: "calendars",
      title: "Calendars",
      blurb: "Wall, desk and pocket formats, wire-o bound and dated right.",
      image: "assets/img/categories/calendars.webp",
      tag: "publications",
      featured: true,
    },
    {
      slug: "flyers",
      title: "Flyers",
      blurb: "Fast-turn A5s and A4s for offers that can't wait.",
      image: "assets/img/categories/flyers.webp",
      tag: "marketing",
      featured: false,
    },
    {
      slug: "letterhead",
      title: "Letterhead",
      blurb: "Correspondence that carries your brand, with matching envelopes.",
      image: "assets/img/categories/letterhead.webp",
      tag: "stationery",
      featured: false,
    },
    {
      slug: "envelopes",
      title: "Envelopes",
      blurb: "Standard and custom sizes, printed inside and out.",
      image: "assets/img/categories/envelopes.webp",
      tag: "stationery",
      featured: false,
    },
    {
      slug: "folders",
      title: "Presentation Folders",
      blurb: "Pocketed folders with clean folds and room for a spine.",
      image: "assets/img/categories/folders.webp",
      tag: "stationery",
      featured: false,
    },
    {
      slug: "receipts",
      title: "Receipt Books",
      blurb: "NCR carbonless sets, numbered and bound your way.",
      image: "assets/img/categories/receipts.webp",
      tag: "stationery",
      featured: false,
    },
    {
      slug: "postcards",
      title: "Postcards",
      blurb: "Heavy stock, full colour, ready to mail or hand out.",
      image: "assets/img/categories/postcards.webp",
      tag: "marketing",
      featured: false,
    },
    {
      slug: "newsletters",
      title: "Newsletters",
      blurb: "Periodicals and bulletins, printed and folded on schedule.",
      image: "assets/img/categories/newsletters.webp",
      tag: "publications",
      featured: false,
    },
    {
      slug: "bookmarks",
      title: "Bookmarks",
      blurb: "Laminated, die-cut or tasselled — small print, big detail.",
      image: "assets/img/categories/bookmarks.webp",
      tag: "publications",
      featured: false,
    },
    {
      slug: "placemats",
      title: "Placemats",
      blurb: "Printed paper sous-plats for restaurants and caterers.",
      image: "assets/img/categories/placemats.webp",
      tag: "packaging",
      featured: false,
    },
  ],

  /* Filter chips on the Work page — key must match category tags. */
  filters: [
    { key: "all", label: "Everything" },
    { key: "marketing", label: "Marketing" },
    { key: "stationery", label: "Stationery" },
    { key: "publications", label: "Publications" },
    { key: "packaging", label: "Packaging & Bags" },
  ],

  capabilities: [
    {
      title: "Offset Printing",
      text: "Multi-unit presses for long runs where colour has to be exact — and stay exact from the first sheet to the last.",
      specs: ["4/4 CMYK", "Pantone spot colour", "Long runs"],
    },
    {
      title: "Digital Printing",
      text: "No plates, no minimums that hurt. Short runs and same-week turnarounds for jobs that can't sit in a queue.",
      specs: ["Short runs", "Fast turnaround", "Print on demand"],
    },
    {
      title: "Prepress & Artwork",
      text: "Every file is checked, separated and proofed before a single plate is made. Problems get caught on screen, not on paper.",
      specs: ["File check", "Colour proofs", "Plate making"],
    },
    {
      title: "Finishing & Binding",
      text: "Cutting, folding, laminating, foiling, die-cutting, numbering and binding — all under the same roof as the presses.",
      specs: ["Die-cutting", "Foil & lamination", "Binding"],
    },
  ],

  /* The order of these steps is the real order of a job through the shop. */
  process: [
    {
      step: "01",
      title: "Prepress",
      text: "We check your artwork, fix what needs fixing, separate the colours and send you a proof to approve.",
    },
    {
      step: "02",
      title: "Plates",
      title_note: "offset jobs",
      text: "The approved job is imposed onto sheets and burned to aluminium plates — one per colour.",
    },
    {
      step: "03",
      title: "Press",
      text: "Ink meets paper. Colour is measured against your approved proof and held there for the whole run.",
    },
    {
      step: "04",
      title: "Finish",
      text: "Cut, fold, laminate, bind, pack. Your job leaves Bikfaya ready to use, not ready to assemble.",
    },
  ],

  stats: [
    { value: 35, suffix: "+", label: "years in ink" },
    { value: 2, suffix: "", label: "generations of Alams" },
    { value: 17, suffix: "+", label: "product lines" },
    { value: 4, suffix: "", label: "colours, endless results" },
  ],

  timeline: [
    {
      year: "1991",
      title: "A press of their own",
      text: "Mounir Amine Alam and Sonia Achkar Alam open a small printing shop in Bikfaya, taking on whatever jobs the neighbourhood brings.",
    },
    {
      year: "2000s",
      title: "Small jobs become big ones",
      text: "Word travels. Business cards turn into catalogues, catalogues into packaging, and the shop grows into a full-service press for businesses across Maten and Beirut.",
    },
    {
      year: "2010s",
      title: "The second generation",
      text: "Elie and Sarah Alam join the company after earning degrees in printing management — bringing new tools, and keeping the old standards.",
    },
    {
      year: "Today",
      title: "Offset and digital, one roof",
      text: "Two generations work side by side, running offset and digital presses with in-house finishing — the same commitment made in 1991.",
    },
  ],

  values: [
    {
      title: "Integrity",
      text: "A quoted price is the price. A promised date is the date. It's how the first client stayed, and the ones after.",
    },
    {
      title: "Service",
      text: "You talk to the people who actually run your job — not a call centre, not a form that goes nowhere.",
    },
    {
      title: "Craft",
      text: "Registration checked with a loupe, colour held to the proof, corners cut square. Every job, not just the big ones.",
    },
  ],

  credit: {
    text: "Site crafted by Firas Rihan",
  },
};
