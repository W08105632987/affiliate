/**
 * NeoTechVault Enhanced JavaScript
 * Production-ready with smooth animations and better UX
 */

(function () {
  "use strict";

  // ===== DEMO PRODUCTS DATA =====
  const PRODUCTS = [
    {
      id: 1,
      title: "Aurora True Wireless Earbuds",
      price: 79.99,
      category: "Audio",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800",
      description:
        "Premium TWS earbuds with active noise cancellation, 40-hour battery life, and crystal-clear audio. Perfect for music lovers and professionals.",
      features: [
        "ANC Technology",
        "40h Battery",
        "IPX7 Waterproof",
        "Touch Controls",
      ],
      amazonPrice: 79.99,
      ebayPrice: 75.5,
      amazonLink: "https://amazon.com/dp/example1",
      ebayLink: "https://ebay.com/itm/example1",
      hotDeal: true,
      inStock: true,
    },
    {
      id: 2,
      title: "Nebula Smartwatch Pro",
      price: 199.0,
      category: "Wearables",
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800",
      description:
        "Advanced fitness tracking with ECG monitoring, sleep analysis, and 7-day battery life. Stay connected in style.",
      features: [
        "ECG Monitor",
        "Sleep Tracking",
        "GPS Built-in",
        "50m Waterproof",
      ],
      amazonPrice: 199.0,
      ebayPrice: 189.99,
      amazonLink: "https://amazon.com/dp/example2",
      ebayLink: "https://ebay.com/itm/example2",
      hotDeal: false,
      inStock: true,
    },
    {
      id: 3,
      title: "Quantum Portable Charger 30W",
      price: 49.5,
      category: "Power",
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800",
      description:
        "Ultra-compact GaN technology charger with dual USB-C ports and intelligent power distribution.",
      features: [
        "30W Fast Charge",
        "GaN Technology",
        "Dual Ports",
        "Compact Design",
      ],
      amazonPrice: 49.5,
      ebayPrice: 47.99,
      amazonLink: "https://amazon.com/dp/example3",
      ebayLink: "https://ebay.com/itm/example3",
      hotDeal: true,
      inStock: true,
    },
    {
      id: 4,
      title: "HyperDrive USB-C Hub",
      price: 89.99,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=800",
      description:
        "Professional 7-in-1 hub with 4K HDMI output, USB 3.0 ports, and SD card reader for ultimate connectivity.",
      features: ["4K HDMI", "USB 3.0", "SD/MicroSD", "100W PD Pass-through"],
      amazonPrice: 89.99,
      ebayPrice: 84.99,
      amazonLink: "https://amazon.com/dp/example4",
      ebayLink: "https://ebay.com/itm/example4",
      hotDeal: false,
      inStock: true,
    },
    {
      id: 5,
      title: "ProLight LED Desk Lamp",
      price: 59.99,
      category: "Home",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800",
      description:
        "Smart LED lamp with wireless charging pad, adjustable color temperature, and app control.",
      features: [
        "Wireless Charging",
        "App Control",
        "Touch Dimming",
        "Eye-Care LED",
      ],
      amazonPrice: 59.99,
      ebayPrice: 54.99,
      amazonLink: "https://amazon.com/dp/example5",
      ebayLink: "https://ebay.com/itm/example5",
      hotDeal: false,
      inStock: true,
    },
    {
      id: 6,
      title: "MechPro Keyboard RGB",
      price: 129.99,
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800",
      description:
        "Mechanical gaming keyboard with hot-swappable switches, per-key RGB, and aluminum frame.",
      features: [
        "Hot-Swappable",
        "RGB Lighting",
        "Aluminum Build",
        "N-Key Rollover",
      ],
      amazonPrice: 129.99,
      ebayPrice: 119.99,
      amazonLink: "https://amazon.com/dp/example6",
      ebayLink: "https://ebay.com/itm/example6",
      hotDeal: true,
      inStock: true,
    },
  ];

  // ===== STATE MANAGEMENT =====
  const state = {
    products: PRODUCTS,
    filteredProducts: PRODUCTS,
    wishlist: new Set(),
    ratings: {},
    comments: {},
    selectedProduct: null,
    searchQuery: "",
    selectedCategory: "all",
    sortBy: "featured",
    theme: "dark",
  };

  // ===== DOM ELEMENTS =====
  const elements = {
    // Header
    header: document.getElementById("header"),
    hamburger: document.getElementById("hamburger"),
    mobileNav: document.getElementById("mobileNav"),
    mobileOverlay: document.getElementById("mobileOverlay"),
    themeToggle: document.getElementById("themeToggle"),
    themeToggleMobile: document.getElementById("themeToggleMobile"),
    wishlistCount: document.getElementById("wishlistCount"),

    // Hero
    exploreBtn: document.getElementById("exploreBtn"),
    hotDealsBtn: document.getElementById("hotDealsBtn"),

    // Filters
    searchInput: document.getElementById("searchInput"),
    categoryFilter: document.getElementById("categoryFilter"),
    sortSelect: document.getElementById("sortSelect"),
    filterToggle: document.getElementById("filterToggle"),
    filters: document.getElementById("filters"),

    // Products
    productsGrid: document.getElementById("productsGrid"),
    emptyState: document.getElementById("emptyState"),

    // Modal
    modalBackdrop: document.getElementById("modalBackdrop"),
    productModal: document.getElementById("productModal"),
    modalClose: document.getElementById("modalClose"),
    modalTitle: document.getElementById("modalTitle"),
    modalImage: document.getElementById("modalImage"),
    modalPrice: document.getElementById("modalPrice"),
    modalCategory: document.getElementById("modalCategory"),
    modalDescription: document.getElementById("modalDescription"),
    modalFeatures: document.getElementById("modalFeatures"),
    modalRating: document.getElementById("modalRating"),
    modalRatingCount: document.getElementById("modalRatingCount"),
    amazonLink: document.getElementById("amazonLink"),
    ebayLink: document.getElementById("ebayLink"),
    amazonPrice: document.getElementById("amazonPrice"),
    ebayPrice: document.getElementById("ebayPrice"),
    modalWishlistBtn: document.getElementById("modalWishlistBtn"),
    modalShareBtn: document.getElementById("modalShareBtn"),

    // Comments
    commentInput: document.getElementById("commentInput"),
    commentSubmit: document.getElementById("commentSubmit"),
    commentsList: document.getElementById("commentsList"),
    commentsCount: document.getElementById("commentsCount"),

    // Share Modal
    shareModal: document.getElementById("shareModal"),
    shareClose: document.getElementById("shareClose"),
    copyLinkBtn: document.getElementById("copyLinkBtn"),

    // Toast
    toast: document.getElementById("toast"),

    // Buttons
    contactBtn: document.getElementById("contactBtn"),
    contactBtnMobile: document.getElementById("contactBtnMobile"),
    wishlistBtnHeader: document.getElementById("wishlistBtnHeader"),
  };

  // ===== UTILITY FUNCTIONS =====
  const utils = {
    formatPrice(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },

    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    },

    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    showToast(message) {
      elements.toast.textContent = message;
      elements.toast.classList.add("show");
      setTimeout(() => {
        elements.toast.classList.remove("show");
      }, 3000);
    },

    trackEvent(eventName, params = {}) {
      if (typeof gtag !== "undefined") {
        gtag("event", eventName, params);
      }
    },
  };

  // ===== LOCAL STORAGE =====
  const storage = {
    save() {
      try {
        const data = {
          wishlist: Array.from(state.wishlist),
          ratings: state.ratings,
          comments: state.comments,
          theme: state.theme,
        };
        localStorage.setItem("neoTechVault", JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save to localStorage:", e);
      }
    },

    load() {
      try {
        const data = localStorage.getItem("neoTechVault");
        if (data) {
          const parsed = JSON.parse(data);
          state.wishlist = new Set(parsed.wishlist || []);
          state.ratings = parsed.ratings || {};
          state.comments = parsed.comments || {};
          state.theme = parsed.theme || "dark";
          return true;
        }
      } catch (e) {
        console.error("Failed to load from localStorage:", e);
      }
      return false;
    },
  };

  // ===== THEME MANAGEMENT =====
  const theme = {
    init() {
      storage.load();
      this.apply(state.theme, false);
    },

    apply(themeName, animate = true) {
      document.body.className =
        themeName === "light" ? "light-theme" : "dark-theme";
      state.theme = themeName;

      const icon = themeName === "light" ? "sun" : "moon";
      if (elements.themeToggle) {
        elements.themeToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
      }
      if (elements.themeToggleMobile) {
        elements.themeToggleMobile.innerHTML = `<i data-lucide="${icon}"></i><span>Toggle Theme</span>`;
      }

      // Reinitialize Lucide icons
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }

      storage.save();
    },

    toggle() {
      const newTheme = state.theme === "light" ? "dark" : "light";
      this.apply(newTheme, true);
    },
  };

  // ===== MOBILE MENU =====
  const mobileMenu = {
    toggle() {
      const isActive = elements.mobileNav.classList.toggle("active");
      elements.mobileOverlay.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "";
    },

    close() {
      elements.mobileNav.classList.remove("active");
      elements.mobileOverlay.classList.remove("active");
      document.body.style.overflow = "";
    },
  };

  // ===== HEADER SCROLL EFFECT =====
  const headerScroll = {
    init() {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          elements.header.classList.add("scrolled");
        } else {
          elements.header.classList.remove("scrolled");
        }
      });
    },
  };

  // ===== WISHLIST =====
  const wishlist = {
    toggle(productId) {
      if (state.wishlist.has(productId)) {
        state.wishlist.delete(productId);
        utils.showToast("Removed from wishlist");
      } else {
        state.wishlist.add(productId);
        utils.showToast("Added to wishlist");
      }
      storage.save();
      this.updateUI();
      products.render();

      // Track event
      utils.trackEvent("wishlist_action", {
        product_id: productId,
        action: state.wishlist.has(productId) ? "add" : "remove",
      });
    },

    updateUI() {
      if (elements.wishlistCount) {
        elements.wishlistCount.textContent = state.wishlist.size;
      }

      // Update modal button if product is selected
      if (state.selectedProduct) {
        const isInWishlist = state.wishlist.has(state.selectedProduct.id);
        if (elements.modalWishlistBtn) {
          elements.modalWishlistBtn.innerHTML = `
            <i data-lucide="${isInWishlist ? "heart" : "heart"}"></i>
            <span>${isInWishlist ? "In Wishlist" : "Add to Wishlist"}</span>
          `;
          if (isInWishlist) {
            elements.modalWishlistBtn.classList.add("active");
          } else {
            elements.modalWishlistBtn.classList.remove("active");
          }
          lucide.createIcons();
        }
      }
    },
  };

  // ===== RATINGS =====
  const ratings = {
    add(productId, rating) {
      if (!state.ratings[productId]) {
        state.ratings[productId] = [];
      }
      state.ratings[productId].push(rating);
      storage.save();

      utils.showToast(`Rated ${rating} star${rating !== 1 ? "s" : ""}!`);

      // Track event
      utils.trackEvent("product_rating", {
        product_id: productId,
        rating: rating,
      });

      this.updateModalUI(productId);
      products.render();
    },

    getAverage(productId) {
      const productRatings = state.ratings[productId] || [];
      if (productRatings.length === 0) return 0;
      const sum = productRatings.reduce((a, b) => a + b, 0);
      return sum / productRatings.length;
    },

    renderStars(container, productId, interactive = false) {
      if (!container) return;

      container.innerHTML = "";
      const avgRating = this.getAverage(productId);

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("svg");
        star.setAttribute("width", "24");
        star.setAttribute("height", "24");
        star.setAttribute("viewBox", "0 0 24 24");
        star.setAttribute("fill", i <= avgRating ? "#fbbf24" : "none");
        star.setAttribute(
          "stroke",
          i <= avgRating ? "#fbbf24" : "currentColor"
        );
        star.setAttribute("stroke-width", "2");
        star.innerHTML =
          '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>';

        if (interactive) {
          star.style.cursor = "pointer";
          star.addEventListener("click", () => {
            this.add(productId, i);
          });
        }

        container.appendChild(star);
      }
    },

    updateModalUI(productId) {
      this.renderStars(elements.modalRating, productId, true);

      const count = state.ratings[productId]?.length || 0;
      if (elements.modalRatingCount) {
        elements.modalRatingCount.textContent = `(${count} review${
          count !== 1 ? "s" : ""
        })`;
      }
    },
  };

  // ===== COMMENTS =====
  const comments = {
    add(productId, text) {
      if (!text || text.trim().length === 0) {
        utils.showToast("Please enter a comment");
        return;
      }

      if (!state.comments[productId]) {
        state.comments[productId] = [];
      }

      const comment = {
        id: Date.now(),
        text: text.trim(),
        author: `User${Math.floor(Math.random() * 1000)}`,
        date: new Date().toLocaleDateString(),
      };

      state.comments[productId].unshift(comment);
      storage.save();

      this.render(productId);
      utils.showToast("Comment posted!");

      // Track event
      utils.trackEvent("comment_posted", {
        product_id: productId,
      });

      // Clear input
      if (elements.commentInput) {
        elements.commentInput.value = "";
      }
    },

    render(productId) {
      if (!elements.commentsList || !elements.commentsCount) return;

      const productComments = state.comments[productId] || [];
      elements.commentsCount.textContent = `(${productComments.length})`;

      if (productComments.length === 0) {
        elements.commentsList.innerHTML =
          '<div class="empty-comments">No comments yet. Be the first to comment!</div>';
        return;
      }

      elements.commentsList.innerHTML = productComments
        .map(
          (comment) => `
        <div class="comment-item">
          <div class="comment-header">
            <span class="comment-author">${utils.escapeHtml(
              comment.author
            )}</span>
            <span class="comment-date">${utils.escapeHtml(comment.date)}</span>
          </div>
          <p class="comment-text">${utils.escapeHtml(comment.text)}</p>
        </div>
      `
        )
        .join("");
    },
  };

  // ===== PRODUCTS =====
  const products = {
    init() {
      this.populateCategories();
      this.filter();
    },

    populateCategories() {
      const categories = [
        "all",
        ...new Set(state.products.map((p) => p.category)),
      ];
      elements.categoryFilter.innerHTML = categories
        .map(
          (cat) =>
            `<option value="${cat}">${
              cat === "all" ? "All Categories" : cat
            }</option>`
        )
        .join("");
    },

    filter() {
      let filtered = [...state.products];

      // Search filter
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
      }

      // Category filter
      if (state.selectedCategory && state.selectedCategory !== "all") {
        filtered = filtered.filter(
          (p) => p.category === state.selectedCategory
        );
      }

      // Sort
      switch (state.sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort(
            (a, b) => ratings.getAverage(b.id) - ratings.getAverage(a.id)
          );
          break;
      }

      state.filteredProducts = filtered;
      this.render();
    },

    render() {
      if (!elements.productsGrid) return;

      if (state.filteredProducts.length === 0) {
        elements.productsGrid.style.display = "none";
        elements.emptyState.classList.remove("hidden");
        return;
      }

      elements.productsGrid.style.display = "grid";
      elements.emptyState.classList.add("hidden");

      elements.productsGrid.innerHTML = state.filteredProducts
        .map((product) => {
          const avgRating = ratings.getAverage(product.id);
          const isInWishlist = state.wishlist.has(product.id);

          return `
          <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
              <img src="${product.image}" alt="${utils.escapeHtml(
            product.title
          )}" class="product-image" loading="lazy">
              ${
                product.hotDeal
                  ? '<div class="product-badge"><i data-lucide="zap"></i>HOT DEAL</div>'
                  : ""
              }
              <div class="wishlist-icon ${
                isInWishlist ? "active" : ""
              }" data-wishlist-id="${product.id}">
                <i data-lucide="heart"></i>
              </div>
            </div>
            <div class="product-info">
              <div class="product-header">
                <span class="product-category">${product.category}</span>
                <div class="product-rating">
                  <i data-lucide="star"></i>
                  <span>${avgRating.toFixed(1)}</span>
                </div>
              </div>
              <h3 class="product-title">${utils.escapeHtml(product.title)}</h3>
              <p class="product-description">${utils.escapeHtml(
                product.description
              )}</p>
              <div class="product-footer">
                <div class="product-price-wrapper">
                  <div class="product-price">${utils.formatPrice(
                    product.price
                  )}</div>
                  <div class="product-price-label">Best price</div>
                </div>
                <button class="product-cta">View Deal</button>
              </div>
            </div>
          </div>
        `;
        })
        .join("");

      // Reinitialize Lucide icons
      lucide.createIcons();

      // Add event listeners
      this.attachEventListeners();
    },

    attachEventListeners() {
      // Product cards
      document.querySelectorAll(".product-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          if (!e.target.closest(".wishlist-icon")) {
            const productId = parseInt(card.dataset.productId);
            modal.open(productId);
          }
        });
      });

      // Wishlist buttons
      document.querySelectorAll(".wishlist-icon").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const productId = parseInt(btn.dataset.wishlistId);
          wishlist.toggle(productId);
        });
      });
    },
  };

  // ===== MODAL =====
  const modal = {
    open(productId) {
      const product = state.products.find((p) => p.id === productId);
      if (!product) return;

      state.selectedProduct = product;

      // Populate modal
      elements.modalTitle.textContent = product.title;
      elements.modalImage.src = product.image;
      elements.modalImage.alt = product.title;
      elements.modalPrice.textContent = utils.formatPrice(product.price);
      elements.modalCategory.textContent = product.category;
      elements.modalDescription.textContent = product.description;

      // Features
      elements.modalFeatures.innerHTML = product.features
        .map((f) => `<div class="feature-item">${utils.escapeHtml(f)}</div>`)
        .join("");

      // Prices
      elements.amazonPrice.textContent = utils.formatPrice(product.amazonPrice);
      elements.ebayPrice.textContent = utils.formatPrice(product.ebayPrice);
      elements.amazonLink.href = product.amazonLink;
      elements.ebayLink.href = product.ebayLink;

      // Ratings
      ratings.updateModalUI(product.id);

      // Comments
      comments.render(product.id);

      // Wishlist button
      wishlist.updateUI();

      // Show modal
      elements.modalBackdrop.classList.remove("hidden");
      document.body.style.overflow = "hidden";

      // Reinitialize Lucide icons
      lucide.createIcons();

      // Track event
      utils.trackEvent("product_view", {
        product_id: productId,
        product_name: product.title,
      });
    },

    close() {
      elements.modalBackdrop.classList.add("hidden");
      document.body.style.overflow = "";
      state.selectedProduct = null;
    },
  };

  // ===== SHARE =====
  const share = {
    open() {
      if (!state.selectedProduct) return;

      // Try native share first
      if (navigator.share) {
        navigator
          .share({
            title: state.selectedProduct.title,
            text: `Check out ${
              state.selectedProduct.title
            } for ${utils.formatPrice(state.selectedProduct.price)}`,
            url: window.location.href,
          })
          .catch(() => {
            this.showModal();
          });
      } else {
        this.showModal();
      }
    },

    showModal() {
      elements.shareModal.classList.remove("hidden");
    },

    close() {
      elements.shareModal.classList.add("hidden");
    },

    copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        utils.showToast("Link copied to clipboard!");
        this.close();
      });
    },
  };

  // ===== EVENT LISTENERS =====
  const events = {
    init() {
      // Header
      elements.hamburger?.addEventListener("click", () => mobileMenu.toggle());
      elements.mobileOverlay?.addEventListener("click", () =>
        mobileMenu.close()
      );
      elements.themeToggle?.addEventListener("click", () => theme.toggle());
      elements.themeToggleMobile?.addEventListener("click", () =>
        theme.toggle()
      );

      // Hero
      elements.exploreBtn?.addEventListener("click", () => {
        document
          .getElementById("products")
          ?.scrollIntoView({ behavior: "smooth" });
      });
      elements.hotDealsBtn?.addEventListener("click", () => {
        document
          .getElementById("products")
          ?.scrollIntoView({ behavior: "smooth" });
      });

      // Search and filters
      elements.searchInput?.addEventListener(
        "input",
        utils.debounce((e) => {
          state.searchQuery = e.target.value;
          products.filter();
        }, 300)
      );

      elements.categoryFilter?.addEventListener("change", (e) => {
        state.selectedCategory = e.target.value;
        products.filter();
      });

      elements.sortSelect?.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        products.filter();
      });

      elements.filterToggle?.addEventListener("click", () => {
        elements.filters.classList.toggle("active");
      });

      // Modal
      elements.modalClose?.addEventListener("click", () => modal.close());
      elements.modalBackdrop?.addEventListener("click", (e) => {
        if (e.target === elements.modalBackdrop) {
          modal.close();
        }
      });

      elements.modalWishlistBtn?.addEventListener("click", () => {
        if (state.selectedProduct) {
          wishlist.toggle(state.selectedProduct.id);
        }
      });

      elements.modalShareBtn?.addEventListener("click", () => share.open());

      // Comments
      elements.commentSubmit?.addEventListener("click", () => {
        if (state.selectedProduct) {
          comments.add(state.selectedProduct.id, elements.commentInput.value);
        }
      });

      elements.commentInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && state.selectedProduct) {
          comments.add(state.selectedProduct.id, elements.commentInput.value);
        }
      });

      // Share modal
      elements.shareClose?.addEventListener("click", () => share.close());
      elements.copyLinkBtn?.addEventListener("click", () => share.copyLink());

      elements.shareModal?.addEventListener("click", (e) => {
        if (e.target === elements.shareModal) {
          share.close();
        }
      });

      // Contact buttons
      elements.contactBtn?.addEventListener("click", () => {
        window.location.href = "mailto:wisdom166chiboy@gmail.com";
      });
      elements.contactBtnMobile?.addEventListener("click", () => {
        window.location.href = "mailto:wisdom166chiboy@gmail.com";
        mobileMenu.close();
      });

      // Mobile nav links
      document.querySelectorAll(".mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => mobileMenu.close());
      });

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          if (!elements.modalBackdrop.classList.contains("hidden")) {
            modal.close();
          }
          if (!elements.shareModal.classList.contains("hidden")) {
            share.close();
          }
          if (elements.mobileNav.classList.contains("active")) {
            mobileMenu.close();
          }
        }
      });
    },
  };

  // ===== INITIALIZATION =====
  function init() {
    // Load saved data
    storage.load();

    // Initialize modules
    theme.init();
    headerScroll.init();
    products.init();
    wishlist.updateUI();
    events.init();

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    console.log("NeoTechVault initialized successfully!");
  }

  // Start the app when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
