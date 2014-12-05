drop table if exists todos;
create table todos (
  id integer primary key autoincrement,
  text text not null,
  created timestamp not null default CURRENT_TIMESTAMP,
  completed timestamp,
  `order` integer
);
