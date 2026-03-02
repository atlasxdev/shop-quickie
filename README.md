# shop-quickie

![Next.js](https://img.shields.io/badge/-Next.js-blue?logo=nextjs&logoColor=white) ![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)

## 📝 Description

Shop-Quickie is a high-performance, modern e-commerce web application engineered for speed and reliability. Built using the powerful combination of Next.js, React, and TypeScript, it delivers a seamless shopping experience with optimized page loads and a fully responsive interface. This platform focuses on efficiency and a streamlined user journey, providing a robust solution for contemporary online retail needs.

## ✨ Features

- 🕸️ Web


## 🛠️ Tech Stack

- next.js Next.js
- ⚛️ React
- 📜 TypeScript


## 📦 Key Dependencies

```
@headlessui/react: ^2.2.0
@hookform/resolvers: ^3.9.1
@oramacloud/client: ^1.3.19
@radix-ui/react-accordion: ^1.2.1
@radix-ui/react-alert-dialog: ^1.1.2
@radix-ui/react-checkbox: ^1.1.2
@radix-ui/react-dialog: ^1.1.2
@radix-ui/react-dropdown-menu: ^2.1.2
@radix-ui/react-icons: ^1.3.0
@radix-ui/react-label: ^2.1.0
@radix-ui/react-scroll-area: ^1.2.0
@radix-ui/react-select: ^2.1.2
@radix-ui/react-separator: ^1.1.0
@radix-ui/react-slider: ^1.2.1
@radix-ui/react-slot: ^1.1.0
```

## 🚀 Run Commands

- **dev**: `npm run dev`
- **build**: `npm run build`
- **start**: `npm run start`
- **lint**: `npm run lint`
- **test**: `npm run test`
- **test:ui**: `npm run test:ui`


## 📁 Project Structure

```
.
├── __tests__
│   ├── Checkout.test.tsx
│   ├── generateCheckoutUrl.test.ts
│   └── setup.ts
├── app
│   ├── cart
│   │   └── page.tsx
│   ├── checkout
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   ├── login
│   │   └── page.tsx
│   ├── order-success
│   │   └── page.tsx
│   ├── page.tsx
│   ├── products
│   │   └── page.tsx
│   ├── store
│   │   ├── [category]
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── track-order
│   │   └── page.tsx
│   └── user-profile
│       ├── [id]
│       │   └── page.tsx
│       └── layout.tsx
├── axios
│   └── apiRoute.ts
├── components
│   ├── CardProduct.tsx
│   ├── ErrorMessage.tsx
│   ├── Footer.tsx
│   ├── MaxWidthWrapper.tsx
│   ├── Navigation.tsx
│   ├── Scroll.tsx
│   ├── Unauthorized.tsx
│   ├── UserDropdown.tsx
│   ├── cta
│   │   ├── add-to-cart.tsx
│   │   ├── go-back.tsx
│   │   └── learn-more.tsx
│   ├── nav-loader.tsx
│   ├── tanstack-query
│   │   └── Provider.tsx
│   └── ui
│       ├── AnimatedNumber.tsx
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── navigation
│       │   ├── desktop-navigation.tsx
│       │   └── mobile-navigation.tsx
│       ├── password-input.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── text-effect.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
├── components.json
├── constants
│   └── index.ts
├── data
│   └── users.json
├── features
│   ├── cart
│   │   ├── Checkout.tsx
│   │   └── add-quantity.tsx
│   ├── checkout
│   │   ├── Checkout.tsx
│   │   ├── complete-order-dialog.tsx
│   │   ├── delivery-address.tsx
│   │   ├── order-summary.tsx
│   │   ├── payment-details.tsx
│   │   └── review-order.tsx
│   ├── hero
│   │   └── components
│   │       ├── best-sellers.tsx
│   │       ├── electronics.tsx
│   │       ├── hero-lottie-animation.tsx
│   │       ├── hero-section.tsx
│   │       ├── jewelries-carousel.tsx
│   │       ├── mens-product-carousel.tsx
│   │       ├── products.tsx
│   │       └── womens-product-carousel.tsx
│   ├── products
│   │   └── components
│   │       ├── ImageZoom.tsx
│   │       ├── ProductPage.tsx
│   │       ├── ProductSlider.tsx
│   │       ├── RelatedProducts.tsx
│   │       ├── SeeMore.tsx
│   │       └── ShopByCategory.tsx
│   ├── store
│   │   ├── category
│   │   │   └── components
│   │   │       └── Products.tsx
│   │   └── components
│   │       ├── FilterNavigation.tsx
│   │       ├── MobileSwiper.tsx
│   │       └── Products.tsx
│   └── track-order
│       └── TrackOrder.tsx
├── hooks
│   ├── use-metadata.tsx
│   ├── use-mobile.tsx
│   └── use-search.tsx
├── index.d.ts
├── lib
│   └── utils.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── public
│   ├── american-express-logo.png
│   ├── animation-optimized.json
│   ├── best-seller-1.png
│   ├── best-seller-2.jpg
│   ├── best-seller-3.jpg
│   ├── categories
│   │   ├── electronics.jpg
│   │   ├── jewelries.jpg
│   │   ├── men's clothing.jpg
│   │   └── women's clothing.jpg
│   ├── logo.png
│   ├── mastercard-logo.png
│   ├── polite-chicky.json
│   ├── privacy-options.png
│   └── visa-logo.jpg
├── services
│   ├── OramaSearch.tsx
│   ├── components
│   │   └── DropdownFilter.tsx
│   └── index.ts
├── tailwind.config.ts
├── tsconfig.json
├── types
│   └── index.ts
├── vite.config.mts
├── zod-schema
│   └── index.ts
└── zustand-store
    └── store.ts
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/atlasxdev/shop-quickie.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

---
*This README was generated with ❤️ by ReadmeBuddy*
