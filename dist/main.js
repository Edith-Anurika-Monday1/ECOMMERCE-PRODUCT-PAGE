"use strict";
// Select DOM elements
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const menuCloseBtn = document.querySelector(".menu-close");
const cartBtn = document.querySelector(".cart-btn");
const cartDropdown = document.getElementById("cartDropdown");
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const quantityInput = document.getElementById("quantity");
const addToCartBtn = document.getElementById("addToCart");
const cartContent = document.getElementById("cartContent");
const mainImage = document.getElementById("mainImage");
const thumbnailButtons = document.querySelectorAll(".thumb");
const lightbox = document.getElementById("lightbox");
const lightboxCloseBtn = document.getElementById("lightboxClose");
const lightboxImage = document.getElementById("lightboxImage");
const lbThumbnailButtons = document.querySelectorAll(".lb-thumb");
const prevLB = document.getElementById("prevLB");
const nextLB = document.getElementById("nextLB");
const cartCountSpan = document.querySelector(".cart-count");
// Cast emptyCartText as HTMLElement to access .style property without errors
const emptyCartText = cartContent.querySelector(".empty");
let quantity = 0;
let cartItemsCount = 0;
let currentImageIndex = 1;
const maxQuantity = 99;
const productPrice = 125.0;
const imagePaths = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
];
const thumbnailPaths = [
    "./images/image-product-1-thumbnail.jpg",
    "./images/image-product-2-thumbnail.jpg",
    "./images/image-product-3-thumbnail.jpg",
    "./images/image-product-4-thumbnail.jpg",
];
// --- Mobile menu handlers ---
menuBtn.addEventListener("click", () => {
    mobileMenu.setAttribute("aria-hidden", "false");
});
menuCloseBtn.addEventListener("click", () => {
    mobileMenu.setAttribute("aria-hidden", "true");
});
mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.setAttribute("aria-hidden", "true");
    }
});
// --- Cart dropdown toggle ---
cartBtn.addEventListener("click", () => {
    const isHidden = cartDropdown.getAttribute("aria-hidden") === "true";
    cartDropdown.setAttribute("aria-hidden", isHidden ? "false" : "true");
});
// --- Quantity buttons ---
decreaseBtn.addEventListener("click", () => {
    if (quantity > 0) {
        quantity--;
        quantityInput.value = quantity.toString();
    }
});
increaseBtn.addEventListener("click", () => {
    if (quantity < maxQuantity) {
        quantity++;
        quantityInput.value = quantity.toString();
    }
});
// --- Add to cart button ---
addToCartBtn.addEventListener("click", () => {
    if (quantity === 0)
        return; // Do nothing if quantity is zero
    cartItemsCount += quantity;
    quantity = 0;
    quantityInput.value = "0";
    updateCartUI();
});
// --- Update cart UI ---
function updateCartUI() {
    if (cartItemsCount === 0) {
        cartCountSpan.classList.add("visually-hidden");
        emptyCartText.style.display = "block";
        cartContent.querySelectorAll(".cart-item, .checkout-btn").forEach(item => item.remove());
    }
    else {
        cartCountSpan.classList.remove("visually-hidden");
        cartCountSpan.textContent = cartItemsCount.toString();
        emptyCartText.style.display = "none";
        // Remove previous cart items and checkout button
        cartContent.querySelectorAll(".cart-item, .checkout-btn").forEach(item => item.remove());
        // Create cart item element
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
      <img src="${thumbnailPaths[0]}" alt="Product thumbnail" />
      <div class="cart-item-details">
        <p class="title">Fall Limited Edition Sneakers</p>
        <p class="price-qty">$${productPrice.toFixed(2)} x ${cartItemsCount} <strong>$${(productPrice * cartItemsCount).toFixed(2)}</strong></p>
      </div>
      <button class="cart-item-delete" aria-label="Remove item from cart">
        <img src="./images/icon-delete.svg" alt="Delete icon" />
      </button>
    `;
        cartContent.appendChild(cartItem);
        // Add event listener for delete button
        const deleteBtn = cartItem.querySelector(".cart-item-delete");
        deleteBtn.addEventListener("click", () => {
            cartItemsCount = 0;
            updateCartUI();
        });
        // Create checkout button
        const checkoutBtn = document.createElement("button");
        checkoutBtn.className = "checkout-btn";
        checkoutBtn.textContent = "Checkout";
        // Add a simple click event (replace with actual checkout logic)
        checkoutBtn.addEventListener("click", () => {
            alert("Checkout not implemented yet.");
        });
        cartContent.appendChild(checkoutBtn);
    }
}
// --- Thumbnail selection ---
thumbnailButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
        setCurrentImage(idx + 1);
    });
});
lbThumbnailButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
        setCurrentImage(idx + 1);
    });
});
function setCurrentImage(index) {
    currentImageIndex = index;
    // Update main product image
    mainImage.src = imagePaths[index - 1];
    mainImage.alt = `Product image ${index}`;
    // Update lightbox image
    lightboxImage.src = imagePaths[index - 1];
    lightboxImage.alt = `Large product ${index}`;
    // Update active thumbnail (desktop gallery)
    thumbnailButtons.forEach((btn, idx) => {
        if (idx === index - 1) {
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
        }
        else {
            btn.classList.remove("active");
            btn.removeAttribute("aria-pressed");
        }
    });
    // Update active thumbnail (lightbox)
    lbThumbnailButtons.forEach((btn, idx) => {
        if (idx === index - 1) {
            btn.classList.add("active");
        }
        else {
            btn.classList.remove("active");
        }
    });
}
// --- Main image click opens lightbox (desktop only) ---
mainImage.addEventListener("click", () => {
    if (window.innerWidth >= 1024) {
        openLightbox();
    }
});
function openLightbox() {
    lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");
}
lightboxCloseBtn.addEventListener("click", () => {
    closeLightbox();
});
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
// --- Lightbox navigation ---
prevLB.addEventListener("click", () => {
    currentImageIndex--;
    if (currentImageIndex < 1)
        currentImageIndex = imagePaths.length;
    setCurrentImage(currentImageIndex);
});
nextLB.addEventListener("click", () => {
    currentImageIndex++;
    if (currentImageIndex > imagePaths.length)
        currentImageIndex = 1;
    setCurrentImage(currentImageIndex);
});
// Keyboard navigation support for lightbox and main gallery
document.addEventListener("keydown", (e) => {
    if (lightbox.getAttribute("aria-hidden") === "false") {
        if (e.key === "ArrowLeft") {
            prevLB.click();
        }
        else if (e.key === "ArrowRight") {
            nextLB.click();
        }
        else if (e.key === "Escape") {
            closeLightbox();
        }
    }
});
// Initialize UI on load
setCurrentImage(currentImageIndex);
updateCartUI();
