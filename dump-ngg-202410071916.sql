http://localhost:1337/api/products?populate=cover&filters[category][id][$eq]=8



mariadb-d8ggcg8cs8o8c0o8g80wkocc

respaldo_barracuda.sql

	AQCU6g4Js4gNNNmCwOaarjdbBjdlyjAf



CREATE DATABASE barracuda;
CREATE USER barracudausr@localhost;
SET PASSWORD FOR 'barracudausr'@'localhost' = '4C29AD5D813E0DD1B591E2C202356E63B9D837E1D';
GRANT ALL ON barracuda.* TO 'barracudausr'@'localhost';



SELECT * FROM wp_options WHERE option_name = 'home';
UPDATE wp_options SET option_value="https://barracuda.ngg.cl" WHERE option_name = "home";

SELECT * FROM wp_options WHERE option_name = 'siteurl';
UPDATE wp_options SET option_value="https://barracuda.ngg.cl" WHERE option_name = "siteurl";


CREATE USER 'barracudausr'@'%';
SET PASSWORD FOR 'barracudausr'@'%' = '4C29AD5D813E0DD1B591E2C202356E63B9D837E1D';
GRANT ALL PRIVILEGES ON barracuda.* TO 'barracudausr'@'%';
FLUSH PRIVILEGES;

