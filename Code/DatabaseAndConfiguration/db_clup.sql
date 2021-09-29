CREATE DATABASE  IF NOT EXISTS `db_clup`;
use db_clup;

/******************************************************************************************************************************************************************************/

create table customer(
	id INTEGER UNSIGNED AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(45) NOT NULL,  
    PRIMARY KEY (id)
);

create table supermarket(
	id INTEGER UNSIGNED AUTO_INCREMENT,
    name VARCHAR(20) UNIQUE NOT NULL,
    capacity INTEGER UNSIGNED NOT NULL,
    ait INTEGER UNSIGNED NOT NULL,  
    numInside INTEGER UNSIGNED NOT NULL,
    latitude DOUBLE NOT NULL, 
    longitude DOUBLE NOT NULL,
    PRIMARY KEY (id)
);

create table storeManager(
	id INTEGER UNSIGNED AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(45) NOT NULL,  
    marketId INTEGER UNSIGNED,
    PRIMARY KEY (id),
	FOREIGN KEY (marketId) REFERENCES supermarket(id)
);

create table lineUpRequest(
	id INTEGER UNSIGNED AUTO_INCREMENT,
    customId INTEGER UNSIGNED UNIQUE NOT NULL,
	marketId INTEGER UNSIGNED NOT NULL,
    requestTime BIGINT,
    entranceTime BIGINT,
    exitTime BIGINT,
    qrCode INTEGER UNSIGNED,
    entrance TINYINT(1) DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (marketId) REFERENCES supermarket(id),
    FOREIGN KEY (customId) REFERENCES customer(id)
);


/******************************************************************************************************************************************************************************/

insert into supermarket (name, capacity, ait, numInside, latitude, longitude) VALUES ('Coop', 300 , 600000, 0, 44.55136958955741, 10.796650038111599);
insert into supermarket (name, capacity, ait, numInside ,latitude, longitude) VALUES ('Lidl', 80 , 600000, 0, 44.55136958955741, 10.796650038111599);
insert into supermarket (name, capacity, ait, numInside, latitude, longitude) VALUES ('Esselunga', 2 , 600000, 0, 44.55136958955741, 10.796650038111599);
insert into supermarket (name, capacity, ait, numInside, latitude, longitude) VALUES ('Tigota', 2 , 600000, 0, 44.55136958955741, 10.796650038111599);
insert into supermarket (name, capacity, ait, numInside, latitude, longitude) VALUES ('MondoStore', 2 , 600000, 0, 44.55136958955741, 10.796650038111599);


insert into customer (username, email, password) VALUES ('eghera', 'egherardi@hotmail.it', 'passg');
insert into customer (username, email, password) VALUES ('ludorighi', 'ludo.righi@hotmail.it', 'miapass');

insert into storeManager (username, email, password, marketId) VALUES ('mattia', 'mattia@gmail.com', 'milan', 3);
insert into storeManager (username, email, password) VALUES ('paolo', 'paolo@gmail.com', 'inter');


/******************************************************************************************************************************************************************************/

select * from customer;
select * from supermarket;
select * from lineUpRequest;
select * from storeManager;





