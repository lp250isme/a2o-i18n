# a2o-i18n — i18n 縮寫產生器

[English](#english) | [繁體中文](#繁體中文)

🔗 **Live Demo**: [a2o-i18n.vercel.app](https://a2o-i18n.vercel.app)

---

## English

A tiny toy that compresses every word into its numeronym — `first letter + middle letter count + last letter` — just like **I**nternationalizatio**n** becomes **i18n**. Type a sentence and watch it turn unreadable in real time.

### ✨ Features

- **Live Conversion**: Output updates as you type, punctuation and spacing preserved.
- **One-Click Copy**: Copy the result with a green success feedback.
- **Sample Chips**: Tap a sample sentence to try it instantly.
- **Liquid Glass UI**: Apple-style refractive glass (SVG `feDisplacementMap` + RGB chromatic aberration, after [jh3y's technique](https://codepen.io/jh3y/pen/EajLxJV)) on Chromium, frosted-blur fallback on Safari/Firefox.
- **Light / Dark / Auto Theme**: Follows the system by default; manual override is remembered in `localStorage`.
- **Zero Build**: One static `index.html` — vanilla HTML/CSS/JS, no dependencies, no build step.

### 🛠 Tech

- Vanilla HTML / CSS / JS in a single file
- Design language shared with [liquid-glass-kit](https://github.com/lp250isme/liquid-glass-kit) (`--lg-*` design tokens, glass materials, iOS semantic colors)
- Deployed on Vercel

### 🙏 Credit

Inspired by [RimoChan/i7h](https://github.com/RimoChan/i7h).

---

## 繁體中文

一個惡趣味小工具：把每個單字壓縮成「首字母 + 中間字母數 + 尾字母」的縮寫——就像 **I**nternationalizatio**n** 因為中間有 18 個字母而簡寫成 **i18n**。輸入任意句子，即時轉換成讓你完全看不懂的樣子。

### ✨ 功能

- **即時轉換**：邊打邊轉，保留空格與標點。
- **一鍵複製**：複製結果，成功時轉綠勾回饋。
- **範例 chips**：點一下範例句立即試玩。
- **Liquid Glass UI**：Apple 風折射玻璃（SVG `feDisplacementMap` 位移貼圖 + RGB 色散，採用 [jh3y 的技法](https://codepen.io/jh3y/pen/EajLxJV)），Chromium 限定，Safari/Firefox 自動退回霜化模糊玻璃。
- **淺色 / 深色 / 自動主題**：預設跟隨系統，手動切換會記在 `localStorage`。
- **零建置**：單一靜態 `index.html`——純 HTML/CSS/JS，無相依套件、無 build step。

### 🛠 技術

- 單檔 vanilla HTML / CSS / JS
- 設計語言與 [liquid-glass-kit](https://github.com/lp250isme/liquid-glass-kit) 同源（`--lg-*` design token、玻璃材質、iOS 語意色）
- 部署於 Vercel

### 🙏 致謝

靈感來自 [RimoChan/i7h](https://github.com/RimoChan/i7h)。
