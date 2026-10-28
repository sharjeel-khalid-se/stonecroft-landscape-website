# Stonecroft Landscape & Design — Portfolio Website

A premium, responsive, human-designed website for **Stonecroft Landscape & Design**, an artisan residential landscape architecture and estate stewardship firm.

Developed without generic AI design patterns or cookie-cutter template cliches. The aesthetic is inspired by high-end estate gardening, native stone masonry, and natural topography.

---

## 📁 Project Architecture & File Inventory

```
├── .htaccess                 # SiteGround Apache optimizations (Gzip, browser caching, security headers)
├── robots.txt                # Search engine crawler instructions
├── sitemap.xml               # Standard XML sitemap with all core routes
├── 404.html                  # Branded 404 error page
├── index.html                # Homepage with transparent/scrolled header & narrative intro
├── services.html             # Detailed breakdown of 6 core landscape specializations & FAQs
├── about.html                # Firm heritage, craft standards, and team credentials
├── gallery.html              # Filterable portfolio with interactive image lightbox
├── contact.html              # Accessible consultation request form with honeypot spam protection
├── blog.html                 # Horticultural & masonry field journal
├── blog-post.html            # In-depth technical guide (stone selection & freeze-thaw physics)
├── css/
│   └── style.css             # Comprehensive modular CSS design system (zero external framework bloat)
└── js/
    └── main.js               # Clean vanilla JavaScript (navigation, lightbox, filtering, form validation)
```

---

## 🎨 Design Direction Highlights

- **Nature-Inspired Palette:** Deep forest green (`#1a3a2a`), warm sandy stone (`#f5f2ed` / `#c8b89a`), and muted botanical accents (`#6b8f4e`).
- **Typography:** DM Serif Display for warm, artisanal headings paired with Inter for clean, legible body text.
- **Asymmetric Spacing & Layouts:** Alternating image-text splits, masonry-proportioned portfolio grids, and dark contrasting accent sections.
- **Subtle Motion:** Scroll-triggered IntersectionObserver fade-ins without distracting parallax or bouncing effects.
- **Micro-Interactions:** Custom lightbox modal for portfolio imagery, interactive category filtering, and real-time form field validation.

---

## 🚀 SiteGround Hosting & Deployment Instructions

This website was built as a zero-dependency static site, ensuring **100% native compatibility with all SiteGround shared, cloud, and WordPress hosting tiers**.

### Option A: Uploading via SiteGround Site Tools File Manager (Fastest)
1. Log in to your **SiteGround Client Area**.
2. Go to **Websites** > click **Site Tools** next to your domain.
3. In the left navigation, choose **Site** > **File Manager**.
4. Open the `public_html` directory.
5. Upload all project files and folders (`css/`, `js/`, `.htaccess`, `robots.txt`, `sitemap.xml`, and all `.html` files).
6. Verify your site by visiting your domain in any browser.

### Option B: Deploying via FTP / SFTP
1. In **Site Tools** > **Site** > **FTP Accounts**, create or note your FTP credentials.
2. Connect using FileZilla, Cyberduck, or your preferred FTP client:
   - **Host:** `ftp.yourdomain.com` (or the IP listed in Site Tools)
   - **Port:** `21` (FTP) or `18765` (SFTP)
3. Transfer all files into the remote `public_html/` folder.

### Performance & Caching Verification on SiteGround
- The included `.htaccess` file activates `mod_deflate` (Gzip) and `mod_expires` (1-year asset caching).
- In SiteGround **Site Tools** > **Speed** > **Caching**, ensure **NGINX Direct Delivery** and **Dynamic Cache** are turned **ON** for optimal Core Web Vitals.

---

## 🔍 SEO & Technical Standards

- **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, and heading hierarchy (`h1` through `h4`).
- **Schema.org Structured Data:** `LandscapeService` JSON-LD embedded on the homepage.
- **Social Metadata:** Complete Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) on every page.
- **Accessibility:** Touch targets ≥ 44px, visible focus states, form labels explicitly bound to inputs, and descriptive image `alt` tags.
- **Spam Protection:** Integrated honeypot input field on the consultation form.
