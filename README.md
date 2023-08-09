# ban-jinro-log-ui

## version

node: 18.12.1  
npm: 9.1.2

## set up

### initialize

#### vscode settings

```
{
  # ファイルを開くたびに前のタブを消さない
  "workbench.editor.enablePreview": false,

  # ダブルクリックでファイルを開く
  "workbench.list.openMode": "doubleClick",

  # タブサイズは 2 とする
  "editor.tabSize": 2,

  # 右に表示されるミニマップを表示しない
  "editor.minimap.enabled": false,

  # フォルダをまとめて階層表示しない
  "explorer.compactFolders": false,

  # 改行コードは LF で保存する
  "files.eol": "\n"
}
```

<br>

#### create project

- npx create-react-app {プロジェクト名} --template typescript

* 初期設定 (好み)
  - {プロジェクト名} フォルダ内にあるファイルを root に移動  
    ※ README.md は README_CRA.md に変更
  - web-vitals 削除  
    ※ src/index.tsx にある reportWebVitals 依存および reportWebVitals.ts ファイルを削除  
  - src/App 関連ファイル削除  
    ※ App.tsx、App.css、App.test.tsx、logo.svg ファイルを削除  
    ※ src/index.tsx にある App 関連依存を削除
  - src/index.css ファイルを削除  
    ※ src/index.tsx にある css 依存を削除
  - public/index.html ファイルを編集  
    ※ viewport と charset と title と favicon だけ残す  
    ※ body の root 以外は削除  
    ※ logo icon、manifest ファイルを削除  
  - package.json にある "@" がついているものを devDependency に移動  
  - packege.json にある "web-vitals" を削除  

- npm update  
- package-lock.json を削除  
- npm i  
  ※ npm audix が必要であれば実施  
  ※ high のものは消したいが、この時点で出てくるものは仕方ないとして見ている。  
  ※ この時点で `npm i -D @babel/plugin-proposal-private-property-in-object` を入れるようメッセージが出たので入れている (2023/06 ~ )

<br>

#### tsconfig settings

