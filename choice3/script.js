/**
 * NeoTechVault - Complete JavaScript with Firebase and Share Functionality
 */

// FIREBASE CONFIGURATION - Already set up
const firebaseConfig = {
  apiKey: "AIzaSyBzqMHczAwLXTgrz69v_15bY9uni1OS_AE",
  authDomain: "neotechvault.firebaseapp.com",
  databaseURL: "https://neotechvault-default-rtdb.firebaseio.com",
  projectId: "neotechvault",
  storageBucket: "neotechvault.firebasestorage.app",
  messagingSenderId: "657469795605",
  appId: "1:657469795605:web:1c83b7a6e04e41bdb10d1c",
  measurementId: "G-5NVXVHRRNE",
};

// Initialize Firebase
let database;
try {
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  console.log("✅ Firebase initialized successfully!");
} catch (error) {
  console.warn("⚠️ Firebase not initialized:", error.message);
}

(function () {
  "use strict";

  // PRODUCTS DATA
  const PRODUCTS = [
    {
      id: 1,
      title: "Aurora True Wireless Earbuds Pro",
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
      title: "Nebula Smartwatch Pro Elite",
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
      title: "HyperDrive USB-C Hub 7-in-1",
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
      title: "ProLight LED Desk Lamp Smart",
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
      title: "MechPro Gaming Keyboard RGB",
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
    {
      id: 7,
      title: "VisionPro 4K Webcam Ultra",
      price: 149.99,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=800",
      description:
        "Professional 4K webcam with AI auto-framing, dual microphones, and low-light enhancement.",
      features: ["4K Resolution", "AI Auto-Frame", "Dual Mics", "HDR Support"],
      amazonPrice: 149.99,
      ebayPrice: 139.99,
      amazonLink: "https://amazon.com/dp/example7",
      ebayLink: "https://ebay.com/itm/example7",
      hotDeal: false,
      inStock: true,
    },
    {
      id: 8,
      title: "ThunderBolt SSD 2TB Portable",
      price: 249.99,
      category: "Storage",
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800",
      description:
        "Ultra-fast portable SSD with Thunderbolt 3 connectivity and military-grade encryption.",
      features: ["2TB Storage", "1050MB/s Speed", "USB-C", "Shock Resistant"],
      amazonPrice: 249.99,
      ebayPrice: 239.99,
      amazonLink: "https://amazon.com/dp/example8",
      ebayLink: "https://ebay.com/itm/example8",
      hotDeal: true,
      inStock: true,
    },
    {
      id: 9,
      title: "AeroMouse Wireless Precision",
      price: 69.99,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800",
      description:
        "Ergonomic wireless mouse with 16000 DPI sensor and 70-hour battery life.",
      features: ["16000 DPI", "70h Battery", "6 Buttons", "RGB Lighting"],
      amazonPrice: 69.99,
      ebayPrice: 64.99,
      amazonLink: "https://amazon.com/dp/example9",
      ebayLink: "https://ebay.com/itm/example9",
      hotDeal: false,
      inStock: true,
    },
    {
      id: 10,
      title: "SmartClean UV Sanitizer Pro",
      price: 39.99,
      category: "Home",
      image:
        "https://images.unsplash.com/photo-1733152121054-8c3d7a8d7b3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFNtYXJ0Q2xlYW4lMjBVViUyMFNhbml0aXplciUyMFByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      description:
        "UV-C sanitizer for phones and accessories with wireless charging capability.",
      features: [
        "UV-C Light",
        "Wireless Charging",
        "Auto Shutoff",
        "Portable Design",
      ],
      amazonPrice: 39.99,
      ebayPrice: 37.99,
      amazonLink: "https://amazon.com/dp/example10",
      ebayLink: "https://ebay.com/itm/example10",
      hotDeal: false,
      inStock: true,
    },
    {
      id: 11,
      title: "StreamPro Ring Light Studio",
      price: 79.99,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=800",
      description:
        "18-inch ring light with adjustable color temperature and remote control for content creators.",
      features: [
        "18-inch Ring",
        "3200K-5600K",
        "Remote Control",
        "Phone Mount",
      ],
      amazonPrice: 79.99,
      ebayPrice: 74.99,
      amazonLink: "https://amazon.com/dp/example11",
      ebayLink: "https://ebay.com/itm/example11",
      hotDeal: true,
      inStock: true,
    },
    {
      id: 12,
      title: "ZenPods Sleep Earbuds",
      price: 99.99,
      category: "Audio",
      image:
        "https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=800",
      description:
        "Ultra-comfortable sleep earbuds with noise masking and sleep tracking technology.",
      features: [
        "Sleep Tracking",
        "Noise Masking",
        "32h Battery",
        "Comfort Fit",
      ],
      amazonPrice: 99.99,
      ebayPrice: 94.99,
      amazonLink: "https://amazon.com/dp/example12",
      ebayLink: "https://ebay.com/itm/example12",
      hotDeal: false,
      inStock: true,
    },
    {
      id: 13,
      title: "PowerBank Pro 20000mAh",
      price: 54.99,
      category: "Power",
      image:
        "https://media.istockphoto.com/id/1355066262/photo/control-panel-of-external-powerbank-with-two-usb-outputs-on-a-white-background-powerbank-for.webp?a=1&b=1&s=612x612&w=0&k=20&c=wfVOe4yVzaVDFd0ykIf_6co97BV7Df7i3ZZLlDsDZGo=",
      description:
        "High-capacity power bank with fast charging and digital display showing battery percentage.",
      features: ["20000mAh", "65W Output", "LED Display", "3 Ports"],
      amazonPrice: 54.99,
      ebayPrice: 51.99,
      amazonLink: "https://amazon.com/dp/example13",
      ebayLink: "https://ebay.com/itm/example13",
      hotDeal: true,
      inStock: true,
    },
    {
      id: 14,
      title: "AirPurifier Smart Mini",
      price: 119.99,
      category: "Home",
      image:
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800",
      description:
        "Compact air purifier with HEPA filter and smart app control for rooms up to 300 sq ft.",
      features: [
        "HEPA Filter",
        "App Control",
        "Quiet Mode",
        "Air Quality Sensor",
      ],
      amazonPrice: 119.99,
      ebayPrice: 114.99,
      amazonLink: "https://amazon.com/dp/example14",
      ebayLink: "https://ebay.com/itm/example14",
      hotDeal: false,
      inStock: true,
    },
    {
      id: 15,
      title: "GamerPro Headset Elite 7.1",
      price: 159.99,
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=800",
      description:
        "Premium gaming headset with 7.1 surround sound, noise-canceling mic, and RGB lighting.",
      features: [
        "7.1 Surround",
        "50mm Drivers",
        "Noise-Cancel Mic",
        "Memory Foam",
      ],
      amazonPrice: 159.99,
      ebayPrice: 149.99,
      amazonLink: "https://amazon.com/dp/example15",
      ebayLink: "https://ebay.com/itm/example15",
      hotDeal: true,
      inStock: true,
    },
  ];

  // STATE MANAGEMENT
  const state = {
    products: PRODUCTS,
    filteredProducts: PRODUCTS,
    wishlist: new Set(),
    selectedProduct: null,
    searchQuery: "",
    selectedCategory: "all",
    sortBy: "featured",
    theme: "dark",
    userName: null,
  };

  // DOM ELEMENTS
  const elements = {
    header: document.getElementById("header"),
    hamburger: document.getElementById("hamburger"),
    mobileNav: document.getElementById("mobileNav"),
    mobileOverlay: document.getElementById("mobileOverlay"),
    mobileCloseBtn: document.getElementById("mobileCloseBtn"),
    themeToggle: document.getElementById("themeToggle"),
    themeToggleMobile: document.getElementById("themeToggleMobile"),
    wishlistCount: document.getElementById("wishlistCount"),
    exploreBtn: document.getElementById("exploreBtn"),
    hotDealsBtn: document.getElementById("hotDealsBtn"),
    searchInput: document.getElementById("searchInput"),
    categoryFilter: document.getElementById("categoryFilter"),
    sortSelect: document.getElementById("sortSelect"),
    filterToggle: document.getElementById("filterToggle"),
    filters: document.getElementById("filters"),
    productsGrid: document.getElementById("productsGrid"),
    emptyState: document.getElementById("emptyState"),
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
    commentInput: document.getElementById("commentInput"),
    commentSubmit: document.getElementById("commentSubmit"),
    commentsList: document.getElementById("commentsList"),
    commentsCount: document.getElementById("commentsCount"),
    toast: document.getElementById("toast"),
    contactBtn: document.getElementById("contactBtn"),
    contactBtnMobile: document.getElementById("contactBtnMobile"),
    wishlistBtnHeader: document.getElementById("wishlistBtnHeader"),
    userNameModal: document.getElementById("userNameModal"),
    userNameInput: document.getElementById("userNameInput"),
    saveUserName: document.getElementById("saveUserName"),
    shareModal: document.getElementById("shareModal"),
    shareModalClose: document.getElementById("shareModalClose"),
    shareModalBackdrop: document.getElementById("shareModalBackdrop"),
    copyLinkBtn: document.getElementById("copyLinkBtn"),
  };

  // UTILITY FUNCTIONS
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

  // LOCAL STORAGE
  const storage = {
    save() {
      try {
        const data = {
          wishlist: Array.from(state.wishlist),
          theme: state.theme,
          userName: state.userName,
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
          state.theme = parsed.theme || "dark";
          state.userName = parsed.userName || null;
          return true;
        }
      } catch (e) {
        console.error("Failed to load from localStorage:", e);
      }
      return false;
    },
  };

  // FIREBASE OPERATIONS
  const firebase_ops = {
    getRatings(productId, callback) {
      if (!database) return callback([]);

      const ratingsRef = database.ref(`ratings/${productId}`);
      ratingsRef.on("value", (snapshot) => {
        const ratings = [];
        snapshot.forEach((child) => {
          ratings.push(child.val());
        });
        callback(ratings);
      });
    },

    addRating(productId, rating, userId) {
      if (!database) {
        utils.showToast("Firebase not connected");
        return;
      }

      const ratingRef = database.ref(`ratings/${productId}/${userId}`);
      ratingRef
        .set(rating)
        .then(() => {
          utils.showToast(`Rated ${rating} star${rating !== 1 ? "s" : ""}!`);
        })
        .catch((error) => {
          console.error("Error adding rating:", error);
          utils.showToast("Failed to add rating");
        });
    },

    getComments(productId, callback) {
      if (!database) return callback([]);

      const commentsRef = database
        .ref(`comments/${productId}`)
        .orderByChild("timestamp");
      commentsRef.on("value", (snapshot) => {
        const comments = [];
        snapshot.forEach((child) => {
          comments.push({ id: child.key, ...child.val() });
        });
        callback(comments.reverse());
      });
    },

    addComment(productId, text, userName) {
      if (!database) {
        utils.showToast("Firebase not connected");
        return;
      }

      const commentsRef = database.ref(`comments/${productId}`);
      const newComment = {
        text: text.trim(),
        author: userName,
        timestamp: Date.now(),
        date: new Date().toLocaleDateString(),
      };

      commentsRef
        .push(newComment)
        .then(() => {
          utils.showToast("Comment posted!");
          elements.commentInput.value = "";
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
          utils.showToast("Failed to post comment");
        });
    },
  };

  // THEME MANAGEMENT
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

  // MOBILE MENU
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

  // HEADER SCROLL
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

  // WISHLIST
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

      utils.trackEvent("wishlist_action", {
        product_id: productId,
        action: state.wishlist.has(productId) ? "add" : "remove",
      });
    },

    updateUI() {
      if (elements.wishlistCount) {
        elements.wishlistCount.textContent = state.wishlist.size;
      }

      if (state.selectedProduct) {
        const isInWishlist = state.wishlist.has(state.selectedProduct.id);
        if (elements.modalWishlistBtn) {
          elements.modalWishlistBtn.innerHTML = `
            <i data-lucide="heart"></i>
            <span>${isInWishlist ? "In Wishlist" : "Add to Wishlist"}</span>
          `;
          lucide.createIcons();
        }
      }
    },
  };

  // RATINGS
  const ratings = {
    getUserId() {
      let userId = localStorage.getItem("neotech_user_id");
      if (!userId) {
        userId =
          "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("neotech_user_id", userId);
      }
      return userId;
    },

    add(productId, rating) {
      const userId = this.getUserId();
      firebase_ops.addRating(productId, rating, userId);
      utils.trackEvent("product_rating", {
        product_id: productId,
        rating: rating,
      });
    },

    renderStars(container, productId, ratings, interactive = false) {
      if (!container) return;

      container.innerHTML = "";
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
          : 0;

      for (let i = 1; i <= 5; i++) {
        const star = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        star.setAttribute("width", "24");
        star.setAttribute("height", "24");
        star.setAttribute("viewBox", "0 0 24 24");
        star.setAttribute("fill", "none");
        star.setAttribute("stroke", "#fbbf24");
        star.setAttribute("stroke-width", "2.5");

        const polygon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polygon"
        );
        polygon.setAttribute(
          "points",
          "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        );

        if (i <= Math.round(avgRating)) {
          star.classList.add("filled");
          star.setAttribute("fill", "#fbbf24");
        }

        star.appendChild(polygon);

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
      firebase_ops.getRatings(productId, (ratings) => {
        this.renderStars(elements.modalRating, productId, ratings, true);

        const count = ratings.length;
        if (elements.modalRatingCount) {
          elements.modalRatingCount.textContent = `(${count} review${
            count !== 1 ? "s" : ""
          })`;
        }
      });
    },
  };

  // USER NAME
  const userName = {
    check() {
      if (!state.userName) {
        this.showModal();
      }
    },

    showModal() {
      elements.userNameModal.classList.remove("hidden");
    },

    save() {
      const name = elements.userNameInput.value.trim();
      if (name && name.length > 0) {
        state.userName = name;
        storage.save();
        elements.userNameModal.classList.add("hidden");
        utils.showToast(`Welcome, ${name}!`);
      } else {
        utils.showToast("Please enter your name");
      }
    },
  };

  // COMMENTS
  const comments = {
    add(productId, text) {
      if (!text || text.trim().length === 0) {
        utils.showToast("Please enter a comment");
        return;
      }

      if (!state.userName) {
        userName.check();
        return;
      }

      firebase_ops.addComment(productId, text, state.userName);
      utils.trackEvent("comment_posted", { product_id: productId });
    },

    render(productId) {
      if (!elements.commentsList || !elements.commentsCount) return;

      firebase_ops.getComments(productId, (comments) => {
        elements.commentsCount.textContent = `(${comments.length})`;

        if (comments.length === 0) {
          elements.commentsList.innerHTML =
            '<div class="empty-comments">No comments yet. Be the first to comment!</div>';
          return;
        }

        elements.commentsList.innerHTML = comments
          .map(
            (comment) => `
          <div class="comment-item">
            <div class="comment-header">
              <span class="comment-author">${utils.escapeHtml(
                comment.author
              )}</span>
              <span class="comment-date">${utils.escapeHtml(
                comment.date
              )}</span>
            </div>
            <p class="comment-text">${utils.escapeHtml(comment.text)}</p>
          </div>
        `
          )
          .join("");
      });
    },
  };

  // SHARE FUNCTIONALITY
  const share = {
    open() {
      if (!state.selectedProduct) return;

      elements.shareModalBackdrop.classList.remove("hidden");
      document.body.style.overflow = "hidden";

      utils.trackEvent("share_modal_opened", {
        product_id: state.selectedProduct.id,
        product_name: state.selectedProduct.title,
      });
    },

    close() {
      elements.shareModalBackdrop.classList.add("hidden");
      document.body.style.overflow = "";
    },

    getShareUrl() {
      if (!state.selectedProduct) return window.location.href;

      // Get the best price link (Amazon vs eBay)
      const bestPrice = Math.min(
        state.selectedProduct.amazonPrice,
        state.selectedProduct.ebayPrice
      );

      return bestPrice === state.selectedProduct.amazonPrice
        ? state.selectedProduct.amazonLink
        : state.selectedProduct.ebayLink;
    },

    getShareText() {
      if (!state.selectedProduct) return "Check out NeoTechVault!";

      const product = state.selectedProduct;
      const bestPrice = Math.min(product.amazonPrice, product.ebayPrice);

      return `Check out ${product.title} for only ${utils.formatPrice(
        bestPrice
      )}! 🔥`;
    },

    copyLink() {
      const url = this.getShareUrl();

      navigator.clipboard
        .writeText(url)
        .then(() => {
          utils.showToast("Link copied to clipboard!");
          this.close();
        })
        .catch(() => {
          utils.showToast("Failed to copy link");
        });

      utils.trackEvent("share_link_copied", {
        product_id: state.selectedProduct?.id,
      });
    },

    toWhatsApp() {
      const text = encodeURIComponent(this.getShareText());
      const url = encodeURIComponent(this.getShareUrl());
      window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");

      utils.trackEvent("share_whatsapp", {
        product_id: state.selectedProduct?.id,
      });
    },

    toFacebook() {
      const url = encodeURIComponent(this.getShareUrl());
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );

      utils.trackEvent("share_facebook", {
        product_id: state.selectedProduct?.id,
      });
    },

    toTwitter() {
      const text = encodeURIComponent(this.getShareText());
      const url = encodeURIComponent(this.getShareUrl());
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank"
      );

      utils.trackEvent("share_twitter", {
        product_id: state.selectedProduct?.id,
      });
    },

    toLinkedIn() {
      const url = encodeURIComponent(this.getShareUrl());
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank"
      );

      utils.trackEvent("share_linkedin", {
        product_id: state.selectedProduct?.id,
      });
    },

    toTelegram() {
      const text = encodeURIComponent(this.getShareText());
      const url = encodeURIComponent(this.getShareUrl());
      window.open(`https://t.me/share/url?text=${text}&url=${url}`, "_blank");

      utils.trackEvent("share_telegram", {
        product_id: state.selectedProduct?.id,
      });
    },

    toReddit() {
      const title = encodeURIComponent(
        state.selectedProduct?.title || "Check this out!"
      );
      const url = encodeURIComponent(this.getShareUrl());
      window.open(
        `https://reddit.com/submit?title=${title}&url=${url}`,
        "_blank"
      );

      utils.trackEvent("share_reddit", {
        product_id: state.selectedProduct?.id,
      });
    },

    toEmail() {
      const subject = encodeURIComponent(this.getShareText());
      const body = encodeURIComponent(
        `${this.getShareText()}\n\n${this.getShareUrl()}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;

      utils.trackEvent("share_email", {
        product_id: state.selectedProduct?.id,
      });
    },
  };

  // PRODUCTS
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

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
      }

      if (state.selectedCategory && state.selectedCategory !== "all") {
        filtered = filtered.filter(
          (p) => p.category === state.selectedCategory
        );
      }

      switch (state.sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
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
          const isInWishlist = state.wishlist.has(product.id);
          const bestPrice = Math.min(product.amazonPrice, product.ebayPrice);

          return `
          <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
              <img src="${product.image}" alt="${utils.escapeHtml(
            product.title
          )}" class="product-image" loading="lazy">
              ${
                product.hotDeal
                  ? '<div class="product-badge"><i data-lucide="zap"></i>HOT</div>'
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
                  <svg class="star-filled" width="16" height="16" viewBox="0 0 24 24" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <span id="rating-${product.id}">0.0</span>
                </div>
              </div>
              <h3 class="product-title">${utils.escapeHtml(product.title)}</h3>
              <p class="product-description">${utils.escapeHtml(
                product.description
              )}</p>
              <div class="product-footer">
                <div class="product-price-wrapper">
                  <div class="product-price">${utils.formatPrice(
                    bestPrice
                  )}</div>
                  <div class="product-price-label">Best price</div>
                </div>
                <button class="product-cta">View</button>
              </div>
            </div>
          </div>
        `;
        })
        .join("");

      lucide.createIcons();
      this.attachEventListeners();
      this.loadRatings();
    },

    loadRatings() {
      state.filteredProducts.forEach((product) => {
        firebase_ops.getRatings(product.id, (ratings) => {
          const avg =
            ratings.length > 0
              ? (
                  ratings.reduce((sum, r) => sum + r, 0) / ratings.length
                ).toFixed(1)
              : "0.0";
          const ratingEl = document.getElementById(`rating-${product.id}`);
          if (ratingEl) {
            ratingEl.textContent = avg;
          }
        });
      });
    },

    attachEventListeners() {
      document.querySelectorAll(".product-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          if (!e.target.closest(".wishlist-icon")) {
            const productId = parseInt(card.dataset.productId);
            modal.open(productId);
          }
        });
      });

      document.querySelectorAll(".wishlist-icon").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const productId = parseInt(btn.dataset.wishlistId);
          wishlist.toggle(productId);
        });
      });
    },
  };

  // MODAL
  const modal = {
    open(productId) {
      const product = state.products.find((p) => p.id === productId);
      if (!product) return;

      state.selectedProduct = product;
      const bestPrice = Math.min(product.amazonPrice, product.ebayPrice);

      elements.modalTitle.textContent = product.title;
      elements.modalImage.src = product.image;
      elements.modalImage.alt = product.title;
      elements.modalPrice.textContent = utils.formatPrice(bestPrice);
      elements.modalCategory.textContent = product.category;
      elements.modalDescription.textContent = product.description;

      elements.modalFeatures.innerHTML = product.features
        .map((f) => `<div class="feature-item">${utils.escapeHtml(f)}</div>`)
        .join("");

      elements.amazonPrice.textContent = utils.formatPrice(product.amazonPrice);
      elements.ebayPrice.textContent = utils.formatPrice(product.ebayPrice);
      elements.amazonLink.href = product.amazonLink;
      elements.ebayLink.href = product.ebayLink;

      ratings.updateModalUI(product.id);
      comments.render(product.id);
      wishlist.updateUI();

      elements.modalBackdrop.classList.remove("hidden");
      document.body.style.overflow = "hidden";

      lucide.createIcons();

      // Add Product Schema Markup for SEO
      const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.title,
        image: product.image,
        description: product.description,
        offers: {
          "@type": "AggregateOffer",
          lowPrice: Math.min(product.amazonPrice, product.ebayPrice),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      };

      // Remove any existing product schema
      const existingSchema = document.getElementById("product-schema");
      if (existingSchema) {
        existingSchema.remove();
      }

      // Add to page
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "product-schema";
      script.text = JSON.stringify(productSchema);
      document.head.appendChild(script);

      utils.trackEvent("product_view", {
        product_id: productId,
        product_name: product.title,
      });
    },

    close() {
      elements.modalBackdrop.classList.add("hidden");
      document.body.style.overflow = "";
      state.selectedProduct = null;

      // Remove product schema when modal closes
      const existingSchema = document.getElementById("product-schema");
      if (existingSchema) {
        existingSchema.remove();
      }
    },
  };

  // EVENT LISTENERS
  const events = {
    init() {
      elements.hamburger?.addEventListener("click", () => mobileMenu.toggle());
      elements.mobileOverlay?.addEventListener("click", () =>
        mobileMenu.close()
      );
      elements.mobileCloseBtn?.addEventListener("click", () =>
        mobileMenu.close()
      );

      elements.themeToggle?.addEventListener("click", () => theme.toggle());
      elements.themeToggleMobile?.addEventListener("click", () =>
        theme.toggle()
      );

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

      elements.modalShareBtn?.addEventListener("click", () => {
        share.open();
      });

      // Share modal events
      elements.shareModalClose?.addEventListener("click", () => share.close());
      elements.shareModalBackdrop?.addEventListener("click", (e) => {
        if (e.target === elements.shareModalBackdrop) {
          share.close();
        }
      });

      elements.copyLinkBtn?.addEventListener("click", () => share.copyLink());

      // Social media share buttons
      document
        .getElementById("shareWhatsApp")
        ?.addEventListener("click", () => share.toWhatsApp());
      document
        .getElementById("shareFacebook")
        ?.addEventListener("click", () => share.toFacebook());
      document
        .getElementById("shareTwitter")
        ?.addEventListener("click", () => share.toTwitter());
      document
        .getElementById("shareLinkedIn")
        ?.addEventListener("click", () => share.toLinkedIn());
      document
        .getElementById("shareTelegram")
        ?.addEventListener("click", () => share.toTelegram());
      document
        .getElementById("shareReddit")
        ?.addEventListener("click", () => share.toReddit());
      document
        .getElementById("shareEmail")
        ?.addEventListener("click", () => share.toEmail());

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

      elements.contactBtn?.addEventListener("click", () => {
        window.location.href = "mailto:wisdom166chiboy@gmail.com";
      });

      elements.contactBtnMobile?.addEventListener("click", () => {
        window.location.href = "mailto:wisdom166chiboy@gmail.com";
        mobileMenu.close();
      });

      elements.saveUserName?.addEventListener("click", () => {
        userName.save();
      });

      elements.userNameInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          userName.save();
        }
      });

      document.querySelectorAll(".mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => mobileMenu.close());
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          if (!elements.modalBackdrop.classList.contains("hidden")) {
            modal.close();
          }
          if (!elements.shareModalBackdrop.classList.contains("hidden")) {
            share.close();
          }
          if (elements.mobileNav.classList.contains("active")) {
            mobileMenu.close();
          }
        }
      });
    },
  };

  // INITIALIZATION
  function init() {
    storage.load();
    theme.init();
    headerScroll.init();
    products.init();
    wishlist.updateUI();
    events.init();

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    console.log("✅ NeoTechVault initialized successfully!");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
