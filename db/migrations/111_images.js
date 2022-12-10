exports.up = function (knex) {
  return knex.schema
    .createTable('images', (table) => {
      table.increments('id').unique().notNullable();
      table.string('title', 128).notNullable();
      table.string('cloudinary_id').notNullable();
      table.string('image_url', 128).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('images');
};