- compilerOptions.target を最新の ECMAScript バージョンにする  
  ※ このバージョンで js を出力するという意味を指す。  
  ※ 新規に作る場合、制約などなければ ECMA Script の[最新バージョン](https://www.typescriptlang.org/tsconfig#target)を指定する。

```
{
  "compilerOptions": {
    "target": "es2022",

  (省略)
```

<br>

#### protect branch

Github 上で main branch を protect 状態にする。

<br>

#### vscode plugin

- IntelliJ IDEA Keybindings  
   ※ InteliJ と同じ keymap にしてくれる。

<br>

#### formatter

- npm i -D prettier  
  ※ フォーマッタを担当するが、lint は担当しない。  
  ※ prettier ignore および rc ファイルを用意  

* package json への追加  
  ※ "format": "prettier --write ./{src,server}/**/*.{ts,tsx}" を npm script に設定

```
{
  # 行数制限は 80
  "printWidth": 80,

  # タブ数は 2
  "tabWidth": 2,

  # 文字列はシングルクォートにする
  "singleQuote": true,

  # ステートメントの最後にセミコロンを追加しない
  # ※ false の場合、セミコロンが無いとエラーになる箇所にだけセミコロンを追加する
  "semi": false
}
```

<br>

#### lint

- npm i -D eslint-config-prettier
- npm i -D @typescript-eslint/parser
- npm i -D @typescript-eslint/eslint-plugin@5.62.0  
- npm i -D eslint-plugin-unused-imports  
  ※ フォーマッタと lint を担当する。  
  ※ cra にデフォルトで eslint は入っているので、prettier との連携用 plugin のみをインストールする。  
  ※ eslint ignore と rc ファイルを用意 (.eslintrc.yml の内容を見て、必要な変更を行う。ecmaVersion ぐらいのはず)  

* package json への追加  
  ※ "lint": "eslint --fix ./src/**/*.{ts,tsx}" を npm script に設定

<br>

#### dummy server

* npm i -D express
* npm i -D @types/express  
  ※ package.json に express server へのプロキシを行うことで SameOrigin 問題を回避して接続できる。  
     (localhost:3000 -> localhost:5000 などの場合、port が異なるため Cookie を参照できないなど CORS 制約が起きて通信できないので proxy している。)  
  ※ format はかけるが lint はかけていない (eslintrc.yaml ファイルの修正が必要になるため)  
  ※ 以下の設定は npm run start (development env) で利用される。npm run build (prod env) では利用されない機能となる。  
     (参照) https://create-react-app.dev/docs/proxying-api-requests-in-development/

* npm i -D graphql-http
* npm i -D @graphql-tools/graphql-file-loader
* npm i -D @graphql-tools/load
* npm i -D @graphql-tools/schema  
  ※ graphql-http と express を元に、schema.graphql より schema を定義、resolver のみ自作する形をとっている。
  (参照) https://the-guild.dev/graphql/tools/docs/schema-loading

* npm i -D ts-node
* npm i -D nodemon  
  ※ コード変更後、自動で再起動する。開発時に利用する。

* server 準備  
  ※ 他プロジェクトからコピペ

* package json への追加  
  ※ "server": "nodemon --exec npx ts-node ./server/index.ts" を npm script に設定  
  ※ 以下を package.json に追加

```
  "homepage": "/",
  "proxy": "http://localhost:5000"
```

<br>

#### jest

* npm i -D msw  
  ※ mock server 用  
  ※ 他、UT/IT を行う上で必要な jest 及び react-testing-library は CRA に入っているため不要

* package json への追加  
  ※ 設定値の意味などは https://jestjs.io/ja/docs/configuration を参照。

```
  "jest": {
    "testMatch": [
      "**/*.test.{ts,tsx}"
    ],
    "transformIgnorePatterns": [
      "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ]
  }
```

<br>

#### env

他プロジェクトから env / production / test それぞれ持ってくる。

<br><br>

## React

### router

- npm i react-router-dom
- npm i -D @types/react-router-dom

<br>

### API Client

#### graphql

- npm i graphql

<br>

#### react-query

- npm i react-query
- npm i -D @tanstack/react-query

※ API 取得・更新処理に必要なリトライ、エラーハンドリングなど含めスマートに記載できる。
※ キャッシュをデフォルトで持ち、メモリ管理なども良しなに実施してくれる。
※ デフォルトの fetcher は fetch を利用する。

<br>

#### graphql-request

- npm i graphql-request

※ fetcher は GraphQL 用に graphql-request を利用している。
※ fetch でも良いとは思うのだが、Graphql Error を扱いやすいので入れている。

<br>

#### graphql codegen with react-query

- npm i -D @graphql-codegen/cli
- npm i -D @graphql-codegen/typescript
- npm i -D @graphql-codegen/typescript-operations
- npm i -D @graphql-codegen/typescript-react-query  
  ※ schema query / mutation / subscribe の型定義および hook を生成する。  
  ※ 実際に投げる query/mutation/subscribe を定義し codegen する。  
  ※ schema フォルダを別プロジェクトからコピペする。  
  ※ `import { RequestInit } from 'graphql-request/dist/types.dom'` という行があるとエラーになる都合上、生成後に削除している (2023/06 ～)  

合わせて package.json 上の build ステップを以下のように変更

```
    "codegen": "graphql-codegen",
```

<br>

### form

- npm i react-hook-form  
- npm i @tanstack/react-table  

<br>

### error handling

- npm i react-error-boundary  
  ※ https://github.com/bvaughn/react-error-boundary が公式そのまま使うより使いやすいので使っている。

<br><br>

## build

- npm run codegen  
  ※ GraphQL Codegen  
  ※ https://github.com/dotansimha/graphql-code-generator/issues/9440 都合、2023/07 現在一行削除し運用している

- npm run format  
  ※ prettier による自動フォーマッタ適用

- npm run lint  
  ※ eslint による lint 実施

- npm run build  
  ※ ビルド

- npm run test  
  ※ jest 実行  
  ※ npm run test -- ${path} で単一試験も可能

- npm run server  
  ※ nodemon で dummy server 起動

<br><br>

## CI

他からコピペで良い。テストが一つでもないと失敗する点に注意。

```
# This is a basic workflow to help you get started with Actions

name: CI
on:
  pull_request:
    branches:
      - "*"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use NodeJS
        uses: actions/setup-node@v1
        with:
          node-version: "18.x"
      - name: CI
        working-directory: ./
        run: |
          npm ci
          npm run format
          npm run lint
          npm run build
          npm run test
        env:
          # false の場合、worning レベルの場合はエラーにしない。
          # ※ false だったとしても、test でのエラーは Actions は失敗する。
          CI: false
```
