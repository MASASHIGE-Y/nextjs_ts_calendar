# Next.js Calendar App

Google Calendar風のカレンダーアプリです。

Next.js App Routerを使用して、
月ごとのページ遷移やカレンダー表示を実装しました。

## URL

https://nextjs-ts-calendar-steel.vercel.app

## 使用技術

- Next.js
- TypeScript
- Tailwind CSS
- date-fns
- Vercel

## 主な機能

- 月表示カレンダー
- 前月・翌月への切り替え
- 前週・翌週への切り替え
- URLベースのページ遷移
  - `/month/2026/5`
- 今日の日付表示
- Google Calendar風UI
- レスポンシブ対応
- 予定追加機能
- 予定編集機能
- 予定削除機能
- モーダルによる予定管理

## 工夫した点

- date-fnsを利用してカレンダーの日付生成を実装
- App Routerを利用したURLベースの画面遷移
- コンポーネント分割を意識した設計
- Google Calendarを参考にUIを作成
- 月ごとにURLを分けることで、直接アクセスやブラウザバックに対応

## 今後改善したい点

- データ永続化
- ドラッグ&ドロップによる予定移動
- データベース連携
- 認証機能
- UI/UX改善

## スクリーンショット

### 月表示

<img width="1470" height="802" alt="month" src="https://github.com/user-attachments/assets/559f81e6-d6b3-486c-b8a9-51679f21c183" />

### 週表示

<img width="1470" height="802" alt="week" src="https://github.com/user-attachments/assets/46bbb73e-2012-455b-a1bd-66c2f065c883" />


### 予定追加

<img width="1470" height="802" alt="create" src="https://github.com/user-attachments/assets/c8748818-9676-469f-9836-665ffd04b4b1" />


### 予定編集

<img width="1470" height="800" alt="edit" src="https://github.com/user-attachments/assets/ea89cdc7-8ded-4fca-9595-bd7096b2d52c" />

