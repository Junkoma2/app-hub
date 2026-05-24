# design.md

app-hub の設計ドキュメント。

---

## 設計思想

**作ったものを静かに置いておける入口。** 説明しすぎず、装飾しすぎず、見れば分かる構成を優先する。
アプリ一覧ページとして、作品より先に装飾が目立つことを避ける。

### 判断基準

- 作品より先に装飾が目立っていないか
- 迷わず一覧へ進めるか
- 一度見たあとも、また開きやすいか
- 少し整っているが、語りすぎていないか

### 避けるもの

- ポートフォリオらしさの押し出し
- 過度なコピー文
- 装飾のための装飾
- 作品一覧より目立つ自己演出

---

## アーキテクチャ概要

`index.html` / `styles.css` がエントリポイント。JavaScriptなし、ビルドステップなし。
デプロイは `docs/` フォルダを GitHub Pages のソースとして公開。`main` への push で即時反映。

```
app-hub/
├── index.html          # トップページ（注目アプリ + all appsリンク）
├── projects.html       # 全アプリ一覧ページ
├── styles.css          # スタイル
├── manifest.webmanifest
├── icon.svg
└── docs/
    ├── product-principles.md
    └── design.md       # このファイル
```

### ページ構成

- `index.html` — トップページ。注目アプリを数件表示し、`projects.html` へのリンクを置く
- `projects.html` — 全アプリの一覧

### アプリカードの構造

```html
<a class="project-card" href="[アプリURL]">
  <img class="project-icon" src="[アイコンURL]" alt="" width="48" height="48" />
  <span class="project-copy">
    <span class="project-name">[アプリ名]</span>
    <span class="project-note">[1行の説明]</span>
  </span>
</a>
```

アイコン画像は各アプリのリポジトリから直接参照する（`https://junkoma2.github.io/[app-name]/icon.svg`）。

---

## 更新手順

### アプリを追加するとき

1. `index.html` のアプリカード一覧に追加
2. `projects.html` のアプリカード一覧に追加
3. `README.md` の公開アプリ一覧テーブルを更新
4. `docs/` フォルダにも同じ変更を反映（GitHub Pages ソース）

---

## 今後の拡張方針・やらないこと

### やってよいこと

- アプリの追加に伴うカードの追加
- 軽微なスタイル調整

### やらないこと

- JavaScriptによる動的な機能追加
- ブログ・自己紹介などのコンテンツ拡充
- アプリ説明の長文化
- SEO目的のメタデータ過剰追加
