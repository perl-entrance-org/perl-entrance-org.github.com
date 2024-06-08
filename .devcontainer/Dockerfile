# 基本イメージとしてVS Codeの汎用開発コンテナベースイメージを使用
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

# Perl、および必要なビルドツールのインストール
RUN sudo apt-get update \
    && sudo apt-get install -y perl build-essential curl \
    && sudo rm -rf /var/lib/apt/lists/*

# cpanminus, App::cpm のインストール
RUN curl -fsSL https://raw.githubusercontent.com/skaji/cpm/main/cpm | perl - install -g App::cpm App::cpanminus

# App::cpm を使用して Riji パッケージを並列でインストール
# TODO: --no-test しないと Riji が必要とする Git::Repository などがエラーになる
RUN cpm install --no-test -g Riji

# 作業ディレクトリの設定
# WORKDIR /workspace

# 標準で実行されるコマンドを指定 (ここでは bash を使う)
# CMD ["/bin/bash"]
