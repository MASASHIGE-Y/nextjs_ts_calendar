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

月単位で予定を管理できます。
今日の日付にはマークが表示されます。

<img width="1470" height="802" alt="month" src="https://github.com/user-attachments/assets/526f6d8b-7378-4288-ba6d-e5928263aede" />

### 週表示

週単位で予定を確認できます。

<img width="1470" height="802" alt="week" src="https://github.com/user-attachments/assets/d3c9a895-bc79-48aa-ae5c-d7e3b8029d7e" />

### 予定追加

モーダルを利用して予定を追加できます。（月単位、週単位で可能）

<img width="1470" height="801" alt="createMonth" src="https://github.com/user-attachments/assets/9bf14c5b-7d2d-4a24-9394-d8b7e0a40fff" />

<img width="1470" height="802" alt="create" src="https://github.com/user-attachments/assets/a85175b5-3963-41cb-a062-fbd02b2635d1" />

### 予定編集

作成した予定は編集・削除できます。（月単位、週単位で可能）

<img width="1470" height="804" alt="editMonth" src="https://github.com/user-attachments/assets/7b45b795-fcee-40b9-b6fa-f5dac17d977a" />

<img width="1470" height="800" alt="edit" src="https://github.com/user-attachments/assets/e3c08926-61a5-4ec1-a2ca-f1d7bece7c8c" />
