# Dockerを使ってMYSQLの環境を構築する方法
## 参考にしたサイト
1. [dockerでmysqlを使う](https://qiita.com/astrsk_hori/items/e3d6c237d68be1a6f548)
1. [docker-library/docs/mysql](https://github.com/docker-library/docs/tree/master/mysql)
1. [dockerでmysqlのデータを保存する方法](https://qiita.com/TakashiOshikawa/items/11316ffd2146b36b0d7d)

## dockerイメージのpull
1. mysqlイメージをpull
    ```bash
    $ docker pull mysql
    ```

1. busyboxイメージをpull
    ```bash
    $ docker pull busybox
    ```

## busybox使用してデータボリュームコンテナを立ち上げる
1. Dockerfileの作成
    ```bash
    $ touch Dockerfile && code Dockerfile
    ```

    以下のコードをDockerfileに貼り付けて保存。
    ```
    FROM busybox
    VOLUME /var/lib/mysql
    CMD /bin/sh
    ```

1. イメージのbuild
    ```bash
    $　docker build -t strage_image .
    ```

1. イメージが追加されたことを確認
    ```bash
    $ docker images
    ```

1. データボリュームコンテナの作成
    ```bash
    $ docker run -it -v /var/lib/mysql --name strage_container strage_image
    ```

1. コンテナが作成されたことを確認
    ```bash
    $ docker ps
    CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS               NAMES
    79320198c147        strage_image        "/bin/sh -c /bin/sh"   3 minutes ago       Up 16 seconds                           strage_container
    ```

## 立ち上げたデータボリュームコンテナをマウントしてmysqlコンテナを立ち上げる
1. mysqlコンテナの立ち上げ
    ```bash
    $ docker run --volumes-from strage_container --name mysql_container -e MYSQL_ROOT_PASSWORD=mysql -d -p 3306:3306 mysql
    ```

1. mysqlコンテナが作成されているかを確認
    ```bash
    $ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
    9ead81b538a7        mysql               "docker-entrypoint.s…"   6 seconds ago       Up 4 seconds        0.0.0.0:3306->3306/tcp, 33060/tcp   mysql_container
    79320198c147        strage_image        "/bin/sh -c /bin/sh"     5 minutes ago       Up 2 minutes                                            strage_container
    ```

## port3306:3306が既に使用中だというエラーが出た時の対処
1. 3306portの情報を取得
    ```bash
    $ sudo lsof -i:3306
    ```

1. kill PID number
    ```
    $ sudo kill <PID-number>
    ```

## 二つのコンテナの接続確認
1. mysql_containerでテストファイルを作成

    1. mysql_containerの中に入る
        ```bash
        $ docker exec -it mysql_container bash
        ```

    1. テストファイルを作成する
        ```bash
        $ /# cd var/lib/mysql/
        $ /var/lib/mysql/mysql# ls
        $ /var/lib/mysql# echo shinchokudoudesuka? > test.txt
        ```

1. テストファイルをstrage_containerで確認

    1. strage_containerが起動していることを確認
        ```
        $ docker ps
        ```
        ** 起動していなかったら以下コマンドで起動  
          ```bash    
          $ docker start strage_container
          ```

    1. strage_containerの中に入る
        ```bash
        $ docker attach strage_container
        ```

    1. テストファイルの有無を確認
        ```bash
        $ # cd var/lib/mysql/ && ls

        $ /var/lib/mysql # cat test.txt
        shinchokudoudesuka?
        ```
1. この続きは、参考サイトのNo.3の[ストレージコンテナにデータを追加(DBのデータ)](https://qiita.com/TakashiOshikawa/items/11316ffd2146b36b0d7d)を見ながら進めよう。

## SQLストレージエンジンについての記事
[第１回：MySQLストレージエンジンの概要](https://thinkit.co.jp/free/article/0608/1/1/
1. クエリを受けたSQLはどんな処理のクエリかをまず確認。
1. 次に実際のデータにアクセスしに行くんだけれども、必要なデータがどんなファイル形式かを知る必要がある。
1. その情報を保持しているのがストレージエンジンらしく、ストレージエンジンによって効率的にデータを扱うことができるっぽい。
1. ストレージエンジンには色々種類があって、その中でも```InnoDB```がデフォルトで汎用性が高いんだと。

```
mysql> show engines\g
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| Engine             | Support | Comment                                                        | Transactions | XA   | Savepoints |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| FEDERATED          | NO      | Federated MySQL storage engine                                 | NULL         | NULL | NULL       |
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO   | NO         |
| MyISAM             | YES     | MyISAM storage engine                                          | NO           | NO   | NO         |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
| CSV                | YES     | CSV storage engine                                             | NO           | NO   | NO         |
| ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO   | NO         |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
9 rows in set (0.00 sec)
```
