exports.up = function (knex) {
  return knex.schema
    .createTable('images', (table) => {
      table.string('user_id', 255).notNullable();
      table.string('image_url', 2048).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('images');
};
