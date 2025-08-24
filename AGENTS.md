# perl-entrance-org/perl-entrance-org.github.com 生成AIエージェント向け解説

## このリポジトリについて

このリポジトリは Perl入学式公式サイト https://www.perl-entrance.org/ のコンテンツを管理するためのものです。GitHub Static Pagesを利用してホスティングされています。

## コンテンツ管理の仕組みについて

コンテンツは Perl の Riji を使って管理されています。

また、Codespaces 等での環境構築を簡単にするため、 `.devcontainer` ディレクトリに設定ファイルが含まれています。Codespaces では、これらの設定を利用して、すぐに開発環境を立ち上げることができます。

## 環境構築方法

上記 の `.devcontainer` ディレクトリを利用しない場合は、以下の手順に沿って環境を構築してください。

### 1. Perl のインストール

既存の環境にある Perl を利用する方法もありますが、plenv や perlbrew などの Perl バージョン管理ツールを利用することが推奨されます（このあとインストールする Riji が依存するパッケージを大量にインストールする際、システムの Perl のパッケージに不整合が起こることを回避する等のためです）。

plenv を利用する場合の例を以下に示します。下記は例となります。Perl のバージョン等は適宜調整してください。

```bash
# plenv のインストール
git clone https://github.com/tokuhirom/plenv.git ~/.plenv
echo 'export PATH="$HOME/.plenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(plenv init -)"' >> ~/.bashrc
source ~/.bashrc
# perl-build のインストール
git clone git://github.com/tokuhirom/Perl-Build.git ~/.plenv/plugins/perl-build
# Perl のインストール
plenv install 5.36.0
plenv global 5.36.0
# global で設定したバージョンの perl に cpanm へのインストール
plenv install-cpanm
```

plenv や perlbrew で perl をインストールする際、SSL/TLS 関連のライブラリが不足していると、CPAN モジュールのインストールに失敗することがあります。必要に応じて、OpenSSL や Net::SSLeay などのライブラリをインストールする必要があります。

上記を簡略化する別の方法として ytnobody/plenvsetup を利用する方法もあります。詳細は https://github.com/ytnobody/plenvsetup を参照ください。

SSL/TLS に関しては xtetsuji/plenv-ssl-doctor を使うことでインストールを簡単にすることもできます。詳細は https://github.com/xtetsuji/plenv-ssl-doctor を参照ください。

### 2. Riji のインストール

Riji のインストールは、以下のコマンドで行います。

```bash
cpanm Riji
```

依存パッケージのテストに時間がかかるため、インストールには一定の時間がかかります。また、依存パッケージのインストールに失敗する場合があります。その場合は、エラーメッセージを参考に、必要なライブラリをインストールするか、リスクを承知の上であれば `cpanm` コマンドに `--notest` オプションを付けて再度実行してください。

### 注釈: Git::Repository::FileHistory のインストールに失敗する場合

以下のようなエラーが出た場合

```
! Installing the dependencies failed: Module 'Git::Repository' is not installed, Module 'Git::Repository::FileHistory' is not installed
! Bailing out the installation for Riji-v1.1.4.
```

この問題は、`Git::Repository`モジュールのテストが環境固有の理由で失敗することが原因です。

このような場合は、以下の手順で `Git::Repository` と `Git::Repository::FileHistory` を強制インストールし、その後 Riji を再インストールしてください。

```bash
# Git::Repositoryを強制インストール
cpanm --force Git::Repository

# Git::Repository::FileHistoryを強制インストール
cpanm --force Git::Repository::FileHistory

# その後Rijiを再インストール
cpanm Riji
```

## コンテンツの基本設計

Riji によって管理されるコンテンツファイルは、以下のディレクトリ構成になっています。

- article/ : 各記事のコンテンツを格納するディレクトリ
- share/static/ : 画像や CSS など、静的ファイルを格納する
- share/tmpl/ : ヘッダやフッタなど、テンプレートファイルを格納する

更新作業で追加・編集するファイルは、基本的に上記ディレクトリ中となります。

上記で更新したファイルを GitHub Static Pages で見えるようにするには、以下のコマンドを実行して、プロジェクトルートに展開されます。

```
riji publish
```

上記を踏まえ、Git/GitHub 操作を行うフローは以下のようになります。

1. GitHub の master の最新 HEAD からブランチを切る（または個人環境に Fork して 同様の処理を行う）
2. article/ share/static/ share/tmpl/ 以下のファイルを編集・追加する
3. `riji server` を実行すると確認用のローカルサーバが 3650 番ポートで起動するので、ブラウザで `http://localhost:3650` にアクセスして内容を確認する
4. ファイルを add および commit する
5. 上記の確認で問題がない場合は、  `riji publish` を実行して静的コンテンツとして書き出す
   - **注意**: `riji publish` は通常 `main` ブランチでの実行を要求するが、開発作業中は `--force` オプションを付けて `riji publish --force` で実行することができる
6. 書き出したファイルを add および commit する
7. push して Pull-request を作成する
8. レビュー等の対応が行われ、問題がなければ master にマージされることで本番サーバに反映される

## コンテンツ管理に関するルール

コンテンツを編集・追加する場合の方法について解説します。

### 既存のコンテンツを編集する場合

