# π λ°μ΄ν° λ² μ΄μ€ μ€μΉ
- [X] κ°μ νκ²½μ μν΄μ dockerλ₯Ό μ€μΉνλ€.
- [X] docker κΈ°λ°μΌλ‘ mysql server 5.7 λ²μ μ μ€μΉνλ€.
- [X] docker λͺλ ΉμΌλ‘ mysql μ»¨νμ΄λμ bashλ‘ μ μνλ€.
- [X] μ νκ²½λ³μμ locale μ€μ μ νκ³ , mysql configλ₯Ό latin1μμ utf8λ‘ λ³κ²½νλ€.

<img width="650" src="https://user-images.githubusercontent.com/17706346/152873314-63f0bfed-e9b6-42e3-a93f-37bd6eeea5c0.png">  
<br>
<br>

## λμ©λ λ°μ΄ν° μμ±
```bash
mysql> CREATE TABLE user_log (
    nickname varchar(64),
    money dec(10, 2),
    last_visit datetime
);

mysql> desc user_log;
+------------+---------------+------+-----+---------+-------+
| Field      | Type          | Null | Key | Default | Extra |
+------------+---------------+------+-----+---------+-------+
| nickname   | varchar(64)   | YES  |     | NULL    |       |
| money      | decimal(10,2) | YES  |     | NULL    |       |
| last_visit | datetime      | YES  |     | NULL    |       |
+------------+---------------+------+-----+---------+-------+
3 rows in set (0.01 sec)
```

- [X] user_log νμ΄λΈμ 100λ§κ±΄μ λμ©λ λ°μ΄ν°λ₯Ό μμ±
- [X] μ¬μ©μ nickname μ μμ΄ λ¨μ΄ 100κ° + λλ€ λ¬Έμμ΄ 3μλ¦¬ + λλ€ μ«μ 4μλ¦¬λ‘ μμ±
- [X] money λ 1λΆν° 100,000 μ¬μ΄ κ°μ μ λΉνκ² λΆν¬
- [X] last_visit μ μ΅κ·Ό ν λ¬ μ¬μ΄λ‘ λλ€ μκ°μΌλ‘ μμ±
```bash
mysql> CREATE TABLE random_word(
    nickname varchar(57)
);
Query OK, 0 rows affected (0.03 sec)

mysql> INSERT INTO random_word (nickname) VALUES ('flower'),('garden'),('car'),('tea'),('color'),('eye'),('toe'),('foot'),('chic'),('clown'),('lion'),('station'),('door'),('cap'),('hat'),('ear'),('nose'),('face'),('country'),('city'),('elf'),('house'),('home'),('leaf'),('loof'),('snicker'),('pants'),('jeans'),('book'),('hand'),('low'),('school'),('nail'),('pencil'),('pen'),('bus'),('eyebrow'),('apple'),('stair'),('chin'),('spoon'),('chapstick'),('bowl'),('giraffe'),('elephant'),('bird'),('human'),('clothes'),('food'),('fruit'),('fish'),('beef'),('meat'),('dog'),('cat'),('whale'),('head'),('story'),('blanket'),('pillow'),('table'),('office'),('chair'),('picture'),('note'),('nation'),('train'),('taxi'),('airplane'),('boat'),('cruise'),('river'),('ruler'),('potato'),('zebra'),('work'),('board'),('plant'),('cup'),('pack'),('school'),('banana'),('orange'),('university'),('knife'),('knight'),('night'),('day'),('mountain'),('skirt'),('talk'),('bottle'),('triangle'),('circle'),('square'),('dot'),('stripe'),('trick'),('question'),('answer');
Query OK, 100 rows affected (0.01 sec)
Records: 100  Duplicates: 0  Warnings: 0

mysql> select * FROM random_word;
+------------+
| nickname   |
+------------+
| flower     |
| garden     |
| car        |
| tea        |
     ...
| trick      |
| question   |
| answer     |
+------------+
100 rows in set (0.00 sec)
```

```bash
mysql> DELETE FROM user_log; # user_log νμ΄λΈ λ΄μ© μ­μ  (νμ€νΈμ©)
mysql> DROP PROCEDURE addUserInfo; # addUserInfo νλ‘μμ Έ μμ κ²½μ° μ­μ 

mysql> DELIMITER $$ # κ΅¬λΆ κΈ°νΈλ₯Ό $$λ‘ λ°κΏμ£ΌκΈ°
mysql> CREATE PROCEDURE addUserInfo()
BEGIN
    DECLARE idx INT DEFAULT 1;
    DECLARE word varchar(57);
    DECLARE randomStr varchar(64);
    DECLARE randomMoney INT;
    DECLARE randomTime datetime;
    WHILE (idx <= 1000000) DO
        SET word = (SELECT nickname FROM random_word ORDER BY rand() limit 1);
        SET randomStr = CONCAT(word, CHAR(RAND() * 24 + 97), CHAR(RAND() * 24 + 97), CHAR(RAND() * 24 + 97), FLOOR(RAND() * 10), FLOOR(RAND() * 10), FLOOR(RAND() * 10), FLOOR(RAND() * 10));
        SET randomMoney = FLOOR(RAND() * 100000) + 1;
        SET randomTime = FROM_UNIXTIME(UNIX_TIMESTAMP('2022-01-01 00:00:00') + FLOOR(0 + (RAND() * 2592000)));
        INSERT INTO user_log (nickname, money, last_visit) VALUES (randomStr, randomMoney, randomTime);
        SET idx = idx + 1;
    END WHILE;
END $$
DELIMITER ;

mysql> CALL addUserInfo();
Query OK, 1 row affected (17 min 56.40 sec)
```
<br>
<br>

## μ€ν κ²°κ³Ό
```bash
mysql> select * FROM user_log;
+-------------------+----------+---------------------+
| nickname          | money    | last_visit          |
+-------------------+----------+---------------------+
| workioe7201       | 20302.00 | 2022-01-30 15:08:39 |
| squarexgd3294     | 17246.00 | 2022-01-29 04:19:24 |
                      ...
| beefkrf3603       | 22488.00 | 2022-01-03 05:13:53 |
| trainpsn8105      | 81636.00 | 2022-01-29 02:58:55 |
| eyebrowkml2978    | 99606.00 | 2022-01-22 18:41:43 |
| boardkdq4619      | 58999.00 | 2022-01-18 09:18:09 |
| dayjms4410        | 39958.00 | 2022-01-16 04:46:10 |
| dayhka2913        | 81969.00 | 2022-01-19 21:49:01 |
+-----------------+----------+---------------------+
1000000 rows in set (3.99 sec)
```