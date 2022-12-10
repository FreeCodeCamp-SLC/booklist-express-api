const pg = require('./pg');

const dropTables = async () => {
  await pg.query('DROP TABLE public.books');
  await pg.query('DROP TABLE public.lists');
  await pg.query('DROP TABLE public.reading_status');
  await pg.query('DROP TABLE public.knex_migrations_lock');
  await pg.query('DROP TABLE public.knex_migrations');
  await pg.query('DROP TABLE public.images');
};

dropTables();
