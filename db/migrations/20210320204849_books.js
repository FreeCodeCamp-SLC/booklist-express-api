exports.up = function (knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments('book_id').unique().notNullable();
    table.string('user_id').notNullable();
    table.integer('list_id').notNullable().references('list_id').inTable('lists');
    table.string('author', 255).notNullable();
    table.string('title', 255).notNullable();
    table.string('image_url');
    table.integer('pages').checkPositive();
    table.boolean('favorite').defaultTo(false);
    table.integer('reading_status_id').references('reading_status_id').inTable('reading_status').defaultTo(1);
    table.datetime('date_started');
    table.datetime('date_finished');
    table.datetime('created_on').defaultTo(knex.fn.now());
    table.datetime('modified_on').defaultTo(knex.fn.now());
    table.integer('bookmark_page').checkPositive();
    table.integer('rating', 1).checkBetween([1, 5]);
    table.string('google_link', 255);
    table.string('description', 5000);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('books');
};
