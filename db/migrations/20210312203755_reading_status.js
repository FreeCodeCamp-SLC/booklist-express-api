
exports.up = function(knex) {
  return knex.schema.createTable('readingStatus', table => {
    table.increments('readingStatusId').unique.notNullable
    table.string('userId').notNullable
    table.string('name', 255).notNullable
    table.integer('year')
		table.dateTime('createdOn').defaultTo(knex.fn.now())
		table.dateTime('modifiedOn').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('readingStatus');
};
