Create table rate(
 id serial primary key not null,
 product_code varchar(10) not null,
 area char(1),
 gender char(1) not null,
 anb smallint not null,
 pt5 decimal,
 pt10 decimal,
 pt15 decimal,
 pt20 decimal,
 pt25 decimal
);