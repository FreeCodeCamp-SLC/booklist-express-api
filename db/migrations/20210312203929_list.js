
exports.up = function(knex) {
  return knex.schema.createTable('lists', table => {
    table.increments('listId').unique.notNullable
    table.string('userId', 255).notNullable
    table.string('name', 255).notNullable
    table.integer('year')
		table.dateTime('createdOn').defaultTo(knex.fn.now())
		table.dateTime('modifiedOn').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('lists');
};
