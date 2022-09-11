exports.up = function (knex) {
  return knex.schema.createTable('lists', (table) => {
    table.increments('list_id').unique().notNullable();
    table.string('user_id', 255).notNullable();
    table.string('name', 255).notNullable();
    table.integer('year').checkPositive();
    table.dateTime('created_on').defaultTo(knex.fn.now());
    table.dateTime('modified_on').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('lists');
};
