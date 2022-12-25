## Docker 環境での実施の場合

マルチステージビルドを行い build 環境で Prisma Client を生成しており、production 環境には`Prisma CLI`が存在しません。  
`prisma generate`を production 環境で実行するのを避けたいというモチベーションが存在します。  
このケースでは、SQLite で作ったファイルベースの db をコンテナイメージの中に移動することで`prisma generate`なしで構築済みのデータベースを利用することを選択しました。
