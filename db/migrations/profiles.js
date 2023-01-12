exports.up = function (knex) {
  return knex.schema
    .createTable('profiles', (table) => {
      table.string('user_id', 255).unique().notNullable();
      table.string('user_name', 40);
      table.string('about', 2000);
      table.string('image_url', 2048);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('profiles');
};
