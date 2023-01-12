exports.seed = function (knex) {
  return knex('reading_status').del()
    .then(() => knex('reading_status').insert([
      { name: 'To Read' },
      { name: 'Currently Reading' },
      { name: 'On Hold' },
      { name: 'Finished' },
      { name: 'Abandoned' },
    ]));
};
