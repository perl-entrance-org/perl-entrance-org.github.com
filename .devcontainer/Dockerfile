# 基本イメージとしてVS Codeの汎用開発コンテナベースイメージを使用
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

# Perl、cpanminus、および必要なビルドツールのインストール
RUN sudo apt-get update \
    && sudo apt-get install -y perl cpanminus build-essential \
    && sudo rm -rf /var/lib/apt/lists/*

# App::cpm のインストール
# TODO: cpm 自体のインストール速度を上げたい
RUN cpanm App::cpm

# App::cpm を使用して Riji パッケージを並列でインストール
# TODO: --no-test しないと Riji が必要とする Git::Repository などがエラーになる
RUN cpm install --no-test -g Riji

# 作業ディレクトリの設定
# WORKDIR /workspace

# 標準で実行されるコマンドを指定 (ここでは bash を使う)
# CMD ["/bin/bash"]
