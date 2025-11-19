# poc-particle-text

粒子聚合文字動畫效果 POC (Proof of Concept)

## 線上演示

**[立即體驗](https://heavenyuan.github.io/poc-particle-text/floatBiggerCanvas.html)**

### 所有版本
- [Bigger Canvas](https://heavenyuan.github.io/poc-particle-text/floatBiggerCanvas.html) - Canvas 版，放大推開效果
- [Break Canvas](https://heavenyuan.github.io/poc-particle-text/floatBreakCanvas.html) - Canvas 版，打散推開效果
- [Bigger HTML Element](https://heavenyuan.github.io/poc-particle-text/floatBiggerHtmlElement.html) - DOM 版，放大推開效果
- [Break HTML Element](https://heavenyuan.github.io/poc-particle-text/floatBreakHtmlElement.html) - DOM 版，打散推開效果

## 功能特色

- **粒子聚合** - 800個粒子聚合形成文字形狀
- **即時輸入** - 輸入框輸入文字即時顯示
- **滑鼠/觸控互動** - 滑鼠或手指靠近時粒子被推開
- **平滑動畫** - 使用 GSAP TweenMax 實現流暢動畫
- **響應式設計** - 支援桌面與行動裝置
- **可配置參數** - 粒子數量、顏色、大小等皆可自訂

## 專案結構

```
poc-particle-text/
├── particle-text.js            # 共用模組
├── particle-text.css           # 共用樣式
├── floatBiggerCanvas.html      # Canvas 版 - 放大效果
├── floatBreakCanvas.html       # Canvas 版 - 打散效果
├── floatBiggerHtmlElement.html # DOM 版 - 放大效果
├── floatBreakHtmlElement.html  # DOM 版 - 打散效果
└── README.md
```

## 使用方式

### 基本使用

1. 開啟任一 HTML 檔案
2. 點擊下方輸入框
3. 輸入文字，粒子會聚合形成文字
4. 移動滑鼠（或手指）靠近文字，粒子會被推開

### 程式碼使用

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

### 配置參數

| 參數 | 說明 | 預設值 |
|------|------|--------|
| `particleCount` | 粒子數量 | 800 |
| `particleRadius` | 粒子半徑 | 4 (canvas) / 8 (html) |
| `colors` | 粒子顏色陣列 | 藍色系 |
| `fontSize` | 文字大小 | 200 (自動縮放) |
| `mouseDistance` | 滑鼠互動距離 | 100 |
| `draftFactor` | 推開力道係數 | 0.01 |

> 文字畫布尺寸會根據視窗大小自動計算（最大 800x200）

## 技術實現

### 核心原理

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

### 兩種實現方式

| 方式 | 渲染 | 效能 | 優點 |
|------|------|------|------|
| Canvas | 每幀重繪 | 較好 | 適合大量粒子 |
| HTML Element | CSS Transform | 普通 | 易於樣式控制 |

### 兩種滑鼠效果

| 效果 | 說明 |
|------|------|
| Bigger | 粒子往外推開（放大感） |
| Break | 粒子沿反方向散開（打散感） |

## 依賴

無外部依賴，純原生 JavaScript 實作。

## 瀏覽器支援

支援所有現代瀏覽器：
- Chrome
- Firefox
- Safari
- Edge
- 行動裝置瀏覽器

## 應用場景

- 網站首頁動畫
- 品牌展示效果
- 互動式背景
- 創意 404 頁面
