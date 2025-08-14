"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const images = [
    { id: 1, file: "./images/image-product-1.jpg", thumb: "./images/image-product-1-thumbnail.jpg" },
    { id: 2, file: "./images/image-product-2.jpg", thumb: "./images/image-product-2-thumbnail.jpg" },
    { id: 3, file: "./images/image-product-3.jpg", thumb: "./images/image-product-3-thumbnail.jpg" },
    { id: 4, file: "./images/image-product-4.jpg", thumb: "./images/image-product-4-thumbnail.jpg" },
];
const pricePerUnit = 125.0;
function $(sel) {
    const el = document.querySelector(sel);
    if (!el)
        throw new Error(`Missing element: ${sel}`);
    return el;
}
function $all(sel) {
    return Array.from(document.querySelectorAll(sel));
}
/* Elements */
const mainImage = $("#mainImage");
const thumbs = $all(".thumb");
const lbThumbs = $all(".lb-thumb");
const lightbox = $("#lightbox");
const lightboxImage = $("#lightboxImage");
const lightboxClose = $("#lightboxClose");
const prevLB = $("#prevLB");
const nextLB = $("#nextLB");
const decreaseBtn = $("#decrease");
const increaseBtn = $("#increase");
const qtyInput = $("#quantity");
const addBtn = $("#addToCart");
const cartBtn = $(".cart-btn");
const cartDropdown = $("#cartDropdown");
const cartContent = $("#cartContent");
/* state */
let currentIndex = 1;
let quantity = 0;
let cart = [];
/* helpers */
function setActiveThumb(index) {
    thumbs.forEach((t) => t.classList.remove("active"));
    const target = thumbs.find((t) => t.dataset.index === String(index));
    if (target) {
        target.classList.add("active");
        target.setAttribute("aria-pressed", "true");
    }
    // update main image
    const img = images[index - 1];
    if (img) {
        mainImage.src = img.file ?? "";
        mainImage.alt = `Product image ${index}`;
        lightboxImage.src = img.file ?? "";
    }
}
function setLBActive(index) {
    lbThumbs.forEach((t) => t.classList.remove("active"));
    const target = lbThumbs.find((t) => t.dataset.index === String(index));
    if (target)
        target.classList.add("active");
    const img = images[index - 1];
    if (img) {
        lightboxImage.src = img.file ?? "";
    }
}
function updateQuantity(n) {
    quantity = Math.max(0, n);
    qtyInput.value = String(quantity);
}
function updateCartCount() {
    const badge = document.querySelector(".cart-count");
    const total = cart.reduce((s, it) => s + it.qty, 0);
    if (total > 0) {
        badge.classList.remove("visually-hidden");
        badge.textContent = String(total);
        badge.style.display = "inline-block";
    }
    else {
        badge.classList.add("visually-hidden");
        badge.style.display = "none";
    }
}
function renderCart() {
    cartContent.innerHTML = "";
    if (cart.length === 0) {
        const p = document.createElement("p");
        p.className = "empty";
        p.textContent = "Your cart is empty.";
        cartContent.appendChild(p);
        return;
    }
    const item = cart[0];
    if (!item)
        return;
    const wrapper = document.createElement("div");
    wrapper.className = "cart-item";
    const img = document.createElement("img");
    img.src = item.thumbnail ?? "";
    img.alt = item.title ?? "";
    const meta = document.createElement("div");
    meta.className = "meta";
    const title = document.createElement("p");
    title.textContent = item.title ?? "";
    const small = document.createElement("p");
    small.className = "small";
    small.textContent = `$${item.price?.toFixed(2)} x ${item.qty} `;
    const totalSpan = document.createElement("strong");
    totalSpan.textContent = ` $${(item.price * item.qty).toFixed(2)}`;
    small.appendChild(totalSpan);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    const imgDelete = document.createElement("img");
    imgDelete.src = "./images/icon-delete.svg";
    imgDelete.alt = "Delete";
    deleteBtn.appendChild(imgDelete);
    meta.appendChild(title);
    meta.appendChild(small);
    wrapper.appendChild(img);
    wrapper.appendChild(meta);
    wrapper.appendChild(deleteBtn);
    cartContent.appendChild(wrapper);
    const checkout = document.createElement("button");
    checkout.className = "add-btn";
    checkout.textContent = "Checkout";
    checkout.style.marginTop = "14px";
    checkout.onclick = () => {
        alert("Checkout is not implemented for this demo.");
    };
    cartContent.appendChild(checkout);
    deleteBtn.addEventListener("click", () => {
        cart = [];
        updateCartCount();
        renderCart();
    });
}
/* init */
updateQuantity(0);
setActiveThumb(currentIndex);
setLBActive(currentIndex);
updateCartCount();
renderCart();
/* thumb clicks */
thumbs.forEach((t) => {
    t.addEventListener("click", (e) => {
        const idx = Number(e.currentTarget.dataset.index || "1");
        currentIndex = idx;
        setActiveThumb(idx);
    });
});
/* open lightbox on main image (desktop only) */
mainImage.addEventListener("click", () => {
    if (window.innerWidth < 800)
        return;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
});
/* lightbox thumbs */
lbThumbs.forEach((t) => {
    t.addEventListener("click", (ev) => {
        const idx = Number(ev.currentTarget.dataset.index || "1");
        currentIndex = idx;
        setLBActive(idx);
        setActiveThumb(idx);
    });
});
/* lightbox close */
lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
});
/* lightbox nav */
prevLB.addEventListener("click", () => {
    currentIndex = currentIndex <= 1 ? images.length : currentIndex - 1;
    setLBActive(currentIndex);
    setActiveThumb(currentIndex);
});
nextLB.addEventListener("click", () => {
    currentIndex = currentIndex >= images.length ? 1 : currentIndex + 1;
    setLBActive(currentIndex);
    setActiveThumb(currentIndex);
});
/* quantity buttons */
decreaseBtn.addEventListener("click", () => updateQuantity(quantity - 1));
increaseBtn.addEventListener("click", () => updateQuantity(quantity + 1));
/* add to cart */
addBtn.addEventListener("click", () => {
    if (quantity <= 0)
        return;
    const existing = cart.find((c) => c.id === "sneaker-1");
    if (existing) {
        existing.qty += quantity;
    }
    else {
        cart.push({
            id: "sneaker-1",
            title: "Fall Limited Edition Sneakers",
            price: pricePerUnit,
            qty: quantity,
            thumbnail: "./images/image-product-1-thumbnail.jpg",
        });
    }
    updateQuantity(0);
    renderCart();
    updateCartCount();
    cartDropdown.style.display = "block";
    cartDropdown.setAttribute("aria-hidden", "false");
});
/* cart toggling */
cartBtn.addEventListener("click", () => {
    const isHidden = cartDropdown.style.display === "none" || cartDropdown.style.display === "";
    cartDropdown.style.display = isHidden ? "block" : "none";
    cartDropdown.setAttribute("aria-hidden", String(!isHidden));
});
/* close lightbox on background click */
lightbox.addEventListener("click", (ev) => {
    if (ev.target === lightbox) {
        lightbox.style.display = "none";
        lightbox.setAttribute("aria-hidden", "true");
    }
});
/* accessibility: keyboard close */
document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
        lightbox.style.display = "none";
        lightbox.setAttribute("aria-hidden", "true");
        cartDropdown.style.display = "none";
    }
});
//# sourceMappingURL=main.js.map