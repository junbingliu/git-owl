create database platform;
create database saasadmin;
create database saasstat;
create database session;
create database appMarket;
create database publicApps;
create database blacklist;
create database shorturl;
create database logs;


use platform;
create table t_listband(
        id numeric(12) primary key,
        listName varchar(512),
        isHead numeric(1),
        isMeta numeric(1),
        value mediumtext,
        nextMetaBandId numeric(12),
        prevMetaBandId numeric(12),
        hash int(16),
        lastModified DATETIME not null default current_timestamp on update current_timestamp,
        txid  numeric(16)
);

create index idx_listband on t_listband(listName,isHead);
create index idx_listband_hash on t_listband(hash);
create index idx_listband_txid on t_listband(txid);
create index idx_listband_lastModified on t_listband(lastModified);


create table t_simpleatom(
  name varchar(128) primary key,
  value numeric(12),
  hash int(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);

create index idx_simpleatom_hash on t_simpleatom(hash);
create index idx_simpleatom_txid on t_simpleatom(txid);
create index idx_simpleatom_lastModified on t_simpleatom(lastModified);

create table t_pigeontransaction(
  name varchar(128) primary key,
  version numeric(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create unique index idx_pigeontransaction_txid on t_pigeontransaction(txid);
create  index idx_lastModified_lastModified on t_pigeontransaction(lastModified);

create table t_flexobject(
  name varbinary(512) primary key,
  content mediumblob,
  hash int(16),
  isCompressed bool,
  isString bool,
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_flexobject_txid on t_flexobject(txid);
create  index idx_flexobject_hash on t_flexobject(hash);
create  index idx_flexobject_lastModified on t_flexobject(lastModified);

create table t_ids(
  TableName varchar(128) primary key,
  hash int(16),
  NextValue numeric(12),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_ids_txid on t_ids(txid);
create  index idx_ids_hash on t_ids(hash);
create  index idx_ids_lastModified on t_ids(lastModified);

create table t_testwhileidle (
  id varchar(128) primary key
);

insert into t_testwhileidle values ('test');

use saasadmin;
create table t_listband(
        id numeric(12) primary key,
        listName varchar(512),
        isHead numeric(1),
        isMeta numeric(1),
        value mediumtext,
        nextMetaBandId numeric(12),
        prevMetaBandId numeric(12),
        hash int(16),
        lastModified DATETIME not null default current_timestamp on update current_timestamp,
        txid  numeric(16)
);

create index idx_listband on t_listband(listName,isHead);
create index idx_listband_hash on t_listband(hash);
create index idx_listband_txid on t_listband(txid);
create index idx_listband_lastModified on t_listband(lastModified);


create table t_simpleatom(
  name varchar(128) primary key,
  value numeric(12),
  hash int(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);

create index idx_simpleatom_hash on t_simpleatom(hash);
create index idx_simpleatom_txid on t_simpleatom(txid);
create index idx_simpleatom_lastModified on t_simpleatom(lastModified);

create table t_pigeontransaction(
  name varchar(128) primary key,
  version numeric(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create unique index idx_pigeontransaction_txid on t_pigeontransaction(txid);
create  index idx_lastModified_lastModified on t_pigeontransaction(lastModified);

create table t_flexobject(
  name varbinary(512) primary key,
  content mediumblob,
  hash int(16),
  isCompressed bool,
  isString bool,
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_flexobject_txid on t_flexobject(txid);
create  index idx_flexobject_hash on t_flexobject(hash);
create  index idx_flexobject_lastModified on t_flexobject(lastModified);

create table t_ids(
  TableName varchar(128) primary key,
  hash int(16),
  NextValue numeric(12),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_ids_txid on t_ids(txid);
create  index idx_ids_hash on t_ids(hash);
create  index idx_ids_lastModified on t_ids(lastModified);

create table t_testwhileidle (
  id varchar(128) primary key
);

insert into t_testwhileidle values ('test');


use saasstat;
create table t_listband(
        id numeric(12) primary key,
        listName varchar(512),
        isHead numeric(1),
        isMeta numeric(1),
        value mediumtext,
        nextMetaBandId numeric(12),
        prevMetaBandId numeric(12),
        hash int(16),
        lastModified DATETIME not null default current_timestamp on update current_timestamp,
        txid  numeric(16)
);

create index idx_listband on t_listband(listName,isHead);
create index idx_listband_hash on t_listband(hash);
create index idx_listband_txid on t_listband(txid);
create index idx_listband_lastModified on t_listband(lastModified);


create table t_simpleatom(
  name varchar(128) primary key,
  value numeric(12),
  hash int(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);

create index idx_simpleatom_hash on t_simpleatom(hash);
create index idx_simpleatom_txid on t_simpleatom(txid);
create index idx_simpleatom_lastModified on t_simpleatom(lastModified);

create table t_pigeontransaction(
  name varchar(128) primary key,
  version numeric(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create unique index idx_pigeontransaction_txid on t_pigeontransaction(txid);
create  index idx_lastModified_lastModified on t_pigeontransaction(lastModified);

create table t_flexobject(
  name varbinary(512) primary key,
  content mediumblob,
  hash int(16),
  isCompressed bool,
  isString bool,
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_flexobject_txid on t_flexobject(txid);
create  index idx_flexobject_hash on t_flexobject(hash);
create  index idx_flexobject_lastModified on t_flexobject(lastModified);

create table t_ids(
  TableName varchar(128) primary key,
  hash int(16),
  NextValue numeric(12),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_ids_txid on t_ids(txid);
create  index idx_ids_hash on t_ids(hash);
create  index idx_ids_lastModified on t_ids(lastModified);

create table t_testwhileidle (
  id varchar(128) primary key
);

insert into t_testwhileidle values ('test');

use session;

create table t_listband(
        id numeric(12) primary key,
        listName varchar(512),
        isHead numeric(1),
        isMeta numeric(1),
        value mediumtext,
        nextMetaBandId numeric(12),
        prevMetaBandId numeric(12),
        hash int(16),
        lastModified DATETIME not null default current_timestamp on update current_timestamp,
        txid  numeric(16)
);

create index idx_listband on t_listband(listName,isHead);
create index idx_listband_hash on t_listband(hash);
create index idx_listband_txid on t_listband(txid);
create index idx_listband_lastModified on t_listband(lastModified);


create table t_simpleatom(
  name varchar(128) primary key,
  value numeric(12),
  hash int(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);

create index idx_simpleatom_hash on t_simpleatom(hash);
create index idx_simpleatom_txid on t_simpleatom(txid);
create index idx_simpleatom_lastModified on t_simpleatom(lastModified);

create table t_pigeontransaction(
  name varchar(128) primary key,
  version numeric(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create unique index idx_pigeontransaction_txid on t_pigeontransaction(txid);
create  index idx_lastModified_lastModified on t_pigeontransaction(lastModified);

create table t_flexobject(
  name varbinary(512) primary key,
  content mediumblob,
  hash int(16),
  isCompressed bool,
  isString bool,
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_flexobject_txid on t_flexobject(txid);
create  index idx_flexobject_hash on t_flexobject(hash);
create  index idx_flexobject_lastModified on t_flexobject(lastModified);

create table t_ids(
  TableName varchar(128) primary key,
  hash int(16),
  NextValue numeric(12),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_ids_txid on t_ids(txid);
create  index idx_ids_hash on t_ids(hash);
create  index idx_ids_lastModified on t_ids(lastModified);

create table t_testwhileidle (
  id varchar(128) primary key
);

insert into t_testwhileidle values ('test');

use appMarket;
create table t_listband(
        id numeric(12) primary key,
        listName varchar(512),
        isHead numeric(1),
        isMeta numeric(1),
        value mediumtext,
        nextMetaBandId numeric(12),
        prevMetaBandId numeric(12),
        hash int(16),
        lastModified DATETIME not null default current_timestamp on update current_timestamp,
        txid  numeric(16)
);

create index idx_listband on t_listband(listName,isHead);
create index idx_listband_hash on t_listband(hash);
create index idx_listband_txid on t_listband(txid);
create index idx_listband_lastModified on t_listband(lastModified);


create table t_simpleatom(
  name varchar(128) primary key,
  value numeric(12),
  hash int(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);

create index idx_simpleatom_hash on t_simpleatom(hash);
create index idx_simpleatom_txid on t_simpleatom(txid);
create index idx_simpleatom_lastModified on t_simpleatom(lastModified);

create table t_pigeontransaction(
  name varchar(128) primary key,
  version numeric(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create unique index idx_pigeontransaction_txid on t_pigeontransaction(txid);
create  index idx_lastModified_lastModified on t_pigeontransaction(lastModified);

create table t_flexobject(
  name varbinary(512) primary key,
  content mediumblob,
  hash int(16),
  isCompressed bool,
  isString bool,
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_flexobject_txid on t_flexobject(txid);
create  index idx_flexobject_hash on t_flexobject(hash);
create  index idx_flexobject_lastModified on t_flexobject(lastModified);

create table t_ids(
  TableName varchar(128) primary key,
  hash int(16),
  NextValue numeric(12),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_ids_txid on t_ids(txid);
create  index idx_ids_hash on t_ids(hash);
create  index idx_ids_lastModified on t_ids(lastModified);

create table t_testwhileidle (
  id varchar(128) primary key
);

insert into t_testwhileidle values ('test');

use publicApps;
create table t_listband(
        id numeric(12) primary key,
        listName varchar(512),
        isHead numeric(1),
        isMeta numeric(1),
        value mediumtext,
        nextMetaBandId numeric(12),
        prevMetaBandId numeric(12),
        hash int(16),
        lastModified DATETIME not null default current_timestamp on update current_timestamp,
        txid  numeric(16)
);

create index idx_listband on t_listband(listName,isHead);
create index idx_listband_hash on t_listband(hash);
create index idx_listband_txid on t_listband(txid);
create index idx_listband_lastModified on t_listband(lastModified);


create table t_simpleatom(
  name varchar(128) primary key,
  value numeric(12),
  hash int(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);

create index idx_simpleatom_hash on t_simpleatom(hash);
create index idx_simpleatom_txid on t_simpleatom(txid);
create index idx_simpleatom_lastModified on t_simpleatom(lastModified);

create table t_pigeontransaction(
  name varchar(128) primary key,
  version numeric(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create unique index idx_pigeontransaction_txid on t_pigeontransaction(txid);
create  index idx_lastModified_lastModified on t_pigeontransaction(lastModified);

create table t_flexobject(
  name varbinary(512) primary key,
  content mediumblob,
  hash int(16),
  isCompressed bool,
  isString bool,
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_flexobject_txid on t_flexobject(txid);
create  index idx_flexobject_hash on t_flexobject(hash);
create  index idx_flexobject_lastModified on t_flexobject(lastModified);

create table t_ids(
  TableName varchar(128) primary key,
  hash int(16),
  NextValue numeric(12),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_ids_txid on t_ids(txid);
create  index idx_ids_hash on t_ids(hash);
create  index idx_ids_lastModified on t_ids(lastModified);

create table t_testwhileidle (
  id varchar(128) primary key
);

insert into t_testwhileidle values ('test');

use blacklist;
create table t_listband(
        id numeric(12) primary key,
        listName varchar(512),
        isHead numeric(1),
        isMeta numeric(1),
        value mediumtext,
        nextMetaBandId numeric(12),
        prevMetaBandId numeric(12),
        hash int(16),
        lastModified DATETIME not null default current_timestamp on update current_timestamp,
        txid  numeric(16)
);

create index idx_listband on t_listband(listName,isHead);
create index idx_listband_hash on t_listband(hash);
create index idx_listband_txid on t_listband(txid);
create index idx_listband_lastModified on t_listband(lastModified);


create table t_simpleatom(
  name varchar(128) primary key,
  value numeric(12),
  hash int(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);

create index idx_simpleatom_hash on t_simpleatom(hash);
create index idx_simpleatom_txid on t_simpleatom(txid);
create index idx_simpleatom_lastModified on t_simpleatom(lastModified);

create table t_pigeontransaction(
  name varchar(128) primary key,
  version numeric(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create unique index idx_pigeontransaction_txid on t_pigeontransaction(txid);
create  index idx_lastModified_lastModified on t_pigeontransaction(lastModified);

create table t_flexobject(
  name varbinary(512) primary key,
  content mediumblob,
  hash int(16),
  isCompressed bool,
  isString bool,
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_flexobject_txid on t_flexobject(txid);
create  index idx_flexobject_hash on t_flexobject(hash);
create  index idx_flexobject_lastModified on t_flexobject(lastModified);

create table t_ids(
  TableName varchar(128) primary key,
  hash int(16),
  NextValue numeric(12),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_ids_txid on t_ids(txid);
create  index idx_ids_hash on t_ids(hash);
create  index idx_ids_lastModified on t_ids(lastModified);

create table t_testwhileidle (
  id varchar(128) primary key
);

insert into t_testwhileidle values ('test');

use shorturl;
create table t_listband(
        id numeric(12) primary key,
        listName varchar(512),
        isHead numeric(1),
        isMeta numeric(1),
        value mediumtext,
        nextMetaBandId numeric(12),
        prevMetaBandId numeric(12),
        hash int(16),
        lastModified DATETIME not null default current_timestamp on update current_timestamp,
        txid  numeric(16)
);

create index idx_listband on t_listband(listName,isHead);
create index idx_listband_hash on t_listband(hash);
create index idx_listband_txid on t_listband(txid);
create index idx_listband_lastModified on t_listband(lastModified);


create table t_simpleatom(
  name varchar(128) primary key,
  value numeric(12),
  hash int(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);

create index idx_simpleatom_hash on t_simpleatom(hash);
create index idx_simpleatom_txid on t_simpleatom(txid);
create index idx_simpleatom_lastModified on t_simpleatom(lastModified);

create table t_pigeontransaction(
  name varchar(128) primary key,
  version numeric(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create unique index idx_pigeontransaction_txid on t_pigeontransaction(txid);
create  index idx_lastModified_lastModified on t_pigeontransaction(lastModified);

create table t_flexobject(
  name varbinary(512) primary key,
  content mediumblob,
  hash int(16),
  isCompressed bool,
  isString bool,
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_flexobject_txid on t_flexobject(txid);
create  index idx_flexobject_hash on t_flexobject(hash);
create  index idx_flexobject_lastModified on t_flexobject(lastModified);

create table t_ids(
  TableName varchar(128) primary key,
  hash int(16),
  NextValue numeric(12),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_ids_txid on t_ids(txid);
create  index idx_ids_hash on t_ids(hash);
create  index idx_ids_lastModified on t_ids(lastModified);

create table t_testwhileidle (
  id varchar(128) primary key
);

insert into t_testwhileidle values ('test');

use logs;

create table t_listband(
        id numeric(12) primary key,
        listName varchar(512),
        isHead numeric(1),
        isMeta numeric(1),
        value mediumtext,
        nextMetaBandId numeric(12),
        prevMetaBandId numeric(12),
        hash int(16),
        lastModified DATETIME not null default current_timestamp on update current_timestamp,
        txid  numeric(16)
);

create index idx_listband on t_listband(listName,isHead);
create index idx_listband_hash on t_listband(hash);
create index idx_listband_txid on t_listband(txid);
create index idx_listband_lastModified on t_listband(lastModified);


create table t_simpleatom(
  name varchar(128) primary key,
  value numeric(12),
  hash int(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);

create index idx_simpleatom_hash on t_simpleatom(hash);
create index idx_simpleatom_txid on t_simpleatom(txid);
create index idx_simpleatom_lastModified on t_simpleatom(lastModified);

create table t_pigeontransaction(
  name varchar(128) primary key,
  version numeric(16),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create unique index idx_pigeontransaction_txid on t_pigeontransaction(txid);
create  index idx_lastModified_lastModified on t_pigeontransaction(lastModified);

create table t_flexobject(
  name varbinary(512) primary key,
  content mediumblob,
  hash int(16),
  isCompressed bool,
  isString bool,
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_flexobject_txid on t_flexobject(txid);
create  index idx_flexobject_hash on t_flexobject(hash);
create  index idx_flexobject_lastModified on t_flexobject(lastModified);

create table t_ids(
  TableName varchar(128) primary key,
  hash int(16),
  NextValue numeric(12),
  lastModified DATETIME not null default current_timestamp on update current_timestamp,
  txid  numeric(16)
);
create  index idx_ids_txid on t_ids(txid);
create  index idx_ids_hash on t_ids(hash);
create  index idx_ids_lastModified on t_ids(lastModified);

create table t_testwhileidle (
  id varchar(128) primary key
);

insert into t_testwhileidle values ('test');