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
