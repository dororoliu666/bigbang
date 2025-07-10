# We know Tools

专为设计师提供的AI 工具导航

This repository contains a static website for browsing AI tools. Tools can be filtered by clicking hashtag-style categories, searched by name or description, and rated on a 0–100 scale. Each card shows the current rating and includes a **评分** button to submit your score, which is stored locally in your browser using `localStorage`.

The dataset now lists fifteen popular AI tools, including several Chinese options. Each entry includes the company behind the tool, its country (shown with a flag), the year it was created, the current version, and an embedded logo so images never break. When scraping new data the script tries to fetch each tool's logo from the website and falls back to a generated SVG placeholder if needed.

Open `index.html` in your browser to use the site. The layout is responsive and uses a grid of cards for each tool. Hover over a card to reveal a "去体验" button and click anywhere on the card to visit the tool. 左侧导航和分类标签均为中文，导航在 **首页** 与 **我常用的** 之间切换，后者会显示你最近访问过的工具。

Tool data is stored in `tools.json`. You can refresh this file by scraping [ai-bot.cn](https://ai-bot.cn) using the provided Node script:

```bash
npm install
npm run scrape
```

The page loads `tools.json` at runtime; if the file is missing it falls back to the built-in dataset defined in `script.js`.
