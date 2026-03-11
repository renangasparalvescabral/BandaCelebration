# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static website for **BandaCelebration**, a Brazilian show band. No build step — open `index.html` directly via XAMPP at `http://localhost/SiteCelebration/BandaCelebration/`.

## Stack

- **HTML/CSS/JS** — vanilla, no frameworks or bundlers
- **Bootstrap 5.3.3** — loaded via CDN
- **Font**: Poppins (Google Fonts CDN)
- No jQuery (despite the README description)

## Architecture

Single-page site with sections laid out in `index.html` in this order:

| Section id | Content |
|---|---|
| `#shows` | Hero — full-width tour image |
| `#banda` | Band members gallery with background video (`VideoEstrela.mp4`) |
| `#agenda` | Upcoming shows grid (`.show-card` items, currently static) |
| `#carrossel-membros` | Video carousel |
| footer | Social links |

### script.js — key objects/behaviors

- **Navbar**: hidden at top (`top: -90px`), slides in after 20px scroll via `scrollFunction`.
- **Mobile overlay nav**: `openNav()` / `closeNav()` toggle `#myNav` fullscreen overlay.
- **`carrosselTwitch` object**: custom carousel with lazy video loading (`data-src` → `src`), swipe support, dot navigation, keyboard arrows, and resize recalculation. Videos adjacent to the active slide are preloaded; others are paused.
- **Fade-in animations**: `IntersectionObserver` on `.fade-in` elements adds `.visible` class.
- **Scroll spy**: `IntersectionObserver` on `section[id]` highlights matching `.linksEsq a` / `.linksDir a` with `.active-link`.

### style.css — CSS variables

```css
--cor-primaria: rgb(226, 139, 31)   /* orange */
--cor-primaria-85: rgba(226, 139, 31, 0.85)
--cor-escuro: #1a1a1a
--cor-dourado: #dbbd13
```

### Asset directories

- `imagem/` — logos (LogoPreto.png, LogoBranco.png) and band photos (jpeg)
- `Video/` — mp4 clips referenced via `data-src` in the carousel slides

## Language

All UI text is in **Brazilian Portuguese** (`lang="pt-br"`). Keep new content in pt-br.

## Adding carousel slides

Add a `<div class="carrossel-slide">` with a `<video data-src="./Video/filename.mp4">` inside `.carrossel-track`, and a matching `<button class="carrossel-dot">` in `.carrossel-dots`. The dot count must equal the slide count for the dot indicator to work correctly.
