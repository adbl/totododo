drop table if exists todos;
create table todos (
  id integer primary key autoincrement,
  text text not null,
  completed timestamp,
  `order` integer
);
