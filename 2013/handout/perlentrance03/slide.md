#Perl入学式 #3

##今日の流れ
- 前回の復習
- 配列::More
- ハッシュ
- リファレンス

##前回の復習
- 変数
- 標準入力
- 演算子
- if, else 文
- for 文
- 配列

##Wow!!
もりだくさんですね！
覚えていますか？

#復習問題

## 復習問題
[practice.md](https://github.com/perl-entrance-org/perl-entrance-org.github.com/blob/master/2013/handout/perlentrance02/practice.md)
の `sum.pl` と `even_or_odd.pl` をやってみましょう

## ここからが今日の内容です

# 配列::More

## 配列
前回、皆さんは配列の基本を勉強しました。  
さて、そもそも配列ってどんな時に使う (使いたくなる) と思いますか？  

## 配列の用途
- 要素間の順序関係を表現したい場合 (e.g. 待ち行列)
- 要素の単純な集まりとして表現したい場合 (e.g. 集合)

**そしてそれらを画一的に操作したい (for 文とかで)**

## 配列を自在に操るためには
配列の要素を自由に

- 追加
- 取り出し

できる必要がある

## 要素の追加
- push
- unshift

## 要素の取り出し
- pop
- shift

## 覚えるべき対応関係
- push / pop
- unshift / shift

## push / pop
    my @array = ('Alice', 'Bob');
    push @array, "Chris";     # <= ('Alice', 'Bob', 'Chris')
    my $element = pop @array; # <= ('Alice', 'Bob')
    print $element;           # <= 'Chris'
配列が  
□□□  
こういう状態の場合...
<h3>push</h3>
□□□■ ←末尾に要素を追加
<h3>pop</h3>
□□≡■←末尾の要素を取り出せる

## unshift / shift
    my @array = ('Alice', 'Bob');
    unshift @array, "Zappa";    # <= ('Zappa', 'Alice', 'Bob')
    my $element = shift @array; # <= ('Alice', 'Bob')
    print $element;             # <= "Zappa"
配列が  
□□□  
こういう状態の場合...
<h3>unshift</h3>
先頭に要素を追加→ ■□□□
<h3>shift</h3>
先頭の要素を取り出せる→■≡□□

## 練習問題

- ('Alice', 'Bob') という配列に対して、紹介した関数を使って操作して ('Amon2', 'Alice', 'Bob', 'Catalyst') という配列を作りましょう
- ('Alice', 'Bob') という配列に対して、紹介した関数を使って操作し、'Alice' を取り出してみましょう
- ('Alice', 'Bob') という配列に対して、紹介した関数を使って操作し、'Bob' を取り出してみましょう

## qw ショートカット
    my @array = qw( Alice Bob Chris ); # <= ('Alice', 'Bob', 'Chris')

- リストリテラル ('値をコンマで区切って', '並べて', 'カッコで囲んだもの') と違って、クォート記号がいらない
- 空白文字 (スペース、タブ、改行など) は捨てられ、残ったものがリストの要素になる

なのでこういう書き方もできます (**あまりやらない**)

    my @arary = qw(
        Alice
        Bob
    );

## qw ショートカット
    # デリミタ (区切り文字) には任意の記号文字が使える。例えば...
    qw! Alice Bob !
    qw# Alice Bob #
    qw/ Alice Bob /

これらは前述の

    qw( Alice Bob )

と等しい

## qw ショートカット
    # これは困った！ エラーになってしまう！
    # デリミタがスラッシュ (/) で、要素中にもスラッシュが含まれてしまっている
    qw/http://www.google.com http://www.yahoo.com/

解決法は2つ

    # 1. スラッシュをバックスラッシュでエスケープしてあげる
    qw/ http:\/\/www.google.com http:\/\/www.yahoo.com /  # <= 読みにくく感じるかもしれない
    # 2. デリミタを変える
    qw! http://www.google.com http://www.yahoo.com !      # <= ちょっと読みやすいかもしれない

## split
split は指定したパターンに従って文字列を分割します

    my $poem  = "I Love Python.";
    my @words = split / /, $poem; # <= ('I', 'Love', 'Python.')

引数として与えた文字列を // でくくった文字 (上の例だと半角スペース) で分割して配列に格納します。  
  
(ところで、// は正規表現リテラルと呼ばれるものです。正規表現リテラルの話は長くなるので、次回以降に紹介します。今は「そういうものなんだ…」と耐えて下さい！！)

## join
join は 分割された文字列をくっつけて1つの文字列にします。(split の逆の働きですね！)

    my @words = qw( I Love Ruby. ); # <= qw ショートカットだ！
    my $poem  = join '_', @words;
    print $poem;  # <= 'I_Love_Ruby.'

join の受け取る取る第1引数は糊のようなものです。リストの要素をくっつけるときに、その間にはさみます。  
(今回の場合だと、 '\_' という風に指定しているので、リストの各要素をアンダースコアでくっつけます)  
第2引数はバラバラになった文字列の配列です。

## 練習問題
- ("0120" "123" "XXX") という内容の配列を qw ショートカットを使って作ってみましょう
- 上の問題で作った配列を、join で繋げてみましょう。なんだか電話番号っぽいので、ハイフン ('-') を間にはさみましょう。
- 文字列 "/usr/bin/env perl" という文字列を、スラッシュ ('/') で分割して配列に格納してみましょう

# ハッシュ

## ハッシュとはなんでしょう
- Perl のデータ構造のうちのひとつ
- 「連想配列」とも呼ばれます
- 配列と同じく、任意個の値の格納・取り出しができます
- ハッシュは配列とは異なり、数値ではなく名前を使って格納した個々の値を指定します
    - 要素を指定する為の名前を "key"、key によって指定された要素を "value" と呼びます

## たとえば

- 名前: Kurt
- 職業: Guitarist
- 所属: NIRVANA

という人をデータとして表現してみましょう

## 配列と比較してみましょう
配列の場合だとこんな感じでした

    my @user = ("Kurt", "Guitarist", "NIRVANA");
    print $user[0]; # 名前が表示される
    print $user[1]; # 職業が表示される
    print $user[2]; # 所属が表示される

## これがハッシュだと...
(**書き方は後で説明します**)

    my %user = (
        name        => "Kurt",
        job         => "Guitarist",
        affiliation => 'NIRVANA'
    );
    print $user{name};        # 名前 (name) が表示される
    print $user{job};         # 職業 (job) が表示される
    print $user{affiliation}; # 所属 (affiliation) が表示される

なんだかわかりやすい感じがしますね！

## ハッシュの代入と出力（スカラーで）
ハッシュは % を使って定義します。

    my %hash;              # <= これがハッシュの定義です
    $hash{name} = "Alice"; # <= ハッシュにアクセスするときは 中カッコ {} を使います
    $hash{age}  = 16;
    print "$hash{name}\n"; # <= "Alice"
    print "$hash{age}\n";  # <= 16

- ハッシュにアクセスするときは、添字として中カッコ {} を使います
- 1つのハッシュ内に、文字列や数値が混在していても構いません

## ハッシュの代入と出力（リストで）
ハッシュは配列の一種なので、こういう書き方もできます。

    my %hash = ('name', 'Alice', 'age', 16);
    print "$hash{name}\n"; # <= "Alice"
    print "$hash{age}\n";  # <= 16

- 配列は要素の順序関係を保ってくれますが、ハッシュの場合はその限りではありません。順序性を期待 **しないで** ください
- 配列とは異なり、ハッシュをダブルクォートでくくっても展開されません


## ハッシュの代入と出力（ハッシュっぽく）
実際、こういう風に書くのが便利で良い感じです。

    my %hash = (
        'name' => 'Alice', # ファットコンマ演算子 (=>) で key と value の関係を書ける
        age    => 16       # 左側の値は文字列として解釈されるのでクォートの必要がない
    );
    print "$hash{name}\n"; # <= "Alice"
    print "$hash{age}\n";  # <= 16

ファットコンマ演算子は基本的にコンマのようなものです。ハッシュではファットコンマ演算子を使うと、key と value の関係性が見やすいので便利です。

## 結局 Hash の何が便利なのか
    my @user = ("Name", "Job", "Affiliation");

これがある日突然

    my @user = ("Affiliation", "Job", "Name");

という風に順序が入れ替わったらどうしましょう。今まで動いていたコードを書き換えなくてはならなくなります。  
ハッシュだと、 順序ではなく Key で対応付けがされているのでそういった問題が起こりません。便利だ。

## 結局 Hash の何が便利なのか
あとは、とてつもなく長い引数になってしまった場合とか、「この引数はオプショナルにしたいなー」という場合とかに便利ですが、
ちょっと内容が難しくなりそうなので、ここでの詳しい説明は避けます。

## ハッシュをダンプする
    use Data::Dumper;
    my %hash = (
        name        => 'Kurt',
        job         => "Guitarist",
        affiliation => 'NIRVANA'
    );
    print Dumper(%hash);

こうするとハッシュがダンプできて便利です。やってみましょう！

## 練習問題
- 自分の名前 (name)、性別 (sex)、好きな食べ物 (food) をキーにしたハッシュを作ってみましょう
- また、そのハッシュをダンプしてみましょう

## ハッシュの便利関数たち

- keys
- values
- delete

## keys
    my %hash = (
        name        => 'Kurt',
        job         => 'Guitarist',
        affiliation => 'NIRVANA'
    );
    my @keys = keys %hash;
    print "@keys\n";    # <= "name job affiliation"

keys 関数はその関数の key を配列にして返してくれます。  
(この時、key の順序が維持されていることを期待 **しない** でください)

## values
    my %hash = (
        name        => 'Kurt',
        job         => 'Guitarist',
        affiliation => 'NIRVANA'
    );
    my @values = values %hash;
    print "@values\n";    # <= "Kurt Guitarist NIRVANA"

values 関数はその関数の value を配列にして返してくれます。  
(この時、value の順序が維持されていることを期待 **しない** でください)

## delete
    my %hash = (
        name        => 'Kurt',
        job         => 'Guitarist',
        affiliation => 'NIRVANA'
    );
    delete $hash{affiliation};
    # この時、%hash は以下のようになっている
    # %hash = ( name => 'Kurt', job => 'Guitarist' );

delete 関数は指定した hash の key に対応する value を削除します

## 練習問題

- 先ほどの問題で作ったハッシュに対して for で回して各要素にアクセスし "name: Larry Wall" のように整形して出力してください
- (ヒント: keys を使います。というか (演習問題の都合上) 使って下さい)
- 先ほどの問題で作ったハッシュに対して、delete を使って性別の要素を取り除いて下さい

# リファレンス

## リファレンスとは
リファレンスとは参照です。  
リファレンスを使うと複雑なデータ構造を表現出来たりします。

## どういうこと？
例えば、リファレンスを使うとハッシュの中にハッシュを格納し、更にそのハッシュにハッシュを格納する……みたいな複雑なデータ構造を表現出来ます。

## あとは
関数の引数に複数の配列を渡す必要がある場合などに使います。  
また、関数に引数として配列やハッシュを渡すとそれらをコピー (クローン) してしまうので、非効率になる場合があります。
リファレンスはコピーするのではなく参照を渡すだけなので、その問題を回避することができます。  
(これらはまた後で出てきます)

## リファレンスの例
    my $scalar     = 'scalar';
    my $scalar_ref = \$scalar   # スカラーのリファレンス;
    my @array      = ( 'this', 'is', 'array' );
    my $array_ref  = \@array;   # 配列のリファレンス
    my %hash       = ( this_is => 'hash' );
    my $hash_ref   = \%hash;    # ハッシュのリファレンス

それぞれのシジルの前にバックスラッシュ (\\) を置くことによってそれぞれリファレンスになります

## 簡単な書き方 (配列)
    my $array_ref = ['This', 'is', 'array-ref'];

普通のかっこ () ではなく角かっこ [] によって要素をくくってやることで、配列のリファレンスになります

## 簡単な書き方 (ハッシュ)
    my $hash_ref = {
        this_is => 'hash_ref'
    };

普通のかっこ () ではなく波括弧 {} によってくくってやることで、ハッシュのリファレンスになります

## さて、ここで print してみましょう
    my $array_ref = ['This', 'is', 'array-ref'];
    print $array_ref;

`ARRAY(0x7fd8938060b8)` みたいな出力が得られると思います (括弧の中身は実行環境によって異なります)  
スカラーリファレンスの場合はSCALAR()、ハッシュリファレンスの場合はHASH() とそれぞれ表示されます

## これはなに
最初に言ったように、リファレンスは参照です。  
SCALAR() や ARRAY()、HASH() の括弧の中身に書いてあるのはその実体が格納されているアドレスです。

## おれは中身が欲しいんだけど？
そこで出てくるのが“デリファレンス”です

## デリファレンスとは
デリファレンスから、元のスカラーや配列、ハッシュを得るための操作です。

## デリファレンスの例
    my $scalar     = 'scalar';
    my $scalar_ref = \$scalar;
    print $$scalar_ref; #<= アドレスではなく“scalar”が表示される
    my $array_ref  = ["I'm", "scalar-ref"];
    print @$array_ref;  #<= アドレスではなく配列の中身が展開される
    my $hash_ref   = { this_is => 'hash-ref' };
    print %$hash_ref;

## デリファレンス (スカラー)
    my $scalar     = 'scalar';
    my $scalar_ref = \$scalar;
    print $$scalar;

スカラーをデリファレンスするためには、そのリファレンスの前にスカラーのシジル ($) を置きます。

## デリファレンス (配列)
    my $array_ref = ['zero', 'one', 'two'];
    print @$array_ref;      # <= 配列の中身が展開される (zeroonetwo)
    print ${$array_ref}[1]; # <= 'one'
    print $array_ref->[1];  # <= 上と同じ。こうも書ける。むしろこう書く。

配列をデリファレンスするためには、そのリファレンスの前に配列のシジル (@) を置きます。  
配列の要素に対してデリファレンスしたい場合 (配列リファレンスから要素を取り出したい場合)、
配列リファレンスをスカラーとしてデリファレンスして波括弧でくくり、通常の配列のようにアクセスすると内容を得られます。  
また、中括弧と$を取り除き、その代わりにアロー (->) によりアクセスする事もできます。

## デリファレンス (ハッシュ)
    my $hash_ref = { key => 'value' };
    print %$hash_ref;        # <= ハッシュの中身が展開される (keyvalue)
    print ${$hash_ref}{key}; # <= 'value'
    print $hash_ref->{key};  # <= 上と同じ。こうも書ける。むしろこう書く。

ハッシュをデリファレンスするためには、そのリファレンスの前にハッシュのシジル (%) を置きます。  
ハッシュの要素に対してデリファレンスしたい場合、ハッシュリファレンスをスカラーとして
デリファレンスして波括弧でくくり、通常のハッシュのようにアクセスすると内容を得られます。
また配列同様、中括弧と$を取り除きその代わりにアロー (->) によりアクセスする事もできます。

## ダンプ再び
    use Data::Dumper;
    my $hash_ref = { key => 'value' };
    print $hash_ref; # => HASH(0x7f88d08060b8)
    print Dumper($hash_ref);
    # $VAR1 = {
    #           'key' => 'value'
    #         };

いちいち中身を確認するのにデリファレンスするのがだるい！　という時はダンプすると中身をゲロっと見れて便利でしょう。

## リファレンスのはまりどころ
    my $scalar     = 'scalar';
    my $scalar_ref = \$scalar;
    print $scalar; # => 'scalar'
    $$scalar_ref = 'changed!';
    print $scalar; # => 'changed!'

リファレンスは参照なので、デリファレンスして更にその中身を変更すると、参照元が破壊されます

## オートデリファレンス
Perl 5.14 以降はオートデリファレンスという機能が実装されました。  
その名の通り、明示的にデリファレンスしなくても自動でデリファレンスしてくれます。  
便利っちゃ便利なんですけど、お行儀が悪いので避けられる傾向にあります。  
(下位互換性を確保できないから、という理由もありますが)

## 復習問題

- <https://github.com/perl-entrance-org/workshop-2013-03/blob/master/practice.md>

  - 今回の内容を復習することができる問題集です
  - ご不明な点があれば, 気軽にスタッフまでお尋ねください

