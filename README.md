www.perl-entrance.org
=====================

Perl入学式の公式サイトです。

# 作り方

Rijiを使っています. `/article`以下に記事ファイルがありますので, 編集したら`$ riji publish`して, コミットしましょう.
適当に記事見たい時は`$ riji-server`とかで立ち上がります.

# SETUP

    carton install --deployment
    carton exec -- riji-server

# Daikufile

daikuコマンドが使える場合は下記のようにコマンドを実行できます。

    # テストサーバーの起動
    daiku serve

    # 編集後のコンパイル
    daiku publish
