# Wordpress Starter Theme Gulp

This ZIP contains a ready-to-use WordPress theme scaffold with:
- Gulp build (Sass, JS, file includes)
- Wordpress theme structure (core, blocks, CPTs, AJAX)
- src/ for development assets
- assets/ for compiled output

## Quick start

1. ```shell
   npm i
   ```
2. ```shell
   npm run dev   (for WP mode)
   ```
3. ```shell
   npm run dev:html (for static HTML dev)
   ```

Drop this folder into `wp-content/themes/vlasinfo-theme` for WordPress.

## 📁 Folders and files structure

📁vi-theme/
│
├── 📁src/
│   │
│   ├──📁fonts/
│   │
│   ├──📁html/        ← only used in HTML mode
│   │  ├──📁partials/
│   │  │   ├──📃footer.html
│   │  │   ├──📃head.html
│   │  │   └──📃header.html
│   │  └──📃index.html
│   │
│   ├──📁scss/
│   │  ├──📁base/
│   │  │   ├──📃_buttons.scss
│   │  │   ├──📃_cursor.scss
│   │  │   ├──📃_fonts.scss
│   │  │   ├──📃_reboot.scss
│   │  │   └──📃_variables.scss
│   │  ├──📁components/
│   │  │   ├──📃_header.scss
│   │  │   └──📃_footer.scss
│   │  ├──📁mixins/
│   │  │   ├──📃_breakpoints.scss
│   │  │   ├──📃_includes.scss
│   │  │   ├──📃_media-query.scss
│   │  │   └──📃_rem.scss
│   │  ├──📁woocommerce/
│   │  │   └──📃_content-product.scss
│   │  ├──📃main.scss
│   │  └──📃vendors.scss
│   │
│   ├──📁js/
│   │   ├──📁modules/
│   │   │   └──📃menu.js
│   │   └──📃main.js
│   │
│   ├──📁img/
│   └──📁fonts/
│
├──📁assets/          ← Compiled output (CSS, JS, images) — served by WordPress
│  ├──📁css/
│  ├──📁js/
│  ├──📁img/
│  └──📁fonts/
│
├──📁dist/            ← only used in HTML mode
│
├──📁template-parts/  ← WordPress partials
│
├──📃functions.php
├──📃index.php
├──📃header.php
├──📃footer.php
├──📃style.css
├──📃gulpfile.js
├──📃package.json
└──📃.gitignore