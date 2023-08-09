## 指針

### error ハンドリング

React でのデフォルトの挙動は以下の通り

* レンダリング時にエラーが発生  
  → 画面が全アンマウントされ (真っ白になり) 操作できなくなる  
  例: コンパイルエラーなどの実装バグ、コンポーネント描画時にエラーが投げられた場合など

* レンダリング外でエラーが発生  
  → コンソールにエラーが表示され、操作は継続して可能  
  例: ボタン押下後の非同期処理などでエラー、レンダリングの関係ない部分でエラーが投げられた場合など

<br><br>

本コンポーネントでは以下規約でエラーをハンドリングする

* 想定内のエラーとして以下 Error を独自として持つ  
  - ApiError: API 通信時のエラー  
  - AppError: ApiError 以外で制御すべきエラー

その上で以下ハンドリングを行う。

<br>

* レンダリング時にエラーが発生  
  → トップ階層の Error Boundary でハンドリングし復旧不可能にする。  
  ※ Error Boundary そのものでイベントハンドラ・非同期コードは制御されないため、それ以外を制御する。  
  ※ 主に、コンパイルエラーなどの実装バグがメインのため、復旧不可能とする。

<br>

* レンダリング外でエラーが発生 (useQuery/useMutation での非同期通信時のエラー)
  → 想定外のエラー (AppError 以外) はトップ階層の Error Boundary でハンドリングし復旧不可能にする。  
  → 想定内のエラー (AppError) は onError でハンドリングする。

<br>

※ 検討時の参考資料

https://tkdodo.eu/blog/react-query-error-handling

<br><br>

### UI

* Grid Layout が基本  
  - Excel で画面を作るようなイメージ  
  (参照) https://react-bootstrap.netlify.app/docs/layout/grid/

<br><br>

### テスト

https://testingjavascript.com/

```
* E2E
  - playwright を用いて実施する

* Integration Test
* Unit Test
  - jest 及び react-testing-library を用いて実施する
  - model など Component にかかわらないもの
  - View Component

* Static
  - lint や TypeScript

※ 大前提としてやりすぎない。
※ 「コードカバレッジ」より「ユースケースカバレッジ」を意識し、ユーザから見てどうかという観点で試験を行う。
```

<br><br><br>

## 知見

### レンダリングのタイミング

* 再レンダリングが発生する条件
  - 親コンポーネントがレンダリングされた場合  
  - state が変化した場合  
  ※ props の変化は関係ない点が重要で、結果的に親コンポーネントがレンダリングされた時に props が変化することが多いからそう見えるだけである。  
  ※ props が変化することが多い、という点からすべてのコンポーネントの `useMemo` が使われていないと公式でいっている。

<br>

* ステップ
  - レンダリングフェーズで再描画が必要とマークされているものを抽出する  
    ※ このマークは再レンダリングが発生する条件に合致した場合、マークされる。

  - コミットフェーズで実際に再描画する  
    ※ 差分マージが行われ、必要な部分だけが再描画される。  
    ※ Root が再描画されれば全コンポーネントが、あるページルートが再描画されればそのページの子コンポーネントが再描画される。  
    ※ key 要素を使うことで差分マージが行われるという機構を持っている。

<br>

* 対応策
  - `useMemo` を使う  
    ※ 前 props と次 props に変化がなかった場合に再描画をスキップする。

  - `useCallback` を使う  
    ※ 前 propd と次 props の比較は `===` で行われるため、これで解決できるケースがある。

(参照) https://qiita.com/hellokenta/items/6b795501a0a8921bb6b5

<br><br>

#### Async

忘れたら読む: https://jsprimer.net/basic/async/

* 非同期処理はメインスレッドで実行される  
  ※ 同期処理によって非同期処理も遅れる。

* 非同期処理は外に例外を通知する必要がある  
  ※ ES2015 から Promise が誕生した。

* Promise の特徴  
  - Pending、Resolve、Reject の 3 つの状態がある  
  - 生成時点では Pending となる。  
  - Resolve、Reject 後はその Promise インスタンスは状態変化しない  
  - cache は Resolve 状態の Promise を返す

* Asyn Function の誕生  
  - Async 関数は以下の点が通常の関数とは異なる  
  - Async 関数は Promise インスタンスを返す  
    ※ return まで到達すると Promise.resolve(値) が返却される。  
    ※ 例外が発生する/させると Primise.reject が返却される。  
  - Async 関数は await を使える
    ※ await は右辺の Promise インスタンスが Fulfilled/Rejectd になるまでその場で非同期処理の完了を待つ。  
    ※ await は右辺の Promise インスタンスの評価結果を値として返す。  
    ※ await の右辺の Promise インスタンスが Reject になった場合はその場でエラーを throw する。  
    ※ Promise インスタンスの状態が変化した後次の行の処理を再開する。  
    ※ Async Funciton 内で発生した例外は自動でキャッチされ、Async Function からは Reject な Promise を返される。  
    ※ Async Funciton 内で発生した例外を自分で try cache し rethrow しない場合、Async Function からは Resolve な Promise を返される。  
    ※ Async Function の呼び出し元は Async Function の完了を待たずに処理を継続できる。
