# ๐ณ M1์์ Docker๋ก MySQL ์ค์นํ๊ธฐ
## Docker ์ค์นํ๊ธฐ
1. [docker ํํ์ด์ง](https://www.docker.com/products/docker-desktop)๋ก ๊ฐ์ Mac with Apple Chip ๋ฒ์ ์ docker๋ฅผ ์ค์น ํ๋ค.
1. ํฐ๋ฏธ๋์์ `$ docker -v`๋ช๋ น์ด๋ก Docker๊ฐ ์ค์น๋๋์ง ํ์ธํ๋ค.  
<br>
<br>

## MySQL ์ค์นํ๊ธฐ
1. MySQL Docker ์ด๋ฏธ์ง ๋ค์ด๋ก๋  
    - `$ docker pull mysql`  
    ๋ฒ์ ์ ์ ํ์ง ์์ผ๋ฉด ๊ฐ์ฅ ์ต์  ๋ฒ์ ์ ์ค์นํ๋ค.
    - `$ docker pull mysql:5.7`  
    ์ํ๋ ๋ฒ์ ์ ์ง์ ํ  ์ ์๋ค. ๋ค์ด๋ก๋ํ  ์ ์๋ MySQL ๋ฒ์ ์ [docker hub](https://hub.docker.com/_/mysql/?tab=tags)์์ ํ์ธํ  ์ ์๋ค.
    - `docker pull --platform linux/amd64 mysql:5.7`  
    ๊ทธ๋ฌ๋, M1์์๋ "no matching manifest for linux/arm64/v8 in the manifest list entries" ์ ๊ฐ์ ๋ฉ์ธ์ง๊ฐ ๋ณด์ด๊ณ  ์ค์น๊ฐ ๋์ง ์๋๋ค.  
    ์ด๋ด ๊ฒฝ์ฐ ํ๋ซํผ์ ๋ช์ํด์ฃผ์ด์ผ ํ๋ค.
    ```bash
    $ docker pull --platform linux/amd64 mysql:5.7
    5.7: Pulling from library/mysql
    6552179c3509: Pull complete
    d69aa66e4482: Pull complete
    3b19465b002b: Pull complete
    7b0d0cfe99a1: Pull complete
    9ccd5a5c8987: Pull complete
    2dab00d7d232: Pull complete
    64d3afdccd4a: Pull complete
    6992e58be0f2: Pull complete
    67313986b81d: Pull complete
    7c36a23db0a4: Pull complete
    d34c396e3198: Pull complete
    Digest: sha256:afc453de0d675083ac00d0538521f8a9a67d1cce180d70fab9925ebcc87a0eba
    Status: Downloaded newer image for mysql:5.7
    docker.io/library/mysql:5.7
    ```
1. Docker์ ๋ค์ด๋ก๋ํ ์ด๋ฏธ์ง ํ์ธ  
    `$ docker images`
    ```bash
    $ docker images
    REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
    mysql        5.7       0712d5dc1b14   11 days ago   448MB
    ```
1. Docker MySQL ์ปจํ์ด๋ ์์ฑ ๋ฐ ์คํ  
    `$ docker run --platform linux/amd64 --name mysql-container -e MYSQL_ROOT_PASSWORD=์ฌ์ฉํ ๋น๋ฐ๋ฒํธ -d -p 3306:3306 mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`  
    - `--platform linux/amd64`  
    MySQL ์ค์นํ  ๋์ ๊ฐ์ด ํ๋ซํผ์ ์ ์ด์ฃผ์ด์ผ ํ๋ค.
    - `--character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`  
    MySQL db๋ฅผ ์์ฑํ์ฌ ๊ฐ๋ฐ ์ ํ๊ธ๋ฌธ์ ๊ฐ ๋ฐ์ ํ  ๊ฒ์ด๋ค.  
    ํ๊ธ์ด ๊นจ์ง์ง ์๋๋ก ์ค์ ํ๋ ค๋ฉด ์๋ ์ธ์๊ฐ์ ๋ฃ์ด์ฃผ์ด์ผ ํ๋ค.  
    utf8์ 3byte ํฌ๊ธฐ์ ๊ธ์์ด๋ utf8๋ก ํ  ์, ์ด๋ชจ์ง๊ฐ ๊นจ์ง๊ฒ ๋๋ค.  
    utf8mb4๋ 4byte๋ก ์ต๊ทผ ๋ชจ๋ฐ์ผ ์ฌ์ฉ์ด ๋๋ฉด์ ๋ง์ด ์ฌ์ฉํ๊ฒ ๋์๋ค.  
    ๊ฐ๋ฐ ๋ชฉ์ ์ ๊ณ ๋ คํด์ utf8๊ณผ utf8mb4 ์ค ๊ณ ๋ คํ  ๊ฒ!
1. Docker ์ปจํ์ด๋ ๋ชฉ๋ก ํ์ธ  
    `$ docker ps -a`
    ```bash
    $ docker ps -a
    CONTAINER ID   IMAGE       COMMAND                  CREATED              STATUS          PORTS                               NAMES
    1a8cb7f58c24   mysql:5.7   "docker-entrypoint.sโฆ"   About a minute ago   Up 53 seconds   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql-container
    ```
1.  MySQL ์ปจํ์ด๋ bash ์ ์ ์  
    `docker exec -it ์ปจํ์ด๋๋ช bash`  
    ```bash
    $ docker exec -it mysql-container bash
    root@dc557b92f573:/# mysql -u root -p
    Enter password: # ๊ณ์ PW
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 9
    Server version: 8.0.22 MySQL Community Server - GPL

    Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
    ```  
<br>

### Reference
[https://poiemaweb.com/docker-mysql](https://poiemaweb.com/docker-mysql)  
[http://jmlim.github.io/docker/2019/07/30/docker-mysql-setup/](http://jmlim.github.io/docker/2019/07/30/docker-mysql-setup/)  
[https://bstar36.tistory.com/307](https://bstar36.tistory.com/307)  
[https://calvinjmkim.tistory.com/23](https://calvinjmkim.tistory.com/23)  
<br>
<br>

## MySQL ๊ณ์  ์์ฑ
1. `CREATE USER '์ฌ์ฉํ ID'@'%' IDENTIFIED BY '์ฌ์ฉํ PW';`  
    ```bash
    mysql> CREATE USER 'donyy'@'%' IDENTIFIED BY '1q2w3e4r';
    Query OK, 0 rows affected (0.02 sec)
    ```
1. `GRANT ALL PRIVILEGES ON *.* TO '์ฌ์ฉํ ID'@'%'';`  
    ```bash
    mysql> GRANT ALL PRIVILEGES ON *.* TO 'donyy'@'%';
    Query OK, 0 rows affected (0.01 sec)
    ```
1. `flush privileges;`  
    ```bash
    mysql> CREATE USER 'donyy'@'%' IDENTIFIED BY '1q2w3e4r';
    Query OK, 0 rows affected (0.02 sec)
    ```  
<br>
<br>

## DATABASE ๋ค๋ฃจ๊ธฐ
### DB ์์ฑ
`CREATE DATABASE ๋ฐ์ดํฐ๋ฒ ์ด์ค default CHARACTER SET UTF8MB4;`  
```bash
mysql> CREATE DATABASE user_info default CHARACTER SET UTF8MB4;
```  
<br>

### DB ์ญ์ 
`drop DATABASE ๋ฐ์ดํฐ๋ฒ ์ด์ค;`  
ex) drop DATABASE user_info;  
<br>

### DB ํ์ธํ๊ธฐ
`SHOW DATABASES;`  
<br> 

### DB ์ด๋ํ๊ธฐ
`USE ๋ฐ์ดํฐ๋ฒ ์ด์ค;`
```bash
mysql> USE user_info;
Database changed
```
<br>
<br>

## MySQL ๊ถํ ๋ถ์ฌํ๊ธฐ
1. `GRANT ๊ถํ ON ๋ฐ์ดํฐ๋ฒ ์ด์ค.ํ์ด๋ธ TO '์์ด๋'@'ํธ์คํธ' IDENTIFIED BY '๋น๋ฐ๋ฒํธ';`  
    - ID๊ฐ donyy, ๋น๋ฐ๋ฒํธ๊ฐ 1111์ธ ์ฌ์ฉ์๊ฐ user_info ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ๋ชจ๋  ํ์ด๋ธ(*)์ ์ ๊ทผํ๊ฒ ํ๋ ค๋ฉด ์๋์ ๊ฐ์ด ํ๋ค.
    ```bash
    mysql> GRANT DELETE, INSERT, SELECT, UPDATE ON user_info.* TO 'donyy'@'%'  IDENTIFIED BY '1111';  
    ```
1. `SHOW GRANTS FOR '์ฌ์ฉ์ID'@'%';`  
    - ์ง์  ID์ ๊ถํ์ด๋, ํน์  ์ฌ์ฉ์์ ๊ถํ์ ์ด๋ํ๋ค.
    - '%'๋, local์ด๋ Docker ์ ๋ถ๋ฅผ ์ด์ผ๊ธฐ ํ๋ค.
    ```bash
    mysql> SHOW GRANTS FOR 'donyy'@'%';
    ```
<br>
<br>

## ํ์ด๋ธ ๋ค๋ฃจ๊ธฐ
### ํ์ด๋ธ ์์ฑ
`CREATE TABLE ํ์ด๋ธ์ด๋ฆ;`
```bash
mysql> CREATE TABLE user_log (
    nickname varchar(64),
    money dec(10, 2),
    last_visit datetime
);
```  
<br>

### ํ์ด๋ธ ์กฐํ
`SHOW TABLES;`
```bash
mysql> SHOW TABLES;
+---------------------+
| Tables_in_user_log |
+---------------------+
| user_log           |
+---------------------+
1 row in set (0.00 sec)
```  
<br>

### ํด๋น ํ์ด๋ธ ์กฐํ
`DESC ํ์ด๋ธ์ด๋ฆ;` ๋๋ `SHOW COLUMNS FROM ํ์ด๋ธ์ด๋ฆ;`
```bash
mysql> DESC user_log;
+------------+---------------+------+-----+---------+-------+
| Field      | Type          | Null | Key | Default | Extra |
+------------+---------------+------+-----+---------+-------+
| nickname   | varchar(64)   | YES  |     | NULL    |       |
| money      | decimal(10,2) | YES  |     | NULL    |       |
| last_visit | datetime      | YES  |     | NULL    |       |
+------------+---------------+------+-----+---------+-------+
3 rows in set (0.05 sec)
```  
<br>

### ํ์ด๋ธ ์ญ์ 
`DROP TABLE ํ์ด๋ธ์ด๋ฆ;`
```bash
mysql> DROP TABLE user_log;
```