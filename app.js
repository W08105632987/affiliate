/**
 * NeoTechVault - Main Application
 * Modular, accessible, and performant product showcase
 */

const App = (() => {
  "use strict";

  // ===== CONSTANTS =====
  const STORAGE_KEY = "ntv_app_state";
  const TOAST_DURATION = 3000;
  const DEBOUNCE_DELAY = 300;

  // ===== DEMO DATA =====
  const demoProducts = [
    {
      id: "p1",
      title: "Aurora True Wireless Earbuds",
      price: 79.99,
      category: "Audio",
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
      desc: "Compact TWS earbuds with ANC and 40h battery. Perfect for commuters and gamers.",
      amazon: "https://example.com/amazon-affiliate-p1",
      ebay: "https://example.com/ebay-affiliate-p1",
      amazonPrice: "$79.99",
      ebayPrice: "$75.50",
      hotDeal: true,
    },
    {
      id: "p2",
      title: "Nebula Smartwatch Pro",
      price: 199.0,
      category: "Wearables",
      img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop",
      desc: "Sleek smartwatch with ECG, long battery life and customizable watchfaces.",
      amazon: "https://example.com/amazon-affiliate-p2",
      ebay: "https://example.com/ebay-affiliate-p2",
      amazonPrice: "$199.00",
      ebayPrice: "$189.99",
      hotDeal: false,
    },
    {
      id: "p3",
      title: "Quantum Portable Charger 30W",
      price: 49.5,
      category: "Power",
      img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop",
      desc: "Compact 30W GaN charger with dual ports and fast charge technology.",
      amazon: "https://example.com/amazon-affiliate-p3",
      ebay: "https://example.com/ebay-affiliate-p3",
      amazonPrice: "$49.50",
      ebayPrice: "$47.99",
      hotDeal: true,
    },
    {
      id: "p4",
      title: "HyperDrive USB-C Hub",
      price: 89.99,
      category: "Accessories",
      img: "https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=800&auto=format&fit=crop",
      desc: "7-in-1 USB-C hub with 4K HDMI, USB 3.0, SD card reader.",
      amazon: "https://example.com/amazon-affiliate-p4",
      ebay: "https://example.com/ebay-affiliate-p4",
      amazonPrice: "$89.99",
      ebayPrice: "$84.99",
      hotDeal: false,
    },
    {
      id: "p5",
      title: "ProLight LED Desk Lamp",
      price: 59.99,
      category: "Home",
      img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
      desc: "Smart LED desk lamp with wireless charging and app control.",
      amazon: "https://example.com/amazon-affiliate-p5",
      ebay: "https://example.com/ebay-affiliate-p5",
      amazonPrice: "$59.99",
      ebayPrice: "$54.99",
      hotDeal: false,
    },
    {
      id: "p6",
      title: "MechPro Keyboard RGB",
      price: 129.99,
      category: "Gaming",
      img: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
      desc: "Mechanical gaming keyboard with RGB backlighting and hot-swappable switches.",
      amazon: "https://example.com/amazon-affiliate-p6",
      ebay: "https://example.com/ebay-affiliate-p6",
      amazonPrice: "$129.99",
      ebayPrice: "$119.99",
      hotDeal: true,
    },
  ];

  // ===== STATE =====
  const state = {
    products: demoProducts,
    wishlist: new Set(),
    ratings: {},
    comments: {},
    theme: null,
    currentProduct: null,
  };

  // ===== DOM ELEMENTS =====
  const els = {};

  // ===== UTILITY FUNCTIONS =====
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const escapeHtml = (str) => {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  };

  const debounce = (fn, ms = DEBOUNCE_DELAY) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), ms);
    };
  };

  const showToast = (message) => {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add("show");

    setTimeout(() => {
      els.toast.classList.remove("show");
    }, TOAST_DURATION);
  };

  // ===== STORAGE =====
  const Storage = {
    save() {
      try {
        const data = {
          wishlist: Array.from(state.wishlist),
          ratings: state.ratings,
          comments: state.comments,
          theme: state.theme,
        };
        const json = JSON.stringify(data);

        if (json.length > 4.5 * 1024 * 1024) {
          console.warn("State size approaching localStorage limit");
        }

        window.localStorage.setItem(STORAGE_KEY, json);
      } catch (e) {
        if (e.name === "QuotaExceededError") {
          console.error("localStorage quota exceeded");
          showToast("Storage full. Some data may not be saved.");
        } else {
          console.error("Failed to save state:", e);
        }
      }
    },

    load() {
      try {
        const json = window.localStorage.getItem(STORAGE_KEY);
        if (!json) return false;

        const data = JSON.parse(json);

        if (!data || typeof data !== "object") return false;

        if (Array.isArray(data.wishlist)) {
          state.wishlist = new Set(data.wishlist);
        }

        if (data.ratings && typeof data.ratings === "object") {
          state.ratings = data.ratings;
        }

        if (data.comments && typeof data.comments === "object") {
          state.comments = data.comments;
        }

        if (data.theme) {
          state.theme = data.theme;
        }

        return true;
      } catch (e) {
        console.error("Failed to load state:", e);
        return false;
      }
    },
  };

  // ===== THEME =====
  const Theme = {
    init() {
      if (!state.theme) {
        state.theme = window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
      }
      this.apply(state.theme, false);
    },

    apply(theme, animate = true) {
      if (animate) {
        document.documentElement.classList.add("theme-transitioning");
      }

      document.documentElement.setAttribute("data-theme", theme);
      state.theme = theme;
      const buttonText = theme === "light" ? "🌙 Dark" : "☀️ Light";
      if (els.themeToggle) els.themeToggle.textContent = buttonText;
      if (els.themeToggleMobile) els.themeToggleMobile.textContent = buttonText;
      Storage.save();

      if (animate) {
        setTimeout(() => {
          document.documentElement.classList.remove("theme-transitioning");
        }, 400);
      }
    },

    toggle() {
      this.apply(state.theme === "light" ? "dark" : "light", true);
    },
  };

  // ===== TYPING ANIMATION =====
  const TypingAnimation = {
    phrases: [
      "Discover tomorrow's gadgets today",
      "Shop with us today",
      "Find your perfect tech companion",
    ],
    phraseIndex: 0,
    charIndex: 0,
    isDeleting: false,

    start() {
      if (!els.typingText) return;
      this.type();
    },

    type() {
      const currentPhrase = this.phrases[this.phraseIndex];

      if (this.isDeleting) {
        els.typingText.textContent = currentPhrase.substring(
          0,
          this.charIndex - 1
        );
        this.charIndex--;
      } else {
        els.typingText.textContent = currentPhrase.substring(
          0,
          this.charIndex + 1
        );
        this.charIndex++;
      }

      let typeSpeed = this.isDeleting ? 50 : 100;

      if (!this.isDeleting && this.charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        typeSpeed = 500;
      }

      setTimeout(() => this.type(), typeSpeed);
    },
  };

  // ===== MOBILE MENU =====
  const MobileMenu = {
    toggle() {
      const isActive = els.mobileNav.classList.toggle("active");
      els.hamburger.classList.toggle("active");
      els.mobileOverlay.classList.toggle("active");
      els.hamburger.setAttribute("aria-expanded", isActive);
      document.body.style.overflow = isActive ? "hidden" : "";
    },

    close() {
      els.hamburger.classList.remove("active");
      els.mobileNav.classList.remove("active");
      els.mobileOverlay.classList.remove("active");
      els.hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    },
  };

  // ===== STAR RATING =====
  const StarRating = {
    createGlitterParticle(x, y) {
      const particle = document.createElement("div");
      particle.className = "glitter-particle";
      particle.style.left = x + "px";
      particle.style.top = y + "px";

      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 30;
      const xOffset = Math.cos(angle) * distance;
      const yOffset = Math.sin(angle) * distance;

      particle.style.setProperty("--x", xOffset + "px");
      particle.style.setProperty("--y", yOffset + "px");

      return particle;
    },

    animateStar(starElement) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      starElement.style.animation = "none";
      setTimeout(() => {
        starElement.style.animation = "star-bounce 0.5s ease";
      }, 10);

      const rect = starElement.getBoundingClientRect();
      const container = starElement.parentElement;
      const containerRect = container.getBoundingClientRect();

      for (let i = 0; i < 8; i++) {
        const particle = this.createGlitterParticle(
          rect.left + rect.width / 2 - containerRect.left,
          rect.top + rect.height / 2 - containerRect.top
        );
        container.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
      }
    },

    getAverageRating(productId) {
      const ratings = state.ratings[productId]?.ratings;
      if (!ratings || !Array.isArray(ratings) || ratings.length === 0) return 0;
      const sum = ratings.reduce((acc, val) => acc + val, 0);
      return sum / ratings.length;
    },

    render(containerId, productId, isModal = false) {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = "";

      if (isModal) {
        // Check if user has already rated this product
        const userRating = state.ratings[productId]?.userRating || 0;

        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("span");
          star.className = "star";
          star.textContent = "★";
          star.dataset.value = i;
          star.style.cursor = "pointer";
          star.setAttribute("role", "button");
          star.setAttribute("aria-label", `Rate ${i} out of 5 stars`);
          star.setAttribute("tabindex", "0");

          // Highlight stars up to user's rating
          if (i <= userRating) {
            star.classList.add("filled");
          }

          const handleRate = (e) => {
            e.stopPropagation();

            if (!state.ratings[productId]) {
              state.ratings[productId] = { userRating: 0, ratings: [] };
            }

            // Update or set the user's single rating
            const oldRating = state.ratings[productId].userRating;
            state.ratings[productId].userRating = i;

            // If user had a previous rating, replace it. Otherwise add new rating
            if (oldRating > 0) {
              // Find and replace the old rating
              const index = state.ratings[productId].ratings.indexOf(oldRating);
              if (index > -1) {
                state.ratings[productId].ratings[index] = i;
              }
            } else {
              // First time rating - add to array
              state.ratings[productId].ratings.push(i);
            }

            Storage.save();

            this.animateStar(star);

            setTimeout(() => {
              // Re-render to show the updated stars
              this.render(containerId, productId, true);
              this.updateStats(productId);
              Products.render();

              if (oldRating > 0) {
                showToast(`Updated rating to ${i} star${i !== 1 ? "s" : ""}!`);
              } else {
                showToast(`Rated ${i} star${i !== 1 ? "s" : ""}!`);
              }
            }, 500);
          };

          star.addEventListener("click", handleRate);
          star.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleRate(e);
            }
          });

          container.appendChild(star);
        }
      } else {
        const avgRating = this.getAverageRating(productId);
        const fullStars = Math.floor(avgRating);
        const hasHalfStar = avgRating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("span");
          star.className = "star";
          star.textContent = "★";
          star.setAttribute("aria-hidden", "true");

          if (i <= fullStars) {
            star.classList.add("filled");
          } else if (i === fullStars + 1 && hasHalfStar) {
            star.classList.add("filled");
            star.style.opacity = "0.5";
          }

          container.appendChild(star);
        }

        const tooltip = document.createElement("div");
        tooltip.className = "rating-tooltip";
        if (avgRating > 0) {
          const ratingCount = state.ratings[productId]?.ratings?.length || 0;
          tooltip.textContent = `${avgRating.toFixed(
            1
          )} stars (${ratingCount} rating${ratingCount !== 1 ? "s" : ""})`;
        } else {
          tooltip.textContent = "No ratings yet - be the first!";
        }
        container.appendChild(tooltip);
      }
    },

    updateStats(productId) {
      if (!els.ratingStats) return;

      const ratings = state.ratings[productId]?.ratings;
      const avgRating = this.getAverageRating(productId);

      if (!ratings || !Array.isArray(ratings) || ratings.length === 0) {
        els.ratingStats.textContent = "No ratings yet. Be the first to rate!";
      } else {
        els.ratingStats.textContent = `Average: ${avgRating.toFixed(
          1
        )} stars from ${ratings.length} rating${
          ratings.length !== 1 ? "s" : ""
        }`;
      }
    },
  };

  // ===== COMMENTS =====
  const Comments = {
    render(productId) {
      if (!els.commentsList || !els.commentCount) return;

      const comments = state.comments[productId] || [];
      els.commentCount.textContent = comments.length;

      while (els.commentsList.firstChild) {
        els.commentsList.removeChild(els.commentsList.firstChild);
      }

      if (comments.length === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.className = "empty-state";
        emptyMsg.textContent = "No comments yet. Be the first to comment!";
        els.commentsList.appendChild(emptyMsg);
        return;
      }

      comments.forEach((comment) => {
        const item = document.createElement("div");
        item.className = "comment-item";
        item.setAttribute("role", "listitem");

        const author = document.createElement("div");
        author.className = "comment-author";
        author.textContent = escapeHtml(comment.author || "Anonymous");

        const text = document.createElement("div");
        text.className = "comment-text";
        text.textContent = escapeHtml(comment.text || "");

        const time = document.createElement("div");
        time.className = "comment-time";
        time.textContent = escapeHtml(comment.time || "Just now");

        item.appendChild(author);
        item.appendChild(text);
        item.appendChild(time);
        els.commentsList.appendChild(item);
      });
    },

    add(productId, text) {
      if (!text || text.trim().length === 0) {
        showToast("Please enter a comment");
        return;
      }

      if (!state.comments[productId]) {
        state.comments[productId] = [];
      }

      const comment = {
        author: "User" + Math.floor(Math.random() * 1000),
        text: text.trim(),
        time: "Just now",
      };

      state.comments[productId].unshift(comment);
      Storage.save();
      this.render(productId);
      showToast("Comment posted!");
    },
  };

  // ===== WISHLIST =====
  const Wishlist = {
    toggle(productId) {
      if (!productId) return;

      const product = state.products.find((p) => p.id === productId);
      if (!product) return;

      if (state.wishlist.has(productId)) {
        state.wishlist.delete(productId);
        showToast(`Removed ${product.title} from wishlist`);
      } else {
        state.wishlist.add(productId);
        showToast(`Added ${product.title} to wishlist`);
      }

      Storage.save();
      Products.render();
      this.render();
      this.updateBadge();

      if (state.currentProduct === productId) {
        this.updateModalButton();
      }
    },

    render() {
      if (!els.wishlistList) return;

      while (els.wishlistList.firstChild) {
        els.wishlistList.removeChild(els.wishlistList.firstChild);
      }

      if (state.wishlist.size === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.className = "empty-state";
        emptyMsg.textContent = "No items in wishlist";
        els.wishlistList.appendChild(emptyMsg);
        return;
      }

      Array.from(state.wishlist).forEach((id) => {
        const product = state.products.find((p) => p.id === id);
        if (!product) return;

        const item = document.createElement("div");
        item.className = "wishlist-item";
        item.setAttribute("role", "listitem");

        const content = document.createElement("div");

        const title = document.createElement("div");
        title.className = "wishlist-item-title";
        title.textContent = product.title;

        const price = document.createElement("div");
        price.className = "wishlist-item-price";
        price.textContent = formatCurrency(product.price);

        content.appendChild(title);
        content.appendChild(price);

        const removeBtn = document.createElement("button");
        removeBtn.className = "wishlist-remove";
        removeBtn.dataset.id = id;
        removeBtn.textContent = "×";
        removeBtn.setAttribute(
          "aria-label",
          `Remove ${product.title} from wishlist`
        );

        item.appendChild(content);
        item.appendChild(removeBtn);
        els.wishlistList.appendChild(item);
      });
    },

    updateBadge() {
      if (!els.wishlistBadge) return;
      els.wishlistBadge.textContent = state.wishlist.size;
    },

    updateModalButton() {
      if (!els.addWishlistBtn || !state.currentProduct) return;

      const isInWishlist = state.wishlist.has(state.currentProduct);
      els.addWishlistBtn.innerHTML = isInWishlist
        ? "💔 Remove from Wishlist"
        : "❤️ Add to Wishlist";
      els.addWishlistBtn.setAttribute(
        "aria-label",
        isInWishlist ? "Remove from wishlist" : "Add to wishlist"
      );
    },

    show() {
      if (state.wishlist.size < 1) {
        showToast("Your wishlist is empty");
        return;
      }

      const panel = document.querySelector(".wishlist-panel");
      if (panel) {
        panel.scrollIntoView({ behavior: "smooth" });
      }
    },
  };

  // ===== PRODUCTS =====
  const Products = {
    populateCategories() {
      if (!els.categoryFilter) return;

      const categories = Array.from(
        new Set(state.products.map((p) => p.category))
      );
      els.categoryFilter.innerHTML =
        '<option value="">All categories</option>' +
        categories
          .map(
            (c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`
          )
          .join("");
    },

    getFiltered() {
      const query = els.searchInput?.value.trim().toLowerCase() || "";
      let items = [...state.products];

      const category = els.categoryFilter?.value || "";
      if (category) {
        items = items.filter((i) => i.category === category);
      }

      if (query) {
        items = items.filter(
          (i) =>
            i.title?.toLowerCase().includes(query) ||
            i.desc?.toLowerCase().includes(query) ||
            i.category?.toLowerCase().includes(query)
        );
      }

      const sort = els.sortSelect?.value || "relevance";
      if (sort === "price-asc") {
        items.sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (sort === "price-desc") {
        items.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (sort === "rating") {
        items.sort(
          (a, b) =>
            StarRating.getAverageRating(b.id) -
            StarRating.getAverageRating(a.id)
        );
      }

      return items;
    },

    render() {
      if (!els.productGrid) return;

      const items = this.getFiltered();

      while (els.productGrid.firstChild) {
        els.productGrid.removeChild(els.productGrid.firstChild);
      }

      if (items.length === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.className = "empty-state";
        emptyMsg.style.gridColumn = "1 / -1";
        emptyMsg.style.padding = "40px";
        emptyMsg.textContent = "No products found. Try adjusting your filters.";
        els.productGrid.appendChild(emptyMsg);
        return;
      }

      items.forEach((product) => {
        const card = document.createElement("article");
        card.className = "card";
        card.dataset.id = product.id;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `View details for ${product.title}`);

        if (product.hotDeal) {
          const badge = document.createElement("div");
          badge.className = "hot-deal-badge";
          badge.textContent = "🔥 Hot Deal";
          badge.setAttribute("aria-label", "Hot deal");
          card.appendChild(badge);
        }

        const wishlistBtn = document.createElement("button");
        wishlistBtn.className =
          "wishlist-btn" + (state.wishlist.has(product.id) ? " active" : "");
        wishlistBtn.dataset.id = product.id;
        wishlistBtn.textContent = state.wishlist.has(product.id) ? "❤️" : "🤍";
        wishlistBtn.setAttribute(
          "aria-label",
          state.wishlist.has(product.id)
            ? "Remove from wishlist"
            : "Add to wishlist"
        );
        card.appendChild(wishlistBtn);

        const thumb = document.createElement("div");
        thumb.className = "thumb";
        const img = document.createElement("img");
        img.src = product.img || "";
        img.alt = product.title || "Product image";
        img.loading = "lazy";
        thumb.appendChild(img);
        card.appendChild(thumb);

        const categoryBadge = document.createElement("div");
        categoryBadge.className = "category-badge";
        categoryBadge.textContent = product.category || "Uncategorized";
        card.appendChild(categoryBadge);

        const title = document.createElement("h3");
        title.textContent = product.title || "Untitled Product";
        card.appendChild(title);

        const ratingContainer = document.createElement("div");
        ratingContainer.className = "star-rating";
        ratingContainer.id = "rating-" + product.id;
        card.appendChild(ratingContainer);

        const price = document.createElement("div");
        price.className = "price";
        price.textContent = formatCurrency(product.price || 0);
        card.appendChild(price);

        els.productGrid.appendChild(card);

        StarRating.render("rating-" + product.id, product.id, false);
      });

      this.animate();
    },

    animate() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (typeof gsap !== "undefined") {
        const cards = document.querySelectorAll(".card");
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
        });
      }
    },
  };

  // ===== MODAL =====
  const Modal = {
    focusableElements: [],
    firstFocusable: null,
    lastFocusable: null,
    elementToFocusOnClose: null,

    setupFocusTrap() {
      const modal = document.querySelector(".modal");
      if (!modal) return;

      this.focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      this.firstFocusable = this.focusableElements[0];
      this.lastFocusable =
        this.focusableElements[this.focusableElements.length - 1];
    },

    open(productId) {
      const product = state.products.find((p) => p.id === productId);
      if (!product) return;

      state.currentProduct = productId;
      this.elementToFocusOnClose = document.activeElement;

      if (els.modalTitle)
        els.modalTitle.textContent = product.title || "Product Details";
      if (els.modalImage) {
        els.modalImage.src = product.img || "";
        els.modalImage.alt = product.title || "Product image";
      }
      if (els.modalDesc)
        els.modalDesc.textContent = product.desc || "No description available.";
      if (els.modalPrice)
        els.modalPrice.textContent = formatCurrency(product.price || 0);
      if (els.modalCategory)
        els.modalCategory.textContent = product.category || "Uncategorized";

      if (els.amazonLink) {
        els.amazonLink.href = product.amazon || "#";
        els.amazonLink.style.pointerEvents = product.amazon ? "auto" : "none";
      }
      if (els.ebayLink) {
        els.ebayLink.href = product.ebay || "#";
        els.ebayLink.style.pointerEvents = product.ebay ? "auto" : "none";
      }
      if (els.amazonPrice)
        els.amazonPrice.textContent = product.amazonPrice || "—";
      if (els.ebayPrice) els.ebayPrice.textContent = product.ebayPrice || "—";

      Wishlist.updateModalButton();
      StarRating.render("modalStarRating", productId, true);
      StarRating.updateStats(productId);
      Comments.render(productId);

      // Show modal
      if (els.modalBackdrop) {
        els.modalBackdrop.classList.add("show");
      }
      document.body.style.overflow = "hidden";

      // Prepare modal focus elements
      this.setupFocusTrap();

      // Focus modal after it's visible
      setTimeout(() => {
        if (els.modalClose) els.modalClose.focus();
      }, 100);
    },

    close() {
      if (els.modalBackdrop) {
        els.modalBackdrop.classList.remove("show");
      }
      document.body.style.overflow = "";
      state.currentProduct = null;

      if (
        this.elementToFocusOnClose &&
        document.contains(this.elementToFocusOnClose)
      ) {
        setTimeout(() => {
          if (this.elementToFocusOnClose) {
            this.elementToFocusOnClose.focus();
          }
        }, 50);
        this.elementToFocusOnClose = null;
      }
    },

    handleShare() {
      if (!state.currentProduct) return;

      const product = state.products.find((p) => p.id === state.currentProduct);
      if (!product) return;

      const shareUrl = window.location.href;
      const shareTitle = product.title;
      const shareText = `Check out ${product.title} - ${formatCurrency(
        product.price
      )} on NeoTechVault!`;

      // Try native Web Share API first (mobile devices)
      if (navigator.share) {
        navigator
          .share({
            title: shareTitle,
            text: shareText,
            url: shareUrl,
          })
          .catch(() => {
            // If user cancels, show custom share menu
            this.showCustomShareMenu(shareUrl, shareTitle, shareText);
          });
      } else {
        // Desktop - show custom share menu
        this.showCustomShareMenu(shareUrl, shareTitle, shareText);
      }
    },

    showCustomShareMenu(url, title, text) {
      // Remove existing share menu if any
      const existingMenu = document.getElementById("customShareMenu");
      if (existingMenu) existingMenu.remove();

      // Create share menu
      const shareMenu = document.createElement("div");
      shareMenu.id = "customShareMenu";
      shareMenu.className = "custom-share-menu";
      shareMenu.setAttribute("role", "dialog");
      shareMenu.setAttribute("aria-label", "Share product");

      const encodedUrl = encodeURIComponent(url);
      const encodedTitle = encodeURIComponent(title);
      const encodedText = encodeURIComponent(text);

      shareMenu.innerHTML = `
        <div class="share-menu-content">
          <div class="share-menu-header">
            <h3>Share this product</h3>
            <button class="share-close-btn" aria-label="Close share menu">✕</button>
          </div>
          <div class="share-options">
            <a href="https://wa.me/?text=${encodedText}%20${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-option whatsapp">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-option facebook">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <a href="https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-option twitter">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span>Twitter</span>
            </a>
            <a href="https://telegram.me/share/url?url=${encodedUrl}&text=${encodedText}" target="_blank" rel="noopener noreferrer" class="share-option telegram">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span>Telegram</span>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-option linkedin">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <button class="share-option copy-link" id="copyLinkBtn">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(shareMenu);

      // Animate in
      setTimeout(() => shareMenu.classList.add("show"), 10);

      // Event listeners
      const closeBtn = shareMenu.querySelector(".share-close-btn");
      const copyBtn = shareMenu.querySelector("#copyLinkBtn");

      const closeMenu = () => {
        shareMenu.classList.remove("show");
        setTimeout(() => shareMenu.remove(), 300);
      };

      closeBtn.addEventListener("click", closeMenu);

      shareMenu.addEventListener("click", (e) => {
        if (e.target === shareMenu) closeMenu();
      });

      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(url).then(() => {
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
            <span>Copied!</span>
          `;
          showToast("Link copied to clipboard!");
          setTimeout(closeMenu, 1500);
        });
      });

      // Close on Escape key
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          closeMenu();
          document.removeEventListener("keydown", handleEscape);
        }
      };
      document.addEventListener("keydown", handleEscape);
    },
  };

  // ===== EVENT HANDLERS =====
  const Events = {
    init() {
      document.addEventListener("click", (e) => {
        // Modal close - check this first
        if (e.target === els.modalClose) {
          e.preventDefault();
          e.stopPropagation();
          Modal.close();
          return;
        }

        // Close modal when clicking backdrop (not modal content)
        if (e.target === els.modalBackdrop) {
          e.preventDefault();
          e.stopPropagation();
          Modal.close();
          return;
        }

        const wishlistBtn = e.target.closest(".wishlist-btn");
        if (wishlistBtn) {
          e.stopPropagation();
          Wishlist.toggle(wishlistBtn.dataset.id);
          return;
        }

        const card = e.target.closest(".card");
        if (card && !e.target.closest("button")) {
          Modal.open(card.dataset.id);
          return;
        }

        const removeBtn = e.target.closest(".wishlist-remove");
        if (removeBtn) {
          Wishlist.toggle(removeBtn.dataset.id);
          return;
        }

        if (e.target === els.hamburger) {
          MobileMenu.toggle();
          return;
        }

        if (e.target === els.mobileOverlay) {
          MobileMenu.close();
          return;
        }

        if (
          e.target === els.themeToggle ||
          e.target === els.themeToggleMobile
        ) {
          Theme.toggle();
          return;
        }

        if (e.target === els.wishlistBtn) {
          Wishlist.show();
          return;
        }

        if (e.target === els.addWishlistBtn) {
          if (state.currentProduct) {
            Wishlist.toggle(state.currentProduct);
          }
          return;
        }

        if (e.target === els.shareBtn) {
          Modal.handleShare();
          return;
        }

        if (e.target === els.featuredBtn) {
          const productsSection = document.getElementById("products");
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }

        if (e.target === els.contactBtn || e.target === els.contactBtnMobile) {
          location.href = "#contact";
          MobileMenu.close();
          return;
        }
      });

      document.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          els.modalBackdrop?.classList.contains("show")
        ) {
          Modal.close();
          return;
        }

        if (els.modalBackdrop?.classList.contains("show") && e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === Modal.firstFocusable) {
              e.preventDefault();
              if (Modal.lastFocusable) Modal.lastFocusable.focus();
            }
          } else {
            if (document.activeElement === Modal.lastFocusable) {
              e.preventDefault();
              if (Modal.firstFocusable) Modal.firstFocusable.focus();
            }
          }
        }

        const card = e.target.closest(".card");
        if (card && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          Modal.open(card.dataset.id);
        }
      });

      if (els.searchInput) {
        els.searchInput.addEventListener(
          "input",
          debounce(() => {
            Products.render();
          })
        );
      }

      if (els.categoryFilter) {
        els.categoryFilter.addEventListener("change", () => {
          Products.render();
        });
      }

      if (els.sortSelect) {
        els.sortSelect.addEventListener("change", () => {
          Products.render();
        });
      }

      if (els.commentForm) {
        els.commentForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const text = els.commentInput?.value.trim();
          if (text && state.currentProduct) {
            Comments.add(state.currentProduct, text);
            if (els.commentInput) els.commentInput.value = "";
          }
        });
      }

      if (els.mobileNav) {
        els.mobileNav.querySelectorAll("a, button").forEach((item) => {
          item.addEventListener("click", () => {
            MobileMenu.close();
          });
        });
      }
    },
  };

  // ===== INITIALIZATION =====
  const init = () => {
    // Cache DOM elements
    els.productGrid = document.getElementById("productGrid");
    els.categoryFilter = document.getElementById("categoryFilter");
    els.searchInput = document.getElementById("search");
    els.sortSelect = document.getElementById("sortSelect");
    els.modalBackdrop = document.getElementById("modalBackdrop");
    els.modalClose = document.getElementById("modalClose");
    els.modalTitle = document.getElementById("modalTitle");
    els.modalImage = document.getElementById("modalImage");
    els.modalDesc = document.getElementById("modalDesc");
    els.modalPrice = document.getElementById("modalPrice");
    els.modalCategory = document.getElementById("modalCategory");
    els.amazonLink = document.getElementById("amazonLink");
    els.ebayLink = document.getElementById("ebayLink");
    els.amazonPrice = document.getElementById("amazonPrice");
    els.ebayPrice = document.getElementById("ebayPrice");
    els.wishlistList = document.getElementById("wishlistList");
    els.wishlistBtn = document.getElementById("wishlistBtn");
    els.wishlistBadge = document.getElementById("wishlistBadge");
    els.addWishlistBtn = document.getElementById("addWishlistBtn");
    els.shareBtn = document.getElementById("shareBtn");
    els.themeToggle = document.getElementById("themeToggle");
    els.themeToggleMobile = document.getElementById("themeToggleMobile");
    els.typingText = document.getElementById("typingText");
    els.hamburger = document.getElementById("hamburger");
    els.mobileNav = document.getElementById("mobileNav");
    els.mobileOverlay = document.getElementById("mobileOverlay");
    els.contactBtn = document.getElementById("contactBtn");
    els.contactBtnMobile = document.getElementById("contactBtnMobile");
    els.featuredBtn = document.getElementById("featuredBtn");
    els.modalStarRating = document.getElementById("modalStarRating");
    els.ratingStats = document.getElementById("ratingStats");
    els.commentInput = document.getElementById("commentInput");
    els.commentForm = document.getElementById("commentForm");
    els.commentsList = document.getElementById("commentsList");
    els.commentCount = document.getElementById("commentCount");
    els.toast = document.getElementById("toast");
    els.loadingSpinner = document.getElementById("loadingSpinner");
    els.mainContent = document.getElementById("mainContent");

    // Load saved state
    if (!Storage.load()) {
      // Initialize with demo ratings if no saved data
      state.ratings = {
        p1: { userRating: 0, ratings: [5, 4, 5, 5, 4] },
        p2: { userRating: 0, ratings: [4, 5, 4] },
        p6: { userRating: 0, ratings: [5, 5, 5, 4, 5] },
      };
    }

    // Initialize modules
    Theme.init();
    Products.populateCategories();
    Products.render();
    Wishlist.render();
    Wishlist.updateBadge();
    Events.init();
    TypingAnimation.start();
  };

  // Public API
  return {
    init,
  };
})();

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", App.init);
} else {
  App.init();
}
