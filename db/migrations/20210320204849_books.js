
exports.up = function(knex) {
  return knex.schema.createTable('books', table => {
    table.increments('book_id').unique().notNullable()
    table.string('user_id').notNullable()
    table.integer('list_id').notNullable().references('list_id').inTable('lists')
    table.string('author', 255).notNullable()
    table.string('title', 255).notNullable()
    table.string('image_url')
    table.integer('pages')
    table.integer('reading_status_id').references('reading_status_id').inTable('reading_status')
    table.datetime('date_started')
    table.datetime('date_finished')
		table.datetime('created_on').defaultTo(knex.fn.now())
		table.datetime('modified_on').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
