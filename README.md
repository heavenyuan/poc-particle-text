# Particle Text Animation POC (粒子聚合文字動畫)

> Particle aggregation text animation effect created in 2015

[繁體中文](#繁體中文) | [English](#english)

---

## English

### Live Demos

**👉 [Try it now!](https://heavenyuan.github.io/poc-particle-text/floatBiggerCanvas.html)**

**GitHub Repository**: [https://github.com/heavenyuan/poc-particle-text](https://github.com/heavenyuan/poc-particle-text)

#### All Versions
- [Bigger Canvas](https://heavenyuan.github.io/poc-particle-text/floatBiggerCanvas.html) - Canvas version with enlarge effect
- [Break Canvas](https://heavenyuan.github.io/poc-particle-text/floatBreakCanvas.html) - Canvas version with scatter effect
- [Bigger HTML Element](https://heavenyuan.github.io/poc-particle-text/floatBiggerHtmlElement.html) - DOM version with enlarge effect
- [Break HTML Element](https://heavenyuan.github.io/poc-particle-text/floatBreakHtmlElement.html) - DOM version with scatter effect

### Overview

This is a proof-of-concept project demonstrating particle text animation effects. Created in 2015, it showcases how 800 particles can aggregate to form text characters with smooth animations and interactive mouse/touch effects. The project features both Canvas and DOM rendering implementations, along with two distinct interaction styles.

### Features

#### Core Functionality
- **Particle Aggregation**: 800 particles converge to form text shapes
- **Real-time Input**: Type text in the input field for instant particle text formation
- **Mouse/Touch Interaction**: Particles react and disperse when cursor or finger approaches
- **Smooth Animations**: Custom animation system with easing functions
- **Responsive Design**: Works on both desktop and mobile devices
- **Configurable Parameters**: Customizable particle count, colors, sizes, and more

#### Technical Highlights
- **Zero Dependencies**: Pure vanilla JavaScript with no external libraries
- **Dual Rendering Modes**: Canvas and HTML Element implementations
- **Dual Interaction Effects**: Enlarge (bigger) and Scatter (break) effects
- **Pixel Sampling**: Text rendered to canvas and sampled to extract particle positions
- **State Machine**: Multiple animation states (float, jiggle, in, out)

### Project Structure

```
poc-particle-text/
├── particle-text.js            # Shared module (vanilla JavaScript)
├── particle-text.css           # Shared styles
├── floatBiggerCanvas.html      # Canvas version - enlarge effect
├── floatBreakCanvas.html       # Canvas version - scatter effect
├── floatBiggerHtmlElement.html # DOM version - enlarge effect
├── floatBreakHtmlElement.html  # DOM version - scatter effect
└── README.md
```

### Usage

#### Basic Usage

1. Open any HTML file in a browser
2. Click the input field at the bottom
3. Type text - particles will aggregate to form your text
4. Move mouse (or finger) near the text - particles will react and disperse

#### Code Usage

```javascript
// Initialize after including the module
ParticleText({
    mode: 'canvas',   // 'canvas' or 'html'
    effect: 'bigger', // 'bigger' or 'break'
    config: {
        particleCount: 800,
        particleRadius: 4,
        colors: ['#00BFFF', '#58D3F7', '#0489B1', '#A9E2F3'],
        fontSize: 200,
        mouseDistance: 100
    }
});
```

#### Configuration Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `particleCount` | Number of particles | 800 |
| `particleRadius` | Particle radius | 4 (canvas) / 8 (html) |
| `colors` | Array of particle colors | Blue palette |
| `fontSize` | Text size | 200 (auto-scaled) |
| `mouseDistance` | Mouse interaction distance | 100 |
| `draftFactor` | Repulsion force coefficient | 0.01 |

> Text canvas dimensions are automatically calculated based on viewport size (max 800x200)

### Technical Implementation

#### Core Principles

1. **Particle System**
   - Initialize specified number of particles at random positions
   - Each particle has position, color, opacity, and other properties

2. **Text Pixel Extraction**
   ```javascript
   // Dynamically calculate canvas dimensions
   const width = Math.min(800, window.innerWidth * 0.8);
   const height = Math.min(200, window.innerHeight * 0.3);

   // Render text to hidden canvas (with auto font scaling)
   oxt.textAlign = "center";
   oxt.textBaseline = "middle";
   oxt.fillText(text, width/2, height/2);

   // Extract pixel data, sampling every 8th pixel
   const pix = oxt.getImageData(0, 0, width, height).data;
   ```

3. **Animation States**
   - `float` - Free floating motion
   - `jiggle` - Subtle wobble after forming text
   - `in` - Converging to text positions
   - `out` - Explosive scatter effect

4. **Mouse/Touch Interaction**
   - Calculate distance between cursor and particles
   - Apply repulsion effect when within threshold distance

#### Rendering Comparison

| Method | Rendering | Performance | Advantages |
|--------|-----------|-------------|------------|
| Canvas | Redraw each frame | Better | Suitable for many particles |
| HTML Element | CSS Transform | Moderate | Easy styling control |

#### Interaction Effects

| Effect | Description |
|--------|-------------|
| Bigger | Particles push outward (enlarge sensation) |
| Break | Particles scatter in opposite direction (break apart sensation) |

### Browser Support

Supports all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Use Cases

- Website landing page animations
- Brand showcase effects
- Interactive backgrounds
- Creative 404 pages
- Digital art installations

### Historical Context

**Created**: 2015
**Purpose**: Proof of Concept / Experimental

This project was created in 2015 to explore particle animation techniques and interactive text effects. Originally built with third-party animation libraries, it has since been refactored to use pure vanilla JavaScript with zero dependencies, demonstrating the capabilities of native browser APIs.

### Recent Improvements

**Dependency Removal Refactoring** (2025):
- **Removed jQuery**: Converted all jQuery code to native DOM APIs
- **Removed TweenMax (GSAP)**: Replaced with custom animation system using `requestAnimationFrame`
- **Zero Dependencies**: Now runs entirely on vanilla JavaScript
- **Performance**: Reduced bundle size and improved loading speed
- **Maintainability**: Simplified codebase with modern JavaScript patterns

### Legacy

This POC demonstrates:
- Fundamental particle system architecture
- Text-to-pixel conversion techniques
- Performance optimization with Canvas API
- Touch and mouse event handling
- State machine patterns in animation
- Zero-dependency implementation philosophy

---

## 繁體中文

### 線上演示

**👉 [立即體驗](https://heavenyuan.github.io/poc-particle-text/floatBiggerCanvas.html)**

**GitHub 專案**: [https://github.com/heavenyuan/poc-particle-text](https://github.com/heavenyuan/poc-particle-text)

#### 所有版本
- [Bigger Canvas](https://heavenyuan.github.io/poc-particle-text/floatBiggerCanvas.html) - Canvas 版，放大推開效果
- [Break Canvas](https://heavenyuan.github.io/poc-particle-text/floatBreakCanvas.html) - Canvas 版，打散推開效果
- [Bigger HTML Element](https://heavenyuan.github.io/poc-particle-text/floatBiggerHtmlElement.html) - DOM 版，放大推開效果
- [Break HTML Element](https://heavenyuan.github.io/poc-particle-text/floatBreakHtmlElement.html) - DOM 版，打散推開效果

### 專案簡介

粒子聚合文字動畫效果 POC (Proof of Concept)。2015 年創建的實驗性專案，展示了 800 個粒子如何聚合形成文字字元，並具有流暢的動畫效果和互動式滑鼠/觸控反應。專案提供 Canvas 和 DOM 兩種渲染實作，以及兩種不同的互動風格。

### 功能特色

#### 核心功能
- **粒子聚合**: 800 個粒子聚合形成文字形狀
- **即時輸入**: 輸入框輸入文字即時顯示
- **滑鼠/觸控互動**: 滑鼠或手指靠近時粒子被推開
- **平滑動畫**: 自訂動畫系統搭配緩動函數
- **響應式設計**: 支援桌面與行動裝置
- **可配置參數**: 粒子數量、顏色、大小等皆可自訂

#### 技術亮點
- **無外部依賴**: 純原生 JavaScript，無需任何外部函式庫
- **雙渲染模式**: Canvas 和 HTML Element 兩種實作
- **雙互動效果**: 放大（bigger）和打散（break）兩種效果
- **像素取樣**: 將文字渲染至 Canvas 並取樣提取粒子位置
- **狀態機**: 多種動畫狀態（float、jiggle、in、out）

### 專案結構

```
poc-particle-text/
├── particle-text.js            # 共用模組（原生 JavaScript）
├── particle-text.css           # 共用樣式
├── floatBiggerCanvas.html      # Canvas 版 - 放大效果
├── floatBreakCanvas.html       # Canvas 版 - 打散效果
├── floatBiggerHtmlElement.html # DOM 版 - 放大效果
├── floatBreakHtmlElement.html  # DOM 版 - 打散效果
└── README.md
```

### 使用方式

#### 基本使用

1. 開啟任一 HTML 檔案
2. 點擊下方輸入框
3. 輸入文字，粒子會聚合形成文字
4. 移動滑鼠（或手指）靠近文字，粒子會被推開

#### 程式碼使用

```javascript
// 引入模組後呼叫
ParticleText({
    mode: 'canvas',   // 'canvas' 或 'html'
    effect: 'bigger', // 'bigger' 或 'break'
    config: {
        particleCount: 800,
        particleRadius: 4,
        colors: ['#00BFFF', '#58D3F7', '#0489B1', '#A9E2F3'],
        fontSize: 200,
        mouseDistance: 100
    }
});
```

#### 配置參數

| 參數 | 說明 | 預設值 |
|------|------|--------|
| `particleCount` | 粒子數量 | 800 |
| `particleRadius` | 粒子半徑 | 4 (canvas) / 8 (html) |
| `colors` | 粒子顏色陣列 | 藍色系 |
| `fontSize` | 文字大小 | 200 (自動縮放) |
| `mouseDistance` | 滑鼠互動距離 | 100 |
| `draftFactor` | 推開力道係數 | 0.01 |

> 文字畫布尺寸會根據視窗大小自動計算（最大 800x200）

### 技術實現

#### 核心原理

1. **粒子系統**
   - 初始化指定數量的隨機位置粒子
   - 每個粒子有位置、顏色、透明度等屬性

2. **文字像素提取**
   ```javascript
   // 動態計算畫布尺寸
   const width = Math.min(800, window.innerWidth * 0.8);
   const height = Math.min(200, window.innerHeight * 0.3);

   // 在隱藏 Canvas 繪製文字（自動縮放字體）
   oxt.textAlign = "center";
   oxt.textBaseline = "middle";
   oxt.fillText(text, width/2, height/2);

   // 提取像素點，每 8 個像素取一個點
   const pix = oxt.getImageData(0, 0, width, height).data;
   ```

3. **動畫狀態**
   - `float` - 自由漂浮
   - `jiggle` - 形成文字後的微抖動
   - `in` - 聚合到文字位置
   - `out` - 爆炸打散

4. **滑鼠/觸控互動**
   - 計算指標與粒子的距離
   - 距離小於設定值時產生推開效果

#### 渲染方式比較

| 方式 | 渲染 | 效能 | 優點 |
|------|------|------|------|
| Canvas | 每幀重繪 | 較好 | 適合大量粒子 |
| HTML Element | CSS Transform | 普通 | 易於樣式控制 |

#### 滑鼠效果

| 效果 | 說明 |
|------|------|
| Bigger | 粒子往外推開（放大感） |
| Break | 粒子沿反方向散開（打散感） |

### 瀏覽器支援

支援所有現代瀏覽器：
- Chrome
- Firefox
- Safari
- Edge
- 行動裝置瀏覽器（iOS Safari、Chrome Mobile）

### 應用場景

- 網站首頁動畫
- 品牌展示效果
- 互動式背景
- 創意 404 頁面
- 數位藝術裝置

### 歷史背景

**建立年份**: 2015 年
**專案性質**: 概念驗證 / 實驗性質

這個專案創建於 2015 年，目的是探索粒子動畫技術和互動式文字效果。原本使用第三方動畫函式庫開發，後來重構為純原生 JavaScript 實作，無任何外部依賴，展現了原生瀏覽器 API 的強大能力。

### 近期改進

**移除依賴重構** (2025):
- **移除 jQuery**: 將所有 jQuery 程式碼轉換為原生 DOM API
- **移除 TweenMax (GSAP)**: 使用 `requestAnimationFrame` 實作自訂動畫系統
- **零依賴**: 現在完全使用原生 JavaScript 運行
- **效能提升**: 減少打包體積並改善載入速度
- **易於維護**: 使用現代 JavaScript 模式簡化程式碼庫

### 專案意義

這個 POC 展示了：
- 粒子系統的基礎架構
- 文字轉像素的轉換技術
- Canvas API 的效能優化
- 觸控和滑鼠事件處理
- 動畫中的狀態機模式
- 零依賴實作理念

---

**Built in 2015 to explore particle animation fundamentals**