既存のコンテンツを編集する場合は、 article/ ディレクトリ以下の該当する Markdown ファイルを編集してください。

特に article/index.md が実際の `/index.html` に対応し、GitHub Static Pages で公開される際のエントリポイントとなります。GitHub Static Pages の Directory Index は index.html が優先的に使用されるため、トップページ `/` でアクセスした際に表示される内容を変更したい場合は、 article/index.md を編集してください。

### 新しいコンテンツを追加する場合

新しいコンテンツを追加する場合は、 article/ ディレクトリ以下に新しい Markdown ファイルを拡張子 .md で追加してください。ファイル名は、記事のタイトルを反映したわかりやすい名前にしてください。

新しい画像等の静的アセットを追加する場合は、 share/static/ 以下に適切なサブディレクトリを作成し、そこにファイルを配置してください。例えば、画像を追加する場合は `share/static/images/` ディレクトリを作成し、その中に画像ファイルを保存します。既に存在するディレクトリがあれば、そこに追加しても構いません。

### JavaScript の取り扱い

静的アセットの一つとして JavaScript ファイルを追加する場合は、 `share/static/js/` ディレクトリを活用してください。それを読み込む方法は既存のテンプレートを参考にしてください。

### コンテンツファイルの形式

コンテンツファイルは冒頭にテンプレートのメタデータを指定する YAML ヘッダを含む必要があります。YAML ヘッダは三つのハイフン `---` で囲まれた部分に記述します。その後に、1つ以上の HTML 要素があり、それが上位のテンプレートに取り込まれ、HTML コンテンツを作成します。以下は基本的な例です。

```markdown
template: index
---

<div>
    コンテンツ
    ...
</div>
```

index という名前のテンプレート、すなわち `share/tmpl/index.tx` を使用してコンテンツを生成します。テンプレートは更に上位のテンプレートの一部分になっていることもあり、実際に `share/tmp/index.tx` は `share/tmp/base.tx` の一部として取り込まれます（2025年8月現在）。

拡張子 .tx ファイルの文法は Text::Xslate モジュールに準拠しています。詳細は https://metacpan.org/pod/Text::Xslate を参照してください。通常の使用範囲であれば、このリポジトリ内の .tx ファイルを参考にすることで十分です。


### テンプレートの追加・編集

テンプレートを追加・編集する場合は、 share/tmpl/ ディレクトリ以下の該当するテンプレートファイルを編集・追加してください。テンプレートファイルは Text::Xslate モジュールで解析される拡張子が .tx の HTML テンプレートとして機能し、ヘッダやフッタなどの共通部分を管理します。新しいテンプレートを追加する場合は、わかりやすい名前でファイルを作成して、必要に応じて既存のテンプレートを参考にしてください。

新たに作成したテンプレートの読み込み方法についても、既存のテンプレートを参考にしてください。

通常の更新においては、テンプレートを触ることは無いと思います。

## イベント表示のレイアウトについて

トップページ（`article/index.md`）のイベント表示は、CSS Foundationの1/2列グリッドシステムを使用しています。

### 2列表示の場合

複数のイベントを2列で表示する場合は、以下のような構成にします：

```html
<div class="row">
    <!-- 左列のイベント -->
    <div class="medium-6 large-6 columns next-event">
        <!-- イベント1の内容 -->
    </div>

    <!-- 右列のイベント -->
    <div class="medium-6 large-6 columns next-event">
        <!-- イベント2の内容 -->
    </div>
</div>

<div class="row">
    <!-- 3つ目以降のイベントがある場合は新しい行を作成 -->
    <div class="medium-6 large-6 columns next-event">
        <!-- イベント3の内容 -->
    </div>

    <div class="medium-6 large-6 columns next-event">
        <!-- イベント4の内容 -->
    </div>
</div>
```

### 1列表示の場合

単一のイベントのみを表示する場合は、以下のような構成になります：

```html
<div class="row">
    <div class="medium-6 large-6 columns next-event">
        <!-- 単一イベントの内容 -->
    </div>
</div>
```

### 重要なポイント

- `medium-6 large-6` クラスにより、中・大画面で50%幅（12列中6列）の2列表示になります
- 小画面（スマートフォン等）では自動的に1列表示になります
- 2つのイベントを横並びにしたい場合は、同じ `<div class="row">` 内に配置します
- 3つ以上のイベントを表示する場合は、新しい `<div class="row">` を作成して次の行に配置します

現在の構成では1つのイベント（大阪）のみが表示されており、1列表示となっています。

### 1列表示の場合

単一のイベントのみを表示する場合は、以下のような構成になります：

```html
<div class="row">
    <div class="medium-6 large-6 columns next-event">
        <!-- 単一イベントの内容 -->
    </div>
</div>
```

### 重要なポイント

- `medium-6 large-6` クラスにより、中・大画面で50%幅（12列中6列）の2列表示になります
- 小画面（スマートフォン等）では自動的に1列表示になります
- 2つのイベントを横並びにしたい場合は、同じ `<div class="row">` 内に配置します
- 3つ以上のイベントを表示する場合は、新しい `<div class="row">` を作成して次の行に配置します

現在の構成では1つのイベント（大阪）のみが表示されており、1列表示となっています。


