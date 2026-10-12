# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — daily Bangladeshi market prices for rice, lentils, oil, vegetables, fish, meat, eggs-dairy and spices, with price changes and market-wise breakdowns, all in Bangla.

**Live site:** https://bazar-dor-website-dusky.vercel.app
**Repository:** https://github.com/Rez-06/Bazar-Dor-Website

---

## 📖 About

BazarDor is a responsive web app that helps people check today's prices of everyday essentials at a glance. Browse the biggest price risers and fallers, explore products by category, sort by price, and sign in to see detailed price ranges across different bazaars in Bangladesh. The interface is fully in Bangla, including Bengali numerals and the Bangla date.

## ✨ Key Features

1. **Live price ticker** – an infinitely scrolling marquee under the navbar showing emoji, product name, price per unit and a ▲/▼ percentage change.
2. **Daily risers & fallers** – the home page highlights the top 6 products whose prices went up and the top 6 whose prices went down, plus a full responsive grid of all products.
3. **Category pages with sorting** – browse by category and sort by default, price low → high, or price high → low. Sorting uses numeric values, so Bengali numerals sort correctly.
4. **Protected product details** – signed-in users can open any product to see minimum, maximum and average prices, plus a market-by-market price table.
5. **Authentication with BetterAuth** – email/password, Google and GitHub sign-in, with toast notifications for success, errors and sign-out.
6. **Profile management** – view your profile and update your name from a dedicated update page.
7. **Loading and error states** – skeleton loaders on home and category pages, a friendly Bangla 404 page, and an empty state for categories with no products.
8. **Fully responsive** – works on mobile, tablet and desktop.

## 🧰 Technologies Used

| Area | Tools |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router), React, TypeScript |
| Styling | Tailwind CSS, daisyUI |
| Authentication | [BetterAuth](https://better-auth.com) |
| Database | MongoDB (via the BetterAuth MongoDB adapter) |
| UI helpers | react-hot-toast, react-marquee-text, Font Awesome |
| Font | Hind Siliguri (Bangla support) |
| Deployment | Vercel |

