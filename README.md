# E-commerce Product Page

![Design preview for the E-commerce product page project](./design/desktop-preview.jpg)

## Welcome! 👋

Thanks for checking out my e-commerce product page project.

This is a custom-built solution inspired by a Frontend Mentor challenge. I recreated the entire design using **HTML**, **CSS**, and **TypeScript**. The goal was to produce a pixel-perfect, fully responsive, and interactive product page, closely matching the provided design mockups while writing clean, maintainable, and well-structured code.

---

## Project Overview

The page allows users to:

- View an optimal layout for mobile and desktop devices.
- See hover states for all interactive elements.
- Open a lightbox gallery when clicking the main product image.
- Switch the displayed image by clicking on thumbnails.
- Select a product quantity and add it to the cart.
- View the cart’s contents and remove items if needed.
- See the total price update dynamically based on quantity.

All interactions, states, and styles were implemented as specified in the design folder — including **basket filled**, **basket empty**, **lightbox**, **mobile menu states**, and responsive layouts.

---

## Features Implemented

- **Responsive Design** — Works seamlessly from 320px up to large screens.
- **Lightbox Image Gallery** — Desktop and mobile lightbox support with navigation.
- **Dynamic Cart Functionality** — Add, update, and remove products from the cart.
- **Quantity Selector** — Increment/decrement (no negative values).
- **Keyboard Accessibility** — Focus states and ARIA labels for screen readers.
- **Pixel-Perfect Styling** — All typography, colors, and spacing matched the style guide.

---

## Tech Stack

- **HTML5** — Semantic markup.
- **CSS3** — Flexbox, CSS variables, responsive design.
- **TypeScript** — For type-safe DOM manipulation and event handling.
- **Fonts** — [Kumbh Sans](https://fonts.google.com/specimen/Kumbh+Sans).
- **Tools** — VS Code, Node.js, TypeScript compiler (`tsc`).

---

## Style Guide Compliance

All colors, typography, and layout specifications follow the provided **style-guide**:

**Primary Colors**
- Orange: `hsl(26, 100%, 55%)`
- Pale orange: `hsl(25, 100%, 94%)`

**Neutral Colors**
- Very dark blue: `hsl(220, 13%, 13%)`
- Dark grayish blue: `hsl(219, 9%, 45%)`
- Grayish blue: `hsl(220, 14%, 75%)`
- Light grayish blue: `hsl(223, 64%, 98%)`
- White: `hsl(0, 0%, 100%)`
- Black (75% opacity for lightbox): `hsl(0, 0%, 0%)`

**Typography**
- Base font size: 16px
- Font family: Kumbh Sans
- Font weights: 400, 700

---

## Project Structure

- `ecommerce-product-page/`
-   ├──`design/` - Design reference images
-  ├──`images/` - Project images and icons
-  ├──`src/`
-          ──`main.ts` - TypeScript logic
-  ├──`styles.css` - Main styles
-  ├──`index.html` - HTML markup
-  ├──`dist/`
-          ── `main.js` - Compiled JavaScript
-  ├──`style-guide.md` - Color, typography, layout guide
-  ├──`tsconfig.json` - TypeScript configuration
-  ├──`package.json` - Project metadata & scripts
-  ├──`README.md` - This file

  ---

## What i learnt

1. Integrating TypeScript into a small front-end project for type safety.

2. Creating accessible, keyboard-navigable modals (lightbox).

3. Building a cart system without external libraries.

5. Writing responsive layouts that matched static design files and style guide.

---

  ## Future Improvements
- Include checkout page.
- Add animations for image transitions and cart interactions.
- Implement localStorage for cart persistence.
- Add unit tests for cart logic and image gallery navigation.
- Extend to multiple product variant pages with routing.

---

## Getting Started
### **Prerequisites**
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor like [VS Code](https://code.visualstudio.com/)
- [TypeScript](https://www.typescriptlang.org/) **installed globally**.

### Clone the repo
 ```git clone https://github.com/Edith-Anurika-Monday1/ECOMMERCE-PRODUCT-PAGE.git```
```cd ECOMMERCE-PRODUCT-PAGE-MAIN```

#### Configure TypeScript
Run this command in your terminal if you have typescript uninstalled ```npm install -g typescript```.
A tsconfig.json is included in the project, If you need to recreate it, run the below command;
```tsc --init```
to compile your ts file, run this command;
```npx tsc```
Note that this is a static HTML/CSS/TS to JS project. You can:
Open index.html directly in your browser, OR Use a local server for live reload to previw your work.

---

### SUMMARY
This project was built with a focus on clean code, responsive design, and user-friendly interactions. It aims to be both a practical solution and a solid reference for future improvements or similar projects. I hope it serves as a valuable resource and inspiration for your own development work. Contributions, suggestions, and feedback are always welcome to help improve and expand its capabilities.
Developed with passion❤️ by Edith Anurika Monday
📧 Email: edith.anurika.monday@gmail.com