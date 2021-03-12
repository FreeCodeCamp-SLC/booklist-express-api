
exports.up = function(knex) {
  return knex.schema.createTable('books', table => {
    table.increments('bookId').unique.notNullable
    table.string('userId').notNullable
    table.integer('listId').notNullable
    table.string('author', 255).notNullable
    table.string('title', 255).notNullable
    table.string('imageUrl')
    table.integer('pages')
    table.integer('readingStatusId')
    table.dateTime('dateStarted')
    table.dateTime('dateFinished')
		table.dateTime('createdOn').defaultTo(knex.fn.now())
		table.dateTime('modifiedOn').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
